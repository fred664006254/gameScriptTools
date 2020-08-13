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
var PrestigeLogPopupView = (function (_super) {
    __extends(PrestigeLogPopupView, _super);
    function PrestigeLogPopupView() {
        return _super.call(this) || this;
    }
    PrestigeLogPopupView.prototype.getTitleStr = function () {
        return "prestigeLog";
    };
    // 规则说明内容
    // protected getRuleInfo():string
    // {
    // 	return "prestigeRuleInfo";
    // }
    PrestigeLogPopupView.prototype.initView = function () {
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 526, 530);
        var maskBg = BaseBitmap.create("public_9_bg11");
        maskBg.height = rect.height;
        maskBg.width = rect.width;
        maskBg.setPosition(21 + GameData.popupviewOffsetX, 10);
        this.addChildToContainer(maskBg);
        maskBg.alpha = 0;
        var infoList = Api.prestigeVoApi.getLog();
        // infoList = [{dtype:0 ,st:12334,v:888},{dtype:0 ,st:12334,v:888},{dtype:5 ,st:12334,v:888},{dtype:4 ,st:12334,v:888},{dtype:3 ,st:12334,v:888},{dtype:2 ,st:12334,v:888},{dtype:1 ,st:12334,v:888}];
        var infoArray = [];
        for (var i = infoList.length - 1; i >= 0; i--) {
            infoArray.push(infoList[i]);
        }
        var scrollList = ComponentManager.getScrollList(PrestigeLogPopupScollItem, infoArray, rect);
        this.addChildToContainer(scrollList);
        scrollList.setPosition(21 + GameData.popupviewOffsetX, 10);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
    };
    PrestigeLogPopupView.prototype.getBgExtraHeight = function () {
        return 10;
    };
    PrestigeLogPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return PrestigeLogPopupView;
}(PopupView));
__reflect(PrestigeLogPopupView.prototype, "PrestigeLogPopupView");
//# sourceMappingURL=PrestigeLogPopupView.js.map