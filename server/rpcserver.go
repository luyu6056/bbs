package server

import (
	"bbs/libraries"
	"encoding/binary"

	"github.com/klauspost/compress/zstd"
	"github.com/luyu6056/gnet"
)

//rpcserver是输出一个异步的gorutinue，注意输出并发安全
type RpcServer struct {
	ServerId    int8
	GroupId     int8
	Conn        *ClientConn
	ServerConn  gnet.Conn
	ZstdDecoder *zstd.Decoder
	DecodeBuf   *libraries.MsgBuffer
	rpcMsgChan  chan *libraries.MsgBuffer
	rpcOutChan  chan *libraries.MsgBuffer
}

func NewRpcServer(c gnet.Conn) *RpcServer {
	s := &RpcServer{ServerConn: c, DecodeBuf: &libraries.MsgBuffer{}}
	s.rpcMsgChan = make(chan *libraries.MsgBuffer, rpcmsgnum) //对象循环利用
	s.rpcOutChan = make(chan *libraries.MsgBuffer, rpcmsgnum) //输出通道
	for i := 0; i < rpcmsgnum; i++ {
		s.rpcMsgChan <- &libraries.MsgBuffer{}
	}
	go s.chanOut()
	return s
}

func (svr *RpcServer) Output_data(msg *libraries.MsgBuffer) {

	buf := <-libraries.MsgBuf_chan
	defer func() {
		libraries.MsgBuf_chan <- buf
	}()
	buf.Reset()
	w := CompressNoContextTakeover(buf, 2)
	w.Write(msg.Bytes())
	w.Close()
	if buf.Len() > 0xffff-6 {
		libraries.DEBUG("rpc消息过大 cmd", int32(binary.LittleEndian.Uint32(buf.Next(4))))
		return
	}
	o := <-svr.rpcMsgChan
	outbuf := o.Make(2 + 4 + buf.Len())
	msglen := len(outbuf) - 2
	outbuf[0] = byte(msglen)
	outbuf[1] = byte(msglen >> 8)
	copy(outbuf[2:], svr.Conn.ClientFd[:])
	copy(outbuf[6:], buf.Bytes())
	svr.rpcOutChan <- o

}

const (
	maxOutLen = 0xFEFFFF - 3
	//满足任一条件开启压缩
	compressMinLen = 1000 //最小压缩长度,最大可设置0xFFFF
	compressMinNum = 5    //最小压缩消息数
	rpcmsgnum      = 200
)

func (svr *RpcServer) chanOut() {
	defer func() {
		if r := recover(); r != nil {
			libraries.Log("%v", r)
			go svr.chanOut()
		}
	}()
	var buf = &libraries.MsgBuffer{}
	var msgbuf = &libraries.MsgBuffer{}
	for o := range svr.rpcOutChan {
		n := 1
		for len(svr.rpcOutChan) > 0 {
			o1 := <-svr.rpcOutChan
			if o.Len()+o1.Len() > maxOutLen {
				svr.rpcOutChan <- o1
				break
			}
			n++
			o.Write(o1.Bytes())
			o1.Reset()
			svr.rpcMsgChan <- o1
		}
		msgbuf.Reset()
		if n > compressMinNum || o.Len() > compressMinLen {
			//有压缩
			buf.Reset()
			w := CompressNoContextTakeover(buf, 5)
			w.Write(o.Bytes())
			w.Close()
			b := msgbuf.Make(3)
			msglen := buf.Len() + 3
			b[0] = byte(msglen >> 16)
			b[1] = byte(msglen >> 8)
			b[2] = byte(msglen)
			msgbuf.Write(buf.Bytes())
		} else {
			//无压缩
			msglen := o.Len() + 3
			b := msgbuf.Make(3)
			b[0] = 0xFF
			b[1] = byte(msglen >> 8)
			b[2] = byte(msglen)
			msgbuf.Write(o.Bytes())
		}
		svr.ServerConn.AsyncWrite(msgbuf.Bytes())
		o.Reset()
		svr.rpcMsgChan <- o
	}
}
func init() {

}
