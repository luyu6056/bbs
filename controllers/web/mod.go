package web

import (
	"bbs/config"
	"bbs/controllers/public"
	"bbs/db"
	"bbs/models"
	"bbs/protocol"
	"bbs/server"
	"strconv"
	"time"
)

//管理模块
func threadmod(data *protocol.MSG_U2WS_threadmod, c *server.Context) {
	if len(data.Tids) == 0 || len(data.Tids) > 100 {
		c.Out_common(protocol.Err_param, "")
		return
	}
	switch data.Action { //0=删除,1=升降,2=置顶,3=高亮,4=精华,5=推荐,6=图章,7=图标,8=关闭,9=移动,10=分类,11=复制,12=警告,13=屏蔽,14=标签
	case db.ThreadmodId升降:
		bumpthread(data, c)
	case db.ThreadmodId置顶:
		stickthread(data, c)
	case db.ThreadmodId高亮:
		highlightthread(data, c)
	case db.ThreadmodId精华:
		digestthread(data, c)
	case db.ThreadmodId图章:
		stampthread(data, c)
	case db.ThreadmodId图标:
		stamplist(data, c)
	case db.ThreadmodId关闭:
		closethread(data, c)
	case db.ThreadmodId移动:
		movethread(data, c)
	case db.ThreadmodId分类:
		dittypethread(data, c)
	case db.ThreadmodId标签:
		managetag(data, c)
	case db.ThreadmodId删除:
		delthread(data, c)
	case db.ThreadmodId警告:
		warnpost(data, c)
	case db.ThreadmodId屏蔽:
		banpost(data, c)
	case db.ThreadmodId置顶回复:
		stickreply(data, c)
	case db.ThreadmodId删除回复:
		delpost(data, c)
	default:
		c.Out_common(protocol.Err_param, "")
		return
	}
	if len(data.Tids) > 0 {
		model := &models.Model_Forum_thread{}
		model.Ctx = c
		model.Build_thread_index(map[string]interface{}{"Tid": data.Tids}, false)
	}

}
func viewthreadmod(data *protocol.MSG_U2WS_viewthreadmod, c *server.Context) {
	var mods []*db.Log_forum_threadmod
	model := &models.Model{}
	model.Ctx = c
	model.Table("Log_forum_threadmod").Where(map[string]interface{}{"Tid": data.Tid, "Position": 0}).Limit(8).Order("Dateline desc").Select(&mods)
	msg := protocol.Pool_MSG_WS2U_viewthreadmod.Get().(*protocol.MSG_WS2U_viewthreadmod)
	if len(msg.List) < len(mods) {
		msg.List = make([]*protocol.MSG_threadmod, len(mods))
	}
	for k, v := range mods {
		tmp := protocol.Pool_MSG_threadmod.Get().(*protocol.MSG_threadmod)
		tmp.Modactiontype = v.Action
		tmp.Moddateline = int32(v.Dateline)
		tmp.Expiration = v.Expiration
		u := models.GetMemberInfoByID(v.Uid)
		if u == nil {
			tmp.Modusername = "System"
		} else {
			tmp.Modusername = u.Username
		}
		tmp.Reason = v.Reason
		if v.ActionId == db.ThreadmodId图章 {
			tmp.Stamp = int8(v.Param)
		} else {
			tmp.Stamp = -1
		}

		tmp.Status = v.Status
		msg.List[k] = tmp
	}
	msg.List = msg.List[:len(mods)]
	c.Output_data(msg)
	msg.Put()
}

//升降主题
func bumpthread(data *protocol.MSG_U2WS_threadmod, c *server.Context) {
	if data.Param != 0 && data.Param != 1 {
		c.Out_common(protocol.Err_param, "")
		return
	}
	user := public.Getuserinfo(c)
	if user.Admin_Group == nil || !user.Admin_Group.Allowbumpthread {
		c.Out_common(protocol.Err_Groupperm, "")
		return
	}
	lastpost := int32(time.Now().Unix())
	if data.Param == 1 {
		lastpost = 0
	}
	for i := len(data.Tids) - 1; i >= 0; i-- {
		if threadcache := models.GetForumThreadCacheByTid(data.Tids[i]); threadcache != nil {
			threadcache.Views.Lastpost = lastpost
		} else {
			data.Tids = append(data.Tids[:i], data.Tids[i+1:]...)
		}
	}
	if len(data.Tids) == 0 {
		msg := protocol.Pool_MSG_WS2U_threadmod.Get().(*protocol.MSG_WS2U_threadmod)
		c.Output_data(msg)
		msg.Put()
		return
	}
	model := &models.Model_Forum_thread{}
	model.Ctx = c
	model.UpdateData(map[string]interface{}{"Tid": data.Tids}, map[string]interface{}{"Lastpost": lastpost})
	action := "BMP"
	if data.Param == 1 {
		action = "DWN"
	}
	for _, tid := range data.Tids {
		threadcache := models.GetForumThreadCacheByTid(tid)
		db.Updatethreadmodlog(threadcache.Fid, threadcache.Tid, 0, action, 0, data.Reason, user, db.ThreadmodId升降, data.Param, data.Param1)
	}
	msg := protocol.Pool_MSG_WS2U_threadmod.Get().(*protocol.MSG_WS2U_threadmod)
	c.Output_data(msg)
	msg.Put()
}

