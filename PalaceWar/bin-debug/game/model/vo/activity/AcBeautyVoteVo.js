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
 * 花魁活动VO
 */
var AcBeautyVoteVo = (function (_super) {
    __extends(AcBeautyVoteVo, _super);
    function AcBeautyVoteVo() {
        var _this = _super.call(this) || this;
        _this.binfo = null;
        _this.cinfo = null;
        _this.flowers = 0;
        _this.shopscore = 0;
        _this.vote = null;
        _this.buytimes = 0;
        return _this;
    }
    // 	aid: "beautyVote"
    // binfo: {}
    // cinfo:
    // flags: {}
    // v: 0
    // __proto__: Object
    // code: 1
    // et: 1556892000
    // flowers: 0
    // shopscore: 0
    // st: 1556208000
    // vote:
    // 1: (2) [0, 0]
    AcBeautyVoteVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    /**充值的金额 */
    AcBeautyVoteVo.prototype.getRechanrgeValue = function () {
        return this.cinfo.v;
    };
    /**鲜花数量 */
    AcBeautyVoteVo.prototype.getFlowersValue = function () {
        return this.flowers;
    };
    /**商店积分 */
    AcBeautyVoteVo.prototype.getShopScoreValue = function () {
        return this.shopscore;
    };
    /**购买的次数 */
    AcBeautyVoteVo.prototype.getBuyTimes = function () {
        return this.buytimes;
    };
    /**积分购买的数量 */
    AcBeautyVoteVo.prototype.getBuyLimit = function (id) {
        return this.binfo[id] ? this.binfo[id] : 0;
    };
    /**活动当轮的鲜花数量 */
    AcBeautyVoteVo.prototype.getSingleRoundFlowers = function (roundId) {
        return { letfValue: this.vote[roundId][0], rightValue: this.vote[roundId][1] };
    };
    /**获得单轮的活动日期 */
    AcBeautyVoteVo.prototype.getSingleRoundAcTimeAndHour = function (roundId) {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var roundCfg = cfg.getSingleScheduleTimeforId(roundId);
        var et = this.st + roundCfg.endTime;
        var st = this.st + roundCfg.startTime;
        return App.DateUtil.getOpenLocalTime(st, et, true);
    };
    /**获得单轮的活动日期 */
    AcBeautyVoteVo.prototype.getSingleRoundAcCountDown = function (roundId) {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var roundCfg = cfg.getSingleScheduleTimeforId(roundId);
        var et = this.st + roundCfg.endTime;
        var st = this.st + roundCfg.startTime;
        var timeStr = null;
        if (GameData.serverTime > et) {
            timeStr = LanguageManager.getlocal("acBeautyVoteViewTab1AcTimeEnd-" + this.code);
        }
        else {
            timeStr = LanguageManager.getlocal("acBeautyVoteViewTab1AcTime-" + this.code, [App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1)]);
        }
        return timeStr;
    };
    /**是否已结束 */
    AcBeautyVoteVo.prototype.checkSingleRoundAcTime = function (roundId) {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var roundCfg = cfg.getSingleScheduleTimeforId(roundId);
        var et = this.st + roundCfg.endTime;
        var st = this.st + roundCfg.startTime;
        if (GameData.serverTime >= st && GameData.serverTime <= et) {
            return true;
        }
        return false;
    };
    /**
    * 获得充值奖励的配置
    */
    AcBeautyVoteVo.prototype.getSortRechargeCfg = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var rechargeData = cfg.beautyVoteRechargeItemCfgList;
        for (var i = 0; i < rechargeData.length; i++) {
            if (this.checkRechargeFlag(rechargeData[i].id)) {
                rechargeData[i].sortId = rechargeData.length + Number(rechargeData[i].id);
                continue;
            }
            else if (this.getRechanrgeValue() >= rechargeData[i].needGem) {
                rechargeData[i].sortId = (Number(rechargeData[i].id)) - rechargeData.length - 1;
                continue;
            }
            else {
                rechargeData[i].sortId = Number(rechargeData[i].id);
                continue;
            }
        }
        return rechargeData;
    };
    /**是否领取了 */
    AcBeautyVoteVo.prototype.checkRechargeFlag = function (id) {
        if (this.cinfo.flags[id]) {
            return true;
        }
        return false;
    };
    Object.defineProperty(AcBeautyVoteVo.prototype, "acCountDown", {
        /**
         * 活动结束倒计时，格式：00：00：00
         */
        get: function () {
            var et = this.et - this.config.extraTime * 86400;
            if (et < GameData.serverTime) {
                return LanguageManager.getlocal("acPunishEnd");
            }
            return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBeautyVoteVo.prototype, "isShowRedDot", {
        /**小红点 */
        get: function () {
            return this.checkFlowers() || this.checkRechargeRedDot() || this.checkScore();
        },
        enumerable: true,
        configurable: true
    });
    /**
    * 充值的小红点
    */
    AcBeautyVoteVo.prototype.checkRechargeRedDot = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var rechargeData = cfg.beautyVoteRechargeItemCfgList;
        for (var i = 0; i < rechargeData.length; i++) {
            if ((!this.checkRechargeFlag(rechargeData[i].id)) && this.getRechanrgeValue() >= rechargeData[i].needGem) {
                return true;
            }
        }
        return false;
    };
    /**是否有鲜花 */
    AcBeautyVoteVo.prototype.checkFlowers = function () {
        if (this.getFlowersValue() > 0) {
            return true;
        }
        return false;
    };
    /**分数 */
    AcBeautyVoteVo.prototype.checkScore = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var rechargeData = cfg.beautyVoteScoreMarketItemCfgList;
        if (this.getShopScoreValue() >= rechargeData[rechargeData.length - 1].costScore) {
            return true;
        }
        return false;
    };
    AcBeautyVoteVo.prototype.dispose = function () {
        this.binfo = null;
        this.cinfo = null;
        this.flowers = 0;
        this.shopscore = 0;
        this.vote = null;
        this.buytimes = 0;
        _super.prototype.dispose.call(this);
    };
    return AcBeautyVoteVo;
}(AcBaseVo));
__reflect(AcBeautyVoteVo.prototype, "AcBeautyVoteVo");
//# sourceMappingURL=AcBeautyVoteVo.js.map