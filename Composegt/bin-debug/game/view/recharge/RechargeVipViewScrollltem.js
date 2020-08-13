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
    // private _a :boolean=true;
    function RechargeVipViewScrollltem() {
        var _this = _super.call(this) || this;
        _this.collectBtn = null;
        _this._data = null;
        _this._recharge2 = null;
        _this._recharge4 = null;
        _this._recharge6 = null;
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
        _this._jpacerTxt = null;
        if (!Api.switchVoApi.checkOpenSecondCharge()) {
            App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY, _this.receivePushData, _this);
        }
        return _this;
    }
    RechargeVipViewScrollltem.prototype.initItem = function (index, data, isbuy) {
        this._data = data;
        var functionBg = null;
        functionBg = BaseBitmap.create("rechargevie_itembg");
        // functionBg.width = 600;
        // functionBg.height = 145; 
        // functionBg.x = 10;
        this.addChild(functionBg);
        this.width = functionBg.width;
        this.height = functionBg.height + 5;
        // let leftBg = BaseBitmap.create("public_left");
        // leftBg.width = 139;
        // leftBg.height = 130;
        // leftBg.x =  15;
        // leftBg.y =  functionBg.y + functionBg.height/2 -functionBg.height/2+1; 
        // this.addChild(leftBg);
        this._functionBg = functionBg;
        var iconBg = null;
        if (this.checkIsBigMonthYearCard()) {
            var iconid = data.sortId == 9 ? 2 : 6;
            iconBg = BaseLoadBitmap.create("recharge_new_itemicon" + iconid);
        }
        else {
            if (Api.switchVoApi.checkOpenAuditFile() && data.id == "g11") {
                data.sortId = 5;
            }
            iconBg = BaseLoadBitmap.create("recharge_new_itemicon" + data.sortId);
        }
        iconBg.width = 116;
        iconBg.height = 116;
        iconBg.x = 30;
        iconBg.y = this.height / 2 - iconBg.height / 2 - 2.5;
        this.addChild(iconBg);
        this._iconBg = iconBg;
        var elementStr2 = LanguageManager.getlocal("rechargeAcerdes");
        var msgTF = ComponentManager.getBitmapText((data.gemCost ? data.gemCost : data.firstGet) + elementStr2, "recharge2_fnt");
        if (PlatformManager.checkIsJPSp()) {
            elementStr2 = LanguageManager.getlocal("rechargeAcerdes_" + data.id);
            // msgTF = ComponentManager.getTextField(elementStr2,TextFieldConst.FONTSIZE_TITLE_BIG,TextFieldConst.COLOR_BROWN);
            msgTF = ComponentManager.getBitmapText(elementStr2, "recharge2_fnt");
        }
        else {
            msgTF = ComponentManager.getBitmapText((data.gemCost ? data.gemCost : data.firstGet) + elementStr2, "recharge2_fnt");
        }
        msgTF.y = functionBg.y + 15 + 20;
        msgTF.x = functionBg.x + 170;
        this.addChild(msgTF);
        this._acerImg = msgTF;
        var isHasFirstRecharge = Api.rechargeVoApi.checkFirstRecharge();
        var isNewRecharge = Api.switchVoApi.checknewRecharge();
        //送  前面文本
        var acertxt = LanguageManager.getlocal("rechargeAcerdes"); //元宝
        var acerTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
        acerTxt.text = String(data.gemCost + acertxt);
        acerTxt.x = functionBg.x + 170;
        acerTxt.y = functionBg.y + 15 + 60 + 20;
        this.addChild(acerTxt);
        this._acerTxt = acerTxt;
        var isHasSecondRecharge = Api.rechargeVoApi.checkSecondRecharge();
        if (this.checkIsBigMonthYearCard()) {
            //添加月卡 年卡充值档次说明  暂时不用描述
            var desctxt = LanguageManager.getlocal(this._data.sortId == 9 ? 'monthcarddesc' : 'yearcarddesc'); //元宝
            this._acerTxt.text = String("" + acerTxt.text + desctxt);
            this._acerTxt.textAlign = egret.HorizontalAlign.LEFT;
        }
        else {
            if (Api.switchVoApi.checkOpenSecondCharge()) {
                if (isHasFirstRecharge) {
                    //6
                    var boo = Config.FirstchargeCfg.getneedRecharge(data.id);
                    // if(isNewRecharge&&Api.shopVoApi.getfourRateCharge()==true&&boo)
                    if (isNewRecharge && boo) {
                        var recharge6 = null;
                        if (Api.switchVoApi.checkOpenFirstCharge6Times()) {
                            recharge6 = BaseBitmap.create("recharge6");
                            this._multiple = 6;
                        }
                        else {
                            recharge6 = BaseBitmap.create("recharge4");
                            this._multiple = 4;
                        }
                        recharge6.x = functionBg.x + 18;
                        recharge6.y = functionBg.y + 8;
                        this.addChild(recharge6);
                        this._recharge6 = recharge6;
                        this.isnewThanksgiving = true;
                        this.showFourTxtN();
                    }
                    else if (!Api.shopVoApi.getPayInfoById(data.id)) {
                        var recharge2 = BaseBitmap.create("recharge2big");
                        recharge2.x = functionBg.x + 18;
                        recharge2.y = functionBg.y + 8;
                        this.addChild(recharge2);
                        this._recharge2 = recharge2;
                        this._multiple = 2;
                        if (Api.switchVoApi.checkOpenAuditFile() && data.id == "g11") {
                            recharge2.visible = false;
                        }
                        this._twoContainer = new BaseDisplayObjectContainer();
                        this.addChild(this._twoContainer);
                        var giveImg2 = BaseBitmap.create("rechargevie_give");
                        giveImg2.x = acerTxt.x + acerTxt.width + 5;
                        giveImg2.y = acerTxt.y - 10;
                        this._twoContainer.addChild(giveImg2);
                        var acertxt = LanguageManager.getlocal("rechargeAcerdes"); //元宝
                        var giveTxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
                        giveTxt2.text = String(data.firstGet + acertxt);
                        giveTxt2.x = giveImg2.x + giveImg2.width + 10;
                        giveTxt2.y = functionBg.y + 75 + 20;
                        this._twoContainer.addChild(giveTxt2);
                        if (PlatformManager.checkIsJPSp()) {
                            giveImg2.visible = false;
                            giveTxt2.visible = false;
                        }
                        if (Api.switchVoApi.checkOpenAuditFile() && data.id == "g11") {
                            giveImg2.visible = false;
                            giveTxt2.visible = false;
                        }
                    }
                    else {
                        this._multiple = 0;
                    }
                }
                else if (isHasSecondRecharge) {
                    var boo = Config.SecondchargeCfg.getneedRecharge(data.id);
                    if (boo) {
                        var recharge4 = BaseBitmap.create("recharge4");
                        recharge4.x = functionBg.x + 18;
                        recharge4.y = functionBg.y + 8;
                        this.addChild(recharge4);
                        this._recharge4 = recharge4;
                        this._multiple = 4;
                        this.isnewThanksgiving = true;
                        this.showFourTxtN();
                    }
                    else if (!Api.shopVoApi.getPayInfoById(data.id)) {
                        var recharge2 = BaseBitmap.create("recharge2big");
                        recharge2.x = functionBg.x + 18;
                        recharge2.y = functionBg.y + 8;
                        this.addChild(recharge2);
                        this._recharge2 = recharge2;
                        this._multiple = 2;
                        if (Api.switchVoApi.checkOpenAuditFile() && data.id == "g11") {
                            recharge2.visible = false;
                        }
                        // this.showFourTxtN();
                        this._twoContainer = new BaseDisplayObjectContainer();
                        this.addChild(this._twoContainer);
                        var giveImg2 = BaseBitmap.create("rechargevie_give");
                        giveImg2.x = acerTxt.x + acerTxt.width + 5;
                        giveImg2.y = acerTxt.y - 10;
                        this._twoContainer.addChild(giveImg2);
                        var acertxt = LanguageManager.getlocal("rechargeAcerdes"); //元宝
                        var giveTxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
                        giveTxt2.text = String(data.firstGet + acertxt);
                        giveTxt2.x = giveImg2.x + giveImg2.width + 10;
                        giveTxt2.y = functionBg.y + 75 + 20;
                        this._twoContainer.addChild(giveTxt2);
                        if (PlatformManager.checkIsJPSp()) {
                            giveImg2.visible = false;
                            giveTxt2.visible = false;
                        }
                        if (Api.switchVoApi.checkOpenAuditFile() && data.id == "g11") {
                            giveImg2.visible = false;
                            giveTxt2.visible = false;
                        }
                    }
                    else {
                        this._multiple = 0;
                    }
                }
                else {
                    if (!Api.shopVoApi.getPayInfoById(data.id)) {
                        var recharge2 = BaseBitmap.create("recharge2big");
                        recharge2.x = functionBg.x + 18;
                        recharge2.y = functionBg.y + 8;
                        this.addChild(recharge2);
                        this._recharge2 = recharge2;
                        this._multiple = 2;
                        if (Api.switchVoApi.checkOpenAuditFile() && data.id == "g11") {
                            recharge2.visible = false;
                        }
                        // this.showFourTxtN();
                        this._twoContainer = new BaseDisplayObjectContainer();
                        this.addChild(this._twoContainer);
                        var giveImg2 = BaseBitmap.create("rechargevie_give");
                        giveImg2.x = acerTxt.x + acerTxt.width + 5;
                        giveImg2.y = acerTxt.y - 10;
                        this._twoContainer.addChild(giveImg2);
                        var acertxt = LanguageManager.getlocal("rechargeAcerdes"); //元宝
                        var giveTxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
                        giveTxt2.text = String(data.firstGet + acertxt);
                        giveTxt2.x = giveImg2.x + giveImg2.width + 10;
                        giveTxt2.y = functionBg.y + 75 + 20;
                        this._twoContainer.addChild(giveTxt2);
                        if (PlatformManager.checkIsJPSp()) {
                            giveImg2.visible = false;
                            giveTxt2.visible = false;
                        }
                        if (Api.switchVoApi.checkOpenAuditFile() && data.id == "g11") {
                            giveImg2.visible = false;
                            giveTxt2.visible = false;
                        }
                    }
                    else {
                        this._multiple = 0;
                    }
                }
            }
            else {
                //4倍图感恩回馈
                var str = null;
                var boo = Config.FirstchargeCfg.getneedRecharge(data.id);
                // if(isNewRecharge&&isHasFirstRecharge==false&&Api.shopVoApi.getfourRateCharge()==true&&boo)
                // if(isNewRecharge&&isHasFirstRecharge==false&&boo)
                // {
                // 	let recharge4= null;
                // 	// if(PlatformManager.checkIsKRNewSp()){
                // 	if(Api.switchVoApi.checkOpenFirstCharge6Times()){
                // 		recharge4 = BaseBitmap.create("recharge6");
                // 		this._multiple = 6; 
                // 	} else {
                // 		recharge4 = BaseBitmap.create("recharge4");
                // 		this._multiple = 4; 
                // 	}
                // 	recharge4.x = functionBg.x;
                // 	recharge4.y = functionBg.y; 
                // 	this.addChild(recharge4);
                // 	this._recharge4 = recharge4; 
                // 	this.isnewThanksgiving = true;
                // }
                // //	原来逻辑 4倍正常
                // else 
                if (isNewRecharge && isHasFirstRecharge && boo) {
                    this.isnewThanksgiving = false;
                    // let recharge4= BaseBitmap.create("recharge4");
                    var recharge4 = null;
                    if (Api.switchVoApi.checkOpenFirstCharge6Times()) {
                        recharge4 = BaseBitmap.create("recharge6");
                        this._multiple = 6;
                    }
                    else {
                        recharge4 = BaseBitmap.create("recharge4");
                        this._multiple = 4;
                    }
                    recharge4.x = functionBg.x + 18;
                    recharge4.y = functionBg.y + 8;
                    this.addChild(recharge4);
                    this._recharge4 = recharge4;
                }
                else if (!Api.shopVoApi.getPayInfoById(data.id)) {
                    var recharge2 = BaseBitmap.create("recharge2big");
                    recharge2.x = functionBg.x + 18;
                    recharge2.y = functionBg.y + 8;
                    this.addChild(recharge2);
                    this._recharge2 = recharge2;
                    this._multiple = 2;
                    if (Api.switchVoApi.checkOpenAuditFile() && data.id == "g11") {
                        recharge2.visible = false;
                    }
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
                // if(isNewRecharge&&isHasFirstRecharge==false&&Api.shopVoApi.getfourRateCharge()==true&&boo)
                // if(isNewRecharge&&isHasFirstRecharge==false&&boo)
                // {
                // 	this.showFourTxt();
                // }
                // else 
                if (isNewRecharge && isHasFirstRecharge && boo) {
                    this.showFourTxt();
                }
                else if (!Api.shopVoApi.getPayInfoById(data.id)) {
                    this._twoContainer = new BaseDisplayObjectContainer();
                    this.addChild(this._twoContainer);
                    var giveImg2 = BaseBitmap.create("rechargevie_give");
                    giveImg2.x = acerTxt.x + acerTxt.width + 5;
                    giveImg2.y = acerTxt.y - 10;
                    this._twoContainer.addChild(giveImg2);
                    var acertxt = LanguageManager.getlocal("rechargeAcerdes"); //元宝
                    var giveTxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
                    giveTxt2.text = String(data.firstGet + acertxt);
                    giveTxt2.x = giveImg2.x + giveImg2.width + 10;
                    giveTxt2.y = functionBg.y + 75 + 20;
                    this._twoContainer.addChild(giveTxt2);
                    if (PlatformManager.checkIsJPSp()) {
                        giveImg2.visible = false;
                        giveTxt2.visible = false;
                    }
                    if (Api.switchVoApi.checkOpenAuditFile() && data.id == "g11") {
                        giveImg2.visible = false;
                        giveTxt2.visible = false;
                    }
                }
                else if (data.secondGet) {
                    this.showGT();
                }
            }
        }
        var collectBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "" + "", this.eventCollectHandler, this);
        collectBtn.x = functionBg.width - collectBtn.width - 25;
        collectBtn.y = functionBg.y + collectBtn.height * 0.5 + 30;
        var elementStr = LanguageManager.getlocal("elementStr");
        if (PlatformManager.checkIsTWBSp()) {
            var twStr = PlatformManager.getMoneySign();
            collectBtn.setText(twStr + data.cost, false);
        }
        else if (PlatformManager.checkIsKRSp()) {
            var twStr = PlatformManager.getMoneySign();
            // if(App.DeviceUtil.isAndroid()){
            collectBtn.setText(data.cost + elementStr, false);
            // }else{
            // 	collectBtn.setText(twStr+data.cost,false); 
            // }	
        }
        else {
            collectBtn.setText(data.cost + elementStr, false);
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
        if (Api.switchVoApi.checkOpenAuditFile() && this._data.id == "g11" && RechargeVipViewScrollltem.ISBUY == true) {
            this.hideBuyBtn();
        }
    };
    RechargeVipViewScrollltem.prototype.hideBuyBtn = function () {
        if (this.collectBtn.visible) {
            this.collectBtn.visible = false;
            var hasGetSp = BaseBitmap.create("public_buy");
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
                // if(isNewRecharge&&Api.shopVoApi.getfourRateCharge()==false)
                if (isNewRecharge) {
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
                recharge2.x = _functionBg.x + 18;
                recharge2.y = _functionBg.y + 8;
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
                var acertxt = LanguageManager.getlocal("rechargeAcerdes"); //元宝
                var giveTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
                giveTxt.text = String(this._data.firstGet + acertxt);
                giveTxt.x = giveImg.x + giveImg.width + 10;
                giveTxt.y = this._acerTxt.y + 20;
                this._two2Container.addChild(giveTxt);
                if (PlatformManager.checkIsJPSp()) {
                    giveImg.visible = false;
                    giveTxt.visible = false;
                }
                this._multiple = 2;
                //日文特殊版本下98 审核下
                if (Api.switchVoApi.checkOpenAuditFile() && this._data.id == "98") {
                    recharge2.visible = false;
                    giveImg.visible = false;
                    giveTxt.visible = false;
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
        var acertxt = LanguageManager.getlocal("rechargeAcerdes"); //元宝
        var giveTxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
        giveTxt2.text = String(this._data.secondGet + acertxt);
        giveTxt2.x = giveImg2.x + giveImg2.width + 10;
        giveTxt2.y = this._acerImg.y + 60 + 20;
        this._gtContainer.addChild(giveTxt2);
    };
    RechargeVipViewScrollltem.prototype.showSixTxtN = function () {
        this._fourContainer = null;
        if (this._fourContainer == null) {
            this._fourContainer = new BaseDisplayObjectContainer();
            this.addChild(this._fourContainer);
        }
        var acertxt = LanguageManager.getlocal("rechargeAcerdes"); //元宝  
        this._fourStr = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_RED_NEW);
        this._fourStr.text = LanguageManager.getlocal("rechargef");
        this._fourContainer.addChild(this._fourStr);
        //日文特殊版本下（1980 元宝）
        var extraClient = 3;
        // if(PlatformManager.checkIsJPSp())
        // {
        // 	this._fourStr.x = this._jpacerTxt.x+this._jpacerTxt.width+20; 
        // 	this._fourStr.y = this._functionBg.y+15; 
        // 	let giveTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
        // 	giveTxt.y =85;
        // 	giveTxt.x =180;
        // 	giveTxt.text  = LanguageManager.getlocal("rechvipjp1Des3",[this._data.gemCost*extraClient+acertxt]);
        // 	this._fourContainer.addChild(giveTxt);
        // }
        // else
        // {
        this._fourStr.x = this._acerImg.x + this._acerImg.width + 10;
        this._fourStr.y = this._functionBg.y + 20 + 20;
        var giveImg = BaseBitmap.create("rechargevie_give");
        giveImg.x = this._acerTxt.x + this._acerTxt.width + 5;
        giveImg.y = this._acerTxt.y - 10;
        this._fourContainer.addChild(giveImg);
        var giveTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
        giveTxt.text = String(this._data.gemCost * extraClient + acertxt);
        giveTxt.x = giveImg.x + giveImg.width + 10;
        giveTxt.y = 75 + 20;
        this._fourContainer.addChild(giveTxt);
        if (PlatformManager.checkIsJPSp()) {
            giveImg.visible = false;
            giveTxt.visible = false;
        }
    };
    RechargeVipViewScrollltem.prototype.showFourTxtN = function () {
        this._fourContainer = null;
        if (this._fourContainer == null) {
            this._fourContainer = new BaseDisplayObjectContainer();
            this.addChild(this._fourContainer);
        }
        var acertxt = LanguageManager.getlocal("rechargeAcerdes"); //元宝  
        this._fourStr = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_RED_NEW);
        this._fourStr.text = LanguageManager.getlocal("rechargef");
        this._fourContainer.addChild(this._fourStr);
        //日文特殊版本下（1980 元宝）
        var extraClient = 5;
        if (!Api.rechargeVoApi.checkFirstRecharge() && Api.rechargeVoApi.checkSecondRecharge()) {
            extraClient = 3;
        }
        this._fourStr.x = this._acerImg.x + this._acerImg.width + 10;
        this._fourStr.y = this._functionBg.y + 20 + 20;
        var giveImg = BaseBitmap.create("rechargevie_give");
        giveImg.x = this._acerTxt.x + this._acerTxt.width + 5;
        giveImg.y = this._acerTxt.y - 10;
        this._fourContainer.addChild(giveImg);
        var giveTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
        giveTxt.text = String(this._data.gemCost * extraClient + acertxt);
        giveTxt.x = giveImg.x + giveImg.width + 10;
        giveTxt.y = 75 + 20;
        this._fourContainer.addChild(giveTxt);
        if (PlatformManager.checkIsJPSp()) {
            giveImg.visible = false;
            giveTxt.visible = false;
        }
    };
    RechargeVipViewScrollltem.prototype.showFourTxt = function () {
        this._fourContainer = null;
        if (this._fourContainer == null) {
            this._fourContainer = new BaseDisplayObjectContainer();
            this.addChild(this._fourContainer);
        }
        var acertxt = LanguageManager.getlocal("rechargeAcerdes"); //元宝  
        this._fourStr = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_RED_NEW); //TextFieldConst.COLOR_QUALITY_RED
        this._fourStr.text = LanguageManager.getlocal("rechargef");
        this._fourContainer.addChild(this._fourStr);
        //日文特殊版本下（1980 元宝）
        var extraClient = 3;
        if (Api.switchVoApi.checkOpenFirstCharge6Times()) {
            extraClient = 5;
        }
        // if(PlatformManager.checkIsJPSp())
        // {
        // 	this._fourStr.x = this._jpacerTxt.x+this._jpacerTxt.width+20; 
        // 	this._fourStr.y = this._functionBg.y+15; 
        // 	let giveTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
        // 	giveTxt.y =85;
        // 	giveTxt.x =180;
        // 	giveTxt.text  = LanguageManager.getlocal("rechvipjp1Des3",[this._data.gemCost*extraClient+acertxt]);
        // 	this._fourContainer.addChild(giveTxt);
        // }
        // else
        // {
        this._fourStr.x = this._acerImg.x + this._acerImg.width + 10;
        this._fourStr.y = this._functionBg.y + 20;
        var giveImg = BaseBitmap.create("rechargevie_give");
        giveImg.x = this._acerTxt.x + this._acerTxt.width + 5;
        giveImg.y = this._acerTxt.y - 10;
        this._fourContainer.addChild(giveImg);
        var giveTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
        giveTxt.text = String(this._data.gemCost * extraClient + acertxt);
        giveTxt.x = giveImg.x + giveImg.width + 10;
        giveTxt.y = 75 + 20;
        this._fourContainer.addChild(giveTxt);
        if (PlatformManager.checkIsJPSp()) {
            giveImg.visible = false;
            giveTxt.visible = false;
        }
        // }
    };
    RechargeVipViewScrollltem.prototype.eventCollectHandler = function (event) {
        this._currId = this._data.id;
        RechargeVipViewScrollltem.MULTIPLE = this._multiple;
        PlatformManager.pay(this._data.id);
    };
    RechargeVipViewScrollltem.prototype.checkIsBigMonthYearCard = function () {
        var data = this._data;
        return PlatformManager.checkIs37WdShenheSp() && (data.sortId == 9 || data.sortId == 10);
    };
    RechargeVipViewScrollltem.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY, this.receivePushData, this);
        this._fourContainer = null;
        this._twoContainer = null;
        this._two2Container = null;
        this._data = null;
        this._recharge2 = null;
        this._recharge4 = null;
        this._recharge6 = null;
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
    RechargeVipViewScrollltem.ISBUY = false;
    return RechargeVipViewScrollltem;
}(ScrollListItem));
__reflect(RechargeVipViewScrollltem.prototype, "RechargeVipViewScrollltem");
