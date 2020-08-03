package protocol

const (
	TokenOk                             = 2
	Success                             = 1  //成功
	Fail                                = 0  //操作失败
	Err_db                              = -1 //数据库操作失败
	Err_token                           = -2 //token错误
	Err_msg                             = -3
	LoginFail                           = -4
	Err_Password                        = -5 //密码错误
	Err_freezing                        = -6 //账号冻结停用
	Err_Notlogin                        = -7 //未登录
	Err_Seccode                         = -8
	Err_param                           = -9  //提交数据错误
	Err_ShieldingWord                   = -10 //屏蔽字
	Err_forumId                         = -11 //没有找到板块
	Err_NotFoundUser                    = -12 //没有找到用户
	Err_Group                           = -13 //用户组错误
	Err_Groupperm                       = -14 //没有权限
	Err_NotFoundThread                  = -15 //没有找到主题
	Err_NotFoundPost                    = -16 //没有找到回复
	Err_SubjectShieldingWord            = -17 //标题含有屏蔽字
	Err_Typeid                          = -18 //主题分类错误
	Err_Special1                        = -19 //不允许发布特殊主题
	Err_Special2                        = -20
	Err_Special3                        = -21
	Err_Special4                        = -22
	Err_Special5                        = -23
	Err_emptyMessage                    = -24 //标题或者内容不能为空
	Err_message_toolong                 = -25 //内容太长
	Err_message_tooshort                = -26 //内容太短
	Err_flood_ctrl                      = -27 //发帖间隔太短
	Err_flood_ctrl_hour                 = -28 //超过每小时发帖限制
	Err_TagShieldingWord                = -29 //标签含有屏蔽字
	Err_addTag                          = -30 //新增标签失败
	Err_insert_Forum_thread             = -31 //新增主题数据失败
	Err_updatemoderate                  = -32 //更新管理数据失败
	Err_Updatepostcredits               = -33 //更新积分数据失败
	Err_updateRecentnote                = -34 //更新个人空间信息失败
	Err_Insert_Forum_post               = -35 //新增回复数据失败
	Err_insert_Forum_sofa               = -36 //新增沙发数据失败
	Err_ThreadType                      = -37 //不允许的操作
	Err_Position                        = -38 //楼层不存在
	Err_NotEnoughAttachs                = -39 //每天可以上传的附件数量已达上限
	Err_NotEnoughAttachsize             = -40 //每天可以上传的附件文件大小已达上限
	Err_Imgtype                         = -41 //不支持的图片格式
	Err_threadClosed                    = -42 //当前帖子已关闭，不再接受新内容
	Err_CdnRefresh                      = -43 //cdn刷新失败
	Err_Maxsigsize                      = -44 //签名内容太长
	Err_HasRecommended                  = -45 //已经支持过了
	Err_RecommendClose                  = -46 //点评功能未开启
	Err_RecommendOwnthread              = -47 //不能点评自己的帖子
	Err_sendmailinterval                = -48 //邮件发送太频繁
	Err_register_Email                  = -49 //注册邮箱不合法
	Err_Alreadyregistered               = -50 //已经注册过
	Err_register_NofondGroup            = -51 //找不到用户组信息
	Err_register_CreateMember           = -52 //创建member失败
	Err_register_CreateMemberCount      = -53 //创建MemberCount失败
	Err_register_CreateMemberFieldForum = -54
	Err_emailVerify                     = -55 //邮箱激活失败
	Err_AlreadyUsedEmail                = -56 //邮箱已经被使用
	Err_EmailSendFail                   = -57 //邮件发送失败
	Err_emailNotVerify                  = -58 //邮箱未验证
	Err_EmailSeccode                    = -59 //email验证码不正确或者已超时
	Err_QQloginFailed                   = -60 //QQ登录失败
	Err_QQbind                          = -61 //QQ已经绑定其他账号
	Err_ThreadPollEmptyChoice           = -62 //选项不能为空
	Err_ThreadPollMaxChoice             = -63 //最多可选数量错误
	Err_ThreadPollExpiration            = -64 //记票天数不能为负
	Err_ThreadPolloptionLen             = -65 //要有2个以上选项
	Err_filePermission                  = -66 //服务器文件读写失败
	Err_ThreadPollNotFound              = -67 //投票详情未找到
	Err_ThreadPollOptionNotFound        = -68 //投票选项未找到
	Err_Insert_Forum_poll               = -69 //修改投票详情失败
	Err_Insert_Forum_polloption         = -70 //修改投票选项失败
	Err_ThreadPollImg                   = -71 //投票图片上传失败
	Err_ThreadPollallready              = -72 //您已经投过票了
	Err_ThreadPollChoiceErr             = -73 //必须提交有一个有效选项
	Err_insert_thread_data              = -74 //更新帖子信息失败
	Err_insert_thread_forum             = -75 //更新论坛数据失败
	Err_PasswordShort                   = -76 //密码长度太短
	Err_NewThreadType                   = -77 //帖子操作类型错误
	Err_TokenTimeout                    = -78 //token超时
	Err_DuplicateSubmit                 = -79 //重复提交
)

