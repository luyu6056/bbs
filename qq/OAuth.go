package qq

import (
	"bbs/config"
	"bbs/libraries"
	"net/url"
)

const (
	qqOauthUrl = "https://graph.qq.com/oauth2.0/"

	qqApiUrl = "https://graph.qq.com/user/"
)

func GetQQloginUrl(state string) string {

	buf := <-libraries.MsgBuf_chan
	defer func() {
		libraries.MsgBuf_chan <- buf
	}()
	buf.Reset()
	buf.WriteString(qqOauthUrl)
	buf.WriteString("authorize?response_type=token&client_id=")
	buf.WriteString(config.Server.QQappid)
	buf.WriteString("&redirect_uri=")
	buf.WriteString(url.QueryEscape(config.Server.QQredirect_uri))
	buf.WriteString("&state=")
	buf.WriteString(state)
	return buf.String()
}
func GetAccessToken(code string) string {
	buf := <-libraries.MsgBuf_chan
	defer func() {
		libraries.MsgBuf_chan <- buf
	}()
	buf.Reset()
	buf.WriteString(qqOauthUrl)
	buf.WriteString("token?grant_type=authorization_code&client_id=")
	buf.WriteString(config.Server.QQappid)
	buf.WriteString("&client_secret=")
	buf.WriteString(config.Server.QQappkey)
	buf.WriteString("&code=")
	buf.WriteString(url.QueryEscape(code))
	buf.WriteString("&redirect_uri=")
	buf.WriteString(url.QueryEscape(config.Server.QQredirect_uri))
	res, err := libraries.Http_get(buf.String())
	libraries.DEBUG(res, err)
	return ""
}

type QQUserInfo struct {
	Ret            int    `json:"ret"`
	Msg            string `json:"msg"`
	Nickname       string `json:"nickname"`
	Figureurl_qq_1 string `json:"figureurl_qq_1"`
}

func GetUserInfo(openid string, access_token string) (user *QQUserInfo, err error) {
	buf := <-libraries.MsgBuf_chan
	defer func() {
		libraries.MsgBuf_chan <- buf
	}()
	buf.Reset()
	buf.WriteString(qqApiUrl)
	buf.WriteString("get_user_info?access_token=")
	buf.WriteString(access_token)
	buf.WriteString("&oauth_consumer_key=")
	buf.WriteString(config.Server.QQappid)
	buf.WriteString("&openid=")
	buf.WriteString(openid)
	res, err := libraries.Http_get(buf.String())
	if err != nil {
		return
	}
	err = libraries.JsonUnmarshal([]byte(res), &user)
	return
}
