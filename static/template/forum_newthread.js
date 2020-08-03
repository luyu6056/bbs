
if (typeof saveData != "function") {
    $('#tpl_html').append('<script src="/static/js/forum.js?t=?" type="text/javascript"><\/script>')
}
if (typeof checkFocus != "function") {
    $('#tpl_html').append('<script src="/static/js/forum_post.js?t=?" type="text/javascript"><\/script>')
}
if (typeof easyUploader != "function") {
    $('#tpl_html').append('<script src="/static/js/easyUploader.js?t=?" type="text/javascript"><\/script>')
}
$('#tpl_html').append('<script src="/static/js/editor.js?t=?" type="text/javascript"><\/script>')


document.title="发表帖子 - " + tpldata.Name + " - " + cache.Head.Bbname
var allowpostattach = tpldata.Group_status >> 1 & 1;
var allowpostimg = tpldata.Group_status >> 2 & 1;
var pid = tpldata.Pid;
var tid = tpldata.Tid;
var extensions = tpldata.Attachextensions;
var imgexts = 'jpg, jpeg, gif, png, bmp';
var newthread_aids=[];
var disablepostctrl = tpldata.Group_status >> 3 & 1;
var seccodecheck = 1;
var secqaacheck = (cache.secqaa.status >> 0 & 1)==1;
var typerequired = false;
if(tpldata.Threadtypes){
	typerequired = (tpldata.Threadtypes.Status >> 1 & 1)==1;
}

var sortrequired = 0;
var special = parseInt(tpldata.Special);
var isfirstpost = tpldata.Allow >> 6 & 1;
var allowposttrade = tpldata.Allow >> 1 & 1;
var allowpostreward = tpldata.Allow >> 2 & 1;
var allowpostactivity = tpldata.Allow >> 3 & 1;
var sortid = 0;
var fid = tpldata.Fid;
var ispicstyleforum = 0;

var editorid = 'e';
var textobj = $(editorid + '_textarea');
var wysiwyg = (BROWSER.ie || BROWSER.firefox || (BROWSER.opera >= 9)) && (cache.editoroptions >> 0 & 1) == 1 ? 1 : 0;
var allowswitcheditor = cache.editoroptions >> 1 & 1;
allowhtml = tpldata.Allow >> 24 & 1;
allowsmilies = tpldata.Allow >> 26 & 1;
allowbbcode = tpldata.Allow >> 22 & 1;
var allowimgcode = tpldata.Allow >> 23 & 1;
var simplodemode = getcookie('editormode_e') == '' ? ((cache.editoroptions >> 2 & 1)==1 ? 1 : -1) : getcookie('editormode_e');
var fontoptions = new Array("宋体", "新宋体", "黑体", "微软雅黑", "Arial", "Verdana", "simsun", "Helvetica", "Trebuchet MS", "Tahoma", "Impact", "Times New Roman", "仿宋,仿宋_GB2312", "楷体,楷体_GB2312");
var smcols = cache.smcols;
var custombbcodes = new Array();

strLenCalc($('subject'), 'checklen', 80)


smilies_show('smiliesdiv', cache.smcols, editorid + '_');
showHrBox(editorid + '_inserthorizontalrule');
showHrBox(editorid + '_postbg', 'postbg');

function switchImagebutton(btn) {
    switchButton(btn, 'image');
    $(editorid + '_image_menu').style.height = '';
    doane();
}

