/*
 *@description: 公告列表的 item
 *@author: hwc
 *@date: 2020-04-16 18:06:54
 *@version 0.0.1
 */
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
var AnnoListItem = (function (_super) {
    __extends(AnnoListItem, _super);
    function AnnoListItem() {
        return _super.call(this) || this;
    }
    AnnoListItem.prototype.initItem = function (index, data, itemParam) {
        var bg = BaseBitmap.create("annou_0");
        this.addChild(bg);
        bg.height = 270;
        bg.width = 552;
    };
    /**
     * 不同格子X间距
     */
    AnnoListItem.prototype.getSpaceX = function () {
        return _super.prototype.getSpaceX.call(this);
    };
    /**
     * 不同格子Y间距
     */
    AnnoListItem.prototype.getSpaceY = function () {
        return 20;
    };
    AnnoListItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AnnoListItem;
}(ScrollListItem));
__reflect(AnnoListItem.prototype, "AnnoListItem");
//# sourceMappingURL=AnnoListItem.js.map