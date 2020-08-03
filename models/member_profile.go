package models

import (
	"bbs/db"
	"strconv"
)

type Model_member_profile struct {
	Model
}

func (this *Model_member_profile) Get_available_setting() (data []*db.Common_member_profile_setting) {

	err := this.Table("Common_member_profile_setting").Where("Available=1").Order("Displayorder asc").Select(&data)
	if err != nil {
		this.Ctx.Adderr(err, nil)
	}

	return data
}
func member_profile_init() {
	return //暂时不做的功能
	model := new(Model)
	c, _ := model.Table("Common_member_profile_setting").Count()
	if c == 0 {
		data := make([]*db.Common_member_profile_setting, 51)
		data[0] = &db.Common_member_profile_setting{Fieldid: "realname", Available: 1, Invisible: 0, Needverify: 0, Title: "真实姓名", Description: "", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 1, Formtype: 0, Size: 0, Choices: "", Validate: ""}
		data[1] = &db.Common_member_profile_setting{Fieldid: "gender", Available: 1, Invisible: 0, Needverify: 0, Title: "性别", Description: "", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 1, Formtype: 4, Size: 0, Choices: "", Validate: ""}
		data[2] = &db.Common_member_profile_setting{Fieldid: "birthyear", Available: 1, Invisible: 0, Needverify: 0, Title: "出生年份", Description: "", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 1, Formtype: 4, Size: 0, Choices: "", Validate: ""}
		data[3] = &db.Common_member_profile_setting{Fieldid: "birthmonth", Available: 1, Invisible: 0, Needverify: 0, Title: "出生月份", Description: "", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 4, Size: 0, Choices: "", Validate: ""}
		data[4] = &db.Common_member_profile_setting{Fieldid: "birthday", Available: 1, Invisible: 0, Needverify: 0, Title: "生日", Description: "", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 4, Size: 0, Choices: "", Validate: ""}
		data[5] = &db.Common_member_profile_setting{Fieldid: "constellation", Available: 1, Invisible: 1, Needverify: 0, Title: "星座", Description: "星座(根据生日自动计算)", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 0, Size: 0, Choices: "", Validate: ""}
		data[6] = &db.Common_member_profile_setting{Fieldid: "zodiac", Available: 1, Invisible: 1, Needverify: 0, Title: "生肖", Description: "生肖(根据生日自动计算)", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 0, Size: 0, Choices: "", Validate: ""}
		data[7] = &db.Common_member_profile_setting{Fieldid: "telephone", Available: 1, Invisible: 1, Needverify: 0, Title: "固定电话", Description: "", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 0, Size: 0, Choices: "", Validate: ""}
		data[8] = &db.Common_member_profile_setting{Fieldid: "mobile", Available: 1, Invisible: 1, Needverify: 0, Title: "手机", Description: "", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 0, Size: 0, Choices: "", Validate: ""}
		data[9] = &db.Common_member_profile_setting{Fieldid: "idcardtype", Available: 1, Invisible: 1, Needverify: 0, Title: "证件类型", Description: "身份证 护照 驾驶证等", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 4, Size: 0, Choices: "身份证\r\n护照\r\n驾驶证\r\n", Validate: ""}
		data[10] = &db.Common_member_profile_setting{Fieldid: "idcard", Available: 1, Invisible: 1, Needverify: 0, Title: "证件号", Description: "", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 0, Size: 0, Choices: "", Validate: ""}
		data[11] = &db.Common_member_profile_setting{Fieldid: "address", Available: 1, Invisible: 1, Needverify: 0, Title: "邮寄地址", Description: "", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 0, Size: 0, Choices: "", Validate: ""}
		data[12] = &db.Common_member_profile_setting{Fieldid: "zipcode", Available: 1, Invisible: 1, Needverify: 0, Title: "邮编", Description: "", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 0, Size: 0, Choices: "", Validate: ""}
		data[13] = &db.Common_member_profile_setting{Fieldid: "nationality", Available: 0, Invisible: 0, Needverify: 0, Title: "国籍", Description: "", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 0, Size: 0, Choices: "", Validate: ""}
		data[14] = &db.Common_member_profile_setting{Fieldid: "birthprovince", Available: 1, Invisible: 0, Needverify: 0, Title: "出生省份", Description: "", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 4, Size: 0, Choices: "", Validate: ""}
		data[15] = &db.Common_member_profile_setting{Fieldid: "birthcity", Available: 1, Invisible: 0, Needverify: 0, Title: "出生地", Description: "", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 4, Size: 0, Choices: "", Validate: ""}
		data[16] = &db.Common_member_profile_setting{Fieldid: "birthdist", Available: 1, Invisible: 0, Needverify: 0, Title: "出生县", Description: "出生行政区/县", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 4, Size: 0, Choices: "", Validate: ""}
		data[17] = &db.Common_member_profile_setting{Fieldid: "birthcommunity", Available: 1, Invisible: 0, Needverify: 0, Title: "出生小区", Description: "", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 4, Size: 0, Choices: "", Validate: ""}
		data[18] = &db.Common_member_profile_setting{Fieldid: "resideprovince", Available: 1, Invisible: 0, Needverify: 0, Title: "居住省份", Description: "", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 4, Size: 0, Choices: "", Validate: ""}
		data[19] = &db.Common_member_profile_setting{Fieldid: "residecity", Available: 1, Invisible: 0, Needverify: 0, Title: "居住地", Description: "", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 4, Size: 0, Choices: "", Validate: ""}
		data[20] = &db.Common_member_profile_setting{Fieldid: "residedist", Available: 1, Invisible: 0, Needverify: 0, Title: "居住县", Description: "居住行政区/县", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 4, Size: 0, Choices: "", Validate: ""}
		data[21] = &db.Common_member_profile_setting{Fieldid: "residecommunity", Available: 1, Invisible: 0, Needverify: 0, Title: "居住小区", Description: "", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 4, Size: 0, Choices: "", Validate: ""}
		data[22] = &db.Common_member_profile_setting{Fieldid: "residesuite", Available: 0, Invisible: 0, Needverify: 0, Title: "房间", Description: "小区、写字楼门牌号", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 0, Size: 0, Choices: "", Validate: ""}
		data[23] = &db.Common_member_profile_setting{Fieldid: "graduateschool", Available: 1, Invisible: 0, Needverify: 0, Title: "毕业学校", Description: "", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 0, Size: 0, Choices: "", Validate: ""}
		data[24] = &db.Common_member_profile_setting{Fieldid: "education", Available: 1, Invisible: 0, Needverify: 0, Title: "学历", Description: "", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 4, Size: 0, Choices: "博士\r\n硕士\r\n本科\r\n专科\r\n中学\r\n小学\r\n其它", Validate: ""}
		data[25] = &db.Common_member_profile_setting{Fieldid: "company", Available: 1, Invisible: 0, Needverify: 0, Title: "公司", Description: "", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 0, Size: 0, Choices: "", Validate: ""}
		data[26] = &db.Common_member_profile_setting{Fieldid: "occupation", Available: 1, Invisible: 0, Needverify: 0, Title: "职业", Description: "", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 0, Size: 0, Choices: "", Validate: ""}
		data[27] = &db.Common_member_profile_setting{Fieldid: "position", Available: 1, Invisible: 0, Needverify: 0, Title: "职位", Description: "", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 0, Size: 0, Choices: "", Validate: ""}
		data[28] = &db.Common_member_profile_setting{Fieldid: "revenue", Available: 1, Invisible: 1, Needverify: 0, Title: "年收入", Description: "单位 元", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 0, Size: 0, Choices: "", Validate: ""}

		data[29] = &db.Common_member_profile_setting{Fieldid: "affectivestatus", Available: 1, Invisible: 1, Needverify: 0, Title: "情感状态", Description: "", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 0, Size: 0, Choices: "", Validate: ""}
		data[30] = &db.Common_member_profile_setting{Fieldid: "lookingfor", Available: 1, Invisible: 0, Needverify: 0, Title: "交友目的", Description: "希望在网站找到什么样的朋友", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 0, Size: 0, Choices: "", Validate: ""}
		data[31] = &db.Common_member_profile_setting{Fieldid: "bloodtype", Available: 1, Invisible: 1, Needverify: 0, Title: "血型", Description: "", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 4, Size: 0, Choices: "A\r\nB\r\nAB\r\nO\r\n其它", Validate: ""}
		data[32] = &db.Common_member_profile_setting{Fieldid: "height", Available: 0, Invisible: 1, Needverify: 0, Title: "身高", Description: "单位 cm", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 0, Size: 0, Choices: "", Validate: ""}
		data[33] = &db.Common_member_profile_setting{Fieldid: "weight", Available: 0, Invisible: 1, Needverify: 0, Title: "体重", Description: "单位 kg", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 0, Size: 0, Choices: "", Validate: ""}
		data[34] = &db.Common_member_profile_setting{Fieldid: "alipay", Available: 1, Invisible: 1, Needverify: 0, Title: "支付宝", Description: "", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 0, Size: 0, Choices: "", Validate: ""}
		data[35] = &db.Common_member_profile_setting{Fieldid: "icq", Available: 0, Invisible: 1, Needverify: 0, Title: "ICQ", Description: "", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 0, Size: 0, Choices: "", Validate: ""}
		data[36] = &db.Common_member_profile_setting{Fieldid: "qq", Available: 1, Invisible: 1, Needverify: 0, Title: "QQ", Description: "", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 0, Size: 0, Choices: "", Validate: ""}
		data[37] = &db.Common_member_profile_setting{Fieldid: "yahoo", Available: 0, Invisible: 1, Needverify: 0, Title: "YAHOO帐号", Description: "", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 0, Size: 0, Choices: "", Validate: ""}
		data[38] = &db.Common_member_profile_setting{Fieldid: "msn", Available: 1, Invisible: 1, Needverify: 0, Title: "MSN", Description: "", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 0, Size: 0, Choices: "", Validate: ""}
		data[39] = &db.Common_member_profile_setting{Fieldid: "taobao", Available: 1, Invisible: 1, Needverify: 0, Title: "阿里旺旺", Description: "", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 0, Size: 0, Choices: "", Validate: ""}
		data[40] = &db.Common_member_profile_setting{Fieldid: "site", Available: 1, Invisible: 0, Needverify: 0, Title: "个人主页", Description: "", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 0, Size: 0, Choices: "", Validate: ""}
		data[41] = &db.Common_member_profile_setting{Fieldid: "bio", Available: 1, Invisible: 1, Needverify: 0, Title: "自我介绍", Description: "", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 1, Size: 0, Choices: "", Validate: ""}
		data[42] = &db.Common_member_profile_setting{Fieldid: "interest", Available: 1, Invisible: 0, Needverify: 0, Title: "兴趣爱好", Description: "", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 1, Size: 0, Choices: "", Validate: ""}

		data[43] = &db.Common_member_profile_setting{Fieldid: "field1", Available: 0, Invisible: 1, Needverify: 0, Title: "自定义字段1", Description: "", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 0, Size: 0, Choices: "", Validate: ""}
		data[44] = &db.Common_member_profile_setting{Fieldid: "field2", Available: 0, Invisible: 1, Needverify: 0, Title: "自定义字段2", Description: "", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 0, Size: 0, Choices: "", Validate: ""}
		data[45] = &db.Common_member_profile_setting{Fieldid: "field3", Available: 0, Invisible: 1, Needverify: 0, Title: "自定义字段3", Description: "", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 0, Size: 0, Choices: "", Validate: ""}
		data[46] = &db.Common_member_profile_setting{Fieldid: "field4", Available: 0, Invisible: 1, Needverify: 0, Title: "自定义字段4", Description: "", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 0, Size: 0, Choices: "", Validate: ""}
		data[47] = &db.Common_member_profile_setting{Fieldid: "field5", Available: 0, Invisible: 1, Needverify: 0, Title: "自定义字段5", Description: "", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 0, Size: 0, Choices: "", Validate: ""}
		data[48] = &db.Common_member_profile_setting{Fieldid: "field6", Available: 0, Invisible: 1, Needverify: 0, Title: "自定义字段6", Description: "", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 0, Size: 0, Choices: "", Validate: ""}
		data[49] = &db.Common_member_profile_setting{Fieldid: "field7", Available: 0, Invisible: 1, Needverify: 0, Title: "自定义字段7", Description: "", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 0, Size: 0, Choices: "", Validate: ""}
		data[50] = &db.Common_member_profile_setting{Fieldid: "field8", Available: 0, Invisible: 1, Needverify: 0, Title: "自定义字段8", Description: "", Displayorder: 0, Required: 0, Unchangeable: 0, Showincard: 0, Showinthread: 0, Showinregister: 0, Allowsearch: 0, Formtype: 0, Size: 0, Choices: "", Validate: ""}
		model.Table("Common_member_profile_setting").InsertAll(data)
	}
}
func (this *Model_member_profile) Update(profile *db.Common_member_profile) bool {
	err := this.Table("Common_member_profile").Where("Uid = " + strconv.Itoa(int(profile.Uid))).Replace(profile)
	if err != nil {
		this.Ctx.Adderr(err, map[string]interface{}{"profile": profile})
		return false
	}
	return true
}
