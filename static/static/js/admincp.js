/*
	[Discuz!] (C)2001-2099 Comsenz Inc.
	This is NOT a freeware, use is subject to license terms

	$Id: admincp.js 31631 2012-09-17 06:36:25Z monkey $
*/
var ISFRAME=false;
function redirect(url) {
	window.location.replace(url);
}

function scrollTopBody() {
	return Math.max(document.documentElement.scrollTop, document.body.scrollTop);
}

function checkAll(type, form, value, checkall, changestyle) {
	var checkall = checkall ? checkall : 'chkall';
	for(var i = 0; i < form.elements.length; i++) {
		var e = form.elements[i];
		if(type == 'option' && e.type == 'radio' && e.value == value && e.disabled != true) {
			e.checked = true;
		} else if(type == 'value' && e.type == 'checkbox' && e.getAttribute('chkvalue') == value) {
			e.checked = form.elements[checkall].checked;
			if(changestyle) {
				multiupdate(e);
			}
		} else if(type == 'prefix' && e.name && e.name != checkall && (!value || (value && e.name.match(value)))) {
			e.checked = form.elements[checkall].checked;
			if(changestyle) {
				if(e.parentNode && e.parentNode.tagName.toLowerCase() == 'li') {
					e.parentNode.className = e.checked ? 'checked' : '';
				}
				if(e.parentNode.parentNode && e.parentNode.parentNode.tagName.toLowerCase() == 'div') {
					e.parentNode.parentNode.className = e.checked ? 'item checked' : 'item';
				}
			}
		}
	}
}

function altStyle(obj, disabled) {
	function altStyleClear(obj) {
		var input, lis, i;
		lis = obj.parentNode.getElementsByTagName('li');
		for(i=0; i < lis.length; i++){
			lis[i].className = '';
		}
	}
	var disabled = !disabled ? 0 : disabled;
	if(disabled) {
		return;
	}

	var input, lis, i, cc, o;
	cc = 0;
	lis = obj.getElementsByTagName('li');
	for(i=0; i < lis.length; i++){
		lis[i].onclick = function(e) {
			o = BROWSER.ie ? event.srcElement.tagName : e.target.tagName;
			altKey = BROWSER.ie ? window.event.altKey : e.altKey;
			if(cc) {
				return;
			}
			cc = 1;
			input = this.getElementsByTagName('input')[0];
			if(input.getAttribute('type') == 'checkbox' || input.getAttribute('type') == 'radio') {
				if(input.getAttribute('type') == 'radio') {
					altStyleClear(this);
				}

				if(BROWSER.ie || o != 'INPUT' && input.onclick) {
					input.click();
				}
				if(this.className != 'checked') {
					this.className = 'checked';
					input.checked = true;
				} else {
					this.className = '';
					input.checked = false;
				}
				if(altKey && input.name.match(/^multinew\[\d+\]/)) {
					miid = input.id.split('|');
					mi = 0;
					while($(miid[0] + '|' + mi)) {
						$(miid[0] + '|' + mi).checked = input.checked;
						if(input.getAttribute('type') == 'radio') {
							altStyleClear($(miid[0] + '|' + mi).parentNode);
						}
						$(miid[0] + '|' + mi).parentNode.className = input.checked ? 'checked' : '';
						mi++;
					}
				}
			}
		};
		lis[i].onmouseup = function(e) {
			cc = 0;
		}
	}
}

var addrowdirect = 0;
var addrowkey = 0;
function addrow(obj, type) {
	var table = obj.parentNode.parentNode.parentNode.parentNode.parentNode;
	if(!addrowdirect) {
		var row = table.insertRow(obj.parentNode.parentNode.parentNode.rowIndex);
	} else {
		var row = table.insertRow(obj.parentNode.parentNode.parentNode.rowIndex + 1);
	}
	var typedata = rowtypedata[type];
	for(var i = 0; i <= typedata.length - 1; i++) {
		var cell = row.insertCell(i);
		cell.colSpan = typedata[i][0];
		var tmp = typedata[i][1];
		if(typedata[i][2]) {
			cell.className = typedata[i][2];
		}
		tmp = tmp.replace(/\{(n)\}/g, function($1) {return addrowkey;});
		tmp = tmp.replace(/\{(\d+)\}/g, function($1, $2) {return addrow.arguments[parseInt($2) + 1];});
		cell.innerHTML = tmp;
	}
	addrowkey ++;
	addrowdirect = 0;
	$('input[name="inherited"]').on('click', '', function(event) {
		if($(this).prop('checked')){
			$(this).val($(this).attr('fup'))
		}else{
			$(this).val('0');
		}
	});
	$('select[name="select_inherited"]').change(function(){
		$(this).parent().find('input[name="inherited"]').val($(this).val());
	});
}

