package mysql

import (
	"bytes"
	"errors"
	"fmt"
	"reflect"
	"strconv"
	"strings"
	"unsafe"

	"github.com/modern-go/reflect2"
)

var Tablepre []byte

type Mysql_Build struct {
	Transaction *Transaction
	sql         *sql_buffer
	buffer      *MsgBuffer
	prepare     bool
	prepare_arg []interface{}
	Result      MysqlResult
}
type sql_buffer struct {
	field       MsgBuffer
	table       MsgBuffer
	where       MsgBuffer
	group       MsgBuffer
	order       MsgBuffer
	limit       MsgBuffer
	lock        MsgBuffer
	join        MsgBuffer
	on          MsgBuffer
	master      int
	totle_count int
	attr        MsgBuffer
	raw         MsgBuffer
}
type MysqlResult interface {
	RowsAffected(int64)
}

func New_mysqlBuild() *Mysql_Build {
	t := &Mysql_Build{buffer: new(MsgBuffer), sql: new(sql_buffer)}
	return t
}

//拼装mysql语句
func (this *Mysql_Build) Reset() {
	//DEBUG(`sql语句`, this.buffer.String())
	this.sql.field.Reset()
	this.sql.where.Reset()
	this.sql.attr.Reset()
	this.sql.group.Reset()
	this.sql.join.Reset()
	this.sql.limit.Reset()
	this.sql.lock.Reset()
	this.sql.on.Reset()
	this.sql.order.Reset()
	this.sql.table.Reset()
	this.sql.table.Write(Tablepre)
	this.sql.field.WriteByte(42)
	this.sql.totle_count = -1
	this.sql.master = 1
	this.sql.limit.Write([]byte{32, 76, 73, 77, 73, 84, 32, 49, 48, 48, 48})
	this.prepare = false
	this.prepare_arg = this.prepare_arg[:0]
	this.Transaction = nil
	this.sql.raw.Reset()
}
func (this *Mysql_Build) Tablename(tablename string) {
	this.sql.table.WriteString(tablename)
}

//标记需要进行预处理
func (this *Mysql_Build) Prepare() *Mysql_Build {
	this.prepare = true
	return this
}

//where Join on 多表联合查询,暂达成双表联查
func (this *Mysql_Build) LeftJoin(t string) *Mysql_Build {
	this.sql.join.Write([]byte{32, 108, 101, 102, 116, 32, 106, 111, 105, 110, 32})
	this.sql.join.WriteString(t)
	return this
}

func (this *Mysql_Build) Lock(lock bool) *Mysql_Build {
	if lock {
		this.sql.lock.WriteString(` FOR UPDATE`)
	}
	return this
}

func (this *Mysql_Build) On(on string) *Mysql_Build {
	this.sql.on.Write([]byte{32, 111, 110, 32})
	this.sql.on.WriteString(on)
	return this
}
func (this *Mysql_Build) Where(conditions ...interface{}) *Mysql_Build {
	if len(conditions) == 0 {
		return this
	}
	var where map[string]interface{}
	if len(conditions) == 1 {
		condition := conditions[0]

		switch condition.(type) {
		case string:
			this.sql.where.Write([]byte{32, 119, 104, 101, 114, 101, 32})
			this.sql.where.WriteString(condition.(string))
			return this
		case map[string]interface{}:
			where = condition.(map[string]interface{})
		case nil:
			return this
		default:
			t := reflect.TypeOf(condition)
			DEBUG(`Model.where condition不支持类型`, t.Name())
		}
		if len(where) == 0 {
			return this
		}
	} else if str, ok := conditions[0].(string); ok {
		this.sql.where.Write([]byte{32, 119, 104, 101, 114, 101, 32})
		if this.prepare {
			this.sql.where.WriteString(str)
			for i := 1; i < len(conditions); i++ {
				this.prepare_arg = append(this.prepare_arg, conditions[i])
			}
			return this
		} else {
			for i := 1; i < len(conditions); i++ {
				str = strings.Replace(str, "?", Getvalue(conditions[i]), 1)
			}
			this.sql.where.WriteString(str)
		}
	}

	/*where_s := make([]string, len(where))
	var i int
	for key, _ := range where {
		where_s[i] = key
		i++
	}
	sort.Strings(where_s)*/
	//支持where[`a|b`]=`c`,等于语句( a=c or b=c )
	this.sql.where.Write([]byte{32, 119, 104, 101, 114, 101, 32})
	for keys, value := range where {
		//value := where[keys]
		this.buffer.Reset()
		if strings.Index(keys, `|`) > 0 {
			k := strings.Split(keys, `|`)
			for _, key := range k {
				this._where(key, value)
				this.buffer.Write([]byte{32, 111, 114, 32})
			}
			this.sql.where.Write(this.buffer.Next(this.buffer.Len() - 4))
		} else {
			this._where(keys, value)
			this.sql.where.Write(this.buffer.Bytes())
		}
		this.sql.where.Write([]byte{32, 97, 110, 100, 32})
	}
	this.sql.where.Truncate(this.sql.where.Len() - 5)
	//this.sql.where = ` where ` + strings.Join(str, " and ")
	if this.sql.join.Len() > 0 {
		this.sql.where.Write(bytes.Replace(this.sql.where.Next(this.sql.where.Len()), []byte{96}, nil, -1))
	}
	return this
}

