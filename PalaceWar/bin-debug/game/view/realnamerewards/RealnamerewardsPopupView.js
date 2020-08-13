/**
 * 实名认证领取奖励
 * author shaoliang
 * date 2019/2/26
 * @class RealnamerewardsPopupView
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
var RealnamerewardsPopupView = (function (_super) {
    __extends(RealnamerewardsPopupView, _super);
    function RealnamerewardsPopupView() {
        var _this = _super.call(this) || this;
        _this._inputContainer = null;
        _this._rechargeBtn = null;
        _this._nameInput = null;
        _this._idInput = null;
        return _this;
    }
    RealnamerewardsPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "realnamerewards_bg",
            "realnamerewards_frame",
        ]);
    };
    RealnamerewardsPopupView.prototype.initView = function () {
        var bg = BaseBitmap.create("realnamerewards_bg");
        bg.setPosition(this.viewBg.width / 2 - bg.width / 2, 0);
        this.addChildToContainer(bg);
        var desc = ComponentManager.getTextField(LanguageManager.getlocal("realnamerewards_desc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        desc.width = this.viewBg.width - 50;
        desc.lineSpacing = 4;
        desc.setPosition(25 + GameData.popupviewOffsetX, 12);
        this.addChildToContainer(desc);
        var rewardStr = Config.GameprojectCfg.rewardRealName;
        var rewardIcons = GameData.getRewardItemIcons(rewardStr, true);
        var posX = this.viewBg.width / 2 - rewardIcons.length * 63 + 9;
        for (var i = 0; i < rewardIcons.length; i++) {
            var icon = rewardIcons[i];
            icon.setPosition(posX + i * 124, 226);
            this.addChildToContainer(icon);
        }
        if (Api.gameinfoVoApi.getRealnameRewards() == null) {
            this._inputContainer = new BaseDisplayObjectContainer();
            this.addChildToContainer(this._inputContainer);
            // 姓名
            var nameTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_CONTENT_SMALL, 506, 40, "realnamerewards_frame", LanguageManager.getlocal("realnamerewards_input1"), TextFieldConst.COLOR_GRAY_LIGHT);
            nameTF.x = this.viewBg.x + this.viewBg.width / 2 - nameTF.width / 2;
            nameTF.y = 390;
            this._inputContainer.addChild(nameTF);
            this._nameInput = nameTF.getChildByName("textField");
            // 身份证
            var idTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_CONTENT_SMALL, 506, 40, "realnamerewards_frame", LanguageManager.getlocal("realnamerewards_input2"), TextFieldConst.COLOR_GRAY_LIGHT);
            idTF.x = this.viewBg.x + this.viewBg.width / 2 - idTF.width / 2;
            idTF.y = 435;
            this._inputContainer.addChild(idTF);
            this._idInput = idTF.getChildByName("textField");
            var nextSayBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "nextsay", this.hide, this);
            nextSayBtn.setPosition(this.viewBg.width / 2 - 36 - nextSayBtn.width, 497);
            this._inputContainer.addChild(nextSayBtn);
            var submitBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "submit", this.okBtnClick, this);
            submitBtn.setPosition(this.viewBg.width / 2 + 36, nextSayBtn.y);
            this._inputContainer.addChild(submitBtn);
        }
        else {
            this.showRecharge();
        }
    };
    RealnamerewardsPopupView.prototype.okBtnClick = function () {
        var _this = this;
        console.log("okBtnClick", this._nameInput.text, this._idInput.text);
        if ((!App.CommonUtil.isCardNo(this._idInput.text)) || (!App.CommonUtil.isTrueName(this._nameInput.text))) {
            App.CommonUtil.showTip(LanguageManager.getlocal("realname_noid"));
            return;
        }
        if (PlatformManager.checkIsUseSDK() && RSDKHelper.isInit && GameData.idcardNoFreeApiSwitch === 0) {
            RSDKHelper.realname_auth(this._idInput.text, this._nameInput.text, function (ret, msg) {
                if (ret === 0) {
                    console.log("验证成功");
                    _this.realnameCheckOk();
                }
                else {
                    console.log("验证失败", msg.error);
                    App.CommonUtil.showTip(msg.error);
                }
            });
        }
        else {
            this.realnameCheckOk();
        }
    };
    RealnamerewardsPopupView.prototype.realnameCheckOk = function () {
        var _this = this;
        // 是否成年
        var adult = App.CommonUtil.getAge(this._idInput.text) >= 18;
        Api.realnameVoApi.setIdcardInfo(this._idInput.text, this._nameInput.text, adult ? "3" : "2", function (err) {
            if (!err) {
                App.CommonUtil.showTip(LanguageManager.getlocal("realname_ok"));
                GameData.idcardType = adult ? RealnameConst.USERTYPE_3 : RealnameConst.USERTYPE_2;
                if (LoginManager.isCreateScene) {
                    // 如果在游戏内，就再发一下登录
                    LoginManager.reLoginGame();
                }
                _this.showRecharge();
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("realname_neterror"));
            }
        });
    };
    RealnamerewardsPopupView.prototype.showRecharge = function () {
        if (this._inputContainer) {
            this._inputContainer.dispose();
            this._inputContainer = null;
        }
        var okText = ComponentManager.getTextField(LanguageManager.getlocal("realnamerewards_ok"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        okText.setPosition(this.viewBg.width / 2 - okText.width / 2, 420);
        this.addChildToContainer(okText);
        this._rechargeBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "gotocharge", this.rechargeHandle, this);
        this._rechargeBtn.setPosition(this.viewBg.width / 2 - this._rechargeBtn.width / 2, 497);
        this.addChildToContainer(this._rechargeBtn);
        this.checkRecharge();
    };
    RealnamerewardsPopupView.prototype.checkRecharge = function () {
        if (Api.gameinfoVoApi.getRealnameRewards() == 2) {
            this._rechargeBtn.setText("DragonBoatDayLq");
        }
    };
    RealnamerewardsPopupView.prototype.rechargeHandle = function () {
        if (Api.gameinfoVoApi.getRealnameRewards() == 2) {
            this.request(NetRequestConst.REQUST_USER_GETREALNAMEREWARDS, {});
        }
        else {
            ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
            this.hide();
        }
    };
    RealnamerewardsPopupView.prototype.receiveData = function (data) {
        if (data.ret) {
            var rewardStr = Config.GameprojectCfg.rewardRealName;
            var iconModels = GameData.formatRewardItem(rewardStr);
            App.CommonUtil.playRewardFlyAction(iconModels);
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_MAINUI_REALNAMEREWARDS);
            this.hide();
        }
    };
    RealnamerewardsPopupView.prototype.getTitleStr = function () {
        return "realname2PopupViewTitle";
    };
    RealnamerewardsPopupView.prototype.getBgExtraHeight = function () {
        return 0;
    };
    RealnamerewardsPopupView.prototype.showAcitivePop = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_ACTIVITY_POP, this.showAcitivePop, this);
        if (Api.switchVoApi.checkOpenActivityPop() && Api.otherInfoVoApi.checkShowAcitivePop()) {
            if (Config.AcCfg.isGetAll == true) {
                Api.acVoApi.checkShowePopupView();
            }
        }
    };
    RealnamerewardsPopupView.prototype.dispose = function () {
        this._inputContainer = null;
        this._nameInput = null;
        this._idInput = null;
        _super.prototype.dispose.call(this);
    };
    return RealnamerewardsPopupView;
}(PopupView));
__reflect(RealnamerewardsPopupView.prototype, "RealnamerewardsPopupView");
//# sourceMappingURL=RealnamerewardsPopupView.js.map