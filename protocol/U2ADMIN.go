package protocol

import (
	"sync"
	"bbs/libraries"
)

const (
	CMD_MSG_U2WS_Admin_menu_index = 735634866
	CMD_MSG_U2WS_Admin_menu_misc_custommenu = 426252242
	CMD_MSG_WS2U_Admin_menu_misc_custommenu = 1348090898
	CMD_MSG_U2WS_Admin_rebuild_leftmenu = 902427406
	CMD_MSG_WS2U_Admin_rebuild_leftmenu = -1580472055
	CMD_MSG_WS2U_custommenu = -34596055
	CMD_MSG_U2WS_Admin_AddCustommenu = 919505458
	CMD_MSG_U2WS_Admin_Edit_custommenu = 699095719
	CMD_MSG_U2WS_Admin_menu_setting_basic = -368188665
	CMD_MSG_WS2U_Admin_menu_setting_basic = 1479415992
	CMD_MSG_U2WS_Admin_edit_setting_basic = 1056482773
	CMD_MSG_U2WS_Admin_menu_setting_access = 1779812911
	CMD_MSG_WS2U_Admin_menu_setting_access = 830031817
	CMD_MSG_Admin_setting_access = 1801302893
	CMD_MSG_U2WS_Admin_edit_setting_access = 35425425
	CMD_MSG_U2WS_Admin_menu_setting_functions = 98456939
	CMD_MSG_WS2U_Admin_menu_setting_functions = 1654141527
	CMD_MSG_U2WS_Admin_setting_setnav = -871377362
	CMD_MSG_Admin_setting_functions_curscript = 1265224859
	CMD_MSG_U2WS_Admin_edit_setting_functions_mod = -371741980
	CMD_MSG_Admin_setting_functions_mod = -1667725759
	CMD_MSG_U2WS_Admin_edit_setting_functions_heatthread = -511404881
	CMD_MSG_Admin_setting_functions_heatthread = 37433885
	CMD_MSG_U2WS_Admin_edit_setting_functions_recommend = -1830850073
	CMD_MSG_Admin_setting_functions_recommend = 1316147567
	CMD_MSG_U2WS_Admin_edit_setting_functions_comment = -848292620
	CMD_MSG_Admin_setting_functions_comment = -786656194
	CMD_MSG_U2WS_Admin_edit_setting_functions_guide = 206405707
	CMD_MSG_Admin_setting_functions_guide = -303705781
	CMD_MSG_U2WS_Admin_edit_setting_functions_activity = 1392055914
	CMD_MSG_Admin_setting_functions_activity = 693391684
	CMD_MSG_setting_activityfield = 1078788684
	CMD_MSG_U2WS_Admin_edit_setting_functions_threadexp = -1538758015
	CMD_MSG_Admin_setting_functions_threadexp = 2028325385
	CMD_MSG_U2WS_Admin_edit_setting_functions_other = 529232478
	CMD_MSG_Admin_setting_functions_other = -31251618
	CMD_MSG_U2WS_Admin_menu_forums_index = -981386295
	CMD_MSG_WS2U_Admin_menu_forums_index = 1534176368
	CMD_MSG_admin_forum_cart = 1251023957
	CMD_MSG_admin_forum = 2061189765
	CMD_MSG_admin_forum_three = 142633269
	CMD_MSG_U2WS_Admin_edit_forums_index = -1946743894
	CMD_MSG_U2WS_Admin_delete_forum = -1477628465
	CMD_MSG_U2WS_Admin_menu_forums_edit = -1405787337
	CMD_MSG_WS2U_Admin_menu_forums_edit = 943159600
	CMD_MSG_admin_forum_edit_base = -540414860
	CMD_MSG_admin_forum_extra = 58375333
	CMD_MSG_admin_forum_modrecommen = -1575018876
	CMD_MSG_admin_forum_threadsorts = -47517347
	CMD_MSG_admin_forum_threadtypes = 1780863600
	CMD_MSG_admin_forum_type = -840121397
	CMD_MSG_admin_forum_edit_ext = -1505563183
	CMD_MSG_U2WS_Admin_menu_forums_moderators = 1006442797
	CMD_MSG_WS2U_Admin_menu_forums_moderators = 1555791377
	CMD_MSG_admin_forums_moderator = -10820895
	CMD_MSG_admin_forums_group = 1959754928
	CMD_MSG_U2WS_Admin_Edit_forums_moderator = -295518409
)

type MSG_U2WS_Admin_menu_index struct {
}

var Pool_MSG_U2WS_Admin_menu_index = sync.Pool{New: func() interface{} { return &MSG_U2WS_Admin_menu_index{} }}

func (data *MSG_U2WS_Admin_menu_index) Put() {
	Pool_MSG_U2WS_Admin_menu_index.Put(data)
}
func (data *MSG_U2WS_Admin_menu_index) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_U2WS_Admin_menu_index)
	WRITE_int32(cmd, buf)
	WRITE_MSG_U2WS_Admin_menu_index(data, buf)
}

func WRITE_MSG_U2WS_Admin_menu_index(data *MSG_U2WS_Admin_menu_index, buf *libraries.MsgBuffer) {
}

func READ_MSG_U2WS_Admin_menu_index(buf *libraries.MsgBuffer) (data *MSG_U2WS_Admin_menu_index) {
	data = Pool_MSG_U2WS_Admin_menu_index.Get().(*MSG_U2WS_Admin_menu_index)
	return
}

type MSG_U2WS_Admin_menu_misc_custommenu struct {
}

var Pool_MSG_U2WS_Admin_menu_misc_custommenu = sync.Pool{New: func() interface{} { return &MSG_U2WS_Admin_menu_misc_custommenu{} }}

func (data *MSG_U2WS_Admin_menu_misc_custommenu) Put() {
	Pool_MSG_U2WS_Admin_menu_misc_custommenu.Put(data)
}
func (data *MSG_U2WS_Admin_menu_misc_custommenu) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_U2WS_Admin_menu_misc_custommenu)
	WRITE_int32(cmd, buf)
	WRITE_MSG_U2WS_Admin_menu_misc_custommenu(data, buf)
}

func WRITE_MSG_U2WS_Admin_menu_misc_custommenu(data *MSG_U2WS_Admin_menu_misc_custommenu, buf *libraries.MsgBuffer) {
}

func READ_MSG_U2WS_Admin_menu_misc_custommenu(buf *libraries.MsgBuffer) (data *MSG_U2WS_Admin_menu_misc_custommenu) {
	data = Pool_MSG_U2WS_Admin_menu_misc_custommenu.Get().(*MSG_U2WS_Admin_menu_misc_custommenu)
	return
}

type MSG_WS2U_Admin_menu_misc_custommenu struct {
	Menus []*MSG_WS2U_custommenu
}

var Pool_MSG_WS2U_Admin_menu_misc_custommenu = sync.Pool{New: func() interface{} { return &MSG_WS2U_Admin_menu_misc_custommenu{} }}

func (data *MSG_WS2U_Admin_menu_misc_custommenu) Put() {
	for _,v := range data.Menus {
		Pool_MSG_WS2U_custommenu.Put(v)
	}
	Pool_MSG_WS2U_Admin_menu_misc_custommenu.Put(data)
}
func (data *MSG_WS2U_Admin_menu_misc_custommenu) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_WS2U_Admin_menu_misc_custommenu)
	WRITE_int32(cmd, buf)
	WRITE_MSG_WS2U_Admin_menu_misc_custommenu(data, buf)
}

func WRITE_MSG_WS2U_Admin_menu_misc_custommenu(data *MSG_WS2U_Admin_menu_misc_custommenu, buf *libraries.MsgBuffer) {
	WRITE_int16(int16(len(data.Menus)), buf)
	for _, v := range data.Menus{
		WRITE_MSG_WS2U_custommenu(v, buf)
	}
}

func READ_MSG_WS2U_Admin_menu_misc_custommenu(buf *libraries.MsgBuffer) (data *MSG_WS2U_Admin_menu_misc_custommenu) {
	data = Pool_MSG_WS2U_Admin_menu_misc_custommenu.Get().(*MSG_WS2U_Admin_menu_misc_custommenu)
	Menus_len := int(READ_int16(buf))
	data.Menus = make([]*MSG_WS2U_custommenu, Menus_len)
	for i := 0; i < Menus_len; i++ {
		data.Menus[i] = READ_MSG_WS2U_custommenu(buf)
	}
	return
}

type MSG_U2WS_Admin_rebuild_leftmenu struct {
}

var Pool_MSG_U2WS_Admin_rebuild_leftmenu = sync.Pool{New: func() interface{} { return &MSG_U2WS_Admin_rebuild_leftmenu{} }}

func (data *MSG_U2WS_Admin_rebuild_leftmenu) Put() {
	Pool_MSG_U2WS_Admin_rebuild_leftmenu.Put(data)
}
func (data *MSG_U2WS_Admin_rebuild_leftmenu) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_U2WS_Admin_rebuild_leftmenu)
	WRITE_int32(cmd, buf)
	WRITE_MSG_U2WS_Admin_rebuild_leftmenu(data, buf)
}

func WRITE_MSG_U2WS_Admin_rebuild_leftmenu(data *MSG_U2WS_Admin_rebuild_leftmenu, buf *libraries.MsgBuffer) {
}

func READ_MSG_U2WS_Admin_rebuild_leftmenu(buf *libraries.MsgBuffer) (data *MSG_U2WS_Admin_rebuild_leftmenu) {
	data = Pool_MSG_U2WS_Admin_rebuild_leftmenu.Get().(*MSG_U2WS_Admin_rebuild_leftmenu)
	return
}

type MSG_WS2U_Admin_rebuild_leftmenu struct {
	Menus []*MSG_WS2U_custommenu
}

var Pool_MSG_WS2U_Admin_rebuild_leftmenu = sync.Pool{New: func() interface{} { return &MSG_WS2U_Admin_rebuild_leftmenu{} }}

func (data *MSG_WS2U_Admin_rebuild_leftmenu) Put() {
	for _,v := range data.Menus {
		Pool_MSG_WS2U_custommenu.Put(v)
	}
	Pool_MSG_WS2U_Admin_rebuild_leftmenu.Put(data)
}
func (data *MSG_WS2U_Admin_rebuild_leftmenu) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_WS2U_Admin_rebuild_leftmenu)
	WRITE_int32(cmd, buf)
	WRITE_MSG_WS2U_Admin_rebuild_leftmenu(data, buf)
}

func WRITE_MSG_WS2U_Admin_rebuild_leftmenu(data *MSG_WS2U_Admin_rebuild_leftmenu, buf *libraries.MsgBuffer) {
	WRITE_int16(int16(len(data.Menus)), buf)
	for _, v := range data.Menus{
		WRITE_MSG_WS2U_custommenu(v, buf)
	}
}

func READ_MSG_WS2U_Admin_rebuild_leftmenu(buf *libraries.MsgBuffer) (data *MSG_WS2U_Admin_rebuild_leftmenu) {
	data = Pool_MSG_WS2U_Admin_rebuild_leftmenu.Get().(*MSG_WS2U_Admin_rebuild_leftmenu)
	Menus_len := int(READ_int16(buf))
	data.Menus = make([]*MSG_WS2U_custommenu, Menus_len)
	for i := 0; i < Menus_len; i++ {
		data.Menus[i] = READ_MSG_WS2U_custommenu(buf)
	}
	return
}

type MSG_WS2U_custommenu struct {
	Title string
	Displayorder int8
	Id int16
	Url string
	Param string
}

var Pool_MSG_WS2U_custommenu = sync.Pool{New: func() interface{} { return &MSG_WS2U_custommenu{} }}

func (data *MSG_WS2U_custommenu) Put() {
	Pool_MSG_WS2U_custommenu.Put(data)
}
func (data *MSG_WS2U_custommenu) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_WS2U_custommenu)
	WRITE_int32(cmd, buf)
	WRITE_MSG_WS2U_custommenu(data, buf)
}

func WRITE_MSG_WS2U_custommenu(data *MSG_WS2U_custommenu, buf *libraries.MsgBuffer) {
	WRITE_string(data.Title, buf)
	WRITE_int8(data.Displayorder, buf)
	WRITE_int16(data.Id, buf)
	WRITE_string(data.Url, buf)
	WRITE_string(data.Param, buf)
}

func READ_MSG_WS2U_custommenu(buf *libraries.MsgBuffer) (data *MSG_WS2U_custommenu) {
	data = Pool_MSG_WS2U_custommenu.Get().(*MSG_WS2U_custommenu)
	data.Title = READ_string(buf)
	data.Displayorder = READ_int8(buf)
	data.Id = READ_int16(buf)
	data.Url = READ_string(buf)
	data.Param = READ_string(buf)
	return
}

type MSG_U2WS_Admin_AddCustommenu struct {
	Title string
	Url string
	Param string
}

var Pool_MSG_U2WS_Admin_AddCustommenu = sync.Pool{New: func() interface{} { return &MSG_U2WS_Admin_AddCustommenu{} }}

func (data *MSG_U2WS_Admin_AddCustommenu) Put() {
	Pool_MSG_U2WS_Admin_AddCustommenu.Put(data)
}
func (data *MSG_U2WS_Admin_AddCustommenu) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_U2WS_Admin_AddCustommenu)
	WRITE_int32(cmd, buf)
	WRITE_MSG_U2WS_Admin_AddCustommenu(data, buf)
}

func WRITE_MSG_U2WS_Admin_AddCustommenu(data *MSG_U2WS_Admin_AddCustommenu, buf *libraries.MsgBuffer) {
	WRITE_string(data.Title, buf)
	WRITE_string(data.Url, buf)
	WRITE_string(data.Param, buf)
}

func READ_MSG_U2WS_Admin_AddCustommenu(buf *libraries.MsgBuffer) (data *MSG_U2WS_Admin_AddCustommenu) {
	data = Pool_MSG_U2WS_Admin_AddCustommenu.Get().(*MSG_U2WS_Admin_AddCustommenu)
	data.Title = READ_string(buf)
	data.Url = READ_string(buf)
	data.Param = READ_string(buf)
	return
}

type MSG_U2WS_Admin_Edit_custommenu struct {
	Deletes []int32
	Edit []*MSG_WS2U_custommenu
}

var Pool_MSG_U2WS_Admin_Edit_custommenu = sync.Pool{New: func() interface{} { return &MSG_U2WS_Admin_Edit_custommenu{} }}

