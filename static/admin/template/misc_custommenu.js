
	var rowtypedata = [
		[
			[1,'', 'td25'],
			[1,'<input type="text" class="txt" name="newdisplayorder[]" size="3">', 'td28'],
			[1,'<input type="text" class="txt" name="newtitle[]" size="25">'],
			[1,'<input type="text" class="txt" name="newurl[]" size="40">', 'td26']
		]
	];
	if(parent.$('admincpnav')) parent.$('admincpnav').innerHTML='工具&nbsp;&raquo;&nbsp;编辑常用操作&nbsp;&nbsp;<a target="main" title="添加到常用操作" href="javascript:addCustommenu(\'编辑常用操作\',\'misc_custommenu\')">[+]</a>';
	$('#cpform').submit(function(event) {
		var obj={};
		obj.Deletes=[];
		obj.Edit=[];
		$('input[name="delete[]"]').each(function(index, el) {
			if($(this).prop('checked')){
				obj.Deletes.push($(this).val())
			}
			obj.Edit.push({Displayorder:$('input[name="displayordernew['+$(this).val()+']"]').val(),Title:$('input[name="titlenew['+$(this).val()+']"]').val(),Id:$(this).val(),Param:$('input[name="paramnew['+$(this).val()+']"]').val()})
		});
		ajax_post(WRITE_MSG_U2WS_Admin_Edit_custommenu(obj),function(res){
			showDialog("操作成功","right","提交结果",function(){
				rebuild_leftmenu()
				toggleMenu(header_key,GET("tpl"));
			})
		})
		return false;
	});
	$('#leftmenu ul').hide();
	$('#menu_index').show();
	$('.navon').removeClass('navon');
	$('#header_index').parents('li').addClass('navon');
	$('.tabon').removeClass('tabon')
	$('#menu_index #misc_custommenu').eq(0).addClass('tabon')
	document.title=cache.Head.Bbname+' 管理中心 - 工具 - 编辑常用操作'



