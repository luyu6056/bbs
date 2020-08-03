package models

import (
	"bbs/db"
	"bbs/libraries"
	"errors"
	"reflect"
	"strconv"
	"strings"
	"sync"
	"time"
	"unsafe"

	"github.com/modern-go/reflect2"
)

const (
	RuleNull = iota
	Rule发表主题
	Rule发表回复
	Rule加精华
	Rule上传附件
	Rule下载附件
	Rule发短消息
	Rule搜索
	Rule访问推广
	Rule注册推广
	Rule成功交易
	Rule邮箱认证
	Rule设置头像
	Rule视频认证
	Rule热点信息
	Rule每天登录
	Rule访问别人空间
	Rule打招呼
	Rule留言
	Rule被留言
	Rule发表记录
	Rule发表日志
	Rule参与投票
	Rule发起分享
	Rule评论
	Rule被评论
	Rule安装应用
	Rule使用应用
	Rule信息表态
	Rule修改域名
	Rule文章评论
	Rule淘专辑被订阅
)

var credit_rule map[int32]*db.Common_credit_rule

//积分与货币策略
func credit_ruleinit() {
	model := new(Model)
	var rule []*db.Common_credit_rule
	model.Table("Common_credit_rule").Select(&rule)
	if len(rule) == 0 {
		rule = make([]*db.Common_credit_rule, 31)
		rule[0] = &db.Common_credit_rule{Rid: Rule发表主题, Rulename: "发表主题", Action: "post", Cycletype: 4, Extcredits2: 2}
		rule[1] = &db.Common_credit_rule{Rid: Rule发表回复, Rulename: "发表回复", Action: "reply", Cycletype: 4, Extcredits2: 1}
		rule[2] = &db.Common_credit_rule{Rid: Rule加精华, Rulename: "加精华", Action: "digest", Cycletype: 4, Extcredits2: 5}
		rule[3] = &db.Common_credit_rule{Rid: Rule上传附件, Rulename: "上传附件", Action: "postattach", Cycletype: 4}
		rule[4] = &db.Common_credit_rule{Rid: Rule下载附件, Rulename: "下载附件", Action: "getattach", Cycletype: 4}
		rule[5] = &db.Common_credit_rule{Rid: Rule发短消息, Rulename: "发短消息", Action: "sendpm", Cycletype: 4}
		rule[6] = &db.Common_credit_rule{Rid: Rule搜索, Rulename: "搜索", Action: "search", Cycletype: 4}
		rule[7] = &db.Common_credit_rule{Rid: Rule访问推广, Rulename: "访问推广", Action: "promotion_visit", Cycletype: 4, Extcredits2: 1}
		rule[8] = &db.Common_credit_rule{Rid: Rule注册推广, Rulename: "注册推广", Action: "promotion_register", Cycletype: 4, Extcredits2: 2}
		rule[9] = &db.Common_credit_rule{Rid: Rule成功交易, Rulename: "成功交易", Action: "tradefinished", Cycletype: 4}
		rule[10] = &db.Common_credit_rule{Rid: Rule邮箱认证, Rulename: "邮箱认证", Action: "realemail", Rewardnum: 1, Extcredits2: 10}
		rule[11] = &db.Common_credit_rule{Rid: Rule设置头像, Rulename: "设置头像", Action: "setavatar", Rewardnum: 1, Extcredits2: 5}
		rule[12] = &db.Common_credit_rule{Rid: Rule视频认证, Rulename: "视频认证", Action: "videophoto", Rewardnum: 1, Extcredits2: 10}
		rule[13] = &db.Common_credit_rule{Rid: Rule热点信息, Rulename: "热点信息", Action: "hotinfo", Cycletype: 4}
		rule[14] = &db.Common_credit_rule{Rid: Rule每天登录, Rulename: "每天登录", Action: "daylogin", Cycletype: 1, Rewardnum: 1, Extcredits2: 2}
		rule[15] = &db.Common_credit_rule{Rid: Rule访问别人空间, Rulename: "访问别人空间", Action: "visit", Cycletype: 1, Rewardnum: 10, Norepeat: 2, Extcredits2: 2}
		rule[16] = &db.Common_credit_rule{Rid: Rule打招呼, Rulename: "打招呼", Action: "poke", Cycletype: 1, Rewardnum: 10, Norepeat: 2, Extcredits2: 1}
		rule[17] = &db.Common_credit_rule{Rid: Rule留言, Rulename: "留言", Action: "guestbook", Cycletype: 1, Rewardnum: 20, Norepeat: 2, Extcredits2: 1}
		rule[18] = &db.Common_credit_rule{Rid: Rule被留言, Rulename: "被留言", Action: "getguestbook", Cycletype: 1, Rewardnum: 5, Norepeat: 2, Extcredits2: 1}
		rule[19] = &db.Common_credit_rule{Rid: Rule发表记录, Rulename: "发表记录", Action: "doing", Cycletype: 1, Rewardnum: 5, Extcredits2: 1}
		rule[20] = &db.Common_credit_rule{Rid: Rule发表日志, Rulename: "发表日志", Action: "publishblog", Cycletype: 1, Rewardnum: 3, Extcredits2: 2}
		rule[21] = &db.Common_credit_rule{Rid: Rule参与投票, Rulename: "参与投票", Action: "joinpoll", Cycletype: 1, Rewardnum: 10, Norepeat: 1, Extcredits2: 1}
		rule[22] = &db.Common_credit_rule{Rid: Rule发起分享, Rulename: "发起分享", Action: "createshare", Cycletype: 1, Rewardnum: 3, Extcredits2: 1}
		rule[23] = &db.Common_credit_rule{Rid: Rule评论, Rulename: "评论", Action: "comment", Cycletype: 1, Rewardnum: 40, Norepeat: 1, Extcredits2: 1}
		rule[24] = &db.Common_credit_rule{Rid: Rule被评论, Rulename: "被评论", Action: "getcomment", Cycletype: 1, Rewardnum: 20, Norepeat: 1, Extcredits2: 2}
		rule[25] = &db.Common_credit_rule{Rid: Rule安装应用, Rulename: "安装应用", Action: "installapp", Cycletype: 4, Norepeat: 3}
		rule[26] = &db.Common_credit_rule{Rid: Rule使用应用, Rulename: "使用应用", Action: "useapp", Cycletype: 1, Rewardnum: 10, Norepeat: 3}
		rule[27] = &db.Common_credit_rule{Rid: Rule信息表态, Rulename: "信息表态", Action: "click", Cycletype: 1, Rewardnum: 10, Norepeat: 1}
		rule[28] = &db.Common_credit_rule{Rid: Rule修改域名, Rulename: "修改域名", Action: "modifydomain", Rewardnum: 1}
		rule[29] = &db.Common_credit_rule{Rid: Rule文章评论, Rulename: "文章评论", Action: "portalcomment", Cycletype: 1, Rewardnum: 40, Norepeat: 1, Extcredits2: 1}
		rule[30] = &db.Common_credit_rule{Rid: Rule淘专辑被订阅, Rulename: "淘专辑被订阅", Action: "followedcollection", Cycletype: 1, Rewardnum: 3, Extcredits2: 1}
		model.Table("Common_credit_rule").Insert(rule)
	}
	credit_rule = make(map[int32]*db.Common_credit_rule, 31)
	for _, r := range rule {
		credit_rule[r.Rid] = r
	}

}

