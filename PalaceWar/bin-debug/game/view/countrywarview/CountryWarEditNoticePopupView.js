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
 * 公告编辑
 * author qianjun
 */
var CountryWarEditNoticePopupView = (function (_super) {
    __extends(CountryWarEditNoticePopupView, _super);
    function CountryWarEditNoticePopupView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(CountryWarEditNoticePopupView.prototype, "api", {
        get: function () {
            return Api.countryWarVoApi;
        },
        enumerable: true,
        configurable: true
    });
    CountryWarEditNoticePopupView.prototype.initView = function () {
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        var tarWidth = 520;
        var tarHeight = 100;
        //输入框
        var inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_CONTENT_SMALL, tarWidth, tarHeight, "public_9_bg4", LanguageManager.getlocal("palace_editTip"), TextFieldConst.COLOR_WHITE);
        inputTF.x = this.viewBg.x + this.viewBg.width / 2 - tarWidth / 2;
        inputTF.y = 9;
        var textField = inputTF.getChildByName("textField");
        // textField.y -= 30;
        this._nodeContainer.addChild(inputTF);
        this._inputTextField = inputTF.getChildByName("textField");
        this._inputTextField.height = tarHeight - 20;
        this._inputTextField.width = tarWidth - 20;
        this._inputTextField.wordWrap = true;
        this._inputTextField.multiline = true;
        var inputNaxNum = 80;
        this._inputTextField.maxChars = inputNaxNum;
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("palace_editTip2", [String(inputNaxNum)]), 20, TextFieldConst.COLOR_BROWN);
        tipTxt.x = this.viewBg.x + this.viewBg.width / 2 - tipTxt.width / 2;
        tipTxt.y = inputTF.y + tarHeight + 9;
        this._nodeContainer.addChild(tipTxt);
        var editBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "sysConfirm", this.editBtnhandler, this);
        editBtn.x = inputTF.x + tarWidth / 2 - editBtn.width / 2;
        editBtn.y = tipTxt.y + tipTxt.height + 15;
        editBtn.setColor(TextFieldConst.COLOR_BLACK);
        this._nodeContainer.addChild(editBtn);
    };
    CountryWarEditNoticePopupView.prototype.getTitleStr = function () {
        return 'palace_editBtn';
    };
    CountryWarEditNoticePopupView.prototype.editBtnhandlerCallback = function (event) {
        //普通改签名
        var data = event.data.data.data;
        Api.countryWarVoApi.setAnnouce(data.announce);
        App.CommonUtil.showTip(LanguageManager.getlocal("palace_edit_succeed"));
        this.hide();
    };
    CountryWarEditNoticePopupView.prototype.editBtnhandler = function () {
        var _this = this;
        if (!this._inputTextField.bindData) {
            this._inputTextField.bindData = "";
            this._inputTextField.text = "";
        }
        if (Config.ShieldCfg.checkOnlyShield(this._inputTextField.text) == false) {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
            return;
        }
        if (Api.countryWarVoApi.canEditNotice()) {
            if (this._inputTextField.text == '') {
                App.CommonUtil.showTip(LanguageManager.getlocal("palace_editTip"));
                return;
            }
            var cost_1 = this.api.getEditCost();
            if (cost_1 > 0) {
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                    title: "itemUseConstPopupViewTitle",
                    msg: LanguageManager.getlocal('CountryWarEditTip', [cost_1.toString()]),
                    callback: function () {
                        if (Api.playerVoApi.getPlayerGem() < cost_1) {
                            App.CommonUtil.showTip(LanguageManager.getlocal("allianceBossOpen_tip5"));
                            return;
                        }
                        else {
                            NetManager.request(NetRequestConst.REQUEST_COUNTRYWAY_UPDATEANNOUNCE, {
                                text: _this._inputTextField.text,
                            });
                        }
                    },
                    handler: this,
                    needCancel: true
                });
            }
            else {
                NetManager.request(NetRequestConst.REQUEST_COUNTRYWAY_UPDATEANNOUNCE, {
                    text: this._inputTextField.text,
                });
            }
        }
    };
    CountryWarEditNoticePopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "shield_cn",
        ]);
    };
    CountryWarEditNoticePopupView.prototype.dispose = function () {
        this._nodeContainer = null;
        this._inputTextField = null;
        _super.prototype.dispose.call(this);
    };
    return CountryWarEditNoticePopupView;
}(PopupView));
__reflect(CountryWarEditNoticePopupView.prototype, "CountryWarEditNoticePopupView");
//# sourceMappingURL=CountryWarEditNoticePopupView.js.map