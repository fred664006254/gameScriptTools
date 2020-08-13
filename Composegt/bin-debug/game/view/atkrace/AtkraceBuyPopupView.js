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
var AtkraceBuyPopupView = (function (_super) {
    __extends(AtkraceBuyPopupView, _super);
    function AtkraceBuyPopupView() {
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
    /**生成新标头 */
    AtkraceBuyPopupView.prototype.isHaveTitle = function () {
        return true;
    };
    AtkraceBuyPopupView.prototype.getRequestData = function () {
        var tmpattr = Api.atkraceVoApi.getMyFightInfo().tmpattr;
        var myAtkInfo = Api.atkraceVoApi.getMyFightInfo();
        if (myAtkInfo.fightnum == 0) {
            return null;
        }
        else {
            if (tmpattr && tmpattr.list && Object.keys(tmpattr.list).length > 0) {
                return null;
            }
            else {
                return { requestType: NetRequestConst.REQUEST_ATKRACE_ATTRBUYLIST, requestData: {} };
            }
        }
    };
    AtkraceBuyPopupView.prototype.initView = function () {
        // if (this.param.data && this.param.data.f && this.param.data.o)
        // {
        // 	this._obj = this.param.data.o;
        // 	this._callbackF = this.param.data.f;
        // }
        // let gemsBg:BaseBitmap = BaseBitmap.create("public_hb_bg01");
        // gemsBg.setPosition(32,12);
        // this.addChildToContainer(gemsBg); 
        // let titleBg:BaseBitmap = BaseBitmap.create("public_tc_bg02");
        // titleBg.setPosition(55,12);
        // this.addChildToContainer(titleBg);
        // let rect:egret.Rectangle=egret.Rectangle.create();
        // rect.setTo(0,0,45,45);
        // let goldIcon:BaseLoadBitmap = BaseLoadBitmap.create("itemicon1",rect);
        // goldIcon.setPosition(gemsBg.x -1, gemsBg.y+gemsBg.height/2 - 45/2);
        // this.addChildToContainer(goldIcon);
        // this._goldText = ComponentManager.getTextField(Api.playerVoApi.getPlayerGemStr(),TextFieldConst.FONTSIZE_CONTENT_COMMON);
        // this._goldText.setPosition(goldIcon.x +50, gemsBg.y+gemsBg.height/2 - this._goldText.height/2);
        // this.addChildToContainer(this._goldText);
        // gemsBg.width = this._goldText.width + 70;
        var resBar = ComponentManager.getResBar(1, true, 175);
        resBar.setPosition(120, 30);
        this.addChildToContainer(resBar);
        var moraleBg = BaseBitmap.create("public_hb_bg01");
        moraleBg.setPosition(380, 30);
        this.addChildToContainer(moraleBg);
        var moraleIcon = BaseBitmap.create("atkrace_morale");
        moraleIcon.setPosition(moraleBg.x + 3, moraleBg.y + moraleBg.height / 2 - 45 / 2);
        this.addChildToContainer(moraleIcon);
        this._moraleText = ComponentManager.getTextField(Api.atkraceVoApi.getMyInfo().morale.toString(), 20, TextFieldConst.COLOR_WARN_YELLOW_NEW);
        this._moraleText.setPosition(moraleIcon.x + 50, moraleBg.y + moraleBg.height / 2 - this._moraleText.height / 2);
        this.addChildToContainer(this._moraleText);
        var typeBg = BaseBitmap.create("public_9v_bg12");
        typeBg.width = 530;
        typeBg.height = 480;
        typeBg.setPosition(this.viewBg.width / 2 - typeBg.width / 2, 80);
        this.addChildToContainer(typeBg);
        var infoBg = BaseBitmap.create("public_9v_bg12");
        infoBg.width = 530;
        infoBg.height = 155;
        infoBg.x = this.viewBg.width / 2 - infoBg.width / 2;
        infoBg.y = typeBg.y + typeBg.height + 10;
        this.addChildToContainer(infoBg);
        var infoDesc2 = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_info_2"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
        infoDesc2.setPosition(90, infoBg.y + 18);
        this.addChildToContainer(infoDesc2);
        var infoDesc3 = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_info_3"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
        infoDesc3.setPosition(400, infoDesc2.y);
        this.addChildToContainer(infoDesc3);
        var myAtkInfo = Api.atkraceVoApi.getMyFightInfo();
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
        var infoText2 = ComponentManager.getTextField(atkAdd.toString() + "%", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN_NEW);
        infoText2.setPosition(infoDesc2.x + infoDesc2.width, infoDesc2.y);
        this.addChildToContainer(infoText2);
        var infoText3 = ComponentManager.getTextField(skillAdd.toString() + "%", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN_NEW);
        infoText3.setPosition(infoDesc3.x + infoDesc3.width, infoDesc3.y);
        this.addChildToContainer(infoText3);
        //血量
        var bloodText = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_property3"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
        bloodText.setPosition(infoDesc2.x, infoDesc2.y + 35);
        this.addChildToContainer(bloodText);
        //血量具体
        var bloodText2 = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_property3"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED_NEW);
        bloodText2.setPosition(bloodText.width + bloodText.x + 20, bloodText.y);
        bloodText2.text = myInfo.attr + "/" + myInfo.fullattr;
        this.addChildToContainer(bloodText2);
        var progressBar = ComponentManager.getProgressBar("progress_type3_red", "progress_type3_bg", 470);
        progressBar.x = this.viewBg.width / 2 - progressBar.width / 2;
        progressBar.y = infoBg.y + 105;
        this.addChildToContainer(progressBar);
        // progressBar.setText(myInfo.attr + "/"+ myInfo.fullattr);
        progressBar.setPercentage(myInfo.attr / myInfo.fullattr);
        if (myAtkInfo.fightnum == 0) {
            for (var i = 1; i <= 3; i++) {
                this._buyInfo.push([Config.AtkraceCfg.getInitAtt(i.toString()), 1, i.toString()]);
            }
        }
        else {
            var tmpattr = Api.atkraceVoApi.getMyFightInfo().tmpattr.list;
            this._buyInfo.push([Config.AtkraceCfg.getJuniorAtt(tmpattr["2"]), 2, tmpattr["2"]]);
            this._buyInfo.push([Config.AtkraceCfg.getMediumAtt(tmpattr["3"]), 3, tmpattr["3"]]);
            this._buyInfo.push([Config.AtkraceCfg.getSeniorAtt(tmpattr["4"]), 4, tmpattr["4"]]);
        }
        for (var i = 1; i <= 3; i++) {
            var bgContainer = this.getBuyTypeContainer(this._buyInfo[i - 1][0], i, this._buyInfo[i - 1][1]);
            bgContainer.setPosition(this.viewBg.width / 2 - 518 / 2 + 4, (i - 1) * 155 + 90);
            this.addChildToContainer(bgContainer);
            this._containerTab.push(bgContainer);
        }
    };
    /**
     * idx `1~3 初中高   type `1~4
     */
    AtkraceBuyPopupView.prototype.getBuyTypeContainer = function (info, idx, type) {
        var bgContainer = new BaseDisplayObjectContainer();
        bgContainer.width = 508;
        bgContainer.height = 155;
        if (idx > 1) {
            var line = BaseBitmap.create("public_line4");
            line.width = 500;
            line.x = bgContainer.width / 2 - line.width / 2;
            line.y = -line.height / 2;
            bgContainer.addChild(line);
        }
        // let itemBg:BaseBitmap = BaseBitmap.create("public_9v_bg04");
        // itemBg.width = 508;
        // itemBg.height = 165;
        // bgContainer.addChild(itemBg);
        // let leftBg = BaseBitmap.create("public_left");
        // leftBg.width = 139;
        // leftBg.height = 129;
        // leftBg.x = 5.5;
        // leftBg.y = 5.5;
        // bgContainer.addChild(leftBg);
        //初级攻击加成
        var name = LanguageManager.getlocal("atkrace_property_lv" + idx, [LanguageManager.getlocal("atkrace_property" + info.att)]);
        var itemName = ComponentManager.getTextField(name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
        itemName.setPosition(157, 30);
        bgContainer.addChild(itemName);
        //临时攻击加成
        var effect = Math.floor(info.effect * 100);
        var desc = LanguageManager.getlocal("atkrace_add_property", [LanguageManager.getlocal("atkrace_property" + info.att), effect.toString()]);
        var descText = ComponentManager.getTextField(desc, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
        descText.setPosition(itemName.x, itemName.y + itemName.height + 22);
        bgContainer.addChild(descText);
        //消耗
        var expendText = ComponentManager.getTextField(LanguageManager.getlocal("adultChooseCost") + ":", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
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
        attIcon.setPosition(22, bgContainer.height / 2 - attIcon.height / 2);
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
        moraleIcon.setPosition(expendText.x + expendText.width + 10, expendText.y + expendText.height / 2 - moraleIcon.height / 2);
        bgContainer.addChild(moraleIcon);
        var expend = ComponentManager.getTextField(cost.toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
        expend.setPosition(moraleIcon.x + 45, expendText.y);
        bgContainer.addChild(expend);
        var tmpattr = Api.atkraceVoApi.getMyFightInfo().tmpattr;
        var isBuy;
        if (tmpattr) {
            isBuy = tmpattr.isbuy;
        }
        if (isBuy == "0" || !isBuy) {
            var buyBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acPunishBuyItemBuy", this.buyClick, this, [idx]);
            buyBtn.setPosition(bgContainer.width - buyBtn.width - 15, bgContainer.height / 2 - buyBtn.height / 2);
            // buyBtn.setColor(TextFieldConst.COLOR_BLACK);
            bgContainer.addChild(buyBtn);
            this._buyBtnTab.push(buyBtn);
        }
        else {
            var isBuyArray = isBuy.split("_");
            if ((isBuyArray[0] == "1")) {
                if (Number(isBuyArray[1]) == idx) {
                    var hasGetSp = BaseBitmap.create("public_buy");
                    hasGetSp.setPosition(bgContainer.width - hasGetSp.width - 10, bgContainer.height / 2 - hasGetSp.height / 2);
                    bgContainer.addChild(hasGetSp);
                    // let hasGetSp:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_buy_already"),TextFieldConst.FONTSIZE_CONTENT_COMMON);
                    // hasGetSp.setPosition(itemBg.width - hasGetSp.width - 30, itemBg.height/2-hasGetSp.height/2);
                    // bgContainer.addChild(hasGetSp);
                }
            }
            else if (Number(isBuyArray[0]) == type) {
                var hasGetSp = BaseBitmap.create("public_buy");
                hasGetSp.setPosition(bgContainer.width - hasGetSp.width - 10, bgContainer.height / 2 - hasGetSp.height / 2);
                bgContainer.addChild(hasGetSp);
                // let hasGetSp:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_buy_already"),TextFieldConst.FONTSIZE_CONTENT_COMMON);
                // hasGetSp.setPosition(itemBg.width - hasGetSp.width - 30, itemBg.height/2-hasGetSp.height/2);
                // bgContainer.addChild(hasGetSp);
            }
        }
        return bgContainer;
    };
    AtkraceBuyPopupView.prototype.buyClick = function (idx) {
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
            var hasNum = Api.atkraceVoApi.getMyInfo().morale;
            if (needItem > hasNum) {
                App.CommonUtil.showTip(LanguageManager.getlocal("atkRace_buy_NotEnough"));
                return;
            }
        }
        this._clickIndex = idx;
        // this.showBuyAnim();
        this.request(NetRequestConst.REQUEST_ATKRACE_ATTRBUY, { atttype: info[1].toString(), attid: info[2] });
    };
    //请求回调
    AtkraceBuyPopupView.prototype.receiveData = function (data) {
        var rData = data.data;
        if (data.ret == false) {
            return;
        }
        if (rData.cmd == NetRequestConst.REQUEST_ATKRACE_ATTRBUYLIST) {
        }
        else if (rData.cmd == NetRequestConst.REQUEST_ATKRACE_ATTRBUY) {
            if (this._obj && this._callbackF) {
                this._callbackF.apply(this._obj);
            }
            this.showBuyAnim();
            // this._goldText.text = Api.playerVoApi.getPlayerGemStr();
            this._moraleText.text = Api.atkraceVoApi.getMyInfo().morale.toString();
        }
    };
    AtkraceBuyPopupView.prototype.showBuyAnim = function () {
        for (var key in this._buyBtnTab) {
            this._buyBtnTab[key].visible = false;
        }
        var collectFlag = BaseBitmap.create("public_buy");
        collectFlag.anchorOffsetX = collectFlag.width / 2;
        collectFlag.anchorOffsetY = collectFlag.height / 2;
        collectFlag.setPosition(508 - collectFlag.width / 2 - 10, 155 / 2);
        collectFlag.setScale(1.5);
        this._containerTab[this._clickIndex - 1].addChild(collectFlag);
        egret.Tween.get(collectFlag, { loop: false }).to({ scaleX: 1, scaleY: 1 }, 400).wait(300).call(this.hide, this);
    };
    AtkraceBuyPopupView.prototype.getShowHeight = function () {
        return 840;
    };
    AtkraceBuyPopupView.prototype.dispose = function () {
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
    return AtkraceBuyPopupView;
}(PopupView));
__reflect(AtkraceBuyPopupView.prototype, "AtkraceBuyPopupView");