//全or模式
func (this *Mysql_Build) WhereOr(condition map[string]interface{}) *Mysql_Build {
	this.sql.where.Write([]byte{32, 119, 104, 101, 114, 101, 32})
	for key, value := range condition {
		this.buffer.Reset()
		this._where(key, value)
		this.sql.where.Write(this.buffer.Bytes())
		this.sql.where.Write([]byte{32, 111, 114, 32})
	}
	this.sql.where.Truncate(this.sql.where.Len() - 4)
	if this.sql.join.Len() > 0 {
		this.sql.where.Write(bytes.Replace(this.sql.where.Next(this.sql.where.Len()), []byte{96}, nil, -1))
	}
	return this
}
func (this *Mysql_Build) _where(key string, value interface{}) {
	switch value.(type) {
	case string:
		this.buffer.WriteString(Getkey(key))
		if this.prepare {
			this.buffer.Write([]byte{61, 63})
			this.prepare_arg = append(this.prepare_arg, value)
		} else {
			this.buffer.WriteByte(61)
			this.buffer.WriteString(Getvalue(value))
		}

	case float32:
		this.buffer.WriteString(Getkey(key))
		if this.prepare {
			this.buffer.Write([]byte{61, 63})
			this.prepare_arg = append(this.prepare_arg, value)
		} else {
			this.buffer.WriteByte(61)
			this.buffer.WriteString(Getvalue(value))
		}
	case float64:
		this.buffer.WriteString(Getkey(key))
		if this.prepare {
			this.buffer.Write([]byte{61, 63})
			this.prepare_arg = append(this.prepare_arg, value)
		} else {
			this.buffer.WriteByte(61)
			this.buffer.WriteString(Getvalue(value))
		}
	case int:
		this.buffer.WriteString(Getkey(key))
		if this.prepare {
			this.buffer.Write([]byte{61, 63})
			this.prepare_arg = append(this.prepare_arg, value)
		} else {
			this.buffer.WriteByte(61)
			this.buffer.WriteString(Getvalue(value))
		}
	case int8:
		this.buffer.WriteString(Getkey(key))
		if this.prepare {
			this.buffer.Write([]byte{61, 63})
			this.prepare_arg = append(this.prepare_arg, value)
		} else {
			this.buffer.WriteByte(61)
			this.buffer.WriteString(Getvalue(value))
		}
	case int16:
		this.buffer.WriteString(Getkey(key))
		if this.prepare {
			this.buffer.Write([]byte{61, 63})
			this.prepare_arg = append(this.prepare_arg, value)
		} else {
			this.buffer.WriteByte(61)
			this.buffer.WriteString(Getvalue(value))
		}
	case int32:
		this.buffer.WriteString(Getkey(key))
		if this.prepare {
			this.buffer.Write([]byte{61, 63})
			this.prepare_arg = append(this.prepare_arg, value)
		} else {
			this.buffer.WriteByte(61)
			this.buffer.WriteString(Getvalue(value))
		}
	case int64:
		this.buffer.WriteString(Getkey(key))
		if this.prepare {
			this.buffer.Write([]byte{61, 63})
			this.prepare_arg = append(this.prepare_arg, value)
		} else {
			this.buffer.WriteByte(61)
			this.buffer.WriteString(Getvalue(value))
		}
	case uint:
		this.buffer.WriteString(Getkey(key))
		if this.prepare {
			this.buffer.Write([]byte{61, 63})
			this.prepare_arg = append(this.prepare_arg, value)
		} else {
			this.buffer.WriteByte(61)
			this.buffer.WriteString(Getvalue(value))
		}
	case uint8:
		this.buffer.WriteString(Getkey(key))
		if this.prepare {
			this.buffer.Write([]byte{61, 63})
			this.prepare_arg = append(this.prepare_arg, value)
		} else {
			this.buffer.WriteByte(61)
			this.buffer.WriteString(Getvalue(value))
		}
	case uint16:
		this.buffer.WriteString(Getkey(key))
		if this.prepare {
			this.buffer.Write([]byte{61, 63})
			this.prepare_arg = append(this.prepare_arg, value)
		} else {
			this.buffer.WriteByte(61)
			this.buffer.WriteString(Getvalue(value))
		}
	case uint32:
		this.buffer.WriteString(Getkey(key))
		if this.prepare {
			this.buffer.Write([]byte{61, 63})
			this.prepare_arg = append(this.prepare_arg, value)
		} else {
			this.buffer.WriteByte(61)
			this.buffer.WriteString(Getvalue(value))
		}
	case uint64:
		this.buffer.WriteString(Getkey(key))
		if this.prepare {
			this.buffer.Write([]byte{61, 63})
			this.prepare_arg = append(this.prepare_arg, value)
		} else {
			this.buffer.WriteByte(61)
			this.buffer.WriteString(Getvalue(value))
		}
	case []byte:
		this.buffer.WriteString(Getkey(key))
		if this.prepare {
			this.buffer.Write([]byte{61, 63})
			this.prepare_arg = append(this.prepare_arg, value)
		} else {
			this.buffer.WriteByte(61)
			this.buffer.WriteString(Getvalue(value))
		}
	case bool:
		this.buffer.WriteString(Getkey(key))
		if this.prepare {
			this.buffer.Write([]byte{61, 63})
			this.prepare_arg = append(this.prepare_arg, value)
		} else {
			this.buffer.WriteByte(61)
			this.buffer.WriteString(Getvalue(value))
		}
	case []string:
		this._where_string(key, value)
	case []int32:
		if len(value.([]int32)) == 0 {
			return
		}
		this.buffer.WriteString(Getkey(key))
		this.buffer.Write([]byte{32, 73, 78, 32, 40})
		for _, v := range value.([]int32) {
			this.buffer.WriteString(strconv.Itoa(int(v)))
			this.buffer.WriteByte(44)
		}
		this.buffer.Truncate(this.buffer.Len() - 1)
		this.buffer.WriteByte(41)
	case []int8:
		if len(value.([]int8)) == 0 {
			return
		}
		this.buffer.WriteString(Getkey(key))
		this.buffer.Write([]byte{32, 73, 78, 32, 40})
		for _, v := range value.([]int8) {
			this.buffer.WriteString(strconv.Itoa(int(v)))
			this.buffer.WriteByte(44)
		}
		this.buffer.Truncate(this.buffer.Len() - 1)
		this.buffer.WriteByte(41)
	case []int16:
		if len(value.([]int16)) == 0 {
			return
		}
		this.buffer.WriteString(Getkey(key))
		this.buffer.Write([]byte{32, 73, 78, 32, 40})
		for _, v := range value.([]int16) {
			this.buffer.WriteString(strconv.Itoa(int(v)))
			this.buffer.WriteByte(44)
		}
		this.buffer.Truncate(this.buffer.Len() - 1)
		this.buffer.WriteByte(41)
	case []int64:
		if len(value.([]int64)) == 0 {
			return
		}
		this.buffer.WriteString(Getkey(key))
		this.buffer.Write([]byte{32, 73, 78, 32, 40})
		for _, v := range value.([]int64) {
			this.buffer.WriteString(strconv.Itoa(int(v)))
			this.buffer.WriteByte(44)
		}
		this.buffer.Truncate(this.buffer.Len() - 1)
		this.buffer.WriteByte(41)
	case []int:
		if len(value.([]int)) == 0 {
			return
		}
		this.buffer.WriteString(Getkey(key))
		this.buffer.Write([]byte{32, 73, 78, 32, 40})
		for _, v := range value.([]int) {
			this.buffer.WriteString(strconv.Itoa(v))
			this.buffer.WriteByte(44)
		}
		this.buffer.Truncate(this.buffer.Len() - 1)
		this.buffer.WriteByte(41)
	case []interface{}:
		this._where_interface(key, value)
	default:
		t := reflect.TypeOf(value)
		DEBUG(`Model.where未设置类型`, t.Name())
	}
}
func (this *Mysql_Build) _where_string(key string, value interface{}) {
	switch value.([]string)[0] {
	case `in`:
		this.buffer.WriteString(Getkey(key))
		this.buffer.Write([]byte{32, 73, 78, 32, 40})
		this.buffer.WriteString(strings.Replace(Getvalue(value.([]string)[1]), `,`, `','`, -1))
		this.buffer.WriteByte(41)
		//return key + ` IN (` + strings.Replace(Getvalue(value.([]string)[1]), `,`, `','`, -1) + `)`
	case `gt`, ">":
		this.buffer.WriteString(Getkey(key))
		this.buffer.WriteByte(62)
		this.buffer.WriteString(Getvalue(value.([]string)[1]))
		//return key + ` > ` + Getvalue(value.([]string)[1])
	case `egt`, ">=":
		this.buffer.WriteString(Getkey(key))
		this.buffer.Write([]byte{62, 61})
		this.buffer.WriteString(Getvalue(value.([]string)[1]))
		//return key + ` >= ` + Getvalue(value.([]string)[1])
	case `lt`, "<":
		this.buffer.WriteString(Getkey(key))
		this.buffer.WriteByte(60)
		this.buffer.WriteString(Getvalue(value.([]string)[1]))
		//return key + ` < ` + Getvalue(value.([]string)[1])
	case `elt`, "<=":
		this.buffer.WriteString(Getkey(key))
		this.buffer.Write([]byte{60, 61})
		this.buffer.WriteString(Getvalue(value.([]string)[1]))
		//return key + ` <= ` + Getvalue(value.([]string)[1])
	case `neq`, "!=":
		this.buffer.WriteString(Getkey(key))
		this.buffer.Write([]byte{33, 61})
		this.buffer.WriteString(Getvalue(value.([]string)[1]))
	//return key + ` != ` + Getvalue(value.([]string)[1])
	case `eq`, "=":
		this.buffer.WriteString(Getkey(key))
		this.buffer.Write([]byte{61})
		this.buffer.WriteString(Getvalue(value.([]string)[1]))
	case `notlike`:
		this.buffer.WriteString(Getkey(key))
		this.buffer.Write([]byte{32, 110, 111, 116, 32, 108, 105, 107, 101, 32})
		this.buffer.WriteString(Getvalue(value.([]string)[1]))
		//return key + ` not like ` + Getvalue(value.([]string)[1])
	case `match`:
		this.buffer.Write([]byte{77, 65, 84, 67, 72, 32, 40})
		this.buffer.WriteString(Getkey(key))
		this.buffer.Write([]byte{41, 32, 65, 71, 65, 73, 78, 83, 84, 32, 40})
		this.buffer.WriteString(Getvalue(value.([]string)[1]))
		this.buffer.Write([]byte{32, 73, 78, 32, 66, 79, 79, 76, 69, 65, 78, 32, 77, 79, 68, 69, 41})
		//return `MATCH (` + key + `) AGAINST (` + Getvalue(value.([]string)[1]) + ` IN BOOLEAN MODE)`
	default:
		this.buffer.WriteString(Getkey(key))
		this.buffer.WriteByte(32)
		this.buffer.WriteString(Getvalue(value.([]string)[0]))
		this.buffer.WriteByte(32)
		this.buffer.WriteString(Getvalue(value.([]string)[1]))
		//return key + ` ` + Getvalue(value.([]string)[0]) + ` ` + Getvalue(value.([]string)[1])
	}
}
func (this *Mysql_Build) _where_interface(key string, value interface{}) {
	val := value.([]interface{})
	if val[1] != nil {
		switch (val[0]).(string) {
		case `in`:
			switch val[1].(type) {
			case []string:
				this.buffer.WriteString(Getkey(key))
				this.buffer.Write([]byte{32, 73, 78, 32, 40})
				if len((val[1]).([]string)) > 0 {
					for _, v := range (val[1]).([]string) {
						this.buffer.WriteString(Getvalue(v))
						this.buffer.WriteByte(44)
					}
					this.buffer.Truncate(this.buffer.Len() - 1)
				} else {
					this.buffer.Write([]byte{110, 117, 108, 108})
				}
				this.buffer.WriteByte(41)
				//return key + ` IN (` + strings.Join(c, `,`) + `)`

			case string:
				this.buffer.WriteString(Getkey(key))
				this.buffer.Write([]byte{32, 73, 78, 32, 40})
				this.buffer.WriteString(strings.Replace(Getvalue((val[1])), `,`, `','`, -1))
				this.buffer.WriteByte(41)
				//return key + ` IN (` + strings.Replace(Getvalue((val[1])), `,`, `','`, -1) + `)`
			case []int:
				this.buffer.WriteString(Getkey(key))
				this.buffer.Write([]byte{32, 73, 78, 32, 40})
				if len((val[1]).([]int)) > 0 {
					for _, v := range (val[1]).([]int) {
						this.buffer.WriteString(Getvalue(v))
						this.buffer.WriteByte(44)
					}
					this.buffer.Truncate(this.buffer.Len() - 1)
				} else {
					this.buffer.Write([]byte{110, 117, 108, 108})
				}
				this.buffer.WriteByte(41)
				//return key + ` IN (` + strings.Join(c, `,`) + `)`
			case []int8:
				this.buffer.WriteString(Getkey(key))
				this.buffer.Write([]byte{32, 73, 78, 32, 40})
				if len((val[1]).([]int8)) > 0 {
					for _, v := range (val[1]).([]int8) {
						this.buffer.WriteString(Getvalue(v))
						this.buffer.WriteByte(44)
					}
					this.buffer.Truncate(this.buffer.Len() - 1)
				} else {
					this.buffer.Write([]byte{110, 117, 108, 108})
				}
				this.buffer.WriteByte(41)
				//return key + ` IN (` + strings.Join(c, `,`) + `)`
			case []int16:
				this.buffer.WriteString(Getkey(key))
				this.buffer.Write([]byte{32, 73, 78, 32, 40})
				if len((val[1]).([]int16)) > 0 {
					for _, v := range (val[1]).([]int16) {
						this.buffer.WriteString(Getvalue(v))
						this.buffer.WriteByte(44)
					}
					this.buffer.Truncate(this.buffer.Len() - 1)
				} else {
					this.buffer.Write([]byte{110, 117, 108, 108})
				}
				this.buffer.WriteByte(41)
				//return key + ` IN (` + strings.Join(c, `,`) + `)`
			case []int32:
				this.buffer.WriteString(Getkey(key))
				this.buffer.Write([]byte{32, 73, 78, 32, 40})
				if len((val[1]).([]int32)) > 0 {
					for _, v := range (val[1]).([]int32) {
						if this.prepare {
							this.buffer.WriteByte(63)
							this.prepare_arg = append(this.prepare_arg, v)
						} else {
							this.buffer.WriteString(Getvalue(v))
						}
						this.buffer.WriteByte(44)
					}
					this.buffer.Truncate(this.buffer.Len() - 1)
				} else {
					this.buffer.Write([]byte{110, 117, 108, 108})
				}

				this.buffer.WriteByte(41)
				//return key + ` IN (` + strings.Join(c, `,`) + `)`
			case []int64:
				this.buffer.WriteString(Getkey(key))
				this.buffer.Write([]byte{32, 73, 78, 32, 40})
				if len((val[1]).([]int64)) > 0 {
					for _, v := range (val[1]).([]int64) {
						this.buffer.WriteString(Getvalue(v))
						this.buffer.WriteByte(44)
					}
					this.buffer.Truncate(this.buffer.Len() - 1)
				} else {
					this.buffer.Write([]byte{110, 117, 108, 108})
				}
				this.buffer.WriteByte(41)
				//return key + ` IN (` + strings.Join(c, `,`) + `)`
			default:
				t := reflect.TypeOf(val[1])
				DEBUG(`Model.where []interface{} in未设置类型`, t.Name())
			}
		case `time`:
			fallthrough
		case `between`:
			switch val[1].(type) {
			case []string:
				this.buffer.WriteString(Getkey(key))
				this.buffer.Write([]byte{32, 98, 101, 116, 119, 101, 101, 110, 32})
				this.buffer.WriteString(Getvalue((val[1]).([]string)[0]))
				this.buffer.Write([]byte{32, 97, 110, 100, 32})
				this.buffer.WriteString(Getvalue((val[1]).([]string)[1]))
				//return key + ` between ` + Getvalue((val[1]).([]string)[0]) + ` and ` + Getvalue((val[1]).([]string)[1])
			case []int64:
				this.buffer.WriteString(Getkey(key))
				this.buffer.Write([]byte{32, 98, 101, 116, 119, 101, 101, 110, 32})
				this.buffer.WriteString(Getvalue((val[1]).([]int64)[0]))
				this.buffer.Write([]byte{32, 97, 110, 100, 32})
				this.buffer.WriteString(Getvalue((val[1]).([]int64)[1]))
				//return key + ` between ` + begin + ` and ` + end
			case []int:
				this.buffer.WriteString(Getkey(key))
				this.buffer.Write([]byte{32, 98, 101, 116, 119, 101, 101, 110, 32})
				this.buffer.WriteString(Getvalue((val[1]).([]int)[0]))
				this.buffer.Write([]byte{32, 97, 110, 100, 32})
				this.buffer.WriteString(Getvalue((val[1]).([]int)[1]))
				//return key + ` between ` + begin + ` and ` + end
			default:
				t := reflect.TypeOf(val[1])
				DEBUG(`Model.where []interface{} between未设置类型`, t.Name())
			}
		case `and`:
			fallthrough
		case `or`:
			switch val[1].(type) {
			case []interface{}:
				tmp_b := []byte(` ` + Getkey(val[0].(string)) + ` `)
				for _, v := range val[1].([]interface{}) {
					switch v.(type) {
					case []interface{}:
						this._where_interface(key, v.([]interface{}))
					case []string:
						this._where_string(key, v.([]string))
					default:
						t := reflect.TypeOf(val[0])
						DEBUG(`Model.where []interface{} and,or 具体数据未设置类型`, t.Name())
						return
					}
					this.buffer.Write(tmp_b)
				}
				this.buffer.Truncate(this.buffer.Len() - len(tmp_b))
			default:
				t := reflect.TypeOf(val[0])
				DEBUG(`Model.where []interface{} and,or 未设置类型`, t.Name())
			}
		case `gt`, ">":
			this.buffer.WriteString(Getkey(key))
			this.buffer.WriteByte(62)
			this.buffer.WriteString(Getvalue(value.([]interface{})[1]))
			//return key + ` > ` + Getvalue(value.([]interface{})[1])
		case `egt`, ">=":
			this.buffer.WriteString(Getkey(key))
			this.buffer.Write([]byte{62, 61})
			this.buffer.WriteString(Getvalue(value.([]interface{})[1]))
			//return key + ` >= ` + Getvalue(value.([]interface{})[1])
		case `lt`, "<":
			this.buffer.WriteString(Getkey(key))
			this.buffer.WriteByte(60)
			this.buffer.WriteString(Getvalue(value.([]interface{})[1]))
			//return key + ` < ` + Getvalue(value.([]interface{})[1])
		case `elt`, "<=":
			this.buffer.WriteString(Getkey(key))
			this.buffer.Write([]byte{60, 61})
			this.buffer.WriteString(Getvalue(value.([]interface{})[1]))
			//return key + ` <= ` + Getvalue(value.([]interface{})[1])
		case `neq`, "!=":
			this.buffer.WriteString(Getkey(key))
			this.buffer.Write([]byte{33, 61})
			this.buffer.WriteString(Getvalue(value.([]interface{})[1]))
		//return key + ` != ` + Getvalue(value.([]interface{})[1])
		case `eq`, "=":
			this.buffer.WriteString(Getkey(key))
			this.buffer.Write([]byte{61})
			this.buffer.WriteString(Getvalue(value.([]interface{})[1]))
		case `notlike`:
			this.buffer.WriteString(Getkey(key))
			this.buffer.Write([]byte{32, 110, 111, 116, 32, 108, 105, 107, 101, 32})
			this.buffer.WriteString(Getvalue(value.([]interface{})[1]))
			//return key + ` not like  ` + Getvalue(value.([]interface{})[1])
		case `match`:
			this.buffer.Write([]byte{77, 65, 84, 67, 72, 32, 40})
			this.buffer.WriteString(Getkey(key))
			this.buffer.Write([]byte{41, 32, 65, 71, 65, 73, 78, 83, 84, 32, 40})
			this.buffer.WriteString(Getvalue(value.([]interface{})[1]))
			this.buffer.Write([]byte{32, 73, 78, 32, 66, 79, 79, 76, 69, 65, 78, 32, 77, 79, 68, 69, 41})
			//return `MATCH (` + key + `) AGAINST (` + Getvalue(value.([]interface{})[1]) + ` IN BOOLEAN MODE)`
		case `like`:
			switch val[1].(type) {
			case string:
				this._where_string(key, value)
			default:
				t := reflect.TypeOf(val[1])
				DEBUG(`Model.where []interface{}的`+val[0].(string)+`未设置类型 `, t.Name())
			}
		default:
			DEBUG(`Model.where []interface{}未设置类型`, val[0])
		}
	}
}

