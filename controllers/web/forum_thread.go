package web

//抛弃pid概念，由position与tid定位主键，方便mysql管理
import (
	"bbs/config"
	"bbs/controllers/public"
	"bbs/db"
	"bbs/libraries"
	"bbs/models"
	"bbs/protocol"
	"bbs/server"
	"bbs/vaptcha"
	"errors"
	"html"
	"io/ioutil"
	"math"
	"math/rand"
	"reflect"
	"strconv"
	"strings"
	"time"
	"unsafe"

	"github.com/modern-go/reflect2"
	"github.com/rubenfonseca/fastimage"
)

func forum_newthread(data *protocol.MSG_U2WS_forum_newthread, c *server.Context) {

	user := public.Getuserinfo(c)
	if user.Uid == 0 {
		//if thread := models.GetForumThreadCacheByTid(data.Tid); thread != nil {
		//	c.Out_common(protocol.Err_Notlogin, `location.href="/index.html?tpl=forum_viewthread&Tid=`+strconv.Itoa(int(data.Tid))+`"`)
		//} else {
		c.Out_common(protocol.Err_Notlogin, `location.href="/index.html"`)
		//}
		return
	}
	f := models.GetForumByFid(data.Fid)
	if f == nil {
		c.Out_common(protocol.Err_forumId, "")
		return
	}
	parent := models.GetForumByFid(f.Fup)
	if parent == nil {
		c.Out_common(protocol.Err_forumId, "")
		return
	}

	model_forum_thread := &models.Model_Forum_thread{}
	model_forum_thread.Ctx = c
	var thread *db.Forum_thread
	var thread_cache *db.Forum_thread_cache
	var post *db.Forum_post
	if data.Type != config.ThreadOperateTypeNew {
		if thread_cache = models.GetForumThreadCacheByTid(data.Tid); thread_cache == nil {
			c.Out_common(protocol.Err_NotFoundThread, "")
			return
		} else {
			thread = model_forum_thread.GetForumThread(map[string]interface{}{"Tid": data.Tid}, true)
			if thread == nil {
				c.Out_common(protocol.Err_NotFoundThread, "")
				return
			}
		}
		if data.Position > 0 {
			model_forum_post := &models.Model_Forum_post{}
			model_forum_post.Ctx = c
			post = model_forum_post.GetPostInfoByPosition(data.Tid, data.Position)
			if post == nil {
				c.Out_common(protocol.Err_NotFoundPost, "")
				return
			}
		}
	} else {
		for data.Tid > -1 {
			data.Tid = rand.Int31() * -1
		}
	}

	if thread == nil {
		thread = &db.Forum_thread{Special: data.Special}
	}
	if post == nil {
		post = &db.Forum_post{First: true}
	}
	ismoderator := false
	if user.Groupid == 1 {
		ismoderator = true
	} else {
		for _, m := range f.Moderators {
			if user.Uid == m.Uid {
				ismoderator = true
				break
			}
		}
	}
	//权限检查
	if user.Adminid != 1 {

		if !user.Group.Allowpost { /*|| ((len(f.Field.Postperm) > 0 && !libraries.In_slice(user.Groupid, f.Field.Postperm)) && (len(f.Field.Spviewperm) > 0 && !libraries.In_slice(user.Groupid, f.Field.Spviewperm))) {  简化权限*/
			c.Out_common(protocol.Err_Groupperm, "")
			return
		}
	}
	if thread.Closed > db.ThreadCloseOpen && !ismoderator {
		c.Out_common(protocol.Err_threadClosed, "")
		return
	}
	if data.Type == config.ThreadOperateTypeEdit && !checkPostEditPermission(user, f, thread_cache, post, ismoderator) {
		c.Out_common(protocol.Err_Groupperm, "")
		return
	}

	var poll *protocol.MSG_Poll_info
	if thread_cache != nil {
		switch thread_cache.Special {
		case config.ThreadSpecialPoll:
			var code int16
			if poll, code = getThreadPoll(user.Uid, data.Tid, c); code != protocol.Success {
				c.Out_common(code, "")
				return
			}
		}
	}
	user.TokenKey = strconv.Itoa(int(data.Tid)) + "_" + strconv.Itoa(int(data.Position))
	var isorigauthor, isfirstpost bool
	isfirstpost = data.Type == config.ThreadOperateTypeNew
	msg := protocol.Pool_MSG_WS2U_forum_newthread.Get().(*protocol.MSG_WS2U_forum_newthread)
	msg.Parent = protocol.Pool_MSG_forum_idname.Get().(*protocol.MSG_forum_idname)
	msg.Parent.Name = parent.Name
	msg.Parent.Fid = parent.Fid
	msg.Fid = data.Fid
	msg.Name = f.Name
	msg.Poll = poll
	msg.Extcreditstype = models.Setting.Creditstransextra[0]

	msg.Maxprice = 0
	/*if _, ok := models.Setting.Extcredits[models.Setting.Creditstrans]; ok {
		msg.Maxprice = user.Group.Maxprice
	}*/

	msg.Replycredit_rule = nil
	//thread数据
	msg.Subject = thread.Subject
	msg.Special = thread.Special
	msg.Tid = data.Tid
	msg.Typeid = thread.Typeid
	msg.Displayorder = thread.Displayorder
	msg.Status = thread.Status
	msg.Replycredit = thread.Replycredit
	msg.Readperm = thread.Readperm
	msg.Price = thread.Price
	msg.Dateline = thread.Dateline
	if thread_cache != nil {
		msg.Replies = thread_cache.Views.Replies
	} else {
		msg.Replies = 0
	}

	//post数据
	if post.Position > 0 && data.Type == config.ThreadOperateTypeReply {
		msg.Message = "[indent][size=2][color=#999999]" + post.Author + " 发表于 " + libraries.Date("Y-m-d H:i", post.Dateline) + "[/color][/size][/indent]\n" + post.Message
	} else {
		msg.Message, _ = libraries.Preg_replace(`^<i class="pstatus"> 本帖最后由\s[\s\S]+?\s于\s[\s\S]+?\s编辑 <\/i><br>`, "", post.Message)
	}

	isfirstpost = post.First
	isorigauthor = user.Uid == post.Authorid
	var tagname = make([]string, len(post.Tags))
	for k, tag := range post.Tags {
		tagname[k] = tag.Tagname
	}
	msg.Tag = strings.Join(tagname, " ")
	if post.Anonymous {
		msg.Anonymous = 1
	} else {
		msg.Anonymous = 0
	}
	if post.Htmlon {
		msg.Htmlon = 1
	} else {
		msg.Htmlon = 0
	}

	if isfirstpost && isorigauthor && user.Group.Allowreplycredit {
		model_forum_replycredit := &models.Model_Forum_replycredit{}
		model_forum_replycredit.Ctx = c
		if replycredit_rule := model_forum_replycredit.GetForum_replycreditByID(data.Tid); replycredit_rule != nil {
			//if(thread.Replycredit>0) {
			//	replycredit_rule.lasttimes = $thread['replycredit'] / $replycredit_rule['extcredits'];
			//}
			msg.Extcreditstype = replycredit_rule.Extcreditstype
			msg.Replycredit_rule = protocol.Pool_MSG_forum_replycredit.Get().(*protocol.MSG_forum_replycredit)
			msg.Replycredit_rule.Extcredits = replycredit_rule.Extcredits
			msg.Replycredit_rule.Extcreditstype = replycredit_rule.Extcreditstype
			msg.Replycredit_rule.Membertimes = replycredit_rule.Membertimes
			msg.Replycredit_rule.Random = replycredit_rule.Random
			msg.Replycredit_rule.Tid = replycredit_rule.Tid
			msg.Replycredit_rule.Times = replycredit_rule.Times
		}
	}
	//其他数据
	msg.Ismoderator = 0

	if user.Groupid == 1 {
		msg.Ismoderator = 1
	} else {
		for _, m := range f.Moderators {
			if user.Uid == m.Uid {
				msg.Ismoderator = 1
				break
			}
		}
	}
	msg.Userextcredit = 0
	ref_t := reflect.TypeOf(user.Count)
	ref_t = ref_t.Elem()
	if field, ok := ref_t.FieldByName("Extcredits" + strconv.Itoa(int(msg.Extcreditstype))); ok {
		msg.Userextcredit = *((*int32)(unsafe.Pointer(uintptr(reflect2.PtrOf(user.Count)) + field.Offset)))
	}
	//Savethreads []*MSG_forum_savethread
	msg.Threadtypes = models.GetThreadtypesByforum(f, user)
	msg.Attachextensions = user.Group.Attachextensions
	msg.Allowat = user.Group.Allowat

	if (data.Type == config.ThreadOperateTypeNew || data.Type == config.ThreadOperateTypeEdit) && isfirstpost && user.Group.Allowposttag {
		msg.Recent_use_tag = models.Use_tag
	} else {
		msg.Recent_use_tag = nil
	}
	msg.Rush = nil
	if data.Type == config.ThreadOperateTypeEdit && thread.Status>>3&1 == 1 {
		msg.Rush = protocol.Pool_MSG_forum_post_rush.Get().(*protocol.MSG_forum_post_rush)
		msg.Rush.Tid = 0
		err := model_forum_thread.Table("Forum_threadrush").Where(map[string]interface{}{"Tid": data.Tid}).Find(&msg.Rush)
		if err != nil {
			c.Adderr(err, nil)
		}
		if msg.Rush.Tid == 0 {
			msg.Rush.Stopfloor = 0
			msg.Rush.Creditlimit = 0
			msg.Rush.Replylimit = 0
			msg.Rush.Rewardfloor = "0"
			msg.Rush.Starttimefrom = 0
			msg.Rush.Starttimeto = 0
			libraries.Log("出现致命错误，抢楼帖子找不到抢楼信息 Tid%d", data.Tid)
		}
	}
	if models.Setting.Groupstatus {
		model_forum_groupuser := &models.Model_Forum_groupuser{}
		model_forum_groupuser.Ctx = c
		groupids := model_forum_groupuser.GetFidsByUid(user.Uid)
		if len(groupids) > 20 {
			groupids = groupids[:20]
		}
		for _, fid := range groupids {
			_forum := models.GetForumByFid(fid)
			if _forum != nil {
				mygroup := protocol.Pool_MSG_forum_group.Get().(*protocol.MSG_forum_group)
				mygroup.Fid = fid
				mygroup.Name = _forum.Name
				msg.Mygroups = append(msg.Mygroups, mygroup)
			}
		}
	} else {
		msg.Mygroups = msg.Mygroups[:0]
	}
	/*if models.ConfigGetInt("albumstatus") == 1 && user.Group.Allowupload {
		for _, v := range user.Albums {
			if v.Picnum > 0 {
				album := protocol.Pool_MSG_forum_album.Get().(*protocol.MSG_forum_album)
				album.Albumid = v.Albumid
				album.Albumname = v.Albumname
				msg.Albumlist = append(msg.Albumlist, album)
			}
		}
	}*/

	msg.Maxattachsize = user.Group.Maxattachsize
	allowuploadtoday := true
	if user.Group.Maxattachnum > 0 {
		msg.Allowuploadnum = user.Group.Maxattachnum - user.Count.Todayattachs
		if msg.Allowuploadnum <= 0 {
			allowuploadtoday = false
		}
	}
	if user.Group.Maxsizeperday > 0 {
		msg.Allowuploadsize = user.Group.Maxsizeperday - user.Count.Todayattachsize
		if msg.Allowuploadsize <= 0 {
			allowuploadtoday = false
		}
	}

	//allow权限 0位发布投票，1allowposttrade发布商品，2allowpostreward悬赏，3allowpostactivity活动，4辩论,5需要审核（0-5需要论坛与用户双重权限）,6first,,7urloffcheck禁用链接识别,8smileyoffcheck禁用表情,9codeoffcheck禁用编辑器代码,10imgcontentcheck内容生成图片,14allowmediacode多媒体代码(论坛与用户双重权限）,15modnewposts==0不审核,16follow广播功能,17group群组功能,18allowfeed论坛权限&&data.Tid==0 && viewperm为空,19album网站相册功能,,21isorigauthor发帖者,25allowanonymous允许发匿名帖(双重权限),26anonymous帖子匿名,27feed站点动态功能与论坛动态同时成立,28usesig使用签名（要群组权限，修改状态为usesig值）,29firststand选择观点
	msg.Allow = 0
	if f.Allowpostspecial>>0&1 == 1 && user.Group.Allowpostpoll {
		msg.Allow = 1
	}
	if f.Allowpostspecial>>1&1 == 1 && user.Group.Allowposttrade {
		msg.Allow += 1 << 1
	}
	if f.Allowpostspecial>>2&1 == 1 && user.Group.Allowpostreward {
		msg.Allow += 1 << 2
	}
	if f.Allowpostspecial>>3&1 == 1 && user.Group.Allowpostactivity {
		msg.Allow += 1 << 3
	}
	if f.Allowpostspecial>>4&1 == 1 && user.Group.Allowpostdebate {
		msg.Allow += 1 << 4
	}
	if f.Modnewposts > 0 && user.Group.Allowdirectpost < 2 {
		msg.Allow += 1 << 5
	}
	if isfirstpost {
		msg.Allow += 1 << 6
	}
	if post.Parseurloff {
		msg.Allow += 1 << 7
	}
	if post.Smileyoff {
		msg.Allow += 1 << 8
	}
	if post.Bbcodeoff {
		msg.Allow += 1 << 9
	}
	if thread.Status>>15&1 == 1 {
		msg.Allow += 1 << 10
	}
	if f.Allowmediacode && user.Group.Allowmediacode {
		msg.Allow += 1 << 14
	}
	if f.Modnewposts == 0 {
		msg.Allow += 1 << 15
	}
	if models.Setting.Followstatus {
		msg.Allow += 1 << 16
	}
	if models.Setting.Groupstatus {
		msg.Allow += 1 << 17
	}
	if f.Allowfeed && data.Tid == 0 && len(f.Field.Viewperm) == 0 {
		msg.Allow += 1 << 18
	}
	if models.Setting.Albumstatus {
		msg.Allow += 1 << 19
	}

	if isorigauthor {
		msg.Allow += 1 << 21
	}
	if f.Allowbbcode {
		msg.Allow += 1 << 22
	}

	if f.Allowimgcode {
		msg.Allow += 1 << 23
	}
	if f.Allowhtml {
		msg.Allow += 1 << 24
	}
	if f.Allowanonymous && user.Group.Allowanonymous {
		msg.Allow += 1 << 25
	}

	if f.Allowsmilies {
		msg.Allow += 1 << 26
	}
	if post.Anonymous {
		msg.Allow += 1 << 27
	}
	if models.Setting.Feedstatus && f.Allowfeed {
		msg.Allow += 1 << 28
	}
	if user.Group.Maxsigsize > 0 && (post.Position == 0 || post.Usesig) {
		msg.Allow += 1 << 29
	}

	//Group_status权限  //0允许设置附件权限,1allowpostattach允许附件,2allowpostimage图片,3disablepostctrl发表不受限制,4allowhtml允许使用html代码,8Allowat(用户Allowat>0),9allowhidecode用户允许hide标签,10allowdownremoteimg远程图片,11allowbegincode允许使用 [begin] 代码,12allowsetreadperm允许设置帖子权限,13allowreplycredit允许设置回帖奖励,14allowpostrushreply允许发表抢楼帖,15allowposttag允许使用标签,16allowsetpublishdate允许设置定时发布,17allowdirectpost>0不需要审核,18Allowstickthread>0允许置顶,19allowdigestthread>0精华,20allowuploadtoday上传权限,21allowupload空间上传,22Maxsigsize==0
	msg.Group_status = 0
	if user.Group.Allowsetattachperm {
		msg.Group_status = 1
	}
	if user.Group.Allowpostattach {
		msg.Group_status += 1 << 1
	}
	if user.Group.Allowpostimage {
		msg.Group_status += 1 << 2
	}
	if user.Group.Disablepostctrl {
		msg.Group_status += 1 << 3
	}
	if user.Group.Allowhtml {
		msg.Group_status += 1 << 4
	}
	if user.Group.Allowat > 0 {
		msg.Group_status += 1 << 8
	}
	if user.Group.Allowhidecode {
		msg.Group_status += 1 << 9
	}
	if user.Group.Allowdownremoteimg {
		msg.Group_status += 1 << 10
	}
	if user.Group.Allowbegincode {
		msg.Group_status += 1 << 11
	}
	if user.Group.Allowsetreadperm {
		msg.Group_status += 1 << 12
	}
	if user.Group.Allowreplycredit {
		msg.Group_status += 1 << 13
	}
	if user.Group.Allowpostrushreply {
		msg.Group_status += 1 << 14
	}
	if user.Group.Allowposttag {
		msg.Group_status += 1 << 15
	}
	if user.Group.Allowsetpublishdate {
		msg.Group_status += 1 << 16
	}
	if user.Group.Allowdirectpost > 0 {
		msg.Group_status += 1 << 17
	}
	if user.Admin_Group != nil && msg.Ismoderator == 1 {
		if user.Admin_Group.Allowstickthread > 0 {
			msg.Group_status += 1 << 18
		}
		if user.Admin_Group.Allowdigestthread > 0 {
			msg.Group_status += 1 << 19
		}
		if user.Admin_Group.Alloweditpoll {
			msg.Group_status += 1 << 23 //管理员权限
		}
	}
	if allowuploadtoday {
		msg.Group_status += 1 << 20
	}
	if user.Group.Allowupload {
		msg.Group_status += 1 << 21
	}
	if user.Group.Maxsigsize == 0 {
		msg.Group_status += 1 << 22
	}

	//0允许设置附件权限,1allowpostattach允许附件,2allowpostimage图片,3disablepostctrl发表不受限制,4allowhtml允许使用html代码,8Allowat(用户Allowat>0),9allowhidecode用户允许hide标签,10allowdownremoteimg远程图片,11allowbegincode允许使用 [begin] 代码,12allowsetreadperm允许设置帖子权限,13allowreplycredit允许设置回帖奖励,14allowpostrushreply允许发表抢楼帖,15allowposttag允许使用标签,16allowsetpublishdate允许设置定时发布,17allowdirectpost>0不需要审核,18Allowstickthread>0允许置顶,19allowdigestthread>0精华,20allowuploadtoday上传权限,21allowupload空间上传,22Maxsigsize==0
	model_forum_attachment := new(models.Model_forum_attachment)
	model_forum_attachment.Ctx = c
	msg.Attachs = protocol.Pool_MSG_forum_attach.Get().(*protocol.MSG_forum_attach)
	msg.Attachs.Unused = msg.Attachs.Unused[:0]
	msg.Imgattachs = protocol.Pool_MSG_forum_attach.Get().(*protocol.MSG_forum_attach)
	msg.Imgattachs.Unused = msg.Imgattachs.Unused[:0]
	attachlist := model_forum_attachment.GetAttachmentlist(map[string]interface{}{"Uid": user.Uid, "Isused": false})
	for _, attach := range attachlist {
		if attach.Isimage {
			tmp := protocol.Pool_MSG_forum_imgattach.Get().(*protocol.MSG_forum_imgattach)
			tmp.Aid = attach.Aid
			tmp.Dateline = attach.Dateline
			tmp.Filename = attach.Filename
			tmp.Filenametitle = attach.Filetitle
			tmp.Src = attach.Attachment
			msg.Imgattachs.Unused = append(msg.Imgattachs.Unused, tmp)
		} else {
			tmp := protocol.Pool_MSG_forum_imgattach.Get().(*protocol.MSG_forum_imgattach)
			tmp.Aid = attach.Aid
			tmp.Dateline = attach.Dateline
			tmp.Filename = attach.Filename
			tmp.Filenametitle = attach.Filetitle
			tmp.Src = attach.Attachment
			msg.Attachs.Unused = append(msg.Attachs.Unused, tmp)
		}
	}

	if len(post.Aids) > 0 {
		model_attach := &models.Model_forum_attachment{}
		model_attach.Ctx = c
		list := model_attach.GetAttachmentlist(map[string]interface{}{"Aid": post.Aids})
		msg.Imgattachs.Used = make([]*protocol.MSG_forum_imgattach, len(list))
		for k, attach := range list {
			tmp := protocol.Pool_MSG_forum_imgattach.Get().(*protocol.MSG_forum_imgattach)
			tmp.Aid = attach.Aid
			tmp.Dateline = attach.Dateline
			tmp.Filename = attach.Filename
			tmp.Filenametitle = attach.Filetitle
			tmp.Src = attach.Attachment
			msg.Imgattachs.Used[k] = tmp
		}
	} else {
		msg.Imgattachs.Used = msg.Imgattachs.Used[:0]
	}
	c.Output_data(msg)
	msg.Put()
	/*Allow int32
	Group_status int32

	//Stand int8


	Attachs *MSG_forum_attach
	Imgattachs *MSG_forum_attach
	*/
}
func forum_newthread_submit(data *protocol.MSG_U2WS_Forum_newthread_submit, c *server.Context, isSpider bool) (tid int32) {

	user := public.Getuserinfo(c)
	if user.Uid == 0 {
		c.Out_common(protocol.Err_Notlogin, "showWindowEx('quick_login')")
		return
	}
	msg := protocol.Pool_MSG_WS2U_Forum_newthread_submit.Get().(*protocol.MSG_WS2U_Forum_newthread_submit)
	msg.Result = protocol.Err_param
	//检查token的key防止重复提交
	tokenKey := strconv.Itoa(int(data.Tid)) + "_" + strconv.Itoa(int(data.Position))
	if user.TokenKey != "" {
		if user.TokenKey == tokenKey {
			user.TokenKey = " "
		} else {
			//重复提交
			msg.Result = protocol.Err_DuplicateSubmit
			c.Output_data(msg)
			msg.Put()
			return
		}
	} else {
		msg.Result = protocol.Err_TokenTimeout
		c.Output_data(msg)
		msg.Put()
		return
	}

	defer func() {
		if msg.Result == protocol.Success {
			user.TokenKey = ""
		} else {
			user.TokenKey = tokenKey
		}
		c.Output_data(msg)
		msg.Put()
	}()
	//检查type
	switch data.Type {
	case config.ThreadOperateTypeNew:
	case config.ThreadOperateTypeReply:
	case config.ThreadOperateTypeEdit:
	default:
		msg.Result = protocol.Err_NewThreadType
		return
	}
	//检查fid
	f := models.GetForumByFid(data.Fid)
	if f == nil {
		msg.Result = protocol.Err_forumId
		return
	}
	//检查typeid
	typeid_isexist := false
	if len(f.Field.ThreadtypesMsg) > 0 {
		for _, Type := range f.Field.ThreadtypesMsg {
			if Type.Typeid == data.Typeid {
				typeid_isexist = true
				break
			}
		}
	} else {
		data.Typeid = 0
	}
	if f.Field.ThreadtypesSetting.Required && !typeid_isexist && !(data.Type == config.ThreadOperateTypeEdit && data.Position > 1) { //强制分类
		msg.Result = protocol.Err_Typeid
		return
	}
	//检查发帖权限
	var ismoderator bool
	if user.Groupid == 1 {
		ismoderator = true
	} else {
		for _, m := range f.Moderators {
			if user.Uid == m.Uid {
				ismoderator = true
				break
			}
		}
	}

	if data.Type == config.ThreadOperateTypeEdit || data.Type == config.ThreadOperateTypeReply {
		thread_cache := models.GetForumThreadCacheByTid(data.Tid)
		if thread_cache == nil {
			msg.Result = protocol.Err_NotFoundThread
			return
		}
		if thread_cache.Closed > 0 && !ismoderator {
			msg.Result = protocol.Err_threadClosed
			return
		}
		data.Special = thread_cache.Special
		model_post := &models.Model_Forum_post{}
		model_post.Ctx = c
		if data.Type == config.ThreadOperateTypeEdit {
			post := model_post.GetPostInfoByPosition(data.Tid, data.Position)
			if !checkPostEditPermission(user, f, thread_cache, post, ismoderator) {
				msg.Result = protocol.Err_Groupperm
				return
			}
		}

	}
	//检查发帖频率与发言相关
	data.Subject = strings.Trim(data.Subject, " ")
	now := int32(time.Now().Unix())

	if !isSpider && !user.Group.Disablepostctrl { //受到限制的用户组
		if models.Setting.Floodctrl > 0 && user.Count.Lastpost+models.Setting.Floodctrl > now {
			msg.Result = protocol.Err_flood_ctrl
			return
		}
		if user.Group.Maxthreadsperhour > 0 {

			model := &models.Model{}
			model.Ctx = c
			hour, err := model.Table("Common_member_action_log").Where(map[string]interface{}{"Uid": user.Uid, "Action": 0, "Dateline": []interface{}{"egt", now - 3600}}).Count()
			if err != nil {
				c.Adderr(err, map[string]interface{}{"Uid": user.Uid, "Action": 0, "Dateline": []interface{}{"egt", now - 3600}})
			}
			if user.Group.Maxthreadsperhour <= int32(hour) {
				msg.Result = protocol.Err_flood_ctrl_hour

				return
			}

		}
		if data.Special == 0 {
			if models.Setting.Maxpostsize > 0 && len(data.Message) > models.Setting.Maxpostsize {
				msg.Result = protocol.Err_message_toolong
				return
			} else if models.Setting.Minpostsize > 0 && len(data.Message) < models.Setting.Minpostsize {
				msg.Result = protocol.Err_message_tooshort

				return
			}
		}
	}
	if (data.Type == config.ThreadOperateTypeNew || data.Type == config.ThreadOperateTypeEdit && data.Position == 1) && data.Subject == "" {
		msg.Result = protocol.Err_emptyMessage
		return
	}
	if data.Message == "" {
		msg.Result = protocol.Err_emptyMessage
		return
	}
	if !models.CheckShieldingWord(data.Subject) {
		msg.Result = protocol.Err_SubjectShieldingWord

		return
	}
	if !models.CheckShieldingWord(data.Tags) {
		msg.Result = protocol.Err_TagShieldingWord

		return
	}

	data.Message = models.ReplaceShieldingWord(data.Message)
	//检查token
	if !isSpider && data.Type != config.ThreadOperateTypeEdit {
		if tokenKey != "" && !vaptcha.Verify(data.Seccode, c.Conn.IP, tokenKey, vaptcha.ScenePost) {
			msg.Result = protocol.Err_Seccode
			return
		}
	}
	//获取特殊主题信息
	var ext interface{}
	switch data.Special {
	case config.ThreadSpecialCommon: //普通主题
	case config.ThreadSpecialPoll:
		if f.Allowpostspecial>>0&1 == 0 || !user.Group.Allowpostpoll {
			msg.Result = protocol.Err_Special1
			return
		}
		c.Buf.Reset()
		c.Buf.Write(data.Specialext)
		dataExt := protocol.READ_MSG_Poll_info(c.Buf) //消息有误或者没有Specialext，都会走到defer默认err_param错误
		now := time.Now()

		//检查图片是否存在
		var attachsize int32
		if data.Type != config.ThreadOperateTypeReply {
			if len(dataExt.Polloption) < 2 || len(dataExt.Polloption) > 10 {
				msg.Result = protocol.Err_ThreadPolloptionLen
				return
			}
			var imginfo []struct {
				attach *db.Forum_attachment
				data   []byte
				aid    int64
			}

			for _, option := range dataExt.Polloption {

				if option.Aid < 0 {
					if imgdata, err := ioutil.ReadFile("./temp/" + strconv.Itoa(int(user.Uid)) + "_" + strconv.Itoa(int(option.Aid)) + ".tmp"); err != nil {
						msg.Result = protocol.Err_ThreadPollImg
						return
					} else {
						buf := uploadbufpool.Get().(*libraries.MsgBuffer)
						buf.Reset()
						defer uploadbufpool.Put(buf)
						buf.Write(imgdata)
						imagetype, size, err := fastimage.DetectImageTypeFromReader(buf)
						if err != nil {
							msg.Result = protocol.Err_ThreadPollImg
							return
						}
						attachsize += int32(len(imgdata))
						var ext string
						switch imagetype {
						case fastimage.BMP:
							ext = "bmp"
						case fastimage.GIF:
							ext = "gif"
						case fastimage.JPEG:
							ext = "jpg"
						case fastimage.PNG:
							ext = "png"
						default:

						}
						filename := getImgFilename(c, user, ext)

						f := strings.Replace(filename, "./static", "", 1)
						insert := &db.Forum_attachment{
							Uid:        user.Uid,
							Dateline:   int32(now.Unix()),
							Filename:   filename,
							Filesize:   int32(len(imgdata)),
							Attachment: f,
							Isimage:    true,
							Width:      int16(size.Width),
						}
						imginfo = append(imginfo, struct {
							attach *db.Forum_attachment
							data   []byte
							aid    int64
						}{attach: insert, data: imgdata, aid: option.Aid})
					}

				}
			}
			if attachsize > 0 && len(imginfo) > 0 {
				if user.Group.Maxsizeperday > 0 {
					if user.Group.Maxsizeperday-user.Count.Todayattachsize-attachsize <= 0 {
						msg.Result = protocol.Err_NotEnoughAttachsize
						return
					}
				}
				model_attach := &models.Model_forum_attachment{}
				model_attach.Ctx = c
				model_attach.BeginTransaction()
				defer model_attach.EndTransaction()
				model_attach.Ctx = c
				for _, img := range imginfo {
					for _, option := range dataExt.Polloption {
						if option.Aid == img.aid {
							if config.Server.OssEndpoint != "" {
								img.attach.Attachment = config.Server.OSSUrl + img.attach.Attachment
							}

							aid := model_attach.Add(img.attach)
							if aid == 0 {
								model_attach.Rollback()
								c.Out_common(protocol.Err_db, "")
								return
							}

							option.Aid = aid
							if code, err := models.SaveUpload("", img.attach.Filename, img.data, false); code != protocol.Success || err != nil {
								msg.Result = code
								model_attach.Rollback()
								libraries.DEBUG(err, c)
								c.Adderr(err, nil)
								return
							}
							model_attach.Commit()
						}
					}
				}
			}

			ext = dataExt
		}
	/*case config.ThreadSpecialTrade:
		if f.Allowpostspecial>>1&1 == 0 || !user.Group.Allowposttrade {
			msg.Result = protocol.Err_Special2
			c.Output_data(msg)
			msg.Put()
			return
		}
	case config.ThreadSpecialReward:
		if f.Allowpostspecial>>2&1 == 0 || !user.Group.Allowpostreward {
			msg.Result = protocol.Err_Special3
			c.Output_data(msg)
			msg.Put()
			return
		}
	case config.ThreadSpecialActivity:
		if f.Allowpostspecial>>3&1 == 0 || !user.Group.Allowpostactivity {
			msg.Result = protocol.Err_Special4
			c.Output_data(msg)
			msg.Put()
			return
		}
	case config.ThreadSpecialDebate:
		if f.Allowpostspecial>>4&1 == 0 || !user.Group.Allowpostdebate {
			msg.Result = protocol.Err_Special5
			c.Output_data(msg)
			msg.Put()
			return
		}*/
	default:
		msg.Result = protocol.Err_Groupperm

		return
	}

	//群组
	/*if(_GET["mygroupid"]) {
		mygroupid = explode("__", _GET["mygroupid"])
		mygid = intval(mygroupid[0])
		if(mygid) {
			mygname = mygroupid[1]
			if(count(mygroupid) > 2) {
				unset(mygroupid[0])
				mygname = implode("__", mygroupid)
			}
			message .= "[groupid=".intval(mygid)."]".mygname."[/groupid]"
			C::t("forum_forum")->update_commoncredits(intval(mygroupid[0]))
		}
	}*/
	if data.Readperm > 255 {
		data.Readperm = 255
	}

	params := &models.Param_newthread{
		Subject:           html.EscapeString(data.Subject),
		Message:           html.EscapeString(data.Message),
		Typeid:            data.Typeid,
		Sortid:            0,
		Special:           data.Special,
		Ordertype:         data.Other>>2&1 == 1,
		Hiddenreplies:     data.Other>>1&1 == 1,
		Allownoticeauthor: data.Other>>3&1 == 1,
		Tags:              html.EscapeString(data.Tags),
		Bbcodeoff:         !f.Allowbbcode || data.Other>>10&1 == 1,
		Smileyoff:         data.Other>>9&1 == 1,
		Usesig:            data.Other>>5&1 == 1,
		Htmlon:            data.Other>>6&1 == 1,
		Parseurloff:       data.Other>>8&1 == 1,
		Adddynamic:        data.Other>>14&1 == 1,
		Tid:               data.Tid,
		Position:          data.Position,
		Type:              data.Type,
		Aids:              data.Aids,
		Ext:               ext,
	}

	if f.Allowanonymous && user.Group.Allowanonymous {
		params.Isanonymous = data.Other>>0&1 == 1
	}

	if data.Type == config.ThreadOperateTypeNew {
		params.Position = 1
		params.Save = data.Other>>13&1 == 1
		if user.Admin_Group != nil && ismoderator {
			if user.Admin_Group.Allowstickthread > 0 {
				params.Sticktopic = data.Other>>11&1 == 1
			}
			if user.Admin_Group.Allowdigestthread > 0 {
				params.Digest = data.Other>>12&1 == 1
			}
		}
	}

	if user.Group.Allowsetreadperm {
		params.Readperm = data.Readperm
	}
	model_thread := &models.Model_Forum_thread{}
	model_thread.Ctx = c
	old_Extcredits := map[int8]int32{}
	old_Extcredits[1] = user.Count.Extcredits1
	old_Extcredits[2] = user.Count.Extcredits2
	old_Extcredits[3] = user.Count.Extcredits3
	/*old_Extcredits[4] = user.Count.Extcredits4
	old_Extcredits[5] = user.Count.Extcredits5
	old_Extcredits[6] = user.Count.Extcredits6
	old_Extcredits[7] = user.Count.Extcredits7
	old_Extcredits[8] = user.Count.Extcredits8*/
	code := model_thread.Newthread(f, params, user.Uid)
	if code != protocol.Success {
		msg.Result = code

		return
	}

	msg.Result = protocol.Success
	tid = params.Tid
	msg.Tid = params.Tid
	msg.Extcredits = msg.Extcredits[:0]
	if value := user.Count.Extcredits1 - old_Extcredits[1]; value != 0 {
		extcredit := protocol.Pool_MSG_add_extcredits.Get().(*protocol.MSG_add_extcredits)
		extcredit.Id = 1
		extcredit.Value = value
		msg.Extcredits = append(msg.Extcredits, extcredit)
	}
	if value := user.Count.Extcredits2 - old_Extcredits[2]; value != 0 {
		extcredit := protocol.Pool_MSG_add_extcredits.Get().(*protocol.MSG_add_extcredits)
		extcredit.Id = 2
		extcredit.Value = value
		msg.Extcredits = append(msg.Extcredits, extcredit)
	}
	if value := user.Count.Extcredits3 - old_Extcredits[3]; value != 0 {
		extcredit := protocol.Pool_MSG_add_extcredits.Get().(*protocol.MSG_add_extcredits)
		extcredit.Id = 3
		extcredit.Value = value
		msg.Extcredits = append(msg.Extcredits, extcredit)
	}

	if !params.Modnewthreads && data.Other>>4&1 == 1 {
		//model_thread.Feed()
	}
	/*if value := user.Count.Extcredits4 - old_Extcredits[4]; value != 0 {
		extcredit := protocol.Pool_MSG_add_extcredits.Get().(*protocol.MSG_add_extcredits)
		extcredit.Id = 4
		extcredit.Value = value
		msg.Extcredits = append(msg.Extcredits, extcredit)
	}
	if value := user.Count.Extcredits5 - old_Extcredits[5]; value != 0 {
		extcredit := protocol.Pool_MSG_add_extcredits.Get().(*protocol.MSG_add_extcredits)
		extcredit.Id = 5
		extcredit.Value = value
		msg.Extcredits = append(msg.Extcredits, extcredit)
	}
	if value := user.Count.Extcredits6 - old_Extcredits[6]; value != 0 {
		extcredit := protocol.Pool_MSG_add_extcredits.Get().(*protocol.MSG_add_extcredits)
		extcredit.Id = 6
		extcredit.Value = value
		msg.Extcredits = append(msg.Extcredits, extcredit)
	}
	if value := user.Count.Extcredits7 - old_Extcredits[7]; value != 0 {
		extcredit := protocol.Pool_MSG_add_extcredits.Get().(*protocol.MSG_add_extcredits)
		extcredit.Id = 7
		extcredit.Value = value
		msg.Extcredits = append(msg.Extcredits, extcredit)
	}
	if value := user.Count.Extcredits8 - old_Extcredits[8]; value != 0 {
		extcredit := protocol.Pool_MSG_add_extcredits.Get().(*protocol.MSG_add_extcredits)
		extcredit.Id = 8
		extcredit.Value = value
		msg.Extcredits = append(msg.Extcredits, extcredit)
	}*/
	//定时发布
	/*if (_G["group"]["allowsetpublishdate"] && _GET["cronpublish"] && _GET["cronpublishdate"]) {
		publishdate = strtotime(_GET["cronpublishdate"])
		if (publishdate > _G["timestamp"]) {
			_GET["save"] = 1
		} else {
			publishdate = _G["timestamp"]
		}
	} else {
		publishdate = _G["timestamp"]
	}*/

	//params["price"] = _GET["price"]

	/*if(in_array(special, array(1, 2, 3, 4, 5))) { //特殊主题
		specials = array(
			1 => "extend_thread_poll",
			2 => "extend_thread_trade",
			3 => "extend_thread_reward",
			4 => "extend_thread_activity",
			5 => "extend_thread_debate"
		)
		bfmethods[] = array("class" => specials[special], "method" => "before_newthread")
		afmethods[] = array("class" => specials[special], "method" => "after_newthread")

		if(!empty(_GET["addfeed"])) {
			modthread->attach_before_method("feed", array("class" => specials[special], "method" => "before_feed"))
			if(special == 2) {
				modthread->attach_before_method("feed", array("class" => specials[special], "method" => "before_replyfeed"))
			}
		}
	}

	if(special == 1) {


	} elseif(special == 3) {


	} elseif(special == 4) {
	} elseif(special == 5) {


	} elseif(specialextra) {

		@include_once DISCUZ_ROOT."./source/plugin/"._G["setting"]["threadplugins"][specialextra]["module"].".class.php"
		classname = "threadplugin_".specialextra
		if(class_exists(classname) && method_exists(threadpluginclass = new classname, "newthread_submit")) {
			threadpluginclass->newthread_submit(_G["fid"])
		}
		special = 127
		params["special"] = 127
		params["message"] .= chr(0).chr(0).chr(0).specialextra

	}

	//内容生成图片
	if(user.Group.Allowimgcontent){
		params["imgcontent"] = _GET["imgcontent"]
		params["imgcontentwidth"] = _G["setting"]["imgcontentwidth"] ? intval(_G["setting"]["imgcontentwidth"]) : 100
	}

	//未知
	params["geoloc"] = diconv(_GET["geoloc"], "UTF-8")
	//抢楼
	if(_GET["rushreply"]) {
		bfmethods[] = array("class" => "extend_thread_rushreply", "method" => "before_newthread")
		afmethods[] = array("class" => "extend_thread_rushreply", "method" => "after_newthread")
	}

	bfmethods[] = array("class" => "extend_thread_replycredit", "method" => "before_newthread")
	afmethods[] = array("class" => "extend_thread_replycredit", "method" => "after_newthread")

	if(sortid) {
		bfmethods[] = array("class" => "extend_thread_sort", "method" => "before_newthread")
		afmethods[] = array("class" => "extend_thread_sort", "method" => "after_newthread")
	}
	bfmethods[] = array("class" => "extend_thread_allowat", "method" => "before_newthread")
	afmethods[] = array("class" => "extend_thread_allowat", "method" => "after_newthread")
	afmethods[] = array("class" => "extend_thread_image", "method" => "after_newthread")
	*/

	return
}

