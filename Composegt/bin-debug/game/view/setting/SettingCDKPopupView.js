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
 * @class SettingCDKPopupView
 */
var SettingCDKPopupView = (function (_super) {
    __extends(SettingCDKPopupView, _super);
    function SettingCDKPopupView() {
        return _super.call(this) || this;
    }
    SettingCDKPopupView.prototype.initView = function () {
        //输入框
        var inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL, 400, 45, "public_9_bg5", LanguageManager.getlocal("settingCDKTip"), 0xb1b1b1);
        inputTF.x = this.viewBg.x + this.viewBg.width / 2 - inputTF.width / 2;
        inputTF.y = 30;
        this.addChildToContainer(inputTF);
        this._inputTextField = inputTF.getChildByName("textField");
        // this._inputTextField.maxChars = 8;
        var sendBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "settingCDKget", this.sentBtnClick, this);
        sendBtn.x = inputTF.x + inputTF.width / 2 - sendBtn.width / 2;
        sendBtn.y = inputTF.y + inputTF.height + 20;
        // sendBtn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChildToContainer(sendBtn);
    };
    SettingCDKPopupView.prototype.sentBtnClick = function () {
        // if(!this._inputTextField.bindData)
        // {
        // 	return;
        // }	
        if (this._inputTextField.text.length <= 0) {
            return;
        }
        this.request(NetRequestConst.REQUEST_USER_EXCHANGECARD, { id: this._inputTextField.text });
    };
    //请求回调
    SettingCDKPopupView.prototype.receiveData = function (data) {
        if (data.data.data.flag == 1) {
            App.CommonUtil.showTip(LanguageManager.getlocal("settingCDKgetMsg1"));
            return;
        }
        if (data.data.data.flag == 2) {
            App.CommonUtil.showTip(LanguageManager.getlocal("settingCDKgetMsg2"));
            return;
        }
        if (data.data.data.flag == 3) {
            App.CommonUtil.showTip(LanguageManager.getlocal("settingCDKgetMsg3"));
            return;
        }
        if (data.data.data.flag == 4) {
            App.CommonUtil.showTip(LanguageManager.getlocal("settingCDKgetMsg4"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, data.data.data.rewards);
        // let rewards = "2_1_88888|6_1040_1|6_1041_1"
        // ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,rewards);
        // let rewardList =  GameData.formatRewardItem(data.data.data.rewards);
        // App.CommonUtil.playRewardFlyAction(rewardList);
    };
    SettingCDKPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return SettingCDKPopupView;
}(PopupView));
__reflect(SettingCDKPopupView.prototype, "SettingCDKPopupView");