/*func (this *Mysql_Build) Transaction(sql *Transaction) *Mysql_Build {
	this.model.Ctx = sql
	return this
}*/

//是否检测注入 强制检查
/*func (this *Mysql_Build) Check(check bool) *Mysql_Build {
	if check == false {
		this.sql.check = `false`
	}
	return this
}*/

func (this *Mysql_Build) Field(field string) *Mysql_Build {
	if field == `` {
		return this
	}
	this.sql.field.Reset()
	this.sql.field.WriteString(field)
	return this
}

func (this *Mysql_Build) Order(order string) *Mysql_Build {
	if order != `` {
		order = strings.Replace(strings.ToLower(order), `order by`, ``, -1)
		this.sql.order.Write([]byte{32, 79, 82, 68, 69, 82, 32, 66, 89, 32})
		this.sql.order.WriteString(order)
	}
	return this
}

func (this *Mysql_Build) Group(group string) *Mysql_Build {
	if group != `` {
		this.sql.group.Write([]byte{32, 103, 114, 111, 117, 112, 32, 98, 121, 32})
		this.sql.group.WriteString(group)
	}

	return this
}

func (this *Mysql_Build) Limit(limit ...int) *Mysql_Build {
	if len(limit) == 0 {
		return this
	}
	if len(limit) == 1 && limit[0] == 0 {
		this.sql.limit.Reset()
	} else {
		this.sql.limit.Reset()
		this.sql.limit.Write([]byte{32, 76, 73, 77, 73, 84, 32})
		switch len(limit) {
		case 1:
			this.sql.limit.WriteString(strconv.Itoa(limit[0]))
		case 2:
			this.sql.limit.WriteString(strconv.Itoa(limit[0]))
			this.sql.limit.WriteString(",")
			this.sql.limit.WriteString(strconv.Itoa(limit[1]))
		}

	}

	return this
}

