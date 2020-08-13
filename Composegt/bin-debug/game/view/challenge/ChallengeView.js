/**
 * author shaoliang
 * date 2017/9/26
 * @class ChallengeView
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
var ChallengeView = (function (_super) {
    __extends(ChallengeView, _super);
    function ChallengeView() {
        var _this = _super.call(this) || this;
        _this._topContiner = undefined;
        _this._middleContiner = undefined;
        _this._buttomContiner = undefined;
        _this._scrollContiner = undefined;
        /**
         * 六个关卡按钮
         */
        _this._attackBtnTab = [];
        /**
         * 已过关图片
         */
        _this._passIconTab = [];
        _this._lineIconTab = [];
        _this._soldierText = null;
        _this._expProgress = null;
        _this._bigChannel = 0;
        _this._middleChannel = 0;
        _this._officerIcon = null;
        _this._task10ClickTimes = 0;
        _this._autoFight = null;
        _this._mainTaskHandKey = null;
        return _this;
    }
    ChallengeView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            // this.getMiddlePic(),
            // "progress_type1_bg","progress_type1_yellow",
            "progress_type1_yellow2", "progress_type3_bg",
            "channel_bg",
            "channel_light",
            "channel_knife",
            "challenge_icon_force",
            "office_fnt",
            "itemview_daoju_bg01",
            // "mainui_newtopbg",
            // "mainui_fg",
            "playerview_pro7",
            "prisonview_1",
            "guide_hand",
            "challenge_bottombg"
        ]);
    };
    ChallengeView.prototype.getMiddlePic = function () {
        return "challenge_bg1"; // + (Api.challengeVoApi.getCurBigChannelId() % 4 + 1);
    };
    ChallengeView.prototype.getTitleStr = function () {
        return "challengeTitle" + Api.challengeVoApi.getCurBigChannelId();
    };
    ChallengeView.prototype.getDescStr = function () {
        return "challengeDesc" + Api.challengeVoApi.getCurBigChannelId();
    };
    // 规则说明内容
    ChallengeView.prototype.getRuleInfo = function () {
        return "challengeInfo";
    };
    ChallengeView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_RESCHANGE_REFRESH_UI, this.refresh, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT, this.guideMsg, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_CLOSE_CHALLENGE, this.hide, this);
        Api.mainTaskVoApi.isKeepGuide = true;
        Api.mainTaskVoApi.checkShowGuide();
        this._bigChannel = Api.challengeVoApi.getCurBigChannelId();
        this._middleChannel = Api.challengeVoApi.getCurMiddleChannelId();
        this.container.y = this.getTitleButtomY();
        this._scrollContiner = new BaseDisplayObjectContainer();
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, GameConfig.stageWidth, (GameConfig.stageHeigth - this.getTitleButtomY() - 20));
        // let scrollView = ComponentManager.getScrollView(this._scrollContiner,rect);
        // this.addChildToContainer(scrollView);
        //不拖动
        this.addChildToContainer(this._scrollContiner);
        this._topContiner = new BaseDisplayObjectContainer();
        this._scrollContiner.addChild(this._topContiner);
        this.initTop();
        this.initMiddle();
        this.initButtom();
        this.tick();
        if (Api.rookieVoApi.isInGuiding) {
            // Api.rookieVoApi.checkNextStep();
        }
        this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(this.container, this._middleContiner.x + this._attackBtnTab[this._middleChannel - 1].x + this._attackBtnTab[this._middleChannel - 1].width / 2, this._middleContiner.y + this._attackBtnTab[this._middleChannel - 1].y + this._attackBtnTab[this._middleChannel - 1].height / 2, (this._autoFight ? [this._attackBtnTab[this._middleChannel - 1], this._autoFight] : [this._attackBtnTab[this._middleChannel - 1]]), // 如果有一键推关按钮，那么一键推关点了之后，主线任务的手也要消失
        105, true, function () {
            var curLv = Api.playerVoApi.getPlayerLevel();
            var nextLvCfg = Config.LevelCfg.getCfgByLevel((curLv + 1).toString());
            if (!nextLvCfg) {
                //已升到最大官阶
                return false;
            }
            else if (Api.playerVoApi.getPlayerExp() < nextLvCfg.exp) {
                return true;
            }
            else {
                return false;
            }
        }, this);
    };
    //收到引导的消息
    ChallengeView.prototype.guideMsg = function (event) {
        // let guideCfg = event.data.guideCfg;
        // if(guideCfg&&guideCfg.otherId == "servant_4")
        // {
        // 	ViewController.getInstance().openView(ViewConst.BASE.SERVANTGETVIEW,["1001"]);
        // }
        // else if(guideCfg&&guideCfg.otherId == "servant2_2")
        // {
        // 	ViewController.getInstance().openView(ViewConst.BASE.SERVANTGETVIEW,["1004"]);
        // }
        // else if(guideCfg&&guideCfg.otherId == "servant3_2")
        // {
        // 	ViewController.getInstance().openView(ViewConst.BASE.SERVANTGETVIEW,["1005"]);
        // }
        // else if(guideCfg&&guideCfg.otherId == "servant4_4")
        // {
        // 	ViewController.getInstance().openView(ViewConst.BASE.SERVANTGETVIEW,["1002"]);
        // }
        // else if(guideCfg&&guideCfg.otherId == "servant5_2")
        // {
        // 	ViewController.getInstance().openView(ViewConst.BASE.SERVANTGETVIEW,["1003"]);
        // }
        // else if(guideCfg&&guideCfg.otherId == "levy_1")
        // {
        // 	this.hide();
        // }
    };
    ChallengeView.prototype.initTop = function () {
        var topinfobg = BaseBitmap.create("mainui_newtopbg");
        this._topContiner.addChild(topinfobg);
        // let headBg:BaseBitmap=BaseBitmap.create("mainui_headbg");
        // headBg.setPosition(60,App.CommonUtil.getCenterY(topinfobg,headBg,false)+1);
        // headBg.name = "headBg";
        // this._topContiner.addChild(headBg);
        this._circleHead = Api.playerVoApi.getPlayerCircleHead(Api.playerVoApi.getPlayePicId());
        // this._circleHead.setPosition(16.5, 3.5);
        this._circleHead.setPosition(4, 1);
        // this._circleHead.setScale(1.15);
        this._topContiner.addChild(this._circleHead);
        this._circleHead.addTouchTap(this.roleHeadClickHandler, this);
        //官职
        this._officerIcon = ComponentManager.getBitmapText(Api.playerVoApi.getPlayerMinLevelStr(), "office_fnt");
        this._officerIcon.setScale(0.85);
        this._officerIcon.setPosition(this._circleHead.x + this._circleHead.width * this._circleHead.scaleX / 2 - this._officerIcon.width * this._officerIcon.scaleX / 2 + 3, this._circleHead.y + 83);
        this._topContiner.addChild(this._officerIcon);
        //权势
        var powerBg = BaseBitmap.create("public_hb_bg01");
        powerBg.setPosition(140, 11);
        // powerBg.width = 172;
        this._topContiner.addChild(powerBg);
        var powerIcon = BaseBitmap.create("public_icon0");
        powerIcon.setPosition(powerBg.x, powerBg.y - 11);
        this._topContiner.addChild(powerIcon);
        var powerValueText = ComponentManager.getTextField(App.StringUtil.changeIntToText(Api.playerVoApi.getPlayerPower()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        powerValueText.setPosition(powerBg.x + 50, powerBg.y + powerBg.height / 2 - powerValueText.height / 2);
        this._topContiner.addChild(powerValueText);
        //武力 
        var focreBg = BaseBitmap.create("public_hb_bg01");
        focreBg.setPosition(powerBg.x + 170, powerBg.y);
        // focreBg.width = powerBg.width;
        this._topContiner.addChild(focreBg);
        var resImg1 = BaseBitmap.create("challenge_icon_force");
        resImg1.setPosition(focreBg.x, focreBg.y - 11);
        this._topContiner.addChild(resImg1);
        var attText = ComponentManager.getTextField(App.StringUtil.changeIntToText(Api.playerVoApi.getAtk()), TextFieldConst.FONTSIZE_CONTENT_SMALL, powerValueText.textColor);
        attText.setPosition(focreBg.x + 50, focreBg.y + focreBg.height / 2 - attText.height / 2);
        this._topContiner.addChild(attText);
        //士兵数量
        var soldierBg = BaseBitmap.create("public_hb_bg01");
        soldierBg.setPosition(focreBg.x + 170, focreBg.y);
        // soldierBg.width = powerBg.width;
        this._topContiner.addChild(soldierBg);
        var resImg3 = BaseBitmap.create("public_icon4");
        resImg3.setPosition(soldierBg.x, soldierBg.y - 11);
        this._topContiner.addChild(resImg3);
        this._soldierText = ComponentManager.getTextField(App.StringUtil.changeIntToText(Api.playerVoApi.getSoldier()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._soldierText.setPosition(soldierBg.x + 50, soldierBg.y + soldierBg.height / 2 - this._soldierText.height / 2);
        this._topContiner.addChild(this._soldierText);
        //政绩
        var resImg2 = BaseBitmap.create("playerview_pro7");
        resImg2.setPosition(powerBg.x, powerBg.y + 49);
        resImg2.setScale(0.6);
        this._topContiner.addChild(resImg2);
        // "progress_type1_yellow2","progress_type3_bg",
        this._expProgress = ComponentManager.getProgressBar("progress_type1_yellow2", "progress_type3_bg", 420);
        this._expProgress.setPosition(resImg2.x + 55, resImg2.y + resImg2.height / 2 - this._expProgress.height / 2 - 10);
        this._expProgress.setTextSize(18);
        this._topContiner.addChild(this._expProgress);
        this.resetExpProgress();
        this.refreshUpgradeClip();
    };
    ChallengeView.prototype.roleHeadClickHandler = function () {
        // ViewController.getInstance().openView(ViewConst.COMMON.PLAYERVIEW);
        PlayerBottomUI.getInstance().show();
    };
    ChallengeView.prototype.resetExpProgress = function () {
        var exp = Api.playerVoApi.getPlayerExp();
        var curMinLv = Api.playerVoApi.getPlayerMinLevelId();
        if (curMinLv < Config.MinlevelCfg.getMaxMinLevel()) {
            var nextExp = Config.MinlevelCfg.getCfgByMinLevelId(curMinLv + 1).exp;
            this._expProgress.setText(LanguageManager.getlocal("playerview_exp") + exp.toString() + "/" + nextExp.toString());
            this._expProgress.setPercentage(exp / nextExp);
        }
        else {
            this._expProgress.setText(LanguageManager.getlocal("promotion_topLevel"));
            this._expProgress.setPercentage(1);
        }
        this._soldierText.text = App.StringUtil.changeIntToText(Api.playerVoApi.getSoldier());
    };
    ChallengeView.prototype.attAllClickHandler = function () {
        if (!Api.challengeVoApi.getChannelIslock()) {
            App.CommonUtil.showTip(Api.challengeVoApi.getChannelLockStr());
            return;
        }
        if (Api.playerVoApi.getSoldier() <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("challengeCannotAtt"));
            return;
        }
        if (Api.challengeVoApi.getIsBossChannel()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("challengeAutoFightForbidden"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.CHALLENGEAUTOPOPUPVIEW, { f: this.callbackHandler, o: this });
    };
    //一键推关回调
    ChallengeView.prototype.callbackHandler = function () {
        this.resetExpProgress();
        this._bigChannel = Api.challengeVoApi.getCurBigChannelId();
        this._attackBtnTab[this._middleChannel - 1].hiddenKnifeAnim();
        this._middleChannel = Api.challengeVoApi.getCurMiddleChannelId();
        ;
        for (var i = 0; i < 6; i++) {
            if (this._middleChannel - 1 == i) {
                this._attackBtnTab[i].visible = true;
            }
            else {
                this._attackBtnTab[i].visible = false;
            }
            if (this._lineIconTab[i]) {
                this._lineIconTab[i].visible = false;
            }
            if (this._middleChannel - 1 > i) {
                if (this._passIconTab[i]) {
                    this._passIconTab[i].visible = true;
                }
                else {
                    var tempBtn = this._attackBtnTab[i];
                    var passTip = BaseBitmap.create("challenge_pass");
                    passTip.setPosition(tempBtn.x, tempBtn.y);
                    this._middleContiner.addChild(passTip);
                    this._passIconTab.push(passTip);
                }
            }
        }
        // for (let i:number=0; i<5; i++) {
        // 	if (this._middleChannel-1 > i) {
        // 		this._lineIconTab[i].visible = true;
        // 		if (this._middleChannel -2 > i) {
        // 			App.DisplayUtil.changeToGray(this._lineIconTab[i]);
        // 		}
        // 	}
        // }
        for (var i = 0; i < 6; i++) {
            if (this._passIconTab[i]) {
                if (this._lineIconTab[i]) {
                    this._lineIconTab[i].visible = this._passIconTab[i].visible;
                    if (this._lineIconTab[i - 1]) {
                        App.DisplayUtil.changeToGray(this._lineIconTab[i - 1]);
                    }
                }
            }
        }
        this._attackBtnTab[this._middleChannel - 1].showClickable();
        this.refreshUpgradeClip();
    };
    ChallengeView.prototype.initMiddle = function () {
        // this._middleContiner.dispose();
        // this._attackBtnTab.length = 0;
        this._middleContiner = new BaseDisplayObjectContainer();
        this._middleContiner.y = 105;
        this._scrollContiner.addChild(this._middleContiner);
        this._scrollContiner.swapChildren(this._topContiner, this._middleContiner);
        var middleBg = BaseLoadBitmap.create(this.getMiddlePic());
        middleBg.setPosition((GameConfig.stageWidth - 640) / 2, (GameConfig.stageHeigth - 195 - this._middleContiner.y - 1136) / 2 - 20);
        this._middleContiner.addChild(middleBg);
        // if (Api.switchVoApi.checkAutoMopup()) 
        // {
        //微信绑死  月卡解锁一键推关,且去掉官咖跳过功能
        var cuChannel = Api.challengeVoApi.getCurChannelId();
        if (cuChannel > 154) {
            if (PlatformManager.checkIsWxCfg()) {
                var needVip = Api.vipVoApi.getNeedVip("challengeAutoFight");
                var isSpecialCondi = false;
                //2020年2月12后删去月卡部分代码
                if (PlatformManager.checkIsWxSp() && Api.shopVoApi.ifBuyMonthCard() && Api.shopVoApi.getMonthcardet()) {
                    if (Api.shopVoApi.getMonthcardet() <= 1581436800) {
                        isSpecialCondi = true;
                    }
                }
                if ((PlatformManager.checkIsWxSp() && Api.playerVoApi.getPlayerID() == 1000696)) {
                    isSpecialCondi = true;
                }
                if (isSpecialCondi || (needVip && Api.playerVoApi.getPlayerVipLevel() >= needVip)) {
                    var autoFight = ComponentManager.getButton("btn_challenge_auto", null, this.attAllClickHandler, this);
                    autoFight.setPosition(GameConfig.stageWidth - autoFight.width - 20, GameConfig.stageHeigth - 455 - autoFight.height / 2 - 20);
                    this._middleContiner.addChild(autoFight);
                    this._autoFight = autoFight;
                }
                else {
                    var reachText = ComponentManager.getTextField(LanguageManager.getlocal("challengeAutoFightTip_wx", [needVip + ""]), TextFieldConst.FONTSIZE_CONTENT_COMMON);
                    reachText.setPosition(GameConfig.stageWidth - reachText.width - 20, GameConfig.stageHeigth - 403 - reachText.height / 2 - 10 - 20);
                    var blackBgRect = BaseBitmap.create("public_itemtipbg");
                    blackBgRect.scaleX = -1;
                    blackBgRect.width = reachText.width + 55;
                    blackBgRect.height = 36;
                    blackBgRect.x = GameConfig.stageWidth;
                    blackBgRect.y = reachText.y - 10;
                    this._middleContiner.addChild(blackBgRect);
                    this._middleContiner.addChild(reachText);
                }
            }
            else {
                var needVip = Api.vipVoApi.getNeedVip("challengeAutoFight");
                if (needVip && Api.playerVoApi.getPlayerVipLevel() < needVip) {
                    var reachText = ComponentManager.getTextField(LanguageManager.getlocal("challengeAutoFightTip", [needVip + ""]), TextFieldConst.FONTSIZE_CONTENT_COMMON);
                    reachText.setPosition(GameConfig.stageWidth - reachText.width - 20, GameConfig.stageHeigth - 403 - reachText.height / 2 - 10 - 20);
                    var blackBgRect = BaseBitmap.create("public_itemtipbg");
                    blackBgRect.scaleX = -1;
                    blackBgRect.width = reachText.width + 55;
                    blackBgRect.height = 36;
                    blackBgRect.x = GameConfig.stageWidth;
                    blackBgRect.y = reachText.y - 10;
                    this._middleContiner.addChild(blackBgRect);
                    this._middleContiner.addChild(reachText);
                }
                else {
                    var autoFight = ComponentManager.getButton("btn_challenge_auto", null, this.attAllClickHandler, this);
                    autoFight.setPosition(GameConfig.stageWidth - autoFight.width - 20, GameConfig.stageHeigth - 455 - autoFight.height / 2 - 20);
                    this._middleContiner.addChild(autoFight);
                    this._autoFight = autoFight;
                }
            }
        }
        // }
        var posTab = [[150 + 20, 0 + 20], [376 + 20, 90 + 20], [150 + 20, 180 + 20], [376 + 20, 270 + 20], [150 + 20, 360 + 20], [376 + 20, 450 + 5]];
        // let posTab:number[][] = [[150,0],[376,90],[154,180],[380,270],[149,360],[377,450]];
        var curChannel = Api.challengeVoApi.getCurChannelId();
        var curNum = Api.challengeVoApi.getCurMiddleChannelId() - 1;
        var middleNum = ChallengeCfg.getChallengeCfgById(curChannel).middleNum;
        if (!middleNum) {
            middleNum = 6;
        }
        var offsetY = GameConfig.stageHeigth / 2 - 195 + 160;
        for (var i = 0; i < middleNum; i++) {
            if (i <= 4) {
                var arrowIcon = BaseBitmap.create("challenge_arrow");
                arrowIcon.anchorOffsetX = arrowIcon.width / 2;
                arrowIcon.anchorOffsetY = arrowIcon.height / 2;
                arrowIcon.x = posTab[i][0] / 2 + posTab[i + 1][0] / 2 + 50;
                arrowIcon.y = offsetY - posTab[i][1] / 2 - posTab[i + 1][1] / 2 + 50;
                // arrowIcon.x = posTab[i][0]/2 + posTab[i+1][0]/2 + 65;
                // arrowIcon.y = offsetY - posTab[i][1]/2 - posTab[i+1][1]/2 + 65;
                if (i % 2 == 1) {
                    arrowIcon.scaleX = -1;
                    arrowIcon.rotation = 25;
                }
                else {
                    arrowIcon.rotation = -25;
                }
                if (curNum - 1 < i) {
                    arrowIcon.visible = false;
                }
                else if (curNum - 1 > i) {
                    App.DisplayUtil.changeToGray(arrowIcon);
                }
                else {
                }
                this._middleContiner.addChild(arrowIcon);
                this._lineIconTab.push(arrowIcon);
            }
            var attButtom = new ChallengeButton();
            attButtom.initButton(this.onClickAttack, this, i, curChannel);
            attButtom.setPosition(posTab[i][0] + 50 - 64, offsetY - posTab[i][1] + 50 - 64);
            this._attackBtnTab.push(attButtom);
            this._middleContiner.addChild(attButtom);
            if (curNum > i) {
                var passTip = BaseBitmap.create("challenge_pass");
                passTip.setPosition(posTab[i][0], offsetY - posTab[i][1]);
                this._middleContiner.addChild(passTip);
                this._passIconTab.push(passTip);
                attButtom.visible = false;
            }
        }
    };
    ChallengeView.prototype.initButtom = function () {
        // this._buttomContiner.dispose();
        this._buttomContiner = new BaseDisplayObjectContainer();
        // this._buttomContiner.y =  GameConfig.stageHeigth - 195 - this.getTitleButtomY();
        this._scrollContiner.addChild(this._buttomContiner);
        //challenge_bottombg
        // let buttomBg1:BaseBitmap=BaseBitmap.create("itemview_daoju_bg01");//itemview_daoju_bg01
        // let buttomBg2:BaseBitmap=BaseBitmap.create("itemview_daoju_bg01");
        // buttomBg2.scaleX = -1;
        // this._buttomContiner.width = GameConfig.stageWidth;
        // this._buttomContiner.height = buttomBg1.height;
        // buttomBg1.x = 0;
        // buttomBg1.y = 0;
        // buttomBg2.x = this._buttomContiner.width;
        // buttomBg2.y = 0;
        // this._buttomContiner.addChild(buttomBg1);
        // this._buttomContiner.addChild(buttomBg2);
        var buttomBg1 = BaseBitmap.create("challenge_bottombg");
        this._buttomContiner.width = GameConfig.stageWidth;
        this._buttomContiner.height = buttomBg1.height;
        this._buttomContiner.addChild(buttomBg1);
        this._buttomContiner.y = this.viewBg.height - this._buttomContiner.height - 69;
        this.titleTF.text = LanguageManager.getlocal(this.getTitleStr());
        var titleBg = BaseBitmap.create("public_ts_bg01");
        this._buttomContiner.addChild(titleBg);
        var titleText = ComponentManager.getTextField(Api.challengeVoApi.getCurBigChannelId().toString() + ". " + LanguageManager.getlocal(this.getTitleStr()), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_BROWN_NEW);
        titleText.setPosition(GameConfig.stageWidth / 2 - titleText.width / 2, 35);
        this._buttomContiner.addChild(titleText);
        this.titleTF.text = titleText.text;
        this.titleTF.x = GameConfig.stageWidth / 2 - this.titleTF.width / 2;
        titleBg.width = titleText.width + 150;
        titleBg.x = titleText.x + titleText.width / 2 - titleBg.width / 2;
        titleBg.y = titleText.y + titleText.height / 2 - titleBg.height / 2;
        // let leftLine = BaseBitmap.create("public_v_huawen01");
        // leftLine.x = this.titleTF.x - 20 - leftLine.width;
        // leftLine.y = this.titleTF.y + this.titleTF.height/2 - leftLine.height/2 + 3;
        // let rightLine = BaseBitmap.create("public_v_huawen01");
        // rightLine.scaleX = -1;
        // rightLine.x = this.titleTF.x + this.titleTF.width + 20 + rightLine.width;
        // rightLine.y = this.titleTF.y + this.titleTF.height/2 - rightLine.height/2 + 3;
        // this._buttomContiner.addChild(leftLine);
        // this._buttomContiner.addChild(rightLine);
        // let descBg = BaseBitmap.create("public_9v_bg04");//public_9v_bg04  public_9v_bg09
        // descBg.width = this._buttomContiner.width - 100;
        // descBg.height = 120;
        // descBg.x = this._buttomContiner.width / 2 - descBg.width / 2;
        // descBg.y = 60;
        // this._buttomContiner.addChild(descBg);
        var descText = ComponentManager.getTextField(LanguageManager.getlocal(this.getDescStr()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
        descText.width = 540; //descBg.width - 40;
        descText.lineSpacing = 6;
        descText.x = this.viewBg.width / 2 - descText.width / 2; //descBg.x + descBg.width/2 - descText.width/2;
        descText.y = buttomBg1.y + 95;
        this._buttomContiner.addChild(descText);
    };
    ChallengeView.prototype.onClickAttack = function () {
        if (!Api.challengeVoApi.getChannelIslock()) {
            App.CommonUtil.showTip(Api.challengeVoApi.getChannelLockStr());
            return;
        }
        Api.rookieVoApi.checkNextStep();
        this._task10ClickTimes++;
        for (var k8 in this._attackBtnTab) {
            this._attackBtnTab[k8].visible = false;
        }
        for (var k9 in this._passIconTab) {
            this._passIconTab[k9].visible = false;
        }
        for (var k10 in this._lineIconTab) {
            this._lineIconTab[k10].visible = false;
        }
        var challengeConfig = ChallengeCfg.getChallengeCfgById(Api.challengeVoApi.getCurChannelId());
        if (challengeConfig.dialogue) {
            var key = LocalStorageConst.LOCAL_CHALLENGE_STORY + "_cId_" + Api.challengeVoApi.getCurChannelId() + "_zId_" + ServerCfg.selectServer.zid + "_pId_" + Api.playerVoApi.getPlayerID();
            var value = LocalStorageManager.get(key);
            // value=null;
            if (value) {
                this.realAttackChannel();
            }
            else {
                ViewController.getInstance().openView(ViewConst.BASE.CHALLENGESTORY, { f: this.realAttackChannel, o: this, dialogue: challengeConfig.dialogue });
                LocalStorageManager.set(key, "1");
            }
        }
        else {
            this.realAttackChannel();
        }
    };
    ChallengeView.prototype.realAttackChannel = function () {
        if (Api.challengeVoApi.getIsBossChannel() == true) {
            ViewController.getInstance().openView(ViewConst.BATTLE.BOSSBATTLEVIEW, { f: this.fightCallback, o: this });
        }
        else {
            if (Api.challengeVoApi.getCurChannelId() == 11 && Api.otherInfoVoApi.checkIsNeverUseMiaosha()) {
                Api.rookieVoApi._waitingGuide.length = 0;
                Api.rookieVoApi.curGuideKey = "aotoPush";
                Api.rookieVoApi.insertWaitingGuide({ "idx": "aotoPush_1" });
                Api.rookieVoApi.checkWaitingGuide();
            }
            ViewController.getInstance().openView(ViewConst.BATTLE.FIGHTVIEW, { f: this.fightCallback, o: this });
        }
    };
    ChallengeView.prototype.fightCallback = function () {
        var lastChannelId = Api.challengeVoApi.getHasPassId();
        var config = ChallengeCfg.getChallengeCfgById(lastChannelId);
        if (lastChannelId && config.unlockMapGroup && !config.unlockPrison) {
            this.hide();
            return;
        }
        this.refreshInfo();
    };
    ChallengeView.prototype.refreshInfo = function () {
        if (this._expProgress == null) {
            return;
        }
        var openViewMessage = Api.challengeVoApi.getOpenViewMessage();
        if (openViewMessage) {
            this.hide();
            return App.CommonUtil.showTip(openViewMessage);
        }
        this.resetExpProgress();
        var newBigChannel = Api.challengeVoApi.getCurBigChannelId();
        var newMiddleChannel = Api.challengeVoApi.getCurMiddleChannelId();
        for (var i = 0; i < 6; i++) {
            if (this._middleChannel - 1 == i && this._attackBtnTab[i]) {
                this._attackBtnTab[i].visible = true;
            }
        }
        for (var k9 in this._passIconTab) {
            this._passIconTab[k9].visible = true;
        }
        // for (let i:number=0; i<5; i++) {
        // 	if (this._middleChannel-1 > i) {
        // 		this._lineIconTab[i].visible = true;
        // 	}
        // }
        for (var i = 0; i < 6; i++) {
            if (this._passIconTab[i]) {
                if (this._lineIconTab[i]) {
                    this._lineIconTab[i].visible = this._passIconTab[i].visible;
                    if (this._lineIconTab[i - 1]) {
                        App.DisplayUtil.changeToGray(this._lineIconTab[i - 1]);
                    }
                }
            }
        }
        if (this._bigChannel != newBigChannel) {
            this._middleContiner.dispose();
            this._passIconTab = [];
            this._attackBtnTab = [];
            this._lineIconTab = [];
            this.initMiddle();
            this._buttomContiner.dispose();
            this.initButtom();
            this._bigChannel = newBigChannel;
            this._middleChannel = newMiddleChannel;
        }
        else if (this._middleChannel != newMiddleChannel) {
            this.showPassAnim();
        }
        this.refreshUpgradeClip();
    };
    ChallengeView.prototype.showPassAnim = function () {
        var tempBtn = this._attackBtnTab[this._middleChannel - 1];
        tempBtn.visible = false;
        var arrowIcon = this._lineIconTab[this._middleChannel - 2];
        if (arrowIcon) {
            App.DisplayUtil.changeToGray(arrowIcon);
        }
        // let tempLight:BaseBitmap = BaseBitmap.create("channel_light");
        var passTip = BaseBitmap.create("challenge_pass");
        // let realPos:egret.Point = egret.Point.create(tempBtn.x + tempLight.width/2 - passTip.width/2 + 8, tempBtn.y+(tempLight.height - passTip.height)/2);
        var realPos = egret.Point.create(tempBtn.x, tempBtn.y);
        passTip.scaleX = 2;
        passTip.scaleY = 2;
        // passTip.setPosition(realPos.x - passTip.width/2 , realPos.y - passTip.height/2);
        passTip.setPosition(realPos.x - passTip.width / 2 + 64 - 50, realPos.y - passTip.height / 2 + 64 - 50);
        this._middleContiner.addChild(passTip);
        this._passIconTab.push(passTip);
        egret.Tween.get(passTip).to({ x: realPos.x + 64 - 50, y: realPos.y + 64 - 50, scaleX: 1, scaleY: 1 }, 800).call(this.setButtonStatus, this);
    };
    ChallengeView.prototype.setButtonStatus = function () {
        var arrowIcon = this._lineIconTab[this._middleChannel - 1];
        if (arrowIcon && this._passIconTab[this._middleChannel - 1] && this._passIconTab[this._middleChannel - 1].visible) {
            arrowIcon.visible = true;
        }
        var newMiddleChannel = Api.challengeVoApi.getCurMiddleChannelId();
        this._attackBtnTab[this._middleChannel - 1].hiddenKnifeAnim();
        this._attackBtnTab[newMiddleChannel - 1].showClickable();
        this._middleChannel = Api.challengeVoApi.getCurMiddleChannelId();
        ;
    };
    ChallengeView.prototype.getButtomLineBg = function () {
        return null;
    };
    ChallengeView.prototype.refreshUpgradeClip = function () {
        var curMinLv = Api.playerVoApi.getPlayerMinLevelId();
        var nextLvCfg = Config.MinlevelCfg.getCfgByMinLevelId(curMinLv + 1);
        if ((nextLvCfg && Api.playerVoApi.getPlayerExp() >= nextLvCfg.exp && Api.mainTaskVoApi.getHistoryMaxLevyRate() >= nextLvCfg.needRate) || Api.practiceVoApi.isShowRedForPBottom()) {
            if (!this._upgradeClip) {
                this._upgradeClip = ComponentManager.getCustomMovieClip("mainui_fg", 10, 100);
                this._upgradeClip.x = -6;
                this._upgradeClip.y = -9;
                this._circleHead.addChild(this._upgradeClip);
                this._circleHead.swapChildren(this._circleHead.getChildByName("myHead"), this._upgradeClip);
                this._upgradeClip.playWithTime(0);
            }
        }
        else {
            if (this._upgradeClip) {
                this._upgradeClip.stop();
                this._circleHead.removeChild(this._upgradeClip);
                this._upgradeClip = null;
                this._officerIcon.text = Api.playerVoApi.getPlayerMinLevelStr();
                this._officerIcon.x = this._circleHead.x + this._circleHead.width * this._circleHead.scaleX / 2 - this._officerIcon.width * this._officerIcon.scaleX / 2 + 3;
            }
        }
    };
    ChallengeView.prototype.refresh = function () {
        this.refreshUpgradeClip();
        // this.refreshInfo();
    };
    ChallengeView.prototype.showHand = function () {
        this._clickHand = BaseBitmap.create("guide_hand");
        // if (!PlatformManager.hasSpcialCloseBtn()){
        // 	this._clickHand.skewY = 180;
        // }
        this._clickHand.x = PlatformManager.hasSpcialCloseBtn() ? 57 : 620;
        this._clickHand.y = 50;
        this.addChild(this._clickHand);
        egret.Tween.get(this._clickHand, { loop: true })
            .to({ scaleX: 0.9, scaleY: 0.9 }, 500)
            .to({ scaleX: 1, scaleY: 1 }, 500);
    };
    ChallengeView.prototype.tick = function () {
        if (Api.mainTaskVoApi.getCurMainTaskId() == "10" && Api.challengeVoApi.getCurChannelId() < 9) {
            if (!this._clickHand) {
                this.showHand();
            }
            if (this._task10ClickTimes > 0) {
                this._clickHand.visible = false;
                return;
            }
            this._scrollContiner.addChild(this._clickHand);
            this._clickHand.x = 210 + this._middleContiner.x;
            var tarY = GameConfig.stageHeigth / 2;
            this._clickHand.y = tarY + this._middleContiner.y - 25;
        }
        else {
            if (!Api.rookieVoApi.isInGuiding && this._clickHand) {
                this._clickHand.visible = false;
            }
        }
        return true;
    };
    ChallengeView.prototype.hide = function () {
        _super.prototype.hide.call(this);
        if (Api.rookieVoApi.isGuiding && Api.rookieVoApi.curGuideKey != "levy") {
            Api.rookieVoApi.checkNextStep();
        }
    };
    ChallengeView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_RESCHANGE_REFRESH_UI, this.refresh, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT, this.guideMsg, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_CLOSE_CHALLENGE, this.hide, this);
        Api.mainTaskVoApi.isKeepGuide = false;
        Api.mainTaskVoApi.hideGuide();
        this._middleChannel = 0;
        this._bigChannel = 0;
        for (var k5 in this._attackBtnTab) {
            this._attackBtnTab[k5].dispose();
        }
        this._attackBtnTab.length = 0;
        this._soldierText = null;
        this._expProgress = null;
        this._scrollContiner = null;
        this._topContiner = null;
        this._middleContiner = null;
        this._buttomContiner = null;
        this._passIconTab.length = 0;
        this._upgradeClip = null;
        this._circleHead = null;
        this._officerIcon = null;
        this._lineIconTab.length = 0;
        this._clickHand = null;
        this._task10ClickTimes = 0;
        this._autoFight = null;
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
        _super.prototype.dispose.call(this);
    };
    return ChallengeView;
}(CommonView));
__reflect(ChallengeView.prototype, "ChallengeView");