function switchAttachbutton(btn) {
    switchButton(btn, 'attach');
    doane();
}
if ((tpldata.Allow >> 20 & 1) == 1) {
    function createNewAlbum() {
        var inputObj = $('newalbum');
        if (inputObj.value == '' || inputObj.value == '请输入相册名称') {
            inputObj.value = '请输入相册名称';
        } else {
            var x = new Ajax();
            x.get('home.php?mod=misc&ac=ajax&op=createalbum&inajax=1&name=' + inputObj.value, function(s) {
                var aid = parseInt(s);
                var albumList = $('uploadalbum');
                var haveoption = false;
                for (var i = 0; i < albumList.options.length; i++) {
                    if (albumList.options[i].value == aid) {
                        albumList.selectedIndex = i;
                        haveoption = true;
                        break;
                    }
                }
                if (!haveoption) {
                    var oOption = document.createElement("OPTION");
                    oOption.text = trim(inputObj.value);
                    oOption.value = aid;
                    albumList.options.add(oOption);
                    albumList.selectedIndex = albumList.options.length - 1;
                }
                inputObj.value = ''
            });
            selectCreateTab(1)
        }
    }

    function selectCreateTab(flag) {
        var vwObj = $('uploadPanel');
        var opObj = $('createalbum');
        var selObj = $('uploadalbum');
        if (flag) {
            vwObj.style.display = '';
            opObj.style.display = 'none';
            selObj.value = selObj.options[0].value;
        } else {
            vwObj.style.display = 'none';
            opObj.style.display = '';
        }
    }
}

if ((tpldata.Group_status >> 1 & 1) == 1) {
   
    if (wysiwyg) {
        newEditor(1, bbcode2html(textobj.value));
    } else {
        newEditor(0, textobj.value);
    }
    if (simplodemode > 0) {
        editorsimple();
    }

    var ATTACHNUM = {
            'imageused': 0,
            'imageunused': 0,
            'attachused': 0,
            'attachunused': 0
        },
        ATTACHUNUSEDAID = new Array(),
        IMGUNUSEDAID = new Array();
    if ((tpldata.Group_status >> 2 & 1) == 1) {
        if(tpldata.Imgattachs.Used){
            ATTACHNUM['imageused'] = tpldata.Imgattachs.Used.length;
        }else{
            ATTACHNUM['imageused'] = 0;
        }
       
        if ((tpldata.Imgattachs.Used && tpldata.Imgattachs.Used.length > 0) || (tpldata.Imgattachs.Unused && tpldata.Imgattachs.Unused.length > 0)) {
            switchImagebutton('imgattachlist');
            $(editorid + '_image').evt = false;
            updateattachnum('image');
        } else {
            switchImagebutton('multi');
        }
    }
    if ((tpldata.Group_status >> 1 & 1) == 1 || (tpldata.Group_status >> 2 & 1) == 1) {
        if(tpldata.Attachs.Used){
            ATTACHNUM['attachused'] = tpldata.Attachs.Used.length ;
        }else{
            ATTACHNUM['attachused'] = 0;
        }
        
        if ((tpldata.Attachs.Used && tpldata.Attachs.Used.length > 0) || (tpldata.Attachs.Unused && tpldata.Attachs.Unused.length > 0)) {
            $(editorid + '_attach').evt = false;
            updateattachnum('attach');
        } else {
            switchAttachbutton('swfupload');
        }
    }
    if (tpldata.Attachs.Unused && tpldata.Attachs.Unused.length > 0) {
        display('attachnotice_attach');
        var msg = '';
        for (var i in tpldata.Attachs.Unused) {
            var attach = tpldata.Attachs.Unused[i];
            if (attach.Aid > 0) {
                msg += '<p><label><input id="unused' + attach.Aid + '" name="unused[]" value="' + attach.Aid + '" checked type="checkbox" class="pc" /><span title="' + attach.Filenametitle + ' ' + attach.Dateline + '">' + attach.Filename + '</span></label></p>'
                ATTACHUNUSEDAID[attach.Aid] = attach.Aid;
            }
        }
        $('unusedlist_attach').innerHTML = '<div class="cl">' + msg + '</div>';
        $('unusednum_attach').innerHTML = tpldata.Attachs.Unused.length;
    }
    if (tpldata.Imgattachs.Unused && tpldata.Imgattachs.Unused.length > 0) {
        display('attachnotice_img');
        var msg = '';
        for (var i in tpldata.Imgattachs.Unused) {
            var attach = tpldata.Imgattachs.Unused[i];
            if (attach.Aid > 0) {
                msg += '<p style="float:left;width:220px;"><label><input id="unused' + attach.Aid + '" name="unused[]" value="' + attach.Aid + '" checked type="checkbox" class="pc" src="'+attach.Src+'" /><span title="' + attach.Filenametitle + ' ' + attach.Dateline + '">' + attach.Filename + '</span></label></p>'
                IMGUNUSEDAID[attach.Aid] = attach.Aid;
            }
        }
        $('unusedlist_img').innerHTML = '<div class="cl">' + msg + '</div>';
        $('unusednum_img').innerHTML = tpldata.Imgattachs.Unused.length;
    }
    setCaretAtEnd();
    if (BROWSER.ie >= 5 || BROWSER.firefox >= '2') {
        _attachEvent(window, 'beforeunload', unloadAutoSave);
    }
    if (GET('cedit') == 'yes') {
        loadData(1);
        $(editorid + '_switchercheck').checked = !wysiwyg;
    }
}

