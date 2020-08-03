package db

import (
	"bbs/config"
	"bbs/db/mysql"
	"bbs/libraries"
	"reflect"
	"sync"
	"time"
)

const (
	log_chan_num = 200
)

var DBlog_init = &mysql.Db_init{
	Init: Init_register_dblog,
	Destroy: func() {

	},
}
var Lastthreadmod sync.Map

func Init_register_dblog(db *mysql.Mysql) {

	//CheckError(db.Exec("set global innodb_flush_log_at_trx_commit=2"))
	errs := db.StoreEngine("TokuDB").Sync2(
		new(Log_login),
		new(Log_member_action),
		new(Log_forum_threadmod),
		new(Log_forum_modwork),
		new(Log_forum_warning),
	)
	if errs != nil {
		libraries.Log("%v", errs)
	}
	var threadmods []*Log_forum_threadmod
	libraries.GoRoutineExecFunction(func() {
		err := mysql.Query([]byte("select * from "+config.Server.Tablepre+threadmod_tablename+" where Id in (select Id from (select max(Id) as Id from "+config.Server.Tablepre+threadmod_tablename+" where Position=0 GROUP BY Tid) as a)"), 1, nil, &threadmods)
		if err != nil {
			libraries.Log("初始化帖子操作日志失败 %v", err)
		}
		for _, v := range threadmods {
			Lastthreadmod.Store(v.Tid, v)
		}
	})
}

//登录日志
type Log_login struct {
	Uid        int32
	Login_time time.Time //登录时间
	IP         string
	User_agent string
}

var log_login_chan = make(chan *Log_login, log_chan_num)
var db_log_login_chan = make(chan *Log_login, log_chan_num)

func (member *Common_member) WritelLog_login(ip, user_agent string) {
	//写入登录日志
	log := <-log_login_chan
	log.Uid = member.Uid
	log.IP = ip
	log.User_agent = user_agent
	log.Login_time = time.Now()
	select {
	case db_log_login_chan <- log:
	default:
		chanfull <- true
	}
}

//用户操作日志
type Log_member_action struct {
	Id       int32 `db:"not null;auto_increment;pk"`
	Uid      int32 `db:"not null;default(0);index"`
	Action   int8  `db:"not null;default(0);index"`
	Dateline int64 `db:"not null;default(0);index"`
}

var log_member_action_chan = make(chan *Log_member_action, log_chan_num)
var db_log_member_action = make(chan *Log_member_action, log_chan_num)

func (member *Common_member) Useractionlog(Type string) {
	action := int8(-1)
	for k, v := range []string{"tid", "pid", "blogid", "picid", "doid", "sid", "aid", "uid_cid", "blogid_cid", "sid_cid", "picid_cid", "aid_cid", "topicid_cid", "pmid"} {
		if v == Type {
			action = int8(k)
		}
	}
	if action == -1 {
		return
	}
	log := <-log_member_action_chan
	log.Uid = member.Uid
	log.Action = action
	log.Dateline = time.Now().Unix()

	select {
	case db_log_member_action <- log:
	default:
		chanfull <- true
	}
}

//主题操作日志
type Log_forum_threadmod struct {
	Id         int64  `db:"not null;auto_increment;pk"`
	Fid        int32  `db:"not null;default(0);index"` //方便统计和测试
	Tid        int32  `db:"not null;default(0);index"`
	Position   int32  `db:"not null;default(0);index"`
	Uid        int32  `db:"not null;default(0)"`
	Dateline   int64  `db:"not null;default(0) "`
	Expiration int32  `db:"not null;default(0);index"`
	Action     string `db:"not null;type:varchar(5)"`
	Status     int8   `db:"not null;default(0);index"`
	Reason     string `db:"not null;type:mediumtext"`
	//以下是操作直接传递过来的
	ActionId int8  `db:"not null;default(0);index"`
	Param    int8  //额外的参数，
	Param1   int32 //额外的参数，
}

