package models

import (
	"bbs/db"
	"bbs/libraries"
	"errors"
	"reflect"
	"strconv"
	"time"
)

type Model_Setting struct {
	Model
}

func setting_init() {

	model := new(Model)
	var data []*db.Common_setting
	model.Table("Common_setting").Select(&data)
	if len(data) == 0 {

		base_cfg := map[string]string{

			`accessemail`:           ``,
			`activityforumid`:       `0`,
			`activityfield`:         `[{"Fieldid":"qq","Title":"QQ","Checked":0},{"Fieldid":"mobile","Title":"手机","Checked":0},{"Fieldid":"realname","Title":"真实姓名","Checked":0}]`,
			`activityextnum`:        `0`,
			`activitypp`:            `8`,
			`activitycredit`:        `1`,
			`activitytype`:          "朋友聚会\r\n出外郊游\r\n自驾出行\r\n公益活动\r\n线上活动",
			`adminemail`:            `admin@admin.com`,
			`adminipaccess`:         ``,
			`adminnotifytypes`:      `verifythread,verifypost,verifyuser,verifyblog,verifydoing,verifypic,verifyshare,verifycommontes,verifyrecycle,verifyrecyclepost,verifyarticle,verifyacommont,verifymedal,verify_1,verify_2,verify_3,verify_4,verify_5,verify_6,verify_7`,
			`anonymoustext`:         `匿名`,
			`advtype`:               `a:0:{}`,
			`allowattachurl`:        `0`,
			`allowdomain`:           `0`,
			`alloweditpost`:         `0`,
			`allowswitcheditor`:     `1`,
			`allowthreadplugin`:     ``,
			`allowviewuserthread`:   `a:2:{s:5:"allow";s:1:"1";s:4:"fids";a:1:{i:0;s:0:"";}}`,
			`archiver`:              `1`,
			`archiverredirect`:      `0`,
			`attachbanperiods`:      ``,
			`attachdir`:             `./data/attachment`,
			`attachexpire`:          ``,
			`attachimgpost`:         `1`,
			`attachrefcheck`:        `0`,
			`attachsave`:            `3`,
			`attachurl`:             `data/attachment`,
			`authkey`:               `a50ce3bd7a9dfd761884bdcc2e03d310f6wZsunSBM6lBb3QmN`,
			`authoronleft`:          `1`,
			`uidlogin`:              `0`,
			`autoidselect`:          `0`,
			`avatarmethod`:          `0`,
			`backupdir`:             `f4604b`,
			`bannedmessages`:        `1`,
			`bbclosed`:              `0`,
			`bbname`:                `Discuz! Board1`,
			`bbrules`:               `0`,
			`bbrulesforce`:          `0`,
			`bbrulestxt`:            ``,
			`bdaystatus`:            `0`,
			`binddomains`:           `a:0:{}`,
			`boardlicensed`:         `0`,
			`cacheindexlife`:        `0`,
			`cachethreaddir`:        `data/threadcache`,
			`cachethreadlife`:       `0`,
			`censoremail`:           ``,
			`censoruser`:            ``,
			`closedallowactivation`: `0`,
			`closedreason`:          ``,
			`commentfirstpost`:      `1`,
			`commentitem`: `					`,
			`commentnumber`:         `5`,
			`creditnotice`:          `1`,
			`creditsformula`:        `posts+digestposts*5+extcredits1*2+extcredits2+extcredits3`,
			`creditsformulaexp`:     `<u>总积分</u>=<u>发帖数</u>+<u>精华帖数</u>*5+<u>威望</u>*2+<u>金钱</u>+<u>贡献</u>`,
			`creditsnotify`:         ``,
			`creditspolicy`:         `a:12:{s:4:"post";a:0:{}s:5:"reply";a:0:{}s:6:"digest";a:1:{i:1;i:10;}s:10:"postattach";a:0:{}s:9:"getattach";a:0:{}s:6:"sendpm";a:0:{}s:6:"search";a:0:{}s:15:"promotion_visit";a:0:{}s:18:"promotion_register";a:0:{}s:13:"tradefinished";a:0:{}s:8:"votepoll";a:0:{}s:10:"lowerlimit";a:0:{}}`,
			`creditstax`:            `0.2`,
			`creditstrans`:          `2,0,0,0,0,0,0`,
			`customauthorinfo`:      `a:1:{i:0;a:10:{s:5:"posts";a:2:{s:5:"order";s:0:"";s:4:"menu";s:1:"1";}s:7:"threads";a:1:{s:5:"order";s:0:"";}s:6:"digest";a:2:{s:5:"order";s:0:"";s:4:"menu";s:1:"1";}s:7:"credits";a:2:{s:5:"order";s:0:"";s:4:"menu";s:1:"1";}s:8:"readperm";a:2:{s:5:"order";s:0:"";s:4:"menu";s:1:"1";}s:7:"regtime";a:2:{s:5:"order";s:0:"";s:4:"menu";s:1:"1";}s:8:"lastdate";a:2:{s:5:"order";s:0:"";s:4:"menu";s:1:"1";}s:11:"extcredits1";a:1:{s:5:"order";s:0:"";}s:11:"extcredits2";a:1:{s:5:"order";s:0:"";}s:11:"extcredits3";a:1:{s:5:"order";s:0:"";}}}`,
			`custombackup`:          ``,
			`dateconvert`:           `1`,
			`dateformat`:            `Y-n-j`,
			`debateforumid`:         `0`,
			`debug`:                 `1`,
			`defaulteditormode`:     `1`,
			`delayviewcount`:        `0`,
			`deletereason`:          ``,
			`disallowfloat`:         `a:1:{i:3;s:9:"newthread";}`,
			`domainroot`:            ``,
			`domainwhitelist`:       ``,
			`doublee`:               `1`,
			`dupkarmarate`:          `0`,
			`ec_account`:            ``,
			`ec_contract`:           ``,
			`ec_credit`:             `a:2:{s:18:"maxcreditspermonth";i:6;s:4:"rank";a:15:{i:1;i:4;i:2;i:11;i:3;i:41;i:4;i:91;i:5;i:151;i:6;i:251;i:7;i:501;i:8;i:1001;i:9;i:2001;i:10;i:5001;i:11;i:10001;i:12;i:20001;i:13;i:50001;i:14;i:100001;i:15;i:200001;}}`,
			`ec_maxcredits`:         `1000`,
			`ec_maxcreditspermonth`: `0`,
			`ec_mincredits`:         `0`,
			`ec_ratio`:              `0`,
			`ec_tenpay_bargainor`:   ``,
			`ec_tenpay_key`:         ``,
			`postappend`:            `0`,
			`editedby`:              `1`,
			`editoroptions`:         `3`,
			`edittimelimit`:         ``,
			`exchangemincredits`:    `100`,
			`extcredits`:            `{1:{"img":"","title":"威望","unit":"","ratio":0,"showinthread":null,"allowexchangein":null,"allowexchangeout":null},2:{"img":"","title":"金钱","unit":"","ratio":0,"showinthread":null,"allowexchangein":null,"allowexchangeout":null},3:{"img":"","title":"贡献","unit":"","ratio":0,"showinthread":null,"allowexchangein":null,"allowexchangeout":null}}`,
			`fastpost`:              `1`,
			`forumallowside`:        `0`,
			`fastsmilies`:           `1`,
			`feedday`:               `7`,
			`feedhotday`:            `2`,
			`feedhotmin`:            `3`,
			`feedhotnum`:            `3`,
			`feedmaxnum`:            `100`,
			`showallfriendnum`:      `8`,
			`feedtargetblank`:       `1`,
			`floodctrl`:             `15`,
			`forumdomains`:          `a:0:{}`,
			`forumjump`:             `0`,
			`forumlinkstatus`:       `1`,
			`forumseparator`:        `1`,
			`frameon`:               `0`,
			`framewidth`:            `180`,
			`friendgroupnum`:        `8`,
			`ftp`:                   `a:10:{s:2:"on";s:1:"0";s:3:"ssl";s:1:"0";s:4:"host";s:0:"";s:4:"port";s:2:"21";s:8:"username";s:0:"";s:8:"password";s:0:"";s:9:"attachdir";s:1:".";s:9:"attachurl";s:0:"";s:7:"hideurl";s:1:"0";s:7:"timeout";s:1:"0";}`,
			`globalstick`:           `1`,
			`targetblank`:           `0`,
			`google`:                `1`,
			`groupstatus`:           `0`,
			`portalstatus`:          `1`,
			`followstatus`:          `0`,
			`collectionstatus`:      `0`,
			`guidestatus`:           `0`,
			`feedstatus`:            `0`,
			`blogstatus`:            `0`,
			`doingstatus`:           `0`,
			`albumstatus`:           `0`,
			`sharestatus`:           `0`,
			`wallstatus`:            `0`,
			`rankliststatus`:        `0`,
			`homestyle`:             `0`,
			`homepagestyle`:         `0`,
			`group_allowfeed`:       `1`,
			`group_admingroupids`:   `a:1:{i:1;s:1:"1";}`,
			`group_imgsizelimit`:    `512`,
			`group_userperm`:        `a:21:{s:16:"allowstickthread";s:1:"1";s:15:"allowbumpthread";s:1:"1";s:20:"allowhighlightthread";s:1:"1";s:16:"allowstampthread";s:1:"1";s:16:"allowclosethread";s:1:"1";s:16:"allowmergethread";s:1:"1";s:16:"allowsplitthread";s:1:"1";s:17:"allowrepairthread";s:1:"1";s:11:"allowrefund";s:1:"1";s:13:"alloweditpoll";s:1:"1";s:17:"allowremovereward";s:1:"1";s:17:"alloweditactivity";s:1:"1";s:14:"allowedittrade";s:1:"1";s:17:"allowdigestthread";s:1:"3";s:13:"alloweditpost";s:1:"1";s:13:"allowwarnpost";s:1:"1";s:12:"allowbanpost";s:1:"1";s:12:"allowdelpost";s:1:"1";s:13:"allowupbanner";s:1:"1";s:15:"disablepostctrl";s:1:"0";s:11:"allowviewip";s:1:"1";s:15:"allowlivethread";s:1:"1";}`,
			`heatthread_period`:     `15`,
			`heatthread_iconlevels`: `50,100,200`,
			`guide_hotdt`:           "604800",
			`guide_digestdt`:        "604800",
			`hideprivate`:           `1`,
			`historyposts`: `0	7`,
			`hottopic`:           `10`,
			`icp`:                ``,
			`imageimpath`:        ``,
			`imagelib`:           `0`,
			`imagemaxwidth`:      `600`,
			`watermarkminheight`: `a:3:{s:6:"portal";s:1:"0";s:5:"forum";s:1:"0";s:5:"album";s:1:"0";}`,
			`watermarkminwidth`:  `a:3:{s:6:"portal";s:1:"0";s:5:"forum";s:1:"0";s:5:"album";s:1:"0";}`,
			`watermarkquality`:   `a:3:{s:6:"portal";s:2:"90";s:5:"forum";i:90;s:5:"album";i:90;}`,
			`watermarkstatus`:    `a:3:{s:6:"portal";s:1:"0";s:5:"forum";s:1:"0";s:5:"album";s:1:"0";}`,
			`watermarktext`:      `a:12:{s:4:"text";a:3:{s:6:"portal";s:0:"";s:5:"forum";s:0:"";s:5:"album";s:0:"";}s:8:"fontpath";a:3:{s:6:"portal";s:21:"FetteSteinschrift.ttf";s:5:"forum";s:21:"FetteSteinschrift.ttf";s:5:"album";s:21:"FetteSteinschrift.ttf";}s:4:"size";a:3:{s:6:"portal";s:0:"";s:5:"forum";s:0:"";s:5:"album";s:0:"";}s:5:"angle";a:3:{s:6:"portal";s:0:"";s:5:"forum";s:0:"";s:5:"album";s:0:"";}s:5:"color";a:3:{s:6:"portal";s:0:"";s:5:"forum";s:0:"";s:5:"album";s:0:"";}s:7:"shadowx";a:3:{s:6:"portal";s:0:"";s:5:"forum";s:0:"";s:5:"album";s:0:"";}s:7:"shadowy";a:3:{s:6:"portal";s:0:"";s:5:"forum";s:0:"";s:5:"album";s:0:"";}s:11:"shadowcolor";a:3:{s:6:"portal";s:0:"";s:5:"forum";s:0:"";s:5:"album";s:0:"";}s:10:"translatex";a:3:{s:6:"portal";s:0:"";s:5:"forum";s:0:"";s:5:"album";s:0:"";}s:10:"translatey";a:3:{s:6:"portal";s:0:"";s:5:"forum";s:0:"";s:5:"album";s:0:"";}s:5:"skewx";a:3:{s:6:"portal";s:0:"";s:5:"forum";s:0:"";s:5:"album";s:0:"";}s:5:"skewy";a:3:{s:6:"portal";s:0:"";s:5:"forum";s:0:"";s:5:"album";s:0:"";}}`,
			`watermarktrans`:     `a:3:{s:6:"portal";s:2:"50";s:5:"forum";i:50;s:5:"album";i:50;}`,
			`watermarktype`:      `a:3:{s:6:"portal";s:3:"png";s:5:"forum";s:3:"png";s:5:"album";s:3:"png";}`,
			`indexhot`:           `a:7:{s:6:"status";s:1:"0";s:5:"limit";s:2:"10";s:4:"days";s:1:"7";s:10:"expiration";s:3:"900";s:10:"messagecut";s:3:"200";s:5:"width";i:100;s:6:"height";i:70;}`,
			`indextype`:          `classics`,
			`infosidestatus`:     `0`,
			`initcredits`:        `0,0,0,0,0,0,0,0,0`,
			`inviteconfig`:       ``,
			`ipaccess`:           ``,
			`ipregctrl`:          ``,
			`ipverifywhite`:      ``,
			`jscachelife`:        `1800`,
			`jsdateformat`:       ``,
			`jspath`:             `static/js/`,
			`jsrefdomains`:       ``,
			`jsstatus`:           `0`,
			`jswizard`:           ``,
			`karmaratelimit`:     `0`,
			`losslessdel`:        `365`,
			`magicdiscount`:      `85`,
			`magicmarket`:        `1`,
			`magicstatus`:        `1`,
			`mail`:               `a:10:{s:8:"mailsend";s:1:"1";s:6:"server";s:13:"smtp.21cn.com";s:4:"port";s:2:"25";s:4:"auth";s:1:"1";s:4:"from";s:26:"Discuz <username@21cn.com>";s:13:"auth_username";s:17:"username@21cn.com";s:13:"auth_password";s:8:"password";s:13:"maildelimiter";s:1:"0";s:12:"mailusername";s:1:"1";s:15:"sendmail_silent";s:1:"1";}`,
			`maxavatarpixel`:     `120`,
			`maxavatarsize`:      `20000`,
			`maxbdays`:           `0`,
			`maxchargespan`:      `0`,
			`maxfavorites`:       `100`,
			`maxincperthread`:    `0`,
			`maxmagicprice`:      `50`,
			`maxmodworksmonths`:  `3`,
			`maxonlinelist`:      `0`,
			`maxonlines`:         `5000`,
			`maxpage`:            `100`,
			`maxpolloptions`:     `20`,
			`maxpostsize`:        `10000`,
			`maxsigrows`:         `100`,
			`maxsmilies`:         `10`,
			`membermaxpages`:     `100`,
			`memberperpage`:      `25`,
			`memliststatus`:      `1`,
			`memory`:             `a:16:{s:13:"common_member";i:0;s:19:"common_member_count";i:0;s:20:"common_member_status";i:0;s:21:"common_member_profile";i:0;s:24:"common_member_field_home";i:0;s:25:"common_member_field_forum";i:0;s:20:"common_member_verify";i:0;s:12:"forum_thread";i:172800;s:25:"forum_thread_forumdisplay";i:300;s:23:"forum_collectionrelated";i:0;s:15:"forum_postcache";i:300;s:16:"forum_collection";i:300;s:11:"home_follow";i:86400;s:10:"forumindex";i:30;s:8:"diyblock";i:300;s:14:"diyblockoutput";i:30;}`,
			`minpostsize`:        `10`,
			`minpostsize_mobile`: `0`,
			`mobile`:             `a:10:{s:11:"allowmobile";i:0;s:13:"mobileforward";i:1;s:14:"mobileregister";i:0;s:13:"mobilecharset";s:5:"utf-8";s:16:"mobilesimpletype";i:0;s:18:"mobiletopicperpage";i:10;s:17:"mobilepostperpage";i:5;s:15:"mobilecachetime";i:0;s:15:"mobileforumview";i:0;s:13:"mobilepreview";i:1;}`,
			`moddisplay`:         `flat`,
			`modratelimit`:       `0`,
			`modreasons`:         "广告/SPAM\r\n恶意灌水\r\n违规内容\r\n文不对题\r\n重复发帖\r\n我很赞同\r\n精品文章\r\n原创内容",
			`userreasons`:        "很给力!\r\n神马都是浮云\r\n赞一个!\r\n山寨\r\n淡定",
			`modworkstatus`:      `1`,
			`msgforward`:         `a:3:{s:11:"refreshtime";i:2;s:5:"quick";i:1;s:8:"messages";a:14:{i:0;s:19:"thread_poll_succeed";i:1;s:19:"thread_rate_succeed";i:2;s:23:"usergroups_join_succeed";i:3;s:23:"usergroups_exit_succeed";i:4;s:25:"usergroups_update_succeed";i:5;s:20:"buddy_update_succeed";i:6;s:17:"post_edit_succeed";i:7;s:18:"post_reply_succeed";i:8;s:24:"post_edit_delete_succeed";i:9;s:22:"post_newthread_succeed";i:10;s:13:"admin_succeed";i:11;s:17:"pm_delete_succeed";i:12;s:15:"search_redirect";i:13;s:10:"do_success";}}`,
			`msn`:                ``,
			`networkpage`:        `0`,
			`newbiespan`:         `2`,
			`newbietasks`:        ``,
			`newbietaskupdate`:   ``,
			`newsletter`:         ``,
			`newspaceavatar`:     `0`,
			`nocacheheaders`:     `0`,
			`oltimespan`:         `10`,
			`onlinehold`:         `15`,
			`onlinerecord`: `1	1563187173`,
			`pollforumid`:           `0`,
			`postbanperiods`:        ``,
			`postmodperiods`:        ``,
			`postno`:                `#`,
			`postnocustom`:          `a:4:{i:0;s:6:"楼主";i:1;s:6:"沙发";i:2;s:6:"板凳";i:3;s:6:"地板";}`,
			`postperpage`:           `10`,
			`privacy`:               `a:2:{s:4:"view";a:8:{s:5:"index";i:0;s:6:"friend";i:0;s:4:"wall";i:0;s:4:"home";i:0;s:5:"doing";i:0;s:4:"blog";i:0;s:5:"album";i:0;s:5:"share";i:0;}s:4:"feed";a:5:{s:5:"doing";i:1;s:4:"blog";i:1;s:6:"upload";i:1;s:4:"poll";i:1;s:9:"newthread";i:1;}}`,
			`pvfrequence`:           `60`,
			`pwdsafety`:             `0`,
			`pwlength`:              `6`,
			`qihoo`:                 `a:9:{s:6:"status";i:0;s:9:"searchbox";i:6;s:7:"summary";i:1;s:6:"jammer";i:1;s:9:"maxtopics";i:10;s:8:"keywords";s:0:"";s:10:"adminemail";s:0:"";s:8:"validity";i:1;s:14:"relatedthreads";a:6:{s:6:"bbsnum";i:0;s:6:"webnum";i:0;s:4:"type";a:3:{s:4:"blog";s:4:"blog";s:4:"news";s:4:"news";s:3:"bbs";s:3:"bbs";}s:6:"banurl";s:0:"";s:8:"position";i:1;s:8:"validity";i:1;}}`,
			`ratelogon`:             `1`,
			`ratelogrecord`:         `20`,
			`relatenum`:             `10`,
			`relatetime`:            `60`,
			`realname`:              `0`,
			`recommendthread`:       `{"status":1,"iconlevels":[50,100,200],"addtext":"支持","subtracttext":"反对","daycount":0,"ownthread":0}`,
			`heatthread_guidelimit`: "3",
			`regclosemessage`:       ``,
			`regctrl`:               `0`,
			`strongpw`:              `0`,
			`regfloodctrl`:          `0`,
			`regname`:               `register`,
			`reglinkname`:           `立即注册`,
			`regstatus`:             `1`,
			`regverify`:             `0`,
			`relatedtag`:            ``,
			`report_reward`:         `a:2:{s:3:"min";i:-3;s:3:"max";i:3;}`,
			`rewardforumid`:         `0`,
			`rewritecompatible`:     ``,
			`rewritestatus`:         `0`,
			`rssstatus`:             `1`,
			`rssttl`:                `60`,
			`runwizard`:             `1`,
			`search`:                `a:6:{s:6:"portal";a:4:{s:6:"status";i:1;s:10:"searchctrl";i:10;s:6:"maxspm";i:10;s:16:"maxsearchresults";i:500;}s:5:"forum";a:4:{s:6:"status";i:1;s:10:"searchctrl";i:10;s:6:"maxspm";i:10;s:16:"maxsearchresults";i:500;}s:4:"blog";a:4:{s:6:"status";i:1;s:10:"searchctrl";i:10;s:6:"maxspm";i:10;s:16:"maxsearchresults";i:500;}s:5:"album";a:4:{s:6:"status";i:1;s:10:"searchctrl";i:10;s:6:"maxspm";i:10;s:16:"maxsearchresults";i:500;}s:5:"group";a:4:{s:6:"status";i:1;s:10:"searchctrl";i:10;s:6:"maxspm";i:10;s:16:"maxsearchresults";i:500;}s:10:"collection";a:4:{s:6:"status";i:1;s:10:"searchctrl";i:10;s:6:"maxspm";i:10;s:16:"maxsearchresults";i:500;}}`,
			`sphinxon`:              ``,
			`sphinxhost`:            ``,
			`sphinxport`:            ``,
			`sphinxsubindex`:        `threads,threads_minute`,
			`sphinxmsgindex`:        `posts,posts_minute`,
			`sphinxmaxquerytime`:    ``,
			`sphinxlimit`:           ``,
			`sphinxrank`:            ``,
			`searchbanperiods`:      ``,
			`seccodedata`:           `a:16:{s:7:"cloudip";s:1:"0";s:4:"rule";a:5:{s:8:"register";a:3:{s:5:"allow";s:1:"1";s:8:"numlimit";s:0:"";s:9:"timelimit";s:2:"60";}s:5:"login";a:7:{s:5:"allow";s:1:"1";s:7:"nolocal";s:1:"0";s:8:"pwsimple";s:1:"0";s:7:"pwerror";s:1:"0";s:8:"outofday";s:0:"";s:8:"numiptry";s:0:"";s:9:"timeiptry";s:2:"60";}s:4:"post";a:5:{s:5:"allow";s:1:"1";s:8:"numlimit";s:0:"";s:9:"timelimit";s:2:"60";s:7:"nplimit";s:0:"";s:7:"vplimit";s:0:"";}s:8:"password";a:1:{s:5:"allow";s:1:"1";}s:4:"card";a:1:{s:5:"allow";s:1:"1";}}s:8:"minposts";s:0:"";s:4:"type";s:1:"0";s:5:"width";i:100;s:6:"height";i:30;s:7:"scatter";s:0:"";s:10:"background";s:1:"0";s:10:"adulterate";s:1:"0";s:3:"ttf";s:1:"0";s:5:"angle";s:1:"0";s:7:"warping";s:1:"0";s:5:"color";s:1:"0";s:4:"size";s:1:"0";s:6:"shadow";s:1:"0";s:8:"animator";s:1:"0";}`,
			`seccodestatus`:         `16`,
			`seclevel`:              `1`,
			`secqaa`:                `{minposts:1,status:0}`,
			`sendmailinterval`:      `5`,
			`seodescription`:        ``,
			`seohead`:               ``,
			`seokeywords`:           ``,
			`seotitle`:              `a:5:{s:6:"portal";s:6:"门户";s:5:"forum";s:6:"论坛";s:5:"group";s:6:"群组";s:4:"home";s:6:"家园";s:7:"userapp";s:6:"应用";}`,
			`showavatars`:           `1`,
			`showemail`:             ``,
			`showimages`:            `1`,
			`shownewuser`:           `0`,
			`showsettings`:          `7`,
			`showsignatures`:        `1`,
			`sigviewcond`:           `0`,
			`sitemessage`:           `a:5:{s:4:"time";s:1:"3";s:8:"register";s:0:"";s:5:"login";s:0:"";s:9:"newthread";s:0:"";s:5:"reply";s:0:"";}`,
			`sitename`:              `Comsenz Inc.`,
			`siteuniqueid`:          `DXTHPSdNdafexRfe`,
			`siteurl`:               `http://www.comsenz.com/`,
			`smcols`:                `8`,
			`smrows`:                `5`,
			`smthumb`:               `20`,
			`spacedata`:             `a:11:{s:9:"cachelife";s:3:"900";s:14:"limitmythreads";s:1:"5";s:14:"limitmyreplies";s:1:"5";s:14:"limitmyrewards";s:1:"5";s:13:"limitmytrades";s:1:"5";s:13:"limitmyvideos";s:1:"0";s:12:"limitmyblogs";s:1:"8";s:14:"limitmyfriends";s:1:"0";s:16:"limitmyfavforums";s:1:"5";s:17:"limitmyfavthreads";s:1:"0";s:10:"textlength";s:3:"300";}`,
			`spacestatus`:           `1`,
			`srchhotkeywords`:       `活动,交友,discuz`,
			`starthreshold`:         `2`,
			`statcode`:              ``,
			`statscachelife`:        `180`,
			`statstatus`:            ``,
			`styleid`:               `2`,
			`styleid1`:              `1`,
			`styleid2`:              `1`,
			`styleid3`:              `1`,
			`stylejump`:             `1`,
			`subforumsindex`:        `0`,
			`tagstatus`:             `1`,
			`taskon`:                `0`,
			`tasktypes`:             `a:3:{s:9:"promotion";a:2:{s:4:"name";s:18:"网站推广任务";s:7:"version";s:3:"1.0";}s:4:"gift";a:2:{s:4:"name";s:15:"红包类任务";s:7:"version";s:3:"1.0";}s:6:"avatar";a:2:{s:4:"name";s:15:"头像类任务";s:7:"version";s:3:"1.0";}}`,
			`threadmaxpages`:        `1000`,
			`threadsticky`:          `全局置顶,分类置顶,本版置顶`,
			`thumbwidth`:            `400`,
			`thumbheight`:           `300`,
			`sourcewidth`:           ``,
			`sourceheight`:          ``,
			`thumbquality`:          `100`,
			`thumbstatus`:           ``,
			`timeformat`:            `H:i`,
			`timeoffset`:            `8`,
			`topcachetime`:          `60`,
			`topicperpage`:          `20`,
			`tradeforumid`:          `0`,
			`transfermincredits`:    `1000`,
			`uc`:                    `a:1:{s:7:"addfeed";i:1;}`,
			`ucactivation`:          `1`,
			`updatestat`:            `1`,
			`userdateformat`:        `Y-n-j,Y/n/j,j-n-Y,j/n/Y`,
			`userstatusby`:          `1`,
			`videophoto`:            `0`,
			`video_allowalbum`:      `0`,
			`video_allowblog`:       `0`,
			`video_allowcomment`:    `0`,
			`video_allowdoing`:      `1`,
			`video_allowfriend`:     `1`,
			`video_allowpoke`:       `1`,
			`video_allowshare`:      `0`,
			`video_allowuserapp`:    `0`,
			`video_allowviewspace`:  `1`,
			`video_allowwall`:       `1`,
			`viewthreadtags`:        `100`,
			`visitbanperiods`:       ``,
			`visitedforums`:         `10`,
			`vtonlinestatus`:        `1`,
			`wapcharset`:            `0`,
			`wapdateformat`:         `n/j`,
			`wapmps`:                `500`,
			`wapppp`:                `5`,
			`wapregister`:           `0`,
			`wapstatus`:             `0`,
			`waptpp`:                `10`,
			`warningexpiration`:     `30`,
			`warninglimit`:          `3`,
			`welcomemsg`:            `1`,
			`welcomemsgtitle`:       `{username}，您好，感谢您的注册，请阅读以下内容。`,
			`welcomemsgtxt`: `尊敬的{username}，您已经注册成为{sitename}的会员，请您在发表言论时，遵守当地法律法规。
如果您有什么疑问可以联系管理员，Email: {adminemail}。


{bbname}
{time}`,
			`whosonlinestatus`:    `3`,
			`whosonline_contract`: `0`,
			`zoomstatus`: `1	600`,
			`my_app_status`:             `0`,
			`my_siteid`:                 ``,
			`my_sitekey`:                ``,
			`my_closecheckupdate`:       ``,
			`my_ip`:                     ``,
			`my_search_data`:            ``,
			`rewardexpiration`:          `30`,
			`stamplistlevel`:            `3`,
			`visitedthreads`:            `0`,
			`navsubhover`:               `0`,
			`showusercard`:              `1`,
			`allowspacedomain`:          `0`,
			`allowgroupdomain`:          `0`,
			`holddomain`:                `www|*blog*|*space*|*bbs*`,
			`domain`:                    `a:5:{s:12:"defaultindex";s:9:"forum.php";s:10:"holddomain";s:18:"www|*blog*|*space*";s:4:"list";a:0:{}s:3:"app";a:5:{s:6:"portal";s:0:"";s:5:"forum";s:0:"";s:5:"group";s:0:"";s:4:"home";s:0:"";s:7:"default";s:0:"";}s:4:"root";a:5:{s:4:"home";s:0:"";s:5:"group";s:0:"";s:5:"forum";s:0:"";s:5:"topic";s:0:"";s:7:"channel";s:0:"";}}`,
			`ranklist`:                  `a:11:{s:6:"status";s:1:"1";s:10:"cache_time";s:1:"1";s:12:"index_select";s:8:"thisweek";s:6:"member";a:3:{s:9:"available";s:1:"1";s:10:"cache_time";s:1:"5";s:8:"show_num";s:2:"20";}s:6:"thread";a:3:{s:9:"available";s:1:"1";s:10:"cache_time";s:1:"5";s:8:"show_num";s:2:"20";}s:4:"blog";a:3:{s:9:"available";s:1:"1";s:10:"cache_time";s:1:"5";s:8:"show_num";s:2:"20";}s:4:"poll";a:3:{s:9:"available";s:1:"1";s:10:"cache_time";s:1:"5";s:8:"show_num";s:2:"20";}s:8:"activity";a:3:{s:9:"available";s:1:"1";s:10:"cache_time";s:1:"5";s:8:"show_num";s:2:"20";}s:7:"picture";a:3:{s:9:"available";s:1:"1";s:10:"cache_time";s:1:"5";s:8:"show_num";s:2:"20";}s:5:"forum";a:3:{s:9:"available";s:1:"1";s:10:"cache_time";s:1:"5";s:8:"show_num";s:2:"20";}s:5:"group";a:3:{s:9:"available";s:1:"1";s:10:"cache_time";s:1:"5";s:8:"show_num";s:2:"20";}}`,
			`fastsmiley`:                `a:1:{i:1;a:16:{i:0;s:1:"1";i:1;s:1:"2";i:2;s:1:"3";i:3;s:1:"4";i:8;s:1:"5";i:9;s:1:"6";i:10;s:1:"7";i:11;s:1:"8";i:12;s:1:"9";i:13;s:2:"10";i:14;s:2:"11";i:15;s:2:"12";i:16;s:2:"13";i:17;s:2:"14";i:18;s:2:"15";i:19;s:2:"16";}}`,
			`outlandverify`:             `0`,
			`allowquickviewprofile`:     `1`,
			`allowmoderatingthread`:     `1`,
			`editperdel`:                `1`,
			`defaultindex`:              `forum.php`,
			`ipregctrltime`:             `72`,
			`verify`:                    `a:8:{i:6;a:6:{s:5:"title";s:12:"实名认证";s:9:"available";s:1:"0";s:8:"showicon";s:1:"0";s:12:"viewrealname";s:1:"0";s:5:"field";a:1:{s:8:"realname";s:8:"realname";}s:4:"icon";b:0;}s:7:"enabled";b:0;i:1;a:1:{s:4:"icon";s:0:"";}i:2;a:1:{s:4:"icon";s:0:"";}i:3;a:1:{s:4:"icon";s:0:"";}i:4;a:1:{s:4:"icon";s:0:"";}i:5;a:1:{s:4:"icon";s:0:"";}i:7;a:5:{s:5:"title";s:12:"视频认证";s:9:"available";s:1:"0";s:8:"showicon";s:1:"0";s:14:"viewvideophoto";s:1:"0";s:4:"icon";s:0:"";}}`,
			`focus`:                     `a:3:{s:5:"title";s:12:"站长推荐";s:4:"data";a:0:{}s:6:"cookie";s:1:"1";}`,
			`robotarchiver`:             `0`,
			`profilegroup`:              `a:5:{s:4:"base";a:4:{s:9:"available";i:1;s:12:"displayorder";i:0;s:5:"title";s:12:"基本资料";s:5:"field";a:17:{s:8:"realname";s:8:"realname";s:6:"gender";s:6:"gender";s:8:"birthday";s:8:"birthday";s:9:"birthcity";s:9:"birthcity";s:10:"residecity";s:10:"residecity";s:10:"residedist";s:10:"residedist";s:15:"affectivestatus";s:15:"affectivestatus";s:10:"lookingfor";s:10:"lookingfor";s:9:"bloodtype";s:9:"bloodtype";s:6:"field1";s:6:"field1";s:6:"field2";s:6:"field2";s:6:"field3";s:6:"field3";s:6:"field4";s:6:"field4";s:6:"field5";s:6:"field5";s:6:"field6";s:6:"field6";s:6:"field7";s:6:"field7";s:6:"field8";s:6:"field8";}}s:7:"contact";a:4:{s:5:"title";s:12:"联系方式";s:9:"available";s:1:"1";s:12:"displayorder";s:1:"1";s:5:"field";a:7:{s:9:"telephone";s:9:"telephone";s:6:"mobile";s:6:"mobile";s:2:"qq";s:2:"qq";s:3:"msn";s:3:"msn";s:6:"taobao";s:6:"taobao";s:3:"icq";s:3:"icq";s:5:"yahoo";s:5:"yahoo";}}s:3:"edu";a:4:{s:9:"available";i:1;s:12:"displayorder";i:2;s:5:"title";s:12:"教育情况";s:5:"field";a:2:{s:14:"graduateschool";s:14:"graduateschool";s:9:"education";s:9:"education";}}s:4:"work";a:4:{s:9:"available";i:1;s:12:"displayorder";i:3;s:5:"title";s:12:"工作情况";s:5:"field";a:4:{s:7:"company";s:7:"company";s:10:"occupation";s:10:"occupation";s:8:"position";s:8:"position";s:7:"revenue";s:7:"revenue";}}s:4:"info";a:4:{s:5:"title";s:12:"个人信息";s:9:"available";s:1:"1";s:12:"displayorder";s:1:"4";s:5:"field";a:10:{s:10:"idcardtype";s:10:"idcardtype";s:6:"idcard";s:6:"idcard";s:7:"address";s:7:"address";s:7:"zipcode";s:7:"zipcode";s:4:"site";s:4:"site";s:3:"bio";s:3:"bio";s:8:"interest";s:8:"interest";s:7:"sightml";s:7:"sightml";s:12:"customstatus";s:12:"customstatus";s:10:"timeoffset";s:10:"timeoffset";}}}`,
			`onlyacceptfriendpm`:        `0`,
			`pmreportuser`:              `1`,
			`chatpmrefreshtime`:         `8`,
			`preventrefresh`:            `1`,
			`imagelistthumb`:            `0`,
			`regconnect`:                `1`,
			`connect`:                   `a:19:{s:5:"allow";s:1:"1";s:4:"feed";a:2:{s:5:"allow";s:1:"1";s:5:"group";s:1:"0";}s:1:"t";a:2:{s:5:"allow";s:1:"1";s:5:"group";s:1:"0";}s:10:"like_allow";s:1:"1";s:7:"like_qq";s:0:"";s:10:"turl_allow";s:1:"1";s:7:"turl_qq";s:0:"";s:8:"like_url";s:0:"";s:17:"register_birthday";s:1:"0";s:15:"register_gender";s:1:"0";s:17:"register_uinlimit";s:0:"";s:21:"register_rewardcredit";s:1:"1";s:18:"register_addcredit";s:0:"";s:16:"register_groupid";s:1:"0";s:18:"register_regverify";s:1:"1";s:15:"register_invite";s:1:"0";s:10:"newbiespan";s:0:"";s:9:"turl_code";s:0:"";s:13:"mblog_app_key";s:3:"abc";}`,
			`allowwidthauto`:            `0`,
			`switchwidthauto`:           `1`,
			`leftsidewidth`:             `0`,
			`card`:                      `a:1:{s:4:"open";s:1:"0";}`,
			`report_receive`:            `a:2:{s:9:"adminuser";a:1:{i:0;s:1:"1";}s:12:"supmoderator";N;}`,
			`leftsideopen`:              `0`,
			`showexif`:                  `0`,
			`followretainday`:           `7`,
			`newbie`:                    `20`,
			`collectionteamworkernum`:   `3`,
			`collectionnum`:             `10`,
			`blockmaxaggregationitem`:   `20000`,
			`moddetail`:                 `0`,
			`antitheft`:                 `a:2:{s:5:"allow";i:0;s:3:"max";i:200;}`,
			`repliesrank`:               `0`,
			`threadblacklist`:           `1`,
			`threadhotreplies`:          `0`,
			`threadfilternum`:           `10`,
			`hidefilteredpost`:          `0`,
			`forumdisplaythreadpreview`: `1`,
			`nofilteredpost`:            `0`,
			`filterednovote`:            `1`,
			`numbercard`:                `a:1:{s:3:"row";a:3:{i:1;s:7:"threads";i:2;s:5:"posts";i:3;s:7:"credits";}}`,
			`darkroom`:                  `1`,
			`creditspolicymobile`:       `0`,
			`showsignin`:                `1`,
			`showfjump`:                 `1`,
			`grid`:                      `a:8:{s:8:"showgrid";s:1:"0";s:8:"gridtype";s:1:"0";s:8:"textleng";s:2:"30";s:4:"fids";a:1:{i:0;i:0;}s:9:"highlight";s:1:"1";s:11:"targetblank";s:1:"1";s:8:"showtips";s:1:"1";s:9:"cachelife";s:3:"600";}`,
			`showfollowcollection`:      `8`,
			`allowfastreply`:            `0`,
			`notifyusers`:               `a:1:{i:1;a:2:{s:8:"username";s:5:"admin";s:5:"types";s:20:"11111111111111111111";}}`,
			`homestatus`:                `0`,
			`article_tags`:              `a:8:{i:1;s:6:"原创";i:2;s:6:"热点";i:3;s:6:"组图";i:4;s:6:"爆料";i:5;s:6:"头条";i:6;s:6:"幻灯";i:7;s:6:"滚动";i:8;s:6:"推荐";}`,
		}
		Setting.Extcredits = map[int8]*Setting_extcredit{
			1: &Setting_extcredit{Title: "威望"},
			2: &Setting_extcredit{Title: "金钱"},
			3: &Setting_extcredit{Title: "贡献"},
		}
		Setting.Modworkstatus = true
		Setting.Updatestat = true
		Setting.Bbname = "黄瓜乐园"
		Setting.Sitename = "杰骏玩家俱乐部"
		Setting.Adminemail = "admin@admin.com"
		Setting.Siteurl = "http://www.comsenz.com/"
		Setting.Site_qq = ""
		Setting.Allowmoderatingthread = true
		Setting.Topicperpage = 20
		Setting.Recommendthread = &Setting_recommendthread{Status: 1, Iconlevels: []int32{50, 100, 200}, Addtext: "支持", Subtracttext: "反对", Daycount: 0, Ownthread: 0}

		Setting.Creditstransextra = []int8{2, 2, 2, 2, 2, 2, 2}
		Setting.Creditstrans = 2
		Setting.Newbie = 20
		Setting.Hideprivate = true
		Setting.Floodctrl = 15
		Setting.Maxpostsize = 10000
		Setting.Minpostsize = 10
		Setting.Fastpost = true
		Setting.Commentnumber = 5
		Setting.Threadfilternum = 10
		Setting.Sendmailinterval = 1
		Setting.Activitytype = "朋友聚会\r\n出外郊游\r\n自驾出行\r\n公益活动\r\n线上活动"
		Setting.Activitycredit = 1
		Setting.Activitypp = 8
		Setting.Postperpage = 10
		Setting.Activityfield = []*Activityfield{
			&Activityfield{Fieldid: "qq", Title: "QQ"},
			&Activityfield{Fieldid: "mobile", Title: "手机"},
			&Activityfield{Fieldid: "realname", Title: "真实姓名"},
		}
		Setting.Heatthread = &Setting_Heatthread{
			Reply:     5,
			Recommend: 3,
		}
		Setting.Heatthread_iconlevels = []int32{50, 100, 200}
		for _ = range base_cfg {
			//insert = append(insert, &db.Common_setting{Skey: key, Svalue: value})

		}
		insert := []*db.Common_setting{}
		ref := reflect.ValueOf(Setting)
		ref = ref.Elem()
		for i := 0; i < ref.NumField(); i++ {
			field := ref.Field(i)
			value := ""
			switch field.Kind() {
			case reflect.String:
				value = field.String()
			default:
				value = libraries.JsonMarshalToString(field.Interface())
			}
			insert = append(insert, &db.Common_setting{Skey: ref.Type().Field(i).Name, Svalue: value})
		}
		model.Table("Common_setting").InsertAll(insert)

	} else {
		update_setting(model)
	}

}

