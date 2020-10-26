package models

import (
	"bbs/db"
	"bbs/libraries"
	"bbs/protocol"
	"sort"
	"strconv"
	"strings"
	"time"
)

var forumdata []*db.Forum_forum //为了排序
type Model_Forum_forum struct {
	Model
}
type Forum_rank []*Forum_posts
type Forum_posts struct {
	fid   int32
	posts int32
}

func (r Forum_rank) Len() int {
	return len(r)
}
func (r Forum_rank) Less(i, j int) bool {
	if r[i].posts == r[j].posts {
		return r[i].fid < r[j].fid
	}
	return r[i].posts > r[j].posts
}
func (r Forum_rank) Swap(i, j int) {
	r[i], r[j] = r[j], r[i]
}
func foruminit() {

	model := new(Model)
	var temp []*db.Forum_forum
	model.Table("Forum_forum").Order("type, displayorder").Select(&temp)
	if len(temp) == 0 {
		temp = make([]*db.Forum_forum, 2)
		temp[0] = &db.Forum_forum{Fid: 1, Name: "Discuz!", Status: 1, Allowfeed: true, Alloweditpost: true, Allowglobalstick: 1}
		temp[1] = &db.Forum_forum{Fid: 2, Type: 1, Fup: 1, Name: "默认版块", Status: 1, Rank: 1, Oldrank: 1, Allowsmilies: true, Allowbbcode: true, Allowimgcode: true, Allowmediacode: true, Allowpostspecial: 1, Allowfeed: true, Recyclebin: 1, Alloweditpost: true, Allowglobalstick: 1}
		model.Table("Forum_forum").InsertAll(&temp)
	}
	//组装其他信息
	var forumfield []*db.Forum_forumfield
	model.Table("Forum_forumfield").Select(&forumfield)
	var rank_today, rank_yesterday Forum_rank
	rank_today = make([]*Forum_posts, len(temp))
	rank_yesterday = make([]*Forum_posts, len(temp))
	var threadtypes []*db.Forum_threadtype
	model.Table("Forum_threadtype").Select(&threadtypes)
	for k, v := range temp {
		for _, field := range forumfield {
			if v.Fid == field.Fid {
				v.Field = field
				for _, threadtype := range threadtypes {
					if threadtype.Fid == v.Fid {
						v.Field.ThreadtypesMsg = append(v.Field.ThreadtypesMsg, threadtype)
					}
				}

				break
			}
		}
		rank_today[k] = &Forum_posts{fid: v.Fid, posts: v.Todayposts}
		rank_yesterday[k] = &Forum_posts{fid: v.Fid, posts: v.Yesterdayposts}
		if v.Field == nil {
			v.Field = new(db.Forum_forumfield)
			v.Field.Fid = v.Fid
		}
		c, err := model.Table("Forum_thread").Where(map[string]interface{}{"Fid": v.Fid}).Count()
		if err != nil {
			libraries.DEBUG("初始化论坛失败，无法统计主题数量" + err.Error())
		}
		v.Threads = int32(c)
		today := libraries.Todaytimestamp()
		c, err = model.Table("Forum_post").Where(map[string]interface{}{"Dateline": []interface{}{"egt", today}, "Fid": v.Fid}).Count()
		if err != nil {
			libraries.DEBUG("初始化论坛失败，无法统计今日回复数量" + err.Error())
		}
		v.Todayposts = int32(c)
		c, err = model.Table("Forum_post").Where(map[string]interface{}{"Dateline": []interface{}{"egt", today - 86400}, "Fid": v.Fid}).Count()
		if err != nil {
			libraries.DEBUG("初始化论坛失败，无法统计昨日回复数量" + err.Error())
		}
		v.Yesterdayposts = int32(c) - v.Todayposts

	}

	//对发帖数量排序
	sort.Sort(rank_today)
	sort.Sort(rank_yesterday)
	for k, v := range rank_today {
		for _, f := range temp {
			if f.Fid == v.fid {
				f.Rank = int16(k + 1)
				break
			}
		}
	}
	for k, v := range rank_yesterday {
		for _, f := range temp {
			if f.Fid == v.fid {
				f.Oldrank = int16(k + 1)
				break
			}
		}
	}
	model.Table("Forum_forum").ReplaceAll(temp)
	forum_thread_cache_lock.Lock()
	defer forum_thread_cache_lock.Unlock()
	for _, v := range temp {
		if _, ok := forum_thread_index.Fid[v.Fid]; !ok {
			forum_thread_index.Fid[v.Fid] = []int32{}
		}
	}
	for fid := range forum_thread_index.Fid {
		var isexist bool
		for _, v := range temp {
			if v.Fid == fid {
				isexist = true
				break
			}
		}
		if !isexist {
			delete(forum_thread_index.Fid, fid)
		}
	}
	forumdata = temp
}

