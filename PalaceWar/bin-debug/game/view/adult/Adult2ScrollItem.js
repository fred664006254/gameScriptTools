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
/**
 * 成年成亲子嗣栏位
 * author dky
 * date 2017/10/31
 * @class Adult2ScrollItem
 */
var Adult2ScrollItem = (function (_super) {
    __extends(Adult2ScrollItem, _super);
    function Adult2ScrollItem() {
        return _super.call(this) || this;
    }
    Adult2ScrollItem.prototype.initItem = function (index, adultInfoVo) {
        // this._childIndex = posIndex;
        this.width = 604;
        this.height = 128 + this.getSpaceY();
        //1孩子 2空闲 3扩展
        var itemType = 1;
        var itemBg = BaseBitmap.create("public_9_bg27");
        itemBg.width = this.width;
        itemBg.height = this.height - 5;
        itemBg.x = this.width / 2 - itemBg.width / 2;
        itemBg.y = this.height / 2 - itemBg.height / 2;
        this.addChild(itemBg);
        var itemBg2 = BaseBitmap.create("public_9_bg26");
        itemBg2.width = this.width - 40;
        itemBg2.height = this.height - 45;
        itemBg2.x = 20;
        itemBg2.y = 10;
        itemBg2.name = "bg2";
        this.addChild(itemBg2);
        var childSexPic1 = "childview_boyicon";
        var childSexPic2 = "childview_girlicon";
        if (adultInfoVo.sex == 2) {
            childSexPic1 = "childview_girlicon";
            childSexPic2 = "childview_boyicon";
        }
        var childIcon = BaseBitmap.create(childSexPic1);
        childIcon.x = 40;
        childIcon.y = itemBg2.y + itemBg2.height / 2 - childIcon.height / 2;
        this.addChild(childIcon);
        var childName = adultInfoVo.name;
        var nameColor = TextFieldConst.COLOR_WHITE;
        var nameTF = ComponentManager.getTextField(childName, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        nameTF.textColor = nameColor;
        nameTF.x = 90;
        nameTF.y = 20;
        this.addChild(nameTF);
        var qualityStr = LanguageManager.getlocal("adult_quality") + LanguageManager.getlocal("adult_quality" + adultInfoVo.aquality);
        var qualityTF = ComponentManager.getTextField(qualityStr, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        qualityTF.textColor = nameColor;
        qualityTF.x = nameTF.x;
        qualityTF.y = nameTF.y + nameTF.height + 7;
        this.addChild(qualityTF);
        var attrStr = LanguageManager.getlocal("servant_infoAttr") + adultInfoVo.attrVo.attTotal;
        var attrTF = ComponentManager.getTextField(attrStr, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        attrTF.textColor = nameColor;
        attrTF.x = nameTF.x;
        attrTF.y = qualityTF.y + qualityTF.height + 7;
        this.addChild(attrTF);
        //对面的小孩
        var childIcon2 = BaseBitmap.create(childSexPic2);
        childIcon2.x = 330;
        childIcon2.y = itemBg2.y + itemBg2.height / 2 - childIcon.height / 2;
        this.addChild(childIcon2);
        var childName2 = adultInfoVo.fname;
        var nameTF2 = ComponentManager.getTextField(childName2, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        nameTF2.textColor = nameColor;
        nameTF2.x = 380;
        nameTF2.y = nameTF.y;
        this.addChild(nameTF2);
        var qualityTF2 = ComponentManager.getTextField(qualityStr, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        qualityTF2.textColor = nameColor;
        qualityTF2.x = nameTF2.x;
        qualityTF2.y = nameTF2.y + nameTF2.height + 7;
        this.addChild(qualityTF2);
        var attrStr2 = LanguageManager.getlocal("servant_infoAttr") + adultInfoVo.ftotal;
        var attrTF2 = ComponentManager.getTextField(attrStr2, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        attrTF2.textColor = nameColor;
        attrTF2.x = nameTF2.x;
        attrTF2.y = qualityTF2.y + qualityTF2.height + 7;
        this.addChild(attrTF2);
        //结婚时间
        var timeStr = App.DateUtil.getFormatBySecond(adultInfoVo.mts, 2);
        var timeTF = ComponentManager.getTextField(timeStr, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        timeTF.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        timeTF.x = 100;
        timeTF.y = itemBg2.y + itemBg2.height + 6;
        this.addChild(timeTF);
        //亲家
        var nameStr = LanguageManager.getlocal("adultOtherName") + adultInfoVo.funame;
        var otherNameTF = ComponentManager.getTextField(nameStr, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        otherNameTF.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        otherNameTF.x = 400;
        otherNameTF.y = timeTF.y;
        this.addChild(otherNameTF);
        if (PlatformManager.checkIsEnLang()) {
            timeTF.x = 50;
            otherNameTF.x = itemBg.x + itemBg.width - 50 - otherNameTF.width;
        }
    };
    Adult2ScrollItem.prototype.refreshData = function (index) {
    };
    Adult2ScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    Adult2ScrollItem.prototype.dispose = function () {
        this._adultInfo = null;
        _super.prototype.dispose.call(this);
    };
    return Adult2ScrollItem;
}(ScrollListItem));
__reflect(Adult2ScrollItem.prototype, "Adult2ScrollItem");
//# sourceMappingURL=Adult2ScrollItem.js.map