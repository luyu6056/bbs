package server

import (
	"bbs/config"
	"bbs/libraries"
	"bbs/protocol"
	"bytes"
	"encoding/hex"
	"errors"
	"fmt"
	"hash/crc32"
	"io"
	"io/ioutil"
	"os"
	"strconv"
	"strings"
	"sync"
	"sync/atomic"
	"time"

	"github.com/klauspost/compress/gzip"
	"github.com/luyu6056/cache"
	"github.com/luyu6056/gnet"
)

type Httpserver struct {
	Conn *ClientConn
	//ClientFd [4]byte //用户的fd标识
	Request Request
	//IsServer bool
	c    gnet.Conn
	Out  *libraries.MsgBuffer
	Ws   *WSconn
	data *bytes.Reader
}

type Request struct {
	Proto, Method string
	Path, Query   string
	RemoteAddr    string
	Connection    string
	Header        map[string]string
}

var Httppool = sync.Pool{New: func() interface{} {
	hs := &Httpserver{Out: new(libraries.MsgBuffer)}
	hs.Request.Header = make(map[string]string)
	hs.data = &bytes.Reader{}
	return hs
}}

var msgbufpool = sync.Pool{New: func() interface{} {
	return new(libraries.MsgBuffer)
}}
var gzippool = sync.Pool{New: func() interface{} {
	w, _ := gzip.NewWriterLevel(nil, 6)
	return w
}}

func (r *Request) GetHeader(key string) string {
	return r.Header[key]
}

func (hs *Httpserver) BeginRequest(route string, c *Context) {

	//maxFormSize := int64(10 << 20) // 10 MB is a lot of text.
	//reader := io.LimitReader(c.In, maxFormSize+1)
	//b, err := ioutil.ReadAll(reader)
	//if err != nil || len(b) < 20 {

	if c.In.Len() < 20 {
		hs.Out404(nil)
		return
	}
	token := c.In.Next(16)
	if hs.Conn == nil {
		hs.Conn = &ClientConn{Output_data: hs.Output_data}
		b := c.In.PreBytes(4)
		cmd := int32(b[0]) | int32(b[0])<<8 | int32(b[0])<<16 | int32(b[0])<<24
		var ok bool
		hs.Conn.Session, ok = cache.Has(libraries.Bytes2str(token), "session")

		//设置Session指针
		if !ok {
			libraries.DEBUG("不ok")
			c.Conn = hs.Conn
			//libraries.DEBUG("token不存在", []byte(token))
			if !libraries.In_slice(cmd, []int32{protocol.CMD_MSG_U2WS_Gettoken, protocol.CMD_MSG_U2WS_Ping}) {
				msg := protocol.Pool_MSG_WS2U_Ping.Get().(*protocol.MSG_WS2U_Ping)
				msg.Result = protocol.Err_token
				c.Output_data(msg)
				protocol.Pool_MSG_WS2U_Ping.Put(msg)
				return
			}
		}
	}
	c.Conn = hs.Conn
	if control, ok := Control_func[route]; ok {
		control(c)
	} else {
		libraries.DEBUG(fmt.Sprintf("未定义路由%s", route))
	}
}
func (hs *Httpserver) Output_data(b *libraries.MsgBuffer) {
	hs.Out.Reset()
	hs.Out.Write(http1head200)
	hs.Out.Write(http1nocache)
	hs.httpsfinish(b, b.Len())
}

func (hs *Httpserver) Ip(c gnet.Conn) (ip string) {

	if ip = hs.Request.GetHeader("X-Real-IP"); ip == "" {
		ip = c.RemoteAddr().String()
	}
	ip, _ = libraries.Preg_replace(`:\d+$`, "", ip)
	return ip
}
func (hs *Httpserver) IsMobile() bool {
	return false
}

func (hs *Httpserver) UserAgent() string {
	return hs.Request.GetHeader("UserAgent")
}

var errprotocol = errors.New("the client is not using the websocket protocol:")