//置顶
func stickthread(data *protocol.MSG_U2WS_threadmod, c *server.Context) {
	if data.Param < 0 || data.Param > 3 {
		c.Out_common(protocol.Err_param, "")
		return
	}
	user := public.Getuserinfo(c)
	if user.Admin_Group == nil || user.Admin_Group.Allowstickthread < data.Param {
		c.Out_common(protocol.Err_Groupperm, "")
		return
	}
	for i := len(data.Tids) - 1; i >= 0; i-- {
		if threadcache := models.GetForumThreadCacheByTid(data.Tids[i]); threadcache != nil {
			threadcache.Displayorder = data.Param
		} else {
			data.Tids = append(data.Tids[:i], data.Tids[i+1:]...)
		}
	}
	if len(data.Tids) == 0 {
		msg := protocol.Pool_MSG_WS2U_threadmod.Get().(*protocol.MSG_WS2U_threadmod)
		c.Output_data(msg)
		msg.Put()
		return
	}
	model := &models.Model_Forum_thread{}
	model.Ctx = c
	model.Update(map[string]interface{}{"Tid": data.Tids}, map[string]interface{}{"Displayorder": data.Param})
	action := "UST"
	switch {
	case data.Expiration > 0 && data.Param > 0:
		action = "EST"
	case data.Param > 0:
		action = "STK"
	}
	for _, tid := range data.Tids {
		threadcache := models.GetForumThreadCacheByTid(tid)
		db.Updatethreadmodlog(threadcache.Fid, threadcache.Tid, 0, action, data.Expiration, data.Reason, user, db.ThreadmodId置顶, data.Param, data.Param1)
	}

	msg := protocol.Pool_MSG_WS2U_threadmod.Get().(*protocol.MSG_WS2U_threadmod)
	c.Output_data(msg)
	msg.Put()
}

//高亮
func highlightthread(data *protocol.MSG_U2WS_threadmod, c *server.Context) {
	if data.Param < 0 {
		c.Out_common(protocol.Err_param, "")
		return
	}
	user := public.Getuserinfo(c)
	if user.Admin_Group == nil || !user.Admin_Group.Allowhighlightthread {
		c.Out_common(protocol.Err_Groupperm, "")
		return
	}
	for i := len(data.Tids) - 1; i >= 0; i-- {
		if threadcache := models.GetForumThreadCacheByTid(data.Tids[i]); threadcache != nil {
			threadcache.Highlight = data.Param
		} else {
			data.Tids = append(data.Tids[:i], data.Tids[i+1:]...)
		}
	}
	if len(data.Tids) == 0 {
		msg := protocol.Pool_MSG_WS2U_threadmod.Get().(*protocol.MSG_WS2U_threadmod)
		c.Output_data(msg)
		msg.Put()
		return
	}
	model := &models.Model_Forum_thread{}
	model.Ctx = c
	model.Update(map[string]interface{}{"Tid": data.Tids}, map[string]interface{}{"Highlight": data.Param})
	action := "UHL"
	switch {
	case data.Expiration > 0 && data.Param > 0:
		action = "EHL"
	case data.Param > 0:
		action = "HLT"
	}
	for _, tid := range data.Tids {
		threadcache := models.GetForumThreadCacheByTid(tid)
		db.Updatethreadmodlog(threadcache.Fid, threadcache.Tid, 0, action, data.Expiration, data.Reason, user, db.ThreadmodId高亮, data.Param, data.Param1)
	}
	msg := protocol.Pool_MSG_WS2U_threadmod.Get().(*protocol.MSG_WS2U_threadmod)
	c.Output_data(msg)
	msg.Put()
}

