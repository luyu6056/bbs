package admin

import (
	"bbs/controllers/public"
	"bbs/db"
	"bbs/server"

	//"bbs/libraries"
	"bbs/models"
	"bbs/protocol"
	"strconv"
	"time"
)

func misc_custommenu(data *protocol.MSG_U2WS_Admin_menu_misc_custommenu, c *server.Context) {
	user := public.Getuserinfo(c)
	if user.Adminid != 1 {
		return
	}
	model := &models.Model{Ctx: c}
	var res []*db.Common_admincp_cmenu
	err := model.Table("Common_admincp_cmenu").Where(map[string]interface{}{"Uid": user.Uid}).Select(&res)
	if err != nil {
		c.Adderr(err, nil)
	}

	msg := protocol.Pool_MSG_WS2U_Admin_menu_misc_custommenu.Get().(*protocol.MSG_WS2U_Admin_menu_misc_custommenu)

	msg.Menus = make([]*protocol.MSG_WS2U_custommenu, len(res))
	for k, v := range res {
		msg.Menus[k] = protocol.Pool_MSG_WS2U_custommenu.Get().(*protocol.MSG_WS2U_custommenu)
		msg.Menus[k].Displayorder = v.Displayorder
		msg.Menus[k].Title = v.Title
		msg.Menus[k].Url = v.Url
		msg.Menus[k].Id = v.Id
		msg.Menus[k].Param = v.Param
	}

	c.Output_data(msg)
	msg.Put()
}
func rebuild_leftmenu(data *protocol.MSG_U2WS_Admin_rebuild_leftmenu, c *server.Context) {
	user := public.Getuserinfo(c)
	if user.Adminid != 1 {
		return
	}
	model := &models.Model{Ctx: c}
	var res []*db.Common_admincp_cmenu
	err := model.Table("Common_admincp_cmenu").Where(map[string]interface{}{"Uid": user.Uid}).Select(&res)
	c.Adderr(err, nil)
	msg := protocol.Pool_MSG_WS2U_Admin_rebuild_leftmenu.Get().(*protocol.MSG_WS2U_Admin_rebuild_leftmenu)

	msg.Menus = make([]*protocol.MSG_WS2U_custommenu, len(res))
	for k, v := range res {
		msg.Menus[k] = protocol.Pool_MSG_WS2U_custommenu.Get().(*protocol.MSG_WS2U_custommenu)
		msg.Menus[k].Displayorder = v.Displayorder
		msg.Menus[k].Title = v.Title
		msg.Menus[k].Url = v.Url
		msg.Menus[k].Id = v.Id
		msg.Menus[k].Param = v.Param
	}

	c.Output_data(msg)
	msg.Put()
}
func add_custommenu(data *protocol.MSG_U2WS_Admin_AddCustommenu, c *server.Context) {
	user := public.Getuserinfo(c)
	if user.Adminid != 1 {
		return
	}
	model := &models.Model{Ctx: c}
	insert := &db.Common_admincp_cmenu{
		Title:    data.Title,
		Url:      data.Url,
		Uid:      user.Uid,
		Dateline: time.Now().Unix(),
		Param:    data.Param,
	}
	id, err := model.Table("Common_admincp_cmenu").Insert(insert)
	if err != nil {
		c.Adderr(err, nil)
		c.Out_common(protocol.Err_db, "")
		return
	}
	if id > 0 {
		c.Out_common(protocol.Success, "")
		return
	}
	c.Out_common(protocol.Fail, "")
}
func edit_custommenu(data *protocol.MSG_U2WS_Admin_Edit_custommenu, c *server.Context) {
	user := public.Getuserinfo(c)
	if user.Adminid != 1 {
		return
	}
	model := &models.Model{Ctx: c}
	model.BeginTransaction()
	defer model.EndTransaction()
	for _, v := range data.Edit {
		_, err := model.Table("Common_admincp_cmenu").Where("Id =" + strconv.Itoa(int(v.Id))).Update(map[string]interface{}{"Title": v.Title, "Displayorder": v.Displayorder, "Param": v.Param})
		if err != nil {
			c.Adderr(err, v)
			model.Rollback()
			c.Out_common(protocol.Err_db, "")
			return
		}
	}
	if len(data.Deletes) > 0 {
		result, err := model.Table("Common_admincp_cmenu").Where(map[string]interface{}{"Id": []interface{}{"in", data.Deletes}}).Delete()
		if !result || err != nil {
			c.Adderr(err, data.Deletes)
			model.Rollback()
			c.Out_common(protocol.Err_db, "")
			return
		}

	}

	err := model.Commit()
	if err != nil {
		c.Adderr(err, nil)
		c.Out_common(protocol.Err_db, "")
		return
	}
	c.Out_common(protocol.Success, "")
}
