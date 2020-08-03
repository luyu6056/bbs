package web

import (
	"bbs/controllers/public"
	"bbs/libraries"
	"bbs/protocol"
	"bbs/server"
	"fmt"
	"io/ioutil"
	"runtime/debug"
)

func init() {

	server.Route("upload", func(c *server.Context) {
		defer func() {
			if err := recover(); err != nil {
				fmt.Println(err)
				debug.PrintStack()
			}
			c.Save_errlog()
			c.Recovery()
		}()
		cmd := protocol.READ_int32(c.In)
		switch cmd {
		case protocol.CMD_MSG_U2WS_upload_image:
			data := protocol.READ_MSG_U2WS_upload_image(c.In)
			upload_image(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_upload_avatar:
			data := protocol.READ_MSG_U2WS_upload_avatar(c.In)
			upload_avatar(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_upload_tmp_image:
			data := protocol.READ_MSG_U2WS_upload_tmp_image(c.In)
			upload_tmp_image(data, c)
			data.Put()
		default:
			libraries.Log("upload收到未定义cmd %d", cmd)
		}
	})

	server.WebHandle = func(c *server.Context) {
		defer func() {
			if err := recover(); err != nil {
				fmt.Println(err)
				debug.PrintStack()
			}
			c.Save_errlog()
			c.Recovery()
		}()
		cmd := protocol.READ_int32(c.In)
		switch cmd {
		case protocol.CMD_MSG_U2WS_Ping:
			msg := protocol.Pool_MSG_WS2U_Ping.Get().(*protocol.MSG_WS2U_Ping)
			msg.Result = 1
			c.Output_data(msg)
			msg.Put()
		case protocol.CMD_MSG_U2WS_tpl_success:
			msg := protocol.Pool_MSG_WS2U_tpl_success.Get().(*protocol.MSG_WS2U_tpl_success)
			c.Output_data(msg)
			msg.Put()
		case protocol.CMD_MSG_U2WS_Gettoken:
			public.Gettoken(c)
		case protocol.CMD_MSG_U2WS_Login_Gethash:
			data := protocol.READ_MSG_U2WS_Login_Gethash(c.In)
			Login_Gethash(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_UserLogin:
			data := protocol.READ_MSG_U2WS_UserLogin(c.In)
			Login(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_forum_index:
			data := protocol.READ_MSG_U2WS_forum_index(c.In)
			forum_index(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_Getseccode:
			Generate_seccode(c)
		case protocol.CMD_MSG_U2WS_logout:
			Logout(c)
		case protocol.CMD_MSG_U2WS_diy_save:
			data := protocol.READ_MSG_U2WS_diy_save(c.In)
			diy_save(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_Checkseccode:
			data := protocol.READ_MSG_U2WS_Checkseccode(c.In)
			check_seccode(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_CheckRegister:
			data := protocol.READ_MSG_U2WS_CheckRegister(c.In)
			check_register(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_Register:
			data := protocol.READ_MSG_U2WS_Register(c.In)
			register(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_forum:
			data := protocol.READ_MSG_U2WS_forum(c.In)
			forum(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_forum_newthread:
			data := protocol.READ_MSG_U2WS_forum_newthread(c.In)
			forum_newthread(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_Getlogin:
			getlogin(c)
		case protocol.CMD_MSG_U2WS_Forum_newthread_submit:
			data := protocol.READ_MSG_U2WS_Forum_newthread_submit(c.In)
			forum_newthread_submit(data, c, false)
			data.Put()
		case protocol.CMD_MSG_U2WS_forum_viewthread:
			data := protocol.READ_MSG_U2WS_forum_viewthread(c.In)
			forum_viewthread(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_threadfastpost:
			data := protocol.READ_MSG_U2WS_threadfastpost(c.In)
			forum_threadfastpost(data, c, false)
			data.Put()
		case protocol.CMD_MSG_U2WS_nextset:
			data := protocol.READ_MSG_U2WS_nextset(c.In)
			forum_threadnextset(data, c)
			data.Put()

		case protocol.CMD_MSG_U2WS_delete_attach:
			data := protocol.READ_MSG_U2WS_delete_attach(c.In)
			delete_image(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_threadmod:
			data := protocol.READ_MSG_U2WS_threadmod(c.In)
			threadmod(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_viewthreadmod:
			data := protocol.READ_MSG_U2WS_viewthreadmod(c.In)
			viewthreadmod(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_forum_refresh:
			data := protocol.READ_MSG_U2WS_forum_refresh(c.In)
			forum_refresh(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_forum_carlist:
			data := protocol.READ_MSG_U2WS_forum_carlist(c.In)
			forum_carlist(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_GetPostWarnList:
			data := protocol.READ_MSG_U2WS_GetPostWarnList(c.In)
			GetPostWarnList(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_space:
			data := protocol.READ_MSG_U2WS_space(c.In)
			home_space(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_settoken:
			data := protocol.READ_MSG_U2WS_settoken(c.In)
			public.Settoken(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_GetRegister:
			data := protocol.READ_MSG_U2WS_GetRegister(c.In)
			getreg(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_GetHead:
			msg := public.Get_head(c)
			c.Output_data(msg)
			msg.Put()
		case protocol.CMD_MSG_U2WS_SpaceThread:
			data := protocol.READ_MSG_U2WS_SpaceThread(c.In)
			spaceThread(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_searchThread:
			data := protocol.READ_MSG_U2WS_searchThread(c.In)
			searchThread(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_spacecp:
			data := protocol.READ_MSG_U2WS_spacecp(c.In)
			getSpacecpinfo(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_Edit_Profile:
			data := protocol.READ_MSG_U2WS_Edit_Profile(c.In)
			edit_Profile(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_RecommendThread:
			data := protocol.READ_MSG_U2WS_RecommendThread(c.In)
			recommendThread(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_SpacecpGroup:
			data := protocol.READ_MSG_U2WS_SpacecpGroup(c.In)
			spacecpGroup(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_SpacecpForum:
			data := protocol.READ_MSG_U2WS_SpacecpForum(c.In)
			spacecpForum(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_ChangePasswd_Gethash:
			data := protocol.READ_MSG_U2WS_ChangePasswd_Gethash(c.In)
			passwdGethash(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_ChangePasswd:
			data := protocol.READ_MSG_U2WS_ChangePasswd(c.In)
			changePasswd(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_Email_Verify:
			data := protocol.READ_MSG_U2WS_Email_Verify(c.In)
			email_Verify(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_LostPW:
			data := protocol.READ_MSG_U2WS_LostPW(c.In)
			email_lostPW(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_ResetPW:
			data := protocol.READ_MSG_U2WS_ResetPW(c.In)
			resetPW(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_QQLogin:
			data := protocol.READ_MSG_U2WS_QQLogin(c.In)
			qqLogin(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_QQLoginUrl:
			qqLoginUrl(c)
		case protocol.CMD_MSG_U2WS_BindAccount:
			data := protocol.READ_MSG_U2WS_BindAccount(c.In)
			bindAccount(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_GetThreadBind:
			getThreadBind(c)
		case protocol.CMD_MSG_U2WS_GetChangeBindUrl:
			data := protocol.READ_MSG_U2WS_GetChangeBindUrl(c.In)
			getChangeBindUrl(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_ChangeBind:
			data := protocol.READ_MSG_U2WS_ChangeBind(c.In)
			changeBind(data, c)
			data.Put()
		case protocol.CMD_MSG_Conn_Down:
			public.ConnDown(c)
		case protocol.CMD_MSG_U2WS_PollThread:
			data := protocol.READ_MSG_U2WS_PollThread(c.In)
			pollThread(data, c)
			data.Put()
		case protocol.CMD_MSG_U2WS_tpl_load_js:
			data := protocol.READ_MSG_U2WS_tpl_load_js(c.In)
			tplloadjs(data, c)
			data.Put()
		default:
			libraries.Log("收到未定义cmd %d", cmd)
		}
	}
	server.Route("test", server.WebHandle)
}
func tplloadjs(data *protocol.MSG_U2WS_tpl_load_js, c *server.Context) {
	msg := protocol.Pool_MSG_WS2U_tpl_load_js.Get().(*protocol.MSG_WS2U_tpl_load_js)
	msg.Name = data.Name
	b, err := ioutil.ReadFile("./static/template/" + data.Name + ".min.js")
	if err != nil {
		c.Adderr(err, map[string]interface{}{"name": data.Name})
		msg.Result = "void(0)"
	} else {
		msg.Result = libraries.Bytes2str(b)
	}

	c.Output_data(msg)
	msg.Put()
}
