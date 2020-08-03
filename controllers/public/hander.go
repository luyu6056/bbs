package public

import (
	"bbs/db"
	"bbs/libraries"
	"bbs/models"
	"bbs/protocol"
	"bbs/server"
	"encoding/binary"
	"sync/atomic"
	"time"
)

var visitor = &db.Common_member{Groupid: 7, Forum_access: make(map[int32]*db.Forum_access), Count: &db.Common_member_count{}} //访客

func Getuserinfo(c *server.Context) (user *db.Common_member) {
	i, ok := c.Conn.Session.Load("Uid")
	if ok {
		switch uid := i.(type) {
		case int32:
			user = models.GetMemberInfoByID(uid)
		case int:
			user = models.GetMemberInfoByID(int32(uid))
		}
	}
	if user == nil {
		user = visitor
		if user.Group == nil {
			user.Group = (*models.Model_usergroup).GetUserGroupByID(nil, user.Groupid)
		}
	}

	return
}

func Get_head(c *server.Context) (msg *protocol.MSG_WS2U_Common_Head) {
	msg = protocol.Pool_MSG_WS2U_Common_Head.Get().(*protocol.MSG_WS2U_Common_Head)
	msg.Bbname = models.Setting.Bbname
	msg.Sitename = models.Setting.Sitename
	now := time.Now().Unix()
	user_info := Getuserinfo(c)
	msg.Uid = user_info.Uid
	msg.Username = user_info.Username
	msg.Admincp = 0
	msg.Diy = 0
	msg.Portalcp = 0
	msg.Grouptitle = user_info.Group.Grouptitle
	msg.Groupid = user_info.Groupid
	msg.Avatar = user_info.Avatar
	msg.Adminid = user_info.Adminid
	if user_info.Uid > 0 {

		if user_info.Newpm > 99 {
			msg.Unread_num = 99
		} else {
			msg.Unread_num = int8(user_info.Newpm)
		}
		if user_info.Uid == 1 || user_info.Group.Allowpostarticle {
			msg.Portalcp = 1
		}
		if user_info.Allowadmincp == 1 {
			msg.Admincp = 1
			msg.Diy = 1
		}
		if user_info.Count.Lastip != c.Conn.IP {
			user_info.Count.UpdateLastip(c.Conn.IP)
		}
	}

	msg.Timestamp = int32(now)
	return msg
}

func SendServerOK(ctx *server.Context) {
	msg := protocol.Pool_MSG_WS2U_Server_OK.Get().(*protocol.MSG_WS2U_Server_OK)
	ctx.Output_data(msg)
	msg.Put()
}
func ConnClient(data *protocol.MSG_C2S_Conn_Client, ctx *server.Context, rpcserver *server.RpcServer) {
	id := atomic.AddInt32(&server.ClientId, 1)
	netconn := &server.ClientConn{
		Id:          id,
		IP:          data.Ip,
		UserAgent:   data.UserAgent,
		Output_data: rpcserver.Output_data,
	}
	binary.LittleEndian.PutUint32(netconn.ClientFd[:], uint32(data.Fd))
	ctx.Conn_m.Store(netconn.ClientFd, netconn)
	ctx.Conn = netconn
	time.AfterFunc(time.Second*5, func() {
		if v, ok := ctx.Conn_m.Load(netconn.ClientFd); ok && v.(*server.ClientConn).Session == nil { //踢下线
			buf := <-libraries.MsgBuf_chan
			defer func() {
				libraries.MsgBuf_chan <- buf
			}()
			msg := protocol.Pool_MSG_Conn_Down.Get().(*protocol.MSG_Conn_Down)
			msg.Fd = int32(binary.LittleEndian.Uint32(netconn.ClientFd[:]))
			//ctx.OutControl(msg.WRITE(buf))
			msg.Put()
			ctx.Conn_m.Delete(netconn.ClientFd)
		}
	})

}

func ConnDown(ctx *server.Context) {
	if ctx.Conn_m != nil {
		ctx.Conn_m.Delete(ctx.Conn.ClientFd)
	}
	if session := ctx.Conn.Session; session != nil {
		ctx.Conn.Session = nil
		models.Conn_m.Delete(ctx.Conn.Id) //在settoken的时候设置了Store
		now := time.Now().Unix()
		uid, ok := session.Load("Uid")
		if ok {
			user := models.GetMemberInfoByID(uid.(int32))
			if user != nil {
				if ctx.Conn.BeginTime-now > 0 {
					user.Count.UpdateLastvisit(int32(ctx.Conn.BeginTime-now), int32(now))
				}
				user.Isonline = false
			}
		}

	}
}
