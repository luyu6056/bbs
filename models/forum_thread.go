package models

import (
	"bbs/config"
	"bbs/db"
	"bbs/libraries"
	"bbs/protocol"
	"math"
	"strconv"
	"strings"
	"time"
)

type Model_Forum_thread struct {
	Model
}

func forum_thread_init() {
	model := new(Model_Forum_thread)
	info, err := model.Table("Forum_thread").Field("max(Tid),min(Tid)").FindMap()
	if err != nil {
		panic("model_member初始化错误，无法获得最小member_id")
	}
	if info != nil {
		id, _ := strconv.Atoi(info["min(Tid)"])
		forum_thread_tid_offset = int32(id)
		maxid, _ := strconv.Atoi(info["max(Tid)"])

		forum_thread_cache = make([]*db.Forum_thread_cache, int32(maxid)-forum_thread_tid_offset)
	}
	model.Build_thread_index(nil, false)

}
func GetForumThreadCacheByTid(tid int32) (thread *db.Forum_thread_cache) {
	index := tid - forum_thread_tid_offset
	if index < 0 {
		return
	}
	if int(index) >= len(forum_thread_cache) {
		return
	}
	thread = forum_thread_cache[index]
	if thread != nil {
		if thread.Tid == tid {
			return
		}
		if thread.Tid == -1 {
			return nil
		}
	}
	return nil
}

func (m *Model_Forum_thread) GetForumThread(where map[string]interface{}, master bool) (result *db.Forum_thread) {
	err := m.Table("Forum_thread").Where(where).Master(master).Find(&result)
	if err != nil {
		m.Ctx.Adderr(err, where)
	}
	return
}
func (m *Model_Forum_thread) GetForumThreadrush(where map[string]interface{}) (result *db.Forum_threadrush) {
	err := m.Table("Forum_threadrush").Where(where).Find(&result)
	if err != nil {
		m.Ctx.Adderr(err, where)
	}
	return
}

type Param_newthread struct {
	Tid               int32
	Pid               int32
	Subject           string
	Message           string
	Typeid            int16
	Sortid            int16
	Special           int8
	Readperm          int16
	Save              bool
	Sticktopic        bool
	Digest            bool
	Isanonymous       bool
	Ordertype         bool
	Hiddenreplies     bool
	Allownoticeauthor bool
	Tags              string
	Bbcodeoff         bool
	Smileyoff         bool
	Usesig            bool
	Htmlon            bool
	Parseurloff       bool
	Adddynamic        bool
	Extramessage      string
	Replycredit       int16
	Pstatus           int32
	Modnewthreads     bool
	Position          int32
	Type              int8
	Aids              []int64
	Ext               interface{}
}

