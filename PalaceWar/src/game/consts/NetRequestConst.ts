/**
 * 网络通信请求常量
 * author 陈可
 * date 2017/9/15
 * @class NetManager
 */
namespace NetRequestConst 
{
	// 前端聊天请求类型(不是接口)
	export const REQUEST_CLIENT_CHAT:string = "request_client_chat";
	// 用户登录请求
	export const REQUEST_USER_LOGIIN:string = "user.login";
	// gettoken
	export const HTTP_GETACCESS_TOKEN:string = "getToken";
	// 同步请求
	export const REQUEST_USER_SYNC:string = "user.sync";
	// 门客升级
	export const REQUEST_UPGRADE_SERVANT:string = "servant.upgrade";
	// 门客升级10级
	export const REQUEST_UPGRADE_SERVANT_TEN:string = "servant.upgradeten";
	export const REQUEST_UPGRADE_SERVANT_EQUIP:string = "servant.servantequip";
	export const REQUEST_UPGRADE_SERVANT_UPSKILLABILITY:string = "servant.upskinability";
	export const REQUEST_UPGRADE_SERVANT_REDSKINRED:string = "servant.readservantskinred";

	// 红颜召唤、一键召唤
	export const REQUEST_WIFE_CALL:string = "wife.call";
	// 恢复红颜精力
	export const REQUEST_WIFE_RECOVERENERGY:string = "wife.recoverenergy";
	// 红颜宠幸
	export const REQUEST_WIFE_LOVE:string = "wife.love";
	// 红颜赏赐
	export const REQUEST_WIFE_AWARD:string = "wife.award";
	// 红颜技能升级
	export const REQUEST_WIFE_UPGRADESKILL:string = "wife.upgradeskill";
	export const REQUEST_WIFE_SKILLEXPEXCHANGE:string = "wife.skillexpexchange";

	// 省亲
	export const REQUEST_WIFE_BANISH:string = "wife.banish";
	// 省亲提前召回
	export const REQUEST_WIFE_FINISH:string = "wife.finish";
	// 省亲购买席位接口
	export const REQUEST_WIFE_BUYBANISHPOS:string = "wife.buybanishpos";
	// 省亲购买席位接口
	export const REQUEST_WIFE_GETWIFEBANISHMODEL:string = "wife.getwifebanishmodel";

	// 道具使用
	export const REQUEST_USE_ITEM:string = "item.use";
	// 道具 背包里使用道具选择奖励
	export const REQUEST_USE_CHOOSE:string = "item.choose";
	// 道具称号装配
	export const REQUEST_ITEM_TITLE:string = "item.title";
	// 道具称号卸下
	export const REQUEST_ITEM_DROPTITLE:string = "item.droptitle";
	// 商城购买道具
	export const REQUEST_SHOP_BUY_ITEM:string = "shop.buyitem";
	export const REQUEST_SHOP_GETSHOPCFG:string = "shop.getshopcfg";
	export const REQUEST_SHOP_SHOWMONTHCARDNOTICE:string = "shop.showmonthcardnotice";
	export const REQUEST_SHOP_GETGROWGOLD:string = "shop.getgrowgold";
	
	// 兑换四大谋士
	export const REQUEST_ACTIVITY_EXCHANGEFOURPEOPLE:string = "activity.exchangefourpeople";
	// 牢房惩罚
	export const REQUEST_PRISON_PUNISH:string = "prison.punish";
	export const REQUEST_PRISON_AUTOPUNISH:string = "prison.autopunish";
	/**
	 * 领取首冲奖励
	 */
	export const REQUEST_SHOP_FIRSTCHARGEREWARD:string = "shop.firstchargereward";
	/**
	 * 发起寻访
	 */
	export const REQUEST_SEARCH_PLAY:string = "search.play";
	/**
	 * 使用体力丹
	 */
	export const REQUEST_SEARCH_PILL:string = "search.pill";
	/**
	 * 查看帝君阁
	 */
	export const REQUEST_SEARCH_GETBIOGRAPHY:string = "search.getbiography";
	export const REQUEST_RANK_GETBIOGRAPHY:string = "rank.getbiography";
	/**
	 * 关卡 发起战斗
	 */
	export const REQUEST_CHALLENGE_ATTACK:string = "challenge.attack";
	/**
	 * 关卡 恢复攻击次数
	 */
	export const REQUEST_CHALLENGE_RECOVER:string="challenge.recover";
	/**
	 * 一键扫荡关卡
	 */
	export const REQUEST_CHALLENGE_AUTOATTACK:string="challenge.autoattack";
	/**
	 * 关卡--快速战斗和试用
	 */
	export const REQUEST_CHALLENGE_AUTOFASTATTACK:string="challenge.autofastattack";	
	// 扩展子嗣位置
	export const REQUEST_CHILD_ADDPOSNUM:string = "child.addposnum";
	// 修改子嗣名称
	export const REQUEST_CHILD_RENAME:string = "child.rename";
	// 子嗣培养
	export const REQUEST_CHILD_TRAIN:string = "child.train";
	// 子嗣一键培养
	export const REQUEST_CHILD_AUTOTRAIN:string = "child.autotrain";
	// 子嗣一键恢复活力
	export const REQUEST_CHILD_AUTORECOVER:string = "child.autorecover";
	// 恢复活力
	export const REQUEST_CHILD_RECOVER:string = "child.recover";
	// 科举考试/子嗣成年
	export const REQUEST_CHILD_EXAMINATION:string = "child.examination";
	// 子嗣管家一键
	export const REQUEST_CHILD_BATCHRENAME:string = "child.batchrename";
	// 处理政务
	export const REQUEST_MANAGE_DEALAFFAIR:string = "manage.dealaffair";
	export const REQUEST_MANAGE_GETFINACE:string = "manage.getfinance";
	// 使用政务令
	export const REQUEST_MANAGE_ADDAFFAIR:string = "manage.addaffair";
	// 一键使用政务令
	export const REQUEST_MANAGE_BATCHDEALAFFAIR:string = "manage.batchdealaffair";
	/**
	 * 经营资产
	 */
	export const REQUEST_MANAGE_DEALFINANCE:string = "manage.dealfinance";
	/**
	 * 一键经营资产
	 */
	export const REQUEST_MANAGE_BATCHDEALFINANCE:string = "manage.batchdealfinance";

	// 使用征收令
	export const REQUEST_MANAGE_ADDFINANCE:string = "manage.addfinance";
	// 领取主线任务奖励
	export const REQUEST_TASK_GETMAINTASK:string = "task.getmaintask";
	// 领取每日任务奖励
	export const REQUEST_TASK_GETDAILYTASK:string = "task.getdailytask";
	// 领取活跃奖励
	export const REQUEST_TASK_GETLIVENESS:string = "task.getliveness";
	/**
	 * 获取离线奖励
	 */
	export const REQUEST_MANAGE_AUTOFINANCE:string="manage.autofinance";

	/**
	 * 获取离线资源和当前经营信息
	 */
	export const REQUEST_MANAGE_GETAUTOANDFINANCE:string="manage.getautoandfinance";
	//玩家升官
	export const REQUEST_USER_UPGRADE:string="user.upgrade";

	//检测游戏名称是否存在
	export const REQUEST_USER_CHECKNAME:string="user.checkname";
	
	//修改游戏名称
	export const REQUEST_USER_CHANGENAME:string="user.changename";

	//创建游戏角色
	export const REQUEST_USER_CREATEUSER:string="user.createuser";

	/**
	 * 聊天加密
	 */
	export const REQUEST_CHAT_ENCRYPT:string="chat.encrypt";
	/**
	 * 聊天分享
	 */
	export const REQUEST_CHAT_SENDCHATMSG:string="chat.senddinnermsg";
	export const REQUEST_CHAT_SENDSTUDYATKMSG:string="chat.sendstudyatkmsg";
	export const REQUEST_CHAT_SENDADULTMSG:string="chat.sendadultmsg";
	
	/**
	 * 聊天翻译
	 */
	export const REQUEST_CHAT_TRANSLATION:string="chat.translation";

	/**
	 * 排行榜相关接口
	 */
	export const REQUEST_RANK_INDEX:string="rank.index";
	export const REQUEST_RANK_VISIT:string="rank.visit";
	export const REQUEST_RANK_USERSHOT:string="rank.usershot";

	export const REQUEST_RANKG_INDEX:string="rankg.index";
	export const REQUEST_RANKG_VISIT:string="rankg.visit";
	export const REQUEST_RANKG_USERSHOT:string="rankg.usershot";

	export const REQUEST_ATKRACE_USERSHOT:string="atkraceg.usershot";
	export const REQUEST_IMACY_USERSHOT:string="imacy.usershot";
	export const REQUEST_POWER_USERSHOT:string="power.usershot";

	/**
	 * 媒婆榜相关接口
	 */
	/**
	 * 定向提亲
	 */
	export const REQUEST_RADULT_PROPOSE:string="adult.propose";

	/**
	 * 全服提亲
	 */
	export const REQUEST_RADULT_PROPOSEALL:string="adult.proposeall";


	/**
	 * 获取向我提亲信息
	 */
	export const REQUEST_RADULT_GETPROPOSEE:string="adult.getpropose";

	/**
	 * 获取区服所有的提亲信息
	 */
	export const REQUEST_RADULT_GETALLPROPOSE:string="adult.getallpropose";

	/**
	 * 同意联姻
	 */
	export const REQUEST_RADULT_AGREEPROPOSE:string="adult.agreepropose";


	/**
	 * 取消提亲
	 */
	export const REQUEST_RADULT_CANCELPROPOSE:string="adult.cancelpropose";

	/**
	 * 一键/拒绝提亲请求
	 * 
	 */
	export const REQUEST_RADULT_REFUSEPROPOSE:string="adult.refusepropose";

	/**
	 * 获取媒婆结婚信息
	 */
	export const REQUEST_RADULT_GETADULTINFO:string="adult.getadultinfo";
	export const REQUEST_ADULT_GETMINFO:string="adult.getminfo";
	/**
	 * 获取提亲请求当前状态
	 */
	export const REQUEST_ADULT_EXISTPROPOSE:string="adult.existpropose";

	/**
	 * 每日任务相关接口
	 */
	export const REQUEST_DAILYTASK_GET:string="task.getdailytask";
	export const REQUEST_DAILYLIVENESS_GET:string="task.getliveness";
	export const REQUEST_DAILYTASK_GETLIVENESS:string="task.getliveness";

	/**
	 * 我的邮件列表
	 */
	export const REQUEST_MAIL_GET_MYMAILLIST:string = "mail.getmymaillist";
	/**
	 * 查看邮件的详细内容
	 */
	export const REQUEST_MAIL_GET_DETAIL:string = "mail.getdetail";
	/**
	 * 获取邮件中的附件奖励
	 */
	export const REQUEST_MAIL_GET_REWARDS:string = "mail.getrewardsbymail";
	/**
	 * 邮件一键领取
	 */
	export const REQUEST_MAIL_GET_ALL_REWARDS:string = "mail.getallrewards";

	/**
	 * 皇宫接口
	 * "获取皇宫具体信息",
	 * "领取俸禄",
	 * "修改签名",
	 */ 
	export const REQUEST_PALACE_GETPALACEINFO:string="palace.getpalaceinfo";
	export const REQUEST_PALACE_GETSALARY:string="palace.getsalary";
	export const REQUEST_PALACE_SIGN:string="palace.sign";
	export const REQUEST_PALACE_CROSS_SIGN:string="palace.crosssign";
	/**
	 * 宴会接口
	 */
	export const REQUEST_DINNER_GETDINNER:string="dinner.getdinner";
	export const REQUEST_DINNER_GETDINNERDETAIL:string="dinner.getdinnerdetail";
	export const REQUEST_DINNER_JOINDINNER:string="dinner.joindinner";
	export const REQUEST_DINNER_CREATDINNER:string="dinner.createdinner";
	export const REQUEST_DINNER_CANVIEWDINNER:string="dinner.canviewdinner";
	export const REQUEST_DINNER_FEFRESHITEM:string="dinner.refreshitem";
	export const REQUEST_DINNER_SHOPITEM:string="dinner.shopitem";
	export const REQUEST_DINNER_SCOREDINNER:string="dinner.scoretoitem";
	export const REQUEST_DINNER_HISTORY:string="dinner.history";
	export const REQUEST_DINNER_TOP:string="dinner.top";
	export const REQUEST_DINNER_SHAREDINNER:string="dinner.sharedinner";
	export const REQUEST_DINNER_USEITEM:string="dinner.useitem";
	//首次点击开始宴会发送强弹请求
	export const REQUEST_DINNER_SHOWNEEDITEM:string = "dinner.showneeditem";
	//宴会记录详情
	export const REQUEST_DINNER_HISTORYDETAILS:string = "dinner.historydetails";

	/**
	 * 签到接口
	 */
	export const REQUEST_USER_ARRIVAL:string = "user.arrival";

	/**
	 * 获取活动配置
	 */
	export const REQUEST_ACTIVITY_GETACTIVECFG:string="activity.getactivecfg";
	export const REQUEST_ACTIVITY_GETMODEL:string = "activity.getmodel"; 

	/**
	 * 领取成就奖励
	 */
	export const REQUEST_ACHIEVEMENT_GETREWARDS:string="achievement.getrewards";
	/**
	 * 充值接口
	 */
	export const REQUEST_PAY_RROCCESSPAYMENT:string = "pay.processpayment";

	/**
	 * 检测是否可以继续充值此档位
	 */
	export const REQUEST_PAY_CHECKPAY:string = "pay.checkpay";

	/**
	 * 冲榜活动获取排行榜
	 */
	 export const REQUEST_ACTIVITY_GETRANKACTIVE:string="activity.getrankactive";
	 /**
	  * 充值活动接口
	  "领取每日充值活动奖励",
	  参数 activeId 活动ID  rkey 领取的是第几档
	  参数 activeId 活动ID  rkey 领取的是第几档
	  */
	  export const REQUEST_RECHARGE_GETDAILYREWARD:string = "activity.getdailychargereward";
	  export const REQUEST_RECHARGE_GETTOTALDAILYREWARD:string = "activity.gettotaldayrechargereward";
	  export const REQUEST_RECHARGE_GETTOTALREWARD:string = "activity.gettotalrechargereward";

	  /**
	   * 狂欢节活动
	   * 狂欢节充值
	   * 狂欢节消费
	   * 参数
	   *	参数 activeId 活动ID  rkey 领取的是第几档
	   *	参数 activeId 活动ID  rkey 领取的是第几档
	   */
	  export const REQUEST_ACTIVITY_GETCARNIVALCHARGE = "activity.getcarnivalcharge";
	  export const REQUEST_ACTIVITY_GETCARNIVALCOST = "activity.getcarnivalcost";

	  /**
	   * 米莎来了活动
	   * 
	   */
	  export const REQUEST_ACTIVITY_GETWIFECOMEREWARD = "activity.getwifecomereward";

	 /**
	  * 领取限时活动奖励
	  */
	export const REQUEST_ACTIVITY_GETLIMITEDREWARD:string = "activity.getlimitedreward";
	/**
	 * 一键领取限时奖励
	 */
	export const REQUEST_ACTIVITY_GETALLLIMITEDREWARD:string="activity.getalllimitedreward";
	/**
	  * 领取vip奖励
	  */
	export const REQUEST_VIP_VIPWELFARE:string = "shop.vipwelfare";
	/**
	  * 兑换礼包码
	  */
	export const REQUEST_USER_EXCHANGECARD:string = "user.exchangecard";

	export const REQUEST_SERVANT_UPABILITY:string = "servant.upability";
	
	export const REQUEST_SERVANT_UPSKILL:string = "servant.upskill";
 

	/**
	 * 获取惩戒女囚活动信息
	 */
	 export const REQUEST_ACTIVITY_GETPUNISHACTIVE:string="activity.getpunishactive";
	/**
	 * 西域商店
	 */
	 export const ACTIVITY_BUYVIPSHOP:string = "activity.buyvipshop";	
	
	 /**
	 * 春季庆典 春季典庆-春季送礼"
	 */
	 export const ACTIVITY_GETSPRINGITEMA:string = "activity.getspringitema";	 

	 /**
	 * 春季庆典 春季典庆-春季兑换"
	 */
	 export const ACTIVITY_GETSPRINGITEMB:string = "activity.getspringitemb";	
	
	 /**
	 * 春季庆典 春季典庆-踏青狂欢"
	 */
	 export const ACTIVITY_GETSPRINGITEMC:string = "activity.getspringitemc";	
	  
	  /**
	 * 春季庆典 春季典庆-折扣特惠"
	 */
	 export const ACTIVITY_GETSPRINGITEMD:string = "activity.getspringitemd";	

	 

	 /**
	 * 购买惩戒道具
	 */
	 export const REQUEST_ACTIVITY_BUYPUNISHITEM:string="activity.buypunishitem";

