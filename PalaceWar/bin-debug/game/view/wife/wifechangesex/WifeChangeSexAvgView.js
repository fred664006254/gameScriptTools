/**
 * 寻访剧情播放
 * author qianjun
 */
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
var WifeChangeSexAvgView = (function (_super) {
    __extends(WifeChangeSexAvgView, _super);
    function WifeChangeSexAvgView() {
        var _this = _super.call(this) || this;
        _this._callback = null;
        _this._target = null;
        _this._storyId = null;
        _this._storyConfig = null;
        _this._curDialogConfig = null;
        _this._isJumpNext = false;
        _this._branchContainer = null;
        _this._curIdx = "";
        _this._curBgId = null;
        _this._isCodon = false;
        _this._codonLength = 0;
        _this._iconList = [];
        _this._isPlayMySound = false;
        _this._fogBg = null;
        _this._shakeOffset = 0;
        return _this;
    }
    WifeChangeSexAvgView.prototype.getResourceList = function () {
        // test code
        // Api.rookieVoApi.isInGuiding = true;
        // this._curIdx = this.param.data.idx;
        this._callback = this.param.data.callback;
        this._target = this.param.data.target;
        this._storyId = "story" + this.param.data.storyId;
        var guidePic = [];
        // this._curConfig = allAvg[1];
        return guidePic.concat([
            "guideNameBg",
            "skip_btn1",
            // "skip_btn2",
            // "guideGrayBg",
            "story_fog",
            "searchstoryview_bottom",
            "searchstoryview_btn_down",
            "searchstoryview_btn",
            "searchstoryview_namebg"
        ]);
    };
    WifeChangeSexAvgView.prototype.getTitleBgName = function () {
        return null;
    };
    WifeChangeSexAvgView.prototype.getTitleStr = function () {
        return null;
    };
    WifeChangeSexAvgView.prototype.getCloseBtnName = function () {
        return null;
    };
    WifeChangeSexAvgView.prototype.getBgName = function () {
        return null;
    };
    WifeChangeSexAvgView.prototype.isShowMask = function () {
        return true;
    };
    WifeChangeSexAvgView.prototype.preInit = function () {
        if (this._iconList.length > 0) {
            ResourceManager.loadItem(this._iconList.shift(), this.preInit, this);
        }
        else {
            _super.prototype.preInit.call(this);
        }
    };
    WifeChangeSexAvgView.prototype.init = function () {
        _super.prototype.init.call(this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ROOKIE_NEXT_STEP, this.noticeNextStep, this);
        console.log("searchstoryview-->", this._storyId);
        this._storyConfig = Config.NewstoryCfg.getStoryItemCfgById(this._storyId);
        console.log("searchstoryview-->", this._storyConfig);
        if (!this._storyConfig) {
            return;
        }
        if (this._curDialogConfig == null) {
            this._curDialogConfig = this._storyConfig.getDialogItemCfgById(this._storyConfig.startId);
        }
        if (!this._curDialogConfig) {
            return;
        }
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
        this._myBg = BaseLoadBitmap.create("acsevenbg");
        this._myBg.height = 1136;
        // this._myBg = BaseBitmap.create('acsevenbg');
        // this._myBg.height = GameConfig.stageHeigth;
        this._myBg.width = GameConfig.stageWidth;
        this.addChildToContainer(this._myBg);
        this._guideTipContainer = new BaseDisplayObjectContainer();
        this._guideTipContainer.addTouchTap(this.clickPage, this);
        this.addChildToContainer(this._guideTipContainer);
        // this._tipBB = BaseBitmap.create("public_9_wordbg");
        // this._tipBB.height = 170;
        this._tipBB = BaseBitmap.create("searchstoryview_bottom");
        this._tipBB.setPosition(GameConfig.stageWidth / 2 - this._tipBB.width / 2, GameConfig.stageHeigth - this._tipBB.height - 0);
        this._guideTipContainer.addChild(this._tipBB);
        // this._skipBtnBg = BaseBitmap.create("public_9_wordbg");
        // this._skipBtnBg.skewX = 180;
        // this._skipBtnBg.height = 66;
        // this._skipBtnBg.setPosition(GameConfig.stageWidth/2 - this._skipBtnBg.width/2, 66);
        // this.addChildToContainer(this._skipBtnBg);
        // this._grayBB = BaseBitmap.create("public_9v_bg01");
        // this._grayBB.alpha = 0.8;
        // this._grayBB = BaseBitmap.create("guideGrayBg");
        // this._grayBB.setPosition(0, 66);
        // // this._grayBB.height = GameConfig.stageHeigth - this._tipBB.height - this._grayBB.y;
        // this._grayBB.height = GameConfig.stageHeigth -  this._grayBB.y;
        // this._grayBB.width = GameConfig.stageWidth;
        // this.addChildToContainer(this._grayBB);
        this._continueText = ComponentManager.getTextField(LanguageManager.getlocal("clickContinue"), 20, 0x13851e); //TextFieldConst.COLOR_BLACK
        this._continueText.setPosition(this._tipBB.x + this._tipBB.width - this._continueText.width - 50, this._tipBB.y + this._tipBB.height - this._continueText.height - 20);
        // this._continueText.textColor = TextFieldConst.COLOR_WARN_GREEN;
        this._guideTipContainer.addChild(this._continueText);
        this.textAnim(this._continueText);
        this._titleBg = BaseBitmap.create("searchstoryview_namebg");
        this._titleBg.setPosition(114 - this._titleBg.width / 2, this._tipBB.y - 38);
        this._guideTipContainer.addChild(this._titleBg);
        this._titleBg.visible = false;
        this._titleText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        // this._titleText.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        // this._titleText.setPosition(30,this._tipBB.y-42);
        this._titleText.x = this._titleBg.x + this._titleBg.width / 2 - this._titleText.width / 2;
        this._titleText.y = this._titleBg.y + this._titleBg.height / 2 - this._titleText.height / 2;
        this._guideTipContainer.addChild(this._titleText);
        this._descText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
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
        // this._curConfig = this.vo.getAvgConfig(this.param.data.buidId, this.param.data.code)[this._curIdx];//RookieCfg.getRookieCfg(this._curIdx);
        this.showPage();
    };
    WifeChangeSexAvgView.prototype.clickPage = function (evt) {
        // if (this._curConfig && (this._curConfig.clickRect || this._curConfig.branch ) && !this._curConfig.touchAll) {
        // 	return;
        // }
        if (this._curDialogConfig.dialogueType == 0) {
            if (this._isCodon == true) {
                this._isCodon = false;
                this._descText.text = this._descContent;
            }
            else {
                this.doNextStep();
            }
        }
        else {
            if (this._isCodon == true) {
                this._isCodon = false;
                this._descText.text = this._descContent;
            }
            else {
                this.createChoose();
            }
        }
    };
    WifeChangeSexAvgView.prototype.doNextStep = function (step) {
        if (this._curDialogConfig && this._curDialogConfig.dialogueNext == -1) {
            this.hide();
        }
        else {
            if (this._curDialogConfig.dialogueNext > 0) {
                // if(this._curDialogConfig == null){
                this._curDialogConfig = this._storyConfig.getDialogItemCfgById(String(this._curDialogConfig.dialogueNext));
                // }
            }
            this.showPage();
        }
        /*
        if (this._skipBtn && this._skipBtn.visible) {
            this._skipBtn.visible = false;
            this._skipBtnBg.visible = false;
            this._grayBB.visible = false;
        }
        */
    };
    WifeChangeSexAvgView.prototype.createChoose = function () {
        if (this._curDialogConfig.dialogueOption) {
            if (!this._branchContainer) {
                this._branchContainer = new BaseDisplayObjectContainer();
                this._branchContainer.visible = false;
                this.addChild(this._branchContainer);
            }
            if (this._branchContainer.visible) {
                return;
            }
            var optionStrList = this._curDialogConfig.dialogueOption.split(",");
            var optionList = [];
            for (var j = 0; j < optionStrList.length; j++) {
                var optionStr = optionStrList[j];
                var optionS = optionStr.split("_");
                optionList.push({ optionId: optionS[0], nextId: optionS[1] });
            }
            // let allKey:string[] = Object.keys(this._curDialogConfig.branch);
            var totalHeight = optionList.length * 55;
            for (var i = 0; i < optionList.length; i++) {
                // let textstr:string = LanguageManager.getlocal("rookieStoryBranch"+allKey[i]);
                //ComponentManager.getButton("searchstoryview_btn",null,this.clickSelectedHandler,this);
                var optionBtn = BaseBitmap.create("searchstoryview_btn");
                //策划让改成这样的 说理解不了
                // let optionDesc:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("searchStoryOption_" + this._curDialogConfig.id + "_" + optionList[i].optionId),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
                var optionDesc = ComponentManager.getTextField(LanguageManager.getlocal("searchStoryDialog_" + optionList[i].nextId), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
                optionBtn.width = optionDesc.width + 30;
                optionBtn.x = GameConfig.stageWidth / 2 - optionBtn.width / 2;
                optionBtn.y = GameConfig.stageHeigth - 200 - 55 - totalHeight + i * 55 + 25 - optionBtn.height / 2;
                // optionBtn.setPosition(GameConfig.stageWidth/2-optionBtn.width/2, GameConfig.stageHeigth/2 - totalHeight/2 + i * 110 +55 - optionBtn.height/2);
                this._branchContainer.addChild(optionBtn);
                // branchBtn.addTouchTap(this.clickSelectedHandler,this,[this._curConfig.branch[allKey[i]]]);
                optionBtn.addTouch(this.clickSelectedHandler, this, [optionBtn, optionList[i].nextId]);
                optionDesc.setPosition(optionBtn.x + optionBtn.width / 2 - optionDesc.width / 2, optionBtn.y + optionBtn.height / 2 - optionDesc.height / 2);
                this._branchContainer.addChild(optionDesc);
            }
            this._branchContainer.visible = true;
        }
    };
    WifeChangeSexAvgView.prototype.showPage = function () {
        //this.doStepHandle();
        //需要跳转到下一个信息界面
        if (this._isJumpNext) {
            this._isJumpNext = false;
            this.doNextStep();
            return;
        }
        if (this._showManTab) {
            this._guideTipContainer.removeChild(this._showManTab);
            this._showManTab = null;
        }
        var needShoot = false;
        // var codStr ="_code" + this.code;
        //底部 描述
        if (this._curDialogConfig.dialogueID) {
            this._isCodon = true;
            //描述 
            // if (this._curDialogConfig.dialogueNext > 0) {
            this._continueText.visible = true;
            this._codonLength = 0;
            this._descText.text = "";
            if (LanguageManager.checkHasKey("searchStoryDialog_" + this._curDialogConfig.dialogueID)) {
                this._descContent = LanguageManager.getlocal("searchStoryDialog_" + this._curDialogConfig.dialogueID);
            }
            else {
                this._descContent = "";
            }
            needShoot = true;
            // } else {
            // 	if(LanguageManager.checkHasKey("searchStoryDialog_" + this._curDialogConfig.dialogueID)){
            // 		this._descText.text = LanguageManager.getlocal("searchStoryDialog_" + this._curDialogConfig.dialogueID);
            // 	} else {
            // 		this._descText.text = "";
            // 	}
            // 	this._continueText.visible = false;
            // }
            // 人物形象
            // this._curDialogConfig.personPosition = 3;
            if (this._curDialogConfig.personPic == "1" || this._curDialogConfig.personPic == "999") {
                var playerLv = void 0;
                if (this._curDialogConfig.personPic == "999") {
                    playerLv = 999;
                }
                else {
                    playerLv = Api.playerVoApi.getPlayerLevel();
                }
                var myBody = Api.playerVoApi.getPlayerPortrait(playerLv, Api.playerVoApi.getPlayePicId());
                myBody.setScale(1.3);
                //根据personPosition 调整位置
                switch (this._curDialogConfig.personPosition) {
                    case 1:
                        myBody.x = 180 - myBody.scaleX * myBody.width / 2;
                        break;
                    case 2:
                        myBody.x = 320 - myBody.scaleX * myBody.width / 2;
                        break;
                    case 3:
                        myBody.x = GameConfig.stageWidth - 180 - myBody.scaleX * myBody.width / 2;
                        break;
                }
                myBody.y = GameConfig.stageHeigth - myBody.height * myBody.scaleY + 200;
                var maskRect = new egret.Rectangle();
                maskRect.setTo(0, 0, myBody.width, 430);
                this._guideTipContainer.addChildAt(myBody, 0);
                this._showManTab = myBody;
            }
            else if (this._curDialogConfig.personPic) {
                var npcBody = new BaseDisplayObjectContainer();
                this._guideTipContainer.addChild(npcBody);
                var width = 640;
                var height = 482;
                var scale = 1;
                var startY = 0;
                if (this._curDialogConfig.personPic.substring(0, 4) == "wife" || this._curDialogConfig.personPic == "story_npc_bluesearch_1") {
                    width = 640;
                    height = 840;
                    scale = 0.8;
                    startY = GameConfig.stageHeigth - 214 + 120 - height * scale;
                }
                else if (this._curDialogConfig.personPic.substring(0, 7) == "servant") {
                    width = 640;
                    height = 482;
                    scale = 1;
                    startY = GameConfig.stageHeigth - 214 - height * scale + 20;
                }
                var npcMan = BaseLoadBitmap.create(this._curDialogConfig.personPic);
                npcMan.width = width;
                npcMan.height = height;
                npcMan.scaleX = scale;
                npcMan.scaleY = scale;
                // npcMan.setScale(1.32)
                // npcMan.setPosition(GameConfig.stageWidth - npcMan.width*npcMan.scaleX  - 120, GameConfig.stageHeigth - npcMan.height*npcMan.scaleY - 272 +50 + 80);
                switch (this._curDialogConfig.personPosition) {
                    case 1:
                        npcMan.x = 180 - npcMan.width * scale / 2;
                        break;
                    case 2:
                        npcMan.x = 320 - npcMan.width * scale / 2;
                        break;
                    case 3:
                        npcMan.x = GameConfig.stageWidth - 180 - npcMan.width * scale / 2;
                        break;
                }
                npcMan.y = startY;
                npcBody.addChild(npcMan);
                this._guideTipContainer.addChildAt(npcBody, 0);
                this._showManTab = npcBody;
            }
            //名字
            if (this._curDialogConfig.personName) {
                // this._descText.y = this._tipBB.y+88;
                this._titleText.text = LanguageManager.getlocal(this._curDialogConfig.personName);
                this._titleBg.width = this._titleText.width + 20;
                this._titleBg.x = 114 - this._titleBg.width / 2;
                this._titleText.x = this._titleBg.x + this._titleBg.width / 2 - this._titleText.width / 2;
                this._titleText.y = this._titleBg.y + this._titleBg.height / 2 - this._titleText.height / 2;
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
        if (this._curDialogConfig.backGroundID) {
            this.container.alpha = 1;
            if (this._curDialogConfig.backGroundID != this._curBgId) {
                var turnTime = 350;
                egret.Tween.removeTweens(this.container);
                this._descText.visible = false;
                this._titleText.visible = false;
                this._titleBg.visible = false;
                if (this._curBgId == null) {
                    this.container.alpha = 1;
                    this._curBgId = this._curDialogConfig.backGroundID;
                    this.changeBgCallBack();
                    changeTime = 0;
                }
                else {
                    if (this._showManTab) {
                        this._showManTab.alpha = 0;
                    }
                    this._curBgId = this._curDialogConfig.backGroundID;
                    egret.Tween.get(this.container).to({ alpha: 0 }, turnTime).call(this.changeBgCallBack, this).to({ alpha: 1 }, turnTime);
                    changeTime = turnTime * 2;
                }
            }
        }
        else {
            this._myBg.texture = null;
            this._curBgId = null;
        }
        if (needShoot) {
            egret.Tween.get(this).wait(changeTime).call(this.textShootAnim, this);
        }
        // if (this._curDialogConfig.isCallback) {
        // 	let tempObj:any = this._target;
        // 	let tempFunc:Function = this._callbackF;
        // 	if (tempObj && tempFunc) {
        // 		tempFunc.apply(tempObj);
        // 	}
        // 	this._obj=null;
        // 	this._callbackF=null;
        // }
        //跳过按钮
        // if (this._curConfig.bgId) {
        // 	this._skipBtn.visible = true;
        // }
        // else {
        // 	this._skipBtn.visible = false;
        // }
    };
    WifeChangeSexAvgView.prototype.clickSelectedHandler = function (event, branchBtn, nextId) {
        // this._curDialogConfig = this._storyConfig.getDialogItemCfgById("dialog_"+nextId);
        // if(this._branchContainer){
        // 	this._branchContainer.visible = false;
        // 	this._branchContainer.removeChildren();
        // }
        // this.showPage();
        switch (event.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                branchBtn.texture = ResourceManager.getRes("searchstoryview_btn_down");
                break;
            case egret.TouchEvent.TOUCH_CANCEL:
                branchBtn.texture = ResourceManager.getRes("searchstoryview_btn");
                break;
            case egret.TouchEvent.TOUCH_END:
                branchBtn.texture = ResourceManager.getRes("searchstoryview_btn");
                this._curDialogConfig = this._storyConfig.getDialogItemCfgById(String(nextId));
                if (this._branchContainer) {
                    this._branchContainer.visible = false;
                    this._branchContainer.removeChildren();
                }
                this._isJumpNext = true;
                this.showPage();
                // this._curDialogConfig = this._storyConfig.getDialogItemCfgById("dialog_"+nextId);
                // this._branchContainer.removeChildren();
                // this._branchContainer = null;
                // this.doNextStep();
                break;
        }
    };
    WifeChangeSexAvgView.prototype.changeBgCallBack = function () {
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
        // let bgName:string = "story_bg" + this._curBgId;
        // if (this._curBgId == 5) {
        // 	bgName = "cityscene"
        // }
        // else if (this._curBgId == 6) {
        // 	bgName = "homescene"
        // }
        // egret.Tween.removeTweens(this._myBg);
        // this._myBg.texture = ResourceManager.getRes(this._curBgId);
        // this._detailBg.setload("signupview_daybg"+this._curIndex);
        this._myBg.setload(this._curBgId);
        this._myBg.width = 640;
        this._myBg.height = 1136;
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
        // if (this._curIdx == RookieCfg.getRookieCfg("fogId"))
        // {
        // 	this.showFogAnim();
        // }
        // else if (this._curIdx == RookieCfg.getRookieCfg("shakeId"))
        // {
        // 	this.showShakeAnim();
        // }
    };
    WifeChangeSexAvgView.prototype.showShakeAnim = function () {
        this._myBg.setScale((this._myBg.width + 40) / this._myBg.width);
        this._myBg.x = -20;
        this._myBg.y = GameConfig.stageHeigth - this._myBg.height - 30;
        this._shakeOffset = 16;
        this.shakeScreen();
    };
    WifeChangeSexAvgView.prototype.shakeScreen = function () {
        if (this._shakeOffset > 0) {
            var setX = -this._shakeOffset / 2 - App.MathUtil.getRandom(0, this._shakeOffset);
            var setY = GameConfig.stageHeigth - this._myBg.height - this._shakeOffset / 2 - App.MathUtil.getRandom(0, this._shakeOffset);
            setY *= 1.5;
            this._myBg.setPosition(setX, setY);
            egret.Tween.get(this._myBg).wait(50).call(this.shakeScreen, this);
            this._shakeOffset -= 1;
        }
    };
    WifeChangeSexAvgView.prototype.showFogAnim = function () {
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
    WifeChangeSexAvgView.prototype.textShootAnim = function () {
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
    WifeChangeSexAvgView.prototype.textAnim = function (t) {
        egret.Tween.removeTweens(t);
        var oldx = t.x;
        var oldy = t.y;
        var newx = t.x - t.width * 0.1;
        var newy = t.y - t.height * 0.1;
        egret.Tween.get(t).to({ scaleX: 1.2, scaleY: 1.2, x: newx, y: newy }, 600).to({ scaleX: 1, scaleY: 1, x: oldx, y: oldy }, 600).to({ scaleX: 1.2, scaleY: 1.2, x: newx, y: newy }, 600).to({ scaleX: 1, scaleY: 1, x: oldx, y: oldy }, 600).call(this.textAnim, this, [t]);
    };
    WifeChangeSexAvgView.prototype.skipAnim = function () {
        this.hide();
        // this._curConfig = RookieCfg.getRookieCfg(RookieCfg.getRookieCfg("storyEndId2"));
        // if (Number(this._curIdx)<= Number(RookieCfg.getRookieCfg("storyEndId2"))) {
        // 	let tempObj:any = this._obj;
        // 	let tempFunc:Function = this._callbackF;
        // 	if (tempObj && tempFunc) {
        // 		tempFunc.apply(tempObj);
        // 	}
        // 	this._curConfig = RookieCfg.getRookieCfg(RookieCfg.getRookieCfg("storyEndId2"));
        // 	this.doNextStep();
        // }
        // else if (Number(this._curIdx)<= Number(RookieCfg.getRookieCfg("storyEndId"))) {
        // 	let tempObj:any = this._obj;
        // 	let tempFunc:Function = this._callbackF;
        // 	if (tempObj && tempFunc) {
        // 		tempFunc.apply(tempObj);
        // 	}
        // 	this._curConfig = RookieCfg.getRookieCfg(RookieCfg.getRookieCfg("storyEndId"));
        // 	this.doNextStep();
        // }
        // else {
        // 	Api.rookieVoApi.isInGuiding = false;
        // 	this.hide();
        // }
        // if (this._fogBg)
        // {	
        // 	this.removeChildFromContainer(this._fogBg);
        // 	this._fogBg = null;
        // }
    };
    /**
     * 收到通知 下一步
     */
    WifeChangeSexAvgView.prototype.noticeNextStep = function () {
        this.doNextStep();
    };
    WifeChangeSexAvgView.prototype.initView = function () {
    };
    WifeChangeSexAvgView.prototype.getParent = function () {
        return LayerManager.maskLayer;
    };
    WifeChangeSexAvgView.prototype.hide = function (isDispose) {
        var tempObj = this._target;
        var tempFunc = this._callback;
        if (!isDispose) {
            if (tempObj && tempFunc) {
                tempFunc.apply(tempObj);
            }
        }
        _super.prototype.hide.call(this);
    };
    WifeChangeSexAvgView.prototype.doStepHandle = function () {
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
    WifeChangeSexAvgView.prototype.dispose = function () {
        // if(this._curConfig.showCloseHand){
        // 	App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_GUIDE_SHOWHAND);	
        // }
        this._guideTipContainer.removeTouch();
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_ROOKIE_NEXT_STEP, this.noticeNextStep, this);
        egret.Tween.removeTweens(this._continueText);
        this._callback = null;
        this._target = null;
        this._storyId = null;
        this._storyConfig = null;
        this._curDialogConfig = null;
        this._branchContainer = null;
        this._curIdx = "";
        this._titleText = null;
        this._titleBg = null;
        this._continueText = null;
        if (this._descText) {
            egret.Tween.removeTweens(this._descText);
        }
        this._descText = null;
        this._showManTab = null;
        this._blackBg = null;
        this._curBgId = null;
        this._myBg = null;
        this._tipBB = null;
        // this._grayBB = null;
        this._descContent = null;
        this._isCodon = false;
        this._codonLength = 0;
        this._skipBtn = null;
        this._skipBtnBg = null;
        this._guideTipContainer = null;
        this._iconList.length = 0;
        this._isPlayMySound = false;
        // this._skipBtn2 = null;
        this._fogBg = null;
        this._shakeOffset = 0;
        egret.Tween.removeTweens(this.container);
        egret.Tween.removeTweens(this);
        this.visible = true;
        this._isJumpNext = false;
        _super.prototype.dispose.call(this);
    };
    return WifeChangeSexAvgView;
}(CommonView));
__reflect(WifeChangeSexAvgView.prototype, "WifeChangeSexAvgView");
//# sourceMappingURL=WifeChangeSexAvgView.js.map