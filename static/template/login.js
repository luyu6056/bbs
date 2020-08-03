websocket_func[CMD_MSG_WS2U_ChangeBind]=function(res){
	var match = loadUserdata('login_ref').match(/tpl=([^&]+)/),href = '';
	if (match) {
		match[1] == 'login' ? href = '/index.html': href = '/index.html' + loadUserdata('login_ref');
	} else {
		href = '/index.html';
	}
	f=function(){
		location.href=href;
	}
	if(res.Result!=1){
		if (err[res.Result] == undefined) {
			showDialog("未知错误: " + res.Result, "alert", "绑定失败",f);
		} else {
			showDialog(err[res.Result], "alert", "绑定失败",f);
		}
		return
	}
	showDialog(res.Msg,"notice","绑定成功",f)
}

	
if (cache.Head.Uid && GET('Type')=="") {
	tpl_load("forum_index", WRITE_MSG_U2WS_forum_index, {})
} else {
	document.title = "登录 - " + cache.Head.Bbname
	$('#loginform2').submit(function(event) {
	checkseccode(sceneLogin,function(sectoken){
		name = $('input[name="loginusername"]').val();
		websocket_func[CMD_MSG_WS2U_Login_Gethash] = function(res) {
			seccode_scene[sceneLogin].reset()
			var pwd = CryptoJS.SHA256(CryptoJS.MD5($('input[name="loginpasswd"]').val()+res.Hash2).toString()+res.Hash).toString();
			websocket_func[CMD_MSG_WS2U_UserLogin] = function(res) {
				if (res.Result == 1) {
					token=[];
					str=""
					for(var i=0;i<res.Token.length;i++){
						str+=String.fromCharCode(res.Token[i])
						token.push(res.Token[i])
					}
					saveUserdata('token',str);
					var match = loadUserdata('login_ref').match(/tpl=([^&]+)/),href = '';
					if (match) {
						match[1] == 'login' ? href = '/index.html': href = '/index.html' + loadUserdata('login_ref');
					} else {
						href = '/index.html';
					}
					cache.Head = res.Head;
					setHead(cache.Head)
					setTimeout("window.location.href ='"+href+"';", 3000);
					$('login_succeedmessage').href = href;
					$('.mn').hide();
					$('login_succeed').style.display = '';
					cache.Head = res.Head;
					$('loginsucceedlocation').innerHTML = '欢迎您回来，' + res.Head.Grouptitle + ' ' + res.Head.Username + '，现在将转入登录前页面';
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
				Seccode: sectoken,
			}))
		}
		ajax_post(WRITE_MSG_U2WS_Login_Gethash({
			Name: name
		}));
	});
	return false;
});
loginreload=function(){
	history.pushState(h5state, null, document.location.href.replace('&Type=QQ','').replace(/&Code=[^&]+/,'').replace(/&State=[^&]+/,''));
	reload();
}
if(GET('Type')=='QQ'){
	jQuery.ajax({
		url:'https://graph.qq.com/oauth2.0/me',
		type:'get',
		data:{'access_token':GET('access_token')},
		dataType: "jsonp",
		jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
		jsonpCallback:"callback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以不写这个参数，jQuery会自动为你处理数据
		success: function(data){
		if(data.error){
			showDialog("请重新登录，错误代码<br>"+data.error, "alert", "登录失败",loginreload);
			return;
		}
		if(!data.client_id || !data.openid){
			showDialog("无法登录,请截图联系管理员,原因:无法获取client_id和openid", "alert", "QQ登录失败",loginreload);
			return;
		}
		if(cache.Head.Uid){
			ajax_post(WRITE_MSG_U2WS_ChangeBind({
				Type:GET('Type'),
				Openid:data.openid,
				State:GET('state'),
				Access_token:GET("access_token"),
			}))
		}else{
			ajax_post(WRITE_MSG_U2WS_QQLogin({
			State:GET('state'),
			Openid:data.openid,
		}));
		}
		
	}});
}

websocket_func[CMD_MSG_WS2U_QQLogin] = function(res) {
	console.log(res)
	if (res.Result == 1) {
		if(res.Head.Uid){
			cache.Head = res.Head;
			setHead(cache.Head)
			var match = loadUserdata('login_ref').match(/tpl=([^&]+)/),href = '';
			if (match) {
				match[1] == 'login' ? href = '/index.html': href = '/index.html' + loadUserdata('login_ref');
			} else {
				href = '/index.html';
			}
			setTimeout("window.location.href ='"+href+"';", 3000);
			$('login_succeedmessage').href = href;
			$('.mn').hide();
			$('login_succeed').style.display = '';
			$('loginsucceedlocation').innerHTML = '欢迎您回来，' + res.Head.Grouptitle + ' ' + res.Head.Username + '，现在将转入登录前页面';
		}else{
			tpl_load("bindaccount", WRITE_MSG_U2WS_tpl_success, {Type:"QQ",Openid:res.Openid,State:GET('state'),Access_token:GET('access_token')})
		}
		
	} else {
		
		if (err[res.Result] == undefined) {
			showDialog("未知错误: " + res.Result, "alert", "登录失败",loginreload);
		} else {
			showDialog(err[res.Result], "alert", "登录失败",loginreload);
		}

	}
}
}