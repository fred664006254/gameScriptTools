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
 * 携美同游
 * date 2019.11.4
 * author ycg
 * @class AcTravelWithBeautyVo
 */
var AcTravelWithBeautyVo = (function (_super) {
    __extends(AcTravelWithBeautyVo, _super);
    function AcTravelWithBeautyVo() {
        return _super.call(this) || this;
    }
    AcTravelWithBeautyVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    //是否免费
    AcTravelWithBeautyVo.prototype.isFree = function () {
        if (this.isfree > 0) {
            return true;
        }
        return false;
    };
    //当前进度
    AcTravelWithBeautyVo.prototype.getScore = function () {
        if (this.num) {
            return this.num;
        }
        return 0;
    };
    //当前道具数量
    AcTravelWithBeautyVo.prototype.getToolNum = function () {
        if (this.v) {
            return this.v;
        }
        return 0;
    };
    //充值元宝数
    AcTravelWithBeautyVo.prototype.getChargeNum = function () {
        if (this.rinfo && this.rinfo.v) {
            return this.rinfo.v;
        }
        return 0;
    };
    //是否领取进度奖励
    AcTravelWithBeautyVo.prototype.isGetAchievementById = function (id) {
        if (this.rewards && this.rewards[id]) {
            return true;
        }
        return false;
    };
    //是否领取充值奖励
    AcTravelWithBeautyVo.prototype.isGetRechargeById = function (id) {
        if (this.rinfo && this.rinfo.flags && this.rinfo.flags[id]) {
            return true;
        }
        return false;
    };
    AcTravelWithBeautyVo.prototype.isShowAchievementRewardRedDot = function () {
        var data = this.cfg.getAchievementList();
        var currScore = this.getScore();
        for (var i = 0; i < data.length; i++) {
            if (!this.isGetAchievementById(data[i].id) && currScore >= data[i].needNum) {
                return true;
            }
        }
        return false;
    };
    AcTravelWithBeautyVo.prototype.getAchieveRewardId = function () {
        var data = this.cfg.getAchievementList();
        var currScore = this.getScore();
        for (var i = 0; i < data.length; i++) {
            if (!this.isGetAchievementById(data[i].id) && currScore >= data[i].needNum) {
                return data[i].id;
            }
        }
        return null;
    };
    AcTravelWithBeautyVo.prototype.isShowRechargeRedDot = function () {
        var data = this.cfg.getRechargeList();
        var currNum = this.getChargeNum();
        for (var i = 0; i < data.length; i++) {
            if (!this.isGetRechargeById(data[i].id) && currNum >= data[i].needGem) {
                return true;
            }
        }
        return false;
    };
    AcTravelWithBeautyVo.prototype.isCanPlayRedDot = function () {
        if (this.isInActivity() && (this.isFree() || this.getToolNum() > 0)) {
            return true;
        }
        return false;
    };
    Object.defineProperty(AcTravelWithBeautyVo.prototype, "isShowRedDot", {
        get: function () {
            return this.isShowAchievementRewardRedDot() || this.isShowRechargeRedDot() || this.isCanPlayRedDot();
        },
        enumerable: true,
        configurable: true
    });
    AcTravelWithBeautyVo.prototype.getSeprateIndex = function () {
        if (this.code == 3 || this.code == 4) {
            return 5;
        }
        return 0;
    };
    //分阶段显示
    AcTravelWithBeautyVo.prototype.getSeprateProNum = function () {
        var data = this.cfg.getAchievementList();
        var index = data.length;
        var sepIndex = this.getSeprateIndex();
        if (sepIndex > 0) {
            index = sepIndex;
        }
        return data[index - 1].needNum;
    };
    //是否为第二轮
    AcTravelWithBeautyVo.prototype.isSecond = function () {
        if (this.getSeprateIndex() > 0) {
            if (this.getScore() >= this.getSeprateProNum()) {
                return true;
            }
        }
        return false;
    };
    //获取当前最大进度
    AcTravelWithBeautyVo.prototype.getCurrMaxProNum = function () {
        if (this.isSecond()) {
            var data = this.cfg.getAchievementList();
            return data[data.length - 1].needNum;
        }
        return this.getSeprateProNum();
    };
    //进度奖励 排序
    AcTravelWithBeautyVo.prototype.getSortAchievementCfg = function () {
        var achieveData = this.cfg.getAchievementList();
        var count = achieveData.length;
        var sepIndex = this.getSeprateIndex();
        if (sepIndex > 0 && !this.isSecond()) {
            count = sepIndex;
        }
        var data = [];
        for (var i = 0; i < count; i++) {
            if (this.isGetAchievementById(achieveData[i].id)) {
                achieveData[i].sortId = Number(achieveData[i].id) + achieveData.length;
            }
            else if (this.getScore() >= achieveData[i].needNum) {
                achieveData[i].sortId = Number(achieveData[i].id) - achieveData.length;
            }
            else {
                achieveData[i].sortId = Number(achieveData[i].id);
            }
            data.push(achieveData[i]);
        }
        data.sort(function (a, b) {
            return a.sortId - b.sortId;
        });
        return data;
    };
    AcTravelWithBeautyVo.prototype.getAchievementCfg = function () {
        var achieveData = this.cfg.getAchievementList();
        var data = [];
        var sepIndex = this.getSeprateIndex();
        if (sepIndex > 0) {
            if (!this.isSecond()) {
                for (var i = 0; i < sepIndex; i++) {
                    data.push(achieveData[i]);
                }
            }
            else {
                for (var i = sepIndex; i < achieveData.length; i++) {
                    data.push(achieveData[i]);
                }
            }
        }
        else {
            data = achieveData;
        }
        return data;
    };
    //充值奖励 排序
    AcTravelWithBeautyVo.prototype.getSortRechargeCfg = function () {
        var rechargeData = this.cfg.getRechargeList();
        for (var i = 0; i < rechargeData.length; i++) {
            if (this.isGetRechargeById(rechargeData[i].id)) {
                rechargeData[i].sortId = Number(rechargeData[i].id) + rechargeData.length;
            }
            else if (this.getChargeNum() >= rechargeData[i].needGem) {
                rechargeData[i].sortId = Number(rechargeData[i].id) - rechargeData.length;
            }
            else {
                rechargeData[i].sortId = Number(rechargeData[i].id);
            }
        }
        rechargeData.sort(function (a, b) {
            return a.sortId - b.sortId;
        });
        return rechargeData;
    };
    //展示的佳人
    AcTravelWithBeautyVo.prototype.getShowWifeSkinId = function () {
        var data = this.cfg.getAchievementList();
        if (this.code == 3 || this.code == 4) {
            data = this.cfg.getRechargeList();
        }
        for (var i = 0; i < data.length; i++) {
            var rewards = (data[i].getReward).split("|");
            for (var k = 0; k < rewards.length; k++) {
                var strArr = (rewards[k]).split("_");
                if (strArr[0] == "16") {
                    return strArr[1];
                }
            }
        }
        return "";
    };
    AcTravelWithBeautyVo.prototype.getShowWifeSkinNeedGem = function () {
        if (this.code == 3 || this.code == 4) {
            var data = this.cfg.getRechargeList();
            for (var i = 0; i < data.length; i++) {
                var rewards = (data[i].getReward).split("|");
                for (var k = 0; k < rewards.length; k++) {
                    var strArr = (rewards[k]).split("_");
                    if (strArr[0] == "16") {
                        return data[i].needGem;
                    }
                }
            }
        }
        return 0;
    };
    //倒计时
    AcTravelWithBeautyVo.prototype.getCountDown = function () {
        var et = this.et - this.cfg.extraTime * 86400;
        if (et < GameData.serverTime) {
            return LanguageManager.getlocal("acPunishEnd");
        }
        return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
    };
    AcTravelWithBeautyVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
    };
    Object.defineProperty(AcTravelWithBeautyVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    return AcTravelWithBeautyVo;
}(AcBaseVo));
__reflect(AcTravelWithBeautyVo.prototype, "AcTravelWithBeautyVo");
//# sourceMappingURL=AcTravelWithBeautyVo.js.map