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
 * 设置联系我们
 * author dky
 * date 201711/10
 * @class SettingContactPopupView
 */
var SettingContactPopupView = (function (_super) {
    __extends(SettingContactPopupView, _super);
    function SettingContactPopupView() {
        return _super.call(this) || this;
    }
    SettingContactPopupView.prototype.initView = function () {
        console.log("QAZ type " + this.param.data.type);
        if (this.param.data.type == 2) {
            this._conMsg = "";
            if (this.param.data.info.tel) {
                this._conMsg = LanguageManager.getlocal("settingContactTF", [this.param.data.info.tel]);
            }
            if (this.param.data.info.qq) {
                if (this._conMsg != "") {
                    this._conMsg += "\n";
                }
                this._conMsg += LanguageManager.getlocal("settingContactQQ", [this.param.data.info.qq]);
            }
            if (this.param.data.info.qq_group) {
                if (this._conMsg != "") {
                    this._conMsg += "\n";
                }
                this._conMsg += LanguageManager.getlocal("welfareViewQQGroup1", [this.param.data.info.qq_group]);
            }
            if (this.param.data.info.pub_account) {
                if (this._conMsg != "") {
                    this._conMsg += "\n";
                }
                this._conMsg += LanguageManager.getlocal("pub_account", [this.param.data.info.pub_account]);
            }
            if (this.param.data.info.qq_pub_account) {
                if (this._conMsg != "") {
                    this._conMsg += "\n";
                }
                this._conMsg += LanguageManager.getlocal("qq_pub_account", [this.param.data.info.qq_pub_account]);
            }
        }
        var contact1Text = ComponentManager.getTextField(this._conMsg, TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_BLACK);
        contact1Text.multiline = true;
        contact1Text.lineSpacing = 5;
        contact1Text.width = 500;
        contact1Text.verticalAlign = egret.VerticalAlign.MIDDLE;
        contact1Text.x = 50;
        contact1Text.y = 40;
        this.addChildToContainer(contact1Text);
        if (PlatformManager.checkIs37WdSp() && PlatformManager.getAppid() != "1003001003") {
            var jumpqqBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "", this.jumpHandler, this);
            jumpqqBtn.x = this.viewBg.width / 2 - jumpqqBtn.width / 2;
            // jumpqqBtn.x = 50;
            jumpqqBtn.y = 140;
            jumpqqBtn.setText("前往添加群", false);
            this.addChildToContainer(jumpqqBtn);
        }
    };
    SettingContactPopupView.prototype.jumpHandler = function () {
        RSDKHelper.jumpToQQApp();
    };
    SettingContactPopupView.prototype.getRequestData = function () {
        if (this.param.data.type == 0) {
            return { requestType: NetRequestConst.REQUEST_USER_GETKFMSG, requestData: {} };
        }
        else {
            return null;
        }
    };
    //请求回调
    SettingContactPopupView.prototype.receiveData = function (data) {
        if (data.data.ret < 0) {
            return;
        }
        if (data.data.cmd == NetRequestConst.REQUEST_USER_GETKFMSG) {
            this._conMsg = data.data.data.msg;
        }
    };
    SettingContactPopupView.prototype.getShowHeight = function () {
        return 350;
    };
    SettingContactPopupView.prototype.dispose = function () {
        this._conMsg = "";
        _super.prototype.dispose.call(this);
    };
    return SettingContactPopupView;
}(PopupView));
__reflect(SettingContactPopupView.prototype, "SettingContactPopupView");
