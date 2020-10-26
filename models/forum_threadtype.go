package models

import (
	"bbs/db"
	"time"
)

type Model_Forum_threadtype struct {
	Model
}

func (m *Model_Forum_threadtype) Add(insert *db.Forum_threadtype) int16 {
	insert.Timestamp = time.Now()
	id, err := m.Table("Forum_threadtype").Insert(insert)
	if err != nil {
		m.Ctx.Adderr(err, map[string]interface{}{"insert": insert})
	}
	return int16(id)
}
func (m *Model_Forum_threadtype) ReplaceAll(types []*db.Forum_threadtype) {
	_, err := m.Table("Forum_threadtype").ReplaceAll(types)
	if err != nil {
		m.Ctx.Adderr(err, map[string]interface{}{"types": types})
	}

}
