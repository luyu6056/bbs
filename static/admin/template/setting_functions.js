	if(parent.$('admincpnav')) parent.$('admincpnav').innerHTML='全局&nbsp;&raquo;&nbsp;站点功能&nbsp;&nbsp;<a target="main" title="添加到常用操作" href="javascript:addCustommenu(\'站点功能\',\'setting_functions\')">[+]</a>';
	$('#leftmenu ul').hide();
	$('#menu_global').show();
	$('.navon').removeClass('navon');
	$('#header_global').parents('li').addClass('navon');
	$('.tabon').removeClass('tabon')
	$('#menu_global #setting_functions').eq(0).addClass('tabon')
	$('#curscript').find("a").parents("tr")
	$('#curscript').find("a").each(function(index, el) {
		$(this).click(function(event) {
			if($(this).attr('value')==0){
				showDialog('<form id="setnav" method="post" autocomplete="off" action="forum.php?mod=ajax&amp;action=setnav&amp;type=portal&amp;do=open"><input type="hidden" name="type" value="'+$(this).attr('data')+'" /><div class="c"><ul><li><label><input type="checkbox" name="location[header]" class="pc" value="1" />主导航</label></li><!--<li><label><input type="checkbox" name="location[quick]" class="pc" value="1" />快捷导航</label></li>--></ul></div></form>',"confirm","选择"+$('#curscript tr').eq(index+1).find(".td23").text()+"导航位置",'status=0;if($("input[name=\'location[header]\']").prop("checked")){status=1};ajax_post(WRITE_MSG_U2WS_Admin_setting_setnav({Name:"'+$(this).attr('data')+'",Status:status}),function(res){toggleMenu(header_key,GET("tpl"))})')
			}else{
				showDialog("是否关闭？","confirm",'关闭'+$('#curscript tr').eq(index+1).find(".td23").text()+'功能','ajax_post(WRITE_MSG_U2WS_Admin_setting_setnav({Name:"'+$(this).attr('data')+'",Status:-1}),function(res){toggleMenu(header_key,GET("tpl"))})')
			}
			
		});
	});

	$('.tab1 li a').click(function(event) {
		$('#cpcontainer table').hide()
		$('.tab1 .current').removeClass('current')
		$(this).parent().addClass('current')
		name=$(this).attr('data')
		$('#'+name).show();
		$('#'+name+"_tips").show();
		saveUserdata("menu_global_setting_functions",name)
		if(name=="curscript"){
			$('#submit').hide()
		}else{
			$('#submit').show()
		}
	});
	if(loadUserdata("menu_global_setting_functions")!="curscript"){
		$('a[data="'+loadUserdata("menu_global_setting_functions")+'"]').click();
	}
	$('#cpform').submit(function(event) {
		switch (loadUserdata("menu_global_setting_functions")) {
			case "mod":
				var setting={};
				$('input[name="settingnew[updatestat]"]').each(function(index, el) {
					if($(this).parent().hasClass('checked')){
						setting.Updatestat = $(this).val();
					}
				});
				$('input[name="settingnew[modworkstatus]"]').each(function(index, el) {
					if($(this).parent().hasClass('checked')){
						setting.Modworkstatus = $(this).val();
					}
				});
			
				setting.Maxmodworksmonths = $('input[name="settingnew[maxmodworksmonths]"]').val();
				setting.Losslessdel = $('input[name="settingnew[losslessdel]"]').val();
				setting.Modreasons = $('textarea[name="settingnew[modreasons]"]').val();
				setting.Userreasons = $('textarea[name="settingnew[userreasons]"]').val();
				bannedmessages=0;
				$('input[name="settingnew[bannedmessages]"]').each(function(index, el) {
					if($(this).parent().hasClass('checked')){
						bannedmessages+=1<<$(this).val()
					}
				});
				setting.Bannedmessages = bannedmessages;
				setting.Warninglimit = $('input[name="settingnew[warninglimit]"]').val();
				setting.Warningexpiration = $('input[name="settingnew[warningexpiration]"]').val();
				setting.Rewardexpiration = $('input[name="settingnew[rewardexpiration]"]').val();
				$('input[name="settingnew[moddetail]"]').each(function(index, el) {
					if($(this).parent().hasClass('checked')){
						setting.Moddetail = $(this).val();
					}
				});
				var obj={};
				obj.Setting_mod=setting
				ajax_post(WRITE_MSG_U2WS_Admin_edit_setting_functions_mod(obj),function(res){
					showDialog("操作成功","right","提交结果",function(){
						toggleMenu(header_key,GET("tpl"));
					})
				})
				break;
			case "heatthread":
				var setting={};
				setting.Heatthread_period = $('input[name="settingnew[heatthread_period]"]').val();
				setting.Heatthread_iconlevels = $('input[name="settingnew[heatthread_iconlevels]"]').val();
				var obj={};
				obj.Setting_heatthread=setting
				ajax_post(WRITE_MSG_U2WS_Admin_edit_setting_functions_heatthread(obj),function(res){
					showDialog("操作成功","right","提交结果",function(){
						toggleMenu(header_key,GET("tpl"));
					})
				})
				break;
			case "recommend":
				var setting={};
				$('input[name="settingnew[recommendthread_status]"]').each(function(index, el) {
					if($(this).parent().hasClass('checked')){
						setting.Recommendthread_status = $(this).val();
					}
				});
				setting.Recommendthread_addtext = $('input[name="settingnew[recommendthread_addtext]"]').val();
				setting.Recommendthread_subtracttext = $('input[name="settingnew[recommendthread_subtracttext]"]').val();
				setting.Recommendthread_daycount = $('input[name="settingnew[recommendthread_daycount]"]').val();
				$('input[name="settingnew[recommendthread_ownthread]"]').each(function(index, el) {
					if($(this).parent().hasClass('checked')){
						setting.Recommendthread_ownthread = $(this).val();
					}
				});
				setting.Recommendthread_iconlevels = $('input[name="settingnew[recommendthread_iconlevels]"]').val();
				var obj={};
				obj.Setting_recommend=setting
				ajax_post(WRITE_MSG_U2WS_Admin_edit_setting_functions_recommend(obj),function(res){
					showDialog("操作成功","right","提交结果",function(){
						toggleMenu(header_key,GET("tpl"));
					})
				})
				break;
			case "comment":
				var setting={};
				allowpostcomment=0
				$('input[name="settingnew[allowpostcomment]"]').each(function(index, el) {
					if($(this).parent().hasClass('checked')){
						allowpostcomment+=1<<$(this).val()
					}
				});
				setting.Allowpostcomment =allowpostcomment;
				$('input[name="settingnew[commentpostself]"]').each(function(index, el) {
					if($(this).parent().hasClass('checked')){
						setting.Commentpostself = $(this).val();
					}
				});
				$('input[name="settingnew[commentfirstpost]"]').each(function(index, el) {
					if($(this).parent().hasClass('checked')){
						setting.Commentfirstpost = $(this).val();
					}
				});
				setting.Commentnumber = $('input[name="settingnew[commentnumber]"]').val();
				setting.Commentitem_0 = $('textarea[name="settingnew[commentitem_0]"]').val();
				setting.Commentitem_1 = $('textarea[name="settingnew[commentitem_1]"]').val();
				setting.Commentitem_2 = $('textarea[name="settingnew[commentitem_2]"]').val();
				setting.Commentitem_3 = $('textarea[name="settingnew[commentitem_3]"]').val();
				setting.Commentitem_4 = $('textarea[name="settingnew[commentitem_4]"]').val();
				setting.Commentitem_5 = $('textarea[name="settingnew[commentitem_5]"]').val();
				var obj={};
				obj.Setting_comment=setting
				ajax_post(WRITE_MSG_U2WS_Admin_edit_setting_functions_comment(obj),function(res){
					showDialog("操作成功","right","提交结果",function(){
						toggleMenu(header_key,GET("tpl"));
					})
				})
				break;
			case "guide":
				var setting={};
				setting.Heatthread_guidelimit =$('input[name="settingnew[heatthread_guidelimit]"]').val();
				setting.Guide_hotdt = $('select[name="settingnew[guide_hotdt]"]').val();
				setting.Guide_digestdt = $('select[name="settingnew[guide_digestdt]"]').val();
				var obj={};
				obj.Setting_guide=setting
				ajax_post(WRITE_MSG_U2WS_Admin_edit_setting_functions_guide(obj),function(res){
					showDialog("操作成功","right","提交结果",function(){
						toggleMenu(header_key,GET("tpl"));
					})
				})
				break;
			case "activity":
				var setting={};
				setting.Activitytype =$('textarea[name="settingnew[activitytype]"]').val();
				setting.Activityextnum=$('input[name="settingnew[activityextnum]"]').val();
				setting.Activitycredit=$('select[name="settingnew[activitycredit]"]').val();
				setting.Activitypp=$('input[name="settingnew[activitypp]"]').val();
				setting.Activityfield=[]
				$('input[name="settingnew[activityfield]"]').each(function(index, el) {
					if($(this).parent().hasClass('checked')){
						setting.Activityfield.push({Fieldid:$(this).val(),Title:$(this).attr('title',"")})
					}
				});
				var obj={};
				obj.Setting_activity=setting
				ajax_post(WRITE_MSG_U2WS_Admin_edit_setting_functions_activity(obj),function(res){
					showDialog("操作成功","right","提交结果",function(){
						toggleMenu(header_key,GET("tpl"));
					})
				})
				break;
			case "threadexp":
				var setting={};
				$('input[name="settingnew[repliesrank]"]').each(function(index, el) {
					if($(this).parent().hasClass('checked')){
						setting.Repliesrank = $(this).val();
					}
				});
				$('input[name="settingnew[threadblacklist]"]').each(function(index, el) {
					if($(this).parent().hasClass('checked')){
						setting.Threadblacklist = $(this).val();
					}
				});
			
				setting.Threadhotreplies =$('input[name="settingnew[threadhotreplies]"]').val();
				setting.Threadfilternum =$('input[name="settingnew[threadfilternum]"]').val();
				$('input[name="settingnew[nofilteredpost]"]').each(function(index, el) {
					if($(this).parent().hasClass('checked')){
						setting.Nofilteredpost = $(this).val();
					}
				});
				$('input[name="settingnew[hidefilteredpost]"]').each(function(index, el) {
					if($(this).parent().hasClass('checked')){
						setting.Hidefilteredpost = $(this).val();
					}
				});
				$('input[name="settingnew[filterednovote]"]').each(function(index, el) {
					if($(this).parent().hasClass('checked')){
						setting.Filterednovote = $(this).val();
					}
				});
				var obj={};
				obj.Setting_threadexp=setting
				ajax_post(WRITE_MSG_U2WS_Admin_edit_setting_functions_threadexp(obj),function(res){
					showDialog("操作成功","right","提交结果",function(){
						toggleMenu(header_key,GET("tpl"));
					})
				})
				break;
			case "other":
				var setting={};
				var obj={};
				$('input[name="settingnew[uidlogin]"]').each(function(index, el) {
					if($(this).parent().hasClass('checked')){
						setting.Uidlogin = $(this).val();
					}
				});
				$('input[name="settingnew[autoidselect]"]').each(function(index, el) {
					if($(this).parent().hasClass('checked')){
						setting.Autoidselect = $(this).val();
					}
				});
				setting.Oltimespan =$('input[name="settingnew[oltimespan]"]').val();
				$('input[name="settingnew[onlyacceptfriendpm]"]').each(function(index, el) {
					if($(this).parent().hasClass('checked')){
						setting.Onlyacceptfriendpm = $(this).val();
					}
				});
				setting.Pmreportuser =$('input[name="settingnew[pmreportuser]"]').val();
				$('input[name="settingnew[at_anyone]"]').each(function(index, el) {
					if($(this).parent().hasClass('checked')){
						setting.At_anyone = $(this).val();
					}
				});
				setting.Chatpmrefreshtime =$('input[name="settingnew[chatpmrefreshtime]"]').val();
				setting.Collectionteamworkernum =$('input[name="settingnew[collectionteamworkernum]"]').val();
				$('input[name="settingnew[closeforumorderby]"]').each(function(index, el) {
					if($(this).parent().hasClass('checked')){
						setting.Closeforumorderby = $(this).val();
					}
				});
				$('input[name="settingnew[disableipnotice]"]').each(function(index, el) {
					if($(this).parent().hasClass('checked')){
						setting.Disableipnotice = $(this).val();
					}
				});
				$('input[name="settingnew[darkroom]"]').each(function(index, el) {
					if($(this).parent().hasClass('checked')){
						setting.Darkroom = $(this).val();
					}
				});
				
				setting.Globalsightml =$('textarea[name="settingnew[globalsightml]"]').val();
				obj.Setting_other=setting
				ajax_post(WRITE_MSG_U2WS_Admin_edit_setting_functions_other(obj),function(res){
					showDialog("操作成功","right","提交结果",function(){
						toggleMenu(header_key,GET("tpl"));
					})
				})
			default:
				// statements_def
				break;
		}
		return false;
	});
	document.title=cache.Head.Bbname+' 管理中心 - 全局 - 站点功能'
	disallowfloat = 'newthread'; 