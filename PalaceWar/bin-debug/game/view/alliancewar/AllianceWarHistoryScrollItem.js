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
/**
 对战信息logitem
 * author shaoliang
 */
var AllianceWarHistoryScrollItem = (function (_super) {
    __extends(AllianceWarHistoryScrollItem, _super);
    function AllianceWarHistoryScrollItem() {
        return _super.call(this) || this;
    }
    AllianceWarHistoryScrollItem.prototype.initItem = function (index, data) {
        var view = this;
        var bg = BaseBitmap.create("public_9_bg14");
        bg.width = 520;
        bg.height = 120;
        this.addChild(bg);
        var timeTxt = ComponentManager.getTextField(App.DateUtil.getFormatBySecond(data.lastday, 2), 20, TextFieldConst.COLOR_WARN_GREEN2);
        timeTxt.setPosition(15, 15);
        view.addChild(timeTxt);
        var winStr = data.win > 0 ? LanguageManager.getlocal("allianceWarHistoryWin") : LanguageManager.getlocal("allianceWarHistoryFail");
        var typeStr;
        if (data.tinfo && data.tinfo.name) {
            typeStr = LanguageManager.getlocal("allianceWarHistory", [data.name, winStr, data.tinfo.name, String(data.addExp)]);
        }
        else {
            typeStr = LanguageManager.getlocal("allianceWarHistoryDraw", [String(data.addExp)]);
        }
        var descTxt = ComponentManager.getTextField(typeStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        descTxt.x = 15;
        descTxt.y = 50;
        descTxt.width = 500 - 4;
        descTxt.lineSpacing = 5;
        this.addChild(descTxt);
        var btn = ComponentManager.getButton("dinner_detail", "", function () {
            ViewController.getInstance().openView(ViewConst.COMMON.ALLIANCEWARSHOWANTIVIEW, {
                history: data,
                ishistory: true
            });
        }, this);
        btn.setPosition(bg.width - btn.width - 16, bg.height / 2 - btn.height / 2);
        this.addChild(btn);
    };
    return AllianceWarHistoryScrollItem;
}(ScrollListItem));
__reflect(AllianceWarHistoryScrollItem.prototype, "AllianceWarHistoryScrollItem");
//# sourceMappingURL=AllianceWarHistoryScrollItem.js.map