func (m *Model_Forum_thread) Newthread(forum *db.Forum_forum, params *Param_newthread, uid int32) (code int16) {

	user := GetMemberInfoByID(uid)
	if user == nil {
		return protocol.Err_NotFoundUser
	}
	now := time.Now().Unix()
	model_forum := &Model_Forum_forum{}
	model_forum.Ctx = m.Ctx
	model_post := &Model_Forum_post{}
	model_post.Ctx = m.Ctx

	var insert *db.Forum_thread
	var insert_post *db.Forum_post

	m.BeginTransaction()
	defer func() {
		if code == protocol.Success {
			m.Commit()
			switch params.Type {
			case config.ThreadOperateTypeNew:
				db.Updatethreadmodlog(insert.Fid, params.Tid, params.Position, "New", 0, params.Message, user, db.ThreadmodIdNew, 0, 0)
			case config.ThreadOperateTypeEdit:
				db.Updatethreadmodlog(insert.Fid, params.Tid, params.Position, "Edit", 0, params.Message, user, db.ThreadmodIdEdit, 0, 0)
			case config.ThreadOperateTypeReply:
				db.Updatethreadmodlog(insert.Fid, params.Tid, params.Position, "Reply", 0, params.Message, user, db.ThreadmodIdReplay, 0, 0)
			}

		} else {
			m.Rollback()
		}
		m.EndTransaction()
	}()
	var old_attachs, new_attachs []*db.Forum_attachment //判断是否需要修改图片使用状态
	match, _ := libraries.Preg_match_result(`\[img_(\d+)\]\s*([^\["\<\r\n]+?)\s*\[\/img\]`, params.Message, -1)
	model_attachment := &Model_forum_attachment{}
	if len(match) > 0 {
		aids := make([]string, len(match))
		for k, m := range match {
			aids[k] = m[1]
		}

		model_attachment.Ctx = m.Ctx
		attachs := model_attachment.GetAttachmentlist(map[string]interface{}{"Aid": []interface{}{"in", aids}})
		for _, m := range match {
			if m[1] != "0" {
				var attach *db.Forum_attachment
				for _, v := range attachs {
					if strconv.Itoa(int(v.Aid)) == m[1] {
						attach = v
						break
					}
				}
				if attach == nil {
					params.Message = strings.Replace(params.Message, m[0], "", 1)
				} else {
					if m[2] != attach.Attachment {
						params.Message = strings.Replace(params.Message, m[2], attach.Attachment, 1)
					}
					new_attachs = append(new_attachs, attach)
				}
			}

		}

	}
	cutMsg := messagecutstr(params.Message, 30)
	params.Message = libraries.Bbcode2html(params.Message, !params.Bbcodeoff, true, true, !params.Smileyoff, true, params.Parseurloff) //预处理消息内容
	switch params.Type {
	case config.ThreadOperateTypeNew:
		insert = &db.Forum_thread{
			Fid:         forum.Fid,
			Readperm:    params.Readperm,
			Typeid:      params.Typeid,
			Authorid:    user.Uid,
			Author:      user.Username,
			Subject:     params.Subject,
			Dateline:    int32(now),
			Special:     params.Special,
			Replycredit: params.Replycredit,
			Icon:        config.ThreadIconNull,
			Stamp:       config.ThreadStampNull,
		}

		insert_post = &db.Forum_post{
			Fid:         forum.Fid,
			First:       true,
			Author:      user.Username,
			Authorid:    user.Uid,
			Subject:     insert.Subject,
			Dateline:    int32(now),
			Message:     params.Message,
			Useip:       m.Ctx.Conn.IP,
			CutMessage:  cutMsg,
			Anonymous:   params.Isanonymous,
			Usesig:      params.Usesig,
			Htmlon:      params.Htmlon,
			Bbcodeoff:   params.Bbcodeoff,
			Smileyoff:   params.Smileyoff,
			Parseurloff: params.Parseurloff,
			Status:      params.Pstatus,
			Position:    1,
		}
		params.Modnewthreads, _ = model_forum.threadmodstatus(params.Subject+"\t"+params.Message+params.Extramessage, forum)
		if params.Modnewthreads {
			insert.Displayorder = config.ThreadDisplayInCheck
			forum.Modworks = true
		} else {
			if params.Sticktopic {
				insert.Displayorder = config.ThreadDisplayStick1
			} else if params.Save {
				insert.Displayorder = config.ThreadDisplayDraft
			}

		}
	case config.ThreadOperateTypeEdit:
		insert = m.GetForumThread(map[string]interface{}{"Tid": params.Tid}, true)
		insert_post = model_post.GetPostInfoByPosition(params.Tid, params.Position)
		if insert_post == nil {
			return protocol.Err_NotFoundPost
		}
		if insert == nil {
			return protocol.Err_NotFoundThread
		}
		user = GetMemberInfoByID(insert_post.Authorid)
		match, _ := libraries.Preg_match_result(`<img aid="attachimg_(\d+)"\s*([^>\<\r\n]+?)>`, insert_post.Message, -1)
		if len(match) > 0 {
			aids := make([]string, len(match))
			for k, m := range match {
				aids[k] = m[1]
			}

			model_attachment.Ctx = m.Ctx
			attachs := model_attachment.GetAttachmentlist(map[string]interface{}{"Aid": []interface{}{"in", aids}})
			for _, m := range match {
				var attach *db.Forum_attachment
				for _, v := range attachs {
					if strconv.Itoa(int(v.Aid)) == m[1] {
						attach = v
						break
					}
				}
				if attach != nil {
					old_attachs = append(old_attachs, attach)
				}

			}
		}

		params.Message, _ = libraries.Preg_replace(`^<i class="pstatus"> 本帖最后由\s[\s\S]+?\s于\s[\s\S]+?\s编辑 <\/i><br>`, "", params.Message)
		editname := insert.Author
		if editname == "" {
			editname = "匿名"
		}
		params.Message = `<i class="pstatus"> 本帖最后由 ` + editname + ` 于 ` + libraries.Date(`Y:m:d H:i`, now) + ` 编辑 </i><br>` + params.Message
		insert.Readperm = params.Readperm
		insert.Typeid = params.Typeid
		insert.Subject = params.Subject
		insert.Replycredit = params.Replycredit
		insert_post.Subject = insert.Subject
		insert_post.Message = params.Message
		insert_post.Useip = m.Ctx.Conn.IP
		insert_post.Anonymous = params.Isanonymous
		insert_post.Usesig = params.Usesig
		insert_post.Htmlon = params.Htmlon
		insert_post.Bbcodeoff = params.Bbcodeoff
		insert_post.Smileyoff = params.Smileyoff
		insert_post.Parseurloff = params.Parseurloff
		insert_post.Status = params.Pstatus
		insert_post.CutMessage = cutMsg
	case config.ThreadOperateTypeReply:
		insert_post = &db.Forum_post{}
		insert = m.GetForumThread(map[string]interface{}{"Tid": params.Tid}, true)
		if insert == nil {
			return protocol.Err_NotFoundThread
		}
		insert.Readperm = params.Readperm
		insert.Typeid = params.Typeid
		insert.Subject = params.Subject
		insert.Replycredit = params.Replycredit
	default:
		return protocol.Err_ThreadType
	}

	/*this->param["price"] = intval(this->param["price"])
	if(!this->param["special"]) {
		this->param["price"] = this->group["maxprice"] ? (this->param["price"] <= this->group["maxprice"] ? this->param["price"] : this->group["maxprice"]) : 0
	}*/

	if params.Isanonymous {
		insert.Author = ""
	}
	if params.Digest {
		insert.Digest = 1
	}

	if params.Digest || insert.Displayorder > 0 {
		insert.Moderated = true
	}
	if params.Ordertype {
		insert.Status |= 1 << config.ThreadStatusOrderDesc
	} else {
		insert.Status -= insert.Status & (1 << config.ThreadStatusOrderDesc)
	}
	if params.Hiddenreplies {
		insert.Status |= 1 << config.ThreadStatusHiddenreplies
	} else {
		insert.Status -= insert.Status & (1 << config.ThreadStatusHiddenreplies)
	}
	//if params.Allownoticeauthor { 没做消息通知
	//	insert.Status |= 1 << 6
	//}
	if forum.Status == 3 {
		insert.Isgroup = true
	}
	if user.Count.Threads == 0 {
		insert.Icon = Setting.Newbie
	}
	//this->param["imgcontent"] && this->param["tstatus"] = setstatus(15, this->param["imgcontent"], this->param["tstatus"]) 内容生成图片
	//this->param["publishdate"] = !this->param["modnewthreads"] ? this->param["publishdate"] : TIMESTAMP 定时发布

	//stattype := "Thread"
	insert.Timestamp = time.Now()
	if params.Type == config.ThreadOperateTypeNew || params.Type == config.ThreadOperateTypeEdit && params.Position == 1 {
		if params.Type == config.ThreadOperateTypeEdit {
			err := m.Table("Forum_thread").Replace(insert)
			if err != nil {
				m.Ctx.Adderr(err, params)
				return protocol.Err_insert_Forum_thread
			}
		} else {
			tid, err := m.Table("Forum_thread").Insert(insert)
			if err != nil {
				m.Ctx.Adderr(err, params)
				return protocol.Err_insert_Forum_thread
			}
			insert.Tid = int32(tid)
		}

	}
	var err error
	//插入与更新额外数据
	if params.Type == config.ThreadOperateTypeNew {
		//插入额外数据
		insert_thread_data := &db.Forum_thread_data{Tid: insert.Tid,
			CutMessage: cutMsg,
			Lastpost:   int32(now),
			Lastposter: user.Username,
			Replies:    1,
			Timestamp:  time.Now(),
		}

		//热度
		if Setting.Heatthread != nil && Setting.Heatthread.Reply > 0 && params.Type == config.ThreadOperateTypeReply && uid != insert.Authorid {
			count := model_post.CountPostList(map[string]interface{}{"Tid": params.Tid, "Authorid": uid}, "")
			add_heat := math.Round(float64(Setting.Heatthread.Reply) * math.Pow(0.8, float64(count)))
			insert_thread_data.Heats = int32(add_heat)
		}
		err = m.Table("Forum_thread_data").Replace(insert_thread_data)

		if err != nil {
			m.Ctx.Adderr(err, params)
			return protocol.Err_insert_thread_data
		}

	} else {

		update := map[string]interface{}{
			"Replies":    []string{"exp", "Replies+1"},
			"Lastpost":   now,
			"Lastposter": user.Username,
		}
		//热度
		if Setting.Heatthread != nil && Setting.Heatthread.Reply > 0 && params.Type == config.ThreadOperateTypeReply && uid != insert.Authorid {
			count := model_post.CountPostList(map[string]interface{}{"Tid": params.Tid, "Authorid": uid}, "")
			add_heat := math.Round(float64(Setting.Heatthread.Reply) * math.Pow(0.8, float64(count)))
			update["Heats"] = []string{"exp", "Heats+" + strconv.Itoa(int(add_heat))}
		}
		if params.Position == 1 {
			update["CutMessage"] = cutMsg
		}
		res, err := m.Table("Forum_thread_data").Where(map[string]interface{}{"Tid": insert.Tid}).Update(update)

		if err != nil {
			m.Ctx.Adderr(err, params)
			return protocol.Err_insert_thread_data
		}

		if !res { //老帖子可能不存在Forum_thread_data
			count, err := m.Table("Forum_post").Where(map[string]interface{}{"Tid": insert.Tid}).Count()
			if err != nil || count < 1 {
				m.Ctx.Adderr(err, params)
				return protocol.Err_insert_thread_data
			}
			insert_thread_data := &db.Forum_thread_data{Tid: insert.Tid,
				CutMessage: messagecutstr(insert.Subject, 30),
				Lastpost:   int32(now),
				Lastposter: user.Username,
				Replies:    int32(count),
				Timestamp:  time.Now(),
			}
			_, err = m.Table("Forum_thread_data").Insert(insert_thread_data)
			if err != nil {
				m.Ctx.Adderr(err, params)
				return protocol.Err_insert_thread_data
			}

		}
	}
	//更新forum数据
	update := map[string]interface{}{
		"Posts":      []string{"exp", "Posts+1"},
		"Todayposts": []string{"exp", "Todayposts+1"},
		"Lastpost": &protocol.MSG_forum_lastpost{
			Tid:      insert.Tid,
			Subject:  insert.Subject,
			Dateline: insert.Dateline,
			Author:   insert.Author,
		},
	}
	if params.Type == config.ThreadOperateTypeNew {
		update["Threads"] = []string{"exp", "Threads+1"}
	}
	_, err = m.Table("Forum_forum").Where(map[string]interface{}{"Fid": insert.Fid}).Update(update)
	if err != nil {
		m.Ctx.Adderr(err, params)
		return protocol.Err_insert_thread_forum
	}
	if params.Type == config.ThreadOperateTypeReply {
		update = map[string]interface{}{
			"Fid":        forum.Fid,
			"Tid":        params.Tid,
			"Author":     user.Username,
			"Authorid":   user.Uid,
			"Subject":    params.Subject,
			"Dateline":   int32(now),
			"Message":    params.Message,
			"CutMessage": cutMsg,
			"Useip":      m.Ctx.Conn.IP,
			"Usesig":     user.Group.Maxsigsize > 0,
			"Position":   []string{"exp", `(select c.p+1  from (select max(Position) as p from ` + config.Server.Tablepre + `Forum_post where Tid =` + strconv.Itoa(int(params.Tid)) + `) c)`},
			"Aids":       params.Aids,
		}
		model_post := new(Model_Forum_post)
		model_post.Ctx = m.Ctx
		pid, res := model_post.AddPostFromMap(update)
		err := model_post.Table("Forum_post").Where("Pid = " + strconv.Itoa(int(pid))).Master(true).Find(&insert_post)
		if err != nil {
			model_post.Ctx.Adderr(err, map[string]interface{}{"pid": pid})
		}
		if !res || insert_post.Pid == 0 {
			return protocol.Fail
		}
		return protocol.Success
	}
	insert_post.Aids = params.Aids
	insert_post.Tid = insert.Tid

	if !params.Isanonymous {
		/*_, err = m.Table("Common_member_field_home").Where("Uid=" + strconv.Itoa(int(user.Uid))).Update(map[string]interface{}{"Recentnote": params.Subject})
		if err != nil {
			m.Ctx.Adderr(err, map[string]interface{}{"Uid": user.Uid, "Recentnote": params.Subject})
			return protocol.Err_updateRecentnote
		}*/
	}

	if params.Modnewthreads {
		insert_post.Invisible = -2
	} else if params.Save {
		insert_post.Invisible = -3
	}
	if m.Ctx.Conn.IsMobile && insert_post.Status>>4&1 == 0 {
		insert_post.Status += 1 << 4
	}
	model_tag := &Model_tag{}
	model_tag.Ctx = m.Ctx

	if params.Tags != "" {
		var res bool
		insert_post.Tags, res = model_tag.Add_tag(params.Tags, insert.Tid, "tid")
		if !res {
			return protocol.Err_addTag
		}
	} else {
		insert_post.Tags = nil
	}

	if params.Type == config.ThreadOperateTypeEdit {
		err = m.Table("Forum_post").Replace(insert_post)
	} else {
		var pid int64
		pid, err = m.Table("Forum_post").Insert(insert_post)
		params.Pid = int32(pid)
	}
	if err != nil {
		m.Ctx.Adderr(err, params)
		return protocol.Err_Insert_Forum_post
	}
	params.Tid = insert.Tid

	switch params.Special {
	case 1:

		//stattype = "Poll"
		if params.Type == config.ThreadOperateTypeNew || params.Type == config.ThreadOperateTypeEdit {
			pollinfo := params.Ext.(*protocol.MSG_Poll_info)
			var insert_poll *db.Forum_poll
			if params.Type == config.ThreadOperateTypeNew {
				insert_poll = &db.Forum_poll{
					Tid: insert.Tid,
				}
			} else {
				insert_poll = m.GetThreadPollByTid(insert.Tid)
			}
			insert_poll.Overt = pollinfo.Overt == 1
			insert_poll.Visible = pollinfo.Visible == 1
			insert_poll.Maxchoices = pollinfo.Maxchoices
			if pollinfo.Expiration != 0 {
				insert_poll.Expiration = int32(pollinfo.Expiration)*86400 + insert.Dateline
			}

			insert_poll.Isimage = false
			if params.Type == config.ThreadOperateTypeEdit {
				err = m.Table("Forum_poll").Replace(insert_poll)
			} else {
				_, err = m.Table("Forum_poll").Insert(insert_poll)
			}
			if err != nil {
				m.Ctx.Adderr(err, params)
				return protocol.Err_Insert_Forum_poll
			}

			//检查aid
			var aids []int64
			for _, option := range pollinfo.Polloption {
				if option.Aid > 0 {
					aids = append(aids, option.Aid)
				}
			}
			if len(aids) > 0 {
				list := model_attachment.GetAttachmentlist(map[string]interface{}{"Aid": aids})
				for _, option := range pollinfo.Polloption {
					if option.Aid > 0 {
						found := false
						var add *db.Forum_attachment
						for _, atta := range list {
							if atta.Aid == option.Aid {
								found = true
								add = atta
							}
						}
						if !found {
							option.Aid = 0
						} else {
							new_attachs = append(new_attachs, add)
						}
					}

				}
			}
			//获取旧aid
			aids = nil
			for _, option := range pollinfo.Polloption {
				if option.Aid > 0 {
					insert_poll.Isimage = true
				}
				var polloption *db.Forum_polloption
				if option.Id == 0 {
					polloption = &db.Forum_polloption{ //具体选项与结果
						Tid:      params.Tid,
						Voterids: ",",
					}

				} else {
					err = m.Table("Forum_polloption").Where(map[string]interface{}{"Polloptionid": option.Id}).Find(&polloption)
					if err != nil || polloption == nil {
						m.Ctx.Adderr(err, params)
						return protocol.Err_ThreadPollOptionNotFound
					}
					if polloption.Aid > 0 {
						aids = append(aids, polloption.Aid)
					}
				}
				polloption.Name = option.Name
				polloption.Aid = option.Aid
				if params.Type == config.ThreadOperateTypeEdit {
					err = m.Table("Forum_polloption").Replace(polloption)
					if err != nil {
						m.Ctx.Adderr(err, params)
						return protocol.Err_Insert_Forum_polloption
					}
				} else {
					pollid, err := m.Table("Forum_polloption").Insert(polloption)
					if err != nil {
						m.Ctx.Adderr(err, params)
						return protocol.Err_Insert_Forum_polloption
					}
					polloption.Polloptionid = int32(pollid)
				}

			}
			if len(aids) > 0 {
				//添加
				for _, atta := range model_attachment.GetAttachmentlist(map[string]interface{}{"Aid": aids}) {
					old_attachs = append(old_attachs, atta)
				}
			}

		}

		/*case 2:

			stattype = "Trade"
		case 3:
			stattype = "Reward"
		case 4:
			stattype = "Activity"
		case 5:
			stattype = "Debate"
		case 127:
			stattype = "Thread"*/
	}
	if insert.Isgroup {
		//stattype = "Groupthread"
	}
	defer func() {
		if code == protocol.Success {
			m.Build_thread_index(map[string]interface{}{"Tid": insert.Tid}, true)
			go func() {
				m := new(Model_Forum_thread)
				//更新thread缓存，forum缓存从定时器更新
				thread_cache := forum_thread_cache[insert.Tid-forum_thread_tid_offset]
				if thread_cache == nil {
					libraries.DEBUG("致命错误，无法创建缓存", insert.Tid)
					return
				}
				if libraries.SearchInt32(forum_thread_index.Fid[insert.Fid], insert.Tid) == -1 {
					forum_thread_index.Fid[insert.Fid] = append(forum_thread_index.Fid[insert.Fid], insert.Tid)
				}

				libraries.SortInt32(forum_thread_index.Fid[insert.Fid])

				//model_stat := &Model_stat{}
				//model_stat.Updatestat(stattype, false, 1, user.Uid)

				user.Count.Threads++
				m.Table("Common_member_count").Where(map[string]interface{}{"Uid": user.Uid}).Update(map[string]interface{}{"Threads": []string{"exp", "Threads+1"}})
				switch params.Type {
				case config.ThreadOperateTypeNew:
					user.Useractionlog("tid")
				case config.ThreadOperateTypeReply:
					user.Useractionlog("pid")
				}

				if insert.Moderated {
					action := "DIG"
					actionid := int8(db.ThreadmodId精华)
					db.Updatethreadmodlog(insert.Fid, insert.Tid, 0, action, 0, "", user, actionid, 1, 0)
				}
				if insert.Displayorder > 0 {
					action := "STK"
					actionid := int8(db.ThreadmodId置顶)
					db.Updatethreadmodlog(insert.Fid, insert.Tid, 0, action, 0, "", user, actionid, insert.Displayorder, 0)
				}
				//处理图片使用状态
				model_attachment := &Model_forum_attachment{}
				var up, down []int64
				if len(insert_post.Aids) > 0 || len(old_attachs) > 0 {

					for k := len(new_attachs) - 1; k >= 0; k-- {
						for j := len(old_attachs) - 1; j >= 0; j-- {
							if new_attachs[k].Aid == old_attachs[j].Aid {
								new_attachs = append(new_attachs[:k], new_attachs[k+1:]...)
								old_attachs = append(old_attachs[:j], old_attachs[j+1:]...)
								break
							}
						}
					}
					for _, attach := range new_attachs { //主题使用了这些新照片
						up = append(up, attach.Aid)

						for i := len(insert_post.Aids) - 1; i >= 0; i-- {
							if insert_post.Aids[i] == attach.Aid {
								insert_post.Aids = append(insert_post.Aids[:i], insert_post.Aids[i+1:]...)
							}
						}
					}

					for _, attach := range old_attachs { //主题撤下了这些老照片
						down = append(down, attach.Aid)
					}
					for _, aid := range insert_post.Aids { //照片附件
						up = append(up, aid)
					}
				}

				if len(up) > 0 {
					insert.Attachment = config.ThreadAttachmentTypeImg
				} else {
					insert.Attachment = config.ThreadAttachmentTypeNull
				}

				if thread_cache.Attachment != insert.Attachment {
					thread_cache.Attachment = insert.Attachment
					m.Update(map[string]interface{}{"Tid": insert.Tid}, map[string]interface{}{
						"Attachment": insert.Attachment,
					})
				}

				model_post := new(Model_Forum_post)
				model_post.Update(map[string]interface{}{"Tid": insert_post.Tid, "Position": insert_post.Position}, map[string]interface{}{"Aids": insert_post.Aids})

				if len(down) > 0 {
					model_attachment.Delete(map[string]interface{}{"Aid": down})
				}
				if len(up) > 0 {
					model_attachment.Update(map[string]interface{}{"Aid": up}, map[string]interface{}{"Isused": true})
				}

			}()

		}
	}()
	/*if(this->param["geoloc"] && IN_MOBILE == 2) {
		list(mapx, mapy, location) = explode("|", this->param["geoloc"])
		if(mapx && mapy && location) {
			C::t("forum_post_location")->insert(array(
				"pid" => this->pid,
				"tid" => this->tid,
				"uid" => this->member["uid"],
				"mapx" => mapx,
				"mapy" => mapy,
				"location" => location,
			))
		}
	}*/

	if params.Modnewthreads {
		model_common_moderate := &Model_common_moderate{}
		model_common_moderate.Ctx = m.Ctx
		if !model_common_moderate.Updatemoderate("tid", []int32{insert.Tid}, 0) {
			return protocol.Err_updatemoderate
		}

		//manage_addnotify("verifythread") 未完善
		return protocol.Success
	} else {

		if insert.Displayorder != config.ThreadDisplayDraft {
			model_member := &Model_member{}
			model_member.Ctx = m.Ctx
			if insert.Digest > config.ThreadDisplayCommon {
				res := model_member.Updatepostcredits("+", []int32{user.Uid}, Rule加精华, forum.Fid)
				if !res {
					return protocol.Err_Updatepostcredits
				}
			}
			res := model_member.Updatepostcredits("+", []int32{user.Uid}, Rule发表主题, forum.Fid)
			if !res {
				return protocol.Err_Updatepostcredits
			}
			/*if(this->param["isgroup"]) { 待完成
				C::t("forum_groupuser")->update_counter_for_user(this->member["uid"], this->forum["fid"], 1)
			}*/

		}

		/*if(this->param["isgroup"]) {
			C::t("forum_forumfield")->update(this->forum["fid"], array("lastupdate" => TIMESTAMP))
			require_once libfile("function/grouplog")
			updategroupcreditlog(this->forum["fid"], this->member["uid"])
		}
		if params.Type == config.ThreadOperateTypeNew {
			err = m.Table("Forum_sofa").Replace(&db.Forum_sofa{Tid: insert.Tid, Fid: forum.Fid})
			if err != nil {
				m.Ctx.Adderr(err, params)
				return protocol.Err_insert_Forum_sofa
			}
		}*/

		return protocol.Success

	}
}

