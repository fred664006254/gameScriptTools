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
var AcAllianceRechargeTotalVo = (function (_super) {
    __extends(AcAllianceRechargeTotalVo, _super);
    function AcAllianceRechargeTotalVo() {
        var _this = _super.call(this) || this;
        _this.flags = [];
        _this.rechargeFlag = 0;
        _this.renum = 0;
        _this.index = -1;
        return _this;
    }
    Object.defineProperty(AcAllianceRechargeTotalVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcAllianceRechargeTotalVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        if (data.flags) {
            this.flags = data.flags;
        }
        if (data.renum) {
            this.renum = data.renum;
        }
        if (data.rechargeFlag) {
            this.rechargeFlag = data.rechargeFlag;
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_AID_AllIANCERECHARGECOUNT_FRESH2);
    };
    AcAllianceRechargeTotalVo.prototype.getRechargeFlag = function () {
        return this.rechargeFlag;
    };
    AcAllianceRechargeTotalVo.prototype.getChargeNum = function () {
        return Number(this.renum);
    };
    Object.defineProperty(AcAllianceRechargeTotalVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et - 86400 * 1;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcAllianceRechargeTotalVo.prototype.isActivityPeriod = function () {
        if (GameData.serverTime > this.et - 86400 * 1) {
            return false;
        }
        else {
            return true;
        }
    };
    AcAllianceRechargeTotalVo.prototype.isActivityPeriod2 = function () {
        if (GameData.serverTime > this.et) {
            return false;
        }
        else {
            return true;
        }
    };
    /*累积充值领取判断*/
    AcAllianceRechargeTotalVo.prototype.isGetRecharge = function (id) {
        if (this.flags) {
            for (var key in this.flags) {
                if (this.flags[id] == 1) {
                    return true;
                }
            }
            return false;
        }
        return false;
    };
    Object.defineProperty(AcAllianceRechargeTotalVo.prototype, "isShowRedDot", {
        get: function () {
            var cfg = this.cfg;
            if (!cfg) {
                return false;
            }
            var curTurn = this.renum;
            for (var i in cfg.countReward) {
                var unit = cfg.countReward[i];
                if (curTurn >= unit.total && this.isGetRecharge(Number(i) + 1) == false && this.getRechargeFlag() == 1) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AcAllianceRechargeTotalVo.prototype.dispose = function () {
        this.flags = null;
        this.rechargeFlag = null;
        this.renum = null;
        this.index = -1;
    };
    return AcAllianceRechargeTotalVo;
}(AcBaseVo));
__reflect(AcAllianceRechargeTotalVo.prototype, "AcAllianceRechargeTotalVo");
//# sourceMappingURL=AcAllianceRechargeTotalVo.js.map