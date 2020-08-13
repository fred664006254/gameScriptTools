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
 * 万物复苏
 * author ycg
 * date 2020.2.26
 * @class AcRecoveryView
 */
var AcRecoveryView = (function (_super) {
    __extends(AcRecoveryView, _super);
    function AcRecoveryView() {
        var _this = _super.call(this) || this;
        _this._timeBg = null;
        _this._acTimeTf = null;
        _this._freeDesc = null;
        _this._onceNeedContainer = null;
        _this._multiNeedContainer = null;
        _this._multiBtnInfo = null;
        _this._taskBtn = null;
        _this._toolNum = null;
        _this._toolNumIcon = null;
        _this._playMultiBtn = null;
        _this._isPlay = false;
        _this._rewardData = null;
        _this._proScrollview = null;
        _this._progressNode = null;
        _this._progressBar = null;
        _this._proOffW = 150;
        _this._progressMask = null;
        _this._scoreNum = null;
        _this._bigBoxRed = null;
        _this._proNum = null;
        _this._boxList = [];
        _this._lastProIndex = 0;
        _this._gameContainer = null;
        _this._gameList = [];
        _this._isFirstFreshGame = false;
        _this._moveCount1 = 0;
        _this._moveCount2 = 0;
        _this._moveCount3 = 0;
        _this._proLight = null;
        _this._gameTurn = null;
        _this._toolAddBtn = null;
        _this._toolAddRed = null;
        return _this;
    }
    AcRecoveryView.prototype.initView = function () {
        var _this = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACRECOVERY_LOTTERY, this.lotteryCallback, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACRECOVERY_ACHIEVE, this.getAchieveCallback, this);
        var bgName = ResourceManager.hasRes("acrecovery_bg-" + this.getTypeCode()) ? "acrecovery_bg-" + this.getTypeCode() : "acrecovery_bg-1";
        var bg = BaseBitmap.create(bgName);
        this.addChildToContainer(bg);
        bg.y = GameConfig.stageHeigth - bg.height;
        var infoBgStr = "ac_skinoflibai_infobg-1";
        var infoBg = BaseBitmap.create(infoBgStr);
        infoBg.setPosition(this.titleBg.x + this.titleBg.width / 2 - infoBg.width / 2, this.titleBg.y + this.titleBg.height - 7 - 65);
        this.addChildToContainer(infoBg);
        //活动时间
        var acDate = ComponentManager.getTextField(LanguageManager.getlocal("acRecoveryTime", [this.vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        acDate.setPosition(infoBg.x + 20, this.titleBg.y + this.titleBg.height + 3);
        this.addChildToContainer(acDate);
        //活动说明
        var acDescStr = LanguageManager.getlocal("acRecoveryInfo-" + this.getTypeCode());
        var acDesc = ComponentManager.getTextField(acDescStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        acDesc.setPosition(acDate.x, acDate.y + acDate.height + 6);
        acDesc.width = 600;
        acDesc.lineSpacing = 6;
        this.addChildToContainer(acDesc);
        //倒计时
        // this._timeBg = BaseBitmap.create("public_9_bg61");
        var timeBgName = ResourceManager.hasRes("acrecovery_timebg-" + this.getTypeCode()) ? "acrecovery_timebg-" + this.getTypeCode() : "acrecovery_timebg-1";
        this._timeBg = BaseBitmap.create(timeBgName);
        // this._timeBg.y = infoBg.y + infoBg.height - this._timeBg.height / 2 - 2;
        this.addChildToContainer(this._timeBg);
        this._acTimeTf = ComponentManager.getTextField(LanguageManager.getlocal("acRecoveryTimeCountDown", [this.vo.getCountDown()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        // this._timeBg.width = 60 + this._acTimeTf.width;
        this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 5;
        // this._acTimeTf.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._acTimeTf.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._acTimeTf.height / 2);
        this.addChildToContainer(this._acTimeTf);
        var infoBgOffY = infoBg.height - acDesc.height - acDate.height - 6 - this._timeBg.height - 3;
        var diffy = infoBgOffY > 0 ? infoBgOffY : 0;
        infoBg.y = this.titleBg.y + this.titleBg.height - 7 - diffy;
        this._timeBg.y = infoBg.y + infoBg.height - this._timeBg.height / 2 - 2;
        this._acTimeTf.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._acTimeTf.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._acTimeTf.height / 2);
        //bottom
        var bottomBg = BaseBitmap.create("arena_bottom");
        bottomBg.width = GameConfig.stageWidth;
        bottomBg.height = 140;
        bottomBg.setPosition(GameConfig.stageWidth / 2 - bottomBg.width / 2, GameConfig.stageHeigth - bottomBg.height);
        //progress Bg
        var progressBgStr = ResourceManager.hasRes("acrecovery_progressbg-" + this.getTypeCode()) ? "acrecovery_progressbg-" + this.getTypeCode() : "acrecovery_progressbg-1";
        var progressBg = BaseBitmap.create(progressBgStr);
        progressBg.setPosition(bottomBg.x + bottomBg.width / 2 - progressBg.width / 2, bottomBg.y - progressBg.height);
        //拉霸机
        var gameBgImg = ResourceManager.hasRes("acrecovery_gamebg-" + this.getTypeCode()) ? "acrecovery_gamebg-" + this.getTypeCode() : "acrecovery_gamebg-1";
        var gameBg = BaseBitmap.create(gameBgImg);
        this.addChildToContainer(gameBg);
        gameBg.setPosition(GameConfig.stageWidth - gameBg.width + 13, progressBg.y - gameBg.height - 90 - 40);
        // gameBg.setPosition(GameConfig.stageWidth - gameBg.width, infoBg.y + infoBg.height + 70);
        var gameTurnBgName = ResourceManager.hasRes("acrecovery_gameturn1-" + this.getTypeCode()) ? "acrecovery_gameturn1-" + this.getTypeCode() : "acrecovery_gameturn1-1";
        var gameTurnBg = BaseBitmap.create(gameTurnBgName);
        gameTurnBg.setPosition(gameBg.x, gameBg.y + 65);
        this.addChildToContainer(gameTurnBg);
        this._gameTurn = gameTurnBg;
        var gameContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(gameContainer);
        gameContainer.width = 288;
        gameContainer.height = 140;
        gameContainer.setPosition(gameBg.x + 48, gameBg.y + 45);
        var gameMask = new egret.Rectangle(0, 0, gameContainer.width, gameContainer.height);
        gameContainer.mask = gameMask;
        this._gameContainer = gameContainer;
        //衣装
        var skinCfg = Config.ServantskinCfg.getServantSkinItemById(this.cfg.superp);
        var boneName = null;
        if (skinCfg && skinCfg.bone) {
            boneName = skinCfg.bone + "_ske";
        }
        var servantSkin = null;
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            servantSkin = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
            servantSkin.setScale(0.85);
            servantSkin.x = GameConfig.stageWidth / 4 + 50;
            servantSkin.y = progressBg.y + 5;
        }
        else {
            servantSkin = BaseLoadBitmap.create(skinCfg.body);
            servantSkin.width = 406;
            servantSkin.height = 467;
            servantSkin.setScale(0.9);
            servantSkin.anchorOffsetY = servantSkin.height;
            servantSkin.anchorOffsetX = servantSkin.width / 2;
            servantSkin.x = servantSkin.width / 2;
            servantSkin.y = progressBg.y + 5;
        }
        this.addChildToContainer(servantSkin);
        this.addChildToContainer(bottomBg);
        this.addChildToContainer(progressBg);
        //衣装预览
        var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
        skinTxtEffect.width = 208;
        skinTxtEffect.height = 154;
        skinTxtEffect.setPosition(bottomBg.x + bottomBg.width / 4 - skinTxtEffect.width / 2, progressBg.y - 120);
        skinTxtEffect.blendMode = egret.BlendMode.ADD;
        this.addChildToContainer(skinTxtEffect);
        skinTxtEffect.playWithTime(-1);
        var skinTxt = BaseBitmap.create("acwealthcarpview_servantskintxt");
        skinTxt.anchorOffsetX = skinTxt.width / 2;
        skinTxt.anchorOffsetY = skinTxt.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect);
        this.addChildToContainer(skinTxt);
        egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
        var skinTxt1 = BaseBitmap.create("acwealthcarpview_servantskintxt");
        skinTxt1.anchorOffsetX = skinTxt1.width / 2;
        skinTxt1.anchorOffsetY = skinTxt1.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt1, skinTxtEffect);
        this.addChildToContainer(skinTxt1);
        skinTxt1.blendMode = egret.BlendMode.ADD;
        skinTxt1.alpha = 0;
        egret.Tween.get(skinTxt1, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        skinTxt1.addTouchTap(function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACRECOVERYDETAILPOPUPVIEW4, { aid: _this.aid, code: _this.code });
        }, this);
        //道具数量
        var toolNumBg = BaseBitmap.create("acrecovery_numbg");
        this.addChildToContainer(toolNumBg);
        // toolNumBg.setPosition(GameConfig.stageWidth/2 - toolNumBg.width/2 + 50, progressBg.y - toolNumBg.height - 7);
        toolNumBg.setPosition(gameBg.x + gameBg.width / 2 - toolNumBg.width / 2, gameBg.y + gameBg.height - toolNumBg.height - 58);
        var currToolNum = this.vo.getToolNum();
        var toolNumIconStr = ResourceManager.hasRes("acrecovery_smallitemicon-" + this.getTypeCode()) ? "acrecovery_smallitemicon-" + this.getTypeCode() : "acrecovery_smallitemicon-1";
        var toolNumIcon = BaseBitmap.create(toolNumIconStr);
        this.addChildToContainer(toolNumIcon);
        this._toolNumIcon = toolNumIcon;
        var toolNum = ComponentManager.getTextField("" + currToolNum, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.addChildToContainer(toolNum);
        toolNum.anchorOffsetX = toolNum.width / 2;
        this._toolNum = toolNum;
        // let toolNumW = toolNumIcon.width + toolNum.width;
        toolNumIcon.setPosition(toolNumBg.x + 65, toolNumBg.y + toolNumBg.height / 2 - toolNumIcon.height / 2);
        toolNum.setPosition(toolNumBg.x + toolNumBg.width / 2, toolNumBg.y + toolNumBg.height / 2 - toolNum.height / 2 + 4);
        var toolAddBtn = ComponentManager.getButton("mainui_btn1", "", function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACRECOVERYDETAILPOPUPVIEW, { aid: _this.aid, code: _this.code });
        }, this);
        toolAddBtn.setScale(0.9);
        toolAddBtn.setPosition(toolNumBg.x + toolNumBg.width - 65 - toolAddBtn.width * toolAddBtn.scaleX, toolNumBg.y + toolNumBg.height / 2 - toolAddBtn.height * toolAddBtn.scaleY / 2);
        this.addChildToContainer(toolAddBtn);
        this._toolAddBtn = toolAddBtn;
        //一次
        var onceBtn = ComponentManager.getButton(ButtonConst.BTN2_BIG_YELLOW, "", this.playBtnClick, this, [0]);
        onceBtn.setPosition(bottomBg.x + 60, bottomBg.y + bottomBg.height - onceBtn.height - 20);
        this.addChildToContainer(onceBtn);
        var onceBtnDesc = ComponentManager.getTextField(LanguageManager.getlocal("acRecoveryOnceBtnName-" + this.getTypeCode(), ["1"]), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_BLACK);
        onceBtnDesc.setPosition(onceBtn.x + onceBtn.width / 2 - onceBtnDesc.width / 2, onceBtn.y + onceBtn.height / 2 - onceBtnDesc.height / 2);
        this.addChildToContainer(onceBtnDesc);
        //免费
        var freeDesc = ComponentManager.getTextField(LanguageManager.getlocal("acRecoveryPlayFree"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
        freeDesc.setPosition(onceBtn.x + onceBtn.width / 2 - freeDesc.width / 2, onceBtn.y - 25);
        this.addChildToContainer(freeDesc);
        this._freeDesc = freeDesc;
        //一次
        var onceNeedContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(onceNeedContainer);
        this._onceNeedContainer = onceNeedContainer;
        //图标
        var onceIcon = BaseBitmap.create(toolNumIconStr);
        onceIcon.setScale(1);
        onceNeedContainer.addChild(onceIcon);
        var onceNeedDesc = ComponentManager.getTextField(LanguageManager.getlocal("acRecoveryNeedDesc-" + this.getTypeCode(), ["1"]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        onceNeedContainer.addChild(onceNeedDesc);
        onceNeedContainer.width = onceIcon.width * onceIcon.scaleX + onceNeedDesc.width;
        onceNeedDesc.setPosition(onceIcon.x + onceIcon.width * onceIcon.scaleX, onceIcon.y + onceIcon.height / 2 - onceNeedDesc.height / 2 + 3);
        onceNeedContainer.setPosition(onceBtn.x + onceBtn.width / 2 - onceNeedContainer.width / 2 - 2, onceBtn.y - onceIcon.height + 1);
        if (this.vo.isFree()) {
            freeDesc.visible = true;
            onceNeedContainer.visible = false;
        }
        else {
            freeDesc.visible = false;
            onceNeedContainer.visible = true;
        }
        //十次
        var playMultiBtn = ComponentManager.getButton(ButtonConst.BTN2_BIG_YELLOW, "", this.playBtnClick, this, [1]);
        playMultiBtn.setPosition(GameConfig.stageWidth - 60 - playMultiBtn.width, onceBtn.y);
        this.addChildToContainer(playMultiBtn);
        this._playMultiBtn = playMultiBtn;
        var multiToolNum = 10;
        if (currToolNum >= 1 && currToolNum < 10) {
            multiToolNum = currToolNum;
        }
        else if (currToolNum < 1) {
            multiToolNum = 10;
        }
        var multiBtnDesc = ComponentManager.getTextField(LanguageManager.getlocal("acRecoveryOnceBtnName-" + this.getTypeCode(), ["" + multiToolNum]), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_BLACK);
        multiBtnDesc.setPosition(playMultiBtn.x + playMultiBtn.width / 2 - multiBtnDesc.width / 2, playMultiBtn.y + playMultiBtn.height / 2 - multiBtnDesc.height / 2);
        this.addChildToContainer(multiBtnDesc);
        this._multiBtnInfo = multiBtnDesc;
        var multiNeedContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(multiNeedContainer);
        this._multiNeedContainer = multiNeedContainer;
        var multiGemIcon = BaseBitmap.create(toolNumIconStr);
        multiGemIcon.setScale(1);
        multiNeedContainer.addChild(multiGemIcon);
        multiGemIcon.name = "multiGemIcon";
        var multiNeedDesc = ComponentManager.getTextField(LanguageManager.getlocal("acRecoveryNeedDesc-" + this.getTypeCode(), ["" + multiToolNum]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        multiNeedContainer.addChild(multiNeedDesc);
        multiNeedDesc.setPosition(multiGemIcon.x + multiGemIcon.width * multiGemIcon.scaleX, multiGemIcon.y + multiGemIcon.height / 2 - multiNeedDesc.height / 2 + 6);
        multiNeedDesc.name = "multiNeedDesc";
        multiNeedContainer.width = multiGemIcon.width * multiGemIcon.scaleX + multiNeedDesc.width;
        multiNeedContainer.setPosition(playMultiBtn.x + playMultiBtn.width / 2 - multiNeedContainer.width / 2 - 2, playMultiBtn.y - multiGemIcon.height + 1);
        //活动任务
        var acTaskBtnImg = ResourceManager.hasRes("acrecovery_taskbtn-" + this.getTypeCode()) ? "acrecovery_taskbtn-" + this.getTypeCode() : "acrecovery_taskbtn-1";
        var acTaskBtn = ComponentManager.getButton(acTaskBtnImg, "", function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACRECOVERYDETAILPOPUPVIEW, { aid: _this.aid, code: _this.code });
        }, this);
        acTaskBtn.setPosition(GameConfig.stageWidth - acTaskBtn.width - 15, progressBg.y - acTaskBtn.height - 15);
        this.addChildToContainer(acTaskBtn);
        this._taskBtn = acTaskBtn;
        var toolAddRed = BaseBitmap.create("public_dot2");
        toolAddRed.setPosition(toolAddBtn.x + this._toolAddBtn.width * this._toolAddBtn.scaleX - toolAddRed.width / 2, toolAddBtn.y - toolAddRed.height / 2);
        this.addChildToContainer(toolAddRed);
        this._toolAddRed = toolAddRed;
        if (this.vo.isCangetAchieveReward() || this.vo.isCangetChargeReward()) {
            App.CommonUtil.addIconToBDOC(this._taskBtn);
            this._toolAddRed.visible = true;
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._taskBtn);
            this._toolAddRed.visible = false;
        }
        //进度条相关
        var progressNode = new BaseDisplayObjectContainer();
        progressNode.height = progressBg.height;
        this._progressNode = progressNode;
        var proRect = new egret.Rectangle(0, 0, progressBg.width - 170, progressNode.height);
        var proScrollView = ComponentManager.getScrollView(progressNode, proRect);
        proScrollView.setPosition(progressBg.x + 77, progressBg.y);
        this.addChildToContainer(proScrollView);
        proScrollView.horizontalScrollPolicy = "off";
        proScrollView.verticalScrollPolicy = "off";
        proScrollView.bounces = false;
        this._proScrollview = proScrollView;
        var data = this.cfg.getAchieveCfg();
        var sepIndex = this.vo.getProSeprateIndex();
        var proW = proScrollView.width - 25 + (data.length - sepIndex) * this._proOffW;
        var progressBar = ComponentManager.getProgressBar("progress22", "progress22_bg", proW);
        progressBar.setPosition(progressNode.x, progressNode.y + progressNode.height / 2 - progressBar.height / 2);
        progressNode.addChild(progressBar);
        this._progressBar = progressBar;
        var proLight = BaseBitmap.create("acwealthcomingview_progresslight");
        proLight.anchorOffsetX = proLight.width;
        proLight.anchorOffsetY = proLight.height / 2;
        progressNode.addChild(proLight);
        this._proLight = proLight;
        this._progressNode.width = proW + 25;
        //pro mask
        var progressMask = new egret.Rectangle(0, 0, proScrollView.width - 30, progressBar.height);
        progressBar.mask = progressMask;
        this._progressMask = progressMask;
        //进度数值
        var currScore = this.vo.getProcessNum();
        var currMaxScore = this.vo.getCurrMaxProNum();
        var maxScore = data[data.length - 1].needNum;
        var scoreStr = LanguageManager.getlocal("acRecoveryProcessNum-" + this.getTypeCode(), ["" + currScore, "" + currMaxScore]);
        if (currScore >= maxScore) {
            scoreStr = LanguageManager.getlocal("acRecoveryProcessNumTip-" + this.getTypeCode());
        }
        var proNum = ComponentManager.getTextField(scoreStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        proNum.setPosition(GameConfig.stageWidth / 2 - proNum.width / 2, progressBg.y + progressBg.height - proNum.height - 6);
        this.addChildToContainer(proNum);
        this._proNum = proNum;
        //分数
        var scoreBgImg = ResourceManager.hasRes("acrecovery_proscorebg-" + this.getTypeCode()) ? "acrecovery_proscorebg-" + this.getTypeCode() : "acrecovery_proscorebg-1";
        var scoreBg = BaseBitmap.create(scoreBgImg);
        scoreBg.setPosition(progressBg.x + 5, progressBg.y + progressBg.height / 2 - scoreBg.height / 2);
        this.addChildToContainer(scoreBg);
        var scoreNum = ComponentManager.getTextField(LanguageManager.getlocal("acRecoveryScoreNum-" + this.getTypeCode(), ["" + currScore]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        scoreNum.textAlign = TextFieldConst.ALIGH_CENTER;
        scoreNum.anchorOffsetX = scoreNum.width / 2;
        scoreNum.setPosition(scoreBg.x + scoreBg.width / 2, scoreBg.y + 20);
        this.addChildToContainer(scoreNum);
        this._scoreNum = scoreNum;
        //大宝箱
        var bigBoxImg = ResourceManager.hasRes("acrecovery_bigbox-" + this.getTypeCode()) ? "acrecovery_bigbox-" + this.getTypeCode() : "acrecovery_bigbox-1";
        var bigBox = BaseBitmap.create(bigBoxImg);
        bigBox.setPosition(GameConfig.stageWidth - bigBox.width - 10, progressBg.y);
        this.addChildToContainer(bigBox);
        bigBox.addTouchTap(function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACRECOVERYDETAILPOPUPVIEW2, { aid: _this.aid, code: _this.code });
        }, this);
        var boxTxt = BaseBitmap.create("acrecovery_scorereward_txt");
        boxTxt.setPosition(bigBox.x + bigBox.width / 2 - boxTxt.width / 2, bigBox.y + bigBox.height - boxTxt.height / 2 - 7);
        this.addChildToContainer(boxTxt);
        var bigBoxRed = BaseBitmap.create("public_dot2");
        bigBoxRed.setPosition(bigBox.x + bigBox.width - bigBoxRed.width, bigBox.y + bigBoxRed.height / 2);
        this.addChildToContainer(bigBoxRed);
        this._bigBoxRed = bigBoxRed;
        if (this.vo.isCangetAchieveReward()) {
            this._bigBoxRed.visible = true;
        }
        else {
            this._bigBoxRed.visible = false;
        }
        this.initBox();
        this.freshBox();
        this.freshProgressBar();
        this.showGameView();
    };
    AcRecoveryView.prototype.initBox = function () {
        var _this = this;
        this._boxList = [];
        var data = this.cfg.getAchieveCfg();
        var sepIndex = this.vo.getProSeprateIndex();
        var proSepW = this._proScrollview.width - 25;
        var _loop_1 = function (i) {
            var box = BaseBitmap.create("acrecovery_box-" + this_1.getTypeCode());
            box.anchorOffsetX = box.width / 2;
            box.anchorOffsetY = box.height / 2;
            if (i + 1 <= sepIndex) {
                var offX = proSepW * (data[i].needNum / data[sepIndex - 1].needNum);
                box.setPosition(this_1._progressBar.x + offX, this_1._progressBar.y + this_1._progressBar.height / 2);
            }
            else {
                box.setPosition(this_1._progressBar.x + proSepW + this_1._proOffW * (i + 1 - sepIndex), this_1._progressBar.y + this_1._progressBar.height / 2);
            }
            var boxLight = BaseBitmap.create("acrecovery_boxlight");
            boxLight.anchorOffsetX = boxLight.width / 2;
            boxLight.anchorOffsetY = boxLight.height / 2;
            boxLight.setPosition(box.x, box.y);
            boxLight.setScale(1.1);
            boxLight.visible = false;
            this_1._progressNode.addChild(boxLight);
            this_1._progressNode.addChild(box);
            box.addTouchTap(function () {
                ViewController.getInstance().openView(ViewConst.POPUP.ACRECOVERYDETAILPOPUPVIEW2, { aid: _this.aid, code: _this.code, id: data[i].id });
            }, this_1);
            egret.Tween.get(boxLight, { loop: true }).to({ rotation: 360 }, 2500);
            var boxData = { box: box, boxLight: boxLight };
            this_1._boxList.push(boxData);
        };
        var this_1 = this;
        for (var i = 0; i < data.length; i++) {
            _loop_1(i);
        }
    };
    AcRecoveryView.prototype.freshBox = function () {
        var data = this.cfg.getAchieveCfg();
        var sepIndex = this.vo.getProSeprateIndex();
        // let proSepW = this._proScrollview.width - 25;
        var currIndex = this.vo.getCurrProIndex();
        var currNum = this.vo.getProcessNum();
        var showIndex = -1;
        if (!currIndex && currIndex != 0) {
            showIndex = data.length;
        }
        else if (currIndex >= sepIndex) {
            showIndex = currIndex + 1;
        }
        for (var i = 0; i < this._boxList.length; i++) {
            var box = this._boxList[i].box;
            var boxLight = this._boxList[i].boxLight;
            box.rotation = 0;
            egret.Tween.removeTweens(box);
            if (this.vo.isGetAchieveRewardById(data[i].id)) {
                boxLight.visible = false;
            }
            else {
                if (currNum >= data[i].needNum) {
                    boxLight.visible = true;
                    egret.Tween.get(box, { loop: true }).to({ rotation: 3 }, 50).to({ rotation: -3 }, 100).to({ rotation: 0 }, 50);
                }
                else {
                    boxLight.visible = false;
                }
            }
            if (showIndex == -1) {
                if (i + 1 > sepIndex) {
                    box.visible = false;
                    boxLight.visible = false;
                }
            }
            else if (i + 1 > sepIndex) {
                if (showIndex >= i + 1) {
                    box.visible = true;
                }
                else {
                    box.visible = false;
                    boxLight.visible = false;
                }
            }
        }
    };
    AcRecoveryView.prototype.freshProgressBar = function () {
        var _this = this;
        var data = this.cfg.getAchieveCfg();
        var sepIndex = this.vo.getProSeprateIndex();
        var proSepW = this._proScrollview.width - 25;
        var currIndex = this.vo.getCurrProIndex();
        var currNum = this.vo.getProcessNum();
        var proMask = null;
        if (!currIndex && currIndex != 0) {
            this._progressBar.setPercentage(1);
            proMask = this._progressMask.setTo(0, 0, this._progressBar.width, this._progressBar.height);
        }
        else if (currIndex < sepIndex) {
            var offX = proSepW * (currNum / data[sepIndex - 1].needNum);
            this._progressBar.setPercentage(offX / this._progressBar.width);
            proMask = this._progressMask.setTo(0, 0, proSepW, this._progressBar.height);
        }
        else {
            var offX = proSepW + (currIndex - sepIndex) * this._proOffW + this._proOffW * ((currNum - data[currIndex - 1].needNum) / (data[currIndex].needNum - data[currIndex - 1].needNum));
            this._progressBar.setPercentage(offX / this._progressBar.width);
            var maskW = proSepW + (currIndex + 1 - sepIndex) * this._proOffW;
            proMask = this._progressMask.setTo(0, 0, maskW, this._progressBar.height);
        }
        this._progressBar.mask = proMask;
        this._proLight.setPosition(this._progressBar.x + this._progressBar.width * this._progressBar.getPercent() + 2, this._progressBar.y + this._progressBar.height / 2);
        //move progressBar
        if (this._lastProIndex && currIndex + 1 > sepIndex && currIndex != this._lastProIndex) {
            var moveX = (currIndex + 1 - sepIndex) * this._proOffW;
            var time = Math.abs(moveX - this._proScrollview.scrollLeft);
            this._lastProIndex = currIndex;
            egret.Tween.get(this._proScrollview).wait(40).to({ scrollLeft: moveX }, time).call(function () {
                egret.Tween.removeTweens(_this._proScrollview);
            });
        }
        else {
            if (!currIndex && currIndex != 0) {
                this._proScrollview.scrollLeft = (data.length - sepIndex) * this._proOffW;
            }
            else if (currIndex < sepIndex) {
                this._proScrollview.scrollLeft = 0;
            }
            else {
                var moveX = (currIndex + 1 - sepIndex) * this._proOffW;
                this._proScrollview.scrollLeft = moveX;
            }
        }
    };
    AcRecoveryView.prototype.playBtnClick = function (index) {
        App.LogUtil.log("playBtnclick " + index);
        if (!this.vo.isInActivity()) {
            this.vo.showAcEndTip();
            return;
        }
        if (this._isPlay) {
            return;
        }
        var toolNum = this.vo.getToolNum();
        var isTenplay = 0;
        if (index == 0) {
            if (!this.vo.isFree() && toolNum <= 0) {
                this.showRechargeTipView();
                return;
            }
        }
        else if (index == 1) {
            if (toolNum < 1) {
                this.showRechargeTipView();
                return;
            }
            isTenplay = 1;
            if (toolNum == 1) {
                isTenplay = 0;
            }
        }
        this._isPlay = true;
        this._lastProIndex = this.vo.getCurrProIndex();
        NetManager.request(NetRequestConst.REQUEST_ACRECOVERY_LOTTERY, { activeId: this.vo.aidAndCode, isBatch: isTenplay });
    };
    AcRecoveryView.prototype.lotteryCallback = function (evt) {
        if (!evt.data.ret) {
            this._isPlay = false;
            return;
        }
        this._rewardData = evt.data.data.data;
        this.showViewMask();
        this.freshGameView();
        this.showGameAni();
        // this.showRewardView();
    };
    //拉霸机
    AcRecoveryView.prototype.showGameView = function () {
        var rewardData = this.vo.getRandGameRewardByType(4);
        for (var i = 0; i < rewardData.length; i++) {
            var list = [];
            for (var k = 0; k < rewardData[i].length; k++) {
                var index = rewardData[i][k];
                var gameSpImg = ResourceManager.hasRes("acrecovery_kite" + index + "-" + this.getTypeCode()) ? "acrecovery_kite" + index + "-" + this.getTypeCode() : "acrecovery_kite1-1";
                var gameSp = BaseBitmap.create(gameSpImg);
                this._gameContainer.addChild(gameSp);
                gameSp.setPosition(5 + (gameSp.width + 21) * i, this._gameContainer.height / 2 - gameSp.height / 2 - this._gameContainer.height * k);
                var data = { sp: gameSp, index: index, spX: gameSp.x, spY: gameSp.y };
                list.push(data);
            }
            this._gameList.push(list);
        }
        this._isFirstFreshGame = true;
    };
    AcRecoveryView.prototype.freshGameView = function () {
        var shootSet = this._rewardData.shootSet;
        // let shootSet = 1;
        var rewardData = this.vo.getRandGameRewardByType(shootSet);
        for (var i = 0; i < rewardData.length; i++) {
            for (var k = 0; k < rewardData[i].length; k++) {
                var gameSp = this._gameList[i][k].sp;
                var posX = 5 + (gameSp.width + 21) * i;
                var posY = this._gameContainer.height / 2 - gameSp.height / 2 - this._gameContainer.height * k;
                var data = null;
                if (k == 0) {
                    if (this._isFirstFreshGame) {
                        var fristData = this._gameList[i][k];
                        data = { sp: gameSp, index: fristData.index, spX: posX, spY: posY };
                    }
                    else {
                        var lastData = this._gameList[i][rewardData.length - 1];
                        data = { sp: lastData.sp, index: lastData.index, spX: posX, spY: posY };
                    }
                }
                else {
                    var index = rewardData[i][k];
                    var gameSpImg = ResourceManager.hasRes("acrecovery_kite" + index + "-" + this.getTypeCode()) ? "acrecovery_kite" + index + "-" + this.getTypeCode() : "acrecovery_kite1-1";
                    var spData = this._gameList[i][k];
                    spData.sp.setRes(gameSpImg);
                    data = { sp: spData.sp, index: index, spX: posX, spY: posY };
                }
                this._gameList[i][k] = data;
            }
        }
        this._isFirstFreshGame = false;
    };
    AcRecoveryView.prototype.showGameAni = function () {
        var _this = this;
        this._moveCount1 = 0;
        this._moveCount2 = 0;
        this._moveCount3 = 0;
        var turnImg1 = ResourceManager.hasRes("acrecovery_gameturn1-" + this.getTypeCode()) ? "acrecovery_gameturn1-" + this.getTypeCode() : "acrecovery_gameturn1-1";
        var turnImg2 = ResourceManager.hasRes("acrecovery_gameturn2" + this.getTypeCode()) ? "acrecovery_gameturn2-" + this.getTypeCode() : "acrecovery_gameturn2-1";
        egret.Tween.get(this._gameTurn).call(function () {
            _this._gameTurn.setRes(turnImg2);
        }).wait(80).call(function () {
            _this._gameTurn.setRes(turnImg1);
            for (var i = 0; i < _this._gameList.length; i++) {
                _this.movePos(80, i + 1);
            }
        });
        // for (let i=0; i < this._gameList.length; i++){
        //     this.movePos(80, i+1);
        // }
    };
    AcRecoveryView.prototype.movePos = function (time, type) {
        var _this = this;
        var data = this._gameList[type - 1];
        var count = 0;
        if (type == 1) {
            this._moveCount1 += 1;
            count = this._moveCount1;
        }
        else if (type == 2) {
            this._moveCount2 += 1;
            count = this._moveCount2;
        }
        else if (type == 3) {
            this._moveCount3 += 1;
            count = this._moveCount3;
        }
        if (count > data.length * 2 - 1) {
            App.LogUtil.log("播放结束 " + count);
            if (type == 3) {
                this.showRewardView();
            }
            return;
        }
        var waitTime = 0;
        var isStop = false;
        if (count > data.length * 2 - 1 - 2 - type) {
            isStop = true;
            waitTime = 0;
        }
        var dataLength = data.length;
        var _loop_2 = function (i) {
            var sp = data[i].sp;
            var moveY = data[(i - (count % dataLength) + dataLength) % dataLength].spY;
            // count % dataLength - 1 == i
            if ((count - 1) % dataLength == i) {
                moveY = this_2._gameContainer.height + this_2._gameContainer.height / 2 - sp.height / 2;
            }
            if ((count - 2) % dataLength == i) {
                sp.visible = false;
            }
            else {
                sp.visible = true;
            }
            egret.Tween.get(sp).wait(waitTime).to({ y: moveY }, time).call(function () {
                if (i == data.length - 1) {
                    if (isStop) {
                        _this.movePos(count * 30, type);
                    }
                    else {
                        _this.movePos(time, type);
                    }
                }
            });
        };
        var this_2 = this;
        for (var i = 0; i < dataLength; i++) {
            _loop_2(i);
        }
    };
    AcRecoveryView.prototype.showRewardView = function () {
        var view = this;
        var rData = view._rewardData;
        if (rData) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rData.rewards, "isPlayAni": true, "callback": function () {
                    view._isPlay = false;
                    view.freshBox();
                    view.freshProgressBar();
                    view.hideViewMask();
                } });
            if (rData.replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": rData.replacerewards });
            }
        }
        else {
            view._isPlay = false;
            view.hideViewMask();
        }
    };
    AcRecoveryView.prototype.refreshView = function () {
        //道具数量
        var currToolNum = this.vo.getToolNum();
        this._toolNum.text = "" + currToolNum;
        // let toolNumW = this._toolNumIcon.width + this._toolNum.width;
        // this._toolNumIcon.x = GameConfig.stageWidth/2 - toolNumW/2;
        // this._toolNum.x = this._toolNumIcon.x + this._toolNumIcon.width;
        this._toolNum.anchorOffsetX = this._toolNum.width / 2;
        //once btn
        if (this.vo.isFree()) {
            this._freeDesc.visible = true;
            this._onceNeedContainer.visible = false;
        }
        else {
            this._freeDesc.visible = false;
            this._onceNeedContainer.visible = true;
        }
        //multi Btn
        var multiNum = 10;
        if (currToolNum >= 1 && currToolNum < 10) {
            multiNum = currToolNum;
        }
        else if (currToolNum < 1) {
            multiNum = 10;
        }
        var multiToolIcon = this._multiNeedContainer.getChildByName("multiGemIcon");
        var multiToolNum = this._multiNeedContainer.getChildByName("multiNeedDesc");
        multiToolNum.text = LanguageManager.getlocal("acRecoveryNeedDesc-" + this.getTypeCode(), ["" + multiNum]);
        this._multiNeedContainer.width = multiToolIcon.width * multiToolIcon.scaleX + multiToolNum.width;
        this._multiNeedContainer.x = this._playMultiBtn.x + this._playMultiBtn.width / 2 - this._multiNeedContainer.width / 2 - 2;
        this._multiBtnInfo.text = LanguageManager.getlocal("acRecoveryOnceBtnName-" + this.getTypeCode(), ["" + multiNum]);
        this._multiBtnInfo.x = this._playMultiBtn.x + this._playMultiBtn.width / 2 - this._multiBtnInfo.width / 2;
        //任务红点
        if (this.vo.isCangetAchieveReward() || this.vo.isCangetChargeReward()) {
            App.CommonUtil.addIconToBDOC(this._taskBtn);
            this._toolAddRed.visible = true;
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._taskBtn);
            this._toolAddRed.visible = false;
        }
        //进度条
        var currScore = this.vo.getProcessNum();
        var maxScore = this.vo.getCurrMaxProNum();
        this._scoreNum.text = LanguageManager.getlocal("acRecoveryScoreNum-" + this.getTypeCode(), ["" + currScore]);
        this._scoreNum.anchorOffsetX = this._scoreNum.width / 2;
        var data = this.cfg.getAchieveCfg();
        var achMaxScore = data[data.length - 1].needNum;
        var scoreStr = LanguageManager.getlocal("acRecoveryProcessNum-" + this.getTypeCode(), ["" + currScore, "" + maxScore]);
        if (currScore >= achMaxScore) {
            scoreStr = LanguageManager.getlocal("acRecoveryProcessNumTip-" + this.getTypeCode());
        }
        this._proNum.text = scoreStr;
        this._proNum.x = GameConfig.stageWidth / 2 - this._proNum.width / 2;
        //宝箱红点
        if (this.vo.isCangetAchieveReward()) {
            this._bigBoxRed.visible = true;
        }
        else {
            this._bigBoxRed.visible = false;
        }
    };
    AcRecoveryView.prototype.getAchieveCallback = function () {
        this.freshBox();
    };
    AcRecoveryView.prototype.showRechargeTipView = function () {
        // ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
        //     title:"acRecoveryRechargeTipTitle-"+this.getTypeCode(),
        //     msg:LanguageManager.getlocal("acRecoveryRechargeTipMsg-"+this.getTypeCode()),
        //     callback:() =>{
        //         ViewController.getInstance().openView(ViewConst.POPUP.ACRECOVERYDETAILPOPUPVIEW, {aid: this.aid, code: this.code});
        //     },
        //     handler:this,
        //     needCancel:true,
        // });
        ViewController.getInstance().openView(ViewConst.POPUP.ACRECOVERYDETAILPOPUPVIEW, { aid: this.aid, code: this.code });
    };
    //mask
    AcRecoveryView.prototype.showViewMask = function () {
        var touchPos = BaseBitmap.create("public_alphabg");
        touchPos.width = GameConfig.stageWidth;
        touchPos.height = GameConfig.stageHeigth;
        this.addChild(touchPos);
        touchPos.name = "viewMaskTouchPos";
        touchPos.touchEnabled = true;
    };
    AcRecoveryView.prototype.hideViewMask = function () {
        var touchPos = this.getChildByName("viewMaskTouchPos");
        if (touchPos) {
            touchPos.touchEnabled = false;
            touchPos.dispose();
        }
    };
    AcRecoveryView.prototype.tick = function () {
        this._acTimeTf.text = LanguageManager.getlocal("acRecoveryTimeCountDown", [this.vo.getCountDown()]);
        this._acTimeTf.x = this._timeBg.x + this._timeBg.width / 2 - this._acTimeTf.width / 2;
    };
    Object.defineProperty(AcRecoveryView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRecoveryView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcRecoveryView.prototype.getBgName = function () {
        // return ResourceManager.hasRes("acrecovery_bg-"+this.getTypeCode()) ? "acrecovery_bg-"+this.getTypeCode() : "acrecovery_bg-1";
        return null;
    };
    AcRecoveryView.prototype.getTitleBgName = function () {
        return ResourceManager.hasRes("acrecovery_titlebg-" + this.getTypeCode()) ? "acrecovery_titlebg-" + this.getTypeCode() : "acrecovery_titlebg-1";
    };
    AcRecoveryView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    AcRecoveryView.prototype.getTitleStr = function () {
        return "";
    };
    AcRecoveryView.prototype.getRuleInfo = function () {
        return "acRecoveryRuleInfo-" + this.getTypeCode();
    };
    AcRecoveryView.prototype.getProbablyInfo = function () {
        return "acRecoveryProbablyInfo-" + this.getTypeCode();
    };
    AcRecoveryView.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    AcRecoveryView.prototype.getResourceList = function () {
        var list = [];
        if (this.getTypeCode() != "1") {
            list = [
                "acrecoverycode1"
            ];
        }
        return _super.prototype.getResourceList.call(this).concat([
            "acwealthcomingview_progresslight", "progress22", "progress22_bg",
            "arena_bottom", "ac_skinoflibai_infobg-1", "acwealthcarpview_servantskintxt",
            "acrecovery_boxlight", "acrecovery_scorereward_txt", "acrecovery_numbg", "mainui_btn1", "public_dot2",
            "acrecovery_bg-" + this.getTypeCode(),
            "acrecovery_titlebg-" + this.getTypeCode(),
            "acrecoverycode" + this.getTypeCode(),
        ]).concat(list);
    };
    AcRecoveryView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACRECOVERY_LOTTERY, this.lotteryCallback, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACRECOVERY_ACHIEVE, this.getAchieveCallback, this);
        this._timeBg = null;
        this._acTimeTf = null;
        this._freeDesc = null;
        this._onceNeedContainer = null;
        this._multiNeedContainer = null;
        this._multiBtnInfo = null;
        this._taskBtn = null;
        this._toolNum = null;
        this._toolNumIcon = null;
        this._playMultiBtn = null;
        this._isPlay = false;
        this._rewardData = null;
        this._progressNode = null;
        this._progressBar = null;
        this._progressMask = null;
        this._proNum = null;
        this._scoreNum = null;
        this._bigBoxRed = null;
        this._boxList = [];
        this._lastProIndex = 0;
        this._gameContainer = null;
        this._gameList = [];
        this._isFirstFreshGame = false;
        this._moveCount1 = 0;
        this._moveCount2 = 0;
        this._moveCount3 = 0;
        this._proLight = null;
        this._gameTurn = null;
        this._toolAddBtn = null;
        this._toolAddRed = null;
        _super.prototype.dispose.call(this);
    };
    return AcRecoveryView;
}(AcCommonView));
__reflect(AcRecoveryView.prototype, "AcRecoveryView");
//# sourceMappingURL=AcRecoveryView.js.map