//精华
func digestthread(data *protocol.MSG_U2WS_threadmod, c *server.Context) {
	if data.Param < 0 {
		c.Out_common(protocol.Err_param, "")
		return
	}
	user := public.Getuserinfo(c)
	if user.Admin_Group == nil || user.Admin_Group.Allowdigestthread < data.Param {
		c.Out_common(protocol.Err_Groupperm, "")
		return
	}
	for i := len(data.Tids) - 1; i >= 0; i-- {
		if threadcache := models.GetForumThreadCacheByTid(data.Tids[i]); threadcache != nil {
			threadcache.Digest = data.Param
		} else {
			data.Tids = append(data.Tids[:i], data.Tids[i+1:]...)
		}
	}
	if len(data.Tids) == 0 {
		msg := protocol.Pool_MSG_WS2U_threadmod.Get().(*protocol.MSG_WS2U_threadmod)
		c.Output_data(msg)
		msg.Put()
		return
	}
	model := &models.Model_Forum_thread{}
	model.Ctx = c
	model.Update(map[string]interface{}{"Tid": data.Tids}, map[string]interface{}{"Digest": data.Param})
	model.ChangeDigestIndex(data.Tids, data.Param > 0)
	action := "UDG"
	switch {
	case data.Expiration > 0 && data.Param > 0:
		action = "EDI"
	case data.Param > 0:
		action = "DIG"
	}
	for _, tid := range data.Tids {
		threadcache := models.GetForumThreadCacheByTid(tid)
		db.Updatethreadmodlog(threadcache.Fid, threadcache.Tid, 0, action, data.Expiration, data.Reason, user, db.ThreadmodId精华, data.Param, data.Param1)
	}
	msg := protocol.Pool_MSG_WS2U_threadmod.Get().(*protocol.MSG_WS2U_threadmod)
	c.Output_data(msg)
	msg.Put()

}

//图章
func stampthread(data *protocol.MSG_U2WS_threadmod, c *server.Context) {
	if data.Param < 0 {
		c.Out_common(protocol.Err_param, "")
		return
	}
	user := public.Getuserinfo(c)
	if user.Admin_Group == nil || !user.Admin_Group.Allowstampthread {
		c.Out_common(protocol.Err_Groupperm, "")
		return
	}

	for i := len(data.Tids) - 1; i >= 0; i-- {
		if threadcache := models.GetForumThreadCacheByTid(data.Tids[i]); threadcache == nil {
			data.Tids = append(data.Tids[:i], data.Tids[i+1:]...)
		}
	}
	if len(data.Tids) == 0 {
		msg := protocol.Pool_MSG_WS2U_threadmod.Get().(*protocol.MSG_WS2U_threadmod)
		c.Output_data(msg)
		msg.Put()
		return
	}
	model := &models.Model_Forum_thread{}
	model.Ctx = c
	model.Update(map[string]interface{}{"Tid": data.Tids}, map[string]interface{}{"Stamp": data.Param})
	action := "SPD"
	if data.Param > 0 {
		action = "SPA"
	}
	for _, tid := range data.Tids {
		threadcache := models.GetForumThreadCacheByTid(tid)
		db.Updatethreadmodlog(threadcache.Fid, threadcache.Tid, 0, action, data.Expiration, data.Reason, user, db.ThreadmodId图章, data.Param, data.Param1)
	}
	msg := protocol.Pool_MSG_WS2U_threadmod.Get().(*protocol.MSG_WS2U_threadmod)
	c.Output_data(msg)
	msg.Put()
}

//图标
func stamplist(data *protocol.MSG_U2WS_threadmod, c *server.Context) {
	if data.Param < 0 {
		c.Out_common(protocol.Err_param, "")
		return
	}
	user := public.Getuserinfo(c)
	if user.Admin_Group == nil || !user.Admin_Group.Allowstamplist {
		c.Out_common(protocol.Err_Groupperm, "")
		return
	}

	for i := len(data.Tids) - 1; i >= 0; i-- {
		if threadcache := models.GetForumThreadCacheByTid(data.Tids[i]); threadcache != nil {
			threadcache.Icon = data.Param
		} else {
			data.Tids = append(data.Tids[:i], data.Tids[i+1:]...)
		}
	}
	if len(data.Tids) == 0 {
		msg := protocol.Pool_MSG_WS2U_threadmod.Get().(*protocol.MSG_WS2U_threadmod)
		c.Output_data(msg)
		msg.Put()
		return
	}
	model := &models.Model_Forum_thread{}
	model.Ctx = c
	model.Update(map[string]interface{}{"Tid": data.Tids}, map[string]interface{}{"Icon": data.Param})
	action := "SLD"
	if data.Param > 0 {
		action = "SLA"
	}
	for _, tid := range data.Tids {
		threadcache := models.GetForumThreadCacheByTid(tid)
		db.Updatethreadmodlog(threadcache.Fid, threadcache.Tid, 0, action, data.Expiration, data.Reason, user, db.ThreadmodId图标, data.Param, data.Param1)
	}
	msg := protocol.Pool_MSG_WS2U_threadmod.Get().(*protocol.MSG_WS2U_threadmod)
	c.Output_data(msg)
	msg.Put()
}