//http升级为websocket
func (hs *Httpserver) Upgradews(c gnet.Conn) (err error) {
	//
	hs.Out.Reset()
	/*if !(strings.Contains(c.Request.Head, "Connection: Upgrade")) {

		hs.Out.WriteString("HTTP/1.1 400 Error\r\nContent-Type: text/plain\r\nContent-Length: 11\r\nConnection: close\r\n\r\nUnknonw MSG")
		libraries.DEBUG("ws协议没有upgrade")
		return errprotocol
	}*/
	if hs.Request.Method != "GET" {

		hs.Out.WriteString("HTTP/1.1 403 Error\r\nContent-Type: text/plain\r\nContent-Length: 11\r\nConnection: close\r\n\r\nUnknonw MSG")
		libraries.DEBUG("ws协议没有get")
		return errprotocol
	}
	/*libraries.DEBUG(c.Request.Head)
	if !(strings.Contains(c.Request.Head, "Sec-WebSocket-Extensions")) {

		hs.Out.WriteString("HTTP/1.1 400 Error\r\nContent-Type: text/plain\r\nContent-Length: 11\r\nConnection: close\r\n\r\nUnknonw MSG")
		libraries.DEBUG("ws协议没有Extensions")
		return
	}*/

	if config.Server.Origin != "" && hs.Request.Header["Origin"] != config.Server.Origin {
		hs.Out.WriteString("HTTP/1.1 403 Error\r\nContent-Type: text/plain\r\nContent-Length: 11\r\nConnection: close\r\n\r\nUnknonw MSG")
		libraries.DEBUG("ws来自错误的Origin")
		return errprotocol
	}
	if hs.Request.Header["Upgrade"] != "websocket" {
		hs.Out.WriteString("HTTP/1.1 403 Error\r\nContent-Type: text/plain\r\nContent-Length: 11\r\nConnection: close\r\n\r\nUnknonw MSG")
		libraries.DEBUG("ws协议没有upgrade")
		return errprotocol
	}

	if hs.Request.Header["Sec-WebSocket-Version"] != "13" {
		hs.Out.WriteString("HTTP/1.1 403 Error\r\nContent-Type: text/plain\r\nContent-Length: 11\r\nConnection: close\r\n\r\nUnknonw MSG")
		libraries.DEBUG("ws协议没有Extensions")
		return errprotocol
	}

	var challengeKey string

	if challengeKey = hs.Request.Header["Sec-WebSocket-Key"]; challengeKey == "" {
		hs.Out.WriteString("HTTP/1.1 403 Error\r\nContent-Type: text/plain\r\nContent-Length: 11\r\nConnection: close\r\n\r\nUnknonw MSG")
		libraries.DEBUG("ws协议没有Extensions")
		return errprotocol
	}
	id := atomic.AddInt32(&ClientId, 1)
	hs.Ws = &WSconn{
		IsServer:   true,
		ReadFinal:  true,
		Http:       hs,
		Conn:       &ClientConn{BeginTime: time.Now().Unix(), IP: hs.Ip(c), UserAgent: hs.Request.GetHeader("User-Agent"), Id: id},
		Write:      c.AsyncWrite,
		IsCompress: strings.Contains(hs.Request.Header["Sec-WebSocket-Extensions"], "permessage-deflate"),
		readbuf:    &libraries.MsgBuffer{},
	}
	hs.Ws.Conn.Output_data = hs.Ws.Output_data
	c.SetContext(hs.Ws)
	hs.Out.WriteString("HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: ")
	hs.Out.WriteString(ComputeAcceptKey(challengeKey))
	hs.Out.WriteString("\r\n")
	if hs.Ws.IsCompress {
		hs.Out.WriteString("Sec-Websocket-Extensions: permessage-deflate; server_no_context_takeover; client_no_context_takeover\r\n")
	}
	hs.Out.WriteString("\r\n")
	hs.c.AsyncWrite(hs.Out.Bytes())
	time.AfterFunc(time.Second*10, func() {
		if ctx, ok := c.Context().(*WSconn); !ok || ctx.Conn == nil || ctx.Conn.Session == nil {
			c.Close()
		}
	})
	return nil
}