func (*Model_Forum_thread) Checkautoclose(forum *db.Forum_forum, thread *db.Forum_thread_cache, ismoderator bool) bool {

	if !ismoderator && forum.Autoclose != 0 {
		autoclose := forum.Autoclose
		closedby := thread.Dateline
		if autoclose < 0 {
			closedby = thread.Views.Lastpost
			autoclose = -autoclose
		}

		if int32(time.Now().Unix())-closedby > autoclose*86400 {
			return true
		}
	}
	return false
}

func reflush_thread() {

	for _, v := range forum_thread_cache {
		if v != nil {
			v.ThreadView.Range(func(k, _ interface{}) bool {
				v.ThreadView.Delete(k)
				return true
			})
		}
	}
}

func (m *Model_Forum_thread) Update(where, update map[string]interface{}) (res bool) {
	res, err := m.Table("Forum_thread").Where(where).Update(update)
	if err != nil {
		m.Ctx.Adderr(err, map[string]interface{}{"where": where, "update": update})
	}
	return
}
func (m *Model_Forum_thread) Addone(insert *db.Forum_thread) int32 {
	tid, err := m.Table("Forum_thread").Insert(insert)
	if err != nil {
		m.Ctx.Adderr(err, map[string]interface{}{"insert": insert})
	}
	return int32(tid)
}

