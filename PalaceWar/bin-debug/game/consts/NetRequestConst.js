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
    NetRequestConst.REQUEST_UPGRADE_SERVANT_EQUIP = "servant.servantequip";
    NetRequestConst.REQUEST_UPGRADE_SERVANT_UPSKILLABILITY = "servant.upskinability";
    NetRequestConst.REQUEST_UPGRADE_SERVANT_REDSKINRED = "servant.readservantskinred";
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
    NetRequestConst.REQUEST_WIFE_SKILLEXPEXCHANGE = "wife.skillexpexchange";
    // 省亲
    NetRequestConst.REQUEST_WIFE_BANISH = "wife.banish";
    // 省亲提前召回
    NetRequestConst.REQUEST_WIFE_FINISH = "wife.finish";
    // 省亲购买席位接口
    NetRequestConst.REQUEST_WIFE_BUYBANISHPOS = "wife.buybanishpos";
    // 省亲购买席位接口
    NetRequestConst.REQUEST_WIFE_GETWIFEBANISHMODEL = "wife.getwifebanishmodel";
    // 道具使用
    NetRequestConst.REQUEST_USE_ITEM = "item.use";
    // 道具 背包里使用道具选择奖励
    NetRequestConst.REQUEST_USE_CHOOSE = "item.choose";
    // 道具称号装配
    NetRequestConst.REQUEST_ITEM_TITLE = "item.title";
    // 道具称号卸下
    NetRequestConst.REQUEST_ITEM_DROPTITLE = "item.droptitle";
    // 商城购买道具
    NetRequestConst.REQUEST_SHOP_BUY_ITEM = "shop.buyitem";
    NetRequestConst.REQUEST_SHOP_GETSHOPCFG = "shop.getshopcfg";
    NetRequestConst.REQUEST_SHOP_SHOWMONTHCARDNOTICE = "shop.showmonthcardnotice";
    NetRequestConst.REQUEST_SHOP_GETGROWGOLD = "shop.getgrowgold";
    // 兑换四大谋士
    NetRequestConst.REQUEST_ACTIVITY_EXCHANGEFOURPEOPLE = "activity.exchangefourpeople";
    // 牢房惩罚
    NetRequestConst.REQUEST_PRISON_PUNISH = "prison.punish";
    NetRequestConst.REQUEST_PRISON_AUTOPUNISH = "prison.autopunish";
    /**
     * 领取首冲奖励
     */
    NetRequestConst.REQUEST_SHOP_FIRSTCHARGEREWARD = "shop.firstchargereward";
    /**
     * 发起寻访
     */
    NetRequestConst.REQUEST_SEARCH_PLAY = "search.play";
    /**
     * 使用体力丹
     */
    NetRequestConst.REQUEST_SEARCH_PILL = "search.pill";
    /**
     * 查看帝君阁
     */
    NetRequestConst.REQUEST_SEARCH_GETBIOGRAPHY = "search.getbiography";
    NetRequestConst.REQUEST_RANK_GETBIOGRAPHY = "rank.getbiography";
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
    /**
     * 关卡--快速战斗和试用
     */
    NetRequestConst.REQUEST_CHALLENGE_AUTOFASTATTACK = "challenge.autofastattack";
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
    // 子嗣管家一键
    NetRequestConst.REQUEST_CHILD_BATCHRENAME = "child.batchrename";
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
     * 聊天分享
     */
    NetRequestConst.REQUEST_CHAT_SENDCHATMSG = "chat.senddinnermsg";
    NetRequestConst.REQUEST_CHAT_SENDSTUDYATKMSG = "chat.sendstudyatkmsg";
    NetRequestConst.REQUEST_CHAT_SENDADULTMSG = "chat.sendadultmsg";
    /**
     * 聊天翻译
     */
    NetRequestConst.REQUEST_CHAT_TRANSLATION = "chat.translation";
    /**
     * 排行榜相关接口
     */
    NetRequestConst.REQUEST_RANK_INDEX = "rank.index";
    NetRequestConst.REQUEST_RANK_VISIT = "rank.visit";
    NetRequestConst.REQUEST_RANK_USERSHOT = "rank.usershot";
    NetRequestConst.REQUEST_RANKG_INDEX = "rankg.index";
    NetRequestConst.REQUEST_RANKG_VISIT = "rankg.visit";
    NetRequestConst.REQUEST_RANKG_USERSHOT = "rankg.usershot";
    NetRequestConst.REQUEST_ATKRACE_USERSHOT = "atkraceg.usershot";
    NetRequestConst.REQUEST_IMACY_USERSHOT = "imacy.usershot";
    NetRequestConst.REQUEST_POWER_USERSHOT = "power.usershot";
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
    NetRequestConst.REQUEST_ADULT_GETMINFO = "adult.getminfo";
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
     * 邮件一键领取
     */
    NetRequestConst.REQUEST_MAIL_GET_ALL_REWARDS = "mail.getallrewards";
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
    //宴会记录详情
    NetRequestConst.REQUEST_DINNER_HISTORYDETAILS = "dinner.historydetails";
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
    NetRequestConst.REQUEST_PAY_RROCCESSPAYMENT = "pay.processpayment";
    /**
     * 检测是否可以继续充值此档位
     */
    NetRequestConst.REQUEST_PAY_CHECKPAY = "pay.checkpay";
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
     * 领取限时活动奖励
     */
    NetRequestConst.REQUEST_ACTIVITY_GETLIMITEDREWARD = "activity.getlimitedreward";
    /**
     * 一键领取限时奖励
     */
    NetRequestConst.REQUEST_ACTIVITY_GETALLLIMITEDREWARD = "activity.getalllimitedreward";
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
     * 泰拳活动 加体力(使用道具)
     */
    NetRequestConst.REQUEST_ACTIVITY_PUNISHADDENERGY = "activity.punishaddenergy";
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
    NetRequestConst.REQUEST_ACTIVITY_GETCOURIERREWARD = "activity.gettwcourierreward";
    /**
     * 领取奖励春节攀升 每天第一个元宝购买任务
     */
    NetRequestConst.REQUEST_ACTIVITY_BUYNEWYEARGIFT = "activity.buynewyeargift";
    NetRequestConst.REQUEST_ACTIVITY_BUYCOURIERGIFT = "activity.buytwcouriergift";
    /**
    * 领取解锁功能奖励
    */
    NetRequestConst.REQUEST_OTHERINFO_GETUNLOCKLISTREWARD = "otherinfo.getunlocklistreward";
    /**
    * 领取实名认证奖励（非3k）
    */
    NetRequestConst.REQUEST_OTHERINFO_GETCERTIFICATION = "otherinfo.getcertification";
    /**
     * 登记玩家信息
     */
    NetRequestConst.REQUEST_OTHERINFO_SENDUSERMSG = "otherinfo.sendusermsg";
    NetRequestConst.REQUEST_SERVANT_UPAURA = "servant.upaura";
    NetRequestConst.REQUEST_SERVANT_CHANGE = "servant.change";
    NetRequestConst.REQUEST_SERVANT_UPSKINSPECIALAURA = "servant.upskinspecialaura";
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
    NetRequestConst.REQUEST_ATKRACE_RANDREWARD = "atkrace.randreward";
    NetRequestConst.REQUEST_ATKRACE_GETINFO = "atkrace.getinfo";
    NetRequestConst.REQUEST_ATKRACE_LIST = "atkrace.list";
    NetRequestConst.REQUEST_ATKRACE_RANK = "atkrace.rank";
    NetRequestConst.REQUEST_ATKRACE_HANDLE = "atkrace.handle";
    NetRequestConst.REQUEST_ATKRACE_ATTRBUYLIST = "atkrace.attrlist";
    NetRequestConst.REQUEST_ATKRACE_GETMODEL = "atkrace.getmodel";
    NetRequestConst.REQUEST_ATKRACE_USEEXTRA = "atkrace.useextra";
    NetRequestConst.REQUEST_ATKRACE_REFRESH = "atkrace.refresh";
    NetRequestConst.REQUEST_ATKRACE_BATCHFIGHT = "atkrace.batchfight";
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
    NetRequestConst.REQUEST_ACTIVITY_ATKRACEG_GETTASKREWARD = "atkraceg.gettaskrewards"; //任务奖励
    NetRequestConst.REQUEST_ACTIVITY_ATKRACEG_USEFLAG = "atkraceg.usewarflag"; //使用玉莲
    NetRequestConst.REQUEST_ACTIVITY_ATKRACEG_GETFLAGREWARD = "atkraceg.getwarflagscore"; //领取人气币
    NetRequestConst.REQUEST_ACTIVITY_ATKRACEG_SHOPBUY = "atkraceg.shopbuy"; //商店购买
    NetRequestConst.REQUEST_ACTIVITY_ATKRACEG_FLAGRANK = "atkraceg.getwarflagrank"; //人气排行
    NetRequestConst.REQUEST_ACTIVITY_ATKRACEG_EXCHANGE = "atkraceg.exchange"; //兑换
    NetRequestConst.REQUEST_ACTIVITY_ATKRACEG_SHOP2EXCHANGE = "atkraceg.shop2exchange"; //道具兑换	
    /**
     * 	群雄跨服擂台接口
     */
    NetRequestConst.REQUEST_NEWATKRACECROSS_CHANGESIDS = "atkracegnew.changesids";
    NetRequestConst.REQUEST_NEWATKRACECROSS_INDEX = "atkracegnew.index";
    NetRequestConst.REQUEST_NEWATKRACECROSS_ATTRBUY = "atkracegnew.attrbuy";
    NetRequestConst.REQUEST_NEWATKRACECROSS_FIGHT = "atkracegnew.fight";
    NetRequestConst.REQUEST_NEWATKRACECROSS_REVENGE = "atkracegnew.revenge";
    NetRequestConst.REQUEST_NEWATKRACECROSS_KILL = "atkracegnew.kill";
    NetRequestConst.REQUEST_NEWATKRACECROSS_CHALLENGE = "atkracegnew.challenge";
    NetRequestConst.REQUEST_NEWATKRACECROSS_RANDREWARD = "atkracegnew.randreward";
    NetRequestConst.REQUEST_NEWATKRACECROSS_GETINFO = "atkracegnew.getinfo";
    NetRequestConst.REQUEST_NEWATKRACECROSS_LIST = "atkracegnew.list";
    NetRequestConst.REQUEST_NEWATKRACECROSS_RANK = "atkracegnew.rank";
    NetRequestConst.REQUEST_NEWATKRACECROSS_HANDLE = "atkracegnew.handle";
    NetRequestConst.REQUEST_NEWATKRACECROSS_ATTRBUYLIST = "atkracegnew.attrlist";
    NetRequestConst.REQUEST_NEWATKRACECROSS_GETMODEL = "atkracegnew.getmodel";
    NetRequestConst.REQUEST_NEWATKRACECROSS_USEEXTRA = "atkracegnew.useextra";
    NetRequestConst.REQUEST_NEWATKRACECROSS_REFRESH = "atkracegnew.refresh";
    NetRequestConst.REQUEST_NEWATKRACECROSS_GETACTIVITYATK = "atkracegnew.getactivityatk";
    NetRequestConst.REQUEST_NEWATKRACECROSS_BATCHFIGHT = "atkracegnew.batchfight";
    NetRequestConst.REQUEST_NEWATKRACECROSS_DIRECTORGETMAP = "atkracegnew.directorgetmap";
    NetRequestConst.REQUEST_NEWATKRACECROSS_DIRECTORATTACK = "atkracegnew.directorattack";
    NetRequestConst.REQUEST_NEWATKRACECROSS_DIRECTOREXTRA = "atkracegnew.directorextra";
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
    /**
     * "书院学习(一键)完成接口",
     */
    NetRequestConst.REQUEST_BOOKROOM_FINISH = "bookroom.finish";
    /**
     * "书院购买席位接口",
     */
    NetRequestConst.REQUEST_BOOKROOM_BUY = "bookroom.buy";
    /**
     * 书院一键学习
     */
    NetRequestConst.REQUEST_BOOKROOM_ONEKEYSTUDY = "bookroom.newonekeystudy";
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
     * 玩吧企鹅电竞奖励
     */
    NetRequestConst.REQUEST_OTHERINFO_GETQQESREWARD = "otherinfo.getqqesreward";
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
    //记录红颜排序id
    NetRequestConst.REQUEST_OTHER_RECORDWIIFESORT = "otherinfo.recordwifesort";
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
    NetRequestConst.REQUEST_NEWATKRACEG_WINZIDREWARD = "atkracegnew.winzidreward";
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
    NetRequestConst.REQUEST_PRESTIGE_UP = "prestige.up";
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
    NetRequestConst.REQUEST_ACTIVITY_GETLOTTERYREWARD = "activity.getlotteryreward"; //
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
    /*
     *跨服亲密
     */
    NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_PRANK = "imacy.prank"; //个人排行
    NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_ZRANK = "imacy.zrank"; //跨服区排行
    NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_AWARD = "imacy.winzidreward"; //跨服区排行
    NetRequestConst.REQUEST_ACTIVITY_GERACTIVITYIMACY = "imacy.getactivityimacy";
    NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_GETTASKREWARD = "imacy.gettaskrewards"; //任务奖励
    NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_USEFLAG = "imacy.usewarflag"; //使用玉莲
    NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_GETFLAGREWARD = "imacy.getwarflagscore"; //领取人气币
    NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_SHOPBUY = "imacy.shopbuy"; //商店购买
    NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_FLAGRANK = "imacy.getwarflagrank"; //人气排行
    NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_EXCHANGE = "imacy.exchange"; //兑换
    NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_SHOP2EXCHANGE = "imacy.shop2exchange"; //道具兑换
    NetRequestConst.REQUEST_REQUEST_BUY = "practice.buy";
    /*
     *称帝战
     */
    NetRequestConst.REQUEST_EMPEROR_GETACTIVE = "emperor.getactive"; //活动信息
    NetRequestConst.REQUEST_EMPEROR_BMLIST = "emperor.bmlist"; //报名册信息
    NetRequestConst.REQUEST_EMPEROR_GETMODEL = "emperor.getmodel"; //活动数据
    NetRequestConst.REQUEST_EMPEROR_BM = "emperor.bm"; //报名信息
    NetRequestConst.REQUEST_EMPEROR_CHEER = "emperor.cheer"; //助威
    NetRequestConst.REQUEST_EMPEROR_SETPOS = "emperor.setpos"; //设置门客
    NetRequestConst.REQUEST_EMPEROR_GETFIGHTLOG = "emperor.getfightlog"; //战斗日志
    NetRequestConst.REQUEST_EMPEROR_BUY = "emperor.buy"; //称帝战商城购
    /*
     *分封
     */
    NetRequestConst.REQUEST_MODEL_PROMOTE = "promote"; //获取model
    NetRequestConst.REQUEST_PROMOTE_INDEX = "promote.index"; //获取军机处列表
    NetRequestConst.REQUEST_PROMOTE_GETLIST = "promote.getlist"; //获取可分封的列表信息
    NetRequestConst.REQUEST_PROMOTE_APPOINT = "promote.appoint"; //分封大臣
    NetRequestConst.REQUEST_PROMOTE_CANCEL = "promote.cancel"; // "解除分封",
    NetRequestConst.REQUEST_JD618_GETREWARD = "otherinfo.getjdreward";
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
     *跨服权势
     */
    NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_PRANK = "power.prank"; //个人排行
    NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_ZRANK = "power.zrank"; //跨服区排行
    NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_AWARD = "power.winzidreward"; //跨服区排行
    NetRequestConst.REQUEST_ACTIVITY_GERACTIVITYPOWER = "power.getactivitypower";
    NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK = "atkraceg.rankbyzid";
    NetRequestConst.REQUEST_ACTIVITY_NEWATKRACEGRANK = "atkracegnew.rankbyzid";
    NetRequestConst.REQUEST_ACTIVITY_IMACYRANK = "imacy.rankbyzid";
    NetRequestConst.REQUEST_ACTIVITY_POWERRANK = "power.rankbyzid";
    NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_GETTASKREWARD = "power.gettaskrewards"; //任务奖励
    NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_USEFLAG = "power.usewarflag"; //使用战旗
    NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_GETFLAGREWARD = "power.getwarflagscore"; //领取人气币
    NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_SHOPBUY = "power.shopbuy"; //商店购买
    NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_FLAGRANK = "power.getwarflagrank"; //人气排行
    NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_EXCHANGE = "power.exchange"; //兑换
    NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_SHOP2EXCHANGE = "power.shop2exchange"; //道具兑换
    // 分享引导
    NetRequestConst.REQUEST_GETSHAREGUIDE = "user.getshareguide"; //获取引导文案
    NetRequestConst.REQUEST_GETSHAREGUIDEREWARD = "otherinfo.getshareguidereward"; //领取分享奖励
    NetRequestConst.REQUEST_STATSUPDATESHAREDATA = "stats.updatesharedata"; //更新情景分享数据
    NetRequestConst.REQUEST_SHAREADDCOPYSHARENUM = "share.addcopysharenum"; //更新情景分享数据
    /**
     * 限时礼包 取消强弹标识
     */
    NetRequestConst.REQUEST_SHOP_SHOW1COSTSCENEGIFT = "shop.show1costscenegift";
    //玩一玩 企鹅电竞图标点击计数器
    NetRequestConst.REQUEST_STATS_CLICKWYWICON = "stats.clickwywicon";
    /**
     * 黄忠活动
     */
    NetRequestConst.REQUEST_ACTIVITY_GETARCHERLOTTERY = "activity.getarcherlottery"; //黄忠活动抽奖
    NetRequestConst.REQUEST_ACTIVITY_GETARCHERITEAMA = "activity.getarcheritema"; //黄忠活动领取抽奖次数奖励
    NetRequestConst.REQUEST_ACTIVITY_GETARCHERITEAMB = "activity.getarcheritemb"; //黄忠活动领取充值奖励
    NetRequestConst.REQUEST_ACTIVITY_GETARCHERRANK = "activity.getarcherrank"; //黄忠活动排行榜
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
     * 世界别活动
     */
    NetRequestConst.REQUEST_ACTIVITY_WORLDCUPINFO = "activity.worldcupinfo";
    NetRequestConst.REQUEST_ACTIVITY_WORLDCUPVOTE = "activity.worldcupvote";
    NetRequestConst.REQUEST_ACTIVITY_WORLDCUPBUY = "activity.worldcupbuy";
    NetRequestConst.REQUEST_ACTIVITY_WORLDCUPUSE = "activity.worldcupuse";
    /**
     * 私聊
     */
    NetRequestConst.REQUEST_PRICHAT_GETMSG = "privatechat.getmsg";
    NetRequestConst.REQUEST_PRICHAT_SENDMSG = "privatechat.sendmsg";
    NetRequestConst.REQUEST_PRICHAT_SETREAD = "privatechat.setisread";
    NetRequestConst.REQUEST_PRICHAT_PUSHMSG = "push.msg";
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
     * 跨服聊天
    */
    NetRequestConst.REQUEST_CROSSCHAT_SENDMSG = "crosschat.sendmsg"; //跨服聊天发送消息
    NetRequestConst.REQUEST_CROSSCHAT_GETMSG = "crosschat.getmsg"; //跨服聊天获取消息
    /**
     * 亲家消息
    */
    NetRequestConst.REQUEST_SADUN_GETINFO = "sadun.getinfo"; //亲家消息
    NetRequestConst.REQUEST_SADUN_VISIT = "sadun.visit"; //拜访请求
    NetRequestConst.REQUEST_SADUN_CANCELVISIT = "sadun.cancelvisit"; //取消拜访
    NetRequestConst.REQUEST_SADUN_REFUSEVISIT = "sadun.refusevisit"; //拒绝拜访 参数 fchildId , fuid
    NetRequestConst.REQUEST_SADUN_AGREEVISIT = "sadun.agreevisit"; //同意拜访 参数 childId , fuid，wifeId
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
     * 微信平台分享次数
     */
    NetRequestConst.REQUEST_OTHERINFO_SETSHARENUM = "otherinfo.setsharenum";
    //fq游戏攻略
    /**
     * 获得F&Q游戏攻略
     */
    NetRequestConst.REQUST_FAQ_GETFAQCONTENT = "faq.getfaqcontent";
    /**
     * 分享成功的接口
     */
    NetRequestConst.REQUST_OTHERINFO_GETGENERALSHARE = "otherinfo.getgeneralshare";
    /**
     * 七夕灯会
     */
    NetRequestConst.REQUST_DOUBLESEVEN_GETREWARD = "activity.getdoubleSeventhitema";
    /**
     * 玩吧积分礼包
     */
    NetRequestConst.REQUST_USER_GETRETURNREWARD = "user.getreturnreward";
    /**
     * 谷歌推送
     */
    NetRequestConst.REQUST_USER_SETPUSHTOKEN = "user.setpushtoken";
    /**
     * 实名 领奖
     */
    NetRequestConst.REQUST_USER_GETREALNAMEREWARDS = "user.getrealnamerewards";
    /**
     * 议事院信息
     */
    NetRequestConst.REQUST_COUNCIL_GETEVENTINFO = "council.geteventinfo";
    NetRequestConst.REQUST_COUNCIL_GETEVENTDETAIL = "council.getdetailinfo";
    NetRequestConst.REQUST_COUNCIL_JOINEVENT = "council.joincouncil";
    NetRequestConst.REQUST_COUNCIL_GETRANK = "council.getrank";
    NetRequestConst.REQUST_COUNCIL_GETREWARD = "council.getrewards";
    /**
     * [百服活动]充值返利  领取奖励
     */
    NetRequestConst.REQUST_ACTIVITY_GETRECHARGEBOXREWARD = "activity.getrechargeboxreward";
    /**
     * 门客擂台信息
     */
    NetRequestConst.REQUST_SERVANTPK_GETINFO = "servantpk.getactivity"; //获取活动信息
    NetRequestConst.REQUST_SERVANTPK_GO = "servantpk.go"; //支援
    NetRequestConst.REQUST_SERVANTPK_RANK = "servantpk.rank";
    NetRequestConst.REQUST_SERVANTPK_GETPREWARD = "servantpk.preward"; //个人领奖
    NetRequestConst.REQUST_SERVANTPK_GETZREWARD = "servantpk.zreward"; //总领奖
    /**
     * 皮肤修改
     */
    NetRequestConst.REQUST_CROSSSKIN_GETSKINRANK = "crossskin.getskinrank";
    NetRequestConst.REQUST_CROSSSKIN_GETSKINFIRST = "crossskin.getskinfirst";
    NetRequestConst.REQUST_CROSSSKIN_USERSKINSHOT = "crossskin.userskinshot";
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
     * 小额礼包
     */
    NetRequestConst.REQUEST_ACTIVITY_GETFREEDAILYGIFT = "activity.getfreedailygift";
    /**
     * 活动红点已读
     */
    NetRequestConst.REQUEST_ACTIVITY_READACTIVE = "activity.readactive";
    /*
    * 鳌拜活动 商店购买、积分兑换
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
    /**
     * 更换场景
     */
    NetRequestConst.REQYEST_OTHERINFO_SWITCHSCENESKIN = "otherinfo.switchsceneskin";
    NetRequestConst.REQYEST_OTHERINFO_BUYSCENESKIN = "otherinfo.buysceneskin";
    /**
     * 推送设置
     */
    NetRequestConst.REQYEST_OTHERINFO_SETPUSHFLAG = "otherinfo.setpushflag";
    /**
     * 皇帝上线通报
     */
    NetRequestConst.REQYEST_OTHER_INFO_BANEMMSG = "otherinfo.banemmsg";
    NetRequestConst.REQYEST_ACTIVITY_DAILY_CHECKRED = "activity.dailyactivityclickredpoint";
    /**
     * 活动公告今日不再提示
     */
    NetRequestConst.REQYEST_OTHER_INFO_SETACTIVITYPOP = "otherinfo.setactivitypop";
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
     * 港台一周年 黑市购买道具
     */
    NetRequestConst.REQYEST_ACTIVITY_BLACKMARKET = "activity.buytwblackmarket";
    /**
     * 双 11 排行榜相关
     */
    NetRequestConst.REQYEST_ACTIVITY_GET_SINGLE_DAY_RANK = "activity.getsingledayrank";
    NetRequestConst.REQYEST_ACTIVITY_BUYSINGLEDAYSHOP = "activity.buysingledayshop";
    /**
     * 门客兑换碎片接口
     */
    NetRequestConst.REQYEST_SERVANTPK_EXCHANGESERVANTSKIN = "servantpk.exchangeservantskin";
    /**
     *兑换秦始皇
     */
    NetRequestConst.REQUEST_EMPEROR_EXCHANGESERVANT = "emperor.exchangeservant";
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
    //众筹获得中奖名单
    NetRequestConst.REQUEST_ACTIVITY_LOTTERYWININFO = "activity.lotterywininfo";
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
    NetRequestConst.REQUEST_COUNTRYWAY_GETREWAEDS = "countrywar.getrewards";
    //领取帮会冲榜奖励
    NetRequestConst.REQUEST_ACTIVITY_GETALLICHARGECOUNTREWARD = "activity.getallichargecountreward";
    //领取帮会冲榜奖励
    NetRequestConst.REQUEST_ACTIVITY_GETALLICHARGETOTALREWARD = "activity.getallichargetotalreward";
    //刷model
    NetRequestConst.REQUEST_ACTIVITY_GETALLICHARGECOUNTINFO = "activity.getallichargecountinfo";
    //累计充值奖励
    NetRequestConst.REQUEST_ACTIVITY_GETALLICHARGETOTALINFO = "activity.getallichargetotalinfo";
    /**
     * [港台活动]钱庄领奖
     */
    NetRequestConst.REQUST_ACTIVITY_GETTWBANKBOXREWARD = "activity.gettwbankboxreward";
    /**
     * 门客皮肤光环
     */
    NetRequestConst.REQUST_SERVANT_UPSKINAURA = "servant.upskinaura";
    /**
     * 圣诞抽奖
     */
    NetRequestConst.REQUST_ACTIVITY_CHRISTMASLOTTERY = "activity.christmaslottery";
    /**
     * 圣诞任务领奖
     */
    NetRequestConst.REQUST_ACTIVITY_CHRISTMASTASKREWARD = "activity.christmastaskreward";
    /**
     *圣诞统计
     */
    NetRequestConst.REQUST_ACTIVITY_CHRISTMASCLICKICON = "activity.christmasclickicon";
    /*
    *赌坊
    */
    NetRequestConst.REQUST_ACTIVITY_GAMBLELOG = "activity.gettwgamblelog";
    NetRequestConst.REQUST_ACTIVITY_GAMBLEREWARD = "activity.gettwgamblereward";
    NetRequestConst.REQUST_ACTIVITY_GAMBLEGETWINREWARD = "activity.gettwgamblewinreward";
    /**客栈 */
    /**抽奖 */
    NetRequestConst.REQUST_ACTIVITY_GETTWHOTELLTTTERY = "activity.gettwhotellottery";
    /**领取宝箱奖励 */
    NetRequestConst.REQUST_ACTIVITY_GETTWHOTELITEMA = "activity.gettwhotelitema";
    /**领取任务奖励 */
    NetRequestConst.REQUST_ACTIVITY_GETTWHOTELITEMB = "activity.gettwhotelitemb";
    /**领取充值奖励 */
    NetRequestConst.REQUST_ACTIVITY_GETTWHOTELITEMC = "activity.gettwhotelitemc";
    //比武招亲
    /**打npc */
    NetRequestConst.REQUST_ACTIVITY_GETTWMARRYITEM = "activity.buytwmarryitem";
    /**领取宝箱奖励 */
    NetRequestConst.REQUST_ACTIVITY_GETTWMARRYREWARDS = "activity.gettwmarryrewards";
    /**是否第一次登陆比武招亲 */
    NetRequestConst.REQUST_ACTIVITY_GETTWINITMARRYFLAG = "activity.gettwinitmarryflag";
    //云顶龙窟
    /**云顶龙窟--打npc */
    NetRequestConst.REQUST_ACTIVITY_YUNDINGLONGKUBUYITEM = "activity.yundinglongkubuyitem";
    /**云顶龙窟--领取宝箱奖励 */
    NetRequestConst.REQUST_ACTIVITY_YUNDINGLONGKUGETREWARDS = "activity.yundinglongkugetrewards";
    /**云顶龙窟--是否第一次登陆 */
    NetRequestConst.REQUST_ACTIVITY_YUNDINGLONGKUGETINITFLAG = "activity.yundinglongkugetinitflag";
    //电玩大本营
    /**电玩大本营-- recive charge reward */
    NetRequestConst.REQUST_ACTIVITY_ARCADEGETCHARGE = "activity.arcadegetcharge";
    /**电玩大本营--recive task reward */
    NetRequestConst.REQUST_ACTIVITY_ARCADEGETTASKRWD = "activity.arcadegettaskrwd";
    /**电玩大本营--积分兑换 */
    NetRequestConst.REQUST_ACTIVITY_ARCADESHOPBUY = "activity.arcadeshopbuy";
    /**电玩大本营--抽奖 */
    NetRequestConst.REQUST_ACTIVITY_ARCADELOTTERY = "activity.arcadelottery";
    /**电玩大本营--日志 */
    NetRequestConst.REQUST_ACTIVITY_ARCADEGETLOGS = "activity.arcadegetlogs";
    /**元旦活动 */
    NetRequestConst.REQUST_ACTIVITY_TREASUREBOXPLAY = "activity.treasurehuntroll";
    /**元旦任务 */
    NetRequestConst.REQUST_ACTIVITY_TREASUREHUNTGETTASKREWARDS = "activity.treasurehuntgettaskrewards";
    NetRequestConst.REQUST_ACTIVITY_TREASURECIRCLERERWARD = "activity.treasurehuntcirclerewards";
    //京城夜赏
    NetRequestConst.REQUST_ACTIVITY_ENJOYNIGHTGETRECHARGERWD = "activity.enjoynightgetrechargerwd";
    NetRequestConst.REQUST_ACTIVITY_ENJOYNIGHTROLL = "activity.enjoynightroll";
    NetRequestConst.REQUST_ACTIVITY_ENJOYNIGHTPLAY = "activity.enjoynightplay";
    NetRequestConst.REQUST_ACTIVITY_ENJOYNIGHTACHIEVEMENT = "activity.enjoynightachievement";
    NetRequestConst.REQUST_ACTIVITY_ENJOYNIGHTEXCHANGE = "activity.enjoynightexchange";
    NetRequestConst.REQUST_ACTIVITY_ENJOYNIGHTGETTASK = "activity.enjoynightgettask";
    //周年庆典 京城夜赏2
    NetRequestConst.REQUST_ACTIVITY_ANNUALCELEBRATION2020GETTASK = "activity.annualCelebration2020gettask";
    NetRequestConst.REQUST_ACTIVITY_ANNUALCELEBRATION2020ROLL = "activity.annualCelebration2020roll";
    NetRequestConst.REQUST_ACTIVITY_ANNUALCELEBRATION2020CIRCLE = "activity.annualCelebration2020circle";
    NetRequestConst.REQUST_ACTIVITY_GETDOUBLESEVENTHEXCHANGE = "activity.getdoubleSeventhexchange";
    //除夕
    /**领取除夕七天送登录奖励 */
    NetRequestConst.REQUST_ACTIVITY_GETNEWYEARSIGNUPREWARD = "activity.getnewyearsignupreward";
    /**领取除夕七天送登录孔明灯 */
    NetRequestConst.REQUST_ACTIVITY_GETNEWYEARSIGNUPBALLON = "activity.getnewyearsignupballon";
    /**领取除夕七天送特殊奖励 */
    NetRequestConst.REQUST_ACTIVITY_GETNEWYEARSIGNUPALLREWARD = "activity.getnewyearsignupallreward";
    //财神驾到
    /**拜财神 */
    NetRequestConst.REQUST_ACTIVITY_GETWEATHLUCKYREWARD = "activity.getweathluckyreward";
    /**领取财神奖励 */
    NetRequestConst.REQUST_ACTIVITY_GETWEATHREWARD = "activity.getweathreward";
    /**财神驾到跑马灯 */
    NetRequestConst.REQUST_ACTIVITY_GETWEATHLUCKYLOG = "activity.getweathluckylog";
    /**爆竹迎新领取奖励*/
    NetRequestConst.REQUST_ACTIVITY_GETCRACKERREWARD = "activity.getnewyearcrackerchargerewards";
    /**爆竹迎新领取任务奖励*/
    NetRequestConst.REQUST_ACTIVITY_GETRACKERTASKREWARDS = "activity.getnewyearcrackertaskrewards";
    //马超活动
    /**抽奖*/
    NetRequestConst.REQUST_ACTIVITY_MACHAOLOTTERY = "activity.machaolottery";
    /**任务奖励*/
    NetRequestConst.REQUST_ACTIVITY_MACHAOGETITEMB = "activity.machaogetitemb";
    /**充值奖励*/
    NetRequestConst.REQUST_ACTIVITY_MACHAOGETITEMC = "activity.machaogetitemc";
    /**排行榜*/
    NetRequestConst.REQUST_ACTIVITY_MACHAOGETRANK = "activity.machaogetrank";
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
    /**风华群芳*/
    NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE = "groupwifebattle.getglobalinfo";
    NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_SEARCH = "groupwifebattle.search";
    NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_FIGHT = "groupwifebattle.fight";
    NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_GETRANK = "groupwifebattle.getrank";
    NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_CHEER = "groupwifebattle.cheer";
    NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_GETALNDETAIL = "groupwifebattle.getalliancedetail";
    NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_CHALLENGE = "groupwifebattle.challenge";
    /**
     * 充值送门客皮肤道具 领奖
     */
    NetRequestConst.REQUEST_ACTIVITY_GETSKINPACKAGEREWARD = "activity.getskinpackagereward";
    /**
     * 绝地擂台排行榜
     */
    NetRequestConst.REQUEST_BATTLEGROUND_GETANK = "battleground.getrank";
    //锦鲤活动
    /**锦鲤请求全服信息 */
    NetRequestConst.REQUEST_ACTIVITY_GETLUCKYCAINFO = "activity.getluckycarpinfo";
    /**锦鲤领取普通奖励 */
    NetRequestConst.REQUEST_ACTIVITY_GETLUCKYCARPREWARD = "activity.getluckycarpreward";
    //门客出海
    /**购买席位 */
    NetRequestConst.REQUEST_SERVANT_BUYBANISHPOS = "servant.buybanishpos";
    /**门客出海modle */
    NetRequestConst.REQUEST_SERVANT_GETSERVANTBANISHMODEL = "servant.getservantbanishmodel";
    /**门客出海接口 */
    NetRequestConst.REQUEST_SERVANT_BANISH = "servant.banish";
    NetRequestConst.REQUEST_SERVANT_BANISHBUFF = "servant.banishbuff";
    /**门客提前召回 */
    NetRequestConst.REQUEST_SERVANT_FINISH = "servant.finish";
    /**门客改变免战状态 */
    NetRequestConst.REQUEST_SERVANT_AVOID = "servant.avoid";
    /**门客免战红点 */
    NetRequestConst.REQUEST_SERVANT_AVOIDREDPOINT = "servant.avoidredpoint";
    /**门客名望升级 */
    NetRequestConst.REQUEST_SERVANT_FAMEUPGRADE = "servant.fameupgrade";
    //彩蛋活动
    /**获得奖励 */
    NetRequestConst.REQUEST_ACTIVITY_GETWEALTHCARPREWARD = "activity.getwealthcarpreward";
    /**彩蛋活动排行榜 */
    NetRequestConst.REQUEST_ACTIVITY_GETWEALTHCRAPINFO = "activity.getwealthcarpinfo";
    /**彩蛋活动中奖名单 */
    NetRequestConst.REQUEST_ACTIVITY_GETWEALTHCRAPLUCKYINFO = "activity.getwealthcarpluckyinfo";
    //七日好礼
    /**七日登陆及VIP奖励 */
    NetRequestConst.REQUEST_SEVENDAYSIGN_GETSEVENDAYSIGNREWARD = "sevendaysign.getsevendaysignreward";
    /**七日任务奖励 */
    NetRequestConst.REQUEST_SEVENDAYSIGN_GETSEVENDAYSIGNTASKREWARD = "sevendaysign.getsevendaysigntaskreward";
    /**七日model */
    NetRequestConst.REQUEST_SEVENDAYSIGN_GETSEVENDAYSIGNMODEL = "sevendaysign.getsevendaysignmodel";
    /**七日任务阅读奖励 */
    NetRequestConst.REQUEST_SEVENDAYSIGN_GETSIGN3REWARD = "sevendaysign.getsign3reward";
    /**幸运翻牌 */
    NetRequestConst.REQUEST_ACTIVITY_LUCKYDRAWLOTTERY = "activity.luckydrawlottery";
    NetRequestConst.REQUEST_ACTIVITY_LUCKYDRAWGETRECHARERWD = "activity.luckydrawgetrechargerwd";
    NetRequestConst.REQUEST_ACTIVITY_LUCKYDRAWGETACHIRWD = "activity.luckydrawgetachievementrwd";
    /**听雨轩制作 */
    NetRequestConst.REQUEST_SKIN_MAKE = "crossskin.buyskin";
    //修身技能升级
    NetRequestConst.PRACTICE_UPSKILLEXP = "practice.upskillexp";
    //跨服皇陵接口
    NetRequestConst.REQUEST_ACTIVITY_TOMBINFO = "tomb.getinfo";
    NetRequestConst.REQUEST_ACTIVITY_TOMBMAP = "tomb.getmap";
    NetRequestConst.REQUEST_ACTIVITY_TOMBDIG = "tomb.dig";
    NetRequestConst.REQUEST_ACTIVITY_TOMBATTACK = "tomb.attack";
    NetRequestConst.REQUEST_ACTIVITY_TOMBBOSSINFO = "tomb.getbosshp";
    NetRequestConst.REQUEST_ACTIVITY_TOMBBUYSEARCH = "tomb.buysearch";
    NetRequestConst.REQUEST_ACTIVITY_TOMBRECOVERSERVANT = "tomb.recoverservant";
    NetRequestConst.REQUEST_ACTIVITY_TOMBRANK = "tomb.getrank";
    NetRequestConst.REQUEST_ACTIVITY_TOMBSHOPBUY = "tomb.shopbuy";
    NetRequestConst.REQUEST_ACTIVITY_TOMBENERMY = "tomb.getenemy";
    //本服皇陵接口
    NetRequestConst.REQUEST_ACTIVITY_LOCTOMBINFO = "loctomb.getinfo";
    NetRequestConst.REQUEST_ACTIVITY_LOCTOMBMAP = "loctomb.getmap";
    NetRequestConst.REQUEST_ACTIVITY_LOCTOMBDIG = "loctomb.dig";
    NetRequestConst.REQUEST_ACTIVITY_LOCTOMBATTACK = "loctomb.attack";
    NetRequestConst.REQUEST_ACTIVITY_LOCTOMBBOSSINFO = "loctomb.getbosshp";
    NetRequestConst.REQUEST_ACTIVITY_LOCTOMBBUYSEARCH = "loctomb.buysearch";
    NetRequestConst.REQUEST_ACTIVITY_LOCTOMBRECOVERSERVANT = "loctomb.recoverservant";
    NetRequestConst.REQUEST_ACTIVITY_LOCTOMBRANK = "loctomb.getrank";
    NetRequestConst.REQUEST_ACTIVITY_LOCTOMBSHOPBUY = "loctomb.shopbuy";
    NetRequestConst.REQUEST_ACTIVITY_LOCTOMBENERMY = "loctomb.getenemy";
    //劳碌丰收接口
    NetRequestConst.REQUEST_ACTIVITY_LABORRECHARGE = "activity.getlabordayitemb";
    NetRequestConst.REQUEST_ACTIVITY_LABORTASK = "activity.getlabordayitemc";
    NetRequestConst.REQUEST_ACTIVITY_LABORSHOP = "activity.buylabordayshop";
    NetRequestConst.REQUEST_ACTIVITY_LABORRANK = "activity.getlabordayrank";
    NetRequestConst.REQUEST_ACTIVITY_LABORJINDU = "activity.getlabordayitema";
    NetRequestConst.REQUEST_ACTIVITY_LABORINFO = "activity.getlabordayinfo";
    //投壶活动接口
    /**抽奖 */
    NetRequestConst.REQUEST_ACTIVITY_THROWARROWLOTTERY = "activity.throwarrowlottery";
    /**次数奖励 领取奖励 */
    NetRequestConst.REQUEST_ACTIVITY_THROWARROWGETACHIEVEMENTRWD = "activity.throwarrowgetachievementrwd";
    /**充值奖励 领取奖励 */
    NetRequestConst.REQUEST_ACTIVITY_THROWARROWGETRECHARGERWD = "activity.throwarrowgetrechargerwd";
    /**log */
    NetRequestConst.REQUEST_ACTIVITY_THROWARROWGETLOGS = "activity.throwarrowgetlogs";
    //勤王除恶
    /**获取modle */
    NetRequestConst.REQYEST_ALLIANCEWEEK_GETWEEKDETAILS = "allianceweek.getweekdetails";
    /**攻击帮会周末boss */
    NetRequestConst.REQYEST_ALLIANCEWEEK_ATTACK = "allianceweek.attack";
    /**恢复某个门客攻击次数 */
    NetRequestConst.REQYEST_ALLIANCEWEEK_RECOVER = "allianceweek.recover";
    /**购买战斗buff */
    NetRequestConst.REQYEST_ALLIANCEWEEK_BUYBUFF = "allianceweek.buybuff";
    /**获取帮会周末积分奖励 */
    NetRequestConst.REQYEST_ALLIANCEWEEK_GETSCOREREWARD = "allianceweek.getscorereward";
    /**获取帮会周末击杀奖励 */
    NetRequestConst.REQYEST_ALLIANCEWEEK_GETKILLREWARD = "allianceweek.getkillreward";
    /**获取帮会贡献排行榜*/
    NetRequestConst.REQUEST_ALLIANCEWEEK_GETBOSSRANK = "allianceweek.getbossrank";
    //花魁活动
    /**获取选手信息*/
    NetRequestConst.REQUEST_BEAUTYVOTE_GETINFO = "beautyvote.getinfo";
    /**领取充值奖励 */
    NetRequestConst.REQUEST_BEAUTYVOTE_GETRECHARGERWD = "beautyvote.getrechargerwd";
    /**献花 */
    NetRequestConst.REQUEST_BEAUTYVOTE_VOTE = "beautyvote.vote";
    /**排行榜*/
    NetRequestConst.REQUEST_BEAUTYVOTE_GETRANK = "beautyvote.getrank";
    /**购买鲜花*/
    NetRequestConst.REQUEST_BEAUTYVOTE_BUYFLOWERS = "beautyvote.buyflowers";
    /**积分兑换*/
    NetRequestConst.REQUEST_BEAUTYVOTE_SHOPBUY = "beautyvote.shopbuy";
    //诸葛亮传
    /**诸葛亮传-领取充值奖励*/
    NetRequestConst.REQUEST_ACTIVITY_GETLIANGCHARGE = "activity.getliangcharge";
    /**诸葛亮传-使用七星灯*/
    NetRequestConst.REQUEST_ACTIVITY_USESEVENSTARLAMP = "activity.usesevenstarlamp";
    /**诸葛亮传-领取进度奖励*/
    NetRequestConst.REQUEST_ACTIVITY_GETLIANGREWARDS = "activity.getliangrewards";
    //筑阁祭天
    /**筑阁祭天-活动抽奖*/
    NetRequestConst.REQUEST_ACTIVITY_GETWORSHIPREWARDS = "activity.getworshiprewards";
    /**筑阁祭天-领取累计充值奖励 */
    NetRequestConst.REQUEST_ACTIVITY_GETWORSHIPCHARGE = "activity.getworshipcharge";
    /**筑阁祭天-领取进度奖励 */
    NetRequestConst.REQUEST_ACTIVITY_GETWORSHIPACHIEVEMENT = "activity.getworshipachievement";
    //搜查魏府
    /**搜查魏府-活动抽奖*/
    NetRequestConst.REQUEST_ACTIVITY_SEARCHPROOF = "activity.searchproof";
    /**搜查魏府-领取累计充值奖励 */
    NetRequestConst.REQUEST_ACTIVITY_GETPROOFCHARGE = "activity.getproofcharge";
    /**搜查魏府-领取进度奖励 */
    NetRequestConst.REQUEST_ACTIVITY_GETPROOFREWARDS = "activity.getproofrewards";
    /**搜查魏府-兑换奖励 */
    NetRequestConst.REQUEST_ACTIVITY_CLAIMPROOF = "activity.claimproof";
    //好礼相送
    /**好礼相送-兑换奖励*/
    NetRequestConst.REQUEST_ACTIVITY_GIFTRETURNEXCHANGE = "activity.giftreturnexchange";
    /**好礼相送-领取累计充值奖励 */
    NetRequestConst.REQUEST_ACTIVITY_GIFTRETURNGETTASK = "activity.giftreturngettask";
    /** 母亲节相关**/
    NetRequestConst.REQUEST_MOTHERDAY_SENDFLOWERS = "activity.sendflowers";
    NetRequestConst.REQUEST_MOTHERDAY_GETCHARGE = "activity.getmotherdaycharge";
    NetRequestConst.REQUEST_MOTHERDAY_GETBOX = "activity.getmotherdayrewards";
    NetRequestConst.REQUEST_MOTHERDAY_GETBIGPRIZE = "activity.getmotherdaybigprize";
    /**五彩缤纷活动领取任务奖励 */
    NetRequestConst.REQUEST_MOTHERDAY_GETMOTHERDAYTASK = "activity.getmotherdaytask";
    /**购买五彩缤纷活动商店物品 */
    NetRequestConst.REQUEST_MOTHERDAY_BUYMOTHERDAYSHOP = "activity.buymotherdayshop";
    /**五彩商店兑换场景奖励 */
    NetRequestConst.REQUEST_MOTHERDAY_EXCHANGEMOTHERDAYSCENE = "activity.exchangemotherdayscene";
    NetRequestConst.REQUEST_QA_ANSWER = "activity.answerquestion";
    /**励精图治*/
    NetRequestConst.REQUEST_BATTLEPASS_BUYLV = "activity.battlepassbuylv";
    NetRequestConst.REQUEST_BATTLEPASS_GETLVRWD = "activity.battlepassgetrwd";
    NetRequestConst.REQUEST_BATTLEPASS_SHOPBUY = "activity.battlepassshopbuy";
    NetRequestConst.REQUEST_BATTLEPASS_TASKRWD = "activity.battlepasstaskrwd";
    //粽叶飘香-端午节活动 
    NetRequestConst.REQUEST_ACTIVITY_GETDUANWUITEMB = "activity.getduanwuitemb";
    NetRequestConst.REQUEST_ACTIVITY_GETDUANWUITEMC = "activity.getduanwuitemc";
    NetRequestConst.REQUEST_ACTIVITY_BUYDUANWUSHOP = "activity.buyduanwushop";
    NetRequestConst.REQUEST_ACTIVITY_CLAIMDUANWUITEM = "activity.claimduanwuitem";
    NetRequestConst.REQUEST_ACTIVITY_GETDUANWUSHOPTASK = "activity.getduanwushoptask";
    //newboss
    NetRequestConst.REQUEST_NEWBOSS_GET = "newboss.get";
    NetRequestConst.REQUEST_NEWBOSS_GETDETAILS = "newboss.getdetails";
    NetRequestConst.REQUEST_NEWBOSS_RECOVER = "newboss.recover";
    NetRequestConst.REQUEST_NEWBOSS_ATTACK = "newboss.attack";
    NetRequestConst.REQUEST_NEWBOSS_BUY = "newboss.buy";
    NetRequestConst.REQUEST_NEWBOSS_GETRANK = "newboss.getrank";
    NetRequestConst.REQUEST_NEWBOSS_GETATTACKRANK = "newboss.getattackrank";
    NetRequestConst.REQUEST_NEWBOSS_GETREWARD = "newboss.getrewards";
    NetRequestConst.REQUEST_ITEM_HECHENG = "item.hecheng";
    //建造斗场
    NetRequestConst.REQUEST_ACTIVITY_ARENAINFO = "activity.getarenainfo";
    NetRequestConst.REQUEST_ACTIVITY_ARENATASK = "activity.getarenaitemc";
    NetRequestConst.REQUEST_ACTIVITY_ARENASHOP = "activity.buyarenashop";
    NetRequestConst.REQUEST_ACTIVITY_ARENARANK = "activity.getarenarank";
    NetRequestConst.REQUEST_ACTIVITY_GETARENAJINDU = "activity.getarenaitema";
    NetRequestConst.REQUEST_ACTIVITY_ARENACHARGE = "activity.getarenaitemb";
    //定军中原
    NetRequestConst.REQUEST_MAINLAND_GETINFO = "conquermainland.getinfo";
    NetRequestConst.REQUEST_MAINLAND_GETMAPINFO = "conquermainland.getmapinfo";
    NetRequestConst.REQUEST_MAINLAND_GETMYTEAMINFO = "conquermainland.getmyteam";
    NetRequestConst.REQUEST_MAINLAND_SELECTSERVANT = "conquermainland.selectservant";
    NetRequestConst.REQUEST_MAINLAND_GETCITYINFO = "conquermainland.getbuildinginfo";
    NetRequestConst.REQUEST_MAINLAND_USEITEM = "conquermainland.usespecial";
    NetRequestConst.REQUEST_MAINLAND_CANCELSERVANT = "conquermainland.cancelservant";
    NetRequestConst.REQUEST_MAINLAND_GETTASKRWD = "conquermainland.gettaskrwd";
    NetRequestConst.REQUEST_MAINLAND_PRANK = "conquermainland.getrank";
    NetRequestConst.REQUEST_MAINLAND_ZRANK = "conquermainland.getzidrank";
    NetRequestConst.REQUEST_MAINLAND_RECORDLIST = "conquermainland.getlist";
    NetRequestConst.REQUEST_MAINLAND_RECORDLOG = "conquermainland.getlog";
    NetRequestConst.REQUEST_MAINLAND_DONOTICE = "conquermainland.dontnotice";
    NetRequestConst.REQUEST_MAINLAND_USESPECIALGIFT = "conquermainland.usespecialgift";
    //魏征活动
    NetRequestConst.REQUEST_WEIZHENG_GETRECHARGE = "activity.getweizhengcharge";
    NetRequestConst.REQUEST_WEIZHENG_GETTASK = "activity.getweizhengtask";
    NetRequestConst.REQUEST_WEIZHENG_GETBUQIANTASK = "activity.signweizhengtask";
    NetRequestConst.REQUEST_WEIZHENG_EXCHANGE = "activity.claimweizheng";
    //情缘激活
    NetRequestConst.REQUEST_ENCOUNTER_ACTIVATE = "encounter.activate";
    //绝地擂台优化
    NetRequestConst.REQUEST_BATTLEGROUND_CHEER = "battleground.cheer";
    NetRequestConst.REQUEST_BATTLEGROUND_TASK = "battleground.getaudiencetask";
    NetRequestConst.REQUEST_BATTLEGROUND_SUPLIST = "battleground.getsupportlist";
    NetRequestConst.REQUEST_ITEM_CHOOSE = "item.choose";
    NetRequestConst.REQUEST_TITLEUPGRADE = "item.titleupgrade";
    //门客神器系统
    /**神器强化 */
    NetRequestConst.REQUEST_WEAPON_UPGRADE = "weapon.upgrade";
    /**神器强化十次 */
    NetRequestConst.REQUEST_WEAPON_UPGRADETEN = "weapon.upgradeten";
    /**神器加工 */
    NetRequestConst.REQUEST_WEAPON_UPABILITY = "weapon.upability";
    /**神器熔炼 */
    NetRequestConst.REQUEST_WEAPON_UPSKILL = "weapon.upskill";
    /**神器发布评论 */
    NetRequestConst.REQUEST_WEAPON_DISCUSS = "weapon.discuss";
    /**获取神器评论 */
    NetRequestConst.REQUEST_WEAPON_GETDISCUSS = "weapon.getdiscuss";
    /**点赞神器评论 */
    NetRequestConst.REQUEST_WEAPON_SUPPORT = "weapon.support";
    /**神器拆解 */
    NetRequestConst.REQUEST_WEAPON_RESOLVE = "weapon.resolve";
    /**红颜皮肤升级 */
    NetRequestConst.REQUEST_WIFESKIN_UPGRADE = "wife.upgradewifeskin";
    NetRequestConst.REQUEST_WIFECHAT_SELECT = "wife.chatselect";
    NetRequestConst.REQUEST_WIFECHAT_RESET = "wife.chatreset";
    /**红颜背景*/
    NetRequestConst.REQUEST_WIFESKIN_SELECTBG = "wife.usebackground";
    /**科举答题 */
    NetRequestConst.REQUEST_EXAM_ANSWER = "exam.selectanswer";
    /**科举答题排行榜 */
    NetRequestConst.REQUEST_EXAM_RANK = "exam.getrank";
    /**科举开始答题 */
    NetRequestConst.REQUEST_EXAM_START = "exam.start";
    /**东郊狩猎 击杀boss */
    NetRequestConst.REQUEST_ACTIVITY_HUNTIN_KILLBOSS = "activity.huntingBoss";
    /**东郊狩猎 领取累充奖励 */
    NetRequestConst.REQUEST_ACTIVITY_HUNTING_GETCHARGE = "activity.huntingGetCharge";
    /**东郊狩猎 领取击杀奖励 */
    NetRequestConst.REQUEST_ACTIVITY_KILLREWARD = "activity.huntingGetkillreward";
    /**中秋活动 月夜仙缘 */
    NetRequestConst.REQUEST_ACTIVITY_SWEETGIFT_GETCHARGE = "activity.sweetGiftGetCharge";
    NetRequestConst.REQUEST_ACTIVITY_SWEETGIFT_GETVISIT = "activity.sweetGiftGetreward";
    NetRequestConst.REQUEST_ACTIVITY_SWEETGIFT_GETTASK = "activity.sweetGiftGetTask";
    NetRequestConst.REQUEST_ACTIVITY_SWEETGIFT_GETSHOP = "activity.sweetGiftbuyshop";
    NetRequestConst.REQUEST_ACTIVITY_SWEETGIFT_MAKE = "activity.sweetGiftMake";
    /**投石破敌  抽奖*/
    NetRequestConst.REQUEST_ACTIVITY_THROWSTONE_LOTTERY = "activity.throwstonelottery";
    /**投石破敌  充值奖励*/
    NetRequestConst.REQUEST_ACTIVITY_THROWSTONE_GETCHARGE = "activity.throwstonegetrecharge";
    /**投石破敌  进度奖励*/
    NetRequestConst.REQUEST_ACTIVITY_THROWSTONE_GETACHIEVEMENT = "activity.throwstonegetachievement";
    //金蛋赠礼砸蛋
    NetRequestConst.REQUEST_ACTIVITY_SMASHEGG_CLICK = "activity.smashEggClick";
    //金蛋赠礼购买锤子
    NetRequestConst.REQUEST_ACTIVITY_SMASHEGG_BUY = "activity.smashEggBuy";
    //金蛋赠礼进度奖励
    NetRequestConst.REQUEST_ACTIVITY_SMASHEGG_GETREWARD = "activity.smashEggGetreward";
    //金蛋赠礼兑换皮肤
    NetRequestConst.REQUEST_ACTIVITY_SMASHEGG_EXCHANGE = "activity.smashEggExchange";
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
    /**珍器坊*/
    NetRequestConst.REQUEST_ZQF_SELECTSERVANT = "zhenqifang.selectservant";
    NetRequestConst.REQUEST_ZQF_GETFRIENDSERVANT = "zhenqifang.getservantlist";
    NetRequestConst.REQUEST_ZQF_FRESHTASK = "zhenqifang.fresh";
    NetRequestConst.REQUEST_ZQF_GETINFO = "zhenqifang.getmodel";
    NetRequestConst.REQUEST_ZQF_GETREWARD = "zhenqifang.getrewards";
    NetRequestConst.REQUEST_ZQF_GETITASK = "zhenqifang.getitask";
    NetRequestConst.REQUEST_ZQF_BATCHITASK = "zhenqifang.batchitask";
    NetRequestConst.REQUEST_ZQF_BATCHFTASK = "zhenqifang.batchftask";
    NetRequestConst.REQUEST_ZQF_SHOPBUY = "zhenqifang.shopbuy";
    /**天下至尊 */
    NetRequestConst.REQUEST_LT_GETMODEL = "laddertournament.getmodel";
    NetRequestConst.REQUEST_LT_SELECTSERVANT = "laddertournament.selectservant";
    NetRequestConst.REQUEST_LT_SEARCH = "laddertournament.search";
    NetRequestConst.REQUEST_LT_GETRANK = "laddertournament.getrank";
    NetRequestConst.REQUEST_LT_GETASK = "laddertournament.gettask";
    NetRequestConst.REQUEST_LT_FIGHT = "laddertournament.fight";
    NetRequestConst.REQUEST_LT_GETLOGS = "laddertournament.getlogs";
    NetRequestConst.REQUEST_LT_ADDBUFF = "laddertournament.addbuff";
    NetRequestConst.REQUEST_LT_SHOPBUY = "laddertournament.shopbuy";
    NetRequestConst.REQUEST_LT_GETLOGDETAIL = "laddertournament.getlogdetail";
    /**迁移服务器 绑定账号 */
    NetRequestConst.REQUEST_USER_SETBIND = "user.setbind";
    /**国庆活动 充值奖励 */
    NetRequestConst.REQUEST_ACTIVITY_NATIONDAY_GETCHARGE = "activity.nationdaygetchargerwd";
    /**国庆活动 任务奖励 */
    NetRequestConst.REQUEST_ACTIVITY_NATIONDAY_GETTASK = "activity.nationdaygettaskrwd";
    NetRequestConst.REQUEST_USER_REVERSIONSETTING = "user.reversionsetting";
    NetRequestConst.REQUEST_WIIFE_SETSEXSETTING = "wife.wifesexsetting";
    /**暗夜魅影 */
    NetRequestConst.REQUEST_DESTROYSAME_INFO = "activity.destroysamegetactive";
    NetRequestConst.REQUEST_DESTROYSAME_ATTACK = "activity.destroysameattack";
    NetRequestConst.REQUEST_DESTROYSAME_CHARGE = "activity.destroysamegetrecharge";
    NetRequestConst.REQUEST_DESTROYSAME_TASK = "activity.destroysamegettask";
    NetRequestConst.REQUEST_DESTROYSAME_REWARD = "activity.destroysamegetbossrwd";
    NetRequestConst.REQUEST_DESTROYSAME_SHOPBUY = "activity.destroysameshopbuy";
    /**开服庆典*/
    NetRequestConst.REQUEST_ACTIVITY_NEWOPENSHOPBUY = "activity.newOpenShopbuy";
    NetRequestConst.REQUEST_ACTIVITY_NEWOPENRINFOREWARDS = "activity.newOpenRinfoRewards";
    NetRequestConst.REQUEST_ACTIVITY_NEWOPENTASKREWARDS = "activity.newOpenTaskRewards";
    NetRequestConst.REQUEST_ACTIVITY_NEWOPENGETACTIVE = "activity.newOpenGetActive";
    /**女优活动2 */
    NetRequestConst.REQUST_ACTIVITY_GETRECHARGEBOXSPREWARD = "activity.getrechargeboxspreward";
    NetRequestConst.REQUEST_OTHER_HIDEVIP = "otherinfo.hidevip";
    /**女优活动3 */
    NetRequestConst.REQUEST_ACTIVITY_YIYIBUSHECHOU = "activity.yiyibushechou";
    NetRequestConst.REQUEST_ACTIVITY_YIYIBUSHE_GETREWARD = "activity.yiyibusheachievement";
    /**女优活动1 */
    NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_GETINFO = "activity.firstSightLoveGetInfo";
    NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_GETREWARD = "activity.firstSightLoveGetRewards";
    NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_BUY = "activity.firstSightLoveBuy";
    NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_BM = "activity.firstSightLoveBm";
    NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_GETLIST = "activity.firstSightLoveGetList";
    NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_BMLIST = "activity.firstSightLoveGetBmList";
    /**德川活动*/
    NetRequestConst.REQUEST_DECHUAN_REMIND = "activity.dechuanshidaimind";
    NetRequestConst.REQUEST_DECHUAN_RECHARGE = "activity.dechuanshidaigetcharge";
    NetRequestConst.REQUEST_DECHUAN_CLAIM = "activity.dechuanshidaiclaim";
    NetRequestConst.REQUEST_DECHUAN_DAILYTASK = "activity.dechuanshidaigettask";
    NetRequestConst.REQUEST_DECHUAN_DAILYTOTALTASK = "activity.dechuanshidaigettotaltask";
    /**2019年双十一活动*/
    //2019双十一活动转盘抽奖
    NetRequestConst.REQUEST_ACTIVITY_SDNEWCHOU = "activity.singleDay2019chou";
    NetRequestConst.REQUEST_ACTIVITY_SDNEWGETRECHARGE = "activity.singleDay2019getCharge";
    NetRequestConst.REQUEST_ACTIVITY_SDNEWBUY = "activity.singleDay2019buyShop";
    NetRequestConst.REQUEST_ACTIVITY_SDNEWGETRANK = "activity.singleDay2019getRank";
    NetRequestConst.REQUEST_ACTIVITY_SDNEWROLL = "activity.singleDay2019getRollList";
    /**女优活动4 依生依世 */
    NetRequestConst.REQUEST_ACTIVITY_COURTDUTY_GETTASK = "activity.courtDutyGettask";
    NetRequestConst.REQUEST_ACTIVITY_COURTDUTY_UNLOCK = "activity.courtDutyUnlock";
    /**当家*/
    NetRequestConst.OTHERINFO_SETDANGJIA = "otherinfo.setdangjia";
    /**携美同游 */
    NetRequestConst.REQUEST_ACTIVITY_TRAVELWITHBEAUTY_GET = "activity.travelWithBeautyGet";
    NetRequestConst.REQUEST_ACTIVITY_TRAVELWITHBEAUTY_RECHARGE = "activity.travelWithBeautyCharge";
    NetRequestConst.REQUEST_ACTIVITY_TRAVELWITHBEAUTY_REWARD = "activity.travelWithBeautyRewards";
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
    /** 设置用户自己字符串*/
    NetRequestConst.REQUEST_OTHERINFO_SETKV = "otherinfo.setkv";
    /** 追踪事件打点统计*/
    NetRequestConst.REQUEST_STATS_TRACKEVENT = "stats.clickevent";
    /**巾帼英雄 */
    NetRequestConst.REQUEST_ACTIVITY_HEROINE_PLAY = "activity.heroinelottery";
    NetRequestConst.REQUEST_ACTIVITY_HEROINE_RECHARGE = "activity.heroinegetrecharge";
    NetRequestConst.REQUEST_ACTIVITY_HEROINE_GETREWARD = "activity.heroineprocessrwd";
    /**折扣商店 */
    NetRequestConst.REQUEST_ACTIVITY_ANNIVERSARYSHOP2020_BUY = "activity.anniversaryShop2020buy";
    /**德川活动*/
    NetRequestConst.REQUEST_ANNUALPRAY_PRAY = "activity.annualPray2020Chou";
    NetRequestConst.REQUEST_ANNUALPRAY_RECHARGE = "activity.annualPray2020GetCharge";
    NetRequestConst.REQUEST_ANNUALPRAY_CLAIM = "activity.annualPray2020Claim";
    NetRequestConst.REQUEST_ANNUALPRAY_GETJINDUREWARD = "activity.annualPray2020GetRewards";
    /**帝王成就 */
    NetRequestConst.REQUEST_EMPERORACHIEVE_GETREWARD = "emperorachieve.getachieverewards"; //帝王成就成就奖励
    NetRequestConst.REQUEST_EMPERORACHIEVE_OUTING = "emperorachieve.outing"; //出巡
    NetRequestConst.REQUEST_EMPERORACHIEVE_GETOUTING_INFO = "emperorachieve.getoutinginfo"; //明君出巡获取出巡者信息
    NetRequestConst.REQUEST_EMPERORACHIEVE_SHOW_NOTICE = "emperorachieve.shownotice"; //明君出巡 主页面动画显示
    NetRequestConst.REQUEST_EMPERORACHIEVE_BARRAGE = "emperorachieve.barrage"; //明君出巡 发言
    NetRequestConst.REQUEST_EMPERORACHIEVE_GETPOPULARRWD = "emperorachieve.getpopularityrwd"; //明君出巡 人气奖励
    NetRequestConst.REQUEST_EMPERORACHIEVE_GETBARRAGE_LIST = "emperorachieve.getbarragelist"; //明君出巡 请安列表
    NetRequestConst.REQUEST_EMPERORACHIEVE_BONUS = "emperorachieve.bonus"; //明君出巡 赏赐
    NetRequestConst.REQUEST_EMPERORACHIEVE_GETBONUS = "emperorachieve.getbonus"; //明君出巡 领取赏赐
    /** 消费排行活动*/
    NetRequestConst.REQUEST_COSTGEMRANK_GETLIST = "activity.costGemRankGetRank";
    /** 感恩回馈*/
    NetRequestConst.REQUEST_DAILYRECHARGE_GEREWARD = "activity.dailyRechargeGetRewards";
    /** 感恩回馈*/
    NetRequestConst.REQUEST_NEWYEARRED_GEREWARD = "activity.newYearRedreward";
    /** 俄语七日好礼*/
    NetRequestConst.REQUEST_SEVENDAYSIGNUP_GEREWARD = "sevendaysign.getfirstdayrwd";
    /** 元宵节*/
    NetRequestConst.REQUEST_LANTERN_LOTTERY = "activity.lanternlottery";
    NetRequestConst.REQUEST_LANTERN_RECHARGEREWARD = "activity.lanterngetrecharge";
    NetRequestConst.REQUEST_LANTERN_PROCESSREWARD = "activity.lanternprocessrwd";
    /**武圣天威 */
    NetRequestConst.REQUEST_THREEKINGDOMSRECHARGE_LOTTERY = "activity.threekingdomsRechargeChou";
    NetRequestConst.REQUEST_THREEKINGDOMSRECHARGE_REWARDS = "activity.threekingdomsRechargeRewards";
    /**三国争霸*/
    NetRequestConst.REQUEST_THREEKINGDOMS_SELECTKINGDOMS = "threekingdoms.selectkingdoms";
    NetRequestConst.REQUEST_THREEKINGDOMS_ATTACKCITY = "threekingdoms.attackcity";
    NetRequestConst.REQUEST_THREEKINGDOMS_GETBUILDINGINFO = "threekingdoms.getbuildinginfo";
    NetRequestConst.REQUEST_THREEKINGDOMS_GETMAPINFO = "threekingdoms.getmapinfo";
    NetRequestConst.REQUEST_THREEKINGDOMS_UPGRADEREWARD = "threekingdoms.taskup";
    NetRequestConst.REQUEST_THREEKINGDOMS_TASKSTART = "threekingdoms.taskstart";
    NetRequestConst.REQUEST_THREEKINGDOMS_TASKREWARDS = "threekingdoms.taskrewards";
    NetRequestConst.REQUEST_THREEKINGDOMS_HEROINFO = "threekingdoms.heroinfo";
    NetRequestConst.REQUEST_THREEKINGDOMS_HEROATTACK = "threekingdoms.heroattack";
    NetRequestConst.REQUEST_THREEKINGDOMS_HERORECOVERY = "threekingdoms.herorecover";
    NetRequestConst.REQUEST_THREEKINGDOMS_HEROREWARD = "threekingdoms.herorewards";
    NetRequestConst.REQUEST_THREEKINGDOMS_RECHAGRERWD = "threekingdoms.getrechargerwd";
    NetRequestConst.REQUEST_THREEKINGDOMS_GOVERMENTINFO = "threekingdoms.governmentinfo";
    NetRequestConst.REQUEST_THREEKINGDOMS_GETRANK = "threekingdoms.getrank";
    NetRequestConst.REQUEST_THREEKINGDOMS_ORDER = "threekingdoms.order";
    NetRequestConst.REQUEST_THREEKINGDOMS_CITYREWARD = "threekingdoms.attackcityrewards";
    NetRequestConst.REQUEST_THREEKINGDOMS_SEASONRANK = "threekingdoms.seasonrank";
    NetRequestConst.REQUEST_THREEKINGDOMS_GETLIST = "threekingdoms.getlist";
    NetRequestConst.REQUEST_THREEKINGDOMS_GETLISTDETAIL = "threekingdoms.getlistdetail";
    NetRequestConst.REQUEST_THREEKINGDOMS_GETCITYRANK = "threekingdoms.getattackcityrank";
    NetRequestConst.REQUEST_THREEKINGDOMS_GETKINGDOMSREWARDS = "threekingdoms.getkingdomrewards";
    NetRequestConst.REQUEST_THREEKINGDOMS_GETCROSSACTIVEREWARDS = "threekingdoms.crossactiverewards";
    NetRequestConst.REQUEST_THREEKINGDOMS_GETMYLIST = "threekingdoms.getmylist";
    /**三国红颜 */
    NetRequestConst.REQUEST_ACTHREEKINGDOMSOFWIFE_LOTTERY = "activity.threekingdomsOfWifeChou";
    NetRequestConst.REQUEST_ACTHREEKINGDOMSOFWIFE_CHARGE = "activity.threekingdomsOfWifeCharge";
    NetRequestConst.REQUEST_ACTHREEKINGDOMSOFWIFE_ACHIEVE = "activity.threekingdomsOfWifeAch";
    /**财神祝福 */
    NetRequestConst.REQUEST_ACBLESSINGOFMAMMON_GETREWARD = "activity.blessingOfMammongetrwd";
    /**酒神诗仙 */
    NetRequestConst.REQUEST_ACSKINOFLIBAI_LOTTERY = "activity.skinOfLibaiChou";
    NetRequestConst.REQUEST_ACSKINOFLIBAI_CHARGE = "activity.skinOfLibaiCharge";
    NetRequestConst.REQUEST_ACSKINOFLIBAI_ACHIEVE = "activity.skinOfLibaiAch";
    /**万物复苏 */
    NetRequestConst.REQUEST_ACRECOVERY_LOTTERY = "activity.recoverylottery";
    NetRequestConst.REQUEST_ACRECOVERY_CHARGE = "activity.recoverygetrechargerwd";
    NetRequestConst.REQUEST_ACRECOVERY_ACHIEVE = "activity.recoverygetachievement";
    /**新好友邀请 */
    NetRequestConst.REQUEST_NEWINVITE_GETINVITEREWARD = "newinvite.getinvitereward";
    NetRequestConst.REQUEST_NEWINVITE_GETPOWERREWARD = "newinvite.getpowerreward";
    NetRequestConst.REQUEST_NEWINVITE_GETINFO = "newinvite.getinfo";
    NetRequestConst.REQUEST_NEWINVITE_BIND = "newinvite.bind";
    /**召唤好友 */
    NetRequestConst.REQUEST_REBACK_BIND = "newreback.bind";
    NetRequestConst.REQUEST_REBACK_GETINVITEREWARD = "newreback.getinvitereward";
    NetRequestConst.REQUEST_REBACK_GETINFO = "newreback.getinfo";
    /** 群雄争霸 初始化 */
    NetRequestConst.REQUEST_ACHEGEMONY_HEGEMONYOPEN = "achegemony.hegemonyopen";
    //首页排行榜
    NetRequestConst.REQUEST_ACHEGEMONY_GETRANK = "achegemony.getrank";
    //首页点击帮会 取帮会详情信息
    NetRequestConst.REQUEST_ACHEGEMONY_GETACHEALLIANCEINFO = "achegemony.getacheallianceinfo";
    //首页点击帮会 取帮会阵容
    NetRequestConst.REQUEST_ACHEGEMONY_GETACHEALLILIST = "achegemony.getacheallilist";
    //上阵门客
    NetRequestConst.REQUEST_ACHEGEMONY_SELECTSERVANT = "achegemony.selectservant";
    //群雄逐鹿活动下阵门客
    NetRequestConst.REQUEST_ACHEGEMONY_CANCELSERVANT = "achegemony.cancelservant";
    //使用计策
    NetRequestConst.REQUEST_ACHEGEMONY_SELECTSTRATAGEM = "achegemony.selectstratagem";
    //群雄逐鹿活动对战详情
    NetRequestConst.REQUEST_ACHEGEMONY_GETWARDETAIL = "achegemony.getwardetail";
    //群雄逐鹿活动打开人气排行榜
    NetRequestConst.REQUEST_ACHEGEMONY_GETWARFLAGRANK = "achegemony.getwarflagrank";
    //群雄逐鹿活动使用战旗押注
    NetRequestConst.REQUEST_ACHEGEMONY_USEWARFLAG = "achegemony.usewarflag";
    //群雄逐鹿活动战斗积分兑换接口
    NetRequestConst.REQUEST_ACHEGEMONY_EXCHANGEFIGHTSHOP = "achegemony.exchangefightshop";
    //群雄逐鹿活动人气积分兑换接口
    NetRequestConst.REQUEST_ACHEGEMONY_EXCHANGEFLAGSHOP = "achegemony.exchangeflagshop";
    //群雄逐鹿活动打开晋级赛排行榜
    NetRequestConst.REQUEST_ACHEGEMONY_GETPROMOTIONRANK = "achegemony.getpromotionrank";
    //群雄逐鹿活动获取淘汰赛对手信息
    NetRequestConst.REQUEST_ACHEGEMONY_GETWEEDOUTINFO = "achegemony.getweedoutinfo";
    //群雄逐鹿活动任务奖励
    NetRequestConst.REQUEST_ACHEGEMONY_GETTASKREWARD = "achegemony.gettaskreward";
    //群雄逐鹿活动战斗胜利积分
    NetRequestConst.REQUEST_ACHEGEMONY_GETWINSCORE = "achegemony.getwinscore";
    //群雄逐鹿活动领取战旗押注积分
    NetRequestConst.REQUEST_ACHEGEMONY_GETWARFLAGSCORE = "achegemony.getwarflagscore";
    //群雄逐鹿领取帮会充值奖励
    NetRequestConst.REQUEST_ACHEGEMONY_GETALLIANCECHARGERDW = "achegemony.getalliancerechargerwd";
    /**获取邮件model数据 */
    NetRequestConst.REQUEST_MAIL_GETMYMAILLIST = "mail.getmymaillist";
    /**朝廷诏令 */
    NetRequestConst.REQUEST_ACCHAOTING_GETTASK = "activity.getchaotingtask";
    NetRequestConst.REQUEST_ACCHAOTING_GETRECHARGE = "activity.chaotinggetrecharge";
    NetRequestConst.REQUEST_ACCHAOTING_GETRANK = "activity.getchaotingrank";
    NetRequestConst.REQUEST_ACCHAOTING_UNLOCK_TASK = "activity.unlockchaotingtask";
    /**复活节活动  */
    NetRequestConst.REQUEST_RABBIT_CHOU = "activity.rabbitComingChou";
    NetRequestConst.REQUEST_RABBIT_RECHARGE = "activity.rabbitComingCharge";
    NetRequestConst.REQUEST_RABBIT_ACHIEVE = "activity.rabbitComingAch";
    NetRequestConst.REQUEST_RABBIT_BUY = "activity.rabbitComingBuy";
    NetRequestConst.REQUEST_RABBIT_TASK = "activity.rabbitComingGetTask";
    NetRequestConst.REQUEST_RABBIT_RANK = "activity.rabbitComingGetRank";
    /**清风纸鸢 */
    NetRequestConst.REQUEST_ACKITE_LOTTERY = "activity.kitegetreward";
    NetRequestConst.REQUEST_ACKITE_GETBOXREWARD = "activity.kitegetboxreward";
    NetRequestConst.REQUEST_ACKITE_GETTASKREWARD = "activity.kitegettaskreward";
    NetRequestConst.REQUEST_ACKITE_GETRANK = "activity.kitegetrank";
    NetRequestConst.REQUEST_ACTIVITY_FIRSTFLAG = "activity.firstflag";
    //评定匈奴
    NetRequestConst.REQUEST_XIONGNU_ATK = "activity.beatXiongNuAttack";
    NetRequestConst.REQUEST_XIONGNU_RECHARGE = "activity.beatXiongNuGetCharge";
    NetRequestConst.REQUEST_XIONGNU_PROGRESS = "activity.beatXiongNuGetAchievement";
    /**兰亭荷花 */
    NetRequestConst.REQUEST_ACLOTUS_LOTTERY = "activity.lotusWatering";
    NetRequestConst.REQUEST_ACLOTUS_GETREWARD = "activity.lotusGetAchievement";
    NetRequestConst.REQUEST_ACLOTUS_EXCHANGE = "activity.lotusExchange";
    NetRequestConst.REQUEST_ACLOTUS_GETRANK = "activity.lotusGetrank";
    /**神器迷宫 */
    NetRequestConst.REQUEST_ACWEAPONMAZE_LOTTERY = "activity.weaponMazeGetboxreward";
    NetRequestConst.REQUEST_ACWEAPONMAZE_GETACHIEVT = "activity.weaponMazeGetschedule";
    NetRequestConst.REQUEST_ACWEAPONMAZE_GETRECHARGE = "activity.weaponMazeGetrecharge";
    /**端午活动 粽夏连连看 */
    NetRequestConst.REQUEST_FINDSAME_GETMAP = "activity.findSameGetmap";
    NetRequestConst.REQUEST_FINDSAME_ATTACK = "activity.findSameattack";
    NetRequestConst.REQUEST_FINDSAME_BUYNUM = "activity.findSamebuynum";
    NetRequestConst.REQUEST_FINDSAME_GETRECHARGE = "activity.findSameGetrecharge";
    NetRequestConst.REQUEST_FINDSAME_GETACHIEVEMENT = "activity.findSameGetachievement";
    NetRequestConst.REQUEST_FINDSAME_GETTASK = "activity.findSameGettask";
    /**红包来了 */
    NetRequestConst.REQUEST_GETREDPACKGIFT = "activity.getredPackGift";
    NetRequestConst.REQUEST_GETREDPACKINDEX = "activity.getredPackindex";
    /**棋社对弈 */
    NetRequestConst.REQUEST_CHESS_PLAY = "activity.chessPlay";
    NetRequestConst.REQUEST_CHESS_GETNUMREWARDS = "activity.chessGetnumrewards";
    NetRequestConst.REQUEST_CHESS_GETRECHARGE = "activity.chessGetrecharge";
    NetRequestConst.REQUEST_CHESS_GETTASK = "activity.chessGettask";
    NetRequestConst.REQUEST_CHESS_EXCHANGE = "activity.chessExchange";
    /**帮会集结 */
    NetRequestConst.REQUEST_AGGREGATION_GETRWD = "activity.aggregationgetrwd";
    NetRequestConst.REQUEST_AGGREGATION_GETINFO = "activity.aggregationgetinfo";
    /**骑士选拔 */
    NetRequestConst.REQUEST_KNIGHT_ATTACK = "activity.knightattack";
    NetRequestConst.REQUEST_KNIGHT_GETRINFORWD = "activity.knightgetrinforwd";
    NetRequestConst.REQUEST_KNIGHT_GETACHIEVE = "activity.knightgetachieve";
    /**皇城六部 */
    NetRequestConst.REQUEST_SIXSECTION1_GETMAP = "sixsection1.getmap"; //席位
    NetRequestConst.REQUEST_SIXSECTION1_ATTACK = "sixsection1.attack"; //派遣门客
    NetRequestConst.REQUEST_SIXSECTION1_ADDINFLUENCE = "sixsection1.addinfluence"; //增加影响力
    NetRequestConst.REQUEST_SIXSECTION1_INVESTIGATE = "sixsection1.investigate"; //侦查
    NetRequestConst.REQUEST_SIXSECTION1_GETDINFO = "sixsection1.getdinfo"; //防守信息
    NetRequestConst.REQUEST_SIXSECTION1_GETEINFO = "sixsection1.geteinfo"; //仇人
    NetRequestConst.REQUEST_SIXSECTION1_COLLECT = "sixsection1.collect"; //采集
    NetRequestConst.REQUEST_SIXSECTION1_SHOW = "sixsection1.show"; //据点结算
    NetRequestConst.REQUEST_SIXSECTION1_SEARCH = "sixsection1.search"; //编号查询
    NetRequestConst.REQUEST_SIXSECTION1_GETLIST = "sixsection1.getlist"; //抢夺记录
    NetRequestConst.REQUEST_SIXSECTION1_TITLEGETMAP = "sixsection1.directorgetmap"; //头衔
    NetRequestConst.REQUEST_SIXSECTION1_TITLEATTACK = "sixsection1.directorattack"; //头衔抢夺
    NetRequestConst.REQUEST_SIXSECTION1_GETRECHARGE = "sixsection1.getrechargerwd"; //每日充值
    NetRequestConst.REQUEST_SIXSECTION_DIRADDTIME = "sixsection1.directoraddtime"; //头衔挑战次数
    NetRequestConst.REQUEST_SIXSECTION1_CLICK = "sixsection1.click"; //统计
    /**青莲茶香 */
    NetRequestConst.REQUEST_DRINKTEA_DRINKTEA = "activity.drinkTea";
    NetRequestConst.REQUEST_DRINKTEA_GETRECHARGE = "activity.drinkTeaGetrecharge";
    NetRequestConst.REQUEST_DRINKTEA_GETACHIEVEMENT = "activity.drinkTeaGetachievement";
    /**更新有礼 */
    NetRequestConst.REQUEST_NEWPACK_GETREWARDS = "activity.newPackGetrewards";
    /**鼠来如意 */
    NetRequestConst.REQUEST_ACMOUSECOME_LOTTERY = "activity.mouseCometurn";
    NetRequestConst.REQUEST_ACMOUSECOME_ACHIEVERWD = "activity.mouseComeGetmouseNum";
    NetRequestConst.REQUEST_ACMOUSECOME_GETRANK = "activity.mouseComeGetrank";
    NetRequestConst.REQUEST_ACMOUSECOME_EXCHANGE = "activity.mouseComeExchange";
    /**
     * 神兵宝库
     */
    NetRequestConst.REQUEST_WEAPONHOUSE_MOVE = "activity.weaponHousemove"; //移动
    NetRequestConst.REQUEST_WEAPONHOUSE_BUYNUM = "activity.weaponHousebuynum"; //购买体力
    NetRequestConst.REQUEST_WEAPONHOUSE_GETRANK = "activity.weaponHouseGetRank"; //排行榜
    NetRequestConst.REQUEST_WEAPONHOUSE_GETRECHARGE = "activity.weaponHouseGetrecharge"; //领取充值
    NetRequestConst.REQUEST_WEAPONHOUSE_GETSCHEDULEALL = "activity.weaponHouseGetscheduleAll"; //领取全服进度奖励
    NetRequestConst.REQUEST_WEAPONHOUSE_GETSCHEDULEALLLIST = "activity.weaponHouseGetscheduleAlllist"; //获取全服进度表
    NetRequestConst.REQUEST_WEAPONHOUSE_GETSCHEDULEONE = "activity.weaponHouseGetscheduleOne"; //领取个人进度奖励
    NetRequestConst.REQUEST_WEAPONHOUSE_RESETMAP = "activity.weaponHouseresetmap";
    /**天籁之音 */
    NetRequestConst.REQUEST_ACSKYSOUND_KNOCK = "activity.skySoundknock";
    NetRequestConst.REQUEST_ACSKYSOUND_EXCHANGE = "activity.skySoundexchange";
    NetRequestConst.REQUEST_ACSKYSOUND_GETSOUNDNUM = "activity.skySoundGetsoundNum";
    NetRequestConst.REQUEST_ACSKYSOUND_EXCHANGEREWARDS = "activity.skySoundexchangerewards";
    /**夜观天象 */
    NetRequestConst.REQUEST_ACNIGHTSKY_PLAY = "activity.nightSkyPlay";
    NetRequestConst.REQUEST_ACNIGHTSKY_ACHIVERWD = "activity.nightSkyGetnumrewards";
    NetRequestConst.REQUEST_ACNIGHTSKY_EXCHANGE = "activity.nightSkyExchange";
    /**闲置兑换 */
    NetRequestConst.REQUEST_ACEXCHANGE_EXCHANGE = "activity.activityExchange";
    /**功能解锁 */
    NetRequestConst.REQUEST_OPENFUNCTION_UNLOCKLIST2 = "otherinfo.getunlocklist2reward";
    /**门客冲榜领取任务奖励 */
    NetRequestConst.REQUEST_ACCROSSONESERVER_GETREW = "crossoneserver.gettaskrewards";
    /**门客冲榜获取排行榜信息 */
    NetRequestConst.REQUEST_ACCROSSONESERVER_GETRANK = "crossoneserver.getrank";
    /**天魔铠甲 */
    NetRequestConst.REQUEST_ACSKYARMOR_PLAY = "activity.skyArmorPlay";
    NetRequestConst.REQUEST_ACSKYARMOR_GETNUMREWARDS = "activity.skyArmorGetnumrewards";
    NetRequestConst.REQUEST_ACSKYARMOR_GETRANK = "activity.skyArmorGetrank";
    NetRequestConst.REQUEST_ACSKYARMOR_EXCHANGE = "activity.skyArmorExchange";
    /**限时福利免费礼包 */
    NetRequestConst.REQUEST_ACLIMITGIFT_FREE = "activity.limitGiftFree";
    /**新服预约 */
    NetRequestConst.REQUEST_ACNEWAPPOINT_TASK_RWD = "activity.newappintgetreward";
    NetRequestConst.REQUEST_ACNEWAPPOINT_EXCHANGE = "activity.newappintexchange";
    /**鼠来招财 */
    NetRequestConst.REQUEST_ACMOUSEGOLD_FLOP = "activity.mouseGoldFlop";
    NetRequestConst.REQUEST_ACMOUSEGOLD_GETACHIEVEMENT = "activity.mouseGoldGetAchievement";
    NetRequestConst.REQUEST_ACMOUSEGOLD_GETSPEREWARD = "activity.mouseGoldGetspecialreward";
    NetRequestConst.REQUEST_ACMOUSEGOLD_NEXT = "activity.mouseGoldNext";
    NetRequestConst.REQUEST_ACMOUSEGOLD_EXCHANGE = "activity.mouseGoldexchange";
    NetRequestConst.REQUEST_ACMOUSEGOLD_GETRANK = "activity.mouseGoldGetrank";
    NetRequestConst.REQUEST_ACMOUSEGOLD_FLOPALL = "activity.mouseGoldFlopAll";
    /**海滨伊人 */
    NetRequestConst.REQUEST_AC_SEAWOMANFLOP = "activity.seaWomanFlop";
    NetRequestConst.REQUEST_AC_SEAWOMANEXCHANGE = "activity.seaWomanexchange";
    NetRequestConst.REQUEST_AC_SEAWOMANGETCHESSNUM = "activity.seaWomanGetchessnum";
    /** 情定鹊桥 */
    NetRequestConst.REQUEST_AC_BIRDBRIDGEWISH = "activity.birdBridgeWish";
    NetRequestConst.REQUEST_AC_BIRDBRIDGEGETWISH = "activity.birdBridgeGetWish";
    NetRequestConst.REQUEST_AC_BIRDBRIDGECHOOSEWISH = "activity.birdBridgeChooseWish";
    NetRequestConst.REQUEST_AC_BIRDBRIDGEGETRECHARGE = "activity.birdBridgeGetRecharge";
    NetRequestConst.REQUEST_AC_BIRDBRIDGEGETACHIEVE = "activity.birdBridgeGetAchieve";
    NetRequestConst.REQUEST_AC_BIRDBRIDGEGETMODEL = "activity.birdBridgeGetModel";
    /**权倾朝野 */
    NetRequestConst.REQUEST_ACPOWERFULL_LOTTERY = "activity.powerFullRescue";
    NetRequestConst.REQUEST_ACPOWERFULL_ACHIEVERWD = "activity.powerFullGetnightNum";
    NetRequestConst.REQUEST_ACPOWERFULL_EXCHANGE = "activity.powerFullExchange";
    NetRequestConst.REQUEST_ACPOWERFULL_SHOPBUY = "activity.powerFullShopbuy";
    NetRequestConst.REQUEST_ACPOWERFULL_PLOT = "activity.powerFullsetplot";
    /**求签问卜 */
    NetRequestConst.REQUEST_ACASKGOD_DIVINE = "activity.askGodDivine";
    NetRequestConst.REQUEST_ACASKGOD_GETNIGHTNUM = "activity.askGodGetnightNum";
    NetRequestConst.REQUEST_ACASKGOD_SHOPEXCHANGE = "activity.askGodShopexchange";
    /**情系良缘 */
    NetRequestConst.REQUEST_ACGOODMATCH_SELECTPOOL = "activity.goodMatchSettype";
    NetRequestConst.REQUEST_ACGOODMATCH_LOTTERY = "activity.goodMatchPlay";
    NetRequestConst.REQUEST_ACGOODMATCH_GETACHRWD = "activity.goodMatchGetOneAchieve";
    NetRequestConst.REQUEST_ACGOODMATCH_GETSERVERACHRWD = "activity.goodMatchGetAllAchieve";
    NetRequestConst.REQUEST_ACGOODMATCH_GETSERVERACHDATA = "activity.goodMatchAllAchieveData";
    NetRequestConst.REQUEST_ACGOODMATCH_EXCHANGE = "activity.goodMatchExchange";
})(NetRequestConst || (NetRequestConst = {}));
//# sourceMappingURL=NetRequestConst.js.map