package web

import (
	"bbs/config"
	"bbs/db"
	"bbs/libraries"
	"bbs/models"
	"bbs/protocol"
	"bbs/server"
	"bytes"
	"encoding/hex"
	"fmt"
	"io"
	"io/ioutil"
	"net"
	_ "net/http/pprof"
	"os"
	"strconv"
	"strings"
	"time"
	"unsafe"

	"github.com/dlclark/regexp2"
	"github.com/klauspost/compress/gzip"
	"github.com/luyu6056/cache"
	"github.com/luyu6056/tls"
)

const (
	maxCiphertext = 16384 + 2048
)

type ServerConn struct {
	conn                          net.Conn
	tlsconn                       *tls.Conn
	inboundBuffer, outboundBuffer *tls.MsgBuffer
	buf                           []byte
	ip                            string
	c                             *server.Context
	g_buf                         *tls.MsgBuffer
}
type Request struct {
	Proto, Method string
	Path, Query   string
	RemoteAddr    string
	Connection    string
	Header        map[string]string
}

func Spider_GetThreadsFromFid(fid int) {

	svr := newconn("122.226.111.105")
	model := new(models.Model)
	var insert []*db.Tmp
	for i := 1; i < 1000; i++ {
	retry:
		//b, _ := ioutil.ReadFile("./tmp")
		forum, err := svr.gethtml("https://game.ali213.net/forum-" + strconv.Itoa(fid) + "-" + strconv.Itoa(i) + ".html")
		if err == io.EOF {
			fmt.Println("重连")
			time.Sleep(time.Second * 5)
			svr = newconn("122.226.111.105")
			goto retry
		}

		//forum := string(b)
		m, err := Preg_match_result(`<em>\[<a href="[^"]+">(<b>)?(<(font|FONT)[^>]+>)?([^<]+)\S+</a>]</em> <a href="//game.ali213.net/thread-(\d+)-1-\d+.html"( style="(font-weight: bold)?;?(color: #[A-F0-9]+)?")? onclick="atarget\(this\)" class="xst" >([^<]+)</a>`, forum, -1)
		insert = insert[:0]
		if len(m) == 0 {
			if libraries.Preg_match("404 Not Found", forum) {
				fmt.Println("重试")
				time.Sleep(time.Second * 2)
				goto retry
			} else {
				f, _ := os.OpenFile("./tmp", os.O_CREATE|os.O_RDWR, 0666)
				f.WriteString(forum)
				f.Close()
				panic("获取不到")
			}

		} else {
			fmt.Println("页", i, len(m))
		}

		for _, v := range m {

			id, _ := strconv.Atoi(v[5])
			insert = append(insert, &db.Tmp{
				Tid:   int32(id),
				Font:  v[7],
				Color: v[8],
				Title: v[9],
			})
			model.Table("Tmp").Replace(insert)
		}
		//time.Sleep(time.Second)
	}
}
func Spider_highlightthread() {
	coloroptions := map[string]int8{"color: #EE1B2E": 10, "color: #EE5023": 20, "color: #996600": 30, "color: #3C9D40": 40, "color: #2897C5": 50, "color: #2B65B7": 60, "color: #8F2A90": 70, "color: #EC1282": 80}
	c := new(server.Context)
	c.Conn = new(server.ClientConn)
	c.Conn.Session = cache.Hget("tmp", "tmp")
	//svr := newconn()
	c.Conn.Output_data = func(buf *libraries.MsgBuffer) {
		cmd := protocol.READ_int32(buf)
		switch cmd {
		case protocol.CMD_MSG_WS2U_CommonResult:
			if data := protocol.READ_MSG_WS2U_CommonResult(buf); data.Result != protocol.Success {
				fmt.Printf("结果1%+v\r\n", data)
				for _, v := range c.Log {
					fmt.Println(v)
				}
			}
		case protocol.CMD_MSG_WS2U_threadmod:

		default:
			fmt.Println("未知cmd", cmd)
		}

	}
	c.Buf = new(libraries.MsgBuffer)
	c.Conn.Session.Store("Uid", int32(1))
	var tids []*db.Tmp
	model := new(models.Model)
	model.Table("Tmp").Where("Color!='' or Font !=''").Limit(0).Order("Tid asc").Select(&tids)
	fmt.Println(len(tids))
	b := time.Now()
	data := new(protocol.MSG_U2WS_threadmod)
	data.Action = db.ThreadmodId高亮
	data.Tids = make([]int32, 1)
	for _, t := range tids {
		search := models.Forum_thread_index_Begin()
		search.GetThreadlistBySubject(t.Title)
		if len(search.Result) == 1 {
			data.Tids[0] = search.Result[0]
			data.Param = coloroptions[t.Color]
			if strings.Contains(t.Font, "bold") {
				data.Param += 1
			}
		}
		search.End()
		highlightthread(data, c)
	}
	fmt.Println(time.Since(b))
}
func Spider_reload() {

}
func Spider_GetThread() {
	fid := int32(16)
	var threadtype = map[string]int16{
		"公告":  55,
		"原创":  56,
		"转贴":  57,
		"杂谈":  58,
		"讨论":  59,
		"下载":  60,
		"分享":  61,
		"摄影":  62,
		"活动":  63,
		"求助":  64,
		"已解决": 65,
	}
	coloroptions := map[string]int8{"color: #EE1B2E": 10, "color: #EE5023": 20, "color: #996600": 30, "color: #3C9D40": 40, "color: #2897C5": 50, "color: #2B65B7": 60, "color: #8F2A90": 70, "color: #EC1282": 80}
	model := new(models.Model)

	svrs := make(chan *ServerConn, 2)

	svrs <- newconn("122.226.111.105")
	svrs <- newconn("123.58.152.219")

	var tids []*db.Tmp
	model.Table("Tmp").Where("Done = 0").Limit(20000).Order("Tid asc").Select(&tids)

	for _, t := range tids {
		svr := <-svrs
		go func(t *db.Tmp, svr *ServerConn) {
			defer func() {
				svrs <- svr
			}()
			modelmember := new(models.Model_member)
			modelmember.Ctx = svr.c
			colordata := new(protocol.MSG_U2WS_threadmod)
			colordata.Action = db.ThreadmodId高亮
			colordata.Tids = make([]int32, 1)
			url := "https://game.ali213.net/thread-" + strconv.Itoa(int(t.Tid)) + "-1-1.html"
			var page = 1
			var position = int32(1)
			var tid = int32(0)
			var typeid = int16(0)
		nextpage:

			thread, err := svr.getmobilehtml(url)

			if err == io.EOF {
				fmt.Println("重连")
				time.Sleep(time.Second * 5)
				svr = newconn(svr.ip)
				goto nextpage
			}
			thread, _ = libraries.Preg_replace(`<img id="aimg_\d+" src="(https://game.ali213.net/)?([^"]+)" alt="[^"]+" title="[^"]+"/>`, `<img src="https://game.ali213.net/$2"/>`, thread)
			m, _ := Preg_match_result(`<div class="big-ping">(((?!ping-b)[\s\S])+)ping-b`, thread, -1)
			if len(m) == 0 {
				if libraries.Preg_match("404 Not Found", thread) {
					fmt.Println("重试")
					time.Sleep(time.Second * 2)
					goto nextpage
				}
				fmt.Println("获取不到楼层信息")
				return
			}

			if page == 1 {
				modelmember.Table("Tmp").Where("Tid = " + strconv.Itoa(int(t.Tid))).Update(map[string]interface{}{"Done": true})

				m, _ := Preg_match_result(`<div class="title">\n\[([^\]]+)]`, thread, 1)
				if len(m) == 0 {

					fmt.Println(t.Tid, "获取不到type")
					return
				}
				if m[0][1] == "公告" {
					return
				}
				typeid = threadtype[m[0][1]]
				if typeid == 0 {
					fmt.Println(m[0][1])
				}
			}

			fmt.Println(t.Tid, "获取到", len(m))

			for _, post := range m {
				if position == 1 {
					if !strings.Contains(post[0], "<div class=\"louzhu\">\n楼主</div>") {
						fmt.Println(t.Tid, "获取不到1楼信息")
						break
					}
				}
				user, _ := Preg_match_result(`<div>作者：([^<]+)</div>`, post[0], 1)
				if len(user) == 0 {
					fmt.Println(t.Tid, position, "获取不到作者姓名")
					break
				} else {
					u, code := modelmember.AddMember(&protocol.MSG_U2WS_Register{
						Username: user[0][1],
						Email:    user[0][1] + "@spider.com",
						Passwd:   user[0][1],
					})
					if code == protocol.Err_Alreadyregistered || code == protocol.Err_AlreadyUsedEmail {
						u = modelmember.GetMemberInfo(map[string]interface{}{"Username": user[0][1]}, "Uid", false)
					}
					if u == nil {
						fmt.Println(t.Tid, user[0][1], "获取不到用户信息", code)
						continue
					}
					svr.c.Conn.Session.Store("Uid", u.Uid)
					u.TokenKey = "0_0"
					svr.c.Log = svr.c.Log[:0]
				}
				if position == 1 {
					data := protocol.Pool_MSG_U2WS_Forum_newthread_submit.Get().(*protocol.MSG_U2WS_Forum_newthread_submit)
					data.Fid = fid
					data.Position = position
					data.Type = config.ThreadOperateTypeNew
					data.Typeid = typeid

					m, _ = Preg_match_result(`<div class="message">\s+(((?!<div class="ping-b)[\s\S])+)`, post[0], 1)
					m[0][1], _ = libraries.Preg_replace(`<\/div>\s+$`, "", m[0][1])
					data.Message = libraries.Html2bbcode(strings.Trim(m[0][1], " "))
					data.Other = 0
					data.Seccode = ""
					data.Special = config.ThreadSpecialCommon
					data.Subject = t.Title
					tid = forum_newthread_submit(data, svr.c, true)
					data.Put()

					if tid == 0 {
						fmt.Println(t.Tid, "新建失败")
						f, _ := os.OpenFile("./tmp", os.O_CREATE|os.O_RDWR, 0666)
						f.WriteString(thread)
						f.Close()
						break
					} else {
						svr.c.Conn.Session.Store("Uid", int32(1))
						colordata.Tids[0] = tid
						colordata.Param = coloroptions[t.Color]
						if strings.Contains(t.Font, "bold") {
							colordata.Param += 1
						}
						highlightthread(colordata, svr.c)
					}

				} else if tid > 0 {
					data := protocol.Pool_MSG_U2WS_threadfastpost.Get().(*protocol.MSG_U2WS_threadfastpost)
					m, _ = Preg_match_result(`<div class="message">\s+(((?!ping-b)[\s\S])+)`, post[0], 1)

					data.Message = libraries.Html2bbcode(strings.Trim(m[0][1][:len(m[0][1])-13], " "))

					data.Other = 0
					data.Seccode = ""
					data.Subject = ""
					data.Tid = tid
					forum_threadfastpost(data, svr.c, true)
					data.Put()
				} else {
					fmt.Println(t.Tid, "处理回复没有tid")
				}
				position++
			}

			if tid > 0 {
				//获取下一页
				m, _ = Preg_match_result(`<a href="((https://game.ali213.net/)?forum.php\?mod=viewthread&(amp;)?tid=`+strconv.Itoa(int(t.Tid))+`&amp;extra=(page%3D1)?&amp;page=\d+)"( class="nxt")?>下一页</a>`, thread, 1)

				if len(m) > 0 {

					url = strings.Replace("https://game.ali213.net/"+strings.Replace(m[0][1], "https://game.ali213.net/", "", 1), "&amp;", "&", -1)
					fmt.Println(t.Tid, "获取到下一页", m[0][2], url)
					page++
					goto nextpage
				}
			}
		}(t, svr)

	}
}
func (svr *ServerConn) gethtml(url string) (string, error) {
	url = strings.Replace(url, "https://game.ali213.net", "", 1)
	data := []byte(`GET ` + url + ` HTTP/1.1
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9,zh-TW;q=0.8
Connection: keep-alive
Cookie: iLfW_98c8_saltkey=QcvKduRQ; iLfW_98c8_lastvisit=1586419332; iLfW_98c8_visitedfid=46; UM_distinctid=1715e2cea5093c-0c8e9cf7bed698-376b4502-1fa400-1715e2cea516ae; PHPSESSID=4u1bkqc5u5cnnpcmcf8covq967; Hm_lvt_2207c39aecfe7b9b0f144ab7f8316fad=1586253070,1586422934,1586767377; iLfW_98c8_bbscb=1; Hm_lvt_977284c94dd8c99992d17cddcde13cf1=1586253087,1586422934,1586767377; iLfW_98c8_collapse=_forum_rules_46_; iLfW_98c8_connect_is_bind=0; iLfW_98c8_smile=1D1; passport_thirdLogin=qq; passport_identity=%22%5Cu89e6%5Cu4e0d%5Cu53ef%5Cu53ca2%22; passport_uid=22155307; passport_avatar=https%3A%2F%2Fuc.ali213.net%2Fdata%2Favatar%2F022%2F15%2F53%2F07_avatar_middle.jpg; passport_nickname=%22%5Cu89e6%5Cu4e0d%5Cu53ef%5Cu53ca2%22; passport_credit=0; passport_credit1=0; passport_auth=72daoi01RAbWFIGLqI9DkQmkGfMPGeiIAysmh09TeI2vx15rwrMH9aRu7taH4tHUa8A7LntvAvW%2Bl07JPpoenwMwCCcuXzSzTqJrsQ; passportusername=%E8%A7%A6%E4%B8%8D%E5%8F%AF%E5%8F%8A2; ali213Cookie=%7B%22uid%22%3A22155307%2C%22username%22%3A%22%5Cu89e6%5Cu4e0d%5Cu53ef%5Cu53ca2%22%2C%22nickname%22%3A%22%5Cu89e6%5Cu4e0d%5Cu53ef%5Cu53ca2%22%2C%22loginFlag%22%3Atrue%7D; iLfW_98c8_auth=83c1inc7BrV1h0C1jwqRAPf3HjSWk6vCeHppWGwcHT0%2BpQdJ%2FbnfF6hTbC%2BT2JSylxbs36wKRe%2FRR7N%2FI2ADiEcGjwgZUg; iLfW_98c8_ulastactivity=4865M6LnjhOm8iGJqnb%2BYr04kfdaKwex16HofgjvlBOHYX3d4%2Fqt; CNZZDATA864753=cnzz_eid%3D672334019-1586420562-%26ntime%3D1586847270; iLfW_98c8_home_diymode=1; CNZZDATA1316075=cnzz_eid%3D1771676130-1586419720-%26ntime%3D1586851824; CNZZDATA680195=cnzz_eid%3D102424219-1586419242-%26ntime%3D1586851251; iLfW_98c8_sid=2xsXa7; iLfW_98c8_forum_lastvisit=D_46_1586852641; Hm_lpvt_2207c39aecfe7b9b0f144ab7f8316fad=1586852641; Hm_lpvt_977284c94dd8c99992d17cddcde13cf1=1586852642; iLfW_98c8_sendmail=1; iLfW_98c8_lastact=1586852672%09forum.php%09ajax
Host: game.ali213.net
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: same-site
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36

`)
	svr.TlsWrite(data)
	return handle(svr)
}
func (svr *ServerConn) getmobilehtml(url string) (string, error) {
	url = strings.Replace(url, "https://game.ali213.net", "", 1)
	data := []byte(`GET ` + url + ` HTTP/1.1
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9,zh-TW;q=0.8
Cache-Control: max-age=0
Connection: keep-alive
Cookie: __gads=ID=7ccbfe8774bd4408:T=1587287123:S=ALNI_MZBEi3EIMVk5o81WeIqiW10_nEzPQ; UM_distinctid=17191af63992ce-08cce48981ca44-376b4502-1fa400-17191af639a87f; iLfW_98c8_saltkey=V6VDWZWb; iLfW_98c8_lastvisit=1587555278; PHPSESSID=3aimrrag39dp79uaoavkhhrpi0; Hm_lvt_2207c39aecfe7b9b0f144ab7f8316fad=1587287123,1588383041,1588466107; Hm_lvt_977284c94dd8c99992d17cddcde13cf1=1588383048,1588466107; iLfW_98c8_bbscb=1; iLfW_98c8_visitedfid=77D206D2523D1049D46; CNZZDATA864753=cnzz_eid%3D979803866-1588381248-https%253A%252F%252Fwww.ali213.net%252F%26ntime%3D1588669600; CNZZDATA1316075=cnzz_eid%3D1076415350-1588379513-https%253A%252F%252Fwww.ali213.net%252F%26ntime%3D1588669053; CNZZDATA680195=cnzz_eid%3D1947590939-1588379486-https%253A%252F%252Fwww.ali213.net%252F%26ntime%3D1588673429; iLfW_98c8_sendmail=1; passport_thirdLogin=qq; passport_identity=%22%5Cu89e6%5Cu4e0d%5Cu53ef%5Cu53ca2%22; passport_uid=22155307; passport_avatar=https%3A%2F%2Fuc.ali213.net%2Fdata%2Favatar%2F022%2F15%2F53%2F07_avatar_middle.jpg; passport_nickname=%22%5Cu89e6%5Cu4e0d%5Cu53ef%5Cu53ca2%22; passport_credit=0; passport_credit1=0; passport_auth=d00b0ghiI8lsb%2BzAoeN60pqhvLvsiqzH5hV7FA%2FPjI5hAS%2FXnLn6PCZk%2BSHfcR6v%2FbfcLEfxkZOwYneV6AuN3kUzjjfv7fy7ELbE6Q; passportusername=%E8%A7%A6%E4%B8%8D%E5%8F%AF%E5%8F%8A2; ali213Cookie=%7B%22uid%22%3A22155307%2C%22username%22%3A%22%5Cu89e6%5Cu4e0d%5Cu53ef%5Cu53ca2%22%2C%22nickname%22%3A%22%5Cu89e6%5Cu4e0d%5Cu53ef%5Cu53ca2%22%2C%22loginFlag%22%3Atrue%7D; iLfW_98c8_auth=437by3qQj3Wefdm4zv%2Fw6vR%2BKhs4u0WPXYbQfK2QC0FGF0fgQEQHvDjbv7vu3EiY5g7I%2FEEazS2XPU1sRsWWTo6LZgQLmw; iLfW_98c8_sid=2f72s8; iLfW_98c8_connect_is_bind=0; iLfW_98c8_forum_lastvisit=D_2523_1588602499D_206_1588668114D_77_1588673960; iLfW_98c8_ulastactivity=4072J2KOLheYwr23VjhGO4bIYXD8DPNwFwKcdn1yU1NSYnUkLPyZ; iLfW_98c8_smile=1D1; iLfW_98c8_lastact=1588674058%09forum.php%09viewthread; Hm_lpvt_2207c39aecfe7b9b0f144ab7f8316fad=1588674058; Hm_lpvt_977284c94dd8c99992d17cddcde13cf1=1588674058
Host: game.ali213.net
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: none
Sec-Fetch-User: ?1
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Mobile Safari/537.36

`)
	svr.TlsWrite(data)
	return handle(svr)

}
func newconn(ip string) *ServerConn {
	conn, err := net.Dial("tcp4", ip+":443")
	if err != nil {
		panic(err)
	}
	svr := &ServerConn{
		conn:           conn,
		inboundBuffer:  tls.NewBuffer(1024),
		outboundBuffer: tls.NewBuffer(1024),
		buf:            make([]byte, maxCiphertext),
		ip:             ip,
		g_buf:          tls.NewBuffer(1024),
	}
	svr.tlsconn = tls.Client(svr, svr.inboundBuffer, svr.outboundBuffer, &tls.Config{InsecureSkipVerify: true})
	if err = svr.tlsconn.Handshake(); err != nil {
		panic(err)
	}

	for !svr.tlsconn.HandshakeComplete() {

		var data []byte
		for data = svr.tlsconn.RawData(); len(data) < 5 || int(data[3])<<8|int(data[4])+5 > len(data); data = svr.tlsconn.RawData() {
			n, err := svr.conn.Read(svr.buf)
			if err != nil {
				panic(err)
			}
			svr.tlsconn.RawWrite(svr.buf[:n])
		}
		data = svr.tlsconn.RawData()
		if err := svr.tlsconn.Handshake(); err != nil {
			panic(err)
		}

	}
	svr.c = new(server.Context)
	svr.c.Conn = new(server.ClientConn)
	svr.c.Conn.Session = cache.Hget("tmp", "tmp")
	svr.c.Conn.Output_data = func(buf *libraries.MsgBuffer) {
		cmd := protocol.READ_int32(buf)
		switch cmd {
		case protocol.CMD_MSG_WS2U_CommonResult:
			if data := protocol.READ_MSG_WS2U_CommonResult(buf); data.Result != protocol.Success {
				fmt.Printf("结果1%+v\r\n", data)
				for _, v := range svr.c.Log {
					fmt.Println(v)
				}
			}
		case protocol.CMD_MSG_WS2U_Forum_newthread_submit:
			if data := protocol.READ_MSG_WS2U_Forum_newthread_submit(buf); data.Result != protocol.Success {
				fmt.Printf("结果2%+v\r\n", data)
				for _, v := range svr.c.Log {
					fmt.Println(v)
				}
			}
		case protocol.CMD_MSG_WS2U_threadfastpost:
			if data := protocol.READ_MSG_WS2U_threadfastpost(buf); data.Result != protocol.Success {
				fmt.Printf("结果3%+v\r\n", data)
				for _, v := range svr.c.Log {
					fmt.Println(v)
				}
			}
		case protocol.CMD_MSG_WS2U_threadmod:

		default:
			fmt.Println("未知cmd", cmd)
		}

	}
	svr.c.Buf = new(libraries.MsgBuffer)
	return svr
}

