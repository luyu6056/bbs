
if (cache.Head.Uid) {
	tpl_load("forum_index", WRITE_MSG_U2WS_forum_index, {})
} else {
	document.title = "绑定已有账号 - " + cache.Head.Bbname
}
websocket_func[CMD_MSG_WS2U_BindAccount]=function(res){
	if(res.Result!=1){
		f=function(){
			tpl_load("login")
		}
		if (err[res.Result] == undefined) {
			showDialog("未知错误: " + res.Result, "alert", "登录失败",f);
		} else {
			showDialog(err[res.Result], "alert", "登录失败",f);
		}
		return
	}
	$('#bind_avatar').attr('src', res.Img);
	$('#bind_nickname').text(res.Nickname)
}
switch(GET('Type')){
	case "QQ":
		ajax_post(WRITE_MSG_U2WS_BindAccount({Type:GET('Type'),Openid:GET("Openid"),State:GET('State'),Access_token:GET("Access_token")}))
	break;
	default:
	tpl_load("login")
}
$('#bindaccount').submit(function(event) {
	checkseccode(sceneBind,function(token){
		seccode_scene[sceneBind].reset()
		name = $('input[name="bindusername"]').val();
		websocket_func[CMD_MSG_WS2U_Login_Gethash] = function(res) {
			var pwd = CryptoJS.SHA256(CryptoJS.MD5($('input[name="bindpasswd"]').val()+res.Hash2).toString()+res.Hash).toString();
			websocket_func[CMD_MSG_WS2U_UserLogin] = function(res) {
				if (res.Result == 1) {
					token=[];
					str=""
					for(var i=0;i<res.Token.length;i++){
						str+=String.fromCharCode(res.Token[i])
						token.push(res.Token[i])
					}
					saveUserdata('token',str);
					href = '/index.html';
					if(loadUserdata('login_ref')){
						var match = loadUserdata('login_ref').match(/tpl=([^&]+)/),href = '';
						if (match) {
							match[1] == 'login' ? href = '/index.html': href = '/index.html' + loadUserdata('login_ref');
						}
					}
					cache.Head = res.Head;
					setHead(cache.Head)
					setTimeout("window.location.href ='"+$('bind_succeedmessage').href+"';", 3000);
					$('bind_succeedmessage').href = href;
					$('.mn').hide();
					$('bind_succeed').style.display = '';
					cache.Head = res.Head;
					$('bindsucceedlocation').innerHTML = '欢迎您回来，' + res.Head.Grouptitle + ' ' + res.Head.Username + '，现在将转入登录前页面';
				} else {
					if (err[res.Result] == undefined) {
						showDialog("未知错误: " + res.Result);
					} else {
						showDialog(err[res.Result], "alert", "登录失败");
					}
				}
			}
			ajax_post(WRITE_MSG_U2WS_UserLogin({
				Username: name,
				Passwd: pwd,
				Seccode: token,
				Type:GET('Type'),
				Openid:GET("Openid"),
				State:GET('State'),
				Access_token:GET("Access_token"),
			}))
		}
		ajax_post(WRITE_MSG_U2WS_Login_Gethash({
			Name: name
		}));
	});
	return false;
});

