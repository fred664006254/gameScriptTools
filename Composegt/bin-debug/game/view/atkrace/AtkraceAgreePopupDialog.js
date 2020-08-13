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
var AtkraceAgreePopupDialog = (function (_super) {
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
    AtkraceAgreePopupDialog.prototype.isShowOpenAni = function () {
        return false;
    };
    AtkraceAgreePopupDialog.prototype.getBgExtraHeight = function () {
        return 0;
    };
    AtkraceAgreePopupDialog.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT, this.doGuide, this);
        // let public_tc_bg01:BaseBitmap = BaseBitmap.create("public_tc_bg01");
        // this.addChildToContainer(public_tc_bg01);
        // public_tc_bg01.width = 533;
        // public_tc_bg01.height = 405;
        // public_tc_bg01.x =42;
        // public_tc_bg01.y =5;
        //底部
        var agreeBg = BaseBitmap.create("atkrace_popup_bg");
        agreeBg.setPosition(this.viewBg.width / 2 - agreeBg.width / 2, 10);
        this.addChildToContainer(agreeBg);
        this._type = this.param.data.type;
        var sid = this.param.data.sid;
        var servantFullImg = BaseLoadBitmap.create(Api.servantVoApi.getFullImgPathWithId(sid));
        servantFullImg.width = 640 * 0.8;
        servantFullImg.height = 482 * 0.8;
        ;
        servantFullImg.x = this.viewBg.width / 2 - servantFullImg.width / 2;
        servantFullImg.y = agreeBg.height - servantFullImg.height;
        this.addChildToContainer(servantFullImg);
        var descTextBg = BaseBitmap.create("public_9v_bg12");
        descTextBg.width = 530;
        descTextBg.height = 125;
        descTextBg.x = this.viewBg.width / 2 - descTextBg.width / 2;
        descTextBg.y = agreeBg.y + agreeBg.height + 10;
        this.addChildToContainer(descTextBg);
        var str = LanguageManager.getlocal("atkraceAgreeAsk" + this._type, [this.param.data.name]);
        var descText = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
        descText.width = 500;
        descText.lineSpacing = 5;
        descText.setPosition(this.viewBg.width / 2 - descText.width / 2, descTextBg.y + 15);
        this.addChildToContainer(descText);
        var btnArray = [];
        if (this._type == 1) {
            btnArray.push("atkraceAgreeAnswer0");
        }
        btnArray.push("atkraceAgreeAnswer" + this._type);
        for (var i = 0; i < btnArray.length; i++) {
            var btnBg = BaseBitmap.create("public_9v_bg15");
            btnBg.width = 556;
            btnBg.height = 55;
            btnBg.setPosition(GameConfig.stageWidth / 2 - btnBg.width / 2, GameConfig.stageHeigth / 2 + 330 + i * 70);
            this.addChild(btnBg);
            btnBg.addTouchTap(this.btnClick, this, [i]);
            var btnText = ComponentManager.getTextField(LanguageManager.getlocal(btnArray[i]), TextFieldConst.FONTSIZE_CONTENT_COMMON);
            btnText.setPosition(btnBg.x + 38, btnBg.y + btnBg.height / 2 - btnText.height / 2);
            this.addChild(btnText);
        }
        if (!Api.rookieVoApi.isGuiding) {
            this.touchEnabled = false;
            this.y = -200;
            this.alpha = 0;
            egret.Tween.get(this).to({ alpha: 1, y: -100 }, 500).call(this.remove, this);
        }
    };
    AtkraceAgreePopupDialog.prototype.getShowHeight = function () {
        return 650; //580;
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
            this.request(NetRequestConst.REQUEST_ATKRACE_HANDLE, { handle: 1 });
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
        if (data.ret == true) {
            ViewController.getInstance().openView(ViewConst.COMMON.ATKRACEARRESTVIEW);
            this.hide();
        }
    };
    AtkraceAgreePopupDialog.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT, this.doGuide, this);
        this._type = 0;
        _super.prototype.dispose.call(this);
    };
    return AtkraceAgreePopupDialog;
}(PopupView));
__reflect(AtkraceAgreePopupDialog.prototype, "AtkraceAgreePopupDialog");
