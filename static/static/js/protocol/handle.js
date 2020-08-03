function read_msg(b){
	var cmd = read_int32(b),r={};
	switch(cmd.o){
	case -704884081:
		r=read_MSG_U2WS_Checkseccode(cmd.b)
		break
	case -204476842:
		r=read_MSG_U2WS_CheckRegister(cmd.b)
		break
	case 142633269:
		r=read_MSG_admin_forum_three(cmd.b)
		break
	case -1405787337:
		r=read_MSG_U2WS_Admin_menu_forums_edit(cmd.b)
		break
	case 1448265555:
		r=read_MSG_block_item_field(cmd.b)
		break
	case -1736066974:
		r=read_MSG_WS2U_nextset(cmd.b)
		break
	case 885980426:
		r=read_MSG_U2WS_viewthreadmod(cmd.b)
		break
	case -34596055:
		r=read_MSG_WS2U_custommenu(cmd.b)
		break
	case -303705781:
		r=read_MSG_Admin_setting_functions_guide(cmd.b)
		break
	case -1451137317:
		r=read_MSG_diy_tab(cmd.b)
		break
	case -47517347:
		r=read_MSG_admin_forum_threadsorts(cmd.b)
		break
	case -796428201:
		r=read_MSG_WS2U_Forum_newthread_submit(cmd.b)
		break
	case -713593028:
		r=read_MSG_U2WS_GetChangeBindUrl(cmd.b)
		break
	case 1185077681:
		r=read_MSG_WS2U_Common_Head(cmd.b)
		break
	case 943159600:
		r=read_MSG_WS2U_Admin_menu_forums_edit(cmd.b)
		break
	case -1505563183:
		r=read_MSG_admin_forum_edit_ext(cmd.b)
		break
	case 386708394:
		r=read_MSG_diy_first(cmd.b)
		break
	case -950215658:
		r=read_MSG_SpacePost(cmd.b)
		break
	case -467585541:
		r=read_MSG_S2C_Conn_Client(cmd.b)
		break
	case 1303724428:
		r=read_MSG_forum_thread_forum(cmd.b)
		break
	case -1210591342:
		r=read_MSG_WS2U_forum_carlist(cmd.b)
		break
	case 1506905850:
		r=read_MSG_WS2U_UserLogin(cmd.b)
		break
	case 1849790434:
		r=read_MSG_U2WS_GetRegister(cmd.b)
		break
	case -1451728518:
		r=read_MSG_add_extcredits(cmd.b)
		break
	case 1419751991:
		r=read_MSG_U2WS_ResetPW(cmd.b)
		break
	case -1981134582:
		r=read_MSG_U2WS_Getseccode(cmd.b)
		break
	case 54726888:
		r=read_MSG_U2WS_ChangePasswd(cmd.b)
		break
	case -981386295:
		r=read_MSG_U2WS_Admin_menu_forums_index(cmd.b)
		break
	case -540414860:
		r=read_MSG_admin_forum_edit_base(cmd.b)
		break
	case 1780863600:
		r=read_MSG_admin_forum_threadtypes(cmd.b)
		break
	case 814047536:
		r=read_MSG_diy_frame(cmd.b)
		break
	case -1830850073:
		r=read_MSG_U2WS_Admin_edit_setting_functions_recommend(cmd.b)
		break
	case 107399903:
		r=read_MSG_diy_block(cmd.b)
		break
	case -302662362:
		r=read_MSG_U2WS_GetThreadBind(cmd.b)
		break
	case -160848332:
		r=read_MSG_U2WS_Gettoken(cmd.b)
		break
	case -1328936102:
		r=read_MSG_U2WS_PollThread(cmd.b)
		break
	case 1315240586:
		r=read_MSG_forum_savethread(cmd.b)
		break
	case -1590634053:
		r=read_MSG_U2WS_nextset(cmd.b)
		break
	case 529232478:
		r=read_MSG_U2WS_Admin_edit_setting_functions_other(cmd.b)
		break
	case 755023070:
		r=read_MSG_forum(cmd.b)
		break
	case 436275943:
		r=read_MSG_WS2U_CommonResult(cmd.b)
		break
	case -511404881:
		r=read_MSG_U2WS_Admin_edit_setting_functions_heatthread(cmd.b)
		break
	case 866031831:
		r=read_MSG_U2WS_UserLogin(cmd.b)
		break
	case -1418299074:
		r=read_MSG_block_style(cmd.b)
		break
	case 548015641:
		r=read_MSG_WS2U_GetChangeBindUrl(cmd.b)
		break
	case 304149348:
		r=read_MSG_WS2U_ChangePasswd_Gethash(cmd.b)
		break
	case 1251023957:
		r=read_MSG_admin_forum_cart(cmd.b)
		break
	case -740027387:
		r=read_MSG_diy_info(cmd.b)
		break
	case -1077254663:
		r=read_MSG_U2WS_GetPostWarnList(cmd.b)
		break
	case -1181151646:
		r=read_MSG_WS2U_Ping(cmd.b)
		break
	case -368188665:
		r=read_MSG_U2WS_Admin_menu_setting_basic(cmd.b)
		break
	case 1617053915:
		r=read_MSG_block_template_order(cmd.b)
		break
	case -1106524571:
		r=read_MSG_U2WS_forum_viewthread(cmd.b)
		break
	case 1199011583:
		r=read_MSG_U2WS_delete_attach(cmd.b)
		break
	case -371741980:
		r=read_MSG_U2WS_Admin_edit_setting_functions_mod(cmd.b)
		break
	case -2109377824:
		r=read_MSG_userprofiles(cmd.b)
		break
	case 256949028:
		r=read_MSG_block_template_s(cmd.b)
		break
	case -35410442:
		r=read_MSG_forum_lastpost(cmd.b)
		break
	case 104018229:
		r=read_MSG_forum_threadtype(cmd.b)
		break
	case 1189377635:
		r=read_MSG_forum_post(cmd.b)
		break
	case -446167730:
		r=read_MSG_U2WS_GetHead(cmd.b)
		break
	case 2145302771:
		r=read_MSG_forum_threadrush(cmd.b)
		break
	case -1265560393:
		r=read_MSG_U2WS_tpl_success(cmd.b)
		break
	case 735634866:
		r=read_MSG_U2WS_Admin_menu_index(cmd.b)
		break
	case -1627801678:
		r=read_MSG_diy_block_info(cmd.b)
		break
	case -1334594352:
		r=read_MSG_forum_idname(cmd.b)
		break
	case 1883458624:
		r=read_MSG_forum_imgattach(cmd.b)
		break
	case 699095719:
		r=read_MSG_U2WS_Admin_Edit_custommenu(cmd.b)
		break
	case -1531212121:
		r=read_MSG_WS2U_viewthreadmod(cmd.b)
		break
	case -2064054626:
		r=read_MSG_U2WS_Ping(cmd.b)
		break
	case -1380880793:
		r=read_MSG_searchThread(cmd.b)
		break
	case 1329334923:
		r=read_MSG_U2WS_upload_avatar(cmd.b)
		break
	case 1027411378:
		r=read_MSG_U2WS_Edit_Profile(cmd.b)
		break
	case 157251877:
		r=read_MSG_WS2U_Gettoken(cmd.b)
		break
	case -687733422:
		r=read_MSG_WS2U_delete_attach(cmd.b)
		break
	case 1848054995:
		r=read_MSG_U2WS_threadmod(cmd.b)
		break
	case 1760833800:
		r=read_MSG_SpaceThread(cmd.b)
		break
	case 73925374:
		r=read_MSG_WS2U_threadmod(cmd.b)
		break
	case 494965013:
		r=read_MSG_U2WS_spacecp(cmd.b)
		break
	case 1334552719:
		r=read_MSG_U2WS_LostPW(cmd.b)
		break
	case 1779812911:
		r=read_MSG_U2WS_Admin_menu_setting_access(cmd.b)
		break
	case -1538758015:
		r=read_MSG_U2WS_Admin_edit_setting_functions_threadexp(cmd.b)
		break
	case -599911739:
		r=read_MSG_favorite_forum(cmd.b)
		break
	case -1523481925:
		r=read_MSG_usergroup(cmd.b)
		break
	case -1375386023:
		r=read_MSG_U2WS_forum_newthread(cmd.b)
		break
	case 1296010750:
		r=read_MSG_post_ratelog(cmd.b)
		break
	case -1073456288:
		r=read_MSG_WS2U_QQLogin(cmd.b)
		break
	case 1617924422:
		r=read_MSG_WS2U_tpl_success(cmd.b)
		break
	case 1316147567:
		r=read_MSG_Admin_setting_functions_recommend(cmd.b)
		break
	case 206405707:
		r=read_MSG_U2WS_Admin_edit_setting_functions_guide(cmd.b)
		break
	case 1392055914:
		r=read_MSG_U2WS_Admin_edit_setting_functions_activity(cmd.b)
		break
	case -1092979582:
		r=read_MSG_diy_column(cmd.b)
		break
	case 1801302893:
		r=read_MSG_Admin_setting_access(cmd.b)
		break
	case 1000231794:
		r=read_MSG_U2WS_forum_index(cmd.b)
		break
	case -2088438621:
		r=read_MSG_forum_post_medal(cmd.b)
		break
	case 98456939:
		r=read_MSG_U2WS_Admin_menu_setting_functions(cmd.b)
		break
	case -1378201131:
		r=read_MSG_U2WS_diy_save(cmd.b)
		break
	case 405274830:
		r=read_MSG_block_item_showstyle(cmd.b)
		break
	case 664970303:
		r=read_MSG_U2WS_forum_carlist(cmd.b)
		break
	case -2077234963:
		r=read_MSG_U2WS_BindAccount(cmd.b)
		break
	case -840121397:
		r=read_MSG_admin_forum_type(cmd.b)
		break
	case 806931670:
		r=read_MSG_forum_post_rush(cmd.b)
		break
	case -111561876:
		r=read_MSG_WS2U_LostPW(cmd.b)
		break
	case 1831523310:
		r=read_MSG_WS2U_ResetPW(cmd.b)
		break
	case 1078788684:
		r=read_MSG_setting_activityfield(cmd.b)
		break
	case 1061377392:
		r=read_MSG_WS2U_upload_tmp_image(cmd.b)
		break
	case -480884745:
		r=read_MSG_forum_attach(cmd.b)
		break
	case 1272358720:
		r=read_MSG_WS2U_forum_viewthread(cmd.b)
		break
	case 2105593483:
		r=read_MSG_WS2U_GetThreadBind(cmd.b)
		break
	case 2028325385:
		r=read_MSG_Admin_setting_functions_threadexp(cmd.b)
		break
	case 471008838:
		r=read_MSG_diy_attr(cmd.b)
		break
	case -548832986:
		r=read_MSG_WS2U_upload_avatar(cmd.b)
		break
	case 127228310:
		r=read_MSG_U2WS_SpacecpGroup(cmd.b)
		break
	case -839162471:
		r=read_MSG_WS2U_SpacecpGroup(cmd.b)
		break
	case 426252242:
		r=read_MSG_U2WS_Admin_menu_misc_custommenu(cmd.b)
		break
	case -786656194:
		r=read_MSG_Admin_setting_functions_comment(cmd.b)
		break
	case -1580472055:
		r=read_MSG_WS2U_Admin_rebuild_leftmenu(cmd.b)
		break
	case 2090873870:
		r=read_MSG_WS2U_forum_newthread(cmd.b)
		break
	case 1475637593:
		r=read_MSG_U2WS_RecommendThread(cmd.b)
		break
	case 305846558:
		r=read_MSG_U2WS_Email_Verify(cmd.b)
		break
	case 35425425:
		r=read_MSG_U2WS_Admin_edit_setting_access(cmd.b)
		break
	case -1249765676:
		r=read_MSG_forum_cart_child(cmd.b)
		break
	case 56019999:
		r=read_MSG_U2WS_Getlogin(cmd.b)
		break
	case -1812486996:
		r=read_MSG_WS2U_searchThread(cmd.b)
		break
	case -135332941:
		r=read_MSG_U2WS_settoken(cmd.b)
		break
	case 1673174523:
		r=read_MSG_WS2U_CheckRegister(cmd.b)
		break
	case 1761115921:
		r=read_MSG_forum_index_cart(cmd.b)
		break
	case -1934823944:
		r=read_MSG_post_comment(cmd.b)
		break
	case -814838689:
		r=read_MSG_U2WS_Login_Gethash(cmd.b)
		break
	case 621846417:
		r=read_MSG_WS2U_SpacecpForum(cmd.b)
		break
	case 1710690038:
		r=read_MSG_WS2U_Server_OK(cmd.b)
		break
	case -848292620:
		r=read_MSG_U2WS_Admin_edit_setting_functions_comment(cmd.b)
		break
	case 1595670514:
		r=read_MSG_WS2U_Login_Gethash(cmd.b)
		break
	case 1189303805:
		r=read_MSG_forum_modrecommend(cmd.b)
		break
	case -1867493945:
		r=read_MSG_forum_type(cmd.b)
		break
	case -1667725759:
		r=read_MSG_Admin_setting_functions_mod(cmd.b)
		break
	case 276821048:
		r=read_MSG_U2WS_ChangeBind(cmd.b)
		break
	case 37433885:
		r=read_MSG_Admin_setting_functions_heatthread(cmd.b)
		break
	case 1969915046:
		r=read_MSG_U2WS_threadfastpost(cmd.b)
		break
	case -276913250:
		r=read_MSG_U2WS_SpacecpForum(cmd.b)
		break
	case 578970688:
		r=read_MSG_block_template(cmd.b)
		break
	case 117099868:
		r=read_MSG_block_item(cmd.b)
		break
	case -105825607:
		r=read_MSG_U2WS_QQLogin(cmd.b)
		break
	case -866489977:
		r=read_MSG_U2WS_forum_recyclebin(cmd.b)
		break
	case -665524975:
		r=read_MSG_WS2U_Email_Verify(cmd.b)
		break
	case 1534176368:
		r=read_MSG_WS2U_Admin_menu_forums_index(cmd.b)
		break
	case -1477628465:
		r=read_MSG_U2WS_Admin_delete_forum(cmd.b)
		break
	case 774094179:
		r=read_MSG_U2WS_forum_modcp(cmd.b)
		break
	case -1811127086:
		r=read_MSG_forum_replycredit(cmd.b)
		break
	case 399348313:
		r=read_MSG_forum_cart(cmd.b)
		break
	case -1619289269:
		r=read_MSG_U2WS_QQLoginUrl(cmd.b)
		break
	case 1184955545:
		r=read_MSG_WS2U_PollThread_sucess(cmd.b)
		break
	case -10820895:
		r=read_MSG_admin_forums_moderator(cmd.b)
		break
	case 2117521190:
		r=read_MSG_forum_album(cmd.b)
		break
	case -1863283440:
		r=read_MSG_U2WS_forum(cmd.b)
		break
	case -1799904226:
		r=read_MSG_U2WS_SpaceThread(cmd.b)
		break
	case 2087726285:
		r=read_MSG_threadmod(cmd.b)
		break
	case -380025767:
		r=read_MSG_poll_option(cmd.b)
		break
	case 607514828:
		r=read_MSG_WS2U_spacecp(cmd.b)
		break
	case 899199166:
		r=read_MSG_U2WS_ChangePasswd_Gethash(cmd.b)
		break
	case 1056482773:
		r=read_MSG_U2WS_Admin_edit_setting_basic(cmd.b)
		break
	case 1555791377:
		r=read_MSG_WS2U_Admin_menu_forums_moderators(cmd.b)
		break
	case -278866301:
		r=read_MSG_WS2U_forum_index(cmd.b)
		break
	case -60812530:
		r=read_MSG_WS2U_Getlogin(cmd.b)
		break
	case -866166167:
		r=read_MSG_WS2U_Getseccode(cmd.b)
		break
	case -1221014720:
		r=read_MSG_C2S_Regedit(cmd.b)
		break
	case 711910816:
		r=read_MSG_forum_group(cmd.b)
		break
	case 292242050:
		r=read_MSG_Poll_info(cmd.b)
		break
	case 1654141527:
		r=read_MSG_WS2U_Admin_menu_setting_functions(cmd.b)
		break
	case -576901504:
		r=read_MSG_WS2U_threadfastpost(cmd.b)
		break
	case 1355902236:
		r=read_MSG_WS2U_BindAccount(cmd.b)
		break
	case 1439360859:
		r=read_MSG_WS2U_ChangeBind(cmd.b)
		break
	case -31251618:
		r=read_MSG_Admin_setting_functions_other(cmd.b)
		break
	case 1959565559:
		r=read_MSG_block_item_showstyle_info(cmd.b)
		break
	case -1141941364:
		r=read_MSG_postreview(cmd.b)
		break
	case 689990192:
		r=read_MSG_GroupIdName(cmd.b)
		break
	case -1575018876:
		r=read_MSG_admin_forum_modrecommen(cmd.b)
		break
	case 1160234390:
		r=read_MSG_U2WS_forum_refresh(cmd.b)
		break
	case -2058288370:
		r=read_MSG_WS2U_RecommendThread(cmd.b)
		break
	case 874163309:
		r=read_MSG_ThreadBind(cmd.b)
		break
	case 691372614:
		r=read_MSG_Conn_Down(cmd.b)
		break
	case 1348090898:
		r=read_MSG_WS2U_Admin_menu_misc_custommenu(cmd.b)
		break
	case 1265224859:
		r=read_MSG_Admin_setting_functions_curscript(cmd.b)
		break
	case -149517524:
		r=read_MSG_WS2U_upload_image(cmd.b)
		break
	case 1479415992:
		r=read_MSG_WS2U_Admin_menu_setting_basic(cmd.b)
		break
	case -871377362:
		r=read_MSG_U2WS_Admin_setting_setnav(cmd.b)
		break
	case 1017770727:
		r=read_MSG_U2WS_space(cmd.b)
		break
	case 831351040:
		r=read_MSG_SpacecpGroupPermission(cmd.b)
		break
	case -1946743894:
		r=read_MSG_U2WS_Admin_edit_forums_index(cmd.b)
		break
	case 1006442797:
		r=read_MSG_U2WS_Admin_menu_forums_moderators(cmd.b)
		break
	case 1959754928:
		r=read_MSG_admin_forums_group(cmd.b)
		break
	case -493836804:
		r=read_MSG_post_member_profile(cmd.b)
		break
	case 1503238307:
		r=read_MSG_U2WS_searchThread(cmd.b)
		break
	case 902427406:
		r=read_MSG_U2WS_Admin_rebuild_leftmenu(cmd.b)
		break
	case 830031817:
		r=read_MSG_WS2U_Admin_menu_setting_access(cmd.b)
		break
	case -2002834216:
		r=read_MSG_WS2U_space(cmd.b)
		break
	case 693391684:
		r=read_MSG_Admin_setting_functions_activity(cmd.b)
		break
	case -1370806890:
		r=read_MSG_diy_title(cmd.b)
		break
	case -961222056:
		r=read_MSG_U2WS_Register(cmd.b)
		break
	case 177318912:
		r=read_MSG_forum_extra(cmd.b)
		break
	case 58375333:
		r=read_MSG_admin_forum_extra(cmd.b)
		break
	case 239411683:
		r=read_MSG_post_ratelog_score(cmd.b)
		break
	case -623998936:
		r=read_MSG_WS2U_QQLoginUrl(cmd.b)
		break
	case -843349899:
		r=read_MSG_U2WS_logout(cmd.b)
		break
	case 616977199:
		r=read_MSG_WS2U_forum(cmd.b)
		break
	case 213874677:
		r=read_MSG_forum_thread(cmd.b)
		break
	case 1149592144:
		r=read_MSG_U2WS_Forum_newthread_submit(cmd.b)
		break
	case -895601579:
		r=read_MSG_U2WS_upload_tmp_image(cmd.b)
		break
	case 1127661264:
		r=read_MSG_post_relateitem(cmd.b)
		break
	case 1031321379:
		r=read_MSG_U2WS_upload_image(cmd.b)
		break
	case 919505458:
		r=read_MSG_U2WS_Admin_AddCustommenu(cmd.b)
		break
	case 2061189765:
		r=read_MSG_admin_forum(cmd.b)
		break
	case 1078534639:
		r=read_MSG_WS2U_SpaceThread(cmd.b)
		break
	case -295518409:
		r=read_MSG_U2WS_Admin_Edit_forums_moderator(cmd.b)
		break
	case 1935059451:
		r=read_MSG_WSU2_Register(cmd.b)
		break
	case 340003950:
		r=read_MSG_C2S_Conn_Client(cmd.b)
		break
	case -1161885165:
		r=read_MSG_WS2U_GetRegister(cmd.b)
		break
	}
	return {cmd:cmd.o,msg:r.o}
}