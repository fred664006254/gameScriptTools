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
        _this.itemListType = true;
        _this.touchNum = 0;
        _this._titleText = null;
        _this._contentText = null;
        _this.currData = {};
        return _this;
    }
    AnnouncementScrollItem.prototype.initItem = function (index, data) {
        this.currData = data;
        this.bg1 = BaseBitmap.create("public_gogao");
        this.bg1.width = 506;
        this.bg1.height = 60;
        this.bg1.y = 10;
        this.addChild(this.bg1);
        if (this.itemListType) {
            if (GameAnnouncementView.currNum == index) {
                this.touchNum += 1;
                this.showDes();
            }
        }
        else {
            this.closeDes();
        }
        this.showText();
    };
    AnnouncementScrollItem.prototype.showText = function () {
        this._titleText = ComponentManager.getTextField(this.currData.title, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._titleText.x = this.bg1.x + 30;
        this._titleText.y = this.bg1.y + 20;
        this.addChild(this._titleText);
    };
    AnnouncementScrollItem.prototype.showDes = function () {
        this.bg2 = BaseBitmap.create("load_4");
        this.bg2.width = 512;
        this.bg2.height = 360;
        this.bg2.alpha = 0.8;
        this.bg2.x = this.bg2.x - 5;
        this.bg2.y = this.bg1.y - 5; // this.bg1.height-12;
        this.addChild(this.bg2);
        this.setChildIndex(this.bg2, 0);
        this._contentText = ComponentManager.getTextField(this.currData.content, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this._contentText.x = this.bg1.x + 20;
        this._contentText.y = this.bg1.y + 65;
        this._contentText.lineSpacing = 6;
        this._contentText.width = this.bg2.width - 30;
        // this._contentText.height = this.bg2.height - 20;
        this.addChild(this._contentText);
        this.bg2.height = this._contentText.textHeight + 30 + 55;
    };
    AnnouncementScrollItem.prototype.closeDes = function () {
        this.bg2 = null;
        this._contentText = null;
        // if (this.bg2) {
        // 	this.removeChild(this.bg2);
        // }
        // if(this._contentText)
        // {
        //  this.removeChild(this._contentText)
        // }
    };
    AnnouncementScrollItem.prototype.getSpaceY = function () {
        return 10;
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
