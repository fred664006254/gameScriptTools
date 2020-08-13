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
var WelfareViewGoldblessScrollItem = (function (_super) {
    __extends(WelfareViewGoldblessScrollItem, _super);
    function WelfareViewGoldblessScrollItem() {
        return _super.call(this) || this;
    }
    WelfareViewGoldblessScrollItem.prototype.initItem = function (index, data) {
        var temW = 491;
        var temH = 115;
        var bg = BaseBitmap.create("public_tc_bg03");
        bg.width = 434; //temW - 40;
        bg.height = 123;
        bg.x = temW / 2 - bg.width / 2;
        bg.y = 5;
        this.addChild(bg);
        var word = BaseBitmap.create("godbless_" + data.name);
        word.setScale(0.7);
        word.setPosition(temW / 2 - word.width / 2 * word.scaleX, bg.y + 10);
        this.addChild(word);
        var num = Api.vipVoApi.getDailyLuckNum();
        var fntSize = TextFieldConst.FONTSIZE_CONTENT_SMALL;
        if (PlatformManager.checkIsViSp()) {
            fntSize = TextFieldConst.FONTSIZE_ACTIVITY_COMMON;
        }
        var timesText = ComponentManager.getTextField(LanguageManager.getlocal("godBlessTimes", [num.toString()]), fntSize, TextFieldConst.COLOR_BROWN);
        timesText.setPosition(35, 55);
        this.addChild(timesText);
        var times = data.times;
        var rate = data.rate * 100;
        var descText = ComponentManager.getTextField(LanguageManager.getlocal("godBlessEffect") + LanguageManager.getlocal("godbless_" + data.name, [rate.toString(), times.toString()]), fntSize, TextFieldConst.COLOR_BROWN);
        descText.setPosition(timesText.x, timesText.y + 29);
        descText.size = 19;
        this.addChild(descText);
    };
    WelfareViewGoldblessScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return WelfareViewGoldblessScrollItem;
}(ScrollListItem));
__reflect(WelfareViewGoldblessScrollItem.prototype, "WelfareViewGoldblessScrollItem");
