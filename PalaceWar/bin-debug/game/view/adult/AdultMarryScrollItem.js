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
 *招亲的子嗣列表
 * author dky
 * date 2017/10/30
 * @class AdultMarryScrollItem
 */
var AdultMarryScrollItem = (function (_super) {
    __extends(AdultMarryScrollItem, _super);
    function AdultMarryScrollItem() {
        return _super.call(this) || this;
    }
    AdultMarryScrollItem.prototype.initItem = function (index, childInfo) {
        this.width = 618;
        this.height = 208 + this.getSpaceY();
        // childInfo.total
        this._childInfo = childInfo;
        var bg = BaseBitmap.create("public_9_bg31");
        bg.width = this.width;
        bg.height = 208;
        bg.x = 5;
        // nameBg.x = 25;
        // nameBg.y = 40;
        this.addChild(bg);
        var childbg = BaseBitmap.create("adult_smallbg");
        this.addChild(childbg);
        childbg.x = bg.x + 10;
        childbg.y = bg.y + bg.height / 2 - childbg.height / 2;
        var bg2 = BaseBitmap.create("public_9_managebg");
        bg2.width = 370;
        bg2.height = 100;
        bg2.x = childbg.x + childbg.width + 10;
        bg2.y = childbg.y + 10;
        this.addChild(bg2);
        var iconStr = "adult_boy";
        if (childInfo.sex == 2) {
            iconStr = "adult_girl";
        }
        if (Api.switchVoApi.checkOpenAdultImage() && childInfo.aquality != 7) {
            iconStr = "adult_" + childInfo.sex + "_" + childInfo.aquality;
        }
        var qualityBg = BaseBitmap.create("adult_namebg");
        qualityBg.x = childbg.x + 10;
        qualityBg.y = childbg.y + 10;
        this.addChild(qualityBg);
        var qualityBB = BaseBitmap.create("adult_q" + childInfo.aquality);
        qualityBB.x = childbg.x + 10;
        qualityBB.y = childbg.y + 15;
        qualityBB.setScale(0.7);
        this.addChild(qualityBB);
        var icon = BaseLoadBitmap.create(iconStr);
        icon.x = bg.x + 40;
        icon.y = 20;
        icon.setScale(0.45);
        this.addChild(icon);
        var nameTF = ComponentManager.getTextField(childInfo.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        nameTF.x = bg2.x + 5;
        nameTF.y = bg2.y + 7;
        this.addChild(nameTF);
        var fatherStr = LanguageManager.getlocal("adultMarryFather") + childInfo.fatherName;
        var fatherTF = ComponentManager.getTextField(fatherStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        fatherTF.x = nameTF.x;
        fatherTF.y = nameTF.y + nameTF.height + 10;
        this.addChild(fatherTF);
        var attrStr = LanguageManager.getlocal("servant_infoAttr") + childInfo.total;
        var attrTF = ComponentManager.getTextField(attrStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        attrTF.x = nameTF.x;
        attrTF.y = fatherTF.y + nameTF.height + 10;
        this.addChild(attrTF);
        //新增亲家
        if (Api.adultVoApi.judgeIsSudan(childInfo.uid)) {
            var info = Api.adultVoApi.getFreiendNums(childInfo.uid);
            var friendnum = ComponentManager.getTextField(LanguageManager.getlocal('adultLyinFriendNums', [info.num.toString()]), 20, TextFieldConst.COLOR_BLACK);
            this.setLayoutPosition(LayoutConst.righttop, friendnum, bg2, [5, 7]);
            this.addChild(friendnum);
            var progress = ComponentManager.getProgressBar("progress11", "progress11_bg", 102);
            this.setLayoutPosition(LayoutConst.horizontalCentertop, progress, friendnum, [0, friendnum.textHeight + 10]);
            this.addChild(progress);
            progress.setPercentage(info.percent, LanguageManager.getlocal("adultFriendDesc" + info.quality), TextFieldConst.COLOR_WHITE);
            progress.setTextSize(18);
            //this.setLayoutPosition(LayoutConst.righttop, lynumTxt, bg2, [5,7]);
            //属性加成
            var visitlevel = 0; //Api.adultVoApi.getVisitLevel(childInfo);
            var baifang = false;
            var laifang = false;
            var hufang = false;
            if (childInfo.adultinfo.visit == childInfo.uid) {
                baifang = true;
            }
            if (childInfo.visit == Api.playerVoApi.getPlayerID()) {
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
            this.setLayoutPosition(LayoutConst.rightverticalCenter, lynumTxt, bg2, [30, 0]);
            this.addChild(lynumTxt);
        }
        //联姻
        var marrmyBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "adultMarry", this.marryBtnClick, this);
        marrmyBtn.x = 450;
        marrmyBtn.y = bg2.y + bg2.height + 12;
        // marrmyBtn.
        this.addChild(marrmyBtn);
        marrmyBtn.setColor(TextFieldConst.COLOR_BLACK);
    };
    AdultMarryScrollItem.prototype.marryBtnClick = function () {
        var _this = this;
        // let data:any = {};
        // data.id = this._childInfo.uid;
        // data.childId = this._childInfo.id;
        if (this._childInfo.adultinfo.visit && this._childInfo.adultinfo.visit != this._childInfo.uid) {
            var msg = LanguageManager.getlocal("adultchoosetip3", [this._childInfo.adultinfo.name, Api.adultVoApi.getSadunInfoByUid(this._childInfo.adultinfo.visit).name]);
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "itemUseConstPopupViewTitle",
                msg: msg,
                callback: function () {
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ADULT_CLICKMARRY, { "id": _this._childInfo.id, "childId": _this._childInfo.id });
                },
                handler: this,
                needCancel: true
            });
        }
        else {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ADULT_CLICKMARRY, { "id": this._childInfo.id, "childId": this._childInfo.id });
        }
    };
    AdultMarryScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    AdultMarryScrollItem.prototype.dispose = function () {
        this._childInfo = null;
        _super.prototype.dispose.call(this);
    };
    return AdultMarryScrollItem;
}(ScrollListItem));
__reflect(AdultMarryScrollItem.prototype, "AdultMarryScrollItem");
//# sourceMappingURL=AdultMarryScrollItem.js.map