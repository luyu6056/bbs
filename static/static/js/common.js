/*
	[Discuz!] (C)2001-2099 Comsenz Inc.
	This is NOT a freeware, use is subject to license terms

	$Id: common.js 36359 2017-01-20 05:06:45Z nemohou $
*/

var token=[],uploadurl="https://api.jachun.com/upload",check_token=getcookie('check_token'),apilist=["http://192.168.1.136:80"],getapi=false,h5state={},tpl=false,js=false,td=false,qqredirect_uri='https://api.jachun.com/qq';
var err={
	"0":"操作失败",
	"-1":"数据库操作失败",
	"-2":"token错误",
	"-3":"无法解析的返回结果",
	"-4":"登录失败",
	"-5":"账号或者密码错误",
	"-6":"账号冻结停用",
	"-7":"您需要先登录才能继续本操作",
	"-8":"验证码错误",
	"-9":"参数错误，请刷新页面重试",
	"-10":"包含敏感词无法操作",
	"-11":"没有找到板块",
	"-12":"没有找到用户",
	"-13":"用户组错误",
	"-14":"您所在的用户组没有权限操作",
	"-15":"主题不存在",
	"-16":"回复不存在",
	"-17":"标题含有敏感词，请修改后再试",
	"-18":"请选择主题分类",
	"-19":"当前论坛，您没有发布投票权限",
	"-20":"当前论坛，您没有发布商品权限",
	"-21":"当前论坛，您没有发布悬赏权限",
	"-22":"当前论坛，您没有发布活动权限",
	"-23":"当前论坛，您没有发布辩论权限",
	"-24":"标题或者内容不能为空",
	"-25":"内容太长",
	"-26":"内容太短",
	"-27":"发帖间隔太短，请稍后再试",
	"-28":"超过每小时发帖限制，请稍后再试",
	"-29":"标签含有敏感词，请修改后再试",
	"-30":"新增标签失败",
	"-31":"新增主题数据失败",
	"-32":"更新管理数据失败",
	"-33":"更新积分数据失败",
	"-34":"更新个人空间信息失败",
	"-35":"新增回复数据失败",
	"-36":"新增沙发数据失败",
	"-37":"主题不允许的操作类型",
	"-38":"该楼层不存在",
	"-39":"每天可以上传的附件数量已达上限",
	"-40":"每天可以上传的附件文件大小已达上限",
	"-41":"不支持的图片格式",
	"-42":"当前帖子已关闭，不再接受新内容",
	"-43":"CDN刷新失败",
	"-44":"签名内容太长，请缩短重试",
	"-45":"已经对该贴操作支持反对",
	"-46":"点评功能未开启",
	"-47":"不能点评自己的帖子",
	"-48":"邮件发送太频繁,请稍后再试",
	"-49":"邮箱格式不合法",
	"-50":"该账号已经注册",
	"-51":"找不到用户组信息",
	"-52":"创建用户失败",
	"-53":"创建用户统计信息失败",
	"-54":"创建用户论坛信息失败",
	"-55":"邮箱验证失败，请重发邮件再试",
	"-56":"该邮箱已经被使用,请换一个再试",
	"-57":"邮件发送失败，请联系管理员",
	"-58":"该用户邮箱未激活，无法使用这个功能",
	"-59":"email验证码不正确或者已超时",
	"-60":"QQ登录失败，请重新登录",
	"-61":"该QQ已经绑定其他账号，请直接登录",
	"-62":"选项不能为空",
	"-63":"最多可选数量错误",
	"-64":"记票天数不能为负",
	"-65":"只能有2-10个选项",
	"-66":"服务器文件读写失败，请截图反馈给管理",
	"-67":"投票详情未找到",
	"-68":"投票选项未找到",
	"-69":"修改投票详情失败",
	"-70":"修改投票选项失败",
	"-71":"投票图片上传失败，请刷新页面重新上传",
	"-72":"您已经投过票了",
	"-73":"必须提交有一个有效选项",
	"-74":"更新帖子信息失败",
	"-75":"更新论坛数据失败",
	"-76":"密码长度太短",
	"-77":"帖子操作类型错误",
	"-78":"当前操作已超时，请刷新再试",
	"-79":"处理中请稍等，请勿重复提交数据",
},jpg_webp=new RegExp(/(Chrome|Android\s*[^123])/i).test(navigator.userAgent)?"1":"0",cache={todaytime:getdatetimestamp(),styleimgdir:'/template/zvis_6_ui/src',imgdir:IMGDIR,STATICURL:STATICURL,forum_colorarray:['', '#EE1B2E', '#EE5023', '#996600', '#3C9D40', '#2897C5', '#2B65B7', '#8F2A90', '#EC1282']},timestamp_offset=0,time_zone=new Date().getTimezoneOffset()/-60,oldtplname='',uid=0,websocket,websocket_func={},websocket_data=[],tpl_callback;
if(loadUserdata('token') && loadUserdata('token').length==16){
	for(var i=0;i<16;i++){
		token.push(loadUserdata('token').charCodeAt(i))
	}
}
saveUserdata("apiurl","http://127.0.0.1:80")
function $(id) {
	r=document.getElementById(id)
	if(r!=undefined){
		return r
	}
	if(typeof id =="function"){
		return jQuery(id);
	}

	if(typeof id =="object" ){
		if(id instanceof HTMLInputElement || id instanceof HTMLAnchorElement || id instanceof HTMLSelectElement){
			return jQuery(id);
		}
		return
	}
	if(typeof id !="string"){
		return
	}

	if(id.match(/input|textarea|javascript:|table|head/) || id.match(/\S+\[\S+="[^"]+"]/)){

	}else{

		if(id.match(/#|\./)){
		
		}else{

			return
		}
	}
	return jQuery(id)
}

function $C(classname, ele, tag) {
	var returns = [];
	ele = ele || document;
	tag = tag || '*';
	if(ele.getElementsByClassName) {
		var eles = ele.getElementsByClassName(classname);
		if(tag != '*') {
			for (var i = 0, L = eles.length; i < L; i++) {
				if (eles[i].tagName.toLowerCase() == tag.toLowerCase()) {
						returns.push(eles[i]);
				}
			}
		} else {
			returns = eles;
		}
	}else {
		eles = ele.getElementsByTagName(tag);
		var pattern = new RegExp("(^|\\s)"+classname+"(\\s|$)");
		for (i = 0, L = eles.length; i < L; i++) {
				if (pattern.test(eles[i].className)) {
						returns.push(eles[i]);
				}
		}
	}
	return returns;
}

function _attachEvent(obj, evt, func, eventobj) {
	eventobj = !eventobj ? obj : eventobj;
	if(obj.addEventListener) {
		obj.addEventListener(evt, func, false);
	} else if(eventobj.attachEvent) {
		obj.attachEvent('on' + evt, func);
	}
}

function _detachEvent(obj, evt, func, eventobj) {
	eventobj = !eventobj ? obj : eventobj;
	if(obj.removeEventListener) {
		obj.removeEventListener(evt, func, false);
	} else if(eventobj.detachEvent) {
		obj.detachEvent('on' + evt, func);
	}
}

function browserVersion(types) {
	var other = 1;
	for(i in types) {
		var v = types[i] ? types[i] : i;
		if(USERAGENT.indexOf(v) != -1) {
			var re = new RegExp(v + '(\\/|\\s|:)([\\d\\.]+)', 'ig');
			var matches = re.exec(USERAGENT);
			var ver = matches != null ? matches[2] : 0;
			other = ver !== 0 && v != 'mozilla' ? 0 : other;
		}else {
			var ver = 0;
		}
		eval('BROWSER.' + i + '= ver');
	}
	BROWSER.other = other;
}

function getEvent() {
	if(document.all) return window.event;
	func = getEvent.caller;
	while(func != null) {
		var arg0 = func.arguments[0];
		if (arg0) {
			if((arg0.constructor  == Event || arg0.constructor == MouseEvent) || (typeof(arg0) == "object" && arg0.preventDefault && arg0.stopPropagation)) {
				return arg0;
			}
		}
		func=func.caller;
	}
	return null;
}

function isUndefined(variable) {
	return typeof variable == 'undefined' ? true : false;
}

function in_array(needle, haystack) {
	if(typeof needle == 'string' || typeof needle == 'number') {
		for(var i in haystack) {
			if(haystack[i] == needle) {
					return true;
			}
		}
	}
	return false;
}

function trim(str) {
	return (str + '').replace(/(\s+)$/g, '').replace(/^\s+/g, '');
}

function strlen(str) {
	return (BROWSER.ie && str.indexOf('\n') != -1) ? str.replace(/\r?\n/g, '_').length : str.length;
}

function mb_strlen(str) {
	var len = 0;
	for(var i = 0; i < str.length; i++) {
		len += str.charCodeAt(i) < 0 || str.charCodeAt(i) > 255 ? (charset == 'utf-8' ? 3 : 2) : 1;
	}
	return len;
}

function mb_cutstr(str, maxlen, dot) {
	var len = 0;
	var ret = '';
	var dot = !dot ? '...' : dot;
	maxlen = maxlen - dot.length;
	for(var i = 0; i < str.length; i++) {
		len += str.charCodeAt(i) < 0 || str.charCodeAt(i) > 255 ? (charset == 'utf-8' ? 3 : 2) : 1;
		if(len > maxlen) {
			ret += dot;
			break;
		}
		ret += str.substr(i, 1);
	}
	return ret;
}

function preg_replace(search, replace, str, regswitch) {
	var regswitch = !regswitch ? 'ig' : regswitch;
	var len = search.length;
	for(var i = 0; i < len; i++) {
		re = new RegExp(search[i], regswitch);
		str = str.replace(re, typeof replace == 'string' ? replace : (replace[i] ? replace[i] : replace[0]));
	}
	return str;
}

function htmlspecialchars(str) {
	return preg_replace(['&', '<', '>', '"'], ['&amp;', '&lt;', '&gt;', '&quot;'], str);
}

function display(id) {
	var obj = $(id);
	if(obj.style.visibility) {
		obj.style.visibility = obj.style.visibility == 'visible' ? 'hidden' : 'visible';
	} else {
		obj.style.display = obj.style.display == '' ? 'none' : '';
	}
}

function checkall(form, prefix, checkall) {
	var checkall = checkall ? checkall : 'chkall';
	count = 0;
	for(var i = 0; i < form.elements.length; i++) {
		var e = form.elements[i];
		if(e.name && e.name != checkall && !e.disabled && (!prefix || (prefix && e.name.match(prefix)))) {
			e.checked = form.elements[checkall].checked;
			if(e.checked) {
				count++;
			}
		}
	}
	return count;
}

function setcookie(cookieName, cookieValue, seconds, path, domain, secure) {
	if(cookieValue == '' || seconds < 0) {
		cookieValue = '';
		seconds = -2592000;
	}
	if(seconds) {
		var expires = new Date();
		expires.setTime(expires.getTime() + seconds * 1000);
	}
	domain = !domain ? cookiedomain : domain;
	path = !path ? cookiepath : path;
	document.cookie = escape(cookieName) + '=' + escape(cookieValue)
		+ (expires ? '; expires=' + expires.toGMTString() : '')
		+ (path ? '; path=' + path : '/')
		+ (domain ? '; domain=' + domain : '')
		+ (secure ? '; secure' : '');
}

function getcookie(name, nounescape) {
	var cookie_start = document.cookie.indexOf(name);
	var cookie_end = document.cookie.indexOf(";", cookie_start);
	if(cookie_start == -1) {
		return '';
	} else {
		var v = document.cookie.substring(cookie_start + name.length + 1, (cookie_end > cookie_start ? cookie_end : document.cookie.length));
		return !nounescape ? unescape(v) : v;
	}
}



function getHost(url) {
	var host = "null";
	if(typeof url == "undefined"|| null == url) {
		url = window.location.href;
	}
	var regex = /^\w+\:\/\/([^\/]*).*/;
	var match = url.match(regex);
	if(typeof match != "undefined" && null != match) {
		host = match[1];
	}
	return host;
}

function hostconvert(url) {
	if(!url.match(/^https?:\/\//)) url = SITEURL + url;
	var url_host = getHost(url);
	var cur_host = getHost().toLowerCase();
	if(url_host && cur_host != url_host) {
		url = url.replace(url_host, cur_host);
	}
	return url;
}

function newfunction(func) {
	var args = [];
	for(var i=1; i<arguments.length; i++) args.push(arguments[i]);
	return function(event) {
		doane(event);
		window[func].apply(window, args);
		return false;
	}
}

function evalscript(s) {
	if(s.indexOf('<script') == -1) return s;
	var p = /<script[^\>]*?>([^\x00]*?)<\/script>/ig;
	var arr = [];
	while(arr = p.exec(s)) {
		var p1 = /<script[^\>]*?src=\"([^\>]*?)\"[^\>]*?(reload=\"1\")?(?:charset=\"([\w\-]+?)\")?><\/script>/i;
		var arr1 = [];
		arr1 = p1.exec(arr[0]);
		if(arr1) {
			appendscript(arr1[1], '', arr1[2], arr1[3]);
		} else {
			p1 = /<script(.*?)>([^\x00]+?)<\/script>/i;
			arr1 = p1.exec(arr[0]);
			appendscript('', arr1[2], arr1[1].indexOf('reload=') != -1);
		}
	}
	return s;
}


function safescript(id, call, seconds, times, timeoutcall, endcall, index) {
	seconds = seconds || 1000;
	times = times || 0;
	var checked = true;
	try {
		if(typeof call == 'function') {
			call();
		} else {
			eval(call);
		}
	} catch(e) {
		checked = false;
	}
	if(!checked) {
		if(!safescripts[id] || !index) {
			safescripts[id] = safescripts[id] || [];
			safescripts[id].push({
				'times':0,
				'si':setInterval(function () {
					safescript(id, call, seconds, times, timeoutcall, endcall, safescripts[id].length);
				}, seconds)
			});
		} else {
			index = (index || 1) - 1;
			safescripts[id][index]['times']++;
			if(safescripts[id][index]['times'] >= times) {
				clearInterval(safescripts[id][index]['si']);
				if(typeof timeoutcall == 'function') {
					timeoutcall();
				} else {
					eval(timeoutcall);
				}
			}
		}
	} else {
		try {
			index = (index || 1) - 1;
			if(safescripts[id][index]['si']) {
				clearInterval(safescripts[id][index]['si']);
			}
			if(typeof endcall == 'function') {
				endcall();
			} else {
				eval(endcall);
			}
		} catch(e) {}
	}
}

function $F(func, args, script) {
	var run = function () {
		var argc = args.length, s = '';
		for(i = 0;i < argc;i++) {
			s += ',args[' + i + ']';
		}
		eval('var check = typeof ' + func + ' == \'function\'');
		if(check) {
			eval(func + '(' + s.substr(1) + ')');
		} else {
			setTimeout(function () {checkrun();}, 50);
		}
	};
	var checkrun = function () {
		if(JSLOADED[src]) {
			run();
		} else {
			setTimeout(function () {checkrun();}, 50);
		}
	};
	script = script || 'common_extra';
	src = JSPATH + script + '.js';
	if(!JSLOADED[src]) {
		appendscript(src);
	}
	return checkrun();
}

function appendscript(src, text, reload, charset) {
	var id = hash(src + text);
	if(!reload && in_array(id, evalscripts)) return;
	if(reload && $(id)) {
		$(id).parentNode.removeChild($(id));
	}

	evalscripts.push(id);
	var scriptNode = document.createElement("script");
	scriptNode.type = "text/javascript";
	scriptNode.id = id;
	scriptNode.charset = charset ? charset : (BROWSER.firefox ? document.characterSet : document.charset);
	try {
		if(src) {
			scriptNode.src = src;
			scriptNode.onloadDone = false;
			scriptNode.onload = function () {
				scriptNode.onloadDone = true;
				JSLOADED[src] = 1;
			};
			scriptNode.onreadystatechange = function () {
				if((scriptNode.readyState == 'loaded' || scriptNode.readyState == 'complete') && !scriptNode.onloadDone) {
					scriptNode.onloadDone = true;
					JSLOADED[src] = 1;
				}
			};
		} else if(text){
			scriptNode.text = text;
		}
		document.getElementsByTagName('head')[0].appendChild(scriptNode);
	} catch(e) {}
}

function hash(string, length) {
	var length = length ? length : 32;
	var start = 0;
	var i = 0;
	var result = '';
	filllen = length - string.length % length;
	for(i = 0; i < filllen; i++){
		string += "0";
	}
	while(start < string.length) {
		result = stringxor(result, string.substr(start, length));
		start += length;
	}
	return result;
}

function stringxor(s1, s2) {
	var s = '';
	var hash = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var max = Math.max(s1.length, s2.length);
	for(var i=0; i<max; i++) {
		var k = s1.charCodeAt(i) ^ s2.charCodeAt(i);
		s += hash.charAt(k % 52);
	}
	return s;
}







function showPreview(val, id) {
	var showObj = $(id);
	if(showObj) {
		showObj.innerHTML = val.replace(/\n/ig, "<bupdateseccoder />");
	}
}

function showloading(display, waiting) {
	var display = display ? display : 'block';
	var waiting = waiting ? waiting : '请稍候...';
	$('ajaxwaitid').innerHTML = waiting;
	$('ajaxwaitid').style.display = display;
}

function doane(event, preventDefault, stopPropagation) {
	var preventDefault = isUndefined(preventDefault) ? 1 : preventDefault;
	var stopPropagation = isUndefined(stopPropagation) ? 1 : stopPropagation;
	e = event ? event : window.event;
	if(!e) {
		e = getEvent();
	}
	if(!e) {
		return null;
	}
	if(preventDefault) {
		if(e.preventDefault) {
			e.preventDefault();
		} else {
			e.returnValue = false;
		}
	}
	if(stopPropagation) {
		if(e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
	}
	return e;
}
function loadcss(cssname) {
	if(!CSSLOADED[cssname]) {
		var csspath = (typeof CSSPATH == 'undefined' ? 'data/cache/style_' : CSSPATH);
		if(!$('css_' + cssname)) {
			css = document.createElement('link');
			css.id = 'css_' + cssname,
			css.type = 'text/css';
			css.rel = 'stylesheet';
			css.href = csspath + STYLEID + '_' + cssname + '.css' ;
			var headNode = document.getElementsByTagName("head")[0];
			headNode.appendChild(css);
		} else {
			$('css_' + cssname).href = csspath + STYLEID + '_' + cssname ;
		}
		CSSLOADED[cssname] = 1;
	}
}
function showMenu(v) {
	var ctrlid = isUndefined(v['ctrlid']) ? v : v['ctrlid'];
	var showid = isUndefined(v['showid']) ? ctrlid : v['showid'];
	var menuid = isUndefined(v['menuid']) ? showid + '_menu' : v['menuid'];
	var ctrlObj = $(ctrlid);
	var menuObj = $(menuid);
	if(!menuObj) return;
	var mtype = isUndefined(v['mtype']) ? 'menu' : v['mtype'];
	var evt = isUndefined(v['evt']) ? 'mouseover' : v['evt'];
	var pos = isUndefined(v['pos']) ? '43' : v['pos'];
	var layer = isUndefined(v['layer']) ? 1 : v['layer'];
	var duration = isUndefined(v['duration']) ? 2 : v['duration'];
	var timeout = isUndefined(v['timeout']) ? 250 : v['timeout'];
	var maxh = isUndefined(v['maxh']) ? 600 : v['maxh'];
	var cache = isUndefined(v['cache']) ? 1 : v['cache'];
	var drag = isUndefined(v['drag']) ? '' : v['drag'];
	var dragobj = drag && $(drag) ? $(drag) : menuObj;
	var fade = isUndefined(v['fade']) ? 0 : v['fade'];
	var cover = isUndefined(v['cover']) ? 0 : v['cover'];
	var zindex = isUndefined(v['zindex']) ? JSMENU['zIndex']['menu'] : v['zindex'];
	var ctrlclass = isUndefined(v['ctrlclass']) ? '' : v['ctrlclass'];
	var winhandlekey = isUndefined(v['win']) ? '' : v['win'];
	if(winhandlekey && ctrlObj && !ctrlObj.getAttribute('fwin')) {
		ctrlObj.setAttribute('fwin', winhandlekey);
	}
	zindex = cover ? zindex + 500 : zindex;
	if(typeof JSMENU['active'][layer] == 'undefined') {
		JSMENU['active'][layer] = [];
	}

	for(i in EXTRAFUNC['showmenu']) {
		try {
			eval(EXTRAFUNC['showmenu'][i] + '()');
		} catch(e) {}
	}

	if(evt == 'click' && in_array(menuid, JSMENU['active'][layer]) && mtype != 'win') {
		hideMenu(menuid, mtype);
		return;
	}
	if(mtype == 'menu') {
		hideMenu(layer, mtype);
	}

	if(ctrlObj) {
		if(!ctrlObj.getAttribute('initialized')) {
			ctrlObj.setAttribute('initialized', true);
			ctrlObj.unselectable = true;

			ctrlObj.outfunc = typeof ctrlObj.onmouseout == 'function' ? ctrlObj.onmouseout : null;
			ctrlObj.onmouseout = function() {
				if(this.outfunc) this.outfunc();
				if(duration < 3 && !JSMENU['timer'][menuid]) {
					JSMENU['timer'][menuid] = setTimeout(function () {
						hideMenu(menuid, mtype);
					}, timeout);
				}
			};

			ctrlObj.overfunc = typeof ctrlObj.onmouseover == 'function' ? ctrlObj.onmouseover : null;
			ctrlObj.onmouseover = function(e) {
				doane(e);
				if(this.overfunc) this.overfunc();
				if(evt == 'click') {
					clearTimeout(JSMENU['timer'][menuid]);
					JSMENU['timer'][menuid] = null;
				} else {
					for(var i in JSMENU['timer']) {
						if(JSMENU['timer'][i]) {
							clearTimeout(JSMENU['timer'][i]);
							JSMENU['timer'][i] = null;
						}
					}
				}
			};
		}
	}

	if(!menuObj.getAttribute('initialized')) {
		menuObj.setAttribute('initialized', true);
		menuObj.ctrlkey = ctrlid;
		menuObj.mtype = mtype;
		menuObj.layer = layer;
		menuObj.cover = cover;
		if(ctrlObj && ctrlObj.getAttribute('fwin')) {menuObj.scrolly = true;}
		menuObj.style.position = 'absolute';
		menuObj.style.zIndex = zindex + layer;
		menuObj.onclick = function(e) {
			return doane(e, 0, 1);
		};
		if(duration < 3) {
			if(duration > 1) {
				menuObj.onmouseover = function() {
					clearTimeout(JSMENU['timer'][menuid]);
					JSMENU['timer'][menuid] = null;
				};
			}
			if(duration != 1) {
				menuObj.onmouseout = function() {
					JSMENU['timer'][menuid] = setTimeout(function () {
						hideMenu(menuid, mtype);
					}, timeout);
				};
			}
		}
		if(cover) {
			var coverObj = document.createElement('div');
			coverObj.id = menuid + '_cover';
			coverObj.style.position = 'absolute';
			coverObj.style.zIndex = menuObj.style.zIndex - 1;
			coverObj.style.left = coverObj.style.top = '0px';
			coverObj.style.width = '100%';
			coverObj.style.height = Math.max(document.documentElement.clientHeight, document.body.offsetHeight) + 'px';
			coverObj.style.backgroundColor = '#000';
			coverObj.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=50)';
			coverObj.style.opacity = 0.5;
			coverObj.onclick = function () {hideMenu();};
			$('append_parent').appendChild(coverObj);
			_attachEvent(window, 'load', function () {
				coverObj.style.height = Math.max(document.documentElement.clientHeight, document.body.offsetHeight) + 'px';
			}, document);
		}
	}
	if(drag) {
		dragobj.style.cursor = 'move';
		dragobj.onmousedown = function(event) {try{dragMenu(menuObj, event, 1);}catch(e){}};
	}

	if(cover) $(menuid + '_cover').style.display = '';
	if(fade) {
		var O = 0;
		var fadeIn = function(O) {
			if(O > 100) {
				clearTimeout(fadeInTimer);
				return;
			}
			menuObj.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + O + ')';
			menuObj.style.opacity = O / 100;
			O += 20;
			var fadeInTimer = setTimeout(function () {
				fadeIn(O);
			}, 40);
		};
		fadeIn(O);
		menuObj.fade = true;
	} else {
		menuObj.fade = false;
	}
	menuObj.style.display = '';
	if(ctrlObj && ctrlclass) {
		ctrlObj.className += ' ' + ctrlclass;
		menuObj.setAttribute('ctrlid', ctrlid);
		menuObj.setAttribute('ctrlclass', ctrlclass);
	}
	if(pos != '*') {
		setMenuPosition(showid, menuid, pos);
	}
	if(BROWSER.ie && BROWSER.ie < 7 && winhandlekey && $('fwin_' + winhandlekey)) {
		$(menuid).style.left = (parseInt($(menuid).style.left) - parseInt($('fwin_' + winhandlekey).style.left)) + 'px';
		$(menuid).style.top = (parseInt($(menuid).style.top) - parseInt($('fwin_' + winhandlekey).style.top)) + 'px';
	}
	if(maxh && menuObj.scrollHeight > maxh) {
		menuObj.style.height = maxh + 'px';
		if(BROWSER.opera) {
			menuObj.style.overflow = 'auto';
		} else {
			menuObj.style.overflowY = 'auto';
		}
	}

	if(!duration) {
		setTimeout('hideMenu(\'' + menuid + '\', \'' + mtype + '\')', timeout);
	}

	if(!in_array(menuid, JSMENU['active'][layer])) JSMENU['active'][layer].push(menuid);
	menuObj.cache = cache;
	if(layer > JSMENU['layer']) {
		JSMENU['layer'] = layer;
	}
	var hasshow = function(ele) {
		while(ele.parentNode && ((typeof(ele['currentStyle']) === 'undefined') ? window.getComputedStyle(ele,null) : ele['currentStyle'])['display'] !== 'none') {
			ele = ele.parentNode;
		}
		if(ele === document) {
			return true;
		} else {
			return false;
		}
	};
	if(!menuObj.getAttribute('disautofocus')) {
		try{
			var focused = false;
			var tags = ['input', 'select', 'textarea', 'button', 'a'];
			for(var i = 0; i < tags.length; i++) {
				var _all = menuObj.getElementsByTagName(tags[i]);
				if(_all.length) {
					for(j = 0; j < _all.length; j++) {
						if((!_all[j]['type'] || _all[j]['type'] != 'hidden') && hasshow(_all[j])) {
							_all[j].className += ' hidefocus';
							_all[j].focus();
							focused = true;
							var cobj = _all[j];
							_attachEvent(_all[j], 'blur', function (){cobj.className = trim(cobj.className.replace(' hidefocus', ''));});
							break;
						}
					}
				}
				if(focused) {
					break;
				}
			}
		} catch (e) {
		}
	}
}
var delayShowST = null;
function delayShow(ctrlObj, call, time) {
	if(typeof ctrlObj == 'object') {
		var ctrlid = ctrlObj.id;
		call = call || function () {showMenu(ctrlid);};
	}
	var time = isUndefined(time) ? 500 : time;
	delayShowST = setTimeout(function () {
		if(typeof call == 'function') {
			call();
		} else {
			eval(call);
		}
	}, time);
	if(!ctrlObj.delayinit) {
		_attachEvent(ctrlObj, 'mouseout', function() {clearTimeout(delayShowST);});
		ctrlObj.delayinit = 1;
	}
}

var dragMenuDisabled = false;
function dragMenu(menuObj, e, op) {
	e = e ? e : window.event;
	if(op == 1) {
		if(dragMenuDisabled || in_array(e.target ? e.target.tagName : e.srcElement.tagName, ['TEXTAREA', 'INPUT', 'BUTTON', 'SELECT'])) {
			return;
		}
		JSMENU['drag'] = [e.clientX, e.clientY];
		JSMENU['drag'][2] = parseInt(menuObj.style.left);
		JSMENU['drag'][3] = parseInt(menuObj.style.top);
		document.onmousemove = function(e) {try{dragMenu(menuObj, e, 2);}catch(err){}};
		document.onmouseup = function(e) {try{dragMenu(menuObj, e, 3);}catch(err){}};
		doane(e);
	}else if(op == 2 && JSMENU['drag'][0]) {
		var menudragnow = [e.clientX, e.clientY];
		menuObj.style.left = (JSMENU['drag'][2] + menudragnow[0] - JSMENU['drag'][0]) + 'px';
		menuObj.style.top = (JSMENU['drag'][3] + menudragnow[1] - JSMENU['drag'][1]) + 'px';
		menuObj.removeAttribute('top_');menuObj.removeAttribute('left_');
		doane(e);
	}else if(op == 3) {
		JSMENU['drag'] = [];
		document.onmousemove = null;
		document.onmouseup = null;
	}
}
function setMenuPosition(showid, menuid, pos) {
	var showObj = $(showid);
	var menuObj = menuid ? $(menuid) : $(showid + '_menu');
	if(isUndefined(pos) || !pos) pos = '43';
	var basePoint = parseInt(pos.substr(0, 1));
	var direction = parseInt(pos.substr(1, 1));
	var important = pos.indexOf('!') != -1 ? 1 : 0;
	var sxy = 0, sx = 0, sy = 0, sw = 0, sh = 0, ml = 0, mt = 0, mw = 0, mcw = 0, mh = 0, mch = 0, bpl = 0, bpt = 0;

	if(!menuObj || (basePoint > 0 && !showObj)) return;
	if(showObj) {
		sxy = fetchOffset(showObj);
		sx = sxy['left'];
		sy = sxy['top'];
		sw = showObj.offsetWidth;
		sh = showObj.offsetHeight;
	}
	mw = menuObj.offsetWidth;
	mcw = menuObj.clientWidth;
	mh = menuObj.offsetHeight;
	mch = menuObj.clientHeight;

	switch(basePoint) {
		case 1:
			bpl = sx;
			bpt = sy;
			break;
		case 2:
			bpl = sx + sw;
			bpt = sy;
			break;
		case 3:
			bpl = sx + sw;
			bpt = sy + sh;
			break;
		case 4:
			bpl = sx;
			bpt = sy + sh;
			break;
	}
	switch(direction) {
		case 0:
			menuObj.style.left = (document.body.clientWidth - menuObj.clientWidth) / 2 + 'px';
			mt = (document.documentElement.clientHeight - menuObj.clientHeight) / 2;
			break;
		case 1:
			ml = bpl - mw;
			mt = bpt - mh;
			break;
		case 2:
			ml = bpl;
			mt = bpt - mh;
			break;
		case 3:
			ml = bpl;
			mt = bpt;
			break;
		case 4:
			ml = bpl - mw;
			mt = bpt;
			break;
	}
	var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
	var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
	if(!important) {
		if(in_array(direction, [1, 4]) && ml < 0) {
			ml = bpl;
			if(in_array(basePoint, [1, 4])) ml += sw;
		} else if(ml + mw > scrollLeft + document.body.clientWidth && sx >= mw) {
			ml = bpl - mw;
			if(in_array(basePoint, [2, 3])) {
				ml -= sw;
			} else if(basePoint == 4) {
				ml += sw;
			}
		}
		if(in_array(direction, [1, 2]) && mt < 0) {
			mt = bpt;
			if(in_array(basePoint, [1, 2])) mt += sh;
		} else if(mt + mh > scrollTop + document.documentElement.clientHeight && sy >= mh) {
			mt = bpt - mh;
			if(in_array(basePoint, [3, 4])) mt -= sh;
		}
	}
	if(pos.substr(0, 3) == '210') {
		ml += 69 - sw / 2;
		mt -= 5;
		if(showObj.tagName == 'TEXTAREA') {
			ml -= sw / 2;
			mt += sh / 2;
		}
	}
	if(direction == 0 || menuObj.scrolly) {
		if(BROWSER.ie && BROWSER.ie < 7) {
			if(direction == 0) mt += scrollTop;
		} else {
			if(menuObj.scrolly) mt -= scrollTop;
			menuObj.style.position = 'fixed';
		}
	}
	if(ml) menuObj.style.left = ml + 'px';
	if(mt) menuObj.style.top = mt + 'px';
	if(direction == 0 && BROWSER.ie && !document.documentElement.clientHeight) {
		menuObj.style.position = 'absolute';
		menuObj.style.top = (document.body.clientHeight - menuObj.clientHeight) / 2 + 'px';
	}
	if(menuObj.style.clip && !BROWSER.opera) {
		menuObj.style.clip = 'rect(auto, auto, auto, auto)';
	}
}

function hideMenu(attr, mtype) {
	attr = isUndefined(attr) ? '' : attr;
	mtype = isUndefined(mtype) ? 'menu' : mtype;
	if(attr == '') {
		for(var i = 1; i <= JSMENU['layer']; i++) {
			hideMenu(i, mtype);
		}
		return;
	} else if(typeof attr == 'number') {
		for(var j in JSMENU['active'][attr]) {
			hideMenu(JSMENU['active'][attr][j], mtype);
		}
		return;
	}else if(typeof attr == 'string') {
		var menuObj = $(attr);
		if(!menuObj || (mtype && menuObj.mtype != mtype)) return;
		var ctrlObj = '', ctrlclass = '';
		if((ctrlObj = $(menuObj.getAttribute('ctrlid'))) && (ctrlclass = menuObj.getAttribute('ctrlclass'))) {
			var reg = new RegExp(' ' + ctrlclass);
			ctrlObj.className = ctrlObj.className.replace(reg, '');
		}
		clearTimeout(JSMENU['timer'][attr]);
		var hide = function() {
			if(menuObj.cache) {
				if(menuObj.style.visibility != 'hidden') {
					menuObj.style.display = 'none';
					if(menuObj.cover) $(attr + '_cover').style.display = 'none';
				}
			}else {
				menuObj.parentNode.removeChild(menuObj);
				if(menuObj.cover) $(attr + '_cover').parentNode.removeChild($(attr + '_cover'));
			}
			var tmp = [];
			for(var k in JSMENU['active'][menuObj.layer]) {
				if(attr != JSMENU['active'][menuObj.layer][k]) tmp.push(JSMENU['active'][menuObj.layer][k]);
			}
			JSMENU['active'][menuObj.layer] = tmp;
		};
		if(menuObj.fade) {
			var O = 100;
			var fadeOut = function(O) {
				if(O == 0) {
					clearTimeout(fadeOutTimer);
					hide();
					return;
				}
				menuObj.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + O + ')';
				menuObj.style.opacity = O / 100;
				O -= 20;
				var fadeOutTimer = setTimeout(function () {
					fadeOut(O);
				}, 40);
			};
			fadeOut(O);
		} else {
			hide();
		}
	}
}

function getCurrentStyle(obj, cssproperty, csspropertyNS) {
	if(obj.style[cssproperty]){
		return obj.style[cssproperty];
	}
	if (obj.currentStyle) {
		return obj.currentStyle[cssproperty];
	} else if (document.defaultView.getComputedStyle(obj, null)) {
		var currentStyle = document.defaultView.getComputedStyle(obj, null);
		var value = currentStyle.getPropertyValue(csspropertyNS);
		if(!value){
			value = currentStyle[cssproperty];
		}
		return value;
	} else if (window.getComputedStyle) {
		var currentStyle = window.getComputedStyle(obj, "");
		return currentStyle.getPropertyValue(csspropertyNS);
	}
}

function fetchOffset(obj, mode) {
	var left_offset = 0, top_offset = 0, mode = !mode ? 0 : mode;

	if(obj.getBoundingClientRect && !mode) {
		var rect = obj.getBoundingClientRect();
		var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
		var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
		if(document.documentElement.dir == 'rtl') {
			scrollLeft = scrollLeft + document.documentElement.clientWidth - document.documentElement.scrollWidth;
		}
		left_offset = rect.left + scrollLeft - document.documentElement.clientLeft;
		top_offset = rect.top + scrollTop - document.documentElement.clientTop;
	}
	if(left_offset <= 0 || top_offset <= 0) {
		left_offset = obj.offsetLeft;
		top_offset = obj.offsetTop;
		while((obj = obj.offsetParent) != null) {
			position = getCurrentStyle(obj, 'position', 'position');
			if(position == 'relative') {
				continue;
			}
			left_offset += obj.offsetLeft;
			top_offset += obj.offsetTop;
		}
	}
	return {'left' : left_offset, 'top' : top_offset};
}





var showDialogST = null;
function showDialog(msg, mode, t, func, cover, funccancel, leftmsg, confirmtxt, canceltxt, closetime, locationtime) {
	clearTimeout(showDialogST);
	cover = isUndefined(cover) ? (mode == 'info' ? 0 : 1) : cover;
	leftmsg = isUndefined(leftmsg) ? '' : leftmsg;
	mode = in_array(mode, ['confirm', 'notice', 'info', 'right']) ? mode : 'alert';
	var menuid = 'fwin_dialog';
	var menuObj = $(menuid);
	var showconfirm = 1;
	confirmtxtdefault = '确定';
	closetime = isUndefined(closetime) ? '' : closetime;
	closefunc = function () {
		if(typeof func == 'function') func();
		else eval(func);
		hideMenu(menuid, 'dialog');
	};
	if(closetime) {
		showPrompt(null, null, '<i>' + msg + '</i>', closetime * 1000, 'popuptext');
		return;
	}
	locationtime = isUndefined(locationtime) ? '' : locationtime;
	if(locationtime) {
		leftmsg = locationtime + ' 秒后页面跳转';
		showDialogST = setTimeout(closefunc, locationtime * 1000);
		showconfirm = 0;
	}
	confirmtxt = confirmtxt ? confirmtxt : confirmtxtdefault;
	canceltxt = canceltxt ? canceltxt : '取消';

	if(menuObj) hideMenu('fwin_dialog', 'dialog');
	menuObj = document.createElement('div');
	menuObj.style.display = 'none';
	menuObj.className = 'fwinmask';
	menuObj.id = menuid;
	$('append_parent').append(menuObj);
	var hidedom = '';
	if(!BROWSER.ie) {
		hidedom = '<style type="text/css">object{visibility:hidden;}</style>';
	}
	var s = hidedom + '<table cellpadding="0" cellspacing="0" class="fwin"><tr><td class="t_l"></td><td class="t_c"></td><td class="t_r"></td></tr><tr><td class="m_l">&nbsp;&nbsp;</td><td class="m_c"><h3 class="flb"><em>';
	s += t ? t : '提示信息';
	s += '</em><span><a href="javascript:;" id="fwin_dialog_close" class="flbc" onclick="hideMenu(\'' + menuid + '\', \'dialog\')" title="关闭">关闭</a></span></h3>';
	if(mode == 'info') {
		s += msg ? msg : '';
	} else {
		s += '<div class="c altw"><div class="' + (mode == 'alert' ? 'alert_error' : (mode == 'right' ? 'alert_right' : 'alert_info')) + '"><p>' + msg + '</p></div></div>';
		s += '<p class="o pns">' + (leftmsg ? '<span class="z xg1">' + leftmsg + '</span>' : '') + (showconfirm ? '<button id="fwin_dialog_submit" value="true" class="pn pns"><strong>'+confirmtxt+'</strong></button>' : '');
		s += mode == 'confirm' ? '<button id="fwin_dialog_cancel" value="true" class="pn" onclick="hideMenu(\'' + menuid + '\', \'dialog\')"><strong>'+canceltxt+'</strong></button>' : '';
		s += '</p>';
	}
	s += '</td><td class="m_r"></td></tr><tr><td class="b_l"></td><td class="b_c"></td><td class="b_r"></td></tr></table>';
	menuObj.innerHTML = s;
	if($('fwin_dialog_submit')) $('fwin_dialog_submit').onclick = function() {
		if(typeof func == 'function') func();
		else eval(func);
		hideMenu(menuid, 'dialog');
	};
	if($('fwin_dialog_cancel')) {
		$('fwin_dialog_cancel').onclick = function() {
			if(typeof funccancel == 'function') funccancel();
			else eval(funccancel);
			hideMenu(menuid, 'dialog');
		};
		$('fwin_dialog_close').onclick = $('fwin_dialog_cancel').onclick;
	}
	showMenu({'mtype':'dialog','menuid':menuid,'duration':3,'pos':'00','zindex':JSMENU['zIndex']['dialog'],'cache':0,'cover':cover});
	try {
		if($('fwin_dialog_submit')) $('fwin_dialog_submit').focus();
	} catch(e) {}
}

function showWindow(k, url, mode, cache, menuv) {

	mode = isUndefined(mode) ? 'get' : mode;
	cache = isUndefined(cache) ? 1 : cache;
	var menuid = 'fwin_' + k;
	var menuObj = $(menuid);
	var drag = null;
	var loadingst = null;
	var hidedom = '';

	if(disallowfloat && disallowfloat.indexOf(k) != -1) {
		if(BROWSER.ie) url += (url.indexOf('?') != -1 ?  '&' : '?') + 'referer=' + escape(location.href);
		location.href = url;
		doane();
		return;
	}

	var fetchContent = function() {
		if(mode == 'get') {
			menuObj.url = url;
			url += (url.search(/\?/) > 0 ? '&' : '?') + 'infloat=yes&handlekey=' + k;
			url += cache == -1 ? '&t='+(+ new Date()) : '';
			if(BROWSER.ie &&  url.indexOf('referer=') < 0) {
				url = url + '&referer=' + encodeURIComponent(location);
			}
			ajaxget(url, 'fwin_content_' + k, null, '', '', function() {initMenu();show();});
		} else if(mode == 'post') {
			menuObj.act = $(url).action;
			ajaxpost(url, 'fwin_content_' + k, '', '', '', function() {initMenu();show();});
		}
		if(parseInt(BROWSER.ie) != 6) {
			loadingst = setTimeout(function() {showDialog('', 'info', '<img src="' + IMGDIR + '/loading.gif"> 请稍候...')}, 500);
		}
	};
	var initMenu = function() {
		clearTimeout(loadingst);
		var objs = menuObj.getElementsByTagName('*');
		var fctrlidinit = false;
		for(var i = 0; i < objs.length; i++) {
			if(objs[i].id) {
				objs[i].setAttribute('fwin', k);
			}
			if(objs[i].className == 'flb' && !fctrlidinit) {
				if(!objs[i].id) objs[i].id = 'fctrl_' + k;
				drag = objs[i].id;
				fctrlidinit = true;
			}
		}
	};
	var show = function() {
		hideMenu('fwin_dialog', 'dialog');
		v = {'mtype':'win','menuid':menuid,'duration':3,'pos':'00','zindex':JSMENU['zIndex']['win'],'drag':typeof drag == null ? '' : drag,'cache':cache};
		for(k in menuv) {
			v[k] = menuv[k];
		}
		showMenu(v);
	};

	if(!menuObj) {
		menuObj = document.createElement('div');
		menuObj.id = menuid;
		menuObj.className = 'fwinmask';
		menuObj.style.display = 'none';
		$('append_parent').appendChild(menuObj);
		evt = ' style="cursor:move" onmousedown="dragMenu($(\'' + menuid + '\'), event, 1)" ondblclick="hideWindow(\'' + k + '\')"';
		if(!BROWSER.ie) {
			hidedom = '<style type="text/css">object{visibility:hidden;}</style>';
		}
		menuObj.innerHTML = hidedom + '<table cellpadding="0" cellspacing="0" class="fwin"><tr><td class="t_l"></td><td class="t_c"' + evt + '></td><td class="t_r"></td></tr><tr><td class="m_l"' + evt + ')">&nbsp;&nbsp;</td><td class="m_c" id="fwin_content_' + k + '">'
			+ '</td><td class="m_r"' + evt + '"></td></tr><tr><td class="b_l"></td><td class="b_c"' + evt + '></td><td class="b_r"></td></tr></table>';
		if(mode == 'html') {
			$('fwin_content_' + k).innerHTML = url;
			initMenu();
			show();
		} else {
			fetchContent();
		}
	} else if((mode == 'get' && (url != menuObj.url || cache != 1)) || (mode == 'post' && $(url).action != menuObj.act)) {
		fetchContent();
	} else {
		show();
	}
	doane();
}
function showWindowEx(k,data){
	var html='';
	if(uid){
		html = template("tpl_"+k, {
			data: data,
			cache:cache,
		});
	}else{
		if(data==undefined){
			data={};
		}
		if(k!='quick_login'){
			data.showWindowExdata=JSON.stringify(data)
			data.showWindowEx=k
			k='quick_login';
		}
		if(document.location.search!='?tpl=login'){
			saveUserdata('login_ref',document.location.search)
		}else{
			saveUserdata('login_ref',null)
		}
			
		
		html = template("tpl_quick_login", {
			data: data,
			cache:cache,
		});
	}
	var menuid = 'fwin_' + k;
	var menuObj = $(menuid);
	var drag = null;
	if(!menuObj) {
		menuObj = document.createElement('div');
		menuObj.id = menuid;
		menuObj.className = 'shade';
		menuObj.style.cssText = 'position:absolute;background:#00000070;z-index:300;width:100%;height:'+document.body.offsetHeight+"px;";
		$('append_parent').appendChild(menuObj);
	}else{
		menuObj.style.display=''
	}
	evt = ' style="cursor:move" onmousedown="dragMenu($(\'' + menuid + '\'), event, 1)" ondblclick="hideWindow(\'' + k + '\')"';
	if(!BROWSER.ie) {
		hidedom = '<style type="text/css">object{visibility:hidden;}</style>';
	}
	menuObj.innerHTML = hidedom + '<div id="'+menuid+'_child" class="fwinmask"><table cellpadding="0" cellspacing="0" class="fwin"><tr><td class="t_l"></td><td class="t_c"' + evt + '></td><td class="t_r"></td></tr><tr><td class="m_l"' + evt + ')">&nbsp;&nbsp;</td><td class="m_c" id="fwin_content_' + k + '">'
		+ '</td><td class="m_r"' + evt + '"></td></tr><tr><td class="b_l"></td><td class="b_c"' + evt + '></td><td class="b_r"></td></tr></table><div>';
	$('#fwin_content_' + k).html('<span><a href="javascript:;" class="flbc" onclick="hideWindow(\''+k+'\', 0, 1);" title="关闭">关闭</a></span>'+html);
	//initMenu();
	
	v = {'mtype':'win','menuid':menuid+"_child",'duration':3,'pos':'00','zindex':JSMENU['zIndex']['win'],'drag':typeof drag == null ? '' : drag,'cache':cache};
	showMenu(v);
	
}
function showError(msg) {
	var p = /<script[^\>]*?>([^\x00]*?)<\/script>/ig;
	msg = msg.replace(p, '');
	if(msg !== '') {
		showDialog(msg, 'alert', '错误信息', null, true, null, '', '', '', 3);
	}
}

function hideWindow(k, all, clear) {
	all = isUndefined(all) ? 1 : all;
	clear = isUndefined(clear) ? 1 : clear;
	hideMenu('fwin_' + k, 'win');
	if(clear && $('fwin_' + k)) {
		$('append_parent').removeChild($('fwin_' + k));
	}
	if(all) {
		hideMenu();
	}
}




function simulateSelect(selectId, widthvalue) {
	var selectObj = $(selectId);
	if(!selectObj) return;
	if(BROWSER.other) {
		if(selectObj.getAttribute('change')) {
			selectObj.onchange = function () {eval(selectObj.getAttribute('change'));}
		}
		return;
	}
	var widthvalue = widthvalue ? widthvalue : 70;
	var defaultopt = selectObj.options[0] ? selectObj.options[0].innerHTML : '';
	var defaultv = '';
	var menuObj = document.createElement('div');
	var ul = document.createElement('ul');
	var handleKeyDown = function(e) {
		e = BROWSER.ie ? event : e;
		if(e.keyCode == 40 || e.keyCode == 38) doane(e);
	};
	var selectwidth = (selectObj.getAttribute('width', i) ? selectObj.getAttribute('width', i) : widthvalue) + 'px';
	var tabindex = selectObj.getAttribute('tabindex', i) ? selectObj.getAttribute('tabindex', i) : 1;

	for(var i = 0; i < selectObj.options.length; i++) {
		var li = document.createElement('li');
		li.innerHTML = selectObj.options[i].innerHTML;
		li.k_id = i;
		li.k_value = selectObj.options[i].value;
		if(selectObj.options[i].selected) {
			defaultopt = selectObj.options[i].innerHTML;
			defaultv = selectObj.options[i].value;
			li.className = 'current';
			selectObj.setAttribute('selecti', i);
		}
		li.onclick = function() {
			if($(selectId + '_ctrl').innerHTML != this.innerHTML) {
				var lis = menuObj.getElementsByTagName('li');
				lis[$(selectId).getAttribute('selecti')].className = '';
				this.className = 'current';
				$(selectId + '_ctrl').innerHTML = this.innerHTML;
				$(selectId).setAttribute('selecti', this.k_id);
				$(selectId).options.length = 0;
				$(selectId).options[0] = new Option('', this.k_value);
				eval(selectObj.getAttribute('change'));
			}
			hideMenu(menuObj.id);
			return false;
		};
		ul.appendChild(li);
	}

	selectObj.options.length = 0;
	selectObj.options[0]= new Option('', defaultv);
	selectObj.style.display = 'none';
	selectObj.outerHTML += '<a href="javascript:;" id="' + selectId + '_ctrl" style="width:' + selectwidth + '" tabindex="' + tabindex + '">' + defaultopt + '</a>';

	menuObj.id = selectId + '_ctrl_menu';
	menuObj.className = 'sltm';
	menuObj.style.display = 'none';
	menuObj.style.width = selectwidth;
	menuObj.appendChild(ul);
	$('append_parent').appendChild(menuObj);

	$(selectId + '_ctrl').onclick = function(e) {
		$(selectId + '_ctrl_menu').style.width = selectwidth;
		showMenu({'ctrlid':(selectId == 'loginfield' ? 'account' : selectId + '_ctrl'),'menuid':selectId + '_ctrl_menu','evt':'click','pos':'43'});
		doane(e);
	};
	$(selectId + '_ctrl').onfocus = menuObj.onfocus = function() {
		_attachEvent(document.body, 'keydown', handleKeyDown);
	};
	$(selectId + '_ctrl').onblur = menuObj.onblur = function() {
		_detachEvent(document.body, 'keydown', handleKeyDown);
	};
	$(selectId + '_ctrl').onkeyup = function(e) {
		e = e ? e : window.event;
		value = e.keyCode;
		if(value == 40 || value == 38) {
			if(menuObj.style.display == 'none') {
				$(selectId + '_ctrl').onclick();
			} else {
				lis = menuObj.getElementsByTagName('li');
				selecti = selectObj.getAttribute('selecti');
				lis[selecti].className = '';
				if(value == 40) {
					selecti = parseInt(selecti) + 1;
				} else if(value == 38) {
					selecti = parseInt(selecti) - 1;
				}
				if(selecti < 0) {
					selecti = lis.length - 1
				} else if(selecti > lis.length - 1) {
					selecti = 0;
				}
				lis[selecti].className = 'current';
				selectObj.setAttribute('selecti', selecti);
				lis[selecti].parentNode.scrollTop = lis[selecti].offsetTop;
			}
		} else if(value == 13) {
			var lis = menuObj.getElementsByTagName('li');
			lis[selectObj.getAttribute('selecti')].onclick();
		} else if(value == 27) {
			hideMenu(menuObj.id);
		}
	};
}


function thumbImg(obj, method) {
	if(!obj) {
		return;
	}
	obj.onload = null;
	file = obj.src;
	zw = obj.offsetWidth;
	zh = obj.offsetHeight;
	if(zw < 2) {
		if(!obj.id) {
			obj.id = 'img_' + Math.random();
		}
		setTimeout("thumbImg($('" + obj.id + "'), " + method + ")", 100);
		return;
	}
	zr = zw / zh;
	method = !method ? 0 : 1;
	if(method) {
		fixw = obj.getAttribute('_width');
		fixh = obj.getAttribute('_height');
		if(zw > fixw) {
			zw = fixw;
			zh = zw / zr;
		}
		if(zh > fixh) {
			zh = fixh;
			zw = zh * zr;
		}
	} else {
		fixw = typeof imagemaxwidth == 'undefined' ? '600' : imagemaxwidth;
		if(zw > fixw) {
			zw = fixw;
			zh = zw / zr;
			obj.style.cursor = 'pointer';
			if(!obj.onclick) {
				obj.onclick = function() {
					zoom(obj, obj.src);
				};
			}
		}
	}
	obj.width = zw;
	obj.height = zh;
}

var zoomstatus = 1;


function ctrlEnter(event, btnId, onlyEnter) {
	if(isUndefined(onlyEnter)) onlyEnter = 0;
	if((event.ctrlKey || onlyEnter) && event.keyCode == 13) {
		$(btnId).click();
		return false;
	}
	return true;
}

function parseurl(str, mode, parsecode) {
	if(isUndefined(parsecode)) parsecode = true;
	if(parsecode) str= str.replace(/\[code\]([\s\S]+?)\[\/code\]/ig, function($1, $2) {return codetag($2, -1);});
	str = str.replace(/([^>=\]"'\/]|^)((((https?|ftp):\/\/)|www\.)([\w\-]+\.)*[\w\-\u4e00-\u9fa5]+\.([\.a-zA-Z0-9]+|\u4E2D\u56FD|\u7F51\u7EDC|\u516C\u53F8)((\?|\/|:)+[\w\.\/=\?%\-&~`@':+!]*)+\.(swf|flv))/ig, '$1[flash]$2[/flash]');
	str = str.replace(/([^>=\]"'\/]|^)((((https?|ftp):\/\/)|www\.)([\w\-]+\.)*[\w\-\u4e00-\u9fa5]+\.([\.a-zA-Z0-9]+|\u4E2D\u56FD|\u7F51\u7EDC|\u516C\u53F8)((\?|\/|:)+[\w\.\/=\?%\-&~`@':+!]*)+\.(mp3|wma))/ig, '$1[audio]$2[/audio]');
	str = str.replace(/([^>=\]"'\/@]|^)((((https?|ftp|gopher|news|telnet|rtsp|mms|callto|bctp|ed2k|thunder|qqdl|synacast):\/\/))([\w\-]+\.)*[:\.@\-\w\u4e00-\u9fa5]+\.([\.a-zA-Z0-9]+|\u4E2D\u56FD|\u7F51\u7EDC|\u516C\u53F8)((\?|\/|:)+[\w\.\/=\?%\-&;~`@':+!#]*)*)/ig, mode == 'html' ? '$1<a href="$2" target="_blank">$2</a>' : '$1[url]$2[/url]');
	str = str.replace(/([^\w>=\]"'\/@]|^)((www\.)([\w\-]+\.)*[:\.@\-\w\u4e00-\u9fa5]+\.([\.a-zA-Z0-9]+|\u4E2D\u56FD|\u7F51\u7EDC|\u516C\u53F8)((\?|\/|:)+[\w\.\/=\?%\-&;~`@':+!#]*)*)/ig, mode == 'html' ? '$1<a href="$2" target="_blank">$2</a>' : '$1[url]$2[/url]');
	str = str.replace(/([^\w->=\]:"'\.\/]|^)(([\-\.\w]+@[\.\-\w]+(\.\w+)+))/ig, mode == 'html' ? '$1<a href="mailto:$2">$2</a>' : '$1[email]$2[/email]');
	if(parsecode) {
		for(var i = 0; i <= DISCUZCODE['num']; i++) {
			str = str.replace("[\tDISCUZ_CODE_" + i + "\t]", DISCUZCODE['html'][i]);
		}
	}
	return str;
}

function codetag(text, br) {
	var br = !br ? 1 : br;
	DISCUZCODE['num']++;
	if(br > 0 && typeof wysiwyg != 'undefined' && wysiwyg) text = text.replace(/<br[^\>]*>/ig, '\n');
	text = text.replace(/\$/ig, '$$');
	DISCUZCODE['html'][DISCUZCODE['num']] = '[code]' + text + '[/code]';
	return '[\tDISCUZ_CODE_' + DISCUZCODE['num'] + '\t]';
}

function saveUserdata(name, data) {
	try {
		if(window.localStorage){
			localStorage.setItem('Discuz_' + name, data);
		} else if(window.sessionStorage){
			sessionStorage.setItem('Discuz_' + name, data);
		}
	} catch(e) {
		if(BROWSER.ie){
			if(data.length < 54889) {
				with(document.documentElement) {
					setAttribute("value", data);
					save('Discuz_' + name);
				}
			}
		}
	}
}

function loadUserdata(name) {
	if(window.localStorage){
		return localStorage.getItem('Discuz_' + name);
	} else if(window.sessionStorage){
		return sessionStorage.getItem('Discuz_' + name);
	} else if(BROWSER.ie){
		with(document.documentElement) {
			load('Discuz_' + name);
			return getAttribute("value");
		}
	}
}



function openDiy(){
	if(DYNAMICURL) {
		window.location.href = SITEURL+DYNAMICURL + (DYNAMICURL.indexOf('?') < 0 ? '?' : '&') + ('diy=yes');
	} else {
		window.location.href = ((window.location.href + '').replace(/[\?\&]diy=yes/g, '').split('#')[0] + ( window.location.search && window.location.search.indexOf('?diy=yes') < 0 ? '&diy=yes' : '?diy=yes'));
	}
}

function hasClass(elem, className) {
	return elem.className && (" " + elem.className + " ").indexOf(" " + className + " ") != -1;
}

function runslideshow() {
	$F('_runslideshow', []);
}

function toggle_collapse(objname, noimg, complex, lang) {
	$F('_toggle_collapse', arguments);
}

function updatestring(str1, str2, clear) {
	str2 = '_' + str2 + '_';
	return clear ? str1.replace(str2, '') : (str1.indexOf(str2) == -1 ? str1 + str2 : str1);
}

function getClipboardData() {
	window.document.clipboardswf.SetVariable('str', CLIPBOARDSWFDATA);
}

function setCopy(text, msg) {
	var cp = document.createElement('textarea');
	cp.style.fontSize = '12pt';
	cp.style.border = '0';
	cp.style.padding = '0';
	cp.style.margin = '0';
	cp.style.position = 'absolute';
	cp.style.left = '-9999px';
	var yPosition = window.pageYOffset || document.documentElement.scrollTop;
	cp.style.top = yPosition + 'px';
	cp.setAttribute('readonly', '');
	cp.value = text;
	$('append_parent').appendChild(cp);
	cp.select();
	cp.setSelectionRange(0, cp.value.length);
	try {
		var success = document.execCommand('copy', false, null);
	} catch (e) {
		var success = false;
	}
	$('append_parent').removeChild(cp);

	if(success) {
		if(msg) {
			showPrompt(null, null, '<span>' + msg + '</span>', 1500);
		}
	} else if(BROWSER.ie) {
		var r = clipboardData.setData('Text', text);
		if(r) {
			if(msg) {
				showPrompt(null, null, '<span>' + msg + '</span>', 1500);
			}
		} else {
			showDialog('<div class="c"><div style="width: 200px; text-align: center;">复制失败，请选择“允许访问”</div></div>', 'alert');
		}
	} else {
		var msg = '<div class="c"><div style="width: 200px; text-align: center; text-decoration:underline;">点此复制到剪贴板</div>' +
		AC_FL_RunContent('id', 'clipboardswf', 'name', 'clipboardswf', 'devicefont', 'false', 'width', '200', 'height', '40', 'src', STATICURL + 'image/common/clipboard.swf', 'menu', 'false',  'allowScriptAccess', 'sameDomain', 'swLiveConnect', 'true', 'wmode', 'transparent', 'style' , 'margin-top:-20px') + '</div>';
		showDialog(msg, 'info');
		text = text.replace(/[\xA0]/g, ' ');
		CLIPBOARDSWFDATA = text;
	}
}




function initSearchmenu(searchform, cloudSearchUrl) {
	var defaultUrl = 'search.php?searchsubmit=yes';
	if(typeof cloudSearchUrl == "undefined" || cloudSearchUrl == null || cloudSearchUrl == '') {
		cloudSearchUrl = defaultUrl;
	}

	var searchtxt = $(searchform + '_txt');
	if(!searchtxt) {
		searchtxt = $(searchform);
	}
	var tclass = searchtxt.className;
	searchtxt.className = tclass + ' xg1';
	if (!!("placeholder" in document.createElement("input"))) {
		if(searchtxt.value == '请输入搜索内容') {
			searchtxt.value = '';
		}
		searchtxt.placeholder = '请输入搜索内容';
	} else {
		searchtxt.onfocus = function () {
			if(searchtxt.value == '请输入搜索内容') {
				searchtxt.value = '';
				searchtxt.className = tclass;
			}
		};
		searchtxt.onblur = function () {
			if(searchtxt.value == '' ) {
				searchtxt.value = '请输入搜索内容';
				searchtxt.className = tclass + ' xg1';
			}
		};
	}
	if(!$(searchform + '_type_menu')) return false;
	var o = $(searchform + '_type');
	var a = $(searchform + '_type_menu').getElementsByTagName('a');
	var formobj = searchtxt.form;
	for(var i=0; i<a.length; i++){
		if(a[i].className == 'curtype'){
			o.innerHTML = a[i].innerHTML;
			$(searchform + '_mod').value = a[i].rel;
			formobj.method = 'post';
			if((a[i].rel == 'forum' || a[i].rel == 'curforum') && defaultUrl != cloudSearchUrl) {
				formobj.action = cloudSearchUrl;
				formobj.method = 'get';
				if($('srchFId')) {
					$('srchFId').value = a[i].rel == 'forum' ? 0 : a[i].getAttribute('fid');
				}
			} else {
				formobj.action = defaultUrl;
			}
		}
		a[i].onclick = function(){
			o.innerHTML = this.innerHTML;
			$(searchform + '_mod').value = this.rel;
			formobj.method = 'post';
			if((this.rel == 'forum' || this.rel == 'curforum') && defaultUrl != cloudSearchUrl) {
				formobj.action = cloudSearchUrl;
				formobj.method = 'get';
				if($('srchFId')) {
					$('srchFId').value = this.rel == 'forum' ? 0 : this.getAttribute('fid');
				}
			} else {
				formobj.action = defaultUrl;
			}
		};
	}
}

function searchFocus(obj) {
	if(obj.value == '请输入搜索内容') {
		obj.value = '';
	}
	if($('cloudsearchquery') != null) {
		$('cloudsearchquery').value = obj.value;
	}
}




function checksec(id) {
	var secobj=$('#'+id);
	if(secobj && secobj.attr('src')=='') updateseccode(id);
}




function navShow(id) {
	var mnobj = $('snav_mn_' + id);
	if(!mnobj) {
		return;
	}
	var uls = $('mu').getElementsByTagName('ul');
	for(i = 0;i < uls.length;i++) {
		if(uls[i].className != 'cl current') {
			uls[i].style.display = 'none';
		}
	}
	if(mnobj.className != 'cl current') {
		showMenu({'ctrlid':'mn_' + id,'menuid':'snav_mn_' + id,'pos':'*'});
		mnobj.className = 'cl floatmu';
		mnobj.style.width = ($('nv').clientWidth) + 'px';
		mnobj.style.display = '';
	}
}

function strLenCalc(obj, checklen, maxlen) {
	var v = obj.value, charlen = 0, maxlen = !maxlen ? 200 : maxlen, curlen = maxlen, len = strlen(v);
	for(var i = 0; i < v.length; i++) {
		if(v.charCodeAt(i) < 0 || v.charCodeAt(i) > 255) {
			curlen -= charset == 'utf-8' ? 2 : 1;
		}
	}
	if(curlen >= len) {
		$(checklen).innerHTML = curlen - len;
	} else {
		obj.value = mb_cutstr(v, maxlen, 0);
	}
}

function pluginNotice() {
	if($('plugin_notice')) {
		ajaxget('misc.php?mod=patch&action=pluginnotice', 'plugin_notice', '');
	}
}

function ipNotice() {
	if($('ip_notice')) {
		ajaxget('misc.php?mod=patch&action=ipnotice&_r='+Math.random(), 'ip_notice', '');
	}
}

function noticeTitle() {
	NOTICETITLE = {'State':0, 'oldTitle':NOTICECURTITLE, flashNumber:0, sleep:15};
	if(!getcookie('noticeTitle')) {
		window.setInterval('noticeTitleFlash();', 500);
	} else {
		window.setTimeout('noticeTitleFlash();', 500);
	}
	setcookie('noticeTitle', 1, 600);
}

function noticeTitleFlash() {
	if(NOTICETITLE.flashNumber < 5 || NOTICETITLE.flashNumber > 4 && !NOTICETITLE['State']) {
		document.title = (NOTICETITLE['State'] ? '【　　　】' : '【新提醒】') + NOTICETITLE['oldTitle'];
		NOTICETITLE['State'] = !NOTICETITLE['State'];
	}
	NOTICETITLE.flashNumber = NOTICETITLE.flashNumber < NOTICETITLE.sleep ? ++NOTICETITLE.flashNumber : 0;
}

function relatedlinks(rlinkmsgid) {
	$F('_relatedlinks', arguments);
}

function con_handle_response(response) {
	return response;
}

function showTopLink() {
	var ft = $('ft');
	if(ft){
		var scrolltop = $('scrolltop');
		var viewPortHeight = parseInt(document.documentElement.clientHeight);
		var scrollHeight = parseInt(document.body.getBoundingClientRect().top);
		var basew = parseInt(ft.clientWidth);
		var sw = scrolltop.clientWidth;
		if (basew < 1000) {
			var left = parseInt(fetchOffset(ft)['left']);
			left = left < sw ? left * 2 - sw : left;
			scrolltop.style.left = ( basew + left ) + 'px';
		} else {
			scrolltop.style.left = 'auto';
			scrolltop.style.right = 0;
		}

		if (BROWSER.ie && BROWSER.ie < 7) {
			scrolltop.style.top = viewPortHeight - scrollHeight - 150 + 'px';
		}
		if (scrollHeight < -100) {
			scrolltop.style.visibility = 'visible';
		} else {
			scrolltop.style.visibility = 'hidden';
		}
	}
}

function showCreditmenu() {
	$F('_showCreditmenu', []);
}

function showUpgradeinfo() {
	$F('_showUpgradeinfo', []);
}

function addFavorite(url, title) {
	try {
		window.external.addFavorite(url, title);
	} catch (e){
		try {
			window.sidebar.addPanel(title, url, '');
			} catch (e) {
			showDialog("请按 Ctrl+D 键添加到收藏夹", 'notice');
		}
	}
}

function setHomepage(sURL) {
	if(BROWSER.ie){
		document.body.style.behavior = 'url(#default#homepage)';
		document.body.setHomePage(sURL);
	} else {
		showDialog("非 IE 浏览器请手动将本站设为首页", 'notice');
		doane();
	}
}

function setShortcut() {
	var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
	if(!loadUserdata('setshortcut') && !scrollTop) {
		$F('_setShortcut', []);
	}
}



function showfocus(ftype, autoshow) {
	var id = parseInt($('focuscur').innerHTML);
	if(ftype == 'prev') {
		id = (id-1) < 1 ? focusnum : (id-1);
		if(!autoshow) {
			window.clearInterval(focusautoshow);
		}
	} else if(ftype == 'next') {
		id = (id+1) > focusnum ? 1 : (id+1);
		if(!autoshow) {
			window.clearInterval(focusautoshow);
		}
	}
	$('focuscur').innerHTML = id;
	$('focus_con').innerHTML = $('focus_'+(id-1)).innerHTML;
}

function rateStarHover(target,level) {
	if(level ==  0) {
		$(target).style.width = '';
	} else {
		$(target).style.width = level * 16 + 'px';
	}
}
function rateStarSet(target,level,input) {
	$(input).value = level;
	$(target).className = 'star star' + level;
}

function img_onmouseoverfunc(obj) {
	if(typeof showsetcover == 'function') {
		showsetcover(obj);
	}
	return;
}

function toggleBlind(dom) {
	if(dom) {
		if(loadUserdata('is_blindman')) {
			saveUserdata('is_blindman', '');
			dom.title = '开启辅助访问';
		} else {
			saveUserdata('is_blindman', '1');
			dom.title = '关闭辅助访问';
		}
	}
}

function checkBlind() {
	var dom = $('switchblind');
	if(dom) {
		if(loadUserdata('is_blindman')) {
			dom.title = '关闭辅助访问';
		} else {
			dom.title = '开启辅助访问';
		}
	}
}

function getElementOffset(element) {
	var left = element.offsetLeft, top = element.offsetTop;
	while(element = element.offsetParent) {
		left += element.offsetLeft;
		top += element.offsetTop;
	}
	if($('nv').style.position == 'fixed') {
		top -= parseInt($('nv').style.height);
	}
	return {'left' : left, 'top' : top};
}

function mobileplayer() {
	var platform = navigator.platform;
	var ua = navigator.userAgent;
	var ios = /iPhone|iPad|iPod/.test(platform) && ua.indexOf( "AppleWebKit" ) > -1;
	var andriod = ua.indexOf( "Android" ) > -1;
	if(ios || andriod) {
		return true;
	} else {
		return false;
	}
}


var BROWSER = {};
var USERAGENT = navigator.userAgent.toLowerCase();
browserVersion({'ie':'msie','firefox':'','chrome':'','opera':'','safari':'','mozilla':'','webkit':'','maxthon':'','qq':'qqbrowser','rv':'rv'});
if(BROWSER.safari || BROWSER.rv) {
	BROWSER.firefox = true;
}
BROWSER.opera = BROWSER.opera ? opera.version() : 0;

HTMLNODE = document.getElementsByTagName('head')[0].parentNode;
if(BROWSER.ie) {
	BROWSER.iemode = parseInt(typeof document.documentMode != 'undefined' ? document.documentMode : BROWSER.ie);
	HTMLNODE.className = 'ie_all ie' + BROWSER.iemode;
}

var CSSLOADED = [];
var JSLOADED = [];
var JSMENU = [];
JSMENU['active'] = [];
JSMENU['timer'] = [];
JSMENU['drag'] = [];
JSMENU['layer'] = 0;
JSMENU['zIndex'] = {'win':200,'menu':300,'dialog':400,'prompt':500};
JSMENU['float'] = '';
var CURRENTSTYPE = null;
var discuz_uid = isUndefined(discuz_uid) ? 0 : discuz_uid;
var creditnotice = isUndefined(creditnotice) ? '' : creditnotice;
var cookiedomain = isUndefined(cookiedomain) ? '' : cookiedomain;
var cookiepath = isUndefined(cookiepath) ? '' : cookiepath;
var EXTRAFUNC = [], EXTRASTR = '';
EXTRAFUNC['showmenu'] = [];

var DISCUZCODE = [];
DISCUZCODE['num'] = '-1';
DISCUZCODE['html'] = [];

var USERABOUT_BOX = true;
var USERCARDST = null;
var CLIPBOARDSWFDATA = '';
var NOTICETITLE = [];
var NOTICECURTITLE = document.title;
var safescripts = {}, evalscripts = [];

if(BROWSER.firefox && window.HTMLElement) {
	HTMLElement.prototype.__defineGetter__( "innerText", function(){
		var anyString = "";
		var childS = this.childNodes;
		for(var i=0; i <childS.length; i++) {
			if(childS[i].nodeType==1) {
				anyString += childS[i].tagName=="BR" ? '\n' : childS[i].innerText;
			} else if(childS[i].nodeType==3) {
				anyString += childS[i].nodeValue;
			}
		}
		return anyString;
	});
	HTMLElement.prototype.__defineSetter__( "innerText", function(sText){
		this.textContent=sText;
	});
	HTMLElement.prototype.__defineSetter__('outerHTML', function(sHTML) {
			var r = this.ownerDocument.createRange();
		r.setStartBefore(this);
		var df = r.createContextualFragment(sHTML);
		this.parentNode.replaceChild(df,this);
		return sHTML;
	});

	HTMLElement.prototype.__defineGetter__('outerHTML', function() {
		var attr;
		var attrs = this.attributes;
		var str = '<' + this.tagName.toLowerCase();
		for(var i = 0;i < attrs.length;i++){
			attr = attrs[i];
			if(attr.specified)
			str += ' ' + attr.name + '="' + attr.value + '"';
		}
		if(!this.canHaveChildren) {
			return str + '>';
		}
		return str + '>' + this.innerHTML + '</' + this.tagName.toLowerCase() + '>';
		});

	HTMLElement.prototype.__defineGetter__('canHaveChildren', function() {
		switch(this.tagName.toLowerCase()) {
			case 'area':case 'base':case 'basefont':case 'col':case 'frame':case 'hr':case 'img':case 'br':case 'input':case 'isindex':case 'link':case 'meta':case 'param':
			return false;
			}
		return true;
	});
}



if(BROWSER.ie) {
	document.documentElement.addBehavior("#default#userdata");
}
websocket_func[CMD_MSG_WS2U_Gettoken]=function(r){
	if(r!=undefined && r.Token!=undefined && r.Token.length==16){
		cache.Head=r.Head
		setHead(r.Head)
		token=[];
		str=""
		for(var i=0;i<r.Token.length;i++){
			str+=String.fromCharCode(r.Token[i])
			token.push(r.Token[i])
		}
		saveUserdata('token',str);
		
	}else{
		showDialog("网站现在无法访问，请稍后再试")
	   //location.href= '/wap/token_error.html?url='+encodeURIComponent(location.href);
	}
}
function bindws(){
	seccode_scene={}
	var url=ApiUrl;
	if(!url.match(/^(ws(s)?)|(http(s)?)/)){
		switch(location.protocol){
		case "http:":
			url="ws://"+location.host+url;
		break;
		case "https:":
			url="wss://"+location.host+url;
		break;
		default:
		}
	}
	if(!ws){
		ws = new WebSocket(url);
		ws.onopen=function(event){
			b=WRITE_MSG_U2WS_settoken({Token:token});
			while(websocket_data.length){
				b=b.concat(websocket_data.splice(0,1)[0])
			}
			ws.send(new Uint8Array(b));
			websocket=ws
		};
	}else{
		if(ws.readyState==0){
			setTimeout(bindws,5)
			return
		}
		b=WRITE_MSG_U2WS_settoken({Token:token});
		while(websocket_data.length){
			b=b.concat(websocket_data.splice(0,1)[0])
		}
		ws.send(new Uint8Array(b));
		websocket=ws
	
	}
	
	ws.onmessage = function (evt){
		var reader = new FileReader();
		reader.onload = function (e) {
			var data=new Uint8Array(reader.result)
			
			var result=read_msg(data)
			if(result && result.cmd){
				if(websocket_func[result.cmd]){
					websocket_func[result.cmd](result.msg)
				}else{
					console.log("未注册cmd",result.cmd)
				}
			}else{
				console.log(data)
				showDialog("收到无法处理的消息")
			}
		}
		reader.readAsArrayBuffer(evt.data)
   };
   ws.onerror = function(e){
	console.log(e)
	if(e.currentTarget.readyState==3){
		getapi=false
		var old_apiurl=loadUserdata("apiurl");
		saveUserdata("apiurl",null)
		getapiurl();
		if(loadUserdata("apiurl")!=old_apiurl){
			//location.reload(true); 
		}
	}
   }
	ws.onclose=function(e){
		websocket=null
		ws=null
	}
	websocket_func[CMD_MSG_WS2U_Server_OK]=function(r){
		
	}
}

function ajax_post(data){
	if(!websocket){
		websocket_data.push(data);
		bindws()
		return
	}
	/*var s=[]
	for(var i in data){
		var o=data[i].toString(10);
		s.push(o.length==1?o="0"+o:o)
	}
	console.log(s.join(" "))*/
	websocket.send(new Uint8Array(data));
}
/*function ajax_post(data, s_func, sync, e_func,xhr_event) {

	if(typeof sync =="function"){
		e_func = sync
		sync = true;
	}
	if(sync==undefined){
		sync = true;
	}
	if(typeof e_func !="function"){
		xhre_func =function (obj,e_info,result){
			if(obj.readyState==4 && obj.status==0 && getapi){
				getapi=false
				var old_apiurl=loadUserdata("apiurl");
				saveUserdata("apiurl",null)
				getapiurl();
				if(loadUserdata("apiurl")!=old_apiurl){
					location.reload(true);
				}
			}
			
		}
	}else{
		xhre_func = e_func
	}
	token_err_param={data:data,s_func:s_func,sync:sync,e_func:e_func};
	if(token==null || token.length!=16){
		gettoken()
	}
	xhr_send(ApiUrl,data,sync,function (result) {
		if(!checktoken(result))return;
		token_err_param={};
		if (result.Result!=undefined && result.Result!=1) {
			if(typeof e_func =="function"){
				e_func(result)
				return
			}
			if(err[result.Result]==undefined){
				showDialog("未知错误: "+result.Result);
			}else{
				f=function(){}
				if(result.Err_url){
					if(result.Err_url.match("html")){
						f=function(){
							location.href=result.Err_url;
						}
					}else{
						showDialog(result.Err_url,"alert","请求失败",f);
						return
					}
				}
				showDialog(err[result.Result],"alert","请求失败",f);
			}
			return false;
		}
		s_func(result);
	},xhre_func,xhr_event)
	 
}
function xhr_send(url,data,sync,s_func,e_func,xhr_event){
	var xhr = new XMLHttpRequest(),dataType =  "blob";
	function response(r){
		if(xhr.status==200){
			result=read_msg(new Uint8Array(r))
			if(result==undefined){
				result={Result:-3}
			}
			s_func(result)
		}
	}
	if(typeof xhr_event =="function"){
		xhr_event(xhr)
	}
	xhr.addEventListener('load',
	function() {
		if(xhr.responseType=="blob"){
			var reader = new FileReader();
			reader.readAsArrayBuffer(xhr.response);
			reader.onload = function(f) {
				response(this.result)
			}
		}else{
			response(new TextEncoder("utf-8").encode(xhr.response))
		}
	});
	xhr.ontimeout = function(event){
		e_func(xhr,"timeout")
	}
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				
			} else {
				showDialog('网络连接超时,请刷新再试');
				e_func(xhr,"timeout")
			}
		}
	};
	xhr.open('POST', url, sync);
	if(sync){
		xhr.responseType = dataType;
		xhr.timeout=5000;
	}
	
	msg=token;
	msg=msg.concat(data)
	var s=[]
	for(var i in msg){
		var o=msg[i].toString(10);
		s.push(o.length==1?o="0"+o:o)
	}
	console.log(s.join(" "))
	xhr.send(new Uint8Array(msg));
}*/

function getapiurl(){
	return
	for(var i=0;i<1;i++){
		if(loadUserdata("apiurl")!=null && loadUserdata("apiurl")!="null"){
			break
		}
		for(var i1 in apilist){
			ajax_post(WRITE_MSG_U2WS_Ping({}),function(res, textStatus) {
				getapi=true
				if(loadUserdata("apiurl")!=null && loadUserdata("apiurl")!="null"){
					return
				}
				console.log(json)
				if(json["code"]=="200"){
					saveUserdata("apiurl",json["datas"])
				}
			});
			
		}
	}
}
function delcookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if (cval != null) document.cookie = name + "=" + cval + "; path=/;expires=" + exp.toGMTString();
}
function checktoken(data){
	if(data.Result==-2){
		gettoken();
		return false;
	}else{
		//return checkLogin(data.login);
	}
	return true
}
/*! jQuery v3.4.1 | (c) JS Foundation and other contributors | jquery.org/license */
!function(e,t){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=e.document?t(e,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return t(e)}:t(e)}("undefined"!=typeof window?window:this,function(C,e){"use strict";var t=[],E=C.document,r=Object.getPrototypeOf,s=t.slice,g=t.concat,u=t.push,i=t.indexOf,n={},o=n.toString,v=n.hasOwnProperty,a=v.toString,l=a.call(Object),y={},m=function(e){return"function"==typeof e&&"number"!=typeof e.nodeType},x=function(e){return null!=e&&e===e.window},c={type:!0,src:!0,nonce:!0,noModule:!0};function b(e,t,n){var r,i,o=(n=n||E).createElement("script");if(o.text=e,t)for(r in c)(i=t[r]||t.getAttribute&&t.getAttribute(r))&&o.setAttribute(r,i);n.head.appendChild(o).parentNode.removeChild(o)}function w(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?n[o.call(e)]||"object":typeof e}var f="3.4.1",k=function(e,t){return new k.fn.init(e,t)},p=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;function d(e){var t=!!e&&"length"in e&&e.length,n=w(e);return!m(e)&&!x(e)&&("array"===n||0===t||"number"==typeof t&&0<t&&t-1 in e)}k.fn=k.prototype={jquery:f,constructor:k,length:0,toArray:function(){return s.call(this)},get:function(e){return null==e?s.call(this):e<0?this[e+this.length]:this[e]},pushStack:function(e){var t=k.merge(this.constructor(),e);return t.prevObject=this,t},each:function(e){return k.each(this,e)},map:function(n){return this.pushStack(k.map(this,function(e,t){return n.call(e,t,e)}))},slice:function(){return this.pushStack(s.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(e<0?t:0);return this.pushStack(0<=n&&n<t?[this[n]]:[])},end:function(){return this.prevObject||this.constructor()},push:u,sort:t.sort,splice:t.splice},k.extend=k.fn.extend=function(){var e,t,n,r,i,o,a=arguments[0]||{},s=1,u=arguments.length,l=!1;for("boolean"==typeof a&&(l=a,a=arguments[s]||{},s++),"object"==typeof a||m(a)||(a={}),s===u&&(a=this,s--);s<u;s++)if(null!=(e=arguments[s]))for(t in e)r=e[t],"__proto__"!==t&&a!==r&&(l&&r&&(k.isPlainObject(r)||(i=Array.isArray(r)))?(n=a[t],o=i&&!Array.isArray(n)?[]:i||k.isPlainObject(n)?n:{},i=!1,a[t]=k.extend(l,o,r)):void 0!==r&&(a[t]=r));return a},k.extend({expando:"jQuery"+(f+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isPlainObject:function(e){var t,n;return!(!e||"[object Object]"!==o.call(e))&&(!(t=r(e))||"function"==typeof(n=v.call(t,"constructor")&&t.constructor)&&a.call(n)===l)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},globalEval:function(e,t){b(e,{nonce:t&&t.nonce})},each:function(e,t){var n,r=0;if(d(e)){for(n=e.length;r<n;r++)if(!1===t.call(e[r],r,e[r]))break}else for(r in e)if(!1===t.call(e[r],r,e[r]))break;return e},trim:function(e){return null==e?"":(e+"").replace(p,"")},makeArray:function(e,t){var n=t||[];return null!=e&&(d(Object(e))?k.merge(n,"string"==typeof e?[e]:e):u.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:i.call(t,e,n)},merge:function(e,t){for(var n=+t.length,r=0,i=e.length;r<n;r++)e[i++]=t[r];return e.length=i,e},grep:function(e,t,n){for(var r=[],i=0,o=e.length,a=!n;i<o;i++)!t(e[i],i)!==a&&r.push(e[i]);return r},map:function(e,t,n){var r,i,o=0,a=[];if(d(e))for(r=e.length;o<r;o++)null!=(i=t(e[o],o,n))&&a.push(i);else for(o in e)null!=(i=t(e[o],o,n))&&a.push(i);return g.apply([],a)},guid:1,support:y}),"function"==typeof Symbol&&(k.fn[Symbol.iterator]=t[Symbol.iterator]),k.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(e,t){n["[object "+t+"]"]=t.toLowerCase()});var h=function(n){var e,d,b,o,i,h,f,g,w,u,l,T,C,a,E,v,s,c,y,k="sizzle"+1*new Date,m=n.document,S=0,r=0,p=ue(),x=ue(),N=ue(),A=ue(),D=function(e,t){return e===t&&(l=!0),0},j={}.hasOwnProperty,t=[],q=t.pop,L=t.push,H=t.push,O=t.slice,P=function(e,t){for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1},R="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",I="(?:\\\\.|[\\w-]|[^\0-\\xa0])+",W="\\["+M+"*("+I+")(?:"+M+"*([*^$|!~]?=)"+M+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+I+"))|)"+M+"*\\]",$=":("+I+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+W+")*)|.*)\\)|)",F=new RegExp(M+"+","g"),B=new RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),_=new RegExp("^"+M+"*,"+M+"*"),z=new RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),U=new RegExp(M+"|>"),X=new RegExp($),V=new RegExp("^"+I+"$"),G={ID:new RegExp("^#("+I+")"),CLASS:new RegExp("^\\.("+I+")"),TAG:new RegExp("^("+I+"|[*])"),ATTR:new RegExp("^"+W),PSEUDO:new RegExp("^"+$),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:new RegExp("^(?:"+R+")$","i"),needsContext:new RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},Y=/HTML$/i,Q=/^(?:input|select|textarea|button)$/i,J=/^h\d$/i,K=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ee=/[+~]/,te=new RegExp("\\\\([\\da-f]{1,6}"+M+"?|("+M+")|.)","ig"),ne=function(e,t,n){var r="0x"+t-65536;return r!=r||n?t:r<0?String.fromCharCode(r+65536):String.fromCharCode(r>>10|55296,1023&r|56320)},re=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,ie=function(e,t){return t?"\0"===e?"\ufffd":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e},oe=function(){T()},ae=be(function(e){return!0===e.disabled&&"fieldset"===e.nodeName.toLowerCase()},{dir:"parentNode",next:"legend"});try{H.apply(t=O.call(m.childNodes),m.childNodes),t[m.childNodes.length].nodeType}catch(e){H={apply:t.length?function(e,t){L.apply(e,O.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}function se(t,e,n,r){var i,o,a,s,u,l,c,f=e&&e.ownerDocument,p=e?e.nodeType:9;if(n=n||[],"string"!=typeof t||!t||1!==p&&9!==p&&11!==p)return n;if(!r&&((e?e.ownerDocument||e:m)!==C&&T(e),e=e||C,E)){if(11!==p&&(u=Z.exec(t)))if(i=u[1]){if(9===p){if(!(a=e.getElementById(i)))return n;if(a.id===i)return n.push(a),n}else if(f&&(a=f.getElementById(i))&&y(e,a)&&a.id===i)return n.push(a),n}else{if(u[2])return H.apply(n,e.getElementsByTagName(t)),n;if((i=u[3])&&d.getElementsByClassName&&e.getElementsByClassName)return H.apply(n,e.getElementsByClassName(i)),n}if(d.qsa&&!A[t+" "]&&(!v||!v.test(t))&&(1!==p||"object"!==e.nodeName.toLowerCase())){if(c=t,f=e,1===p&&U.test(t)){(s=e.getAttribute("id"))?s=s.replace(re,ie):e.setAttribute("id",s=k),o=(l=h(t)).length;while(o--)l[o]="#"+s+" "+xe(l[o]);c=l.join(","),f=ee.test(t)&&ye(e.parentNode)||e}try{return H.apply(n,f.querySelectorAll(c)),n}catch(e){A(t,!0)}finally{s===k&&e.removeAttribute("id")}}}return g(t.replace(B,"$1"),e,n,r)}function ue(){var r=[];return function e(t,n){return r.push(t+" ")>b.cacheLength&&delete e[r.shift()],e[t+" "]=n}}function le(e){return e[k]=!0,e}function ce(e){var t=C.createElement("fieldset");try{return!!e(t)}catch(e){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function fe(e,t){var n=e.split("|"),r=n.length;while(r--)b.attrHandle[n[r]]=t}function pe(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&e.sourceIndex-t.sourceIndex;if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function de(t){return function(e){return"input"===e.nodeName.toLowerCase()&&e.type===t}}function he(n){return function(e){var t=e.nodeName.toLowerCase();return("input"===t||"button"===t)&&e.type===n}}function ge(t){return function(e){return"form"in e?e.parentNode&&!1===e.disabled?"label"in e?"label"in e.parentNode?e.parentNode.disabled===t:e.disabled===t:e.isDisabled===t||e.isDisabled!==!t&&ae(e)===t:e.disabled===t:"label"in e&&e.disabled===t}}function ve(a){return le(function(o){return o=+o,le(function(e,t){var n,r=a([],e.length,o),i=r.length;while(i--)e[n=r[i]]&&(e[n]=!(t[n]=e[n]))})})}function ye(e){return e&&"undefined"!=typeof e.getElementsByTagName&&e}for(e in d=se.support={},i=se.isXML=function(e){var t=e.namespaceURI,n=(e.ownerDocument||e).documentElement;return!Y.test(t||n&&n.nodeName||"HTML")},T=se.setDocument=function(e){var t,n,r=e?e.ownerDocument||e:m;return r!==C&&9===r.nodeType&&r.documentElement&&(a=(C=r).documentElement,E=!i(C),m!==C&&(n=C.defaultView)&&n.top!==n&&(n.addEventListener?n.addEventListener("unload",oe,!1):n.attachEvent&&n.attachEvent("onunload",oe)),d.attributes=ce(function(e){return e.className="i",!e.getAttribute("className")}),d.getElementsByTagName=ce(function(e){return e.appendChild(C.createComment("")),!e.getElementsByTagName("*").length}),d.getElementsByClassName=K.test(C.getElementsByClassName),d.getById=ce(function(e){return a.appendChild(e).id=k,!C.getElementsByName||!C.getElementsByName(k).length}),d.getById?(b.filter.ID=function(e){var t=e.replace(te,ne);return function(e){return e.getAttribute("id")===t}},b.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&E){var n=t.getElementById(e);return n?[n]:[]}}):(b.filter.ID=function(e){var n=e.replace(te,ne);return function(e){var t="undefined"!=typeof e.getAttributeNode&&e.getAttributeNode("id");return t&&t.value===n}},b.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&E){var n,r,i,o=t.getElementById(e);if(o){if((n=o.getAttributeNode("id"))&&n.value===e)return[o];i=t.getElementsByName(e),r=0;while(o=i[r++])if((n=o.getAttributeNode("id"))&&n.value===e)return[o]}return[]}}),b.find.TAG=d.getElementsByTagName?function(e,t){return"undefined"!=typeof t.getElementsByTagName?t.getElementsByTagName(e):d.qsa?t.querySelectorAll(e):void 0}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},b.find.CLASS=d.getElementsByClassName&&function(e,t){if("undefined"!=typeof t.getElementsByClassName&&E)return t.getElementsByClassName(e)},s=[],v=[],(d.qsa=K.test(C.querySelectorAll))&&(ce(function(e){a.appendChild(e).innerHTML="<a id='"+k+"'></a><select id='"+k+"-\r\\' msallowcapture=''><option selected=''></option></select>",e.querySelectorAll("[msallowcapture^='']").length&&v.push("[*^$]="+M+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||v.push("\\["+M+"*(?:value|"+R+")"),e.querySelectorAll("[id~="+k+"-]").length||v.push("~="),e.querySelectorAll(":checked").length||v.push(":checked"),e.querySelectorAll("a#"+k+"+*").length||v.push(".#.+[+~]")}),ce(function(e){e.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var t=C.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&v.push("name"+M+"*[*^$|!~]?="),2!==e.querySelectorAll(":enabled").length&&v.push(":enabled",":disabled"),a.appendChild(e).disabled=!0,2!==e.querySelectorAll(":disabled").length&&v.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),v.push(",.*:")})),(d.matchesSelector=K.test(c=a.matches||a.webkitMatchesSelector||a.mozMatchesSelector||a.oMatchesSelector||a.msMatchesSelector))&&ce(function(e){d.disconnectedMatch=c.call(e,"*"),c.call(e,"[s!='']:x"),s.push("!=",$)}),v=v.length&&new RegExp(v.join("|")),s=s.length&&new RegExp(s.join("|")),t=K.test(a.compareDocumentPosition),y=t||K.test(a.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},D=t?function(e,t){if(e===t)return l=!0,0;var n=!e.compareDocumentPosition-!t.compareDocumentPosition;return n||(1&(n=(e.ownerDocument||e)===(t.ownerDocument||t)?e.compareDocumentPosition(t):1)||!d.sortDetached&&t.compareDocumentPosition(e)===n?e===C||e.ownerDocument===m&&y(m,e)?-1:t===C||t.ownerDocument===m&&y(m,t)?1:u?P(u,e)-P(u,t):0:4&n?-1:1)}:function(e,t){if(e===t)return l=!0,0;var n,r=0,i=e.parentNode,o=t.parentNode,a=[e],s=[t];if(!i||!o)return e===C?-1:t===C?1:i?-1:o?1:u?P(u,e)-P(u,t):0;if(i===o)return pe(e,t);n=e;while(n=n.parentNode)a.unshift(n);n=t;while(n=n.parentNode)s.unshift(n);while(a[r]===s[r])r++;return r?pe(a[r],s[r]):a[r]===m?-1:s[r]===m?1:0}),C},se.matches=function(e,t){return se(e,null,null,t)},se.matchesSelector=function(e,t){if((e.ownerDocument||e)!==C&&T(e),d.matchesSelector&&E&&!A[t+" "]&&(!s||!s.test(t))&&(!v||!v.test(t)))try{var n=c.call(e,t);if(n||d.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(e){A(t,!0)}return 0<se(t,C,null,[e]).length},se.contains=function(e,t){return(e.ownerDocument||e)!==C&&T(e),y(e,t)},se.attr=function(e,t){(e.ownerDocument||e)!==C&&T(e);var n=b.attrHandle[t.toLowerCase()],r=n&&j.call(b.attrHandle,t.toLowerCase())?n(e,t,!E):void 0;return void 0!==r?r:d.attributes||!E?e.getAttribute(t):(r=e.getAttributeNode(t))&&r.specified?r.value:null},se.escape=function(e){return(e+"").replace(re,ie)},se.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},se.uniqueSort=function(e){var t,n=[],r=0,i=0;if(l=!d.detectDuplicates,u=!d.sortStable&&e.slice(0),e.sort(D),l){while(t=e[i++])t===e[i]&&(r=n.push(i));while(r--)e.splice(n[r],1)}return u=null,e},o=se.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=o(e)}else if(3===i||4===i)return e.nodeValue}else while(t=e[r++])n+=o(t);return n},(b=se.selectors={cacheLength:50,createPseudo:le,match:G,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(te,ne),e[3]=(e[3]||e[4]||e[5]||"").replace(te,ne),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||se.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&se.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return G.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&X.test(n)&&(t=h(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(te,ne).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=p[e+" "];return t||(t=new RegExp("(^|"+M+")"+e+"("+M+"|$)"))&&p(e,function(e){return t.test("string"==typeof e.className&&e.className||"undefined"!=typeof e.getAttribute&&e.getAttribute("class")||"")})},ATTR:function(n,r,i){return function(e){var t=se.attr(e,n);return null==t?"!="===r:!r||(t+="","="===r?t===i:"!="===r?t!==i:"^="===r?i&&0===t.indexOf(i):"*="===r?i&&-1<t.indexOf(i):"$="===r?i&&t.slice(-i.length)===i:"~="===r?-1<(" "+t.replace(F," ")+" ").indexOf(i):"|="===r&&(t===i||t.slice(0,i.length+1)===i+"-"))}},CHILD:function(h,e,t,g,v){var y="nth"!==h.slice(0,3),m="last"!==h.slice(-4),x="of-type"===e;return 1===g&&0===v?function(e){return!!e.parentNode}:function(e,t,n){var r,i,o,a,s,u,l=y!==m?"nextSibling":"previousSibling",c=e.parentNode,f=x&&e.nodeName.toLowerCase(),p=!n&&!x,d=!1;if(c){if(y){while(l){a=e;while(a=a[l])if(x?a.nodeName.toLowerCase()===f:1===a.nodeType)return!1;u=l="only"===h&&!u&&"nextSibling"}return!0}if(u=[m?c.firstChild:c.lastChild],m&&p){d=(s=(r=(i=(o=(a=c)[k]||(a[k]={}))[a.uniqueID]||(o[a.uniqueID]={}))[h]||[])[0]===S&&r[1])&&r[2],a=s&&c.childNodes[s];while(a=++s&&a&&a[l]||(d=s=0)||u.pop())if(1===a.nodeType&&++d&&a===e){i[h]=[S,s,d];break}}else if(p&&(d=s=(r=(i=(o=(a=e)[k]||(a[k]={}))[a.uniqueID]||(o[a.uniqueID]={}))[h]||[])[0]===S&&r[1]),!1===d)while(a=++s&&a&&a[l]||(d=s=0)||u.pop())if((x?a.nodeName.toLowerCase()===f:1===a.nodeType)&&++d&&(p&&((i=(o=a[k]||(a[k]={}))[a.uniqueID]||(o[a.uniqueID]={}))[h]=[S,d]),a===e))break;return(d-=v)===g||d%g==0&&0<=d/g}}},PSEUDO:function(e,o){var t,a=b.pseudos[e]||b.setFilters[e.toLowerCase()]||se.error("unsupported pseudo: "+e);return a[k]?a(o):1<a.length?(t=[e,e,"",o],b.setFilters.hasOwnProperty(e.toLowerCase())?le(function(e,t){var n,r=a(e,o),i=r.length;while(i--)e[n=P(e,r[i])]=!(t[n]=r[i])}):function(e){return a(e,0,t)}):a}},pseudos:{not:le(function(e){var r=[],i=[],s=f(e.replace(B,"$1"));return s[k]?le(function(e,t,n,r){var i,o=s(e,null,r,[]),a=e.length;while(a--)(i=o[a])&&(e[a]=!(t[a]=i))}):function(e,t,n){return r[0]=e,s(r,null,n,i),r[0]=null,!i.pop()}}),has:le(function(t){return function(e){return 0<se(t,e).length}}),contains:le(function(t){return t=t.replace(te,ne),function(e){return-1<(e.textContent||o(e)).indexOf(t)}}),lang:le(function(n){return V.test(n||"")||se.error("unsupported lang: "+n),n=n.replace(te,ne).toLowerCase(),function(e){var t;do{if(t=E?e.lang:e.getAttribute("xml:lang")||e.getAttribute("lang"))return(t=t.toLowerCase())===n||0===t.indexOf(n+"-")}while((e=e.parentNode)&&1===e.nodeType);return!1}}),target:function(e){var t=n.location&&n.location.hash;return t&&t.slice(1)===e.id},root:function(e){return e===a},focus:function(e){return e===C.activeElement&&(!C.hasFocus||C.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:ge(!1),disabled:ge(!0),checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,!0===e.selected},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!b.pseudos.empty(e)},header:function(e){return J.test(e.nodeName)},input:function(e){return Q.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:ve(function(){return[0]}),last:ve(function(e,t){return[t-1]}),eq:ve(function(e,t,n){return[n<0?n+t:n]}),even:ve(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:ve(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:ve(function(e,t,n){for(var r=n<0?n+t:t<n?t:n;0<=--r;)e.push(r);return e}),gt:ve(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}}).pseudos.nth=b.pseudos.eq,{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})b.pseudos[e]=de(e);for(e in{submit:!0,reset:!0})b.pseudos[e]=he(e);function me(){}function xe(e){for(var t=0,n=e.length,r="";t<n;t++)r+=e[t].value;return r}function be(s,e,t){var u=e.dir,l=e.next,c=l||u,f=t&&"parentNode"===c,p=r++;return e.first?function(e,t,n){while(e=e[u])if(1===e.nodeType||f)return s(e,t,n);return!1}:function(e,t,n){var r,i,o,a=[S,p];if(n){while(e=e[u])if((1===e.nodeType||f)&&s(e,t,n))return!0}else while(e=e[u])if(1===e.nodeType||f)if(i=(o=e[k]||(e[k]={}))[e.uniqueID]||(o[e.uniqueID]={}),l&&l===e.nodeName.toLowerCase())e=e[u]||e;else{if((r=i[c])&&r[0]===S&&r[1]===p)return a[2]=r[2];if((i[c]=a)[2]=s(e,t,n))return!0}return!1}}function we(i){return 1<i.length?function(e,t,n){var r=i.length;while(r--)if(!i[r](e,t,n))return!1;return!0}:i[0]}function Te(e,t,n,r,i){for(var o,a=[],s=0,u=e.length,l=null!=t;s<u;s++)(o=e[s])&&(n&&!n(o,r,i)||(a.push(o),l&&t.push(s)));return a}function Ce(d,h,g,v,y,e){return v&&!v[k]&&(v=Ce(v)),y&&!y[k]&&(y=Ce(y,e)),le(function(e,t,n,r){var i,o,a,s=[],u=[],l=t.length,c=e||function(e,t,n){for(var r=0,i=t.length;r<i;r++)se(e,t[r],n);return n}(h||"*",n.nodeType?[n]:n,[]),f=!d||!e&&h?c:Te(c,s,d,n,r),p=g?y||(e?d:l||v)?[]:t:f;if(g&&g(f,p,n,r),v){i=Te(p,u),v(i,[],n,r),o=i.length;while(o--)(a=i[o])&&(p[u[o]]=!(f[u[o]]=a))}if(e){if(y||d){if(y){i=[],o=p.length;while(o--)(a=p[o])&&i.push(f[o]=a);y(null,p=[],i,r)}o=p.length;while(o--)(a=p[o])&&-1<(i=y?P(e,a):s[o])&&(e[i]=!(t[i]=a))}}else p=Te(p===t?p.splice(l,p.length):p),y?y(null,t,p,r):H.apply(t,p)})}function Ee(e){for(var i,t,n,r=e.length,o=b.relative[e[0].type],a=o||b.relative[" "],s=o?1:0,u=be(function(e){return e===i},a,!0),l=be(function(e){return-1<P(i,e)},a,!0),c=[function(e,t,n){var r=!o&&(n||t!==w)||((i=t).nodeType?u(e,t,n):l(e,t,n));return i=null,r}];s<r;s++)if(t=b.relative[e[s].type])c=[be(we(c),t)];else{if((t=b.filter[e[s].type].apply(null,e[s].matches))[k]){for(n=++s;n<r;n++)if(b.relative[e[n].type])break;return Ce(1<s&&we(c),1<s&&xe(e.slice(0,s-1).concat({value:" "===e[s-2].type?"*":""})).replace(B,"$1"),t,s<n&&Ee(e.slice(s,n)),n<r&&Ee(e=e.slice(n)),n<r&&xe(e))}c.push(t)}return we(c)}return me.prototype=b.filters=b.pseudos,b.setFilters=new me,h=se.tokenize=function(e,t){var n,r,i,o,a,s,u,l=x[e+" "];if(l)return t?0:l.slice(0);a=e,s=[],u=b.preFilter;while(a){for(o in n&&!(r=_.exec(a))||(r&&(a=a.slice(r[0].length)||a),s.push(i=[])),n=!1,(r=z.exec(a))&&(n=r.shift(),i.push({value:n,type:r[0].replace(B," ")}),a=a.slice(n.length)),b.filter)!(r=G[o].exec(a))||u[o]&&!(r=u[o](r))||(n=r.shift(),i.push({value:n,type:o,matches:r}),a=a.slice(n.length));if(!n)break}return t?a.length:a?se.error(e):x(e,s).slice(0)},f=se.compile=function(e,t){var n,v,y,m,x,r,i=[],o=[],a=N[e+" "];if(!a){t||(t=h(e)),n=t.length;while(n--)(a=Ee(t[n]))[k]?i.push(a):o.push(a);(a=N(e,(v=o,m=0<(y=i).length,x=0<v.length,r=function(e,t,n,r,i){var o,a,s,u=0,l="0",c=e&&[],f=[],p=w,d=e||x&&b.find.TAG("*",i),h=S+=null==p?1:Math.random()||.1,g=d.length;for(i&&(w=t===C||t||i);l!==g&&null!=(o=d[l]);l++){if(x&&o){a=0,t||o.ownerDocument===C||(T(o),n=!E);while(s=v[a++])if(s(o,t||C,n)){r.push(o);break}i&&(S=h)}m&&((o=!s&&o)&&u--,e&&c.push(o))}if(u+=l,m&&l!==u){a=0;while(s=y[a++])s(c,f,t,n);if(e){if(0<u)while(l--)c[l]||f[l]||(f[l]=q.call(r));f=Te(f)}H.apply(r,f),i&&!e&&0<f.length&&1<u+y.length&&se.uniqueSort(r)}return i&&(S=h,w=p),c},m?le(r):r))).selector=e}return a},g=se.select=function(e,t,n,r){var i,o,a,s,u,l="function"==typeof e&&e,c=!r&&h(e=l.selector||e);if(n=n||[],1===c.length){if(2<(o=c[0]=c[0].slice(0)).length&&"ID"===(a=o[0]).type&&9===t.nodeType&&E&&b.relative[o[1].type]){if(!(t=(b.find.ID(a.matches[0].replace(te,ne),t)||[])[0]))return n;l&&(t=t.parentNode),e=e.slice(o.shift().value.length)}i=G.needsContext.test(e)?0:o.length;while(i--){if(a=o[i],b.relative[s=a.type])break;if((u=b.find[s])&&(r=u(a.matches[0].replace(te,ne),ee.test(o[0].type)&&ye(t.parentNode)||t))){if(o.splice(i,1),!(e=r.length&&xe(o)))return H.apply(n,r),n;break}}}return(l||f(e,c))(r,t,!E,n,!t||ee.test(e)&&ye(t.parentNode)||t),n},d.sortStable=k.split("").sort(D).join("")===k,d.detectDuplicates=!!l,T(),d.sortDetached=ce(function(e){return 1&e.compareDocumentPosition(C.createElement("fieldset"))}),ce(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||fe("type|href|height|width",function(e,t,n){if(!n)return e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),d.attributes&&ce(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||fe("value",function(e,t,n){if(!n&&"input"===e.nodeName.toLowerCase())return e.defaultValue}),ce(function(e){return null==e.getAttribute("disabled")})||fe(R,function(e,t,n){var r;if(!n)return!0===e[t]?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null}),se}(C);k.find=h,k.expr=h.selectors,k.expr[":"]=k.expr.pseudos,k.uniqueSort=k.unique=h.uniqueSort,k.text=h.getText,k.isXMLDoc=h.isXML,k.contains=h.contains,k.escapeSelector=h.escape;var T=function(e,t,n){var r=[],i=void 0!==n;while((e=e[t])&&9!==e.nodeType)if(1===e.nodeType){if(i&&k(e).is(n))break;r.push(e)}return r},S=function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n},N=k.expr.match.needsContext;function A(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()}var D=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;function j(e,n,r){return m(n)?k.grep(e,function(e,t){return!!n.call(e,t,e)!==r}):n.nodeType?k.grep(e,function(e){return e===n!==r}):"string"!=typeof n?k.grep(e,function(e){return-1<i.call(n,e)!==r}):k.filter(n,e,r)}k.filter=function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?k.find.matchesSelector(r,e)?[r]:[]:k.find.matches(e,k.grep(t,function(e){return 1===e.nodeType}))},k.fn.extend({find:function(e){var t,n,r=this.length,i=this;if("string"!=typeof e)return this.pushStack(k(e).filter(function(){for(t=0;t<r;t++)if(k.contains(i[t],this))return!0}));for(n=this.pushStack([]),t=0;t<r;t++)k.find(e,i[t],n);return 1<r?k.uniqueSort(n):n},filter:function(e){return this.pushStack(j(this,e||[],!1))},not:function(e){return this.pushStack(j(this,e||[],!0))},is:function(e){return!!j(this,"string"==typeof e&&N.test(e)?k(e):e||[],!1).length}});var q,L=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;(k.fn.init=function(e,t,n){var r,i;if(!e)return this;if(n=n||q,"string"==typeof e){if(!(r="<"===e[0]&&">"===e[e.length-1]&&3<=e.length?[null,e,null]:L.exec(e))||!r[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(r[1]){if(t=t instanceof k?t[0]:t,k.merge(this,k.parseHTML(r[1],t&&t.nodeType?t.ownerDocument||t:E,!0)),D.test(r[1])&&k.isPlainObject(t))for(r in t)m(this[r])?this[r](t[r]):this.attr(r,t[r]);return this}return(i=E.getElementById(r[2]))&&(this[0]=i,this.length=1),this}return e.nodeType?(this[0]=e,this.length=1,this):m(e)?void 0!==n.ready?n.ready(e):e(k):k.makeArray(e,this)}).prototype=k.fn,q=k(E);var H=/^(?:parents|prev(?:Until|All))/,O={children:!0,contents:!0,next:!0,prev:!0};function P(e,t){while((e=e[t])&&1!==e.nodeType);return e}k.fn.extend({has:function(e){var t=k(e,this),n=t.length;return this.filter(function(){for(var e=0;e<n;e++)if(k.contains(this,t[e]))return!0})},closest:function(e,t){var n,r=0,i=this.length,o=[],a="string"!=typeof e&&k(e);if(!N.test(e))for(;r<i;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(a?-1<a.index(n):1===n.nodeType&&k.find.matchesSelector(n,e))){o.push(n);break}return this.pushStack(1<o.length?k.uniqueSort(o):o)},index:function(e){return e?"string"==typeof e?i.call(k(e),this[0]):i.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(k.uniqueSort(k.merge(this.get(),k(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),k.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return T(e,"parentNode")},parentsUntil:function(e,t,n){return T(e,"parentNode",n)},next:function(e){return P(e,"nextSibling")},prev:function(e){return P(e,"previousSibling")},nextAll:function(e){return T(e,"nextSibling")},prevAll:function(e){return T(e,"previousSibling")},nextUntil:function(e,t,n){return T(e,"nextSibling",n)},prevUntil:function(e,t,n){return T(e,"previousSibling",n)},siblings:function(e){return S((e.parentNode||{}).firstChild,e)},children:function(e){return S(e.firstChild)},contents:function(e){return"undefined"!=typeof e.contentDocument?e.contentDocument:(A(e,"template")&&(e=e.content||e),k.merge([],e.childNodes))}},function(r,i){k.fn[r]=function(e,t){var n=k.map(this,i,e);return"Until"!==r.slice(-5)&&(t=e),t&&"string"==typeof t&&(n=k.filter(t,n)),1<this.length&&(O[r]||k.uniqueSort(n),H.test(r)&&n.reverse()),this.pushStack(n)}});var R=/[^\x20\t\r\n\f]+/g;function M(e){return e}function I(e){throw e}function W(e,t,n,r){var i;try{e&&m(i=e.promise)?i.call(e).done(t).fail(n):e&&m(i=e.then)?i.call(e,t,n):t.apply(void 0,[e].slice(r))}catch(e){n.apply(void 0,[e])}}k.Callbacks=function(r){var e,n;r="string"==typeof r?(e=r,n={},k.each(e.match(R)||[],function(e,t){n[t]=!0}),n):k.extend({},r);var i,t,o,a,s=[],u=[],l=-1,c=function(){for(a=a||r.once,o=i=!0;u.length;l=-1){t=u.shift();while(++l<s.length)!1===s[l].apply(t[0],t[1])&&r.stopOnFalse&&(l=s.length,t=!1)}r.memory||(t=!1),i=!1,a&&(s=t?[]:"")},f={add:function(){return s&&(t&&!i&&(l=s.length-1,u.push(t)),function n(e){k.each(e,function(e,t){m(t)?r.unique&&f.has(t)||s.push(t):t&&t.length&&"string"!==w(t)&&n(t)})}(arguments),t&&!i&&c()),this},remove:function(){return k.each(arguments,function(e,t){var n;while(-1<(n=k.inArray(t,s,n)))s.splice(n,1),n<=l&&l--}),this},has:function(e){return e?-1<k.inArray(e,s):0<s.length},empty:function(){return s&&(s=[]),this},disable:function(){return a=u=[],s=t="",this},disabled:function(){return!s},lock:function(){return a=u=[],t||i||(s=t=""),this},locked:function(){return!!a},fireWith:function(e,t){return a||(t=[e,(t=t||[]).slice?t.slice():t],u.push(t),i||c()),this},fire:function(){return f.fireWith(this,arguments),this},fired:function(){return!!o}};return f},k.extend({Deferred:function(e){var o=[["notify","progress",k.Callbacks("memory"),k.Callbacks("memory"),2],["resolve","done",k.Callbacks("once memory"),k.Callbacks("once memory"),0,"resolved"],["reject","fail",k.Callbacks("once memory"),k.Callbacks("once memory"),1,"rejected"]],i="pending",a={state:function(){return i},always:function(){return s.done(arguments).fail(arguments),this},"catch":function(e){return a.then(null,e)},pipe:function(){var i=arguments;return k.Deferred(function(r){k.each(o,function(e,t){var n=m(i[t[4]])&&i[t[4]];s[t[1]](function(){var e=n&&n.apply(this,arguments);e&&m(e.promise)?e.promise().progress(r.notify).done(r.resolve).fail(r.reject):r[t[0]+"With"](this,n?[e]:arguments)})}),i=null}).promise()},then:function(t,n,r){var u=0;function l(i,o,a,s){return function(){var n=this,r=arguments,e=function(){var e,t;if(!(i<u)){if((e=a.apply(n,r))===o.promise())throw new TypeError("Thenable self-resolution");t=e&&("object"==typeof e||"function"==typeof e)&&e.then,m(t)?s?t.call(e,l(u,o,M,s),l(u,o,I,s)):(u++,t.call(e,l(u,o,M,s),l(u,o,I,s),l(u,o,M,o.notifyWith))):(a!==M&&(n=void 0,r=[e]),(s||o.resolveWith)(n,r))}},t=s?e:function(){try{e()}catch(e){k.Deferred.exceptionHook&&k.Deferred.exceptionHook(e,t.stackTrace),u<=i+1&&(a!==I&&(n=void 0,r=[e]),o.rejectWith(n,r))}};i?t():(k.Deferred.getStackHook&&(t.stackTrace=k.Deferred.getStackHook()),C.setTimeout(t))}}return k.Deferred(function(e){o[0][3].add(l(0,e,m(r)?r:M,e.notifyWith)),o[1][3].add(l(0,e,m(t)?t:M)),o[2][3].add(l(0,e,m(n)?n:I))}).promise()},promise:function(e){return null!=e?k.extend(e,a):a}},s={};return k.each(o,function(e,t){var n=t[2],r=t[5];a[t[1]]=n.add,r&&n.add(function(){i=r},o[3-e][2].disable,o[3-e][3].disable,o[0][2].lock,o[0][3].lock),n.add(t[3].fire),s[t[0]]=function(){return s[t[0]+"With"](this===s?void 0:this,arguments),this},s[t[0]+"With"]=n.fireWith}),a.promise(s),e&&e.call(s,s),s},when:function(e){var n=arguments.length,t=n,r=Array(t),i=s.call(arguments),o=k.Deferred(),a=function(t){return function(e){r[t]=this,i[t]=1<arguments.length?s.call(arguments):e,--n||o.resolveWith(r,i)}};if(n<=1&&(W(e,o.done(a(t)).resolve,o.reject,!n),"pending"===o.state()||m(i[t]&&i[t].then)))return o.then();while(t--)W(i[t],a(t),o.reject);return o.promise()}});var $=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;k.Deferred.exceptionHook=function(e,t){C.console&&C.console.warn&&e&&$.test(e.name)&&C.console.warn("jQuery.Deferred exception: "+e.message,e.stack,t)},k.readyException=function(e){C.setTimeout(function(){throw e})};var F=k.Deferred();function B(){E.removeEventListener("DOMContentLoaded",B),C.removeEventListener("load",B),k.ready()}k.fn.ready=function(e){return F.then(e)["catch"](function(e){k.readyException(e)}),this},k.extend({isReady:!1,readyWait:1,ready:function(e){(!0===e?--k.readyWait:k.isReady)||(k.isReady=!0)!==e&&0<--k.readyWait||F.resolveWith(E,[k])}}),k.ready.then=F.then,"complete"===E.readyState||"loading"!==E.readyState&&!E.documentElement.doScroll?C.setTimeout(k.ready):(E.addEventListener("DOMContentLoaded",B),C.addEventListener("load",B));var _=function(e,t,n,r,i,o,a){var s=0,u=e.length,l=null==n;if("object"===w(n))for(s in i=!0,n)_(e,t,s,n[s],!0,o,a);else if(void 0!==r&&(i=!0,m(r)||(a=!0),l&&(a?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(k(e),n)})),t))for(;s<u;s++)t(e[s],n,a?r:r.call(e[s],s,t(e[s],n)));return i?e:l?t.call(e):u?t(e[0],n):o},z=/^-ms-/,U=/-([a-z])/g;function X(e,t){return t.toUpperCase()}function V(e){return e.replace(z,"ms-").replace(U,X)}var G=function(e){return 1===e.nodeType||9===e.nodeType||!+e.nodeType};function Y(){this.expando=k.expando+Y.uid++}Y.uid=1,Y.prototype={cache:function(e){var t=e[this.expando];return t||(t={},G(e)&&(e.nodeType?e[this.expando]=t:Object.defineProperty(e,this.expando,{value:t,configurable:!0}))),t},set:function(e,t,n){var r,i=this.cache(e);if("string"==typeof t)i[V(t)]=n;else for(r in t)i[V(r)]=t[r];return i},get:function(e,t){return void 0===t?this.cache(e):e[this.expando]&&e[this.expando][V(t)]},access:function(e,t,n){return void 0===t||t&&"string"==typeof t&&void 0===n?this.get(e,t):(this.set(e,t,n),void 0!==n?n:t)},remove:function(e,t){var n,r=e[this.expando];if(void 0!==r){if(void 0!==t){n=(t=Array.isArray(t)?t.map(V):(t=V(t))in r?[t]:t.match(R)||[]).length;while(n--)delete r[t[n]]}(void 0===t||k.isEmptyObject(r))&&(e.nodeType?e[this.expando]=void 0:delete e[this.expando])}},hasData:function(e){var t=e[this.expando];return void 0!==t&&!k.isEmptyObject(t)}};var Q=new Y,J=new Y,K=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,Z=/[A-Z]/g;function ee(e,t,n){var r,i;if(void 0===n&&1===e.nodeType)if(r="data-"+t.replace(Z,"-$&").toLowerCase(),"string"==typeof(n=e.getAttribute(r))){try{n="true"===(i=n)||"false"!==i&&("null"===i?null:i===+i+""?+i:K.test(i)?JSON.parse(i):i)}catch(e){}J.set(e,t,n)}else n=void 0;return n}k.extend({hasData:function(e){return J.hasData(e)||Q.hasData(e)},data:function(e,t,n){return J.access(e,t,n)},removeData:function(e,t){J.remove(e,t)},_data:function(e,t,n){return Q.access(e,t,n)},_removeData:function(e,t){Q.remove(e,t)}}),k.fn.extend({data:function(n,e){var t,r,i,o=this[0],a=o&&o.attributes;if(void 0===n){if(this.length&&(i=J.get(o),1===o.nodeType&&!Q.get(o,"hasDataAttrs"))){t=a.length;while(t--)a[t]&&0===(r=a[t].name).indexOf("data-")&&(r=V(r.slice(5)),ee(o,r,i[r]));Q.set(o,"hasDataAttrs",!0)}return i}return"object"==typeof n?this.each(function(){J.set(this,n)}):_(this,function(e){var t;if(o&&void 0===e)return void 0!==(t=J.get(o,n))?t:void 0!==(t=ee(o,n))?t:void 0;this.each(function(){J.set(this,n,e)})},null,e,1<arguments.length,null,!0)},removeData:function(e){return this.each(function(){J.remove(this,e)})}}),k.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=Q.get(e,t),n&&(!r||Array.isArray(n)?r=Q.access(e,t,k.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=k.queue(e,t),r=n.length,i=n.shift(),o=k._queueHooks(e,t);"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,function(){k.dequeue(e,t)},o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return Q.get(e,n)||Q.access(e,n,{empty:k.Callbacks("once memory").add(function(){Q.remove(e,[t+"queue",n])})})}}),k.fn.extend({queue:function(t,n){var e=2;return"string"!=typeof t&&(n=t,t="fx",e--),arguments.length<e?k.queue(this[0],t):void 0===n?this:this.each(function(){var e=k.queue(this,t,n);k._queueHooks(this,t),"fx"===t&&"inprogress"!==e[0]&&k.dequeue(this,t)})},dequeue:function(e){return this.each(function(){k.dequeue(this,e)})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=k.Deferred(),o=this,a=this.length,s=function(){--r||i.resolveWith(o,[o])};"string"!=typeof e&&(t=e,e=void 0),e=e||"fx";while(a--)(n=Q.get(o[a],e+"queueHooks"))&&n.empty&&(r++,n.empty.add(s));return s(),i.promise(t)}});var te=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,ne=new RegExp("^(?:([+-])=|)("+te+")([a-z%]*)$","i"),re=["Top","Right","Bottom","Left"],ie=E.documentElement,oe=function(e){return k.contains(e.ownerDocument,e)},ae={composed:!0};ie.getRootNode&&(oe=function(e){return k.contains(e.ownerDocument,e)||e.getRootNode(ae)===e.ownerDocument});var se=function(e,t){return"none"===(e=t||e).style.display||""===e.style.display&&oe(e)&&"none"===k.css(e,"display")},ue=function(e,t,n,r){var i,o,a={};for(o in t)a[o]=e.style[o],e.style[o]=t[o];for(o in i=n.apply(e,r||[]),t)e.style[o]=a[o];return i};function le(e,t,n,r){var i,o,a=20,s=r?function(){return r.cur()}:function(){return k.css(e,t,"")},u=s(),l=n&&n[3]||(k.cssNumber[t]?"":"px"),c=e.nodeType&&(k.cssNumber[t]||"px"!==l&&+u)&&ne.exec(k.css(e,t));if(c&&c[3]!==l){u/=2,l=l||c[3],c=+u||1;while(a--)k.style(e,t,c+l),(1-o)*(1-(o=s()/u||.5))<=0&&(a=0),c/=o;c*=2,k.style(e,t,c+l),n=n||[]}return n&&(c=+c||+u||0,i=n[1]?c+(n[1]+1)*n[2]:+n[2],r&&(r.unit=l,r.start=c,r.end=i)),i}var ce={};function fe(e,t){for(var n,r,i,o,a,s,u,l=[],c=0,f=e.length;c<f;c++)(r=e[c]).style&&(n=r.style.display,t?("none"===n&&(l[c]=Q.get(r,"display")||null,l[c]||(r.style.display="")),""===r.style.display&&se(r)&&(l[c]=(u=a=o=void 0,a=(i=r).ownerDocument,s=i.nodeName,(u=ce[s])||(o=a.body.appendChild(a.createElement(s)),u=k.css(o,"display"),o.parentNode.removeChild(o),"none"===u&&(u="block"),ce[s]=u)))):"none"!==n&&(l[c]="none",Q.set(r,"display",n)));for(c=0;c<f;c++)null!=l[c]&&(e[c].style.display=l[c]);return e}k.fn.extend({show:function(){return fe(this,!0)},hide:function(){return fe(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){se(this)?k(this).show():k(this).hide()})}});var pe=/^(?:checkbox|radio)$/i,de=/<([a-z][^\/\0>\x20\t\r\n\f]*)/i,he=/^$|^module$|\/(?:java|ecma)script/i,ge={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};function ve(e,t){var n;return n="undefined"!=typeof e.getElementsByTagName?e.getElementsByTagName(t||"*"):"undefined"!=typeof e.querySelectorAll?e.querySelectorAll(t||"*"):[],void 0===t||t&&A(e,t)?k.merge([e],n):n}function ye(e,t){for(var n=0,r=e.length;n<r;n++)Q.set(e[n],"globalEval",!t||Q.get(t[n],"globalEval"))}ge.optgroup=ge.option,ge.tbody=ge.tfoot=ge.colgroup=ge.caption=ge.thead,ge.th=ge.td;var me,xe,be=/<|&#?\w+;/;function we(e,t,n,r,i){for(var o,a,s,u,l,c,f=t.createDocumentFragment(),p=[],d=0,h=e.length;d<h;d++)if((o=e[d])||0===o)if("object"===w(o))k.merge(p,o.nodeType?[o]:o);else if(be.test(o)){a=a||f.appendChild(t.createElement("div")),s=(de.exec(o)||["",""])[1].toLowerCase(),u=ge[s]||ge._default,a.innerHTML=u[1]+k.htmlPrefilter(o)+u[2],c=u[0];while(c--)a=a.lastChild;k.merge(p,a.childNodes),(a=f.firstChild).textContent=""}else p.push(t.createTextNode(o));f.textContent="",d=0;while(o=p[d++])if(r&&-1<k.inArray(o,r))i&&i.push(o);else if(l=oe(o),a=ve(f.appendChild(o),"script"),l&&ye(a),n){c=0;while(o=a[c++])he.test(o.type||"")&&n.push(o)}return f}me=E.createDocumentFragment().appendChild(E.createElement("div")),(xe=E.createElement("input")).setAttribute("type","radio"),xe.setAttribute("checked","checked"),xe.setAttribute("name","t"),me.appendChild(xe),y.checkClone=me.cloneNode(!0).cloneNode(!0).lastChild.checked,me.innerHTML="<textarea>x</textarea>",y.noCloneChecked=!!me.cloneNode(!0).lastChild.defaultValue;var Te=/^key/,Ce=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,Ee=/^([^.]*)(?:\.(.+)|)/;function ke(){return!0}function Se(){return!1}function Ne(e,t){return e===function(){try{return E.activeElement}catch(e){}}()==("focus"===t)}function Ae(e,t,n,r,i,o){var a,s;if("object"==typeof t){for(s in"string"!=typeof n&&(r=r||n,n=void 0),t)Ae(e,s,n,r,t[s],o);return e}if(null==r&&null==i?(i=n,r=n=void 0):null==i&&("string"==typeof n?(i=r,r=void 0):(i=r,r=n,n=void 0)),!1===i)i=Se;else if(!i)return e;return 1===o&&(a=i,(i=function(e){return k().off(e),a.apply(this,arguments)}).guid=a.guid||(a.guid=k.guid++)),e.each(function(){k.event.add(this,t,i,r,n)})}function De(e,i,o){o?(Q.set(e,i,!1),k.event.add(e,i,{namespace:!1,handler:function(e){var t,n,r=Q.get(this,i);if(1&e.isTrigger&&this[i]){if(r.length)(k.event.special[i]||{}).delegateType&&e.stopPropagation();else if(r=s.call(arguments),Q.set(this,i,r),t=o(this,i),this[i](),r!==(n=Q.get(this,i))||t?Q.set(this,i,!1):n={},r!==n)return e.stopImmediatePropagation(),e.preventDefault(),n.value}else r.length&&(Q.set(this,i,{value:k.event.trigger(k.extend(r[0],k.Event.prototype),r.slice(1),this)}),e.stopImmediatePropagation())}})):void 0===Q.get(e,i)&&k.event.add(e,i,ke)}k.event={global:{},add:function(t,e,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,v=Q.get(t);if(v){n.handler&&(n=(o=n).handler,i=o.selector),i&&k.find.matchesSelector(ie,i),n.guid||(n.guid=k.guid++),(u=v.events)||(u=v.events={}),(a=v.handle)||(a=v.handle=function(e){return"undefined"!=typeof k&&k.event.triggered!==e.type?k.event.dispatch.apply(t,arguments):void 0}),l=(e=(e||"").match(R)||[""]).length;while(l--)d=g=(s=Ee.exec(e[l])||[])[1],h=(s[2]||"").split(".").sort(),d&&(f=k.event.special[d]||{},d=(i?f.delegateType:f.bindType)||d,f=k.event.special[d]||{},c=k.extend({type:d,origType:g,data:r,handler:n,guid:n.guid,selector:i,needsContext:i&&k.expr.match.needsContext.test(i),namespace:h.join(".")},o),(p=u[d])||((p=u[d]=[]).delegateCount=0,f.setup&&!1!==f.setup.call(t,r,h,a)||t.addEventListener&&t.addEventListener(d,a)),f.add&&(f.add.call(t,c),c.handler.guid||(c.handler.guid=n.guid)),i?p.splice(p.delegateCount++,0,c):p.push(c),k.event.global[d]=!0)}},remove:function(e,t,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,v=Q.hasData(e)&&Q.get(e);if(v&&(u=v.events)){l=(t=(t||"").match(R)||[""]).length;while(l--)if(d=g=(s=Ee.exec(t[l])||[])[1],h=(s[2]||"").split(".").sort(),d){f=k.event.special[d]||{},p=u[d=(r?f.delegateType:f.bindType)||d]||[],s=s[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),a=o=p.length;while(o--)c=p[o],!i&&g!==c.origType||n&&n.guid!==c.guid||s&&!s.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(p.splice(o,1),c.selector&&p.delegateCount--,f.remove&&f.remove.call(e,c));a&&!p.length&&(f.teardown&&!1!==f.teardown.call(e,h,v.handle)||k.removeEvent(e,d,v.handle),delete u[d])}else for(d in u)k.event.remove(e,d+t[l],n,r,!0);k.isEmptyObject(u)&&Q.remove(e,"handle events")}},dispatch:function(e){var t,n,r,i,o,a,s=k.event.fix(e),u=new Array(arguments.length),l=(Q.get(this,"events")||{})[s.type]||[],c=k.event.special[s.type]||{};for(u[0]=s,t=1;t<arguments.length;t++)u[t]=arguments[t];if(s.delegateTarget=this,!c.preDispatch||!1!==c.preDispatch.call(this,s)){a=k.event.handlers.call(this,s,l),t=0;while((i=a[t++])&&!s.isPropagationStopped()){s.currentTarget=i.elem,n=0;while((o=i.handlers[n++])&&!s.isImmediatePropagationStopped())s.rnamespace&&!1!==o.namespace&&!s.rnamespace.test(o.namespace)||(s.handleObj=o,s.data=o.data,void 0!==(r=((k.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,u))&&!1===(s.result=r)&&(s.preventDefault(),s.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,s),s.result}},handlers:function(e,t){var n,r,i,o,a,s=[],u=t.delegateCount,l=e.target;if(u&&l.nodeType&&!("click"===e.type&&1<=e.button))for(;l!==this;l=l.parentNode||this)if(1===l.nodeType&&("click"!==e.type||!0!==l.disabled)){for(o=[],a={},n=0;n<u;n++)void 0===a[i=(r=t[n]).selector+" "]&&(a[i]=r.needsContext?-1<k(i,this).index(l):k.find(i,this,null,[l]).length),a[i]&&o.push(r);o.length&&s.push({elem:l,handlers:o})}return l=this,u<t.length&&s.push({elem:l,handlers:t.slice(u)}),s},addProp:function(t,e){Object.defineProperty(k.Event.prototype,t,{enumerable:!0,configurable:!0,get:m(e)?function(){if(this.originalEvent)return e(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[t]},set:function(e){Object.defineProperty(this,t,{enumerable:!0,configurable:!0,writable:!0,value:e})}})},fix:function(e){return e[k.expando]?e:new k.Event(e)},special:{load:{noBubble:!0},click:{setup:function(e){var t=this||e;return pe.test(t.type)&&t.click&&A(t,"input")&&De(t,"click",ke),!1},trigger:function(e){var t=this||e;return pe.test(t.type)&&t.click&&A(t,"input")&&De(t,"click"),!0},_default:function(e){var t=e.target;return pe.test(t.type)&&t.click&&A(t,"input")&&Q.get(t,"click")||A(t,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}}},k.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n)},k.Event=function(e,t){if(!(this instanceof k.Event))return new k.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&!1===e.returnValue?ke:Se,this.target=e.target&&3===e.target.nodeType?e.target.parentNode:e.target,this.currentTarget=e.currentTarget,this.relatedTarget=e.relatedTarget):this.type=e,t&&k.extend(this,t),this.timeStamp=e&&e.timeStamp||Date.now(),this[k.expando]=!0},k.Event.prototype={constructor:k.Event,isDefaultPrevented:Se,isPropagationStopped:Se,isImmediatePropagationStopped:Se,isSimulated:!1,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=ke,e&&!this.isSimulated&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=ke,e&&!this.isSimulated&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=ke,e&&!this.isSimulated&&e.stopImmediatePropagation(),this.stopPropagation()}},k.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,"char":!0,code:!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function(e){var t=e.button;return null==e.which&&Te.test(e.type)?null!=e.charCode?e.charCode:e.keyCode:!e.which&&void 0!==t&&Ce.test(e.type)?1&t?1:2&t?3:4&t?2:0:e.which}},k.event.addProp),k.each({focus:"focusin",blur:"focusout"},function(e,t){k.event.special[e]={setup:function(){return De(this,e,Ne),!1},trigger:function(){return De(this,e),!0},delegateType:t}}),k.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(e,i){k.event.special[e]={delegateType:i,bindType:i,handle:function(e){var t,n=e.relatedTarget,r=e.handleObj;return n&&(n===this||k.contains(this,n))||(e.type=r.origType,t=r.handler.apply(this,arguments),e.type=i),t}}}),k.fn.extend({on:function(e,t,n,r){return Ae(this,e,t,n,r)},one:function(e,t,n,r){return Ae(this,e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,k(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return!1!==t&&"function"!=typeof t||(n=t,t=void 0),!1===n&&(n=Se),this.each(function(){k.event.remove(this,e,n,t)})}});var je=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,qe=/<script|<style|<link/i,Le=/checked\s*(?:[^=]|=\s*.checked.)/i,He=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function Oe(e,t){return A(e,"table")&&A(11!==t.nodeType?t:t.firstChild,"tr")&&k(e).children("tbody")[0]||e}function Pe(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function Re(e){return"true/"===(e.type||"").slice(0,5)?e.type=e.type.slice(5):e.removeAttribute("type"),e}function Me(e,t){var n,r,i,o,a,s,u,l;if(1===t.nodeType){if(Q.hasData(e)&&(o=Q.access(e),a=Q.set(t,o),l=o.events))for(i in delete a.handle,a.events={},l)for(n=0,r=l[i].length;n<r;n++)k.event.add(t,i,l[i][n]);J.hasData(e)&&(s=J.access(e),u=k.extend({},s),J.set(t,u))}}function Ie(n,r,i,o){r=g.apply([],r);var e,t,a,s,u,l,c=0,f=n.length,p=f-1,d=r[0],h=m(d);if(h||1<f&&"string"==typeof d&&!y.checkClone&&Le.test(d))return n.each(function(e){var t=n.eq(e);h&&(r[0]=d.call(this,e,t.html())),Ie(t,r,i,o)});if(f&&(t=(e=we(r,n[0].ownerDocument,!1,n,o)).firstChild,1===e.childNodes.length&&(e=t),t||o)){for(s=(a=k.map(ve(e,"script"),Pe)).length;c<f;c++)u=e,c!==p&&(u=k.clone(u,!0,!0),s&&k.merge(a,ve(u,"script"))),i.call(n[c],u,c);if(s)for(l=a[a.length-1].ownerDocument,k.map(a,Re),c=0;c<s;c++)u=a[c],he.test(u.type||"")&&!Q.access(u,"globalEval")&&k.contains(l,u)&&(u.src&&"module"!==(u.type||"").toLowerCase()?k._evalUrl&&!u.noModule&&k._evalUrl(u.src,{nonce:u.nonce||u.getAttribute("nonce")}):b(u.textContent.replace(He,""),u,l))}return n}function We(e,t,n){for(var r,i=t?k.filter(t,e):e,o=0;null!=(r=i[o]);o++)n||1!==r.nodeType||k.cleanData(ve(r)),r.parentNode&&(n&&oe(r)&&ye(ve(r,"script")),r.parentNode.removeChild(r));return e}k.extend({htmlPrefilter:function(e){return e.replace(je,"<$1></$2>")},clone:function(e,t,n){var r,i,o,a,s,u,l,c=e.cloneNode(!0),f=oe(e);if(!(y.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||k.isXMLDoc(e)))for(a=ve(c),r=0,i=(o=ve(e)).length;r<i;r++)s=o[r],u=a[r],void 0,"input"===(l=u.nodeName.toLowerCase())&&pe.test(s.type)?u.checked=s.checked:"input"!==l&&"textarea"!==l||(u.defaultValue=s.defaultValue);if(t)if(n)for(o=o||ve(e),a=a||ve(c),r=0,i=o.length;r<i;r++)Me(o[r],a[r]);else Me(e,c);return 0<(a=ve(c,"script")).length&&ye(a,!f&&ve(e,"script")),c},cleanData:function(e){for(var t,n,r,i=k.event.special,o=0;void 0!==(n=e[o]);o++)if(G(n)){if(t=n[Q.expando]){if(t.events)for(r in t.events)i[r]?k.event.remove(n,r):k.removeEvent(n,r,t.handle);n[Q.expando]=void 0}n[J.expando]&&(n[J.expando]=void 0)}}}),k.fn.extend({detach:function(e){return We(this,e,!0)},remove:function(e){return We(this,e)},text:function(e){return _(this,function(e){return void 0===e?k.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=e)})},null,e,arguments.length)},append:function(){return Ie(this,arguments,function(e){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||Oe(this,e).appendChild(e)})},prepend:function(){return Ie(this,arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=Oe(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return Ie(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return Ie(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(k.cleanData(ve(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null!=e&&e,t=null==t?e:t,this.map(function(){return k.clone(this,e,t)})},html:function(e){return _(this,function(e){var t=this[0]||{},n=0,r=this.length;if(void 0===e&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!qe.test(e)&&!ge[(de.exec(e)||["",""])[1].toLowerCase()]){e=k.htmlPrefilter(e);try{for(;n<r;n++)1===(t=this[n]||{}).nodeType&&(k.cleanData(ve(t,!1)),t.innerHTML=e);t=0}catch(e){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var n=[];return Ie(this,arguments,function(e){var t=this.parentNode;k.inArray(this,n)<0&&(k.cleanData(ve(this)),t&&t.replaceChild(e,this))},n)}}),k.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,a){k.fn[e]=function(e){for(var t,n=[],r=k(e),i=r.length-1,o=0;o<=i;o++)t=o===i?this:this.clone(!0),k(r[o])[a](t),u.apply(n,t.get());return this.pushStack(n)}});var $e=new RegExp("^("+te+")(?!px)[a-z%]+$","i"),Fe=function(e){var t=e.ownerDocument.defaultView;return t&&t.opener||(t=C),t.getComputedStyle(e)},Be=new RegExp(re.join("|"),"i");function _e(e,t,n){var r,i,o,a,s=e.style;return(n=n||Fe(e))&&(""!==(a=n.getPropertyValue(t)||n[t])||oe(e)||(a=k.style(e,t)),!y.pixelBoxStyles()&&$e.test(a)&&Be.test(t)&&(r=s.width,i=s.minWidth,o=s.maxWidth,s.minWidth=s.maxWidth=s.width=a,a=n.width,s.width=r,s.minWidth=i,s.maxWidth=o)),void 0!==a?a+"":a}function ze(e,t){return{get:function(){if(!e())return(this.get=t).apply(this,arguments);delete this.get}}}!function(){function e(){if(u){s.style.cssText="position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",u.style.cssText="position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",ie.appendChild(s).appendChild(u);var e=C.getComputedStyle(u);n="1%"!==e.top,a=12===t(e.marginLeft),u.style.right="60%",o=36===t(e.right),r=36===t(e.width),u.style.position="absolute",i=12===t(u.offsetWidth/3),ie.removeChild(s),u=null}}function t(e){return Math.round(parseFloat(e))}var n,r,i,o,a,s=E.createElement("div"),u=E.createElement("div");u.style&&(u.style.backgroundClip="content-box",u.cloneNode(!0).style.backgroundClip="",y.clearCloneStyle="content-box"===u.style.backgroundClip,k.extend(y,{boxSizingReliable:function(){return e(),r},pixelBoxStyles:function(){return e(),o},pixelPosition:function(){return e(),n},reliableMarginLeft:function(){return e(),a},scrollboxSize:function(){return e(),i}}))}();var Ue=["Webkit","Moz","ms"],Xe=E.createElement("div").style,Ve={};function Ge(e){var t=k.cssProps[e]||Ve[e];return t||(e in Xe?e:Ve[e]=function(e){var t=e[0].toUpperCase()+e.slice(1),n=Ue.length;while(n--)if((e=Ue[n]+t)in Xe)return e}(e)||e)}var Ye=/^(none|table(?!-c[ea]).+)/,Qe=/^--/,Je={position:"absolute",visibility:"hidden",display:"block"},Ke={letterSpacing:"0",fontWeight:"400"};function Ze(e,t,n){var r=ne.exec(t);return r?Math.max(0,r[2]-(n||0))+(r[3]||"px"):t}function et(e,t,n,r,i,o){var a="width"===t?1:0,s=0,u=0;if(n===(r?"border":"content"))return 0;for(;a<4;a+=2)"margin"===n&&(u+=k.css(e,n+re[a],!0,i)),r?("content"===n&&(u-=k.css(e,"padding"+re[a],!0,i)),"margin"!==n&&(u-=k.css(e,"border"+re[a]+"Width",!0,i))):(u+=k.css(e,"padding"+re[a],!0,i),"padding"!==n?u+=k.css(e,"border"+re[a]+"Width",!0,i):s+=k.css(e,"border"+re[a]+"Width",!0,i));return!r&&0<=o&&(u+=Math.max(0,Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-o-u-s-.5))||0),u}function tt(e,t,n){var r=Fe(e),i=(!y.boxSizingReliable()||n)&&"border-box"===k.css(e,"boxSizing",!1,r),o=i,a=_e(e,t,r),s="offset"+t[0].toUpperCase()+t.slice(1);if($e.test(a)){if(!n)return a;a="auto"}return(!y.boxSizingReliable()&&i||"auto"===a||!parseFloat(a)&&"inline"===k.css(e,"display",!1,r))&&e.getClientRects().length&&(i="border-box"===k.css(e,"boxSizing",!1,r),(o=s in e)&&(a=e[s])),(a=parseFloat(a)||0)+et(e,t,n||(i?"border":"content"),o,r,a)+"px"}function nt(e,t,n,r,i){return new nt.prototype.init(e,t,n,r,i)}k.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=_e(e,"opacity");return""===n?"1":n}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,gridArea:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnStart:!0,gridRow:!0,gridRowEnd:!0,gridRowStart:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,a,s=V(t),u=Qe.test(t),l=e.style;if(u||(t=Ge(s)),a=k.cssHooks[t]||k.cssHooks[s],void 0===n)return a&&"get"in a&&void 0!==(i=a.get(e,!1,r))?i:l[t];"string"===(o=typeof n)&&(i=ne.exec(n))&&i[1]&&(n=le(e,t,i),o="number"),null!=n&&n==n&&("number"!==o||u||(n+=i&&i[3]||(k.cssNumber[s]?"":"px")),y.clearCloneStyle||""!==n||0!==t.indexOf("background")||(l[t]="inherit"),a&&"set"in a&&void 0===(n=a.set(e,n,r))||(u?l.setProperty(t,n):l[t]=n))}},css:function(e,t,n,r){var i,o,a,s=V(t);return Qe.test(t)||(t=Ge(s)),(a=k.cssHooks[t]||k.cssHooks[s])&&"get"in a&&(i=a.get(e,!0,n)),void 0===i&&(i=_e(e,t,r)),"normal"===i&&t in Ke&&(i=Ke[t]),""===n||n?(o=parseFloat(i),!0===n||isFinite(o)?o||0:i):i}}),k.each(["height","width"],function(e,u){k.cssHooks[u]={get:function(e,t,n){if(t)return!Ye.test(k.css(e,"display"))||e.getClientRects().length&&e.getBoundingClientRect().width?tt(e,u,n):ue(e,Je,function(){return tt(e,u,n)})},set:function(e,t,n){var r,i=Fe(e),o=!y.scrollboxSize()&&"absolute"===i.position,a=(o||n)&&"border-box"===k.css(e,"boxSizing",!1,i),s=n?et(e,u,n,a,i):0;return a&&o&&(s-=Math.ceil(e["offset"+u[0].toUpperCase()+u.slice(1)]-parseFloat(i[u])-et(e,u,"border",!1,i)-.5)),s&&(r=ne.exec(t))&&"px"!==(r[3]||"px")&&(e.style[u]=t,t=k.css(e,u)),Ze(0,t,s)}}}),k.cssHooks.marginLeft=ze(y.reliableMarginLeft,function(e,t){if(t)return(parseFloat(_e(e,"marginLeft"))||e.getBoundingClientRect().left-ue(e,{marginLeft:0},function(){return e.getBoundingClientRect().left}))+"px"}),k.each({margin:"",padding:"",border:"Width"},function(i,o){k.cssHooks[i+o]={expand:function(e){for(var t=0,n={},r="string"==typeof e?e.split(" "):[e];t<4;t++)n[i+re[t]+o]=r[t]||r[t-2]||r[0];return n}},"margin"!==i&&(k.cssHooks[i+o].set=Ze)}),k.fn.extend({css:function(e,t){return _(this,function(e,t,n){var r,i,o={},a=0;if(Array.isArray(t)){for(r=Fe(e),i=t.length;a<i;a++)o[t[a]]=k.css(e,t[a],!1,r);return o}return void 0!==n?k.style(e,t,n):k.css(e,t)},e,t,1<arguments.length)}}),((k.Tween=nt).prototype={constructor:nt,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||k.easing._default,this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(k.cssNumber[n]?"":"px")},cur:function(){var e=nt.propHooks[this.prop];return e&&e.get?e.get(this):nt.propHooks._default.get(this)},run:function(e){var t,n=nt.propHooks[this.prop];return this.options.duration?this.pos=t=k.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):nt.propHooks._default.set(this),this}}).init.prototype=nt.prototype,(nt.propHooks={_default:{get:function(e){var t;return 1!==e.elem.nodeType||null!=e.elem[e.prop]&&null==e.elem.style[e.prop]?e.elem[e.prop]:(t=k.css(e.elem,e.prop,""))&&"auto"!==t?t:0},set:function(e){k.fx.step[e.prop]?k.fx.step[e.prop](e):1!==e.elem.nodeType||!k.cssHooks[e.prop]&&null==e.elem.style[Ge(e.prop)]?e.elem[e.prop]=e.now:k.style(e.elem,e.prop,e.now+e.unit)}}}).scrollTop=nt.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},k.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},_default:"swing"},k.fx=nt.prototype.init,k.fx.step={};var rt,it,ot,at,st=/^(?:toggle|show|hide)$/,ut=/queueHooks$/;function lt(){it&&(!1===E.hidden&&C.requestAnimationFrame?C.requestAnimationFrame(lt):C.setTimeout(lt,k.fx.interval),k.fx.tick())}function ct(){return C.setTimeout(function(){rt=void 0}),rt=Date.now()}function ft(e,t){var n,r=0,i={height:e};for(t=t?1:0;r<4;r+=2-t)i["margin"+(n=re[r])]=i["padding"+n]=e;return t&&(i.opacity=i.width=e),i}function pt(e,t,n){for(var r,i=(dt.tweeners[t]||[]).concat(dt.tweeners["*"]),o=0,a=i.length;o<a;o++)if(r=i[o].call(n,t,e))return r}function dt(o,e,t){var n,a,r=0,i=dt.prefilters.length,s=k.Deferred().always(function(){delete u.elem}),u=function(){if(a)return!1;for(var e=rt||ct(),t=Math.max(0,l.startTime+l.duration-e),n=1-(t/l.duration||0),r=0,i=l.tweens.length;r<i;r++)l.tweens[r].run(n);return s.notifyWith(o,[l,n,t]),n<1&&i?t:(i||s.notifyWith(o,[l,1,0]),s.resolveWith(o,[l]),!1)},l=s.promise({elem:o,props:k.extend({},e),opts:k.extend(!0,{specialEasing:{},easing:k.easing._default},t),originalProperties:e,originalOptions:t,startTime:rt||ct(),duration:t.duration,tweens:[],createTween:function(e,t){var n=k.Tween(o,l.opts,e,t,l.opts.specialEasing[e]||l.opts.easing);return l.tweens.push(n),n},stop:function(e){var t=0,n=e?l.tweens.length:0;if(a)return this;for(a=!0;t<n;t++)l.tweens[t].run(1);return e?(s.notifyWith(o,[l,1,0]),s.resolveWith(o,[l,e])):s.rejectWith(o,[l,e]),this}}),c=l.props;for(!function(e,t){var n,r,i,o,a;for(n in e)if(i=t[r=V(n)],o=e[n],Array.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),(a=k.cssHooks[r])&&"expand"in a)for(n in o=a.expand(o),delete e[r],o)n in e||(e[n]=o[n],t[n]=i);else t[r]=i}(c,l.opts.specialEasing);r<i;r++)if(n=dt.prefilters[r].call(l,o,c,l.opts))return m(n.stop)&&(k._queueHooks(l.elem,l.opts.queue).stop=n.stop.bind(n)),n;return k.map(c,pt,l),m(l.opts.start)&&l.opts.start.call(o,l),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always),k.fx.timer(k.extend(u,{elem:o,anim:l,queue:l.opts.queue})),l}k.Animation=k.extend(dt,{tweeners:{"*":[function(e,t){var n=this.createTween(e,t);return le(n.elem,e,ne.exec(t),n),n}]},tweener:function(e,t){m(e)?(t=e,e=["*"]):e=e.match(R);for(var n,r=0,i=e.length;r<i;r++)n=e[r],dt.tweeners[n]=dt.tweeners[n]||[],dt.tweeners[n].unshift(t)},prefilters:[function(e,t,n){var r,i,o,a,s,u,l,c,f="width"in t||"height"in t,p=this,d={},h=e.style,g=e.nodeType&&se(e),v=Q.get(e,"fxshow");for(r in n.queue||(null==(a=k._queueHooks(e,"fx")).unqueued&&(a.unqueued=0,s=a.empty.fire,a.empty.fire=function(){a.unqueued||s()}),a.unqueued++,p.always(function(){p.always(function(){a.unqueued--,k.queue(e,"fx").length||a.empty.fire()})})),t)if(i=t[r],st.test(i)){if(delete t[r],o=o||"toggle"===i,i===(g?"hide":"show")){if("show"!==i||!v||void 0===v[r])continue;g=!0}d[r]=v&&v[r]||k.style(e,r)}if((u=!k.isEmptyObject(t))||!k.isEmptyObject(d))for(r in f&&1===e.nodeType&&(n.overflow=[h.overflow,h.overflowX,h.overflowY],null==(l=v&&v.display)&&(l=Q.get(e,"display")),"none"===(c=k.css(e,"display"))&&(l?c=l:(fe([e],!0),l=e.style.display||l,c=k.css(e,"display"),fe([e]))),("inline"===c||"inline-block"===c&&null!=l)&&"none"===k.css(e,"float")&&(u||(p.done(function(){h.display=l}),null==l&&(c=h.display,l="none"===c?"":c)),h.display="inline-block")),n.overflow&&(h.overflow="hidden",p.always(function(){h.overflow=n.overflow[0],h.overflowX=n.overflow[1],h.overflowY=n.overflow[2]})),u=!1,d)u||(v?"hidden"in v&&(g=v.hidden):v=Q.access(e,"fxshow",{display:l}),o&&(v.hidden=!g),g&&fe([e],!0),p.done(function(){for(r in g||fe([e]),Q.remove(e,"fxshow"),d)k.style(e,r,d[r])})),u=pt(g?v[r]:0,r,p),r in v||(v[r]=u.start,g&&(u.end=u.start,u.start=0))}],prefilter:function(e,t){t?dt.prefilters.unshift(e):dt.prefilters.push(e)}}),k.speed=function(e,t,n){var r=e&&"object"==typeof e?k.extend({},e):{complete:n||!n&&t||m(e)&&e,duration:e,easing:n&&t||t&&!m(t)&&t};return k.fx.off?r.duration=0:"number"!=typeof r.duration&&(r.duration in k.fx.speeds?r.duration=k.fx.speeds[r.duration]:r.duration=k.fx.speeds._default),null!=r.queue&&!0!==r.queue||(r.queue="fx"),r.old=r.complete,r.complete=function(){m(r.old)&&r.old.call(this),r.queue&&k.dequeue(this,r.queue)},r},k.fn.extend({fadeTo:function(e,t,n,r){return this.filter(se).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(t,e,n,r){var i=k.isEmptyObject(t),o=k.speed(e,n,r),a=function(){var e=dt(this,k.extend({},t),o);(i||Q.get(this,"finish"))&&e.stop(!0)};return a.finish=a,i||!1===o.queue?this.each(a):this.queue(o.queue,a)},stop:function(i,e,o){var a=function(e){var t=e.stop;delete e.stop,t(o)};return"string"!=typeof i&&(o=e,e=i,i=void 0),e&&!1!==i&&this.queue(i||"fx",[]),this.each(function(){var e=!0,t=null!=i&&i+"queueHooks",n=k.timers,r=Q.get(this);if(t)r[t]&&r[t].stop&&a(r[t]);else for(t in r)r[t]&&r[t].stop&&ut.test(t)&&a(r[t]);for(t=n.length;t--;)n[t].elem!==this||null!=i&&n[t].queue!==i||(n[t].anim.stop(o),e=!1,n.splice(t,1));!e&&o||k.dequeue(this,i)})},finish:function(a){return!1!==a&&(a=a||"fx"),this.each(function(){var e,t=Q.get(this),n=t[a+"queue"],r=t[a+"queueHooks"],i=k.timers,o=n?n.length:0;for(t.finish=!0,k.queue(this,a,[]),r&&r.stop&&r.stop.call(this,!0),e=i.length;e--;)i[e].elem===this&&i[e].queue===a&&(i[e].anim.stop(!0),i.splice(e,1));for(e=0;e<o;e++)n[e]&&n[e].finish&&n[e].finish.call(this);delete t.finish})}}),k.each(["toggle","show","hide"],function(e,r){var i=k.fn[r];k.fn[r]=function(e,t,n){return null==e||"boolean"==typeof e?i.apply(this,arguments):this.animate(ft(r,!0),e,t,n)}}),k.each({slideDown:ft("show"),slideUp:ft("hide"),slideToggle:ft("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,r){k.fn[e]=function(e,t,n){return this.animate(r,e,t,n)}}),k.timers=[],k.fx.tick=function(){var e,t=0,n=k.timers;for(rt=Date.now();t<n.length;t++)(e=n[t])()||n[t]!==e||n.splice(t--,1);n.length||k.fx.stop(),rt=void 0},k.fx.timer=function(e){k.timers.push(e),k.fx.start()},k.fx.interval=13,k.fx.start=function(){it||(it=!0,lt())},k.fx.stop=function(){it=null},k.fx.speeds={slow:600,fast:200,_default:400},k.fn.delay=function(r,e){return r=k.fx&&k.fx.speeds[r]||r,e=e||"fx",this.queue(e,function(e,t){var n=C.setTimeout(e,r);t.stop=function(){C.clearTimeout(n)}})},ot=E.createElement("input"),at=E.createElement("select").appendChild(E.createElement("option")),ot.type="checkbox",y.checkOn=""!==ot.value,y.optSelected=at.selected,(ot=E.createElement("input")).value="t",ot.type="radio",y.radioValue="t"===ot.value;var ht,gt=k.expr.attrHandle;k.fn.extend({attr:function(e,t){return _(this,k.attr,e,t,1<arguments.length)},removeAttr:function(e){return this.each(function(){k.removeAttr(this,e)})}}),k.extend({attr:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return"undefined"==typeof e.getAttribute?k.prop(e,t,n):(1===o&&k.isXMLDoc(e)||(i=k.attrHooks[t.toLowerCase()]||(k.expr.match.bool.test(t)?ht:void 0)),void 0!==n?null===n?void k.removeAttr(e,t):i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:(e.setAttribute(t,n+""),n):i&&"get"in i&&null!==(r=i.get(e,t))?r:null==(r=k.find.attr(e,t))?void 0:r)},attrHooks:{type:{set:function(e,t){if(!y.radioValue&&"radio"===t&&A(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},removeAttr:function(e,t){var n,r=0,i=t&&t.match(R);if(i&&1===e.nodeType)while(n=i[r++])e.removeAttribute(n)}}),ht={set:function(e,t,n){return!1===t?k.removeAttr(e,n):e.setAttribute(n,n),n}},k.each(k.expr.match.bool.source.match(/\w+/g),function(e,t){var a=gt[t]||k.find.attr;gt[t]=function(e,t,n){var r,i,o=t.toLowerCase();return n||(i=gt[o],gt[o]=r,r=null!=a(e,t,n)?o:null,gt[o]=i),r}});var vt=/^(?:input|select|textarea|button)$/i,yt=/^(?:a|area)$/i;function mt(e){return(e.match(R)||[]).join(" ")}function xt(e){return e.getAttribute&&e.getAttribute("class")||""}function bt(e){return Array.isArray(e)?e:"string"==typeof e&&e.match(R)||[]}k.fn.extend({prop:function(e,t){return _(this,k.prop,e,t,1<arguments.length)},removeProp:function(e){return this.each(function(){delete this[k.propFix[e]||e]})}}),k.extend({prop:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return 1===o&&k.isXMLDoc(e)||(t=k.propFix[t]||t,i=k.propHooks[t]),void 0!==n?i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){var t=k.find.attr(e,"tabindex");return t?parseInt(t,10):vt.test(e.nodeName)||yt.test(e.nodeName)&&e.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),y.optSelected||(k.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null},set:function(e){var t=e.parentNode;t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex)}}),k.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){k.propFix[this.toLowerCase()]=this}),k.fn.extend({addClass:function(t){var e,n,r,i,o,a,s,u=0;if(m(t))return this.each(function(e){k(this).addClass(t.call(this,e,xt(this)))});if((e=bt(t)).length)while(n=this[u++])if(i=xt(n),r=1===n.nodeType&&" "+mt(i)+" "){a=0;while(o=e[a++])r.indexOf(" "+o+" ")<0&&(r+=o+" ");i!==(s=mt(r))&&n.setAttribute("class",s)}return this},removeClass:function(t){var e,n,r,i,o,a,s,u=0;if(m(t))return this.each(function(e){k(this).removeClass(t.call(this,e,xt(this)))});if(!arguments.length)return this.attr("class","");if((e=bt(t)).length)while(n=this[u++])if(i=xt(n),r=1===n.nodeType&&" "+mt(i)+" "){a=0;while(o=e[a++])while(-1<r.indexOf(" "+o+" "))r=r.replace(" "+o+" "," ");i!==(s=mt(r))&&n.setAttribute("class",s)}return this},toggleClass:function(i,t){var o=typeof i,a="string"===o||Array.isArray(i);return"boolean"==typeof t&&a?t?this.addClass(i):this.removeClass(i):m(i)?this.each(function(e){k(this).toggleClass(i.call(this,e,xt(this),t),t)}):this.each(function(){var e,t,n,r;if(a){t=0,n=k(this),r=bt(i);while(e=r[t++])n.hasClass(e)?n.removeClass(e):n.addClass(e)}else void 0!==i&&"boolean"!==o||((e=xt(this))&&Q.set(this,"__className__",e),this.setAttribute&&this.setAttribute("class",e||!1===i?"":Q.get(this,"__className__")||""))})},hasClass:function(e){var t,n,r=0;t=" "+e+" ";while(n=this[r++])if(1===n.nodeType&&-1<(" "+mt(xt(n))+" ").indexOf(t))return!0;return!1}});var wt=/\r/g;k.fn.extend({val:function(n){var r,e,i,t=this[0];return arguments.length?(i=m(n),this.each(function(e){var t;1===this.nodeType&&(null==(t=i?n.call(this,e,k(this).val()):n)?t="":"number"==typeof t?t+="":Array.isArray(t)&&(t=k.map(t,function(e){return null==e?"":e+""})),(r=k.valHooks[this.type]||k.valHooks[this.nodeName.toLowerCase()])&&"set"in r&&void 0!==r.set(this,t,"value")||(this.value=t))})):t?(r=k.valHooks[t.type]||k.valHooks[t.nodeName.toLowerCase()])&&"get"in r&&void 0!==(e=r.get(t,"value"))?e:"string"==typeof(e=t.value)?e.replace(wt,""):null==e?"":e:void 0}}),k.extend({valHooks:{option:{get:function(e){var t=k.find.attr(e,"value");return null!=t?t:mt(k.text(e))}},select:{get:function(e){var t,n,r,i=e.options,o=e.selectedIndex,a="select-one"===e.type,s=a?null:[],u=a?o+1:i.length;for(r=o<0?u:a?o:0;r<u;r++)if(((n=i[r]).selected||r===o)&&!n.disabled&&(!n.parentNode.disabled||!A(n.parentNode,"optgroup"))){if(t=k(n).val(),a)return t;s.push(t)}return s},set:function(e,t){var n,r,i=e.options,o=k.makeArray(t),a=i.length;while(a--)((r=i[a]).selected=-1<k.inArray(k.valHooks.option.get(r),o))&&(n=!0);return n||(e.selectedIndex=-1),o}}}}),k.each(["radio","checkbox"],function(){k.valHooks[this]={set:function(e,t){if(Array.isArray(t))return e.checked=-1<k.inArray(k(e).val(),t)}},y.checkOn||(k.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})}),y.focusin="onfocusin"in C;var Tt=/^(?:focusinfocus|focusoutblur)$/,Ct=function(e){e.stopPropagation()};k.extend(k.event,{trigger:function(e,t,n,r){var i,o,a,s,u,l,c,f,p=[n||E],d=v.call(e,"type")?e.type:e,h=v.call(e,"namespace")?e.namespace.split("."):[];if(o=f=a=n=n||E,3!==n.nodeType&&8!==n.nodeType&&!Tt.test(d+k.event.triggered)&&(-1<d.indexOf(".")&&(d=(h=d.split(".")).shift(),h.sort()),u=d.indexOf(":")<0&&"on"+d,(e=e[k.expando]?e:new k.Event(d,"object"==typeof e&&e)).isTrigger=r?2:3,e.namespace=h.join("."),e.rnamespace=e.namespace?new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,e.result=void 0,e.target||(e.target=n),t=null==t?[e]:k.makeArray(t,[e]),c=k.event.special[d]||{},r||!c.trigger||!1!==c.trigger.apply(n,t))){if(!r&&!c.noBubble&&!x(n)){for(s=c.delegateType||d,Tt.test(s+d)||(o=o.parentNode);o;o=o.parentNode)p.push(o),a=o;a===(n.ownerDocument||E)&&p.push(a.defaultView||a.parentWindow||C)}i=0;while((o=p[i++])&&!e.isPropagationStopped())f=o,e.type=1<i?s:c.bindType||d,(l=(Q.get(o,"events")||{})[e.type]&&Q.get(o,"handle"))&&l.apply(o,t),(l=u&&o[u])&&l.apply&&G(o)&&(e.result=l.apply(o,t),!1===e.result&&e.preventDefault());return e.type=d,r||e.isDefaultPrevented()||c._default&&!1!==c._default.apply(p.pop(),t)||!G(n)||u&&m(n[d])&&!x(n)&&((a=n[u])&&(n[u]=null),k.event.triggered=d,e.isPropagationStopped()&&f.addEventListener(d,Ct),n[d](),e.isPropagationStopped()&&f.removeEventListener(d,Ct),k.event.triggered=void 0,a&&(n[u]=a)),e.result}},simulate:function(e,t,n){var r=k.extend(new k.Event,n,{type:e,isSimulated:!0});k.event.trigger(r,null,t)}}),k.fn.extend({trigger:function(e,t){return this.each(function(){k.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];if(n)return k.event.trigger(e,t,n,!0)}}),y.focusin||k.each({focus:"focusin",blur:"focusout"},function(n,r){var i=function(e){k.event.simulate(r,e.target,k.event.fix(e))};k.event.special[r]={setup:function(){var e=this.ownerDocument||this,t=Q.access(e,r);t||e.addEventListener(n,i,!0),Q.access(e,r,(t||0)+1)},teardown:function(){var e=this.ownerDocument||this,t=Q.access(e,r)-1;t?Q.access(e,r,t):(e.removeEventListener(n,i,!0),Q.remove(e,r))}}});var Et=C.location,kt=Date.now(),St=/\?/;k.parseXML=function(e){var t;if(!e||"string"!=typeof e)return null;try{t=(new C.DOMParser).parseFromString(e,"text/xml")}catch(e){t=void 0}return t&&!t.getElementsByTagName("parsererror").length||k.error("Invalid XML: "+e),t};var Nt=/\[\]$/,At=/\r?\n/g,Dt=/^(?:submit|button|image|reset|file)$/i,jt=/^(?:input|select|textarea|keygen)/i;function qt(n,e,r,i){var t;if(Array.isArray(e))k.each(e,function(e,t){r||Nt.test(n)?i(n,t):qt(n+"["+("object"==typeof t&&null!=t?e:"")+"]",t,r,i)});else if(r||"object"!==w(e))i(n,e);else for(t in e)qt(n+"["+t+"]",e[t],r,i)}k.param=function(e,t){var n,r=[],i=function(e,t){var n=m(t)?t():t;r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(null==n?"":n)};if(null==e)return"";if(Array.isArray(e)||e.jquery&&!k.isPlainObject(e))k.each(e,function(){i(this.name,this.value)});else for(n in e)qt(n,e[n],t,i);return r.join("&")},k.fn.extend({serialize:function(){return k.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=k.prop(this,"elements");return e?k.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!k(this).is(":disabled")&&jt.test(this.nodeName)&&!Dt.test(e)&&(this.checked||!pe.test(e))}).map(function(e,t){var n=k(this).val();return null==n?null:Array.isArray(n)?k.map(n,function(e){return{name:t.name,value:e.replace(At,"\r\n")}}):{name:t.name,value:n.replace(At,"\r\n")}}).get()}});var Lt=/%20/g,Ht=/#.*$/,Ot=/([?&])_=[^&]*/,Pt=/^(.*?):[ \t]*([^\r\n]*)$/gm,Rt=/^(?:GET|HEAD)$/,Mt=/^\/\//,It={},Wt={},$t="*/".concat("*"),Ft=E.createElement("a");function Bt(o){return function(e,t){"string"!=typeof e&&(t=e,e="*");var n,r=0,i=e.toLowerCase().match(R)||[];if(m(t))while(n=i[r++])"+"===n[0]?(n=n.slice(1)||"*",(o[n]=o[n]||[]).unshift(t)):(o[n]=o[n]||[]).push(t)}}function _t(t,i,o,a){var s={},u=t===Wt;function l(e){var r;return s[e]=!0,k.each(t[e]||[],function(e,t){var n=t(i,o,a);return"string"!=typeof n||u||s[n]?u?!(r=n):void 0:(i.dataTypes.unshift(n),l(n),!1)}),r}return l(i.dataTypes[0])||!s["*"]&&l("*")}function zt(e,t){var n,r,i=k.ajaxSettings.flatOptions||{};for(n in t)void 0!==t[n]&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&k.extend(!0,e,r),e}Ft.href=Et.href,k.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Et.href,type:"GET",isLocal:/^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Et.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":$t,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":k.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?zt(zt(e,k.ajaxSettings),t):zt(k.ajaxSettings,e)},ajaxPrefilter:Bt(It),ajaxTransport:Bt(Wt),ajax:function(e,t){"object"==typeof e&&(t=e,e=void 0),t=t||{};var c,f,p,n,d,r,h,g,i,o,v=k.ajaxSetup({},t),y=v.context||v,m=v.context&&(y.nodeType||y.jquery)?k(y):k.event,x=k.Deferred(),b=k.Callbacks("once memory"),w=v.statusCode||{},a={},s={},u="canceled",T={readyState:0,getResponseHeader:function(e){var t;if(h){if(!n){n={};while(t=Pt.exec(p))n[t[1].toLowerCase()+" "]=(n[t[1].toLowerCase()+" "]||[]).concat(t[2])}t=n[e.toLowerCase()+" "]}return null==t?null:t.join(", ")},getAllResponseHeaders:function(){return h?p:null},setRequestHeader:function(e,t){return null==h&&(e=s[e.toLowerCase()]=s[e.toLowerCase()]||e,a[e]=t),this},overrideMimeType:function(e){return null==h&&(v.mimeType=e),this},statusCode:function(e){var t;if(e)if(h)T.always(e[T.status]);else for(t in e)w[t]=[w[t],e[t]];return this},abort:function(e){var t=e||u;return c&&c.abort(t),l(0,t),this}};if(x.promise(T),v.url=((e||v.url||Et.href)+"").replace(Mt,Et.protocol+"//"),v.type=t.method||t.type||v.method||v.type,v.dataTypes=(v.dataType||"*").toLowerCase().match(R)||[""],null==v.crossDomain){r=E.createElement("a");try{r.href=v.url,r.href=r.href,v.crossDomain=Ft.protocol+"//"+Ft.host!=r.protocol+"//"+r.host}catch(e){v.crossDomain=!0}}if(v.data&&v.processData&&"string"!=typeof v.data&&(v.data=k.param(v.data,v.traditional)),_t(It,v,t,T),h)return T;for(i in(g=k.event&&v.global)&&0==k.active++&&k.event.trigger("ajaxStart"),v.type=v.type.toUpperCase(),v.hasContent=!Rt.test(v.type),f=v.url.replace(Ht,""),v.hasContent?v.data&&v.processData&&0===(v.contentType||"").indexOf("application/x-www-form-urlencoded")&&(v.data=v.data.replace(Lt,"+")):(o=v.url.slice(f.length),v.data&&(v.processData||"string"==typeof v.data)&&(f+=(St.test(f)?"&":"?")+v.data,delete v.data),!1===v.cache&&(f=f.replace(Ot,"$1"),o=(St.test(f)?"&":"?")+"_="+kt+++o),v.url=f+o),v.ifModified&&(k.lastModified[f]&&T.setRequestHeader("If-Modified-Since",k.lastModified[f]),k.etag[f]&&T.setRequestHeader("If-None-Match",k.etag[f])),(v.data&&v.hasContent&&!1!==v.contentType||t.contentType)&&T.setRequestHeader("Content-Type",v.contentType),T.setRequestHeader("Accept",v.dataTypes[0]&&v.accepts[v.dataTypes[0]]?v.accepts[v.dataTypes[0]]+("*"!==v.dataTypes[0]?", "+$t+"; q=0.01":""):v.accepts["*"]),v.headers)T.setRequestHeader(i,v.headers[i]);if(v.beforeSend&&(!1===v.beforeSend.call(y,T,v)||h))return T.abort();if(u="abort",b.add(v.complete),T.done(v.success),T.fail(v.error),c=_t(Wt,v,t,T)){if(T.readyState=1,g&&m.trigger("ajaxSend",[T,v]),h)return T;v.async&&0<v.timeout&&(d=C.setTimeout(function(){T.abort("timeout")},v.timeout));try{h=!1,c.send(a,l)}catch(e){if(h)throw e;l(-1,e)}}else l(-1,"No Transport");function l(e,t,n,r){var i,o,a,s,u,l=t;h||(h=!0,d&&C.clearTimeout(d),c=void 0,p=r||"",T.readyState=0<e?4:0,i=200<=e&&e<300||304===e,n&&(s=function(e,t,n){var r,i,o,a,s=e.contents,u=e.dataTypes;while("*"===u[0])u.shift(),void 0===r&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in s)if(s[i]&&s[i].test(r)){u.unshift(i);break}if(u[0]in n)o=u[0];else{for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i;break}a||(a=i)}o=o||a}if(o)return o!==u[0]&&u.unshift(o),n[o]}(v,T,n)),s=function(e,t,n,r){var i,o,a,s,u,l={},c=e.dataTypes.slice();if(c[1])for(a in e.converters)l[a.toLowerCase()]=e.converters[a];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())if("*"===o)o=u;else if("*"!==u&&u!==o){if(!(a=l[u+" "+o]||l["* "+o]))for(i in l)if((s=i.split(" "))[1]===o&&(a=l[u+" "+s[0]]||l["* "+s[0]])){!0===a?a=l[i]:!0!==l[i]&&(o=s[0],c.unshift(s[1]));break}if(!0!==a)if(a&&e["throws"])t=a(t);else try{t=a(t)}catch(e){return{state:"parsererror",error:a?e:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}(v,s,T,i),i?(v.ifModified&&((u=T.getResponseHeader("Last-Modified"))&&(k.lastModified[f]=u),(u=T.getResponseHeader("etag"))&&(k.etag[f]=u)),204===e||"HEAD"===v.type?l="nocontent":304===e?l="notmodified":(l=s.state,o=s.data,i=!(a=s.error))):(a=l,!e&&l||(l="error",e<0&&(e=0))),T.status=e,T.statusText=(t||l)+"",i?x.resolveWith(y,[o,l,T]):x.rejectWith(y,[T,l,a]),T.statusCode(w),w=void 0,g&&m.trigger(i?"ajaxSuccess":"ajaxError",[T,v,i?o:a]),b.fireWith(y,[T,l]),g&&(m.trigger("ajaxComplete",[T,v]),--k.active||k.event.trigger("ajaxStop")))}return T},getJSON:function(e,t,n){return k.get(e,t,n,"json")},getScript:function(e,t){return k.get(e,void 0,t,"script")}}),k.each(["get","post"],function(e,i){k[i]=function(e,t,n,r){return m(t)&&(r=r||n,n=t,t=void 0),k.ajax(k.extend({url:e,type:i,dataType:r,data:t,success:n},k.isPlainObject(e)&&e))}}),k._evalUrl=function(e,t){return k.ajax({url:e,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,converters:{"text script":function(){}},dataFilter:function(e){k.globalEval(e,t)}})},k.fn.extend({wrapAll:function(e){var t;return this[0]&&(m(e)&&(e=e.call(this[0])),t=k(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstElementChild)e=e.firstElementChild;return e}).append(this)),this},wrapInner:function(n){return m(n)?this.each(function(e){k(this).wrapInner(n.call(this,e))}):this.each(function(){var e=k(this),t=e.contents();t.length?t.wrapAll(n):e.append(n)})},wrap:function(t){var n=m(t);return this.each(function(e){k(this).wrapAll(n?t.call(this,e):t)})},unwrap:function(e){return this.parent(e).not("body").each(function(){k(this).replaceWith(this.childNodes)}),this}}),k.expr.pseudos.hidden=function(e){return!k.expr.pseudos.visible(e)},k.expr.pseudos.visible=function(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)},k.ajaxSettings.xhr=function(){try{return new C.XMLHttpRequest}catch(e){}};var Ut={0:200,1223:204},Xt=k.ajaxSettings.xhr();y.cors=!!Xt&&"withCredentials"in Xt,y.ajax=Xt=!!Xt,k.ajaxTransport(function(i){var o,a;if(y.cors||Xt&&!i.crossDomain)return{send:function(e,t){var n,r=i.xhr();if(r.open(i.type,i.url,i.async,i.username,i.password),i.xhrFields)for(n in i.xhrFields)r[n]=i.xhrFields[n];for(n in i.mimeType&&r.overrideMimeType&&r.overrideMimeType(i.mimeType),i.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest"),e)r.setRequestHeader(n,e[n]);o=function(e){return function(){o&&(o=a=r.onload=r.onerror=r.onabort=r.ontimeout=r.onreadystatechange=null,"abort"===e?r.abort():"error"===e?"number"!=typeof r.status?t(0,"error"):t(r.status,r.statusText):t(Ut[r.status]||r.status,r.statusText,"text"!==(r.responseType||"text")||"string"!=typeof r.responseText?{binary:r.response}:{text:r.responseText},r.getAllResponseHeaders()))}},r.onload=o(),a=r.onerror=r.ontimeout=o("error"),void 0!==r.onabort?r.onabort=a:r.onreadystatechange=function(){4===r.readyState&&C.setTimeout(function(){o&&a()})},o=o("abort");try{r.send(i.hasContent&&i.data||null)}catch(e){if(o)throw e}},abort:function(){o&&o()}}}),k.ajaxPrefilter(function(e){e.crossDomain&&(e.contents.script=!1)}),k.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(e){return k.globalEval(e),e}}}),k.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),k.ajaxTransport("script",function(n){var r,i;if(n.crossDomain||n.scriptAttrs)return{send:function(e,t){r=k("<script>").attr(n.scriptAttrs||{}).prop({charset:n.scriptCharset,src:n.url}).on("load error",i=function(e){r.remove(),i=null,e&&t("error"===e.type?404:200,e.type)}),E.head.appendChild(r[0])},abort:function(){i&&i()}}});var Vt,Gt=[],Yt=/(=)\?(?=&|$)|\?\?/;k.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Gt.pop()||k.expando+"_"+kt++;return this[e]=!0,e}}),k.ajaxPrefilter("json jsonp",function(e,t,n){var r,i,o,a=!1!==e.jsonp&&(Yt.test(e.url)?"url":"string"==typeof e.data&&0===(e.contentType||"").indexOf("application/x-www-form-urlencoded")&&Yt.test(e.data)&&"data");if(a||"jsonp"===e.dataTypes[0])return r=e.jsonpCallback=m(e.jsonpCallback)?e.jsonpCallback():e.jsonpCallback,a?e[a]=e[a].replace(Yt,"$1"+r):!1!==e.jsonp&&(e.url+=(St.test(e.url)?"&":"?")+e.jsonp+"="+r),e.converters["script json"]=function(){return o||k.error(r+" was not called"),o[0]},e.dataTypes[0]="json",i=C[r],C[r]=function(){o=arguments},n.always(function(){void 0===i?k(C).removeProp(r):C[r]=i,e[r]&&(e.jsonpCallback=t.jsonpCallback,Gt.push(r)),o&&m(i)&&i(o[0]),o=i=void 0}),"script"}),y.createHTMLDocument=((Vt=E.implementation.createHTMLDocument("").body).innerHTML="<form></form><form></form>",2===Vt.childNodes.length),k.parseHTML=function(e,t,n){return"string"!=typeof e?[]:("boolean"==typeof t&&(n=t,t=!1),t||(y.createHTMLDocument?((r=(t=E.implementation.createHTMLDocument("")).createElement("base")).href=E.location.href,t.head.appendChild(r)):t=E),o=!n&&[],(i=D.exec(e))?[t.createElement(i[1])]:(i=we([e],t,o),o&&o.length&&k(o).remove(),k.merge([],i.childNodes)));var r,i,o},k.fn.load=function(e,t,n){var r,i,o,a=this,s=e.indexOf(" ");return-1<s&&(r=mt(e.slice(s)),e=e.slice(0,s)),m(t)?(n=t,t=void 0):t&&"object"==typeof t&&(i="POST"),0<a.length&&k.ajax({url:e,type:i||"GET",dataType:"html",data:t}).done(function(e){o=arguments,a.html(r?k("<div>").append(k.parseHTML(e)).find(r):e)}).always(n&&function(e,t){a.each(function(){n.apply(this,o||[e.responseText,t,e])})}),this},k.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){k.fn[t]=function(e){return this.on(t,e)}}),k.expr.pseudos.animated=function(t){return k.grep(k.timers,function(e){return t===e.elem}).length},k.offset={setOffset:function(e,t,n){var r,i,o,a,s,u,l=k.css(e,"position"),c=k(e),f={};"static"===l&&(e.style.position="relative"),s=c.offset(),o=k.css(e,"top"),u=k.css(e,"left"),("absolute"===l||"fixed"===l)&&-1<(o+u).indexOf("auto")?(a=(r=c.position()).top,i=r.left):(a=parseFloat(o)||0,i=parseFloat(u)||0),m(t)&&(t=t.call(e,n,k.extend({},s))),null!=t.top&&(f.top=t.top-s.top+a),null!=t.left&&(f.left=t.left-s.left+i),"using"in t?t.using.call(e,f):c.css(f)}},k.fn.extend({offset:function(t){if(arguments.length)return void 0===t?this:this.each(function(e){k.offset.setOffset(this,t,e)});var e,n,r=this[0];return r?r.getClientRects().length?(e=r.getBoundingClientRect(),n=r.ownerDocument.defaultView,{top:e.top+n.pageYOffset,left:e.left+n.pageXOffset}):{top:0,left:0}:void 0},position:function(){if(this[0]){var e,t,n,r=this[0],i={top:0,left:0};if("fixed"===k.css(r,"position"))t=r.getBoundingClientRect();else{t=this.offset(),n=r.ownerDocument,e=r.offsetParent||n.documentElement;while(e&&(e===n.body||e===n.documentElement)&&"static"===k.css(e,"position"))e=e.parentNode;e&&e!==r&&1===e.nodeType&&((i=k(e).offset()).top+=k.css(e,"borderTopWidth",!0),i.left+=k.css(e,"borderLeftWidth",!0))}return{top:t.top-i.top-k.css(r,"marginTop",!0),left:t.left-i.left-k.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent;while(e&&"static"===k.css(e,"position"))e=e.offsetParent;return e||ie})}}),k.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,i){var o="pageYOffset"===i;k.fn[t]=function(e){return _(this,function(e,t,n){var r;if(x(e)?r=e:9===e.nodeType&&(r=e.defaultView),void 0===n)return r?r[i]:e[t];r?r.scrollTo(o?r.pageXOffset:n,o?n:r.pageYOffset):e[t]=n},t,e,arguments.length)}}),k.each(["top","left"],function(e,n){k.cssHooks[n]=ze(y.pixelPosition,function(e,t){if(t)return t=_e(e,n),$e.test(t)?k(e).position()[n]+"px":t})}),k.each({Height:"height",Width:"width"},function(a,s){k.each({padding:"inner"+a,content:s,"":"outer"+a},function(r,o){k.fn[o]=function(e,t){var n=arguments.length&&(r||"boolean"!=typeof e),i=r||(!0===e||!0===t?"margin":"border");return _(this,function(e,t,n){var r;return x(e)?0===o.indexOf("outer")?e["inner"+a]:e.document.documentElement["client"+a]:9===e.nodeType?(r=e.documentElement,Math.max(e.body["scroll"+a],r["scroll"+a],e.body["offset"+a],r["offset"+a],r["client"+a])):void 0===n?k.css(e,t,i):k.style(e,t,n,i)},s,n?e:void 0,n)}})}),k.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(e,n){k.fn[n]=function(e,t){return 0<arguments.length?this.on(n,null,e,t):this.trigger(n)}}),k.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),k.fn.extend({bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}}),k.proxy=function(e,t){var n,r,i;if("string"==typeof t&&(n=e[t],t=e,e=n),m(e))return r=s.call(arguments,2),(i=function(){return e.apply(t||this,r.concat(s.call(arguments)))}).guid=e.guid=e.guid||k.guid++,i},k.holdReady=function(e){e?k.readyWait++:k.ready(!0)},k.isArray=Array.isArray,k.parseJSON=JSON.parse,k.nodeName=A,k.isFunction=m,k.isWindow=x,k.camelCase=V,k.type=w,k.now=Date.now,k.isNumeric=function(e){var t=k.type(e);return("number"===t||"string"===t)&&!isNaN(e-parseFloat(e))},"function"==typeof define&&define.amd&&define("jquery",[],function(){return k});var Qt=C.jQuery,Jt=C.$;return k.noConflict=function(e){return C.$===k&&(C.$=Jt),e&&C.jQuery===k&&(C.jQuery=Qt),k},e||(C.jQuery=C.$=k),k});
jQuery.noConflict();
/*! art-template@4.13.2 for browser | https://github.com/aui/art-template */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.template=t():e.template=t()}("undefined"!=typeof self?self:this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=4)}([function(e,t,n){"use strict";var r=n(6),i=n(2),o=n(22),s=function(e,t){t.onerror(e,t);var n=function(){return"{Template Error}"};return n.mappings=[],n.sourcesContent=[],n},a=function u(e){var t=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};"string"!=typeof e?t=e:t.source=e,t=i.$extend(t),e=t.source,!0===t.debug&&(t.cache=!1,t.minimize=!1,t.compileDebug=!0),t.compileDebug&&(t.minimize=!1),t.filename&&(t.filename=t.resolveFilename(t.filename,t));var n=t.filename,a=t.cache,c=t.caches;if(a&&n){var l=c.get(n);if(l)return l}if(!e)try{e=t.loader(n,t),t.source=e}catch(m){var f=new o({name:"CompileError",path:n,message:"template not found: "+m.message,stack:m.stack});if(t.bail)throw f;return s(f,t)}var p=void 0,h=new r(t);try{p=h.build()}catch(f){if(f=new o(f),t.bail)throw f;return s(f,t)}var d=function(e,n){try{return p(e,n)}catch(f){if(!t.compileDebug)return t.cache=!1,t.compileDebug=!0,u(t)(e,n);if(f=new o(f),t.bail)throw f;return s(f,t)()}};return d.mappings=p.mappings,d.sourcesContent=p.sourcesContent,d.toString=function(){return p.toString()},a&&n&&c.set(n,d),d};a.Compiler=r,e.exports=a},function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=/((['"])(?:(?!\2|\\).|\\(?:\r\n|[\s\S]))*(\2)?|`(?:[^`\\$]|\\[\s\S]|\$(?!\{)|\$\{(?:[^{}]|\{[^}]*\}?)*\}?)*(`)?)|(\/\/.*)|(\/\*(?:[^*]|\*(?!\/))*(\*\/)?)|(\/(?!\*)(?:\[(?:(?![\]\\]).|\\.)*\]|(?![\/\]\\]).|\\.)+\/(?:(?!\s*(?:\b|[\u0080-\uFFFF$\\'"~({]|[+\-!](?!=)|\.?\d))|[gmiyu]{1,5}\b(?![\u0080-\uFFFF$\\]|\s*(?:[+\-*%&|^<>!=?({]|\/(?![\/*])))))|(0[xX][\da-fA-F]+|0[oO][0-7]+|0[bB][01]+|(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?)|((?!\d)(?:(?!\s)[$\w\u0080-\uFFFF]|\\u[\da-fA-F]{4}|\\u\{[\da-fA-F]+\})+)|(--|\+\+|&&|\|\||=>|\.{3}|(?:[+\-\/%&|^]|\*{1,2}|<{1,2}|>{1,3}|!=?|={1,2})=?|[?~.,:;[\](){}])|(\s+)|(^$|[\s\S])/g,t.matchToToken=function(e){var t={type:"invalid",value:e[0]};return e[1]?(t.type="string",t.closed=!(!e[3]&&!e[4])):e[5]?t.type="comment":e[6]?(t.type="comment",t.closed=!!e[7]):e[8]?t.type="regex":e[9]?t.type="number":e[10]?t.type="name":e[11]?t.type="punctuator":e[12]&&(t.type="whitespace"),t}},function(e,t,n){"use strict";function r(){this.$extend=function(e){return e=e||{},o(e,e instanceof r?e:this)}}var i=n(10),o=n(12),s=n(13),a=n(14),u=n(15),c=n(16),l=n(17),f=n(18),p=n(19),h=n(21),d="undefined"==typeof window,m={source:null,filename:null,rules:[f,l],escape:!0,debug:!!d&&"production"!==process.env.NODE_ENV,bail:!0,cache:!0,minimize:!0,compileDebug:!1,resolveFilename:h,include:s,htmlMinifier:p,htmlMinifierOptions:{collapseWhitespace:!0,minifyCSS:!0,minifyJS:!0,ignoreCustomFragments:[]},onerror:a,loader:c,caches:u,root:"/",extname:".art",ignore:[],imports:i};r.prototype=m,e.exports=new r},function(e,t){},function(e,t,n){"use strict";var r=n(5),i=n(0),o=n(23),s=function(e,t){return t instanceof Object?r({filename:e},t):i({filename:e,source:t})};s.render=r,s.compile=i,s.defaults=o,e.exports=s},function(e,t,n){"use strict";var r=n(0),i=function(e,t,n){return r(e,n)(t)};e.exports=i},function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(7),u=n(9),c="$data",l="$imports",f="print",p="include",h="extend",d="block",m="$$out",v="$$line",g="$$blocks",y="$$slice",b="$$from",w="$$options",x=function(e,t){return Object.hasOwnProperty.call(e,t)},k=JSON.stringify,E=function(){function e(t){var n,s,a=this;o(this,e);var x=t.source,k=t.minimize,E=t.htmlMinifier;if(this.options=t,this.stacks=[],this.context=[],this.scripts=[],this.CONTEXT_MAP={},this.ignore=[c,l,w].concat(i(t.ignore)),this.internal=(n={},r(n,m,"''"),r(n,v,"[0,0]"),r(n,g,"arguments[1]||{}"),r(n,b,"null"),r(n,f,"function(){var s=''.concat.apply('',arguments);"+m+"+=s;return s}"),r(n,p,"function(src,data){var s="+w+".include(src,data||"+c+",arguments[2]||"+g+","+w+");"+m+"+=s;return s}"),r(n,h,"function(from){"+b+"=from}"),r(n,y,"function(c,p,s){p="+m+";"+m+"='';c();s="+m+";"+m+"=p+s;return s}"),r(n,d,"function(){var a=arguments,s;if(typeof a[0]==='function'){return "+y+"(a[0])}else if("+b+"){if(!"+g+"[a[0]]){"+g+"[a[0]]="+y+"(a[1])}else{"+m+"+="+g+"[a[0]]}}else{s="+g+"[a[0]];if(typeof s==='string'){"+m+"+=s}else{s="+y+"(a[1])}return s}}"),n),this.dependencies=(s={},r(s,f,[m]),r(s,p,[m,w,c,g]),r(s,h,[b,p]),r(s,d,[y,b,m,g]),s),this.importContext(m),t.compileDebug&&this.importContext(v),k)try{x=E(x,t)}catch(T){}this.source=x,this.getTplTokens(x,t.rules,this).forEach(function(e){e.type===u.TYPE_STRING?a.parseString(e):a.parseExpression(e)})}return s(e,[{key:"getTplTokens",value:function(){return u.apply(undefined,arguments)}},{key:"getEsTokens",value:function(e){return a(e)}},{key:"getVariables",value:function(e){var t=!1;return e.filter(function(e){return"whitespace"!==e.type&&"comment"!==e.type}).filter(function(e){return"name"===e.type&&!t||(t="punctuator"===e.type&&"."===e.value,!1)}).map(function(e){return e.value})}},{key:"importContext",value:function(e){var t=this,n="",r=this.internal,i=this.dependencies,o=this.ignore,s=this.context,a=this.options,u=a.imports,f=this.CONTEXT_MAP;x(f,e)||-1!==o.indexOf(e)||(x(r,e)?(n=r[e],x(i,e)&&i[e].forEach(function(e){return t.importContext(e)})):n="$escape"===e||"$each"===e||x(u,e)?l+"."+e:c+"."+e,f[e]=n,s.push({name:e,value:n}))}},{key:"parseString",value:function(e){var t=e.value;if(t){var n=m+"+="+k(t);this.scripts.push({source:t,tplToken:e,code:n})}}},{key:"parseExpression",value:function(e){var t=this,n=e.value,r=e.script,i=r.output,o=this.options.escape,s=r.code;i&&(s=!1===o||i===u.TYPE_RAW?m+"+="+r.code:m+"+=$escape("+r.code+")");var a=this.getEsTokens(s);this.getVariables(a).forEach(function(e){return t.importContext(e)}),this.scripts.push({source:n,tplToken:e,code:s})}},{key:"checkExpression",value:function(e){for(var t=[[/^\s*}[\w\W]*?{?[\s;]*$/,""],[/(^[\w\W]*?\([\w\W]*?(?:=>|\([\w\W]*?\))\s*{[\s;]*$)/,"$1})"],[/(^[\w\W]*?\([\w\W]*?\)\s*{[\s;]*$)/,"$1}"]],n=0;n<t.length;){if(t[n][0].test(e)){var r;e=(r=e).replace.apply(r,i(t[n]));break}n++}try{return new Function(e),!0}catch(o){return!1}}},{key:"build",value:function(){var e=this.options,t=this.context,n=this.scripts,r=this.stacks,i=this.source,o=e.filename,s=e.imports,a=[],f=x(this.CONTEXT_MAP,h),d=0,y=function(e,t){var n=t.line,i=t.start,o={generated:{line:r.length+d+1,column:1},original:{line:n+1,column:i+1}};return d+=e.split(/\n/).length-1,o},E=function(e){return e.replace(/^[\t ]+|[\t ]$/g,"")};r.push("function("+c+"){"),r.push("'use strict'"),r.push(c+"="+c+"||{}"),r.push("var "+t.map(function(e){return e.name+"="+e.value}).join(",")),e.compileDebug?(r.push("try{"),n.forEach(function(e){e.tplToken.type===u.TYPE_EXPRESSION&&r.push(v+"=["+[e.tplToken.line,e.tplToken.start].join(",")+"]"),a.push(y(e.code,e.tplToken)),r.push(E(e.code))}),r.push("}catch(error){"),r.push("throw {"+["name:'RuntimeError'","path:"+k(o),"message:error.message","line:"+v+"[0]+1","column:"+v+"[1]+1","source:"+k(i),"stack:error.stack"].join(",")+"}"),r.push("}")):n.forEach(function(e){a.push(y(e.code,e.tplToken)),r.push(E(e.code))}),f&&(r.push(m+"=''"),r.push(p+"("+b+","+c+","+g+")")),r.push("return "+m),r.push("}");var T=r.join("\n");try{var O=new Function(l,w,"return "+T)(s,e);return O.mappings=a,O.sourcesContent=[i],O}catch(P){for(var $=0,j=0,_=0,S=void 0;$<n.length;){var C=n[$];if(!this.checkExpression(C.code)){j=C.tplToken.line,_=C.tplToken.start,S=C.code;break}$++}throw{name:"CompileError",path:o,message:P.message,line:j+1,column:_+1,source:i,generated:S,stack:P.stack}}}}]),e}();E.CONSTS={DATA:c,IMPORTS:l,PRINT:f,INCLUDE:p,EXTEND:h,BLOCK:d,OPTIONS:w,OUT:m,LINE:v,BLOCKS:g,SLICE:y,FROM:b,ESCAPE:"$escape",EACH:"$each"},e.exports=E},function(e,t,n){"use strict";var r=n(8),i=n(1)["default"],o=n(1).matchToToken,s=function(e){return e.match(i).map(function(e){return i.lastIndex=0,o(i.exec(e))}).map(function(e){return"name"===e.type&&r(e.value)&&(e.type="keyword"),e})};e.exports=s},function(e,t,n){"use strict";var r={"abstract":!0,await:!0,"boolean":!0,"break":!0,"byte":!0,"case":!0,"catch":!0,"char":!0,"class":!0,"const":!0,"continue":!0,"debugger":!0,"default":!0,"delete":!0,"do":!0,"double":!0,"else":!0,"enum":!0,"export":!0,"extends":!0,"false":!0,"final":!0,"finally":!0,"float":!0,"for":!0,"function":!0,"goto":!0,"if":!0,"implements":!0,"import":!0,"in":!0,"instanceof":!0,"int":!0,"interface":!0,"let":!0,"long":!0,"native":!0,"new":!0,"null":!0,"package":!0,"private":!0,"protected":!0,"public":!0,"return":!0,"short":!0,"static":!0,"super":!0,"switch":!0,"synchronized":!0,"this":!0,"throw":!0,"transient":!0,"true":!0,"try":!0,"typeof":!0,"var":!0,"void":!0,"volatile":!0,"while":!0,"with":!0,"yield":!0};e.exports=function(e){return r.hasOwnProperty(e)}},function(e,t,n){"use strict";function r(e){var t=new String(e.value);return t.line=e.line,t.start=e.start,t.end=e.end,t}function i(e,t,n){this.type=e,this.value=t,this.script=null,n?(this.line=n.line+n.value.split(/\n/).length-1,this.line===n.line?this.start=n.end:this.start=n.value.length-n.value.lastIndexOf("\n")-1):(this.line=0,this.start=0),this.end=this.start+this.value.length}var o=function(e,t){for(var n=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{},o=[new i("string",e)],s=0;s<t.length;s++)for(var a=t[s],u=a.test.ignoreCase?"ig":"g",c=new RegExp(a.test.source,u),l=0;l<o.length;l++){var f=o[l],p=o[l-1];if("string"===f.type){for(var h=void 0,d=0,m=[],v=f.value;null!==(h=c.exec(v));)h.index>d&&(p=new i("string",v.slice(d,h.index),p),m.push(p)),p=new i("expression",h[0],p),h[0]=r(p),p.script=a.use.apply(n,h),m.push(p),d=h.index+h[0].length;d<v.length&&(p=new i("string",v.slice(d),p),m.push(p)),o.splice.apply(o,[l,1].concat(m)),l+=m.length-1}}return o};o.TYPE_STRING="string",o.TYPE_EXPRESSION="expression",o.TYPE_RAW="raw",o.TYPE_ESCAPE="escape",e.exports=o},function(e,t,n){"use strict";(function(t){function n(e){return"string"!=typeof e&&(e=e===undefined||null===e?"":"function"==typeof e?n(e.call(e)):JSON.stringify(e)),e}function r(e){var t=""+e,n=s.exec(t);if(!n)return e;var r="",i=void 0,o=void 0,a=void 0;for(i=n.index,o=0;i<t.length;i++){switch(t.charCodeAt(i)){case 34:a="&#34;";break;case 38:a="&#38;";break;case 39:a="&#39;";break;case 60:a="&#60;";break;case 62:a="&#62;";break;default:continue}o!==i&&(r+=t.substring(o,i)),o=i+1,r+=a}return o!==i?r+t.substring(o,i):r}/*! art-template@runtime | https://github.com/aui/art-template */
var i="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==t?t:{},o=Object.create(i),s=/["&'<>]/;o.$escape=function(e){return r(n(e))},o.$each=function(e,t){if(Array.isArray(e))for(var n=0,r=e.length;n<r;n++)t(e[n],n);else for(var i in e)t(e[i],i)},e.exports=o}).call(t,n(11))},function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(r){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){"use strict";var r=Object.prototype.toString,i=function(e){return null===e?"Null":r.call(e).slice(8,-1)},o=function s(e,t){var n=void 0,r=i(e);if("Object"===r?n=Object.create(t||{}):"Array"===r&&(n=[].concat(t||[])),n){for(var o in e)Object.hasOwnProperty.call(e,o)&&(n[o]=s(e[o],n[o]));return n}return e};e.exports=o},function(e,t,n){"use strict";var r=function(e,t,r,i){var o=n(0);return i=i.$extend({filename:i.resolveFilename(e,i),bail:!0,source:null}),o(i)(t,r)};e.exports=r},function(e,t,n){"use strict";var r=function(e){console.error(e.name,e.message)};e.exports=r},function(e,t,n){"use strict";var r={__data:Object.create(null),set:function(e,t){this.__data[e]=t},get:function(e){return this.__data[e]},reset:function(){this.__data={}}};e.exports=r},function(e,t,n){"use strict";var r="undefined"==typeof window,i=function(e){if(r){return n(3).readFileSync(e,"utf8")}var t=document.getElementById(e);return t.value||t.innerHTML};e.exports=i},function(e,t,n){"use strict";var r={test:/{{([@#]?)[ \t]*(\/?)([\w\W]*?)[ \t]*}}/,use:function(e,t,n,i){var o=this,s=o.options,a=o.getEsTokens(i),u=a.map(function(e){return e.value}),c={},l=void 0,f=!!t&&"raw",p=n+u.shift(),h=function(t,n){console.warn((s.filename||"anonymous")+":"+(e.line+1)+":"+(e.start+1)+"\nTemplate upgrade: {{"+t+"}} -> {{"+n+"}}")};switch("#"===t&&h("#value","@value"),p){case"set":i="var "+u.join("").trim();break;case"if":i="if("+u.join("").trim()+"){";break;case"else":var d=u.indexOf("if");~d?(u.splice(0,d+1),i="}else if("+u.join("").trim()+"){"):i="}else{";break;case"/if":i="}";break;case"each":l=r._split(a),l.shift(),"as"===l[1]&&(h("each object as value index","each object value index"),l.splice(1,1));i="$each("+(l[0]||"$data")+",function("+(l[1]||"$value")+","+(l[2]||"$index")+"){";break;case"/each":i="})";break;case"block":l=r._split(a),l.shift(),i="block("+l.join(",").trim()+",function(){";break;case"/block":i="})";break;case"echo":p="print",h("echo value","value");case"print":case"include":case"extend":if(0!==u.join("").trim().indexOf("(")){l=r._split(a),l.shift(),i=p+"("+l.join(",")+")";break}default:if(~u.indexOf("|")){var m=a.reduce(function(e,t){var n=t.value,r=t.type;return"|"===n?e.push([]):"whitespace"!==r&&"comment"!==r&&(e.length||e.push([]),":"===n&&1===e[e.length-1].length?h("value | filter: argv","value | filter argv"):e[e.length-1].push(t)),e},[]).map(function(e){return r._split(e)});i=m.reduce(function(e,t){var n=t.shift();return t.unshift(e),"$imports."+n+"("+t.join(",")+")"},m.shift().join(" ").trim())}f=f||"escape"}return c.code=i,c.output=f,c},_split:function(e){e=e.filter(function(e){var t=e.type;return"whitespace"!==t&&"comment"!==t});for(var t=0,n=e.shift(),r=/\]|\)/,i=[[n]];t<e.length;){var o=e[t];"punctuator"===o.type||"punctuator"===n.type&&!r.test(n.value)?i[i.length-1].push(o):i.push([o]),n=o,t++}return i.map(function(e){return e.map(function(e){return e.value}).join("")})}};e.exports=r},function(e,t,n){"use strict";var r={test:/<%(#?)((?:==|=#|[=-])?)[ \t]*([\w\W]*?)[ \t]*(-?)%>/,use:function(e,t,n,r){return n={"-":"raw","=":"escape","":!1,"==":"raw","=#":"raw"}[n],t&&(r="/*"+r+"*/",n=!1),{code:r,output:n}}};e.exports=r},function(e,t,n){"use strict";function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}var i="undefined"==typeof window,o=function(e,t){if(i){var o,s=n(20).minify,a=t.htmlMinifierOptions,u=t.rules.map(function(e){return e.test});(o=a.ignoreCustomFragments).push.apply(o,r(u)),e=s(e,a)}return e};e.exports=o},function(e,t){!function(e){e.noop=function(){}}("object"==typeof e&&"object"==typeof e.exports?e.exports:window)},function(e,t,n){"use strict";var r="undefined"==typeof window,i=/^\.+\//,o=function(e,t){if(r){var o=n(3),s=t.root,a=t.extname;if(i.test(e)){var u=t.filename,c=!u||e===u,l=c?s:o.dirname(u);e=o.resolve(l,e)}else e=o.resolve(s,e);o.extname(e)||(e+=a)}return e};e.exports=o},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e){var t=e.name,n=e.source,r=e.path,i=e.line,o=e.column,s=e.generated,a=e.message;if(!n)return a;var u=n.split(/\n/),c=Math.max(i-3,0),l=Math.min(u.length,i+3),f=u.slice(c,l).map(function(e,t){var n=t+c+1;return(n===i?" >> ":"    ")+n+"| "+e}).join("\n");return(r||"anonymous")+":"+i+":"+o+"\n"+f+"\n\n"+t+": "+a+(s?"\n   generated: "+s:"")}var a=function(e){function t(e){r(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e.message));return n.name="TemplateError",n.message=s(e),Error.captureStackTrace&&Error.captureStackTrace(n,n.constructor),n}return o(t,e),t}(Error);e.exports=a},function(e,t,n){"use strict";e.exports=n(2)}])});

/*
	[Discuz!] (C)2001-2099 Comsenz Inc.
	This is NOT a freeware, use is subject to license terms

	$Id: forum_moderate.js 26484 2011-12-14 02:08:03Z svn_project_zhangjie $
*/
//注册一些常规答复
websocket_func[CMD_MSG_WS2U_CommonResult]=function(result){
	f=function(){}
	if(result.Err_url){
		f=function(){
			eval(result.Err_url);
		}
	}
	if(result.Result==1){
		showDialog("成功","notice","请求结果",f);
		return
	}
	if(err[result.Result]==undefined){
		showDialog("未知错误: "+result.Result);
	}else{
		showDialog(err[result.Result],"alert","请求失败",f);
	}
}
function gettoken(){
	setcookie('check_token','true',60)
	ajax_post(WRITE_MSG_U2WS_Gettoken({}))
	check_token = 'true';
	websocket_func[CMD_MSG_WS2U_Gettoken]=function(r){
		if(r!=undefined && r.Token!=undefined && r.Token.length==16){
			cache.Head=r.Head
			setHead(r.Head)
			token=[];
			str=""
			for(var i=0;i<r.Token.length;i++){
				str+=String.fromCharCode(r.Token[i])
				token.push(r.Token[i])
			}
			saveUserdata('token',str);

			while(websocket_data.length){
				ajax_post(websocket_data.splice(0,1)[0])
			}
		}else{
			showDialog("网站现在无法访问，请稍后再试")
		   //location.href= '/wap/token_error.html?url='+encodeURIComponent(location.href);
		}
	}
}


//scene值1登录，2注册，3找回密码，4发表帖子
var sceneLogin=1,sceneReg=2,sceneResetpw=3,scenePost=4,sceneChangepw=5,sceneBind=6;
function updateseccode(id,scene,type){
	if(typeof type=="undefined") type='embed';
	vaptcha({
		vid: '5e01c990f4ba5849b643f4d7', // 验证单元id
		type: type, // 展现类型
		container: '#'+id, // 按钮容器，可为Element 或者 selector
		//mode: 'offline',
		offline_server:ApiUrl.replace(/wss:/,'https:').replace(/\/ws$/,'/vaptcha'),
		scene:scene,
		//color:'#FD7D01',
	}).then(function (obj) {
		obj.render()// 调用验证实例 vaptchaObj 的 render 方法加载验证按钮
		obj.listen('pass', function() {
			$('input[name="'+id+'"]').val(obj.getToken())
		})
	})
}
var seccode_scene={};
function checkseccode(scene,callback,close){
	var obj=seccode_scene[scene];
	switch(typeof obj){
		case "undefined":
		vaptcha({
			vid: '5e01c990f4ba5849b643f4d7', // 验证单元id
			type: 'invisible', // 展现类型 隐藏式
			offline_server:ApiUrl.replace(/wss:/,'https:').replace(/\/ws$/,'/vaptcha?ext=')+GET('vaptcha'),
			scene:scene,
		}).then(function (o) {
			obj=o
			seccode_scene[scene]=obj;
			obj.listen('pass',function() {
				//是否保存token,由上一级调用处理
				callback(seccode_scene[scene].getToken())
				setTimeout(function(){seccode_scene[scene]=undefined;}, 1000*600);//超时写死在后端vaptcha
			})
			if(typeof close=="function"){
				obj.listen('close', function() {
					close()
				})
			}
			obj.validate()// 调用验证实例 vaptchaObj 的 render 方法加载验证按钮
		})
		break;
		case "string":
		callback(obj);
		break;
		case "object":
		obj.validate()
		break;
	}
}
/*
var seccode_id='';
websocket_func[CMD_MSG_WS2U_Getseccode]=function(res){
	binary="";
	var len = res.Img.length;
	for (var i = 0; i < len; i++) {
		binary += String.fromCharCode(res.Img[i]);
	}
	$('#'+seccode_id).attr('src', 'data:image/jpeg;base64,'+window.btoa(binary));
}
function updateseccode(id) {
	if(id==undefined){
		id="seccode"
	}
	seccode_id=id
	ajax_post(WRITE_MSG_U2WS_Getseccode({}))
}*/
function setHead(data){
  timestamp_offset=new Date().getTime()/1000-data.Timestamp
  cache.Head=data;
  if(!$('tpl_index_login')) return;
  var html = template("tpl_index_login", {
	data: data,
	cache:cache,
  });
  if(data.Uid>0){
	uid=data.Uid
	$('.Quater_user').removeClass('lg_box').addClass('logined').html(html)
  }else{
	$('.Quater_user').removeClass('logined').addClass('lg_box').html(html)
  }
  if(data.Unread_num>0){
	noticeTitle()
  }
  if(data.send_botton==0){
	$('.th_post').hide();
  }
  $('.sitename').text(data.Sitename)
}
function modaction(action,tid) {
	if(!action) {
		return;
	}
	
	var pids = [];
	for(var i = 0; i < $('modactions').elements.length; i++) {
		if($('modactions').elements[i].name.match('topiclist')) {
			pids.push(Number($('modactions').elements[i].value))
			
		}
	}
	if(pids.length==0) {
		alert('请选择需要操作的帖子');
	} else {
		var value={Tids:pids,Action:action,Tid:tid};
		console.log(value)
		showWindowEx('mods',value)
	}
}



function pidchecked(obj) {
	if(obj.checked) {
		try {
			var inp = document.createElement('<input name="topiclist[]" />');
		} catch(e) {
			try {
				var inp = document.createElement('input');
				inp.name = 'topiclist[]';
			} catch(e) {
				return;
			}
		}
		inp.id = 'topiclist_' + obj.value;
		inp.value = obj.value;
		inp.type = 'hidden';
		$('modactions').appendChild(inp);
	} else {
		$('modactions').removeChild($('topiclist_' + obj.value));
	}
}

var modclickcount = 0;
function modclick(obj, pid) {
	if(obj.checked) {
		modclickcount++;
	} else {
		modclickcount--;
	}
	$('mdct').innerHTML = modclickcount;
	if(modclickcount > 0) {
		var offset = fetchOffset(obj);
		$('mdly').style.top = offset['top'] - 65 + 'px';
		$('mdly').style.left = offset['left'] - 215 + 'px';
		$('mdly').style.display = '';
	} else {
		$('mdly').style.display = 'none';
	}
}

function resetmodcount() {
	modclickcount = 0;
	$('mdly').style.display = 'none';
}

function tmodclick(obj) {
	if(obj.checked) {
		modclickcount++;
	} else {
		modclickcount--;
	}
	$('mdct').innerHTML = modclickcount;
	if(modclickcount > 0) {
		var top_offset = obj.offsetTop;
		while((obj = obj.offsetParent).id != 'threadlist') {
			top_offset += obj.offsetTop;
		}
		$('mdly').style.top = top_offset - 7 + 'px';
		$('mdly').style.display = '';
	} else {
		$('mdly').style.display = 'none';
	}
}

function tmodthreads(operation) {
	var tids = [];
	for(var i = 0; i < $('moderate').elements.length; i++) {
		if($('moderate').elements[i].name.match('moderate') && $('moderate').elements[i].checked) {
			tids.push(Number($('moderate').elements[i].value))
			
		}
	}
	if(tids.length==0) {
		alert('请选择需要操作的帖子');
	} else {
		var value={Tids:tids,Action:operation,Allowstickthread:tpldata.Allowstickthread};
		if(tids.length==1 && tpldata.Threadlist){
			switch(operation){
				case 3:
				for(var i in tpldata.Threadlist){
					if(tpldata.Threadlist[i].Tid==tids[0]){
						value.Highlight=tpldata.Threadlist[i].Highlight
					}
				}
				break;
				case 10:
				if(tpldata.Fid){
					value.Fid=tpldata.Fid;
				}
				break;
			}
			
		}
		showWindowEx('mods',value)
	}
}

function getthreadclass() {
	var fid = $('fid');
	if(fid) {
		ajaxget('forum.php?mod=ajax&action=getthreadclass&fid=' + fid.value, 'threadclass', null, null, null, showthreadclass);
	}
}

function showthreadclass() {
	try{
		$('append_parent').removeChild($('typeid_ctrl_menu'));
	}catch(e) {}
	simulateSelect('typeid');
}

/*
	[Discuz!] (C)2001-2099 Comsenz Inc.
	This is NOT a freeware, use is subject to license terms

	$Id: bbcode.js 36359 2017-01-20 05:06:45Z nemohou $
*/

var re, DISCUZCODE = [];
DISCUZCODE['num'] = '-1';
DISCUZCODE['html'] = [];
EXTRAFUNC['bbcode2html'] = [];
EXTRAFUNC['html2bbcode'] = [];

function addslashes(str) {
	return preg_replace(['\\\\', '\\\'', '\\\/', '\\\(', '\\\)', '\\\[', '\\\]', '\\\{', '\\\}', '\\\^', '\\\$', '\\\?', '\\\.', '\\\*', '\\\+', '\\\|'], ['\\\\', '\\\'', '\\/', '\\(', '\\)', '\\[', '\\]', '\\{', '\\}', '\\^', '\\$', '\\?', '\\.', '\\*', '\\+', '\\|'], str);
}

function atag(aoptions, text) {
	if(trim(text) == '') {
		return '';
	}
	var pend = parsestyle(aoptions, '', '');
	href = getoptionvalue('href', aoptions);

	if(href.substr(0, 11) == 'javascript:') {
		return trim(recursion('a', text, 'atag'));
	}

	return pend['prepend'] + '[url=' + href + ']' + trim(recursion('a', text, 'atag')) + '[/url]' + pend['append'];
}

function bbcode2html(str) {
	if(str == '') {
		return '';
	}

	if(typeof(parsetype) == 'undefined') {
		parsetype = 0;
	}

	if(!fetchCheckbox('bbcodeoff') && allowbbcode && parsetype != 1) {
		str = str.replace(/\[code\]([\s\S]+?)\[\/code\]/ig, function($1, $2) {return parsecode($2);});
	}

	if(fetchCheckbox('allowimgurl')) {
		str = str.replace(/([^>=\]"'\/]|^)((((https?|ftp):\/\/)|www\.)([\w\-]+\.)*[\w\-\u4e00-\u9fa5]+\.([\.a-zA-Z0-9]+|\u4E2D\u56FD|\u7F51\u7EDC|\u516C\u53F8)((\?|\/|:)+[\w\.\/=\?%\-&~`@':+!]*)+\.(jpg|gif|png|bmp))/ig, '$1[img]$2[/img]');
	}

	if(!allowhtml || !fetchCheckbox('htmlon')) {
		str = str.replace(/</g, '&lt;');
		str = str.replace(/>/g, '&gt;');
		if(!fetchCheckbox('parseurloff')) {
			str = parseurl(str, 'html', false);
		}
	}

	for(i in EXTRAFUNC['bbcode2html']) {
		EXTRASTR = str;
		try {
			eval('str = ' + EXTRAFUNC['bbcode2html'][i] + '()');
		} catch(e) {}
	}

	if(!fetchCheckbox('smileyoff') && allowsmilies) {
		if(typeof smilies_type == 'object') {
			for(var typeid in smilies_array) {
				for(var page in smilies_array[typeid]) {
					for(var i in smilies_array[typeid][page]) {
						re = new RegExp(preg_quote(smilies_array[typeid][page][i][1]), "g");
						str = str.replace(re, '<img src="' + STATICURL + 'image/smiley/' + smilies_type['_' + typeid][1] + '/' + smilies_array[typeid][page][i][2] + '" border="0" smilieid="' + smilies_array[typeid][page][i][0] + '" alt="' + smilies_array[typeid][page][i][1] + '" />');
					}
				}
			}
		}
	}

	if(!fetchCheckbox('bbcodeoff') && allowbbcode) {
		str = clearcode(str);
		str = str.replace(/\[url\]\s*((https?|ftp|gopher|news|telnet|rtsp|mms|callto|bctp|thunder|qqdl|synacast){1}:\/\/|www\.)([^\[\"']+?)\s*\[\/url\]/ig, function($1, $2, $3, $4) {return cuturl($2 + $4);});
		str = str.replace(/\[url=((https?|ftp|gopher|news|telnet|rtsp|mms|callto|bctp|thunder|qqdl|synacast){1}:\/\/|www\.|mailto:)?([^\r\n\[\"']+?)\]([\s\S]+?)\[\/url\]/ig, '<a href="$1$3" target="_blank">$4</a>');
		str = str.replace(/\[email\](.[^\\=[]*)\[\/email\]/ig, '<a href="mailto:$1">$1</a>');
		str = str.replace(/\[email=(.[^\\=[]*)\](.*?)\[\/email\]/ig, '<a href="mailto:$1" target="_blank">$2</a>');
		str = str.replace(/\[postbg\]\s*([^\[\<\r\n;'\"\?\(\)]+?)\s*\[\/postbg\]/ig, function($1, $2) {
			addCSS = '';
			if(in_array($2, postimg_type["postbg"])) {
				addCSS = '<style type="text/css" name="editorpostbg">body{background-image:url("'+STATICURL+'image/postbg/'+$2+'");}</style>';
			}
			return addCSS;
		});
		str = str.replace(/\[color=([\w#\(\),\s]+?)\]/ig, '<font color="$1">');
		str = str.replace(/\[backcolor=([\w#\(\),\s]+?)\]/ig, '<font style="background-color:$1">');
		str = str.replace(/\[size=(\d+?)\]/ig, '<font size="$1">');
		str = str.replace(/\[size=(\d+(\.\d+)?(px|pt)+?)\]/ig, '<font style="font-size: $1">');
		str = str.replace(/\[font=([^\[\<\=]+?)\]/ig, '<font face="$1">');
		str = str.replace(/\[align=([^\[\<\=]+?)\]/ig, '<div align="$1">');
		str = str.replace(/\[p=(\d{1,2}|null), (\d{1,2}|null), (left|center|right)\]/ig, '<p style="line-height: $1px; text-indent: $2em; text-align: $3;">');
		str = str.replace(/\[float=left\]/ig, '<br style="clear: both"><span style="float: left; margin-right: 5px;">');
		str = str.replace(/\[float=right\]/ig, '<br style="clear: both"><span style="float: right; margin-left: 5px;">');
		//str = str.replace(/\n/ig, '<br>');
		if(parsetype != 1) {
			str = str.replace(/\[quote]([\s\S]*?)\[\/quote\]\s?\s?/ig, '<div class="quote"><blockquote>$1</blockquote></div>\n');
		}

		re = /\[table(?:=(\d{1,4}%?)(?:,([\(\)%,#\w ]+))?)?\]\s*([\s\S]+?)\s*\[\/table\]/ig;
		for (i = 0; i < 4; i++) {
			str = str.replace(re, function($1, $2, $3, $4) {return parsetable($2, $3, $4);});
		}

		str = preg_replace([
			'\\\[\\\/color\\\]', '\\\[\\\/backcolor\\\]', '\\\[\\\/size\\\]', '\\\[\\\/font\\\]', '\\\[\\\/align\\\]', '\\\[\\\/p\\\]', '\\\[b\\\]', '\\\[\\\/b\\\]',
			'\\\[i\\\]', '\\\[\\\/i\\\]', '\\\[u\\\]', '\\\[\\\/u\\\]', '\\\[s\\\]', '\\\[\\\/s\\\]', '\\\[hr\\\]', '\\\[list\\\]', '\\\[list=1\\\]', '\\\[list=a\\\]',
			'\\\[list=A\\\]', '\\s?\\\[\\\*\\\]', '\\\[\\\/list\\\]', '\\\[indent\\\]', '\\\[\\\/indent\\\]', '\\\[\\\/float\\\]'
			], [
			'</font>', '</font>', '</font>', '</font>', '</div>', '</p>', '<b>', '</b>', '<i>',
			'</i>', '<u>', '</u>', '<strike>', '</strike>', '<hr class="l" />', '<ul>', '<ul type=1 class="litype_1">', '<ul type=a class="litype_2">',
			'<ul type=A class="litype_3">', '<li>', '</ul>', '<blockquote>', '</blockquote>', '</span>'
			], str, 'g');
	}

	if(!fetchCheckbox('bbcodeoff')) {
		if(allowimgcode) {
			str = str.replace(/\[img_(\d+)\]\s*([^\[\"\<\r\n]+?)\s*\[\/img\]/ig, '<img aid="attachimg_$1" src="$2" border="0" alt=""  />');
			str = str.replace(/\[img_(\d+)=(\d{1,4})[x|\,](\d{1,4})\]\s*([^\[\"\<\r\n]+?)\s*\[\/img\]/ig, function ($1, $2, $3, $4,$5) {return '<img aid="attachimg_'+$2+'"' + ($3 > 0 ? ' width="' + $3 + '"' : '') + ($4 > 0 ? ' _height="' + $4 + '"' : '') + ' src="' + $5 + '" border="0" alt="" />'});
			str=str.replace(/\[img\]\s*([^\[\"\<\r\n]+?)\s*\[\/img\]/ig, '<img src="$1" border="0" alt=""  />');
		} else {
			str = str.replace(/\[img\]\s*([^\[\"\<\r\n]+?)\s*\[\/img\]/ig, '<a href="$1" target="_blank">$1</a>');
			str = str.replace(/\[img=(\d{1,4})[x|\,](\d{1,4})\]\s*([^\[\"\<\r\n]+?)\s*\[\/img\]/ig, '<a href="$3" target="_blank">$3</a>');
		}
	}

	for(var i = 0; i <= DISCUZCODE['num']; i++) {
		str = str.replace("[\tDISCUZ_CODE_" + i + "\t]", DISCUZCODE['html'][i]);
	}

	if(!allowhtml || !fetchCheckbox('htmlon')) {
		str = str.replace(/(^|>)([^<]+)(?=<|$)/ig, function($1, $2, $3) {
			return $2 + preg_replace(['\t', '   ', '  ', '(\r\n|\n|\r)'], ['&nbsp; &nbsp; &nbsp; &nbsp; ', '&nbsp; &nbsp;', '&nbsp;&nbsp;', '<br />'], $3);
		});
	} else {
		str = str.replace(/<script[^\>]*?>([^\x00]*?)<\/script>/ig, '');
	}

	return str;
}

function clearcode(str) {
	str= str.replace(/\[url\]\[\/url\]/ig, '', str);
	str= str.replace(/\[url=((https?|ftp|gopher|news|telnet|rtsp|mms|callto|bctp|thunder|qqdl|synacast){1}:\/\/|www\.|mailto:)?([^\s\[\"']+?)\]\[\/url\]/ig, '', str);
	str= str.replace(/\[email\]\[\/email\]/ig, '', str);
	str= str.replace(/\[email=(.[^\[]*)\]\[\/email\]/ig, '', str);
	str= str.replace(/\[color=([^\[\<]+?)\]\[\/color\]/ig, '', str);
	str= str.replace(/\[size=(\d+?)\]\[\/size\]/ig, '', str);
	str= str.replace(/\[size=(\d+(\.\d+)?(px|pt)+?)\]\[\/size\]/ig, '', str);
	str= str.replace(/\[font=([^\[\<]+?)\]\[\/font\]/ig, '', str);
	str= str.replace(/\[align=([^\[\<]+?)\]\[\/align\]/ig, '', str);
	str= str.replace(/\[p=(\d{1,2}), (\d{1,2}), (left|center|right)\]\[\/p\]/ig, '', str);
	str= str.replace(/\[float=([^\[\<]+?)\]\[\/float\]/ig, '', str);
	str= str.replace(/\[quote\]\[\/quote\]/ig, '', str);
	str= str.replace(/\[code\]\[\/code\]/ig, '', str);
	str= str.replace(/\[table\]\[\/table\]/ig, '', str);
	str= str.replace(/\[free\]\[\/free\]/ig, '', str);
	str= str.replace(/\[b\]\[\/b]/ig, '', str);
	str= str.replace(/\[u\]\[\/u]/ig, '', str);
	str= str.replace(/\[i\]\[\/i]/ig, '', str);
	str= str.replace(/\[s\]\[\/s]/ig, '', str);
	return str;
}

function cuturl(url) {
	var length = 65;
	var urllink = '<a href="' + (url.toLowerCase().substr(0, 4) == 'www.' ? 'http://' + url : url) + '" target="_blank">';
	if(url.length > length) {
		url = url.substr(0, parseInt(length * 0.5)) + ' ... ' + url.substr(url.length - parseInt(length * 0.3));
	}
	urllink += url + '</a>';
	return urllink;
}

function dstag(options, text, tagname) {
	if(trim(text) == '') {
		return '\n';
	}
	var pend = parsestyle(options, '', '');
	var prepend = pend['prepend'];
	var append = pend['append'];
	if(in_array(tagname, ['div', 'p'])) {
		align = getoptionvalue('align', options);
		if(in_array(align, ['left', 'center', 'right'])) {
			prepend = '[align=' + align + ']' + prepend;
			append += '[/align]';
		} else {
			append += '\n';
		}
	}
	return prepend + recursion(tagname, text, 'dstag') + append;
}

function ptag(options, text, tagname) {
	if(trim(text) == '') {
		return '\n';
	}
	if(trim(options) == '') {
		return text + '\n';
	}

	var lineHeight = null;
	var textIndent = null;
	var align, re, matches;

	re = /line-height\s?:\s?(\d{1,3})px/i;
	matches = re.exec(options);
	if(matches != null) {
		lineHeight = matches[1];
	}

	re = /text-indent\s?:\s?(\d{1,3})em/i;
	matches = re.exec(options);
	if(matches != null) {
		textIndent = matches[1];
	}

	re = /text-align\s?:\s?(left|center|right)/i;
	matches = re.exec(options);
	if(matches != null) {
		align = matches[1];
	} else {
		align = getoptionvalue('align', options);
	}
	align = in_array(align, ['left', 'center', 'right']) ? align : 'left';
	style = getoptionvalue('style', options);
	style = preg_replace(['line-height\\\s?:\\\s?(\\\d{1,3})px', 'text-indent\\\s?:\\\s?(\\\d{1,3})em', 'text-align\\\s?:\\\s?(left|center|right)'], '', style);
	if(lineHeight === null && textIndent === null) {
		return '[align=' + align + ']' + (style ? '<span style="' + style + '">' : '') + text + (style ? '</span>' : '') + '[/align]';
	} else {
		return '[p=' + lineHeight + ', ' + textIndent + ', ' + align + ']' + (style ? '<span style="' + style + '">' : '') + text + (style ? '</span>' : '') + '[/p]';
	}
}

function fetchCheckbox(cbn) {
	return $(cbn) && $(cbn).checked == true ? 1 : 0;
}

function fetchoptionvalue(option, text) {
	if((position = strpos(text, option)) !== false) {
		delimiter = position + option.length;
		if(text.charAt(delimiter) == '"') {
			delimchar = '"';
		} else if(text.charAt(delimiter) == '\'') {
			delimchar = '\'';
		} else {
			delimchar = ' ';
		}
		delimloc = strpos(text, delimchar, delimiter + 1);
		if(delimloc === false) {
			delimloc = text.length;
		} else if(delimchar == '"' || delimchar == '\'') {
			delimiter++;
		}
		return trim(text.substr(delimiter, delimloc - delimiter));
	} else {
		return '';
	}
}

function fonttag(fontoptions, text) {
	var prepend = '';
	var append = '';
	var tags = new Array();
	tags = {'font' : 'face=', 'size' : 'size=', 'color' : 'color='};
	for(bbcode in tags) {
		optionvalue = fetchoptionvalue(tags[bbcode], fontoptions);
		if(optionvalue) {
			prepend += '[' + bbcode + '=' + optionvalue + ']';
			append = '[/' + bbcode + ']' + append;
		}
	}

	var pend = parsestyle(fontoptions, prepend, append);
	return pend['prepend'] + recursion('font', text, 'fonttag') + pend['append'];
}

function getoptionvalue(option, text) {
	re = new RegExp(option + "(\s+?)?\=(\s+?)?[\"']?(.+?)([\"']|$|>)", "ig");
	var matches = re.exec(text);
	if(matches != null) {
		return trim(matches[3]);
	}
	return '';
}

function html2bbcode(str) {

	if((allowhtml && fetchCheckbox('htmlon')) || trim(str) == '') {
		for(i in EXTRAFUNC['html2bbcode']) {
			EXTRASTR = str;
			try {
				eval('str = ' + EXTRAFUNC['html2bbcode'][i] + '()');
			} catch(e) {}
		}
		str = str.replace(/<img[^>]+smilieid=(["']?)(\d+)(\1)[^>]*>/ig, function($1, $2, $3) {return smileycode($3);});
		str = str.replace(/<img([^>]*aid=[^>]*)>/ig, function($1, $2) {return imgtag($2);});
		return str;
	}

	str = str.replace(/<div\sclass=["']?blockcode["']?>[\s\S]*?<blockquote>([\s\S]+?)<\/blockquote>[\s\S]*?<\/div>/ig, function($1, $2) {return codetag($2);});

	if(!fetchCheckbox('bbcodeoff') && allowbbcode) {
		var postbg = '';
		str = str.replace(/<style[^>]+name="editorpostbg"[^>]*>body{background-image:url\("([^\[\<\r\n;'\"\?\(\)]+?)"\);}<\/style>/ig, function($1, $4) {
			$4 = $4.replace(STATICURL+'image/postbg/', '');
			return '[postbg]'+$4+'[/postbg]';
		});
		str = str.replace(/\[postbg\]\s*([^\[\<\r\n;'\"\?\(\)]+?)\s*\[\/postbg\]/ig, function($1, $2) {
			postbg = $2;
			return '';
		});
		if(postbg) {
			str = '[postbg]'+postbg+'[/postbg]' + str;
		}
	}

	str = preg_replace(['<style.*?>[\\\s\\\S]*?<\/style>', '<script.*?>[\\\s\\\S]*?<\/script>', '<noscript.*?>[\\\s\\\S]*?<\/noscript>', '<select.*?>[\s\S]*?<\/select>', '<object.*?>[\s\S]*?<\/object>', '<!--[\\\s\\\S]*?-->', ' on[a-zA-Z]{3,16}\\\s?=\\\s?"[\\\s\\\S]*?"'], '', str);

	str= str.replace(/(\r\n|\n|\r)/ig, '');

	str= str.replace(/&((#(32|127|160|173))|shy|nbsp);/ig, ' ');

	if(fetchCheckbox('allowimgurl')) {
		str = str.replace(/([^>=\]"'\/]|^)((((https?|ftp):\/\/)|www\.)([\w\-]+\.)*[\w\-\u4e00-\u9fa5]+\.([\.a-zA-Z0-9]+|\u4E2D\u56FD|\u7F51\u7EDC|\u516C\u53F8)((\?|\/|:)+[\w\.\/=\?%\-&~`@':+!]*)+\.(jpg|gif|png|bmp))/ig, '$1[img]$2[/img]');
	}

	if(!fetchCheckbox('parseurloff')) {
		str = parseurl(str, 'bbcode', false);
	}

	for(i in EXTRAFUNC['html2bbcode']) {
		EXTRASTR = str;
		try {
			eval('str = ' + EXTRAFUNC['html2bbcode'][i] + '()');
		} catch(e) {}
	}

	str = str.replace(/<br\s+?style=(["']?)clear: both;?(\1)[^\>]*>/ig, '');
	str = str.replace(/<br[^\>]*>/ig, "\n");

	if(!fetchCheckbox('bbcodeoff') && allowbbcode) {
		str = preg_replace([
			'<table[^>]*float:\\\s*(left|right)[^>]*><tbody><tr><td>\\\s*([\\\s\\\S]+?)\\\s*<\/td><\/tr></tbody><\/table>',
			'<table([^>]*(width|background|background-color|backcolor)[^>]*)>',
			'<table[^>]*>',
			'<tr[^>]*(?:background|background-color|backcolor)[:=]\\\s*(["\']?)([\(\)\\\s%,#\\\w]+)(\\1)[^>]*>',
			'<tr[^>]*>',
			'(<t[dh]([^>]*(left|center|right)[^>]*)>)\\\s*([\\\s\\\S]+?)\\\s*(<\/t[dh]>)',
			'<t[dh]([^>]*(width|colspan|rowspan)[^>]*)>',
			'<t[dh][^>]*>',
			'<\/t[dh]>',
			'<\/tr>',
			'<\/table>',
			'<h\\\d[^>]*>',
			'<\/h\\\d>'
		], [
			function($1, $2, $3) {return '[float=' + $2 + ']' + $3 + '[/float]';},
			function($1, $2) {return tabletag($2);},
			'[table]\n',
			function($1, $2, $3) {return '[tr=' + $3 + ']';},
			'[tr]',
			function($1, $2, $3, $4, $5, $6) {return $2 + '[align=' + $4 + ']' + $5 + '[/align]' + $6},
			function($1, $2) {return tdtag($2);},
			'[td]',
			'[/td]',
			'[/tr]\n',
			'[/table]',
			'[b]',
			'[/b]'
		], str);

		str = str.replace(/<h([0-9]+)[^>]*>([\s\S]*?)<\/h\1>/ig, function($1, $2, $3) {return "[size=" + (7 - $2) + "]" + $3 + "[/size]\n\n";});
		str = str.replace(/<hr[^>]*>/ig, "[hr]");
		str = str.replace(/<img[^>]+smilieid=(["']?)(\d+)(\1)[^>]*>/ig, function($1, $2, $3) {return smileycode($3);});
		str = str.replace(/<img([^>]*src[^>]*)>/ig, function($1, $2) {return imgtag($2);});

		str = str.replace(/<a\s+?name=(["']?)(.+?)(\1)[\s\S]*?>([\s\S]*?)<\/a>/ig, '$4');
		str = str.replace(/<div[^>]*quote[^>]*><blockquote>([\s\S]*?)<\/blockquote><\/div>([\s\S]*?)(<br[^>]*>)?/ig, "[quote]$1[/quote]");
		str = str.replace(/<div[^>]*blockcode[^>]*><blockquote>([\s\S]*?)<\/blockquote><\/div>([\s\S]*?)(<br[^>]*>)?/ig, "[code]$1[/code]");

		str = recursion('b', str, 'simpletag', 'b');
		str = recursion('strong', str, 'simpletag', 'b');

		str = recursion('i', str, 'simpletag', 'i');
		str = recursion('em', str, 'simpletag', 'i');
		str = recursion('u', str, 'simpletag', 'u');
		str = recursion('strike', str, 'simpletag', 's');
		str = recursion('a', str, 'atag');
		str = recursion('font', str, 'fonttag');
		str = recursion('blockquote', str, 'simpletag', 'indent');
		str = recursion('ol', str, 'listtag');
		str = recursion('ul', str, 'listtag');
		str = recursion('div', str, 'dstag');
		str = recursion('p', str, 'ptag');
		str = recursion('span', str, 'fonttag');
	}

	str = str.replace(/<[\/\!]*?[^<>]*?>/ig, '');

	for(var i = 0; i <= DISCUZCODE['num']; i++) {
		str = str.replace("[\tDISCUZ_CODE_" + i + "\t]", DISCUZCODE['html'][i]);
	}
	str = clearcode(str);

	return preg_replace(['&nbsp;', '&lt;', '&gt;', '&amp;'], [' ', '<', '>', '&'], str);
}

function tablesimple(s, table, str) {
	if(strpos(str, '[tr=') || strpos(str, '[td=')) {
		return s;
	} else {
		return '[table=' + table + ']\n' + preg_replace(['\\\[tr\\\]', '\\\[\\\/td\\\]\\\s?\\\[td\\\]', '\\\[\\\/tr\\\]\s?', '\\\[td\\\]', '\\\[\\\/td\\\]', '\\\[\\\/td\\\]\\\[\\\/tr\\\]'], ['', '|', '', '', '', '', ''], str) + '[/table]';
	}
}

function imgtag(attributes) {
	var width = '';
	var height = '';

	re = /src=(["']?)([\s\S]*?)(\1)/i;
	var matches = re.exec(attributes);
	if(matches != null) {
		var src = matches[2];
	} else {
		return '';
	}

	re = /(max-)?width\s?:\s?(\d{1,4})(px)?/i;
	var matches = re.exec(attributes);
	if(matches != null && !matches[1]) {
		width = matches[2];
	}

	re = /height\s?:\s?(\d{1,4})(px)?/i;
	var matches = re.exec(attributes);
	if(matches != null) {
		height = matches[1];
	}

	if(!width) {
		re = /width=(["']?)(\d+)(\1)/i;
		var matches = re.exec(attributes);
		if(matches != null) {
			width = matches[2];
		}
	}

	if(!height) {
		re = /height=(["']?)(\d+)(\1)/i;
		var matches = re.exec(attributes);
		if(matches != null) {
			height = matches[2];
		}
	}
	aid=0
	re = /aid=(["']?)attachimg_(\d+)(\1)/i;
	var matches = re.exec(attributes);
	if(matches != null) {
		aid=matches[2];
	}
	width = width > 0 ? width : 0;
	height = height > 0 ? height : 0;
	return width > 0 || height > 0 ?
		'[img_'+aid+'=' + width + ',' + height + ']' + src + '[/img]' :
		'[img_'+aid+']' + src + '[/img]';
}

function listtag(listoptions, text, tagname) {
	text = text.replace(/<li>(([\s\S](?!<\/li))*?)(?=<\/?ol|<\/?ul|<li|\[list|\[\/list)/ig, '<li>$1</li>') + (BROWSER.opera ? '</li>' : '');
	text = recursion('li', text, 'litag');
	var opentag = '[list]';
	var listtype = fetchoptionvalue('type=', listoptions);
	listtype = listtype != '' ? listtype : (tagname == 'ol' ? '1' : '');
	if(in_array(listtype, ['1', 'a', 'A'])) {
		opentag = '[list=' + listtype + ']';
	}
	return text ? opentag + '\n' + recursion(tagname, text, 'listtag') + '[/list]' : '';
}

function litag(listoptions, text) {
	return '[*]' + text.replace(/(\s+)$/g, '') + '\n';
}

function parsecode(text) {
	DISCUZCODE['num']++;
	DISCUZCODE['html'][DISCUZCODE['num']] = '<div class="blockcode"><blockquote>' + htmlspecialchars(text) + '</blockquote></div>';
	return "[\tDISCUZ_CODE_" + DISCUZCODE['num'] + "\t]";
}

function parsestyle(tagoptions, prepend, append) {
	var searchlist = [
		['align', true, 'text-align:\\s*(left|center|right);?', 1],
		['float', true, 'float:\\s*(left|right);?', 1],
		['color', true, '(^|[;\\s])color:\\s*([^;]+);?', 2],
		['backcolor', true, '(^|[;\\s])background-color:\\s*([^;]+);?', 2],
		['font', true, 'font-family:\\s*([^;]+);?', 1],
		['size', true, 'font-size:\\s*(\\d+(\\.\\d+)?(px|pt|in|cm|mm|pc|em|ex|%|));?', 1],
		['size', true, 'font-size:\\s*(x\\-small|small|medium|large|x\\-large|xx\\-large|\\-webkit\\-xxx\\-large);?', 1, 'size'],
		['b', false, 'font-weight:\\s*(bold);?'],
		['i', false, 'font-style:\\s*(italic);?'],
		['u', false, 'text-decoration:\\s*(underline);?'],
		['s', false, 'text-decoration:\\s*(line-through);?']
	];
	var sizealias = {'x-small':1,'small':2,'medium':3,'large':4,'x-large':5,'xx-large':6,'-webkit-xxx-large':7};
	var style = getoptionvalue('style', tagoptions);
	re = /^(?:\s|)color:\s*rgb\((\d+),\s*(\d+),\s*(\d+)\)(;?)/i;
	style = style.replace(re, function($1, $2, $3, $4, $5) {return("color:#" + parseInt($2).toString(16) + parseInt($3).toString(16) + parseInt($4).toString(16) + $5);});
	var len = searchlist.length;
	for(var i = 0; i < len; i++) {
		searchlist[i][4] = !searchlist[i][4] ? '' : searchlist[i][4];
		re = new RegExp(searchlist[i][2], "ig");
		match = re.exec(style);
		if(match != null) {
			opnvalue = match[searchlist[i][3]];
			if(searchlist[i][4] == 'size') {
				opnvalue = sizealias[opnvalue];
			}
			prepend += '[' + searchlist[i][0] + (searchlist[i][1] == true ? '=' + opnvalue + ']' : ']');
			append = '[/' + searchlist[i][0] + ']' + append;
		}
	}
	return {'prepend' : prepend, 'append' : append};
}

function parsetable(width, bgcolor, str) {

	if(isUndefined(width)) {
		var width = '';
	} else {
		try {
			width = width.substr(width.length - 1, width.length) == '%' ? (width.substr(0, width.length - 1) <= 98 ? width : '98%') : (width <= 560 ? width : '98%');
		} catch(e) { width = ''; }
	}
	if(isUndefined(str)) {
		return;
	}
	if(strpos(str, '[/tr]') === false && strpos(str, '[/td]')){
		str='[tr]'+str+'[/tr]';
	}
	if(strpos(str, '[/tr]') === false && strpos(str, '[/td]') === false) {

		var rows = str.split('\n');
		var s = '';
		for(i = 0;i < rows.length;i++) {
			s += '<tr><td>' + preg_replace(['\r', '\\\\\\\|', '\\\|', '\\\\n'], ['', '&#124;', '</td><td>', '\n'], rows[i]) + '</td></tr>';
		}
		str = s;
		simple = ' simpletable';
	} else {
		simple = '';
		str = str.replace(/\[tr(?:=([\(\)\s%,#\w]+))?\]\s*\[td(?:=(\d{1,4}%?))?\]/ig, function($1, $2, $3) {
			return '<tr' + ($2 ? ' style="background-color: ' + $2 + '"' : '') + '><td' + ($3 ? ' width="' + $3 + '"' : '') + '>';
		});
		str = str.replace(/\[tr(?:=([\(\)\s%,#\w]+))?\]\s*\[td(?:=(\d{1,2}),(\d{1,2})(?:,(\d{1,4}%?))?)?\]/ig, function($1, $2, $3, $4, $5) {
			return '<tr' + ($2 ? ' style="background-color: ' + $2 + '"' : '') + '><td' + ($3 ? ' colspan="' + $3 + '"' : '') + ($4 ? ' rowspan="' + $4 + '"' : '') + ($5 ? ' width="' + $5 + '"' : '') + '>';
		});
		str = str.replace(/\[\/td\]\s*\[td(?:=(\d{1,4}%?))?\]/ig, function($1, $2) {
			return '</td><td' + ($2 ? ' width="' + $2 + '"' : '') + '>';
		});
		str = str.replace(/\[\/td\]\s*\[td(?:=(\d{1,2}),(\d{1,2})(?:,(\d{1,4}%?))?)?\]/ig, function($1, $2, $3, $4) {
			return '</td><td' + ($2 ? ' colspan="' + $2 + '"' : '') + ($3 ? ' rowspan="' + $3 + '"' : '') + ($4 ? ' width="' + $4 + '"' : '') + '>';
		});
		str = str.replace(/\[\/td\]\s*\[\/tr\]\s*/ig, '</td></tr>');
		str = str.replace(/<td> <\/td>/ig, '<td>&nbsp;</td>');
	}
	return '<table ' + (width == '' ? '' : 'width="' + width + '" ') + 'class="t_table"' + (isUndefined(bgcolor) ? '' : ' style="background-color: ' + bgcolor + '"') + simple +'>' + str + '</table>';
}

function preg_quote(str) {
	return (str+'').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!<>\|\:])/g, "\\$1");
}

function recursion(tagname, text, dofunction, extraargs) {
	if(extraargs == null) {
		extraargs = '';
	}
	tagname = tagname.toLowerCase();

	var open_tag = '<' + tagname;
	var open_tag_len = open_tag.length;
	var close_tag = '</' + tagname + '>';
	var close_tag_len = close_tag.length;
	var beginsearchpos = 0;

	do {
		var textlower = text.toLowerCase();
		var tagbegin = textlower.indexOf(open_tag, beginsearchpos);
		if(tagbegin == -1) {
			break;
		}

		var strlen = text.length;

		var inquote = '';
		var found = false;
		var tagnameend = false;
		var optionend = 0;
		var t_char = '';

		for(optionend = tagbegin; optionend <= strlen; optionend++) {
			t_char = text.charAt(optionend);
			if((t_char == '"' || t_char == "'") && inquote == '') {
				inquote = t_char;
			} else if((t_char == '"' || t_char == "'") && inquote == t_char) {
				inquote = '';
			} else if(t_char == '>' && !inquote) {
				found = true;
				break;
			} else if((t_char == '=' || t_char == ' ') && !tagnameend) {
				tagnameend = optionend;
			}
		}

		if(!found) {
			break;
		}
		if(!tagnameend) {
			tagnameend = optionend;
		}

		var offset = optionend - (tagbegin + open_tag_len);
		var tagoptions = text.substr(tagbegin + open_tag_len, offset);
		var acttagname = textlower.substr(tagbegin * 1 + 1, tagnameend - tagbegin - 1);

		if(acttagname != tagname) {
			beginsearchpos = optionend;
			continue;
		}

		var tagend = textlower.indexOf(close_tag, optionend);
		if(tagend == -1) {
			break;
		}

		var nestedopenpos = textlower.indexOf(open_tag, optionend);
		while(nestedopenpos != -1 && tagend != -1) {
			if(nestedopenpos > tagend) {
				break;
			}
			tagend = textlower.indexOf(close_tag, tagend + close_tag_len);
			nestedopenpos = textlower.indexOf(open_tag, nestedopenpos + open_tag_len);
		}

		if(tagend == -1) {
			beginsearchpos = optionend;
			continue;
		}

		var localbegin = optionend + 1;
		var localtext = eval(dofunction)(tagoptions, text.substr(localbegin, tagend - localbegin), tagname, extraargs);

		text = text.substring(0, tagbegin) + localtext + text.substring(tagend + close_tag_len);

		beginsearchpos = tagbegin + localtext.length;

	} while(tagbegin != -1);

	return text;
}

function simpletag(options, text, tagname, parseto) {
	if(trim(text) == '') {
		return '';
	}
	text = recursion(tagname, text, 'simpletag', parseto);
	return '[' + parseto + ']' + text + '[/' + parseto + ']';
}

function smileycode(smileyid) {
	if(typeof smilies_type != 'object') return;
	for(var typeid in smilies_array) {
		for(var page in smilies_array[typeid]) {
			for(var i in smilies_array[typeid][page]) {
				if(smilies_array[typeid][page][i][0] == smileyid) {
					return smilies_array[typeid][page][i][1];
					break;
				}
			}
		}
	}
}

function strpos(haystack, needle, _offset) {
	if(isUndefined(_offset)) {
		_offset = 0;
	}

	var _index = haystack.toLowerCase().indexOf(needle.toLowerCase(), _offset);

	return _index == -1 ? false : _index;
}

function tabletag(attributes) {
	var width = '';
	re = /width=(["']?)(\d{1,4}%?)(\1)/i;
	var matches = re.exec(attributes);

	if(matches != null) {
		width = matches[2].substr(matches[2].length - 1, matches[2].length) == '%' ?
			(matches[2].substr(0, matches[2].length - 1) <= 98 ? matches[2] : '98%') :
			(matches[2] <= 560 ? matches[2] : '98%');
	} else {
		re = /width\s?:\s?(\d{1,4})([px|%])/i;
		var matches = re.exec(attributes);
		if(matches != null) {
			width = matches[2] == '%' ? (matches[1] <= 98 ? matches[1] + '%' : '98%') : (matches[1] <= 560 ? matches[1] : '98%');
		}
	}

	var bgcolor = '';
	re = /(?:background|background-color|bgcolor)[:=]\s*(["']?)((rgb\(\d{1,3}%?,\s*\d{1,3}%?,\s*\d{1,3}%?\))|(#[0-9a-fA-F]{3,6})|([a-zA-Z]{1,20}))(\1)/i;
	var matches = re.exec(attributes);
	if(matches != null) {
		bgcolor = matches[2];
		width = width ? width : '98%';
	}

	return bgcolor ? '[table=' + width + ',' + bgcolor + ']\n' : (width ? '[table=' + width + ']\n' : '[table]\n');
}

function tdtag(attributes) {

	var colspan = 1;
	var rowspan = 1;
	var width = '';

	re = /colspan=(["']?)(\d{1,2})(\1)/i;
	var matches = re.exec(attributes);
	if(matches != null) {
		colspan = matches[2];
	}

	re = /rowspan=(["']?)(\d{1,2})(\1)/i;
	var matches = re.exec(attributes);
	if(matches != null) {
		rowspan = matches[2];
	}

	re = /width=(["']?)(\d{1,4}%?)(\1)/i;
	var matches = re.exec(attributes);
	if(matches != null) {
		width = matches[2];
	}

	return in_array(width, ['', '0', '100%']) ?
		(colspan == 1 && rowspan == 1 ? '[td]' : '[td=' + colspan + ',' + rowspan + ']') :
		(colspan == 1 && rowspan == 1 ? '[td=' + width + ']' : '[td=' + colspan + ',' + rowspan + ',' + width + ']');
}

if(typeof jsloaded == 'function') {
	jsloaded('bbcode');
}
var HtmlUtil = {
	htmlEncode:function (html){
		var temp = document.createElement ("div");
		(temp.textContent != undefined ) ? (temp.textContent = html) : (temp.innerText = html);
		var output = temp.innerHTML;
		temp = null;
		return output;
	},
	htmlDecode:function (text){
		var temp = document.createElement("div");
		temp.innerHTML = text;
		var output = temp.innerText || temp.textContent;
		temp = null;
		return output;
	}
};
function getdatetimestamp() {
	return Math.floor((new Date()).getTime() / 86400000) * 86400+time_zone*3600
}
function timestamp() {
	return Math.floor((new Date()).getTime() / 1000);
}
function tpl_click(href){
	var tplname=href.match(/\?tpl=([^&]+)/);
	if(tplname.length!=2){
		return
	}
	var v=href.split('&'),obj={}
	for(var i=1;i<v.length;i++){
		s=v[i].split('=')
		if(s.length==2){
			obj[s[0]]=s[1]
		}
	}
	tpl_load(tplname[1],eval('WRITE_MSG_U2WS_'+tplname[1]),obj)
}
function tpl_susess(result) {
	if(typeof tpl_callback=="undefined"){
		url = document.location.origin+ document.location.pathname+'?tpl=' + tplname
		for(var i in tpl_indata){
			if(tpl_indata[i] || tpl_indata[i]===0) url+="&"+i+"="+encodeURIComponent(tpl_indata[i])
		}
		oldtplname=GET('tpl')
		if(url!=document.location.href){
			//saveUserdata('login_ref',document.location.search)
			h5state.url=url;
			history.pushState(h5state, null, document.location.href);
		}
	}
	if(!h5state.url) h5state.url=document.location.href;
	h5state.tn = tplname;  
	h5state.td = result;
	td=true
	if(js && tpl && td) maintpl(h5state.td, h5state.tn,true);
}
websocket_func[CMD_MSG_WS2U_tpl_load_js]=function(res){
	h5state.j = '<script type="text/javascript">'+res.Result+'</script>';
	js=true;
	if(js && tpl && td) maintpl(h5state.td, res.Name,true);
}

var tpl_indata;
function tpl_load(name,fn,data,callback) {
	tpl_callback=callback
	tplname=name;
	if(load_start==0){
		load_start=new Date().getTime()/1000;
	}
	tpl_indata=data
	tpl=true,js=false,td=false
	$('#fwin_dialog').hide();
	var b=[];
	if(fn){
		b=fn(data);
	}else{
		b=WRITE_MSG_U2WS_tpl_success({});
	}
	if(!$('tpl_'+tplname)){
		tpl=false
		getTemplateByname(tplname)
	}
	b=b.concat(WRITE_MSG_U2WS_tpl_load_js({Name:tplname}))
	ajax_post(b)
}

function maintpl(data, u,replace) {
	//var load_end=new Date().getTime()/1000;
	//$('.time_info').html('msg ok '+(load_end-load_start).toFixed(3)+"(s)")
	$('.shade').hide();
	tpldata = data;
	if(replace){
		history.replaceState(h5state, document.title, h5state.url);
	}
	var html = '';
	html = template("tpl_"+u, {
		data: data,
		cache:cache,
	});
	//var load_end=new Date().getTime()/1000;
	//$('.time_info').append('<br>tpl ok '+(load_end-load_start).toFixed(3)+"(s)")
	document.getElementById("tpl_content").innerHTML=html
	//var load_end=new Date().getTime()/1000;
	//$('.time_info').append('<br>html ok '+(load_end-load_start).toFixed(3)+"(s)")
	$('#tpl_content').append(h5state.j);
	window.scrollTo(0, 0);
	tpl=false;
	js=false;
	var load_end=new Date().getTime()/1000;
	$('.time_info').html('GMT'+(time_zone>=0?"+":"-")+time_zone+","+date("Y-m-d H:i",load_end-timestamp_offset+(time_zone-8)*3600)+"，Processed in "+(load_end-load_start).toFixed(3)+"(s)")
	load_start=0;
	if(typeof editorisfull != "undefined" && editorisfull===0){
		editorisfull=1
	}
	if(getdatetimestamp()>$('#tpl_html').attr('timestamp')){
		$('#tpl_html').html('');
		cache.todaytime=getdatetimestamp()
	}
	if(tpl_callback) tpl_callback(data);
	$('.svg-search').unbind().click(function(event) {
		window.open('/search.html?Word='+$('input[name="search"]').val())
	});
	$('input[name="search"]').keypress(function (e) {
		if(e.which == 13){
		   window.open('/search.html?Word='+$('input[name="search"]').val())
		}
	});
}
function getTemplateByname(tplname){
	jQuery.ajax({
		type: "get",
		url:   location.origin+location.pathname.replace(/\/[^\./]+.html/,"") + '/template/'+tplname+'_tpl.html?t=' + getdatetimestamp(),
		success: function (result) {
			result = result.replace('id="tpl_main"', 'id="tpl_' + tplname + '"');
			$('#tpl_html').append(result);
			tpl = true; 
			if(js && tpl && td) maintpl(h5state.td, tplname,true);
		}
	});
}
window.addEventListener('popstate',function(event){ 
	if(event && event.state){
		load_start=new Date().getTime()/1000;
		h5state=event.state;
		tpl = true;
		js =true;
		if(!$('tpl_'+h5state.tn)){
			tpl=false
			getTemplateByname(h5state.tn)
		}else{
			maintpl(h5state.td, h5state.tn,false);
		}
		
	}else{ 
		load_start=new Date().getTime()/1000;
		h5state=history.state;
		if(h5state){
			tpl = true;
			js =true;
			maintpl(h5state.td, h5state.tn,false);
		}
	} 
}); 


template.defaults.imports.console = function(v){console.log(v)};
function GET(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return decodeURIComponent(r[2]);
	return '';
}
template.defaults.imports.in_array = function(v,a){return in_array(v,a)};
template.defaults.imports.get_avatar=function(avatar,size){
	return get_avatar(avatar,size)
}
function get_avatar(avatar,size){
	return '<img src="'+webp('/static/avatar/user/'+avatar,size)+'" onerror="this.src=\'/static/image/common/noavatar.gif\'">'
}
template.defaults.imports.webp=function(f,size){
	return webp(f,size)
}
function webp(f,size) {

	if(f.indexOf('default_')>0){
		return f;
	}
	if (typeof size != "number"){
		size = 640
	}

	if (jpg_webp == '1') {
		f = f.replace('x-oss-process=style/jpg', 'x-oss-process=style/webp');
		f = f.replace(/\?x-oss-process=image\/resize,.+\/format,jpg/, '');
		if (!new RegExp(/x-oss-process=/).test(f) && !new RegExp(/webp$/).test(f)) {
			f += '?x-oss-process=style/webp-'+size
		}else{
			f=f.replace(/\?x-oss-process=style\/webp-\d+/,"?x-oss-process=style/webp-"+size)
		}
		return f;
	} else {
		f = f.replace('x-oss-process=style/webp', 'x-oss-process=style/jpg');
		f = f.replace(/\?x-oss-process=image\/resize,.+\/format,jpg/, '');
		if (!new RegExp(/x-oss-process=/).test(f) && new RegExp(/webp$/).test(f)) {
			f += '?x-oss-process=style/jpg-'+size
		}
		return f;
	}
}
function textencode(str){
	if(typeof TextEncoder == "undefined"){
		var back = [];
		var byteSize = 0;
		for (var i = 0; i < str.length; i++) {
			var code = str.charCodeAt(i);
			if (0x00 <= code && code <= 0x7f) {
				byteSize += 1;
				back.push(code);
			} else if (0x80 <= code && code <= 0x7ff) {
				byteSize += 2;
				back.push((192 | (31 & (code >> 6))));
				back.push((128 | (63 & code)))
			} else if ((0x800 <= code && code <= 0xd7ff) 
				|| (0xe000 <= code && code <= 0xffff)) {
				byteSize += 3;
				back.push((224 | (15 & (code >> 12))));
				back.push((128 | (63 & (code >> 6))));
				back.push((128 | (63 & code)))
			}
		}
		for (i = 0; i < back.length; i++) {
		  back[i] &= 0xff;
		}
		return back
	}else{
		return new TextEncoder().encode(str);
	}
}
function textdecode(arr){
	if(typeof TextDecoder == "undefined"){
		var str=""
		for (var i = 0; i < arr.length; i++) {
			str += String.fromCharCode(arr[i]);
		}
		return decodeURIComponent(escape(str));
	}else{
		return new TextDecoder().decode(arr);
	}
}
function logout(){
	ajax_post(WRITE_MSG_U2WS_logout({}))
}
function qqlogin(){
	ajax_post(WRITE_MSG_U2WS_QQLoginUrl({}))
}
websocket_func[CMD_MSG_WS2U_QQLoginUrl]=function(res){
	location.href=res.Url;
}
function opendiy(){
	
	$('#tpl_content').append('<script src="/static/js/common_diy.js?t=" type="text/javascript"></script><script src="/static/js/portal_diy.js?t=" type="text/javascript"></script>')
	$('#controlpanel').show();
	$("head").append('<link rel="stylesheet" type="text/css" id="diy_common" href="/data/cache/style_2_css_diy.css">')
	$("head").append('<style type="text/css">/* DIY MODE CSS STYLE */.hide { display: none; }.frame,.tab,.block { position: relative; zoom:1; min-height: 20px; }.edit { position: absolute; top: 0; right: 0; z-index: 199; padding: 0 5px; background: red; line-height: 26px; color: #FFF; cursor: pointer; }.block .edit { background: #369; }.edit-menu { position: absolute; z-index: 300; border-style: solid; border-width: 0 1px 1px 1px; border-color: #DDD #999 #999 #CCC; background: #FFF; }.mitem { padding: 4px 4px 4px 14px; width: 36px; border-top: 1px solid #DDD; cursor: pointer; }.mitem:hover { background: #F2F2F2; color: #06C; }.subtitle { margin: 0 4px; }.frame-tab .title .move-span { float: left; margin: 0 3px 0 0; padding: 0; width: 100px; border-bottom: none; cursor: pointer; }#samplepanel { background: #FFF; }.block-name { display: block; visibility: hidden; background: #000; color: #FFF; position: absolute; top: 5px; left: 5px; padding: 2px; opacity: 0.85; filter: alpha(opacity=85); z-index: 1; }</style>')
	tpl=true,js=true;
	maintpl(h5state.td, h5state.tn);
	spaceDiy.init()
}
template.defaults.imports.date= function (value,time) {
	return date(value,time);
};
function date(value,time){
	if(!time || time<=0){
		return '';
	}
	newDate = new Date();
	newDate.setTime(time * 1000);
	return newDate.format(value);
}
Date.prototype.format = function(format) {
	   var date = {
			  "m+": this.getMonth() + 1,
			  "d+": this.getDate(),
			  "h+": this.getHours(),
			  "H+": this.getHours(),
			  "i+": this.getMinutes(),
			  "s+": this.getSeconds(),
			  "q+": Math.floor((this.getMonth() + 3) / 3),
			  "S+": this.getMilliseconds(),
			  "Y+" : this.getFullYear()
	   };
	   for (var k in date) {
			  if (new RegExp("(" + k + ")").test(format)) {
					 format = format.replace(RegExp.$1, RegExp.$1.length == 1
							? ((new RegExp(/^\d$/)).test(date[k])?'0'+date[k]:date[k]) : ("00" + date[k]).substr(("" + date[k]).length));
			  }
	   }
	   return format;
}
template.defaults.imports.moddisplay=function(moderators, type, inherit) {
	var modlist='';
	if(moderators!='') {
		var comma = '';
		for(var i in moderators.split("\t")) {
			modlist += comma+'<a href="home.php?mod=space&username='+decodeURIComponent(moderator)+'" class="notabs" c="1">'+(inherit ? '<strong>'+moderator+'</strong>' : moderator)+'</a>';
			comma = ', ';
		}
	} 
	return modlist;
}
template.defaults.imports.categorycollapse=function(fid){
	return getcookie('collapse').indexOf('_category_'+fid+'_');
}
template.defaults.imports.isNewFolder=function(fid,lastpost){
	if(lastpost>0){
		var lastvisit=timestamp()-3600
		var s=new RegExp("D_"+fid+"_(\\d+)").exec(getcookie('forum_lastvisit'));
		if(s && s[1]>lastvisit){
			lastvisit=s[1]
		}
		return lastpost>lastvisit;
	}
	return false;
}
template.defaults.imports.cutstr=function(str,b,e){
	return a.substr(b,e)
}
template.defaults.imports.showimg=function(b){
	return showimg(b)
}
function showimg(b){
	binary="";
	var len = b.length;
	for (var i = 0; i < len; i++) {
		binary += String.fromCharCode(b[i]);
	}
	return 'data:image/jpeg;base64,'+window.btoa(binary);
}
template.defaults.imports.GET=function(b){
	re=GET(b)
	if(re==parseInt(re)){
		return parseInt(re)
	}
	return GET(b)
}
template.defaults.imports.getcookie=function(key){
	return getcookie(key);
}
template.defaults.imports.getstatus=function(status, position) {
	return (status>>(position-1)&1)==1;
}
template.defaults.imports.getheatlevel=function(heats){
	var level=false;
	for(var i in cache.heatthread_iconlevels){
		if(heats>=cache.heatthread_iconlevels[i]){
			level=Number(i)+1
		}
	}
	return level
}
template.defaults.imports.thread_isclosed=function(thread){
	if(tpldata.Status!=3 && (thread.Closed>0 || (tpldata.Autoclose>0 && thread.Fid == tpldata.Fid && cache.Head.Timestamp - thread.Dateline > tpldata.Autoclose))) {
		if(thread.Isgroup != 1) {
			return true;
		}
	} else if(tpldata.Status == 3 && thread.Closed == 1) {
		return true;
	}
	return false;
}
template.defaults.imports.cutstr=function(str,b){
	if(str.length<b){
		return str
	}
	return str.substr(0,b)+"..."
}
template.defaults.imports.size_kb2mb=function(k){
	if(k==0) return "无限制";
	k=k/1024
	if(k<1024){
		return k+"KB";
	}
	return Math.floor(k / 10.24) / 100+"MB";
}
template.defaults.imports.thread_time=function(time){
	return thread_time(time);
}
function thread_time(time){
	var offset=Date.parse(new Date())/1000-time-timestamp_offset;
	if(offset<60){
		return parseInt(offset)+" 秒前"
	}
	if(offset<3600){
		return parseInt(offset/60)+" 分钟前"
	}
	if(offset<86400){
		return parseInt(offset/3600)+" 小时前"
	}
	if(offset<86400*2){
		return "昨天"+date("h:i",time)
	}
	if(offset<86400*3){
		return "前天"+date("h:i",time)
	}
	return date("Y-m-d h:i",time)
}
template.defaults.imports.getRecommendlevel=function(recommends){
	if(cache.recommendthread.status!=1){
		return false
	}
	for(var i in cache.recommendthread.iconlevels){
		if(recommends>=cache.recommendthread.iconlevels[i]){
			return i+1
		}
	}
	return false
}
template.defaults.imports.getModaction=function(lastmod){
	if(modactioncode[lastmod.Modactiontype]!="") {
		return  modactioncode[lastmod.Modactiontype]+(lastmod.Modactiontype != 'SPA' || !cache.stamps[lastmod.Stamp]? '' : ' '+cache.stamps[lastmod.Stamp]['text']);
	} else if(lastmod.Modactiontype.substr(0, 1) == 'L' && /L(\d\d)/.test(lastmod.Modactiontype)) {
		var id=lastmod.Modactiontype.match(/L(\d\d)/)[1];
		return modactioncode['SLA']+' '+(cache.stamps[id]?cache.stamps[id]['text']:'');
	}
	return '';
}
template.defaults.imports.viewthread_profile_node=function(post){
	//console.log(post)

}
template.defaults.imports.getreplybg=function(replybg) {
	var style = '';
	if(cache.allowreplybg) {
		if(replybg) {		
			bgurl = cache.attachurl+'common/'+replybg;
			
		} else if(cache.globalreplybg) {
			bgurl = cache.attachurl+'common/'+cache.globalreplybg;
		}
		if(bgurl) {
			style = ' style="background-image: url('+bgurl+');"';
		}
	}
	return style;
}
template.defaults.imports.viewThreadtype=function(name){
	name=name.replace(/\[color=([^\]]+)]([^[]+)\[\/color]/g,'<font color="$1">$2</font>');
	return name;
}

var allowhtml=true;
var allowbbcode=true;
var allowsmilies=true;
var allowimgcode=true;
template.defaults.imports.discuzcode=function(message,smileyoff,bbcodeoff){
	allowsmilies=smileyoff!=1;
	allowbbcode=bbcodeoff!=1;
	return bbcode2html(message);
}
template.defaults.imports.html2bbcode=function(message,smileyoff,bbcodeoff){
	allowsmilies=smileyoff!=1;
	allowbbcode=bbcodeoff!=1;
	return html2bbcode(message);
}
template.defaults.imports.encodeFastPostmsg=function(text){
	text=text.replace(/<div\sclass=["']?quote["']?>[\s\S]*?<blockquote>([\s\S]+?)<\/blockquote>[\s\S]*?<\/div>/ig,'')
	return encodeURIComponent(text)
}
template.defaults.imports.encodeURIComponent=function(text){
	return encodeURIComponent(text)
}
template.defaults.imports.decodeFastPostmsg=function(text){
	return decodeURIComponent(text)
}
template.defaults.imports.htmlDecode=function(text){
	return HtmlUtil.htmlDecode(decodeURIComponent(text))
}
template.defaults.imports.preg_replace=function(search, replace, str, regswitch){
	return preg_replace(search, replace, str, regswitch)
}
template.defaults.imports.ceil=function(value){
	return Math.ceil(value)
}
template.defaults.imports.floor=function(value){
	return Math.floor(value)
}
template.defaults.imports.JSON_stringify=function(value){
	return value?JSON.stringify(value):'{}';
}

template.defaults.imports.gethighlight=function(value){
	var s0=value%10,str=' style="'
	str += s0>>0&1 ? 'font-weight: bold;' : '';
	str += s0>>1&1 ? 'font-style: italic;' : '';
	str += s0>>2&1 ? 'text-decoration: underline;' : '';
	str += parseInt(value/10) ? 'color: '+cache.forum_colorarray[parseInt(value/10)] : '';
	return str+'"';
}
template.defaults.imports.parseInt=function(value){
	return parseInt(value)
}
template.defaults.imports.loadUserdata=loadUserdata;
template.defaults.imports.checkback=function(){
	return history.length>1
}
template.defaults.imports.getSearchSubject=function(subject,word){
	var re=new RegExp(word,'i')
	var find=re.exec(subject)
	if(find){
		subject = subject.replace(find,'<strong><font color="#ff0000">'+find+'</font></strong>');
		find=re.exec(subject)
	}
	return subject
}
template.defaults.imports.now=function(){
	return new Date().getTime()/1000-timestamp_offset
}
//按秒时间戳取差
template.defaults.imports.getTimeDiff=function(t1,t2){
	var sub=t1-t2;
	var day=Math.floor(sub/86400);
	var hoursub=sub%86400;
	var hour=Math.floor(hoursub/86400);
	var min=hoursub%60;
	var str="";
	if(day) str+=day+"天";
	if(hour) str+=hour+"小时";
	return str+min+"分钟";
}
var pollcolors = ['E92725', 'F27B21', 'F2A61F', '5AAF4A', '42C4F5', '0099CC', '3365AE', '2A3591', '592D8E', 'DB3191'];
template.defaults.imports.pollshowimgVote=function(poll,key){
    var votes=poll.Polloption[key].Votes
    var percent=Math.floor(votes*100/poll.Voterscount);
    if(isNaN(percent)) percent=0;
    var w=(percent>0)?percent:1;
    return '<div class="imgf imgf2"><span class="jdt" style="width: '+w+'%; background-color:#'+pollcolors[key]+'">&nbsp;</span><p class="imgfc"><span class="z">'+votes+'票</span><span class="y">'+percent+'% </span></p></div>';
}
template.defaults.imports.pollshowVote=function(poll,key){
	var votes=poll.Polloption[key].Votes
    var percent=Math.floor(votes*100/poll.Voterscount);
    if(isNaN(percent)) percent=0;
     var w=(percent>0)?percent:1;
    return '<td><div class="pbg"><div class="pbr" style="width: '+w+'%; background-color:#'+pollcolors[key]+'"></div></div></td><td>'+percent+'% <em style="color:#'+pollcolors[key]+'">('+votes+')</em></td>';
}
template.defaults.imports.getTrueFalseImg=function(value){
	return value?'<svg t="1575368458846" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1411" width="20" height="20" style="vertical-align: -5px;"><path d="M758.616 315.112a29.36 29.36 0 0 0-45.736-9.488L437.416 544.816a2.896 2.896 0 0 1-3.968-0.168L335.264 443.44a29.376 29.376 0 0 0-47 6.624l-28.224 52.808a29.304 29.304 0 0 0 3.072 32.32l147.512 182.344a29.272 29.272 0 0 0 22.84 10.904h0.032a29.28 29.28 0 0 0 22.848-10.968l298.648-371.256a29.096 29.096 0 0 0 3.624-31.104z" fill="#AECD42" p-id="1412"></path><path d="M433.496 740.44h-0.08a41.064 41.064 0 0 1-32.136-15.384l-147.496-182.32a41.2 41.2 0 0 1-4.328-45.528l28.224-52.8c2.04-3.816 4.624-7.248 7.688-10.208a41.136 41.136 0 0 1 28.8-11.672c11.296 0 21.84 4.464 29.704 12.568l92.176 95.016 268.96-233.552a40.88 40.88 0 0 1 9.248-6.072 40.992 40.992 0 0 1 17.848-4.072 41.6 41.6 0 0 1 37.328 23.512 41.2 41.2 0 0 1-5.152 43.872L465.696 724.992a41.04 41.04 0 0 1-32.2 15.448z m-119.328-293.92a17.296 17.296 0 0 0-15.328 9.2l-28.224 52.808a17.248 17.248 0 0 0 1.808 19.088l147.528 182.368a17.2 17.2 0 0 0 13.464 6.456v12l0.032-12a17.2 17.2 0 0 0 13.528-6.472l298.664-371.28c4.24-5.192 5.08-12.368 2.176-18.336-4.032-8.416-14.728-12.272-23.192-8.216a16.928 16.928 0 0 0-3.856 2.536l-275.488 239.2c-5.864 5.024-15.136 4.552-20.408-0.832L326.656 451.8a17.24 17.24 0 0 0-12.488-5.28z" fill="#809626" p-id="1413"></path></svg>':'<svg t="1575368479315" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1530" width="20" height="20" style="vertical-align: -5px;"><path d="M638.296 461L751.304 348a39.36 39.36 0 0 0 0-55.664L708.16 249.2a39.36 39.36 0 0 0-55.656 0L539.504 362.192 426.488 249.184a39.36 39.36 0 0 0-55.664 0.008l-43.136 43.128a39.352 39.352 0 0 0 0 55.664l113.008 113.008-113.008 113.016a39.352 39.352 0 0 0 0 55.664l43.136 43.152a39.384 39.384 0 0 0 55.664 0l113.008-113.016 113 113.016a39.392 39.392 0 0 0 55.672 0l43.144-43.152a39.376 39.376 0 0 0 0-55.672L638.296 461z" fill="#E22D2D" p-id="1531"></path><path d="M680.336 692.336a47.12 47.12 0 0 1-33.496-13.856L539.504 571.12l-107.36 107.36c-8.944 8.936-20.832 13.856-33.488 13.856s-24.544-4.92-33.488-13.856l-43.144-43.152a47.04 47.04 0 0 1-13.872-33.496c0-12.648 4.928-24.544 13.872-33.488l107.352-107.36-107.344-107.344a47.04 47.04 0 0 1-13.872-33.488c0-12.656 4.928-24.544 13.872-33.496l43.136-43.128a47.024 47.024 0 0 1 33.496-13.872c12.648 0 24.536 4.928 33.48 13.864l107.36 107.36 107.344-107.336c8.936-8.944 20.832-13.864 33.488-13.864s24.544 4.92 33.488 13.864l43.152 43.136a47.416 47.416 0 0 1 0 66.976L649.608 461l107.36 107.344a47.408 47.408 0 0 1 0 66.984l-43.144 43.152a47.088 47.088 0 0 1-33.488 13.856z m-140.832-143.84L658.16 667.168c11.84 11.832 32.512 11.832 44.36 0l43.144-43.152a31.416 31.416 0 0 0 0-44.36L626.984 461l118.664-118.656a31.408 31.408 0 0 0 0-44.352l-43.152-43.136c-11.832-11.84-32.512-11.84-44.344 0L539.504 373.504 420.832 254.84c-11.848-11.848-32.504-11.848-44.352 0.008l-43.136 43.128a31.144 31.144 0 0 0-9.184 22.176c0 8.376 3.264 16.248 9.184 22.168l118.664 118.664-118.664 118.68a31.12 31.12 0 0 0-9.184 22.168c0 8.384 3.264 16.256 9.184 22.176l43.136 43.152c11.84 11.832 32.504 11.832 44.352 0l118.672-118.664z" fill="#AF3737" p-id="1532"></path></svg>';
}
var modactioncode={
	"EDT": "编辑",
	"DEL": "删除",
	"DLP": "删除回复",
	"DCM": "删除点评",
	"PRN": "批量删帖",
	"UDL": "反删除",
	"DIG": "加入精华",
	"UDG": "解除精华",
	"EDI": "限时精华",
	"UED": "解除限时精华",
	"CLS": "关闭",
	"OPN": "打开",
	"ECL": "限时关闭",
	"UEC": "解除限时关闭",
	"EOP": "限时打开",
	"UEO": "解除限时打开",
	"STK": "置顶",
	"UST": "解除置顶",
	"EST": "限时置顶",
	"UES": "解除限时置顶",
	"SPL": "分割",
	"MRG": "合并",
	"HLT": "设置高亮",
	"UHL": "解除高亮",
	"EHL": "限时高亮",
	"UEH": "解除限时高亮",
	"BMP": "提升",
	"DWN": "下沉",
	"MOV": "移动",
	"MIR": "镜像",
	"CPY": "复制",
	"TYP": "分类",
	"TAG": "修改标签",
	"RFD": "强制退款",
	"MOD": "审核通过",
	"ABL": "加入文集",
	"RBL": "移除文集",
	"PTS": "推送主题",
	"RFS": "解除推送",
	"RMR": "取消悬赏",
	"BNP": "屏蔽帖子",
	"UBN": "解除屏蔽",
	"REC": "推荐",
	"URE": "解除推荐",
	"WRN": "警告",
	"UWN": "解除警告",
	"SPA": "添加图章",
	"SPD": "撤销图章",
	"SLA": "添加图标",
	"SLD": "撤销图标",
	"REG": "群组推荐",
	"PTA": "生成文章",
	"MAG": "道具",
	"REB": "推送",
	"LIV": "直播",
	"LIC": "取消直播",}
//cache_out
cache.stamps={"1": {url:"001.gif",text:"精华",type:"stamp",icon:"0"}, 
"2": {url:"002.gif",text:"热帖",type:"stamp",icon:"0"}, 
"3": {url:"003.gif",text:"美图",type:"stamp",icon:"0"}, 
"4": {url:"004.gif",text:"优秀",type:"stamp",icon:"0"}, 
"5": {url:"005.gif",text:"置顶",type:"stamp",icon:"0"}, 
"6": {url:"006.gif",text:"推荐",type:"stamp",icon:"0"}, 
"7": {url:"007.gif",text:"原创",type:"stamp",icon:"0"}, 
"8": {url:"008.gif",text:"版主推荐",type:"stamp",icon:"0"}, 
"9": {url:"009.gif",text:"爆料",type:"stamp",icon:"0"}, 
"10": {url:"001.small.gif",text:"精华",type:"stamplist",icon:"1"}, 
"11": {url:"002.small.gif",text:"热帖",type:"stamplist",icon:"1"}, 
"12": {url:"003.small.gif",text:"美图",type:"stamplist",icon:"1"}, 
"13": {url:"004.small.gif",text:"优秀",type:"stamplist",icon:"1"}, 
"14": {url:"005.small.gif",text:"置顶",type:"stamplist",icon:"1"}, 
"15": {url:"006.small.gif",text:"推荐",type:"stamplist",icon:"1"}, 
"16": {url:"007.small.gif",text:"原创",type:"stamplist",icon:"1"}, 
"17": {url:"008.small.gif",text:"版主推荐",type:"stamplist",icon:"1"}, 
"18": {url:"009.small.gif",text:"爆料",type:"stamplist",icon:"1"}, 
"19": {url:"010.small.gif",text:"编辑采用",type:"stamplist",icon:"1"}, 
"20": {url:"010.gif",text:"编辑采用",type:"stamp",icon:"0"}, 
"21": {url:"011.small.gif",text:"新人帖",type:"stamplist",icon:"1"}};
cache.extcredits={"1":{"img":"","title":"威望","unit":"","ratio":0,"showinthread":null,"allowexchangein":null,"allowexchangeout":null},"2":{"img":"","title":"金钱","unit":"","ratio":0,"showinthread":null,"allowexchangein":null,"allowexchangeout":null},3:{"img":"","title":"贡献","unit":"","ratio":0,"showinthread":null,"allowexchangein":null,"allowexchangeout":null}}
cache.creditstransextra={"1":"2","2":"2","3":"2","4":"2","5":"2","6":"2","7":"2","8":"2","9":"2","10":"2"}
cache.heatthread_iconlevels=[50,100,200];
cache.threadsticky=['全局置顶','分类置顶','本版置顶'];
cache.sitemessage={"time":3000,"register":[],"login":[],"newthread":["欢迎查看"],"reply":["回复1","回复2"]}
cache.editoroptions=7;
cache.minpostsize=10;
cache.maxpostsize=10000;
cache.secqaa={minposts:1,status:2};
cache.magicstatus=0;
cache.groupreadaccess=[{"groupid":"7","readaccess":"1","grouptitle":"游客"},{"groupid":"10","readaccess":"10","grouptitle":"新手上路"},{"groupid":"11","readaccess":"20","grouptitle":"注册会员"},{"groupid":"12","readaccess":"30","grouptitle":"中级会员"},{"groupid":"13","readaccess":"50","grouptitle":"高级会员"},{"groupid":"14","readaccess":"70","grouptitle":"金牌会员"},{"groupid":"15","readaccess":"90","grouptitle":"论坛元老"},{"groupid":"16","readaccess":"100","grouptitle":"实习版主"},{"groupid":"19","readaccess":"100","grouptitle":"审核员"},{"groupid":"3","readaccess":"100","grouptitle":"版主"},{"groupid":"2","readaccess":"150","grouptitle":"超级版主"},{"groupid":"17","readaccess":"150","grouptitle":"网站编辑"},{"groupid":"18","readaccess":"200","grouptitle":"信息监察员"},{"groupid":"1","readaccess":"200","grouptitle":"管理员"}];
cache.privacy={"view":{"index":0,"friend":0,"wall":0,"home":0,"doing":0,"blog":0,"album":0,"share":0},"feed":{"doing":1,"blog":1,"upload":1,"poll":1,"newthread":1},"profile":{"field1":"0"}}
cache.editperdel=1;
cache.smcols=8;
cache.maxincperthread=0;
cache.allowattachurl=0;
cache.creditstax=0.2;
cache.forumpicstyle={thumbheight:0,thumbwidth:0};
cache.recommendthread={status:1,iconlevels:[50,100,200],addtext:"支持",subtracttext:"反对",daycount:0,ownthread:0};

cache.bannedmessages=12;
cache.close_leftinfo_userctrl=0;
cache.visitedforums=10;
cache.fastsmilies=1;

cache.authoronleft=1;
cache.showsettings=7;
cache.threadguestlite=0;
cache.custominfo={postno:{"0":"#","1":"楼主","2":"沙发","3":"板凳","4":"地板"}}
cache.groupicon={"1":"online_admin.gif","2":"online_supermod.gif","3":"online_moderator.gif","0":"online_member.gif"}
cache.mobile={mobilecomefrom:""}
cache.guestviewthumb={flag:0,width:100,height:100}
cache.guesttipsinthread={flag:0}
cache.reglinkname='立即注册'
cache.imagelistthumb=0
cache.allowfastreply=0
cache.fastpost=1
cache.commentnumber=5
cache.ratelogon=1
cache.maxsigrows=100
cache.globalsightml=""
cache.postappend=0
cache.repliesrank=1
cache.filterednovote=1
cache.rewardexpiration=30
cache.lazyload=0
cache.allowreplybg=0
cache.postperpage=10
cache.leftsidewidth=0
cache.forumseparator=1;
cache.forumdisplaythreadpreview=1;
cache.topicperpage=20;
cache.modreasons=["广告/SPAM","恶意灌水","违规内容","文不对题","重复发帖","--------","我很赞同","精品文章","原创内容"];
cache.sendmailinterval=5;
cache.maxpolloptions=20;
