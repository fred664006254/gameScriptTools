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
var PrisonView = /** @class */ (function (_super) {
    __extends(PrisonView, _super);
    function PrisonView() {
        var _this = _super.call(this) || this;
        _this.prisonDesBg = null;
        _this.prisonDesBgcorner = null;
        _this.punishprisoners = null;
        _this._prisonerTxt = null;
        _this._PrisonInfoVoList = [];
        _this._progressBar = null;
        _this._nameTxt = null;
        _this._renownTxt = null;
        _this._dailyoutputTxt = null;
        _this._prisonDesc = null;
        _this.prisonDesTxt = null;
        _this.prisonId = 0;
        _this._scrollContainer = null;
        _this.dailypreNum = 0;
        _this.getMaxpreNum = 0;
        _this.getMypreNum = 0;
        _this.getPrisonInfoArr = [];
        _this._bubbleContainer = null;
        _this.dialogueContainer = null;
        _this.isOpenOnekey = false;
        _this.prisonerImage = null;
        _this.currPrisonNumber = 0; //当前可以惩罚的犯人数
        _this.listContainerArr = [];
        _this.hold_dinner_check = null;
        _this.touchIndex = 0;
        _this.currIcon = null;
        _this.currIconArr = [];
        _this.hold_dinner_box = null;
        _this._punishmentputTxt = null;
        _this.prisonerHeadImage = null;
        _this.retBoo = false;
        _this.nameBg = null;
        // private tokenClip:CustomMovieClip =null;
        _this._PrisonPopView = null;
        _this.curr_maskBmp = null;
        _this._dialogueBg = null;
        _this._dialogueBg2 = null;
        _this.rewardsData = null;
        _this._newPrisonBoo = Api.switchVoApi.checkOpenNewPrison();
        _this._hexieType = "";
        _this._actTimeArr = [];
        _this._mainTaskHandKey = null;
        _this._timeout1 = 0;
        _this._timeout2 = 0;
        _this._timeout3 = 0;
        _this._timeout4 = 0;
        _this.death = false;
        return _this;
    }
    PrisonView.prototype.showGuideAgain = function () {
        return "prison_2";
    };
    PrisonView.prototype.initGuideAgain = function () {
        if (Api.switchVoApi.checkOpenGuideAgain() && this.showGuideAgain()) {
            this._guideBtn = ComponentManager.getButton("guide_btn", "", this.clickGuideAgain, this);
            this._guideBtn.x = 12 + (this._ruleBtn ? 70 : 0);
            this._guideBtn.y = 30;
            this.addChildAt(this._guideBtn, this.getChildIndex(this._ruleBtn));
        }
    };
    Object.defineProperty(PrisonView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    PrisonView.prototype.getContainerY = function () {
        return 14;
    };
    PrisonView.prototype.getBigFrame = function () {
        return null;
    };
    PrisonView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "prisonview_bg",
            "prisonview_progress",
            "progress3_bg",
            "prisonview_font",
            "prisonview_redx",
            "prisonview_itembg",
            "prisonview_small_bg",
            "searchbinfowifebg",
            "prisonview_namebg",
            "prison_head1",
            "prison_head2",
            "prison_body",
            "prison_bottom",
            "punish_ani1", "punish_ani2", "punish_ani3", "punish_ani4", "punish_light",
            "prisonview_bg_2",
            "prison_head1_2",
            "prison_head2_2",
            "forpeople_top",
            "prisonview_font_2",
        ]);
    };
    PrisonView.prototype.getRuleInfo = function () {
        return _super.prototype.getRuleInfo.call(this) + this._hexieType;
    };
    PrisonView.prototype.getRuleInfoParam = function () {
        var zoneStr = 24;
        zoneStr = App.DateUtil.formatSvrHourByLocalTimeZone(24).hour;
        return [zoneStr + ""];
    };
    PrisonView.prototype.getBgName = function () {
        if (this._newPrisonBoo == false) {
            return "prisonview_bg";
        }
        else {
            return "prisonview_bg_2";
        }
    };
    PrisonView.prototype.getTitleStr = function () {
        if (this._newPrisonBoo) {
            return "prisonViewTitle_laoyiType";
        }
        else {
            return "prisonViewTitle";
        }
    };
    PrisonView.prototype.initView = function () {
        Api.rookieVoApi.checkNextStep();
        Api.mainTaskVoApi.checkShowGuide();
        this.refresh();
        this._bubbleContainer = new BaseDisplayObjectContainer();
        this.addChild(this._bubbleContainer);
        this.dialogueContainer = new BaseDisplayObjectContainer();
        this.addChild(this.dialogueContainer);
        if (this._newPrisonBoo) {
            var headbg = BaseBitmap.create("forpeople_top");
            headbg.setPosition(0, -30);
            headbg.height = 108;
            this.addChildToContainer(headbg);
        }
        this._prisonerTxt = ComponentManager.getTextField("0", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._prisonerTxt.text = LanguageManager.getlocal("prisonerTxtDesc" + this._hexieType, [this.currPrisonNumber + "", this.getPrisonInfoArr.length + ""]);
        this._prisonerTxt.setPosition(20, 0);
        this.addChildToContainer(this._prisonerTxt);
        this.showList();
        this.refreshHead();
        if (this.prisonId != 10) {
            var progressNum = 410;
            var progressBar = ComponentManager.getProgressBar("prisonview_progress", "progress3_bg", progressNum);
            progressBar.setPosition(110, GameConfig.stageHeigth - 275);
            this.addChildToContainer(progressBar);
            this._progressBar = progressBar;
            if (this.prisonId != 0) {
                this.showProgress();
            }
        }
        var nameBg = BaseBitmap.create("public_infobg2");
        if (this._newPrisonBoo) {
            nameBg.setPosition(240, GameConfig.stageHeigth - 300);
        }
        else {
            nameBg.setPosition(240, 700);
        }
        nameBg.rotation = -90;
        this.addChildToContainer(nameBg);
        this.nameBg = nameBg;
        this._nameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        var prisoner = LanguageManager.getlocal("prisonPrisoner" + this._hexieType);
        this._nameTxt.text = prisoner + LanguageManager.getlocal(Api.prisonVoApi.getPrisonName());
        if (PlatformManager.checkIsTextHorizontal()) {
            nameBg.rotation = 0;
            if (this._newPrisonBoo) {
                nameBg.y -= 50;
            }
            else {
                nameBg.y -= 75;
            }
            nameBg.width = this._nameTxt.width + 70;
            nameBg.x = this.viewBg.width / 2 - nameBg.width / 2;
            this._nameTxt.setPosition(nameBg.x + nameBg.width / 2 - this._nameTxt.width / 2, nameBg.y + nameBg.height / 2 - this._nameTxt.height / 2);
        }
        else {
            this._nameTxt.setPosition(nameBg.x + nameBg.width / 2 - this._nameTxt.width / 2 + 40, nameBg.y - 50);
        }
        this.addChildToContainer(this._nameTxt);
        //底部背景
        var bottomStr = "prison_bottom";
        var prison_bottom = BaseBitmap.create(bottomStr);
        prison_bottom.y = GameConfig.stageHeigth - 220;
        this.addChildToContainer(prison_bottom);
        //固定描述
        this._prisonDesc = ComponentManager.getTextField("0", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._prisonDesc.text = LanguageManager.getlocal("prisonDesc" + this._hexieType);
        this._prisonDesc.setPosition(50, GameConfig.stageHeigth - 130);
        this.addChildToContainer(this._prisonDesc);
        //名望背景
        var public_9_bg5 = BaseBitmap.create("public_9_bg5");
        public_9_bg5.width = 540;
        public_9_bg5.x = this._prisonDesc.x;
        public_9_bg5.y = GameConfig.stageHeigth - 200;
        this.addChildToContainer(public_9_bg5);
        //当前名望
        this._renownTxt = ComponentManager.getTextField("0", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        this._renownTxt.text = LanguageManager.getlocal("renownTxtDesc", [this.getMypreNum + "", this.getMaxpreNum + ""]);
        this._renownTxt.setPosition(80, GameConfig.stageHeigth - 190);
        this.addChildToContainer(this._renownTxt);
        //每日产出声望
        this._dailyoutputTxt = ComponentManager.getTextField("0", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        this._dailyoutputTxt.text = LanguageManager.getlocal("dailyoutputDesc", [this.dailypreNum + ""]);
        this._dailyoutputTxt.setPosition(this._renownTxt.x + 300, GameConfig.stageHeigth - 190);
        if (PlatformManager.checkIsThSp()) {
            this._dailyoutputTxt.x = public_9_bg5.x + public_9_bg5.width - this._dailyoutputTxt.width - 5;
        }
        this.addChildToContainer(this._dailyoutputTxt);
        if (this.getPrisonInfoArr.length >= 4) {
            this.showOnekeypenalty();
        }
        this.showTxt();
        this.showDialogue();
        this.showDead();
    };
    PrisonView.prototype.refreshHead = function () {
        if (this._newPrisonBoo) {
            this.prisonerImage = BaseBitmap.create("prison_head1_2");
            this.prisonerImage.setPosition(90, this._scrollContainer.y + 202);
        }
        else {
            this.prisonerImage = BaseBitmap.create("prison_body");
            this.prisonerImage.setPosition(200, this._scrollContainer.y + 50);
        }
        this.prisonerImage.touchEnabled = true;
        this.addChildToContainer(this.prisonerImage);
        this.prisonerImage.addTouchTap(this.touchPunishHandler, this, null);
        if (this._newPrisonBoo) {
            this.prisonerImage.alpha = 0;
            this.prisonerHeadImage = BaseBitmap.create("prison_head1_2");
            this.prisonerHeadImage.setPosition(80, this._scrollContainer.y + 202);
            this.prisonerHeadImage.touchEnabled = false;
            this.addChildToContainer(this.prisonerHeadImage);
        }
        else {
            this.prisonerImage.alpha = 1;
            //囚犯头像
            this.prisonerHeadImage = BaseBitmap.create("prison_head1");
            // 255  232
            this.prisonerHeadImage.setPosition(this.prisonerImage.x + 55, this.prisonerImage.y + 152);
            this.addChildToContainer(this.prisonerHeadImage);
        }
    };
    PrisonView.prototype.showDead = function () {
        //死亡状态
        if (Api.prisonVoApi.getcurrPrisonNumber() == 0) {
            this.nameBg.visible = false;
            this.prisonerHeadImage.visible = false;
            this.prisonerImage.visible = false;
            this._nameTxt.visible = false;
            this._progressBar.visible = false;
            this.prisonDesTxt.visible = true;
            var overTxt = ComponentManager.getTextField("0", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            overTxt.text = LanguageManager.getlocal("prisondes");
            overTxt.width = this.punishprisoners.width;
            overTxt.x = 245;
            overTxt.y = 235;
            this.prisonDesBg.height = overTxt.textHeight + 30;
            if (this.prisonDesBg.width < 200 || this.prisonDesBg.height < 76) {
                this.prisonDesBg.width = 230;
                this.prisonDesBg.height = 76;
            }
            this.prisonDesBgcorner.y = this.prisonDesBg.y + this.prisonDesBg.height - 3;
            this._bubbleContainer.addChild(overTxt);
            this.punishprisoners.visible = false;
            this._bubbleContainer.visible = true;
        }
    };
    //	求饶气泡
    PrisonView.prototype.showDialogue = function () {
        var _dialogueBgStr = "public_9_bg42";
        //求饶文字底图
        this._dialogueBg = BaseBitmap.create(_dialogueBgStr);
        this.dialogueContainer.addChild(this._dialogueBg);
        this._dialogueBg.width = 220;
        this._dialogueBg.height = 83;
        this._dialogueBg.x = 50;
        this._dialogueBg.y = 300;
        this._dialogueBg2 = BaseBitmap.create("public_9_bg42_tail");
        this.dialogueContainer.addChild(this._dialogueBg2);
        this._dialogueBg2.scaleX = -1;
        this._dialogueBg2.x = this._dialogueBg.x + this._dialogueBg.width;
        this._dialogueBg2.y = this._dialogueBg.y + this._dialogueBg.height - 5;
        // 求饶文字
        this.prisonDesTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        this.prisonDesTxt.text = LanguageManager.getlocal("PrisonDesTxt" + App.MathUtil.getRandom(1, 5) + this._hexieType);
        this.prisonDesTxt.width = this._dialogueBg.width - 15;
        this.prisonDesTxt.setPosition(this._dialogueBg.x + 10, this._dialogueBg.y + 15);
        this.dialogueContainer.addChild(this.prisonDesTxt);
        this.dialogueContainer.visible = false;
    };
    PrisonView.prototype.showOnekeypenalty = function () {
        var hold_dinner_box = BaseLoadBitmap.create("hold_dinner_box");
        hold_dinner_box.x = 530;
        hold_dinner_box.y = GameConfig.stageHeigth - 255;
        this.addChildToContainer(hold_dinner_box);
        hold_dinner_box.addTouchTap(this.holdHandler, this);
        this.hold_dinner_check = BaseLoadBitmap.create("hold_dinner_check");
        this.hold_dinner_check.x = hold_dinner_box.x;
        this.hold_dinner_check.y = hold_dinner_box.y;
        this.addChildToContainer(this.hold_dinner_check);
        this.hold_dinner_check.visible = false;
        //一键惩罚文字
        this._punishmentputTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._punishmentputTxt.text = LanguageManager.getlocal("prisonPunishment");
        this._punishmentputTxt.setPosition(440, hold_dinner_box.y + 8);
        this.addChildToContainer(this._punishmentputTxt);
        if (PlatformManager.checkIsThSp()) {
            this._punishmentputTxt.x = 430;
        }
    };
    PrisonView.prototype.holdHandler = function (evt) {
        this.touchIndex += 1;
        if (this.touchIndex % 2 == 0) {
            this.hold_dinner_check.visible = false;
            this.isOpenOnekey = false;
        }
        else {
            this.hold_dinner_check.visible = true;
            this.isOpenOnekey = true;
        }
    };
    //气泡
    PrisonView.prototype.showTxt = function () {
        var _this = this;
        var str = "public_9_bg25";
        this.prisonDesBg = BaseBitmap.create(str);
        this.prisonDesBg.y = 220;
        this.addChildToContainer(this.prisonDesBg);
        this._bubbleContainer.addChild(this.prisonDesBg);
        this.prisonDesBg.width = 200;
        this.prisonDesBg.height = 76;
        this.prisonDesBg.x = 230;
        this.prisonDesBgcorner = BaseBitmap.create("public_9_bg25_tail");
        this.prisonDesBgcorner.x = this.prisonDesBg.x;
        this.prisonDesBgcorner.y = this.prisonDesBg.y + this.prisonDesBg.height - 3;
        this.addChildToContainer(this.prisonDesBgcorner);
        this._bubbleContainer.addChild(this.prisonDesBgcorner);
        if (this._newPrisonBoo) {
            this.prisonDesBgcorner.scaleX = -1;
            this.prisonDesBgcorner.x = this.prisonDesBg.x + this.prisonDesBg.width / 2 + this.prisonDesBgcorner.width / 2;
        }
        //美术字体，点击犯人
        if (this._newPrisonBoo) {
            this.punishprisoners = BaseBitmap.create("prisonview_font_2");
        }
        else {
            this.punishprisoners = BaseBitmap.create("prisonview_font");
        }
        this.punishprisoners.x = this.prisonDesBg.x + 18;
        this.punishprisoners.y = this.prisonDesBg.y + this.prisonDesBg.height / 4;
        this.addChildToContainer(this.punishprisoners);
        this._bubbleContainer.addChild(this.punishprisoners);
        var currY = this._scrollContainer.y + 50 - 130;
        if (this._newPrisonBoo) {
            currY = this._scrollContainer.y + 50 - 100;
        }
        this._bubbleContainer.y = currY;
        //上下浮动
        var moveCall = function () {
            egret.Tween.get(_this._bubbleContainer).to({ y: currY + 5 }, 1000).to({ y: currY - 5 }, 1000).call(moveCall, _this);
        };
        moveCall();
        var num = this.getChildIndex(this._bubbleContainer);
        if (this.curr_maskBmp) {
            this.setChildIndex(this.curr_maskBmp, num + 1);
        }
    };
    PrisonView.prototype.clearListContainerArr = function () {
        for (var i = this.listContainerArr.length; i >= 0; i--) {
            if (this.listContainerArr[i] && this.listContainerArr[i].parent) {
                this.listContainerArr[i].parent.removeChild(this.listContainerArr[i]);
                this.listContainerArr.splice(i, 1);
            }
        }
        this.listContainerArr = [];
    };
    PrisonView.prototype.touchPunishHandler = function (event) {
        Api.rookieVoApi.checkNextStep();
        // this._bubbleContainer.visible =false;
        // --参数 prisonId 囚犯id  isbatch 1一键惩罚
        //   this.prisonId=0
        this.getMypreNum = 0;
        this.getMypreNum = Api.prisonVoApi.getMypre();
        this.prisonerImage.touchEnabled = false;
        if (this.prisonId != 0) {
            var PrisonItemCfg = Config.PrisonCfg.getIndexPrisonItemCfg(this.prisonId);
        }
        if (PrisonItemCfg) {
            if (this.getMypreNum >= PrisonItemCfg.cost) {
                var isbatch = 0;
                if (this.isOpenOnekey) {
                    isbatch = 1;
                }
                else {
                    isbatch = 0;
                }
                NetManager.request(NetRequestConst.REQUEST_PRISON_PUNISH, { "prisonId": this.prisonId + "", "isbatch": isbatch });
                App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRISON_PUNISH), this.useCallback, this);
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("prison_token"));
                this.prisonerImage.touchEnabled = true;
            }
        }
    };
    PrisonView.prototype.playAnimation = function () {
        //播放动画 tokenAnimation
        SoundManager.playEffect(SoundConst.EFFECT_PRISON_HIT);
        // this.tokenClip = ComponentManager.getCustomMovieClip("tokenAnimation",4,150);
        // this.tokenClip.x = 260;
        // this.tokenClip.y = 320;
        // this.tokenClip .playWithTime(1);
        // this.addChild(this.tokenClip);
        // this.tokenClip.setEndCallBack(this.clipCallback,this);
        var rnd = App.MathUtil.getRandom(1, 4);
        var container = new BaseDisplayObjectContainer();
        var aniBB = BaseBitmap.create("punish_ani" + rnd);
        container.setScale(2.5);
        this.addChildToContainer(container);
        container.addChild(aniBB);
        container.anchorOffsetX = container.width / 2;
        container.anchorOffsetY = container.height / 2;
        var posX = [280, 320, 280, 340];
        var posY = [400, 400, 380, 440];
        container.x = posX[rnd - 1];
        container.y = posY[rnd - 1];
        egret.Tween.get(container).to({ scaleX: 1, scaleY: 1 }, 200).call(function (m) {
            if (m) {
                this.nextAni2(m);
                this.clipCallback();
            }
        }.bind(this, container), this);
    };
    PrisonView.prototype.nextAni2 = function (m) {
        var aniBB = BaseBitmap.create("punish_light");
        m.addChildAt(aniBB, 0);
        egret.Tween.removeTweens(m);
        egret.Tween.get(m).wait(200).to({ alpha: 0 }, 500).call(function (m) {
            if (m) {
                egret.Tween.removeTweens(m);
                m.dispose();
            }
        }.bind(this, m), this);
    };
    PrisonView.prototype.clipCallback = function () {
        // egret.Tween.get(this.tokenClip).to({alpha:0},1000).call(this.onComplete2,this);
        if (this.retBoo) {
            if (this._newPrisonBoo) {
                this.prisonerHeadImage.texture = ResourceManager.getRes("prison_head2_2");
            }
            else {
                this.prisonerHeadImage.texture = ResourceManager.getRes("prison_head2");
            }
            if (this.prisonDesTxt) {
                this.prisonDesTxt.text = LanguageManager.getlocal("PrisonDesTxt" + App.MathUtil.getRandom(1, 5));
            }
            if (this._bubbleContainer) {
                this._bubbleContainer.visible = false;
            }
            if (this.dialogueContainer) {
                this.dialogueContainer.visible = true;
            }
            if (this.rewardsData) {
                var actTimeArr = App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(this.rewardsData.rewards));
                this._actTimeArr = actTimeArr;
                this.showRewards(this.rewardsData);
            }
        }
    };
    PrisonView.prototype.onComplete2 = function () {
        // if(this.tokenClip&&this.tokenClip.parent)
        // {	
        // 	this.tokenClip.parent.removeChild(this.tokenClip);
        // 	this.tokenClip.dispose();
        // }
    };
    PrisonView.prototype.useCallback = function (event) {
        var _this = this;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRISON_PUNISH), this.useCallback, this);
        //跨天处理
        if (event.data.data.ret == 0 && event.data.data.data.prisonFlag == true) {
            var ths = this;
            ths.prisonerImage.visible = true;
            ths.prisonerHeadImage.visible = true;
            if (ths._nameTxt) {
                ths._nameTxt.visible = true;
            }
            if (ths.nameBg) {
                ths.nameBg.visible = true;
            }
            ths.refresh();
            ths.death = false;
            this.restPrisonView();
            if (this.prisonId != 10) {
                var progressBar = ComponentManager.getProgressBar("prisonview_progress", "progress3_bg", 410);
                progressBar.setPosition(110, GameConfig.stageHeigth - 275);
                this.addChildToContainer(progressBar);
                this._progressBar = progressBar;
                if (this.prisonId != 0) {
                    this.showProgress();
                }
            }
            return;
        }
        else if (event.data.ret == true) {
            this.rewardsData = event.data.data.data;
            this.retBoo = true;
            if (this._newPrisonBoo) {
                this.clipCallback();
            }
            else {
                this.playAnimation();
            }
            var ths_1 = this;
            // this.clipCallback();
            this._timeout1 = egret.setTimeout(function () {
                _this._timeout1 = 0;
                // 死亡
                if (_this.prisonId != 0 && Api.prisonVoApi.getIndexPrisonNum(_this.prisonId) == 0) {
                    _this.death = true;
                    _this.prisonerImage.visible = false;
                    _this.prisonerHeadImage.visible = false;
                    _this._nameTxt.visible = false;
                    _this._progressBar.visible = false;
                    _this.nameBg.visible = false;
                    _this.dialogueContainer.visible = false;
                    _this._timeout2 = egret.setTimeout(function () {
                        _this._timeout2 = 0;
                        //最后一个犯人的时候
                        if (ths_1.currPrisonNumber <= 1 && event.data.prisonFlag != true) {
                            ths_1.refresh();
                            ths_1.prisonDesTxt.visible = true;
                            var overTxt = ComponentManager.getTextField("0", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
                            overTxt.text = LanguageManager.getlocal("prisondes");
                            overTxt.width = _this.punishprisoners.width;
                            overTxt.x = 245;
                            overTxt.y = 235;
                            _this._bubbleContainer.addChild(overTxt);
                            // this.prisonDesBg.width = overTxt.textWidth;
                            _this.prisonDesBg.height = overTxt.textHeight + 30;
                            if (_this.prisonDesBg.width < 200 || _this.prisonDesBg.height < 76) {
                                _this.prisonDesBg.width = 230;
                                _this.prisonDesBg.height = 76;
                            }
                            _this.prisonDesBgcorner.y = _this.prisonDesBg.y + _this.prisonDesBg.height - 3;
                            ths_1.punishprisoners.visible = false;
                            _this._bubbleContainer.visible = true;
                        }
                        else {
                            ths_1.prisonerImage.visible = true;
                            ths_1.prisonerHeadImage.visible = true;
                            if (_this._newPrisonBoo) {
                                ths_1.prisonerHeadImage.texture = ResourceManager.getRes("prison_head1_2");
                            }
                            else {
                                ths_1.prisonerHeadImage.texture = ResourceManager.getRes("prison_head1");
                            }
                            ths_1._nameTxt.visible = true;
                            ths_1._progressBar.visible = true;
                            ths_1.nameBg.visible = true;
                            ths_1.refresh();
                        }
                    }, ths_1, 1300, 1);
                }
                else {
                    ths_1.death = false;
                    ths_1.refresh();
                }
            }, ths_1, 800, 1);
        }
        else {
            if (this.prisonerImage) {
                this.prisonerImage.touchEnabled = true;
            }
            this.retBoo = false;
        }
    };
    PrisonView.prototype.showRewards = function (data) {
        this.currIconArr = [];
        var contentList = GameData.formatRewardItem(data.rewards);
        for (var i = 0; i < contentList.length; i++) {
            var icon = GameData.getItemIcon(contentList[i], true);
            icon.anchorOffsetX = icon.width / 2;
            icon.anchorOffsetY = icon.height / 2;
            icon.scaleX = 0.5;
            icon.scaleY = 0.5;
            icon.x = 300;
            icon.y = GameConfig.stageHeigth / 2 - 70;
            this.addChild(icon);
            App.DisplayUtil.addFactorFunc(BaseDisplayObjectContainer);
            var currX = App.MathUtil.getRandom(500);
            if (this._newPrisonBoo) {
                icon.y = GameConfig.stageHeigth - 300;
                icon.x = 180;
                icon["tweenMoveList"] = [egret.Point.create(icon.x, icon.y), egret.Point.create(currX, 400), egret.Point.create(currX, 900)];
            }
            else {
                icon["tweenMoveList"] = [egret.Point.create(icon.x, icon.y), egret.Point.create(currX, 200), egret.Point.create(currX, 800)];
            }
            egret.Tween.get(icon).to({}).call(this.onComplete, this, [icon]);
            this.addChild(icon);
            this.currIconArr.push(icon);
        }
    };
    PrisonView.prototype.onComplete = function (icon) {
        var _this = this;
        if (icon === void 0) { icon = null; }
        this._timeout3 = egret.setTimeout(function () {
            _this._timeout3 = 0;
            if (_this.prisonerHeadImage) {
                if (_this._newPrisonBoo) {
                    _this.prisonerHeadImage.texture = ResourceManager.getRes("prison_head1_2");
                    // if(this.prisonerImage)
                    // {
                    // 	this.prisonerImage.touchEnabled=true;
                    // }
                }
                else {
                    _this.prisonerHeadImage.texture = ResourceManager.getRes("prison_head1");
                }
            }
        }, this, 400);
        var l = this.currIconArr.length;
        for (var i = l - 1; i >= 0; i--) {
            egret.Tween.removeTweens(this.currIconArr[i]);
            egret.Tween.get(this.currIconArr[i]).wait(100).to({ factor: 1 }, 700).call(function (icon) {
                var _this = this;
                this._timeout4 = egret.setTimeout(function () {
                    _this._timeout4 = 0;
                    _this.restPrisonView();
                    icon.dispose();
                    icon["tweenMoveList"] = undefined;
                    _this.currIconArr.splice(i, 1);
                }, this, 800);
            }.bind(this, this.currIconArr[i]));
        }
    };
    PrisonView.prototype.restPrisonView = function () {
        if (!this.death) {
            if (this.dialogueContainer) {
                this.dialogueContainer.visible = true;
            }
            // if(this.prisonerHeadImage)
            // {
            // 	if(this._newPrisonBoo)
            // 	{
            // 		this.prisonerHeadImage.texture = ResourceManager.getRes("prison_head1_2");
            // 	}
            // 	else
            // 	{
            // 		this.prisonerHeadImage.texture = ResourceManager.getRes("prison_head1");
            // 	} 
            // }
            if (this.prisonerImage) {
                this.prisonerImage.visible = true;
            }
        }
        if (this._bubbleContainer) {
            this._bubbleContainer.visible = true;
        }
        if (this.dialogueContainer) {
            this.dialogueContainer.visible = false;
        }
        if (this.prisonDesTxt) {
            this.prisonDesTxt.text = "";
        }
        if (this.prisonerImage) {
            this.prisonerImage.touchEnabled = true;
        }
    };
    PrisonView.prototype.getRandom = function () {
        return App.MathUtil.getRandom(100, 540);
    };
    //显示头像列表
    PrisonView.prototype.showList = function () {
        this.clearListContainerArr();
        this._scrollContainer = null;
        this._scrollContainer = new BaseDisplayObjectContainer();
        for (var i = 0; i < this.getPrisonInfoArr.length; i++) {
            var prisonHeadView = new PrisonHeadView();
            prisonHeadView.showHead(i, this.getPrisonInfoArr[i]);
            prisonHeadView.x = 80 * i + 4;
            this.listContainerArr.push(prisonHeadView);
            this._scrollContainer.addChild(prisonHeadView);
        }
        this.addChild(this._scrollContainer);
        var rect2 = egret.Rectangle.create();
        rect2.setTo(120, -10, 470, 400);
        var scrollView = ComponentManager.getScrollView(this._scrollContainer, rect2);
        if (this.getPrisonInfoArr.length >= 6 && this.prisonId > 6) {
            scrollView.setScrollLeft(500);
        }
        this.addChildToContainer(scrollView);
        this._scrollContainer.setPosition(30, 30);
        this.listContainerArr.push(scrollView);
    };
    PrisonView.prototype.showProgress = function () {
        if (this.prisonId != 0 && this.prisonId != 10) {
            var currPrisonItemCfg = Config.PrisonCfg.getIndexPrisonItemCfg(this.prisonId);
            var currpunishment = Api.prisonVoApi.getIndexPrisonNum(this.prisonId);
            var percent = 0;
            percent = (currpunishment) / currPrisonItemCfg.num;
            var outPut = LanguageManager.getlocal("prisonOutput") + ": ";
            this._progressBar.setPercentage(percent, outPut + Math.floor(percent * 100) + "%");
        }
        else {
            if (this._progressBar && this._progressBar.parent) {
                this._progressBar.parent.removeChild(this._progressBar);
                this._progressBar.dispose();
                this._progressBar = null;
            }
        }
    };
    PrisonView.prototype.refresh = function () {
        this.retBoo = false;
        this.dailypreNum = Api.prisonVoApi.getDailypre();
        this.getMaxpreNum = Api.prisonVoApi.getMaxpre();
        this.getMypreNum = Api.prisonVoApi.getMypre();
        this.getPrisonInfoArr = Api.prisonVoApi.getPrisonInfo();
        this.prisonId = Api.prisonVoApi.getCurrPrisonId();
        this.currPrisonNumber = Api.prisonVoApi.getcurrPrisonNumber();
        if (this.prisonId != 0) {
            var currpunishment = Api.prisonVoApi.getIndexPrisonNum(this.prisonId);
            var currPrisonItemCfg = Config.PrisonCfg.getIndexPrisonItemCfg(this.prisonId);
            var percent = ((currpunishment) / currPrisonItemCfg.num);
        }
        if (percent == 1) {
            if (Api.rookieVoApi.isGuiding) {
                return;
            }
            this.drawblackMask();
            if (PrisonView.INFINITE_NUM == 0 && this.prisonId == 1) {
                ViewController.getInstance().openView(ViewConst.POPUP.PRISONPOPVIEW);
            }
            else {
                ViewController.getInstance().openView(ViewConst.POPUP.PRISONPOPVIEW);
            }
            this._PrisonPopView = ViewController.getInstance().getView(ViewConst.POPUP.PRISONPOPVIEW);
            App.MessageHelper.addEventListener(MessageConst.MESSAGE_CLOSE_BLACKPANEL, this._closeHandler, this);
        }
        if (this._renownTxt) {
            this._renownTxt.text = LanguageManager.getlocal("renownTxtDesc", [this.getMypreNum + "", this.getMaxpreNum + ""]);
        }
        if (this._progressBar) {
            this.showProgress();
        }
        if (this._prisonerTxt) {
            this._prisonerTxt.text = LanguageManager.getlocal("prisonerTxtDesc" + this._hexieType, [this.currPrisonNumber + "", this.getPrisonInfoArr.length + ""]);
        }
        if (this._nameTxt) {
            var prisoner = LanguageManager.getlocal("prisonPrisoner" + this._hexieType);
            this._nameTxt.text = prisoner + LanguageManager.getlocal("" + Api.prisonVoApi.getPrisonName());
        }
        this.showList();
    };
    PrisonView.prototype.drawblackMask = function () {
        this.curr_maskBmp = BaseBitmap.create("public_9_viewmask");
        this.curr_maskBmp.width = GameConfig.stageWidth;
        this.curr_maskBmp.height = GameConfig.stageHeigth;
        this.curr_maskBmp.touchEnabled = true;
        this.curr_maskBmp.addTouchTap(this.closePrisonHead, this);
        this.addChild(this.curr_maskBmp);
    };
    PrisonView.prototype.closePrisonHead = function () {
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CLOSE_POPUPVIEW);
    };
    PrisonView.prototype._closeHandler = function () {
        if (this.curr_maskBmp && this.curr_maskBmp.parent) {
            this.removeChild(this.curr_maskBmp);
            this.curr_maskBmp = null;
        }
        if (this._PrisonPopView != null) {
            this._PrisonPopView.removeEventListener("closeEvent", this._closeHandler, this);
        }
        this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(this.container, this.prisonerImage.x + this.prisonerImage.width / 2 - 10, this.prisonerImage.y + this.prisonerImage.height / 2, [this.prisonerImage], 116, true, function () {
            // let getMypreNum = Api.prisonVoApi.getMypre();
            // if(this.prisonId!=0){
            // 	let prisonItemCfg =Config.PrisonCfg.getIndexPrisonItemCfg(this.prisonId);
            // 	if(prisonItemCfg && getMypreNum>=prisonItemCfg.cost && getMypreNum - prisonItemCfg.cost >= prisonItemCfg.cost){
            // 		return true;
            // 	}
            // }
            // return false;
            return true;
        }, this);
    };
    PrisonView.prototype.getShowHeight = function () {
        return 200;
    };
    PrisonView.prototype.dispose = function () {
        Api.mainTaskVoApi.hideGuide();
        PrisonView.INFINITE_NUM = 0;
        this.touchIndex = 0;
        this.prisonDesBg = null;
        this.prisonDesBgcorner = null;
        this.punishprisoners = null;
        this._prisonerTxt = null;
        this._PrisonInfoVoList = [];
        this._progressBar = null;
        this._nameTxt = null;
        this._renownTxt = null;
        this._dailyoutputTxt = null;
        this._prisonDesc = null;
        this.prisonId = 0;
        this.dailypreNum = 0;
        this.getMaxpreNum = 0;
        this.getMypreNum = 0;
        this.getPrisonInfoArr = [];
        this.isOpenOnekey = false;
        this.prisonerHeadImage = null;
        this.prisonerImage.removeTouch();
        this._scrollContainer.dispose();
        this._PrisonInfoVoList = [];
        this._scrollContainer = null;
        this._bubbleContainer.dispose();
        this._bubbleContainer = null;
        this.prisonerImage = null;
        this.getPrisonInfoArr = [];
        this.currIconArr = [];
        this._punishmentputTxt = null;
        this.curr_maskBmp = null;
        this.dialogueContainer = null;
        this.rewardsData = null;
        if (this._actTimeArr && this._actTimeArr.length > 0) {
            for (var i = 0; i < this._actTimeArr.length; i++) {
                egret.clearTimeout(this._actTimeArr[i]);
            }
        }
        this._actTimeArr = [];
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRISON_PUNISH), this.useCallback, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CLOSE_BLACKPANEL, this._closeHandler, this);
        if (this._timeout1) {
            egret.clearTimeout(this._timeout1);
        }
        this._timeout1 = 0;
        if (this._timeout2) {
            egret.clearTimeout(this._timeout2);
        }
        this._timeout2 = 0;
        if (this._timeout3) {
            egret.clearTimeout(this._timeout3);
        }
        this._timeout3 = 0;
        if (this._timeout4) {
            egret.clearTimeout(this._timeout4);
        }
        this._timeout4 = 0;
        _super.prototype.dispose.call(this);
    };
    PrisonView.INFINITE_NUM = 0;
    return PrisonView;
}(CommonView));
//# sourceMappingURL=PrisonView.js.map