type Model_credit struct {
	Model
	coef     int32
	Extrasql map[string]int32
}

func (m *Model_credit) updatecheating(rulelog *db.Common_credit_rule_log_field, needle string, newcycle bool, norepeat int8) bool {
	if needle == "" {
		return false
	}
	switch norepeat {
	case 1:
		if rulelog.Info == "" || newcycle {
			rulelog.Info = needle
		} else {
			rulelog.Info += "," + needle
		}
	case 2:
		if rulelog.User == "" || newcycle {
			rulelog.User = needle
		} else {
			rulelog.User += "," + needle
		}
	case 3:
		if rulelog.App == "" || newcycle {
			rulelog.App = needle
		} else {
			rulelog.App += "," + needle
		}
		break
	}
	err := m.Table("Common_credit_rule_log_field").Replace(rulelog)
	if err != nil {
		m.Ctx.Adderr(err, rulelog)
		return false
	}
	return true
}
func (m *Model_credit) checkcheating(rulelog *db.Common_credit_rule_log_field, needle string, checktype int8) bool {
	switch checktype {
	case 1:
		return rulelog.Info != "" && libraries.In_slice(needle, strings.Split(rulelog.Info, ","))
	case 2:
		return rulelog.User != "" && libraries.In_slice(needle, strings.Split(rulelog.User, ","))
	case 3:
		return rulelog.App != "" && libraries.In_slice(needle, strings.Split(rulelog.App, ","))
	}
	return false
}
func (m *Model_credit) getrule(rulename int32, fid int32) (rule *db.Common_credit_rule) {

	forum := GetForumByFid(fid)
	/*if(forum!=nil && forum.Status== 3) { 待完成
		group_creditspolicy = _G["grouplevels"][_G["forum"]["level"]]["creditspolicy"]
		if(is_array(group_creditspolicy) && empty(group_creditspolicy[action])) {
			return false
		} else {
			fid = 0
		}
	}*/

	rule = credit_rule[rulename]
	if rule != nil {
		//rulenameuni := rule.Rulenameuni
		if len(rule.Fids) > 0 && forum != nil {
			if libraries.In_slice(fid, rule.Fids) {
				if forum.Field.Creditspolicy != nil && forum.Field.Creditspolicy[rulename] != nil {
					rule = forum.Field.Creditspolicy[rulename]
					//rule["rulenameuni"] = rulenameuni
				}
			}
		}
		r := reflect.ValueOf(rule).Elem()
		for i := int8(1); i <= 8; i++ {
			if Setting.Extcredits == nil || Setting.Extcredits[i] == nil {
				if field := r.FieldByName("Extcredits" + strconv.Itoa(int(i))); field.Kind() != reflect.Invalid {
					field.SetInt(0)
				}
			}

		}
	}
	return rule
}
func (m *Model_credit) addlogarr(logarr map[string]interface{}, rule *db.Common_credit_rule) map[string]interface{} {
	if Setting.Extcredits != nil {
		r := reflect.ValueOf(rule).Elem()
		for i := int8(1); i <= 8; i++ {
			if _, ok := Setting.Extcredits[i]; ok {
				var extcredit int64
				if field := r.FieldByName("Extcredits" + strconv.Itoa(int(i))); field.Kind() != reflect.Invalid {
					extcredit = field.Int()
				}
				extcredit *= int64(m.coef)
				logarr["Extcredits"+strconv.Itoa(int(i))] = strconv.Itoa(int(extcredit))
			}
		}
	}
	return logarr
}
func (m *Model_credit) Updatecreditbyaction(rulename int32, uid int32, needle string, coef int32, update bool, fid int32) bool {

	if user := GetMemberInfoByID(uid); user == nil {
		return false
	}
	rule := m.getrule(rulename, fid)
	m.coef = coef
	var enabled, updatecredit bool
	if rule != nil {
		r := reflect.ValueOf(rule).Elem()
		for i := int8(1); i <= 8; i++ {
			if field := r.FieldByName("Extcredits" + strconv.Itoa(int(i))); field.Kind() != reflect.Invalid && field.Int() > 0 {
				enabled = true
				break
			}
		}
	} else {
		return false
	}
	now := time.Now().Unix()
	if enabled {
		if !libraries.In_slice(fid, rule.Fids) {
			fid = 0
		}
		where := map[string]interface{}{
			"Rid": rule.Rid,
			"Uid": uid,
		}
		if fid != 0 {
			where["Fid"] = fid
		}
		var rulelog *db.Common_credit_rule_log
		err := m.Table("Common_credit_rule_log").Where(where).Find(&rulelog)
		if err != nil {
			m.Ctx.Adderr(err, where)
			return false
		}

		var rulelog2 *db.Common_credit_rule_log_field

		if rulelog != nil && rule.Norepeat > 0 {
			err = m.Table("Common_credit_rule_log_field").Where(map[string]interface{}{"Clid": rulelog.Clid, "Uid": uid}).Find(&rulelog)
			if err != nil {
				m.Ctx.Adderr(err, map[string]interface{}{"Clid": rulelog.Clid, "Uid": uid})
				return false
			}

		}
		if rule.Rewardnum > 0 && rule.Rewardnum < coef {
			coef = rule.Rewardnum
		}
		if rulelog == nil {
			logarr := map[string]interface{}{
				"Uid":      uid,
				"Rid":      rule.Rid,
				"Fid":      fid,
				"Total":    coef,
				"Cyclenum": coef,
				"Dateline": now,
			}
			if libraries.In_slice(rule.Cycletype, []int32{2, 3}) {
				logarr["Starttime"] = logarr["Dateline"]
			}
			logarr = m.addlogarr(logarr, rule)
			if update {
				clid, err := m.Table("Common_credit_rule_log").Insert(logarr)
				if err != nil {
					m.Ctx.Adderr(err, logarr)
					return false
				}
				if rule.Norepeat > 0 {
					rulelog2 = &db.Common_credit_rule_log_field{
						Clid: int32(clid),
						Uid:  uid,
					}
					if !m.updatecheating(rulelog2, needle, true, rule.Norepeat) {

						return false
					}

				}
			}
			updatecredit = true
		} else {
			var newcycle bool
			logarr := map[string]interface{}{}
			switch rule.Cycletype {
			case 0:
				break
			case 1:
			case 4:
				if rule.Cycletype == 1 {
					today := libraries.Todaytimestamp()
					if rulelog.Dateline < today && rule.Rewardnum > 0 {
						rulelog.Cyclenum = 0
						newcycle = true
					}
				}
				if rule.Rewardnum == 0 || rulelog.Cyclenum < rule.Rewardnum {
					if rule.Norepeat > 0 {
						repeat := m.checkcheating(rulelog2, needle, rule.Norepeat)
						if repeat && !newcycle {
							return false
						}
					}
					if rule.Rewardnum > 0 {
						remain := rule.Rewardnum - rulelog.Cyclenum
						if remain < coef {
							coef = remain
						}
					}

					logarr = map[string]interface{}{
						"Total":    []string{"exp", "Total+" + strconv.Itoa(int(coef))},
						"Dateline": now,
					}
					if newcycle {
						logarr["Cyclenum"] = coef
					} else {
						logarr["Cyclenum"] = []string{"exp", "Cyclenum+" + strconv.Itoa(int(coef))}

					}
					updatecredit = true
				}
			case 2:
			case 3:
				var nextcycle int64
				if rulelog.Starttime > 0 {
					if rule.Cycletype == 2 {
						start := now / 3600 * 3600
						nextcycle = start + int64(rule.Cycletime)*3600
					} else {
						nextcycle = rulelog.Starttime + int64(rule.Cycletime)*60
					}
				}
				if now <= nextcycle && rulelog.Cyclenum < rule.Rewardnum {
					if rule.Norepeat > 0 {
						repeat := m.checkcheating(rulelog2, needle, rule.Norepeat)
						if repeat && !newcycle {
							return false
						}
					}
					if rule.Rewardnum > 0 {
						remain := rule.Rewardnum - rulelog.Cyclenum
						if remain < coef {
							coef = remain
						}
					}
					logarr = map[string]interface{}{
						"Cyclenum": "Cyclenum+" + strconv.Itoa(int(coef)),
						"Total":    "Total+" + strconv.Itoa(int(coef)),
						"Dateline": now,
						"ext":      "Total,Cyclenum",
					}

					updatecredit = true
				} else if now >= nextcycle {
					newcycle = true
					logarr = map[string]interface{}{
						"Cyclenum":  coef,
						"Total":     "Total+" + strconv.Itoa(int(coef)),
						"Dateline":  now,
						"Starttime": now,
						"ext":       "Total",
					}

					updatecredit = true
				}

			}
			if update {
				if rule.Norepeat > 0 && needle != "" {
					m.updatecheating(rulelog2, needle, newcycle, rule.Norepeat)
				}
				if len(logarr) > 0 {
					logarr = m.addlogarr(logarr, rule)
					_, err := m.Table("Common_credit_rule_log").Where("Clid=" + strconv.Itoa(int(rulelog.Clid))).Update(logarr)
					if err != nil {
						m.Ctx.Adderr(err, logarr)
						return false
					}
				}
			}

		}

	}
	if update && (updatecredit || m.Extrasql != nil) {
		/*if(!updatecredit) {
			for(i = 1 i <= 8 i++) {
				if(isset(_G["setting"]["extcredits"][i])) {
					rule["extcredits".i] = 0
				}
			}
		}*/
		m.updatecreditbyrule(rule, uid, coef, fid, updatecredit)

	}
	//rule["updatecredit"] = updatecredit

	return true
}
func (m *Model_credit) updatecreditbyrule(rule *db.Common_credit_rule, uid int32, coef int32, fid int32, updatecredit bool) {
	m.coef = coef
	creditarr := map[string]int32{}
	var update bool
	if updatecredit {
		r := reflect.ValueOf(rule).Elem()
		for i := int8(1); i <= 8; i++ {
			if Setting.Extcredits != nil && Setting.Extcredits[i] != nil {
				key := "Extcredits" + strconv.Itoa(int(i))
				if field := r.FieldByName("Extcredits" + strconv.Itoa(int(i))); field.Kind() != reflect.Invalid {
					creditarr[key] = int32(field.Int() * int64(coef))
				}

				if m.Ctx.Conn.IsMobile && creditarr[key] > 0 {
					creditarr[key] += Setting.Creditspolicymobile
				}
				update = true
			}
		}
	}

	if update || m.Extrasql != nil {
		if coef > 0 {
			m.updatemembercount(creditarr, []int32{uid}, false, rule.Rulename)
		} else {
			m.updatemembercount(creditarr, []int32{uid}, false, "")
		}

	}
}

