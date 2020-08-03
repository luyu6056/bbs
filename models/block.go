package models

import (
	"bbs/db"
	"bbs/libraries"
	"bbs/protocol"

	//"fmt"
	"strings"

	"github.com/luyu6056/cache"
)

func Diysave(insert *db.Common_diy_data) error {
	err := (&Model{}).Table("Common_diy_data").Replace(insert)
	if err == nil {
		diycache.Store(insert.Targettplname, insert)
	}

	return err
}
func GetDiyfromName(name string) (res *db.Common_diy_data) {
	ok := diycache.Get(name, &res)
	if !ok {
		err := (&Model{}).Table("Common_diy_data").Where(map[string]interface{}{"Targettplname": name}).Find(&res)
		if err != nil {
			libraries.DEBUG("加载diy数据错误", name)
		} else {
			diycache.Store(name, res)
		}
	}

	return
}

var diycache = cache.Hget("diycache", "cache")

func GetTemplatefromName(name string) []*protocol.MSG_diy_info {
	diy := GetDiyfromName(name)
	if diy == nil {
		return nil
	}
	for _, v := range diy.Diycontent {
		if v.Frame != nil {
			for _, b := range v.Frame.Column.Block {
				if b == nil || b.Info != nil {
					continue
				}
				id := strings.Split(b.Attr.Name, "_")
				var block_info *db.Common_block
				err := (&Model{}).Table("Common_block").Where(map[string]interface{}{"Bid": id[2]}).Find(&block_info)
				if err != nil || block_info == nil {
					libraries.DEBUG("加载block数据错误", b.Attr.Name)
					continue
				}
				b.Info = &protocol.MSG_diy_block_info{
					Name:        block_info.Name,
					Summary:     block_info.Summary,
					Blockclass:  block_info.Blockclass,
					Title:       block_info.Title,
					Bid:         block_info.Bid,
					Hidedisplay: block_info.Hidedisplay,
				}
				var t *db.Common_block_style
				if block_info.Styleid == 0 {
					err := libraries.JsonUnmarshal([]byte(block_info.Blockstyle), &t)
					if err != nil {
						libraries.DEBUG("模板反序列化错误", err)
						continue
					}
				} else {
					err := (&Model{}).Table("Common_block_style").Where(map[string]interface{}{"Styleid": block_info.Styleid}).Find(&t)
					if err != nil || block_info == nil {
						libraries.DEBUG("加载Common_block_style数据错误", b.Attr.Name)
						continue
					}
				}
				b.Info.Style = &protocol.MSG_block_style{}
				b.Info.Style.Fields = t.Fields
				b.Info.Style.Moreurl = t.Moreurl
				b.Info.Style.Template = &protocol.MSG_block_template{}
				b.Info.Style.Template.Raw = t.Template.Raw
				b.Info.Style.Template.Footer = t.Template.Raw
				b.Info.Style.Template.Header = t.Template.Raw
				b.Info.Style.Template.Loopplus = t.Template.Loopplus
				b.Info.Style.Template.Loop = t.Template.Loop
				if t.Template.Indexplus != nil {
					b.Info.Style.Template.Indexplus = &protocol.MSG_block_template_s{
						Key:  t.Template.Indexplus.Key,
						Odd:  t.Template.Indexplus.Odd,
						Even: t.Template.Indexplus.Even,
					}
					for _, v := range t.Template.Indexplus.Order {
						b.Info.Style.Template.Indexplus.Order = append(b.Info.Style.Template.Indexplus.Order, &protocol.MSG_block_template_order{
							Key:   v.Key,
							Value: v.Value,
						})
					}
				}
				if t.Template.Index != nil {
					b.Info.Style.Template.Index = &protocol.MSG_block_template_s{
						Key:  t.Template.Index.Key,
						Odd:  t.Template.Index.Odd,
						Even: t.Template.Index.Even,
					}
					for _, v := range t.Template.Index.Order {
						b.Info.Style.Template.Index.Order = append(b.Info.Style.Template.Index.Order, &protocol.MSG_block_template_order{
							Key:   v.Key,
							Value: v.Value,
						})
					}
				}
				if t.Template.Order != nil {
					b.Info.Style.Template.Order = &protocol.MSG_block_template_s{
						Key:  t.Template.Order.Key,
						Odd:  t.Template.Order.Odd,
						Even: t.Template.Order.Even,
					}
					for _, v := range t.Template.Order.Order {
						b.Info.Style.Template.Order.Order = append(b.Info.Style.Template.Order.Order, &protocol.MSG_block_template_order{
							Key:   v.Key,
							Value: v.Value,
						})
					}
				}
				for _, order := range t.Template.Orderplus {

					if order != nil {
						orderplus := &protocol.MSG_block_template_s{
							Key:  order.Key,
							Odd:  order.Odd,
							Even: order.Even,
						}
						for _, v := range order.Order {
							orderplus.Order = append(orderplus.Order, &protocol.MSG_block_template_order{
								Key:   v.Key,
								Value: v.Value,
							})
						}
						b.Info.Style.Template.Orderplus = append(b.Info.Style.Template.Orderplus, orderplus)
					}

				}
				var itemlist []*db.Common_block_item
				err = (&Model{}).Table("Common_block_item").Where(map[string]interface{}{"Bid": id[2]}).Select(&itemlist)
				if err != nil {
					libraries.DEBUG("加载Common_block_item数据错误", err)
					continue
				}
				for _, item := range itemlist {

					b.Info.Itemlist = append(b.Info.Itemlist, &protocol.MSG_block_item{
						Position:  item.Displayorder,
						Itemid:    item.Itemid,
						Fields:    item.Fields,
						Showstyle: item.Showstyle,
						Picsize:   item.Picsize,
						Picflag:   item.Picflag,
					})
				}
			}
		}
		if v.Tab != nil {
			for _, t := range v.Tab.Column.Block {
				if t == nil || t.Info != nil {
					continue
				}
				id := strings.Split(t.Attr.Name, "_")
				var block_info *db.Common_block
				err := (&Model{}).Table("Common_block").Where(map[string]interface{}{"Bid": id[2]}).Find(&block_info)
				if err != nil || block_info == nil {
					libraries.DEBUG("加载block数据错误", t.Attr.Name)
					continue
				}
				t.Info = &protocol.MSG_diy_block_info{
					Name:        block_info.Name,
					Summary:     block_info.Summary,
					Blockclass:  block_info.Blockclass,
					Title:       block_info.Title,
					Bid:         block_info.Bid,
					Hidedisplay: block_info.Hidedisplay,
				}
				var style *db.Common_block_style
				if block_info.Styleid == 0 {
					err := libraries.JsonUnmarshal([]byte(block_info.Blockstyle), &style)
					if err != nil {
						libraries.DEBUG("模板反序列化错误", err)
						continue
					}
				} else {
					err := (&Model{}).Table("Common_block_style").Where(map[string]interface{}{"Styleid": block_info.Styleid}).Find(&style)
					if err != nil || block_info == nil {
						libraries.DEBUG("加载Common_block_style数据错误", t.Attr.Name)
						continue
					}
				}
				t.Info.Style = &protocol.MSG_block_style{}
				t.Info.Style.Fields = style.Fields
				t.Info.Style.Moreurl = style.Moreurl
				t.Info.Style.Template = &protocol.MSG_block_template{}
				t.Info.Style.Template.Raw = style.Template.Raw
				t.Info.Style.Template.Footer = style.Template.Raw
				t.Info.Style.Template.Header = style.Template.Raw
				t.Info.Style.Template.Loopplus = style.Template.Loopplus
				t.Info.Style.Template.Loop = style.Template.Loop
				if style.Template.Indexplus != nil {
					t.Info.Style.Template.Indexplus = &protocol.MSG_block_template_s{
						Key:  style.Template.Indexplus.Key,
						Odd:  style.Template.Indexplus.Odd,
						Even: style.Template.Indexplus.Even,
					}
					for _, v := range style.Template.Indexplus.Order {
						t.Info.Style.Template.Indexplus.Order = append(t.Info.Style.Template.Indexplus.Order, &protocol.MSG_block_template_order{
							Key:   v.Key,
							Value: v.Value,
						})
					}
				}
				if style.Template.Index != nil {
					t.Info.Style.Template.Index = &protocol.MSG_block_template_s{
						Key:  style.Template.Index.Key,
						Odd:  style.Template.Index.Odd,
						Even: style.Template.Index.Even,
					}
					for _, v := range style.Template.Index.Order {
						t.Info.Style.Template.Index.Order = append(t.Info.Style.Template.Index.Order, &protocol.MSG_block_template_order{
							Key:   v.Key,
							Value: v.Value,
						})
					}
				}
				if style.Template.Order != nil {
					t.Info.Style.Template.Order = &protocol.MSG_block_template_s{
						Key:  style.Template.Order.Key,
						Odd:  style.Template.Order.Odd,
						Even: style.Template.Order.Even,
					}
					for _, v := range style.Template.Order.Order {
						t.Info.Style.Template.Order.Order = append(t.Info.Style.Template.Order.Order, &protocol.MSG_block_template_order{
							Key:   v.Key,
							Value: v.Value,
						})
					}
				}
				for _, order := range style.Template.Orderplus {

					if order != nil {
						orderplus := &protocol.MSG_block_template_s{
							Key:  order.Key,
							Odd:  order.Odd,
							Even: order.Even,
						}
						for _, v := range order.Order {
							orderplus.Order = append(orderplus.Order, &protocol.MSG_block_template_order{
								Key:   v.Key,
								Value: v.Value,
							})
						}
						t.Info.Style.Template.Orderplus = append(t.Info.Style.Template.Orderplus, orderplus)
					}

				}
				var itemlist []*db.Common_block_item
				err = (&Model{}).Table("Common_block_item").Where(map[string]interface{}{"Bid": id[2]}).Select(&itemlist)
				if err != nil {
					libraries.DEBUG("加载Common_block_item数据错误", err)
					continue
				}
				for _, item := range itemlist {

					t.Info.Itemlist = append(t.Info.Itemlist, &protocol.MSG_block_item{
						Position:  item.Displayorder,
						Itemid:    item.Itemid,
						Fields:    item.Fields,
						Showstyle: item.Showstyle,
						Picsize:   item.Picsize,
						Picflag:   item.Picflag,
					})
				}
			}
		}
	}
	return diy.Diycontent
}

