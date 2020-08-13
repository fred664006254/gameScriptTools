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
 * 帮会密码
 * author dky
 * date 2017/12/2
 * @class AlliancePswdPopupView
 */
var AlliancePswdPopupView = (function (_super) {
    __extends(AlliancePswdPopupView, _super);
    function AlliancePswdPopupView() {
        var _this = _super.call(this) || this;
        _this._initName = "";
        return _this;
    }
    AlliancePswdPopupView.prototype.initView = function () {
        var curName = this.param.data.name;
        var disAdd = 0;
        if (curName) {
        }
        else {
            curName = "测试测试";
        }
        if (this._type == 2) {
            disAdd = 20;
        }
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 224;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 9;
        this.addChildToContainer(bg);
        var changeName1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        changeName1.text = LanguageManager.getlocal("alliance_pswd");
        changeName1.x = 105;
        changeName1.y = 55;
        this.addChildToContainer(changeName1);
        //输入框
        var inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL, 369, 45, "public_9_bg5", LanguageManager.getlocal("alliance_pswdHolder"), 0xb1b1b1);
        inputTF.x = this.viewBg.x + this.viewBg.width / 2 - inputTF.width / 2;
        inputTF.y = bg.y + bg.height / 2 - inputTF.height / 2 - disAdd;
        this.addChildToContainer(inputTF);
        this._inputTextField = inputTF.getChildByName("textField");
        this._inputTextField.maxChars = 6;
        this._inputTextField.restrict = "0-9";
        this._cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_BLUE, "cancelBtn", this.clickCancelHandler, this);
        // this._cancelBtn.setColor(TextFieldConst.COLOR_BLACK);
        this._cancelBtn.x = this.viewBg.x + this.viewBg.width / 4 - this._cancelBtn.width / 2;
        this._cancelBtn.y = bg.y + bg.height + 15;
        // this._cancelBtn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChildToContainer(this._cancelBtn);
    };
    AlliancePswdPopupView.prototype.clickConfirmHandler = function (data) {
        var allianceVo = Api.allianceVoApi.getAllianceVo();
        var txtStr = this._inputTextField.text;
        if (!this._inputTextField.bindData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("alliance_pswdHolder"));
            return;
        }
        if (txtStr != allianceVo.pswd.toString()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("alliance_pswdError"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCETIMEPOPUPVIEW, { type: 2, pswd: txtStr, title: "allianceManageBtn4" });
        this.hide();
    };
    AlliancePswdPopupView.prototype.clickCancelHandler = function (param) {
        // if(this._cancelCallback)
        // {
        // 	this._cancelCallback.apply(this._handler,[]);
        // }
        this.hide();
    };
    // protected getContainerY():number
    // {
    // 	return 0;
    // }
    AlliancePswdPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width / 4 * 3 - this._cancelBtn.width / 2 - 35, this._cancelBtn.y);
    };
    AlliancePswdPopupView.prototype.getConfirmBtnStr = function () {
        return "sysConfirm";
    };
    AlliancePswdPopupView.prototype.getConfirmBtnName = function () {
        return ButtonConst.BTN_NORMAL_YELLOW;
    };
    AlliancePswdPopupView.prototype.getTitleStr = function () {
        return "allianceManageBtn4";
    };
    AlliancePswdPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["shield_cn"]);
    };
    AlliancePswdPopupView.prototype.dispose = function () {
        this._type = null;
        this._useCallback = null;
        this._handler = null;
        this._inputTextField = null;
        this._cancelBtn = null;
        this._errorText = null;
        this._initName = "";
        _super.prototype.dispose.call(this);
    };
    return AlliancePswdPopupView;
}(PopupView));
__reflect(AlliancePswdPopupView.prototype, "AlliancePswdPopupView");