if (tpldata.Special || ((tpldata.Group_status >> 16 & 1) == 1 && (GET('Type') == 0 || (GET('Type') == 1 && (tpldata.Allow >> 6 & 1) == 1 && tpldata.Displayorder == -4))) || (GET('Type') == 0 && (tpldata.Allow >> 21 & 1) == 1 && tpldata.Special != 2) || (GET('Type') == 1 && (tpldata.status >> 3 & 1) == 1)) {
    if (typeof loadcalendar != "function") {
        $('#tpl_html').append('<script src="/static/js/calendar.js?t=?" type="text/javascript"><\/script>')
    }

}
if ((tpldata.Group_status >> 20 & 1) == 1 || tpldata.Special == 1 || tpldata.Special == "") {
    
    if ((tpldata.Group_status >> 2 & 1) == 1) {
        var imgBoxObj=$('imgattachlist')
         var imgUpload = easyUploader({
            id1: "imgSpanButtonPlaceholder",
            id2:"imgUploadProgress",
            accept: '.gif,.jpg,.jpeg,.png',
            maxCount: 99,
            maxSize: tpldata.Maxattachsize/1024/1024,
            multiple: true,
            data: 'Img',
            previewWidth:32,
            fn:WRITE_MSG_U2WS_upload_image,
            beforeUpload: function(file, data, args) {
                data.append('token', '387126b0-7b3e-4a2a-86ad-ae5c5edd0ae6TT'); //上传方式为formData时
                // data.id = file.id; //上传方式为base64时
            },
            onChange: function(fileList) {
                /* input选中时触发 */
            },
            onRemove: function(removedFiles, files) {
                console.log('onRemove', deletedFiles);
            },
            onSuccess: function(res) {
                $('#imgUploadProgress .list li').each(function(index, el) {
                    var li=$('#imgUploadProgress .list li').eq(index)
                    if(li.find('.progress-text').text()=='100%')li.hide();
                });
                newthread_aids.push(res.Aid)
                var tdObj = getInsertTdId(imgBoxObj, 'image_td_'+res.Aid);
                tdObj.innerHTML='<a href="javascript:;" title="'+res.Title+'" id="imageattach'+res.Aid+'"><img src="'+res.Img+'" id="image_'+res.Aid+'" onclick="insertAttachimgTag(\''+res.Aid+'\');doane(event);" width="110" cwidth="300"></a><p class="mtn mbn xi2"><a href="javascript:;" onclick="delImgAttach(\''+res.Aid+'\',1);return false;">删除</a></p><p class="imgf"><input type="text" class="px xg2" value="描述" onclick="this.style.display=\'none\';$(\'image_desc_'+res.Aid+'\').style.display=\'\';$(\'image_desc_'+res.Aid+'\').focus();"><input type="text" name="attachnew[\''+res.Aid+'\'][description]" class="px" style="display: none" id="image_desc_'+res.Aid+'"></p><script type="text/javascript" reload="1">ATTACHNUM[\'imageunused\'] += 1;updateattachnum(\'image\');if($(\'attachlimitnotice\')) {ajaxget(\'forum.php?mod=ajax&action=updateattachlimit&fid=\' + fid, \'attachlimitnotice\');}<\/script>'
            },
           
        });
       
    }
    if ((tpldata.Group_status >> 1 & 1) == 1) {
        /*var upload = new SWFUpload({
            upload_url: "<%=$_G['siteurl']%>misc.php?mod=swfupload&action=swfupload&operation=upload&fid=<%=$_G['fid']%>",
            post_params: {
                "uid": cache.Head.Uid,
                "hash": "hash"
            },
            file_size_limit: tpldata.Maxattachsize,
            file_types: "*.*",
            file_types_description: "All Support Formats",
            file_upload_limit: 0,
            file_queue_limit: 0,
            swfupload_preload_handler: preLoad,
            swfupload_load_failed_handler: loadFailed,
            file_dialog_start_handler: fileDialogStart,
            file_queued_handler: fileQueued,
            file_queue_error_handler: fileQueueError,
            file_dialog_complete_handler: fileDialogComplete,
            upload_start_handler: uploadStart,
            upload_progress_handler: uploadProgress,
            upload_error_handler: uploadError,
            upload_success_handler: uploadSuccess,
            upload_complete_handler: uploadComplete,
            button_image_url: cache.imgdir+"/uploadbutton.png",
            button_placeholder_id: "spanButtonPlaceholder",
            button_width: 100,
            button_height: 25,
            button_cursor: SWFUpload.CURSOR.HAND,
            button_window_mode: "transparent",
            custom_settings: {
                progressTarget: "fsUploadProgress",
                uploadSource: 'forum',
                uploadType: 'attach',
                maxSizePerDay: tpldata.Allowuploadsize,
                maxAttachNum: tpldata.Allowuploadnum,
                singleUpload: $('e_btn_upload')
            },

            debug: false
        });*/
    }

}
var editorsubmit = $('postsubmit');
var editorform = $('postform');
if ((tpldata.Allow >> 6 & 1) == 1 && tpldata.Threadtypes.Types && tpldata.Threadtypes.Types.length > 0) {
    simulateSelect('typeid');
}
if ((tpldata.Allow >> 6 & 1) == 0 && tpldata.Special == 5 && (tpldata.Allow >> 30 & 1) == 0 && GET('Type') != 1) {
    simulateSelect('stand');
}