func (data *MSG_U2WS_Admin_Edit_custommenu) Put() {
	for _,v := range data.Edit {
		Pool_MSG_WS2U_custommenu.Put(v)
	}
	Pool_MSG_U2WS_Admin_Edit_custommenu.Put(data)
}
func (data *MSG_U2WS_Admin_Edit_custommenu) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_U2WS_Admin_Edit_custommenu)
	WRITE_int32(cmd, buf)
	WRITE_MSG_U2WS_Admin_Edit_custommenu(data, buf)
}

func WRITE_MSG_U2WS_Admin_Edit_custommenu(data *MSG_U2WS_Admin_Edit_custommenu, buf *libraries.MsgBuffer) {
	WRITE_int16(int16(len(data.Deletes)), buf)
	for _, v := range data.Deletes{
		WRITE_int32(v, buf)
	}
	WRITE_int16(int16(len(data.Edit)), buf)
	for _, v := range data.Edit{
		WRITE_MSG_WS2U_custommenu(v, buf)
	}
}

func READ_MSG_U2WS_Admin_Edit_custommenu(buf *libraries.MsgBuffer) (data *MSG_U2WS_Admin_Edit_custommenu) {
	data = Pool_MSG_U2WS_Admin_Edit_custommenu.Get().(*MSG_U2WS_Admin_Edit_custommenu)
	Deletes_len := int(READ_int16(buf))
	data.Deletes = make([]int32, Deletes_len)
	for i := 0; i < Deletes_len; i++ {
		data.Deletes[i] = READ_int32(buf)
	}
	Edit_len := int(READ_int16(buf))
	data.Edit = make([]*MSG_WS2U_custommenu, Edit_len)
	for i := 0; i < Edit_len; i++ {
		data.Edit[i] = READ_MSG_WS2U_custommenu(buf)
	}
	return
}

type MSG_U2WS_Admin_menu_setting_basic struct {
}

var Pool_MSG_U2WS_Admin_menu_setting_basic = sync.Pool{New: func() interface{} { return &MSG_U2WS_Admin_menu_setting_basic{} }}

func (data *MSG_U2WS_Admin_menu_setting_basic) Put() {
	Pool_MSG_U2WS_Admin_menu_setting_basic.Put(data)
}
func (data *MSG_U2WS_Admin_menu_setting_basic) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_U2WS_Admin_menu_setting_basic)
	WRITE_int32(cmd, buf)
	WRITE_MSG_U2WS_Admin_menu_setting_basic(data, buf)
}

func WRITE_MSG_U2WS_Admin_menu_setting_basic(data *MSG_U2WS_Admin_menu_setting_basic, buf *libraries.MsgBuffer) {
}

func READ_MSG_U2WS_Admin_menu_setting_basic(buf *libraries.MsgBuffer) (data *MSG_U2WS_Admin_menu_setting_basic) {
	data = Pool_MSG_U2WS_Admin_menu_setting_basic.Get().(*MSG_U2WS_Admin_menu_setting_basic)
	return
}

type MSG_WS2U_Admin_menu_setting_basic struct {
	Setting_bbname string
	Setting_sitename string
	Setting_siteurl string
	Setting_adminemail string
	Setting_site_qq string
	Setting_icp string
	Setting_boardlicensed int8
	Setting_statcode string
}

var Pool_MSG_WS2U_Admin_menu_setting_basic = sync.Pool{New: func() interface{} { return &MSG_WS2U_Admin_menu_setting_basic{} }}

func (data *MSG_WS2U_Admin_menu_setting_basic) Put() {
	Pool_MSG_WS2U_Admin_menu_setting_basic.Put(data)
}
func (data *MSG_WS2U_Admin_menu_setting_basic) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_WS2U_Admin_menu_setting_basic)
	WRITE_int32(cmd, buf)
	WRITE_MSG_WS2U_Admin_menu_setting_basic(data, buf)
}

func WRITE_MSG_WS2U_Admin_menu_setting_basic(data *MSG_WS2U_Admin_menu_setting_basic, buf *libraries.MsgBuffer) {
	WRITE_string(data.Setting_bbname, buf)
	WRITE_string(data.Setting_sitename, buf)
	WRITE_string(data.Setting_siteurl, buf)
	WRITE_string(data.Setting_adminemail, buf)
	WRITE_string(data.Setting_site_qq, buf)
	WRITE_string(data.Setting_icp, buf)
	WRITE_int8(data.Setting_boardlicensed, buf)
	WRITE_string(data.Setting_statcode, buf)
}

func READ_MSG_WS2U_Admin_menu_setting_basic(buf *libraries.MsgBuffer) (data *MSG_WS2U_Admin_menu_setting_basic) {
	data = Pool_MSG_WS2U_Admin_menu_setting_basic.Get().(*MSG_WS2U_Admin_menu_setting_basic)
	data.Setting_bbname = READ_string(buf)
	data.Setting_sitename = READ_string(buf)
	data.Setting_siteurl = READ_string(buf)
	data.Setting_adminemail = READ_string(buf)
	data.Setting_site_qq = READ_string(buf)
	data.Setting_icp = READ_string(buf)
	data.Setting_boardlicensed = READ_int8(buf)
	data.Setting_statcode = READ_string(buf)
	return
}

type MSG_U2WS_Admin_edit_setting_basic struct {
	Setting_bbname string
	Setting_sitename string
	Setting_siteurl string
	Setting_adminemail string
	Setting_site_qq string
	Setting_icp string
	Setting_boardlicensed int8
	Setting_statcode string
}

var Pool_MSG_U2WS_Admin_edit_setting_basic = sync.Pool{New: func() interface{} { return &MSG_U2WS_Admin_edit_setting_basic{} }}

func (data *MSG_U2WS_Admin_edit_setting_basic) Put() {
	Pool_MSG_U2WS_Admin_edit_setting_basic.Put(data)
}
func (data *MSG_U2WS_Admin_edit_setting_basic) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_U2WS_Admin_edit_setting_basic)
	WRITE_int32(cmd, buf)
	WRITE_MSG_U2WS_Admin_edit_setting_basic(data, buf)
}

func WRITE_MSG_U2WS_Admin_edit_setting_basic(data *MSG_U2WS_Admin_edit_setting_basic, buf *libraries.MsgBuffer) {
	WRITE_string(data.Setting_bbname, buf)
	WRITE_string(data.Setting_sitename, buf)
	WRITE_string(data.Setting_siteurl, buf)
	WRITE_string(data.Setting_adminemail, buf)
	WRITE_string(data.Setting_site_qq, buf)
	WRITE_string(data.Setting_icp, buf)
	WRITE_int8(data.Setting_boardlicensed, buf)
	WRITE_string(data.Setting_statcode, buf)
}

func READ_MSG_U2WS_Admin_edit_setting_basic(buf *libraries.MsgBuffer) (data *MSG_U2WS_Admin_edit_setting_basic) {
	data = Pool_MSG_U2WS_Admin_edit_setting_basic.Get().(*MSG_U2WS_Admin_edit_setting_basic)
	data.Setting_bbname = READ_string(buf)
	data.Setting_sitename = READ_string(buf)
	data.Setting_siteurl = READ_string(buf)
	data.Setting_adminemail = READ_string(buf)
	data.Setting_site_qq = READ_string(buf)
	data.Setting_icp = READ_string(buf)
	data.Setting_boardlicensed = READ_int8(buf)
	data.Setting_statcode = READ_string(buf)
	return
}

type MSG_U2WS_Admin_menu_setting_access struct {
}

var Pool_MSG_U2WS_Admin_menu_setting_access = sync.Pool{New: func() interface{} { return &MSG_U2WS_Admin_menu_setting_access{} }}

func (data *MSG_U2WS_Admin_menu_setting_access) Put() {
	Pool_MSG_U2WS_Admin_menu_setting_access.Put(data)
}
func (data *MSG_U2WS_Admin_menu_setting_access) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_U2WS_Admin_menu_setting_access)
	WRITE_int32(cmd, buf)
	WRITE_MSG_U2WS_Admin_menu_setting_access(data, buf)
}

func WRITE_MSG_U2WS_Admin_menu_setting_access(data *MSG_U2WS_Admin_menu_setting_access, buf *libraries.MsgBuffer) {
}

func READ_MSG_U2WS_Admin_menu_setting_access(buf *libraries.MsgBuffer) (data *MSG_U2WS_Admin_menu_setting_access) {
	data = Pool_MSG_U2WS_Admin_menu_setting_access.Get().(*MSG_U2WS_Admin_menu_setting_access)
	return
}

type MSG_WS2U_Admin_menu_setting_access struct {
	Setting *MSG_Admin_setting_access
}

var Pool_MSG_WS2U_Admin_menu_setting_access = sync.Pool{New: func() interface{} { return &MSG_WS2U_Admin_menu_setting_access{} }}

func (data *MSG_WS2U_Admin_menu_setting_access) Put() {
	if data.Setting != nil {
		Pool_MSG_Admin_setting_access.Put(data.Setting)
		data.Setting = nil
	}
	Pool_MSG_WS2U_Admin_menu_setting_access.Put(data)
}
func (data *MSG_WS2U_Admin_menu_setting_access) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_WS2U_Admin_menu_setting_access)
	WRITE_int32(cmd, buf)
	WRITE_MSG_WS2U_Admin_menu_setting_access(data, buf)
}

func WRITE_MSG_WS2U_Admin_menu_setting_access(data *MSG_WS2U_Admin_menu_setting_access, buf *libraries.MsgBuffer) {
	if data.Setting == nil {
		WRITE_int8(0, buf)
	} else {
		WRITE_int8(1, buf)
		WRITE_MSG_Admin_setting_access(data.Setting, buf)
	}
}

func READ_MSG_WS2U_Admin_menu_setting_access(buf *libraries.MsgBuffer) (data *MSG_WS2U_Admin_menu_setting_access) {
	data = Pool_MSG_WS2U_Admin_menu_setting_access.Get().(*MSG_WS2U_Admin_menu_setting_access)
	Setting_len := int(READ_int8(buf))
	if Setting_len == 1 {
		data.Setting = READ_MSG_Admin_setting_access(buf)
	}else{
		data.Setting = nil
	}
	return
}

type MSG_Admin_setting_access struct {
	Regstatus int8
	Regclosemessage string
	Regname string
	Sendregisterurl string
	Reglinkname string
	Censoruser string
	Pwlength int8
	Strongpw int16
	Regverify int8
	Areaverifywhite string
	Ipverifywhite string
	Regmaildomain int8
	Maildomainlist string
	Regctrl int32
	Regfloodctrl int32
	Ipregctrltime int32
	Ipregctrl string
	Welcomemsg int8
	Welcomemsgtitle string
	Welcomemsgtxt string
	Bbrules int8
	Bbrulesforce int8
	Bbrulestxt string
	Newbiespan int32
	Ipaccess string
	Adminipaccess string
	Domainwhitelist string
	Domainwhitelist_affectimg int8
}

var Pool_MSG_Admin_setting_access = sync.Pool{New: func() interface{} { return &MSG_Admin_setting_access{} }}

func (data *MSG_Admin_setting_access) Put() {
	Pool_MSG_Admin_setting_access.Put(data)
}
func (data *MSG_Admin_setting_access) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_Admin_setting_access)
	WRITE_int32(cmd, buf)
	WRITE_MSG_Admin_setting_access(data, buf)
}

func WRITE_MSG_Admin_setting_access(data *MSG_Admin_setting_access, buf *libraries.MsgBuffer) {
	WRITE_int8(data.Regstatus, buf)
	WRITE_string(data.Regclosemessage, buf)
	WRITE_string(data.Regname, buf)
	WRITE_string(data.Sendregisterurl, buf)
	WRITE_string(data.Reglinkname, buf)
	WRITE_string(data.Censoruser, buf)
	WRITE_int8(data.Pwlength, buf)
	WRITE_int16(data.Strongpw, buf)
	WRITE_int8(data.Regverify, buf)
	WRITE_string(data.Areaverifywhite, buf)
	WRITE_string(data.Ipverifywhite, buf)
	WRITE_int8(data.Regmaildomain, buf)
	WRITE_string(data.Maildomainlist, buf)
	WRITE_int32(data.Regctrl, buf)
	WRITE_int32(data.Regfloodctrl, buf)
	WRITE_int32(data.Ipregctrltime, buf)
	WRITE_string(data.Ipregctrl, buf)
	WRITE_int8(data.Welcomemsg, buf)
	WRITE_string(data.Welcomemsgtitle, buf)
	WRITE_string(data.Welcomemsgtxt, buf)
	WRITE_int8(data.Bbrules, buf)
	WRITE_int8(data.Bbrulesforce, buf)
	WRITE_string(data.Bbrulestxt, buf)
	WRITE_int32(data.Newbiespan, buf)
	WRITE_string(data.Ipaccess, buf)
	WRITE_string(data.Adminipaccess, buf)
	WRITE_string(data.Domainwhitelist, buf)
	WRITE_int8(data.Domainwhitelist_affectimg, buf)
}

func READ_MSG_Admin_setting_access(buf *libraries.MsgBuffer) (data *MSG_Admin_setting_access) {
	data = Pool_MSG_Admin_setting_access.Get().(*MSG_Admin_setting_access)
	data.Regstatus = READ_int8(buf)
	data.Regclosemessage = READ_string(buf)
	data.Regname = READ_string(buf)
	data.Sendregisterurl = READ_string(buf)
	data.Reglinkname = READ_string(buf)
	data.Censoruser = READ_string(buf)
	data.Pwlength = READ_int8(buf)
	data.Strongpw = READ_int16(buf)
	data.Regverify = READ_int8(buf)
	data.Areaverifywhite = READ_string(buf)
	data.Ipverifywhite = READ_string(buf)
	data.Regmaildomain = READ_int8(buf)
	data.Maildomainlist = READ_string(buf)
	data.Regctrl = READ_int32(buf)
	data.Regfloodctrl = READ_int32(buf)
	data.Ipregctrltime = READ_int32(buf)
	data.Ipregctrl = READ_string(buf)
	data.Welcomemsg = READ_int8(buf)
	data.Welcomemsgtitle = READ_string(buf)
	data.Welcomemsgtxt = READ_string(buf)
	data.Bbrules = READ_int8(buf)
	data.Bbrulesforce = READ_int8(buf)
	data.Bbrulestxt = READ_string(buf)
	data.Newbiespan = READ_int32(buf)
	data.Ipaccess = READ_string(buf)
	data.Adminipaccess = READ_string(buf)
	data.Domainwhitelist = READ_string(buf)
	data.Domainwhitelist_affectimg = READ_int8(buf)
	return
}

