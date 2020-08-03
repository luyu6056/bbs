package mysql

import (
	"bbs/config"
	"bytes"
	"crypto/tls"
	"crypto/x509"
	"encoding/hex"
	"errors"
	"fmt"
	"io/ioutil"
	"log"
	"net/url"
	"reflect"
	"strconv"
	"strings"
	"sync"
	"time"
	"unsafe"

	jsoniter "github.com/json-iterator/go"
	"github.com/modern-go/reflect2"
)

const (
	text_pk_type_str = "varchar(255)"
	Uintptr_offset   = 32 << (^uint(0) >> 63) / 8
)

var db []*MysqlDB

type Mysql struct {
	db          *MysqlDB
	storeEngine string
	aria        *ariasetting
}
type ariasetting struct {
	TRANSACTIONAL  bool   //事务 默认关
	PAGE_CHECKSUM  bool   //校验 默认关
	TABLE_CHECKSUM bool   //默认 关
	ROW_FORMAT     string //页格式 默认DYNAMIC
}

//mysql结构
type Mysql_columns struct {
	Name        string
	Sql_type    string
	Null        string
	Sql_default interface{}
	Primary     bool
	Autoinc     bool
}

type Field_struct struct {
	Offset  uintptr
	Kind    reflect.Kind
	Field_t reflect.Type
}
type SliceHeader struct {
	Data unsafe.Pointer
	Len  int
	Cap  int
}
type Transaction struct {
	conn *Mysql_Conn
}

func (t *Transaction) GetTransaction() *Mysql_Conn {
	return t.conn
}
func (t *Transaction) BeginTransaction() {
	t.conn, _ = db[0].BeginTransaction()
}
func (t *Transaction) EndTransaction() {
	if conn := t.conn; conn != nil {
		t.conn = nil
		//rollback
		conn.Exec([]byte{114, 111, 108, 108, 98, 97, 99, 107})
		conn.DB.EndTransaction(conn)
	}
}

func (t *Transaction) Commit() error {
	_, _, err := t.conn.Exec([]byte{99, 111, 109, 109, 105, 116})
	return err
}

func (t *Transaction) Rollback() error {
	_, _, err := t.conn.Exec([]byte{114, 111, 108, 108, 98, 97, 99, 107})
	return err
}

/*执行select专用
 *返回数据结构模式[]map[string]string
 */
