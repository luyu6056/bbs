package admin

import (
	"bbs/controllers/public"
	"bbs/models"
	"bbs/protocol"
	"bbs/server"

	//"github.com/modern-go/reflect2"
	"reflect"
	"strconv"

	//"unsafe"
	"strings"
)

func get_setting_basic(data *protocol.MSG_U2WS_Admin_menu_setting_basic, c *server.Context) {
	user := public.Getuserinfo(c)
	if user.Adminid != 1 {
		return
	}
	msg := protocol.Pool_MSG_WS2U_Admin_menu_setting_basic.Get().(*protocol.MSG_WS2U_Admin_menu_setting_basic)
	msg.Setting_sitename = models.Setting.Sitename
	msg.Setting_adminemail = models.Setting.Adminemail
	msg.Setting_siteurl = models.Setting.Siteurl
	msg.Setting_bbname = models.Setting.Bbname
	msg.Setting_site_qq = models.Setting.Site_qq
	msg.Setting_icp = models.Setting.Icp
	c.Output_data(msg)
	msg.Put()
}
func edit_setting_basic(data *protocol.MSG_U2WS_Admin_edit_setting_basic, c *server.Context) {
	user := public.Getuserinfo(c)
	if user.Adminid != 1 {
		return
	}
	model_setting := new(models.Model_Setting)
	model_setting.Ctx = c
	c.Adderr(model_setting.SettingSet("Aitename", data.Setting_sitename), nil)
	c.Adderr(model_setting.SettingSet("Adminemail", data.Setting_adminemail), nil)
	c.Adderr(model_setting.SettingSet("Siteurl", data.Setting_siteurl), nil)
	c.Adderr(model_setting.SettingSet("Bbname", data.Setting_bbname), nil)
	c.Adderr(model_setting.SettingSet("Site_qq", data.Setting_site_qq), nil)
	c.Adderr(model_setting.SettingSet("Icp", data.Setting_icp), nil)
	c.Adderr(model_setting.SettingSet("Boardlicensed", data.Setting_boardlicensed), nil)
	c.Adderr(model_setting.SettingSet("Statcode", data.Setting_statcode), nil)
	c.Out_common(protocol.Success, "javascript:reload()")
}
func get_setting_access(data *protocol.MSG_U2WS_Admin_menu_setting_access, c *server.Context) {
	user := public.Getuserinfo(c)
	if user.Adminid != 1 {
		return
	}
	if access_msg == nil {
		init_access_msg()
	}
	c.Output_data(access_msg)
}
func edit_setting_access(data *protocol.MSG_U2WS_Admin_edit_setting_access, c *server.Context) {
	user := public.Getuserinfo(c)
	if user.Adminid != 1 {
		return
	}
	model_setting := new(models.Model_Setting)
	model_setting.Ctx = c
	err := model_setting.SettingSetEx(data.Setting)
	if err != nil {
		c.Out_common(protocol.Fail, err.Error())
		return
	}
	init_access_msg()
	c.Out_common(protocol.Success, "javascript:reload()")

}
func get_setting_functions(data *protocol.MSG_U2WS_Admin_menu_setting_functions, c *server.Context) {
	user := public.Getuserinfo(c)
	if user.Adminid != 1 {
		return
	}
	if Functions_msg == nil {
		Init_Functions_msg()
	}
	c.Output_data(Functions_msg)
}
func edit_setting_functions_mod(data *protocol.MSG_U2WS_Admin_edit_setting_functions_mod, c *server.Context) {
	user := public.Getuserinfo(c)
	if user.Adminid != 1 {
		return
	}
	model_setting := new(models.Model_Setting)
	model_setting.Ctx = c
	err := model_setting.SettingSetEx(data.Setting_mod)
	if err != nil {
		c.Out_common(protocol.Fail, err.Error())
		return
	}
	Init_Functions_msg()
	c.Out_common(protocol.Success, "javascript:reload()")

}
func edit_setting_setnav(data *protocol.MSG_U2WS_Admin_setting_setnav, c *server.Context) {
	user := public.Getuserinfo(c)
	if user.Adminid != 1 {
		return
	}
	if Functions_msg == nil {
		Init_Functions_msg()
	}
	value := 0
	if data.Status > -1 {
		value = 1
	}
	model := &models.Model{Ctx: c}

	ref := reflect.ValueOf(Functions_msg.Setting_curscript).Elem()
	model_setting := new(models.Model_Setting)
	model_setting.Ctx = c
	if f := ref.FieldByName(data.Name); f.Kind() == reflect.Int8 {
		defer models.SettingGetEx(Functions_msg.Setting_curscript)
		str := strconv.Itoa(value)
		f.SetInt(int64(value))
		err := model_setting.SettingSet(strings.ToLower(data.Name), str)
		if err != nil {
			c.Out_common(protocol.Fail, err.Error())
			return
		}
	} else {
		c.Out_common(protocol.Fail, "找不到修改的内容")
		return
	}

	_, err := model.Table("Common_nav").Where(map[string]interface{}{"Title": strings.Replace(data.Name, "status", "", 1)}).Update(map[string]interface{}{"Available": data.Status})
	if err != nil {
		c.Out_common(protocol.Err_db, err.Error())
		return
	}
	c.Out_common(protocol.Success, "javascript:reload()")
}
func edit_setting_functions_heatthread(data *protocol.MSG_U2WS_Admin_edit_setting_functions_heatthread, c *server.Context) {
	user := public.Getuserinfo(c)
	if user.Adminid != 1 {
		return
	}
	model_setting := new(models.Model_Setting)
	model_setting.Ctx = c
	err := model_setting.SettingSetEx(data.Setting_heatthread)
	if err != nil {
		c.Out_common(protocol.Fail, err.Error())
		return
	}
	Init_Functions_msg()
	c.Out_common(protocol.Success, "javascript:reload()")

}
func edit_setting_functions_recommend(data *protocol.MSG_U2WS_Admin_edit_setting_functions_recommend, c *server.Context) {
	user := public.Getuserinfo(c)
	if user.Adminid != 1 {
		return
	}
	model_setting := new(models.Model_Setting)
	model_setting.Ctx = c
	err := model_setting.SettingSetEx(data.Setting_recommend)
	if err != nil {
		c.Out_common(protocol.Fail, err.Error())
		return
	}
	Init_Functions_msg()
	c.Out_common(protocol.Success, "javascript:reload()")

}
func edit_setting_functions_comment(data *protocol.MSG_U2WS_Admin_edit_setting_functions_comment, c *server.Context) {
	user := public.Getuserinfo(c)
	if user.Adminid != 1 {
		return
	}
	model_setting := new(models.Model_Setting)
	model_setting.Ctx = c
	err := model_setting.SettingSetEx(data.Setting_comment)
	if err != nil {
		c.Out_common(protocol.Fail, err.Error())
		return
	}
	Init_Functions_msg()
	c.Out_common(protocol.Success, "javascript:reload()")

}
func edit_setting_functions_guide(data *protocol.MSG_U2WS_Admin_edit_setting_functions_guide, c *server.Context) {
	user := public.Getuserinfo(c)
	if user.Adminid != 1 {
		return
	}
	model_setting := new(models.Model_Setting)
	model_setting.Ctx = c
	err := model_setting.SettingSetEx(data.Setting_guide)
	if err != nil {
		c.Out_common(protocol.Fail, err.Error())
		return
	}
	Init_Functions_msg()
	c.Out_common(protocol.Success, "javascript:reload()")

}
func edit_setting_functions_activity(data *protocol.MSG_U2WS_Admin_edit_setting_functions_activity, c *server.Context) {
	user := public.Getuserinfo(c)
	if user.Adminid != 1 {
		return
	}
	model_setting := new(models.Model_Setting)
	model_setting.Ctx = c
	err := model_setting.SettingSetEx(data.Setting_activity)
	if err != nil {
		c.Out_common(protocol.Fail, err.Error())
		return
	}
	Init_Functions_msg()
	c.Out_common(protocol.Success, "javascript:reload()")

}
func edit_setting_functions_threadexp(data *protocol.MSG_U2WS_Admin_edit_setting_functions_threadexp, c *server.Context) {
	user := public.Getuserinfo(c)
	if user.Adminid != 1 {
		return
	}
	model_setting := new(models.Model_Setting)
	model_setting.Ctx = c
	err := model_setting.SettingSetEx(data.Setting_threadexp)
	if err != nil {
		c.Out_common(protocol.Fail, err.Error())
		return
	}
	Init_Functions_msg()
	c.Out_common(protocol.Success, "javascript:reload()")

}
func edit_setting_functions_other(data *protocol.MSG_U2WS_Admin_edit_setting_functions_other, c *server.Context) {
	user := public.Getuserinfo(c)
	if user.Adminid != 1 {
		return
	}
	model_setting := new(models.Model_Setting)
	model_setting.Ctx = c
	err := model_setting.SettingSetEx(data.Setting_other)
	if err != nil {
		c.Out_common(protocol.Fail, err.Error())
		return
	}
	Init_Functions_msg()
	c.Out_common(protocol.Success, "javascript:reload()")

}

