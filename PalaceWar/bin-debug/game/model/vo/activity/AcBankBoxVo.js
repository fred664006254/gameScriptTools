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
var AcBankBoxVo = (function (_super) {
    __extends(AcBankBoxVo, _super);
    function AcBankBoxVo() {
        var _this = _super.call(this) || this;
        _this.v = 0;
        _this.flags = {};
        _this.bankBox = null;
        _this.item = {};
        return _this;
    }
    AcBankBoxVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
            if (data.flags) {
                this.flags = data.flags;
            }
            if (data.v) {
                this.v = data.v;
            }
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ANNIVERS_REFRESH);
    };
    /**
     * 通过充值档位 获得充值的次数
     */
    AcBankBoxVo.prototype.getBoxReChargeNum = function (gears) {
        if (this.v[gears]) {
            return this.v[gears];
        }
        else {
            return 0;
        }
    };
    /**
     * 通过充值档位 获得充值的次数
     */
    AcBankBoxVo.prototype.getBoxReceiveNum = function (gears) {
        if (this.flags[gears]) {
            return this.flags[gears];
        }
        else {
            return 0;
        }
    };
    AcBankBoxVo.prototype.getLimitBuyNum = function (id) {
        var buyNum = 0;
        var info = this.item;
        if (info && info[id]) {
            buyNum += info[id];
        }
        return buyNum;
    };
    Object.defineProperty(AcBankBoxVo.prototype, "isShowRedDot", {
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
                    if (rechargeNum > receiveNum && this.isStart) {
                        return true;
                    }
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AcBankBoxVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400;
    };
    AcBankBoxVo.prototype.dispose = function () {
        this.bankBox = null;
    };
    return AcBankBoxVo;
}(AcBaseVo));
__reflect(AcBankBoxVo.prototype, "AcBankBoxVo");
//# sourceMappingURL=AcBankBoxVo.js.map