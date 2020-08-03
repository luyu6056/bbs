package web

import (
	"bbs/controllers/public"
	"bbs/db"
	"bbs/libraries"
	"bbs/models"
	"bbs/protocol"
	"bbs/qq"
	"bbs/server"
	"bbs/vaptcha"
	"crypto/aes"
	"crypto/cipher"
	"encoding/hex"
	"net/url"
	"strconv"
	"strings"
	"time"
)

//个人空间
func home_space(data *protocol.MSG_U2WS_space, c *server.Context) {

	uid := data.Uid
	if uid == 0 {
		if name := strings.Trim(data.Name, " "); name != "" {
			model_member := new(models.Model_member)
			model_member.Ctx = c
			user := model_member.GetMemberInfo(map[string]interface{}{"Username": name}, "Uid", false)
			if user != nil {
				uid = user.Uid
			}
		}
	}
	space_user := models.GetMemberInfoByID(uid)
	if space_user == nil || space_user.Uid == 0 {
		c.Out_common(protocol.Err_NotFoundUser, "")
		return
	}
	user := public.Getuserinfo(c)
	msg := protocol.Pool_MSG_WS2U_space.Get().(*protocol.MSG_WS2U_space)
	msg.Username = space_user.Username
	msg.Uid = space_user.Uid
	msg.Avatar = space_user.Avatar
	if user.Adminid == 1 || user.Adminid == 2 {
		msg.Email = space_user.Email
	}
	if space_user.Group.Maxsigsize > 0 {
		if space_user.Field_forum != nil {
			msg.Sightml = space_user.Field_forum.Sightml
			if len(msg.Sightml) > int(space_user.Group.Maxsigsize) {
				msg.Sightml = msg.Sightml[:space_user.Group.Maxsigsize]
			}
		} else {
			msg.Sightml = ""
		}

	} else {
		msg.Sightml = ""
	}
	model_member := &models.Model_member{}
	model_member.Ctx = c

	msg.Status = 0
	if user.Admin_Group != nil {
		if user.Admin_Group.Allowbanuser {
			msg.Status = 1
		}
		if user.Admin_Group.Allowedituser {
			msg.Status += 1 << 1
		}
	}
	if space_user.Isonline {
		msg.Status += 1 << 2
	}
	if space_user.Emailstatus == "1" {
		msg.Status += 1 << 3
	}
	msg.Regip = ""
	msg.Lastip = ""

	if user.Uid > 0 {
		if _, ok := space_user.Count.SpaceView.LoadOrStore(user.Uid, true); !ok {
			space_user.Count.AddViews()
		}
	} else {
		if _, ok := space_user.Count.SpaceView.LoadOrStore(c.Conn.IP, true); !ok {
			space_user.Count.AddViews()
		}
	}

	msg.Views = space_user.Count.Views

	if user.Uid == space_user.Uid || (user.Admin_Group != nil && user.Admin_Group.Allowviewip) {

		msg.Regip = space_user.Count.Regip
		msg.Lastip = space_user.Count.Lastip
	}
	if space_user.Field_forum != nil {
		msg.Customstatus = space_user.Field_forum.Customstatus
	} else {
		msg.Customstatus = ""
	}

	msg.Posts = space_user.Count.Posts
	msg.Threads = space_user.Count.Threads
	msg.Profiles = msg.Profiles[:0]

	if space_user.QQ > 0 {
		tmp := protocol.Pool_MSG_userprofiles.Get().(*protocol.MSG_userprofiles)
		tmp.Title = "QQ"
		tmp.Value = strconv.Itoa(int(space_user.QQ))
		msg.Profiles = append(msg.Profiles, tmp)
	}
	if space_user.Site != "" {
		tmp := protocol.Pool_MSG_userprofiles.Get().(*protocol.MSG_userprofiles)
		tmp.Title = "个人主页"
		tmp.Value = space_user.Site
		msg.Profiles = append(msg.Profiles, tmp)
	}
	if space_user.Mobile != "" {
		tmp := protocol.Pool_MSG_userprofiles.Get().(*protocol.MSG_userprofiles)
		tmp.Title = "手机"
		tmp.Value = space_user.Mobile
		msg.Profiles = append(msg.Profiles, tmp)
	}
	if space_user.Wx != "" {
		tmp := protocol.Pool_MSG_userprofiles.Get().(*protocol.MSG_userprofiles)
		tmp.Title = "微信"
		tmp.Value = space_user.Wx
		msg.Profiles = append(msg.Profiles, tmp)
	}

	model_group := &models.Model_usergroup{}
	if group := model_group.GetUserGroupByID(space_user.Adminid); group != nil {
		msg.Admingroup = protocol.Pool_MSG_usergroup.Get().(*protocol.MSG_usergroup)
		msg.Admingroup.Id = group.Groupid
		msg.Admingroup.Color = group.Color
		msg.Admingroup.Grouptitle = group.Grouptitle
		msg.Admingroup.Icon = group.Icon
	}
	msg.Group = protocol.Pool_MSG_usergroup.Get().(*protocol.MSG_usergroup)
	msg.Group.Id = space_user.Group.Groupid
	msg.Group.Color = space_user.Group.Color
	msg.Group.Grouptitle = space_user.Group.Grouptitle
	msg.Group.Icon = space_user.Group.Icon
	msg.Upgradecredit = model_group.GetNextCreditsByCredits(space_user.Credits)
	msg.Credits = space_user.Credits
	msg.Groupexpiry = space_user.Groupexpiry
	msg.Oltime = space_user.Count.Oltime
	msg.Regdate = int32(space_user.Regdate)
	msg.Lastvisit = space_user.Count.Lastvisit
	msg.Lastpost = space_user.Count.Lastpost
	msg.Attachsize = space_user.Count.Attachsize
	//int32				lastsendmail;

	c.Output_data(msg)
	msg.Put()
}
func spaceThread(data *protocol.MSG_U2WS_SpaceThread, c *server.Context) {
	user := public.Getuserinfo(c)
	msg := protocol.Pool_MSG_WS2U_SpaceThread.Get().(*protocol.MSG_WS2U_SpaceThread)
	msg.Uid = data.Uid
	msg.Threadcount = 0
	if data.Page < 1 {
		data.Page = 1
	}
	switch data.Type {
	case 0:
		thread_index := models.Forum_thread_index_Begin()
		defer thread_index.End()
		thread_index.GetThreadlistByUid(data.Uid)
		if len(thread_index.Result) == 0 {
			msg.Threadlist = msg.Threadlist[:0]
		} else {
			if int(data.Page-1)*models.Setting.Topicperpage > len(thread_index.Result) {
				c.Output_data(msg)
				msg.Put()
				return
			}
			if len(thread_index.ResultList) < len(thread_index.Result) {
				thread_index.ResultList = make([]*db.Forum_thread_cache, len(thread_index.Result))
			}
			var i int

			f_map := map[int32]*db.Forum_forum{}
			for _, tid := range thread_index.Result {
				if thread_cache := models.GetForumThreadCacheByTid(tid); thread_cache != nil {
					if _, ok := f_map[thread_cache.Fid]; !ok {
						f := models.GetForumByFid(thread_cache.Fid)
						if f == nil {
							continue
						}
						f_map[f.Fid] = f
					}

					if thread_cache.Displayorder < 0 {
						if thread_cache.Authorid != user.Uid {
							continue
						}

					}
					thread_index.ResultList[i] = thread_cache
					i++
				}
			}
			thread_index.ResultList = thread_index.ResultList[:i]
			msg.Threadcount = int32(i)
			thread_index.Less = func(a, b *db.Forum_thread_cache) bool {
				switch {
				case a.Views.Lastpost > b.Views.Lastpost:
					return true
				case a.Views.Lastpost < b.Views.Lastpost:
					return false
				case a.Displayorder > b.Displayorder:
					return true
				case a.Displayorder < b.Displayorder:
					return false
				}
				return false
			}
			thread_index.Order_result()

			i = 0
			msg.Threadlist = make([]*protocol.MSG_SpaceThread, models.Setting.Topicperpage)
			now := int32(time.Now().Unix())
			for k, thread_cache := range thread_index.ResultList[int(data.Page-1)*models.Setting.Topicperpage:] {
				thread := getSpaceThreadMsg(thread_cache, f_map[thread_cache.Fid], c, now)
				thread.Postlist = thread.Postlist[:0]
				msg.Threadlist[k] = thread
				i++
				if i >= models.Setting.Topicperpage {
					break
				}
			}
			msg.Threadlist = msg.Threadlist[:i]
		}
		c.Output_data(msg)
		msg.Put()
	case 1:
		model_post := new(models.Model_Forum_post)
		model_post.Ctx = c
		field := "Tid,Position,CutMessage"
		postlist := model_post.GetPostList(field, map[string]interface{}{"Authorid": data.Uid}, "Dateline desc", []int{int(data.Page-1) * models.Setting.Topicperpage, int(data.Page) * models.Setting.Topicperpage}, "Tid")

		if len(postlist) > 0 {
			var thread_list []int32
			var thread_postlist [][]*db.Forum_post //按thread分类post
			for _, p := range postlist {
				var isexist bool
				for k, id := range thread_list {
					if id == p.Tid {
						isexist = true
						thread_postlist[k] = append(thread_postlist[k], p)
					}
				}
				if !isexist {
					thread_list = append(thread_list, p.Tid)
					thread_postlist = append(thread_postlist, []*db.Forum_post{p})
				}
			}
			var i int
			now := int32(time.Now().Unix())
			msg.Threadlist = make([]*protocol.MSG_SpaceThread, len(thread_list))
			for k, tid := range thread_list {
				if thread_cache := models.GetForumThreadCacheByTid(tid); thread_cache != nil {
					thread := getSpaceThreadMsg(thread_cache, models.GetForumByFid(thread_cache.Fid), c, now)
					thread.Postlist = make([]*protocol.MSG_SpacePost, len(thread_postlist[k]))
					for k1, post := range thread_postlist[k] {
						tmp := protocol.Pool_MSG_SpacePost.Get().(*protocol.MSG_SpacePost)
						tmp.Position = post.Position
						tmp.Message = post.CutMessage
						thread.Postlist[k1] = tmp
					}
					msg.Threadlist[i] = thread
					i++
				}
			}
			msg.Threadlist = msg.Threadlist[:i]
		} else {
			msg.Threadlist = msg.Threadlist[:0]
		}
		c.Output_data(msg)
		msg.Put()
	default:
		c.Out_common(protocol.Err_param, "")
	}
}
func getSpaceThreadMsg(thread_cache *db.Forum_thread_cache, f *db.Forum_forum, c *server.Context, now int32) (thread *protocol.MSG_SpaceThread) {
	thread = protocol.Pool_MSG_SpaceThread.Get().(*protocol.MSG_SpaceThread)
	thread.Attachment = thread_cache.Attachment
	thread.Author = thread_cache.Author
	thread.Authorid = thread_cache.Authorid
	thread.Closed = thread_cache.Closed
	//thread.Comment = thread_cache.Comments
	thread.Dateline = thread_cache.Dateline
	thread.Digest = thread_cache.Digest
	thread.Displayorder = thread_cache.Displayorder
	thread.Fid = thread_cache.Fid
	thread.ForumName = f.Name
	thread.Lastpost = thread_cache.Views.Lastpost
	thread.Lastposter = thread_cache.Views.Lastposter
	//thread.Position
	thread.Replies = thread_cache.Views.Replies
	thread.Special = thread_cache.Special
	thread.Subject = thread_cache.Subject
	thread.Tid = thread_cache.Tid
	thread.Views = thread_cache.Views.Views
	if f.Status != 3 && (thread_cache.Closed > 0 || (f.Autoclose > 0 && thread_cache.Fid == f.Fid && now-thread_cache.Dateline > f.Autoclose)) {
		if thread_cache.Isgroup == 1 {
			thread.Folder = "common"
			//$grouptids[] = thread_cache['closed'];
		} else {
			/*if(thread_cache.Closed > 1) {
				thread_cache['moved'] = thread_cache['tid'];
				thread_cache['allreplies'] = thread_cache['replies'] = '-';
				thread_cache['views'] = '-';
			}*/
			thread.Folder = "lock"
		}
	} else if f.Status == 3 && thread_cache.Closed == 1 {
		thread.Folder = "lock"
	} else {
		thread.Folder = "common"
	}
	if thread.Folder == "common" && thread.Lastpost >= c.Conn.Session.Load_int32("Lastpost:"+strconv.Itoa(int(thread.Fid))) {
		thread.Folder = "new"
	}
	return
}

