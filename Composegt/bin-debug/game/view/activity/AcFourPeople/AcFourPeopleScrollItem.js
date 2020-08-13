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
        this._servantId = data.getServant;
        this._data = data;
        this.showBg(index);
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
        //字体背景图片
        var fontbg = undefined;
        var serNameColor = TextFieldConst.COLOR_WHITE;
        if (AcFourPeopleScrollItem.CODE == "4") {
            fontbg = BaseBitmap.create("fourpeople_bg_4_namebg");
            serNameColor = TextFieldConst.COLOR_BROWN;
            servant.x = 60;
        }
        else {
            fontbg = BaseBitmap.create("public_infobg2");
        }
        this.addChild(fontbg);
        fontbg.x = 10;
        fontbg.y = 10;
        //综合资质
        var forpeople_qualifications = BaseBitmap.create("forpeople_qualifications");
        this.addChild(forpeople_qualifications);
        forpeople_qualifications.x = 25;
        forpeople_qualifications.y = 215;
        //综合资质数字
        var starNum = Api.servantVoApi.getServantStarsNumWithId(data.getServant);
        if (PlatformManager.checkIsKRNewSp()) {
            if (AcFourPeopleScrollItem.CODE == "1") {
                starNum = 30;
            }
            else if (AcFourPeopleScrollItem.CODE == "3") {
                starNum = 40;
            }
            else if (AcFourPeopleScrollItem.CODE == "4") {
                starNum = 50;
            }
        }
        var numLb = ComponentManager.getBitmapText(starNum + "", "recharge_fnt");
        this.addChild(numLb);
        numLb.x = forpeople_qualifications.x + 130;
        numLb.y = forpeople_qualifications.y;
        // wifeId forpeople_qualifications2.png
        var sercfg = Config.ServantCfg.getServantItemById(data.getServant);
        if (sercfg.wifeId) {
            //综合资质
            var forpeople_qualifications2 = BaseBitmap.create("forpeople_qualifications2");
            this.addChild(forpeople_qualifications2);
            forpeople_qualifications2.x = numLb.x + numLb.width + 40;
            forpeople_qualifications2.y = forpeople_qualifications.y;
            //综合资质数字	
            var starNum2 = Config.WifeCfg.getWifeCfgById(sercfg.wifeId).glamour; //  Api.servantVoApi.getServantStarsNumWithId(data.getServant);
            var numLb2 = ComponentManager.getBitmapText(starNum2 + "", "recharge_fnt");
            this.addChild(numLb2);
            numLb2.x = forpeople_qualifications2.x + 130;
            numLb2.y = forpeople_qualifications2.y;
        }
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
            alreadyReceived.x = this.width - 140;
            alreadyReceived.y = this.height - 180 + 10;
            if (this._achRedDotSp) {
                this.removeChild(this._achRedDotSp);
            }
        }
        else {
            //道具图片
            this._achRedDotSp.visible = true;
            this.itemBitmap = BaseLoadBitmap.create("itemicon" + data.needItem);
            this.itemBitmap.x = this.width - this.itemBitmap.width - 140;
            this.itemBitmap.y = this.height / 2 - this.itemBitmap.height / 2 - 15;
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
        this._fourPeopleNameText = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(), TextFieldConst.FONTSIZE_TITLE_COMMON, serNameColor);
        this._fourPeopleNameText.text = data.servantName;
        if (PlatformManager.checkIsTextHorizontal()) {
            fontbg.rotation = -90;
            fontbg.height = this._fourPeopleNameText.width + 30;
            fontbg.x = 20;
            fontbg.y = 220;
            this._fourPeopleNameText.x = fontbg.x + fontbg.height / 2 - this._fourPeopleNameText.width / 2;
            this._fourPeopleNameText.y = fontbg.y + fontbg.width / 2 - this._fourPeopleNameText.height / 2 - fontbg.width;
        }
        else {
            this._fourPeopleNameText.x = fontbg.x + 25;
            this._fourPeopleNameText.y = fontbg.y + 30;
            this._fourPeopleNameText.width = 28;
            if (AcFourPeopleScrollItem.CODE == "4") {
                this._fourPeopleNameText.x = fontbg.x + 32;
                this._fourPeopleNameText.y = fontbg.y + 40;
            }
        }
        // this._fourPeopleNameText.height = 80;
        this.addChild(this._fourPeopleNameText);
        var servantCfg = GameConfig.config.servantCfg[this._servantId];
        var ability = servantCfg.ability;
        for (var i = 0; i < ability.length; i++) {
            var aid = ability[i];
            var tmpAcfg = GameConfig.config.abilityCfg[aid];
            var attrTxt = ComponentManager.getTextField(LanguageManager.getlocal("servant_attrNameTxt" + aid), 18, 0xfff7e8);
            attrTxt.x = 210 * i + 10;
            attrTxt.y = 275;
            this.addChild(attrTxt);
            if (i >= 3) {
                attrTxt.x = (i - 3) * 210 + 10;
                attrTxt.y = 305;
            }
            var starsIcon = BaseBitmap.create("servant_star");
            starsIcon.x = attrTxt.x + 135; //attrTxt.width;// + 125;
            starsIcon.y = attrTxt.y - 4;
            this.addChild(starsIcon);
            var attrValueTxt = ComponentManager.getTextField("x" + tmpAcfg.num.toString(), 18, 0xfff7e8);
            attrValueTxt.x = starsIcon.x + 35;
            attrValueTxt.y = attrTxt.y;
            this.addChild(attrValueTxt);
        }
        if (Config.ServantCfg.checkIsLockedByGM(data.getServant)) {
            App.DisplayUtil.changeToDark(servant);
            servant.alpha = 0.7;
            var waiting = BaseBitmap.create("fourpeople_4_waitting");
            waiting.x = forpeople_bottom.x + forpeople_bottom.width / 2 - waiting.width / 2;
            waiting.y = forpeople_bottom.y + forpeople_bottom.height / 2 - waiting.height / 2;
            this.addChild(waiting);
        }
        //特殊光环
        this.speciaLaura();
        // this.checkBtnState();
    };
    AcFourPeopleScrollItem.prototype.speciaLaura = function () {
        //九宫格
        var bg1 = BaseBitmap.create("public_9v_bg05");
        bg1.y = +70;
        bg1.x = 180;
        bg1.width = 312;
        bg1.height = 110;
        bg1.x = this.width - bg1.width - 20;
        bg1.y = 20;
        this.addChild(bg1);
        // //特殊光环文字
        // let lauraImg: BaseBitmap = BaseBitmap.create("fourpecialaura");
        // this.addChild(lauraImg);
        // lauraImg.x = bg1.x + 90;
        // lauraImg.y = bg1.y + 12;
        //特殊光环文字
        var light_txt = ComponentManager.getTextField(LanguageManager.getlocal("acFourPeoplea_light"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        light_txt.x = bg1.x + bg1.width / 2 - light_txt.width / 2;
        light_txt.y = bg1.y + 12;
        this.addChild(light_txt);
        var line = BaseBitmap.create("public_huawen_bg");
        this.addChild(line);
        line.x = bg1.x + bg1.width / 2 - line.width / 2;
        line.y = light_txt.y + 25;
        //武力描述
        var forceText = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(), 18);
        var message = LanguageManager.getlocal("acFourPeoplea_force" + AcFourPeopleScrollItem.CODE);
        forceText.text = message;
        if (PlatformManager.checkIsTextHorizontal()) {
            forceText.x = bg1.x + 12;
            forceText.y = bg1.y + 50;
            forceText.width = bg1.width - 24;
        }
        else {
            forceText.x = bg1.x + 16;
            forceText.y = bg1.y + 50;
            forceText.width = bg1.width;
        }
        this.addChild(forceText);
        //属性描述
        var forceText2 = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(), 18);
        var message2 = LanguageManager.getlocal("acFourPeoplea_attribute" + AcFourPeopleScrollItem.CODE);
        forceText2.text = message2;
        if (PlatformManager.checkIsTextHorizontal()) {
            forceText2.x = bg1.x + 12;
            forceText2.y = forceText.y + forceText.height + 3;
            forceText2.width = bg1.width - 24;
            bg1.height = forceText2.y + forceText2.height - bg1.y + 12;
        }
        else {
            forceText2.x = bg1.x + 16;
            forceText2.y = bg1.y + 80;
            forceText2.width = bg1.width;
        }
        this.addChild(forceText2);
    };
    AcFourPeopleScrollItem.prototype.itemHandler = function (evt) {
        if (Config.ServantCfg.checkIsLockedByGM("" + this._servantId)) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acFourPeoplea_servant_locktip"));
            return;
        }
        var num = Number(evt.currentTarget.name);
        num += 1;
        this.currNum = num;
        if (this._itemNum >= this._needNum) {
            var message = LanguageManager.getlocal("acFourPeoplea_de" + AcFourPeopleScrollItem.CODE, [App.StringUtil.toString(this._needNum), "11"]);
            ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, { confirmCallback: this.confirmCallbackHandler, handler: this, icon: "itemicon200" + AcFourPeopleScrollItem.CODE, iconBg: "itembg_7", num: this._itemNum, msg: message, id: this._data.needItem, useNum: this._needNum });
        }
        else {
            var message = LanguageManager.getlocal("acFourPeoplea_de" + AcFourPeopleScrollItem.CODE, [App.StringUtil.toString(this._needNum), "11"]);
            ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, { confirmCallback: this.confirmCallbackHandler2, handler: this, icon: "itemicon200" + AcFourPeopleScrollItem.CODE, iconBg: "itembg_7", num: this._itemNum, msg: message, id: this._data.needItem, useNum: this._needNum });
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
        var bgStr = "fourpeople_bg_" + AcFourPeopleScrollItem.CODE;
        if (AcFourPeopleScrollItem.CODE == "4" && Config.ServantCfg.checkIsLockedByGM(this._data.getServant)) {
            "fourpeople_bg_" + AcFourPeopleScrollItem.CODE + "_2";
        }
        var bg = BaseLoadBitmap.create(bgStr);
        bg.width = 640;
        bg.height = 331;
        this.addChild(bg);
        // if(AcFourPeopleScrollItem.CODE=="1")
        // {
        // 	var num:number =index+1;	
        // 	bg = BaseBitmap.create("fourpeople_bg_"+num); 
        // }
        // else if(AcFourPeopleScrollItem.CODE=="2")
        // {
        // 	bg = BaseBitmap.create("forpeople_bg2"); 
        // } 
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
