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
 * 奖励二级弹框界面
 * @author 张朝阳
 * date 2018/12/22
 * @class AcNewYearSignUpConfirmPopupView
 */
var AcNewYearSignUpConfirmPopupView = (function (_super) {
    __extends(AcNewYearSignUpConfirmPopupView, _super);
    function AcNewYearSignUpConfirmPopupView() {
        var _this = _super.call(this) || this;
        _this._confirmCallback = null;
        _this._cost = null;
        return _this;
    }
    AcNewYearSignUpConfirmPopupView.prototype.initView = function () {
        this._confirmCallback = this.param.data.callbackHandle;
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 530;
        bg.height = 150;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 20);
        this.addChildToContainer(bg);
        var desc1 = ComponentManager.getTextField(LanguageManager.getlocal("acNewYearSignUpConfirmPopupViewDesc", [String(this.param.data.cost)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        desc1.lineSpacing = 3;
        desc1.width = 500;
        desc1.textAlign = egret.HorizontalAlign.CENTER;
        desc1.setPosition(bg.x + bg.width / 2 - desc1.width / 2, bg.y + bg.height / 2 - desc1.height / 2);
        this.addChildToContainer(desc1);
        var cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "cancelBtn", this.hide, this);
        cancelBtn.setPosition(this.viewBg.x + 50, bg.y + bg.height + 12);
        this.addChildToContainer(cancelBtn);
        var confirmBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm", this.confirmBtnClick, this);
        confirmBtn.setPosition(this.viewBg.x + this.viewBg.width - confirmBtn.width - 50, bg.y + bg.height + 12);
        this.addChildToContainer(confirmBtn);
    };
    AcNewYearSignUpConfirmPopupView.prototype.confirmBtnClick = function () {
        App.LogUtil.log("confirmBtnClick: " + Api.playerVoApi.getPlayerGem() + " cose:" + this.param.data.cost);
        if (Api.playerVoApi.getPlayerGem() < this.param.data.cost) {
            App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
            this.hide();
            return;
        }
        if (this._confirmCallback) {
            this._confirmCallback.apply(this.param.data.handle);
        }
        this.hide();
    };
    AcNewYearSignUpConfirmPopupView.prototype.getTitleStr = function () {
        return "itemUseConstPopupViewTitle";
    };
    AcNewYearSignUpConfirmPopupView.prototype.dispose = function () {
        this._confirmCallback = null;
        _super.prototype.dispose.call(this);
    };
    return AcNewYearSignUpConfirmPopupView;
}(PopupView));
__reflect(AcNewYearSignUpConfirmPopupView.prototype, "AcNewYearSignUpConfirmPopupView");
//# sourceMappingURL=AcNewYearSignUpConfirmPopupView.js.map