var systemmod_user *db.Common_member = &db.Common_member{}

const (
	modReason = "系统自动操作"
)

func check_forum_thread_mod(t int64) {
	model := &Model_Forum_thread{}
	err := model.LockTable("Log_forum_threadmod")
	if err != nil {
		libraries.DEBUG("check_forum_thread_mod错误", err)
		return
	}
	defer model.UnlockTable()

	var mods []*db.Log_forum_threadmod
	e := model.Table("Log_forum_threadmod").Where(map[string]interface{}{"Expiration": []interface{}{"between", []int64{1, t}}, "Status": 1}).Select(&mods)
	if e != nil {
		libraries.DEBUG("获取Forum_threadmod记录失败")
	}
	_, e = model.Table("Log_forum_threadmod").Where(map[string]interface{}{"Expiration": []interface{}{"between", []int64{1, t}}, "Status": 1}).Update(map[string]interface{}{"Status": 0})
	if e != nil {
		libraries.DEBUG("更新Forum_threadmod超时状态失败", e)
	}
	go func() {
		for _, v := range mods {
			switch v.ActionId {
			case db.ThreadmodId置顶:
				if threadcache := GetForumThreadCacheByTid(v.Tid); threadcache != nil {
					threadcache.Displayorder = 0
				}
				model.Update(map[string]interface{}{"Tid": v.Tid}, map[string]interface{}{"Displayorder": 0})
				db.Updatethreadmodlog(v.Fid, v.Tid, v.Position, "UES", 0, modReason, systemmod_user, db.ThreadmodId置顶, 0, 0)
			case db.ThreadmodId高亮:
				if threadcache := GetForumThreadCacheByTid(v.Tid); threadcache != nil {
					threadcache.Highlight = 0
				}
				model.Update(map[string]interface{}{"Tid": v.Tid}, map[string]interface{}{"Highlight": 0})
				db.Updatethreadmodlog(v.Fid, v.Tid, v.Position, "UEH", 0, modReason, systemmod_user, db.ThreadmodId高亮, 0, 0)
			case db.ThreadmodId精华:
				if threadcache := GetForumThreadCacheByTid(v.Tid); threadcache != nil {
					threadcache.Digest = 0
				}
				model.Update(map[string]interface{}{"Tid": v.Tid}, map[string]interface{}{"Digest": 0})
				db.Updatethreadmodlog(v.Fid, v.Tid, v.Position, "UED", 0, modReason, systemmod_user, db.ThreadmodId精华, 0, 0)
				model.ChangeDigestIndex([]int32{v.Tid}, false)
			case db.ThreadmodId关闭:
				if threadcache := GetForumThreadCacheByTid(v.Tid); threadcache != nil {
					if threadcache.Closed > 0 {
						threadcache.Closed = 0
						model.Update(map[string]interface{}{"Tid": v.Tid}, map[string]interface{}{"Closed": 0})
						db.Updatethreadmodlog(v.Fid, v.Tid, v.Position, "UEC", 0, modReason, systemmod_user, db.ThreadmodId关闭, 0, 0)

					} else {
						threadcache.Closed = 1
						model.Update(map[string]interface{}{"Tid": v.Tid}, map[string]interface{}{"Closed": 1})
						db.Updatethreadmodlog(v.Fid, v.Tid, v.Position, "UEO", 0, modReason, systemmod_user, db.ThreadmodId关闭, 0, 0)
					}

				}

			}

		}
	}()

}
func (m *Model_Forum_thread) DeleteThread(where map[string]interface{}) (res bool) {

	var threads []*db.Forum_thread
	err := m.Table("Forum_thread").Where(where).Select(&threads)
	if err != nil {
		m.Ctx.Adderr(err, where)
	}
	if len(threads) == 0 {
		return true
	}
	m.BeginTransaction()
	defer func() {
		if res {
			m.Commit()
		} else {
			m.Rollback()
		}
		m.EndTransaction()
	}()
	res, err = m.Table("Forum_thread").Where(where).Update(map[string]interface{}{"Closed": db.ThreadCloseDelete})
	if err != nil {
		m.Ctx.Adderr(err, where)
	}

	return
}
func messagecutstr(str string, length int) string {

	sppos := strings.Index(str, string([]byte{0, 0, 0}))
	if sppos >= 0 {
		str = str[:sppos]
	}
	bbcodes := "b|i|u|p|color|size|font|align|list|indent|float"
	bbcodesclear := "email|code|free|table|tr|td|img|swf|flash|attach|media|audio|groupid|payto"
	for _, s := range [][]string{[]string{`\[hide=?\d*\](.*?)\[\/hide\]`, "<b>**** 本内容被作者隐藏 ****</b>"},
		[]string{`\[quote](.*?)\[\/quote]`, ""},
		[]string{`\[i=s\] 本帖最后由 .*? 于 .*? 编辑 \[\/i\]\n\n`, ""},
		[]string{`\[url=?.*?\](.+?)\[\/url\]`, ``},

		[]string{`\\u`, `%u`},
		[]string{`\[postbg\]\s*([^\[\<\r\n;'\"\?\(\)]+?)\s*\[\/postbg\]`, ""},
		[]string{`\r\n`, ""},
		[]string{`\n`, ""},
	} {
		str, _ = libraries.Preg_replace(s[0], s[1], str)
	}
	var endstr string
	for {
		endstr, _ = libraries.Preg_replace(`\[(`+bbcodesclear+`)=?.*?\](.+?)\[\/\1\]`, "$2", str)
		if endstr == str {
			break
		}
		str = endstr
	}
	for {
		endstr, _ = libraries.Preg_replace(`\[(`+bbcodes+`)=?.*?\]`, "", str)
		if endstr == str {
			break
		}
		str = endstr
	}
	for {
		endstr, _ = libraries.Preg_replace(`\[\/(`+bbcodes+`)\]`, "", str)
		if endstr == str {
			break
		}
		str = endstr
	}
	r := []rune(str) //避免剪切出sql不支持的utf8字符
	if length > 0 && len(r) > length {
		str = string(r[:length]) + "..."
	}
	for _, v := range libraries.Smiliesarray {
		str = strings.Replace(str, v, "", -1)
	}

	return strings.Trim(str, " ")
}

