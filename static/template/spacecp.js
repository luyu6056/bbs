if (typeof seditor_menu != "function") {
    $('#tpl_html').append('<script src="/static/js/seditor.js?t=?" type="text/javascript"><\/script>')
}
if (typeof checkPwdComplexity != "function") {
    $('#tpl_html').append('<script src="/static/js/register.js" type="text/javascript"><\/script>')
}
if (typeof uploadAvatarDone != "function") {
    $('#tpl_html').append('<script src="/static/avatar/avatar.js" type="text/javascript"><\/script>')
    $('#tpl_html').append('<script src="/static/avatar/jquery-ui.min.js" type="text/javascript"><\/script>')
}
var strongpw = new Array();
var pwlength = 6;
checkPwdComplexity($('newpassword'), $('newpassword2'), true);
forumallowhtml = 0,allowhtml = 0,allowsmilies = 0,allowbbcode = tpldata.Allow>>2&1,allowimgcode =tpldata.Allow>>3&1;var DISCUZCODE = [];DISCUZCODE['num'] = '-1';DISCUZCODE['html'] = [];
function show_error(fieldid, extrainfo) {
    var elem = $('th_' + fieldid);
    if (elem) {
        elem.className = "rq";
        fieldname = elem.innerHTML;
        extrainfo = (typeof extrainfo == "string") ? extrainfo: "";
        $('showerror_' + fieldid).innerHTML = "请检查该资料项 " + extrainfo;
        $(fieldid).focus();
    }
}
function show_success(message) {
    message = message == '' ? '资料更新成功': message;
    showDialog(message, 'right', '提示信息',
    function() {
        top.window.location.href = top.window.location.href;
    },
    0, null, '', '', '', '', 3);
}
function clearErrorInfo() {
    var spanObj = $('profilelist').getElementsByTagName("div");
    for (var i in spanObj) {
        if (typeof spanObj[i].id != "undefined" && spanObj[i].id.indexOf("_")) {
            var ids = explode('_', spanObj[i].id);
            if (ids[0] == "showerror") {
                spanObj[i].innerHTML = '';
                $('th_' + ids[1]).className = '';
            }
        }
    }
}
$('.appl ul li a').click(function(event) {
    $('.appl ul li').removeClass('a');
    $(this).parent().addClass('a');
    var id=$(this).attr('name');
    $('.mn .right').hide();
    $('#'+id).show();
    history.replaceState(h5state, document.title, location.href.replace(/&Ac=[^&]+/,'')+"&Ac="+id);
    changeAc()
});
$('#form_profile').submit(function(event) {
    var obj={};
    obj.Mobile=$('input[name="mobile"]').val();
    obj.Qq=$('input[name="qq"]').val();
    obj.webSite=$('input[name="site"]').val();
    obj.Sightml=$('textarea[name="sightml"]').val();
    obj.Customstatus=$('input[name="customstatus"]').val();
    ajax_post(WRITE_MSG_U2WS_Edit_Profile(obj))
    return false;
});
function changeAc(){
    switch(GET("Ac")){
        case "usergroup":
        get_mygroup(GET('Gid'));
        break;
        case "forum":
        get_forum()
        break;
        case "password":
        break;
        case "thread":
        ajax_post(WRITE_MSG_U2WS_GetThreadBind({}));
        break;
    }
}
websocket_func[CMD_MSG_WS2U_GetThreadBind]=function(res){
    for(var i in res.Thread){
        var t=res.Thread[i];
        switch(t.Name){
            case "QQ":
            $('#qq_bind').html('<div style="text-align: center;"><div ><img src="'+t.Img+'"/></div><div><span>'+t.Nickname+'</span></div></div>');
            break;
        }
    }
}
changeAc()
function get_mygroup(other_group){
    websocket_func[CMD_MSG_WS2U_SpacecpGroup]=function(res){
        var html = template("tpl_spacecp_usergroup", {
            data: res,
            cache:cache,
        });
        $('#other_group').parent().hide();
        $('#tba').hide();
        $('#my_group').removeClass("tfx").addClass('tfxf');
        $('#my_group').html(html);
        $('#my_group .c0 h4').text("我的主用户组 - "+res.Grouptitle)
        if(other_group) get_group(other_group);
        
    }
    ajax_post(WRITE_MSG_U2WS_SpacecpGroup({Groupid:cache.Head.Groupid}))
}
function get_group(group_id){
    websocket_func[CMD_MSG_WS2U_SpacecpGroup]=function(res){
        var html = template("tpl_spacecp_usergroup", {
            data: res,
            cache:cache,
        });
        $('#my_group').removeClass("tfxf").addClass('tfx');
        $('#other_group').parent().show();
        $('#other_group').html(html);
        $('#tba #c3').text("用户组 - "+res.Grouptitle);
        $('#tba').show();
        $('#other_group .c0 h4').parents("tbody").remove();
    }
    ajax_post(WRITE_MSG_U2WS_SpacecpGroup({Groupid:group_id})) 
}
websocket_func[CMD_MSG_WS2U_SpacecpForum]=function(res){
    var html = template("tpl_spacecp_forum", {
        data: res,
        cache:cache,
    });
    $('#forum_tbody').html(html);
}
function get_forum(){
    ajax_post(WRITE_MSG_U2WS_SpacecpForum())
}
$('#password_form').submit(function(event) {
    if($("#oldpassword").val()==""){
        showDialog("请输入旧密码")
        return false;
    }
    if($('#newpassword').val()!=""){
        if($('#newpassword').val()!=$('#newpassword2').val()){
            showDialog("两次输入的密码不一致")
            return false;
        }
        if($('#newpassword').val().length<6){
            showDialog("密码太短")
            return false;
        }
    }
    checkseccode(sceneChangepw,function(token){
        ajax_post(WRITE_MSG_U2WS_ChangePasswd_Gethash({Seccode:token}))
    })
    websocket_func[CMD_MSG_WS2U_ChangePasswd_Gethash]=function(res){
        var obj={},pass=CryptoJS.MD5($('#oldpassword').val()+res.Hash2).toString();
        obj.Passwd=CryptoJS.SHA256(pass+res.Hash).toString();
        obj.Newpwd=aes_encrypt(CryptoJS.MD5($('#newpassword').val()+res.Hash3).toString(),pass,res.Hash3);       
        obj.Email=$('#emailnew').val();
        ajax_post(WRITE_MSG_U2WS_ChangePasswd(obj))
    }
    return false;
});
$('#email_form').submit(function(event) {
    if($("#emailpassword").val()==""){
        showDialog("请输入旧密码")
        return false;
    }
    checkseccode(sceneChangepw,function(token){
        ajax_post(WRITE_MSG_U2WS_ChangePasswd_Gethash({Seccode:token}))
    })
    websocket_func[CMD_MSG_WS2U_ChangePasswd_Gethash]=function(res){
        var hash = res.Hash,time = res.Time;
        if (hash.length < 36) {
            showDialog("系统错误，请联系管理员")
            return false;
        } 
        var obj={};
        obj.Passwd=l_c(cache.Head.Username,$('#emailpassword').val(),hash,time);
        obj.Email=$('#emailnew').val();
        ajax_post(WRITE_MSG_U2WS_ChangePasswd(obj))
    }
    return false;
});

function changeQQbind(){
    checkseccode(sceneChangepw,function(token){
        ajax_post(WRITE_MSG_U2WS_ChangePasswd_Gethash({Seccode:token}))
    })
    websocket_func[CMD_MSG_WS2U_ChangePasswd_Gethash]=function(res){
        var hash = res.Hash,time = res.Time;
        if (hash.length < 36) {
            showDialog("系统错误，请联系管理员")
            return false;
        } 
        ajax_post(WRITE_MSG_U2WS_GetChangeBindUrl({Passwd:l_c(cache.Head.Username,$('input[name="threadpassword"]').val(),hash,time),Type:"QQ"}))
    }
}
websocket_func[CMD_MSG_WS2U_GetChangeBindUrl]=function(res){
    switch(res.Type){
        case "QQ":
        location.href=res.Url;
        break;
    }
}
