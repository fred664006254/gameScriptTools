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
        ]);
    };
    RealnamerewardsPopupView.prototype.initBg = function () {
        this.viewBg = BaseBitmap.create("realnamerewards_bg");
        // this.viewBg.width = 640;
        // this.viewBg.height = 861;
        this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2, GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
        this.addChild(this.viewBg);
    };
    RealnamerewardsPopupView.prototype.initView = function () {
        // let bg:BaseBitmap = BaseBitmap.create("realnamerewards_bg");
        // bg.setPosition(this.viewBg.width/2-bg.width/2,0);
        // this.addChildToContainer(bg);
        var desc = ComponentManager.getTextField(LanguageManager.getlocal("realnamerewards_desc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        desc.width = this.viewBg.width - 180;
        desc.lineSpacing = 10;
        desc.setPosition(100, 90);
        this.addChildToContainer(desc);
        if (Api.switchVoApi.checkOpenTrueRealName()) {
            var desc1 = ComponentManager.getTextField(LanguageManager.getlocal("realnamerewards_desc1"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_RED3);
            desc1.setPosition(170, 250);
            this.addChildToContainer(desc1);
        }
        var desc2 = ComponentManager.getTextField(LanguageManager.getlocal("realnamerewards_desc2"), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        desc2.setPosition(250, 313);
        this.addChildToContainer(desc2);
        var desc3 = ComponentManager.getTextField(LanguageManager.getlocal("realnamerewards_desc3"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        desc3.setPosition(180, 355);
        this.addChildToContainer(desc3);
        var desc4 = ComponentManager.getTextField(LanguageManager.getlocal("realnamerewards_desc4"), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        desc4.setPosition(250, 500);
        this.addChildToContainer(desc4);
        var rewardStr = Config.GameprojectCfg.rewardRealName;
        // var rewardStr = "6_1201_1|6_1021_1|6_1029_1|6_1102_1";
        var rewardIcons = GameData.getRewardItemIcons(rewardStr, true);
        var posX = this.viewBg.width / 2 - rewardIcons.length * 63 + 19;
        for (var i = 0; i < rewardIcons.length; i++) {
            var icon = rewardIcons[i];
            icon.setScale(0.8);
            icon.setPosition(posX + i * 124, 386);
            this.addChildToContainer(icon);
        }
        // if (Api.otherInfoVoApi.getRealnameRewards() == null)
        // {
        this._inputContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._inputContainer);
        // 姓名
        var nameTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_CONTENT_SMALL, 450, 40, "public_tc_srkbg05", LanguageManager.getlocal("realnamerewards_input1"), TextFieldConst.COLOR_INPUT);
        nameTF.x = this.viewBg.x + this.viewBg.width / 2 - nameTF.width / 2;
        nameTF.y = 550;
        this._inputContainer.addChild(nameTF);
        this._nameInput = nameTF.getChildByName("textField");
        // 身份证
        var idTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_CONTENT_SMALL, 450, 40, "public_tc_srkbg05", LanguageManager.getlocal("realnamerewards_input2"), TextFieldConst.COLOR_INPUT);
        idTF.x = this.viewBg.x + this.viewBg.width / 2 - idTF.width / 2;
        idTF.y = 600;
        this._inputContainer.addChild(idTF);
        this._idInput = idTF.getChildByName("textField");
        var nextSayBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "nextsay", this.hide, this);
        nextSayBtn.setPosition(this.viewBg.width / 2 - 36 - nextSayBtn.width, 680);
        this._inputContainer.addChild(nextSayBtn);
        var submitBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "submit", this.okBtnClick, this);
        submitBtn.setPosition(this.viewBg.width / 2 + 36, nextSayBtn.y);
        this._inputContainer.addChild(submitBtn);
        // }
        // else
        // {
        //     this.showRecharge();
        // }
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
                // this.showRecharge();
                // this.hide();
                _this.request(NetRequestConst.REQUST_OTHERINFO_GETREALNAMEREWARDS, {});
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("realname_neterror"));
            }
        });
    };
    //不显示标题名字
    RealnamerewardsPopupView.prototype.getTitleStr = function () {
        return null;
    };
    RealnamerewardsPopupView.prototype.getTitleBgName = function () {
        return null;
    };
    // 不使用组件的关闭按钮
    // protected getCloseBtnName():string
    // {
    // 	return null;
    // }
    /**
     * 重新一下关闭按钮
     *
     */
    RealnamerewardsPopupView.prototype.getCloseBtnName = function () {
        return "load_closebtn";
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
        if (Api.otherInfoVoApi.getRealnameRewards() == 2) {
            this._rechargeBtn.setText("DragonBoatDayLq");
        }
    };
    RealnamerewardsPopupView.prototype.rechargeHandle = function () {
        if (Api.otherInfoVoApi.getRealnameRewards() == 2) {
            this.request(NetRequestConst.REQUST_OTHERINFO_GETREALNAMEREWARDS, {});
        }
        else {
            ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
            this.hide();
        }
    };
    RealnamerewardsPopupView.prototype.receiveData = function (data) {
        if (data.ret) {
            var rewardStr = Config.GameprojectCfg.rewardRealName;
            // var rewardStr = "6_1201_1|6_1021_1|6_1029_1|6_1102_1";
            var iconModels = GameData.formatRewardItem(rewardStr);
            App.CommonUtil.playRewardFlyAction(iconModels);
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_MAINUI_REALNAMEREWARDS);
            this.hide();
        }
    };
    // protected getTitleStr():string
    // {
    // 	return "realname2PopupViewTitle";
    // }
    RealnamerewardsPopupView.prototype.getBgExtraHeight = function () {
        return 0;
    };
    RealnamerewardsPopupView.prototype.hide = function () {
        if (this.param && this.param.data && this.param.data.showAcPop) {
            //限时红颜 和 首充的强弹
            if (Api.switchVoApi.checkOpenShowPopupWin()) {
                if (Api.switchVoApi.checkClosePay() || PlatformManager.checkHideIconByIP()) {
                    _super.prototype.hide.call(this);
                    return;
                }
                if (GameData.checkTimeLimitWife() || GameData.checkTimeLimitWifeFb()) {
                    //越南fb 红颜强弹出
                    if (GameData.checkTimeLimitWifeFb()) {
                        ViewController.getInstance().openView(ViewConst.POPUP.TIMELIMITWIFEFBVIEW);
                    }
                    else {
                        ViewController.getInstance().openView(ViewConst.POPUP.TIMELIMITWIFEVIEW);
                    }
                }
                else {
                    if (Api.shopVoApi.getPayFlag() != 2 && Api.servantVoApi.getServantObj("1033") == null) {
                        ViewController.getInstance().openView(ViewConst.POPUP.FIRSTRECHARGEVIEW);
                    }
                }
            }
        }
        _super.prototype.hide.call(this);
    };
    // private showAcitivePop():void
    // {	
    // 	App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_ACTIVITY_POP,this.showAcitivePop,this);
    // 	if (Api.switchVoApi.checkOpenActivityPop() && Api.otherInfoVoApi.checkShowAcitivePop())
    // 	{	
    // 		if (Config.AcCfg.isGetAll == true)
    // 		{	
    // 			ViewController.getInstance().openView(ViewConst.POPUP.ACTIVITYPOPVIEW);
    // 		}
    // 	}
    // }
    RealnamerewardsPopupView.prototype.dispose = function () {
        this._inputContainer = null;
        this._nameInput = null;
        this._idInput = null;
        _super.prototype.dispose.call(this);
    };
    return RealnamerewardsPopupView;
}(PopupView));
__reflect(RealnamerewardsPopupView.prototype, "RealnamerewardsPopupView");