func (req *Request) Parsereq(data []byte) (n int, out []byte, err error) {
	sdata := string(data)

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
	req.Method = sdata[:i]
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
				req.Proto = sdata[i:s]
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
				if j == -1 {
					return 0, nil, nil
				}
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

var (
	static_patch = "./static"
	//http1origin  = []byte("Access-Control-Allow-Origin: " + config.Server.Origin + "\r\n")
	http1head200 = []byte("HTTP/1.1 200 OK\r\nserver: gnet by luyu6056\r\nAccess-Control-Allow-Origin: " + config.Server.Origin + "\r\n")
	http1head206 = []byte("HTTP/1.1 206 Partial Content\r\nserver: gnet by luyu6056\r\nAccess-Control-Allow-Origin: " + config.Server.Origin + "\r\n")
	http1head304 = []byte("HTTP/1.1 304 Not Modified\r\nserver: gnet by luyu6056\r\n")
	http1deflate = []byte("\r\nContent-encoding: deflate")
	http1gzip    = []byte("\r\nContent-encoding: gzip")
	http404b, _  = ioutil.ReadFile(static_patch + "/404.html")
	http1cache   = []byte("Cache-Control: max-age=86400\r\n")
	http1nocache = []byte("Cache-Control: no-store, no-cache, must-revalidate, max-age=0, s-maxage=0\r\nPragma: no-cache\r\n")
)

func (hs *Httpserver) Static() {
	hs.Out.Reset()
	etag := hs.Request.GetHeader("If-None-Match")
	filename := hs.Request.Path
	if filename == "/" {
		filename = "/index.html"
	}
	var range_start, range_end int
	if r := hs.Request.GetHeader("range"); strings.Index(r, "bytes=") == 0 {
		if e := strings.Index(r, "-"); e > 6 {
			range_start, _ = strconv.Atoi(r[6:e])
			range_end, _ = strconv.Atoi(r[e+1:])
		}
	}
	isdeflate := strings.Contains(hs.Request.GetHeader("Accept-Encoding"), "deflate")
	var isgzip bool
	if !isdeflate {
		isgzip = strings.Contains(hs.Request.GetHeader("Accept-Encoding"), "gzip")
	}
	filename = static_patch + filename
	var f_cache *file_cache
	if cache, ok := static_cache.Load(filename); ok { //这个cache在http2那边
		f_cache = cache.(*file_cache)
	} else {
		f_cache = &file_cache{}
	}
	var f *os.File
	var fstat os.FileInfo
	var err error
	//有缓存，检查文件是否修改
	if f_cache.etag != "" && atomic.CompareAndSwapUint32(&f_cache.check, 0, 1) {
		f, err = os.Open(filename)
		if err != nil {
			f_cache.etag = ""
			hs.Out404(err)

			return
		}
		defer f.Close()
		fstat, err = f.Stat()
		if err != nil {
			f_cache.etag = ""
			hs.Out404(err)

			return
		}
		if t := fstat.ModTime().Unix(); t > f_cache.modTime {
			f_cache.etag = ""
			f_cache.modTime = t
		}
		time.AfterFunc(time.Second, func() { f_cache.check = 0 })
	}
	if f_cache.etag != "" {
		if f_cache.etag == etag {
			hs.Out.Write(http1head304)
			hs.data.Reset(nil)
		} else if isdeflate && len(f_cache.deflatefile) > 0 {
			hs.Out.Write(http1head200)
			hs.Out.WriteString("Content-Type: ")
			hs.Out.WriteString(f_cache.content_type)
			hs.Out.Write(http1deflate)
			hs.data.Reset(f_cache.deflatefile)
		} else {
			hs.Out.Write(http1head200)
			hs.Out.WriteString("Content-Type: ")
			hs.Out.WriteString(f_cache.content_type)
			hs.data.Reset(f_cache.file)
		}
		hs.Out.WriteString("\r\nEtag: ")
		hs.Out.WriteString(f_cache.etag)
		hs.Out.WriteString("\r\n")
		hs.httpsfinish(hs.data, hs.data.Len())

		return
	} else {
		//大文件时速度比较慢，目前的模式是小文件crc etag+缓存模式
		if f == nil {
			f, err = os.Open(filename)
			if err != nil {
				hs.Out404(err)

				return
			}
			defer f.Close()
			fstat, err = f.Stat()
			if err != nil {
				hs.Out404(err)

				return
			}
			f_cache.modTime = fstat.ModTime().Unix()
		}
		if fstat.Size() < 1024*1024*5 { //暂定5Mb是大文件
			b := make([]byte, fstat.Size())
			n, err := io.ReadFull(f, b)
			msglen := n
			if err != nil || n != int(fstat.Size()) {
				hs.Out404(err)

				return
			} else {
				f_cache.file = make([]byte, len(b))
				copy(f_cache.file, b)
				f_cache.etag = strconv.Itoa(int(crc32.ChecksumIEEE(b)))
				hs.Out.Write(http1head200)
				s := strings.Split(filename, ".")
				name := s[len(s)-1]
				switch {
				case strings.Contains(name, "css"):
					hs.Out.WriteString("Content-Type: text/css")
					f_cache.content_type_h2 = headerField_content_type_css
					f_cache.content_type = "text/css"
				case strings.Contains(name, "html"):
					hs.Out.WriteString("Content-Type: text/html;charset=utf-8")
					f_cache.content_type_h2 = headerField_content_type_html
					f_cache.content_type = "text/html;charset=utf-8"
				case strings.Contains(name, "js"):
					hs.Out.WriteString("Content-Type: application/javascript")
					f_cache.content_type_h2 = headerField_content_type_js
					f_cache.content_type = "application/javascript"
				case strings.Contains(name, "gif"):
					isgzip = false
					isdeflate = false
					hs.Out.WriteString("Content-Type: image/gif")
					f_cache.content_type_h2 = headerField_content_type_gif
					f_cache.content_type = "image/gif"
				case strings.Contains(name, "png"):
					isgzip = false
					isdeflate = false
					hs.Out.WriteString("Content-Type: image/png")
					f_cache.content_type_h2 = headerField_content_type_png
					f_cache.content_type = "image/png"
				default:
					isgzip = false
					isdeflate = false
					hs.Out.WriteString("Content-Type: application/octet-stream")
					f_cache.content_type_h2 = headerField_content_type_default
					f_cache.content_type = "application/octet-stream"
				}
				if len(b) > 512 && (isgzip || isdeflate) {
					switch {
					case isdeflate:
						buf := msgbufpool.Get().(*libraries.MsgBuffer)
						defer msgbufpool.Put(buf)
						buf.Reset()
						w := CompressNoContextTakeover(buf, 6)
						w.Write(b)
						w.Close()
						hs.Out.Write(http1deflate)
						f_cache.deflatefile = make([]byte, buf.Len())
						copy(f_cache.deflatefile, buf.Bytes())
						hs.data.Reset(buf.Bytes())
						msglen = buf.Len()
					case isgzip:
						g := gzippool.Get().(*gzip.Writer)
						buf := msgbufpool.Get().(*libraries.MsgBuffer)
						defer msgbufpool.Put(buf)
						buf.Reset()
						g.Reset(buf)
						g.Write(b)
						g.Flush()
						hs.Out.Write(http1gzip)
						hs.data.Reset(buf.Bytes())
						gzippool.Put(g)
						msglen = buf.Len()
					}
				} else {
					hs.data.Reset(b)
				}
				static_cache.Store(filename, f_cache)
				hs.Out.WriteString("\r\nEtag: ")
				hs.Out.WriteString(f_cache.etag)
				hs.Out.WriteString("\r\n")
				hs.Out.Write(http1cache)
				hs.httpsfinish(hs.data, msglen)

			}
		} else {

			if range_start > 0 || range_end > 0 {

				hs.Out.Write(http1head206)
				if range_end == 0 {
					range_end = int(fstat.Size())
				}
				f.Seek(int64(range_start), 0)
				hs.Out.WriteString("Content-Type: application/octet-stream\r\nAccept-Ranges: bytes\r\nContent-Range: bytes ")
				hs.Out.WriteString(strconv.Itoa(range_start))
				hs.Out.WriteString("-")
				hs.Out.WriteString(strconv.Itoa(range_end))
				hs.Out.WriteString("/")
				hs.Out.WriteString(strconv.Itoa(int(fstat.Size())))
				hs.httpsfinish(f, range_end-range_start)
			} else {
				hs.Out.Write(http1head200)
				hs.Out.WriteString("Content-Type: application/octet-stream\r\n")
				hs.httpsfinish(f, int(fstat.Size()))
			}

		}
	}
}
func (hs *Httpserver) httpsfinish(b io.Reader, l int) {
	if config.Server.IsHttps {
		hs.Out.WriteString("strict-transport-security: max-age=31536000; includeSubDomains\r\n")
	}
	hs.Out.WriteString("Connection: ")
	hs.Out.WriteString(hs.Request.Connection)

	hs.Out.WriteString("\r\nContent-Length: ")
	hs.Out.WriteString(strconv.Itoa(l))
	hs.Out.WriteString("\r\n\r\n")

	for msglen := l; msglen > 0; msglen = l {
		if msglen > http2initialMaxFrameSize-hs.Out.Len() { //切分为一个tls包
			msglen = http2initialMaxFrameSize - hs.Out.Len()
		}
		b.Read(hs.Out.Make(msglen))
		hs.c.AsyncWrite(hs.Out.Bytes())
		hs.Out.Reset()
		l -= msglen
	}
	if l := hs.Out.Len(); l > 0 {
		hs.c.AsyncWrite(hs.Out.Next(l))
	}
}
func (hs *Httpserver) Out404(err error) {
	hs.Out.WriteString("HTTP/1.1 404 Not Found\r\nContent-Length: ")
	hs.Out.WriteString(strconv.Itoa(len(http404b)))
	hs.Out.WriteString("\r\n\r\n")
	hs.Out.Write(http404b)
	hs.c.AsyncWrite(hs.Out.Bytes())
}

func init() {

	if http404b == nil {
		http404b = []byte("404 not found")
	}
}
