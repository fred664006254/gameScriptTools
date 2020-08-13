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
var RealnameconstraintPopupView = (function (_super) {
    __extends(RealnameconstraintPopupView, _super);
    function RealnameconstraintPopupView() {
        var _this = _super.call(this) || this;
        _this._inputContainer = null;
        _this._rechargeBtn = null;
        _this._nameInput = null;
        _this._idInput = null;
        return _this;
    }
    RealnameconstraintPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "realnamerewards_bg",
            "realnamerewards_frame", "public",
            "btn_big_yellow", "btn_big_yellow_down",
            "itembg_1", "itembg_3", "itembg_4", "itembg_7",
        ]);
    };
    RealnameconstraintPopupView.prototype.initView = function () {
        var bg = BaseBitmap.create("realnamerewards_bg");
        bg.setPosition(this.viewBg.width / 2 - bg.width / 2, 0);
        this.addChildToContainer(bg);
        var desc = ComponentManager.getTextField(LanguageManager.getlocal("realnamerewards_desc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        desc.width = this.viewBg.width - 50;
        desc.lineSpacing = 4;
        desc.setPosition(25 + GameData.popupviewOffsetX, 12);
        this.addChildToContainer(desc);
        var rewardStr = "1_1_200|6_1150_1|6_1201_1|6_1001_5"; //Config.GameprojectCfg.rewardRealName;
        var rewardIcons = GameData.getRewardItemIcons(rewardStr, true);
        var posX = this.viewBg.width / 2 - rewardIcons.length * 63 + 9;
        for (var i = 0; i < rewardIcons.length; i++) {
            var icon = rewardIcons[i];
            icon.setPosition(posX + i * 124, 226);
            this.addChildToContainer(icon);
        }
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
        var submitBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "submit", this.okBtnClick, this);
        submitBtn.setPosition(this.viewBg.width / 2 - submitBtn.width / 2, 497);
        this._inputContainer.addChild(submitBtn);
        if (this.closeBtn) {
            this.closeBtn.visible = false;
        }
    };
    RealnameconstraintPopupView.prototype.okBtnClick = function () {
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
    RealnameconstraintPopupView.prototype.realnameCheckOk = function () {
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
                _this.hide();
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("realname_neterror"));
            }
        });
    };
    RealnameconstraintPopupView.prototype.checkRecharge = function () {
        if (Api.gameinfoVoApi.getRealnameRewards() == 2) {
            this._rechargeBtn.setText("DragonBoatDayLq");
        }
    };
    RealnameconstraintPopupView.prototype.getTitleStr = function () {
        return "realname2PopupViewTitle";
    };
    RealnameconstraintPopupView.prototype.getBgExtraHeight = function () {
        return 0;
    };
    RealnameconstraintPopupView.prototype.dispose = function () {
        this._inputContainer = null;
        this._nameInput = null;
        this._idInput = null;
        _super.prototype.dispose.call(this);
    };
    return RealnameconstraintPopupView;
}(PopupView));
__reflect(RealnameconstraintPopupView.prototype, "RealnameconstraintPopupView");
//# sourceMappingURL=RealnameconstraintPopupView.js.map