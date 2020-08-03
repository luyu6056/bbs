package models

import (
	"bbs/config"
	"bbs/db/mysql"
	"bbs/libraries"
	"bytes"
	"errors"
	"fmt"
	"reflect"
	"strconv"
	"strings"

	"github.com/modern-go/reflect2"

	//"time"
	//"runtime"
	"bbs/server"
	"unsafe"
)

type Model struct {
	Ctx          *server.Context
	rowsAffected int64
}

type Do_sql struct {
	model  *Model
	sql    *sql_build
	page   []int
	buffer *libraries.MsgBuffer
}
type sql_build struct {
	field       libraries.MsgBuffer
	table       libraries.MsgBuffer
	where       libraries.MsgBuffer
	group       libraries.MsgBuffer
	order       libraries.MsgBuffer
	limit       libraries.MsgBuffer
	lock        libraries.MsgBuffer
	join        libraries.MsgBuffer
	on          libraries.MsgBuffer
	master      int
	totle_count int
	attr        libraries.MsgBuffer
}

var _pk map[string]string

//对map结果进行field筛选输出
func (this *Model) Field_map(data map[string]string, field string) map[string]string {
	if field == `*` || field == `` {
		return data
	}
	result := make(map[string]string)
	f := strings.Split(field, `,`)
	for _, v := range f {
		result[v] = data[v]
	}
	return result
}

var model_tablepre = libraries.Str2bytes(` ` + config.Server.Tablepre)

func New_mysqlBuild() *Do_sql {
	t := &Do_sql{buffer: new(libraries.MsgBuffer), sql: new(sql_build)}
	return t
}

//除事务外，调用任何方法之前先调用Table指定表格以及初始化sql参数，避免sql参数上下文污染
func (this *Model) Table(tablename string) (table *Do_sql) {

	if this.Ctx == nil {
		this.Ctx = new(server.Context)
		this.Ctx.Sql_build = New_mysqlBuild()
	} else {
		if this.Ctx.Sql_build == nil {
			this.Ctx.Sql_build = New_mysqlBuild()
		}

	}
	table = this.Ctx.Sql_build.(*Do_sql)

	table.model = this
	table.Reset()
	table.sql.table.WriteString(tablename)
	//table := &Do_sql{sql: &sql_build{table: model_tablepre + tablename, limit: ` LIMIT 1000`, field: `*`, totle_count: -1, master: 1}, cache: -2, model: this}
	return table
}

func (this *Do_sql) Reset() {
	//libraries.DEBUG(`sql语句`, this.buffer.String())
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
	this.sql.table.Write(model_tablepre)
	this.sql.field.WriteByte(42)
	this.sql.totle_count = -1
	this.sql.master = 1
	this.sql.limit.Write([]byte{32, 76, 73, 77, 73, 84, 32, 49, 48, 48, 48})
	this.page = this.page[:0]
}

//where Join on 多表联合查询,暂达成双表联查
func (this *Do_sql) LeftJoin(t string) *Do_sql {
	this.sql.join.Write([]byte{32, 108, 101, 102, 116, 32, 106, 111, 105, 110, 32})
	this.sql.join.WriteString(t)
	return this
}

func (this *Do_sql) Lock(lock bool) *Do_sql {
	if lock {
		this.sql.lock.WriteString(` FOR UPDATE`)
	}
	return this
}