func (m *Model_Setting) SettingSet(field_name string, value interface{}) error {
	ref := reflect.ValueOf(Setting)
	ref = ref.Elem()
	field := ref.FieldByName(field_name)
	if field.Kind() == reflect.Invalid {
		return errors.New("未找到配置名:" + field_name)
	}
	v := reflect.ValueOf(value)
	if field.Kind() != v.Kind() {
		return errors.New("配置名:" + field_name + "类型不一致,期望类型 " + field.Kind().String() + " ,传入类型 " + v.Kind().String())
	}
	field.Set(v)
	svalue := ""
	switch field.Kind() {
	case reflect.String:
		svalue = field.String()
	default:
		svalue = libraries.JsonMarshalToString(field.Interface())
	}

	m.Table("Common_setting").Where(map[string]interface{}{"Skey": field_name}).Update(map[string]interface{}{"Svalue": svalue})
	m.Table("Common_setting").Where(map[string]interface{}{"Skey": "UpdateTime"}).Update(map[string]interface{}{"Svalue": time.Now().Unix()})
	return nil
}
func (m *Model_Setting) SettingSetEx(value interface{}) error {
	ref := reflect.ValueOf(Setting)
	ref = ref.Elem()
	v := reflect.ValueOf(&value)
	if v.Kind() != reflect.Ptr {
		return errors.New("传入的类型不是ptr")
	}
	v = v.Elem()
	insert := []*db.Common_setting{&db.Common_setting{Skey: "UpdateTime", Svalue: strconv.Itoa(int(time.Now().Unix()))}}
	for i := 0; i < v.NumField(); i++ {
		v_field := v.Field(i)
		field := ref.FieldByName(v.Type().Field(i).Name)
		if field.Kind() == reflect.Invalid {
			return errors.New("未找到配置名:" + v_field.Type().Name())
		}

		if field.Kind() != v_field.Kind() {
			return errors.New("配置名:" + v_field.Type().Name() + "类型不一致,期望类型 " + ref.Kind().String() + " ,传入类型 " + v_field.Kind().String())
		}
		field.Set(v_field)
		svalue := ""
		switch field.Kind() {
		case reflect.String:
			svalue = field.String()
		default:
			svalue = libraries.JsonMarshalToString(field.Interface())
		}
		insert = append(insert, &db.Common_setting{Skey: v.Type().Field(i).Name, Svalue: svalue})
	}
	m.Table("Common_setting").Replace(insert)
	return nil
}
func SettingGetEx(value interface{}) error {
	ref := reflect.ValueOf(value)
	if ref.Kind() != reflect.Ptr {
		return errors.New("传入的类型不是ptr")
	}
	ref = ref.Elem()
	v := reflect.ValueOf(Setting)
	v = v.Elem()

	for i := 0; i < ref.NumField(); i++ {
		v_field := ref.Field(i)
		field := ref.FieldByName(ref.Type().Field(i).Name)
		if field.Kind() == reflect.Invalid {
			return errors.New("未找到配置名:" + v_field.Type().Name())
		}

		if field.Kind() != v_field.Kind() {
			return errors.New("配置名:" + v_field.Type().Name() + "类型不一致,期望类型 " + ref.Kind().String() + " ,传入类型 " + v_field.Kind().String())
		}
		v_field.Set(field)
	}
	return nil
}
func check_setting() {
	var updatetime *db.Common_setting
	model := new(Model)
	err := model.Table("Common_setting").Where(map[string]interface{}{"Skey": "UpdateTime"}).Find(&updatetime)
	if err != nil || updatetime == nil || updatetime.Svalue == "0" || updatetime.Svalue == "" {
		libraries.DEBUG("无法获取setting刷新时间", err, updatetime)
		return
	}
	t, _ := strconv.Atoi(updatetime.Svalue)
	if int64(t) > Setting.UpdateTime {
		update_setting(model)
	}
}
func update_setting(model *Model) {
	var data []*db.Common_setting
	model.Table("Common_setting").Select(&data)
	ref := reflect.ValueOf(Setting)
	ref = ref.Elem()
	for _, setting := range data {
		if field := ref.FieldByName(setting.Skey); field.Kind() != reflect.Invalid {
			switch field.Kind() {
			case reflect.String:
				field.SetString(setting.Svalue)
			default:
				v := reflect.New(field.Type())
				libraries.JsonUnmarshal([]byte(setting.Svalue), v.Interface())
				field.Set(v.Elem())
			}
		}
	}
}

