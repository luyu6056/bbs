
if (typeof seditor_menu != "function") {
    $('#tpl_html').append('<script src="/static/js/seditor.js?t=?" type="text/javascript"><\/script>')
}
if (typeof showauthor != "function") {
    $('#tpl_html').append('<script src="/static/js/forum_viewthread.js?t=?" type="text/javascript"><\/script>')
}
if (typeof fastpostvalidate != "function") {
    $('#tpl_html').append('<script src="/static/js/forum.js?t=?" type="text/javascript"><\/script>')
}
modclickcount=0

var postcount = 0;
var post_html = template("tpl_forum_post", {
    data: tpldata,
    cache:cache,
    postcount:postcount,
});
$('#postlistreply').before(post_html);
smilies_show('fastpostsmiliesdiv', cache.smcols, 'fastpost');
if (tpldata.Forum.Picstyle && (tpldata.Forum.Ismoderator || cache.Head.Uid == tpldata.Thread.Authorid)) {
    function showsetcover(obj) {
        if (obj.parentNode.id == 'postmessage_' + tpldata.Forum_firstpid) {
            var defheight = cache.forumpicstyle.thumbheight;
            var defwidth = cache.forumpicstyle.thumbwidth;
            var newimgid = 'showcoverimg';
            var imgsrc = obj.src ? obj.src : obj.file;
            if (!imgsrc) return;

            var tempimg = new Image();
            tempimg.src = imgsrc;
            if (tempimg.complete) {
                if (tempimg.width < defwidth || tempimg.height < defheight) return;
            } else {
                return;
            }
            if ($(newimgid) && obj.id != newimgid) {
                $(newimgid).id = 'img' + Math.random();
            }
            if ($(newimgid + '_menu')) {
                var menudiv = $(newimgid + '_menu');
            } else {
                var menudiv = document.createElement('div');
                menudiv.className = 'tip tip_4 aimg_tip';
                menudiv.id = newimgid + '_menu';
                menudiv.style.position = 'absolute';
                menudiv.style.display = 'none';
                obj.parentNode.appendChild(menudiv);
            }
            menudiv.innerHTML = '<div class="tip_c xs0"><a onclick="showWindow(\'setcover_' + newimgid + '\', this.href)" href="forum.php?mod=ajax&amp;action=setthreadcover&amp;tid=' + tpldata.Thread.Tid + '&amp;pid=' + data.Forum_firstpid + '&amp;fid=' + data.Fid + '&amp;imgurl=' + imgsrc + '">设为封面</a></div>';
            obj.id = newimgid;
            showMenu({
                'ctrlid': newimgid,
                'pos': '12'
            });
        }
        return;
    }
}

function succeedhandle_followmod(url, msg, values) {
        var fObj = $('followmod_' + values['fuid']);
        if (values['type'] == 'add') {
            fObj.innerHTML = '不收听';
            fObj.href = 'home.php?mod=spacecp&ac=follow&op=del&fuid=' + values['fuid'];
        } else if (values['type'] == 'del') {
            fObj.innerHTML = '收听TA';
            fObj.href = 'home.php?mod=spacecp&ac=follow&op=add&hash=&fuid=' + values['fuid'];
        }
    }


if ((tpldata.Modmenu >> 0 & 1) == 1) {
    $('modmenu').lastChild.style.visibility = 'hidden';
    $('modmenu2').innerHTML=$('modmenu').innerHTML;
}

var disablepostctrl = (tpldata.Group_status >> 7 & 1) == 1
if (tpldata.Thread.Special == 5 && tpldata.Firststand == 0) {
    simulateSelect('stand');
}

if ((tpldata.Group_status >> 11 & 1) == 1 && (typeof extrafunc_atMenu != "function")) {
    $('#tpl_html').append('<script src="/static/js/at.js?t=?" type="text/javascript"><\/script>')
}
if ((tpldata.Group_status >> 8 & 1) == 1 && GET('From') != 'preview') {


}
if (GET('Ordertype') != 1 && GET('From') == '') {
    if (getcookie('fastpostrefresh') == 1) {
        $('fastpostrefresh').checked = true;
    }
}