function switchpost(href) {
    editchange = false;
    saveData(1);
    location.href = href + '???unknown';
    doane();
}

if (GET('Type') == 0 && cache.sitemessage.newthread.length > 0 || GET('Type') == 2 && cache.sitemessage.reply.length > 0) {
    var msg = ""
    if (GET('Type') == 0) {
        msg = cache.sitemessage.newthread[Math.floor(Math.random() * (cache.sitemessage.newthread.length))];
    } else {
        msg = cache.sitemessage.reply[Math.floor(Math.random() * (cache.sitemessage.reply.length))];
    }
    showPrompt('custominfo', 'mouseover', msg, cache.sitemessage.time);
}
if ((tpldata.Group_status >> 1 & 1) == 1) {
    addAttach();
}
if ((tpldata.Group_status >> 2 & 1) == 1) {
    addAttach('img');
}


    var oSubjectbox = $('subjectbox'),
        oSubject = $('subject'),
        oTextarea = $('e_textarea'),
        sLen = 0;
    if (oSubjectbox) {
        if (oTextarea && oTextarea.style.display == '') {
            oTextarea.focus();
        }
    } else if (oSubject) {
        if (BROWSER.chrome) {
            sLen = oSubject.value.length;
            oSubject.setSelectionRange(sLen, sLen);
        }
        oSubject.focus();
    }


