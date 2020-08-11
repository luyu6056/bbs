package db

import (
	"bbs/db/mysql"
	"bbs/libraries"
	"bbs/protocol"
	"sync"
	"time"
)

var DB_init = &mysql.Db_init{
	Init: Init_register_db,
	Destroy: func() {
		chanfull <- true
	},
}

func Init_register_db(db *mysql.Mysql) {

	err := db.StoreEngine("Aria").AriaSetting(true, false, false, "PAGE").Sync2(
		new(Tmp),
		new(Common_admincp_cmenu),
		new(Common_admincp_group),
		new(Common_admincp_member),
		new(Common_admingroup),
		new(Common_banned),
		new(Common_block),
		new(Common_block_favorite),
		new(Common_block_item),
		new(Common_block_item_data),
		new(Common_block_permission),
		new(Common_block_pic),
		new(Common_block_style),
		new(Common_block_xml),
		new(Common_credit_log),
		new(Common_credit_log_field),
		new(Common_credit_rule),
		new(Common_credit_rule_log),
		new(Common_credit_rule_log_field),
		new(Common_nav),
		new(Common_diy_data),
		//new(Common_statuser),
		//new(Common_stat),
		new(Common_member),
		//new(Common_member_connect),
		new(Common_member_count),
		new(Common_member_field_forum),
		//new(Common_member_field_home),
		//new(Common_member_log),
		//new(Common_member_profile),
		//new(Common_member_profile_setting),
		new(Common_setting),
		new(Common_tag),
		new(Common_tagitem),
		new(Common_usergroup),
		new(Email_template),
		new(Forum_access),
		new(Forum_attachment),
		new(Forum_creditslog),
		new(Forum_forum),
		new(Forum_forumfield),
		//new(Forum_hotreply_number),
		new(Forum_groupuser),

		//new(Forum_moderator),
		new(Forum_poll),
		new(Forum_polloption),
		new(Forum_post),
		//new(Forum_poststick),
		new(Forum_ratelog),
		new(Forum_replycredit),
		new(Forum_thread),
		new(Forum_thread_moderate),
		new(Forum_threadrush),
		new(Forum_threadtype),
		new(Home_notification),
	)
	if err != nil {
		libraries.Log("%+v", err)
		panic("初始化失败")
	}
	err = db.StoreEngine("Aria").AriaSetting(false, false, false, "FIXED").Sync2(
		new(Forum_memberRecommend),
		new(Forum_thread_data),
		new(Common_member_qq),
	)
	if err != nil {
		libraries.Log("%+v", err)
		panic("初始化失败")
	}
	go UpdateDB()
	go DBTtimer()
}

type Tmp struct {
	Tid   int32 `db:"pk"`
	Done  bool
	Font  string
	Color string
	Title string
}

type Common_admincp_cmenu struct {
	Id    int16  `db:"not null;auto_increment;pk"`
	Title string `db:"not null;type:varchar(255)"`
	Url   string `db:"not null;type:varchar(255)"`
	Param string `db:"not null;type:varchar(255)"`
	//Sort         int32  `db:"not null;default(0)"`
	Displayorder int8  `db:"not null;index"`
	Clicks       int16 `db:"not null;default(1)"`
	Uid          int32 `db:"not null;index"`
	Dateline     int64 `db:"not null"`
}
type Common_admincp_group struct {
	Cpgroupid   int16  `db:"not null;auto_increment;pk"`
	Cpgroupname string `db:"not null;type:varchar(255)"`
	Perm        string `db:"not null;type:varchar(255);index"`
}
type Common_admincp_member struct {
	Uid        int32  `db:"not null;pk"`
	Cpgroupid  int32  `db:"not null"`
	Customperm string `db:"not null;type:text"`
}

type Common_admingroup struct {
	Admingid              int16 `db:"not null;default(0);pk"`
	Alloweditpost         bool  `db:"not null;default(0)"`
	Alloweditpoll         bool  `db:"not null;default(0)"`
	Allowstickthread      int8  `db:"not null;default(0)"`
	Allowmodpost          int32 `db:"not null;default(0)"`
	Allowdelpost          bool  `db:"not null;default(0)"`
	Allowmassprune        int32 `db:"not null;default(0)"`
	Allowrefund           int32 `db:"not null;default(0)"`
	Allowcensorword       int32 `db:"not null;default(0)"`
	Allowviewip           bool  `db:"not null;default(0)"`
	Allowbanip            int32 `db:"not null;default(0)"`
	Allowedituser         bool  `db:"not null;default(0)"`
	Allowmoduser          int32 `db:"not null;default(0)"`
	Allowbanuser          bool  `db:"not null;default(0)"`
	Allowbanvisituser     int32 `db:"not null;default(0)"`
	Allowpostannounce     int32 `db:"not null;default(0)"`
	Allowviewlog          int32 `db:"not null;default(0)"`
	Allowbanpost          bool  `db:"not null;default(0)"`
	Supe_allowpushthread  int32 `db:"not null;default(0)"`
	Allowhighlightthread  bool  `db:"not null;default(0)"`
	Allowlivethread       int32 `db:"not null;default(0)"`
	Allowdigestthread     int8  `db:"not null;default(0)"`
	Allowrecommendthread  bool  `db:"not null;default(0)"`
	Allowbumpthread       bool  `db:"not null;default(0)"`
	Allowclosethread      bool  `db:"not null;default(0)"`
	Allowmovethread       bool  `db:"not null;default(0)"`
	Allowedittypethread   bool  `db:"not null;default(0)"`
	Allowstampthread      bool  `db:"not null;default(0)"`
	Allowstamplist        bool  `db:"not null;default(0)"`
	Allowcopythread       bool  `db:"not null;default(0)"`
	Allowmergethread      bool  `db:"not null;default(0)"`
	Allowsplitthread      bool  `db:"not null;default(0)"`
	Allowrepairthread     bool  `db:"not null;default(0)"`
	Allowwarnpost         bool  `db:"not null;default(0)"`
	Allowviewreport       int32 `db:"not null;default(0)"`
	Alloweditforum        int32 `db:"not null;default(0)"`
	Allowremovereward     bool  `db:"not null;default(0)"`
	Allowedittrade        int32 `db:"not null;default(0)"`
	Alloweditactivity     int32 `db:"not null;default(0)"`
	Allowstickreply       bool  `db:"not null;default(0)"`
	Allowmanagearticle    bool  `db:"not null;default(0)"`
	Allowaddtopic         bool  `db:"not null;default(0)"`
	Allowmanagetopic      bool  `db:"not null;default(0)"`
	Allowdiy              bool  `db:"not null;default(0)"`
	Allowclearrecycle     bool  `db:"not null;default(0)"`
	Allowmanagetag        bool  `db:"not null;default(0)"`
	Alloweditusertag      bool  `db:"not null;default(0)"`
	Managefeed            int32 `db:"not null;default(0)"`
	Managedoing           int32 `db:"not null;default(0)"`
	Manageshare           int32 `db:"not null;default(0)"`
	Manageblog            int32 `db:"not null;default(0)"`
	Managealbum           int32 `db:"not null;default(0)"`
	Managecomment         int32 `db:"not null;default(0)"`
	Managemagiclog        int32 `db:"not null;default(0)"`
	Managereport          int32 `db:"not null;default(0)"`
	Managehotuser         int32 `db:"not null;default(0)"`
	Managedefaultuser     int32 `db:"not null;default(0)"`
	Managevideophoto      int32 `db:"not null;default(0)"`
	Managemagic           int32 `db:"not null;default(0)"`
	Manageclick           int32 `db:"not null;default(0)"`
	Allowmanagecollection int32 `db:"not null;default(0)"`
	Allowmakehtml         int32 `db:"not null;default(0)"`
}

