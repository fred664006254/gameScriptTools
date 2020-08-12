/**
 * 网络通信请求常量
 * author 陈可
 * date 2017/9/15
 * @class NetManager
 */
namespace NetConst 
{
	// 前端聊天请求类型(不是接口)
	export const CLIENT_CHAT:string = "client_chat";
	// 用户登录请求
	export const USER_LOGIIN:string = "user.login";
	// gettoken
	export const GETACCESS_TOKEN:string = "getToken";

	export const TRACKEVENT_STATS="";

	/**战斗初始化 */
	export const BATTLE_INIT:string="battle.init";
	/**战斗同步 */
	export const BATTLE_SYNC:string="battle.sync";
	/**战斗结算  */
	export const BATTLE_END:string="battle.end";
	/**每日特别商店表单 */
	export const SHOP_DAILY:string="battle.sync";
	/**战斗操作 */
	export const BATTLE_OPT:string="battle.opt";
	/**test充值 */
	export const PAY_PROCESSPAYMENT:string="pay.processpayment";

	/****商店购买 */
	export const SHOP_BUYGOLD:string="shop.buyGold";
	export const SHOP_BUYBOX:string="shop.buyBox";
	export const SHOP_BUYDAILY:string="shop.buyDailyshop";
	export const SHOP_BUYEMOTION:string="shop.buyEmoticon";
	/**寻找对手 */
	export const BATTLE_FIND:string="battle.find";
	/**请求邮件 */
	export const MAIN_LIST:string = "mail.getmymaillist";
	export const MAIL_GET_REWARD:string = "mail.getReward"
	/**骰子队伍 */
	export const DICE_CHOOSELINE:string = "dice.chooseLine";
	export const DICE_UPGRADE:string = "dice.upgrade";
	export const DICE_USE:string = "dice.use";
	/** 任务 */
	export const TASK_FRESH:string = "task.fresh";
	export const TSAK_GET_DAY_REWARDS:string = "task.getDayRewards";
	export const TASK_GET_REWARDS:string = "task.getRewards";
	/** 战令*/
	export const ROYALPASS_GETREWARDS:string = "user.getRoyalPass";
	/** 开启卡片宝箱 */
	export const USER_OPENCARDBOX:string = "user.openCardBox";
	/*战斗相关*/
	export const BATTLE_FINDFRIEND = "battle.findFriend";
	export const BATTLE_CANCELFINDFRIEND = "battle.cancelFindFriend";
	export const BATTLE_CANCELFIND = "battle.cancelFind";
	export const BATTLE_GETLOG = "battle.getLog";
	export const BATTLE_COMPLAIN = "battle.complain";
	export const BATTLE_GETPVPRANK = "rank.getPvp";
	export const BATTLE_GETPVERANK = "rank.getPve";
	/** 用户信息 */
	export const USER_RESETWIN:string = 'user.resetwin';
	export const USER_RENAME:string = 'user.rename';
	/** 跨天刷新model */
	export const USER_FRESHDAYINFO:string = 'user.freshDayInfo';
	/**重置协同次数 */
	export const USER_RESETJNUM:string = 'user.resetjnum';
	/**新手引导步骤记录*/
	export const REQUEST_USER_NEWERGUILD:string = 'user.newerGuild';
	export const REQUEST_USER_STEPGUILD:string = 'user.stepGuild';
	
	//新手引导取名
	export const REQUEST_USER_CREATENAME:string = 'user.createName';
	/**购买皮肤 */
	export const DICE_BUYSKIN:string = 'dice.buySkin';
	/**使用皮肤 */
	export const DICE_USESKIN:string = 'dice.chooseSkin';
	

	/**广告接口 */
	export const ADVERTISE_WATCH:string = 'advertise.watch';

	/**同步请求 */
	export const USER_SYNC:string="user.sync";
	/**公平竞技场 */
	/**公平竞技场开始 */
	export const FAIRARENA_START:string = 'fairArena.start';
	/**公平竞技场领取奖励 */
	export const FAIRARENA_GETREWARD:string = 'fairArena.getReward';
	/**公平竞技场结束 */
	export const FAIRARENA_END:string = 'fairArena.end';
	/**公平竞技场选择小鸟 */
	export const FAIRARENA_CHOOSE:string = 'fairArena.choose';

	/**每日签到 */
	export const SIGNINFO_SIGN:string = 'signinfo.sign';

	/**领取首冲奖励 */
	export const SIGNINFO_GETFIRSTRECHARGE:string = "signinfo.getFirstRecharge";

	/**邀请好友 绑定*/
	export const INVITEFRIEND_BIND:string = "inviteFriend.bind";
	export const INVITEFRIEND_GETREWARD:string = "inviteFriend.getReward";

	/**领取成就奖励 */
	export const TASK_GETACHIEVEMENT:string = 'task.getAchievement';
}

	