function fastpostsubmit(){
  
        checkseccode(scenePost,function(token){
            seccode_scene[scenePost]=token
            var obj={}
            obj.Tid=tpldata.Thread.Tid;
            obj.Message=$('#fastpostmessage').val();
            obj.Seccode=token;
            obj.Other=0;
            if($('#fastpostrefresh').prop('checked')){
                obj.Other=1;
            }
            ajax_post(WRITE_MSG_U2WS_threadfastpost(obj))
        });
   
    
}
function ElevatorDirect(floor){
	if(floor<=cache.postperpage){
		if($('#post_'+floor).offset()){
			window.scrollTo(0,$('#post_'+floor).offset().top);
			return 
		}else{
			showDialog('本帖最高'+tpldata.Postlist.length+'层')
		}
	}else{
		tpl_load('forum_viewthread',WRITE_MSG_U2WS_forum_viewthread,{Tid:GET('Tid'),Page:Math.ceil(floor/cache.postperpage),Position:floor});
	}
}
$('.pgt').eq(1).html($('.pgt').eq(0).html())
function nextnewset(next){
	ajax_post(WRITE_MSG_U2WS_nextset({Next:next,Tid:GET('Tid')}))
    websocket_func[CMD_MSG_WS2U_nextset]=function(res){
        if(res.Tid==0){
            if(next==1){
                showDialog('抱歉，没有比当前更新的主题')
            }else{
                showDialog('抱歉，没有比当前更老的主题')
            }
        }else{
            tpl_load('forum_viewthread',WRITE_MSG_U2WS_forum_viewthread,{Tid:res.Tid});
        }
    }
}


if(GET('Position')>0){
    setTimeout(function () {window.scrollTo(0, $('#post_'+GET('Position')).offset().top);}, 100);
}
if(GET('Position')==-1){
    setTimeout(function () {window.scrollTo(0, $('#post_'+tpldata.Postlist[tpldata.Postlist.length-1].Position).offset().top);}, 100);
}
websocket_func[CMD_MSG_WS2U_threadfastpost]=function(res){
    if(res.Result==1){
        seccode_scene[scenePost]=undefined;
        $('.shade').hide();
        if(res.Add_info){
            var newtpldata=tpldata;
            newtpldata.Postlist=[res.Add_info];
            var post_html = template("tpl_forum_post", {
                data: tpldata,
                cache:cache,
                postcount:-1,
            });
            $('#postlistreply').before(post_html);
            $('fastpostsubmit').disabled=false;
            $('#fastpostmessage').val("");
            window.scrollTo(0,$("#post_"+res.Add_info.Position).offset().top);

        }else{
            tpl_load('forum_viewthread',WRITE_MSG_U2WS_forum_viewthread,{Tid:GET('Tid'),Page:res.Page});
        }

       
    }else{
        $('fastpostsubmit')?$('fastpostsubmit').disabled=false:null; 
        if(err[res.Result]==undefined){
            showDialog("未知错误: "+res.Result);
        }else{
            f=function(){}
            if(res.Err_url){
                if(res.Err_url.match("html")){
                    f=function(){
                        location.href=res.Err_url;
                    }
                }else{
                    showDialog(res.Err_url,"alert","请求失败",f);
                    return
                }
            }
            showDialog(err[res.Result],"alert","请求失败",f);
        }
    }
}
function share(stype){
    var pic=encodeURIComponent(document.location.origin+'/template/zvis_6_ui/src/logo.png'),url=encodeURIComponent(document.location.href),title=encodeURIComponent(tpldata.Thread.Subject);
    switch(stype){
        case 'qq':
        window.open('http://connect.qq.com/widget/shareqq/index.html?url='+url+'&sharesource=qzone&title='+title+'&pics='+pic+'&summary='+tpldata.Thread.Cutmessage+'&desc=分享自 '+cache.Head.Bbname);
        break;
        case 'qzone':
        window.open('https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+url+'&sharesource=qzone&title='+title+'&pics='+pic+'&summary='+tpldata.Thread.Cutmessage);
        break;
    }
}
document.title=tpldata.Thread.Subject+' - '+tpldata.Name+' - '+cache.Head.Bbname
websocket_func[CMD_MSG_WS2U_RecommendThread]=function(res){
    if(res.Result==1){
        showPrompt(null, null, '<div id="creditpromptdiv"><i>'+(res.Status?"支持":"反对")+'成功</i>评价指数'+res.Recommend+'</div>', 3000)
        if(res.Recommend_add>0){
            $('#recommendv_add').show().text(res.Recommend_add);
            $('#recommendv_add').parents('a').addClass("already");
        }
        if(res.Recommend_sub>0){
            $('#recommendv_subtract').show().text(res.Recommend_sub);
            $('#recommendv_subtract').parents('a').addClass("already")
        }
    }else{
        if(err[res.Result]==undefined){
            showError("操作失败,未知错误: "+res.Result);
        }else{
            showError("操作失败 "+err[res.Result]);
        }
    }
}
$('#poll').submit(function(event) {
    var obj={};
    obj.Tid=tpldata.Thread.Tid;
    obj.Ids=[];
    $('input[name="pollanswers[]"]').each(function(index, el) {
        if($(this).prop('checked')) obj.Ids.push($(this).val());
    });
    if(obj.Ids.length==0){
        showDialog("请至少选择一个选项");
        return false;
    }
    ajax_post(WRITE_MSG_U2WS_PollThread(obj))
    return false;
});
websocket_func[CMD_MSG_WS2U_PollThread_sucess]=function(res){
    reload();
} 

 