func blockinit() {
	model := new(Model)
	c, _ := model.Table("Common_block").Count()
	if c == 0 {
		data := make([]*db.Common_block, 37)
		data[0] = &db.Common_block{Bid: 1, Blockclass: "group_thread", Name: "", Title: ``, Classname: "", Summary: ``, Uid: 1, Username: "admin", Blockstyle: ``, Picwidth: 339, Picheight: 215, Target: "blank", Dateformat: "Y-m-d", Script: "groupthread", Param: `{"gtids":["0"],"rewardstatus":"0","titlelength":"40","summarylength":"80","startrow":"0","items":"4","special":["0"],"picrequired":"1"}`, Shownum: 4, Cachetimerange: ""}
		data[1] = &db.Common_block{Bid: 2, Blockclass: "group_thread", Name: "", Title: ``, Classname: "", Summary: ``, Uid: 1, Username: "admin", Styleid: 24, Blockstyle: `{}`, Target: "blank", Dateformat: "Y-m-d", Script: "groupthreadspecial", Param: `{"gtids":["0"],"rewardstatus":"0","picrequired":"0","titlelength":"40","summarylength":"80","items":"10"}`, Shownum: 10, Cachetime: 3600, Cachetimerange: ""}
		data[2] = &db.Common_block{Bid: 3, Blockclass: "forum_thread", Name: "首页推荐", Title: ``, Classname: "", Summary: ``, Uid: 1, Username: "admin", Blockstyle: `{"name":"","blockclass":"forum_thread","makethumb":1,"getpic":1,"getsummary":0,"settarget":0,"moreurl":
0,"fields":["url","title","pic","forumname","views","replies","heats","authorid","avatar","author"],"template":{"raw":"<ul class=\"post post-works mtw cl\" id=\"itemContainer\">
 [loop]
    <li>
      <div class=\"shade\"></div>
      <div class=\"cover pos\"> <a href=\"{url}\" target=\"_blank\" title=\"{title}\"> <img style=\"display: inline;\" src=\"{pic}\" class=\"imgloadinglater\" alt=\"{title}\" rel=\"nofollow\" height=\"{picheight}\" width=\"{picwidth}\" /> </a> </div>
      <div class=\"info\">
        <h4 class=\"tits ellipsis download\">{title}</h4>
        <div class=\"msg mtn cl\"> <span class=\"classify\">{forumname}</span> <span><i class=\"icon-eye\" title=\"u6d4fu89c8u6570\"></i><em>{views}</em></span> <span><i class=\"icon-comment\" title=\"u8bc4u8bbau6570\"></i><em>{replies}</em></span> <span><i class=\"icon-leaf\" title=\"u70edu5ea6\"></i><em>{heats}</em></span> </div>
        <p class=\"user cl\"> <a href=\"home.php?mod=space&uid={authorid}\" target=\"_blank\"><img src=\"{avatar}\" title=\"{author}\"> <strong class=\"name\"> <em>{author}</em> </strong></a> </p>
      </div>
      <div class=\"line\"></div>
    </li>
  [/loop]
</ul>


<div class=\"cl\" style=\"text-align: center;\">
<div id=\"pager\" class=\"pager\"></div>
<div class=\"h_page cl\"><a href=\"news\" target=\"_blank\">...</a></div>
</div>
<script type=\"text/javascript\">
jQuery.noConflict();
jQuery(function(){
        //u9996u5148u5c06#back-to-topu9690u85cf
        jQuery(\"#pager\").hide();
        //u5f53u6edau52a8u6761u7684u4f4du7f6eu5904u4e8eu8dddu9876u90e8100u50cfu7d20u4ee5u4e0bu65f6uff0cu8df3u8f6cu94feu63a5u51fau73b0uff0cu5426u5219u6d88u5931
        jQuery(function () {
            jQuery(window).scroll(function(){
                if (jQuery(window).scrollTop()>100){

                }
                else
                {

                }
            });
            //u5f53u70b9u51fbu8df3u8f6cu94feu63a5u540euff0cu56deu5230u9875u9762u9876u90e8u4f4du7f6e
            jQuery(\"#pager\").click(function(){
                jQuery('body,html').animate({scrollTop:440},500);
                return false;
            });
        });
    });
</script>","footer":"","header":"","indexplus":{},"index":{},"orderplus":[],"order":{},"loopplus":[],"loop":"<li>
      <div class=\"shade\"></div>
      <div class=\"cover pos\"> <a href=\"{url}\" target=\"_blank\" title=\"{title}\"> <img style=\"display: inline;\" src=\"{pic}\" class=\"imgloadinglater\" alt=\"{title}\" rel=\"nofollow\" height=\"{picheight}\" width=\"{picwidth}\" /> </a> </div>
      <div class=\"info\">
        <h4 class=\"tits ellipsis download\">{title}</h4>
        <div class=\"msg mtn cl\"> <span class=\"classify\">{forumname}</span> <span><i class=\"icon-eye\" title=\"u6d4fu89c8u6570\"></i><em>{views}</em></span> <span><i class=\"icon-comment\" title=\"u8bc4u8bbau6570\"></i><em>{replies}</em></span> <span><i class=\"icon-leaf\" title=\"u70edu5ea6\"></i><em>{heats}</em></span> </div>
        <p class=\"user cl\"> <a href=\"home.php?mod=space&uid={authorid}\" target=\"_blank\"><img src=\"{avatar}\" title=\"{author}\"> <strong class=\"name\"> <em>{author}</em> </strong></a> </p>
      </div>
      <div class=\"line\"></div>
    </li>"},"hash":"c02a90b0"}`, Picwidth: 280, Picheight: 210, Target: "blank", Dateformat: "Y-m-d", Script: "thread", Param: `{"tids":"","uids":"","keyword":"","tagkeyword":"","typeids":"","recommend":"0","special":["0"],"viewmod":"0","rewardstatus":"0","picrequired":"1","orderby":"lastpost","postdateline":"0","lastpost":"0","highlight":"0","titlelength":"40","summarylength":"80","startrow":"0","items":"36"}`, Shownum: 36, Cachetime: 3600, Cachetimerange: "", Dateline: 1564457118}
		data[3] = &db.Common_block{Bid: 4, Blockclass: "html_html", Name: "tit", Title: ``, Classname: "", Summary: `<div class="cl pos">
    <ul class="h-screen">
      <li class="on"><a href="javascript:;" title="首页推荐">首页推荐</a></li>
      <li><a href="#" title="佳作分享">佳作分享</a></li>
      <li><a href="#" title="最新作品">最新作品</a></li>
    </ul>
    <!--  -->
    <ul class="h-soup cl">
      <li> <i class="icon-star1" title="更新"></i> <a class="txt" href="#" target="_blank">"鸡汤"栏目正式更新为 "每日一条"，大家可以互动啦！ </a> </li>
      <li class="open"> <i class="icon-heart-round" title="一条"></i> <a class="txt" href="#" target="_blank">你现在的努力远没有需要拼天份的地步~ </a> </li>
      <li> <i class="icon-warn" title="公告"></i> <a class="txt" href="#" target="_blank">关于作品／文章推荐，UI中国特此声明 </a> </li>
    </ul>
</div>`, Uid: 1, Username: "admin", Blockstyle: `{}`, Target: "blank", Dateformat: "Y-m-d", Script: "blank", Param: `{"content":"<div class=\\"cl pos\\">
    <ul class=\\"h-screen\\">
      <li class=\\"on\\"><a href=\\"javascript:;\\" title=\\"u9996u9875u63a8u8350\\">u9996u9875u63a8u8350</a></li>
      <li><a href=\\"#\\" title=\\"u4f73u4f5cu5206u4eab\\">u4f73u4f5cu5206u4eab</a></li>
      <li><a href=\\"#\\" title=\\"u6700u65b0u4f5cu54c1\\">u6700u65b0u4f5cu54c1</a></li>
    </ul>
    <!--  -->
    <ul class=\\"h-soup cl\\">
      <li> <i class=\\"icon-star1\\" title=\\"u66f4u65b0\\"></i> <a class=\\"txt\\" href=\\"#\\" target=\\"_blank\\">\\"u9e21u6c64\\"u680fu76eeu6b63u5f0fu66f4u65b0u4e3a \\"u6bcfu65e5u4e00u6761\\"uff0cu5927u5bb6u53efu4ee5u4e92u52a8u5566uff01 </a> </li>
      <li class=\\"open\\"> <i class=\\"icon-heart-round\\" title=\\"u4e00u6761\\"></i> <a class=\\"txt\\" href=\\"#\\" target=\\"_blank\\">u4f60u73b0u5728u7684u52aau529bu8fdcu6ca1u6709u9700u8981u62fcu5929u4efdu7684u5730u6b65~ </a> </li>
      <li> <i class=\\"icon-warn\\" title=\\"u516cu544a\\"></i> <a class=\\"txt\\" href=\\"#\\" target=\\"_blank\\">u5173u4e8eu4f5cu54c1uff0fu6587u7ae0u63a8u8350uff0cUIu4e2du56fdu7279u6b64u58f0u660e </a> </li>
    </ul>
</div>","items":"10"}`, Shownum: 10, Cachetime: 3600, Cachetimerange: "", Dateline: 1564457116}
		data[4] = &db.Common_block{Bid: 5, Blockclass: "forum_thread", Name: "推荐文章", Title: ``, Classname: "", Summary: ``, Uid: 1, Username: "admin", Blockstyle: `{"name":"","blockclass":"forum_thread","makethumb":1,"getpic":1,"getsummary":1,"settarget":0,"moreurl":
0,"fields":["url","title","pic","forumurl","forumname","summary","authorid","author","avatar","views","replies","heats","dateline"],"template":{"raw":"<h1 class=\"h-tit mtv h-article-btn pos\"><a class=\"on\" href=\"javascript:;\" title=\"u6587u7ae0\">u63a8u8350u6587u7ae0</a><a href=\"#\" title=\"u6700u65b0u6587u7ae0\">u6700u65b0u6587u7ae0</a> </h1>
      <div class=\"h-article-box\">
        <ul class=\"h-article-list\" id=\"itemContainer2\">
         [loop]
          <li class=\"cl\"> <a href=\"{url}\" title=\"{title}\" target=\"_blank\">
            <div class=\"shade\"></div>
            <div class=\"showd\"> <span class=\"cover\"> <img src=\"{pic}\" alt=\"{title}\" rel=\"nofollow\" height=\"{picheight}\" width=\"{picwidth}\" /> </span>
              <div class=\"h-article-info\">
                <h1 class=\"cl\"> <span class=\"tag bg-blue\" target=\"_blank\" href=\"{forumurl}\">{forumname}</span> <span class=\"ellipsis\" href=\"{url}\" title=\"{title}\" target=\"_blank\">{title}</span> </h1>
                <p>{summary}...</p>
                <div class=\"mtm cl\"> <span class=\"avatar z\" href=\"home.php?mod=space&uid={authorid}\" title=\"{author}\" target=\"_blank\"> <img src=\"{avatar}\" alt=\"{author}\" rel=\"nofollow\" height=\"20\" width=\"20\"> <strong class=\"name\">{author}</strong> </span>
                  <div class=\"msg z cl\"> <span><i class=\"icon-eye\"></i><em>{views}</em></span> <span><i class=\"icon-comment\"></i><em>{replies}</em></span> <span><i class=\"icon-leaf\"></i><em>{heats}</em></span> </div>
                </div>
                <div class=\"data\"><i class=\"icon-time\"></i>{dateline}</div>
              </div>
            </div>
            </a>
          </li>
         [/loop]
        </ul>
      </div>
<div class=\"cl\" style=\"padding: 10px 0; text-align: center;\">
<div id=\"holder\" class=\"holder holder2\"></div>
<div class=\"h_page cl\"><a href=\"news\" target=\"_blank\">...</a></div>
</div>
<script type=\"text/javascript\">
jQuery.noConflict();
jQuery(function(){
        //u9996u5148u5c06#back-to-topu9690u85cf
        jQuery(\".holder2\").hide();
        //u5f53u6edau52a8u6761u7684u4f4du7f6eu5904u4e8eu8dddu9876u90e8100u50cfu7d20u4ee5u4e0bu65f6uff0cu8df3u8f6cu94feu63a5u51fau73b0uff0cu5426u5219u6d88u5931
        jQuery(function () {
            jQuery(window).scroll(function(){
                if (jQuery(window).scrollTop()>100){

                }
                else
                {

                }
            });
            //u5f53u70b9u51fbu8df3u8f6cu94feu63a5u540euff0cu56deu5230u9875u9762u9876u90e8u4f4du7f6e
            jQuery(\".holder2\").click(function(){
                jQuery('body,html').animate({scrollTop:1560},500);
                return false;
            });
        });
    });
</script>","footer":"","header":"","indexplus":{},"index":{},"orderplus":[],"order":{},"loopplus":[],"loop":"<li class=\"cl\"> <a href=\"{url}\" title=\"{title}\" target=\"_blank\">
            <div class=\"shade\"></div>
            <div class=\"showd\"> <span class=\"cover\"> <img src=\"{pic}\" alt=\"{title}\" rel=\"nofollow\" height=\"{picheight}\" width=\"{picwidth}\" /> </span>
              <div class=\"h-article-info\">
                <h1 class=\"cl\"> <span class=\"tag bg-blue\" target=\"_blank\" href=\"{forumurl}\">{forumname}</span> <span class=\"ellipsis\" href=\"{url}\" title=\"{title}\" target=\"_blank\">{title}</span> </h1>
                <p>{summary}...</p>
                <div class=\"mtm cl\"> <span class=\"avatar z\" href=\"home.php?mod=space&uid={authorid}\" title=\"{author}\" target=\"_blank\"> <img src=\"{avatar}\" alt=\"{author}\" rel=\"nofollow\" height=\"20\" width=\"20\"> <strong class=\"name\">{author}</strong> </span>
                  <div class=\"msg z cl\"> <span><i class=\"icon-eye\"></i><em>{views}</em></span> <span><i class=\"icon-comment\"></i><em>{replies}</em></span> <span><i class=\"icon-leaf\"></i><em>{heats}</em></span> </div>
                </div>
                <div class=\"data\"><i class=\"icon-time\"></i>{dateline}</div>
              </div>
            </div>
            </a>
          </li>"},"hash":"3c0911ee"}`, Picwidth: 160, Picheight: 120, Target: "blank", Dateformat: "Y-m-d", Script: "thread", Param: `{"tids":"","uids":"","keyword":"","tagkeyword":"","typeids":"","recommend":"0","special":["0"],"viewmod":"0","rewardstatus":"0","picrequired":"1","orderby":"lastpost","postdateline":"0","lastpost":"0","highlight":"0","titlelength":"55","summarylength":"150","startrow":"0","items":"18"}`, Shownum: 18, Cachetime: 3600, Cachetimerange: "", Dateline: 1564457122}
		data[5] = &db.Common_block{Bid: 6, Blockclass: "html_html", Name: "职位", Title: ``, Classname: "", Summary: `<h1 class="h-tit-aside">热招职位</h1>
      <ul class="h-aside-list">
        <li class="pos"> <a href="#" target="_blank"><img class="cover" src="template/zvis_6_ui/src/1491033124_750.png" alt="" rel="nofollow" height="125" width="280">
          <div class="h-aside-show">
            <p class="item ellipsis">[新加坡] 高级视觉设计师 [20k-40k]</p>
          </div>
          </a> </li>
        <li class="pos"> <a href="#" target="_blank"> <img class="cover" src="template/zvis_6_ui/src/1473307771_779.jpg" alt="" rel="nofollow" height="125" width="280">
          <div class="h-aside-show">
            <p class="item ellipsis">[上海市] 高级UI设计师 [18k-30k]</p>
          </div>
          </a> </li>
        <li class="pos"> <a href="#" target="_blank"> <img class="cover" src="template/zvis_6_ui/src/1463459315_730.jpg" alt="" rel="nofollow" height="125" width="280">
          <div class="h-aside-show">
            <p class="item ellipsis">[北京市] 品牌视觉设计师 [15k-25k]</p>
            <p class="item ellipsis">[北京市] 产品设计师 [15k-25k]</p>
          </div>
          </a> </li>
      </ul>
      <a class="more" href="#" title="招聘" target="_blank">更多</a>`, Uid: 1, Username: "admin", Blockstyle: `{}`, Target: "blank", Dateformat: "Y-m-d", Script: "blank", Param: `{"content":"
<h1 class=\\"h-tit-aside\\">u70edu62dbu804cu4f4d</h1>
      <ul class=\\"h-aside-list\\">
        <li class=\\"pos\\"> <a href=\\"#\\" target=\\"_blank\\"><img class=\\"cover\\" src=\\"template/zvis_6_ui/src/1491033124_750.png\\" alt=\\"\\" rel=\\"nofollow\\" height=\\"125\\" width=\\"280\\">
          <div class=\\"h-aside-show\\">
            <p class=\\"item ellipsis\\">[u65b0u52a0u5761] u9ad8u7ea7u89c6u89c9u8bbeu8ba1u5e08 [20k-40k]</p>
          </div>
          </a> </li>
        <li class=\\"pos\\"> <a href=\\"#\\" target=\\"_blank\\"> <img class=\\"cover\\" src=\\"template/zvis_6_ui/src/1473307771_779.jpg\\" alt=\\"\\" rel=\\"nofollow\\" height=\\"125\\" width=\\"280\\">
          <div class=\\"h-aside-show\\">
            <p class=\\"item ellipsis\\">[u4e0au6d77u5e02] u9ad8u7ea7UIu8bbeu8ba1u5e08 [18k-30k]</p>
          </div>
          </a> </li>
        <li class=\\"pos\\"> <a href=\\"#\\" target=\\"_blank\\"> <img class=\\"cover\\" src=\\"template/zvis_6_ui/src/1463459315_730.jpg\\" alt=\\"\\" rel=\\"nofollow\\" height=\\"125\\" width=\\"280\\">
          <div class=\\"h-aside-show\\">
            <p class=\\"item ellipsis\\">[u5317u4eacu5e02] u54c1u724cu89c6u89c9u8bbeu8ba1u5e08 [15k-25k]</p>
            <p class=\\"item ellipsis\\">[u5317u4eacu5e02] u4ea7u54c1u8bbeu8ba1u5e08 [15k-25k]</p>
          </div>
          </a> </li>
      </ul>
      <a class=\\"more\\" href=\\"#\\" title=\\"u62dbu8058\\" target=\\"_blank\\">u66f4u591a</a>","items":"10"}`, Shownum: 10, Cachetimerange: "0,0", Dateline: 1563189610}
		data[6] = &db.Common_block{Bid: 7, Blockclass: "html_html", Name: "课程", Title: ``, Classname: "", Summary: `<h1 class="h-tit-aside mtw">热门课程</h1>
      <ul class="h-aside-list">
        <li class="pos"> <a href="#" target="_blank"> <img class="cover" src="template/zvis_6_ui/src/1487744828_327.jpg" alt="" rel="nofollow" height="125" width="280"> </a> </li>
        <li class="pos"> <a href="#" target="_blank"> <img class="cover" src="template/zvis_6_ui/src/1473390683_245.jpg" alt="" rel="nofollow" height="125" width="280"> </a> </li>
        <li class="pos"> <a href="#" target="_blank"> <img class="cover" src="template/zvis_6_ui/src/1487908457_191.jpg" alt="" rel="nofollow" height="125" width="280"> </a> </li>
      </ul>
      <a class="more" href="#" title="培训" target="_blank">更多</a>`, Uid: 1, Username: "admin", Blockstyle: `{}`, Target: "blank", Dateformat: "Y-m-d", Script: "blank", Param: `{"content":"
<h1 class=\\"h-tit-aside mtw\\">u70edu95e8u8bfeu7a0b</h1>
      <ul class=\\"h-aside-list\\">
        <li class=\\"pos\\"> <a href=\\"#\\" target=\\"_blank\\"> <img class=\\"cover\\" src=\\"template/zvis_6_ui/src/1487744828_327.jpg\\" alt=\\"\\" rel=\\"nofollow\\" height=\\"125\\" width=\\"280\\"> </a> </li>
        <li class=\\"pos\\"> <a href=\\"#\\" target=\\"_blank\\"> <img class=\\"cover\\" src=\\"template/zvis_6_ui/src/1473390683_245.jpg\\" alt=\\"\\" rel=\\"nofollow\\" height=\\"125\\" width=\\"280\\"> </a> </li>
        <li class=\\"pos\\"> <a href=\\"#\\" target=\\"_blank\\"> <img class=\\"cover\\" src=\\"template/zvis_6_ui/src/1487908457_191.jpg\\" alt=\\"\\" rel=\\"nofollow\\" height=\\"125\\" width=\\"280\\"> </a> </li>
      </ul>
      <a class=\\"more\\" href=\\"#\\" title=\\"u57f9u8bad\\" target=\\"_blank\\">u66f4u591a</a>","items":"10"}`, Shownum: 10, Cachetimerange: "0,0", Dateline: 1563189610}
		data[7] = &db.Common_block{Bid: 8, Blockclass: "forum_thread", Name: "专题推荐", Title: ``, Classname: "", Summary: ``, Uid: 1, Username: "admin", Blockstyle: `{"name":"","blockclass":"forum_thread","makethumb":0,"getpic":0,"getsummary":0,"settarget":0,"moreurl":
0,"fields":["url","title"],"template":{"raw":"    <img class=\"cover\" src=\"template/zvis_6_ui/src/xinshou-680x280.png\" alt=\"u521du7ea7u8bbeu8ba1u5e08u5fc5u8bfbu4e13u9898\" rel=\"nofollow\" height=\"134\" width=\"334\">
    <ul class=\"list\">
     [loop]
      <li><a href=\"{url}\" class=\"ellipsis\" title=\"{title}\" target=\"_blank\">{title}</a></li>
     [/loop]
    </ul>
    <a href=\"#\" class=\"more\" target=\"_blank\" title=\"u4e13u9898\">u66f4u591a...</a>","footer":"","header":"","indexplus":{},"index":{},"orderplus":[],"order":{},"loopplus":[],"loop":"<li><a href=\"{url}\" class=\"ellipsis\" title=\"{title}\" target=\"_blank\">{title}</a></li>"},"hash":"c06b029c"}`, Target: "blank", Dateformat: "Y-m-d", Script: "thread", Param: `{"tids":"","uids":"","keyword":"","tagkeyword":"","typeids":"","recommend":"0","viewmod":"0","rewardstatus":"0","picrequired":"0","orderby":"lastpost","postdateline":"0","lastpost":"0","highlight":"0","titlelength":"40","summarylength":"80","startrow":"0","items":"13"}`, Shownum: 13, Cachetime: 3600, Cachetimerange: "", Dateline: 1564457133}
		data[8] = &db.Common_block{Bid: 9, Blockclass: "forum_thread", Name: "观点", Title: ``, Classname: "", Summary: ``, Uid: 1, Username: "admin", Blockstyle: `{"name":"","blockclass":"forum_thread","makethumb":1,"getpic":1,"getsummary":1,"settarget":0,"moreurl":0,"f
ields":["url","pic","title","forumname","summary","authorid","avatar","author","views","replies","heats"],"template":{"raw":"    [loop]
    <div class=\"pos\"><a href=\"{url}\" class=\"cover\" target=\"_blank\"> <img style=\"display: inline;\" src=\"{pic}\" class=\"imgloadinglater\" alt=\"{title}\" rel=\"nofollow\" height=\"{picheight}\" width=\"{picwidth}\"> </a> <i class=\"icon-hexagon-tag h-novice-tag\"><span class=\"txt\">{forumname}</span></i>
      <div class=\"info\">
        <h1><a href=\"{url}\" target=\"_blank\">{title}</a></h1>
        <p class=\"txt\">{summary}</p>
      </div>
      <div class=\"author cl\"> <a href=\"home.php?mod=space&uid={authorid}\" class=\"avatar z\" target=\"_blank\"><img style=\"display: inline;\" src=\"{avatar}\" class=\"imgloadinglater\" alt=\"{author}\" rel=\"nofollow\" height=\"50\" width=\"50\"></a>
        <div class=\"z\" style=\"width: 190px;\">
          <h5 class=\"name\"><a href=\"home.php?mod=space&uid={authorid}\" target=\"_blank\">{author} <i class=\"cert mar2 icon-certified2\" title=\"u8ba4u8bc1u8bbeu8ba1u5e08\"></i> </a></h5>
          <div class=\"msg cl\"> <span><i class=\"icon-eye\"></i><em>{views}</em></span> <span><i class=\"icon-comment\"></i><em>{replies}</em></span> <span><i class=\"icon-leaf\"></i><em>{heats}</em></span> </div>
        </div>
      </div>
    </div>
    [/loop]
    <a href=\"#\" class=\"cover\" target=\"_blank\"><img style=\"display: block;\" class=\"cover imgloadinglater\" src=\"template/zvis_6_ui/src/linian-560x420.png\" alt=\"UIu8bbeu8ba1u89c4u8303\" rel=\"nofollow\" height=\"210\" width=\"280\"> </a>","footer":"","header":"","indexplus":{},"index":{},"orderplus":[],"order":{},"loopplus":[],"loop":"<div class=\"pos\"><a href=\"{url}\" class=\"cover\" target=\"_blank\"> <img style=\"display: inline;\" src=\"{pic}\" class=\"imgloadinglater\" alt=\"{title}\" rel=\"nofollow\" height=\"{picheight}\" width=\"{picwidth}\"> </a> <i class=\"icon-hexagon-tag h-novice-tag\"><span class=\"txt\">{forumname}</span></i>
      <div class=\"info\">
        <h1><a href=\"{url}\" target=\"_blank\">{title}</a></h1>
        <p class=\"txt\">{summary}</p>
      </div>
      <div class=\"author cl\"> <a href=\"home.php?mod=space&uid={authorid}\" class=\"avatar z\" target=\"_blank\"><img style=\"display: inline;\" src=\"{avatar}\" class=\"imgloadinglater\" alt=\"{author}\" rel=\"nofollow\" height=\"50\" width=\"50\"></a>
        <div class=\"z\" style=\"width: 190px;\">
          <h5 class=\"name\"><a href=\"home.php?mod=space&uid={authorid}\" target=\"_blank\">{author} <i class=\"cert mar2 icon-certified2\" title=\"u8ba4u8bc1u8bbeu8ba1u5e08\"></i> </a></h5>
          <div class=\"msg cl\"> <span><i class=\"icon-eye\"></i><em>{views}</em></span> <span><i class=\"icon-comment\"></i><em>{replies}</em></span> <span><i class=\"icon-leaf\"></i><em>{heats}</em></span> </div>
        </div>
      </div>
    </div>"},"hash":"a63e7e76"}`, Picwidth: 280, Picheight: 210, Target: "blank", Dateformat: "Y-m-d", Script: "thread", Param: `{"tids":"","uids":"","keyword":"","tagkeyword":"","typeids":"","recommend":"0","special":["0"],"viewmod":"0","rewardstatus":"0","picrequired":"1","orderby":"dateline","postdateline":"0","lastpost":"0","highlight":"0","titlelength":"40","summarylength":"80","startrow":"0","items":"1"}`, Shownum: 1, Cachetime: 3600, Cachetimerange: "", Dateline: 1564457134}
		data[9] = &db.Common_block{Bid: 10, Blockclass: "forum_thread", Name: "第几期", Title: ``, Classname: "", Summary: ``, Uid: 1, Username: "admin", Blockstyle: `{"name":"","blockclass":"forum_thread","makethumb":1,"getpic":1,"getsummary":1,"settarget":0,"moreurl":0
,"fields":["url","pic","title","forumname","summary","authorid","avatar","author","views","replies","heats"],"template":{"raw":"    [index=1]
    <a href=\"{url}\" class=\"cover pos\" target=\"_blank\"> <img src=\"{pic}\" alt=\"{title}\" rel=\"nofollow\" height=\"{picheight}\" width=\"{picwidth}\" /> <i class=\"icon-hexagon-tag h-novice-tag purple\"><span class=\"txt\">u7b2c12u671f</span></i> </a>
    [/index]
    [index=2]
    <div class=\"pos\"> <a href=\"{url}\" class=\"cover\" target=\"_blank\"><img style=\"display: inline;\" src=\"{pic}\" class=\"imgloadinglater\" alt=\"{title}\" rel=\"nofollow\" height=\"{picheight}\" width=\"{picwidth}\"></a> <i class=\"icon-hexagon-tag h-novice-tag\"><span class=\"txt\">{forumname}</span></i>
      <div class=\"info\">
        <h1><a href=\"{url}\" target=\"_blank\">{title}</a></h1>
        <p class=\"txt\">{summary}</p>
      </div>
      <div class=\"author cl\"> <a href=\"home.php?mod=space&uid={authorid}\" class=\"avatar z\" target=\"_blank\"><img src=\"{avatar}\" alt=\"{author}\" rel=\"nofollow\" height=\"50\" width=\"50\"></a>
        <div class=\"z\" style=\"width: 190px;\">
          <h5 class=\"name\"><a href=\"home.php?mod=space&uid={authorid}\" target=\"_blank\">{author} <i class=\"cert mar2 icon-certified2\" title=\"u8ba4u8bc1u8bbeu8ba1u5e08\"></i> </a></h5>
          <div class=\"msg cl\"> <span><i class=\"icon-eye\"></i><em>{views}</em></span> <span><i class=\"icon-comment\"></i><em>{replies}</em></span> <span><i class=\"icon-leaf\"></i><em>{heats}</em></span> </div>
        </div>
      </div>
    </div>
    [/index]","footer":"","header":"","indexplus":{},"index":{"1":"<a href=\"{url}\" class=\"cover pos\" target=\"_blank\"> <img src=\"{pic}\" alt=\"{title}\" rel=\"nofollow\" height=\"{picheight}\" width=\"{picwidth}\" /> <i class=\"icon-hexagon-tag h-novice-tag purple\"><span class=\"txt\">u7b2c12u671f</span></i> </a>","2":"<div class=\"pos\"> <a href=\"{url}\" class=\"cover\" target=\"_blank\"><img style=\"display: inline;\" src=\"{pic}\" class=\"imgloadinglater\" alt=\"{title}\" rel=\"nofollow\" height=\"{picheight}\" width=\"{picwidth}\"></a> <i class=\"icon-hexagon-tag h-novice-tag\"><span class=\"txt\">{forumname}</span></i>
      <div class=\"info\">
        <h1><a href=\"{url}\" target=\"_blank\">{title}</a></h1>
        <p class=\"txt\">{summary}</p>
      </div>
      <div class=\"author cl\"> <a href=\"home.php?mod=space&uid={authorid}\" class=\"avatar z\" target=\"_blank\"><img src=\"{avatar}\" alt=\"{author}\" rel=\"nofollow\" height=\"50\" width=\"50\"></a>
        <div class=\"z\" style=\"width: 190px;\">
          <h5 class=\"name\"><a href=\"home.php?mod=space&uid={authorid}\" target=\"_blank\">{author} <i class=\"cert mar2 icon-certified2\" title=\"u8ba4u8bc1u8bbeu8ba1u5e08\"></i> </a></h5>
          <div class=\"msg cl\"> <span><i class=\"icon-eye\"></i><em>{views}</em></span> <span><i class=\"icon-comment\"></i><em>{replies}</em></span> <span><i class=\"icon-leaf\"></i><em>{heats}</em></span> </div>
        </div>
      </div>
    </div>"},"orderplus":[],"order":{},"loopplus":[],"loop":"
                                                "},"hash":"ed871e23"}`, Picwidth: 280, Picheight: 210, Target: "blank", Dateformat: "Y-m-d", Script: "thread", Param: `{"tids":"","uids":"","keyword":"","tagkeyword":"","typeids":"","recommend":"0","special":["0"],"viewmod":"0","rewardstatus":"0","picrequired":"1","orderby":"dateline","postdateline":"0","lastpost":"0","highlight":"0","titlelength":"40","summarylength":"80","startrow":"1","items":"2"}`, Shownum: 2, Cachetime: 3600, Cachetimerange: "", Dateline: 1564483345}
		data[10] = &db.Common_block{Bid: 11, Blockclass: "forum_thread", Name: "观点2", Title: ``, Classname: "", Summary: ``, Uid: 1, Username: "admin", Blockstyle: `{"name":"","blockclass":"forum_thread","makethumb":1,"getpic":1,"getsummary":1,"settarget":0,"moreurl":0
,"fields":["url","pic","title","forumname","summary","authorid","avatar","author","views","replies","heats"],"template":{"raw":"    [loop]
    <div class=\"pos\"><a href=\"{url}\" class=\"cover\" target=\"_blank\"> <img style=\"display: inline;\" src=\"{pic}\" class=\"imgloadinglater\" alt=\"{title}\" rel=\"nofollow\" height=\"{picheight}\" width=\"{picwidth}\"> </a> <i class=\"icon-hexagon-tag h-novice-tag\"><span class=\"txt\">{forumname}</span></i>
      <div class=\"info\">
        <h1><a href=\"{url}\" target=\"_blank\">{title}</a></h1>
        <p class=\"txt\">{summary}</p>
      </div>
      <div class=\"author cl\"> <a href=\"home.php?mod=space&uid={authorid}\" class=\"avatar z\" target=\"_blank\"><img style=\"display: inline;\" src=\"{avatar}\" class=\"imgloadinglater\" alt=\"{author}\" rel=\"nofollow\" height=\"50\" width=\"50\"></a>
        <div class=\"z\" style=\"width: 190px;\">
          <h5 class=\"name\"><a href=\"home.php?mod=space&uid={authorid}\" target=\"_blank\">{author} <i class=\"cert mar2 icon-certified2\" title=\"u8ba4u8bc1u8bbeu8ba1u5e08\"></i> </a></h5>
          <div class=\"msg cl\"> <span><i class=\"icon-eye\"></i><em>{views}</em></span> <span><i class=\"icon-comment\"></i><em>{replies}</em></span> <span><i class=\"icon-leaf\"></i><em>{heats}</em></span> </div>
        </div>
      </div>
    </div>
    [/loop]
    <a class=\"cover\" href=\"#\" target=\"_blank\"><img style=\"display: block;\" class=\"cover imgloadinglater\" src=\"template/zvis_6_ui/src/source-560x420.png\" alt=\"UIu8bbeu8ba1u89c4u8303\" rel=\"nofollow\" height=\"210\" width=\"280\"> </a>","footer":"","header":"","indexplus":{},"index":{},"orderplus":[],"order":{},"loopplus":[],"loop":"<div class=\"pos\"><a href=\"{url}\" class=\"cover\" target=\"_blank\"> <img style=\"display: inline;\" src=\"{pic}\" class=\"imgloadinglater\" alt=\"{title}\" rel=\"nofollow\" height=\"{picheight}\" width=\"{picwidth}\"> </a> <i class=\"icon-hexagon-tag h-novice-tag\"><span class=\"txt\">{forumname}</span></i>
      <div class=\"info\">
        <h1><a href=\"{url}\" target=\"_blank\">{title}</a></h1>
        <p class=\"txt\">{summary}</p>
      </div>
      <div class=\"author cl\"> <a href=\"home.php?mod=space&uid={authorid}\" class=\"avatar z\" target=\"_blank\"><img style=\"display: inline;\" src=\"{avatar}\" class=\"imgloadinglater\" alt=\"{author}\" rel=\"nofollow\" height=\"50\" width=\"50\"></a>
        <div class=\"z\" style=\"width: 190px;\">
          <h5 class=\"name\"><a href=\"home.php?mod=space&uid={authorid}\" target=\"_blank\">{author} <i class=\"cert mar2 icon-certified2\" title=\"u8ba4u8bc1u8bbeu8ba1u5e08\"></i> </a></h5>
          <div class=\"msg cl\"> <span><i class=\"icon-eye\"></i><em>{views}</em></span> <span><i class=\"icon-comment\"></i><em>{replies}</em></span> <span><i class=\"icon-leaf\"></i><em>{heats}</em></span> </div>
        </div>
      </div>
    </div>"},"hash":"205916f1"}`, Picwidth: 280, Picheight: 210, Target: "blank", Dateformat: "Y-m-d", Script: "thread", Param: `{"tids":"","uids":"","keyword":"","tagkeyword":"","typeids":"","recommend":"0","special":["0"],"viewmod":"0","rewardstatus":"0","picrequired":"1","orderby":"dateline","postdateline":"0","lastpost":"0","highlight":"0","titlelength":"55","summarylength":"80","startrow":"3","items":"1"}`, Shownum: 1, Cachetime: 3600, Cachetimerange: "", Dateline: 1564372786}
		data[11] = &db.Common_block{Bid: 12, Blockclass: "member_member", Name: "推荐作者", Title: ``, Classname: "", Summary: ``, Uid: 1, Username: "admin", Blockstyle: `{"name":"","blockclass":"member_member","makethumb":0,"getpic":0,"getsummary":0,"settarget":0,"moreu
rl":0,"fields":["url","avatar_middle","title","bio"],"template":{"raw":"<h1 class=\"h-tit ptv h-member-btn pos\">
  <a class=\"on\" href=\"javascript:;\" title=\"u63a8u8350u8bbeu8ba1u5e08\">u63a8u8350u8bbeu8ba1u5e08</a> <a href=\"#\">u66f4u591au8ba4u8bc1u8bbeu8ba1u5e08</a></h1>
  <div class=\"h-member-box\">
    <ul style=\"display: block;\" class=\"h-member cl\">
     [loop]
      <li class=\"cl\"> <a href=\"{url}\" class=\"avatar-sm\" title=\"\" target=\"_blank\"> <img rel=\"nofollow\" src=\"{avatar_middle}\" alt=\"{title}\"> </a>
        <div class=\"cont\" style=\"box-shadow: none;\">
          <h5 class=\"user\"><a href=\"{url}\" target=\"_blank\">{title}</a></h5>
          <p class=\"text\">{bio}</p>
        </div>
      </li>
     [/loop]
    </ul>
  </div>
  <div class=\"line\"></div>","footer":"","header":"","indexplus":{},"index":{},"orderplus":[],"order":{},"loopplus":[],"loop":"<li class=\"cl\"> <a href=\"{url}\" class=\"avatar-sm\" title=\"\" target=\"_blank\"> <img rel=\"nofollow\" src=\"{avatar_middle}\" alt=\"{title}\"> </a>
        <div class=\"cont\" style=\"box-shadow: none;\">
          <h5 class=\"user\"><a href=\"{url}\" target=\"_blank\">{title}</a></h5>
          <p class=\"text\">{bio}</p>
        </div>
      </li>"},"hash":"40d78938"}`, Target: "blank", Dateformat: "Y-m-d", Script: "member", Param: `{"uids":"","special":"","gender":"","xbirthprovince":"","xresideprovince":"","avatarstatus":"0","orderby":"credits","extcredit":"1","lastpost":"","startrow":"0","items":"8"}`, Shownum: 8, Cachetime: 3600, Cachetimerange: "", Dateline: 1564372950}
		data[12] = &db.Common_block{Bid: 13, Blockclass: "html_html", Name: "合作伙伴", Title: ``, Classname: "", Summary: `<h1 class="h-tit2">合作伙伴</h1>
  <div class="h-partners cl">
    <ul class="logo cl">
      <li><a href="#" target="_blank" title="小米"><img style="display: inline;" src="template/zvis_6_ui/src/img/1447656039_430.png" class="imgloadinglater" alt="小米" rel="nofollow"></a></li>
      <li><a href="#/" target="_blank" title="Vchello"><img style="display: inline;" src="template/zvis_6_ui/src/img/1447654816_196.png" class="imgloadinglater" alt="Vchello" rel="nofollow"></a></li>
      <li><a href="#" target="_blank" title="广告门"><img style="display: inline;" src="template/zvis_6_ui/src/img/1476325986_293.png" class="imgloadinglater" alt="广告门" rel="nofollow"></a></li>
      <li><a href="#" target="_blank" title="腾讯CDC"><img style="display: inline;" src="template/zvis_6_ui/src/img/1477367713_977.png" class="imgloadinglater" alt="腾讯CDC" rel="nofollow"></a></li>
      <li><a href="#" target="_blank" title="百度mux"><img style="display: inline;" src="template/zvis_6_ui/src/img/1462355924_645.png" class="imgloadinglater" alt="百度mux" rel="nofollow"></a></li>
      <li><a href="#" target="_blank" title="七牛云存储"><img style="display: inline;" src="template/zvis_6_ui/src/img/1478232729_344.png" class="imgloadinglater" alt="七牛云存储" rel="nofollow"></a></li>
      <li><a href="#" target="_blank" title="UCloud"><img style="display: inline;" src="template/zvis_6_ui/src/img/1470974880_860.png" class="imgloadinglater" alt="UCloud" rel="nofollow"></a></li>
    </ul>
    <ul class="text cl">
      <li><a href="#" target="_blank" title="H5案例分享">H5案例分享</a></li>
      <li><a href="#" target="_blank" title="商标注册">商标注册</a></li>
      <li><a href="#" target="_blank" title="MAKA">微场景制作</a></li>
      <li><a href="#" target="_blank" title="iH5">iH5</a></li>
      <li><a href="#" target="_blank" title="创客贴在线设计">创客贴在线设计</a></li>
      <li><a href="#" target="_blank" title="Fotor设计">Fotor设计</a></li>
      <li><a href="#" target="_blank" title="微投网">微投网</a></li>
      <li><a href="#" target="_blank" title="OpenCom">OpenCom</a></li>
      <li><a href="#" target="_blank" title="踏得网">踏得网</a></li>
      <li><a href="#" target="_blank" title="11space">11space</a></li>
      <li><a href="#" target="_blank" title="千广网">千广网</a></li>
      <li><a href="#" target="_blank" title="素材库">素材库</a></li>
      <li><a href="#" target="_blank" title="视觉同盟">视觉同盟</a></li>
      <li><a href="#" target="_blank" title="Bugtags">Bugtags</a></li>
      <li><a href="#" target="_blank" title="屏面">屏面</a></li>
      <li><a href="#" target="_blank" title="摄图网">摄图网</a></li>
      <li><a href="#" target="_blank" title="优设">优设</a></li>
      <li><a href="#" target="_blank" title="跟对人">跟对人</a></li>
      <li><a href="#" target="_blank" title="H5页面制作">H5页面制作</a></li>
      <li><a href="#" target="_blank" title="猎豹移动">猎豹移动</a></li>
    </ul>
  </div>`, Uid: 1, Username: "admin", Blockstyle: `{}`, Target: "blank", Dateformat: "Y-m-d", Script: "blank", Param: `{"content":"  <h1 class=\\"h-tit2\\">u5408u4f5cu4f19u4f34</h1>
  <div class=\\"h-partners cl\\">
    <ul class=\\"logo cl\\">
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"u5c0fu7c73\\"><img style=\\"display: inline;\\" src=\\"template/zvis_6_ui/src/img/1447656039_430.png\\" class=\\"imgloadinglater\\" alt=\\"u5c0fu7c73\\" rel=\\"nofollow\\"></a></li>
      <li><a href=\\"#/\\" target=\\"_blank\\" title=\\"Vchello\\"><img style=\\"display: inline;\\" src=\\"template/zvis_6_ui/src/img/1447654816_196.png\\" class=\\"imgloadinglater\\" alt=\\"Vchello\\" rel=\\"nofollow\\"></a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"u5e7fu544au95e8\\"><img style=\\"display: inline;\\" src=\\"template/zvis_6_ui/src/img/1476325986_293.png\\" class=\\"imgloadinglater\\" alt=\\"u5e7fu544au95e8\\" rel=\\"nofollow\\"></a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"u817eu8bafCDC\\"><img style=\\"display: inline;\\" src=\\"template/zvis_6_ui/src/img/1477367713_977.png\\" class=\\"imgloadinglater\\" alt=\\"u817eu8bafCDC\\" rel=\\"nofollow\\"></a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"u767eu5ea6mux\\"><img style=\\"display: inline;\\" src=\\"template/zvis_6_ui/src/img/1462355924_645.png\\" class=\\"imgloadinglater\\" alt=\\"u767eu5ea6mux\\" rel=\\"nofollow\\"></a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"u4e03u725bu4e91u5b58u50a8\\"><img style=\\"display: inline;\\" src=\\"template/zvis_6_ui/src/img/1478232729_344.png\\" class=\\"imgloadinglater\\" alt=\\"u4e03u725bu4e91u5b58u50a8\\" rel=\\"nofollow\\"></a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"UCloud\\"><img style=\\"display: inline;\\" src=\\"template/zvis_6_ui/src/img/1470974880_860.png\\" class=\\"imgloadinglater\\" alt=\\"UCloud\\" rel=\\"nofollow\\"></a></li>
    </ul>
    <ul class=\\"text cl\\">
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"H5u6848u4f8bu5206u4eab\\">H5u6848u4f8bu5206u4eab</a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"u5546u6807u6ce8u518c\\">u5546u6807u6ce8u518c</a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"MAKA\\">u5faeu573au666fu5236u4f5c</a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"iH5\\">iH5</a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"u521bu5ba2u8d34u5728u7ebfu8bbeu8ba1\\">u521bu5ba2u8d34u5728u7ebfu8bbeu8ba1</a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"Fotoru8bbeu8ba1\\">Fotoru8bbeu8ba1</a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"u5faeu6295u7f51\\">u5faeu6295u7f51</a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"OpenCom\\">OpenCom</a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"u8e0fu5f97u7f51\\">u8e0fu5f97u7f51</a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"11space\\">11space</a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"u5343u5e7fu7f51\\">u5343u5e7fu7f51</a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"u7d20u6750u5e93\\">u7d20u6750u5e93</a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"u89c6u89c9u540cu76df\\">u89c6u89c9u540cu76df</a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"Bugtags\\">Bugtags</a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"u5c4fu9762\\">u5c4fu9762</a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"u6444u56feu7f51\\">u6444u56feu7f51</a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"u4f18u8bbe\\">u4f18u8bbe</a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"u8ddfu5bf9u4eba\\">u8ddfu5bf9u4eba</a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"H5u9875u9762u5236u4f5c\\">H5u9875u9762u5236u4f5c</a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"u730eu8c79u79fbu52a8\\">u730eu8c79u79fbu52a8</a></li>
    </ul>
  </div>","items":"10"}`, Shownum: 10, Cachetime: 3600, Cachetimerange: "", Dateline: 1564393921}
		data[13] = &db.Common_block{Bid: 14, Blockclass: "forum_thread", Name: "门户首页幻灯", Title: ``, Classname: "", Summary: ``, Uid: 1, Username: "admin", Blockstyle: `{"name":"","blockclass":"forum_thread","makethumb":1,"getpic":1,"getsummary":0,"settarget":0,"mor
eurl":0,"fields":["url","title","pic"],"template":{"raw":"<div id=\"slider\" class=\"nivoSlider\">
   [loop]
  <a href=\"{url}\" class=\"adv_img nivo-imageLink\" target=\"_blank\" title=\"{title}\"><img style=\"width: 1180px; visibility: hidden;\" src=\"{pic}\" alt=\"{title}\" width=\"{picwidth}\" height=\"{picheight}\" /></a>
   [/loop]
</div>","footer":"","header":"","indexplus":{},"index":{},"orderplus":[],"order":{},"loopplus":[],"loop":"<a href=\"{url}\" class=\"adv_img nivo-imageLink\" target=\"_blank\" title=\"{title}\"><img style=\"width: 1180px; visibility: hidden;\" src=\"{pic}\" alt=\"{title}\" width=\"{picwidth}\" height=\"{picheight}\" /></a>"},"hash":"eb094a06"}`, Picwidth: 1180, Picheight: 350, Target: "blank", Dateformat: "Y-m-d", Script: "thread", Param: `{"tids":"","uids":"","keyword":"","tagkeyword":"","typeids":"","recommend":"0","special":["0"],"viewmod":"0","rewardstatus":"0","picrequired":"1","orderby":"lastpost","postdateline":"0","lastpost":"0","highlight":"0","titlelength":"40","summarylength":"80","startrow":"0","items":"7"}`, Shownum: 7, Cachetime: 3600, Cachetimerange: "", Dateline: 1564394047}
		data[14] = &db.Common_block{Bid: 15, Blockclass: "html_html", Name: "便民服务", Title: `<div class="blocktitle title"><span style="float:;margin-left:px;font-size:;color: !important;" class="titletext">便民服务</span></div>`, Classname: "", Summary: `<div class="
_helplidelist">
  <div style="display: block;">
    <div class="grid_list">
      <ul>
        <li><a href="#" target="_blank"><span class="grid_list_img"><img src="template/zvis_6_ui/src/s_customer.png" height="30" width="30"></span>在线咨询</a></li>
        <li><a href="#" target="_blank"><span class="grid_list_img"><img src="template/zvis_6_ui/src/s_map.png" height="30" width="30"></span>公司地址</a></li>
        <li><a href="#" target="_blank"><span class="grid_list_img"><img src="template/zvis_6_ui/src/s_service.png" height="30" width="30"></span>服务中心</a></li>
      </ul>
    </div>
    <div class="customer_service">
      <h4 class="fullfont color">400-8826-226</h4>
      <p class="font12 color3">电话服务热线时间：9:00 - 21:00</p>
    </div>
  </div>
</div>`, Uid: 1, Username: "admin", Blockstyle: `{}`, Target: "blank", Dateformat: "Y-m-d", Script: "blank", Param: `{"content":"<div class=\\"_helplidelist\\">
  <div style=\\"display: block;\\">
    <div class=\\"grid_list\\">
      <ul>
        <li><a href=\\"#\\" target=\\"_blank\\"><span class=\\"grid_list_img\\"><img src=\\"template/zvis_6_ui/src/s_customer.png\\" height=\\"30\\" width=\\"30\\"></span>u5728u7ebfu54a8u8be2</a></li>
        <li><a href=\\"#\\" target=\\"_blank\\"><span class=\\"grid_list_img\\"><img src=\\"template/zvis_6_ui/src/s_map.png\\" height=\\"30\\" width=\\"30\\"></span>u516cu53f8u5730u5740</a></li>
        <li><a href=\\"#\\" target=\\"_blank\\"><span class=\\"grid_list_img\\"><img src=\\"template/zvis_6_ui/src/s_service.png\\" height=\\"30\\" width=\\"30\\"></span>u670du52a1u4e2du5fc3</a></li>
      </ul>
    </div>
    <div class=\\"customer_service\\">
      <h4 class=\\"fullfont color\\">400-8826-226</h4>
      <p class=\\"font12 color3\\">u7535u8bddu670du52a1u70edu7ebfu65f6u95f4uff1a9:00 - 21:00</p>
    </div>
  </div>
</div>","items":"10"}`, Shownum: 10, Cachetimerange: "0,0", Dateline: 1563189679}
		data[15] = &db.Common_block{Bid: 16, Blockclass: "html_html", Name: "社区新手", Title: `<div class="blocktitle title"><span style="float:;margin-left:px;font-size:;color: !important;" class="titletext">社区新手</span></div>`, Classname: "", Summary: `<div class="
forum_newbie" style="display: block;">
<ul class="top_list cl">
<a href="#" target="_blank"><span class="a_arrow"></span>发帖回复</a>
<a href="#" target="_blank"><span class="a_arrow"></span>社区版规</a>
<a href="#" target="_blank"><span class="a_arrow"></span>金币达人</a>
<a href="#" target="_blank"><span class="a_arrow"></span>任务体系</a>
<a href="#" target="_blank"><span class="a_arrow"></span>荣誉勋章</a>
<a href="#" target="_blank"><span class="a_arrow"></span>会员认证</a>
</ul>
</div>`, Uid: 1, Username: "admin", Blockstyle: `{}`, Target: "blank", Dateformat: "Y-m-d", Script: "blank", Param: `{"content":"<div class=\\"forum_newbie\\" style=\\"display: block;\\">
<ul class=\\"top_list cl\\">
<a href=\\"#\\" target=\\"_blank\\"><span class=\\"a_arrow\\"></span>u53d1u5e16u56deu590d</a>
<a href=\\"#\\" target=\\"_blank\\"><span class=\\"a_arrow\\"></span>u793eu533au7248u89c4</a>
<a href=\\"#\\" target=\\"_blank\\"><span class=\\"a_arrow\\"></span>u91d1u5e01u8fbeu4eba</a>
<a href=\\"#\\" target=\\"_blank\\"><span class=\\"a_arrow\\"></span>u4efbu52a1u4f53u7cfb</a>
<a href=\\"#\\" target=\\"_blank\\"><span class=\\"a_arrow\\"></span>u8363u8a89u52cbu7ae0</a>
<a href=\\"#\\" target=\\"_blank\\"><span class=\\"a_arrow\\"></span>u4f1au5458u8ba4u8bc1</a>
</ul>
</div>","items":"10"}`, Shownum: 10, Cachetime: 3600, Cachetimerange: "", Dateline: 1564569126}
		data[16] = &db.Common_block{Bid: 17, Blockclass: "html_html", Name: "关注我们", Title: `<div class="blocktitle title"><span style="float:;margin-left:px;font-size:;color: !important;" class="titletext">关注我们</span></div>`, Classname: "", Summary: `<div class="
snswidget" style="display: block;">
  <div class="sns_widget"><a href="#" title="ZUK官方微博" target="_blank"><img src="template/zvis_6_ui/src/wb_sidebar.jpg" height="120" width="120"></a>
    <p><a href="#" target="_blank" title="ZUK官方微博">官方微博</a></p>
  </div>
  <div class="sns_widget"><img src="template/zvis_6_ui/src/wx.png" title="扫一扫关注微信" height="120" width="120">
    <p>ZUK微信</p>
  </div>
</div>`, Uid: 1, Username: "admin", Blockstyle: `{}`, Target: "blank", Dateformat: "Y-m-d", Script: "blank", Param: `{"content":"<div class=\\"snswidget\\" style=\\"display: block;\\">
  <div class=\\"sns_widget\\"><a href=\\"#\\" title=\\"ZUKu5b98u65b9u5faeu535a\\" target=\\"_blank\\"><img src=\\"template/zvis_6_ui/src/wb_sidebar.jpg\\" height=\\"120\\" width=\\"120\\"></a>
    <p><a href=\\"#\\" target=\\"_blank\\" title=\\"ZUKu5b98u65b9u5faeu535a\\">u5b98u65b9u5faeu535a</a></p>
  </div>
  <div class=\\"sns_widget\\"><img src=\\"template/zvis_6_ui/src/wx.png\\" title=\\"u626bu4e00u626bu5173u6ce8u5faeu4fe1\\" height=\\"120\\" width=\\"120\\">
    <p>ZUKu5faeu4fe1</p>
  </div>
</div>","items":"10"}`, Shownum: 10, Cachetime: 3600, Cachetimerange: "", Dateline: 1564568921}
		data[17] = &db.Common_block{Bid: 18, Blockclass: "forum_thread", Name: "推荐阅读", Title: ``, Classname: "", Summary: ``, Uid: 1, Username: "admin", Blockstyle: `{"name":"","blockclass":"forum_thread","makethumb":0,"getpic":0,"getsummary":0,"settarget":0,"moreurl
":0,"fields":["url","title","dateline"],"template":{"raw":"<div class=\"box s_timeline\">
<h3 class=\"modname\">u63a8u8350u9605u8bfb</h3>
<div class=\"s_text_list\">
<div class=\"nano has-scrollbar\">
<ul style=\"right: -17px;\" tabindex=\"0\" class=\"nano-content\">
 [loop]
   <li><i><span></span></i><a href=\"{url}\" target=\"_blank\">{title}</a><p>{dateline}</p></li>
 [/loop]
</ul>
</div>
</div></div>","footer":"","header":"","indexplus":{},"index":{},"orderplus":[],"order":{},"loopplus":[],"loop":"<li><i><span></span></i><a href=\"{url}\" target=\"_blank\">{title}</a><p>{dateline}</p></li>"},"hash":"4bd4809c"}`, Target: "blank", Dateformat: "Y-m-d", Script: "thread", Param: `{"tids":"","uids":"","keyword":"","tagkeyword":"","typeids":"","recommend":"0","viewmod":"0","rewardstatus":"0","picrequired":"0","orderby":"lastpost","postdateline":"0","lastpost":"0","highlight":"0","titlelength":"40","summarylength":"80","startrow":"0","items":"9"}`, Shownum: 9, Cachetime: 3600, Cachetimerange: "", Dateline: 1564643970}
		data[18] = &db.Common_block{Bid: 19, Blockclass: "forum_thread", Name: "论坛首页幻灯", Title: ``, Classname: "", Summary: ``, Uid: 1, Username: "admin", Blockstyle: `{"name":"","blockclass":"forum_thread","makethumb":1,"getpic":1,"getsummary":0,"settarget":0,"mor
eurl":0,"fields":["url","pic"],"template":{"raw":"<div class=\"focusBox2 cl\">
  <ul class=\"pic cl\">
   [loop]
    <li><a href=\"{url}\" target=\"_blank\"><img src=\"{pic}\" width=\"{picwidth}\" height=\"{picheight}\" /></a></li>
   [/loop]
  </ul>
  <ul class=\"hd\">
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>
</div>
<script type=\"text/javascript\">
   jQuery(\".focusBox2\").slide({ mainCell:\".pic\",effect:\"left\", autoPlay:true, delayTime:300});
</script>","footer":"","header":"","indexplus":{},"index":{},"orderplus":[],"order":{},"loopplus":[],"loop":"<li><a href=\"{url}\" target=\"_blank\"><img src=\"{pic}\" width=\"{picwidth}\" height=\"{picheight}\" /></a></li>"},"hash":"824c8aa0"}`, Picwidth: 380, Picheight: 211, Target: "blank", Dateformat: "Y-m-d", Script: "thread", Param: `{"tids":"","uids":"","keyword":"","tagkeyword":"","typeids":"","recommend":"0","special":["0"],"viewmod":"0","rewardstatus":"0","picrequired":"1","orderby":"dateline","postdateline":"0","lastpost":"0","highlight":"0","titlelength":"40","summarylength":"80","startrow":"0","items":"4"}`, Shownum: 4, Cachetime: 3600, Cachetimerange: "", Dateline: 1564630413}
		data[19] = &db.Common_block{Bid: 20, Blockclass: "forum_thread", Name: "最新回复", Title: `<div class="blocktitle title"><span style="float:;margin-left:px;font-size:;color: !important;" class="titletext">最新回复</span></div>`, Classname: "", Summary: ``, Uid: 1, Username: "admin", Blockstyle: `{"name":"","blockclass":"forum_thread","makethumb":0,"getpic":0,"getsummary":0,"settarget":1,"moreurl":0,"fields":["url","title","dateline"],"template":{"raw":"<div class=\"forum_list cl\">
<ul>
[loop]<li><a href=\"{url}\" title=\"{title}\"{target}>{title}</a><span>{dateline}</span></li>[/loop]
</ul>
</div>","footer":"","header":"","indexplus":{},"index":{},"orderplus":[],"order":{},"loopplus":[],"loop":"<li><a href=\"{url}\" title=\"{title}\"{target}>{title}</a><span>{dateline}</span></li>"},"hash":"aeb7590a"}`, Target: "blank", Dateformat: "m-d", Script: "thread", Param: `{"tids":"","uids":"","keyword":"","tagkeyword":"","typeids":"","recommend":"0","viewmod":"0","rewardstatus":"0","picrequired":"0","orderby":"lastpost","postdateline":"0","lastpost":"0","highlight":"0","titlelength":"50","summarylength":"80","startrow":"0","items":"6"}`, Shownum: 6, Cachetime: 3600, Cachetimerange: "", Dateline: 1564630461}
		data[20] = &db.Common_block{Bid: 21, Blockclass: "forum_thread", Name: "热门帖子", Title: `<div class="blocktitle title"><span style="float:;margin-left:px;font-size:;color: !important;" class="titletext">热门帖子</span></div>`, Classname: "", Summary: ``, Uid: 1, Username: "admin", Blockstyle: `{"name":"","blockclass":"forum_thread","makethumb":0,"getpic":0,"getsummary":0,"settarget":1,"moreurl":0,"fields":["url","title","dateline"],"template":{"raw":"<div class=\"forum_list cl\">
<ul>
[loop]<li><a href=\"{url}\" title=\"{title}\"{target}>{title}</a><span>{dateline}</span></li>[/loop]
</ul>
</div>","footer":"","header":"","indexplus":{},"index":{},"orderplus":[],"order":{},"loopplus":[],"loop":"<li><a href=\"{url}\" title=\"{title}\"{target}>{title}</a><span>{dateline}</span></li>"},"hash":"aeb7590a"}`, Target: "blank", Dateformat: "m-d", Script: "thread", Param: `{"tids":"","uids":"","keyword":"","tagkeyword":"","typeids":"","recommend":"0","viewmod":"0","rewardstatus":"0","picrequired":"0","orderby":"heats","postdateline":"0","lastpost":"0","highlight":"0","titlelength":"50","summarylength":"80","startrow":"0","items":"6"}`, Shownum: 6, Cachetime: 3600, Cachetimerange: "", Dateline: 1564643613}
		data[21] = &db.Common_block{Bid: 22, Blockclass: "member_member", Name: "最新会员", Title: `<div class="blocktitle title"><span style="float:;margin-left:px;font-size:;color: !important;" class="titletext">最新会员</span></div>`, Classname: "", Summary: ``, Uid: 1, Username: "admin", Blockstyle: `{"name":"","blockclass":"member_member","makethumb":0,"getpic":0,"getsummary":0,"settarget":1,"moreurl":0,"fields":["avatar","title","url","regdate"],"template":{"raw":"<div class=\"forum_list cl\">
<ul>
[loop]<li><div class=\"z\" style=\"width: 22px; height: 22px; line-height: 22px; margin-right: 12px; margin-top: 4px; border-radius: 22px; overflow: hidden;\"><img src=\"{avatar}\" width=\"22\" height=\"22\" alt=\"{title}\" /></div><a href=\"{url}\" title=\"{title}\"{target}>{title}</a><span>{regdate}</span></li>[/loop]
</ul>
</div>","footer":"","header":"","indexplus":{},"index":{},"orderplus":[],"order":{},"loopplus":[],"loop":"<li><div class=\"z\" style=\"width: 22px; height: 22px; line-height: 22px; margin-right: 12px; margin-top: 4px; border-radius: 22px; overflow: hidden;\"><img src=\"{avatar}\" width=\"22\" height=\"22\" alt=\"{title}\" /></div><a href=\"{url}\" title=\"{title}\"{target}>{title}</a><span>{regdate}</span></li>"},"hash":"8d444f82"}`, Target: "blank", Dateformat: "m-d", Script: "member", Param: `{"uids":"","special":"","gender":"","xbirthprovince":"","xresideprovince":"","avatarstatus":"0","orderby":"credits","extcredit":"1","lastpost":"","startrow":"0","items":"6"}`, Shownum: 6, Cachetime: 3600, Cachetimerange: "", Dateline: 1564643933}
		data[22] = &db.Common_block{Bid: 23, Blockclass: "forum_thread", Name: "首页推荐", Title: ``, Classname: "", Summary: ``, Uid: 1, Username: "admin", Blockstyle: `{"name":"","blockclass":"forum_thread","makethumb":1,"getpic":1,"getsummary":0,"settarget":0,"moreurl
":0,"fields":["url","title","pic","forumname","views","replies","heats","authorid","avatar","author"],"template":{"raw":"<ul class=\"post post-works mtw cl\" id=\"itemContainer\">
 [loop]
    <li>
      <div class=\"shade\"></div>
      <div class=\"cover pos\"> <a href=\"{url}\" target=\"_blank\" title=\"{title}\"> <img style=\"display: inline;\" src=\"{pic}\" class=\"imgloadinglater\" alt=\"{title}\" rel=\"nofollow\" height=\"{picheight}\" width=\"{picwidth}\" /> </a> </div>
      <div class=\"info\">
        <h4 class=\"tits ellipsis download\">{title}</h4>
        <div class=\"msg mtn cl\"> <span class=\"classify\">{forumname}</span> <span><i class=\"icon-eye\" title=\"u6d4fu89c8u6570\"></i><em>{views}</em></span> <span><i class=\"icon-comment\" title=\"u8bc4u8bbau6570\"></i><em>{replies}</em></span> <span><i class=\"icon-leaf\" title=\"u70edu5ea6\"></i><em>{heats}</em></span> </div>
        <p class=\"user cl\"> <a href=\"home.php?mod=space&uid={authorid}\" target=\"_blank\"><img src=\"{avatar}\" title=\"{author}\"> <strong class=\"name\"> <em>{author}</em> </strong></a> </p>
      </div>
      <div class=\"line\"></div>
    </li>
  [/loop]
</ul>


<div class=\"cl\" style=\"text-align: center;\">
<div id=\"pager\" class=\"pager\"></div>
<div class=\"h_page cl\"><a href=\"news\" target=\"_blank\">...</a></div>
</div>
<script type=\"text/javascript\">
jQuery.noConflict();
jQuery(function(){
        //u9996u5148u5c06#back-to-topu9690u85cf
        jQuery(\"#pager\").hide();
        //u5f53u6edau52a8u6761u7684u4f4du7f6eu5904u4e8eu8dddu9876u90e8100u50cfu7d20u4ee5u4e0bu65f6uff0cu8df3u8f6cu94feu63a5u51fau73b0uff0cu5426u5219u6d88u5931
        jQuery(function () {
            jQuery(window).scroll(function(){
                if (jQuery(window).scrollTop()>100){

                }
                else
                {

                }
            });
            //u5f53u70b9u51fbu8df3u8f6cu94feu63a5u540euff0cu56deu5230u9875u9762u9876u90e8u4f4du7f6e
            jQuery(\"#pager\").click(function(){
                jQuery('body,html').animate({scrollTop:440},500);
                return false;
            });
        });
    });
</script>","footer":"","header":"","indexplus":{},"index":{},"orderplus":[],"order":{},"loopplus":[],"loop":"<li>
      <div class=\"shade\"></div>
      <div class=\"cover pos\"> <a href=\"{url}\" target=\"_blank\" title=\"{title}\"> <img style=\"display: inline;\" src=\"{pic}\" class=\"imgloadinglater\" alt=\"{title}\" rel=\"nofollow\" height=\"{picheight}\" width=\"{picwidth}\" /> </a> </div>
      <div class=\"info\">
        <h4 class=\"tits ellipsis download\">{title}</h4>
        <div class=\"msg mtn cl\"> <span class=\"classify\">{forumname}</span> <span><i class=\"icon-eye\" title=\"u6d4fu89c8u6570\"></i><em>{views}</em></span> <span><i class=\"icon-comment\" title=\"u8bc4u8bbau6570\"></i><em>{replies}</em></span> <span><i class=\"icon-leaf\" title=\"u70edu5ea6\"></i><em>{heats}</em></span> </div>
        <p class=\"user cl\"> <a href=\"home.php?mod=space&uid={authorid}\" target=\"_blank\"><img src=\"{avatar}\" title=\"{author}\"> <strong class=\"name\"> <em>{author}</em> </strong></a> </p>
      </div>
      <div class=\"line\"></div>
    </li>"},"hash":"c02a90b0"}`, Picwidth: 280, Picheight: 210, Target: "blank", Dateformat: "Y-m-d", Script: "thread", Param: `{"tids":"","uids":"","keyword":"","tagkeyword":"","typeids":"","recommend":"0","special":["0"],"viewmod":"0","rewardstatus":"0","picrequired":"1","orderby":"lastpost","postdateline":"0","lastpost":"0","highlight":"0","titlelength":"40","summarylength":"80","startrow":"0","items":"36"}`, Shownum: 36, Cachetime: 3600, Cachetimerange: "", Dateline: 1564559649}
		data[23] = &db.Common_block{Bid: 24, Blockclass: "html_html", Name: "tit", Title: ``, Classname: "", Summary: `<div class="cl pos">
    <ul class="h-screen">
      <li class="on"><a href="javascript:;" title="首页推荐">首页推荐</a></li>
      <li><a href="#" title="佳作分享">佳作分享</a></li>
      <li><a href="#" title="最新作品">最新作品</a></li>
    </ul>
    <!--  -->
    <ul class="h-soup cl">
      <li> <i class="icon-star1" title="更新"></i> <a class="txt" href="#" target="_blank">"鸡汤"栏目正式更新为 "每日一条"，大家可以互动啦！ </a> </li>
      <li class="open"> <i class="icon-heart-round" title="一条"></i> <a class="txt" href="#" target="_blank">你现在的努力远没有需要拼天份的地步~ </a> </li>
      <li> <i class="icon-warn" title="公告"></i> <a class="txt" href="#" target="_blank">关于作品／文章推荐，UI中国特此声明 </a> </li>
    </ul>
</div>`, Uid: 1, Username: "admin", Blockstyle: `{}`, Target: "blank", Dateformat: "Y-m-d", Script: "blank", Param: `{"content":"<div class=\\"cl pos\\">
    <ul class=\\"h-screen\\">
      <li class=\\"on\\"><a href=\\"javascript:;\\" title=\\"u9996u9875u63a8u8350\\">u9996u9875u63a8u8350</a></li>
      <li><a href=\\"#\\" title=\\"u4f73u4f5cu5206u4eab\\">u4f73u4f5cu5206u4eab</a></li>
      <li><a href=\\"#\\" title=\\"u6700u65b0u4f5cu54c1\\">u6700u65b0u4f5cu54c1</a></li>
    </ul>
    <!--  -->
    <ul class=\\"h-soup cl\\">
      <li> <i class=\\"icon-star1\\" title=\\"u66f4u65b0\\"></i> <a class=\\"txt\\" href=\\"#\\" target=\\"_blank\\">\\"u9e21u6c64\\"u680fu76eeu6b63u5f0fu66f4u65b0u4e3a \\"u6bcfu65e5u4e00u6761\\"uff0cu5927u5bb6u53efu4ee5u4e92u52a8u5566uff01 </a> </li>
      <li class=\\"open\\"> <i class=\\"icon-heart-round\\" title=\\"u4e00u6761\\"></i> <a class=\\"txt\\" href=\\"#\\" target=\\"_blank\\">u4f60u73b0u5728u7684u52aau529bu8fdcu6ca1u6709u9700u8981u62fcu5929u4efdu7684u5730u6b65~ </a> </li>
      <li> <i class=\\"icon-warn\\" title=\\"u516cu544a\\"></i> <a class=\\"txt\\" href=\\"#\\" target=\\"_blank\\">u5173u4e8eu4f5cu54c1uff0fu6587u7ae0u63a8u8350uff0cUIu4e2du56fdu7279u6b64u58f0u660e </a> </li>
    </ul>
</div>","items":"10"}`, Shownum: 10, Cachetime: 3600, Cachetimerange: "", Dateline: 1564559630}
		data[24] = &db.Common_block{Bid: 25, Blockclass: "forum_thread", Name: "推荐文章", Title: ``, Classname: "", Summary: ``, Uid: 1, Username: "admin", Blockstyle: `{"name":"","blockclass":"forum_thread","makethumb":1,"getpic":1,"getsummary":1,"settarget":0,"moreurl
":0,"fields":["url","title","pic","forumurl","forumname","summary","authorid","author","avatar","views","replies","heats","dateline"],"template":{"raw":"<h1 class=\"h-tit mtv h-article-btn pos\"><a class=\"on\" href=\"javascript:;\" title=\"u6587u7ae0\">u63a8u8350u6587u7ae0</a><a href=\"#\" title=\"u6700u65b0u6587u7ae0\">u6700u65b0u6587u7ae0</a> </h1>
      <div class=\"h-article-box\">
        <ul class=\"h-article-list\" id=\"itemContainer2\">
         [loop]
          <li class=\"cl\"> <a href=\"{url}\" title=\"{title}\" target=\"_blank\">
            <div class=\"shade\"></div>
            <div class=\"showd\"> <span class=\"cover\"> <img src=\"{pic}\" alt=\"{title}\" rel=\"nofollow\" height=\"{picheight}\" width=\"{picwidth}\" /> </span>
              <div class=\"h-article-info\">
                <h1 class=\"cl\"> <span class=\"tag bg-blue\" target=\"_blank\" href=\"{forumurl}\">{forumname}</span> <span class=\"ellipsis\" href=\"{url}\" title=\"{title}\" target=\"_blank\">{title}</span> </h1>
                <p>{summary}...</p>
                <div class=\"mtm cl\"> <span class=\"avatar z\" href=\"home.php?mod=space&uid={authorid}\" title=\"{author}\" target=\"_blank\"> <img src=\"{avatar}\" alt=\"{author}\" rel=\"nofollow\" height=\"20\" width=\"20\"> <strong class=\"name\">{author}</strong> </span>
                  <div class=\"msg z cl\"> <span><i class=\"icon-eye\"></i><em>{views}</em></span> <span><i class=\"icon-comment\"></i><em>{replies}</em></span> <span><i class=\"icon-leaf\"></i><em>{heats}</em></span> </div>
                </div>
                <div class=\"data\"><i class=\"icon-time\"></i>{dateline}</div>
              </div>
            </div>
            </a>
          </li>
         [/loop]
        </ul>
      </div>
<div class=\"cl\" style=\"padding: 10px 0; text-align: center;\">
<div id=\"holder\" class=\"holder holder2\"></div>
<div class=\"h_page cl\"><a href=\"news\" target=\"_blank\">...</a></div>
</div>
<script type=\"text/javascript\">
jQuery.noConflict();
jQuery(function(){
        //u9996u5148u5c06#back-to-topu9690u85cf
        jQuery(\".holder2\").hide();
        //u5f53u6edau52a8u6761u7684u4f4du7f6eu5904u4e8eu8dddu9876u90e8100u50cfu7d20u4ee5u4e0bu65f6uff0cu8df3u8f6cu94feu63a5u51fau73b0uff0cu5426u5219u6d88u5931
        jQuery(function () {
            jQuery(window).scroll(function(){
                if (jQuery(window).scrollTop()>100){

                }
                else
                {

                }
            });
            //u5f53u70b9u51fbu8df3u8f6cu94feu63a5u540euff0cu56deu5230u9875u9762u9876u90e8u4f4du7f6e
            jQuery(\".holder2\").click(function(){
                jQuery('body,html').animate({scrollTop:1560},500);
                return false;
            });
        });
    });
</script>","footer":"","header":"","indexplus":{},"index":{},"orderplus":[],"order":{},"loopplus":[],"loop":"<li class=\"cl\"> <a href=\"{url}\" title=\"{title}\" target=\"_blank\">
            <div class=\"shade\"></div>
            <div class=\"showd\"> <span class=\"cover\"> <img src=\"{pic}\" alt=\"{title}\" rel=\"nofollow\" height=\"{picheight}\" width=\"{picwidth}\" /> </span>
              <div class=\"h-article-info\">
                <h1 class=\"cl\"> <span class=\"tag bg-blue\" target=\"_blank\" href=\"{forumurl}\">{forumname}</span> <span class=\"ellipsis\" href=\"{url}\" title=\"{title}\" target=\"_blank\">{title}</span> </h1>
                <p>{summary}...</p>
                <div class=\"mtm cl\"> <span class=\"avatar z\" href=\"home.php?mod=space&uid={authorid}\" title=\"{author}\" target=\"_blank\"> <img src=\"{avatar}\" alt=\"{author}\" rel=\"nofollow\" height=\"20\" width=\"20\"> <strong class=\"name\">{author}</strong> </span>
                  <div class=\"msg z cl\"> <span><i class=\"icon-eye\"></i><em>{views}</em></span> <span><i class=\"icon-comment\"></i><em>{replies}</em></span> <span><i class=\"icon-leaf\"></i><em>{heats}</em></span> </div>
                </div>
                <div class=\"data\"><i class=\"icon-time\"></i>{dateline}</div>
              </div>
            </div>
            </a>
          </li>"},"hash":"3c0911ee"}`, Picwidth: 160, Picheight: 120, Target: "blank", Dateformat: "Y-m-d", Script: "thread", Param: `{"tids":"","uids":"","keyword":"","tagkeyword":"","typeids":"","recommend":"0","special":["0"],"viewmod":"0","rewardstatus":"0","picrequired":"1","orderby":"lastpost","postdateline":"0","lastpost":"0","highlight":"0","titlelength":"55","summarylength":"150","startrow":"0","items":"18"}`, Shownum: 18, Cachetime: 3600, Cachetimerange: "", Dateline: 1564714469}
		data[25] = &db.Common_block{Bid: 26, Blockclass: "html_html", Name: "职位", Title: ``, Classname: "", Summary: `<h1 class="h-tit-aside">热招职位</h1>
      <ul class="h-aside-list">
        <li class="pos"> <a href="#" target="_blank"><img class="cover" src="template/zvis_6_ui/src/1491033124_750.png" alt="" rel="nofollow" height="125" width="280">
          <div class="h-aside-show">
            <p class="item ellipsis">[新加坡] 高级视觉设计师 [20k-40k]</p>
          </div>
          </a> </li>
        <li class="pos"> <a href="#" target="_blank"> <img class="cover" src="template/zvis_6_ui/src/1473307771_779.jpg" alt="" rel="nofollow" height="125" width="280">
          <div class="h-aside-show">
            <p class="item ellipsis">[上海市] 高级UI设计师 [18k-30k]</p>
          </div>
          </a> </li>
        <li class="pos"> <a href="#" target="_blank"> <img class="cover" src="template/zvis_6_ui/src/1463459315_730.jpg" alt="" rel="nofollow" height="125" width="280">
          <div class="h-aside-show">
            <p class="item ellipsis">[北京市] 品牌视觉设计师 [15k-25k]</p>
            <p class="item ellipsis">[北京市] 产品设计师 [15k-25k]</p>
          </div>
          </a> </li>
      </ul>
      <a class="more" href="#" title="招聘" target="_blank">更多</a>`, Uid: 1, Username: "admin", Blockstyle: `{}`, Target: "blank", Dateformat: "Y-m-d", Script: "blank", Param: `{"content":"
<h1 class=\\"h-tit-aside\\">u70edu62dbu804cu4f4d</h1>
      <ul class=\\"h-aside-list\\">
        <li class=\\"pos\\"> <a href=\\"#\\" target=\\"_blank\\"><img class=\\"cover\\" src=\\"template/zvis_6_ui/src/1491033124_750.png\\" alt=\\"\\" rel=\\"nofollow\\" height=\\"125\\" width=\\"280\\">
          <div class=\\"h-aside-show\\">
            <p class=\\"item ellipsis\\">[u65b0u52a0u5761] u9ad8u7ea7u89c6u89c9u8bbeu8ba1u5e08 [20k-40k]</p>
          </div>
          </a> </li>
        <li class=\\"pos\\"> <a href=\\"#\\" target=\\"_blank\\"> <img class=\\"cover\\" src=\\"template/zvis_6_ui/src/1473307771_779.jpg\\" alt=\\"\\" rel=\\"nofollow\\" height=\\"125\\" width=\\"280\\">
          <div class=\\"h-aside-show\\">
            <p class=\\"item ellipsis\\">[u4e0au6d77u5e02] u9ad8u7ea7UIu8bbeu8ba1u5e08 [18k-30k]</p>
          </div>
          </a> </li>
        <li class=\\"pos\\"> <a href=\\"#\\" target=\\"_blank\\"> <img class=\\"cover\\" src=\\"template/zvis_6_ui/src/1463459315_730.jpg\\" alt=\\"\\" rel=\\"nofollow\\" height=\\"125\\" width=\\"280\\">
          <div class=\\"h-aside-show\\">
            <p class=\\"item ellipsis\\">[u5317u4eacu5e02] u54c1u724cu89c6u89c9u8bbeu8ba1u5e08 [15k-25k]</p>
            <p class=\\"item ellipsis\\">[u5317u4eacu5e02] u4ea7u54c1u8bbeu8ba1u5e08 [15k-25k]</p>
          </div>
          </a> </li>
      </ul>
      <a class=\\"more\\" href=\\"#\\" title=\\"u62dbu8058\\" target=\\"_blank\\">u66f4u591a</a>","items":"10"}`, Shownum: 10, Cachetimerange: "0,0", Dateline: 1564038345}
		data[26] = &db.Common_block{Bid: 27, Blockclass: "html_html", Name: "课程", Title: ``, Classname: "", Summary: `<h1 class="h-tit-aside mtw">热门课程</h1>
      <ul class="h-aside-list">
        <li class="pos"> <a href="#" target="_blank"> <img class="cover" src="template/zvis_6_ui/src/1487744828_327.jpg" alt="" rel="nofollow" height="125" width="280"> </a> </li>
        <li class="pos"> <a href="#" target="_blank"> <img class="cover" src="template/zvis_6_ui/src/1473390683_245.jpg" alt="" rel="nofollow" height="125" width="280"> </a> </li>
        <li class="pos"> <a href="#" target="_blank"> <img class="cover" src="template/zvis_6_ui/src/1487908457_191.jpg" alt="" rel="nofollow" height="125" width="280"> </a> </li>
      </ul>
      <a class="more" href="#" title="培训" target="_blank">更多</a>`, Uid: 1, Username: "admin", Blockstyle: `{}`, Target: "blank", Dateformat: "Y-m-d", Script: "blank", Param: `{"content":"
<h1 class=\\"h-tit-aside mtw\\">u70edu95e8u8bfeu7a0b</h1>
      <ul class=\\"h-aside-list\\">
        <li class=\\"pos\\"> <a href=\\"#\\" target=\\"_blank\\"> <img class=\\"cover\\" src=\\"template/zvis_6_ui/src/1487744828_327.jpg\\" alt=\\"\\" rel=\\"nofollow\\" height=\\"125\\" width=\\"280\\"> </a> </li>
        <li class=\\"pos\\"> <a href=\\"#\\" target=\\"_blank\\"> <img class=\\"cover\\" src=\\"template/zvis_6_ui/src/1473390683_245.jpg\\" alt=\\"\\" rel=\\"nofollow\\" height=\\"125\\" width=\\"280\\"> </a> </li>
        <li class=\\"pos\\"> <a href=\\"#\\" target=\\"_blank\\"> <img class=\\"cover\\" src=\\"template/zvis_6_ui/src/1487908457_191.jpg\\" alt=\\"\\" rel=\\"nofollow\\" height=\\"125\\" width=\\"280\\"> </a> </li>
      </ul>
      <a class=\\"more\\" href=\\"#\\" title=\\"u57f9u8bad\\" target=\\"_blank\\">u66f4u591a</a>","items":"10"}`, Shownum: 10, Cachetimerange: "0,0", Dateline: 1564038345}
		data[27] = &db.Common_block{Bid: 28, Blockclass: "forum_thread", Name: "专题推荐", Title: ``, Classname: "", Summary: ``, Uid: 1, Username: "admin", Blockstyle: `{"name":"","blockclass":"forum_thread","makethumb":0,"getpic":0,"getsummary":0,"settarget":0,"moreurl
":0,"fields":["url","title"],"template":{"raw":"    <img class=\"cover\" src=\"template/zvis_6_ui/src/xinshou-680x280.png\" alt=\"u521du7ea7u8bbeu8ba1u5e08u5fc5u8bfbu4e13u9898\" rel=\"nofollow\" height=\"134\" width=\"334\">
    <ul class=\"list\">
     [loop]
      <li><a href=\"{url}\" class=\"ellipsis\" title=\"{title}\" target=\"_blank\">{title}</a></li>
     [/loop]
    </ul>
    <a href=\"#\" class=\"more\" target=\"_blank\" title=\"u4e13u9898\">u66f4u591a...</a>","footer":"","header":"","indexplus":{},"index":{},"orderplus":[],"order":{},"loopplus":[],"loop":"<li><a href=\"{url}\" class=\"ellipsis\" title=\"{title}\" target=\"_blank\">{title}</a></li>"},"hash":"c06b029c"}`, Target: "blank", Dateformat: "Y-m-d", Script: "thread", Param: `{"tids":"","uids":"","keyword":"","tagkeyword":"","typeids":"","recommend":"0","viewmod":"0","rewardstatus":"0","picrequired":"0","orderby":"lastpost","postdateline":"0","lastpost":"0","highlight":"0","titlelength":"40","summarylength":"80","startrow":"0","items":"13"}`, Shownum: 13, Cachetime: 3600, Cachetimerange: "", Dateline: 1564714472}
		data[28] = &db.Common_block{Bid: 29, Blockclass: "forum_thread", Name: "观点", Title: ``, Classname: "", Summary: ``, Uid: 1, Username: "admin", Blockstyle: `{"name":"","blockclass":"forum_thread","makethumb":1,"getpic":1,"getsummary":1,"settarget":0,"moreurl":0,
"fields":["url","pic","title","forumname","summary","authorid","avatar","author","views","replies","heats"],"template":{"raw":"    [loop]
    <div class=\"pos\"><a href=\"{url}\" class=\"cover\" target=\"_blank\"> <img style=\"display: inline;\" src=\"{pic}\" class=\"imgloadinglater\" alt=\"{title}\" rel=\"nofollow\" height=\"{picheight}\" width=\"{picwidth}\"> </a> <i class=\"icon-hexagon-tag h-novice-tag\"><span class=\"txt\">{forumname}</span></i>
      <div class=\"info\">
        <h1><a href=\"{url}\" target=\"_blank\">{title}</a></h1>
        <p class=\"txt\">{summary}</p>
      </div>
      <div class=\"author cl\"> <a href=\"home.php?mod=space&uid={authorid}\" class=\"avatar z\" target=\"_blank\"><img style=\"display: inline;\" src=\"{avatar}\" class=\"imgloadinglater\" alt=\"{author}\" rel=\"nofollow\" height=\"50\" width=\"50\"></a>
        <div class=\"z\" style=\"width: 190px;\">
          <h5 class=\"name\"><a href=\"home.php?mod=space&uid={authorid}\" target=\"_blank\">{author} <i class=\"cert mar2 icon-certified2\" title=\"u8ba4u8bc1u8bbeu8ba1u5e08\"></i> </a></h5>
          <div class=\"msg cl\"> <span><i class=\"icon-eye\"></i><em>{views}</em></span> <span><i class=\"icon-comment\"></i><em>{replies}</em></span> <span><i class=\"icon-leaf\"></i><em>{heats}</em></span> </div>
        </div>
      </div>
    </div>
    [/loop]
    <a href=\"#\" class=\"cover\" target=\"_blank\"><img style=\"display: block;\" class=\"cover imgloadinglater\" src=\"template/zvis_6_ui/src/linian-560x420.png\" alt=\"UIu8bbeu8ba1u89c4u8303\" rel=\"nofollow\" height=\"210\" width=\"280\"> </a>","footer":"","header":"","indexplus":{},"index":{},"orderplus":[],"order":{},"loopplus":[],"loop":"<div class=\"pos\"><a href=\"{url}\" class=\"cover\" target=\"_blank\"> <img style=\"display: inline;\" src=\"{pic}\" class=\"imgloadinglater\" alt=\"{title}\" rel=\"nofollow\" height=\"{picheight}\" width=\"{picwidth}\"> </a> <i class=\"icon-hexagon-tag h-novice-tag\"><span class=\"txt\">{forumname}</span></i>
      <div class=\"info\">
        <h1><a href=\"{url}\" target=\"_blank\">{title}</a></h1>
        <p class=\"txt\">{summary}</p>
      </div>
      <div class=\"author cl\"> <a href=\"home.php?mod=space&uid={authorid}\" class=\"avatar z\" target=\"_blank\"><img style=\"display: inline;\" src=\"{avatar}\" class=\"imgloadinglater\" alt=\"{author}\" rel=\"nofollow\" height=\"50\" width=\"50\"></a>
        <div class=\"z\" style=\"width: 190px;\">
          <h5 class=\"name\"><a href=\"home.php?mod=space&uid={authorid}\" target=\"_blank\">{author} <i class=\"cert mar2 icon-certified2\" title=\"u8ba4u8bc1u8bbeu8ba1u5e08\"></i> </a></h5>
          <div class=\"msg cl\"> <span><i class=\"icon-eye\"></i><em>{views}</em></span> <span><i class=\"icon-comment\"></i><em>{replies}</em></span> <span><i class=\"icon-leaf\"></i><em>{heats}</em></span> </div>
        </div>
      </div>
    </div>"},"hash":"a63e7e76"}`, Picwidth: 280, Picheight: 210, Target: "blank", Dateformat: "Y-m-d", Script: "thread", Param: `{"tids":"","uids":"","keyword":"","tagkeyword":"","typeids":"","recommend":"0","special":["0"],"viewmod":"0","rewardstatus":"0","picrequired":"1","orderby":"dateline","postdateline":"0","lastpost":"0","highlight":"0","titlelength":"40","summarylength":"80","startrow":"0","items":"1"}`, Shownum: 1, Cachetime: 3600, Cachetimerange: "", Dateline: 1564369499}
		data[29] = &db.Common_block{Bid: 30, Blockclass: "forum_thread", Name: "第几期", Title: ``, Classname: "", Summary: ``, Uid: 1, Username: "admin", Blockstyle: `{"name":"","blockclass":"forum_thread","makethumb":1,"getpic":1,"getsummary":1,"settarget":0,"moreurl":
0,"fields":["url","pic","title","forumname","summary","authorid","avatar","author","views","replies","heats"],"template":{"raw":"    [index=1]
    <a href=\"{url}\" class=\"cover pos\" target=\"_blank\"> <img src=\"{pic}\" alt=\"{title}\" rel=\"nofollow\" height=\"{picheight}\" width=\"{picwidth}\" /> <i class=\"icon-hexagon-tag h-novice-tag purple\"><span class=\"txt\">u7b2c12u671f</span></i> </a>
    [/index]
    [index=2]
    <div class=\"pos\"> <a href=\"{url}\" class=\"cover\" target=\"_blank\"><img style=\"display: inline;\" src=\"{pic}\" class=\"imgloadinglater\" alt=\"{title}\" rel=\"nofollow\" height=\"{picheight}\" width=\"{picwidth}\"></a> <i class=\"icon-hexagon-tag h-novice-tag\"><span class=\"txt\">{forumname}</span></i>
      <div class=\"info\">
        <h1><a href=\"{url}\" target=\"_blank\">{title}</a></h1>
        <p class=\"txt\">{summary}</p>
      </div>
      <div class=\"author cl\"> <a href=\"home.php?mod=space&uid={authorid}\" class=\"avatar z\" target=\"_blank\"><img src=\"{avatar}\" alt=\"{author}\" rel=\"nofollow\" height=\"50\" width=\"50\"></a>
        <div class=\"z\" style=\"width: 190px;\">
          <h5 class=\"name\"><a href=\"home.php?mod=space&uid={authorid}\" target=\"_blank\">{author} <i class=\"cert mar2 icon-certified2\" title=\"u8ba4u8bc1u8bbeu8ba1u5e08\"></i> </a></h5>
          <div class=\"msg cl\"> <span><i class=\"icon-eye\"></i><em>{views}</em></span> <span><i class=\"icon-comment\"></i><em>{replies}</em></span> <span><i class=\"icon-leaf\"></i><em>{heats}</em></span> </div>
        </div>
      </div>
    </div>
    [/index]","footer":"","header":"","indexplus":{},"index":{"1":"<a href=\"{url}\" class=\"cover pos\" target=\"_blank\"> <img src=\"{pic}\" alt=\"{title}\" rel=\"nofollow\" height=\"{picheight}\" width=\"{picwidth}\" /> <i class=\"icon-hexagon-tag h-novice-tag purple\"><span class=\"txt\">u7b2c12u671f</span></i> </a>","2":"<div class=\"pos\"> <a href=\"{url}\" class=\"cover\" target=\"_blank\"><img style=\"display: inline;\" src=\"{pic}\" class=\"imgloadinglater\" alt=\"{title}\" rel=\"nofollow\" height=\"{picheight}\" width=\"{picwidth}\"></a> <i class=\"icon-hexagon-tag h-novice-tag\"><span class=\"txt\">{forumname}</span></i>
      <div class=\"info\">
        <h1><a href=\"{url}\" target=\"_blank\">{title}</a></h1>
        <p class=\"txt\">{summary}</p>
      </div>
      <div class=\"author cl\"> <a href=\"home.php?mod=space&uid={authorid}\" class=\"avatar z\" target=\"_blank\"><img src=\"{avatar}\" alt=\"{author}\" rel=\"nofollow\" height=\"50\" width=\"50\"></a>
        <div class=\"z\" style=\"width: 190px;\">
          <h5 class=\"name\"><a href=\"home.php?mod=space&uid={authorid}\" target=\"_blank\">{author} <i class=\"cert mar2 icon-certified2\" title=\"u8ba4u8bc1u8bbeu8ba1u5e08\"></i> </a></h5>
          <div class=\"msg cl\"> <span><i class=\"icon-eye\"></i><em>{views}</em></span> <span><i class=\"icon-comment\"></i><em>{replies}</em></span> <span><i class=\"icon-leaf\"></i><em>{heats}</em></span> </div>
        </div>
      </div>
    </div>"},"orderplus":[],"order":{},"loopplus":[],"loop":"
                                                "},"hash":"ed871e23"}`, Picwidth: 280, Picheight: 210, Target: "blank", Dateformat: "Y-m-d", Script: "thread", Param: `{"tids":"","uids":"","keyword":"","tagkeyword":"","typeids":"","recommend":"0","special":["0"],"viewmod":"0","rewardstatus":"0","picrequired":"1","orderby":"dateline","postdateline":"0","lastpost":"0","highlight":"0","titlelength":"40","summarylength":"80","startrow":"1","items":"2"}`, Shownum: 2, Cachetime: 3600, Cachetimerange: "", Dateline: 1564369698}
		data[30] = &db.Common_block{Bid: 31, Blockclass: "forum_thread", Name: "观点2", Title: ``, Classname: "", Summary: ``, Uid: 1, Username: "admin", Blockstyle: `{"name":"","blockclass":"forum_thread","makethumb":1,"getpic":1,"getsummary":1,"settarget":0,"moreurl":0
,"fields":["url","pic","title","forumname","summary","authorid","avatar","author","views","replies","heats"],"template":{"raw":"    [loop]
    <div class=\"pos\"><a href=\"{url}\" class=\"cover\" target=\"_blank\"> <img style=\"display: inline;\" src=\"{pic}\" class=\"imgloadinglater\" alt=\"{title}\" rel=\"nofollow\" height=\"{picheight}\" width=\"{picwidth}\"> </a> <i class=\"icon-hexagon-tag h-novice-tag\"><span class=\"txt\">{forumname}</span></i>
      <div class=\"info\">
        <h1><a href=\"{url}\" target=\"_blank\">{title}</a></h1>
        <p class=\"txt\">{summary}</p>
      </div>
      <div class=\"author cl\"> <a href=\"home.php?mod=space&uid={authorid}\" class=\"avatar z\" target=\"_blank\"><img style=\"display: inline;\" src=\"{avatar}\" class=\"imgloadinglater\" alt=\"{author}\" rel=\"nofollow\" height=\"50\" width=\"50\"></a>
        <div class=\"z\" style=\"width: 190px;\">
          <h5 class=\"name\"><a href=\"home.php?mod=space&uid={authorid}\" target=\"_blank\">{author} <i class=\"cert mar2 icon-certified2\" title=\"u8ba4u8bc1u8bbeu8ba1u5e08\"></i> </a></h5>
          <div class=\"msg cl\"> <span><i class=\"icon-eye\"></i><em>{views}</em></span> <span><i class=\"icon-comment\"></i><em>{replies}</em></span> <span><i class=\"icon-leaf\"></i><em>{heats}</em></span> </div>
        </div>
      </div>
    </div>
    [/loop]
    <a class=\"cover\" href=\"#\" target=\"_blank\"><img style=\"display: block;\" class=\"cover imgloadinglater\" src=\"template/zvis_6_ui/src/source-560x420.png\" alt=\"UIu8bbeu8ba1u89c4u8303\" rel=\"nofollow\" height=\"210\" width=\"280\"> </a>","footer":"","header":"","indexplus":{},"index":{},"orderplus":[],"order":{},"loopplus":[],"loop":"<div class=\"pos\"><a href=\"{url}\" class=\"cover\" target=\"_blank\"> <img style=\"display: inline;\" src=\"{pic}\" class=\"imgloadinglater\" alt=\"{title}\" rel=\"nofollow\" height=\"{picheight}\" width=\"{picwidth}\"> </a> <i class=\"icon-hexagon-tag h-novice-tag\"><span class=\"txt\">{forumname}</span></i>
      <div class=\"info\">
        <h1><a href=\"{url}\" target=\"_blank\">{title}</a></h1>
        <p class=\"txt\">{summary}</p>
      </div>
      <div class=\"author cl\"> <a href=\"home.php?mod=space&uid={authorid}\" class=\"avatar z\" target=\"_blank\"><img style=\"display: inline;\" src=\"{avatar}\" class=\"imgloadinglater\" alt=\"{author}\" rel=\"nofollow\" height=\"50\" width=\"50\"></a>
        <div class=\"z\" style=\"width: 190px;\">
          <h5 class=\"name\"><a href=\"home.php?mod=space&uid={authorid}\" target=\"_blank\">{author} <i class=\"cert mar2 icon-certified2\" title=\"u8ba4u8bc1u8bbeu8ba1u5e08\"></i> </a></h5>
          <div class=\"msg cl\"> <span><i class=\"icon-eye\"></i><em>{views}</em></span> <span><i class=\"icon-comment\"></i><em>{replies}</em></span> <span><i class=\"icon-leaf\"></i><em>{heats}</em></span> </div>
        </div>
      </div>
    </div>"},"hash":"205916f1"}`, Picwidth: 280, Picheight: 210, Target: "blank", Dateformat: "Y-m-d", Script: "thread", Param: `{"tids":"","uids":"","keyword":"","tagkeyword":"","typeids":"","recommend":"0","special":["0"],"viewmod":"0","rewardstatus":"0","picrequired":"1","orderby":"dateline","postdateline":"0","lastpost":"0","highlight":"0","titlelength":"55","summarylength":"80","startrow":"3","items":"1"}`, Shownum: 1, Cachetime: 3600, Cachetimerange: "", Dateline: 1564370398}
		data[31] = &db.Common_block{Bid: 32, Blockclass: "member_member", Name: "推荐作者", Title: ``, Classname: "", Summary: ``, Uid: 1, Username: "admin", Blockstyle: `{"name":"","blockclass":"member_member","makethumb":0,"getpic":0,"getsummary":0,"settarget":0,"moreu
rl":0,"fields":["url","avatar_middle","title","bio"],"template":{"raw":"<h1 class=\"h-tit ptv h-member-btn pos\">
  <a class=\"on\" href=\"javascript:;\" title=\"u63a8u8350u8bbeu8ba1u5e08\">u63a8u8350u8bbeu8ba1u5e08</a> <a href=\"#\">u66f4u591au8ba4u8bc1u8bbeu8ba1u5e08</a></h1>
  <div class=\"h-member-box\">
    <ul style=\"display: block;\" class=\"h-member cl\">
     [loop]
      <li class=\"cl\"> <a href=\"{url}\" class=\"avatar-sm\" title=\"\" target=\"_blank\"> <img rel=\"nofollow\" src=\"{avatar_middle}\" alt=\"{title}\"> </a>
        <div class=\"cont\" style=\"box-shadow: none;\">
          <h5 class=\"user\"><a href=\"{url}\" target=\"_blank\">{title}</a></h5>
          <p class=\"text\">{bio}</p>
        </div>
      </li>
     [/loop]
    </ul>
  </div>
  <div class=\"line\"></div>","footer":"","header":"","indexplus":{},"index":{},"orderplus":[],"order":{},"loopplus":[],"loop":"<li class=\"cl\"> <a href=\"{url}\" class=\"avatar-sm\" title=\"\" target=\"_blank\"> <img rel=\"nofollow\" src=\"{avatar_middle}\" alt=\"{title}\"> </a>
        <div class=\"cont\" style=\"box-shadow: none;\">
          <h5 class=\"user\"><a href=\"{url}\" target=\"_blank\">{title}</a></h5>
          <p class=\"text\">{bio}</p>
        </div>
      </li>"},"hash":"40d78938"}`, Target: "blank", Dateformat: "Y-m-d", Script: "member", Param: `{"uids":"","special":"","gender":"","xbirthprovince":"","xresideprovince":"","avatarstatus":"0","orderby":"credits","extcredit":"1","lastpost":"","startrow":"0","items":"8"}`, Shownum: 8, Cachetime: 3600, Cachetimerange: "", Dateline: 1564372473}
		data[32] = &db.Common_block{Bid: 33, Blockclass: "html_html", Name: "合作伙伴", Title: ``, Classname: "", Summary: `<h1 class="h-tit2">合作伙伴</h1>
  <div class="h-partners cl">
    <ul class="logo cl">
      <li><a href="#" target="_blank" title="小米"><img style="display: inline;" src="template/zvis_6_ui/src/img/1447656039_430.png" class="imgloadinglater" alt="小米" rel="nofollow"></a></li>
      <li><a href="#/" target="_blank" title="Vchello"><img style="display: inline;" src="template/zvis_6_ui/src/img/1447654816_196.png" class="imgloadinglater" alt="Vchello" rel="nofollow"></a></li>
      <li><a href="#" target="_blank" title="广告门"><img style="display: inline;" src="template/zvis_6_ui/src/img/1476325986_293.png" class="imgloadinglater" alt="广告门" rel="nofollow"></a></li>
      <li><a href="#" target="_blank" title="腾讯CDC"><img style="display: inline;" src="template/zvis_6_ui/src/img/1477367713_977.png" class="imgloadinglater" alt="腾讯CDC" rel="nofollow"></a></li>
      <li><a href="#" target="_blank" title="百度mux"><img style="display: inline;" src="template/zvis_6_ui/src/img/1462355924_645.png" class="imgloadinglater" alt="百度mux" rel="nofollow"></a></li>
      <li><a href="#" target="_blank" title="七牛云存储"><img style="display: inline;" src="template/zvis_6_ui/src/img/1478232729_344.png" class="imgloadinglater" alt="七牛云存储" rel="nofollow"></a></li>
      <li><a href="#" target="_blank" title="UCloud"><img style="display: inline;" src="template/zvis_6_ui/src/img/1470974880_860.png" class="imgloadinglater" alt="UCloud" rel="nofollow"></a></li>
    </ul>
    <ul class="text cl">
      <li><a href="#" target="_blank" title="H5案例分享">H5案例分享</a></li>
      <li><a href="#" target="_blank" title="商标注册">商标注册</a></li>
      <li><a href="#" target="_blank" title="MAKA">微场景制作</a></li>
      <li><a href="#" target="_blank" title="iH5">iH5</a></li>
      <li><a href="#" target="_blank" title="创客贴在线设计">创客贴在线设计</a></li>
      <li><a href="#" target="_blank" title="Fotor设计">Fotor设计</a></li>
      <li><a href="#" target="_blank" title="微投网">微投网</a></li>
      <li><a href="#" target="_blank" title="OpenCom">OpenCom</a></li>
      <li><a href="#" target="_blank" title="踏得网">踏得网</a></li>
      <li><a href="#" target="_blank" title="11space">11space</a></li>
      <li><a href="#" target="_blank" title="千广网">千广网</a></li>
      <li><a href="#" target="_blank" title="素材库">素材库</a></li>
      <li><a href="#" target="_blank" title="视觉同盟">视觉同盟</a></li>
      <li><a href="#" target="_blank" title="Bugtags">Bugtags</a></li>
      <li><a href="#" target="_blank" title="屏面">屏面</a></li>
      <li><a href="#" target="_blank" title="摄图网">摄图网</a></li>
      <li><a href="#" target="_blank" title="优设">优设</a></li>
      <li><a href="#" target="_blank" title="跟对人">跟对人</a></li>
      <li><a href="#" target="_blank" title="H5页面制作">H5页面制作</a></li>
      <li><a href="#" target="_blank" title="猎豹移动">猎豹移动</a></li>
    </ul>
  </div>`, Uid: 1, Username: "admin", Blockstyle: `{}`, Target: "blank", Dateformat: "Y-m-d", Script: "blank", Param: `{"content":"  <h1 class=\\"h-tit2\\">u5408u4f5cu4f19u4f34</h1>
  <div class=\\"h-partners cl\\">
    <ul class=\\"logo cl\\">
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"u5c0fu7c73\\"><img style=\\"display: inline;\\" src=\\"template/zvis_6_ui/src/img/1447656039_430.png\\" class=\\"imgloadinglater\\" alt=\\"u5c0fu7c73\\" rel=\\"nofollow\\"></a></li>
      <li><a href=\\"#/\\" target=\\"_blank\\" title=\\"Vchello\\"><img style=\\"display: inline;\\" src=\\"template/zvis_6_ui/src/img/1447654816_196.png\\" class=\\"imgloadinglater\\" alt=\\"Vchello\\" rel=\\"nofollow\\"></a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"u5e7fu544au95e8\\"><img style=\\"display: inline;\\" src=\\"template/zvis_6_ui/src/img/1476325986_293.png\\" class=\\"imgloadinglater\\" alt=\\"u5e7fu544au95e8\\" rel=\\"nofollow\\"></a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"u817eu8bafCDC\\"><img style=\\"display: inline;\\" src=\\"template/zvis_6_ui/src/img/1477367713_977.png\\" class=\\"imgloadinglater\\" alt=\\"u817eu8bafCDC\\" rel=\\"nofollow\\"></a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"u767eu5ea6mux\\"><img style=\\"display: inline;\\" src=\\"template/zvis_6_ui/src/img/1462355924_645.png\\" class=\\"imgloadinglater\\" alt=\\"u767eu5ea6mux\\" rel=\\"nofollow\\"></a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"u4e03u725bu4e91u5b58u50a8\\"><img style=\\"display: inline;\\" src=\\"template/zvis_6_ui/src/img/1478232729_344.png\\" class=\\"imgloadinglater\\" alt=\\"u4e03u725bu4e91u5b58u50a8\\" rel=\\"nofollow\\"></a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"UCloud\\"><img style=\\"display: inline;\\" src=\\"template/zvis_6_ui/src/img/1470974880_860.png\\" class=\\"imgloadinglater\\" alt=\\"UCloud\\" rel=\\"nofollow\\"></a></li>
    </ul>
    <ul class=\\"text cl\\">
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"H5u6848u4f8bu5206u4eab\\">H5u6848u4f8bu5206u4eab</a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"u5546u6807u6ce8u518c\\">u5546u6807u6ce8u518c</a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"MAKA\\">u5faeu573au666fu5236u4f5c</a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"iH5\\">iH5</a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"u521bu5ba2u8d34u5728u7ebfu8bbeu8ba1\\">u521bu5ba2u8d34u5728u7ebfu8bbeu8ba1</a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"Fotoru8bbeu8ba1\\">Fotoru8bbeu8ba1</a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"u5faeu6295u7f51\\">u5faeu6295u7f51</a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"OpenCom\\">OpenCom</a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"u8e0fu5f97u7f51\\">u8e0fu5f97u7f51</a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"11space\\">11space</a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"u5343u5e7fu7f51\\">u5343u5e7fu7f51</a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"u7d20u6750u5e93\\">u7d20u6750u5e93</a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"u89c6u89c9u540cu76df\\">u89c6u89c9u540cu76df</a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"Bugtags\\">Bugtags</a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"u5c4fu9762\\">u5c4fu9762</a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"u6444u56feu7f51\\">u6444u56feu7f51</a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"u4f18u8bbe\\">u4f18u8bbe</a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"u8ddfu5bf9u4eba\\">u8ddfu5bf9u4eba</a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"H5u9875u9762u5236u4f5c\\">H5u9875u9762u5236u4f5c</a></li>
      <li><a href=\\"#\\" target=\\"_blank\\" title=\\"u730eu8c79u79fbu52a8\\">u730eu8c79u79fbu52a8</a></li>
    </ul>
  </div>","items":"10"}`, Shownum: 10, Cachetime: 3600, Cachetimerange: "", Dateline: 1564372696}
		data[33] = &db.Common_block{Bid: 34, Blockclass: "forum_thread", Name: "门户首页幻灯", Title: ``, Classname: "", Summary: ``, Uid: 1, Username: "admin", Blockstyle: `{"name":"","blockclass":"forum_thread","makethumb":1,"getpic":1,"getsummary":0,"settarget":0,"mor
eurl":0,"fields":["url","title","pic"],"template":{"raw":"<div id=\"slider\" class=\"nivoSlider\">
   [loop]
  <a href=\"{url}\" class=\"adv_img nivo-imageLink\" target=\"_blank\" title=\"{title}\"><img style=\"width: 1180px; visibility: hidden;\" src=\"{pic}\" alt=\"{title}\" width=\"{picwidth}\" height=\"{picheight}\" /></a>
   [/loop]
</div>","footer":"","header":"","indexplus":{},"index":{},"orderplus":[],"order":{},"loopplus":[],"loop":"<a href=\"{url}\" class=\"adv_img nivo-imageLink\" target=\"_blank\" title=\"{title}\"><img style=\"width: 1180px; visibility: hidden;\" src=\"{pic}\" alt=\"{title}\" width=\"{picwidth}\" height=\"{picheight}\" /></a>"},"hash":"eb094a06"}`, Picwidth: 1180, Picheight: 350, Target: "blank", Dateformat: "Y-m-d", Script: "thread", Param: `{"tids":"","uids":"","keyword":"","tagkeyword":"","typeids":"","recommend":"0","special":["0"],"viewmod":"0","rewardstatus":"0","picrequired":"1","orderby":"lastpost","postdateline":"0","lastpost":"0","highlight":"0","titlelength":"40","summarylength":"80","startrow":"0","items":"7"}`, Shownum: 7, Cachetime: 3600, Cachetimerange: "", Dateline: 1564483376}
		data[34] = &db.Common_block{Bid: 35, Blockclass: "forum_thread", Name: "群组焦点", Title: ``, Classname: "", Summary: ``, Uid: 1, Username: "admin", Blockstyle: `{"name":"","blockclass":"forum_thread","makethumb":1,"getpic":1,"getsummary":0,"settarget":0,"moreurl
":0,"fields":["url","pic","title"],"template":{"raw":"<div class=\"portal_index_side2\">
  <div class=\"portal_index_side_window2\">
    <ul style=\"left: 0px;\" index=\"0\" n=\"0\" id=\"slideContainer\">
     [loop]
      <li> <a href=\"{url}\" target=\"blank\"> <img src=\"{pic}\" width=\"{picwidth}\" height=\"{picheight}\" alt=\"{title}\">
        <div class=\"si_0\">
          <div class=\"si_1\">{title}</div>
        </div>
        </a>
      </li>
     [/loop]
    </ul>
  </div>
  <div class=\"portal_index_side_list2\">
   <a class=\"active\" href=\"javascript:void(0);\"></a>
   <a class=\"\" href=\"javascript:void(0);\"></a>
  </div>
</div>
<script type=\"text/javascript\">
jQuery(function(){
jQuery('.portal_index_side2').ready(function(e) {
jQuery('.portal_index_side2').each(function(){
var jQuery_root = jQuery(this);
var jQuerywindow_b = jQuery_root.find('.portal_index_side_window2');
var jQueryitems = jQuery_root.find('.portal_index_side_list2 a');
var jQuerywindow_ul = jQuerywindow_b.find('#slideContainer');
var count = jQueryitems.length;
var item_size = jQuery_root.outerWidth(true);
var dur_ms = 1000;
var autoplay_interval = 8000;
var cur_idx = 0;
var fix_idx = function(_idx){
if( _idx < 0 ) return (count - 1);
if( _idx >= count ) return 0;
return _idx;
}
var goto = function(_idx){
var s;
if(_idx =='+' || _idx =='-'){
s = _idx;
_idx = parseInt(jQuery('#slideContainer').attr('index'));
if(!_idx || _idx == null || _idx == 0) _idx = 0;
}

if(s =='+'){
idx = _idx +1;
if(_idx > count -2) idx = 0;

}else if(s =='-'){
idx = _idx -1;
if(_idx <=0) idx = count -1;
}else{
idx = fix_idx( _idx );
}
jQuerywindow_ul.attr('n',idx);

jQueryitems.eq(idx).addClass('active').siblings().removeClass('active');
if( cur_idx != idx ){
var offset_x = - idx * item_size;
jQuerywindow_ul.attr('index',idx);
jQuerywindow_ul.stop().animate({'left':offset_x},dur_ms);
cur_idx = idx;
}
}
jQueryitems.each(function(index, element){
var jQuerycur_a = jQuery(this);
jQuerycur_a.data('index',index);
jQuerycur_a.click(function(){
var index = jQuery(this).data('index');
goto(index);
return false;
});
});

var autoplay_flag = true;

window.setInterval(function(){
if(autoplay_flag){
goto( cur_idx + 1 );
}
},autoplay_interval);

jQuery_root.hover(function(){
autoplay_flag = false;
},function(){
autoplay_flag = true;
});

goto(0);
});
});
})
</script>","footer":"","header":"","indexplus":{},"index":{},"orderplus":[],"order":{},"loopplus":[],"loop":"<li> <a href=\"{url}\" target=\"blank\"> <img src=\"{pic}\" width=\"{picwidth}\" height=\"{picheight}\" alt=\"{title}\">
        <div class=\"si_0\">
          <div class=\"si_1\">{title}</div>
        </div>
        </a>
      </li>"},"hash":"ffd44a57"}`, Picwidth: 400, Picheight: 260, Target: "blank", Dateformat: "Y-m-d", Script: "thread", Param: `{"tids":"","uids":"","keyword":"","tagkeyword":"","typeids":"","recommend":"0","special":["0"],"viewmod":"0","rewardstatus":"0","picrequired":"1","orderby":"dateline","postdateline":"0","lastpost":"0","highlight":"0","titlelength":"40","summarylength":"80","startrow":"0","items":"2"}`, Shownum: 2, Cachetime: 3600, Cachetimerange: "", Dateline: 1564457150}
		data[35] = &db.Common_block{Bid: 36, Blockclass: "group_group", Name: "推荐群组", Title: ``, Classname: "", Summary: ``, Uid: 1, Username: "admin", Blockstyle: `{"name":"","blockclass":"group_group","makethumb":0,"getpic":0,"getsummary":1,"settarget":1,"moreurl":
0,"fields":["url","icon","title","summary"],"template":{"raw":"<div class=\"re_group cl\">
<ul>
[loop]
<li>
<div class=\"pic\"><a href=\"{url}\"{target}><img src=\"{icon}\" width=\"48\" height=\"48\" /></a></div>
<h3><a href=\"{url}\" title=\"{title}\"{target}>{title}</a></h3>
<p>{summary}</p>
</li>
[/loop]
</ul>
</div>","footer":"","header":"","indexplus":{},"index":{},"orderplus":[],"order":{},"loopplus":[],"loop":"<li>
<div class=\"pic\"><a href=\"{url}\"{target}><img src=\"{icon}\" width=\"48\" height=\"48\" /></a></div>
<h3><a href=\"{url}\" title=\"{title}\"{target}>{title}</a></h3>
<p>{summary}</p>
</li>"},"hash":"6a53f263"}`, Target: "blank", Dateformat: "Y-m-d", Script: "group", Param: `{"fids":"","titlelength":"40","summarylength":"80","orderby":"displayorder","items":"5"}`, Shownum: 5, Cachetime: 3600, Cachetimerange: "", Dateline: 1564457149}
		data[36] = &db.Common_block{Bid: 37, Blockclass: "forum_thread", Name: "群组热帖", Title: ``, Classname: "", Summary: ``, Uid: 1, Username: "admin", Blockstyle: `{"name":"","blockclass":"forum_thread","makethumb":0,"getpic":0,"getsummary":0,"settarget":0,"moreurl
":0,"fields":["url","title"],"template":{"raw":"<div class=\"ma_portal_y ma_rt_box ma_radius ma_shadow\">
  <h3 class=\"ma_portal_y_t ma_rt_t\"><img src=\"template/zvis_6_ui/src/rt_ico.png\">u7fa4u7ec4u70edu95e8</h3>
  <ul class=\"ma_rt_c cl\">
   [loop]
    <li><a href=\"{url}\" target=\"_blank\" title=\"{title}\">{title}</a></li>
   [/loop]
  </ul>
</div>","footer":"","header":"","indexplus":{},"index":{},"orderplus":[],"order":{},"loopplus":[],"loop":"<li><a href=\"{url}\" target=\"_blank\" title=\"{title}\">{title}</a></li>"},"hash":"33e21fd6"}`, Target: "blank", Dateformat: "Y-m-d", Script: "thread", Param: `{"tids":"","uids":"","keyword":"","tagkeyword":"","typeids":"","recommend":"0","viewmod":"0","rewardstatus":"0","picrequired":"0","orderby":"lastpost","postdateline":"0","lastpost":"0","highlight":"0","titlelength":"60","summarylength":"80","startrow":"0","items":"6"}`, Shownum: 6, Cachetime: 3600, Cachetimerange: "", Dateline: 1564457145}
		model.Table("Common_block").InsertAll(data)
		model.Exec(`replace into Common_block_style (styleid,blockclass,name,template,hash,getpic,getsummary,makethumb,settarget,fields,moreurl) VALUES ('1','html_html','[内置]空模板','{"raw":"","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":[]}','ee3e718a','0','0','0','0','a:0:{}','0'),('2','forum_forum','[内置]版块名称列表','{"raw":"<div class=\\"module cl xl xl1\\">\r\n<ul>\r\n[loop]\r\n<li><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>"}','c6c48ef5','0','0','0','1','a:2:{i:0\;s:3:"url"\;i:1\;s:5:"title"\;}','0'),('3','forum_forum','[内置]版块名称＋总帖数','{"raw":"<div class=\\"module cl xl xl1\\">\r\n<ul>\r\n[loop]\r\n<li><em>{posts}<\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li><em>{posts}<\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>"}','91c25611','0','0','0','1','a:3:{i:0\;s:5:"posts"\;i:1\;s:3:"url"\;i:2\;s:5:"title"\;}','0'),('4','forum_forum','[内置]版块名称+总帖数（有序）','{"raw":"<div class=\\"module cl xl xl1\\">\r\n<ol>\r\n[loop]\r\n<li><em>{posts}<\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>\r\n[\/loop]\r\n<\/ol>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li><em>{posts}<\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>"}','951323a8','0','0','0','1','a:3:{i:0\;s:5:"posts"\;i:1\;s:3:"url"\;i:2\;s:5:"title"\;}','0'),('5','forum_forum','[内置]版块名称+今日发贴数','{"raw":"<div class=\\"module cl xl xl1\\">\r\n<ul>\r\n[loop]\r\n<li><em>{todayposts}<\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li><em>{todayposts}<\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>"}','e08c8a30','0','0','0','1','a:3:{i:0\;s:10:"todayposts"\;i:1\;s:3:"url"\;i:2\;s:5:"title"\;}','0'),('6','forum_forum','[内置]版块名称+今日发贴数（有序）','{"raw":"<div class=\\"module cl xl xl1\\">\r\n<ol>\r\n[loop]\r\n<li><em>{todayposts}<\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>\r\n[\/loop]\r\n<\/ol>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li><em>{todayposts}<\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>"}','12516b2d','0','0','0','1','a:3:{i:0\;s:10:"todayposts"\;i:1\;s:3:"url"\;i:2\;s:5:"title"\;}','0'),('7','forum_forum','[内置]版块名称（两列）','{"raw":"<div class=\\"module cl xl xl2\\">\r\n<ul>\r\n[loop]\r\n<li><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>"}','0e51a193','0','0','0','1','a:2:{i:0\;s:3:"url"\;i:1\;s:5:"title"\;}','0'),('8','forum_forum','[内置]版块名称＋介绍','{"raw":"<div class=\\"module cl xld\\">\r\n[loop]\r\n<dl class=\\"cl\\">\r\n\t<dt><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t<dd>{summary}<\/dd>\r\n<\/dl>\r\n[\/loop]\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<dl class=\\"cl\\">\r\n\t<dt><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t<dd>{summary}<\/dd>\r\n<\/dl>"}','2bf344ae','0','1','0','1','a:3:{i:0\;s:3:"url"\;i:1\;s:5:"title"\;i:2\;s:7:"summary"\;}','0'),('9','forum_thread','[内置]帖子标题','{"raw":"<div class=\\"module cl xl xl1\\">\r\n<ul>\r\n[loop]\r\n<li><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>"}','079cd140','0','0','0','1','a:2:{i:0\;s:3:"url"\;i:1\;s:5:"title"\;}','0'),('10','forum_thread','[内置]帖子标题+回复数','{"raw":"<div class=\\"module cl xl xl1\\">\r\n<ul>\r\n[loop]\r\n<li><em>{replies}<\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li><em>{replies}<\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>"}','0cc45858','0','0','0','1','a:3:{i:0\;s:7:"replies"\;i:1\;s:3:"url"\;i:2\;s:5:"title"\;}','0'),('11','forum_thread','[内置]帖子标题+查看数','{"raw":"<div class=\\"module cl xl xl1\\">\r\n<ul>\r\n[loop]\r\n<li><em>{views}<\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li><em>{views}<\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>"}','c5361e32','0','0','0','1','a:3:{i:0\;s:5:"views"\;i:1\;s:3:"url"\;i:2\;s:5:"title"\;}','0'),('12','forum_thread','[内置]帖子标题+热度','{"raw":"<div class=\\"module cl xl xl1\\">\r\n<ul>\r\n[loop]\r\n<li><em>{heats}<\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li><em>{heats}<\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>"}','dfac2b4f','0','0','0','1','a:3:{i:0\;s:5:"heats"\;i:1\;s:3:"url"\;i:2\;s:5:"title"\;}','0'),('13','forum_thread','[内置]帖子标题+发帖时间','{"raw":"<div class=\\"module cl xl xl1\\">\r\n<ul>\r\n[loop]\r\n<li><em>{dateline}<\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li><em>{dateline}<\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>"}','37a3603a','0','0','0','1','a:3:{i:0\;s:8:"dateline"\;i:1\;s:3:"url"\;i:2\;s:5:"title"\;}','0'),('14','forum_thread','[内置]帖子标题+最后回复时间','{"raw":"<div class=\\"module cl xl xl1\\">\r\n<ul>\r\n[loop]\r\n<li><em>{lastpost}<\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li><em>{lastpost}<\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>"}','1ae9c85b','0','0','0','1','a:3:{i:0\;s:8:"lastpost"\;i:1\;s:3:"url"\;i:2\;s:5:"title"\;}','0'),('15','forum_thread','[内置]帖子标题+作者','{"raw":"<div class=\\"module cl xl xl1\\">\r\n<ul>\r\n[loop]\r\n<li><em><a href=\\"home.php?mod=space&uid={authorid}\\"{target}>{author}<\/a><\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li><em><a href=\\"home.php?mod=space&uid={authorid}\\"{target}>{author}<\/a><\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>"}','30def87f','0','0','0','1','a:4:{i:0\;s:8:"authorid"\;i:1\;s:6:"author"\;i:2\;s:3:"url"\;i:3\;s:5:"title"\;}','0'),('16','forum_thread','[内置]帖子标题+作者+摘要','{"raw":"<div class=\\"module cl xld\\">\r\n[loop]\r\n<dl class=\\"cl\\">\r\n\t<dt><em class=\\"y xg1 xw0\\"><a href=\\"home.php?mod=space&uid={authorid}\\"{target}>{author}<\/a><\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t<dd>{summary}<\/dd>\r\n<\/dl>\r\n[\/loop]\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<dl class=\\"cl\\">\r\n\t<dt><em class=\\"y xg1 xw0\\"><a href=\\"home.php?mod=space&uid={authorid}\\"{target}>{author}<\/a><\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t<dd>{summary}<\/dd>\r\n<\/dl>"}','8ebc8d5f','0','1','0','1','a:5:{i:0\;s:8:"authorid"\;i:1\;s:6:"author"\;i:2\;s:3:"url"\;i:3\;s:5:"title"\;i:4\;s:7:"summary"\;}','0'),('17','forum_thread','[内置]帖子标题+摘要','{"raw":"<div class=\\"module cl xld\\">\r\n[loop]\r\n<dl class=\\"cl\\">\r\n\t<dt><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t<dd>{summary}<\/dd>\r\n<\/dl>\r\n[\/loop]\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<dl class=\\"cl\\">\r\n\t<dt><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t<dd>{summary}<\/dd>\r\n<\/dl>"}','1107d2bd','0','1','0','1','a:3:{i:0\;s:3:"url"\;i:1\;s:5:"title"\;i:2\;s:7:"summary"\;}','0'),('18','forum_thread','[内置]焦点模式','{"raw":"<div class=\\"module cl xld fcs\\">\r\n[loop]\r\n<dl class=\\"cl\\">\r\n\t<dt><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t<dd>{summary}<\/dd>\r\n<\/dl>\r\n[\/loop]\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<dl class=\\"cl\\">\r\n\t<dt><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t<dd>{summary}<\/dd>\r\n<\/dl>"}','b6337920','0','1','0','1','a:3:{i:0\;s:3:"url"\;i:1\;s:5:"title"\;i:2\;s:7:"summary"\;}','0'),('19','forum_thread','[内置]帖子标题（第一条带摘要）','{"raw":"<div class=\\"module cl xl\\">\r\n<ul>\r\n[loop]\r\n<li><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>\r\n[\/loop]\r\n[order=1]\r\n<li>\r\n\t<dl class=\\"cl xld\\">\r\n\t\t<dt><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t\t<dd>{summary}<\/dd>\r\n\t<\/dl> \r\n\t<hr class=\\"da\\" \/>\r\n<\/li>\r\n[\/order]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":{"1":"<li>\r\n\t<dl class=\\"cl xld\\">\r\n\t\t<dt><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t\t<dd>{summary}<\/dd>\r\n\t<\/dl> \r\n\t<hr class=\\"da\\" \/>\r\n<\/li>"},"loopplus":[],"loop":"<li><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>"}','2e06f8b5','0','1','0','1','a:3:{i:0\;s:3:"url"\;i:1\;s:5:"title"\;i:2\;s:7:"summary"\;}','0'),('24','group_thread','[内置]帖子标题','{"raw":"<div class=\\"module cl xl xl1\\">\r\n<ul>\r\n[loop]\r\n<li><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>"}','176fcc68','0','0','0','1','a:2:{i:0\;s:3:"url"\;i:1\;s:5:"title"\;}','0'),('25','group_thread','[内置]帖子标题+回复数','{"raw":"<div class=\\"module cl xl xl1\\">\r\n<ul>\r\n[loop]\r\n<li><em>{replies}<\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li><em>{replies}<\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>"}','8baa57ad','0','0','0','1','a:3:{i:0\;s:7:"replies"\;i:1\;s:3:"url"\;i:2\;s:5:"title"\;}','0'),('26','group_thread','[内置]帖子标题+查看数','{"raw":"<div class=\\"module cl xl xl1\\">\r\n<ul>\r\n[loop]\r\n<li><em>{views}<\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li><em>{views}<\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>"}','8f012db4','0','0','0','1','a:3:{i:0\;s:5:"views"\;i:1\;s:3:"url"\;i:2\;s:5:"title"\;}','0'),('27','group_thread','[内置]帖子标题+热度','{"raw":"<div class=\\"module cl xl xl1\\">\r\n<ul>\r\n[loop]\r\n<li><em>{heats}<\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li><em>{heats}<\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>"}','7f002523','0','0','0','1','a:3:{i:0\;s:5:"heats"\;i:1\;s:3:"url"\;i:2\;s:5:"title"\;}','0'),('28','group_thread','[内置]帖子标题+发帖时间','{"raw":"<div class=\\"module cl xl xl1\\">\r\n<ul>\r\n[loop]\r\n<li><em>{dateline}<\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li><em>{dateline}<\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>"}','23ba8554','0','0','0','1','a:3:{i:0\;s:8:"dateline"\;i:1\;s:3:"url"\;i:2\;s:5:"title"\;}','0'),('29','group_thread','[内置]帖子标题+最后回复时间','{"raw":"<div class=\\"module cl xl xl1\\">\r\n<ul>\r\n[loop]\r\n<li><em>{lastpost}<\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li><em>{lastpost}<\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>"}','a6fbd13d','0','0','0','1','a:3:{i:0\;s:8:"lastpost"\;i:1\;s:3:"url"\;i:2\;s:5:"title"\;}','0'),('30','group_thread','[内置]帖子标题+作者','{"raw":"<div class=\\"module cl xl xl1\\">\r\n<ul>\r\n[loop]\r\n<li><em><a href=\\"home.php?mod=space&uid={authorid}\\"{target}>{author}<\/a><\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li><em><a href=\\"home.php?mod=space&uid={authorid}\\"{target}>{author}<\/a><\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>"}','9223372036854775807','0','0','0','1','a:4:{i:0\;s:8:"authorid"\;i:1\;s:6:"author"\;i:2\;s:3:"url"\;i:3\;s:5:"title"\;}','0'),('31','group_thread','[内置]帖子标题+作者+摘要','{"raw":"<div class=\\"module cl xld\\">\r\n[loop]\r\n<dl class=\\"cl\\">\r\n\t<dt><em class=\\"y\\"><a href=\\"home.php?mod=space&uid={authorid}\\"{target}>{author}<\/a><\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t<dd>{summary}<\/dd>\r\n<\/dl>\r\n[\/loop]\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<dl class=\\"cl\\">\r\n\t<dt><em class=\\"y\\"><a href=\\"home.php?mod=space&uid={authorid}\\"{target}>{author}<\/a><\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t<dd>{summary}<\/dd>\r\n<\/dl>"}','d9c23f31','0','1','0','1','a:5:{i:0\;s:8:"authorid"\;i:1\;s:6:"author"\;i:2\;s:3:"url"\;i:3\;s:5:"title"\;i:4\;s:7:"summary"\;}','0'),('32','group_thread','[内置]帖子标题+摘要','{"raw":"<div class=\\"module cl xld\\">\r\n[loop]\r\n<dl class=\\"cl\\">\r\n\t<dt><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t<dd>{summary}<\/dd>\r\n<\/dl>\r\n[\/loop]\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<dl class=\\"cl\\">\r\n\t<dt><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t<dd>{summary}<\/dd>\r\n<\/dl>"}','9e90211d','0','1','0','1','a:3:{i:0\;s:3:"url"\;i:1\;s:5:"title"\;i:2\;s:7:"summary"\;}','0'),('33','group_thread','[内置]焦点模式','{"raw":"<div class=\\"module cl xld fcs\\">\r\n[loop]\r\n<dl class=\\"cl\\">\r\n\t<dt><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t<dd>{summary}<\/dd>\r\n<\/dl>\r\n[\/loop]\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<dl class=\\"cl\\">\r\n\t<dt><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t<dd>{summary}<\/dd>\r\n<\/dl>"}','9670c626','0','1','0','1','a:3:{i:0\;s:3:"url"\;i:1\;s:5:"title"\;i:2\;s:7:"summary"\;}','0'),('34','group_thread','[内置]帖子标题（第一条带摘要）','{"raw":"<div class=\\"module cl xl\\">\r\n<ul>\r\n[loop]\r\n<li><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>\r\n[\/loop]\r\n[order=1]\r\n<li>\r\n\t<dl class=\\"cl xld\\">\r\n\t\t<dt><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t\t<dd>{summary}<\/dd>\r\n\t<\/dl> \r\n\t<hr class=\\"da\\" \/>\r\n<\/li>\r\n[\/order]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":{"1":"<li>\r\n\t<dl class=\\"cl xld\\">\r\n\t\t<dt><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t\t<dd>{summary}<\/dd>\r\n\t<\/dl> \r\n\t<hr class=\\"da\\" \/>\r\n<\/li>"},"loopplus":[],"loop":"<li><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>"}','9355f559','0','1','0','1','a:3:{i:0\;s:3:"url"\;i:1\;s:5:"title"\;i:2\;s:7:"summary"\;}','0'),('39','group_group','[内置]群组名称','{"raw":"<div class=\\"module cl xl xl1\\">\r\n<ul>\r\n[loop]\r\n<li><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>"}','9872d550','0','0','0','1','a:2:{i:0\;s:3:"url"\;i:1\;s:5:"title"\;}','0'),('40','group_group','[内置]群组名称+成员数','{"raw":"<div class=\\"module cl xl xl1\\">\r\n<ul>\r\n[loop]\r\n<li><em>{membernum}<\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li><em>{membernum}<\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>"}','20a09ec8','0','0','0','1','a:3:{i:0\;s:9:"membernum"\;i:1\;s:3:"url"\;i:2\;s:5:"title"\;}','0'),('41','group_group','[内置]群组名称+成员数（有序）','{"raw":"<div class=\\"module cl xl xl1\\">\r\n<ol>\r\n[loop]\r\n<li><em>{membernum}<\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>\r\n[\/loop]\r\n<\/ol>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li><em>{membernum}<\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>"}','af166b44','0','0','0','1','a:3:{i:0\;s:9:"membernum"\;i:1\;s:3:"url"\;i:2\;s:5:"title"\;}','0'),('42','group_group','[内置]群组名称+总帖数','{"raw":"<div class=\\"module cl xl xl1\\">\r\n<ul>\r\n[loop]\r\n<li><em>{posts}<\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li><em>{posts}<\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>"}','43ed1e7c','0','0','0','1','a:3:{i:0\;s:5:"posts"\;i:1\;s:3:"url"\;i:2\;s:5:"title"\;}','0'),('43','group_group','[内置]群组名称+今日发贴数','{"raw":"<div class=\\"module cl xl xl1\\">\r\n<ul>\r\n[loop]\r\n<li><em>{todayposts}<\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li><em>{todayposts}<\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>"}','3c59217b','0','0','0','1','a:3:{i:0\;s:10:"todayposts"\;i:1\;s:3:"url"\;i:2\;s:5:"title"\;}','0'),('44','group_group','[内置]群组图标+名称+介绍','{"raw":"<div class=\\"module cl xld\\">\r\n[loop]\r\n<dl class=\\"cl\\">\r\n\t<dd class=\\"m\\"><a href=\\"{url}\\"{target}><img src=\\"{icon}\\" width=\\"48\\" height=\\"48\\" \/><\/a><\/dd>\r\n\t<dt><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t<dd>{summary}<\/dd>\r\n<\/dl>\r\n[\/loop]\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<dl class=\\"cl\\">\r\n\t<dd class=\\"m\\"><a href=\\"{url}\\"{target}><img src=\\"{icon}\\" width=\\"48\\" height=\\"48\\" \/><\/a><\/dd>\r\n\t<dt><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t<dd>{summary}<\/dd>\r\n<\/dl>"}','6f470107','0','1','0','1','a:4:{i:0\;s:3:"url"\;i:1\;s:4:"icon"\;i:2\;s:5:"title"\;i:3\;s:7:"summary"\;}','0'),('45','group_group','[内置]群组图标列表','{"raw":"<div class=\\"module cl ml mls\\">\r\n<ul>\r\n[loop]\r\n<li><a href=\\"{url}\\"{target}><img src=\\"{icon}\\" width=\\"48\\" height=\\"48\\" \/><\/a><p><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/p><\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li><a href=\\"{url}\\"{target}><img src=\\"{icon}\\" width=\\"48\\" height=\\"48\\" \/><\/a><p><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/p><\/li>"}','f3646b2a','0','0','0','1','a:3:{i:0\;s:3:"url"\;i:1\;s:4:"icon"\;i:2\;s:5:"title"\;}','0'),('46','group_group','[内置]群组名称（两列）','{"raw":"<div class=\\"module cl xl xl2\\">\r\n<ul>\r\n[loop]\r\n<li><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>"}','5279d89d','0','0','0','1','a:2:{i:0\;s:3:"url"\;i:1\;s:5:"title"\;}','0'),('47','portal_article','[内置]文章标题','{"raw":"<div class=\\"module cl xl xl1\\">\r\n<ul>\r\n[loop]\r\n<li><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>"}','527a563d','0','0','0','1','a:2:{i:0\;s:3:"url"\;i:1\;s:5:"title"\;}','0'),('48','portal_article','[内置]文章标题+时间','{"raw":"<div class=\\"module cl xl xl1\\">\r\n<ul>\r\n[loop]\r\n<li><em>{dateline}<\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li><em>{dateline}<\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>"}','6e4be436','0','0','0','1','a:3:{i:0\;s:8:"dateline"\;i:1\;s:3:"url"\;i:2\;s:5:"title"\;}','0'),('49','portal_article','[内置]文章标题+时间（带栏目）','{"raw":"<div class=\\"module cl xl xl1\\">\r\n<ul>\r\n[loop]\r\n<li><em>{dateline}<\/em><label>[<a href=\\"{caturl}\\"{target}>{catname}<\/a>]<\/label><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li><em>{dateline}<\/em><label>[<a href=\\"{caturl}\\"{target}>{catname}<\/a>]<\/label><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>"}','c3b98a2f','0','0','0','1','a:5:{i:0\;s:8:"dateline"\;i:1\;s:6:"caturl"\;i:2\;s:7:"catname"\;i:3\;s:3:"url"\;i:4\;s:5:"title"\;}','0'),('50','portal_article','[内置]文章标题+摘要+缩略图','{"raw":"<div class=\\"module cl xld\\">\r\n[loop]\r\n<dl class=\\"cl\\">\r\n\t<dd class=\\"m\\"><a href=\\"{url}\\"{target}><img src=\\"{pic}\\" width=\\"{picwidth}\\" height=\\"{picheight}\\" alt=\\"{title}\\" \/><\/dd>\r\n\t<dt><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t<dd>{summary}<\/dd>\r\n<\/dl>\r\n[\/loop]\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<dl class=\\"cl\\">\r\n\t<dd class=\\"m\\"><a href=\\"{url}\\"{target}><img src=\\"{pic}\\" width=\\"{picwidth}\\" height=\\"{picheight}\\" alt=\\"{title}\\" \/><\/dd>\r\n\t<dt><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t<dd>{summary}<\/dd>\r\n<\/dl>"}','a5b550ee','1','1','1','1','a:4:{i:0\;s:3:"url"\;i:1\;s:3:"pic"\;i:2\;s:5:"title"\;i:3\;s:7:"summary"\;}','0'),('51','portal_article','[内置]文章标题+摘要','{"raw":"<div class=\\"module cl xld\\">\r\n[loop]\r\n<dl class=\\"cl\\">\r\n\t<dt><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t<dd>{summary}<\/dd>\r\n<\/dl>\r\n[\/loop]\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<dl class=\\"cl\\">\r\n\t<dt><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t<dd>{summary}<\/dd>\r\n<\/dl>"}','e57dbe5a','0','1','0','1','a:3:{i:0\;s:3:"url"\;i:1\;s:5:"title"\;i:2\;s:7:"summary"\;}','0'),('52','portal_article','[内置]焦点模式','{"raw":"<div class=\\"module cl xld fcs\\">\r\n[loop]\r\n<dl class=\\"cl\\">\r\n\t<dt><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t<dd>{summary}<\/dd>\r\n<\/dl>\r\n[\/loop]\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<dl class=\\"cl\\">\r\n\t<dt><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t<dd>{summary}<\/dd>\r\n<\/dl>"}','3b234c9c','0','1','0','1','a:3:{i:0\;s:3:"url"\;i:1\;s:5:"title"\;i:2\;s:7:"summary"\;}','0'),('53','portal_article','[内置]文章图片幻灯','{"raw":"<div class=\\"module cl slidebox\\">\r\n<ul class=\\"slideshow\\">\r\n[loop]\r\n<li style=\\"width: {picwidth}px\; height: {picheight}px\;\\"><a href=\\"{url}\\"{target}><img src=\\"{pic}\\" width=\\"{picwidth}\\" height=\\"{picheight}\\" \/><\/a><span class=\\"title\\">{title}<\/span><\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>\r\n<script type=\\"text\/javascript\\">\r\nrunslideshow()\;\r\n<\/script>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li style=\\"width: {picwidth}px\; height: {picheight}px\;\\"><a href=\\"{url}\\"{target}><img src=\\"{pic}\\" width=\\"{picwidth}\\" height=\\"{picheight}\\" \/><\/a><span class=\\"title\\">{title}<\/span><\/li>"}','8ff81e35','1','0','1','1','a:3:{i:0\;s:3:"url"\;i:1\;s:3:"pic"\;i:2\;s:5:"title"\;}','0'),('54','portal_article','[内置]文章图文幻灯','{"raw":"<div class=\\"module cl xld slideshow\\">\r\n[loop]\r\n<dl class=\\"cl\\">\r\n\t<dd class=\\"m\\"><a href=\\"{url}\\"{target}><img src=\\"{pic}\\" width=\\"{picwidth}\\" height=\\"{picheight}\\" \/><\/dd>\r\n\t<dt><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t<dd>{summary}<\/dd>\r\n<\/dl>\r\n[\/loop]\r\n<\/div>\r\n<script type=\\"text\/javascript\\">\r\nrunslideshow()\;\r\n<\/script>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<dl class=\\"cl\\">\r\n\t<dd class=\\"m\\"><a href=\\"{url}\\"{target}><img src=\\"{pic}\\" width=\\"{picwidth}\\" height=\\"{picheight}\\" \/><\/dd>\r\n\t<dt><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t<dd>{summary}<\/dd>\r\n<\/dl>"}','d88aded4','1','1','1','1','a:4:{i:0\;s:3:"url"\;i:1\;s:3:"pic"\;i:2\;s:5:"title"\;i:3\;s:7:"summary"\;}','0'),('55','portal_category','[内置]栏目名称','{"raw":"<div class=\\"module cl xl xl1\\">\r\n<ul>\r\n[loop]\r\n<li><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>"}','6846b818','0','0','0','1','a:2:{i:0\;s:3:"url"\;i:1\;s:5:"title"\;}','0'),('56','portal_category','[内置]栏目名称（两列）','{"raw":"<div class=\\"module cl xl xl2\\">\r\n<ul>\r\n[loop]\r\n<li><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>"}','fa5b40c1','0','0','0','1','a:2:{i:0\;s:3:"url"\;i:1\;s:5:"title"\;}','0'),('57','portal_topic','[内置]专题名称','{"raw":"<div class=\\"module cl xl xl1\\">\r\n<ul>\r\n[loop]\r\n<li><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>"}','268501b8','0','0','0','1','a:2:{i:0\;s:3:"url"\;i:1\;s:5:"title"\;}','0'),('58','portal_topic','[内置]专题名称（两列）','{"raw":"<div class=\\"module cl xl xl2\\">\r\n<ul>\r\n[loop]\r\n<li><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>"}','b21a9795','0','0','0','1','a:2:{i:0\;s:3:"url"\;i:1\;s:5:"title"\;}','0'),('59','portal_topic','[内置]专题名称+介绍+缩略图','{"raw":"<div class=\\"module cl xld\\">\r\n[loop]\r\n<dl class=\\"cl\\">\r\n\t<dd class=\\"m\\"><a href=\\"{url}\\"{target}><img src=\\"{pic}\\" width=\\"{picwidth}\\" height=\\"{picheight}\\" alt=\\"{title}\\" \/><\/dd>\r\n\t<dt><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t<dd>{summary}<\/dd>\r\n<\/dl>\r\n[\/loop]\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<dl class=\\"cl\\">\r\n\t<dd class=\\"m\\"><a href=\\"{url}\\"{target}><img src=\\"{pic}\\" width=\\"{picwidth}\\" height=\\"{picheight}\\" alt=\\"{title}\\" \/><\/dd>\r\n\t<dt><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t<dd>{summary}<\/dd>\r\n<\/dl>"}','e07e6128','1','1','1','1','a:4:{i:0\;s:3:"url"\;i:1\;s:3:"pic"\;i:2\;s:5:"title"\;i:3\;s:7:"summary"\;}','0'),('60','portal_topic','[内置]专题名称+介绍','{"raw":"<div class=\\"module cl xld\\">\r\n[loop]\r\n<dl class=\\"cl\\">\r\n\t<dt><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t<dd>{summary}<\/dd>\r\n<\/dl>\r\n[\/loop]\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<dl class=\\"cl\\">\r\n\t<dt><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t<dd>{summary}<\/dd>\r\n<\/dl>"}','573d0170','0','1','0','1','a:3:{i:0\;s:3:"url"\;i:1\;s:5:"title"\;i:2\;s:7:"summary"\;}','0'),('61','portal_topic','[内置]焦点模式','{"raw":"<div class=\\"module cl xld fcs\\">\r\n[loop]\r\n<dl class=\\"cl\\">\r\n\t<dt><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t<dd>{summary}<\/dd>\r\n<\/dl>\r\n[\/loop]\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<dl class=\\"cl\\">\r\n\t<dt><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t<dd>{summary}<\/dd>\r\n<\/dl>"}','7cc2ab53','0','1','0','1','a:3:{i:0\;s:3:"url"\;i:1\;s:5:"title"\;i:2\;s:7:"summary"\;}','0'),('62','space_doing','[内置]作者+内容','{"raw":"<div class=\\"module cl xl xl1\\">\r\n<ul>\r\n[loop]\r\n<li><a href=\\"home.php?mod=space&uid={uid}\\" title=\\"{username}\\" c=\\"1\\"{target}>{username}<\/a>: <a href=\\"{url}\\"{target}>{title}<\/a><\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li><a href=\\"home.php?mod=space&uid={uid}\\" title=\\"{username}\\" c=\\"1\\"{target}>{username}<\/a>: <a href=\\"{url}\\"{target}>{title}<\/a><\/li>"}','d0ca1426','0','0','0','1','a:4:{i:0\;s:3:"uid"\;i:1\;s:8:"username"\;i:2\;s:3:"url"\;i:3\;s:5:"title"\;}','0'),('63','space_doing','[内置]头像+作者+内容','{"raw":"<div class=\\"module cl xld\\">\r\n[loop]\r\n<dl class=\\"cl\\">\r\n\t<dd class=\\"m\\"><a href=\\"home.php?mod=space&uid={uid}\\" c=\\"1\\"{target}><img src=\\"{avatar}\\" width=\\"48\\" height=\\"48\\" alt=\\"{username}\\" \/><\/a><\/dd>\r\n\t<dt><a href=\\"home.php?mod=space&uid={uid}\\" title=\\"{username}\\"{target}>{username}<\/a> <em class=\\"xg1 xw0\\">{dateline}<\/em><\/dt>\r\n\t<dd><a href=\\"{url}\\"{target}>{title}<\/a><\/dd>\r\n<\/dl>\r\n[\/loop]\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<dl class=\\"cl\\">\r\n\t<dd class=\\"m\\"><a href=\\"home.php?mod=space&uid={uid}\\" c=\\"1\\"{target}><img src=\\"{avatar}\\" width=\\"48\\" height=\\"48\\" alt=\\"{username}\\" \/><\/a><\/dd>\r\n\t<dt><a href=\\"home.php?mod=space&uid={uid}\\" title=\\"{username}\\"{target}>{username}<\/a> <em class=\\"xg1 xw0\\">{dateline}<\/em><\/dt>\r\n\t<dd><a href=\\"{url}\\"{target}>{title}<\/a><\/dd>\r\n<\/dl>"}','13f43cab','0','0','0','1','a:6:{i:0\;s:3:"uid"\;i:1\;s:6:"avatar"\;i:2\;s:8:"username"\;i:3\;s:8:"dateline"\;i:4\;s:3:"url"\;i:5\;s:5:"title"\;}','0'),('64','space_doing','[内置]作者+内容（多行）+时间','{"raw":"<div class=\\"module cl xl\\">\r\n<ul>\r\n[loop]\r\n<li><a href=\\"home.php?mod=space&uid={uid}\\" title=\\"{username}\\" c=\\"1\\"{target}>{username}<\/a>: <a href=\\"{url}\\"{target}>{title}<\/a> <span class=\\"xg1\\">({dateline})<\/span><\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li><a href=\\"home.php?mod=space&uid={uid}\\" title=\\"{username}\\" c=\\"1\\"{target}>{username}<\/a>: <a href=\\"{url}\\"{target}>{title}<\/a> <span class=\\"xg1\\">({dateline})<\/span><\/li>"}','927ed021','0','0','0','1','a:5:{i:0\;s:3:"uid"\;i:1\;s:8:"username"\;i:2\;s:3:"url"\;i:3\;s:5:"title"\;i:4\;s:8:"dateline"\;}','0'),('65','space_blog','[内置]日志标题','{"raw":"<div class=\\"module cl xl xl1\\">\r\n<ul>\r\n[loop]\r\n<li><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>"}','9349072a','0','0','0','1','a:2:{i:0\;s:3:"url"\;i:1\;s:5:"title"\;}','0'),('66','space_blog','[内置]日志标题+作者','{"raw":"<div class=\\"module cl xl xl1\\">\r\n<ul>\r\n[loop]\r\n<li><em><a href=\\"home.php?mod=space&uid={uid}\\"{target}>{username}<\/a><\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li><em><a href=\\"home.php?mod=space&uid={uid}\\"{target}>{username}<\/a><\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>"}','d2a5c82a','0','0','0','1','a:4:{i:0\;s:3:"uid"\;i:1\;s:8:"username"\;i:2\;s:3:"url"\;i:3\;s:5:"title"\;}','0'),('67','space_blog','[内置]日志标题+发布时间','{"raw":"<div class=\\"module cl xl xl1\\">\r\n<ul>\r\n[loop]\r\n<li><em>{dateline}<\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li><em>{dateline}<\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>"}','c68ceade','0','0','0','1','a:3:{i:0\;s:8:"dateline"\;i:1\;s:3:"url"\;i:2\;s:5:"title"\;}','0'),('68','space_blog','[内置]日志标题+评论数','{"raw":"<div class=\\"module cl xl xl1\\">\r\n<ul>\r\n[loop]\r\n<li><em>{replynum}<\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li><em>{replynum}<\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>"}','0345faa7','0','0','0','1','a:3:{i:0\;s:8:"replynum"\;i:1\;s:3:"url"\;i:2\;s:5:"title"\;}','0'),('69','space_blog','[内置]日志标题+作者+简介','{"raw":"<div class=\\"module cl xld\\">\r\n[loop]\r\n<dl class=\\"cl\\">\r\n\t<dt><em class=\\"y xg1 xw0\\"><a href=\\"home.php?mod=space&uid={uid}\\"{target}>{username}<\/a><\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t<dd>{summary}<\/dd>\r\n<\/dl>\r\n[\/loop]\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<dl class=\\"cl\\">\r\n\t<dt><em class=\\"y xg1 xw0\\"><a href=\\"home.php?mod=space&uid={uid}\\"{target}>{username}<\/a><\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t<dd>{summary}<\/dd>\r\n<\/dl>"}','cd5e700c','0','1','0','1','a:5:{i:0\;s:3:"uid"\;i:1\;s:8:"username"\;i:2\;s:3:"url"\;i:3\;s:5:"title"\;i:4\;s:7:"summary"\;}','0'),('70','space_blog','[内置]日志缩略图+标题+简介','{"raw":"<div class=\\"module cl xld\\">\r\n[loop]\r\n<dl class=\\"cl\\">\r\n\t<dd class=\\"m\\"><a href=\\"{url}\\"{target}><img src=\\"{pic}\\" width=\\"{picwidth}\\" height=\\"{picheight}\\" alt=\\"{title}\\" \/><\/a><\/dd>\r\n\t<dt><em class=\\"y xg1 xw0\\"><a href=\\"home.php?uid={uid}\\"{target}>{username}<\/a><\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t<dd>{summary}<\/dd>\r\n<\/dl>\r\n[\/loop]\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<dl class=\\"cl\\">\r\n\t<dd class=\\"m\\"><a href=\\"{url}\\"{target}><img src=\\"{pic}\\" width=\\"{picwidth}\\" height=\\"{picheight}\\" alt=\\"{title}\\" \/><\/a><\/dd>\r\n\t<dt><em class=\\"y xg1 xw0\\"><a href=\\"home.php?uid={uid}\\"{target}>{username}<\/a><\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t<dd>{summary}<\/dd>\r\n<\/dl>"}','323bc8e0','1','1','1','1','a:6:{i:0\;s:3:"url"\;i:1\;s:3:"pic"\;i:2\;s:5:"title"\;i:3\;s:3:"uid"\;i:4\;s:8:"username"\;i:5\;s:7:"summary"\;}','0'),('71','space_blog','[内置]日志图片幻灯','{"raw":"<div class=\\"module cl slidebox\\">\r\n<ul class=\\"slideshow\\">\r\n[loop]\r\n<li style=\\"width: {picwidth}px\; height: {picheight}px\;\\"><a href=\\"{url}\\"{target}><img src=\\"{pic}\\" width=\\"{picwidth}\\" height=\\"{picheight}\\" \/><\/a><span class=\\"title\\">{title}<\/span><\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>\r\n<script type=\\"text\/javascript\\">\r\nrunslideshow()\;\r\n<\/script>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li style=\\"width: {picwidth}px\; height: {picheight}px\;\\"><a href=\\"{url}\\"{target}><img src=\\"{pic}\\" width=\\"{picwidth}\\" height=\\"{picheight}\\" \/><\/a><span class=\\"title\\">{title}<\/span><\/li>"}','c23cc347','1','0','1','1','a:3:{i:0\;s:3:"url"\;i:1\;s:3:"pic"\;i:2\;s:5:"title"\;}','0'),('72','space_blog','[内置]焦点模式','{"raw":"<div class=\\"module cl xld fcs\\">\r\n[loop]\r\n<dl class=\\"cl\\">\r\n\t<dt><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t<dd>{summary}<\/dd>\r\n<\/dl>\r\n[\/loop]\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<dl class=\\"cl\\">\r\n\t<dt><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t<dd>{summary}<\/dd>\r\n<\/dl>"}','3bb0bf67','0','1','0','1','a:3:{i:0\;s:3:"url"\;i:1\;s:5:"title"\;i:2\;s:7:"summary"\;}','0'),('73','space_album','[内置]相册列表','{"raw":"<div class=\\"module cl ml\\">\r\n<ul>\r\n[loop]\r\n<li>\r\n\t<a href=\\"{url}\\"{target}><img src=\\"{pic}\\" width=\\"{picwidth}\\" height=\\"{picheight}\\" alt=\\"{title}\\" \/><\/a>\r\n\t<p><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a> ({picnum})<\/p>\r\n<\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li>\r\n\t<a href=\\"{url}\\"{target}><img src=\\"{pic}\\" width=\\"{picwidth}\\" height=\\"{picheight}\\" alt=\\"{title}\\" \/><\/a>\r\n\t<p><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a> ({picnum})<\/p>\r\n<\/li>"}','73e0a54f','1','0','1','1','a:4:{i:0\;s:3:"url"\;i:1\;s:3:"pic"\;i:2\;s:5:"title"\;i:3\;s:6:"picnum"\;}','0'),('74','space_album','[内置]相册列表+名称+用户','{"raw":"<div class=\\"module cl ml\\">\r\n<ul>\r\n[loop]\r\n<li>\r\n\t<a href=\\"{url}\\"{target}><img src=\\"{pic}\\" width=\\"{picwidth}\\" height=\\"{picheight}\\" alt=\\"{title}\\" \/><\/a>\r\n\t<p><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a> ({picnum})<\/p>\r\n\t<span><a href=\\"home.php?uid={uid}\\"{target}>{username}<\/a><\/span>\r\n<\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li>\r\n\t<a href=\\"{url}\\"{target}><img src=\\"{pic}\\" width=\\"{picwidth}\\" height=\\"{picheight}\\" alt=\\"{title}\\" \/><\/a>\r\n\t<p><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a> ({picnum})<\/p>\r\n\t<span><a href=\\"home.php?uid={uid}\\"{target}>{username}<\/a><\/span>\r\n<\/li>"}','cc34db30','1','0','1','1','a:6:{i:0\;s:3:"url"\;i:1\;s:3:"pic"\;i:2\;s:5:"title"\;i:3\;s:6:"picnum"\;i:4\;s:3:"uid"\;i:5\;s:8:"username"\;}','0'),('75','space_pic','[内置]图片列表','{"raw":"<div class=\\"module cl ml\\">\r\n<ul>\r\n[loop]\r\n<li style=\\"width: {picwidth}px\;\\">\r\n\t<a href=\\"{url}\\"{target}><img src=\\"{pic}\\" width=\\"{picwidth}\\" height=\\"{picheight}\\" alt=\\"{title}\\" \/><\/a>\r\n\t<p><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/p>\r\n<\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li style=\\"width: {picwidth}px\;\\">\r\n\t<a href=\\"{url}\\"{target}><img src=\\"{pic}\\" width=\\"{picwidth}\\" height=\\"{picheight}\\" alt=\\"{title}\\" \/><\/a>\r\n\t<p><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/p>\r\n<\/li>"}','9e9201a8','1','0','1','1','a:3:{i:0\;s:3:"url"\;i:1\;s:3:"pic"\;i:2\;s:5:"title"\;}','0'),('76','space_pic','[内置]图片幻灯','{"raw":"<div class=\\"module cl slidebox\\">\r\n<ul class=\\"slideshow\\">\r\n[loop]\r\n<li style=\\"width: {picwidth}px\; height: {picheight}px\;\\"><a href=\\"{url}\\"{target}><img src=\\"{pic}\\" width=\\"{picwidth}\\" height=\\"{picheight}\\" \/><\/a><span class=\\"title\\">{title}<\/span><\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>\r\n<script type=\\"text\/javascript\\">\r\nrunslideshow()\;\r\n<\/script>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li style=\\"width: {picwidth}px\; height: {picheight}px\;\\"><a href=\\"{url}\\"{target}><img src=\\"{pic}\\" width=\\"{picwidth}\\" height=\\"{picheight}\\" \/><\/a><span class=\\"title\\">{title}<\/span><\/li>"}','c5d88e6d','1','0','1','1','a:3:{i:0\;s:3:"url"\;i:1\;s:3:"pic"\;i:2\;s:5:"title"\;}','0'),('77','member_member','[内置]会员头像列表','{"raw":"<div class=\\"module cl ml mls\\">\r\n<ul>\r\n[loop]\r\n<li>\r\n\t<a href=\\"{url}\\" c=\\"1\\"{target}><img src=\\"{avatar}\\" width=\\"48\\" height=\\"48\\" alt=\\"{title}\\" \/><\/a>\r\n\t<p><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/p>\r\n<\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li>\r\n\t<a href=\\"{url}\\" c=\\"1\\"{target}><img src=\\"{avatar}\\" width=\\"48\\" height=\\"48\\" alt=\\"{title}\\" \/><\/a>\r\n\t<p><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/p>\r\n<\/li>"}','2ef16e64','0','0','0','1','a:3:{i:0\;s:3:"url"\;i:1\;s:6:"avatar"\;i:2\;s:5:"title"\;}','0'),('78','member_member','[内置]用户名列表','{"raw":"<div class=\\"module cl xl xl1\\">\r\n<ul>\r\n[loop]\r\n<li><a href=\\"{url}\\" title=\\"{title}\\" c=\\"1\\"{target}>{title}<\/a><\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li><a href=\\"{url}\\" title=\\"{title}\\" c=\\"1\\"{target}>{title}<\/a><\/li>"}','ed36c3b0','0','0','0','1','a:2:{i:0\;s:3:"url"\;i:1\;s:5:"title"\;}','0'),('79','member_member','[内置]头像+用户名+发贴数（有序）','{"raw":"<div class=\\"module cl xl xl1\\">\r\n<ol>\r\n[loop]\r\n<li><em>{posts}<\/em><img class=\\"vm\\" src=\\"{avatar}\\" width=\\"16\\" height=\\"16\\" alt=\\"{title}\\" \/> <a href=\\"{url}\\" title=\\"{title}\\" c=\\"1\\"{target}>{title}<\/a><\/li>\r\n[\/loop]\r\n<\/ol>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li><em>{posts}<\/em><img class=\\"vm\\" src=\\"{avatar}\\" width=\\"16\\" height=\\"16\\" alt=\\"{title}\\" \/> <a href=\\"{url}\\" title=\\"{title}\\" c=\\"1\\"{target}>{title}<\/a><\/li>"}','b185afb9','0','0','0','1','a:4:{i:0\;s:5:"posts"\;i:1\;s:6:"avatar"\;i:2\;s:5:"title"\;i:3\;s:3:"url"\;}','0'),('80','member_member','[内置]头像+用户名+积分数（有序）','{"raw":"<div class=\\"module cl xl xl1\\">\r\n<ol>\r\n[loop]\r\n<li><em>{credits}<\/em><img class=\\"vm\\" src=\\"{avatar}\\" width=\\"16\\" height=\\"16\\" alt=\\"{title}\\" \/> <a href=\\"{url}\\" title=\\"{title}\\" c=\\"1\\"{target}>{title}<\/a><\/li>\r\n[\/loop]\r\n<\/ol>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li><em>{credits}<\/em><img class=\\"vm\\" src=\\"{avatar}\\" width=\\"16\\" height=\\"16\\" alt=\\"{title}\\" \/> <a href=\\"{url}\\" title=\\"{title}\\" c=\\"1\\"{target}>{title}<\/a><\/li>"}','8431f4e1','0','0','0','1','a:4:{i:0\;s:7:"credits"\;i:1\;s:6:"avatar"\;i:2\;s:5:"title"\;i:3\;s:3:"url"\;}','0'),('81','forum_trade','[内置]商品列表','{"raw":"<div class=\\"module cl ml\\">\r\n<ul>\r\n[loop]\r\n<li style=\\"padding: 0 12px 10px\; width: {picwidth}px\;\\">\r\n<a href=\\"{url}\\"{target}><img src=\\"{pic}\\" width=\\"{picwidth}\\" height=\\"{picheight}\\" alt=\\"{title}\\" style=\\"padding: 1px\; border: 1px solid #CCC\; background: #FFF\;\\" \/><\/a>\r\n<p class=\\"xs2\\"><a href=\\"{url}\\"{target} class=\\"xi1\\">{price}<\/a><\/p>\r\n<p><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/p>\r\n<\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li style=\\"padding: 0 12px 10px\; width: {picwidth}px\;\\">\r\n<a href=\\"{url}\\"{target}><img src=\\"{pic}\\" width=\\"{picwidth}\\" height=\\"{picheight}\\" alt=\\"{title}\\" style=\\"padding: 1px\; border: 1px solid #CCC\; background: #FFF\;\\" \/><\/a>\r\n<p class=\\"xs2\\"><a href=\\"{url}\\"{target} class=\\"xi1\\">{price}<\/a><\/p>\r\n<p><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/p>\r\n<\/li>"}','4fd3ffc9','1','0','1','1','a:4:{i:0\;s:3:"url"\;i:1\;s:3:"pic"\;i:2\;s:5:"title"\;i:3\;s:5:"price"\;}','0'),('82','forum_activity','[内置]活动列表','','3d04a558','1','0','1','1','a:6:{i:0\;s:3:"url"\;i:1\;s:3:"pic"\;i:2\;s:5:"title"\;i:3\;s:4:"time"\;i:4\;s:5:"place"\;i:5\;s:11:"applynumber"\;}','0'),('83','group_trade','[内置]商品列表','{"raw":"<div class=\\"module cl ml\\">\r\n<ul>\r\n[loop]\r\n<li style=\\"width: {picwidth}px\;\\">\r\n\t<a href=\\"{url}\\"{target}><img src=\\"{pic}\\" width=\\"{picwidth}\\" height=\\"{picheight}\\" alt=\\"{title}\\" \/><\/a>\r\n\t<p><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/p>\r\n\t<p>{price}<\/p>\r\n<\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li style=\\"width: {picwidth}px\;\\">\r\n\t<a href=\\"{url}\\"{target}><img src=\\"{pic}\\" width=\\"{picwidth}\\" height=\\"{picheight}\\" alt=\\"{title}\\" \/><\/a>\r\n\t<p><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/p>\r\n\t<p>{price}<\/p>\r\n<\/li>"}','edd331a7','1','0','1','1','a:4:{i:0\;s:3:"url"\;i:1\;s:3:"pic"\;i:2\;s:5:"title"\;i:3\;s:5:"price"\;}','0'),('84','group_activity','[内置]活动列表','','502cc3f6','1','0','1','1','a:6:{i:0\;s:3:"url"\;i:1\;s:3:"pic"\;i:2\;s:5:"title"\;i:3\;s:4:"time"\;i:4\;s:5:"place"\;i:5\;s:11:"applynumber"\;}','0'),('85','forum_thread','[内置]帖子作者＋标题+摘要（带头像）','','87d533ea','0','1','0','1','a:6:{i:0\;s:8:"authorid"\;i:1\;s:6:"avatar"\;i:2\;s:6:"author"\;i:3\;s:3:"url"\;i:4\;s:5:"title"\;i:5\;s:7:"summary"\;}','0'),('86','portal_article','[内置]频道栏目+标题','{"raw":"<div class=\\"module cl xl xl1\\">\r\n<ul>\r\n[loop]\r\n<li><label>[<a href=\\"{caturl}\\" title=\\"{catname}\\"{target}>{catname}<\/a>]<\/label><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li><label>[<a href=\\"{caturl}\\" title=\\"{catname}\\"{target}>{catname}<\/a>]<\/label><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>"}','7720f457','0','0','0','1','a:4:{i:0\;s:6:"caturl"\;i:1\;s:7:"catname"\;i:2\;s:3:"url"\;i:3\;s:5:"title"\;}','0'),('87','forum_thread','[内置]悬赏主题专用样式','{"raw":"<div class=\\"module cl xl xl1\\">\r\n<ul>\r\n[loop]\r\n<li><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a>{summary}<\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a>{summary}<\/li>"}','56bffda0','0','1','0','1','a:3:{i:0\;s:3:"url"\;i:1\;s:5:"title"\;i:2\;s:7:"summary"\;}','0'),('88','forum_thread','[内置]首页热议-帖子','{"raw":"<div class=\\"module cl xld\\">\r\n[loop]\r\n<dl>\r\n\t<dd style=\\"margin-bottom: 0\; font-size: 12px\; color: #369\\">{author} &#8250\;<\/dd>\r\n\t<dt style=\\"padding: 0\;\\"><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t<dd style=\\"margin-bottom: 0\;\\">{summary}<\/dd>\r\n<\/dl>\r\n[\/loop]\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<dl>\r\n\t<dd style=\\"margin-bottom: 0\; font-size: 12px\; color: #369\\">{author} &#8250\;<\/dd>\r\n\t<dt style=\\"padding: 0\;\\"><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t<dd style=\\"margin-bottom: 0\;\\">{summary}<\/dd>\r\n<\/dl>"}','8596517','0','1','0','1','a:4:{i:0\;s:6:"author"\;i:1\;s:3:"url"\;i:2\;s:5:"title"\;i:3\;s:7:"summary"\;}','0'),('89','group_thread','[内置]首页热议-群组帖子','{"raw":"<div class=\\"module cl xld\\">\r\n[loop]\r\n<dl>\r\n\t<dd style=\\"margin-bottom: 0\; font-size: 12px\; color: #369\\">{author} &#8250\;<\/dd>\r\n\t<dt style=\\"padding: 0\;\\"><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t<dd style=\\"margin-bottom: 0\;\\">{summary}<\/dd>\r\n<\/dl>\r\n[\/loop]\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<dl>\r\n\t<dd style=\\"margin-bottom: 0\; font-size: 12px\; color: #369\\">{author} &#8250\;<\/dd>\r\n\t<dt style=\\"padding: 0\;\\"><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t<dd style=\\"margin-bottom: 0\;\\">{summary}<\/dd>\r\n<\/dl>"}','a75db897','0','1','0','1','a:4:{i:0\;s:6:"author"\;i:1\;s:3:"url"\;i:2\;s:5:"title"\;i:3\;s:7:"summary"\;}','0'),('90','space_blog','[内置]首页热议-日志','{"raw":"<div class=\\"module cl xld\\">\r\n[loop]\r\n<dl>\r\n\t<dd style=\\"margin-bottom: 0\; font-size: 12px\; color: #369\\">{username} &#8250\;<\/dd>\r\n\t<dt style=\\"padding: 0\;\\"><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t<dd style=\\"margin-bottom: 0\;\\">{summary}<\/dd>\r\n<\/dl>\r\n[\/loop]\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<dl>\r\n\t<dd style=\\"margin-bottom: 0\; font-size: 12px\; color: #369\\">{username} &#8250\;<\/dd>\r\n\t<dt style=\\"padding: 0\;\\"><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t<dd style=\\"margin-bottom: 0\;\\">{summary}<\/dd>\r\n<\/dl>"}','9e68bc9b','0','1','0','1','a:4:{i:0\;s:8:"username"\;i:1\;s:3:"url"\;i:2\;s:5:"title"\;i:3\;s:7:"summary"\;}','0'),('91','forum_thread','[内置]投票主题专用样式','{"raw":"<div class=\\"module cl xld b_poll\\">\r\n[loop]\r\n<dl>\r\n<dt class=\\"xs2\\"><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n<dd>{summary}<\/dd>\r\n<\/dl>\r\n[\/loop]\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<dl>\r\n<dt class=\\"xs2\\"><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n<dd>{summary}<\/dd>\r\n<\/dl>"}','fa07a66f','0','1','0','1','a:3:{i:0\;s:3:"url"\;i:1\;s:5:"title"\;i:2\;s:7:"summary"\;}','0'),('92','forum_thread','[内置]辩论主题专用样式','{"raw":"<div class=\\"module cl xld b_debate\\">\r\n[loop]\r\n<dl>\r\n<dt class=\\"xs2\\"><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n<dd>{summary}<\/dd>\r\n<\/dl>\r\n[\/loop]\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<dl>\r\n<dt class=\\"xs2\\"><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n<dd>{summary}<\/dd>\r\n<\/dl>"}','6a480986','0','1','0','1','a:3:{i:0\;s:3:"url"\;i:1\;s:5:"title"\;i:2\;s:7:"summary"\;}','0'),('93','group_activity','[内置]群组活动:大图＋摘要','','11d4011e','1','1','0','1','a:8:{i:0\;s:3:"url"\;i:1\;s:3:"pic"\;i:2\;s:5:"title"\;i:3\;s:7:"summary"\;i:4\;s:5:"place"\;i:5\;s:5:"class"\;i:6\;s:4:"time"\;i:7\;s:11:"applynumber"\;}','0'),('94','group_activity','[内置]群组活动:小图＋标题','','51658dfa','1','0','0','1','a:6:{i:0\;s:3:"url"\;i:1\;s:3:"pic"\;i:2\;s:5:"title"\;i:3\;s:4:"time"\;i:4\;s:5:"place"\;i:5\;s:11:"applynumber"\;}','0'),('95','space_album','[内置]相册列表（竖线分隔）','{"raw":"<div class=\\"module cl ml\\">\r\n<ul>\r\n[loop]\r\n<li style=\\"width: {picwidth}px\;\\">\r\n\t<a href=\\"{url}\\"><img src=\\"{pic}\\" width=\\"{picwidth}\\" height=\\"{picheight}\\" alt=\\"{title}\\" \/><\/a>\r\n\t<p><a href=\\"{url}\\" title=\\"{title}\\" title=\\"{title}\\"{target}>{title}<\/a> ({picnum})<\/p>\r\n<\/li>\r\n[\/loop]\r\n[order=odd]\r\n<li style=\\"margin-right: 18px\; padding-right: 24px\; border-right: 1px solid #CCC\; width: {picwidth}px\;\\">\r\n\t<a href=\\"{url}\\"><img src=\\"{pic}\\" width=\\"{picwidth}\\" height=\\"{picheight}\\" alt=\\"{title}\\" \/><\/a>\r\n\t<p><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a> ({picnum})<\/p>\r\n<\/li>\r\n[\/order]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":{"odd":"<li style=\\"margin-right: 18px\; padding-right: 24px\; border-right: 1px solid #CCC\; width: {picwidth}px\;\\">\r\n\t<a href=\\"{url}\\"><img src=\\"{pic}\\" width=\\"{picwidth}\\" height=\\"{picheight}\\" alt=\\"{title}\\" \/><\/a>\r\n\t<p><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a> ({picnum})<\/p>\r\n<\/li>"},"loopplus":[],"loop":"<li style=\\"width: {picwidth}px\;\\">\r\n\t<a href=\\"{url}\\"><img src=\\"{pic}\\" width=\\"{picwidth}\\" height=\\"{picheight}\\" alt=\\"{title}\\" \/><\/a>\r\n\t<p><a href=\\"{url}\\" title=\\"{title}\\" title=\\"{title}\\"{target}>{title}<\/a> ({picnum})<\/p>\r\n<\/li>"}','771549b7','1','0','1','1','a:4:{i:0\;s:3:"url"\;i:1\;s:3:"pic"\;i:2\;s:5:"title"\;i:3\;s:6:"picnum"\;}','0'),('96','space_pic','[内置]图片列表（竖线分隔）','{"raw":"<div class=\\"module cl ml\\">\r\n<ul>\r\n[loop]\r\n<li style=\\"width: {picwidth}px\;\\">\r\n\t<a href=\\"{url}\\"><img src=\\"{pic}\\" width=\\"{picwidth}\\" height=\\"{picheight}\\" alt=\\"{title}\\" \/><\/a>\r\n\t<p><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/p>\r\n<\/li>\r\n[\/loop]\r\n[order=odd]\r\n<li style=\\"margin-right: 18px\; padding-right: 24px\; border-right: 1px solid #EEE\; width: {picwidth}px\;\\">\r\n\t<a href=\\"{url}\\"><img src=\\"{pic}\\" width=\\"{picwidth}\\" height=\\"{picheight}\\" alt=\\"{title}\\" \/><\/a>\r\n\t<p><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/p>\r\n<\/li>\r\n[\/order]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":{"odd":"<li style=\\"margin-right: 18px\; padding-right: 24px\; border-right: 1px solid #EEE\; width: {picwidth}px\;\\">\r\n\t<a href=\\"{url}\\"><img src=\\"{pic}\\" width=\\"{picwidth}\\" height=\\"{picheight}\\" alt=\\"{title}\\" \/><\/a>\r\n\t<p><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/p>\r\n<\/li>"},"loopplus":[],"loop":"<li style=\\"width: {picwidth}px\;\\">\r\n\t<a href=\\"{url}\\"><img src=\\"{pic}\\" width=\\"{picwidth}\\" height=\\"{picheight}\\" alt=\\"{title}\\" \/><\/a>\r\n\t<p><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/p>\r\n<\/li>"}','ab23af19','1','0','1','1','a:3:{i:0\;s:3:"url"\;i:1\;s:3:"pic"\;i:2\;s:5:"title"\;}','0'),('97','portal_article','[内置]碎片式文章标题列表','{"raw":"<div class=\\"module cl xl xl1\\">\r\n<ul>\r\n[loop]\r\n<li><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a>\r\n[\/loop]\r\n[order=even]\r\n<a href=\\"{url}\\" title=\\"{title}\\"{target} class=\\"lit\\" style=\\"margin-left: 5px\; font-size: 12px\\">{title}<\/a><\/li>\r\n[\/order]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":{"even":"<a href=\\"{url}\\" title=\\"{title}\\"{target} class=\\"lit\\" style=\\"margin-left: 5px\; font-size: 12px\\">{title}<\/a><\/li>"},"loopplus":[],"loop":"<li><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a>"}','bc85eab4','0','0','0','1','a:2:{i:0\;s:3:"url"\;i:1\;s:5:"title"\;}','0'),('98','portal_article','[内置]文章封面列表（竖线分隔）','{"raw":"<div class=\\"module cl ml\\">\r\n<ul>\r\n[loop]\r\n<li style=\\"width: {picwidth}px\;\\">\r\n\t<a href=\\"{url}\\"><img src=\\"{pic}\\" width=\\"{picwidth}\\" height=\\"{picheight}\\" alt=\\"{title}\\" \/><\/a>\r\n\t<p><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/p>\r\n<\/li>\r\n[\/loop]\r\n[order=odd]\r\n<li style=\\"margin-right: 18px\; padding-right: 24px\; border-right: 1px solid #EEE\; width: {picwidth}px\;\\">\r\n\t<a href=\\"{url}\\"><img src=\\"{pic}\\" width=\\"{picwidth}\\" height=\\"{picheight}\\" alt=\\"{title}\\" \/><\/a>\r\n\t<p><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/p>\r\n<\/li>\r\n[\/order]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":{"odd":"<li style=\\"margin-right: 18px\; padding-right: 24px\; border-right: 1px solid #EEE\; width: {picwidth}px\;\\">\r\n\t<a href=\\"{url}\\"><img src=\\"{pic}\\" width=\\"{picwidth}\\" height=\\"{picheight}\\" alt=\\"{title}\\" \/><\/a>\r\n\t<p><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/p>\r\n<\/li>"},"loopplus":[],"loop":"<li style=\\"width: {picwidth}px\;\\">\r\n\t<a href=\\"{url}\\"><img src=\\"{pic}\\" width=\\"{picwidth}\\" height=\\"{picheight}\\" alt=\\"{title}\\" \/><\/a>\r\n\t<p><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/p>\r\n<\/li>"}','6b653acb','1','0','1','1','a:3:{i:0\;s:3:"url"\;i:1\;s:3:"pic"\;i:2\;s:5:"title"\;}','0'),('99','html_announcement','[内置]站点公告','','1f88cc82','0','0','0','1','a:3:{i:0\;s:3:"url"\;i:1\;s:5:"title"\;i:2\;s:9:"starttime"\;}','0'),('100','forum_thread','[内置]帖子图文展示','{"raw":"<div class=\\"module cl xld\\">\r\n[loop]\r\n<dl class=\\"cl\\">\r\n\t<dd class=\\"m\\"><a href=\\"{url}\\"{target}><img src=\\"{pic}\\" width=\\"{picwidth}\\" height=\\"{picheight}\\" alt=\\"{title}\\" \/><\/a><\/dd>\r\n\t<dt><em class=\\"y xg1 xw0\\"><a href=\\"home.php?mod=space&uid={authorid}\\"{target}>{author}<\/a><\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t<dd>{summary}<\/dd>\r\n<\/dl>\r\n[\/loop]\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<dl class=\\"cl\\">\r\n\t<dd class=\\"m\\"><a href=\\"{url}\\"{target}><img src=\\"{pic}\\" width=\\"{picwidth}\\" height=\\"{picheight}\\" alt=\\"{title}\\" \/><\/a><\/dd>\r\n\t<dt><em class=\\"y xg1 xw0\\"><a href=\\"home.php?mod=space&uid={authorid}\\"{target}>{author}<\/a><\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t<dd>{summary}<\/dd>\r\n<\/dl>"}','881ee4a3','1','1','1','1','a:6:{i:0\;s:3:"url"\;i:1\;s:3:"pic"\;i:2\;s:5:"title"\;i:3\;s:8:"authorid"\;i:4\;s:6:"author"\;i:5\;s:7:"summary"\;}','0'),('101','group_thread','[内置]帖子图文列表','{"raw":"<div class=\\"module cl xld\\">\r\n[loop]\r\n<dl class=\\"cl\\">\r\n\t<dd class=\\"m\\"><a href=\\"{url}\\"{target}><img src=\\"{pic}\\" width=\\"{picwidth}\\" height=\\"{picheight}\\" alt=\\"{title}\\" \/><\/a><\/dd>\r\n\t<dt><em class=\\"y xg1 xw0\\"><a href=\\"home.php?mod=space&uid={authorid}\\"{target}>{author}<\/a><\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t<dd>{summary}<\/dd>\r\n<\/dl>\r\n[\/loop]\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<dl class=\\"cl\\">\r\n\t<dd class=\\"m\\"><a href=\\"{url}\\"{target}><img src=\\"{pic}\\" width=\\"{picwidth}\\" height=\\"{picheight}\\" alt=\\"{title}\\" \/><\/a><\/dd>\r\n\t<dt><em class=\\"y xg1 xw0\\"><a href=\\"home.php?mod=space&uid={authorid}\\"{target}>{author}<\/a><\/em><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n\t<dd>{summary}<\/dd>\r\n<\/dl>"}','b67132d6','1','1','1','1','a:6:{i:0\;s:3:"url"\;i:1\;s:3:"pic"\;i:2\;s:5:"title"\;i:3\;s:8:"authorid"\;i:4\;s:6:"author"\;i:5\;s:7:"summary"\;}','0'),('102','group_thread','[内置][群组名]+群组帖子标题','{"raw":"<div class=\\"module cl xl xl1\\">\r\n<ul>\r\n[loop]\r\n<li>[<a href=\\"{groupurl}\\"{target}>{groupname}<\/a>] <a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li>[<a href=\\"{groupurl}\\"{target}>{groupname}<\/a>] <a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>"}','a2f9089e','0','0','0','1','a:4:{i:0\;s:8:"groupurl"\;i:1\;s:9:"groupname"\;i:2\;s:3:"url"\;i:3\;s:5:"title"\;}','0'),('103','other_otherfriendlink','[内置]友情链接图文','{"raw":"<div class=\\"bn lk\\">\r\n<ul class=\\"m cl\\">\r\n[loop]\r\n<li class=\\"cl\\">\r\n<div class=\\"forumlogo\\"><a href=\\"{url}\\" {target}><img border=\\"0\\" alt=\\"{title}\\" src=\\"{pic}\\"><\/a><\/div>\r\n<div class=\\"forumcontent\\"><h5><a target=\\"_blank\\" href=\\"{url}\\">{title}<\/a><\/h5><p>{summary}<\/p><\/div>\r\n<\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li class=\\"cl\\">\r\n<div class=\\"forumlogo\\"><a href=\\"{url}\\" {target}><img border=\\"0\\" alt=\\"{title}\\" src=\\"{pic}\\"><\/a><\/div>\r\n<div class=\\"forumcontent\\"><h5><a target=\\"_blank\\" href=\\"{url}\\">{title}<\/a><\/h5><p>{summary}<\/p><\/div>\r\n<\/li>"}','b921ea24','0','1','1','1','a:4:{i:0\;s:3:"url"\;i:1\;s:5:"title"\;i:2\;s:3:"pic"\;i:3\;s:7:"summary"\;}','0'),('104','other_otherfriendlink','[内置]友情链接仅图片','{"raw":"<div class=\\"bn lk\\">\r\n<div class=\\"cl mbm\\">\r\n[loop]\r\n<a href=\\"{url}\\" {target}><img border=\\"0\\" alt=\\"{title}\\" src=\\"{pic}\\"><\/a>\r\n[\/loop]\r\n<\/div>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<a href=\\"{url}\\" {target}><img border=\\"0\\" alt=\\"{title}\\" src=\\"{pic}\\"><\/a>"}','c8d00338','0','1','0','1','a:3:{i:0\;s:3:"url"\;i:1\;s:5:"title"\;i:2\;s:3:"pic"\;}','0'),('105','other_otherfriendlink','[内置]友情链接仅文字','{"raw":"<div class=\\"x cl\\">\r\n<ul class=\\"cl mbm\\">\r\n[loop]\r\n<li><a href=\\"{url}\\" {target}>{title}<\/a><\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li><a href=\\"{url}\\" {target}>{title}<\/a><\/li>"}','b615e0d0','0','0','0','1','a:2:{i:0\;s:3:"url"\;i:1\;s:5:"title"\;}','0'),('106','other_otherstat','[内置]全部统计信息','{"raw":"[loop]<div class=\\"tns\\">\r\n<ul>\r\n<li>{posts_title}:<em>{posts}<\/em><\/li>\r\n<li>{groups_title}:<em>{groups}<\/em><\/li>\r\n<li>{members_title}:<em>{members}<\/em><\/li>\r\n<li>{groupnewposts_title}:<em>{groupnewposts}<\/em><\/li>\r\n<li>{bbsnewposts_title}:<em>{bbsnewposts}<\/em><\/li>\r\n<li>{bbslastposts_title}:<em>{bbslastposts}<\/em><\/li>\r\n<li>{onlinemembers_title}:<em>{onlinemembers}<\/em><\/li>\r\n<li>{maxmembers_title}:<em>{maxmembers}<\/em><\/li>\r\n<li>{doings_title}:<em>{doings}<\/em><\/li>\r\n<li>{blogs_title}:<em>{blogs}<\/em><\/li>\r\n<li>{albums_title}:<em>{albums}<\/em><\/li>\r\n<li>{pics_title}:<em>{pics}<\/em><\/li>\r\n<li>{shares_title}:<em>{shares}<\/em><\/li>\r\n<\/ul>\r\n<\/div>\r\n[\/loop]","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<div class=\\"tns\\">\r\n<ul>\r\n<li>{posts_title}:<em>{posts}<\/em><\/li>\r\n<li>{groups_title}:<em>{groups}<\/em><\/li>\r\n<li>{members_title}:<em>{members}<\/em><\/li>\r\n<li>{groupnewposts_title}:<em>{groupnewposts}<\/em><\/li>\r\n<li>{bbsnewposts_title}:<em>{bbsnewposts}<\/em><\/li>\r\n<li>{bbslastposts_title}:<em>{bbslastposts}<\/em><\/li>\r\n<li>{onlinemembers_title}:<em>{onlinemembers}<\/em><\/li>\r\n<li>{maxmembers_title}:<em>{maxmembers}<\/em><\/li>\r\n<li>{doings_title}:<em>{doings}<\/em><\/li>\r\n<li>{blogs_title}:<em>{blogs}<\/em><\/li>\r\n<li>{albums_title}:<em>{albums}<\/em><\/li>\r\n<li>{pics_title}:<em>{pics}<\/em><\/li>\r\n<li>{shares_title}:<em>{shares}<\/em><\/li>\r\n<\/ul>\r\n<\/div>"}','027d3e60','0','0','0','0','a:26:{i:0\;s:11:"posts_title"\;i:1\;s:5:"posts"\;i:2\;s:12:"groups_title"\;i:3\;s:6:"groups"\;i:4\;s:13:"members_title"\;i:5\;s:7:"members"\;i:6\;s:19:"groupnewposts_title"\;i:7\;s:13:"groupnewposts"\;i:8\;s:17:"bbsnewposts_title"\;i:9\;s:11:"bbsnewposts"\;i:10\;s:18:"bbslastposts_title"\;i:11\;s:12:"bbslastposts"\;i:12\;s:19:"onlinemembers_title"\;i:13\;s:13:"onlinemembers"\;i:14\;s:16:"maxmembers_title"\;i:15\;s:10:"maxmembers"\;i:16\;s:12:"doings_title"\;i:17\;s:6:"doings"\;i:18\;s:11:"blogs_title"\;i:19\;s:5:"blogs"\;i:20\;s:12:"albums_title"\;i:21\;s:6:"albums"\;i:22\;s:10:"pics_title"\;i:23\;s:4:"pics"\;i:24\;s:12:"shares_title"\;i:25\;s:6:"shares"\;}','0'),('107','forum_thread','[内置]一简介+两列标题','{"raw":"<div class=\\"bm bw0\\">\r\n[index=1]\r\n<dl class=\\"cl xld\\">\r\n<dt><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n<dd>{summary}<\/dd>\r\n<\/dl>\r\n<hr class=\\"da\\" \/>\r\n[\/index]\r\n<ul class=\\"xl xl2 cl\\">\r\n[loop]<li><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":{"1":"<dl class=\\"cl xld\\">\r\n<dt><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/dt>\r\n<dd>{summary}<\/dd>\r\n<\/dl>\r\n<hr class=\\"da\\" \/>"},"orderplus":[],"order":[],"loopplus":[],"loop":"<li><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/li>"}','9e2ea31f','0','1','0','1','a:3:{i:0\;s:3:"url"\;i:1\;s:5:"title"\;i:2\;s:7:"summary"\;}','0'),('108','forum_thread','[内置]帖子图片幻灯片','{"raw":"<div class=\\"module cl slidebox\\">\r\n<ul class=\\"slideshow\\">\r\n[loop]\r\n<li style=\\"width: {picwidth}px\; height: {picheight}px\;\\"><a href=\\"{url}\\"{target}><img src=\\"{pic}\\" width=\\"{picwidth}\\" height=\\"{picheight}\\" \/><\/a><span class=\\"title\\">{title}<\/span><\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>\r\n<script type=\\"text\/javascript\\">\r\nrunslideshow()\;\r\n<\/script>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li style=\\"width: {picwidth}px\; height: {picheight}px\;\\"><a href=\\"{url}\\"{target}><img src=\\"{pic}\\" width=\\"{picwidth}\\" height=\\"{picheight}\\" \/><\/a><span class=\\"title\\">{title}<\/span><\/li>"}','cba1f109','1','0','1','1','a:3:{i:0\;s:3:"url"\;i:1\;s:3:"pic"\;i:2\;s:5:"title"\;}','0'),('109','forum_thread','[内置]帖子图片列表','{"raw":"<div class=\\"module cl ml\\">\r\n<ul>\r\n[loop]\r\n<li style=\\"width: {picwidth}px\;\\">\r\n\t<a href=\\"{url}\\"{target}><img src=\\"{pic}\\" width=\\"{picwidth}\\" height=\\"{picheight}\\" alt=\\"{title}\\" \/><\/a>\r\n\t<p><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/p>\r\n<\/li>\r\n[\/loop]\r\n<\/ul>\r\n<\/div>","footer":"","header":"","indexplus":[],"index":[],"orderplus":[],"order":[],"loopplus":[],"loop":"<li style=\\"width: {picwidth}px\;\\">\r\n\t<a href=\\"{url}\\"{target}><img src=\\"{pic}\\" width=\\"{picwidth}\\" height=\\"{picheight}\\" alt=\\"{title}\\" \/><\/a>\r\n\t<p><a href=\\"{url}\\" title=\\"{title}\\"{target}>{title}<\/a><\/p>\r\n<\/li>"}','0ab2e307','1','0','1','1','a:3:{i:0\;s:3:"url"\;i:1\;s:3:"pic"\;i:2\;s:5:"title"\;}','0')`)

	}
}