func handle(svr *ServerConn) (string, error) {

	for {
		n, err := svr.conn.Read(svr.buf)
		if err != nil {
			return "", err
		}

		req := &Request{Header: make(map[string]string)}
		svr.tlsconn.RawWrite(svr.buf[:n])
		for err = svr.tlsconn.ReadFrame(); err == nil && svr.inboundBuffer.Len() > 0; err = svr.tlsconn.ReadFrame() {
			shift, data, err := req.Parsereq(svr.inboundBuffer.Bytes())
			if err != nil {
				return "", err
			}

			if shift > 0 {
				svr.inboundBuffer.Shift(shift)
				svr.g_buf.Reset()
				svr.g_buf.Write(data)
				g, _ := gzip.NewReader(svr.g_buf)
				ndatas, _ := ioutil.ReadAll(g)
				g.Close()
				return string(ndatas), nil
			}
		}

		if err != nil && err != io.EOF {
			return "", err
		}
	}
}
func (svr *ServerConn) TlsWrite(b []byte) (int, error) {
	svr.tlsconn.Write(b)
	svr.conn.Write(svr.outboundBuffer.Bytes())
	svr.outboundBuffer.Reset()

	return len(b), nil
}
func (svr *ServerConn) Write(b []byte) (int, error) {
	if svr.conn == nil {
		return 0, io.EOF
	}
	if svr.tlsconn != nil {
		svr.conn.Write(svr.outboundBuffer.Bytes())
		svr.outboundBuffer.Reset()
	} else {
		svr.conn.Write(b)
	}

	return len(b), nil
}

