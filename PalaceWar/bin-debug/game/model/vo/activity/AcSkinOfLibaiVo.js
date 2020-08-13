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
 * 酒神诗仙
 * date 2020.2.18
 * author yangchengguo
 * @class AcSkinOfLibaiVo
 */
var AcSkinOfLibaiVo = (function (_super) {
    __extends(AcSkinOfLibaiVo, _super);
    function AcSkinOfLibaiVo() {
        return _super.call(this) || this;
    }
    AcSkinOfLibaiVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    //是否免费
    AcSkinOfLibaiVo.prototype.isFree = function () {
        if (this.isfree > 0) {
            return true;
        }
        return false;
    };
    //道具数量
    AcSkinOfLibaiVo.prototype.getToolNum = function () {
        if (this.v) {
            return this.v;
        }
        return 0;
    };
    /**充值 */
    AcSkinOfLibaiVo.prototype.getCurrRecharge = function () {
        if (this.rinfo && this.rinfo.v) {
            return this.rinfo.v;
        }
        return 0;
    };
    /**是否已领取充值奖励 */
    AcSkinOfLibaiVo.prototype.isGetChargeRewardById = function (id) {
        if (this.rinfo && this.rinfo.flags && this.rinfo.flags[id]) {
            return true;
        }
        return false;
    };
    AcSkinOfLibaiVo.prototype.getSortRechargeCfg = function () {
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
    AcSkinOfLibaiVo.prototype.getProcessNum = function () {
        if (this.process && this.process.v) {
            return this.process.v;
        }
        return 0;
    };
    /**当前进度奖励是否领取 */
    AcSkinOfLibaiVo.prototype.isGetAchieveRewardById = function (id) {
        if (this.process && this.process.flags && this.process.flags[id]) {
            return true;
        }
        return false;
    };
    AcSkinOfLibaiVo.prototype.getSortAchievementCfg = function () {
        var achieveData = this.cfg.getAchieveCfg();
        var count = achieveData.length;
        var sepIndex = this.getSeprateIndex();
        if (sepIndex > 0 && !this.isSecond()) {
            count = sepIndex;
        }
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
    AcSkinOfLibaiVo.prototype.getAchievementCfg = function () {
        var achieveData = this.cfg.getAchieveCfg();
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
    AcSkinOfLibaiVo.prototype.getSeprateIndex = function () {
        return 5;
    };
    //分阶段显示
    AcSkinOfLibaiVo.prototype.getSeprateProNum = function () {
        var data = this.cfg.getAchieveCfg();
        var index = data.length;
        var sepIndex = this.getSeprateIndex();
        if (sepIndex > 0) {
            index = sepIndex;
        }
        return data[index - 1].specialnum;
    };
    //是否为第二轮
    AcSkinOfLibaiVo.prototype.isSecond = function () {
        if (this.getSeprateIndex() > 0) {
            if (this.getProcessNum() >= this.getSeprateProNum()) {
                return true;
            }
        }
        return false;
    };
    //获取当前最大进度
    AcSkinOfLibaiVo.prototype.getCurrMaxProNum = function () {
        if (this.isSecond()) {
            var data = this.cfg.getAchieveCfg();
            return data[data.length - 1].specialnum;
        }
        return this.getSeprateProNum();
    };
    //可领奖励id
    AcSkinOfLibaiVo.prototype.getAchieveRewardId = function () {
        var data = this.cfg.getAchieveCfg();
        for (var i = 0; i < data.length; i++) {
            if (!this.isGetAchieveRewardById(data[i].id)) {
                if (this.getProcessNum() >= data[i].specialnum) {
                    return data[i].id;
                }
            }
        }
        return 0;
    };
    //获取展示对应的数据
    AcSkinOfLibaiVo.prototype.getShowSkinData = function () {
        var data = this.cfg.getAchieveCfg();
        for (var i = 0; i < data.length; i++) {
            var rewardsArr = data[i].getReward.split("|");
            for (var k = 0; k < rewardsArr.length; k++) {
                var itemId = rewardsArr[k].split("_")[1];
                var itemCfg = Config.ItemCfg.getItemCfgById(itemId);
                if (this.code == 1 || this.code == 2) {
                    if (itemCfg.servantSkinID) {
                        return { needNum: data[i].specialnum, index: i, skinId: itemCfg.servantSkinID };
                    }
                }
            }
        }
        return { needNum: null, index: null, skinId: null };
    };
    Object.defineProperty(AcSkinOfLibaiVo.prototype, "isShowRedDot", {
        //红点
        get: function () {
            return this.isCangetAchieveReward() || this.isCangetChargeReward() || this.isCanPlay();
        },
        enumerable: true,
        configurable: true
    });
    //是否有可领取进度奖励
    AcSkinOfLibaiVo.prototype.isCangetAchieveReward = function () {
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
    AcSkinOfLibaiVo.prototype.isCangetChargeReward = function () {
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
    AcSkinOfLibaiVo.prototype.isCanPlay = function () {
        if (this.isInActivity() && (this.isFree() || this.getToolNum() > 0)) {
            return true;
        }
        return false;
    };
    //倒计时
    AcSkinOfLibaiVo.prototype.getCountDown = function () {
        var et = this.et - this.cfg.extraTime * 86400;
        if (et < GameData.serverTime) {
            return LanguageManager.getlocal("acPunishEnd");
        }
        return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
    };
    AcSkinOfLibaiVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
    };
    Object.defineProperty(AcSkinOfLibaiVo.prototype, "acTimeAndHour", {
        //活动日期时间显示
        get: function () {
            var et = this.et - 86400 * this.cfg.extraTime;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSkinOfLibaiVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    return AcSkinOfLibaiVo;
}(AcBaseVo));
__reflect(AcSkinOfLibaiVo.prototype, "AcSkinOfLibaiVo");
//# sourceMappingURL=AcSkinOfLibaiVo.js.map