type Common_banned struct {
	Id         int16  `db:"not null;auto_increment;pk"`
	Ip1        int16  `db:"not null;default(0)"`
	Ip2        int16  `db:"not null;default(0)"`
	Ip3        int16  `db:"not null;default(0)"`
	Ip4        int16  `db:"not null;default(0)"`
	Admin      string `db:"not null;type:varchar(15)"`
	Dateline   int32  `db:"not null;default(0)"`
	Expiration int32  `db:"not null;default(0)"`
}
type Common_block struct {
	Bid             int32                     `db:"not null;auto_increment;pk"`
	Blockclass      string                    `db:"not null;default('0');type:varchar(255)"`
	Blocktype       int32                     `db:"not null;default(0)"`
	Name            string                    `db:"not null;type:varchar(255)"`
	Title           string                    `db:"not null;type:text"`
	Classname       string                    `db:"not null;type:varchar(255)"`
	Summary         string                    `db:"not null;type:text"`
	Uid             int32                     `db:"not null;default(0)"`
	Username        string                    `db:"not null;type:varchar(255)"`
	Styleid         int16                     `db:"not null;default(0)"`
	Blockstyle      string                    `db:"not null;type:text"`
	MSG_block_style *protocol.MSG_block_style `db:"-"`
	Picwidth        int16                     `db:"not null;default(0)"`
	Picheight       int16                     `db:"not null;default(0)"`
	Target          string                    `db:"not null;type:varchar(255)"`
	Dateformat      string                    `db:"not null;type:varchar(255)"`
	Dateuformat     int32                     `db:"not null;default(0)"`
	Script          string                    `db:"not null;type:varchar(255)"`
	Param           string                    `db:"not null;type:text"`
	Shownum         int16                     `db:"not null;default(0)"`
	Cachetime       int32                     `db:"not null;default(0)"`
	Cachetimerange  string                    `db:"not null;type:varchar(5)"`
	Punctualupdate  int32                     `db:"not null;default(0)"`
	Hidedisplay     int8                      `db:"not null;default(0)"`
	Dateline        int32                     `db:"not null;default(0)"`
	Notinherited    int32                     `db:"not null;default(0)"`
	Isblank         int8                      `db:"not null;default(0)"`
}
type Common_block_favorite struct {
	Favid    int32 `db:"not null;auto_increment;pk"`
	Uid      int32 `db:"not null;default(0);index"`
	Bid      int32 `db:"not null;default(0)"`
	Dateline int32 `db:"not null;default(0);index"`
}
type Common_block_item struct {
	Itemid   int32  `db:"not null;auto_increment;pk"`
	Bid      int32  `db:"not null;default(0);index"`
	Id       int32  `db:"not null;default(0)"`
	Idtype   string `db:"not null;type:varchar(255)"`
	Itemtype int32  `db:"not null;default(0)"`
	Title    string `db:"not null;type:varchar(255)"`
	Url      string `db:"not null;type:varchar(255)"`
	Pic      string `db:"not null;type:varchar(255)"`
	Picflag  int8   `db:"not null;default(0)"`
	Picsize  int16
	//Makethumb    int8   `db:"not null;default(0)"`
	Thumbpath    string                               `db:"not null;type:varchar(255)"`
	Summary      string                               `db:"not null;type:text"`
	Showstyle    []*protocol.MSG_block_item_showstyle `db:"not null;type:text"`
	Related      string                               `db:"not null;type:text"`
	Fields       *protocol.MSG_block_item_field       `db:"not null;type:text"`
	Displayorder int16                                `db:"not null;default(0)"`
	Startdate    int32                                `db:"not null;default(0)"`
	Enddate      int32                                `db:"not null;default(0)"`
}
type Common_block_item_data struct {
	Dataid       int32  `db:"not null;auto_increment;pk"`
	Bid          int32  `db:"not null;default(0);index"`
	Id           int32  `db:"not null;default(0)"`
	Idtype       string `db:"not null;type:varchar(255)"`
	Itemtype     int32  `db:"not null;default(0)"`
	Title        string `db:"not null;type:varchar(255)"`
	Url          string `db:"not null;type:varchar(255)"`
	Pic          string `db:"not null;type:varchar(255)"`
	Picflag      int32  `db:"not null;default(0)"`
	Makethumb    int32  `db:"not null;default(0)"`
	Summary      string `db:"not null;type:text"`
	Showstyle    string `db:"not null;type:text"`
	Related      string `db:"not null;type:text"`
	Fields       string `db:"not null;type:text"`
	Displayorder int16  `db:"not null;default(0);index"`
	Startdate    int32  `db:"not null;default(0)"`
	Enddate      int32  `db:"not null;default(0)"`
	Uid          int32  `db:"not null;default(0)"`
	Username     string `db:"not null;type:varchar(255)"`
	Dateline     int32  `db:"not null;default(0)"`
	Isverified   int32  `db:"not null;default(0)"`
	Verifiedtime int32  `db:"not null;default(0);index"`
	Stickgrade   int32  `db:"not null;default(0);index"`
}
type Common_block_permission struct {
	Bid              int32  `db:"not null;default(0);pk"`
	Uid              int32  `db:"not null;default(0);pk;index"`
	Allowmanage      int32  `db:"not null;default(0)"`
	Allowrecommend   int32  `db:"not null;default(0)"`
	Needverify       int32  `db:"not null;default(0)"`
	Inheritedtplname string `db:"not null;type:varchar(255)"`
}
type Common_block_pic struct {
	Picid   int32  `db:"not null;auto_increment;pk"`
	Bid     int32  `db:"not null;default(0);index"`
	Itemid  int32  `db:"not null;default(0);index"`
	Pic     string `db:"not null;type:varchar(255)"`
	Picflag int32  `db:"not null;default(0)"`
	Type    int32  `db:"not null;default(0)"`
}
type Common_block_style struct {
	Styleid    int16  `db:"not null;auto_increment;pk" json:"-"`
	Blockclass string `db:"not null;type:varchar(255);index" json:"blockclass"`
	Name       string `db:"not null;type:varchar(255)"`
	Template   struct {
		Raw       string              `json:"raw"`
		Footer    string              `json:"footer"`
		Header    string              `json:"header"`
		Indexplus *Block_template_s   `json:"indexplus"`
		Index     *Block_template_s   `json:"index"`
		Orderplus []*Block_template_s `json:"Orderplus"`
		Order     *Block_template_s   `json:"order"`
		Loopplus  []string            `json:"loopplus"`
		Loop      string              `json:"loop"`
	} `db:"not null;type:text" json:"template"`
	Hash       string   `db:"not null;type:varchar(255);index"  json:"hash"`
	Getpic     int32    `db:"not null;default(0)"  json:"getpic"`
	Getsummary int32    `db:"not null;default(0)"  json:"getsummary"`
	Makethumb  int32    `db:"not null;default(0)"  json:"makethumb"`
	Settarget  int32    `db:"not null;default(0)"  json:"settarget"`
	Fields     []string `db:"null;type:text"  json:"fields"`
	Moreurl    int8     `db:"not null;default(0)"  json:"moreurl"`
}

type Block_template_s struct {
	Key   string `json:"key"`
	Order []struct {
		Key   string `json:"key"`
		Value string `json:"value"`
	} `json:"order"`
	Odd  string `json:"odd"`
	Even string `json:"even"`
}

type Common_block_xml struct {
	Id       int16  `db:"not null;auto_increment;pk"`
	Name     string `db:"not null;type:varchar(255)"`
	Version  string `db:"not null;type:varchar(255)"`
	Url      string `db:"not null;type:varchar(255)"`
	Clientid string `db:"not null;type:varchar(255)"`
	Key      string `db:"not null;type:varchar(255)"`
	Signtype string `db:"not null;type:varchar(255)"`
	Data     string `db:"not null;type:text"`
}