if (GET('cedit') == "") {
    if (loadUserdata('forum_' + discuz_uid)) {
        $('rstnotice').style.display = '';
    }
}

if (tpldata.Userextcredit > 9) {
    var have_replycredit = 0;
    var creditstax = cache.creditstax;
    var replycredit_result_lang = "税后支付" + cache.extcredits[tpldata.Extcreditstype]['title'];
    var userextcredit = tpldata.Userextcredit;
    if (tpldata.Replycredit > 0) {
        have_replycredit = tpldata.Replycredit;
    }
}
if (GET('Type') == 1) {
    extraCheckall();
}
if ((GET('Type') == 0 || GET('Type') == 2 || GET('Type') == 1) && (tpldata.Group_status >> 8 & 1) == 1) {
    if (typeof extrafunc_atMenu != "function") {
        $('#tpl_html').append('<script src="/static/js/at.js?t=?" type="text/javascript"><\/script>')
    }
}
uploadNextAttach()
seccode_scene[scenePost]=undefined;
function forum_post_submit(){
    checkseccode(scenePost,function(seccodetoken){
        seccode_scene[scenePost]=seccodetoken;//缓存seccode
        switch(tpldata.Special){
            case 0:
            submit(seccodetoken)
            break;
            case 1:
            var total=0,newimg=[];
            $('#pollm_c_1 :file').each(function(index, el) {
                if($(this).attr('name').match(/newpoll_\d+/) && $(this).prop('files').length==1) total++,newimg.push($(this));
            });
            if(total>0){
                showWindowEx('progress')
                var r = new FileReader();
                r.readAsArrayBuffer(newimg[0].prop('files')[0]);
                r.onload = function(f) {
                    pollupload(newimg,new Uint8Array(r.result),0,seccodetoken)
                }
            }else{
                submit(seccodetoken)
            }
            break;
        }
        
    },function(){
        var theform=$('postform');
        theform.replysubmit ? theform.replysubmit.disabled = false : (theform.editsubmit ? theform.editsubmit.disabled = false : theform.topicsubmit.disabled = false);
    })
    return false;
}
function submit(token){
    var obj={};
    obj.Fid=GET('Fid');
    obj.Subject=$('input[name="subject"]').val();
    obj.Message=html2bbcode($('#e_iframe').contents().find('body').html());
    obj.Other=0;
    if($('input[name="isanonymous"]').prop('checked')){
        obj.Other=1
    }
    if($('input[name="hiddenreplies"]').prop('checked')){
        obj.Other+=1<<1
    }
    if($('input[name="ordertype"]').prop('checked')){
        obj.Other+=1<<2
    }
    if($('input[name="allownoticeauthor"]').prop('checked')){
        obj.Other+=1<<3
    }
    if($('input[name="addfeed"]').prop('checked')){
        obj.Other+=1<<4
    }
    if($('input[name="usesig"]').prop('checked')){
        obj.Other+=1<<5
    }
    if($('input[name="htmlon"]').prop('checked')){
        obj.Other+=1<<6
    }
    if($('input[name="allowimgcode"]').prop('checked')){
        obj.Other+=1<<7
    }
    if($('input[name="parseurloff"]').prop('checked')){
        obj.Other+=1<<8
    }
    if($('input[name="smileyoff"]').prop('checked')){
        obj.Other+=1<<9
    }
    if($('input[name="bbcodeoff"]').prop('checked')){
        obj.Other+=1<<10
    }
    if($('input[name="sticktopic"]').prop('checked')){
        obj.Other+=1<<11
    }
    if($('input[name="addtodigest"]').prop('checked')){
        obj.Other+=1<<12
    }
    if($('input[name="save"]').val()=="1"){
        obj.Other+=1<<13
    }
    if($('input[name="adddynamic"]').prop('checked')){
        obj.Other+=1<<14
    }
    obj.Readperm=$('#readperm').val();
    obj.Typeid=$('#typeid').val();
    obj.Special=GET("Special");
    obj.Tags=$('input[name="tags"]').val();
    obj.Tid=tpldata.Tid
    var data='';
    switch(GET('Type')){
        case "0":
        break;
        case "1":
        obj.Type=1
        obj.Position=GET('Position')
        break
        case "2":
        obj.Type=2
        break;
    }
    switch(tpldata.Special){
        case 1:
        var poll={};
        poll.Polloption=[];
        $('#pollm_c_1 input[name*="polloption"]').each(function(index, el) {
            if(!$(this).parent('p').attr('id')){
                var p={Name:$(this).val()};
                var m=$(this).attr("name").match(/polloption\[(\d+)\]/);
                if(m){
                    p.Id=m[1];
                }
                p.Aid=$(this).parent('p').find("[id^='pollUploadProgress']").find('input[name="pollimage"]').val();
                poll.Polloption.push(p);
            }
        });
        poll.Maxchoices=$('input[name="maxchoices"]').val();
        poll.Expiration=$('input[name="expiration"]').val();
        poll.Visible=$('input[name="visibilitypoll"]').prop('checked'); //投票后结果可见
        poll.Overt=$('input[name="overt"]').prop('checked');            //公开投票人
        obj.Specialext=write_MSG_Poll_info(poll);
        break;
    }
    console.log("提交")
    obj.Aids=newthread_aids;
    obj.Seccode=token;
    ajax_post(WRITE_MSG_U2WS_Forum_newthread_submit(obj))
}
websocket_func[CMD_MSG_WS2U_Forum_newthread_submit]=function(res){
    if(res.Result && res.Result==1){
        userdataoption(0);
        tpl_load("forum_viewthread",WRITE_MSG_U2WS_forum_viewthread,{Tid:res.Tid});
    }else{
        var theform=$('postform');
        theform.replysubmit ? theform.replysubmit.disabled = false : (theform.editsubmit ? theform.editsubmit.disabled = false : theform.topicsubmit.disabled = false);
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
            if(res.Result==-8){
                
            }
        }
    }
}
if(tpldata.Imgattachs.Used){
    var aids=[];
    for(var i in tpldata.Imgattachs.Used){
        var v=tpldata.Imgattachs.Used[i]
        aids.push([v.Aid,v.Src]);
        newthread_aids.push(v.Aid);
    }
    updateImageList(1,aids)
}
if(tpldata.Special==1){
    if(GET('Type') == '0'){
        var curoptions = 0;
        var curnumber = 1;
        addpolloption();
        addpolloption();
    } else if(tpldata.Group_status>>23&1){
        var curnumber = curoptions = tpldata.Poll.Polloption.length;
        for(var i=0; i < curnumber; i++) {
            addUploadEvent('newpoll_'+tpldata.Poll.Polloption[i].Id, 'pollUploadProgress_'+tpldata.Poll.Polloption[i].Id);
        }
    }
}
function addUploadEvent(name,b){
    var obj=$('pollUploadProgress_'+name.replace('newpoll_',''));
    var svg='<svg onclick="$(\'input[name=&quot;'+name+'&quot;]\').click();" class="svg" style="vertical-align: -7px;" t="1577781681462" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4522" width="25" height="25"><path d="M712.5 788.8H194.2c-22.5 0-43-8.8-58.7-23.3l146.9-183.2c7.9-9.8 19-15.5 31.2-15.9 12.2-0.4 23.6 4.6 32 13.9l12.9 14.3c17.1 19 41 28.8 65.8 27.1 24.7-1.7 47.2-14.9 61.8-36L560.2 478c8-11.7 20.5-18.4 34.1-18.5h0.3c13.6 0 26 6.6 34.1 18.1l76.7 108.9c6.8 9.6 19.6 11.5 28.6 4.3 8.9-7.1 10.7-20.4 4-29.9L661.3 452c-15.9-22.5-40.1-35.4-66.7-35.4h-0.5c-26.8 0.2-51.1 13.4-66.8 36.2l-74.1 107.8c-7.4 10.8-18.9 17.5-31.6 18.4-12.6 0.9-24.9-4.2-33.6-13.8l-12.9-14.3c-16.2-18-39.1-28-62.7-27.3-23.6 0.7-45.8 12-61.1 31l-140 174.7c-4-10.7-6.3-22.5-6.3-34.7V328.9c0-52 40-94.2 89.2-94.2H767c49.3 0 89.2 42.2 89.2 94.2v181.3c0 11.9 9.1 21.5 20.3 21.5s20.3-9.6 20.3-21.5V328.9c0-75.7-58.2-137.1-129.9-137.1H194.2c-71.7 0-129.9 61.4-129.9 137.1v365.7c0 75.7 58.2 137.1 129.9 137.1h518.3c11.2 0 20.3-9.6 20.3-21.5 0-11.8-9.1-21.4-20.3-21.4z" fill="#6f9ffd" p-id="4523"></path><path d="M926.6 672.7h-52.5v-54.5c0-19.4-14.9-35.1-33.2-35.1s-33.2 15.7-33.2 35.1v54.5h-53.6c-18.3 0-33.2 15.7-33.2 35.1 0 19.4 14.9 35.1 33.2 35.1h53.6v53.9c0 19.4 14.9 35.1 33.2 35.1s33.2-15.7 33.2-35.1v-53.9h52.5c18.3 0 33.2-15.7 33.2-35.1 0-19.4-14.9-35.1-33.2-35.1zM256.5 416.1c-35 0-63.6-28.5-63.6-63.6 0-35 28.5-63.6 63.6-63.6s63.6 28.5 63.6 63.6-28.6 63.6-63.6 63.6z m0-89.2c-14.1 0-25.6 11.5-25.6 25.6 0 14.1 11.5 25.6 25.6 25.6 14.1 0 25.6-11.5 25.6-25.6 0-14.1-11.5-25.6-25.6-25.6z" fill="#6f9ffd" p-id="4524"></path></svg>';

    obj.style.display='';
    $(name).innerHTML=svg+'<input name="'+name+'" type="file" class="fileupload" onChange="pollimgupload(this)" accept="image/*"/>';
    
}
function pollimgupload(obj){
    var id=obj.name.replace('newpoll_','');
    if(obj.files.length){
        var html=`<img src="`+cache.imgdir+`/attachimg_2.png" class="cur1" onmouseover="showMenu({'menuid':'poll_img_preview_`+id+`_menu','ctrlclass':'a','duration':2,'timeout':0,'pos':'34'});" onmouseout="hideMenu('poll_img_preview_`+id+`_menu','');" />`+'<input type="hidden" name="pollimage" value="0" /><span id="poll_img_preview_'+id+'_menu" initialized="true" style="position: absolute; z-index: 301; display: none;"><img src=""></span>'

        $('pollUploadProgress_'+id).innerHTML=html;
        $('pollUploadProgress_'+id).style.display='';
        var reader = new FileReader();//新建一个FileReader
        reader.readAsArrayBuffer(obj.files[0]);//读取文件 
        reader.onload = function(evt){ //读取完文件之后会回来这里
            var res = new Uint8Array(evt.target.result); // 读取文件内容
            var binary="";
            for (var i = 0; i < res.length; i++) {
                binary += String.fromCharCode(res[i]);
            }
            $('#poll_img_preview_'+id+'_menu img').attr('src', 'data:image/jpeg;base64,'+window.btoa(binary));
        }
    }else{
        $('pollUploadProgress_'+id).style.display='none';
    }
}