	 /**
	 * 使用惩戒道具
	 */
	 export const REQUEST_ACTIVITY_USEPUNISHITEM:string="activity.usepunishitem";
	 export const REQUEST_ACTIVITY_AUTOPUNISH:string = "activity.autopunish";

	 /**
	  * 泰拳活动 加体力(使用道具)
	  */
	 export const REQUEST_ACTIVITY_PUNISHADDENERGY:string="activity.punishaddenergy";

	 /**
	 * 使用积分购买活动商店物品
	 */
	 export const REQUEST_ACTIVITY_BUYPUNISHSHOP:string="activity.buypunishshop";
	/**
	 * 领取击杀奖励
	 */
	 export const REQUEST_ACTIVITY_GETPUNISHREWARD:string="activity.getpunishreward";


	 /**
	 * 领取奖励春节攀升
	 */
	 export const REQUEST_ACTIVITY_GETNEWYEARREWARD:string="activity.getnewyearreward";
	 export const REQUEST_ACTIVITY_GETCOURIERREWARD:string="activity.gettwcourierreward";
	/**
	 * 领取奖励春节攀升 每天第一个元宝购买任务
	 */
	 export const REQUEST_ACTIVITY_BUYNEWYEARGIFT:string="activity.buynewyeargift";
	 export const REQUEST_ACTIVITY_BUYCOURIERGIFT:string="activity.buytwcouriergift";
	
	 /**
	 * 领取解锁功能奖励
	 */
	 export const  REQUEST_OTHERINFO_GETUNLOCKLISTREWARD:string="otherinfo.getunlocklistreward";

	 /**
	 * 领取实名认证奖励（非3k）
	 */
	 export const  REQUEST_OTHERINFO_GETCERTIFICATION:string="otherinfo.getcertification";

	/**
	 * 登记玩家信息
	 */
	 export const  REQUEST_OTHERINFO_SENDUSERMSG:string="otherinfo.sendusermsg";


	 export const REQUEST_SERVANT_UPAURA:string = "servant.upaura";
	 export const REQUEST_SERVANT_CHANGE:string = "servant.change";

	 export const REQUEST_SERVANT_UPSKINSPECIALAURA:string = "servant.upskinspecialaura";
	/**
	 * 设置自动捐款信息
	 */
	export const REQUEST_SEARCH_SET:string="search.set";

	/**
	 * vip免费/花费捐款信息接口
	 */
	export const REQUEST_SEARCH_BUY:string="search.buy";

	/**
	 * 擂台接口
	 */
	export const REQUEST_ATKRACE_INDEX:string="atkrace.index";
	export const REQUEST_ATKRACE_ATTRBUY:string="atkrace.attrbuy";
	export const REQUEST_ATKRACE_FIGHT:string="atkrace.fight";
	export const REQUEST_ATKRACE_REVENGE:string="atkrace.revenge";
	export const REQUEST_ATKRACE_KILL:string="atkrace.kill";
	export const REQUEST_ATKRACE_CHALLENGE:string="atkrace.challenge";
	export const REQUEST_ATKRACE_RANDREWARD:string="atkrace.randreward";
	export const REQUEST_ATKRACE_GETINFO:string="atkrace.getinfo";
	export const REQUEST_ATKRACE_LIST:string="atkrace.list";
	export const REQUEST_ATKRACE_RANK:string="atkrace.rank";
	export const REQUEST_ATKRACE_HANDLE:string="atkrace.handle";
	export const REQUEST_ATKRACE_ATTRBUYLIST:string="atkrace.attrlist";
	export const REQUEST_ATKRACE_GETMODEL:string="atkrace.getmodel";
	export const REQUEST_ATKRACE_USEEXTRA:string="atkrace.useextra";
	export const REQUEST_ATKRACE_REFRESH:string="atkrace.refresh";
	export const REQUEST_ATKRACE_BATCHFIGHT:string="atkrace.batchfight";
	

	/**
	 * 跨服擂台接口
	 */
	export const REQUEST_ATKRACECROSS_INDEX:string="atkraceg.index";
	export const REQUEST_ATKRACECROSS_ATTRBUY:string="atkraceg.attrbuy";
	export const REQUEST_ATKRACECROSS_FIGHT:string="atkraceg.fight";
	export const REQUEST_ATKRACECROSS_REVENGE:string="atkraceg.revenge";
	export const REQUEST_ATKRACECROSS_KILL:string="atkraceg.kill";
	export const REQUEST_ATKRACECROSS_CHALLENGE:string="atkraceg.challenge";
	export const REQUEST_ATKRACECROSS_RANDREWARD:string="atkraceg.randreward";
	export const REQUEST_ATKRACECROSS_GETINFO:string="atkraceg.getinfo";
	export const REQUEST_ATKRACECROSS_LIST:string="atkraceg.list";
	export const REQUEST_ATKRACECROSS_RANK:string="atkraceg.rank";
	export const REQUEST_ATKRACECROSS_HANDLE:string="atkraceg.handle";
	export const REQUEST_ATKRACECROSS_ATTRBUYLIST:string="atkraceg.attrlist";
	export const REQUEST_ATKRACECROSS_GETMODEL:string="atkraceg.getmodel";
	export const REQUEST_ATKRACECROSS_USEEXTRA:string="atkraceg.useextra";
	export const REQUEST_ATKRACECROSS_REFRESH:string="atkraceg.refresh";
	export const REQUEST_ATKRACECROSS_GETACTIVITYATK:string="atkraceg.getactivityatk";
	export const REQUEST_ATKRACECROSS_BATCHFIGHT:string="atkraceg.batchfight";

	export const REQUEST_ACTIVITY_ATKRACEG_GETTASKREWARD:string="atkraceg.gettaskrewards";//任务奖励
	export const REQUEST_ACTIVITY_ATKRACEG_USEFLAG:string="atkraceg.usewarflag";//使用玉莲
	export const REQUEST_ACTIVITY_ATKRACEG_GETFLAGREWARD:string="atkraceg.getwarflagscore";//领取人气币
	export const REQUEST_ACTIVITY_ATKRACEG_SHOPBUY:string="atkraceg.shopbuy";//商店购买
	export const REQUEST_ACTIVITY_ATKRACEG_FLAGRANK:string="atkraceg.getwarflagrank";//人气排行
	export const REQUEST_ACTIVITY_ATKRACEG_EXCHANGE:string="atkraceg.exchange";//兑换
	export const REQUEST_ACTIVITY_ATKRACEG_SHOP2EXCHANGE:string="atkraceg.shop2exchange";//道具兑换	
	
	/**
	 * 	群雄跨服擂台接口
	 */
	export const REQUEST_NEWATKRACECROSS_CHANGESIDS:string="atkracegnew.changesids";
	export const REQUEST_NEWATKRACECROSS_INDEX:string="atkracegnew.index";
	export const REQUEST_NEWATKRACECROSS_ATTRBUY:string="atkracegnew.attrbuy";
	export const REQUEST_NEWATKRACECROSS_FIGHT:string="atkracegnew.fight";
	export const REQUEST_NEWATKRACECROSS_REVENGE:string="atkracegnew.revenge";
	export const REQUEST_NEWATKRACECROSS_KILL:string="atkracegnew.kill";
	export const REQUEST_NEWATKRACECROSS_CHALLENGE:string="atkracegnew.challenge";
	export const REQUEST_NEWATKRACECROSS_RANDREWARD:string="atkracegnew.randreward";
	export const REQUEST_NEWATKRACECROSS_GETINFO:string="atkracegnew.getinfo";
	export const REQUEST_NEWATKRACECROSS_LIST:string="atkracegnew.list";
	export const REQUEST_NEWATKRACECROSS_RANK:string="atkracegnew.rank";
	export const REQUEST_NEWATKRACECROSS_HANDLE:string="atkracegnew.handle";
	export const REQUEST_NEWATKRACECROSS_ATTRBUYLIST:string="atkracegnew.attrlist";
	export const REQUEST_NEWATKRACECROSS_GETMODEL:string="atkracegnew.getmodel";
	export const REQUEST_NEWATKRACECROSS_USEEXTRA:string="atkracegnew.useextra";
	export const REQUEST_NEWATKRACECROSS_REFRESH:string="atkracegnew.refresh";
	export const REQUEST_NEWATKRACECROSS_GETACTIVITYATK:string="atkracegnew.getactivityatk";
	export const REQUEST_NEWATKRACECROSS_BATCHFIGHT:string="atkracegnew.batchfight";
	export const REQUEST_NEWATKRACECROSS_DIRECTORGETMAP:string="atkracegnew.directorgetmap";
	export const REQUEST_NEWATKRACECROSS_DIRECTORATTACK:string="atkracegnew.directorattack";
	export const REQUEST_NEWATKRACECROSS_DIRECTOREXTRA:string="atkracegnew.directorextra";

	/**
	 * 获取道具合成配置
	 */
	export const REQUEST_ITEM_GETCOMPOSE:string="item.getcompose";

	/**
	 * 获取道具合成配置
	 */
	export const REQUEST_ITEM_GETMODEL:string="item.getmodel";

	

	/**
	 * 合成道具
	 */
	export const REQUEST_ITEM_DOCOMPOSE:string="item.docompose"
	/**
	 * 联盟模块
	 */
	export const REQUEST_ALLIANCE_INITALLIANCE:string="alliance.initalliance"
	export const REQUEST_ALLIANCE_CREATEALLIANCE:string="alliance.createalliance"
	export const REQUEST_ALLIANCE_JOINRANDALLIANCE:string="alliance.joinrandalliance"
	export const REQUEST_ALLIANCE_FINDALLIANCE:string="alliance.findalliance"
	export const REQUEST_ALLIANCE_GETALLIANCELIST:string="alliance.getalliancelist"
	export const REQUEST_ALLIANCE_APPLYALLIANCE:string="alliance.applyalliance"
	export const REQUEST_ALLIANCE_CANCELAPPLY:string="alliance.cancelapply"
	export const REQUEST_ALLIANCE_ACCEPT:string="alliance.accept"
	export const REQUEST_ALLIANCE_REFUSEAPPLY:string="alliance.refuseapply"
	export const REQUEST_ALLIANCE_REFUSEALLAPPLY:string="alliance.refuseallapply"
	export const REQUEST_ALLIANCE_RENAME:string="alliance.rename"
	export const REQUEST_ALLIANCE_MODINFO:string="alliance.modinfo"
	export const REQUEST_ALLIANCE_SETSWITCH:string="alliance.setswitch"
	export const REQUEST_ALLIANCE_EXITALLIANCE:string="alliance.exitalliance"
	export const REQUEST_ALLIANCE_GETALLIANCEAPPLY:string="alliance.getallianceapply"
	export const REQUEST_ALLIANCE_GETMEMBER:string="alliance.getmember"
	export const REQUEST_ALLIANCE_SETPOS:string="alliance.setpos"
	export const REQUEST_ALLIANCE_GETDETAILS:string="alliance.getdetails"
	export const REQUEST_ALLIANCE_TRANSFER:string="alliance.transfer"
	export const REQUEST_ALLIANCE_KICKALLIANCE:string="alliance.kickalliance"
	export const REQUEST_ALLIANCE_DISBAND:string="alliance.disband"
	export const REQUEST_ALLIANCE_DONATE:string="alliance.donate"
	export const REQUEST_ALLIANCE_SHOPBUY:string="alliance.shopbuy"

	export const REQUEST_ALLIANCE_ATTACK:string="alliance.attack"
	export const REQUEST_ALLIANCE_OPENBOSS:string="alliance.openboss"
	export const REQUEST_ALLIANCE_RECOVER:string="alliance.recover"
	export const REQUEST_ALLIANCE_GETBOSSLOG:string="alliance.getbosslog"
	export const REQUEST_ALLIANCE_GETBOSSRANK:string="alliance.getbossrank"
	
	/**
	 * "书院入席学习接口",
	 */
	export const REQUEST_BOOKROOM_STUDY:string = "bookroom.study";
	/**
	 * "书院学习(一键)完成接口",
	 */
	export const REQUEST_BOOKROOM_FINISH:string = "bookroom.finish";
	/**
	 * "书院购买席位接口",
	 */
	export const REQUEST_BOOKROOM_BUY:string = "bookroom.buy";
	/**
	 * 书院一键学习
	 */
	export const REQUEST_BOOKROOM_ONEKEYSTUDY:string = "bookroom.newonekeystudy";

	/**
	 * 练武场相关接口
	 */
	export const REQUEST_STUDYATK_INDEX:string="studyatk.index";
	export const REQUEST_STUDYATK_CREATE:string="studyatk.create";
	export const REQUEST_STUDYATK_JOIN:string="studyatk.join";
	export const REQUEST_STUDYATK_GOAWAY:string="studyatk.goaway";
	export const REQUEST_STUDYATK_GETATKDETAIL:string="studyatk.getatkdetail";
	export const REQUEST_STUDYATK_GETATK:string="studyatk.getatk";
	export const REQUEST_STUDYATK_UPGRADE:string="studyatk.upgrade";
	export const REQUEST_STUDYATK_USEARMOR:string="studyatk.usearmor";
	

	/**
	 * 副本 获取基本信息
	 */
	export const REQUEST_DAILYBOSS_GET:string="dailyboss.get";

	/**
	 * 副本 购买商店信息
	 */
	export const REQUEST_DAILYBOSS_BUY:string="dailyboss.buy";

	/**
	 * 获取副本排行榜
	 */
	export const REQUEST_DAILYBOSS_GETRANK:string="dailyboss.getrank";

	/**
	 * 获取副本具体详细信息
	 */
	export const REQUEST_DAILYBOSS_GETDETAILS:string="dailyboss.getdetails";

	/**
	 * 副本 攻击
	 */
	export const REQUEST_DAILYBOSS_ATTACK:string="dailyboss.attack";

	/**
	 * 副本 恢复攻击次数
	 */
	export const REQUEST_DAILYBOSS_RECOVER:string="dailyboss.recover";

	/**
	 * 副本 获取蛮王伤害排行榜
	 */
	export const REQUEST_DAILYBOSS_GETATTACKRANK:string="dailyboss.getattackrank";
	/**
	 * 副本 雁门关领取通关奖励
	 */
	export const REQUEST_DAILYBOSS_GETCLEARREWARD:string="dailyboss.getclearreward";

	/**
	 * 玩吧发送桌面奖励
	 */
	export const REQUEST_OTHERINFO_GETWBSENDREWARD:string="otherinfo.getwbsendreward";

	/**
	 * 玩吧每日分享奖励
	 */
	export const REQUEST_OTHERINFO_GETWBDAILYSHAREREWARD:string="otherinfo.getwbdailysharereward";

	/**
	 * 玩吧企鹅电竞奖励
	 */
	export const REQUEST_OTHERINFO_GETQQESREWARD:string="otherinfo.getqqesreward";

	/**
	 * 领取手机绑定奖励
	 */
	export const REQUEST_OTHERINFO_GETBINDREWARD:string = "otherinfo.getbindreward";
	/**
	 * 领取实名认证奖励
	 */
	export const REQUEST_OTHERINFO_GETAUTHOR3KREWARD:string = "otherinfo.getauthor3kreward";
	/**
	 * 修改形象
	 */
	export const REQUEST_USER_CHANGEPIC:string = "user.changepic";

	/**
	 * 分阶段引导记录
	 */
	export const REQUEST_USER_STEPGUILD:string = "user.stepguild";
	/**
	 * 征伐接口
	 */
	export const REQUEST_CONQUEST_INDEX:string = "conquest.index";
	export const REQUEST_CONQUEST_FIGHT:string = "conquest.fight";
	export const REQUEST_CONQUEST_RANK:string = "conquest.rank";
	export const REQUEST_CONQUEST_BATCHFIGHT:string = "conquest.batchfight";

	//"通商随机对手接口",
	//"通商战斗接口",
	//"通商排行榜接口",
	//"一键通商战斗接口",
	export const REQUEST_TRADE_INDEX:string = "trade.index";
	export const REQUEST_TRADE_FIGHT:string = "trade.fight";
	export const REQUEST_TRADE_RANK:string = "trade.rank";
	export const REQUEST_TRADE_BATCHFIGHT:string = "trade.batchfight";

	//玩吧领取糖果活动奖励
	export const REQUEST_OTHERINFO_GETCANDYREWARD:string = "otherinfo.getcandyreward";
	//疯狂游乐场关注领取奖励
	export const REQUEST_OTHERINFO_GETFKFOCUSREWARD:string = "otherinfo.getfkfocusreward";
	//疯狂游乐场分享成功
	export const REQUEST_OTHERINFO_FKSHARE:string = "otherinfo.fkshare";
	//疯狂游乐场领取分享奖励
	export const REQUEST_OTHERINFO_GETFKSHAREREWARD:string = "otherinfo.getfksharereward";

