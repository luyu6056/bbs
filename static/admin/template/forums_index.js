	if(parent.$('admincpnav')) parent.$('admincpnav').innerHTML='论坛&nbsp;&raquo;&nbsp;版块管理&nbsp;&nbsp;<a target="main" title="添加到常用操作" href="javascript:addCustommenu(\'板块管理\',\'forums_index\')">[+]</a>';
	var forumselect = '';
	for(var i in tpldata.Catlist){
		var cat=tpldata.Catlist[i];
		forumselect+='<optgroup label="--'+cat.Name+'">'
		for(var ii in cat.Forums){
			var forum=cat.Forums[ii];
			forumselect+='<option value="'+forum.Fid+'">'+forum.Name+'</option>'
		}
		forumselect+='</optgroup>'
	}

var rowtypedata = [
	[[1, ''], [1,'<input type="text" class="txt" name="newcatorder" value="0" />', 'td25'], [5, '<div><input name="newcat" value="新分区名称" size="20" type="text" class="txt" /><a href="javascript:;" class="deleterow" onClick="deleterow(this)">删除</a></div>']],
	[[1, ''], [1,'<input type="text" class="txt" name="neworder" value="0" />', 'td25'], [5, '<div class="board"><input name="newforum" fup="{1}" value="新版块名称" size="20" type="text" class="txt" /><a href="javascript:;" class="deleterow" onClick="deleterow(this)">删除</a>']],
	[[1, ''], [1,'<input type="text" class="txt" name="neworder" value="0" />', 'td25'], [5, '<div class="childboard"><input name="newforum" fup="{1}" value="新版块名称" size="20" type="text" class="txt" /><a href="javascript:;" class="deleterow" onClick="deleterow(this)">删除</a>&nbsp;</div>']],
];
	
	_attachEvent(document.documentElement, 'keydown', function (e) { entersubmit(e, 'editsubmit'); });
	$('#leftmenu ul').hide();
	$('#menu_forums').show();
	$('.navon').removeClass('navon');
	$('#header_forums').parents('li').addClass('navon');
	$('.tabon').removeClass('tabon')
	$('#menu_forums #'+GET('tpl')).eq(0).addClass('tabon')
	$('#cpform').submit(function(event) {
		var obj={};
		$('input[name="order"]').each(function(index, el) {
			if(!obj[$(this).attr('fid')]){
				obj[$(this).attr('fid')]={};
			}
			obj[$(this).attr('fid')].order=$(this).val();
		});
		$('input[name="name"]').each(function(index, el) {
			if(!obj[$(this).attr('fid')]){
				obj[$(this).attr('fid')]={};
			}
			obj[$(this).attr('fid')].name=$(this).val();
		});
		var out={};
		out.Forums=[];
		for(var fid in obj){
			var forum=obj[fid];
            out.Forums.push({Fid:fid,Name:forum.name,Displayorder:forum.order})
		}
		out.NewForums=[];
		$('input[name="newcat"]').each(function(index, el) {
			out.NewForums.push({Name:$(this).val(),Displayorder:$('input[name="newcatorder"]').eq(index).val(),Moderators:"group"})
		});
		$('input[name="newforum"]').each(function(index, el) {

			out.NewForums.push({Name:$(this).val(),Displayorder:$(this).parent().find('input[name="neworder"]').val(),Moderators:"forum",Fid:$(this).attr('fup')})
		});
		ajax_post(WRITE_MSG_U2WS_Admin_edit_forums_index(out),function(res){
			showDialog("操作成功","right","提交结果",function(){
				toggleMenu(header_key,GET("tpl"));
			})
		})
		return false;
	});
	function delete_forum(fid){
		ajax_post(WRITE_MSG_U2WS_Admin_delete_forum({Fid:fid}))
	}
	

document.title=cache.Head.Bbname+' 管理中心 - 论坛 - 版块管理'