func QueryString(format string, i ...interface{}) (maps []map[string]string, err error) {
	if len(i) == 0 {
		return QueryMap(Str2bytes(format), 0, &Transaction{})
	}
	for k, v := range i {
		i[k] = Getvalue(v)
	}
	sql := fmt.Sprintf(strings.Replace(format, "?", `%s`, -1), i...)
	return QueryMap(Str2bytes(sql), 0, &Transaction{})
}
func QueryMap(select_sql []byte, master int, t *Transaction) (maps []map[string]string, err error) {
	rows := rows_pool.Get().(*MysqlRows)
	defer rows_pool.Put(rows)

	var columns [][]byte
	var ts *Mysql_Conn
	if t != nil {
		ts = t.GetTransaction()
	}
	if ts != nil {
		ts.Lock.Lock()
		defer ts.Lock.Unlock()
	}

Retry:
	if ts != nil {
		columns, err = ts.Query(select_sql, rows)
		if err != nil {
			return
		}
	} else {
		columns, err = db[master].Query(select_sql, rows)
		if err != nil {
			if strings.Contains(err.Error(), "EOF") {
				goto Retry
			} else if strings.Contains(err.Error(), "broken pipe") { //unix断连
				goto Retry
			} else {
				return nil, err
			}
		}
	}
	if rows.result_len == 0 {
		return
	}
	maps = make([]map[string]string, rows.result_len)
	for index, msglen := range rows.msg_len {
		rows.Buffer2.Reset()
		rows.Buffer2.Write(rows.Buffer.Next(msglen))

		//将行数据保存到record字典
		record := make(map[string]string, len(columns))
		for _, key := range columns {
			rows.buffer, err = ReadLength_Coded_Byte(rows.Buffer2)
			if err != nil {
				return
			}
			record[string(key)] = string(rows.buffer)
		}
		maps[index] = record
	}
	return maps, nil
}
func Query(select_sql []byte, master int, t *Transaction, r interface{}) (err error) {
	var is_struct, is_slice, is_ptr bool
	var obj_t, type_struct reflect.Type
	var field_m map[string]*Field_struct
	var header *SliceHeader
	var ref_ptr unsafe.Pointer

	obj_t = reflect.TypeOf(r)
	if obj_t.Kind() != reflect.Ptr {
		err = errors.New("传入的不是指针无法赋值")
		return
	}
	obj_t = obj_t.Elem()

	switch obj_t.Kind() {
	case reflect.Slice:
		//取出slice里面的类型
		ref_ptr = reflect2.PtrOf(r)
		header = (*SliceHeader)(ref_ptr)
		header.Len = 0
		type_struct = obj_t.Elem()
		if type_struct.Kind() == reflect.Struct {
			is_slice = true
		} else if type_struct.Kind() == reflect.Ptr {
			type_struct = type_struct.Elem()
			if type_struct.Kind() == reflect.Struct {
				is_slice = true
				is_ptr = true
			}
		}

	case reflect.Struct:
		type_struct = obj_t
		is_struct = true
		ref_ptr = reflect2.PtrOf(r)
	case reflect.Ptr:
		is_ptr = true
		type_struct = obj_t.Elem()
		switch type_struct.Kind() {

		case reflect.Struct:
			ref_ptr = reflect2.PtrOf(r)
			is_struct = true
		default:
			err = errors.New("不支持的反射类型")
			return
		}
	default:
		err = errors.New("只能对slice进行反射赋值")
		return
	}

	rows := rows_pool.Get().(*MysqlRows)
	defer rows_pool.Put(rows)

	var columns [][]byte
	var ts *Mysql_Conn
	if t != nil {
		ts = t.GetTransaction()
	}
	if ts != nil {
		ts.Lock.Lock()
		defer ts.Lock.Unlock()
	}

Retry:
	if ts != nil {
		columns, err = ts.Query(select_sql, rows)
		if err != nil {
			return
		}
	} else {
		columns, err = db[master].Query(select_sql, rows)
		if err != nil {

			if strings.Contains(err.Error(), "EOF") {
				goto Retry
			} else if strings.Contains(err.Error(), "broken pipe") { //unix断连
				goto Retry
			} else {
				return err
			}
		}
	}

	if rows.result_len == 0 {
		return nil
	}
	if rows.field_m[type_struct.Name()] == nil {
		rows.field_m[type_struct.Name()] = make(map[string]*Field_struct)
	}
	field_m = rows.field_m[type_struct.Name()]

	if is_slice {
		if header.Len < rows.result_len {
			if header.Cap < rows.result_len {
				valType := reflect2.TypeOf(r)
				var elemType = valType.(*reflect2.UnsafePtrType).Elem()

				elemType.(*reflect2.UnsafeSliceType).UnsafeGrow(ref_ptr, rows.result_len)
			} else {
				header.Len = rows.result_len
			}
		}
	}

	var field_struct *Field_struct
	var uint_ptr uintptr
	for index, mglen := range rows.msg_len {
		rows.Buffer2.Reset()
		rows.Buffer2.Write(rows.Buffer.Next(mglen))

		if is_struct {
			if is_ptr {
				if reflect2.IsNil(*(*interface{})(unsafe.Pointer(ref_ptr))) {
					*(*uintptr)(ref_ptr) = reflect.New(type_struct).Pointer()
				}
				uint_ptr = *(*uintptr)(ref_ptr)
			} else {
				uint_ptr = uintptr(ref_ptr)
			}

		} else {
			if is_ptr {
				uint_ptr = uintptr(header.Data) + Uintptr_offset*uintptr(index)
				if reflect2.IsNil(*(*interface{})(unsafe.Pointer(uint_ptr))) {
					//obj_v.Index(index).Set(reflect.New(obj_v.Type().Elem()))
					*((*uintptr)(unsafe.Pointer(uint_ptr))) = reflect.New(type_struct).Pointer()
				}
				uint_ptr = *(*uintptr)(unsafe.Pointer(uint_ptr)) //获取指针真正的地址
			} else {
				uint_ptr = uintptr(header.Data) + type_struct.Size()*uintptr(index)
			}

		}

		for _, key := range columns {
			rows.buffer, err = ReadLength_Coded_Byte(rows.Buffer2)
			if err != nil {
				return err
			}

			if v, ok := field_m[*(*string)(unsafe.Pointer(&key))]; ok {
				if v.Kind == reflect.Invalid {
					continue
				}
				field_struct = v
			} else {
				real_key := string(key)
				key[0] = bytes.ToUpper(key[:1])[0]
				field, ok := type_struct.FieldByName(real_key)

				if !ok {

					field_m[real_key] = &Field_struct{Kind: reflect.Invalid}
					continue
				}
				field_struct = &Field_struct{Offset: field.Offset, Kind: field.Type.Kind(), Field_t: field.Type}
				field_m[real_key] = field_struct
			}

			switch field_struct.Kind {
			case reflect.Int:
				ii, _ := strconv.Atoi(*(*string)(unsafe.Pointer(&rows.buffer)))
				*((*int)(unsafe.Pointer(uint_ptr + field_struct.Offset))) = ii
			case reflect.Int8:
				ii, _ := strconv.Atoi(*(*string)(unsafe.Pointer(&rows.buffer)))
				*((*int8)(unsafe.Pointer(uint_ptr + field_struct.Offset))) = int8(ii)
			case reflect.Int16:
				ii, _ := strconv.Atoi(*(*string)(unsafe.Pointer(&rows.buffer)))
				*((*int16)(unsafe.Pointer(uint_ptr + field_struct.Offset))) = int16(ii)
			case reflect.Int32:
				ii, _ := strconv.Atoi(*(*string)(unsafe.Pointer(&rows.buffer)))
				*((*int32)(unsafe.Pointer(uint_ptr + field_struct.Offset))) = int32(ii)
			case reflect.Int64:
				ii, _ := strconv.Atoi(*(*string)(unsafe.Pointer(&rows.buffer)))
				*((*int64)(unsafe.Pointer(uint_ptr + field_struct.Offset))) = int64(ii)
			case reflect.Uint:
				ii, _ := strconv.Atoi(*(*string)(unsafe.Pointer(&rows.buffer)))
				*((*uint8)(unsafe.Pointer(uint_ptr + field_struct.Offset))) = uint8(ii)
			case reflect.Uint8:
				ii, _ := strconv.Atoi(*(*string)(unsafe.Pointer(&rows.buffer)))
				*((*uint8)(unsafe.Pointer(uint_ptr + field_struct.Offset))) = uint8(ii)
			case reflect.Uint16:
				ii, _ := strconv.Atoi(*(*string)(unsafe.Pointer(&rows.buffer)))
				*((*uint16)(unsafe.Pointer(uint_ptr + field_struct.Offset))) = uint16(ii)
			case reflect.Uint32:
				ii, _ := strconv.Atoi(*(*string)(unsafe.Pointer(&rows.buffer)))
				*((*uint32)(unsafe.Pointer(uint_ptr + field_struct.Offset))) = uint32(ii)
			case reflect.Uint64:
				ii, _ := strconv.ParseUint(*(*string)(unsafe.Pointer(&rows.buffer)), 10, 64)
				*((*uint64)(unsafe.Pointer(uint_ptr + field_struct.Offset))) = uint64(ii)
			case reflect.Float32:
				f, _ := strconv.ParseFloat(*(*string)(unsafe.Pointer(&rows.buffer)), 32)
				*((*float32)(unsafe.Pointer(uint_ptr + field_struct.Offset))) = float32(f)
			case reflect.Float64:
				f, _ := strconv.ParseFloat(*(*string)(unsafe.Pointer(&rows.buffer)), 64)
				*((*float64)(unsafe.Pointer(uint_ptr + field_struct.Offset))) = f
			case reflect.String:
				if str := string(rows.buffer); str != "NULL" {
					*((*string)(unsafe.Pointer(uint_ptr + field_struct.Offset))) = string(rows.buffer)
				}

			case reflect.Bool:
				*((*bool)(unsafe.Pointer(uint_ptr + field_struct.Offset))) = rows.buffer[0] == 49
			case reflect.Struct:
				switch field_struct.Field_t.String() {
				case "time.Time":
					*((*time.Time)(unsafe.Pointer(uint_ptr + field_struct.Offset))), _ = time.ParseInLocation("2006-01-02 15:04:05", string(rows.buffer), time.Local)
				default:
					field := reflect.NewAt(field_struct.Field_t, unsafe.Pointer(uint_ptr+field_struct.Offset))
					jsoniter.Unmarshal(rows.buffer, field.Interface())

				}

			case reflect.Slice, reflect.Map:
				field := reflect.NewAt(field_struct.Field_t, unsafe.Pointer(uint_ptr+field_struct.Offset))
				jsoniter.Unmarshal(rows.buffer, field.Interface())
			case reflect.Ptr:
				if *(*string)(unsafe.Pointer(&rows.buffer)) != "NULL" {
					if len(rows.buffer) == 0 || (len(rows.buffer) == 1 && rows.buffer[0] == 0xC0) {
						continue
					}
					field := reflect.New(field_struct.Field_t.Elem())
					err := jsoniter.Unmarshal(rows.buffer, field.Interface())
					if err == nil {
						*((*uintptr)(unsafe.Pointer(uint_ptr + field_struct.Offset))) = field.Pointer()
					}
				}
			default:
				DEBUG("mysql.Select()反射struct写入需要处理,字段名称", string(key), "预计类型", field_struct.Kind)
			}

		}
		if is_struct {
			break
		}
	}

	return
}

/*执行sql语句
 *返回新增ID和error
 *
 */
func Insert(insert_sql []byte, master int, t *Transaction) (LastInsertId, rowsAffected int64, err error) {

	var ts *Mysql_Conn
	if t != nil {
		ts = t.GetTransaction()
	}
	if ts != nil {
		ts.Lock.Lock()
		defer ts.Lock.Unlock()
		LastInsertId, rowsAffected, err = ts.Exec(insert_sql)
	} else {
	Retry:
		LastInsertId, rowsAffected, err = db[master].Exec(insert_sql)
		if err != nil {
			if strings.Contains(err.Error(), "EOF") {
				goto Retry
			} else if strings.Contains(err.Error(), "broken pipe") { //unix断连
				goto Retry
			} else {
				return 0, 0, err
			}
		}
	}
	return
}

