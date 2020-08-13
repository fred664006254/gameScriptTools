/**
 * 新手引导剧情视图
 * author shaoliang
 * date 2017/10/16
 * @class RookieView
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
var RookieView = /** @class */ (function (_super) {
    __extends(RookieView, _super);
    function RookieView() {
        var _this = _super.call(this) || this;
        _this._callbackF = null;
        _this._obj = null;
        _this._curIdx = "";
        _this._curConfig = null;
        // private _curBgId:number = 0;
        _this._curBgName = null;
        _this._isCodon = false;
        _this._codonLength = 0;
        _this._iconList = [];
        _this._isPlayMySound = false;
        _this._fogBg = null;
        _this._curEffect = null;
        _this._sexType = 0; //0女 1男
        _this._femalebtn = null;
        _this._malebtn = null;
        _this._shakeOffset = 0;
        return _this;
    }
    RookieView.prototype.getResourceList = function () {
        // test code
        // Api.rookieVoApi.isInGuiding = true;
        this._curIdx = this.param.data.idx;
        this._callbackF = this.param.data.f;
        this._obj = this.param.data.o;
        var guidePic = [];
        this._curConfig = RookieCfg.getRookieCfg(this._curIdx);
        var startId = Number(this._curIdx);
        var tempTab = {};
        var tempIdx = this._curIdx;
        do {
            var tempCfg = RookieCfg.getRookieCfg(tempIdx);
            if (tempCfg.personPic && tempCfg.personPic != 1 && tempCfg.personPic != 999) {
                // 加载人物图片
                // if(this._iconList.indexOf(tempCfg.personPic)<0)
                // {
                // 	this._iconList.push(tempCfg.personPic);
                // }
            }
            if (tempCfg.bgId) {
                if (tempCfg.bgId != "5" && tempCfg.bgId != "6") {
                    if (!tempTab["story_bg" + tempCfg.bgId]) {
                        tempTab["story_bg" + tempCfg.bgId] = 1;
                    }
                }
                else if (tempCfg.bgId == "6") {
                    if (Api.otherInfoVoApi.getCurSceneId("homeScene") == "106") {
                        if (!tempTab["story_bg" + tempCfg.bgId]) {
                            tempTab["story_bg" + tempCfg.bgId] = 1;
                        }
                    }
                    else {
                    }
                    if (!tempTab["homescene"]) {
                        tempTab["homescene"] = 1;
                    }
                }
                else {
                    if (Api.otherInfoVoApi.getCurSceneId("cityScene") == "205") {
                        if (!tempTab["story_bg" + tempCfg.bgId]) {
                            tempTab["story_bg" + tempCfg.bgId] = 1;
                        }
                    }
                    else {
                        if (!tempTab["cityscene"]) {
                            tempTab["cityscene"] = 1;
                        }
                    }
                }
            }
            else if (tempCfg.bgName) {
                if (!tempTab[tempCfg.bgName]) {
                    tempTab[tempCfg.bgName] = 1;
                }
            }
            tempIdx = tempCfg.nextId;
        } while (tempIdx);
        guidePic = Object.keys(tempTab);
        if (Api.switchVoApi.checkOpenBlueWife() && Api.gameinfoVoApi.getSexnum() == 2) {
            return guidePic.concat(["skip_btn1",
                "guide_circle",
                "guide_hand",
                "guide_rect",
                "prisonview_1",
                "story_fog",
                "story_bg2",
                "searchstoryview_bottom",
                "guide_manbtn",
                "guide_womanbtn",
                "guide_manname",
                "guide_womanname",
                "story_bg7_male",
                "guidechoosesex",
                "guideNameBg",
            ]);
        }
        return guidePic.concat(["skip_btn1", "skip_btn2",
            "guide_circle",
            "guide_hand",
            "guide_rect",
            "guideGrayBg",
            "guideNameBg",
            "story_fog",
        ]);
    };
    RookieView.prototype.getTitleBgName = function () {
        return null;
    };
    RookieView.prototype.getTitleStr = function () {
        return null;
    };
    RookieView.prototype.getCloseBtnName = function () {
        return null;
    };
    RookieView.prototype.getBgName = function () {
        return null;
    };
    RookieView.prototype.isShowMask = function () {
        return false;
    };
    RookieView.prototype.preInit = function () {
        if (this._iconList.length > 0) {
            ResourceManager.loadItem(this._iconList.shift(), this.preInit, this);
        }
        else {
            _super.prototype.preInit.call(this);
        }
    };
    RookieView.prototype.init = function () {
        _super.prototype.init.call(this);
        Api.rookieVoApi.isGuiding = true;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ROOKIE_NEXT_STEP, this.noticeNextStep, this);
        this._blackBg = BaseBitmap.create("public_9_black");
        this._blackBg.height = GameConfig.stageHeigth;
        this._blackBg.width = GameConfig.stageWidth;
        this.addChild(this._blackBg);
        this._blackBg.visible = false;
        this.container = new BaseDisplayObjectContainer();
        this.addChild(this.container);
        this.width = GameConfig.stageWidth;
        this.height = GameConfig.stageHeigth;
        this._myBg = BaseBitmap.create();
        // this._myBg.height = GameConfig.stageHeigth;
        this._myBg.width = GameConfig.stageWidth;
        this.addChildToContainer(this._myBg);
        this._guideBg = new GuideBackground();
        this._guideBg.init(this.clickPage, this);
        this.addChildToContainer(this._guideBg);
        this._guideTipContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._guideTipContainer);
        this._tipBB = BaseBitmap.create("public_9_wordbg");
        this._tipBB.height = 170;
        this._tipBB.setPosition(GameConfig.stageWidth / 2 - this._tipBB.width / 2, GameConfig.stageHeigth - this._tipBB.height - 0);
        this._guideTipContainer.addChild(this._tipBB);
        this._skipBtnBg = BaseBitmap.create("public_9_wordbg");
        this._skipBtnBg.skewX = 180;
        this._skipBtnBg.height = 66;
        this._skipBtnBg.setPosition(GameConfig.stageWidth / 2 - this._skipBtnBg.width / 2, 66);
        this.addChildToContainer(this._skipBtnBg);
        this._grayBB = BaseBitmap.create("guideGrayBg");
        this._grayBB.setPosition(0, 66);
        // this._grayBB.height = GameConfig.stageHeigth - this._tipBB.height - this._grayBB.y;
        this._grayBB.height = GameConfig.stageHeigth - this._grayBB.y;
        this._grayBB.width = GameConfig.stageWidth;
        this.addChildToContainer(this._grayBB);
        this._continueText = ComponentManager.getTextField(LanguageManager.getlocal("clickContinue"), 20);
        this._continueText.setPosition(this._tipBB.x + this._tipBB.width - this._continueText.width - 50, this._tipBB.y + this._tipBB.height - this._continueText.height - 20);
        this._continueText.textColor = TextFieldConst.COLOR_WARN_GREEN;
        this._guideTipContainer.addChild(this._continueText);
        this.textAnim(this._continueText);
        this._titleBg = BaseBitmap.create("guideNameBg");
        this._titleBg.setPosition(25, this._tipBB.y - 50);
        this._guideTipContainer.addChild(this._titleBg);
        this._titleBg.visible = false;
        this._titleText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        this._titleText.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        this._titleText.setPosition(30, this._tipBB.y - 42);
        this._guideTipContainer.addChild(this._titleText);
        this._descText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._descText.width = GameConfig.stageWidth - 60;
        this._descText.lineSpacing = 8;
        this._descText.setPosition(30, this._tipBB.y + 38);
        this._guideTipContainer.addChild(this._descText);
        // rect
        this._clickRect = BaseBitmap.create("guide_rect");
        this.addChildToContainer(this._clickRect);
        this._circleContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._circleContainer);
        // this._circle1Container = new BaseDisplayObjectContainer();
        // this._circleContainer.addChild(this._circle1Container);
        // this._circle2Container = new BaseDisplayObjectContainer();
        // this._circleContainer.addChild(this._circle2Container);
        this._circle1 = BaseBitmap.create("guide_circle");
        this._circle1.anchorOffsetX = this._circle1.width / 2;
        this._circle1.anchorOffsetY = this._circle1.height / 2;
        this._circle1.alpha = 0.5;
        this._circle1.scaleX = 1.5;
        this._circle1.scaleY = 1.5;
        egret.Tween.get(this._circle1, { loop: true })
            .to({ scaleX: 2, scaleY: 2, alpha: 0 }, 1000);
        this._circle2 = BaseBitmap.create("guide_circle");
        this._circle2.anchorOffsetX = this._circle2.width / 2;
        this._circle2.anchorOffsetY = this._circle2.height / 2;
        this._circle2.alpha = 1;
        this._circle2.scaleX = 0.5;
        this._circle2.scaleY = 0.5;
        // egret.Tween.get(this._circleContainer)
        // 	.wait(500)
        // 	.call(function(){
        // 		egret.Tween.get(this._circle2,{loop:true})
        // 		.to({scaleX: 2,scaleY:2,alpha:1}, 1000)
        // 	},this)
        egret.Tween.get(this._circle2, { loop: true })
            .to({ scaleX: 2, scaleY: 2, alpha: 0 }, 1000);
        this._circleContainer.addChild(this._circle1);
        this._circleContainer.addChild(this._circle2);
        this.addChildToContainer(this._circleContainer);
        this._cliclTextBg = BaseBitmap.create("public_9_bg42");
        this.addChildToContainer(this._cliclTextBg);
        this._clickHand = BaseBitmap.create("guide_hand");
        this.addChildToContainer(this._clickHand);
        egret.Tween.get(this._clickHand, { loop: true })
            .to({ scaleX: 0.9, scaleY: 0.9 }, 500)
            .to({ scaleX: 1, scaleY: 1 }, 500);
        this._cliclText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        // this._cliclText.width = GameConfig.stageWidth - 200;
        this._cliclText.textColor = TextFieldConst.COLOR_BLACK;
        this.addChildToContainer(this._cliclText);
        // 开始游戏
        var btnName;
        // if (Number(this._curIdx)<= Number(RookieCfg.getRookieCfg("storyEndId"))) {
        btnName = "skip_btn1";
        // }
        // else {
        // 	btnName = "skip_btn2";
        // }
        this._skipBtn = ComponentManager.getButton(btnName, null, this.skipAnim, this);
        this._skipBtn.setPosition(PlatformManager.hasSpcialCloseBtn() ? 10 : (GameConfig.stageWidth - this._skipBtn.width - 10), 10);
        this.addChildToContainer(this._skipBtn);
        this._curConfig = RookieCfg.getRookieCfg(this._curIdx);
        //临时 屏蔽 跳过按钮
        if (Number(this._curIdx) <= Number(RookieCfg.getRookieCfg("storyEndId")) || this._curConfig.showskip) {
            this._skipBtn.visible = true;
            this._skipBtnBg.visible = true;
            this._grayBB.visible = true;
        }
        else {
            this._skipBtn.visible = false;
            this._skipBtnBg.visible = false;
            this._grayBB.visible = false;
        }
        this.showPage();
    };
    RookieView.prototype.clickPage = function () {
        if (this._curConfig && this._curConfig.clickToNext) {
            this.doNextStep();
            return;
        }
        if (this._curConfig && (this._curConfig.clickRect || this._curConfig.branch) && !this._curConfig.touchAll) {
            return;
        }
        if (this._curConfig && this._curConfig.branchMale) {
            return;
        }
        if (this._isCodon == true) {
            this._isCodon = false;
            this._descText.text = this._descContent;
        }
        else {
            this.doNextStep();
        }
    };
    RookieView.prototype.doNextStep = function (step) {
        var nextId = null;
        if (step) {
            nextId = step;
        }
        else if (this._curConfig && this._curConfig.nextMaleId && Api.switchVoApi.checkOpenBlueWife() && Api.gameinfoVoApi.getSexnum() == 2) {
            nextId = this._curConfig.nextMaleId;
        }
        else if (this._curConfig && this._curConfig.nextId) {
            nextId = this._curConfig.nextId;
        }
        this.visible = true;
        //新手引导结束
        if (this._curConfig && nextId == null && this._curConfig.waitNext == null) {
            Api.rookieVoApi.isInGuiding = false;
            if (this._curIdx == RookieCfg.getRookieCfg("guideEndId")) {
                if (PlatformManager.getIsWanbaQQLive()) {
                    ViewController.getInstance().openView(ViewConst.COMMON.QQVIDEOGUIDEVIEW);
                }
                if (GameData.idcardSwitch == true && GameData.idcardNormal == 1 && Api.gameinfoVoApi.getRealnameRewards() == null) {
                    ViewController.getInstance().openView(ViewConst.POPUP.REALNAMEREWARDSPOPUPVIEW, { showAcPop: 1 });
                }
                if (Api.sevenDaysSignupLoginVoApi.isEnSp() && Api.sevenDaysSignupLoginVoApi.checkCreateMainIcon()) {
                    ViewController.getInstance().openView(ViewConst.COMMON.SEVENDAYSSIGNUPFIRSHOWVIEW);
                }
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_GUIDE_END);
                PlatformManager.analyticsByHyKey("achieved_newbie_guide");
                RSDKHelper.checkReceiveGooglePlayPoint();
            }
        }
        if (this._curEffect) {
            SoundManager.stopEffect(this._curEffect);
            this._curEffect = null;
        }
        if (this._curConfig && nextId == null) {
            if (this._curConfig.waitNext) {
                Api.rookieVoApi.insertWaitingGuide({ "idx": this._curConfig.waitNext });
            }
            if (this._curConfig.needPush2) {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_GUIDE_END2);
            }
            this.hide();
        }
        else {
            this._curIdx = nextId;
            this._curConfig = RookieCfg.getRookieCfg(this._curIdx);
            this.showPage();
        }
        if (Number(this._curIdx) == Number(RookieCfg.getRookieCfg("storyStartId2")) || this._curConfig.showskip) {
            if (this._skipBtn && !this._skipBtn.visible) {
                this._skipBtn.visible = true;
                this._skipBtnBg.visible = true;
                this._grayBB.visible = true;
            }
        }
        else if (Number(this._curIdx) <= Number(RookieCfg.getRookieCfg("storyEndId"))) {
        }
        else {
            if (this._skipBtn && this._skipBtn.visible) {
                this._skipBtn.visible = false;
                this._skipBtnBg.visible = false;
                this._grayBB.visible = false;
            }
        }
    };
    RookieView.prototype.showPage = function () {
        var _this = this;
        if (this._curConfig.needPush) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT);
        }
        if (this._curConfig.guideId) {
            Api.rookieVoApi.guideId = this._curConfig.guideId;
            PlatformManager.analyticsNewGuide(this._curConfig.guideId);
            if (this._curConfig.guideId == RookieCfg.getRookieCfg("guideSteps")) {
                this.request(NetRequestConst.REQUEST_USER_NEWERGUILD, { step: 9999 });
                PlatformManager.analyticsCompleteNewGuide();
            }
        }
        else {
            //todo 向后台发送数据 this._curConfig.otherId
            this.request(NetRequestConst.REQUEST_USER_STEPGUILD, { step: this._curConfig.otherId });
        }
        // App.LogUtil.show(this._curConfig.guideId);
        Api.rookieVoApi.curStep = this._curIdx;
        App.LogUtil.log("QAZ showPage step ", this._curIdx);
        if (this._curIdx == "zhenqifang_0") {
            if (Api.unlocklist2VoApi.checkShowOpenFunc()) {
                Api.unlocklist2VoApi._isInGuide = true;
            }
        }
        if (this._curConfig.checkNpc) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CHECKNPC_SHOW, { "key": this._curConfig.checkNpc });
        }
        if (this._curIdx == "dinner_1") {
            if (Api.unlocklist2VoApi.checkShowOpenFunc()) {
                Api.unlocklist2VoApi._isNeedWait = false;
            }
        }
        if (this._curIdx == "zhenqifang_1") {
            if (Api.unlocklist2VoApi.checkShowOpenFunc()) {
                Api.unlocklist2VoApi._isInGuide = false;
            }
            if (Api.switchVoApi.checkOpenHouseBtnUp()) {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CHECK_HOUSEUPBTN_GUIDE, { key: Api.rookieVoApi.curStep });
            }
        }
        if (this._curConfig.cityscenescroll != undefined) {
            BaseScene.scrollToPos = this._curConfig.cityscenescroll;
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_GUIDE_CITYSCENE_SCROLL);
        }
        this.doStepHandle();
        if (this._showManTab) {
            this._showManTab.dispose();
            this._showManTab = null;
        }
        if (this._curIdx == "adult_2") {
            if (GameConfig.stageHeigth < 978) {
                this._curConfig.clickRect.y = 698 - (978 - GameConfig.stageHeigth);
            }
        }
        if (this._curConfig.bgAlpha) {
            this._blackBg.alpha = this._curConfig.bgAlpha;
        }
        else {
            this._blackBg.alpha = 1;
        }
        var needShoot = false;
        if (this._curEffect) {
            SoundManager.stopEffect(this._curEffect);
            this._curEffect = null;
        }
        //底部 描述
        if (this._curConfig.descId) {
            var descId = this._curConfig.descId;
            //描述 
            if (Api.switchVoApi.checkIsInBlueWife() && Api.gameinfoVoApi.getSexdefault() == 1 && LanguageManager.checkHasKey("rookieStoryDesc" + descId + "_male")) {
                descId = descId + "_male";
            }
            if (PlatformManager.checkIsTestSp() || Api.switchVoApi.checkOpenRookTalkEffect()) {
                var soundId = descId;
                // if (this._curConfig.descId>919000)
                // {
                // 	soundId = this._curIdx;
                // }
                var effectName = "effect_rookietalk_" + soundId;
                if (ResourceManager.hasRes(effectName)) {
                    if (Api.switchVoApi.checkIsInBlueWife() && Api.gameinfoVoApi.getSexdefault() == 1) {
                        //8 -14不播
                        if (this._curConfig.descId < 8 && this._curConfig.descId > 14) {
                            this._curEffect = effectName;
                            SoundManager.playEffect(effectName);
                        }
                    }
                    else {
                        this._curEffect = effectName;
                        SoundManager.playEffect(effectName);
                    }
                }
            }
            if (this._curConfig.clickContinue) {
                this._continueText.visible = true;
                this._isCodon = true;
                this._codonLength = 0;
                this._descText.text = "";
                this._descContent = LanguageManager.getlocal("rookieStoryDesc" + descId);
                needShoot = true;
            }
            else {
                this._descText.text = LanguageManager.getlocal("rookieStoryDesc" + descId);
                this._continueText.visible = false;
            }
            // 人物形象
            if (this._curConfig.personPic == 1 || this._curConfig.personPic == 999) {
                var playerLv = void 0;
                if (this._curConfig.personPic == 999) {
                    playerLv = 999;
                }
                else {
                    playerLv = Api.playerVoApi.getPlayerLevel();
                    var titleId = Api.playerVoApi.getTitleid(2);
                    //自己说话						
                    if (titleId) {
                        var title = Config.TitleCfg.getTitleCfgById(titleId);
                        if (title && title.isTitle == 1 && title.titleType) {
                            if (title.titleType == 1 || title.titleType == 2 || title.titleType == 7) {
                                playerLv = titleId;
                            }
                        }
                    }
                }
                var myBody = Api.playerVoApi.getPlayerPortrait(playerLv, Api.playerVoApi.getPlayePicId());
                // myBody.setPosition(170, GameConfig.stageHeigth - myBody.height - 10 + 110);
                myBody.x = (GameConfig.stageWidth - myBody.width) / 2;
                myBody.y = GameConfig.stageHeigth - myBody.height - 10 + 160;
                var maskRect = new egret.Rectangle();
                maskRect.setTo(0, 0, myBody.width, 430);
                // myBody.mask = maskRect;
                // myBody.setScale(1.32);
                this._guideTipContainer.addChildAt(myBody, 0);
                this._showManTab = myBody;
            }
            else if (this._curConfig.personPic) {
                var npcBody = new BaseDisplayObjectContainer();
                this._guideTipContainer.addChild(npcBody);
                if (this._curConfig.personBone && !Api.switchVoApi.checkCloseBone() && RES.hasRes(this._curConfig.personBone + "_ske") && App.CommonUtil.check_dragon()) {
                    var servant = App.DragonBonesUtil.getLoadDragonBones(this._curConfig.personBone);
                    if (this._curConfig.personPic.substring(0, 4) == "wife") {
                        servant.scaleX = 0.8;
                        servant.scaleY = 0.8;
                        servant.mask = new egret.Rectangle(-554, -609, 1114, 680);
                        servant.x = 352;
                        servant.y = GameConfig.stageHeigth - 150;
                    }
                    else {
                        servant.mask = new egret.Rectangle(-354, -609, 914, 680);
                        servant.x = 302;
                        servant.y = GameConfig.stageHeigth - 150;
                    }
                    npcBody.addChild(servant);
                }
                else {
                    var rect1 = egret.Rectangle.create();
                    rect1.setTo(0, 0, 405, 467);
                    if (this._curConfig.personPic.substring(0, 4) == "wife") {
                        if (this._curConfig.personPic == "wife_full_101" && Api.gameinfoVoApi.getSexswitch() >= 1 && Api.gameinfoVoApi.getSexdefault() == 1) {
                            this._curConfig.personPic += "_male";
                        }
                        rect1.setTo(0, 0, 355, 467);
                    }
                    else if (this._curConfig.personPic == "acyundinglongkuview_enemynpc") {
                        rect1.setTo(0, 0, 640, 339);
                    }
                    else if (this._curConfig.personPic == "empshopman") {
                        rect1.setTo(0, 0, 282 * 0.9, 866 * 0.9);
                    }
                    var npcMan = BaseLoadBitmap.create(this._curConfig.personPic, rect1);
                    npcMan.setPosition(GameConfig.stageWidth - npcMan.width * npcMan.scaleX - 120, GameConfig.stageHeigth - npcMan.height * npcMan.scaleY - 272 + 50 + 80);
                    if (this._curConfig.personPic == "acyundinglongkuview_enemynpc") {
                        npcMan.x = GameConfig.stageWidth - npcMan.width * npcMan.scaleX;
                    }
                    else if (this._curConfig.personPic == "empshopman") {
                        npcMan.x = GameConfig.stageWidth - npcMan.width * npcMan.scaleX - 200;
                        npcMan.y = GameConfig.stageHeigth - 600;
                    }
                    npcBody.addChild(npcMan);
                }
                this._guideTipContainer.addChildAt(npcBody, 0);
                this._showManTab = npcBody;
            }
            else if (this._curConfig.malePersonPic && Api.switchVoApi.checkIsInBlueWife()) {
                var npcBody = new BaseDisplayObjectContainer();
                this._guideTipContainer.addChild(npcBody);
                var rect1 = egret.Rectangle.create();
                rect1.setTo(0, 0, 355, 467);
                // if(this._curConfig.malePersonPic.substring(0,4) == "wife")
                // {
                var wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById("101");
                if (wifeInfoVo) {
                    this._curConfig.malePersonPic = wifeInfoVo.body;
                }
                // }
                var npcMan = BaseLoadBitmap.create(this._curConfig.malePersonPic, rect1);
                // npcMan.setScale(1.32)
                npcMan.setPosition(GameConfig.stageWidth / 2 - rect1.width / 2 * npcMan.scaleX, GameConfig.stageHeigth - npcMan.height * npcMan.scaleY - 272 + 50 + 60);
                npcBody.addChild(npcMan);
                this._guideTipContainer.addChildAt(npcBody, 0);
                this._showManTab = npcBody;
            }
            //名字
            if (this._curConfig.nameId) {
                // this._descText.y = this._tipBB.y+88;
                if (this._curConfig.nameId == "wifeName_101" && Api.gameinfoVoApi.getSexswitch() >= 1 && Api.gameinfoVoApi.getSexdefault() == 1) {
                    this._curConfig.nameId += "_male";
                }
                this._titleText.text = LanguageManager.getlocal(this._curConfig.nameId);
                this._titleText.x = this._titleBg.x + this._titleBg.width / 2 - this._titleText.width / 2;
                this._titleBg.visible = true;
            }
            else {
                // this._descText.y = this._tipBB.y+45;
                this._titleText.text = "";
                this._titleBg.visible = false;
            }
            this._guideTipContainer.visible = true;
        }
        else {
            this._guideTipContainer.visible = false;
        }
        //背景图
        var changeTime = 0;
        if (this.cfgBgName) {
            this.container.alpha = 1;
            if (this.cfgBgName != this._curBgName) {
                var turnTime = 350;
                egret.Tween.removeTweens(this.container);
                this._descText.visible = false;
                this._titleText.visible = false;
                this._titleBg.visible = false;
                if (this._curBgName == null) {
                    this.container.alpha = 1;
                    this._curBgName = this.cfgBgName;
                    this.changeBgCallBack();
                    changeTime = 0;
                }
                else {
                    if (this._showManTab) {
                        this._showManTab.alpha = 0;
                    }
                    this._curBgName = this.cfgBgName;
                    egret.Tween.get(this.container).to({ alpha: 0 }, turnTime).call(this.changeBgCallBack, this).to({ alpha: 1 }, turnTime);
                    changeTime = turnTime * 2;
                }
            }
        }
        else {
            this._myBg.texture = null;
            this._curBgName = null;
        }
        if (needShoot) {
            egret.Tween.get(this).wait(changeTime).call(this.textShootAnim, this);
        }
        if (this._curConfig.clickRect) {
            this._blackBg.visible = false;
            var tempClickRect = { "x": this._curConfig.clickRect.x, "y": this._curConfig.clickRect.y, "w": this._curConfig.clickRect.w, "h": this._curConfig.clickRect.h };
            var handPos = void 0;
            if (this._curConfig.handPos) {
                // handPos = egret.Point.create(this._curConfig.handPos.x-15,this._curConfig.handPos.y-20);
                if (this._curConfig.handPos.flip) {
                    handPos = egret.Point.create(tempClickRect.x + tempClickRect.w / 2 + 15, tempClickRect.y + tempClickRect.h / 2 - 20);
                }
                else if (this._curConfig.handPos.flipXY) {
                    handPos = egret.Point.create(tempClickRect.x + tempClickRect.w / 2 + 15, tempClickRect.y + tempClickRect.h / 2 + 20);
                }
                else {
                    handPos = egret.Point.create(tempClickRect.x + tempClickRect.w / 2 - 15, tempClickRect.y + tempClickRect.h / 2 - 20);
                }
            }
            if (this._curConfig.clickRect.fromBottom) {
                tempClickRect.y = GameConfig.stageHeigth - this._curConfig.clickRect.fromBottom;
                if (this._curConfig.handPos && this._curConfig.handPos.fromBottom) {
                    handPos.y = tempClickRect.y + tempClickRect.h / 2 - 20;
                    if (this._curConfig.handPos.flipXY) {
                        handPos.y = tempClickRect.y + tempClickRect.h / 2 + 20;
                    }
                }
            }
            if (this._curConfig.clickRect.fromCenter) {
                tempClickRect.y += (GameConfig.stageHeigth - 960) * this._curConfig.clickRect.fromCenter;
                if (this._curConfig.handPos && this._curConfig.handPos.fromCenter) {
                    handPos.y += (GameConfig.stageHeigth - 960) * this._curConfig.handPos.fromCenter;
                }
            }
            if (this._curConfig.needLocalPos && Api.rookieVoApi.waitingPosY) {
                tempClickRect.y = Api.rookieVoApi.waitingPosY;
                Api.rookieVoApi.waitingPosY = null;
            }
            if (this._curConfig.isScenePos) {
                var curCfg = Config.SceneCfg.getSceneCfgBySceneName(this._curConfig.isScenePos, Api.otherInfoVoApi.getCurSceneId(this._curConfig.isScenePos));
                tempClickRect.x = curCfg.posCfg[this._curConfig.sceneKey].x - 10;
                var nameY = curCfg.namePosCfg[this._curConfig.sceneKey + "name"] ? curCfg.namePosCfg[this._curConfig.sceneKey + "name"].y : curCfg.posCfg[this._curConfig.sceneKey].y;
                if (this._curConfig.clickRect.fromBottom) {
                    tempClickRect.y = Math.min(curCfg.posCfg[this._curConfig.sceneKey].y, nameY) - (1136 - GameConfig.stageHeigth) - 10;
                }
                else {
                    tempClickRect.y = Math.min(curCfg.posCfg[this._curConfig.sceneKey].y, nameY) - 10;
                }
                if (curCfg.posCfg[this._curConfig.sceneKey].w && (this._curConfig.sceneKey != 'adult' || Api.otherInfoVoApi.getCurSceneId("homeScene") == "105" || Api.otherInfoVoApi.getCurSceneId("homeScene") == "106")) {
                    tempClickRect.w = curCfg.posCfg[this._curConfig.sceneKey].w;
                    tempClickRect.h = curCfg.posCfg[this._curConfig.sceneKey].h;
                }
                //处理场景滑动
                if (this._curConfig.cityscenescroll != undefined && Api.otherInfoVoApi.getCurSceneId("cityScene") == "205") {
                    tempClickRect.x = curCfg.posCfg[this._curConfig.sceneKey].x - 10 - this._curConfig.cityscenescroll;
                    tempClickRect.y += (GameConfig.stageHeigth - 960);
                }
                if (this._curConfig.isScenePos == "homeScene" && Api.otherInfoVoApi.isSceneCanScroll("homeScene")) {
                    tempClickRect.x = curCfg.posCfg[this._curConfig.sceneKey].x - 10 - this._curConfig.scrollx;
                    // tempClickRect.y += (GameConfig.stageHeigth-960);
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_GUIDE_HOMESCENE_SCROLL, this._curConfig.scrollx);
                }
                if (this._curConfig.sceneKey == 'wife') {
                    tempClickRect.x += 20;
                }
            }
            if (this._curConfig.otherId == 'adult_3') {
                tempClickRect.x = Api.switchVoApi.checkopenSadun() ? 405 : 455;
            }
            if (this._curIdx == "search_1" && Api.otherInfoVoApi.getCurSceneId("cityScene") == "205") {
                tempClickRect.y -= 30;
                tempClickRect.h = 120;
            }
            if (this._curConfig.onlyHand) { //只显示手
                this._circle1.visible = false;
                this._circle2.visible = false;
            }
            else {
                var alpha = 0.9;
                if (this._curConfig.guideBgAlpha != null) {
                    alpha = this._curConfig.guideBgAlpha;
                }
                this._guideBg.draw(tempClickRect, alpha);
                this._clickRect.visible = true;
                this._clickRect.width = tempClickRect.w + 10;
                this._clickRect.height = tempClickRect.h + 10;
                this._clickRect.x = tempClickRect.x - 5;
                this._clickRect.y = tempClickRect.y - 5;
                this._clickRect.alpha = this._curConfig.rectAlpha == null ? 1 : this._curConfig.rectAlpha;
                this._circle1.visible = true;
                this._circle2.visible = true;
            }
            this._circleContainer.visible = false;
            if (this._curConfig.handPos) {
                this._clickHand.visible = true;
                this._clickHand.x = handPos.x;
                this._clickHand.y = handPos.y;
                if (this._curConfig.isScenePos) {
                    var curCfg = Config.SceneCfg.getSceneCfgBySceneName(this._curConfig.isScenePos, Api.otherInfoVoApi.getCurSceneId(this._curConfig.isScenePos));
                    // tempClickRect.x = curCfg.posCfg[this._curConfig.sceneKey].x - 10;
                    // tempClickRect.y = curCfg.posCfg[this._curConfig.sceneKey].y - (1136-GameConfig.stageHeigth) - 10;
                    if (curCfg.posCfg[this._curConfig.sceneKey]) {
                        this._clickHand.x = tempClickRect.x + tempClickRect.w / 2 - 10;
                        this._clickHand.y = tempClickRect.y + tempClickRect.h / 2 - 10;
                        handPos.x = this._clickHand.x;
                        handPos.y = this._clickHand.y;
                    }
                }
                this._circleContainer.visible = true;
                this._circleContainer.x = handPos.x + 15;
                this._circleContainer.y = handPos.y + 20;
                if (this._curConfig.handPos.flip) {
                    this._clickHand.skewY = 180;
                    this._circleContainer.x = handPos.x - 15;
                    this._circleContainer.y = handPos.y + 20;
                }
                else if (this._curConfig.handPos.flipXY) {
                    this._clickHand.skewX = 180;
                    this._clickHand.skewY = 180;
                    this._circleContainer.x = handPos.x - 15;
                    this._circleContainer.y = handPos.y - 20;
                }
                else {
                    this._clickHand.skewX = 0;
                    this._clickHand.skewY = 0;
                }
            }
            else {
                this._clickHand.visible = false;
            }
            //说明文字
            if (this._curConfig.tipId) {
                this._cliclText.visible = true;
                this._cliclText.text = LanguageManager.getlocal("rookieTip" + this._curConfig.tipId);
                this._cliclText.width = 450;
                this._cliclText.lineSpacing = 5;
                this._cliclText.x = this.width / 2 - this._cliclText.width / 2;
                this._cliclText.y = this._curConfig.tipPos.y;
                this._cliclTextBg.visible = true;
                this._cliclTextBg.width = this._cliclText.width + 40;
                this._cliclTextBg.height = this._cliclText.height + 25;
                this._cliclTextBg.x = this._cliclText.x - 20;
                this._cliclTextBg.y = this._cliclText.y - 13;
                if (this._curConfig.tipPos.fromBottom) {
                    this._cliclText.y = GameConfig.stageHeigth - this._curConfig.tipPos.fromBottom;
                    this._cliclTextBg.y = this._cliclText.y - 13;
                }
                if (this._curConfig.tipPos.fromCenter) {
                    this._cliclText.y += (GameConfig.stageHeigth - 960) * this._curConfig.tipPos.fromCenter;
                    this._cliclTextBg.y = this._cliclText.y - 13;
                }
            }
            else {
                this._cliclText.visible = false;
                this._cliclTextBg.visible = false;
            }
            // this._skipBtn.visible = false;
        }
        else {
            if (this._curConfig.hideBlackBg != true) {
                this._blackBg.visible = true;
            }
            this._guideBg.drawScreen();
            this._clickRect.visible = false;
            this._clickHand.visible = false;
            this._cliclText.visible = false;
            this._cliclTextBg.visible = false;
            this._circleContainer.visible = false;
            // this._skipBtn.visible = true;
        }
        if (this._curConfig.isCallback) {
            var tempObj = this._obj;
            var tempFunc = this._callbackF;
            if (tempObj && tempFunc) {
                tempFunc.apply(tempObj);
            }
            this._obj = null;
            this._callbackF = null;
        }
        if (this._branchContainer) {
            this._branchContainer.dispose();
            this._branchContainer = null;
        }
        if (this._curConfig.branchMale && Api.switchVoApi.checkOpenBlueWife() && Api.gameinfoVoApi.getSexnum() == 2) {
            this._myBg.setRes("story_bg2");
            this._branchContainer = new BaseDisplayObjectContainer();
            this._branchContainer.width = GameConfig.stageWidth;
            this._branchContainer.height = GameConfig.stageHeigth;
            this.addChild(this._branchContainer);
            var wordbg = BaseBitmap.create("searchstoryview_bottom");
            wordbg.setPosition(GameConfig.stageWidth / 2 - wordbg.width / 2, GameConfig.stageHeigth - wordbg.height - 0);
            //男形象
            var npc1 = BaseLoadBitmap.create("wife_full_101_male");
            var npc2 = BaseLoadBitmap.create("wife_full_101");
            npc1.width = npc2.width = 640;
            npc1.height = npc2.height = 840;
            this._branchContainer.addChild(npc1);
            this._branchContainer.addChild(npc2);
            npc1.setScale(0.7);
            npc2.setScale(0.7);
            this._sexType = 1;
            var malebtn = ComponentManager.getButton("guidechoosesexbtn1", "chooseSexTxt1", function () {
                _this._sexType = 1;
                _this.freshView();
                _this.clickSelectedManHandler();
            }, this, null, 3);
            malebtn.setTextSize(28);
            malebtn.anchorOffsetX = malebtn.width / 2;
            malebtn.anchorOffsetY = malebtn.height / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, malebtn, wordbg, [50, -malebtn.height + 20]);
            this._branchContainer.addChild(malebtn);
            this._malebtn = malebtn;
            egret.Tween.get(malebtn, { loop: true }).to({ scaleX: 1.1, scaleY: 1.1 }, 800).to({ scaleX: 1, scaleY: 1 }, 800);
            var femalebtn = ComponentManager.getButton("guidechoosesexbtn2", "chooseSexTxt2", function () {
                _this._sexType = 0;
                _this.freshView();
                _this.clickSelectedWomanHandler();
            }, this, null, 3);
            femalebtn.setTextSize(28);
            femalebtn.anchorOffsetX = femalebtn.width / 2;
            femalebtn.anchorOffsetY = femalebtn.height / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, femalebtn, wordbg, [50, -femalebtn.height + 20]);
            this._branchContainer.addChild(femalebtn);
            this._femalebtn = femalebtn;
            egret.Tween.get(femalebtn, { loop: true }).to({ scaleX: 1.1, scaleY: 1.1 }, 800).to({ scaleX: 1, scaleY: 1 }, 800);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, npc1, wordbg, [0, wordbg.height - 20]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, npc2, wordbg, [0, wordbg.height - 20]);
            npc1.x = -50;
            npc2.x = 240;
            var name1 = BaseBitmap.create("guidechoosesexname1");
            var txt1 = ComponentManager.getTextField(LanguageManager.getlocal("chooseSexDescTxt1"), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, name1, npc1, [0, -name1.height]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, txt1, name1, [0, -txt1.height]);
            this._branchContainer.addChild(name1);
            this._branchContainer.addChild(txt1);
            var name2 = BaseBitmap.create("guidechoosesexname2");
            var txt2 = ComponentManager.getTextField(LanguageManager.getlocal("chooseSexDescTxt2"), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, name2, npc2, [0, -name2.height]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, txt2, name2, [0, -txt2.height]);
            this._branchContainer.addChild(name2);
            this._branchContainer.addChild(txt2);
            this._branchContainer.addChild(wordbg);
            var descText = ComponentManager.getTextField(LanguageManager.getlocal("rookieStoryBranchMale1"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
            descText.width = GameConfig.stageWidth - 60;
            descText.lineSpacing = 5;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descText, wordbg, [0, 60]);
            this._branchContainer.addChild(descText);
            var descTextTip = ComponentManager.getTextField(LanguageManager.getlocal("rookieStoryBranchMale1_tip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED);
            // descTextTip.width = GameConfig.stageWidth - 60;
            descTextTip.lineSpacing = 5;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descTextTip, descText, [0, descText.textHeight + 20]);
            this._branchContainer.addChild(descTextTip);
        }
        else if (this._curConfig.branch) {
            this._branchContainer = new BaseDisplayObjectContainer();
            this.addChild(this._branchContainer);
            var allKey = Object.keys(this._curConfig.branch);
            var totalHeight = allKey.length * 110;
            for (var i = 0; i < allKey.length; i++) {
                var textstr = LanguageManager.getlocal("rookieStoryBranch" + allKey[i]);
                var branchBtn = BaseBitmap.create("loginres_9_serverbg");
                branchBtn.width = 440;
                this._branchContainer.addChild(branchBtn);
                // branchBtn.addTouchTap(this.clickSelectedHandler,this,[this._curConfig.branch[allKey[i]]]);
                branchBtn.addTouch(this.clickSelectedHandler, this, [branchBtn, this._curConfig.branch[allKey[i]]]);
                var timeDesc = ComponentManager.getTextField(LanguageManager.getlocal("rookieStoryBranch" + allKey[i]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
                if (PlatformManager.checkIsEnLang()) {
                    if (branchBtn.width < timeDesc.width + 60) {
                        branchBtn.width = timeDesc.width + 60;
                    }
                    branchBtn.setPosition(GameConfig.stageWidth / 2 - branchBtn.width / 2, GameConfig.stageHeigth / 2 - totalHeight / 2 + i * 110 + branchBtn.height / 2);
                    timeDesc.setPosition(branchBtn.x + branchBtn.width / 2 - timeDesc.width / 2, branchBtn.y + branchBtn.height / 2 - timeDesc.height / 2);
                }
                else {
                    branchBtn.setPosition(GameConfig.stageWidth / 2 - branchBtn.width / 2, GameConfig.stageHeigth / 2 - totalHeight / 2 + i * 110 + branchBtn.height / 2);
                    timeDesc.setPosition(branchBtn.x + branchBtn.width / 2 - timeDesc.width / 2 + 15, branchBtn.y + branchBtn.height / 2 - timeDesc.height / 2);
                }
                this._branchContainer.addChild(timeDesc);
            }
        }
        if (this._curConfig.touchAll) {
            this._clickRect.addTouchTap(this.clickPage, this);
        }
        else {
            this._clickRect.removeTouchTap();
            this._clickRect.touchEnabled = false;
        }
        //跳过按钮
        // if (this._curConfig.bgId) {
        // 	this._skipBtn.visible = true;
        // }
        // else {
        // 	this._skipBtn.visible = false;
        // }
    };
    RookieView.prototype.clickSelectedHandler = function (event, branchBtn, step) {
        switch (event.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                branchBtn.texture = ResourceManager.getRes("loginres_9_serverbg_down");
                break;
            case egret.TouchEvent.TOUCH_CANCEL:
                branchBtn.texture = ResourceManager.getRes("loginres_9_serverbg");
                break;
            case egret.TouchEvent.TOUCH_END:
                branchBtn.texture = ResourceManager.getRes("loginres_9_serverbg");
                this.doNextStep(step);
                break;
        }
    };
    RookieView.prototype.clickSelectedManHandler = function () {
        Api.gameinfoVoApi.setSexswitch(1);
        NetManager.request(NetRequestConst.REQUEST_USER_REVERSIONSETTING, { stype: 1, sflag: 1 });
        this.request(NetRequestConst.REQUEST_USER_REVERSIONSETTING, { stype: 2, sflag: 1 });
        Api.gameinfoVoApi.setSexdefault();
        var wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(101);
        wifeInfoVo.sexflag = 1;
        this.doNextStep();
    };
    RookieView.prototype.clickSelectedWomanHandler = function () {
        // NetManager.request(NetRequestConst.REQUEST_USER_REVERSIONSETTING,{stype:1,sflag:0});
        // this.request(NetRequestConst.REQUEST_USER_REVERSIONSETTING,{stype:2,sflag:0});
        // Api.gameinfoVoApi.setSexswitch(0);		
        this.doNextStep();
    };
    RookieView.prototype.freshView = function () {
        var view = this;
        view._malebtn.setBtnBitMap(view._sexType == 1 ? "guidechoosesexbtn1" : "guidechoosesexbtn1_down");
        view._femalebtn.setBtnBitMap(view._sexType == 0 ? "guidechoosesexbtn2" : "guidechoosesexbtn2_down");
    };
    RookieView.prototype.changeBgCallBack = function () {
        this._descText.visible = true;
        this._titleText.visible = true;
        if (this._titleText.text == "") {
            this._titleBg.visible = false;
        }
        else {
            this._titleBg.visible = true;
        }
        if (this._fogBg) {
            this._fogBg.dispose();
            this._fogBg = null;
        }
        if (this._showManTab) {
            this._showManTab.alpha = 1;
        }
        var bgName = this._curBgName;
        if (this._curBgName == "story_bg5" && Api.otherInfoVoApi.getCurSceneId("cityScene") != "205") {
            bgName = "cityscene";
        }
        else if (this._curBgName == "story_bg6" && Api.otherInfoVoApi.getCurSceneId("homeScene") != "106") {
            bgName = "homescene";
        }
        else if (Api.switchVoApi.checkIsInBlueWife() && Api.gameinfoVoApi.getSexdefault() == 1 && this._curBgName == "story_bg7") {
            bgName = "story_bg7_male";
        }
        egret.Tween.removeTweens(this._myBg);
        this._myBg.texture = ResourceManager.getRes(bgName);
        //背景位置
        // if (this._curBgId == 6) {
        this._myBg.y = GameConfig.stageHeigth - this._myBg.height;
        this._myBg.x = 0;
        this._myBg.anchorOffsetX = 0;
        this._myBg.setScale(1);
        // }
        // else {
        // 	this._myBg.y = 0;
        // }
        if (this._curIdx == RookieCfg.getRookieCfg("fogId")) {
            this.showFogAnim();
        }
        else if (this._curIdx == RookieCfg.getRookieCfg("shakeId")) {
            this.showShakeAnim();
        }
    };
    RookieView.prototype.showShakeAnim = function () {
        this._myBg.setScale((this._myBg.width + 40) / this._myBg.width);
        this._myBg.x = -20;
        this._myBg.y = GameConfig.stageHeigth - this._myBg.height - 30;
        this._shakeOffset = 16;
        this.shakeScreen();
    };
    RookieView.prototype.shakeScreen = function () {
        if (this._shakeOffset > 0) {
            var setX = -this._shakeOffset / 2 - App.MathUtil.getRandom(0, this._shakeOffset);
            var setY = GameConfig.stageHeigth - this._myBg.height - this._shakeOffset / 2 - App.MathUtil.getRandom(0, this._shakeOffset);
            setY *= 1.5;
            this._myBg.setPosition(setX, setY);
            egret.Tween.get(this._myBg).wait(50).call(this.shakeScreen, this);
            this._shakeOffset -= 1;
        }
    };
    RookieView.prototype.showFogAnim = function () {
        this._myBg.y = 0;
        this._myBg.x = -this._myBg.width / 4;
        this._myBg.anchorOffsetX = 0.5;
        this._myBg.setScale(1.5);
        this._fogBg = BaseBitmap.create("story_fog");
        this.addChildToContainer(this._fogBg);
        if (this._skipBtn) {
            this.addChildToContainer(this._skipBtn);
        }
        egret.Tween.get(this._myBg).to({ scaleX: 1, scaleY: 1, x: 0 }, 7000);
    };
    RookieView.prototype.textShootAnim = function () {
        if (this._isCodon == false) {
            return;
        }
        this._codonLength += 1;
        if (this._codonLength > this._descContent.length) {
            this._isCodon = false;
            this._descText.text = this._descContent;
        }
        else {
            this._descText.text = this._descContent.substr(0, this._codonLength);
            egret.Tween.get(this._descText).wait(100).call(this.textShootAnim, this);
        }
    };
    RookieView.prototype.textAnim = function (t) {
        egret.Tween.removeTweens(t);
        var oldx = t.x;
        var oldy = t.y;
        var newx = t.x - t.width * 0.1;
        var newy = t.y - t.height * 0.1;
        egret.Tween.get(t).to({ scaleX: 1.2, scaleY: 1.2, x: newx, y: newy }, 600).to({ scaleX: 1, scaleY: 1, x: oldx, y: oldy }, 600).to({ scaleX: 1.2, scaleY: 1.2, x: newx, y: newy }, 600).to({ scaleX: 1, scaleY: 1, x: oldx, y: oldy }, 600).call(this.textAnim, this, [t]);
    };
    RookieView.prototype.skipAnim = function () {
        if (Api.rookieVoApi.isInGuiding && Number(this._curIdx) <= Number(RookieCfg.getRookieCfg("storyEndId2"))) {
            var tempObj = this._obj;
            var tempFunc = this._callbackF;
            if (tempObj && tempFunc) {
                tempFunc.apply(tempObj);
            }
            this._curConfig = RookieCfg.getRookieCfg(RookieCfg.getRookieCfg("storyEndId2"));
            this.doNextStep();
        }
        else if (Api.rookieVoApi.isInGuiding && Number(this._curIdx) <= Number(RookieCfg.getRookieCfg("storyEndId"))) {
            var tempObj = this._obj;
            var tempFunc = this._callbackF;
            if (tempObj && tempFunc) {
                tempFunc.apply(tempObj);
            }
            this._curConfig = RookieCfg.getRookieCfg(RookieCfg.getRookieCfg("storyEndId"));
            this.doNextStep();
        }
        else {
            Api.rookieVoApi.isInGuiding = false;
            this.hide();
        }
        if (this._fogBg) {
            this._fogBg.dispose();
            this._fogBg = null;
        }
    };
    /**
     * 收到通知 下一步
     */
    RookieView.prototype.noticeNextStep = function () {
        this.doNextStep();
    };
    RookieView.prototype.initView = function () {
    };
    RookieView.prototype.getParent = function () {
        return LayerManager.maskLayer;
    };
    RookieView.prototype.hide = function (isDispose) {
        var tempObj = this._obj;
        var tempFunc = this._callbackF;
        Api.rookieVoApi.isGuiding = false;
        if (!isDispose) {
            if (tempObj && tempFunc) {
                tempFunc.apply(tempObj);
            }
        }
        _super.prototype.hide.call(this);
    };
    RookieView.prototype.doStepHandle = function () {
        if (this._curIdx == "1") {
            SoundManager.playBg(SoundConst.MUSIC_PALACE);
        }
        else if (this._curIdx == RookieCfg.getRookieCfg("storyMusicStart")) {
            SoundManager.playBg(SoundConst.MUSIC_ROOKIE_STORY);
        }
        else if (this._curIdx == RookieCfg.getRookieCfg("storyMusicEnd")) {
            SoundManager.playBg(SoundConst.MUSIC_HOME);
        }
        if (this._curIdx == "14_1" || this._curIdx == "child_1") {
            MainUI.getInstance().setSingleLine();
        }
        else if (this._curIdx == "atkrace_7") {
            var myAtkInfo = Api.atkraceVoApi.getMyFightInfo();
            if (myAtkInfo.handle == 1 || myAtkInfo.atype != 1) {
                this._curIdx = "atkrace_8";
                this._curConfig = RookieCfg.getRookieCfg(this._curIdx);
            }
        }
        if (this._curIdx == "adult_1") {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_MAINUI_PACKUP);
        }
    };
    Object.defineProperty(RookieView.prototype, "cfgBgName", {
        get: function () {
            var bgname = null;
            if (this._curConfig) {
                if (this._curConfig.bgId) {
                    bgname = "story_bg" + this._curConfig.bgId;
                }
                else {
                    bgname = this._curConfig.bgName;
                }
            }
            return bgname;
        },
        enumerable: true,
        configurable: true
    });
    RookieView.prototype.dispose = function () {
        if (this._curConfig.showCloseHand) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_GUIDE_SHOWHAND);
        }
        Api.rookieVoApi.curGuideKey = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_ROOKIE_NEXT_STEP, this.noticeNextStep, this);
        if (this._continueText) {
            egret.Tween.removeTweens(this._continueText);
            this._continueText = null;
        }
        this._callbackF = null;
        this._obj = null;
        this._curIdx = "";
        this._showManTab = null;
        // this._curBgId = 0;
        this._curBgName = null;
        this._tipBB = null;
        this._descContent = null;
        this._isCodon = false;
        this._codonLength = 0;
        if (this._descText) {
            egret.Tween.removeTweens(this._descText);
        }
        this._descText = null;
        this._skipBtn = null;
        this._myBg = null;
        this._circleContainer = null;
        if (this._circle1) {
            egret.Tween.removeTweens(this._circle1);
        }
        this._circle1 = null;
        if (this._circle2) {
            egret.Tween.removeTweens(this._circle2);
        }
        this._circle2 = null;
        this._blackBg = null;
        this._iconList.length = 0;
        this._cliclTextBg = null;
        this._isPlayMySound = false;
        this._branchContainer = null;
        egret.Tween.removeTweens(this.container);
        egret.Tween.removeTweens(this);
        if (this._clickHand) {
            egret.Tween.removeTweens(this._clickHand);
        }
        this.visible = true;
        this._skipBtnBg = null;
        this._titleBg = null;
        this._grayBB = null;
        this._fogBg = null;
        this._shakeOffset = 0;
        if (this._curEffect) {
            SoundManager.stopEffect(this._curEffect);
        }
        this._curEffect = null;
        this._sexType = 0; //0女 1男
        this._femalebtn = null;
        this._malebtn = null;
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_GUIDE_CITYSCENE_SCROLL2);
        Api.viewqueueVoApi.checkWaitingView();
        _super.prototype.dispose.call(this);
    };
    return RookieView;
}(CommonView));
//# sourceMappingURL=RookieView.js.map