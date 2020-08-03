package db

import (
	"sync"
	"time"
)

//不生成数据库表，不存库

type Forum_thread_cache struct {
	Tid          int32
	Fid          int32
	Author       string
	Authorid     int32
	Subject      string
	Dateline     int32
	Displayorder int8
	Special      int8
	Status       int16
	Typeid       int16
	Attachment   int8
	Closed       int8
	Digest       int8
	Icon         int8
	Isgroup      int8
	Readperm     int16
	Replycredit  int16
	Highlight    int8
	Redirect     int32
	Timestamp    time.Time
	LowerSubject string             `db:"-"` //减少搜索ToLower花时间
	Views        *Forum_thread_data `db:"-"` //另一个表
	ThreadView   sync.Map           `db:"-"` //统计帖子查看数
	Postlen      map[int32]int32    `db:"-"` //维护帖子里每个人的发帖总量

}