type Common_credit_log struct {
	Logid       int32  `db:"not null;auto_increment;pk"`
	Uid         int32  `db:"not null;default(0);index"`
	Operation   string `db:"not null;type:varchar(3);index"`
	Relatedid   int32  `db:"not null;index"`
	Dateline    int32  `db:"not null;index"`
	Extcredits1 int32  `db:"not null"`
	Extcredits2 int32  `db:"not null"`
	Extcredits3 int32  `db:"not null"`
	Extcredits4 int32  `db:"not null"`
	Extcredits5 int32  `db:"not null"`
	Extcredits6 int32  `db:"not null"`
	Extcredits7 int32  `db:"not null"`
	Extcredits8 int32  `db:"not null"`
}
type Common_credit_log_field struct {
	Logid int32  `db:"not null;index"`
	Title string `db:"not null;type:varchar(100)"`
	Text  string `db:"not null;type:text"`
}
type Common_credit_rule struct {
	Rid         int32   `db:"not null;auto_increment;pk"`
	Rulename    string  `db:"not null;type:varchar(20)"`
	Action      string  `db:"not null;type:varchar(20);index"`
	Cycletype   int8    `db:"not null;default(0)"` //周期，0=一次,1=每天,2=整点,3=间隔分钟,4=无限
	Cycletime   int16   `db:"not null;default(0)"` //上一个选择2,3的时候有效
	Rewardnum   int32   `db:"not null;default(1)"` //周期内奖励次数，0=无限
	Norepeat    int8    `db:"not null;default(0)"`
	Extcredits1 int32   `db:"not null;default(0)"`
	Extcredits2 int32   `db:"not null;default(0)"`
	Extcredits3 int32   `db:"not null;default(0)"`
	Extcredits4 int32   `db:"not null;default(0)"`
	Extcredits5 int32   `db:"not null;default(0)"`
	Extcredits6 int32   `db:"not null;default(0)"`
	Extcredits7 int32   `db:"not null;default(0)"`
	Extcredits8 int32   `db:"not null;default(0)"`
	Fids        []int32 `db:"not null;type:text"`
}
type Common_credit_rule_log struct {
	Clid        int32 `db:"not null;auto_increment;pk"`
	Uid         int32 `db:"not null;default(0);index"`
	Rid         int32 `db:"not null;default(0);index"`
	Fid         int32 `db:"not null;default(0);index"`
	Total       int32 `db:"not null;default(0)"`
	Cyclenum    int32 `db:"not null;default(0)"`
	Extcredits1 int32 `db:"not null;default(0)"`
	Extcredits2 int32 `db:"not null;default(0)"`
	Extcredits3 int32 `db:"not null;default(0)"`
	Extcredits4 int32 `db:"not null;default(0)"`
	Extcredits5 int32 `db:"not null;default(0)"`
	Extcredits6 int32 `db:"not null;default(0)"`
	Extcredits7 int32 `db:"not null;default(0)"`
	Extcredits8 int32 `db:"not null;default(0)"`
	Starttime   int64 `db:"not null;default(0)"`
	Dateline    int64 `db:"not null;default(0);index"`
}
type Common_credit_rule_log_field struct {
	Clid int32  `db:"not null;default(0);pk"`
	Uid  int32  `db:"not null;default(0);pk"`
	Info string `db:"not null;type:text"`
	User string `db:"not null;type:text"`
	App  string `db:"not null;type:text"`
}

type Common_diy_data struct {
	Targettplname string `db:"not null;type:varchar(100);pk"`
	//Tpldirectory  string `db:"not null;type:varchar(80);pk"`
	//Primaltplname string `db:"not null;type:varchar(255)"`
	Diycontent []*protocol.MSG_diy_info `db:"not null "`
	Name       string                   `db:"not null;type:varchar(255)"`
	Uid        int32                    `db:"not null;default(0)"`
	Username   string                   `db:"not null;type:varchar(15)"`
	Dateline   int64                    `db:"not null;default(0)"`
}
type Common_nav struct {
	Id           int16  `db:"not null;auto_increment;pk"`
	Parentid     int16  `db:"not null;default(0)"`
	Name         string `db:"not null;type:varchar(255)"`
	Title        string `db:"not null;type:varchar(255)"`
	Url          string `db:"not null;type:varchar(255)"`
	Identifier   string `db:"not null;type:varchar(255)"`
	Target       int32  `db:"not null;default(0)"`
	Type         int32  `db:"not null;default(0)"`
	Available    int32  `db:"not null;default(0)"`
	Displayorder int16  `db:"not null"`
	Highlight    int32  `db:"not null;default(0)"`
	Level        int32  `db:"not null;default(0)"`
	Subtype      int32  `db:"not null;default(0)"`
	Subcols      int32  `db:"not null;default(0)"`
	Icon         string `db:"not null;type:varchar(255)"`
	Subname      string `db:"not null;type:varchar(255)"`
	Suburl       string `db:"not null;type:varchar(255)"`
	Navtype      int32  `db:"not null;default(0);index"`
	Logo         string `db:"not null;type:varchar(255)"`
}
type Common_member struct {
	Uid           int32  `db:"not null;auto_increment;pk"`
	Email         string `db:"not null;type:varchar(40);index"`
	EmailNew      string `db:"not null;type:varchar(40);index"`
	Phone         string `db:"not null;type:varchar(20);index"`
	Username      string `db:"not null;type:varchar(15)"`
	Password      string `db:"not null;type:varchar(32)"`
	Password_salt string `db:"not null;type:varchar(32)"`
	Status        int32  `db:"not null;default(0)"`
	Emailstatus   string `db:"not null;type:varchar(32)"` //1为已验证，其他为验证字串
	EmailSendTime int32  `db:"not null;default(0)"`       //限制email发送频率
	Avatar        string `db:"not null;type:varchar(40)"`
	//Videophotostatus   int32                   `db:"not null;default(0)"`
	Adminid     int16 `db:"not null;default(0)"`
	Groupid     int16 `db:"not null;default(0);index"`
	GroupFid    int32 `db:"not null;default(0);index"`
	Groupexpiry int32 `db:"not null;default(0)"`
	//Extgroupids        string                  `db:"not null;type:varchar(20)"`
	Regdate int64 `db:"not null;default(0);index"` //注册时间戳
	Credits int32 `db:"not null;default(0)"`
	//Notifysound        int32                   `db:"not null;default(0)"`
	//Timeoffset         string                  `db:"not null;type:varchar(4)"`
	//Newprompt          int16                   `db:"not null;default(0)"`
	//Accessmasks        int32                   `db:"not null;default(0)"`
	Allowadmincp int32 `db:"not null;default(0)"`
	//Onlyacceptfriendpm int32                   `db:"not null;default(0)"`
	//Conisbind          int32                   `db:"not null;default(0);index"`
	//Freeze             int32                   `db:"not null;default(0)"`
	//LastFlushTime      int64                   `db:"not null;default(0)"`
	QQ            int64                   `db:"not null;type:varchar(20)"`
	Mobile        string                  `db:"not null;type:varchar(20)"`
	Site          string                  `db:"not null;type:varchar(60)"`
	Wx            string                  `db:"not null;type:varchar(20)"`
	Forum_history []int32                 //论坛浏览历史
	Newpm         int32                   `db:"-"`
	Isonline      bool                    `db:"-"`
	Lock          sync.RWMutex            `db:"-"`
	Notice        []*Home_notification    `db:"-"`
	Forum_access  map[int32]*Forum_access `db:"-"`
	Group         *Common_usergroup       `db:"-"`
	Admin_Group   *Common_admingroup      `db:"-"`
	Count         *Common_member_count    `db:"-"`
	//Forum_modwork []*Forum_modwork        `db:"-"` //管理工作统计

	Field_forum *Common_member_field_forum `db:"-"`
	TokenKey    string                     `db:"-"` //防重复提交

	//Attachs            []*Forum_attachment        `db:"-"` //未使用图片
	//Imgattachs         []*Forum_attachment        `db:"-"` //未使用附件
	//Field_home         *Common_member_field_home  `db:"-"` //空间相关
}

