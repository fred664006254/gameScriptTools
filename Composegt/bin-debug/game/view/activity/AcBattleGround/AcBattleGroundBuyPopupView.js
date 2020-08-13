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
var AcBattleGroundBuyPopupView = (function (_super) {
    __extends(AcBattleGroundBuyPopupView, _super);
    function AcBattleGroundBuyPopupView() {
        var _this = _super.call(this) || this;
        _this._callbackF = null;
        _this._obj = null;
        _this._buyInfo = [];
        _this._buyBtnTab = [];
        _this._containerTab = [];
        _this._clickIndex = 0;
        _this._goldText = null;
        _this._moraleText = null;
        return _this;
    }
    Object.defineProperty(AcBattleGroundBuyPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundBuyPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundBuyPopupView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundBuyPopupView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundBuyPopupView.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcBattleGroundBuyPopupView.prototype.getRequestData = function () {
        var tmpattr = this.vo.getMyFightInfo().tmpattr;
        var myAtkInfo = this.vo.getMyFightInfo();
        if (myAtkInfo.fightnum == 0) {
            return null;
        }
        else {
            if (tmpattr && tmpattr.list && Object.keys(tmpattr.list).length > 0) {
                return null;
            }
            else {
                return { requestType: NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_ATTRLIST, requestData: {
                        activeId: this.acTivityId
                    } };
            }
        }
    };
    AcBattleGroundBuyPopupView.prototype.getTitleStr = function () {
        return "atkraceBuyPopupViewTitle";
    };
    AcBattleGroundBuyPopupView.prototype.initView = function () {
        if (this.param.data && this.param.data.f && this.param.data.o) {
            this._obj = this.param.data.o;
            this._callbackF = this.param.data.f;
        }
        var titleBg = BaseBitmap.create("public_tc_bg02");
        titleBg.setPosition(55, 12);
        this.addChildToContainer(titleBg);
        var gemsBg = BaseBitmap.create("public_hb_bg01");
        gemsBg.setPosition(120, 20);
        this.addChildToContainer(gemsBg);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 45, 45);
        var goldIcon = BaseBitmap.create("public_icon1");
        goldIcon.setPosition(gemsBg.x - 1, gemsBg.y + gemsBg.height / 2 - 45 / 2);
        this.addChildToContainer(goldIcon);
        this._goldText = ComponentManager.getTextField(Api.playerVoApi.getPlayerGemStr(), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        this._goldText.setPosition(goldIcon.x + 50, gemsBg.y + gemsBg.height / 2 - this._goldText.height / 2);
        this.addChildToContainer(this._goldText);
        gemsBg.width = this._goldText.width + 70;
        var moraleBg = BaseBitmap.create("public_hb_bg01");
        moraleBg.setPosition(320, 20);
        this.addChildToContainer(moraleBg);
        var moraleIcon = BaseBitmap.create("atkrace_morale");
        moraleIcon.setPosition(moraleBg.x + 3, moraleBg.y + moraleBg.height / 2 - 45 / 2);
        this.addChildToContainer(moraleIcon);
        this._moraleText = ComponentManager.getTextField(this.vo.getMyInfo().morale.toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        this._moraleText.setPosition(moraleIcon.x + 50, moraleBg.y + moraleBg.height / 2 - this._moraleText.height / 2);
        this.addChildToContainer(this._moraleText);
        moraleBg.width = this._moraleText.width + 70;
        var typeBg = BaseBitmap.create("public_tc_bg01");
        typeBg.width = 528;
        typeBg.height = 450;
        typeBg.setPosition(this.viewBg.width / 2 - typeBg.width / 2, 60);
        this.addChildToContainer(typeBg);
        var infoDesc2 = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_info_2"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        infoDesc2.setPosition(50, typeBg.y + typeBg.height + 18);
        this.addChildToContainer(infoDesc2);
        var infoDesc3 = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_info_3"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        infoDesc3.setPosition(280, infoDesc2.y);
        this.addChildToContainer(infoDesc3);
        var myAtkInfo = this.vo.getMyFightInfo();
        var myInfo = myAtkInfo.mesid;
        var tmpatt = myAtkInfo.tmpattr;
        var atkAdd = 0;
        var skillAdd = 0;
        if (tmpatt) {
            if (tmpatt.atk) {
                atkAdd = Math.floor(tmpatt.atk * 100);
            }
            if (tmpatt.skill) {
                skillAdd = Math.floor(tmpatt.skill * 100);
            }
        }
        var infoText2 = ComponentManager.getTextField(atkAdd.toString() + "%", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN);
        infoText2.setPosition(infoDesc2.x + infoDesc2.width, infoDesc2.y);
        this.addChildToContainer(infoText2);
        var infoText3 = ComponentManager.getTextField(skillAdd.toString() + "%", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN);
        infoText3.setPosition(infoDesc3.x + infoDesc3.width, infoDesc3.y);
        this.addChildToContainer(infoText3);
        var bloodText = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_property3"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        bloodText.setPosition(infoDesc2.x, infoDesc2.y + 35);
        this.addChildToContainer(bloodText);
        var progressBar = ComponentManager.getProgressBar("progress_type1_red", "progress_type1_bg", 410);
        progressBar.x = bloodText.x + bloodText.width + 20;
        progressBar.y = bloodText.y - progressBar.height / 2 + bloodText.height / 2;
        this.addChildToContainer(progressBar);
        var attrValue = Math.ceil(myInfo.attr);
        progressBar.setText(String(attrValue) + "/" + myInfo.fullattr);
        progressBar.setPercentage(myInfo.attr / myInfo.fullattr);
        if (myAtkInfo.fightnum == 0) {
            for (var i = 1; i <= 3; i++) {
                this._buyInfo.push([this.cfg.getInitAtt(i.toString()), 1, i.toString()]);
            }
        }
        else {
            var tmpattr = this.vo.getMyFightInfo().tmpattr.list;
            this._buyInfo.push([this.cfg.getJuniorAtt(tmpattr["2"]), 2, tmpattr["2"]]);
            this._buyInfo.push([this.cfg.getMediumAtt(tmpattr["3"]), 3, tmpattr["3"]]);
            this._buyInfo.push([this.cfg.getSeniorAtt(tmpattr["4"]), 4, tmpattr["4"]]);
        }
        for (var i = 1; i <= 3; i++) {
            var bgContainer = this.getBuyTypeContainer(this._buyInfo[i - 1][0], i, this._buyInfo[i - 1][1]);
            bgContainer.setPosition(this.viewBg.width / 2 - 518 / 2 + 4, (i - 1) * 150 + 73);
            this.addChildToContainer(bgContainer);
            this._containerTab.push(bgContainer);
        }
    };
    /**
     * idx `1~3 初中高   type `1~4
     */
    AcBattleGroundBuyPopupView.prototype.getBuyTypeContainer = function (info, idx, type) {
        var bgContainer = new BaseDisplayObjectContainer();
        var itemBg = BaseBitmap.create("public_9v_bg04");
        itemBg.width = 508;
        itemBg.height = 140;
        bgContainer.addChild(itemBg);
        var leftBg = BaseBitmap.create("public_left");
        leftBg.width = 139;
        leftBg.height = 129;
        leftBg.x = 5.5;
        leftBg.y = 5.5;
        bgContainer.addChild(leftBg);
        var name = LanguageManager.getlocal("atkrace_property_lv" + idx, [LanguageManager.getlocal("atkrace_property" + info.att)]);
        var itemName = ComponentManager.getTextField(name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_BLUE);
        itemName.setPosition(130, 15);
        bgContainer.addChild(itemName);
        var effect = Math.floor(info.effect * 100);
        var desc = LanguageManager.getlocal("atkrace_add_property", [LanguageManager.getlocal("atkrace_property" + info.att), effect.toString()]);
        var descText = ComponentManager.getTextField(desc, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        descText.setPosition(itemName.x, itemName.y + itemName.height + 12);
        bgContainer.addChild(descText);
        var expendText = ComponentManager.getTextField(LanguageManager.getlocal("adultChooseCost") + ":", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        expendText.setPosition(itemName.x, descText.y + descText.height + 12);
        bgContainer.addChild(expendText);
        var rectIcon = egret.Rectangle.create();
        rectIcon.setTo(0, 0, 100, 100);
        var attIconName;
        if (type == 1) {
            attIconName = "atkrace_icon_1_" + idx;
        }
        else {
            attIconName = "atkrace_icon_" + info.att + "_" + idx;
        }
        var attIcon = BaseLoadBitmap.create(attIconName, rectIcon);
        attIcon.setPosition(11, itemBg.height / 2 - attIcon.height / 2);
        bgContainer.addChild(attIcon);
        var rect = egret.Rectangle.create();
        var icon;
        var cost;
        var moraleIcon;
        if (info.costGem) {
            icon = "itemicon1";
            rect.setTo(0, 0, 45, 45);
            cost = info.costGem;
            moraleIcon = BaseLoadBitmap.create(icon, rect);
        }
        else {
            icon = "atkrace_morale";
            rect.setTo(0, 0, 36, 40);
            cost = info.costPoint;
            moraleIcon = BaseBitmap.create(icon);
        }
        moraleIcon.setPosition(expendText.x + expendText.width, expendText.y + expendText.height / 2 - moraleIcon.height / 2);
        bgContainer.addChild(moraleIcon);
        var expend = ComponentManager.getTextField(cost.toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        expend.setPosition(moraleIcon.x + 45, expendText.y);
        bgContainer.addChild(expend);
        var tmpattr = this.vo.getMyFightInfo().tmpattr;
        var isBuy;
        if (tmpattr) {
            isBuy = tmpattr.isbuy;
        }
        if (isBuy == "0" || !isBuy) {
            var buyBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acPunishBuyItemBuy", this.buyClick, this, [idx]);
            buyBtn.setPosition(itemBg.width - buyBtn.width - 10, itemBg.height / 2 - buyBtn.height / 2);
            buyBtn.setColor(TextFieldConst.COLOR_BLACK);
            bgContainer.addChild(buyBtn);
            this._buyBtnTab.push(buyBtn);
        }
        else {
            var isBuyArray = isBuy.split("_");
            if ((isBuyArray[0] == "1")) {
                if (Number(isBuyArray[1]) == idx) {
                    var hasGetSp = BaseBitmap.create("public_buy");
                    hasGetSp.setPosition(itemBg.width - hasGetSp.width - 10, itemBg.height / 2 - hasGetSp.height / 2);
                    bgContainer.addChild(hasGetSp);
                    // let hasGetSp:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_buy_already"),TextFieldConst.FONTSIZE_CONTENT_COMMON);
                    // hasGetSp.setPosition(itemBg.width - hasGetSp.width - 30, itemBg.height/2-hasGetSp.height/2);
                    // bgContainer.addChild(hasGetSp);
                }
            }
            else if (Number(isBuyArray[0]) == type) {
                var hasGetSp = BaseBitmap.create("public_buy");
                hasGetSp.setPosition(itemBg.width - hasGetSp.width - 10, itemBg.height / 2 - hasGetSp.height / 2);
                bgContainer.addChild(hasGetSp);
                // let hasGetSp:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_buy_already"),TextFieldConst.FONTSIZE_CONTENT_COMMON);
                // hasGetSp.setPosition(itemBg.width - hasGetSp.width - 30, itemBg.height/2-hasGetSp.height/2);
                // bgContainer.addChild(hasGetSp);
            }
        }
        return bgContainer;
    };
    AcBattleGroundBuyPopupView.prototype.buyClick = function (idx) {
        var info = this._buyInfo[idx - 1];
        var attrInfo = info[0];
        if (attrInfo.costGem) {
            if (attrInfo.costGem > Api.playerVoApi.getPlayerGem()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
                return;
            }
        }
        else {
            var needItem = attrInfo.costPoint;
            var hasNum = this.vo.getMyInfo().morale;
            if (needItem > hasNum) {
                App.CommonUtil.showTip(LanguageManager.getlocal("atkRace_buy_NotEnough"));
                return;
            }
        }
        this._clickIndex = idx;
        // this.showBuyAnim();
        this.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_ATTRBUY, {
            atttype: info[1].toString(),
            attid: info[2],
            activeId: this.acTivityId
        });
    };
    //请求回调
    AcBattleGroundBuyPopupView.prototype.receiveData = function (data) {
        var rData = data.data;
        if (data.ret == false) {
            return;
        }
        if (rData.cmd == NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_ATTRLIST) {
            this.vo.setRaceInfo(rData.data.battleground);
        }
        else if (rData.cmd == NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_ATTRBUY) {
            this.vo.setRaceInfo(rData.data.battleground);
            if (this._obj && this._callbackF) {
                this._callbackF.apply(this._obj);
            }
            this.showBuyAnim();
            this._goldText.text = Api.playerVoApi.getPlayerGemStr();
            this._moraleText.text = this.vo.getMyInfo().morale.toString();
        }
    };
    AcBattleGroundBuyPopupView.prototype.showBuyAnim = function () {
        for (var key in this._buyBtnTab) {
            this._buyBtnTab[key].visible = false;
        }
        var collectFlag = BaseBitmap.create("public_buy");
        collectFlag.anchorOffsetX = collectFlag.width / 2;
        collectFlag.anchorOffsetY = collectFlag.height / 2;
        collectFlag.setPosition(508 - collectFlag.width / 2 - 10, 118 / 2);
        collectFlag.setScale(1.5);
        this._containerTab[this._clickIndex - 1].addChild(collectFlag);
        egret.Tween.get(collectFlag, { loop: false }).to({ scaleX: 1, scaleY: 1 }, 400).wait(300).call(this.hide, this);
    };
    AcBattleGroundBuyPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "progress_type1_red", "progress_type1_bg"
        ]);
    };
    AcBattleGroundBuyPopupView.prototype.dispose = function () {
        this._callbackF = null;
        this._obj = null;
        this._buyInfo.length = 0;
        this._buyBtnTab.length = 0;
        this._clickIndex = 0;
        this._containerTab.length = 0;
        this._goldText = null;
        this._moraleText = null;
        _super.prototype.dispose.call(this);
    };
    return AcBattleGroundBuyPopupView;
}(PopupView));
__reflect(AcBattleGroundBuyPopupView.prototype, "AcBattleGroundBuyPopupView");