//是否操作主数据库
func (this *Mysql_Build) Master(master bool) *Mysql_Build {
	if master {
		this.sql.master = 0
	}
	return this
}

/*传入格式
 *[]int{页数,每页数量}  如1,10，返回前10个
 */
func (this *Mysql_Build) Page(page []int) *Mysql_Build {
	if len(page) == 0 {
		return this
	}
	if len(page) > 1 && page[0] > 0 {
		this.sql.limit.Reset()

		if this.prepare {
			this.sql.limit.Write([]byte{32, 76, 73, 77, 73, 84, 32, 63, 44, 63}) // LIMIT ?,?
			this.prepare_arg = append(this.prepare_arg, (page[0]-1)*page[1], page[1])
		} else {
			this.sql.limit.Write([]byte{32, 76, 73, 77, 73, 84, 32})
			this.sql.limit.WriteString(strconv.Itoa((page[0] - 1) * page[1]))
			this.sql.limit.WriteByte(44)
			this.sql.limit.WriteString(strconv.Itoa(page[1]))
		}

	}

	return this
}

func (this *Mysql_Build) Attr(attr string) *Mysql_Build {
	for _, a := range []string{`LOW_PRIORITY`, `QUICK`, `IGNORE`, `HIGH_PRIORITY`, `SQL_CACHE`, `SQL_NO_CACHE`} {
		if a == attr {
			this.sql.attr.WriteByte(32)
			this.sql.attr.WriteString(attr)
			break
		}

	}
	return this
}

