/**
 * 网络通信请求常量
 * author 陈可
 * date 2017/9/15
 * @class NetManager
 */
var NetConst;
(function (NetConst) {
    // 前端聊天请求类型(不是接口)
    NetConst.CLIENT_CHAT = "client_chat";
    // 用户登录请求
    NetConst.USER_LOGIIN = "user.login";
    // gettoken
    NetConst.GETACCESS_TOKEN = "getToken";
    NetConst.TRACKEVENT_STATS = "";
    /**战斗初始化 */
    NetConst.BATTLE_INIT = "battle.init";
    /**战斗同步 */
    NetConst.BATTLE_SYNC = "battle.sync";
    /**战斗结算  */
    NetConst.BATTLE_END = "battle.end";
    /**每日特别商店表单 */
    NetConst.SHOP_DAILY = "battle.sync";
    /**战斗操作 */
    NetConst.BATTLE_OPT = "battle.opt";
    /**test充值 */
    NetConst.PAY_PROCESSPAYMENT = "pay.processpayment";
    /****商店购买 */
    NetConst.SHOP_BUYGOLD = "shop.buyGold";
    NetConst.SHOP_BUYBOX = "shop.buyBox";
    NetConst.SHOP_BUYDAILY = "shop.buyDailyshop";
    NetConst.SHOP_BUYEMOTION = "shop.buyEmoticon";
    /**寻找对手 */
    NetConst.BATTLE_FIND = "battle.find";
    /**请求邮件 */
    NetConst.MAIN_LIST = "mail.getmymaillist";
    NetConst.MAIL_GET_REWARD = "mail.getReward";
    /**骰子队伍 */
    NetConst.DICE_CHOOSELINE = "dice.chooseLine";
    NetConst.DICE_UPGRADE = "dice.upgrade";
    NetConst.DICE_USE = "dice.use";
    /** 任务 */
    NetConst.TASK_FRESH = "task.fresh";
    NetConst.TSAK_GET_DAY_REWARDS = "task.getDayRewards";
    NetConst.TASK_GET_REWARDS = "task.getRewards";
    /** 战令*/
    NetConst.ROYALPASS_GETREWARDS = "user.getRoyalPass";
    /** 开启卡片宝箱 */
    NetConst.USER_OPENCARDBOX = "user.openCardBox";
    /*战斗相关*/
    NetConst.BATTLE_FINDFRIEND = "battle.findFriend";
    NetConst.BATTLE_CANCELFINDFRIEND = "battle.cancelFindFriend";
    NetConst.BATTLE_CANCELFIND = "battle.cancelFind";
    NetConst.BATTLE_GETLOG = "battle.getLog";
    NetConst.BATTLE_COMPLAIN = "battle.complain";
    NetConst.BATTLE_GETPVPRANK = "rank.getPvp";
    NetConst.BATTLE_GETPVERANK = "rank.getPve";
    /** 用户信息 */
    NetConst.USER_RESETWIN = 'user.resetwin';
    NetConst.USER_RENAME = 'user.rename';
    /** 跨天刷新model */
    NetConst.USER_FRESHDAYINFO = 'user.freshDayInfo';
    /**重置协同次数 */
    NetConst.USER_RESETJNUM = 'user.resetjnum';
    /**新手引导步骤记录*/
    NetConst.REQUEST_USER_NEWERGUILD = 'user.newerGuild';
    NetConst.REQUEST_USER_STEPGUILD = 'user.stepGuild';
    //新手引导取名
    NetConst.REQUEST_USER_CREATENAME = 'user.createName';
    /**购买皮肤 */
    NetConst.DICE_BUYSKIN = 'dice.buySkin';
    /**使用皮肤 */
    NetConst.DICE_USESKIN = 'dice.chooseSkin';
    /**广告接口 */
    NetConst.ADVERTISE_WATCH = 'advertise.watch';
    /**同步请求 */
    NetConst.USER_SYNC = "user.sync";
    /**公平竞技场 */
    /**公平竞技场开始 */
    NetConst.FAIRARENA_START = 'fairArena.start';
    /**公平竞技场领取奖励 */
    NetConst.FAIRARENA_GETREWARD = 'fairArena.getReward';
    /**公平竞技场结束 */
    NetConst.FAIRARENA_END = 'fairArena.end';
    /**公平竞技场选择小鸟 */
    NetConst.FAIRARENA_CHOOSE = 'fairArena.choose';
    /**每日签到 */
    NetConst.SIGNINFO_SIGN = 'signinfo.sign';
    /**领取首冲奖励 */
    NetConst.SIGNINFO_GETFIRSTRECHARGE = "signinfo.getFirstRecharge";
    /**邀请好友 绑定*/
    NetConst.INVITEFRIEND_BIND = "inviteFriend.bind";
    NetConst.INVITEFRIEND_GETREWARD = "inviteFriend.getReward";
    /**领取成就奖励 */
    NetConst.TASK_GETACHIEVEMENT = 'task.getAchievement';
})(NetConst || (NetConst = {}));
//# sourceMappingURL=NetConst.js.map