function deleterow(obj) {
	var table = obj.parentNode.parentNode.parentNode.parentNode.parentNode;
	var tr = obj.parentNode.parentNode.parentNode;
	table.deleteRow(tr.rowIndex);
}
function dropmenu(obj){
	showMenu({'ctrlid':obj.id, 'menuid':obj.id + 'child', 'evt':'mouseover'});
	$(obj.id + 'child').style.top = (parseInt($(obj.id + 'child').style.top) - Math.max(document.body.scrollTop, document.documentElement.scrollTop)) + 'px';
	if(BROWSER.ie > 6 || !BROWSER.ie) {
		$(obj.id + 'child').style.left = (parseInt($(obj.id + 'child').style.left) - Math.max(document.body.scrollLeft, document.documentElement.scrollLeft)) + 'px';
	}
}

function insertunit(obj, text, textend) {
	obj.focus();
	textend = isUndefined(textend) ? '' : textend;
	if(!isUndefined(obj.selectionStart)) {
		var opn = obj.selectionStart + 0;
		if(textend != '') {
			text = text + obj.substring(obj.selectionStart, obj.selectionEnd) + textend;
		}
		obj.value = obj.value.substr(0, obj.selectionStart) + text + obj.value.substr(obj.selectionEnd);
		obj.selectionStart = opn + strlen(text);
		obj.selectionEnd = opn + strlen(text);
	} else if(document.selection && document.selection.createRange) {
		var sel = document.selection.createRange();
		if(textend != '') {
			text = text + sel.text + textend;
		}
		sel.text = text.replace(/\r?\n/g, '\r\n');
		sel.moveStart('character', -strlen(text));
	} else {
	       obj.value += text;
	}
	obj.focus();
}

var heightag = BROWSER.chrome ? 4 : 0;
function textareakey(obj, event) {
	if(event.keyCode == 9) {
		insertunit(obj, '\t');
		doane(event);
	}
}

function textareasize(obj, op) {
	if(!op) {
		if(obj.scrollHeight > 70) {
			obj.style.height = (obj.scrollHeight < 300 ? obj.scrollHeight - heightag: 300) + 'px';
			if(obj.style.position == 'absolute') {
				obj.parentNode.style.height = (parseInt(obj.style.height) + 20) + 'px';
			}
		}
	} else {
		if(obj.style.position == 'absolute') {
			obj.style.position = '';
			obj.style.width = '';
			obj.parentNode.style.height = '';
		} else {
			obj.parentNode.style.height = obj.parentNode.offsetHeight + 'px';
			obj.style.width = BROWSER.ie > 6 || !BROWSER.ie ? '90%' : '600px';
			obj.style.position = 'absolute';
		}
	}
}

function showanchor(obj) {
	var navs = $('submenu').getElementsByTagName('li');
	for(var i = 0; i < navs.length; i++) {
		if(navs[i].id.substr(0, 4) == 'nav_' && navs[i].id != obj.id) {
			if($(navs[i].id.substr(4))) {
				navs[i].className = '';
				$(navs[i].id.substr(4)).style.display = 'none';
				if($(navs[i].id.substr(4) + '_tips')) $(navs[i].id.substr(4) + '_tips').style.display = 'none';
			}
		}
	}
	obj.className = 'current';
	currentAnchor = obj.id.substr(4);
	history.replaceState('', document.title, document.location.href.replace(/&anchor=[^&]+/,'')+'&anchor='+currentAnchor);
	$(currentAnchor).style.display = '';
	if($(currentAnchor + '_tips')) $(currentAnchor + '_tips').style.display = '';
	if($(currentAnchor + 'form')) {
		$(currentAnchor + 'form').anchor.value = currentAnchor;
	} else if($('cpform')) {
		$('cpform').anchor.value = currentAnchor;
	}
}

