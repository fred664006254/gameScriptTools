var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 其他杂项api
 * author yanyuling
 * date 2017/10/27
 * @class PlayerVoApi
 */
var OtherInfoVoApi = (function (_super) {
    __extends(OtherInfoVoApi, _super);
    function OtherInfoVoApi() {
        return _super.call(this) || this;
    }
    /**
     * 检测是否已膜拜
     */
    OtherInfoVoApi.prototype.isRankVisited = function (idx) {
        if (idx == 0) {
            return this.otherInfoVo.power;
        }
        if (idx == 1) {
            return this.otherInfoVo.challenge;
        }
        if (idx == 2) {
            return this.otherInfoVo.imacy;
        }
        if (idx == 3) {
            return this.otherInfoVo.gpower;
        }
        if (idx == 4) {
            return this.otherInfoVo.galliance;
        }
    };
    OtherInfoVoApi.prototype.getOtherInfo = function () {
        return this.otherInfoVo;
    };
    /**
    * 检测是否领取绑定奖励
    */
    OtherInfoVoApi.prototype.isGetBindingReward = function () {
        if (this.otherInfoVo.info.bindFlag && this.otherInfoVo.info.bindFlag == 1) {
            return true;
        }
        return false;
    };
    OtherInfoVoApi.prototype.getPalaceFlag = function () {
        return this.otherInfoVo.palace_flag;
    };
    //获取禁言剩余时间
    OtherInfoVoApi.prototype.getBanet = function () {
        return this.otherInfoVo.banet;
    };
    //获取禁言剩余时间
    OtherInfoVoApi.prototype.getCrossBanet = function () {
        return this.otherInfoVo.info.crossBanet;
    };
    //获取糖果屋领取情况
    OtherInfoVoApi.prototype.getCandyGetInfo = function () {
        return this.otherInfoVo.info.candy;
    };
    //疯狂游乐场关分享信息
    OtherInfoVoApi.prototype.getFkShareInfo = function () {
        return this.otherInfoVo.info.fkShare;
    };
    //疯狂游乐场关关注信息
    OtherInfoVoApi.prototype.getFkFocusInfo = function () {
        return this.otherInfoVo.info.fkFocus;
    };
    //获取禁言剩余时间
    OtherInfoVoApi.prototype.getFirstchallengefail = function () {
        return this.otherInfoVo.firstchallengefail;
    };
    //疯狂游乐场分享红点
    OtherInfoVoApi.prototype.getFkIsshowRed = function () {
        if (!this.otherInfoVo.info.fkShare) {
            return false;
        }
        var rewards = Config.GameprojectCfg.rewardFKYLC2;
        var keys = Object.keys(rewards);
        var l = keys.length;
        var fkVo = Api.otherInfoVoApi.getFkShareInfo();
        for (var i = 0; i < l; i++) {
            var rewardStr = rewards[keys[i]];
            //state 1 未领取 2已经领取 3未达成
            var state = 1;
            if (!fkVo) {
                state = 3;
            }
            else {
                if (fkVo.n >= Number(keys[i])) {
                    if (fkVo.get[keys[i]] == 1) {
                        state = 2;
                    }
                    else {
                        state = 1;
                    }
                }
                else {
                    state = 3;
                }
            }
            if (state == 1) {
                return true;
            }
        }
        return false;
    };
    OtherInfoVoApi.prototype.checkShowWanbaDesktopIcon = function () {
        return PlatformManager.isSupportDesktopIcon() && !this.checkWanbaHasSendDesktop();
    };
    OtherInfoVoApi.prototype.checkShowWanbaShareIcon = function () {
        return PlatformManager.isSupportShare() && !this.checkWanbaDailyHasShared();
    };
    OtherInfoVoApi.prototype.checkWanbaHasSendDesktop = function () {
        return this.otherInfoVo && this.otherInfoVo.info && this.otherInfoVo.info.wbsendFlag;
    };
    OtherInfoVoApi.prototype.checkWanbaDailyHasShared = function () {
        return this.otherInfoVo && this.otherInfoVo.info && this.otherInfoVo.info.wbdailyshareFlag;
    };
    // 3k实名认证已领取 true 未领取
    OtherInfoVoApi.prototype.checkrealnamerewards = function () {
        if (this.otherInfoVo.info.author3k) {
            return false;
        }
        return true;
    };
    OtherInfoVoApi.prototype.getServantSortId = function () {
        var sortId = this.otherInfoVo.info.sortId;
        return sortId ? sortId : 1;
    };
    OtherInfoVoApi.prototype.getUnlockList = function () {
        if (this.otherInfoVo.info) {
            var arr = this.otherInfoVo.info.unlockList;
        }
        return arr;
    };
    //功能解锁名字
    OtherInfoVoApi.prototype.getFunctionName = function () {
        // this.arr2 =[];
        var arr = Api.otherInfoVoApi.getUnlockList(); //领取数据 
        var arr2 = [];
        arr2 = Config.UnlocklistCfg.getUnlockItemCfgList();
        var arr3 = []; //已经领取过的
        var arr4 = []; //可以领取的
        var arr5 = []; //不可以领取的
        for (var i = 0; i < arr2.length; i++) {
            if (arr && arr[arr2[i].key] == 1) {
                arr3.push(arr2[i]);
                if (arr3.length == arr2.length) {
                    return null;
                }
            }
            else {
                if (Api[arr2[i].gameName + "VoApi"] && Api[arr2[i].gameName + "VoApi"].isShowNpc) {
                    var isShowNpc = Api[arr2[i].gameName + "VoApi"].isShowNpc();
                    if (isShowNpc) {
                        arr4.push(arr2[i]);
                    }
                    else {
                        arr5.push(arr2[i]);
                    }
                }
            }
        }
        arr3.sort(function (a, b) {
            if (a.sortId > b.sortId)
                return 1;
            else if (a.sortId == b.sortId)
                return 0;
            return -1;
        });
        arr4.sort(function (a, b) {
            if (a.sortId > b.sortId)
                return 1;
            else if (a.sortId == b.sortId)
                return 0;
            return -1;
        });
        arr5.sort(function (a, b) {
            if (a.sortId > b.sortId)
                return 1;
            else if (a.sortId == b.sortId)
                return 0;
            return -1;
        });
        arr2 = arr4.concat(arr5).concat(arr3);
        var str = LanguageManager.getlocal("functionModuleDes" + arr2[0].sortId);
        return str;
    };
    //功能解锁红点
    OtherInfoVoApi.prototype.getFunctionRedhot = function () {
        var arr2 = Config.UnlocklistCfg.getUnlockItemCfgList();
        if (this.otherInfoVo && this.otherInfoVo.info && this.otherInfoVo.info.unlockList) {
            var arr = this.otherInfoVo.info.unlockList;
            var boo = false;
            for (var i = 0; i < arr2.length; i++) {
                if (Api[arr2[i].gameName + "VoApi"] && Api[arr2[i].gameName + "VoApi"].isShowNpc) {
                    var isShowNpc = Api[arr2[i].gameName + "VoApi"].isShowNpc();
                    if (isShowNpc && arr[arr2[i].key] != 1) {
                        boo = true;
                        return boo;
                    }
                }
            }
            return boo;
        }
        else {
            return false;
        }
    };
    OtherInfoVoApi.prototype.getCoverState = function () {
        if (this.otherInfoVo && this.otherInfoVo.info && this.otherInfoVo.info.cover) {
            return this.otherInfoVo.info.cover;
        }
        else {
            return 0;
        }
    };
    /** 获取港台绑定账号奖励领取状态 */
    OtherInfoVoApi.prototype.getFBBindFlag = function () {
        if (this.otherInfoVo && this.otherInfoVo.info && this.otherInfoVo.info.gtfbbindFlag) {
            return this.otherInfoVo.info.gtfbbindFlag;
        }
        else {
            return 0;
        }
    };
    OtherInfoVoApi.prototype.certification = function () {
        if (this.otherInfoVo.certification) {
            return true;
        }
        return false;
    };
    /**
     * 获取分享奖励的领取次数
     */
    OtherInfoVoApi.prototype.getShareGuideCount = function () {
        var count = 0;
        if (this.otherInfoVo && this.otherInfoVo.info && this.otherInfoVo.info.shareguide) {
            return this.otherInfoVo.info.shareguide;
        }
        return count;
    };
    /**
     * 是否是新用户的
     */
    OtherInfoVoApi.prototype.isnewuser = function () {
        if (this.otherInfoVo && this.otherInfoVo.info && this.otherInfoVo.info.isnewuser) {
            return true;
        }
        return false;
    };
    /**
     * 新分享面板的信息
     */
    OtherInfoVoApi.prototype.getGeneralShareInfo = function () {
        return this.otherInfoVo.info.generalshare;
    };
    //群组分享信息
    OtherInfoVoApi.prototype.getTherealShareInfo = function () {
        return this.otherInfoVo.info.therealshare;
    };
    /**
     * 新7天签到信息
     */
    OtherInfoVoApi.prototype.getArrivalNewInfo = function () {
        return this.otherInfoVo.info.arrivalNewInfo;
    };
    OtherInfoVoApi.prototype.refreshArrivalNewInfoFlag = function () {
        this.otherInfoVo.info.arrivalNewInfo.flag = 0;
    };
    /**
     * 检查具体某一天的领取状态
     * @param index 天数
     */
    OtherInfoVoApi.prototype.checkFlagByIndex = function (index) {
        var curCount = this.otherInfoVo.info.arrivalNewInfo.count;
        var curFlag = this.otherInfoVo.info.arrivalNewInfo.flag;
        if (curCount > index) {
            return 1;
        }
        else if (index == curCount) {
            return 1;
        }
        return 2;
    };
    Object.defineProperty(OtherInfoVoApi.prototype, "isSignShowRedDot", {
        /**
         * 是否显示红点
         */
        get: function () {
            if (this.otherInfoVo.info.arrivalNewInfo.flag == 0) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 得到上一次请求当天早上的0点的时间
     */
    OtherInfoVoApi.prototype.getLastday = function () {
        return this.otherInfoVo.lastday;
    };
    OtherInfoVoApi.prototype.setLastday = function (d) {
        this.otherInfoVo.lastday = d;
    };
    OtherInfoVoApi.prototype.getWxchatgift = function () {
        return this.otherInfoVo.wxchatgift;
    };
    /** 3号实名认证是否已完成 */
    OtherInfoVoApi.prototype.hasRealname3Ok = function () {
        return this.otherInfoVo.info.idcardnum && this.otherInfoVo.info.idcardname;
    };
    /** 问卷调查是否已完成 */
    OtherInfoVoApi.prototype.hasQuestionnaireOk = function () {
        return this.otherInfoVo.info.jpquestionflag && this.otherInfoVo.info.jpquestionflag > 0;
    };
    /** 添加到我的小程序，状态标记 */
    OtherInfoVoApi.prototype.wxaddmyproStatus = function () {
        if (typeof (this.otherInfoVo.info.wxaddmyproflag) === "number") {
            return this.otherInfoVo.info.wxaddmyproflag;
        }
        else {
            return 0;
        }
    };
    /**微信悬浮窗，状态标记 */
    OtherInfoVoApi.prototype.wxiconStatus = function () {
        if (typeof (this.otherInfoVo.info.wxaddfloat) === "number") {
            return this.otherInfoVo.info.wxaddfloat;
        }
        else {
            return 0;
        }
    };
    /** 微信关注公众号，状态标记 */
    OtherInfoVoApi.prototype.wxaddoffacctStatus = function () {
        if (this.otherInfoVo.info.wxaddoffacct) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
    * 得到聊天屏蔽
    */
    OtherInfoVoApi.prototype.getShareblock = function () {
        if (this.otherInfoVo.info.shareblock) {
            return this.otherInfoVo.info.shareblock;
        }
        return 0;
    };
    /**
    * 得到聊天屏蔽2
    */
    OtherInfoVoApi.prototype.getAllianceShareblock = function () {
        if (this.otherInfoVo.info.allianceshareblock) {
            return this.otherInfoVo.info.allianceshareblock;
        }
        return 0;
    };
    OtherInfoVoApi.prototype.getRealnameRewards = function () {
        if (this.otherInfoVo && this.otherInfoVo.info && this.otherInfoVo.info.realnameRewards != null) {
            return this.otherInfoVo.info.realnameRewards;
        }
        else {
            return null;
        }
    };
    OtherInfoVoApi.prototype.getWanbaviptequanInfo = function (vipLevel) {
        if (this.otherInfoVo && this.otherInfoVo.info && this.otherInfoVo.info.wbvipgiftinfo != null) {
            return this.otherInfoVo.info.wbvipgiftinfo[vipLevel];
        }
        else {
            return 0;
        }
    };
    /**
    * 获取是否领取过防诈骗奖励
    */
    OtherInfoVoApi.prototype.getAntiDeception = function () {
        var count = 0;
        if (this.otherInfoVo && this.otherInfoVo.info && this.otherInfoVo.info.antideception) {
            return this.otherInfoVo.info.antideception;
        }
        return count;
    };
    /**
    * 获取是否领取过twitter每日分享奖励
    */
    OtherInfoVoApi.prototype.getTwdailyshare = function () {
        var count = 0;
        if (this.otherInfoVo && this.otherInfoVo && this.otherInfoVo.twdailyshare) {
            return this.otherInfoVo.info.twdailyshare;
        }
        return count;
    };
    /** 新官上任任务信息 */
    OtherInfoVoApi.prototype.getLoginWeekTask = function () {
        return this.otherInfoVo.info.loginWeek.task;
    };
    /** 新官上任积分信息 */
    OtherInfoVoApi.prototype.getLoginWeekScore = function () {
        return this.otherInfoVo.info.loginWeek.score;
    };
    /** 新官上任任务领取信息 */
    OtherInfoVoApi.prototype.getLoginWeekFlags = function () {
        return this.otherInfoVo.info.loginWeek.flags;
    };
    /** 新官上任阶段奖励领取信息 */
    OtherInfoVoApi.prototype.getLoginWeekSinfo = function () {
        return this.otherInfoVo.info.loginWeek.sinfo;
    };
    /** 新官上任当前阶段0~4 */
    OtherInfoVoApi.prototype.getLoginWeekCurBoxIndex = function () {
        // 当前阶段
        var curBoxIndex = 1;
        for (var i = 0; i < 4; i++) {
            if (this.otherInfoVo.info.loginWeek.sinfo[i + 1] == 1) {
                curBoxIndex = i + 1 + 1;
            }
        }
        return curBoxIndex;
    };
    /** 新官上当前是第几天1~7 */
    OtherInfoVoApi.prototype.getLoginWeekDiffday = function () {
        // 开始时间
        var st = this.otherInfoVo.info.loginWeek.st;
        // 当前时间和开始时间所在零点的时间差
        var dt = GameData.serverTime - App.DateUtil.getWeeTs(st);
        return Math.ceil(dt / 24 / 60 / 60);
    };
    /** 新官上任是否过期了 */
    OtherInfoVoApi.prototype.getLoginWeekTimeout = function () {
        if (!this.otherInfoVo.info.loginWeek) {
            return true;
        }
        return this.getLoginWeekDiffday() > 7;
    };
    /** 新官上任今日是否已弹出过 */
    OtherInfoVoApi.prototype.getLoginWeekFirstPopup = function () {
        return this.otherInfoVo.info.loginWeek.firstflag == 1;
    };
    /** 新官上任，天数红点 */
    OtherInfoVoApi.prototype.getLoginWeekRedOneDay = function (day) {
        if (day > this.getLoginWeekDiffday()) {
            // 还没到天数，没有红点
            return false;
        }
        var task = this.otherInfoVo.info.loginWeek.task;
        var flags = this.otherInfoVo.info.loginWeek.flags;
        var arr = GameConfig.config.loginweekCfg.dailyTask[day];
        for (var key in arr) {
            if (arr.hasOwnProperty(key)) {
                if (!flags[day] || flags[day][key] != "1") {
                    var cfg = arr[key];
                    var num1 = 0;
                    if (task && task[cfg.questType]) {
                        num1 = task[cfg.questType];
                    }
                    if (num1 >= cfg.value) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    /** 新官上任，红点 */
    OtherInfoVoApi.prototype.getLoginWeekRed = function () {
        // 每天的红点
        for (var i = 0; i < 7; i++) {
            if (this.getLoginWeekRedOneDay(i + 1)) {
                return true;
            }
        }
        // 阶段奖励红点
        var boxCfg = GameConfig.config.loginweekCfg.totalScoreReward[this.getLoginWeekCurBoxIndex()];
        if (boxCfg && this.getLoginWeekScore() >= boxCfg.needScore) {
            return true;
        }
        return false;
    };
    /** 新官上任结束时间 */
    OtherInfoVoApi.prototype.getLoginWeekEndTime = function () {
        return this.otherInfoVo.info.loginWeek.et;
    };
    OtherInfoVoApi.prototype.getOtherInfoVo = function () {
        return this.otherInfoVo;
    };
    OtherInfoVoApi.prototype.checkIsNeverUseMiaosha = function () {
        return !this.otherInfoVo.autosmallattacket;
    };
    //秒杀功能
    OtherInfoVoApi.prototype.checkCanUseMiaosha = function () {
        var canUse = false;
        if (this.otherInfoVo.autosmallattacket) {
            canUse = GameData.serverTime < this.otherInfoVo.autosmallattacket;
        }
        else {
            canUse = true;
        }
        if (Api.shopVoApi.ifBuyMonthCard() || Api.shopVoApi.ifBuyYearCard()) {
            canUse = true;
        }
        if (Api.challengeVoApi.getCurBigChannelId() < 3) {
            canUse = false;
        }
        return canUse;
    };
    OtherInfoVoApi.prototype.getMiaoshaLeftTime = function () {
        if (Api.shopVoApi.ifBuyMonthCard() || Api.shopVoApi.ifBuyYearCard()) {
            return '';
        }
        if (this.otherInfoVo.autosmallattacket) {
            if (GameData.serverTime < this.otherInfoVo.autosmallattacket) {
                return LanguageManager.getlocal("miaoshaRemainTime", [App.DateUtil.getFormatBySecond((this.otherInfoVo.autosmallattacket - GameData.serverTime), 8)]);
            }
            else {
                return '';
            }
        }
        else {
            return LanguageManager.getlocal("miaoshaRemainTime", [App.DateUtil.getFormatBySecond(Config.GameprojectCfg.miaoshaChallengeTime || 1800, 8)]);
        }
    };
    OtherInfoVoApi.prototype.dispose = function () {
        this.otherInfoVo = null;
        _super.prototype.dispose.call(this);
    };
    return OtherInfoVoApi;
}(BaseVoApi));
__reflect(OtherInfoVoApi.prototype, "OtherInfoVoApi");