	//获取玩吧积分奖励
	export const REQUEST_OTHERINFO_GETWBSCOREREWARD:string = "otherinfo.getwbscorereward";

	//新手引导步骤记录
	export const REQUEST_USER_NEWERGUILD:string = "user.newerguild";
	//记录门客排序id
	export const REQUEST_OTHER_RECORDSERVANTSORT:string = "otherinfo.recordservantsort";
	//记录红颜排序id
	export const REQUEST_OTHER_RECORDWIIFESORT:string = "otherinfo.recordwifesort";
	
	//宫廷裁缝抽奖,兑换皮肤
	export const REQUEST_OTHER_ACTIVITY_USETAILOR:string = "activity.usetailor";
	export const REQUEST_OTHER_ACTIVITY_USETENTAILOR:string = "activity.usetentailor";
	export const REQUEST_OTHER_ACTIVITY_EXCHANGE_SKIN:string = "activity.exchangeskin";

	//红颜装配皮肤
	export const REQUEST_WIFE_EQUIP:string = "wife.equip";
	export const REQUEST_WIFE_READSKINRED:string = "wife.readskinred";

	/**
	 * 跨服领取活动奖励
	 */
	export const REQUEST_ATKRACEG_WINZIDREWARD:string = "atkraceg.winzidreward";
	export const REQUEST_NEWATKRACEG_WINZIDREWARD:string = "atkracegnew.winzidreward";
	
	/**
	 * 邀请好友领取人数奖励接口
	 */
	export const REQUEST_INVITE_GETINVITEREWARD:string = "invite.getinvitereward";
	
	/**
	 * 邀请好友领取权势奖励接口
	 */
	export const REQUEST_INVITE_GETPOWERREWARD:string = "invite.getpowerreward";
	/**
	 * 邀请好友领取充值奖励接口
	 */
	export const REQUEST_INVITE_GETRECHARGEREWARD:string = "invite.getrechargereward";
	/**
	 * 邀请好友,获取数据
	 */
	export const REQUEST_INVITE_GETINFO:string = "invite.getinfo";

	//聊天屏蔽
	export const REQUEST_CHAT_LIST:string = "chat.list";
	export const REQUEST_CHAT_BLOCK:string = "chat.block";
	export const REQUEST_CHAT_UNBLOCK:string = "chat.unblock";

	export const REQUEST_ACTIVITY_EXCHANGEWIFE:string="activity.exchangewife";
	export const REQUEST_USER_GETKFMSG:string="user.getkfmsg";
	export const REQUEST_USER_GETKFCARDMSG:string="user.getkfcardmsg";

	export const REQUEST_PALACE_GETCROSSPALACE:string="palace.getcrosspalace";
	export const REQUEST_PALACE_GETPALACERANK:string="palace.getpalacerank";

	//称帝
	export const REQUEST_PRESTIGE_INDEX:string = "prestige.index";
	export const REQUEST_PRESTIGE_UP:string = "prestige.up";

	/**
	 * 设置cover成功
	 */
	export const REQUEST_OTHERINFO_SETCOVER:string = "otherinfo.setcover";
	/**
	 * 领取cover奖励
	 */
	export const REQUEST_OTHERINFO_GETCOVERREWARD:string = "otherinfo.getcoverreward";
	/**
	 * 领取绑定有礼奖励
	 */
	export const REQUEST_OTHERINFO_GETGTFBREWARD:string = "otherinfo.getgtfbreward";
	/*
	 *五一活动
	 */
	export const REQUEST_ACTIVITY_GETMAYDAYITEMA : string = "activity.getmaydayitema";//"五一转盘领取次数奖励"
	export const REQUEST_ACTIVITY_GETMAYDAYITEMB : string = "activity.getmaydayitemb";//"五一转盘充值奖励"
	export const REQUEST_ACTIVITY_GETMAYDAYITEMC : string = "activity.getmaydayitemc";//"五一转盘任务奖励"
	export const REQUEST_ACTIVITY_GETMAYDAYRANK : string = "activity.getmaydayrank";//五一转盘排行榜
	export const REQUEST_ACTIVITY_GETMAYDAYLOTTERY : string = "activity.getmaydaylottery";//五一转盘抽奖

	export const REQUEST_ACTIVITY_GETLOTTERYREWARD : string = "activity.getlotteryreward"; //

	

	/**
	 * 修身
	 */
	export const REQUEST_REQUEST_INDEX :string="practice.index";
	export const REQUEST_REQUEST_UPGRADE :string="practice.upgrade";
	export const REQUEST_REQUEST_UNLOCK :string="practice.unlock";
	export const REQUEST_REQUEST_COLLECT :string="practice.collect";
	export const REQUEST_PRACTICE_UPSTORAGE :string="practice.upstorage";
	/**
	 * 册封
	 */
	export const REQUEST_WIFESTATUS_CONFER :string="wifestatus.confer";
	export const REQUEST_WIFESTATUS_AUTOCONFER :string="wifestatus.autoconfer";

	/*
	 *跨服亲密
	 */
	export const REQUEST_ACTIVITY_CROSSIMACY_PRANK : string = "imacy.prank";//个人排行
	export const REQUEST_ACTIVITY_CROSSIMACY_ZRANK : string = "imacy.zrank";//跨服区排行
	export const REQUEST_ACTIVITY_CROSSIMACY_AWARD : string = "imacy.winzidreward";//跨服区排行
	export const REQUEST_ACTIVITY_GERACTIVITYIMACY : string = "imacy.getactivityimacy";
	export const REQUEST_ACTIVITY_CROSSIMACY_GETTASKREWARD:string="imacy.gettaskrewards";//任务奖励
	export const REQUEST_ACTIVITY_CROSSIMACY_USEFLAG:string="imacy.usewarflag";//使用玉莲
	export const REQUEST_ACTIVITY_CROSSIMACY_GETFLAGREWARD:string="imacy.getwarflagscore";//领取人气币
	export const REQUEST_ACTIVITY_CROSSIMACY_SHOPBUY:string="imacy.shopbuy";//商店购买
	export const REQUEST_ACTIVITY_CROSSIMACY_FLAGRANK:string="imacy.getwarflagrank";//人气排行
	export const REQUEST_ACTIVITY_CROSSIMACY_EXCHANGE:string="imacy.exchange";//兑换
	export const REQUEST_ACTIVITY_CROSSIMACY_SHOP2EXCHANGE:string="imacy.shop2exchange";//道具兑换

	export const REQUEST_REQUEST_BUY :string="practice.buy";

	/*
	 *称帝战
	 */
	export const REQUEST_EMPEROR_GETACTIVE : string = "emperor.getactive";//活动信息
	export const REQUEST_EMPEROR_BMLIST : string = "emperor.bmlist";//报名册信息
	export const REQUEST_EMPEROR_GETMODEL : string = "emperor.getmodel";//活动数据
	export const REQUEST_EMPEROR_BM : string = "emperor.bm";//报名信息
	export const REQUEST_EMPEROR_CHEER : string = "emperor.cheer";//助威
	export const REQUEST_EMPEROR_SETPOS : string = "emperor.setpos";//设置门客
	export const REQUEST_EMPEROR_GETFIGHTLOG : string = "emperor.getfightlog";//战斗日志
	export const REQUEST_EMPEROR_BUY : string = "emperor.buy";//称帝战商城购

	/*
	 *分封
	 */
	export const REQUEST_MODEL_PROMOTE : string = "promote";//获取model
	export const REQUEST_PROMOTE_INDEX : string = "promote.index";//获取军机处列表
	export const REQUEST_PROMOTE_GETLIST : string = "promote.getlist";//获取可分封的列表信息
	export const REQUEST_PROMOTE_APPOINT: string = "promote.appoint";//分封大臣
	export const REQUEST_PROMOTE_CANCEL: string = "promote.cancel";// "解除分封",

	export const REQUEST_JD618_GETREWARD:string="otherinfo.getjdreward";


	/**
	 * 金銮殿相关
	 */
	export const REQUEST_POLICY_INDEX:string = "policy.index";
	export const REQUEST_POLICY_SETSIGN:string = "policy.setsign"; //"设置话语",
	export const REQUEST_POLICY_ZANGD:string = "policy.zangd";  // "赞新政令",
	export const REQUEST_POLICY_SETREAD:string = "policy.setread";// "新国策/政令已读", 参数 dtype 1国策 2政令
	export const REQUEST_POLICY_SETSP:string = "policy.setsp"; //"设置国策", --参数 spid 国策id
	export const REQUEST_POLICY_SETGD:string = "policy.setgd";  //"设置政令", --参数 gdid 政令id gdtype 政令类型
	export const REQUEST_POLICY_REFRESHGD:string = "policy.refreshgd"; //"刷新政令",

	/**
	 * 端午节相关
	 */
	export const REQUEST_ACTIVITY_DRAGONINFO:string = "activity.getdragoninfo";
	export const REQUEST_ACTIVITY_DBJINDU:string = "activity.getdragonitema";
	export const REQUEST_ACTIVITY_DBTASK:string = "activity.getdragonitemc";
	export const REQUEST_ACTIVITY_DBRECHARGE:string = "activity.getdragonitemb";
	export const REQUEST_ACTIVITY_DBSHOPBUY:string = "activity.buydragonshop";
	export const REQUEST_ACTIVITY_DBRANK:string = "activity.getdragonrank";

	/*
	 *跨服权势
	 */
	export const REQUEST_ACTIVITY_CROSSPOWER_PRANK : string = "power.prank";//个人排行
	export const REQUEST_ACTIVITY_CROSSPOWER_ZRANK : string = "power.zrank";//跨服区排行
	export const REQUEST_ACTIVITY_CROSSPOWER_AWARD : string = "power.winzidreward";//跨服区排行
	export const REQUEST_ACTIVITY_GERACTIVITYPOWER : string = "power.getactivitypower";
	export const REQUEST_ACTIVITY_ATKRACEGRANK : string = "atkraceg.rankbyzid";
	export const REQUEST_ACTIVITY_NEWATKRACEGRANK : string = "atkracegnew.rankbyzid";
	export const REQUEST_ACTIVITY_IMACYRANK : string = "imacy.rankbyzid";
	export const REQUEST_ACTIVITY_POWERRANK : string = "power.rankbyzid";
	export const REQUEST_ACTIVITY_CROSSPOWER_GETTASKREWARD:string="power.gettaskrewards";//任务奖励
	export const REQUEST_ACTIVITY_CROSSPOWER_USEFLAG:string="power.usewarflag";//使用战旗
	export const REQUEST_ACTIVITY_CROSSPOWER_GETFLAGREWARD:string="power.getwarflagscore";//领取人气币
	export const REQUEST_ACTIVITY_CROSSPOWER_SHOPBUY:string="power.shopbuy";//商店购买
	export const REQUEST_ACTIVITY_CROSSPOWER_FLAGRANK:string="power.getwarflagrank";//人气排行
	export const REQUEST_ACTIVITY_CROSSPOWER_EXCHANGE:string="power.exchange";//兑换
	export const REQUEST_ACTIVITY_CROSSPOWER_SHOP2EXCHANGE:string="power.shop2exchange";//道具兑换

	export const REQUEST_ACTIVITY_CROSSPOWER_GETSOLIDERREWARD:string="power.getsoliderreward";//点兵遣将
	export const REQUEST_ACTIVITY_CROSSPOWER_GETGOLDREWARD:string="power.getgoldreward";//权势政令

	// 分享引导
	export const REQUEST_GETSHAREGUIDE : string = "user.getshareguide";//获取引导文案
	export const REQUEST_GETSHAREGUIDEREWARD : string = "otherinfo.getshareguidereward";//领取分享奖励
	export const REQUEST_STATSUPDATESHAREDATA : string = "stats.updatesharedata";//更新情景分享数据
	export const REQUEST_SHAREADDCOPYSHARENUM : string = "share.addcopysharenum";//更新情景分享数据

	/**
	 * 限时礼包 取消强弹标识
	 */
	export const REQUEST_SHOP_SHOW1COSTSCENEGIFT: string = "shop.show1costscenegift";

	//玩一玩 企鹅电竞图标点击计数器
	export const REQUEST_STATS_CLICKWYWICON : string = "stats.clickwywicon";


	/**
	 * 黄忠活动
	 */
	export const REQUEST_ACTIVITY_GETARCHERLOTTERY : string = "activity.getarcherlottery"; //黄忠活动抽奖
	export const REQUEST_ACTIVITY_GETARCHERITEAMA : string = "activity.getarcheritema"; //黄忠活动领取抽奖次数奖励
	export const REQUEST_ACTIVITY_GETARCHERITEAMB : string = "activity.getarcheritemb"; //黄忠活动领取充值奖励
	export const REQUEST_ACTIVITY_GETARCHERRANK:string = "activity.getarcherrank"; //黄忠活动排行榜

	/**
	 * 好友
	 */
	export const REQUEST_FRIEND_GETINFO :string = "friend.getinfo";//"获取好友信息", 返回 friendList
	export const REQUEST_FRIEND_GETRECONMEND :string = "friend.getrecommend";// "获取推荐玩家信息", 返回 commendList
	export const REQUEST_FRIEND_APPLY :string = "friend.apply" ;//"申请成为好友",
	export const REQUEST_FRIEND_APPLYLIST :string = "friend.applylist";//"获取申请列表", 返回 applyList
	export const REQUEST_FRIEND_ACCEPT :string = "friend.accept";// "接受好友申请",
	export const REQUEST_FRIEND_REFUSE :string = "friend.refuse";// "拒绝／忽略好友申请",
	export const REQUEST_FRIEND_SENDGIFT :string = "friend.sendgift";//  "发送礼物",
	export const REQUEST_FRIEND_RECEIVEGIFT :string = "friend.receivegift";//"接受礼物", 参数 backsend 是否回赠
	export const REQUEST_FRIEND_RECEIVELIST :string = "friend.receivelist";//"被申请列表", 参数 backsend 是否回赠

	export const REQUEST_FRIEND_FIND :string = "friend.find";// --参数 fuid 查找的用户ID 返回 commendList
	export const REQUEST_FRIEND_CANCELAPPLY :string = "friend.cancelapply";//"取消申请成为好友",
	export const REQUEST_FRIEND_SENDALL :string = "friend.sendall";//键赠送礼物",
	export const REQUEST_FRIEND_RECEIVEALL:string = "friend.receiveall";//"接受全部礼物并回赠",
	export const REQUEST_FRIEND_UNFRIEND:string = "friend.unfriend";//"接受全部礼物并回赠",
	export const REQUEST_FRIEND_REFUSEALL:string = "friend.refuseall";//"全部拒绝",
	export const REQUEST_FRIEND_ACCEPTALL:string = "friend.acceptall";//"全部拒绝",

	/**
	 * 世界别活动
	 */
	export const REQUEST_ACTIVITY_WORLDCUPINFO : string = "activity.worldcupinfo";
	export const REQUEST_ACTIVITY_WORLDCUPVOTE : string = "activity.worldcupvote"; 
	export const REQUEST_ACTIVITY_WORLDCUPBUY : string = "activity.worldcupbuy"; 
	export const REQUEST_ACTIVITY_WORLDCUPUSE:string = "activity.worldcupuse"; 

	/**
	 * 私聊
	 */
	export const REQUEST_PRICHAT_GETMSG : string = "privatechat.getmsg";
	export const REQUEST_PRICHAT_SENDMSG : string = "privatechat.sendmsg";
	export const REQUEST_PRICHAT_SETREAD : string = "privatechat.setisread";
	export const REQUEST_PRICHAT_PUSHMSG : string = "push.msg";

	
	//赵云活动
	/** 赵云活动抽奖 */
	export const REQUEST_ACTIVITY_GETMAZELOTTERY:string = "activity.getmazelottery";
	/** 赵云活动领取任务奖励 */
	export const REQUEST_ACTIVITY_GETMAZEITEMB:string = "activity.getmazeitemb";
	/** 赵云活动领取充值奖励 */
	export const REQUEST_ACTIVITY_GETMAZEITEMC:string = "activity.getmazeitemc";
	/** 赵云活动排行榜 */
	export const REQUEST_ACTIVITY_GETMAZERANK:string = "activity.getmazerank";
	/**
	 * 跨服聊天
	*/
	export const REQUEST_CROSSCHAT_SENDMSG : string = "crosschat.sendmsg";//跨服聊天发送消息
	export const REQUEST_CROSSCHAT_GETMSG : string = "crosschat.getmsg";//跨服聊天获取消息
	/**
	 * 亲家消息
	*/
	export const REQUEST_SADUN_GETINFO : string = "sadun.getinfo";//亲家消息
	export const REQUEST_SADUN_VISIT : string = "sadun.visit";//拜访请求
	export const REQUEST_SADUN_CANCELVISIT : string = "sadun.cancelvisit";//取消拜访
	export const REQUEST_SADUN_REFUSEVISIT : string = "sadun.refusevisit";//拒绝拜访 参数 fchildId , fuid
	export const REQUEST_SADUN_AGREEVISIT : string = "sadun.agreevisit";//同意拜访 参数 childId , fuid，wifeId
	export const REQUEST_SADUN_GETVISITME : string = "sadun.getvisitedme";// 参数  aquality，sex
	export const REQUEST_SADUN_GETFRIENDLISTINFO : string = "sadun.getfriendlistinfo";
	export const REQUEST_SADUN_READCALLBACK : string = "sadun.readcallback"
	
