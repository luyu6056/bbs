package db

import (
	"bbs/config"
	"bbs/db/mysql"
	"bbs/libraries"
	"bytes"
	"fmt"
	"reflect"
	"strconv"
	"strings"
	"sync"
	"time"
	"unsafe"

	"github.com/modern-go/reflect2"
)

const (
	max_insert_num    = 64
	thread_insert_num = 1000
	master_db         = 0
	slave_db          = 0
	log_db            = 0
)

var bufpool = sync.Pool{
	New: func() interface{} {
		return &libraries.MsgBuffer{}
	},
}

func replace(i interface{}, db_index int) {
	var v reflect.Value
	r := reflect.TypeOf(i)
	uint_ptr := uintptr(reflect2.PtrOf(i))
	for r.Kind() == reflect.Ptr {
		r = r.Elem()
	}
	buf := bufpool.Get().(*libraries.MsgBuffer)
	field := bufpool.Get().(*libraries.MsgBuffer)
	defer func() {
		bufpool.Put(buf)
		bufpool.Put(field)
	}()
	buf.Reset()
	field.Reset()
	switch r.Kind() {
	case reflect.Struct:
		v = reflect.NewAt(r, unsafe.Pointer(uint_ptr))
		buf.Write([]byte{82, 69, 80, 76, 65, 67, 69, 32, 73, 78, 84, 79, 32}) //do = `REPLACE into`
		buf.WriteString(config.Server.Tablepre)
		buf.WriteString(r.Name())
		buf.Write([]byte{32, 83, 69, 84, 32})
		for i1 := 0; i1 < r.NumField(); i1++ {
			field_t := r.Field(i1)
			if field_t.Tag.Get(`db`) == `-` {
				continue
			}
			buf.WriteString(mysql.Getkey(field_t.Name))
			buf.WriteByte(61)
			buf.WriteString(mysql.GetvaluefromPtr(uint_ptr, field_t))
			buf.WriteByte(44)
		}
		buf.Truncate(buf.Len() - 1)
	case reflect.Slice:

		s := (*mysql.SliceHeader)(unsafe.Pointer(uint_ptr))
		uint_ptr = uintptr(s.Data)
		value := make([]string, s.Len)

		t := r.Elem()
		var if_ptr bool
		if t.Kind() == reflect.Ptr {
			t = t.Elem()
			if_ptr = true
		}
		v = reflect.NewAt(t, unsafe.Pointer(uint_ptr))
		for i := 0; i < s.Len; i++ {
			var s_uint_ptr uintptr
			if if_ptr {
				s_uint_ptr = uint_ptr + mysql.Uintptr_offset*uintptr(i)
				s_uint_ptr = *(*uintptr)(unsafe.Pointer(s_uint_ptr))
			} else {
				s_uint_ptr = uint_ptr + t.Size()*uintptr(i) //切片成员地址
			}
			switch t.Kind() {
			case reflect.Struct:
				vv := []string{}
				for i1 := 0; i1 < t.NumField(); i1++ {
					field_t := t.Field(i1)
					if field_t.Tag.Get(`db`) == `-` {
						continue
					}
					if i == 0 {
						//取出key的排列
						field.WriteString(mysql.Getkey(t.Field(i1).Name))
						field.WriteByte(44)
					}
					vv = append(vv, mysql.GetvaluefromPtr(s_uint_ptr, field_t))
				}
				value[i] = `(` + strings.Join(vv, `,`) + `)`

			default:
				libraries.DEBUG(`执行Model.InsertAll出错，不支持的slice子元素插入类型` + fmt.Sprint(t.Kind()))
				return
			}

		}
		tablename := t.Name()
		if f := v.MethodByName("TableName"); f.Kind() == reflect.Func {
			rs := f.Call(nil)
			if len(rs) == 1 && rs[0].Kind() == reflect.String {
				tablename = rs[0].String()
			}
		}
		buf.Write([]byte{82, 69, 80, 76, 65, 67, 69, 32, 73, 78, 84, 79, 32})
		buf.WriteString(config.Server.Tablepre)
		buf.WriteString(tablename)
		buf.Write([]byte{32, 40})
		field.Truncate(field.Len() - 1)
		buf.Write(field.Bytes())
		buf.Write([]byte{41, 32, 86, 65, 76, 85, 69, 83, 32})
		buf.WriteString(strings.Join(value, `,`))
	default:
		libraries.DEBUG(`执行Insert出错，不支持的插入类型` + fmt.Sprint(r.Kind()))
	}

	//sql := do + this.sql.attr + ` INTO` + this.sql.table + ` SET ` + this.extend_data(param)
	//libraries.DEBUG(buf.String())
	_, _, e := mysql.Insert(buf.Bytes(), db_index, nil, nil)
	if e != nil {
		libraries.DEBUG(`执行Model.Insert出错,sql错误信息：` + e.Error() + `,错误sql：` + buf.String())
	}
}
func insert(i interface{}, db_index int) {
	r := reflect.TypeOf(i)
	uint_ptr := uintptr(reflect2.PtrOf(i))
	for r.Kind() == reflect.Ptr {
		r = r.Elem()
	}
	buf := bufpool.Get().(*libraries.MsgBuffer)
	field := bufpool.Get().(*libraries.MsgBuffer)
	defer func() {
		bufpool.Put(buf)
		bufpool.Put(field)
	}()
	field.Reset()
	buf.Reset()

	switch r.Kind() {
	case reflect.Struct:
		buf.Write([]byte{105, 110, 115, 101, 114, 116, 32, 105, 110, 116, 111, 32})
		buf.WriteString(config.Server.Tablepre)
		buf.WriteString(r.Name())
		buf.Write([]byte{32, 83, 69, 84, 32})
		for i1 := 0; i1 < r.NumField(); i1++ {
			field_t := r.Field(i1)
			if field_t.Tag.Get(`db`) == `-` || (strings.Contains(field_t.Tag.Get(`db`), `pk`) && string(mysql.GetvaluefromPtr(uint_ptr, field_t)) == `0`) {
				continue
			}
			buf.WriteString(mysql.Getkey(field_t.Name))
			buf.WriteByte(61)
			buf.WriteString(mysql.GetvaluefromPtr(uint_ptr, field_t))
			buf.WriteByte(44)
		}
		buf.Truncate(buf.Len() - 1)
	case reflect.Slice:
		s := (*mysql.SliceHeader)(unsafe.Pointer(uint_ptr))
		uint_ptr = uintptr(s.Data)
		value := make([]string, s.Len)

		t := r.Elem()
		var if_ptr bool
		if t.Kind() == reflect.Ptr {
			t = t.Elem()
			if_ptr = true
		}
		for i := 0; i < s.Len; i++ {
			var s_uint_ptr uintptr
			if if_ptr {
				s_uint_ptr = uint_ptr + mysql.Uintptr_offset*uintptr(i)
				s_uint_ptr = *(*uintptr)(unsafe.Pointer(s_uint_ptr))
			} else {
				s_uint_ptr = uint_ptr + t.Size()*uintptr(i) //切片成员地址
			}
			switch t.Kind() {
			case reflect.Struct:
				vv := []string{}
				for i1 := 0; i1 < t.NumField(); i1++ {
					field_t := t.Field(i1)
					if field_t.Tag.Get(`db`) == `-` || (strings.Contains(field_t.Tag.Get(`db`), `pk`) && string(mysql.GetvaluefromPtr(uint_ptr, field_t)) == `0`) {
						continue
					}
					if i == 0 {
						//取出key的排列
						field.WriteString(mysql.Getkey(t.Field(i1).Name))
						field.WriteByte(44)
					}
					vv = append(vv, mysql.GetvaluefromPtr(s_uint_ptr, field_t))
				}
				value[i] = `(` + strings.Join(vv, `,`) + `)`

			default:
				libraries.DEBUG(`执行Model.InsertAll出错，不支持的slice子元素插入类型` + fmt.Sprint(t.Kind()))
				return
			}

		}
		tablename := t.Name()
		if f, ok := t.MethodByName("TableName"); ok {
			rs := f.Func.Call(nil)
			if len(rs) == 1 && rs[0].Kind() == reflect.String {
				tablename = rs[0].String()
			}
		}
		buf.Write([]byte{105, 110, 115, 101, 114, 116, 32, 105, 110, 116, 111, 32})
		buf.WriteString(config.Server.Tablepre)
		buf.WriteString(tablename)
		buf.Write([]byte{32, 40})
		field.Truncate(field.Len() - 1)
		buf.Write(field.Bytes())
		buf.Write([]byte{41, 32, 86, 65, 76, 85, 69, 83, 32})
		buf.WriteString(strings.Join(value, `,`))
	default:
		libraries.DEBUG(`执行Insert出错，不支持的插入类型` + fmt.Sprint(r.Kind()))
	}
	//libraries.DEBUG(sql)
	_, _, e := mysql.Insert(buf.Bytes(), db_index, nil, nil)
	if e != nil {
		libraries.DEBUG(`执行Model.Insert出错,sql错误信息：` + e.Error() + `,错误sql：` + buf.String())
	}
}