function updatecolorpreview(obj) {
	$(obj).style.background = $(obj + '_v').value;
}

function entersubmit(e, name) {
	if(loadUserdata('is_blindman')) {
		return false;
	}
	e = e ? e : event;
	if(e.keyCode != 13) {
		return;
	}
	var tag = BROWSER.ie ? e.srcElement.tagName : e.target.tagName;
	if(tag != 'TEXTAREA') {
		doane(e);
		if($('submit_' + name).offsetWidth) {
			$('formscrolltop').value = document.documentElement.scrollTop;
			$('submit_' + name).click();
		}
	}
}

function parsetag(tag) {
	var parse = function (tds) {
		for(var i = 0; i < tds.length; i++) {
			if(tds[i].getAttribute('s') == '1') {
				var str = tds[i].innerHTML.replace(/(^|>)([^<]+)(?=<|$)/ig, function($1, $2, $3) {
					if(tag && $3.indexOf(tag) != -1) {
						re = new RegExp(tag, "g");
						$3 = $3.replace(re, '<h_>');
					}
					return $2 + $3;
					});
				tds[i].innerHTML = str.replace(/<h_>/ig, function($1, $2) {
					return '<font class="highlight">' + tag + '</font>';
					});
			}
		}
	};
	parse(document.body.getElementsByTagName('td'));
	parse(document.body.getElementsByTagName('span'));
}

function sdisplay(id, obj) {
	obj.innerHTML = $(id).style.display == 'none' ? '<img src="static/image/admincp/desc.gif" style="vertical-align:middle" />' : '<img src="static/image/admincp/add.gif" style="vertical-align:middle" />';
	display(id);
}

if(ISFRAME) {
	try {
		_attachEvent(document.documentElement, 'keydown', parent.resetEscAndF5);
	} catch(e) {}
}

var multiids = new Array();
function multiupdate(obj) {
	v = obj.value;
	if(obj.checked) {
		multiids[v] = v;
	} else {
		multiids[v] = null;
	}
}

function getmultiids() {
	var ids = '', comma = '';
	for(i in multiids) {
		if(multiids[i] != null) {
			ids += comma + multiids[i];
			comma = ',';
		}
	}
	return ids;
}


function toggle_group(oid, obj, conf) {
	obj = obj ? obj : $('a_'+oid);
	if(!conf) {
		var conf = {'show':'[-]','hide':'[+]'};
	}
	var obody = $(oid);
	if(obody.style.display == 'none') {
		obody.style.display = '';
		obj.innerHTML = conf.show;
	} else {
		obody.style.display = 'none';
		obj.innerHTML = conf.hide;
	}
}
function show_all() {
	var tbodys = $("cpform").getElementsByTagName('tbody');
	for(var i = 0; i < tbodys.length; i++) {
		var re = /^group_(\d+)$/;
		var matches = re.exec(tbodys[i].id);
		if(matches != null) {
			tbodys[i].style.display = '';
			$('a_group_' + matches[1]).innerHTML = '[-]';
		}
	}
}
function hide_all() {
	var tbodys = $("cpform").getElementsByTagName('tbody');
	for(var i = 0; i < tbodys.length; i++) {
		var re = /^group_(\d+)$/;
		var matches = re.exec(tbodys[i].id);
		if(matches != null) {
			tbodys[i].style.display = 'none';
			$('a_group_' + matches[1]).innerHTML = '[+]';
		}
	}
}

function show_all_hook(prefix, tagname) {
	var tbodys = $("cpform").getElementsByTagName(tagname);
	for(var i = 0; i < tbodys.length; i++) {
		var re = new RegExp('^' + prefix + '(.+)$');
		var matches = re.exec(tbodys[i].id);
		if(matches != null) {
			tbodys[i].style.display = '';
			$('a_' + prefix + matches[1]).innerHTML = '[-]';
		}
	}
}