//关闭主题
func closethread(data *protocol.MSG_U2WS_threadmod, c *server.Context) {
	if data.Param < 0 {
		c.Out_common(protocol.Err_param, "")
		return
	}
	user := public.Getuserinfo(c)
	if user.Admin_Group == nil || !user.Admin_Group.Allowclosethread {
		c.Out_common(protocol.Err_Groupperm, "")
		return
	}

	for i := len(data.Tids) - 1; i >= 0; i-- {
		if threadcache := models.GetForumThreadCacheByTid(data.Tids[i]); threadcache != nil {
			threadcache.Closed = data.Param
		} else {
			data.Tids = append(data.Tids[:i], data.Tids[i+1:]...)
		}
	}
	if len(data.Tids) == 0 {
		msg := protocol.Pool_MSG_WS2U_threadmod.Get().(*protocol.MSG_WS2U_threadmod)
		c.Output_data(msg)
		msg.Put()
		return
	}
	model := &models.Model_Forum_thread{}
	model.Ctx = c

	model.Update(map[string]interface{}{"Tid": data.Tids}, map[string]interface{}{"Closed": data.Param})
	action := "OPN"
	switch {
	case data.Param > 0 && data.Expiration > 0:
		action = "ECL"
	case data.Param == 0 && data.Expiration > 0:
		action = "EOP"
	case data.Param > 0:
		action = "OPN"
	}
	for _, tid := range data.Tids {
		threadcache := models.GetForumThreadCacheByTid(tid)
		db.Updatethreadmodlog(threadcache.Fid, threadcache.Tid, 0, action, data.Expiration, data.Reason, user, db.ThreadmodId关闭, data.Param, data.Param1)
	}
	msg := protocol.Pool_MSG_WS2U_threadmod.Get().(*protocol.MSG_WS2U_threadmod)
	c.Output_data(msg)
	msg.Put()
}

//移动主题
func movethread(data *protocol.MSG_U2WS_threadmod, c *server.Context) {
	if data.Param < 0 || data.Expiration < 0 || data.Param1 < 0 {
		c.Out_common(protocol.Err_param, "")
		return
	}

	user := public.Getuserinfo(c)
	if user.Admin_Group == nil || !user.Admin_Group.Allowmovethread {
		c.Out_common(protocol.Err_Groupperm, "")
		return
	}
	f := models.GetForumByFid(data.Expiration)
	if f == nil {
		c.Out_common(protocol.Err_forumId, "")
		return
	}
	//检查typeid
	typeid_isexist := false
	if len(f.Field.ThreadtypesMsg) > 0 {
		for _, Type := range f.Field.ThreadtypesMsg {
			if int32(Type.Typeid) == data.Param1 {
				typeid_isexist = true
				break
			}
		}
	} else {
		data.Param1 = 0
	}
	if f.Field.ThreadtypesSetting.Required && !typeid_isexist { //强制分类
		c.Out_common(protocol.Err_Typeid, "")
		return
	}
	model := &models.Model_Forum_thread{}
	model.Ctx = c
	model.BeginTransaction()
	var res bool = true
	defer func() {
		if res {
			model.Commit()
		} else {
			model.Rollback()
		}
		model.EndTransaction()
	}()
	for i := len(data.Tids) - 1; i >= 0; i-- {
		if !res {
			break
		}
		if threadcache := models.GetForumThreadCacheByTid(data.Tids[i]); threadcache != nil {
			if threadcache.Tid == data.Expiration {
				data.Tids = append(data.Tids[:i], data.Tids[i+1:]...)
				continue
			}
			if data.Param == 1 {
				thread := model.GetForumThread(map[string]interface{}{"Tid": threadcache.Tid}, true)
				if thread == nil {
					data.Tids = append(data.Tids[:i], data.Tids[i+1:]...)
				} else {
					//修改镜像信息插入
					thread.Tid = 0
					thread.Redirect = threadcache.Tid
					thread.Fid = data.Expiration
					thread.Typeid = int16(data.Param1)
					tid := model.Addone(thread)
					if tid > 0 {
						data.Tids = append(data.Tids, tid)
					} else {
						res = false
					}
				}
			} else {

				threadcache.Fid = data.Expiration
				threadcache.Typeid = int16(data.Param1)
				res = model.Update(map[string]interface{}{"Tid": data.Tids}, map[string]interface{}{"Fid": threadcache.Fid, "Typeid": threadcache.Typeid})
				if res {
					model_post := (&models.Model_Forum_post{})
					model_post.Ctx = c
					model_post.Update(map[string]interface{}{"Tid": data.Tids}, map[string]interface{}{"Fid": threadcache.Fid})
				}
			}

		} else {
			data.Tids = append(data.Tids[:i], data.Tids[i+1:]...)
		}
	}
	if len(data.Tids) == 0 {
		msg := protocol.Pool_MSG_WS2U_threadmod.Get().(*protocol.MSG_WS2U_threadmod)
		c.Output_data(msg)
		msg.Put()
		return
	}
	if !res {
		c.Out_common(protocol.Err_db, "")
		return
	}
	action := "MOV"
	if data.Param == 1 {
		action = "MIR"
	}
	for _, tid := range data.Tids {
		threadcache := models.GetForumThreadCacheByTid(tid)
		db.Updatethreadmodlog(threadcache.Fid, threadcache.Tid, 0, action, 0, data.Reason, user, db.ThreadmodId移动, data.Param, data.Param1)
	}
	msg := protocol.Pool_MSG_WS2U_threadmod.Get().(*protocol.MSG_WS2U_threadmod)
	c.Output_data(msg)
	msg.Put()
}