const (
	ThreadmodId删除   = 0
	ThreadmodId升降   = 1
	ThreadmodId置顶   = 2
	ThreadmodId高亮   = 3
	ThreadmodId精华   = 4
	ThreadmodId推荐   = 5
	ThreadmodId图章   = 6
	ThreadmodId图标   = 7
	ThreadmodId关闭   = 8
	ThreadmodId移动   = 9
	ThreadmodId分类   = 10
	ThreadmodId复制   = 11
	ThreadmodId警告   = 12
	ThreadmodId屏蔽   = 13
	ThreadmodId标签   = 14
	ThreadmodId置顶回复 = 15
	ThreadmodId删除回复 = 16
	//以下用于发帖，修改，回帖日志
	ThreadmodIdNew    = 17
	ThreadmodIdEdit   = 18
	ThreadmodIdReplay = 19
)

var log_Forum_threadmod_chan = make(chan *Log_forum_threadmod, log_chan_num)
var db_log_Forum_threadmod = make(chan *Log_forum_threadmod, log_chan_num)

func Updatethreadmodlog(fid, tid, position int32, action string, expiration int32, reason string, user *Common_member, actionId int8, param int8, param1 int32) {

	log := <-log_Forum_threadmod_chan
	log.Fid = fid
	log.Tid = tid
	log.Position = position
	log.Uid = user.Uid
	log.Dateline = time.Now().Unix()
	log.Action = action
	log.Expiration = expiration
	log.Status = 1
	log.Reason = reason
	log.ActionId = actionId
	log.Param = param
	log.Param1 = param1
	select {
	case db_log_Forum_threadmod <- log:
	default:
		chanfull <- true
	}

	if user.Uid > 0 {
		user.Updatemodworks(action, 1)
	}
}

//论坛管理工作统计
type Log_forum_modwork struct {
	Uid       int32     `db:"not null;default(0);index"`
	Modaction string    `db:"not null;type:varchar(3)"`
	Dateline  time.Time `db:"not null;default('2006-01-01');index"`
	Count     int16     `db:"not null;default(0)"`
	Posts     int16     `db:"not null;default(0)"`
}

var db_log_Forum_modwork = make(chan *Log_forum_modwork, log_chan_num)

func (member *Common_member) Updatemodworks(modaction string, posts int16) {
	return
	//if member.Forum_modwork == nil {
	//	return
	//}
	var log *Log_forum_modwork
	//for _, work := range member.Forum_modwork {
	//	if work.Modaction == modaction {
	//		log = work
	//		log.Posts += log.Posts
	//		log.Count += 1
	//	}
	//}
	if log == nil {
		log = &Log_forum_modwork{
			Uid:       member.Uid,
			Modaction: modaction,
			Dateline:  libraries.Todaytime(),
			Count:     1,
			Posts:     posts,
		}
	}

	select {
	case db_log_Forum_modwork <- log:
	default:
		chanfull <- true
	}
}

//警告日志 停止开发
type Log_forum_warning struct {
	Wid        int32 `db:"not null;auto_increment;pk"`
	Tid        int32
	Position   int32
	Operatorid int32  `db:"not null"`
	Operator   string `db:"not null;type:varchar(15)"`
	Authorid   int32  `db:"not null;index"`
	Author     string `db:"not null;type:varchar(15)"`
	Dateline   int64  `db:"not null"`
	Status     bool   //0解除,1有效
	Reason     string `db:"not null;type:varchar(40)"`
}

var log_Forum_warning_chan = make(chan *Log_forum_warning, log_chan_num)
var db_log_Forum_warning = make(chan *Log_forum_warning, log_chan_num)

func UpdateForum_warning(tid int32, pos int32, authorid int32, author string, reason string, status bool, user *Common_member) {
	now := time.Now().Unix()
	log := <-log_Forum_warning_chan
	log.Tid = tid
	log.Position = pos
	log.Operatorid = user.Uid
	log.Operator = user.Username
	log.Author = author
	log.Authorid = authorid
	log.Dateline = now
	log.Status = status
	db_log_Forum_warning <- log

	action := "WRN"
	if !status {
		action = "UWN"
	}
	if user.Uid > 0 {
		user.Updatemodworks(action, 1)
	}
}

func init() {
	for i := 0; i < log_chan_num; i++ {
		log_login_chan <- &Log_login{}
		log_member_action_chan <- &Log_member_action{}
		log_Forum_threadmod_chan <- &Log_forum_threadmod{}
		log_Forum_warning_chan <- &Log_forum_warning{}
	}

}

var threadmod_tablename = reflect.TypeOf(new(Log_forum_threadmod)).Elem().Name()
var threadmod_sqlpre []byte