func UpdatechacheByFid(fid int32) {

	for k, v := range forumdata {
		if v.Fid == fid {
			model := new(Model)
			var res *db.Forum_forum
			err := model.Table("Forum_forum").Where(map[string]interface{}{"Fid": fid}).Find(&res)
			if err != nil {
				libraries.DEBUG("刷新论坛数据失败", fid, err)
			}
			if res != nil {
				err = model.Table("Forum_forumfield").Where(map[string]interface{}{"Fid": fid}).Find(&res.Field)
				if err != nil {
					libraries.DEBUG("刷新论坛field失败", fid, err)
				}
				if res.Field == nil {
					res.Field = new(db.Forum_forumfield)
					res.Field.Fid = res.Fid
				}
				err = model.Table("Forum_threadtype").Where(map[string]interface{}{"Fid": fid}).Select(&res.Field.ThreadtypesMsg)
				if err != nil {
					libraries.DEBUG("刷新论坛threadtype失败", fid, err)
				}
				forumdata[k] = res
			}
		}
	}
}
func GetForumindex() (res []*db.Forum_forum) {
	for _, v := range forumdata {
		if v.Status == 1 {
			res = append(res, v)
		}
	}
	return
}

func GetAllForum() []*db.Forum_forum {
	return forumdata
}

func GetForumByFid(fid int32) *db.Forum_forum {
	for _, v := range forumdata {
		if v.Fid == fid {
			return v
		}
	}
	return nil
}
func (model *Model_Forum_forum) UpdateForums(forums []*db.Forum_forum) (res bool) {
	if len(forums) == 0 {
		return false
	}

	model.BeginTransaction()
	defer func() {
		if res {
			model.Commit()
		} else {
			model.Rollback()
		}
		model.EndTransaction()
		foruminit()
	}()
	_, err := model.Table("Forum_forum").ReplaceAll(forums)
	fields := make([]*db.Forum_forumfield, len(forums))
	if err != nil {
		model.Ctx.Adderr(err, nil)
		return false
	}
	for k, v := range forums {
		moderators := []string{}
		for _, m := range v.Moderators {
			if user := GetMemberInfoByID(m.Uid); user != nil {
				moderators = append(moderators, user.Username)
			}
		}
		v.Field.Moderators = strings.Join(moderators, ",")
		fields[k] = v.Field

	}
	_, err = model.Table("Forum_forumfield").ReplaceAll(fields)
	if err != nil {
		model.Ctx.Adderr(err, nil)
		return false
	}
	for _, v := range forums {
		UpdatechacheByFid(v.Fid)
	}
	return true
}
func (model *Model_Forum_forum) UpdateForum(forum *db.Forum_forum) (res bool) {
	if forum == nil {
		return false
	}
	model.BeginTransaction()
	defer func() {
		if res {
			model.Commit()
		} else {
			model.Rollback()
		}
		model.EndTransaction()
	}()
	err := model.Table("Forum_forum").Replace(forum)
	if err != nil {
		model.Ctx.Adderr(err, nil)
		return false
	}
	moderators := []string{}
	for _, m := range forum.Moderators {
		if user := GetMemberInfoByID(m.Uid); user != nil {
			moderators = append(moderators, user.Username)
		}
	}
	forum.Field.Moderators = strings.Join(moderators, ",")
	err = model.Table("Forum_forumfield").Replace(forum.Field)
	if err != nil {
		model.Ctx.Adderr(err, nil)
		return false
	}
	UpdatechacheByFid(forum.Fid)
	return true
}
func (model *Model_Forum_forum) InsertForums(forums []*db.Forum_forum) bool {
	_, err := model.Table("Forum_forum").InsertAll(forums)
	if err == nil {
		foruminit()
		return true
	}
	model.Ctx.Adderr(err, nil)
	return false
}
func (model *Model_Forum_forum) Deleteforum(forum *db.Forum_forum) (res bool) {
	model.BeginTransaction()
	defer func() {
		if res {
			model.Commit()
			foruminit()
		} else {
			model.Rollback()
		}
		model.EndTransaction()
	}()
	return model.deleteforum(forum)
}
func (model *Model_Forum_forum) deleteforum(forum *db.Forum_forum) (res bool) {
	var err error
	for _, f := range GetAllForum() {
		if f.Fup == forum.Fid {
			res = model.deleteforum(f)
			if !res {
				return false
			}
		}
	}
	_, err = model.Table("Forum_forum").Where(map[string]interface{}{"Fid": forum.Fid}).Delete()
	if err != nil {
		model.Ctx.Adderr(err, nil)
		return false
	}
	_, err = model.Table("Forum_forumfield").Where(map[string]interface{}{"Fid": forum.Fid}).Delete()
	if err != nil {
		model.Ctx.Adderr(err, nil)
		return false
	}
	_, err = model.Table("Forum_post").Where(map[string]interface{}{"Fid": forum.Fid}).Delete()
	if err != nil {
		model.Ctx.Adderr(err, nil)
		return false
	}
	return true
}