//分类主题
func dittypethread(data *protocol.MSG_U2WS_threadmod, c *server.Context) {
	if data.Param1 < 0 {
		c.Out_common(protocol.Err_param, "")
		return
	}
	user := public.Getuserinfo(c)
	if user.Admin_Group == nil || !user.Admin_Group.Allowedittypethread {
		c.Out_common(protocol.Err_Groupperm, "")
		return
	}
	model := &models.Model_Forum_thread{}
	model.Ctx = c
	var f *db.Forum_forum
	for i := len(data.Tids) - 1; i >= 0; i-- {
		if threadcache := models.GetForumThreadCacheByTid(data.Tids[i]); threadcache != nil {
			if f == nil {
				f = models.GetForumByFid(threadcache.Fid)
				if f == nil {
					data.Tids = append(data.Tids[:i], data.Tids[i+1:]...)
					continue
				}
				typeid_isexist := false
				if len(f.Field.ThreadtypesMsg) > 0 {
					for _, Type := range f.Field.ThreadtypesMsg {
						if Type.Typeid == int16(data.Param1) {
							typeid_isexist = true
							break
						}
					}
				} else {
					data.Param1 = 0
				}
				if f.Field.ThreadtypesSetting.Required && !typeid_isexist { //强制分类
					c.Out_common(protocol.Err_Typeid, "")
					return
				}
			} else {
				if f1 := models.GetForumByFid(threadcache.Fid); f1.Fid != f.Fid { //只允许操作同一个fid的帖子，如果与第一个有效帖子的fid不一样则放弃数据
					data.Tids = append(data.Tids[:i], data.Tids[i+1:]...)
					continue
				}
			}

			threadcache.Typeid = int16(data.Param1)
		} else {
			data.Tids = append(data.Tids[:i], data.Tids[i+1:]...)
		}
	}
	if len(data.Tids) == 0 {
		msg := protocol.Pool_MSG_WS2U_threadmod.Get().(*protocol.MSG_WS2U_threadmod)
		c.Output_data(msg)
		msg.Put()
		return
	}
	model.Update(map[string]interface{}{"Tid": data.Tids}, map[string]interface{}{"Typeid": data.Param1})
	for _, tid := range data.Tids {
		threadcache := models.GetForumThreadCacheByTid(tid)
		db.Updatethreadmodlog(threadcache.Fid, threadcache.Tid, 0, "TYP", data.Expiration, data.Reason, user, db.ThreadmodId分类, data.Param, data.Param1)
	}
	msg := protocol.Pool_MSG_WS2U_threadmod.Get().(*protocol.MSG_WS2U_threadmod)

	c.Output_data(msg)
	msg.Put()
}

//主题标签
func managetag(data *protocol.MSG_U2WS_threadmod, c *server.Context) {

	user := public.Getuserinfo(c)
	if user.Admin_Group == nil || !user.Admin_Group.Allowmanagetag {
		c.Out_common(protocol.Err_Groupperm, "")
		return
	}
	model := &models.Model_Forum_post{}
	model.Ctx = c
	model_tag := &models.Model_tag{}
	model_tag.Ctx = c
	for i := len(data.Tids) - 1; i >= 0; i-- {
		if threadcache := models.GetForumThreadCacheByTid(data.Tids[i]); threadcache != nil {
			post := model.GetPostInfoByPosition(threadcache.Tid, 1)
			if post == nil {
				data.Tids = append(data.Tids[:i], data.Tids[i+1:]...)
				continue
			}
			var res bool
			post.Tags, res = model_tag.Add_tag(data.Reason, threadcache.Tid, "tid")
			if !res {
				data.Tids = append(data.Tids[:i], data.Tids[i+1:]...)
				continue
			}
			model.Update(map[string]interface{}{"Tid": threadcache.Tid, "Position": 1}, map[string]interface{}{"Tags": post.Tags})
		} else {
			data.Tids = append(data.Tids[:i], data.Tids[i+1:]...)
		}
	}
	if len(data.Tids) == 0 {
		msg := protocol.Pool_MSG_WS2U_threadmod.Get().(*protocol.MSG_WS2U_threadmod)

		c.Output_data(msg)
		msg.Put()
		return
	}
	for _, tid := range data.Tids {
		threadcache := models.GetForumThreadCacheByTid(tid)
		db.Updatethreadmodlog(threadcache.Fid, threadcache.Tid, 0, "TAG", 0, data.Reason, user, db.ThreadmodId标签, data.Param, data.Param1)
	}
	msg := protocol.Pool_MSG_WS2U_threadmod.Get().(*protocol.MSG_WS2U_threadmod)

	c.Output_data(msg)
	msg.Put()
}

