package models

import (
	"bbs/config"
	"bbs/db"
	"bbs/db/mysql"
	"bbs/qq"
	"bbs/server"

	//"github.com/gin-gonic/gin"
	//"fmt"
	"bbs/libraries"
	"bbs/protocol"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/luyu6056/cache"
)

type Model_member struct {
	Model
}

/**
* 会员详细信息（查库）
 */
func (m *Model_member) GetMemberInfo(condition map[string]interface{}, field string, master bool) (result *db.Common_member) {
	err := m.Table("Common_member").Field(field).Where(condition).Master(master).Find(&result)
	m.Ctx.Adderr(err, map[string]interface{}{"condition": condition, "field": field, "master": master})
	return result
}

/**
* 取得会员详细信息（优先查询缓存）
 * 如果未找到，则缓存所有字段
 * @param int member_id
 * @param string field 需要取得的缓存键值, 例如："*","member_name,member_sex"
 * @return map[string]string
*/
var memberinfo_cache []*db.Common_member
var memberinfo_cache_lock sync.RWMutex
var member_uid_offset int32

func GetMemberInfoByID(uid int32) (member_info *db.Common_member) {
	index := uid - member_uid_offset
	if index < 0 || int(index) >= len(memberinfo_cache) {
		return
	}
	member_info = memberinfo_cache[index]
	if member_info != nil {
		if member_info.Uid == -1 {
			return nil
		}
		if member_info.Uid == uid {
			return
		}
	}
	member_info = &db.Common_member{Field_forum: &db.Common_member_field_forum{}}
	model := new(Model)
	err := model.Table("Common_member").Where(map[string]interface{}{"Uid": uid}).Find(&member_info)
	if err != nil {
		libraries.DEBUG("获取用户信息错误Uid:" + strconv.Itoa(int(uid)))
		return nil
	}
	if member_info.Uid != 0 {
		if group := (*Model_usergroup).GetUserGroupByID(nil, member_info.Groupid); group != nil {
			member_info.Group = group
		} else {
			if group := (*Model_usergroup).GetMemberGroupIDFromCredits(nil, member_info.Credits); group != nil {
				member_info.Groupid = group.Groupid
				member_info.Group = group
				member_info.UpdateDB()
			} else {
				libraries.DEBUG("致命错误，无法获取用户组，积分", member_info.Credits)
				return nil
			}
		}

		err = model.Table("Common_member_count").Where(map[string]interface{}{"Uid": uid}).Find(&member_info.Count)
		if err != nil || member_info.Count == nil {
			libraries.DEBUG("获取用户count信息错误" + strconv.Itoa(int(uid)))
		}

		member_info.Admin_Group = (*Model_usergroup).GetAdminGroupByAdminID(nil, member_info.Adminid)

		err = model.Table("Common_member_field_forum").Where(map[string]interface{}{"Uid": member_info.Uid}).Find(&member_info.Field_forum)
		if err != nil {
			libraries.DEBUG("获取用户Field_forum信息错误" + strconv.Itoa(int(uid)))
		}
		/*_, err = model.Table("Forum_attachment").Where(map[string]interface{}{"Uid": member_info.Uid, "Isimage": true, "Isused": false}).Select(&member_info.Imgattachs)
		if err != nil {
			libraries.DEBUG("获取用户Forum_attachment信息错误" + strconv.Itoa(int(uid)))
		}
		//_, err = model.Table("Home_album").Where(map[string]interface{}{"Uid": uid}).Find(&member_info.Albums)
		//if err != nil {
		//	libraries.DEBUG("获取用户Albums信息错误" + strconv.Itoa(int(uid)))
		//}
		_, err = model.Table("Common_member_field_home").Where(map[string]interface{}{"Uid": member_info.Uid}).Find(&member_info.Field_home)
		if err != nil {
			libraries.DEBUG("获取用户field_home信息错误" + strconv.Itoa(int(uid)))
		}
		_, err = model.Table("Common_member_profile").Where(map[string]interface{}{"Uid": member_info.Uid}).Find(&member_info.Profile)
		if err != nil {
			libraries.DEBUG("获取用户Profile信息错误" + strconv.Itoa(int(uid)))
		}
		_, err = model.Table("Forum_attachment").Where(map[string]interface{}{"Uid": member_info.Uid, "Isimage": false, "Isused": false}).Select(&member_info.Attachs)
		if err != nil {
			libraries.DEBUG("获取用户Forum_attachment信息错误" + strconv.Itoa(int(uid)))
		}
		if member_info.Group.Radminid > 0 && Setting.Modworkstatus {
			member_info.Forum_modwork = []*db.Forum_modwork{}
			_, err = model.Table("Forum_modwork").Where(map[string]interface{}{"Uid": member_info.Uid, "Dateline": libraries.Todaytime().Format("2006-01-02")}).Select(&member_info.Forum_modwork)
			if err != nil {
				libraries.DEBUG("获取用户Forum_modwork信息错误" + strconv.Itoa(int(uid)))
			}
		}*/
		if member_info.Forum_access == nil {
			member_info.Forum_access = make(map[int32]*db.Forum_access)
		}
	} else {
		member_info.Uid = -1
	}
	memberinfo_cache[index] = member_info
	if member_info.Uid == -1 {
		member_info = nil
	}
	return
}
func (model *Model_member) GetMemberInfoByIDS(ids []int32) (users []*db.Common_member) {
	users = make([]*db.Common_member, len(ids))
	index := 0
	for i := len(ids) - 1; i >= 0; i-- {
		uid := ids[i]
		ii := uid - member_uid_offset
		if ii < 0 || int(ii) >= len(memberinfo_cache) {
			continue
		}
		member_info := memberinfo_cache[ii]
		if member_info != nil {

			if member_info.Uid == -1 {
				continue
			}
			if member_info.Uid == uid {
				users[index] = member_info
				ids = append(ids[:i], ids[i+1:]...)
				index++
			}
		}

	}
	if len(ids) > 0 {
		var memberList []*db.Common_member
		err := model.Table("Common_member").Where(map[string]interface{}{"Uid": ids}).Select(&memberList)
		if err != nil {
			libraries.DEBUG("获取用户信息错误Uid:", ids)
			return
		}
		var memberCounts []*db.Common_member_count
		err = model.Table("Common_member_count").Where(map[string]interface{}{"Uid": ids}).Select(&memberCounts)
		if err != nil {
			libraries.DEBUG("获取用户count信息错误", ids)
		}
		var memberFieldForums []*db.Common_member_field_forum
		err = model.Table("Common_member_field_forum").Where(map[string]interface{}{"Uid": ids}).Select(&memberFieldForums)
		for _, member_info := range memberList {
			for _, count := range memberCounts {
				if count.Uid == member_info.Uid {
					member_info.Count = count
				}
			}
			for _, field_forum := range memberFieldForums {
				if field_forum.Uid == member_info.Uid {
					member_info.Field_forum = field_forum
				}
			}
			if group := (*Model_usergroup).GetUserGroupByID(nil, member_info.Groupid); group != nil {
				member_info.Group = group
			} else {
				if group := (*Model_usergroup).GetMemberGroupIDFromCredits(nil, member_info.Credits); group != nil {
					member_info.Groupid = group.Groupid
					member_info.Group = group
					member_info.UpdateDB()
				} else {
					libraries.DEBUG("致命错误，无法获取用户组，积分", member_info.Credits)
					return nil
				}
			}
			member_info.Admin_Group = (*Model_usergroup).GetAdminGroupByAdminID(nil, member_info.Adminid)
			/*if member_info.Group.Radminid > 0 && Setting.Modworkstatus {
				member_info.Forum_modwork = []*db.Forum_modwork{}
				_, err = model.Table("Forum_modwork").Where(map[string]interface{}{"Uid": member_info.Uid, "Dateline": libraries.Todaytime().Format("2006-01-02")}).Select(&member_info.Forum_modwork)
				if err != nil {
					libraries.DEBUG("获取用户Forum_modwork信息错误", member_info.Uid)
				}
			}*/
			if member_info.Forum_access == nil {
				member_info.Forum_access = make(map[int32]*db.Forum_access)
			}
			memberinfo_cache_lock.Lock()
			ii := member_info.Uid - member_uid_offset
			if l := ii - int32(len(memberinfo_cache)) + 1; l > 0 {
				memberinfo_cache = append(memberinfo_cache, make([]*db.Common_member, l)...)
			}
			memberinfo_cache[ii] = member_info
			memberinfo_cache_lock.Unlock()
			users[index] = member_info
			index++
		}

	}
	return

}
func reflush_member() {

	//memberinfo_cache_lock.Lock()
	//defer memberinfo_cache_lock.Unlock()
	for k, v := range memberinfo_cache {
		if v != nil {
			/*if v.Group.Radminid > 0 && Setting.Modworkstatus {
				v.Forum_modwork = []*db.Forum_modwork{}
			} else {
				v.Forum_modwork = nil
			}*/
			v.Count.Todayattachs = 0
			v.Count.Todayattachsize = 0
			if !v.Isonline { //清缓存
				memberinfo_cache[k] = nil
			}
			v.Count.SpaceView.Range(func(key, _ interface{}) bool {
				v.Count.SpaceView.Delete(key)
				return true
			})
		}
	}
}
func memberinfo_init() {
	model := &Model_member{}
	model.Ctx = &server.Context{Conn: &server.ClientConn{}}
	c, err := model.Table("Common_member").Count()
	if err != nil {
		panic("初始化model检查member失败" + err.Error())
	}
	if c == 0 {
		model.Exec("alter table " + config.Server.Tablepre + "Common_member AUTO_INCREMENT=1")
		member_info, code := model.AddMember(&protocol.MSG_U2WS_Register{
			Username: "admin",
			Email:    "admin@admin.com",
			Passwd:   "123456",
		})
		if member_info != nil {
			member_info.Allowadmincp = 1
			member_info.Groupid = 1
			member_info.Adminid = 1
			member_info.UpdateDB()
		} else {
			model.Ctx.Save_errlog()
			libraries.Log("发生致命错误，无法初始化admin用户,错误码" + strconv.Itoa(int(code)))
		}

	}

	res, _ := mysql.QueryMap([]byte("select AUTO_INCREMENT from INFORMATION_SCHEMA.TABLES where TABLE_NAME='"+config.Server.Tablepre+"Common_member'"), 0, nil)
	if res == nil {
		panic("member初始化错误，无法获得自增Uid")
	}
	info, err := model.Table("Common_member").Field("Uid").Order("Uid asc").FindMap()
	if err != nil {
		panic("model_member初始化错误，无法获得最小member_id")
	}
	if info == nil {
		info = map[string]string{"Uid": res[0]["AUTO_INCREMENT"]}
	}
	id, _ := strconv.Atoi(info["Uid"])
	auto_id, _ := strconv.Atoi(res[0]["AUTO_INCREMENT"])

	member_uid_offset = int32(id)
	memberinfo_cache = make([]*db.Common_member, int32(auto_id)-member_uid_offset)
}