type MSG_U2WS_Admin_edit_setting_access struct {
	Setting *MSG_Admin_setting_access
}

var Pool_MSG_U2WS_Admin_edit_setting_access = sync.Pool{New: func() interface{} { return &MSG_U2WS_Admin_edit_setting_access{} }}

func (data *MSG_U2WS_Admin_edit_setting_access) Put() {
	if data.Setting != nil {
		Pool_MSG_Admin_setting_access.Put(data.Setting)
		data.Setting = nil
	}
	Pool_MSG_U2WS_Admin_edit_setting_access.Put(data)
}
func (data *MSG_U2WS_Admin_edit_setting_access) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_U2WS_Admin_edit_setting_access)
	WRITE_int32(cmd, buf)
	WRITE_MSG_U2WS_Admin_edit_setting_access(data, buf)
}

func WRITE_MSG_U2WS_Admin_edit_setting_access(data *MSG_U2WS_Admin_edit_setting_access, buf *libraries.MsgBuffer) {
	if data.Setting == nil {
		WRITE_int8(0, buf)
	} else {
		WRITE_int8(1, buf)
		WRITE_MSG_Admin_setting_access(data.Setting, buf)
	}
}

func READ_MSG_U2WS_Admin_edit_setting_access(buf *libraries.MsgBuffer) (data *MSG_U2WS_Admin_edit_setting_access) {
	data = Pool_MSG_U2WS_Admin_edit_setting_access.Get().(*MSG_U2WS_Admin_edit_setting_access)
	Setting_len := int(READ_int8(buf))
	if Setting_len == 1 {
		data.Setting = READ_MSG_Admin_setting_access(buf)
	}else{
		data.Setting = nil
	}
	return
}

type MSG_U2WS_Admin_menu_setting_functions struct {
}

var Pool_MSG_U2WS_Admin_menu_setting_functions = sync.Pool{New: func() interface{} { return &MSG_U2WS_Admin_menu_setting_functions{} }}

func (data *MSG_U2WS_Admin_menu_setting_functions) Put() {
	Pool_MSG_U2WS_Admin_menu_setting_functions.Put(data)
}
func (data *MSG_U2WS_Admin_menu_setting_functions) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_U2WS_Admin_menu_setting_functions)
	WRITE_int32(cmd, buf)
	WRITE_MSG_U2WS_Admin_menu_setting_functions(data, buf)
}

func WRITE_MSG_U2WS_Admin_menu_setting_functions(data *MSG_U2WS_Admin_menu_setting_functions, buf *libraries.MsgBuffer) {
}

func READ_MSG_U2WS_Admin_menu_setting_functions(buf *libraries.MsgBuffer) (data *MSG_U2WS_Admin_menu_setting_functions) {
	data = Pool_MSG_U2WS_Admin_menu_setting_functions.Get().(*MSG_U2WS_Admin_menu_setting_functions)
	return
}

type MSG_WS2U_Admin_menu_setting_functions struct {
	Setting_curscript *MSG_Admin_setting_functions_curscript
	Setting_mod *MSG_Admin_setting_functions_mod
	Setting_heatthread *MSG_Admin_setting_functions_heatthread
	Setting_recommend *MSG_Admin_setting_functions_recommend
	Setting_comment *MSG_Admin_setting_functions_comment
	Setting_guide *MSG_Admin_setting_functions_guide
	Setting_activity *MSG_Admin_setting_functions_activity
	Setting_threadexp *MSG_Admin_setting_functions_threadexp
	Setting_other *MSG_Admin_setting_functions_other
}

var Pool_MSG_WS2U_Admin_menu_setting_functions = sync.Pool{New: func() interface{} { return &MSG_WS2U_Admin_menu_setting_functions{} }}

func (data *MSG_WS2U_Admin_menu_setting_functions) Put() {
	if data.Setting_curscript != nil {
		Pool_MSG_Admin_setting_functions_curscript.Put(data.Setting_curscript)
		data.Setting_curscript = nil
	}
	if data.Setting_mod != nil {
		Pool_MSG_Admin_setting_functions_mod.Put(data.Setting_mod)
		data.Setting_mod = nil
	}
	if data.Setting_heatthread != nil {
		Pool_MSG_Admin_setting_functions_heatthread.Put(data.Setting_heatthread)
		data.Setting_heatthread = nil
	}
	if data.Setting_recommend != nil {
		Pool_MSG_Admin_setting_functions_recommend.Put(data.Setting_recommend)
		data.Setting_recommend = nil
	}
	if data.Setting_comment != nil {
		Pool_MSG_Admin_setting_functions_comment.Put(data.Setting_comment)
		data.Setting_comment = nil
	}
	if data.Setting_guide != nil {
		Pool_MSG_Admin_setting_functions_guide.Put(data.Setting_guide)
		data.Setting_guide = nil
	}
	if data.Setting_activity != nil {
		Pool_MSG_Admin_setting_functions_activity.Put(data.Setting_activity)
		data.Setting_activity = nil
	}
	if data.Setting_threadexp != nil {
		Pool_MSG_Admin_setting_functions_threadexp.Put(data.Setting_threadexp)
		data.Setting_threadexp = nil
	}
	if data.Setting_other != nil {
		Pool_MSG_Admin_setting_functions_other.Put(data.Setting_other)
		data.Setting_other = nil
	}
	Pool_MSG_WS2U_Admin_menu_setting_functions.Put(data)
}
func (data *MSG_WS2U_Admin_menu_setting_functions) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_WS2U_Admin_menu_setting_functions)
	WRITE_int32(cmd, buf)
	WRITE_MSG_WS2U_Admin_menu_setting_functions(data, buf)
}

func WRITE_MSG_WS2U_Admin_menu_setting_functions(data *MSG_WS2U_Admin_menu_setting_functions, buf *libraries.MsgBuffer) {
	if data.Setting_curscript == nil {
		WRITE_int8(0, buf)
	} else {
		WRITE_int8(1, buf)
		WRITE_MSG_Admin_setting_functions_curscript(data.Setting_curscript, buf)
	}
	if data.Setting_mod == nil {
		WRITE_int8(0, buf)
	} else {
		WRITE_int8(1, buf)
		WRITE_MSG_Admin_setting_functions_mod(data.Setting_mod, buf)
	}
	if data.Setting_heatthread == nil {
		WRITE_int8(0, buf)
	} else {
		WRITE_int8(1, buf)
		WRITE_MSG_Admin_setting_functions_heatthread(data.Setting_heatthread, buf)
	}
	if data.Setting_recommend == nil {
		WRITE_int8(0, buf)
	} else {
		WRITE_int8(1, buf)
		WRITE_MSG_Admin_setting_functions_recommend(data.Setting_recommend, buf)
	}
	if data.Setting_comment == nil {
		WRITE_int8(0, buf)
	} else {
		WRITE_int8(1, buf)
		WRITE_MSG_Admin_setting_functions_comment(data.Setting_comment, buf)
	}
	if data.Setting_guide == nil {
		WRITE_int8(0, buf)
	} else {
		WRITE_int8(1, buf)
		WRITE_MSG_Admin_setting_functions_guide(data.Setting_guide, buf)
	}
	if data.Setting_activity == nil {
		WRITE_int8(0, buf)
	} else {
		WRITE_int8(1, buf)
		WRITE_MSG_Admin_setting_functions_activity(data.Setting_activity, buf)
	}
	if data.Setting_threadexp == nil {
		WRITE_int8(0, buf)
	} else {
		WRITE_int8(1, buf)
		WRITE_MSG_Admin_setting_functions_threadexp(data.Setting_threadexp, buf)
	}
	if data.Setting_other == nil {
		WRITE_int8(0, buf)
	} else {
		WRITE_int8(1, buf)
		WRITE_MSG_Admin_setting_functions_other(data.Setting_other, buf)
	}
}

func READ_MSG_WS2U_Admin_menu_setting_functions(buf *libraries.MsgBuffer) (data *MSG_WS2U_Admin_menu_setting_functions) {
	data = Pool_MSG_WS2U_Admin_menu_setting_functions.Get().(*MSG_WS2U_Admin_menu_setting_functions)
	Setting_curscript_len := int(READ_int8(buf))
	if Setting_curscript_len == 1 {
		data.Setting_curscript = READ_MSG_Admin_setting_functions_curscript(buf)
	}else{
		data.Setting_curscript = nil
	}
	Setting_mod_len := int(READ_int8(buf))
	if Setting_mod_len == 1 {
		data.Setting_mod = READ_MSG_Admin_setting_functions_mod(buf)
	}else{
		data.Setting_mod = nil
	}
	Setting_heatthread_len := int(READ_int8(buf))
	if Setting_heatthread_len == 1 {
		data.Setting_heatthread = READ_MSG_Admin_setting_functions_heatthread(buf)
	}else{
		data.Setting_heatthread = nil
	}
	Setting_recommend_len := int(READ_int8(buf))
	if Setting_recommend_len == 1 {
		data.Setting_recommend = READ_MSG_Admin_setting_functions_recommend(buf)
	}else{
		data.Setting_recommend = nil
	}
	Setting_comment_len := int(READ_int8(buf))
	if Setting_comment_len == 1 {
		data.Setting_comment = READ_MSG_Admin_setting_functions_comment(buf)
	}else{
		data.Setting_comment = nil
	}
	Setting_guide_len := int(READ_int8(buf))
	if Setting_guide_len == 1 {
		data.Setting_guide = READ_MSG_Admin_setting_functions_guide(buf)
	}else{
		data.Setting_guide = nil
	}
	Setting_activity_len := int(READ_int8(buf))
	if Setting_activity_len == 1 {
		data.Setting_activity = READ_MSG_Admin_setting_functions_activity(buf)
	}else{
		data.Setting_activity = nil
	}
	Setting_threadexp_len := int(READ_int8(buf))
	if Setting_threadexp_len == 1 {
		data.Setting_threadexp = READ_MSG_Admin_setting_functions_threadexp(buf)
	}else{
		data.Setting_threadexp = nil
	}
	Setting_other_len := int(READ_int8(buf))
	if Setting_other_len == 1 {
		data.Setting_other = READ_MSG_Admin_setting_functions_other(buf)
	}else{
		data.Setting_other = nil
	}
	return
}

type MSG_U2WS_Admin_setting_setnav struct {
	Name string
	Status int8
}

var Pool_MSG_U2WS_Admin_setting_setnav = sync.Pool{New: func() interface{} { return &MSG_U2WS_Admin_setting_setnav{} }}

func (data *MSG_U2WS_Admin_setting_setnav) Put() {
	Pool_MSG_U2WS_Admin_setting_setnav.Put(data)
}
func (data *MSG_U2WS_Admin_setting_setnav) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_U2WS_Admin_setting_setnav)
	WRITE_int32(cmd, buf)
	WRITE_MSG_U2WS_Admin_setting_setnav(data, buf)
}

func WRITE_MSG_U2WS_Admin_setting_setnav(data *MSG_U2WS_Admin_setting_setnav, buf *libraries.MsgBuffer) {
	WRITE_string(data.Name, buf)
	WRITE_int8(data.Status, buf)
}

func READ_MSG_U2WS_Admin_setting_setnav(buf *libraries.MsgBuffer) (data *MSG_U2WS_Admin_setting_setnav) {
	data = Pool_MSG_U2WS_Admin_setting_setnav.Get().(*MSG_U2WS_Admin_setting_setnav)
	data.Name = READ_string(buf)
	data.Status = READ_int8(buf)
	return
}

type MSG_Admin_setting_functions_curscript struct {
	Portalstatus int8
	Groupstatus int8
	Followstatus int8
	Collectionstatus int8
	Guidestatus int8
	Feedstatus int8
	Blogstatus int8
	Albumstatus int8
	Sharestatus int8
	Doingstatus int8
	Wallstatus int8
	Rankliststatus int8
}

var Pool_MSG_Admin_setting_functions_curscript = sync.Pool{New: func() interface{} { return &MSG_Admin_setting_functions_curscript{} }}

func (data *MSG_Admin_setting_functions_curscript) Put() {
	Pool_MSG_Admin_setting_functions_curscript.Put(data)
}
func (data *MSG_Admin_setting_functions_curscript) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_Admin_setting_functions_curscript)
	WRITE_int32(cmd, buf)
	WRITE_MSG_Admin_setting_functions_curscript(data, buf)
}

func WRITE_MSG_Admin_setting_functions_curscript(data *MSG_Admin_setting_functions_curscript, buf *libraries.MsgBuffer) {
	WRITE_int8(data.Portalstatus, buf)
	WRITE_int8(data.Groupstatus, buf)
	WRITE_int8(data.Followstatus, buf)
	WRITE_int8(data.Collectionstatus, buf)
	WRITE_int8(data.Guidestatus, buf)
	WRITE_int8(data.Feedstatus, buf)
	WRITE_int8(data.Blogstatus, buf)
	WRITE_int8(data.Albumstatus, buf)
	WRITE_int8(data.Sharestatus, buf)
	WRITE_int8(data.Doingstatus, buf)
	WRITE_int8(data.Wallstatus, buf)
	WRITE_int8(data.Rankliststatus, buf)
}

func READ_MSG_Admin_setting_functions_curscript(buf *libraries.MsgBuffer) (data *MSG_Admin_setting_functions_curscript) {
	data = Pool_MSG_Admin_setting_functions_curscript.Get().(*MSG_Admin_setting_functions_curscript)
	data.Portalstatus = READ_int8(buf)
	data.Groupstatus = READ_int8(buf)
	data.Followstatus = READ_int8(buf)
	data.Collectionstatus = READ_int8(buf)
	data.Guidestatus = READ_int8(buf)
	data.Feedstatus = READ_int8(buf)
	data.Blogstatus = READ_int8(buf)
	data.Albumstatus = READ_int8(buf)
	data.Sharestatus = READ_int8(buf)
	data.Doingstatus = READ_int8(buf)
	data.Wallstatus = READ_int8(buf)
	data.Rankliststatus = READ_int8(buf)
	return
}

type MSG_U2WS_Admin_edit_setting_functions_mod struct {
	Setting_mod *MSG_Admin_setting_functions_mod
}

