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
var ZeroGiftItem = (function (_super) {
    __extends(ZeroGiftItem, _super);
    function ZeroGiftItem() {
        return _super.call(this) || this;
    }
    ZeroGiftItem.prototype.initItem = function (index, data) {
        var icon = GameData.getItemIcon(data, true);
        icon.scaleX = icon.scaleY = 0.7;
        this.addChild(icon);
    };
    ZeroGiftItem.prototype.getSpaceX = function () {
        return 66;
    };
    /**
     * 不同格子Y间距
     */
    ZeroGiftItem.prototype.getSpaceY = function () {
        return 12;
    };
    ZeroGiftItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return ZeroGiftItem;
}(ScrollListItem));
__reflect(ZeroGiftItem.prototype, "ZeroGiftItem");
