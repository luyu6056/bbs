var blockclass={};
blockclass.forum={};
blockclass.forum.name='论坛类';
blockclass.forum.subs={};
blockclass.forum.subs.forum_thread={};
blockclass.forum.subs.forum_thread.name="帖子模块";
blockclass.forum.subs.forum_thread.fields={"id":{name:"数据ID",formtype:"text",datatype:"int"},"url":{name:"帖子URL",formtype:"text",datatype:"string"},"title":{name:"帖子标题",formtype:"title",datatype:"title"},"pic":{name:"附件图片",formtype:"pic",datatype:"pic"},"summary":{name:"帖子内容",formtype:"summary",datatype:"summary"},"author":{name:"楼主",formtype:"text",datatype:"string"},"authorid":{name:"楼主UID",formtype:"text",datatype:"int"},"avatar":{name:"楼主头像",formtype:"text",datatype:"string"},"avatar_middle":{name:"楼主头像(中)",formtype:"text",datatype:"string"},"avatar_big":{name:"楼主头像(大)",formtype:"text",datatype:"string"}, "forumurl":{name:"版块URL",formtype:"text",datatype:"string"},"forumname":{name:"版块名称",formtype:"text",datatype:"string"},"typename":{name:"主题分类名称",formtype:"text",datatype:"string"},"typeicon":{name:"主题分类图标",formtype:"text",datatype:"string"}, "typeurl":{name:"主题分类URL",formtype:"text",datatype:"string"},"sortname":{name:"分类信息名称",formtype:"text",datatype:"string"},"sorturl":{name:"分类信息URL",formtype:"text",datatype:"string"},"posts":{name:"总发帖数",formtype:"text",datatype:"int"}, "todayposts":{name:"今日发帖数",formtype:"text",datatype:"int"},"lastposter":{name:"最后回复作者",formtype:"string",datatype:"string"}, "lastpost":{name:"最后回复时间",formtype:"date",datatype:"date"},"dateline":{name:"发帖时间",formtype:"date",datatype:"date"},"replies":{name:"回复数",formtype:"text",datatype:"int"},"views":{name:"总浏览数",formtype:"text",datatype:"int"}, "heats":{name:"热度值",formtype:"text",datatype:"int"},"recommends":{name:"推荐数",formtype:"text",datatype:"int"},};
blockclass.forum.subs.forum_thread.script={threadhot:"热门帖",threadspecial:"特殊主题帖",threadspecified:"指定帖子",threadstick:"置顶帖",threadnew:"最新帖",threaddigest:"精华帖",thread:"高级自定义",}
blockclass.member={};
blockclass.member.name='会员类';
blockclass.member.subs={};
blockclass.member.subs.member_member={name:"会员模块",fields:{id:{name:"数据ID",formtype:"text",datatype:"int",},url:{name:"空间链接",formtype:"text",datatype:"string",},title:{name:"用户名",formtype:"title",datatype:"title",},avatar:{name:"用户头像",formtype:"text",datatype:"string",},avatar_middle:{name:"用户头像(中}",formtype:"text",datatype:"string",},avatar_big:{name:"用户头像(大}",formtype:"text",datatype:"string",},regdate:{name:"注册时间",formtype:"date",datatype:"date",},posts:{name:"发帖数",formtype:"text",datatype:"int",},threads:{name:"主题数",formtype:"text",datatype:"int",},digestposts:{name:"精华帖数",formtype:"text",datatype:"int",},credits:{name:"积分数",formtype:"text",datatype:"int",},reason:{name:"推荐原因",formtype:"text",datatype:"string",},unitprice:{name:"竟价单次访问单价",formtype:"text",datatype:"int",},showcredit:{name:"竟价总积分",formtype:"text",datatype:"int",},shownote:{name:"竟价上榜宣言",formtype:"text",datatype:"string",},extcredits1:{name:"威望",formtype:"text",datatype:"int",},extcredits2:{name:"金钱",formtype:"text",datatype:"int",},extcredits3:{name:"贡献",formtype:"text",datatype:"int",},constellation:{name:"星座",formtype:"text",datatype:"string",},zodiac:{name:"生肖",formtype:"text",datatype:"string",},telephone:{name:"固定电话",formtype:"text",datatype:"string",},mobile:{name:"手机",formtype:"text",datatype:"string",},idcardtype:{name:"证件类型",formtype:"text",datatype:"string",},idcard:{name:"证件号",formtype:"text",datatype:"string",},address:{name:"邮寄地址",formtype:"text",datatype:"string",},zipcode:{name:"邮编",formtype:"text",datatype:"string",},birthprovince:{name:"出生省份",formtype:"text",datatype:"string",},birthcity:{name:"出生地",formtype:"text",datatype:"string",},birthdist:{name:"出生县",formtype:"text",datatype:"string",},birthcommunity:{name:"出生小区",formtype:"text",datatype:"string",},resideprovince:{name:"居住省份",formtype:"text",datatype:"string",},residecity:{name:"居住地",formtype:"text",datatype:"string",},residedist:{name:"居住县",formtype:"text",datatype:"string",},residecommunity:{name:"居住小区",formtype:"text",datatype:"string",},graduateschool:{name:"毕业学校",formtype:"text",datatype:"string",},education:{name:"学历",formtype:"text",datatype:"string",},company:{name:"公司",formtype:"text",datatype:"string",},occupation:{name:"职业",formtype:"text",datatype:"string",},position:{name:"职位",formtype:"text",datatype:"string",},revenue:{name:"年收入",formtype:"text",datatype:"string",},affectivestatus:{name:"情感状态",formtype:"text",datatype:"string",},lookingfor:{name:"交友目的",formtype:"text",datatype:"string",},bloodtype:{name:"血型",formtype:"text",datatype:"string",},alipay:{name:"支付宝",formtype:"text",datatype:"string",},qq:{name:"QQ",formtype:"text",datatype:"string",},msn:{name:"MSN",formtype:"text",datatype:"string",},taobao:{name:"阿里旺旺",formtype:"text",datatype:"string",},site:{name:"个人主页",formtype:"text",datatype:"string",},bio:{name:"自我介绍",formtype:"text",datatype:"string",},interest:{name:"兴趣爱好",formtype:"text",datatype:"string",},realname:{name:"真实姓名",formtype:"text",datatype:"string",},birthyear:{name:"出生年份",formtype:"text",datatype:"string",},birthmonth:{name:"出生月份",formtype:"text",datatype:"string",},birthday:{name:"生日",formtype:"text",datatype:"string",},gender:{name:"性别",formtype:"text",datatype:"string",}},script:{memberspecified:"指定用户",membercredit:"积分排行",membernew:"新会员",memberspecial:"特殊会员",membershow:"竞价排行",member:"高级自定义",memberposts:"发帖排行",}}
blockclass.html={}
blockclass.html.name="展示类";
blockclass.html.subs={}
blockclass.html.subs.html_html={name:"静态模块",fields: {},script : {adv:"站点广告",search:"搜索条",vedio:"网络视频",friendlink:"友情链接",stat:"数据统计",line:"分割线",blank:"自定义HTML",forumtree:"版块列表",sort:"分类信息",banner:"图片横幅",google:"GOOGLE"}}