func getSpacecpinfo(data *protocol.MSG_U2WS_spacecp, c *server.Context) {
	user := public.Getuserinfo(c)
	if user.Uid == 0 {
		c.Out_common(protocol.Err_Notlogin, "showWindowEx('quick_login')")
		return
	}
	msg := protocol.Pool_MSG_WS2U_spacecp.Get().(*protocol.MSG_WS2U_spacecp)
	msg.Customstatus = user.Field_forum.Customstatus
	msg.Mobile = user.Mobile
	msg.WebSite = user.Site
	msg.Qq = user.QQ
	msg.Wx = user.Wx
	msg.Name = user.Username
	msg.Sightml = user.Field_forum.Sightml
	msg.Uid = user.Uid
	msg.Allow = 0
	msg.GroupId = user.Groupid
	if user.Group.Allowcstatus {
		msg.Allow = 1
	}
	if user.Group.Maxsigsize > 0 {
		msg.Allow += 1 << 1
	}
	if user.Group.Allowsigbbcode {
		msg.Allow += 1 << 2
	}
	if user.Group.Allowsigimgcode {
		msg.Allow += 1 << 3
	}
	if user.Emailstatus == "1" {
		msg.Allow += 1 << 4
	}
	msg.Email = user.Email
	msg.EmailNew = user.EmailNew
	msg.GroupTitle = user.Group.Grouptitle
	msg.SiteGroups = msg.SiteGroups[:0]
	msg.CommonGroups = msg.CommonGroups[:0]
	model_group := new(models.Model_usergroup)
	model_group.Ctx = c
	groups := model_group.GetAllGroup()
	groups.Range(func(k, v interface{}) bool {
		group := v.(*db.Common_usergroup)
		switch group.Type {
		case 1:
			tmp := protocol.Pool_MSG_GroupIdName.Get().(*protocol.MSG_GroupIdName)
			tmp.Id = group.Groupid
			tmp.Name = group.Grouptitle
			msg.SiteGroups = append(msg.SiteGroups, tmp)
		case 2:
			tmp := protocol.Pool_MSG_GroupIdName.Get().(*protocol.MSG_GroupIdName)
			tmp.Id = group.Groupid
			tmp.Name = group.Grouptitle
			msg.CommonGroups = append(msg.CommonGroups, tmp)
		}
		return true
	})
	c.Output_data(msg)
	msg.Put()
}
func edit_Profile(data *protocol.MSG_U2WS_Edit_Profile, c *server.Context) {
	user := public.Getuserinfo(c)
	if user.Uid == 0 {
		c.Out_common(protocol.Err_Notlogin, "showWindowEx('quick_login')")
		return
	}
	sitehtml := libraries.Bbcode2html(data.Sightml, user.Group.Allowsigbbcode, false, false, false, user.Group.Allowsigimgcode, false)
	sitehtml = models.ReplaceShieldingWord(sitehtml)
	if len(sitehtml) > int(user.Group.Maxsigsize) {
		c.Out_common(protocol.Err_Maxsigsize, "")
		return
	}
	if user.Group.Allowcstatus {
		user.Field_forum.Customstatus = models.ReplaceShieldingWord(data.Customstatus)
	}
	user.Field_forum.Sightml = data.Sightml
	user.Mobile = models.ReplaceShieldingWord(data.Mobile)
	user.Site = models.ReplaceShieldingWord(data.WebSite)

	user.QQ = data.Qq
	user.Wx = models.ReplaceShieldingWord(data.Wx)
	model_member_field_forum := new(models.Model_member_field_forum)
	model_member_field_forum.Ctx = c
	model_member_field_forum.BeginTransaction()
	var result bool

	defer func() {
		if result {
			model_member_field_forum.Commit()
		} else {
			model_member_field_forum.Rollback()
		}
		model_member_field_forum.EndTransaction()
	}()
	user.UpdateDB()

	result = model_member_field_forum.Update(user.Field_forum)
	if !result {
		c.Out_common(protocol.Err_db, "")
		return
	}
	c.Out_common(protocol.Success, "")
}
func spacecpGroup(data *protocol.MSG_U2WS_SpacecpGroup, c *server.Context) {
	user := public.Getuserinfo(c)
	if user.Uid == 0 {
		c.Out_common(protocol.Err_Notlogin, "showWindowEx('quick_login')")
		return
	}
	model_group := new(models.Model_usergroup)
	model_group.Ctx = c
	group := model_group.GetUserGroupByID(data.Groupid)
	if group == nil {
		c.Out_common(protocol.Err_Group, "")
		return
	}
	msg := protocol.Pool_MSG_WS2U_SpacecpGroup.Get().(*protocol.MSG_WS2U_SpacecpGroup)
	msg.Groupid = group.Groupid
	msg.Grouptitle = group.Grouptitle

	msg.Allow = 0
	//0头衔=Allowcstatus,1发表=Allowpost,2回复=allowreply,3投票=allowpostpoll,4参与投票=allowvote,5标签=allowposttag,6下载附件=allowgetattach,7上传附件=allowpostattach,8上传图片=allowpostimage
	if group.Allowcstatus {
		msg.Allow = 1
	}
	if group.Allowpost {
		msg.Allow += 1 << 1
	}
	if group.Allowreply {
		msg.Allow += 1 << 2
	}
	if group.Allowpostpoll {
		msg.Allow += 1 << 3
	}
	if group.Allowvote {
		msg.Allow += 1 << 4
	}
	if group.Allowposttag {
		msg.Allow += 1 << 5
	}
	if group.Allowgetattach {
		msg.Allow += 1 << 6
	}
	if group.Allowpostattach {
		msg.Allow += 1 << 7
	}
	if group.Allowpostimage {
		msg.Allow += 1 << 8
	}
	if user.Emailstatus == "1" {
		msg.Allow += 1 << 9
	}
	msg.Allowrecommend = group.Allowrecommend
	msg.Attachextensions = group.Attachextensions
	msg.Maxattachnum = group.Maxattachnum
	msg.Maxattachsize = group.Maxattachsize
	msg.Maxsigsize = group.Maxsigsize
	msg.Maxsizeperday = group.Maxsizeperday
	msg.Readaccess = int8(group.Readaccess)
	c.Output_data(msg)
	msg.Put()
}
func spacecpForum(data *protocol.MSG_U2WS_SpacecpForum, c *server.Context) {
	user := public.Getuserinfo(c)
	if user.Uid == 0 {
		c.Out_common(protocol.Err_Notlogin, "showWindowEx('quick_login')")
		return
	}
	msg := protocol.Pool_MSG_WS2U_SpacecpForum.Get().(*protocol.MSG_WS2U_SpacecpForum)
	msg.Catlist = msg.Catlist[:0]
	var forumList []*db.Forum_forum
	for _, forum := range models.GetForumindex() {
		if forum.Type != 0 {
			if forum.Type == 1 && forum.Fup != 0 { //封装二层
				forumList = append(forumList, forum)
			}

		} else { //封装一层
			tmp := protocol.Pool_MSG_SpacecpGroupPermission.Get().(*protocol.MSG_SpacecpGroupPermission)
			tmp.Name = forum.Name
			tmp.Fid = forum.Fid
			tmp.Child = tmp.Child[:0]
			msg.Catlist = append(msg.Catlist, tmp)
			tmp.Allow = 15
			//0浏览版块=Allowview,1发表=Allowpost,2回复=Allowreply,3下载附件=Allowgetattach
			if user.Forum_access[forum.Fid] != nil && user.Forum_access[forum.Fid].Allowview == -1 {
				tmp.Allow = 0
				continue
			}
			if (user.Forum_access[forum.Fid] == nil && !user.Group.Allowpost) || (user.Forum_access[forum.Fid] != nil && user.Forum_access[forum.Fid].Allowpost != 1) {
				tmp.Allow -= 1 << 1
			}
			if (user.Forum_access[forum.Fid] == nil && !user.Group.Allowreply) || (user.Forum_access[forum.Fid] != nil && user.Forum_access[forum.Fid].Allowreply != 1) {
				tmp.Allow -= 1 << 2
			}
			if (user.Forum_access[forum.Fid] == nil && !user.Group.Allowgetattach) || (user.Forum_access[forum.Fid] != nil && user.Forum_access[forum.Fid].Allowgetattach != 1) {
				tmp.Allow -= 1 << 3
			}
		}
	}
	for _, forum := range forumList {
		for _, f := range msg.Catlist {
			if f.Fid == forum.Fup {
				tmp := protocol.Pool_MSG_SpacecpGroupPermission.Get().(*protocol.MSG_SpacecpGroupPermission)
				tmp.Name = forum.Name
				tmp.Allow = 15
				tmp.Child = tmp.Child[:0]
				//0浏览版块=Allowview,1发表=Allowpost,2回复=Allowreply,3下载附件=Allowgetattach
				if user.Forum_access[forum.Fid] != nil && user.Forum_access[forum.Fid].Allowview == -1 {
					tmp.Allow = 0
					continue
				}
				if (user.Forum_access[forum.Fid] == nil && !user.Group.Allowpost) || (user.Forum_access[forum.Fid] != nil && user.Forum_access[forum.Fid].Allowpost != 1) {
					tmp.Allow -= 1 << 1
				}
				if (user.Forum_access[forum.Fid] == nil && !user.Group.Allowreply) || (user.Forum_access[forum.Fid] != nil && user.Forum_access[forum.Fid].Allowreply != 1) {
					tmp.Allow -= 1 << 2
				}
				if (user.Forum_access[forum.Fid] == nil && !user.Group.Allowgetattach) || (user.Forum_access[forum.Fid] != nil && user.Forum_access[forum.Fid].Allowgetattach != 1) {
					tmp.Allow -= 1 << 3
				}
				f.Child = append(f.Child, tmp)
			}
		}
	}
	c.Output_data(msg)
	msg.Put()
}

