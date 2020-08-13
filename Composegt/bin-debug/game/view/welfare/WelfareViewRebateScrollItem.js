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
var WelfareViewRebateScrollItem = (function (_super) {
    __extends(WelfareViewRebateScrollItem, _super);
    function WelfareViewRebateScrollItem() {
        return _super.call(this) || this;
    }
    WelfareViewRebateScrollItem.prototype.initItem = function (index, data) {
        var temW = 491;
        var temH = 115;
        var line1 = BaseBitmap.create("public_line3");
        line1.width = temW - 100;
        line1.x = temW / 2 - line1.width / 2;
        line1.y = 10;
        this.addChild(line1);
        var bg = BaseBitmap.create("public_9_managebg");
        bg.width = temW - 40;
        bg.height = 75;
        bg.x = temW / 2 - bg.width / 2;
        bg.y = line1.y + 27;
        this.addChild(bg);
        if (index != 0) {
            var titleText = ComponentManager.getTextField(LanguageManager.getlocal("rebateTitle" + index), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            titleText.setPosition(temW / 2 - titleText.width / 2 * titleText.scaleX, line1.y);
            this.addChild(titleText);
        }
        var desText = ComponentManager.getTextField(LanguageManager.getlocal("rebateDes" + index), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        desText.setPosition(30, bg.y + 8);
        desText.width = bg.width - 15;
        this.addChild(desText);
        desText.lineSpacing = 3;
        if (desText.textHeight > bg.height) {
            bg.height = desText.textHeight + 30;
        }
        if (index == 0) {
            line1.visible = false;
            desText.y = 5;
            desText.lineSpacing = 5;
            this.removeChild(bg);
        }
    };
    WelfareViewRebateScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return WelfareViewRebateScrollItem;
}(ScrollListItem));
__reflect(WelfareViewRebateScrollItem.prototype, "WelfareViewRebateScrollItem");
