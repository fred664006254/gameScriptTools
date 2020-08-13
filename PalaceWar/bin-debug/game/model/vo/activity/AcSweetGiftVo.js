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
 * 月夜仙缘
 * date 2019.8.19
 * author yangchengguo
 * @class AcSweetGiftVo
 */
var AcSweetGiftVo = (function (_super) {
    __extends(AcSweetGiftVo, _super);
    function AcSweetGiftVo() {
        return _super.call(this) || this;
    }
    AcSweetGiftVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    //倒计时
    AcSweetGiftVo.prototype.getCountDown = function () {
        var et = this.et - this.cfg.extraTime * 86400;
        if (et < GameData.serverTime) {
            return LanguageManager.getlocal("acPunishEnd");
        }
        return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
    };
    //是否免费
    AcSweetGiftVo.prototype.isFree = function () {
        if (this.isfree > 0) {
            return true;
        }
        return false;
    };
    //充值元宝数
    AcSweetGiftVo.prototype.getChargeNum = function () {
        if (this.rinfo && this.rinfo.v) {
            return this.rinfo.v;
        }
        return 0;
    };
    //是否已领取充值奖励
    AcSweetGiftVo.prototype.isGetRechargeById = function (id) {
        if (this.rinfo && this.rinfo.flags && this.rinfo.flags[id]) {
            return true;
        }
        return false;
    };
    //是否已领取进度奖励
    AcSweetGiftVo.prototype.isGetAchievementById = function (id) {
        if (this.rewards && this.rewards[id]) {
            return true;
        }
        return false;
    };
    //当前进度领取奖励状态 0 不可领取  1 可领取  2 已领取
    AcSweetGiftVo.prototype.getAchievementStatusById = function (id) {
        if (this.isGetAchievementById(id)) {
            return 2;
        }
        else {
            var data = this.cfg.getAchievementList();
            if (data[Number(id) - 1].needNum <= this.v) {
                return 1;
            }
        }
        return 0;
    };
    //当前最大进度
    AcSweetGiftVo.prototype.getMaxAchieveId = function () {
        var data = this.cfg.getAchievementList();
        for (var key in data) {
            if (data[key].needNum > this.v) {
                return Number(key) - 1;
            }
            else if (data[key].needNum == this.v) {
                return Number(key);
            }
        }
        var len = data.length;
        if (data[len - 1].needNum <= this.v) {
            return len - 1;
        }
        return -1;
    };
    //任务是否已完成
    AcSweetGiftVo.prototype.isGetTaskById = function (id) {
        if (this.task && this.task.flags && this.task.flags[id]) {
            return true;
        }
        return false;
    };
    //当前分数
    AcSweetGiftVo.prototype.getScore = function () {
        return this.v;
    };
    //月饼分数
    AcSweetGiftVo.prototype.getCakeDataById = function (id) {
        var data = this.cfg.getMoonCakeList();
        for (var key in data) {
            if (data[key].itemID == id) {
                return data[key];
            }
        }
        return data[String(id)];
    };
    //任务完成数量
    AcSweetGiftVo.prototype.getTaskNumByType = function (type) {
        if (this.task && this.task.v && this.task.v[type]) {
            return this.task.v[type];
        }
        return 0;
    };
    /**商品购买的数量 */
    AcSweetGiftVo.prototype.getShopValue = function (id) {
        return this.shop && this.shop[id] ? this.shop[id] : 0;
    };
    //获得充值奖励的配置
    AcSweetGiftVo.prototype.getSortRechargeCfg = function () {
        var rechargeData = this.cfg.getRechargeList();
        for (var i = 0; i < rechargeData.length; i++) {
            if (this.isGetRechargeById(rechargeData[i].id)) {
                rechargeData[i].sortId = rechargeData.length + Number(rechargeData[i].id);
            }
            else if (this.getChargeNum() >= rechargeData[i].needGem) {
                rechargeData[i].sortId = (Number(rechargeData[i].id)) - rechargeData.length - 1;
            }
            else {
                rechargeData[i].sortId = Number(rechargeData[i].id);
            }
        }
        rechargeData.sort(function (a, b) { return a.sortId - b.sortId; });
        return rechargeData;
    };
    //入场消耗次数的进度奖励
    AcSweetGiftVo.prototype.getSortAchievementCfg = function () {
        var data = this.cfg.getAchievementList();
        for (var i = 0; i < data.length; i++) {
            if (this.isGetAchievementById(data[i].id)) {
                data[i].sortId = data.length + Number(data[i].id);
            }
            else if (this.getScore() >= data[i].needNum) {
                data[i].sortId = (Number(data[i].id)) - data.length - 1;
            }
            else {
                data[i].sortId = Number(data[i].id);
            }
        }
        data.sort(function (a, b) { return a.sortId - b.sortId; });
        return data;
    };
    //任务
    AcSweetGiftVo.prototype.getSortTaskCfg = function () {
        var data = this.cfg.getTaskList();
        for (var i = 0; i < data.length; i++) {
            if (this.isGetTaskById(data[i].id)) {
                data[i].sortId = data.length + Number(data[i].id);
            }
            else if (this.getTaskNumByType(data[i].questType) >= data[i].value) {
                data[i].sortId = (Number(data[i].id)) - data.length - 1;
            }
            else {
                data[i].sortId = Number(data[i].id);
            }
        }
        data.sort(function (a, b) { return a.sortId - b.sortId; });
        return data;
    };
    //商店
    AcSweetGiftVo.prototype.getSortShopCfg = function () {
        var data = this.cfg.getExchangeList();
        data.sort(function (a, b) { return a.sortId - b.sortId; });
        return data;
    };
    //月饼奖励
    AcSweetGiftVo.prototype.getSortMoonCakeCfg = function () {
        var data = this.cfg.getMoonCakeList();
        data.sort(function (a, b) { return a.itemId - b.itemId; });
        return data;
    };
    //月饼奖励列表
    AcSweetGiftVo.prototype.getMoonCakeRewardsByItemId = function (id) {
        var itemConfig = Config.ItemCfg.getItemCfgById(id);
        var drops = Config.ItemdropCfg.getItemCfgById(itemConfig.dropId);
        var str = "";
        // let keys:any[] = Object.keys(drops);
        for (var key in drops) {
            if (drops[key] && drops[key][0]) {
                str += drops[key][0] + "|";
            }
            else {
                break;
            }
        }
        return str.substring(0, str.length - 1);
    };
    //是否显示充值奖励红点
    AcSweetGiftVo.prototype.isShowChargeRewardRedDot = function () {
        var rechargeData = this.cfg.getRechargeList();
        for (var i = 0; i < rechargeData.length; i++) {
            if (this.isGetRechargeById(rechargeData[i].id) == false && this.getChargeNum() >= rechargeData[i].needGem) {
                return true;
            }
        }
        return false;
    };
    //是否显示进度奖励红点
    AcSweetGiftVo.prototype.isShowAchievementRewardRedDot = function () {
        var data = this.cfg.getAchievementList();
        for (var i = 0; i < data.length; i++) {
            if (this.isGetAchievementById(data[i].id) == false && this.v >= data[i].needNum) {
                return true;
            }
        }
        return false;
    };
    //是否显示任务奖励红点
    AcSweetGiftVo.prototype.isShowTaskRewardRedDot = function () {
        var data = this.cfg.getTaskList();
        for (var i = 0; i < data.length; i++) {
            if (this.isGetTaskById(data[i].id) == false && this.getTaskNumByType(data[i].questType) >= data[i].value) {
                return true;
            }
        }
        return false;
    };
    //是否显示兑换商店奖励红点
    AcSweetGiftVo.prototype.isShowExchangeRedDot = function () {
        // let data = this.cfg.getExchangeList();
        // let playerGem = Api.playerVoApi.getPlayerGem();
        // for (let i = 0; i < data.length; i++) {
        //     if (this.getShopValue(data[i].id) < data[i].limit && playerGem >= data[i].needGem){
        //         return true;
        //     }
        // }
        return false;
    };
    //有元宝可制作的时候显示小红点
    AcSweetGiftVo.prototype.isCanMakeRedDot = function () {
        // let playerGem = Api.playerVoApi.getPlayerGem();
        if (this.isInActivity() && (this.isfree > 0)) {
            return true;
        }
        return false;
    };
    //获取红艳皮肤需要充值的元宝数
    AcSweetGiftVo.prototype.getWifeNeedMoney = function () {
        var rechargeData = this.cfg.getRechargeList();
        if (rechargeData && rechargeData.length > 0) {
            for (var i = 0; i < rechargeData.length; i++) {
                var rewards = rechargeData[i].getReward.split("|");
                for (var key in rewards) {
                    var id = rewards[key].split("_")[1];
                    if (id == String(this.cfg.show2)) {
                        return rechargeData[i].needGem;
                    }
                }
            }
        }
        return 0;
    };
    Object.defineProperty(AcSweetGiftVo.prototype, "isShowRedDot", {
        get: function () {
            return this.isShowRewardsRedDot() || this.isCanMakeRedDot() || this.isShowAchievementRewardRedDot();
        },
        enumerable: true,
        configurable: true
    });
    AcSweetGiftVo.prototype.isShowRewardsRedDot = function () {
        return this.isShowChargeRewardRedDot() || this.isShowExchangeRedDot() || this.isShowTaskRewardRedDot();
    };
    Object.defineProperty(AcSweetGiftVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et - 86400;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcSweetGiftVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
    };
    Object.defineProperty(AcSweetGiftVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    return AcSweetGiftVo;
}(AcBaseVo));
__reflect(AcSweetGiftVo.prototype, "AcSweetGiftVo");
//# sourceMappingURL=AcSweetGiftVo.js.map