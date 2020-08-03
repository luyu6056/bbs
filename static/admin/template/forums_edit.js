
	$('#leftmenu ul').hide();
	$('#menu_forums').show();
	$('.navon').removeClass('navon');
	$('#header_forums').parents('li').addClass('navon');
	$('.tabon').removeClass('tabon')
	$('#menu_forums #'+GET('tpl')).eq(0).addClass('tabon')
	if(parent.$('admincpnav')) parent.$('admincpnav').innerHTML='论坛&nbsp;&raquo;&nbsp;编辑版块&nbsp;&nbsp;<a target="main" title="添加到常用操作" href="javascript:addCustommenu(\'编辑版块\',\'forums_edit\')">[+]</a>';
	var currentAnchor = 'basic';
    var icon;
function modifystate(custom) {
    var trObj = custom.parentNode.parentNode;
    var inputsObj = trObj.getElementsByTagName('input');
    for (key in inputsObj) {
        var obj = inputsObj[key];
        if (typeof obj == 'object' && obj.type != 'checkbox') {
            obj.value = '';
            obj.readOnly = custom.checked ? false: true;
            obj.style.display = obj.readOnly ? 'none': '';
        }
    }
}
var rowtypedata = [[[1, '', 'td25'], [1, '<input type="text" size="2" name="newdisplayorder[]" value="0" />'], [1, '<input type="text" name="newname[]" />'], [1, '<input type="text" name="newicon[]" />'], [1, '<input type="hidden" name="newenable[]" value="1"><input type="checkbox" class="checkbox" checked="checked" disabled />'], [1, '<input type="hidden" name="newmoderators[]" value="0"><input type="checkbox" class="checkbox" disabled />'], [1, '']], [[1, '', 'td25'], [1, '<input name="newextension[]" type="text" class="txt" size="10">', 'td24'], [1, '<input name="newmaxsize[]" type="text" class="txt" size="15">']]];
function foruminsertunit(text, textend) {
    insertunit($('formulapermnew'), text, textend);
    formulaexp();
}
if(GET('anchor')!=""){
    showanchor($("nav_"+GET('anchor')))
}
var formulafind = new Array('digestposts', 'posts');
var formulareplace = new Array('<u>精华帖数</u>', '<u>发帖数</u>');
function formulaexp() {
    var result = $('formulapermnew').value;
    result = result.replace(/extcredits1/g, '<u>威望</u>');
    result = result.replace(/extcredits2/g, '<u>金钱</u>');
    result = result.replace(/extcredits3/g, '<u>贡献</u>');
    result = result.replace(/extcredits4/g, '<u>自定义积分4</u>');
    result = result.replace(/extcredits5/g, '<u>自定义积分5</u>');
    result = result.replace(/extcredits6/g, '<u>自定义积分6</u>');
    result = result.replace(/extcredits7/g, '<u>自定义积分7</u>');
    result = result.replace(/extcredits8/g, '<u>自定义积分8</u>');
    result = result.replace(/regdate/g, '<u>注册时间</u>');
    result = result.replace(/regday/g, '<u>注册天数</u>');
    result = result.replace(/regip/g, '<u>注册IP</u>');
    result = result.replace(/lastip/g, '<u>最后登录IP</u>');
    result = result.replace(/buyercredit/g, '<u>买家信用评价</u>');
    result = result.replace(/sellercredit/g, '<u>卖家信用评价</u>');
    result = result.replace(/digestposts/g, '<u>精华帖数</u>');
    result = result.replace(/posts/g, '<u>发帖数</u>');
    result = result.replace(/threads/g, '<u>主题数</u>');
    result = result.replace(/oltime/g, '<u>在线时间(小时)</u>');
    result = result.replace(/and/g, '&nbsp;&nbsp;<b>并且</b>&nbsp;&nbsp;');
    result = result.replace(/or/g, '&nbsp;&nbsp;<b>或者</b>&nbsp;&nbsp;');
    result = result.replace(/>=/g, '&ge;');
    result = result.replace(/<=/g, '&le;');
    result = result.replace(/==/g, '=');
    $('formulapermexp').innerHTML = result;
}
formulaexp() 
_attachEvent(document.documentElement, 'keydown',
function(e) {
    entersubmit(e, 'detailsubmit');
});

