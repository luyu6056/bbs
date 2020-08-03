package public

import (
	"bbs/libraries"
	"bbs/models"
	"bbs/protocol"
	"bbs/server"
	"encoding/binary"
	"hash/crc64"
	"math/rand"
	"strconv"
	"strings"
	"sync/atomic"
	"time"

	"github.com/luyu6056/cache"
)

var tab = crc64.MakeTable(uint64(time.Now().UnixNano()))
var no uint32 = 100000

func Gettoken(c *server.Context) {

	msg := protocol.Pool_MSG_WS2U_Gettoken.Get().(*protocol.MSG_WS2U_Gettoken)
	msg.Token = GenerateToken(c)
	msg.Head = Get_head(c)
	c.Output_data(msg)
	msg.Put()
}
func GenerateToken(c *server.Context) []byte {
	n := atomic.AddUint32(&no, 1)
	var ipn int
	match, _ := libraries.Preg_match_result(`^([^:]+):\d+$`, c.Conn.IP, 1)
	if len(match) == 1 {
		ip_s := strings.Split(match[0][1], ".")
		if len(ip_s) == 4 {
			ip1, _ := strconv.Atoi(ip_s[0])
			ip2, _ := strconv.Atoi(ip_s[1])
			ip3, _ := strconv.Atoi(ip_s[2])
			ip4, _ := strconv.Atoi(ip_s[3])
			ipn = ip1 + ip2<<8 + ip3<<16 + ip4<<24

		}
	}
	h := c.Conn.IP + c.Conn.UserAgent
	b := make([]byte, 16)
	binary.LittleEndian.PutUint64(b, crc64.Checksum([]byte(h+strconv.Itoa(rand.Intn(100000000))), tab))
	binary.LittleEndian.PutUint64(b[8:], uint64(int64(n)+time.Now().UnixNano()))
	token := string(b)
	cache.Hset(token, map[string]interface{}{"token": token, "ipn": ipn}, "session", 86400*7)
	c.Conn.Session = cache.Hget(token, "session")
	return b
}
func Settoken(data *protocol.MSG_U2WS_settoken, c *server.Context) {
	models.Conn_m.Store(c.Conn.Id, c.Conn)
	var ok bool
	if c.Conn.Session, ok = cache.Has(string(data.Token), "session"); !ok {
		Gettoken(c)
		return
	}
	user := Getuserinfo(c)
	if user.Uid > 0 {
		user.Isonline = true
		user.WritelLog_login(c.Conn.IP, c.Conn.UserAgent)
	}
	msg := protocol.Pool_MSG_WS2U_Gettoken.Get().(*protocol.MSG_WS2U_Gettoken)
	msg.Token = data.Token
	msg.Head = Get_head(c)
	c.Output_data(msg)
	msg.Put()
}
