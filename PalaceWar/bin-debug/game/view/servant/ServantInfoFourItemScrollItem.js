/**
 * 门客信息,突破技能
 * author yanyuling
 * date 2017/11/21
 * @class ServantInfoFourItemScrollItem
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ServantInfoFourItemScrollItem = /** @class */ (function (_super) {
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
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPAURA), this.refreshItem, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPSKINSPECIALAURA), this.refreshItem, this);
        var auarKey = data;
        this._auarKey = auarKey;
        var bottomBg = BaseBitmap.create("public_9_managebg");
        bottomBg.width = 592;
        bottomBg.height = 126;
        bottomBg.y = 0;
        this.addChild(bottomBg);
        var servantcfg = Config.ServantCfg.getServantItemById(ServantInfoFourItemScrollItem.servantId);
        var servantSkinCfg = Config.ServantskinCfg.getServantSkinItemById(this._auarKey);
        var icon = null;
        if (servantSkinCfg) {
            icon = BaseLoadBitmap.create("servant_aura_Icon" + servantSkinCfg.specialAuraCfg.auraIcon);
            icon.x = icon.y = 10;
            icon.width = icon.height = 108;
            this.addChild(icon);
        }
        else {
            if (servantcfg.aura) {
                var auraList = servantcfg.aura;
                icon = BaseLoadBitmap.create("servant_aura_Icon" + auraList[this._auarKey].auraIcon);
                icon.x = icon.y = 10;
                icon.width = icon.height = 108;
                this.addChild(icon);
            }
        }
        var skillName = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        skillName.textColor = TextFieldConst.COLOR_QUALITY_YELLOW;
        skillName.x = icon.x + icon.width + 10;
        skillName.y = icon.y + 3;
        skillName.name = "skillName";
        this.addChild(skillName);
        var curValueTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        curValueTxt.x = skillName.x;
        curValueTxt.y = skillName.y + 25;
        this.addChild(curValueTxt);
        curValueTxt.name = "curValueTxt";
        var nextValueTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        nextValueTxt.x = skillName.x;
        nextValueTxt.y = curValueTxt.y + 25;
        this.addChild(nextValueTxt);
        nextValueTxt.name = "nextValueTxt";
        var upNeedTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        upNeedTxt.x = skillName.x;
        upNeedTxt.y = nextValueTxt.y + 25;
        this.addChild(upNeedTxt);
        upNeedTxt.name = "upNeedTxt";
        var goBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "servantFour_goBtn", this.goBtnHandler, this);
        goBtn.x = bottomBg.x + bottomBg.width - 140;
        goBtn.y = bottomBg.y + bottomBg.height / 2 - goBtn.height / 2;
        goBtn.visible = false;
        this.addChild(goBtn);
        goBtn.name = "goBtn";
        var topLvTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeSkillMaxShow"), TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_WARN_RED);
        topLvTxt.x = goBtn.x + goBtn.width / 2 - topLvTxt.width / 2;
        topLvTxt.y = goBtn.y + goBtn.height / 2 - topLvTxt.height / 2;
        topLvTxt.visible = false;
        topLvTxt.name = "topLvTxt";
        this.addChild(topLvTxt);
        this.refreshItem();
    };
    ServantInfoFourItemScrollItem.prototype.refreshItem = function (event) {
        var servantSkinCfg = Config.ServantskinCfg.getServantSkinItemById(this._auarKey);
        if (servantSkinCfg) {
            this.refreshAfterLvBySkinOpen(event);
        }
        else {
            this.refreshAfterLv(event);
        }
    };
    //是由皮肤开启的门客光环加成
    ServantInfoFourItemScrollItem.prototype.refreshAfterLvBySkinOpen = function (event) {
        if (event && !this._isRequsting) {
            this._isRequsting = false;
            return;
        }
        if (event && event.data.data.ret == 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("wifeSkillUpdSuccess"));
            var servObj = Api.servantVoApi.getServantObj(ServantInfoFourItemScrollItem.servantId);
            // if(servObj && servObj.isShowRedForaura())
            // {
            // 	App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_SERVANT_ITEMLIST);
            // }
            if (servObj) {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_SERVANT_ITEMLIST);
            }
        }
        var servantId = ServantInfoFourItemScrollItem.servantId;
        var servantObj = Api.servantVoApi.getServantObj(servantId);
        var servantSkinCfg = Config.ServantskinCfg.getServantSkinItemById(this._auarKey);
        var servantskinAuraCfg = servantSkinCfg.specialAuraCfg;
        var skillName = this.getChildByName("skillName");
        var curValueTxt = this.getChildByName("curValueTxt");
        var nextValueTxt = this.getChildByName("nextValueTxt");
        var upNeedTxt = this.getChildByName("upNeedTxt");
        var goBtn = this.getChildByName("goBtn");
        var topLvTxt = this.getChildByName("topLvTxt");
        var str1 = "";
        var str2 = "";
        var str3 = "";
        var attStr = "";
        var add1 = "";
        var addNum1 = "";
        var addNum2 = "";
        var nextLvAdd = 1;
        var servant = Api.servantVoApi.getServantObj(servantId);
        var skinvo = servant.skin[Number(servantSkinCfg.id)];
        var auarV = 0;
        if (skinvo) {
            auarV = skinvo.specialAura;
        }
        if (!auarV) {
            auarV = 1;
        }
        if (servantskinAuraCfg.specialAuraType.length == 4) {
            attStr = LanguageManager.getlocal("wifeSkillAllAttAdd");
        }
        else {
            for (var index1 = 0; index1 < servantskinAuraCfg.specialAuraType.length; index1++) {
                var element = servantskinAuraCfg.specialAuraType[index1];
                if (index1 == 0) {
                    attStr = LanguageManager.getlocal("servantInfo_speciality" + element);
                }
                else {
                    attStr = attStr + "、" + LanguageManager.getlocal("servantInfo_speciality" + element);
                }
            }
            attStr = attStr + LanguageManager.getlocal("wifeSkillAttAdd");
        }
        if (servantskinAuraCfg.specialAuraLvValue < 1) {
            addNum1 = (servantskinAuraCfg.specialAuraLvValue * 100 * (auarV - 1) + servantskinAuraCfg.specialAuraValue * 100) + "%";
            addNum2 = (servantskinAuraCfg.specialAuraLvValue * 100 * (auarV + nextLvAdd - 1) + servantskinAuraCfg.specialAuraValue * 100) + "%";
        }
        else {
            addNum1 = (servantskinAuraCfg.specialAuraLvValue * auarV).toString();
            addNum2 = (servantskinAuraCfg.specialAuraLvValue * (auarV + nextLvAdd)).toString();
        }
        add1 = addNum1;
        str1 = LanguageManager.getlocal("servant_fourlevelupTxt1", [attStr + addNum1]);
        if (auarV >= servantskinAuraCfg.specialAuraLvMax) {
            str2 = LanguageManager.getlocal("servant_fourlevelupTxt2", [LanguageManager.getlocal("servant_fourlevelupTxt5")]);
            str3 = "";
            goBtn.visible = false;
            topLvTxt.visible = true;
        }
        else {
            goBtn.visible = true;
            topLvTxt.visible = false;
            str2 = LanguageManager.getlocal("servant_fourlevelupTxt2", [attStr + addNum2]);
            var ownNum = Api.itemVoApi.getItemNumInfoVoById(servantskinAuraCfg.specialAuraLvNeed);
            var itemCfg = Config.ItemCfg.getItemCfgById(servantskinAuraCfg.specialAuraLvNeed);
            str3 += itemCfg.name + "(" + ownNum + "/" + (servantskinAuraCfg.specialAuraLvNeedNum[auarV - 1]) + ")  ";
            if (ownNum < servantskinAuraCfg.specialAuraLvNeedNum[auarV - 1] && this._levelupTipStr == "") {
                this._levelupTipStr = LanguageManager.getlocal("operation_failed_tip", [itemCfg.name, itemCfg.dropDesc]);
                str3 = LanguageManager.getlocal("servant_fourlevelupTxt3", [str3]);
            }
            else {
                str3 = LanguageManager.getlocal("servant_fourlevelupTxt6", [str3]);
            }
        }
        var nameStr = LanguageManager.getlocal("servant_fourPeopleaura" + servantskinAuraCfg.auraIcon) + " Lv : " + auarV;
        skillName.text = nameStr;
        curValueTxt.text = str1;
        nextValueTxt.text = str2;
        upNeedTxt.text = str3;
    };
    ServantInfoFourItemScrollItem.prototype.refreshAfterLv = function (event) {
        if (event && !this._isRequsting) {
            this._isRequsting = false;
            return;
        }
        if (event && event.data.data.ret == 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("wifeSkillUpdSuccess"));
            var servObj = Api.servantVoApi.getServantObj(ServantInfoFourItemScrollItem.servantId);
            // if(servObj && servObj.isShowRedForaura())
            // {
            // 	App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_SERVANT_ITEMLIST);
            // }
            if (servObj) {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_SERVANT_ITEMLIST);
            }
        }
        var servantId = ServantInfoFourItemScrollItem.servantId;
        var servantcfg = Config.ServantCfg.getServantItemById(servantId);
        var auraList = servantcfg.aura;
        var keysList = Object.keys(auraList);
        var curData = auraList[this._auarKey];
        var servantObj = Api.servantVoApi.getServantObj(servantId);
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
        var auarV = servantObj.aura[this._auarKey];
        if (!auarV) {
            auarV = 0;
        }
        if (curData.growAtt < 1) {
            addNum1 = (curData.growAtt * 100 * auarV) + "%";
            addNum2 = (curData.growAtt * 100 * (auarV + nextLvAdd)) + "%";
        }
        else {
            addNum1 = (curData.growAtt * auarV).toString();
            addNum2 = (curData.growAtt * (auarV + nextLvAdd)).toString();
        }
        add1 = addNum1;
        str1 = LanguageManager.getlocal("servant_fourlevelupTxt1", [attStr + addNum1]);
        str2 = LanguageManager.getlocal("servant_fourlevelupTxt2", [attStr + addNum2]);
        var goBtnAvaiable = false;
        var isAtTopLv = false;
        if (curData.growNeed1 && curData.growNeed1.length > 0) {
            goBtnAvaiable = false;
            //是否满级,满级则隐藏该行
            if (auarV >= curData.maxLv) {
                isAtTopLv = true;
                nextLvAdd = 0;
                str3 = "";
                str2 = LanguageManager.getlocal("servant_fourlevelupTxt2", [LanguageManager.getlocal("servant_fourlevelupTxt5")]);
            }
            else {
                var sid = curData.growNeed1[auarV];
                // let auraV = servantObj.aura[this._auarKey]
                var str4 = LanguageManager.getlocal("servant_fourPeopleaura" + (curData.auraIcon));
                var tmpStr = LanguageManager.getlocal("servantWife_fourUpCost2", [auarV + 1, auarV, auarV + 1, str4]);
                str3 = LanguageManager.getlocal("servant_fourlevelupTxt7", [tmpStr]);
                // str3 = LanguageManager.getlocal("servant_fourlevelupTxt2",[LanguageManager.getlocal("servant_name"+sid)]);
            }
        }
        else {
            this._levelupTipStr = "";
            goBtnAvaiable = true;
            if (auarV >= curData.maxLv) {
                isAtTopLv = true;
                str3 = "";
                this._levelupTipStr = LanguageManager.getlocal("servant_skilllevelupTip2");
                str2 = LanguageManager.getlocal("servant_fourlevelupTxt2", [LanguageManager.getlocal("servant_fourlevelupTxt5")]);
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
                    this._levelupTipStr = LanguageManager.getlocal("operation_failed_tip", [item.name, item.dropDesc]);
                    str3 = LanguageManager.getlocal("servant_fourlevelupTxt3", [str3]);
                }
                else {
                    str3 = LanguageManager.getlocal("servant_fourlevelupTxt6", [str3]);
                }
                // }
            }
        }
        //4门客的光环3都达到最大等级才可升级光环4
        if (this._auarKey == '4' && !Api.servantVoApi.checkAura4CanLevelUp(servantId)) {
            var auar4 = 4;
            var nameGroupStr = LanguageManager.getlocal("servant_fourPeopleaura" + auraList['1'].auraIcon);
            var lastAuarGroupStr = LanguageManager.getlocal("servant_fourPeopleaura" + auraList[String(auar4 - 1)].auraIcon);
            this._levelupTipStr = LanguageManager.getlocal("servant_skilllevelupTip3", [nameGroupStr, lastAuarGroupStr]);
        }
        var nameStr = LanguageManager.getlocal("servant_fourPeopleaura" + curData.auraIcon) + " Lv : " + auarV;
        skillName.text = nameStr;
        curValueTxt.text = str1;
        nextValueTxt.text = str2;
        upNeedTxt.text = str3;
        if (isAtTopLv) {
            if (this._auarKey == "2" && goBtn.visible == true && auraList["3"] && Api.switchVoApi.checkOpenNewAura(auraList["3"].auraIcon)) {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_SERVAMNT_AURA_NEW);
            }
            if (this._auarKey == "3" && goBtn.visible == true && auraList["4"] && (Api.switchVoApi.checkOpenNewAura(auraList["4"].auraIcon) || Number(servantId) > 2018 || Number(servantId) < 2001)) {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_SERVAMNT_AURA_NEW);
            }
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
        var servantSkinCfg = Config.ServantskinCfg.getServantSkinItemById(this._auarKey);
        if (servantSkinCfg) {
            var requestFunc = function () {
                var servantId = ServantInfoFourItemScrollItem.servantId;
                var auarKey = this._auarKey;
                this._isRequsting = true;
                NetManager.request(NetRequestConst.REQUEST_SERVANT_UPSKINSPECIALAURA, { skinId: auarKey, servantId: servantId });
            };
            var cfg = servantSkinCfg.specialAuraCfg;
            var itemcfg = Config.ItemCfg.getItemCfgById(cfg.specialAuraLvNeed);
            var servant = Api.servantVoApi.getServantObj(ServantInfoFourItemScrollItem.servantId);
            var skinvo = servant.skin[Number(servantSkinCfg.id)];
            var auarV = 0;
            if (skinvo) {
                auarV = skinvo.specialAura;
            }
            if (!auarV) {
                auarV = 1;
            }
            var tmpStr = itemcfg.name + "*" + cfg.specialAuraLvNeedNum[auarV - 1] + " ";
            var message = LanguageManager.getlocal("servant_fourlevelupTxt4", [tmpStr]);
            var mesObj = {
                confirmCallback: requestFunc,
                handler: this,
                icon: itemcfg.icon,
                iconBg: itemcfg.iconBg,
                num: Api.itemVoApi.getItemNumInfoVoById(itemcfg.id),
                msg: message,
                id: itemcfg.id,
                useNum: cfg.specialAuraLvNeedNum[auarV - 1]
            };
            ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, mesObj);
        }
        else {
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
        }
    };
    ServantInfoFourItemScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPAURA), this.refreshItem, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPSKINSPECIALAURA), this.refreshItem, this);
        this._auarKey = null;
        this._isRequsting = false;
        _super.prototype.dispose.call(this);
    };
    ServantInfoFourItemScrollItem.servantId = "";
    return ServantInfoFourItemScrollItem;
}(ScrollListItem));
//# sourceMappingURL=ServantInfoFourItemScrollItem.js.map