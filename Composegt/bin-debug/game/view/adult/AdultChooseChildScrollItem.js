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
 *选孩子结婚
 * author dky
 * date 2017/11/1
 * @class AdultChooseChildScrollItem
 */
var AdultChooseChildScrollItem = (function (_super) {
    __extends(AdultChooseChildScrollItem, _super);
    function AdultChooseChildScrollItem() {
        return _super.call(this) || this;
    }
    AdultChooseChildScrollItem.prototype.initItem = function (index, childInfo) {
        this.width = 618;
        this.height = 185 + this.getSpaceY();
        this._childInfo = childInfo;
        var bg = BaseBitmap.create("public_listbg");
        bg.width = this.width;
        bg.height = 185;
        bg.x = 5;
        this.addChild(bg);
        var childbg = BaseBitmap.create("adult_middlebg");
        this.addChild(childbg);
        childbg.x = bg.x + 6;
        childbg.y = bg.y + bg.height / 2 - childbg.height / 2 - 4;
        var iconStr = "adult_boy";
        if (childInfo.sex == 2) {
            iconStr = "adult_girl";
        }
        var icon = BaseBitmap.create(iconStr);
        icon.x = bg.x + 40;
        icon.y = 13;
        icon.setScale(0.42);
        this.addChild(icon);
        var qualityBg = BaseBitmap.create("adult_namebg");
        qualityBg.x = childbg.x + 10;
        qualityBg.y = childbg.y + 10;
        qualityBg.setScale(0.7);
        this.addChild(qualityBg);
        var qualityBB = BaseLoadBitmap.create("adult_q" + childInfo.aquality);
        qualityBB.x = childbg.x + 10;
        qualityBB.y = childbg.y + 15;
        qualityBB.setScale(0.7);
        this.addChild(qualityBB);
        if (PlatformManager.checkIsTextHorizontal()) {
            qualityBg.rotation = -90;
            qualityBg.x = childbg.x + 40;
            qualityBg.y = childbg.y + childbg.height - 10;
            qualityBB.width = 156;
            qualityBB.height = 46;
            qualityBB.x = qualityBg.x;
            qualityBB.y = qualityBg.y - 32;
        }
        var nameTF = ComponentManager.getTextField(childInfo.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        nameTF.x = childbg.x + childbg.width + 10;
        nameTF.y = childbg.y + 7;
        this.addChild(nameTF);
        var fatherStr = LanguageManager.getlocal("adultMarryFather") + Api.playerVoApi.getPlayerName();
        var fatherTF = ComponentManager.getTextField(fatherStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        fatherTF.x = nameTF.x;
        fatherTF.y = nameTF.y + 30;
        this.addChild(fatherTF);
        var attrStr = LanguageManager.getlocal("servant_infoAttr") + childInfo.attrVo.attTotal;
        var attrTF = ComponentManager.getTextField(attrStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        attrTF.x = nameTF.x;
        attrTF.y = fatherTF.y + 30;
        this.addChild(attrTF);
        //新增亲家
        if (Api.adultVoApi.judgeIsSudan(childInfo.info.uid)) {
            //属性加成
            var visitlevel = 0; //Api.adultVoApi.getVisitLevel(childInfo.info);
            // let info = Api.adultVoApi.getAdultInfoVoById(bData.childid);
            var str = ''; //Api.adultVoApi.getVisitLevel(childInfo);
            var baifang = false;
            var laifang = false;
            var hufang = false;
            if (childInfo.visit == childInfo.info.uid) {
                baifang = true;
            }
            if (childInfo.info.visit == Api.playerVoApi.getPlayerID()) {
                laifang = true;
            }
            hufang = baifang && laifang;
            if (hufang) {
                visitlevel = 3;
            }
            else if (baifang) {
                visitlevel = 1;
            }
            else if (laifang) {
                visitlevel = 2;
            }
            if (visitlevel) {
                var arrtnum = Config.SadunCfg["addExtent" + (visitlevel == 3 ? 2 : 1)] * 100;
                var attradd = ComponentManager.getTextField(LanguageManager.getlocal("adultVisitLevel" + visitlevel, [arrtnum.toString()]), 20, 0x3e9b00);
                this.setLayoutPosition(LayoutConst.lefttop, attradd, attrTF, [attrTF.textWidth + 10, 0]);
                this.addChild(attradd);
            }
        }
        else {
            var lynumTxt = ComponentManager.getTextField(LanguageManager.getlocal('adultLyinNums', [Api.adultVoApi.getLyinnum(childInfo.uid).toString()]), 20, TextFieldConst.COLOR_BLACK);
            lynumTxt.x = fatherTF.x + 240;
            lynumTxt.y = fatherTF.y;
            this.addChild(lynumTxt);
        }
        var chooseBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "adultMarryViewTitle", this.chooseBtnClick, this);
        this.setLayoutPosition(LayoutConst.rightbottom, chooseBtn, this, [30, 30]);
        this.addChild(chooseBtn);
    };
    AdultChooseChildScrollItem.prototype.chooseBtnClick = function () {
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ADULT_CHILDMARRY, { "childId": this._childInfo.id });
    };
    AdultChooseChildScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    AdultChooseChildScrollItem.prototype.getSpaceX = function () {
        return 10;
    };
    AdultChooseChildScrollItem.prototype.dispose = function () {
        this._intimacyTF = null;
        this._childInfo = null;
        _super.prototype.dispose.call(this);
    };
    return AdultChooseChildScrollItem;
}(ScrollListItem));
__reflect(AdultChooseChildScrollItem.prototype, "AdultChooseChildScrollItem");
