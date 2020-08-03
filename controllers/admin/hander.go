package admin

import (
	"bbs/controllers/public"
	"bbs/libraries"
	"bbs/protocol"
	"bbs/server"
	"io/ioutil"
)

func init() {
	server.AdminHandle = func(c *server.Context) {
		cmd := protocol.READ_int32(c.In)
		switch cmd {
		case protocol.CMD_MSG_U2WS_Ping:
			msg := protocol.Pool_MSG_WS2U_Ping.Get().(*protocol.MSG_WS2U_Ping)
			msg.Result = 1
			c.Output_data(msg)
			msg.Put()
		case protocol.CMD_MSG_U2WS_Gettoken:
			public.Gettoken(c)
		case protocol.CMD_MSG_U2WS_Admin_menu_misc_custommenu:
			data := protocol.READ_MSG_U2WS_Admin_menu_misc_custommenu(c.In)
			misc_custommenu(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_Admin_AddCustommenu:
			data := protocol.READ_MSG_U2WS_Admin_AddCustommenu(c.In)
			add_custommenu(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_Admin_Edit_custommenu:
			data := protocol.READ_MSG_U2WS_Admin_Edit_custommenu(c.In)
			edit_custommenu(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_Admin_menu_setting_basic:
			data := protocol.READ_MSG_U2WS_Admin_menu_setting_basic(c.In)
			get_setting_basic(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_Admin_edit_setting_basic:
			data := protocol.READ_MSG_U2WS_Admin_edit_setting_basic(c.In)
			edit_setting_basic(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_Admin_menu_setting_access:
			data := protocol.READ_MSG_U2WS_Admin_menu_setting_access(c.In)
			get_setting_access(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_Admin_edit_setting_access:
			data := protocol.READ_MSG_U2WS_Admin_edit_setting_access(c.In)
			edit_setting_access(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_Admin_menu_setting_functions:
			data := protocol.READ_MSG_U2WS_Admin_menu_setting_functions(c.In)
			get_setting_functions(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_Admin_edit_setting_functions_mod:
			data := protocol.READ_MSG_U2WS_Admin_edit_setting_functions_mod(c.In)
			edit_setting_functions_mod(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_Admin_setting_setnav:
			data := protocol.READ_MSG_U2WS_Admin_setting_setnav(c.In)
			edit_setting_setnav(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_Admin_edit_setting_functions_heatthread:
			data := protocol.READ_MSG_U2WS_Admin_edit_setting_functions_heatthread(c.In)
			edit_setting_functions_heatthread(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_Admin_edit_setting_functions_recommend:
			data := protocol.READ_MSG_U2WS_Admin_edit_setting_functions_recommend(c.In)
			edit_setting_functions_recommend(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_Admin_edit_setting_functions_comment:
			data := protocol.READ_MSG_U2WS_Admin_edit_setting_functions_comment(c.In)
			edit_setting_functions_comment(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_Admin_edit_setting_functions_guide:
			data := protocol.READ_MSG_U2WS_Admin_edit_setting_functions_guide(c.In)
			edit_setting_functions_guide(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_Admin_edit_setting_functions_activity:
			data := protocol.READ_MSG_U2WS_Admin_edit_setting_functions_activity(c.In)
			edit_setting_functions_activity(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_Admin_edit_setting_functions_threadexp:
			data := protocol.READ_MSG_U2WS_Admin_edit_setting_functions_threadexp(c.In)
			edit_setting_functions_threadexp(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_Admin_edit_setting_functions_other:
			data := protocol.READ_MSG_U2WS_Admin_edit_setting_functions_other(c.In)
			edit_setting_functions_other(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_Admin_menu_forums_index:
			forums_index(c)
		case protocol.CMD_MSG_U2WS_Admin_edit_forums_index:
			data := protocol.READ_MSG_U2WS_Admin_edit_forums_index(c.In)
			edit_forums_index(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_Admin_delete_forum:
			data := protocol.READ_MSG_U2WS_Admin_delete_forum(c.In)
			delete_forum(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_Admin_menu_forums_edit:
			data := protocol.READ_MSG_U2WS_Admin_menu_forums_edit(c.In)
			edit_forum_menu(data, c)
			data.Put()
		case protocol.CMD_MSG_admin_forum_edit_base:
			data := protocol.READ_MSG_admin_forum_edit_base(c.In)
			edit_forum_base(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_Admin_menu_forums_moderators:
			data := protocol.READ_MSG_U2WS_Admin_menu_forums_moderators(c.In)
			forums_moderators(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_Admin_Edit_forums_moderator:
			data := protocol.READ_MSG_U2WS_Admin_Edit_forums_moderator(c.In)
			edit_forums_moderators(data, c)
			data.Put()
		case protocol.CMD_MSG_admin_forum_threadtypes:
			data := protocol.READ_MSG_admin_forum_threadtypes(c.In)
			edit_forums_threadtypes(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_settoken:
			data := protocol.READ_MSG_U2WS_settoken(c.In)
			public.Settoken(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_Admin_rebuild_leftmenu:
			rebuild_leftmenu(nil, c)
		case protocol.CMD_MSG_U2WS_tpl_load_js:
			data := protocol.READ_MSG_U2WS_tpl_load_js(c.In)
			tplloadjs(data, c)
			data.Put()
		default:
			libraries.Log("收到未定义cmd %d", cmd)
		}
	}
}
func tplloadjs(data *protocol.MSG_U2WS_tpl_load_js, c *server.Context) {
	msg := protocol.Pool_MSG_WS2U_tpl_load_js.Get().(*protocol.MSG_WS2U_tpl_load_js)
	msg.Name = data.Name
	b, err := ioutil.ReadFile("./static/admin/template/" + data.Name + ".min.js")
	if err != nil {
		c.Adderr(err, map[string]interface{}{"name": data.Name})
		msg.Result = "void(0)"
	} else {
		msg.Result = libraries.Bytes2str(b)
	}

	c.Output_data(msg)
	msg.Put()
}