/*执行sql语句
 *返回error
 *
 */
func Exec(query_sql []byte, master int, t *Transaction) (result bool, err error) {
	var ts *Mysql_Conn
	if t != nil {
		ts = t.GetTransaction()
	}
	if ts != nil {
		ts.Lock.Lock()
		defer ts.Lock.Unlock()
		_, _, err = ts.Exec(query_sql)

	} else {
	Retry:
		_, _, err = db[master].Exec(query_sql)
		if err != nil {
			if strings.Contains(err.Error(), "EOF") {
				goto Retry
			} else if strings.Contains(err.Error(), "broken pipe") { //unix断连
				goto Retry
			} else {
				return false, err
			}
		}

	}
	result = false
	if err == nil {
		result = true
	}
	return
}

//执行语句并取受影响行数
func Query_getaffected(query_sql []byte, master int, t *Transaction) (rowsAffected int64, err error) {
	var ts *Mysql_Conn
	if t != nil {
		ts = t.GetTransaction()
	}
	if ts != nil {
		ts.Lock.Lock()
		defer ts.Lock.Unlock()
		_, rowsAffected, err = ts.Exec(query_sql)

	} else {
	Retry:
		_, rowsAffected, err = db[master].Exec(query_sql)

		if err != nil {
			if strings.Contains(err.Error(), "EOF") {
				goto Retry
			} else if strings.Contains(err.Error(), "broken pipe") { //unix断连
				goto Retry
			} else {
				return 0, err
			}
		}
	}
	return
}

/*列出所有表
func (this *Mysql) ShowTables(master string) (list orm.ParamsList) {
	if master != "slave" && master != "default" {
		master = "default"
	}
	s := o
	s.Using(master)
	sql := "SHOW TABLES"
	s.Raw(sql).ValuesFlat(&list)
	return
}*/

/*列出表结构
func (this *Mysql) ShowColumns(table string, master string) map[string]Mysql_columns {
	sql := "SHOW COLUMNS FROM `" + table + "`"
	result, err := this.Select(sql, master, new(Transaction))
	Errorlog(err, "初始化错误，无法列出表结构")
	re := make(map[string]Mysql_columns)
	for _, tmp := range result {
		re[tmp["Field"].(string)] = Mysql_columns{Name: tmp["Field"].(string), Sql_type: tmp["Type"].(string), Null: tmp["Null"].(string), Sql_default: tmp["Default"], Primary: (tmp["Key"].(string) == "PRI"), Autoinc: (tmp["Extra"].(string) == "auto_increment")}
	}
	return re
}*/

func Mysql_init() {
	db = make([]*MysqlDB, 2)
	var str, str1 [][]string
	if str, _ = Preg_match_result(`([^:]+):([^@]*)@(tcp)?(unix)?\(([^)]*)\)\/([^?]+)(\?[^?]+)`, config.Server.MasterDB, 1); len(str) == 0 {
		log.Fatal("mysql初始化失败，解析连接字串错误" + config.Server.MasterDB)

	}

	var mysqlssl *tls.Config
	if config.Server.Mysql_ssl_ca != "" && config.Server.Mysql_ssl_cert != "" && config.Server.Mysql_ssl_key != "" {
		cert, err := tls.LoadX509KeyPair(config.Server.Mysql_ssl_cert, config.Server.Mysql_ssl_key)
		if err != nil {
			log.Fatalf("mysql证书初始化失败 err:%v", err)

		}
		certPool := x509.NewCertPool()
		ca, err := ioutil.ReadFile(config.Server.Mysql_ssl_ca)
		if err != nil {
			log.Fatalf("mysql证书初始化失败 err: %v", err)
		}
		if ok := certPool.AppendCertsFromPEM(ca); !ok {
			log.Fatalf("mysql证书初始化失败 certPool.AppendCertsFromPEM err")
		}
		mysqlssl = &tls.Config{
			Certificates:       []tls.Certificate{cert},
			InsecureSkipVerify: true,
			RootCAs:            certPool,
		}
	}
	DEBUG(time.Now().Format("2006-01-02 15:04:05") + "连接主数据库" + config.Server.MasterDB)
	var charset = "utf8"
	_, offset := time.Now().Zone()
	var time_zone string
	if offset >= 0 {
		time_zone = "+" + strconv.Itoa(offset/3600) + ":00"
	} else {
		time_zone = strconv.Itoa(offset/3600) + ":00"
	}
	if str[0][7] != "" {
		for _, s := range strings.Split(str[0][7], "&") {
			if value := strings.Split(url.PathEscape(s), "="); len(value) == 2 {
				switch value[0] {
				case "charset":
					charset = value[1]
				case "time_zone":
					time_zone = value[2]
				}
			}
		}
	}
	db[0] = mysql_open(str[0][1], str[0][2], str[0][5], str[0][6], charset, time_zone, mysqlssl)
	//从

	if str1, _ = Preg_match_result(`([^:]+):([^@]*)@(tcp)?(unix)?\(([^)]*)\)\/([^?]+)\?charset=(\S+)`, config.Server.SlaveDB, 1); len(str) == 0 {
		log.Fatal("mysql初始化失败，解析连接字串错误" + config.Server.SlaveDB)
		return
	}

	DEBUG(time.Now().Format("2006-01-02 15:04:05") + "连接从数据库" + config.Server.SlaveDB)
	db[1] = mysql_open(str1[0][1], str1[0][2], str1[0][5], str1[0][6], charset, time_zone, mysqlssl)
	var new_mysql *Mysql
	for i, mysql := range db {
		mysql.MaxOpenConns = config.Server.DBMaxConn
		mysql.MaxIdleConns = config.Server.DBMaxIdle
		mysql.ConnMaxLifetime = config.Server.DBMaxLife
		err := mysql.Ping()
		if err != nil {
			fmt.Println("数据库连接失败", err.Error())

		} else if i == 0 {
			new_mysql = &Mysql{db: mysql}
		}
	}
	for _, v := range Init_register_db {
		v.Init(new_mysql)
		v.Mysql = new_mysql
	}
}

var Init_register_db []*Db_init

type Db_init struct {
	Init    func(db *Mysql)
	Destroy func()
	Mysql   *Mysql
}