/*func (this *Mysql_Build) Select_sql() string {
	if len(this.page) > 1 && this.page[0] > 0 {
		this.model.Totle_num = this.sql.totle_count
		this.sql.limit.Reset()
		this.sql.limit.Write([]byte{32, 76, 73, 77, 73, 84, 32})
		this.sql.limit.WriteString(strconv.Itoa((this.page[0] - 1) * this.page[1]))
		this.sql.limit.WriteByte(44)
		this.sql.limit.WriteString(strconv.Itoa(this.page[1]))
		//this.sql.limit = ` LIMIT ` + strconv.Itoa((this.page[0]-1)*this.page[1]) + `,` + strconv.Itoa(this.page[1])
	}
	this.buffer.Reset()
	this.buffer.Write([]byte{115, 101, 108, 101, 99, 116, 32})
	this.buffer.Write(this.sql.field.Bytes())
	this.buffer.Write([]byte{32, 102, 114, 111, 109})
	this.buffer.Write(this.sql.table.Bytes())
	//this.buffer.Write(this.sql.join.Bytes())
	this.buffer.Write(this.sql.on.Bytes())
	this.buffer.Write(this.sql.where.Bytes())
	this.buffer.Write(this.sql.group.Bytes())
	this.buffer.Write(this.sql.order.Bytes())
	this.buffer.Write(this.sql.limit.Bytes())
	this.buffer.Write(this.sql.lock.Bytes())
	return this.buffer.String()
}*/

//
//当传入struct时候，只取type成员小写对应的字段
func (this *Mysql_Build) Select(s interface{}) (err error) {

	this.buffer.Reset()
	this.buffer.Write([]byte{115, 101, 108, 101, 99, 116, 32})
	this.buffer.Write(this.sql.field.Bytes())
	this.buffer.Write([]byte{32, 102, 114, 111, 109})
	this.buffer.Write(this.sql.table.Bytes())
	//this.buffer.Write(this.sql.join.Bytes())
	this.buffer.Write(this.sql.on.Bytes())
	this.buffer.Write(this.sql.where.Bytes())
	this.buffer.Write(this.sql.group.Bytes())
	this.buffer.Write(this.sql.order.Bytes())
	this.buffer.Write(this.sql.limit.Bytes())
	this.buffer.Write(this.sql.lock.Bytes())
	//sql := `select ` + this.sql.field + ` from` + this.sql.table + this.sql.join + this.sql.on + this.sql.where + this.sql.group + this.sql.order + this.sql.limit + this.sql.lock

	e := Query(this.buffer.Bytes(), this.sql.master, this.prepare_arg, this.Transaction, s)
	//DEBUG(`sql语句`, this.buffer.String())
	if e != nil {
		err = errors.New(`执行Model.Select出错,sql错误信息：` + e.Error() + `,错误sql：` + this.buffer.String() + "  参数 " + fmt.Sprintf("%+v", this.prepare_arg))
	}

	return
}
func (this *Mysql_Build) Select_Key(key string) (map[string]map[string]string, error) {

	this.buffer.Reset()
	this.buffer.Write([]byte{115, 101, 108, 101, 99, 116, 32})
	this.buffer.Write(this.sql.field.Bytes())
	this.buffer.Write([]byte{32, 102, 114, 111, 109})
	this.buffer.Write(this.sql.table.Bytes())
	//this.buffer.Write(this.sql.join.Bytes())
	this.buffer.Write(this.sql.on.Bytes())
	this.buffer.Write(this.sql.where.Bytes())
	this.buffer.Write(this.sql.group.Bytes())
	this.buffer.Write(this.sql.order.Bytes())
	this.buffer.Write(this.sql.limit.Bytes())
	this.buffer.Write(this.sql.lock.Bytes())
	//sql := `select ` + this.sql.field + ` from` + this.sql.table + this.sql.join + this.sql.on + this.sql.where + this.sql.group + this.sql.order + this.sql.limit + this.sql.lock

	result, e := QueryMap(this.buffer.Bytes(), this.sql.master, this.prepare_arg, this.Transaction)
	if key != `` && result != nil {
		tmp := make(map[string]map[string]string)
		for _, value := range result {
			tmp[value[key]] = value
		}
		return tmp, e
	}
	return nil, e
}