var Pool_MSG_U2WS_Admin_edit_setting_functions_mod = sync.Pool{New: func() interface{} { return &MSG_U2WS_Admin_edit_setting_functions_mod{} }}

func (data *MSG_U2WS_Admin_edit_setting_functions_mod) Put() {
	if data.Setting_mod != nil {
		Pool_MSG_Admin_setting_functions_mod.Put(data.Setting_mod)
		data.Setting_mod = nil
	}
	Pool_MSG_U2WS_Admin_edit_setting_functions_mod.Put(data)
}
func (data *MSG_U2WS_Admin_edit_setting_functions_mod) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_U2WS_Admin_edit_setting_functions_mod)
	WRITE_int32(cmd, buf)
	WRITE_MSG_U2WS_Admin_edit_setting_functions_mod(data, buf)
}

func WRITE_MSG_U2WS_Admin_edit_setting_functions_mod(data *MSG_U2WS_Admin_edit_setting_functions_mod, buf *libraries.MsgBuffer) {
	if data.Setting_mod == nil {
		WRITE_int8(0, buf)
	} else {
		WRITE_int8(1, buf)
		WRITE_MSG_Admin_setting_functions_mod(data.Setting_mod, buf)
	}
}

func READ_MSG_U2WS_Admin_edit_setting_functions_mod(buf *libraries.MsgBuffer) (data *MSG_U2WS_Admin_edit_setting_functions_mod) {
	data = Pool_MSG_U2WS_Admin_edit_setting_functions_mod.Get().(*MSG_U2WS_Admin_edit_setting_functions_mod)
	Setting_mod_len := int(READ_int8(buf))
	if Setting_mod_len == 1 {
		data.Setting_mod = READ_MSG_Admin_setting_functions_mod(buf)
	}else{
		data.Setting_mod = nil
	}
	return
}

type MSG_Admin_setting_functions_mod struct {
	Updatestat int8
	Modworkstatus int8
	Maxmodworksmonths int8
	Losslessdel int16
	Modreasons string
	Userreasons string
	Bannedmessages int8
	Warninglimit int8
	Warningexpiration int16
	Rewardexpiration int16
	Moddetail int8
}

var Pool_MSG_Admin_setting_functions_mod = sync.Pool{New: func() interface{} { return &MSG_Admin_setting_functions_mod{} }}

func (data *MSG_Admin_setting_functions_mod) Put() {
	Pool_MSG_Admin_setting_functions_mod.Put(data)
}
func (data *MSG_Admin_setting_functions_mod) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_Admin_setting_functions_mod)
	WRITE_int32(cmd, buf)
	WRITE_MSG_Admin_setting_functions_mod(data, buf)
}

func WRITE_MSG_Admin_setting_functions_mod(data *MSG_Admin_setting_functions_mod, buf *libraries.MsgBuffer) {
	WRITE_int8(data.Updatestat, buf)
	WRITE_int8(data.Modworkstatus, buf)
	WRITE_int8(data.Maxmodworksmonths, buf)
	WRITE_int16(data.Losslessdel, buf)
	WRITE_string(data.Modreasons, buf)
	WRITE_string(data.Userreasons, buf)
	WRITE_int8(data.Bannedmessages, buf)
	WRITE_int8(data.Warninglimit, buf)
	WRITE_int16(data.Warningexpiration, buf)
	WRITE_int16(data.Rewardexpiration, buf)
	WRITE_int8(data.Moddetail, buf)
}

func READ_MSG_Admin_setting_functions_mod(buf *libraries.MsgBuffer) (data *MSG_Admin_setting_functions_mod) {
	data = Pool_MSG_Admin_setting_functions_mod.Get().(*MSG_Admin_setting_functions_mod)
	data.Updatestat = READ_int8(buf)
	data.Modworkstatus = READ_int8(buf)
	data.Maxmodworksmonths = READ_int8(buf)
	data.Losslessdel = READ_int16(buf)
	data.Modreasons = READ_string(buf)
	data.Userreasons = READ_string(buf)
	data.Bannedmessages = READ_int8(buf)
	data.Warninglimit = READ_int8(buf)
	data.Warningexpiration = READ_int16(buf)
	data.Rewardexpiration = READ_int16(buf)
	data.Moddetail = READ_int8(buf)
	return
}

type MSG_U2WS_Admin_edit_setting_functions_heatthread struct {
	Setting_heatthread *MSG_Admin_setting_functions_heatthread
}

var Pool_MSG_U2WS_Admin_edit_setting_functions_heatthread = sync.Pool{New: func() interface{} { return &MSG_U2WS_Admin_edit_setting_functions_heatthread{} }}

func (data *MSG_U2WS_Admin_edit_setting_functions_heatthread) Put() {
	if data.Setting_heatthread != nil {
		Pool_MSG_Admin_setting_functions_heatthread.Put(data.Setting_heatthread)
		data.Setting_heatthread = nil
	}
	Pool_MSG_U2WS_Admin_edit_setting_functions_heatthread.Put(data)
}
func (data *MSG_U2WS_Admin_edit_setting_functions_heatthread) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_U2WS_Admin_edit_setting_functions_heatthread)
	WRITE_int32(cmd, buf)
	WRITE_MSG_U2WS_Admin_edit_setting_functions_heatthread(data, buf)
}

func WRITE_MSG_U2WS_Admin_edit_setting_functions_heatthread(data *MSG_U2WS_Admin_edit_setting_functions_heatthread, buf *libraries.MsgBuffer) {
	if data.Setting_heatthread == nil {
		WRITE_int8(0, buf)
	} else {
		WRITE_int8(1, buf)
		WRITE_MSG_Admin_setting_functions_heatthread(data.Setting_heatthread, buf)
	}
}

func READ_MSG_U2WS_Admin_edit_setting_functions_heatthread(buf *libraries.MsgBuffer) (data *MSG_U2WS_Admin_edit_setting_functions_heatthread) {
	data = Pool_MSG_U2WS_Admin_edit_setting_functions_heatthread.Get().(*MSG_U2WS_Admin_edit_setting_functions_heatthread)
	Setting_heatthread_len := int(READ_int8(buf))
	if Setting_heatthread_len == 1 {
		data.Setting_heatthread = READ_MSG_Admin_setting_functions_heatthread(buf)
	}else{
		data.Setting_heatthread = nil
	}
	return
}

type MSG_Admin_setting_functions_heatthread struct {
	Heatthread_period int16
	Heatthread_iconlevels string
}

var Pool_MSG_Admin_setting_functions_heatthread = sync.Pool{New: func() interface{} { return &MSG_Admin_setting_functions_heatthread{} }}

func (data *MSG_Admin_setting_functions_heatthread) Put() {
	Pool_MSG_Admin_setting_functions_heatthread.Put(data)
}
func (data *MSG_Admin_setting_functions_heatthread) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_Admin_setting_functions_heatthread)
	WRITE_int32(cmd, buf)
	WRITE_MSG_Admin_setting_functions_heatthread(data, buf)
}

func WRITE_MSG_Admin_setting_functions_heatthread(data *MSG_Admin_setting_functions_heatthread, buf *libraries.MsgBuffer) {
	WRITE_int16(data.Heatthread_period, buf)
	WRITE_string(data.Heatthread_iconlevels, buf)
}

func READ_MSG_Admin_setting_functions_heatthread(buf *libraries.MsgBuffer) (data *MSG_Admin_setting_functions_heatthread) {
	data = Pool_MSG_Admin_setting_functions_heatthread.Get().(*MSG_Admin_setting_functions_heatthread)
	data.Heatthread_period = READ_int16(buf)
	data.Heatthread_iconlevels = READ_string(buf)
	return
}

type MSG_U2WS_Admin_edit_setting_functions_recommend struct {
	Setting_recommend *MSG_Admin_setting_functions_recommend
}

var Pool_MSG_U2WS_Admin_edit_setting_functions_recommend = sync.Pool{New: func() interface{} { return &MSG_U2WS_Admin_edit_setting_functions_recommend{} }}

func (data *MSG_U2WS_Admin_edit_setting_functions_recommend) Put() {
	if data.Setting_recommend != nil {
		Pool_MSG_Admin_setting_functions_recommend.Put(data.Setting_recommend)
		data.Setting_recommend = nil
	}
	Pool_MSG_U2WS_Admin_edit_setting_functions_recommend.Put(data)
}
func (data *MSG_U2WS_Admin_edit_setting_functions_recommend) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_U2WS_Admin_edit_setting_functions_recommend)
	WRITE_int32(cmd, buf)
	WRITE_MSG_U2WS_Admin_edit_setting_functions_recommend(data, buf)
}

func WRITE_MSG_U2WS_Admin_edit_setting_functions_recommend(data *MSG_U2WS_Admin_edit_setting_functions_recommend, buf *libraries.MsgBuffer) {
	if data.Setting_recommend == nil {
		WRITE_int8(0, buf)
	} else {
		WRITE_int8(1, buf)
		WRITE_MSG_Admin_setting_functions_recommend(data.Setting_recommend, buf)
	}
}

func READ_MSG_U2WS_Admin_edit_setting_functions_recommend(buf *libraries.MsgBuffer) (data *MSG_U2WS_Admin_edit_setting_functions_recommend) {
	data = Pool_MSG_U2WS_Admin_edit_setting_functions_recommend.Get().(*MSG_U2WS_Admin_edit_setting_functions_recommend)
	Setting_recommend_len := int(READ_int8(buf))
	if Setting_recommend_len == 1 {
		data.Setting_recommend = READ_MSG_Admin_setting_functions_recommend(buf)
	}else{
		data.Setting_recommend = nil
	}
	return
}

type MSG_Admin_setting_functions_recommend struct {
	Recommendthread_status int8
	Recommendthread_addtext string
	Recommendthread_subtracttext string
	Recommendthread_daycount int8
	Recommendthread_ownthread int8
	Recommendthread_iconlevels string
}

var Pool_MSG_Admin_setting_functions_recommend = sync.Pool{New: func() interface{} { return &MSG_Admin_setting_functions_recommend{} }}

func (data *MSG_Admin_setting_functions_recommend) Put() {
	Pool_MSG_Admin_setting_functions_recommend.Put(data)
}
func (data *MSG_Admin_setting_functions_recommend) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_Admin_setting_functions_recommend)
	WRITE_int32(cmd, buf)
	WRITE_MSG_Admin_setting_functions_recommend(data, buf)
}

func WRITE_MSG_Admin_setting_functions_recommend(data *MSG_Admin_setting_functions_recommend, buf *libraries.MsgBuffer) {
	WRITE_int8(data.Recommendthread_status, buf)
	WRITE_string(data.Recommendthread_addtext, buf)
	WRITE_string(data.Recommendthread_subtracttext, buf)
	WRITE_int8(data.Recommendthread_daycount, buf)
	WRITE_int8(data.Recommendthread_ownthread, buf)
	WRITE_string(data.Recommendthread_iconlevels, buf)
}

func READ_MSG_Admin_setting_functions_recommend(buf *libraries.MsgBuffer) (data *MSG_Admin_setting_functions_recommend) {
	data = Pool_MSG_Admin_setting_functions_recommend.Get().(*MSG_Admin_setting_functions_recommend)
	data.Recommendthread_status = READ_int8(buf)
	data.Recommendthread_addtext = READ_string(buf)
	data.Recommendthread_subtracttext = READ_string(buf)
	data.Recommendthread_daycount = READ_int8(buf)
	data.Recommendthread_ownthread = READ_int8(buf)
	data.Recommendthread_iconlevels = READ_string(buf)
	return
}

type MSG_U2WS_Admin_edit_setting_functions_comment struct {
	Setting_comment *MSG_Admin_setting_functions_comment
}

var Pool_MSG_U2WS_Admin_edit_setting_functions_comment = sync.Pool{New: func() interface{} { return &MSG_U2WS_Admin_edit_setting_functions_comment{} }}

func (data *MSG_U2WS_Admin_edit_setting_functions_comment) Put() {
	if data.Setting_comment != nil {
		Pool_MSG_Admin_setting_functions_comment.Put(data.Setting_comment)
		data.Setting_comment = nil
	}
	Pool_MSG_U2WS_Admin_edit_setting_functions_comment.Put(data)
}
func (data *MSG_U2WS_Admin_edit_setting_functions_comment) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_U2WS_Admin_edit_setting_functions_comment)
	WRITE_int32(cmd, buf)
	WRITE_MSG_U2WS_Admin_edit_setting_functions_comment(data, buf)
}

func WRITE_MSG_U2WS_Admin_edit_setting_functions_comment(data *MSG_U2WS_Admin_edit_setting_functions_comment, buf *libraries.MsgBuffer) {
	if data.Setting_comment == nil {
		WRITE_int8(0, buf)
	} else {
		WRITE_int8(1, buf)
		WRITE_MSG_Admin_setting_functions_comment(data.Setting_comment, buf)
	}
}

func READ_MSG_U2WS_Admin_edit_setting_functions_comment(buf *libraries.MsgBuffer) (data *MSG_U2WS_Admin_edit_setting_functions_comment) {
	data = Pool_MSG_U2WS_Admin_edit_setting_functions_comment.Get().(*MSG_U2WS_Admin_edit_setting_functions_comment)
	Setting_comment_len := int(READ_int8(buf))
	if Setting_comment_len == 1 {
		data.Setting_comment = READ_MSG_Admin_setting_functions_comment(buf)
	}else{
		data.Setting_comment = nil
	}
	return
}

type MSG_Admin_setting_functions_comment struct {
	Allowpostcomment int8
	Commentpostself int8
	Commentfirstpost int8
	Commentnumber int8
	Commentitem_0 string
	Commentitem_1 string
	Commentitem_2 string
	Commentitem_3 string
	Commentitem_4 string
	Commentitem_5 string
}

var Pool_MSG_Admin_setting_functions_comment = sync.Pool{New: func() interface{} { return &MSG_Admin_setting_functions_comment{} }}

func (data *MSG_Admin_setting_functions_comment) Put() {
	Pool_MSG_Admin_setting_functions_comment.Put(data)
}
func (data *MSG_Admin_setting_functions_comment) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_Admin_setting_functions_comment)
	WRITE_int32(cmd, buf)
	WRITE_MSG_Admin_setting_functions_comment(data, buf)
}

