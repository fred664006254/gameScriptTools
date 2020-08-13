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
        var line1 = BaseBitmap.create("public_line3");
        line1.width = temW - 50;
        line1.x = temW / 2 - line1.width / 2;
        line1.y = 14;
        this.addChild(line1);
        var bg = BaseBitmap.create("public_9_managebg");
        bg.width = temW - 40;
        bg.height = 75;
        bg.x = temW / 2 - bg.width / 2;
        bg.y = line1.y + 27;
        this.addChild(bg);
        var res = "godbless_" + data.name;
        if (Api.switchVoApi.checkIsInBlueWife() && RES.hasRes(res + "_blueType")) {
            res = res + "_blueType";
        }
        var word = BaseBitmap.create(res);
        word.setScale(0.7);
        word.setPosition(temW / 2 - word.width / 2 * word.scaleX, 2);
        this.addChild(word);
        var num = Api.vipVoApi.getDailyLuckNum();
        var timesText = ComponentManager.getTextField(LanguageManager.getlocal("godBlessTimes", [num.toString()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        timesText.setPosition(30, 55);
        this.addChild(timesText);
        var times = data.times;
        var rate = data.rate * 100;
        var descText = ComponentManager.getTextField(LanguageManager.getlocal("godBlessEffect") + LanguageManager.getlocal("godbless_" + data.name, [rate.toString(), times.toString()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        descText.setPosition(timesText.x, timesText.y + 29);
        this.addChild(descText);
    };
    WelfareViewGoldblessScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return WelfareViewGoldblessScrollItem;
}(ScrollListItem));
__reflect(WelfareViewGoldblessScrollItem.prototype, "WelfareViewGoldblessScrollItem");
//# sourceMappingURL=WelfareViewGoldblessScrollItem.js.map