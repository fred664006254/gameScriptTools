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
var WelfareViewFirstRecharge = (function (_super) {
    __extends(WelfareViewFirstRecharge, _super);
    function WelfareViewFirstRecharge() {
        var _this = _super.call(this) || this;
        _this._goToRechargeBtn = null;
        _this.isWanba = false;
        _this._container = null;
        _this.getBtnY = 0;
        return _this;
    }
    WelfareViewFirstRecharge.prototype.init = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SHOP_FIRSTCHARGEREWARD), this.useCallback, this);
        this.isWanba = Api.switchVoApi.checknewRecharge();
        _super.prototype.init.call(this);
        var dibian = BaseBitmap.create("public_line");
        dibian.width = 480;
        dibian.y = 445;
        dibian.x = 8;
        this.addChild(dibian);
        if (this.isWanba) {
            this.showWanbaPanel();
            return;
        }
        var temW = 491;
        var temH = this.bottomBg.height + this.bottomBg.y;
        var line1 = BaseBitmap.create("public_line3");
        line1.width = temW - 100;
        line1.x = temW / 2 - line1.width / 2;
        line1.y = this.bottomBg.y + 25;
        this.addChild(line1);
        var nameTF = ComponentManager.getTextField(LanguageManager.getlocal("firstRecharge"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        nameTF.x = line1.x + line1.width / 2 - nameTF.width / 2;
        nameTF.y = line1.y + line1.height / 2 - nameTF.height / 2;
        this.addChild(nameTF);
        var bg = null;
        bg = BaseBitmap.create("public_tc_bg01");
        bg.width = temW - 40;
        bg.height = 100;
        bg.x = temW / 2 - bg.width / 2;
        bg.y = line1.y + 35;
        this.addChild(bg);
        this.showReward(bg, bg.y + 7);
        var payflag = Api.shopVoApi.getPayFlag();
        if (payflag == 0 && Api.servantVoApi.getServantObj("1033") == null) {
            App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT, this.useCallback, this);
            var goToRechargeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "gotocharge", this.clickBtnHandler, this);
            goToRechargeBtn.x = temW / 2 - goToRechargeBtn.width / 2;
            goToRechargeBtn.y = bg.y + bg.height + 48 - goToRechargeBtn.height / 2;
            this.addChild(goToRechargeBtn);
            this._getBtn = goToRechargeBtn;
        }
        else if (payflag == 1 && Api.servantVoApi.getServantObj("1033") == null) {
            var getBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", this.clickBtnHandler, this);
            getBtn.x = temW / 2 - getBtn.width / 2;
            getBtn.y = bg.y + bg.height + 48 - getBtn.height / 2;
            this.addChild(getBtn);
            this._getBtn = getBtn;
        }
        else {
            var hasGetSp = BaseBitmap.create("collectflag");
            // hasGetSp.scaleX =hasGetSp.scaleY =0.8;
            hasGetSp.x = temW / 2 - hasGetSp.width / 2;
            hasGetSp.y = bg.y + bg.height + 48 - hasGetSp.height / 2 + 20;
            this.addChild(hasGetSp);
        }
        var bottomBg = BaseBitmap.create("public_9v_bg03");
        bottomBg.width = 490;
        bottomBg.height = GameConfig.stageHeigth - 65;
        bottomBg.x = 0;
        bottomBg.y = 0;
        this.addChild(bottomBg);
    };
    WelfareViewFirstRecharge.prototype.showReward = function (bg, iconY) {
        if (bg === void 0) { bg = null; }
        if (iconY === void 0) { iconY = 0; }
        var temScale = 0.8;
        var spaceW = 15;
        var spaceH = 10;
        var rewardList = Config.FirstchargeCfg.getRewardItemVoList();
        var totalNum = rewardList.length;
        for (var i = 0; i < rewardList.length; i++) {
            var icon = GameData.getItemIcon(rewardList[i], true, true);
            icon.scaleX = icon.scaleY = temScale;
            icon.x = bg.x + bg.width / 2 + (icon.width * temScale) * (i - totalNum / 2) + spaceW * (i - (totalNum - 1) / 2);
            icon.y = iconY;
            this.addChild(icon);
        }
    };
    WelfareViewFirstRecharge.prototype.clickBtnHandler = function () {
        var payflag = Api.shopVoApi.getPayFlag();
        if (payflag == 1 && Api.servantVoApi.getServantObj("1033") == null) {
            NetManager.request(NetRequestConst.REQUEST_SHOP_FIRSTCHARGEREWARD, null);
        }
        else {
            ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
        }
    };
    //～～～～～玩吧版本～～～～～～～～
    WelfareViewFirstRecharge.prototype.showWanbaPanel = function () {
        var rechargeArr = [];
        var rechargeArr2 = Config.RechargeCfg.getNormalRechargeCfg();
        for (var i = 0; i < rechargeArr2.length; i++) {
            var _id = rechargeArr2[i].id;
            var boo = Config.FirstchargeCfg.getneedRecharge(_id);
            if (boo) {
                rechargeArr.push(rechargeArr2[i]);
            }
        }
        rechargeArr = rechargeArr.reverse();
        var firstBg = BaseBitmap.create("rechargevie_db_01");
        this.addChild(firstBg);
        firstBg.x = 12;
        firstBg.width = 434;
        firstBg.height = 440;
        firstBg.y = GameConfig.stageHeigth - firstBg.height - 70;
        //icon 背景
        var firstrechargemask_bg = BaseBitmap.create("public_tc_bg01");
        firstrechargemask_bg.x = 24; //firstBg.x;
        firstrechargemask_bg.y = firstBg.y + 60;
        firstrechargemask_bg.width = 440;
        firstrechargemask_bg.height = 120;
        this.addChild(firstrechargemask_bg);
        var nameTF = ComponentManager.getTextField(LanguageManager.getlocal("firstRecharge"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        nameTF.x = firstBg.x + 200;
        nameTF.y = firstBg.y + 23;
        this.addChild(nameTF);
        var leftLine = BaseBitmap.create("public_v_huawen01");
        leftLine.x = nameTF.x - 40 - leftLine.width;
        leftLine.y = nameTF.y + nameTF.height / 2 - leftLine.height / 2;
        var rightLine = BaseBitmap.create("public_v_huawen01");
        rightLine.scaleX = -1;
        rightLine.x = nameTF.x + nameTF.width + 40 + rightLine.width;
        rightLine.y = nameTF.y + nameTF.height / 2 - rightLine.height / 2;
        this.addChild(leftLine);
        this.addChild(rightLine);
        this.getBtnY = firstBg.y + 180;
        this.showReward(firstBg, firstBg.y + 80);
        this.bottomBg.visible = false;
        var firstFontBit = BaseBitmap.create("firstrecharge_font");
        firstFontBit.x = 5; //firstBg.x + 110;
        firstFontBit.y = firstBg.y - 156;
        this.addChild(firstFontBit);
        var starX = 50;
        var starY = firstBg.y + 200;
        var payflag = Api.shopVoApi.getPayFlag();
        this._container = new BaseDisplayObjectContainer();
        this.addChild(this._container);
        var getBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", this.clickBtnHandler, this);
        getBtn.x = firstBg.x + 180;
        getBtn.y = firstBg.y + 200;
        this.addChild(getBtn);
        this._getBtn = getBtn;
        getBtn.visible = false;
        if (payflag == 0 && Api.servantVoApi.getServantObj("1033") == null) {
            App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT, this.useCallback2, this);
            for (var i = 0; i < rechargeArr.length; i++) {
                var getBtn_1 = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "", this.clickGetBtnHandler, this);
                var num = i % 2;
                getBtn_1.setPosition(starX + (getBtn_1.width + 20) * num, (getBtn_1.height + 40) * Math.floor(i / 2) + starY);
                var btnStr = LanguageManager.getlocal("firstRecharge" + (i + 1), [rechargeArr[i].cost + ""]);
                getBtn_1.setText(btnStr, false);
                // this.addChild(getBtn);
                this._container.addChild(getBtn_1);
                var rechargeDes = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
                rechargeDes.text = LanguageManager.getlocal("firstRechargeDes1", [rechargeArr[i].gemCost * 4 + ""]);
                rechargeDes.x = getBtn_1.x + 20;
                rechargeDes.y = getBtn_1.y + getBtn_1.height + 5;
                this._container.addChild(rechargeDes);
                // this.addChild(rechargeDes);
            }
            var firstDes = ComponentManager.getTextField(LanguageManager.getlocal("firstRechargeDes"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
            firstDes.x = firstBg.x + 40;
            firstDes.y = firstBg.y + firstBg.height - 40;
            this._container.addChild(firstDes);
        }
        else if (payflag == 1) {
            getBtn.visible = true;
        }
        else {
            var hasGetSp = BaseBitmap.create("collectflag");
            hasGetSp.x = firstBg.x + 170;
            hasGetSp.y = firstBg.y + 230;
            // hasGetSp.scaleX = hasGetSp.scaleY=0.8;
            this.addChild(hasGetSp);
        }
        var dibian = BaseBitmap.create("public_line");
        dibian.width = 480;
        dibian.y = firstFontBit.y + firstFontBit.height - 17;
        dibian.x = 8;
        this.addChild(dibian);
        var bottomBg = BaseBitmap.create("public_9v_bg03");
        bottomBg.width = 490;
        bottomBg.height = GameConfig.stageHeigth - 65;
        bottomBg.x = 0;
        bottomBg.y = 0;
        this.addChild(bottomBg);
    };
    WelfareViewFirstRecharge.prototype.useCallback2 = function (evt) {
        var payflag = Api.shopVoApi.getPayFlag();
        if (payflag == 1 && Api.servantVoApi.getServantObj("1033") == null) {
            if (this._container) {
                this._container.visible = false;
            }
            if (this._getBtn) {
                this._getBtn.visible = true;
            }
        }
    };
    WelfareViewFirstRecharge.prototype.clickGetBtnHandler = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    };
    WelfareViewFirstRecharge.prototype.useCallback = function (event) {
        if (event === void 0) { event = null; }
        if (Api.servantVoApi.getServantObj("1033") != null) {
            return;
        }
        var payflag = Api.shopVoApi.getPayFlag();
        if (payflag == 2 && this._getBtn) {
            this._getBtn.visible = false;
            var hasGetSp = BaseBitmap.create("collectflag");
            hasGetSp.x = this._getBtn.x + this._getBtn.width / 2 - hasGetSp.width / 2 - 10;
            hasGetSp.y = this._getBtn.y + this._getBtn.height / 2 - hasGetSp.height / 2;
            this.addChild(hasGetSp);
            var rewardList = Config.FirstchargeCfg.getRewardItemVoList();
            if (rewardList) {
                var globalPt = this.localToGlobal(this._getBtn.x, this._getBtn.y - 40);
                var runPos = new egret.Point(globalPt.x + 55, globalPt.y - 30);
                App.CommonUtil.playRewardFlyAction(rewardList, runPos);
            }
            App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT, this.useCallback, this);
        }
        else if (payflag == 1 && this._getBtn) {
            this._getBtn.setText("taskCollect");
        }
    };
    WelfareViewFirstRecharge.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "firstrecharge_bottom", "firstrecharge2_bg", "firstrecharge_font", "firstrechargemask_bg",
        ]);
    };
    WelfareViewFirstRecharge.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT, this.useCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SHOP_FIRSTCHARGEREWARD), this.useCallback, this);
        this._getBtn = null;
        this._container = null;
        _super.prototype.dispose.call(this);
    };
    return WelfareViewFirstRecharge;
}(WelfareViewTab));
__reflect(WelfareViewFirstRecharge.prototype, "WelfareViewFirstRecharge");
