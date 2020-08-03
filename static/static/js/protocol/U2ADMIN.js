var CMD_MSG_U2WS_Admin_menu_index = 735634866,CMD_MSG_U2WS_Admin_menu_misc_custommenu = 426252242,CMD_MSG_WS2U_Admin_menu_misc_custommenu = 1348090898,CMD_MSG_U2WS_Admin_rebuild_leftmenu = 902427406,CMD_MSG_WS2U_Admin_rebuild_leftmenu = -1580472055,CMD_MSG_WS2U_custommenu = -34596055,CMD_MSG_U2WS_Admin_AddCustommenu = 919505458,CMD_MSG_U2WS_Admin_Edit_custommenu = 699095719,CMD_MSG_U2WS_Admin_menu_setting_basic = -368188665,CMD_MSG_WS2U_Admin_menu_setting_basic = 1479415992,CMD_MSG_U2WS_Admin_edit_setting_basic = 1056482773,CMD_MSG_U2WS_Admin_menu_setting_access = 1779812911,CMD_MSG_WS2U_Admin_menu_setting_access = 830031817,CMD_MSG_Admin_setting_access = 1801302893,CMD_MSG_U2WS_Admin_edit_setting_access = 35425425,CMD_MSG_U2WS_Admin_menu_setting_functions = 98456939,CMD_MSG_WS2U_Admin_menu_setting_functions = 1654141527,CMD_MSG_U2WS_Admin_setting_setnav = -871377362,CMD_MSG_Admin_setting_functions_curscript = 1265224859,CMD_MSG_U2WS_Admin_edit_setting_functions_mod = -371741980,CMD_MSG_Admin_setting_functions_mod = -1667725759,CMD_MSG_U2WS_Admin_edit_setting_functions_heatthread = -511404881,CMD_MSG_Admin_setting_functions_heatthread = 37433885,CMD_MSG_U2WS_Admin_edit_setting_functions_recommend = -1830850073,CMD_MSG_Admin_setting_functions_recommend = 1316147567,CMD_MSG_U2WS_Admin_edit_setting_functions_comment = -848292620,CMD_MSG_Admin_setting_functions_comment = -786656194,CMD_MSG_U2WS_Admin_edit_setting_functions_guide = 206405707,CMD_MSG_Admin_setting_functions_guide = -303705781,CMD_MSG_U2WS_Admin_edit_setting_functions_activity = 1392055914,CMD_MSG_Admin_setting_functions_activity = 693391684,CMD_MSG_setting_activityfield = 1078788684,CMD_MSG_U2WS_Admin_edit_setting_functions_threadexp = -1538758015,CMD_MSG_Admin_setting_functions_threadexp = 2028325385,CMD_MSG_U2WS_Admin_edit_setting_functions_other = 529232478,CMD_MSG_Admin_setting_functions_other = -31251618,CMD_MSG_U2WS_Admin_menu_forums_index = -981386295,CMD_MSG_WS2U_Admin_menu_forums_index = 1534176368,CMD_MSG_admin_forum_cart = 1251023957,CMD_MSG_admin_forum = 2061189765,CMD_MSG_admin_forum_three = 142633269,CMD_MSG_U2WS_Admin_edit_forums_index = -1946743894,CMD_MSG_U2WS_Admin_delete_forum = -1477628465,CMD_MSG_U2WS_Admin_menu_forums_edit = -1405787337,CMD_MSG_WS2U_Admin_menu_forums_edit = 943159600,CMD_MSG_admin_forum_edit_base = -540414860,CMD_MSG_admin_forum_extra = 58375333,CMD_MSG_admin_forum_modrecommen = -1575018876,CMD_MSG_admin_forum_threadsorts = -47517347,CMD_MSG_admin_forum_threadtypes = 1780863600,CMD_MSG_admin_forum_type = -840121397,CMD_MSG_admin_forum_edit_ext = -1505563183,CMD_MSG_U2WS_Admin_menu_forums_moderators = 1006442797,CMD_MSG_WS2U_Admin_menu_forums_moderators = 1555791377,CMD_MSG_admin_forums_moderator = -10820895,CMD_MSG_admin_forums_group = 1959754928,CMD_MSG_U2WS_Admin_Edit_forums_moderator = -295518409;
function WRITE_MSG_U2WS_Admin_menu_index(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_menu_index));
	b=b.concat(write_MSG_U2WS_Admin_menu_index(o));
	return b;
}
function write_MSG_U2WS_Admin_menu_index(o){
	var b=[];
	return b
}
function read_MSG_U2WS_Admin_menu_index(b){
	var o={},r={};r.b=b;
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_menu_misc_custommenu(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_menu_misc_custommenu));
	b=b.concat(write_MSG_U2WS_Admin_menu_misc_custommenu(o));
	return b;
}
function write_MSG_U2WS_Admin_menu_misc_custommenu(o){
	var b=[];
	return b
}
function read_MSG_U2WS_Admin_menu_misc_custommenu(b){
	var o={},r={};r.b=b;
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_Admin_menu_misc_custommenu(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_Admin_menu_misc_custommenu));
	b=b.concat(write_MSG_WS2U_Admin_menu_misc_custommenu(o));
	return b;
}
function write_MSG_WS2U_Admin_menu_misc_custommenu(o){
	var b=[];
	if(o.Menus){
		b=b.concat(write_int16(o.Menus.length))
		for(var i=0;i<o.Menus.length;i++){
			b=b.concat(write_MSG_WS2U_custommenu(o.Menus[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	return b
}
function read_MSG_WS2U_Admin_menu_misc_custommenu(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);var l=r.o;if(l>0)o.Menus=[]
	for(var i=0;i<l;i++){
		r=read_MSG_WS2U_custommenu(r.b)
		o.Menus.push(r.o)
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_rebuild_leftmenu(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_rebuild_leftmenu));
	b=b.concat(write_MSG_U2WS_Admin_rebuild_leftmenu(o));
	return b;
}
function write_MSG_U2WS_Admin_rebuild_leftmenu(o){
	var b=[];
	return b
}
function read_MSG_U2WS_Admin_rebuild_leftmenu(b){
	var o={},r={};r.b=b;
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_Admin_rebuild_leftmenu(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_Admin_rebuild_leftmenu));
	b=b.concat(write_MSG_WS2U_Admin_rebuild_leftmenu(o));
	return b;
}
function write_MSG_WS2U_Admin_rebuild_leftmenu(o){
	var b=[];
	if(o.Menus){
		b=b.concat(write_int16(o.Menus.length))
		for(var i=0;i<o.Menus.length;i++){
			b=b.concat(write_MSG_WS2U_custommenu(o.Menus[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	return b
}
function read_MSG_WS2U_Admin_rebuild_leftmenu(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);var l=r.o;if(l>0)o.Menus=[]
	for(var i=0;i<l;i++){
		r=read_MSG_WS2U_custommenu(r.b)
		o.Menus.push(r.o)
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_custommenu(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_custommenu));
	b=b.concat(write_MSG_WS2U_custommenu(o));
	return b;
}
function write_MSG_WS2U_custommenu(o){
	var b=[];
	b=b.concat(write_string(o.Title));
	b=b.concat(write_int8(o.Displayorder));
	b=b.concat(write_int16(o.Id));
	b=b.concat(write_string(o.Url));
	b=b.concat(write_string(o.Param));
	return b
}
function read_MSG_WS2U_custommenu(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Title=r.o
	r=read_int8(r.b);
	o.Displayorder=r.o
	r=read_int16(r.b);
	o.Id=r.o
	r=read_string(r.b);
	o.Url=r.o
	r=read_string(r.b);
	o.Param=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_AddCustommenu(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_AddCustommenu));
	b=b.concat(write_MSG_U2WS_Admin_AddCustommenu(o));
	return b;
}
function write_MSG_U2WS_Admin_AddCustommenu(o){
	var b=[];
	b=b.concat(write_string(o.Title));
	b=b.concat(write_string(o.Url));
	b=b.concat(write_string(o.Param));
	return b
}
function read_MSG_U2WS_Admin_AddCustommenu(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Title=r.o
	r=read_string(r.b);
	o.Url=r.o
	r=read_string(r.b);
	o.Param=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_Edit_custommenu(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_Edit_custommenu));
	b=b.concat(write_MSG_U2WS_Admin_Edit_custommenu(o));
	return b;
}
function write_MSG_U2WS_Admin_Edit_custommenu(o){
	var b=[];
	if(o.Deletes){
		b=b.concat(write_int16(o.Deletes.length))
		for(var i=0;i<o.Deletes.length;i++){
			b=b.concat(write_int32(o.Deletes[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	if(o.Edit){
		b=b.concat(write_int16(o.Edit.length))
		for(var i=0;i<o.Edit.length;i++){
			b=b.concat(write_MSG_WS2U_custommenu(o.Edit[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	return b
}
function read_MSG_U2WS_Admin_Edit_custommenu(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);var l=r.o;if(l>0)o.Deletes=[]
	for(var i=0;i<l;i++){
		r=read_int32(r.b)
		o.Deletes.push(r.o)
	}
	r=read_int16(r.b);var l=r.o;if(l>0)o.Edit=[]
	for(var i=0;i<l;i++){
		r=read_MSG_WS2U_custommenu(r.b)
		o.Edit.push(r.o)
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_menu_setting_basic(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_menu_setting_basic));
	b=b.concat(write_MSG_U2WS_Admin_menu_setting_basic(o));
	return b;
}
function write_MSG_U2WS_Admin_menu_setting_basic(o){
	var b=[];
	return b
}
function read_MSG_U2WS_Admin_menu_setting_basic(b){
	var o={},r={};r.b=b;
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_Admin_menu_setting_basic(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_Admin_menu_setting_basic));
	b=b.concat(write_MSG_WS2U_Admin_menu_setting_basic(o));
	return b;
}
function write_MSG_WS2U_Admin_menu_setting_basic(o){
	var b=[];
	b=b.concat(write_string(o.Setting_bbname));
	b=b.concat(write_string(o.Setting_sitename));
	b=b.concat(write_string(o.Setting_siteurl));
	b=b.concat(write_string(o.Setting_adminemail));
	b=b.concat(write_string(o.Setting_site_qq));
	b=b.concat(write_string(o.Setting_icp));
	b=b.concat(write_string(o.Setting_boardlicensed));
	b=b.concat(write_string(o.Setting_statcode));
	return b
}
function read_MSG_WS2U_Admin_menu_setting_basic(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Setting_bbname=r.o
	r=read_string(r.b);
	o.Setting_sitename=r.o
	r=read_string(r.b);
	o.Setting_siteurl=r.o
	r=read_string(r.b);
	o.Setting_adminemail=r.o
	r=read_string(r.b);
	o.Setting_site_qq=r.o
	r=read_string(r.b);
	o.Setting_icp=r.o
	r=read_string(r.b);
	o.Setting_boardlicensed=r.o
	r=read_string(r.b);
	o.Setting_statcode=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_edit_setting_basic(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_edit_setting_basic));
	b=b.concat(write_MSG_U2WS_Admin_edit_setting_basic(o));
	return b;
}
function write_MSG_U2WS_Admin_edit_setting_basic(o){
	var b=[];
	b=b.concat(write_string(o.Setting_bbname));
	b=b.concat(write_string(o.Setting_sitename));
	b=b.concat(write_string(o.Setting_siteurl));
	b=b.concat(write_string(o.Setting_adminemail));
	b=b.concat(write_string(o.Setting_site_qq));
	b=b.concat(write_string(o.Setting_icp));
	b=b.concat(write_string(o.Setting_boardlicensed));
	b=b.concat(write_string(o.Setting_statcode));
	return b
}
function read_MSG_U2WS_Admin_edit_setting_basic(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Setting_bbname=r.o
	r=read_string(r.b);
	o.Setting_sitename=r.o
	r=read_string(r.b);
	o.Setting_siteurl=r.o
	r=read_string(r.b);
	o.Setting_adminemail=r.o
	r=read_string(r.b);
	o.Setting_site_qq=r.o
	r=read_string(r.b);
	o.Setting_icp=r.o
	r=read_string(r.b);
	o.Setting_boardlicensed=r.o
	r=read_string(r.b);
	o.Setting_statcode=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_menu_setting_access(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_menu_setting_access));
	b=b.concat(write_MSG_U2WS_Admin_menu_setting_access(o));
	return b;
}
function write_MSG_U2WS_Admin_menu_setting_access(o){
	var b=[];
	return b
}
function read_MSG_U2WS_Admin_menu_setting_access(b){
	var o={},r={};r.b=b;
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_Admin_menu_setting_access(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_Admin_menu_setting_access));
	b=b.concat(write_MSG_WS2U_Admin_menu_setting_access(o));
	return b;
}
function write_MSG_WS2U_Admin_menu_setting_access(o){
	var b=[];
	if(o.Setting){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_Admin_setting_access(o.Setting));
	}else{
		b=b.concat(write_int8(0))
	}
	return b
}
function read_MSG_WS2U_Admin_menu_setting_access(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_Admin_setting_access(r.b);
		o.Setting=r.o
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_Admin_setting_access(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_Admin_setting_access));
	b=b.concat(write_MSG_Admin_setting_access(o));
	return b;
}
function write_MSG_Admin_setting_access(o){
	var b=[];
	b=b.concat(write_int8(o.Regstatus));
	b=b.concat(write_string(o.Regclosemessage));
	b=b.concat(write_string(o.Regname));
	b=b.concat(write_string(o.Sendregisterurl));
	b=b.concat(write_string(o.Reglinkname));
	b=b.concat(write_string(o.Censoruser));
	b=b.concat(write_int8(o.Pwlength));
	b=b.concat(write_int16(o.Strongpw));
	b=b.concat(write_int8(o.Regverify));
	b=b.concat(write_string(o.Areaverifywhite));
	b=b.concat(write_string(o.Ipverifywhite));
	b=b.concat(write_int8(o.Regmaildomain));
	b=b.concat(write_string(o.Maildomainlist));
	b=b.concat(write_int32(o.Regctrl));
	b=b.concat(write_int32(o.Regfloodctrl));
	b=b.concat(write_int32(o.Ipregctrltime));
	b=b.concat(write_string(o.Ipregctrl));
	b=b.concat(write_int8(o.Welcomemsg));
	b=b.concat(write_string(o.Welcomemsgtitle));
	b=b.concat(write_string(o.Welcomemsgtxt));
	b=b.concat(write_int8(o.Bbrules));
	b=b.concat(write_int8(o.Bbrulesforce));
	b=b.concat(write_string(o.Bbrulestxt));
	b=b.concat(write_int32(o.Newbiespan));
	b=b.concat(write_string(o.Ipaccess));
	b=b.concat(write_string(o.Adminipaccess));
	b=b.concat(write_string(o.Domainwhitelist));
	b=b.concat(write_int8(o.Domainwhitelist_affectimg));
	return b
}
function read_MSG_Admin_setting_access(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);
	o.Regstatus=r.o
	r=read_string(r.b);
	o.Regclosemessage=r.o
	r=read_string(r.b);
	o.Regname=r.o
	r=read_string(r.b);
	o.Sendregisterurl=r.o
	r=read_string(r.b);
	o.Reglinkname=r.o
	r=read_string(r.b);
	o.Censoruser=r.o
	r=read_int8(r.b);
	o.Pwlength=r.o
	r=read_int16(r.b);
	o.Strongpw=r.o
	r=read_int8(r.b);
	o.Regverify=r.o
	r=read_string(r.b);
	o.Areaverifywhite=r.o
	r=read_string(r.b);
	o.Ipverifywhite=r.o
	r=read_int8(r.b);
	o.Regmaildomain=r.o
	r=read_string(r.b);
	o.Maildomainlist=r.o
	r=read_int32(r.b);
	o.Regctrl=r.o
	r=read_int32(r.b);
	o.Regfloodctrl=r.o
	r=read_int32(r.b);
	o.Ipregctrltime=r.o
	r=read_string(r.b);
	o.Ipregctrl=r.o
	r=read_int8(r.b);
	o.Welcomemsg=r.o
	r=read_string(r.b);
	o.Welcomemsgtitle=r.o
	r=read_string(r.b);
	o.Welcomemsgtxt=r.o
	r=read_int8(r.b);
	o.Bbrules=r.o
	r=read_int8(r.b);
	o.Bbrulesforce=r.o
	r=read_string(r.b);
	o.Bbrulestxt=r.o
	r=read_int32(r.b);
	o.Newbiespan=r.o
	r=read_string(r.b);
	o.Ipaccess=r.o
	r=read_string(r.b);
	o.Adminipaccess=r.o
	r=read_string(r.b);
	o.Domainwhitelist=r.o
	r=read_int8(r.b);
	o.Domainwhitelist_affectimg=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_edit_setting_access(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_edit_setting_access));
	b=b.concat(write_MSG_U2WS_Admin_edit_setting_access(o));
	return b;
}
function write_MSG_U2WS_Admin_edit_setting_access(o){
	var b=[];
	if(o.Setting){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_Admin_setting_access(o.Setting));
	}else{
		b=b.concat(write_int8(0))
	}
	return b
}
function read_MSG_U2WS_Admin_edit_setting_access(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_Admin_setting_access(r.b);
		o.Setting=r.o
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_menu_setting_functions(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_menu_setting_functions));
	b=b.concat(write_MSG_U2WS_Admin_menu_setting_functions(o));
	return b;
}
function write_MSG_U2WS_Admin_menu_setting_functions(o){
	var b=[];
	return b
}
function read_MSG_U2WS_Admin_menu_setting_functions(b){
	var o={},r={};r.b=b;
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_Admin_menu_setting_functions(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_Admin_menu_setting_functions));
	b=b.concat(write_MSG_WS2U_Admin_menu_setting_functions(o));
	return b;
}
function write_MSG_WS2U_Admin_menu_setting_functions(o){
	var b=[];
	if(o.Setting_curscript){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_Admin_setting_functions_curscript(o.Setting_curscript));
	}else{
		b=b.concat(write_int8(0))
	}
	if(o.Setting_mod){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_Admin_setting_functions_mod(o.Setting_mod));
	}else{
		b=b.concat(write_int8(0))
	}
	if(o.Setting_heatthread){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_Admin_setting_functions_heatthread(o.Setting_heatthread));
	}else{
		b=b.concat(write_int8(0))
	}
	if(o.Setting_recommend){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_Admin_setting_functions_recommend(o.Setting_recommend));
	}else{
		b=b.concat(write_int8(0))
	}
	if(o.Setting_comment){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_Admin_setting_functions_comment(o.Setting_comment));
	}else{
		b=b.concat(write_int8(0))
	}
	if(o.Setting_guide){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_Admin_setting_functions_guide(o.Setting_guide));
	}else{
		b=b.concat(write_int8(0))
	}
	if(o.Setting_activity){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_Admin_setting_functions_activity(o.Setting_activity));
	}else{
		b=b.concat(write_int8(0))
	}
	if(o.Setting_threadexp){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_Admin_setting_functions_threadexp(o.Setting_threadexp));
	}else{
		b=b.concat(write_int8(0))
	}
	if(o.Setting_other){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_Admin_setting_functions_other(o.Setting_other));
	}else{
		b=b.concat(write_int8(0))
	}
	return b
}
function read_MSG_WS2U_Admin_menu_setting_functions(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_Admin_setting_functions_curscript(r.b);
		o.Setting_curscript=r.o
	}
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_Admin_setting_functions_mod(r.b);
		o.Setting_mod=r.o
	}
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_Admin_setting_functions_heatthread(r.b);
		o.Setting_heatthread=r.o
	}
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_Admin_setting_functions_recommend(r.b);
		o.Setting_recommend=r.o
	}
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_Admin_setting_functions_comment(r.b);
		o.Setting_comment=r.o
	}
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_Admin_setting_functions_guide(r.b);
		o.Setting_guide=r.o
	}
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_Admin_setting_functions_activity(r.b);
		o.Setting_activity=r.o
	}
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_Admin_setting_functions_threadexp(r.b);
		o.Setting_threadexp=r.o
	}
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_Admin_setting_functions_other(r.b);
		o.Setting_other=r.o
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_setting_setnav(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_setting_setnav));
	b=b.concat(write_MSG_U2WS_Admin_setting_setnav(o));
	return b;
}
function write_MSG_U2WS_Admin_setting_setnav(o){
	var b=[];
	b=b.concat(write_string(o.Name));
	b=b.concat(write_int8(o.Status));
	return b
}
function read_MSG_U2WS_Admin_setting_setnav(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Name=r.o
	r=read_int8(r.b);
	o.Status=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_Admin_setting_functions_curscript(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_Admin_setting_functions_curscript));
	b=b.concat(write_MSG_Admin_setting_functions_curscript(o));
	return b;
}
function write_MSG_Admin_setting_functions_curscript(o){
	var b=[];
	b=b.concat(write_int8(o.Portalstatus));
	b=b.concat(write_int8(o.Groupstatus));
	b=b.concat(write_int8(o.Followstatus));
	b=b.concat(write_int8(o.Collectionstatus));
	b=b.concat(write_int8(o.Guidestatus));
	b=b.concat(write_int8(o.Feedstatus));
	b=b.concat(write_int8(o.Blogstatus));
	b=b.concat(write_int8(o.Albumstatus));
	b=b.concat(write_int8(o.Sharestatus));
	b=b.concat(write_int8(o.Doingstatus));
	b=b.concat(write_int8(o.Wallstatus));
	b=b.concat(write_int8(o.Rankliststatus));
	return b
}
function read_MSG_Admin_setting_functions_curscript(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);
	o.Portalstatus=r.o
	r=read_int8(r.b);
	o.Groupstatus=r.o
	r=read_int8(r.b);
	o.Followstatus=r.o
	r=read_int8(r.b);
	o.Collectionstatus=r.o
	r=read_int8(r.b);
	o.Guidestatus=r.o
	r=read_int8(r.b);
	o.Feedstatus=r.o
	r=read_int8(r.b);
	o.Blogstatus=r.o
	r=read_int8(r.b);
	o.Albumstatus=r.o
	r=read_int8(r.b);
	o.Sharestatus=r.o
	r=read_int8(r.b);
	o.Doingstatus=r.o
	r=read_int8(r.b);
	o.Wallstatus=r.o
	r=read_int8(r.b);
	o.Rankliststatus=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_edit_setting_functions_mod(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_edit_setting_functions_mod));
	b=b.concat(write_MSG_U2WS_Admin_edit_setting_functions_mod(o));
	return b;
}
function write_MSG_U2WS_Admin_edit_setting_functions_mod(o){
	var b=[];
	if(o.Setting_mod){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_Admin_setting_functions_mod(o.Setting_mod));
	}else{
		b=b.concat(write_int8(0))
	}
	return b
}
function read_MSG_U2WS_Admin_edit_setting_functions_mod(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_Admin_setting_functions_mod(r.b);
		o.Setting_mod=r.o
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_Admin_setting_functions_mod(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_Admin_setting_functions_mod));
	b=b.concat(write_MSG_Admin_setting_functions_mod(o));
	return b;
}
function write_MSG_Admin_setting_functions_mod(o){
	var b=[];
	b=b.concat(write_int8(o.Updatestat));
	b=b.concat(write_int8(o.Modworkstatus));
	b=b.concat(write_int8(o.Maxmodworksmonths));
	b=b.concat(write_int16(o.Losslessdel));
	b=b.concat(write_string(o.Modreasons));
	b=b.concat(write_string(o.Userreasons));
	b=b.concat(write_int8(o.Bannedmessages));
	b=b.concat(write_int8(o.Warninglimit));
	b=b.concat(write_int16(o.Warningexpiration));
	b=b.concat(write_int16(o.Rewardexpiration));
	b=b.concat(write_int8(o.Moddetail));
	return b
}
function read_MSG_Admin_setting_functions_mod(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);
	o.Updatestat=r.o
	r=read_int8(r.b);
	o.Modworkstatus=r.o
	r=read_int8(r.b);
	o.Maxmodworksmonths=r.o
	r=read_int16(r.b);
	o.Losslessdel=r.o
	r=read_string(r.b);
	o.Modreasons=r.o
	r=read_string(r.b);
	o.Userreasons=r.o
	r=read_int8(r.b);
	o.Bannedmessages=r.o
	r=read_int8(r.b);
	o.Warninglimit=r.o
	r=read_int16(r.b);
	o.Warningexpiration=r.o
	r=read_int16(r.b);
	o.Rewardexpiration=r.o
	r=read_int8(r.b);
	o.Moddetail=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_edit_setting_functions_heatthread(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_edit_setting_functions_heatthread));
	b=b.concat(write_MSG_U2WS_Admin_edit_setting_functions_heatthread(o));
	return b;
}
function write_MSG_U2WS_Admin_edit_setting_functions_heatthread(o){
	var b=[];
	if(o.Setting_heatthread){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_Admin_setting_functions_heatthread(o.Setting_heatthread));
	}else{
		b=b.concat(write_int8(0))
	}
	return b
}
function read_MSG_U2WS_Admin_edit_setting_functions_heatthread(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_Admin_setting_functions_heatthread(r.b);
		o.Setting_heatthread=r.o
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_Admin_setting_functions_heatthread(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_Admin_setting_functions_heatthread));
	b=b.concat(write_MSG_Admin_setting_functions_heatthread(o));
	return b;
}
function write_MSG_Admin_setting_functions_heatthread(o){
	var b=[];
	b=b.concat(write_int16(o.Heatthread_period));
	b=b.concat(write_string(o.Heatthread_iconlevels));
	return b
}
function read_MSG_Admin_setting_functions_heatthread(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);
	o.Heatthread_period=r.o
	r=read_string(r.b);
	o.Heatthread_iconlevels=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_edit_setting_functions_recommend(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_edit_setting_functions_recommend));
	b=b.concat(write_MSG_U2WS_Admin_edit_setting_functions_recommend(o));
	return b;
}
function write_MSG_U2WS_Admin_edit_setting_functions_recommend(o){
	var b=[];
	if(o.Setting_recommend){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_Admin_setting_functions_recommend(o.Setting_recommend));
	}else{
		b=b.concat(write_int8(0))
	}
	return b
}
function read_MSG_U2WS_Admin_edit_setting_functions_recommend(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_Admin_setting_functions_recommend(r.b);
		o.Setting_recommend=r.o
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_Admin_setting_functions_recommend(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_Admin_setting_functions_recommend));
	b=b.concat(write_MSG_Admin_setting_functions_recommend(o));
	return b;
}
function write_MSG_Admin_setting_functions_recommend(o){
	var b=[];
	b=b.concat(write_int8(o.Recommendthread_status));
	b=b.concat(write_string(o.Recommendthread_addtext));
	b=b.concat(write_string(o.Recommendthread_subtracttext));
	b=b.concat(write_int8(o.Recommendthread_daycount));
	b=b.concat(write_int8(o.Recommendthread_ownthread));
	b=b.concat(write_string(o.Recommendthread_iconlevels));
	return b
}
function read_MSG_Admin_setting_functions_recommend(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);
	o.Recommendthread_status=r.o
	r=read_string(r.b);
	o.Recommendthread_addtext=r.o
	r=read_string(r.b);
	o.Recommendthread_subtracttext=r.o
	r=read_int8(r.b);
	o.Recommendthread_daycount=r.o
	r=read_int8(r.b);
	o.Recommendthread_ownthread=r.o
	r=read_string(r.b);
	o.Recommendthread_iconlevels=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_edit_setting_functions_comment(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_edit_setting_functions_comment));
	b=b.concat(write_MSG_U2WS_Admin_edit_setting_functions_comment(o));
	return b;
}
function write_MSG_U2WS_Admin_edit_setting_functions_comment(o){
	var b=[];
	if(o.Setting_comment){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_Admin_setting_functions_comment(o.Setting_comment));
	}else{
		b=b.concat(write_int8(0))
	}
	return b
}
function read_MSG_U2WS_Admin_edit_setting_functions_comment(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_Admin_setting_functions_comment(r.b);
		o.Setting_comment=r.o
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_Admin_setting_functions_comment(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_Admin_setting_functions_comment));
	b=b.concat(write_MSG_Admin_setting_functions_comment(o));
	return b;
}
function write_MSG_Admin_setting_functions_comment(o){
	var b=[];
	b=b.concat(write_int8(o.Allowpostcomment));
	b=b.concat(write_int8(o.Commentpostself));
	b=b.concat(write_int8(o.Commentfirstpost));
	b=b.concat(write_int8(o.Commentnumber));
	b=b.concat(write_string(o.Commentitem_0));
	b=b.concat(write_string(o.Commentitem_1));
	b=b.concat(write_string(o.Commentitem_2));
	b=b.concat(write_string(o.Commentitem_3));
	b=b.concat(write_string(o.Commentitem_4));
	b=b.concat(write_string(o.Commentitem_5));
	return b
}
function read_MSG_Admin_setting_functions_comment(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);
	o.Allowpostcomment=r.o
	r=read_int8(r.b);
	o.Commentpostself=r.o
	r=read_int8(r.b);
	o.Commentfirstpost=r.o
	r=read_int8(r.b);
	o.Commentnumber=r.o
	r=read_string(r.b);
	o.Commentitem_0=r.o
	r=read_string(r.b);
	o.Commentitem_1=r.o
	r=read_string(r.b);
	o.Commentitem_2=r.o
	r=read_string(r.b);
	o.Commentitem_3=r.o
	r=read_string(r.b);
	o.Commentitem_4=r.o
	r=read_string(r.b);
	o.Commentitem_5=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_edit_setting_functions_guide(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_edit_setting_functions_guide));
	b=b.concat(write_MSG_U2WS_Admin_edit_setting_functions_guide(o));
	return b;
}
function write_MSG_U2WS_Admin_edit_setting_functions_guide(o){
	var b=[];
	if(o.Setting_guide){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_Admin_setting_functions_guide(o.Setting_guide));
	}else{
		b=b.concat(write_int8(0))
	}
	return b
}
function read_MSG_U2WS_Admin_edit_setting_functions_guide(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_Admin_setting_functions_guide(r.b);
		o.Setting_guide=r.o
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_Admin_setting_functions_guide(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_Admin_setting_functions_guide));
	b=b.concat(write_MSG_Admin_setting_functions_guide(o));
	return b;
}
function write_MSG_Admin_setting_functions_guide(o){
	var b=[];
	b=b.concat(write_int16(o.Heatthread_guidelimit));
	b=b.concat(write_int32(o.Guide_hotdt));
	b=b.concat(write_int32(o.Guide_digestdt));
	return b
}
function read_MSG_Admin_setting_functions_guide(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);
	o.Heatthread_guidelimit=r.o
	r=read_int32(r.b);
	o.Guide_hotdt=r.o
	r=read_int32(r.b);
	o.Guide_digestdt=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_edit_setting_functions_activity(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_edit_setting_functions_activity));
	b=b.concat(write_MSG_U2WS_Admin_edit_setting_functions_activity(o));
	return b;
}
function write_MSG_U2WS_Admin_edit_setting_functions_activity(o){
	var b=[];
	if(o.Setting_activity){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_Admin_setting_functions_activity(o.Setting_activity));
	}else{
		b=b.concat(write_int8(0))
	}
	return b
}
function read_MSG_U2WS_Admin_edit_setting_functions_activity(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_Admin_setting_functions_activity(r.b);
		o.Setting_activity=r.o
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_Admin_setting_functions_activity(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_Admin_setting_functions_activity));
	b=b.concat(write_MSG_Admin_setting_functions_activity(o));
	return b;
}
function write_MSG_Admin_setting_functions_activity(o){
	var b=[];
	b=b.concat(write_string(o.Activitytype));
	b=b.concat(write_int8(o.Activityextnum));
	b=b.concat(write_int8(o.Activitycredit));
	b=b.concat(write_int8(o.Activitypp));
	if(o.Activityfield){
		b=b.concat(write_int16(o.Activityfield.length))
		for(var i=0;i<o.Activityfield.length;i++){
			b=b.concat(write_MSG_setting_activityfield(o.Activityfield[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	return b
}
function read_MSG_Admin_setting_functions_activity(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Activitytype=r.o
	r=read_int8(r.b);
	o.Activityextnum=r.o
	r=read_int8(r.b);
	o.Activitycredit=r.o
	r=read_int8(r.b);
	o.Activitypp=r.o
	r=read_int16(r.b);var l=r.o;if(l>0)o.Activityfield=[]
	for(var i=0;i<l;i++){
		r=read_MSG_setting_activityfield(r.b)
		o.Activityfield.push(r.o)
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_setting_activityfield(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_setting_activityfield));
	b=b.concat(write_MSG_setting_activityfield(o));
	return b;
}
function write_MSG_setting_activityfield(o){
	var b=[];
	b=b.concat(write_string(o.Fieldid));
	b=b.concat(write_string(o.Title));
	b=b.concat(write_int8(o.Checked));
	return b
}
function read_MSG_setting_activityfield(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Fieldid=r.o
	r=read_string(r.b);
	o.Title=r.o
	r=read_int8(r.b);
	o.Checked=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_edit_setting_functions_threadexp(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_edit_setting_functions_threadexp));
	b=b.concat(write_MSG_U2WS_Admin_edit_setting_functions_threadexp(o));
	return b;
}
function write_MSG_U2WS_Admin_edit_setting_functions_threadexp(o){
	var b=[];
	if(o.Setting_threadexp){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_Admin_setting_functions_threadexp(o.Setting_threadexp));
	}else{
		b=b.concat(write_int8(0))
	}
	return b
}
function read_MSG_U2WS_Admin_edit_setting_functions_threadexp(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_Admin_setting_functions_threadexp(r.b);
		o.Setting_threadexp=r.o
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_Admin_setting_functions_threadexp(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_Admin_setting_functions_threadexp));
	b=b.concat(write_MSG_Admin_setting_functions_threadexp(o));
	return b;
}
function write_MSG_Admin_setting_functions_threadexp(o){
	var b=[];
	b=b.concat(write_int8(o.Repliesrank));
	b=b.concat(write_int8(o.Threadblacklist));
	b=b.concat(write_int8(o.Threadhotreplies));
	b=b.concat(write_int16(o.Threadfilternum));
	b=b.concat(write_int8(o.Nofilteredpost));
	b=b.concat(write_int8(o.Hidefilteredpost));
	b=b.concat(write_int8(o.Filterednovote));
	return b
}
function read_MSG_Admin_setting_functions_threadexp(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);
	o.Repliesrank=r.o
	r=read_int8(r.b);
	o.Threadblacklist=r.o
	r=read_int8(r.b);
	o.Threadhotreplies=r.o
	r=read_int16(r.b);
	o.Threadfilternum=r.o
	r=read_int8(r.b);
	o.Nofilteredpost=r.o
	r=read_int8(r.b);
	o.Hidefilteredpost=r.o
	r=read_int8(r.b);
	o.Filterednovote=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_edit_setting_functions_other(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_edit_setting_functions_other));
	b=b.concat(write_MSG_U2WS_Admin_edit_setting_functions_other(o));
	return b;
}
function write_MSG_U2WS_Admin_edit_setting_functions_other(o){
	var b=[];
	if(o.Setting_other){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_Admin_setting_functions_other(o.Setting_other));
	}else{
		b=b.concat(write_int8(0))
	}
	return b
}
function read_MSG_U2WS_Admin_edit_setting_functions_other(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_Admin_setting_functions_other(r.b);
		o.Setting_other=r.o
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_Admin_setting_functions_other(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_Admin_setting_functions_other));
	b=b.concat(write_MSG_Admin_setting_functions_other(o));
	return b;
}
function write_MSG_Admin_setting_functions_other(o){
	var b=[];
	b=b.concat(write_int8(o.Uidlogin));
	b=b.concat(write_int8(o.Autoidselect));
	b=b.concat(write_int8(o.Oltimespan));
	b=b.concat(write_int8(o.Onlyacceptfriendpm));
	b=b.concat(write_string(o.Pmreportuser));
	b=b.concat(write_int8(o.At_anyone));
	b=b.concat(write_int8(o.Chatpmrefreshtime));
	b=b.concat(write_int16(o.Collectionteamworkernum));
	b=b.concat(write_int8(o.Closeforumorderby));
	b=b.concat(write_int8(o.Disableipnotice));
	b=b.concat(write_int8(o.Darkroom));
	b=b.concat(write_string(o.Globalsightml));
	return b
}
function read_MSG_Admin_setting_functions_other(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);
	o.Uidlogin=r.o
	r=read_int8(r.b);
	o.Autoidselect=r.o
	r=read_int8(r.b);
	o.Oltimespan=r.o
	r=read_int8(r.b);
	o.Onlyacceptfriendpm=r.o
	r=read_string(r.b);
	o.Pmreportuser=r.o
	r=read_int8(r.b);
	o.At_anyone=r.o
	r=read_int8(r.b);
	o.Chatpmrefreshtime=r.o
	r=read_int16(r.b);
	o.Collectionteamworkernum=r.o
	r=read_int8(r.b);
	o.Closeforumorderby=r.o
	r=read_int8(r.b);
	o.Disableipnotice=r.o
	r=read_int8(r.b);
	o.Darkroom=r.o
	r=read_string(r.b);
	o.Globalsightml=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_menu_forums_index(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_menu_forums_index));
	b=b.concat(write_MSG_U2WS_Admin_menu_forums_index(o));
	return b;
}
function write_MSG_U2WS_Admin_menu_forums_index(o){
	var b=[];
	return b
}
function read_MSG_U2WS_Admin_menu_forums_index(b){
	var o={},r={};r.b=b;
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_Admin_menu_forums_index(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_Admin_menu_forums_index));
	b=b.concat(write_MSG_WS2U_Admin_menu_forums_index(o));
	return b;
}
function write_MSG_WS2U_Admin_menu_forums_index(o){
	var b=[];
	if(o.Catlist){
		b=b.concat(write_int16(o.Catlist.length))
		for(var i=0;i<o.Catlist.length;i++){
			b=b.concat(write_MSG_admin_forum_cart(o.Catlist[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	return b
}
function read_MSG_WS2U_Admin_menu_forums_index(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);var l=r.o;if(l>0)o.Catlist=[]
	for(var i=0;i<l;i++){
		r=read_MSG_admin_forum_cart(r.b)
		o.Catlist.push(r.o)
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_admin_forum_cart(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_admin_forum_cart));
	b=b.concat(write_MSG_admin_forum_cart(o));
	return b;
}
function write_MSG_admin_forum_cart(o){
	var b=[];
	b=b.concat(write_int32(o.Fid));
	b=b.concat(write_string(o.Name));
	b=b.concat(write_string(o.Moderators));
	b=b.concat(write_int16(o.Displayorder));
	b=b.concat(write_int8(o.Status));
	if(o.Forums){
		b=b.concat(write_int16(o.Forums.length))
		for(var i=0;i<o.Forums.length;i++){
			b=b.concat(write_MSG_admin_forum(o.Forums[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	return b
}
function read_MSG_admin_forum_cart(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Fid=r.o
	r=read_string(r.b);
	o.Name=r.o
	r=read_string(r.b);
	o.Moderators=r.o
	r=read_int16(r.b);
	o.Displayorder=r.o
	r=read_int8(r.b);
	o.Status=r.o
	r=read_int16(r.b);var l=r.o;if(l>0)o.Forums=[]
	for(var i=0;i<l;i++){
		r=read_MSG_admin_forum(r.b)
		o.Forums.push(r.o)
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_admin_forum(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_admin_forum));
	b=b.concat(write_MSG_admin_forum(o));
	return b;
}
function write_MSG_admin_forum(o){
	var b=[];
	b=b.concat(write_int32(o.Fid));
	b=b.concat(write_string(o.Moderators));
	b=b.concat(write_string(o.Name));
	b=b.concat(write_int16(o.Displayorder));
	b=b.concat(write_int8(o.Status));
	if(o.Level_three){
		b=b.concat(write_int16(o.Level_three.length))
		for(var i=0;i<o.Level_three.length;i++){
			b=b.concat(write_MSG_admin_forum_three(o.Level_three[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	return b
}
function read_MSG_admin_forum(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Fid=r.o
	r=read_string(r.b);
	o.Moderators=r.o
	r=read_string(r.b);
	o.Name=r.o
	r=read_int16(r.b);
	o.Displayorder=r.o
	r=read_int8(r.b);
	o.Status=r.o
	r=read_int16(r.b);var l=r.o;if(l>0)o.Level_three=[]
	for(var i=0;i<l;i++){
		r=read_MSG_admin_forum_three(r.b)
		o.Level_three.push(r.o)
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_admin_forum_three(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_admin_forum_three));
	b=b.concat(write_MSG_admin_forum_three(o));
	return b;
}
function write_MSG_admin_forum_three(o){
	var b=[];
	b=b.concat(write_int32(o.Fid));
	b=b.concat(write_string(o.Moderators));
	b=b.concat(write_string(o.Name));
	b=b.concat(write_int16(o.Displayorder));
	b=b.concat(write_int8(o.Status));
	return b
}
function read_MSG_admin_forum_three(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Fid=r.o
	r=read_string(r.b);
	o.Moderators=r.o
	r=read_string(r.b);
	o.Name=r.o
	r=read_int16(r.b);
	o.Displayorder=r.o
	r=read_int8(r.b);
	o.Status=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_edit_forums_index(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_edit_forums_index));
	b=b.concat(write_MSG_U2WS_Admin_edit_forums_index(o));
	return b;
}
function write_MSG_U2WS_Admin_edit_forums_index(o){
	var b=[];
	if(o.Forums){
		b=b.concat(write_int16(o.Forums.length))
		for(var i=0;i<o.Forums.length;i++){
			b=b.concat(write_MSG_admin_forum_three(o.Forums[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	if(o.NewForums){
		b=b.concat(write_int16(o.NewForums.length))
		for(var i=0;i<o.NewForums.length;i++){
			b=b.concat(write_MSG_admin_forum_three(o.NewForums[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	return b
}
function read_MSG_U2WS_Admin_edit_forums_index(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);var l=r.o;if(l>0)o.Forums=[]
	for(var i=0;i<l;i++){
		r=read_MSG_admin_forum_three(r.b)
		o.Forums.push(r.o)
	}
	r=read_int16(r.b);var l=r.o;if(l>0)o.NewForums=[]
	for(var i=0;i<l;i++){
		r=read_MSG_admin_forum_three(r.b)
		o.NewForums.push(r.o)
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_delete_forum(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_delete_forum));
	b=b.concat(write_MSG_U2WS_Admin_delete_forum(o));
	return b;
}
function write_MSG_U2WS_Admin_delete_forum(o){
	var b=[];
	b=b.concat(write_int32(o.Fid));
	return b
}
function read_MSG_U2WS_Admin_delete_forum(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Fid=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_menu_forums_edit(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_menu_forums_edit));
	b=b.concat(write_MSG_U2WS_Admin_menu_forums_edit(o));
	return b;
}
function write_MSG_U2WS_Admin_menu_forums_edit(o){
	var b=[];
	b=b.concat(write_int32(o.Fid));
	return b
}
function read_MSG_U2WS_Admin_menu_forums_edit(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Fid=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_Admin_menu_forums_edit(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_Admin_menu_forums_edit));
	b=b.concat(write_MSG_WS2U_Admin_menu_forums_edit(o));
	return b;
}
function write_MSG_WS2U_Admin_menu_forums_edit(o){
	var b=[];
	b=b.concat(write_int32(o.Fid));
	b=b.concat(write_int8(o.Type));
	if(o.Base){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_admin_forum_edit_base(o.Base));
	}else{
		b=b.concat(write_int8(0))
	}
	if(o.Ext){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_admin_forum_edit_ext(o.Ext));
	}else{
		b=b.concat(write_int8(0))
	}
	if(o.Modrecommendnew){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_admin_forum_modrecommen(o.Modrecommendnew));
	}else{
		b=b.concat(write_int8(0))
	}
	if(o.Threadsortsnew){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_admin_forum_threadsorts(o.Threadsortsnew));
	}else{
		b=b.concat(write_int8(0))
	}
	if(o.Threadtypesnew){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_admin_forum_threadtypes(o.Threadtypesnew));
	}else{
		b=b.concat(write_int8(0))
	}
	return b
}
function read_MSG_WS2U_Admin_menu_forums_edit(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Fid=r.o
	r=read_int8(r.b);
	o.Type=r.o
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_admin_forum_edit_base(r.b);
		o.Base=r.o
	}
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_admin_forum_edit_ext(r.b);
		o.Ext=r.o
	}
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_admin_forum_modrecommen(r.b);
		o.Modrecommendnew=r.o
	}
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_admin_forum_threadsorts(r.b);
		o.Threadsortsnew=r.o
	}
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_admin_forum_threadtypes(r.b);
		o.Threadtypesnew=r.o
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_admin_forum_edit_base(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_admin_forum_edit_base));
	b=b.concat(write_MSG_admin_forum_edit_base(o));
	return b;
}
function write_MSG_admin_forum_edit_base(o){
	var b=[];
	b=b.concat(write_int32(o.Fid));
	b=b.concat(write_string(o.Name));
	if(o.Extranew){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_admin_forum_extra(o.Extranew));
	}else{
		b=b.concat(write_int8(0))
	}
	if(o.Catlist){
		b=b.concat(write_int16(o.Catlist.length))
		for(var i=0;i<o.Catlist.length;i++){
			b=b.concat(write_MSG_admin_forum_cart(o.Catlist[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	b=b.concat(write_int32(o.Fup));
	b=b.concat(write_int8(o.Forumcolumns));
	b=b.concat(write_int8(o.Catforumcolumns));
	b=b.concat(write_string(o.Icon));
	b=b.concat(write_byte(o.File));
	b=b.concat(write_int8(o.Status));
	b=b.concat(write_int8(o.Shownav));
	b=b.concat(write_string(o.Description));
	b=b.concat(write_string(o.Rules));
	return b
}
function read_MSG_admin_forum_edit_base(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Fid=r.o
	r=read_string(r.b);
	o.Name=r.o
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_admin_forum_extra(r.b);
		o.Extranew=r.o
	}
	r=read_int16(r.b);var l=r.o;if(l>0)o.Catlist=[]
	for(var i=0;i<l;i++){
		r=read_MSG_admin_forum_cart(r.b)
		o.Catlist.push(r.o)
	}
	r=read_int32(r.b);
	o.Fup=r.o
	r=read_int8(r.b);
	o.Forumcolumns=r.o
	r=read_int8(r.b);
	o.Catforumcolumns=r.o
	r=read_string(r.b);
	o.Icon=r.o
	r=read_byte(r.b);o.File=r.o
	r=read_int8(r.b);
	o.Status=r.o
	r=read_int8(r.b);
	o.Shownav=r.o
	r=read_string(r.b);
	o.Description=r.o
	r=read_string(r.b);
	o.Rules=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_admin_forum_extra(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_admin_forum_extra));
	b=b.concat(write_MSG_admin_forum_extra(o));
	return b;
}
function write_MSG_admin_forum_extra(o){
	var b=[];
	b=b.concat(write_int16(o.Iconwidth));
	b=b.concat(write_string(o.Namecolor));
	return b
}
function read_MSG_admin_forum_extra(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);
	o.Iconwidth=r.o
	r=read_string(r.b);
	o.Namecolor=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_admin_forum_modrecommen(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_admin_forum_modrecommen));
	b=b.concat(write_MSG_admin_forum_modrecommen(o));
	return b;
}
function write_MSG_admin_forum_modrecommen(o){
	var b=[];
	b=b.concat(write_string(o.Open));
	b=b.concat(write_string(o.Sort));
	b=b.concat(write_string(o.Orderby));
	b=b.concat(write_string(o.Num));
	b=b.concat(write_string(o.Imagenum));
	b=b.concat(write_string(o.Imagewidth));
	b=b.concat(write_string(o.Imageheight));
	b=b.concat(write_string(o.Maxlength));
	b=b.concat(write_string(o.Cachelife));
	b=b.concat(write_string(o.Dateline));
	return b
}
function read_MSG_admin_forum_modrecommen(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Open=r.o
	r=read_string(r.b);
	o.Sort=r.o
	r=read_string(r.b);
	o.Orderby=r.o
	r=read_string(r.b);
	o.Num=r.o
	r=read_string(r.b);
	o.Imagenum=r.o
	r=read_string(r.b);
	o.Imagewidth=r.o
	r=read_string(r.b);
	o.Imageheight=r.o
	r=read_string(r.b);
	o.Maxlength=r.o
	r=read_string(r.b);
	o.Cachelife=r.o
	r=read_string(r.b);
	o.Dateline=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_admin_forum_threadsorts(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_admin_forum_threadsorts));
	b=b.concat(write_MSG_admin_forum_threadsorts(o));
	return b;
}
function write_MSG_admin_forum_threadsorts(o){
	var b=[];
	b=b.concat(write_int8(o.Status));
	b=b.concat(write_string(o.Required));
	b=b.concat(write_string(o.Prefix));
	b=b.concat(write_string(o.Default));
	return b
}
function read_MSG_admin_forum_threadsorts(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);
	o.Status=r.o
	r=read_string(r.b);
	o.Required=r.o
	r=read_string(r.b);
	o.Prefix=r.o
	r=read_string(r.b);
	o.Default=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_admin_forum_threadtypes(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_admin_forum_threadtypes));
	b=b.concat(write_MSG_admin_forum_threadtypes(o));
	return b;
}
function write_MSG_admin_forum_threadtypes(o){
	var b=[];
	b=b.concat(write_int32(o.Fid));
	b=b.concat(write_int8(o.Status));
	b=b.concat(write_int8(o.Required));
	b=b.concat(write_int8(o.Listable));
	b=b.concat(write_int8(o.Prefix));
	if(o.Types){
		b=b.concat(write_int16(o.Types.length))
		for(var i=0;i<o.Types.length;i++){
			b=b.concat(write_MSG_admin_forum_type(o.Types[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	if(o.Add){
		b=b.concat(write_int16(o.Add.length))
		for(var i=0;i<o.Add.length;i++){
			b=b.concat(write_MSG_admin_forum_type(o.Add[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	if(o.Deletes){
		b=b.concat(write_int16(o.Deletes.length))
		for(var i=0;i<o.Deletes.length;i++){
			b=b.concat(write_int16(o.Deletes[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	return b
}
function read_MSG_admin_forum_threadtypes(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Fid=r.o
	r=read_int8(r.b);
	o.Status=r.o
	r=read_int8(r.b);
	o.Required=r.o
	r=read_int8(r.b);
	o.Listable=r.o
	r=read_int8(r.b);
	o.Prefix=r.o
	r=read_int16(r.b);var l=r.o;if(l>0)o.Types=[]
	for(var i=0;i<l;i++){
		r=read_MSG_admin_forum_type(r.b)
		o.Types.push(r.o)
	}
	r=read_int16(r.b);var l=r.o;if(l>0)o.Add=[]
	for(var i=0;i<l;i++){
		r=read_MSG_admin_forum_type(r.b)
		o.Add.push(r.o)
	}
	r=read_int16(r.b);var l=r.o;if(l>0)o.Deletes=[]
	for(var i=0;i<l;i++){
		r=read_int16(r.b)
		o.Deletes.push(r.o)
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_admin_forum_type(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_admin_forum_type));
	b=b.concat(write_MSG_admin_forum_type(o));
	return b;
}
function write_MSG_admin_forum_type(o){
	var b=[];
	b=b.concat(write_int16(o.Id));
	b=b.concat(write_int16(o.Displayorder));
	b=b.concat(write_string(o.Name));
	b=b.concat(write_string(o.Icon));
	b=b.concat(write_int8(o.Enable));
	b=b.concat(write_int8(o.Moderators));
	return b
}
function read_MSG_admin_forum_type(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);
	o.Id=r.o
	r=read_int16(r.b);
	o.Displayorder=r.o
	r=read_string(r.b);
	o.Name=r.o
	r=read_string(r.b);
	o.Icon=r.o
	r=read_int8(r.b);
	o.Enable=r.o
	r=read_int8(r.b);
	o.Moderators=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_admin_forum_edit_ext(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_admin_forum_edit_ext));
	b=b.concat(write_MSG_admin_forum_edit_ext(o));
	return b;
}
function write_MSG_admin_forum_edit_ext(o){
	var b=[];
	b=b.concat(write_int8(o.Forumcolumns));
	return b
}
function read_MSG_admin_forum_edit_ext(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);
	o.Forumcolumns=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_menu_forums_moderators(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_menu_forums_moderators));
	b=b.concat(write_MSG_U2WS_Admin_menu_forums_moderators(o));
	return b;
}
function write_MSG_U2WS_Admin_menu_forums_moderators(o){
	var b=[];
	b=b.concat(write_int32(o.Fid));
	return b
}
function read_MSG_U2WS_Admin_menu_forums_moderators(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Fid=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_Admin_menu_forums_moderators(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_Admin_menu_forums_moderators));
	b=b.concat(write_MSG_WS2U_Admin_menu_forums_moderators(o));
	return b;
}
function write_MSG_WS2U_Admin_menu_forums_moderators(o){
	var b=[];
	b=b.concat(write_int32(o.Fid));
	b=b.concat(write_string(o.Name));
	if(o.Moderators){
		b=b.concat(write_int16(o.Moderators.length))
		for(var i=0;i<o.Moderators.length;i++){
			b=b.concat(write_MSG_admin_forums_moderator(o.Moderators[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	if(o.Groups){
		b=b.concat(write_int16(o.Groups.length))
		for(var i=0;i<o.Groups.length;i++){
			b=b.concat(write_MSG_admin_forums_group(o.Groups[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	return b
}
function read_MSG_WS2U_Admin_menu_forums_moderators(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Fid=r.o
	r=read_string(r.b);
	o.Name=r.o
	r=read_int16(r.b);var l=r.o;if(l>0)o.Moderators=[]
	for(var i=0;i<l;i++){
		r=read_MSG_admin_forums_moderator(r.b)
		o.Moderators.push(r.o)
	}
	r=read_int16(r.b);var l=r.o;if(l>0)o.Groups=[]
	for(var i=0;i<l;i++){
		r=read_MSG_admin_forums_group(r.b)
		o.Groups.push(r.o)
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_admin_forums_moderator(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_admin_forums_moderator));
	b=b.concat(write_MSG_admin_forums_moderator(o));
	return b;
}
function write_MSG_admin_forums_moderator(o){
	var b=[];
	b=b.concat(write_int32(o.Uid));
	b=b.concat(write_int16(o.Displayorder));
	b=b.concat(write_string(o.Name));
	b=b.concat(write_int16(o.Groupid));
	return b
}
function read_MSG_admin_forums_moderator(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Uid=r.o
	r=read_int16(r.b);
	o.Displayorder=r.o
	r=read_string(r.b);
	o.Name=r.o
	r=read_int16(r.b);
	o.Groupid=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_admin_forums_group(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_admin_forums_group));
	b=b.concat(write_MSG_admin_forums_group(o));
	return b;
}
function write_MSG_admin_forums_group(o){
	var b=[];
	b=b.concat(write_int16(o.Groupid));
	b=b.concat(write_string(o.Groupname));
	return b
}
function read_MSG_admin_forums_group(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);
	o.Groupid=r.o
	r=read_string(r.b);
	o.Groupname=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_Edit_forums_moderator(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_Edit_forums_moderator));
	b=b.concat(write_MSG_U2WS_Admin_Edit_forums_moderator(o));
	return b;
}
function write_MSG_U2WS_Admin_Edit_forums_moderator(o){
	var b=[];
	b=b.concat(write_int32(o.Fid));
	if(o.Deletes){
		b=b.concat(write_int16(o.Deletes.length))
		for(var i=0;i<o.Deletes.length;i++){
			b=b.concat(write_int32(o.Deletes[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	if(o.Edit){
		b=b.concat(write_int16(o.Edit.length))
		for(var i=0;i<o.Edit.length;i++){
			b=b.concat(write_MSG_admin_forums_moderator(o.Edit[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	if(o.Add){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_admin_forums_moderator(o.Add));
	}else{
		b=b.concat(write_int8(0))
	}
	return b
}
function read_MSG_U2WS_Admin_Edit_forums_moderator(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Fid=r.o
	r=read_int16(r.b);var l=r.o;if(l>0)o.Deletes=[]
	for(var i=0;i<l;i++){
		r=read_int32(r.b)
		o.Deletes.push(r.o)
	}
	r=read_int16(r.b);var l=r.o;if(l>0)o.Edit=[]
	for(var i=0;i<l;i++){
		r=read_MSG_admin_forums_moderator(r.b)
		o.Edit.push(r.o)
	}
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_admin_forums_moderator(r.b);
		o.Add=r.o
	}
	return {o:o,b:r.b}
}
