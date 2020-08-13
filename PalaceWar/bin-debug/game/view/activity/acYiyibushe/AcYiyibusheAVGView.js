/**
 * 剧情播放
 * author yangchengguo
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
var AcYiyibusheAVGView = /** @class */ (function (_super) {
    __extends(AcYiyibusheAVGView, _super);
    function AcYiyibusheAVGView() {
        var _this = _super.call(this) || this;
        _this._curIdx = "";
        _this._curConfig = null;
        _this._curBgId = 0;
        _this._isCodon = false;
        _this._codonLength = 0;
        _this._iconList = [];
        _this._isPlayMySound = false;
        _this._fogBg = null;
        _this._visitId = 0;
        _this._talkKey = null;
        _this._key = 0;
        _this._shakeOffset = 0;
        return _this;
    }
    AcYiyibusheAVGView.prototype.getResourceList = function () {
        // test code
        // Api.rookieVoApi.isInGuiding = true;
        var view = this;
        view._curIdx = '1';
        view.AVGDialog = view.param.data.AVGDialog;
        view._visitId = view.param.data.visitId;
        var guidePic = [];
        App.LogUtil.log("avgview****; " + view._visitId + "curId: " + view._curIdx);
        var allAvg = view.AVGDialog[view._visitId][view._curIdx];
        view._curConfig = allAvg;
        view._talkKey = view.param.data.talkKey;
        view._bgName = allAvg["bgName"] ? allAvg["bgName"] : "story_bg6";
        if (view.param.data.bgName) {
            view._bgName = view.param.data.bgName;
        }
        return guidePic.concat([
            "guideNameBg",
            "skip_btn1", "skip_btn2", "guide_circle", "guide_hand", "guide_rect", "guideGrayBg", "story_fog", "story_bg6",
        ]);
    };
    AcYiyibusheAVGView.prototype.getTitleBgName = function () {
        return null;
    };
    AcYiyibusheAVGView.prototype.getTitleStr = function () {
        return null;
    };
    AcYiyibusheAVGView.prototype.getCloseBtnName = function () {
        return null;
    };
    AcYiyibusheAVGView.prototype.getBgName = function () {
        return null;
    };
    AcYiyibusheAVGView.prototype.isShowMask = function () {
        return true;
    };
    AcYiyibusheAVGView.prototype.preInit = function () {
        if (this._iconList.length > 0) {
            ResourceManager.loadItem(this._iconList.shift(), this.preInit, this);
        }
        else {
            _super.prototype.preInit.call(this);
        }
    };
    AcYiyibusheAVGView.prototype.init = function () {
        _super.prototype.init.call(this);
        var view = this;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ROOKIE_NEXT_STEP, this.noticeNextStep, this);
        this._blackBg = BaseBitmap.create("public_9_black");
        this._blackBg.height = GameConfig.stageHeigth;
        this._blackBg.width = GameConfig.stageWidth;
        this.addChild(this._blackBg);
        this._blackBg.touchEnabled = true;
        this._blackBg.visible = false;
        this.container = new BaseDisplayObjectContainer();
        this.addChild(this.container);
        this.width = GameConfig.stageWidth;
        this.height = GameConfig.stageHeigth;
        var titleId = Api.playerVoApi.getTitleid();
        // let bgname = `acsweetgift_bg-1`;
        this._myBg = BaseBitmap.create(this._bgName);
        // this._myBg.height = GameConfig.stageHeigth;
        // this._myBg.height = GameConfig.stageHeigth;
        this.addChildToContainer(this._myBg);
        this._guideTipContainer = new BaseDisplayObjectContainer();
        this._guideTipContainer.addTouchTap(view.clickPage, view);
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
        // 开始游戏
        var btnName;
        btnName = "skip_btn1";
        this._skipBtn = ComponentManager.getButton(btnName, null, this.skipAnim, this);
        this._skipBtn.setPosition(PlatformManager.hasSpcialCloseBtn() ? 10 : (GameConfig.stageWidth - this._skipBtn.width - 10), 10);
        this.addChildToContainer(this._skipBtn);
        this._skipBtn2 = ComponentManager.getButton("skip_btn2", null, this.skipAnim, this);
        this._skipBtn2.setPosition(GameConfig.stageWidth - this._skipBtn.width - 10, 10);
        // this.addChildToContainer(this._skipBtn2);
        this._skipBtn2.visible = false;
        this._curConfig = view.AVGDialog[view._visitId][this._curIdx]; //RookieCfg.getRookieCfg(this._curIdx);
        this.showPage();
    };
    AcYiyibusheAVGView.prototype.clickPage = function (evt) {
        if (this._curConfig && (this._curConfig.clickRect || this._curConfig.branch) && !this._curConfig.touchAll) {
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
    AcYiyibusheAVGView.prototype.doNextStep = function (step) {
        var view = this;
        var nextId = null;
        if (step) {
            nextId = step;
        }
        else if (this._curConfig && this._curConfig.nextId) {
            nextId = this._curConfig.nextId;
        }
        if (this._curConfig && nextId == null) {
            this.hide();
        }
        else {
            var allAvg = view.AVGDialog;
            this._curIdx = nextId;
            this._curConfig = view.AVGDialog[view._visitId][this._curIdx];
            this.showPage();
        }
        if (this._skipBtn && this._skipBtn.visible) {
            this._skipBtn.visible = false;
            this._skipBtnBg.visible = false;
            this._grayBB.visible = false;
        }
    };
    AcYiyibusheAVGView.prototype.showPage = function () {
        //this.doStepHandle();
        if (this._showManTab) {
            this._guideTipContainer.removeChild(this._showManTab);
            this._showManTab.dispose();
            this._showManTab = null;
        }
        var needShoot = false;
        //底部 描述
        if (this._curConfig.descId) {
            //描述 
            if (1) {
                this._continueText.visible = true;
                this._isCodon = true;
                this._codonLength = 0;
                this._descText.text = "";
                var str = "" + this._talkKey + this._visitId + "_" + this._curConfig.descId + "-" + this.param.data.code;
                this._descContent = LanguageManager.getlocal(str);
                needShoot = true;
            }
            else {
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
                // if (this._curConfig.personPic == 999) {
                myBody.x = (GameConfig.stageWidth - myBody.width) / 2;
                myBody.y = GameConfig.stageHeigth - myBody.height - 10 + 160;
                // }
                // else {
                // 	myBody.setPosition(0, GameConfig.stageHeigth - myBody.height - 157);
                // }
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
                        servant.y = GameConfig.stageHeigth - 160;
                    }
                    else {
                        servant.mask = new egret.Rectangle(-354, -609, 914, 680);
                        servant.x = 302;
                        servant.y = GameConfig.stageHeigth - 175;
                    }
                    npcBody.addChild(servant);
                }
                else {
                    var rect1 = egret.Rectangle.create();
                    rect1.setTo(0, 0, 405, 467);
                    if (this._curConfig.personPic.substring(0, 4) == "wife") {
                        rect1.setTo(0, 0, 355, 467);
                    }
                    var npcMan = BaseLoadBitmap.create(this._curConfig.personPic, rect1);
                    npcMan.setPosition(GameConfig.stageWidth - npcMan.width * npcMan.scaleX - 120, GameConfig.stageHeigth - npcMan.height * npcMan.scaleY - 272 + 50 + 80);
                    npcBody.addChild(npcMan);
                }
                this._guideTipContainer.addChildAt(npcBody, 0);
                this._showManTab = npcBody;
            }
            //名字
            if (this._curConfig.nameId) {
                // this._descText.y = this._tipBB.y+88;
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
        if (this._curConfig.bgId) {
            this.container.alpha = 1;
            if (this._curConfig.bgId != this._curBgId) {
                var turnTime = 350;
                egret.Tween.removeTweens(this.container);
                this._descText.visible = false;
                this._titleText.visible = false;
                this._titleBg.visible = false;
                if (this._curBgId == 0) {
                    this.container.alpha = 1;
                    this._curBgId = this._curConfig.bgId;
                    this.changeBgCallBack();
                    changeTime = 0;
                }
                else {
                    if (this._showManTab) {
                        this._showManTab.alpha = 0;
                    }
                    this._curBgId = this._curConfig.bgId;
                    egret.Tween.get(this.container).to({ alpha: 0 }, turnTime).call(this.changeBgCallBack, this).to({ alpha: 1 }, turnTime);
                    changeTime = turnTime * 2;
                }
            }
        }
        else {
            this._myBg.texture = null;
            this._curBgId = 0;
        }
        if (this._curConfig.bgName) {
            if (this._curConfig.bgName != this._bgName) {
                this._bgName = this._curConfig.bgName;
                this._myBg.texture = ResourceManager.getRes(this._bgName);
            }
        }
        if (needShoot) {
            egret.Tween.get(this).wait(changeTime).call(this.textShootAnim, this);
        }
    };
    AcYiyibusheAVGView.prototype.clickSelectedHandler = function (event, branchBtn, step) {
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
    AcYiyibusheAVGView.prototype.changeBgCallBack = function () {
        this._descText.visible = true;
        this._titleText.visible = true;
        if (this._titleText.text == "") {
            this._titleBg.visible = false;
        }
        else {
            this._titleBg.visible = true;
        }
        if (this._fogBg) {
            this.removeChildFromContainer(this._fogBg);
            this._fogBg = null;
        }
        if (this._showManTab) {
            this._showManTab.alpha = 1;
        }
        //背景位置
        // this._myBg.y = GameConfig.stageHeigth - this._myBg.height;
        // this._myBg.x = 0;
        // this._myBg.anchorOffsetX = 0;
        this._myBg.setScale(1);
    };
    AcYiyibusheAVGView.prototype.showShakeAnim = function () {
        this._myBg.setScale((this._myBg.width + 40) / this._myBg.width);
        this._myBg.x = -20;
        this._myBg.y = GameConfig.stageHeigth - this._myBg.height - 30;
        this._shakeOffset = 16;
        this.shakeScreen();
    };
    AcYiyibusheAVGView.prototype.shakeScreen = function () {
        if (this._shakeOffset > 0) {
            var setX = -this._shakeOffset / 2 - App.MathUtil.getRandom(0, this._shakeOffset);
            var setY = GameConfig.stageHeigth - this._myBg.height - this._shakeOffset / 2 - App.MathUtil.getRandom(0, this._shakeOffset);
            setY *= 1.5;
            this._myBg.setPosition(setX, setY);
            egret.Tween.get(this._myBg).wait(50).call(this.shakeScreen, this);
            this._shakeOffset -= 1;
        }
    };
    AcYiyibusheAVGView.prototype.showFogAnim = function () {
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
    AcYiyibusheAVGView.prototype.textShootAnim = function () {
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
    AcYiyibusheAVGView.prototype.textAnim = function (t) {
        egret.Tween.removeTweens(t);
        var oldx = t.x;
        var oldy = t.y;
        var newx = t.x - t.width * 0.1;
        var newy = t.y - t.height * 0.1;
        egret.Tween.get(t).to({ scaleX: 1.2, scaleY: 1.2, x: newx, y: newy }, 600).to({ scaleX: 1, scaleY: 1, x: oldx, y: oldy }, 600).to({ scaleX: 1.2, scaleY: 1.2, x: newx, y: newy }, 600).to({ scaleX: 1, scaleY: 1, x: oldx, y: oldy }, 600).call(this.textAnim, this, [t]);
    };
    AcYiyibusheAVGView.prototype.skipAnim = function () {
        this.hide();
    };
    /**
     * 收到通知 下一步
     */
    AcYiyibusheAVGView.prototype.noticeNextStep = function () {
        this.doNextStep();
    };
    AcYiyibusheAVGView.prototype.initView = function () {
    };
    AcYiyibusheAVGView.prototype.getParent = function () {
        return LayerManager.maskLayer;
    };
    AcYiyibusheAVGView.prototype.hide = function (isDispose) {
        if (this.param.data.callBack) {
            this.param.data.callBack.apply(this.param.data.obj);
        }
        _super.prototype.hide.call(this);
    };
    AcYiyibusheAVGView.prototype.doStepHandle = function () {
        if (this._curIdx == "1") {
            SoundManager.playBg(SoundConst.MUSIC_PALACE);
        }
        else if (this._curIdx == RookieCfg.getRookieCfg("storyMusicStart")) {
            SoundManager.playBg(SoundConst.MUSIC_ROOKIE_STORY);
        }
        else if (this._curIdx == RookieCfg.getRookieCfg("storyMusicEnd")) {
            SoundManager.playBg(SoundConst.MUSIC_HOME);
        }
    };
    AcYiyibusheAVGView.prototype.dispose = function () {
        if (this._curConfig.showCloseHand) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_GUIDE_SHOWHAND);
        }
        this._guideTipContainer.removeTouch();
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_ROOKIE_NEXT_STEP, this.noticeNextStep, this);
        egret.Tween.removeTweens(this._continueText);
        this._continueText = null;
        this._curIdx = "";
        this._showManTab = null;
        this._curBgId = 0;
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
        this._blackBg = null;
        this._iconList.length = 0;
        this._isPlayMySound = false;
        this._skipBtn2 = null;
        egret.Tween.removeTweens(this.container);
        egret.Tween.removeTweens(this);
        this.visible = true;
        this._skipBtnBg = null;
        this._titleBg = null;
        this._grayBB = null;
        this._fogBg = null;
        this._shakeOffset = 0;
        this._talkKey = null;
        this._bgName = null;
        this.AVGDialog = null;
        _super.prototype.dispose.call(this);
    };
    return AcYiyibusheAVGView;
}(CommonView));
//# sourceMappingURL=AcYiyibusheAVGView.js.map