function hide_all_hook(prefix, tagname) {
	var tbodys = $("cpform").getElementsByTagName(tagname);
	for(var i = 0; i < tbodys.length; i++) {
		var re = new RegExp('^' + prefix + '(.+)$');
		var matches = re.exec(tbodys[i].id);
		if(matches != null) {
			tbodys[i].style.display = 'none';
			$('a_' + prefix + matches[1]).innerHTML = '[+]';
		}
	}
}

function srchforum() {
	var fname = $('srchforumipt').value.toLowerCase();
	if(!fname) return false;
	var inputs = $("cpform").getElementsByTagName('input');
	for(var i = 0; i < inputs.length; i++) {
		if(inputs[i].name.match(/^name\[\d+\]$/)) {
			if(inputs[i].value.toLowerCase().indexOf(fname) !== -1) {
				inputs[i].parentNode.parentNode.parentNode.parentNode.style.display = '';
				inputs[i].parentNode.parentNode.parentNode.style.background = '#eee';
				window.scrollTo(0, fetchOffset(inputs[i]).top - 100);
				return false;
			}
		}
	}
	return false;
}

function setfaq(obj, id) {
	if(!$(id)) {
		return;
	}
	$(id).style.display = '';
	if(!obj.onmouseout) {
		obj.onmouseout = function () {
			$(id).style.display = 'none';
		}
	}
}

function floatbottom(id) {
	if(!$(id)) {
		return;
	}
	$(id).style.position = 'fixed';
	$(id).style.bottom = '0';
	$(id).parentNode.style.paddingBottom = '15px';
	if(!BROWSER.ie || BROWSER.ie && BROWSER.ie > 6) {
		window.onscroll = function() {
			var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
			$(id).style.marginLeft = '-' + scrollLeft + 'px';
		};
		$(id).style.display = '';
	}
}

var sethtml_id = null;
function sethtml(id) {
	$(id).className = 'txt html';
	$(id).contentEditable = true;
	$(id).onkeyup = function () {
		$(id + '_v').value = $(id).innerHTML;
	};
	var curvalue = $(id).innerHTML;

	var div = document.createElement('div');
	div.id = id + '_c_menu';
	div.style.display = 'none';
	div.innerHTML = '<iframe id="' + id + '_c_frame" src="" frameborder="0" width="210" height="148" scrolling="no"></iframe>';
	$(id).parentNode.appendChild(div);

	var btn = document.createElement('input');
	btn.id = id + '_c';
	btn.type = 'button';
	btn.className = 'htmlbtn c';
	if(curvalue.search(/<font/ig) !== -1) {
		btn.className = 'htmlbtn c current';
	}
	btn.onclick = function() {
		$(id + '_c_frame').src = 'static/image/admincp/getcolor.htm?||sethtml_color';
		showMenu({'ctrlid' : id + '_c'});
		sethtml_id = id;
	};
	$(id).parentNode.appendChild(btn);

	var btn = document.createElement('input');
	btn.id = id + '_b';
	btn.type = 'button';
	btn.className = 'htmlbtn b';
	if(curvalue.search(/<b>/ig) !== -1) {
		btn.className = 'htmlbtn b current';
	}
	btn.onclick = function() {
		var oldvalue = $(id).innerHTML;
		$(id).innerHTML = preg_replace(['<b>', '</b>'], '', $(id).innerHTML);
		if(oldvalue == $(id).innerHTML) {
			$(id + '_b').className = 'htmlbtn b current';
			$(id).innerHTML = '<b>' + $(id).innerHTML + '</b>';
		} else {
			$(id + '_b').className = 'htmlbtn b';
		}
		$(id + '_v').value = $(id).innerHTML;
	};
	$(id).parentNode.appendChild(btn);

	var btn = document.createElement('input');
	btn.id = id + '_i';
	btn.type = 'button';
	btn.className = 'htmlbtn i';
	if(curvalue.search(/<i>/ig) !== -1) {
		btn.className = 'htmlbtn i current';
	}
	btn.onclick = function() {
		var oldvalue = $(id).innerHTML;
		$(id).innerHTML = preg_replace(['<i>', '</i>'], '', $(id).innerHTML);
		if(oldvalue == $(id).innerHTML) {
			$(id + '_i').className = 'htmlbtn i current';
			$(id).innerHTML = '<i>' + $(id).innerHTML + '</i>';
		} else {
			$(id + '_i').className = 'htmlbtn i';
		}
		$(id + '_v').value = $(id).innerHTML;
	};
	$(id).parentNode.appendChild(btn);

	var btn = document.createElement('input');
	btn.id = id + '_u';
	btn.type = 'button';
	btn.style.textDecoration = 'underline';
	btn.className = 'htmlbtn u';
	if(curvalue.search(/<u>/ig) !== -1) {
		btn.className = 'htmlbtn u current';
	}
	btn.onclick = function() {
		var oldvalue = $(id).innerHTML;
		$(id).innerHTML = preg_replace(['<u>', '</u>'], '', $(id).innerHTML);
		if(oldvalue == $(id).innerHTML) {
			$(id + '_u').className = 'htmlbtn u current';
			$(id).innerHTML = '<u>' + $(id).innerHTML + '</u>';
		} else {
			$(id + '_u').className = 'htmlbtn u';
		}
		$(id + '_v').value = $(id).innerHTML;
	};
	$(id).parentNode.appendChild(btn);
}