//获取数量
func (this *Mysql_Build) Count() (res int, err error) {

	this.buffer.Reset()
	this.buffer.Write([]byte{115, 101, 108, 101, 99, 116, 32, 99, 111, 117, 110, 116, 40}) //select count(
	this.buffer.Write(this.sql.field.Bytes())
	this.buffer.Write([]byte{41, 32, 97, 115, 32, 99, 111, 110, 117, 116, 32, 102, 114, 111, 109}) //) as conut from
	this.buffer.Write(this.sql.table.Bytes())
	this.buffer.Write(this.sql.where.Bytes())
	this.buffer.Write(this.sql.group.Bytes())
	this.buffer.Write(this.sql.order.Bytes())
	this.buffer.Write([]byte{32, 108, 105, 109, 105, 116, 32, 49})
	this.buffer.Write(this.sql.lock.Bytes())
	//sql := `select count(*) as conut from` + this.sql.table + this.sql.where + this.sql.group + this.sql.order + ` limit 1` + this.sql.lock
	//DEBUG(this.buffer.String())

	ress, e := QueryMap(this.buffer.Bytes(), this.sql.master, this.prepare_arg, this.Transaction)
	if e != nil {
		err = errors.New(`执行Model.Count出错,sql错误信息：` + e.Error() + `,错误sql：` + this.buffer.String() + "  参数 " + fmt.Sprintf("%+v", this.prepare_arg))
		return
	}

	res, err = strconv.Atoi(ress[0][`conut`])
	return
}

/*执行sql插入
 *返回插入ID与驱动返回的err
 */
func (this *Mysql_Build) Insert(i interface{}) (id int64, err error) {

	r := reflect.TypeOf(i)
	for r.Kind() == reflect.Ptr {
		r = r.Elem()
	}
	if r.Kind() == reflect.Slice {
		_, err := this.InsertAll(i)
		return 0, err
	}
	uint_ptr := uintptr(reflect2.PtrOf(i))
	this.buffer.Reset()

	this.buffer.Write([]byte{73, 78, 83, 69, 82, 84}) //do := `INSERT`

	this.buffer.Write(this.sql.attr.Bytes())
	this.buffer.Write([]byte{32, 73, 78, 84, 79})
	this.buffer.Write(this.sql.table.Bytes())
	this.buffer.Write([]byte{32, 83, 69, 84, 32})
	switch r.Kind() {
	case reflect.Struct:
		for i1 := 0; i1 < r.NumField(); i1++ {
			field_t := r.Field(i1)
			if field_t.Tag.Get(`db`) == `-` || (strings.Contains(field_t.Tag.Get(`db`), `pk`) && string(GetvaluefromPtr(uint_ptr, field_t)) == `0`) {
				continue
			}
			this.buffer.WriteString(Getkey(field_t.Name))
			this.buffer.WriteByte(61)
			this.buffer.WriteString(GetvaluefromPtr(uint_ptr, field_t))
			this.buffer.WriteByte(44)
		}
		this.buffer.Truncate(this.buffer.Len() - 1)
	case reflect.Map:
		this.extend_data(i)
	default:
		err = errors.New(`执行Model.Insert出错，不支持的插入类型` + fmt.Sprint(r.Kind()))
		return
	}

	//sql := do + this.sql.attr + ` INTO` + this.sql.table + ` SET ` + this.extend_data(param)
	//DEBUG(this.buffer.String())
	new_id, rowsAffected, e := Insert(this.buffer.Bytes(), 0, this.prepare_arg, this.Transaction)
	if e != nil {
		err = errors.New(`执行Model.Insert出错,sql错误信息：` + e.Error() + `,错误sql：` + this.buffer.String() + "  参数 " + fmt.Sprintf("%+v", this.prepare_arg))
	} else {
		if new_id == 0 && rowsAffected == 0 {
			err = errors.New(`执行Model.Insert出错,sql错误信息： 受影响行数为0 ,错误sql：` + this.buffer.String() + "  参数 " + fmt.Sprintf("%+v", this.prepare_arg))
			return
		}
		if new_id > 0 {
			id = new_id
		}
	}
	this.Result.RowsAffected(rowsAffected)
	return
}
func (this *Mysql_Build) Replace(i interface{}) (err error) {
	r := reflect.TypeOf(i)
	for r.Kind() == reflect.Ptr {
		r = r.Elem()
	}
	if r.Kind() == reflect.Slice {
		_, err := this.ReplaceAll(i)
		return err
	}
	uint_ptr := uintptr(reflect2.PtrOf(i))
	this.buffer.Reset()

	this.buffer.Write([]byte{82, 69, 80, 76, 65, 67, 69}) //do = `REPLACE`

	this.buffer.Write(this.sql.attr.Bytes())
	this.buffer.Write([]byte{32, 73, 78, 84, 79})
	this.buffer.Write(this.sql.table.Bytes())
	this.buffer.Write([]byte{32, 83, 69, 84, 32})
	switch r.Kind() {
	case reflect.Struct:
		for i1 := 0; i1 < r.NumField(); i1++ {
			field_t := r.Field(i1)
			if field_t.Tag.Get(`db`) == `-` {
				continue
			}
			this.buffer.WriteString(Getkey(field_t.Name))
			this.buffer.WriteByte(61)
			this.buffer.WriteString(GetvaluefromPtr(uint_ptr, field_t))
			this.buffer.WriteByte(44)
		}
		this.buffer.Truncate(this.buffer.Len() - 1)
	case reflect.Map:
		this.extend_data(i)
	default:
		err = errors.New(`执行Model.Replace出错，不支持的插入类型` + fmt.Sprint(r.Kind()))
		return
	}

	//sql := do + this.sql.attr + ` INTO` + this.sql.table + ` SET ` + this.extend_data(param)
	//DEBUG(this.buffer.String())
	_, rowsAffected, e := Insert(this.buffer.Bytes(), 0, this.prepare_arg, this.Transaction)
	if e != nil {
		err = errors.New(`执行Model.Replace出错,sql错误信息：` + e.Error() + `,错误sql：` + this.buffer.String() + "  参数 " + fmt.Sprintf("%+v", this.prepare_arg))
	}
	this.Result.RowsAffected(rowsAffected)
	return
}

/*执行sql插入
 *返回插入ID与驱动返回的err
 */
