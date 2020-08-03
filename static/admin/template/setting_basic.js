
	if(parent.$('admincpnav')) parent.$('admincpnav').innerHTML='全局&nbsp;&raquo;&nbsp;站点信息&nbsp;&nbsp;<a target="main" title="添加到常用操作" href="javascript:addCustommenu(\'站点信息\',\'setting_basic\')">[+]</a>';
	$('#cpform').submit(function(event) {
		var obj={};
		obj.Setting_bbname = $('input[name="settingnew[bbname]"]').val();
		obj.Setting_sitename = $('input[name="settingnew[sitename]"]').val();
		obj.Setting_siteurl = $('input[name="settingnew[siteurl]"]').val();
		obj.Setting_adminemail = $('input[name="settingnew[adminemail]"]').val();
		obj.Setting_site_qq = $('input[name="settingnew[site_qq]"]').val();
		obj.Setting_icp = $('input[name="settingnew[icp]"]').val();
		$('input[name="settingnew[boardlicensed]"]').each(function(index, el) {
			if($(this).parent().hasClass('checked')){
				obj.Setting_boardlicensed = $(this).val();
			}
		});
		
		obj.Setting_statcode = $('textarea[name="settingnew[statcode]"]').val();
		ajax_post(WRITE_MSG_U2WS_Admin_edit_setting_basic(obj),function(res){
			showDialog("操作成功","right","提交结果",function(){
				toggleMenu(header_key,GET("tpl"));
			})
		})
		return false;
	});
	$('#leftmenu ul').hide();
	$('#menu_global').show();
	$('.navon').removeClass('navon');
	$('#header_global').parents('li').addClass('navon');
	$('.tabon').removeClass('tabon')
	$('#menu_global #setting_basic').eq(0).addClass('tabon')
	document.title=cache.Head.Bbname+' 管理中心 - 全局 - 站点信息'