func WRITE_MSG_Admin_setting_functions_comment(data *MSG_Admin_setting_functions_comment, buf *libraries.MsgBuffer) {
	WRITE_int8(data.Allowpostcomment, buf)
	WRITE_int8(data.Commentpostself, buf)
	WRITE_int8(data.Commentfirstpost, buf)
	WRITE_int8(data.Commentnumber, buf)
	WRITE_string(data.Commentitem_0, buf)
	WRITE_string(data.Commentitem_1, buf)
	WRITE_string(data.Commentitem_2, buf)
	WRITE_string(data.Commentitem_3, buf)
	WRITE_string(data.Commentitem_4, buf)
	WRITE_string(data.Commentitem_5, buf)
}

func READ_MSG_Admin_setting_functions_comment(buf *libraries.MsgBuffer) (data *MSG_Admin_setting_functions_comment) {
	data = Pool_MSG_Admin_setting_functions_comment.Get().(*MSG_Admin_setting_functions_comment)
	data.Allowpostcomment = READ_int8(buf)
	data.Commentpostself = READ_int8(buf)
	data.Commentfirstpost = READ_int8(buf)
	data.Commentnumber = READ_int8(buf)
	data.Commentitem_0 = READ_string(buf)
	data.Commentitem_1 = READ_string(buf)
	data.Commentitem_2 = READ_string(buf)
	data.Commentitem_3 = READ_string(buf)
	data.Commentitem_4 = READ_string(buf)
	data.Commentitem_5 = READ_string(buf)
	return
}

type MSG_U2WS_Admin_edit_setting_functions_guide struct {
	Setting_guide *MSG_Admin_setting_functions_guide
}

var Pool_MSG_U2WS_Admin_edit_setting_functions_guide = sync.Pool{New: func() interface{} { return &MSG_U2WS_Admin_edit_setting_functions_guide{} }}

func (data *MSG_U2WS_Admin_edit_setting_functions_guide) Put() {
	if data.Setting_guide != nil {
		Pool_MSG_Admin_setting_functions_guide.Put(data.Setting_guide)
		data.Setting_guide = nil
	}
	Pool_MSG_U2WS_Admin_edit_setting_functions_guide.Put(data)
}
func (data *MSG_U2WS_Admin_edit_setting_functions_guide) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_U2WS_Admin_edit_setting_functions_guide)
	WRITE_int32(cmd, buf)
	WRITE_MSG_U2WS_Admin_edit_setting_functions_guide(data, buf)
}

func WRITE_MSG_U2WS_Admin_edit_setting_functions_guide(data *MSG_U2WS_Admin_edit_setting_functions_guide, buf *libraries.MsgBuffer) {
	if data.Setting_guide == nil {
		WRITE_int8(0, buf)
	} else {
		WRITE_int8(1, buf)
		WRITE_MSG_Admin_setting_functions_guide(data.Setting_guide, buf)
	}
}

func READ_MSG_U2WS_Admin_edit_setting_functions_guide(buf *libraries.MsgBuffer) (data *MSG_U2WS_Admin_edit_setting_functions_guide) {
	data = Pool_MSG_U2WS_Admin_edit_setting_functions_guide.Get().(*MSG_U2WS_Admin_edit_setting_functions_guide)
	Setting_guide_len := int(READ_int8(buf))
	if Setting_guide_len == 1 {
		data.Setting_guide = READ_MSG_Admin_setting_functions_guide(buf)
	}else{
		data.Setting_guide = nil
	}
	return
}

type MSG_Admin_setting_functions_guide struct {
	Heatthread_guidelimit int16
	Guide_hotdt int32
	Guide_digestdt int32
}

var Pool_MSG_Admin_setting_functions_guide = sync.Pool{New: func() interface{} { return &MSG_Admin_setting_functions_guide{} }}

func (data *MSG_Admin_setting_functions_guide) Put() {
	Pool_MSG_Admin_setting_functions_guide.Put(data)
}
func (data *MSG_Admin_setting_functions_guide) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_Admin_setting_functions_guide)
	WRITE_int32(cmd, buf)
	WRITE_MSG_Admin_setting_functions_guide(data, buf)
}

func WRITE_MSG_Admin_setting_functions_guide(data *MSG_Admin_setting_functions_guide, buf *libraries.MsgBuffer) {
	WRITE_int16(data.Heatthread_guidelimit, buf)
	WRITE_int32(data.Guide_hotdt, buf)
	WRITE_int32(data.Guide_digestdt, buf)
}

func READ_MSG_Admin_setting_functions_guide(buf *libraries.MsgBuffer) (data *MSG_Admin_setting_functions_guide) {
	data = Pool_MSG_Admin_setting_functions_guide.Get().(*MSG_Admin_setting_functions_guide)
	data.Heatthread_guidelimit = READ_int16(buf)
	data.Guide_hotdt = READ_int32(buf)
	data.Guide_digestdt = READ_int32(buf)
	return
}

type MSG_U2WS_Admin_edit_setting_functions_activity struct {
	Setting_activity *MSG_Admin_setting_functions_activity
}

var Pool_MSG_U2WS_Admin_edit_setting_functions_activity = sync.Pool{New: func() interface{} { return &MSG_U2WS_Admin_edit_setting_functions_activity{} }}

func (data *MSG_U2WS_Admin_edit_setting_functions_activity) Put() {
	if data.Setting_activity != nil {
		Pool_MSG_Admin_setting_functions_activity.Put(data.Setting_activity)
		data.Setting_activity = nil
	}
	Pool_MSG_U2WS_Admin_edit_setting_functions_activity.Put(data)
}
func (data *MSG_U2WS_Admin_edit_setting_functions_activity) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_U2WS_Admin_edit_setting_functions_activity)
	WRITE_int32(cmd, buf)
	WRITE_MSG_U2WS_Admin_edit_setting_functions_activity(data, buf)
}

func WRITE_MSG_U2WS_Admin_edit_setting_functions_activity(data *MSG_U2WS_Admin_edit_setting_functions_activity, buf *libraries.MsgBuffer) {
	if data.Setting_activity == nil {
		WRITE_int8(0, buf)
	} else {
		WRITE_int8(1, buf)
		WRITE_MSG_Admin_setting_functions_activity(data.Setting_activity, buf)
	}
}

func READ_MSG_U2WS_Admin_edit_setting_functions_activity(buf *libraries.MsgBuffer) (data *MSG_U2WS_Admin_edit_setting_functions_activity) {
	data = Pool_MSG_U2WS_Admin_edit_setting_functions_activity.Get().(*MSG_U2WS_Admin_edit_setting_functions_activity)
	Setting_activity_len := int(READ_int8(buf))
	if Setting_activity_len == 1 {
		data.Setting_activity = READ_MSG_Admin_setting_functions_activity(buf)
	}else{
		data.Setting_activity = nil
	}
	return
}

type MSG_Admin_setting_functions_activity struct {
	Activitytype string
	Activityextnum int8
	Activitycredit int8
	Activitypp int8
	Activityfield []*MSG_setting_activityfield
}

var Pool_MSG_Admin_setting_functions_activity = sync.Pool{New: func() interface{} { return &MSG_Admin_setting_functions_activity{} }}

func (data *MSG_Admin_setting_functions_activity) Put() {
	for _,v := range data.Activityfield {
		Pool_MSG_setting_activityfield.Put(v)
	}
	Pool_MSG_Admin_setting_functions_activity.Put(data)
}
func (data *MSG_Admin_setting_functions_activity) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_Admin_setting_functions_activity)
	WRITE_int32(cmd, buf)
	WRITE_MSG_Admin_setting_functions_activity(data, buf)
}

func WRITE_MSG_Admin_setting_functions_activity(data *MSG_Admin_setting_functions_activity, buf *libraries.MsgBuffer) {
	WRITE_string(data.Activitytype, buf)
	WRITE_int8(data.Activityextnum, buf)
	WRITE_int8(data.Activitycredit, buf)
	WRITE_int8(data.Activitypp, buf)
	WRITE_int16(int16(len(data.Activityfield)), buf)
	for _, v := range data.Activityfield{
		WRITE_MSG_setting_activityfield(v, buf)
	}
}

func READ_MSG_Admin_setting_functions_activity(buf *libraries.MsgBuffer) (data *MSG_Admin_setting_functions_activity) {
	data = Pool_MSG_Admin_setting_functions_activity.Get().(*MSG_Admin_setting_functions_activity)
	data.Activitytype = READ_string(buf)
	data.Activityextnum = READ_int8(buf)
	data.Activitycredit = READ_int8(buf)
	data.Activitypp = READ_int8(buf)
	Activityfield_len := int(READ_int16(buf))
	data.Activityfield = make([]*MSG_setting_activityfield, Activityfield_len)
	for i := 0; i < Activityfield_len; i++ {
		data.Activityfield[i] = READ_MSG_setting_activityfield(buf)
	}
	return
}

type MSG_setting_activityfield struct {
	Fieldid string
	Title string
	Checked int8
}

var Pool_MSG_setting_activityfield = sync.Pool{New: func() interface{} { return &MSG_setting_activityfield{} }}

func (data *MSG_setting_activityfield) Put() {
	Pool_MSG_setting_activityfield.Put(data)
}
func (data *MSG_setting_activityfield) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_setting_activityfield)
	WRITE_int32(cmd, buf)
	WRITE_MSG_setting_activityfield(data, buf)
}

func WRITE_MSG_setting_activityfield(data *MSG_setting_activityfield, buf *libraries.MsgBuffer) {
	WRITE_string(data.Fieldid, buf)
	WRITE_string(data.Title, buf)
	WRITE_int8(data.Checked, buf)
}

func READ_MSG_setting_activityfield(buf *libraries.MsgBuffer) (data *MSG_setting_activityfield) {
	data = Pool_MSG_setting_activityfield.Get().(*MSG_setting_activityfield)
	data.Fieldid = READ_string(buf)
	data.Title = READ_string(buf)
	data.Checked = READ_int8(buf)
	return
}

type MSG_U2WS_Admin_edit_setting_functions_threadexp struct {
	Setting_threadexp *MSG_Admin_setting_functions_threadexp
}

var Pool_MSG_U2WS_Admin_edit_setting_functions_threadexp = sync.Pool{New: func() interface{} { return &MSG_U2WS_Admin_edit_setting_functions_threadexp{} }}

func (data *MSG_U2WS_Admin_edit_setting_functions_threadexp) Put() {
	if data.Setting_threadexp != nil {
		Pool_MSG_Admin_setting_functions_threadexp.Put(data.Setting_threadexp)
		data.Setting_threadexp = nil
	}
	Pool_MSG_U2WS_Admin_edit_setting_functions_threadexp.Put(data)
}
func (data *MSG_U2WS_Admin_edit_setting_functions_threadexp) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_U2WS_Admin_edit_setting_functions_threadexp)
	WRITE_int32(cmd, buf)
	WRITE_MSG_U2WS_Admin_edit_setting_functions_threadexp(data, buf)
}

func WRITE_MSG_U2WS_Admin_edit_setting_functions_threadexp(data *MSG_U2WS_Admin_edit_setting_functions_threadexp, buf *libraries.MsgBuffer) {
	if data.Setting_threadexp == nil {
		WRITE_int8(0, buf)
	} else {
		WRITE_int8(1, buf)
		WRITE_MSG_Admin_setting_functions_threadexp(data.Setting_threadexp, buf)
	}
}

func READ_MSG_U2WS_Admin_edit_setting_functions_threadexp(buf *libraries.MsgBuffer) (data *MSG_U2WS_Admin_edit_setting_functions_threadexp) {
	data = Pool_MSG_U2WS_Admin_edit_setting_functions_threadexp.Get().(*MSG_U2WS_Admin_edit_setting_functions_threadexp)
	Setting_threadexp_len := int(READ_int8(buf))
	if Setting_threadexp_len == 1 {
		data.Setting_threadexp = READ_MSG_Admin_setting_functions_threadexp(buf)
	}else{
		data.Setting_threadexp = nil
	}
	return
}

type MSG_Admin_setting_functions_threadexp struct {
	Repliesrank int8
	Threadblacklist int8
	Threadhotreplies int8
	Threadfilternum int16
	Nofilteredpost int8
	Hidefilteredpost int8
	Filterednovote int8
}

var Pool_MSG_Admin_setting_functions_threadexp = sync.Pool{New: func() interface{} { return &MSG_Admin_setting_functions_threadexp{} }}

func (data *MSG_Admin_setting_functions_threadexp) Put() {
	Pool_MSG_Admin_setting_functions_threadexp.Put(data)
}
func (data *MSG_Admin_setting_functions_threadexp) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_Admin_setting_functions_threadexp)
	WRITE_int32(cmd, buf)
	WRITE_MSG_Admin_setting_functions_threadexp(data, buf)
}

func WRITE_MSG_Admin_setting_functions_threadexp(data *MSG_Admin_setting_functions_threadexp, buf *libraries.MsgBuffer) {
	WRITE_int8(data.Repliesrank, buf)
	WRITE_int8(data.Threadblacklist, buf)
	WRITE_int8(data.Threadhotreplies, buf)
	WRITE_int16(data.Threadfilternum, buf)
	WRITE_int8(data.Nofilteredpost, buf)
	WRITE_int8(data.Hidefilteredpost, buf)
	WRITE_int8(data.Filterednovote, buf)
}

func READ_MSG_Admin_setting_functions_threadexp(buf *libraries.MsgBuffer) (data *MSG_Admin_setting_functions_threadexp) {
	data = Pool_MSG_Admin_setting_functions_threadexp.Get().(*MSG_Admin_setting_functions_threadexp)
	data.Repliesrank = READ_int8(buf)
	data.Threadblacklist = READ_int8(buf)
	data.Threadhotreplies = READ_int8(buf)
	data.Threadfilternum = READ_int16(buf)
	data.Nofilteredpost = READ_int8(buf)
	data.Hidefilteredpost = READ_int8(buf)
	data.Filterednovote = READ_int8(buf)
	return
}

type MSG_U2WS_Admin_edit_setting_functions_other struct {
	Setting_other *MSG_Admin_setting_functions_other
}

var Pool_MSG_U2WS_Admin_edit_setting_functions_other = sync.Pool{New: func() interface{} { return &MSG_U2WS_Admin_edit_setting_functions_other{} }}

func (data *MSG_U2WS_Admin_edit_setting_functions_other) Put() {
	if data.Setting_other != nil {
		Pool_MSG_Admin_setting_functions_other.Put(data.Setting_other)
		data.Setting_other = nil
	}
	Pool_MSG_U2WS_Admin_edit_setting_functions_other.Put(data)
}
func (data *MSG_U2WS_Admin_edit_setting_functions_other) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_U2WS_Admin_edit_setting_functions_other)
	WRITE_int32(cmd, buf)
	WRITE_MSG_U2WS_Admin_edit_setting_functions_other(data, buf)
}

