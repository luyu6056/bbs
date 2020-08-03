package web

import (
	"bbs/config"
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
	"encoding/binary"
	"math/rand"
	"strconv"
	"strings"
	"time"

	"github.com/luyu6056/cache"
)

const (
	b_62           = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
	loginUidExpire = 86400 * 30
)

/**
 * 登录
 */
func Login(data *protocol.MSG_U2WS_UserLogin, c *server.Context) {
	msg := protocol.Pool_MSG_WS2U_UserLogin.Get().(*protocol.MSG_WS2U_UserLogin)
	sence := vaptcha.SceneLogin
	if data.Type != "" {
		sence = vaptcha.SceneBind
	}
	if !vaptcha.Verify(data.Seccode, c.Conn.IP, "", sence) {
		msg.Result = protocol.Err_Seccode
		c.Output_data(msg)
		msg.Put()
		return
	}
	if data.Username == "" || data.Passwd == "" {
		msg.Result = protocol.LoginFail
		c.Output_data(msg)
		msg.Put()
		return
	}
	model_member := &models.Model_member{}
	model_member.Ctx = c
	var qquser *qq.QQUserInfo
	var err error
	switch data.Type {
	case "QQ":
		if !qqCheckState(data.State, c) {
			msg.Result = protocol.Err_QQloginFailed
			c.Output_data(msg)
			msg.Put()
			return
		}
		qquser, err = qq.GetUserInfo(data.Openid, data.Access_token)
		if err != nil || qquser.Ret != 0 {
			msg.Result = protocol.Err_QQloginFailed
			c.Output_data(msg)
			msg.Put()
			return
		}
		//检查绑定信息，为了性能member_qq未加入事务
		if member_info := model_member.GetMemberByQQOpenid(data.Openid); member_info != nil {
			msg.Result = protocol.Err_QQbind
			c.Output_data(msg)
			msg.Put()
			return
		}
	}

	var member_info *db.Common_member
	msg.Result, member_info = model_member.Login(data.Username, data.Passwd, c.Conn.Session.Load_str("login_hash"))
	c.Conn.Session.Delete("login_hash")
	if member_info != nil {
		cache.Hdel(c.Conn.Session.Load_str("token"), "session")
		c.Conn.Session = nil
		msg.Token = public.GenerateToken(c) //重新生成token，避免token诱导攻击
		c.Conn.Session.Set("Uid", member_info.Uid)
		c.Conn.Session.Expire(loginUidExpire)
	} else {
		msg.Token = nil
	}
	msg.Head = public.Get_head(c)
	c.Output_data(msg)
	msg.Put()
	if member_info != nil {
		switch data.Type {
		case "QQ":
			//添加QQ绑定信息
			model_member.AddMemberQQ(qquser, data.Openid, member_info.Uid)
		}
	}

}

/**
 *生成登录混淆hash
 *
 **/
func Login_Gethash(data *protocol.MSG_U2WS_Login_Gethash, c *server.Context) {
	model_member := &models.Model_member{}
	model_member.Ctx = c
	var password_salt string
	member_info := model_member.GetMemberInfo(map[string]interface{}{"Username": data.Name}, "Password_salt", false)
	if member_info == nil && libraries.Preg_match("/^0?(13|15|17|18|14)[0-9]{9}/", data.Name) { //根据会员名没找到时查手机号
		condition := make(map[string]interface{})
		condition["Phone"] = data.Name
		member_info = model_member.GetMemberInfo(condition, "password_salt", false)
	}
	if member_info == nil && (strings.Index(data.Name, "@") > 0) { //按邮箱和密码查询会员
		condition := make(map[string]interface{})
		condition["Email"] = data.Name
		member_info = model_member.GetMemberInfo(condition, "password_salt", false)
	}
	if member_info == nil || member_info.Password_salt == "" {
		//不是本站会员，生成一个以name为主的固定hash
		password_salt = libraries.MD5_S(data.Name + "56pJ4w9456bRELP0")
	} else {
		password_salt = member_info.Password_salt
	}
	msg := protocol.Pool_MSG_WS2U_Login_Gethash.Get().(*protocol.MSG_WS2U_Login_Gethash)
	msg.Hash = generateHash(data.Name, c)
	msg.Hash2 = password_salt
	c.Output_data(msg)
	msg.Put()
}
func Logout(c *server.Context) {
	if c.Conn != nil && c.Conn.Session != nil {
		token := c.Conn.Session.Load_str("token")
		cache.Hdel(token, "session")
	}
	public.ConnDown(c)
	c.Out_common(protocol.Success, "uid=0;location.href='/index.html?tpl=forum_index'")
}

