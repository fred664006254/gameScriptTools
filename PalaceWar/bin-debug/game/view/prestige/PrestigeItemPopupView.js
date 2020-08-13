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
var PrestigeItemPopupView = (function (_super) {
    __extends(PrestigeItemPopupView, _super);
    function PrestigeItemPopupView() {
        return _super.call(this) || this;
    }
    PrestigeItemPopupView.prototype.getTitleStr = function () {
        return "prestigeItemName" + this.param.data.itemId;
    };
    PrestigeItemPopupView.prototype.initView = function () {
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 390;
        bg.height = 170;
        bg.x = 158 + GameData.popupviewOffsetX;
        bg.y = 70 - this.getContainerY() + 36;
        this.addChildToContainer(bg);
        var itemId = this.param.data.itemId;
        var tequanIconBg = BaseBitmap.create("itembg_7"); //prestige_circle
        tequanIconBg.setPosition(30 + GameData.popupviewOffsetX, bg.y + bg.height / 2 - tequanIconBg.height / 2);
        this.addChildToContainer(tequanIconBg);
        var prerogativeBtn = BaseBitmap.create("prestige_prerogative" + itemId);
        prerogativeBtn.setPosition(tequanIconBg.x + tequanIconBg.width / 2 - prerogativeBtn.width / 2, tequanIconBg.y + tequanIconBg.height / 2 - prerogativeBtn.height / 2);
        this.addChildToContainer(prerogativeBtn);
        var prerogativeDesc = ComponentManager.getTextField(LanguageManager.getlocal("prestigeItemDesc" + itemId), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        prerogativeDesc.width = 360;
        prerogativeDesc.lineSpacing = 6;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, prerogativeDesc, bg, [0, 20]);
        this.addChildToContainer(prerogativeDesc);
    };
    PrestigeItemPopupView.prototype.getBgExtraHeight = function () {
        return 20;
    };
    PrestigeItemPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return PrestigeItemPopupView;
}(PopupView));
__reflect(PrestigeItemPopupView.prototype, "PrestigeItemPopupView");
//# sourceMappingURL=PrestigeItemPopupView.js.map