/*type Common_member_connect struct {
	Uid              int32  `db:"not null;default(0);pk"`
	Conuin           string `db:"not null;type:varchar(40);index"`
	Conuinsecret     string `db:"not null;type:varchar(16)"`
	Conopenid        string `db:"not null;type:varchar(32);index"`
	Conisfeed        int32  `db:"not null;default(0)"`
	Conispublishfeed int32  `db:"not null;default(0)"`
	Conispublisht    int32  `db:"not null;default(0)"`
	Conisregister    int32  `db:"not null;default(0)"`
	Conisqzoneavatar int32  `db:"not null;default(0)"`
	Conisqqshow      int32  `db:"not null;default(0)"`
	Conuintoken      string `db:"not null;type:varchar(32)"`
}*/
type Common_member_count struct { //放一些经常变动的
	Uid             int32 `db:"not null;pk"`
	Extcredits1     int32 `db:"not null;default(0)"`
	Extcredits2     int32 `db:"not null;default(0)"`
	Extcredits3     int32 `db:"not null;default(0)"`
	Extcredits4     int32 `db:"not null;default(0)"`
	Extcredits5     int32 `db:"not null;default(0)"`
	Extcredits6     int32 `db:"not null;default(0)"`
	Extcredits7     int32 `db:"not null;default(0)"`
	Extcredits8     int32 `db:"not null;default(0)"`
	Friends         int16 `db:"not null;default(0)"`
	Posts           int32 `db:"not null;default(0);index"`
	Threads         int32 `db:"not null;default(0)"`
	Digestposts     int32 `db:"not null;default(0)"`
	Doings          int16 `db:"not null;default(0)"`
	Blogs           int16 `db:"not null;default(0)"`
	Albums          int16 `db:"not null;default(0)"`
	Sharings        int16 `db:"not null;default(0)"`
	Attachsize      int32 `db:"not null;default(0)"`
	Views           int32 `db:"not null;default(0)"`
	Oltime          int32 `db:"not null;default(0)"`
	Todayattachs    int16 `db:"-"` //不存库
	Todayattachsize int32 `db:"-"` //不存库
	Feeds           int32 `db:"not null;default(0)"`
	Follower        int32 `db:"not null;default(0)"`
	Following       int32 `db:"not null;default(0)"`
	Newfollower     int32 `db:"not null;default(0)"`
	Blacklist       int32 `db:"not null;default(0)"`
	Lastvisit       int32
	Regip           string    `db:"not null;type:varchar(21)"`
	Lastip          string    `db:"not null;type:varchar(21)"`
	Lastpost        int32     `db:"not null;default(0)"`
	SpaceView       sync.Map  `db:"-"`
	Timestamp       time.Time `db:"default(current_timestamp());extra('on update current_timestamp()')"`
}

type Common_member_field_forum struct {
	Uid            int32  `db:"not null;pk"`
	Publishfeed    int32  `db:"not null;default(0)"`
	Customshow     int32  `db:"not null;default(26)"`
	Customstatus   string `db:"not null;type:varchar(30)"`
	Medals         string `db:"not null;type:text"`
	Sightml        string `db:"not null;type:text"`
	Groupterms     string `db:"not null;type:text"`
	Authstr        string `db:"not null;type:varchar(20)"`
	Groups         string `db:"not null;type:text"`
	Attentiongroup string `db:"not null;type:varchar(255)"`
}

/*type Common_member_log struct {
	Uid      int32  `db:"not null;default(0);pk"`
	Action   string `db:"not null;type:varchar(10)"`
	Dateline int32  `db:"not null;default(0)"`
}*/

type Common_member_profile struct {
	Uid             int32  `db:"not null;pk"`
	Realname        string `db:"not null;type:varchar(255)"`
	Gender          int32  `db:"not null;default(0)"`
	Birthyear       int16  `db:"not null;default(0)"`
	Birthmonth      int32  `db:"not null;default(0)"`
	Birthday        int32  `db:"not null;default(0)"`
	Constellation   string `db:"not null;type:varchar(255)"`
	Zodiac          string `db:"not null;type:varchar(255)"`
	Telephone       string `db:"not null;type:varchar(255)"`
	Mobile          string `db:"not null;type:varchar(255)"`
	Idcardtype      string `db:"not null;type:varchar(255)"`
	Idcard          string `db:"not null;type:varchar(255)"`
	Address         string `db:"not null;type:varchar(255)"`
	Zipcode         string `db:"not null;type:varchar(255)"`
	Nationality     string `db:"not null;type:varchar(255)"`
	Birthprovince   string `db:"not null;type:varchar(255)"`
	Birthcity       string `db:"not null;type:varchar(255)"`
	Birthdist       string `db:"not null;type:varchar(20)"`
	Birthcommunity  string `db:"not null;type:varchar(255)"`
	Resideprovince  string `db:"not null;type:varchar(255)"`
	Residecity      string `db:"not null;type:varchar(255)"`
	Residedist      string `db:"not null;type:varchar(20)"`
	Residecommunity string `db:"not null;type:varchar(255)"`
	Residesuite     string `db:"not null;type:varchar(255)"`
	Graduateschool  string `db:"not null;type:varchar(255)"`
	Company         string `db:"not null;type:varchar(255)"`
	Education       string `db:"not null;type:varchar(255)"`
	Occupation      string `db:"not null;type:varchar(255)"`
	Position        string `db:"not null;type:varchar(255)"`
	Revenue         string `db:"not null;type:varchar(255)"`
	Affectivestatus string `db:"not null;type:varchar(255)"`
	Lookingfor      string `db:"not null;type:varchar(255)"`
	Bloodtype       string `db:"not null;type:varchar(255)"`
	Height          string `db:"not null;type:varchar(255)"`
	Weight          string `db:"not null;type:varchar(255)"`
	Alipay          string `db:"not null;type:varchar(255)"`
	Icq             string `db:"not null;type:varchar(255)"`
	Qq              string `db:"not null;type:varchar(255)"`
	Yahoo           string `db:"not null;type:varchar(255)"`
	Msn             string `db:"not null;type:varchar(255)"`
	Taobao          string `db:"not null;type:varchar(255)"`
	Site            string `db:"not null;type:varchar(255)"`
	Bio             string `db:"not null;type:text"`
	Interest        string `db:"not null;type:text"`
	Field1          string `db:"not null;type:text"`
	Field2          string `db:"not null;type:text"`
	Field3          string `db:"not null;type:text"`
	Field4          string `db:"not null;type:text"`
	Field5          string `db:"not null;type:text"`
	Field6          string `db:"not null;type:text"`
	Field7          string `db:"not null;type:text"`
	Field8          string `db:"not null;type:text"`
}
type Common_member_profile_setting struct {
	Fieldid        string `db:"not null;type:varchar(255);pk"`
	Available      int8   `db:"not null;default(0);index"`
	Invisible      int8   `db:"not null;default(0)"`
	Needverify     int8   `db:"not null;default(0)"`
	Title          string `db:"not null;type:varchar(255)"`
	Description    string `db:"not null;type:varchar(255)"`
	Displayorder   int16  `db:"not null;default(0)"`
	Required       int8   `db:"not null;default(0)"` //是否必填
	Unchangeable   int8   `db:"not null;default(0)"` //提交后不可修改
	Showincard     int8   `db:"not null;default(0)"`
	Showinthread   int8   `db:"not null;default(0)"`
	Showinregister int8   `db:"not null;default(0)"`
	Allowsearch    int8   `db:"not null;default(0)"`
	Formtype       int8   `db:"not null;default(0)"` //0=text文字 1=textarea多行文字 2=radio单选 3=checkbox复选 4=select下拉菜单 5=list多选列表 6=file 图片
	Size           int16  `db:"not null;default(0)"`
	Choices        string `db:"not null;type:text"`
	Validate       string `db:"not null;type:text"`
}
type Common_member_qq struct {
	Openid   string `db:"not null;type:varchar(255);pk"`
	Uid      int32  `db:"index"`
	Nickname string `db:"not null;type:varchar(40)"`
	Img      string `db:"not null;type:varchar(255)"`
}
type Common_setting struct {
	Skey   string `db:"not null;type:varchar(255);pk"`
	Svalue string `db:"not null;type:text"`
}