function sethtml_color(color) {
	$(sethtml_id).innerHTML = preg_replace(['<font[^>]+?>', '</font>'], '', $(sethtml_id).innerHTML);
	if(color != 'transparent') {
		$(sethtml_id + '_c').className = 'htmlbtn c current';
		$(sethtml_id).innerHTML = '<font color=' + color + '>' + $(sethtml_id).innerHTML + '</font>';
	} else {
		$(sethtml_id + '_c').className = 'htmlbtn c';
	}
	$(sethtml_id + '_v').value = $(sethtml_id).innerHTML;
}

function uploadthreadtypexml(formobj, formaction) {
	formobj.action = formaction;
	formobj.submit();
}
ApiUrl = ApiUrl.replace("/ws","/admin")
var menu = {}
JSPATH = '/static/js/';
VERHASH = 't=';
SITEURL='/';
IMGDIR = '/static/image/common';
$(function(){ 
	reload()
}); 
function reload(){
	rebuild_leftmenu(function(){
		header_key=loadUserdata("header_key")
		tpl=GET("tpl")
		if(header_key==null){
			header_key='index';
			tpl=menu[header_key].left[0].func
		}
		if(tpl==""){
			if(menu[header_key]==undefined){
				header_key='index';
			}
			tpl=menu[header_key].left[0].func
		}
		var admin_menu=GET('menu');
		if(admin_menu==''){
			admin_menu='index'
		}
		　　var html = template("tpl_topmenu", {
			menu: menu,
		});
		$('#topmenu').html(html);

		toggleMenu(header_key,tpl);
		initCpMap();
		initCpMenus('mapmenu');
		resizeHeadermenu();
	})
}
var toggleparam={}
function toggleMenu(key, url) {
	menukey = key;	
	if(url) {
		toggleparam={}
		saveUserdata("header_key",key)
		var s=location.search.replace(/\?tpl=[^&]+&?/,"").split("&")
		if(s[0]!=""){
			for(var i in s){
				var p=s[i].split("=")
				if(p.length==2){
					toggleparam[p[0]]=p[1]
				}
			}
		}
		console.log(url)
		eval("tpl_load('"+url+"',WRITE_MSG_U2WS_Admin_menu_"+url+",toggleparam);")
	}

}
function addCustommenu(title,url,param){
	if(!param){
		param="";
	}
	ajax_post(WRITE_MSG_U2WS_Admin_AddCustommenu({Title:title,Url:url,Param:param}),function(res){
		if($('#header_index').parents('li').hasClass('navon')){
			rebuild_leftmenu()
		}
		showDialog("添加成功")
	})
}

