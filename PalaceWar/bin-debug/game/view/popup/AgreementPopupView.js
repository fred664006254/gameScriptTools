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
var AgreementPopupView = (function (_super) {
    __extends(AgreementPopupView, _super);
    function AgreementPopupView() {
        var _this = _super.call(this) || this;
        _this._agreeBtn = null;
        _this._callbackF = null;
        _this._obj = null;
        _this._agreementName = '';
        return _this;
    }
    AgreementPopupView.prototype.getResourceList = function () {
        var key = GameData.getLanguageKey("agreement");
        var agreementJson = key;
        if (!ResourceManager.hasRes(key)) {
            agreementJson = "cnagreement";
        }
        if (PlatformManager.checkIs3KSp() || PlatformManager.checkIsXlySp()) {
            agreementJson = "cnagreement2";
        }
        this._agreementName = agreementJson;
        return _super.prototype.getResourceList.call(this).concat([
            "public", agreementJson
        ]);
    };
    AgreementPopupView.prototype.initView = function () {
        if (this.param.data && this.param.data.f && this.param.data.o) {
            this._obj = this.param.data.o;
            this._callbackF = this.param.data.f;
        }
        var itemBg = BaseBitmap.create("public_9_bg4");
        itemBg.width = 520;
        itemBg.height = 518;
        itemBg.setPosition(this.viewBg.width / 2 - itemBg.width / 2, 20);
        this.addChildToContainer(itemBg);
        var scrollContiner = new BaseDisplayObjectContainer();
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, itemBg.width, itemBg.height - 20);
        var scrollView = ComponentManager.getScrollView(scrollContiner, rect);
        scrollView.setPosition(itemBg.x, itemBg.y + 10);
        this.addChildToContainer(scrollView);
        var strTab = ResourceManager.getRes(this._agreementName) || [];
        var posY = 5;
        for (var i = 0; i < strTab.length; i++) {
            var agreementText = ComponentManager.getTextField(strTab[i], TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
            agreementText.x = 20;
            agreementText.y = posY;
            agreementText.width = itemBg.width - 40;
            agreementText.lineSpacing = 6;
            scrollContiner.addChild(agreementText);
            posY += agreementText.height + 6;
        }
        this._agreeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm", this.doAgree, this);
        this._agreeBtn.setPosition(this.viewBg.width / 2 - this._agreeBtn.width / 2, itemBg.y + itemBg.height + 10);
        this.addChildToContainer(this._agreeBtn);
        if (!this._obj) {
            this.closeBtn.visible = false;
        }
        else {
            this._agreeBtn.setText("friendsBtnTxt17");
        }
    };
    AgreementPopupView.prototype.hide = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
            title: "itemUseConstPopupViewTitle",
            msg: LanguageManager.getlocal("agreementCloseTip"),
            callback: this.realClose,
            handler: this,
            needCancel: true
        });
    };
    AgreementPopupView.prototype.realClose = function () {
        _super.prototype.hide.call(this);
    };
    AgreementPopupView.prototype.doAgree = function () {
        if (this._obj && this._callbackF) {
            this._callbackF.apply(this._obj);
        }
        _super.prototype.hide.call(this);
    };
    AgreementPopupView.prototype.getBgExtraHeight = function () {
        return 10;
    };
    AgreementPopupView.prototype.dispose = function () {
        this._agreeBtn = null;
        this._callbackF = null;
        this._obj = null;
        this._agreementName = '';
        _super.prototype.dispose.call(this);
    };
    return AgreementPopupView;
}(PopupView));
__reflect(AgreementPopupView.prototype, "AgreementPopupView");
//# sourceMappingURL=AgreementPopupView.js.map