type Common_tag struct {
	Tagid   int32  `db:"not null;auto_increment;pk;index"`
	Tagname string `db:"not null;type:varchar(20);index"`
	Status  int8   `db:"not null;default(0);index"`
}
type Common_tagitem struct {
	Tagid  int32  `db:"not null;default(0);index"`
	Itemid int32  `db:"not null;default(0);index"`
	Idtype string `db:"not null;type:varchar(10);index"`
}
type Common_usergroup struct {
	Groupid            int16  `db:"not null;auto_increment;pk"`
	Radminid           int32  `db:"not null;default(0)"`
	Type               int8   `db:"not null;default(2)"` // 0=system,1=special,2=member,
	System             string `db:"not null;default('private');type:varchar(255)"`
	Grouptitle         string `db:"not null;type:varchar(255)"`
	Creditshigher      int32  `db:"not null;default(0);index"`
	Creditslower       int32  `db:"not null;default(0);index"`
	Stars              int32  `db:"not null;default(0)"`
	Color              string `db:"not null;type:varchar(255)"`
	Icon               string `db:"not null;type:varchar(255)"`
	Allowvisit         int8   `db:"not null;default(0)"`
	Allowsendpm        int8   `db:"not null;default(1)"`
	Allowinvite        int8   `db:"not null;default(0)"`
	Allowmailinvite    int8   `db:"not null;default(0)"`
	Maxinvitenum       int32  `db:"not null;default(0)"`
	Inviteprice        int16  `db:"not null;default(0)"`
	Maxinviteday       int16  `db:"not null;default(0)"`
	Readaccess         uint8  `db:"not null;default(0)"`
	Allowpost          bool   `db:"not null;default(0)"`
	Allowreply         bool   `db:"not null;default(0)"`
	Allowpostpoll      bool   `db:"not null;default(0)"`
	Allowpostreward    bool   `db:"not null;default(0)"`
	Allowposttrade     bool   `db:"not null;default(0)"`
	Allowpostactivity  bool   `db:"not null;default(0)"`
	Allowdirectpost    int8   `db:"not null;default(0)"`
	Allowgetattach     bool   `db:"not null;default(0)"`
	Allowgetimage      bool   `db:"not null;default(0)"`
	Allowpostattach    bool   `db:"not null;default(0)"`
	Allowpostimage     bool   `db:"not null;default(0)"`
	Allowvote          bool   `db:"not null;default(0)"`
	Allowsearch        int8   `db:"not null;default(0)"`
	Allowcstatus       bool   `db:"not null;default(0)"`
	Allowinvisible     int8   `db:"not null;default(0)"`
	Allowtransfer      int8   `db:"not null;default(0)"`
	Allowsetreadperm   bool   `db:"not null;default(0)"`
	Allowsetattachperm bool   `db:"not null;default(0)"`
	Allowposttag       bool   `db:"not null;default(0)"`
	Allowhidecode      bool   `db:"not null;default(0)"`
	Allowhtml          bool   `db:"not null;default(0)"`
	Allowanonymous     bool   `db:"not null;default(0)"`
	Allowsigbbcode     bool   `db:"not null;default(0)"`
	Allowsigimgcode    bool   `db:"not null;default(0)"`
	Allowmagics        int8   `db:"not null"`
	Disableperiodctrl  int32  `db:"not null;default(0)"`
	Reasonpm           int32  `db:"not null;default(0)"`
	Maxprice           int16  `db:"not null;default(0)"`
	Maxsigsize         int16  `db:"not null;default(0)"`
	Maxattachsize      int32  `db:"not null;default(0)"`
	Maxsizeperday      int32  `db:"not null;default(0)"`
	Maxthreadsperhour  int32  `db:"not null;default(0)"`
	Maxpostsperhour    int32  `db:"not null;default(0)"`
	Attachextensions   string `db:"not null;type:varchar(100)"`
	Raterange          struct {
		Allowrate int8
		Isself    int8
		Min       int8
		Max       int8
		Daycount  int16
	} `db:"not null;type:tinytext"`
	Loginreward            string `db:"not null;type:varchar(150)"`
	Mintradeprice          int16  `db:"not null;default(1)"`
	Maxtradeprice          int16  `db:"not null;default(0)"`
	Minrewardprice         int16  `db:"not null;default(1)"`
	Maxrewardprice         int16  `db:"not null;default(0)"`
	Magicsdiscount         int32  `db:"not null"`
	Maxmagicsweight        int16  `db:"not null"`
	Allowpostdebate        bool   `db:"not null;default(0)"`
	Tradestick             int32  `db:"not null"`
	Exempt                 int32  `db:"not null"`
	Maxattachnum           int16  `db:"not null;default(0)"`
	Allowposturl           int8   `db:"not null;default(3)"`
	Allowrecommend         int8   `db:"not null;default(1)"`
	Allowpostrushreply     bool   `db:"not null;default(0)"`
	Maxfriendnum           int16  `db:"not null;default(0)"`
	Maxspacesize           int32  `db:"not null;default(0)"`
	Allowcomment           int8   `db:"not null;default(0)"`
	Allowcommentarticle    int16  `db:"not null;default(0)"`
	Searchinterval         int16  `db:"not null;default(0)"`
	Searchignore           int32  `db:"not null;default(0)"`
	Allowblog              int8   `db:"not null;default(0)"`
	Allowdoing             int8   `db:"not null;default(0)"`
	Allowupload            bool   `db:"not null;default(0)"`
	Allowshare             int8   `db:"not null;default(0)"`
	Allowblogmod           int8   `db:"not null;default(0)"`
	Allowdoingmod          int8   `db:"not null;default(0)"`
	Allowuploadmod         int8   `db:"not null;default(0)"`
	Allowsharemod          int8   `db:"not null;default(0)"`
	Allowcss               int8   `db:"not null;default(0)"`
	Allowpoke              int8   `db:"not null;default(0)"`
	Allowfriend            int8   `db:"not null;default(0)"`
	Allowclick             int8   `db:"not null;default(0)"`
	Allowmagic             int8   `db:"not null;default(0)"`
	Allowstat              int8   `db:"not null;default(0)"`
	Allowstatdata          int8   `db:"not null;default(0)"`
	Videophotoignore       int32  `db:"not null;default(0)"`
	Allowviewvideophoto    int8   `db:"not null;default(0)"`
	Allowmyop              int8   `db:"not null;default(0)"`
	Magicdiscount          int32  `db:"not null;default(0)"`
	Domainlength           int16  `db:"not null;default(0)"`
	Seccode                int32  `db:"not null;default(1)"`
	Disablepostctrl        bool   `db:"not null;default(0)"`
	Allowbuildgroup        int8   `db:"not null;default(0)"`
	Allowgroupdirectpost   int8   `db:"not null;default(0)"`
	Allowgroupposturl      int8   `db:"not null;default(0)"`
	Edittimelimit          int32  `db:"not null;default(0)"`
	Allowpostarticle       bool   `db:"not null;default(0)"`
	Allowdownlocalimg      int8   `db:"not null;default(0)"`
	Allowdownremoteimg     bool   `db:"not null;default(0)"`
	Allowpostarticlemod    int8   `db:"not null;default(0)"`
	Allowspacediyhtml      int8   `db:"not null;default(0)"`
	Allowspacediybbcode    int8   `db:"not null;default(0)"`
	Allowspacediyimgcode   int8   `db:"not null;default(0)"`
	Allowcommentpost       int8   `db:"not null;default(2)"`
	Allowcommentitem       int8   `db:"not null;default(0)"`
	Allowcommentreply      int8   `db:"not null;default(0)"`
	Allowreplycredit       bool   `db:"not null;default(0)"`
	Ignorecensor           int32  `db:"not null;default(0)"`
	Allowsendallpm         int8   `db:"not null;default(0)"`
	Allowsendpmmaxnum      int8   `db:"not null;default(0)"`
	Maximagesize           int32  `db:"not null;default(0)"`
	Allowmediacode         bool   `db:"not null;default(0)"`
	Allowbegincode         bool   `db:"not null;default(0)"`
	Allowat                int8   `db:"not null;default(0)"`
	Allowsetpublishdate    bool   `db:"not null;default(0)"`
	Allowfollowcollection  int8   `db:"not null;default(0)"`
	Allowcommentcollection int8   `db:"not null;default(0)"`
	Allowcreatecollection  int8   `db:"not null;default(0)"`
	Forcesecques           int32  `db:"not null;default(0)"`
	Forcelogin             int32  `db:"not null;default(0)"`
	Closead                int32  `db:"not null;default(0)"`
	Buildgroupcredits      int16  `db:"not null;default(0)"`
	Allowimgcontent        int8   `db:"not null;default(0)"`
}

