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
/**
 * 情系良缘
 * date 2020.7.21
 * author ycg
 * @class AcGoodMatchView
 */
var AcGoodMatchView = /** @class */ (function (_super) {
    __extends(AcGoodMatchView, _super);
    function AcGoodMatchView() {
        var _this = _super.call(this) || this;
        _this._timeBg = null;
        _this._timeTxt = null;
        _this._rechargeTip = null;
        _this._detailRed = null;
        _this._processContainer = null;
        _this._scrollView = null;
        _this._onceContainer = null;
        _this._freeDesc = null;
        _this._toolNumBg = null;
        _this._toolIcon = null;
        _this._toolNum = null;
        _this._multiNeedContainer = null;
        _this._playMultiBtn = null;
        _this._multiBtnInfo = null;
        _this._processNum = null;
        _this._oneKeyContainer = null;
        _this._ballContainer = null;
        _this._boxList = [];
        _this._ballList = [];
        _this._lastMapData = null;
        _this._playBallId = [];
        _this._isBatch = false;
        _this._isPlay = false;
        _this._rewardData = null;
        return _this;
    }
    AcGoodMatchView.prototype.getTitleStr = function () {
        return null;
    };
    AcGoodMatchView.prototype.getTitleBgName = function () {
        return App.CommonUtil.getResByCode("acgoodmatch_titlebg", this.getTypeCode());
    };
    AcGoodMatchView.prototype.getBgName = function () {
        return App.CommonUtil.getResByCode("acgoodmatch_bg", this.getTypeCode());
    };
    AcGoodMatchView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    AcGoodMatchView.prototype.getProbablyInfo = function () {
        return App.CommonUtil.getCnByCode("acGoodMatchProbablyInfo", this.getTypeCode());
    };
    AcGoodMatchView.prototype.getRuleInfo = function () {
        return App.CommonUtil.getCnByCode("acGoodMatchRuleInfo", this.getTypeCode());
    };
    AcGoodMatchView.prototype.getRuleInfoParam = function () {
        return ["" + this.cfg.needGem];
    };
    AcGoodMatchView.prototype.getRuleBtnName = function () {
        return ButtonConst.BTN2_RULE;
    };
    AcGoodMatchView.prototype.getResourceList = function () {
        var list = [];
        return _super.prototype.getResourceList.call(this).concat([
            "acgoodmatchcode1", "acgoodmatchcode1" + this.getTypeCode(), "acthrowstone_common_wife_txt",
            "acthreekingofwife_infobg-1", "examview_right", "acgoodmatch_numbg", "acgoodmatch_cloudright", "acgoodmatch_cloudleft",
        ]).concat(list);
    };
    Object.defineProperty(AcGoodMatchView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGoodMatchView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcGoodMatchView.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    //气球类型
    AcGoodMatchView.prototype.getBallCfg = function () {
        return [
            1, 2, 3, 4,
            4, 3, 2, 1,
            2, 1, 4, 3,
            3, 2, 1, 4,
        ];
    };
    AcGoodMatchView.prototype.initView = function () {
        var _this = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACGOODMATCH_LOTTERY, this.playBtnCallback, this);
        this.showStartDialog();
        var infoBg = BaseBitmap.create("acthreekingofwife_infobg-1");
        infoBg.setPosition(0, this.titleBg.y + this.titleBg.height - 7 - 95);
        this.addChildToContainer(infoBg);
        //活动时间   
        var dateText = ComponentManager.getTextField(LanguageManager.getlocal("acComm_time", [this.vo.acTimeAndHour]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        dateText.x = infoBg.x + 20;
        dateText.y = this.titleBg.y + this.titleBg.height + 3;
        this.addChildToContainer(dateText);
        //活动文本
        var descTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acGoodMatchDesc", this.getTypeCode()), ["" + this.cfg.needGem]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTxt.width = 600;
        descTxt.lineSpacing = 4;
        descTxt.x = dateText.x;
        descTxt.y = dateText.y + dateText.height + 5;
        this.addChildToContainer(descTxt);
        //倒计时
        this._timeBg = BaseBitmap.create("public_9_bg61");
        this._timeBg.y = infoBg.y + infoBg.height - this._timeBg.height / 2;
        this.addChildToContainer(this._timeBg);
        this._timeTxt = ComponentManager.getTextField(LanguageManager.getlocal("acComm_timeCount", [this.vo.getCountDown()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._timeBg.width = 40 + this._timeTxt.width;
        this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 10;
        this._timeTxt.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._timeTxt.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._timeTxt.height / 2);
        this.addChildToContainer(this._timeTxt);
        //充值信息
        var rechargeTip = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acGoodMatchRechargeInfo", this.getUiCode()), ["" + this.vo.getNeedRecharge()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rechargeTip.setPosition(dateText.x, infoBg.y + infoBg.height - rechargeTip.height - 3);
        this.addChildToContainer(rechargeTip);
        this._rechargeTip = rechargeTip;
        //佳人衣装
        var roleContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(roleContainer);
        //气球
        var ballContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(ballContainer);
        this._ballContainer = ballContainer;
        //ballBg
        var ballBg = BaseBitmap.create(App.CommonUtil.getResByCode("acgoodmatch_ballbg", this.getTypeCode()));
        ballContainer.width = ballBg.width;
        ballContainer.height = ballBg.height;
        ballContainer.addChild(ballBg);
        var ballCfg = this.getBallCfg();
        for (var i = 0; i < ballCfg.length; i++) {
            var ball = BaseBitmap.create(App.CommonUtil.getResByCode("acgoodmatch_ball" + ballCfg[i], this.getTypeCode()));
            ball.anchorOffsetX = ball.width / 2;
            ball.anchorOffsetY = ball.height;
            ball.setPosition(128 + 84 * (i % 4), 110 + Math.floor(i / 4) * 94);
            ballContainer.addChild(ball);
            var rotat = Math.floor(App.MathUtil.getRandom(2, 11) * 7 / 10);
            egret.Tween.get(ball, { loop: true }).to({ rotation: rotat }, 400).to({ rotation: -rotat * 2 }, 800).to({ rotation: 0 }, 400);
            this._ballList[i] = ball;
        }
        this.refreshBall();
        //活动详情
        var detailBtn = ComponentManager.getButton(App.CommonUtil.getResByCode("acgoodmatch_detailbtn", this.getTypeCode()), "", function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACGOODMATCHDETAILPOPUPVIEW, { aid: _this.aid, code: _this.code });
        }, this);
        detailBtn.setPosition(0, infoBg.y + infoBg.height);
        var detailRed = BaseBitmap.create("public_dot2");
        detailRed.setPosition(detailBtn.x + detailBtn.width - 28, detailBtn.y + 12);
        this._detailRed = detailRed;
        if (this.vo.checkAchieveRed() || this.vo.checkExchangeRed() || this.vo.checkServerRewardRed()) {
            detailRed.visible = true;
        }
        else {
            detailRed.visible = false;
        }
        //进度相关
        var redLine = BaseBitmap.create(App.CommonUtil.getResByCode("acgoodmatch_proredline", this.getTypeCode()));
        redLine.setPosition(detailBtn.x + detailBtn.width - 13, infoBg.y + infoBg.height + 58);
        this.addChildToContainer(redLine);
        var processContainer = new BaseDisplayObjectContainer();
        processContainer.height = 110;
        this._processContainer = processContainer;
        var scrollView = ComponentManager.getScrollView(processContainer, new egret.Rectangle(0, 0, GameConfig.stageWidth - detailBtn.x - detailBtn.width + 13, processContainer.height));
        scrollView.setPosition(redLine.x, infoBg.y + infoBg.height + 18);
        this.addChildToContainer(scrollView);
        scrollView.bounces = false;
        this._scrollView = scrollView;
        this.initProcess();
        this.refreshProcess();
        this.addChildToContainer(detailBtn);
        this.addChildToContainer(detailRed);
        //当前进度
        var processBg = BaseBitmap.create(App.CommonUtil.getResByCode("acgoodmatch_processbg", this.getTypeCode()));
        processBg.setPosition(ballContainer.width / 2 - processBg.width / 2 + 25, ballContainer.y - processBg.height / 2);
        ballContainer.addChild(processBg);
        var currProcess = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acGoodMatchProcessNum", this.getTypeCode()), ["" + this.vo.getProcessNum()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        currProcess.anchorOffsetX = currProcess.width / 2;
        currProcess.setPosition(processBg.x + processBg.width / 2, processBg.y + processBg.height / 2 - currProcess.height / 2 + 5);
        ballContainer.addChild(currProcess);
        this._processNum = currProcess;
        //bottom
        var bottomBg = BaseBitmap.create(App.CommonUtil.getResByCode("acgoodmatch_bottombg", this.getTypeCode()));
        bottomBg.setPosition(0, GameConfig.stageHeigth - bottomBg.height);
        this.addChildToContainer(bottomBg);
        ballContainer.setPosition(GameConfig.stageWidth - ballBg.width, bottomBg.y + 65 - ballContainer.height);
        //playBtn
        var playOnceBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, "", this.playBtnClick, this, [0], null, null, TextFieldConst.COLOR_BLACK);
        playOnceBtn.setPosition(70, bottomBg.y + 110);
        this.addChildToContainer(playOnceBtn);
        var playOnceInfo = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acGoodMatchPlayBtnInfo2", this.getTypeCode()), ["1"]), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_BLACK);
        playOnceBtn.addChild(playOnceInfo);
        playOnceInfo.setPosition(playOnceBtn.width / 2 - playOnceInfo.width / 2, playOnceBtn.height / 2 - playOnceInfo.height / 2);
        //once need
        var onceContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(onceContainer);
        var onceIcon = BaseBitmap.create(App.CommonUtil.getResByCode("acgoodmatch_smalltoolicon", this.getTypeCode()));
        onceContainer.addChild(onceIcon);
        var onceNeed = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acGoodMatchPlayNeedNum", this.getTypeCode()), ["" + 1]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        onceContainer.addChild(onceNeed);
        onceIcon.setPosition(playOnceBtn.x + playOnceBtn.width / 2 - (onceIcon.width + onceNeed.width) / 2, playOnceBtn.y - onceIcon.height);
        onceNeed.setPosition(onceIcon.x + onceIcon.width, onceIcon.y + onceIcon.height / 2 - onceNeed.height / 2 + 10);
        this._onceContainer = onceContainer;
        var freeDesc = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acGoodMatchPlayBtnInfo1", this.getTypeCode())), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN);
        this.addChildToContainer(freeDesc);
        freeDesc.setPosition(playOnceBtn.x + playOnceBtn.width / 2 - freeDesc.width / 2, playOnceBtn.y - freeDesc.height - 2);
        this._freeDesc = freeDesc;
        //十次
        var playMultiBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, "", this.playBtnClick, this, [1], null, null, TextFieldConst.COLOR_BLACK);
        playMultiBtn.setPosition(GameConfig.stageWidth - playMultiBtn.width - 70, playOnceBtn.y);
        this.addChildToContainer(playMultiBtn);
        this._playMultiBtn = playMultiBtn;
        var playMultiInfo = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acGoodMatchPlayBtnInfo2", this.getTypeCode()), ["10"]), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_BLACK);
        playMultiBtn.addChild(playMultiInfo);
        playMultiInfo.setPosition(playMultiBtn.width / 2 - playMultiInfo.width / 2, playMultiBtn.height / 2 - playMultiInfo.height / 2);
        this._multiBtnInfo = playMultiInfo;
        //multi need
        var multiContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(multiContainer);
        var multiIcon = BaseBitmap.create(App.CommonUtil.getResByCode("acgoodmatch_smalltoolicon", this.getTypeCode()));
        multiContainer.addChild(multiIcon);
        multiIcon.name = "multiIcon";
        var multiNeed = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acGoodMatchPlayNeedNum", this.getTypeCode()), ["" + 10]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        multiContainer.addChild(multiNeed);
        multiNeed.name = "multiNeed";
        multiContainer.width = multiIcon.width + multiNeed.width;
        multiContainer.anchorOffsetX = multiContainer.width / 2;
        multiContainer.setPosition(playMultiBtn.x + playMultiBtn.width / 2, playMultiBtn.y - multiIcon.height);
        multiIcon.setPosition(0, 0);
        multiNeed.setPosition(multiIcon.x + multiIcon.width, multiIcon.y + multiIcon.height / 2 - multiNeed.height / 2 + 10);
        this._multiNeedContainer = multiContainer;
        var oneKeyContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(oneKeyContainer);
        this._oneKeyContainer = oneKeyContainer;
        var oneKeyBg = BaseBitmap.create("acgoodmatch_numbg");
        oneKeyBg.setPosition(playMultiBtn.x + playMultiBtn.width / 2 - oneKeyBg.width / 2, playMultiBtn.y + playMultiBtn.height + 1);
        oneKeyContainer.addChild(oneKeyBg);
        var oneKeyCheckbox = BaseBitmap.create("public_select");
        oneKeyCheckbox.setScale(0.8);
        oneKeyCheckbox.setPosition(oneKeyBg.x + 20, oneKeyBg.y + 1);
        oneKeyContainer.addChild(oneKeyCheckbox);
        var oneKeyCheckFlag = BaseBitmap.create("examview_right");
        oneKeyCheckFlag.setPosition(oneKeyCheckbox.x + oneKeyCheckbox.width * oneKeyCheckbox.scaleX / 2 - oneKeyCheckFlag.width / 2 + 3, oneKeyBg.y - 2);
        oneKeyContainer.addChild(oneKeyCheckFlag);
        oneKeyCheckFlag.visible = false;
        var oneKeyTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acGoodMatchPlayMulti", this.getTypeCode())), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        oneKeyTxt.setPosition(oneKeyCheckbox.x + oneKeyCheckbox.width * oneKeyCheckbox.scaleX + 4, oneKeyBg.y + oneKeyBg.height / 2 - oneKeyTxt.height / 2);
        oneKeyContainer.addChild(oneKeyTxt);
        oneKeyCheckbox.addTouchTap(function () {
            _this._isBatch = !_this._isBatch;
            if (_this._isBatch) {
                oneKeyCheckFlag.visible = true;
            }
            else {
                oneKeyCheckFlag.visible = false;
            }
            _this.freshPlayBtnInfo();
        }, this);
        if (this.vo.getProcessNum() >= this.getBallCfg().length * 2) {
            this._oneKeyContainer.visible = true;
        }
        else {
            this._oneKeyContainer.visible = false;
        }
        this.freshPlayBtnInfo();
        //tool num
        var toolBg = BaseBitmap.create("public_9_bg80");
        this.addChildToContainer(toolBg);
        this._toolNumBg = toolBg;
        var toolIcon = BaseBitmap.create(App.CommonUtil.getResByCode("acgoodmatch_smalltoolicon", this.getTypeCode()));
        this.addChildToContainer(toolIcon);
        this._toolIcon = toolIcon;
        var currToolNum = this.vo.getToolNum();
        var toolNum = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acGoodMatchPlayNeedNum", this.getTypeCode()), ["" + currToolNum]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.addChildToContainer(toolNum);
        this._toolNum = toolNum;
        toolBg.width = toolIcon.width + toolNum.width + 50;
        toolBg.setPosition(GameConfig.stageWidth / 2 - toolBg.width / 2, bottomBg.y + 70);
        toolIcon.setPosition(toolBg.x + 25, toolBg.y + toolBg.height / 2 - toolIcon.height / 2);
        toolNum.setPosition(toolIcon.x + toolIcon.width, toolBg.y + toolBg.height / 2 - toolNum.height / 2);
        //change pool btn
        var poolBtn = ComponentManager.getButton(App.CommonUtil.getResByCode("acgoodmatch_changepoolbtn", this.getTypeCode()), "", function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACGOODMATCHDETAILPOPUPVIEWTAB3, { aid: _this.aid, code: _this.code });
        }, this);
        poolBtn.setPosition(GameConfig.stageWidth - poolBtn.width - 30, bottomBg.y - 15);
        this.addChildToContainer(poolBtn);
        //衣装预览
        var wifeId = this.cfg.show;
        var wifeCfg = Config.WifeCfg.getWifeCfgById(wifeId);
        var boneName = null;
        if (wifeCfg && wifeCfg.bone) {
            boneName = wifeCfg.bone + "_ske";
        }
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            var wifeIcon = App.DragonBonesUtil.getLoadDragonBones(wifeCfg.bone);
            wifeIcon.setScale(0.7);
            wifeIcon.anchorOffsetY = wifeIcon.height;
            wifeIcon.anchorOffsetX = wifeIcon.width / 2;
            wifeIcon.x = GameConfig.stageWidth / 4 - 20;
            wifeIcon.y = bottomBg.y + 20;
            roleContainer.addChild(wifeIcon);
        }
        else {
            var skinImg = BaseLoadBitmap.create(wifeCfg.body);
            skinImg.width = 640;
            skinImg.height = 840;
            skinImg.anchorOffsetX = skinImg.width / 2;
            skinImg.anchorOffsetY = skinImg.height;
            skinImg.setScale(0.5);
            skinImg.x = GameConfig.stageWidth / 4 - 20;
            skinImg.y = bottomBg.y + 20;
            roleContainer.addChild(skinImg);
        }
        //衣装预览
        var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
        skinTxtEffect.width = 208;
        skinTxtEffect.height = 154;
        skinTxtEffect.setPosition(bottomBg.x + GameConfig.stageWidth / 4 - skinTxtEffect.width / 2 - 40, bottomBg.y - 100);
        skinTxtEffect.blendMode = egret.BlendMode.ADD;
        this.addChildToContainer(skinTxtEffect);
        skinTxtEffect.playWithTime(-1);
        var skinTxt = BaseBitmap.create("acthrowstone_common_wife_txt");
        skinTxt.anchorOffsetX = skinTxt.width / 2;
        skinTxt.anchorOffsetY = skinTxt.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect);
        this.addChildToContainer(skinTxt);
        egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
        var skinTxt1 = BaseBitmap.create("acthrowstone_common_wife_txt");
        skinTxt1.anchorOffsetX = skinTxt1.width / 2;
        skinTxt1.anchorOffsetY = skinTxt1.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt1, skinTxtEffect);
        this.addChildToContainer(skinTxt1);
        skinTxt1.blendMode = egret.BlendMode.ADD;
        skinTxt1.alpha = 0;
        egret.Tween.get(skinTxt1, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        skinTxt1.addTouchTap(function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACGOODMATCHDETAILPOPUPVIEWTAB4, { aid: _this.aid, code: _this.code });
        }, this);
    };
    Object.defineProperty(AcGoodMatchView.prototype, "progressOffX", {
        //进度 间距
        get: function () {
            return 90;
        },
        enumerable: true,
        configurable: true
    });
    //进度
    AcGoodMatchView.prototype.initProcess = function () {
        var _this = this;
        var data = this.cfg.getAchieveList();
        var len = data.length;
        var proW = this.progressOffX * len;
        this._processContainer.width = proW;
        var _loop_1 = function (i) {
            var boxCon = new BaseDisplayObjectContainer();
            var box = BaseBitmap.create(App.CommonUtil.getResByCode("acgoodmatch_box1", this_1.getTypeCode()));
            boxCon.width = box.width;
            boxCon.height = this_1._processContainer.height;
            box.anchorOffsetX = box.width / 2;
            box.anchorOffsetY = 42;
            box.setPosition(boxCon.width / 2, 42);
            boxCon.addChild(box);
            box.name = "box" + i;
            var boxNum = ComponentManager.getTextField("" + data[i].needNum, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
            boxNum.setPosition(box.x - boxNum.width / 2 - 2, box.y - 32);
            boxCon.addChild(boxNum);
            var boxEff = ComponentManager.getCustomMovieClip("acgoodmatch_boxeff", 15, 70);
            boxEff.width = 77;
            boxEff.height = 161;
            boxEff.setPosition(box.x - boxEff.width / 2, box.x - 42 + box.height / 2 - boxEff.height / 2);
            boxEff.playWithTime(0);
            boxEff.visible = false;
            boxEff.name = "boxEff" + i;
            boxCon.addChild(boxEff);
            boxCon.setPosition(50 + i * this_1.progressOffX - boxCon.width / 2, 0);
            this_1._processContainer.addChild(boxCon);
            boxCon.addTouchTap(function () {
                ViewController.getInstance().openView(ViewConst.POPUP.ACGOODMATCHDETAILPOPUPVIEW, { aid: _this.aid, code: _this.code, id: data[i].id });
            }, this_1);
            this_1._boxList.push(boxCon);
        };
        var this_1 = this;
        for (var i = 0; i < len; i++) {
            _loop_1(i);
        }
        var curId = this.vo.getCurProcessIndex();
        this._scrollView.scrollLeft = this._processContainer.width - this._scrollView.width;
        var posX = Math.min(Math.max(0, (curId + 1 - 3) * this.progressOffX), this._processContainer.width - this._scrollView.width);
        this.showViewMask();
        egret.Tween.get(this._scrollView).wait(200).to({ scrollLeft: posX }, (this._scrollView.scrollLeft - posX)).call(function () {
            _this.hideViewMask();
            egret.Tween.removeTweens(_this._scrollView);
        }, this);
    };
    AcGoodMatchView.prototype.refreshProcess = function () {
        var data = this.cfg.getAchieveList();
        var currProcess = this.vo.getProcessNum();
        for (var i = 0; i < data.length; i++) {
            var boxCon = this._boxList[i];
            var box = boxCon.getChildByName("box" + i);
            var boxEff = boxCon.getChildByName("boxEff" + i);
            if (this.vo.isGetAchieveRewardById(data[i].id)) {
                box.setRes(App.CommonUtil.getResByCode("acgoodmatch_box2", this.getTypeCode()));
                boxEff.visible = false;
            }
            else {
                box.setRes(App.CommonUtil.getResByCode("acgoodmatch_box1", this.getTypeCode()));
                if (currProcess >= data[i].needNum) {
                    boxEff.visible = true;
                }
                else {
                    boxEff.visible = false;
                }
            }
        }
    };
    //刷新多次按钮
    AcGoodMatchView.prototype.freshPlayBtnInfo = function () {
        var currBallNum = this.vo.getCurrBallNum();
        var playNum = 10;
        var btnStr = "";
        if (this._isBatch) {
            playNum = currBallNum;
            btnStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acGoodMatchPlayMulti", this.getTypeCode()));
        }
        else {
            if (currBallNum < 10) {
                playNum = currBallNum;
            }
            btnStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acGoodMatchPlayBtnInfo2", this.getTypeCode()), ["" + playNum]);
        }
        //多次按钮
        this._multiBtnInfo.text = btnStr;
        this._multiBtnInfo.x = this._playMultiBtn.width / 2 - this._multiBtnInfo.width / 2;
        var multiNeedIcon = this._multiNeedContainer.getChildByName("multiIcon");
        var multiNeed = this._multiNeedContainer.getChildByName("multiNeed");
        multiNeed.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acGoodMatchPlayNeedNum", this.getTypeCode()), ["" + playNum]);
        this._multiNeedContainer.width = multiNeedIcon.width + multiNeed.width;
        this._multiNeedContainer.anchorOffsetX = this._multiNeedContainer.width / 2;
        //一次
        if (this.vo.isFree()) {
            this._freeDesc.visible = true;
            this._onceContainer.visible = false;
        }
        else {
            this._freeDesc.visible = false;
            this._onceContainer.visible = true;
        }
    };
    //刷新气球
    AcGoodMatchView.prototype.refreshBall = function () {
        var mapList = this.vo.getMapData();
        if (mapList) {
            for (var i = 0; i < this._ballList.length; i++) {
                this._ballList[i].visible = mapList[i] > 0 ? false : true;
            }
        }
    };
    AcGoodMatchView.prototype.playBtnClick = function (index) {
        if (!this.vo.isInActivity()) {
            this.vo.showAcEndTip();
            return;
        }
        if (this.vo.getPoolRewardId() == 0 && this.vo.getProcessNum() == 0) {
            var localKey = "poolrwd" + this.vo.aidAndCode + Api.playerVoApi.getPlayerID() + this.vo.st;
            var showFlag = LocalStorageManager.get(localKey);
            if (showFlag) {
            }
            else {
                LocalStorageManager.set(localKey, String(this.vo.st));
                ViewController.getInstance().openView(ViewConst.POPUP.ACGOODMATCHDETAILPOPUPVIEWTAB3, { aid: this.aid, code: this.code, isFirst: 1 });
                return;
            }
        }
        if (this._isPlay) {
            return;
        }
        var toolNum = this.vo.getToolNum();
        if (index == 0) {
            var isFree = 0;
            if (this.vo.isFree()) {
                isFree = 1;
            }
            else {
                if (toolNum <= 0) {
                    this.showRechargeTip();
                    return;
                }
            }
            this._lastMapData = this.vo.getMapData();
            this._isPlay = true;
            NetManager.request(NetRequestConst.REQUEST_ACGOODMATCH_LOTTERY, { activeId: this.vo.aidAndCode, isTenPlay: 0 });
        }
        else {
            var ballNum = this.vo.getCurrBallNum();
            var isBatch = 0;
            var isTen = 1;
            if (this._isBatch) {
                if (ballNum > toolNum) {
                    this.showRechargeTip();
                    return;
                }
                isBatch = 1;
                isTen = 0;
            }
            else {
                var playNum = 10;
                if (ballNum < 10) {
                    playNum = ballNum;
                }
                if (toolNum < playNum) {
                    this.showRechargeTip();
                    return;
                }
            }
            this._lastMapData = this.vo.getMapData();
            this._isPlay = true;
            NetManager.request(NetRequestConst.REQUEST_ACGOODMATCH_LOTTERY, { activeId: this.vo.aidAndCode, isTenPlay: isTen, isAllPlay: isBatch });
        }
    };
    //被扎的气球
    AcGoodMatchView.prototype.getPlayBallId = function () {
        var mapData = this.vo.getMapData();
        var data = [];
        var currBallNum = this.vo.getCurrBallNum();
        if (currBallNum == this.getBallCfg().length) {
            for (var i = 0; i < this._lastMapData.length; i++) {
                if (this._lastMapData[i] != 1) {
                    data.push(i);
                }
            }
        }
        else {
            for (var i = 0; i < mapData.length; i++) {
                if (this._lastMapData[i] != 1 && this._lastMapData[i] != mapData[i]) {
                    data.push(i);
                }
            }
        }
        return data;
    };
    AcGoodMatchView.prototype.playBtnCallback = function (evt) {
        var _this = this;
        if (!evt.data.ret) {
            this._isPlay = false;
            return;
        }
        this._rewardData = evt.data.data.data;
        this._playBallId = this.getPlayBallId();
        this._lastMapData = this.vo.getMapData();
        this.showViewMask();
        var _loop_2 = function (i) {
            egret.setTimeout(function () {
                _this.playArrowAni(_this._playBallId[i]);
            }, this_2, 50 * i);
        };
        var this_2 = this;
        for (var i = 0; i < this._playBallId.length; i++) {
            _loop_2(i);
        }
    };
    //飞镖动画
    AcGoodMatchView.prototype.playArrowAni = function (id) {
        var _this = this;
        var ball = this._ballList[id];
        var desX = this._ballContainer.x + ball.x;
        var desY = this._ballContainer.y + ball.y - ball.height / 2;
        var arrow = ComponentManager.getCustomMovieClip("acgoodmatch_arroweff", 8, 50);
        arrow.width = 100;
        arrow.height = 550;
        arrow.setPosition(desX - arrow.width / 2, desY);
        this.addChildToContainer(arrow);
        arrow.playWithTime(1);
        arrow.setEndCallBack(function () {
            arrow.dispose();
            var bombEff = ComponentManager.getCustomMovieClip("acgoodmatch_bombeff", 10, 60);
            bombEff.width = 250;
            bombEff.height = 200;
            _this.addChildToContainer(bombEff);
            bombEff.setPosition(desX - bombEff.width / 2, desY - bombEff.height / 2);
            bombEff.playWithTime(1);
            ball.visible = false;
            bombEff.setEndCallBack(function () {
                bombEff.dispose();
                if (id == _this._playBallId[_this._playBallId.length - 1]) {
                    _this.showRewardView();
                }
            }, _this);
        }, this);
    };
    //奖励面板
    AcGoodMatchView.prototype.showRewardView = function () {
        var _this = this;
        this.hideViewMask();
        this._isPlay = false;
        if (this._rewardData) {
            var rewards = this._rewardData.rewards;
            var replacerewards = this._rewardData.replacerewards;
            var isSameAdd = false;
            if (this._isBatch) {
                isSameAdd = true;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rewards, "isPlayAni": true, "isSameAdd": isSameAdd, "callback": function () {
                    _this.refreshProcess();
                    _this.freshMap();
                } });
            if (replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
            }
        }
    };
    //刷新地图动画
    AcGoodMatchView.prototype.freshMap = function () {
        var _this = this;
        var ballNum = this.vo.getCurrBallNum();
        if (ballNum == this.getBallCfg().length) {
            var cloudLeft_1 = BaseBitmap.create("acgoodmatch_cloudleft");
            cloudLeft_1.setPosition(-cloudLeft_1.width, 0);
            this.addChild(cloudLeft_1);
            var cloudRight_1 = BaseBitmap.create("acgoodmatch_cloudright");
            cloudRight_1.setPosition(GameConfig.stageWidth, 0);
            this.addChild(cloudRight_1);
            this.showViewMask();
            egret.Tween.get(cloudLeft_1, { loop: false }).to({ x: 0 }, 600, egret.Ease.sineIn)
                .wait(200)
                .to({ x: -cloudLeft_1.width }, 500, egret.Ease.sineOut)
                .call(function () {
                cloudLeft_1.dispose();
                cloudLeft_1 = null;
            }, this);
            egret.Tween.get(cloudRight_1, { loop: false }).to({ x: GameConfig.stageWidth - cloudRight_1.width }, 600, egret.Ease.sineIn)
                .call(function () {
                _this.refreshBall();
            }, this)
                .wait(200)
                .to({ x: GameConfig.stageWidth }, 500, egret.Ease.sineOut)
                .call(function () {
                cloudRight_1.dispose();
                cloudRight_1 = null;
                _this.hideViewMask();
            }, this);
        }
    };
    AcGoodMatchView.prototype.refreshView = function () {
        this.freshPlayBtnInfo();
        //道具
        var currToolNum = this.vo.getToolNum();
        this._toolNum.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acGoodMatchPlayNeedNum", this.getTypeCode()), ["" + currToolNum]);
        this._toolNumBg.width = this._toolIcon.width + this._toolNum.width + 50;
        this._toolNumBg.x = GameConfig.stageWidth / 2 - this._toolNumBg.width / 2;
        this._toolIcon.x = this._toolNumBg.x + 25;
        this._toolNum.x = this._toolIcon.x + this._toolIcon.width;
        //当前进度
        this._processNum.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acGoodMatchProcessNum", this.getTypeCode()), ["" + this.vo.getProcessNum()]);
        this._processNum.anchorOffsetX = this._processNum.width / 2;
        //红点
        if (this.vo.checkAchieveRed() || this.vo.checkExchangeRed() || this.vo.checkServerRewardRed()) {
            this._detailRed.visible = true;
        }
        else {
            this._detailRed.visible = false;
        }
        //充值提示
        this._rechargeTip.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acGoodMatchRechargeInfo", this.getTypeCode()), ["" + this.vo.getNeedRecharge()]);
        //一键
        if (this.vo.getProcessNum() >= this.getBallCfg().length * 2) {
            this._oneKeyContainer.visible = true;
        }
        else {
            this._oneKeyContainer.visible = false;
        }
        //进度
        if (!this._isPlay) {
            this.refreshProcess();
        }
    };
    AcGoodMatchView.prototype.tick = function () {
        this._timeTxt.text = LanguageManager.getlocal("acComm_timeCount", [this.vo.getCountDown()]);
        this._timeBg.width = 40 + this._timeTxt.width;
        this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 10;
        this._timeTxt.x = this._timeBg.x + this._timeBg.width / 2 - this._timeTxt.width / 2;
    };
    // //首次点击扔飞镖弹奖池
    // public showFirstPoolView():void{
    //     let localKey = "poolrwd"+this.vo.aidAndCode+Api.playerVoApi.getPlayerID()+this.vo.st;
    //     let showFlag = LocalStorageManager.get(localKey);
    //     if (showFlag){
    //         return ;
    //     }
    //     LocalStorageManager.set(localKey, String(this.vo.st));
    //     ViewController.getInstance().openView(ViewConst.POPUP.ACGOODMATCHDETAILPOPUPVIEWTAB3, {aid: this.aid, code: this.code});
    // }
    //首次进入对话
    AcGoodMatchView.prototype.showStartDialog = function () {
        var localKey = "startDialog" + this.vo.aidAndCode + Api.playerVoApi.getPlayerID() + this.vo.st;
        var showFlag = LocalStorageManager.get(localKey);
        if (showFlag) {
            return;
        }
        LocalStorageManager.set(localKey, String(this.vo.st));
        var view = this;
        var keyStr = "startDialog_" + this.getTypeCode();
        var startCfg = view.cfg[keyStr];
        ViewController.getInstance().openView(ViewConst.POPUP.ACYIYIBUSHEAVGVIEW, {
            aid: view.aid,
            code: view.getTypeCode(),
            AVGDialog: startCfg,
            visitId: "1",
            talkKey: "acGoodMatchStartDialog",
            // bgName: bgName,
            obj: view
        });
    };
    //充值提示
    AcGoodMatchView.prototype.showRechargeTip = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
            msg: LanguageManager.getlocal(App.CommonUtil.getCnByCode("acGoodMatchToolNotFull", this.getTypeCode())),
            touchMaskClose: true,
            title: "itemUseConstPopupViewTitle",
            callback: function () {
                ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
            },
            handle: this,
            needClose: 1,
            needCancel: true,
            confirmTxt: "taskGoBtn"
        });
    };
    //mask
    AcGoodMatchView.prototype.showViewMask = function () {
        var touchPos = BaseBitmap.create("public_alphabg");
        touchPos.width = GameConfig.stageWidth;
        touchPos.height = GameConfig.stageHeigth;
        this.addChild(touchPos);
        touchPos.name = "viewMaskTouchPos";
        touchPos.touchEnabled = true;
    };
    AcGoodMatchView.prototype.hideViewMask = function () {
        var touchPos = this.getChildByName("viewMaskTouchPos");
        if (touchPos) {
            touchPos.touchEnabled = false;
            touchPos.dispose();
        }
    };
    AcGoodMatchView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACGOODMATCH_LOTTERY, this.playBtnCallback, this);
        this.hideViewMask();
        this._timeBg = null;
        this._timeTxt = null;
        this._rechargeTip = null;
        this._detailRed = null;
        this._processContainer = null;
        this._scrollView = null;
        this._onceContainer = null;
        this._freeDesc = null;
        this._toolNumBg = null;
        this._toolIcon = null;
        this._toolNum = null;
        this._multiNeedContainer = null;
        this._multiBtnInfo = null;
        this._processNum = null;
        this._oneKeyContainer = null;
        this._ballContainer = null;
        this._boxList = [];
        this._ballList = [];
        this._lastMapData = null;
        this._playBallId = [];
        this._isBatch = false;
        this._isPlay = false;
        _super.prototype.dispose.call(this);
    };
    return AcGoodMatchView;
}(AcCommonView));
//# sourceMappingURL=AcGoodMatchView.js.map