
	$('#leftmenu ul').hide();
	$('#menu_forums').show();
	$('.navon').removeClass('navon');
	$('#header_forums').parents('li').addClass('navon');
	$('.tabon').removeClass('tabon')
	$('#menu_forums #'+GET('tpl')).eq(0).addClass('tabon')
	if(parent.$('admincpnav')) parent.$('admincpnav').innerHTML='论坛&nbsp;&raquo;&nbsp;编辑版主&nbsp;&nbsp;<a target="main" title="添加到常用操作" href="javascript:addCustommenu(\'编辑版主\',\'forums_moderators\',\'Fid:'+tpldata.Fid+'\')">[+]</a>';
	$('#cpform').submit(function(event) {
		var obj={};
		obj.Deletes=[];
		obj.Edit=[];
		obj.Fid=$('input[name="Fid"]').val();
		$('input[name="delete[]"]').each(function(index, el) {
			if($(this).prop('checked')){
				obj.Deletes.push($(this).val())
			}
	
			obj.Edit.push({Displayorder:$('input[name="displayordernew['+$(this).val()+']"]').val(),Uid:$(this).val(),Groupid:$('select[name="newgroup['+$(this).val()+']"]').val()})
		});
		if($('input[name="newmoderator"]').val()!=""){
			obj.Add={Uid:$('select[name="newgroup"]').val(),Name:$('input[name="newmoderator"]').val(),Displayorder:$('input[name="newdisplayorder"]').val()}
		}
		ajax_post(WRITE_MSG_U2WS_Admin_Edit_forums_moderator(obj),function(res){
			showDialog("操作成功","right","提交结果",function(){
				tpl_load("forums_moderators",WRITE_MSG_U2WS_Admin_menu_forums_moderators,{Fid:GET("Fid")})
			})
		})
		return false;
	});
