package models

import (
	"bbs/libraries"
	"errors"
)

var common_moderate_tables = map[string]string{
	"tid":         "Forum_thread_moderate",
	"pid":         "Forum_post_moderate",
	"blogid":      "Home_blog_moderate",
	"picid":       "Home_pic_moderate",
	"doid":        "Home_doing_moderate",
	"sid":         "Home_share_moderate",
	"aid":         "Portal_article_moderate",
	"aid_cid":     "Portal_comment_moderate",
	"topicid_cid": "Portal_comment_moderate",
	"uid_cid":     "Home_comment_moderate",
	"blogid_cid":  "Home_comment_moderate",
	"sid_cid":     "Home_comment_moderate",
	"picid_cid":   "Home_comment_moderate"}

type Model_common_moderate struct {
	Model
}

func (m *Model_common_moderate) Delete(ids []int32, idtype string) bool {
	tablename, ok := common_moderate_tables[idtype]
	if !ok {
		return false
	}
	wheresql := map[string]interface{}{}
	if len(ids) > 0 {
		wheresql["Id"] = ids
	}
	if m._is_comment_table(idtype) {
		wheresql["Idtype"] = idtype
	}
	res, err := m.Table(tablename).Where(wheresql).Delete()
	if err != nil {
		m.Ctx.Adderr(err, map[string]interface{}{"id": ids, "idtype": idtype})
	}
	return res
}

func (m *Model_common_moderate) Insert(idtype string, data map[string]interface{}, replace bool) int64 {
	tablename, ok := common_moderate_tables[idtype]
	if !ok || len(data) == 0 {
		return 0
	}
	if m._is_comment_table(idtype) {
		data["Idtype"] = idtype
	}
	if replace {
		err := m.Table(tablename).Replace(data)
		if err != nil {
			m.Ctx.Adderr(err, map[string]interface{}{"data": data, "idtype": idtype, "replace": replace})
		}
	} else {
		id, err := m.Table(tablename).Insert(data)
		if err != nil {
			m.Ctx.Adderr(err, map[string]interface{}{"data": data, "idtype": idtype, "replace": replace})
		}
		return id
	}
	return 0
}

func (m *Model_common_moderate) Update(ids []int32, idtype string, data map[string]interface{}) bool {
	tablename, ok := common_moderate_tables[idtype]
	if !ok || len(data) == 0 {
		return false
	}
	wheresql := map[string]interface{}{}
	if len(ids) > 0 {
		wheresql["Id"] = ids
	}
	if m._is_comment_table(idtype) {
		wheresql["Idtype"] = idtype
	}
	res, err := m.Table(tablename).Where(wheresql).Update(data)
	if err != nil {
		m.Ctx.Adderr(err, map[string]interface{}{"id": ids, "idtype": idtype, "data": data})
	}
	return res
}
func (m *Model_common_moderate) _is_comment_table(idtype string) bool {
	return libraries.In_slice(common_moderate_tables[idtype], []string{"Portal_comment_moderate", "Home_comment_moderate"})
}
func (m *Model_common_moderate) Updatemoderate(idtype string, ids []int32, status int8) bool {
	if len(ids) == 0 {
		return true
	}
	switch status {
	case 0:
		for _, id := range ids {
			m.Insert(idtype, map[string]interface{}{"Id": id, "Status": 0, "Dateline": libraries.Timestamp()}, false)
		}
	case 1:
		return m.Update(ids, idtype, map[string]interface{}{"Status": 1})
	case 2:
		return m.Delete(ids, idtype)
	default:
		m.Ctx.Adderr(errors.New("Updatemoderate无法识别的传入参数status"), status)
	}
	return false
}