func WRITE_MSG_U2WS_Admin_edit_setting_functions_other(data *MSG_U2WS_Admin_edit_setting_functions_other, buf *libraries.MsgBuffer) {
	if data.Setting_other == nil {
		WRITE_int8(0, buf)
	} else {
		WRITE_int8(1, buf)
		WRITE_MSG_Admin_setting_functions_other(data.Setting_other, buf)
	}
}

func READ_MSG_U2WS_Admin_edit_setting_functions_other(buf *libraries.MsgBuffer) (data *MSG_U2WS_Admin_edit_setting_functions_other) {
	data = Pool_MSG_U2WS_Admin_edit_setting_functions_other.Get().(*MSG_U2WS_Admin_edit_setting_functions_other)
	Setting_other_len := int(READ_int8(buf))
	if Setting_other_len == 1 {
		data.Setting_other = READ_MSG_Admin_setting_functions_other(buf)
	}else{
		data.Setting_other = nil
	}
	return
}

type MSG_Admin_setting_functions_other struct {
	Uidlogin int8
	Autoidselect int8
	Oltimespan int8
	Onlyacceptfriendpm int8
	Pmreportuser string
	At_anyone int8
	Chatpmrefreshtime int8
	Collectionteamworkernum int16
	Closeforumorderby int8
	Disableipnotice int8
	Darkroom int8
	Globalsightml string
}

var Pool_MSG_Admin_setting_functions_other = sync.Pool{New: func() interface{} { return &MSG_Admin_setting_functions_other{} }}

func (data *MSG_Admin_setting_functions_other) Put() {
	Pool_MSG_Admin_setting_functions_other.Put(data)
}
func (data *MSG_Admin_setting_functions_other) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_Admin_setting_functions_other)
	WRITE_int32(cmd, buf)
	WRITE_MSG_Admin_setting_functions_other(data, buf)
}

func WRITE_MSG_Admin_setting_functions_other(data *MSG_Admin_setting_functions_other, buf *libraries.MsgBuffer) {
	WRITE_int8(data.Uidlogin, buf)
	WRITE_int8(data.Autoidselect, buf)
	WRITE_int8(data.Oltimespan, buf)
	WRITE_int8(data.Onlyacceptfriendpm, buf)
	WRITE_string(data.Pmreportuser, buf)
	WRITE_int8(data.At_anyone, buf)
	WRITE_int8(data.Chatpmrefreshtime, buf)
	WRITE_int16(data.Collectionteamworkernum, buf)
	WRITE_int8(data.Closeforumorderby, buf)
	WRITE_int8(data.Disableipnotice, buf)
	WRITE_int8(data.Darkroom, buf)
	WRITE_string(data.Globalsightml, buf)
}

func READ_MSG_Admin_setting_functions_other(buf *libraries.MsgBuffer) (data *MSG_Admin_setting_functions_other) {
	data = Pool_MSG_Admin_setting_functions_other.Get().(*MSG_Admin_setting_functions_other)
	data.Uidlogin = READ_int8(buf)
	data.Autoidselect = READ_int8(buf)
	data.Oltimespan = READ_int8(buf)
	data.Onlyacceptfriendpm = READ_int8(buf)
	data.Pmreportuser = READ_string(buf)
	data.At_anyone = READ_int8(buf)
	data.Chatpmrefreshtime = READ_int8(buf)
	data.Collectionteamworkernum = READ_int16(buf)
	data.Closeforumorderby = READ_int8(buf)
	data.Disableipnotice = READ_int8(buf)
	data.Darkroom = READ_int8(buf)
	data.Globalsightml = READ_string(buf)
	return
}

type MSG_U2WS_Admin_menu_forums_index struct {
}

var Pool_MSG_U2WS_Admin_menu_forums_index = sync.Pool{New: func() interface{} { return &MSG_U2WS_Admin_menu_forums_index{} }}

func (data *MSG_U2WS_Admin_menu_forums_index) Put() {
	Pool_MSG_U2WS_Admin_menu_forums_index.Put(data)
}
func (data *MSG_U2WS_Admin_menu_forums_index) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_U2WS_Admin_menu_forums_index)
	WRITE_int32(cmd, buf)
	WRITE_MSG_U2WS_Admin_menu_forums_index(data, buf)
}

func WRITE_MSG_U2WS_Admin_menu_forums_index(data *MSG_U2WS_Admin_menu_forums_index, buf *libraries.MsgBuffer) {
}

func READ_MSG_U2WS_Admin_menu_forums_index(buf *libraries.MsgBuffer) (data *MSG_U2WS_Admin_menu_forums_index) {
	data = Pool_MSG_U2WS_Admin_menu_forums_index.Get().(*MSG_U2WS_Admin_menu_forums_index)
	return
}

type MSG_WS2U_Admin_menu_forums_index struct {
	Catlist []*MSG_admin_forum_cart
}

var Pool_MSG_WS2U_Admin_menu_forums_index = sync.Pool{New: func() interface{} { return &MSG_WS2U_Admin_menu_forums_index{} }}

func (data *MSG_WS2U_Admin_menu_forums_index) Put() {
	for _,v := range data.Catlist {
		Pool_MSG_admin_forum_cart.Put(v)
	}
	Pool_MSG_WS2U_Admin_menu_forums_index.Put(data)
}
func (data *MSG_WS2U_Admin_menu_forums_index) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_WS2U_Admin_menu_forums_index)
	WRITE_int32(cmd, buf)
	WRITE_MSG_WS2U_Admin_menu_forums_index(data, buf)
}

func WRITE_MSG_WS2U_Admin_menu_forums_index(data *MSG_WS2U_Admin_menu_forums_index, buf *libraries.MsgBuffer) {
	WRITE_int16(int16(len(data.Catlist)), buf)
	for _, v := range data.Catlist{
		WRITE_MSG_admin_forum_cart(v, buf)
	}
}

func READ_MSG_WS2U_Admin_menu_forums_index(buf *libraries.MsgBuffer) (data *MSG_WS2U_Admin_menu_forums_index) {
	data = Pool_MSG_WS2U_Admin_menu_forums_index.Get().(*MSG_WS2U_Admin_menu_forums_index)
	Catlist_len := int(READ_int16(buf))
	data.Catlist = make([]*MSG_admin_forum_cart, Catlist_len)
	for i := 0; i < Catlist_len; i++ {
		data.Catlist[i] = READ_MSG_admin_forum_cart(buf)
	}
	return
}

type MSG_admin_forum_cart struct {
	Fid int32
	Name string
	Moderators string
	Displayorder int16
	Status int8
	Forums []*MSG_admin_forum
}

var Pool_MSG_admin_forum_cart = sync.Pool{New: func() interface{} { return &MSG_admin_forum_cart{} }}

func (data *MSG_admin_forum_cart) Put() {
	for _,v := range data.Forums {
		Pool_MSG_admin_forum.Put(v)
	}
	Pool_MSG_admin_forum_cart.Put(data)
}
func (data *MSG_admin_forum_cart) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_admin_forum_cart)
	WRITE_int32(cmd, buf)
	WRITE_MSG_admin_forum_cart(data, buf)
}

func WRITE_MSG_admin_forum_cart(data *MSG_admin_forum_cart, buf *libraries.MsgBuffer) {
	WRITE_int32(data.Fid, buf)
	WRITE_string(data.Name, buf)
	WRITE_string(data.Moderators, buf)
	WRITE_int16(data.Displayorder, buf)
	WRITE_int8(data.Status, buf)
	WRITE_int16(int16(len(data.Forums)), buf)
	for _, v := range data.Forums{
		WRITE_MSG_admin_forum(v, buf)
	}
}

func READ_MSG_admin_forum_cart(buf *libraries.MsgBuffer) (data *MSG_admin_forum_cart) {
	data = Pool_MSG_admin_forum_cart.Get().(*MSG_admin_forum_cart)
	data.Fid = READ_int32(buf)
	data.Name = READ_string(buf)
	data.Moderators = READ_string(buf)
	data.Displayorder = READ_int16(buf)
	data.Status = READ_int8(buf)
	Forums_len := int(READ_int16(buf))
	data.Forums = make([]*MSG_admin_forum, Forums_len)
	for i := 0; i < Forums_len; i++ {
		data.Forums[i] = READ_MSG_admin_forum(buf)
	}
	return
}

type MSG_admin_forum struct {
	Fid int32
	Moderators string
	Name string
	Displayorder int16
	Status int8
	Level_three []*MSG_admin_forum_three
}

var Pool_MSG_admin_forum = sync.Pool{New: func() interface{} { return &MSG_admin_forum{} }}

func (data *MSG_admin_forum) Put() {
	for _,v := range data.Level_three {
		Pool_MSG_admin_forum_three.Put(v)
	}
	Pool_MSG_admin_forum.Put(data)
}
func (data *MSG_admin_forum) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_admin_forum)
	WRITE_int32(cmd, buf)
	WRITE_MSG_admin_forum(data, buf)
}

func WRITE_MSG_admin_forum(data *MSG_admin_forum, buf *libraries.MsgBuffer) {
	WRITE_int32(data.Fid, buf)
	WRITE_string(data.Moderators, buf)
	WRITE_string(data.Name, buf)
	WRITE_int16(data.Displayorder, buf)
	WRITE_int8(data.Status, buf)
	WRITE_int16(int16(len(data.Level_three)), buf)
	for _, v := range data.Level_three{
		WRITE_MSG_admin_forum_three(v, buf)
	}
}

func READ_MSG_admin_forum(buf *libraries.MsgBuffer) (data *MSG_admin_forum) {
	data = Pool_MSG_admin_forum.Get().(*MSG_admin_forum)
	data.Fid = READ_int32(buf)
	data.Moderators = READ_string(buf)
	data.Name = READ_string(buf)
	data.Displayorder = READ_int16(buf)
	data.Status = READ_int8(buf)
	Level_three_len := int(READ_int16(buf))
	data.Level_three = make([]*MSG_admin_forum_three, Level_three_len)
	for i := 0; i < Level_three_len; i++ {
		data.Level_three[i] = READ_MSG_admin_forum_three(buf)
	}
	return
}

type MSG_admin_forum_three struct {
	Fid int32
	Moderators string
	Name string
	Displayorder int16
	Status int8
}

var Pool_MSG_admin_forum_three = sync.Pool{New: func() interface{} { return &MSG_admin_forum_three{} }}

func (data *MSG_admin_forum_three) Put() {
	Pool_MSG_admin_forum_three.Put(data)
}
func (data *MSG_admin_forum_three) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_admin_forum_three)
	WRITE_int32(cmd, buf)
	WRITE_MSG_admin_forum_three(data, buf)
}

func WRITE_MSG_admin_forum_three(data *MSG_admin_forum_three, buf *libraries.MsgBuffer) {
	WRITE_int32(data.Fid, buf)
	WRITE_string(data.Moderators, buf)
	WRITE_string(data.Name, buf)
	WRITE_int16(data.Displayorder, buf)
	WRITE_int8(data.Status, buf)
}

func READ_MSG_admin_forum_three(buf *libraries.MsgBuffer) (data *MSG_admin_forum_three) {
	data = Pool_MSG_admin_forum_three.Get().(*MSG_admin_forum_three)
	data.Fid = READ_int32(buf)
	data.Moderators = READ_string(buf)
	data.Name = READ_string(buf)
	data.Displayorder = READ_int16(buf)
	data.Status = READ_int8(buf)
	return
}

type MSG_U2WS_Admin_edit_forums_index struct {
	Forums []*MSG_admin_forum_three
	NewForums []*MSG_admin_forum_three
}

var Pool_MSG_U2WS_Admin_edit_forums_index = sync.Pool{New: func() interface{} { return &MSG_U2WS_Admin_edit_forums_index{} }}

func (data *MSG_U2WS_Admin_edit_forums_index) Put() {
	for _,v := range data.Forums {
		Pool_MSG_admin_forum_three.Put(v)
	}
	for _,v := range data.NewForums {
		Pool_MSG_admin_forum_three.Put(v)
	}
	Pool_MSG_U2WS_Admin_edit_forums_index.Put(data)
}
func (data *MSG_U2WS_Admin_edit_forums_index) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_U2WS_Admin_edit_forums_index)
	WRITE_int32(cmd, buf)
	WRITE_MSG_U2WS_Admin_edit_forums_index(data, buf)
}

func WRITE_MSG_U2WS_Admin_edit_forums_index(data *MSG_U2WS_Admin_edit_forums_index, buf *libraries.MsgBuffer) {
	WRITE_int16(int16(len(data.Forums)), buf)
	for _, v := range data.Forums{
		WRITE_MSG_admin_forum_three(v, buf)
	}
	WRITE_int16(int16(len(data.NewForums)), buf)
	for _, v := range data.NewForums{
		WRITE_MSG_admin_forum_three(v, buf)
	}
}

func READ_MSG_U2WS_Admin_edit_forums_index(buf *libraries.MsgBuffer) (data *MSG_U2WS_Admin_edit_forums_index) {
	data = Pool_MSG_U2WS_Admin_edit_forums_index.Get().(*MSG_U2WS_Admin_edit_forums_index)
	Forums_len := int(READ_int16(buf))
	data.Forums = make([]*MSG_admin_forum_three, Forums_len)
	for i := 0; i < Forums_len; i++ {
		data.Forums[i] = READ_MSG_admin_forum_three(buf)
	}
	NewForums_len := int(READ_int16(buf))
	data.NewForums = make([]*MSG_admin_forum_three, NewForums_len)
	for i := 0; i < NewForums_len; i++ {
		data.NewForums[i] = READ_MSG_admin_forum_three(buf)
	}
	return
}

type MSG_U2WS_Admin_delete_forum struct {
	Fid int32
}

var Pool_MSG_U2WS_Admin_delete_forum = sync.Pool{New: func() interface{} { return &MSG_U2WS_Admin_delete_forum{} }}

func (data *MSG_U2WS_Admin_delete_forum) Put() {
	Pool_MSG_U2WS_Admin_delete_forum.Put(data)
}
func (data *MSG_U2WS_Admin_delete_forum) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_U2WS_Admin_delete_forum)
	WRITE_int32(cmd, buf)
	WRITE_MSG_U2WS_Admin_delete_forum(data, buf)
}

