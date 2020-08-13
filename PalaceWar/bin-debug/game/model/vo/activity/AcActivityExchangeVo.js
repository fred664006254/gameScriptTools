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
var AcActivityExchangeVo = (function (_super) {
    __extends(AcActivityExchangeVo, _super);
    function AcActivityExchangeVo() {
        var _this = _super.call(this) || this;
        _this.exchange = {};
        _this.buyPoint = null;
        return _this;
    }
    AcActivityExchangeVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    /**
     * 根据ID查询剩余兑换次数
     */
    AcActivityExchangeVo.prototype.getSurNumById = function (sortId) {
        var limit = this.config.getLimitById(sortId);
        var has = this.exchange[sortId] || 0;
        return limit - has > 0 ? limit - has : 0;
    };
    Object.defineProperty(AcActivityExchangeVo.prototype, "config", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcActivityExchangeVo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcActivityExchangeVo;
}(AcBaseVo));
__reflect(AcActivityExchangeVo.prototype, "AcActivityExchangeVo");
//# sourceMappingURL=AcActivityExchangeVo.js.map