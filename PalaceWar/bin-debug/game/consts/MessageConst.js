var MessageConst;
(function (MessageConst) {
    MessageConst.MESSAGE_GAMECONFIG_LOADED = "message_gameconfig_loaded";
    /**选择门客列表中点击门客 */
    MessageConst.MESSAGE_SELECTED_SERVANT = "message_selected_servant";
    /**选择门客皮肤 */
    MessageConst.MESSAGE_SELECTED_SERVANT_SKIN = "message_selected_servant_skin";
    /**选择门客神器加工页签 */
    MessageConst.MESSAGE_SELECTED_WEAPON_PROMATION = "message_selected_weapon_promation";
    /**门客神器 播放升级动画 */
    MessageConst.MESSAGE_WEAPON_UPLEVEL = "message_weapon_uplevel";
    /**门客神器 播放升级动画 */
    MessageConst.MESSAGE_WEAPON_UPLEVEL2 = "message_weapon_uplevel2";
    /**门客神器 刷新 */
    MessageConst.MESSAGE_WEAPON_RESET = "message_weapon_reset";
    /**选择红颜列表中点击红颜 */
    MessageConst.MESSAGE_SELECTED_WIFE = "message_selected_wife";
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
     * 主线任务进度更新通知刷新引导ui
     */
    MessageConst.MESSAGE_NOTICE_MAINTASK_GUIDE = "message_notice_maintask_guide";
    /**
     * 新手引导下一步通知
     */
    MessageConst.MESSAGE_NOTICE_ROOKIE_NEXT_STEP = "message_notice_rookie_next_step";
    MessageConst.MESSAGE_NOTICE_MAINUI_PACKUP = "message_notice_mainui_packup";
    /**
     * 新手引导大地图滚动
     */
    MessageConst.MESSAGE_NOTICE_GUIDE_CITYSCENE_SCROLL = "message_notice_guide_cityscene_scroll";
    MessageConst.MESSAGE_NOTICE_GUIDE_HOMESCENE_SCROLL = "message_notice_guide_homescene_scroll";
    /**
     * 新手引导大地图滚动2，用于引导层结束时，释放大地图的锁定状态
     */
    MessageConst.MESSAGE_NOTICE_GUIDE_CITYSCENE_SCROLL2 = "message_notice_guide_cityscene_scroll2";
    /**
     * 排行榜刷新选中行
     */
    MessageConst.MESSAGE_NOTICR_REFRESH_RANKITEM = "message_notice_refresh_rankitem";
    /**
     * 道具合成
     */
    MessageConst.MESSAGE_NOTICR_ITEM_COMPOUND = "message_notice_item_compound";
    /**
     * 来聊天
     */
    MessageConst.MESSAGE_NOTICE_CHAT_COME = "message_notice_chat_come";
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
    MessageConst.MESSAGE_MODEL_SERVANTBANISH = "servantbanish";
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
     * 新好友邀请model
     */
    MessageConst.MESSAGE_MODEL_NEWINVITE = "newinvite";
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
     * 召回玩家
     */
    MessageConst.MESSAGE_MODEL_NEWREBACK = "newreback";
    /**
     * 刷新model通知
     */
    MessageConst.MESSAGE_REFRESH_MODE = "message_mode_refresh";
    /**
     * 人望model
     */
    MessageConst.MESSAGE_MODEL_PRESTIGE = "prestige";
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
    MessageConst.MESSAGE_REFRESH_SERVANT_ITEMLIST = "message_refresh_servant_itemlist";
    MessageConst.MESSAGE_REFRSH_SERVANT_ITEM_USE = "message_refresh_servant_itemUse";
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
     * 新手引导显示手
     */
    MessageConst.MESSAGE_NOTICE_GUIDE_SHOWHAND = "message_notice_guide_showhand";
    /**
     * 新手引导显结束
     */
    MessageConst.MESSAGE_NOTICE_GUIDE_END = "message_notice_guide_end";
    MessageConst.MESSAGE_NOTICE_GUIDE_END2 = "message_notice_guide_end2";
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
     * 众筹
     */
    MessageConst.MESSAGE_LOTTERY_REFRESHVO = "message_lottery_refreshvo";
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
     * 五一活动数据刷新
     */
    MessageConst.MESSAGE_MAYDAY_FRESH_ITEM = "message_mayday_fresh_item";
    MessageConst.MESSAGE_MAYDAY_FRESHTURNTABLE = "message_mayday_freshturntable";
    /**
     * 限时礼包
     */
    MessageConst.MESSAGE_LIMITEDGIFT_REFRESHLIST = "message_limitedgift_refreshlist";
    /**
     * 刷新实名认证
     */
    MessageConst.MESSAGE_REALNAME = "message_realname";
    MessageConst.MESSAGE_NOTICE_RESFESH_NEWYEAR_ITEM = "message_notice_refresh_newyear_item";
    MessageConst.MESSAGE_RESFESH_COURIER_ITEM = "message_notice_refresh_courier_item";
    MessageConst.MESSAGE_RESFESH_NEWYEAR_LIST = "message_refresh_newyear_list";
    MessageConst.MESSAGE_RESFESH_COURIER_LIST = "message_refresh_courier_list";
    MessageConst.MESSAGE_RESFESH_SPRING_ITEM = "message_refresh_spring_item";
    MessageConst.RESFESH_SPRING_TAB = "refresh_spring_tab";
    MessageConst.MESSAGE_RESFESH_SPRING_TAB = "message_refresh_spring_TAB";
    /**
     * 仕途红点
     */
    MessageConst.MESSAGE_RESFESH_NEWYEAR_REDHOT = "message_refresh_newyear_redhot";
    MessageConst.MESSAGE_RESFESH_COURIER_REDHOT = "message_refresh_courier_redhot";
    /**
     * 关闭册封成功界面
     */
    MessageConst.MESSAGE_WIFESTATUS_SHOWCLOSE = "message_wifestatus_showclose";
    /**
     * 计算册封
     */
    MessageConst.MESSAGE_WIFESTATUS_STATE = "message_wifestatus_state";
    MessageConst.MESSAGE_REFRESH_PRACTICE_RED = "message_refresh_practice_red";
    MessageConst.MESSAGE_REFRESH_PRACTICE_RED2 = "message_refresh_practice_red2";
    MessageConst.MESSAGE_REFRESH_STORAGE = "message_refresh_storafe";
    /**
     * 称帝战消息
     */
    MessageConst.MESSAGE_EMPWEAR_BUZHEN_CHANGE = "message_empwar_buzhen_change";
    MessageConst.MESSAGE_EMPWEAR_ZHUWEI_SUCCESS = "message_empwar_zhuzhen_success";
    MessageConst.MESSAGE_EMPEROR_FRESHPLAYERDATA = "message_emperor_freshplayerdata";
    MessageConst.MESSAGE_EMPEROR_FRESHFIGHTEND = "message_emperor_freshfightend";
    /**
     * 分封消息
     */
    MessageConst.MESSAGE_PROMOTE_SUCCESS = "message_promote_success";
    MessageConst.MESSAGE_CANCEL_SUCCESS = "message_cancel_success";
    /**
     * 端午活动消息
     */
    MessageConst.MESSAGE_DBDAY_FRESH_ITEM = "message_dbday_fresh_item";
    /**
     * 声音类别 粤语  国语
     */
    MessageConst.MESSAGE_SOUND_CATEGORY = "message_sound_category";
    MessageConst.MESSAGE_FRIENDS_REFRESH_LISTITEM3 = "message_friends_refresh_listitem3";
    MessageConst.MESSAGE_FRIENDS_REFRESH_GIFTRED = "message_friends_refresh_giftred";
    MessageConst.MESSAGE_FRIENDS_SWITCH_TAB = "message_friends_switch_tab";
    MessageConst.MESSAGE_FRIENDS_MODEL_CHANGE = "message_friends_model_change";
    MessageConst.MESSAGE_FRIENDS_NEW_RECEIVE = "message_friends_new_receive";
    MessageConst.MESSAGE_FRIENDS_NEW_APPLYCHANGE = "message_friends_new_aoolychange";
    MessageConst.MESSAGE_FRIENDS_NEW_FRIENDSCHANGE = "message_friends_new_friendschange";
    MessageConst.MESSAGE_FRIENDS_HIDE_FRIENDS_OR_SADUN = "message_friends_hide_friends_or_sadun";
    /**
     * 世界杯活动消息刷新
     */
    MessageConst.MESSAGE_WORLDCUP_FRESH_ITEM = "message_worldcup_fresh_item";
    /**
     * 私聊消息获取
     */
    MessageConst.MESSAGE_PRICHAT_GETMSG = "message_prichat_getmsg";
    MessageConst.MESSAGE_PRICHAT_FRESHVIEW = "message_prichat_freshview";
    //排行相关
    MessageConst.MESSAGE_RANKVIEW_CLOSE_ANI = "message_rankview_close_ani";
    /**
     * 赵云活动任务相关
     */
    MessageConst.MESSAGE_ACMAZE_TASK = "message_acmaze_task";
    /**
     * 帮会任务
     */
    MessageConst.MESSAGE_ALLIANCE_TASK_SERVANT = "message_alliance_task_servant";
    MessageConst.MESSAGE_ALLIANCE_TASK_BUY_AND_SEND = "message_alliance_task_byg_and_send";
    MessageConst.MESSAGE_ALLIANCE_TASK_RESET_SERVANT = "message_alliance_task_reset_servant";
    /**
     * FQ游戏攻略item1刷新相关
     */
    MessageConst.MESSAGE_FQSTRATEGYVIEW_REFREASHITEM1 = "message_fqstrategyview_refreashitem1";
    /**
     * FQ游戏攻略item2刷新相关
     */
    MessageConst.MESSAGE_FQSTRATEGYVIEW_REFREASHITEM2 = "message_fqstrategyview_refreashitem2";
    /**
     * FQ游戏攻略开关 开启关闭相关
     */
    MessageConst.MESSAGE_FQSTRATEG_SWITCH = "message_fqstrategy_switch";
    /**
     * 切换场景时，检查mainui
     */
    MessageConst.MESSAGE_CHECK_SCENESCROLL = "message_check_scenescroll";
    /**
 * 亲家相关
 */
    MessageConst.MESSAGE_NOTICE_SUDANFRESH = "message_sadun_fresh";
    MessageConst.MESSAGE_NOTICE_ADULT_CHOOSE_SADUNMARRY = "message_sadun_marry";
    MessageConst.MESSAGE_NOTICE_ADULT_CLOSECHOOSE = "message_adult_closechoose";
    MessageConst.MESSAGE_NOTICE_ADULTFRESH = "message_adult_fresh";
    /**
     * 七夕灯会相关
     */
    MessageConst.MESSAGE_NOTICE_DOUBLESEVEN_FRESH = "message_doubleseven_fresh";
    /**
     * 新光环相关
     */
    MessageConst.MESSAGE_NOTICE_SERVAMNT_AURA_NEW = "message_notice_servant_aura_new";
    /**
     * 议事阁派遣消息
     */
    MessageConst.MESSAGE_NOTICE_COUNCIL_TEAMCHANGE = "message_notice_council_teamchange";
    /**
     * 议事阁刷新消息
     */
    MessageConst.MESSAGE_NOTICE_COUNCIL_FRESHMODEL = "message_notice_council_freshmodel";
    /**
     * 门客擂台pk刷新消息
     */
    MessageConst.MESSAGE_NOTICE_SERVANTPK = "message_notice_servantpk";
    /**
     * 门客皮肤穿戴切换状态
     */
    MessageConst.MESSAGE_NOTICE_SERVANT_SKIN_SWITCH = "message_notice_servant_skin_switch";
    MessageConst.MESSAGE_NOTICE_FROM_SERVANT_SKIN = "message_notice_from_servant_skin";
    /**
     *  中秋活动相关
     */
    MessageConst.MESSAGE_ACMIDAUTUMN_TASKANDRECHARGE = "message_acmidautumn_taskandrecharge";
    /**
     * 回归活动刷新消息
     */
    MessageConst.MESSAGE_RETURN_FRESH_ITEM = "message_return_fresh_item";
    /**
     *
     * 每日小额奖励
     */
    MessageConst.MESSAGE_DAILYGIFT_REFRESHVO = "message_dailygift_refreshvo";
    /**
     *
     * 鳌拜活动刷新
     */
    MessageConst.MESSAGE_WIPEBOSS_REFRESH = "message_wipeboss_refresh";
    /**
     * 每日礼包跨天
     */
    MessageConst.MESSAGE_DAILYACTIVITY_REFRESH = "message_dailyactivity_refresh";
    /**
     * 刷新model通知
     */
    MessageConst.MESSAGE_NOTICE_CHANGEBG = "message_changebg_";
    /**
     * 帮会战基本数据更新
     */
    MessageConst.MESSAGE_NOTICE_ALLIANCEWARFRESH = "message_alliancewar_fresh";
    /**
     * 所有任务完成
     */
    MessageConst.MESSAGE_NOTICE_TASK_END = "message_notice_task_end";
    /**
     * 门客骨骼动画重复 事件
     */
    MessageConst.MESSAGE_SERVANTBONE = "message_servantbone";
    /*
    * 门客战阵容变动
    */
    MessageConst.MESSAGE_COUNTRYWAR_CHANGESERVANT = "message_countrywar_changeservant";
    /**帮会充值 */
    MessageConst.MESSAGE_AID_AllIANCERECHARGECOUNT_FRESH = "message_allianceRechargeCount_fresh";
    /**帮会累计充值 */
    MessageConst.MESSAGE_AID_AllIANCERECHARGECOUNT_FRESH2 = "message_allianceRechargeCount_fresh2";
    /**门客站model */
    MessageConst.MESSAGE_COUNTRYWAR_MODEL = "countrywar";
    /**港台一周年model */
    MessageConst.MESSAGE_ANNIVERS_REFRESH = "message_annivers_refresh";
    /**门客皮肤光环升级后*/
    MessageConst.MESSAGE_NOTICE_SERVANTSKIN_AURA = "message_notice_servantskin_aura";
    /**港台一周年model   黑市*/
    MessageConst.MESSAGE_BLACKMARKET_REFRESH = "message_blackmarket_refresh";
    MessageConst.MESSAGE_RESFESH_TREASURE_LIST = "message_refresh_treasure_list";
    MessageConst.MESSAGE_RESFESH_TREASURE_MODLE = "message_refresh_treasure_modle";
    /**
     * 活动公告
     */
    MessageConst.MESSAGE_NOTICE_ACTIVITY_POP = "message_notice_activity_pop";
    /**
     * 关闭服务器列表界面回调
     */
    MessageConst.MESSAGE_CLOSE_SEVERLISTPOPUPVIEW = "message_close_severlistpopupview";
    /**
     * 爆竹迎新model数据变化
     */
    MessageConst.MESSAGE_REFRESH_NEWYEARCRACKER = "message_refresh_newyearcracker";
    /**
     * 马超活动监听动画相关
     */
    MessageConst.MESSAGE_REFRESH_MACHAOANI = "message_refresh_machaoani";
    /**
     * 马超活动监听标签动画相关
     */
    MessageConst.MESSAGE_REFRESH_MACHAOTAbANI = "message_refresh_machaotabani";
    /*
    * 绝地擂台战斗结束
    */
    MessageConst.MESSAGE_BATTLEGROUND_BATTLEEND = "message_battleground_end";
    /*
    * 绝地擂台地图刷新
    */
    MessageConst.MESSAGE_BATTLEGROUND_MAPFRESH = "message_battleground_mapfresh";
    /*
    * 绝地擂台关闭弹窗
    */
    MessageConst.MESSAGE_BATTLEGROUND_FIGHTBEGIN = "message_battleground_fightbegin";
    /**
     * 幸运翻牌model刷新
     */
    MessageConst.MESSAGE_LUCKYDRAW_FRESH_ITEM = "message_luckydraw_fresh_item";
    /**
     * 实名认真领取奖励刷新
     */
    MessageConst.MESSAGE_MAINUI_REALNAMEREWARDS = "message_mainui_realnamerewards";
    /**
     * 刷新书院布局
     */
    MessageConst.MESSAGE_REST_BOOKROOM = "message_rest_bookroom";
    /**
     *
     * 东海皇陵活动刷新
     */
    MessageConst.MESSAGE_TOMB_REFRESH = "message_tomb_refresh";
    MessageConst.MESSAGE_LOCTOMB_REFRESH = "message_loctomb_refresh";
    //勤王除恶
    /**选择门客*/
    MessageConst.MESSAGE_ALLIANCEWEEKEND_SELECTSERVANT = "message_allianceweekend_selectservant";
    //花魁活动
    /**花魁活动--查看任务*/
    MessageConst.MESSAGE_ACBEAUTYVOTE_CHECKTASK = "message_acbeautyvote_checktask";
    /**
     * 劳动活动消息
     */
    MessageConst.MESSAGE_LABOR_FRESH = "message_labor_fresh";
    MessageConst.MESSAGE_LABOR_FRESH_LIST = "message_labor_fresh_list";
    MessageConst.MESSAGE_DBDAY_FRESH_LIST = "message_dbday_fresh_list";
    MessageConst.MESSAGE_CROSSCHAT_MSG = "message_crosschat_msg";
    /**
     * 母亲节活动model刷新
     */
    MessageConst.MESSAGE_MOTHERDAY_FRESH_ITEM = "message_motherday_fresh_item";
    /**
     * 问卷调查刷新
     */
    MessageConst.MESSAGE_QA_FRESH = "message_qa_fresh";
    /**
     * 励精图治内部跳转
     */
    MessageConst.MESSAGE_BATTLEPASS_JUMP = "message_battlepass_jump";
    /**
     * 显示对象显示
     */
    MessageConst.MESSAGE_DPOBJCTR_ADDSTAGE = "message_dpobjctr_addstage";
    /**
     * 显示对象移除
     */
    MessageConst.MESSAGE_DPOBJCTR_REMOVESTAGE = "message_dpobjctr_removestage";
    /**
     * 定军中原
     */
    MessageConst.MESSAGE_MAINLAND_SERVANT_CHANGE = "message_mainland_servant_change";
    MessageConst.MESSAGE_MAINLAND_CLOSE = "message_mainland_close";
    MessageConst.MESSAGE_MAINLAND_ZG_FRESH = "message_mainland_zg_fresh";
    /**
     * 情缘绘卷
     */
    MessageConst.MESSAGE_ENCOUNTER_MODEL = "message_encounter_model";
    /**
     *  限时活动item被点击
     */
    MessageConst.MESSAGE_LIMITREWARD_ITEM_CLICK = "message_limitreward_item_click";
    /**
     *  宠幸出剪影机制
     */
    MessageConst.MESSAGE_WIFELOVEANI_CLICK = "message_wifeloveani_click";
    /**
     *  选择奖励item被点击
     */
    MessageConst.MESSAGE_CHOOSEREWARD_ITEM_CLICK = "message_chooosereward_item_click";
    /**
     * 帝王霸业升级
     */
    MessageConst.MESSAGE_TITLEUPGRADE_MODEL = "message_titleupgrade_model";
    /**
     * 皇陵地图数据数显
     */
    MessageConst.MESSAGE_LOCTOMB_FRESH = "message_loctomb_fresh";
    MessageConst.MESSAGE_TOMB_FRESH = "message_tomb_fresh";
    /**
     * 科举答题
     */
    MessageConst.MESSAGE_EXAM_FRESH = "message_exam_fresh";
    /**
     *
     */
    MessageConst.MESSAGE_WIFECHAT_END = "message_wifechat_end";
    /**
     * 结识红颜icon
     */
    MessageConst.MESSAGE_CHECK_MEET_BEAUTY = "message_check_meet_beauty";
    /**
     * 结识红颜icon
     */
    MessageConst.MESSAGE_WIFENEWSKIN_CHANGESKIN = "message_wifenewskin_changeskin";
    /**
     * 投石破敌抽奖
     */
    MessageConst.MESSAGE_THROWSTONE_CHANGEVIEW = "message_throwstone_changeview";
    //佳人擂台
    MessageConst.MESSAGE_WIFEBATTLE_REFRESHVO = "message_wifebattle_refreshvo";
    MessageConst.MESSAGE_WIFEBATTLE_REFRESH = "message_wifebattle_refresh";
    /**
     * 珍器坊派遣门客
    */
    MessageConst.MESSAGE_ZQF_SERVANT = "message_zqf_servant";
    MessageConst.MESSAGE_ZQF_SELECT = "message_zqf_select";
    MessageConst.MESSAGE_ZQF_DATAREFRESH = "message_zqf_datarefresh";
    MessageConst.MESSAGE_ZQF_NEEDGUIDE = "message_zqf_needguide";
    MessageConst.MESSAGE_ZQF_ADDSERVANT = "message_zqf_addservant";
    MessageConst.MESSAGE_ZQF_ADDSERVANT_FRIEND = "message_zqf_addservant_friend";
    /**
     * 天下之尊
     */
    MessageConst.MESSAGE_MODEL_LADDERTOURNAMENT = "laddertournament";
    MessageConst.MESSAGE_LATTERTOURNAMENT_TEAM_CHOOSE = "message_laddertournament_team_choose";
    MessageConst.MESSAGE_LATTERTOURNAMENT_CLOSE = "message_laddertournament_close";
    MessageConst.MESSAGE_LATTERT_BATTLE_END = "message_ladder_battle_end";
    /**
     * 断线重连
     */
    MessageConst.MESSAGE_SCOKET_RECONNECT_LOGIN = "message_socket_reconnect_login";
    /**
     * 国庆活动切换面板
     */
    MessageConst.MESSAGE_ACNATIONALDAY_CHANGE_VIEW = "message_acnationalday_change_view";
    MessageConst.MESSAGE_ACNATIONALDAY_GET_TASK_REWARD = "message_acnationalday_get_task_reward";
    /**
     * 暗夜魅影
     */
    MessageConst.MESSAGE_ACDESTORYSAME_MAKELINE = "message_acdestroysame_makeline";
    /**
     * 女优活动3 依依不舍
     */
    MessageConst.MESSAGE_ACYIYIBUSHE_PLAYSTORY = "message_acyiyibushe_playstory";
    /**
     * 女优活动1 依见钟情
     */
    MessageConst.MESSAGE_ACFIRSTSIGHTLOVE_FRESHVIEW = "message_acfirstsightlove_freshview";
    /**
     * 红颜技能2升级
     */
    MessageConst.MESSAGE_NOTICE_WIFE_SKILL2UPD = "message_notice_wife_skill2upd";
    /**
     * 携美同游
     */
    MessageConst.MESSAGE_ACTRAVELWITHBEAUTY_PLAYSTORY = "message_actravelwithbeauty_playstory";
    /**
     * 游戏socket开始重连
     */
    MessageConst.MESSAGE_GAMESOCKET_RECOUNT = "message_gamesocket_recount";
    /**
     * 巾帼英雄
     */
    MessageConst.MESSAGE_ACHEROINE_PLAYSTORY = "message_acheroine_playstory";
    /**
     * 帝王成就
     */
    MessageConst.MESSAGE_EMPERORACHIEVEREWARD_OPENFUN = "message_emperorachievereward_openfun";
    /**
     * 帮会无限boss
     */
    MessageConst.MESSAGE_ALLIANCE_LIMITLESSBOSS_REFRESH = "message_alliance_limitlessboss_refresh";
    /**
     * 刷新数据
     */
    MessageConst.MESSAGE_SERVANCLOSE_REFRESH = "message_servantclose_refresh";
    /**
     * 一键太学
     */
    MessageConst.MESSAGE_AUTOSTUDY_SELECTSERVANT = "message_autostudy_selectservant";
    /**
     * 三国争霸规则说明
     */
    MessageConst.MESSAGE_THREEKINGDOMS_RULEOUT = "message_threekingdoms_ruleout";
    MessageConst.MESSAGE_THREEKINGDOMS_HIDE = "message_threekingdoms_hide";
    MessageConst.MESSAGE_THREEKINGDOMS_QUIT = "message_threekingdoms_quit";
    /** 群雄逐鹿 */
    MessageConst.MESSAGE_CROSSSERVERHEGEMONY_REFRESH = "message_crossserverhegemony_refresh";
    /**
     * 活动公告跳府外
     */
    MessageConst.MESSAGE_NEWYEAR_CITYSCENE = "message_newyear_cityscene";
    /**
     * 情缘绘卷刷新
     */
    MessageConst.MESSAGE_ENCOUNTER_FRESHUI = "message_encounter_freshui";
    //红包来了
    MessageConst.MESSAGE_ACREDPACK_REFRESHVO = "message_acredpack_freshui";
    /**
     * 皇城六部
     */
    MessageConst.MESSAGE_SIXSECTION1_SELSERVANT_REFRESH = "message_sixsection1_selservant_refresh";
    MessageConst.MESSAGE_SIXSECTION1_SEATINFO_REFRESH = "message_sixsection1_seatinfo_refresh";
    MessageConst.MESSAGE_SIXSECTION1_SEAT_REFRESH = "message_sixsection1_seat_refresh";
    MessageConst.MESSAGE_SIXSECTION1_TITLE_REFRESH = "message_sixsection1_title_refresh";
    MessageConst.MESSAGE_SIXSECTION1_MODEL_REFRESH = "message_sixsection1_model_refresh";
    MessageConst.MESSAGE_SIXSECTION1_CLOSE_REFRESH = "message_sixsection1_close_refresh";
    /**
     * 切换场景时，检查mainui
     */
    MessageConst.MESSAGE_CHECK_HOUSEKEEPER = "message_check_housekeeper";
    /**
     * 主界面按钮收缩修改后珍器坊引导通知打开收缩面板
     */
    MessageConst.MESSAGE_CHECK_HOUSEUPBTN_GUIDE = "message_check_houseupbtn_guide";
    /**
     * 功能解锁通知检测
     */
    MessageConst.MESSAGE_CHECK_FUNCTION_OPEN = "message_check_function_open";
    MessageConst.MESSAGE_CHECK_FUNCTION_CITYSCENE_SCROLL = "message_check_function_cityscene_scroll";
    MessageConst.MESSAGE_CHECK_FUNCTION_OPEN_HOUSEFUNC = "message_check_function_open_housefunc";
    /**限时福利倒计时 */
    MessageConst.MESSAGR_LIMITGIFT_DJS = "message_limitgift_djs";
    /**门客冲榜进入展示期 */
    MessageConst.MESSAGE_CROSSONESERVER_END = "message_crossoneserver_end";
    /**
     * 新服预约 数据改变通知
     */
    MessageConst.MESSAGE_ACNEWAPPOINT_MODEL_REFRESH = "message_acnewappoint_model_refresh";
    /**
     * 江湖名望
     */
    MessageConst.MESSAGE_ATKRACECROSSNEW_FAMESEAT_REFRESH = "message_atkracecrossnew_fameseat_refresh";
})(MessageConst || (MessageConst = {}));
//# sourceMappingURL=MessageConst.js.map