
if (typeof saveData != "function") {
    $('#tpl_html').append('<script src="/static/js/forum.js?t=?" type="text/javascript"><\/script>')
}
if (typeof modaction != "function") {
    $('#tpl_html').append('<script src="/static/js/forum_moderate.js?t=?" type="text/javascript"><\/script>')
}

if (GET('Orderby') == 'hot') {
    $('#tpl_html').append('<script src="/static/js/calendar.js?t=?" type="text/javascript"><\/script>')
}
var listcolspan = (tpldata.Allow>>0&1 == 1 ? 6 : 5);
document.title = tpldata.Name + " - " + cache.Head.Bbname
if (tpldata.Livethread) {
    var disablepostctrl = tpldata.Group_status>>0&1;
    var replycontentlist = new Array();
    var addreplylist = new Array();
    var timeoutid = timeid = movescrollid = waitescrollid = null;
    var replycontentnum = 0;
    getnewlivepostlist(1);
    timeid = setInterval(getnewlivepostlist, 5000);
    $('livereplycontent').style.position = 'absolute';
    $('livereplycontent').style.width = ($('livereplycontentout').clientWidth - 50) + 'px';
    $('livereplymessage').onfocus = function() {
        if (this.style.color == 'gray') {
            this.value = '';
            this.style.color = 'black';
            $('livepostsubmit').style.display = 'block';
            this.style.height = '56px';
            $('livefastcomment').style.height = '57px';
        }
    };
    $('livereplymessage').onblur = function() {
        if (this.value == '') {
            this.style.color = 'gray';
            this.value = '#在这里快速回复#';
        }
    };

    $('liverefresh').onclick = function() {
        $('livereplycontent').style.position = 'absolute';
        getnewlivepostlist();
        this.style.display = 'none';
    };

    $('livereplycontentout').onmouseover = function(e) {

        if ($('livereplycontent').style.position == 'absolute' && $('livereplycontent').clientHeight > 215) {
            $('livereplycontent').style.position = 'static';
            this.scrollTop = this.scrollHeight;
        }

        if (this.scrollTop + this.clientHeight != this.scrollHeight) {
            clearInterval(timeid);
            clearTimeout(timeoutid);
            clearInterval(movescrollid);
            timeid = timeoutid = movescrollid = null;

            if (waitescrollid == null) {
                waitescrollid = setTimeout(function() {
                    $('liverefresh').style.display = 'block';
                }, 60000 * 10);
            }
        } else {
            clearTimeout(waitescrollid);
            waitescrollid = null;
        }
    };

    $('livereplycontentout').onmouseout = function(e) {
        if (this.scrollTop + this.clientHeight == this.scrollHeight) {
            $('livereplycontent').style.position = 'absolute';
            clearInterval(timeid);
            timeid = setInterval(getnewlivepostlist, 10000);
        }
    };

    function getnewlivepostlist(first) {
        var x = new Ajax('JSON');
        x.getJSON('forum.php?mod=misc&action=livelastpost&fid='+tpldata.Livethread.Fid, function(s, x) {
                var count = s.data.count;
                $('livereplies').innerHTML = count;
                var newpostlist = s.data.list;
                for (i in newpostlist) {
                    var postid = i;
                    var postcontent = '';
                    postcontent += newpostlist[i].authorid ? '<dt><a href="home.php?mod=space&amp;uid=' + newpostlist[i].authorid + '" target="_blank">' + newpostlist[i].avatar + '</a></dt>' : '<dt></dt>';
                    postcontent += newpostlist[i].authorid ? '<dd><a href="home.php?mod=space&amp;uid=' + newpostlist[i].authorid + '" target="_blank">' + newpostlist[i].author + '</a></dd>' : '<dd>' + newpostlist[i].author + '</dd>';
                    postcontent += '<dd>' + htmlspecialchars(newpostlist[i].message) + '</dd>';
                    postcontent += '<dd class="dateline">' + newpostlist[i].dateline + '</dd>';
                    if (replycontentlist[postid]) {
                        $('livereply_' + postid).innerHTML = postcontent;
                        continue;
                    }
                    addreplylist[postid] = '<dl id="livereply_' + postid + '">' + postcontent + '</dl>';
                }
                if (first) {
                    for (i in addreplylist) {
                        replycontentlist[i] = addreplylist[i];
                        replycontentnum++;
                        var div = document.createElement('div');
                        div.innerHTML = addreplylist[i];
                        $('livereplycontent').appendChild(div);
                        delete addreplylist[i];
                    }
                } else {
                    livecontentfacemove();
                }
            });
    }

    function livecontentfacemove() {
        //note 从队列中取出数据
        var reply = '';
        for (i in addreplylist) {
            reply = replycontentlist[i] = addreplylist[i];
            replycontentnum++;
            delete addreplylist[i];
            break;
        }
        if (reply) {
            var div = document.createElement('div');
            div.innerHTML = reply;
            var oldclientHeight = $('livereplycontent').clientHeight;
            $('livereplycontent').appendChild(div);
            $('livereplycontentout').style.overflowY = 'hidden';
            $('livereplycontent').style.bottom = oldclientHeight - $('livereplycontent').clientHeight + 'px';

            if (replycontentnum > 20) {
                $('livereplycontent').removeChild($('livereplycontent').firstChild);
                for (i in replycontentlist) {
                    delete replycontentlist[i];
                    break;
                }
                replycontentnum--;
            }

            if (!movescrollid) {
                movescrollid = setInterval(function() {
                    if (parseInt($('livereplycontent').style.bottom) < 0) {
                        $('livereplycontent').style.bottom =
                            ((parseInt($('livereplycontent').style.bottom) + 5) > 0 ? 0 : (parseInt($('livereplycontent').style.bottom) + 5)) + 'px';
                    } else {
                        $('livereplycontentout').style.overflowY = 'auto';
                        clearInterval(movescrollid);
                        movescrollid = null;
                        timeoutid = setTimeout(livecontentfacemove, 1000);
                    }
                }, 100);
            }
        }
    }

    function livereplypostvalidate(theform) {
        var s;
        if (theform.message.value == '' || $('livereplymessage').style.color == 'gray') {
            s = '抱歉，您尚未输入内容';
        }
        if (!disablepostctrl && ((postminchars != 0 && mb_strlen(theform.message.value) < postminchars) || (postmaxchars != 0 && mb_strlen(theform.message.value) > postmaxchars))) {
            s = '您的帖子长度不符合要求。\n\n当前长度: ' + mb_strlen(theform.message.value) + ' 字节\n系统限制: ' + postminchars + ' 到 ' + postmaxchars + ' 字节';
        }
        if (s) {
            showError(s);
            doane();
            $('livereplysubmit').disabled = false;
            return false;
        }
        $('livereplysubmit').disabled = true;
        theform.message.value = theform.message.value.replace(/([^>=\]"'\/]|^)((((https?|ftp):\/\/)|www\.)([\w\-]+\.)*[\w\-\u4e00-\u9fa5]+\.([\.a-zA-Z0-9]+|\u4E2D\u56FD|\u7F51\u7EDC|\u516C\u53F8)((\?|\/|:)+[\w\.\/=\?%\-&~`@':+!]*)+\.(jpg|gif|png|bmp))/ig, '$1[img]$2[/img]');
        theform.message.value = parseurl(theform.message.value);
        ajaxpost('livereplypostform', 'livereplypostreturn', 'livereplypostreturn', 'onerror', $('livereplysubmit'));
        return false;
    }

    function succeedhandle_livereplypost(url, msg, param) {
        $('livereplymessage').value = '';
        $('livereplycontent').style.position = 'absolute';
        if (param['sechash']) {
            updatesecqaa(param['sechash']);
            updateseccode(param['sechash']);
        }
        getnewlivepostlist();
    }
}
//if(tpldata.Threadtypes.Status>>0&1 && tpldata.Threadtypes.Status>>2&1) showTypes('thread_types');
if(!(tpldata.Allow>>6&1) || getcookie('forumdefstyle')){
	var lasttime = cache.Head.Timestamp;var listcolspan= tpldata.Allow>>0&1?6:5
}
if(!(tpldata.Allow>>6&1) && GET('Orderby')=='lastpost' && GET('Filter')==""){
	checkForumnew_handle = setTimeout(function () {checkForumnew(tpldata.Fid, lasttime);}, checkForumtimeout);
}
function viewthread(tid,page,ordertype,authorid){
  var obj={};
  obj.Tid=tid;
  if(page){
    obj.Page=page
  }
  if(authorid){
    obj.Authorid=authorid
  }
  if(ordertype){
    obj.Ordertype=ordertype
  }
  if(getcookie('atarget')==1){
    window.open("/index.html?tpl=forum_viewthread&Tid="+tid,"_blank");    
  }else{
    tpl_load('forum_viewthread',WRITE_MSG_U2WS_forum_viewthread,obj);
  }
  
}
$('#fd_page_bottom').html($('#fd_page_top').html())
if(tpldata.Separatepos){
    hideStickThread()
}