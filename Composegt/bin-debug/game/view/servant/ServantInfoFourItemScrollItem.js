/**
 * 门客信息,突破技能
 * author yanyuling
 * date 2017/11/21
 * @class ServantInfoFourItemScrollItem
 */
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
var ServantInfoFourItemScrollItem = (function (_super) {
    __extends(ServantInfoFourItemScrollItem, _super);
    function ServantInfoFourItemScrollItem() {
        var _this = _super.call(this) || this;
        _this._auarKey = "";
        _this._levelupTipStr = "";
        _this._itemList = [];
        _this._isRequsting = false;
        return _this;
    }
    ServantInfoFourItemScrollItem.prototype.initItem = function (index, data) {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPAURA), this.refreshAfterLv, this);
        var auarKey = data;
        this._auarKey = auarKey;
        var bottomBg = BaseBitmap.create("public_listbg3");
        bottomBg.width = 599;
        bottomBg.height = 138;
        bottomBg.x = GameConfig.stageWidth / 2 - bottomBg.width / 2;
        bottomBg.y = 0;
        this._bottomBg = bottomBg;
        this.addChild(bottomBg);
        // let leftBg = BaseBitmap.create("public_left");
        // leftBg.width = 129;
        // leftBg.height = bottomBg.height-19;
        // leftBg.x =  bottomBg.x + 5.5;
        // leftBg.y =  5.5; 
        // this.addChild(leftBg); 
        var auraList = Config.ServantCfg.getServantItemById(ServantInfoFourItemScrollItem.servantId).aura || [];
        var skin_auraList = Api.servantVoApi.getServantObj(ServantInfoFourItemScrollItem.servantId).getAllSkinAuraList();
        var auraIcon = undefined;
        if (auraList[this._auarKey]) {
            auraIcon = auraList[this._auarKey].auraIcon;
        }
        else if (skin_auraList[this._auarKey]) {
            auraIcon = skin_auraList[this._auarKey].auraIcon;
        }
        var icon = BaseLoadBitmap.create("servant_aura_Icon" + auraIcon);
        icon.x = bottomBg.x + 14;
        icon.y = bottomBg.y + 8;
        icon.width = icon.height = 108;
        this.addChild(icon);
        // let servantNameBg =  BaseBitmap.create("servant_biaoti2");
        // this.addChild(servantNameBg)
        // servantNameBg.x = icon.x + icon.width + 30;
        // servantNameBg.y = 5;
        // servantNameBg.width= 185; 
        // let skillName = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
        var skillName = ComponentManager.getTextField("", 24);
        skillName.textColor = TextFieldConst.COLOR_BROWN_NEW;
        skillName.x = icon.x + icon.width + 50;
        skillName.y = bottomBg.y + 13; //icon.y + 5;
        skillName.name = "skillName";
        this.addChild(skillName);
        var curValueTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
        curValueTxt.x = skillName.x;
        curValueTxt.y = skillName.y + 35;
        this.addChild(curValueTxt);
        curValueTxt.name = "curValueTxt";
        var nextValueTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
        nextValueTxt.x = skillName.x;
        nextValueTxt.y = curValueTxt.y + 25;
        this.addChild(nextValueTxt);
        nextValueTxt.name = "nextValueTxt";
        var upNeedTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
        upNeedTxt.x = skillName.x;
        upNeedTxt.y = nextValueTxt.y + 25;
        upNeedTxt.width = 400;
        upNeedTxt.lineSpacing = 5;
        this.addChild(upNeedTxt);
        upNeedTxt.name = "upNeedTxt";
        var goBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "servantFour_goBtn", this.goBtnHandler, this);
        goBtn.x = bottomBg.x + bottomBg.width - 140;
        goBtn.y = bottomBg.y + bottomBg.height / 2 - goBtn.height / 2;
        goBtn.visible = false;
        this.addChild(goBtn);
        goBtn.name = "goBtn";
        var topLvTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeSkillMaxShow"), TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_WARN_RED);
        topLvTxt.x = goBtn.x + goBtn.width / 2 - topLvTxt.width / 2 - 10;
        topLvTxt.y = goBtn.y + goBtn.height / 2 - topLvTxt.height / 2 - 40;
        topLvTxt.visible = false;
        topLvTxt.name = "topLvTxt";
        this.addChild(topLvTxt);
        this.refreshAfterLv();
    };
    ServantInfoFourItemScrollItem.prototype.refreshAfterLv = function (event) {
        // if(event && !this._isRequsting)
        // {
        // 	this._isRequsting = false;
        // 	return;
        // }
        if (event && event.data.data.ret == 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("wifeSkillUpdSuccess"));
            var servObj = Api.servantVoApi.getServantObj(ServantInfoFourItemScrollItem.servantId);
            if (servObj && servObj.isShowRedForaura()) {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_SERVANT_ITEMLIST);
            }
        }
        var servantId = ServantInfoFourItemScrollItem.servantId;
        var servantObj = Api.servantVoApi.getServantObj(servantId);
        var servantcfg = Config.ServantCfg.getServantItemById(servantId);
        var auraList = servantcfg.aura || [];
        var skin_auraList = servantObj.getAllSkinAuraList();
        var curData = undefined;
        var auraV = 1;
        if (auraList[this._auarKey]) {
            auraV = servantObj.aura[this._auarKey];
            curData = auraList[this._auarKey];
        }
        else if (skin_auraList[this._auarKey]) {
            auraV = servantObj.getSkinAuraLevel(this._auarKey);
            curData = skin_auraList[this._auarKey];
        }
        var skillName = this.getChildByName("skillName");
        var curValueTxt = this.getChildByName("curValueTxt");
        var nextValueTxt = this.getChildByName("nextValueTxt");
        var upNeedTxt = this.getChildByName("upNeedTxt");
        var goBtn = this.getChildByName("goBtn");
        var topLvTxt = this.getChildByName("topLvTxt");
        //是否解锁
        var str1 = "";
        var str2 = "";
        var str3 = "";
        var attStr = "";
        if (curData.att.length == 4) {
            attStr = LanguageManager.getlocal("wifeSkillAllAttAdd");
        }
        else {
            for (var index1 = 0; index1 < curData.att.length; index1++) {
                var element = curData.att[index1];
                if (index1 == 0) {
                    attStr = LanguageManager.getlocal("servantInfo_speciality" + element);
                }
                else {
                    attStr = attStr + "、" + LanguageManager.getlocal("servantInfo_speciality" + element);
                }
            }
            attStr = attStr + LanguageManager.getlocal("wifeSkillAttAdd");
        }
        var add1 = "";
        var addNum1 = "";
        var addNum2 = "";
        var nextLvAdd = 1;
        if (curData.growAtt < 1) {
            addNum1 = (curData.growAtt * 100 * auraV) + "%";
            addNum2 = (curData.growAtt * 100 * (auraV + nextLvAdd)) + "%";
        }
        else {
            addNum1 = (curData.growAtt * auraV).toString();
            addNum2 = (curData.growAtt * (auraV + nextLvAdd)).toString();
        }
        add1 = addNum1;
        str1 = LanguageManager.getlocal("servant_fourlevelupTxt1", [attStr + addNum1]);
        str2 = LanguageManager.getlocal("servant_fourlevelupTxt2", [attStr + addNum2]);
        //按钮有效
        var goBtnAvaiable = false;
        //满级
        var isAtTopLv = false;
        if (curData.growNeed1 && curData.growNeed1.length > 0) {
            goBtnAvaiable = false;
            //是否满级,满级则隐藏该行
            if (auraV >= curData.maxLv) {
                isAtTopLv = true;
                nextLvAdd = 0;
                str3 = "";
                str2 = LanguageManager.getlocal("servant_fourlevelupTxt2", [LanguageManager.getlocal("servant_fourlevelupTxt5")]);
            }
            else {
                var auraVStr = "" + auraV;
                var sid = curData.growNeed1[auraVStr];
                var str4 = LanguageManager.getlocal("servant_fourPeopleaura" + (curData.auraIcon));
                var tmpStr = LanguageManager.getlocal("servantWife_fourUpCost2", ["" + (auraV + 1), auraVStr, "" + (auraV + 1), str4]);
                str3 = LanguageManager.getlocal("servant_fourlevelupTxt7", [tmpStr]);
                // str3 = LanguageManager.getlocal("servant_fourlevelupTxt2",[LanguageManager.getlocal("servant_name"+sid)]);
            }
        }
        else {
            this._levelupTipStr = "";
            goBtnAvaiable = true;
            if (auraV >= curData.maxLv) {
                if (curData.breakSwitch && Api.switchVoApi.checkCommonSwitch(curData.breakSwitch)) {
                    if (auraV >= curData.breakMaxlv) {
                        isAtTopLv = true;
                        str3 = "";
                        this._levelupTipStr = LanguageManager.getlocal("servant_skilllevelupTip2");
                        str2 = LanguageManager.getlocal("servant_fourlevelupTxt2", [LanguageManager.getlocal("servant_fourlevelupTxt5")]);
                    }
                    else {
                        var bLvUpDemandList = curData.breaklvUpDemand;
                        var unLock = true;
                        var needV = "1";
                        if (bLvUpDemandList && bLvUpDemandList.length > 0) {
                            for (var i = 0; i < bLvUpDemandList.length; i++) {
                                var bLvUpDemand = bLvUpDemandList[i];
                                var bLvUpDemandData = bLvUpDemand.split("_");
                                if (bLvUpDemandData.length > 0) {
                                    var serObj = Api.servantVoApi.getServantObj(bLvUpDemandData[0]);
                                    var servantcfg_1 = Config.ServantCfg.getServantItemById(bLvUpDemandData[0]);
                                    var auraList_1 = servantcfg_1.aura || [];
                                    var skin_auraList_1 = serObj.getAllSkinAuraList();
                                    var auraVV = 1;
                                    if (auraList_1[bLvUpDemandData[1]]) {
                                        auraVV = serObj.aura[bLvUpDemandData[1]];
                                    }
                                    else if (skin_auraList_1[bLvUpDemandData[1]]) {
                                        auraVV = serObj.getSkinAuraLevel(bLvUpDemandData[1]);
                                    }
                                    auraVV = auraVV ? auraVV : 0;
                                    needV = bLvUpDemandData[2];
                                    if (auraVV < Number(bLvUpDemandData[2])) {
                                        unLock = false;
                                        break;
                                    }
                                }
                            }
                        }
                        if (!unLock) {
                            goBtnAvaiable = false;
                            str3 = LanguageManager.getlocal("servant_fourlevelupTxt7", [LanguageManager.getlocal(curData.breakSwitch + "_locktxt", [needV, String(curData.breakMaxlv)])]);
                            // str2 = "";
                        }
                        else {
                            goBtnAvaiable = true;
                            var breakGrowNeedList = curData.breakGrowNeed;
                            var itemList = GameData.formatRewardItem(breakGrowNeedList[auraV - 10]);
                            this._itemList = itemList;
                            var item = this._itemList[0];
                            // for (var index = 0; index < itemList.length; index++) {
                            // let item:RewardItemVo = itemList[index];
                            var ownNum = Api.itemVoApi.getItemNumInfoVoById(item.id);
                            str3 += item.name + "(" + ownNum + "/" + item.num + ")  ";
                            if (ownNum < item.num && this._levelupTipStr == "") {
                                this._levelupTipStr = LanguageManager.getlocal("servant_bookUpTip1");
                                if (skin_auraList[this._auarKey]) {
                                    this._levelupTipStr = LanguageManager.getlocal("servant_skilllevelupTip3");
                                }
                                str3 = LanguageManager.getlocal("servant_fourlevelupTxt3", [str3]);
                            }
                            else {
                                str3 = LanguageManager.getlocal("servant_fourlevelupTxt6", [str3]);
                            }
                        }
                    }
                }
                else {
                    isAtTopLv = true;
                    str3 = "";
                    this._levelupTipStr = LanguageManager.getlocal("servant_skilllevelupTip2");
                    str2 = LanguageManager.getlocal("servant_fourlevelupTxt2", [LanguageManager.getlocal("servant_fourlevelupTxt5")]);
                }
            }
            else {
                var itemList = GameData.formatRewardItem(curData.growNeed2);
                this._itemList = itemList;
                var item = this._itemList[0];
                // for (var index = 0; index < itemList.length; index++) {
                // let item:RewardItemVo = itemList[index];
                var ownNum = Api.itemVoApi.getItemNumInfoVoById(item.id);
                str3 += item.name + "(" + ownNum + "/" + item.num + ")  ";
                if (ownNum < item.num && this._levelupTipStr == "") {
                    this._levelupTipStr = LanguageManager.getlocal("servant_bookUpTip1");
                    if (skin_auraList[this._auarKey]) {
                        this._levelupTipStr = LanguageManager.getlocal("servant_skilllevelupTip3");
                    }
                    str3 = LanguageManager.getlocal("servant_fourlevelupTxt3", [str3]);
                }
                else {
                    str3 = LanguageManager.getlocal("servant_fourlevelupTxt6", [str3]);
                }
                // }
            }
        }
        var lvUpDemand = curData.lvUpDemand;
        if (lvUpDemand && this._levelupTipStr == "") {
            for (var index = 0; index < lvUpDemand.length; index++) {
                var element_1 = lvUpDemand[index];
                var elementInfo = element_1.split("_");
                var preAura = auraList[elementInfo[0]]; // 
                if (servantObj.aura[elementInfo[0]] < elementInfo[1]) {
                    var iconStr = LanguageManager.getlocal("servant_fourPeopleaura" + (preAura.auraIcon));
                    this._levelupTipStr += LanguageManager.getlocal("servant_skilllevelupTip4", [iconStr, elementInfo[1]]);
                }
            }
            if (this._levelupTipStr != "") {
                if (PlatformManager.checkIsKRSp()) {
                    this._levelupTipStr = LanguageManager.getlocal("servant_skilllevelupTip5") + this._levelupTipStr;
                }
                else {
                    this._levelupTipStr += LanguageManager.getlocal("servant_skilllevelupTip5");
                }
            }
        }
        var nameStr = LanguageManager.getlocal("servant_fourPeopleaura" + curData.auraIcon) + " Lv : " + auraV;
        skillName.text = nameStr;
        curValueTxt.text = str1;
        nextValueTxt.text = str2;
        upNeedTxt.text = str3;
        if (isAtTopLv) {
            topLvTxt.visible = true;
            goBtn.visible = false;
        }
        else {
            topLvTxt.visible = false;
            if (goBtnAvaiable) {
                goBtn.visible = true;
            }
            else {
                goBtn.visible = false;
            }
        }
        if (upNeedTxt.y + upNeedTxt.height + 20 > 138) {
            var oldH = 0;
            var oldPH = 0;
            var newH = 0;
            var newPH = 0;
            if (this.parent) {
                oldH = this._bottomBg.height;
                oldPH = this.parent.height;
            }
            this._bottomBg.height = upNeedTxt.y + upNeedTxt.height + 20;
            if (this.parent) {
                this.height = this._bottomBg.height;
                newH = this._bottomBg.height;
                newPH = oldPH + newH - oldH;
                this.parent.height = newPH;
            }
            // this.height+this.getSpaceY();
        }
    };
    ServantInfoFourItemScrollItem.prototype.doRequest = function () {
        var servantId = ServantInfoFourItemScrollItem.servantId;
        var auarKey = this._auarKey;
        this._isRequsting = true;
        NetManager.request(NetRequestConst.REQUEST_SERVANT_UPAURA, { auraId: auarKey, servantId: servantId });
    };
    ServantInfoFourItemScrollItem.prototype.goBtnHandler = function () {
        if (this._levelupTipStr != "") {
            App.CommonUtil.showTip(this._levelupTipStr);
            return;
        }
        var itemInfo = this._itemList[0];
        var itemcfg = Config.ItemCfg.getItemCfgById(itemInfo.id);
        var tmpStr = itemInfo.name + "*" + itemInfo.num + " ";
        var message = LanguageManager.getlocal("servant_fourlevelupTxt4", [tmpStr]);
        var mesObj = {
            confirmCallback: this.doRequest,
            handler: this,
            icon: itemcfg.icon,
            iconBg: itemcfg.iconBg,
            num: Api.itemVoApi.getItemNumInfoVoById(itemInfo.id),
            msg: message,
            id: itemInfo.id,
            useNum: itemInfo.num
        };
        ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, mesObj);
    };
    ServantInfoFourItemScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPAURA), this.refreshAfterLv, this);
        this._auarKey = null;
        this._isRequsting = false;
        this._bottomBg = null;
        this._levelupTipStr = "";
        _super.prototype.dispose.call(this);
    };
    ServantInfoFourItemScrollItem.servantId = "";
    return ServantInfoFourItemScrollItem;
}(ScrollListItem));
__reflect(ServantInfoFourItemScrollItem.prototype, "ServantInfoFourItemScrollItem");