var ErrcodeMsg = map[int16]string{
	1:   "成功",
	0:   "操作失败",
	-1:  "数据库操作失败",
	-2:  "token错误",
	-3:  "无法解析的返回结果",
	-4:  "登录失败",
	-5:  "账号或者密码错误",
	-6:  "账号冻结停用",
	-7:  "您需要先登录才能继续本操作",
	-8:  "验证码错误",
	-9:  "参数错误，请刷新页面重试",
	-10: "包含敏感词无法操作",
	-11: "没有找到板块",
	-12: "没有找到用户",
	-13: "用户组错误",
	-14: "您所在的用户组没有权限操作",
	-15: "主题不存在",
	-16: "回复不存在",
	-17: "标题含有敏感词，请修改后再试",
	-18: "请选择主题分类",
	-19: "当前论坛，您没有发布投票权限",
	-20: "当前论坛，您没有发布商品权限",
	-21: "当前论坛，您没有发布悬赏权限",
	-22: "当前论坛，您没有发布活动权限",
	-23: "当前论坛，您没有发布辩论权限",
	-24: "标题或者内容不能为空",
	-25: "内容太长",
	-26: "内容太短",
	-27: "发帖间隔太短，请稍后再试",
	-28: "超过每小时发帖限制，请稍后再试",
	-29: "标签含有敏感词，请修改后再试",
	-30: "新增标签失败",
	-31: "新增主题数据失败",
	-32: "更新管理数据失败",
	-33: "更新积分数据失败",
	-34: "更新个人空间信息失败",
	-35: "新增回复数据失败",
	-36: "新增沙发数据失败",
	-37: "主题不允许的操作类型",
	-38: "该楼层不存在",
	-39: "每天可以上传的附件数量已达上限",
	-40: "每天可以上传的附件文件大小已达上限",
	-41: "不支持的图片格式",
	-42: "当前帖子已关闭，不再接受新内容",
	-43: "CDN刷新失败",
	-44: "签名内容太长，请缩短重试",
	-45: "已经对该贴操作支持反对",
	-46: "点评功能未开启",
	-47: "不能点评自己的帖子",
	-48: "邮件发送太频繁,请稍后再试",
	-49: "邮箱格式不合法",
	-50: "该账号已经注册",
	-51: "找不到用户组信息",
	-52: "创建用户失败",
	-53: "创建用户统计信息失败",
	-54: "创建用户论坛信息失败",
	-55: "邮箱验证失败，请重发邮件再试",
	-56: "该邮箱已经被使用,请换一个再试",
	-57: "邮件发送失败，请联系管理员",
	-58: "该用户邮箱未激活，无法使用这个功能",
	-59: "email验证码不正确或者已超时",
	-60: "QQ登录失败，请重新登录",
	-61: "该QQ已经绑定其他账号，请直接登录",
	-62: "选项不能为空",
	-63: "最多可选数量错误",
	-64: "记票天数不能为负",
	-65: "只能有2-10个选项",
	-66: "服务器文件读写失败，请截图反馈给管理",
	-67: "投票详情未找到",
	-68: "投票选项未找到",
	-69: "修改投票详情失败",
	-70: "修改投票选项失败",
	-71: "投票图片上传失败，请刷新页面重新上传",
	-72: "您已经投过票了",
	-73: "必须提交有一个有效选项",
	-74: "更新帖子信息失败",
	-75: "更新论坛数据失败",
	-76: "密码长度太短",
	-77: "帖子操作类型错误",
	-78: "当前操作已超时，请刷新再试",
	-79: "处理中请稍等，请勿重复提交数据",
}
