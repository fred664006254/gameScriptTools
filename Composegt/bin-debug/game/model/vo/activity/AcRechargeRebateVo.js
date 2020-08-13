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
var AcRechargeRebateVo = (function (_super) {
    __extends(AcRechargeRebateVo, _super);
    function AcRechargeRebateVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AcRechargeRebateVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RECHARGEREBATE_REFRESH_V);
    };
    /** 获取某档位可以领取多少次 */
    AcRechargeRebateVo.prototype.getCollectNum = function (rechargeKey) {
        // 充过多少次
        var rechargeCount = 0;
        // 领过多少次
        var getCount = 0;
        if (this.buyinfo && this.buyinfo[rechargeKey]) {
            rechargeCount = this.buyinfo[rechargeKey];
        }
        if (this.stageinfo && this.stageinfo[rechargeKey]) {
            getCount = this.stageinfo[rechargeKey];
        }
        return rechargeCount - getCount;
    };
    Object.defineProperty(AcRechargeRebateVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRechargeRebateVo.prototype, "isShowRedDot", {
        get: function () {
            if (!this.cfg) {
                return false;
            }
            var list = this.cfg.getList();
            for (var key in list) {
                if (list.hasOwnProperty(key)) {
                    if (this.getCollectNum(list[key].needGem) > 0) {
                        return true;
                    }
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRechargeRebateVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcRechargeRebateVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et;
    };
    AcRechargeRebateVo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcRechargeRebateVo;
}(AcBaseVo));
__reflect(AcRechargeRebateVo.prototype, "AcRechargeRebateVo");