/*type Common_stat struct {
	Daytime      int64 `db:"not null;default(0);pk"`
	Login        int32 `db:"not null;default(0)"`
	Mobilelogin  int32 `db:"not null;default(0)"`
	Connectlogin int32 `db:"not null;default(0)"`
	Register     int32 `db:"not null;default(0)"`
	Invite       int32 `db:"not null;default(0)"`
	Appinvite    int32 `db:"not null;default(0)"`
	Doing        int32 `db:"not null;default(0)"`
	Blog         int32 `db:"not null;default(0)"`
	Pic          int32 `db:"not null;default(0)"`
	Poll         int32 `db:"not null;default(0)"`
	Activity     int32 `db:"not null;default(0)"`
	Share        int32 `db:"not null;default(0)"`
	Thread       int32 `db:"not null;default(0)"`
	Docomment    int32 `db:"not null;default(0)"`
	Blogcomment  int32 `db:"not null;default(0)"`
	Piccomment   int32 `db:"not null;default(0)"`
	Sharecomment int32 `db:"not null;default(0)"`
	Reward       int32 `db:"not null;default(0)"`
	Debate       int32 `db:"not null;default(0)"`
	Trade        int32 `db:"not null;default(0)"`
	Group        int32 `db:"not null;default(0)"`
	Groupjoin    int32 `db:"not null;default(0)"`
	Groupthread  int32 `db:"not null;default(0)"`
	Grouppost    int32 `db:"not null;default(0)"`
	Post         int32 `db:"not null;default(0)"`
	Wall         int32 `db:"not null;default(0)"`
	Poke         int32 `db:"not null;default(0)"`
	Click        int32 `db:"not null;default(0)"`
	Sendpm       int32 `db:"not null;default(0)"`
	Friend       int32 `db:"not null;default(0)"`
	Addfriend    int32 `db:"not null;default(0)"`
}
type Common_statuser struct {
	Uid     int32  `db:"not null;default(0);index"`
	Daytime int64  `db:"not null;default(0)"`
	Type    string `db:"not null;type:varchar(20)"`
}*/
type Email_template struct {
	Id      int32  `db:"not null;auto_increment;default(0);pk"`
	Name    string `db:"not null;type:varchar(50)"`
	Title   string `db:"not null;type:varchar(255)"`
	Message string `db:"type:mediumtext"`
}
type Forum_access struct {
	Uid            int32 `db:"not null;default(0);pk"`
	Fid            int32 `db:"not null;default(0);pk;index"`
	Allowview      int8  `db:"not null;default(0)"`
	Allowpost      int8  `db:"not null;default(0)"`
	Allowreply     int8  `db:"not null;default(0)"`
	Allowgetattach int8  `db:"not null;default(0)"`
	//Allowpostattach int8  `db:"not null;default(0)"`
	//Allowpostimage  int8  `db:"not null;default(0)"`
	Adminuser int32 `db:"not null;default(0)"`
	Dateline  int32 `db:"not null;default(0);index"`
}
type Forum_attachment struct {
	Aid        int64  `db:"not null;auto_increment;pk"`
	Uid        int32  `db:"not null;default(0);index"`
	Dateline   int32  `db:"not null;default(0)"`
	Filename   string `db:"not null;type:varchar(255)"`
	Filesize   int32  `db:"not null;default(0)"`
	Filetitle  string `db:"not null;type:varchar(255)"`
	Attachment string `db:"not null;type:varchar(255)"`
	Remote     int32  `db:"not null;default(0)"`
	Isimage    bool   `db:"not null;default(0)"`
	Width      int16  `db:"not null;default(0)"`
	Thumb      int32  `db:"not null;default(0)"`
	Isused     bool
}
type Forum_creditslog struct {
	Uid            int32  `db:"not null;default(0);index"`
	Fromto         string `db:"not null;type:varchar(15)"`
	Sendcredits    int32  `db:"not null;default(0)"`
	Receivecredits int32  `db:"not null;default(0)"`
	Send           int32  `db:"not null;default(0)"`
	Receive        int32  `db:"not null;default(0)"`
	Dateline       int32  `db:"not null;default(0);index"`
	Operation      string `db:"not null;type:varchar(3)"`
}

