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
var WelfareViewMonthCard = (function (_super) {
    __extends(WelfareViewMonthCard, _super);
    function WelfareViewMonthCard() {
        var _this = _super.call(this) || this;
        _this._scrollContiner = undefined;
        _this._offsetY = 0;
        _this._downBottom = null;
        _this._newPriceText = null;
        _this._circular = null;
        _this._btnLine = null;
        _this._acTimeTF = null;
        _this._wxStr = "";
        _this._originalPriceText = null;
        return _this;
    }
    WelfareViewMonthCard.prototype.init = function () {
        _super.prototype.init.call(this);
        this.initNewUi();
    };
    WelfareViewMonthCard.prototype.initNewUi = function () {
        this._scrollContiner = new BaseDisplayObjectContainer();
        this._scrollContiner.y = this.bottomBg.y;
        this._scrollContiner.x = 0;
        this.addChild(this._scrollContiner);
        var uiBg = BaseBitmap.create("monthcard_newbg");
        uiBg.x = 0;
        uiBg.y = 0;
        this._scrollContiner.addChild(uiBg);
        var topBanner = BaseBitmap.create("monthcard_top_banner");
        topBanner.x = 0;
        topBanner.y = 0;
        this._scrollContiner.addChild(topBanner);
        var descTextBg = BaseBitmap.create("public_itemtipbg2");
        this._scrollContiner.addChild(descTextBg);
        var monthcard_descText = ComponentManager.getTextField(LanguageManager.getlocal("monthcard_desc_top"), TextFieldConst.FONTSIZE_BUTTON_COMMON);
        monthcard_descText.x = topBanner.x + topBanner.width - monthcard_descText.width - 3;
        monthcard_descText.y = topBanner.y + topBanner.height - monthcard_descText.height - 3;
        this._scrollContiner.addChild(monthcard_descText);
        descTextBg.width = monthcard_descText.width + 8;
        descTextBg.height = monthcard_descText.height + 8;
        descTextBg.x = monthcard_descText.x + monthcard_descText.width / 2 - descTextBg.width / 2;
        descTextBg.y = monthcard_descText.y + monthcard_descText.height / 2 - descTextBg.height / 2;
        for (var i = 1; i <= 3; i++) {
            this.creatCellByIndex(i);
        }
        var bottomBg = BaseBitmap.create("monthcard_down_bg");
        bottomBg.x = 0;
        bottomBg.y = this.bottomBg.height - bottomBg.height;
        this._scrollContiner.addChild(bottomBg);
        this._offsetY = bottomBg.y;
        var isBuy = Api.shopVoApi.ifBuyMonthCard();
        if (isBuy == true) {
            var hasGetSp = BaseBitmap.create("public_buy");
            hasGetSp.x = this.bottomBg.width / 2 - hasGetSp.width / 2;
            hasGetSp.y = bottomBg.y + 55;
            this._scrollContiner.addChild(hasGetSp);
            this.showText();
        }
        else {
            var rechargeItemCfg = Config.RechargeCfg.getRechargeItemCfgByKey("g7");
            if (rechargeItemCfg) {
                App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT, this.useCallback, this);
                var goToRechargeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "anyMoney", this.goToRechargeHandler, this);
                goToRechargeBtn.x = bottomBg.x + bottomBg.width / 2 - goToRechargeBtn.width / 2;
                goToRechargeBtn.y = bottomBg.y + 55;
                this._scrollContiner.addChild(goToRechargeBtn);
                var rechargeItemCurrentCfg = Config.RechargeCfg.getRechargeItemCfgByKey("g35");
                this._goToRechargeBtn = goToRechargeBtn;
                var vo = Api.acVoApi.checkIsMonthCardDiscount();
                //月卡打折
                if (vo && rechargeItemCurrentCfg) {
                    var str = LanguageManager.getlocal("anyMoney", [rechargeItemCurrentCfg.cost.toString()]);
                    goToRechargeBtn.setText(str, false);
                    var endTime = vo.et;
                    var timeStr = App.DateUtil.getFormatBySecond(endTime - GameData.serverTime, 1);
                    this._acTimeTF = ComponentManager.getTextField(LanguageManager.getlocal("newYearTime", [timeStr]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_RED2);
                    this._scrollContiner.addChild(this._acTimeTF);
                    this._acTimeTF.x = bottomBg.x + bottomBg.width / 2 - this._acTimeTF.width / 2;
                    this._acTimeTF.y = this._goToRechargeBtn.y - this._acTimeTF.height - 7;
                    this.tick();
                    this._circular = BaseBitmap.create("yearcard_discount");
                    this._circular.x = goToRechargeBtn.x + goToRechargeBtn.width + 10;
                    this._circular.y = this._goToRechargeBtn.y - 20;
                    this._scrollContiner.addChild(this._circular);
                    //原价文字 
                    var originalPriceText = ComponentManager.getTextField(LanguageManager.getlocal("originalPriceTitle"), TextFieldConst.FONTSIZE_BUTTON_COMMON);
                    originalPriceText.x = this._circular.x + this._circular.width / 2 - originalPriceText.width / 2;
                    originalPriceText.y = this._circular.y + 15;
                    this._scrollContiner.addChild(originalPriceText);
                    this._originalPriceText = originalPriceText;
                    //原价价格
                    this._newPriceText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_BUTTON_COMMON);
                    this._newPriceText.text = App.CommonUtil.getMoneyString(rechargeItemCfg.cost), false;
                    this._newPriceText.x = this._circular.x + this._circular.width / 2 - this._newPriceText.width / 2;
                    this._newPriceText.y = this._circular.y + 40;
                    this._newPriceText.bold = true;
                    this._newPriceText.italic = true;
                    this._scrollContiner.addChild(this._newPriceText);
                    //打折斜线
                    this._btnLine = BaseBitmap.create("yearcard_line");
                    this._btnLine.setPosition(this._circular.x - 5, this._circular.y + 30);
                    this._scrollContiner.addChild(this._btnLine);
                }
                else {
                    if (rechargeItemCfg) {
                        var str = App.CommonUtil.getMoneyString(rechargeItemCfg.cost);
                        goToRechargeBtn.setText(str, false);
                    }
                }
            }
        }
        var downBottomDes = ComponentManager.getTextField(LanguageManager.getlocal("newMonthDesc1"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        downBottomDes.x = bottomBg.x + bottomBg.width / 2 - downBottomDes.width / 2;
        downBottomDes.y = bottomBg.y + 135;
        this._scrollContiner.addChild(downBottomDes);
        var downBottomDes2 = ComponentManager.getTextField(LanguageManager.getlocal("newMonthDesc2"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        downBottomDes2.x = bottomBg.x + bottomBg.width / 2 - downBottomDes2.width / 2;
        downBottomDes2.y = downBottomDes.y + downBottomDes.height + 6;
        this._scrollContiner.addChild(downBottomDes2);
        var boxImage = BaseBitmap.create("public_9v_bg03");
        boxImage.width = 490;
        boxImage.height = GameConfig.stageHeigth - 65;
        boxImage.x = 0;
        boxImage.y = 0;
        this.addChild(boxImage);
    };
    WelfareViewMonthCard.prototype.creatCellByIndex = function (indexNum) {
        var x = 0;
        var y = 250;
        var nameStr = "";
        var descStr = "";
        if (PlatformManager.checkIsWxCfg()) {
            this._wxStr = "_wxType";
        }
        else {
            this._wxStr = "";
        }
        var privilege_Img = "privilege_icon" + indexNum;
        if (indexNum == 1) {
            //元宝特权
            var cfg = Config.RechargeCfg.getRechargeItemCfgByKey("g7");
            nameStr = LanguageManager.getlocal("monthCardPrivilege1name");
            descStr = LanguageManager.getlocal("monthCardPrivilege1desc", ["" + (cfg.gemCost), "" + (cfg.dayGet)]);
            if (Api.switchVoApi.checkOpen1524JoinDinner() && Api.switchVoApi.checkOpenMouthCardAddItem1524()) {
                descStr = LanguageManager.getlocal("monthCardPrivilege1desc2", ["" + (cfg.gemCost), "" + (cfg.dayGet)]);
            }
        }
        else if (indexNum == 2) {
            //太学席位
            nameStr = LanguageManager.getlocal("monthCardPrivilege2name");
            descStr = LanguageManager.getlocal("monthCardPrivilege2desc");
            y = 250 + 149;
        }
        else if (indexNum == 3) {
            //特权解锁1
            y = 250 + 298;
            nameStr = LanguageManager.getlocal("monthCardPrivilege3name");
            descStr = LanguageManager.getlocal("monthCardPrivilege3desc" + this._wxStr);
            if (PlatformManager.checkIsWxCfg()) {
                privilege_Img = "privilege_icon4";
            }
        }
        var cell_bg = BaseBitmap.create("monthcard_cell_bg");
        cell_bg.x = x;
        cell_bg.y = y;
        this._scrollContiner.addChild(cell_bg);
        var privilege_icon = BaseBitmap.create(privilege_Img);
        privilege_icon.x = 20;
        privilege_icon.y = cell_bg.y;
        this._scrollContiner.addChild(privilege_icon);
        var cell_namebg = BaseBitmap.create("monthcard_cell_namebg");
        cell_namebg.x = privilege_icon.x + privilege_icon.width / 2 - cell_namebg.width / 2;
        cell_namebg.y = privilege_icon.y + privilege_icon.height - 10;
        this._scrollContiner.addChild(cell_namebg);
        var nameText = ComponentManager.getTextField(nameStr, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        nameText.x = cell_namebg.x + cell_namebg.width / 2 - nameText.width / 2;
        nameText.y = cell_namebg.y + cell_namebg.height / 2 - nameText.height / 2;
        ;
        this._scrollContiner.addChild(nameText);
        var descText = ComponentManager.getTextField(descStr, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        descText.x = cell_bg.x + 205;
        descText.y = cell_bg.y + cell_bg.height / 2 - descText.height / 2;
        descText.lineSpacing = 5;
        this._scrollContiner.addChild(descText);
    };
    WelfareViewMonthCard.prototype.showText = function () {
        //月卡有效期
        var str = App.DateUtil.getFormatBySecond(Api.shopVoApi.getMonthcardet(), 6);
        var cardTimedeTxt = ComponentManager.getTextField(LanguageManager.getlocal("cardTimedes", [str]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        cardTimedeTxt.name = "1";
        this._scrollContiner.addChild(cardTimedeTxt);
        this.setLayoutPosition(LayoutConst.horizontalCenter, cardTimedeTxt, this.bottomBg, [0, 0]);
        cardTimedeTxt.y = this._offsetY + 55 - cardTimedeTxt.height - 7;
    };
    WelfareViewMonthCard.prototype.useCallback = function (event) {
        if (event === void 0) { event = null; }
        var isBuy = Api.shopVoApi.ifBuyMonthCard();
        if (isBuy) {
            this._goToRechargeBtn.visible = false;
            if (this._acTimeTF) {
                this._acTimeTF.setVisible(false);
            }
            if (this._circular) {
                this._circular.setVisible(false);
            }
            if (this._btnLine) {
                this._btnLine.setVisible(false);
            }
            if (this._newPriceText) {
                this._newPriceText.setVisible(false);
            }
            if (this._originalPriceText) {
                this._originalPriceText.visible = false;
            }
            var hasGetSp = BaseBitmap.create("public_buy");
            hasGetSp.x = this._goToRechargeBtn.x + this._goToRechargeBtn.width / 2 - hasGetSp.width / 2;
            hasGetSp.y = this._offsetY + 55;
            this._scrollContiner.addChild(hasGetSp);
            this.showText();
            App.CommonUtil.showTip(LanguageManager.getlocal("sysBuySuccessDesc", [LanguageManager.getlocal("monthCard")]));
            App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT, this.useCallback, this);
        }
    };
    WelfareViewMonthCard.prototype.tick = function () {
        var vo = Api.acVoApi.checkIsMonthCardDiscount();
        if (Api.switchVoApi.checkOpenNewMonthCardAndYearCard() && vo) {
            if (this._acTimeTF) {
                var timeStr = App.DateUtil.getFormatBySecond(vo.et - GameData.serverTime, 1);
                this._acTimeTF.text = LanguageManager.getlocal("newYearTime", [timeStr]);
            }
        }
        else {
            if (this._acTimeTF) {
                this._acTimeTF.setVisible(false);
            }
            if (this._circular) {
                this._circular.setVisible(false);
            }
            if (this._btnLine) {
                this._btnLine.setVisible(false);
            }
            if (this._newPriceText) {
                this._newPriceText.setVisible(false);
            }
        }
    };
    WelfareViewMonthCard.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "monthcard_bigicon",
            "unlock_challenge_skip",
            "unlock_practice",
            "monthcard_bg1",
            "monthcard_desc_1",
            "monthcard_desc_2",
            "monthcard_desc_3",
            "monthcard_desc_4",
            "monthcard_bottom",
            "yearcard_line",
            "yearcard_discount",
            "public_itemtipbg2",
            "monthcard_cell_bg",
            "monthcard_cell_namebg",
            "monthcard_down_bg",
            "monthcard_newbg",
            "monthcard_top_banner",
            "privilege_icon1",
            "privilege_icon2",
            "privilege_icon3",
            "privilege_icon4"
        ]);
    };
    WelfareViewMonthCard.prototype.goToRechargeHandler = function () {
        var vo = Api.acVoApi.checkIsMonthCardDiscount();
        if (Api.switchVoApi.checkOpenNewMonthCardAndYearCard() && vo) {
            PlatformManager.pay("g35");
        }
        else {
            PlatformManager.pay("g7");
        }
    };
    WelfareViewMonthCard.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT, this.useCallback, this);
        this._goToRechargeBtn = null;
        this._scrollContiner = undefined;
        this._offsetY = 0;
        this._downBottom = null;
        this._newPriceText = null;
        this._circular = null;
        this._btnLine = null;
        this._acTimeTF = null;
        this._wxStr = "";
        _super.prototype.dispose.call(this);
    };
    return WelfareViewMonthCard;
}(WelfareViewTab));
__reflect(WelfareViewMonthCard.prototype, "WelfareViewMonthCard");
