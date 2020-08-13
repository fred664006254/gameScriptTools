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
var AcFourPeopleScrollItem = (function (_super) {
    __extends(AcFourPeopleScrollItem, _super);
    function AcFourPeopleScrollItem() {
        var _this = _super.call(this) || this;
        _this._fourPeopleNameText = null;
        _this._fourPeopleLvText = null;
        _this._itemNumberText = null;
        _this._label_Text = null;
        _this._servantId = 0;
        _this._itemNum = 0;
        _this._needNum = 0;
        _this._curr_index = 0;
        _this._AcFourPeopleVo = null;
        _this._achRedDotSp = null;
        _this.itemBitmap = null;
        _this.bottomName = null;
        _this.currNum = 0;
        _this._data = null;
        return _this;
    }
    AcFourPeopleScrollItem.prototype.initItem = function (index, data) {
        this.width = 640;
        this.height = 331;
        this.showBg(index);
        this._servantId = data.getServant;
        this._data = data;
        // 当前拥有多少道具
        this._itemNum = Api.itemVoApi.getItemNumInfoVoById(data.needItem);
        this._needNum = data.needNum;
        this._curr_index = index;
        //人物半身相
        var servant = BaseLoadBitmap.create(data.servantIcon);
        servant.anchorOffsetX = servant.width / 2;
        servant.anchorOffsetY = servant.height / 2;
        servant.scaleX = 0.6;
        servant.scaleY = 0.6;
        servant.x = servant.x + 30;
        servant.y = servant.y;
        this.addChild(servant);
        //黑色长条
        var fourpeople_mask = BaseBitmap.create("fourpeople_mask");
        this.addChild(fourpeople_mask);
        fourpeople_mask.width = 640;
        fourpeople_mask.x = 0;
        fourpeople_mask.y = 260;
        if (PlatformManager.checkIsEnLang()) {
            this.height += 20;
            fourpeople_mask.height += 15;
        }
        var servantCfg2 = Config.ServantCfg.getServantItemById(this._servantId);
        var ability2 = servantCfg2.ability;
        if (ability2.length > 6) {
            this.height += 40;
            fourpeople_mask.height += 35;
        }
        if (PlatformManager.checkIsEnLang()) {
            if (ability2.length > 6) {
                this.height += 20;
                fourpeople_mask.height += 15;
            }
        }
        //字体背景图片
        var fontbg = BaseBitmap.create("public_infobg2");
        this.addChild(fontbg);
        fontbg.x = 10;
        fontbg.y = 10;
        //综合资质
        var forpeople_qualifications = BaseBitmap.create("forpeople_qualifications");
        this.addChild(forpeople_qualifications);
        forpeople_qualifications.x = 25;
        forpeople_qualifications.y = 220;
        //综合资质数字
        var starNum = Api.servantVoApi.getServantAptitude(data.getServant);
        var numLb = ComponentManager.getBitmapText(starNum + "", "recharge_fnt");
        this.addChild(numLb);
        numLb.x = forpeople_qualifications.x + 130;
        numLb.y = forpeople_qualifications.y;
        //道具底图
        var forpeople_bottom = BaseBitmap.create("forpeople_bottom");
        this.addChild(forpeople_bottom);
        forpeople_bottom.x = 500;
        forpeople_bottom.y = 150;
        this._achRedDotSp = BaseBitmap.create("public_dot2");
        this._achRedDotSp.x = forpeople_bottom.x + forpeople_bottom.width - 10; //this._itemBtn.x + this._itemBtn.width - this._achRedDotSp.width - 20;
        this._achRedDotSp.y = forpeople_bottom.y; //this._itemBtn.y + 2;
        this.addChild(this._achRedDotSp);
        var servantInfoVo = Api.servantVoApi.getServantObj(data.getServant);
        if (servantInfoVo) {
            var alreadyReceived = BaseBitmap.create("achievement_state3");
            this.addChild(alreadyReceived);
            // alreadyReceived.x = this.width - 160;
            // alreadyReceived.y = this.height - 180;
            alreadyReceived.x = forpeople_bottom.x - 15;
            alreadyReceived.y = forpeople_bottom.y + 10;
            // if(AcFourPeopleScrollItem.CODE=="5")
            // {
            // 	alreadyReceived.y = this.height - 200;
            // }
            if (this._achRedDotSp) {
                this.removeChild(this._achRedDotSp);
            }
        }
        else {
            //道具图片
            this._achRedDotSp.visible = true;
            if (AcFourPeopleScrollItem.CODE == "5") {
                this.itemBitmap = BaseLoadBitmap.create("itemicon2006");
            }
            else if (AcFourPeopleScrollItem.CODE == "3") {
                this.itemBitmap = BaseLoadBitmap.create("itemicon2004");
            }
            else {
                this.itemBitmap = BaseLoadBitmap.create("itemicon200" + AcFourPeopleScrollItem.CODE);
            }
            this.itemBitmap.x = this.width - this.itemBitmap.width - 140;
            this.itemBitmap.y = this.height / 2 - this.itemBitmap.height / 2 - 15;
            if (AcFourPeopleScrollItem.CODE == "5") {
                this.itemBitmap.y = this.itemBitmap.y - 20;
            }
            if (PlatformManager.checkIsEnLang()) {
                this.itemBitmap.y = this.itemBitmap.y - 20;
            }
            this.addChild(this.itemBitmap);
            this.itemBitmap.name = index + "";
            this.itemBitmap.addTouchTap(this.itemHandler, this);
            //名字底图
            this.bottomName = BaseBitmap.create("fourpeople_bottom");
            this.bottomName.x = forpeople_bottom.x;
            this.bottomName.y = forpeople_bottom.y + 80;
            this.addChild(this.bottomName);
            //道具数量
            this._itemNumberText = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON);
            this._itemNumberText.x = forpeople_bottom.x + 26;
            this._itemNumberText.y = forpeople_bottom.y + 82;
            if (this._itemNum >= data.needNum) {
                this._itemNumberText.textColor = TextFieldConst.COLOR_WARN_GREEN;
                // this._AcFourPeopleVo.red = true; 
                this._achRedDotSp.visible = true;
            }
            else {
                this._itemNumberText.textColor = TextFieldConst.COLOR_WARN_YELLOW;
                // this._AcFourPeopleVo.red = false;
                this._achRedDotSp.visible = false;
            }
            this._itemNumberText.text = this._itemNum + "/" + data.needNum;
            this.addChild(this._itemNumberText);
        }
        //名字
        this._fourPeopleNameText = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(), TextFieldConst.FONTSIZE_TITLE_COMMON);
        // this._fourPeopleNameText.height = 80;
        this._fourPeopleNameText.text = data.servantName;
        if (PlatformManager.checkIsTextHorizontal()) {
            fontbg.width = this._fourPeopleNameText.width + 40;
            fontbg.setPosition(25, 160);
            this._fourPeopleNameText.setPosition(fontbg.x + fontbg.width / 2 - this._fourPeopleNameText.width / 2, fontbg.y + fontbg.height / 2 - this._fourPeopleNameText.height / 2);
        }
        else {
            this._fourPeopleNameText.x = fontbg.x + 25;
            this._fourPeopleNameText.y = fontbg.y + 30;
            this._fourPeopleNameText.width = 28;
        }
        this.addChild(this._fourPeopleNameText);
        var servantCfg = Config.ServantCfg.getServantItemById(this._servantId);
        var ability = servantCfg.ability;
        if (PlatformManager.checkIsEnLang()) {
            //英文版每行两条属性
            for (var i = 0; i < ability.length; i++) {
                var aid = ability[i];
                var tmpAcfg = GameConfig.config.abilityCfg[aid];
                var attrTxt = ComponentManager.getTextField(LanguageManager.getlocal("servant_attrNameTxt" + aid), 20);
                attrTxt.x = 315 * (i % 2) + 15;
                attrTxt.y = 265 + Math.floor(i / 2) * 28;
                this.addChild(attrTxt);
                var starsIcon = BaseBitmap.create("servant_star");
                starsIcon.x = attrTxt.x + 235; //attrTxt.width;// + 125;
                starsIcon.y = attrTxt.y - 4;
                this.addChild(starsIcon);
                var attrValueTxt = ComponentManager.getTextField("x" + tmpAcfg.num.toString(), 20);
                attrValueTxt.x = starsIcon.x + 35;
                attrValueTxt.y = attrTxt.y;
                this.addChild(attrValueTxt);
            }
        }
        else {
            for (var i = 0; i < ability.length; i++) {
                var aid = ability[i];
                var tmpAcfg = GameConfig.config.abilityCfg[aid];
                var attrTxt = ComponentManager.getTextField(LanguageManager.getlocal("servant_attrNameTxt" + aid), 20);
                attrTxt.x = 210 * i + 20;
                attrTxt.y = 275;
                this.addChild(attrTxt);
                if (i >= 3) {
                    attrTxt.x = (i - 3) * 210 + 20;
                    attrTxt.y = 305;
                }
                if (i >= 6) {
                    attrTxt.x = (i - 6) * 210 + 20;
                    attrTxt.y = 335;
                }
                var starsIcon = BaseBitmap.create("servant_star");
                starsIcon.x = attrTxt.x + 125; //attrTxt.width;// + 125;
                starsIcon.y = attrTxt.y - 4;
                this.addChild(starsIcon);
                var attrValueTxt = ComponentManager.getTextField("x" + tmpAcfg.num.toString(), 20);
                attrValueTxt.x = starsIcon.x + 35;
                attrValueTxt.y = attrTxt.y;
                this.addChild(attrValueTxt);
            }
        }
        if (servantCfg.quality2) {
            var cornerImg = Api.servantVoApi.getCornerMarkerContainer(servantCfg.quality2);
            cornerImg.x = 250;
            cornerImg.y = 180;
            cornerImg.setScale(1.3);
            this.addChild(cornerImg);
        }
        //特殊光环
        this.speciaLaura();
        // this.checkBtnState();
    };
    AcFourPeopleScrollItem.prototype.speciaLaura = function () {
        //九宫格
        var bg1 = BaseBitmap.create("fourfloor");
        bg1.y = +70;
        bg1.x = 180;
        bg1.width = 312;
        bg1.height = 110;
        bg1.x = this.width - bg1.width - 20;
        bg1.y = 20;
        this.addChild(bg1);
        //特殊光环文字
        var lauraImg = BaseBitmap.create("fourpecialaura");
        this.addChild(lauraImg);
        lauraImg.x = bg1.x + 90;
        lauraImg.y = bg1.y + 12;
        //武力描述
        var forceText = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(), 18);
        var message = LanguageManager.getlocal("acFourPeoplea_force" + AcFourPeopleScrollItem.CODE);
        forceText.x = bg1.x + 16;
        forceText.y = bg1.y + 50;
        forceText.text = message;
        forceText.width = bg1.width;
        this.addChild(forceText);
        //属性描述
        var forceText2 = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(), 18);
        var message2 = LanguageManager.getlocal("acFourPeoplea_attribute" + AcFourPeopleScrollItem.CODE);
        forceText2.x = bg1.x + 16;
        forceText2.y = bg1.y + 80;
        forceText2.width = bg1.width;
        forceText2.text = message2;
        this.addChild(forceText2);
        if (PlatformManager.checkIsTextHorizontal()) {
            lauraImg.y -= 6;
            forceText.y -= 12;
            forceText2.y -= 2;
        }
        if (PlatformManager.checkIsEnLang()) {
            forceText.width = bg1.width - 32;
            forceText2.width = bg1.width - 32;
            bg1.height += 15;
        }
    };
    AcFourPeopleScrollItem.prototype.itemHandler = function (evt) {
        var itemStr = "itemicon200" + AcFourPeopleScrollItem.CODE;
        if (AcFourPeopleScrollItem.CODE == "5") {
            itemStr = "itemicon2006";
        }
        else if (AcFourPeopleScrollItem.CODE == "3") {
            itemStr = "itemicon2004";
        }
        var num = Number(evt.currentTarget.name);
        num += 1;
        this.currNum = num;
        if (this._itemNum >= this._needNum) {
            var message = LanguageManager.getlocal("acFourPeoplea_de" + AcFourPeopleScrollItem.CODE, [App.StringUtil.toString(this._needNum), "11"]);
            ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, { confirmCallback: this.confirmCallbackHandler, handler: this, icon: itemStr, iconBg: "itembg_7", num: this._itemNum, msg: message, id: this._data.needItem, useNum: this._needNum });
        }
        else {
            var message = LanguageManager.getlocal("acFourPeoplea_de" + AcFourPeopleScrollItem.CODE, [App.StringUtil.toString(this._needNum), "11"]);
            ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, { confirmCallback: this.confirmCallbackHandler2, handler: this, icon: itemStr, iconBg: "itembg_7", num: this._itemNum, msg: message, id: this._data.needItem, useNum: this._needNum });
        }
    };
    AcFourPeopleScrollItem.prototype.confirmCallbackHandler = function () {
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_EXCHANGEFOURPEOPLE, { "activeId": "fourPeople-" + AcFourPeopleScrollItem.CODE, "rkey": this.currNum });
    };
    AcFourPeopleScrollItem.prototype.confirmCallbackHandler2 = function () {
        App.CommonUtil.showTip(LanguageManager.getlocal("acFourPeoplea_token" + AcFourPeopleScrollItem.CODE));
    };
    AcFourPeopleScrollItem.prototype.showBg = function (index) {
        if (index === void 0) { index = 0; }
        var bg;
        if (AcFourPeopleScrollItem.CODE == "1") {
            var num = index + 1;
            bg = BaseBitmap.create("fourpeople_bg_" + num);
            // console.log("fourpeople_bg_"+num);
        }
        else if (AcFourPeopleScrollItem.CODE == "2") {
            bg = BaseBitmap.create("forpeople_bg2");
        }
        else if (AcFourPeopleScrollItem.CODE == "3") {
            bg = BaseBitmap.create("forpeople_bg3");
        }
        else if (AcFourPeopleScrollItem.CODE == "5") {
            bg = BaseBitmap.create("forpeople_bg5");
        }
        else {
            bg = BaseBitmap.create("fourpeople_bg_" + num);
        }
        this.addChild(bg);
    };
    AcFourPeopleScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    AcFourPeopleScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    AcFourPeopleScrollItem.prototype.dispose = function () {
        this._fourPeopleNameText = null;
        this._fourPeopleLvText = null;
        this._itemNumberText = null;
        this.itemBitmap = null;
        this._servantId = 0;
        this._itemNum = 0;
        this._needNum = 0;
        this._curr_index = 0;
        this._achRedDotSp = null;
        this.bottomName = null;
        this.currNum = 0;
        // AcFourPeopleScrollItem.CODE="1";
        _super.prototype.dispose.call(this);
    };
    AcFourPeopleScrollItem.CODE = "1";
    return AcFourPeopleScrollItem;
}(ScrollListItem));
__reflect(AcFourPeopleScrollItem.prototype, "AcFourPeopleScrollItem");
//# sourceMappingURL=AcFourPeopleScrollItem.js.map