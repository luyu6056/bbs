var CMD_MSG_U2WS_Ping = -2064054626,CMD_MSG_WS2U_Ping = -1181151646,CMD_MSG_U2WS_Gettoken = -160848332,CMD_MSG_WS2U_Gettoken = 157251877,CMD_MSG_WS2U_CommonResult = 436275943,CMD_MSG_U2WS_logout = -843349899,CMD_MSG_U2WS_settoken = -135332941,CMD_MSG_U2WS_Getseccode = -1981134582,CMD_MSG_WS2U_Getseccode = -866166167,CMD_MSG_WS2U_Common_Head = 1185077681,CMD_MSG_WS2U_Server_OK = 1710690038;
function WRITE_MSG_U2WS_Ping(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Ping));
	b=b.concat(write_MSG_U2WS_Ping(o));
	return b;
}
function write_MSG_U2WS_Ping(o){
	var b=[];
	return b
}
function read_MSG_U2WS_Ping(b){
	var o={},r={};r.b=b;
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_Ping(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_Ping));
	b=b.concat(write_MSG_WS2U_Ping(o));
	return b;
}
function write_MSG_WS2U_Ping(o){
	var b=[];
	b=b.concat(write_int16(o.Result));
	return b
}
function read_MSG_WS2U_Ping(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);
	o.Result=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Gettoken(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Gettoken));
	b=b.concat(write_MSG_U2WS_Gettoken(o));
	return b;
}
function write_MSG_U2WS_Gettoken(o){
	var b=[];
	return b
}
function read_MSG_U2WS_Gettoken(b){
	var o={},r={};r.b=b;
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_Gettoken(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_Gettoken));
	b=b.concat(write_MSG_WS2U_Gettoken(o));
	return b;
}
function write_MSG_WS2U_Gettoken(o){
	var b=[];
	b=b.concat(write_byte(o.Token));
	if(o.Head){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_WS2U_Common_Head(o.Head));
	}else{
		b=b.concat(write_int8(0))
	}
	return b
}
function read_MSG_WS2U_Gettoken(b){
	var o={},r={};r.b=b;
	r=read_byte(r.b);o.Token=r.o
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_WS2U_Common_Head(r.b);
		o.Head=r.o
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_CommonResult(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_CommonResult));
	b=b.concat(write_MSG_WS2U_CommonResult(o));
	return b;
}
function write_MSG_WS2U_CommonResult(o){
	var b=[];
	b=b.concat(write_int16(o.Result));
	b=b.concat(write_string(o.Err_url));
	return b
}
function read_MSG_WS2U_CommonResult(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);
	o.Result=r.o
	r=read_string(r.b);
	o.Err_url=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_logout(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_logout));
	b=b.concat(write_MSG_U2WS_logout(o));
	return b;
}
function write_MSG_U2WS_logout(o){
	var b=[];
	return b
}
function read_MSG_U2WS_logout(b){
	var o={},r={};r.b=b;
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_settoken(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_settoken));
	b=b.concat(write_MSG_U2WS_settoken(o));
	return b;
}
function write_MSG_U2WS_settoken(o){
	var b=[];
	b=b.concat(write_byte(o.Token));
	return b
}
function read_MSG_U2WS_settoken(b){
	var o={},r={};r.b=b;
	r=read_byte(r.b);o.Token=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Getseccode(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Getseccode));
	b=b.concat(write_MSG_U2WS_Getseccode(o));
	return b;
}
function write_MSG_U2WS_Getseccode(o){
	var b=[];
	return b
}
function read_MSG_U2WS_Getseccode(b){
	var o={},r={};r.b=b;
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_Getseccode(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_Getseccode));
	b=b.concat(write_MSG_WS2U_Getseccode(o));
	return b;
}
function write_MSG_WS2U_Getseccode(o){
	var b=[];
	b=b.concat(write_byte(o.Img));
	return b
}
function read_MSG_WS2U_Getseccode(b){
	var o={},r={};r.b=b;
	r=read_byte(r.b);o.Img=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_Common_Head(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_Common_Head));
	b=b.concat(write_MSG_WS2U_Common_Head(o));
	return b;
}
function write_MSG_WS2U_Common_Head(o){
	var b=[];
	b=b.concat(write_string(o.Bbname));
	b=b.concat(write_string(o.Sitename));
	b=b.concat(write_string(o.Username));
	b=b.concat(write_string(o.Grouptitle));
	b=b.concat(write_string(o.Avatar));
	b=b.concat(write_int8(o.Portalcp));
	b=b.concat(write_int8(o.Admincp));
	b=b.concat(write_int8(o.Adminid));
	b=b.concat(write_int16(o.Groupid));
	b=b.concat(write_int8(o.Diy));
	b=b.concat(write_int32(o.Uid));
	b=b.concat(write_int8(o.Unread_num));
	b=b.concat(write_int8(o.Send_botton));
	b=b.concat(write_int32(o.Timestamp));
	return b
}
function read_MSG_WS2U_Common_Head(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Bbname=r.o
	r=read_string(r.b);
	o.Sitename=r.o
	r=read_string(r.b);
	o.Username=r.o
	r=read_string(r.b);
	o.Grouptitle=r.o
	r=read_string(r.b);
	o.Avatar=r.o
	r=read_int8(r.b);
	o.Portalcp=r.o
	r=read_int8(r.b);
	o.Admincp=r.o
	r=read_int8(r.b);
	o.Adminid=r.o
	r=read_int16(r.b);
	o.Groupid=r.o
	r=read_int8(r.b);
	o.Diy=r.o
	r=read_int32(r.b);
	o.Uid=r.o
	r=read_int8(r.b);
	o.Unread_num=r.o
	r=read_int8(r.b);
	o.Send_botton=r.o
	r=read_int32(r.b);
	o.Timestamp=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_Server_OK(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_Server_OK));
	b=b.concat(write_MSG_WS2U_Server_OK(o));
	return b;
}
function write_MSG_WS2U_Server_OK(o){
	var b=[];
	return b
}
function read_MSG_WS2U_Server_OK(b){
	var o={},r={};r.b=b;
	return {o:o,b:r.b}
}