func (m *Model_Forum_thread) AddRecommend(tid int32, uid int32, status int8) (result int16) {
	threadcache := GetForumThreadCacheByTid(tid)
	if threadcache != nil {

		if Setting.Recommendthread == nil || Setting.Recommendthread.Status == 0 {
			return protocol.Err_RecommendClose
		}
		user := GetMemberInfoByID(uid)
		if user.Group.Allowrecommend < 1 {
			return protocol.Err_Groupperm
		}
		if user.Uid == threadcache.Authorid && Setting.Recommendthread.Ownthread == 0 {
			return protocol.Err_RecommendOwnthread
		}
		result = protocol.Err_db
		var inset *db.Forum_memberRecommend
		where := map[string]interface{}{"Tid": tid, "Recommenduid": uid}
		err := m.Table("Forum_memberRecommend").Where(where).Find(&inset)
		if err != nil {
			m.Ctx.Adderr(err, map[string]interface{}{"tid": tid, "uid": uid, "status": status})
			return
		}
		if inset != nil {
			return protocol.Err_HasRecommended
		}
		m.BeginTransaction()

		defer func() {
			if result == protocol.Success {
				m.Commit()
			} else {
				if err != nil {
					m.Ctx.Adderr(err, map[string]interface{}{"tid": tid, "uid": uid, "status": status})
				}
				m.Rollback()
			}
			m.EndTransaction()
		}()
		inset = &db.Forum_memberRecommend{Tid: tid, Recommenduid: uid, Dateline: int32(time.Now().Unix()), Isadd: status != 0}
		err = m.Table("Forum_memberRecommend").Replace(inset)
		if err != nil {
			m.Ctx.Adderr(err, map[string]interface{}{"tid": tid, "uid": uid, "status": status})
			return protocol.Err_db
		}
		if m.Get_affected_rows() == 2 {
			return protocol.Err_HasRecommended
		}
		update := map[string]interface{}{}
		recommendvalue := strconv.Itoa(int(user.Group.Allowrecommend)) //影响的值
		if status == 0 {
			update["Recommends"] = []string{"exp", "Recommends-" + recommendvalue}
			update["Recommend_sub"] = []string{"exp", "Recommend_sub+" + recommendvalue}

		} else {
			update["Recommends"] = []string{"exp", "Recommends+" + recommendvalue}
			update["Recommend_add"] = []string{"exp", "Recommend_add+" + recommendvalue}

		}
		//增加热度
		if Setting.Heatthread != nil && Setting.Heatthread.Recommend > 0 {
			add_heat := int32(Setting.Heatthread.Recommend) * int32(user.Group.Allowrecommend)
			update["Heats"] = []string{"exp", "Heats+" + strconv.Itoa(int(add_heat))}
		}
		delete(where, "Recommenduid")
		_, err = m.Table("Forum_thread_data").Where(where).Update(update)
		if err != nil {
			m.Ctx.Adderr(err, map[string]interface{}{"tid": tid, "uid": uid, "status": status})
			return protocol.Err_db
		}
		m.Table("Forum_thread_data").Where(where).Master(true).Find(threadcache.Views)
		return protocol.Success
	}
	return protocol.Err_NotFoundThread
}
func (m *Model_Forum_thread) CheckRecommend(uid, tid int32) (result *db.Forum_memberRecommend) {

	err := m.Table("Forum_memberRecommend").Where("Tid = " + strconv.Itoa(int(tid)) + " and Recommenduid = " + strconv.Itoa(int(uid))).Find(&result)
	if err != nil {
		m.Ctx.Adderr(err, map[string]interface{}{"uid": uid, "tid": tid})
	}
	return
}

