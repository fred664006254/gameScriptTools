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
var AcStargazerScrollItem = (function (_super) {
    __extends(AcStargazerScrollItem, _super);
    function AcStargazerScrollItem() {
        var _this = _super.call(this) || this;
        _this._auarKey = "";
        _this._levelupTipStr = "";
        _this._itemList = [];
        _this._isRequsting = false;
        return _this;
    }
    AcStargazerScrollItem.prototype.init = function (data) {
        // }
        // protected initItem(index:number,data:any)
        // {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPAURA), this.refreshAfterLv, this);
        var auarKey = data;
        this._auarKey = auarKey;
        var bottomBg = BaseBitmap.create("public_9v_bg09");
        bottomBg.width = 500;
        bottomBg.height = 133;
        bottomBg.y = 0;
        this.addChild(bottomBg);
        var leftBg = BaseBitmap.create("public_left");
        leftBg.width = 129;
        leftBg.height = bottomBg.height - 15;
        leftBg.x = 5.5;
        leftBg.y = 5.5;
        this.addChild(leftBg);
        var auraList = Config.ServantCfg.getServantItemById(AcStargazerScrollItem.servantId).aura || [];
        var skin_auraList = [];
        var auraIcon = undefined;
        if (auraList[this._auarKey]) {
            auraIcon = auraList[this._auarKey].auraIcon;
        }
        else if (skin_auraList[this._auarKey]) {
            auraIcon = skin_auraList[this._auarKey].auraIcon;
        }
        var icon = BaseLoadBitmap.create("servant_aura_Icon" + auraIcon);
        icon.x = 14;
        icon.y = leftBg.y + 6.5;
        icon.width = icon.height = 108;
        this.addChild(icon);
        var servantNameBg = BaseBitmap.create("servant_biaoti2");
        this.addChild(servantNameBg);
        servantNameBg.visible = false;
        servantNameBg.x = icon.x + icon.width + 30;
        servantNameBg.y = 5;
        servantNameBg.width = 185;
        var skillName = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        skillName.textColor = TextFieldConst.COLOR_BROWN;
        skillName.x = icon.x + icon.width + 30;
        skillName.y = icon.y + 3;
        skillName.name = "skillName";
        this.addChild(skillName);
        var curValueTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        curValueTxt.x = skillName.x;
        curValueTxt.y = skillName.y + 35;
        this.addChild(curValueTxt);
        curValueTxt.name = "curValueTxt";
        var nextValueTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        nextValueTxt.x = skillName.x;
        nextValueTxt.y = curValueTxt.y + 25;
        this.addChild(nextValueTxt);
        nextValueTxt.name = "nextValueTxt";
        var upNeedTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        upNeedTxt.x = skillName.x;
        upNeedTxt.y = nextValueTxt.y + 25;
        this.addChild(upNeedTxt);
        upNeedTxt.name = "upNeedTxt";
        this.refreshAfterLv();
    };
    AcStargazerScrollItem.prototype.refreshAfterLv = function (event) {
        var servantId = AcStargazerScrollItem.servantId;
        var servantcfg = Config.ServantCfg.getServantItemById(servantId);
        var auraList = servantcfg.aura || [];
        var skin_auraList = [];
        var curData = undefined;
        var auraV = 0;
        if (auraList[this._auarKey]) {
            curData = auraList[this._auarKey];
        }
        else if (skin_auraList[this._auarKey]) {
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
        var nameStr = LanguageManager.getlocal("servant_fourPeopleaura" + curData.auraIcon) + " Lv : " + auraV;
        skillName.text = nameStr;
        curValueTxt.text = str2; //"";// str1;
        nextValueTxt.text = ""; //str2;
        upNeedTxt.text = ""; // str3;
    };
    AcStargazerScrollItem.prototype.doRequest = function () {
        var servantId = ServantInfoFourItemScrollItem.servantId;
        var auarKey = this._auarKey;
        this._isRequsting = true;
        NetManager.request(NetRequestConst.REQUEST_SERVANT_UPAURA, { auraId: auarKey, servantId: servantId });
    };
    AcStargazerScrollItem.prototype.goBtnHandler = function () {
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
    AcStargazerScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPAURA), this.refreshAfterLv, this);
        AcStargazerScrollItem.servantId = "";
        this._auarKey = "";
        this._levelupTipStr = "";
        this._itemList = [];
        this._isRequsting = false;
        _super.prototype.dispose.call(this);
    };
    AcStargazerScrollItem.servantId = "";
    return AcStargazerScrollItem;
}(BaseDisplayObjectContainer));
__reflect(AcStargazerScrollItem.prototype, "AcStargazerScrollItem");