func forum_viewthread(data *protocol.MSG_U2WS_forum_viewthread, c *server.Context) {

	model_forum_thread := &models.Model_Forum_thread{}
	model_forum_thread.Ctx = c
	model_thread_index := models.Forum_thread_index_Begin() //加个锁避免 更新时影响读写冲突
	defer model_thread_index.End()
	thread_cache := models.GetForumThreadCacheByTid(data.Tid)
	if thread_cache == nil {
		c.Out_common(protocol.Err_NotFoundThread, `location.href="/index.html"`)
		return
	}
	if thread_cache.Redirect > 0 {
		data.Tid = thread_cache.Redirect
		thread_cache = models.GetForumThreadCacheByTid(data.Tid)
		if thread_cache == nil {
			c.Out_common(protocol.Err_NotFoundThread, "")
			return
		}
	}
	user := public.Getuserinfo(c)
	thread := model_forum_thread.GetForumThreadViewByTid(data.Tid, user.Uid)
	if thread == nil {

		c.Out_common(protocol.Err_NotFoundThread, "")
		return
	}
	f := models.GetForumByFid(thread_cache.Fid)
	if f == nil {
		c.Out_common(protocol.Err_forumId, "")
		return
	}
	parent := models.GetForumByFid(f.Fup)
	if parent == nil {
		c.Out_common(protocol.Err_forumId, "")
		return
	}
	model_post := &models.Model_Forum_post{}
	model_post.Ctx = c
	where := map[string]interface{}{
		"Tid": data.Tid,
	}

	order := "First desc,Stick desc"
	if data.Authorid > 0 {
		where["Authorid"] = data.Authorid
		if data.Ordertype == 0 {
			order += ",Position asc"
		} else {
			order += ",Position desc"
		}
	} else {
		if data.Ordertype == 0 {
			order += ",Position asc"
		} else { //倒序
			order += ",Position desc"
		}
	}

	/*if data.Position == -1 {
		count := model_post.GetPostCount(where)
		data.Page = int16(math.Ceil(float64(count) / float64(postperpage)))
	}*/
	if data.Page < 2 {
		data.Page = 1
	}
	page := int(data.Page)
	postperpage := models.Setting.Postperpage
	limit := []int{postperpage * (page - 1), postperpage}

	if len(thread.Sticks) > 0 { //添加置顶帖
		where["Tid"] = []interface{}{"or", []interface{}{"in", thread.Sticks}}
		order += ",Stick desc"

	}
	field := "First,Tags,Authorid,Status,Anonymous,Stick,Author,Invisible,Dateline,Message,Position,Replycredit,Usesig,Stand,Subject,Useip,Aids"
	postlist := model_post.GetPostList(field, where, order, limit, "")

	if data.Position > 0 && (len(postlist) == 0 || data.Position > postlist[len(postlist)-1].Position) {
		c.Out_common(protocol.Err_Position, "")
		return
	}
	if len(postlist) == 0 {
		c.Out_common(protocol.Err_NotFoundThread, "")
		return
	}

	//抢楼数据
	/*var rewardfloors []int32
	if thread.Status>>3&1 == 1 {
		model_rush := &models.Model_forum_threadrush{}
		model_rush.Ctx = c
		rush := model_rush.GetRushByTid(thread.Tid)
		rewardfloors = rush.Rewardfloor
	}*/
	//投票信息
	now := int32(time.Now().Unix())
	var poll *protocol.MSG_Poll_info
	switch thread_cache.Special {
	case config.ThreadSpecialPoll:
		var code int16
		if poll, code = getThreadPoll(user.Uid, data.Tid, c); code != protocol.Success {
			c.Out_common(code, "")
			return
		}

	}

	msg := protocol.Pool_MSG_WS2U_forum_viewthread.Get().(*protocol.MSG_WS2U_forum_viewthread)
	msg.Fid = f.Fid
	msg.Poll = poll
	msg.Parent = protocol.Pool_MSG_forum_idname.Get().(*protocol.MSG_forum_idname)
	msg.Parent.Name = parent.Name
	msg.Parent.Fid = parent.Fid
	//本论坛数据
	msg.Forum = protocol.Pool_MSG_forum_thread_forum.Get().(*protocol.MSG_forum_thread_forum)
	msg.Forum.Ismoderator = 0
	if f.Alloweditpost {
		msg.Forum.Alloweditpost = 1
	} else {
		msg.Forum.Alloweditpost = 0
	}
	if f.Allowspecialonly {
		msg.Forum.Allowspecialonly = 1
	}

	//msg.Forum.Modrecommend = models.GetForumModrecommend(f)
	if f.Field.Picstyle {
		msg.Forum.Picstyle = 1
	}

	msg.Forum.Status = f.Status
	msg.Forum.Threadtypes = models.GetThreadtypesByforum(f, user)

	msg.Name = f.Name
	if user.Uid > 0 {
		if user.Adminid == 1 {
			msg.Forum.Ismoderator = 1
		} else {
			for _, m := range f.Moderators {
				if user.Uid == m.Uid {
					msg.Forum.Ismoderator = 1
					break
				}
			}
		}
		if _, ok := thread_cache.ThreadView.LoadOrStore(user.Uid, true); !ok {
			thread_cache.Views.AddViews()
		}
	} else {
		if _, ok := thread_cache.ThreadView.LoadOrStore(c.Conn.IP, true); !ok {
			thread_cache.Views.AddViews()
		}
	}
	allowpostreply := true
	if msg.Forum.Ismoderator != 1 {
		if !user.Group.Allowreply {
			msg.Reason = "您所在的用户组暂无权限发言"
			allowpostreply = false
		}
		if allowpostreply && (thread.Closed || (!thread.Closed && model_forum_thread.Checkautoclose(f, thread_cache, msg.Forum.Ismoderator == 1))) {
			msg.Reason = "本主题已关闭，不再接受新内容"
			allowpostreply = false
		}
		if len(f.Field.Replyperm) > 0 && !libraries.In_slice(user.Groupid, f.Field.Replyperm) {
			msg.Reason = "您所在的用户组在本论坛暂无权限发言"
			allowpostreply = false
		}
		if user.Forum_access[f.Fid] != nil && user.Forum_access[f.Fid].Allowreply == -1 {
			msg.Reason = "您在本版没有权限进行此操作"
			allowpostreply = false
		}
	}
	msg.Group_status = 0
	if user.Group.Allowpost {
		msg.Group_status = 1
	}
	if user.Group.Allowposttrade && f.Allowpostspecial>>2&1 == 1 {
		msg.Group_status += 1 << 1
	}
	if user.Group.Allowpostpoll && f.Allowpostspecial>>1&1 == 1 {
		msg.Group_status += 1 << 2
	}
	if user.Group.Allowpostreward && f.Allowpostspecial>>3&1 == 1 {
		msg.Group_status += 1 << 3
	}
	if user.Group.Allowpostactivity && f.Allowpostspecial>>4&1 == 1 {
		msg.Group_status += 1 << 4
	}
	if user.Group.Allowpostdebate && f.Allowpostspecial>>5&1 == 1 {
		msg.Group_status += 1 << 5
	}

	if allowpostreply {
		msg.Group_status += 1 << 6
	}
	if user.Group.Disablepostctrl {
		msg.Group_status += 1 << 7
	}
	if user.Group.Allowpostattach {
		msg.Group_status += 1 << 8
	}

	if models.Setting.Fastpost && allowpostreply {
		msg.Group_status += 1 << 9
	} else {

		if !(user.Forum_access[f.Fid] != nil && user.Forum_access[f.Fid].Allowpost == -1) && ((len(f.Field.Postperm) == 0 && user.Group.Allowpost) || (len(f.Field.Postperm) > 0 && libraries.In_slice(user.Groupid, f.Field.Postperm)) || (user.Forum_access[f.Fid] != nil && user.Forum_access[f.Fid].Allowpost == 1)) {
			msg.Group_status += 1 << 10
		}
	}

	if user.Group.Allowat > 0 {
		msg.Group_status += 1 << 11
	}
	if user.Group.Allowsetattachperm {
		msg.Group_status += 1 << 12
	}
	if user.Group.Allowgetimage {
		msg.Group_status += 1 << 13
	}
	if user.GroupFid == f.Fid {
		msg.Group_status += 1 << 14
	}
	if user.Group.Raterange.Allowrate > 0 {
		msg.Group_status += 1 << 15
	}
	if models.Setting.Followstatus {
		msg.Group_status += 1 << 16
	}
	if models.Setting.Sharestatus {
		msg.Group_status += 1 << 17
	}
	if models.Setting.Collectionstatus {
		msg.Group_status += 1 << 18
	}

	if thread.Isadd != "" {
		if thread.Isadd == "1" {
			msg.Group_status += 1 << 19
		} else {
			msg.Group_status += 1 << 20
		}
	}
	if user.Group.Allowvote {
		msg.Group_status += 1 << 21
	}
	//0allowpost,1allowposttrade,2allowpostpoll,3allowpostreward,4allowpostactivity,5allowpostdebate,6allowpostreply,7disablepostctrl,8allowpostattach,9allowfastpost,10allowpost//否等于无权发帖，11allowat,12allowsetattachperm,13allowgetimage,14isgroupuser,15Allowrate,16网站follow,17网站share,18网站collection,19已支持,20已反对,21allowvote,22allwvoteusergroup
	msg.Admin_status = 0
	allowblockrecommend := (user.Admin_Group != nil && user.Admin_Group.Allowdiy) || user.Allowadmincp>>4&1 == 1 || user.Allowadmincp>>5&1 == 1 || user.Allowadmincp>>6&1 == 1
	msg.Allowstickthread = 0
	if user.Admin_Group != nil {
		//0allowbumpthread,1allowstickthread>0,2allowhighlightthread,3allowdigestthread>0,4allowrecommendthread,5allowstampthread,6allowstickreply,7allowdelpost,8allowbanpost,9allowwarnpost,10allowstamplist,11allowclosethread,12allowmovethread,13allowedittypethread,14allowcopythread,15allowmergethread,16allowsplitthread,17allowrepairthread,18allowremovereward,19allowmanagetag,20alloweditusertag,21allowedituser,22allowbanuser,23allowviewip,24alloweditpost,25allowblockrecommend
		if user.Admin_Group.Allowbumpthread {
			msg.Admin_status = 1
		}
		msg.Allowstickthread = user.Admin_Group.Allowstickthread

		if user.Admin_Group.Allowhighlightthread {
			msg.Admin_status += 1 << 2
		}
		if user.Admin_Group.Allowdigestthread > 0 {
			msg.Admin_status += 1 << 3
		}
		if user.Admin_Group.Allowrecommendthread {
			msg.Admin_status += 1 << 4
		}
		if user.Admin_Group.Allowstampthread {
			msg.Admin_status += 1 << 5
		}
		if user.Admin_Group.Allowstickreply {
			msg.Admin_status += 1 << 6
		}
		if user.Admin_Group.Allowdelpost {
			msg.Admin_status += 1 << 7
		}
		if user.Admin_Group.Allowbanpost {
			msg.Admin_status += 1 << 8
		}
		if user.Admin_Group.Allowwarnpost {
			msg.Admin_status += 1 << 9
		}
		if user.Admin_Group.Allowstamplist {
			msg.Admin_status += 1 << 10
		}
		if user.Admin_Group.Allowclosethread {
			msg.Admin_status += 1 << 11
		}
		if user.Admin_Group.Allowmovethread {
			msg.Admin_status += 1 << 12
		}
		if user.Admin_Group.Allowedittypethread {
			msg.Admin_status += 1 << 13
		}
		if user.Admin_Group.Allowcopythread {
			msg.Admin_status += 1 << 14
		}
		if user.Admin_Group.Allowmergethread {
			msg.Admin_status += 1 << 15
		}
		if user.Admin_Group.Allowsplitthread {
			msg.Admin_status += 1 << 16
		}
		if user.Admin_Group.Allowrepairthread {
			msg.Admin_status += 1 << 17
		}
		if user.Admin_Group.Allowremovereward {
			msg.Admin_status += 1 << 18
		}
		if user.Admin_Group.Allowmanagetag {
			msg.Admin_status += 1 << 19
		}
		if user.Admin_Group.Alloweditusertag {
			msg.Admin_status += 1 << 20
		}
		if user.Admin_Group.Allowedituser {
			msg.Admin_status += 1 << 21
		}
		if user.Admin_Group.Allowbanuser {
			msg.Admin_status += 1 << 22
		}
		if user.Admin_Group.Allowviewip {
			msg.Admin_status += 1 << 23
		}
		if user.Admin_Group.Alloweditpost {
			msg.Admin_status += 1 << 24
		}
		//if allowblockrecommend {
		//	msg.Admin_status += 1 << 25
		//}
		/*if user.Admin_Group.Alloweditpost {
			if models.ConfigGetInt("alloweditpost")>>uint8(thread.Special)&1 == 1 {
				msg.Admin_status += 1 << 26
			} else {
				msg.Edittimelimit = user.Group.Edittimelimit * 60
			}
		}*/
	}

	//0allowbumpthread,1allowstickthread>0,2allowhighlightthread,3allowdigestthread>0,4allowrecommendthread,5allowstampthread,6allowstickreply,7allowdelpost,8allowbanpost,9allowwarnpost,10allowstamplist,11allowclosethread,12allowmovethread,13allowedittypethread,14allowcopythread,15allowmergethread,16allowsplitthread,17allowrepairthread,18allowremovereward,19allowmanagetag,20alloweditusertag,21allowedituser,22allowbanuser,23allowviewip,24alloweditpost,25allowblockrecommend,26alloweditpost_status
	msg.Allowrecommend = user.Group.Allowrecommend
	//主题数据
	msg.Thread = protocol.Pool_MSG_forum_thread.Get().(*protocol.MSG_forum_thread)
	msg.Thread.Allreplies = /*thread_cache.Comments +*/ thread_cache.Views.Replies
	msg.Page = model_forum_thread.GetPostPageByCache(thread_cache, data.Authorid)
	msg.Thread.Highlight = thread_cache.Highlight
	msg.Thread.Attachment = thread_cache.Attachment
	msg.Thread.Closed = thread_cache.Closed
	msg.Thread.Dateline = thread_cache.Dateline
	msg.Thread.Digest = thread_cache.Digest
	msg.Thread.Displayorder = thread_cache.Displayorder
	msg.Thread.Fid = thread_cache.Fid
	msg.Thread.Heats = thread_cache.Views.Heats
	msg.Thread.Icon = thread_cache.Icon
	msg.Thread.Isgroup = thread_cache.Isgroup
	msg.Thread.Lastpost = thread_cache.Views.Lastpost
	msg.Thread.Lastposter = thread_cache.Views.Lastposter
	msg.Thread.Readperm = thread_cache.Readperm
	//msg.Thread.Rate = thread_cache.Rate
	msg.Thread.Replycredit = thread_cache.Replycredit
	msg.Thread.Special = thread_cache.Special
	msg.Thread.Status = thread_cache.Status
	msg.Thread.Tid = thread_cache.Tid
	msg.Thread.Typeid = thread_cache.Typeid
	msg.Thread.Authorid = thread_cache.Authorid
	msg.Thread.Author = thread_cache.Author
	msg.Thread.Subject = thread_cache.Subject
	msg.Thread.Cutmessage = thread_cache.Views.CutMessage
	if f.Status != 3 && (thread_cache.Closed > 0 || (f.Autoclose > 0 && thread_cache.Fid == f.Fid && now-thread_cache.Dateline > f.Autoclose)) {
		if msg.Thread.Isgroup == 1 {
			msg.Thread.Folder = "common"
			//$grouptids[] = thread_cache['closed'];
		} else {
			/*if(thread_cache.Closed > 1) {
				thread_cache['moved'] = thread_cache['tid'];
				thread_cache['allreplies'] = thread_cache['replies'] = '-';
				thread_cache['views'] = '-';
			}*/
			msg.Thread.Folder = "lock"
		}
	} else if f.Status == 3 && thread_cache.Closed == 1 {
		msg.Thread.Folder = "lock"
	} else {
		msg.Thread.Folder = "common"

	}
	//msg.Thread.Favtimes = thread.Favtimes
	msg.Thread.Views = thread_cache.Views.Views
	msg.Thread.Recommend_add = thread_cache.Views.Recommend_add
	msg.Thread.Recommend_sub = thread_cache.Views.Recommend_sub
	msg.Thread.Recommends = thread_cache.Views.Recommends
	msg.Thread.Relay = 0
	msg.Thread.Stamp = thread.Stamp
	//if thread.Status>>10&1 == 1 && thread.Forum_threadpreview != nil {
	//	msg.Thread.Relay = thread.Forum_threadpreview.Relay
	//}
	msg.Thread.Replies = thread_cache.Views.Replies
	//msg.Thread.Sharetimes = thread.Sharetimes
	msg.Modmenu = 0
	if thread_cache.Displayorder != -4 {
		allowpostarticle := (user.Admin_Group != nil && user.Admin_Group.Allowmanagearticle) || user.Group.Allowpostarticle || user.Allowadmincp>>2&1 == 1 || user.Allowadmincp>>4&1 == 3
		if msg.Forum.Ismoderator == 1 || allowblockrecommend || (models.Setting.Portalstatus && thread_cache.Special == 0 && /*thread.Pushedaid == 0*/ true) && allowpostarticle {
			msg.Modmenu = 1
		}
		if msg.Forum.Ismoderator == 1 && (user.Admin_Group != nil && (user.Admin_Group.Allowwarnpost || user.Admin_Group.Allowbanpost || user.Admin_Group.Allowdelpost || user.Admin_Group.Allowstickreply)) || /*thread.Pushedaid > 0*/ false && allowpostarticle || thread_cache.Authorid == user.Uid {
			msg.Modmenu += 2
		}
	}

	//回复数据
	msg.Postlist = make([]*protocol.MSG_forum_post, postperpage)
	if user.Admin_Group != nil && user.Admin_Group.Allowmanagetag {
		msg.Recent_use_tag = models.Use_tag
	} else {
		msg.Recent_use_tag = nil
	}
	//批量获取用户
	var ids []int32
post:
	for _, post := range postlist {
		for _, id := range ids {
			if id == post.Authorid {
				continue post
			}
		}
		ids = append(ids, post.Authorid)
	}
	model_member := new(models.Model_member)
	model_member.Ctx = c
	users := model_member.GetMemberInfoByIDS(ids)
	index := 0
	for _, post := range postlist {

		msgpost := getpostmsg(f, thread_cache, post, user, msg.Forum.Ismoderator == 1, c, users)
		/*if libraries.In_slice(post.Position, rewardfloors) {
			msgpost.StatusBool += 1 << 6
		}*/
		msg.Postlist[index] = msgpost
		index++
	}

	msg.Postlist = msg.Postlist[:index]
	var forum_history []int32
	if user.Uid == 0 {
		c.Conn.Session.Get("forum_history", &forum_history)
	} else {
		forum_history = user.Forum_history
	}
	if cap(msg.Forum_history) < len(forum_history) {
		msg.Forum_history = make([]*protocol.MSG_forum_idname, 0, len(forum_history))
	}
	msg.Forum_history = msg.Forum_history[:len(forum_history)]
	var i = 0
	for _, fid := range forum_history {
		if forum := models.GetForumByFid(fid); forum != nil {
			tmp := protocol.Pool_MSG_forum_idname.Get().(*protocol.MSG_forum_idname)
			tmp.Fid = fid
			tmp.Name = forum.Name
			msg.Forum_history[i] = tmp
			i++
		}
	}
	msg.Forum_history = msg.Forum_history[:i]
	c.Output_data(msg)
	msg.Put()
	addhistory(f.Fid, c)
	//分享链接
	if data.Fromuid > 0 {
		if user.Uid == data.Fromuid {
			return
		}
		if !c.Conn.Session.Load_bool("credit_promotion_visit" + strconv.Itoa(int(data.Fromuid))) {
			model_credit := new(models.Model_credit)
			model_credit.Updatecreditbyaction(models.Rule访问推广, data.Fromuid, "", 1, true, f.Fid)
			c.Conn.Session.Set("credit_promotion_visit"+strconv.Itoa(int(data.Fromuid)), true)
		}
	}

}
func getpostmsg(f *db.Forum_forum, thread_cache *db.Forum_thread_cache, post *db.Forum_post, user *db.Common_member, ismoderator bool, c *server.Context, users []*db.Common_member) (msgpost *protocol.MSG_forum_post) {
	msgpost = protocol.Pool_MSG_forum_post.Get().(*protocol.MSG_forum_post)
	msgpost.StatusBool = 0
	msgpost.Tags = msgpost.Tags[:0]
	if post.First {
		msgpost.StatusBool = 1
		msgpost.Tags = make([]string, len(post.Tags))
		for k, v := range post.Tags {
			msgpost.Tags[k] = strconv.Itoa(int(v.Tagid)) + "," + v.Tagname
		}

	}
	if post.Authorid == -1 { //被删除
		msgpost.StatusBool = 1 << 1
		return
	}
	if post.Status>>2&1 == 1 {
		msgpost.StatusBool += 1 << 2
	}
	if post.Anonymous {
		msgpost.StatusBool += 1 << 3
	}
	var post_user *db.Common_member
	for _, user := range users {
		if user.Uid == post.Authorid {
			post_user = user
		}
	}
	if post_user == nil {
		post_user = &db.Common_member{}
	}

	if post_user.Isonline {
		msgpost.StatusBool += 1 << 4
	}
	if post.Stick == 1 {
		msgpost.StatusBool += 1 << 5
	}

	//7attachment未处理
	if models.Setting.Commentnumber > 0 && models.Setting.Allowpostcomment>>1&1 == 1 && (models.Setting.Commentpostself || post.Authorid != user.Uid) &&
		(post.First && models.Setting.Commentfirstpost && post_user.Group.Allowcommentpost>>1 == 1) ||
		(!post.First && post_user.Group.Allowcommentpost>>2 == 1) {
		msgpost.StatusBool += 1 << 8
	}

	if models.Setting.Hidefilteredpost && f.Field.Noforumhidewater == 0 {
		if !post.First && thread_cache.Special == 0 && thread_cache.Status>>3&1 == 0 && thread_cache.Status>>2&1 == 0 && models.Setting.Threadfilternum > 0 && len(post.Subject) < models.Setting.Threadfilternum {
			msgpost.StatusBool += 1 << 9
			msgpost.StatusBool += 1 << 10
		}
	}
	if post.Status>>1&1 == 1 {
		msgpost.StatusBool += 1 << 11
	}
	if !post.Anonymous && post_user.Uid > 0 {
		//msgpost.StatusBool += 1 << 12
	}
	if post.Status>>4&1 == 1 {
		msgpost.StatusBool += 1 << 13
		msgpost.Mobiletype = int8(post.Status >> 10 & 1)
		msgpost.Mobiletype += int8(int(post.Status>>9&1)) << 1
		msgpost.Mobiletype += int8(int(post.Status>>8&1)) << 2
	}

	//0=first,1deleted,2warned,3Anonymous,4isOnline;5isstick;6rewardfloor;7attachment,8Allowcomment,9Iswater,10inblacklist,11status>>1屏蔽,12status>>5未知，13status>>4来自手机
	msgpost.Avatar = post_user.Avatar
	msgpost.Profile = protocol.Pool_MSG_post_member_profile.Get().(*protocol.MSG_post_member_profile)
	msgpost.Profile.Qq = post_user.QQ
	msgpost.Profile.Wx = post_user.Wx
	msgpost.Profile.Site = post_user.Site
	msgpost.Profile.Mobile = post_user.Mobile
	msgpost.Author = post.Author
	msgpost.Authorid = post.Authorid
	msgpost.Adminid = post_user.Adminid
	if post_user.Group != nil {
		msgpost.Groupcolor = post_user.Group.Color
	} else {
		msgpost.Groupcolor = ""
	}

	msgpost.Memberstatus = post_user.Status
	msgpost.Invisible = post.Invisible
	msgpost.Dateline = post.Dateline
	//if post_user.Profile != nil {
	//	msgpost.Gender = post_user.Profile.Gender
	//} else {
	msgpost.Gender = 0
	//}
	msgpost.Groupid = post_user.Groupid
	if post.Status>>1&1 == 1 && !ismoderator {
		msgpost.Message = ""
	} else {
		msgpost.Message = post.Message
	}

	msgpost.Position = post.Position
	msgpost.Replycredit = post.Replycredit
	msgpost.Signature = ""
	if post_user.Field_forum != nil && post.Usesig {
		if models.Setting.Sigviewcond > 0 {
			if len(post.Message) > models.Setting.Sigviewcond {
				msgpost.Signature = post_user.Field_forum.Sightml
			}
		} else {
			msgpost.Signature = post_user.Field_forum.Sightml
		}
	}
	if len(msgpost.Signature) > int(post_user.Group.Maxsigsize) {
		msgpost.Signature = msgpost.Signature[:post_user.Group.Maxsigsize]
	}
	msgpost.Stand = post.Stand
	msgpost.Subject = post.Subject
	msgpost.Useip = ""
	if user.Admin_Group != nil && user.Admin_Group.Allowviewip {
		msgpost.Useip = post.Useip
	}
	msgpost.Username = post_user.Username
	if cache, ok := db.Lastthreadmod.Load(thread_cache.Tid); ok {
		v := cache.(*db.Log_forum_threadmod)
		if v.Dateline > 0 {
			msgpost.Lastmod = protocol.Pool_MSG_threadmod.Get().(*protocol.MSG_threadmod)
			msgpost.Lastmod.Modactiontype = v.Action
			u := models.GetMemberInfoByID(v.Uid)
			if u == nil {
				msgpost.Lastmod.Modusername = "System"
			} else {
				msgpost.Lastmod.Modusername = u.Username
			}
			msgpost.Lastmod.Moddateline = int32(v.Dateline)
			msgpost.Lastmod.Reason = v.Reason
			msgpost.Lastmod.Stamp = v.Param
		}
	}
	msgpost.Grouptitle = post_user.Group.Grouptitle
	if post_user.Count == nil {
		libraries.DEBUG("有诈")
	}
	msgpost.Threadnum = post_user.Count.Threads
	msgpost.Digestnum = post_user.Count.Digestposts
	msgpost.Extcredits1 = post_user.Count.Extcredits1
	msgpost.Extcredits2 = post_user.Count.Extcredits2
	msgpost.Extcredits3 = post_user.Count.Extcredits3
	msgpost.Number = post.Position
	//msgpost.Postreview = protocol.Pool_MSG_postreview.Get().(*protocol.MSG_postreview)
	//msgpost.Postreview.Support = post.Postreview.Support
	//msgpost.Postreview.Against = post.Postreview.Against
	if len(post.Aids) > 0 {
		model_attach := &models.Model_forum_attachment{}
		model_attach.Ctx = c
		list := model_attach.GetAttachmentlist(map[string]interface{}{"Aid": post.Aids})
		msgpost.Imagelist = make([]*protocol.MSG_forum_imgattach, len(list))
		for k, attach := range list {
			tmp := protocol.Pool_MSG_forum_imgattach.Get().(*protocol.MSG_forum_imgattach)
			tmp.Aid = attach.Aid
			tmp.Dateline = attach.Dateline
			tmp.Filename = attach.Filename
			tmp.Filenametitle = attach.Filetitle
			tmp.Src = attach.Attachment
			msgpost.Imagelist[k] = tmp
		}
	} else {
		msgpost.Imagelist = msgpost.Imagelist[:0]
	}
	/*
		string	header;
		string	footer;
		int8	imagelistcount;
		int8	number;
		vector<post_ratelog>		ratelog;
		vector<post_ratelog_score>  ratelogextcredits;
		post_relateitem 			relateitem;
		vector<string>	tags;
		int32	voters;

		post_comment comments;
		int16	totalcomment;
		int16	commentcount;
		int16	totalrate;
		string	location;
		vector<string>	attachlist;
		vector<string>	imagelist;
		int32	releatcollectionnum;*/
	return msgpost
}
func checkPostEditPermission(user *db.Common_member, f *db.Forum_forum, thread *db.Forum_thread_cache, post *db.Forum_post, ismoderator bool) bool {
	if user.Uid == 0 || f == nil || thread == nil || post == nil {
		return false
	}
	alloweditpost_status := false

	if user.Admin_Group != nil && user.Admin_Group.Alloweditpost && models.Setting.Alloweditpost>>uint8(thread.Special)&1 == 1 {
		alloweditpost_status = true
	}
	if thread.Closed == 0 && f.Alloweditpost && user.Uid == post.Authorid && !(!alloweditpost_status && user.Group.Edittimelimit > 0 && int32(time.Now().Unix())-post.Dateline > user.Group.Edittimelimit) {
		return true
	}

	post_user := models.GetMemberInfoByID(post.Authorid)
	if post_user == nil {
		post_user = &db.Common_member{}
	}
	if ismoderator && user.Admin_Group != nil && user.Admin_Group.Alloweditpost {
		return true
	}
	return false
}

