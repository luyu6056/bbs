package server

import (
	"fmt"
	"runtime/debug"
)

/*
var WsPool *ants.PoolWithFunc
var waitpool, _ = ants.NewPool(1000)

func init() {
	WsPool, _ = ants.NewPoolWithFunc(100000, func(payload interface{}) {
		ws, ok := payload.(*WSconn)
		if !ok || ws.Close || len(ws.Msgchan) == 0 {
			return
		}
		<-ws.Work
		tmpctx := Context_pool.Get().(*Context)
		tmpctx.Conn = ws.Conn
		defer func() {
			Context_pool.Put(tmpctx)
			ws.Work <- true
		}()
		for {
			var data []byte
			select {
			case data = <-ws.Msgchan:
				ws.In.Write(data)
			default:

				//waitpool.Submit(func() {
				//	time.Sleep(time.Millisecond * 10)
				//	WsPool.Invoke(ws)
				//})

				return
			}
			ws.ReadLength = 0
			for ws.In.Len() > 0 {
				msgtype, p, err := ws.ReadMessage()
				if msgtype == waitFrame {
					break
				}
				if err != nil {
					ws.Wserr = err
					libraries.DEBUG(err.Error())
					ws.Close = true
					break
				}
				if msgtype == CloseMessage {
					libraries.DEBUG("关闭帧")
					ws.Wserr = errors.New("关闭：原因" + err.Error())
					ws.Close = true
					return
				}
				if len(p) < 4 { //"Error data len"
					break
				}

				tmpctx.Request.Body.SetBytes(p)
				if ws.Close {
					return
				}
				//hs.pool.Submit(func() {
				tmpctx.Wshand()

				//})

			}
			ws.In.Shift(ws.ReadLength)
			WsBytepool.Put(data)
		}
	})

}

var WsBytepool = pbytes.New(128, 655350)*/

func WsWebhand(c *Context) {

	defer func() {
		if err := recover(); err != nil {
			fmt.Println(err)
			debug.PrintStack()
		}
		c.Save_errlog()
		c.Recovery()

	}()

	WebHandle(c)
}
func WsAdminhand(c *Context) {
	defer func() {
		if err := recover(); err != nil {
			fmt.Println(err)
			debug.PrintStack()
		}
		c.Save_errlog()
		c.Recovery()

	}()

	AdminHandle(c)
}

var WebHandle func(*Context)
var AdminHandle func(*Context)