func (this *Do_sql) On(on string) *Do_sql {
	this.sql.on.Write([]byte{32, 111, 110, 32})
	this.sql.on.WriteString(on)
	return this
}
func (this *Do_sql) Where(condition interface{}) *Do_sql {
	var where map[string]interface{}
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
		libraries.DEBUG(`Model.where condition不支持类型`, t.Name())
	}
	if len(where) == 0 {
		return this
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
func (this *Do_sql) WhereOr(condition map[string]interface{}) *Do_sql {
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
func (this *Do_sql) _where(key string, value interface{}) {
	switch value.(type) {
	case string:
		this.buffer.WriteString(mysql.Getkey(key))
		this.buffer.WriteByte(61)
		this.buffer.WriteString(mysql.Getvalue(value))
	case float32:
		this.buffer.WriteString(mysql.Getkey(key))
		this.buffer.WriteByte(61)
		this.buffer.WriteString(mysql.Getvalue(value))
	case float64:
		this.buffer.WriteString(mysql.Getkey(key))
		this.buffer.WriteByte(61)
		this.buffer.WriteString(mysql.Getvalue(value))
	case int:
		this.buffer.WriteString(mysql.Getkey(key))
		this.buffer.WriteByte(61)
		this.buffer.WriteString(mysql.Getvalue(value))
	case int8:
		this.buffer.WriteString(mysql.Getkey(key))
		this.buffer.WriteByte(61)
		this.buffer.WriteString(mysql.Getvalue(value))
	case int16:
		this.buffer.WriteString(mysql.Getkey(key))
		this.buffer.WriteByte(61)
		this.buffer.WriteString(mysql.Getvalue(value))
	case int32:
		this.buffer.WriteString(mysql.Getkey(key))
		this.buffer.WriteByte(61)
		this.buffer.WriteString(mysql.Getvalue(value))
	case int64:
		this.buffer.WriteString(mysql.Getkey(key))
		this.buffer.WriteByte(61)
		this.buffer.WriteString(mysql.Getvalue(value))
	case uint:
		this.buffer.WriteString(mysql.Getkey(key))
		this.buffer.WriteByte(61)
		this.buffer.WriteString(mysql.Getvalue(value))
	case uint8:
		this.buffer.WriteString(mysql.Getkey(key))
		this.buffer.WriteByte(61)
		this.buffer.WriteString(mysql.Getvalue(value))
	case uint16:
		this.buffer.WriteString(mysql.Getkey(key))
		this.buffer.WriteByte(61)
		this.buffer.WriteString(mysql.Getvalue(value))
	case uint32:
		this.buffer.WriteString(mysql.Getkey(key))
		this.buffer.WriteByte(61)
		this.buffer.WriteString(mysql.Getvalue(value))
	case uint64:
		this.buffer.WriteString(mysql.Getkey(key))
		this.buffer.WriteByte(61)
		this.buffer.WriteString(mysql.Getvalue(value))
	case []byte:
		this.buffer.WriteString(mysql.Getkey(key))
		this.buffer.WriteByte(61)
		this.buffer.WriteString(mysql.Getvalue(value))
	case bool:
		this.buffer.WriteString(mysql.Getkey(key))
		this.buffer.WriteByte(61)
		this.buffer.WriteString(mysql.Getvalue(value))
	case []string:
		this._where_string(key, value)
	case []int32:
		if len(value.([]int32)) == 0 {
			return
		}
		this.buffer.WriteString(mysql.Getkey(key))
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
		this.buffer.WriteString(mysql.Getkey(key))
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
		this.buffer.WriteString(mysql.Getkey(key))
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
		this.buffer.WriteString(mysql.Getkey(key))
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
		this.buffer.WriteString(mysql.Getkey(key))
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
		libraries.DEBUG(`Model.where未设置类型`, t.Name())
	}
}
func (this *Do_sql) _where_string(key string, value interface{}) {
	switch value.([]string)[0] {
	case `in`:
		this.buffer.WriteString(mysql.Getkey(key))
		this.buffer.Write([]byte{32, 73, 78, 32, 40})
		this.buffer.WriteString(strings.Replace(mysql.Getvalue(value.([]string)[1]), `,`, `','`, -1))
		this.buffer.WriteByte(41)
		//return key + ` IN (` + strings.Replace(mysql.Getvalue(value.([]string)[1]), `,`, `','`, -1) + `)`
	case `gt`, ">":
		this.buffer.WriteString(mysql.Getkey(key))
		this.buffer.WriteByte(62)
		this.buffer.WriteString(mysql.Getvalue(value.([]string)[1]))
		//return key + ` > ` + mysql.Getvalue(value.([]string)[1])
	case `egt`, ">=":
		this.buffer.WriteString(mysql.Getkey(key))
		this.buffer.Write([]byte{62, 61})
		this.buffer.WriteString(mysql.Getvalue(value.([]string)[1]))
		//return key + ` >= ` + mysql.Getvalue(value.([]string)[1])
	case `lt`, "<":
		this.buffer.WriteString(mysql.Getkey(key))
		this.buffer.WriteByte(60)
		this.buffer.WriteString(mysql.Getvalue(value.([]string)[1]))
		//return key + ` < ` + mysql.Getvalue(value.([]string)[1])
	case `elt`, "<=":
		this.buffer.WriteString(mysql.Getkey(key))
		this.buffer.Write([]byte{60, 61})
		this.buffer.WriteString(mysql.Getvalue(value.([]string)[1]))
		//return key + ` <= ` + mysql.Getvalue(value.([]string)[1])
	case `neq`, "!=":
		this.buffer.WriteString(mysql.Getkey(key))
		this.buffer.Write([]byte{33, 61})
		this.buffer.WriteString(mysql.Getvalue(value.([]string)[1]))
	//return key + ` != ` + mysql.Getvalue(value.([]string)[1])
	case `eq`, "=":
		this.buffer.WriteString(mysql.Getkey(key))
		this.buffer.Write([]byte{61})
		this.buffer.WriteString(mysql.Getvalue(value.([]string)[1]))
	case `notlike`:
		this.buffer.WriteString(mysql.Getkey(key))
		this.buffer.Write([]byte{32, 110, 111, 116, 32, 108, 105, 107, 101, 32})
		this.buffer.WriteString(mysql.Getvalue(value.([]string)[1]))
		//return key + ` not like ` + mysql.Getvalue(value.([]string)[1])
	case `match`:
		this.buffer.Write([]byte{77, 65, 84, 67, 72, 32, 40})
		this.buffer.WriteString(mysql.Getkey(key))
		this.buffer.Write([]byte{41, 32, 65, 71, 65, 73, 78, 83, 84, 32, 40})
		this.buffer.WriteString(mysql.Getvalue(value.([]string)[1]))
		this.buffer.Write([]byte{32, 73, 78, 32, 66, 79, 79, 76, 69, 65, 78, 32, 77, 79, 68, 69, 41})
		//return `MATCH (` + key + `) AGAINST (` + mysql.Getvalue(value.([]string)[1]) + ` IN BOOLEAN MODE)`
	default:
		this.buffer.WriteString(mysql.Getkey(key))
		this.buffer.WriteByte(32)
		this.buffer.WriteString(mysql.Getvalue(value.([]string)[0]))
		this.buffer.WriteByte(32)
		this.buffer.WriteString(mysql.Getvalue(value.([]string)[1]))
		//return key + ` ` + mysql.Getvalue(value.([]string)[0]) + ` ` + mysql.Getvalue(value.([]string)[1])
	}
}
func (this *Do_sql) _where_interface(key string, value interface{}) {
	val := value.([]interface{})
	if val[1] != nil {
		switch (val[0]).(string) {
		case `in`:
			switch val[1].(type) {
			case []string:
				this.buffer.WriteString(mysql.Getkey(key))
				this.buffer.Write([]byte{32, 73, 78, 32, 40})
				if len((val[1]).([]string)) > 0 {
					for _, v := range (val[1]).([]string) {
						this.buffer.WriteString(mysql.Getvalue(v))
						this.buffer.WriteByte(44)
					}
					this.buffer.Truncate(this.buffer.Len() - 1)
				} else {
					this.buffer.Write([]byte{110, 117, 108, 108})
				}
				this.buffer.WriteByte(41)
				//return key + ` IN (` + strings.Join(c, `,`) + `)`

			case string:
				this.buffer.WriteString(mysql.Getkey(key))
				this.buffer.Write([]byte{32, 73, 78, 32, 40})
				this.buffer.WriteString(strings.Replace(mysql.Getvalue((val[1])), `,`, `','`, -1))
				this.buffer.WriteByte(41)
				//return key + ` IN (` + strings.Replace(mysql.Getvalue((val[1])), `,`, `','`, -1) + `)`
			case []int:
				this.buffer.WriteString(mysql.Getkey(key))
				this.buffer.Write([]byte{32, 73, 78, 32, 40})
				if len((val[1]).([]int)) > 0 {
					for _, v := range (val[1]).([]int) {
						this.buffer.WriteString(mysql.Getvalue(v))
						this.buffer.WriteByte(44)
					}
					this.buffer.Truncate(this.buffer.Len() - 1)
				} else {
					this.buffer.Write([]byte{110, 117, 108, 108})
				}
				this.buffer.WriteByte(41)
				//return key + ` IN (` + strings.Join(c, `,`) + `)`
			case []int8:
				this.buffer.WriteString(mysql.Getkey(key))
				this.buffer.Write([]byte{32, 73, 78, 32, 40})
				if len((val[1]).([]int8)) > 0 {
					for _, v := range (val[1]).([]int8) {
						this.buffer.WriteString(mysql.Getvalue(v))
						this.buffer.WriteByte(44)
					}
					this.buffer.Truncate(this.buffer.Len() - 1)
				} else {
					this.buffer.Write([]byte{110, 117, 108, 108})
				}
				this.buffer.WriteByte(41)
				//return key + ` IN (` + strings.Join(c, `,`) + `)`
			case []int16:
				this.buffer.WriteString(mysql.Getkey(key))
				this.buffer.Write([]byte{32, 73, 78, 32, 40})
				if len((val[1]).([]int16)) > 0 {
					for _, v := range (val[1]).([]int16) {
						this.buffer.WriteString(mysql.Getvalue(v))
						this.buffer.WriteByte(44)
					}
					this.buffer.Truncate(this.buffer.Len() - 1)
				} else {
					this.buffer.Write([]byte{110, 117, 108, 108})
				}
				this.buffer.WriteByte(41)
				//return key + ` IN (` + strings.Join(c, `,`) + `)`
			case []int32:
				this.buffer.WriteString(mysql.Getkey(key))
				this.buffer.Write([]byte{32, 73, 78, 32, 40})
				if len((val[1]).([]int32)) > 0 {
					for _, v := range (val[1]).([]int32) {
						this.buffer.WriteString(mysql.Getvalue(v))
						this.buffer.WriteByte(44)
					}
					this.buffer.Truncate(this.buffer.Len() - 1)
				} else {
					this.buffer.Write([]byte{110, 117, 108, 108})
				}

				this.buffer.WriteByte(41)
				//return key + ` IN (` + strings.Join(c, `,`) + `)`
			case []int64:
				this.buffer.WriteString(mysql.Getkey(key))
				this.buffer.Write([]byte{32, 73, 78, 32, 40})
				if len((val[1]).([]int64)) > 0 {
					for _, v := range (val[1]).([]int64) {
						this.buffer.WriteString(mysql.Getvalue(v))
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
				libraries.DEBUG(`Model.where []interface{} in未设置类型`, t.Name())
			}
		case `time`:
			fallthrough
		case `between`:
			switch val[1].(type) {
			case []string:
				this.buffer.WriteString(mysql.Getkey(key))
				this.buffer.Write([]byte{32, 98, 101, 116, 119, 101, 101, 110, 32})
				this.buffer.WriteString(mysql.Getvalue((val[1]).([]string)[0]))
				this.buffer.Write([]byte{32, 97, 110, 100, 32})
				this.buffer.WriteString(mysql.Getvalue((val[1]).([]string)[1]))
				//return key + ` between ` + mysql.Getvalue((val[1]).([]string)[0]) + ` and ` + mysql.Getvalue((val[1]).([]string)[1])
			case []int64:
				this.buffer.WriteString(mysql.Getkey(key))
				this.buffer.Write([]byte{32, 98, 101, 116, 119, 101, 101, 110, 32})
				this.buffer.WriteString(mysql.Getvalue((val[1]).([]int64)[0]))
				this.buffer.Write([]byte{32, 97, 110, 100, 32})
				this.buffer.WriteString(mysql.Getvalue((val[1]).([]int64)[1]))
				//return key + ` between ` + begin + ` and ` + end
			case []int:
				this.buffer.WriteString(mysql.Getkey(key))
				this.buffer.Write([]byte{32, 98, 101, 116, 119, 101, 101, 110, 32})
				this.buffer.WriteString(mysql.Getvalue((val[1]).([]int)[0]))
				this.buffer.Write([]byte{32, 97, 110, 100, 32})
				this.buffer.WriteString(mysql.Getvalue((val[1]).([]int)[1]))
				//return key + ` between ` + begin + ` and ` + end
			default:
				t := reflect.TypeOf(val[1])
				libraries.DEBUG(`Model.where []interface{} between未设置类型`, t.Name())
			}
		case `and`:
			fallthrough
		case `or`:
			switch val[1].(type) {
			case []interface{}:
				tmp_b := []byte(` ` + mysql.Getkey(val[0].(string)) + ` `)
				for _, v := range val[1].([]interface{}) {
					switch v.(type) {
					case []interface{}:
						this._where_interface(key, v.([]interface{}))
					case []string:
						this._where_string(key, v.([]string))
					default:
						t := reflect.TypeOf(val[0])
						libraries.DEBUG(`Model.where []interface{} and,or 具体数据未设置类型`, t.Name())
						return
					}
					this.buffer.Write(tmp_b)
				}
				this.buffer.Truncate(this.buffer.Len() - len(tmp_b))
			default:
				t := reflect.TypeOf(val[0])
				libraries.DEBUG(`Model.where []interface{} and,or 未设置类型`, t.Name())
			}
		case `gt`, ">":
			this.buffer.WriteString(mysql.Getkey(key))
			this.buffer.WriteByte(62)
			this.buffer.WriteString(mysql.Getvalue(value.([]interface{})[1]))
			//return key + ` > ` + mysql.Getvalue(value.([]interface{})[1])
		case `egt`, ">=":
			this.buffer.WriteString(mysql.Getkey(key))
			this.buffer.Write([]byte{62, 61})
			this.buffer.WriteString(mysql.Getvalue(value.([]interface{})[1]))
			//return key + ` >= ` + mysql.Getvalue(value.([]interface{})[1])
		case `lt`, "<":
			this.buffer.WriteString(mysql.Getkey(key))
			this.buffer.WriteByte(60)
			this.buffer.WriteString(mysql.Getvalue(value.([]interface{})[1]))
			//return key + ` < ` + mysql.Getvalue(value.([]interface{})[1])
		case `elt`, "<=":
			this.buffer.WriteString(mysql.Getkey(key))
			this.buffer.Write([]byte{60, 61})
			this.buffer.WriteString(mysql.Getvalue(value.([]interface{})[1]))
			//return key + ` <= ` + mysql.Getvalue(value.([]interface{})[1])
		case `neq`, "!=":
			this.buffer.WriteString(mysql.Getkey(key))
			this.buffer.Write([]byte{33, 61})
			this.buffer.WriteString(mysql.Getvalue(value.([]interface{})[1]))
		//return key + ` != ` + mysql.Getvalue(value.([]interface{})[1])
		case `eq`, "=":
			this.buffer.WriteString(mysql.Getkey(key))
			this.buffer.Write([]byte{61})
			this.buffer.WriteString(mysql.Getvalue(value.([]interface{})[1]))
		case `notlike`:
			this.buffer.WriteString(mysql.Getkey(key))
			this.buffer.Write([]byte{32, 110, 111, 116, 32, 108, 105, 107, 101, 32})
			this.buffer.WriteString(mysql.Getvalue(value.([]interface{})[1]))
			//return key + ` not like  ` + mysql.Getvalue(value.([]interface{})[1])
		case `match`:
			this.buffer.Write([]byte{77, 65, 84, 67, 72, 32, 40})
			this.buffer.WriteString(mysql.Getkey(key))
			this.buffer.Write([]byte{41, 32, 65, 71, 65, 73, 78, 83, 84, 32, 40})
			this.buffer.WriteString(mysql.Getvalue(value.([]interface{})[1]))
			this.buffer.Write([]byte{32, 73, 78, 32, 66, 79, 79, 76, 69, 65, 78, 32, 77, 79, 68, 69, 41})
			//return `MATCH (` + key + `) AGAINST (` + mysql.Getvalue(value.([]interface{})[1]) + ` IN BOOLEAN MODE)`
		case `like`:
			switch val[1].(type) {
			case string:
				this._where_string(key, value)
			default:
				t := reflect.TypeOf(val[1])
				libraries.DEBUG(`Model.where []interface{}的`+val[0].(string)+`未设置类型 `, t.Name())
			}
		default:
			libraries.DEBUG(`Model.where []interface{}未设置类型`, val[0])
		}
	}
}

/*func (this *Do_sql) Transaction(sql *libraries.Transaction) *Do_sql {
	this.model.Ctx = sql
	return this
}*/

//是否检测注入 强制检查
/*func (this *Do_sql) Check(check bool) *Do_sql {
	if check == false {
		this.sql.check = `false`
	}
	return this
}*/

func (this *Do_sql) Field(field string) *Do_sql {
	if field == `` {
		return this
	}
	this.sql.field.Reset()
	this.sql.field.WriteString(field)
	return this
}

func (this *Do_sql) Order(order string) *Do_sql {
	if order != `` {
		order = strings.Replace(strings.ToLower(order), `order by`, ``, -1)
		this.sql.order.Write([]byte{32, 79, 82, 68, 69, 82, 32, 66, 89, 32})
		this.sql.order.WriteString(order)
	}
	return this
}

func (this *Do_sql) Group(group string) *Do_sql {
	if group != `` {
		this.sql.group.Write([]byte{32, 103, 114, 111, 117, 112, 32, 98, 121, 32})
		this.sql.group.WriteString(group)
	}

	return this
}

func (this *Do_sql) Limit(limit ...int) *Do_sql {
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
func (this *Do_sql) Master(master bool) *Do_sql {
	if master {
		this.sql.master = 0
	}
	return this
}

/*传入格式
 *[]int{页数,每页数量}  如1,10，返回前10个
 */
func (this *Do_sql) Page(page []int) *Do_sql {
	if len(page) == 0 {
		return this
	}
	this.page = page
	return this
}

func (this *Do_sql) Attr(attr string) *Do_sql {
	if libraries.In_slice(attr, &[]string{`LOW_PRIORITY`, `QUICK`, `IGNORE`, `HIGH_PRIORITY`, `SQL_CACHE`, `SQL_NO_CACHE`}) {
		this.sql.attr.WriteByte(32)
		this.sql.attr.WriteString(attr)
	}
	return this
}

/*func (this *Do_sql) Select_sql() string {
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
func (this *Do_sql) Select(s interface{}) (err error) {

	if len(this.page) > 1 && this.page[0] > 0 {
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
	//sql := `select ` + this.sql.field + ` from` + this.sql.table + this.sql.join + this.sql.on + this.sql.where + this.sql.group + this.sql.order + this.sql.limit + this.sql.lock

	e := mysql.Query(this.buffer.Bytes(), this.sql.master, this.model.Ctx.Transaction, s)
	//libraries.DEBUG(`sql语句`, this.buffer.String())
	if e != nil {
		err = errors.New(`执行Model.Select出错,sql错误信息：` + e.Error() + `,错误sql：` + this.buffer.String())
	}

	return
}
func (this *Do_sql) Select_Key(key string) (map[string]map[string]string, error) {

	if len(this.page) > 1 && this.page[0] > 0 {
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
	//sql := `select ` + this.sql.field + ` from` + this.sql.table + this.sql.join + this.sql.on + this.sql.where + this.sql.group + this.sql.order + this.sql.limit + this.sql.lock

	result, e := mysql.QueryMap(this.buffer.Bytes(), this.sql.master, this.model.Ctx.Transaction)
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
func (this *Do_sql) Count() (res int, err error) {

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
	//libraries.DEBUG(this.buffer.String())

	ress, e := mysql.QueryMap(this.buffer.Bytes(), this.sql.master, this.model.Ctx.Transaction)
	if e != nil {
		err = errors.New(`执行Model.Count出错,sql错误信息：` + e.Error() + `,错误sql：` + this.buffer.String())
		return
	}

	res, err = strconv.Atoi(ress[0][`conut`])
	return
}

/*执行sql插入
 *返回插入ID与驱动返回的err
 */
func (this *Do_sql) Insert(i interface{}) (id int64, err error) {

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
			if field_t.Tag.Get(`db`) == `-` || (strings.Contains(field_t.Tag.Get(`db`), `pk`) && string(mysql.GetvaluefromPtr(uint_ptr, field_t)) == `0`) {
				continue
			}
			this.buffer.WriteString(mysql.Getkey(field_t.Name))
			this.buffer.WriteByte(61)
			this.buffer.WriteString(mysql.GetvaluefromPtr(uint_ptr, field_t))
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
	//libraries.DEBUG(this.buffer.String())
	new_id, rowsAffected, e := mysql.Insert(this.buffer.Bytes(), 0, this.model.Ctx.Transaction)
	if e != nil {
		err = errors.New(`执行Model.Insert出错,sql错误信息：` + e.Error() + `,错误sql：` + this.buffer.String())
	} else {
		if new_id == 0 && rowsAffected == 0 {
			err = errors.New(`执行Model.Insert出错,sql错误信息： 受影响行数为0 ,错误sql：` + this.buffer.String())
			return
		}
		if new_id > 0 {
			id = new_id
		}
	}
	this.model.rowsAffected = rowsAffected
	return
}
func (this *Do_sql) Replace(i interface{}) (err error) {
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
			this.buffer.WriteString(mysql.Getkey(field_t.Name))
			this.buffer.WriteByte(61)
			this.buffer.WriteString(mysql.GetvaluefromPtr(uint_ptr, field_t))
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
	//libraries.DEBUG(this.buffer.String())
	_, rowsAffected, e := mysql.Insert(this.buffer.Bytes(), 0, this.model.Ctx.Transaction)
	if e != nil {
		err = errors.New(`执行Model.Replace出错,sql错误信息：` + e.Error() + `,错误sql：` + this.buffer.String())
	}
	this.model.rowsAffected = rowsAffected
	return
}

/*执行sql插入
 *返回插入ID与驱动返回的err
 */
func (this *Do_sql) InsertAll(i interface{}) (res bool, err error) {

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

	s := (*mysql.SliceHeader)(unsafe.Pointer(uint_ptr))
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
			s_uint_ptr = uint_ptr + mysql.Uintptr_offset*uintptr(i)
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
				if (strings.Contains(field_t.Tag.Get(`db`), `pk`) && string(mysql.GetvaluefromPtr(s_uint_ptr, field_t)) == `0`) || field_t.Tag.Get(`db`) == `-` {
					continue
				}
				if i == 0 {
					//取出key的排列
					field = append(field, mysql.Getkey(t.Field(i1).Name))
				}
				vv = append(vv, mysql.GetvaluefromPtr(s_uint_ptr, field_t))
			}
			value = append(value, `(`+strings.Join(vv, `,`)+`)`)

		default:
			libraries.DEBUG(`执行Model.InsertAll出错，不支持的slice子元素插入类型` + fmt.Sprint(t.Kind()))
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
	//libraries.DEBUG("insert语句" + this.buffer.String())
	_, rowsAffected, e := mysql.Insert(this.buffer.Bytes(), 0, this.model.Ctx.Transaction)
	if e != nil {
		err = errors.New(`执行Model.Insert出错,sql错误信息：` + e.Error() + `,错误sql：` + this.buffer.String())
	} else {
		res = rowsAffected > 0
	}
	this.model.rowsAffected = rowsAffected
	return
}
func (this *Do_sql) ReplaceAll(i interface{}) (res bool, err error) {

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

	s := (*mysql.SliceHeader)(unsafe.Pointer(uint_ptr))
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
			s_uint_ptr = uint_ptr + mysql.Uintptr_offset*uintptr(i)
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
					field = append(field, mysql.Getkey(t.Field(i1).Name))
				}
				vv = append(vv, mysql.GetvaluefromPtr(s_uint_ptr, field_t))
			}
			value = append(value, `(`+strings.Join(vv, `,`)+`)`)

		default:
			libraries.DEBUG(`执行Model.InsertAll出错，不支持的slice子元素插入类型` + fmt.Sprint(t.Kind()))
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
	//libraries.DEBUG("insert语句" + this.buffer.String())
	_, rowsAffected, e := mysql.Insert(this.buffer.Bytes(), 0, this.model.Ctx.Transaction)
	if e != nil {
		err = errors.New(`执行Model.Insert出错,sql错误信息：` + e.Error() + `,错误sql：` + this.buffer.String())
	} else {
		res = rowsAffected > 0
	}
	this.model.rowsAffected = rowsAffected
	return
}

/*执行sql删除
 *返回插入ID与驱动返回的err
 */
func (this *Do_sql) Delete() (result bool, err error) {

	this.buffer.Reset()
	this.buffer.Write([]byte{68, 69, 76, 69, 84, 69})
	this.buffer.Write(this.sql.attr.Bytes())
	this.buffer.Write([]byte{32, 70, 82, 79, 77})
	this.buffer.Write(this.sql.table.Bytes())
	this.buffer.Write(this.sql.where.Bytes())
	this.buffer.Write(this.sql.order.Bytes())
	this.buffer.Write(this.sql.limit.Bytes())
	//sql := `DELETE` + this.sql.attr + ` FROM` + this.sql.table + this.sql.where + this.sql.order + this.sql.limit
	result, e := mysql.Exec(this.buffer.Bytes(), 0, this.model.Ctx.Transaction)
	//libraries.DEBUG("delete语句" + this.buffer.String())
	if e != nil {
		err = errors.New(`执行Model.Delete出错,sql错误信息：` + e.Error() + `,错误sql：` + this.buffer.String())
	}

	return
}

/*执行sql更新
 *返回插入ID与驱动返回的err
 *执行exp更新，传入[]string{"exp","..."}
 */

func (this *Do_sql) Update(param map[string]interface{}) (result bool, err error) {

	/*if this.sql.where.Len() > 0 {
		this.buffer.Reset()
		this.buffer.Write(p)
		sql := `select * from` + this.sql.table + this.sql.where
		result, e := this.mysql.Select(sql, 0, this.model.Ctx.Transaction)
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
	res, e := mysql.Query_getaffected(this.buffer.Bytes(), 0, this.model.Ctx.Transaction)
	//libraries.DEBUG("update语句" + this.buffer.String())
	if e != nil {
		err = errors.New(`执行Model.Update出错,sql错误信息：` + e.Error() + `,错误sql：` + this.buffer.String())
	}

	return res > 0, err
}

func (this *Do_sql) Find(s interface{}) (err error) {

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
	e := mysql.Query(this.buffer.Bytes(), this.sql.master, this.model.Ctx.Transaction, s)
	//libraries.DEBUG(`find的sql语句`, this.buffer.String(), res)
	if e != nil {
		err = errors.New(`执行Model.Find出错,sql错误信息：` + e.Error() + `,错误sql：` + this.buffer.String())
	}

	return
}
func (this *Do_sql) FindMap() (m map[string]string, err error) {

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
	res, err := mysql.QueryMap(this.buffer.Bytes(), this.sql.master, this.model.Ctx.Transaction)
	//libraries.DEBUG(`find的sql语句`, this.buffer.String(), res)
	if err != nil {
		err = errors.New(`执行Model.Find出错,sql错误信息：` + err.Error() + `,错误sql：` + this.buffer.String())
	}
	if len(res) > 0 {
		return res[0], err
	}
	return
}

//把update insert的map数据转为string
func (this *Do_sql) extend_data(i interface{}) error {
	switch i.(type) {
	case map[string]interface{}:
		data := i.(map[string]interface{})
		for key, value := range data {
			this.buffer.WriteString(mysql.Getkey(key))
			this.buffer.WriteByte(61)
			this.buffer.WriteString(mysql.Getvalue(value))
			this.buffer.WriteByte(44)
		}
		this.buffer.Truncate(this.buffer.Len() - 1)
	case map[string]string:
		data := i.(map[string]string)
		for key, value := range data {
			this.buffer.WriteString(mysql.Getkey(key))
			this.buffer.WriteByte(61)
			this.buffer.WriteString(mysql.Getvalue(value))
			this.buffer.WriteByte(44)
		}
		this.buffer.Truncate(this.buffer.Len() - 1)
	default:
		return errors.New("extend不支持的类型")
	}
	return nil
}

//sql事务开始
func (this *Model) BeginTransaction() {
	if this.Ctx == nil {
		this.Ctx = new(server.Context)
	}
	if this.Ctx.Transaction == nil {
		this.Ctx.Transaction = &mysql.Transaction{}
	}
	this.Ctx.Transaction.BeginTransaction()
}

//sql事务关闭,一定要关闭，把conn放回去
func (this *Model) EndTransaction() {
	if this.Ctx != nil && this.Ctx.Transaction != nil {
		this.Ctx.Transaction.EndTransaction()
	}
}

//提交事务
func (this *Model) Commit() (err error) {
	if this.Ctx != nil && this.Ctx.Transaction != nil {
		e := this.Ctx.Transaction.Commit()
		if e != nil {
			err = errors.New(`model提交事务失败,错误代码` + e.Error())
		}
	}
	return
}

func (this *Model) Rollback() (err error) {
	if this.Ctx != nil && this.Ctx.Transaction != nil {
		e := this.Ctx.Transaction.Rollback()
		if e != nil {
			err = errors.New(`model回滚事务失败,错误代码` + e.Error())
		}
	}
	return
}

func (this *Model) Exec(str string) (err error) {
	if this.Ctx == nil {
		this.Ctx = new(server.Context)
	}
	_, e := mysql.Exec(libraries.Str2bytes(str), 0, this.Ctx.Transaction)
	//libraries.DEBUG("delete语句" + this.buffer.String())
	if e != nil {
		err = errors.New(`执行Model.Exec出错,sql错误信息：` + e.Error() + `,错误sql：` + str)

	}
	return
}
func (this *Model) Query(str string) (result []map[string]string, err error) {
	result, e := mysql.QueryMap(libraries.Str2bytes(str), 0, nil)
	//libraries.DEBUG("delete语句" + this.buffer.String())
	if e != nil {
		err = errors.New(`执行Model.Query出错,sql错误信息：` + e.Error() + `,错误sql：` + str)

	}
	return
}
func (this *Model) Get_affected_rows() int64 {
	return this.rowsAffected
}

//目前用到WRITE锁
func (this *Model) LockTable(tablename string) error {
	this.BeginTransaction()
	return this.Exec("LOCK TABLES " + config.Server.Tablepre + tablename + " write")
}
func (this *Model) UnlockTable() error {
	this.Commit()
	this.Exec("UNLOCK TABLES")
	this.EndTransaction()
	return nil
}