function rebuild_leftmenu(callback){
	menu = {
	'index': {top:'首页',func:"misc_custommenu",left:[{name:"常用操作管理",func:"misc_custommenu"}]},
	'global':{top:'全局',func:"setting_basic",left:[{name:"站点信息",func:"setting_basic"},{name:"注册与访问控制",func:"setting_access"},{name:"站点功能",func:"setting_functions"}]},/*,{name:"广播设置",func:"setting_follow"},{name:"空间设置",func:"setting_home"},{name:"用户权限",func:"setting_user"},{name:"积分设置",func:"setting_credits"},{name:"时间设置",func:"setting_datetime"},{name:"上传控制",func:"setting_attachments"},{name:"水印设置",func:"setting_imgwater"},{name:"附件类型尺寸",func:"setting_access"},{name:"搜索设置",func:"setting_search"},{name:"地区设置",func:"setting_district"},{name:"排行榜设置",func:"setting_ranklist"},{name:"手机版访问设置",func:"setting_mobile"},{name:"防采集设置",func:"setting_antitheft"}]},
	'style': {top:'界面',func:"setting_customnav",left:[{name:"导航设置",func:"setting_customnav"},{name:"界面设置",func:"setting_styles"},{name:"风格管理",func:"styles"},{name:"模板管理",func:"styles_templates"},{name:"表情管理",func:"posting_smilies"},{name:"表态动作",func:"click"},{name:"主题鉴定",func:"thread_stamp"},{name:"编辑器设置",func:"setting_editor"},{name:"在线列表图标",func:"misc_onlinelist"}]},
	'topic':{top:'内容',func:"moderate",left:[{name:"内容审核",func:"index/index"},]}*/
	'forums':{top:'论坛',func:"forums_index",left:[{name:"板块管理",func:"forums_index"}]}
	}
	ajax_post(WRITE_MSG_U2WS_Admin_rebuild_leftmenu())
	websocket_func[CMD_MSG_WS2U_Admin_rebuild_leftmenu]=function(res){
		for(var i in res.Menus){
			menu['index'].left.push({name:res.Menus[i].Title,func:res.Menus[i].Url,param:res.Menus[i].Param})
		}
		html = template("tpl_leftmenu", {
	    	menu: menu,
		});
		$('#leftmenu').html(html);
		if(callback) callback();
	}
}

template.defaults.imports.showsetting = function(key,value,type,ext,onclick){
	var str="";
	switch(type){
		case "radio":
		str+='<td class="vtop rowform">';
		if(typeof ext == "undefined" || ext.length==0){
			str+='<ul onmouseover="altStyle(this);"><li';
			if(value==1) str+=' class="checked"';
			str+='><input class="radio" type="radio" name="'+key+'" value="1" '
			if(value==1) str+=' checked';
			str+='>&nbsp;是</li><li'
			if(value==0) str+=' class="checked"';
			str+='><input class="radio" type="radio" name="'+key+'" value="0"'
			if(value==0) str+=' checked';
			str+='>&nbsp;否</li>';
		}else{
			str+='<ul class="nofloat" onmouseover="altStyle(this);">';
			for(var i in ext){
				str+='<li ';
				if(value==i) str+=' class="checked"';
				str+='><input class="radio" type="radio" name="'+key+'" value="'+i+'"'
				if(onclick!=null) str+=' onclick="'+onclick[i]+'"'
				if(value==i) str+=' checked';
				str+='>&nbsp;'+ext[i]+'</li>'
			}
		}
		str+='</ul></td>';
		break;
		case "textarea":
		str+='<td class="vtop rowform"><textarea rows="6" ondblclick="textareasize(this, 1)" onkeyup="textareasize(this, 0)" onkeydown="textareakey(this, event)" name="'+key+'" id="'+key+'" cols="50" class="tarea">'+value+'</textarea></td>';
		break;
		case "number":
		str+='<td class="vtop rowform"><input name="'+key+'" value="'+value+'" type="number" class="txt"></td>';
		break;
		case "checkbox":
		str+='<td class="vtop rowform"><ul class="nofloat" onmouseover="altStyle(this);">';
		for(var i in ext){
		
			str+='<li title="'+ext[i]+'"';
			if((value>>i&1)==1) str+=' class="checked"';
			str+='><input class="checkbox" type="checkbox" name="'+key+'" value="'+i+'"'
			if(onclick!=null) str+=' onclick="'+onclick[i]+'"'
			if((value>>i&1)==1) str+=' checked';
			str+='>&nbsp;'+ext[i]+'</li>'
		}
		str+='</ul></td>';
		break;
		case "text":
		str+='<td class="vtop rowform"><input name="'+key+'" value="'+value+'" type="text" class="txt"></td>'
		break;
	}
	return str;
};
