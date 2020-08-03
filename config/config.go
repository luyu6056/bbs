package config

import (
	"bbs/libraries"
	"io/ioutil"
)

const (
	Controller_limit = 50
)

var Server struct {
	Listen               string
	MasterDB             string
	SlaveDB              string
	DBMaxConn            int32
	DBMaxIdle            int32
	DBMaxLife            int64
	Host                 string //本机ip地址
	Tablepre             string
	Debug                bool
	Webp                 bool
	Origin               string
	OSSUrl               string //上传文件之后的浏览网址，建议使用cdn
	OssEndpoint          string
	OssAccessKeyId       string
	OssAccessKeySecret   string
	OssBucketName        string
	CDN_URL              string //阿里云的cdn，不填会影响cdn刷新
	TLScert              string
	TLSkey               string
	TLSca                string
	RpcAddr              string
	RpcKey               string
	GroupId              int8
	IsHttps              bool
	Mysql_ssl_ca         string
	Mysql_ssl_cert       string
	Mysql_ssl_key        string
	Mysql_ssl_ServerName string
	VaptchaVid           string
	VaptchaKey           string
	QQappid              string
	QQappkey             string
	QQredirect_uri       string
}

func init() {
	data, err := ioutil.ReadFile("./config/config.json")
	if err != nil {
		libraries.DEBUG(err)
		//panic("初始化失败")
		return
	}
	err = libraries.JsonUnmarshal(data, &Server)
	if err != nil {
		libraries.DEBUG(err)
		panic("初始化失败")
	}
	if Server.DBMaxConn < 1 {
		Server.DBMaxConn = 5
	}
	if Server.DBMaxIdle < 1 {
		Server.DBMaxIdle = 2
	}
	if Server.DBMaxLife < 60 {
		Server.DBMaxLife = 60
	}
	if len(Server.Listen) > 3 && Server.Listen[len(Server.Listen)-4:] == ":443" {
		Server.IsHttps = true
	}
}

const (
	ResetPasswordExpire = 3 * 60
	ThreadIconNull      = -1
	ThreadStampNull     = -1
	//显示排序相关
	ThreadDisplayDraft   = -4 //草稿
	ThreadDisplayInCheck = -2 //审核
	ThreadDisplayCommon  = 0  //默认
	ThreadDisplayStick1  = 1  //板块置顶
	ThreadDisplayStick2  = 2  //大区置顶
	ThreadDisplayStick3  = 3  //全局置顶
	//发帖操作相关
	ThreadOperateTypeNew   = 0 //新帖子
	ThreadOperateTypeEdit  = 1
	ThreadOperateTypeReply = 2
)
const (
	//帖子类型相关
	ThreadSpecialCommon   = iota
	ThreadSpecialPoll     //投票主题
	ThreadSpecialTrade    //商品主题
	ThreadSpecialReward   //悬赏主题
	ThreadSpecialActivity //活动主题
	ThreadSpecialDebate   //辩论主题
	//
	ThreadStatusOrderDesc     = 4
	ThreadStatusHiddenreplies = 2

	ThreadAttachmentTypeNull = 0
	ThreadAttachmentTypeImg  = 2
)
