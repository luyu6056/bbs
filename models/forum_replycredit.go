package models

import (
	"bbs/db"
	"strconv"
)

type Model_Forum_replycredit struct {
	Model
}

func (model Model_Forum_replycredit) GetForum_replycreditByID(Tid int32) (result *db.Forum_replycredit) {
	if Tid < 1 {
		return
	}
	err := model.Table("Forum_replycredit").Where("Tid = " + strconv.Itoa(int(Tid))).Find(&result)
	model.Ctx.Adderr(err, Tid)
	return
}
