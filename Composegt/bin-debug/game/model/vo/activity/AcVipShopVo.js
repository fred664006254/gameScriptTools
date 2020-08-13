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
var AcVipShopVo = (function (_super) {
    __extends(AcVipShopVo, _super);
    function AcVipShopVo() {
        var _this = _super.call(this) || this;
        _this.shop = null;
        return _this;
    }
    AcVipShopVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        if (data.shop != null) {
            this.shop = data.shop;
        }
    };
    AcVipShopVo.prototype.dispose = function () {
        this.shop = null;
    };
    return AcVipShopVo;
}(AcBaseVo));
__reflect(AcVipShopVo.prototype, "AcVipShopVo");