type Forum_forum struct {
	Fid              int32  `db:"not null;auto_increment;pk"`
	Fup              int32  `db:"not null;default(0);index"`
	Type             int8   `db:"not null;default(1);index"` // 0=group,1=forum,2=sub,
	Name             string `db:"not null;type:varchar(50)"`
	Status           int8   `db:"not null;default(0);index"`
	Displayorder     int16  `db:"not null;default(0);index"`
	Styleid          int16  `db:"not null;default(0)"`
	Threads          int32
	Posts            int32
	Todayposts       int32
	Yesterdayposts   int32
	Rank             int16                        `db:"not null;default(0)"`
	Oldrank          int16                        `db:"not null;default(0)"`
	Lastpost         *protocol.MSG_forum_lastpost `db:"not null "`
	Domain           string                       `db:"not null;type:varchar(15)"`
	Allowsmilies     bool                         `db:"not null;default(0)"`
	Allowhtml        bool                         `db:"not null;default(0)"`
	Allowbbcode      bool                         `db:"not null;default(0)"`
	Allowimgcode     bool                         `db:"not null;default(0)"`
	Allowmediacode   bool                         `db:"not null;default(0)"`
	Allowanonymous   bool                         `db:"not null;default(0)"`
	Allowpostspecial int8                         `db:"not null;default(0)"`
	Allowspecialonly bool                         `db:"not null;default(0)"`
	Allowappend      int8                         `db:"not null;default(0)"`
	Alloweditrules   int8                         `db:"not null;default(0)"`
	Allowfeed        bool                         `db:"not null;default(1)"`
	Allowside        int8                         `db:"not null;default(0)"`
	Recyclebin       int32                        `db:"not null;default(0)"`
	Modnewposts      int8                         `db:"not null;default(0)"`
	Jammer           int32                        `db:"not null;default(0)"`
	Disablewatermark int32                        `db:"not null;default(0)"`
	Inheritedmod     int32                        `db:"not null;default(0)"`
	Autoclose        int32                        `db:"not null;default(0)"`
	Forumcolumns     int8                         `db:"not null;default(0)"`
	Catforumcolumns  int8                         `db:"not null;default(0)"`
	Threadcaches     int32                        `db:"not null;default(0)"`
	Alloweditpost    bool                         `db:"not null;default(1)"`
	Simple           int8                         `db:"not null;default(0)"`
	Modworks         bool                         `db:"not null;default(0)"`
	Allowglobalstick int8                         `db:"not null;default(1)"`
	Level            int16                        `db:"not null;default(0)"`
	Commoncredits    int32                        `db:"not null;default(0)"`
	Archive          int32                        `db:"not null;default(0)"`
	Recommend        int16                        `db:"not null;default(0)"`
	Favtimes         int32                        `db:"not null;default(0)"`
	Sharetimes       int32                        `db:"not null;default(0)"`
	Disablethumb     int32                        `db:"not null;default(0)"`
	Disablecollect   int32                        `db:"not null;default(0)"`
	Field            *Forum_forumfield            `db:"-"`
	Moderators       []*Forum_moderator
	Timestamp        time.Time `db:"default(current_timestamp());extra('on update current_timestamp()')"`
}
type Forum_forumfield struct {
	Fid                int32                         `db:"not null;default(0);pk"`
	Description        string                        `db:"not null;type:text"`
	Password           string                        `db:"not null;type:varchar(12)"`
	Icon               string                        `db:"not null;type:varchar(100)"`
	Redirect           string                        `db:"not null;type:varchar(255)"`
	Attachextensions   string                        `db:"not null;type:varchar(255)"`
	Creditspolicy      map[int32]*Common_credit_rule `db:"not null;type:text"`
	Formulaperm        string                        `db:"not null;type:text"`
	Moderators         string                        `db:"not null;type:text"` //版主
	Rules              string                        `db:"not null;type:text"`
	ThreadtypesSetting struct {
		Status   bool
		Required bool
		Listable bool
		Prefix   int8
	} `db:"not null;type:text"`
	ThreadtypesMsg   []*Forum_threadtype              `db:"-"`
	Threadsorts      string                           `db:"not null;type:text"`
	Viewperm         []int16                          `db:"not null;type:text"`
	Postperm         []int16                          `db:"not null;type:text"`
	Replyperm        []int16                          `db:"not null;type:text"`
	Getattachperm    []int16                          `db:"not null;type:text"`
	Postattachperm   []int16                          `db:"not null;type:text"`
	Postimageperm    []int16                          `db:"not null;type:text"`
	Spviewperm       []int16                          `db:"not null;type:text"`
	Seotitle         string                           `db:"not null;type:text"`
	Keywords         string                           `db:"not null;type:text"`
	Seodescription   string                           `db:"not null;type:text"`
	Supe_pushsetting string                           `db:"not null;type:text"`
	Modrecommend     *protocol.MSG_forum_modrecommend `db:"not null;type:text"`
	Threadplugin     string                           `db:"not null;type:text"`
	Replybg          string                           `db:"not null;type:text"`
	Extra            *protocol.MSG_forum_extra        `db:"not null;type:text"`
	Jointype         int32                            `db:"not null;default(0)"`
	Gviewperm        int32                            `db:"not null;default(0)"`
	Membernum        int16                            `db:"not null;default(0);index"`
	Dateline         int32                            `db:"not null;default(0);index"`
	Lastupdate       int32                            `db:"not null;default(0);index"`
	Activity         int32                            `db:"not null;default(0);index"`
	Founderuid       int32                            `db:"not null;default(0)"`
	Foundername      string                           `db:"not null;type:varchar(255)"`
	Banner           string                           `db:"not null;type:varchar(255)"`
	Groupnum         int16                            `db:"not null;default(0)"`
	Commentitem      string                           `db:"not null;type:text"`
	Relatedgroup     string                           `db:"not null;type:text"`
	Picstyle         bool                             `db:"not null;default(0)"` //图片列表模式
	Widthauto        int32                            `db:"not null;default(0)"`
	Noantitheft      int32                            `db:"not null;default(0)"`
	Noforumhidewater int32                            `db:"not null;default(0)"`
	Noforumrecommend int32                            `db:"not null;default(0)"`
	Livetid          int32                            `db:"not null;default(0)"`
	Price            int32                            `db:"not null;default(0)"`
	Timestamp        time.Time                        `db:"default(current_timestamp());extra('on update current_timestamp()')"`
}
type Forum_groupuser struct {
	Fid          int32  `db:"not null;default(0);pk;index"`
	Uid          int32  `db:"not null;default(0);pk;index"`
	Username     string `db:"not null;type:varchar(15)"`
	Level        int32  `db:"not null;default(0);index"`
	Threads      int32  `db:"not null;default(0)"`
	Replies      int32  `db:"not null;default(0)"`
	Joindateline int32  `db:"not null;default(0)"`
	Lastupdate   int32  `db:"not null;default(0);index"`
	Privacy      int32  `db:"not null;default(0)"`
}
type Forum_hotreply_number struct {
	//Pid     int32 `db:"not null;default(0);pk"`
	//Tid     int32 `db:"not null;default(0);index"`
	Support int16 `db:"not null;default(0)"`
	Against int16 `db:"not null;default(0)"`
	Total   int32 `db:"not null;default(0);index"`
}
type Forum_memberRecommend struct {
	Tid          int32 `db:"not null;pk"`
	Recommenduid int32 `db:"not null;pk"`
	Dateline     int32 `db:"not null"`
	Isadd        bool
}
type Forum_moderator struct {
	Uid int32 `db:"not null;default(0);pk"`
	//Fid          int32 `db:"not null;default(0);pk"`
	Displayorder int16 `db:"not null;default(0)"`
	//Inherited    int32 `db:"not null;default(0)"`
}
type Forum_poll struct {
	Tid         int32  `db:"not null;default(0);pk"`
	Overt       bool   //公开投票人
	Visible     bool   //投票结果可见
	Maxchoices  int8   `db:"not null;default(0)"` //单选多选
	Isimage     bool   `db:"not null;default(0)"` //是否图片
	Expiration  int32  `db:"not null;default(0)"`
	Pollpreview string `db:"not null;type:varchar(255)"`
	Voters      int32  `db:"not null;default(0)"` //有几个人投票了
}
type Forum_polloption struct { //具体选项与结果
	Polloptionid int32  `db:"not null;auto_increment;pk"`
	Tid          int32  `db:"not null;default(0);index"`
	Votes        int32  `db:"not null;default(0)"`       //几票
	Displayorder int16  `db:"not null;default(0);index"` //排序
	Name         string `db:"not null;type:varchar(80)"` //描述
	Voterids     string //投票人
	Aid          int64  //图片
}