	/**
	 * 帮会任务
	 */
	export const REQUEST_ALLIANCETASK_FIGHT : string = "alliancetask.fight";
	export const REQUEST_ALLIANCETASK_EXTRA : string = "alliancetask.extra";
	export const REQUEST_ALLIANCETASK_BUFF : string = "alliancetask.buff";
	export const REQUEST_ALLIANCETASK_REWARD : string = "alliancetask.reward";
	export const REQUEST_ALLIANCETASK_RANK : string = "alliancetask.rank";
	export const REQUEST_ALLIANCETASK_INIT : string = "alliancetask.initalliancetask";


	/**
	 * 微信平台分享内容
	 */
	export const REQUEST_USER_GETWXSHARE : string = "user.getwxshare";

	/**
	 * 微信平台分享领取奖励
	 * 
	 */
	export const REQUEST_OTHERINFO_GETWXSHAREREWARD : string = "otherinfo.getwxsharereward";
	
	/**
	 * 微信平台分享次数
	 */
	export const REQUEST_OTHERINFO_SETSHARENUM: string = "otherinfo.setsharenum";

	//fq游戏攻略
	/**
	 * 获得F&Q游戏攻略
	 */
	export const REQUST_FAQ_GETFAQCONTENT:string = "faq.getfaqcontent";

	/**
	 * 分享成功的接口
	 */
	export const REQUST_OTHERINFO_GETGENERALSHARE:string = "otherinfo.getgeneralshare";


	/**
	 * 七夕灯会
	 */
	export const REQUST_DOUBLESEVEN_GETREWARD:string = "activity.getdoubleSeventhitema";

	/**
	 * 玩吧积分礼包
	 */
	export const REQUST_USER_GETRETURNREWARD:string = "user.getreturnreward";

	/**
	 * 谷歌推送
	 */
	export const REQUST_USER_SETPUSHTOKEN:string = "user.setpushtoken";
	/**
	 * 实名 领奖
	 */
	export const REQUST_USER_GETREALNAMEREWARDS:string = "user.getrealnamerewards";

	
	/**
	 * 议事院信息
	 */
	export const REQUST_COUNCIL_GETEVENTINFO:string = "council.geteventinfo";
	export const REQUST_COUNCIL_GETEVENTDETAIL:string = "council.getdetailinfo";
	export const REQUST_COUNCIL_JOINEVENT:string = "council.joincouncil";
	export const REQUST_COUNCIL_GETRANK:string = "council.getrank";
	export const REQUST_COUNCIL_GETREWARD:string = "council.getrewards";

	/**
	 * [百服活动]充值返利  领取奖励
	 */
	export const REQUST_ACTIVITY_GETRECHARGEBOXREWARD:string = "activity.getrechargeboxreward";
 
	/**
	 * 门客擂台信息
	 */
	export const REQUST_SERVANTPK_GETINFO:string = "servantpk.getactivity";//获取活动信息
	export const REQUST_SERVANTPK_GO:string = "servantpk.go";//支援
	export const REQUST_SERVANTPK_RANK:string = "servantpk.rank";
	export const REQUST_SERVANTPK_GETPREWARD:string = "servantpk.preward";//个人领奖
	export const REQUST_SERVANTPK_GETZREWARD:string = "servantpk.zreward";//总领奖
	
	/**
	 * 皮肤修改
	 */
	export const REQUST_CROSSSKIN_GETSKINRANK :string = "crossskin.getskinrank";
	export const REQUST_CROSSSKIN_GETSKINFIRST :string = "crossskin.getskinfirst";
	export const REQUST_CROSSSKIN_USERSKINSHOT :string = "crossskin.userskinshot";

	/**
	 * 中秋活动抽奖
	 */
	export const ACTIVITY_GETMIDAUTUMNLOTTERY:string = "activity.getmidAutumnlottery";
	/**
	 * 中秋活动领取次数奖励
	 */
	export const ACTIVITY_GETMIDAUTUMNITEMA:string = "activity.getmidAutumnitema";
	/**
	 * 中秋活动任务奖励
	 */
	export const ACTIVITY_GETMIDAUTUMNITEMB:string = "activity.getmidAutumnitemb";
	/**
	 * 中秋活动充值奖励
	 */
	export const ACTIVITY_GETMIDAUTUMNITEMC:string = "activity.getmidAutumnitemc";

	/**
	 * 回归 签到奖励
	 */
	export const REBACK_GETSIGNREWARD:string = "reback.getlogin";
	/**
	 * 回归 充值奖励
	 */
	export const REBACK_GETRECHARGEREWARD:string = "reback.getrecharge";
	/**
	 * 回归 任务奖励
	 */
	export const REBACK_GETTASKREWARD:string = "reback.gettask";

	

	/**
	 * 小额礼包
	 */
	export const REQUEST_ACTIVITY_GETFREEDAILYGIFT : string = "activity.getfreedailygift";
	/**
	 * 活动红点已读
	 */
	export const REQUEST_ACTIVITY_READACTIVE : string = "activity.readactive";

	/*
	* 鳌拜活动 商店购买、积分兑换
	*/
	export const REQUEST_ACTIVITY_WIPEBOSSSHOPBUY : string = "activity.wipebossshopbuy";
	export const REQUEST_ACTIVITY_WIPEBOSSSEARCH : string = "activity.wipebosssearch";
	export const REQUEST_ACTIVITY_WIPEBOSSATTACK : string = "activity.wipebossattack";
	export const REQUEST_ACTIVITY_WIPEBOSSBUYSEARCH : string = "activity.wipebossbuysearch";
	export const REQUEST_ACTIVITY_WIPEBOSSGETBOSSHP: string = "activity.wipebossgetbosshp";
	export const REQUEST_ACTIVITY_WIPEBOSSGETRANK: string = "activity.wipebossgetrank";
	export const REQUEST_ACTIVITY_WIPEBOSSGETBOSSNUM: string = "activity.wipebossgetbossnum";
	export const REQUEST_ACTIVITY_WIPEBOSSRECOVER : string = "activity.wipebossrecoverservant";
	export const REQUEST_ACTIVITY_WIPEBOSSENEMY : string = "activity.wipebossenemy";
	export const REQUEST_ACTIVITY_WIPEBOSSKILLLOG : string = "activity.wipebossgetkilllog";

	/**
	 * 更换场景
	 */
	export const REQYEST_OTHERINFO_SWITCHSCENESKIN:string="otherinfo.switchsceneskin";
	export const REQYEST_OTHERINFO_BUYSCENESKIN:string="otherinfo.buysceneskin";

	/**
	 * 推送设置
	 */
	export const REQYEST_OTHERINFO_SETPUSHFLAG:string="otherinfo.setpushflag";

	/**
	 * 皇帝上线通报
	 */
	export const REQYEST_OTHER_INFO_BANEMMSG:string="otherinfo.banemmsg";
	export const REQYEST_ACTIVITY_DAILY_CHECKRED:string="activity.dailyactivityclickredpoint";

	/**
	 * 活动公告今日不再提示
	 */
	export const REQYEST_OTHER_INFO_SETACTIVITYPOP:string="otherinfo.setactivitypop";

	// -----帮会战相关 接口
	/**
	 * 获取帮会战 model
	 */
	export const REQYEST_ALLIANCEWAR_GETMYALLIANCEINFO:string = "alliancewar.getmyallianceinfo";

	/**
	 * 派遣门客的接口
	 */
	export const REQYEST_ALLIANCEWAR_SELECTSERVANT:string = "alliancewar.selectservant";

	/**
	 * 撤回派遣门客的接口
	 */
	export const REQYEST_ALLIANCEWAR_CANCELSERVANT:string = "alliancewar.cancelservant";

	/**
	 * 使用计策
	 */
	export const REQYEST_ALLIANCEWAR_SELECTSTRATAGEM:string = "alliancewar.selectstratagem";
	/**
	 * 帮会战 --排行榜
	 */
	export const REQYEST_ALLIANCEWAR_GETRANK:string = "alliancewar.getrank";
	/**
	 * 帮会战  log
	 */
	export const REQYEST_ALLIANCEWAR_GETWARLOG:string = "alliancewar.getwarlog";
	
	/**
	 * 帮会战 --排行榜
	 */
	export const REQUEST_ALLIANCEWAR_GETDETAIL:string = "alliancewar.getwardetail";

	/**
	 * 帮会战 -- 奖励
	 */
	export const REQUEST_ALLIANCEWAR_GETREWARDS:string = "alliancewar.getrewards";
	
 		/** 
	 * 双十一活动 获取红包
	*/
	export const REQUEST_SINGLEDAY_GETREDPT:string = "activity.getsingledayredpt";

	/**
	 * 双 11 领取奖励相关
	 */
	export const REQYEST_ACTIVITY_GET_SINGLE_DAY_REWARD:string="activity.getsingledayreward";

	/**
	 * 双 11 购买商店物品
	 */
	export const REQYEST_ACTIVITY_SINGLEDAY_BUYSHOP:string="activity.buysingledayshop";


	/**
	 * 港台一周年 黑市购买道具
	 */
	export const REQYEST_ACTIVITY_BLACKMARKET:string="activity.buytwblackmarket";

	
	

	/**
	 * 双 11 排行榜相关
	 */
	export const REQYEST_ACTIVITY_GET_SINGLE_DAY_RANK:string="activity.getsingledayrank";

	export const REQYEST_ACTIVITY_BUYSINGLEDAYSHOP:string="activity.buysingledayshop";

	/**
	 * 门客兑换碎片接口
	 */
	export const REQYEST_SERVANTPK_EXCHANGESERVANTSKIN:string="servantpk.exchangeservantskin";

	/**
	 *兑换秦始皇 
	 */
	export const REQUEST_EMPEROR_EXCHANGESERVANT:string="emperor.exchangeservant";

	/*
	*	福袋活动
	*/
	//福袋抽奖活动抽奖
	export const REQUEST_ACTIVITY_GETLUCKBAGLOTTERY : string = "activity.getluckbaglottery";
	//福袋抽奖活动领取奖励
	export const REQUEST_ACTIVITY_GETLUCKBAGREWARD : string = "activity.getluckbagreward";
	//众筹获取宝箱奖励
	export const REQUEST_ACTIVITY_LOTTERYNUMREWARD: string = "activity.lotterynumreward";
	//众筹抽奖
	export const REQUEST_ACTIVITY_LOTTERYJOIN: string = "activity.lotteryjoin";
	//众筹获取初始信息
	export const REQUEST_ACTIVITY_LOTTERYINFO: string = "activity.lotteryinfo";

	//众筹获得中奖名单
	export const REQUEST_ACTIVITY_LOTTERYWININFO: string = "activity.lotterywininfo";
	//门客战的model信息
	export const REQUEST_COUNTRYWAY_GETMODEL : string = "countrywar.getinfo";
	/**派遣门客 */
	export const REQUEST_COUNTRYWAY_SELECTSERVANT : string = "countrywar.selectservant";
	/**撤回派遣门客 */
	export const REQUEST_COUNTRYWAY_CANCELSERVANT : string = "countrywar.cancelservant";
	/**选择计策 */
	export const REQUEST_COUNTRYWAY_SELECTSTRATAGEM : string = "countrywar.selectstratagem";
	/**公告*/
	export const  REQUEST_COUNTRYWAY_UPDATEANNOUNCE : string = "countrywar.updateannounce";
	/**购买计策 */
	export const REQUEST_COUNTRYWAY_BUYSTRATAGEM : string = "countrywar.buystratagem";
	/**战斗信息 */
	export const REQUEST_COUNTRYWAY_WARDETAIL : string = "countrywar.getwardetail";
	/**个人排行 */
	export const REQUEST_COUNTRYWAY_GETDPSRANK : string = "countrywar.getdpsrank";
	/**区服排行 */
	export const REQUEST_COUNTRYWAY_GETZIDRANK : string = "countrywar.getzidrank";
	/**领取奖励 */
	export const REQUEST_COUNTRYWAY_GETREWAEDS : string = "countrywar.getrewards";
	

	//领取帮会冲榜奖励
	export const REQUEST_ACTIVITY_GETALLICHARGECOUNTREWARD : string = "activity.getallichargecountreward";

	//领取帮会冲榜奖励
	export const REQUEST_ACTIVITY_GETALLICHARGETOTALREWARD : string = "activity.getallichargetotalreward";
	//刷model
	export const REQUEST_ACTIVITY_GETALLICHARGECOUNTINFO : string = "activity.getallichargecountinfo";

	//累计充值奖励
	export const REQUEST_ACTIVITY_GETALLICHARGETOTALINFO : string = "activity.getallichargetotalinfo";

	

	/**
	 * [港台活动]钱庄领奖
	 */
	export const REQUST_ACTIVITY_GETTWBANKBOXREWARD:string = "activity.gettwbankboxreward";
	/**
	 * 门客皮肤光环
	 */
	export const REQUST_SERVANT_UPSKINAURA:string = "servant.upskinaura";
	/**
	 * 圣诞抽奖
	 */
	export const REQUST_ACTIVITY_CHRISTMASLOTTERY:string = "activity.christmaslottery";
	/**
	 * 圣诞任务领奖
	 */
	export const REQUST_ACTIVITY_CHRISTMASTASKREWARD:string = "activity.christmastaskreward";
	/**
	 *圣诞统计
	 */
	export const REQUST_ACTIVITY_CHRISTMASCLICKICON:string = "activity.christmasclickicon";
	/*
	*赌坊
	*/
	export const REQUST_ACTIVITY_GAMBLELOG:string = "activity.gettwgamblelog";
	export const REQUST_ACTIVITY_GAMBLEREWARD:string = "activity.gettwgamblereward";
	export const REQUST_ACTIVITY_GAMBLEGETWINREWARD:string = "activity.gettwgamblewinreward";

	/**客栈 */
	/**抽奖 */
	export const REQUST_ACTIVITY_GETTWHOTELLTTTERY:string = "activity.gettwhotellottery";
	/**领取宝箱奖励 */
	export const REQUST_ACTIVITY_GETTWHOTELITEMA:string = "activity.gettwhotelitema";
	/**领取任务奖励 */
	export const REQUST_ACTIVITY_GETTWHOTELITEMB:string = "activity.gettwhotelitemb";
	/**领取充值奖励 */
	export const REQUST_ACTIVITY_GETTWHOTELITEMC:string = "activity.gettwhotelitemc";

	//比武招亲
	/**打npc */
	export const REQUST_ACTIVITY_GETTWMARRYITEM:string = "activity.buytwmarryitem";
	/**领取宝箱奖励 */
	export const REQUST_ACTIVITY_GETTWMARRYREWARDS:string = "activity.gettwmarryrewards";
	/**是否第一次登陆比武招亲 */
	export const REQUST_ACTIVITY_GETTWINITMARRYFLAG:string = "activity.gettwinitmarryflag";

	//云顶龙窟
	/**云顶龙窟--打npc */
	export const REQUST_ACTIVITY_YUNDINGLONGKUBUYITEM:string = "activity.yundinglongkubuyitem";
	/**云顶龙窟--领取宝箱奖励 */
	export const REQUST_ACTIVITY_YUNDINGLONGKUGETREWARDS:string = "activity.yundinglongkugetrewards";
	/**云顶龙窟--是否第一次登陆 */
	export const REQUST_ACTIVITY_YUNDINGLONGKUGETINITFLAG:string = "activity.yundinglongkugetinitflag";

	//电玩大本营
	/**电玩大本营-- recive charge reward */
	export const REQUST_ACTIVITY_ARCADEGETCHARGE:string = "activity.arcadegetcharge";

	/**电玩大本营--recive task reward */
	export const REQUST_ACTIVITY_ARCADEGETTASKRWD:string = "activity.arcadegettaskrwd";

	/**电玩大本营--积分兑换 */
	export const REQUST_ACTIVITY_ARCADESHOPBUY:string = "activity.arcadeshopbuy";

	/**电玩大本营--抽奖 */
	export const REQUST_ACTIVITY_ARCADELOTTERY:string = "activity.arcadelottery";

	/**电玩大本营--日志 */
	export const REQUST_ACTIVITY_ARCADEGETLOGS:string = "activity.arcadegetlogs";
	
