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
var AcAllianceRechargeVo = (function (_super) {
    __extends(AcAllianceRechargeVo, _super);
    function AcAllianceRechargeVo() {
        var _this = _super.call(this) || this;
        // model信息
        // renum  充值人数
        // rechargeFlag 自己是否充值
        // flags 领奖记录
        //次数奖励情况
        _this.renum = 0;
        _this.rechargeFlag = 0;
        _this.flags = [];
        _this.rtotal = 0;
        return _this;
    }
    Object.defineProperty(AcAllianceRechargeVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcAllianceRechargeVo.prototype.initData = function (data) {
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
        if (data.rtotal) {
            this.rtotal = data.rtotal;
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ALLIANCERECHARGE_REFRESHVO);
    };
    AcAllianceRechargeVo.prototype.getRechargeFlag = function () {
        return this.rechargeFlag;
    };
    AcAllianceRechargeVo.prototype.getRenum = function () {
        return Number(this.renum);
    };
    AcAllianceRechargeVo.prototype.getRtotal = function () {
        return Number(this.rtotal);
    };
    Object.defineProperty(AcAllianceRechargeVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et - 86400 * 1;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcAllianceRechargeVo.prototype.isActivityPeriod = function () {
        if (GameData.serverTime > this.et - 86400 * 1) {
            return false;
        }
        else {
            return true;
        }
    };
    AcAllianceRechargeVo.prototype.isActivityPeriod2 = function () {
        if (GameData.serverTime > this.et) {
            return false;
        }
        else {
            return true;
        }
    };
    /*累积充值领取判断*/
    AcAllianceRechargeVo.prototype.isGetRecharge = function (id) {
        id = String(id);
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
    Object.defineProperty(AcAllianceRechargeVo.prototype, "isShowRedDot", {
        get: function () {
            var cfg = this.cfg;
            if (!cfg) {
                return false;
            }
            // let curTurn = this.renum;
            var chargeCount = this.getRtotal();
            var chargeTotal = this.getRenum();
            for (var i in cfg.countReward) {
                var unit = cfg.countReward[i];
                var boo = false;
                if (unit.count > 0) {
                    if (chargeCount >= unit.count) {
                        boo = true;
                    }
                }
                else {
                    if (chargeTotal >= unit.total) {
                        boo = true;
                    }
                }
                if (boo && this.isGetRecharge(i) == false && this.getRechargeFlag() == 1) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AcAllianceRechargeVo.prototype.dispose = function () {
        this.flags = null;
        this.rechargeFlag = null;
        this.renum = null;
        this.rtotal = null;
    };
    return AcAllianceRechargeVo;
}(AcBaseVo));
__reflect(AcAllianceRechargeVo.prototype, "AcAllianceRechargeVo");