var member_update_chan = make(chan *Common_member, max_insert_num)

func (member *Common_member) UpdateDB() bool {
	member_update_chan <- member
	return true
}

func UpdateDB() {
	defer func() {
		if r := recover(); r != nil {
			libraries.Log("%v", r)
		}
		go UpdateDB()
	}()
	update_member_map := map[int32]*Common_member{}
	var members []*Common_member

	for {
		select {
		case m := <-member_update_chan:
			if m.Uid == 0 {
				libraries.Log("Common_member数据库写入错误,数据%+v", m)
			}
			update_member_map[m.Uid] = m
			for len(member_update_chan) > 0 {
				m := <-member_update_chan
				if m.Uid == 0 {
					libraries.Log("Common_member数据库写入错误,数据%+v", m)
				}
				update_member_map[m.Uid] = m
			}
			if len(members) < len(update_member_map) {
				members = make([]*Common_member, len(update_member_map))
			}
			var i int
			for k, m := range update_member_map {
				members[i] = m
				i++
				delete(update_member_map, k)
			}
			replace(members[:i], master_db)
		}
	}
}

var chanfull = make(chan bool)

func DBTtimer() {
	defer func() {
		if r := recover(); r != nil {
			libraries.Log("%v", r)
		}
		go DBTtimer()
	}()
	buf := new(bytes.Buffer)
	for {
		select {
		case <-time.After(time.Second):
		case <-chanfull:
		}

		if len(db_log_login_chan) > 0 {
			write := make([]*Log_login, len(db_log_login_chan))
			for k := range write {
				write[k] = <-db_log_login_chan
			}
			insert(write, log_db)
			for _, v := range write {
				log_login_chan <- v
			}
		}
		if len(db_log_member_action) > 0 {
			write := make([]*Log_member_action, len(db_log_member_action))
			for k := range write {
				write[k] = <-db_log_member_action
			}
			replace(write, log_db)
			for _, v := range write {
				log_member_action_chan <- v
			}
		}

		if len(db_log_Forum_threadmod) > 0 {
			var tid_mod = map[int32]map[int8]*Log_forum_threadmod{}
			write := make([]*Log_forum_threadmod, len(db_log_Forum_threadmod))
			for k := range write {
				tmp := <-db_log_Forum_threadmod
				write[k] = tmp
				if tid_mod[tmp.Tid] == nil {
					tid_mod[tmp.Tid] = make(map[int8]*Log_forum_threadmod)
				}
				tid_mod[tmp.Tid][tmp.ActionId] = tmp
				if tmp.Position == 0 {
					tid_mod[tmp.Tid][-1] = tmp
				}
			}
			insert(write, log_db)
			if threadmod_sqlpre == nil {
				buf.Reset()
				buf.WriteString("update ")
				buf.WriteString(config.Server.Tablepre)
				buf.WriteString(threadmod_tablename)
				buf.WriteString(" set Status = 0 where Id in (select a.Id from(select Id from ")
				buf.WriteString(config.Server.Tablepre)
				buf.WriteString(threadmod_tablename)
				buf.WriteString(" where Status=1 and ")
				threadmod_sqlpre = make([]byte, buf.Len())
				copy(threadmod_sqlpre, buf.Bytes())
			}

			for _, mod := range tid_mod {
				for act_id, v := range mod {
					if act_id == -1 {
						last := v
						var cacheinfo *Log_forum_threadmod
						if cache, ok := Lastthreadmod.Load(last.Tid); ok {
							cacheinfo = cache.(*Log_forum_threadmod)
						} else {
							cacheinfo = &Log_forum_threadmod{Tid: last.Tid}
							Lastthreadmod.Store(last.Tid, cacheinfo)
						}
						cacheinfo.Uid = last.Uid
						cacheinfo.Dateline = last.Dateline
						cacheinfo.Expiration = last.Expiration
						cacheinfo.Action = last.Action
						cacheinfo.Status = last.Status
						cacheinfo.Param = last.Param
						cacheinfo.Param1 = last.Param1
						cacheinfo.Reason = last.Reason
					} else {
						buf.Reset()
						buf.Write(threadmod_sqlpre)
						buf.WriteString("ActionId = ")
						buf.WriteString(strconv.Itoa(int(v.ActionId)))
						buf.WriteString(" and Tid = ")
						buf.WriteString(strconv.Itoa(int(v.Tid)))
						buf.WriteString(" order by Id desc limit 1,100) as a)")
						_, e := mysql.Query_getaffected(buf.Bytes(), log_db, nil, nil)
						if e != nil {
							libraries.DEBUG("Forum_threadmod修改状态失败", e)
						}
					}

				}

			}

			for _, v := range write {
				log_Forum_threadmod_chan <- v
			}
		}
		if len(db_log_Forum_modwork) > 0 {
			write := make([]*Log_forum_modwork, len(db_log_Forum_modwork))
			for k := range write {
				write[k] = <-db_log_Forum_modwork
			}
			insert(write, log_db)

		}
		if len(db_log_Forum_warning) > 0 {
			write := make([]*Log_forum_warning, len(db_log_Forum_warning))
			for k := range write {
				write[k] = <-db_log_Forum_warning
			}
			insert(write, log_db)
			for _, v := range write {
				log_Forum_warning_chan <- v
			}
		}
	}

}
func (count *Common_member_count) UpdateLastip(ip string) {
	count.Lastip = ip
	buf := bufpool.Get().(*libraries.MsgBuffer)
	defer func() {
		bufpool.Put(buf)
	}()
	buf.Reset()
	buf.WriteString("update Common_member_count set Lastip = '")
	buf.WriteString(ip)
	buf.WriteString("' where Uid=")
	buf.WriteString(strconv.Itoa(int(count.Uid)))
	_, _, e := mysql.Insert(buf.Bytes(), master_db, nil, nil)
	if e != nil {
		libraries.DEBUG(`执行Model.update出错,sql错误信息：` + e.Error() + `,错误sql：` + buf.String())
	}
}
func (count *Common_member_count) UpdateLastvisit(onlineTime, lastvisit int32) {
	count.Oltime += onlineTime
	count.Lastvisit = lastvisit
	buf := bufpool.Get().(*libraries.MsgBuffer)
	defer func() {
		bufpool.Put(buf)
	}()
	buf.Reset()
	buf.WriteString("update Common_member_count set Oltime = Oltime+")
	buf.WriteString(strconv.Itoa(int(onlineTime)))
	buf.WriteString(",Lastvisit=")
	buf.WriteString(strconv.Itoa(int(lastvisit)))
	buf.WriteString(" where Uid=")
	buf.WriteString(strconv.Itoa(int(count.Uid)))
	_, _, e := mysql.Insert(buf.Bytes(), master_db, nil, nil)
	if e != nil {
		libraries.DEBUG(`执行Model.update出错,sql错误信息：` + e.Error() + `,错误sql：` + buf.String())
	}
}
func (count *Common_member_count) AddViews() {
	count.Views++
	buf := bufpool.Get().(*libraries.MsgBuffer)
	defer func() {
		bufpool.Put(buf)
	}()
	buf.Reset()
	buf.WriteString("update Common_member_count set Views = Views+1 where Uid=")
	buf.WriteString(strconv.Itoa(int(count.Uid)))
	_, _, e := mysql.Insert(buf.Bytes(), master_db, nil, nil)
	if e != nil {
		libraries.DEBUG(`执行Model.update出错,sql错误信息：` + e.Error() + `,错误sql：` + buf.String())
	}
}
func (count *Common_member_count) Addattachsize(size int32) {
	count.Todayattachs++
	count.Todayattachsize += size
	buf := bufpool.Get().(*libraries.MsgBuffer)
	defer func() {
		bufpool.Put(buf)
	}()
	buf.Reset()
	buf.WriteString("update Common_member_count set Todayattachs = Todayattachs+1,Todayattachsize=Todayattachsize+")
	buf.WriteString(strconv.Itoa(int(size)))
	buf.WriteString(" where Uid=")
	buf.WriteString(strconv.Itoa(int(count.Uid)))
	_, _, e := mysql.Insert(buf.Bytes(), master_db, nil, nil)
	if e != nil {
		libraries.DEBUG(`执行Model.update出错,sql错误信息：` + e.Error() + `,错误sql：` + buf.String())
	}
}

func (view *Forum_thread_data) AddViews() {
	view.Views++
	buf := bufpool.Get().(*libraries.MsgBuffer)
	defer func() {
		bufpool.Put(buf)
	}()
	buf.Reset()
	buf.WriteString("update Forum_thread_data set Views = Views+1 where Tid=")
	buf.WriteString(strconv.Itoa(int(view.Tid)))
	_, _, e := mysql.Insert(buf.Bytes(), master_db, nil, nil)
	if e != nil {
		libraries.DEBUG(`执行Model.update出错,sql错误信息：` + e.Error() + `,错误sql：` + buf.String())
	}
}
