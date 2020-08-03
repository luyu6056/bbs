package web

import (
	"bbs/controllers/public"
	"bbs/db"
	"bbs/models"
	"bbs/protocol"
	"bbs/server"
	"strings"
	"time"
)

func searchThread(data *protocol.MSG_U2WS_searchThread, c *server.Context) {
	be := time.Now()
	thread_index := models.Forum_thread_index_Begin()
	defer thread_index.End()

	msg := protocol.Pool_MSG_WS2U_searchThread.Get().(*protocol.MSG_WS2U_searchThread)
	data.Word = strings.ToLower(data.Word)
	thread_index.GetThreadlistBySubject(data.Word)
	if len(thread_index.ResultList) < len(thread_index.Result) {
		thread_index.ResultList = make([]*db.Forum_thread_cache, len(thread_index.Result))
	}
	var i int
	msg.Threadcount = 0
	f_map := map[int32]*db.Forum_forum{}
	checkWrods := len([]rune(data.Word)) > 1
	if checkWrods {
		for _, tid := range thread_index.Result {
			if thread_cache := models.GetForumThreadCacheByTid(tid); thread_cache != nil {
				if !strings.Contains(thread_cache.LowerSubject, data.Word) {
					continue
				}
				if _, ok := f_map[thread_cache.Fid]; !ok {
					f := models.GetForumByFid(thread_cache.Fid)
					if f == nil {
						continue
					}
					f_map[f.Fid] = f
				}
				thread_index.ResultList[i] = thread_cache
				i++
			}
		}
	} else {
		for _, tid := range thread_index.Result {
			if thread_cache := models.GetForumThreadCacheByTid(tid); thread_cache != nil {
				if _, ok := f_map[thread_cache.Fid]; !ok {
					f := models.GetForumByFid(thread_cache.Fid)
					if f == nil {
						continue
					}
					f_map[f.Fid] = f
				}
				thread_index.ResultList[i] = thread_cache
				i++
			}
		}
	}

	thread_index.ResultList = thread_index.ResultList[:i]
	msg.Threadcount = int32(i)
	thread_index.Less = func(a, b *db.Forum_thread_cache) bool {
		switch {
		case a.Views.Lastpost > b.Views.Lastpost:
			return true
		case a.Views.Lastpost < b.Views.Lastpost:
			return false
		case a.Displayorder > b.Displayorder:
			return true
		case a.Displayorder < b.Displayorder:
			return false
		}
		return false
	}
	thread_index.Order_result()

	if data.Page == 0 {
		data.Page = 1
	}
	if int(data.Page-1)*models.Setting.Topicperpage > len(thread_index.ResultList) {
		msg.Threadlist = msg.Threadlist[:0]
		msg.Threadcount = 0
		c.Output_data(msg)
		msg.Put()
		return
	}
	i = 0
	user := public.Getuserinfo(c)

	msg.Threadlist = make([]*protocol.MSG_searchThread, models.Setting.Topicperpage)
	for k, thread_cache := range thread_index.ResultList[int(data.Page-1)*models.Setting.Topicperpage:] {
		thread := protocol.Pool_MSG_searchThread.Get().(*protocol.MSG_searchThread)
		thread.Author = thread_cache.Author
		thread.Authorid = thread_cache.Authorid
		thread.Tid = thread_cache.Tid
		thread.Fid = thread_cache.Fid
		f := f_map[thread_cache.Fid]
		thread.ForumName = f.Name
		//thread.Position
		thread.Replies = thread_cache.Views.Replies
		thread.Subject = thread_cache.Subject
		thread.Views = thread_cache.Views.Views
		thread.Dateline = thread_cache.Dateline
		if thread_cache.Readperm == 0 {
			thread.Cutmessage = thread_cache.Views.CutMessage
		} else {
			thread.Cutmessage = ""
		}
		if thread_cache.Author == "" {
			if user.Groupid != 1 {
				thread_cache.Authorid = 0
			}
		}
		msg.Threadlist[k] = thread
		i++
		if i >= models.Setting.Topicperpage {
			break
		}
	}
	msg.Threadlist = msg.Threadlist[:i]
	msg.Time = int64(time.Since(be))
	c.Output_data(msg)
	msg.Put()

}
