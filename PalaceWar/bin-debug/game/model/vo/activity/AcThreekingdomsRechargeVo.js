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
 * 三国活动
 * date 2019.8.27
 * author yangchengguo
 * @class AcThreekingdomsRechargeVo
 */
var AcThreekingdomsRechargeVo = (function (_super) {
    __extends(AcThreekingdomsRechargeVo, _super);
    function AcThreekingdomsRechargeVo() {
        return _super.call(this) || this;
    }
    AcThreekingdomsRechargeVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    //是否免费
    AcThreekingdomsRechargeVo.prototype.isFree = function () {
        if (this.isfree > 0) {
            return true;
        }
        return false;
    };
    /**当前马蹄数 */
    AcThreekingdomsRechargeVo.prototype.getCurrNum = function () {
        if (this.num) {
            return this.num;
        }
        return 0;
    };
    /**当前进度 */
    AcThreekingdomsRechargeVo.prototype.getProcessNum = function () {
        if (this.process) {
            return this.process;
        }
        return 0;
    };
    //再充值元宝数
    AcThreekingdomsRechargeVo.prototype.getRechargeNeed = function () {
        var num = 0;
        if (this.v) {
            num = this.cfg.cost - this.v % this.cfg.cost;
        }
        if (num > 0) {
            return num;
        }
        return this.cfg.cost;
    };
    /**当前进度奖励是否领取 */
    AcThreekingdomsRechargeVo.prototype.isGetAchieveRewardById = function (id) {
        if (this.flags && this.flags[id]) {
            return true;
        }
        return false;
    };
    AcThreekingdomsRechargeVo.prototype.getSortAchievementCfg = function () {
        var achieveData = this.cfg.getAchieveData();
        var count = achieveData.length;
        var data = [];
        for (var i = 0; i < count; i++) {
            if (this.isGetAchieveRewardById(achieveData[i].id)) {
                achieveData[i].sortId = Number(achieveData[i].id) + count;
            }
            else if (this.getProcessNum() >= achieveData[i].specialnum) {
                achieveData[i].sortId = Number(achieveData[i].id) - count;
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
    //进度条相关
    AcThreekingdomsRechargeVo.prototype.getProgressPer = function () {
        var currNum = this.getProcessNum();
        var data = this.cfg.getAchieveData();
        var len = data.length;
        var maxNum = data[len - 1].specialnum;
        var index = 0;
        for (var i = 0; i < data.length; i++) {
            if (currNum >= maxNum) {
                return 1;
            }
            else if (data[i].specialnum == currNum) {
                return (i + 1) / len;
            }
            else if (data[i].specialnum > currNum) {
                index = i;
                break;
            }
        }
        var per = 0;
        if (index == 0) {
            per = currNum / data[index].specialnum / len;
        }
        else {
            var lastNum = data[index - 1].specialnum;
            per = index / len + (currNum - lastNum) / (data[index].specialnum - lastNum) / len;
        }
        return per;
    };
    //当前进行到第几关
    AcThreekingdomsRechargeVo.prototype.getCurrGuanqiaId = function () {
        var data = this.cfg.getAchieveData();
        var currNum = this.getProcessNum();
        for (var i = 0; i < data.length; i++) {
            if (data[i].specialnum == currNum) {
                if (i == data.length - 1) {
                    return -1;
                }
                else {
                    return i + 1;
                }
            }
            else if (data[i].specialnum > currNum) {
                return i;
            }
        }
        return -1; // -1通关
    };
    //距离下次进度数
    AcThreekingdomsRechargeVo.prototype.getNextGuanqiaNeedNum = function () {
        var guanqiaId = this.getCurrGuanqiaId();
        var data = this.cfg.getAchieveData();
        var currNum = this.getProcessNum();
        if (guanqiaId != -1) {
            return data[guanqiaId].specialnum - currNum;
        }
        return 0;
    };
    //是否触发武将战斗
    AcThreekingdomsRechargeVo.prototype.openBossBattleIndex = function (lastProcess) {
        var data = this.cfg.getAchieveData();
        var currNum = this.getProcessNum();
        var ids = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i].specialnum > lastProcess && currNum >= data[i].specialnum) {
                ids.push(i);
            }
        }
        return ids;
    };
    Object.defineProperty(AcThreekingdomsRechargeVo.prototype, "isShowRedDot", {
        //红点
        get: function () {
            return this.isCangetAchieveReward() || this.isCanPlay() || this.isShowQingyuanRedDot();
        },
        enumerable: true,
        configurable: true
    });
    //是否有可领取奖励
    AcThreekingdomsRechargeVo.prototype.isCangetAchieveReward = function () {
        var data = this.cfg.getAchieveData();
        for (var i = 0; i < data.length; i++) {
            if (!this.isGetAchieveRewardById(data[i].id)) {
                if (this.getProcessNum() >= data[i].specialnum) {
                    return true;
                }
            }
        }
        return false;
    };
    //是否有免费次数
    AcThreekingdomsRechargeVo.prototype.isCanPlay = function () {
        if (this.isInActivity() && (this.isFree() || this.getCurrNum() > 0)) {
            return true;
        }
        return false;
    };
    //是否有情缘红点
    AcThreekingdomsRechargeVo.prototype.isShowQingyuanRedDot = function () {
        if (Api.switchVoApi.checkOpenOfficialCareer() && Api.switchVoApi.checkOpenQingYuanHuiJuan() && Api.switchVoApi.checkOpenQingYuan("fiveTigeHeroes")) {
            if (Api.playerVoApi.getPlayerLevel() >= Config.CareerCfg.getStoryNeedLv()) {
                if (Api.encounterVoApi.isShowNpc()) {
                    return true;
                }
            }
        }
        return false;
    };
    //倒计时
    AcThreekingdomsRechargeVo.prototype.getCountDown = function () {
        var et = this.et - this.cfg.extraTime * 86400;
        if (et < GameData.serverTime) {
            return LanguageManager.getlocal("acPunishEnd");
        }
        return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
    };
    AcThreekingdomsRechargeVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
    };
    Object.defineProperty(AcThreekingdomsRechargeVo.prototype, "acTimeAndHour", {
        //活动日期时间显示
        get: function () {
            var et = this.et - 86400 * this.cfg.extraTime;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreekingdomsRechargeVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    return AcThreekingdomsRechargeVo;
}(AcBaseVo));
__reflect(AcThreekingdomsRechargeVo.prototype, "AcThreekingdomsRechargeVo");
//# sourceMappingURL=AcThreekingdomsRechargeVo.js.map