package models

import (
	"bbs/db"
	"strconv"
)

type Model_member_field_forum struct {
	Model
}

func (this *Model_member_field_forum) Update(profile *db.Common_member_field_forum) bool {
	err := this.Table("Common_member_field_forum").Where("Uid = " + strconv.Itoa(int(profile.Uid))).Replace(profile)
	if err != nil {
		this.Ctx.Adderr(err, map[string]interface{}{"profile": profile})
		return false
	}
	return true
}
