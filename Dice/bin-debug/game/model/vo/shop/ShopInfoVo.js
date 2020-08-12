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
        _this.uid = 0;
        _this.dailyshop = {};
        _this.gift = {};
        _this.dailyshopFlag = 0;
        _this.emoticonFlag = 0; //{1:1,2:}
        _this.lastday = 0;
        _this.expression = {};
        return _this;
    }
    ShopInfoVo.prototype.initData = function (data) {
        if (data) {
            for (var key in data) {
                this[key] = data[key];
            }
        }
    };
    ShopInfoVo.prototype.dispose = function () {
        this.uid = 0;
        this.dailyshop = {};
        this.gift = {};
        this.dailyshopFlag = 0;
        this.emoticonFlag = 0; //{1:1,2:}
        this.lastday = 0;
        this.expression = {};
    };
    return ShopInfoVo;
}(BaseVo));
__reflect(ShopInfoVo.prototype, "ShopInfoVo");
//# sourceMappingURL=ShopInfoVo.js.map