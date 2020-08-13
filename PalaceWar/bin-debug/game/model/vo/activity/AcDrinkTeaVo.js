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
var AcDrinkTeaVo = (function (_super) {
    __extends(AcDrinkTeaVo, _super);
    function AcDrinkTeaVo() {
        var _this = _super.call(this) || this;
        _this.rinfo = null;
        _this.ainfo = null; //进度奖励
        _this.isfree = 0;
        return _this;
    }
    AcDrinkTeaVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    AcDrinkTeaVo.prototype.getNeedMoney = function () {
        var rechargeData = this.cfg.getRechargeList();
        if (rechargeData && rechargeData.length > 0) {
            for (var i = 0; i < rechargeData.length; i++) {
                var rewards = rechargeData[i].getReward.split("|");
                for (var key in rewards) {
                    var id = rewards[key].split("_")[1];
                    var itemCfg = Config.ItemCfg.getItemCfgById(id);
                    if (itemCfg) {
                        if (itemCfg.getRewards && itemCfg.getRewards.split("_")[1] && itemCfg.getRewards.split("_")[1] == String(this.cfg.show)) {
                            return rechargeData[i].needGem;
                        }
                    }
                }
            }
        }
        return 0;
    };
    //获取累积充值数目
    AcDrinkTeaVo.prototype.getChargeNum = function () {
        var num = 0;
        if (this.rinfo && this.rinfo.v) {
            num = this.rinfo.v;
        }
        return num;
    };
    //获得充值奖励的配置
    AcDrinkTeaVo.prototype.getSortRechargeCfg = function () {
        var rechargeData = this.cfg.getRechargeList();
        for (var i = 0; i < rechargeData.length; i++) {
            if (this.isGetRecharge(String(rechargeData[i].id))) {
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
    /*累积充值领取判断*/
    AcDrinkTeaVo.prototype.isGetRecharge = function (id) {
        if (this.rinfo && this.rinfo.flags && this.rinfo.flags[id]) {
            return true;
        }
        return false;
    };
    Object.defineProperty(AcDrinkTeaVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    //充值奖励红点
    AcDrinkTeaVo.prototype.isShowRechargeDot = function () {
        var curNum = this.getChargeNum();
        var data = this.cfg.getRechargeList();
        for (var i = 0; i < data.length; i++) {
            if (!this.isGetRecharge(String(data[i].id))) {
                if (curNum >= data[i].needGem) {
                    return true;
                }
            }
        }
        return false;
    };
    AcDrinkTeaVo.prototype.getSortAchievementCfg = function () {
        var data = this.cfg.getAchieveList();
        for (var i = 0; i < data.length; i++) {
            if (this.isGetAchievementById(String(data[i].id))) {
                data[i].sortId = data.length + Number(data[i].id);
            }
            else if (this.getAchieveNum() >= data[i].needNum) {
                data[i].sortId = (Number(data[i].id)) - data.length - 1;
            }
            else {
                data[i].sortId = Number(data[i].id);
            }
        }
        data.sort(function (a, b) { return a.sortId - b.sortId; });
        return data;
    };
    //是否已领取进度奖励
    AcDrinkTeaVo.prototype.isGetAchievementById = function (id) {
        if (this.ainfo && this.ainfo.flags && this.ainfo.flags[id]) {
            return true;
        }
        return false;
    };
    AcDrinkTeaVo.prototype.getProcess = function () {
        return this.v;
    };
    AcDrinkTeaVo.prototype.getAchieveNum = function () {
        var num = 0;
        if (this.ainfo && this.ainfo.v) {
            num = this.ainfo.v;
        }
        return num;
    };
    AcDrinkTeaVo.prototype.isShowAchieveDot = function () {
        var data = this.cfg.getAchieveList();
        for (var i = 0; i < data.length; i++) {
            if (!this.isGetAchievementById(String(data[i].id))) {
                if (this.getAchieveNum() >= data[i].needNum) {
                    return true;
                }
            }
        }
        return false;
    };
    AcDrinkTeaVo.prototype.getAchieveStatus = function (i) {
        var data = this.cfg.getAchieveList();
        data.sort(function (a, b) {
            return a.id - b.id;
        });
        if (!this.isGetAchievementById(String(data[i].id))) {
            if (this.getAchieveNum() >= data[i].needNum) {
                return 2;
            }
            else {
                return 1;
            }
        }
        return 3;
    };
    Object.defineProperty(AcDrinkTeaVo.prototype, "isShowRedDot", {
        get: function () {
            var b = this.isShowRechargeDot() || this.isShowAchieveDot();
            if (b) {
                return b;
            }
            if (!this.checkIsInEndShowTime()) {
                return this.getProcess() > 0 || this.isfree > 0;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AcDrinkTeaVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
    };
    AcDrinkTeaVo.prototype.dispose = function () {
        this.rinfo = null;
        this.ainfo = null;
        this.isfree = null;
        _super.prototype.dispose.call(this);
    };
    return AcDrinkTeaVo;
}(AcBaseVo));
__reflect(AcDrinkTeaVo.prototype, "AcDrinkTeaVo");
//# sourceMappingURL=AcDrinkTeaVo.js.map