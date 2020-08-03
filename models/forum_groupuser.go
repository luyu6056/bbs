package models

import (
	"bbs/db"
	"strconv"
)

type Model_Forum_groupuser struct {
	Model
}

func (m *Model_Forum_groupuser) GetFidsByUid(uid int32) []int32 {
	var data []*db.Forum_groupuser
	err := m.Table("Forum_groupuser").Where("Uid =" + strconv.Itoa(int(uid))).Field("Fid").Select(&data)
	if err != nil {
		m.Ctx.Adderr(err, map[string]interface{}{"uid": uid})
	}
	result := make([]int32, len(data))
	for k, v := range data {
		result[k] = v.Fid
	}
	return result
}
