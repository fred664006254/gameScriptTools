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
var AcDailyActivityScrollItem = (function (_super) {
    __extends(AcDailyActivityScrollItem, _super);
    function AcDailyActivityScrollItem() {
        return _super.call(this) || this;
    }
    AcDailyActivityScrollItem.prototype.initItem = function (index, data) {
        var reward = GameData.getItemIcon(data, true, true);
        //透明图填充Item
        var fillBg = BaseBitmap.create("public_9_alpha0");
        fillBg.width = reward.width + 10;
        fillBg.height = reward.height + 20;
        reward.setPosition(fillBg.x + fillBg.width - reward.width, fillBg.y + fillBg.height / 2 - reward.height / 2);
        this.width = fillBg.width + 8;
        this.height = fillBg.height + 8;
        this.addChild(fillBg);
        this.addChild(reward);
    };
    AcDailyActivityScrollItem.prototype.getSpaceX = function () {
        return 15;
    };
    /**
     * 不同格子Y间距
     */
    AcDailyActivityScrollItem.prototype.getSpaceY = function () {
        return 15;
    };
    AcDailyActivityScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcDailyActivityScrollItem;
}(ScrollListItem));
__reflect(AcDailyActivityScrollItem.prototype, "AcDailyActivityScrollItem");
