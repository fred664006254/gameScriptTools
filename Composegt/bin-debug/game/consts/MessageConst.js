var MessageConst;
(function (MessageConst) {
    MessageConst.MESSAGE_GAMECONFIG_LOADED = "message_gameconfig_loaded";
    /**选择门客列表中点击门客 */
    MessageConst.MESSAGE_SELECTED_SERVANT = "message_selected_servant";
    /**
     * 通知刷新主UI，mainUI
     */
    MessageConst.MESSAGE_NOTICE_RESCHANGE_REFRESH_UI = "message_notice_refresh_mainui";
    /**
     * 通知关闭上一个场景
     */
    MessageConst.MESSAGE_NOTICE_HIDE_LAST_SCENE = "message_notice_hide_last_scene";
    /**
     * 主线任务进度更新通知刷新主UI，mainUI
     */
    MessageConst.MESSAGE_NOTICE_MAINTASK_REFRESH_UI = "message_notice_maintask_refresh_mainui";
    /**
     * 新手引导下一步通知
     */
    MessageConst.MESSAGE_NOTICE_ROOKIE_NEXT_STEP = "message_notice_rookie_next_step";
    /**
     * 排行榜刷新选中行
     */
    MessageConst.MESSAGE_NOTICR_REFRESH_RANKITEM = "message_notice_refresh_rankitem";
    /**
     * 道具合成
     */
    MessageConst.MESSAGE_NOTICR_ITEM_COMPOUND = "message_notice_item_compound";
    /**
     * 群组分享检测
     */
    MessageConst.MESSAGE_NOTICE_SHAREGROUP_CHECK = "message)notice_sharegroup_check";
    /**
     * 来聊天
     */
    MessageConst.MESSAGE_NOTICE_CHAT_COME = "message_notice_chat_come";
    /**
     * 开启左侧气泡
     */
    MessageConst.MESSAGE_NOTICE_LEFTBUBBLE = "message_notice_leftbubble";
    /**
     * 聊天翻译刷新
     */
    MessageConst.MESSAGE_NOTICE_CHAT_TRANS = "message_notice_chat_trans";
    /**
     * 商城购买道具
     */
    MessageConst.MESSAGE_NOTICE_SHOP_BUY = "message_notice_shop_buy";
    /**
     * 跑马灯
     */
    MessageConst.MESSAGE_NOTICE_SHOW_LAMP = "message_notice_show_lamp";
    /**
     * 在联姻列表点击联姻
     */
    MessageConst.MESSAGE_NOTICE_ADULT_CLICKMARRY = "message_notice_adult_clickmarry";
    /**
     * 打开邮件详情
     */
    MessageConst.MESSAGE_NOTICE_MAIL_DETAIL = "message_notice_mail_detail";
    /**
     * 刷新邮件列表数据
     */
    MessageConst.MESSAGE_NOTICE_MAIL_REFRESH = "message_notice_mail_refresh";
    /**
     * 在联姻请求列表点击拒绝
     */
    MessageConst.MESSAGE_NOTICE_ADULT_REFUSEMARRY = "message_notice_adult_refusemarry";
    /**
     * 在联姻请求列表点击选择孩子
     */
    MessageConst.MESSAGE_NOTICE_ADULT_CHOOSECHILD = "message_notice_adult_choosechild";
    /**
     *
     * 鳌拜活动刷新
     */
    MessageConst.MESSAGE_WIPEBOSS_REFRESH = "message_wipeboss_refresh";
    MessageConst.MESSAGE_CROSSSERVERWIPEBOSS_REFRESH = "message_crossserverwipeboss_refresh";
    /**
     * 在选择孩子界面点击联姻
     */
    MessageConst.MESSAGE_NOTICE_ADULT_CHILDMARRY = "message_notice_adult_childmarry";
    /**
     * 刷新联姻请求列表
     */
    MessageConst.MESSAGE_NOTICE_ADULT_REFRESHCHILDMARRY = "message_notice_adult_refreshchildmarry";
    /**
     * 刷新成年子嗣列表
     */
    MessageConst.MESSAGE_NOTICE_ADULT_REFRESHADULTVIEW = "message_notice_adult_refreshadultview";
    /**
     * 编辑签名后刷新
     */
    MessageConst.MESSAGE_NOTICE_REFRESHSIGN_AFTER_EDIT = "message_notice_refreshsign_after_edit";
    /**
     * 选服后通知
     */
    MessageConst.MESSAGE_NOTICE_SELECT_SERVERLIST = "message_notice_select_serverlist";
    /**
     * 签到
     */
    MessageConst.MESSAGE_NOTICE_WELFARE_SIGNIN = "message_notice_welfare_signin";
    /**
     * 领取成就奖励
     */
    MessageConst.MESSAGE_NOTICE_ACH_GETREWARD = "message_notice_ach_getreward";
    /**
     * 领取成就详情奖励
     */
    MessageConst.MESSAGE_NOTICE_ACH_GETDETAILREWARD = "message_notice_ach_getdetailreward";
    /**
     * 刷新成就外面的列表
     */
    MessageConst.MESSAGE_NOTICE_ACH_REFRESHLIST = "message_notice_ach_refreshlist";
    /**
     * 领取限时活动奖励
     */
    MessageConst.MESSAGE_NOTICE_ACTIVITY_LIMITEDREWARD = "message_notice_activity_limitedreward";
    /**
     * 宴会加入后刷新
     */
    MessageConst.MESSAGE_NOTICE_DINNER = "message_notice_dinner";
    /**
     * 用户信息model
     */
    MessageConst.MESSAGE_MODEL_USERINFO = "userinfo";
    /**
     * 道具model
     */
    MessageConst.MESSAGE_MODEL_ITEM = "item";
    /**
     * 门客model
     */
    MessageConst.MESSAGE_MODEL_SERVANT = "servant";
    /**
     * 红颜系统model
     */
    MessageConst.MESSAGE_MODEL_WIFE = "wife";
    /**
     * 红颜皮肤系统model
     */
    MessageConst.MESSAGE_MODEL_WIFESKIN = "wifeskin";
    /**
     * 红颜册封系统model
     */
    MessageConst.MESSAGE_MODEL_WIFESTATUS = "wifestatus";
    /**
     * 子嗣系统model
     */
    MessageConst.MESSAGE_MODEL_CHILD = "child";
    /**
     * 成年子嗣／媒婆系统model
     */
    MessageConst.MESSAGE_MODEL_ADULT = "adult";
    /**
     * 商城系统model
     */
    MessageConst.MESSAGE_MODEL_SHOP = "shop";
    /**
     * 关卡系统model
     */
    MessageConst.MESSAGE_MODEL_CHALLENGE = "challenge";
    /**
     * 寻访系统model
     */
    MessageConst.MESSAGE_MODEL_SEARCH = "search";
    /**
     * 资产经营，政务 model
     */
    MessageConst.MESSAGE_MODEL_MANAGE = "manage";
    /**
     * 主线任务系统model
     */
    MessageConst.MESSAGE_MODEL_MAINTASK = "maintask";
    /**
     *每日任务系统model
     */
    MessageConst.MESSAGE_MODEL_DAILYTASK = "dailytask";
    /**
     * 成就系统model
     */
    MessageConst.MESSAGE_MODEL_ACHIEVEMENT = "achievement";
    /**
     * 福利签到model
     */
    MessageConst.MESSAGE_MODEL_ARRIVAL = "arrival";
    /**
     * 其他杂项model
     */
    MessageConst.MESSAGE_MODEL_OTHERINFO = "otherinfo";
    /**
     * 开关系统model
     */
    MessageConst.MESSAGE_MODEL_SWITCH = "switch";
    /**
     * 邮件model
     */
    MessageConst.MESSAGE_MODEL_MYMAIL = "mymail";
    /**
     * 宴会信息model
     */
    MessageConst.MESSAGE_MODEL_DINNER = "dinner";
    /**
     * 活动model
     */
    MessageConst.MESSAGE_MODEL_ACTIVITY = "activity";
    /**
     * 支付model
     */
    MessageConst.MESSAGE_MODEL_PAYMENT = "payment";
    /**
     * 帮会model
     */
    MessageConst.MESSAGE_MODEL_ALLIANCE = "alliance";
    /**
     * 刷新model通知
     */
    MessageConst.MESSAGE_REFRESH_MODE = "message_mode_refresh";
    /**
     * 人望model
     */
    MessageConst.MESSAGE_MODEL_PRESTIGE = "prestige";
    /**
     * 擂台model
     */
    MessageConst.MESSAGE_MODEL_ATKRACE = "atkrace";
    /**
     * 渠道登录成功
     */
    MessageConst.MESSAGE_PLAT_LOGIN_SUCCESS = "message_plat_login_success";
    /**
     * 赏赐红颜
     */
    MessageConst.MESSAGE_NOTICE_WIFE_GIVE = "message_notice_wife_give";
    /**
     * 红颜技能升级
     */
    MessageConst.MESSAGE_NOTICE_WIFE_SKILLUPD = "message_notice_wife_skillupd";
    //养育技能
    MessageConst.MESSAGE_NOTICE_WIFE_ARSKILLUPD = "message_notice_wife_arskillupd";
    MessageConst.MESSAGE_REFRESH_SERVANT_ITEMLIST = "message_refresh_servant_itemlist";
    MessageConst.MESSAGE_REFRSH_SERVANT_ITEM_USE = "message_refresh_servant_itemUse";
    /**
     * 红颜争霸刷新Model
     */
    MessageConst.MESSAGE_WIFEBATTLE_REFRESHVO = "message_wifebattle_refreshvo";
    /**
     * 红颜争霸刷新Model
     */
    MessageConst.MESSAGE_WIFEBATTLE_REFRESH = "message_wifebattle_refresh";
    /**
     * 跨服红颜争霸刷新Model
     */
    MessageConst.MESSAGE_CROSSSERVERWIFEBATTLE_REFRESHVO = "message_crossserverwifebattle_refreshvo";
    /**
     * 跨服红颜争霸刷新Model
     */
    MessageConst.MESSAGE_CROSSSERVERWIFEBATTLE_REFRESH = "message_crossserverwifebattle_refresh";
    /**
     * 购买惩戒道具
     */
    MessageConst.MESSAGE_NOTICE_PUNISH_BUYITEM = "message_notice_punish_buyitem";
    /**
     * 使用积分购买活动商店物品
     */
    MessageConst.MESSAGE_NOTICE_PUNISH_EXITEM = "message_notice_punish_exitem";
    /**
     * 刷新道具合成界面
     */
    MessageConst.MESSAGE_REFRESH_ITEMVIEWTAB2 = "message_refresh_itemviewtab2";
    /**
     * 申请军团
     */
    MessageConst.MESSAGE_ALLIANCE_APPLYALLIANCE = "message_alliance_applyalliance";
    /**
     * 取消申请
     */
    MessageConst.MESSAGE_ALLIANCE_CANCELAPPLYALLIANCE = "message_alliance_cancelapplyalliance";
    /**
     * 在军团申请列表点击拒绝
     */
    MessageConst.MESSAGE_ALLIANCE_REFUSEAPPLY = "message_alliance_refuseapply";
    /**
     * 在军团申请列表点击同意
     */
    MessageConst.MESSAGE_ALLIANCE_AGREEAPPLY = "message_alliance_agreeapply";
    /**
     * 重置擂台通知
     */
    MessageConst.MESSAGE_RESET_ATKRACE = "message_reset_atkrace";
    MessageConst.MESSAGE_RESET_ATKRACECROSS = "message_reset_atkracecross";
    MessageConst.MESSAGE_ATKRACECROSS_FIGHTEND = "message_atkracecross_fightend";
    /**
     * 转让帮主
     */
    MessageConst.MESSAGE_ALLIANCE_TRANSFER = "message_alliance_transfer";
    /**
     * 退出军团
     */
    MessageConst.MESSAGE_ALLIANCE_EXITALLIANCE = "message_alliance_exitalliance";
    /**
     * 被批准入团
     */
    MessageConst.MESSAGE_ALLIANCE_BEJOIN = "message_alliance_bejoin";
    /**
     * 被踢出团
     */
    MessageConst.MESSAGE_MESSAGE_ALLIANCE_BEKICK = "message_alliance_bekick";
    MessageConst.MESSAGE_STUDYATK_FINISH = "message_studyatk_finish";
    /**
     * 解散军团
     */
    MessageConst.MESSAGE_ALLIANCE_DISBAND = "message_alliance_disband";
    /**
     * 军团建设
     */
    MessageConst.MESSAGE_NOTICE_ALLIANCE_BUILD = "message_notice_alliance_build";
    MessageConst.MESSAGE_NOTICE_ALLIANCE_BOSSITEM = "message_notice_alliance_bossitem";
    /**
     * 登出消息
     */
    MessageConst.MESSAGE_NOTICE_LOGOUT = "message_notice_logout";
    MessageConst.MESSAGE_NOTICE_CHANGE_IMG = "message_notice_change_img";
    /**
     * rsdk初始化成功通知
     */
    MessageConst.MESSAGE_NOTICE_RSDK_INIT_SUCCESS = "message_notice_rsdk_init_success";
    MessageConst.MESSAGE_NOTICE_RESFESH_DAILYTASK_AFTER_SYNC = "message_notice_refresh_dailytask_afrer_sync";
    /**
     * 新手引导下一步
     */
    MessageConst.MESSAGE_NOTICE_GUIDE_NEXT = "message_notice_guide_next";
    /**
     * 关闭关卡
     */
    MessageConst.MESSAGE_NOTICE_CLOSE_CHALLENGE = "message_notice_close_challenge";
    /**
     * 新手引导大地图滚动
     */
    MessageConst.MESSAGE_NOTICE_GUIDE_CITYSCENE_SCROLL = "message_notice_guide_cityscene_scroll";
    /**
     * 新手引导大地图滚动2，用于引导层结束时，释放大地图的锁定状态
     */
    MessageConst.MESSAGE_NOTICE_GUIDE_CITYSCENE_SCROLL2 = "message_notice_guide_cityscene_scroll2";
    /**
     * 新手引导显示手
     */
    MessageConst.MESSAGE_NOTICE_GUIDE_SHOWHAND = "message_notice_guide_showhand";
    /**
     * 主线任务第四步完成手
     */
    MessageConst.MESSAGE_NOTICE_TASK_SHOWHAND = "message_notice_task_showhand";
    /**
     * 经营刷新数
     */
    MessageConst.MESSAGE_NOTICE_REFRESH_COUNT = "message_notice_refresh_count";
    /**
     * 充值页面跳转
     */
    MessageConst.MESSAGE_RECHARFGE_RE = "message_recharfge_re";
    /**
     * 关闭牢房黑色背景
     */
    MessageConst.MESSAGE_CLOSE_BLACKPANEL = "message_close_blackPanel";
    /**
     * 生孩子触发引导
     */
    MessageConst.MESSAGE_CHILD_GUIDE = "message_child_guide";
    /**
     * 酒楼触发引导
     */
    MessageConst.MESSAGE_DINNER_GUIDE = "message_dinner_guide";
    /**
     * 酒楼触发引导
     */
    MessageConst.MESSAGE_MAINUI_CHALLENGE = "message_mainui_challenge";
    MessageConst.MESSAGE_REFRESH_TRADE_AFTER_FIGHT = "message_refresh_trade_after_fight";
    /**
     * 通知检测关注状态
     */
    // export let MESSAGE_CHECK_ATTENTION_ICON:string="message_check_attention_icon";
    /**
     * 玩吧分享成功
     */
    MessageConst.MESSAGE_WANBA_SHARE_SUCCESS = "message_wanba_share_success";
    /**
     * 港台登录通知
     */
    MessageConst.MESSAGE_NOTICE_TWLOGIN = "message_notice_twlogin";
    /**
     * 绑定账号查询结果通知
     */
    MessageConst.MESSAGE_NOTICE_BIND = "message_notice_bind";
    MessageConst.MESSAGE_NOTICE_REFRESH_SPECIAL_AVATAR = "message_notice_refresh_special_avatar";
    /**
     * IOS绑定手机
     */
    MessageConst.MESSAGE_IOS_BINDPHONE = "message_ios_bindphone";
    /**
     * 通知游戏登录背景加载完成了
     */
    MessageConst.MESSAGE_NOTICE_LOGINBG_LOAD_COMPLETE = "message_notice_loginbg_load_complete";
    /**
     * 充值礼包到期
     */
    MessageConst.MESSAGE_RECHARFGE_BOX_TIMEOUT = "message_recharfge_box_timeout";
    /**
     * 刷新充值界面
     */
    MessageConst.MESSAGE_REFRESH_RECHARGE_VIEW = "message_refresh_recharge_view";
    /**
     * 刷新终身卡界面
     */
    MessageConst.MESSAGE_REFRESH_YEARCARD_VIEW = "message_refresh_yearcard_view";
    /**
     * 刷新功能预览文字
     */
    MessageConst.MESSAGE_REFRESH_FUNCTION_TXT = "message_refresh_function_txt";
    MessageConst.MESSAGE_REFRESH_SKIN_HEADBG = "message_refresh_skin_headbg";
    /**
     * 关闭牢房详情界面
     */
    MessageConst.MESSAGE_CLOSE_POPUPVIEW = "message_close_popupview";
    /**
     * 取消屏蔽
     */
    MessageConst.MESSAGE_CANCEBLOCK = "message_canceblock";
    /**
     * 宠幸完成
     */
    MessageConst.MESSAGE_WIFE_LOVECOM = "message_wife_lovecom";
    /**
     * 红颜许愿跨天
     */
    MessageConst.MESSAGE_WISHTRER_NEXTDAY = "message_wishtree_nextday";
    /**
     * 商城热卖跨天
     */
    MessageConst.MESSAGE_SHOP_NEXTDAY = "message_shop_nextday";
    /**
     * 礼包消息更新
     */
    MessageConst.MESSAGE_SHOP_PAY = "message_shop_pay";
    /**
     * 隐藏显示NPC
     */
    MessageConst.MESSAGE_CHECKNPC_SHOW = "message_checknpc_show";
    /**
     * 狂欢节活动消费金额更改消息
     */
    MessageConst.MESSAGE_ACCARNIVAL_CHANGE_CHARGE = "message_accarnival_change_charge";
    MessageConst.MESSAGE_ACCARNIVAL_CHANGE_COST = "message_accarnival_change_cost";
    /**
     * 米莎来了活动vo消息更改
     */
    MessageConst.MESSAGE_ACWIFECOME_VOCHANGE = "message_acwifecome_vochange";
    MessageConst.MESSAGE_DAILYCHARGE_REFRESH_V = "message_dailycharge_refresh_v";
    /**
     * 洗澡活动刷新vo
     */
    MessageConst.MESSAGE_ACWIFEBATHING_REFRESHVO = "message_acwifebathing_refreshvo";
    /**
     * 档位返还元宝，数据刷新
     */
    MessageConst.MESSAGE_RECHARGEREBATE_REFRESH_V = "message_rechargerebate_refresh_v";
    MessageConst.MESSAGE_AC_RECHARGE_CLOSE = "message_ac_recharge_close";
    MessageConst.MESSAGE_RECHARGE_CLOSE = "message_recharge_close";
    /**
     * 五一活动数据刷新
     */
    MessageConst.MESSAGE_MAYDAY_FRESH_ITEM = "message_mayday_fresh_item";
    MessageConst.MESSAGE_MAYDAY_FRESHTURNTABLE = "message_mayday_freshturntable";
    /**
     * 充值转盘数据刷新
     */
    MessageConst.MESSAGE_MAYDAYRECHARGE_FRESH_ITEM = "message_maydayrecharge_fresh_item";
    MessageConst.MESSAGE_MAYDAYRECHARGE_FRESHTURNTABLE = "message_maydayrecharge_freshturntable";
    /**
     *
     * 福袋活动
     *
     */
    //刷新数据
    MessageConst.MESSAGE_LUCKBAG_REFRESHVO = "message_luckbag_refreshvo";
    MessageConst.MESSAGE_LUCKBAG_REFRESHBAG = "message_luckbag_refreshbag";
    /**
     * 众筹
     */
    MessageConst.MESSAGE_LOTTERY_REFRESHVO = "message_lottery_refreshvo";
    /**
     * otherinfo 刷新
     */
    MessageConst.MESSAGE_OTHERINFO_REFRESHVO = "message_otherinfo_refreshvo";
    /**
     * 限时礼包
     */
    MessageConst.MESSAGE_LIMITEDGIFT_REFRESHLIST = "message_limitedgift_refreshlist";
    /**
     *
     * 每日小额奖励
     */
    MessageConst.MESSAGE_DAILYGIFT_REFRESHVO = "message_dailygift_refreshvo";
    /**
     * 帮会充值刷新model
     *
     */
    MessageConst.MESSAGE_ALLIANCERECHARGE_REFRESHVO = "message_alliancerecharge_refreshvo";
    /**
     * 刷新实名认证
     */
    MessageConst.MESSAGE_REALNAME = "message_realname";
    MessageConst.MESSAGE_NOTICE_RESFESH_NEWYEAR_ITEM = "message_notice_refresh_newyear_item";
    MessageConst.MESSAGE_RESFESH_NEWYEAR_LIST = "message_refresh_newyear_list";
    MessageConst.MESSAGE_RESFESH_SPRING_ITEM = "message_refresh_spring_item";
    MessageConst.RESFESH_SPRING_TAB = "refresh_spring_tab";
    MessageConst.MESSAGE_RESFESH_SPRING_TAB = "message_refresh_spring_TAB";
    /**
     * 仕途红点
     */
    MessageConst.MESSAGE_RESFESH_NEWYEAR_REDHOT = "message_refresh_newyear_redhot";
    /**
     * 实名认真领取奖励刷新
     */
    MessageConst.MESSAGE_MAINUI_REALNAMEREWARDS = "message_mainui_realnamerewards";
    /**
     * 关闭册封成功界面
     */
    MessageConst.MESSAGE_WIFESTATUS_SHOWCLOSE = "message_wifestatus_showclose";
    /**
     * 计算册封
     */
    MessageConst.MESSAGE_WIFESTATUS_STATE = "message_wifestatus_state";
    MessageConst.MESSAGE_REFRESH_PRACTICE_RED = "message_refresh_practice_red";
    MessageConst.MESSAGE_REFRESH_STORAGE = "message_refresh_storafe";
    /**
     * 七夕灯会相关
     */
    MessageConst.MESSAGE_NOTICE_DOUBLESEVEN_FRESH = "message_doubleseven_fresh";
    /**
     * 月夜
     */
    MessageConst.MESSAGE_MOONNIGHT_FRESH = "message_moonnight_fresh";
    /**
     * 红莲活动刷新数据
     */
    MessageConst.MESSAGE_REDLOTUSWARRIOR_REFRESHVO = "message_redlotuswarrior_refreshvo";
    /**
     * 平成时代刷新数据
     */
    MessageConst.MESSAGE_REIGNTITLE_REFRESHVO = "message_reigntitle_refreshvo";
    /**
     *  中秋活动相关
     */
    MessageConst.MESSAGE_ACMIDAUTUMN_TASKANDRECHARGE = "message_acmidautumn_taskandrecharge";
    /**
     *  翠玉生辉 刷新model
     */
    MessageConst.MESSAGE_ACJADE_REFRESHVO = "message_acjade_refreshvo";
    /**
     *  筑阁祭天 刷新model
     */
    MessageConst.MESSAGE_BUILDINGWORSHIP_REFRESHVO = "message_buildingWorship_refreshvo";
    /**
     *  荷塘月色 刷新model
     */
    MessageConst.MESSAGE_MOONLIGHT_REFRESHVO = "message_moonlight_refreshvo";
    /**
     *  许愿天灯 刷新model
     */
    MessageConst.MESSAGE_LANTERN_REFRESHVO = "message_lantern_refreshvo";
    /**
     *  夏日欢心 刷新model
     */
    MessageConst.MESSAGE_SEASIDEGAME_REFRESHVO = "message_seasidegame_refreshvo";
    /**
     *  携美同游 刷新model
     */
    MessageConst.MESSAGE_SPRINGOUTING_REFRESHVO = "message_springouting_refreshvo";
    /**
     *  合服纪念活动刷新model
     */
    MessageConst.MESSAGE_MERGEACTIVE_REFRESHVO = "message_mergeactive_refreshvo";
    /**
     *  圣诞节 刷新model
     */
    MessageConst.MESSAGE_ACCHRISTMAS_REFRESHVO = "message_acchristmas_refreshvo";
    /**
     * 破冰红包 刷新model
     *
     */
    MessageConst.MESSAGE_ACICEBREAKINGGIFT_REFRESHVO = "message_acicebreakinggift_refreshvo";
    /**
     *  惊喜回馈 刷新model
     */
    MessageConst.MESSAGE_ACSURPRISEDGIFT_REFRESHVO = "message_acsurprisedgift_refreshvo";
    /**
     *  我要变强 红点刷新
     */
    MessageConst.MESSAGE_STRENGTHEN = "message_strengthen";
    /**
     * 端午活动消息
     */
    MessageConst.MESSAGE_DBDAY_FRESH_ITEM = "message_dbday_fresh_item";
    //元宝寻访获得红颜后，刷新列表
    MessageConst.MESSAGE_SEARCHGEM_REFRESH = "message_searchgem_refresh";
    /**
     * 每日礼包跨天
     */
    MessageConst.MESSAGE_DAILYACTIVITY_REFRESH = "message_dailyactivity_refresh";
    /**
     * 帮会战基本数据更新
     */
    MessageConst.MESSAGE_NOTICE_ALLIANCEWARFRESH = "message_alliancewar_fresh";
    //一键擂台，请求失败刷新
    MessageConst.MESSAGE_ATKRACE_BATCH_FIGHT_RET_REFRESH = "MESSAGE_ATKRACE_BATCH_FIGHT_RET_REFRESH";
    //好友相关
    MessageConst.MESSAGE_FRIENDS_REFRESH_LISTITEM3 = "message_friends_refresh_listitem3";
    MessageConst.MESSAGE_FRIENDS_REFRESH_GIFTRED = "message_friends_refresh_giftred";
    MessageConst.MESSAGE_FRIENDS_SWITCH_TAB = "message_friends_switch_tab";
    MessageConst.MESSAGE_FRIENDS_MODEL_CHANGE = "message_friends_model_change";
    MessageConst.MESSAGE_FRIENDS_NEW_RECEIVE = "message_friends_new_receive";
    MessageConst.MESSAGE_FRIENDS_NEW_APPLYCHANGE = "message_friends_new_aoolychange";
    MessageConst.MESSAGE_FRIENDS_NEW_FRIENDSCHANGE = "message_friends_new_friendschange";
    MessageConst.MESSAGE_FRIENDS_HIDE_FRIENDS_OR_SADUN = "message_friends_hide_friends_or_sadun";
    /**
     * 私聊消息获取
     */
    MessageConst.MESSAGE_PRICHAT_GETMSG = "message_prichat_getmsg";
    MessageConst.MESSAGE_PRICHAT_FRESHVIEW = "message_prichat_freshview";
    /**
     * 亲家相关
     */
    MessageConst.MESSAGE_NOTICE_SUDANFRESH = "message_sadun_fresh";
    MessageConst.MESSAGE_NOTICE_ADULT_CHOOSE_SADUNMARRY = "message_sadun_marry";
    MessageConst.MESSAGE_NOTICE_ADULT_CLOSECHOOSE = "message_adult_closechoose";
    MessageConst.MESSAGE_NOTICE_ADULTFRESH = "message_adult_fresh";
    /**
     * 门客皮肤穿戴切换状态
     */
    MessageConst.MESSAGE_NOTICE_SERVANT_SKIN_SWITCH = "message_notice_servant_skin_switch";
    MessageConst.MESSAGE_NOTICE_FROM_SERVANT_SKIN = "message_notice_from_servant_skin";
    /**
     * 门客骨骼动画重复 事件
     */
    MessageConst.MESSAGE_SERVANTBONE = "message_servantbone";
    /**
     * 议事阁派遣消息
     */
    MessageConst.MESSAGE_NOTICE_COUNCIL_TEAMCHANGE = "message_notice_council_teamchange";
    /**
     * 议事阁刷新消息
     */
    MessageConst.MESSAGE_NOTICE_COUNCIL_FRESHMODEL = "message_notice_council_freshmodel";
    /**
     * 帮会任务
     */
    MessageConst.MESSAGE_ALLIANCE_TASK_SERVANT = "message_alliance_task_servant";
    MessageConst.MESSAGE_ALLIANCE_TASK_BUY_AND_SEND = "message_alliance_task_byg_and_send";
    MessageConst.MESSAGE_ALLIANCE_TASK_RESET_SERVANT = "message_alliance_task_reset_servant";
    MessageConst.MESSAGE_NOTICE_BEKING_TASK = "message_notice_beking_task";
    /**
     * 关闭服务器列表界面回调
     */
    MessageConst.MESSAGE_CLOSE_SEVERLISTPOPUPVIEW = "message_close_severlistpopupview";
    MessageConst.MESSAGE_CROSS_SERVANT_REFRESH = "MESSAGE_CROSS_SERVANT_REFRESH";
    MessageConst.MESSAFE_CROSS_SERVANT_GOTASK = "MESSAFE_CROSS_SERVANT_GOTASK";
    MessageConst.MESSAGE_NOTICE_MAINTASK_GUIDE = "MESSAGE_NOTICE_MAINTASK_GUIDE";
    /*
* 绝地擂台战斗结束
*/
    MessageConst.MESSAGE_BATTLEGROUND_BATTLEEND = "message_battleground_end";
    /*
    * 绝地擂台关闭弹窗
    */
    MessageConst.MESSAGE_BATTLEGROUND_FIGHTBEGIN = "message_battleground_fightbegin";
    MessageConst.MESSAGE_FANLIREVIEW_RECALL_ANI_END = "MESSAGE_FANLIREVIEW_RECALL_ANI_END";
    MessageConst.MESSAGE_FANLIREVIEW_RECALL_NUM_REFRESH = "MESSAGE_FANLIREVIEW_RECALL_NUM_REFRESH";
    //篝火活动
    MessageConst.MESSAGE_WIFESKININHERIT_RECALL_ANI_END = "MESSAGE_WIFESKININHERIT_RECALL_ANI_END";
    MessageConst.MESSAGE_WIFESKININHERIT_RECALL_NUM_REFRESH = "MESSAGE_WIFESKININHERIT_RECALL_NUM_REFRESH";
    MessageConst.MESSAGE_XINGCUN_TASK_REFRESH = "MESSAGE_XINGCUN_TASK_REFRESH";
    MessageConst.MESSAGE_RANSACTARTIOR_REFRESH = "MESSAGE_RANSACTARTIOR_REFRESH"; //奸臣皮肤mode刷新
    MessageConst.MESSAGE_STARGAZERSINGLEVO_REFRESH = "MESSAGE_STARGAZERSINGLEVO_REFRESH"; //夜观天象皮肤mode刷新
    MessageConst.MESSAGE_RANSACTARTIORSP_REFRESH = "MESSAGE_RANSACTARTIORSP_REFRESH"; //奸臣皮肤mode刷新
    MessageConst.MESSAGE_STARGAZER_REFRESH = "MESSAGE_STARGAZER_REFRESH"; //夜观天象mode刷新
    MessageConst.MESSAGE_FLIPCARD_TASK_REFRESH = "MESSAGE_FLIPCARD_TASK_REFRESH";
    MessageConst.MESSAGE_FLIPCARD_REWARD_END = "MESSAGE_FLIPCARD_REWARD_END";
    MessageConst.MESSAGE_MONOPOLY_TASK_REFRESH = "MESSAGE_MONOPOLY_TASK_REFRESH";
    MessageConst.MESSAGE_MONOPOLY_TASKLIST_REFRESH = "MESSAGE_MONOPOLY_TASKLIST_REFRESH";
    /**
 * 回归活动刷新消息
 */
    MessageConst.MESSAGE_RETURN_FRESH_ITEM = "message_return_fresh_item";
    MessageConst.EXAMANSWER_POINTCHANGE = "EXAMANSWER_POINTCHANGE";
    MessageConst.MESAAGE_ONEPACK_VO_CHANGE = "MESAAGE_ONEPACK_VO_CHANGE";
    MessageConst.MESAAGE_ONERANK_VO_CHANGE = "MESAAGE_ONEPACK_VO_CHANGE";
    MessageConst.MESAAGE_ONESIGN_VO_CHANGE = "MESAAGE_ONESIGN_VO_CHANGE";
    /** 麦田飘香刷新 */
    MessageConst.MESSAGE_RYEHARVEST_FRESH_ITEM = "MESSAGE_RYEHARVEST_FRESH_ITEM";
    /**
     *  箭无虚发 刷新model
     */
    MessageConst.MESSAGE_ARROW_REFRESHVO = "message_arrow_refreshvo";
    /** 追缴敌寇刷新 */
    MessageConst.MESSAGE_CHASEBANDIT_FRESH_ITEM = "MESSAGE_CHASEBANDIT_FRESH_ITEM";
    /** 狂欢之夜刷新 */
    MessageConst.MESSAGE_CARNIVALNIGHT_FRESH_ITEM = "MESSAGE_CARNIVALNIGHT_FRESH_ITEM";
    /** 双十一转盘刷新 */
    MessageConst.MESAAGE_GEMLOTTERY_FRESH_ITEM = "MESAAGE_GEMLOTTERY_FRESH_ITEM";
    /**
     * 定军中原
     */
    MessageConst.MESSAGE_MAINLAND_SERVANT_CHANGE = "message_mainland_servant_change";
    MessageConst.MESSAGE_MAINLAND_CLOSE = "message_mainland_close";
    /**
     *  感恩节晚餐 刷新model
     */
    MessageConst.MESSAGE_THXGIVINGREFRESHVO = "message_thxgiving_refreshvo";
    /**
     *  2019圣诞 刷新model
     */
    MessageConst.MESSAGE_MERRYXMAS_REFRESHVO = "message_merryxmas_refreshvo";
    /**
     * 五虎活动 刷新model
     */
    MessageConst.MESSAGE_FIVETIGERS_REFRESHVO = "message_fivetigers_refreshvo";
    /**
     * 合成元素移动
     */
    MessageConst.MESSAGE_COMPOSE_ITEM_MOVE = "message_compose_item_move";
    /** 合成解锁地块 */
    MessageConst.MESSAGE_COMPOSE_UNLOCK_CELL = "message_compose_unlock_cell";
    /** 合成地图引导可解锁的地块 */
    MessageConst.MESSAGE_COMPOSE_SHOWUNLOCK = "message_compose_showunlock";
    /** 合成地图取消引导可解锁的地块 */
    MessageConst.MESSAGE_COMPOSE_HIDEUNLOCK = "message_compose_hideunlock";
    /** 合成回到合成界面 */
    MessageConst.MESSAGE_COMPOSE_GOCOMPOSESCENE = "message_compose_gocomposescene";
    /**增加小人 */
    MessageConst.MESSAGE_COMPOSE_ADDPERSON = "message_compose_addperson";
    /** 引导点击玩家头像 */
    MessageConst.MESSAGE_COMPOSE_SHOWUHEADHAND = "message_compose_showheadhand";
    /** 征收添加资源 */
    MessageConst.MESSAGE_LEVY_ADD_GOODS = "message_levy_add_goods";
    /** 征收某个进度条满 */
    MessageConst.MESSAGE_LEVY_PROGRESS_FULL = "message_levy_progress_full";
    /** 征收恢复滑动列表滚动 */
    MessageConst.MESSAGE_LEVY_SCOLL_CANTOUCH = "message_levy_scoll_cantouch";
    /**
     * 刷新界面隐藏的东西
     */
    MessageConst.MESSAGE_REFRESH_UNLOCK = "message_refresh_unlock";
    /**
     * 合成地图信息model
     */
    MessageConst.MESSAGE_MODEL_COMPOSEMAP = "composemap";
    /**征收刷新vo*/
    MessageConst.MESSAGE_REFRESHVO_LEVY = "message_refreshvo_levy";
    /**
     * 游戏socket开始重连
     */
    MessageConst.MESSAGE_GAMESOCKET_RECOUNT = "message_gamesocket_recount";
    /** 合成解锁地块 */
    MessageConst.MESSAGE_UNLOCK_MAPGROUP = "message_unlock_mapgroup";
    /**
     * 主界面按钮滚动
     */
    MessageConst.MESSGAE_MAINUI_BTNSCROLL = "messgae_mainui_btnscroll";
    /**主界面设置按钮滚动为显示或者隐藏状态 */
    MessageConst.MESSAGE_SET_MUI_BTNSROLL = "message_set_mui_btnsroll";
    /**装备进阶选择物品 */
    MessageConst.EQUIP_REVOLUTION_CHOOSE = "quip_rebolution_choose";
    /**跳转门客界面 */
    MessageConst.SERVANT_CHANGE = "servant_change";
    /**擂台门客攻击动作播放到撞击触发 */
    MessageConst.MESSAGE_ATKRACE_SER_HIT = "message_atkrace_ser_hit";
    /**擂台门客战死 */
    MessageConst.MESSAGE_ATKRACE_SER_DIE = "message_atkrace_ser_die";
})(MessageConst || (MessageConst = {}));