var access_msg = &protocol.MSG_WS2U_Admin_menu_setting_access{
	Setting: &protocol.MSG_Admin_setting_access{},
}

func init_access_msg() {
	models.SettingGetEx(access_msg.Setting)
}

var Functions_msg = &protocol.MSG_WS2U_Admin_menu_setting_functions{
	Setting_activity:   &protocol.MSG_Admin_setting_functions_activity{},
	Setting_comment:    &protocol.MSG_Admin_setting_functions_comment{},
	Setting_curscript:  &protocol.MSG_Admin_setting_functions_curscript{},
	Setting_guide:      &protocol.MSG_Admin_setting_functions_guide{},
	Setting_heatthread: &protocol.MSG_Admin_setting_functions_heatthread{},
	Setting_mod:        &protocol.MSG_Admin_setting_functions_mod{},
	Setting_other:      &protocol.MSG_Admin_setting_functions_other{},
	Setting_recommend:  &protocol.MSG_Admin_setting_functions_recommend{},
	Setting_threadexp:  &protocol.MSG_Admin_setting_functions_threadexp{},
}
var model_member_profile = &models.Model_member_profile{}

func Init_Functions_msg() {
	models.SettingGetEx(Functions_msg.Setting_curscript)
	models.SettingGetEx(Functions_msg.Setting_mod)
	models.SettingGetEx(Functions_msg.Setting_heatthread)
	models.SettingGetEx(Functions_msg.Setting_recommend)
	models.SettingGetEx(Functions_msg.Setting_comment)
	models.SettingGetEx(Functions_msg.Setting_guide)
	models.SettingGetEx(Functions_msg.Setting_threadexp)
	models.SettingGetEx(Functions_msg.Setting_other)
	Functions_msg.Setting_activity.Activitytype = models.Setting.Activitytype
	Functions_msg.Setting_activity.Activitycredit = models.Setting.Activitycredit
	Functions_msg.Setting_activity.Activityextnum = models.Setting.Activityextnum
	Functions_msg.Setting_activity.Activitypp = models.Setting.Activitypp

	member_profile_available_setting := model_member_profile.Get_available_setting()
	Functions_msg.Setting_activity.Activityfield = make([]*protocol.MSG_setting_activityfield, len(member_profile_available_setting))
	for k, v := range member_profile_available_setting {
		Functions_msg.Setting_activity.Activityfield[k] = &protocol.MSG_setting_activityfield{
			Fieldid: v.Fieldid,
			Title:   v.Title,
		}
		for _, vv := range models.Setting.Activityfield {
			if vv.Fieldid == v.Fieldid {
				Functions_msg.Setting_activity.Activityfield[k].Checked = 1
			}
		}
	}
}

type Activityfield struct {
	Fieldid string
	Title   string
}
