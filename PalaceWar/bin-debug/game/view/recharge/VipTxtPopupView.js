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
var VipTxtPopupView = (function (_super) {
    __extends(VipTxtPopupView, _super);
    function VipTxtPopupView() {
        return _super.call(this) || this;
    }
    VipTxtPopupView.prototype.initView = function () {
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 170;
        bg.x = 25 + GameData.popupviewOffsetX;
        bg.y = 70 - this.getContainerY() + 35;
        this.addChildToContainer(bg);
        var dropDescTF = ComponentManager.getTextField(LanguageManager.getlocal('viptxtDes'), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        dropDescTF.x = bg.x + 8;
        dropDescTF.width = bg.width - 20;
        dropDescTF.lineSpacing = 4;
        dropDescTF.textColor = TextFieldConst.COLOR_BLACK;
        dropDescTF.textAlign = TextFieldConst.ALIGH_CENTER;
        dropDescTF.y = bg.y + bg.height / 2 - dropDescTF.height / 2;
        this.addChildToContainer(dropDescTF);
    };
    VipTxtPopupView.prototype.isTouchMaskClose = function () {
        return true;
    };
    VipTxtPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    VipTxtPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return VipTxtPopupView;
}(PopupView));
__reflect(VipTxtPopupView.prototype, "VipTxtPopupView");
//# sourceMappingURL=VipTxtPopupView.js.map