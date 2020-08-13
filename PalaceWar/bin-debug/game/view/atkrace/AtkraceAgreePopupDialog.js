var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AtkraceAgreePopupDialog = /** @class */ (function (_super) {
    __extends(AtkraceAgreePopupDialog, _super);
    function AtkraceAgreePopupDialog() {
        var _this = _super.call(this) || this;
        _this._type = 0;
        return _this;
    }
    AtkraceAgreePopupDialog.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["atkrace_popup_bg"]);
    };
    AtkraceAgreePopupDialog.prototype.getTitleStr = function () {
        return "atkraceViewTitle";
    };
    AtkraceAgreePopupDialog.prototype.getBgExtraHeight = function () {
        return 0;
    };
    AtkraceAgreePopupDialog.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT, this.doGuide, this);
        //底部
        var agreeBg = BaseBitmap.create("atkrace_popup_bg");
        agreeBg.setPosition(this.viewBg.width / 2 - agreeBg.width / 2, 0);
        this.addChildToContainer(agreeBg);
        this._type = this.param.data.type;
        var sid = this.param.data.sid;
        var servantFullImg = BaseLoadBitmap.create(Api.servantVoApi.getFullImgPathWithId(sid));
        servantFullImg.width = 405 * 0.8;
        servantFullImg.height = 467 * 0.8;
        ;
        servantFullImg.x = this.viewBg.width / 2 - servantFullImg.width / 2;
        servantFullImg.y = agreeBg.height - servantFullImg.height;
        this.addChildToContainer(servantFullImg);
        var str = LanguageManager.getlocal("atkraceAgreeAsk" + this._type, [this.param.data.name]);
        var descText = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        descText.width = 500;
        descText.lineSpacing = 5;
        var descBg = BaseBitmap.create("public_9_bg11");
        descBg.width = agreeBg.width;
        descBg.height = descText.height + 40;
        descBg.setPosition(this.viewBg.width / 2 - descBg.width / 2, agreeBg.height - descBg.height);
        this.addChildToContainer(descBg);
        descText.setPosition(this.viewBg.width / 2 - descText.width / 2, agreeBg.height - descText.height - 20);
        this.addChildToContainer(descText);
        var btnArray = [];
        if (this._type == 1) {
            btnArray.push("atkraceAgreeAnswer0");
        }
        btnArray.push("atkraceAgreeAnswer" + this._type);
        for (var i = 0; i < btnArray.length; i++) {
            var btnBg = BaseBitmap.create("public_9_bg28");
            btnBg.width = 556;
            btnBg.height = 55;
            btnBg.setPosition(GameConfig.stageWidth / 2 - btnBg.width / 2, GameConfig.stageHeigth / 2 + 260 + i * 65 + 12);
            this.addChild(btnBg);
            btnBg.addTouchTap(this.btnClick, this, [i]);
            var btnStr = LanguageManager.getlocal(btnArray[i]);
            if (btnArray[i] == "atkraceAgreeAnswer0") {
                if (this.param.data.allianceId && Api.playerVoApi.getPlayerAllianceId() && this.param.data.allianceId && this.param.data.allianceId == Api.playerVoApi.getPlayerAllianceId()) {
                    btnStr = LanguageManager.getlocal(btnArray[i]) + LanguageManager.getlocal("atkrace_log_sameAlliance");
                }
            }
            var btnText = ComponentManager.getTextField(btnStr, TextFieldConst.FONTSIZE_CONTENT_COMMON);
            btnText.setPosition(btnBg.x + 38, btnBg.y + btnBg.height / 2 - btnText.height / 2);
            this.addChild(btnText);
        }
        if (!Api.rookieVoApi.isGuiding) {
            this.touchEnabled = false;
            this.y = -200;
            this.alpha = 0;
            egret.Tween.get(this).to({ alpha: 1, y: 0 }, 500).call(this.remove, this);
        }
    };
    AtkraceAgreePopupDialog.prototype.remove = function () {
        this.drawblackMask();
        this.touchEnabled = true;
    };
    AtkraceAgreePopupDialog.prototype.isShowMask = function () {
        return false;
    };
    AtkraceAgreePopupDialog.prototype.drawblackMask = function () {
        var _maskBmp = BaseBitmap.create("public_9_viewmask");
        _maskBmp.width = GameConfig.stageWidth;
        _maskBmp.height = GameConfig.stageHeigth;
        _maskBmp.touchEnabled = true;
        this.addChild(_maskBmp);
        this.setChildIndex(_maskBmp, 0);
    };
    AtkraceAgreePopupDialog.prototype.btnClick = function (event, idx) {
        if (this._type == 1 && idx == 0) {
            this.request(NetRequestConst.REQUEST_ATKRACE_HANDLE, { handle: 1, uid: this.param.data.uid });
        }
        else {
            this.hide();
        }
    };
    AtkraceAgreePopupDialog.prototype.doGuide = function () {
        this.request(NetRequestConst.REQUEST_ATKRACE_HANDLE, { handle: 1 });
    };
    //请求回调
    AtkraceAgreePopupDialog.prototype.receiveData = function (data) {
        if (data.ret == true && data.data.data && data.data.data.fightExpired != 1) {
            if (Api.rookieVoApi.curStep == "atkrace_7") {
                Api.rookieVoApi.checkNextStep();
            }
            ViewController.getInstance().openView(ViewConst.COMMON.ATKRACEARRESTVIEW);
            this.hide();
        }
        else {
            Api.atkraceVoApi.dateErrorHandle();
        }
    };
    AtkraceAgreePopupDialog.prototype.isShowOpenAni = function () {
        return false;
    };
    AtkraceAgreePopupDialog.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT, this.doGuide, this);
        this._type = 0;
        _super.prototype.dispose.call(this);
    };
    return AtkraceAgreePopupDialog;
}(PopupView));
//# sourceMappingURL=AtkraceAgreePopupDialog.js.map