func Mysql_close() {
	for _, v := range Init_register_db {
		v.Destroy()
	}
	for _, v := range db {
		v.Conn_m.Range(func(_, conn interface{}) bool {
			conn.(*Mysql_Conn).Close()
			conn.(*Mysql_Conn).Status = false
			return true
		})
	}
}
func (mysql *Mysql) Sync2(i ...interface{}) (errs []error) {

	var default_engine string
	var support_tokudb bool
	var support_Archive bool
	var support_Aria bool
	res, err := QueryString("show engines")
	if err != nil {
		return []error{err}
	}
	for _, v := range res {
		if v["Support"] == "DEFAULT" {
			default_engine = v["Engine"]
		}
		switch v["Engine"] {
		case "TokuDB":
			support_tokudb = (v["Support"] == "DEFAULT" || v["Support"] == "YES")
		case "Archive":
			support_Archive = (v["Support"] == "DEFAULT" || v["Support"] == "YES")
		case "Aria":
			support_Aria = (v["Support"] == "DEFAULT" || v["Support"] == "YES")
		}

	}
	if mysql.storeEngine == "" {
		mysql.storeEngine = default_engine
	}
	switch mysql.storeEngine {
	case "Archive":
		switch {
		case support_Archive:
			mysql.storeEngine = "Archive"
		case support_tokudb:
			mysql.storeEngine = "TokuDB"
		case support_Aria:
			mysql.storeEngine = "Aria"
		default:
			mysql.storeEngine = "MyISAM"
		}
	case "TokuDB":
		if !support_tokudb {
			switch {
			case support_Aria:
				mysql.storeEngine = "Aria"
			default:
				mysql.storeEngine = "MyISAM"
			}
		}
	case "Aria":
		if !support_Aria {
			mysql.storeEngine = "MyISAM"
		}
	}

	var wg sync.WaitGroup
	wg.Add(len(i))
	for _, v := range i {
		go func(v interface{}) {
			defer wg.Done()
			buf := bytes.NewBuffer(nil)
			buf2 := bytes.NewBuffer(nil)
			obj := reflect.ValueOf(v)
			if obj.Kind() != reflect.Ptr {
				errs = append(errs, errors.New("sync2需要传入指针型struct"))
				return
			}
			r := obj.Elem()
			t := r.Type()
			table_name := t.Name()

			res, err := QueryString(`show tables like ?`, table_name)
			if err != nil {
				errs = append(errs, errors.New(table_name+":"+err.Error()))
				return
			}

			index := map[string]bool{} //普通索引
			if res == nil {
				buf.Reset()
				buf.WriteString("CREATE TABLE `")
				buf.WriteString(table_name)
				buf.WriteString("` (")
				buf2.Reset()
				buf2.WriteString("PRIMARY KEY (")
				var have_pk bool

				for i := 0; i < r.NumField(); i++ {
					var is_pk, notnull bool
					var default_str, extra_str string
					field := r.Field(i)
					field_t := t.Field(i)
					field_str := field_t.Name
					tag := field_t.Tag.Get(`db`)
					if tag == `-` {
						continue
					}
					if strings.Contains(tag, "pk") {
						is_pk = true
						have_pk = true
						buf2.WriteString("`" + field_str + "`")
						buf2.WriteByte(44)
						notnull = true
					}
					if strings.Contains(tag, "notnull") || strings.Contains(tag, "not null") {
						notnull = true
					}
					if strings.Contains(tag, `index`) {
						index[field_str] = true
						notnull = true
					}

					if sc, _ := Preg_match_result(`default\((\d+)\)`, tag, 1); len(sc) > 0 {
						default_str = " DEFAULT '" + sc[0][1] + "'"
					} else if sc, _ := Preg_match_result(`default\('([^']*)'\)`, tag, 1); len(sc) > 0 {
						default_str = " DEFAULT '" + sc[0][1] + "'"
					}
					if sc, _ := Preg_match_result(`extra\('([^']*)'\)`, tag, 1); len(sc) > 0 {
						extra_str = sc[0][1]
					}
					buf.WriteString("`" + field_str + "` ")
					var is_text bool
					switch field.Kind() {
					case reflect.Int64, reflect.Int:
						buf.WriteString("bigint(20)")
						if default_str == "" {
							default_str = " DEFAULT '0'"
						}
					case reflect.Uint64, reflect.Uint:
						buf.WriteString("bigint(20) unsigned")
						if default_str == "" {
							default_str = " DEFAULT '0'"
						}
					case reflect.String:
						if sc, _ := Preg_match_result(`type:(varchar\(\d+\))`, tag, 1); len(sc) > 0 {
							buf.WriteString(sc[0][1])
							if default_str == "" {
								default_str = " DEFAULT ''"
							}
							break
						}
						if sc, _ := Preg_match_result(`type:(char\(\d+\))`, tag, 1); len(sc) > 0 {
							buf.WriteString(sc[0][1])
							if default_str == "" {
								default_str = " DEFAULT ''"
							}
							break
						}
						if is_pk {
							buf.WriteString(text_pk_type_str)
							if default_str == "" {
								default_str = " DEFAULT ''"
							}
							break
						}
						is_text = true
						switch {
						case strings.Contains(tag, `type:mediumtext`):
							buf.WriteString("mediumtext")
						case strings.Contains(tag, `type:longtext`):
							buf.WriteString("longtext")
						case strings.Contains(tag, `type:tinytext`):
							buf.WriteString("tinytext")
						default:
							buf.WriteString("text")
						}
					case reflect.Int32:
						buf.WriteString("int(11)")
						if default_str == "" {
							default_str = " DEFAULT '0'"
						}
					case reflect.Uint32:
						buf.WriteString("int(11) unsigned")
						if default_str == "" {
							default_str = " DEFAULT '0'"
						}
					case reflect.Int8:
						buf.WriteString("tinyint(3)")
						if default_str == "" {
							default_str = " DEFAULT '0'"
						}
					case reflect.Uint8:
						buf.WriteString("tinyint(3) unsigned")
						if default_str == "" {
							default_str = " DEFAULT '0'"
						}
					case reflect.Int16:
						buf.WriteString("smallint(6)")
						if default_str == "" {
							default_str = " DEFAULT '0'"
						}
					case reflect.Uint16:
						buf.WriteString("smallint(6) unsigned")
						if default_str == "" {
							default_str = " DEFAULT '0'"
						}
					case reflect.Float32:
						buf.WriteString("float")
						if default_str == "" {
							default_str = " DEFAULT 0"
						}
					case reflect.Bool:
						buf.WriteString("tinyint(1)")
						if default_str == "" {
							default_str = " DEFAULT '0'"
						}
					case reflect.Struct:
						switch field.Interface().(type) {
						case time.Time:
							switch {
							case strings.Contains(tag, "type:datetime"):
								buf.WriteString("datetime")
							case strings.Contains(tag, "type:timestamp"):
								buf.WriteString("timestamp")
							case strings.Contains(tag, "type:time"):
								buf.WriteString("time")
							case strings.Contains(tag, "type:date"):
								buf.WriteString("date")
							default:
								buf.WriteString("datetime")
							}

							if default_str == "" {
								default_str = " DEFAULT current_timestamp()"
							}
						default:

							is_text = true
							switch {
							case strings.Contains(tag, "type:longblob"):
								buf.WriteString("longblob")
							case strings.Contains(tag, "type:mediumblob"):
								buf.WriteString("mediumblob")
							case strings.Contains(tag, "type:tinyblob"):
								buf.WriteString("tinyblob")
							case strings.Contains(tag, "type:blob"):
								buf.WriteString("blob")
							case strings.Contains(tag, "type:longtext"):
								buf.WriteString("longtext")
							case strings.Contains(tag, "type:mediumtext"):
								buf.WriteString("mediumblob")
							case strings.Contains(tag, "type:tinytext"):
								buf.WriteString("tinytext")
							default:
								buf.WriteString("text")
							}

						}
					default:
						is_text = true
						switch {
						case strings.Contains(tag, "type:longblob"):
							buf.WriteString("longblob")
						case strings.Contains(tag, "type:mediumblob"):
							buf.WriteString("mediumblob")
						case strings.Contains(tag, "type:tinyblob"):
							buf.WriteString("tinyblob")
						case strings.Contains(tag, "type:blob"):
							buf.WriteString("blob")
						case strings.Contains(tag, "type:longtext"):
							buf.WriteString("longtext")
						case strings.Contains(tag, "type:mediumtext"):
							buf.WriteString("mediumblob")
						case strings.Contains(tag, "type:tinytext"):
							buf.WriteString("tinytext")
						default:
							buf.WriteString("text")
						}

					}
					if is_pk {
						buf.WriteString(" NOT NULL")
						if strings.Contains(tag, "auto_increment") {
							buf.WriteString(" AUTO_INCREMENT")
						} else {
							buf.WriteString(default_str)
						}

						buf.WriteByte(44)
						continue
					}

					if notnull {
						buf.WriteString(" NOT NULL")
					} else {
						buf.WriteString(" NULL")
					}
					if strings.Contains(tag, "auto_increment") {
						buf.WriteString(" AUTO_INCREMENT")
					} else if !is_text {
						buf.WriteString(default_str)
					}
					buf.WriteString(" ")
					buf.WriteString(extra_str)
					buf.WriteByte(44)
				}
				if have_pk {
					buf.Write(buf2.Next(buf2.Len() - 1))
					buf.WriteString(")")
				} else {
					l := buf.Len()
					buf.Write(buf.Next(l)[:l-1])
				}
				buf.WriteString(") ENGINE=")
				buf.WriteString(mysql.storeEngine)
				buf.WriteString(" DEFAULT CHARSET=utf8")
				if mysql.storeEngine == "Aria" {
					if mysql.aria != nil {
						if mysql.aria.TRANSACTIONAL {
							buf.WriteString(" TRANSACTIONAL = 1")
						} else {
							buf.WriteString(" TRANSACTIONAL = 0")
						}
						if mysql.aria.PAGE_CHECKSUM {
							buf.WriteString(" PAGE_CHECKSUM = 1")
						} else {
							buf.WriteString(" PAGE_CHECKSUM = 0")
						}
						if mysql.aria.TABLE_CHECKSUM {
							buf.WriteString(" TABLE_CHECKSUM = 1")
						} else {
							buf.WriteString(" TABLE_CHECKSUM = 0")
						}
						if mysql.aria.ROW_FORMAT != "" {
							buf.WriteString(" ROW_FORMAT = ")
							buf.WriteString(mysql.aria.ROW_FORMAT)
						}

					} else {
						buf.WriteString(" TRANSACTIONAL = 0 PAGE_CHECKSUM = 0 TABLE_CHECKSUM = 0 ROW_FORMAT = DYNAMIC")
					}
				}
				_, err := Exec(buf.Bytes(), 0, &Transaction{})
				if err != nil {
					errs = append(errs, errors.New("执行新建数据库失败："+err.Error()+" 错误sql:"+buf.String()))
					return
				}
			} else {
				res, err = QueryString(`desc ` + table_name)
				if err != nil {
					errs = append(errs, errors.New(table_name+":"+err.Error()))
					return
				}
				var pk, sql []string
				var pk_num int
				var res_m = make(map[string]map[string]string, len(res))
				for _, value := range res {
					if value["Key"] == "PRI" {
						pk_num++
					}
					res_m[value["Field"]] = value
				}

				for i := 0; i < r.NumField(); i++ {
					field_t := t.Field(i)
					field := r.Field(i)
					tag := field_t.Tag.Get(`db`)
					if tag == `-` {
						continue
					}
					field_str := field_t.Name
					var is_change int8
					var is_text bool
					var notnull, is_pk bool
					var default_str, varchar_str, extra_str string
					sql_str := make([]string, 5)
					if value, ok := res_m[field_str]; ok {
						extra_str = ""
						sql_str[4] = value["Extra"]
						default_str = value["Default"]
						sql_str[1] = value["Type"]
						if value["Null"] == "YES" {
							sql_str[2] = "NULL"
						} else {
							sql_str[2] = "NOT NULL"
						}

						sql_str[3] = value["Default"]
						if sql_str[3] == "''" {
							sql_str[3] = ""
						}
						if default_str == "''" {
							default_str = ""
						}
						if strings.Contains(tag, "pk") {
							is_pk = true
							notnull = true
						}
						if strings.Contains(tag, "notnull") || strings.Contains(tag, "not null") {
							notnull = true
						}
						if strings.Contains(tag, "index") {
							index[field_str] = true
							notnull = true
							if sql_str[2] == "NULL" {
								sql_str[2] = "NOT NULL"
							}
						}

						if sc, _ := Preg_match_result(`default\((\d+)\)`, tag, 1); len(sc) > 0 {
							default_str = sc[0][1]

						} else if sc, _ := Preg_match_result(`default\('([^']*)'\)`, tag, 1); len(sc) > 0 {
							default_str = sc[0][1]
						}
						if sc, _ := Preg_match_result(`extra\('([^']*)'\)`, tag, 1); len(sc) > 0 {
							extra_str = sc[0][1]
						}
						if field.Kind() == reflect.String {
							switch {
							case strings.Contains(tag, "type:longtext"):
								varchar_str = "longtext"
								notnull = false
							case strings.Contains(tag, "type:mediumtext"):
								varchar_str = "mediumtext"
								notnull = false
							case strings.Contains(tag, "type:tinytext"):
								varchar_str = "tinytext"
								notnull = false
							case strings.Contains(tag, "type:text"):
								varchar_str = "text"
								notnull = false
							default:
								if sc, _ := Preg_match_result(`type:(varchar\(\d+\))`, tag, 1); len(sc) > 0 {
									varchar_str = sc[0][1]
								} else {
									if sc, _ := Preg_match_result(`type:(char\(\d+\))`, tag, 1); len(sc) > 0 {
										varchar_str = sc[0][1]
									}
								}
							}
						} else {
							switch {
							case strings.Contains(tag, "type:longblob"):
								varchar_str = "longblob"
								notnull = false
							case strings.Contains(tag, "type:mediumblob"):
								varchar_str = "mediumblob"
								notnull = false
							case strings.Contains(tag, "type:tinyblob"):
								varchar_str = "tinyblob"
								notnull = false
							case strings.Contains(tag, "type:blob"):
								varchar_str = "blob"
								notnull = false
							case strings.Contains(tag, "type:longtext"):
								varchar_str = "longtext"
								notnull = false
							case strings.Contains(tag, "type:mediumtext"):
								varchar_str = "mediumblob"
								notnull = false
							case strings.Contains(tag, "type:tinytext"):
								varchar_str = "tinytext"
								notnull = false
							case strings.Contains(tag, "type:text"):
								varchar_str = "text"
								notnull = false
							default:
								if sc, _ := Preg_match_result(`type:(varchar\(\d+\))`, tag, 1); len(sc) > 0 {
									varchar_str = sc[0][1]
								} else {
									if sc, _ := Preg_match_result(`type:(char\(\d+\))`, tag, 1); len(sc) > 0 {
										varchar_str = sc[0][1]
									}
								}
							}
						}

						if notnull {
							if value["Null"] == "YES" {
								is_change = 1
								sql_str[2] = "NOT NULL"
							}
						} else {
							if value["Null"] == "NO" {
								is_change = 2
								sql_str[2] = "NULL"
							}
						}
						if strings.Contains(tag, "auto_increment") {
							extra_str = "auto_increment"
							if !strings.Contains(value["Extra"], "auto_increment") {
								is_change = 3
							}
						}

						switch field.Kind() {
						case reflect.Int64, reflect.Int:
							if sql_str[1] != "bigint(20)" {
								is_change = 4
								sql_str[1] = "bigint(20)"
							}
							if default_str == "" || (is_pk && default_str == "NULL") {
								default_str = "0"
							}
						case reflect.Uint64, reflect.Uint:
							if sql_str[1] != "bigint(20) unsigned" {
								is_change = 5
								sql_str[1] = "bigint(20) unsigned"
							}
							if default_str == "" || (is_pk && default_str == "NULL") {
								default_str = "0"
							}
						case reflect.Float32:
							if sql_str[1] != "float" {
								is_change = 6
								sql_str[1] = "float"
							}
							if default_str == "" || (is_pk && default_str == "NULL") {
								default_str = "0"
							}
						case reflect.String:
							if varchar_str != "" {
								if sql_str[1] != varchar_str {
									is_change = 7
									sql_str[1] = varchar_str
								}
								break
							}
							sql_str[3] = default_str
							if strings.Contains(tag, "type:text") {
								is_text = true
								if is_pk {
									if sql_str[1] != text_pk_type_str {
										is_change = 8
										sql_str[1] = "text"
									}
								} else {
									if sql_str[1] != "text" {
										is_change = 9
										sql_str[1] = "text"
									}
								}
							} else {
								is_text = true
								if is_pk {
									if sql_str[1] != text_pk_type_str {
										is_change = 10
										sql_str[1] = "text"
									}
								} else {
									if sql_str[1] != "text" {
										is_change = 11
										sql_str[1] = "text"
									}
								}

							}
						case reflect.Int32:
							if sql_str[1] != "int(11)" {
								is_change = 12
								sql_str[1] = "int(11)"
							}
							if default_str == "" || (is_pk && default_str == "NULL") {
								default_str = "0"
							}

						case reflect.Uint32:
							if sql_str[1] != "int(11) unsigned" {
								is_change = 13
								sql_str[1] = "int(11) unsigned"
							}
							if default_str == "" || (is_pk && default_str == "NULL") {
								default_str = "0"
							}
						case reflect.Int8:
							if sql_str[1] != "tinyint(3)" {
								is_change = 14
								sql_str[1] = "tinyint(3)"
							}
							if default_str == "" || (is_pk && default_str == "NULL") {
								default_str = "0"
							}
						case reflect.Uint8:
							if sql_str[1] != "tinyint(3) unsigned" {
								is_change = 15
								sql_str[1] = "tinyint(3) unsigned"
							}
							if default_str == "" || (is_pk && default_str == "NULL") {
								default_str = "0"
							}
						case reflect.Int16:
							if sql_str[1] != "smallint(6)" {
								is_change = 16
								sql_str[1] = "smallint(6)"
							}
							if default_str == "" || (is_pk && default_str == "NULL") {
								default_str = "0"
							}
						case reflect.Uint16:
							if sql_str[1] != "smallint(6) unsigned" {
								is_change = 17
								sql_str[1] = "smallint(6) unsigned"
							}
							if default_str == "" || (is_pk && default_str == "NULL") {
								default_str = "0"
							}
						case reflect.Bool:
							if sql_str[1] != "tinyint(1)" {
								is_change = 18
								sql_str[1] = "tinyint(1)"
							}
							if default_str == "" || (is_pk && default_str == "NULL") {
								default_str = "1"
							}
						case reflect.Struct:
							switch field.Interface().(type) {
							case time.Time:
								var timestr = "datetime"
								switch {
								case strings.Contains(tag, "type:timestamp"):
									timestr = "timestamp"
								case strings.Contains(tag, "type:time"):
									timestr = "time"
								case strings.Contains(tag, "type:date"):
									timestr = "date"
								}
								if sql_str[1] != timestr {
									is_change = 19
									sql_str[1] = timestr
								}
								if Preg_match(`^\d{4}-\d{2}-\d{2}$`, default_str) {
									default_str += " 00:00:00"
								}
								if default_str == "" || default_str == "NULL" {
									default_str = "current_timestamp()"
								}

							default:
								is_text = true
								if !strings.Contains(sql_str[1], "text") {
									is_change = 20
									sql_str[1] = "text"
								}
								default_str = "NULL"
							}
						default:

							if varchar_str != "" {
								if sql_str[1] != varchar_str {
									is_change = 21
									sql_str[1] = varchar_str
								}
								default_str = "NULL"
							} else {
								is_text = true
								if !strings.Contains(sql_str[1], "text") {
									is_change = 22
									sql_str[1] = "text"
								}
								default_str = "NULL"
							}

						}
						if is_pk {
							pk = append(pk, field_str)
							sql_str[2] = "NOT NULL"
							if !strings.Contains(sql_str[1], "char") {
								if sql_str[3] != "0" && sql_str[3] != "current_timestamp()" {
									sql_str[3] = "NULL"
								}
								if extra_str == "auto_increment" || default_str == "" {
									default_str = "NULL"
								}
							}

							if is_text {
								sql_str[1] = text_pk_type_str
							}

						}
						if sql_str[3] != default_str {
							is_change = 23

							sql_str[3] = default_str
						}
						if sql_str[4] != extra_str {
							is_change = 24
							sql_str[4] = extra_str
						}
						if sql_str[3] != "" {
							switch sql_str[3] {
							case "current_timestamp()":
								sql_str[3] = "Default " + sql_str[3]
							case "AUTO_INCREMENT":
							case "NULL":
								sql_str[3] = "Default NULL"
							default:
								sql_str[3] = "Default '" + strings.Trim(sql_str[3], "'") + "'"
							}

						} else {
							sql_str[3] = "Default ''"
						}

						if is_change > 0 {
							if is_text {
								sql_str[3] = ""
							}
							sql_str[0] = "modify column `" + field_str + "`"
							DEBUG(is_change, sql_str)
							sql = append(sql, strings.Join(sql_str, " "))
						}
					} else {
						var after string
						if i == 0 {
							after = " FIRST"
						}
						for index := i - 1; index > -1; index-- {
							before_field := t.Field(index)
							if before_field.Tag.Get(`db`) == `-` {
								continue
							}
							after = " AFTER `" + before_field.Name + "`"
							break
						}

						switch field.Kind() {
						case reflect.Int64, reflect.Int:
							sql_str[1] = "bigint(20)"
							sql_str[3] = "Default '0'"
						case reflect.Uint64, reflect.Uint:
							sql_str[1] = "bigint(20) unsigned"
							sql_str[3] = "Default '0'"
						case reflect.String:

							sql_str[3] = "Default ''"
							if varchar_str != "" {
								sql_str[1] = varchar_str
								sql_str[3] = "Default ''"
								break
							}
							is_text = true
							sql_str[1] = "text"
						case reflect.Int32:
							sql_str[1] = "int(11)"
							sql_str[3] = "Default '0'"
						case reflect.Uint32:
							sql_str[1] = "int(11) unsigned"
							sql_str[3] = "Default '0'"
						case reflect.Int8:
							sql_str[1] = "tinyint(3)"
							sql_str[3] = "Default '0'"
						case reflect.Uint8:
							sql_str[1] = "tinyint(3) unsigned"
							sql_str[3] = "Default '0'"
						case reflect.Int16:
							sql_str[1] = "smallint(6)"
							sql_str[3] = "Default '0'"
						case reflect.Uint16:
							sql_str[1] = "smallint(6) unsigned"
							sql_str[3] = "Default '0'"

						case reflect.Bool:
							sql_str[1] = "tinyint(1)"
							sql_str[3] = "Default '0'"
						case reflect.Struct:
							switch r.Field(i).Interface().(type) {
							case time.Time:
								switch {
								case strings.Contains(tag, "type:timestamp"):
									sql_str[1] = "timestamp"
								case strings.Contains(tag, "type:time"):
									sql_str[1] = "time"
								case strings.Contains(tag, "type:date"):
									sql_str[1] = "date"
								default:
									sql_str[1] = "datetime"
								}

								sql_str[3] = "Default current_timestamp()"
							default:
								is_text = true
								sql_str[1] = "text"
							}
						default:
							is_text = true
							sql_str[1] = "text"
						}
						if strings.Contains(tag, "auto_increment") {
							if !strings.Contains(value["Extra"], "auto_increment") {
								sql_str[3] = " AUTO_INCREMENT"
							}
						}
						switch {
						case strings.Contains(tag, "type:longblob"):
							sql_str[1] = "longblob"
						case strings.Contains(tag, "type:mediumblob"):
							sql_str[1] = "mediumblob"
						case strings.Contains(tag, "type:tinyblob"):
							sql_str[1] = "tinyblob"
						case strings.Contains(tag, "type:blob"):
							sql_str[1] = "blob"
						case strings.Contains(tag, "type:longtext"):
							sql_str[1] = "longtext"
						case strings.Contains(tag, "type:mediumtext"):
							sql_str[1] = "mediumtext"
						case strings.Contains(tag, "type:tinytext"):
							sql_str[1] = "tinytext"
						case strings.Contains(tag, "type:text"):
							sql_str[1] = "text"

							sql_str[3] = strings.Replace(sql_str[3], " Default NULL", "", 1)
						default:
							if sc, _ := Preg_match_result(`type:(varchar\(\d+\))`, tag, 1); len(sc) > 0 {
								sql_str[1] = sc[0][1]
							} else {
								if sc, _ := Preg_match_result(`type:(char\(\d+\))`, tag, 1); len(sc) > 0 {
									sql_str[1] = sc[0][1]
								}
							}
						}
						if strings.Contains(tag, "notnull") || strings.Contains(tag, "not null") {
							notnull = true
						}
						if strings.Contains(tag, "pk") {
							pk = append(pk, field_str)
							sql_str[2] = "NOT NULL"
							if sql_str[3] != " AUTO_INCREMENT" {
								sql_str[3] = ""
							}
							if sql_str[1] == "text" {
								sql_str[1] = text_pk_type_str
							}
						} else {

							if sc, _ := Preg_match_result(`default\((\d+)\)`, tag, 1); len(sc) > 0 && !is_text {
								sql_str[3] = "Default '" + sc[0][1] + "'"

							}

							if sc, _ := Preg_match_result(`default\('([^']*)'\)`, tag, 1); !is_text && len(sc) > 0 {
								switch sc[0][1] {
								case "current_timestamp()":
									sql_str[3] = "Default " + sc[0][1]
								case "NULL":
									sql_str[3] = "Default NULL"
								default:
									sql_str[3] = "Default '" + strings.Trim(sc[0][1], "'") + "'"
								}

							}
							if sc, _ := Preg_match_result(`extra\('([^']*)'\)`, tag, 1); len(sc) > 0 {
								sql_str[4] = sc[0][1]
							}
							if notnull {
								sql_str[2] = "NOT NULL"
							} else {
								sql_str[2] = "NULL"
							}
						}

						sql_str[0] = "ADD `" + field_str + "`"
						sql = append(sql, strings.Join(sql_str, " ")+after)
					}
				}
				if pk_num != len(pk) {
					if pk_num == 0 {
						sql = append(sql, "ADD PRIMARY KEY (`"+strings.Join(pk, "`,`")+"`)")
					} else if len(pk) == 0 {
						sql = append(sql, "DROP PRIMARY KEY")
					} else {
						sql = append(sql, "DROP PRIMARY KEY,ADD PRIMARY KEY (`"+strings.Join(pk, "`,`")+"`)")
					}
				}
				if len(sql) > 0 {
					s := "ALTER TABLE " + table_name + " " + strings.Join(sql, ",")
					DEBUG(s)
					_, err := Exec(Str2bytes(s), 0, &Transaction{})
					if err != nil {
						errs = append(errs, errors.New(table_name+":"+err.Error()))
						return
					}
				}

				res, err := QueryString("select ENGINE,CREATE_OPTIONS from information_schema.tables where table_name=? and TABLE_SCHEMA=?", table_name, mysql.db.database)
				if err != nil {
					errs = append(errs, errors.New(table_name+":"+err.Error()))
					return
				}
				if res[0]["ENGINE"] != mysql.storeEngine {

					res[0]["CREATE_OPTIONS"] = ""
					_, err = Exec([]byte("ALTER TABLE "+table_name+" ENGINE = "+mysql.storeEngine+" transactional=default,row_format=default,checksum=0"), 0, &Transaction{})
					if err != nil {
						errs = append(errs, errors.New(table_name+":"+err.Error()))
						return
					}
				}
				sql = nil
				switch mysql.storeEngine {
				case "Aria":
					if strings.Contains(res[0]["CREATE_OPTIONS"], "page_checksum=1") {
						if mysql.aria == nil || (mysql.aria != nil && !mysql.aria.PAGE_CHECKSUM) {
							sql = append(sql, "page_checksum=0")
						}
						res[0]["CREATE_OPTIONS"] = strings.Replace(res[0]["CREATE_OPTIONS"], "page_checksum=1", "", 1)
					} else if mysql.aria != nil && mysql.aria.PAGE_CHECKSUM {
						sql = append(sql, "page_checksum=1")
						res[0]["CREATE_OPTIONS"] = strings.Replace(res[0]["CREATE_OPTIONS"], "page_checksum=0", "", 1)
					}
					if strings.Contains(res[0]["CREATE_OPTIONS"], "checksum=1") {
						if mysql.aria == nil || (mysql.aria != nil && !mysql.aria.TABLE_CHECKSUM) {
							sql = []string{"checksum=0"}
						}
					} else if mysql.aria != nil && mysql.aria.TABLE_CHECKSUM {
						sql = []string{"checksum=1"}
					}

					if strings.Contains(res[0]["CREATE_OPTIONS"], "transactional=1") {
						if mysql.aria == nil || (mysql.aria != nil && !mysql.aria.TRANSACTIONAL) {
							sql = append(sql, "transactional=0")
						}
					} else if mysql.aria != nil && mysql.aria.TRANSACTIONAL {
						sql = append(sql, "transactional=1")
					}
				}
				if sql != nil {
					sql_str := "ALTER TABLE " + table_name + " " + strings.Join(sql, ",")
					DEBUG(sql_str)
					_, err := Exec([]byte(sql_str), 0, &Transaction{})
					if err != nil {
						errs = append(errs, errors.New(table_name+":"+err.Error()))
						return
					}
				}
			}
			if len(index) > 0 {

				res, err = QueryString(`show index from ` + table_name)
				if err != nil {
					errs = append(errs, errors.New(table_name+":"+err.Error()))
					return
				}
				keys := map[string]bool{}
				for _, v := range res {
					if v["Key_name"] == "PRIMARY" {
						continue
					}
					keys[v["Key_name"]] = true
				}
				for k := range index {
					if !keys[k] {
						buf.Reset()
						buf.WriteString("ALTER TABLE ")
						buf.WriteString(table_name)
						buf.WriteString(" ADD INDEX ")
						buf.WriteString(k)
						buf.WriteString(" (`")
						buf.WriteString(k)
						buf.WriteString("`)")
						_, err = Exec(buf.Bytes(), 0, &Transaction{})
						if err != nil {
							errs = append(errs, errors.New(table_name+":"+err.Error()))
							return
						}
					}
				}
			}

		}(v)
	}
	wg.Wait()
	return errs
}

