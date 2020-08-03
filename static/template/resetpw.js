if(cache.Head.Uid) location.href="/";
var strongpw = new Array();
var pwlength = 6;
function addFormEvent(formid, focus){
	var stmp = new Array();
	var si = 0;
	var formNode = $(formid).getElementsByTagName('input');
	for(i = 0;i < formNode.length;i++) {
		if(formNode[i].name == '') {
			formNode[i].name = formNode[i].id;
			stmp[si] = i;
			si++;
		}
		if(formNode[i].type == 'text' || formNode[i].type == 'password'){
			formNode[i].onfocus = function(){
				showInputTip(!this.id ? this.name : this.id);
			}
		}
	}
	if(!si) {
		return;
	}
	checkPwdComplexity(formNode[stmp[1]], formNode[stmp[2]]);
}

function checkPwdComplexity(firstObj, secondObj, modify) {
	modifypwd = modify || false;
	firstObj.onblur = function () {
		if(firstObj.value == '') {
			var pwmsg = !modifypwd ? '请填写密码' : profileTips;
			if(pwlength > 0) {
				pwmsg += ', 最小长度为 '+pwlength+' 个字符';
			}
			errormessage(firstObj.id, pwmsg);
		}else{
			errormessage(firstObj.id, !modifypwd ? 'succeed' : '');
		}
		checkpassword(firstObj.id, secondObj.id);
	};
	firstObj.onkeyup = function () {
		if(pwlength == 0 || $(firstObj.id).value.length >= pwlength) {
			var passlevels = new Array('','弱','中','强');
			var passlevel = checkstrongpw(firstObj.id);
			errormessage(firstObj.id, '<span class="passlevel passlevel'+passlevel+'">密码强度:'+passlevels[passlevel]+'</span>');
		}
	};
	secondObj.onblur = function () {
		if(secondObj.value == '') {
			errormessage(secondObj.id, !modifypwd ? '请再次输入密码' : profileTips);
		}
		checkpassword(firstObj.id, secondObj.id);
	};
}


function checkstrongpw(id) {
	var passlevel = 0;
	if($(id).value.match(/\d+/g)) {
		passlevel ++;
	}
	if($(id).value.match(/[a-z]+/ig)) {
		passlevel ++;
	}
	if($(id).value.match(/[^a-z0-9]+/ig)) {
		passlevel ++;
	}
	return passlevel;
}
function showInputTip(id) {
	var p_tips = $('lostpwform').getElementsByTagName('i');
	for(i = 0;i < p_tips.length;i++){
		if(p_tips[i].className == 'p_tip'){
			p_tips[i].style.display = 'none';
		}
	}
	if($('tip_' + id)) {
		$('tip_' + id).style.display = 'block';
	}
}



function trim(str) {
	return str.replace(/^\s*(.*?)[\s\n]*$/g, '$1');
}




function checkpassword(id1, id2) {
	if(!$(id1).value && !$(id2).value) {
		return;
	}
	if(pwlength > 0) {
		if($(id1).value.length < pwlength) {
			errormessage(id1, '密码太短，不得少于 '+pwlength+' 个字符');
			return;
		}
	}
	if(strongpw) {
		var strongpw_error = false, j = 0;
		var strongpw_str = new Array();
		for(var i in strongpw) {
			if(strongpw[i] === 1 && !$(id1).value.match(/\d+/g)) {
				strongpw_error = true;
				strongpw_str[j] = '数字';
				j++;
			}
			if(strongpw[i] === 2 && !$(id1).value.match(/[a-z]+/g)) {
				strongpw_error = true;
				strongpw_str[j] = '小写字母';
				j++;
			}
			if(strongpw[i] === 3 && !$(id1).value.match(/[A-Z]+/g)) {
				strongpw_error = true;
				strongpw_str[j] = '大写字母';
				j++;
			}
			if(strongpw[i] === 4 && !$(id1).value.match(/[^A-Za-z0-9]+/g)) {
				strongpw_error = true;
				strongpw_str[j] = '特殊符号';
				j++;
			}
		}
		if(strongpw_error) {
			errormessage(id1, '密码太弱，密码中必须包含 '+strongpw_str.join('，'));
			return;
		}
	}
	errormessage(id2);
	if($(id1).value != $(id2).value) {
		errormessage(id2, '两次输入的密码不一致');
	} else {
		errormessage(id2, !modifypwd ? 'succeed' : '');
	}
}
function errormessage(id, msg) {
	if($(id)) {
		try{
			showInputTip();
		} catch (e) {}
		msg = !msg ? '' : msg;
		if($('tip_' + id)) {
			if(msg == 'succeed') {
				msg = '';
				$('tip_' + id).parentNode.className = $('tip_' + id).parentNode.className.replace(/ p_right/, '');
				$('tip_' + id).parentNode.className += ' p_right';
			} else if(msg !== '') {
				$('tip_' + id).parentNode.className = $('tip_' + id).parentNode.className.replace(/ p_right/, '');
			}
		}
		if($('chk_' + id)) {
			$('chk_' + id).innerHTML = msg;
		}
		$(id).className = $(id).className.replace(/ er/, '');
		$(id).className += !msg ? '' : ' er';
	}
}
updateseccode('seccode_resetpw',sceneResetpw)

$('#lostpwform').unbind().submit(function(event) {
	if($('input[name="seccode_resetpw"]').val()==""){
		showDialog("请完成验证");
		return false;
	}
	ajax_post(WRITE_MSG_U2WS_LostPW({
		Name: $('#lostpw_email2').val(),
		Seccode: $('input[name="seccode_resetpw"]').val()
	}));
	return false;
});
if(GET('Step')==2 && GET('Email')!=""){
	$('#lostpw_email2').val(GET('Email'));
	bindstep2()	
}
function bindstep2(){
	$("#lostpw_email2").attr("disabled","disabled");
	$('.seccode').hide();
	$('.rfm').show()
	addFormEvent('lostpwform',0);
	$('#lostpwform').unbind().submit(function(event) {
		if($('#passwd2').val()!=$('#passwd').val()){
			showDialog("两次输入的密码不一致");
			return false;
		}
		var passsalt=CryptoJS.MD5($('#emailseccode').val()).toString();
		ajax_post(WRITE_MSG_U2WS_ResetPW({
			Name: $('#lostpw_email2').val(),
			Passwd: aes_encrypt($('#emailseccode').val()+CryptoJS.MD5($('#passwd2').val()+passsalt).toString(),passsalt,CryptoJS.MD5($('#lostpw_email2').val()).toString())
		}));
		return false;
	});
}
websocket_func[CMD_MSG_WS2U_ResetPW]=function(res){
	showDialog('请使用新密码登录',"right","修改成功",function(){showWindowEx('login')});
}
websocket_func[CMD_MSG_WS2U_LostPW]=function(res){
	if(res.Result==1){
		showDialog("我们已经向您的绑定邮箱"+res.Email+"发送了一封 验证码邮件，请您在3分钟内输入收到的验证码",'notice')
		var url=location.href.replace('&Step=2','')+"&Step=2";
		url=url.replace(/&Email=[^&]+/,'')+"&Email="+encodeURIComponent(res.Email);
		history.pushState(h5state, document.title,url )
		bindstep2()
	}else{
		if(err[res.Result]==undefined){
			showDialog("未知错误: "+res.Result);
		}else{
			showDialog(err[res.Result],"alert","登录失败");
		}
		updateseccode('seccode_resetpw',sceneResetpw)
	}
}