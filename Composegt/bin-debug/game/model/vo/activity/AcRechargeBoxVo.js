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
var AcRechargeBoxVo = (function (_super) {
    __extends(AcRechargeBoxVo, _super);
    function AcRechargeBoxVo() {
        var _this = _super.call(this) || this;
        _this.ainfo = null;
        return _this;
    }
    AcRechargeBoxVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    /**
     * 通过充值档位 获得充值的次数
     */
    AcRechargeBoxVo.prototype.getBoxReChargeNum = function (gears) {
        if (this.ainfo.v[gears]) {
            return this.ainfo.v[gears];
        }
        else {
            return 0;
        }
    };
    /**
     * 通过充值档位 获得充值的次数
     */
    AcRechargeBoxVo.prototype.getBoxReceiveNum = function (gears) {
        if (this.ainfo.flags[gears]) {
            return this.ainfo.flags[gears];
        }
        else {
            return 0;
        }
    };
    Object.defineProperty(AcRechargeBoxVo.prototype, "acTimeAndHour", {
        /**
         * 活动时间  不需要显示展示期
         */
        get: function () {
            var et = this.et;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRechargeBoxVo.prototype, "isShowRedDot", {
        get: function () {
            var deltaT = this.et - GameData.serverTime;
            if (deltaT < 0) {
                return false;
            }
            var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
            if (!cfg) {
                return false;
            }
            for (var i = 0; i < cfg.getBoxListData().length; i++) {
                var itemCfg = cfg.getBoxListData()[i];
                var rechargeNum = this.getBoxReChargeNum(itemCfg.needGem);
                var receiveNum = this.getBoxReceiveNum(itemCfg.needGem);
                if (receiveNum < Number(itemCfg.limit)) {
                    if (rechargeNum > receiveNum) {
                        return true;
                    }
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AcRechargeBoxVo.prototype.dispose = function () {
        this.ainfo = null;
        _super.prototype.dispose.call(this);
    };
    return AcRechargeBoxVo;
}(AcBaseVo));
__reflect(AcRechargeBoxVo.prototype, "AcRechargeBoxVo");
