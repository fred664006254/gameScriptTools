/**
 * 网络通信请求常量
 * author 陈可
 * date 2017/9/15
 * @class NetManager
 */
var NetRequestConst;
(function (NetRequestConst) {
    // 前端聊天请求类型(不是接口)
    NetRequestConst.REQUEST_CLIENT_CHAT = "request_client_chat";
    // 用户登录请求
    NetRequestConst.REQUEST_USER_LOGIIN = "user.login";
    // gettoken
    NetRequestConst.HTTP_GETACCESS_TOKEN = "getToken";
    // 同步请求
    NetRequestConst.REQUEST_USER_SYNC = "user.sync";
    // 门客升级
    NetRequestConst.REQUEST_UPGRADE_SERVANT = "servant.upgrade";
    // 门客升级10级
    NetRequestConst.REQUEST_UPGRADE_SERVANT_TEN = "servant.upgradeten";
    NetRequestConst.REQUEST_UPGRADE_SERVANT_UPSKILLABILITY = "servant.upskinability";
    NetRequestConst.REQUEST_UPGRADE_SERVANT_REDSKINRED = "servant.readservantskinred";
    NetRequestConst.REQUEST_UPGRADE_SERVANT_EQUIP = "servant.servantequip";
    // 红颜召唤、一键召唤限时礼包
    NetRequestConst.REQUEST_WIFE_RECOVERSCENE = "wife.recoverscence";
    // 红颜召唤、一键召唤
    NetRequestConst.REQUEST_WIFE_CALL = "wife.call";
    // 恢复红颜精力
    NetRequestConst.REQUEST_WIFE_RECOVERENERGY = "wife.recoverenergy";
    // 红颜宠幸
    NetRequestConst.REQUEST_WIFE_LOVE = "wife.love";
    // 红颜赏赐
    NetRequestConst.REQUEST_WIFE_AWARD = "wife.award";
    // 红颜技能升级
    NetRequestConst.REQUEST_WIFE_UPGRADESKILL = "wife.upgradeskill";
    //红颜子嗣技能升级
    NetRequestConst.REQUEST_WIFE_UPGRADEEXTRASKILL = "wife.upgradeextraskill";
    // 道具使用
    NetRequestConst.REQUEST_USE_ITEM = "item.use";
    // 道具称号装配
    NetRequestConst.REQUEST_ITEM_TITLE = "item.title";
    // 道具头像装配
    NetRequestConst.REQUEST_ITEM_CHANGEPORTRAIT = "item.changeportrait";
    // 道具卸下称号,头像框,头像
    NetRequestConst.REQUEST_ITEM_UNSET = "item.unset";
    // 商城购买道具
    NetRequestConst.REQUEST_SHOP_BUY_ITEM = "shop.buyitem";
    NetRequestConst.REQUEST_SHOP_GETSHOPCFG = "shop.getshopcfg";
    // 兑换四大谋士
    NetRequestConst.REQUEST_ACTIVITY_EXCHANGEFOURPEOPLE = "activity.exchangefourpeople";
    // 牢房惩罚
    NetRequestConst.REQUEST_PRISON_PUNISH = "prison.punish";
    //检测是否又豪门订阅特权
    NetRequestConst.REQUEST_SHOP_CHECKHMORDER = "shop.checkhmorder";
    /**
     * 领取首冲奖励
     */
    NetRequestConst.REQUEST_SHOP_FIRSTCHARGEREWARD = "shop.firstchargereward";
    //次充
    NetRequestConst.REQUEST_SHOP_SECONDCHARGEREWARD = "shop.secondchargereward";
    /**
     * 发起寻访
     */
    NetRequestConst.REQUEST_SEARCH_PLAY = "search.play";
    NetRequestConst.REQUEST_SEARCH_PLAYGEM = "search.playgem";
    /**
     * 使用体力丹
     */
    NetRequestConst.REQUEST_SEARCH_PILL = "search.pill";
    /**
     * 关卡 发起战斗
     */
    NetRequestConst.REQUEST_CHALLENGE_ATTACK = "challenge.attack";
    /**
     * 关卡 恢复攻击次数
     */
    NetRequestConst.REQUEST_CHALLENGE_RECOVER = "challenge.recover";
    /**
     * 一键扫荡关卡
     */
    NetRequestConst.REQUEST_CHALLENGE_AUTOATTACK = "challenge.autoattack";
    //秒杀关卡
    NetRequestConst.REQUEST_CHALLENGE_AUTOSMALLATTACK = "challenge.autosmallattack";
    // 扩展子嗣位置
    NetRequestConst.REQUEST_CHILD_ADDPOSNUM = "child.addposnum";
    // 修改子嗣名称
    NetRequestConst.REQUEST_CHILD_RENAME = "child.rename";
    // 子嗣培养
    NetRequestConst.REQUEST_CHILD_TRAIN = "child.train";
    // 子嗣一键培养
    NetRequestConst.REQUEST_CHILD_AUTOTRAIN = "child.autotrain";
    // 子嗣一键恢复活力
    NetRequestConst.REQUEST_CHILD_AUTORECOVER = "child.autorecover";
    // 恢复活力
    NetRequestConst.REQUEST_CHILD_RECOVER = "child.recover";
    // 科举考试/子嗣成年
    NetRequestConst.REQUEST_CHILD_EXAMINATION = "child.examination";
    // 处理政务
    NetRequestConst.REQUEST_MANAGE_DEALAFFAIR = "manage.dealaffair";
    // 使用政务令
    NetRequestConst.REQUEST_MANAGE_ADDAFFAIR = "manage.addaffair";
    // 一键使用政务令
    NetRequestConst.REQUEST_MANAGE_BATCHDEALAFFAIR = "manage.batchdealaffair";
    /**
     * 经营资产
     */
    NetRequestConst.REQUEST_MANAGE_DEALFINANCE = "manage.dealfinance";
    /**
     * 一键经营资产
     */
    NetRequestConst.REQUEST_MANAGE_BATCHDEALFINANCE = "manage.batchdealfinance";
    // 使用征收令
    NetRequestConst.REQUEST_MANAGE_ADDFINANCE = "manage.addfinance";
    // 领取主线任务奖励
    NetRequestConst.REQUEST_TASK_GETMAINTASK = "task.getmaintask";
    // 领取每日任务奖励
    NetRequestConst.REQUEST_TASK_GETDAILYTASK = "task.getdailytask";
    // 领取活跃奖励
    NetRequestConst.REQUEST_TASK_GETLIVENESS = "task.getliveness";
    /**
     * 获取离线奖励
     */
    NetRequestConst.REQUEST_MANAGE_AUTOFINANCE = "manage.autofinance";
    /**
     * 获取离线资源和当前经营信息
     */
    NetRequestConst.REQUEST_MANAGE_GETAUTOANDFINANCE = "manage.getautoandfinance";
    NetRequestConst.REQUEST_MANAGE_BUYFINANCE = "manage.buyfinance";
    //玩家升官
    NetRequestConst.REQUEST_USER_UPGRADE = "user.upgrade";
    //检测游戏名称是否存在
    NetRequestConst.REQUEST_USER_CHECKNAME = "user.checkname";
    //修改游戏名称
    NetRequestConst.REQUEST_USER_CHANGENAME = "user.changename";
    //创建游戏角色
    NetRequestConst.REQUEST_USER_CREATEUSER = "user.createuser";
    /**
     * 聊天加密
     */
    NetRequestConst.REQUEST_CHAT_ENCRYPT = "chat.encrypt";
    /**
     * 聊天屏蔽分享
     * local dtype = tonumber(request.params.dtype) or 1 --1本服分享屏蔽 2帮会分享屏蔽
     */
    NetRequestConst.REQUEST_CHAT_BLOCKSHARE = "chat.blockshare";
    /**
     * 聊天分享
     */
    NetRequestConst.REQUEST_CHAT_SENDCHATMSG = "chat.senddinnermsg";
    NetRequestConst.REQUEST_CHAT_SENDSTUDYATKMSG = "chat.sendstudyatkmsg";
    NetRequestConst.REQUEST_CHAT_SENDADULTMSG = "chat.sendadultmsg";
    /**
     * 聊天猫玩验证
     */
    NetRequestConst.REQUEST_CHAT_MWSIGN = "chat.mwsign";
    /**
     * 微信聊天验证
     */
    NetRequestConst.REQUEST_CHAT_WXSIGN = "chat.wxsign";
    NetRequestConst.REQUEST_CHAT_CRY = "chat.cry";
    /**
     * 排行榜相关接口
     */
    NetRequestConst.REQUEST_RANK_INDEX = "rank.index";
    NetRequestConst.REQUEST_RANK_VISIT = "rank.visit";
    NetRequestConst.REQUEST_RANK_USERSHOT = "rank.usershot";
    /**
     * 媒婆榜相关接口
     */
    /**
     * 定向提亲
     */
    NetRequestConst.REQUEST_RADULT_PROPOSE = "adult.propose";
    /**
     * 全服提亲
     */
    NetRequestConst.REQUEST_RADULT_PROPOSEALL = "adult.proposeall";
    /**
     * 获取向我提亲信息
     */
    NetRequestConst.REQUEST_RADULT_GETPROPOSEE = "adult.getpropose";
    /**
     * 获取区服所有的提亲信息
     */
    NetRequestConst.REQUEST_RADULT_GETALLPROPOSE = "adult.getallpropose";
    /**
     * 同意联姻
     */
    NetRequestConst.REQUEST_RADULT_AGREEPROPOSE = "adult.agreepropose";
    /**
     * 取消提亲
     */
    NetRequestConst.REQUEST_RADULT_CANCELPROPOSE = "adult.cancelpropose";
    /**
     * 一键/拒绝提亲请求
     *
     */
    NetRequestConst.REQUEST_RADULT_REFUSEPROPOSE = "adult.refusepropose";
    /**
     * 获取媒婆结婚信息
     */
    NetRequestConst.REQUEST_RADULT_GETADULTINFO = "adult.getadultinfo";
    /**
     * 获取提亲请求当前状态
     */
    NetRequestConst.REQUEST_ADULT_EXISTPROPOSE = "adult.existpropose";
    /**
     * 每日任务相关接口
     */
    NetRequestConst.REQUEST_DAILYTASK_GET = "task.getdailytask";
    NetRequestConst.REQUEST_DAILYLIVENESS_GET = "task.getliveness";
    NetRequestConst.REQUEST_DAILYTASK_GETLIVENESS = "task.getliveness";
    //月夜仙缘 领取建筑奖励
    NetRequestConst.REQUEST_ACTIVITY2S_GETMOONNIGHTBOXREWARD = "activity2s.getmoonnightboxreward";
    //月夜仙缘活-领取任务奖励
    NetRequestConst.REQUEST_ACTIVITY2S_GETMOONNIGHTTASKREWARD = "activity2s.getmoonnighttaskreward";
    /*
     *跨服权势
     */
    NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_PRANK = "power.prank"; //个人排行
    NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_ZRANK = "power.zrank"; //跨服区排行
    NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_AWARD = "power.winzidreward"; //跨服区排行
    NetRequestConst.REQUEST_ACTIVITY_GERACTIVITYPOWER = "power.getactivitypower";
    NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK = "atkraceg.rankbyzid";
    NetRequestConst.REQUEST_ACTIVITY_IMACYRANK = "imacy.rankbyzid";
    NetRequestConst.REQUEST_ACTIVITY_POWERRANK = "power.rankbyzid";
    /**
     * 我的邮件列表
     */
    NetRequestConst.REQUEST_MAIL_GET_MYMAILLIST = "mail.getmymaillist";
    /**
     * 查看邮件的详细内容
     */
    NetRequestConst.REQUEST_MAIL_GET_DETAIL = "mail.getdetail";
    /**
     * 获取邮件中的附件奖励
     */
    NetRequestConst.REQUEST_MAIL_GET_REWARDS = "mail.getrewardsbymail";
    /**
     * 皇宫接口
     * "获取皇宫具体信息",
     * "领取俸禄",
     * "修改签名",
     */
    NetRequestConst.REQUEST_PALACE_GETPALACEINFO = "palace.getpalaceinfo";
    NetRequestConst.REQUEST_PALACE_GETSALARY = "palace.getsalary";
    NetRequestConst.REQUEST_PALACE_SIGN = "palace.sign";
    NetRequestConst.REQUEST_PALACE_CROSS_SIGN = "palace.crosssign";
    /**
     * 宴会接口
     */
    NetRequestConst.REQUEST_DINNER_GETDINNER = "dinner.getdinner";
    NetRequestConst.REQUEST_DINNER_GETDINNERDETAIL = "dinner.getdinnerdetail";
    NetRequestConst.REQUEST_DINNER_JOINDINNER = "dinner.joindinner";
    NetRequestConst.REQUEST_DINNER_CREATDINNER = "dinner.createdinner";
    NetRequestConst.REQUEST_DINNER_CANVIEWDINNER = "dinner.canviewdinner";
    NetRequestConst.REQUEST_DINNER_FEFRESHITEM = "dinner.refreshitem";
    NetRequestConst.REQUEST_DINNER_SHOPITEM = "dinner.shopitem";
    NetRequestConst.REQUEST_DINNER_SCOREDINNER = "dinner.scoretoitem";
    NetRequestConst.REQUEST_DINNER_HISTORY = "dinner.history";
    NetRequestConst.REQUEST_DINNER_TOP = "dinner.top";
    NetRequestConst.REQUEST_DINNER_SHAREDINNER = "dinner.sharedinner";
    NetRequestConst.REQUEST_DINNER_USEITEM = "dinner.useitem";
    //首次点击开始宴会发送强弹请求
    NetRequestConst.REQUEST_DINNER_SHOWNEEDITEM = "dinner.showneeditem";
    /**
     * 签到接口
     */
    NetRequestConst.REQUEST_USER_ARRIVAL = "user.arrival";
    /**
     * 获取活动配置
     */
    NetRequestConst.REQUEST_ACTIVITY_GETACTIVECFG = "activity.getactivecfg";
    /**
     * 领取成就奖励
     */
    NetRequestConst.REQUEST_ACHIEVEMENT_GETREWARDS = "achievement.getrewards";
    /**
     * 充值接口
     */
    NetRequestConst.PAY_PROCESSPAYMENT = "pay.processpayment";
    /**
     * 冲榜活动获取排行榜
     */
    NetRequestConst.REQUEST_ACTIVITY_GETRANKACTIVE = "activity.getrankactive";
    /**
     * 充值活动接口
     "领取每日充值活动奖励",
     参数 activeId 活动ID  rkey 领取的是第几档
     参数 activeId 活动ID  rkey 领取的是第几档
     */
    NetRequestConst.REQUEST_RECHARGE_GETDAILYREWARD = "activity.getdailychargereward";
    NetRequestConst.REQUEST_RECHARGE_GETTOTALDAILYREWARD = "activity.gettotaldayrechargereward";
    NetRequestConst.REQUEST_RECHARGE_GETTOTALREWARD = "activity.gettotalrechargereward";
    NetRequestConst.REQUEST_RECHARGE_GETRECHARGETYPEREWARD = "activity.getrechargetypereward";
    /**
     * 狂欢节活动
     * 狂欢节充值
     * 狂欢节消费
     * 参数
     *	参数 activeId 活动ID  rkey 领取的是第几档
     *	参数 activeId 活动ID  rkey 领取的是第几档
     */
    NetRequestConst.REQUEST_ACTIVITY_GETCARNIVALCHARGE = "activity.getcarnivalcharge";
    NetRequestConst.REQUEST_ACTIVITY_GETCARNIVALCOST = "activity.getcarnivalcost";
    /**
     * 米莎来了活动
     *
     */
    NetRequestConst.REQUEST_ACTIVITY_GETWIFECOMEREWARD = "activity.getwifecomereward";
    /**
     * 红颜沐浴
     *
     */
    NetRequestConst.REQUEST_ACTIVITY_GETWIFEBATHINGREWARD = "activity.getwifebathingreward";
    /**
     * 领取限时活动奖励
     */
    NetRequestConst.REQUEST_ACTIVITY_GETLIMITEDREWARD = "activity.getlimitedreward";
    /**
      * 领取vip奖励
      */
    NetRequestConst.REQUEST_VIP_VIPWELFARE = "shop.vipwelfare";
    /**
      * 兑换礼包码
      */
    NetRequestConst.REQUEST_USER_EXCHANGECARD = "user.exchangecard";
    NetRequestConst.REQUEST_SERVANT_UPABILITY = "servant.upability";
    NetRequestConst.REQUEST_SERVANT_UPSKILL = "servant.upskill";
    /**
     * 获取惩戒女囚活动信息
     */
    NetRequestConst.REQUEST_ACTIVITY_GETPUNISHACTIVE = "activity.getpunishactive";
    /**
     * 西域商店
     */
    NetRequestConst.ACTIVITY_BUYVIPSHOP = "activity.buyvipshop";
    /**
    * 春季庆典 春季典庆-春季送礼"
    */
    NetRequestConst.ACTIVITY_GETSPRINGITEMA = "activity.getspringitema";
    /**
    * 春季庆典 春季典庆-春季兑换"
    */
    NetRequestConst.ACTIVITY_GETSPRINGITEMB = "activity.getspringitemb";
    /**
    * 春季庆典 春季典庆-踏青狂欢"
    */
    NetRequestConst.ACTIVITY_GETSPRINGITEMC = "activity.getspringitemc";
    /**
   * 春季庆典 春季典庆-折扣特惠"
   */
    NetRequestConst.ACTIVITY_GETSPRINGITEMD = "activity.getspringitemd";
    /**
    * 购买惩戒道具
    */
    NetRequestConst.REQUEST_ACTIVITY_BUYPUNISHITEM = "activity.buypunishitem";
    /**
    * 使用惩戒道具
    */
    NetRequestConst.REQUEST_ACTIVITY_USEPUNISHITEM = "activity.usepunishitem";
    NetRequestConst.REQUEST_ACTIVITY_AUTOPUNISH = "activity.autopunish";
    /**
    * 使用积分购买活动商店物品
    */
    NetRequestConst.REQUEST_ACTIVITY_BUYPUNISHSHOP = "activity.buypunishshop";
    /**
     * 领取击杀奖励
     */
    NetRequestConst.REQUEST_ACTIVITY_GETPUNISHREWARD = "activity.getpunishreward";
    /**
    * 领取奖励春节攀升
    */
    NetRequestConst.REQUEST_ACTIVITY_GETNEWYEARREWARD = "activity.getnewyearreward";
    /**
     * 领取奖励春节攀升 每天第一个元宝购买任务
     */
    NetRequestConst.REQUEST_ACTIVITY_BUYNEWYEARGIFT = "activity.buynewyeargift";
    /**
    * 领取解锁功能奖励
    */
    NetRequestConst.REQUEST_OTHERINFO_GETUNLOCKLISTREWARD = "otherinfo.getunlocklistreward";
    /**
    * 领取实名认证奖励（非3k）
    */
    NetRequestConst.REQUEST_OTHERINFO_GETCERTIFICATION = "otherinfo.getcertification";
    /**
    * 获取转移帐号激活码
    */
    NetRequestConst.REQUEST_OTHERINFO_GETPIDENCRYPT = "otherinfo.getpidencrypt";
    /**
   * 设置第一次关卡失败
   */
    NetRequestConst.REQUEST_OTHERINFO_SETFIRSTCHALLENGEFAIL = "otherinfo.setfirstchallengefail";
    /**
    * 日本特有 设置第一次年龄确认弹窗
    */
    NetRequestConst.REQUEST_OTHERINFO_SETAGEFIRSTFLAG = "otherinfo.setagefirstflag";
    NetRequestConst.REQUEST_SERVANT_UPAURA = "servant.upaura";
    NetRequestConst.REQUEST_SERVANT_CHANGE = "servant.change";
    /**
     * 设置自动捐款信息
     */
    NetRequestConst.REQUEST_SEARCH_SET = "search.set";
    /**
     * vip免费/花费捐款信息接口
     */
    NetRequestConst.REQUEST_SEARCH_BUY = "search.buy";
    /**
     * 擂台接口
     */
    NetRequestConst.REQUEST_ATKRACE_INDEX = "atkrace.index";
    NetRequestConst.REQUEST_ATKRACE_ATTRBUY = "atkrace.attrbuy";
    NetRequestConst.REQUEST_ATKRACE_FIGHT = "atkrace.fight";
    NetRequestConst.REQUEST_ATKRACE_REVENGE = "atkrace.revenge";
    NetRequestConst.REQUEST_ATKRACE_KILL = "atkrace.kill";
    NetRequestConst.REQUEST_ATKRACE_CHALLENGE = "atkrace.challenge";
    NetRequestConst.REQUEST_ATKRACE_GETINFO = "atkrace.getinfo";
    NetRequestConst.REQUEST_ATKRACE_LIST = "atkrace.list";
    NetRequestConst.REQUEST_ATKRACE_RANK = "atkrace.rank";
    NetRequestConst.REQUEST_ATKRACE_ATTRBUYLIST = "atkrace.attrlist";
    NetRequestConst.REQUEST_ATKRACE_REFRESH = "atkrace.refresh";
    NetRequestConst.REQUEST_ATKRACE_BATCHFIGHT = "atkrace.batchfight";
    NetRequestConst.REQUEST_ATKRACE_CHOOSE = "atkrace.choose";
    // 以下接口弃用了
    NetRequestConst.REQUEST_ATKRACE_RANDREWARD = "atkrace.randreward";
    NetRequestConst.REQUEST_ATKRACE_HANDLE = "atkrace.handle";
    NetRequestConst.REQUEST_ATKRACE_GETMODEL = "atkrace.getmodel";
    NetRequestConst.REQUEST_ATKRACE_USEEXTRA = "atkrace.useextra";
    /**
     * 跨服擂台接口
     */
    NetRequestConst.REQUEST_ATKRACECROSS_INDEX = "atkraceg.index";
    NetRequestConst.REQUEST_ATKRACECROSS_ATTRBUY = "atkraceg.attrbuy";
    NetRequestConst.REQUEST_ATKRACECROSS_FIGHT = "atkraceg.fight";
    NetRequestConst.REQUEST_ATKRACECROSS_REVENGE = "atkraceg.revenge";
    NetRequestConst.REQUEST_ATKRACECROSS_KILL = "atkraceg.kill";
    NetRequestConst.REQUEST_ATKRACECROSS_CHALLENGE = "atkraceg.challenge";
    NetRequestConst.REQUEST_ATKRACECROSS_RANDREWARD = "atkraceg.randreward";
    NetRequestConst.REQUEST_ATKRACECROSS_GETINFO = "atkraceg.getinfo";
    NetRequestConst.REQUEST_ATKRACECROSS_LIST = "atkraceg.list";
    NetRequestConst.REQUEST_ATKRACECROSS_RANK = "atkraceg.rank";
    NetRequestConst.REQUEST_ATKRACECROSS_HANDLE = "atkraceg.handle";
    NetRequestConst.REQUEST_ATKRACECROSS_ATTRBUYLIST = "atkraceg.attrlist";
    NetRequestConst.REQUEST_ATKRACECROSS_GETMODEL = "atkraceg.getmodel";
    NetRequestConst.REQUEST_ATKRACECROSS_USEEXTRA = "atkraceg.useextra";
    NetRequestConst.REQUEST_ATKRACECROSS_REFRESH = "atkraceg.refresh";
    NetRequestConst.REQUEST_ATKRACECROSS_GETACTIVITYATK = "atkraceg.getactivityatk";
    NetRequestConst.REQUEST_ATKRACECROSS_BATCHFIGHT = "atkraceg.batchfight";
    /**
     * 获取道具合成配置
     */
    NetRequestConst.REQUEST_ITEM_GETCOMPOSE = "item.getcompose";
    /**
     * 获取道具合成配置
     */
    NetRequestConst.REQUEST_ITEM_GETMODEL = "item.getmodel";
    /**
     * 合成道具
     */
    NetRequestConst.REQUEST_ITEM_DOCOMPOSE = "item.docompose";
    /**
     * 联盟模块
     */
    NetRequestConst.REQUEST_ALLIANCE_INITALLIANCE = "alliance.initalliance";
    NetRequestConst.REQUEST_ALLIANCE_CREATEALLIANCE = "alliance.createalliance";
    NetRequestConst.REQUEST_ALLIANCE_JOINRANDALLIANCE = "alliance.joinrandalliance";
    NetRequestConst.REQUEST_ALLIANCE_FINDALLIANCE = "alliance.findalliance";
    NetRequestConst.REQUEST_ALLIANCE_GETALLIANCELIST = "alliance.getalliancelist";
    NetRequestConst.REQUEST_ALLIANCE_APPLYALLIANCE = "alliance.applyalliance";
    NetRequestConst.REQUEST_ALLIANCE_CANCELAPPLY = "alliance.cancelapply";
    NetRequestConst.REQUEST_ALLIANCE_ACCEPT = "alliance.accept";
    NetRequestConst.REQUEST_ALLIANCE_REFUSEAPPLY = "alliance.refuseapply";
    NetRequestConst.REQUEST_ALLIANCE_REFUSEALLAPPLY = "alliance.refuseallapply";
    NetRequestConst.REQUEST_ALLIANCE_RENAME = "alliance.rename";
    NetRequestConst.REQUEST_ALLIANCE_MODINFO = "alliance.modinfo";
    NetRequestConst.REQUEST_ALLIANCE_SETSWITCH = "alliance.setswitch";
    NetRequestConst.REQUEST_ALLIANCE_EXITALLIANCE = "alliance.exitalliance";
    NetRequestConst.REQUEST_ALLIANCE_GETALLIANCEAPPLY = "alliance.getallianceapply";
    NetRequestConst.REQUEST_ALLIANCE_GETMEMBER = "alliance.getmember";
    NetRequestConst.REQUEST_ALLIANCE_SETPOS = "alliance.setpos";
    NetRequestConst.REQUEST_ALLIANCE_GETDETAILS = "alliance.getdetails";
    NetRequestConst.REQUEST_ALLIANCE_TRANSFER = "alliance.transfer";
    NetRequestConst.REQUEST_ALLIANCE_KICKALLIANCE = "alliance.kickalliance";
    NetRequestConst.REQUEST_ALLIANCE_DISBAND = "alliance.disband";
    NetRequestConst.REQUEST_ALLIANCE_DONATE = "alliance.donate";
    NetRequestConst.REQUEST_ALLIANCE_SHOPBUY = "alliance.shopbuy";
    NetRequestConst.REQUEST_ALLIANCE_ATTACK = "alliance.attack";
    NetRequestConst.REQUEST_ALLIANCE_OPENBOSS = "alliance.openboss";
    NetRequestConst.REQUEST_ALLIANCE_RECOVER = "alliance.recover";
    NetRequestConst.REQUEST_ALLIANCE_GETBOSSLOG = "alliance.getbosslog";
    NetRequestConst.REQUEST_ALLIANCE_GETBOSSRANK = "alliance.getbossrank";
    /**
     * "书院入席学习接口",
     */
    NetRequestConst.REQUEST_BOOKROOM_STUDY = "bookroom.study";
    NetRequestConst.REQUEST_BOOKROOM_STUDY_BATCH = "bookroom.batchstudy";
    /**
     * "书院学习(一键)完成接口",
     */
    NetRequestConst.REQUEST_BOOKROOM_FINISH = "bookroom.finish";
    /**
     * "书院购买席位接口",
     */
    NetRequestConst.REQUEST_BOOKROOM_BUY = "bookroom.buy";
    NetRequestConst.REQUEST_BOOKROOM_INTENSIVESTUDY = "bookroom.intensiveStudy";
    /**
     * 练武场相关接口
     */
    NetRequestConst.REQUEST_STUDYATK_INDEX = "studyatk.index";
    NetRequestConst.REQUEST_STUDYATK_CREATE = "studyatk.create";
    NetRequestConst.REQUEST_STUDYATK_JOIN = "studyatk.join";
    NetRequestConst.REQUEST_STUDYATK_GOAWAY = "studyatk.goaway";
    NetRequestConst.REQUEST_STUDYATK_GETATKDETAIL = "studyatk.getatkdetail";
    NetRequestConst.REQUEST_STUDYATK_GETATK = "studyatk.getatk";
    NetRequestConst.REQUEST_STUDYATK_UPGRADE = "studyatk.upgrade";
    NetRequestConst.REQUEST_STUDYATK_USEARMOR = "studyatk.usearmor";
    /**
     * 副本 获取基本信息
     */
    NetRequestConst.REQUEST_DAILYBOSS_GET = "dailyboss.get";
    /**
     * 副本 购买商店信息
     */
    NetRequestConst.REQUEST_DAILYBOSS_BUY = "dailyboss.buy";
    /**
     * 获取副本排行榜
     */
    NetRequestConst.REQUEST_DAILYBOSS_GETRANK = "dailyboss.getrank";
    /**
     * 获取副本具体详细信息
     */
    NetRequestConst.REQUEST_DAILYBOSS_GETDETAILS = "dailyboss.getdetails";
    /**
     * 副本 攻击
     */
    NetRequestConst.REQUEST_DAILYBOSS_ATTACK = "dailyboss.attack";
    /**
     * 副本 恢复攻击次数
     */
    NetRequestConst.REQUEST_DAILYBOSS_RECOVER = "dailyboss.recover";
    /**
     * 副本 获取蛮王伤害排行榜
     */
    NetRequestConst.REQUEST_DAILYBOSS_GETATTACKRANK = "dailyboss.getattackrank";
    /**
     * 副本 雁门关领取通关奖励
     */
    NetRequestConst.REQUEST_DAILYBOSS_GETCLEARREWARD = "dailyboss.getclearreward";
    /**
     * 玩吧发送桌面奖励
     */
    NetRequestConst.REQUEST_OTHERINFO_GETWBSENDREWARD = "otherinfo.getwbsendreward";
    /**
     * 玩吧每日分享奖励
     */
    NetRequestConst.REQUEST_OTHERINFO_GETWBDAILYSHAREREWARD = "otherinfo.getwbdailysharereward";
    /**
     * 领取手机绑定奖励
     */
    NetRequestConst.REQUEST_OTHERINFO_GETBINDREWARD = "otherinfo.getbindreward";
    /**
     * 领取实名认证奖励
     */
    NetRequestConst.REQUEST_OTHERINFO_GETAUTHOR3KREWARD = "otherinfo.getauthor3kreward";
    /**
     * 修改形象
     */
    NetRequestConst.REQUEST_USER_CHANGEPIC = "user.changepic";
    /**
     * 分阶段引导记录
     */
    NetRequestConst.REQUEST_USER_STEPGUILD = "user.stepguild";
    /**
     * 征伐接口
     */
    NetRequestConst.REQUEST_CONQUEST_INDEX = "conquest.index";
    NetRequestConst.REQUEST_CONQUEST_FIGHT = "conquest.fight";
    NetRequestConst.REQUEST_CONQUEST_RANK = "conquest.rank";
    NetRequestConst.REQUEST_CONQUEST_BATCHFIGHT = "conquest.batchfight";
    //"通商随机对手接口",
    //"通商战斗接口",
    //"通商排行榜接口",
    //"一键通商战斗接口",
    NetRequestConst.REQUEST_TRADE_INDEX = "trade.index";
    NetRequestConst.REQUEST_TRADE_FIGHT = "trade.fight";
    NetRequestConst.REQUEST_TRADE_RANK = "trade.rank";
    NetRequestConst.REQUEST_TRADE_BATCHFIGHT = "trade.batchfight";
    //玩吧领取糖果活动奖励
    NetRequestConst.REQUEST_OTHERINFO_GETCANDYREWARD = "otherinfo.getcandyreward";
    //疯狂游乐场关注领取奖励
    NetRequestConst.REQUEST_OTHERINFO_GETFKFOCUSREWARD = "otherinfo.getfkfocusreward";
    //疯狂游乐场分享成功
    NetRequestConst.REQUEST_OTHERINFO_FKSHARE = "otherinfo.fkshare";
    //疯狂游乐场领取分享奖励
    NetRequestConst.REQUEST_OTHERINFO_GETFKSHAREREWARD = "otherinfo.getfksharereward";
    //获取玩吧积分奖励
    NetRequestConst.REQUEST_OTHERINFO_GETWBSCOREREWARD = "otherinfo.getwbscorereward";
    //新手引导步骤记录
    NetRequestConst.REQUEST_USER_NEWERGUILD = "user.newerguild";
    //记录门客排序id
    NetRequestConst.REQUEST_OTHER_RECORDSERVANTSORT = "otherinfo.recordservantsort";
    //宫廷裁缝抽奖,兑换皮肤
    NetRequestConst.REQUEST_OTHER_ACTIVITY_USETAILOR = "activity.usetailor";
    NetRequestConst.REQUEST_OTHER_ACTIVITY_USETENTAILOR = "activity.usetentailor";
    NetRequestConst.REQUEST_OTHER_ACTIVITY_EXCHANGE_SKIN = "activity.exchangeskin";
    //红颜装配皮肤
    NetRequestConst.REQUEST_WIFE_EQUIP = "wife.equip";
    NetRequestConst.REQUEST_WIFE_READSKINRED = "wife.readskinred";
    /**
     * 跨服领取活动奖励
     */
    NetRequestConst.REQUEST_ATKRACEG_WINZIDREWARD = "atkraceg.winzidreward";
    /**
     * 邀请好友领取人数奖励接口
     */
    NetRequestConst.REQUEST_INVITE_GETINVITEREWARD = "invite.getinvitereward";
    /**
     * 邀请好友领取权势奖励接口
     */
    NetRequestConst.REQUEST_INVITE_GETPOWERREWARD = "invite.getpowerreward";
    /**
     * 邀请好友领取充值奖励接口
     */
    NetRequestConst.REQUEST_INVITE_GETRECHARGEREWARD = "invite.getrechargereward";
    /**
     * 邀请好友,获取数据
     */
    NetRequestConst.REQUEST_INVITE_GETINFO = "invite.getinfo";
    //聊天屏蔽
    NetRequestConst.REQUEST_CHAT_LIST = "chat.list";
    NetRequestConst.REQUEST_CHAT_BLOCK = "chat.block";
    NetRequestConst.REQUEST_CHAT_UNBLOCK = "chat.unblock";
    NetRequestConst.REQUEST_ACTIVITY_EXCHANGEWIFE = "activity.exchangewife";
    NetRequestConst.REQUEST_USER_GETKFMSG = "user.getkfmsg";
    NetRequestConst.REQUEST_USER_GETKFCARDMSG = "user.getkfcardmsg";
    NetRequestConst.REQUEST_PALACE_GETCROSSPALACE = "palace.getcrosspalace";
    NetRequestConst.REQUEST_PALACE_GETPALACERANK = "palace.getpalacerank";
    //称帝
    NetRequestConst.REQUEST_PRESTIGE_INDEX = "prestige.index";
    /**
     * 设置cover成功
     */
    NetRequestConst.REQUEST_OTHERINFO_SETCOVER = "otherinfo.setcover";
    /**
     * 领取cover奖励
     */
    NetRequestConst.REQUEST_OTHERINFO_GETCOVERREWARD = "otherinfo.getcoverreward";
    /**
     * 领取绑定有礼奖励
     */
    NetRequestConst.REQUEST_OTHERINFO_GETGTFBREWARD = "otherinfo.getgtfbreward";
    /*
     *五一活动
     */
    NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYITEMA = "activity.getmaydayitema"; //"五一转盘领取次数奖励"
    NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYITEMB = "activity.getmaydayitemb"; //"五一转盘充值奖励"
    NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYITEMC = "activity.getmaydayitemc"; //"五一转盘任务奖励"
    NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYRANK = "activity.getmaydayrank"; //五一转盘排行榜
    NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYLOTTERY = "activity.getmaydaylottery"; //五一转盘抽奖
    /**
     * 充值转盘
     */
    NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYRECHARGELOTTERY = "activity.getmaydayrechargelottery";
    NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYRECHARGEITEMA = "activity.getmaydayrechargeitema";
    /*
    *	福袋活动
    */
    //福袋抽奖活动抽奖
    NetRequestConst.REQUEST_ACTIVITY_GETLUCKBAGLOTTERY = "activity.getluckbaglottery";
    //福袋抽奖活动领取奖励
    NetRequestConst.REQUEST_ACTIVITY_GETLUCKBAGREWARD = "activity.getluckbagreward";
    //众筹获取宝箱奖励
    NetRequestConst.REQUEST_ACTIVITY_LOTTERYNUMREWARD = "activity.lotterynumreward";
    //众筹抽奖
    NetRequestConst.REQUEST_ACTIVITY_LOTTERYJOIN = "activity.lotteryjoin";
    //众筹获取初始信息
    NetRequestConst.REQUEST_ACTIVITY_LOTTERYINFO = "activity.lotteryinfo";
    //虎牢关-查看活动信息
    NetRequestConst.REQUEST_ACTIVITY_TIGERTRAPPASSINFO = "activity.tigertrappassinfo";
    //众筹获得中奖名单
    NetRequestConst.REQUEST_ACTIVITY_LOTTERYWININFO = "activity.lotterywininfo";
    /**
     * 圣诞活动
     */
    //抽奖
    NetRequestConst.REQUEST_ACTIVITY_GETCHRISTMASREWARD = "activity.getchristmasreward";
    //领取任务
    NetRequestConst.REQUEST_ACTIVITY_GETCHRISTMASTASKREWARD = "activity.getchristmastaskreward";
    //手标示
    NetRequestConst.REQUEST_ACTIVITY_READCHRISTMASREWARD = "activity.readchristmasreward";
    /**
     * 实名 领奖
     */
    NetRequestConst.REQUST_OTHERINFO_GETREALNAMEREWARDS = "otherinfo.getrealnamerewards";
    /**
     * 破冰红包
     */
    //领取破冰红包奖励/抽红包
    NetRequestConst.REQUEST_ACTIVITY_GETICEBREAKINGGIFT = "activity.geticebreakingGift";
    //查看当前破冰红包活动数据
    NetRequestConst.REQUEST_ACTIVITY_ICEBREAKINGGIFTINDEX = "activity.icebreakingGiftindex";
    /**
     * 惊喜回馈
     */
    NetRequestConst.REQUEST_ACTIVITY_GETSURPRISEDGIFTREWARD = "activity.getsurprisedgiftreward";
    /**
     *
     * 小额礼包
     */
    NetRequestConst.REQUEST_ACTIVITY_GETFREEDAILYGIFT = "activity.getfreedailygift";
    /**
     * 手动调用活动model
     *
     */
    NetRequestConst.REQUEST_ACTIVITY_GETACTIVITYMODEL = "activity.getactivitymodel";
    /**
     * 修身
     */
    NetRequestConst.REQUEST_REQUEST_INDEX = "practice.index";
    NetRequestConst.REQUEST_REQUEST_UPGRADE = "practice.upgrade";
    NetRequestConst.REQUEST_REQUEST_UNLOCK = "practice.unlock";
    NetRequestConst.REQUEST_REQUEST_COLLECT = "practice.collect";
    NetRequestConst.REQUEST_PRACTICE_UPSTORAGE = "practice.upstorage";
    /**
     * 册封
     */
    NetRequestConst.REQUEST_WIFESTATUS_CONFER = "wifestatus.confer";
    NetRequestConst.REQUEST_WIFESTATUS_AUTOCONFER = "wifestatus.autoconfer";
    /**
     * 端午节相关
     */
    NetRequestConst.REQUEST_ACTIVITY_DRAGONINFO = "activity.getdragoninfo";
    NetRequestConst.REQUEST_ACTIVITY_DBJINDU = "activity.getdragonitema";
    NetRequestConst.REQUEST_ACTIVITY_DBTASK = "activity.getdragonitemc";
    NetRequestConst.REQUEST_ACTIVITY_DBRECHARGE = "activity.getdragonitemb";
    NetRequestConst.REQUEST_ACTIVITY_DBSHOPBUY = "activity.buydragonshop";
    NetRequestConst.REQUEST_ACTIVITY_DBRANK = "activity.getdragonrank";
    /*
     *跨服亲密
     */
    NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_PRANK = "imacy.prank"; //个人排行
    NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_ZRANK = "imacy.zrank"; //跨服区排行
    NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_AWARD = "imacy.winzidreward"; //跨服区排行
    NetRequestConst.REQUEST_ACTIVITY_GERACTIVITYIMACY = "imacy.getactivityimacy";
    NetRequestConst.REQUEST_REQUEST_BUY = "practice.buy";
    /*
     *称帝战
     */
    NetRequestConst.REQUEST_EMPEROR_GETACTIVE = "emperor.getactive"; //个人排行
    /**
     * 分享成功的接口
     */
    NetRequestConst.REQUST_OTHERINFO_GETGENERALSHARE = "otherinfo.getgeneralshare";
    /**
     * 群组分享领奖
     */
    NetRequestConst.REQUEST_OTHERINFO_GETTHEREALSHARE = "otherinfo.gettherealshare";
    /**
     * 获取真分享奖励
     */
    // export const REQUST_OTHERINFO_GETTHEREALSHARE:string = "otherinfo.gettherealshare";
    /**
     * twitter每日分享成功的接口
     */
    NetRequestConst.REQUST_OTHERINFO_GETSHAREREWARD = "otherinfo.getsharereward";
    /**
     * 更新分享的状态
     */
    NetRequestConst.REQUST_OTHERINFO_CHANGSHARE = "otherinfo.changshare";
    /**
     * 七夕灯会
     */
    NetRequestConst.REQUST_DOUBLESEVEN_GETREWARD = "activity.getdoubleSeventhitema";
    // 分享引导
    NetRequestConst.REQUEST_GETSHAREGUIDE = "user.getshareguide"; //获取引导文案
    NetRequestConst.REQUEST_GETSHAREGUIDEREWARD = "otherinfo.getshareguidereward"; //领取分享奖励
    NetRequestConst.REQUEST_STATSUPDATESHAREDATA = "stats.updatesharedata"; //更新情景分享数据
    NetRequestConst.REQUEST_SHAREADDCOPYSHARENUM = "share.addcopysharenum"; //更新情景分享数据
    NetRequestConst.REQUEST_OTHERINFO_GETTYPESHAREREWARD = "otherinfo.gettypesharereward"; //门客分享
    NetRequestConst.REQUEST_USER_ARRIVALNEW = "user.arrivalnew"; //新七日签到领取奖励
    /**
     * 限时礼包 取消强弹标识
     */
    NetRequestConst.REQUEST_SHOP_SHOW1COSTSCENEGIFT = "shop.show1costscenegift";
    /**
     * 微信平台分享内容
     */
    NetRequestConst.REQUEST_USER_GETWXSHARE = "user.getwxshare";
    /**
     * 微信平台分享领取奖励
     *
     */
    NetRequestConst.REQUEST_OTHERINFO_GETWXSHAREREWARD = "otherinfo.getwxsharereward";
    /**
     * 分享加一次经营
     *
     */
    NetRequestConst.REQUEST_MANAGE_SHAREFINANCE = "manage.sharefinance";
    /**
     * 分享恢复战斗次数
     *
     */
    NetRequestConst.REQUEST_CHALLENGE_SHARERECOVER = "challenge.sharerecover";
    /**
     * 微信平台分享次数
     */
    NetRequestConst.REQUEST_OTHERINFO_SETSHARENUM = "otherinfo.setsharenum";
    /**
     * 中秋活动抽奖
     */
    NetRequestConst.ACTIVITY_GETMIDAUTUMNLOTTERY = "activity.getmidAutumnlottery";
    /**
     * 中秋活动领取次数奖励
     */
    NetRequestConst.ACTIVITY_GETMIDAUTUMNITEMA = "activity.getmidAutumnitema";
    /**
     * 中秋活动任务奖励
     */
    NetRequestConst.ACTIVITY_GETMIDAUTUMNITEMB = "activity.getmidAutumnitemb";
    /**
     * 中秋活动充值奖励
     */
    NetRequestConst.ACTIVITY_GETMIDAUTUMNITEMC = "activity.getmidAutumnitemc";
    /**
     * 红莲勇士领取次数奖励
     */
    NetRequestConst.ACTIVITY_REDLOTUSWARRIORNUMREWARD = "activity.redlotuswarriornumreward";
    /**
     * 红莲勇士攻击
     */
    NetRequestConst.ACTIVITY_REDLOTUSWARRIORATTACKTHEBOSS = "activity.redlotuswarriorattacktheboss";
    /**
     * 活动红点已读
     */
    NetRequestConst.REQUEST_ACTIVITY_READACTIVE = "activity.readactive";
    //赵云活动
    /** 赵云活动抽奖 */
    NetRequestConst.REQUEST_ACTIVITY_GETMAZELOTTERY = "activity.getmazelottery";
    /** 赵云活动领取任务奖励 */
    NetRequestConst.REQUEST_ACTIVITY_GETMAZEITEMB = "activity.getmazeitemb";
    /** 赵云活动领取充值奖励 */
    NetRequestConst.REQUEST_ACTIVITY_GETMAZEITEMC = "activity.getmazeitemc";
    /** 赵云活动排行榜 */
    NetRequestConst.REQUEST_ACTIVITY_GETMAZERANK = "activity.getmazerank";
    /**
     * [百服活动]充值返利  领取奖励
     */
    NetRequestConst.REQUST_ACTIVITY_GETRECHARGEBOXREWARD = "activity.getrechargeboxreward";
    /**
     * 新特别狂欢包厢 充值返利  领取奖励
     */
    NetRequestConst.REQUST_ACTIVITY_GETRECHARGEBOXSPREWARD = "activity.getrechargeboxspreward";
    NetRequestConst.REQYEST_ACTIVITY_DAILY_CHECKRED = "activity.dailyactivityclickredpoint";
    /**
     * 双十一活动 获取红包
    */
    NetRequestConst.REQUEST_SINGLEDAY_GETREDPT = "activity.getsingledayredpt";
    /**
     * 双 11 领取奖励相关
     */
    NetRequestConst.REQYEST_ACTIVITY_GET_SINGLE_DAY_REWARD = "activity.getsingledayreward";
    /**
     * 双 11 购买商店物品
     */
    NetRequestConst.REQYEST_ACTIVITY_SINGLEDAY_BUYSHOP = "activity.buysingledayshop";
    /**
     * 双 11 排行榜相关
     */
    NetRequestConst.REQYEST_ACTIVITY_GET_SINGLE_DAY_RANK = "activity.getsingledayrank";
    NetRequestConst.REQYEST_ACTIVITY_BUYSINGLEDAYSHOP = "activity.buysingledayshop";
    /**
     * 好友
     */
    NetRequestConst.REQUEST_FRIEND_GETINFO = "friend.getinfo"; //"获取好友信息", 返回 friendList
    NetRequestConst.REQUEST_FRIEND_GETRECONMEND = "friend.getrecommend"; // "获取推荐玩家信息", 返回 commendList
    NetRequestConst.REQUEST_FRIEND_APPLY = "friend.apply"; //"申请成为好友",
    NetRequestConst.REQUEST_FRIEND_APPLYLIST = "friend.applylist"; //"获取申请列表", 返回 applyList
    NetRequestConst.REQUEST_FRIEND_ACCEPT = "friend.accept"; // "接受好友申请",
    NetRequestConst.REQUEST_FRIEND_REFUSE = "friend.refuse"; // "拒绝／忽略好友申请",
    NetRequestConst.REQUEST_FRIEND_SENDGIFT = "friend.sendgift"; //  "发送礼物",
    NetRequestConst.REQUEST_FRIEND_RECEIVEGIFT = "friend.receivegift"; //"接受礼物", 参数 backsend 是否回赠
    NetRequestConst.REQUEST_FRIEND_RECEIVELIST = "friend.receivelist"; //"被申请列表", 参数 backsend 是否回赠
    NetRequestConst.REQUEST_FRIEND_FIND = "friend.find"; // --参数 fuid 查找的用户ID 返回 commendList
    NetRequestConst.REQUEST_FRIEND_CANCELAPPLY = "friend.cancelapply"; //"取消申请成为好友",
    NetRequestConst.REQUEST_FRIEND_SENDALL = "friend.sendall"; //键赠送礼物",
    NetRequestConst.REQUEST_FRIEND_RECEIVEALL = "friend.receiveall"; //"接受全部礼物并回赠",
    NetRequestConst.REQUEST_FRIEND_UNFRIEND = "friend.unfriend"; //"接受全部礼物并回赠",
    NetRequestConst.REQUEST_FRIEND_REFUSEALL = "friend.refuseall"; //"全部拒绝",
    NetRequestConst.REQUEST_FRIEND_ACCEPTALL = "friend.acceptall"; //"全部拒绝",
    /**
    * 亲家消息
    */
    NetRequestConst.REQUEST_SADUN_GETINFO = "sadun.getinfo"; //亲家消息
    NetRequestConst.REQUEST_SADUN_VISIT = "sadun.visit"; //拜访请求
    NetRequestConst.REQUEST_SADUN_CANCELVISIT = "sadun.cancelvisit"; //取消拜访
    NetRequestConst.REQUEST_SADUN_REFUSEVISIT = "sadun.refusevisit"; //拒绝拜访 参数 fchildId , fuid
    NetRequestConst.REQUEST_SADUN_AGREEVISIT = "sadun.agreevisit"; //拒绝拜访 参数 childId , fuid，wifeId
    NetRequestConst.REQUEST_SADUN_GETVISITME = "sadun.getvisitedme"; // 参数  aquality，sex
    NetRequestConst.REQUEST_SADUN_GETFRIENDLISTINFO = "sadun.getfriendlistinfo";
    NetRequestConst.REQUEST_SADUN_READCALLBACK = "sadun.readcallback";
    /**
     * 帮会任务
     */
    NetRequestConst.REQUEST_ALLIANCETASK_FIGHT = "alliancetask.fight";
    NetRequestConst.REQUEST_ALLIANCETASK_EXTRA = "alliancetask.extra";
    NetRequestConst.REQUEST_ALLIANCETASK_BUFF = "alliancetask.buff";
    NetRequestConst.REQUEST_ALLIANCETASK_REWARD = "alliancetask.reward";
    NetRequestConst.REQUEST_ALLIANCETASK_RANK = "alliancetask.rank";
    NetRequestConst.REQUEST_ALLIANCETASK_INIT = "alliancetask.initalliancetask";
    NetRequestConst.REQUEST_ALLIANCETASK_OPENALLIANCETASK = "alliancetask.openalliancetask";
    /**
     * 排行榜相关接口
     */
    NetRequestConst.REQUEST_RANKG_INDEX = "rankg.index";
    NetRequestConst.REQUEST_RANKG_VISIT = "rankg.visit";
    NetRequestConst.REQUEST_RANKG_USERSHOT = "rankg.usershot";
    NetRequestConst.REQUEST_ATKRACE_USERSHOT = "atkraceg.usershot";
    NetRequestConst.REQUEST_IMACY_USERSHOT = "imacy.usershot";
    NetRequestConst.REQUEST_POWER_USERSHOT = "power.usershot";
    /**
     * 翠玉生辉活动
     */
    NetRequestConst.REQUEST_ACTIVITY_GETJADERANK = "activity.getjaderank";
    NetRequestConst.REQUEST_ACTIVITY_GETJADEITEMA = "activity.getjadeitema";
    NetRequestConst.REQUEST_ACTIVITY_SETJADELOCK = "activity.setjadelock";
    // 虎牢关
    NetRequestConst.REQUEST_ACTIVITY_TIGERTRAPPASSATTACKTHEBOSS = "activity.tigertrappassattacktheboss";
    NetRequestConst.REQUEST_ACTIVITY_REDEEMSKIN = "activity.redeemskin";
    // 暴击虎牢关
    NetRequestConst.REQUEST_ACTIVITY_HULAOSHOPGIFT = "activity.hulaoshopgift";
    NetRequestConst.REQUEST_ACTIVITY_HULAOATTACKTHEBOSS = "activity.hulaoattacktheboss";
    NetRequestConst.REQUEST_ACTIVITY_HULAONUMREWARD = "activity.hulaonumreward";
    NetRequestConst.REQUEST_ACTIVITY_HULAOREDEEMSKIN = "activity.hulaoredeemskin";
    NetRequestConst.REQUEST_CROSSCHAT_SENDMSG = "crosschat.sendmsg"; //跨服聊天发送消息
    NetRequestConst.REQUEST_CROSSCHAT_GETMSG = "crosschat.getmsg"; //跨服聊天获取消息
    /**
     * 私聊
     */
    NetRequestConst.REQUEST_PRICHAT_GETMSG = "privatechat.getmsg";
    NetRequestConst.REQUEST_PRICHAT_SENDMSG = "privatechat.sendmsg";
    NetRequestConst.REQUEST_PRICHAT_SETREAD = "privatechat.setisread";
    NetRequestConst.REQUEST_PRICHAT_PUSHMSG = "push.msg";
    /**
     * 设置玩家已沉迷
     */
    NetRequestConst.REQUEST_OTHERINFO_SETREST = "otherinfo.setrest";
    /**
     * 记录3号实名认证信息
     */
    NetRequestConst.REQUEST_OTHERINFO_IDCARDVERIFY = "otherinfo.idcardverify";
    /**
     * 微信小游戏，添加到我的小程序后，领奖
     */
    NetRequestConst.REQUEST_OTHERINFO_GETWXADDMYPROREWARD = "otherinfo.getwxaddmyproreward";
    /**
     * 微信小游戏，悬浮窗进入后，领奖
     */
    NetRequestConst.REQUEST_OTHERINFO_GETWXADDFLOAT = "otherinfo.getwxaddfloat";
    /**
     * 游戏统计
     */
    NetRequestConst.REQUEST_STATS_CLICKEVENT = "stats.clickevent";
    /**
     * 帮会充值
     */
    NetRequestConst.REQUEST_ACTIVITY_GETALLICHARGEINFO = "activity.getallichargeinfo";
    //领取奖励
    NetRequestConst.REQUEST_ACTIVITY_GETALLICHARGEREWARD = "activity.getallichargereward";
    //以下为统计类型
    /**
     * pos 1主界面按钮 2另外1个
     * kid = vithirdpay
     */
    NetRequestConst.KID_VITHIRDPAY = "vithirdpay";
    /**
    * pos 位置id1=点击【营救红颜】活动的入口
      位置id2=点击活动界面的【商铺兑换】按钮
      位置id3=点击活动界面的【排行奖励】按钮
    * kid = rescueAc
    */
    NetRequestConst.KID_RESCUEAC = "rescueAc";
    /**
    * pos
      位置id1=点击【筑阁祭天】活动的入口
      位置id2=点击【活动任务】按钮
      位置id3=点击【100%的箱子（仅限查看）】按钮
      位置id4=点击【活动任务里的大红颜】按钮
    * kid = buildingWorshipAc 筑阁祭天统计
    */
    NetRequestConst.KID_BUILDINGWORSHIPAC = "buildingWorshipAc";
    /**
     * 特别宝箱
     */
    NetRequestConst.KID_RECHARGEBOXSPAC = "rechargeBoxSPAc";
    /**
     * 七夕情人节
     */
    NetRequestConst.KID_DOUBLESEVENTH = "doubleSeventh";
    /**
     * 跳过新手剧情
     */
    NetRequestConst.KID_NEWPLAYERSKIP = "newplayerskip";
    /**
    * 支付面板弹出统计
    */
    NetRequestConst.KID_GAMEPAYCLICK = "gamepayclick";
    /**
    * 支付点击统计
    */
    NetRequestConst.REQUST_STATS_CLICKPAYEVENT = "stats.clickpayevent";
    /**
 * 议事院信息
 */
    NetRequestConst.REQUST_COUNCIL_GETEVENTINFO = "council.geteventinfo";
    NetRequestConst.REQUST_COUNCIL_GETEVENTDETAIL = "council.getdetailinfo";
    NetRequestConst.REQUST_COUNCIL_JOINEVENT = "council.joincouncil";
    NetRequestConst.REQUST_COUNCIL_GETRANK = "council.getrank";
    NetRequestConst.REQUST_COUNCIL_GETREWARD = "council.getrewards";
    /**
     * 金銮殿相关
     */
    NetRequestConst.REQUEST_POLICY_INDEX = "policy.index";
    NetRequestConst.REQUEST_POLICY_SETSIGN = "policy.setsign"; //"设置话语",
    NetRequestConst.REQUEST_POLICY_ZANGD = "policy.zangd"; // "赞新政令",
    NetRequestConst.REQUEST_POLICY_SETREAD = "policy.setread"; // "新国策/政令已读", 参数 dtype 1国策 2政令
    NetRequestConst.REQUEST_POLICY_SETSP = "policy.setsp"; //"设置国策", --参数 spid 国策id
    NetRequestConst.REQUEST_POLICY_SETGD = "policy.setgd"; //"设置政令", --参数 gdid 政令id gdtype 政令类型
    NetRequestConst.REQUEST_POLICY_REFRESHGD = "policy.refreshgd"; //"刷新政令",
    NetRequestConst.REQUEST_SERVANT_UPAMUAURA = "servant.upamuletaura"; //护符升级
    //夺帝
    NetRequestConst.REQUEST_KINGS_KINGINFO = "king.kinginfo";
    NetRequestConst.REQUEST_KINGS_VOTE = "king.kingvote";
    NetRequestConst.REQUEST_KINGS_TASK = "king.kingtask";
    NetRequestConst.REQUEST_KINGS_EXCHANGE = "king.kingexchange";
    NetRequestConst.REQUEST_KINGS_CONVERT = "king.convert";
    /**
     * 营救红颜
     */
    NetRequestConst.REQUEST_ACTIVITY_GETRESCUEACTIVE = "activity.getrescueactive";
    NetRequestConst.REQUEST_ACTIVITY_BUYRESCUEITEM = "activity.buyrescueitem";
    NetRequestConst.REQUEST_ACTIVITY_USERESCUEITEM = "activity.userescueitem";
    NetRequestConst.REQUEST_ACTIVITY_ATTACKRESCUEBOSS = "activity.attackrescueboss";
    NetRequestConst.REQUEST_ACTIVITY_BUYRESCUESHOP = "activity.buyrescueshop";
    NetRequestConst.REQUEST_ACTIVITY_GETRESCUEREWARD = "activity.getrescuereward";
    // 筑阁祭天
    NetRequestConst.REQUEST_ACTIVITY_GETBUILDINGWORSHIPREWARD = "activity.getbuildingworshipreward"; // 抽奖
    NetRequestConst.REQUEST_ACTIVITY_GETBUILDINGWORSHIPBOXREWARD = "activity.getbuildingworshipboxreward"; // 领取箱子奖励
    NetRequestConst.REQUEST_ACTIVITY_GETBUILDINGWORSHIPTASKREWARD = "activity.getbuildingworshiptaskreward"; // 领取任务奖励
    // 荷塘月色
    NetRequestConst.REQUEST_ACTIVITY2S_GETMOONLIGHTREWARD = "activity2s.getmoonlightreward"; // 抽奖
    NetRequestConst.REQUEST_ACTIVITY2S_GETMOONLIGHTBOXREWARD = "activity2s.getmoonlightboxreward"; // 领取箱子奖励
    NetRequestConst.REQUEST_ACTIVITY2S_GETMOONLIGHTTASKREWARD = "activity2s.getmoonlighttaskreward"; // 领取任务奖励
    // 许愿天灯
    NetRequestConst.REQUEST_ACTIVITY2S_GETLANTERNLOTTERY = "activity2s.getlanternlottery"; // 许愿天灯活动抽奖
    NetRequestConst.REQUEST_ACTIVITY2S_GETLANTERNRATE = "activity2s.getlanternrate"; // 许愿天灯活动进度领奖
    NetRequestConst.REQUEST_ACTIVITY2S_GETLANTERNITEMT = "activity2s.getlanternitemt"; // 许愿天灯活动任务奖励
    NetRequestConst.REQUEST_ACTIVITY2S_GETLANTERNNOTE = "activity2s.getlanternnote"; // 许愿天灯活动留言领奖
    // 欢心夏日
    NetRequestConst.REQUEST_ACTIVITY2S_GETSEASIDEGAMEREWARD = "activity2s.getseasidegamereward"; // 抽奖
    NetRequestConst.REQUEST_ACTIVITY2S_GETSEASIDEGAMEBOXREWARD = "activity2s.getseasidegameboxreward"; // 领取箱子奖励
    NetRequestConst.REQUEST_ACTIVITY2S_GETSEASIDEGAMETASKREWARD = "activity2s.getseasidegametaskreward"; // 领取任务奖励
    //携美同游
    NetRequestConst.REQUEST_ACTIVITY_GETSPRINGOUTINGREWARD = "activity.getspringoutingreward"; // 抽奖
    NetRequestConst.REQUEST_ACTIVITY_GETSPRINGOUTINGBOXREWARD = "activity.getspringoutingboxreward"; // 领取箱子奖励
    NetRequestConst.REQUEST_ACTIVITY_GETSPRINGOUTINGTASKREWARD = "activity.getspringoutingtaskreward"; // 领取任务奖励
    NetRequestConst.REQUEST_ACTIVITY_GETFIRSTOPENSPRINGOUTING = "activity.getfirstopenspringouting"; // 携美同游-记录首次进入
    // 合服纪念活动
    NetRequestConst.REQUEST_ACTIVITY_GETMERGEZONETIME = "activity.getmergezonetime"; // 查询合服时间
    NetRequestConst.REQUEST_ACTIVITY_GETMERGEACTIVEITEML = "activity.getmergeactiveiteml"; // 领取登录奖励
    NetRequestConst.REQUEST_ACTIVITY_GETMERGEACTIVEITEMT = "activity.getmergeactiveitemt"; // 领取任务奖励
    NetRequestConst.REQUEST_ACTIVITY_BUYMERGEACTIVESHOP = "activity.buymergeactiveshop"; // 特卖商店购买物品
    NetRequestConst.REQUEST_ACTIVITY_GETMERGEACTIVEITEMC = "activity.getmergeactiveitemc"; // 特卖商店购买物品
    NetRequestConst.REQUEST_CROSS_SERVANT_RANKINFO = "crossservantpower.servantpowerinfo"; // 排行信息
    NetRequestConst.REQUEST_CROSS_SERVANT_TASKREWARD = "crossservantpower.getcsstaskreward"; // 领取任务奖励
    // -----帮会战相关 接口
    /**
     * 获取帮会战 model
     */
    NetRequestConst.REQYEST_ALLIANCEWAR_GETMYALLIANCEINFO = "alliancewar.getmyallianceinfo";
    /**
     * 派遣门客的接口
     */
    NetRequestConst.REQYEST_ALLIANCEWAR_SELECTSERVANT = "alliancewar.selectservant";
    /**
     * 撤回派遣门客的接口
     */
    NetRequestConst.REQYEST_ALLIANCEWAR_CANCELSERVANT = "alliancewar.cancelservant";
    /**
     * 使用计策
     */
    NetRequestConst.REQYEST_ALLIANCEWAR_SELECTSTRATAGEM = "alliancewar.selectstratagem";
    /**
     * 帮会战 --排行榜
     */
    NetRequestConst.REQYEST_ALLIANCEWAR_GETRANK = "alliancewar.getrank";
    /**
     * 帮会战  log
     */
    NetRequestConst.REQYEST_ALLIANCEWAR_GETWARLOG = "alliancewar.getwarlog";
    /**
     * 帮会战 --排行榜
     */
    NetRequestConst.REQUEST_ALLIANCEWAR_GETDETAIL = "alliancewar.getwardetail";
    /**
     * 帮会战 -- 奖励
     */
    NetRequestConst.REQUEST_ALLIANCEWAR_GETREWARDS = "alliancewar.getrewards";
    NetRequestConst.REQUEST_OTHERINFO_QUESTIONNAIRE = "otherinfo.questionnaire"; // 领取任务奖励
    /**新问卷调查 */
    NetRequestConst.REQUEST_OTHERINFO_UNIQUE_QUESTIONNAIRE = "otherinfo.uniquequestionnaire";
    /**
     * 微信客服礼包领奖励
     */
    NetRequestConst.REQUEST_OTHERINFO_GETWXCHATWARD = "otherinfo.getwxchatward";
    /*
    * 可汗活动 商店购买、积分兑换
    */
    NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSSHOPBUY = "activity.wipebossshopbuy";
    NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSSEARCH = "activity.wipebosssearch";
    NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSATTACK = "activity.wipebossattack";
    NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSBUYSEARCH = "activity.wipebossbuysearch";
    NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSGETBOSSHP = "activity.wipebossgetbosshp";
    NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSGETRANK = "activity.wipebossgetrank";
    NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSGETBOSSNUM = "activity.wipebossgetbossnum";
    NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSRECOVER = "activity.wipebossrecoverservant";
    NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSENEMY = "activity.wipebossenemy";
    NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSKILLLOG = "activity.wipebossgetkilllog";
    /*
    * 可汗活动 商店购买、积分兑换
    */
    NetRequestConst.REQUEST_WIPEBOSS_SHOPBUY = "wipeboss.shopbuy";
    NetRequestConst.REQUEST_WIPEBOSS_SEARCH = "wipeboss.search";
    NetRequestConst.REQUEST_WIPEBOSS_ATTACK = "wipeboss.attack";
    NetRequestConst.REQUEST_WIPEBOSS_BUYSEARCH = "wipeboss.buysearch";
    NetRequestConst.REQUEST_WIPEBOSS_GETBOSSHP = "wipeboss.getbosshp";
    NetRequestConst.REQUEST_WIPEBOSS_GETRANK = "wipeboss.getrank";
    NetRequestConst.REQUEST_WIPEBOSS_GETBOSSNUM = "wipeboss.getbossnum";
    NetRequestConst.REQUEST_WIPEBOSS_RECOVER = "wipeboss.recoverservant";
    NetRequestConst.REQUEST_WIPEBOSS_ENEMY = "wipeboss.enemy";
    NetRequestConst.REQUEST_WIPEBOSS_KILLLOG = "wipeboss.getkilllog";
    /**
 * 皮肤修改
 */
    NetRequestConst.REQUST_CROSSSKIN_GETSKINRANK = "crossskin.getskinrank";
    NetRequestConst.REQUST_CROSSSKIN_GETSKINFIRST = "crossskin.getskinfirst";
    NetRequestConst.REQUST_CROSSSKIN_USERSKINSHOT = "crossskin.userskinshot";
    //刺客首领
    NetRequestConst.REQUST_ALLIANCE_OPENINFINITY = "alliance.openinfinity"; //"开启军团无限副本",
    NetRequestConst.REQUST_ALLIANCE_GETINFINITYRANK = "alliance.getinfinityrank"; //"获得军团无限副本攻击排行榜",
    NetRequestConst.REQUST_ALLIANCE_ATTACKINFINITY = "alliance.attackinfinity"; //"攻击军团无限副本",
    NetRequestConst.REQUST_ALLIANCE_GETINFINITYLOG = "alliance.getinfinitylog"; //"攻击军团无限副本",
    NetRequestConst.REQUST_ALLIANCETASK_BATCHFIGHT = "alliancetask.batchfight";
    /**
     * 绝地擂台排行榜
     */
    NetRequestConst.REQUEST_BATTLEGROUND_GETANK = "battleground.getrank";
    /**绝地擂台*/
    NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND = "battleground.getglobalinfo";
    NetRequestConst.REQUST_ACTIVITY_BATTLEGROUNDDETAIL = "battleground.getalliancedetail";
    NetRequestConst.REQUST_ACTIVITY_BATTLEGROUNDINDEX = "battleground.index";
    NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_FIGHT = "battleground.fight";
    NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_ATTRLIST = "battleground.attrlist";
    NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_ATTRBUY = "battleground.attrbuy";
    NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_CHALLENGE = "battleground.challenge";
    NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_KILL = "battleground.kill";
    NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_RANDREWARD = "battleground.randreward";
    NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_LIST = "battleground.list";
    NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_REVENGE = "battleground.revenge";
    NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_GETINFO = "battleground.getinfo";
    NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_USEEXTRA = "battleground.useextra";
    NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_ENERMY = "battleground.getenemy";
    NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_AUTOFIGHT = "battleground.batchfight";
    NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_HANDLE = "battleground.handle";
    //门客战的model信息
    NetRequestConst.REQUEST_COUNTRYWAY_GETMODEL = "countrywar.getinfo";
    /**派遣门客 */
    NetRequestConst.REQUEST_COUNTRYWAY_SELECTSERVANT = "countrywar.selectservant";
    /**撤回派遣门客 */
    NetRequestConst.REQUEST_COUNTRYWAY_CANCELSERVANT = "countrywar.cancelservant";
    /**选择计策 */
    NetRequestConst.REQUEST_COUNTRYWAY_SELECTSTRATAGEM = "countrywar.selectstratagem";
    /**公告*/
    NetRequestConst.REQUEST_COUNTRYWAY_UPDATEANNOUNCE = "countrywar.updateannounce";
    /**购买计策 */
    NetRequestConst.REQUEST_COUNTRYWAY_BUYSTRATAGEM = "countrywar.buystratagem";
    /**战斗信息 */
    NetRequestConst.REQUEST_COUNTRYWAY_WARDETAIL = "countrywar.getwardetail";
    /**个人排行 */
    NetRequestConst.REQUEST_COUNTRYWAY_GETDPSRANK = "countrywar.getdpsrank";
    /**区服排行 */
    NetRequestConst.REQUEST_COUNTRYWAY_GETZIDRANK = "countrywar.getzidrank";
    /**领取奖励 */
    /**活动的首次标记 */
    NetRequestConst.REQUEST_ACTIVITY_FIRSTFLAG = "activity.firstflag";
    NetRequestConst.REQUEST_FANLI_GETOPEN_FIRST = "activity.getfirstopenfanli"; //"范蠡活动-记录首次进入",
    NetRequestConst.REQUEST_FANLI_GETREWARD = "activity.getfanlireward"; // "范蠡活动-抽取奖励",
    NetRequestConst.REQUEST_FANLI_GETBOXREWARD = "activity.getfanliboxreward"; //"范蠡活动-领取箱子奖励",
    NetRequestConst.REQUEST_ACTIVITY2S_GETWIFESKINREWARD = "activity2s.getwifeskinreward"; // "红颜皮肤活动-抽取奖励",
    NetRequestConst.REQUEST_ACTIVITY2S_GETWIFESKINBOXREWARD = "activity2s.getwifeskinboxreward"; //"红颜皮肤活动-领取箱子奖励",
    //真田幸村
    NetRequestConst.REQUEST_ACTIVITY_XINGCUN_ITEM = "activity.getxingcunitemt";
    NetRequestConst.REQUEST_ACTIVITY_RANSTACKATTACK = "activity.ransacktraitorattack"; //"搜查奸臣-搜查",
    NetRequestConst.REQUEST_ACTIVITY_RANSTACKATTACK_SKIN = "activity.rtredeemskin"; //"搜查奸臣-兑换奖励",
    //查抄奸臣 周年
    NetRequestConst.REQUEST_ACTIVITY2S_RSTSPSEARCH = "activity2s.rstspsearch"; //"搜查奸臣-搜查",
    NetRequestConst.REQUEST_ACTIVITY2S_RSTSPEXCHANGE = "activity2s.rstspexchange"; //"搜查奸臣-兑换奖励",
    //夜观天象 周年
    NetRequestConst.REQUEST_ACTIVITY2S_STAZERSERCH = "activity2s.stazersearch"; //"搜查奸臣-搜查",
    NetRequestConst.REQUEST_ACTIVITY2S_STAZEREXCHANGE = "activity2s.stazerexchange"; //"搜查奸臣-兑换奖励",
    //夜观天象 单人
    NetRequestConst.REQUEST_ACTIVITY2S_STARGAZERSINGLEATTACK = "activity2s.stargazersingleattack"; //"夜观天象-搜查",
    NetRequestConst.REQUEST_ACTIVITY2S_SGREDEEMSKIN = "activity2s.sgredeemskin"; //"夜观天象-兑换奖励",
    //翻牌活动
    NetRequestConst.REQUEST_ACTIVITY_FLIPCARD_GETREWARD = "activity.getflipcardreward"; //"翻牌活动-单次翻牌奖励", 参数 抽奖 tid   X
    NetRequestConst.REQUEST_ACTIVITY_FLIPCARD_GET_ALL_REWARD = "activity.getflipcardallreward"; //"翻牌活动-剩余牌全部翻奖励",
    NetRequestConst.REQUEST_ACTIVITY_FLIPCARD_REPLACE = "activity.getflipcardreplace"; // "翻牌活动-刷新牌组" 
    NetRequestConst.REQUEST_ACTIVITY_FLIPCARD_BOX_REWARD = "activity.getflipcardboxreward"; //"翻牌活动-领取箱子奖励",,参数 gid：第几阶段 
    NetRequestConst.REQUEST_ACTIVITY_FLIPCARD_TASK_REWARD = "activity.getflipcardtaskreward"; //"翻牌活动-领取任务奖励", -参数 taskId 任务档位id
    //平成时代
    NetRequestConst.REQUEST_ACTIVITY2S_GETREIGNTITLEREWARD = "activity2s.getreigntitlereward"; //"平成时代-领取头像框",
    NetRequestConst.REQUEST_ACTIVITY2S_BUYREIGNTITLETASKREWARD = "activity2s.buyreigntitletaskreward"; //平成时代-购买任务奖励",
    NetRequestConst.REQUEST_ACTIVITY2S_GETREIGNTITLETASKREWARD = "activity2s.getreigntitletaskreward"; //平成时代-领取任务奖励",
    NetRequestConst.REQUEST_ACTIVITY2S_GETREIGNTITLERANDREWARD = "activity2s.getreigntitlerandreward"; //平成时代-获取随机奖励"
    NetRequestConst.REQUEST_ACTIVITY2S_REPLACEREIGNTITLE = "activity2s.replacereigntitle"; //平成时代-兑换文字奖励
    NetRequestConst.REQUEST_ACTIVITY2_MONOPOLY_GET_ITEMS_T = "activity2s.getmonopolyitemt"; //"大富翁活动-任务完成领奖", 参数 activeId 活动Id 参数 taskId 档位id -参数 thedays 第几天 
    NetRequestConst.REQUEST_ACTIVITY2_MONOPOLY_GET_ITEMS_A = "activity2s.getmonopolyitema"; //"大富翁活动-任务完成领奖", 参数 activeId 活动Id turnId 轮次id data.rewards 奖励
    NetRequestConst.REQUEST_ACTIVITY2_MONOPOLY_GET_DICING = "activity2s.monopolydicing"; //"大富翁活动-掷骰子"", 参数 activeId 活动Id 参数 taskId 返回 data.rewards 奖励 data.step 本次投掷骰子数
    // 玩吧领取vip特权礼包
    NetRequestConst.REQUEST_OTHERINFO_GETWBVIPGIFTREWARD = "otherinfo.getwbvipgiftreward";
    //群芳会
    //刷新Model
    NetRequestConst.REQUEST_WIFEBATTLE_EXTRACRASHMODEL = "wifebattle.extracrashmodel";
    NetRequestConst.REQUEST_WIFEBATTLE_CRASHMODEL = "wifebattle.crashmodel";
    //入口
    NetRequestConst.REQUEST_WIFEBATTLE_INDEX = "wifebattle.index";
    //群芳会搜索对手
    NetRequestConst.REQUEST_WIFEBATTLE_SEARCH = "wifebattle.search";
    //群芳会开始战斗接口
    NetRequestConst.REQUEST_WIFEBATTLE_FIGHT = "wifebattle.fight";
    //群芳会排行榜接口
    NetRequestConst.REQUEST_WIFEBATTLE_RANK = "wifebattle.rank";
    //群芳会排积分兑换
    NetRequestConst.REQUEST_WIFEBATTLE_EXCHANGESHOP = "wifebattle.exchangeshop";
    //群芳会榜单记录接口
    NetRequestConst.REQUEST_WIFEBATTLE_LIST = "wifebattle.list";
    //群芳会战斗回放
    NetRequestConst.REQUEST_WIFEBATTLE_FIGHTREVIEW = "wifebattle.fightreview";
    //群芳会升级宝典
    NetRequestConst.REQUEST_WIFEBATTLE_YONGLEUP = "wifebattle.yongleup";
    //跨服群芳会
    //跨服群芳会榜单记录接口
    NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_GETINFO = "wifebattlecross.getinfo"; //跨服群芳会入口面板
    NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_SEARCH = "wifebattlecross.search"; //跨服群芳会搜索对手
    NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_FIGHT = "wifebattlecross.fight"; //跨服群芳会开始战斗接口
    NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_LIST = "wifebattlecross.list"; //跨服群芳会榜单记录接口
    NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_FIGHTREVIEW = "wifebattlecross.fightreview"; //跨服群芳会战斗回放
    NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_RANK = "wifebattlecross.rank"; //跨服群芳会排行榜接口
    NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_CRASHMODEL = "wifebattlecross.crashmodel"; //跨服群芳会刷新modl
    NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_GETZIDREWARD = "wifebattlecross.getzidreward"; //跨服群芳会领取区服奖励
    //qq会员
    NetRequestConst.REQUEST_OTHERINFO_GETWBQQREWARD = "otherinfo.getwbqqreward";
    //投壶活动接口
    /**抽奖 */
    NetRequestConst.REQUEST_ACTIVITY_THROWARROWLOTTERY = "activity2s.throwarrowlottery";
    /**次数奖励 领取奖励 */
    NetRequestConst.REQUEST_ACTIVITY_THROWARROWGETACHIEVEMENTRWD = "activity2s.throwarrowgetachievementrwd";
    /**充值奖励 领取奖励 */
    NetRequestConst.REQUEST_ACTIVITY_THROWARROWGETRECHARGERWD = "activity2s.throwarrowgetrechargerwd";
    /**log */
    NetRequestConst.REQUEST_ACTIVITY_THROWARROWGETLOGS = "activity2s.throwarrowgetlogs";
    /**
     * 领取防诈骗奖励
     */
    NetRequestConst.REQUEST_USER_GETANTIDECEPTION = "user.getantideception";
    /**
     * 回归 签到奖励
     */
    NetRequestConst.REBACK_GETSIGNREWARD = "reback.getlogin";
    /**
 * 回归 充值奖励
 */
    NetRequestConst.REBACK_GETRECHARGEREWARD = "reback.getrecharge";
    /**
     * 回归 任务奖励
     */
    NetRequestConst.REBACK_GETTASKREWARD = "reback.gettask";
    /**
     *  --参数 activeId 活动Id
    --参数 issure 是否确认答题，传1
    --返回 model activity，item
    --返回 data.rewards 上次答题奖励（可能有）
     */
    NetRequestConst.REQUEST_ACTIVITY2S_ANSWERWIN = "activity2s.answerin"; // "科举考核-活动入口&二次确认答题"
    /**
     *  --参数 activeId 活动Id
    --参数 issure 是否确认答题，传1
    --返回 model activity，item
    --返回 data.rewards 上次答题奖励（可能有）
     */
    NetRequestConst.REQUEST_ACTIVITY2S_ANSWEROPT = "activity2s.answeropt"; // 
    /*
     --参数 activeId 活动Id
    --参数 issure 是否确认答题，传1
    --返回 model activity，item
    --返回 data.rewards 上次答题奖励（可能有）
    */
    NetRequestConst.REQUEST_ACTIVITY2S_ANSWERRANK = "activity2s.answerrank";
    //电玩大本营
    /**电玩大本营-- recive charge reward */
    NetRequestConst.REQUST_ACTIVITY_ARCADEGETCHARGE = "activity2s.arcadegetcharge";
    /**电玩大本营--recive task reward */
    NetRequestConst.REQUST_ACTIVITY_ARCADEGETTASKRWD = "activity2s.arcadegettaskrwd";
    /**电玩大本营--积分兑换 */
    NetRequestConst.REQUST_ACTIVITY_ARCADESHOPBUY = "activity2s.arcadeshopbuy";
    /**电玩大本营--抽奖 */
    NetRequestConst.REQUST_ACTIVITY_ARCADELOTTERY = "activity2s.arcadelottery";
    /**电玩大本营--日志 */
    NetRequestConst.REQUST_ACTIVITY_ARCADEGETLOGS = "activity2s.arcadegetlogs";
    NetRequestConst.REQUST_ACTIVITY_ARCADEINFO = "activity2s.arcadeinfo"; //"欢乐时光老虎机活动-查看活动",
    NetRequestConst.REQUST_ACTIVITY_WININFO = "activity2s.arcadewininfo"; // "欢乐时光老虎机活动-奖励列表",
    /**
     *   --参数 activeId 活动Id
    --参数 lotterynum 是否10连抽 1是 0否
    --返回 data.rewards 奖励
    --返回 data.model(activity)
     */
    NetRequestConst.REQUST_ACTIVITY_GETPACKREWARD = "activity2s.getpackreward"; // 获取周年庆-旧红颜皮肤特惠 抽奖 的 奖励",
    /**
     * 参数 activeId 活动Id
    --返回 data.rewards 奖励
    --返回 data.model(activity)
     */
    NetRequestConst.REQUST_ACTIVITY_GETPACK_BOXREWARD = "activity2s.getpackboxreward"; // "领取周年庆-旧红颜皮肤特惠活动的宝箱奖励",
    NetRequestConst.REQUST_ACTIVITY_YEARRANKIN = "activity2s.yearrankin"; // "领取周年庆-风流天子入口",
    NetRequestConst.REQUST_ACTIVITY_YEAR_DAYSIGN = "activity2s.getoneyearsignreward"; // "领取周年庆-风流天子入口",
    NetRequestConst.REQUST_ACTIVITY_YEAR_OVERVIEW = "activity2s.oneyearoverviewinfo"; // "领取周年庆-总览",
    NetRequestConst.REQUEST_ADULT_GETMINFO = "adult.getminfo";
    NetRequestConst.REQUEST_ADULT_GETINFO = "adult.getinfo";
    /** 注册七日-领取奖励 */
    NetRequestConst.REQUEST_OTHERINFO_GETLOGINWEEKREWARD = "otherinfo.getloginweekreward";
    /** 注册七日-购买物品 */
    NetRequestConst.REQUEST_OTHERINFO_BUYLOGINWEEKGIFT = "otherinfo.buyloginweekgift";
    /** 注册七日-设置新弹出标识 */
    NetRequestConst.REQUEST_OTHERINFO_SETLOGINWEEKFIRSTFLAG = "otherinfo.setloginweekfirstflag";
    /** 麦田飘香 */
    NetRequestConst.REQUEST_RYEHARVEST_SENDFLOWERS = "activity2s.getryeharvestreward";
    /** 麦田飘香 */
    NetRequestConst.REQUEST_RYEHARVEST_GETBOX = "activity2s.getryeharvestboxreward";
    /** 麦田飘香 */
    NetRequestConst.REQUEST_RYEHARVEST_GETBIGPRIZE = "activity2s.getryeharvestbigprize";
    /** 麦田飘香 */
    NetRequestConst.REQUEST_RYEHARVEST_GETCHARGE = "activity2s.getryeharvesttaskreward";
    /** 麦田飘香 */
    NetRequestConst.REQUEST_RYEHARVEST_GETRYEHARVESTTASK = "xxx";
    /** 麦田飘香 */
    NetRequestConst.REQUEST_RYEHARVEST_BUYRYEHARVESTSHOP = "xxx";
    /** 麦田飘香 */
    NetRequestConst.REQUEST_MOTHERDAY_EXCHANGEMOTHERDAYSCENE = "xxx";
    /**零元礼包红点 */
    NetRequestConst.REQUEST_ZEROGIFT_FIRSTFLAG = "otherinfo.setzerogiftfirstflag";
    /**零元礼包购买 */
    NetRequestConst.REQUEST_BUY_ZEROGIFT = "otherinfo.buyzerogift";
    /**箭无虚发 射箭 */
    NetRequestConst.REQUEST_ARROW_SHOOTING = "activity2s.arrowshooting";
    /**箭无虚发 升级箭矢 */
    NetRequestConst.REQUEST_ARROW_UPLEVEL = "activity2s.arrowuplevel";
    /**箭无虚发 领取宝箱奖励 */
    NetRequestConst.REQUEST_ARROW_GETBOSREWARD = "activity2s.arrowgetboxreward";
    /**箭无虚发 获取排行榜 */
    NetRequestConst.REQUEST_ARROW_GETRANK = "activity2s.arrowgetrank";
    /** 性转设定
     * -参数 stype 设定类型 1表示置开关 2表示设置男女冯小怜
        --参数 sflag 开关值 大于等于1表示开 否则表示关
     */
    NetRequestConst.REQUEST_USER_REVERSIONSETTING = "user.reversionsetting";
    /**追缴贼寇-抽取奖励" */
    NetRequestConst.REQUEST_CHASEBANDIT_ATKBOSS = "activity2s.getchasebanditreward";
    /**追缴贼寇-领取箱子奖励" */
    NetRequestConst.REQUEST_CHASEBANDIT_BOXREWARD = "activity2s.getchasebanditboxreward";
    /**追缴贼寇-领取任务奖励" */
    NetRequestConst.REQUEST_CHASEBANDIT_TASKREWARD = "activity2s.getchasebandittaskreward";
    /** 红颜性转设置
     * -参数 wifeId 红颜ID
    --参数 sexflag 性别设置 大于等于1表示置为男红颜 否则为女红颜
     */
    NetRequestConst.REQUEST_WIFE_WIFESEXSETTING = "wife.wifesexsetting";
    //新科举全屏活动
    /**
     *  --参数 activeId 活动Id
    --参数 issure 是否确认答题，传1
    --返回 model activity，item
    --返回 data.rewards 上次答题奖励（可能有）
     */
    NetRequestConst.REQUEST_ACTIVITY2S_NEWANSWERWIN = "activity2s.newanswerin"; // "科举考核-活动入口&二次确认答题"
    /**
     *  --参数 activeId 活动Id
    --参数 issure 是否确认答题，传1
    --返回 model activity，item
    --返回 data.rewards 上次答题奖励（可能有）
     */
    NetRequestConst.REQUEST_ACTIVITY2S_NEWANSWEROPT = "activity2s.newansweropt"; // 
    /*
     --参数 activeId 活动Id
    --参数 issure 是否确认答题，传1
    --返回 model activity，item
    --返回 data.rewards 上次答题奖励（可能有）
    */
    NetRequestConst.REQUEST_ACTIVITY2S_NEWANSWERRANK = "activity2s.newanswerrank";
    /** 狂欢之夜基本信息*/
    NetRequestConst.REQUEST_ACTIVITY2S_GETCARNIVALINFO = "activity2s.getcarnivalinfo";
    /** 狂欢之夜活动攻击*/
    NetRequestConst.REQUEST_ACTIVITY2S_CARNIVALATTACK = "activity2s.carnivalattack";
    /** 狂欢之夜活动任务奖励*/
    NetRequestConst.REQUEST_ACTIVITY2S_GETCARNIVALITEMT = "activity2s.getcarnivalitemt";
    /** 狂欢之夜活动轮次完成领奖*/
    NetRequestConst.REQUEST_ACTIVITY2S_GETCARNIVALITEMA = "activity2s.getcarnivalitema";
    /** 狂欢之夜活动消耗完成领奖*/
    NetRequestConst.REQUEST_ACTIVITY2S_GETCARNIVALITEMU = "activity2s.getcarnivalitemu";
    /** 双十一活动总览*/
    NetRequestConst.REQUST_ACTIVITY_SINGLEDAYOVERVIEWINFO = "activity2s.singledayoverviewinfo";
    /** 双十一元宝抽奖活动抽奖*/
    NetRequestConst.REQUST_ACTIVITY_GEMLOTTERYDRAW = "activity2s.gemlotterydraw";
    /** 双十一元宝消耗冲榜*/
    NetRequestConst.REQUEST_ACTIVITY2S_GEMEXPENDRANK = "activity2s.gemexpendrank";
    /** 设置用户自己字符串*/
    NetRequestConst.REQUEST_OTHERINFO_SETKV = "otherinfo.setkv";
    //定军中原
    NetRequestConst.REQUEST_MAINLAND_GETINFO = "conquermainland.getinfo";
    NetRequestConst.REQUEST_MAINLAND_GETMAPINFO = "conquermainland.getmapinfo";
    NetRequestConst.REQUEST_MAINLAND_GETMYTEAMINFO = "conquermainland.getmyteam";
    NetRequestConst.REQUEST_MAINLAND_SELECTSERVANT = "conquermainland.selectservant";
    NetRequestConst.REQUEST_MAINLAND_GETCITYINFO = "conquermainland.getbuildinginfo";
    NetRequestConst.REQUEST_MAINLAND_CANCELSERVANT = "conquermainland.cancelservant";
    NetRequestConst.REQUEST_MAINLAND_PRANK = "conquermainland.getrank";
    NetRequestConst.REQUEST_MAINLAND_ZRANK = "conquermainland.getzidrank";
    NetRequestConst.REQUEST_MAINLAND_RECORDLIST = "conquermainland.getlist";
    NetRequestConst.REQUEST_MAINLAND_RECORDLOG = "conquermainland.getlog";
    /**
     * 领取g71，g72档位奖励
    */
    NetRequestConst.REQUEST_SHOP_THREECHARGEREWARD = "shop.threechargereward";
    /**
     * "获取服务器信息",    --返回 opentime 开服时间
     */
    NetRequestConst.REQUEST_OTHERINFO_GETSERVERINFO = "otherinfo.getserverinfo";
    /**
     * 2019圣诞活动
     */
    //抽奖
    NetRequestConst.REQUEST_ACTIVITY2S_GETMERRYXMASREWARD = "activity2s.getmerryxmasreward";
    //领取任务
    NetRequestConst.REQUEST_ACTIVITY2S_GETMERRYXMASTASKREWARD = "activity2s.getmerryxmastaskreward";
    //进度奖励
    NetRequestConst.REQUEST_ACTIVITY2S_GETMERRYXMASBOXREWARD = "activity2s.getmerryxmasboxreward";
    NetRequestConst.REQUEST_ACTIVITY2S_GETTHXGIVINGREWARD = "activity2s.getthxgivingreward"; //获取感恩节晚餐活动的奖励
    NetRequestConst.REQUEST_ACTIVITY2S_GETTHXGIVINGBOXREWARD = "activity2s.getthxgivingboxreward"; //获取感恩节晚餐活动的宝箱奖励
    /**
     * 五虎进度奖励
     */
    NetRequestConst.REQUEST_ACTIVITY2S_GETFIVETIGERBOXREWARD = "activity2s.getfiveTigerboxreward";
    /**
     * 五虎攻击
     */
    NetRequestConst.REQUEST_ACTIVITY2S_GETFIVETIGERREWARD = "activity2s.getfiveTigerreward";
    /**
     * 征收入口
     */
    NetRequestConst.REQUEST_LEVY_INDEX = "levy.index";
    /**
     * 征收选择/撤回门客
     */
    NetRequestConst.REQUEST_LEVY_SELECTSID = "levy.selectsid";
    /**
     * 征收 同步用户信息
     */
    NetRequestConst.REQUEST_LEVY_CALC = "levy.calc";
    /**
     * 移动小人
     */
    NetRequestConst.REQUEST_MAP_MVPOS = "map.mvpos";
    /**
     * 购买小人
     */
    NetRequestConst.REQUEST_MAP_BUYPERSON = "map.buyperson";
    /**
     * 合成小人
     */
    NetRequestConst.REQUEST_MAP_LVUP = "map.lvup";
    /**
     * 快速合成小人
     */
    NetRequestConst.REQUEST_MAP_LVUPBATCH = "map.lvupbatch";
    /**
     * 删除小人
     */
    NetRequestConst.REQUEST_MAP_DELPERSON = "map.delperson";
    /**
     * 装备升级
     */
    NetRequestConst.REQUEST_SERVANT_EQUIPLEVELUP = "servant.useequipitem";
    NetRequestConst.REQUEST_SERVANT_EQUIPQUALITYUP = "servant.upequipclv";
    NetRequestConst.REQUEST_SERVANT_ACTIVECOMB = "servant.activecombination";
    /**记录客户端引导数据 */
    NetRequestConst.REQUEST_USER_RECORDGUILD = "user.recordguild";
})(NetRequestConst || (NetRequestConst = {}));