//删除主题
func delthread(data *protocol.MSG_U2WS_threadmod, c *server.Context) {

	user := public.Getuserinfo(c)
	if user.Admin_Group == nil || !user.Admin_Group.Allowdelpost {
		c.Out_common(protocol.Err_Groupperm, "")
		return
	}

	model := &models.Model_Forum_thread{}
	model.Ctx = c
	for i := len(data.Tids) - 1; i >= 0; i-- {
		if threadcache := models.GetForumThreadCacheByTid(data.Tids[i]); threadcache == nil {
			data.Tids = append(data.Tids[:i], data.Tids[i+1:]...)
		}
	}
	if len(data.Tids) == 0 {
		msg := protocol.Pool_MSG_WS2U_threadmod.Get().(*protocol.MSG_WS2U_threadmod)

		c.Output_data(msg)
		msg.Put()
		return
	}
	res := model.DeleteThread(map[string]interface{}{"Tid": data.Tids})
	if !res {
		c.Out_common(protocol.Err_db, "")
		return
	}

	for _, tid := range data.Tids {
		threadcache := models.GetForumThreadCacheByTid(tid)
		db.Updatethreadmodlog(threadcache.Fid, threadcache.Tid, 0, "DEL", 0, data.Reason, user, db.ThreadmodId删除, data.Param, data.Param1)
	}
	msg := protocol.Pool_MSG_WS2U_threadmod.Get().(*protocol.MSG_WS2U_threadmod)

	c.Output_data(msg)
	msg.Put()
}

//警告主题 停止开发
func warnpost(data *protocol.MSG_U2WS_threadmod, c *server.Context) {

	if data.Param != 0 && data.Param != 1 {
		c.Out_common(protocol.Err_param, "")
		return
	}
	user := public.Getuserinfo(c)
	if user.Admin_Group == nil || !user.Admin_Group.Allowwarnpost {
		c.Out_common(protocol.Err_Groupperm, "")
		return
	}

	model := &models.Model_Forum_post{}
	model.Ctx = c

	threadcache := models.GetForumThreadCacheByTid(data.Expiration)
	if threadcache != nil {
		for i := len(data.Tids) - 1; i >= 0; i-- {
			post := model.GetPostInfoByPosition(threadcache.Tid, data.Tids[i])
			if post == nil {
				data.Tids = append(data.Tids[:i], data.Tids[i+1:]...)
				continue
			}
			switch data.Param {
			case 0:
				if post.Status>>2&1 == 0 {
					data.Tids = append(data.Tids[:i], data.Tids[i+1:]...)
					continue
				}

			case 1:
				if post.Status>>2&1 == 1 {
					data.Tids = append(data.Tids[:i], data.Tids[i+1:]...)
					continue
				}
			}
			db.UpdateForum_warning(post.Tid, post.Position, post.Authorid, post.Author, data.Reason, data.Param == 1, user)
		}

	} else {
		c.Out_common(protocol.Err_NotFoundThread, "")
		return
	}
	if len(data.Tids) == 0 {
		msg := protocol.Pool_MSG_WS2U_threadmod.Get().(*protocol.MSG_WS2U_threadmod)

		c.Output_data(msg)
		msg.Put()
		return
	}
	update := map[string]interface{}{}
	if data.Param == 0 {
		update["Status"] = []string{"exp", "Status-(Status&" + strconv.Itoa(db.ThreadStatusWarn) + ")"}
	} else {
		update["Status"] = []string{"exp", "Status|" + strconv.Itoa(db.ThreadStatusWarn)}
	}
	model.Update(map[string]interface{}{"Tid": data.Expiration, "Position": data.Tids}, update)
	action := "URE"
	if data.Param == 1 {
		action = "WRN"
	}

	//db.Updatethreadmodlog(data.Tids, "TAG", 0, data.Reason, user,db.ThreadmodId标签,0)
	for _, tid := range data.Tids {
		threadcache := models.GetForumThreadCacheByTid(tid)
		db.Updatethreadmodlog(threadcache.Fid, threadcache.Tid, 0, action, 0, data.Reason, user, db.ThreadmodId屏蔽, data.Param, data.Param1)
	}
	msg := protocol.Pool_MSG_WS2U_threadmod.Get().(*protocol.MSG_WS2U_threadmod)

	c.Output_data(msg)
	msg.Put()
}

