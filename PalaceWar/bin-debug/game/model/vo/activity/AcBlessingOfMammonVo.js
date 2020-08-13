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
 * 财神祝福
 * date 2020.2.13
 * author yangchengguo
 * @class AcBlessingOfMammonVo
 */
var AcBlessingOfMammonVo = (function (_super) {
    __extends(AcBlessingOfMammonVo, _super);
    function AcBlessingOfMammonVo() {
        return _super.call(this) || this;
    }
    AcBlessingOfMammonVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    /**充值 */
    AcBlessingOfMammonVo.prototype.getCurrRecharge = function () {
        if (this.v) {
            return this.v;
        }
        return 0;
    };
    /**是否已领取奖励 */
    AcBlessingOfMammonVo.prototype.isGetChargeRewardById = function (id) {
        if (this.flags && this.flags[id]) {
            return true;
        }
        return false;
    };
    /**是否有可领取的奖励 */
    AcBlessingOfMammonVo.prototype.isShowRewardRedDot = function () {
        var data = this.cfg.getBoxListCfg();
        for (var i = 0; i < data.length; i++) {
            if (!this.isGetChargeRewardById(data[i].id) && this.v >= Number(data[i].needGem)) {
                return true;
            }
        }
        return false;
    };
    //当前进度
    AcBlessingOfMammonVo.prototype.getCurrProcessIndex = function () {
        var currCharge = this.getCurrRecharge();
        var data = this.cfg.getBoxListCfg();
        for (var i = 0; i < data.length; i++) {
            if (currCharge < Number(data[i].needGem)) {
                return { index: i, needGem: Number(data[i].needGem) - currCharge };
            }
        }
        return { index: null, needGem: null };
    };
    //可领取的奖励index
    AcBlessingOfMammonVo.prototype.getCurrRewardIndex = function () {
        var currCharge = this.getCurrRecharge();
        var data = this.cfg.getBoxListCfg();
        for (var i = 0; i < data.length; i++) {
            if (!this.isGetChargeRewardById(data[i].id) && currCharge >= Number(data[i].needGem)) {
                return i;
            }
        }
        return null;
    };
    //核心奖励
    AcBlessingOfMammonVo.prototype.getSpecialRewardNeed = function () {
        var data = this.cfg.getBoxListCfg();
        for (var i = 0; i < data.length; i++) {
            var rewardsArr = data[i].getReward.split("|");
            for (var k = 0; k < rewardsArr.length; k++) {
                var itemId = rewardsArr[k].split("_")[1];
                var itemCfg = Config.ItemCfg.getItemCfgById(itemId);
                if (this.code == 3 || this.code == 4 || this.code == 5 || this.code == 6 || this.code == 7) {
                    if (itemCfg && itemCfg.servantSkinID) {
                        return { needNum: data[i].needGem, index: i, skinId: itemCfg.servantSkinID };
                    }
                }
            }
        }
        return { needNum: null, index: null, skinId: null };
    };
    //额外获得的区间
    AcBlessingOfMammonVo.prototype.getExtraRewardNum = function (id) {
        var data = this.cfg.getBoxListCfg();
        var dropArr = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i].id == Number(id)) {
                for (var k in data[i].gemDrop) {
                    var dropData = data[i].gemDrop[k][0].split("_");
                    if (dropData[0] == "1") {
                        dropArr.push(Number(dropData[2]));
                    }
                }
                break;
            }
        }
        dropArr.sort(function (a, b) { return a - b; });
        return { min: dropArr[0], max: dropArr[dropArr.length - 1] };
    };
    //最高额外奖励
    AcBlessingOfMammonVo.prototype.getMaxExtraReward = function () {
        var data = this.cfg.getBoxListCfg();
        var maxNum = 0;
        for (var i = 0; i < data.length; i++) {
            var dropArr = this.getExtraRewardNum(data[i].id);
            maxNum += dropArr.max;
        }
        return maxNum;
    };
    //
    AcBlessingOfMammonVo.prototype.getFormatRewards = function (str) {
        if (str) {
            var others = "";
            var rewards = "";
            var data = str.split("|");
            for (var i = 0; i < data.length; i++) {
                var arr = data[i].split("_");
                if (arr[0] == "1" && arr[1] == "1") {
                    others = data[i];
                }
                else {
                    rewards += data[i] + "|";
                }
            }
            var s = rewards.substring(0, rewards.length - 1);
            return { rewards: s, others: others };
        }
        return { rewards: str, others: null };
    };
    Object.defineProperty(AcBlessingOfMammonVo.prototype, "isShowRedDot", {
        //红点
        get: function () {
            return this.isShowRewardRedDot();
        },
        enumerable: true,
        configurable: true
    });
    //倒计时
    AcBlessingOfMammonVo.prototype.getCountDown = function () {
        var et = this.et - 86400 * this.cfg.extraTime;
        if (et < GameData.serverTime) {
            return LanguageManager.getlocal("acPunishEnd");
        }
        return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
    };
    AcBlessingOfMammonVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
    };
    Object.defineProperty(AcBlessingOfMammonVo.prototype, "acTimeAndHour", {
        //活动日期时间显示
        get: function () {
            var et = this.et - 86400 * this.cfg.extraTime;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBlessingOfMammonVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    return AcBlessingOfMammonVo;
}(AcBaseVo));
__reflect(AcBlessingOfMammonVo.prototype, "AcBlessingOfMammonVo");
//# sourceMappingURL=AcBlessingOfMammonVo.js.map