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
var MailRewardScrollItem = (function (_super) {
    __extends(MailRewardScrollItem, _super);
    function MailRewardScrollItem() {
        return _super.call(this) || this;
    }
    MailRewardScrollItem.prototype.initItem = function (index, rewardInfoVo) {
        var temW = 95;
        var temH = 94;
        var icon = GameData.getItemIcon(rewardInfoVo, true);
        icon.scaleX = temW / icon.width;
        icon.scaleY = temH / icon.height;
        this.addChild(icon);
        this.width = temW + this.getSpaceX();
        this.height = temH + this.getSpaceY();
    };
    MailRewardScrollItem.prototype.getSpaceX = function () {
        return 4.1;
    };
    MailRewardScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    MailRewardScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return MailRewardScrollItem;
}(ScrollListItem));
__reflect(MailRewardScrollItem.prototype, "MailRewardScrollItem");
