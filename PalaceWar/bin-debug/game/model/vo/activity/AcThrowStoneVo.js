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
 * 投石破敌
 * date 2019.8.27
 * author yangchengguo
 * @class AcThrowStoneVo
 */
var AcThrowStoneVo = (function (_super) {
    __extends(AcThrowStoneVo, _super);
    function AcThrowStoneVo() {
        return _super.call(this) || this;
    }
    AcThrowStoneVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    //倒计时
    AcThrowStoneVo.prototype.getCountDown = function () {
        var et = this.et - this.cfg.extraTime * 86400;
        if (et < GameData.serverTime) {
            return LanguageManager.getlocal("acPunishEnd");
        }
        return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
    };
    AcThrowStoneVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
    };
    Object.defineProperty(AcThrowStoneVo.prototype, "acTimeAndHour", {
        //活动日期时间显示
        get: function () {
            App.LogUtil.log("this. extratiem:" + this.cfg.extraTime);
            var et = this.et - 86400 * this.cfg.extraTime;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    //是否免费
    AcThrowStoneVo.prototype.isFree = function () {
        if (this.isfree > 0) {
            return true;
        }
        return false;
    };
    //充值元宝数
    AcThrowStoneVo.prototype.getChargeNum = function () {
        if (this.rinfo && this.rinfo.v) {
            return this.rinfo.v;
        }
        return 0;
    };
    //是否已领取充值奖励
    AcThrowStoneVo.prototype.isGetRechargeById = function (id) {
        if (this.rinfo && this.rinfo.flags && this.rinfo.flags[id]) {
            return true;
        }
        return false;
    };
    //是否已领取进度奖励
    AcThrowStoneVo.prototype.isGetAchievementById = function (id) {
        if (this.score && this.score.flags && this.score.flags[id]) {
            return true;
        }
        return false;
    };
    //当前进度领取奖励状态 0 不可领取  1 可领取  2 已领取
    AcThrowStoneVo.prototype.getAchievementStatusById = function (id) {
        if (this.isGetAchievementById(id)) {
            return 2;
        }
        else {
            var data = this.cfg.getAchievementList();
            for (var i = 0; i < data.length; i++) {
                if (data[i].id == id) {
                    if (data[i].needNum <= this.score.v) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                }
            }
        }
        return 0;
    };
    //当前石头数量
    AcThrowStoneVo.prototype.getStoneNum = function () {
        return this.v;
    };
    //当前分数
    AcThrowStoneVo.prototype.getScore = function () {
        if (this.score && this.score.v) {
            return this.score.v;
        }
        return 0;
    };
    //获得充值奖励的配置
    AcThrowStoneVo.prototype.getSortRechargeCfg = function () {
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
    //进度奖励
    AcThrowStoneVo.prototype.getSortAchievementCfg = function () {
        var data = this.getAchievementCfg();
        if (!this.isSecond()) {
            data = this.getCurrAchievementCfg();
        }
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
        // data.sort((a, b) => { return a.sortId - b.sortId });
        return data;
    };
    //获取阶段进度奖励
    AcThrowStoneVo.prototype.getCurrAchievementCfg = function () {
        var list = [];
        var data = this.cfg.getAchievementList();
        var stIndex = 0;
        var endIndex = 5;
        App.LogUtil.log("data.le:" + data.length);
        if (this.isSecond()) {
            stIndex = 4;
            endIndex = data.length;
        }
        for (var i = stIndex; i < endIndex; i++) {
            list.push(data[i]);
        }
        return list;
    };
    //获取
    AcThrowStoneVo.prototype.getAchievementCfg = function () {
        var list = [];
        var data = this.cfg.getAchievementList();
        for (var i = 0; i < data.length; i++) {
            list.push(data[i]);
        }
        return list;
    };
    //分阶段显示
    AcThrowStoneVo.prototype.getSeprateProNum = function () {
        var data = this.cfg.getAchievementList();
        var index = 4;
        App.LogUtil.log("data" + data.length);
        if (data.length > index) {
            App.LogUtil.log("data.needNum: " + data[index].needNum);
            return data[index].needNum;
        }
        return 0;
    };
    //获取当前最大进度
    AcThrowStoneVo.prototype.getCurrMaxProNum = function () {
        if (this.isSecond()) {
            var data = this.cfg.getAchievementList();
            return data[data.length - 1].needNum;
        }
        return this.getSeprateProNum();
    };
    //是否为第二轮
    AcThrowStoneVo.prototype.isSecond = function () {
        if (this.getScore() >= this.getSeprateProNum()) {
            return true;
        }
        return false;
    };
    //是否显示充值奖励红点
    AcThrowStoneVo.prototype.isShowChargeRewardRedDot = function () {
        var rechargeData = this.cfg.getRechargeList();
        for (var i = 0; i < rechargeData.length; i++) {
            if (this.isGetRechargeById(rechargeData[i].id) == false && this.getChargeNum() >= rechargeData[i].needGem) {
                return true;
            }
        }
        return false;
    };
    //是否显示进度奖励红点
    AcThrowStoneVo.prototype.isShowAchievementRewardRedDot = function () {
        var data = this.cfg.getAchievementList();
        for (var i = 0; i < data.length; i++) {
            if (this.isGetAchievementById(data[i].id) == false && this.getScore() >= data[i].needNum) {
                return true;
            }
        }
        return false;
    };
    //可投石的时候显示小红点
    AcThrowStoneVo.prototype.isCanThrowRedDot = function () {
        if (this.isInActivity() && (this.isfree > 0)) {
            return true;
        }
        return false;
    };
    Object.defineProperty(AcThrowStoneVo.prototype, "isShowRedDot", {
        get: function () {
            return this.isShowAchievementRewardRedDot() || this.isCanThrowRedDot() || this.isShowChargeRewardRedDot();
        },
        enumerable: true,
        configurable: true
    });
    //获取门客对应的数据
    AcThrowStoneVo.prototype.getServantData = function () {
        var data = this.cfg.getAchievementList();
        for (var i = 0; i < data.length; i++) {
            var rewardArr = data[i].getReward.split("|");
            for (var j = 0; j < rewardArr.length; j++) {
                var id = rewardArr[j].split("_")[1];
                if (id == String(this.cfg.show2)) {
                    return { needNum: data[i].needNum, index: i + 1 };
                }
            }
        }
        return { needNum: 0, index: 1 };
    };
    //获取佳人对应的数据
    AcThrowStoneVo.prototype.getWifeData = function () {
        var data = this.cfg.getRechargeList();
        for (var i = 0; i < data.length; i++) {
            var rewardArr = data[i].getReward.split("|");
            for (var j = 0; j < rewardArr.length; j++) {
                var id = rewardArr[j].split("_")[1];
                if (id == String(this.cfg.show1)) {
                    return { needNum: data[i].needGem, index: i + 1 };
                }
            }
        }
        return { needNum: 0, index: 1 };
    };
    Object.defineProperty(AcThrowStoneVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    return AcThrowStoneVo;
}(AcBaseVo));
__reflect(AcThrowStoneVo.prototype, "AcThrowStoneVo");
//# sourceMappingURL=AcThrowStoneVo.js.map