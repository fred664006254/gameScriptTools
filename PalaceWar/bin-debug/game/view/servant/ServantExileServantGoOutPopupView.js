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
 * 门客出海弹框
 * @author 张朝阳
 * date 2019/2/19
 * @class ServantExileServantGoOutPopupView
 */
var ServantExileServantGoOutPopupView = (function (_super) {
    __extends(ServantExileServantGoOutPopupView, _super);
    function ServantExileServantGoOutPopupView() {
        var _this = _super.call(this) || this;
        _this._confirmCallback = null;
        return _this;
    }
    ServantExileServantGoOutPopupView.prototype.initView = function () {
        this._confirmCallback = this.param.data.confirmCallback;
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 174;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, this.viewBg.y + 15);
        this.addChildToContainer(bg);
        var topTF = ComponentManager.getTextField(this.param.data.topMessage, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        topTF.width = 460;
        topTF.textAlign = egret.HorizontalAlign.CENTER;
        topTF.lineSpacing = 3;
        topTF.setPosition(bg.x + bg.width / 2 - topTF.width / 2, bg.y + 50);
        this.addChildToContainer(topTF);
        var buttomTF = ComponentManager.getTextField(this.param.data.buttomMessage, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        buttomTF.width = 460;
        buttomTF.textAlign = egret.HorizontalAlign.CENTER;
        buttomTF.lineSpacing = 3;
        buttomTF.setPosition(bg.x + bg.width / 2 - buttomTF.width / 2, topTF.y + topTF.height + 15);
        this.addChildToContainer(buttomTF);
        if (this.param.data.buttomMessage2) {
            var buttomTF2 = ComponentManager.getTextField(this.param.data.buttomMessage2, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
            buttomTF2.width = 460;
            buttomTF2.textAlign = egret.HorizontalAlign.CENTER;
            buttomTF2.lineSpacing = 3;
            buttomTF2.setPosition(bg.x + bg.width / 2 - buttomTF.width / 2, buttomTF.y + buttomTF.height + 15);
            this.addChildToContainer(buttomTF2);
            bg.height += buttomTF2.height;
        }
        var cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "cancelBtn", this.hide, this);
        cancelBtn.setPosition(bg.x + bg.width / 2 - cancelBtn.width - 45, bg.y + bg.height + 15);
        this.addChildToContainer(cancelBtn);
        var confirmBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm", this.confirmBtnClick, this);
        confirmBtn.setPosition(bg.x + bg.width / 2 + 45, bg.y + bg.height + 15);
        this.addChildToContainer(confirmBtn);
    };
    ServantExileServantGoOutPopupView.prototype.confirmBtnClick = function () {
        if (this._confirmCallback) {
            this._confirmCallback.apply(this.param.data.handle);
        }
        this.hide();
    };
    ServantExileServantGoOutPopupView.prototype.getTitleStr = function () {
        return this.param.data.titleKey;
    };
    ServantExileServantGoOutPopupView.prototype.getBgExtraHeight = function () {
        return 20;
    };
    ServantExileServantGoOutPopupView.prototype.dispose = function () {
        this._confirmCallback = null;
        _super.prototype.dispose.call(this);
    };
    return ServantExileServantGoOutPopupView;
}(PopupView));
__reflect(ServantExileServantGoOutPopupView.prototype, "ServantExileServantGoOutPopupView");
//# sourceMappingURL=ServantExileServantGoOutPopupView.js.map