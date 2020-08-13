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
	export const REQUEST_UPGRADE_SERVANT_UPSKILLABILITY:string = "servant.upskinability";
	export const REQUEST_UPGRADE_SERVANT_REDSKINRED:string = "servant.readservantskinred";
	export const REQUEST_UPGRADE_SERVANT_EQUIP:string = "servant.servantequip";

	// 红颜召唤、一键召唤限时礼包
	export const REQUEST_WIFE_RECOVERSCENE:string = "wife.recoverscence";
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
	//红颜子嗣技能升级
	export const REQUEST_WIFE_UPGRADEEXTRASKILL:string = "wife.upgradeextraskill";
	// 道具使用
	export const REQUEST_USE_ITEM:string = "item.use";
	// 道具称号装配
	export const REQUEST_ITEM_TITLE:string = "item.title";
	// 道具头像装配
	export const REQUEST_ITEM_CHANGEPORTRAIT:string = "item.changeportrait";
	// 道具卸下称号,头像框,头像
	export const REQUEST_ITEM_UNSET:string = "item.unset";
	// 商城购买道具
	export const REQUEST_SHOP_BUY_ITEM:string = "shop.buyitem";
	export const REQUEST_SHOP_GETSHOPCFG:string = "shop.getshopcfg";
	
	// 兑换四大谋士
	export const REQUEST_ACTIVITY_EXCHANGEFOURPEOPLE:string = "activity.exchangefourpeople";
	// 牢房惩罚
	export const REQUEST_PRISON_PUNISH:string = "prison.punish";

	//检测是否又豪门订阅特权
	export const REQUEST_SHOP_CHECKHMORDER:string = "shop.checkhmorder";
	/**
	 * 领取首冲奖励
	 */
	export const REQUEST_SHOP_FIRSTCHARGEREWARD:string = "shop.firstchargereward";

	//次充
	export const REQUEST_SHOP_SECONDCHARGEREWARD:string = "shop.secondchargereward";
	/**
	 * 发起寻访
	 */
	export const REQUEST_SEARCH_PLAY:string = "search.play";
	export const REQUEST_SEARCH_PLAYGEM:string = "search.playgem";

	/**
	 * 使用体力丹
	 */
	export const REQUEST_SEARCH_PILL:string = "search.pill";
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
	//秒杀关卡
	export const REQUEST_CHALLENGE_AUTOSMALLATTACK:string="challenge.autosmallattack";
	
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
	// 处理政务
	export const REQUEST_MANAGE_DEALAFFAIR:string = "manage.dealaffair";
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
	export const REQUEST_MANAGE_BUYFINANCE:string="manage.buyfinance";
	
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
	 * 聊天屏蔽分享
	 * local dtype = tonumber(request.params.dtype) or 1 --1本服分享屏蔽 2帮会分享屏蔽
	 */
	export const REQUEST_CHAT_BLOCKSHARE:string="chat.blockshare";
	

	/**
	 * 聊天分享
	 */
	export const REQUEST_CHAT_SENDCHATMSG:string="chat.senddinnermsg";
	export const REQUEST_CHAT_SENDSTUDYATKMSG:string="chat.sendstudyatkmsg";
	export const REQUEST_CHAT_SENDADULTMSG:string="chat.sendadultmsg";
	
	/**
	 * 聊天猫玩验证
	 */
	export const REQUEST_CHAT_MWSIGN:string="chat.mwsign";
	/**
	 * 微信聊天验证
	 */
	export const REQUEST_CHAT_WXSIGN:string="chat.wxsign";

	export const REQUEST_CHAT_CRY:string="chat.cry";
	
	
	/**
	 * 排行榜相关接口
	 */
	export const REQUEST_RANK_INDEX:string="rank.index";
	export const REQUEST_RANK_VISIT:string="rank.visit";
	export const REQUEST_RANK_USERSHOT:string="rank.usershot";


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

	//月夜仙缘 领取建筑奖励
	export const REQUEST_ACTIVITY2S_GETMOONNIGHTBOXREWARD:string="activity2s.getmoonnightboxreward";
	//月夜仙缘活-领取任务奖励
	export const REQUEST_ACTIVITY2S_GETMOONNIGHTTASKREWARD:string="activity2s.getmoonnighttaskreward";
	/*
	 *跨服权势
	 */
	export const REQUEST_ACTIVITY_CROSSPOWER_PRANK : string = "power.prank";//个人排行
	export const REQUEST_ACTIVITY_CROSSPOWER_ZRANK : string = "power.zrank";//跨服区排行
	export const REQUEST_ACTIVITY_CROSSPOWER_AWARD : string = "power.winzidreward";//跨服区排行
	export const REQUEST_ACTIVITY_GERACTIVITYPOWER : string = "power.getactivitypower";
	export const REQUEST_ACTIVITY_ATKRACEGRANK : string = "atkraceg.rankbyzid";
	export const REQUEST_ACTIVITY_IMACYRANK : string = "imacy.rankbyzid";
	export const REQUEST_ACTIVITY_POWERRANK : string = "power.rankbyzid";

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

	/**
	 * 签到接口
	 */
	export const REQUEST_USER_ARRIVAL:string = "user.arrival";

	/**
	 * 获取活动配置
	 */
	export const REQUEST_ACTIVITY_GETACTIVECFG:string="activity.getactivecfg";

	/**
	 * 领取成就奖励
	 */
	export const REQUEST_ACHIEVEMENT_GETREWARDS:string="achievement.getrewards";
	/**
	 * 充值接口
	 */
	export const PAY_PROCESSPAYMENT:string="pay.processpayment";

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
	  export const REQUEST_RECHARGE_GETRECHARGETYPEREWARD:string = "activity.getrechargetypereward";

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
	   * 红颜沐浴
	   * 
	   */
	export const REQUEST_ACTIVITY_GETWIFEBATHINGREWARD = "activity.getwifebathingreward";
	 /**
	  * 领取限时活动奖励
	  */
	export const REQUEST_ACTIVITY_GETLIMITEDREWARD:string = "activity.getlimitedreward";
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

	/**
	 * 领取奖励春节攀升 每天第一个元宝购买任务
	 */
	 export const REQUEST_ACTIVITY_BUYNEWYEARGIFT:string="activity.buynewyeargift";
	
	 /**
	 * 领取解锁功能奖励
	 */
	 export const  REQUEST_OTHERINFO_GETUNLOCKLISTREWARD:string="otherinfo.getunlocklistreward";

	 /**
	 * 领取实名认证奖励（非3k）
	 */
	 export const  REQUEST_OTHERINFO_GETCERTIFICATION:string="otherinfo.getcertification";

	 /**
	 * 获取转移帐号激活码
	 */
	 export const  REQUEST_OTHERINFO_GETPIDENCRYPT:string="otherinfo.getpidencrypt";

	  /**
	 * 设置第一次关卡失败
	 */
	 export const  REQUEST_OTHERINFO_SETFIRSTCHALLENGEFAIL:string="otherinfo.setfirstchallengefail";
	
	 /**
	 * 日本特有 设置第一次年龄确认弹窗
	 */
	export const  REQUEST_OTHERINFO_SETAGEFIRSTFLAG:string="otherinfo.setagefirstflag";




	 export const REQUEST_SERVANT_UPAURA:string = "servant.upaura";
	 export const REQUEST_SERVANT_CHANGE:string = "servant.change";
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
	export const REQUEST_ATKRACE_GETINFO:string="atkrace.getinfo";
	export const REQUEST_ATKRACE_LIST:string="atkrace.list";
	export const REQUEST_ATKRACE_RANK:string="atkrace.rank";
	export const REQUEST_ATKRACE_ATTRBUYLIST:string="atkrace.attrlist";
	export const REQUEST_ATKRACE_REFRESH:string="atkrace.refresh";
	export const REQUEST_ATKRACE_BATCHFIGHT:string="atkrace.batchfight";
	export const REQUEST_ATKRACE_CHOOSE: string = "atkrace.choose";
	
	// 以下接口弃用了
	export const REQUEST_ATKRACE_RANDREWARD:string="atkrace.randreward";
	export const REQUEST_ATKRACE_HANDLE:string="atkrace.handle";
	export const REQUEST_ATKRACE_GETMODEL:string="atkrace.getmodel";
	export const REQUEST_ATKRACE_USEEXTRA:string="atkrace.useextra";

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
	export const REQUEST_BOOKROOM_STUDY_BATCH:string = "bookroom.batchstudy";

	/**
	 * "书院学习(一键)完成接口",
	 */
	export const REQUEST_BOOKROOM_FINISH:string = "bookroom.finish";
	/**
	 * "书院购买席位接口",
	 */
	export const REQUEST_BOOKROOM_BUY:string = "bookroom.buy";
	export const REQUEST_BOOKROOM_INTENSIVESTUDY:string = "bookroom.intensiveStudy";
	
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
	/**
	 * 充值转盘
	 */
	export const REQUEST_ACTIVITY_GETMAYDAYRECHARGELOTTERY : string = "activity.getmaydayrechargelottery";
	export const REQUEST_ACTIVITY_GETMAYDAYRECHARGEITEMA : string = "activity.getmaydayrechargeitema";

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
	//虎牢关-查看活动信息
	export const REQUEST_ACTIVITY_TIGERTRAPPASSINFO: string = "activity.tigertrappassinfo";

	//众筹获得中奖名单
	export const REQUEST_ACTIVITY_LOTTERYWININFO: string = "activity.lotterywininfo";

	/**
	 * 圣诞活动
	 */
	//抽奖
	export const REQUEST_ACTIVITY_GETCHRISTMASREWARD : string = "activity.getchristmasreward";
	//领取任务
	export const REQUEST_ACTIVITY_GETCHRISTMASTASKREWARD : string = "activity.getchristmastaskreward";
	//手标示
	export const REQUEST_ACTIVITY_READCHRISTMASREWARD : string = "activity.readchristmasreward";

	/**
	 * 实名 领奖
	 */
	export const REQUST_OTHERINFO_GETREALNAMEREWARDS:string = "otherinfo.getrealnamerewards";

	/**
	 * 破冰红包
	 */
	//领取破冰红包奖励/抽红包
	export const REQUEST_ACTIVITY_GETICEBREAKINGGIFT : string = "activity.geticebreakingGift";
	//查看当前破冰红包活动数据
	export const REQUEST_ACTIVITY_ICEBREAKINGGIFTINDEX : string = "activity.icebreakingGiftindex";
	/**
	 * 惊喜回馈
	 */
	export const REQUEST_ACTIVITY_GETSURPRISEDGIFTREWARD : string = "activity.getsurprisedgiftreward";


	/**
	 * 
	 * 小额礼包
	 */
	export const REQUEST_ACTIVITY_GETFREEDAILYGIFT : string = "activity.getfreedailygift";
	/**
	 * 手动调用活动model
	 * 
	 */
	export const REQUEST_ACTIVITY_GETACTIVITYMODEL:string = "activity.getactivitymodel";

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
	 *跨服亲密
	 */
	export const REQUEST_ACTIVITY_CROSSIMACY_PRANK : string = "imacy.prank";//个人排行
	export const REQUEST_ACTIVITY_CROSSIMACY_ZRANK : string = "imacy.zrank";//跨服区排行
	export const REQUEST_ACTIVITY_CROSSIMACY_AWARD : string = "imacy.winzidreward";//跨服区排行
	export const REQUEST_ACTIVITY_GERACTIVITYIMACY : string = "imacy.getactivityimacy";

	export const REQUEST_REQUEST_BUY :string="practice.buy";

	/*
	 *称帝战
	 */
	export const REQUEST_EMPEROR_GETACTIVE : string = "emperor.getactive";//个人排行
	/**
	 * 分享成功的接口
	 */
	export const REQUST_OTHERINFO_GETGENERALSHARE:string = "otherinfo.getgeneralshare";

	/**
	 * 群组分享领奖
	 */
	export const REQUEST_OTHERINFO_GETTHEREALSHARE:string = "otherinfo.gettherealshare";
	/**
	 * 获取真分享奖励
	 */
	// export const REQUST_OTHERINFO_GETTHEREALSHARE:string = "otherinfo.gettherealshare";
	/**
	 * twitter每日分享成功的接口
	 */
	export const REQUST_OTHERINFO_GETSHAREREWARD:string = "otherinfo.getsharereward";
	/**
	 * 更新分享的状态
	 */
	export const REQUST_OTHERINFO_CHANGSHARE:string = "otherinfo.changshare";

	/**
	 * 七夕灯会
	 */
	export const REQUST_DOUBLESEVEN_GETREWARD:string = "activity.getdoubleSeventhitema";

	// 分享引导
	export const REQUEST_GETSHAREGUIDE : string = "user.getshareguide";//获取引导文案
	export const REQUEST_GETSHAREGUIDEREWARD : string = "otherinfo.getshareguidereward";//领取分享奖励
	export const REQUEST_STATSUPDATESHAREDATA : string = "stats.updatesharedata";//更新情景分享数据
	export const REQUEST_SHAREADDCOPYSHARENUM : string = "share.addcopysharenum";//更新情景分享数据

	export const REQUEST_OTHERINFO_GETTYPESHAREREWARD : string = "otherinfo.gettypesharereward";//门客分享

	export const REQUEST_USER_ARRIVALNEW: string = "user.arrivalnew";//新七日签到领取奖励

	/**
	 * 限时礼包 取消强弹标识
	 */
	export const REQUEST_SHOP_SHOW1COSTSCENEGIFT: string = "shop.show1costscenegift";
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
	 * 分享加一次经营
	 * 
	 */
	export const REQUEST_MANAGE_SHAREFINANCE : string = "manage.sharefinance";
	/**
	 * 分享恢复战斗次数
	 * 
	 */
	export const REQUEST_CHALLENGE_SHARERECOVER : string = "challenge.sharerecover";

	/**
	 * 微信平台分享次数
	 */
	export const REQUEST_OTHERINFO_SETSHARENUM: string = "otherinfo.setsharenum";


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
	 * 红莲勇士领取次数奖励
	 */
	export const ACTIVITY_REDLOTUSWARRIORNUMREWARD:string = "activity.redlotuswarriornumreward";
	/**
	 * 红莲勇士攻击
	 */
	export const ACTIVITY_REDLOTUSWARRIORATTACKTHEBOSS:string = "activity.redlotuswarriorattacktheboss";
	/**
	 * 活动红点已读
	 */
	export const REQUEST_ACTIVITY_READACTIVE : string = "activity.readactive";
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
	 * [百服活动]充值返利  领取奖励
	 */
	export const REQUST_ACTIVITY_GETRECHARGEBOXREWARD:string = "activity.getrechargeboxreward";

	/**
	 * 新特别狂欢包厢 充值返利  领取奖励
	 */
	export const REQUST_ACTIVITY_GETRECHARGEBOXSPREWARD:string = "activity.getrechargeboxspreward";


	export const REQYEST_ACTIVITY_DAILY_CHECKRED:string="activity.dailyactivityclickredpoint";
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
	 * 双 11 排行榜相关
	 */
	export const REQYEST_ACTIVITY_GET_SINGLE_DAY_RANK:string="activity.getsingledayrank";

	export const REQYEST_ACTIVITY_BUYSINGLEDAYSHOP:string="activity.buysingledayshop";
	

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
	* 亲家消息
	*/
	export const REQUEST_SADUN_GETINFO : string = "sadun.getinfo";//亲家消息
	export const REQUEST_SADUN_VISIT : string = "sadun.visit";//拜访请求
	export const REQUEST_SADUN_CANCELVISIT : string = "sadun.cancelvisit";//取消拜访
	export const REQUEST_SADUN_REFUSEVISIT : string = "sadun.refusevisit";//拒绝拜访 参数 fchildId , fuid
	export const REQUEST_SADUN_AGREEVISIT : string = "sadun.agreevisit";//拒绝拜访 参数 childId , fuid，wifeId
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
	export const REQUEST_ALLIANCETASK_OPENALLIANCETASK : string = "alliancetask.openalliancetask";
	
	/**
	 * 排行榜相关接口
	 */

	export const REQUEST_RANKG_INDEX:string="rankg.index";
	export const REQUEST_RANKG_VISIT:string="rankg.visit";
	export const REQUEST_RANKG_USERSHOT:string="rankg.usershot";

	export const REQUEST_ATKRACE_USERSHOT:string="atkraceg.usershot";
	export const REQUEST_IMACY_USERSHOT:string="imacy.usershot";
	export const REQUEST_POWER_USERSHOT:string="power.usershot";


	/**
	 * 翠玉生辉活动
	 */
	export const REQUEST_ACTIVITY_GETJADERANK:string="activity.getjaderank";
	export const REQUEST_ACTIVITY_GETJADEITEMA:string="activity.getjadeitema";
	export const REQUEST_ACTIVITY_SETJADELOCK:string="activity.setjadelock";

	// 虎牢关
	export const REQUEST_ACTIVITY_TIGERTRAPPASSATTACKTHEBOSS:string="activity.tigertrappassattacktheboss";
	export const REQUEST_ACTIVITY_REDEEMSKIN:string="activity.redeemskin";

	// 暴击虎牢关
	export const REQUEST_ACTIVITY_HULAOSHOPGIFT:string="activity.hulaoshopgift";
	export const REQUEST_ACTIVITY_HULAOATTACKTHEBOSS:string="activity.hulaoattacktheboss";
	export const REQUEST_ACTIVITY_HULAONUMREWARD:string="activity.hulaonumreward";
	export const REQUEST_ACTIVITY_HULAOREDEEMSKIN:string="activity.hulaoredeemskin";



	export const REQUEST_CROSSCHAT_SENDMSG : string = "crosschat.sendmsg";//跨服聊天发送消息
	export const REQUEST_CROSSCHAT_GETMSG : string = "crosschat.getmsg";//跨服聊天获取消息

	/**
	 * 私聊
	 */
	export const REQUEST_PRICHAT_GETMSG : string = "privatechat.getmsg";
	export const REQUEST_PRICHAT_SENDMSG : string = "privatechat.sendmsg";
	export const REQUEST_PRICHAT_SETREAD : string = "privatechat.setisread";
	export const REQUEST_PRICHAT_PUSHMSG : string = "push.msg";

	/**
	 * 设置玩家已沉迷
	 */
	 export const REQUEST_OTHERINFO_SETREST : string = "otherinfo.setrest";

	 /**
	  * 记录3号实名认证信息
	  */
	 export const REQUEST_OTHERINFO_IDCARDVERIFY : string = "otherinfo.idcardverify";

	 /**
	  * 微信小游戏，添加到我的小程序后，领奖
	  */
	 export const REQUEST_OTHERINFO_GETWXADDMYPROREWARD : string = "otherinfo.getwxaddmyproreward";

	 /**
	  * 微信小游戏，悬浮窗进入后，领奖
	  */
	 export const REQUEST_OTHERINFO_GETWXADDFLOAT : string = "otherinfo.getwxaddfloat";

	 /**
	  * 游戏统计
	  */
	 export const REQUEST_STATS_CLICKEVENT : string = "stats.clickevent";

	 /**
	  * 帮会充值
	  */
	  export const REQUEST_ACTIVITY_GETALLICHARGEINFO: string = "activity.getallichargeinfo";
	  //领取奖励
	  export const REQUEST_ACTIVITY_GETALLICHARGEREWARD:string = "activity.getallichargereward";



	 //以下为统计类型
	 /**
	  * pos 1主界面按钮 2另外1个
	  * kid = vithirdpay
	  */
	 export const KID_VITHIRDPAY : string = "vithirdpay";
	  /**
	  * pos 位置id1=点击【营救红颜】活动的入口
		位置id2=点击活动界面的【商铺兑换】按钮
		位置id3=点击活动界面的【排行奖励】按钮
	  * kid = rescueAc
	  */
	 export const KID_RESCUEAC : string = "rescueAc";
	  /**
	  * pos 
	    位置id1=点击【筑阁祭天】活动的入口
		位置id2=点击【活动任务】按钮
		位置id3=点击【100%的箱子（仅限查看）】按钮
		位置id4=点击【活动任务里的大红颜】按钮
	  * kid = buildingWorshipAc 筑阁祭天统计
	  */
	 export const KID_BUILDINGWORSHIPAC : string = "buildingWorshipAc";
	 /**
	  * 特别宝箱
	  */
	 export const KID_RECHARGEBOXSPAC: string = "rechargeBoxSPAc";
	 /**
	  * 七夕情人节
	  */
	 export const KID_DOUBLESEVENTH: string = "doubleSeventh";

	 /**
	  * 跳过新手剧情
	  */
	 export const KID_NEWPLAYERSKIP: string = "newplayerskip";
	  /**
	  * 支付面板弹出统计
	  */
	 export const KID_GAMEPAYCLICK: string = "gamepayclick";


	 /**
	 * 支付点击统计
	 */
	export const REQUST_STATS_CLICKPAYEVENT:string = "stats.clickpayevent";
	 	/**
	 * 议事院信息
	 */
	export const REQUST_COUNCIL_GETEVENTINFO:string = "council.geteventinfo";
	export const REQUST_COUNCIL_GETEVENTDETAIL:string = "council.getdetailinfo";
	export const REQUST_COUNCIL_JOINEVENT:string = "council.joincouncil";
	export const REQUST_COUNCIL_GETRANK:string = "council.getrank";
	export const REQUST_COUNCIL_GETREWARD:string = "council.getrewards";



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

	
	export const REQUEST_SERVANT_UPAMUAURA:string = "servant.upamuletaura";  //护符升级

	//夺帝
	export const REQUEST_KINGS_KINGINFO :string = "king.kinginfo"
	export const REQUEST_KINGS_VOTE :string = "king.kingvote"
	export const REQUEST_KINGS_TASK :string = "king.kingtask"
	export const REQUEST_KINGS_EXCHANGE :string = "king.kingexchange"
	export const REQUEST_KINGS_CONVERT :string = "king.convert"

	/**
	 * 营救红颜
	 */
	 export const REQUEST_ACTIVITY_GETRESCUEACTIVE:string="activity.getrescueactive";
	 export const REQUEST_ACTIVITY_BUYRESCUEITEM:string="activity.buyrescueitem";
	 export const REQUEST_ACTIVITY_USERESCUEITEM:string="activity.userescueitem";
	 export const REQUEST_ACTIVITY_ATTACKRESCUEBOSS:string="activity.attackrescueboss";
	 export const REQUEST_ACTIVITY_BUYRESCUESHOP:string="activity.buyrescueshop";
	 export const REQUEST_ACTIVITY_GETRESCUEREWARD:string="activity.getrescuereward";

	 // 筑阁祭天
	 export const REQUEST_ACTIVITY_GETBUILDINGWORSHIPREWARD:string="activity.getbuildingworshipreward"; // 抽奖
	 export const REQUEST_ACTIVITY_GETBUILDINGWORSHIPBOXREWARD:string="activity.getbuildingworshipboxreward"; // 领取箱子奖励
	 export const REQUEST_ACTIVITY_GETBUILDINGWORSHIPTASKREWARD:string="activity.getbuildingworshiptaskreward"; // 领取任务奖励

	 // 荷塘月色
	 export const REQUEST_ACTIVITY2S_GETMOONLIGHTREWARD:string="activity2s.getmoonlightreward"; // 抽奖
	 export const REQUEST_ACTIVITY2S_GETMOONLIGHTBOXREWARD:string="activity2s.getmoonlightboxreward"; // 领取箱子奖励
	 export const REQUEST_ACTIVITY2S_GETMOONLIGHTTASKREWARD:string="activity2s.getmoonlighttaskreward"; // 领取任务奖励
	 
	 // 许愿天灯
	 export const REQUEST_ACTIVITY2S_GETLANTERNLOTTERY:string="activity2s.getlanternlottery"; // 许愿天灯活动抽奖
	 export const REQUEST_ACTIVITY2S_GETLANTERNRATE:string="activity2s.getlanternrate"; // 许愿天灯活动进度领奖
	 export const REQUEST_ACTIVITY2S_GETLANTERNITEMT:string="activity2s.getlanternitemt"; // 许愿天灯活动任务奖励
	 export const REQUEST_ACTIVITY2S_GETLANTERNNOTE:string="activity2s.getlanternnote"; // 许愿天灯活动留言领奖

	 // 欢心夏日
	 export const REQUEST_ACTIVITY2S_GETSEASIDEGAMEREWARD:string="activity2s.getseasidegamereward"; // 抽奖
	 export const REQUEST_ACTIVITY2S_GETSEASIDEGAMEBOXREWARD:string="activity2s.getseasidegameboxreward"; // 领取箱子奖励
	 export const REQUEST_ACTIVITY2S_GETSEASIDEGAMETASKREWARD:string="activity2s.getseasidegametaskreward"; // 领取任务奖励

	 /**大宴乡勇-领取充值奖励 */
	 export const REQUEST_ACTIVITY2S_GETJURAKUDAIRECHARGEREWARD:string = "activity2s.getjurakudairechargereward";
	 /**大宴乡勇-领取任务奖励 */
	 export const REQUEST_ACTIVITY2S_GETJURAKUDAITASKREWARD:string = "activity2s.getjurakudaitaskreward";
	 /**大宴乡勇-领取保底门客 */
	 export const REQUEST_ACTIVITY2S_GETJURAKUDAIBOXREWARD:string = "activity2s.getjurakudaiboxreward";
	 /**大宴乡勇-抽奖 */
	 export const REQUEST_ACTIVITY2S_GETJURAKUDAIREWARD:string = "activity2s.getjurakudaireward";

	 //携美同游
	 export const REQUEST_ACTIVITY_GETSPRINGOUTINGREWARD:string="activity.getspringoutingreward"; // 抽奖
	 export const REQUEST_ACTIVITY_GETSPRINGOUTINGBOXREWARD:string="activity.getspringoutingboxreward"; // 领取箱子奖励
	 export const REQUEST_ACTIVITY_GETSPRINGOUTINGTASKREWARD:string="activity.getspringoutingtaskreward"; // 领取任务奖励
	 export const REQUEST_ACTIVITY_GETFIRSTOPENSPRINGOUTING:string="activity.getfirstopenspringouting"; // 携美同游-记录首次进入

	 // 合服纪念活动
	 export const REQUEST_ACTIVITY_GETMERGEZONETIME:string="activity.getmergezonetime"; // 查询合服时间
	 export const REQUEST_ACTIVITY_GETMERGEACTIVEITEML:string="activity.getmergeactiveiteml"; // 领取登录奖励
	 export const REQUEST_ACTIVITY_GETMERGEACTIVEITEMT:string="activity.getmergeactiveitemt"; // 领取任务奖励
	 export const REQUEST_ACTIVITY_BUYMERGEACTIVESHOP:string="activity.buymergeactiveshop"; // 特卖商店购买物品
	 export const REQUEST_ACTIVITY_GETMERGEACTIVEITEMC:string="activity.getmergeactiveitemc"; // 特卖商店购买物品

 	 export const REQUEST_CROSS_SERVANT_RANKINFO:string="crossservantpower.servantpowerinfo"; // 排行信息
	 export const REQUEST_CROSS_SERVANT_TASKREWARD:string="crossservantpower.getcsstaskreward"; // 领取任务奖励

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
	
	 export const REQUEST_OTHERINFO_QUESTIONNAIRE:string="otherinfo.questionnaire"; // 领取任务奖励
	/**新问卷调查 */
	export const REQUEST_OTHERINFO_UNIQUE_QUESTIONNAIRE:string="otherinfo.uniquequestionnaire"; 
	/**
	 * 微信客服礼包领奖励
	 */
	export const REQUEST_OTHERINFO_GETWXCHATWARD:string="otherinfo.getwxchatward";

	/*
	* 可汗活动 商店购买、积分兑换
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

	/*
	* 可汗活动 商店购买、积分兑换
	*/
	export const REQUEST_WIPEBOSS_SHOPBUY : string = "wipeboss.shopbuy";
	export const REQUEST_WIPEBOSS_SEARCH : string = "wipeboss.search";
	export const REQUEST_WIPEBOSS_ATTACK : string = "wipeboss.attack";
	export const REQUEST_WIPEBOSS_BUYSEARCH : string = "wipeboss.buysearch";
	export const REQUEST_WIPEBOSS_GETBOSSHP: string = "wipeboss.getbosshp";
	export const REQUEST_WIPEBOSS_GETRANK: string = "wipeboss.getrank";
	export const REQUEST_WIPEBOSS_GETBOSSNUM: string = "wipeboss.getbossnum";
	export const REQUEST_WIPEBOSS_RECOVER : string = "wipeboss.recoverservant";
	export const REQUEST_WIPEBOSS_ENEMY : string = "wipeboss.enemy";
	export const REQUEST_WIPEBOSS_KILLLOG : string = "wipeboss.getkilllog";

		/**
	 * 皮肤修改
	 */
	export const REQUST_CROSSSKIN_GETSKINRANK :string = "crossskin.getskinrank";
	export const REQUST_CROSSSKIN_GETSKINFIRST :string = "crossskin.getskinfirst";
	export const REQUST_CROSSSKIN_USERSKINSHOT :string = "crossskin.userskinshot";


	//刺客首领
	export const REQUST_ALLIANCE_OPENINFINITY :string = "alliance.openinfinity"; //"开启军团无限副本",
	export const REQUST_ALLIANCE_GETINFINITYRANK :string = "alliance.getinfinityrank";//"获得军团无限副本攻击排行榜",
	export const REQUST_ALLIANCE_ATTACKINFINITY :string = "alliance.attackinfinity"; //"攻击军团无限副本",
	export const REQUST_ALLIANCE_GETINFINITYLOG :string = "alliance.getinfinitylog"; //"攻击军团无限副本",
	

	export const REQUST_ALLIANCETASK_BATCHFIGHT :string = "alliancetask.batchfight";
	/**
	 * 绝地擂台排行榜
	 */
	export const REQUEST_BATTLEGROUND_GETANK:string = "battleground.getrank";
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

	/**活动的首次标记 */
	export const REQUEST_ACTIVITY_FIRSTFLAG:string="activity.firstflag";

	export const REQUEST_FANLI_GETOPEN_FIRST : string = "activity.getfirstopenfanli"; //"范蠡活动-记录首次进入",
	export const REQUEST_FANLI_GETREWARD : string = "activity.getfanlireward"; // "范蠡活动-抽取奖励",
	export const REQUEST_FANLI_GETBOXREWARD : string = "activity.getfanliboxreward"; //"范蠡活动-领取箱子奖励",

	export const REQUEST_ACTIVITY2S_GETWIFESKINREWARD : string = "activity2s.getwifeskinreward"; // "红颜皮肤活动-抽取奖励",
	export const REQUEST_ACTIVITY2S_GETWIFESKINBOXREWARD : string = "activity2s.getwifeskinboxreward"; //"红颜皮肤活动-领取箱子奖励",

	//真田幸村
	export const REQUEST_ACTIVITY_XINGCUN_ITEM:string = "activity.getxingcunitemt"


	export const REQUEST_ACTIVITY_RANSTACKATTACK = "activity.ransacktraitorattack" //"搜查奸臣-搜查",
	export const REQUEST_ACTIVITY_RANSTACKATTACK_SKIN:string = "activity.rtredeemskin" //"搜查奸臣-兑换奖励",

	//查抄奸臣 周年
	export const REQUEST_ACTIVITY2S_RSTSPSEARCH = "activity2s.rstspsearch" //"搜查奸臣-搜查",
	export const REQUEST_ACTIVITY2S_RSTSPEXCHANGE:string = "activity2s.rstspexchange" //"搜查奸臣-兑换奖励",

	//夜观天象 周年
	export const REQUEST_ACTIVITY2S_STAZERSERCH = "activity2s.stazersearch" //"搜查奸臣-搜查",
	export const REQUEST_ACTIVITY2S_STAZEREXCHANGE:string = "activity2s.stazerexchange" //"搜查奸臣-兑换奖励",

	//夜观天象 单人
	export const REQUEST_ACTIVITY2S_STARGAZERSINGLEATTACK = "activity2s.stargazersingleattack" //"夜观天象-搜查",
	export const REQUEST_ACTIVITY2S_SGREDEEMSKIN:string = "activity2s.sgredeemskin" //"夜观天象-兑换奖励",

	//翻牌活动
	export const REQUEST_ACTIVITY_FLIPCARD_GETREWARD:string = "activity.getflipcardreward" //"翻牌活动-单次翻牌奖励", 参数 抽奖 tid   X
	export const REQUEST_ACTIVITY_FLIPCARD_GET_ALL_REWARD:string = "activity.getflipcardallreward" //"翻牌活动-剩余牌全部翻奖励",
	export const REQUEST_ACTIVITY_FLIPCARD_REPLACE:string = "activity.getflipcardreplace" // "翻牌活动-刷新牌组" 
	export const REQUEST_ACTIVITY_FLIPCARD_BOX_REWARD:string = "activity.getflipcardboxreward" //"翻牌活动-领取箱子奖励",,参数 gid：第几阶段 
	export const REQUEST_ACTIVITY_FLIPCARD_TASK_REWARD:string = "activity.getflipcardtaskreward" //"翻牌活动-领取任务奖励", -参数 taskId 任务档位id


	//平成时代
	export const REQUEST_ACTIVITY2S_GETREIGNTITLEREWARD:string = "activity2s.getreigntitlereward";			//"平成时代-领取头像框",
	export const REQUEST_ACTIVITY2S_BUYREIGNTITLETASKREWARD:string = "activity2s.buyreigntitletaskreward";	//平成时代-购买任务奖励",
	export const REQUEST_ACTIVITY2S_GETREIGNTITLETASKREWARD:string = "activity2s.getreigntitletaskreward";	//平成时代-领取任务奖励",
	export const REQUEST_ACTIVITY2S_GETREIGNTITLERANDREWARD:string = "activity2s.getreigntitlerandreward";	//平成时代-获取随机奖励"
	export const REQUEST_ACTIVITY2S_REPLACEREIGNTITLE:string = "activity2s.replacereigntitle";	//平成时代-兑换文字奖励


	export const REQUEST_ACTIVITY2_MONOPOLY_GET_ITEMS_T:string = "activity2s.getmonopolyitemt" //"大富翁活动-任务完成领奖", 参数 activeId 活动Id 参数 taskId 档位id -参数 thedays 第几天 
	export const REQUEST_ACTIVITY2_MONOPOLY_GET_ITEMS_A:string = "activity2s.getmonopolyitema" //"大富翁活动-任务完成领奖", 参数 activeId 活动Id turnId 轮次id data.rewards 奖励
	export const REQUEST_ACTIVITY2_MONOPOLY_GET_DICING:string = "activity2s.monopolydicing" //"大富翁活动-掷骰子"", 参数 activeId 活动Id 参数 taskId 返回 data.rewards 奖励 data.step 本次投掷骰子数

	// 玩吧领取vip特权礼包
	export const REQUEST_OTHERINFO_GETWBVIPGIFTREWARD:string = "otherinfo.getwbvipgiftreward";

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
	//qq会员
	export const REQUEST_OTHERINFO_GETWBQQREWARD: string = "otherinfo.getwbqqreward";

	//投壶活动接口
	/**抽奖 */
	export const REQUEST_ACTIVITY_THROWARROWLOTTERY:string = "activity2s.throwarrowlottery"; 
	/**次数奖励 领取奖励 */
	export const REQUEST_ACTIVITY_THROWARROWGETACHIEVEMENTRWD:string = "activity2s.throwarrowgetachievementrwd"; 
	/**充值奖励 领取奖励 */
	export const REQUEST_ACTIVITY_THROWARROWGETRECHARGERWD:string = "activity2s.throwarrowgetrechargerwd"; 
	/**log */
	export const REQUEST_ACTIVITY_THROWARROWGETLOGS:string = "activity2s.throwarrowgetlogs"; 
	/**
	 * 领取防诈骗奖励
	 */
	export const REQUEST_USER_GETANTIDECEPTION:string = "user.getantideception";
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
	 *  --参数 activeId 活动Id
    --参数 issure 是否确认答题，传1
    --返回 model activity，item
    --返回 data.rewards 上次答题奖励（可能有）
	 */
	export const REQUEST_ACTIVITY2S_ANSWERWIN : string = "activity2s.answerin"; // "科举考核-活动入口&二次确认答题"
	
	/**
	 *  --参数 activeId 活动Id
    --参数 issure 是否确认答题，传1
    --返回 model activity，item
    --返回 data.rewards 上次答题奖励（可能有）
	 */
	export const REQUEST_ACTIVITY2S_ANSWEROPT : string = "activity2s.answeropt"; // 

	/*
	 --参数 activeId 活动Id
    --参数 issure 是否确认答题，传1
    --返回 model activity，item
    --返回 data.rewards 上次答题奖励（可能有）
	*/
	export const REQUEST_ACTIVITY2S_ANSWERRANK : string = "activity2s.answerrank"; 


		//电玩大本营
	/**电玩大本营-- recive charge reward */
	export const REQUST_ACTIVITY_ARCADEGETCHARGE:string = "activity2s.arcadegetcharge";

	/**电玩大本营--recive task reward */
	export const REQUST_ACTIVITY_ARCADEGETTASKRWD:string = "activity2s.arcadegettaskrwd";

	/**电玩大本营--积分兑换 */
	export const REQUST_ACTIVITY_ARCADESHOPBUY:string = "activity2s.arcadeshopbuy";

	/**电玩大本营--抽奖 */
	export const REQUST_ACTIVITY_ARCADELOTTERY:string = "activity2s.arcadelottery";

	/**电玩大本营--日志 */
	export const REQUST_ACTIVITY_ARCADEGETLOGS:string = "activity2s.arcadegetlogs";

	export const REQUST_ACTIVITY_ARCADEINFO:string = "activity2s.arcadeinfo"; //"欢乐时光老虎机活动-查看活动",
	export const REQUST_ACTIVITY_WININFO:string = "activity2s.arcadewininfo";// "欢乐时光老虎机活动-奖励列表",

	/**
	 *   --参数 activeId 活动Id
    --参数 lotterynum 是否10连抽 1是 0否
    --返回 data.rewards 奖励
    --返回 data.model(activity)
	 */
	export const REQUST_ACTIVITY_GETPACKREWARD:string = "activity2s.getpackreward";// 获取周年庆-旧红颜皮肤特惠 抽奖 的 奖励",

	/**
	 * 参数 activeId 活动Id
    --返回 data.rewards 奖励
    --返回 data.model(activity)
	 */
	export const REQUST_ACTIVITY_GETPACK_BOXREWARD:string = "activity2s.getpackboxreward";// "领取周年庆-旧红颜皮肤特惠活动的宝箱奖励",

	export const REQUST_ACTIVITY_YEARRANKIN:string = "activity2s.yearrankin";// "领取周年庆-风流天子入口",
	
	export const REQUST_ACTIVITY_YEAR_DAYSIGN:string = "activity2s.getoneyearsignreward";// "领取周年庆-风流天子入口",
	export const REQUST_ACTIVITY_YEAR_OVERVIEW:string = "activity2s.oneyearoverviewinfo";// "领取周年庆-总览",

	export const REQUEST_ADULT_GETMINFO:string="adult.getminfo";
	export const REQUEST_ADULT_GETINFO:string="adult.getinfo";
	
	/** 注册七日-领取奖励 */
	export const REQUEST_OTHERINFO_GETLOGINWEEKREWARD = "otherinfo.getloginweekreward";
	/** 注册七日-购买物品 */
	export const REQUEST_OTHERINFO_BUYLOGINWEEKGIFT = "otherinfo.buyloginweekgift";
	/** 注册七日-设置新弹出标识 */
	export const REQUEST_OTHERINFO_SETLOGINWEEKFIRSTFLAG = "otherinfo.setloginweekfirstflag";
	/** 麦田飘香 */
	export const REQUEST_RYEHARVEST_SENDFLOWERS = "activity2s.getryeharvestreward";
	/** 麦田飘香 */
	export const REQUEST_RYEHARVEST_GETBOX = "activity2s.getryeharvestboxreward";
	/** 麦田飘香 */
	export const REQUEST_RYEHARVEST_GETBIGPRIZE = "activity2s.getryeharvestbigprize";
	/** 麦田飘香 */
	export const REQUEST_RYEHARVEST_GETCHARGE = "activity2s.getryeharvesttaskreward";
	/** 麦田飘香 */
	export const REQUEST_RYEHARVEST_GETRYEHARVESTTASK = "xxx";
	/** 麦田飘香 */
	export const REQUEST_RYEHARVEST_BUYRYEHARVESTSHOP = "xxx";
	/** 麦田飘香 */
	export const REQUEST_MOTHERDAY_EXCHANGEMOTHERDAYSCENE = "xxx";
	/**零元礼包红点 */
	export const REQUEST_ZEROGIFT_FIRSTFLAG = "otherinfo.setzerogiftfirstflag";
	/**零元礼包购买 */
	export const REQUEST_BUY_ZEROGIFT = "otherinfo.buyzerogift";
	/**箭无虚发 射箭 */
	export const REQUEST_ARROW_SHOOTING = "activity2s.arrowshooting";
	/**箭无虚发 升级箭矢 */
	export const REQUEST_ARROW_UPLEVEL = "activity2s.arrowuplevel";
	/**箭无虚发 领取宝箱奖励 */
	export const REQUEST_ARROW_GETBOSREWARD = "activity2s.arrowgetboxreward";
	/**箭无虚发 获取排行榜 */
	export const REQUEST_ARROW_GETRANK = "activity2s.arrowgetrank";
	/** 性转设定
	 * -参数 stype 设定类型 1表示置开关 2表示设置男女冯小怜
    	--参数 sflag 开关值 大于等于1表示开 否则表示关
	 */
	export const REQUEST_USER_REVERSIONSETTING = "user.reversionsetting";

	/**追缴贼寇-抽取奖励" */
	export const REQUEST_CHASEBANDIT_ATKBOSS = "activity2s.getchasebanditreward";
	/**追缴贼寇-领取箱子奖励" */
	export const REQUEST_CHASEBANDIT_BOXREWARD = "activity2s.getchasebanditboxreward";
	/**追缴贼寇-领取任务奖励" */
	export const REQUEST_CHASEBANDIT_TASKREWARD = "activity2s.getchasebandittaskreward";

	
	/** 红颜性转设置
	 * -参数 wifeId 红颜ID 
    --参数 sexflag 性别设置 大于等于1表示置为男红颜 否则为女红颜
	 */
	export const REQUEST_WIFE_WIFESEXSETTING = "wife.wifesexsetting";



	//新科举全屏活动
	/**
	 *  --参数 activeId 活动Id
    --参数 issure 是否确认答题，传1
    --返回 model activity，item
    --返回 data.rewards 上次答题奖励（可能有）
	 */
	export const REQUEST_ACTIVITY2S_NEWANSWERWIN : string = "activity2s.newanswerin"; // "科举考核-活动入口&二次确认答题"
	
	/**
	 *  --参数 activeId 活动Id
    --参数 issure 是否确认答题，传1
    --返回 model activity，item
    --返回 data.rewards 上次答题奖励（可能有）
	 */
	export const REQUEST_ACTIVITY2S_NEWANSWEROPT : string = "activity2s.newansweropt"; // 

	/*
	 --参数 activeId 活动Id
    --参数 issure 是否确认答题，传1
    --返回 model activity，item
    --返回 data.rewards 上次答题奖励（可能有）
	*/
	export const REQUEST_ACTIVITY2S_NEWANSWERRANK : string = "activity2s.newanswerrank"; 


	/** 狂欢之夜基本信息*/
	export const REQUEST_ACTIVITY2S_GETCARNIVALINFO : string = "activity2s.getcarnivalinfo"; 
	/** 狂欢之夜活动攻击*/
	export const REQUEST_ACTIVITY2S_CARNIVALATTACK : string = "activity2s.carnivalattack"; 
	/** 狂欢之夜活动任务奖励*/
	export const REQUEST_ACTIVITY2S_GETCARNIVALITEMT : string = "activity2s.getcarnivalitemt";
	/** 狂欢之夜活动轮次完成领奖*/
	export const REQUEST_ACTIVITY2S_GETCARNIVALITEMA : string = "activity2s.getcarnivalitema";  
	/** 狂欢之夜活动消耗完成领奖*/
	export const REQUEST_ACTIVITY2S_GETCARNIVALITEMU : string = "activity2s.getcarnivalitemu";  

	/** 双十一活动总览*/
	export const REQUST_ACTIVITY_SINGLEDAYOVERVIEWINFO:string = "activity2s.singledayoverviewinfo";
	/** 双十一元宝抽奖活动抽奖*/
	export const REQUST_ACTIVITY_GEMLOTTERYDRAW:string = "activity2s.gemlotterydraw";
	/** 双十一元宝消耗冲榜*/
	export const REQUEST_ACTIVITY2S_GEMEXPENDRANK:string="activity2s.gemexpendrank";

	/** 设置用户自己字符串*/
	export const REQUEST_OTHERINFO_SETKV:string="otherinfo.setkv";

	//定军中原
	export const REQUEST_MAINLAND_GETINFO:string = "conquermainland.getinfo"; 
	export const REQUEST_MAINLAND_GETMAPINFO:string = "conquermainland.getmapinfo"; 
	export const REQUEST_MAINLAND_GETMYTEAMINFO:string = "conquermainland.getmyteam";
	export const REQUEST_MAINLAND_SELECTSERVANT:string = "conquermainland.selectservant";
	export const REQUEST_MAINLAND_GETCITYINFO:string = "conquermainland.getbuildinginfo";
	export const REQUEST_MAINLAND_CANCELSERVANT:string = "conquermainland.cancelservant";
	export const REQUEST_MAINLAND_PRANK:string = "conquermainland.getrank";
	export const REQUEST_MAINLAND_ZRANK:string = "conquermainland.getzidrank";
	export const REQUEST_MAINLAND_RECORDLIST:string = "conquermainland.getlist";
	export const REQUEST_MAINLAND_RECORDLOG:string = "conquermainland.getlog";
		
	/**
	 * 领取g71，g72档位奖励
	*/
	export const REQUEST_SHOP_THREECHARGEREWARD:string = "shop.threechargereward";

	 /**
	  * "获取服务器信息",    --返回 opentime 开服时间
	  */
	  export const REQUEST_OTHERINFO_GETSERVERINFO: string = "otherinfo.getserverinfo";

	/**
	 * 2019圣诞活动
	 */
	//抽奖
	export const REQUEST_ACTIVITY2S_GETMERRYXMASREWARD : string = "activity2s.getmerryxmasreward";
	//领取任务
	export const REQUEST_ACTIVITY2S_GETMERRYXMASTASKREWARD : string = "activity2s.getmerryxmastaskreward";
	//进度奖励
	export const REQUEST_ACTIVITY2S_GETMERRYXMASBOXREWARD : string = "activity2s.getmerryxmasboxreward";


	export const REQUEST_ACTIVITY2S_GETTHXGIVINGREWARD : string = "activity2s.getthxgivingreward";//获取感恩节晚餐活动的奖励
	export const REQUEST_ACTIVITY2S_GETTHXGIVINGBOXREWARD : string = "activity2s.getthxgivingboxreward";//获取感恩节晚餐活动的宝箱奖励


	/**
	 * 五虎进度奖励
	 */
	export const REQUEST_ACTIVITY2S_GETFIVETIGERBOXREWARD:string = "activity2s.getfiveTigerboxreward";
	/**
	 * 五虎攻击
	 */
	export const REQUEST_ACTIVITY2S_GETFIVETIGERREWARD:string = "activity2s.getfiveTigerreward";

	/**
	 * 征收入口
	 */
	export const REQUEST_LEVY_INDEX:string = "levy.index";
	/**
	 * 征收选择/撤回门客
	 */
	export const REQUEST_LEVY_SELECTSID:string = "levy.selectsid";
	/**
	 * 征收 同步用户信息
	 */
	export const REQUEST_LEVY_CALC:string = "levy.calc";
	


	

	/**
	 * 移动小人
	 */
	export const REQUEST_MAP_MVPOS:string = "map.mvpos";
	/**
	 * 购买小人
	 */
	export const REQUEST_MAP_BUYPERSON:string = "map.buyperson";
	/**
	 * 合成小人
	 */
	export const REQUEST_MAP_LVUP:string = "map.lvup";
	/**
	 * 快速合成小人
	 */
	export const REQUEST_MAP_LVUPBATCH:string = "map.lvupbatch";
	/**
	 * 删除小人
	 */
	export const REQUEST_MAP_DELPERSON:string="map.delperson";
	/**
	 * 装备升级
	 */
	export const REQUEST_SERVANT_EQUIPLEVELUP:string="servant.useequipitem";
	export const REQUEST_SERVANT_EQUIPQUALITYUP:string="servant.upequipclv";
	export const REQUEST_SERVANT_ACTIVECOMB:string="servant.activecombination";
	/**记录客户端引导数据 */
	export const REQUEST_USER_RECORDGUILD:string="user.recordguild";

}