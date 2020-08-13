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
var AcBlackMarketVo = (function (_super) {
    __extends(AcBlackMarketVo, _super);
    function AcBlackMarketVo() {
        var _this = _super.call(this) || this;
        _this.v = 0;
        _this.flags = {};
        _this.bankBox = null;
        _this.item = {};
        _this.cinfo = {};
        _this.isTouch = null;
        return _this;
    }
    AcBlackMarketVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
            this.cinfo = data.cinfo;
        }
        if (this.isReList == false) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_BLACKMARKET_REFRESH);
        }
    };
    //获取累积充值数目
    AcBlackMarketVo.prototype.getChargeNum = function () {
        if (this.cinfo.chargeNum) {
            return Number(this.cinfo.chargeNum);
        }
        return 0;
    };
    Object.defineProperty(AcBlackMarketVo.prototype, "isReList", {
        get: function () {
            if (this.isTouch != null) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AcBlackMarketVo.prototype.getLimitBuyNum = function (id) {
        var buyNum = 0;
        var info = this.cinfo;
        if (info && info[id]) {
            buyNum += info[id];
        }
        return buyNum;
    };
    AcBlackMarketVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400;
    };
    AcBlackMarketVo.prototype.dispose = function () {
        this.bankBox = null;
        this.isTouch = null;
    };
    return AcBlackMarketVo;
}(AcBaseVo));
__reflect(AcBlackMarketVo.prototype, "AcBlackMarketVo");
//# sourceMappingURL=AcBlackMarketVo.js.map