func (svr *ServerConn) BufferLength() int {
	return svr.inboundBuffer.Len()
}
func (svr *ServerConn) Close() error {
	return nil
}
func (svr *ServerConn) Context() interface{} {
	return nil
}
func (svr *ServerConn) LocalAddr() net.Addr {
	return svr.conn.LocalAddr()
}
func (svr *ServerConn) RemoteAddr() net.Addr {
	return svr.conn.RemoteAddr()
}
func (svr *ServerConn) Read() []byte {
	return svr.inboundBuffer.Bytes()
}
func (svr *ServerConn) ReadN(n int) (int, []byte) {
	buf := svr.inboundBuffer.PreBytes(n)
	return len(buf), buf
}
func (svr *ServerConn) ResetBuffer() {
	svr.inboundBuffer.Reset()
}
func (svr *ServerConn) SendTo(b []byte) {
	svr.conn.Write(b)
}
func (svr *ServerConn) SetContext(i interface{}) {}
func (svr *ServerConn) ShiftN(n int) int {
	svr.inboundBuffer.Next(n)
	return n
}
func (svr *ServerConn) Wake() {}
func (req *Request) Parsereq(data []byte) (n int, out []byte, err error) {
	sdata := *(*string)(unsafe.Pointer(&data))
	var i, s int
	for k := range req.Header {
		delete(req.Header, k)
	}
	var line string
	var clen int
	var q = -1
	// method, path, proto line
	req.Proto = ""
	i = bytes.IndexByte(data, 32)
	if i == -1 {
		return
	}
	req.Proto = sdata[:i]
	l := len(sdata)
	for i, s = i+1, i+1; i < l; i++ {
		if data[i] == 63 && q == -1 {
			q = i
		} else if data[i] == 32 {
			if q != -1 {
				req.Path = sdata[s:q]
				req.Query = sdata[q+1 : i]
			} else {
				req.Path = sdata[s:i]
			}
			i++
			s = bytes.Index(data[i:], []byte{13, 10})
			if s > -1 {
				s += i
				//req.Proto = sdata[i:s]
			}
			break
		}
	}
	switch req.Proto {
	case "HTTP/1.0":
		req.Connection = "close"
	case "HTTP/1.1":
		req.Connection = "keep-alive"
	default:
		return 0, nil, fmt.Errorf("malformed request")
	}
	for s += 2; s < l; s += i + 2 {
		i = bytes.Index(data[s:], []byte{13, 10})
		line = sdata[s : s+i]
		if i > 15 {
			switch {
			case line[:15] == "Content-Length:", line[:15] == "Content-length:":
				clen, _ = strconv.Atoi(line[16:])
			case line == "Connection: close", line == "Connection: Close":
				req.Connection = "close"
			default:
				j := bytes.IndexByte(data[s:s+i], 58)
				req.Header[line[:j]] = line[j+2:]
			}
		} else if i == 0 {
			s += i + 2
			if clen == 0 && req.Header["Transfer-Encoding"] == "chunked" {

				for ; s < l; s += 2 {
					i = bytes.Index(data[s:], []byte{13, 10})
					if i == -1 {
						return 0, nil, nil
					}
					b := make([]byte, 8)
					if i&1 == 0 {
						hex.Decode(b[8-i/2:], data[s:s+i])
					} else {
						tmp, _ := hex.DecodeString("0" + sdata[s:s+i])
						copy(b[7-i/2:], tmp)

					}

					clen = int(b[0])<<56 | int(b[1])<<48 | int(b[2])<<40 | int(b[3])<<32 | int(b[4])<<24 | int(b[5])<<16 | int(b[6])<<8 | int(b[7])
					s += i + 2

					if l-s < clen {
						return 0, nil, nil
					}
					if clen > 0 {
						out = append(out, data[s:s+clen]...)
						s += clen
					} else if l-s == 2 && data[s] == 13 && data[s+1] == 10 {
						return s + 2, out, nil
					}

				}

			} else {
				if l-s < clen {
					return 0, nil, nil
				}
				return s + clen, data[s : s+clen], nil
			}
		} else {
			j := bytes.IndexByte(data[s:s+i], 58)
			req.Header[line[:j]] = line[j+2:]
		}

	}

	// not enough data
	return 0, nil, nil
}

//返回匹配结果,n=次数
func Preg_match_result(regtext string, text string, n int) ([][]string, error) {

	r, err := regexp2.Compile(regtext, 0)
	if err != nil {
		return nil, err
	}

	m, err := r.FindStringMatch(text)
	if err != nil {
		return nil, err
	}
	var result [][]string
	for m != nil && n != 0 {
		var res_v []string
		for _, v := range m.Groups() {
			res_v = append(res_v, v.String())
		}
		m, _ = r.FindNextMatch(m)
		result = append(result, res_v)
		n--

	}

	return result, nil
}