func (model *Model_Forum_forum) threadmodstatus(str string, forum *db.Forum_forum) (modnewthreads, modnewreplies bool) {
	user := GetMemberInfoByID(model.Ctx.Conn.Session.Load_int32("Uid"))
	if user == nil {
		return false, false
	}
	if forum.Status != 3 {
		switch forum.Modnewposts {
		case 0:
		case 1: //发帖需要审核
			if user.Group.Allowdirectpost < 2 {
				return true, false
			}
		case 2: //全需要审核
			if user.Group.Allowdirectpost == 0 {
				return true, true
			}
			if user.Group.Allowdirectpost == 1 {
				return true, false
			}
			if user.Group.Allowdirectpost == 2 {
				return false, true
			}
		}
	} else {
		switch forum.Modnewposts {
		case 0:
		case 1: //发帖需要审核
			if user.Group.Allowgroupdirectpost < 2 {
				return true, false
			}
		case 2: //全需要审核
			if user.Group.Allowgroupdirectpost == 0 {
				return true, true
			}
			if user.Group.Allowgroupdirectpost == 1 {
				return true, false
			}
			if user.Group.Allowgroupdirectpost == 2 {
				return false, true
			}
		}
	}
	return false, false
}

func GetForumModrecommend(f *db.Forum_forum) (msg *protocol.MSG_forum_modrecommend) {
	if f.Field.Modrecommend != nil {
		msg = protocol.Pool_MSG_forum_modrecommend.Get().(*protocol.MSG_forum_modrecommend)
		msg.Imageheight = f.Field.Modrecommend.Imageheight
		msg.Imagenum = f.Field.Modrecommend.Imagenum
		msg.Imagewidth = f.Field.Modrecommend.Imagewidth
		msg.Sort = f.Field.Modrecommend.Sort
	}
	return
}
func GetThreadtypesByforum(f *db.Forum_forum, user *db.Common_member) (msg *protocol.MSG_forum_threadtype) {
	msg = protocol.Pool_MSG_forum_threadtype.Get().(*protocol.MSG_forum_threadtype)
	if f.Field.ThreadtypesSetting.Status {
		msg.Status = 1
	} else {
		msg.Status = 0
	}
	if f.Field.ThreadtypesSetting.Required {
		msg.Status += 1 << 1
	}
	if f.Field.ThreadtypesSetting.Listable {
		msg.Status += 1 << 2
	}
	msg.Prefix = f.Field.ThreadtypesSetting.Prefix
	msg.Types = make([]*protocol.MSG_forum_type, len(f.Field.ThreadtypesMsg))
	ismoderator := false
	if user.Groupid == 1 {
		ismoderator = true
	} else {
		for _, m := range f.Moderators {
			if user.Uid == m.Uid {
				ismoderator = true
				break
			}
		}
	}
	for k, v := range f.Field.ThreadtypesMsg {
		types := protocol.Pool_MSG_forum_type.Get().(*protocol.MSG_forum_type)
		types.Id = v.Typeid
		types.Name = v.Name
		if ismoderator {
			types.Ismoderator = 1
		} else {
			types.Ismoderator = 0
		}
		types.Icon = types.Icon
		types.Count = types.Count
		msg.Types[k] = types
	}
	return
}

