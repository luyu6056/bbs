package models

import (
	"bbs/db"
	"sync/atomic"
	//"bbs/libraries"
	"time"
)

func Sendsysnotice(member *db.Common_member, str string) error {
	msg := &db.Home_notification{
		Uid:      member.Uid,
		New:      1,
		Note:     str,
		Dateline: time.Now().Unix(),
	}
	id, err := (&Model{}).Table("Home_notification").Insert(msg)
	if id == 0 {
		return err
	}
	msg.Id = int32(id)
	member.Lock.RLock()
	member.Notice = append(member.Notice, msg)
	atomic.AddInt32(&member.Newpm, 1)
	member.Lock.RUnlock()
	return nil
}
