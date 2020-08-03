package models

import "bbs/db"

//为forum_thread扩展poll读取部分，写入和修改在forum_thread.go
func (m *Model_Forum_thread) GetThreadPollByTid(tid int32) (res *db.Forum_poll) {
	err := m.Table("Forum_poll").Where(map[string]interface{}{"Tid": tid}).Find(&res)
	if err != nil {
		m.Ctx.Adderr(err, map[string]interface{}{"tid": tid})
	}
	return
}
func (m *Model_Forum_thread) GetThreadPolloptionListByTid(tid int32) (res []*db.Forum_polloption) {
	err := m.Table("Forum_polloption").Where(map[string]interface{}{"Tid": tid}).Select(&res)
	if err != nil {
		m.Ctx.Adderr(err, map[string]interface{}{"tid": tid})
	}
	return
}
