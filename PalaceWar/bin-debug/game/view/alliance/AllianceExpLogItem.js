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
// AllianceExpLogItem
var AllianceExpLogItem = (function (_super) {
    __extends(AllianceExpLogItem, _super);
    function AllianceExpLogItem() {
        return _super.call(this) || this;
    }
    AllianceExpLogItem.prototype.initItem = function (index, data) {
        this.width = 526;
        this.height = 75;
        var bgImg = BaseBitmap.create("public_9_probiginnerbg");
        bgImg.width = 526;
        bgImg.height = 71;
        this.addChild(bgImg);
        var typeStr;
        if (data[0] == 1) {
            var bossName = LanguageManager.getlocal("allianceBoss_monsterName" + data[4]);
            typeStr = LanguageManager.getlocal("allianceExpLogDesc1", [data[3], bossName, data[1]]);
        }
        else if (data[0] == 2) {
            var itemName = LanguageManager.getlocal("allianceBuildName" + data[4]);
            typeStr = LanguageManager.getlocal("allianceExpLogDesc2", [data[3], itemName, data[1]]);
        }
        else {
            var winStr = data[5] > 0 ? LanguageManager.getlocal("allianceWarHistoryWin") : LanguageManager.getlocal("allianceWarHistoryFail");
            if (data[4]) {
                typeStr = LanguageManager.getlocal("allianceExpLogDesc3", [data[3], winStr, data[4], data[1]]);
            }
            else {
                typeStr = LanguageManager.getlocal("allianceExpLogDesc4", [data[1]]);
            }
        }
        var descTxt = ComponentManager.getTextField(typeStr, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        descTxt.x = 13;
        descTxt.y = 10;
        descTxt.width = 500;
        descTxt.lineSpacing = 5;
        this.addChild(descTxt);
        var timeTxt = ComponentManager.getTextField(App.DateUtil.getFormatBySecond(data[2], 2), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        timeTxt.x = bgImg.width - timeTxt.width - 10;
        timeTxt.y = 43;
        this.addChild(timeTxt);
    };
    return AllianceExpLogItem;
}(ScrollListItem));
__reflect(AllianceExpLogItem.prototype, "AllianceExpLogItem");
//# sourceMappingURL=AllianceExpLogItem.js.map