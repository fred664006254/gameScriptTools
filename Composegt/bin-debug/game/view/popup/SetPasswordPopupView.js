/**
 * 至劲 设置密码
 * author shaoliang
 * date 2018/03/15
 * @class SetPasswordPopupView
 */
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
var SetPasswordPopupView = (function (_super) {
    __extends(SetPasswordPopupView, _super);
    function SetPasswordPopupView() {
        var _this = _super.call(this) || this;
        _this._inputTextField = null;
        _this._inputTextField2 = null;
        _this._urlPre = null;
        _this._gameId = null;
        _this._userId = null;
        return _this;
    }
    SetPasswordPopupView.prototype.getTitleStr = function () {
        return "setPasswordTitle";
    };
    SetPasswordPopupView.prototype.getCloseBtnName = function () {
        return null;
    };
    SetPasswordPopupView.prototype.initView = function () {
        var typeBg = BaseBitmap.create("public_9_bg4");
        typeBg.width = 518;
        typeBg.height = 435;
        typeBg.setPosition(this.viewBg.width / 2 - typeBg.width / 2, 12);
        this.addChildToContainer(typeBg);
        var titleText = ComponentManager.getTextField(LanguageManager.getlocal("setPasswordDesc"), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        titleText.setPosition(52, 27 + typeBg.y);
        titleText.width = 468;
        titleText.lineSpacing = 6;
        this.addChildToContainer(titleText);
        var rankBg = BaseBitmap.create("public_9_probiginnerbg");
        rankBg.width = 500;
        rankBg.height = 240;
        rankBg.setPosition(this.viewBg.width / 2 - rankBg.width / 2, typeBg.y + 105);
        this.addChildToContainer(rankBg);
        var infoText1 = ComponentManager.getTextField(LanguageManager.getlocal("setPasswordPlayer"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        infoText1.setPosition(titleText.x + 12, rankBg.y + 24);
        this.addChildToContainer(infoText1);
        var infoText2 = ComponentManager.getTextField(LanguageManager.getlocal("setPasswordAccount"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        infoText2.setPosition(infoText1.x, infoText1.y + 52);
        this.addChildToContainer(infoText2);
        var infoText3 = ComponentManager.getTextField(LanguageManager.getlocal("setPassword1"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        infoText3.setPosition(infoText1.x, infoText2.y + 52);
        this.addChildToContainer(infoText3);
        var infoText4 = ComponentManager.getTextField(LanguageManager.getlocal("setPassword2"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        infoText4.setPosition(infoText1.x, infoText3.y + 52);
        this.addChildToContainer(infoText4);
        var accountText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        accountText.setPosition(infoText1.x + infoText1.width + 12, infoText1.y);
        this.addChildToContainer(accountText);
        var nameText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        nameText.setPosition(infoText2.x + infoText2.width + 12, infoText2.y);
        this.addChildToContainer(nameText);
        var inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL, 304, 44, "public_9_bg5", null, 0xa4917f);
        inputTF.x = infoText3.x + infoText3.width;
        inputTF.y = infoText3.y - 15;
        this.addChildToContainer(inputTF);
        this._inputTextField = inputTF.getChildByName("textField");
        this._inputTextField.restrict = "A-Z a-z 0-9";
        this._inputTextField.maxChars = 20;
        var inputTF2 = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL, 304, 44, "public_9_bg5", null, 0xa4917f);
        inputTF2.x = infoText4.x + infoText4.width;
        inputTF2.y = infoText4.y - 15;
        this.addChildToContainer(inputTF2);
        this._inputTextField2 = inputTF2.getChildByName("textField");
        this._inputTextField2.restrict = "A-Z a-z 0-9";
        this._inputTextField2.maxChars = 20;
        var gotoBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "confirmBtn", this.gotoHandle, this);
        gotoBtn.setPosition(this.viewBg.width / 2 - gotoBtn.width / 2, rankBg.y + rankBg.height + 14);
        this.addChildToContainer(gotoBtn);
        this._userId = PlatformManager.userId.split("_")[1];
        var that = this;
        //iOS:403，安卓402
        this._gameId = "403";
        if (App.DeviceUtil.isAndroid() == true) {
            this._gameId = "402";
        }
        this._urlPre = "http://gt-cn-in.raygame3.com/tank-global/index.php"; //正式
        // this._urlPre = "http://192.168.103.123:93/tank-global/index.php";//测试
        NetLoading.show();
        NetManager.http.get(this._urlPre, { t: "3kolduserget", ct: "import", ac: "getinfo", userid: this._userId, gameid: this._gameId, service_id: ServerCfg.selectServer.zid }, function (data) {
            NetLoading.hide();
            if (data && data.data) {
                that._userId = data.data.userid;
                accountText.text = data.data.username;
                nameText.text = data.data.userid;
                if (data.data.changePassowrd == 1) {
                    ViewController.getInstance().openView(ViewConst.POPUP.DOWNLOADPACKAGEPOPUPVIEW);
                }
            }
        }, function () {
            NetLoading.hide();
        }, PlatformManager);
    };
    SetPasswordPopupView.prototype.gotoHandle = function () {
        var text1 = this._inputTextField.text;
        var text2 = this._inputTextField2.text;
        if (!text1 || !text2) {
            App.CommonUtil.showTip(LanguageManager.getlocal("setPasswordError1"));
            return;
        }
        else if (text1 != text2) {
            App.CommonUtil.showTip(LanguageManager.getlocal("setPasswordError2"));
            return;
        }
        else if (text1.length < 6) {
            App.CommonUtil.showTip(LanguageManager.getlocal("setPasswordError3"));
            return;
        }
        //this.gotoDownload();
        NetLoading.show();
        NetManager.http.get(this._urlPre, { t: "3koldusersetpwd", ct: "import", ac: "ChangePassword", userid: this._userId, gameid: this._gameId, password: text1, service_id: ServerCfg.selectServer.zid }, function (data) {
            NetLoading.hide();
            if (data && data.code == 0) {
                ViewController.getInstance().openView(ViewConst.POPUP.DOWNLOADPACKAGEPOPUPVIEW);
            }
            else {
                if (data && data.code == -1 && data.msg) {
                    App.CommonUtil.showTip(data.msg);
                }
            }
        }, function () {
            NetLoading.hide();
        }, PlatformManager);
    };
    // private gotoDownload():void
    // {
    // 	ViewController.getInstance().openView(ViewConst.POPUP.DOWNLOADPACKAGEPOPUPVIEW);
    // }
    SetPasswordPopupView.prototype.getBgExtraHeight = function () {
        return 10;
    };
    SetPasswordPopupView.prototype.dispose = function () {
        this._inputTextField = null;
        this._inputTextField2 = null;
        this._urlPre = null;
        this._gameId = null;
        this._userId = null;
        _super.prototype.dispose.call(this);
    };
    return SetPasswordPopupView;
}(PopupView));
__reflect(SetPasswordPopupView.prototype, "SetPasswordPopupView");
