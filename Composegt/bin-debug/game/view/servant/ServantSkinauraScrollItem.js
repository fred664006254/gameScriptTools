/**
 * 门客皮肤头像
 * author yanyuling
 * date 2018/3/5
 * @class ServantSkinauraScrollItem
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
var ServantSkinauraScrollItem = (function (_super) {
    __extends(ServantSkinauraScrollItem, _super);
    function ServantSkinauraScrollItem() {
        var _this = _super.call(this) || this;
        _this._auarKey = "";
        _this._levelupTipStr = "";
        _this._itemList = [];
        _this._isRequsting = false;
        return _this;
    }
    ServantSkinauraScrollItem.prototype.init = function (skinId, auraId, serId) {
        this._auarKey = "" + auraId;
        var servantId = serId; //ServantInfoFourItemScrollItem.servantId;
        var servantObj = Api.servantVoApi.getServantObj(servantId);
        var servantcfg = Config.ServantCfg.getServantItemById(servantId);
        var bottomBg = BaseBitmap.create("public_9v_bg09");
        bottomBg.width = 582;
        bottomBg.height = 138;
        bottomBg.y = 0;
        this.addChild(bottomBg);
        var leftBg = BaseBitmap.create("public_left");
        leftBg.width = 109;
        leftBg.height = bottomBg.height - 19;
        leftBg.x = 5.5;
        leftBg.y = 5.5;
        this.addChild(leftBg);
        var skin_auraList = Config.ServantskinCfg.getServantSkinItemById(skinId).aura || [];
        var auraIcon = skin_auraList[this._auarKey].auraIcon;
        var icon = BaseLoadBitmap.create("servant_aura_Icon" + auraIcon);
        icon.x = 4;
        icon.y = leftBg.y + 6.5;
        icon.width = icon.height = 108;
        this.addChild(icon);
        var servantNameBg = BaseBitmap.create("servant_biaoti2");
        this.addChild(servantNameBg);
        servantNameBg.x = icon.x + icon.width + 20;
        servantNameBg.y = 5;
        servantNameBg.width = 185;
        var skillName = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        skillName.textColor = TextFieldConst.COLOR_BROWN_NEW;
        skillName.x = servantNameBg.x + servantNameBg.width / 2;
        skillName.y = icon.y + 3;
        skillName.name = "skillName";
        this.addChild(skillName);
        var curValueTxt = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_BROWN_NEW);
        curValueTxt.x = leftBg.x + leftBg.width + 15; //skillName.x;
        curValueTxt.y = skillName.y + 35;
        this.addChild(curValueTxt);
        curValueTxt.name = "curValueTxt";
        var nextValueTxt = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_BROWN_NEW);
        nextValueTxt.x = curValueTxt.x;
        nextValueTxt.y = curValueTxt.y + 25;
        this.addChild(nextValueTxt);
        nextValueTxt.name = "nextValueTxt";
        var upNeedTxt = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_BROWN_NEW);
        upNeedTxt.x = curValueTxt.x;
        upNeedTxt.y = nextValueTxt.y + 25;
        this.addChild(upNeedTxt);
        upNeedTxt.name = "upNeedTxt";
        var auraList = servantcfg.aura || [];
        var curData = skin_auraList[this._auarKey];
        var auraV = 1;
        if (Api.servantVoApi.isOwnSkinOfSkinId("" + skinId)) {
            auraV = servantObj.getSkinAuraLevel(this._auarKey);
        }
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
            }
        }
        else {
            this._levelupTipStr = "";
            goBtnAvaiable = true;
            if (auraV >= curData.maxLv) {
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
                    this._levelupTipStr = LanguageManager.getlocal("servant_bookUpTip1");
                    str3 = LanguageManager.getlocal("servant_fourlevelupTxt3", [str3]);
                }
                else {
                    str3 = LanguageManager.getlocal("servant_fourlevelupTxt6", [str3]);
                }
                // }
            }
        }
        var nameStr = LanguageManager.getlocal("servant_fourPeopleaura" + curData.auraIcon) + " Lv : " + auraV;
        skillName.text = nameStr;
        skillName.anchorOffsetX = skillName.width / 2;
        curValueTxt.text = str1;
        nextValueTxt.text = str2;
        upNeedTxt.text = str3;
    };
    ServantSkinauraScrollItem.prototype.dispose = function () {
        this._auarKey = null;
        this._isRequsting = false;
        _super.prototype.dispose.call(this);
    };
    ServantSkinauraScrollItem.servantId = "";
    return ServantSkinauraScrollItem;
}(BaseDisplayObjectContainer));
__reflect(ServantSkinauraScrollItem.prototype, "ServantSkinauraScrollItem");
