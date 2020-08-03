

jQuery(".focusBox2").slide({ mainCell:".pic",effect:"left", autoPlay:true, delayTime:300});
$('input[name="template"]').val('forum');
for(var i in tpldata.Diy_list){
	var v=tpldata.Diy_list[i],html='';
	if(v.Frame){
		html=getDiyFrame(v.Frame)
	}
	if(v.Tab){
		
		html=getDiyTab(v.Tab)
	}
	if(html!=""){
		$('#'+v.Id+"_temp").remove();
		$('#'+v.Id).html(html);
	}
}
if(typeof saveData !="function"){
	$('#tpl_html').append('<script src="/static/js/forum.js?t=?" type="text/javascript"><\/script>') 
}
document.title='论坛 - '+cache.Head.Bbname
if(GET('Gid')==""){
	if(tpldata.History){
		$(".g-scrolling-carousel .item1").gScrollingCarousel({scrolling:false});
	}
	$(".g-scrolling-carousel .item2").gScrollingCarousel({scrolling:false});
}

var g_scrolling_hasMove=false;  //全局标识，初始化标识元素没有发生mousemove
$(".g-scrolling-carousel a").on("mousedown",function(){
    g_scrolling_hasMove=false;
});
$(".g-scrolling-carousel a").on("mouseup",function(){
    //根据是否发生移动状态来模拟click事件和拖拽后释放鼠标事件
    if(!g_scrolling_hasMove) tpl_click(this.href);
    g_scrolling_hasMove=false;  //还原标识，以便下一次使用
});
$(".g-scrolling-carousel a").on("mousemove",function(){
    g_scrolling_hasMove=true;   //元素移动事件中跟新标识为true，表示有发生移动
});