	/**元旦活动 */
	export const REQUST_ACTIVITY_TREASUREBOXPLAY:string = "activity.treasurehuntroll"; 

	/**元旦任务 */
	export const REQUST_ACTIVITY_TREASUREHUNTGETTASKREWARDS:string = "activity.treasurehuntgettaskrewards";
 
	export const REQUST_ACTIVITY_TREASURECIRCLERERWARD:string = "activity.treasurehuntcirclerewards";

	//京城夜赏
	export const REQUST_ACTIVITY_ENJOYNIGHTGETRECHARGERWD:string = "activity.enjoynightgetrechargerwd";
	export const REQUST_ACTIVITY_ENJOYNIGHTROLL:string = "activity.enjoynightroll";
	export const REQUST_ACTIVITY_ENJOYNIGHTPLAY:string = "activity.enjoynightplay";
	export const REQUST_ACTIVITY_ENJOYNIGHTACHIEVEMENT:string = "activity.enjoynightachievement";
	export const REQUST_ACTIVITY_ENJOYNIGHTEXCHANGE:string = "activity.enjoynightexchange";
	export const REQUST_ACTIVITY_ENJOYNIGHTGETTASK:string = "activity.enjoynightgettask";

	//周年庆典 京城夜赏2
	export const REQUST_ACTIVITY_ANNUALCELEBRATION2020GETTASK:string = "activity.annualCelebration2020gettask";
	export const REQUST_ACTIVITY_ANNUALCELEBRATION2020ROLL:string = "activity.annualCelebration2020roll";
	export const REQUST_ACTIVITY_ANNUALCELEBRATION2020CIRCLE:string = "activity.annualCelebration2020circle";


	export const REQUST_ACTIVITY_GETDOUBLESEVENTHEXCHANGE:string = "activity.getdoubleSeventhexchange";

	//除夕
	/**领取除夕七天送登录奖励 */
	export const REQUST_ACTIVITY_GETNEWYEARSIGNUPREWARD:string = "activity.getnewyearsignupreward";
	/**领取除夕七天送登录孔明灯 */
	export const REQUST_ACTIVITY_GETNEWYEARSIGNUPBALLON:string = "activity.getnewyearsignupballon";
	/**领取除夕七天送特殊奖励 */
	export const REQUST_ACTIVITY_GETNEWYEARSIGNUPALLREWARD:string = "activity.getnewyearsignupallreward";

	//财神驾到
	/**拜财神 */
	export const REQUST_ACTIVITY_GETWEATHLUCKYREWARD:string = "activity.getweathluckyreward";
	/**领取财神奖励 */
	export const REQUST_ACTIVITY_GETWEATHREWARD:string = "activity.getweathreward";
	/**财神驾到跑马灯 */
	export const REQUST_ACTIVITY_GETWEATHLUCKYLOG:string = "activity.getweathluckylog";
	/**爆竹迎新领取奖励*/
	export const REQUST_ACTIVITY_GETCRACKERREWARD:string = "activity.getnewyearcrackerchargerewards";
	/**爆竹迎新领取任务奖励*/
	export const REQUST_ACTIVITY_GETRACKERTASKREWARDS:string = "activity.getnewyearcrackertaskrewards";

	//马超活动
	/**抽奖*/
	export const REQUST_ACTIVITY_MACHAOLOTTERY:string = "activity.machaolottery";
	/**任务奖励*/
	export const REQUST_ACTIVITY_MACHAOGETITEMB:string = "activity.machaogetitemb";
	/**充值奖励*/
	export const REQUST_ACTIVITY_MACHAOGETITEMC:string = "activity.machaogetitemc";
	/**排行榜*/
	export const REQUST_ACTIVITY_MACHAOGETRANK:string = "activity.machaogetrank";
	/**绝地擂台*/
	export const REQUST_ACTIVITY_BATTLEGROUND:string = "battleground.getglobalinfo";
	export const REQUST_ACTIVITY_BATTLEGROUNDDETAIL:string = "battleground.getalliancedetail";
	export const REQUST_ACTIVITY_BATTLEGROUNDINDEX:string = "battleground.index";
	export const REQUST_ACTIVITY_BATTLEGROUND_FIGHT:string="battleground.fight";
	export const REQUST_ACTIVITY_BATTLEGROUND_ATTRLIST:string="battleground.attrlist";
	export const REQUST_ACTIVITY_BATTLEGROUND_ATTRBUY:string="battleground.attrbuy";
	export const REQUST_ACTIVITY_BATTLEGROUND_CHALLENGE:string="battleground.challenge";
	export const REQUST_ACTIVITY_BATTLEGROUND_KILL:string="battleground.kill";
	export const REQUST_ACTIVITY_BATTLEGROUND_RANDREWARD:string="battleground.randreward";
	export const REQUST_ACTIVITY_BATTLEGROUND_LIST:string="battleground.list";
	export const REQUST_ACTIVITY_BATTLEGROUND_REVENGE:string="battleground.revenge";
	export const REQUST_ACTIVITY_BATTLEGROUND_GETINFO:string="battleground.getinfo";
	export const REQUST_ACTIVITY_BATTLEGROUND_USEEXTRA:string="battleground.useextra";
	export const REQUST_ACTIVITY_BATTLEGROUND_ENERMY:string="battleground.getenemy";
	export const REQUST_ACTIVITY_BATTLEGROUND_AUTOFIGHT:string="battleground.batchfight";
	export const REQUST_ACTIVITY_BATTLEGROUND_HANDLE:string="battleground.handle";

	/**风华群芳*/
	export const REQUST_ACTIVITY_GROUPWIFEBATTLE:string = "groupwifebattle.getglobalinfo";
	export const REQUST_ACTIVITY_GROUPWIFEBATTLE_SEARCH:string = "groupwifebattle.search";
	export const REQUST_ACTIVITY_GROUPWIFEBATTLE_FIGHT:string = "groupwifebattle.fight";
	export const REQUST_ACTIVITY_GROUPWIFEBATTLE_GETRANK:string = "groupwifebattle.getrank";
	export const REQUST_ACTIVITY_GROUPWIFEBATTLE_CHEER:string = "groupwifebattle.cheer";
	export const REQUST_ACTIVITY_GROUPWIFEBATTLE_GETALNDETAIL:string = "groupwifebattle.getalliancedetail";
	export const REQUST_ACTIVITY_GROUPWIFEBATTLE_CHALLENGE:string = "groupwifebattle.challenge";
	export const REQUST_ACTIVITY_GROUPWIFEBATTLE_LIST:string = "groupwifebattle.list";
	export const REQUST_ACTIVITY_GROUPWIFEBATTLE_FIGHTREVIEW:string = "groupwifebattle.fightreview";
	export const REQUST_ACTIVITY_GROUPWIFEBATTLE_CRASHMODEL:string = "groupwifebattle.crashmodel";
	export const REQUST_ACTIVITY_GROUPWIFEBATTLE_PROTECT:string = "groupwifebattle.protect";
	export const REQUST_ACTIVITY_GROUPWIFEBATTLE_ENERMY:string="groupwifebattle.getenemy";
	export const REQUST_ACTIVITY_GROUPWIFEBATTLE_GETINFO:string="groupwifebattle.getinfo";


	/**
	 * 充值送门客皮肤道具 领奖
	 */
	export const REQUEST_ACTIVITY_GETSKINPACKAGEREWARD:string = "activity.getskinpackagereward";


	/**
	 * 绝地擂台排行榜
	 */
	export const REQUEST_BATTLEGROUND_GETANK:string = "battleground.getrank";
	//锦鲤活动
	/**锦鲤请求全服信息 */
	export const REQUEST_ACTIVITY_GETLUCKYCAINFO:string = "activity.getluckycarpinfo";
	/**锦鲤领取普通奖励 */
	export const REQUEST_ACTIVITY_GETLUCKYCARPREWARD:string = "activity.getluckycarpreward";
	//门客出海
	/**购买席位 */
	export const REQUEST_SERVANT_BUYBANISHPOS:string = "servant.buybanishpos";
	/**门客出海modle */
	export const REQUEST_SERVANT_GETSERVANTBANISHMODEL:string = "servant.getservantbanishmodel";
	/**门客出海接口 */
	export const REQUEST_SERVANT_BANISH:string = "servant.banish";
	export const REQUEST_SERVANT_BANISHBUFF:string = "servant.banishbuff";
	/**门客提前召回 */
	export const REQUEST_SERVANT_FINISH:string = "servant.finish";
	/**门客改变免战状态 */
	export const REQUEST_SERVANT_AVOID:string = "servant.avoid";
	/**门客免战红点 */
	export const REQUEST_SERVANT_AVOIDREDPOINT:string = "servant.avoidredpoint";
	/**门客名望升级 */
	export const REQUEST_SERVANT_FAMEUPGRADE:string = "servant.fameupgrade";
	

	//彩蛋活动
	/**获得奖励 */
	export const REQUEST_ACTIVITY_GETWEALTHCARPREWARD:string = "activity.getwealthcarpreward";
	/**彩蛋活动排行榜 */
	export const REQUEST_ACTIVITY_GETWEALTHCRAPINFO:string = "activity.getwealthcarpinfo";
	/**彩蛋活动中奖名单 */
	export const REQUEST_ACTIVITY_GETWEALTHCRAPLUCKYINFO:string = "activity.getwealthcarpluckyinfo";

	//七日好礼
	/**七日登陆及VIP奖励 */
	export const REQUEST_SEVENDAYSIGN_GETSEVENDAYSIGNREWARD:string = "sevendaysign.getsevendaysignreward";
	/**七日任务奖励 */
	export const REQUEST_SEVENDAYSIGN_GETSEVENDAYSIGNTASKREWARD:string = "sevendaysign.getsevendaysigntaskreward";
	/**七日model */
	export const REQUEST_SEVENDAYSIGN_GETSEVENDAYSIGNMODEL:string = "sevendaysign.getsevendaysignmodel";
	/**七日任务阅读奖励 */
	export const REQUEST_SEVENDAYSIGN_GETSIGN3REWARD:string = "sevendaysign.getsign3reward";

	/**幸运翻牌 */
	export const REQUEST_ACTIVITY_LUCKYDRAWLOTTERY:string = "activity.luckydrawlottery";
	export const REQUEST_ACTIVITY_LUCKYDRAWGETRECHARERWD:string = "activity.luckydrawgetrechargerwd";
	export const REQUEST_ACTIVITY_LUCKYDRAWGETACHIRWD:string = "activity.luckydrawgetachievementrwd";
	/**听雨轩制作 */
	export const REQUEST_SKIN_MAKE:string = "crossskin.buyskin";
	
	//修身技能升级
	export const PRACTICE_UPSKILLEXP:string = "practice.upskillexp"; 
	
	//跨服皇陵接口
	export const REQUEST_ACTIVITY_TOMBINFO : string = "tomb.getinfo"; 
	export const REQUEST_ACTIVITY_TOMBMAP : string = "tomb.getmap"; 
	export const REQUEST_ACTIVITY_TOMBDIG : string = "tomb.dig"; 
	export const REQUEST_ACTIVITY_TOMBATTACK : string = "tomb.attack"; 
	export const REQUEST_ACTIVITY_TOMBBOSSINFO : string = "tomb.getbosshp"; 
	export const REQUEST_ACTIVITY_TOMBBUYSEARCH : string = "tomb.buysearch";
	export const REQUEST_ACTIVITY_TOMBRECOVERSERVANT : string = "tomb.recoverservant";
	export const REQUEST_ACTIVITY_TOMBRANK : string = "tomb.getrank";
	export const REQUEST_ACTIVITY_TOMBSHOPBUY : string = "tomb.shopbuy";
	export const REQUEST_ACTIVITY_TOMBENERMY : string = "tomb.getenemy";
	//本服皇陵接口
	export const REQUEST_ACTIVITY_LOCTOMBINFO : string = "loctomb.getinfo"; 
	export const REQUEST_ACTIVITY_LOCTOMBMAP : string = "loctomb.getmap"; 
	export const REQUEST_ACTIVITY_LOCTOMBDIG : string = "loctomb.dig"; 
	export const REQUEST_ACTIVITY_LOCTOMBATTACK : string = "loctomb.attack"; 
	export const REQUEST_ACTIVITY_LOCTOMBBOSSINFO : string = "loctomb.getbosshp"; 
	export const REQUEST_ACTIVITY_LOCTOMBBUYSEARCH : string = "loctomb.buysearch";
	export const REQUEST_ACTIVITY_LOCTOMBRECOVERSERVANT : string = "loctomb.recoverservant";
	export const REQUEST_ACTIVITY_LOCTOMBRANK : string = "loctomb.getrank";
	export const REQUEST_ACTIVITY_LOCTOMBSHOPBUY : string = "loctomb.shopbuy";
	export const REQUEST_ACTIVITY_LOCTOMBENERMY : string = "loctomb.getenemy";


	//劳碌丰收接口
	export const REQUEST_ACTIVITY_LABORRECHARGE:string = "activity.getlabordayitemb"; 
	export const REQUEST_ACTIVITY_LABORTASK:string = "activity.getlabordayitemc"; 
	export const REQUEST_ACTIVITY_LABORSHOP:string = "activity.buylabordayshop"; 
	export const REQUEST_ACTIVITY_LABORRANK:string = "activity.getlabordayrank"; 
	export const REQUEST_ACTIVITY_LABORJINDU:string = "activity.getlabordayitema"; 
	export const REQUEST_ACTIVITY_LABORINFO:string = "activity.getlabordayinfo"; 

	//投壶活动接口
	/**抽奖 */
	export const REQUEST_ACTIVITY_THROWARROWLOTTERY:string = "activity.throwarrowlottery"; 
	/**次数奖励 领取奖励 */
	export const REQUEST_ACTIVITY_THROWARROWGETACHIEVEMENTRWD:string = "activity.throwarrowgetachievementrwd"; 
	/**充值奖励 领取奖励 */
	export const REQUEST_ACTIVITY_THROWARROWGETRECHARGERWD:string = "activity.throwarrowgetrechargerwd"; 
	/**log */
	export const REQUEST_ACTIVITY_THROWARROWGETLOGS:string = "activity.throwarrowgetlogs"; 

	//勤王除恶
	/**获取modle */
	export const REQYEST_ALLIANCEWEEK_GETWEEKDETAILS:string = "allianceweek.getweekdetails";
	/**攻击帮会周末boss */
	export const REQYEST_ALLIANCEWEEK_ATTACK:string = "allianceweek.attack"; 
	/**恢复某个门客攻击次数 */
	export const REQYEST_ALLIANCEWEEK_RECOVER:string = "allianceweek.recover"; 
	/**购买战斗buff */
	export const REQYEST_ALLIANCEWEEK_BUYBUFF:string = "allianceweek.buybuff"; 
	/**获取帮会周末积分奖励 */
	export const REQYEST_ALLIANCEWEEK_GETSCOREREWARD:string = "allianceweek.getscorereward";
	/**获取帮会周末击杀奖励 */
	export const REQYEST_ALLIANCEWEEK_GETKILLREWARD:string = "allianceweek.getkillreward"; 
	/**获取帮会贡献排行榜*/
	export const REQUEST_ALLIANCEWEEK_GETBOSSRANK:string="allianceweek.getbossrank";
	//花魁活动
	/**获取选手信息*/
	export const REQUEST_BEAUTYVOTE_GETINFO:string="beautyvote.getinfo";
	/**领取充值奖励 */
	export const REQUEST_BEAUTYVOTE_GETRECHARGERWD:string="beautyvote.getrechargerwd";
	/**献花 */
	export const REQUEST_BEAUTYVOTE_VOTE:string="beautyvote.vote";
	/**排行榜*/
	export const REQUEST_BEAUTYVOTE_GETRANK:string="beautyvote.getrank";
	/**购买鲜花*/
	export const REQUEST_BEAUTYVOTE_BUYFLOWERS:string="beautyvote.buyflowers";
	/**积分兑换*/
	export const REQUEST_BEAUTYVOTE_SHOPBUY:string="beautyvote.shopbuy";

	//诸葛亮传
	/**诸葛亮传-领取充值奖励*/
	export const REQUEST_ACTIVITY_GETLIANGCHARGE:string="activity.getliangcharge";
	/**诸葛亮传-使用七星灯*/
	export const REQUEST_ACTIVITY_USESEVENSTARLAMP:string="activity.usesevenstarlamp";
	/**诸葛亮传-领取进度奖励*/
	export const REQUEST_ACTIVITY_GETLIANGREWARDS:string="activity.getliangrewards";

	//筑阁祭天
	/**筑阁祭天-活动抽奖*/
	export const REQUEST_ACTIVITY_GETWORSHIPREWARDS:string="activity.getworshiprewards";
	/**筑阁祭天-领取累计充值奖励 */
	export const REQUEST_ACTIVITY_GETWORSHIPCHARGE:string="activity.getworshipcharge";
	/**筑阁祭天-领取进度奖励 */
	export const REQUEST_ACTIVITY_GETWORSHIPACHIEVEMENT:string="activity.getworshipachievement";

