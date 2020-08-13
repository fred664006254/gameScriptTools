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
var BindingPhonePopupview = (function (_super) {
    __extends(BindingPhonePopupview, _super);
    function BindingPhonePopupview() {
        var _this = _super.call(this) || this;
        _this._phoneInput = null;
        _this._codeInput = null;
        _this._getcodeBtn = null;
        _this._cdtime = 0;
        return _this;
    }
    BindingPhonePopupview.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "realnamerewards_bg", "public", "button",
            "realnamerewards_frame",
        ]);
    };
    BindingPhonePopupview.prototype.initView = function () {
        this.closeBtn.visible = false;
        var itemBg = BaseBitmap.create("public_9_bg4");
        itemBg.width = 520;
        itemBg.height = 310;
        itemBg.setPosition(this.viewBg.width / 2 - itemBg.width / 2, 20);
        this.addChildToContainer(itemBg);
        var desc = ComponentManager.getTextField(LanguageManager.getlocal("bindingPhoneDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        desc.width = this.viewBg.width - 100;
        desc.lineSpacing = 4;
        desc.setPosition(50 + GameData.popupviewOffsetX, 42);
        this.addChildToContainer(desc);
        var nameTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_CONTENT_SMALL, 320, 40, "realnamerewards_frame", LanguageManager.getlocal("bindingPhone_input1"), TextFieldConst.COLOR_GRAY_LIGHT);
        nameTF.x = 50 + GameData.popupviewOffsetX;
        nameTF.y = desc.y + desc.height + 40;
        this.addChildToContainer(nameTF);
        this._phoneInput = nameTF.getChildByName("textField");
        this._phoneInput.inputType = egret.TextFieldInputType.TEL;
        this._getcodeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_BLUE, "bindingPhone_send", this.sendBtnClick, this);
        this._getcodeBtn.setPosition(nameTF.x + nameTF.width + 16, nameTF.y);
        this.addChildToContainer(this._getcodeBtn);
        // 身份证
        var idTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_CONTENT_SMALL, 320, 40, "realnamerewards_frame", LanguageManager.getlocal("bindingPhone_input2"), TextFieldConst.COLOR_GRAY_LIGHT);
        idTF.x = 50 + GameData.popupviewOffsetX;
        idTF.y = nameTF.y + 50;
        this.addChildToContainer(idTF);
        this._codeInput = idTF.getChildByName("textField");
        this._codeInput.inputType = egret.TextFieldInputType.TEL;
        var submitBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "bindingPhoneSend", this.okBtnClick, this);
        submitBtn.setPosition(this.viewBg.width / 2 - submitBtn.width / 2, idTF.y + 70);
        this.addChildToContainer(submitBtn);
    };
    BindingPhonePopupview.prototype.sendBtnClick = function () {
        if (!App.CommonUtil.isPhoneNum(this._phoneInput.text)) {
            App.CommonUtil.showTip(LanguageManager.getlocal("bindingPhone_noid"));
            return;
        }
        PlatformManager.sendMobileCode(Number(this._phoneInput.text), null, null);
        this._cdtime = 60;
        this._getcodeBtn.setEnable(false);
        this.updateTime();
    };
    BindingPhonePopupview.prototype.updateTime = function () {
        if (this._cdtime > 0) {
            var text = App.DateUtil.getFormatBySecond(this._cdtime, 3);
            this._getcodeBtn.setText(text, false);
            egret.Tween.get(this._getcodeBtn).wait(1000).call(this.updateTime, this);
        }
        else {
            this._getcodeBtn.setEnable(true);
            this._getcodeBtn.setText("bindingPhone_send");
        }
        this._cdtime--;
    };
    BindingPhonePopupview.prototype.okBtnClick = function () {
        if (!App.CommonUtil.isPhoneNum(this._phoneInput.text)) {
            App.CommonUtil.showTip(LanguageManager.getlocal("bindingPhone_noid"));
            return;
        }
        if (!App.CommonUtil.isCerCode(this._codeInput.text)) {
            App.CommonUtil.showTip(LanguageManager.getlocal("bindingPhone_nocode"));
            return;
        }
        PlatformManager.checkMobileCode(Number(this._phoneInput.text), Number(this._codeInput.text), this.checkCallback, this);
    };
    BindingPhonePopupview.prototype.checkCallback = function () {
        var reqData = { t: "setphonenumber", pid: LoginManager.getLocalUserName(), phonenumber: this._phoneInput.text };
        var that = this;
        NetManager.http.get(ServerCfg.svrCfgUrl, reqData, function (newdata) {
            that.hide();
            GameData.hasPhone = 1;
            App.CommonUtil.showTip(LanguageManager.getlocal("bindingPhone_code_pass"));
        }, function () {
            NetLoading.hide();
        }, this);
        // let reqStr:any=ServerCfg.svrCfgUrl+"setphonenumber?pid="+LoginManager.getLocalUserName()+"&phonenumber="+this._phoneNum;
        // let that = this;
        // NetManager.http.post(reqStr,{},(newdata:any)=>{
        //         that.hide();
        //         App.CommonUtil.showTip(LanguageManager.getlocal("bindingPhone_code_pass"));
        //     }, ()=>{
        //         NetLoading.hide();
        //     }, this);
    };
    BindingPhonePopupview.prototype.getBgExtraHeight = function () {
        return 20;
    };
    BindingPhonePopupview.prototype.dispose = function () {
        this._phoneInput = null;
        this._codeInput = null;
        this._getcodeBtn = null;
        this._cdtime = 0;
        _super.prototype.dispose.call(this);
    };
    return BindingPhonePopupview;
}(PopupView));
__reflect(BindingPhonePopupview.prototype, "BindingPhonePopupview");
//# sourceMappingURL=BindingPhonePopupview.js.map