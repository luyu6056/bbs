
	if(GET('Do')=="" || GET('Do')=="thread"){
		ajax_post(WRITE_MSG_U2WS_SpaceThread({Uid:tpldata.Uid,Type:0}))
	}
	if(GET('Do')=="reply"){
		ajax_post(WRITE_MSG_U2WS_SpaceThread({Uid:tpldata.Uid,Type:1}))
	}
	websocket_func[CMD_MSG_WS2U_SpaceThread]=function(res){
		var html = template("tpl_space_thread", {
		    data: res,
		    cache:cache,
		});
		$('.bm_c').html(html)
	}