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
        _this._descTF = null;
        _this._descTF2 = null;
        _this._offsetY = 0;
        /** 最近一次点击购买钻石的时间（防止连点） */
        _this._lastClickBuyTime = 0;
        _this._welfareWifebit = null;
        _this._cardTimedeTxt = null;
        _this._img7 = null;
        _this._limitTF = null;
        return _this;
    }
    WelfareViewMonthCard.prototype.init = function () {
        App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY, this.receivePushData, this);
        _super.prototype.init.call(this);
        var acMouthBasevo = Api.acVoApi.checkIsMonthDiscount();
        this._offsetY = this.bottomBg.y + 20;
        this._scrollContiner = new BaseDisplayObjectContainer();
        var rect = egret.Rectangle.create();
        if (Api.switchVoApi.checkOpenNewMonthCardAndYearCard()) {
            if (Api.switchVoApi.checkOpenNewMonthCard()) {
                rect.setTo(0, this.bottomBg.y + 20, this.bottomBg.width + 200, GameConfig.stageHeigth - (this.bottomBg.y + 78));
                if (Api.switchVoApi.checkOpenSeat()) {
                    rect.setTo(0, this.bottomBg.y + 20, 492, GameConfig.stageHeigth - (this.bottomBg.y + 78) - 50);
                }
            }
            else {
                rect.setTo(0, this.bottomBg.y + 20, this.bottomBg.width + 20, GameConfig.stageHeigth - (this.bottomBg.y + 78) - 33);
            }
        }
        else {
            rect.setTo(0, this.bottomBg.y + 20, this.bottomBg.width, this.bottomBg.height - 40);
        }
        var scrollView = ComponentManager.getScrollView(this._scrollContiner, rect);
        this.addChild(scrollView);
        scrollView.horizontalScrollPolicy = "off";
        var line1 = BaseBitmap.create("public_line3");
        line1.width = this.bottomBg.width - 100;
        line1.x = this.bottomBg.width / 2 - line1.width / 2;
        line1.y = this.bottomBg.y + 45 - this._offsetY;
        if (!Api.switchVoApi.checkOpenNewMonthCardAndYearCard()) {
            this._scrollContiner.addChild(line1);
        }
        var cardNameTF = ComponentManager.getTextField(LanguageManager.getlocal("monthCard"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        cardNameTF.x = line1.x + line1.width / 2 - cardNameTF.width / 2;
        cardNameTF.y = line1.y + line1.height / 2 - cardNameTF.height / 2;
        if (!Api.switchVoApi.checkOpenNewMonthCardAndYearCard()) {
            this._scrollContiner.addChild(cardNameTF);
        }
        var iconSp = BaseBitmap.create("monthcard_bigicon");
        iconSp.x = this.bottomBg.width / 2 - iconSp.width / 2;
        iconSp.y = this.bottomBg.y + 90 - this._offsetY;
        this._scrollContiner.addChild(iconSp);
        var giveDesSp = null;
        if (Api.switchVoApi.checkOpenNewMonthCardAndYearCard()) {
            var isBuy_1 = Api.shopVoApi.ifBuyMonthCard();
            iconSp.setRes("monthcard_bigicon2");
            iconSp.setPosition(this.bottomBg.width / 2 - iconSp.width / 2, this.bottomBg.y + 100 - this._offsetY);
            if (Api.switchVoApi.checkOpenNewMonthCard()) {
                iconSp.setPosition(this.bottomBg.x - 14, this.bottomBg.y + 78 - iconSp.height / 2 - this._offsetY);
                giveDesSp = BaseBitmap.create("monthcard_givedesc");
                giveDesSp.setPosition(this.bottomBg.x + 14, iconSp.y + iconSp.height + 4);
                this._scrollContiner.addChild(giveDesSp);
                if (isBuy_1) {
                    giveDesSp.y = giveDesSp.y - giveDesSp.height;
                    giveDesSp.visible = false;
                }
                var rewardcfg = Config.RechargeCfg.getRechargeItemCfgByKey("g7").getReward;
                if (acMouthBasevo) {
                    rewardcfg = Config.RechargeCfg.getRechargeItemCfgByKey(acMouthBasevo.config.recharge).getReward;
                }
                if (rewardcfg) {
                    var rewardVo = GameData.formatRewardItem(rewardcfg);
                    var rewardSp = GameData.getItemIcon(rewardVo[0], true, true);
                    rewardSp.setPosition(this.bottomBg.x + this.bottomBg.width - rewardSp.width - 24, giveDesSp.y + giveDesSp.height / 2 - rewardSp.height / 2);
                    this._scrollContiner.addChild(rewardSp);
                    var rechargeItemCfg = Config.RechargeCfg.getRechargeItemCfgByKey("g7");
                    if (acMouthBasevo) {
                        rechargeItemCfg = Config.RechargeCfg.getRechargeItemCfgByKey(acMouthBasevo.config.recharge);
                    }
                    var newSkindId = rechargeItemCfg.getReward.substr(3, 4);
                    if (newSkindId) {
                        if (Api.wifeSkinVoApi.isOwnSkinOfSkinId(newSkindId) == true) {
                            //差个图
                            this._welfareWifebit = BaseBitmap.create("mother_have");
                            this._welfareWifebit.setPosition(rewardSp.x, rewardSp.y + rewardSp.height - this._welfareWifebit.height);
                            this._scrollContiner.addChild(this._welfareWifebit);
                        }
                    }
                    if (isBuy_1) {
                        rewardSp.visible = false;
                        if (this._welfareWifebit) {
                            this._welfareWifebit.visible = false;
                        }
                    }
                }
                else {
                    console.log("缺少奖励配置");
                }
            }
        }
        //描述
        var carddescriptiondeTxt = ComponentManager.getTextField(LanguageManager.getlocal("carddescription"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        carddescriptiondeTxt.x = iconSp.x - 34; //10  315
        carddescriptiondeTxt.y = iconSp.y - 109 + this._offsetY;
        if (!Api.switchVoApi.checkOpenNewMonthCardAndYearCard()) {
            this.addChild(carddescriptiondeTxt);
        }
        if (PlatformManager.checkIsIOSShenheSp() && PlatformManager.checkIsTWBSp()) {
            cardNameTF.visible = false;
            carddescriptiondeTxt.visible = false;
        }
        var descSpStr = "";
        if (App.DeviceUtil.isWXgame()) {
            descSpStr = "monthcard_desc_2";
        }
        else {
            descSpStr = "monthcard_desc";
            if (acMouthBasevo) {
                descSpStr = "welfareviewmonthcard_discount_desc-" + acMouthBasevo.code;
            }
        }
        var descSp = BaseBitmap.create(descSpStr);
        descSp.x = this.bottomBg.width / 2 - descSp.width / 2;
        descSp.y = iconSp.y + iconSp.height + 10;
        this._scrollContiner.addChild(descSp);
        var descSp2 = null;
        if (Api.switchVoApi.checkOpenNewMonthCardAndYearCard()) {
            if (acMouthBasevo) {
                descSp.setRes("welfareviewmonthcard_discount_desc1-" + acMouthBasevo.code);
            }
            else {
                descSp.setRes("monthcard_desc1");
            }
            descSp.setPosition(this.bottomBg.x + 47, iconSp.y + iconSp.height + 20);
            descSp2 = BaseBitmap.create("monthcard_desc2");
            descSp2.setPosition(descSp.x, descSp.y + descSp.height + 14);
            this._scrollContiner.addChild(descSp2);
        }
        var jumpSp = null;
        if (Api.switchVoApi.checkJumpBattle()) {
            descSp.y = iconSp.y + iconSp.height;
            jumpSp = BaseBitmap.create("unlock_challenge_skip");
            jumpSp.x = this.bottomBg.width / 2 - jumpSp.width / 2;
            jumpSp.y = descSp.y + descSp.height;
            this._scrollContiner.addChild(jumpSp);
            if (Api.switchVoApi.checkOpenNewMonthCardAndYearCard()) {
                descSp.setPosition(this.bottomBg.x + 47, iconSp.y + iconSp.height + 20);
                jumpSp.setRes("unlock_challenge_skip_2");
                jumpSp.setPosition(descSp2.x, descSp2.y + descSp2.height + 14);
            }
        }
        var practice = null;
        var img_des5 = null;
        var img_des6 = null;
        var img_des7 = null;
        //修身显示
        if (Api.practiceVoApi.isPracticeOPen()) {
            practice = BaseBitmap.create("unlock_practice");
            practice.x = this.bottomBg.width / 2 - practice.width / 2;
            practice.y = descSp.y + descSp.height + 30;
            this._scrollContiner.addChild(practice);
            if (Api.switchVoApi.checkOpenNewMonthCardAndYearCard()) {
                practice.setRes("monthcard_desc4");
                practice.setPosition(jumpSp.x, jumpSp.y + jumpSp.height + 14);
                if (Api.switchVoApi.checkOpenSeat()) {
                    img_des5 = BaseBitmap.create("yearcard_desc_5_1");
                    img_des5.x = practice.x;
                    img_des5.y = practice.y + 44;
                    this._scrollContiner.addChild(img_des5);
                    img_des6 = BaseBitmap.create("yearcard_desc_6");
                    img_des6.x = img_des5.x; //this.bottomBg.width/2- img_des6.width/2; 
                    img_des6.y = img_des5.y + 44;
                    this._scrollContiner.addChild(img_des6);
                }
                if (Api.switchVoApi.checkOpenMonthcardDonate()) {
                    img_des7 = BaseBitmap.create("yearcard_desc_7");
                    if (img_des6) {
                        img_des7.y = img_des6.y + 44;
                    }
                    else {
                        img_des5.y = practice.y + 44;
                    }
                    img_des7.x = practice.x;
                    this._scrollContiner.addChild(img_des7);
                    this._img7 = img_des7;
                }
            }
            else {
                if (Api.switchVoApi.checkOpenSeat()) {
                    img_des5 = BaseBitmap.create("yearcard_desc5_1");
                    img_des5.x = 90;
                    img_des5.y = practice.y + 30;
                    this._scrollContiner.addChild(img_des5);
                    img_des6 = BaseBitmap.create("yearcard_desc6");
                    img_des6.x = 110;
                    img_des6.y = img_des5.y + 30;
                    this._scrollContiner.addChild(img_des6);
                }
                if (Api.switchVoApi.checkOpenMonthcardDonate()) {
                    img_des7 = BaseBitmap.create("yearcard_desc7");
                    img_des7.x = 65;
                    if (img_des6) {
                        img_des7.y = img_des6.y + 30;
                    }
                    else {
                        img_des7.y = practice.y + 30;
                    }
                    this._img7 = img_des7;
                    this._scrollContiner.addChild(img_des7);
                }
            }
        }
        if (Api.switchVoApi.checkOpenNewMonthCardAndYearCard()) {
            if (Api.switchVoApi.checkOpenNewMonthCard()) {
                descSp.setPosition(giveDesSp.x, giveDesSp.y + giveDesSp.height + 9);
                descSp2.setPosition(descSp.x, descSp.y + descSp.height + 7);
                if (Api.switchVoApi.checkJumpBattle()) {
                    jumpSp && jumpSp.setPosition(descSp2.x, descSp2.y + descSp2.height + 7);
                }
                if (Api.practiceVoApi.isPracticeOPen()) {
                    practice.setPosition(jumpSp.x, jumpSp.y + jumpSp.height + 7);
                }
                if (img_des5 && Api.switchVoApi.checkOpenSeat()) {
                    img_des5.y = practice.y + 37;
                    img_des6.y = img_des5.y + 37;
                    img_des5.x = practice.x;
                    img_des6.x = practice.x;
                }
                if (img_des7 && Api.switchVoApi.checkOpenMonthcardDonate()) {
                    if (img_des6) {
                        img_des7.y = img_des6.y + 37;
                    }
                    else {
                        img_des7.y = practice.y + 37;
                    }
                    img_des7.x = practice.x;
                }
            }
        }
        var isBuy = Api.shopVoApi.ifBuyMonthCard();
        if ((isBuy == true && (!acMouthBasevo)) || (acMouthBasevo && acMouthBasevo.checkBuyMouth() == false)) {
            var hasGetSp = BaseBitmap.create("welfare_hasbuy");
            hasGetSp.x = this.bottomBg.width / 2 - hasGetSp.width / 2;
            hasGetSp.y = descSp.y + descSp.height + 45 - hasGetSp.height / 2;
            this._scrollContiner.addChild(hasGetSp);
            if (Api.practiceVoApi.isPracticeOPen()) {
                hasGetSp.y = descSp.y + descSp.height + 75 - hasGetSp.height / 2;
            }
            if (Api.switchVoApi.checkOpenNewMonthCardAndYearCard()) {
                hasGetSp.y = GameConfig.stageHeigth - hasGetSp.height - 160 - this._offsetY;
                if (Api.switchVoApi.checkOpenNewMonthCard()) {
                    hasGetSp.y = GameConfig.stageHeigth - hasGetSp.height - 180 - this._offsetY;
                }
                this._descTF = ComponentManager.getTextField(LanguageManager.getlocal("newMonthDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_YELLOW2);
                this._descTF.setPosition(hasGetSp.x + hasGetSp.width / 2 - this._descTF.width / 2, hasGetSp.y + hasGetSp.height + 4);
                this._scrollContiner.addChild(this._descTF);
                if (Api.switchVoApi.checkOpenNewMonthCard()) {
                    this._descTF2 = ComponentManager.getTextField(LanguageManager.getlocal("newMonthDesc2"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED);
                    this._descTF2.width = 464;
                    this._descTF2.lineSpacing = 4;
                    this._descTF2.setPosition(this._descTF.x + this._descTF.width / 2 - this._descTF2.width / 2, this._descTF.y + this._descTF.height + 4);
                    this._scrollContiner.addChild(this._descTF2);
                }
            }
            else {
                //已经领取过的布局
                if (Api.switchVoApi.checkOpenSeat()) {
                    hasGetSp.y = img_des6.y + img_des6.height;
                }
            }
            if (Api.switchVoApi.checkOpenMonthcardDonate() && img_des7) {
                hasGetSp.y = img_des7.y + img_des7.height;
                if (this._descTF2) {
                    this._descTF2.y = img_des7.y + img_des7.height + 10;
                    hasGetSp.y = this._descTF2.y + this._descTF2.height + 10;
                }
                if (this._limitTF) {
                    hasGetSp.y += 27;
                    this._limitTF.y = hasGetSp.y - this._limitTF.height - 5;
                }
                if (this._descTF) {
                    this._descTF.y = hasGetSp.y + hasGetSp.height + 5;
                }
            }
            // this.showText();
        }
        else {
            var rechargeItemCfg = Config.RechargeCfg.getRechargeItemCfgByKey("g7");
            if (acMouthBasevo && acMouthBasevo.checkBuyMouth()) {
                rechargeItemCfg = Config.RechargeCfg.getRechargeItemCfgByKey(acMouthBasevo.config.recharge);
                this._limitTF = ComponentManager.getTextField(LanguageManager.getlocal("discountMouthCardLimit-" + acMouthBasevo.code, [String(acMouthBasevo.getMouthLimitNum())]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_RED2);
                this._limitTF.x = this.bottomBg.width / 2 - this._limitTF.width / 2;
                this._scrollContiner.addChild(this._limitTF);
            }
            if (rechargeItemCfg) {
                App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT, this.useCallback, this);
                var goToRechargeBtn = ComponentManager.getButton(Api.switchVoApi.checkOpenNewMonthCardAndYearCard() ? "recharge_bigbtn" : ButtonConst.BTN_NORMAL_YELLOW, "anyMoney", this.goToRechargeHandler, this);
                goToRechargeBtn.x = this.bottomBg.width / 2 - goToRechargeBtn.width / 2;
                goToRechargeBtn.y = descSp.y + descSp.height + 45 - goToRechargeBtn.height / 2;
                if (this._limitTF) {
                    goToRechargeBtn.y += 27;
                    this._limitTF.y = goToRechargeBtn.y - this._limitTF.height - 5;
                }
                if (Api.switchVoApi.checkJumpBattle()) {
                    goToRechargeBtn.y = descSp.y + descSp.height + 65 - goToRechargeBtn.height / 2;
                    if (this._limitTF) {
                        goToRechargeBtn.y += 27;
                        this._limitTF.y = goToRechargeBtn.y - this._limitTF.height - 5;
                    }
                }
                if (Api.practiceVoApi.isPracticeOPen()) {
                    goToRechargeBtn.y = descSp.y + descSp.height + 95 - goToRechargeBtn.height / 2;
                    if (this._limitTF) {
                        goToRechargeBtn.y += 27;
                        this._limitTF.y = goToRechargeBtn.y - this._limitTF.height - 5;
                    }
                }
                if (Api.switchVoApi.checkOpenNewMonthCardAndYearCard()) {
                    goToRechargeBtn.y = GameConfig.stageHeigth - goToRechargeBtn.height - 160 - this._offsetY;
                    if (this._limitTF) {
                        goToRechargeBtn.y += 27;
                        this._limitTF.y = goToRechargeBtn.y - this._limitTF.height - 5;
                    }
                    if (Api.switchVoApi.checkOpenNewMonthCard()) {
                        goToRechargeBtn.y = GameConfig.stageHeigth - goToRechargeBtn.height - 180 - this._offsetY;
                        if (this._limitTF) {
                            goToRechargeBtn.y += 27;
                            this._limitTF.y = goToRechargeBtn.y - this._limitTF.height - 5;
                        }
                    }
                }
                goToRechargeBtn.setText((PlatformManager.checkisLocalPrice() && rechargeItemCfg.platFullPrice) ? rechargeItemCfg.platFullPrice : App.CommonUtil.getMoneyString(rechargeItemCfg.cost), false);
                this._scrollContiner.addChild(goToRechargeBtn);
                this._goToRechargeBtn = goToRechargeBtn;
                if (Api.switchVoApi.checkOpenNewMonthCardAndYearCard()) {
                    this._descTF = ComponentManager.getTextField(LanguageManager.getlocal("newMonthDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_YELLOW2);
                    this._descTF.setPosition(this._goToRechargeBtn.x + this._goToRechargeBtn.width / 2 - this._descTF.width / 2, this._goToRechargeBtn.y + this._goToRechargeBtn.height + 4);
                    this._scrollContiner.addChild(this._descTF);
                    if (Api.switchVoApi.checkOpenNewMonthCard()) {
                        this._descTF2 = ComponentManager.getTextField(LanguageManager.getlocal("newMonthDesc2"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED);
                        this._descTF2.width = 464;
                        this._descTF2.lineSpacing = 4;
                        this._descTF2.setPosition(this._descTF.x + this._descTF.width / 2 - this._descTF2.width / 2, img_des6.y + img_des6.height + 10);
                        this._scrollContiner.addChild(this._descTF2);
                        goToRechargeBtn.y = this._descTF2.y + this._descTF2.height + 10;
                        if (Api.switchVoApi.checkOpenSeat()) {
                            // goToRechargeBtn.y =img_des6.y+img_des6.height+10;
                            if (this._limitTF) {
                                // goToRechargeBtn.y +=  27;
                                this._limitTF.y = goToRechargeBtn.y - this._limitTF.height - 5 - 20;
                            }
                            // this._descTF2.y = goToRechargeBtn.y-4;
                            // goToRechargeBtn.y =img_des6.y+img_des6.height+10;
                            this._descTF.y = goToRechargeBtn.y + goToRechargeBtn.height + 5;
                        }
                    }
                }
                //月卡扩充席位
                if (Api.switchVoApi.checkOpenSeat()) {
                    if (Api.switchVoApi.checkOpenNewMonthCardAndYearCard()) {
                        if (this._descTF) {
                            if (acMouthBasevo && acMouthBasevo.checkBuyMouth()) {
                                this._descTF.y = this._descTF.y + 23;
                            }
                            else {
                                this._descTF.y = this._descTF.y + 38;
                            }
                        }
                        if (this._goToRechargeBtn) {
                            if (acMouthBasevo && acMouthBasevo.checkBuyMouth()) {
                                this._goToRechargeBtn.y = this._goToRechargeBtn.y + 15;
                                this._limitTF.y = this._limitTF.y + 15;
                            }
                            else {
                                this._goToRechargeBtn.y = this._goToRechargeBtn.y + 30;
                            }
                        }
                    }
                    else {
                        if (this._goToRechargeBtn) {
                            this._goToRechargeBtn.y = img_des6.y + img_des6.height + 10;
                            if (this._limitTF) {
                                goToRechargeBtn.y += 27;
                                this._limitTF.y = goToRechargeBtn.y - this._limitTF.height - 5;
                            }
                        }
                    }
                }
                if (Api.switchVoApi.checkOpenMonthcardDonate() && img_des7) {
                    goToRechargeBtn.y = img_des7.y + img_des7.height + 10;
                    if (this._descTF2) {
                        this._descTF2.y = img_des7.y + img_des7.height + 10;
                        goToRechargeBtn.y = this._descTF2.y + this._descTF2.height + 10;
                    }
                    if (this._limitTF) {
                        goToRechargeBtn.y += 27;
                        this._limitTF.y = goToRechargeBtn.y - this._limitTF.height - 5;
                    }
                    if (this._descTF) {
                        this._descTF.y = goToRechargeBtn.y + goToRechargeBtn.height + 5;
                    }
                }
            }
        }
        if (isBuy) {
            this.showText();
        }
        if (PlatformManager.checkIsTWMCSp() == true) {
            var buyCardExplain = ComponentManager.getTextField(LanguageManager.getlocal("twBuyCardExplain"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
            buyCardExplain.width = 360;
            buyCardExplain.height = 250;
            buyCardExplain.x = this.bottomBg.width / 2 - buyCardExplain.width / 2;
            buyCardExplain.y = descSp.y + 220;
            buyCardExplain.lineSpacing = 5;
            this._scrollContiner.addChild(buyCardExplain);
        }
        this._scrollContiner.height += 50;
        if (acMouthBasevo && acMouthBasevo.checkBuyMouth()) {
            this._scrollContiner.height += 40;
        }
        if (Api.switchVoApi.checkOpenMonthcardDonate()) {
            this._scrollContiner.height += 40;
        }
    };
    WelfareViewMonthCard.prototype.showText = function () {
        var acMouthBasevo = Api.acVoApi.checkIsMonthDiscount();
        //月卡有效期
        var str = App.DateUtil.getFormatBySecond(Api.shopVoApi.getMonthcardet(), 6);
        if (this._cardTimedeTxt) {
            this._cardTimedeTxt.text = LanguageManager.getlocal("cardTimedes", [str]);
            return;
        }
        var cardTimedeTxt = ComponentManager.getTextField(LanguageManager.getlocal("cardTimedes", [str]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        cardTimedeTxt.x = 240;
        cardTimedeTxt.y = 960 - 130 - this._offsetY;
        if (acMouthBasevo && acMouthBasevo.checkBuyMouth()) {
            cardTimedeTxt.y = 960 - 70 - this._offsetY + 30;
        }
        if (Api.switchVoApi.checkOpenNewMonthCardAndYearCard()) {
            cardTimedeTxt.y = GameConfig.stageHeigth - 110 - this._offsetY;
            if (acMouthBasevo && acMouthBasevo.checkBuyMouth()) {
                cardTimedeTxt.y = GameConfig.stageHeigth - 110 - this._offsetY + 30;
            }
        }
        else {
            if (Api.switchVoApi.checkOpenSeat()) {
                cardTimedeTxt.y = cardTimedeTxt.y + 135;
                // if (acMouthBasevo&&acMouthBasevo.checkBuyMouth()) {
                // 	cardTimedeTxt.y += 30;
                // }
            }
        }
        if (Api.switchVoApi.checkOpenNewMonthCard() && Api.switchVoApi.checkOpenSeat()) {
            if (this._descTF2) {
                cardTimedeTxt.y = this._descTF2.y + this._descTF2.height + 5; //cardTimedeTxt.y-15;
                if (acMouthBasevo && acMouthBasevo.checkBuyMouth()) {
                    cardTimedeTxt.y = this._descTF2.y + this._descTF2.height + 145;
                }
            }
        }
        this._scrollContiner.height += cardTimedeTxt.height;
        if (acMouthBasevo && acMouthBasevo.checkBuyMouth()) {
            this._scrollContiner.height += 30;
        }
        if (Api.switchVoApi.checkOpenMonthcardDonate()) {
            if (cardTimedeTxt && this._img7) {
                cardTimedeTxt.y = this._img7.y + this._img7.height + 155;
                if (this._descTF) {
                    cardTimedeTxt.y = this._img7.y + this._img7.height + 200;
                }
            }
        }
        this._scrollContiner.addChild(cardTimedeTxt);
        this._cardTimedeTxt = cardTimedeTxt;
    };
    WelfareViewMonthCard.prototype.useCallback = function (event) {
        if (event === void 0) { event = null; }
        var isBuy = Api.shopVoApi.ifBuyMonthCard();
        var acMouthBasevo = Api.acVoApi.checkIsMonthDiscount();
        if ((isBuy == true && (!acMouthBasevo)) || (acMouthBasevo && acMouthBasevo.checkBuyMouth() == false)) {
            this._goToRechargeBtn.visible = false;
            if (this._limitTF) {
                this._limitTF.visible = false;
            }
            var hasGetSp = BaseBitmap.create("welfare_hasbuy");
            hasGetSp.x = this._goToRechargeBtn.x + this._goToRechargeBtn.width / 2 - hasGetSp.width / 2;
            hasGetSp.y = this._goToRechargeBtn.y + this._goToRechargeBtn.height / 2 - hasGetSp.height / 2;
            if (Api.switchVoApi.checkOpenNewMonthCardAndYearCard()) {
                hasGetSp.y = GameConfig.stageHeigth - hasGetSp.height - 160 - this._offsetY;
                if (Api.switchVoApi.checkOpenNewMonthCard()) {
                    hasGetSp.y = GameConfig.stageHeigth - hasGetSp.height - 180 - this._offsetY;
                    if (Api.practiceVoApi.isPracticeOPen()) {
                        hasGetSp.y = this._goToRechargeBtn.y - 20;
                    }
                }
                this._descTF.setPosition(hasGetSp.x + hasGetSp.width / 2 - this._descTF.width / 2, hasGetSp.y + hasGetSp.height + 4);
                if (Api.switchVoApi.checkOpenNewMonthCard()) {
                    this._descTF2.setPosition(this._descTF.x + this._descTF.width / 2 - this._descTF2.width / 2, this._descTF.y + this._descTF.height + 4);
                }
            }
            if (Api.switchVoApi.checkOpenMonthcardDonate()) {
                if (this._img7) {
                    hasGetSp.y = this._img7.y + this._img7.height;
                    if (this._descTF2) {
                        this._descTF2.y = this._img7.y + this._img7.height + 10;
                        hasGetSp.y = this._descTF2.y + this._descTF2.height + 10;
                    }
                    if (this._limitTF) {
                        hasGetSp.y += 27;
                        this._limitTF.y = hasGetSp.y - this._limitTF.height - 5;
                    }
                    if (this._descTF) {
                        this._descTF.y = hasGetSp.y + hasGetSp.height + 5;
                    }
                }
            }
            this._scrollContiner.addChild(hasGetSp);
            this._scrollContiner.height = this._scrollContiner.height + 50;
            // this.showText();
            // App.CommonUtil.showTip(LanguageManager.getlocal("sysBuySuccessDesc",[LanguageManager.getlocal("monthCard")]));
            // App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.useCallback,this);
        }
        if (acMouthBasevo && this._limitTF) {
            this._limitTF.text = LanguageManager.getlocal("discountMouthCardLimit-" + acMouthBasevo.code, [String(acMouthBasevo.getMouthLimitNum())]);
        }
        if (isBuy) {
            this.showText();
            App.CommonUtil.showTip(LanguageManager.getlocal("sysBuySuccessDesc", [LanguageManager.getlocal("monthCard")]));
        }
    };
    WelfareViewMonthCard.prototype.receivePushData = function (event) {
        var data = event.data;
        if (data.data.ret == 0 && data.data.cmd == NetPushConst.PUSH_PAY) {
            if (data.data.data.rewards) {
                var itemid = data.data.data.rewards;
                var rList = GameData.formatRewardItem(itemid);
                App.CommonUtil.playRewardFlyAction(rList);
            }
        }
    };
    WelfareViewMonthCard.prototype.goToRechargeHandler = function () {
        if (GameData.idcardSwitch == true && GameData.idcardNormal == 1 && Api.gameinfoVoApi.getRealnameRewards() == null) {
            ViewController.getInstance().openView(ViewConst.POPUP.REALNAMEREWARDSPOPUPVIEW);
            return;
        }
        if ((!this._lastClickBuyTime) || (new Date().getTime() - this._lastClickBuyTime > 5000)) {
            this._lastClickBuyTime = new Date().getTime();
            var acMouthBasevo = Api.acVoApi.checkIsMonthDiscount();
            if (acMouthBasevo) {
                if (PlatformManager.checkIsXlySp()) {
                    if (Api.playerVoApi.getPlayerVipLevel() < 1) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("buyyeardesvip1"));
                        return;
                    }
                }
                PlatformManager.checkPay(acMouthBasevo.config.recharge);
                return;
            }
            else {
                PlatformManager.checkPay("g7");
            }
        }
        // ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIEW);
    };
    WelfareViewMonthCard.prototype.getResourceList = function () {
        var arr = [];
        var resArr = [];
        if (Api.switchVoApi.checkOpenNewMonthCardAndYearCard()) {
            arr.push("monthcard_desc1");
            arr.push("monthcard_desc2");
            arr.push("monthcard_desc4");
            arr.push("yearcard_desc_5_1");
            arr.push("yearcard_desc_5_2");
            arr.push("yearcard_desc_6");
            arr.push("yearcard_desc_7");
            arr.push("unlock_challenge_skip_2");
            arr.push("monthcard_bigicon2");
            arr.push("recharge_bigbtn");
            arr.push("recharge_bigbtn_down");
            arr.push("mother_have");
            if (Api.switchVoApi.checkOpenNewMonthCardAndYearCard()) {
                arr.push("monthcard_givedesc");
                //
            }
            var acMouthBasevo = Api.acVoApi.checkIsMonthDiscount();
            if (acMouthBasevo) {
                resArr = [
                    "welfareviewmonthcard_discount_desc1-" + acMouthBasevo.code,
                ];
            }
        }
        else {
            var acMouthBasevo = Api.acVoApi.checkIsMonthDiscount();
            if (acMouthBasevo) {
                resArr = [
                    "welfareviewmonthcard_discount_desc-" + acMouthBasevo.code,
                ];
            }
        }
        if (App.DeviceUtil.isWXgame()) {
            return _super.prototype.getResourceList.call(this).concat([
                "monthcard_desc_2",
                "monthcard_desc1",
                "monthcard_desc2",
                "monthcard_desc4",
                "unlock_challenge_skip_2"
            ]).concat(arr).concat(resArr);
        }
        else {
            return _super.prototype.getResourceList.call(this).concat([
                "monthcard_desc_2",
                "monthcard_bigicon",
                "unlock_challenge_skip",
                "unlock_practice",
                "yearcard_desc5_1",
                "yearcard_desc6",
                "yearcard_desc7"
            ]).concat(arr).concat(resArr);
        }
    };
    WelfareViewMonthCard.prototype.getResPreName = function () {
        if (Api.switchVoApi.checkOpenNewMonthCardAndYearCard()) {
            return "monthcard_2";
        }
        else {
            var acMouthBasevo = Api.acVoApi.checkIsMonthDiscount();
            if (acMouthBasevo) {
                return "welfareviewmonthcard_discount-" + acMouthBasevo.code;
            }
            return "monthcard";
        }
    };
    WelfareViewMonthCard.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT, this.useCallback, this);
        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY, this.receivePushData, this);
        this._goToRechargeBtn = null;
        this._scrollContiner = undefined;
        this._offsetY = 0;
        this._lastClickBuyTime = 0;
        this._descTF = null;
        this._descTF2 = null;
        this._welfareWifebit = null;
        this._cardTimedeTxt = null;
        this._limitTF = null;
        this._img7 = null;
        _super.prototype.dispose.call(this);
    };
    return WelfareViewMonthCard;
}(WelfareViewTab));
__reflect(WelfareViewMonthCard.prototype, "WelfareViewMonthCard");
//# sourceMappingURL=WelfareViewMonthCard.js.map