var Onlinenum, Usernum int32
var LastUserName string
var Conn_m sync.Map

//2019-10-25 改为websocket实现
func member_calc_num() {
	defer recover()
	var u_n int32
	session_m := map[string]*cache.Hashvalue{}
	Conn_m.Range(func(k, v interface{}) bool {
		if v != nil {
			session_m[v.(*server.ClientConn).Session.Load_str("token")] = v.(*server.ClientConn).Session
		} else {
			Conn_m.Delete(k)
		}
		return true
	})
	Onlinenum = int32(len(session_m))
	for _, session := range session_m {
		if session.Load_int32("Uid") > 0 {
			u_n++
		}
	}
	Usernum = u_n

}

func (m *Model_member) Login(username, password, hash string) (result int16, member_info *db.Common_member) {

	condition := make(map[string]interface{})
	condition["Username"] = username
	field := "Uid"
	member_info = m.GetMemberInfo(condition, field, false)
	if member_info == nil && libraries.Preg_match("/^0?(13|15|17|18|14)[0-9]{9}/", username) { //根据会员名没找到时查手机号
		delete(condition, "Username")
		condition["Phone"] = username
		member_info = m.GetMemberInfo(condition, field, false)

	}
	if member_info == nil && libraries.Preg_match("/\\d+/", username) { //根据会员名没找到时查Uid
		delete(condition, "Phone")
		delete(condition, "Username")
		condition["Uid"] = username
		member_info = m.GetMemberInfo(condition, field, false)

	}
	if member_info == nil && (strings.Index(username, "@") > 0) { //按邮箱和密码查询会员
		delete(condition, "Uid")
		delete(condition, "Phone")
		delete(condition, "Username")
		condition["Email"] = username
		member_info = m.GetMemberInfo(condition, field, false)
	}
	if member_info == nil {
		return protocol.Err_NotFoundUser, nil
	}
	if member_info = GetMemberInfoByID(member_info.Uid); member_info == nil {
		return protocol.Err_NotFoundUser, nil
	}
	if libraries.SHA256_S(member_info.Password+hash) != password {
		return protocol.Err_Password, nil
	}
	//process::clear("login")
	if member_info.Status != 0 {
		return protocol.Err_freezing, nil
	}

	member_info.WritelLog_login(m.Ctx.Conn.IP, m.Ctx.Conn.UserAgent)

	member_info.Lock.Lock()
	m.Table("Home_notification").Where(map[string]interface{}{"Uid": member_info.Uid}).Limit(0).Select(&member_info.Notice)
	var pmNum int32
	for _, v := range member_info.Notice {
		if v.New == 1 {
			pmNum++
		}
	}
	member_info.Newpm = pmNum
	var forum_history []int32
	m.Ctx.Conn.Session.Get("forum_history", &forum_history)
	var add bool
	for i := len(forum_history) - 1; i >= 0; i-- {
		var exist bool
		for _, id := range member_info.Forum_history {
			if id == forum_history[i] {
				exist = true
				break
			}
		}
		if !exist {
			member_info.Forum_history = append([]int32{forum_history[i]}, member_info.Forum_history...)
			add = true
		}
	}
	if add {
		member_info.UpdateDB()
	}

	m.Ctx.Conn.Session.Delete("forum_history")
	member_info.Lock.Unlock()
	return protocol.Success, member_info
}
func (m *Model_member) AddMember(data *protocol.MSG_U2WS_Register) (member_info *db.Common_member, errocde int16) {
	if len(data.Passwd) < 6 {
		return nil, protocol.Err_PasswordShort
	}
	model_email := new(Model_email_template)
	model_email.Ctx = m.Ctx
	if code := model_email.CheckEmail(data.Email); code != protocol.Success {
		return nil, code
	}
	condition := make(map[string]interface{})
	condition["Username"] = data.Username
	condition["Email"] = data.Email
	condition["EmailNew"] = data.Email
	err := m.Table("Common_member").Field("Uid").WhereOr(condition).Master(true).Find(&member_info)
	if err != nil {
		m.Ctx.Adderr(err, map[string]interface{}{"member_info": member_info})
		return nil, protocol.Err_db
	}
	if member_info != nil {
		return nil, protocol.Err_Alreadyregistered
	}

	m.BeginTransaction()
	defer func() {
		if errocde != protocol.Success {
			m.Rollback()
		} else {
			m.Commit()
		}
		m.EndTransaction()
	}()
	now := time.Now().Unix()
	member_info = &db.Common_member{
		EmailNew:      data.Email,
		Username:      data.Username,
		Regdate:       now,
		Emailstatus:   libraries.MD5_S(data.Email + data.Username),
		Avatar:        "noavatar.gif",
		EmailSendTime: int32(now),
	}
	if group := (*Model_usergroup).GetMemberGroupIDFromCredits(nil, 0); group != nil {
		member_info.Groupid = group.Groupid
		member_info.Group = group
	} else {
		return nil, protocol.Err_register_NofondGroup
	}
	member_info.Password_salt = libraries.MD5_S(data.Username + strconv.Itoa(libraries.Rand(100000, 999999)))
	member_info.Password = libraries.MD5_S(data.Passwd + member_info.Password_salt)
	insert_id, err := m.Table("Common_member").Insert(member_info)
	if err != nil {
		m.Ctx.Adderr(err, map[string]interface{}{"member_info": member_info})
	}
	if insert_id <= 0 {
		return nil, protocol.Err_register_CreateMember
	}
	member_info.Uid = int32(insert_id)
	member_info.Count = &db.Common_member_count{Uid: member_info.Uid, Regip: m.Ctx.Conn.IP, Lastip: m.Ctx.Conn.IP}
	err = m.Table("Common_member_count").Replace(member_info.Count)
	if err != nil {
		m.Ctx.Adderr(err, map[string]interface{}{"Uid": member_info.Uid})
		return nil, protocol.Err_register_CreateMemberCount
	}

	/*_, err = m.Table("Common_member_profile").Insert(&db.Common_member_profile{Uid: member_info.Uid}, true)
	if err != nil {
		m.Ctx.Adderr(err, map[string]interface{}{"Uid": member_info.Uid})
		return nil, errors.New("数据库新建会员Common_member_field_home信息失败")
	}
	_, err = m.Table("Common_member_field_home").Insert(&db.Common_member_field_home{Uid: member_info.Uid, Privacy: &db.Common_member_field_home_Privacy{}}, true)
	if err != nil {
		m.Ctx.Adderr(err, map[string]interface{}{"Uid": member_info.Uid})
		return nil, errors.New("数据库新建会员Common_member_field_home信息失败")
	}*/
	member_info.Field_forum = &db.Common_member_field_forum{Uid: member_info.Uid}
	err = m.Table("Common_member_field_forum").Replace(member_info.Field_forum)
	if err != nil {
		m.Ctx.Adderr(err, map[string]interface{}{"Uid": member_info.Uid})
		return nil, protocol.Err_register_CreateMemberFieldForum
	}
	memberinfo_cache_lock.Lock()
	if l := insert_id - int64(member_uid_offset) - int64(len(memberinfo_cache)) + 1; l > 0 {
		memberinfo_cache = append(memberinfo_cache, make([]*db.Common_member, l)...)
	}
	memberinfo_cache[int32(insert_id)-member_uid_offset] = member_info
	memberinfo_cache_lock.Unlock()
	/*register_msg := ConfigGet("welcomemsgtxt")
	math, _ := libraries.Preg_match_result(`{([^}]+)}`, register_msg, -1)
	for _, v := range math {
		register_msg = strings.Replace(register_msg, v[0], ConfigGet(v[1]), -1)
	}
	Sendsysnotice(member_info, register_msg)*/
	return member_info, protocol.Success

}
func (m *Model_member) Updatepostcredits(operator string, uids []int32, rulename int32, fid int32) bool {
	val := -1
	if operator == "+" {
		val = 1
	}

	if len(uids) == 0 {

		return false
	}
	extsql := map[string]int32{}
	uidarr := map[int32]int{}
	for _, uid := range uids {
		uidarr[uid]++
	}
	var ids []int32

	for uid, coef := range uidarr {
		if uid == 0 {
			continue
		}
		ids = append(ids, uid)
		opnum := int32(val * coef)
		if rulename == Rule发表回复 {
			extsql = map[string]int32{"posts": opnum}
		} else if rulename == Rule发表主题 {
			extsql = map[string]int32{"threads": opnum, "posts": opnum}
		}
		model_credit := &Model_credit{}
		model_credit.Ctx = m.Ctx
		model_credit.Extrasql = extsql
		if uid == m.Ctx.Conn.Session.Load_int32("Uid") {
			model_credit.Updatecreditbyaction(rulename, uid, "", opnum, true, fid)
		} else {
			model_credit.updatecreditbyrule(model_credit.getrule(rulename, fid), uid, opnum, fid, true)
		}
	}
	if operator == "+" && (rulename == Rule发表回复 || rulename == Rule发表主题) {
		now := time.Now().Unix()
		for _, id := range ids {
			if user := GetMemberInfoByID(id); user != nil && user.Count != nil {
				user.Count.Lastpost = int32(now)
				_, err := m.Table("Common_member_count").Where(map[string]interface{}{"Uid": id}).Update(map[string]interface{}{"Lastpost": now})
				if err != nil {
					m.Ctx.Adderr(err, ids)
				}
			}
		}
	}
	return true
}
func (m *Model_member) GetMemberByQQOpenid(openid string) *db.Common_member {
	res, err := m.Table("Common_member_qq").Where(map[string]interface{}{"Openid": openid}).FindMap()
	if err != nil {
		m.Ctx.Adderr(err, map[string]interface{}{"Openid": openid})
		return nil
	}
	if res == nil {
		return nil
	}
	uid, _ := strconv.Atoi(res["Uid"])
	return GetMemberInfoByID(int32(uid))
}
func (m *Model_member) GetMemberQQByUid(uid int32) (res *db.Common_member_qq) {
	err := m.Table("Common_member_qq").Where(map[string]interface{}{"Uid": uid}).Find(&res)
	if err != nil {
		m.Ctx.Adderr(err, map[string]interface{}{"uid": uid})
		return nil
	}
	return
}
func (m *Model_member) AddMemberQQ(qq *qq.QQUserInfo, openid string, uid int32) bool {
	res, err := m.Table("Common_member_qq").Where(map[string]interface{}{"Uid": uid}).Delete()
	if err != nil {
		m.Ctx.Adderr(err, nil)
		return false
	}
	if !res {
		return false
	}
	_, err = m.Table("Common_member_qq").Insert(&db.Common_member_qq{
		Openid:   openid,
		Uid:      uid,
		Nickname: qq.Nickname,
		Img:      qq.Figureurl_qq_1,
	})
	if err != nil {
		m.Ctx.Adderr(err, nil)
		return false
	}
	return true
}
func (m *Model_member) DeleteMember(uid int32) (res bool) {
	m.BeginTransaction()
	defer func() {
		if res {
			m.Commit()
		} else {
			m.Rollback()
		}
	}()
	var err error
	res, err = m.Table("Common_member").Where(map[string]interface{}{"Uid": uid}).Delete()
	if err != nil {
		m.Ctx.Adderr(err, map[string]interface{}{"Uid": uid})
		return false
	} else if !res {
		return
	}
	res, err = m.Table("Common_member_count").Where(map[string]interface{}{"Uid": uid}).Delete()
	if err != nil {
		m.Ctx.Adderr(err, map[string]interface{}{"Uid": uid})
		return false
	} else if !res {
		return
	}
	res, err = m.Table("Common_member_field_forum").Where(map[string]interface{}{"Uid": uid}).Delete()
	if err != nil {
		m.Ctx.Adderr(err, map[string]interface{}{"Uid": uid})
		return false
	}
	return res

}

func check_member_count(mysql_timestamp int) {
	var counts []*db.Common_member_count
	m := &Model_Forum_thread{}
	err := m.Table("Common_member_count").Where("unix_timestamp(Timestamp) > " + strconv.Itoa(mysql_timestamp-120)).Select(&counts)
	if err != nil {
		libraries.DEBUG("检查Common_member_count更新失败")
	}
	for _, c := range counts {
		index := c.Uid - member_uid_offset
		if index < 0 || int(index) >= len(memberinfo_cache) {
			continue
		}
		member_info := memberinfo_cache[index]
		if member_info != nil {
			if member_info.Count == nil || member_info.Count.Timestamp.Unix() != c.Timestamp.Unix() {
				err := m.Table("Common_member_count").Where(map[string]interface{}{"Uid": c.Uid}).Find(&member_info.Count)
				if err != nil {
					libraries.DEBUG("获取Common_member_count失败", err)
				}
			}
		}
	}
}
