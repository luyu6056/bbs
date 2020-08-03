
	if(parent.$('admincpnav')) parent.$('admincpnav').innerHTML='全局&nbsp;&raquo;&nbsp;注册与访问控制&nbsp;&nbsp;<a target="main" title="添加到常用操作" href="javascript:addCustommenu(\'注册与访问控制\',\'setting_access\')">[+]</a>';
	var currentAnchor = '';
	$('#leftmenu ul').hide();
	$('#menu_global').show();
	$('.navon').removeClass('navon');
	$('#header_global').parents('li').addClass('navon');
	$('.tabon').removeClass('tabon')
	$('#menu_global #'+GET('tpl')).eq(0).addClass('tabon')
	$('#cpform').submit(function(event) {
		var setting={}
		setting.Regstatus=0
		if($('input[name="settingnew[regstatus][]"]').parent().hasClass('checked')){
			setting.Regstatus=1
		}
		setting.Regclosemessage=$('textarea[name="settingnew[regclosemessage]"]').val()
		setting.Regname=$('input[name="settingnew[regname]"]').val()
		$('input[name="settingnew[sendregisterurl]"]').each(function(index, el) {
			if($(this).parent().hasClass('checked')){
				setting.Sendregisterurl = $(this).val();
			}
		});
		setting.Reglinkname=$('input[name="settingnew[reglinkname]"]').val()
		setting.Censoruser=$('textarea[name="settingnew[censoruser]"]').val()
		setting.Pwlength=$('input[name="settingnew[pwlength]"]').val()
		var strongpw=0
		$('input[name="settingnew[strongpw]"]').each(function(index, el) {
			if($(this).parent().hasClass('checked')){
				strongpw+=1<<$(this).val()
			}
		});
		setting.Strongpw=strongpw
		$('input[name="settingnew[regverify]"]').each(function(index, el) {
			if($(this).parent().hasClass('checked')){
				setting.Regverify=$(this).val()
			}
		});

		setting.Areaverifywhite =$('textarea[name="settingnew[areaverifywhite]"]').val()
		setting.Ipverifywhite =$('textarea[name="settingnew[ipverifywhite]"]').val()
		$('input[name="settingnew[regmaildomain]"]').each(function(index, el) {
			if($(this).parent().hasClass('checked')){
				setting.Regmaildomain=$(this).val()
			}
		});
		
		setting.Maildomainlist = $('textarea[name="settingnew[maildomainlist]"]').val()
		setting.Regctrl = $('input[name="settingnew[regctrl]"]').val()
		setting.Regfloodctrl = $('input[name="settingnew[regfloodctrl]"]').val()
		setting.Ipregctrltime = $('input[name="settingnew[ipregctrltime]"]').val()
		setting.Ipregctrl = $('textarea[name="settingnew[ipregctrl]"]').val()
		wselcomemsg = 0;
		$('input[name="settingnew[welcomemsg]"]').each(function(index, el) {
			if($(this).parent().hasClass('checked')){
				wselcomemsg+=1<<$(this).val()
			}
		});
		setting.Welcomemsg =wselcomemsg
		setting.Welcomemsgtitle =$('input[name="settingnew[welcomemsgtitle]"]').val()
		setting.Welcomemsgtxt = $('textarea[name="settingnew[welcomemsgtxt]"]').val()
		$('input[name="settingnew[bbrules]"]').each(function(index, el) {
			if($(this).parent().hasClass('checked')){
				setting.Bbrules=$(this).val()
			}
		});
		$('input[name="settingnew[bbrulesforce]"]').each(function(index, el) {
			if($(this).parent().hasClass('checked')){
				setting.Bbrulesforce=$(this).val()
			}
		});
		setting.Bbrulestxt = $('textarea[name="settingnew[welcomemsgtxt]"]').val()
		setting.Newbiespan  =$('input[name="settingnew[newbiespan]"]').val()
		setting.Ipaccess = $('textarea[name="settingnew[ipaccess]"]').val()
		setting.Adminipaccess  = $('textarea[name="settingnew[adminipaccess]"]').val()
		setting.Domainwhitelist = $('textarea[name="settingnew[domainwhitelist]"]').val()
		setting.Domainwhitelist_affectimg =0
		if($('input[name="settingnew[domainwhitelist_affectimg]"]').prop('checked')){
			setting.Domainwhitelist_affectimg =1
		}
		var obj={};
		obj.Setting=setting
		ajax_post(WRITE_MSG_U2WS_Admin_edit_setting_access(obj),function(res){
			showDialog("操作成功","right","提交结果",function(){
				toggleMenu(header_key,GET("tpl"));
			})
		})
		return false;
	});
	document.title=cache.Head.Bbname+' 管理中心 - 全局 - 注册与访问控制'