func (mysql *Mysql) StoreEngine(storeEngine string) *Mysql {
	new_mysql := &Mysql{db: mysql.db, storeEngine: storeEngine}
	return new_mysql
}

//处理sql语句防注入不带'
func Getkey(str_i interface{}) string {
	switch str_i.(type) {
	case string:
		return "`" + key_srp.Replace(str_i.(string)) + "`"
	default:
		r := reflect.TypeOf(str_i)
		for r.Kind() == reflect.Ptr {
			r = r.Elem()
		}
		DEBUG("getkey不支持类型", r.Kind(), r.Name())
	}
	return ""
}
func Getvalue(str_i interface{}) string {
	switch str_i.(type) {
	case int8:
		return strconv.Itoa(int(str_i.(int8)))
	case int:
		return strconv.Itoa(str_i.(int))
	case int16:
		return strconv.Itoa(int(str_i.(int16)))
	case int32:
		return strconv.Itoa(int(str_i.(int32)))
	case int64:
		return strconv.Itoa(int(str_i.(int64)))
	case uint:
		return strconv.FormatUint(uint64(str_i.(uint)), 10)
	case uint8:
		return strconv.FormatUint(uint64(str_i.(uint8)), 10)
	case uint16:
		return strconv.FormatUint(uint64(str_i.(uint16)), 10)
	case uint32:
		return strconv.FormatUint(uint64(str_i.(uint32)), 10)
	case uint64:
		return strconv.FormatUint(str_i.(uint64), 10)
	case []byte:
		return encodeHex(str_i.([]byte))

	case float32, float64:
		return fmt.Sprint(str_i)
	case bool:
		if str_i.(bool) {
			return "1"
		} else {
			return "0"
		}
	case string:
		return "'" + value_srp.Replace(str_i.(string)) + "'"
	case []string: //判断是否exp表达式
		if len(str_i.([]string)) == 2 && str_i.([]string)[0] == "exp" {
			return str_i.([]string)[1]
		}
		return marsha1Tostring(str_i)
	default:
		return marsha1Tostring(str_i)

	}
	return ""
}
func marsha1Tostring(i interface{}) (str string) {
	r := reflect.TypeOf(i)
	for r.Kind() == reflect.Ptr {
		r = r.Elem()
	}
	if r.Kind() == reflect.Struct || r.Kind() == reflect.Map || r.Kind() == reflect.Slice {
		str = "'" + JsonMarshalString(i) + "'"
	} else {
		str = "'" + fmt.Sprint(i) + "'"
	}
	return
}
func encodeHex(bin []byte) string {
	if len(bin) == 0 {
		return "''"
	}
	return "0x" + hex.EncodeToString(bin)
}