func forum_threadfastpost(data *protocol.MSG_U2WS_threadfastpost, c *server.Context, isSpider bool) {
	msg := protocol.Pool_MSG_WS2U_threadfastpost.Get().(*protocol.MSG_WS2U_threadfastpost)

	model_forum_thread := &models.Model_Forum_thread{}
	model_forum_thread.Ctx = c
	thread_cache := models.GetForumThreadCacheByTid(data.Tid)
	if thread_cache == nil {
		msg.Result = protocol.Err_NotFoundThread
		c.Output_data(msg)
		msg.Put()
		return
	}
	f := models.GetForumByFid(thread_cache.Fid)
	if f == nil {
		msg.Result = protocol.Err_forumId
		c.Output_data(msg)
		msg.Put()
		return
	}

	user := public.Getuserinfo(c)
	if user.Uid == 0 {
		msg.Result = protocol.Err_Notlogin
		c.Output_data(msg)
		msg.Put()
		return
	}
	var post *db.Forum_post
	if data.Position > 0 {

		model_forum_post := &models.Model_Forum_post{}
		model_forum_post.Ctx = c
		post = model_forum_post.GetPostInfoByPosition(data.Tid, data.Position)
		if post == nil {
			msg.Result = protocol.Err_NotFoundPost
			c.Output_data(msg)
			msg.Put()
			return
		}
	} else {
		post = &db.Forum_post{First: true}
	}
	if user.Adminid != 1 {
		if !user.Group.Allowpost { /*|| ((len(f.Field.Postperm) > 0 && !libraries.In_slice(user.Groupid, f.Field.Postperm)) && (len(f.Field.Spviewperm) > 0 && !libraries.In_slice(user.Groupid, f.Field.Spviewperm))) {  简化权限*/
			msg.Result = protocol.Err_Groupperm
			c.Output_data(msg)
			msg.Put()
			return
		}
	}
	var ismoderator bool
	if user.Adminid == 1 {
		ismoderator = true
	} else {
		for _, m := range f.Moderators {
			if user.Uid == m.Uid {
				ismoderator = true
				break
			}
		}
	}
	if thread_cache.Closed > 0 && !ismoderator {

		msg.Result = protocol.Err_threadClosed
		c.Output_data(msg)
		msg.Put()
		return
	}

	if data.Message == "" {
		msg.Result = protocol.Err_emptyMessage
		c.Output_data(msg)
		msg.Put()
		return
	}

	data.Message = models.ReplaceShieldingWord(data.Message)

	now := int32(time.Now().Unix())
	if !isSpider && !user.Group.Disablepostctrl {
		if models.Setting.Floodctrl > 0 && user.Count.Lastpost+models.Setting.Floodctrl > now {

			msg.Result = protocol.Err_flood_ctrl
			c.Output_data(msg)
			msg.Put()
			return
		}
		if user.Group.Maxthreadsperhour > 0 {
			model := &models.Model{}
			model.Ctx = c
			hour, err := model.Table("Common_member_action_log").Where(map[string]interface{}{"Uid": user.Uid, "Action": 0, "Dateline": []interface{}{"egt", now - 3600}}).Count()
			if err != nil {
				c.Adderr(err, map[string]interface{}{"Uid": user.Uid, "Action": 0, "Dateline": []interface{}{"egt", now - 3600}})
			}
			if user.Group.Maxthreadsperhour <= int32(hour) {

				msg.Result = protocol.Err_flood_ctrl_hour
				c.Output_data(msg)
				msg.Put()
				return
			}

		}

	}
	if thread_cache.Special == 0 {
		if models.Setting.Maxpostsize > 0 && len(data.Message) > models.Setting.Maxpostsize {

			msg.Result = protocol.Err_message_toolong
			c.Output_data(msg)
			msg.Put()
			return
		} else if models.Setting.Minpostsize > 0 && len(data.Message) < models.Setting.Minpostsize {

			msg.Result = protocol.Err_message_tooshort
			c.Output_data(msg)
			msg.Put()
			return
		}
	}
	if !isSpider && !vaptcha.Verify(data.Seccode, c.Conn.IP, strconv.Itoa(int(data.Tid))+"_"+strconv.Itoa(int(data.Position)), vaptcha.ScenePost) {
		msg.Result = protocol.Err_Seccode
		c.Output_data(msg)
		msg.Put()
		return
	}
	params := &models.Param_newthread{
		Subject:  html.EscapeString(data.Subject),
		Message:  html.EscapeString(data.Message),
		Tid:      data.Tid,
		Position: data.Position,
		Type:     config.ThreadOperateTypeReply,
	}

	model_thread := &models.Model_Forum_thread{}
	model_thread.Ctx = c
	old_Extcredits := map[int8]int32{}
	old_Extcredits[1] = user.Count.Extcredits1
	old_Extcredits[2] = user.Count.Extcredits2
	old_Extcredits[3] = user.Count.Extcredits3
	/*old_Extcredits[4] = user.Count.Extcredits4
	old_Extcredits[5] = user.Count.Extcredits5
	old_Extcredits[6] = user.Count.Extcredits6
	old_Extcredits[7] = user.Count.Extcredits7
	old_Extcredits[8] = user.Count.Extcredits8*/
	code := model_thread.Newthread(f, params, user.Uid)
	if code != protocol.Success {
		msg.Result = code
		c.Output_data(msg)
		msg.Put()
		return
	}
	model_post := &models.Model_Forum_post{}
	model_post.Ctx = c
	post = model_post.GetLastPostFromUid(user.Uid, thread_cache.Tid, true)

	if post == nil {
		c.Adderr(errors.New("无法获取新曾的回复"), map[string]interface{}{"Uid": user.Uid, "Tid": thread_cache.Tid})
	} else {
		if data.Other>>0&1 == 1 {
			msg.Page = int16(math.Ceil(float64(post.Position) / float64(models.Setting.Postperpage)))
		} else {
			msg.Add_info = getpostmsg(f, thread_cache, post, user, ismoderator, c, []*db.Common_member{user})
		}
	}

	msg.Result = protocol.Success
	c.Output_data(msg)
	msg.Put()
}
func forum_threadnextset(data *protocol.MSG_U2WS_nextset, c *server.Context) {

	thread_cache := models.GetForumThreadCacheByTid(data.Tid)
	if thread_cache == nil {
		c.Out_common(protocol.Err_NotFoundThread, "")
		return
	}
	index := models.Forum_thread_index_Begin()
	defer index.End()
	index.GetThreadlistByFid(thread_cache.Fid)
	var result int32
	var curLastpost int32
	if data.Next == 1 {
		curLastpost = 2147483647
	}

	for _, tid := range index.Result {
		t := models.GetForumThreadCacheByTid(tid)
		if t != nil && t.Displayorder > -1 && t.Fid == thread_cache.Fid && t.Tid != thread_cache.Tid {
			if data.Next == 1 {
				if t.Views.Lastpost > thread_cache.Views.Lastpost && t.Views.Lastpost < curLastpost {
					result = t.Tid
					curLastpost = t.Views.Lastpost
				}
			} else {
				if t.Views.Lastpost < thread_cache.Views.Lastpost && t.Views.Lastpost > curLastpost {
					result = t.Tid
					curLastpost = t.Views.Lastpost
				}
			}
		}
	}

	msg := protocol.Pool_MSG_WS2U_nextset.Get().(*protocol.MSG_WS2U_nextset)
	msg.Tid = result
	c.Output_data(msg)
	msg.Put()
}

