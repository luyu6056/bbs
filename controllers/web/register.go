package web

import (
	"bbs/controllers/public"
	"bbs/db"
	"bbs/libraries"
	"bbs/qq"
	"bbs/server"
	"net/url"
	"strconv"

	//"bbs/libraries"
	"bbs/models"
	"bbs/protocol"
)

func check_register(data *protocol.MSG_U2WS_CheckRegister, c *server.Context) {
	msg := protocol.Pool_MSG_WS2U_CheckRegister.Get().(*protocol.MSG_WS2U_CheckRegister)
	if !models.CheckShieldingWord(data.Name) {
		msg.Result = protocol.Err_ShieldingWord
		c.Output_data(msg)
		msg.Put()
		return
	}
	model_member := &models.Model_member{}
	model_member.Ctx = c
	var member *db.Common_member
	switch data.Type {
	case 1:
		member = model_member.GetMemberInfo(map[string]interface{}{"Username": data.Name}, "Uid", false)
	case 2:
		member = model_member.GetMemberInfo(map[string]interface{}{"Email": data.Name}, "Uid", false)
	}
	if member != nil && member.Uid > 0 {
		msg.Result = protocol.Fail

	} else {
		msg.Result = protocol.Success
	}
	c.Output_data(msg)
	msg.Put()
	return
}
func register(data *protocol.MSG_U2WS_Register, c *server.Context) {

	model_member := &models.Model_member{}
	model_member.Ctx = c
	var qquser *qq.QQUserInfo
	var err error
	switch data.Type {
	case "QQ":
		if !qqCheckState(data.State, c) {
			c.Out_common(protocol.Err_QQloginFailed, "")
			return
		}
		qquser, err = qq.GetUserInfo(data.Openid, data.Access_token)
		if err != nil || qquser.Ret != 0 {
			c.Out_common(protocol.Err_QQloginFailed, "")
			return
		}
		//检查绑定信息，为了性能member_qq未加入事务
		if member_info := model_member.GetMemberByQQOpenid(data.Openid); member_info != nil {
			c.Out_common(protocol.Err_QQbind, "")
			return
		}
	}

	member_info, errcode := model_member.AddMember(data)
	if errcode != protocol.Success {
		c.Out_common(errcode, "")
		return
	}
	c.Conn.Session.Set("Uid", member_info.Uid)
	msg := protocol.Pool_MSG_WSU2_Register.Get().(*protocol.MSG_WSU2_Register)
	msg.Head = public.Get_head(c)
	c.Output_data(msg)
	msg.Put()
	model_email := new(models.Model_email_template)
	model_email.Ctx = c
	template := model_email.GetTemplatefromName("register")
	if template != nil {
		u := url.Values{}
		u.Set("Emailstatus", member_info.Emailstatus)
		u.Set("Uid", strconv.Itoa(int(member_info.Uid)))
		body := models.SetTemplateFromStr(template.Message, map[string]string{
			"Username":    member_info.Username,
			"Sitename":    models.Setting.Sitename,
			"Siteurl":     models.Setting.Siteurl,
			"Adminemail":  models.Setting.Adminemail,
			"verify_link": models.Setting.Siteurl + "/index.html?" + u.Encode(),
		})
		title := models.SetTemplateFromStr(template.Title, map[string]string{
			"Sitename": models.Setting.Sitename,
		})
		model_email.SendOneEmail(member_info.EmailNew, string(title), string(body))
	}
	switch data.Type {
	case "QQ":
		//添加QQ绑定信息
		model_member.AddMemberQQ(qquser, data.Openid, member_info.Uid)
	}
}
func getreg(data *protocol.MSG_U2WS_GetRegister, c *server.Context) {
	msg := protocol.Pool_MSG_WS2U_GetRegister.Get().(*protocol.MSG_WS2U_GetRegister)
	c.Output_data(msg)
	msg.Put()
}
func email_Verify(data *protocol.MSG_U2WS_Email_Verify, c *server.Context) {
	user := models.GetMemberInfoByID(data.Uid)
	msg := protocol.Pool_MSG_WS2U_Email_Verify.Get().(*protocol.MSG_WS2U_Email_Verify)
	if user == nil {
		msg.Result = protocol.Err_NotFoundUser
		c.Output_data(msg)
		msg.Put()
		return
	}
	if user.Emailstatus != data.Code {
		msg.Result = protocol.Err_emailVerify
		c.Output_data(msg)
		msg.Put()
		return
	}
	c.Conn.Session.Set("Uid", user.Uid)
	c.Conn.Session.Expire(86400 * 30)
	msg.Result = protocol.Success
	c.Output_data(msg)
	msg.Put()
	user.Emailstatus = "1"
	user.Email = user.EmailNew
	user.EmailNew = ""
	user.UpdateDB()

}

func bindAccount(data *protocol.MSG_U2WS_BindAccount, c *server.Context) {
	msg := protocol.Pool_MSG_WS2U_BindAccount.Get().(*protocol.MSG_WS2U_BindAccount)
	switch data.Type {
	case "QQ":
		model_member := &models.Model_member{}
		model_member.Ctx = c
		if member_info := model_member.GetMemberByQQOpenid(data.Openid); member_info != nil {
			msg.Result = protocol.Err_QQbind
			break
		}
		if !qqCheckState(data.State, c) {
			msg.Result = protocol.Err_QQloginFailed
			break
		}
		qquser, err := qq.GetUserInfo(data.Openid, data.Access_token)
		if err != nil {
			c.Adderr(err, nil)
			msg.Result = protocol.Err_QQloginFailed
			break
		}
		if qquser == nil || qquser.Ret != 0 {
			libraries.Log("%+v", qquser)
			msg.Result = protocol.Err_QQloginFailed
			break
		}
		msg.Nickname = qquser.Nickname
		msg.Img = qquser.Figureurl_qq_1
		msg.Result = protocol.Success
	default:
		msg.Result = protocol.Err_param

	}
	c.Output_data(msg)
	msg.Put()
}