$('#filele_0').change(function(event) {
    var file=$(this).prop('files');
    if(file.length>0){
        if(file[0].type!="image/jpeg" && file[0].type!="image/png"){
            showDialog("只支持jpg与png格式");
            return
        }
        var reader = new FileReader();//新建一个FileReader
        reader.readAsArrayBuffer(file[0]);//读取文件 
        reader.onload = function(evt){ //读取完文件之后会回来这里
            icon=new Uint8Array(evt.target.result);
            var html='<label><input type="checkbox" class="checkbox" name="deleteicon" value="yes"> 删除</label><br><img id="filele_0_img" src="'+showimg(icon)+'" onload="$(\'input[name=&quot;Extranew.Iconwidth&quot;]\').val($(\'filele_0_img\').width)" width="80px"><br>';
            $('#filele_0').parent().parent().find('.tips2').html(html);

        }
    }
});
$('input[name="Threadtypesnew.Status"]').each(function(index, el) {
    if($(this).parent().hasClass('checked')){
        $(this).click(); 
    }
});
$('#cpform').submit(function(event) {
    var obj={};
    obj.Fid=GET('Fid');
    switch($('input[name="anchor"]').val()){
        case "basic":
        obj.Name= $('input[name="Namenew"]').val();
        obj.Extranew={Namecolor:$('input[name="Extranew.Namecolor"]').val(),Iconwidth:80}
        obj.Fup= $('select[name="fupnew"]').val();
        obj.Forumcolumns= $('input[name="Forumcolumnsnew"]').val(); 
        obj.Catforumcolumns = $('input[name="Catforumcolumnsnew"]').val();  
        obj.Icon = $('input[name="Forumcolumnsnew"]').val();
        $('input[name="Statusnew"]').each(function(index, el) {
            if($(this).parent().hasClass('checked')){
                obj.Status = $(this).val(); 
            }
        });
        obj.Description = $('textarea[name="Descriptionnew"]').val(); 
        obj.Rules = $('textarea[name="Rulesnew"]').val();
        obj.Catlist=[];
        obj.Icon = tpldata.Base.Icon;
        obj.File = icon;
        ajax_post(WRITE_MSG_admin_forum_edit_base(obj),function(res){
            showDialog("操作成功","right","提交结果",function(){
                toggleMenu(header_key,GET("tpl"));
            })
        })
        break;
        case "threadtypes":
        $('input[name="Threadtypesnew.Status"]').each(function(index, el) {
            if($(this).parent().hasClass('checked')){
                obj.Status = $(this).val(); 
            }
        });
        $('input[name="Threadtypesnew.Required"]').each(function(index, el) {
            if($(this).parent().hasClass('checked')){
                obj.Required = $(this).val(); 
            }
        });
        $('input[name="Threadtypesnew.Listable"]').each(function(index, el) {
            if($(this).parent().hasClass('checked')){
                obj.Listable = $(this).val(); 
            }
        });
        $('input[name="Threadtypesnew.Prefix"]').each(function(index, el) {
            if($(this).parent().hasClass('checked')){
                obj.Prefix = $(this).val(); 
            }
        });
        obj.Add=[];
        for(var i=0;i<$('input[name="newdisplayorder[]"]').length;i++){
            var type={}
            type.Displayorder=$('input[name="newdisplayorder[]"]').eq(i).val();
            type.Name=$('input[name="newname[]"]').eq(i).val();
            type.Icon=$('input[name="newicon[]"]').eq(i).val();
            type.Enable=$('input[name="newenable[]"]').eq(i).val();
            type.Moderators=$('input[name="newmoderators[]"]').eq(i).val();
            obj.Add.push(type)
        }
        obj.Types=[];
        obj.Deletes=[];
        for(var i=0;i<$('input[name="threadtypesnew[options][delete][]"]').length;i++){
            var id=$('input[name="threadtypesnew[options][delete][]"]').eq(i).val();
            if($('input[name="threadtypesnew[options][delete][]"]').prop('checked')){
                obj.Deletes.push(id)
                continue
            }
            var type={};
            type.Id=id;
            type.Displayorder=$('input[name="threadtypesnew[options][displayorder]['+id+']"]').val();
            type.Name=$('input[name="threadtypesnew[options][name]['+id+']"]').val();
            type.Icon=$('input[name="threadtypesnew[options][icon]['+id+']"]').val();
            type.Enable=$('input[name="threadtypesnew[options][enable]['+id+']"]').val();
            type.Moderators=$('input[name="threadtypesnew[options][moderators]['+id+']"]').val();
            obj.Types.push(type)
        }

        ajax_post(WRITE_MSG_admin_forum_threadtypes(obj),function(res){
            showDialog("操作成功","right","提交结果",function(){
                //toggleMenu(header_key,GET("tpl"));
            })
        })
        break;
        default:
        showDialog("未处理");
    }
    return false;
});