func passwdGethash(data *protocol.MSG_U2WS_ChangePasswd_Gethash, c *server.Context) {
	user := public.Getuserinfo(c)
	if user.Uid == 0 {
		c.Out_common(protocol.Err_Notlogin, "showWindowEx('quick_login')")
		return
	}
	if !vaptcha.Verify(data.Seccode, c.Conn.IP, "", vaptcha.SceneChangepw) {
		c.Out_common(protocol.Err_Seccode, "")
		return
	}
	msg := protocol.Pool_MSG_WS2U_ChangePasswd_Gethash.Get().(*protocol.MSG_WS2U_ChangePasswd_Gethash)
	msg.Hash = generateHash(user.Username, c)
	msg.Hash2 = user.Password_salt
	login_hash := libraries.MD5_S(user.Username + libraries.Millitime() + strconv.Itoa(libraries.Rand(100, 999))) //产生一个新密码用的哈希盐
	session := c.Conn.Session
	session.Store("login_hash2", login_hash)
	time.AfterFunc(time.Minute*10, func() {
		session.Delete("login_hash2")
	})
	msg.Hash3 = login_hash
	c.Output_data(msg)
	msg.Put()
}

func changePasswd(data *protocol.MSG_U2WS_ChangePasswd, c *server.Context) {
	user := public.Getuserinfo(c)
	if user.Uid == 0 {
		c.Out_common(protocol.Err_Notlogin, "showWindowEx('quick_login')")
		return
	}
	if len(data.Newpwd) == 0 && data.Email == user.Email {
		c.Out_common(protocol.Success, "")
		return
	}
	if data.Passwd == "" {
		c.Out_common(protocol.Err_Password, "")
		return
	}

	password_hash := libraries.SHA256_S(user.Password + c.Conn.Session.Load_str("login_hash"))
	if password_hash != data.Passwd {
		c.Out_common(protocol.Err_Password, "")
		return
	}
	if data.Email != user.Email {
		if int32(time.Now().Unix())-user.EmailSendTime < models.Setting.Sendmailinterval*60 {
			c.Out_common(protocol.Err_sendmailinterval, "")
			return
		}
		model_email := new(models.Model_email_template)
		model_email.Ctx = c
		if code := model_email.CheckEmail(data.Email); code != protocol.Success {
			c.Out_common(code, "")
			return
		}
		user.EmailNew = data.Email
		user.Emailstatus = libraries.MD5_S(data.Email + user.Username)
		template := model_email.GetTemplatefromName("emailverify")
		if template != nil {
			u := url.Values{}
			u.Set("Emailstatus", user.Emailstatus)
			u.Set("Uid", strconv.Itoa(int(user.Uid)))
			body := models.SetTemplateFromStr(template.Message, map[string]string{
				"Username":    user.Username,
				"Sitename":    models.Setting.Sitename,
				"Siteurl":     models.Setting.Siteurl,
				"Adminemail":  models.Setting.Adminemail,
				"verify_link": models.Setting.Siteurl + "/index.html?" + u.Encode(),
			})
			title := models.SetTemplateFromStr(template.Title, map[string]string{
				"Sitename": models.Setting.Sitename,
			})
			code := model_email.SendOneEmail(user.EmailNew, string(title), string(body))
			if code == protocol.Success {
				user.EmailSendTime = int32(time.Now().Unix())
			} else {
				libraries.DEBUG("验证邮箱发送失败")
			}
		}

	}
	if len(data.Newpwd) > 0 {
		salt := c.Conn.Session.Load_str("login_hash2")
		passwd := make([]byte, len(data.Newpwd))
		cip, _ := aes.NewCipher([]byte(user.Password))
		blockMode := cipher.NewCFBDecrypter(cip, []byte(salt[:16])) // g_aeskey[16:]
		blockMode.XORKeyStream(passwd, data.Newpwd)
		user.Password = string(passwd)
		user.Password_salt = salt
		libraries.DEBUG(string(passwd), hex.EncodeToString(passwd))
	}

	user.UpdateDB()
	c.Out_common(protocol.Success, "reload()")
}
func getThreadBind(c *server.Context) {
	user := public.Getuserinfo(c)
	if user.Uid == 0 {
		c.Out_common(protocol.Err_Notlogin, "showWindowEx('quick_login')")
		return
	}
	model_member := new(models.Model_member)
	model_member.Ctx = c
	msg := protocol.Pool_MSG_WS2U_GetThreadBind.Get().(*protocol.MSG_WS2U_GetThreadBind)
	memberqq := model_member.GetMemberQQByUid(user.Uid)
	msg.Thread = msg.Thread[:0]
	if memberqq != nil {
		tmp := protocol.Pool_MSG_ThreadBind.Get().(*protocol.MSG_ThreadBind)
		tmp.Name = "QQ"
		tmp.Nickname = memberqq.Nickname
		tmp.Img = memberqq.Img
		msg.Thread = append(msg.Thread, tmp)
	}
	c.Output_data(msg)
	msg.Put()
}
func getChangeBindUrl(data *protocol.MSG_U2WS_GetChangeBindUrl, c *server.Context) {
	user := public.Getuserinfo(c)
	if user.Uid == 0 {
		c.Out_common(protocol.Err_Notlogin, "showWindowEx('quick_login')")
		return
	}
	if data.Passwd == "" {
		c.Out_common(protocol.Err_Password, "")
		return
	}
	password_hash := libraries.MD5_S(user.Password + c.Conn.Session.Load_str("login_hash"))
	if password_hash != data.Passwd {
		c.Out_common(protocol.Err_Password, "")
		return
	}
	msg := protocol.Pool_MSG_WS2U_GetChangeBindUrl.Get().(*protocol.MSG_WS2U_GetChangeBindUrl)
	msg.Type = data.Type
	switch data.Type {
	case "QQ":
		msg.Url = qq.GetQQloginUrl(qqRenerateState(c))

	}
	c.Output_data(msg)
	msg.Put()
}
func changeBind(data *protocol.MSG_U2WS_ChangeBind, c *server.Context) {
	user := public.Getuserinfo(c)
	msg := protocol.Pool_MSG_WS2U_ChangeBind.Get().(*protocol.MSG_WS2U_ChangeBind)
	msg.Msg = ""
	msg.Result = protocol.Fail
	if user.Uid == 0 {
		msg.Result = protocol.Err_Notlogin
		c.Output_data(msg)
		msg.Put()
		return
	}
	if !qqCheckState(data.State, c) {
		msg.Result = protocol.Err_QQloginFailed
		c.Output_data(msg)
		msg.Put()
		return
	}
	qquser, err := qq.GetUserInfo(data.Openid, data.Access_token)
	if err != nil || qquser.Ret != 0 {
		msg.Result = protocol.Err_QQloginFailed
		c.Output_data(msg)
		msg.Put()
		return
	}
	model_member := &models.Model_member{}
	model_member.Ctx = c
	if member_info := model_member.GetMemberByQQOpenid(data.Openid); member_info != nil {
		msg.Result = protocol.Err_QQbind
		c.Output_data(msg)
		msg.Put()
		return
	}

	if model_member.AddMemberQQ(qquser, data.Openid, user.Uid) {
		msg.Result = protocol.Success
		msg.Msg = "成功的把账号 " + user.Username + " 绑定到QQ: " + qquser.Nickname
	}
	c.Output_data(msg)
	msg.Put()
}
