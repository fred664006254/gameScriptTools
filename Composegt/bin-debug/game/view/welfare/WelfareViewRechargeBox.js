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
var WelfareViewRechargeBox = (function (_super) {
    __extends(WelfareViewRechargeBox, _super);
    function WelfareViewRechargeBox() {
        return _super.call(this) || this;
    }
    WelfareViewRechargeBox.prototype.init = function () {
        _super.prototype.init.call(this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT, this.useCallback, this);
        var itemVo1 = Api.shopVoApi.getPayInfoById2("g9");
        var rechargeItemCfg = Config.RechargeCfg.getRechargeItemCfgByKey("g9");
        var lt = itemVo1.st + rechargeItemCfg.lastTime - GameData.serverTime;
        var timeStr = LanguageManager.getlocal("limitTime", [App.DateUtil.getFormatBySecond(lt, 1)]);
        this._timeTF = ComponentManager.getTextField(timeStr, TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
        this._timeTF.x = 300;
        this._timeTF.y = 130;
        this.addChild(this._timeTF);
        var temScale = 0.83;
        var iconSp1 = BaseBitmap.create("rechargebox_bg1");
        iconSp1.x = this.bottomBg.width / 2 - iconSp1.width / 2;
        iconSp1.y = this.bottomBg.y + 20;
        this.addChild(iconSp1);
        var rewardList1 = Config.RechargeCfg.rewardList1();
        var totalNum1 = rewardList1.length;
        for (var i = 0; i < rewardList1.length; i++) {
            var icon = GameData.getItemIcon(rewardList1[i], true, true);
            icon.scaleX = icon.scaleY = temScale;
            // icon.x = 20 + 7*(i + 1) + icon.width*temScale*i;
            icon.x = 45 + (icon.width * temScale + 15) * i;
            icon.y = iconSp1.y + 150;
            this.addChild(icon);
        }
        var isBuy1 = Api.shopVoApi.getPayInfo1();
        if (isBuy1 == true) {
            var hasGetSp = BaseBitmap.create("public_buy");
            hasGetSp.x = this.bottomBg.width / 2 - hasGetSp.width / 2;
            hasGetSp.y = iconSp1.y + iconSp1.height - 42 - hasGetSp.height / 2;
            this.addChild(hasGetSp);
            //  this.showText();
        }
        else {
            var rechargeItemCfg_1 = Config.RechargeCfg.getRechargeItemCfgByKey("g9");
            if (rechargeItemCfg_1) {
                // App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.useCallback,this);
                var goToRechargeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "anyMoney", this.goToRechargeHandler, this);
                goToRechargeBtn.x = this.bottomBg.width / 2 - goToRechargeBtn.width / 2;
                goToRechargeBtn.y = iconSp1.y + iconSp1.height - 42 - goToRechargeBtn.height / 2;
                goToRechargeBtn.setText(LanguageManager.getlocal("anyMoney", [rechargeItemCfg_1.cost.toString()]), false);
                this.addChild(goToRechargeBtn);
                this._goToRechargeBtn = goToRechargeBtn;
            }
        }
        var iconSp2 = BaseBitmap.create("rechargebox_bg2");
        iconSp2.x = this.bottomBg.width / 2 - iconSp2.width / 2;
        iconSp2.y = iconSp1.y + iconSp1.height + 10;
        this.addChild(iconSp2);
        var rewardList2 = Config.RechargeCfg.rewardList2();
        var totalNum2 = rewardList2.length;
        for (var i = 0; i < rewardList2.length; i++) {
            var icon = GameData.getItemIcon(rewardList2[i], true, true);
            icon.scaleX = icon.scaleY = temScale;
            // icon.x = 20 + 7*(i + 1) + icon.width*temScale*i;
            icon.x = 45 + (icon.width * temScale + 15) * i;
            icon.y = iconSp2.y + 150;
            this.addChild(icon);
        }
        var isBuy2 = Api.shopVoApi.getPayInfo2();
        if (isBuy2 == true) {
            var hasGetSp = BaseBitmap.create("public_buy");
            hasGetSp.x = this.bottomBg.width / 2 - hasGetSp.width / 2;
            hasGetSp.y = iconSp2.y + iconSp2.height - 45 - hasGetSp.height / 2;
            this.addChild(hasGetSp);
            //  this.showText();
        }
        else {
            var rechargeItemCfg_2 = Config.RechargeCfg.getRechargeItemCfgByKey("g10");
            if (rechargeItemCfg_2) {
                // App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.useCallback,this);
                var goToRechargeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "anyMoney", this.goToRechargeHandler2, this);
                goToRechargeBtn.x = this.bottomBg.width / 2 - goToRechargeBtn.width / 2;
                goToRechargeBtn.y = iconSp2.y + iconSp2.height - 45 - goToRechargeBtn.height / 2;
                goToRechargeBtn.setText(LanguageManager.getlocal("anyMoney", [rechargeItemCfg_2.cost.toString()]), false);
                this.addChild(goToRechargeBtn);
                this._goToRechargeBtn2 = goToRechargeBtn;
            }
        }
        // TickManager.addTick(this.tick,this);
    };
    // public showText():void
    // {
    // 	//月卡有效期
    // 	let str =App.DateUtil.getFormatBySecond(Api.shopVoApi.getMonthcardet(),6);
    // 	let cardTimedeTxt:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("cardTimedes",[str]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
    // 	cardTimedeTxt.x = 240;
    // 	cardTimedeTxt.y = GameConfig.stageHeigth-130;
    // 	this.addChild(cardTimedeTxt);
    // }
    WelfareViewRechargeBox.prototype.useCallback = function (event) {
        if (event === void 0) { event = null; }
        var isBuy = Api.shopVoApi.getPayInfo1();
        if (isBuy) {
            //  this.showText();
            this._goToRechargeBtn.visible = false;
            var hasGetSp = BaseBitmap.create("public_buy");
            hasGetSp.x = this._goToRechargeBtn.x + this._goToRechargeBtn.width / 2 - hasGetSp.width / 2;
            hasGetSp.y = this._goToRechargeBtn.y + this._goToRechargeBtn.height / 2 - hasGetSp.height / 2;
            this.addChild(hasGetSp);
            // App.CommonUtil.showTip(LanguageManager.getlocal("sysBuySuccessDesc",[LanguageManager.getlocal("monthCard")]));
            // App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.useCallback,this);
            var cfg11 = Config.RechargeCfg.getRechargeItemCfgByKey("g9");
            var rewards = "1_0_" + cfg11.gemCost + "|" + cfg11.getReward;
            var pos = this._goToRechargeBtn.localToGlobal(this._goToRechargeBtn.width / 2, -50);
            App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(rewards), pos);
        }
        var isBuy2 = Api.shopVoApi.getPayInfo2();
        if (isBuy2 == true) {
            this._goToRechargeBtn2.visible = false;
            var hasGetSp = BaseBitmap.create("public_buy");
            hasGetSp.x = this._goToRechargeBtn2.x + this._goToRechargeBtn2.width / 2 - hasGetSp.width / 2;
            hasGetSp.y = this._goToRechargeBtn2.y + this._goToRechargeBtn2.height / 2 - hasGetSp.height / 2;
            this.addChild(hasGetSp);
            // App.CommonUtil.showTip(LanguageManager.getlocal("sysBuySuccessDesc",[LanguageManager.getlocal("monthCard")]));
            // App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.useCallback,this);
            var cfg11 = Config.RechargeCfg.getRechargeItemCfgByKey("g10");
            var rewards = "1_0_" + cfg11.gemCost + "|" + cfg11.getReward;
            var pos = this._goToRechargeBtn2.localToGlobal(this._goToRechargeBtn2.width / 2, -50);
            App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(rewards), pos);
            //  this.showText();
        }
    };
    WelfareViewRechargeBox.prototype.tick = function () {
        if (this._timeTF) {
            var itemVo1 = Api.shopVoApi.getPayInfoById2("g9");
            var rechargeItemCfg = Config.RechargeCfg.getRechargeItemCfgByKey("g9");
            var lt = itemVo1.st + rechargeItemCfg.lastTime - GameData.serverTime;
            var timeStr = LanguageManager.getlocal("limitTime", [App.DateUtil.getFormatBySecond(lt, 1)]);
            this._timeTF.text = timeStr;
            if (lt <= 0) {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RECHARFGE_BOX_TIMEOUT);
            }
        }
    };
    WelfareViewRechargeBox.prototype.goToRechargeHandler = function () {
        // let cfg11 = Config.RechargeCfg.getRechargeItemCfgByKey("g9");
        // let rewards =  "1_0_"  +cfg11.gemCost + "|" + cfg11.getReward;
        // let pos = this._goToRechargeBtn.localToGlobal(this._goToRechargeBtn.width/2,-50);
        // App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(rewards),pos);
        PlatformManager.pay("g9");
        // ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIEW);
    };
    WelfareViewRechargeBox.prototype.goToRechargeHandler2 = function () {
        PlatformManager.pay("g10");
        // ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIEW);
    };
    WelfareViewRechargeBox.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "rechargebox_bg1", "rechargebox_bg2", "rechargebox_bg",
        ]);
    };
    WelfareViewRechargeBox.prototype.dispose = function () {
        // TickManager.removeTick(this.tick,this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT, this.useCallback, this);
        this._goToRechargeBtn = null;
        this._goToRechargeBtn2 = null;
        _super.prototype.dispose.call(this);
    };
    return WelfareViewRechargeBox;
}(WelfareViewTab));
__reflect(WelfareViewRechargeBox.prototype, "WelfareViewRechargeBox");