func getlogin(c *server.Context) {
	user := public.Getuserinfo(c)

	msg := protocol.Pool_MSG_WS2U_Getlogin.Get().(*protocol.MSG_WS2U_Getlogin)
	msg.Islogin = 0
	if user.Uid != 0 {
		msg.Islogin = 1
		msg.Img = msg.Img[:0]
	} else {
		/*captchaId, Png := libraries.Generate(180, 70, c.Conn.Session.Load_str("token"))
		c.Conn.Session.Store("seccode_captchaId", captchaId, 600)
		msg.Img = Png*/
	}
	c.Output_data(msg)
	msg.Put()
}

func generateHash(name string, c *server.Context) string {
	login_hash := libraries.MD5_S(name + libraries.Millitime() + strconv.Itoa(libraries.Rand(100, 999))) //辅助验证随机hash
	session := c.Conn.Session
	session.Store("login_hash", login_hash)
	time.AfterFunc(time.Minute*10, func() {
		session.Delete("login_hash")
	})
	return login_hash
}

func email_lostPW(data *protocol.MSG_U2WS_LostPW, c *server.Context) {
	msg := protocol.Pool_MSG_WS2U_LostPW.Get().(*protocol.MSG_WS2U_LostPW)
	if !vaptcha.Verify(data.Seccode, c.Conn.IP, "", vaptcha.SceneResetpw) {
		msg.Result = protocol.Err_Seccode
		c.Output_data(msg)
		msg.Put()
		return
	}
	model_member := new(models.Model_member)
	model_member.Ctx = c
	memberinfo := model_member.GetMemberInfo(map[string]interface{}{"Username|Email": data.Name}, "Uid", false)
	if memberinfo == nil {
		msg.Result = protocol.Err_NotFoundUser
		c.Output_data(msg)
		msg.Put()
		return
	}
	user := models.GetMemberInfoByID(memberinfo.Uid)
	if user.Email == "" {
		msg.Result = protocol.Err_emailNotVerify
		c.Output_data(msg)
		msg.Put()
		return
	}
	if int32(time.Now().Unix())-user.EmailSendTime < models.Setting.Sendmailinterval*60 {
		msg.Result = protocol.Err_sendmailinterval
		c.Output_data(msg)
		msg.Put()
		return
	}
	msg.Email = user.Email
	model_email := new(models.Model_email_template)
	model_email.Ctx = c
	template := model_email.GetTemplatefromName("resetpassword")
	code := strconv.Itoa(rand.Intn(89999999) + 10000000)
	cache.Hset(strconv.Itoa(int(user.Uid)), map[string]string{"code": code}, "resetpassword", config.ResetPasswordExpire)
	if template != nil {
		body := models.SetTemplateFromStr(template.Message, map[string]string{
			"Username":   user.Username,
			"Sitename":   models.Setting.Sitename,
			"Siteurl":    models.Setting.Siteurl,
			"Adminemail": models.Setting.Adminemail,
			"code":       code,
		})
		title := models.SetTemplateFromStr(template.Title, map[string]string{
			"Sitename": models.Setting.Sitename,
		})
		msg.Result = model_email.SendOneEmail(user.Email, string(title), string(body))
		if msg.Result == protocol.Success {
			user.EmailSendTime = int32(time.Now().Unix())
			user.UpdateDB()
		}
	} else {
		msg.Result = protocol.Err_EmailSendFail
	}
	c.Output_data(msg)
	msg.Put()
}
func resetPW(data *protocol.MSG_U2WS_ResetPW, c *server.Context) {
	model_member := new(models.Model_member)
	model_member.Ctx = c
	memberinfo := model_member.GetMemberInfo(map[string]interface{}{"Username|Email": data.Name}, "Uid", false)
	if memberinfo == nil {
		c.Out_common(protocol.Err_NotFoundUser, "")
		return
	}
	user := models.GetMemberInfoByID(memberinfo.Uid)
	if user.Email == "" {
		c.Out_common(protocol.Err_emailNotVerify, "")
		return
	}
	cache, ok := cache.Has(strconv.Itoa(int(user.Uid)), "resetpassword")
	if !ok {
		c.Out_common(protocol.Err_EmailSeccode, "")
		return
	}
	code := cache.Load_str("code")
	password_salt := libraries.MD5_S(code)
	aes_c, _ := aes.NewCipher([]byte(password_salt))
	b := cipher.NewCFBDecrypter(aes_c, libraries.MD5_S_B(user.Email)[:16])
	pwd_b := make([]byte, len(data.Passwd))
	b.XORKeyStream(pwd_b, data.Passwd)
	pwd := libraries.Bytes2str(pwd_b)
	if len(pwd) < len(code)+6 || pwd[:len(code)] != code {
		c.Out_common(protocol.Err_EmailSeccode, "")
		return
	}
	user.Password_salt = password_salt
	user.Password = pwd[len(code):]
	msg := protocol.Pool_MSG_WS2U_ResetPW.Get().(*protocol.MSG_WS2U_ResetPW)
	c.Output_data(msg)
	user.UpdateDB()
	msg.Put()
}
func qqLoginUrl(c *server.Context) {
	msg := protocol.Pool_MSG_WS2U_QQLoginUrl.Get().(*protocol.MSG_WS2U_QQLoginUrl)
	msg.Url = qq.GetQQloginUrl(qqRenerateState(c))
	c.Output_data(msg)
	msg.Put()
}
func qqLogin(data *protocol.MSG_U2WS_QQLogin, c *server.Context) {
	msg := protocol.Pool_MSG_WS2U_QQLogin.Get().(*protocol.MSG_WS2U_QQLogin)
	if !qqCheckState(data.State, c) {
		msg.Result = protocol.Err_QQloginFailed
		c.Output_data(msg)
		msg.Put()
		return
	}
	model_member := new(models.Model_member)
	model_member.Ctx = c
	user := model_member.GetMemberByQQOpenid(data.Openid)

	if user != nil {
		public.Gettoken(c) //重新生成token，避免token诱导攻击
		c.Conn.Session.Set("Uid", user.Uid)
		c.Conn.Session.Expire(loginUidExpire)
	}
	msg.Result = protocol.Success
	msg.Head = public.Get_head(c)
	msg.Openid = data.Openid
	c.Output_data(msg)
	msg.Put()
}
func qqRenerateState(c *server.Context) string {
	token := c.Conn.Session.Load_str("token")
	hmac := make([]byte, 8)
	cache.Hset(token, map[string]string{"hmac": string(hmac)}, "qqlogin", 10*60)
	binary.LittleEndian.PutUint64(hmac, rand.Uint64())
	return libraries.MD5_S(token + string(hmac))
}
func qqCheckState(state string, c *server.Context) bool {
	token := c.Conn.Session.Load_str("token")
	cache, ok := cache.Has(token, "qqlogin")
	return !ok || state != libraries.MD5_S(token+cache.Load_str("hmac"))
}