func check_forum(mysql_timestamp int) {
	m := &Model{}
	f_map := make(map[int32]bool)
	var forums []*db.Forum_forum
	m.Table("Forum_forum").Field("Fid,Timestamp").Where("unix_timestamp(Timestamp) > " + strconv.Itoa(mysql_timestamp-120)).Select(&forums)
	for _, f := range forums {
		if f1 := GetForumByFid(f.Fid); f1 == nil {
			foruminit()
			if f1 = GetForumByFid(f.Fid); f1 == nil {
				libraries.DEBUG("检查forum更新失败，无法获取信息,fid", f.Fid)
			}
		} else if f1.Timestamp.Unix() != f.Timestamp.Unix() {
			f_map[f1.Fid] = true
		}
	}
	var fields []*db.Forum_forumfield
	m.Table("Forum_forumfield").Field("Fid,Timestamp").Where("unix_timestamp(Timestamp) > " + strconv.Itoa(mysql_timestamp-120)).Select(&fields)
	for _, field := range fields {
		if f1 := GetForumByFid(field.Fid); f1 != nil && f1.Field.Timestamp.Unix() != field.Timestamp.Unix() {
			f_map[f1.Fid] = true
		}
	}
	var types []*db.Forum_threadtype
	m.Table("Forum_threadtype").Field("Fid,Timestamp").Where("unix_timestamp(Timestamp) > " + strconv.Itoa(mysql_timestamp-120)).Select(&types)
	for _, t := range types {
		if f1 := GetForumByFid(t.Fid); f1 != nil {
			f_map[f1.Fid] = true
		}
	}
	for fid := range f_map {
		UpdatechacheByFid(fid)
	}
	var post []*db.Forum_post
	err := m.Table("Forum_post").Where("Dateline >" + strconv.Itoa(int(time.Now().Unix()-120))).Group("Fid").Order("Dateline desc").Select(&post)
	if err != nil {
		libraries.DEBUG("检查forum lastpost更新失败")
	}
	for _, p := range post {
		forum := GetForumByFid(p.Fid)
		if forum != nil {

			if forum.Lastpost == nil {
				forum.Lastpost = &protocol.MSG_forum_lastpost{
					Tid:      p.Tid,
					Author:   p.Author,
					Dateline: p.Dateline,
					Subject:  p.Subject,
				}
			} else if forum.Lastpost.Dateline != p.Dateline {
				forum.Lastpost.Tid = p.Tid
				forum.Lastpost.Author = p.Author
				forum.Lastpost.Dateline = p.Dateline
				forum.Lastpost.Subject = p.Subject
			}
		}
	}

	var rank_today Forum_rank = make([]*Forum_posts, len(forumdata))
	for k, v := range forumdata {
		rank_today[k] = &Forum_posts{fid: v.Fid, posts: v.Todayposts}
	}
	sort.Sort(rank_today)
	for k, v := range rank_today {
		for _, f := range forumdata {
			if f.Fid == v.fid {
				f.Rank = int16(k + 1)
				break
			}
		}
	}
}