var creadit_lock sync.Mutex

func (m *Model_credit) updatemembercount(creditarr map[string]int32, uids []int32, checkgroup bool, ruletxt string) {
	if len(uids) > 0 && (creditarr != nil || m.Extrasql != nil) {
		if m.Extrasql != nil {
			if creditarr == nil {
				creditarr = make(map[string]int32)
			}
			for k, v := range m.Extrasql {
				creditarr[k] = v
			}
		}
		t := reflect.TypeOf(&db.Common_member_count{}).Elem()
		creadit_lock.Lock()
		defer creadit_lock.Unlock()

		for _, uid := range uids {
			if user := GetMemberInfoByID(uid); user != nil {
				ref_ptr := reflect2.PtrOf(user.Count)
				update := map[string]interface{}{}
				for key, value := range creditarr {
					str_key := strings.ToUpper(key[:1]) + key[1:]
					if field, ok := t.FieldByName(str_key); ok {
						*((*int32)(unsafe.Pointer(uintptr(ref_ptr) + field.Offset))) += value
						update[str_key] = []string{"exp", str_key + "+1"}
					} else {
						m.Ctx.Adderr(errors.New("反射找不到Common_member_count成员名"+strings.ToUpper(key[:1])+key[1:]), nil)
					}
				}
				if len(update) > 0 {
					_, err := m.Table("Common_member_count").Where(map[string]interface{}{"Uid": uid}).Update(update)
					if err != nil {
						update["Uid"] = uid
						m.Ctx.Adderr(err, update)
					}
				}
			}
		}

		//if(checkgroup && count(uids) == 1) this->checkusergroup(uids[0]);

	}
}