func WRITE_MSG_U2WS_Admin_delete_forum(data *MSG_U2WS_Admin_delete_forum, buf *libraries.MsgBuffer) {
	WRITE_int32(data.Fid, buf)
}

func READ_MSG_U2WS_Admin_delete_forum(buf *libraries.MsgBuffer) (data *MSG_U2WS_Admin_delete_forum) {
	data = Pool_MSG_U2WS_Admin_delete_forum.Get().(*MSG_U2WS_Admin_delete_forum)
	data.Fid = READ_int32(buf)
	return
}

type MSG_U2WS_Admin_menu_forums_edit struct {
	Fid int32
}

var Pool_MSG_U2WS_Admin_menu_forums_edit = sync.Pool{New: func() interface{} { return &MSG_U2WS_Admin_menu_forums_edit{} }}

func (data *MSG_U2WS_Admin_menu_forums_edit) Put() {
	Pool_MSG_U2WS_Admin_menu_forums_edit.Put(data)
}
func (data *MSG_U2WS_Admin_menu_forums_edit) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_U2WS_Admin_menu_forums_edit)
	WRITE_int32(cmd, buf)
	WRITE_MSG_U2WS_Admin_menu_forums_edit(data, buf)
}

func WRITE_MSG_U2WS_Admin_menu_forums_edit(data *MSG_U2WS_Admin_menu_forums_edit, buf *libraries.MsgBuffer) {
	WRITE_int32(data.Fid, buf)
}

func READ_MSG_U2WS_Admin_menu_forums_edit(buf *libraries.MsgBuffer) (data *MSG_U2WS_Admin_menu_forums_edit) {
	data = Pool_MSG_U2WS_Admin_menu_forums_edit.Get().(*MSG_U2WS_Admin_menu_forums_edit)
	data.Fid = READ_int32(buf)
	return
}

type MSG_WS2U_Admin_menu_forums_edit struct {
	Fid int32
	Type int8
	Base *MSG_admin_forum_edit_base
	Ext *MSG_admin_forum_edit_ext
	Modrecommendnew *MSG_admin_forum_modrecommen
	Threadsortsnew *MSG_admin_forum_threadsorts
	Threadtypesnew *MSG_admin_forum_threadtypes
}

var Pool_MSG_WS2U_Admin_menu_forums_edit = sync.Pool{New: func() interface{} { return &MSG_WS2U_Admin_menu_forums_edit{} }}

func (data *MSG_WS2U_Admin_menu_forums_edit) Put() {
	if data.Base != nil {
		Pool_MSG_admin_forum_edit_base.Put(data.Base)
		data.Base = nil
	}
	if data.Ext != nil {
		Pool_MSG_admin_forum_edit_ext.Put(data.Ext)
		data.Ext = nil
	}
	if data.Modrecommendnew != nil {
		Pool_MSG_admin_forum_modrecommen.Put(data.Modrecommendnew)
		data.Modrecommendnew = nil
	}
	if data.Threadsortsnew != nil {
		Pool_MSG_admin_forum_threadsorts.Put(data.Threadsortsnew)
		data.Threadsortsnew = nil
	}
	if data.Threadtypesnew != nil {
		Pool_MSG_admin_forum_threadtypes.Put(data.Threadtypesnew)
		data.Threadtypesnew = nil
	}
	Pool_MSG_WS2U_Admin_menu_forums_edit.Put(data)
}
func (data *MSG_WS2U_Admin_menu_forums_edit) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_WS2U_Admin_menu_forums_edit)
	WRITE_int32(cmd, buf)
	WRITE_MSG_WS2U_Admin_menu_forums_edit(data, buf)
}

func WRITE_MSG_WS2U_Admin_menu_forums_edit(data *MSG_WS2U_Admin_menu_forums_edit, buf *libraries.MsgBuffer) {
	WRITE_int32(data.Fid, buf)
	WRITE_int8(data.Type, buf)
	if data.Base == nil {
		WRITE_int8(0, buf)
	} else {
		WRITE_int8(1, buf)
		WRITE_MSG_admin_forum_edit_base(data.Base, buf)
	}
	if data.Ext == nil {
		WRITE_int8(0, buf)
	} else {
		WRITE_int8(1, buf)
		WRITE_MSG_admin_forum_edit_ext(data.Ext, buf)
	}
	if data.Modrecommendnew == nil {
		WRITE_int8(0, buf)
	} else {
		WRITE_int8(1, buf)
		WRITE_MSG_admin_forum_modrecommen(data.Modrecommendnew, buf)
	}
	if data.Threadsortsnew == nil {
		WRITE_int8(0, buf)
	} else {
		WRITE_int8(1, buf)
		WRITE_MSG_admin_forum_threadsorts(data.Threadsortsnew, buf)
	}
	if data.Threadtypesnew == nil {
		WRITE_int8(0, buf)
	} else {
		WRITE_int8(1, buf)
		WRITE_MSG_admin_forum_threadtypes(data.Threadtypesnew, buf)
	}
}

func READ_MSG_WS2U_Admin_menu_forums_edit(buf *libraries.MsgBuffer) (data *MSG_WS2U_Admin_menu_forums_edit) {
	data = Pool_MSG_WS2U_Admin_menu_forums_edit.Get().(*MSG_WS2U_Admin_menu_forums_edit)
	data.Fid = READ_int32(buf)
	data.Type = READ_int8(buf)
	Base_len := int(READ_int8(buf))
	if Base_len == 1 {
		data.Base = READ_MSG_admin_forum_edit_base(buf)
	}else{
		data.Base = nil
	}
	Ext_len := int(READ_int8(buf))
	if Ext_len == 1 {
		data.Ext = READ_MSG_admin_forum_edit_ext(buf)
	}else{
		data.Ext = nil
	}
	Modrecommendnew_len := int(READ_int8(buf))
	if Modrecommendnew_len == 1 {
		data.Modrecommendnew = READ_MSG_admin_forum_modrecommen(buf)
	}else{
		data.Modrecommendnew = nil
	}
	Threadsortsnew_len := int(READ_int8(buf))
	if Threadsortsnew_len == 1 {
		data.Threadsortsnew = READ_MSG_admin_forum_threadsorts(buf)
	}else{
		data.Threadsortsnew = nil
	}
	Threadtypesnew_len := int(READ_int8(buf))
	if Threadtypesnew_len == 1 {
		data.Threadtypesnew = READ_MSG_admin_forum_threadtypes(buf)
	}else{
		data.Threadtypesnew = nil
	}
	return
}

type MSG_admin_forum_edit_base struct {
	Fid int32
	Name string
	Extranew *MSG_admin_forum_extra
	Catlist []*MSG_admin_forum_cart
	Fup int32
	Forumcolumns int8
	Catforumcolumns int8
	Icon string
	File []byte
	Status int8
	Shownav int8
	Description string
	Rules string
	Recommend int8
}

var Pool_MSG_admin_forum_edit_base = sync.Pool{New: func() interface{} { return &MSG_admin_forum_edit_base{} }}

func (data *MSG_admin_forum_edit_base) Put() {
	if data.Extranew != nil {
		Pool_MSG_admin_forum_extra.Put(data.Extranew)
		data.Extranew = nil
	}
	for _,v := range data.Catlist {
		Pool_MSG_admin_forum_cart.Put(v)
	}
	Pool_MSG_admin_forum_edit_base.Put(data)
}
func (data *MSG_admin_forum_edit_base) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_admin_forum_edit_base)
	WRITE_int32(cmd, buf)
	WRITE_MSG_admin_forum_edit_base(data, buf)
}

func WRITE_MSG_admin_forum_edit_base(data *MSG_admin_forum_edit_base, buf *libraries.MsgBuffer) {
	WRITE_int32(data.Fid, buf)
	WRITE_string(data.Name, buf)
	if data.Extranew == nil {
		WRITE_int8(0, buf)
	} else {
		WRITE_int8(1, buf)
		WRITE_MSG_admin_forum_extra(data.Extranew, buf)
	}
	WRITE_int16(int16(len(data.Catlist)), buf)
	for _, v := range data.Catlist{
		WRITE_MSG_admin_forum_cart(v, buf)
	}
	WRITE_int32(data.Fup, buf)
	WRITE_int8(data.Forumcolumns, buf)
	WRITE_int8(data.Catforumcolumns, buf)
	WRITE_string(data.Icon, buf)
	WRITE_int32(int32(len(data.File)), buf)
	buf.Write(data.File)
	WRITE_int8(data.Status, buf)
	WRITE_int8(data.Shownav, buf)
	WRITE_string(data.Description, buf)
	WRITE_string(data.Rules, buf)
	WRITE_int8(data.Recommend, buf)
}

func READ_MSG_admin_forum_edit_base(buf *libraries.MsgBuffer) (data *MSG_admin_forum_edit_base) {
	data = Pool_MSG_admin_forum_edit_base.Get().(*MSG_admin_forum_edit_base)
	data.Fid = READ_int32(buf)
	data.Name = READ_string(buf)
	Extranew_len := int(READ_int8(buf))
	if Extranew_len == 1 {
		data.Extranew = READ_MSG_admin_forum_extra(buf)
	}else{
		data.Extranew = nil
	}
	Catlist_len := int(READ_int16(buf))
	data.Catlist = make([]*MSG_admin_forum_cart, Catlist_len)
	for i := 0; i < Catlist_len; i++ {
		data.Catlist[i] = READ_MSG_admin_forum_cart(buf)
	}
	data.Fup = READ_int32(buf)
	data.Forumcolumns = READ_int8(buf)
	data.Catforumcolumns = READ_int8(buf)
	data.Icon = READ_string(buf)
	File_len := int(READ_int32(buf))
	data.File = make([]byte, File_len)
	copy(data.File,buf.Next(File_len))
	data.Status = READ_int8(buf)
	data.Shownav = READ_int8(buf)
	data.Description = READ_string(buf)
	data.Rules = READ_string(buf)
	data.Recommend = READ_int8(buf)
	return
}

type MSG_admin_forum_extra struct {
	Iconwidth int16
	Namecolor string
}

var Pool_MSG_admin_forum_extra = sync.Pool{New: func() interface{} { return &MSG_admin_forum_extra{} }}

func (data *MSG_admin_forum_extra) Put() {
	Pool_MSG_admin_forum_extra.Put(data)
}
func (data *MSG_admin_forum_extra) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_admin_forum_extra)
	WRITE_int32(cmd, buf)
	WRITE_MSG_admin_forum_extra(data, buf)
}

func WRITE_MSG_admin_forum_extra(data *MSG_admin_forum_extra, buf *libraries.MsgBuffer) {
	WRITE_int16(data.Iconwidth, buf)
	WRITE_string(data.Namecolor, buf)
}

func READ_MSG_admin_forum_extra(buf *libraries.MsgBuffer) (data *MSG_admin_forum_extra) {
	data = Pool_MSG_admin_forum_extra.Get().(*MSG_admin_forum_extra)
	data.Iconwidth = READ_int16(buf)
	data.Namecolor = READ_string(buf)
	return
}

type MSG_admin_forum_modrecommen struct {
	Open string
	Sort string
	Orderby string
	Num string
	Imagenum string
	Imagewidth string
	Imageheight string
	Maxlength string
	Cachelife string
	Dateline string
}

var Pool_MSG_admin_forum_modrecommen = sync.Pool{New: func() interface{} { return &MSG_admin_forum_modrecommen{} }}

func (data *MSG_admin_forum_modrecommen) Put() {
	Pool_MSG_admin_forum_modrecommen.Put(data)
}
func (data *MSG_admin_forum_modrecommen) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_admin_forum_modrecommen)
	WRITE_int32(cmd, buf)
	WRITE_MSG_admin_forum_modrecommen(data, buf)
}

func WRITE_MSG_admin_forum_modrecommen(data *MSG_admin_forum_modrecommen, buf *libraries.MsgBuffer) {
	WRITE_string(data.Open, buf)
	WRITE_string(data.Sort, buf)
	WRITE_string(data.Orderby, buf)
	WRITE_string(data.Num, buf)
	WRITE_string(data.Imagenum, buf)
	WRITE_string(data.Imagewidth, buf)
	WRITE_string(data.Imageheight, buf)
	WRITE_string(data.Maxlength, buf)
	WRITE_string(data.Cachelife, buf)
	WRITE_string(data.Dateline, buf)
}

func READ_MSG_admin_forum_modrecommen(buf *libraries.MsgBuffer) (data *MSG_admin_forum_modrecommen) {
	data = Pool_MSG_admin_forum_modrecommen.Get().(*MSG_admin_forum_modrecommen)
	data.Open = READ_string(buf)
	data.Sort = READ_string(buf)
	data.Orderby = READ_string(buf)
	data.Num = READ_string(buf)
	data.Imagenum = READ_string(buf)
	data.Imagewidth = READ_string(buf)
	data.Imageheight = READ_string(buf)
	data.Maxlength = READ_string(buf)
	data.Cachelife = READ_string(buf)
	data.Dateline = READ_string(buf)
	return
}

type MSG_admin_forum_threadsorts struct {
	Status int8
	Required string
	Prefix string
	Default string
}

var Pool_MSG_admin_forum_threadsorts = sync.Pool{New: func() interface{} { return &MSG_admin_forum_threadsorts{} }}

func (data *MSG_admin_forum_threadsorts) Put() {
	Pool_MSG_admin_forum_threadsorts.Put(data)
}
func (data *MSG_admin_forum_threadsorts) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_admin_forum_threadsorts)
	WRITE_int32(cmd, buf)
	WRITE_MSG_admin_forum_threadsorts(data, buf)
}

func WRITE_MSG_admin_forum_threadsorts(data *MSG_admin_forum_threadsorts, buf *libraries.MsgBuffer) {
	WRITE_int8(data.Status, buf)
	WRITE_string(data.Required, buf)
	WRITE_string(data.Prefix, buf)
	WRITE_string(data.Default, buf)
}

func READ_MSG_admin_forum_threadsorts(buf *libraries.MsgBuffer) (data *MSG_admin_forum_threadsorts) {
	data = Pool_MSG_admin_forum_threadsorts.Get().(*MSG_admin_forum_threadsorts)
	data.Status = READ_int8(buf)
	data.Required = READ_string(buf)
	data.Prefix = READ_string(buf)
	data.Default = READ_string(buf)
	return
}

