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
 * 女优活动3 依依不舍
 * author ycg
 * date 2019.10.14
 */
var AcYiyibusheVo = (function (_super) {
    __extends(AcYiyibusheVo, _super);
    function AcYiyibusheVo() {
        return _super.call(this) || this;
    }
    AcYiyibusheVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    //倒计时
    AcYiyibusheVo.prototype.getCountDown = function () {
        var et = this.et - this.cfg.extraTime * 86400;
        if (et < GameData.serverTime) {
            return LanguageManager.getlocal("acPunishEnd");
        }
        return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
    };
    AcYiyibusheVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
    };
    Object.defineProperty(AcYiyibusheVo.prototype, "acTimeAndHour", {
        //活动日期时间显示
        get: function () {
            var et = this.et - 86400 * this.cfg.extraTime;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    //是否免费
    AcYiyibusheVo.prototype.isFree = function () {
        if (this.isfree > 0) {
            return true;
        }
        return false;
    };
    //当前分数、
    AcYiyibusheVo.prototype.getScore = function () {
        if (this.v) {
            return this.v;
        }
        return 0;
    };
    //是否已领取进度奖励
    AcYiyibusheVo.prototype.isGetAchievementById = function (id) {
        if (this.rewards && this.rewards[id]) {
            return true;
        }
        return false;
    };
    //当前进度领取奖励状态 0 不可领取  1 可领取  2 已领取
    AcYiyibusheVo.prototype.getAchievementStatusById = function (id) {
        if (this.isGetAchievementById(id)) {
            return 2;
        }
        else {
            var data = this.cfg.getAchievementList();
            for (var i = 0; i < data.length; i++) {
                if (data[i].id == id) {
                    if (data[i].needNum <= this.getScore()) {
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
    //进度奖励
    AcYiyibusheVo.prototype.getSortAchievementCfg = function () {
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
        return data;
    };
    //获取阶段进度奖励
    AcYiyibusheVo.prototype.getCurrAchievementCfg = function () {
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
    //进度配置
    AcYiyibusheVo.prototype.getAchievementCfg = function () {
        var list = [];
        var data = this.cfg.getAchievementList();
        for (var i = 0; i < data.length; i++) {
            list.push(data[i]);
        }
        return list;
    };
    //分阶段显示
    AcYiyibusheVo.prototype.getSeprateProNum = function () {
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
    AcYiyibusheVo.prototype.getCurrMaxProNum = function () {
        if (this.isSecond()) {
            var data = this.cfg.getAchievementList();
            return data[data.length - 1].needNum;
        }
        return this.getSeprateProNum();
    };
    //是否为第二轮
    AcYiyibusheVo.prototype.isSecond = function () {
        if (this.getScore() >= this.getSeprateProNum()) {
            return true;
        }
        return false;
    };
    //是否显示进度奖励红点
    AcYiyibusheVo.prototype.isShowAchievementRewardRedDot = function () {
        var data = this.cfg.getAchievementList();
        for (var i = 0; i < data.length; i++) {
            if (this.isGetAchievementById(data[i].id) == false && this.getScore() >= data[i].needNum) {
                return true;
            }
        }
        return false;
    };
    //可玩的时候显示小红点
    AcYiyibusheVo.prototype.isCanPlayRedDot = function () {
        if (this.isInActivity() && (this.isfree > 0)) {
            return true;
        }
        return false;
    };
    //衣装充值数据
    AcYiyibusheVo.prototype.getShowSkinData = function () {
        var data = this.cfg.getAchievementList();
        var showId = this.cfg.show;
        for (var i = 0; i < data.length; i++) {
            var getRewards = (data[i].getReward).split("|");
            for (var k = 0; k < getRewards.length; k++) {
                var strArr = getRewards[k].split("_");
                if (strArr[1] && strArr[1] == String(showId)) {
                    return data[i];
                }
            }
        }
        return null;
    };
    Object.defineProperty(AcYiyibusheVo.prototype, "isShowRedDot", {
        get: function () {
            return this.isShowAchievementRewardRedDot() || this.isCanPlayRedDot();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcYiyibusheVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcYiyibusheVo.prototype.dispose = function () {
        this.isfree = null;
        this.rewards = null;
        _super.prototype.dispose.call(this);
    };
    return AcYiyibusheVo;
}(AcBaseVo));
__reflect(AcYiyibusheVo.prototype, "AcYiyibusheVo");
//# sourceMappingURL=AcYiyibusheVo.js.map