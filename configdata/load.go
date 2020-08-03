package configdata

import (
	"bbs/libraries"
	"fmt"
	"io/ioutil"
	"reflect"
	"strings"
	"time"
)

var m_cfg = map[string]reflect.Value{}

func loadconfigdata(m interface{}) {

	b := time.Now()
	mtype := reflect.Indirect(reflect.ValueOf(m))
	if mtype.Kind() != reflect.Map {
		libraries.Log("[%v]%v is not map", m, mtype.Kind())
	}
	ktype := mtype.Type().Key()
	if ktype.Kind() != reflect.String {
		libraries.Log("k[%v] is not string", ktype.Kind())
	}
	pvtype := mtype.Type().Elem()
	if pvtype.Kind() != reflect.Ptr {
		libraries.Log("pv[%v] is not Ptr", pvtype.Kind())
	}
	vtype := pvtype.Elem()
	if vtype.Kind() != reflect.Struct {
		libraries.Log("v[%v] is not struct", vtype.Kind())
	}
	filename := vtype.Name()
	if idx := strings.Index(filename, "Conf_"); idx >= 0 {
		filename = filename[idx+5:]
	} else {
		libraries.Log("%s is not find 'Conf_'", filename)
	}
	m_cfg[filename] = mtype
	filepath := "./config/" + filename + ".json"
	dat, err := ioutil.ReadFile(filepath)
	if err != nil {
		libraries.Log("%v", err)
		return
	}
	var jsonm map[string]([](map[string]interface{}))
	err = libraries.JsonUnmarshal(dat, &jsonm)
	if err != nil {
		libraries.Log("%v", err)
		return
	}
	jsons, ok := jsonm[filename]
	if !ok {
		libraries.Log("nofind %v", filename)
		return
	}
	isFirst := true
	for _, jsonv := range jsons {
		key := ""
		value := reflect.New(vtype)
		for i := 0; i < vtype.NumField(); i++ {
			fieldname := vtype.Field(i).Name
			v, ok := jsonv[fieldname]
			if !ok {
				//将首字母转换成小写再找一次
				fieldname = strings.ToLower(fieldname[:1]) + fieldname[1:]
				v, ok = jsonv[fieldname]
				if !ok {
					if isFirst {
						libraries.Log("%v nofind field[%v]", vtype.String(), vtype.Field(i).Name)
					}
					continue
					//return
				}
			}
			switch vtype.Field(i).Type.Kind() {
			case reflect.Int32:
				value.Elem().Field(i).SetInt(int64(v.(float64)))
				if vtype.Field(i).Tag == "key" {
					if key == "" {
						key = fmt.Sprintf("%v", value.Elem().Field(i).Int())
					} else {
						key = fmt.Sprintf("%v_%v", key, value.Elem().Field(i).Int())
					}
				}
			case reflect.Float32:
				value.Elem().Field(i).SetFloat(v.(float64))
				if vtype.Field(i).Tag == "key" {
					//float不支持主键
					libraries.Log("%v[%v] float type can not mainkey", vtype.String(), vtype.Field(i).Type)
				}
			case reflect.String:
				str := strings.TrimSpace(v.(string)) //去除左右空格
				value.Elem().Field(i).SetString(str)
				if vtype.Field(i).Tag == "key" {
					if key == "" {
						key = fmt.Sprintf("%v", value.Elem().Field(i).String())
					} else {
						key = fmt.Sprintf("%v_%v", key, value.Elem().Field(i).String())
					}
				}
			default:
				libraries.Log("v[%v] unknow fieldtype %v", vtype.String(), vtype.Field(i).Type)
			}
		}
		if key == "" {
			libraries.Log("v[%v] unknow nofind mainkey", vtype.String())
			continue
		}
		if filename != "ShieldingWord" { //屏蔽字库以外的东西,检查下主键重复
			oldval := mtype.MapIndex(reflect.ValueOf(key))
			if oldval.IsValid() {
				libraries.Log("%v Repeat key :%s", vtype.String(), key)
			}
		}
		mtype.SetMapIndex(reflect.ValueOf(key), value)
		isFirst = false
	}
	e := time.Now()
	libraries.Log("%3d load[%v] success use %f s", len(m_cfg), filename, float64(e.UnixNano()-b.UnixNano())/1e9)
}
