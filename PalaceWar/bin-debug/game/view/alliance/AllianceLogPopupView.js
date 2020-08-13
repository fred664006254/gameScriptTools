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
var AllianceLogPopupView = (function (_super) {
    __extends(AllianceLogPopupView, _super);
    function AllianceLogPopupView() {
        return _super.call(this) || this;
    }
    AllianceLogPopupView.prototype.initView = function () {
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 526, 530);
        var maskBg = BaseBitmap.create("public_9_bg11");
        maskBg.height = rect.height;
        maskBg.width = rect.width;
        maskBg.setPosition(21 + GameData.popupviewOffsetX, 10);
        this.addChildToContainer(maskBg);
        maskBg.alpha = 0;
        var infoList = Api.allianceVoApi.getExpLog();
        var infoArray = [];
        for (var i = infoList.length - 1; i >= 0; i--) {
            infoArray.push(infoList[i]);
        }
        infoArray.sort(function (a, b) {
            return b[2] - a[2];
        });
        var scrollList = ComponentManager.getScrollList(AllianceExpLogItem, infoArray, rect);
        this.addChildToContainer(scrollList);
        scrollList.setPosition(21 + GameData.popupviewOffsetX, 10);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
    };
    AllianceLogPopupView.prototype.getBgExtraHeight = function () {
        return 5;
    };
    return AllianceLogPopupView;
}(PopupView));
__reflect(AllianceLogPopupView.prototype, "AllianceLogPopupView");
//# sourceMappingURL=AllianceLogPopupView.js.map