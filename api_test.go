package main

import (
	"bbs/config"
	"bbs/db"
	"bbs/db/mysql"
	"bbs/libraries"
	"bbs/models"
	"bbs/protocol"
	"bbs/server"
	"bbs/vaptcha"
	"fmt"
	"io/ioutil"
	"math/rand"
	"reflect"
	"strconv"
	"sync"
	"testing"
	"time"

	"github.com/luyu6056/cache"
)

const (
	OssEndpoint        = "oss-cn-shenzhen.aliyuncs.com"
	OssAccessKeyId     = "LTAI4FfGcadEAg6L5knnCvNt"
	OssAccessKeySecret = "dagoPlO6g22Z4yJCKUJT4S7E0aN1kw"
	OssBucketName      = "jachunbbs1"
	postmessage        = "测试用一楼"
	postmessage2       = "测试用二楼"
)

func TestMain(m *testing.M) {
	mysql.Init_register_db = append(mysql.Init_register_db, db.DB_init)
	mysql.Init_register_db = append(mysql.Init_register_db, db.DBlog_init)
	mysql.Mysql_init()
	models.Model_init()
	m.Run()
}

type test_msg struct {
	uid    int32       //测试用的登录账户
	msg    protocolmsg //测试发送的消息struct结构
	result protocolmsg //测试收到的消息struct结构
	f      interface{} //读取消息的READ_MSG...func
	name   string      //报错用
}
type protocolmsg interface {
	WRITE(*libraries.MsgBuffer)
}

var ctxpool = sync.Pool{New: func() interface{} {
	return &server.Context{Buf: &libraries.MsgBuffer{}, In: &libraries.MsgBuffer{}, Conn: &server.ClientConn{Session: cache.Hget("test", "test")}}
}}

func testRun(t *testing.T, tests []test_msg) {
	b := &libraries.MsgBuffer{}
	ctx := ctxpool.Get().(*server.Context)
	result := make(chan *libraries.MsgBuffer, 1)
	for _, test := range tests {
		ctx.Conn.Session.Set("Uid", test.uid)
		b.Reset()
		b.WriteString("测试:")
		b.WriteString(test.name)
		b.WriteString("\r\n")
		b.WriteString("msg:")
		ty := reflect.TypeOf(test.msg).Elem()
		v := reflect.ValueOf(test.msg).Elem()
		b.WriteString(ty.Name())
		b.WriteString("{")
		for i := 0; i < ty.NumField(); i++ {
			field_t := ty.Field(i)
			b.WriteString(field_t.Name)
			b.WriteString(":")
			b.WriteString(fmt.Sprint(v.Field(i).Interface()))
			b.WriteString(",")
		}
		b.Truncate(b.Len() - 1)
		b.WriteString("}")
		ctx.Conn.Output_data = func(r *libraries.MsgBuffer) {
			result <- r
		}
		t.Run(b.String(), func(t *testing.T) {
			ctx.Log = ctx.Log[:0]
			test.msg.WRITE(ctx.In)
			server.WebHandle(ctx)
			r := <-result
			test.result.WRITE(b)
			errmsg := ""
			for _, log := range ctx.Log {
				errmsg += log.Err + log.Err_func + log.Err_param + ","
			}
			cmd_r := protocol.READ_int32(r)
			cmd_b := protocol.READ_int32(b)
			if r.String() != b.String() {
				v = reflect.ValueOf(test.f)
				if cmd_r != cmd_b {
					switch cmd_r {
					case protocol.CMD_MSG_WS2U_CommonResult:
						ext := "无"
						data := protocol.READ_MSG_WS2U_CommonResult(r)
						ext = protocol.ErrcodeMsg[data.Result]
						data.Put()
						t.Errorf("校验结果错误\r\n期望结果 %+v \r\n,错误信息:%s,错误日志:%s", test.result, ext, errmsg)
					case protocol.CMD_MSG_WS2U_threadmod:
						data := protocol.READ_MSG_WS2U_threadmod(r)
						t.Errorf("校验结果错误\r\n期望结果 %+v \r\n,实际结果:MSG_WS2U_threadmod%+v,错误日志:%s", test.result, data, errmsg)
						data.Put()

					default:
						fmt.Println(cmd_r)
						t.Errorf("校验结果错误\r\n期望结果 %+v \r\ncmd未设置:%d \r\n,错误日志:%s", test.result, cmd_r, errmsg)
					}
				} else {
					t.Errorf("校验结果错误\r\n期望结果 %+v \r\n实际结果 %+v\r\n,错误日志:%s", test.result, v.Call([]reflect.Value{reflect.ValueOf(r)})[0].Interface(), errmsg)
				}

			}
		})
	}
	ctxpool.Put(ctx)
}

func Test_MSG_U2WS_UserLogin(t *testing.T) {
	type userinfo struct {
		name     string
		password string
		result   int16
	}
	result := make(chan int16, 1)
	for _, u := range []userinfo{userinfo{"admin", "123456", protocol.Success},
		userinfo{"admin", "12345", protocol.Err_Password},
		userinfo{"admin", "1234567", protocol.Err_Password},
		userinfo{"123456", "123456", protocol.Err_Password},
	} {

		ctx := ctxpool.Get().(*server.Context)
		ctx.Conn.Output_data = func(r *libraries.MsgBuffer) {
			cmd := protocol.READ_int32(r)
			if cmd != protocol.CMD_MSG_WS2U_Login_Gethash {
				result <- protocol.Err_msg
				return
			}
			data := protocol.READ_MSG_WS2U_Login_Gethash(r)
			var pwd = libraries.SHA256_S(libraries.MD5_S(u.password+data.Hash2) + data.Hash)
			(&protocol.MSG_U2WS_UserLogin{
				Username: u.name,
				Passwd:   pwd,
				Seccode:  vaptcha.TestToken,
			}).WRITE(ctx.In)
			data.Put()
			ctx.Conn.Output_data = func(r *libraries.MsgBuffer) {
				cmd := protocol.READ_int32(r)
				if cmd != protocol.CMD_MSG_WS2U_UserLogin {
					result <- protocol.Err_msg
					return
				}
				data := protocol.READ_MSG_WS2U_UserLogin(r)
				result <- data.Result
				data.Put()

			}
			server.WebHandle(ctx)

		}
		t.Run(fmt.Sprintf("%+v", u), func(t *testing.T) {
			(&protocol.MSG_U2WS_Login_Gethash{Name: u.name}).WRITE(ctx.In)
			server.WebHandle(ctx)
			if r := <-result; r != u.result {
				t.Errorf("错误码%d,信息%s", r, protocol.ErrcodeMsg[r])
			}
		})
		ctxpool.Put(ctx)
	}
}
func Test_MSG_U2WS_forum_index(t *testing.T) {

	type msg struct {
		gid       int32
		resultlen int
	}
	result := make(chan int, 1)
	for _, u := range []msg{{0, 1}, {1, 1}, {2, 0}, {-1, 1}, {3, 0}, {-2, 1}} {

		ctx := ctxpool.Get().(*server.Context)
		ctx.Conn.Output_data = func(r *libraries.MsgBuffer) {
			cmd := protocol.READ_int32(r)
			if cmd != protocol.CMD_MSG_WS2U_forum_index {
				result <- protocol.Err_msg
				return
			}
			data := protocol.READ_MSG_WS2U_forum_index(r)
			result <- len(data.Catlist)
			data.Put()

		}
		t.Run(fmt.Sprintf("%+v", u), func(t *testing.T) {
			(&protocol.MSG_U2WS_forum_index{Gid: u.gid}).WRITE(ctx.In)
			server.WebHandle(ctx)
			if r := <-result; r != u.resultlen {
				t.Errorf("获取论坛%d结果%d错误,", u.gid, r)
			}
		})
		ctxpool.Put(ctx)
	}
}
func Test_MSG_U2WS_GetHead(t *testing.T) {

	type msg struct {
		uid       int32
		resultuid int32
	}
	result := make(chan int16, 1)
	for _, u := range []msg{{1, 1}, {-1, 0}, {2, 0}, {0, 0}, {4, 4}} {
		ctx := ctxpool.Get().(*server.Context)
		ctx.Conn.Session.Set("Uid", u.uid)
		ctx.Conn.Output_data = func(r *libraries.MsgBuffer) {
			cmd := protocol.READ_int32(r)

			if cmd != protocol.CMD_MSG_WS2U_Common_Head {
				result <- protocol.Err_msg
				return
			}
			data := protocol.READ_MSG_WS2U_Common_Head(r)
			if data.Uid != u.resultuid {
				result <- protocol.Fail
				return
			}
			result <- protocol.Success
			data.Put()
		}
		t.Run(fmt.Sprintf("%+v", u), func(t *testing.T) {
			(&protocol.MSG_U2WS_GetHead{}).WRITE(ctx.In)
			server.WebHandle(ctx)
			if r := <-result; r != protocol.Success {
				t.Errorf("uid退出登录%d结果%s,", u.uid, protocol.ErrcodeMsg[r])
			}
		})
		ctxpool.Put(ctx)
	}
}
func Test_MSG_U2WS_diy_save(t *testing.T) {
	//暂无测试
}
func Test_MSG_U2WS_Checkseccode(t *testing.T) {
	//暂无测试
}
func Test_MSG_U2WS_Gettoken(t *testing.T) {
	//合并settoken测试
}

