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
 * 投壶活动VO
 */
var AcThrowArrowVo = (function (_super) {
    __extends(AcThrowArrowVo, _super);
    function AcThrowArrowVo() {
        var _this = _super.call(this) || this;
        _this.firstOpen = 0;
        return _this;
    }
    AcThrowArrowVo.prototype.initData = function (data) {
        // 		aid: "throwArrow"
        // charge: {v: 0, flags: {…}}
        // code: 1
        // coin: 0
        // et: 1608787380
        // isfree: 1
        // lottery: {v: 0, flags: {…}}
        // st: 1554066420
        for (var key in data) {
            this[key] = data[key];
        }
    };
    AcThrowArrowVo.prototype.isFirstOpen = function () {
        return this.firstOpen == 0;
    };
    /**是否免费 */
    AcThrowArrowVo.prototype.isFree = function () {
        if (this.isfree == 1) {
            return true;
        }
        return false;
    };
    /**剩余抽奖次数 */
    AcThrowArrowVo.prototype.getCoin = function () {
        return this.coin;
    };
    /**充值进度 */
    AcThrowArrowVo.prototype.getChargeValue = function () {
        return this.charge.v;
    };
    /**
     * 奖励是否领取了
     */
    AcThrowArrowVo.prototype.checkChargeFlag = function (id) {
        if (this.charge.flags[id] && this.charge.flags[id] == 1) {
            return true;
        }
        return false;
    };
    /**抽签进度 */
    AcThrowArrowVo.prototype.getLotteryValue = function () {
        return this.lottery.v;
    };
    /**
     * 抽奖奖励是否领取了
     */
    AcThrowArrowVo.prototype.checkLotteryFlag = function (id) {
        if (this.lottery.flags[id] && this.lottery.flags[id] == 1) {
            return true;
        }
        return false;
    };
    /**
    * 获得充值奖励的配置
    */
    AcThrowArrowVo.prototype.getSortRechargeCfg = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var rechargeData = cfg.throwArrowRechargeItemCfgList;
        for (var i = 0; i < rechargeData.length; i++) {
            if (this.checkChargeFlag(rechargeData[i].id)) {
                rechargeData[i].sortId = rechargeData.length + Number(rechargeData[i].id);
                continue;
            }
            else if (this.getChargeValue() >= rechargeData[i].needGem) {
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
    /**
    * 获得抽奖奖励的配置
    */
    AcThrowArrowVo.prototype.getSortAchievementCfg = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var rechargeData = cfg.throwArrowAchievementItemCfgList;
        for (var i = 0; i < rechargeData.length; i++) {
            if (this.checkLotteryFlag(rechargeData[i].id)) {
                rechargeData[i].sortId = rechargeData.length + Number(rechargeData[i].id);
                continue;
            }
            else if (this.getLotteryValue() >= rechargeData[i].needNum) {
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
    /**
     * 充值的小红点
     */
    AcThrowArrowVo.prototype.checkRechargeRedDot = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var rechargeData = cfg.throwArrowRechargeItemCfgList;
        for (var i = 0; i < rechargeData.length; i++) {
            if ((!this.checkChargeFlag(rechargeData[i].id)) && this.getChargeValue() >= rechargeData[i].needGem) {
                return true;
            }
        }
        return false;
    };
    /**
     * 宝箱的小红点
     */
    AcThrowArrowVo.prototype.checkLotteryRedDot = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var rechargeData = cfg.throwArrowAchievementItemCfgList;
        for (var i = 0; i < rechargeData.length; i++) {
            if ((!this.checkLotteryFlag(rechargeData[i].id)) && this.getLotteryValue() >= rechargeData[i].needNum) {
                return true;
            }
        }
        return false;
    };
    /**
     * 是否有票
     */
    AcThrowArrowVo.prototype.checkCoinRetDot = function () {
        if (this.getCoin() > 0) {
            return true;
        }
        return false;
    };
    Object.defineProperty(AcThrowArrowVo.prototype, "isShowRedDot", {
        get: function () {
            if (!this.checkIsInEndShowTime()) {
                if (this.isFree() || this.checkCoinRetDot()) {
                    return true;
                }
            }
            return this.checkLotteryRedDot() || this.checkRechargeRedDot() || this.firstOpen == 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThrowArrowVo.prototype, "acCountDown", {
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
    AcThrowArrowVo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcThrowArrowVo;
}(AcBaseVo));
__reflect(AcThrowArrowVo.prototype, "AcThrowArrowVo");
