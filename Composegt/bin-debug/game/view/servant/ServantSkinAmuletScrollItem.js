/**
 * 门客信息,突破技能
 * author yanyuling
 * date 2017/11/21
 * @class ServantSkinAmuletScrollItem
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
var ServantSkinAmuletScrollItem = (function (_super) {
    __extends(ServantSkinAmuletScrollItem, _super);
    function ServantSkinAmuletScrollItem() {
        var _this = _super.call(this) || this;
        _this._auarKey = "";
        _this._levelupTipStr = "";
        _this._itemList = [];
        _this._isRequsting = false;
        _this._amuid = "";
        return _this;
    }
    ServantSkinAmuletScrollItem.prototype.init = function (index, data, servantId) {
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPAMUAURA),this.refreshAfterLv,this);
        var auarKey = data;
        this._auarKey = auarKey;
        this._amuid = data;
        this._serid = servantId;
        var bottomBg = BaseBitmap.create("public_listbg");
        bottomBg.width = 592;
        bottomBg.height = 138;
        bottomBg.y = 0;
        bottomBg.visible = false;
        this.addChild(bottomBg);
        var leftBg = BaseBitmap.create("public_left");
        leftBg.width = 129;
        leftBg.height = bottomBg.height - 19;
        leftBg.x = 5.5;
        leftBg.y = 5.5;
        leftBg.visible = false;
        this.addChild(leftBg);
        var amuletcfg = Config.AmuletCfg.getAmucfgIndex(this._amuid);
        var auraIcon = "servant_aura_Icon" + amuletcfg.iconID;
        var icon = BaseLoadBitmap.create(auraIcon);
        icon.x = 30;
        icon.y = leftBg.y + 6.5;
        icon.width = icon.height = 108;
        this.addChild(icon);
        var servantNameBg = BaseBitmap.create("servant_biaoti2");
        this.addChild(servantNameBg);
        servantNameBg.x = icon.x + icon.width + 30;
        servantNameBg.y = 5;
        servantNameBg.width = 185;
        var skillName = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
        skillName.textColor = TextFieldConst.COLOR_BROWN_NEW;
        skillName.x = icon.x + icon.width + 50;
        skillName.y = icon.y + 3;
        skillName.name = "skillName";
        this.addChild(skillName);
        var curValueTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
        curValueTxt.x = skillName.x;
        curValueTxt.y = skillName.y + 35;
        this.addChild(curValueTxt);
        curValueTxt.name = "curValueTxt";
        var nextValueTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
        nextValueTxt.x = skillName.x;
        nextValueTxt.y = curValueTxt.y + 25;
        this.addChild(nextValueTxt);
        nextValueTxt.name = "nextValueTxt";
        var upNeedTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
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
        topLvTxt.x = goBtn.x + goBtn.width / 2 - topLvTxt.width / 2 - 10;
        topLvTxt.y = goBtn.y + goBtn.height / 2 - topLvTxt.height / 2 - 40;
        topLvTxt.visible = false;
        topLvTxt.name = "topLvTxt";
        this.addChild(topLvTxt);
        this.refreshAfterLv();
    };
    ServantSkinAmuletScrollItem.prototype.refreshAfterLv = function (event) {
        if (event && !this._isRequsting) {
            this._isRequsting = false;
            return;
        }
        if (event && event.data.data.ret == 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("wifeSkillUpdSuccess"));
            var servObj = Api.servantVoApi.getServantObj(this._serid);
            if (servObj && servObj.isShowRedForaura()) {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_SERVANT_ITEMLIST);
            }
        }
        var servantId = this._serid;
        var auraV = 1;
        var servantObj = Api.servantVoApi.getServantObj(servantId);
        if (servantObj) {
            var amuAuraList = servantObj.getAmuletAuraList();
            auraV = amuAuraList[this._amuid] || 1;
        }
        var servantcfg = Config.ServantCfg.getServantItemById(servantId);
        var amuletcfg = Config.AmuletCfg.getAmucfgIndex(this._amuid);
        var curData = amuletcfg.amuletEffect;
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
        var addNum1 = "";
        var addNum2 = "";
        var nextLvAdd = 1;
        this._levelupTipStr = "";
        var amuBasecfg = Config.AmuletaruaCfg.getAmuletAuraItemById(this._amuid);
        var attrLvList = amuBasecfg.attrLvList;
        addNum1 = (attrLvList[auraV - 1].attEffect * 100).toFixed(1) + "%";
        if (Api.amuletVoApi.getAmuletNum(this._serid, this._amuid) < curData.attNum) {
            this._levelupTipStr = LanguageManager.getlocal("servant_amuletAura_lvtip");
        }
        str1 = LanguageManager.getlocal("servant_fourlevelupTxt1", [attStr + addNum1]);
        var goBtnAvaiable = false;
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
            goBtnAvaiable = true;
            if (auraV >= attrLvList.length) {
                isAtTopLv = true;
                str3 = "";
                str2 = LanguageManager.getlocal("servant_fourlevelupTxt2", [LanguageManager.getlocal("servant_fourlevelupTxt5")]);
            }
            else {
                addNum2 = (attrLvList[auraV].attEffect * 100).toFixed(1) + "%";
                str2 = LanguageManager.getlocal("servant_fourlevelupTxt2", [attStr + addNum2]);
            }
        }
        var nameStr = LanguageManager.getlocal("servant_fourPeopleaura" + amuletcfg.iconID) + " Lv : " + auraV;
        skillName.text = nameStr;
        curValueTxt.text = str1;
        nextValueTxt.text = str2;
        upNeedTxt.text = str3;
        // if(isAtTopLv){
        // 	topLvTxt.visible = true;
        goBtn.visible = false;
        // }else{
        // 	topLvTxt.visible = false;
        // 	if (goBtnAvaiable)
        // 	{
        // 	goBtn.visible = true;
        // 	}else{
        // 		goBtn.visible = false;
        // 	}
        // }
    };
    ServantSkinAmuletScrollItem.prototype.doRequest = function () {
        var servantId = ServantInfoFourItemScrollItem.servantId;
        var auarKey = this._auarKey;
        this._isRequsting = true;
        NetManager.request(NetRequestConst.REQUEST_SERVANT_UPAMUAURA, { amuletId: this._amuid });
    };
    ServantSkinAmuletScrollItem.prototype.goBtnHandler = function () {
        if (this._levelupTipStr != "") {
            App.CommonUtil.showTip(this._levelupTipStr);
            return;
        }
        this.doRequest();
        // let itemInfo = this._itemList[0];
        // let itemcfg = Config.ItemCfg.getItemCfgById(itemInfo.id)
        // let tmpStr = itemInfo.name + "*" + itemInfo.num + " ";
        // let message: string = LanguageManager.getlocal("servant_fourlevelupTxt4", [tmpStr]);
        // let mesObj = {
        // 	 confirmCallback: this.doRequest, 
        // 	 handler: this, 
        // 	 icon:  itemcfg.icon, 
        // 	 iconBg: itemcfg.iconBg, 
        // 	 num: Api.itemVoApi.getItemNumInfoVoById(itemInfo.id), 
        // 	 msg: message ,
        // 	 id : itemInfo.id,
        // 	 useNum : itemInfo.num
        // };
        // ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW,mesObj );		
    };
    ServantSkinAmuletScrollItem.prototype.dispose = function () {
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPAMUAURA),this.refreshAfterLv,this);
        this._auarKey = null;
        this._isRequsting = false;
        _super.prototype.dispose.call(this);
    };
    ServantSkinAmuletScrollItem.servantId = "";
    return ServantSkinAmuletScrollItem;
}(BaseDisplayObjectContainer));
__reflect(ServantSkinAmuletScrollItem.prototype, "ServantSkinAmuletScrollItem");