func (this *Mysql_Build) InsertAll(i interface{}) (res bool, err error) {

	field := []string{}
	r := reflect.TypeOf(i)
	uint_ptr := uintptr(reflect2.PtrOf(i))
	for r.Kind() == reflect.Ptr {
		r = r.Elem()
	}
	if r.Kind() != reflect.Slice {
		err = errors.New("不支持的插入类型")
		return
	}
	this.buffer.Reset()
	this.buffer.Write([]byte{73, 78, 83, 69, 82, 84}) //do := `INSERT`

	s := (*SliceHeader)(unsafe.Pointer(uint_ptr))
	uint_ptr = uintptr(s.Data)
	value := []string{}
	t := r.Elem()
	var if_ptr bool
	if t.Kind() == reflect.Ptr {
		t = t.Elem()
		if_ptr = true
	}
	for i := 0; i < s.Len; i++ {
		var s_uint_ptr uintptr
		if if_ptr {
			s_uint_ptr = uint_ptr + Uintptr_offset*uintptr(i)
			s_uint_ptr = *(*uintptr)(unsafe.Pointer(s_uint_ptr))
			if s_uint_ptr == 0 {
				continue
			}
		} else {
			s_uint_ptr = uint_ptr + t.Size()*uintptr(i) //切片成员地址
		}
		switch t.Kind() {
		case reflect.Struct:
			vv := []string{}
			for i1 := 0; i1 < t.NumField(); i1++ {
				field_t := t.Field(i1)
				if (strings.Contains(field_t.Tag.Get(`db`), `pk`) && string(GetvaluefromPtr(s_uint_ptr, field_t)) == `0`) || field_t.Tag.Get(`db`) == `-` {
					continue
				}
				if i == 0 {
					//取出key的排列
					field = append(field, Getkey(t.Field(i1).Name))
				}
				vv = append(vv, GetvaluefromPtr(s_uint_ptr, field_t))
			}
			value = append(value, `(`+strings.Join(vv, `,`)+`)`)

		default:
			DEBUG(`执行Model.InsertAll出错，不支持的slice子元素插入类型` + fmt.Sprint(t.Kind()))
			return
		}

	}
	this.buffer.Write(this.sql.attr.Bytes())
	this.buffer.Write([]byte{32, 73, 78, 84, 79})
	this.buffer.Write(this.sql.table.Bytes())
	this.buffer.Write([]byte{32, 40})
	this.buffer.WriteString(strings.Join(field, `,`))
	this.buffer.Write([]byte{41, 32, 86, 65, 76, 85, 69, 83, 32})
	this.buffer.WriteString(strings.Join(value, `,`))
	//sql := do + this.sql.attr + ` INTO` + this.sql.table + ` (` + strings.Join(field, `,`)ReplaceAll + `) VALUES ` + strings.Join(value, `,`)
	//DEBUG("insert语句" + this.buffer.String())
	_, rowsAffected, e := Insert(this.buffer.Bytes(), 0, this.prepare_arg, this.Transaction)
	if e != nil {
		err = errors.New(`执行Model.InsertAll出错,sql错误信息：` + e.Error() + `,错误sql：` + this.buffer.String() + "  参数 " + fmt.Sprintf("%+v", this.prepare_arg))
	} else {
		res = rowsAffected > 0
	}
	this.Result.RowsAffected(rowsAffected)
	return
}
func (this *Mysql_Build) ReplaceAll(i interface{}) (res bool, err error) {

	field := []string{}
	r := reflect.TypeOf(i)
	uint_ptr := uintptr(reflect2.PtrOf(i))
	for r.Kind() == reflect.Ptr {
		r = r.Elem()
	}
	if r.Kind() != reflect.Slice {
		err = errors.New("不支持的插入类型")
		return
	}
	this.buffer.Reset()

	this.buffer.Write([]byte{82, 69, 80, 76, 65, 67, 69}) //do = `REPLACE`

	s := (*SliceHeader)(unsafe.Pointer(uint_ptr))
	uint_ptr = uintptr(s.Data)
	value := []string{}
	t := r.Elem()
	var if_ptr bool
	if t.Kind() == reflect.Ptr {
		t = t.Elem()
		if_ptr = true
	}
	for i := 0; i < s.Len; i++ {
		var s_uint_ptr uintptr
		if if_ptr {
			s_uint_ptr = uint_ptr + Uintptr_offset*uintptr(i)
			s_uint_ptr = *(*uintptr)(unsafe.Pointer(s_uint_ptr))
			if s_uint_ptr == 0 {
				continue
			}
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
					field = append(field, Getkey(t.Field(i1).Name))
				}
				vv = append(vv, GetvaluefromPtr(s_uint_ptr, field_t))
			}
			value = append(value, `(`+strings.Join(vv, `,`)+`)`)

		default:
			DEBUG(`执行Model.ReplaceAll出错，不支持的slice子元素插入类型` + fmt.Sprint(t.Kind()))
			return
		}

	}
	this.buffer.Write(this.sql.attr.Bytes())
	this.buffer.Write([]byte{32, 73, 78, 84, 79})
	this.buffer.Write(this.sql.table.Bytes())
	this.buffer.Write([]byte{32, 40})
	this.buffer.WriteString(strings.Join(field, `,`))
	this.buffer.Write([]byte{41, 32, 86, 65, 76, 85, 69, 83, 32})
	this.buffer.WriteString(strings.Join(value, `,`))
	//sql := do + this.sql.attr + ` INTO` + this.sql.table + ` (` + strings.Join(field, `,`) + `) VALUES ` + strings.Join(value, `,`)
	//DEBUG("insert语句" + this.buffer.String())
	_, rowsAffected, e := Insert(this.buffer.Bytes(), 0, this.prepare_arg, this.Transaction)
	if e != nil {
		err = errors.New(`执行Model.ReplaceAll出错,sql错误信息：` + e.Error() + `,错误sql：` + this.buffer.String() + "  参数 " + fmt.Sprintf("%+v", this.prepare_arg))
	} else {
		res = rowsAffected > 0
	}
	this.Result.RowsAffected(rowsAffected)
	return
}

/*执行sql删除
 *返回插入ID与驱动返回的err
 */
func (this *Mysql_Build) Delete() (result bool, err error) {

	this.buffer.Reset()
	this.buffer.Write([]byte{68, 69, 76, 69, 84, 69})
	this.buffer.Write(this.sql.attr.Bytes())
	this.buffer.Write([]byte{32, 70, 82, 79, 77})
	this.buffer.Write(this.sql.table.Bytes())
	this.buffer.Write(this.sql.where.Bytes())
	this.buffer.Write(this.sql.order.Bytes())
	this.buffer.Write(this.sql.limit.Bytes())
	//sql := `DELETE` + this.sql.attr + ` FROM` + this.sql.table + this.sql.where + this.sql.order + this.sql.limit
	e := Exec(this.buffer.Bytes(), 0, this.prepare_arg, this.Transaction)
	//DEBUG("delete语句" + this.buffer.String())
	if e != nil {
		err = errors.New(`执行Model.Delete出错,sql错误信息：` + e.Error() + `,错误sql：` + this.buffer.String() + "  参数 " + fmt.Sprintf("%+v", this.prepare_arg))
	} else {
		result = true
	}

	return
}

