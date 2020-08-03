package admin

import (
	"bbs/config"
	"bbs/controllers/public"
	"bbs/db"
	"bbs/libraries"
	"bbs/models"
	"bbs/protocol"
	"bbs/server"
	"html"
	"strconv"
)

func forums_index(c *server.Context) {
	user := public.Getuserinfo(c)
	if user.Adminid != 1 {
		return
	}
	msg := protocol.Pool_MSG_WS2U_Admin_menu_forums_index.Get().(*protocol.MSG_WS2U_Admin_menu_forums_index)
	msg.Catlist = forums_getall()
	c.Output_data(msg)
	msg.Put()
}
func edit_forums_index(data *protocol.MSG_U2WS_Admin_edit_forums_index, c *server.Context) {
	user := public.Getuserinfo(c)
	if user.Adminid != 1 {
		return
	}

	var forums []*db.Forum_forum
	model_forum := &models.Model_Forum_forum{}
	model_forum.Ctx = c
	for _, v := range data.Forums {
		if forum := models.GetForumByFid(v.Fid); forum != nil {
			forum.Name = v.Name
			forum.Displayorder = v.Displayorder
			forums = append(forums, forum)
		} else {
			c.Out_common(protocol.Err_forumId, "")
			return
		}
	}
	res := model_forum.UpdateForums(forums)
	if !res {
		c.Out_common(protocol.Err_db, "")
		return
	}
	var insert []*db.Forum_forum
	for _, v := range data.NewForums {
		if v.Moderators == "group" {
			insert = append(insert, &db.Forum_forum{
				Name:         v.Name,
				Displayorder: v.Displayorder,
				Type:         0,
				Status:       1,
			})
		} else {
			insert = append(insert, &db.Forum_forum{
				Fup:              v.Fid,
				Name:             v.Name,
				Displayorder:     v.Displayorder,
				Allowbbcode:      true,
				Allowimgcode:     true,
				Allowsmilies:     true,
				Type:             1,
				Status:           1,
				Allowpostspecial: 1,
			})
		}
	}
	if len(insert) > 0 {
		res := model_forum.InsertForums(insert)
		if !res {
			c.Out_common(protocol.Err_db, "")
			return
		}

	}
	c.Out_common(protocol.Success, "javascript:reload()")
}
func delete_forum(data *protocol.MSG_U2WS_Admin_delete_forum, c *server.Context) {
	user := public.Getuserinfo(c)
	if user.Adminid != 1 {
		return
	}
	model_forum := &models.Model_Forum_forum{}
	model_forum.Ctx = c
	if forum := models.GetForumByFid(data.Fid); forum != nil {
		res := model_forum.Deleteforum(forum)
		if !res {
			c.Out_common(protocol.Err_db, "")
			return
		}
		c.Out_common(protocol.Success, "javascript:reload()")
	} else {
		c.Out_common(protocol.Err_forumId, "")
		return
	}
}
func edit_forum_menu(data *protocol.MSG_U2WS_Admin_menu_forums_edit, c *server.Context) {
	user := public.Getuserinfo(c)
	if user.Adminid != 1 {
		return
	}

	if forum := models.GetForumByFid(data.Fid); forum != nil {
		msg := protocol.Pool_MSG_WS2U_Admin_menu_forums_edit.Get().(*protocol.MSG_WS2U_Admin_menu_forums_edit)
		msg.Base = protocol.Pool_MSG_admin_forum_edit_base.Get().(*protocol.MSG_admin_forum_edit_base)
		msg.Base.Name = forum.Name
		msg.Fid = forum.Fid
		msg.Base.Fup = forum.Fup
		msg.Type = forum.Type
		msg.Base.Forumcolumns = forum.Forumcolumns
		msg.Base.Catforumcolumns = forum.Catforumcolumns
		msg.Base.Extranew = protocol.Pool_MSG_admin_forum_extra.Get().(*protocol.MSG_admin_forum_extra)
		msg.Base.Extranew.Iconwidth = 0
		msg.Base.Extranew.Namecolor = ""
		msg.Base.Icon = forum.Field.Icon
		msg.Base.Status = forum.Status
		msg.Base.Description = forum.Field.Description
		msg.Base.Rules = forum.Field.Rules
		if forum.Field.Extra != nil {
			msg.Base.Extranew.Iconwidth = forum.Field.Extra.Iconwidth
			msg.Base.Extranew.Namecolor = forum.Field.Extra.Namecolor
		}
		msg.Base.Catlist = forums_getall()
		msg.Ext = protocol.Pool_MSG_admin_forum_edit_ext.Get().(*protocol.MSG_admin_forum_edit_ext)
		msg.Ext.Forumcolumns = forum.Forumcolumns
		msg.Modrecommendnew = protocol.Pool_MSG_admin_forum_modrecommen.Get().(*protocol.MSG_admin_forum_modrecommen)
		msg.Threadsortsnew = protocol.Pool_MSG_admin_forum_threadsorts.Get().(*protocol.MSG_admin_forum_threadsorts)
		msg.Threadtypesnew = protocol.Pool_MSG_admin_forum_threadtypes.Get().(*protocol.MSG_admin_forum_threadtypes)
		if forum.Field.ThreadtypesSetting.Status {
			msg.Threadtypesnew.Status = 1
		} else {
			msg.Threadtypesnew.Status = 0
		}
		if forum.Field.ThreadtypesSetting.Required {
			msg.Threadtypesnew.Required = 1
		} else {
			msg.Threadtypesnew.Required = 0
		}
		if forum.Field.ThreadtypesSetting.Listable {
			msg.Threadtypesnew.Listable = 1
		} else {
			msg.Threadtypesnew.Listable = 0
		}
		msg.Threadtypesnew.Add = nil
		msg.Threadtypesnew.Deletes = nil
		msg.Threadtypesnew.Prefix = forum.Field.ThreadtypesSetting.Prefix
		msg.Threadtypesnew.Types = make([]*protocol.MSG_admin_forum_type, len(forum.Field.ThreadtypesMsg))
		for k, t := range forum.Field.ThreadtypesMsg {
			types := protocol.Pool_MSG_admin_forum_type.Get().(*protocol.MSG_admin_forum_type)
			types.Name = html.UnescapeString(t.Name)
			types.Icon = html.UnescapeString(t.Icon)
			types.Id = t.Typeid
			if t.Enable {
				types.Enable = 1
			} else {
				types.Enable = 0
			}
			if t.Ismoderator {
				types.Moderators = 1
			} else {
				types.Moderators = 0
			}
			msg.Threadtypesnew.Types[k] = types
		}
		c.Output_data(msg)
		msg.Put()
	} else {
		c.Out_common(protocol.Err_forumId, "")
		return
	}
}
func forums_getall() (msgcarlist []*protocol.MSG_admin_forum_cart) {
	catlist := map[int32]*db.Forum_forum{}
	forumlist := map[int32]*db.Forum_forum{}
	level_three := map[int32]*db.Forum_forum{}
	var one, two, three []int32
	for _, forum := range models.GetAllForum() {
		if forum.Type != 0 {
			if forum.Type == 1 && catlist[forum.Fup] != nil { //封装二层
				two = append(two, forum.Fid)
				forumlist[forum.Fid] = forum

			} else if _, ok := forumlist[forum.Fup]; ok { //封装三层
				three = append(three, forum.Fid)
				level_three[forum.Fid] = forum

			}

		} else { //封装一层
			one = append(one, forum.Fid)
			catlist[forum.Fid] = forum
		}
	}
	for _, id := range one {
		category := protocol.Pool_MSG_admin_forum_cart.Get().(*protocol.MSG_admin_forum_cart)
		category.Fid = catlist[id].Fid
		category.Name = catlist[id].Name
		category.Moderators = catlist[id].Field.Moderators
		category.Displayorder = catlist[id].Displayorder
		category.Status = catlist[id].Status
		category.Forums = category.Forums[:0]
		for _, idtwo := range two {
			if forumlist[idtwo].Fup == id {
				forum_two := protocol.Pool_MSG_admin_forum.Get().(*protocol.MSG_admin_forum)
				forum_two.Fid = forumlist[idtwo].Fid
				forum_two.Name = forumlist[idtwo].Name
				forum_two.Moderators = forumlist[idtwo].Field.Moderators
				forum_two.Displayorder = forumlist[idtwo].Displayorder
				forum_two.Status = forumlist[idtwo].Status
				forum_two.Level_three = forum_two.Level_three[:0]
				for _, idthree := range three {
					if level_three[idthree].Fup == idtwo {
						forum_three := protocol.Pool_MSG_admin_forum_three.Get().(*protocol.MSG_admin_forum_three)
						forum_three.Fid = level_three[idthree].Fid
						forum_three.Name = level_three[idthree].Name
						forum_three.Moderators = level_three[idthree].Field.Moderators
						forum_three.Displayorder = level_three[idthree].Displayorder
						forum_three.Status = level_three[idthree].Status
						forum_two.Level_three = append(forum_two.Level_three, forum_three)
					}
				}
				category.Forums = append(category.Forums, forum_two)
			}
		}
		msgcarlist = append(msgcarlist, category)
	}
	return
}
func edit_forum_base(data *protocol.MSG_admin_forum_edit_base, c *server.Context) {
	user := public.Getuserinfo(c)
	if user.Adminid != 1 {
		return
	}

	model_forum := &models.Model_Forum_forum{}
	model_forum.Ctx = c
	if forum := models.GetForumByFid(data.Fid); forum != nil {
		forum.Name = data.Name
		if forum.Field.Extra == nil {
			forum.Field.Extra = &protocol.MSG_forum_extra{}
		}
		forum.Field.Extra.Namecolor = data.Extranew.Namecolor
		forum.Field.Extra.Iconwidth = data.Extranew.Iconwidth
		forum.Fup = data.Fup
		forum.Forumcolumns = data.Forumcolumns
		forum.Catforumcolumns = data.Catforumcolumns
		forum.Field.Icon = data.Icon
		if len(data.File) > 0 {
			var outbyte []byte
			var err error
			if config.Server.Webp {
				err, outbyte = libraries.ConvertImgB(data.File, "webp", 263, 0, 70)
			} else {
				err, outbyte = libraries.ConvertImgB(data.File, "jpeg", 263, 0, 70)
			}

			if err != nil {
				c.Out_common(protocol.Fail, err.Error())
				return
			}
			filename := "/static/image/forum/" + strconv.Itoa(int(forum.Fid))
			if config.Server.Webp {
				filename += ".webp"
			} else {
				filename += ".jpg"
			}
			err = models.UploadStatic(filename, outbyte)
			if err != nil {
				c.Out_common(protocol.Fail, err.Error())
				return
			}
			forum.Field.Icon = filename + "?t=" + libraries.Timestamp()
		}
		forum.Status = data.Status
		forum.Field.Description = data.Description
		forum.Field.Rules = data.Rules
		res := model_forum.UpdateForums([]*db.Forum_forum{forum})
		if !res {
			c.Out_common(protocol.Err_db, "")
			return
		}
	} else {
		c.Out_common(protocol.Err_forumId, "")
		return
	}
	c.Out_common(protocol.Success, "javascript:reload()")
}
func forums_moderators(data *protocol.MSG_U2WS_Admin_menu_forums_moderators, c *server.Context) {
	user := public.Getuserinfo(c)
	if user.Adminid != 1 {
		return
	}
	if forum := models.GetForumByFid(data.Fid); forum != nil {
		msg := protocol.Pool_MSG_WS2U_Admin_menu_forums_moderators.Get().(*protocol.MSG_WS2U_Admin_menu_forums_moderators)
		msg.Fid = forum.Fid
		msg.Name = forum.Name
		if len(msg.Moderators) < len(forum.Moderators) {
			msg.Moderators = append(msg.Moderators, make([]*protocol.MSG_admin_forums_moderator, len(forum.Moderators)-len(msg.Moderators))...)
		}

		for k, m := range forum.Moderators {
			msg.Moderators[k] = protocol.Pool_MSG_admin_forums_moderator.Get().(*protocol.MSG_admin_forums_moderator)
			msg.Moderators[k].Displayorder = m.Displayorder
			msg.Moderators[k].Groupid = 0
			msg.Moderators[k].Uid = 0
			if user := models.GetMemberInfoByID(m.Uid); user != nil {
				msg.Moderators[k].Uid = user.Uid
				msg.Moderators[k].Name = "Uid:" + strconv.Itoa(int(user.Uid)) + "," + user.Username
				msg.Moderators[k].Groupid = user.Groupid
			} else {
				msg.Moderators[k].Name = "用户账号不存在"
			}
		}
		msg.Groups = msg.Groups[:0]
		for _, g := range (*models.Model_usergroup).GetForumGroup(nil) {
			v := protocol.Pool_MSG_admin_forums_group.Get().(*protocol.MSG_admin_forums_group)
			v.Groupid = g.Groupid
			v.Groupname = g.Grouptitle
			msg.Groups = append(msg.Groups, v)
		}
		msg.Moderators = msg.Moderators[:len(forum.Moderators)]
		c.Output_data(msg)
		msg.Put()
	} else {
		c.Out_common(protocol.Err_forumId, "")
		return
	}
}
func edit_forums_moderators(data *protocol.MSG_U2WS_Admin_Edit_forums_moderator, c *server.Context) {
	user := public.Getuserinfo(c)
	if user.Adminid != 1 {
		return
	}
	model_forum := &models.Model_Forum_forum{}
	model_forum.Ctx = c
	if forum := models.GetForumByFid(data.Fid); forum != nil {
		if data.Add != nil {
			model_member := &models.Model_member{}
			model_member.Ctx = c
			if user := model_member.GetMemberInfo(map[string]interface{}{"Username": data.Add.Name}, "*", true); user != nil {
				for _, v := range forum.Moderators {
					if v.Uid == user.Uid {
						c.Out_common(protocol.Fail, "管理员已存在")
						return
					}
				}
				if gruop := (*models.Model_usergroup).GetUserGroupByID(nil, int16(data.Add.Uid)); gruop != nil {
					if gruop.Radminid != 3 {
						c.Out_common(protocol.Fail, "不允许设置的组别")
						return
					}
					user.Groupid = gruop.Groupid
					user.Group = gruop
					user.Adminid = gruop.Groupid
					user.UpdateDB()
					forum.Moderators = append(forum.Moderators, &db.Forum_moderator{Uid: user.Uid, Displayorder: data.Add.Displayorder})
				} else {
					c.Out_common(protocol.Err_Group, "")
					return
				}
			} else {
				c.Out_common(protocol.Err_NotFoundUser, "")
				return
			}
		}
		if data.Deletes != nil {
			for _, id := range data.Deletes {
				for i := len(forum.Moderators) - 1; i > -1; i-- {
					if forum.Moderators[i].Uid == id {
						forum.Moderators = append(forum.Moderators[:i], forum.Moderators[i+1:]...)
						if user := models.GetMemberInfoByID(id); user != nil {
							if group := (*models.Model_usergroup).GetMemberGroupIDFromCredits(nil, user.Credits); group != nil {
								user.Groupid = group.Groupid
								user.Group = group
								user.Adminid = 0
								user.UpdateDB()
							}

						}
					}
				}
			}
		}
		for _, v := range data.Edit {
			for i := len(forum.Moderators) - 1; i > -1; i-- {
				m := forum.Moderators[i]
				if m.Uid == v.Uid {
					if user := models.GetMemberInfoByID(v.Uid); user != nil {

						if gruop := (*models.Model_usergroup).GetUserGroupByID(nil, v.Groupid); gruop != nil {
							if gruop.Radminid != 3 {
								c.Out_common(protocol.Fail, "不允许设置的组别")
								return
							}
							user.Groupid = gruop.Groupid
							user.Group = gruop
							user.UpdateDB()
						} else {
							c.Out_common(protocol.Err_Group, "")
							return
						}
					} else {
						forum.Moderators = append(forum.Moderators[:i], forum.Moderators[i+1:]...)
					}
				}
			}
		}
		libraries.SortAny(forum.Moderators, func(a, b interface{}) bool {
			if a.(*db.Forum_moderator).Displayorder == b.(*db.Forum_moderator).Displayorder {
				return a.(*db.Forum_moderator).Uid < b.(*db.Forum_moderator).Uid
			}
			return a.(*db.Forum_moderator).Displayorder < b.(*db.Forum_moderator).Displayorder
		})
		res := model_forum.UpdateForums([]*db.Forum_forum{forum})
		if !res {
			c.Out_common(protocol.Err_db, "")
			return
		}
		c.Out_common(protocol.Success, "javascript:reload()")
	} else {
		c.Out_common(protocol.Err_forumId, "")
		return
	}
}
func edit_forums_threadtypes(data *protocol.MSG_admin_forum_threadtypes, c *server.Context) (code int16) {
	user := public.Getuserinfo(c)
	if user.Adminid != 1 {
		return protocol.Success
	}
	model_forum := &models.Model_Forum_forum{}
	model_forum.Ctx = c
	forum := models.GetForumByFid(data.Fid)
	if forum == nil {
		c.Out_common(protocol.Err_forumId, "")
		return protocol.Success
	}

	model_forum.BeginTransaction()
	inserts := []*db.Forum_threadtype{}
	defer func() {
		if code == protocol.Success {
			forum.Field.ThreadtypesSetting.Status = data.Status == 1
			forum.Field.ThreadtypesSetting.Required = data.Required == 1
			forum.Field.ThreadtypesSetting.Listable = data.Listable == 1
			forum.Field.ThreadtypesSetting.Prefix = data.Prefix
			if len(inserts) > 0 {
				forum.Field.ThreadtypesMsg = append(forum.Field.ThreadtypesMsg, inserts...)
			}
			libraries.SortAny(forum.Field.ThreadtypesMsg, func(a, b interface{}) bool {
				if a.(*db.Forum_threadtype).Displayorder > b.(*db.Forum_threadtype).Displayorder {
					return true
				}
				return false
			})
			model_forum.Commit()
			model_forum.UpdateForum(forum)
		} else {
			model_forum.Rollback()
		}
		model_forum.EndTransaction()
		c.Out_common(code, "javascript:reload()")
	}()
	model_forum_threadtype := &models.Model_Forum_threadtype{}
	model_forum_threadtype.Ctx = c
	for _, add := range data.Add {
		insert := &db.Forum_threadtype{
			Name:         html.EscapeString(add.Name),
			Icon:         html.EscapeString(add.Icon),
			Displayorder: add.Displayorder,
			Enable:       true,
			Fid:          data.Fid,
			Ismoderator:  add.Moderators == 1,
		}
		id := model_forum_threadtype.Add(insert)
		insert.Typeid = id
		inserts = append(inserts, insert)
	}
	for _, t1 := range data.Types {
		for _, t2 := range forum.Field.ThreadtypesMsg {
			if t1.Id == t2.Typeid {
				t2.Icon = html.EscapeString(t1.Icon)
				t2.Name = html.EscapeString(t1.Name)
				t2.Enable = t1.Enable == 1
				t2.Ismoderator = t1.Moderators == 1
				t2.Displayorder = t1.Displayorder
				break
			}
		}
		model_forum_threadtype.ReplaceAll(forum.Field.ThreadtypesMsg)

	}
	for _, id := range data.Deletes {
		for i := len(forum.Field.ThreadtypesMsg); i > 0; i-- {
			if forum.Field.ThreadtypesMsg[i-1].Typeid == id {
				forum.Field.ThreadtypesMsg = append(forum.Field.ThreadtypesMsg[:i-1], forum.Field.ThreadtypesMsg[i:]...)
				model_forum.Table("Forum_threadtype").Where("Typeid=" + strconv.Itoa(int(id))).Delete()

			}
		}
	}
	return protocol.Success
}