function pollupload(newimg,data,index,seccodetoken){
    var total=newimg.length,xhr = new XMLHttpRequest(),dataType="blob";
    function response(r){
        if(xhr.status==200){
            result=read_msg(new Uint8Array(r)).msg
            if(result==undefined){
                result={Result:-3}
            }
            if(result.Result && result.Result!=1){
                if(err[result.Result]==undefined){
                    showDialog("未知错误: "+result.Result);
                }else{
                    showDialog(err[result.Result],"alert",newimg[index].prop('files')[0].name+"上传失败");
                }
                hideWindow('progress')
                var theform=$('postform');
                theform.replysubmit ? theform.replysubmit.disabled = false : (theform.editsubmit ? theform.editsubmit.disabled = false : theform.topicsubmit.disabled = false);
                return 
            }
            console.log(result)
            newimg[index].parents("p").find("[id^='pollUploadProgress']").find('input[name="pollimage"]').val(result.Aid);
            index++
            if(index==total){
                submit(seccodetoken);
                hideWindow('progress');
                return
            }
            var r = new FileReader();
            r.readAsArrayBuffer(newimg[index].prop('files')[0]);
            r.onload = function(f) {
                pollupload(newimg,new Uint8Array(r.result),index,seccodetoken)
            }
        }
    }
    xhr.addEventListener('load',
    function() {
        var r = new FileReader();
        r.readAsArrayBuffer(xhr.response);
        r.onload = function(f) {
            response(this.result)
        }
    });
    var baseprogress=index/total*100
    xhr.upload.addEventListener('progress', function(e) {
        var  progress= Math.floor(100 * e.loaded / e.total/total+baseprogress)+"%";
        $('#upload_progress').width(progress);
        $('#upload_progress .progress-value').text('上传'+progress);
    }, false);
    xhr.ontimeout = function(event){
        hideWindow('progress')
        showDialog('网络连接超时,请刷新再试');
        var theform=$('postform');
        theform.replysubmit ? theform.replysubmit.disabled = false : (theform.editsubmit ? theform.editsubmit.disabled = false : theform.topicsubmit.disabled = false);
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                
            } else {
                hideWindow('progress')
                showDialog('上传失败,错误码'+xhr.status);
                var theform=$('postform');
                theform.replysubmit ? theform.replysubmit.disabled = false : (theform.editsubmit ? theform.editsubmit.disabled = false : theform.topicsubmit.disabled = false);
            }
        }
    };
    xhr.open('POST', uploadurl, true);
    xhr.responseType = dataType;
    xhr.timeout=0;
    msg=token;
    msg=msg.concat(WRITE_MSG_U2WS_upload_tmp_image({Filename:newimg[index].prop('files')[0].name,Data:data}))
    xhr.send(new Uint8Array(msg));
}
//添加规则
EXTRAFUNC['validator']['special'] = 'validateextra';
function validateextra() {
    switch(tpldata.Special){
        case "1":
        var check=true;
        var option_num =0
        $('#pollm_c_1 :text').each(function(index, el) {
            if(!$(this).parent('p').attr('id')){
                if($(this).val()==''){
                    showDialog(err[-62], 'alert', '', function () { $('#pollm_c_1 :text"]').eq(index).focus() });
                    check=false;
                    return
                }else{
                    option_num++
                }
            }
        });
        if(option_num<2 || option_num>10){
            showDialog(err[-65], 'alert', '', function () { $('#pollm_c_1 input[name*="polloption"]').focus() });
            check=false;
        }
        if(check && ($('input[name="maxchoices"]').val()>option_num || $('input[name="maxchoices"]').val()<1)){
            showDialog(err[-63], 'alert', '', function () { $('input[name="maxchoices"]').focus() });
            check=false;
        }
        if(check && $('input[name="expiration"]').val()<0){
            showDialog(err[-64], 'alert', '', function () { $('input[name="expiration"]').focus() });
            check=false;
        }
        return check;
    }
    return true;
}
