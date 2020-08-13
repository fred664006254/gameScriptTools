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
var ShopViewTab2 = (function (_super) {
    __extends(ShopViewTab2, _super);
    function ShopViewTab2() {
        var _this = _super.call(this) || this;
        _this._index = 0;
        _this._shopid = 0;
        _this.initView();
        return _this;
    }
    ShopViewTab2.prototype.initView = function () {
        this._shopInfoVoList = Api.shopVoApi.getShopInfoListByType(3);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 600, GameConfig.stageHeigth - 390);
        this._scrollList = ComponentManager.getScrollList(Shop3ScrollItem, this._shopInfoVoList, rect);
        this.addChild(this._scrollList);
        this._scrollList.setPosition(20, 70);
        if (Api.rookieVoApi.curGuideKey == "shop") {
            this._scrollList.setScrollTopByIndex(this._shopInfoVoList.length - 1);
        }
    };
    ShopViewTab2.prototype.getSheepType = function () {
        return 3;
    };
    ShopViewTab2.prototype.dispose = function () {
        this._scrollList = null;
        this._shopInfoVoList = null;
        this._index = 0;
        this._shopid = 0;
        _super.prototype.dispose.call(this);
    };
    return ShopViewTab2;
}(CommonViewTab));
__reflect(ShopViewTab2.prototype, "ShopViewTab2");
//# sourceMappingURL=ShopViewTab2.js.map