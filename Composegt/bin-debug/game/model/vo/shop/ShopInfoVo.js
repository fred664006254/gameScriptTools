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
/**
 * 商店itemvo
 * author dmj
 * date 2017/10/28
 * @class ShopInfoVo
 */
var ShopInfoVo = (function (_super) {
    __extends(ShopInfoVo, _super);
    function ShopInfoVo() {
        var _this = _super.call(this) || this;
        /**商品id */
        _this.id = 0;
        _this.buyNum = 0;
        return _this;
    }
    ShopInfoVo.prototype.initData = function (data) {
        if (data.num != null) {
            this.buyNum = Number(data.num);
        }
        if (data.id != null) {
            this.id = Number(data.id);
        }
    };
    ShopInfoVo.prototype.dispose = function () {
        this.id = 0;
        this.buyNum = 0;
    };
    return ShopInfoVo;
}(BaseVo));
__reflect(ShopInfoVo.prototype, "ShopInfoVo");