	//搜查魏府
	/**搜查魏府-活动抽奖*/
	export const REQUEST_ACTIVITY_SEARCHPROOF:string="activity.searchproof";
	/**搜查魏府-领取累计充值奖励 */
	export const REQUEST_ACTIVITY_GETPROOFCHARGE:string="activity.getproofcharge";
	/**搜查魏府-领取进度奖励 */
	export const REQUEST_ACTIVITY_GETPROOFREWARDS:string="activity.getproofrewards";
	/**搜查魏府-兑换奖励 */
	export const REQUEST_ACTIVITY_CLAIMPROOF:string="activity.claimproof";

	//好礼相送
	/**好礼相送-兑换奖励*/
	export const REQUEST_ACTIVITY_GIFTRETURNEXCHANGE:string="activity.giftreturnexchange";
	/**好礼相送-领取累计充值奖励 */
	export const REQUEST_ACTIVITY_GIFTRETURNGETTASK:string="activity.giftreturngettask";

	/** 母亲节相关**/
	export const REQUEST_MOTHERDAY_SENDFLOWERS:string="activity.sendflowers";
	export const REQUEST_MOTHERDAY_GETCHARGE:string="activity.getmotherdaycharge";
	export const REQUEST_MOTHERDAY_GETBOX:string="activity.getmotherdayrewards";
	export const REQUEST_MOTHERDAY_GETBIGPRIZE:string="activity.getmotherdaybigprize";
	/**五彩缤纷活动领取任务奖励 */
	export const REQUEST_MOTHERDAY_GETMOTHERDAYTASK:string="activity.getmotherdaytask";
	/**购买五彩缤纷活动商店物品 */
	export const REQUEST_MOTHERDAY_BUYMOTHERDAYSHOP:string="activity.buymotherdayshop";
	/**五彩商店兑换场景奖励 */
	export const REQUEST_MOTHERDAY_EXCHANGEMOTHERDAYSCENE:string="activity.exchangemotherdayscene";

	export const REQUEST_QA_ANSWER:string="activity.answerquestion";
	/**励精图治*/
	export const REQUEST_BATTLEPASS_BUYLV:string="activity.battlepassbuylv";
	export const REQUEST_BATTLEPASS_GETLVRWD:string="activity.battlepassgetrwd";
	export const REQUEST_BATTLEPASS_SHOPBUY:string="activity.battlepassshopbuy";
	export const REQUEST_BATTLEPASS_TASKRWD:string="activity.battlepasstaskrwd";

	//粽叶飘香-端午节活动 
	export const REQUEST_ACTIVITY_GETDUANWUITEMB:string = "activity.getduanwuitemb"; 
	export const REQUEST_ACTIVITY_GETDUANWUITEMC:string = "activity.getduanwuitemc"; 
	export const REQUEST_ACTIVITY_BUYDUANWUSHOP:string = "activity.buyduanwushop"; 
	export const REQUEST_ACTIVITY_CLAIMDUANWUITEM:string = "activity.claimduanwuitem"; 
	export const REQUEST_ACTIVITY_GETDUANWUSHOPTASK:string = "activity.getduanwushoptask"; 

	//newboss
	export const REQUEST_NEWBOSS_GET:string = "newboss.get"; 
	export const REQUEST_NEWBOSS_GETDETAILS:string = "newboss.getdetails"; 
	export const REQUEST_NEWBOSS_RECOVER:string = "newboss.recover"; 
	export const REQUEST_NEWBOSS_ATTACK:string = "newboss.attack"; 
	export const REQUEST_NEWBOSS_BUY:string = "newboss.buy";
	export const REQUEST_NEWBOSS_GETRANK:string = "newboss.getrank";
	export const REQUEST_NEWBOSS_GETATTACKRANK:string = "newboss.getattackrank";
	export const REQUEST_NEWBOSS_GETREWARD:string = "newboss.getrewards";
	export const REQUEST_ITEM_HECHENG:string = "item.hecheng";

	//建造斗场
	export const REQUEST_ACTIVITY_ARENAINFO:string = "activity.getarenainfo"; 
	export const REQUEST_ACTIVITY_ARENATASK:string = "activity.getarenaitemc"; 
	export const REQUEST_ACTIVITY_ARENASHOP:string = "activity.buyarenashop"; 
	export const REQUEST_ACTIVITY_ARENARANK:string = "activity.getarenarank"; 
	export const REQUEST_ACTIVITY_GETARENAJINDU:string = "activity.getarenaitema"; 
	export const REQUEST_ACTIVITY_ARENACHARGE:string = "activity.getarenaitemb"; 

	//定军中原
	export const REQUEST_MAINLAND_GETINFO:string = "conquermainland.getinfo"; 
	export const REQUEST_MAINLAND_GETMAPINFO:string = "conquermainland.getmapinfo"; 
	export const REQUEST_MAINLAND_GETMYTEAMINFO:string = "conquermainland.getmyteam";
	export const REQUEST_MAINLAND_SELECTSERVANT:string = "conquermainland.selectservant";
	export const REQUEST_MAINLAND_GETCITYINFO:string = "conquermainland.getbuildinginfo";
	export const REQUEST_MAINLAND_USEITEM:string = "conquermainland.usespecial";
	export const REQUEST_MAINLAND_CANCELSERVANT:string = "conquermainland.cancelservant";
	export const REQUEST_MAINLAND_GETTASKRWD:string = "conquermainland.gettaskrwd";
	export const REQUEST_MAINLAND_PRANK:string = "conquermainland.getrank";
	export const REQUEST_MAINLAND_ZRANK:string = "conquermainland.getzidrank";
	export const REQUEST_MAINLAND_RECORDLIST:string = "conquermainland.getlist";
	export const REQUEST_MAINLAND_RECORDLOG:string = "conquermainland.getlog";
	export const REQUEST_MAINLAND_DONOTICE:string = "conquermainland.dontnotice";
	export const REQUEST_MAINLAND_USESPECIALGIFT:string = "conquermainland.usespecialgift";
	//魏征活动
	export const REQUEST_WEIZHENG_GETRECHARGE:string = "activity.getweizhengcharge"; 
	export const REQUEST_WEIZHENG_GETTASK:string = "activity.getweizhengtask"; 
	export const REQUEST_WEIZHENG_GETBUQIANTASK:string = "activity.signweizhengtask"; 
	export const REQUEST_WEIZHENG_EXCHANGE:string = "activity.claimweizheng"; 
	//情缘激活
	export const REQUEST_ENCOUNTER_ACTIVATE:string = "encounter.activate"; 
	//绝地擂台优化
	export const REQUEST_BATTLEGROUND_CHEER:string = "battleground.cheer";
	export const REQUEST_BATTLEGROUND_TASK:string = "battleground.getaudiencetask";
	export const REQUEST_BATTLEGROUND_SUPLIST:string = "battleground.getsupportlist"; 

	export const REQUEST_ITEM_CHOOSE:string = "item.choose"; 
	export const REQUEST_TITLEUPGRADE:string = "item.titleupgrade"; 

	//门客神器系统
	/**神器强化 */
	export const REQUEST_WEAPON_UPGRADE:string = "weapon.upgrade"; 
	/**神器强化十次 */
	export const REQUEST_WEAPON_UPGRADETEN:string = "weapon.upgradeten"; 
	/**神器加工 */
	export const REQUEST_WEAPON_UPABILITY:string = "weapon.upability"; 
	/**神器熔炼 */
	export const REQUEST_WEAPON_UPSKILL:string = "weapon.upskill"; 
	/**神器发布评论 */
	export const REQUEST_WEAPON_DISCUSS:string = "weapon.discuss"; 
	/**获取神器评论 */
	export const REQUEST_WEAPON_GETDISCUSS:string = "weapon.getdiscuss"; 
	/**点赞神器评论 */
	export const REQUEST_WEAPON_SUPPORT:string = "weapon.support"; 
	/**神器拆解 */
	export const REQUEST_WEAPON_RESOLVE:string = "weapon.resolve"; 	
	/**红颜皮肤升级 */
	export const REQUEST_WIFESKIN_UPGRADE:string = "wife.upgradewifeskin"; 
	export const REQUEST_WIFECHAT_SELECT:string = "wife.chatselect"; 
	export const REQUEST_WIFECHAT_RESET:string = "wife.chatreset"; 
	/**红颜背景*/
	export const REQUEST_WIFESKIN_SELECTBG:string = "wife.usebackground"; 
	/**科举答题 */
	export const REQUEST_EXAM_ANSWER:string = "exam.selectanswer";
	/**科举答题排行榜 */
	export const REQUEST_EXAM_RANK:string = "exam.getrank";
	/**科举开始答题 */
	export const REQUEST_EXAM_START:string = "exam.start";
	/**东郊狩猎 击杀boss */
	export const REQUEST_ACTIVITY_HUNTIN_KILLBOSS:string = "activity.huntingBoss";
	/**东郊狩猎 领取累充奖励 */
	export const REQUEST_ACTIVITY_HUNTING_GETCHARGE:string = "activity.huntingGetCharge";
	/**东郊狩猎 领取击杀奖励 */
	export const REQUEST_ACTIVITY_KILLREWARD:string = "activity.huntingGetkillreward";
	/**中秋活动 月夜仙缘 */
	export const REQUEST_ACTIVITY_SWEETGIFT_GETCHARGE:string = "activity.sweetGiftGetCharge";
	export const REQUEST_ACTIVITY_SWEETGIFT_GETVISIT:string = "activity.sweetGiftGetreward";
	export const REQUEST_ACTIVITY_SWEETGIFT_GETTASK:string = "activity.sweetGiftGetTask";
	export const REQUEST_ACTIVITY_SWEETGIFT_GETSHOP:string = "activity.sweetGiftbuyshop";
	export const REQUEST_ACTIVITY_SWEETGIFT_MAKE:string = "activity.sweetGiftMake";
	/**投石破敌  抽奖*/
	export const REQUEST_ACTIVITY_THROWSTONE_LOTTERY:string = "activity.throwstonelottery";
	/**投石破敌  充值奖励*/
	export const REQUEST_ACTIVITY_THROWSTONE_GETCHARGE:string = "activity.throwstonegetrecharge";
	/**投石破敌  进度奖励*/
	export const REQUEST_ACTIVITY_THROWSTONE_GETACHIEVEMENT:string = "activity.throwstonegetachievement";
	
	//金蛋赠礼砸蛋
	export let REQUEST_ACTIVITY_SMASHEGG_CLICK:string="activity.smashEggClick";
	//金蛋赠礼购买锤子
	export let REQUEST_ACTIVITY_SMASHEGG_BUY:string="activity.smashEggBuy";
	//金蛋赠礼进度奖励
	export let REQUEST_ACTIVITY_SMASHEGG_GETREWARD:string="activity.smashEggGetreward";
	//金蛋赠礼兑换皮肤
	export const REQUEST_ACTIVITY_SMASHEGG_EXCHANGE:string="activity.smashEggExchange";

		//群芳会
	//刷新Model
	export const REQUEST_WIFEBATTLE_EXTRACRASHMODEL: string = "wifebattle.extracrashmodel";
	export const REQUEST_WIFEBATTLE_CRASHMODEL: string = "wifebattle.crashmodel";
	//入口
	export const REQUEST_WIFEBATTLE_INDEX: string = "wifebattle.index";
	//群芳会搜索对手
	export const REQUEST_WIFEBATTLE_SEARCH: string = "wifebattle.search";
	//群芳会开始战斗接口
	export const REQUEST_WIFEBATTLE_FIGHT: string = "wifebattle.fight";
	//群芳会排行榜接口
	export const REQUEST_WIFEBATTLE_RANK: string = "wifebattle.rank";
	//群芳会排积分兑换
	export const REQUEST_WIFEBATTLE_EXCHANGESHOP: string = "wifebattle.exchangeshop";
	//群芳会榜单记录接口
	export const REQUEST_WIFEBATTLE_LIST:string="wifebattle.list";
	//群芳会战斗回放
	export const REQUEST_WIFEBATTLE_FIGHTREVIEW:string="wifebattle.fightreview";
	//群芳会升级宝典
	export const REQUEST_WIFEBATTLE_YONGLEUP:string="wifebattle.yongleup";
	/**珍器坊*/
	export const REQUEST_ZQF_SELECTSERVANT:string = "zhenqifang.selectservant"; 
	export const REQUEST_ZQF_GETFRIENDSERVANT:string = "zhenqifang.getservantlist"; 
	export const REQUEST_ZQF_FRESHTASK:string = "zhenqifang.fresh"; 
	export const REQUEST_ZQF_GETINFO:string = "zhenqifang.getmodel"; 
	export const REQUEST_ZQF_GETREWARD:string = "zhenqifang.getrewards";  
	export const REQUEST_ZQF_GETITASK:string = "zhenqifang.getitask";  
	export const REQUEST_ZQF_BATCHITASK:string = "zhenqifang.batchitask"; 
	export const REQUEST_ZQF_BATCHFTASK:string = "zhenqifang.batchftask"; 
	export const REQUEST_ZQF_SHOPBUY:string = "zhenqifang.shopbuy"; 
	/**天下至尊 */
	export const REQUEST_LT_GETMODEL:string = "laddertournament.getmodel"; 
	export const REQUEST_LT_SELECTSERVANT:string = "laddertournament.selectservant"; 
	export const REQUEST_LT_SEARCH:string = "laddertournament.search"; 
	export const REQUEST_LT_GETRANK:string = "laddertournament.getrank"; 
	export const REQUEST_LT_GETASK:string = "laddertournament.gettask"; 
	export const REQUEST_LT_FIGHT:string = "laddertournament.fight"; 
	export const REQUEST_LT_GETLOGS:string = "laddertournament.getlogs"; 
	export const REQUEST_LT_ADDBUFF:string = "laddertournament.addbuff"; 
	export const REQUEST_LT_SHOPBUY:string = "laddertournament.shopbuy"; 
	export const REQUEST_LT_GETLOGDETAIL:string = "laddertournament.getlogdetail"; 

	/**迁移服务器 绑定账号 */
	export const REQUEST_USER_SETBIND:string = "user.setbind";
	/**国庆活动 充值奖励 */
	export const REQUEST_ACTIVITY_NATIONDAY_GETCHARGE:string = "activity.nationdaygetchargerwd";
	/**国庆活动 任务奖励 */
	export const REQUEST_ACTIVITY_NATIONDAY_GETTASK:string = "activity.nationdaygettaskrwd";
	export const REQUEST_USER_REVERSIONSETTING:string = "user.reversionsetting";
	export const REQUEST_WIIFE_SETSEXSETTING:string = "wife.wifesexsetting";
	/**暗夜魅影 */
	export const REQUEST_DESTROYSAME_INFO:string = "activity.destroysamegetactive";
	export const REQUEST_DESTROYSAME_ATTACK:string = "activity.destroysameattack";
	export const REQUEST_DESTROYSAME_CHARGE:string = "activity.destroysamegetrecharge"; 
	export const REQUEST_DESTROYSAME_TASK:string = "activity.destroysamegettask"; 
	export const REQUEST_DESTROYSAME_REWARD:string = "activity.destroysamegetbossrwd";
	export const REQUEST_DESTROYSAME_SHOPBUY:string = "activity.destroysameshopbuy"; 
	/**开服庆典*/
	export const REQUEST_ACTIVITY_NEWOPENSHOPBUY:string = "activity.newOpenShopbuy";
	export const REQUEST_ACTIVITY_NEWOPENRINFOREWARDS:string = "activity.newOpenRinfoRewards";
	export const REQUEST_ACTIVITY_NEWOPENTASKREWARDS:string = "activity.newOpenTaskRewards";
	export const REQUEST_ACTIVITY_NEWOPENGETACTIVE:string = "activity.newOpenGetActive";
	
	/**女优活动2 */
	export const REQUST_ACTIVITY_GETRECHARGEBOXSPREWARD:string="activity.getrechargeboxspreward";
	export const REQUEST_OTHER_HIDEVIP:string = "otherinfo.hidevip";
	/**女优活动3 */
	export const REQUEST_ACTIVITY_YIYIBUSHECHOU:string="activity.yiyibushechou";
	export const REQUEST_ACTIVITY_YIYIBUSHE_GETREWARD:string="activity.yiyibusheachievement";