/*执行sql更新
 *返回插入ID与驱动返回的err
 *执行exp更新，传入[]string{"exp","..."}
 */

func (this *Mysql_Build) Update(param map[string]interface{}) (result bool, err error) {

	/*if this.sql.where.Len() > 0 {
		this.buffer.Reset()
		this.buffer.Write(p)
		sql := `select * from` + this.sql.table + this.sql.where
		result, e := this.Select(sql, 0, this.Transaction)
		if len(result) == 0 {
			return false, e
		}
	} else {*/
	if this.sql.where.Len() == 0 {
		//防止没传入where全表修改
		return false, errors.New(`执行Model.Update出错,必须要传入where参数，不允许全表修改`)
	}
	this.buffer.Reset()
	this.buffer.Write([]byte{85, 80, 68, 65, 84, 69})
	this.buffer.Write(this.sql.attr.Bytes())
	this.buffer.Write(this.sql.table.Bytes())
	this.buffer.Write([]byte{32, 83, 69, 84, 32})
	err = this.extend_data(param)
	if err != nil {
		return
	}
	this.buffer.Write(this.sql.where.Bytes())
	this.buffer.Write(this.sql.order.Bytes())
	this.buffer.Write(this.sql.limit.Bytes())
	//sql := `UPDATE ` + this.sql.attr + this.sql.table + ` SET ` + this.extend_data(param) + this.sql.where + this.sql.order + this.sql.limit
	res, e := Query_getaffected(this.buffer.Bytes(), 0, this.prepare_arg, this.Transaction)
	//DEBUG("update语句" + this.buffer.String())
	if e != nil {
		err = errors.New(`执行Model.Update出错,sql错误信息：` + e.Error() + `,错误sql：` + this.buffer.String() + "  参数 " + fmt.Sprintf("%+v", this.prepare_arg))
	}

	return res > 0, err
}

func (this *Mysql_Build) Find(s interface{}) (err error) {

	this.buffer.Reset()
	this.buffer.Write([]byte{115, 101, 108, 101, 99, 116, 32})
	this.buffer.Write(this.sql.field.Bytes())
	this.buffer.Write([]byte{32, 102, 114, 111, 109})
	this.buffer.Write(this.sql.table.Bytes())
	this.buffer.Write(this.sql.join.Bytes())
	this.buffer.Write(this.sql.on.Bytes())
	this.buffer.Write(this.sql.where.Bytes())
	this.buffer.Write(this.sql.group.Bytes())
	this.buffer.Write(this.sql.order.Bytes())
	this.buffer.Write([]byte{32, 76, 73, 77, 73, 84, 32, 49})
	this.buffer.Write(this.sql.lock.Bytes())
	//sql := `select ` + this.sql.field + ` from` + this.sql.table + this.sql.where + this.sql.group + this.sql.order + ` LIMIT 1` + this.sql.lock
	e := Query(this.buffer.Bytes(), this.sql.master, this.prepare_arg, this.Transaction, s)
	//DEBUG(`find的sql语句`, this.buffer.String(), res)
	if e != nil {
		err = errors.New(`执行Model.Find出错,sql错误信息：` + e.Error() + `,错误sql：` + this.buffer.String() + "  参数 " + fmt.Sprintf("%+v", this.prepare_arg))
	}

	return
}
func (this *Mysql_Build) FindMap() (m map[string]string, err error) {

	this.buffer.Reset()
	this.buffer.Write([]byte{115, 101, 108, 101, 99, 116, 32})
	this.buffer.Write(this.sql.field.Bytes())
	this.buffer.Write([]byte{32, 102, 114, 111, 109})
	this.buffer.Write(this.sql.table.Bytes())
	this.buffer.Write(this.sql.join.Bytes())
	this.buffer.Write(this.sql.on.Bytes())
	this.buffer.Write(this.sql.where.Bytes())
	this.buffer.Write(this.sql.group.Bytes())
	this.buffer.Write(this.sql.order.Bytes())
	this.buffer.Write([]byte{32, 76, 73, 77, 73, 84, 32, 49})
	this.buffer.Write(this.sql.lock.Bytes())
	//sql := `select ` + this.sql.field + ` from` + this.sql.table + this.sql.where + this.sql.group + this.sql.order + ` LIMIT 1` + this.sql.lock
	res, err := QueryMap(this.buffer.Bytes(), this.sql.master, this.prepare_arg, this.Transaction)
	//DEBUG(`find的sql语句`, this.buffer.String(), res)
	if err != nil {
		err = errors.New(`执行Model.Find出错,sql错误信息：` + err.Error() + `,错误sql：` + this.buffer.String() + "  参数 " + fmt.Sprintf("%+v", this.prepare_arg))
	}
	if len(res) > 0 {
		return res[0], err
	}
	return
}

//把update insert的map数据转为string
func (this *Mysql_Build) extend_data(i interface{}) error {
	switch i.(type) {
	case map[string]interface{}:
		data := i.(map[string]interface{})
		for key, value := range data {
			this.buffer.WriteString(Getkey(key))
			this.buffer.WriteByte(61)
			this.buffer.WriteString(Getvalue(value))
			this.buffer.WriteByte(44)
		}
		this.buffer.Truncate(this.buffer.Len() - 1)
	case map[string]string:
		data := i.(map[string]string)
		for key, value := range data {
			this.buffer.WriteString(Getkey(key))
			this.buffer.WriteByte(61)
			this.buffer.WriteString(Getvalue(value))
			this.buffer.WriteByte(44)
		}
		this.buffer.Truncate(this.buffer.Len() - 1)
	default:
		return errors.New("extend不支持的类型")
	}
	return nil
}

type Mysql_RawBuild struct {
	*Mysql_Build
}

func (this *Mysql_RawBuild) RawPrepare(sql string, arg []interface{}) {
	this.buffer.Reset()
	this.buffer.WriteString(sql)
	this.prepare_arg = arg
}
func (this *Mysql_RawBuild) Find(s interface{}) (err error) {

	e := Query(this.buffer.Bytes(), this.sql.master, this.prepare_arg, this.Transaction, s)
	//DEBUG(`find的sql语句`, this.buffer.String(), res)
	if e != nil {
		err = errors.New(`执行Model.Find出错,sql错误信息：` + e.Error() + `,错误sql：` + this.buffer.String() + "  参数 " + fmt.Sprintf("%+v", this.prepare_arg))
	}
	return
}
