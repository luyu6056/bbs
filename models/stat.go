package models

//站点趋势统计
/*var stat reflect.Value
var statlock sync.Mutex
var nowdaytime int64

type Model_stat struct {
	Model
}

//stattype首字母大写
func (m *Model_stat) Updatestat(stattype string, primary bool, num int, uid int32) error {
	if uid < 1 || !Setting.Updatestat {
		return nil
	}

	if primary {
		count, err := m.Table("Common_statuser").Where(map[string]interface{}{"Uid": uid, "Daytime": nowdaytime, "Type": stattype}).Count()
		if err != nil {
			return err
		}
		if count > 0 {
			return nil
		}
		_, err = m.Table("Common_statuser").Insert(&db.Common_statuser{Uid: uid, Daytime: nowdaytime, Type: stattype})
		if err != nil {
			return err
		}
	}
	statlock.Lock()
	defer statlock.Unlock()
	key := stattype
	var value int64
	if num < 0 {
		num *= -1
	}

	if field := stat.FieldByName(stattype); field.Kind() != reflect.Invalid {
		value = field.Int() + int64(num)
		field.SetInt(value)
	} else {
		key = strings.ToUpper(stattype[:1]) + stattype[1:]
		if field := stat.FieldByName(key); field.Kind() != reflect.Invalid {
			value = field.Int() + int64(num)
			field.SetInt(value)
		} else {
			return errors.New("Updatestat 传入无法处理的值:" + stattype)
		}
	}
	_, err := m.Table("Common_stat").Where("Daytime = " + strconv.Itoa(int(nowdaytime))).Update(map[string]interface{}{key: value})
	if err != nil {
		return err
	}
	return nil
}
func stat_reset() {
	statlock.Lock()
	defer statlock.Unlock()
	nowdaytime = libraries.Todaytimestamp()
	stat = reflect.ValueOf(&db.Common_stat{Daytime: nowdaytime}).Elem()
	count, err := (&Model{}).Table("Common_stat").Where("Daytime = " + strconv.Itoa(int(nowdaytime))).Count()
	if err != nil {
		libraries.DEBUG("初始化站点趋势统计失败")
		return
	}
	if count == 0 {
		(&Model{}).Table("Common_stat").Insert(stat.Interface())
	} else {
		err = (&Model{}).Table("Common_stat").Where("Daytime = " + strconv.Itoa(int(nowdaytime))).Find(stat.Addr().Interface())
		if err != nil {
			libraries.DEBUG("初始化站点趋势统计失败")
		}
	}

}*/
