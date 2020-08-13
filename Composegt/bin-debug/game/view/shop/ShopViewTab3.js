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
var ShopViewTab3 = (function (_super) {
    __extends(ShopViewTab3, _super);
    function ShopViewTab3() {
        return _super.call(this) || this;
    }
    ShopViewTab3.prototype.getSheepType = function () {
        return 2;
    };
    return ShopViewTab3;
}(ShopViewTab2));
__reflect(ShopViewTab3.prototype, "ShopViewTab3");