	/**女优活动1 */
	export const REQUEST_ACTIVITY_FIRSTSIGHTLOVE_GETINFO:string="activity.firstSightLoveGetInfo";
	export const REQUEST_ACTIVITY_FIRSTSIGHTLOVE_GETREWARD:string="activity.firstSightLoveGetRewards";
	export const REQUEST_ACTIVITY_FIRSTSIGHTLOVE_BUY:string="activity.firstSightLoveBuy";
	export const REQUEST_ACTIVITY_FIRSTSIGHTLOVE_BM:string="activity.firstSightLoveBm";
	export const REQUEST_ACTIVITY_FIRSTSIGHTLOVE_GETLIST:string="activity.firstSightLoveGetList";
	export const REQUEST_ACTIVITY_FIRSTSIGHTLOVE_BMLIST:string="activity.firstSightLoveGetBmList";
	/**德川活动*/
	export const REQUEST_DECHUAN_REMIND:string="activity.dechuanshidaimind";
	export const REQUEST_DECHUAN_RECHARGE:string="activity.dechuanshidaigetcharge";
	export const REQUEST_DECHUAN_CLAIM:string="activity.dechuanshidaiclaim";
	export const REQUEST_DECHUAN_DAILYTASK:string="activity.dechuanshidaigettask";
	export const REQUEST_DECHUAN_DAILYTOTALTASK:string="activity.dechuanshidaigettotaltask";
	/**2019年双十一活动*/
	//2019双十一活动转盘抽奖
	export const REQUEST_ACTIVITY_SDNEWCHOU:string="activity.singleDay2019chou";
	export const REQUEST_ACTIVITY_SDNEWGETRECHARGE:string="activity.singleDay2019getCharge";
	export const REQUEST_ACTIVITY_SDNEWBUY:string="activity.singleDay2019buyShop";
	export const REQUEST_ACTIVITY_SDNEWGETRANK:string="activity.singleDay2019getRank";
	export const REQUEST_ACTIVITY_SDNEWROLL:string="activity.singleDay2019getRollList";
	/**女优活动4 依生依世 */
	export const REQUEST_ACTIVITY_COURTDUTY_GETTASK:string="activity.courtDutyGettask";
	export const REQUEST_ACTIVITY_COURTDUTY_UNLOCK:string="activity.courtDutyUnlock";
	/**当家*/
	export const OTHERINFO_SETDANGJIA:string="otherinfo.setdangjia";
	/**携美同游 */
	export const REQUEST_ACTIVITY_TRAVELWITHBEAUTY_GET:string="activity.travelWithBeautyGet";
	export const REQUEST_ACTIVITY_TRAVELWITHBEAUTY_RECHARGE:string="activity.travelWithBeautyCharge";
	export const REQUEST_ACTIVITY_TRAVELWITHBEAUTY_REWARD:string="activity.travelWithBeautyRewards";
	//跨服群芳会
	//跨服群芳会榜单记录接口
	export const REQUEST_ACTIVITY_WIFEBATTLECROSS_GETINFO:string = "wifebattlecross.getinfo"; //跨服群芳会入口面板

	export const REQUEST_ACTIVITY_WIFEBATTLECROSS_SEARCH:string = "wifebattlecross.search"; //跨服群芳会搜索对手

	export const REQUEST_ACTIVITY_WIFEBATTLECROSS_FIGHT:string = "wifebattlecross.fight"; //跨服群芳会开始战斗接口

	export const REQUEST_ACTIVITY_WIFEBATTLECROSS_LIST:string = "wifebattlecross.list"; //跨服群芳会榜单记录接口

	export const REQUEST_ACTIVITY_WIFEBATTLECROSS_FIGHTREVIEW:string = "wifebattlecross.fightreview"; //跨服群芳会战斗回放

	export const REQUEST_ACTIVITY_WIFEBATTLECROSS_RANK:string = "wifebattlecross.rank"; //跨服群芳会排行榜接口

	export const REQUEST_ACTIVITY_WIFEBATTLECROSS_CRASHMODEL:string = "wifebattlecross.crashmodel"; //跨服群芳会刷新modl

	export const REQUEST_ACTIVITY_WIFEBATTLECROSS_GETZIDREWARD:string = "wifebattlecross.getzidreward"; //跨服群芳会领取区服奖励
	/** 设置用户自己字符串*/
	export const REQUEST_OTHERINFO_SETKV:string="otherinfo.setkv";
	/** 追踪事件打点统计*/
	export const REQUEST_STATS_TRACKEVENT:string="stats.clickevent";
	/**巾帼英雄 */
	export const REQUEST_ACTIVITY_HEROINE_PLAY:string="activity.heroinelottery";
	export const REQUEST_ACTIVITY_HEROINE_RECHARGE:string="activity.heroinegetrecharge";
	export const REQUEST_ACTIVITY_HEROINE_GETREWARD:string="activity.heroineprocessrwd";
	/**折扣商店 */
	export const REQUEST_ACTIVITY_ANNIVERSARYSHOP2020_BUY:string="activity.anniversaryShop2020buy";
	/**德川活动*/
	export const REQUEST_ANNUALPRAY_PRAY:string="activity.annualPray2020Chou";
	export const REQUEST_ANNUALPRAY_RECHARGE:string="activity.annualPray2020GetCharge";
	export const REQUEST_ANNUALPRAY_CLAIM:string="activity.annualPray2020Claim";
	export const REQUEST_ANNUALPRAY_GETJINDUREWARD:string="activity.annualPray2020GetRewards";
	/**帝王成就 */
	export const REQUEST_EMPERORACHIEVE_GETREWARD:string="emperorachieve.getachieverewards";//帝王成就成就奖励
	export const REQUEST_EMPERORACHIEVE_OUTING:string="emperorachieve.outing";//出巡
	export const REQUEST_EMPERORACHIEVE_GETOUTING_INFO:string="emperorachieve.getoutinginfo";//明君出巡获取出巡者信息
	export const REQUEST_EMPERORACHIEVE_SHOW_NOTICE:string="emperorachieve.shownotice";//明君出巡 主页面动画显示
	export const REQUEST_EMPERORACHIEVE_BARRAGE:string="emperorachieve.barrage";//明君出巡 发言
	export const REQUEST_EMPERORACHIEVE_GETPOPULARRWD:string="emperorachieve.getpopularityrwd";//明君出巡 人气奖励
	export const REQUEST_EMPERORACHIEVE_GETBARRAGE_LIST:string="emperorachieve.getbarragelist";//明君出巡 请安列表
	export const REQUEST_EMPERORACHIEVE_BONUS:string="emperorachieve.bonus";//明君出巡 赏赐
	export const REQUEST_EMPERORACHIEVE_GETBONUS:string="emperorachieve.getbonus";//明君出巡 领取赏赐

	/** 消费排行活动*/
	export const REQUEST_COSTGEMRANK_GETLIST:string="activity.costGemRankGetRank";
	/** 感恩回馈*/
	export const REQUEST_DAILYRECHARGE_GEREWARD:string="activity.dailyRechargeGetRewards";
	/** 感恩回馈*/
	export const REQUEST_NEWYEARRED_GEREWARD:string="activity.newYearRedreward";
	/** 俄语七日好礼*/
	export const REQUEST_SEVENDAYSIGNUP_GEREWARD:string="sevendaysign.getfirstdayrwd";
	/** 元宵节*/
	export const REQUEST_LANTERN_LOTTERY:string="activity.lanternlottery";
	export const REQUEST_LANTERN_RECHARGEREWARD:string="activity.lanterngetrecharge";
	export const REQUEST_LANTERN_PROCESSREWARD:string="activity.lanternprocessrwd";
	/**武圣天威 */
	export const REQUEST_THREEKINGDOMSRECHARGE_LOTTERY:string="activity.threekingdomsRechargeChou";
	export const REQUEST_THREEKINGDOMSRECHARGE_REWARDS:string="activity.threekingdomsRechargeRewards";
	/**三国争霸*/
	export const REQUEST_THREEKINGDOMS_SELECTKINGDOMS:string="threekingdoms.selectkingdoms";
	export const REQUEST_THREEKINGDOMS_ATTACKCITY:string="threekingdoms.attackcity";
	export const REQUEST_THREEKINGDOMS_GETBUILDINGINFO:string="threekingdoms.getbuildinginfo";
	export const REQUEST_THREEKINGDOMS_GETMAPINFO:string="threekingdoms.getmapinfo";
	export const REQUEST_THREEKINGDOMS_UPGRADEREWARD:string="threekingdoms.taskup";
	export const REQUEST_THREEKINGDOMS_TASKSTART:string="threekingdoms.taskstart";
	export const REQUEST_THREEKINGDOMS_TASKREWARDS:string="threekingdoms.taskrewards";
	export const REQUEST_THREEKINGDOMS_HEROINFO:string="threekingdoms.heroinfo";
	export const REQUEST_THREEKINGDOMS_HEROATTACK:string="threekingdoms.heroattack";
	export const REQUEST_THREEKINGDOMS_HERORECOVERY : string = "threekingdoms.herorecover";
	export const REQUEST_THREEKINGDOMS_HEROREWARD : string = "threekingdoms.herorewards";
	export const REQUEST_THREEKINGDOMS_RECHAGRERWD : string = "threekingdoms.getrechargerwd";
	export const REQUEST_THREEKINGDOMS_GOVERMENTINFO : string = "threekingdoms.governmentinfo";
	export const REQUEST_THREEKINGDOMS_GETRANK : string = "threekingdoms.getrank";
	export const REQUEST_THREEKINGDOMS_ORDER : string = "threekingdoms.order";
	export const REQUEST_THREEKINGDOMS_CITYREWARD : string = "threekingdoms.attackcityrewards";
	export const REQUEST_THREEKINGDOMS_SEASONRANK : string = "threekingdoms.seasonrank";
	export const REQUEST_THREEKINGDOMS_GETLIST : string = "threekingdoms.getlist";
	export const REQUEST_THREEKINGDOMS_GETLISTDETAIL : string = "threekingdoms.getlistdetail";
	export const REQUEST_THREEKINGDOMS_GETCITYRANK : string = "threekingdoms.getattackcityrank";
	export const REQUEST_THREEKINGDOMS_GETKINGDOMSREWARDS : string = "threekingdoms.getkingdomrewards";
	export const REQUEST_THREEKINGDOMS_GETCROSSACTIVEREWARDS : string = "threekingdoms.crossactiverewards";
	export const REQUEST_THREEKINGDOMS_GETMYLIST : string = "threekingdoms.getmylist";

	/**三国红颜 */
	export const REQUEST_ACTHREEKINGDOMSOFWIFE_LOTTERY:string="activity.threekingdomsOfWifeChou";
	export const REQUEST_ACTHREEKINGDOMSOFWIFE_CHARGE:string="activity.threekingdomsOfWifeCharge";
	export const REQUEST_ACTHREEKINGDOMSOFWIFE_ACHIEVE:string="activity.threekingdomsOfWifeAch";
	/**财神祝福 */
	export const REQUEST_ACBLESSINGOFMAMMON_GETREWARD:string="activity.blessingOfMammongetrwd";
	/**酒神诗仙 */
	export const REQUEST_ACSKINOFLIBAI_LOTTERY:string="activity.skinOfLibaiChou";
	export const REQUEST_ACSKINOFLIBAI_CHARGE:string="activity.skinOfLibaiCharge";
	export const REQUEST_ACSKINOFLIBAI_ACHIEVE:string="activity.skinOfLibaiAch";
	/**万物复苏 */
	export const REQUEST_ACRECOVERY_LOTTERY:string="activity.recoverylottery";
	export const REQUEST_ACRECOVERY_CHARGE:string="activity.recoverygetrechargerwd";
	export const REQUEST_ACRECOVERY_ACHIEVE:string="activity.recoverygetachievement";
	/**新好友邀请 */
	export const REQUEST_NEWINVITE_GETINVITEREWARD:string="newinvite.getinvitereward";
	export const REQUEST_NEWINVITE_GETPOWERREWARD:string="newinvite.getpowerreward";
	export const REQUEST_NEWINVITE_GETINFO:string="newinvite.getinfo";
	export const REQUEST_NEWINVITE_BIND:string="newinvite.bind";
	/**召唤好友 */
	export const REQUEST_REBACK_BIND:string="newreback.bind";
	export const REQUEST_REBACK_GETINVITEREWARD:string="newreback.getinvitereward";
	export const REQUEST_REBACK_GETINFO:string="newreback.getinfo";
	/** 群雄争霸 初始化 */
	export const REQUEST_ACHEGEMONY_HEGEMONYOPEN: string = "achegemony.hegemonyopen";
	//首页排行榜
	export const REQUEST_ACHEGEMONY_GETRANK:string = "achegemony.getrank";
	//首页点击帮会 取帮会详情信息
	export const REQUEST_ACHEGEMONY_GETACHEALLIANCEINFO:string = "achegemony.getacheallianceinfo";
	//首页点击帮会 取帮会阵容
	export const REQUEST_ACHEGEMONY_GETACHEALLILIST:string = "achegemony.getacheallilist";
	//上阵门客
	export const REQUEST_ACHEGEMONY_SELECTSERVANT:string = "achegemony.selectservant";
	//群雄逐鹿活动下阵门客
	export const REQUEST_ACHEGEMONY_CANCELSERVANT:string = "achegemony.cancelservant";
	//使用计策
	export const REQUEST_ACHEGEMONY_SELECTSTRATAGEM:string = "achegemony.selectstratagem";
	//群雄逐鹿活动对战详情
	export const REQUEST_ACHEGEMONY_GETWARDETAIL:string = "achegemony.getwardetail";
	//群雄逐鹿活动打开人气排行榜
	export const REQUEST_ACHEGEMONY_GETWARFLAGRANK:string = "achegemony.getwarflagrank";
	//群雄逐鹿活动使用战旗押注
	export const REQUEST_ACHEGEMONY_USEWARFLAG:string = "achegemony.usewarflag";
	//群雄逐鹿活动战斗积分兑换接口
	export const REQUEST_ACHEGEMONY_EXCHANGEFIGHTSHOP:string = "achegemony.exchangefightshop";
	//群雄逐鹿活动人气积分兑换接口
	export const REQUEST_ACHEGEMONY_EXCHANGEFLAGSHOP:string = "achegemony.exchangeflagshop";
	//群雄逐鹿活动打开晋级赛排行榜
	export const REQUEST_ACHEGEMONY_GETPROMOTIONRANK:string = "achegemony.getpromotionrank";
	//群雄逐鹿活动获取淘汰赛对手信息
	export const REQUEST_ACHEGEMONY_GETWEEDOUTINFO:string = "achegemony.getweedoutinfo";
	//群雄逐鹿活动任务奖励
	export const REQUEST_ACHEGEMONY_GETTASKREWARD:string = "achegemony.gettaskreward";
	//群雄逐鹿活动战斗胜利积分
	export const REQUEST_ACHEGEMONY_GETWINSCORE:string = "achegemony.getwinscore";
	//群雄逐鹿活动领取战旗押注积分
	export const REQUEST_ACHEGEMONY_GETWARFLAGSCORE:string = "achegemony.getwarflagscore";
	//群雄逐鹿领取帮会充值奖励
	export const REQUEST_ACHEGEMONY_GETALLIANCECHARGERDW:string = "achegemony.getalliancerechargerwd";
	/**获取邮件model数据 */
	export const REQUEST_MAIL_GETMYMAILLIST:string="mail.getmymaillist";
	/**朝廷诏令 */
	export const REQUEST_ACCHAOTING_GETTASK:string="activity.getchaotingtask";
	export const REQUEST_ACCHAOTING_GETRECHARGE:string="activity.chaotinggetrecharge";
	export const REQUEST_ACCHAOTING_GETRANK:string="activity.getchaotingrank";
	export const REQUEST_ACCHAOTING_UNLOCK_TASK:string="activity.unlockchaotingtask";
	/**复活节活动  */
	export const REQUEST_RABBIT_CHOU:string="activity.rabbitComingChou";
	export const REQUEST_RABBIT_RECHARGE:string="activity.rabbitComingCharge";
	export const REQUEST_RABBIT_ACHIEVE:string="activity.rabbitComingAch";
	export const REQUEST_RABBIT_BUY:string="activity.rabbitComingBuy";
	export const REQUEST_RABBIT_TASK:string="activity.rabbitComingGetTask";
	export const REQUEST_RABBIT_RANK:string="activity.rabbitComingGetRank";
	/**清风纸鸢 */
	export const REQUEST_ACKITE_LOTTERY:string="activity.kitegetreward";
	export const REQUEST_ACKITE_GETBOXREWARD:string="activity.kitegetboxreward";
	export const REQUEST_ACKITE_GETTASKREWARD:string="activity.kitegettaskreward";
	export const REQUEST_ACKITE_GETRANK:string="activity.kitegetrank";
	export const REQUEST_ACTIVITY_FIRSTFLAG:string="activity.firstflag";
	//评定匈奴
	export const REQUEST_XIONGNU_ATK:string="activity.beatXiongNuAttack";
	export const REQUEST_XIONGNU_RECHARGE:string="activity.beatXiongNuGetCharge";
	export const REQUEST_XIONGNU_PROGRESS:string="activity.beatXiongNuGetAchievement";
	/**兰亭荷花 */
	export const REQUEST_ACLOTUS_LOTTERY:string="activity.lotusWatering";
	export const REQUEST_ACLOTUS_GETREWARD:string="activity.lotusGetAchievement";
	export const REQUEST_ACLOTUS_EXCHANGE:string="activity.lotusExchange";
	export const REQUEST_ACLOTUS_GETRANK:string="activity.lotusGetrank";
	/**神器迷宫 */
	export const REQUEST_ACWEAPONMAZE_LOTTERY:string="activity.weaponMazeGetboxreward";
	export const REQUEST_ACWEAPONMAZE_GETACHIEVT:string="activity.weaponMazeGetschedule";
	export const REQUEST_ACWEAPONMAZE_GETRECHARGE:string="activity.weaponMazeGetrecharge";

