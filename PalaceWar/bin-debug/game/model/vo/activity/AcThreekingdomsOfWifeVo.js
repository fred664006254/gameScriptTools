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
 * 三国活动2
 * date 2020.2.10
 * author yangchengguo
 * @class AcThreekingdomsOfWifeVo
 */
var AcThreekingdomsOfWifeVo = (function (_super) {
    __extends(AcThreekingdomsOfWifeVo, _super);
    function AcThreekingdomsOfWifeVo() {
        return _super.call(this) || this;
    }
    AcThreekingdomsOfWifeVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    //是否免费
    AcThreekingdomsOfWifeVo.prototype.isFree = function () {
        if (this.isfree > 0) {
            return true;
        }
        return false;
    };
    //道具数量
    AcThreekingdomsOfWifeVo.prototype.getToolNum = function () {
        if (this.v) {
            return this.v;
        }
        return 0;
    };
    /**充值 */
    AcThreekingdomsOfWifeVo.prototype.getCurrRecharge = function () {
        if (this.rinfo && this.rinfo.v) {
            return this.rinfo.v;
        }
        return 0;
    };
    /**是否已领取充值奖励 */
    AcThreekingdomsOfWifeVo.prototype.isGetChargeRewardById = function (id) {
        if (this.rinfo && this.rinfo.flags && this.rinfo.flags[id]) {
            return true;
        }
        return false;
    };
    AcThreekingdomsOfWifeVo.prototype.getSortRechargeCfg = function () {
        var rechargeData = this.cfg.getRechargeCfg();
        var count = rechargeData.length;
        var data = [];
        for (var i = 0; i < count; i++) {
            if (this.isGetChargeRewardById(rechargeData[i].id)) {
                rechargeData[i].sortId = rechargeData[i].id + count;
            }
            else if (this.getCurrRecharge() >= rechargeData[i].needGem) {
                rechargeData[i].sortId = rechargeData[i].id - count;
            }
            else {
                rechargeData[i].sortId = rechargeData[i].id;
            }
            data.push(rechargeData[i]);
        }
        data.sort(function (a, b) {
            return a.sortId - b.sortId;
        });
        return data;
    };
    /**当前进度 */
    AcThreekingdomsOfWifeVo.prototype.getProcessNum = function () {
        if (this.process && this.process.v) {
            return this.process.v;
        }
        return 0;
    };
    /**当前进度奖励是否领取 */
    AcThreekingdomsOfWifeVo.prototype.isGetAchieveRewardById = function (id) {
        if (this.process && this.process.flags && this.process.flags[id]) {
            return true;
        }
        return false;
    };
    //触发的奖励特效
    AcThreekingdomsOfWifeVo.prototype.getProcessRewardIndex = function (lastProcess) {
        var data = this.cfg.getAchieveCfg();
        var currNum = this.getProcessNum();
        var ids = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i].specialnum > lastProcess && currNum >= data[i].specialnum) {
                ids.push(i);
            }
        }
        return ids;
    };
    AcThreekingdomsOfWifeVo.prototype.getMaxAchieveNeedNum = function () {
        var data = this.cfg.getAchieveCfg();
        return data[data.length - 1].specialnum;
    };
    AcThreekingdomsOfWifeVo.prototype.getSortAchievementCfg = function () {
        var achieveData = this.cfg.getAchieveCfg();
        var count = achieveData.length;
        var data = [];
        for (var i = 0; i < count; i++) {
            if (this.isGetAchieveRewardById(achieveData[i].id)) {
                achieveData[i].sortId = achieveData[i].id + count;
            }
            else if (this.getProcessNum() >= achieveData[i].specialnum) {
                achieveData[i].sortId = achieveData[i].id - count;
            }
            else {
                achieveData[i].sortId = achieveData[i].id;
            }
            data.push(achieveData[i]);
        }
        data.sort(function (a, b) {
            return a.sortId - b.sortId;
        });
        return data;
    };
    //获取佳人对应的数据
    AcThreekingdomsOfWifeVo.prototype.getWifeData = function () {
        var data = this.cfg.getAchieveCfg();
        for (var i = 0; i < data.length; i++) {
            var rewardArr = data[i].getReward.split("|");
            for (var j = 0; j < rewardArr.length; j++) {
                var id = rewardArr[j].split("_")[1];
                if (id == String(this.cfg.show)) {
                    return { needNum: data[i].specialnum, index: i + 1 };
                }
            }
        }
        return { needNum: 0, index: 1 };
    };
    Object.defineProperty(AcThreekingdomsOfWifeVo.prototype, "isShowRedDot", {
        //红点
        get: function () {
            return this.isCangetAchieveReward() || this.isCangetChargeReward() || this.isCanPlay();
        },
        enumerable: true,
        configurable: true
    });
    //是否有可领取进度奖励
    AcThreekingdomsOfWifeVo.prototype.isCangetAchieveReward = function () {
        var data = this.cfg.getAchieveCfg();
        for (var i = 0; i < data.length; i++) {
            if (!this.isGetAchieveRewardById(data[i].id)) {
                if (this.getProcessNum() >= data[i].specialnum) {
                    return true;
                }
            }
        }
        return false;
    };
    //是否有可领取充值奖励
    AcThreekingdomsOfWifeVo.prototype.isCangetChargeReward = function () {
        var data = this.cfg.getRechargeCfg();
        for (var i = 0; i < data.length; i++) {
            if (!this.isGetChargeRewardById(data[i].id)) {
                if (this.getCurrRecharge() >= data[i].needGem) {
                    return true;
                }
            }
        }
        return false;
    };
    //是否有免费次数
    AcThreekingdomsOfWifeVo.prototype.isCanPlay = function () {
        if (this.isInActivity() && (this.isFree())) {
            return true;
        }
        return false;
    };
    //倒计时
    AcThreekingdomsOfWifeVo.prototype.getCountDown = function () {
        var et = this.et - this.cfg.extraTime * 86400;
        if (et < GameData.serverTime) {
            return LanguageManager.getlocal("acPunishEnd");
        }
        return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
    };
    AcThreekingdomsOfWifeVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
    };
    Object.defineProperty(AcThreekingdomsOfWifeVo.prototype, "acTimeAndHour", {
        //活动日期时间显示
        get: function () {
            var et = this.et - 86400 * this.cfg.extraTime;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreekingdomsOfWifeVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    return AcThreekingdomsOfWifeVo;
}(AcBaseVo));
__reflect(AcThreekingdomsOfWifeVo.prototype, "AcThreekingdomsOfWifeVo");
//# sourceMappingURL=AcThreekingdomsOfWifeVo.js.map