//threadview专用查询
type Forum_threadView struct {
	Isadd         string
	Sticks        []int32
	Closed        bool
	Recommend_add int32
	Recommend_sub int32
	Stamp         int8
}

func (m *Model_Forum_thread) GetForumThreadViewByTid(tid int32, uid int32) (result *Forum_threadView) {
	err := m.Table("Forum_thread").Field("Isadd,Sticks,Closed,Recommend_add,Recommend_sub,Stamp").LeftJoin("Forum_memberRecommend").On("Forum_memberRecommend.Tid=Forum_thread.Tid and Forum_memberRecommend.Recommenduid = " + strconv.Itoa(int(uid))).Where("Forum_thread.Tid = " + strconv.Itoa(int(tid))).Find(&result)
	if err != nil {
		m.Ctx.Adderr(err, map[string]interface{}{"tid": tid})
	}
	return
}
func (m *Model_Forum_thread) PollSubmit(uid int32, tid int32, ids []int32) int16 {
	m.BeginTransaction()
	defer m.EndTransaction()

	_, err := m.Table("Forum_polloption").Where(map[string]interface{}{"Tid": tid, "Polloptionid": ids, "Voterids": []interface{}{"notlike", "," + strconv.Itoa(int(uid)) + ","}}).Update(map[string]interface{}{
		"Voterids": []string{"exp", "concat(Voterids,'" + strconv.Itoa(int(uid)) + ",')"}, //增加选票人id
		"Votes":    []string{"exp", "Votes+1"},                                            //每个选项加1票
	})
	if err != nil {
		m.Ctx.Adderr(err, map[string]interface{}{"tid": tid, "uid": uid})
		m.Rollback()
		return protocol.Err_db
	}
	_, err = m.Table("Forum_poll").Where(map[string]interface{}{"Tid": tid}).Update(map[string]interface{}{
		"Voters": []string{"exp", "Voters+1"}, //加一个投票人
	})
	if err != nil {
		m.Ctx.Adderr(err, map[string]interface{}{"tid": tid, "uid": uid})
		m.Rollback()
		return protocol.Err_db
	}
	m.Commit()
	return protocol.Success
}
func (m *Model_Forum_thread) GetThreadData(where map[string]interface{}, master bool) (result *db.Forum_thread_data) {
	err := m.Table("Forum_thread_data").Where(where).Master(master).Find(&result)
	if err != nil {
		m.Ctx.Adderr(err, where)
	}
	return
}
func (m *Model_Forum_thread) UpdateData(where map[string]interface{}, update map[string]interface{}) bool {
	res, err := m.Table("Forum_thread_data").Where(where).Update(update)
	if err != nil {
		m.Ctx.Adderr(err, map[string]interface{}{"where": where, "update": update})
	}
	return res
}
