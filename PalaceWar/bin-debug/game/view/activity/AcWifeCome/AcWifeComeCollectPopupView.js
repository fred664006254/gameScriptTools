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
var AcWifeComeCollectPopupView = (function (_super) {
    __extends(AcWifeComeCollectPopupView, _super);
    function AcWifeComeCollectPopupView() {
        var _this = _super.call(this) || this;
        _this._bgHeight = 0;
        _this._callback = null;
        return _this;
    }
    AcWifeComeCollectPopupView.prototype.initView = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 200;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 9;
        this.addChildToContainer(bg);
        var deltaScale = 1.0;
        var cardbg = BaseBitmap.create("itembg_1");
        cardbg.width = 100;
        cardbg.height = 100;
        cardbg.x = this.viewBg.x + this.viewBg.width / 2 - cardbg.width / 2;
        cardbg.y = bg.y + 15;
        cardbg.name = "cardbg";
        this.addChildToContainer(cardbg);
        //  let isOwn = Api.servantVoApi.getServantObj("1053");
        var isOwn = vo.get == 1 ? true : false;
        var tarWidth = 205;
        var tarHeight = 196;
        var iconPath = "servant_half_1053";
        var tarScale = 0.5;
        var nameStr = LanguageManager.getlocal("servant_name1053");
        if (isOwn) {
            iconPath = "wife_half_219";
            tarWidth = 180;
            tarHeight = 177;
            tarScale = 0.5;
            nameStr = LanguageManager.getlocal("wifeName_219");
        }
        var wifeImg = BaseLoadBitmap.create(iconPath);
        wifeImg.width = tarWidth * tarScale;
        wifeImg.height = tarHeight * tarScale;
        wifeImg.x = cardbg.x + cardbg.width / 2 - wifeImg.width / 2;
        wifeImg.y = cardbg.y + cardbg.height / 2 - wifeImg.height / 2 - 2;
        this.addChildToContainer(wifeImg);
        this._bgHeight = bg.height;
        var messageStr = LanguageManager.getlocal("acWifeCome_3_collectTip", [nameStr]);
        var msgTF = ComponentManager.getTextField(messageStr, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        msgTF.width = 480;
        msgTF.setColor(this.param.data.txtcolor ? this.param.data.txtcolor : TextFieldConst.COLOR_BLACK);
        msgTF.textAlign = TextFieldConst.ALIGH_CENTER;
        msgTF.x = this.viewBg.x + this.viewBg.width / 2 - msgTF.width / 2;
        msgTF.lineSpacing = 10;
        msgTF.y = cardbg.y + cardbg.height * deltaScale + 15;
        this.addChildToContainer(msgTF);
        var conBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, this.param.data.confirmTxt ? this.param.data.confirmTxt : "confirmBtn", this.clickConHandler, this);
        conBtn.setColor(TextFieldConst.COLOR_BLACK);
        conBtn.x = this.getShowWidth() / 2 - conBtn.width / 2;
        conBtn.y = bg.y + bg.height + 20;
        this.addChildToContainer(conBtn);
        if (this.param.data.needCancel) {
            var canelStr = "cancelBtn";
            if (this.param.data.canelTxt) {
                canelStr = this.param.data.canelTxt;
            }
            var cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, canelStr, this.clickCancelHandler, this);
            cancelBtn.setColor(TextFieldConst.COLOR_BLACK);
            cancelBtn.x = 80;
            cancelBtn.y = bg.y + bg.height + 20;
            this.addChildToContainer(cancelBtn);
            conBtn.x = 330;
        }
    };
    AcWifeComeCollectPopupView.prototype.clickConHandler = function (data) {
        var param = this.param;
        if (!param.data.clickNotAutoHide) {
            this.hide();
        }
        if (param.data.callback) {
            param.data.callback.apply(param.data.handler, [this]);
        }
    };
    AcWifeComeCollectPopupView.prototype.clickCancelHandler = function (data) {
        this.hide();
    };
    AcWifeComeCollectPopupView.prototype.getTitleStr = function () {
        return "itemUseConstPopupViewTitle";
    };
    AcWifeComeCollectPopupView.prototype.closeHandler = function () {
        var param = this.param;
        if (param.data.closecallback) {
            param.data.closecallback.apply(param.data.handler, [this]);
        }
        _super.prototype.closeHandler.call(this);
    };
    AcWifeComeCollectPopupView.prototype.dispose = function () {
        this._callback = null;
        _super.prototype.dispose.call(this);
    };
    return AcWifeComeCollectPopupView;
}(PopupView));
__reflect(AcWifeComeCollectPopupView.prototype, "AcWifeComeCollectPopupView");
//# sourceMappingURL=AcWifeComeCollectPopupView.js.map