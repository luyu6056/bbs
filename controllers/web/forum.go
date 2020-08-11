package web

import (
	"bbs/config"
	"bbs/controllers/public"
	"bbs/db"
	"bbs/libraries"
	"bbs/models"
	"bbs/protocol"
	"bbs/server"
	"strconv"
	"time"
)

const (
	maxhistory                = 5
	recommendNumWithNoHistory = 10
)

func forum_index(data *protocol.MSG_U2WS_forum_index, c *server.Context) {
	msg := protocol.Pool_MSG_WS2U_forum_index.Get().(*protocol.MSG_WS2U_forum_index)
	msg.Onlinenum = models.Onlinenum
	msg.Usernum = models.Usernum
	msg.Lastname = models.LastUserName
	//msg.Diy_list = models.GetTemplatefromName("forum")

	msg.Threads = 0
	msg.Posts = 0

	userinfo := public.Getuserinfo(c)
	var forum_history []int32
	if userinfo.Uid == 0 {
		c.Conn.Session.Get("forum_history", &forum_history)
	} else {
		forum_history = userinfo.Forum_history
	}
	//var threads, posts, todayposts, announcepm int32
	catlist := map[int32]*protocol.MSG_forum_index_cart{}
	forumlist := map[int32]*protocol.MSG_forum{}
	var one_ids, two_ids []int32
	for _, forum := range models.GetForumindex() {
		if data.Gid > 0 && (forum.Fid != data.Gid && forum.Fup != data.Gid) {
			continue
		}
		if forum.Type != 0 {
			//threads += forum.Threads
			//posts += forum.Posts
			//todayposts += forum.Todayposts
			if forum.Type == 1 && catlist[forum.Fup] != nil { //封装二层
				var permission int8
				if len(forum.Field.Viewperm) == 0 || libraries.In_slice(userinfo.Groupid, forum.Field.Viewperm) || (userinfo.Uid > 0 && userinfo.Forum_access[forum.Fid] != nil && userinfo.Forum_access[forum.Fid].Allowview == 1) /*|| (forum.us && strstr($forum['users'], "\t$_G[uid]\t")))  不明条件*/ {
					permission = 2
				} else if !models.Setting.Hideprivate {
					permission = 1
				} else {
					continue
				}
				msg.Threads += int64(forum.Threads)
				msg.Posts += int64(forum.Posts)
				two_ids = append(two_ids, forum.Fid)

				forumlist[forum.Fid] = &protocol.MSG_forum{
					Fup:         forum.Fup,
					Extra:       forum.Field.Extra,
					Fid:         forum.Fid,
					Icon:        forum.Field.Icon,
					Lastpost:    forum.Lastpost,
					Moderators:  forum.Field.Moderators,
					Name:        forum.Name,
					Orderid:     catlist[forum.Fup].Forumscount,
					Permission:  permission,
					Posts:       forum.Posts,
					Threads:     forum.Threads,
					Todayposts:  forum.Todayposts,
					Simple:      forum.Simple,
					Subforums:   models.Setting.Subforumsindex,
					Description: forum.Field.Description,
				}

				catlist[forum.Fup].Forumscount++
				//catlist[forum.Fup].Forums = append(catlist[forum["fup"]].Forums,

			} /*else if v, ok := forumlist[forum.Fup]; ok { //封装三层

			v.Threads += forum.Threads
			v.Posts += forum.Posts
			v.Todayposts += forum.Todayposts
			v.Level_three = append(v.Level_three, &protocol.MSG_forum_idname{
				Fid:  forum.Fid,
				Name: forum.Name,
			})
			/*forumurl = !empty(forum["domain"]) && !empty(_G["setting"]["domain"]["root"]["forum"]) ? _G["scheme"]."://".forum["domain"]."."._G["setting"]["domain"]["root"]["forum"] : "forum.php?mod=forumdisplay&fid=".forum["fid"]
				v. += (empty(v["subforums"]) ? "" : ", ")."<a href="javascript:tpl_load('forum',WRITE_MSG_U2WS_forum_index,{Fid:''})" ".(!empty(forum["extra"]["namecolor"]) ? " style="color: " . forum["extra"]["namecolor"].""" : "") . ">".forum["name"]."</a>"
			}*/
			//}

		} else { //封装一层
			one_ids = append(one_ids, forum.Fid)
			catlist[forum.Fid] = &protocol.MSG_forum_index_cart{
				Extra:        forum.Field.Extra,
				Fid:          forum.Fid,
				Forumcolumns: 2, //强制2
				Name:         forum.Name,
			}
		}
	}
	msg.History = msg.History[:0]
	if data.Gid == 0 {

		for i := 0; i < len(forum_history); i++ {
			if forum, ok := forumlist[forum_history[i]]; ok {
				msg.History = append(msg.History, forum)
				if len(msg.History) == maxhistory {
					break
				}
			}
		}
	}
	msg.Catlist = msg.Catlist[:0]
	for _, catid := range one_ids {
		category := catlist[catid]
		if category.Forumscount != 0 {
			msg.Catlist = append(msg.Catlist, category)
			for _, id := range two_ids {
				if forumlist[id].Fup == catid {
					category.Forums = append(category.Forums, forumlist[id])
				}
			}
			if catid == 0 {
				//category.Type = "group"
				category.Name = models.Setting.Bbname
			}
		}
	}
	msg.Recommend = msg.Recommend[:0]
	if data.Gid == 0 {
		libraries.SortInt32(two_ids)
		for i := len(two_ids) - 1; i > -1; i-- {
			msg.Recommend = append(msg.Recommend, forumlist[two_ids[i]])
			if len(msg.History) == 0 {
				if len(msg.Recommend) >= recommendNumWithNoHistory {
					break
				}
			} else {
				if len(msg.Recommend) >= recommendNumWithNoHistory-maxhistory {
					break
				}
			}
		}
	}

	c.Output_data(msg)
	protocol.Pool_MSG_WS2U_forum_index.Put(msg)
}
func forum(data *protocol.MSG_U2WS_forum, c *server.Context) {

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
	var ismoderator bool
	user := public.Getuserinfo(c)

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
	now := int32(time.Now().Unix())
	msg := protocol.Pool_MSG_WS2U_forum.Get().(*protocol.MSG_WS2U_forum)
	msg.Parent = protocol.Pool_MSG_forum_idname.Get().(*protocol.MSG_forum_idname)

	msg.Parent.Name = parent.Name
	msg.Parent.Fid = parent.Fid
	msg.Modrecommend = models.GetForumModrecommend(f)
	msg.Moderators = f.Field.Moderators
	msg.Favtimes = f.Favtimes
	msg.Fid = f.Fid
	msg.Name = f.Name
	msg.Threads = f.Threads
	msg.Todayposts = f.Todayposts
	msg.Threadtypes = models.GetThreadtypesByforum(f, user)
	msg.Rules = f.Field.Rules
	if f.Lastpost != nil {
		msg.Lastpost = f.Lastpost.Dateline
	} else {
		msg.Lastpost = 0
	}

	index := models.Forum_thread_index_Begin()
	defer index.End()
	index.GetThreadlistByFid(data.Fid)

	if data.Typeid != "" {
		typeid, _ := strconv.Atoi(data.Typeid)
		index.GetThreadlistByTypeid(int16(typeid))
	}
	switch data.Specialtype {
	case "common":
		index.GetThreadlistBySpecia(config.ThreadSpecialCommon)
	case "poll":
		index.GetThreadlistBySpecia(config.ThreadSpecialPoll)
	case "trade":
		index.GetThreadlistBySpecia(config.ThreadSpecialTrade)
	case "reward":
		index.GetThreadlistBySpecia(config.ThreadSpecialReward)
	case "activity":
		index.GetThreadlistBySpecia(config.ThreadSpecialActivity)
	case "debate":
		index.GetThreadlistBySpecia(config.ThreadSpecialDebate)
	}
	switch data.Filter {
	case "specialtype":

	case "digest":
		index.GetThreadlistByDigest()
	}

	if len(index.ResultList) < len(index.Result) {
		index.ResultList = make([]*db.Forum_thread_cache, len(index.Result))
	}
	var i int
	msg.Threadmodcount = 0

	for _, tid := range index.Result {
		if thread_cache := models.GetForumThreadCacheByTid(tid); thread_cache != nil {
			if thread_cache.Displayorder < 0 {
				if thread_cache.Authorid == user.Uid && models.Setting.Allowmoderatingthread && thread_cache.Displayorder == -2 {
					msg.Threadmodcount++
				}
				libraries.DEBUG("继续")
				continue
			}
			switch data.Filter {
			case "heat":
				if len(models.Setting.Heatthread_iconlevels) > 0 && thread_cache.Views.Heats < models.Setting.Heatthread_iconlevels[0] {
					continue
				}
			case "recommend":
				if models.Setting.Recommendthread != nil && len(models.Setting.Recommendthread.Iconlevels) > 0 && thread_cache.Views.Recommends < models.Setting.Recommendthread.Iconlevels[0] {
					continue
				}
			}
			if data.Dateline > 0 && now-thread_cache.Views.Lastpost > data.Dateline {
				//libraries.DEBUG("继续")
				continue
			}
			index.ResultList[i] = thread_cache
			i++
		} else {

		}
	}

	index.ResultList = index.ResultList[:i]

	msg.Threadscount = int32(i)
	var orderfunc func(a, b *db.Forum_thread_cache) bool

	switch data.Orderby {
	case "views":
		orderfunc = func(a, b *db.Forum_thread_cache) bool {
			switch {
			case a.Displayorder > b.Displayorder:
				return true
			case a.Displayorder < b.Displayorder:
				return false
			case a.Views.Views == b.Views.Views:
				if a.Views.Replies == b.Views.Replies {
					return a.Views.Lastpost > b.Views.Lastpost
				}
				return a.Views.Replies > b.Views.Replies
			}
			return a.Views.Views > b.Views.Views
		}
	case "replies":
		orderfunc = func(a, b *db.Forum_thread_cache) bool {
			switch {
			case a.Displayorder > b.Displayorder:
				return true
			case a.Displayorder < b.Displayorder:
				return false
			case a.Views.Replies == b.Views.Replies:
				if a.Views.Views == b.Views.Views {
					return a.Views.Lastpost > b.Views.Lastpost
				}
				return a.Views.Views > b.Views.Views
			}
			return a.Views.Replies > b.Views.Replies
		}
	default:
		orderfunc = func(a, b *db.Forum_thread_cache) bool {
			switch {
			case a.Displayorder > b.Displayorder:
				return true
			case a.Displayorder < b.Displayorder:
				return false
			}
			return a.Views.Lastpost > b.Views.Lastpost
		}
	}
	index.Less = orderfunc
	index.Order_result()
	if data.Page <= 0 {
		data.Page = 1
	}
	if int(data.Page-1)*models.Setting.Topicperpage > len(index.ResultList) {
		msg.Threadlist = msg.Threadlist[:0]
		msg.Threadscount = 0
		c.Output_data(msg)
		msg.Put()
		return
	}
	i = 0
	if cap(msg.Threadlist) < models.Setting.Topicperpage {
		msg.Threadlist = make([]*protocol.MSG_forum_thread, models.Setting.Topicperpage)
	} else {
		msg.Threadlist = msg.Threadlist[:models.Setting.Topicperpage]
	}

	msg.Separatepos = 0
	for k, thread_cache := range index.ResultList[int(data.Page-1)*models.Setting.Topicperpage:] {
		thread := protocol.Pool_MSG_forum_thread.Get().(*protocol.MSG_forum_thread)
		thread.Allreplies = /*thread_cache.Comments +*/ thread_cache.Views.Replies
		thread.Attachment = thread_cache.Attachment
		thread.Closed = thread_cache.Closed
		thread.Dateline = thread_cache.Dateline
		thread.Digest = thread_cache.Digest
		thread.Displayorder = thread_cache.Displayorder
		thread.Fid = thread_cache.Fid
		thread.Heats = thread_cache.Views.Heats
		thread.Icon = thread_cache.Icon
		thread.Isgroup = thread_cache.Isgroup
		thread.Lastpost = thread_cache.Views.Lastpost
		thread.Lastposter = thread_cache.Views.Lastposter
		thread.Readperm = thread_cache.Readperm
		//thread.Rate = thread_cache.Rate
		thread.Replycredit = thread_cache.Replycredit
		thread.Special = thread_cache.Special
		thread.Status = thread_cache.Status
		thread.Tid = thread_cache.Tid
		thread.Typeid = thread_cache.Typeid
		thread.Authorid = thread_cache.Authorid
		thread.Author = thread_cache.Author
		thread.Subject = thread_cache.Subject
		thread.Highlight = thread_cache.Highlight
		thread.Recommends = thread_cache.Views.Recommends
		thread.Views = thread_cache.Views.Views
		if thread.Displayorder > 0 && thread.Displayorder < 5 {
			msg.Separatepos++
		}
		if f.Status != 3 && (thread_cache.Closed > 0 || (f.Autoclose > 0 && thread_cache.Fid == f.Fid && now-thread_cache.Dateline > f.Autoclose)) {
			if thread_cache.Isgroup == 1 {
				thread.Folder = "common"
				//$grouptids[] = thread_cache['closed'];
			} else {
				/*if(thread_cache.Closed > 1) {
					thread_cache['moved'] = thread_cache['tid'];
					thread_cache['allreplies'] = thread_cache['replies'] = '-';
					thread_cache['views'] = '-';
				}*/
				thread.Folder = "lock"
			}
		} else if f.Status == 3 && thread_cache.Closed == 1 {
			thread.Folder = "lock"
		} else {
			thread.Folder = "common"
		}

		if thread.Folder == "common" && thread_cache.Views.Lastpost >= c.Conn.Session.Load_int32("Lastpost:"+strconv.Itoa(int(data.Fid))) {
			thread.Folder = "new"
		}
		msg.Threadlist[k] = thread
		i++
		if i >= models.Setting.Topicperpage {
			break
		}
	}

	msg.Threadlist = msg.Threadlist[:i]
	msg.Allow = 0 //0=ismoderator,1=recyclebin>0,2=subforumonly,3=subexists&&page=1子版块,4=!$liveallowpostreply(Livethread!=nil以后有效) ，5=!Allowspecialonly,6=Picstyle,7=hiddenexists,8Allowpostspecial>>0,9,10,11,12Allowpostspecial>>4

	if ismoderator {
		msg.Allow = 1
	}
	if f.Recyclebin > 0 {
		msg.Allow += 1 << 1
	}
	if f.Simple&1 == 1 {
		msg.Allow += 1 << 2
	}
	if !f.Allowspecialonly {
		msg.Allow += 1 << 5
	}
	if f.Field.Picstyle {
		msg.Allow += 1 << 6
	}
	if f.Allowpostspecial>>0&1 == 1 {
		msg.Allow += 1 << 8
	}
	if f.Allowpostspecial>>1&1 == 1 {
		msg.Allow += 1 << 9
	}
	if f.Allowpostspecial>>2&1 == 1 {
		msg.Allow += 1 << 10
	}
	if f.Allowpostspecial>>3&1 == 1 {
		msg.Allow += 1 << 11
	}
	if f.Allowpostspecial>>4&1 == 1 {
		msg.Allow += 1 << 12
	}
	if f.Field.Livetid > 0 {
		livethread := models.GetForumThreadCacheByTid(f.Field.Livetid)
		if livethread != nil {
			model_thread := &models.Model_Forum_thread{}
			model_thread.Ctx = c
			if !((user.Forum_access[f.Fid] == nil || user.Forum_access[f.Fid].Allowreply != -1) && (livethread.Isgroup == 1 || (livethread.Closed == 0 && !model_thread.Checkautoclose(f, livethread, ismoderator)) || ismoderator) && ((!libraries.In_slice(user.Groupid, f.Field.Replyperm) && user.Group.Allowreply) || libraries.In_slice(user.Groupid, f.Field.Replyperm) || (user.Forum_access[f.Fid] != nil && user.Forum_access[f.Fid].Allowreply == 1))) {
				msg.Allow += 1 << 4
			}
			msg.Livethread = protocol.Pool_MSG_forum_thread.Get().(*protocol.MSG_forum_thread)
			msg.Livethread.Allreplies = /*livethread.Comments +*/ livethread.Views.Replies
			msg.Livethread.Attachment = livethread.Attachment
			msg.Livethread.Closed = livethread.Closed
			msg.Livethread.Dateline = livethread.Dateline
			msg.Livethread.Digest = livethread.Digest
			msg.Livethread.Displayorder = livethread.Displayorder
			msg.Livethread.Fid = livethread.Fid
			msg.Livethread.Heats = livethread.Views.Heats
			msg.Livethread.Icon = livethread.Icon
			msg.Livethread.Isgroup = livethread.Isgroup
			msg.Livethread.Lastpost = livethread.Views.Lastpost
			msg.Livethread.Lastposter = livethread.Views.Lastposter
			msg.Livethread.Readperm = livethread.Readperm
			//msg.Livethread.Rate = livethread.Rate
			msg.Livethread.Replycredit = livethread.Replycredit
			msg.Livethread.Special = livethread.Special
			msg.Livethread.Status = livethread.Status
			msg.Livethread.Tid = livethread.Tid
			msg.Livethread.Typeid = livethread.Typeid
			msg.Livethread.Authorid = livethread.Authorid
			msg.Livethread.Author = livethread.Author
			msg.Livethread.Subject = livethread.Subject
			msg.Livethread.Highlight = livethread.Highlight
			msg.Livemessage = "待处理"
		}
	}
	msg.Group_status = 0 //0=disablepostctrl,1=allowdelpost,2=allowmovethread,3=allowedittypethread,4=allowstickthread,5=allowdigestthread,6=allowhighlightthread,7=allowrecommendthread,8=allowbumpthread,9=allowclosethread,10=allowclosethread,11=$_G['group']['allowpost'] && ($_G['group']['allowposttrade'] || $_G['group']['allowpostpoll'] || $_G['group']['allowpostreward'] || $_G['group']['allowpostactivity'] || $_G['group']['allowpostdebate'] || $_G['setting']['threadplugins'] || data.Threadsorts),12=allowpostpoll,13=allowpostreward,14=allowpostdebate,15=allowpostactivity,16allowposttrade
	if user.Group.Disablepostctrl {
		msg.Group_status = 1
	}
	msg.Allowstickthread = 0
	if user.Admin_Group != nil {
		if user.Admin_Group.Allowdelpost {
			msg.Group_status += 1 << 1
		}
		if user.Admin_Group.Allowmovethread {
			msg.Group_status += 1 << 2
		}
		if user.Admin_Group.Allowedittypethread {
			msg.Group_status += 1 << 3
		}
		msg.Allowstickthread = user.Admin_Group.Allowstickthread

		if user.Admin_Group.Allowdigestthread > 0 {
			msg.Group_status += 1 << 5
		}
		if user.Admin_Group.Allowhighlightthread {
			msg.Group_status += 1 << 6
		}
		if user.Admin_Group.Allowrecommendthread {
			msg.Group_status += 1 << 7
		}
		if user.Admin_Group.Allowbumpthread {
			msg.Group_status += 1 << 8
		}
		if user.Admin_Group.Allowclosethread {
			msg.Group_status += 1 << 9
		}
		if user.Admin_Group.Allowclosethread {
			msg.Group_status += 1 << 10
		}
	}
	allowpost := (len(f.Field.Postperm) == 0 && user.Group.Allowpost) || (libraries.In_slice(user.Groupid, f.Field.Postperm)) || (user.Forum_access[f.Fid] != nil && user.Forum_access[f.Fid].Allowpost == 1 && user.Group.Allowpost)

	if allowpost && ((user.Group.Allowposttrade && f.Allowpostspecial>>1&1 == 1) || (user.Group.Allowpostpoll && f.Allowpostspecial>>0&1 == 1) || (user.Group.Allowpostreward && f.Allowpostspecial>>2&1 == 1) || (user.Group.Allowpostactivity && f.Allowpostspecial>>3&1 == 1) || (user.Group.Allowpostdebate && f.Allowpostspecial>>4&1 == 1)) {
		msg.Group_status += 1 << 11
	}
	if user.Group.Allowpostpoll && f.Allowpostspecial>>0&1 == 1 {
		msg.Group_status += 1 << 12
	}
	if user.Group.Allowpostreward && f.Allowpostspecial>>2&1 == 1 {
		msg.Group_status += 1 << 13
	}
	if user.Group.Allowpostdebate && f.Allowpostspecial>>4&1 == 1 {
		msg.Group_status += 1 << 14
	}
	if user.Group.Allowpostactivity && f.Allowpostspecial>>3&1 == 1 {
		msg.Group_status += 1 << 15
	}
	if user.Group.Allowposttrade && f.Allowpostspecial>>1&1 == 1 {
		msg.Group_status += 1 << 16
	}

	msg.Oldrank = f.Oldrank
	msg.Rank = f.Rank
	msg.Yesterdayposts = f.Yesterdayposts
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
	i = 0
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
	if user.Uid > 0 {
		user.Count.Lastvisit = now
	}
	c.Conn.Session.Set("Lastpost:"+strconv.Itoa(int(data.Fid)), now)
	addhistory(data.Fid, c)
}
func forum_refresh(data *protocol.MSG_U2WS_forum_refresh, c *server.Context) {
	f := models.GetForumByFid(data.Fid)
	if f == nil {
		c.Out_common(protocol.Err_forumId, "")
		return
	}
	if f.Lastpost == nil || data.Lastpost >= f.Lastpost.Dateline {
		c.Out_common(protocol.Success, "")
		return
	}
	msg := protocol.Pool_MSG_U2WS_forum.Get().(*protocol.MSG_U2WS_forum)
	msg.Fid = data.Fid
	msg.Dateline = 0
	msg.Filter = ""
	msg.Orderby = ""
	msg.Page = 1
	msg.Rewardtype = 0
	msg.Specialtype = ""
	msg.Typeid = ""
	forum(msg, c)
	msg.Put()
}
func addhistory(fid int32, c *server.Context) {

	user := public.Getuserinfo(c)
	if user.Uid > 0 {
		var exist bool
		for key, id := range user.Forum_history {

			if id == fid {
				if key == len(user.Forum_history)-1 {
					exist = true
					break
				} else {
					user.Forum_history = append(user.Forum_history[:key], user.Forum_history[key+1:]...)
					break
				}

			}
		}
		if !exist {
			user.Forum_history = append(user.Forum_history, fid)
			user.UpdateDB()
		}
	} else {
		var forum_history []int32
		c.Conn.Session.Get("forum_history", &forum_history)
		var exist bool
		for key, id := range forum_history {
			if id == fid {
				if key == len(forum_history)-1 {
					exist = true
					break
				} else {
					forum_history = append(forum_history[:key], forum_history[key+1:]...)
					break
				}

			}
		}
		if !exist {
			forum_history = append(forum_history, fid)
			c.Conn.Session.Set("forum_history", forum_history)
		}

	}
}
func forum_carlist(data *protocol.MSG_U2WS_forum_carlist, c *server.Context) {
	forumlist := []*protocol.MSG_forum_cart_child{}
	msg := protocol.Pool_MSG_WS2U_forum_carlist.Get().(*protocol.MSG_WS2U_forum_carlist)
	msg.Catlist = msg.Catlist[:0]
	user := public.Getuserinfo(c)
	for _, forum := range models.GetForumindex() {
		if forum.Type != 0 {
			if forum.Type == 1 && forum.Fup != 0 { //封装二层
				tmp := protocol.Pool_MSG_forum_cart_child.Get().(*protocol.MSG_forum_cart_child)
				tmp.Fid = forum.Fid
				tmp.Name = forum.Name
				tmp.Fup = forum.Fup
				tmp.Threadtypes = models.GetThreadtypesByforum(forum, user)
				forumlist = append(forumlist, tmp)

			}

		} else { //封装一层
			tmp := protocol.Pool_MSG_forum_cart.Get().(*protocol.MSG_forum_cart)
			tmp.Name = forum.Name
			tmp.Catid = forum.Fid
			msg.Catlist = append(msg.Catlist, tmp)
		}
	}
	for _, category := range msg.Catlist {
		for _, forum := range forumlist {
			if forum.Fup == category.Catid {
				category.Forums = append(category.Forums, forum)
			}
		}
		if category.Catid == 0 {
			//category.Type = "group"
			category.Name = models.Setting.Bbname
		}
	}
	c.Output_data(msg)
	msg.Put()
}
