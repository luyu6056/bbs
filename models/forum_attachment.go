package models

import (
	"bbs/config"
	"bbs/db"
	"bbs/libraries"
	"os"
	"strconv"
	"sync"
	"time"

	"github.com/panjf2000/ants/v2"
)

type Model_forum_attachment struct {
	Model
}

func (m *Model_forum_attachment) Add(insert *db.Forum_attachment) int64 {
	aid, err := m.Table("Forum_attachment").Insert(insert)
	if err != nil {
		m.Ctx.Adderr(err, insert)
	}
	return aid
}
func (m *Model_forum_attachment) GetAttachmentlist(where map[string]interface{}) (list []*db.Forum_attachment) {
	err := m.Table("Forum_attachment").Where(where).Select(&list)
	if err != nil {
		m.Ctx.Adderr(err, where)
	}
	return
}
func (m *Model_forum_attachment) GetOneAttachment(where map[string]interface{}) (list *db.Forum_attachment) {
	err := m.Table("Forum_attachment").Where(where).Find(&list)
	if err != nil {
		m.Ctx.Adderr(err, where)
	}
	return
}

var deletelock sync.Mutex
var deletepool, _ = ants.NewPoolWithFunc(1000, func(i interface{}) {
	deletelock.Lock()
	defer deletelock.Unlock()
	if list, ok := i.([]*db.Forum_attachment); ok {
		for _, atta := range list {
			if config.Server.OssEndpoint == "" {
				os.Remove(atta.Filename)
			} else {
				oss, err := libraries.NewOSS(config.Server.OssEndpoint, config.Server.OssAccessKeyId, config.Server.OssAccessKeySecret, config.Server.OssBucketName)
				if err != nil {
					libraries.DEBUG("oss打开失败")
					return
				}
				err = oss.Delete(atta.Attachment)
				if err != nil {
					libraries.DEBUG("oss删除失败", atta.Attachment)
					return
				}
			}
		}
	}
})

func (m *Model_forum_attachment) Delete(where map[string]interface{}) (res bool) {
	var list []*db.Forum_attachment
	err := m.Table("Forum_attachment").Where(where).Select(&list)
	if err != nil {
		m.Ctx.Adderr(err, where)
		return
	}
	if len(list) > 0 {
		res, err = m.Table("Forum_attachment").Where(where).Delete()
		if err != nil {
			m.Ctx.Adderr(err, where)
		}
		deletepool.Invoke(list)
	}
	return
}
func (m *Model_forum_attachment) UpdateByAid(aid int64, update map[string]interface{}) (res bool) {
	res, err := m.Table("Forum_attachment").Where("Aid = " + strconv.Itoa(int(aid))).Update(update)
	if err != nil {
		m.Ctx.Adderr(err, map[string]interface{}{"aid": aid, "update": update})
	}
	return
}
func (m *Model_forum_attachment) Update(where, update map[string]interface{}) (res bool) {
	res, err := m.Table("Forum_attachment").Where(where).Update(update)
	if err != nil {
		m.Ctx.Adderr(err, map[string]interface{}{"where": where, "update": update})
	}
	return
}
func delete_attach() { //删除过期照片附件
	t := time.Now().Unix() - 86400
	where := map[string]interface{}{
		"Dateline": []interface{}{"lt", t},
		"Isused":   false,
	}
	model := &Model{}
	var list []*db.Forum_attachment
	model.Table("Forum_attachment").Where(where).Select(&list)
	if len(list) > 0 {
		model.Table("Forum_attachment").Where(where).Delete()
		user_ids := map[int32]bool{}
		for _, v := range list {
			os.Remove("./static" + v.Attachment)
			user_ids[v.Uid] = true
		}
	}
}
