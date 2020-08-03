package web

import (
	"bbs/protocol"
	"bbs/server"
)

func Generate_seccode(c *server.Context) {
	/*captchaId, Png := libraries.Generate(180, 70, c.Server.Session().Load_str("token"))
	c.Server.Session().Store("seccode_captchaId", captchaId)
	msg := protocol.Pool_MSG_WS2U_Getseccode.Get().(*protocol.MSG_WS2U_Getseccode)
	msg.Img = Png
	c.Output_data(msg)
	msg.Put()*/

}
func check_seccode(data *protocol.MSG_U2WS_Checkseccode, c *server.Context) {
	/*if !libraries.Verify(data.Code, c.Server.Session().Load_str("seccode_captchaId")) {
		c.Out_common(protocol.Err_Seccode, "")
		return
	}
	c.Out_common(protocol.Success, "")*/
}
