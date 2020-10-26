package models

import (
	"bbs/config"
	"bbs/db/mysql"
	"bbs/libraries"
	"errors"
	"strings"

	//"time"
	//"runtime"
	"bbs/server"
)

type Model struct {
	Ctx          *server.Context
	rowsAffected int64
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

//除事务外，调用任何方法之前先调用Table指定表格以及初始化sql参数，避免sql参数上下文污染
func (this *Model) Table(tablename string) (build *mysql.Mysql_Build) {

	if this.Ctx == nil {
		this.Ctx = new(server.Context)
		this.Ctx.Sql_build = mysql.New_mysqlBuild()
	} else if this.Ctx.Sql_build == nil {
		this.Ctx.Sql_build = mysql.New_mysqlBuild()
	}

	build = this.Ctx.Sql_build.(*mysql.Mysql_Build)
	build.Reset()
	build.Transaction = this.Ctx.Transaction
	build.Tablename(tablename)
	build.Result = this
	//table := &Do_sql{sql: &sql_build{table: model_tablepre + tablename, limit: ` LIMIT 1000`, field: `*`, totle_count: -1, master: 1}, cache: -2, model: this}
	return build
}

//
func (this *Model) Raw(sql string, arg ...interface{}) (raw *mysql.Mysql_RawBuild) {

	if this.Ctx == nil {
		this.Ctx = new(server.Context)
		this.Ctx.Sql_build = mysql.New_mysqlBuild()
	} else if this.Ctx.Sql_build == nil {
		this.Ctx.Sql_build = mysql.New_mysqlBuild()
	}

	build := this.Ctx.Sql_build.(*mysql.Mysql_Build)
	build.Reset()
	build.Transaction = this.Ctx.Transaction
	build.Result = this

	raw = &mysql.Mysql_RawBuild{Mysql_Build: build}
	raw.RawPrepare(sql, arg)
	return raw
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

func (this *Model) Exec(str string, arg ...interface{}) (err error) {
	if this.Ctx == nil {
		this.Ctx = new(server.Context)
	}
	e := mysql.Exec(libraries.Str2bytes(str), 0, arg, this.Ctx.Transaction)
	//libraries.DEBUG("delete语句" + this.buffer.String())
	if e != nil {
		err = errors.New(`执行Model.Exec出错,sql错误信息：` + e.Error() + `,错误sql：` + str)

	}
	return
}
func (this *Model) Query(str string, arg ...interface{}) (result []map[string]string, err error) {
	result, e := mysql.QueryMap(libraries.Str2bytes(str), 0, arg, nil)
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

func (this *Model) RowsAffected(rowsAffected int64) {
	this.rowsAffected = rowsAffected
}
func init() {
	mysql.Tablepre = libraries.Str2bytes(` ` + config.Server.Tablepre)
}