type Activityfield struct {
	Fieldid string
	Title   string
}
type Setting_Heatthread struct {
	Reply     int8 //每次回复增加热度基数
	Recommend int8 //每次评价增加的热度基数

}
type Setting_extcredit struct {
	Img   string
	Title string
	Unit  string
	Ratio float32
}
type Setting_recommendthread struct {
	Status       int8 //功能开启
	Iconlevels   []int32
	Addtext      string //支持文字
	Subtracttext string //反对文字
	Daycount     int    //每日上限 不限制
	Ownthread    int8   //是否允许评价自己的帖子
}

var Setting = new(model_setting)

type model_setting struct {
	UpdateTime          int64 //作为从时强制更新
	Extcredits          map[int8]*Setting_extcredit
	Recommendthread     *Setting_recommendthread
	Creditstransextra   []int8
	Creditstrans        int8 //默认虚拟货币
	Creditspolicymobile int32
	Newbie              int8
	Modworkstatus       bool
	//Welcomemsgtxt       string
	Updatestat            bool
	Bbname                string
	Sitename              string
	Adminemail            string
	Siteurl               string
	Site_qq               string
	Icp                   string
	Hideprivate           bool
	Subforumsindex        int8
	Allowmoderatingthread bool
	Topicperpage          int   //每页展现主题数量
	Groupstatus           bool  //群组功能
	Followstatus          bool  //广播功能
	Albumstatus           bool  //相册功能
	Feedstatus            bool  //动态功能
	Sharestatus           bool  //站内分享功能
	Collectionstatus      bool  //淘帖功能
	Portalstatus          bool  //门户功能
	Floodctrl             int32 //发帖频率限制 秒
	Maxpostsize           int
	Minpostsize           int
	Postperpage           int              //每个帖子里面，每页几个回复
	Fastpost              bool             //快速回复功能
	Alloweditpost         int8             //允许用户随时编辑帖子类型
	Commentnumber         int8             //在帖子中显示点评的条目数
	Allowpostcomment      int8             //点评方式
	Commentpostself       bool             //点评自己的帖子
	Commentfirstpost      bool             //点评楼主贴
	Threadfilternum       int              //水贴字数 暂未对水贴处理
	Hidefilteredpost      bool             //是否隐藏水贴
	Sigviewcond           int              //只有帖子字数大于指定数值后才显示签名，0为不限制
	Sendmailinterval      int32            //邮件发送间隔 分
	Activitytype          string           //本设定将在用户发起活动时显示活动类别，每个类别一行
	Activitycredit        int8             //参与消耗积分的活动时使用的货币类型
	Activityextnum        int8             //用户发起活动时自定义资料项数量，0为不允许自定义资料项
	Activitypp            int8             //用户列表每页显示参与活动的人数
	Activityfield         []*Activityfield //活动发起者可选的必填资料项:
	Heatthread            *Setting_Heatthread
	Heatthread_iconlevels []int32
	Boardlicensed         int8   //显示授权信息，默认0
	Statcode              string //统计代码，无用
}
