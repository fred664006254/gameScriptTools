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
var RechargeVipViewScrollltem = (function (_super) {
    __extends(RechargeVipViewScrollltem, _super);
    function RechargeVipViewScrollltem() {
        var _this = _super.call(this) || this;
        _this.collectBtn = null;
        _this._data = null;
        _this._recharge2 = null;
        _this._recharge4 = null;
        _this._iconBg = null;
        _this._functionBg = null;
        _this._multiple = 0;
        _this._fourStr = null;
        _this._msgTF = null;
        _this._fourContainer = null;
        _this._twoContainer = null;
        _this._two2Container = null;
        _this._gtContainer = null;
        _this._acerTxt = null;
        _this._acerImg = null;
        _this._currId = 0;
        _this.isnewThanksgiving = false; //感恩界面
        _this._light = null;
        App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY, _this.receivePushData, _this);
        return _this;
    }
    RechargeVipViewScrollltem.prototype.initItem = function (index, data) {
        this._data = data;
        var functionBg = null;
        functionBg = BaseBitmap.create("rechargelistimg");
        this.addChild(functionBg);
        this._functionBg = functionBg;
        this.width = functionBg.width;
        this.height = functionBg.height;
        var iconBg = null;
        if (this.checkIsBigMonthYearCard()) {
            var iconid = data.sortId == 9 ? 2 : 6;
            iconBg = BaseLoadBitmap.create("recharge_new_itemicon" + iconid);
        }
        else {
            iconBg = BaseLoadBitmap.create("recharge_new_itemicon" + data.sortId);
        }
        iconBg.x = functionBg.x + 25;
        iconBg.y = functionBg.y + 5;
        this.addChild(iconBg);
        this._iconBg = iconBg;
        //元宝
        var elementStr2 = LanguageManager.getlocal("rechargeAcerdes");
        var msgTF = ComponentManager.getBitmapText((data.gemCost ? data.gemCost : data.firstGet) + elementStr2, "recharge2_fnt");
        msgTF.y = functionBg.y + 15;
        msgTF.x = functionBg.x + 180;
        this.addChild(msgTF);
        this._acerImg = msgTF;
        if (PlatformManager.checkIsPtLang()) {
            msgTF.text = data.gemCost ? data.gemCost : data.firstGet;
            var gemIcon = BaseBitmap.create('public_icon1');
            this.addChild(gemIcon);
            gemIcon.setPosition(msgTF.x + msgTF.width, msgTF.y + msgTF.height / 2 - gemIcon.height / 2);
        }
        // let treasureStr = LanguageManager.getlocal("reasureStr");
        // let acerImg:BaseBitmapText = ComponentManager.getBitmapText(treasureStr,"recharge2_fnt");
        // acerImg.x = msgTF.x+msgTF.width+2;
        // acerImg.y = msgTF.y-2;
        // this.addChild(acerImg);
        // this._acerImg = acerImg;
        var isHasFirstRecharge = Api.rechargeVoApi.checkFirstRecharge();
        var isNewRecharge = Api.switchVoApi.checknewRecharge();
        //文本
        var acertxt = LanguageManager.getlocal("rechargeAcerdes"); //元宝
        var acerTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        acerTxt.text = String(data.gemCost + acertxt);
        acerTxt.x = functionBg.x + 180;
        acerTxt.y = this._acerImg.y + 60;
        if (PlatformManager.checkIsPtLang()) {
            acerTxt.text = String(data.gemCost);
            var gemIcon = BaseBitmap.create('public_icon1');
            this.addChild(gemIcon);
            gemIcon.setPosition(acerTxt.x + acerTxt.width, acerTxt.y + acerTxt.height / 2 - gemIcon.height / 2);
        }
        this.addChild(acerTxt);
        this._acerTxt = acerTxt;
        if (this.checkIsBigMonthYearCard()) {
            //添加月卡 年卡充值档次说明  暂时不用描述
            var desctxt = LanguageManager.getlocal(this._data.sortId == 9 ? 'monthcarddesc' : 'yearcarddesc'); //元宝
            this._acerTxt.text = String("" + acerTxt.text + desctxt);
            this._acerTxt.textAlign = egret.HorizontalAlign.LEFT;
        }
        else {
            //4倍图感恩回馈
            var str = null;
            var boo = Config.FirstchargeCfg.getneedRecharge(data.id);
            if (isNewRecharge && isHasFirstRecharge == false && Api.shopVoApi.getfourRateCharge() == true && boo) {
                // console.log("XXXX");
                var recharge4 = BaseBitmap.create("recharge4");
                recharge4.x = functionBg.x;
                recharge4.y = functionBg.y;
                this.addChild(recharge4);
                this._recharge4 = recharge4;
                this._multiple = 4;
                this.isnewThanksgiving = true;
            }
            else if (isNewRecharge && isHasFirstRecharge && boo) {
                this.isnewThanksgiving = false;
                var recharge4 = BaseBitmap.create("recharge4");
                recharge4.x = functionBg.x;
                recharge4.y = functionBg.y;
                this.addChild(recharge4);
                this._recharge4 = recharge4;
                this._multiple = 4;
            }
            else if (!Api.shopVoApi.getPayInfoById(data.id)) {
                var recharge2 = BaseBitmap.create("recharge2big");
                recharge2.x = functionBg.x;
                recharge2.y = functionBg.y;
                this.addChild(recharge2);
                this._recharge2 = recharge2;
                this._multiple = 2;
            }
            else {
                if (data.secondGet) {
                    this._multiple = data.secondGet;
                }
                else {
                    this._multiple = 0;
                }
            }
            //4倍附送元宝
            if (isNewRecharge && isHasFirstRecharge == false && Api.shopVoApi.getfourRateCharge() == true && boo) {
                this.showFourTxt();
            }
            else if (isNewRecharge && isHasFirstRecharge && boo) {
                this.showFourTxt();
            }
            else if (!Api.shopVoApi.getPayInfoById(data.id)) {
                this._twoContainer = new BaseDisplayObjectContainer();
                this.addChild(this._twoContainer);
                // let rechargegivedesStr =LanguageManager.getlocal("rechargegivedes");
                // //送文字
                // let giveImg2:BaseBitmapText = ComponentManager.getBitmapText(rechargegivedesStr,"recharge2_fnt");
                var giveImg2 = BaseBitmap.create("rechargevie_give");
                giveImg2.x = acerTxt.x + acerTxt.width + 5;
                giveImg2.y = acerTxt.y - 10;
                this._twoContainer.addChild(giveImg2);
                if (PlatformManager.checkIsPtLang()) {
                    giveImg2.x = acerTxt.x + acerTxt.width + giveImg2.width + 15;
                }
                var acertxt = LanguageManager.getlocal("rechargeAcerdes"); //元宝
                var giveTxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
                giveTxt2.text = String(data.firstGet + acertxt);
                giveTxt2.x = giveImg2.x + giveImg2.width + 10;
                giveTxt2.y = this._acerImg.y + 60;
                this._twoContainer.addChild(giveTxt2);
                if (PlatformManager.checkIsPtLang()) {
                    giveTxt2.text = String(data.gemCost);
                    var gemIcon = BaseBitmap.create('public_icon1');
                    this.addChild(gemIcon);
                    gemIcon.setPosition(giveTxt2.x + giveTxt2.width, giveTxt2.y + giveTxt2.height / 2 - gemIcon.height / 2);
                }
            }
            else if (data.secondGet) {
                this.showGT();
            }
        }
        var collectBtn = ComponentManager.getButton("btn_small_orange", "" + "", this.eventCollectHandler, this);
        collectBtn.x = functionBg.width - collectBtn.width - 10;
        if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsRuLang()) {
            collectBtn.y = functionBg.y + collectBtn.height * 0.5;
        }
        else {
            collectBtn.y = functionBg.y + collectBtn.height * 0.5 + 10;
        }
        var elementStr = LanguageManager.getlocal("elementStr");
        if ((PlatformManager.checkIsTWBSp() || PlatformManager.checkIsEnLang() || PlatformManager.checkIsRuSp() || PlatformManager.checkIsEnSp()) && PlatformManager.checkisLocalPrice() == false) {
            var twStr = PlatformManager.getMoneySign();
            collectBtn.setText(twStr + data.cost, false);
        }
        else if (PlatformManager.checkIsKRSp()) {
            var twStr = PlatformManager.getMoneySign();
            if (App.DeviceUtil.isAndroid()) {
                collectBtn.setText(data.cost + elementStr, false);
            }
            else {
                collectBtn.setText(twStr + data.cost, false);
            }
        }
        else {
            if (PlatformManager.checkisLocalPrice() && data.platFullPrice) {
                collectBtn.setText(data.platFullPrice, false);
            }
            else {
                collectBtn.setText(data.cost + elementStr, false);
            }
        }
        this.addChild(collectBtn);
        this.collectBtn = collectBtn;
        if (this.checkIsBigMonthYearCard()) {
            var isBuyMonthCard = Api.shopVoApi.ifBuyMonthCard();
            var isBuyYearCard = Api.shopVoApi.ifBuyYearCard();
            if ((isBuyMonthCard && this._data.sortId == 9) || (isBuyYearCard && this._data.sortId == 10)) {
                this.hideBuyBtn();
            }
        }
        if (data.showEffId && data.id == data.showEffId) {
            var light = BaseBitmap.create("public_9_bg63");
            light.width = 640;
            light.height = 145;
            light.setPosition(-12, -12);
            this.addChild(light);
            egret.Tween.get(light, { loop: true }).to({ alpha: 0 }, 500).to({ alpha: 1 }, 500);
            this._light = light;
        }
    };
    RechargeVipViewScrollltem.prototype.hideBuyBtn = function () {
        if (this.collectBtn.visible) {
            this.collectBtn.visible = false;
            var hasGetSp = BaseBitmap.create("welfare_hasbuy");
            hasGetSp.x = this.collectBtn.x + this.collectBtn.width / 2 - hasGetSp.width / 2;
            hasGetSp.y = this.collectBtn.y + this.collectBtn.height / 2 - hasGetSp.height / 2;
            this.addChild(hasGetSp);
        }
    };
    RechargeVipViewScrollltem.prototype.receivePushData = function (event) {
        var data = event.data;
        if (data.data.cmd == NetPushConst.PUSH_PAY) {
            if (this._data.id != this._currId && !this._recharge4) {
                return;
            }
            if (this.checkIsBigMonthYearCard()) {
                var isBuyMonthCard = Api.shopVoApi.ifBuyMonthCard();
                var isBuyYearCard = Api.shopVoApi.ifBuyYearCard();
                if ((isBuyMonthCard && this._data.sortId == 9) || (isBuyYearCard && this._data.sortId == 10)) {
                    this.hideBuyBtn();
                }
            }
            var isHasFirstRecharge = Api.rechargeVoApi.checkFirstRecharge();
            var isNewRecharge = Api.switchVoApi.checknewRecharge();
            if (this.isnewThanksgiving == true) {
                //感恩已经充值过
                if (isNewRecharge && Api.shopVoApi.getfourRateCharge() == false) {
                    this.updata4();
                    this.updata2();
                    this.updata1();
                }
                else {
                    this.updata1();
                    return;
                }
                return;
            }
            if (isHasFirstRecharge == false) {
                this.updata4();
                this.updata2();
            }
            if (data.data.data.payment) {
                this.updata1();
            }
        }
    };
    RechargeVipViewScrollltem.prototype.updata4 = function () {
        if (this._recharge4) {
            this._recharge4.visible = false;
            if (this._fourContainer) {
                this._fourContainer.visible = false;
                this._multiple = 0;
            }
            else if (this._data.secondGet) {
                this.showGT();
                this._multiple = this._data.secondGet;
            }
        }
    };
    RechargeVipViewScrollltem.prototype.updata1 = function () {
        if ((Api.shopVoApi.getPayInfoById(this._data.id))) {
            if (this._recharge2) {
                this._recharge2.visible = false;
                if (this._data.secondGet) {
                    this.showGT();
                    this._multiple = this._data.secondGet;
                }
                else {
                    this._multiple = 0;
                }
                if (this._twoContainer) {
                    this._twoContainer.visible = false;
                }
                if (this._two2Container) {
                    this._two2Container.visible = false;
                }
            }
        }
    };
    RechargeVipViewScrollltem.prototype.updata2 = function () {
        if (!(Api.shopVoApi.getPayInfoById(this._data.id))) {
            if (!this._recharge2) {
                var _functionBg = this._functionBg;
                var recharge2 = BaseBitmap.create("recharge2big");
                recharge2.x = _functionBg.x;
                recharge2.y = _functionBg.y;
                this.addChild(recharge2);
                this._recharge2 = recharge2;
                this._two2Container = new BaseDisplayObjectContainer();
                this.addChild(this._two2Container);
                var acerTxt = this._acerTxt;
                //送 
                var giveImg = BaseBitmap.create("rechargevie_give");
                giveImg.x = acerTxt.x + acerTxt.width + 5;
                giveImg.y = acerTxt.y - 10;
                this._two2Container.addChild(giveImg);
                if (PlatformManager.checkIsPtLang()) {
                    giveImg.x = acerTxt.x + acerTxt.width + giveImg.width + 15;
                }
                var acertxt = LanguageManager.getlocal("rechargeAcerdes"); //元宝
                var giveTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
                giveTxt.text = String(this._data.firstGet + acertxt);
                giveTxt.x = giveImg.x + giveImg.width + 10;
                giveTxt.y = this._acerTxt.y;
                this._two2Container.addChild(giveTxt);
                this._multiple = 2;
                if (PlatformManager.checkIsPtLang()) {
                    giveTxt.text = String(this._data.firstGet);
                    var gemIcon = BaseBitmap.create('public_icon1');
                    this.addChild(gemIcon);
                    gemIcon.setPosition(giveTxt.x + giveTxt.width, giveTxt.y + giveTxt.height / 2 - gemIcon.height / 2);
                }
            }
            else {
                this._multiple = 2;
            }
        }
    };
    RechargeVipViewScrollltem.prototype.showGT = function () {
        if (!this._data.secondGet) {
            return;
        }
        if (this._gtContainer) {
            this.removeChild(this._gtContainer);
        }
        this._gtContainer = null;
        if (this._gtContainer == null) {
            this._gtContainer = new BaseDisplayObjectContainer();
            this.addChild(this._gtContainer);
        }
        var giveImg2 = BaseBitmap.create("rechargevie_give");
        giveImg2.x = this._acerTxt.x + this._acerTxt.width + 5;
        giveImg2.y = this._acerTxt.y - 10;
        this._gtContainer.addChild(giveImg2);
        if (PlatformManager.checkIsPtLang()) {
            giveImg2.x = this._acerTxt.x + this._acerTxt.width + giveImg2.width + 15;
        }
        var acertxt = LanguageManager.getlocal("rechargeAcerdes"); //元宝
        var giveTxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        giveTxt2.text = String(this._data.secondGet + acertxt);
        giveTxt2.x = giveImg2.x + giveImg2.width + 10;
        giveTxt2.y = this._acerImg.y + 60;
        this._gtContainer.addChild(giveTxt2);
        if (PlatformManager.checkIsPtLang()) {
            giveTxt2.text = String(this._data.secondGet);
            var gemIcon = BaseBitmap.create('public_icon1');
            this.addChild(gemIcon);
            gemIcon.setPosition(giveTxt2.x + giveTxt2.width, giveTxt2.y + giveTxt2.height / 2 - gemIcon.height / 2);
        }
    };
    RechargeVipViewScrollltem.prototype.showFourTxt = function () {
        this._fourContainer = null;
        if (this._fourContainer == null) {
            this._fourContainer = new BaseDisplayObjectContainer();
            this.addChild(this._fourContainer);
        }
        var acertxt = LanguageManager.getlocal("rechargeAcerdes"); //元宝  
        this._fourStr = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_RED);
        this._fourStr.text = LanguageManager.getlocal("rechargef");
        this._fourStr.x = this._acerImg.x + this._acerImg.width + 10; //60;
        this._fourStr.y = this._functionBg.y + 20;
        this._fourContainer.addChild(this._fourStr);
        var giveImg = BaseBitmap.create("rechargevie_give");
        giveImg.x = this._acerTxt.x + this._acerTxt.width + 5;
        giveImg.y = this._acerTxt.y - 10;
        this._fourContainer.addChild(giveImg);
        if (PlatformManager.checkIsPtLang()) {
            giveImg.x = this._acerTxt.x + this._acerTxt.width + giveImg.width + 15;
        }
        var extraClient = 3; // Config.FirstchargeCfg.getextra();
        var giveTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        giveTxt.text = String(this._data.gemCost * extraClient + acertxt);
        giveTxt.x = giveImg.x + giveImg.width + 10;
        giveTxt.y = this._acerImg.y + 60;
        this._fourContainer.addChild(giveTxt);
        if (PlatformManager.checkIsPtLang()) {
            giveTxt.text = String(this._data.gemCost * extraClient);
            var gemIcon = BaseBitmap.create('public_icon1');
            this.addChild(gemIcon);
            gemIcon.setPosition(giveTxt.x + giveTxt.width, giveTxt.y + giveTxt.height / 2 - gemIcon.height / 2);
        }
    };
    RechargeVipViewScrollltem.prototype.eventCollectHandler = function (event) {
        if (GameData.idcardSwitch == true && GameData.idcardNormal == 1 && Api.gameinfoVoApi.getRealnameRewards() == null) {
            ViewController.getInstance().openView(ViewConst.POPUP.REALNAMEREWARDSPOPUPVIEW);
            return;
        }
        this._currId = this._data.id;
        RechargeVipViewScrollltem.MULTIPLE = this._multiple;
        PlatformManager.pay(this._data.id);
    };
    RechargeVipViewScrollltem.prototype.checkIsBigMonthYearCard = function () {
        var data = this._data;
        return PlatformManager.checkIsShenHeYiWan() && (data.sortId == 9 || data.sortId == 10);
    };
    RechargeVipViewScrollltem.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY, this.receivePushData, this);
        if (this._light) {
            egret.Tween.removeTweens(this._light);
            this.removeChild(this._light);
            this._light = null;
        }
        this._fourContainer = null;
        this._twoContainer = null;
        this._two2Container = null;
        this._data = null;
        this._recharge2 = null;
        this._recharge4 = null;
        this._iconBg = null;
        this._functionBg = null;
        this._multiple = 0;
        RechargeVipViewScrollltem.MULTIPLE = 0;
        this._fourStr = null;
        this._msgTF = null;
        this._acerTxt = null;
        this._acerImg = null;
        this._currId = 0;
        this._gtContainer = null;
        this.isnewThanksgiving = false;
        this.collectBtn = null;
        _super.prototype.dispose.call(this);
    };
    RechargeVipViewScrollltem.MULTIPLE = 0;
    return RechargeVipViewScrollltem;
}(ScrollListItem));
__reflect(RechargeVipViewScrollltem.prototype, "RechargeVipViewScrollltem");
//# sourceMappingURL=RechargeVipViewScrollltem.js.map