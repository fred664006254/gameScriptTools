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
 * 巾帼英雄
 * date 2019.11.11
 * author ycg
 */
var AcHeroineVo = (function (_super) {
    __extends(AcHeroineVo, _super);
    function AcHeroineVo() {
        return _super.call(this) || this;
    }
    AcHeroineVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    //是否免费
    AcHeroineVo.prototype.isFree = function () {
        if (this.isfree > 0) {
            return true;
        }
        return false;
    };
    //当前进度
    AcHeroineVo.prototype.getScore = function () {
        if (this.process && this.process.v) {
            return this.process.v * this.cfg.attackHP;
        }
        return 0;
    };
    //当前道具数量
    AcHeroineVo.prototype.getToolNum = function () {
        if (this.v) {
            return this.v;
        }
        return 0;
    };
    //充值元宝数
    AcHeroineVo.prototype.getChargeNum = function () {
        if (this.rinfo && this.rinfo.v) {
            return this.rinfo.v;
        }
        return 0;
    };
    //是否领取进度奖励
    AcHeroineVo.prototype.isGetAchievementById = function (id) {
        if (this.process && this.process.flags && this.process.flags[id]) {
            return true;
        }
        return false;
    };
    AcHeroineVo.prototype.getMaxAchieveNeedNum = function () {
        var data = this.cfg.getAchievementList();
        return data[data.length - 1].ratetime;
    };
    //是否领取充值奖励
    AcHeroineVo.prototype.isGetRechargeById = function (id) {
        if (this.rinfo && this.rinfo.flags && this.rinfo.flags[id]) {
            return true;
        }
        return false;
    };
    AcHeroineVo.prototype.isShowAchievementRewardRedDot = function () {
        var data = this.cfg.getAchievementList();
        var currScore = this.getScore() * 100 / this.cfg.totalHP;
        for (var i = 0; i < data.length; i++) {
            if (!this.isGetAchievementById(data[i].id) && currScore >= data[i].ratetime) {
                return true;
            }
        }
        return false;
    };
    AcHeroineVo.prototype.isShowRechargeRedDot = function () {
        var data = this.cfg.getRechargeList();
        var currNum = this.getChargeNum();
        for (var i = 0; i < data.length; i++) {
            if (!this.isGetRechargeById(data[i].id) && currNum >= data[i].needGem) {
                return true;
            }
        }
        return false;
    };
    AcHeroineVo.prototype.isCanPlayRedDot = function () {
        if (this.isInActivity() && (this.isFree() || this.getToolNum() > 0)) {
            return true;
        }
        return false;
    };
    Object.defineProperty(AcHeroineVo.prototype, "isShowRedDot", {
        get: function () {
            return this.isShowAchievementRewardRedDot() || this.isShowRechargeRedDot() || this.isCanPlayRedDot();
        },
        enumerable: true,
        configurable: true
    });
    //进度奖励 排序
    AcHeroineVo.prototype.getSortAchievementCfg = function () {
        var achieveData = this.cfg.getAchievementList();
        var data = [];
        var currNum = this.getScore() * 100 / this.cfg.totalHp;
        for (var i = 0; i < achieveData.length; i++) {
            if (this.isGetAchievementById(achieveData[i].id)) {
                achieveData[i].sortId = Number(achieveData[i].id) + achieveData.length;
            }
            else if (currNum >= achieveData[i].ratetime) {
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
    //充值奖励 排序
    AcHeroineVo.prototype.getSortRechargeCfg = function () {
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
    //倒计时
    AcHeroineVo.prototype.getCountDown = function () {
        var et = this.et - this.cfg.extraTime * 86400;
        if (et < GameData.serverTime) {
            return LanguageManager.getlocal("acPunishEnd");
        }
        return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
    };
    AcHeroineVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
    };
    Object.defineProperty(AcHeroineVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    return AcHeroineVo;
}(AcBaseVo));
__reflect(AcHeroineVo.prototype, "AcHeroineVo");
//# sourceMappingURL=AcHeroineVo.js.map