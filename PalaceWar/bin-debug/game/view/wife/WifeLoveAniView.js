/**
 * 宠幸动画界面
 * author dukunayng
 * date 2017/10/10
 * @class WifeLoveAniView
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var WifeLoveAniView = /** @class */ (function (_super) {
    __extends(WifeLoveAniView, _super);
    function WifeLoveAniView() {
        var _this = _super.call(this) || this;
        // id 红颜ID
        _this._wifeId = null;
        //_type 类型 1随机宠幸 2 元宝宠幸
        _this._type = null;
        _this._bg = null;
        _this.talkNum = 0;
        _this._isDoubleFly = false;
        return _this;
    }
    WifeLoveAniView.prototype.getResourceList = function () {
        var rewardPic = _super.prototype.getResourceList.call(this);
        if (this.param.data) {
            this._wifeId = this.param.data.id;
            this._type = this.param.data.type;
        }
        var wifeCfg = Config.WifeCfg.getWifeCfgById(this._wifeId);
        if (wifeCfg.isBule()) {
            return rewardPic.concat(["taoxin", "taoxin_json", "taoxinani",
                "wifeview_lovebg_male",
                "wifeview_lovewordsbg_male",
                "wifeview_namebg",
            ]);
        }
        if (this.param.data.id == 312) {
            rewardPic.push("wifelovevip14bg");
        }
        else if (this.param.data.id == 313) {
            rewardPic.push("wifelovevip15bg");
        }
        else if (this.param.data.id == 311) {
            rewardPic.push("wifelovevip16bg");
        }
        return rewardPic.concat(["taoxin", "taoxin_json", "taoxinani",
            "wifeview_lovebg", "wifeview_lovewordsbg",
            "wifeview_namebg",
        ]);
    };
    WifeLoveAniView.prototype.getTitleBgName = function () {
        return null;
    };
    WifeLoveAniView.prototype.getTitleStr = function () {
        return null;
    };
    WifeLoveAniView.prototype.getBgName = function () {
        var wifeCfg = Config.WifeCfg.getWifeCfgById(this._wifeId);
        if (wifeCfg.isBule()) {
            return "wifeview_lovebg_male";
        }
        return "wifeview_lovebg";
    };
    WifeLoveAniView.prototype.checkBoneName = function (name) {
        if (this._isDoubleFly) {
            return name + "_1";
        }
        return name;
    };
    WifeLoveAniView.prototype.getDoubleFlyBoneByName = function (name) {
        if (this._isDoubleFly) {
            var doubleName = name.substr(0, name.length - 1) + "2";
            return doubleName;
        }
        return name;
    };
    WifeLoveAniView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_WIFELOVEANI_CLICK, this.touchTap, this);
        this.initView2();
    };
    WifeLoveAniView.prototype.initView2 = function () {
        SoundManager.pauseBg();
        SoundManager.playEffect(SoundConst.EFFECT_WIFE_LOVE);
        this._wifeMaskBmp = BaseBitmap.create("public_9_viewmask");
        this._wifeMaskBmp.width = GameConfig.stageWidth;
        this._wifeMaskBmp.height = GameConfig.stageHeigth;
        this._wifeMaskBmp.touchEnabled = true;
        this._wifeMaskBmp.alpha = 0;
        this.addChild(this._wifeMaskBmp);
        // 
        this._wifeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._wifeContainer);
        if (this._type == 1) {
            var id = this._wifeId;
            this.viewBg.visible = false;
            var wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
            var wifeScrollItem1 = new WifeScrollItem1();
            wifeScrollItem1.initItem(id, wifeInfoVo);
            // this.addChild(wifeScrollItem1);
            this._container = new BaseDisplayObjectContainer();
            this.addChild(this._container);
            wifeScrollItem1.setPosition(-wifeScrollItem1.width / 2, -wifeScrollItem1.height / 2);
            this._container.addChild(wifeScrollItem1);
            // this._container.setPosition(GameConfig.stageWidth/2 , GameConfig.stageHeigth/2 );
            // egret.Tween.get( this._wifeMaskBmp ).to( { alpha:0.8 }, 1000 );
            var posX = this.param.data.x;
            var posY = this.param.data.y;
            var targetPoint = this.globalToLocal(posX, posY);
            this._container.setPosition(targetPoint.x + wifeScrollItem1.width / 2, targetPoint.y + wifeScrollItem1.height / 2);
            egret.Tween.get(this._container)
                .to({ scaleX: 0.8, scaleY: 0.8 }, 500)
                .to({ scaleX: 1, scaleY: 1 }, 500)
                // .to({scaleX: 0.5,scaleY: 0.5}, 300)
                // .to({scaleX: 0.5,scaleY: 0.5}, 300)
                .wait(300)
                .call(this.showWifeAni, this);
        }
        else {
            this.showWifeAni();
        }
    };
    WifeLoveAniView.prototype.showWifeAni = function () {
        var _this = this;
        if (this._container) {
            this.removeChild(this._container);
        }
        this.viewBg.visible = true;
        this._isDoubleFly = (this._wifeId == 236);
        var id = this._wifeId;
        var wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
        var sexflag = wifeInfoVo.sexflag;
        if (Api.switchVoApi.checkOpenBlueWife() && sexflag) {
            this.talkNum = App.MathUtil.getRandom(4, 6);
        }
        //妻子图片
        var wifePicStr = wifeInfoVo.body;
        if (Api.wifeSkinVoApi.isHaveSkin(wifeInfoVo.id)) {
            var wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeInfoVo.id);
            if (wifeSkinVo && wifeSkinVo.equip != "") {
                var skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
                wifePicStr = skinCfg.body;
            }
        }
        this._wifePic = BaseLoadBitmap.create(wifePicStr);
        // this._wifePic.scaleX = 1.5;
        // this._wifePic.scaleY = 1.5;
        this._wifePic.setPosition(0, GameConfig.stageHeigth - 760 * this._wifePic.scaleY);
        // this._wifePic.setPosition(GameConfig.stageWidth/2 - 540*this._wifePic.scaleX/2, GameConfig.stageHeigth - 760*this._wifePic.scaleY);
        // this._wifePic.alpha = 0;
        this._wifeContainer.alpha = 0;
        this._wifeContainer.addChild(this._wifePic);
        var showDroWifeIcon = null;
        if (Api.wifeSkinVoApi.isHaveSkin(wifeInfoVo.id)) {
            var wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeInfoVo.id);
            if (wifeSkinVo && wifeSkinVo.equip != "") {
                var skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
                // if(RES.hasRes(skinCfg.bone + "_ske")&&App.DeviceUtil.CheckWebglRenderMode()&&!Api.switchVoApi.checkCloseBone())
                var bonename = this.checkBoneName(skinCfg.bone);
                if (Api.wifeVoApi.isHaveBone(bonename + "_ske")) {
                    var droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(bonename);
                    droWifeIcon.setScale(1.3);
                    droWifeIcon.x = this._wifePic.x + 340;
                    droWifeIcon.y = this._wifePic.y + 848 - 30;
                    this._wifeContainer.addChild(droWifeIcon);
                    this._wifePic.visible = false;
                    showDroWifeIcon = droWifeIcon;
                }
            }
            else {
                var bonename = this.checkBoneName(wifeInfoVo.bone);
                if (Api.wifeVoApi.isHaveBone(bonename + "_ske")) {
                    var droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(bonename);
                    droWifeIcon.setScale(1.3);
                    droWifeIcon.x = this._wifePic.x + 340;
                    droWifeIcon.y = this._wifePic.y + 848 - 30;
                    // this.addChildToContainer(droWifeIcon);
                    this._wifeContainer.addChild(droWifeIcon);
                    this._wifeContainer.visible = true;
                    this._wifePic.visible = false;
                    showDroWifeIcon = droWifeIcon;
                }
            }
        }
        else {
            var bonename = this.checkBoneName(wifeInfoVo.bone);
            if (Api.wifeVoApi.isHaveBone(bonename + "_ske")) {
                var droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(bonename);
                droWifeIcon.setScale(1.3);
                droWifeIcon.x = this._wifePic.x + 340;
                droWifeIcon.y = this._wifePic.y + 848 - 30;
                ;
                // this.addChildToContainer(droWifeIcon);
                this._wifeContainer.addChild(droWifeIcon);
                this._wifePic.visible = false;
                showDroWifeIcon = droWifeIcon;
            }
        }
        if (showDroWifeIcon && this._isDoubleFly) {
            var twoName = this.getDoubleFlyBoneByName(showDroWifeIcon.getBoneName());
            if (Api.wifeVoApi.isHaveBone(twoName + "_ske")) {
                var droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(twoName);
                droWifeIcon.setScale(1.3);
                droWifeIcon.x = this._wifePic.x + 340;
                droWifeIcon.y = this._wifePic.y + 848 - 30;
                ;
                this._wifeContainer.addChild(droWifeIcon);
                this._wifeContainer.removeChild(showDroWifeIcon);
                this._wifeContainer.addChild(showDroWifeIcon);
            }
        }
        // egret.Tween.get( this._wifePic ).to( { alpha:1 }, 1000 ).wait(700).call(this.changePic,this);
        // egret.Tween.get( this._wifePic ).wait(1200).call(this.changePic2,this);
        var t1 = 1000;
        var t2 = 1200;
        var t3 = 700;
        if (Api.rookieVoApi.isEnRookie() && Api.switchVoApi.checkWifeAni() == false && sexflag != 1) {
            t1 = 0;
            t2 = 0;
            t3 = 0;
            this.changePic();
        }
        else {
            egret.Tween.get(this._wifeContainer).to({ alpha: 1 }, t1).wait(t3).call(this.changePic, this);
            egret.Tween.get(this._wifeContainer).wait(t2).call(function () {
                _this.changePic2();
                if (_this.param.data.id == 312) {
                    var vbg = BaseBitmap.create("wifelovevip14bg");
                    vbg.y = GameConfig.stageHeigth - vbg.height;
                    _this.addChildAt(vbg, _this.getChildIndex(_this.viewBg));
                    egret.Tween.get(_this.viewBg).to({ alpha: 0 }, 1300);
                }
                else if (_this.param.data.id == 313) {
                    var vbg = BaseBitmap.create("wifelovevip15bg");
                    _this.addChildAt(vbg, _this.getChildIndex(_this.viewBg));
                    egret.Tween.get(_this.viewBg).to({ alpha: 0 }, 1300);
                    var boneName = "wife_scene_" + _this.param.data.id + "_ske";
                    if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
                        var bgDrog = App.DragonBonesUtil.getLoadDragonBones("wife_scene_" + _this.param.data.id);
                        bgDrog.setScale(1.53);
                        bgDrog.setPosition(0, 0);
                        _this.addChildAt(bgDrog, _this.getChildIndex(_this.viewBg));
                        egret.Tween.get(_this.viewBg).to({ alpha: 0 }, 1300);
                    }
                }
                else {
                    if (Api.wifeSkinVoApi.isHaveSkin(wifeInfoVo.id)) {
                        var wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeInfoVo.id);
                        if (wifeSkinVo && wifeSkinVo.equip != "") {
                            if (wifeSkinVo.equip == "3111") {
                                var vbg = BaseBitmap.create("wifelovevip16bg");
                                vbg.y = GameConfig.stageHeigth - vbg.height;
                                _this.addChildAt(vbg, _this.getChildIndex(_this.viewBg));
                                egret.Tween.get(_this.viewBg).to({ alpha: 0 }, 1300);
                            }
                        }
                    }
                }
            }, this);
        }
        egret.Tween.get(this._wifeMaskBmp).to({ alpha: 0.8 }, 1000);
        if (this.param.data.id == 312) {
            this._wifeMaskBmp.visible = false;
        }
        else {
            //红颜名字背景
            var nameBg = BaseBitmap.create("wifeview_namebg");
            this.addChild(nameBg);
            //红颜名字
            var nameTF = ComponentManager.getTextField(wifeInfoVo.name, TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_WHITE);
            if (PlatformManager.checkIsTextHorizontal()) {
                nameBg.width = nameTF.width + 40;
                nameBg.x = GameConfig.stageWidth / 2 - nameBg.width / 2;
                nameBg.y = GameConfig.stageHeigth - nameBg.height - 10;
                nameTF.x = nameBg.x + nameBg.width / 2 - nameTF.width / 2;
                nameTF.y = nameBg.y + nameBg.height / 2 - nameTF.height / 2;
            }
            else {
                nameBg.x = 25;
                nameBg.y = 200;
                nameTF.width = 27;
                nameTF.x = nameBg.x + nameBg.width / 2 - nameTF.width / 2;
                nameTF.y = nameBg.y + 190 / 2 - nameTF.height / 2;
            }
            this.addChild(nameTF);
            if (PlatformManager.checkIsTextHorizontal()) {
                nameTF.setVisible(false);
                nameBg.setVisible(false);
            }
            else {
                nameTF.setVisible(true);
                nameBg.setVisible(true);
            }
        }
        //红颜说的话背景
        var wordsBg = BaseBitmap.create("wifeview_lovewordsbg" + (sexflag ? "_male" : ''));
        // wordsBg.width = 430;
        // wordsBg.height = 90;
        this.addChild(wordsBg);
        //红颜说的话
        // wifeInfoVo.words
        var wifeWords = wifeInfoVo.words;
        if (this.talkNum) {
            wifeWords = LanguageManager.getlocal("wifeWords_male_" + id + "_" + this.talkNum);
        }
        var wifeWordsText = ComponentManager.getTextField(wifeWords, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        wifeWordsText.setColor(0x6d2939);
        wifeWordsText.width = 320;
        this.addChild(wifeWordsText);
        wordsBg.width = wifeWordsText.width + 100;
        wordsBg.x = 140;
        wordsBg.y = this._wifePic.y - 170;
        wifeWordsText.x = 193;
        wifeWordsText.y = this._wifePic.y - 130;
        // //脱衣前桃心
        // this._taoxinParticle = App.ParticleUtil.getParticle("taoxin");
        // this._taoxinParticle.x = -450;
        // this._taoxinParticle.y = 150;
        // this._taoxinParticle.start();
        // this.addChild(this._taoxinParticle);
    };
    WifeLoveAniView.prototype.changePic2 = function () {
        var id = this._wifeId;
        var wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
        var wifeCfg = Config.WifeCfg.getWifeCfgById(id);
        if (!wifeCfg.isBule()) {
            var upgradeClip = ComponentManager.getCustomMovieClip("taoxinani_", 13, 100);
            upgradeClip.setScale(2);
            upgradeClip.x = 0;
            upgradeClip.y = 320;
            this.addChild(upgradeClip);
            upgradeClip.playWithTime(1);
            upgradeClip.setEndCallBack(function () {
                if (Api.switchVoApi.checkWifeAni()) {
                    if (Api.switchVoApi.checkCloseWifeKiss() || Api.rookieVoApi.isEnRookie()) {
                        return;
                    }
                    ViewController.getInstance().openView(ViewConst.BASE.WIFELOVECUCOLORISVIEW);
                }
            }, this);
        }
        else {
            this._wifeContainer.anchorOffsetX = this._wifeContainer.width / 2;
            this._wifeContainer.anchorOffsetY = this._wifeContainer.height / 2;
            this._wifeContainer.x = this._wifeContainer.anchorOffsetX;
            this._wifeContainer.y = this._wifeContainer.anchorOffsetY;
            egret.Tween.get(this._wifeContainer, { loop: false }).to({ scaleX: 1.4, scaleY: 1.4 }, 1000).wait(500).call(function () {
                if (Api.switchVoApi.checkWifeAni()) {
                    if (Api.switchVoApi.checkCloseWifeKiss() || Api.rookieVoApi.isEnRookie()) {
                        return;
                    }
                    ViewController.getInstance().openView(ViewConst.BASE.WIFELOVECUCOLORISVIEW);
                }
            }, this);
            if (App.CommonUtil.check_dragon()) {
                var starBoneNode = App.DragonBonesUtil.getLoadDragonBones("taoxin_male");
                starBoneNode.x = 320; // GameConfig.stageWidth/2;
                starBoneNode.y = (1136) / 2;
                this.addChildAt(starBoneNode, 5);
                starBoneNode.alpha = 0;
                egret.Tween.get(starBoneNode, { loop: false }).to({ alpha: 1 }, 500);
            }
        }
    };
    WifeLoveAniView.prototype.changePic = function () {
        var _this = this;
        var id = this._wifeId;
        if (this._wifePic) {
            if (this.param.data.rewards) {
                var rewards = GameData.formatRewardItem(this.param.data.rewards);
                if (rewards && rewards.length > 0) {
                    App.CommonUtil.playRewardFlyAction(rewards);
                }
            }
            if (!Api.switchVoApi.checkWifeAni() && !Api.wifeVoApi.getWifeIsBlue(id)) {
                var wifeInfoVo_1 = Api.wifeVoApi.getWifeInfoVoById(id);
                var t1 = 2000;
                var t2 = 750;
                if (Api.rookieVoApi.isEnRookie() && Api.switchVoApi.checkWifeAni() == false) {
                    t1 = 0;
                    t2 = 200;
                }
                // egret.Tween.get( this._wifePic ).to( { alpha:0 }, 2000 );
                egret.Tween.get(this._wifeContainer).to({ alpha: 0 }, t1).wait(t2).call(function () {
                    if (Api.switchVoApi.checkCloseWifeKiss() || Api.rookieVoApi.isEnRookie()) {
                        return;
                    }
                    ViewController.getInstance().openView(ViewConst.BASE.WIFELOVECUCOLORISVIEW);
                }, this);
                // .call(this.changePic,this);
                var wifeShowNum = this.getWifeShowNumById(id);
                App.LogUtil.log("changePic: wifeShownum: " + wifeShowNum);
                //妻子脱衣图片
                var wifePicStr = wifeInfoVo_1.body2;
                if (ResourceManager.hasRes(wifePicStr + "_" + wifeShowNum)) {
                    this.setWifeShowNum(id, wifeShowNum);
                    wifePicStr = wifePicStr + "_" + wifeShowNum;
                }
                if (!ResourceManager.hasRes(wifePicStr)) {
                    wifePicStr = wifeInfoVo_1.body;
                }
                var wifePic = BaseLoadBitmap.create(wifePicStr);
                // wifePic.scaleX = 1.5;
                // wifePic.scaleY = 1.5;
                wifePic.setPosition(0, GameConfig.stageHeigth - 760 * wifePic.scaleY);
                wifePic.alpha = 0;
                this.addChild(wifePic);
                egret.Tween.get(wifePic).to({ alpha: 1 }, t1);
                var wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeInfoVo_1.id);
                if (!(wifeSkinVo && wifeSkinVo.equip != "")) {
                    var boneStr = wifeInfoVo_1.bone2;
                    if (Api.wifeVoApi.isHaveBone(wifeInfoVo_1.bone2 + "_" + wifeShowNum + "_ske")) {
                        boneStr = wifeInfoVo_1.bone2 + "_" + wifeShowNum;
                    }
                    if (Api.wifeVoApi.isHaveBone(boneStr + "_ske")) {
                        var droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(boneStr);
                        droWifeIcon.setScale(1.3);
                        if (this.param.data.id == 312) {
                            droWifeIcon.setScale(0.9);
                            this.addChildAt(droWifeIcon, 5);
                        }
                        else {
                            this.addChild(droWifeIcon);
                        }
                        droWifeIcon.x = this._wifePic.x + 340;
                        droWifeIcon.y = this._wifePic.y + 848 - 30;
                        // this._wifeContainer.addChild(droWifeIcon);
                        wifePic.visible = false;
                        droWifeIcon.alpha = 0;
                        egret.Tween.get(droWifeIcon).to({ alpha: 1 }, t1);
                    }
                }
                else {
                    var wifeSkinVo_1 = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeInfoVo_1.id);
                    if (wifeSkinVo_1 && wifeSkinVo_1.equip != "") {
                        var skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo_1.equip);
                        var boneStr = skinCfg.bone2;
                        if (Api.wifeVoApi.isHaveBone(skinCfg.bone2 + "_" + wifeShowNum + "_ske")) {
                            boneStr = skinCfg.bone2 + "_" + wifeShowNum;
                        }
                        if (Api.wifeVoApi.isHaveBone(boneStr + "_ske")) {
                            var droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(boneStr);
                            droWifeIcon.setScale(1.3);
                            if (this.param.data.id == 312) {
                                droWifeIcon.setScale(0.9);
                            }
                            droWifeIcon.x = this._wifePic.x + 340;
                            droWifeIcon.y = this._wifePic.y + 848 - 30;
                            // this._wifeContainer.addChild(droWifeIcon);
                            if (wifeSkinVo_1.equip == "3103") {
                                this.addChildAt(droWifeIcon, 5);
                            }
                            else {
                                this.addChild(droWifeIcon);
                            }
                            droWifeIcon.alpha = 0;
                            egret.Tween.get(droWifeIcon).to({ alpha: 1 }, 2000);
                            wifePic.visible = false;
                        }
                        else {
                            var bodyStr = skinCfg.body2;
                            if (RES.hasRes(skinCfg.body2 + "_" + wifeShowNum)) {
                                bodyStr = skinCfg.body2 + "_" + wifeShowNum;
                            }
                            if (!ResourceManager.hasRes(bodyStr)) {
                                bodyStr = skinCfg.body;
                            }
                            if (RES.hasRes(bodyStr)) {
                                wifePic.setload(bodyStr);
                            }
                        }
                    }
                }
            }
            // .call(this.changePic,this);
            // this.removeChild(this._taoxinParticle);
            //脱衣后桃心
            var wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
            var wifeCfg = Config.WifeCfg.getWifeCfgById(id);
            if (!wifeCfg.isBule()) {
                var taoxinFullParticle = App.ParticleUtil.getParticle("taoxin");
                taoxinFullParticle.x = -450;
                taoxinFullParticle.y = GameConfig.stageHeigth - 860;
                taoxinFullParticle.start();
                // taoxinFullParticle.scaleX = 2;
                // taoxinFullParticle.scaleY = 2;
                this.addChild(taoxinFullParticle);
            }
            WifeView.isMoveing = false;
            var timeNum = 0;
            if (Api.rookieVoApi.isInGuiding) {
                timeNum = 2000;
            }
            egret.Tween.get(this._wifeContainer).wait(timeNum).call(function () {
                _this.addTouchTap(_this.touchTap, _this, null);
            });
        }
    };
    WifeLoveAniView.prototype.touchTap = function () {
        this.hide();
        SoundManager.resumeBg();
        if (this.param.data.childData) {
            // ViewController.getInstance().openView(ViewConst.BASE.WIFEGETCHILDVIEW,this.param.data.childData);
            ViewController.getInstance().openView(ViewConst.BASE.SPECIALCHILDGETVIEW, { id: this.param.data.childData, type: "Child" });
        }
        //手动调用红颜限时礼包强弹
        // Api.limitedGiftVoApi.manualOpenLimitedGiftWin(Api.limitedGiftVoApi.typeMap.ENERGY_EMPTY);
        Api.limitedGiftVoApi.manualOpenLimitedGiftWin(Api.limitedGiftVoApi.typeMap2.ENERGY);
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WIFE_LOVECOM);
        if (Api.rookieVoApi.isInGuiding) {
            Api.rookieVoApi.checkWaitingGuide();
            // Api.rookieVoApi.checkNextStep();
        }
    };
    /**记录红颜脱衣 针对有两套脱衣的情况 */
    WifeLoveAniView.prototype.setWifeShowNum = function (id, num) {
        var data = Api.otherInfoVoApi.getWifeUndress();
        var isHave = false;
        for (var i = 0; i < data.length; i++) {
            if (data[i].id == String(id)) {
                data[i].value = num;
                isHave = true;
                break;
            }
        }
        if (!isHave) {
            var info = { id: "" + id, value: num };
            data.push(info);
        }
    };
    WifeLoveAniView.prototype.getWifeShowNumById = function (id) {
        var data = Api.otherInfoVoApi.getWifeUndress();
        var num = 0;
        for (var i = 0; i < data.length; i++) {
            if (data[i].id == String(id)) {
                num = data[i].value;
                break;
            }
        }
        if (num == 1) {
            return 2;
        }
        return 1;
    };
    WifeLoveAniView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_WIFELOVEANI_CLICK, this.touchTap, this);
        this._wifeId = null;
        egret.Tween.removeTweens(this._wifePic);
        this._container = null;
        this._wifeContainer = null;
        this._wifeId = null;
        this._wifePic = null;
        this._type = null;
        this._taoxinParticle = null;
        this._wifeMaskBmp = null;
        this.talkNum = 0;
        this._isDoubleFly = false;
        _super.prototype.dispose.call(this);
    };
    return WifeLoveAniView;
}(BaseView));
//# sourceMappingURL=WifeLoveAniView.js.map