func GetPostWarnList(data *protocol.MSG_U2WS_GetPostWarnList, c *server.Context) {
	msg := protocol.Pool_MSG_WS2U_viewthreadmod.Get().(*protocol.MSG_WS2U_viewthreadmod)
	msg.Param = 0
	model := &models.Model_Forum_post{}
	model.Ctx = c
	thread := models.GetForumThreadCacheByTid(data.Tid)
	var post *db.Forum_post
	if thread != nil {
		post = model.GetPostInfoByPosition(thread.Tid, data.Position)
		if post == nil {
			c.Out_common(protocol.Err_NotFoundPost, "")
			return
		}
		if post != nil && post.Status>>2&1 == 1 {
			msg.Param = 1
		}
	} else {
		c.Out_common(protocol.Err_NotFoundThread, "")
		return
	}
	var mods []*db.Log_forum_warning
	err := model.Table("Log_forum_warning").Where("Wid in (select Wid from (select max(Wid) as Wid from " + config.Server.Tablepre + "Log_forum_warning where Authorid=" + strconv.Itoa(int(post.Authorid)) + " and Dateline > " + strconv.Itoa(int(time.Now().Unix()-86400*30)) + " GROUP BY Authorid) as a) and Status=1").Select(&mods) //取30天内警告记录
	if err != nil {
		c.Adderr(err, nil)
		c.Out_common(protocol.Err_db, "")
		msg.Put()
		return
	}
	if len(msg.List) < len(mods) {
		msg.List = make([]*protocol.MSG_threadmod, len(mods))
	} else {
		msg.List = msg.List[:len(mods)]
	}
	for k, v := range mods {
		tmp := protocol.Pool_MSG_threadmod.Get().(*protocol.MSG_threadmod)
		tmp.Moddateline = int32(v.Dateline)
		tmp.Modusername = v.Operator
		if tmp.Modusername == "" {
			tmp.Modusername = "System"
		}
		tmp.Reason = v.Reason
		msg.List[k] = tmp
	}
	c.Output_data(msg)
	msg.Put()
}

//屏蔽主题
func banpost(data *protocol.MSG_U2WS_threadmod, c *server.Context) {
	if data.Param != 0 && data.Param != 1 {
		c.Out_common(protocol.Err_param, "")
		return
	}
	user := public.Getuserinfo(c)
	if user.Admin_Group == nil || !user.Admin_Group.Allowbanpost {
		c.Out_common(protocol.Err_Groupperm, "")
		return
	}

	model := &models.Model_Forum_post{}
	model.Ctx = c

	threadcache := models.GetForumThreadCacheByTid(data.Expiration)
	if threadcache != nil {
		for i := len(data.Tids) - 1; i >= 0; i-- {
			post := model.GetPostInfoByPosition(threadcache.Tid, data.Tids[i])
			if post == nil {
				data.Tids = append(data.Tids[:i], data.Tids[i+1:]...)
				continue
			}
			switch data.Param {
			case 0:
				if post.Status>>1&1 == 0 {
					data.Tids = append(data.Tids[:i], data.Tids[i+1:]...)
					continue
				}

			case 1:
				if post.Status>>1&1 == 1 {
					data.Tids = append(data.Tids[:i], data.Tids[i+1:]...)
					continue
				}
			}
			//db.UpdateForum_warning(post.Tid, post.Position, post.Authorid, post.Author, data.Reason, data.Param == 1, user)
		}

	} else {
		c.Out_common(protocol.Err_NotFoundThread, "")
		return
	}
	if len(data.Tids) == 0 {
		msg := protocol.Pool_MSG_WS2U_threadmod.Get().(*protocol.MSG_WS2U_threadmod)

		c.Output_data(msg)
		msg.Put()
		return
	}
	update := map[string]interface{}{}
	action := "UBN"
	if data.Param == 0 {
		update["Status"] = []string{"exp", "Status-" + strconv.Itoa(1<<1)}
	} else {
		action = "BNP"
		update["Status"] = []string{"exp", "Status+" + strconv.Itoa(1<<1)}
	}
	model.Update(map[string]interface{}{"Tid": data.Expiration, "Position": data.Tids}, update)
	for _, position := range data.Tids {
		db.Updatethreadmodlog(threadcache.Fid, threadcache.Tid, position, action, 0, data.Reason, user, db.ThreadmodId屏蔽, data.Param, data.Param1)
	}
	msg := protocol.Pool_MSG_WS2U_threadmod.Get().(*protocol.MSG_WS2U_threadmod)
	c.Output_data(msg)
	msg.Put()
}

