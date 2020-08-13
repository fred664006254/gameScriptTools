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
 * 起名改名
 * author dky
 * date 201710/13
 * @class UserNamePopupView
 */
var UserNamePopupView = (function (_super) {
    __extends(UserNamePopupView, _super);
    function UserNamePopupView() {
        var _this = _super.call(this) || this;
        _this._initName = "";
        return _this;
    }
    UserNamePopupView.prototype.initView = function () {
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 144;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 9;
        this.addChildToContainer(bg);
        //笔
        var penIcon = BaseBitmap.create("public_pen_icon");
        penIcon.x = 100 + GameData.popupviewOffsetX;
        penIcon.y = bg.y + bg.height / 2 - penIcon.height / 2;
        this.addChildToContainer(penIcon);
        //输入框
        var inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL, 200, 45, "public_9_bg5");
        inputTF.x = this.viewBg.x + this.viewBg.width / 2 - inputTF.width / 2;
        inputTF.y = bg.y + bg.height / 2 - inputTF.height / 2;
        this.addChildToContainer(inputTF);
        this._inputTextField = inputTF.getChildByName("textField");
        this._inputTextField.text = Api.playerVoApi.getPlayerName();
        if (PlatformManager.checkIsThSp()) {
            var nametxt_1 = "";
            this._inputTextField.addEventListener(egret.TextEvent.CHANGE, function (event) {
                var strName = String(event.target.text);
                var strLength = App.StringUtil.getStrLength(strName);
                if (strLength == GameData.nameThLength) {
                    nametxt_1 = strName;
                }
                if (strLength > GameData.nameThLength) {
                    this._inputTextField.text = nametxt_1;
                }
            }, this);
        }
        else if (PlatformManager.checkIsEnLang()) {
            this._inputTextField.maxChars = GameData.usernameEnLength;
        }
        else if (PlatformManager.checkIsRuLang()) {
            this._inputTextField.maxChars = GameData.usernameRuLength;
        }
        else {
            this._inputTextField.maxChars = 6;
        }
        this._cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "cancelBtn", this.clickCancelHandler, this);
        this._cancelBtn.x = this.viewBg.x + this.viewBg.width / 4 - this._cancelBtn.width / 2;
        this._cancelBtn.y = bg.y + bg.height + 15;
        this._cancelBtn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChildToContainer(this._cancelBtn);
    };
    UserNamePopupView.prototype.clickConfirmHandler = function (data) {
        var txtStr = this._inputTextField.text;
        var lengthName = App.StringUtil.getStrLength(txtStr);
        if (txtStr == Api.playerVoApi.getPlayerName()) {
            this.hide();
            return;
        }
        if (!(PlatformManager.checkIsThSp() || PlatformManager.checkIsEnLang() || PlatformManager.checkIsRuLang())) {
            if (lengthName > 8) {
                this._errorText = "名字不能超过8位字符";
                App.CommonUtil.showTip(this._errorText);
                return;
            }
            else if (lengthName <= 0) {
                this._errorText = "名字不能为空";
                App.CommonUtil.showTip(this._errorText);
                return;
            }
        }
        //正则表达式
        if (!App.StringUtil.userNameCheck(txtStr)) {
            App.CommonUtil.showTip(LanguageManager.getlocal("guideChangeNameTip1"));
            return;
        }
        if (txtStr == "null" || txtStr == "undefined") {
            App.CommonUtil.showTip(LanguageManager.getlocal("guideCreateUserError3"));
            return;
        }
        if (PlatformManager.checkIsThSp()) {
            if (lengthName < 2 || lengthName > GameData.nameThLength) {
                App.CommonUtil.showTip(LanguageManager.getlocal("guideChangeNameTip2"));
                return;
            }
        }
        else if (PlatformManager.checkIsEnLang()) {
            if (lengthName < 2 || lengthName > GameData.usernameEnLength) {
                App.CommonUtil.showTip(LanguageManager.getlocal("guideChangeNameTip3", ["2", GameData.usernameEnLength.toString()]));
                return;
            }
        }
        else if (PlatformManager.checkIsRuLang()) {
            if (lengthName < 2 || lengthName > GameData.usernameRuLength) {
                App.CommonUtil.showTip(LanguageManager.getlocal("guideChangeNameTip3", ["2", GameData.usernameRuLength.toString()]));
                return;
            }
        }
        else if (PlatformManager.checkIsPtLang()) {
            if (lengthName < 2 || lengthName > GameData.usernamePtLength) {
                App.CommonUtil.showTip(LanguageManager.getlocal("guideChangeNameTip3", ["2", GameData.usernamePtLength.toString()]));
                return;
            }
        }
        else {
            if (lengthName < 2 || lengthName > 6) {
                App.CommonUtil.showTip(LanguageManager.getlocal("guideChangeNameTip2"));
                return;
            }
        }
        if (Config.ShieldCfg.checkShield(txtStr) == false) {
            return;
        }
        this.request(NetRequestConst.REQUEST_USER_CHANGENAME, { name: this._inputTextField.text });
        // this.hide();
    };
    UserNamePopupView.prototype.receiveData = function (data) {
        if (data.ret && data.data.cmd == NetRequestConst.REQUEST_USER_CHANGENAME) {
            // App.LogUtil.log("123123"
            if (data.data.data.nameflag == 0) {
                App.CommonUtil.showTip(LanguageManager.getlocal("user_changeName"));
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_RESCHANGE_REFRESH_UI);
                this.hide();
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("guideCreateUserError" + data.data.data.nameflag));
                return;
            }
        }
    };
    UserNamePopupView.prototype.clickCancelHandler = function (param) {
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
    UserNamePopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width / 4 * 3 - this._cancelBtn.width / 2 - 35, this._cancelBtn.y);
    };
    UserNamePopupView.prototype.getConfirmBtnStr = function () {
        return "sysConfirm";
    };
    UserNamePopupView.prototype.getConfirmBtnName = function () {
        return ButtonConst.BTN_NORMAL_YELLOW;
    };
    UserNamePopupView.prototype.getTitleStr = function () {
        return "namePopupTitle2";
    };
    UserNamePopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["shield_cn"]);
    };
    UserNamePopupView.prototype.dispose = function () {
        this._type = null;
        this._useCallback = null;
        this._handler = null;
        this._inputTextField = null;
        this._cancelBtn = null;
        this._errorText = null;
        this._randomBtn = null;
        this._initName = "";
        _super.prototype.dispose.call(this);
    };
    return UserNamePopupView;
}(PopupView));
__reflect(UserNamePopupView.prototype, "UserNamePopupView");
//# sourceMappingURL=UserNamePopupView.js.map