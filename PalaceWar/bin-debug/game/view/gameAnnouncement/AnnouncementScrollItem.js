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
var AnnouncementScrollItem = (function (_super) {
    __extends(AnnouncementScrollItem, _super);
    function AnnouncementScrollItem() {
        var _this = _super.call(this) || this;
        _this.bg1 = null;
        _this.bg2 = null;
        _this._titleText = null;
        _this._contentText = null;
        _this.currData = {};
        return _this;
    }
    AnnouncementScrollItem.prototype.initItem = function (index, data) {
        this.currData = data;
        this.bg1 = BaseBitmap.create("announcement_itembg1");
        // this.bg1.width = 360;
        this.addChild(this.bg1);
        var leftItemTopLine = BaseBitmap.create("public_line3_halfshort");
        this.addChild(leftItemTopLine);
        var rightItemTopLine = BaseBitmap.create("public_line3_halfshort");
        rightItemTopLine.scaleX = -1;
        this.addChild(rightItemTopLine);
        if (GameAnnouncementView.currNum == index) {
            this.showDes();
        }
        this.showText();
        var minX = this._titleText.x - leftItemTopLine.width - 5;
        var maxX = this._titleText.x + this._titleText.width + 5 + rightItemTopLine.width;
        if (minX < 0 || (maxX > this.bg1.width)) {
            leftItemTopLine.visible = false;
            rightItemTopLine.visible = false;
        }
        else {
            leftItemTopLine.setPosition(minX, this.bg1.y + (this.bg1.height - leftItemTopLine.height) / 2);
            rightItemTopLine.setPosition(maxX, this.bg1.y + (this.bg1.height - rightItemTopLine.height) / 2);
        }
    };
    AnnouncementScrollItem.prototype.showText = function () {
        this._titleText = ComponentManager.getTextField(this.currData.title, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._titleText.setPosition(this.bg1.x + (this.bg1.width - this._titleText.width) / 2, this.bg1.y + (this.bg1.height - this._titleText.height) / 2);
        this.addChild(this._titleText);
    };
    AnnouncementScrollItem.prototype.showDes = function () {
        this.bg2 = BaseBitmap.create("public_9_managebg"); //"public_9_probiginnerbg");
        this.bg2.width = this.bg1.width;
        this.bg2.height = 220;
        this.bg2.x = this.bg1.x;
        this.bg2.y = this.bg1.y;
        this.addChild(this.bg2);
        this.setChildIndex(this.bg2, 0);
        this._contentText = ComponentManager.getTextField(this.currData.content, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        this._contentText.x = this.bg1.x + 15;
        this._contentText.y = this.bg1.y + this.bg1.height + 10;
        this._contentText.lineSpacing = 6;
        this._contentText.width = this.bg2.width - 30;
        this.addChild(this._contentText);
        this.bg2.height = this._contentText.y + this._contentText.height + 10;
    };
    AnnouncementScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AnnouncementScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    AnnouncementScrollItem.prototype.dispose = function () {
        this.bg1 = null;
        this.bg2 = null;
        this._titleText = null;
        this._contentText = null;
        _super.prototype.dispose.call(this);
    };
    return AnnouncementScrollItem;
}(ScrollListItem));
__reflect(AnnouncementScrollItem.prototype, "AnnouncementScrollItem");
//# sourceMappingURL=AnnouncementScrollItem.js.map