func recommendThread(data *protocol.MSG_U2WS_RecommendThread, c *server.Context) {
	user := public.Getuserinfo(c)
	if user.Uid == 0 {
		c.Out_common(protocol.Err_Notlogin, `location.href="/index.html?tpl=forum_viewthread&Tid=`+strconv.Itoa(int(data.Tid))+`"`)
		return
	}

	model_thread := &models.Model_Forum_thread{}
	model_thread.Ctx = c
	msg := protocol.Pool_MSG_WS2U_RecommendThread.Get().(*protocol.MSG_WS2U_RecommendThread)
	msg.Status = data.Status
	msg.Result = model_thread.AddRecommend(data.Tid, user.Uid, data.Status)
	thread := model_thread.GetThreadData(map[string]interface{}{"Tid": data.Tid}, true)
	if thread != nil {
		msg.Recommend = thread.Recommends
		msg.Recommend_add = thread.Recommend_add
		msg.Recommend_sub = thread.Recommend_sub
	} else {
		msg.Recommend = 0
		msg.Recommend_add = 0
		msg.Recommend_sub = 0
	}
	c.Output_data(msg)
	msg.Put()
}

func getThreadPoll(uid, tid int32, c *server.Context) (poll *protocol.MSG_Poll_info, code int16) {
	model_forum_thread := &models.Model_Forum_thread{}
	model_forum_thread.Ctx = c

	pollinfo := model_forum_thread.GetThreadPollByTid(tid)
	if pollinfo == nil {
		code = protocol.Err_ThreadPollNotFound
		return
	}
	polloptionList := model_forum_thread.GetThreadPolloptionListByTid(tid)
	if len(polloptionList) < 2 {
		code = protocol.Err_ThreadPollOptionNotFound
		return
	}
	poll = protocol.Pool_MSG_Poll_info.Get().(*protocol.MSG_Poll_info)
	poll.Expiration = pollinfo.Expiration
	poll.Maxchoices = pollinfo.Maxchoices
	poll.Overt = 0
	if pollinfo.Overt {
		poll.Overt = 1
	}

	poll.Voterscount = 0
	poll.Polloption = make([]*protocol.MSG_poll_option, len(polloptionList))
	poll.AllreadyPoll = 0
	var aids []int64
	for k, option := range polloptionList {
		tmp := protocol.Pool_MSG_poll_option.Get().(*protocol.MSG_poll_option)
		tmp.Aid = option.Aid
		tmp.Displayorder = 0
		tmp.Id = option.Polloptionid
		tmp.Name = option.Name
		poll.Voterscount += option.Votes
		tmp.Votes = option.Votes
		tmp.Imginfo = nil
		if tmp.Aid > 0 {
			aids = append(aids, tmp.Aid)
		}
		if strings.Contains(option.Voterids, ","+strconv.Itoa(int(uid))+",") {
			poll.AllreadyPoll = 1
		}
		poll.Polloption[k] = tmp
	}
	poll.Visible = 0
	if pollinfo.Visible && poll.AllreadyPoll == 0 {
		poll.Visible = 1
	}
	poll.Isimagepoll = 0
	if len(aids) > 0 {
		model_attach := &models.Model_forum_attachment{}
		model_attach.Ctx = c
		if list := model_attach.GetAttachmentlist(map[string]interface{}{"Aid": aids}); len(list) > 0 {
			for _, option := range poll.Polloption {
				if option.Aid > 0 {
					for _, attach := range list {
						if attach.Aid == option.Aid {
							option.Imginfo = protocol.Pool_MSG_forum_imgattach.Get().(*protocol.MSG_forum_imgattach)
							option.Imginfo.Aid = attach.Aid
							option.Imginfo.Dateline = attach.Dateline
							option.Imginfo.Filename = attach.Filename
							option.Imginfo.Filenametitle = attach.Filetitle
							option.Imginfo.Src = attach.Attachment
						}
					}
				}

			}

		}
		poll.Isimagepoll = 1
	}
	return poll, protocol.Success
}
func pollThread(data *protocol.MSG_U2WS_PollThread, c *server.Context) {
	if len(data.Ids) == 0 {
		c.Out_common(protocol.Err_ThreadPollEmptyChoice, "")
		return
	}
	user := public.Getuserinfo(c)
	if user.Uid == 0 {
		c.Out_common(protocol.Err_Notlogin, "showWindowEx('quick_login')")
		return
	}
	if !user.Group.Allowpostpoll {
		c.Out_common(protocol.Err_Groupperm, "")
		return
	}
	model_forum_thread := &models.Model_Forum_thread{}
	model_forum_thread.Ctx = c

	thread_cache := models.GetForumThreadCacheByTid(data.Tid)
	if thread_cache == nil {
		c.Out_common(protocol.Err_NotFoundThread, "")
		return
	}
	poll := model_forum_thread.GetThreadPollByTid(data.Tid)
	optionlist := model_forum_thread.GetThreadPolloptionListByTid(data.Tid)
	if poll == nil || len(optionlist) == 0 {
		c.Out_common(protocol.Err_ThreadPollNotFound, "")
		return
	}
	if len(data.Ids) > int(poll.Maxchoices) {
		c.Out_common(protocol.Err_ThreadPollMaxChoice, "")
		return
	}
	uids := "," + strconv.Itoa(int(user.Uid)) + ","
	for _, polloption := range optionlist {
		if strings.Contains(polloption.Voterids, uids) {
			c.Out_common(protocol.Err_ThreadPollallready, "")
			return
		}
		for i := len(data.Ids) - 1; i >= 0; i-- {
			id := data.Ids[i]
			var find bool

			if id == polloption.Polloptionid {
				find = true
				break
			}

			if !find {
				data.Ids = append(data.Ids, data.Ids[i+1:]...)
			}
		}
	}

	if len(data.Ids) == 0 {
		c.Out_common(protocol.Err_ThreadPollChoiceErr, "")
		return
	}
	if code := model_forum_thread.PollSubmit(user.Uid, data.Tid, data.Ids); code != protocol.Success {
		c.Out_common(code, "")
		return
	}
	msg := protocol.Pool_MSG_WS2U_PollThread_sucess.Get().(*protocol.MSG_WS2U_PollThread_sucess)
	c.Output_data(msg)
	msg.Put()
}