function getBlock(block,hidediv){
	var str='';
	if(hidediv && hidediv==true) {

		str+= block.Summary;
		str += block_template(block);
	} else {
		if($('#controlpanel').css('display')!='none'){
			str+='<div class="block-name" style="visibility: hidden; display: none;">'+block.Name+' (ID:'+block.Bid+')</div>';
		}
		
		str += block.Title;
		str += '<div id="portal_block_'+block.Bid+'_content" class="dxb_bc">';

		if(block.Summary!="") {
			str += '<div class="portal_block_summary">'+block.Summary+'</div>';
		}
		
		str += block_template(block);
		str += '</div>';
	}
	return str
}
function block_template(block) {
	var name=block.Blockclass.split("_")
	var theclass = blockclass[name[0]].subs[block.Blockclass]
	var template = block_build_template(block.Style.Template);

	if(block.Itemlist && block.Itemlist.length>0) {
		if(block.Style.Moreurl==1) {
			template = template.replace('{moreurl}','portal.php?mod=block&bid='+block.Bid);
		}
		var fields = {picwidth:{},picheight:{},target:{},currentorder:{}},order = 0,dynamicparts = {};
		if(block.Hidedisplay==1) {
			for(var i in theclass.fields){
				fields.i=theclass.fields[i]
			}
		} else {
			block.Style.Fields = block.Style.Fields.length>0 ? block.Style.Fields : block_parse_fields(template);
			for(var i in block.Style.Fields) {
				if(theclass.fields[block.Style.Fields[i]]) {
					fields[block.Style.Fields[i]] = theclass.fields[block.Style.Fields[i]];
				}
			}
		}
		for(var i in block.Itemlist) {
			var blockitem=block.Itemlist[i],rkey=[],rpattern=[],rvalue=[],rtpl=[],rkeyplug = false;
			order++;
			for(var ii in block.Style.Template.Index){
				var v=block.Style.Template.Index[ii]
				if(v.Order==order){
					rkey.push('index_'+order);
					rpattern.push('/\s*\[index='+order+'\](.*?)\[\/index\]\s*/is')
					rvalue.push('');
					rtpl.push = v.Value;
				}
			}
			if(rkey.lenth==0) {
				rkey.push('loop');
				rpattern.push('/\s*\[loop\](.*?)\[\/loop\]\s*/is');
				dynamicparts.loop?rvalue.push(dynamicparts.loop):rvalue.push('');
				var add = null;
				for(var ii in block.Style.Template.Order.Order){
					if(block.Style.Template.Order.Order[ii].Key==order){
						add=block.Style.Template.Order.Order[ii].value;
					}
				}
				if(add!=null) {
					rtpl.push(add);
				} else if(block.Style.Template.Order.Odd!="" && ($order % 2 == 1)) {
					rtpl.push(block.Style.Template.Order.Odd);
				} else if(block.Style.Template.Order.Even!="" && ($order % 2 == 0)) {
					rtpl.push(block.Style.Template.Order.Even);
				} else {
					rtpl.push(block.Style.Template.Loop);
				}
			}
			for(var k in block.Style.Template.Indexplus.Order) {
				var v =block.Style.Template.Indexplus.Order[k];
				if(v.Key==order) {
					rkey.push('index'+k+'='+order);
					rkeyplug = true;
					rpattern.push('/\[index'+k+'='+order+'\](.*?)\[\/index'+k+'\]/is');
					rvalue.push('');
					rtpl.push(v.Value);
				}
			}
			if(rkeyplug) {
				for(var k in block.Style.Template.Loopplus) {
					var v=block.Style.Template.Loopplus[k];
					rkey.push('loop'+k);
					rpattern.push('/\s*\[loop'+k+'\](.*?)\[\/loop'+k+'\]\s*/is');
					dynamicparts['loop'+k] ?rvalue.push(dynamicparts['loop'+k][1]):rvalue.push('');
					var add = "";
					for(var ii in block.Style.Template.Orderplus){
						var vv=block.Style.Template.Orderplus[ii]
						if(vv.Key!=k){
							continue;
						}
						for(var io in vv.Order){
							if(vv.Order[io].Key==order){
								add=vv.Order[io].Value
							}
						}
						if(add!=""){
							
						} else if(vv.Odd!="" && (order % 2 == 1)) {
							add=vv.Odd;
						} else if(vv.Even!="" && (order % 2 == 0)) {
							add=vv.Even;
						}
					}
					if(add!=""){
						rtpl.push(add)
					}else{
						rtpl.push(v)
					}
				}
				
				
			}
				//$blockitem['fields']['showstyle'] = dunserialize($blockitem['showstyle']);
			
			

			blockitem['Picwidth'] = block.Picwidth>0 ? block.Picwidth : 'auto';
			blockitem['Picheight'] = block.Picheight ? block.Picheight : 'auto';
			blockitem['Target'] = block.Target!="" ? ' target="_'+block.Target+'"' : '';
			blockitem['Currentorder'] = order;
			blockitem['Parity'] = order % 2;
			var searcharr=['{Parity}'],replacearr = [blockitem['Parity']];
			for(var key in fields) {
				var field=fields[key],replacevalue = blockitem[key];
				switch(field['datatype']){
				case "int":
					replacevalue = parseInt(replacevalue);
					break;
				case "string":
					//replacevalue = preg_quote(replacevalue);
					break;
				case 'date':
					replacevalue=date(block.Dateformat,replacevalue);
					break;
				case "title":
					searcharr.push("{title-title}");
					blockitem.Fields.Fulltitle!=""?replacearr.push(blockitem.Fields.Fulltitle):replacearr.push(replacevalue);
					searcharr.push("{alt-title}");
					blockitem.Fields.Fulltitle!=""?replacearr.push(blockitem.Fields.Fulltitle):replacearr.push(replacevalue);
					var style=block_showstyle(blockitem.Showstyle, 'title');
					if(style!=""){
						replacevalue = '<font style="'+style+'">'+replacevalue+'</font>';
					}
					break;
				case "summary":
					var style=block_showstyle(blockitem.Showstyle, 'summary');
					if(style!=""){
						replacevalue = '<font style="'+style+'">'+replacevalue+'</font>';
					}
					break;
				case "pic":
					if (blockitem.Picflag == 2) {
						replacevalue = ApiUrl+replacevalue;
					}
					if(blockitem.Picflag==1 && blockitem['Picwidth'] != 'auto' && blockitem['Picheight'] != 'auto') {
						if(blockitem.Makethumb == 1) {
							replacevalue = webp(replacevalue,block.Picsize)
						}
					}
					break;
				default:
					console.log("未处理",field['datatype'])
				}
				
				searcharr.push('{'+key+'}');
				replacearr.push(replacevalue);

				if(block.Hidedisplay==1) {
					if(replacevalue.indexOf("\\")>-1) {
						var a=['\.', '\\\\', '\+', '\*', '\?', '\[', '\^', '\]', '\$', '\(', '\)', '\{', '\}', '\=', '\!', '\<', '\>', '\|', '\:', '\-'],b=['.', '\\', '+', '*', '?', '[', '^', ']', '$', '(', ')', '{', '}', '=', '!', '<', '>', '|', ':', '-'];
						for(var ii in a){
							replacevalue.replace(a[ii],b[ii])
						}
					}
				}
			}
			for(var k in rtpl) {
				var str_template=rtpl[k];
				if(str_template!="") {
					str_template=str_template.replace(/title=[\'"]{title}[\'"]/, 'title="{title-title}"');
					str_template=str_template.replace(/alt=[\'"]{title}[\'"]/, 'alt="{alt-title}"');
					for(var ii in searcharr){
						rvalue[k]+=str_template.replace(searcharr[ii], replacearr[ii])
					}
					
					dynamicparts[rkey[k]] = [rpattern[k], rvalue[k]];
				}
			}
		}// foreach($block['itemlist'] as $itemid=>$blockitem) {
		
		for(var ii in dynamicparts) {
			var value=dynamicparts[ii];
			template = template.replace(value[0], value[1])
		}
		template = template.replace('\\', '&#92;');
	}
	template = template.replace(/\s*\[(order\d*)=\w+\](.*?)\[\/\1\]\s*/i, '');
	template = template.replace(/\s*\[(index\d*)=\w+\](.*?)\[\/\1\]\s*/i, '');
	template = template.replace(/\s*\[(loop\d{0,1})\](.*?)\[\/\1\]\s*/i, '');
	return template;
}	
function block_showstyle(o,k){
	var style='';
	for(var i in o){
		if(o[i].Key==k){
			var v=o[i].Info;
			if(v.B==1) {
				style += 'font-weight: 900;';
			}
			if(v.I==1) {
				style += 'font-style: italic;';
			}
			if(v.U==1) {
				style += 'text-decoration: underline;';
			}
			if(v.C!="") {
				style += 'color: '+v.C+';';
			}
		}
	}
	return style;
}
function block_build_template(t) {

	if(t.Raw!="") {
		return t.Raw;
	}
	var str = t.Header;
	if(t.Loop!="") {
		str += "\n[loop]\n"+t.Loop+"\n[/loop]";
	}
	if(t.Order){
		for(var i in t.Order.Order) {
			str += "\n[order="+t.Order.Order[i].Key+"]\n"+t.Order.Order[i].Value+"\n[/order]";
		}
	}
	
	str += t.Footer;
	return str;
}
function getDiyFrame(obj){
	
	var str='<div id="'+obj.Attr.Name+'" class="'+obj.Attr.ClassName+'">'
	if(obj.Column){
		str+='<div id="'+obj.Column.Attr.Name+'" class="'+obj.Column.Attr.ClassName+'">'
		str+='<div id="'+obj.Column.Attr.Name+'_temp" class="move-span temp"></div>'
		for(var i in obj.Column.Block){
			var v=obj.Column.Block[i];
			str+='<div id="'+v.Attr.Name+'" class="'+v.Attr.ClassName+'">'+getBlock(v.Info,false)+'</div>';
		}
		str+='</div>'
	}
	str+='</div>'
	return str;
}
function getDiyTab(obj){
	var str='<div id="'+obj.Attr.Name+'" class="'+obj.Attr.ClassName+'">';
	str+='<div id="'+obj.Attr.Name+'_title" class="'+obj.Attr.Titles.ClassName.join(' ')+'"';
	var switchtype = 'click';
	if(obj.Attr.Titles.SwitchType.length>0){
		switchtype=obj.Attr.Titles.SwitchType[0]
		str+=' switchtype="'+switchtype+'"';
	}
	str+='>'
	if(obj.Column){
		for(var i in obj.Column.Block){
			var v=obj.Column.Block[i];
			str+='<div id="'+v.Attr.Name+'" class="'+v.Attr.ClassName+'">'+getBlock(v.Info,false)+'</div>';
		}
	}
	str+='</div><div id="'+obj.Attr.Name+'_content" class="tb-c"></div>'
	str+= '<script type="text/javascript">initTab("'+obj.Attr.Name+'","'+switchtype+'");</script>';
	return str
}