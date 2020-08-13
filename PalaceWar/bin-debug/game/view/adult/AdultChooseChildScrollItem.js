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
        // let iconStr = Api.adultVoApi.getAdultPic(childInfo.id);
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
        var fatherStr = LanguageManager.getlocal("adultMarryFather") + Api.playerVoApi.getPlayerName();
        var fatherTF = ComponentManager.getTextField(fatherStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        fatherTF.x = nameTF.x;
        fatherTF.y = nameTF.y + nameTF.height + 10;
        this.addChild(fatherTF);
        var attrStr = LanguageManager.getlocal("servant_infoAttr") + childInfo.attrVo.attTotal;
        var attrTF = ComponentManager.getTextField(attrStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        attrTF.x = nameTF.x;
        attrTF.y = fatherTF.y + nameTF.height + 10;
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
            this.setLayoutPosition(LayoutConst.rightverticalCenter, lynumTxt, bg2, [30, 0]);
            this.addChild(lynumTxt);
        }
        //联姻
        var marrmyBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "adultMarryViewTitle", this.chooseBtnClick, this);
        marrmyBtn.x = 450;
        marrmyBtn.y = bg2.y + bg2.height + 12;
        // marrmyBtn.
        this.addChild(marrmyBtn);
        marrmyBtn.setColor(TextFieldConst.COLOR_BLACK);
        // this.width = 244 + this.getSpaceX();
        // this.height = 292 ;
        // // childInfo.total
        // this._childInfo = childInfo;
        // let bg:BaseBitmap = BaseBitmap.create("public_9_bg31");
        // bg.width = 244;
        // bg.height = 292;
        // bg.x = 5;
        // // nameBg.x = 25;
        // // nameBg.y = 40;
        // this.addChild(bg);
        // let childbg:BaseBitmap = BaseBitmap.create("adult_smallbg");
        // this.addChild(childbg);
        // childbg.x = bg.x + 15;
        // childbg.y = 40;
        // // let bg2:BaseBitmap = BaseBitmap.create("public_9_managebg");
        // // bg2.width = 370;
        // // bg2.height = 100;
        // // bg2.x = childbg.x + childbg.width + 10;
        // // bg2.y = childbg.y + 10;
        // // this.addChild(bg2);
        // let iconStr = "adult_boy";
        // if(childInfo.sex == 2){
        // 	iconStr = "adult_girl";
        // }	
        // let qualityBg:BaseBitmap = BaseBitmap.create("adult_namebg");
        // qualityBg.x = childbg.x + 10;
        // qualityBg.y = childbg.y + 10;
        // this.addChild(qualityBg);
        // let qualityBB:BaseBitmap = BaseBitmap.create("adult_q" + childInfo.aquality);
        // qualityBB.x = childbg.x + 10;
        // qualityBB.y = childbg.y + 15;
        // qualityBB.setScale(0.7);
        // this.addChild(qualityBB);
        // let icon:BaseBitmap = BaseBitmap.create(iconStr);
        // icon.x = bg.x + 40;
        // icon.y = 40;
        // icon.setScale(0.45)
        // this.addChild(icon);
        // // adult_attbg
        // let nameTF = ComponentManager.getTextField(childInfo.name,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
        // nameTF.x = this.width/2 - nameTF.width/2;
        // nameTF.y =  15;
        // this.addChild(nameTF);
        // let attrBg:BaseBitmap = BaseBitmap.create("adult_attbg");
        // attrBg.x = childbg.x + 40;
        // attrBg.y = childbg.y + childbg.height - attrBg.height;
        // this.addChild(attrBg);
        // let attrStr = LanguageManager.getlocal("servant_infoAttr") + childInfo.attrVo.attTotal;
        // let attrTF = ComponentManager.getTextField(attrStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
        // attrTF.x = attrBg.x + attrBg.width/2 - attrTF.width/2;
        // attrTF.y = attrBg.y + attrBg.height/2 - attrTF.height/2;
        // this.addChild(attrTF);
        // //choose
        // let chooseBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"adultMarryViewTitle",this.chooseBtnClick,this);
        // chooseBtn.x = this.width/2 - chooseBtn.width/2;
        // chooseBtn.y = childbg.y + childbg.height + 9;
        // this.addChild(chooseBtn);
        // chooseBtn.setColor(TextFieldConst.COLOR_BLACK);
    };
    AdultChooseChildScrollItem.prototype.chooseBtnClick = function () {
        // let data:any = {};
        // data.id = this._childInfo.uid;
        // data.childId = this._childInfo.id;
        //¬	如玩家有互访的子嗣，但选择了其他子嗣联姻，弹出有互访提示弹窗，确认后再弹出选择联姻道具弹窗
        //如对象子嗣来拜访过，玩家的子嗣没有拜访过，选择子嗣联姻时弹出提示未拜访提示弹窗，确认时回到姻缘祠主界面，取消时再弹出选择联姻道具弹窗
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
//# sourceMappingURL=AdultChooseChildScrollItem.js.map