var key_srp = strings.NewReplacer(`\`, `\\`, "`rank`", "rank", "`type`", "type", "`", "\\`")
var value_srp = strings.NewReplacer(`\`, `\\`, "'", `\'`)

func GetvaluefromPtr(ptr uintptr, field reflect.StructField) string {
	switch field.Type.Kind() {
	case reflect.String:
		return "'" + value_srp.Replace(*(*string)(unsafe.Pointer(ptr + field.Offset))) + "'"
	case reflect.Int64:
		return strconv.FormatInt(*(*int64)(unsafe.Pointer(ptr + field.Offset)), 10)
	case reflect.Int32:
		return strconv.FormatInt(int64(*(*int32)(unsafe.Pointer(ptr + field.Offset))), 10)
	case reflect.Int8:
		return strconv.FormatInt(int64(*(*int8)(unsafe.Pointer(ptr + field.Offset))), 10)
	case reflect.Int:
		return strconv.FormatInt(int64(*(*int)(unsafe.Pointer(ptr + field.Offset))), 10)
	case reflect.Int16:
		return strconv.FormatInt(int64(*(*int16)(unsafe.Pointer(ptr + field.Offset))), 10)
	case reflect.Uint:
		return strconv.FormatUint(uint64(*(*uint)(unsafe.Pointer(ptr + field.Offset))), 10)
	case reflect.Uint8:
		return strconv.FormatUint(uint64(*(*uint8)(unsafe.Pointer(ptr + field.Offset))), 10)
	case reflect.Uint16:
		return strconv.FormatUint(uint64(*(*uint16)(unsafe.Pointer(ptr + field.Offset))), 10)
	case reflect.Uint32:
		return strconv.FormatUint(uint64(*(*uint32)(unsafe.Pointer(ptr + field.Offset))), 10)
	case reflect.Uint64:
		return strconv.FormatUint((*(*uint64)(unsafe.Pointer(ptr + field.Offset))), 10)
	case reflect.Float32:
		return fmt.Sprint((*(*float32)(unsafe.Pointer(ptr + field.Offset))))
	case reflect.Float64:
		return fmt.Sprint((*(*float64)(unsafe.Pointer(ptr + field.Offset))))
	case reflect.Bool:
		if *(*bool)(unsafe.Pointer(ptr + field.Offset)) {
			return "1"
		} else {
			return "0"
		}
	case reflect.Struct:
		if field.Type.String() == "time.Time" {
			return "'" + (*(*time.Time)(unsafe.Pointer(ptr + field.Offset))).Format("2006-01-02 15:04:05") + "'"
		}
		fallthrough

	default:
		t := field.Type
		if t.Kind() == reflect.Ptr {
			if *(*uintptr)(unsafe.Pointer(ptr + field.Offset)) == 0 {
				return "'null'"
			}
		}
		for t.Kind() == reflect.Ptr {

			t = t.Elem()
		}
		i := reflect.NewAt(t, unsafe.Pointer(ptr+field.Offset))
		var str string
		if t.Kind() == reflect.Struct || t.Kind() == reflect.Map || t.Kind() == reflect.Slice {
			str = JsonMarshalString(i.Interface())
		} else {
			str = fmt.Sprint(i)
		}
		return "'" + str + "'"
	}
	return ""
}
func (mysql *Mysql) AriaSetting(TRANSACTIONAL, PAGE_CHECKSUM, TABLE_CHECKSUM bool, ROW_FORMAT string) *Mysql {
	mysql.aria = &ariasetting{
		TRANSACTIONAL:  TRANSACTIONAL,
		PAGE_CHECKSUM:  PAGE_CHECKSUM,
		TABLE_CHECKSUM: TABLE_CHECKSUM,
		ROW_FORMAT:     ROW_FORMAT,
	}
	return mysql
}