	/**端午活动 粽夏连连看 */
	export const REQUEST_FINDSAME_GETMAP:string="activity.findSameGetmap";
	export const REQUEST_FINDSAME_ATTACK:string="activity.findSameattack";
	export const REQUEST_FINDSAME_BUYNUM:string="activity.findSamebuynum";
	export const REQUEST_FINDSAME_GETRECHARGE:string="activity.findSameGetrecharge";
	export const REQUEST_FINDSAME_GETACHIEVEMENT:string="activity.findSameGetachievement";
	export const REQUEST_FINDSAME_GETTASK:string="activity.findSameGettask";

	/**鼠来进宝 */
	export const REQUEST_MOUSETREASURE_GETMAP:string="activity.mouseTreasureGetmap";
	export const REQUEST_MOUSETREASURE_ATTACK:string="activity.mouseTreasureattack";
	export const REQUEST_MOUSETREASURE_ALLATTACK:string="activity.mouseTreasureAllattack";
	export const REQUEST_MOUSETREASURE_BUYNUM:string="activity.mouseTreasurebuynum";
	export const REQUEST_MOUSETREASURE_GETRECHARGE:string="activity.mouseTreasureGetrecharge";
	export const REQUEST_MOUSETREASURE_GETACHIEVEMENT:string="activity.mouseTreasureGetAchievement";
	export const REQUEST_MOUSETREASURE_EXCHANGE:string="activity.mouseTreasureExchange";
	export const REQUEST_MOUSETREASURE_GETRANK:string="activity.mouseTreasureGetrank";	
	export const REQUEST_MOUSETREASURE_USEITEM:string="activity.mouseTreasureuseitem";	

	/**神器牢房 */
	export const REQUEST_WEAPONPRISON_PLAY:string="activity.weaponPrisonPlay";
	export const REQUEST_WEAPONPRISON_GETREWARD:string="activity.weaponPrisonGetreward";
	export const REQUEST_WEAPONPRISON_GETRANK:string="activity.weaponPrisonGetrank";
	export const REQUEST_WEAPONPRISON_GETACHIEVEMENT:string="activity.weaponPrisonGetAchievement";
	export const REQUEST_WEAPONPRISON_SETTYPE:string="activity.weaponPrisonSettype";
	export const REQUEST_WEAPONPRISON_CHECKREDPOINT:string="activity.weaponPrisonCheckredpoint";


	/**红包来了 */
	export const REQUEST_GETREDPACKGIFT:string="activity.getredPackGift";
	export const REQUEST_GETREDPACKINDEX:string="activity.getredPackindex";	

	/**棋社对弈 */
	export const REQUEST_CHESS_PLAY:string="activity.chessPlay";
	export const REQUEST_CHESS_GETNUMREWARDS:string="activity.chessGetnumrewards";	
	export const REQUEST_CHESS_GETRECHARGE:string="activity.chessGetrecharge";
	export const REQUEST_CHESS_GETTASK:string="activity.chessGettask";
	export const REQUEST_CHESS_EXCHANGE:string="activity.chessExchange";

	/**帮会集结 */
	export const REQUEST_AGGREGATION_GETRWD:string="activity.aggregationgetrwd";
	export const REQUEST_AGGREGATION_GETINFO:string="activity.aggregationgetinfo";	

	/**骑士选拔 */
	export const REQUEST_KNIGHT_ATTACK:string="activity.knightattack";
	export const REQUEST_KNIGHT_GETRINFORWD:string="activity.knightgetrinforwd";	
	export const REQUEST_KNIGHT_GETACHIEVE:string="activity.knightgetachieve";		

	/**皇城六部 */
	export const REQUEST_SIXSECTION1_GETMAP:string="sixsection1.getmap"; //席位
	export const REQUEST_SIXSECTION1_ATTACK:string="sixsection1.attack"; //派遣门客
	export const REQUEST_SIXSECTION1_ADDINFLUENCE:string="sixsection1.addinfluence";//增加影响力
	export const REQUEST_SIXSECTION1_INVESTIGATE:string="sixsection1.investigate";//侦查
	export const REQUEST_SIXSECTION1_GETDINFO:string="sixsection1.getdinfo";//防守信息
	export const REQUEST_SIXSECTION1_GETEINFO:string="sixsection1.geteinfo";//仇人
	export const REQUEST_SIXSECTION1_COLLECT:string="sixsection1.collect";//采集
	export const REQUEST_SIXSECTION1_SHOW:string="sixsection1.show";//据点结算
	export const REQUEST_SIXSECTION1_SEARCH:string="sixsection1.search";//编号查询
	export const REQUEST_SIXSECTION1_GETLIST:string="sixsection1.getlist";//抢夺记录
	export const REQUEST_SIXSECTION1_TITLEGETMAP:string="sixsection1.directorgetmap";//头衔
	export const REQUEST_SIXSECTION1_TITLEATTACK:string="sixsection1.directorattack";//头衔抢夺
	export const REQUEST_SIXSECTION1_GETRECHARGE:string="sixsection1.getrechargerwd";//每日充值
	export const REQUEST_SIXSECTION_DIRADDTIME:string="sixsection1.directoraddtime";//头衔挑战次数
	export const REQUEST_SIXSECTION1_CLICK:string="sixsection1.click";//统计

	/**青莲茶香 */
	export const REQUEST_DRINKTEA_DRINKTEA:string="activity.drinkTea";
	export const REQUEST_DRINKTEA_GETRECHARGE:string="activity.drinkTeaGetrecharge";	
	export const REQUEST_DRINKTEA_GETACHIEVEMENT:string="activity.drinkTeaGetachievement";	

	/**更新有礼 */
	export const REQUEST_NEWPACK_GETREWARDS:string="activity.newPackGetrewards";	
	
	/**鼠来如意 */
	export const REQUEST_ACMOUSECOME_LOTTERY:string="activity.mouseCometurn";
	export const REQUEST_ACMOUSECOME_ACHIEVERWD:string="activity.mouseComeGetmouseNum";
	export const REQUEST_ACMOUSECOME_GETRANK:string="activity.mouseComeGetrank";
	export const REQUEST_ACMOUSECOME_EXCHANGE:string="activity.mouseComeExchange";

	/**
	 * 神兵宝库
	 */
	export const REQUEST_WEAPONHOUSE_MOVE:string="activity.weaponHousemove";//移动
	export const REQUEST_WEAPONHOUSE_BUYNUM:string="activity.weaponHousebuynum";//购买体力
	export const REQUEST_WEAPONHOUSE_GETRANK:string="activity.weaponHouseGetRank";//排行榜
	export const REQUEST_WEAPONHOUSE_GETRECHARGE:string="activity.weaponHouseGetrecharge";//领取充值
	export const REQUEST_WEAPONHOUSE_GETSCHEDULEALL:string="activity.weaponHouseGetscheduleAll";//领取全服进度奖励
	export const REQUEST_WEAPONHOUSE_GETSCHEDULEALLLIST:string="activity.weaponHouseGetscheduleAlllist";//获取全服进度表
	export const REQUEST_WEAPONHOUSE_GETSCHEDULEONE:string="activity.weaponHouseGetscheduleOne";//领取个人进度奖励
	export const REQUEST_WEAPONHOUSE_RESETMAP:string="activity.weaponHouseresetmap";

	/**天籁之音 */
	export const REQUEST_ACSKYSOUND_KNOCK:string="activity.skySoundknock";	
	export const REQUEST_ACSKYSOUND_EXCHANGE:string="activity.skySoundexchange";	
	export const REQUEST_ACSKYSOUND_GETSOUNDNUM:string="activity.skySoundGetsoundNum";	
	export const REQUEST_ACSKYSOUND_EXCHANGEREWARDS:string="activity.skySoundexchangerewards";	

	/**夜观天象 */
	export const REQUEST_ACNIGHTSKY_PLAY:string="activity.nightSkyPlay";
	export const REQUEST_ACNIGHTSKY_ACHIVERWD:string="activity.nightSkyGetnumrewards";
	export const REQUEST_ACNIGHTSKY_EXCHANGE:string="activity.nightSkyExchange";
	export const REQUEST_ACNIGHTSKY_SETTYPE:string="activity.nightSkySettype";

	/**闲置兑换 */
	export const REQUEST_ACEXCHANGE_EXCHANGE: string = "activity.activityExchange";

	/**功能解锁 */
	export const REQUEST_OPENFUNCTION_UNLOCKLIST2:string="otherinfo.getunlocklist2reward";

	/**门客冲榜领取任务奖励 */
	export const REQUEST_ACCROSSONESERVER_GETREW: string = "crossoneserver.gettaskrewards";
	
	/**门客冲榜获取排行榜信息 */
	export const REQUEST_ACCROSSONESERVER_GETRANK: string = "crossoneserver.getrank";

	/**天魔铠甲 */
	export const REQUEST_ACSKYARMOR_PLAY:string="activity.skyArmorPlay";
	export const REQUEST_ACSKYARMOR_GETNUMREWARDS:string="activity.skyArmorGetnumrewards";
	export const REQUEST_ACSKYARMOR_GETRANK:string="activity.skyArmorGetrank";
	export const REQUEST_ACSKYARMOR_EXCHANGE:string="activity.skyArmorExchange";

	/**限时福利免费礼包 */
	export const REQUEST_ACLIMITGIFT_FREE: string = "activity.limitGiftFree";

	/**新服预约 */
	export const REQUEST_ACNEWAPPOINT_TASK_RWD:string="activity.newappintgetreward";
	export const REQUEST_ACNEWAPPOINT_EXCHANGE:string="activity.newappintexchange";

	/**鼠来招财 */
	export const REQUEST_ACMOUSEGOLD_FLOP:string="activity.mouseGoldFlop";
	export const REQUEST_ACMOUSEGOLD_GETACHIEVEMENT:string="activity.mouseGoldGetAchievement";
	export const REQUEST_ACMOUSEGOLD_GETSPEREWARD:string="activity.mouseGoldGetspecialreward";
	export const REQUEST_ACMOUSEGOLD_NEXT:string="activity.mouseGoldNext";
	export const REQUEST_ACMOUSEGOLD_EXCHANGE:string="activity.mouseGoldexchange";
	export const REQUEST_ACMOUSEGOLD_GETRANK:string="activity.mouseGoldGetrank";	
	export const REQUEST_ACMOUSEGOLD_FLOPALL:string="activity.mouseGoldFlopAll";

	/**海滨伊人 */
	export const REQUEST_AC_SEAWOMANFLOP:string="activity.seaWomanFlop";
	export const REQUEST_AC_SEAWOMANEXCHANGE:string="activity.seaWomanexchange";
	export const REQUEST_AC_SEAWOMANGETCHESSNUM:string="activity.seaWomanGetchessnum";

	/** 情定鹊桥 */
	export const REQUEST_AC_BIRDBRIDGEWISH:string="activity.birdBridgeWish";
	export const REQUEST_AC_BIRDBRIDGEGETWISH:string="activity.birdBridgeGetWish";
	export const REQUEST_AC_BIRDBRIDGECHOOSEWISH:string="activity.birdBridgeChooseWish";
	export const REQUEST_AC_BIRDBRIDGEGETRECHARGE:string="activity.birdBridgeGetRecharge";
	export const REQUEST_AC_BIRDBRIDGEGETACHIEVE:string="activity.birdBridgeGetAchieve";
	export const REQUEST_AC_BIRDBRIDGEGETMODEL:string="activity.birdBridgeGetModel";

	/**权倾朝野 */
	export const REQUEST_ACPOWERFULL_LOTTERY:string="activity.powerFullRescue";
	export const REQUEST_ACPOWERFULL_ACHIEVERWD:string="activity.powerFullGetnightNum";
	export const REQUEST_ACPOWERFULL_EXCHANGE:string="activity.powerFullExchange";
	export const REQUEST_ACPOWERFULL_SHOPBUY:string="activity.powerFullShopbuy";
	export const REQUEST_ACPOWERFULL_PLOT:string="activity.powerFullsetplot";
	
	/**求签问卜 */
	export const REQUEST_ACASKGOD_DIVINE:string="activity.askGodDivine";
	export const REQUEST_ACASKGOD_GETNIGHTNUM:string="activity.askGodGetnightNum";
	export const REQUEST_ACASKGOD_SHOPEXCHANGE:string="activity.askGodShopexchange";	

	/**情系良缘 */
	export const REQUEST_ACGOODMATCH_SELECTPOOL:string="activity.goodMatchSettype";
	export const REQUEST_ACGOODMATCH_LOTTERY:string="activity.goodMatchPlay";
	export const REQUEST_ACGOODMATCH_GETACHRWD:string="activity.goodMatchGetOneAchieve";
	export const REQUEST_ACGOODMATCH_GETSERVERACHRWD:string="activity.goodMatchGetAllAchieve";
	export const REQUEST_ACGOODMATCH_GETSERVERACHDATA:string="activity.goodMatchAllAchieveData";
	export const REQUEST_ACGOODMATCH_EXCHANGE:string="activity.goodMatchExchange";

	/**新三国争霸 */
	export const REQUEST_ACNEWTHREEKINGDOMS_BM:string="threekingdomsnew.bm";
	export const REQUEST_ACNEWTHREEKINGDOMS_BMRANK:string="threekingdomsnew.bmrank";
	export const REQUEST_ACNEWTHREEKINGDOMS_GETMAP:string="threekingdomsnew.getmapinfo";
	export const REQUEST_ACNEWTHREEKINGDOMS_GETGLOBALINFO:string="threekingdomsnew.getglobalinfo";
	export const REQUEST_ACNEWTHREEKINGDOMS_GETCASTLE:string="threekingdomsnew.getcastle";
	export const REQUEST_ACNEWTHREEKINGDOMS_FIGHT:string="threekingdomsnew.fight";
	export const REQUEST_ACNEWTHREEKINGDOMS_GETRANK:string="threekingdomsnew.getrank";
	export const REQUEST_ACNEWTHREEKINGDOMS_SPECIALSOLIDER:string="threekingdomsnew.specialsolider";
	export const REQUEST_ACNEWTHREEKINGDOMS_GETLIST:string="threekingdomsnew.getlist";
	export const REQUEST_ACNEWTHREEKINGDOMS_GUESS:string="threekingdomsnew.guess";
	export const REQUEST_ACNEWTHREEKINGDOMS_GUESSINFO:string="threekingdomsnew.guessinfo";
	export const REQUEST_ACNEWTHREEKINGDOMS_GUESSREWARD:string="threekingdomsnew.guessrewards";
	export const REQUEST_ACNEWTHREEKINGDOMS_SHOPBUY:string="threekingdomsnew.shopbuy";
	export const REQUEST_ACNEWTHREEKINGDOMS_GETRINFORWD:string="threekingdomsnew.getrinforewards";

	/**花好月圆 */
	export const REQUEST_ACFLOWERMOON_SETTYPE:string="flowermoon.flowerMoonSettype";	
	export const REQUEST_ACFLOWERMOON_SETPOS:string="flowermoon.flowerMoonSetpos";
	export const REQUEST_ACFLOWERMOON_PLAY:string="flowermoon.flowerMoonPlay";
	export const REQUEST_ACFLOWERMOON_GETACHIEVEMENT:string="flowermoon.flowerMoonGetAchievement";
	export const REQUEST_ACFLOWERMOON_EXCHANGE1:string="flowermoon.flowerMoonexchange1";
	export const REQUEST_ACFLOWERMOON_EXCHANGE2:string="flowermoon.flowerMoonexchange2";
	export const REQUEST_ACFLOWERMOON_GETRANK:string="flowermoon.flowerMoonGetrank";
	export const REQUEST_ACFLOWERMOON_GETZRANK:string="flowermoon.flowerMoonGetzrank";
	export const REQUEST_ACFLOWERMOON_GETRANKREWARD:string="flowermoon.flowerMoonGetrankreward";
	export const REQUEST_ACFLOWERMOON_CHECKREDPOINT:string="flowermoon.flowerMoonCheckredpoint";
}

	