func Test_MSG_U2WS_logout(t *testing.T) {

	result := make(chan int16, 1)
	for _ = range make([]int, 10) {
		ctx := ctxpool.Get().(*server.Context)
		ctx.Conn.Output_data = func(r *libraries.MsgBuffer) {
			cmd := protocol.READ_int32(r)

			if cmd != protocol.CMD_MSG_WS2U_CommonResult {
				result <- protocol.Err_msg
				return
			}
			data := protocol.READ_MSG_WS2U_CommonResult(r)
			result <- data.Result
			data.Put()
		}
		t.Run("", func(t *testing.T) {
			(&protocol.MSG_U2WS_logout{}).WRITE(ctx.In)
			server.WebHandle(ctx)
			if r := <-result; r != protocol.Success {
				t.Errorf("退出结果%s错误,", protocol.ErrcodeMsg[r])
			}
		})
		ctxpool.Put(ctx)
	}
}
func Test_MSG_U2WS_settoken(t *testing.T) {

	type msg struct {
		gettoken bool
	}
	seed := rand.NewSource(time.Now().Unix())
	result := make(chan int16, 1)
	var b []byte
	for i := 0; i < 100; i++ {
		b = make([]byte, i)
		for k := range b {
			b[k] = byte(seed.Int63())
		}
		ctx := ctxpool.Get().(*server.Context)
		ctx.Conn.Output_data = func(r *libraries.MsgBuffer) {
			cmd := protocol.READ_int32(r)

			if cmd != protocol.CMD_MSG_WS2U_Gettoken {
				result <- protocol.Err_msg
				return
			}
			data := protocol.READ_MSG_WS2U_Gettoken(r)
			if string(data.Token) != string(b) {
				result <- protocol.Success
				return
			}
			result <- protocol.Fail
			data.Put()
		}
		t.Run("", func(t *testing.T) {
			if seed.Int63()&1 == 1 {
				(&protocol.MSG_U2WS_Gettoken{}).WRITE(ctx.In)
			} else {
				(&protocol.MSG_U2WS_settoken{Token: b}).WRITE(ctx.In)
			}

			server.WebHandle(ctx)
			if r := <-result; r != protocol.Success {
				t.Errorf("操作token获取%v结果%s,", seed.Int63()&1 == 1, protocol.ErrcodeMsg[r])
			}
		})
		ctxpool.Put(ctx)
	}

}
func Test_MSG_U2WS_Getseccode(t *testing.T) {
	//暂无测试
}
func Test_MSG_U2WS_GetRegister(t *testing.T) {

	testRun(t, []test_msg{test_msg{0, &protocol.MSG_U2WS_GetRegister{}, &protocol.MSG_WS2U_GetRegister{}, protocol.READ_MSG_WS2U_GetRegister, "测试GetRegister"}})
}
func Test_MSG_U2WS_Register(t *testing.T) {
	ctx := ctxpool.Get().(*server.Context)
	model := &models.Model_member{}
	model.Ctx = ctx
	for _, name := range []string{"testRegister"} {
		user := model.GetMemberInfo(map[string]interface{}{"Username": name}, "Uid", true)
		if user != nil {
			t.Run("删除用户: "+name, func(t *testing.T) {
				ctx.Log = ctx.Log[:0]
				if !model.DeleteMember(user.Uid) {
					errmsg := ""
					for _, log := range ctx.Log {
						errmsg += log.Err + log.Err_func + log.Err_param + ","
					}
					t.Error(errmsg)
				}
			})
		}
	}
	ctxpool.Put(ctx)
	type msg struct {
		name      string
		password  string
		resultuid int16
	}
	result := make(chan int16, 1)
	for _, u := range []msg{{"admin", "123456", protocol.Err_Alreadyregistered}, {"testRegister", "123", protocol.Err_PasswordShort}, {"testRegister", "123456", protocol.Success}} {
		ctx := ctxpool.Get().(*server.Context)
		ctx.Conn.Output_data = func(r *libraries.MsgBuffer) {
			cmd := protocol.READ_int32(r)
			switch cmd {
			case protocol.CMD_MSG_WS2U_CommonResult:
				data := protocol.READ_MSG_WS2U_CommonResult(r)
				result <- data.Result
				data.Put()
			case protocol.CMD_MSG_WSU2_Register:
				result <- protocol.Success
			default:
				result <- protocol.Err_msg

			}
		}
		t.Run(fmt.Sprintf("%+v", u), func(t *testing.T) {
			(&protocol.MSG_U2WS_Register{
				Username: u.name,
				Passwd:   u.password,
				Email:    u.name + "@test.com",
				Seccode:  vaptcha.TestToken,
			}).WRITE(ctx.In)
			server.WebHandle(ctx)
			if r := <-result; r != u.resultuid {
				t.Errorf("注册结果%s,", protocol.ErrcodeMsg[r])
			}
		})
		ctxpool.Put(ctx)
	}
}
func Test_MSG_U2WS_CheckRegister(t *testing.T) {

	testRun(t, []test_msg{
		test_msg{0, &protocol.MSG_U2WS_CheckRegister{1, "admin"}, &protocol.MSG_WS2U_CheckRegister{Result: protocol.Fail}, protocol.READ_MSG_WS2U_CheckRegister, "检查注册名称，已存在的账号"},
		test_msg{0, &protocol.MSG_U2WS_CheckRegister{1, "testCheckRegister"}, &protocol.MSG_WS2U_CheckRegister{Result: protocol.Success}, protocol.READ_MSG_WS2U_CheckRegister, "检查注册名称，新账号"},
		test_msg{0, &protocol.MSG_U2WS_CheckRegister{2, "admin"}, &protocol.MSG_WS2U_CheckRegister{Result: protocol.Success}, protocol.READ_MSG_WS2U_CheckRegister, "检查注册邮箱，新邮箱"},
		test_msg{0, &protocol.MSG_U2WS_CheckRegister{2, "123456@qq.com"}, &protocol.MSG_WS2U_CheckRegister{Result: protocol.Fail}, protocol.READ_MSG_WS2U_CheckRegister, "检查注册邮箱，已存在的邮箱"},
	})
}
func Test_MSG_U2WS_forum(t *testing.T) {

	type msg struct {
		Fid         int32
		Typeid      string
		Dateline    int32
		Orderby     string
		Page        int16
		Specialtype string
		Rewardtype  int8
		Filter      string
		result      int32 //负值错误码，0-20为帖子数量,大于20为非置顶第一个帖子id
		message     string
	}
	result := make(chan int32, 1)
	for _, u := range []msg{{Fid: -1, result: protocol.Err_forumId, message: "测试不存在的fid"},
		{Fid: 11, Typeid: "-1", result: 0, message: "测试不存在的typeid"},
		{Fid: 11, Typeid: "5", result: 5, message: "测试存在的typeid"},
		{Fid: 11, Dateline: 1, result: 0, message: "测试Dateline"},
		{Fid: 13, Orderby: "replies", result: 46411, message: "测试Orderby-replies"},
		{Fid: 13, Orderby: "123123123213123", result: 46751, message: "测试Orderby-无效"},
		{Fid: 13, Orderby: "views", result: 57618, message: "测试Orderby-views"},
		{Fid: 11, Page: 2, result: 65, message: "测试Page"},
		{Fid: 13, Page: -2, result: 46751, message: "测试无效Page，小于0强制为1"},
		{Fid: 11, Page: 10000, result: 0, message: "测试无效Page，超大页数无结果"},
		{Fid: 2, Specialtype: "poll", result: 168366, message: "测试特殊主题-投票"},
		{Fid: 13, Specialtype: "common", result: 46751, message: "测试特殊主题-普通"},
		{Fid: 2, Filter: "digest", result: 131, message: "测试精华"},
		{Fid: 14, Filter: "heat", result: 79358, message: "测试热门"},
		{Fid: 14, Filter: "123213", result: 79364, message: "测试filter无效"},
	} {
		ctx := ctxpool.Get().(*server.Context)
		ctx.Conn.Output_data = func(r *libraries.MsgBuffer) {
			cmd := protocol.READ_int32(r)
			switch cmd {
			case protocol.CMD_MSG_WS2U_CommonResult:
				data := protocol.READ_MSG_WS2U_CommonResult(r)
				result <- int32(data.Result)
				data.Put()
			case protocol.CMD_MSG_WS2U_forum:
				data := protocol.READ_MSG_WS2U_forum(r)
				if u.result <= 20 {
					result <- int32(len(data.Threadlist))
				} else {
					if len(data.Threadlist) == 0 {
						result <- protocol.Fail
					} else {
						result <- data.Threadlist[0].Tid
					}

				}
				data.Put()
			default:
				result <- protocol.Err_msg

			}
		}
		t.Run(u.message, func(t *testing.T) {
			(&protocol.MSG_U2WS_forum{
				Fid:         u.Fid,
				Typeid:      u.Typeid,
				Dateline:    u.Dateline,
				Orderby:     u.Orderby,
				Page:        u.Page,
				Specialtype: u.Specialtype,
				Rewardtype:  u.Rewardtype,
				Filter:      u.Filter,
			}).WRITE(ctx.In)
			server.WebHandle(ctx)
			if r := <-result; r != u.result {
				if u.result < 0 {
					t.Errorf("U2WS_forum结果%s", protocol.ErrcodeMsg[int16(r)])
				} else {
					t.Errorf("U2WS_forum请求没有收到预想的结果,预计%d,结果%d", u.result, r)
				}

			}
		})
		ctxpool.Put(ctx)
	}
}
func Test_MSG_U2WS_forum_modcp(t *testing.T) {
	//暂无测试
}
func Test_MSG_U2WS_forum_recyclebin(t *testing.T) {
	//暂无测试
}
func Test_MSG_U2WS_forum_newthread(t *testing.T) {
	type msg struct {
		uid      int32
		Fid      int32
		Special  int8
		Type     int8
		Tid      int32
		Position int32
		result   int32 //小于0为错误码，大于0验证msg.Group_status权限
		message  string
	}
	result := make(chan int32, 1)
	for _, u := range []msg{{Fid: 11, result: protocol.Err_Notlogin, message: "测试uid=0"},
		{uid: 1, Fid: -1, result: protocol.Err_forumId, message: "测试不存在的Fid"},
		{uid: 1, Fid: 11, Tid: -1, Type: config.ThreadOperateTypeEdit, result: protocol.Err_NotFoundThread, message: "测试不存在的Tid"},
		{uid: 1, Fid: 11, Tid: 60, Position: 999, Type: config.ThreadOperateTypeReply, result: protocol.Err_NotFoundPost, message: "测试不存在的Post"},
		{uid: 5, Fid: 11, Tid: 60, result: protocol.Err_Groupperm, message: "测试没有Group.Allowpost权限"},
		{uid: 4, Fid: 11, Tid: 60, Type: config.ThreadOperateTypeEdit, result: protocol.Err_Groupperm, message: "测试没有修改权限"},
		{uid: 376, Fid: 11, Tid: 105, Type: config.ThreadOperateTypeEdit, result: protocol.Err_threadClosed, message: "测试帖子close"},
		{uid: 1, Fid: 11, Type: config.ThreadOperateTypeNew, result: 12517151, message: "测试admin权限"},
		{uid: 4, Fid: 11, Type: config.ThreadOperateTypeNew, result: 3153926, message: "测试普通用户权限"},
	} {
		ctx := ctxpool.Get().(*server.Context)
		ctx.Conn.Session.Store("Uid", u.uid)
		ctx.Conn.Output_data = func(r *libraries.MsgBuffer) {
			cmd := protocol.READ_int32(r)
			switch cmd {
			case protocol.CMD_MSG_WS2U_CommonResult:
				data := protocol.READ_MSG_WS2U_CommonResult(r)
				result <- int32(data.Result)
				data.Put()
			case protocol.CMD_MSG_WS2U_forum_newthread:
				data := protocol.READ_MSG_WS2U_forum_newthread(r)
				result <- data.Group_status
				data.Put()
			default:
				result <- protocol.Err_msg

			}
		}
		t.Run(u.message, func(t *testing.T) {
			(&protocol.MSG_U2WS_forum_newthread{

				Fid:      u.Fid,
				Special:  u.Special,
				Type:     u.Type,
				Tid:      u.Tid,
				Position: u.Position,
			}).WRITE(ctx.In)
			server.WebHandle(ctx)
			if r := <-result; r != u.result {
				if r < 0 {
					t.Errorf("forum_newthread结果%s", protocol.ErrcodeMsg[int16(r)])
				} else {
					t.Errorf("forum_newthread请求没有收到预想的结果,预计%d,结果%d", u.result, r)
				}
			}
		})
		ctxpool.Put(ctx)
	}
}
func Test_MSG_U2WS_Getlogin(t *testing.T) {

	type msg struct {
		uid       int32
		resultuid int8
	}
	result := make(chan int8, 1)
	for _, u := range []msg{{1, 1}, {0, 0}} {
		ctx := ctxpool.Get().(*server.Context)
		ctx.Conn.Session.Set("Uid", u.uid)
		ctx.Conn.Output_data = func(r *libraries.MsgBuffer) {
			cmd := protocol.READ_int32(r)

			if cmd != protocol.CMD_MSG_WS2U_Getlogin {
				result <- protocol.Err_msg
				return
			}
			data := protocol.READ_MSG_WS2U_Getlogin(r)
			result <- data.Islogin
			data.Put()
		}
		t.Run(fmt.Sprintf("%+v", u), func(t *testing.T) {
			(&protocol.MSG_U2WS_Getlogin{}).WRITE(ctx.In)
			server.WebHandle(ctx)
			if r := <-result; r != u.resultuid {
				t.Errorf("uid%dGetlogin结果%d,", u.uid, u.resultuid)
			}
		})
		ctxpool.Put(ctx)
	}
}
func Test_MSG_U2WS_Forum_newthread_submit(t *testing.T) {
	model := &models.Model_Forum_thread{}
	//model.DeleteThread(map[string]interface{}{"Fid": 10})
	//正式上线不能彻底删除帖子要保留以处理一些法律问题，这里因为跑测试，避免无限制新增帖子，所以才会对数据库删除
	_, err := model.Table("Forum_thread").Where(map[string]interface{}{"Fid": 10}).Delete()
	if err != nil {
		t.Error("测试删除Fid10帖子失败" + err.Error())
		return
	}
	_, err = model.Table("Log_forum_threadmod").Where(map[string]interface{}{"Fid": 10}).Delete()
	if err != nil {
		t.Error("测试删除Fid10操作记录失败" + err.Error())
		return
	}
	_, err = model.Table("Forum_thread").Where(map[string]interface{}{"Fid": 17}).Delete()
	if err != nil {
		t.Error("测试删除Fid17帖子失败" + err.Error())
		return
	}
	_, err = model.Table("Log_forum_threadmod").Where(map[string]interface{}{"Fid": 17}).Delete()
	if err != nil {
		t.Error("测试删除Fid17操作记录失败" + err.Error())
		return
	}
	if model.GetForumThread(map[string]interface{}{"Fid": 10, "Close": 0}, true) != nil {
		t.Error("测试删除指定论坛ID帖子失败")
		return
	}
	_, err = model.Table("Forum_post").Where(map[string]interface{}{"Fid": 10}).Delete()
	if err != nil {
		t.Error("测试删除Fid10回复失败" + err.Error())
		return
	}
	_, err = model.Table("Forum_post").Where(map[string]interface{}{"Fid": 17}).Delete()
	if err != nil {
		t.Error("测试删除Fid10回复失败" + err.Error())
		return
	}
	//先测试err
	type msg struct {
		uid        int32
		notokenkey bool
		Fid        int32
		Tid        int32
		Position   int32
		Type       int8
		Typeid     int16
		Special    int8
		Subject    string
		Message    string
		Seccode    string
		Other      int16
		Readperm   int16
		Tags       string
		Aids       []int64
		Specialext []byte
		result     int16 //错误码
		message    string
	}
	var subject = "标题MSG_U2WS_Forum_newthread_submit"
	var message = "消息MSG_U2WS_Forum_newthread_submit"
	result := make(chan int16, 1)
	for _, u := range []msg{{result: protocol.Err_Notlogin, message: "测试uid=0"},
		{uid: 1, notokenkey: true, result: protocol.Err_TokenTimeout, message: "测试不存在的tokenkey"},
		{uid: 1, Type: -1, result: protocol.Err_NewThreadType, message: "测试没有Type"},
		{uid: 1, Type: config.ThreadOperateTypeReply, result: protocol.Err_forumId, message: "测试没有fid"},
		{uid: 1, Fid: 10, Type: config.ThreadOperateTypeNew, Subject: subject, Message: message, result: protocol.Err_Seccode, message: "测试没有token"},
		{uid: 1, Fid: 10, Type: config.ThreadOperateTypeNew, Seccode: vaptcha.TestToken, Message: message, result: protocol.Err_emptyMessage, message: "测试空标题"},
		{uid: 1, Fid: 10, Type: config.ThreadOperateTypeNew, Seccode: vaptcha.TestToken, Subject: subject, Message: "", result: protocol.Err_emptyMessage, message: "测试admin空message"},
		{uid: 5, Fid: 10, Type: config.ThreadOperateTypeNew, Seccode: vaptcha.TestToken, Subject: subject, Message: "", result: protocol.Err_message_tooshort, message: "测试message过短"},
		{uid: 5, Fid: 10, Type: config.ThreadOperateTypeNew, Seccode: vaptcha.TestToken, Subject: subject, Message: string(make([]byte, 655350)), result: protocol.Err_message_toolong, message: "测试message过长"},
		{uid: 5, Fid: 10, Type: config.ThreadOperateTypeNew, Seccode: vaptcha.TestToken, Subject: "熟女俱乐部的神秘往事", Message: message, result: protocol.Err_SubjectShieldingWord, message: "测试Subject屏蔽字"},
		{uid: 5, Fid: 10, Type: config.ThreadOperateTypeNew, Seccode: vaptcha.TestToken, Subject: subject, Message: message, Tags: "熟女俱乐部的神秘往事", result: protocol.Err_TagShieldingWord, message: "测试Tags屏蔽字"},
		{uid: 1, Fid: 10, Type: config.ThreadOperateTypeEdit, Tid: -1, result: protocol.Err_NotFoundThread, message: "测试不存在的tid"},
		{uid: 4, Fid: 11, Tid: 60, Typeid: 3, Type: config.ThreadOperateTypeEdit, result: protocol.Err_Groupperm, message: "测试没有权限"},
		{uid: 376, Fid: 11, Tid: 105, Typeid: 3, Type: config.ThreadOperateTypeEdit, result: protocol.Err_threadClosed, message: "测试帖子close"},
		{uid: 5, Fid: 11, Type: config.ThreadOperateTypeNew, Seccode: vaptcha.TestToken, Subject: subject, Message: message, result: protocol.Err_Typeid, message: "测试没有Typeid"},
		{uid: 5, Fid: 10, Type: config.ThreadOperateTypeNew, Seccode: vaptcha.TestToken, Subject: subject, Message: message, result: protocol.Success, message: "测试发帖成功"},
	} {
		ctx := ctxpool.Get().(*server.Context)
		ctx.Conn.Session.Store("Uid", u.uid)
		user := models.GetMemberInfoByID(u.uid)
		if user != nil {
			if u.notokenkey {
				user.TokenKey = ""
			} else {
				user.TokenKey = strconv.Itoa(int(u.Tid)) + "_" + strconv.Itoa(int(u.Position))
			}
		}

		ctx.Conn.Output_data = func(r *libraries.MsgBuffer) {
			cmd := protocol.READ_int32(r)
			switch cmd {
			case protocol.CMD_MSG_WS2U_CommonResult:
				data := protocol.READ_MSG_WS2U_CommonResult(r)
				result <- data.Result
				data.Put()
			case protocol.CMD_MSG_WS2U_Forum_newthread_submit:
				data := protocol.READ_MSG_WS2U_Forum_newthread_submit(r)
				result <- data.Result
				data.Put()
			default:
				result <- protocol.Err_msg

			}
		}
		t.Run(u.message, func(t *testing.T) {
			(&protocol.MSG_U2WS_Forum_newthread_submit{
				Fid:      u.Fid,
				Special:  u.Special,
				Type:     u.Type,
				Tid:      u.Tid,
				Position: u.Position,
				Message:  u.Message,
				Subject:  u.Subject,
				Typeid:   u.Typeid,
				Seccode:  u.Seccode,
				Tags:     u.Tags,
			}).WRITE(ctx.In)
			server.WebHandle(ctx)
			if r := <-result; r != u.result {
				if r < 0 {
					t.Errorf("forum_newthread结果%s", protocol.ErrcodeMsg[int16(r)])
				} else {
					t.Errorf("forum_newthread请求没有收到预想的结果,预计%d,结果%d", u.result, r)
				}
			}
		})
		ctxpool.Put(ctx)
	}
}
func Test_MSG_U2WS_forum_viewthread(t *testing.T) {
	type msg struct {
		uid          int32
		Tid          int32
		Page         int16
		Ordertype    int8
		Stand        int8
		Authorid     int32
		Position     int32
		Fromuid      int32
		resultuid    int16
		Group_status int32
		secPosition  int32
		message      string
	}
	result := make(chan int16, 1)
	for _, u := range []msg{{Tid: -1, resultuid: protocol.Err_NotFoundThread, message: "测试不存在的tid"},
		{uid: 1, Tid: 61, Position: 4, resultuid: protocol.Err_Position, message: "测试不存在的楼层"},
		{uid: 5, Tid: 61, resultuid: protocol.Success, Group_status: 0, secPosition: 2, message: "测试禁止发言权限"},
		{uid: 1, Tid: 61834, Ordertype: 1, resultuid: protocol.Success, Group_status: 2112449, secPosition: 8129, message: "测试管理员权限与倒序"},
		{uid: 4, Tid: 46411, Page: 2, resultuid: protocol.Success, Authorid: 403, Group_status: 2106177, secPosition: 2709, message: "测试实习版主发言权限与页数，只看某个人"},
	} {
		ctx := ctxpool.Get().(*server.Context)
		ctx.Conn.Session.Set("Uid", u.uid)
		ctx.Conn.Output_data = func(r *libraries.MsgBuffer) {
			cmd := protocol.READ_int32(r)
			switch cmd {
			case protocol.CMD_MSG_WS2U_CommonResult:
				data := protocol.READ_MSG_WS2U_CommonResult(r)
				result <- data.Result
				data.Put()
			case protocol.CMD_MSG_WS2U_forum_viewthread:
				data := protocol.READ_MSG_WS2U_forum_viewthread(r)
				if data.Group_status == u.Group_status && data.Postlist[1].Position == u.secPosition {
					result <- protocol.Success
				} else {
					result <- protocol.Fail
				}

				data.Put()
			default:
				result <- protocol.Err_msg
			}
		}
		t.Run(fmt.Sprintf("%+v", u), func(t *testing.T) {
			(&protocol.MSG_U2WS_forum_viewthread{
				Tid:       u.Tid,
				Page:      u.Page,
				Ordertype: u.Ordertype,
				Stand:     u.Stand,
				Authorid:  u.Authorid,
				Position:  u.Position,
				Fromuid:   u.Fromuid,
			}).WRITE(ctx.In)
			server.WebHandle(ctx)
			if r := <-result; r != u.resultuid {
				t.Errorf("forum_viewthread结果%s", protocol.ErrcodeMsg[int16(r)])
			}
		})
		ctxpool.Put(ctx)
	}
}
func Test_MSG_U2WS_threadfastpost(t *testing.T) {
	thread := (&models.Model_Forum_thread{}).GetForumThread(map[string]interface{}{"Fid": 10}, false)
	if thread == nil {
		t.Error("获取不到Fid为10的帖子")
		return
	}
	type msg struct {
		uid       int32
		Tid       int32
		Position  int32
		Subject   string
		Message   string
		Seccode   string
		Other     int8
		resultuid int16
		message   string
	}
	result := make(chan int16, 1)

	for _, u := range []msg{
		{Tid: -1, resultuid: protocol.Err_NotFoundThread, message: "测试不存在的tid"},
		{uid: 1, Tid: 61, Position: 4, resultuid: protocol.Err_NotFoundPost, message: "测试不存在的楼层"},
		{uid: 0, Tid: 45, resultuid: protocol.Err_Notlogin, message: "测试未登录"},
		{uid: 1, Tid: 45, resultuid: protocol.Err_emptyMessage, message: "测试空消息"},
		{uid: 6, Tid: 45, resultuid: protocol.Err_message_toolong, Message: string(make([]byte, 65535)), message: "测试消息过长"},
		{uid: 6, Tid: 45, resultuid: protocol.Err_message_tooshort, Message: string(make([]byte, 1)), message: "测试消息过短"},
		{uid: 6, Tid: 45, resultuid: protocol.Err_Seccode, Message: postmessage, message: "测试没有token"},
		{uid: 5, Tid: 45, Position: 1, resultuid: protocol.Err_Groupperm, Message: postmessage, Seccode: vaptcha.TestToken, message: "测试没有权限"},
		{uid: 6, Tid: 105, Position: 1, resultuid: protocol.Err_threadClosed, Message: postmessage, Seccode: vaptcha.TestToken, message: "测试帖子关闭"},
		{uid: 6, Tid: thread.Tid, Position: 1, resultuid: protocol.Success, Message: postmessage, Seccode: vaptcha.TestToken, message: "测试发帖成功"},
		{uid: 6, Tid: thread.Tid, Position: 1, resultuid: protocol.Success, Message: postmessage2, Seccode: vaptcha.TestToken, message: "测试发帖成功"},
	} {
		ctx := ctxpool.Get().(*server.Context)
		ctx.Conn.Session.Set("Uid", u.uid)
		ctx.Conn.Output_data = func(r *libraries.MsgBuffer) {
			cmd := protocol.READ_int32(r)
			switch cmd {
			case protocol.CMD_MSG_WS2U_threadfastpost:
				data := protocol.READ_MSG_WS2U_threadfastpost(r)
				result <- data.Result
				data.Put()

			default:
				result <- protocol.Err_msg
			}
		}
		t.Run(fmt.Sprintf("%+v", u), func(t *testing.T) {
			(&protocol.MSG_U2WS_threadfastpost{
				Tid:      u.Tid,
				Position: u.Position,
				Subject:  u.Subject,
				Message:  u.Message,
				Seccode:  u.Seccode,
				Other:    u.Other,
			}).WRITE(ctx.In)
			server.WebHandle(ctx)
			if r := <-result; r != u.resultuid {
				t.Errorf("forum_viewthread结果%s", protocol.ErrcodeMsg[int16(r)])
			}
		})
		ctxpool.Put(ctx)
	}
}
func Test_MSG_U2WS_nextset(t *testing.T) {
	type msg struct {
		Next    int8
		Tid     int32
		result  int32 //负值错误码，正值tid
		message string
	}
	result := make(chan int32, 1)
	for _, u := range []msg{{Tid: -1, result: protocol.Err_NotFoundThread, message: "测试不存在的tid"},
		{Tid: 45, Next: 1, result: 0, message: "没有更新的"},
		{Tid: 61, Next: -1, result: 0, message: "没有更老的"},
		{Tid: 60, Next: 1, result: 105, message: "测试下一贴"},
		{Tid: 45, Next: -1, result: 62, message: "测试上一贴"},
	} {
		ctx := ctxpool.Get().(*server.Context)
		ctx.Conn.Output_data = func(r *libraries.MsgBuffer) {
			cmd := protocol.READ_int32(r)
			switch cmd {
			case protocol.CMD_MSG_WS2U_CommonResult:
				data := protocol.READ_MSG_WS2U_CommonResult(r)
				result <- int32(data.Result)
				data.Put()
			case protocol.CMD_MSG_WS2U_nextset:
				data := protocol.READ_MSG_WS2U_nextset(r)
				result <- data.Tid
				data.Put()
			default:
				result <- protocol.Err_msg
			}
		}
		t.Run(fmt.Sprintf("%+v", u), func(t *testing.T) {
			(&protocol.MSG_U2WS_nextset{
				Next: u.Next,
				Tid:  u.Tid,
			}).WRITE(ctx.In)
			server.WebHandle(ctx)
			if r := <-result; r != u.result {
				t.Errorf("MSG_U2WS_nextset结果%d,%s", r, protocol.ErrcodeMsg[int16(r)])
			}
		})
		ctxpool.Put(ctx)
	}
}
func Test_MSG_U2WS_upload_image(t *testing.T) {

	webpdata, err := ioutil.ReadFile("./static/logo.webp")
	if err != nil {
		t.Error("无法获取测试webp图片")
	}
	pngdata, err := ioutil.ReadFile("./static/logo.png")
	jpgdata, err := ioutil.ReadFile("./static/logo.jpeg")
	bmpdata, err := ioutil.ReadFile("./static/logo.bmp")
	gifdata, err := ioutil.ReadFile("./static/logo.gif")
	type msg struct {
		uid             int32
		Filename        string
		Data            []byte
		result          int16
		message         string
		Todayattachs    int16
		Todayattachsize int32
		oss             bool
	}
	result := make(chan int16, 1)
	result1 := make(chan int16, 1)
	svr := &server.Httpserver{Out: libraries.NewBuffer(0)}
	buf := libraries.NewBuffer(0)
	token := make([]byte, 16)
	for _, u := range []msg{{result: protocol.Err_Notlogin, message: "测试未登录"},
		{uid: 5, result: protocol.Err_Groupperm, message: "测试无权限"},
		{uid: 6, result: protocol.Err_NotEnoughAttachs, Todayattachs: 1, message: "测试上传文件限制"},
		{uid: 6, result: protocol.Err_NotEnoughAttachsize, Todayattachsize: 1, message: "测试上传大小限制"},
		{uid: 1, result: protocol.Err_Imgtype, message: "测试无法识别类型"},
		{uid: 1, Filename: "testwebp", Data: webpdata, result: protocol.Success, message: "测试webp图片"},
		{uid: 1, Filename: "testjpg", Data: jpgdata, oss: true, result: protocol.Success, message: "测试jpg图片"},
		{uid: 1, Filename: "testpng", Data: pngdata, result: protocol.Success, message: "测试png图片"},
		{uid: 1, Filename: "testbmp", Data: bmpdata, result: protocol.Success, message: "测试bmp图片"},
		{uid: 1, Filename: "testgif", Data: gifdata, result: protocol.Success, message: "测试gif图片"},
	} {
		if u.oss {
			config.Server.OssEndpoint = OssEndpoint
			config.Server.OssBucketName = OssBucketName
			config.Server.OssAccessKeyId = OssAccessKeyId
			config.Server.OssAccessKeySecret = OssAccessKeySecret
		} else {
			config.Server.OssEndpoint = ""
			config.Server.OssBucketName = ""
			config.Server.OssAccessKeyId = ""
			config.Server.OssAccessKeySecret = ""
		}
		ctx := ctxpool.Get().(*server.Context)
		ctx.Conn.Session.Set("Uid", u.uid)
		if u.Todayattachs > 0 || u.Todayattachsize > 0 {
			user := models.GetMemberInfoByID(u.uid)
			if user != nil {
				user.Count.Todayattachs = u.Todayattachs
				user.Count.Todayattachsize = u.Todayattachsize
			}
		}

		ctx.Conn.Output_data = func(r *libraries.MsgBuffer) {
			cmd := protocol.READ_int32(r)
			switch cmd {
			case protocol.CMD_MSG_WS2U_CommonResult:
				data := protocol.READ_MSG_WS2U_CommonResult(r)
				result <- data.Result
				data.Put()
			case protocol.CMD_MSG_WS2U_upload_image:

				data := protocol.READ_MSG_WS2U_upload_image(r)
				t.Run("删除图片"+u.message, func(t *testing.T) {
					(&protocol.MSG_U2WS_delete_attach{
						Ids: []int64{data.Aid},
					}).WRITE(ctx.In)
					server.WebHandle(ctx)
					if r := <-result1; r != protocol.Success {
						t.Errorf("MSG_U2WS_nextset结果%d,%s", r, protocol.ErrcodeMsg[int16(r)])
					}
				})
				data.Put()
				result <- protocol.Success
			case protocol.CMD_MSG_WS2U_delete_attach:
				result1 <- protocol.Success
			default:
				result <- protocol.Err_msg
			}
		}
		t.Run(fmt.Sprintf("%+v", u), func(t *testing.T) {
			(&protocol.MSG_U2WS_upload_image{
				Data:     u.Data,
				Filename: u.Filename,
			}).WRITE(buf)
			ctx.In.Reset()
			ctx.In.Write(token)
			ctx.In.Write(buf.Bytes())
			svr.Conn = ctx.Conn
			svr.BeginRequest("upload", ctx)
			if r := <-result; r != u.result {
				t.Errorf("upload_image结果%d,%s", r, protocol.ErrcodeMsg[int16(r)])
			}
		})
		ctxpool.Put(ctx)
	}
}
func Test_MSG_U2WS_upload_tmp_image(t *testing.T) {

	webpdata, err := ioutil.ReadFile("./static/logo.webp")
	if err != nil {
		t.Error("无法获取测试webp图片")
	}
	pngdata, err := ioutil.ReadFile("./static/logo.png")
	jpgdata, err := ioutil.ReadFile("./static/logo.jpeg")
	bmpdata, err := ioutil.ReadFile("./static/logo.bmp")
	gifdata, err := ioutil.ReadFile("./static/logo.gif")
	type msg struct {
		uid             int32
		Filename        string
		Data            []byte
		result          int16
		message         string
		Todayattachs    int16
		Todayattachsize int32
	}
	result := make(chan int16, 1)
	svr := &server.Httpserver{Out: libraries.NewBuffer(0)}
	buf := libraries.NewBuffer(0)
	token := make([]byte, 16)
	for _, u := range []msg{{result: protocol.Err_Notlogin, message: "测试未登录"},
		{uid: 5, result: protocol.Err_Groupperm, message: "测试无权限"},
		{uid: 6, result: protocol.Err_NotEnoughAttachs, Todayattachs: 1, message: "测试上传文件限制"},
		{uid: 6, result: protocol.Err_NotEnoughAttachsize, Todayattachsize: 1, message: "测试上传大小限制"},
		{uid: 1, result: protocol.Err_Imgtype, message: "测试无法识别类型"},
		{uid: 1, Filename: "testwebp", Data: webpdata, result: protocol.Success, message: "测试webp图片"},
		{uid: 1, Filename: "testjpg", Data: jpgdata, result: protocol.Success, message: "测试jpg图片"},
		{uid: 1, Filename: "testpng", Data: pngdata, result: protocol.Success, message: "测试png图片"},
		{uid: 1, Filename: "testbmp", Data: bmpdata, result: protocol.Success, message: "测试bmp图片"},
		{uid: 1, Filename: "testgif", Data: gifdata, result: protocol.Success, message: "测试gif图片"},
	} {

		ctx := ctxpool.Get().(*server.Context)
		ctx.Conn.Session.Set("Uid", u.uid)
		if u.Todayattachs > 0 || u.Todayattachsize > 0 {
			user := models.GetMemberInfoByID(u.uid)
			if user != nil {
				user.Count.Todayattachs = u.Todayattachs
				user.Count.Todayattachsize = u.Todayattachsize
			}
		}

		ctx.Conn.Output_data = func(r *libraries.MsgBuffer) {
			cmd := protocol.READ_int32(r)
			switch cmd {
			case protocol.CMD_MSG_WS2U_CommonResult:
				data := protocol.READ_MSG_WS2U_CommonResult(r)
				result <- data.Result
				data.Put()
			case protocol.CMD_MSG_WS2U_upload_tmp_image:
				result <- protocol.Success
			default:
				result <- protocol.Err_msg
			}
		}
		t.Run(fmt.Sprintf("%+v", u), func(t *testing.T) {
			(&protocol.MSG_U2WS_upload_tmp_image{
				Data:     u.Data,
				Filename: u.Filename,
			}).WRITE(buf)
			ctx.In.Reset()
			ctx.In.Write(token)
			ctx.In.Write(buf.Bytes())
			svr.Conn = ctx.Conn
			svr.BeginRequest("upload", ctx)
			if r := <-result; r != u.result {
				t.Errorf("upload_tmp_image结果%d,%s", r, protocol.ErrcodeMsg[int16(r)])
			}
		})
		ctxpool.Put(ctx)
	}
}
func Test_MSG_U2WS_delete_attach(t *testing.T) {
	//合并在Test_MSG_U2WS_upload_image
}
func Test_MSG_U2WS_threadmod(t *testing.T) {
	m := &models.Model_Forum_thread{}
	thread := m.GetForumThread(map[string]interface{}{"Fid": 10}, false)
	if thread == nil {
		t.Error("获取不到Fid为10的帖子")
		return
	}
	_, err := m.Table("Log_forum_threadmod").Where(map[string]interface{}{"Tid": thread.Tid}).Delete()
	if err != nil {
		t.Error("测试删除mod操作记录失败" + err.Error())
		return
	}
	thread.Highlight = 0
	thread.Displayorder = 0
	thread.Digest = 0
	thread.Stamp = 0
	thread.Icon = 0
	thread.Closed = 0
	m.Table("Forum_thread").Replace(thread)
	m.Build_thread_index(map[string]interface{}{"Tid": thread.Tid}, true)
	expiration := int32(time.Now().Unix()) + 120
	testRun(t, []test_msg{
		test_msg{0, &protocol.MSG_U2WS_threadmod{Action: db.ThreadmodId升降, Param: -1}, &protocol.MSG_WS2U_CommonResult{Result: protocol.Err_param}, protocol.READ_MSG_WS2U_CommonResult, "测试全局参数错误"},
		test_msg{0, &protocol.MSG_U2WS_threadmod{Action: db.ThreadmodId升降, Expiration: -1}, &protocol.MSG_WS2U_CommonResult{Result: protocol.Err_param}, protocol.READ_MSG_WS2U_CommonResult, "测试全局参数错误"},
		test_msg{0, &protocol.MSG_U2WS_threadmod{Tids: []int32{thread.Tid}, Action: db.ThreadmodId升降, Param: -1}, &protocol.MSG_WS2U_CommonResult{Result: protocol.Err_param}, protocol.READ_MSG_WS2U_CommonResult, "测试升降参数错误"},
		test_msg{6, &protocol.MSG_U2WS_threadmod{Tids: []int32{thread.Tid}, Action: db.ThreadmodId升降, Param: 1}, &protocol.MSG_WS2U_CommonResult{Result: protocol.Err_Groupperm}, protocol.READ_MSG_WS2U_CommonResult, "测试升降没有权限"},
		test_msg{1, &protocol.MSG_U2WS_threadmod{Tids: []int32{0}, Action: db.ThreadmodId升降}, &protocol.MSG_WS2U_threadmod{}, protocol.READ_MSG_WS2U_threadmod, "测试升降tid0操作成功"},
		test_msg{1, &protocol.MSG_U2WS_threadmod{Tids: []int32{thread.Tid}, Action: db.ThreadmodId升降, Param: 0}, &protocol.MSG_WS2U_threadmod{}, protocol.READ_MSG_WS2U_threadmod, "测试升降操作成功"},
		test_msg{1, &protocol.MSG_U2WS_threadmod{Tids: []int32{thread.Tid}, Action: db.ThreadmodId置顶, Param: -1}, &protocol.MSG_WS2U_CommonResult{Result: protocol.Err_param}, protocol.READ_MSG_WS2U_CommonResult, "测试置顶参数错误"},
		test_msg{6, &protocol.MSG_U2WS_threadmod{Tids: []int32{thread.Tid}, Action: db.ThreadmodId置顶, Param: 1}, &protocol.MSG_WS2U_CommonResult{Result: protocol.Err_Groupperm}, protocol.READ_MSG_WS2U_CommonResult, "测试置顶没有权限"},
		test_msg{1, &protocol.MSG_U2WS_threadmod{Tids: []int32{0}, Action: db.ThreadmodId置顶}, &protocol.MSG_WS2U_threadmod{}, protocol.READ_MSG_WS2U_threadmod, "测试置顶tid0操作成功"},
		test_msg{1, &protocol.MSG_U2WS_threadmod{Tids: []int32{thread.Tid}, Action: db.ThreadmodId置顶, Param: 1, Expiration: expiration}, &protocol.MSG_WS2U_threadmod{}, protocol.READ_MSG_WS2U_threadmod, "测试置顶操作成功"},
		test_msg{1, &protocol.MSG_U2WS_threadmod{Tids: []int32{thread.Tid}, Action: db.ThreadmodId置顶, Param: 1}, &protocol.MSG_WS2U_threadmod{}, protocol.READ_MSG_WS2U_threadmod, "测试置顶操作成功"},
		test_msg{1, &protocol.MSG_U2WS_threadmod{Tids: []int32{thread.Tid}, Action: db.ThreadmodId高亮, Param: -1}, &protocol.MSG_WS2U_CommonResult{Result: protocol.Err_param}, protocol.READ_MSG_WS2U_CommonResult, "测试高亮参数错误"},
		test_msg{6, &protocol.MSG_U2WS_threadmod{Tids: []int32{thread.Tid}, Action: db.ThreadmodId高亮, Param: 1}, &protocol.MSG_WS2U_CommonResult{Result: protocol.Err_Groupperm}, protocol.READ_MSG_WS2U_CommonResult, "测试高亮没有权限"},
		test_msg{1, &protocol.MSG_U2WS_threadmod{Tids: []int32{0}, Action: db.ThreadmodId高亮}, &protocol.MSG_WS2U_threadmod{}, protocol.READ_MSG_WS2U_threadmod, "测试高亮tid0操作成功"},
		test_msg{1, &protocol.MSG_U2WS_threadmod{Tids: []int32{thread.Tid}, Action: db.ThreadmodId高亮, Param: 0}, &protocol.MSG_WS2U_threadmod{}, protocol.READ_MSG_WS2U_threadmod, "测试高亮直接返回"},
		test_msg{1, &protocol.MSG_U2WS_threadmod{Tids: []int32{thread.Tid}, Action: db.ThreadmodId高亮, Param: 1}, &protocol.MSG_WS2U_threadmod{}, protocol.READ_MSG_WS2U_threadmod, "测试高亮操作成功"},
		test_msg{1, &protocol.MSG_U2WS_threadmod{Tids: []int32{thread.Tid}, Action: db.ThreadmodId精华, Param: -1}, &protocol.MSG_WS2U_CommonResult{Result: protocol.Err_param}, protocol.READ_MSG_WS2U_CommonResult, "测试精华参数错误"},
		test_msg{6, &protocol.MSG_U2WS_threadmod{Tids: []int32{thread.Tid}, Action: db.ThreadmodId精华, Param: 1}, &protocol.MSG_WS2U_CommonResult{Result: protocol.Err_Groupperm}, protocol.READ_MSG_WS2U_CommonResult, "测试精华没有权限"},
		test_msg{1, &protocol.MSG_U2WS_threadmod{Tids: []int32{0}, Action: db.ThreadmodId精华}, &protocol.MSG_WS2U_threadmod{}, protocol.READ_MSG_WS2U_threadmod, "测试精华tid0操作成功"},
		test_msg{1, &protocol.MSG_U2WS_threadmod{Tids: []int32{thread.Tid}, Action: db.ThreadmodId精华, Param: 0}, &protocol.MSG_WS2U_threadmod{}, protocol.READ_MSG_WS2U_threadmod, "测试精华直接返回"},
		test_msg{1, &protocol.MSG_U2WS_threadmod{Tids: []int32{thread.Tid}, Action: db.ThreadmodId精华, Param: 1, Expiration: expiration}, &protocol.MSG_WS2U_threadmod{}, protocol.READ_MSG_WS2U_threadmod, "测试精华操作成功"},
		test_msg{1, &protocol.MSG_U2WS_threadmod{Tids: []int32{thread.Tid}, Action: db.ThreadmodId精华, Param: 1}, &protocol.MSG_WS2U_threadmod{}, protocol.READ_MSG_WS2U_threadmod, "测试精华操作成功"},
		test_msg{1, &protocol.MSG_U2WS_threadmod{Tids: []int32{thread.Tid}, Action: db.ThreadmodId图章, Param: -1}, &protocol.MSG_WS2U_CommonResult{Result: protocol.Err_param}, protocol.READ_MSG_WS2U_CommonResult, "测试图章参数错误"},
		test_msg{6, &protocol.MSG_U2WS_threadmod{Tids: []int32{thread.Tid}, Action: db.ThreadmodId图章, Param: 1}, &protocol.MSG_WS2U_CommonResult{Result: protocol.Err_Groupperm}, protocol.READ_MSG_WS2U_CommonResult, "测试图章没有权限"},
		test_msg{1, &protocol.MSG_U2WS_threadmod{Tids: []int32{0}, Action: db.ThreadmodId图章}, &protocol.MSG_WS2U_threadmod{}, protocol.READ_MSG_WS2U_threadmod, "测试图章tid0操作成功"},
		test_msg{1, &protocol.MSG_U2WS_threadmod{Tids: []int32{thread.Tid}, Action: db.ThreadmodId图章, Param: 1, Expiration: expiration}, &protocol.MSG_WS2U_threadmod{}, protocol.READ_MSG_WS2U_threadmod, "测试图章操作成功"},
		test_msg{1, &protocol.MSG_U2WS_threadmod{Tids: []int32{thread.Tid}, Action: db.ThreadmodId图章, Param: 1}, &protocol.MSG_WS2U_threadmod{}, protocol.READ_MSG_WS2U_threadmod, "测试图章操作成功"},
		test_msg{1, &protocol.MSG_U2WS_threadmod{Tids: []int32{thread.Tid}, Action: db.ThreadmodId图标, Param: -1}, &protocol.MSG_WS2U_CommonResult{Result: protocol.Err_param}, protocol.READ_MSG_WS2U_CommonResult, "测试图标参数错误"},
		test_msg{6, &protocol.MSG_U2WS_threadmod{Tids: []int32{thread.Tid}, Action: db.ThreadmodId图标, Param: 17}, &protocol.MSG_WS2U_CommonResult{Result: protocol.Err_Groupperm}, protocol.READ_MSG_WS2U_CommonResult, "测试图标没有权限"},
		test_msg{1, &protocol.MSG_U2WS_threadmod{Tids: []int32{0}, Action: db.ThreadmodId图标}, &protocol.MSG_WS2U_threadmod{}, protocol.READ_MSG_WS2U_threadmod, "测试图标tid0操作成功"},
		test_msg{1, &protocol.MSG_U2WS_threadmod{Tids: []int32{thread.Tid}, Action: db.ThreadmodId图标, Param: 17, Expiration: expiration}, &protocol.MSG_WS2U_threadmod{}, protocol.READ_MSG_WS2U_threadmod, "测试图标操作成功"},
		test_msg{1, &protocol.MSG_U2WS_threadmod{Tids: []int32{thread.Tid}, Action: db.ThreadmodId图标, Param: 17}, &protocol.MSG_WS2U_threadmod{}, protocol.READ_MSG_WS2U_threadmod, "测试图标操作成功"},
		test_msg{1, &protocol.MSG_U2WS_threadmod{Tids: []int32{thread.Tid}, Action: db.ThreadmodId关闭, Param: -1}, &protocol.MSG_WS2U_CommonResult{Result: protocol.Err_param}, protocol.READ_MSG_WS2U_CommonResult, "测试关闭参数错误"},
		test_msg{6, &protocol.MSG_U2WS_threadmod{Tids: []int32{thread.Tid}, Action: db.ThreadmodId关闭, Param: 1}, &protocol.MSG_WS2U_CommonResult{Result: protocol.Err_Groupperm}, protocol.READ_MSG_WS2U_CommonResult, "测试关闭没有权限"},
		test_msg{1, &protocol.MSG_U2WS_threadmod{Tids: []int32{0}, Action: db.ThreadmodId关闭}, &protocol.MSG_WS2U_threadmod{}, protocol.READ_MSG_WS2U_threadmod, "测试关闭tid0操作成功"},
		test_msg{1, &protocol.MSG_U2WS_threadmod{Tids: []int32{thread.Tid}, Action: db.ThreadmodId关闭, Param: 1, Expiration: expiration}, &protocol.MSG_WS2U_threadmod{}, protocol.READ_MSG_WS2U_threadmod, "测试关闭操作成功"},
		test_msg{1, &protocol.MSG_U2WS_threadmod{Tids: []int32{thread.Tid}, Action: db.ThreadmodId关闭, Param: 0}, &protocol.MSG_WS2U_threadmod{}, protocol.READ_MSG_WS2U_threadmod, "测试关闭操作成功"},
		test_msg{1, &protocol.MSG_U2WS_threadmod{Tids: []int32{thread.Tid}, Action: db.ThreadmodId移动, Param: -1}, &protocol.MSG_WS2U_CommonResult{Result: protocol.Err_param}, protocol.READ_MSG_WS2U_CommonResult, "测试移动参数错误"},
		test_msg{6, &protocol.MSG_U2WS_threadmod{Tids: []int32{thread.Tid}, Action: db.ThreadmodId移动, Param: 1, Expiration: 2}, &protocol.MSG_WS2U_CommonResult{Result: protocol.Err_Groupperm}, protocol.READ_MSG_WS2U_CommonResult, "测试移动没有权限"},
		test_msg{1, &protocol.MSG_U2WS_threadmod{Tids: []int32{thread.Tid}, Action: db.ThreadmodId移动, Param: 0}, &protocol.MSG_WS2U_CommonResult{Result: protocol.Err_forumId}, protocol.READ_MSG_WS2U_CommonResult, "测试移动没有fid"},
		test_msg{1, &protocol.MSG_U2WS_threadmod{Tids: []int32{thread.Tid}, Action: db.ThreadmodId移动, Param: 0, Expiration: 2}, &protocol.MSG_WS2U_CommonResult{Result: protocol.Err_Typeid}, protocol.READ_MSG_WS2U_CommonResult, "测试移动没有typeid"},
		test_msg{1, &protocol.MSG_U2WS_threadmod{Tids: []int32{0}, Action: db.ThreadmodId移动, Expiration: 2, Param1: 1}, &protocol.MSG_WS2U_threadmod{}, protocol.READ_MSG_WS2U_threadmod, "测试移动tid0操作成功"},
		test_msg{1, &protocol.MSG_U2WS_threadmod{Tids: []int32{thread.Tid}, Action: db.ThreadmodId移动, Param: 0, Expiration: 17, Param1: 68}, &protocol.MSG_WS2U_threadmod{}, protocol.READ_MSG_WS2U_threadmod, "测试移动操作成功"},
		test_msg{1, &protocol.MSG_U2WS_threadmod{Tids: []int32{thread.Tid}, Action: db.ThreadmodId分类, Param1: -1}, &protocol.MSG_WS2U_CommonResult{Result: protocol.Err_param}, protocol.READ_MSG_WS2U_CommonResult, "测试分类参数错误"},
		test_msg{6, &protocol.MSG_U2WS_threadmod{Tids: []int32{thread.Tid}, Action: db.ThreadmodId分类, Param1: 1}, &protocol.MSG_WS2U_CommonResult{Result: protocol.Err_Groupperm}, protocol.READ_MSG_WS2U_CommonResult, "测试分类没有权限"},
		test_msg{1, &protocol.MSG_U2WS_threadmod{Tids: []int32{0}, Action: db.ThreadmodId分类}, &protocol.MSG_WS2U_threadmod{}, protocol.READ_MSG_WS2U_threadmod, "测试分类tid0操作成功"},
		test_msg{1, &protocol.MSG_U2WS_threadmod{Tids: []int32{thread.Tid}, Action: db.ThreadmodId分类, Param1: 69}, &protocol.MSG_WS2U_threadmod{}, protocol.READ_MSG_WS2U_CommonResult, "测试分类成功"},
		test_msg{6, &protocol.MSG_U2WS_threadmod{Tids: []int32{thread.Tid}, Action: db.ThreadmodId标签, Param: 1, Expiration: 2}, &protocol.MSG_WS2U_CommonResult{Result: protocol.Err_Groupperm}, protocol.READ_MSG_WS2U_CommonResult, "测试标签没有权限"},
		test_msg{1, &protocol.MSG_U2WS_threadmod{Tids: []int32{0}, Action: db.ThreadmodId标签}, &protocol.MSG_WS2U_threadmod{}, protocol.READ_MSG_WS2U_threadmod, "测试标签tid0操作成功"},
		test_msg{1, &protocol.MSG_U2WS_threadmod{Tids: []int32{thread.Tid}, Action: db.ThreadmodId标签, Reason: "测试标签"}, &protocol.MSG_WS2U_threadmod{}, protocol.READ_MSG_WS2U_threadmod, "测试标签操作成功"},
		test_msg{6, &protocol.MSG_U2WS_threadmod{Tids: []int32{thread.Tid}, Action: db.ThreadmodId删除, Param: 1, Expiration: 2}, &protocol.MSG_WS2U_CommonResult{Result: protocol.Err_Groupperm}, protocol.READ_MSG_WS2U_CommonResult, "测试删除没有权限"},
		test_msg{1, &protocol.MSG_U2WS_threadmod{Tids: []int32{0}, Action: db.ThreadmodId删除}, &protocol.MSG_WS2U_threadmod{}, protocol.READ_MSG_WS2U_threadmod, "测试删除tid0操作成功"},
		test_msg{1, &protocol.MSG_U2WS_threadmod{Tids: []int32{thread.Tid}, Action: db.ThreadmodId删除}, &protocol.MSG_WS2U_threadmod{}, protocol.READ_MSG_WS2U_threadmod, "测试删除操作成功"},
		test_msg{1, &protocol.MSG_U2WS_threadmod{Action: db.ThreadmodId置顶回复, Param: -1}, &protocol.MSG_WS2U_CommonResult{Result: protocol.Err_param}, protocol.READ_MSG_WS2U_CommonResult, "测试置顶回复参数错误"},
		test_msg{6, &protocol.MSG_U2WS_threadmod{Tids: []int32{0}, Action: db.ThreadmodId置顶回复, Param: 1, Expiration: thread.Tid}, &protocol.MSG_WS2U_CommonResult{Result: protocol.Err_Groupperm}, protocol.READ_MSG_WS2U_CommonResult, "测试置顶回复没有权限"},
		test_msg{1, &protocol.MSG_U2WS_threadmod{Tids: []int32{0}, Action: db.ThreadmodId置顶回复, Expiration: 0}, &protocol.MSG_WS2U_CommonResult{Result: protocol.Err_NotFoundThread}, &protocol.MSG_WS2U_CommonResult{Result: protocol.Err_NotFoundThread}, "测试置顶回复找不到帖子"},
		test_msg{1, &protocol.MSG_U2WS_threadmod{Tids: []int32{0}, Action: db.ThreadmodId置顶回复, Expiration: thread.Tid}, &protocol.MSG_WS2U_threadmod{}, protocol.READ_MSG_WS2U_threadmod, "测试置顶回复没有tids操作成功"},
		test_msg{1, &protocol.MSG_U2WS_threadmod{Tids: []int32{3}, Action: db.ThreadmodId置顶回复, Expiration: thread.Tid, Param: 1}, &protocol.MSG_WS2U_threadmod{}, protocol.READ_MSG_WS2U_threadmod, "测试置顶回复操作成功"},
		test_msg{6, &protocol.MSG_U2WS_threadmod{Tids: []int32{0}, Action: db.ThreadmodId删除回复, Param: 1, Expiration: thread.Tid}, &protocol.MSG_WS2U_CommonResult{Result: protocol.Err_Groupperm}, protocol.READ_MSG_WS2U_CommonResult, "测试删除回复没有权限"},
		test_msg{1, &protocol.MSG_U2WS_threadmod{Tids: []int32{0}, Action: db.ThreadmodId删除回复, Expiration: 0}, &protocol.MSG_WS2U_CommonResult{Result: protocol.Err_NotFoundThread}, &protocol.MSG_WS2U_CommonResult{Result: protocol.Err_NotFoundThread}, "测试删除回复找不到帖子"},
		test_msg{1, &protocol.MSG_U2WS_threadmod{Tids: []int32{0}, Action: db.ThreadmodId删除回复, Expiration: thread.Tid}, &protocol.MSG_WS2U_threadmod{}, protocol.READ_MSG_WS2U_threadmod, "测试删除回复没有tids操作成功"},
		test_msg{1, &protocol.MSG_U2WS_threadmod{Tids: []int32{2}, Action: db.ThreadmodId删除回复, Expiration: thread.Tid}, &protocol.MSG_WS2U_threadmod{}, protocol.READ_MSG_WS2U_threadmod, "测试删除回复操作成功"},
	})
	thread = m.GetForumThread(map[string]interface{}{"Tid": thread.Tid}, true)
	if thread == nil {
		t.Error("mod重新获取thread消息失败")
	}
	view := m.GetThreadData(map[string]interface{}{"Tid": thread.Tid}, true)
	post := (&models.Model_Forum_post{}).GetPostInfoByPosition(thread.Tid, 1)
	switch {
	case int64(view.Lastpost) < time.Now().Unix()-5:
		t.Error("校验提升失败")
	case thread.Displayorder != 1:
		t.Error("校验置顶失败")
	case thread.Highlight != 1:
		t.Error("校验高亮失败")
	case thread.Digest != 1:
		t.Error("校验精华失败")
	case thread.Stamp != 1:
		t.Error("校验图章失败")
	case thread.Icon != 17:
		t.Error("校验图标失败")
	case thread.Fid != 17:
		t.Error("校验移动失败")
	case thread.Typeid != 69:
		t.Error("校验分类失败")
	case thread.Closed != 2:
		t.Error("校验删除失败")
	case len(post.Tags) == 0 || post.Tags[0].Tagid != 2:
		t.Error("校验标签失败")
	}
	post = (&models.Model_Forum_post{}).GetPostInfoByPosition(thread.Tid, 2)
	if post != nil {
		t.Error("删除回复失败")
	}
	post = (&models.Model_Forum_post{}).GetPostInfoByPosition(thread.Tid, 3)
	if post == nil || post.Stick != 1 {
		t.Error("置顶回复失败")
	}
	time.Sleep(time.Second * 5)
}
func Test_MSG_U2WS_viewthreadmod(t *testing.T) {
	m := &models.Model_Forum_thread{}
	thread := m.GetForumThread(map[string]interface{}{"Fid": 17}, false)
	if thread == nil {
		t.Error("获取不到Fid为17的帖子")
		return
	}
	result := make(chan int16, 1)
	ctx := ctxpool.Get().(*server.Context)
	ctx.Conn.Output_data = func(r *libraries.MsgBuffer) {
		cmd := protocol.READ_int32(r)
		switch cmd {
		case protocol.CMD_MSG_WS2U_CommonResult:
			data := protocol.READ_MSG_WS2U_CommonResult(r)
			result <- data.Result
			data.Put()
		case protocol.CMD_MSG_WS2U_viewthreadmod:
			data := protocol.READ_MSG_WS2U_viewthreadmod(r)
			switch {
			case len(data.List) != 8:
				t.Error("viewthreadmod获取的操作数量错误")

			}
			data.Put()
			result <- protocol.Success

		default:
			result <- protocol.Err_msg
		}
	}
	t.Run("测试MSG_U2WS_viewthreadmod", func(t *testing.T) {
		(&protocol.MSG_U2WS_viewthreadmod{
			Tid: thread.Tid,
		}).WRITE(ctx.In)
		server.WebHandle(ctx)
		if r := <-result; r != protocol.Success {
			t.Errorf("MSG_U2WS_viewthreadmod结果%d,%s", r, protocol.ErrcodeMsg[int16(r)])
		}
	})
	ctxpool.Put(ctx)
}
func Test_MSG_U2WS_forum_refresh(t *testing.T) {

	result := make(chan int32, 1)
	type data struct {
		fid      int32
		lastpost int32
		result   int32
	}

	for _, u := range []data{data{-1, 0, protocol.Err_forumId},
		data{2, int32(time.Now().Unix()), protocol.Success},
		data{15, 0, 15},
	} {
		ctx := ctxpool.Get().(*server.Context)
		ctx.Conn.Session.Set("Uid", int32(1))

		ctx.Conn.Output_data = func(r *libraries.MsgBuffer) {
			cmd := protocol.READ_int32(r)
			switch cmd {
			case protocol.CMD_MSG_WS2U_CommonResult:
				data := protocol.READ_MSG_WS2U_CommonResult(r)
				result <- int32(data.Result)
				data.Put()
			case protocol.CMD_MSG_WS2U_forum:
				data := protocol.READ_MSG_WS2U_forum(r)
				if data.Fid == u.result {
					result <- protocol.Success
				}

				data.Put()

			default:
				result <- protocol.Err_msg
			}
		}
		t.Run(fmt.Sprintf("%+v", u), func(t *testing.T) {
			(&protocol.MSG_U2WS_forum_refresh{
				Fid: u.fid,
			}).WRITE(ctx.In)
			server.WebHandle(ctx)
			if r := <-result; r != protocol.Success {
				t.Errorf("MSG_U2WS_viewthreadmod结果%d,%s", r, protocol.ErrcodeMsg[int16(r)])
			}
		})
		ctxpool.Put(ctx)
	}
}
func Test_MSG_U2WS_forum_carlist(t *testing.T) {

	testRun(t, []test_msg{test_msg{1, &protocol.MSG_U2WS_forum_carlist{}, &protocol.MSG_WS2U_forum_carlist{Catlist: []*protocol.MSG_forum_cart{&protocol.MSG_forum_cart{
		Name:  "PC王国",
		Catid: 1,
		Forums: []*protocol.MSG_forum_cart_child{
			&protocol.MSG_forum_cart_child{
				Fid:  2,
				Fup:  1,
				Name: "王者荣耀",
				Threadtypes: &protocol.MSG_forum_threadtype{
					Prefix: 1,
					Status: 7,
					Types: []*protocol.MSG_forum_type{
						&protocol.MSG_forum_type{Id: 1, Name: "分类1", Icon: "", Ismoderator: 1},
						&protocol.MSG_forum_type{Id: 2, Name: "分类2", Icon: "", Ismoderator: 1},
					},
				},
			},
			&protocol.MSG_forum_cart_child{
				Fid:  10,
				Fup:  1,
				Name: "LOL-英雄联盟",
				Threadtypes: &protocol.MSG_forum_threadtype{
					Prefix: 1,
					Status: 5,
					Types: []*protocol.MSG_forum_type{
						{Id: 66, Name: "测试分类1", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 67, Name: "测试分类2", Icon: "", Count: 0, Ismoderator: 1},
					},
				},
			},
			&protocol.MSG_forum_cart_child{
				Fid:  11,
				Fup:  1,
				Name: "无主之地3 ",
				Threadtypes: &protocol.MSG_forum_threadtype{
					Prefix: 1,
					Status: 7,
					Types: []*protocol.MSG_forum_type{
						{Id: 3, Name: "原创", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 4, Name: "转帖", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 5, Name: "讨论", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 6, Name: "下载", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 7, Name: "分享", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 8, Name: "求助", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 9, Name: "公告", Icon: "", Count: 0, Ismoderator: 1},
					},
				},
			},
			&protocol.MSG_forum_cart_child{
				Fid:  16,
				Fup:  1,
				Name: "硬件信息交流发布区",
				Threadtypes: &protocol.MSG_forum_threadtype{
					Prefix: 1,
					Status: 7,
					Types: []*protocol.MSG_forum_type{
						{Id: 55, Name: "公告", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 56, Name: "原创", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 57, Name: "转贴", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 58, Name: "杂谈", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 59, Name: "讨论", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 60, Name: "下载", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 61, Name: "分享", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 62, Name: "摄影", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 63, Name: "活动", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 64, Name: "求助", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 65, Name: "已解决", Icon: "", Count: 0, Ismoderator: 1},
					},
				},
			},
			&protocol.MSG_forum_cart_child{
				Fid:  13,
				Fup:  1,
				Name: "PC游戏综合讨论区",
				Threadtypes: &protocol.MSG_forum_threadtype{
					Prefix: 0,
					Status: 7,
					Types: []*protocol.MSG_forum_type{
						{Id: 23, Name: "转帖", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 24, Name: "活动", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 25, Name: "公告", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 26, Name: "杂谈", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 27, Name: "讨论", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 28, Name: "求助", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 29, Name: "原创", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 30, Name: "贴图", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 31, Name: "下载", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 32, Name: "分享", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 33, Name: "已解决", Icon: "", Count: 0, Ismoderator: 1},
					},
				},
			},
			&protocol.MSG_forum_cart_child{
				Fid:  14,
				Fup:  1,
				Name: "侠盗猎车手",
				Threadtypes: &protocol.MSG_forum_threadtype{
					Prefix: 1,
					Status: 7,
					Types: []*protocol.MSG_forum_type{
						{Id: 34, Name: "原创", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 35, Name: "转帖", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 36, Name: "下载", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 37, Name: "分享", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 38, Name: "求助", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 39, Name: "汉化", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 40, Name: "武器", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 41, Name: "载具", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 42, Name: "服饰", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 43, Name: "人物", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 44, Name: "环境", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 45, Name: "界面", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 46, Name: "功能", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 47, Name: "LSPDFR", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 48, Name: "贴图", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 49, Name: "音乐", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 50, Name: "已回复", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 51, Name: "讨论", Icon: "", Count: 0, Ismoderator: 1},
					},
				},
			},
			&protocol.MSG_forum_cart_child{
				Fid:  15,
				Fup:  1,
				Name: "PC游戏资源下载区",
				Threadtypes: &protocol.MSG_forum_threadtype{
					Prefix: 1,
					Status: 7,
					Types: []*protocol.MSG_forum_type{
						{Id: 52, Name: "光盘版", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 53, Name: "硬盘版", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 54, Name: "绿色版", Icon: "", Count: 0, Ismoderator: 1},
					},
				},
			},
			&protocol.MSG_forum_cart_child{
				Fid:  17,
				Fup:  1,
				Name: "测试板块",
				Threadtypes: &protocol.MSG_forum_threadtype{
					Prefix: 1,
					Status: 7,
					Types: []*protocol.MSG_forum_type{
						{Id: 68, Name: "测试分类", Icon: "", Count: 0, Ismoderator: 1},
						{Id: 69, Name: "测试分类2", Icon: "", Count: 0, Ismoderator: 1},
					},
				},
			},
		},
	}}}, protocol.READ_MSG_WS2U_forum_carlist, "测试MSG_WS2U_forum_carlist"}})
}
func Test_MSG_U2WS_GetPostWarnList(t *testing.T) {

	testRun(t, []test_msg{test_msg{1, &protocol.MSG_U2WS_GetPostWarnList{Tid: 110870, Position: 1}, &protocol.MSG_WS2U_viewthreadmod{}, protocol.READ_MSG_WS2U_viewthreadmod, "测试MSG_U2WS_GetPostWarnList"},
		test_msg{1, &protocol.MSG_U2WS_GetPostWarnList{Tid: 110870}, &protocol.MSG_WS2U_CommonResult{Result: protocol.Err_NotFoundPost}, protocol.READ_MSG_WS2U_CommonResult, "测试MSG_U2WS_GetPostWarnList没有Position"},
		test_msg{1, &protocol.MSG_U2WS_GetPostWarnList{}, &protocol.MSG_WS2U_CommonResult{Result: protocol.Err_NotFoundThread}, protocol.READ_MSG_WS2U_CommonResult, "测试MSG_U2WS_GetPostWarnList没有tid"}})
}
func Test_MSG_U2WS_space(t *testing.T) {

	result := make(chan int32, 1)
	type data struct {
		Uid     int32
		Name    string
		result  int32 //大于0验证uid
		message string
	}

	for _, u := range []data{data{-1, "", protocol.Err_NotFoundUser, "测试Uid错误"},
		data{0, "乱七八糟", protocol.Err_NotFoundUser, "测试Name错误"},
		data{407997, "", 407997, "测试找到用户"},
	} {
		ctx := ctxpool.Get().(*server.Context)
		ctx.Conn.Session.Set("Uid", int32(1))

		ctx.Conn.Output_data = func(r *libraries.MsgBuffer) {
			cmd := protocol.READ_int32(r)
			switch cmd {
			case protocol.CMD_MSG_WS2U_CommonResult:
				data := protocol.READ_MSG_WS2U_CommonResult(r)
				result <- int32(data.Result)
				data.Put()
			case protocol.CMD_MSG_WS2U_space:
				data := protocol.READ_MSG_WS2U_space(r)
				result <- data.Uid
				data.Put()

			default:
				result <- protocol.Err_msg
			}
		}
		t.Run(fmt.Sprintf("%+v", u), func(t *testing.T) {
			(&protocol.MSG_U2WS_space{
				Uid:  u.Uid,
				Name: u.Name,
			}).WRITE(ctx.In)
			server.WebHandle(ctx)
			if r := <-result; r != u.result {
				t.Errorf("测试%s,结果%d,%s", u.message, r, protocol.ErrcodeMsg[int16(r)])
			}
		})
		ctxpool.Put(ctx)
	}
}
func Test_MSG_U2WS_SpaceThread(t *testing.T) {

	result := make(chan int, 1)
	type data struct {
		Uid     int32
		Type    int8
		Page    int16
		result  int //验证返回条数
		message string
	}

	for _, u := range []data{data{-1, 0, 0, 0, "测试0结果"},
		data{407997, 0, 2, 0, "测试页数0结果"},
		data{407997, 0, 1, 1, "测试类型正常"},
		data{407997, 0, 1, 1, "测试帖子正常答复"},
		data{1, 1, 1, 20, "测试回复正常答复"},
	} {
		ctx := ctxpool.Get().(*server.Context)
		ctx.Conn.Session.Set("Uid", int32(1))

		ctx.Conn.Output_data = func(r *libraries.MsgBuffer) {
			cmd := protocol.READ_int32(r)
			switch cmd {

			case protocol.CMD_MSG_WS2U_SpaceThread:
				data := protocol.READ_MSG_WS2U_SpaceThread(r)
				result <- len(data.Threadlist)
				data.Put()

			default:
				result <- protocol.Err_msg
			}
		}
		t.Run(fmt.Sprintf("%+v", u), func(t *testing.T) {
			(&protocol.MSG_U2WS_SpaceThread{
				Uid:  u.Uid,
				Type: u.Type,
				Page: u.Page,
			}).WRITE(ctx.In)
			server.WebHandle(ctx)
			if r := <-result; r != u.result {
				t.Errorf("测试%s,希望结果%d,实际结果%d", u.message, u.result, r)
			}
		})
		ctxpool.Put(ctx)
	}
}
func Test_MSG_U2WS_searchThread(t *testing.T) {

	testRun(t, []test_msg{})
}
func Test_MSG_U2WS_spacecp(t *testing.T) {

	testRun(t, []test_msg{})
}
func Test_MSG_U2WS_tpl_success(t *testing.T) {

	testRun(t, []test_msg{})
}
func Test_MSG_U2WS_upload_avatar(t *testing.T) {

	testRun(t, []test_msg{})
}
func Test_MSG_U2WS_Edit_Profile(t *testing.T) {

	testRun(t, []test_msg{})
}
func Test_MSG_U2WS_RecommendThread(t *testing.T) {

	testRun(t, []test_msg{})
}
func Test_MSG_U2WS_SpacecpGroup(t *testing.T) {

	testRun(t, []test_msg{})
}
func Test_MSG_U2WS_SpacecpForum(t *testing.T) {

	testRun(t, []test_msg{})
}
func Test_MSG_U2WS_ChangePasswd_Gethash(t *testing.T) {

	testRun(t, []test_msg{})
}
func Test_MSG_U2WS_ChangePasswd(t *testing.T) {

	testRun(t, []test_msg{})
}
func Test_MSG_U2WS_Email_Verify(t *testing.T) {

	testRun(t, []test_msg{})
}
func Test_MSG_U2WS_LostPW(t *testing.T) {

	testRun(t, []test_msg{})
}
func Test_MSG_U2WS_ResetPW(t *testing.T) {

	testRun(t, []test_msg{})
}
func Test_MSG_U2WS_QQLoginUrl(t *testing.T) {

	testRun(t, []test_msg{})
}
func Test_MSG_U2WS_QQLogin(t *testing.T) {

	testRun(t, []test_msg{})
}
func Test_MSG_U2WS_BindAccount(t *testing.T) {

	testRun(t, []test_msg{})
}
func Test_MSG_U2WS_GetThreadBind(t *testing.T) {

	testRun(t, []test_msg{})
}
func Test_MSG_U2WS_GetChangeBindUrl(t *testing.T) {

	testRun(t, []test_msg{})
}
func Test_MSG_U2WS_ChangeBind(t *testing.T) {

	testRun(t, []test_msg{})
}
func Test_MSG_U2WS_PollThread(t *testing.T) {

	testRun(t, []test_msg{})
}