type MSG_admin_forum_threadtypes struct {
	Fid int32
	Status int8
	Required int8
	Listable int8
	Prefix int8
	Types []*MSG_admin_forum_type
	Add []*MSG_admin_forum_type
	Deletes []int16
}

var Pool_MSG_admin_forum_threadtypes = sync.Pool{New: func() interface{} { return &MSG_admin_forum_threadtypes{} }}

func (data *MSG_admin_forum_threadtypes) Put() {
	for _,v := range data.Types {
		Pool_MSG_admin_forum_type.Put(v)
	}
	for _,v := range data.Add {
		Pool_MSG_admin_forum_type.Put(v)
	}
	Pool_MSG_admin_forum_threadtypes.Put(data)
}
func (data *MSG_admin_forum_threadtypes) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_admin_forum_threadtypes)
	WRITE_int32(cmd, buf)
	WRITE_MSG_admin_forum_threadtypes(data, buf)
}

func WRITE_MSG_admin_forum_threadtypes(data *MSG_admin_forum_threadtypes, buf *libraries.MsgBuffer) {
	WRITE_int32(data.Fid, buf)
	WRITE_int8(data.Status, buf)
	WRITE_int8(data.Required, buf)
	WRITE_int8(data.Listable, buf)
	WRITE_int8(data.Prefix, buf)
	WRITE_int16(int16(len(data.Types)), buf)
	for _, v := range data.Types{
		WRITE_MSG_admin_forum_type(v, buf)
	}
	WRITE_int16(int16(len(data.Add)), buf)
	for _, v := range data.Add{
		WRITE_MSG_admin_forum_type(v, buf)
	}
	WRITE_int16(int16(len(data.Deletes)), buf)
	for _, v := range data.Deletes{
		WRITE_int16(v, buf)
	}
}

func READ_MSG_admin_forum_threadtypes(buf *libraries.MsgBuffer) (data *MSG_admin_forum_threadtypes) {
	data = Pool_MSG_admin_forum_threadtypes.Get().(*MSG_admin_forum_threadtypes)
	data.Fid = READ_int32(buf)
	data.Status = READ_int8(buf)
	data.Required = READ_int8(buf)
	data.Listable = READ_int8(buf)
	data.Prefix = READ_int8(buf)
	Types_len := int(READ_int16(buf))
	data.Types = make([]*MSG_admin_forum_type, Types_len)
	for i := 0; i < Types_len; i++ {
		data.Types[i] = READ_MSG_admin_forum_type(buf)
	}
	Add_len := int(READ_int16(buf))
	data.Add = make([]*MSG_admin_forum_type, Add_len)
	for i := 0; i < Add_len; i++ {
		data.Add[i] = READ_MSG_admin_forum_type(buf)
	}
	Deletes_len := int(READ_int16(buf))
	data.Deletes = make([]int16, Deletes_len)
	for i := 0; i < Deletes_len; i++ {
		data.Deletes[i] = READ_int16(buf)
	}
	return
}

type MSG_admin_forum_type struct {
	Id int16
	Displayorder int16
	Name string
	Icon string
	Enable int8
	Moderators int8
}

var Pool_MSG_admin_forum_type = sync.Pool{New: func() interface{} { return &MSG_admin_forum_type{} }}

func (data *MSG_admin_forum_type) Put() {
	Pool_MSG_admin_forum_type.Put(data)
}
func (data *MSG_admin_forum_type) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_admin_forum_type)
	WRITE_int32(cmd, buf)
	WRITE_MSG_admin_forum_type(data, buf)
}

func WRITE_MSG_admin_forum_type(data *MSG_admin_forum_type, buf *libraries.MsgBuffer) {
	WRITE_int16(data.Id, buf)
	WRITE_int16(data.Displayorder, buf)
	WRITE_string(data.Name, buf)
	WRITE_string(data.Icon, buf)
	WRITE_int8(data.Enable, buf)
	WRITE_int8(data.Moderators, buf)
}

func READ_MSG_admin_forum_type(buf *libraries.MsgBuffer) (data *MSG_admin_forum_type) {
	data = Pool_MSG_admin_forum_type.Get().(*MSG_admin_forum_type)
	data.Id = READ_int16(buf)
	data.Displayorder = READ_int16(buf)
	data.Name = READ_string(buf)
	data.Icon = READ_string(buf)
	data.Enable = READ_int8(buf)
	data.Moderators = READ_int8(buf)
	return
}

type MSG_admin_forum_edit_ext struct {
	Forumcolumns int8
}

var Pool_MSG_admin_forum_edit_ext = sync.Pool{New: func() interface{} { return &MSG_admin_forum_edit_ext{} }}

func (data *MSG_admin_forum_edit_ext) Put() {
	Pool_MSG_admin_forum_edit_ext.Put(data)
}
func (data *MSG_admin_forum_edit_ext) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_admin_forum_edit_ext)
	WRITE_int32(cmd, buf)
	WRITE_MSG_admin_forum_edit_ext(data, buf)
}

func WRITE_MSG_admin_forum_edit_ext(data *MSG_admin_forum_edit_ext, buf *libraries.MsgBuffer) {
	WRITE_int8(data.Forumcolumns, buf)
}

func READ_MSG_admin_forum_edit_ext(buf *libraries.MsgBuffer) (data *MSG_admin_forum_edit_ext) {
	data = Pool_MSG_admin_forum_edit_ext.Get().(*MSG_admin_forum_edit_ext)
	data.Forumcolumns = READ_int8(buf)
	return
}

type MSG_U2WS_Admin_menu_forums_moderators struct {
	Fid int32
}

var Pool_MSG_U2WS_Admin_menu_forums_moderators = sync.Pool{New: func() interface{} { return &MSG_U2WS_Admin_menu_forums_moderators{} }}

func (data *MSG_U2WS_Admin_menu_forums_moderators) Put() {
	Pool_MSG_U2WS_Admin_menu_forums_moderators.Put(data)
}
func (data *MSG_U2WS_Admin_menu_forums_moderators) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_U2WS_Admin_menu_forums_moderators)
	WRITE_int32(cmd, buf)
	WRITE_MSG_U2WS_Admin_menu_forums_moderators(data, buf)
}

func WRITE_MSG_U2WS_Admin_menu_forums_moderators(data *MSG_U2WS_Admin_menu_forums_moderators, buf *libraries.MsgBuffer) {
	WRITE_int32(data.Fid, buf)
}

func READ_MSG_U2WS_Admin_menu_forums_moderators(buf *libraries.MsgBuffer) (data *MSG_U2WS_Admin_menu_forums_moderators) {
	data = Pool_MSG_U2WS_Admin_menu_forums_moderators.Get().(*MSG_U2WS_Admin_menu_forums_moderators)
	data.Fid = READ_int32(buf)
	return
}

type MSG_WS2U_Admin_menu_forums_moderators struct {
	Fid int32
	Name string
	Moderators []*MSG_admin_forums_moderator
	Groups []*MSG_admin_forums_group
}

var Pool_MSG_WS2U_Admin_menu_forums_moderators = sync.Pool{New: func() interface{} { return &MSG_WS2U_Admin_menu_forums_moderators{} }}

func (data *MSG_WS2U_Admin_menu_forums_moderators) Put() {
	for _,v := range data.Moderators {
		Pool_MSG_admin_forums_moderator.Put(v)
	}
	for _,v := range data.Groups {
		Pool_MSG_admin_forums_group.Put(v)
	}
	Pool_MSG_WS2U_Admin_menu_forums_moderators.Put(data)
}
func (data *MSG_WS2U_Admin_menu_forums_moderators) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_WS2U_Admin_menu_forums_moderators)
	WRITE_int32(cmd, buf)
	WRITE_MSG_WS2U_Admin_menu_forums_moderators(data, buf)
}

func WRITE_MSG_WS2U_Admin_menu_forums_moderators(data *MSG_WS2U_Admin_menu_forums_moderators, buf *libraries.MsgBuffer) {
	WRITE_int32(data.Fid, buf)
	WRITE_string(data.Name, buf)
	WRITE_int16(int16(len(data.Moderators)), buf)
	for _, v := range data.Moderators{
		WRITE_MSG_admin_forums_moderator(v, buf)
	}
	WRITE_int16(int16(len(data.Groups)), buf)
	for _, v := range data.Groups{
		WRITE_MSG_admin_forums_group(v, buf)
	}
}

func READ_MSG_WS2U_Admin_menu_forums_moderators(buf *libraries.MsgBuffer) (data *MSG_WS2U_Admin_menu_forums_moderators) {
	data = Pool_MSG_WS2U_Admin_menu_forums_moderators.Get().(*MSG_WS2U_Admin_menu_forums_moderators)
	data.Fid = READ_int32(buf)
	data.Name = READ_string(buf)
	Moderators_len := int(READ_int16(buf))
	data.Moderators = make([]*MSG_admin_forums_moderator, Moderators_len)
	for i := 0; i < Moderators_len; i++ {
		data.Moderators[i] = READ_MSG_admin_forums_moderator(buf)
	}
	Groups_len := int(READ_int16(buf))
	data.Groups = make([]*MSG_admin_forums_group, Groups_len)
	for i := 0; i < Groups_len; i++ {
		data.Groups[i] = READ_MSG_admin_forums_group(buf)
	}
	return
}

type MSG_admin_forums_moderator struct {
	Uid int32
	Displayorder int16
	Name string
	Groupid int16
}

var Pool_MSG_admin_forums_moderator = sync.Pool{New: func() interface{} { return &MSG_admin_forums_moderator{} }}

func (data *MSG_admin_forums_moderator) Put() {
	Pool_MSG_admin_forums_moderator.Put(data)
}
func (data *MSG_admin_forums_moderator) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_admin_forums_moderator)
	WRITE_int32(cmd, buf)
	WRITE_MSG_admin_forums_moderator(data, buf)
}

func WRITE_MSG_admin_forums_moderator(data *MSG_admin_forums_moderator, buf *libraries.MsgBuffer) {
	WRITE_int32(data.Uid, buf)
	WRITE_int16(data.Displayorder, buf)
	WRITE_string(data.Name, buf)
	WRITE_int16(data.Groupid, buf)
}

func READ_MSG_admin_forums_moderator(buf *libraries.MsgBuffer) (data *MSG_admin_forums_moderator) {
	data = Pool_MSG_admin_forums_moderator.Get().(*MSG_admin_forums_moderator)
	data.Uid = READ_int32(buf)
	data.Displayorder = READ_int16(buf)
	data.Name = READ_string(buf)
	data.Groupid = READ_int16(buf)
	return
}

type MSG_admin_forums_group struct {
	Groupid int16
	Groupname string
}

var Pool_MSG_admin_forums_group = sync.Pool{New: func() interface{} { return &MSG_admin_forums_group{} }}

func (data *MSG_admin_forums_group) Put() {
	Pool_MSG_admin_forums_group.Put(data)
}
func (data *MSG_admin_forums_group) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_admin_forums_group)
	WRITE_int32(cmd, buf)
	WRITE_MSG_admin_forums_group(data, buf)
}

func WRITE_MSG_admin_forums_group(data *MSG_admin_forums_group, buf *libraries.MsgBuffer) {
	WRITE_int16(data.Groupid, buf)
	WRITE_string(data.Groupname, buf)
}

func READ_MSG_admin_forums_group(buf *libraries.MsgBuffer) (data *MSG_admin_forums_group) {
	data = Pool_MSG_admin_forums_group.Get().(*MSG_admin_forums_group)
	data.Groupid = READ_int16(buf)
	data.Groupname = READ_string(buf)
	return
}

type MSG_U2WS_Admin_Edit_forums_moderator struct {
	Fid int32
	Deletes []int32
	Edit []*MSG_admin_forums_moderator
	Add *MSG_admin_forums_moderator
}

var Pool_MSG_U2WS_Admin_Edit_forums_moderator = sync.Pool{New: func() interface{} { return &MSG_U2WS_Admin_Edit_forums_moderator{} }}

func (data *MSG_U2WS_Admin_Edit_forums_moderator) Put() {
	for _,v := range data.Edit {
		Pool_MSG_admin_forums_moderator.Put(v)
	}
	if data.Add != nil {
		Pool_MSG_admin_forums_moderator.Put(data.Add)
		data.Add = nil
	}
	Pool_MSG_U2WS_Admin_Edit_forums_moderator.Put(data)
}
func (data *MSG_U2WS_Admin_Edit_forums_moderator) WRITE(buf *libraries.MsgBuffer) {
	buf.Reset()
	cmd := int32(CMD_MSG_U2WS_Admin_Edit_forums_moderator)
	WRITE_int32(cmd, buf)
	WRITE_MSG_U2WS_Admin_Edit_forums_moderator(data, buf)
}

func WRITE_MSG_U2WS_Admin_Edit_forums_moderator(data *MSG_U2WS_Admin_Edit_forums_moderator, buf *libraries.MsgBuffer) {
	WRITE_int32(data.Fid, buf)
	WRITE_int16(int16(len(data.Deletes)), buf)
	for _, v := range data.Deletes{
		WRITE_int32(v, buf)
	}
	WRITE_int16(int16(len(data.Edit)), buf)
	for _, v := range data.Edit{
		WRITE_MSG_admin_forums_moderator(v, buf)
	}
	if data.Add == nil {
		WRITE_int8(0, buf)
	} else {
		WRITE_int8(1, buf)
		WRITE_MSG_admin_forums_moderator(data.Add, buf)
	}
}

func READ_MSG_U2WS_Admin_Edit_forums_moderator(buf *libraries.MsgBuffer) (data *MSG_U2WS_Admin_Edit_forums_moderator) {
	data = Pool_MSG_U2WS_Admin_Edit_forums_moderator.Get().(*MSG_U2WS_Admin_Edit_forums_moderator)
	data.Fid = READ_int32(buf)
	Deletes_len := int(READ_int16(buf))
	data.Deletes = make([]int32, Deletes_len)
	for i := 0; i < Deletes_len; i++ {
		data.Deletes[i] = READ_int32(buf)
	}
	Edit_len := int(READ_int16(buf))
	data.Edit = make([]*MSG_admin_forums_moderator, Edit_len)
	for i := 0; i < Edit_len; i++ {
		data.Edit[i] = READ_MSG_admin_forums_moderator(buf)
	}
	Add_len := int(READ_int8(buf))
	if Add_len == 1 {
		data.Add = READ_MSG_admin_forums_moderator(buf)
	}else{
		data.Add = nil
	}
	return
}

