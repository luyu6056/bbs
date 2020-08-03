package vaptcha

import (
	"bbs/config"
	"bbs/libraries"
	"bbs/server"
	"crypto/md5"
	"encoding/binary"
	"encoding/hex"
	"fmt"
	"io/ioutil"
	"math/rand"
	"net/http"
	"net/url"
	"runtime/debug"
	"strconv"
	"strings"
	"sync/atomic"
	"time"

	"github.com/luyu6056/cache"
	"github.com/luyu6056/gnet"
)

const (
	vaptchaofflineurl = "http://channel.vaptcha.com/config/"
	randlen           = 2 //生成4位16进制数的字符串
	offlineVerifyurl  = "http://offline.vaptcha.com/"
	verifyurl         = "http://0.vaptcha.com/verify"
	SceneLogin        = 1
	SceneReg          = 2
	SceneResetpw      = 3
	ScenePost         = 4
	SceneChangepw     = 5
	SceneBind         = 6
	timeout           = 600 //秒，宽松验证，允许一个token在一个ip内有效
)

type OfflineStatus struct {
	Api           string `json:"api"`
	Offline_state int    `json:"offline_state"`
	Offline_key   string `json:"offline_key"`
	State         int    `json:"state"`
}
type OfflineVerifyResult struct {
	Result bool `json:"result"`
}

//主页https://www.vaptcha.com
var knockId int32

func Hander(hs *server.Httpserver, c gnet.Conn) {
	defer func() {
		if err := recover(); err != nil {
			fmt.Println(err)
			debug.PrintStack()
		}

	}()
	m, _ := url.ParseQuery(hs.Request.Query)
	if len(m["offline_action"]) == 0 || len(m["callback"]) == 0 {
		return
	}
	switch m["offline_action"][0] {
	case "get":
		url := vaptchaofflineurl + config.Server.VaptchaVid
		//url := "http://channel.vaptcha.com/config/offline" //测试用
		result, err := libraries.Http_get(url, nil)
		if result != "" && err == nil {
			var vaptchstatus OfflineStatus
			result = strings.TrimLeft(result, "static(")
			result = strings.TrimRight(result, ")")
			libraries.JsonUnmarshal([]byte(result), &vaptchstatus)
			if vaptchstatus.Offline_state == 0 {
				// vaptcha并未离线，返回失败
				// 调试时需跳过此判断
				break
			}
			randomByte := [randlen]byte{}
			for k := range randomByte {
				randomByte[k] = byte(rand.Int())
			}
			randomStr := hex.EncodeToString(randomByte[:])
			imgmd5 := md5.Sum([]byte(vaptchstatus.Offline_key + randomStr))
			imgid := hex.EncodeToString(imgmd5[:])

			var knock string
			if len(m["knock"]) == 1 {
				knock = m["knock"][0]
			} else {
				atomic.AddInt32(&knockId, 1)
				knock = config.Server.Host + strconv.Itoa(int(knockId))
			}
			cache.Hset(knock, map[string]string{"imgid": imgid, "offline_key": vaptchstatus.Offline_key}, "vaptcha", timeout)

			hs.Out.WriteString(m["callback"][0])
			hs.Out.WriteString("({code:'0103',imgid:'")
			hs.Out.WriteString(imgid)
			hs.Out.WriteString("',knock:'")
			hs.Out.WriteString(knock)
			hs.Out.WriteString("'})")

			return
		} else {
			libraries.DEBUG("vaptcha离线请求失败，url:"+url+",内容"+result, err)
		}

	case "verify":
		if len(m["knock"]) == 0 || len(m["v"]) == 0 {
			break
		}
		knock := m["knock"][0]
		v := m["v"][0]

		hset := cache.Hget(knock, "vaptcha")
		var imgid string
		if ok := hset.Get("imgid", &imgid); !ok {
			break
		}
		var offline_key string
		if ok := hset.Get("offline_key", &offline_key); !ok {
			break
		}
		validatekey := md5.Sum([]byte(v + imgid))
		url := offlineVerifyurl + offline_key + "/" + hex.EncodeToString(validatekey[:])
		result, err := libraries.Http_get(url, nil)
		if result != "" && err == nil {
			var r OfflineVerifyResult
			libraries.JsonUnmarshal([]byte(result), &r)
			if r.Result {
				cache.Hdel(knock, "vaptcha")
				token := "offline" + libraries.MD5_S(strconv.Itoa(int(time.Now().UnixNano()/1e3)*1000+rand.Intn(999))+knock) //生成一个随机token
				cache.Hset(hs.Ip(c)+token+m["ext"][0], map[string]string{"token": "true"}, "vaptcha", timeout)

				hs.Out.WriteString(m["callback"][0])
				hs.Out.WriteString("({code:'0103',token:'")
				hs.Out.WriteString(token)
				hs.Out.WriteString("'})")

				return
			}
		} else {
			libraries.DEBUG("vaptcha离线验证失败，url:"+url+",内容"+result, err)
		}
	}

	hs.Out.WriteString(m["callback"][0])
	hs.Out.WriteString("({code:'0104'})")

}

type VerifyResult struct {
	Success int8   `json:"success"` //验证结果，1为通过，0为失败
	Score   int8   `json:"score"`   //可信度，区间[0, 100]
	Msg     string `json:"msg"`     //错误信息
}

/**
 *验证码验证
 *ext为空则为一次性验证码
 **/
var TestToken string

func Verify(token, ip, ext string, Scene int) bool {
	if len(token) < 7 {
		return false
	}
	if token == TestToken {
		return true
	}
	if ip == "127.0.0.1" {
		ip = "113.90.36.15"
	}
	if cache, ok := cache.Has(ip+token+ext, "vaptcha"); ok {
		return cache.Load_str("token") == "true"
	}

	res, err := http.PostForm(verifyurl, url.Values{"id": {config.Server.VaptchaVid}, "secretkey": {config.Server.VaptchaKey},
		"scene": {strconv.Itoa(int(Scene))}, "ip": {ip}, "token": {token}})
	if err != nil {
		libraries.DEBUG("vaptcha在线验证失败,错误 ", err)
		return false
	}
	result, err := ioutil.ReadAll(res.Body)
	defer res.Body.Close()
	if len(result) > 0 && err == nil {
		var r VerifyResult
		err := libraries.JsonUnmarshal(result, &r)
		if r.Success == 1 {
			if ext != "" {
				cache.Hset(ip+token+ext, map[string]string{"token": "true"}, "vaptcha", timeout)
			}

			return true
		} else if r.Msg != "" || err != nil {
			libraries.DEBUG("vaptcha在线验证失败,错误 "+r.Msg, err)
		}
	} else {
		libraries.DEBUG("vaptcha在线验证失败，内容"+string(result), err, map[string]string{
			"id":        config.Server.VaptchaVid,
			"secretkey": config.Server.VaptchaKey,
			"scene":     strconv.Itoa(int(Scene)),
			"token":     token,
			"ip":        ip,
		})
	}
	return false
}
func init() {
	r := rand.NewSource(time.Now().Unix())
	b := make([]byte, 32)
	binary.LittleEndian.PutUint64(b, uint64(r.Int63()))
	binary.LittleEndian.PutUint64(b[8:], uint64(r.Int63()))
	binary.LittleEndian.PutUint64(b[16:], uint64(r.Int63()))
	binary.LittleEndian.PutUint64(b[24:], uint64(r.Int63()))
	TestToken = string(b)
}
