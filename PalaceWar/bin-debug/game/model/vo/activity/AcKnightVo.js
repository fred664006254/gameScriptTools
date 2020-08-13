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
var AcKnightVo = (function (_super) {
    __extends(AcKnightVo, _super);
    function AcKnightVo() {
        var _this = _super.call(this) || this;
        _this.rinfo = null;
        _this.achieve = null; //进度奖励
        _this.isfree = 0;
        return _this;
    }
    AcKnightVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    AcKnightVo.prototype.getNeedMoney = function () {
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
    AcKnightVo.prototype.getAttackProcess = function () {
        var data = this.cfg.getAchieveList();
        data.sort(function (a, b) {
            return a.id - b.id;
        });
        for (var i = 0; i < data.length; i++) {
            var value = this.getAchieveProcessById(String(data[i].id));
            if (value < data[i].npcHp) {
                return { id: data[i].id, cur: value, max: data[i].npcHp };
            }
            else {
                if (i == data.length - 1) {
                    return { id: data[i].id + 1, cur: -1, max: -1 };
                }
            }
        }
        return { id: 1, cur: 0, max: 0 };
    };
    //获取累积充值数目
    AcKnightVo.prototype.getChargeNum = function () {
        var num = 0;
        if (this.rinfo && this.rinfo.v) {
            num = this.rinfo.v;
        }
        return num;
    };
    //获得充值奖励的配置
    AcKnightVo.prototype.getSortRechargeCfg = function () {
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
    AcKnightVo.prototype.isGetRecharge = function (id) {
        if (this.rinfo && this.rinfo.flags && this.rinfo.flags[id]) {
            return true;
        }
        return false;
    };
    Object.defineProperty(AcKnightVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    //充值奖励红点
    AcKnightVo.prototype.isShowRechargeDot = function () {
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
    AcKnightVo.prototype.getSortAchievementCfg = function () {
        var data = this.cfg.getAchieveList();
        for (var i = 0; i < data.length; i++) {
            if (this.isGetAchievementById(String(data[i].id))) {
                data[i].sortId = data.length + Number(data[i].id);
            }
            else if (this.getAchieveProcessById(String(data[i].id)) >= data[i].npcHp) {
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
    AcKnightVo.prototype.isGetAchievementById = function (id) {
        if (this.achieve && this.achieve.flags && this.achieve.flags[id]) {
            return true;
        }
        return false;
    };
    AcKnightVo.prototype.getProcess = function () {
        return this.v;
    };
    AcKnightVo.prototype.getAchieveProcessById = function (id) {
        if (this.achieve && this.achieve.v && this.achieve.v[parseInt(id) - 1]) {
            return this.achieve.v[parseInt(id) - 1];
        }
        return 0;
    };
    AcKnightVo.prototype.isShowAchieveDot = function () {
        var data = this.cfg.getAchieveList();
        for (var i = 0; i < data.length; i++) {
            if (!this.isGetAchievementById(String(data[i].id))) {
                if (this.getAchieveProcessById(String(data[i].id)) >= data[i].npcHp) {
                    return true;
                }
            }
        }
        return false;
    };
    Object.defineProperty(AcKnightVo.prototype, "isShowRedDot", {
        get: function () {
            var b = this.isShowRechargeDot() || this.isShowAchieveDot() || this.isShowQingyuanRedDot();
            if (b) {
                return b;
            }
            if (!this.checkIsInEndShowTime()) {
                return this.getProcess() > 0 || this.isfree > 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    //是否有情缘红点
    AcKnightVo.prototype.isShowQingyuanRedDot = function () {
        if ((this.code == 1) && Api.switchVoApi.checkOpenOfficialCareer() && Api.switchVoApi.checkOpenQingYuanHuiJuan() && Api.switchVoApi.checkOpenQingYuan("winterIsComing")) {
            if (Api.playerVoApi.getPlayerLevel() >= Config.CareerCfg.getStoryNeedLv()) {
                if (Api.encounterVoApi.isShowNpc()) {
                    return true;
                }
            }
        }
        return false;
    };
    AcKnightVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
    };
    AcKnightVo.prototype.dispose = function () {
        this.rinfo = null;
        this.achieve = null;
        _super.prototype.dispose.call(this);
    };
    return AcKnightVo;
}(AcBaseVo));
__reflect(AcKnightVo.prototype, "AcKnightVo");
//# sourceMappingURL=AcKnightVo.js.map