//置顶回复
func stickreply(data *protocol.MSG_U2WS_threadmod, c *server.Context) {
	if data.Param != 0 && data.Param != 1 {
		c.Out_common(protocol.Err_param, "")
		return
	}
	user := public.Getuserinfo(c)

	model := &models.Model_Forum_post{}
	model.Ctx = c

	threadcache := models.GetForumThreadCacheByTid(data.Expiration)
	if threadcache != nil {
		f := models.GetForumByFid(threadcache.Fid)
		if f == nil {
			c.Out_common(protocol.Err_forumId, "")
			return
		}
		var ismoderator bool
		if user.Adminid == 1 {
			ismoderator = true
		} else {
			for _, m := range f.Moderators {
				if user.Uid == m.Uid {
					ismoderator = true
					break
				}
			}
		}
		if (!ismoderator || user.Admin_Group == nil || !user.Admin_Group.Allowstickreply) && threadcache.Authorid != user.Uid {
			c.Out_common(protocol.Err_Groupperm, "")
			return
		}
		for i := len(data.Tids) - 1; i >= 0; i-- {
			post := model.GetPostInfoByPosition(threadcache.Tid, data.Tids[i])
			if post == nil || post.Position < 2 { //一楼不能操作
				data.Tids = append(data.Tids[:i], data.Tids[i+1:]...)
				continue
			}
			switch data.Param {
			case 0:
				if post.Stick == 0 {
					data.Tids = append(data.Tids[:i], data.Tids[i+1:]...)
					continue
				}

			case 1:
				if post.Stick == 1 {
					data.Tids = append(data.Tids[:i], data.Tids[i+1:]...)
					continue
				}
			}

		}

	} else {
		c.Out_common(protocol.Err_NotFoundThread, "")
		return
	}
	if len(data.Tids) == 0 {
		msg := protocol.Pool_MSG_WS2U_threadmod.Get().(*protocol.MSG_WS2U_threadmod)
		c.Output_data(msg)
		msg.Put()
		return
	}
	update := map[string]interface{}{"Stick": data.Param}

	model.Update(map[string]interface{}{"Tid": data.Expiration, "Position": data.Tids}, update)
	action := "UST"
	if data.Param == 1 {
		action = "STK"
	}
	for _, position := range data.Tids {
		db.Updatethreadmodlog(threadcache.Fid, threadcache.Tid, position, action, data.Expiration, data.Reason, user, db.ThreadmodId置顶回复, data.Param, data.Param1)
	}

	msg := protocol.Pool_MSG_WS2U_threadmod.Get().(*protocol.MSG_WS2U_threadmod)

	c.Output_data(msg)
	msg.Put()
}

//删除回复
func delpost(data *protocol.MSG_U2WS_threadmod, c *server.Context) {

	user := public.Getuserinfo(c)
	if user.Admin_Group == nil || !user.Admin_Group.Allowdelpost {
		c.Out_common(protocol.Err_Groupperm, "")
		return
	}
	model := &models.Model_Forum_post{}
	model.Ctx = c
	threadcache := models.GetForumThreadCacheByTid(data.Expiration)
	if threadcache != nil {

		for i := len(data.Tids) - 1; i >= 0; i-- {
			post := model.GetPostInfoByPosition(threadcache.Tid, data.Tids[i])
			if post == nil || post.Position < 2 { //一楼不能操作
				data.Tids = append(data.Tids[:i], data.Tids[i+1:]...)
				continue
			}
		}

	} else {
		c.Out_common(protocol.Err_NotFoundThread, "")
		return
	}
	if len(data.Tids) == 0 {
		msg := protocol.Pool_MSG_WS2U_threadmod.Get().(*protocol.MSG_WS2U_threadmod)

		c.Output_data(msg)
		msg.Put()
		return
	}

	res := model.Delete(map[string]interface{}{"Tid": data.Expiration, "Position": data.Tids})
	if !res {
		c.Out_common(protocol.Err_db, "")
		return
	}
	for _, position := range data.Tids {
		db.Updatethreadmodlog(threadcache.Fid, threadcache.Tid, position, "DLP", data.Expiration, data.Reason, user, db.ThreadmodId删除回复, data.Param, data.Param1)
	}

	msg := protocol.Pool_MSG_WS2U_threadmod.Get().(*protocol.MSG_WS2U_threadmod)

	c.Output_data(msg)
	msg.Put()
}
