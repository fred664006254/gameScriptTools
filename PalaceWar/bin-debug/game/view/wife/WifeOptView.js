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
 * 红颜操作界面
 * author dky
 * date 2017/10/9
 * @class WifeView
 */
var WifeOptView = (function (_super) {
    __extends(WifeOptView, _super);
    function WifeOptView() {
        var _this = _super.call(this) || this;
        _this._bg = null;
        _this._dgbone = null;
        _this._giveDotSp = null;
        _this._skillDotSp = null;
        _this._skinDotSp = null;
        _this._wordsCornerBg = null;
        _this._wordsBg = null;
        _this._isMoving = false;
        _this._decreeGoldCost = 0;
        _this._mainTaskHandKey = null;
        _this._banishContainer = null;
        _this._banishTime = null;
        _this._wifebgParticlegroupName = null;
        _this._bgContainer = null;
        _this._nameTxt = null;
        _this._nameBg = null;
        _this._wifeDescText = null;
        _this._dangjiaId = "";
        //切换新增
        _this._wifeInfoVoList = [];
        _this._wifeId = null;
        _this._wifeIndex = 0;
        _this._changesexBtn = null;
        _this._isLeftClick = false;
        _this._isSwitching = false;
        _this._switchDelta = 0;
        _this._leftAniContainer = null;
        _this._rightAniContainer = null;
        //双飞
        _this._isDoubleFly = false;
        _this._doubleContainer = null;
        _this._mainTaskHandLoveKey = null;
        _this._mainTaskHandSkillKey = null;
        _this._randomid = 0;
        _this._pos = {
            "scene_wifeskin_1": { y: 120, height: 970 },
            "scene_wifeskin_2": { y: 50, height: 1010 },
        };
        return _this;
    }
    WifeOptView.prototype.checkBoneName = function (name) {
        if (this._isDoubleFly) {
            return name + "_1";
        }
        return name;
    };
    WifeOptView.prototype.getDoubleFlyBoneByName = function (name) {
        if (this._isDoubleFly) {
            var doubleName = name.substr(0, name.length - 1) + "2";
            return doubleName;
        }
        return name;
    };
    WifeOptView.prototype.checkShowDoubleName = function () {
        if (this._isDoubleFly) {
            if (this._doubleContainer) {
                // this._doubleContainer.visible = true;
            }
            else {
                this._doubleContainer = new BaseDisplayObjectContainer();
                this.addChildToContainer(this._doubleContainer);
                if (PlatformManager.checkIsTextHorizontal()) {
                    var nameBg1 = BaseBitmap.create("wife_doublefly_namebg");
                    nameBg1.setPosition(GameConfig.stageWidth / 2 - 30 - nameBg1.width, this._bottomBg.y - 110);
                    this._doubleContainer.addChild(nameBg1);
                    var nameBg2 = BaseBitmap.create("wife_doublefly_namebg");
                    nameBg2.setPosition(GameConfig.stageWidth / 2 + 40, nameBg1.y);
                    this._doubleContainer.addChild(nameBg2);
                    var nameTF1 = ComponentManager.getTextField(LanguageManager.getlocal("wifeName_236_1"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTF1, nameBg1);
                    this._doubleContainer.addChild(nameTF1);
                    var nameTF2 = ComponentManager.getTextField(LanguageManager.getlocal("wifeName_236_2"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTF2, nameBg2);
                    this._doubleContainer.addChild(nameTF2);
                }
                else {
                    var nameBg1 = BaseBitmap.create("public_infobg2");
                    nameBg1.setPosition(35, 200);
                    this._doubleContainer.addChild(nameBg1);
                    var nameBg2 = BaseBitmap.create("public_infobg2");
                    nameBg2.setPosition(GameConfig.stageWidth - nameBg1.x - nameBg2.width, nameBg1.y);
                    this._doubleContainer.addChild(nameBg2);
                    var nameTF1 = ComponentManager.getTextField(LanguageManager.getlocal("wifeName_236_1"), TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_WHITE);
                    nameTF1.width = 27;
                    nameTF1.x = nameBg1.x + nameBg1.width / 2 - nameTF1.width / 2 + 2;
                    nameTF1.y = nameBg1.y + 64 - nameTF1.height / 2;
                    this._doubleContainer.addChild(nameTF1);
                    var nameTF2 = ComponentManager.getTextField(LanguageManager.getlocal("wifeName_236_2"), TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_WHITE);
                    nameTF2.width = 27;
                    nameTF2.x = nameBg2.x + nameBg2.width / 2 - nameTF2.width / 2 + 2;
                    nameTF2.y = nameBg2.y + 64 - nameTF2.height / 2;
                    this._doubleContainer.addChild(nameTF2);
                }
            }
            // if (this._nameBg)
            // {
            // 	this._nameBg.visible = false;
            // }
            // if (this._nameTxt)
            // {
            // 	this._nameTxt.visible = false;
            // }
        }
        else {
            // if (this._doubleContainer)
            // {
            // 	this._doubleContainer.visible = false;
            // }
            // if (this._nameBg)
            // {
            // 	this._nameBg.visible = true;
            // }
            // if (this._nameTxt)
            // {
            // 	this._nameTxt.visible = true;
            // }
        }
    };
    WifeOptView.prototype.initView = function () {
        var _this = this;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_SERVANTBONE, this.refreashBone, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_CHILD_GUIDE, this.doGuide, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFESKIN_SELECTBG), this.moveBgUp, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_AWARD), this.refreshInfoAfterLove, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_UPGRADESKILL), this.refreshInfoAfterLove, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_WIFE, this.checkRedPoint, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_WIFESKIN, this.checkRedPoint, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_EQUIP), this.moveUiUp, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIIFE_SETSEXSETTING, this.setWifeCallback, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_WIFE_LOVECOM, this.checkDro2, this);
        App.MessageHelper.addNetMessage(NetRequestConst.OTHERINFO_SETDANGJIA, this.refreshNpc, this);
        Api.mainTaskVoApi.checkShowGuide("wifeoptview");
        this._wifeId = String(this.param.data.id);
        this._isDoubleFly = (this._wifeId == "236");
        var id = this.param.data.id;
        this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
        var wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(this._wifeInfoVo.id);
        var wifecfg = Config.WifeCfg.getWifeCfgById(id);
        var sound = '';
        var words = '';
        var canHomeBtn = ComponentManager.getButton("wifehomebtn", "", function () {
            if (_this._isDoubleFly) {
                ViewController.getInstance().openView(ViewConst.POPUP.WIFEDANGJIACHOOSEPOPUPVIEW);
            }
            else {
                NetManager.request(NetRequestConst.OTHERINFO_SETDANGJIA, {
                    dangjia: _this._dangjiaId
                });
            }
        }, this);
        this.addChild(canHomeBtn);
        this._homeBtn = canHomeBtn;
        canHomeBtn.visible = false;
        if (wifeSkinVo && wifeSkinVo.equip != "") {
            var skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
            if ((skinCfg.isBlueSkin && wifecfg.isBule()) || (!skinCfg.isBlueSkin && !wifecfg.isBule())) {
                sound = skinCfg.sound;
                words = skinCfg.words;
            }
            else {
                sound = this._wifeInfoVo.sound;
                words = this._wifeInfoVo.words;
                if (wifecfg.canAtHome) {
                    this._dangjiaId = id;
                    canHomeBtn.visible = true;
                    var str = Api.otherInfoVoApi.getDangjiaWifeId();
                    if ((str != "" && (Number(str) == Number(id)) || (Number(id) == 101 && str == ""))) {
                        canHomeBtn.setBtnBitMap("wifeinihomebtn");
                    }
                }
            }
            // wifePic = skinCfg.body;
        }
        else {
            sound = this._wifeInfoVo.sound;
            words = this._wifeInfoVo.words;
            if (wifecfg.canAtHome) {
                this._dangjiaId = id;
                canHomeBtn.visible = true;
                var str = Api.otherInfoVoApi.getDangjiaWifeId();
                if ((str != "" && (Number(str) == Number(id)) || (Number(id) == 101 && str == ""))) {
                    canHomeBtn.setBtnBitMap("wifeinihomebtn");
                }
            }
        }
        //蓝颜说的话和语音要对应
        var blueSoundIndex = 0;
        if (Api.switchVoApi.checkOpenBlueWife() && Api.gameinfoVoApi.getSexswitch() && Api.wifeVoApi.checkWifeCanChangeSex(id) && this._wifeInfoVo.sexflag) {
            blueSoundIndex = App.MathUtil.getRandom(1, 4);
        }
        if (1) {
            var soundRes = '';
            if (wifeSkinVo && wifeSkinVo.equip != "") {
                var skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
                if ((skinCfg.isBlueSkin && wifecfg.isBule()) || (!skinCfg.isBlueSkin && !wifecfg.isBule())) {
                    soundRes = skinCfg.sound;
                }
                else {
                    soundRes = this._wifeInfoVo.sound;
                    if (blueSoundIndex) {
                        soundRes = this._wifeInfoVo.getBlueSound(blueSoundIndex);
                    }
                }
            }
            else {
                soundRes = this._wifeInfoVo.sound;
                if (blueSoundIndex) {
                    soundRes = this._wifeInfoVo.getBlueSound(blueSoundIndex);
                }
            }
            // if(this._sex){
            // 	soundRes = this._wifeInfoVo.getBlueSound();
            // }
            this.playEffect(soundRes, true);
        }
        //this.playEffect(sound,true);
        //大背景
        var bigBg = BaseLoadBitmap.create("wifeview_optbg");
        bigBg.y = -100;
        this.addChildToContainer(bigBg);
        this._bg = bigBg;
        this._topContanier = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._topContanier);
        //描述背景
        var titleBg = BaseBitmap.create("public_9_bg11");
        titleBg.width = GameConfig.stageWidth;
        titleBg.height = 70;
        titleBg.y = -21;
        this._topContanier.addChild(titleBg);
        //红颜描述文字
        var wifeDescText = ComponentManager.getTextField(this._wifeInfoVo.desc, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        wifeDescText.setColor(TextFieldConst.COLOR_WHITE);
        wifeDescText.x = 20;
        wifeDescText.width = GameConfig.stageWidth - wifeDescText.x * 2;
        this._wifeDescText = wifeDescText;
        this._topContanier.addChild(wifeDescText);
        //转生按钮
        if (Api.switchVoApi.checkIsInBlueWife() && wifecfg.canBlueWife) {
            var changesexBtn = ComponentManager.getButton("wifechangesexbtn", "", function () {
                ViewController.getInstance().openView(ViewConst.COMMON.WIFECHANGESEXVIEW, {
                    wid: _this._wifeInfoVo.id,
                    sex: _this._wifeInfoVo.sexflag
                });
            }, this);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, changesexBtn, this, [7, 227]);
            this.addChild(changesexBtn);
            bigBg.setload(this._wifeInfoVo.sexflag == 0 ? "wifeview_optbg" : "malewifebg");
            this._changesexBtn = changesexBtn;
        }
        var wifePicStr = this._wifeInfoVo.body;
        if (Api.wifeSkinVoApi.isHaveSkin(this._wifeInfoVo.id)) {
            var wifeSkinVo_1 = Api.wifeSkinVoApi.getWifeskinInfoVoById(this._wifeInfoVo.id);
            if (wifeSkinVo_1 && wifeSkinVo_1.equip != "") {
                var skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo_1.equip);
                wifePicStr = skinCfg.body;
                var bonename = this.checkBoneName(skinCfg.bone);
                if (Api.wifeVoApi.isHaveBone(bonename + "_ske")) {
                    this._droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(bonename);
                    // this._droWifeIcon.setScale(0.7)
                    // this._droWifeIcon.x = 0;
                    // this._droWifeIcon.y = 0;
                    this.addChildToContainer(this._droWifeIcon);
                }
                if (skinCfg.canAtHome) {
                    this._dangjiaId = wifeSkinVo_1.equip;
                    canHomeBtn.visible = true;
                    var str = Api.otherInfoVoApi.getDangjiaWifeId();
                    if ((str != "" && (Number(str) == Number(this._dangjiaId)) || (Number(id) == 101 && str == ""))) {
                        canHomeBtn.setBtnBitMap("wifeinihomebtn");
                    }
                }
            }
            else {
                var bonename = this.checkBoneName(this._wifeInfoVo.bone);
                if (Api.wifeVoApi.isHaveBone(bonename + "_ske")) {
                    this._droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(bonename);
                    // this._droWifeIcon.setScale(0.7)
                    // this._droWifeIcon.x = this._wifeIcon.x;
                    // this._droWifeIcon.y = this._wifeIcon.y;
                    this.addChildToContainer(this._droWifeIcon);
                }
                if (wifecfg.canAtHome) {
                    this._dangjiaId = id;
                    canHomeBtn.visible = true;
                    var str = Api.otherInfoVoApi.getDangjiaWifeId();
                    if ((str != "" && (Number(str) == Number(id)) || (Number(id) == 101 && str == ""))) {
                        canHomeBtn.setBtnBitMap("wifeinihomebtn");
                    }
                }
            }
        }
        else {
            var bonename = this.checkBoneName(this._wifeInfoVo.bone);
            if (Api.wifeVoApi.isHaveBone(bonename + "_ske")) {
                this._droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(bonename);
                // this._droWifeIcon.setScale(0.7)
                // this._droWifeIcon.x = this._wifeIcon.x;
                // this._droWifeIcon.y = this._wifeIcon.y;
                this.addChildToContainer(this._droWifeIcon);
            }
            if (wifecfg.canAtHome) {
                this._dangjiaId = id;
                canHomeBtn.visible = true;
                var str = Api.otherInfoVoApi.getDangjiaWifeId();
                if ((str != "" && (Number(str) == Number(id)) || (Number(id) == 101 && str == ""))) {
                    canHomeBtn.setBtnBitMap("wifeinihomebtn");
                }
            }
        }
        var wifeScale = 0.8;
        //红颜图像
        this._wifeIcon = BaseLoadBitmap.create(wifePicStr);
        this._wifeIcon.x = 80;
        this._wifeIcon.setScale(wifeScale);
        this.addChildToContainer(this._wifeIcon);
        if (this._droWifeIcon) {
            this._wifeIcon.visible = false;
            if (this._isDoubleFly) {
                var twoName = this.getDoubleFlyBoneByName(this._droWifeIcon.getBoneName());
                if (Api.wifeVoApi.isHaveBone(twoName + "_ske")) {
                    this._droWifeIcon2 = App.DragonBonesUtil.getLoadDragonBones(twoName);
                    this.container.addChildAt(this._droWifeIcon2, this.container.getChildIndex(this._droWifeIcon));
                    this.removeChildFromContainer(this._droWifeIcon);
                    this.addChildToContainer(this._droWifeIcon);
                }
            }
        }
        //红颜说的话背景
        this._wordsBg = BaseBitmap.create("public_9_bg25");
        this._wordsBg.width = 430;
        this._wordsBg.height = 90;
        this._wordsBg.x = 180;
        if (PlatformManager.checkIsRuLang()) {
            this._wordsBg.height = 100;
        }
        this.addChildToContainer(this._wordsBg);
        this._wordsCornerBg = BaseBitmap.create("public_9_bg25_tail");
        this._wordsCornerBg.x = 390;
        this.addChildToContainer(this._wordsCornerBg);
        //红颜说的话
        this._wifeWordsText = ComponentManager.getTextField(words, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._wifeWordsText.setColor(TextFieldConst.COLOR_BLACK);
        this._wifeWordsText.x = 200;
        this._wifeWordsText.width = 390;
        this.addChildToContainer(this._wifeWordsText);
        var wifebattle = Api.switchVoApi.checkOpenWifeBattle();
        //下面属性背景
        this._bottomBg = BaseBitmap.create(wifebattle ? "wifeview_bottombg3" : "wifeview_bottombg2");
        // bottomBg.width = GameConfig.stageWidth;
        // bottomBg.height = 96;
        this._bottomBg.x = 0;
        this._bottomBg.y = GameConfig.stageHeigth - this.container.y - this._bottomBg.height;
        App.LogUtil.log(this._bottomBg.y);
        this.addChildToContainer(this._bottomBg);
        // this._wifeIcon.y = this._bottomBg.y - 840*wifeScale + 120;
        var nameBg = BaseBitmap.create("wifeview_namebg");
        nameBg.name = "nameBg";
        this._nameBg = nameBg;
        //横版名字变竖版名字
        if (PlatformManager.checkIsTextHorizontal()) {
            //红颜名字
            var nameTF = ComponentManager.getTextField(this._wifeInfoVo.name, TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_WHITE);
            nameBg.width = nameTF.width + 40;
            nameBg.x = GameConfig.stageWidth / 2 - nameBg.width / 2;
            nameBg.y = this._bottomBg.y - 100;
            this.addChildToContainer(nameBg);
            nameTF.x = nameBg.x + nameBg.width / 2 - nameTF.width / 2;
            nameTF.y = nameBg.y + nameBg.height / 2 - nameTF.height / 2;
            this._nameTxt = nameTF;
            this.addChildToContainer(nameTF);
        }
        else {
            //红颜名字背景
            nameBg.x = 25;
            nameBg.y = 200;
            this.addChildToContainer(nameBg);
            //红颜名字
            var nameTF = ComponentManager.getTextField(this._wifeInfoVo.name, TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_WHITE);
            nameTF.width = 27;
            nameTF.x = nameBg.x + nameBg.width / 2 - nameTF.width / 2;
            nameTF.y = nameBg.y + 190 / 2 - nameTF.height / 2;
            this._nameTxt = nameTF;
            this.addChildToContainer(nameTF);
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, canHomeBtn, this, [7, 227]);
        this.checkShowDoubleName();
        if (this._isDoubleFly) {
            this._nameTxt.alpha = 0;
            this._nameBg.alpha = 0;
        }
        this._wifeIcon.y = 158;
        if (this._wifeIcon.y + 840 * wifeScale < this._bottomBg.y + 50) {
            this._wifeIcon.y = this._bottomBg.y + 50 - 840 * wifeScale;
        }
        if (this._droWifeIcon) {
            this._droWifeIcon.setScale(1.1);
            this._droWifeIcon.x = this._wifeIcon.x + 230;
            this._droWifeIcon.y = this._wifeIcon.y + 760 * 0.7 + 140;
        }
        if (this._droWifeIcon2) {
            this._droWifeIcon2.setScale(1.1);
            this._droWifeIcon2.x = this._wifeIcon.x + 230;
            this._droWifeIcon2.y = this._wifeIcon.y + 760 * 0.7 + 140;
        }
        this._wordsBg.y = this._wifeIcon.y - 90;
        if (PlatformManager.checkIsRuLang()) {
            this._wordsBg.y = this._wifeIcon.y - 100;
        }
        this._wifeWordsText.y = this._wordsBg.y + 20;
        this._wordsCornerBg.y = this._wordsBg.y + 87;
        var intIcon = BaseBitmap.create("wifeview_vigoricon");
        intIcon.x = wifebattle ? 15 : 50;
        intIcon.y = this._bottomBg.y + 75;
        this.addChildToContainer(intIcon);
        //亲密度
        var IntimacyValue = LanguageManager.getlocal("wifeIntimacy") + " " + App.StringUtil.changeIntToText(this._wifeInfoVo.intimacy);
        this._intimateValueText = ComponentManager.getTextField(IntimacyValue, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._intimateValueText.setColor(TextFieldConst.COLOR_WHITE);
        this._intimateValueText.x = intIcon.x + intIcon.width + 5;
        this._intimateValueText.y = intIcon.y + intIcon.height / 2 - this._intimateValueText.height / 2;
        this.addChildToContainer(this._intimateValueText);
        //子嗣
        var childIcon = BaseBitmap.create("wifeview_childicon");
        childIcon.x = intIcon.x;
        childIcon.y = intIcon.y + intIcon.width;
        this.addChildToContainer(childIcon);
        var childValue = LanguageManager.getlocal("wifeChildren") + " " + App.StringUtil.changeIntToText(this._wifeInfoVo.child);
        this._childrenValueText = ComponentManager.getTextField(childValue, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._childrenValueText.setColor(TextFieldConst.COLOR_WHITE);
        this._childrenValueText.x = this._intimateValueText.x;
        this._childrenValueText.y = childIcon.y + childIcon.height / 2 - this._intimateValueText.height / 2;
        this.addChildToContainer(this._childrenValueText);
        //魅力
        var charmIcon = BaseBitmap.create("wifeview_charmicon");
        charmIcon.x = wifebattle ? 225 : 345;
        charmIcon.y = intIcon.y;
        this.addChildToContainer(charmIcon);
        var charmValue = LanguageManager.getlocal("wifeCharm") + " " + App.StringUtil.changeIntToText(this._wifeInfoVo.glamour);
        this._charmValueText = ComponentManager.getTextField(charmValue, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._charmValueText.setColor(TextFieldConst.COLOR_WHITE);
        this._charmValueText.x = charmIcon.x + charmIcon.width + 5;
        this._charmValueText.y = charmIcon.y + charmIcon.height / 2 - this._intimateValueText.height / 2;
        this.addChildToContainer(this._charmValueText);
        //经验
        var expIcon = BaseBitmap.create("wifeview_vexpicon");
        expIcon.x = charmIcon.x;
        expIcon.y = childIcon.y;
        this.addChildToContainer(expIcon);
        var expValue = LanguageManager.getlocal("wifeExp2") + " " + App.StringUtil.changeIntToText(this._wifeInfoVo.exp);
        this._expValueText = ComponentManager.getTextField(expValue, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._expValueText.setColor(TextFieldConst.COLOR_WHITE);
        this._expValueText.x = charmIcon.x + charmIcon.width + 5;
        this._expValueText.y = this._childrenValueText.y;
        this.addChildToContainer(this._expValueText);
        if (wifebattle) {
            //才艺
            var artIcon = BaseBitmap.create("wifeview_artistryicon");
            artIcon.x = 435;
            artIcon.y = intIcon.y;
            this.addChildToContainer(artIcon);
            var artValue = LanguageManager.getlocal("wifeArt") + " " + App.StringUtil.changeIntToText(this._wifeInfoVo.artistry);
            this._artValueText = ComponentManager.getTextField(artValue, TextFieldConst.FONTSIZE_CONTENT_SMALL);
            this._artValueText.setColor(TextFieldConst.COLOR_WHITE);
            this._artValueText.x = artIcon.x + artIcon.width + 5;
            this._artValueText.y = artIcon.y + artIcon.height / 2 - this._artValueText.height / 2;
            this.addChildToContainer(this._artValueText);
            //才情
            var talentIcon = BaseBitmap.create("wifeview_talenticon");
            talentIcon.x = artIcon.x;
            talentIcon.y = childIcon.y;
            this.addChildToContainer(talentIcon);
            var add = 0;
            if (Api.wifebattleVoApi.wifebattleVo.info && Api.wifebattleVoApi.wifebattleVo.info.tmpattr && Api.wifebattleVoApi.wifebattleVo.info.tmpattr.statusadd) {
                add = Api.wifebattleVoApi.wifebattleVo.info.tmpattr.statusadd;
            }
            var statusadd = add ? add : 0;
            var talentValue = LanguageManager.getlocal("wifeTalent") + " " + App.StringUtil.changeIntToText(Math.floor(this._wifeInfoVo.talent * (1 + statusadd / 100)));
            this._talentValueText = ComponentManager.getTextField(talentValue, TextFieldConst.FONTSIZE_CONTENT_SMALL);
            this._talentValueText.setColor(TextFieldConst.COLOR_WHITE);
            this._talentValueText.x = talentIcon.x + talentIcon.width + 5;
            this._talentValueText.y = this._childrenValueText.y;
            this.addChildToContainer(this._talentValueText);
        }
        // //按钮背景
        // let btnBg:BaseBitmap = BaseBitmap.create("public_9_bg9");
        // btnBg.width = 190;
        // btnBg.height = 260;
        // btnBg.x = 430;
        // btnBg.y = this._bottomBg.y - bottomBg.height - 230;
        // this.addChildToContainer(btnBg);
        var yy = this._bottomBg.y - 50;
        var loveBg = BaseBitmap.create("wifeview_btnbg");
        loveBg.x = 50;
        loveBg.y = yy;
        this.addChildToContainer(loveBg);
        var loveBg2 = BaseBitmap.create("wifeview_btnbg");
        loveBg2.x = 180;
        loveBg2.y = yy;
        this.addChildToContainer(loveBg2);
        var loveBg3 = BaseBitmap.create("wifeview_btnbg");
        loveBg3.x = 310;
        loveBg3.y = yy;
        this.addChildToContainer(loveBg3);
        var loveBg4 = BaseBitmap.create("wifeview_btnbg");
        loveBg4.x = 450;
        loveBg4.y = yy;
        this.addChildToContainer(loveBg4);
        //宠幸按钮
        this._loveBtn = ComponentManager.getButton("wife_love", null, this.loveHander, this, null, 0);
        this._loveBtn.x = 70;
        this._loveBtn.y = yy;
        // this._loveBtn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChildToContainer(this._loveBtn);
        var loveNameBg = BaseBitmap.create("wife_btnbg");
        loveNameBg.x = this._loveBtn.x + 10;
        loveNameBg.y = this._loveBtn.y + 70;
        this.addChildToContainer(loveNameBg);
        var loveNameTF = ComponentManager.getTextField(LanguageManager.getlocal("wifeLoveBtn"), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        loveNameTF.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
        loveNameTF.x = loveNameBg.x + loveNameBg.width / 2 - loveNameTF.width / 2;
        loveNameTF.y = loveNameBg.y + loveNameBg.height / 2 - loveNameTF.height / 2;
        this.addChildToContainer(loveNameTF);
        this._mainTaskHandLoveKey = App.MainTaskHandUtil.addHandNode(this._loveBtn.parent, this._loveBtn.x + this._loveBtn.width / 2, this._loveBtn.y + this._loveBtn.height / 2, [this._loveBtn], 302, true, function () {
            return Api.wifeVoApi.getIdOfIntimacyMax() == String(this._wifeId) && (!Api.rookieVoApi.isGuiding);
        }, this);
        //赏赐按钮
        this._giveBtn = ComponentManager.getButton("wife_give", null, this.giveHander, this, null, 0);
        this._giveBtn.x = 200;
        this._giveBtn.y = yy;
        // this._giveBtn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChildToContainer(this._giveBtn);
        var giveNameBg = BaseBitmap.create("wife_btnbg");
        giveNameBg.x = this._giveBtn.x + 10;
        giveNameBg.y = this._giveBtn.y + 70;
        this.addChildToContainer(giveNameBg);
        this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(this._giveBtn.parent, this._giveBtn.x + this._giveBtn.width / 2, this._giveBtn.y + this._giveBtn.height / 2, [this._giveBtn], 306, true, function () {
            return Api.wifeVoApi.getIdOfIntimacyMax() == String(this._wifeId);
        }, this);
        var giveNameTF = ComponentManager.getTextField(LanguageManager.getlocal("wifeGiveBtn"), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        giveNameTF.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
        giveNameTF.x = giveNameBg.x + giveNameBg.width / 2 - giveNameTF.width / 2;
        giveNameTF.y = giveNameBg.y + giveNameBg.height / 2 - giveNameTF.height / 2;
        this.addChildToContainer(giveNameTF);
        //技能按钮
        this._skillBtn = ComponentManager.getButton("wife_skill", null, this.skillHander, this, null, 0);
        this._skillBtn.x = 333;
        this._skillBtn.y = yy;
        // this._skillBtn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChildToContainer(this._skillBtn);
        var skillNameBg = BaseBitmap.create("wife_btnbg");
        skillNameBg.x = this._skillBtn.x + 10;
        skillNameBg.y = this._skillBtn.y + 70;
        this.addChildToContainer(skillNameBg);
        var skillNameTF = ComponentManager.getTextField(LanguageManager.getlocal("wifeSkillBtn"), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        skillNameTF.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
        skillNameTF.x = skillNameBg.x + skillNameBg.width / 2 - skillNameTF.width / 2;
        skillNameTF.y = skillNameBg.y + skillNameBg.height / 2 - skillNameTF.height / 2;
        this.addChildToContainer(skillNameTF);
        this._mainTaskHandSkillKey = App.MainTaskHandUtil.addHandNode(this.container, this._skillBtn.x + this._skillBtn.width / 2, this._skillBtn.y + this._skillBtn.height / 2, [this._skillBtn], 305, true, function () {
            return Api.wifeVoApi.getMainTaskIntimacyMax() == String(this._wifeId) && (!Api.rookieVoApi.isInGuiding && !Api.rookieVoApi.isGuiding);
        }, this);
        //换装按钮
        this._skinBtn = ComponentManager.getButton("wifeview_skin", null, this.skinHander, this, null, 0);
        this._skinBtn.x = 470;
        this._skinBtn.y = yy;
        // this._skinBtn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChildToContainer(this._skinBtn);
        var skinNameBg = BaseBitmap.create("wife_btnbg");
        skinNameBg.x = this._skinBtn.x + 10;
        skinNameBg.y = this._skinBtn.y + 70;
        this.addChildToContainer(skinNameBg);
        var skinNameTF = ComponentManager.getTextField(LanguageManager.getlocal("wifeskinViewTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        skinNameTF.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
        skinNameTF.x = skinNameBg.x + skinNameBg.width / 2 - skinNameTF.width / 2;
        skinNameTF.y = skinNameBg.y + skinNameBg.height / 2 - skinNameTF.height / 2;
        this.addChildToContainer(skinNameTF);
        this.checkRedPoint();
        if (Api.switchVoApi.checkOpenBanish() && Api.wifebanishVoApi.getIsWifeBanishing(String(this._wifeInfoVo.id))) {
            this._banishContainer = new BaseDisplayObjectContainer();
            //this._banishContainer.setPosition(20,GameConfig.stageHeigth-360);
            this.addChildToContainer(this._banishContainer);
            var banishing = BaseBitmap.create("wife_banishing_icon");
            this._banishContainer.addChild(banishing);
            var banishingbg = BaseBitmap.create("public_numbg");
            banishingbg.y = 62;
            this._banishContainer.addChild(banishingbg);
            banishing.x = banishingbg.width / 2 - banishing.width / 2;
            // let banishingText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("banishing")  ,TextFieldConst.FONTSIZE_ACTIVITY_COMMON);
            // banishingText.setColor(TextFieldConst.COLOR_WARN_GREEN3);
            // banishingText.setPosition(banishingbg.width/2-banishingText.width/2,64);
            // this._banishContainer.addChild(banishingText);
            var banishingText = BaseBitmap.create("wife_banishing_text");
            banishingText.setPosition(banishingbg.width / 2 - banishingText.width / 2, 64);
            this._banishContainer.addChild(banishingText);
            this._banishTime = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            this._banishTime.width = banishingbg.width;
            this._banishTime.setPosition(0, banishingText.y + banishingText.height + 3);
            this._banishTime.textAlign = egret.HorizontalAlign.CENTER;
            this._banishContainer.addChild(this._banishTime);
            banishingbg.height = 48;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, this._banishContainer, nameBg, [0, -this._banishContainer.height - 3]);
            this.tick();
        }
        if (this.param.data.wifeSkinId) {
            this.skinHander();
        }
        if (this._dgbone) {
            this._dgbone.dispose();
            this._dgbone = null;
        }
        var info = Api.wifeVoApi.getWifeInfoVoById(this._wifeId);
        this._bg.setload(info.bgRes);
        if (App.CommonUtil.check_dragon() && info.bgRes != "" && info.bgRes != "wifeview_optbg" && info.bgRes != "malewifebg") {
            var arr = info.bgRes.split("_");
            var dgbone = App.DragonBonesUtil.getLoadDragonBones("scene_wifeskin_" + arr[1]);
            dgbone.x = 0;
            dgbone.y = this._pos["scene_wifeskin_" + arr[1]].y;
            dgbone.setAnchorOffset(0, 0 - this._pos["scene_wifeskin_" + arr[1]].height);
            this.container.addChildAt(dgbone, this.container.getChildIndex(this._bg) + 1);
            this._dgbone = dgbone;
        }
        // this.moveUiUp();
        //红颜切换
        this.showWifeSwitchBtn();
    };
    //红颜切换按钮
    WifeOptView.prototype.showWifeSwitchBtn = function () {
        var wifeInfoVoList = Api.wifeVoApi.getWifeInfoVoList();
        App.LogUtil.log("showWifeSwitchBtn00 : " + wifeInfoVoList.length);
        if (wifeInfoVoList.length <= 1) {
            return;
        }
        App.LogUtil.log("showWifeSwitchBtn0: " + wifeInfoVoList.length);
        var lastDropIdx = Api.otherInfoVoApi.getWifeSortId();
        this._wifeInfoVoList = new Array();
        // this._wifeInfoVoList.push(null);
        this._wifeInfoVoList = this._wifeInfoVoList.concat(wifeInfoVoList);
        var key = "";
        switch (Number(lastDropIdx)) {
            case 1:
                break;
            case 2:
                key = "intimacy";
                break;
            case 3:
                key = "glamour";
                break;
            case 4:
                key = "artistry";
                break;
        }
        if (key != "") {
            this._wifeInfoVoList.sort(function (a, b) {
                if (a && b) {
                    var isexcilea = Api.wifebanishVoApi.getIsWifeBanishing(a.id.toString());
                    var isexcileb = Api.wifebanishVoApi.getIsWifeBanishing(b.id.toString());
                    if (isexcilea && isexcileb) {
                        if (key != "") {
                            return b[key] - a[key];
                        }
                        return -1;
                    }
                    else if (isexcilea) {
                        return 1;
                    }
                    else if (isexcileb) {
                        return -1;
                    }
                    else {
                        if (key != "") {
                            return b[key] - a[key];
                        }
                        return -1;
                    }
                }
            });
        }
        App.LogUtil.log("showWifeSwitchBtn0: " + this.container.height);
        // this._wifeInfoVoList.push(null);
        App.LogUtil.log("showWifeSwitchBtn0: " + this._wifeInfoVoList.length);
        //179 187
        var leftAniContainer = new BaseDisplayObjectContainer();
        leftAniContainer.setPosition(0, this.container.height / 2 - 120);
        this.addChildToContainer(leftAniContainer);
        this._leftAniContainer = leftAniContainer;
        var leftAni = ComponentManager.getCustomMovieClip("wifeswitch_btneffect", 15, 70);
        leftAni.skewY = 180;
        leftAni.setPosition(115, 0);
        // this.addChildToContainer(leftAni);
        leftAniContainer.addChild(leftAni);
        leftAni.playWithTime(0);
        var leftAlphaBg = BaseBitmap.create("public_alphabg");
        leftAlphaBg.width = 179;
        leftAlphaBg.height = 187;
        leftAlphaBg.setPosition(0, leftAni.y);
        leftAniContainer.addChild(leftAlphaBg);
        leftAlphaBg.addTouchTap(this.wifeSwitchHandler, this, ["left"]);
        var rightAniContainer = new BaseDisplayObjectContainer();
        rightAniContainer.setPosition(GameConfig.stageWidth - 115, this.container.height / 2 - 120);
        this.addChildToContainer(rightAniContainer);
        this._rightAniContainer = rightAniContainer;
        var rightAni = ComponentManager.getCustomMovieClip("wifeswitch_btneffect", 15, 70);
        rightAni.setPosition(0, 0);
        rightAniContainer.addChild(rightAni);
        rightAni.playWithTime(0);
        var rightAlphaBg = BaseBitmap.create("public_alphabg");
        rightAlphaBg.width = 179;
        rightAlphaBg.height = 187;
        rightAlphaBg.setPosition(rightAni.x, rightAni.y);
        rightAniContainer.addChild(rightAlphaBg);
        rightAlphaBg.addTouchTap(this.wifeSwitchHandler, this, ["right"]);
        for (var i = 0; i < this._wifeInfoVoList.length; i++) {
            if (String(this._wifeInfoVoList[i].id) == this._wifeId) {
                this._wifeIndex = i;
                break;
            }
        }
        App.LogUtil.log("wifeIndex: " + this._wifeIndex);
    };
    WifeOptView.prototype.wifeSwitchHandler = function (evt, type) {
        App.LogUtil.log("wifeSwitchHandler: " + type);
        var curS = egret.getTimer();
        if (curS - this._switchDelta < 400) {
            return;
        }
        this._switchDelta = curS;
        if (this._isSwitching) {
            return;
        }
        if (type == "left") {
            this._wifeIndex -= 1;
            this._isLeftClick = true;
            if (this._wifeIndex < 0) {
                this._wifeIndex = this._wifeInfoVoList.length - 1;
            }
        }
        else {
            this._wifeIndex += 1;
            this._isLeftClick = false;
            if (this._wifeIndex >= this._wifeInfoVoList.length) {
                this._wifeIndex = 0;
            }
        }
        this._isSwitching = true;
        App.LogUtil.log("wifeIndex: " + this._wifeIndex);
        this.refreshSwitchWifeView();
    };
    WifeOptView.prototype.refreshSwitchWifeView = function () {
        var _this = this;
        var id = String(this._wifeInfoVoList[this._wifeIndex].id);
        this._wifeId = id;
        this._isDoubleFly = (this._wifeId == "236");
        this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
        var wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(this._wifeInfoVo.id);
        var wifecfg = Config.WifeCfg.getWifeCfgById(id);
        this._homeBtn.visible = false;
        this._homeBtn.setBtnBitMap("wifehomebtn");
        var sound = '';
        var words = '';
        WifeView.wifeId = id;
        if (wifeSkinVo && wifeSkinVo.equip != "") {
            var skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
            if ((skinCfg.isBlueSkin && wifecfg.isBule()) || (!skinCfg.isBlueSkin && !wifecfg.isBule())) {
                sound = skinCfg.sound;
                words = skinCfg.words;
            }
            else {
                sound = this._wifeInfoVo.sound;
                words = this._wifeInfoVo.words;
                if (wifecfg.canAtHome) {
                    this._dangjiaId = id;
                    this._homeBtn.visible = true;
                    var str = Api.otherInfoVoApi.getDangjiaWifeId();
                    if ((str != "" && (Number(str) == Number(id)) || (Number(id) == 101 && str == ""))) {
                        this._homeBtn.setBtnBitMap("wifeinihomebtn");
                    }
                }
            }
        }
        else {
            sound = this._wifeInfoVo.sound;
            words = this._wifeInfoVo.words;
            if (wifecfg.canAtHome) {
                this._dangjiaId = id;
                this._homeBtn.visible = true;
                var str = Api.otherInfoVoApi.getDangjiaWifeId();
                if ((str != "" && (Number(str) == Number(id)) || (Number(id) == 101 && str == ""))) {
                    this._homeBtn.setBtnBitMap("wifeinihomebtn");
                }
            }
        }
        //蓝颜说的话和语音要对应
        var blueSoundIndex = 0;
        if (Api.switchVoApi.checkOpenBlueWife() && Api.gameinfoVoApi.getSexswitch() && Api.wifeVoApi.checkWifeCanChangeSex(id) && this._wifeInfoVo.sexflag) {
            blueSoundIndex = App.MathUtil.getRandom(1, 4);
        }
        if (1) {
            var soundRes = '';
            if (wifeSkinVo && wifeSkinVo.equip != "") {
                var skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
                if ((skinCfg.isBlueSkin && wifecfg.isBule()) || (!skinCfg.isBlueSkin && !wifecfg.isBule())) {
                    soundRes = skinCfg.sound;
                }
                else {
                    soundRes = this._wifeInfoVo.sound;
                    if (blueSoundIndex) {
                        soundRes = this._wifeInfoVo.getBlueSound(blueSoundIndex);
                    }
                }
            }
            else {
                soundRes = this._wifeInfoVo.sound;
                if (blueSoundIndex) {
                    soundRes = this._wifeInfoVo.getBlueSound(blueSoundIndex);
                }
            }
            this.playEffect(soundRes, true);
        }
        //顶部文字
        this._wifeDescText.text = this._wifeInfoVo.desc;
        //转生按钮
        App.LogUtil.log("wifecfg.canBlueWife: " + wifecfg.canBlueWife);
        if (Api.switchVoApi.checkIsInBlueWife() && wifecfg.canBlueWife) {
            if (this._changesexBtn) {
                App.LogUtil.log("wifecfg.canBlueWife 0: ");
                this._changesexBtn.visible = true;
            }
            else {
                App.LogUtil.log("wifecfg.canBlueWife 1: ");
                var changesexBtn = ComponentManager.getButton("wifechangesexbtn", "", function () {
                    ViewController.getInstance().openView(ViewConst.COMMON.WIFECHANGESEXVIEW, {
                        wid: _this._wifeInfoVo.id,
                        sex: _this._wifeInfoVo.sexflag
                    });
                }, this);
                changesexBtn.setPosition(GameConfig.stageWidth - 7 - changesexBtn.width, GameConfig.stageHeigth - 227 - changesexBtn.height);
                // App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, changesexBtn, this, [7,227]);
                this.addChild(changesexBtn);
                this._bg.setload(this._wifeInfoVo.sexflag == 0 ? "wifeview_optbg" : "malewifebg");
                this._changesexBtn = changesexBtn;
            }
        }
        else {
            App.LogUtil.log("wifecfg.canBlueWife 2: ");
            if (this._changesexBtn) {
                this._changesexBtn.visible = false;
                App.LogUtil.log("wifecfg.canBlueWife 3: ");
            }
        }
        //红颜
        if (this._droWifeIcon) {
            this._droWifeIcon.dispose();
            this._droWifeIcon = null;
        }
        if (this._droWifeIcon2) {
            this._droWifeIcon2.dispose();
            this._droWifeIcon2 = null;
        }
        var wifePicStr = this._wifeInfoVo.body;
        if (Api.wifeSkinVoApi.isHaveSkin(this._wifeInfoVo.id)) {
            var wifeSkinVo_2 = Api.wifeSkinVoApi.getWifeskinInfoVoById(this._wifeInfoVo.id);
            if (wifeSkinVo_2 && wifeSkinVo_2.equip != "") {
                var skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo_2.equip);
                wifePicStr = skinCfg.body;
                var bonename = this.checkBoneName(skinCfg.bone);
                if (Api.wifeVoApi.isHaveBone(bonename + "_ske")) {
                    this._droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(bonename);
                    // this.addChildToContainer(this._droWifeIcon);
                    this.container.addChildAt(this._droWifeIcon, this.container.getChildIndex(this._bg) + 1);
                }
                if (skinCfg.canAtHome) {
                    this._dangjiaId = wifeSkinVo_2.equip;
                    this._homeBtn.visible = true;
                    var str = Api.otherInfoVoApi.getDangjiaWifeId();
                    if ((str != "" && (Number(str) == Number(this._dangjiaId)) || (Number(id) == 101 && str == ""))) {
                        this._homeBtn.setBtnBitMap("wifeinihomebtn");
                    }
                }
            }
            else {
                var bonename = this.checkBoneName(this._wifeInfoVo.bone);
                if (Api.wifeVoApi.isHaveBone(bonename + "_ske")) {
                    this._droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(bonename);
                    // this.addChildToContainer(this._droWifeIcon);
                    this.container.addChildAt(this._droWifeIcon, this.container.getChildIndex(this._bg) + 1);
                }
                if (wifecfg.canAtHome) {
                    this._dangjiaId = id;
                    this._homeBtn.visible = true;
                    var str = Api.otherInfoVoApi.getDangjiaWifeId();
                    if ((str != "" && (Number(str) == Number(id)) || (Number(id) == 101 && str == ""))) {
                        this._homeBtn.setBtnBitMap("wifeinihomebtn");
                    }
                }
            }
        }
        else {
            var bonename = this.checkBoneName(this._wifeInfoVo.bone);
            if (Api.wifeVoApi.isHaveBone(bonename + "_ske")) {
                this._droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(bonename);
                // this.addChildToContainer(this._droWifeIcon);
                this.container.addChildAt(this._droWifeIcon, this.container.getChildIndex(this._bg) + 1);
            }
            if (wifecfg.canAtHome) {
                this._dangjiaId = id;
                this._homeBtn.visible = true;
                var str = Api.otherInfoVoApi.getDangjiaWifeId();
                if ((str != "" && (Number(str) == Number(id)) || (Number(id) == 101 && str == ""))) {
                    this._homeBtn.setBtnBitMap("wifeinihomebtn");
                }
            }
        }
        this._wifeIcon.visible = false;
        this._wifeIcon.setload(wifePicStr);
        if (this._droWifeIcon) {
            this._wifeIcon.visible = false;
            if (this._isDoubleFly) {
                var twoName = this.getDoubleFlyBoneByName(this._droWifeIcon.getBoneName());
                if (Api.wifeVoApi.isHaveBone(twoName + "_ske")) {
                    this._droWifeIcon2 = App.DragonBonesUtil.getLoadDragonBones(twoName);
                    this.container.addChildAt(this._droWifeIcon2, this.container.getChildIndex(this._droWifeIcon));
                }
            }
        }
        else {
            this._wifeIcon.visible = true;
        }
        //红颜说的话
        this._wifeWordsText.text = words;
        //属性背景
        var wifebattle = Api.switchVoApi.checkOpenWifeBattle();
        this._bottomBg.setRes(wifebattle ? "wifeview_bottombg3" : "wifeview_bottombg2");
        //红颜名字
        this._nameTxt.text = this._wifeInfoVo.name;
        this.checkShowDoubleName();
        var nameBg = this.container.getChildByName("nameBg");
        if (PlatformManager.checkIsTextHorizontal()) {
            nameBg.width = this._nameTxt.width + 40;
            nameBg.x = GameConfig.stageWidth / 2 - nameBg.width / 2;
            this._nameTxt.x = nameBg.x + nameBg.width / 2 - this._nameTxt.width / 2;
        }
        else {
            this._nameTxt.y = nameBg.y + 190 / 2 - this._nameTxt.height / 2;
        }
        var wifeScale = 0.8;
        this._wifeIcon.y = 158;
        if (this._wifeIcon.y + 840 * wifeScale < this._bottomBg.y + 50) {
            this._wifeIcon.y = this._bottomBg.y + 50 - 840 * wifeScale;
        }
        if (this._droWifeIcon) {
            this._droWifeIcon.setScale(1.1);
            this._droWifeIcon.x = this._wifeIcon.x + 230;
            this._droWifeIcon.y = this._wifeIcon.y + 760 * 0.7 + 140;
        }
        if (this._droWifeIcon2) {
            this._droWifeIcon2.setScale(1.1);
            this._droWifeIcon2.x = this._wifeIcon.x + 230;
            this._droWifeIcon2.y = this._wifeIcon.y + 760 * 0.7 + 140;
        }
        this._wordsBg.y = this._wifeIcon.y - 90;
        if (PlatformManager.checkIsRuLang()) {
            this._wordsBg.y = this._wifeIcon.y - 100;
        }
        this._wifeWordsText.y = this._wordsBg.y + 20;
        this._wordsCornerBg.y = this._wordsBg.y + 87;
        //动画
        var waitT = 250;
        if (this._isDoubleFly) {
            egret.Tween.get(nameBg).to({ alpha: 0 }, 50);
            egret.Tween.get(this._nameTxt).to({ alpha: 0 }, 50);
            this._doubleContainer.alpha = 0;
            egret.Tween.get(this._doubleContainer).wait(waitT + 50).to({ alpha: 1 }, 100);
        }
        else {
            if (this._doubleContainer) {
                egret.Tween.get(this._doubleContainer).to({ alpha: 0 }, 50);
            }
            egret.Tween.get(nameBg).to({ alpha: 0 }, 50).wait(waitT).to({ alpha: 1 }, 100);
            egret.Tween.get(this._nameTxt).to({ alpha: 0 }, 50).wait(waitT).to({ alpha: 1 }, 100);
        }
        egret.Tween.get(this._wordsBg).to({ alpha: 0 }, 50).wait(waitT).to({ alpha: 1 }, 100);
        egret.Tween.get(this._wifeWordsText).to({ alpha: 0 }, 50).wait(waitT).to({ alpha: 1 }, 100);
        egret.Tween.get(this._wordsCornerBg).to({ alpha: 0 }, 50).wait(waitT).to({ alpha: 1 }, 100);
        var moveOffX = 200;
        if (this._isLeftClick) {
            moveOffX = -200;
        }
        if (this._droWifeIcon && this._droWifeIcon.visible == true) {
            egret.Tween.get(this._droWifeIcon).to({ alpha: 0 }).set({ x: this._droWifeIcon.x + moveOffX }).wait(150).to({ alpha: 1, x: this._droWifeIcon.x }, 250).call(function () {
                _this._isSwitching = false;
            });
            if (this._droWifeIcon2 && this._droWifeIcon2.visible == true) {
                egret.Tween.get(this._droWifeIcon2).to({ alpha: 0 }).set({ x: this._droWifeIcon2.x + moveOffX }).wait(150).to({ alpha: 1, x: this._droWifeIcon2.x }, 250);
            }
        }
        else if (this._wifeIcon && this._wifeIcon.visible == true) {
            egret.Tween.get(this._wifeIcon).to({ alpha: 0 }).set({ x: 80 + moveOffX }).wait(150).to({ alpha: 1, x: 80 }, 250).call(function () {
                _this._isSwitching = false;
            });
        }
        this.checkRedPoint();
        if (Api.switchVoApi.checkOpenBanish() && Api.wifebanishVoApi.getIsWifeBanishing(String(this._wifeInfoVo.id))) {
            if (this._banishContainer) {
                this._banishContainer.visible = true;
            }
            else {
                this._banishContainer = new BaseDisplayObjectContainer();
                //this._banishContainer.setPosition(20,GameConfig.stageHeigth-360);
                this.addChildToContainer(this._banishContainer);
                var banishing = BaseBitmap.create("wife_banishing_icon");
                this._banishContainer.addChild(banishing);
                var banishingbg = BaseBitmap.create("public_numbg");
                banishingbg.y = 62;
                this._banishContainer.addChild(banishingbg);
                banishing.x = banishingbg.width / 2 - banishing.width / 2;
                var banishingText = BaseBitmap.create("wife_banishing_text");
                banishingText.setPosition(banishingbg.width / 2 - banishingText.width / 2, 64);
                this._banishContainer.addChild(banishingText);
                this._banishTime = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
                this._banishTime.width = banishingbg.width;
                this._banishTime.setPosition(0, banishingText.y + banishingText.height + 3);
                this._banishTime.textAlign = egret.HorizontalAlign.CENTER;
                this._banishContainer.addChild(this._banishTime);
                banishingbg.height = 48;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, this._banishContainer, nameBg, [0, -this._banishContainer.height - 3]);
            }
            this.tick();
        }
        else {
            if (this._banishContainer) {
                this._banishContainer.visible = false;
            }
        }
        if (this._dgbone) {
            this._dgbone.dispose();
            this._dgbone = null;
        }
        var info = Api.wifeVoApi.getWifeInfoVoById(this._wifeId);
        this._bg.setload(info.bgRes);
        if (App.CommonUtil.check_dragon() && info.bgRes != "" && info.bgRes != "wifeview_optbg" && info.bgRes != "malewifebg") {
            var arr = info.bgRes.split("_");
            var dgbone = App.DragonBonesUtil.getLoadDragonBones("scene_wifeskin_" + arr[1]);
            dgbone.x = 0;
            dgbone.y = this._pos["scene_wifeskin_" + arr[1]].y;
            dgbone.setAnchorOffset(0, 0 - this._pos["scene_wifeskin_" + arr[1]].height);
            this.container.addChildAt(dgbone, this.container.getChildIndex(this._bg) + 1);
            this._dgbone = dgbone;
        }
    };
    WifeOptView.prototype.tick = function () {
        var banishInfo = Api.wifebanishVoApi.getBanishInfoVoByWife(this._wifeInfoVo.id);
        if (this._banishTime && banishInfo && banishInfo.et >= GameData.serverTime) {
            var lastStr = App.DateUtil.getFormatBySecondIntoTime(banishInfo.et - GameData.serverTime);
            this._banishTime.text = LanguageManager.getlocal("friends_collectLastTime", [lastStr]);
        }
        else {
            if (this._banishContainer) {
                this._banishContainer.dispose();
                this._banishContainer = null;
            }
        }
    };
    WifeOptView.prototype.checkRedPoint = function () {
        this.refreshInfoAfterLove();
        //赏赐红点
        if (Api.switchVoApi.checkOpenBanish() && Api.wifebanishVoApi.getIsWifeBanishing(String(this._wifeInfoVo.id))) {
            return;
        }
        if (Api.wifeVoApi.getGiveRed()) {
            if (this._giveDotSp == null) {
                this._giveDotSp = BaseBitmap.create("public_dot2");
                this._giveDotSp.x = this._giveBtn.x + this._giveBtn.width - this._giveDotSp.width;
                this._giveDotSp.y = this._giveBtn.y;
                this.addChildToContainer(this._giveDotSp);
            }
            else {
                if (this._giveDotSp) {
                    this._giveDotSp.visible = true;
                }
            }
        }
        else {
            if (this._giveDotSp) {
                this._giveDotSp.visible = false;
            }
        }
        //技能红点
        if (Api.wifeVoApi.getSkillRed(this._wifeInfoVo.id)) {
            if (this._skillDotSp == null) {
                this._skillDotSp = BaseBitmap.create("public_dot2");
                this._skillDotSp.x = this._skillBtn.x + this._skillBtn.width - this._skillDotSp.width;
                this._skillDotSp.y = this._skillBtn.y;
                this.addChildToContainer(this._skillDotSp);
            }
            else {
                if (this._skillDotSp) {
                    this._skillDotSp.visible = true;
                }
            }
        }
        else {
            if (this._skillDotSp) {
                this._skillDotSp.visible = false;
            }
        }
        //皮肤红点
        if (Api.wifeSkinVoApi.getSkinRed(this._wifeId)) {
            if (this._skinDotSp == null) {
                this._skinDotSp = BaseBitmap.create("public_dot2");
                this._skinDotSp.x = this._skinBtn.x + this._skinBtn.width - this._skinDotSp.width;
                this._skinDotSp.y = this._skinBtn.y;
                this.addChildToContainer(this._skinDotSp);
            }
            else {
                if (this._skinDotSp) {
                    this._skinDotSp.visible = true;
                }
            }
        }
        else {
            if (this._skinDotSp) {
                this._skinDotSp.visible = false;
            }
        }
    };
    WifeOptView.prototype.loveHander = function () {
        if (this._isMoving) {
            return;
        }
        var gem = Api.playerVoApi.getPlayerGem();
        var needGem = Api.wifeVoApi.getLoveNeedGem(this._wifeInfoVo.intimacy);
        var addInfo = Api.wifeVoApi.getDecreePolicyAddAttrInfo2();
        var decreeStr = "";
        var costV = 0;
        if (addInfo) {
            if (addInfo.lastTimes > 0) {
                costV = Math.floor(addInfo.addExtent * needGem);
                decreeStr = LanguageManager.getlocal("decreeAttrAddTxt7_1", [addInfo.strKey2, "" + costV]);
            }
        }
        this._decreeGoldCost = costV;
        var message = LanguageManager.getlocal("wifeLoveUseGem", [App.StringUtil.toString(needGem) + decreeStr, this._wifeInfoVo.name]);
        ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, { useNum: needGem - costV, confirmCallback: this.confirmCallbackHandler, handler: this, icon: "itemicon1", iconBg: "itembg_1", num: gem, msg: message, id: 1, isMainTask: 1 });
    };
    WifeOptView.prototype.giveHander = function () {
        if (this._isMoving) {
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.WIFEGIVEPOPUPVIEW, { id: this._wifeId, confirmCallback: this.confirmCallbackHandler, handler: this });
    };
    WifeOptView.prototype.skillHander = function () {
        if (this._isMoving) {
            return;
        }
        var id = this._wifeId;
        // let wifeCfg = Config.WifeCfg.getWifeCfgById(id);
        // if (wifeCfg.wifeSkill2 && Api.practiceVoApi.isPracticeUnlock()){
        // 	ViewController.getInstance().openView(ViewConst.POPUP.WIFEMULTISKILLPOPUPVIEW,{id:id, confirmCallback:this.confirmCallbackHandler,handler:this});
        // }
        // else{
        ViewController.getInstance().openView(ViewConst.POPUP.WIFESKILLPOPUPVIEW, { id: id, confirmCallback: this.confirmCallbackHandler, handler: this });
        // }
    };
    WifeOptView.prototype.skinHander = function () {
        if (Api.switchVoApi.checkCloseWifeskin()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("sysWaitOpen"));
            return;
        }
        if (this._isMoving) {
            return;
        }
        var id = this._wifeId;
        if (!Api.wifeSkinVoApi.isHaveSkin(id)) {
            App.CommonUtil.showTip(LanguageManager.getlocal("wifeskinNoSkin"));
            return;
        }
        if (this._droWifeIcon) {
            // if(this.container&&this.container.contains(this._droWifeIcon))
            // {
            // }
            // this.container.removeChild(this._droWifeIcon)
            // this._droWifeIcon.dispose();
            // this._droWifeIcon = null;
            this._droWifeIcon.stop();
        }
        if (this._droWifeIcon2) {
            this._droWifeIcon2.stop();
        }
        if (Api.switchVoApi.checkWifeSkinLevelUp()) {
            if (this._dgbone) {
                this._dgbone.dispose();
                this._dgbone = null;
            }
            //App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SERVANTBONE);
            ViewController.getInstance().openView(ViewConst.POPUP.WIFESKINNEWVIEW, { id: this._wifeId, wifeSkinId: this.param.data.wifeSkinId, confirmCallback: this.confirmCallbackHandler, handler: this });
        }
        else {
            ViewController.getInstance().openView(ViewConst.POPUP.WIFESKINVIEW, { id: this._wifeId, wifeSkinId: this.param.data.wifeSkinId, confirmCallback: this.confirmCallbackHandler, handler: this });
        }
    };
    WifeOptView.prototype.confirmCallbackHandler = function () {
        var id = this._wifeId;
        // if(!Api.wifeSkinVoApi.isHaveSkin(id))
        // {
        // 	App.CommonUtil.showTip(LanguageManager.getlocal("wifeskinNoSkin"));
        // 	return;
        // }
        // let wifeInfoVo:WifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
        if (Api.playerVoApi.getPlayerGem() < Api.wifeVoApi.getLoveNeedGem(this._wifeInfoVo.intimacy) - this._decreeGoldCost) {
            App.CommonUtil.showTip(LanguageManager.getlocal("wifeLoveTip1"));
            return;
        }
        var idStr = App.StringUtil.toString(id);
        this.request(NetRequestConst.REQUEST_WIFE_LOVE, { wifeId: idStr });
        if (this._droWifeIcon) {
            // if(this.container&&this.container.contains(this._droWifeIcon))
            // {
            // }
            // this.container.removeChild(this._droWifeIcon)
            // this._droWifeIcon.dispose();
            // this._droWifeIcon = null;
            this._droWifeIcon.stop();
            if (this._droWifeIcon2) {
                this._droWifeIcon2.stop();
            }
        }
    };
    //宠幸之后刷新数据
    WifeOptView.prototype.receiveData = function (data) {
        if (!data.ret) {
            return;
        }
        if (data.data.ret < 0) {
            return;
        }
        if (data.data.cmd == NetRequestConst.REQUEST_WIFE_LOVE) {
            var id = this._wifeId;
            this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
            //亲密度
            var IntimacyValue = LanguageManager.getlocal("wifeIntimacy") + " " + this._wifeInfoVo.intimacy;
            this._intimateValueText.text = IntimacyValue;
            //子嗣
            var childValue = LanguageManager.getlocal("wifeChildren") + " " + this._wifeInfoVo.child;
            this._childrenValueText.text = childValue;
            var charmValue = LanguageManager.getlocal("wifeCharm") + " " + this._wifeInfoVo.glamour;
            this._charmValueText.text = charmValue;
            var expValue = LanguageManager.getlocal("wifeExp2") + " " + this._wifeInfoVo.exp;
            this._expValueText.text = expValue;
            if (this._artValueText) {
                this._artValueText.text = LanguageManager.getlocal("wifeArt") + " " + App.StringUtil.changeIntToText(this._wifeInfoVo.artistry);
            }
            if (this._talentValueText) {
                var add = 0;
                if (Api.wifebattleVoApi.wifebattleVo.info && Api.wifebattleVoApi.wifebattleVo.info.tmpattr && Api.wifebattleVoApi.wifebattleVo.info.tmpattr.statusadd) {
                    add = Api.wifebattleVoApi.wifebattleVo.info.tmpattr.statusadd;
                }
                var statusadd = add ? add : 0;
                this._talentValueText.text = LanguageManager.getlocal("wifeTalent") + " " + App.StringUtil.changeIntToText(Math.floor(this._wifeInfoVo.talent * (1 + statusadd / 100)));
            }
            var childData = null;
            if (data.data.data.childArr.length > 0) {
                childData = data.data.data.childArr[0];
            }
            // if(this._droWifeIcon)
            // {
            // 	this._droWifeIcon.dispose();
            // 	this._droWifeIcon = null;
            // }
            ViewController.getInstance().openView(ViewConst.BASE.WIFELOVEANIVIEW, { id: this._wifeId, type: 2, childData: childData, rewards: data.data.data.rewards });
            // if(data.data.data.rewards)
            // {
            // 	let rewards= GameData.formatRewardItem(data.data.data.rewards);
            // 	if(rewards&&rewards.length>0)
            // 	{
            // 		App.CommonUtil.playRewardFlyAction(rewards);
            // 	}
            // }
        }
    };
    WifeOptView.prototype.refreshInfoAfterLove = function () {
        var id = this._wifeId;
        this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
        //亲密度
        var IntimacyValue = LanguageManager.getlocal("wifeIntimacy") + " " + this._wifeInfoVo.intimacy;
        this._intimateValueText.text = IntimacyValue;
        //子嗣
        var childValue = LanguageManager.getlocal("wifeChildren") + " " + this._wifeInfoVo.child;
        this._childrenValueText.text = childValue;
        var charmValue = LanguageManager.getlocal("wifeCharm") + " " + this._wifeInfoVo.glamour;
        this._charmValueText.text = charmValue;
        var expValue = LanguageManager.getlocal("wifeExp2") + " " + App.StringUtil.changeIntToText(this._wifeInfoVo.exp);
        this._expValueText.text = expValue;
        if (this._artValueText) {
            this._artValueText.text = LanguageManager.getlocal("wifeArt") + " " + App.StringUtil.changeIntToText(this._wifeInfoVo.artistry);
        }
        if (this._talentValueText) {
            var add = 0;
            if (Api.wifebattleVoApi.wifebattleVo.info && Api.wifebattleVoApi.wifebattleVo.info.tmpattr && Api.wifebattleVoApi.wifebattleVo.info.tmpattr.statusadd) {
                add = Api.wifebattleVoApi.wifebattleVo.info.tmpattr.statusadd;
            }
            var statusadd = add ? add : 0;
            this._talentValueText.text = LanguageManager.getlocal("wifeTalent") + " " + App.StringUtil.changeIntToText(Math.floor(this._wifeInfoVo.talent * (1 + statusadd / 100)));
        }
    };
    WifeOptView.prototype.refreshInfoAfterSkin = function () {
        var id = this._wifeId;
        this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
        var wifeInfo = Api.wifeVoApi.getWifeInfoVoById(id);
        var wifePic = wifeInfo.body;
        var wifecfg = Config.WifeCfg.getWifeCfgById(id);
        this._homeBtn.visible = false;
        if (Api.wifeSkinVoApi.isHaveSkin(wifeInfo.id)) {
            var wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeInfo.id);
            if (wifeSkinVo && wifeSkinVo.equip != "") {
                var skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
                wifePic = skinCfg.body;
                if (skinCfg.canAtHome) {
                    this._dangjiaId = wifeSkinVo.equip;
                    this._homeBtn.visible = true;
                }
            }
            else {
                if (wifecfg.canAtHome) {
                    this._dangjiaId = id;
                    this._homeBtn.visible = true;
                }
            }
        }
        else {
            if (wifecfg.canAtHome) {
                this._dangjiaId = id;
                this._homeBtn.visible = true;
            }
        }
        var str = Api.otherInfoVoApi.getDangjiaWifeId();
        if ((str != "" && (Number(str) == Number(this._dangjiaId)) || (Number(this._wifeId) == 101 && str == ""))) {
            this._homeBtn.setBtnBitMap("wifeinihomebtn");
        }
        this._wifeIcon.setload(wifePic);
        this.checkDro();
    };
    WifeOptView.prototype.checkDro = function () {
        var id = this._wifeId;
        var wifecfg = Config.WifeCfg.getWifeCfgById(id);
        if (this._droWifeIcon) {
            this._droWifeIcon.dispose();
            this._droWifeIcon = null;
        }
        if (this._droWifeIcon2) {
            this._droWifeIcon2.dispose();
            this._droWifeIcon2 = null;
        }
        var bg2Index = this.container.getChildIndex(this._wifeIcon);
        this._homeBtn.visible = false;
        if (Api.wifeSkinVoApi.isHaveSkin(this._wifeInfoVo.id)) {
            var wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(this._wifeInfoVo.id);
            if (wifeSkinVo && wifeSkinVo.equip != "") {
                var skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
                var bonename = this.checkBoneName(skinCfg.bone);
                if (Api.wifeVoApi.isHaveBone(bonename + "_ske")) {
                    this._droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(bonename);
                    // this._droWifeIcon.setScale(0.7) 
                    // this._droWifeIcon.x = 0;
                    // this._droWifeIcon.y = 0;
                    this.container.addChildAt(this._droWifeIcon, bg2Index);
                    this._wifeIcon.visible = false;
                }
                if (skinCfg.canAtHome) {
                    this._dangjiaId = wifeSkinVo.equip;
                    this._homeBtn.visible = true;
                }
            }
            else {
                if (wifecfg.canAtHome) {
                    this._dangjiaId = id;
                    this._homeBtn.visible = true;
                }
                var bonename = this.checkBoneName(this._wifeInfoVo.bone);
                if (Api.wifeVoApi.isHaveBone(bonename + "_ske")) {
                    this._droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(bonename);
                    // this._droWifeIcon.setScale(0.7)
                    // this._droWifeIcon.x = this._wifeIcon.x;
                    // this._droWifeIcon.y = this._wifeIcon.y;
                    this.container.addChildAt(this._droWifeIcon, bg2Index);
                }
            }
        }
        else {
            var bonename = this.checkBoneName(this._wifeInfoVo.bone);
            if (Api.wifeVoApi.isHaveBone(bonename + "_ske")) {
                this._droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(bonename);
                // this._droWifeIcon.setScale(0.7)
                // this._droWifeIcon.x = this._wifeIcon.x;
                // this._droWifeIcon.y = this._wifeIcon.y;
                this.container.addChildAt(this._droWifeIcon, bg2Index);
                this._wifeIcon.visible = false;
            }
            if (wifecfg.canAtHome) {
                this._dangjiaId = id;
                this._homeBtn.visible = true;
            }
        }
        if (this._droWifeIcon) {
            this._droWifeIcon.setScale(1.1);
            this._droWifeIcon.x = this._wifeIcon.x + 230;
            this._droWifeIcon.y = this._wifeIcon.y + 760 * 0.7 + 140;
            this._wifeIcon.visible = false;
            if (this._droWifeIcon2) {
                this._droWifeIcon2.setScale(1.1);
                this._droWifeIcon2.x = this._wifeIcon.x + 230;
                this._droWifeIcon2.y = this._wifeIcon.y + 760 * 0.7 + 140;
            }
        }
        else {
            this._wifeIcon.visible = true;
        }
        // this._droWifeIcon2 = this._droWifeIcon;
    };
    WifeOptView.prototype.checkDro2 = function () {
        if (this._droWifeIcon) {
            this._droWifeIcon.resume();
            if (this._droWifeIcon2) {
                this._droWifeIcon2.resume();
            }
        }
        else {
            this._wifeIcon.visible = true;
        }
        // this.checkDro();
    };
    WifeOptView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "wifeview_namebg", "wifeview_namebg", "wifeview_bottombg2", "wifeview_bottombg3",
            "wifeview_charmicon", "wifeview_childicon", "wifeview_vexpicon", "wifeview_vigoricon",
            "wifeview_mask", "wife_btnbg", "wife_give", "wife_love", "wife_skill",
            "wifeview_btnbg", "wifeview_skin", "wifeview_skinmask", "wifeview_skingray",
            "wifeview_skinstar", "wifechangesexbtn", "wifechangesexbtn_down", "wife_banishing_icon", "wife_banishing_text",
            "guide_hand", "wifeview_artistryicon", "wifeview_talenticon", "wifehome3", "wifehome1", "wifehomebtn", "wifehomebtn_down", "wifehome1", "wifeinihomebtn", "wifeinihomebtn_down",
            "wife_doublefly_namebg",
        ]);
    };
    WifeOptView.prototype.moveBgUp = function (event) {
        if (!event.data.ret) {
            return;
        }
        var ths = this;
        this._isMoving = true;
        egret.Tween.get(this.container).wait(200)
            .call(function () {
            this._wordsBg.visible = false;
            this._wifeWordsText.visible = false;
            this._wordsCornerBg.visible = false;
            this._leftAniContainer.visible = false;
            this._rightAniContainer.visible = false;
        }, this);
        egret.Tween.get(this._topContanier).to({ y: -600 }, 400)
            .call(this.showSkinAni2, this)
            .wait(2700)
            .to({ y: 10 }, 500)
            .to({ y: 0 }, 100)
            .call(function () {
            ths._wordsBg.visible = true;
            ths._wifeWordsText.visible = true;
            ths._wordsCornerBg.visible = true;
            ths._leftAniContainer.visible = true;
            ths._rightAniContainer.visible = true;
            ths._isMoving = false;
        }, this)
            .call(this.showStar, this);
    };
    WifeOptView.prototype.moveUiUp = function (event) {
        if (!event.data.ret) {
            return;
        }
        var ths = this;
        this._isMoving = true;
        egret.Tween.get(this.container).wait(200)
            .call(function () {
            this._wordsBg.visible = false;
            this._wifeWordsText.visible = false;
            this._wordsCornerBg.visible = false;
            this._leftAniContainer.visible = false;
            this._rightAniContainer.visible = false;
        }, this);
        egret.Tween.get(this._topContanier).to({ y: -600 }, 400)
            .call(this.showSkinAni, this)
            .wait(2700)
            .to({ y: 10 }, 500)
            .to({ y: 0 }, 100)
            .call(function () {
            ths._wordsBg.visible = true;
            ths._wifeWordsText.visible = true;
            ths._wordsCornerBg.visible = true;
            ths._leftAniContainer.visible = true;
            ths._rightAniContainer.visible = true;
            ths._isMoving = false;
        }, this)
            .call(this.showStar, this);
    };
    WifeOptView.prototype.showStar = function () {
        var _this = this;
        var _loop_1 = function () {
            var ranIndex = App.MathUtil.getRandom(1, 3);
            var lightSp = BaseBitmap.create("wifeview_skinstar");
            lightSp.rotation = -20;
            lightSp.setScale(3);
            // lightSp.x = -lightSp.width/2*lightSp.scaleX;
            var lightContainer = new BaseDisplayObjectContainer();
            var ranX = App.MathUtil.getRandom(-200, 300);
            var ranY = App.MathUtil.getRandom(-200, 180);
            lightContainer.x = GameConfig.stageWidth / 2 - lightSp.width / 2 * lightSp.scaleX + ranX;
            // lightContainer.y = GameConfig.stageHeigth - 200;
            lightContainer.addChild(lightSp);
            // lightContainer.y = this._wifeIcon.y - lightContainer.height-180 + ranY;
            lightContainer.y = this_1.container.height / 2 + ranY;
            this_1.container.addChildAt(lightContainer, 10);
            // lightSp.alpha = 0;
            // egret.Tween.get(lightSp,{loop:false}).wait(500).call(()=>{
            // 	this._touchSwitch = true;
            // },this);
            lightSp.anchorOffsetX = lightSp.width / 2;
            lightSp.anchorOffsetY = lightSp.height / 2;
            lightContainer.setScale(0.1);
            egret.Tween.get(lightContainer, { loop: false }).wait(100 * index).to({ scaleX: 1, scaleY: 1 }, 500).call(function () {
                _this.removeChildFromContainer(lightContainer);
                lightContainer = null;
                lightSp = null;
            }, this_1);
        };
        var this_1 = this;
        for (var index = 0; index < 10; index++) {
            _loop_1();
        }
        var id = this._wifeId;
        this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
        var wifeInfo = Api.wifeVoApi.getWifeInfoVoById(id);
        var wifecfg = Config.WifeCfg.getWifeCfgById(id);
        var wifePic = wifeInfo.body;
        var wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeInfo.id);
        var sound = '';
        var words = '';
        this._homeBtn.visible = false;
        if (wifeSkinVo && wifeSkinVo.equip != "") {
            var skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
            if ((skinCfg.isBlueSkin && wifecfg.isBule()) || (!skinCfg.isBlueSkin && !wifecfg.isBule())) {
                sound = skinCfg.sound;
                words = skinCfg.words;
                if (skinCfg.canAtHome) {
                    this._dangjiaId = wifeSkinVo.equip;
                    this._homeBtn.visible = true;
                }
            }
            else {
                sound = this._wifeInfoVo.sound;
                words = this._wifeInfoVo.words;
                if (wifecfg.canAtHome) {
                    this._dangjiaId = id;
                    this._homeBtn.visible = true;
                }
            }
            // wifePic = skinCfg.body;
        }
        else {
            sound = this._wifeInfoVo.sound;
            words = this._wifeInfoVo.words;
            if (wifecfg.canAtHome) {
                this._dangjiaId = id;
                this._homeBtn.visible = true;
            }
        }
        var str = Api.otherInfoVoApi.getDangjiaWifeId();
        if ((str != "" && (Number(str) == Number(this._dangjiaId)) || (Number(this._wifeId) == 101 && str == ""))) {
            this._homeBtn.setBtnBitMap("wifeinihomebtn");
        }
        //蓝颜说的话和语音要对应
        var blueSoundIndex = 0;
        if (Api.switchVoApi.checkOpenBlueWife() && Api.gameinfoVoApi.getSexswitch() && Api.wifeVoApi.checkWifeCanChangeSex(id) && this._wifeInfoVo.sexflag) {
            blueSoundIndex = App.MathUtil.getRandom(1, 4);
        }
        if (1) {
            var soundRes = '';
            var wifeSkinVo_3 = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeInfo.id);
            if (wifeSkinVo_3 && wifeSkinVo_3.equip != "") {
                var skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo_3.equip);
                if ((skinCfg.isBlueSkin && wifecfg.isBule()) || (!skinCfg.isBlueSkin && !wifecfg.isBule())) {
                    soundRes = skinCfg.sound;
                }
                else {
                    soundRes = this._wifeInfoVo.sound;
                }
                // wifePic = skinCfg.body;
            }
            else {
                soundRes = this._wifeInfoVo.sound;
                if (blueSoundIndex) {
                    soundRes = this._wifeInfoVo.getBlueSound(blueSoundIndex);
                }
            }
            this.playEffect(soundRes, true);
        }
        this._wifeWordsText.text = words;
    };
    WifeOptView.prototype.showSkinAni = function () {
        var ths = this;
        var bg2Index = this.container.getChildIndex(this._bottomBg);
        var mask1 = BaseBitmap.create("wifeview_skinmask");
        mask1.x = -640;
        mask1.y = -20;
        this.container.addChildAt(mask1, bg2Index);
        egret.Tween.get(mask1).to({ x: 0 }, 800).to({ x: -30 }, 100).wait(200).call(function () {
            // egret.Tween.removeTweens(ths);
            // ths._tweenTo=null;
        }, this)
            .wait(1700).to({ x: 0 }, 100).to({ x: -640 }, 600);
        var mask2 = BaseBitmap.create("wifeview_skinmask");
        mask2.$setSkewY(180);
        mask2.x = GameConfig.stageWidth * 2;
        mask2.y = -20;
        this.container.addChildAt(mask2, bg2Index);
        egret.Tween.get(mask2).to({ x: 640 }, 800).to({ x: 670 }, 100).wait(200).call(this.addMask, this)
            .wait(1700).to({ x: 640 }, 100).to({ x: GameConfig.stageWidth * 2 }, 600);
    };
    WifeOptView.prototype.showSkinAni2 = function () {
        var _this = this;
        var ths = this;
        var bg2Index = this.container.getChildIndex(this._bottomBg);
        var mask1 = BaseBitmap.create("wifeview_skinmask");
        mask1.x = -640;
        mask1.y = -20;
        this.container.addChildAt(mask1, bg2Index);
        egret.Tween.get(mask1).to({ x: 0 }, 800).to({ x: -30 }, 100).wait(200).call(function () {
            // egret.Tween.removeTweens(ths);
            // ths._tweenTo=null;
        }, this)
            .wait(1700).to({ x: 0 }, 100).to({ x: -640 }, 600);
        var mask2 = BaseBitmap.create("wifeview_skinmask");
        mask2.$setSkewY(180);
        mask2.x = GameConfig.stageWidth * 2;
        mask2.y = -20;
        this.container.addChildAt(mask2, bg2Index);
        egret.Tween.get(mask2).to({ x: 640 }, 800).to({ x: 670 }, 100).wait(200).call(function () {
            //背景切换
            var info = Api.wifeVoApi.getWifeInfoVoById(_this._wifeId);
            _this._bg.setload(info.bgRes);
            if (_this._dgbone) {
                _this._dgbone.dispose();
                _this._dgbone = null;
            }
            if (App.CommonUtil.check_dragon() && info.bgRes != "" && info.bgRes != "wifeview_optbg" && info.bgRes != "malewifebg") {
                var arr = info.bgRes.split("_");
                var dgbone = App.DragonBonesUtil.getLoadDragonBones("scene_wifeskin_" + arr[1]);
                dgbone.x = 0;
                dgbone.y = _this._pos["scene_wifeskin_" + arr[1]].y;
                dgbone.setAnchorOffset(0, 0 - _this._pos["scene_wifeskin_" + arr[1]].height);
                _this.container.addChildAt(dgbone, _this.container.getChildIndex(_this._bg) + 1);
                _this._dgbone = dgbone;
            }
        }, this)
            .wait(1700).to({ x: 640 }, 100).to({ x: GameConfig.stageWidth * 2 }, 600);
    };
    WifeOptView.prototype.addMask = function () {
        var mask2 = BaseBitmap.create("wifeview_skingray");
        // mask2.$setSkewY(180);
        mask2.alpha = 0;
        mask2.x = GameConfig.stageWidth / 2 - mask2.width / 2;
        mask2.y = this._wifeIcon.y;
        var bg2Index = this.container.getChildIndex(this._bottomBg);
        this.container.addChildAt(mask2, bg2Index);
        egret.Tween.get(mask2)
            .to({ alpha: 0.4 }, 300)
            .wait(1000).to({ alpha: 0 }, 500)
            .call(function () {
            mask2.dispose();
        }, this);
        this.refreshInfoAfterSkin();
    };
    WifeOptView.prototype.getRuleInfo = function () {
        return "wife_description";
    };
    WifeOptView.prototype.getExtraRuleInfo = function () {
        var params = [];
        if (Api.switchVoApi.checkOpenBanish()) {
            params.push(LanguageManager.getlocal("wife_descriptionPart1"));
        }
        else {
            params.push("");
        }
        if (Api.switchVoApi.checkWifeExpExchangeOpen()) {
            params.push(LanguageManager.getlocal("wife_descriptionPart2"));
        }
        else {
            params.push("");
        }
        if (Api.switchVoApi.checkOpenBlueWife()) {
            params.push(LanguageManager.getlocal("wife_descriptionPart3"));
        }
        else {
            params.push("");
        }
        if (Api.switchVoApi.checkOpenWifeBattle()) {
            params.push(LanguageManager.getlocal("wife_descriptionPart4"));
            params.push(LanguageManager.getlocal("wife_descriptionPart5"));
        }
        else {
            params.push("");
            params.push("");
        }
        if (Api.switchVoApi.checkOpenWifeExSkill()) {
            params.push(LanguageManager.getlocal("wife_descriptionPart6"));
        }
        else {
            params.push("");
        }
        return LanguageManager.getlocal("wife_descriptionSpell2", params);
    };
    WifeOptView.prototype.doGuide = function () {
        this.hide();
    };
    WifeOptView.prototype.touchTap = function () {
        this.hide();
        // SoundManager.resumeBg()
        // if(Api.rookieVoApi.isInGuiding){
        // 	// Api.rookieVoApi.checkWaitingGuide();
        // 	Api.rookieVoApi.checkNextStep();
        // }
    };
    WifeOptView.prototype.refreashBone = function () {
        var info = Api.wifeVoApi.getWifeInfoVoById(this._wifeId);
        if (this._dgbone) {
            this._dgbone.dispose();
            this._dgbone = null;
        }
        if (App.CommonUtil.check_dragon() && info.bgRes != "" && info.bgRes != "wifeview_optbg" && info.bgRes != "malewifebg") {
            var arr = info.bgRes.split("_");
            var dgbone = App.DragonBonesUtil.getLoadDragonBones("scene_wifeskin_" + arr[1]);
            dgbone.x = 0;
            dgbone.y = this._pos["scene_wifeskin_" + arr[1]].y;
            dgbone.setAnchorOffset(0, 0 - this._pos["scene_wifeskin_" + arr[1]].height);
            this.container.addChildAt(dgbone, this.container.getChildIndex(this._bg) + 1);
            this._dgbone = dgbone;
        }
    };
    WifeOptView.prototype.setWifeCallback = function (event) {
        if (!event.data.ret) {
            return;
        }
        var info = Api.wifeVoApi.getWifeInfoVoById(this._wifeId);
        this.refreshInfoAfterSkin();
        this._nameTxt.text = info.name;
        // this.checkShowDoubleName();
        var nameBg = this.container.getChildByName("nameBg");
        if (PlatformManager.checkIsTextHorizontal()) {
            nameBg.width = this._nameTxt.width + 40;
            nameBg.x = GameConfig.stageWidth / 2 - nameBg.width / 2;
            nameBg.y = this._bottomBg.y - 100;
            this._nameTxt.x = nameBg.x + nameBg.width / 2 - this._nameTxt.width / 2;
            this._nameTxt.y = nameBg.y + nameBg.height / 2 - this._nameTxt.height / 2;
        }
        else {
            //红颜名字背景
            nameBg.x = 25;
            nameBg.y = 200;
            //红颜名字
            this._nameTxt.width = 27;
            this._nameTxt.x = nameBg.x + nameBg.width / 2 - this._nameTxt.width / 2;
            this._nameTxt.y = nameBg.y + 190 / 2 - this._nameTxt.height / 2;
        }
        this._wifeDescText.text = info.desc;
        this._bg.setload(info.sexflag == 0 ? "wifeview_optbg" : "malewifebg");
        this.freshWords();
    };
    WifeOptView.prototype.freshWords = function () {
        var id = this._wifeId;
        var wifeInfo = Api.wifeVoApi.getWifeInfoVoById(id);
        var wifecfg = Config.WifeCfg.getWifeCfgById(id);
        var wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeInfo.id);
        var sound = '';
        var words = '';
        if (wifeSkinVo && wifeSkinVo.equip != "") {
            var skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
            if ((skinCfg.isBlueSkin && wifecfg.isBule()) || (!skinCfg.isBlueSkin && !wifecfg.isBule())) {
                sound = skinCfg.sound;
                words = skinCfg.words;
                if (skinCfg.canAtHome) {
                    this._dangjiaId = wifeSkinVo.equip;
                    this._homeBtn.visible = true;
                }
            }
            else {
                sound = this._wifeInfoVo.sound;
                words = this._wifeInfoVo.words;
                if (wifecfg.canAtHome) {
                    this._dangjiaId = id;
                    this._homeBtn.visible = true;
                }
            }
            // wifePic = skinCfg.body;
        }
        else {
            sound = this._wifeInfoVo.sound;
            words = this._wifeInfoVo.words;
            if (wifecfg.canAtHome) {
                this._dangjiaId = id;
                this._homeBtn.visible = true;
            }
        }
        //蓝颜说的话和语音要对应
        var blueSoundIndex = 0;
        if (Api.switchVoApi.checkOpenBlueWife() && Api.gameinfoVoApi.getSexswitch() && Api.wifeVoApi.checkWifeCanChangeSex(id) && this._wifeInfoVo.sexflag) {
            blueSoundIndex = App.MathUtil.getRandom(1, 4);
        }
        if (1) {
            var soundRes = '';
            var wifeSkinVo_4 = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeInfo.id);
            if (wifeSkinVo_4 && wifeSkinVo_4.equip != "") {
                var skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo_4.equip);
                if ((skinCfg.isBlueSkin && wifecfg.isBule()) || (!skinCfg.isBlueSkin && !wifecfg.isBule())) {
                    soundRes = skinCfg.sound;
                }
                else {
                    soundRes = this._wifeInfoVo.sound;
                }
                // wifePic = skinCfg.body;
            }
            else {
                soundRes = this._wifeInfoVo.sound;
                if (blueSoundIndex) {
                    soundRes = this._wifeInfoVo.getBlueSound(blueSoundIndex);
                }
            }
            this.playEffect(soundRes, true);
        }
        this._wifeWordsText.text = words;
    };
    WifeOptView.prototype.refreshNpc = function (evt) {
        if (!evt.data.ret) {
            return;
        }
        if (evt.data.data.data) {
            App.CommonUtil.showTip(LanguageManager.getlocal("settingsucced"));
            var str = Api.otherInfoVoApi.getDangjiaWifeId();
            if ((str != "" && (Number(str) == Number(this._dangjiaId)) || (Number(this._wifeId) == 101 && str == ""))) {
                this._homeBtn.setBtnBitMap("wifeinihomebtn");
            }
        }
    };
    WifeOptView.prototype.dispose = function () {
        Api.mainTaskVoApi.hideGuide();
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SERVANTBONE, this.refreashBone, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CHILD_GUIDE, this.doGuide, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_AWARD), this.refreshInfoAfterLove, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_UPGRADESKILL), this.refreshInfoAfterLove, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_WIFE, this.checkRedPoint, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_WIFESKIN, this.checkRedPoint, this);
        App.MessageHelper.removeNetMessage(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_EQUIP), this.moveUiUp, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_WIFE_LOVECOM, this.checkDro2, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFESKIN_SELECTBG), this.moveBgUp, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIIFE_SETSEXSETTING, this.setWifeCallback, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.OTHERINFO_SETDANGJIA, this.refreshNpc, this);
        this._intimateValueText = null;
        //子嗣
        this._childrenValueText = null;
        //魅力值
        this._charmValueText = null;
        //红颜经验
        this._expValueText = null;
        this._wifeInfoVo = null;
        this._giveDotSp = null;
        this._skillDotSp = null;
        this._skinDotSp = null;
        this._loveBtn = null;
        this._giveBtn = null;
        this._skinBtn = null;
        this._skinBtn = null;
        this._topContanier = null;
        this._wordsCornerBg = null;
        this._wordsBg = null;
        this._wifeWordsText = null;
        this._isMoving = false;
        this._droWifeIcon = null;
        this._droWifeIcon2 = null;
        this._decreeGoldCost = null;
        this._banishContainer = null;
        this._banishTime = null;
        this._artValueText = null;
        this._talentValueText = null;
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandLoveKey);
        this._mainTaskHandLoveKey = null;
        if (this._wifebgParticlegroupName) {
            ResourceManager.destroyRes(this._wifebgParticlegroupName);
            this._wifebgParticlegroupName = null;
        }
        this._bgContainer = null;
        this._bg = null;
        if (this._dgbone) {
            this._dgbone = null;
        }
        this._nameTxt = null;
        this._wifeDescText = null;
        this._dangjiaId = '';
        this._homeBtn = null;
        //
        this._wifeInfoVoList = [];
        this._wifeId = null;
        this._wifeIndex = 0;
        this._changesexBtn = null;
        this._isLeftClick = false;
        this._isSwitching = false;
        this._switchDelta = 0;
        this._leftAniContainer = null;
        this._rightAniContainer = null;
        this._nameBg = null;
        this._isDoubleFly = false;
        this._doubleContainer = null;
        _super.prototype.dispose.call(this);
    };
    return WifeOptView;
}(CommonView));
__reflect(WifeOptView.prototype, "WifeOptView");
//# sourceMappingURL=WifeOptView.js.map