type Forum_pollvoter struct {
	Tid      int32  `db:"not null;default(0);index"`
	Uid      int32  `db:"not null;default(0);index"`
	Username string `db:"not null;type:varchar(15)"`
	Options  string `db:"not null;type:text"`
	Dateline int32  `db:"not null;default(0);index"`
}
type Forum_post struct {
	Pid         int32  `db:"not null;auto_increment;pk"`
	Fid         int32  `db:"not null;default(0)"`
	Tid         int32  `db:"not null;default(0);index"`
	First       bool   `db:"not null;default(0);index"`
	Author      string `db:"not null;type:varchar(15)"`
	Authorid    int32  `db:"not null;default(0);index"`
	Subject     string `db:"not null;type:varchar(90)"`
	Dateline    int32  `db:"not null;default(0);index"`
	Message     string `db:"not null;type:text"`
	CutMessage  string `db:"not null;type:varchar(100)"`
	Useip       string `db:"not null;type:varchar(21)"`
	Port        int16  `db:"not null;default(0)"`
	Invisible   int8   `db:"not null;default(0);index"`
	Anonymous   bool   `db:"not null;default(0)"`
	Usesig      bool   `db:"not null;default(0)"`
	Htmlon      bool   `db:"not null;default(0)"`
	Bbcodeoff   bool   `db:"not null;default(0)"`
	Smileyoff   bool   `db:"not null;default(0)"`
	Parseurloff bool   `db:"not null;default(0)"`
	Attachment  int32  `db:"not null;default(0)"`
	//Rate        int16         `db:"not null;default(0)"`
	//Ratetimes   int32         `db:"not null;default(0)"`
	Status      int32         `db:"not null;default(0)"` //1屏蔽 2警告 8来自手机
	Tags        []*Common_tag `db:"null;type:tinytext"`
	Comment     int32         `db:"not null;default(0)"`
	Replycredit int32         `db:"not null;default(0)"`
	Position    int32         `db:"not null;index"`
	Stick       int8          `db:"not null;default(0);index"` //置顶
	Stand       int8          `db:"not null;default(0)"`       //立场
	//Postreview  Forum_hotreply_number
	Aids []int64 //图片列表
}

type Forum_ratelog struct {
	Pid        int32  `db:"not null;default(0);index"`
	Uid        int32  `db:"not null;default(0);index"`
	Username   string `db:"not null;type:varchar(15)"`
	Extcredits int32  `db:"not null;default(0)"`
	Dateline   int32  `db:"not null;default(0);index"`
	Score      int16  `db:"not null;default(0)"`
	Reason     string `db:"not null;type:varchar(40)"`
}
type Forum_replycredit struct {
	Tid            int32 `db:"not null;pk"`
	Extcredits     int32 `db:"not null;default(0)"`
	Extcreditstype int8  `db:"not null;default(0)"`
	Times          int16 `db:"not null;default(0)"`
	Membertimes    int16 `db:"not null;default(0)"`
	Random         int32 `db:"not null;default(0)"`
}

const (
	ThreadStatusWarn  = 1 << 2
	ThreadCloseOpen   = 0 //正常帖子
	ThreadCloseCommon = 1 //关闭
	ThreadCloseDelete = 2 //删除
)

type Forum_thread struct {
	Tid          int32     `db:"not null;auto_increment;pk"`
	Fid          int32     `db:"not null;default(0)"`
	Typeid       int16     `db:"not null;default(0)"`
	Readperm     int16     `db:"not null;default(0)"`
	Price        int16     `db:"not null;default(0)"`
	Author       string    `db:"not null;type:varchar(15)"`
	Authorid     int32     `db:"not null;default(0)"`
	Subject      string    `db:"not null;type:varchar(90)"`
	Dateline     int32     `db:"not null;default(0)"`
	Displayorder int8      `db:"not null;default(0)"`
	Highlight    int8      `db:"not null;default(0)"`
	Digest       int8      `db:"not null;default(0)"`
	Special      int8      `db:"not null;default(0)"`
	Attachment   int8      `db:"not null;default(0)"`
	Moderated    bool      `db:"not null;default(0)"`
	Closed       int8      `db:"not null;default(0)"`
	Status       int16     `db:"not null;default(0)"` //2回帖仅作者可见，4回帖倒序排列
	Isgroup      bool      `db:"not null;default(0)"`
	Stamp        int8      `db:"not null"`
	Icon         int8      `db:"not null"`
	Replycredit  int16     `db:"not null;default(0)"`
	Sticks       []int32   //被置顶的帖子
	Redirect     int32     //镜像主题真实ID
	Timestamp    time.Time `db:"default(current_timestamp());extra('on update current_timestamp()')";index`
}

//存放一些经常变动的
type Forum_thread_data struct {
	Tid           int32     `db:"pk"`
	Views         int32     `db:"not null;default(0)"`
	Lastpost      int32     `db:"not null;default(0)"`
	Lastposter    string    `db:"not null;type:varchar(15)"`
	Replies       int32     `db:"not null;default(0)"`
	Recommends    int32     `db:"not null;default(0)"`
	Recommend_add int32     `db:"not null;default(0)"`
	Recommend_sub int32     `db:"not null;default(0)"`
	Heats         int32     `db:"not null;default(0)"`
	CutMessage    string    //简短消息预览
	Timestamp     time.Time `db:"default(current_timestamp());extra('on update current_timestamp()')";index`
}
type Forum_thread_moderate struct {
	Id       int32 `db:"not null;default(0);pk"`
	Status   int32 `db:"not null;default(0);index"`
	Dateline int32 `db:"not null;default(0);index"`
}
type Forum_threadrush struct {
	Tid           int32   `db:"not null;default(0);pk"`
	Stopfloor     int32   `db:"not null;default(0)"`
	Starttimefrom int32   `db:"not null;default(0)"`
	Starttimeto   int32   `db:"not null;default(0)"`
	Rewardfloor   []int32 `db:"not null;type:text"`
	Creditlimit   int32   `db:"not null"`
	Replylimit    int16   `db:"not null;default(0)"`
}
type Forum_threadtype struct {
	Typeid       int16  `db:"not null;auto_increment;pk"`
	Fid          int32  `db:"not null;default(0)"`
	Displayorder int16  `db:"not null;default(0)"`
	Name         string `db:"not null;type:varchar(255)"`
	Description  string `db:"not null;type:varchar(255)"`
	Icon         string `db:"not null;type:varchar(255)"`
	Special      int16  `db:"not null;default(0)"`
	Modelid      int16  `db:"not null;default(0)"`
	Expiration   int32  `db:"not null;default(0)"`
	Template     string `db:"not null;type:text"`
	Stemplate    string `db:"not null;type:text"`
	Ptemplate    string `db:"not null;type:text"`
	Btemplate    string `db:"not null;type:text"`
	Ismoderator  bool
	Enable       bool
	Timestamp    time.Time `db:"default(current_timestamp());extra('on update current_timestamp()')"`
}

type Home_notification struct {
	Id          int32  `db:"not null;auto_increment;pk"` //消息id
	Uid         int32  `db:"not null;default(0);index"`  //会员id
	Type        int8   `db:"not null;index"`             //消息类型0=系统，1=私人消息,2=公共消息,3=帖子 4=点评 5=活动，6=悬赏 7=商品 8=提到我的 9=打招呼 10=好友 11=留言 12=评论 13=挺你 14=分享 15=管理工作 16=应用提醒
	New         int8   `db:"not null;default(0);index"`  //是否新消息
	Authorid    int32  `db:"not null;default(0)"`        //留言id
	Author      string `db:"not null;type:varchar(15)"`  //内容
	Note        string `db:"not null;type:text"`
	Dateline    int64  `db:"not null;default(0);index"` //时间戳
	From_id     int32  `db:"not null;default(0);index"`
	From_idtype string `db:"not null;type:varchar(20);index"`
	From_num    int32  `db:"not null;default(0)"` //相同的通知数量
	Category    int8   `db:"not null;default(0);index"`
}
