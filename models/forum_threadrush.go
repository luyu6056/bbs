package models

import (
	"bbs/db"
	"strconv"
)

//抢楼
type Model_forum_threadrush struct {
	Model
}

func (m *Model_forum_threadrush) GetRushByTid(tid int32) (rush *db.Forum_threadrush) {
	err := m.Table("Forum_threadrush").Where("Tid = " + strconv.Itoa(int(tid))).Find(&rush)
	if err != nil {
		m.Ctx.Adderr(err, map[string]interface{}{"tid": tid})
	}
	return
}
