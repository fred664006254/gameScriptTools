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
var WelfareViewBinding = (function (_super) {
    __extends(WelfareViewBinding, _super);
    function WelfareViewBinding() {
        return _super.call(this) || this;
    }
    WelfareViewBinding.prototype.init = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_OTHERINFO_GETBINDREWARD), this.useCallback, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_IOS_BINDPHONE, this.bindCallBackIos, this);
        _super.prototype.init.call(this);
        var temW = 491;
        var temH = this.bottomBg.height + this.bottomBg.y;
        var regdt = Api.gameinfoVoApi.getRegdt();
        var time1 = App.DateUtil.getFormatBySecond(regdt, 9);
        var time2 = App.DateUtil.getFormatBySecond(regdt + 86400 * Config.GameprojectCfg.reward3KlastTime, 9);
        var day = Math.ceil(30 - (GameData.serverTime - regdt) / 86400);
        var timeStr = LanguageManager.getlocal("getBindingTime", [time1, time2, day.toString()]);
        var timeTF = ComponentManager.getTextField(timeStr, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        timeTF.x = 10;
        timeTF.y = this.bottomBg.y - 26;
        this.addChild(timeTF);
        var word = ComponentManager.getTextField(LanguageManager.getlocal("bindRewardTitle"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        word.width = this.width - 50;
        word.setPosition(30, this.bottomBg.y + 25);
        this.addChild(word);
        var bg1 = BaseBitmap.create("public_9_managebg");
        bg1.width = temW - 40;
        bg1.height = 330;
        bg1.x = temW / 2 - bg1.width / 2;
        bg1.y = word.y + word.height + 10;
        this.addChild(bg1);
        var word2 = ComponentManager.getTextField(LanguageManager.getlocal("bindRewardDesc"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        word2.width = this.width - 50;
        word2.lineSpacing = 10;
        word2.setPosition(30, bg1.y + 15);
        this.addChild(word2);
        var line1 = BaseBitmap.create("public_line3");
        line1.width = temW - 100;
        line1.x = temW / 2 - line1.width / 2;
        line1.y = bg1.y + bg1.height + 20;
        this.addChild(line1);
        var nameTF = ComponentManager.getTextField(LanguageManager.getlocal("bindReward"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        nameTF.x = line1.x + line1.width / 2 - nameTF.width / 2;
        nameTF.y = line1.y + line1.height / 2 - nameTF.height / 2;
        this.addChild(nameTF);
        var bg = BaseBitmap.create("public_9v_bg04");
        bg.width = temW - 40;
        bg.height = 100;
        bg.x = temW / 2 - bg.width / 2;
        bg.y = line1.y + 35;
        this.addChild(bg);
        var temScale = 0.8;
        var spaceW = 15;
        var spaceH = 10;
        var rewardList = GameData.formatRewardItem(Config.GameprojectCfg.reward3K);
        var totalNum = rewardList.length;
        for (var i = 0; i < rewardList.length; i++) {
            var icon = GameData.getItemIcon(rewardList[i], true, true);
            icon.scaleX = icon.scaleY = temScale;
            // icon.x = 20 + 7*(i + 1) + icon.width*temScale*i;
            icon.x = bg.x + bg.width / 2 + (icon.width * temScale) * (i - totalNum / 2) + spaceW * (i - (totalNum - 1) / 2);
            icon.y = bg.y + 7;
            this.addChild(icon);
        }
        var bindBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "bindPhone", this.bindBtnHandler, this);
        bindBtn.x = temW / 4 * 1 - bindBtn.width / 2;
        bindBtn.y = bg.y + bg.height + 48 - bindBtn.height / 2;
        this.addChild(bindBtn);
        this._bindBtn = bindBtn;
        if (PlatformManager.isSupportBindPhone()) {
            if (PlatformManager.client.checkBindPhone() || GameData.kkkIsBindIos == "1") {
                bindBtn.setEnable(false);
                bindBtn.setText("bindPhone2");
            }
        }
        var payflag = Api.otherInfoVoApi.isGetBindingReward();
        // if(payflag == -1)
        // {
        // 	App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.useCallback,this);
        // 	let goToRechargeBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"gotocharge",this.clickBtnHandler,this);
        // 	goToRechargeBtn.x = temW*3/2 - goToRechargeBtn.width/2;
        // 	goToRechargeBtn.y = bg.y + bg.height + 48 - goToRechargeBtn.height/2;
        // 	this.addChild(goToRechargeBtn);
        // 	this._getBtn = goToRechargeBtn;
        // }
        // else
        if (!payflag) {
            var getBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "taskCollect", this.getBtnHandler, this);
            getBtn.x = temW / 4 * 3 - getBtn.width / 2;
            getBtn.y = bg.y + bg.height + 48 - getBtn.height / 2;
            this.addChild(getBtn);
            this._getBtn = getBtn;
            this._getBtn.setEnable(false);
            if (PlatformManager.client.checkBindPhone() || GameData.kkkIsBindIos == "1") {
                this._getBtn.setEnable(true);
            }
        }
        else {
            var hasGetSp = BaseBitmap.create("collectflag");
            hasGetSp.x = temW * 4 / 4 - hasGetSp.width / 2;
            hasGetSp.y = temH - hasGetSp.height - 35;
            hasGetSp.y = bg.y + bg.height + 48 - hasGetSp.height / 2;
            this.addChild(hasGetSp);
        }
    };
    WelfareViewBinding.prototype.bindBtnHandler = function () {
        PlatformManager.client.showBindPhoneView(this.bindCallBack, this);
        // this.bindCallBack();
        //  GameData.kkkIsBindIos = "1";
        //是否绑定过手机 1已绑定,0未绑定
        // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_IOS_BINDPHONE,{"result":String("1")});
    };
    WelfareViewBinding.prototype.bindCallBack = function (result) {
        if (result == "true") {
            GameData.kkkIsBindIos = "1";
            this._bindBtn.setEnable(false);
            this._bindBtn.setText("bindPhone2");
            this._getBtn.setEnable(true);
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("bindPhoneFailTip"));
        }
    };
    WelfareViewBinding.prototype.bindCallBackIos = function (event) {
        var data = event.data;
        if (data.result == "1") {
            this._bindBtn.setEnable(false);
            this._bindBtn.setText("bindPhone2");
            this._getBtn.setEnable(true);
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("bindPhoneFailTip"));
        }
    };
    WelfareViewBinding.prototype.getBtnHandler = function () {
        NetManager.request(NetRequestConst.REQUEST_OTHERINFO_GETBINDREWARD, null);
    };
    WelfareViewBinding.prototype.useCallback = function (event) {
        if (event === void 0) { event = null; }
        if (this._getBtn) {
            this._getBtn.visible = false;
            var hasGetSp = BaseBitmap.create("collectflag");
            hasGetSp.x = this._getBtn.x + this._getBtn.width / 2 - hasGetSp.width / 2;
            hasGetSp.y = this._getBtn.y + this._getBtn.height / 2 - hasGetSp.height / 2;
            this.addChild(hasGetSp);
            var rewardList = GameData.formatRewardItem(Config.GameprojectCfg.reward3K);
            if (rewardList) {
                var globalPt = this.localToGlobal(this._getBtn.x, this._getBtn.y - 40);
                var runPos = new egret.Point(globalPt.x + 55, globalPt.y - 30);
                App.CommonUtil.playRewardFlyAction(rewardList, runPos);
            }
            // App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.useCallback,this);
        }
    };
    WelfareViewBinding.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT, this.useCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_OTHERINFO_GETBINDREWARD), this.useCallback, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_IOS_BINDPHONE, this.bindCallBackIos, this);
        this._getBtn = null;
        _super.prototype.dispose.call(this);
    };
    return WelfareViewBinding;
}(WelfareViewTab));
__reflect(WelfareViewBinding.prototype, "WelfareViewBinding");
