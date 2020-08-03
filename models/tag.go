package models

import (
	"bbs/db"
	"bbs/libraries"
	"strings"
)

var Use_tag []string

func recent_use_tag() {
	model := &Model{}
	var itemdata []*db.Common_tagitem
	err := model.Table("Common_tagitem").Where("Idtype = 'Tid'").Order("Itemid DESC").Limit(10).Select(&itemdata)
	if err != nil {
		libraries.DEBUG(err)
		return
	}

	var ids []int32
be:
	for _, v := range itemdata {
		if len(ids) >= 5 {
			break
		}
		for _, id := range ids {
			if id == v.Tagid {
				continue be
			}
		}
		ids = append(ids, v.Tagid)
	}

	if len(ids) > 0 {
		var data []*db.Common_tag

		err := model.Table("Common_tag").Where(map[string]interface{}{"Tagid": []interface{}{"in", ids}}).Select(&data)

		if err != nil {
			libraries.DEBUG(err)
			return
		}
		new_tag := make([]string, len(data))
		for k, v := range data {
			new_tag[k] = v.Tagname
		}
		Use_tag = new_tag
	}

}

type Model_tag struct {
	Model
}

func (m *Model_tag) Add_tag(tags string, itemid int32, idtype string) ([]*db.Common_tag, bool) {
	if tags == "" || !libraries.In_slice(idtype, []string{"", "tid", "blogid", "uid"}) {
		return nil, false
	}
	tags = strings.Replace(tags, "　", " ", -1)
	for _, b := range [][]byte{[]byte{0xa3, 0xac}, []byte{0xa1, 0x41}, []byte{0xef, 0xbc, 0x8c}, []byte{0x32}} {
		tags = strings.Replace(tags, libraries.Bytes2str(b), ",", -1)
	}
	var tagarray []string

	tags, _ = libraries.Preg_replace(`,+`, ",", tags)
	tagarray = strings.Split(tags, ",")

	tag_m := make(map[string]int)
	for _, tagname := range tagarray {
		tag_m[tagname]++
	}
	res := []*db.Common_tag{}
	for _, tagname := range tagarray {
		tagname = strings.Trim(tagname, " ")
		if libraries.Preg_match(`^([\x7f-\xff_-]|\w|\s){1,20}$`, tagname) {
			if tag_m[tagname] == 0 {
				continue
			}
			if tag_m[tagname] > 0 {
				tag_m[tagname] = 0
			}
			var status int8
			if idtype == "uid" {
				status = 3
			}
			var result *db.Common_tag
			where := map[string]interface{}{"Tagname": tagname}
			if idtype == "uid" {
				where["Status"] = 3
			} else {
				where["Status"] = []interface{}{"lt", 3}
			}

			err := m.Table("Common_tag").Where(where).Find(&result)
			if err != nil {
				m.Ctx.Adderr(err, where)
				return nil, false
			}
			var tagid int32
			if result != nil {
				if result.Status == status {
					tagid = result.Tagid
				}
			} else {
				result = &db.Common_tag{
					Tagname: tagname,
					Status:  status,
				}
				var id int64
				id, err = m.Table("Common_tag").Insert(result)
				if err != nil {
					m.Ctx.Adderr(err, result)
					return nil, false
				}
				tagid = int32(id)
				result.Tagid = tagid

			}

			if tagid > 0 {
				if itemid > 0 {
					insert := &db.Common_tagitem{
						Tagid:  tagid,
						Itemid: itemid,
						Idtype: idtype,
					}
					err = m.Table("Common_tagitem").Replace(insert)
					if err != nil {
						m.Ctx.Adderr(err, insert)
						return nil, false
					}
				}
				res = append(res, result)

			}
			if len(res) == 5 {
				break
			}
		}
	}
	return res, true
}
