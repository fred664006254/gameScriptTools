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
  * 勤王除恶view
  * @author 张朝阳
  * date 2019/4/12
  * @class AllianceWeekEndView
  */
var AllianceWeekEndView = (function (_super) {
    __extends(AllianceWeekEndView, _super);
    function AllianceWeekEndView() {
        var _this = _super.call(this) || this;
        _this._topNowStage = null;
        _this._contributionValue = null;
        _this._enemyProgressBar = null;
        _this._boxProgressBar = null;
        _this._enemyInfoList = [];
        _this._enemyEffectList = [];
        _this._boxInfoList = [];
        _this._enemyScollView = null;
        _this._enemysvContainer = null;
        // private _topbg2: BaseBitmap = null
        _this._topbg = null;
        _this._additionbtn = null;
        _this._startGameBtn = null;
        _this._bg = null;
        _this._npcContainer = null;
        _this._npcBM = null;
        _this._npcHpProgressBar = null;
        _this._npcNameBg = null;
        _this._npcName = null;
        _this._heroContainer = null;
        _this._heroBM = null;
        _this._heroInfoBg = null;
        _this._heroInfoFightTF = null;
        _this._heroInfoTipTF = null;
        _this._autoBattleBtn = null;
        _this._servantId = null;
        _this._isPlayAni = false;
        _this._isAuto = false;
        _this._bossInfo = null;
        _this._oldBoss = null;
        _this._autoBattleView = null;
        _this._studyatk_upbg = null;
        _this._studyatk_uparrow = null;
        _this._upBF = null;
        _this._ponitEffect = null;
        // private _enemybg: BaseBitmap = null;
        /**是否可以战斗 */
        _this._battleTimeTF = null;
        _this._battleTimeBg = null;
        _this._battleTimeContainer = null;
        _this._btnContainer = null;
        _this._noBattle = null;
        _this._scoreBtn = null;
        _this._scoreBitmapTextBg = null;
        _this._scoreBitmapText = null;
        _this._killNumTF = null;
        _this._svWidth = 530;
        _this._clip = null;
        _this._skinnamebg = null;
        _this._skinnameTxt = null;
        return _this;
    }
    AllianceWeekEndView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ALLIANCEWEEKEND_SELECTSERVANT, this.selectHandle, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQYEST_ALLIANCEWEEK_ATTACK, this.attackHandle, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ALLIANCEWEEK_GETBOSSRANK, this.bossRankHandle, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQYEST_ALLIANCEWEEK_RECOVER, this.recoverHandle, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQYEST_ALLIANCEWEEK_GETKILLREWARD, this.killHandle, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQYEST_ALLIANCEWEEK_BUYBUFF, this.buyBuffHandle, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQYEST_ALLIANCEWEEK_GETSCOREREWARD, this.scoreHandle, this);
        App.MessageHelper.addNetMessage("myallianceweek", this.modelHandle, this);
        if (!this.param.data.isShow) {
            ViewController.getInstance().openView(ViewConst.BASE.ALLIANCEWEEKENDREPORTVIEW, { msg: LanguageManager.getlocal("allianceWeekEndReportViewMsg"), title: LanguageManager.getlocal("allianceWeekEndReportViewTitle") });
        }
        if (Api.myAllianceWeekVoApi.checkUserJoinAllianceTime()) {
            Api.allianceWeekVoApi.setinBattleRedDotFlag();
        }
        this._oldBoss = Api.allianceWeekVoApi.getNowBoss();
        this._bg = BaseLoadBitmap.create("allianceweekendview_bg");
        this._bg.width = 640;
        this._bg.height = 1136;
        this._bg.setPosition(0, GameConfig.stageHeigth - this._bg.height - 102);
        this.addChildToContainer(this._bg);
        this._topbg = BaseLoadBitmap.create("forpeople_top"); //-15
        this._topbg.width = 640;
        this._topbg.height = 160;
        this._topbg.setPosition(0, -18);
        this.addChildToContainer(this._topbg);
        this._enemysvContainer = new BaseDisplayObjectContainer();
        this._enemysvContainer.height = 85;
        var rect = new egret.Rectangle(0, 0, this._svWidth, 85); // 7 7 34 11 
        this._enemyScollView = ComponentManager.getScrollView(this._enemysvContainer, rect);
        this._enemyScollView.setPosition(100, -15);
        this._enemyScollView.bounces = false;
        this.addChildToContainer(this._enemyScollView);
        this.initEnemy();
        var line = BaseBitmap.create("allianceweekendview_goldline");
        line.width = 622;
        line.setPosition(this._bg.x + this._bg.width / 2 - line.width / 2, this._enemyScollView.y + this._enemyScollView.height);
        this.addChildToContainer(line);
        var killTF = ComponentManager.getTextField(LanguageManager.getlocal("allianceWeekEndViewKill"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        killTF.setPosition(15, this._enemyScollView.y + this._enemyScollView.height / 2 - killTF.height - 5);
        this.addChildToContainer(killTF);
        var killBg = BaseBitmap.create("acchristmasview_smalldescbg");
        killBg.setPosition(killTF.x + killTF.width / 2 - killBg.width / 2, killTF.y + killTF.height + 5);
        this.addChildToContainer(killBg);
        this._killNumTF = ComponentManager.getTextField("1/10", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        this._killNumTF.width = killBg.width;
        this._killNumTF.textAlign = egret.HorizontalAlign.CENTER;
        this._killNumTF.setPosition(killBg.x + killBg.width / 2 - this._killNumTF.width / 2, killBg.y + killBg.height / 2 - this._killNumTF.height / 2);
        this.addChildToContainer(this._killNumTF);
        var topDateTime = ComponentManager.getTextField(LanguageManager.getlocal("allianceWeekEndViewDateTime", [Api.allianceWeekVoApi.acTimeAndHour(), Api.allianceWeekVoApi.acTimeAndHourUnBattle()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        topDateTime.setPosition(15, line.y + line.height + 10);
        this.addChildToContainer(topDateTime);
        this._topNowStage = ComponentManager.getTextField(LanguageManager.getlocal("allianceWeekEndViewNowStage"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._topNowStage.setPosition(15, topDateTime.y + topDateTime.height + 10);
        this.addChildToContainer(this._topNowStage);
        // 。- 初版 现在弃用
        // this._topbg2 = BaseBitmap.create("public_9_bg15");
        // this._topbg2.width = 680;
        // this._topbg2.height = 95;
        // this._topbg2.setPosition(this._topbg.x + this._topbg.width / 2 - this._topbg2.width / 2, this._topbg.y + this._topbg.height);
        // this.addChildToContainer(this._topbg2);
        // let contributionbtn = ComponentManager.getButton("allianceweekendview_contributionbtn", null, this.contributionbtnClick, this);
        // contributionbtn.setPosition(this._topbg.x + this._topbg.width - contributionbtn.width - 2, this._topbg.y + this._topbg.height + 10);
        // this.addChildToContainer(contributionbtn);
        this._scoreBtn = ComponentManager.getButton("allianceweekendview_score", null, this.scoreBtnClick, this);
        this._scoreBtn.setPosition(this._topbg.x + this._topbg.width - this._scoreBtn.width - 5, this._topbg.y + this._topbg.height + 10);
        this.addChildToContainer(this._scoreBtn);
        this._scoreBitmapTextBg = BaseBitmap.create("studyatk_upbg");
        this._scoreBitmapTextBg.width = 90;
        this._scoreBitmapTextBg.x = this._scoreBtn.x + this._scoreBtn.width / 2 - this._scoreBitmapTextBg.width / 2;
        this._scoreBitmapTextBg.y = this._scoreBtn.y + this._scoreBtn.height;
        this.addChildToContainer(this._scoreBitmapTextBg);
        this._scoreBitmapText = ComponentManager.getBitmapText("1100", "studyatk_upfnt");
        this._scoreBitmapText.x = this._scoreBitmapTextBg.x + this._scoreBitmapTextBg.width / 2 - this._scoreBitmapText.width / 2;
        this._scoreBitmapText.y = this._scoreBitmapTextBg.y + this._scoreBitmapTextBg.height / 2 - this._scoreBitmapText.height / 2;
        this.addChildToContainer(this._scoreBitmapText);
        this._additionbtn = ComponentManager.getButton("allianceweekendview_additionbtn", null, this.additionbtnClick, this);
        this._additionbtn.setPosition(this._scoreBtn.x - this._additionbtn.width - 20, this._scoreBtn.y);
        this.addChildToContainer(this._additionbtn);
        this._studyatk_upbg = BaseBitmap.create("studyatk_upbg");
        this._studyatk_upbg.width = 90;
        this._studyatk_upbg.x = this._additionbtn.x + this._additionbtn.width / 2 - this._studyatk_upbg.width / 2;
        this._studyatk_upbg.y = this._additionbtn.y + this._additionbtn.height;
        this.addChildToContainer(this._studyatk_upbg);
        this._studyatk_uparrow = BaseBitmap.create("studyatk_uparrow");
        this._studyatk_uparrow.x = this._studyatk_upbg.x + this._studyatk_upbg.width / 2 + 20;
        this._studyatk_uparrow.y = this._studyatk_upbg.y + this._studyatk_upbg.height / 2 - this._studyatk_uparrow.height / 2;
        this.addChildToContainer(this._studyatk_uparrow);
        this._upBF = ComponentManager.getBitmapText("10%", "studyatk_upfnt");
        this._upBF.x = this._studyatk_uparrow.x - this._upBF.width - 5;
        this._upBF.y = this._studyatk_upbg.y + this._studyatk_upbg.height / 2 - this._upBF.height / 2;
        this.addChildToContainer(this._upBF);
        // this._enemybg = BaseBitmap.create("countrywarservantbg");
        // this._enemybg.height = 712;
        // this._enemybg.setPosition(10, this._topbg.y + this._topbg.height + 2);
        // this.addChildToContainer(this._enemybg); --107 65
        this.initBattle();
        // this.initBox()
        this.refreashView();
        this.tick();
        this.modelHandle();
        // ViewController.getInstance().openView(ViewConst.BASE.ALLIANCEWEEKENDREPORTVIEW, { msg: LanguageManager.getlocal("allianceWeekEndReportViewMsg"), title: LanguageManager.getlocal("allianceWeekEndReportViewTitle") })
    };
    /**初始化战斗 */
    AllianceWeekEndView.prototype.initBattle = function () {
        this._npcContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._npcContainer);
        var npcBMScale = 0.65;
        this._npcBM = BaseLoadBitmap.create(Config.AllianceweekendCfg.npcCfgList[0]);
        this._npcBM.width = 405;
        this._npcBM.height = 467;
        this._npcBM.anchorOffsetX = this._npcBM.width / 2;
        this._npcBM.anchorOffsetY = this._npcBM.height / 2;
        this._npcBM.setScale(npcBMScale);
        this._npcBM.setPosition(this._bg.x + this._npcBM.width / 2 * npcBMScale, this._topbg.y + this._topbg.height + this._npcBM.height / 2 * npcBMScale);
        this._npcContainer.addChild(this._npcBM);
        this._npcBM.addTouchTap(function () {
            var boss = Api.allianceWeekVoApi.getNowBoss();
            var foeCfg = Config.AllianceweekendCfg.lastFoeItemCfg();
            if (boss) {
                foeCfg = Config.AllianceweekendCfg.getFoeItemCfgForBossId(boss.id);
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEWEEKENDNPCINFOPOPUPVIEW, { itemCfg: foeCfg, npcCfg: foeCfg.npc });
        }, this);
        this._npcNameBg = BaseBitmap.create("aobaibottom");
        this._npcNameBg.setPosition(this._npcBM.x - this._npcNameBg.width / 2, this._npcBM.y + this._npcBM.height / 2 * npcBMScale - this._npcNameBg.height);
        this._npcContainer.addChild(this._npcNameBg);
        this._npcName = ComponentManager.getTextField(LanguageManager.getlocal("allianceWeekEndViewNpcName" + String(Config.AllianceweekendCfg.getFoeItemCfgList()[0].id)), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._npcName.setPosition(this._npcNameBg.x + this._npcNameBg.width / 2 - this._npcName.width / 2, this._npcNameBg.y + this._npcNameBg.height / 2 - this._npcName.height / 2);
        this._npcContainer.addChild(this._npcName);
        var npcHpProgressBarScale = 0.42;
        this._npcHpProgressBar = ComponentManager.getProgressBar("progress8", "progress7_bg", 550);
        this._npcHpProgressBar.anchorOffsetX = this._npcHpProgressBar.width / 2;
        this._npcHpProgressBar.anchorOffsetY = this._npcHpProgressBar.height / 2;
        this._npcHpProgressBar.setScale(npcHpProgressBarScale);
        this._npcHpProgressBar.setPercentage(0.3, "10", TextFieldConst.COLOR_WHITE);
        this._npcHpProgressBar.setTextSize(42);
        this._npcHpProgressBar.setPosition(this._npcBM.x, this._npcNameBg.y - this._npcHpProgressBar.height / 2 * npcHpProgressBarScale);
        this._npcContainer.addChild(this._npcHpProgressBar);
        this._heroContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._heroContainer);
        var heroBMScale = 0.65;
        this._heroBM = BaseLoadBitmap.create(Api.servantVoApi.getFullImgPathWithId("1001"));
        this._heroBM.width = 405;
        this._heroBM.height = 467;
        this._heroBM.anchorOffsetX = this._heroBM.width / 2;
        this._heroBM.anchorOffsetY = this._heroBM.height / 2;
        this._heroBM.setScale(heroBMScale);
        this._heroBM.setPosition(this._bg.x + this._bg.width - this._heroBM.width / 2 * heroBMScale - 35, this._bg.y + this._bg.height - this._heroBM.height / 2 * heroBMScale - 70);
        this._heroContainer.addChild(this._heroBM);
        this._heroBM.addTouchTap(this.clickChangeHero, this);
        this._heroInfoBg = BaseBitmap.create("public_9_downbg");
        this._heroInfoBg.width = 280;
        this._heroInfoBg.height = 80;
        this._heroInfoBg.setPosition(this._heroBM.x - this._heroInfoBg.width / 2, this._heroBM.y + this._heroBM.height / 2 * heroBMScale - this._heroInfoBg.height);
        this._heroContainer.addChild(this._heroInfoBg);
        //战斗力
        var fightValue = Api.servantVoApi.getServantCombatWithId("1001");
        this._heroInfoFightTF = ComponentManager.getTextField(LanguageManager.getlocal("allianceWeekEndViewHeroFight", [String(fightValue)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_YELLOW);
        this._heroInfoFightTF.setPosition(this._heroInfoBg.x + this._heroInfoBg.width / 2 - this._heroInfoFightTF.width / 2, this._heroInfoBg.y + 15);
        this._heroContainer.addChild(this._heroInfoFightTF);
        this._heroInfoTipTF = ComponentManager.getTextField(LanguageManager.getlocal("allianceWeekEndViewHeroTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this._heroInfoTipTF.setPosition(this._heroInfoBg.x + this._heroInfoBg.width / 2 - this._heroInfoTipTF.width / 2, this._heroInfoFightTF.y + this._heroInfoFightTF.height + 8);
        this._heroContainer.addChild(this._heroInfoTipTF);
        this._heroContainer.width = this._heroContainer.width;
        this._heroContainer.height = this._heroContainer.height;
        var aureoleClip = ComponentManager.getCustomMovieClip("acwealthcarpeffect", 10, 70);
        var aureoleBM = BaseBitmap.create("acwealthcarpeffect1");
        aureoleClip.blendMode = egret.BlendMode.ADD;
        aureoleClip.width = aureoleBM.width;
        aureoleClip.height = aureoleBM.height;
        aureoleClip.anchorOffsetX = aureoleBM.width / 2;
        aureoleClip.anchorOffsetY = aureoleBM.height / 2;
        aureoleClip.setScale(2.5 * heroBMScale);
        aureoleClip.x = this._heroBM.x;
        aureoleClip.y = this._heroBM.y;
        aureoleClip.playWithTime(-1);
        this._heroContainer.addChildAt(aureoleClip, 0);
        this._clip = aureoleClip;
        var skinnamebg = BaseBitmap.create("skinshowkuang3");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, skinnamebg, this._heroInfoBg, [0]);
        skinnamebg.y = this._heroInfoBg.y - skinnamebg.height - 5;
        this._heroContainer.addChild(skinnamebg);
        this._skinnamebg = skinnamebg;
        var skinnameTxt = ComponentManager.getTextField('', 22, TextFieldConst.COLOR_BLACK);
        skinnameTxt.height = 22;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinnameTxt, skinnamebg);
        this._heroContainer.addChild(skinnameTxt);
        this._skinnameTxt = skinnameTxt;
        // let servant:ServantInfoVo = Api.servantVoApi.getServantObj(`1001`);
        // if (servant && servant.equip && servant.equip != ""){
        // }
        this._btnContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._btnContainer);
        this._startGameBtn = ComponentManager.getButton(ButtonConst.BATTLE_START_BTN_1, null, this.battleBegin, this, [false]);
        this._startGameBtn.anchorOffsetX = this._startGameBtn.width / 2;
        this._startGameBtn.anchorOffsetY = this._startGameBtn.height / 2;
        this._startGameBtn.setScale(0.7);
        this._startGameBtn.setPosition(this._bg.x + this._bg.width / 2, this._topbg.y + this._topbg.height + ((this._bg.y + this._bg.height - this._topbg.y - this._topbg.height) / 2));
        this._btnContainer.addChild(this._startGameBtn);
        egret.Tween.get(this._startGameBtn, { loop: true }).to({ scaleX: 0.63, scaleY: 0.63 }, 600).to({ scaleX: 0.7, scaleY: 0.7 }, 600);
        this._autoBattleBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "allianceWeekEndViewAuto", this.battleBegin, this, [true]);
        this._autoBattleBtn.setPosition(this._startGameBtn.x - this._autoBattleBtn.width / 2, this._bg.y + this._bg.height - this._autoBattleBtn.height - 8);
        this._btnContainer.addChild(this._autoBattleBtn);
        var autoBattleNeedVipLv = Config.VipCfg.getUnlockLvel("allianceBoss");
        if (autoBattleNeedVipLv) {
            if (Api.playerVoApi.getPlayerVipLevel() >= autoBattleNeedVipLv) {
                this._autoBattleBtn.alpha = 1;
                this._autoBattleBtn.setEnable(true);
            }
            else {
                this._autoBattleBtn.alpha = 0;
                this._autoBattleBtn.setEnable(false);
                var autoTips = ComponentManager.getTextField(LanguageManager.getlocal("allianceWeekEndAutoBattle", [String(autoBattleNeedVipLv)]), TextFieldConst.FONTSIZE_CONTENT_SMALL);
                autoTips.setPosition(this._autoBattleBtn.x + this._autoBattleBtn.width / 2 - autoTips.width / 2, this._autoBattleBtn.y + this._autoBattleBtn.height / 2 - autoTips.height / 2);
                this.addChildToContainer(autoTips);
            }
        }
        else {
            this._autoBattleBtn.alpha = 0;
            this._autoBattleBtn.setEnable(false);
        }
        this._autoBattleView = new BattleAuto();
        this._autoBattleView.init(2, function () { }, this);
        this._btnContainer.addChild(this._autoBattleView);
        this._autoBattleView.setVisible(false);
        this._battleTimeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._battleTimeContainer);
        this._battleTimeBg = BaseBitmap.create("public_9_bg15");
        this._battleTimeContainer.addChild(this._battleTimeBg);
        this._battleTimeTF = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._battleTimeTF.textAlign = egret.HorizontalAlign.CENTER;
        this._battleTimeContainer.addChild(this._battleTimeTF);
        this._noBattle = BaseLoadBitmap.create("allianceweekendview_truce");
        this._noBattle.width = 187;
        this._noBattle.height = 219;
        this._noBattle.setPosition(this._startGameBtn.x - this._noBattle.width / 2, this._startGameBtn.y - this._noBattle.height / 2);
        this.addChildToContainer(this._noBattle);
        this.refreashNpc();
        this.refreashHero();
    };
    /**初始化宝箱-- 初版 现在弃用 */
    AllianceWeekEndView.prototype.initBox = function () {
        // let numbg = BaseBitmap.create("allianceweekendview_numbg");
        // numbg.setPosition(5, this._topbg2.y + this._topbg2.height / 2 - numbg.height / 2 - 5);
        // this.addChildToContainer(numbg);
        // this._contributionValue = ComponentManager.getTextField("9999", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        // this._contributionValue.width = numbg.width;
        // this._contributionValue.setPosition(numbg.x, numbg.y + 13);
        // this._contributionValue.textAlign = egret.HorizontalAlign.CENTER;
        // this.addChildToContainer(this._contributionValue);
        // let contributionDesc = ComponentManager.getTextField(LanguageManager.getlocal("allianceWeekEndViewUserContribution"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        // contributionDesc.setPosition(numbg.x + numbg.width / 2 - contributionDesc.width / 2, numbg.y + 42);
        // this.addChildToContainer(contributionDesc);
        // this._boxProgressBar = ComponentManager.getProgressBar("progress7", "progress7_bg", 485);
        // this._boxProgressBar.setPosition(numbg.x + numbg.width, this._topbg2.y + this._topbg2.height - this._boxProgressBar.height - 19);
        // this.addChildToContainer(this._boxProgressBar);
        // this._boxInfoList = [];
        // let maxValue = Config.AllianceweekendCfg.peScoreItemCfgList[Config.AllianceweekendCfg.peScoreItemCfgList.length - 1].score;
        // for (let i = 0; i < Config.AllianceweekendCfg.peScoreItemCfgList.length; i++) {
        // 	let score: number = Config.AllianceweekendCfg.peScoreItemCfgList[i].score;
        // 	let ratio: number = score / maxValue;
        // 	let boxbg = BaseBitmap.create("common_boxbg");
        // 	boxbg.anchorOffsetX = boxbg.width / 2;
        // 	boxbg.anchorOffsetY = boxbg.height / 2;
        // 	boxbg.setPosition(this._boxProgressBar.x + this._boxProgressBar.width * ratio, this._boxProgressBar.y - boxbg.height / 2);
        // 	this.addChildToContainer(boxbg);
        // 	let boxLight = BaseBitmap.create("acturantable_taskbox_light");
        // 	boxLight.anchorOffsetX = boxLight.width / 2;
        // 	boxLight.anchorOffsetY = boxLight.height / 2;
        // 	boxLight.setPosition(boxbg.x, boxbg.y);
        // 	this.addChildToContainer(boxLight);
        // 	let box = BaseBitmap.create("common_box_1");
        // 	box.anchorOffsetX = box.width / 2;
        // 	box.anchorOffsetY = box.height / 2;
        // 	box.setScale(0.75);
        // 	box.setPosition(boxbg.x, boxbg.y);
        // 	this.addChildToContainer(box);
        // 	box.addTouchTap(() => {
        // 		ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEWEEKENDREWARDINFOPOPUPVIEW, { itemCfg: Config.AllianceweekendCfg.peScoreItemCfgList[i] });
        // 	}, this);
        // 	let scoreTF = ComponentManager.getTextField(String(score), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        // 	scoreTF.anchorOffsetX = scoreTF.width / 2;
        // 	scoreTF.setPosition(boxbg.x, this._boxProgressBar.y + this._boxProgressBar.height);
        // 	this.addChildToContainer(scoreTF);
        // 	let boxInfo = { boxbg: boxbg, box: box, boxLight: boxLight, scoreTF: scoreTF, itemCfg: Config.AllianceweekendCfg.peScoreItemCfgList[i] };
        // 	this._boxInfoList.push(boxInfo);
        // }
        // // this.refreashBox();
    };
    /**初始化npc */
    AllianceWeekEndView.prototype.initEnemy = function () {
        //清除数据
        if (this._enemyProgressBar) {
            this._enemysvContainer.removeChild(this._enemyProgressBar);
            this._enemyProgressBar.dispose();
            this._enemyProgressBar = null;
        }
        if (this._ponitEffect) {
            this._enemysvContainer.removeChild(this._ponitEffect);
            this._ponitEffect.dispose();
            this._ponitEffect = null;
        }
        if (this._enemyInfoList.length > 0) {
            for (var i = 0; i < this._enemyInfoList.length; i++) {
                var enemyInfo = this._enemyInfoList[i];
                if (enemyInfo.attack) {
                    this._enemysvContainer.removeChild(enemyInfo.attack);
                    enemyInfo.attack.dispose();
                    enemyInfo.attack = null;
                }
                if (enemyInfo.box) {
                    this._enemysvContainer.removeChild(enemyInfo.box);
                    enemyInfo.box.dispose();
                    enemyInfo.box = null;
                }
                if (enemyInfo.boxLight) {
                    this._enemysvContainer.removeChild(enemyInfo.boxLight);
                    enemyInfo.boxLight.dispose();
                    enemyInfo.boxLight = null;
                }
                if (enemyInfo.npc) {
                    this._enemysvContainer.removeChild(enemyInfo.npc);
                    enemyInfo.npc.dispose();
                    enemyInfo.npc = null;
                }
                if (enemyInfo.npcbg) {
                    this._enemysvContainer.removeChild(enemyInfo.npcbg);
                    enemyInfo.npcbg.dispose();
                    enemyInfo.npcbg = null;
                }
                if (enemyInfo.npcKill) {
                    this._enemysvContainer.removeChild(enemyInfo.npcKill);
                    enemyInfo.npcKill.dispose();
                    enemyInfo.npcKill = null;
                }
            }
        }
        if (this._enemyEffectList.length > 0) {
            for (var i = 0; i < this._enemyEffectList.length; i++) {
                var enemyEffect = this._enemyEffectList[i];
                if (enemyEffect.effect) {
                    this._enemysvContainer.removeChild(enemyEffect.effect);
                    enemyEffect.effect.dispose();
                    enemyEffect.effect = null;
                }
                if (enemyEffect.effectLoop) {
                    this._enemysvContainer.removeChild(enemyEffect.effectLoop);
                    enemyEffect.effectLoop.dispose();
                    enemyEffect.effectLoop = null;
                }
            }
        }
        this._oldBoss = Api.allianceWeekVoApi.getNowBoss();
        // this._enemysvContainer.height = Config.AllianceweekendCfg.getFoeItemCfgList().length * 120 - 60;
        this._enemyProgressBar = ComponentManager.getProgressBar("progress13", "progress13_bg", 110 * (Config.AllianceweekendCfg.getFoeItemCfgList().length - 1));
        this._enemyProgressBar.setPosition(this._enemysvContainer.x + 37, this._enemysvContainer.y + this._enemysvContainer.height / 2 - this._enemyProgressBar.height / 2);
        this._enemysvContainer.addChild(this._enemyProgressBar);
        var killAndSum = Api.allianceWeekVoApi.getKillValueAndSumValue();
        this._enemyProgressBar.setPercentage(killAndSum.kill / killAndSum.sum);
        this._enemysvContainer.width = this._enemyProgressBar.width + 76;
        this._ponitEffect = BaseBitmap.create("allianceweekendview_point");
        this._ponitEffect.anchorOffsetX = this._ponitEffect.width / 2;
        this._ponitEffect.anchorOffsetY = this._ponitEffect.height / 2;
        this._ponitEffect.setPosition(this._enemyProgressBar.x, this._enemyProgressBar.y + this._enemyProgressBar.width / 2 - this._enemyProgressBar.width * killAndSum.kill / killAndSum.sum);
        this._enemysvContainer.addChild(this._ponitEffect);
        this._ponitEffect.blendMode = egret.BlendMode.ADD;
        this._ponitEffect.setVisible(false);
        this._enemyInfoList = [];
        this._enemyEffectList = [];
        var _loop_1 = function (i) {
            var maxValue = Config.AllianceweekendCfg.getFoeItemCfgList().length;
            var foeCfg = Config.AllianceweekendCfg.getFoeItemCfgList()[i];
            var npcbg = BaseBitmap.create("acdailygift_package_bg");
            npcbg.anchorOffsetX = npcbg.width / 2;
            npcbg.anchorOffsetY = npcbg.height / 2;
            npcbg.setScale(0.82);
            npcbg.setPosition(this_1._enemyProgressBar.x + 110 * i, this_1._enemyProgressBar.y + this_1._enemyProgressBar.height / 2);
            this_1._enemysvContainer.addChild(npcbg);
            npcbg.addTouchTap(function () {
                ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEWEEKENDNPCINFOPOPUPVIEW, { itemCfg: foeCfg, npcCfg: foeCfg.npc });
            }, this_1);
            var npc = BaseBitmap.create("allianceweekendview_npc" + foeCfg.id);
            npc.anchorOffsetX = npc.width / 2;
            npc.anchorOffsetY = npc.height / 2;
            npc.setPosition(npcbg.x, npcbg.y);
            this_1._enemysvContainer.addChild(npc);
            var npcKill = BaseBitmap.create("allianceweekendview_killed");
            npcKill.anchorOffsetX = npcKill.width / 2;
            npcKill.anchorOffsetY = npcKill.height / 2;
            npcKill.setScale(0.66);
            npcKill.setPosition(npc.x, npc.y);
            this_1._enemysvContainer.addChild(npcKill);
            var effect = ComponentManager.getCustomMovieClip("allianceweekendvieweffect", 10, 70);
            var effectBM = BaseBitmap.create("allianceweekendvieweffect1");
            effect.setPosition(npc.x - effectBM.width / 2, npc.y - effectBM.height / 2);
            this_1._enemysvContainer.addChild(effect);
            effect.blendMode = egret.BlendMode.ADD;
            var effectLoop = ComponentManager.getCustomMovieClip("allianceweekendviewloopeffect", 10, 70);
            var effectLoopBM = BaseBitmap.create("allianceweekendviewloopeffect1");
            effectLoop.setPosition(npc.x - effectLoopBM.width / 2, npc.y - effectLoopBM.height / 2);
            this_1._enemysvContainer.addChild(effectLoop);
            effectLoop.playWithTime(-1);
            effectLoop.blendMode = egret.BlendMode.ADD;
            var attack = BaseBitmap.create("allianceweekendview_attack");
            attack.setPosition(npcbg.x - attack.width / 2, npcbg.y);
            this_1._enemysvContainer.addChild(attack);
            var boxLight = BaseBitmap.create("acturantable_taskbox_light");
            boxLight.anchorOffsetX = boxLight.width / 2;
            boxLight.anchorOffsetY = boxLight.height / 2;
            boxLight.setPosition(npc.x, npc.y);
            this_1._enemysvContainer.addChild(boxLight);
            var box = BaseBitmap.create("acrechargeboxview_box1_1");
            box.anchorOffsetX = box.width / 2;
            box.anchorOffsetY = box.height / 2;
            box.setScale(0.54);
            box.setPosition(npc.x, npc.y);
            this_1._enemysvContainer.addChild(box);
            box.addTouchTap(function () {
                ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEWEEKENDNPCINFOPOPUPVIEW, { itemCfg: foeCfg, npcCfg: foeCfg.npc });
            }, this_1);
            var enemyInfo = { npcbg: npcbg, npc: npc, npcKill: npcKill, attack: attack, boxLight: boxLight, box: box, itemCfg: foeCfg };
            this_1._enemyInfoList.push(enemyInfo);
            this_1._enemyEffectList.push({ effect: effect, effectLoop: effectLoop, itemCfg: foeCfg });
        };
        var this_1 = this;
        for (var i = 0; i < Config.AllianceweekendCfg.getFoeItemCfgList().length; i++) {
            _loop_1(i);
        }
        this.refreashEnemy();
        this.refreashEnemyEffect();
    };
    /**刷新界面 */
    AllianceWeekEndView.prototype.refreashView = function () {
        var maxScore = Config.AllianceweekendCfg.peScoreItemCfgList[Config.AllianceweekendCfg.peScoreItemCfgList.length - 1].score;
        // this._contributionValue.text = String(Api.myAllianceWeekVoApi.getScore()); -- 初版 现在弃用
        // this._boxProgressBar.setPercentage(Api.myAllianceWeekVoApi.getScore() / maxScore); -- 初版 现在弃用
        // let scrollTopOffset = this._enemysvContainer.height - (this._enemybg.height - 45) + Config.AllianceweekendCfg.getMovePosY() * 110 //<= 0 ? 0 : this._enemysvContainer.height - (this._enemybg.height - 45) - Config.AllianceweekendCfg.getMovePosY() * 110;
        var scrollTopOffset = this.getNowBossY() - (this._svWidth - 45) / 2;
        this._enemyScollView.setScrollLeft(scrollTopOffset);
        var nowBoss = Api.allianceWeekVoApi.getNowBoss();
        if (((!this._oldBoss) && (!nowBoss)) || ((this._oldBoss) && (nowBoss) && this._oldBoss.id == nowBoss.id)) {
            var killAndSum = Api.allianceWeekVoApi.getKillValueAndSumValue();
            this._enemyProgressBar.setPercentage(killAndSum.kill / killAndSum.sum);
            this.refreashEnemyEffect();
        }
        else {
            this.playEnemyProAni();
        }
        if (Api.allianceWeekVoApi.getAdditionBuff() > 0) {
            this._studyatk_upbg.setVisible(true);
            this._studyatk_uparrow.setVisible(true);
            this._upBF.setVisible(true);
            this._upBF.text = Api.allianceWeekVoApi.getAdditionBuff() + "%";
            this._upBF.x = this._studyatk_uparrow.x - this._upBF.width - 5;
        }
        else {
            this._studyatk_upbg.setVisible(false);
            this._studyatk_uparrow.setVisible(false);
            this._upBF.setVisible(false);
        }
        if (Api.myAllianceWeekVoApi.getScore() > 0) {
            this._scoreBitmapText.setVisible(true);
            this._scoreBitmapTextBg.setVisible(true);
            this._scoreBitmapText.text = String(Api.myAllianceWeekVoApi.getScore());
            this._scoreBitmapText.x = this._scoreBitmapTextBg.x + this._scoreBitmapTextBg.width / 2 - this._scoreBitmapText.width / 2;
        }
        else {
            this._scoreBitmapText.setVisible(false);
            this._scoreBitmapTextBg.setVisible(false);
        }
    };
    AllianceWeekEndView.prototype.getNowBossY = function () {
        var boss = Api.allianceWeekVoApi.getNowBoss();
        var bossId = Config.AllianceweekendCfg.lastFoeItemCfg().id;
        if (boss) {
            bossId = boss.id;
        }
        for (var i = 0; i < this._enemyInfoList.length; i++) {
            var enemyInfo = this._enemyInfoList[i];
            if (bossId == enemyInfo.itemCfg.id) {
                return enemyInfo.boxLight.x;
            }
        }
    };
    /**刷新box -- 初版 现在弃用 */
    AllianceWeekEndView.prototype.refreashBox = function () {
        for (var i = 0; i < this._boxInfoList.length; i++) {
            var itemCfg = this._boxInfoList[i].itemCfg;
            var needScore = itemCfg.score;
            var voScore = Api.myAllianceWeekVoApi.getScore();
            var isRevice = Api.myAllianceWeekVoApi.checkBoxReceive(itemCfg.id);
            if (needScore <= voScore) {
                if (isRevice) {
                    this._boxInfoList[i].box.setRes("common_box_3");
                    this._boxInfoList[i].boxLight.setVisible(false);
                    egret.Tween.removeTweens(this._boxInfoList[i].box);
                    egret.Tween.removeTweens(this._boxInfoList[i].boxLight);
                }
                else {
                    this._boxInfoList[i].box.setRes("common_box_2");
                    this._boxInfoList[i].boxLight.setVisible(true);
                    egret.Tween.get(this._boxInfoList[i].boxLight, { loop: true }).to({ rotation: this._boxInfoList[i].boxLight.rotation + 360 }, 10000);
                    egret.Tween.get(this._boxInfoList[i].box, { loop: true }).to({ rotation: 10 }, 50).to({ rotation: -10 }, 100).to({ rotation: 10 }, 100).to({ rotation: 0 }, 50).wait(500);
                }
            }
            else {
                this._boxInfoList[i].box.setRes("common_box_1");
                this._boxInfoList[i].boxLight.setVisible(false);
                egret.Tween.removeTweens(this._boxInfoList[i].box);
                egret.Tween.removeTweens(this._boxInfoList[i].boxLight);
            }
        }
    };
    /**刷新Enemy */
    AllianceWeekEndView.prototype.refreashEnemy = function () {
        var boss = Api.allianceWeekVoApi.getNowBoss();
        for (var i = 0; i < this._enemyInfoList.length; i++) {
            var enemyInfo = this._enemyInfoList[i];
            var boss_1 = Api.allianceWeekVoApi.getNowBoss();
            if (boss_1) {
                if (enemyInfo.itemCfg.id == boss_1.id) {
                    enemyInfo.npc.setVisible(true);
                    enemyInfo.npcKill.setVisible(false);
                    enemyInfo.attack.setVisible(true);
                    enemyInfo.box.setVisible(false);
                    enemyInfo.boxLight.setVisible(false);
                    egret.Tween.removeTweens(enemyInfo.boxLight);
                    egret.Tween.removeTweens(enemyInfo.box);
                    App.DisplayUtil.changeToNormal(enemyInfo.npc);
                }
                else if (enemyInfo.itemCfg.id < boss_1.id) {
                    if ((Api.myAllianceWeekVoApi.checkNpcReceive(enemyInfo.itemCfg.id))
                        || (Api.allianceWeekVoApi.checkIsHasExtraTime() && Api.myAllianceWeekVoApi.getScore() <= 0)) {
                        enemyInfo.npc.setVisible(true);
                        enemyInfo.npcKill.setVisible(true);
                        enemyInfo.attack.setVisible(false);
                        enemyInfo.box.setVisible(false);
                        enemyInfo.boxLight.setVisible(false);
                        egret.Tween.removeTweens(enemyInfo.boxLight);
                        egret.Tween.removeTweens(enemyInfo.box);
                        App.DisplayUtil.changeToGray(enemyInfo.npc);
                    }
                    else {
                        enemyInfo.npc.setVisible(false);
                        enemyInfo.npcKill.setVisible(false);
                        enemyInfo.attack.setVisible(false);
                        enemyInfo.box.setVisible(true);
                        enemyInfo.boxLight.setVisible(true);
                        egret.Tween.get(enemyInfo.boxLight, { loop: true }).to({ rotation: enemyInfo.boxLight.rotation + 360 }, 10000);
                        egret.Tween.get(enemyInfo.box, { loop: true }).to({ rotation: 10 }, 50).to({ rotation: -10 }, 100).to({ rotation: 10 }, 100).to({ rotation: 0 }, 50).wait(500);
                        App.DisplayUtil.changeToGray(enemyInfo.npc);
                    }
                }
                else {
                    enemyInfo.npc.setVisible(true);
                    enemyInfo.npcKill.setVisible(false);
                    enemyInfo.attack.setVisible(false);
                    enemyInfo.box.setVisible(false);
                    enemyInfo.boxLight.setVisible(false);
                    egret.Tween.removeTweens(enemyInfo.boxLight);
                    egret.Tween.removeTweens(enemyInfo.box);
                    App.DisplayUtil.changeToNormal(enemyInfo.npc);
                }
            }
            else {
                var lastcfg = Config.AllianceweekendCfg.lastFoeItemCfg();
                if (enemyInfo.itemCfg.id == lastcfg.id) {
                    enemyInfo.npc.setVisible(true);
                    enemyInfo.npcKill.setVisible(false);
                    enemyInfo.attack.setVisible(true);
                    enemyInfo.box.setVisible(false);
                    enemyInfo.boxLight.setVisible(false);
                    egret.Tween.removeTweens(enemyInfo.boxLight);
                    egret.Tween.removeTweens(enemyInfo.box);
                    App.DisplayUtil.changeToNormal(enemyInfo.npc);
                }
                else {
                    if ((Api.myAllianceWeekVoApi.checkNpcReceive(enemyInfo.itemCfg.id))
                        || (Api.allianceWeekVoApi.checkIsHasExtraTime() && Api.myAllianceWeekVoApi.getScore() <= 0)) {
                        enemyInfo.npc.setVisible(true);
                        enemyInfo.npcKill.setVisible(true);
                        enemyInfo.attack.setVisible(false);
                        enemyInfo.box.setVisible(false);
                        enemyInfo.boxLight.setVisible(false);
                        egret.Tween.removeTweens(enemyInfo.boxLight);
                        egret.Tween.removeTweens(enemyInfo.box);
                        App.DisplayUtil.changeToGray(enemyInfo.npc);
                    }
                    else {
                        enemyInfo.npc.setVisible(false);
                        enemyInfo.npcKill.setVisible(false);
                        enemyInfo.attack.setVisible(false);
                        enemyInfo.box.setVisible(true);
                        enemyInfo.boxLight.setVisible(true);
                        egret.Tween.get(enemyInfo.boxLight, { loop: true }).to({ rotation: enemyInfo.boxLight.rotation + 360 }, 10000);
                        egret.Tween.get(enemyInfo.box, { loop: true }).to({ rotation: 10 }, 50).to({ rotation: -10 }, 100).to({ rotation: 10 }, 100).to({ rotation: 0 }, 50).wait(500);
                        App.DisplayUtil.changeToGray(enemyInfo.npc);
                    }
                }
            }
        }
    };
    /**npc 的特效 */
    AllianceWeekEndView.prototype.refreashEnemyEffect = function (isEffect) {
        var boss = Api.allianceWeekVoApi.getNowBoss();
        var _loop_2 = function (i) {
            var enemyEffect = this_2._enemyEffectList[i];
            var boss_2 = Api.allianceWeekVoApi.getNowBoss();
            if (boss_2) {
                if (enemyEffect.itemCfg.id == boss_2.id) {
                    if (isEffect) {
                        enemyEffect.effect.playWithTime(1);
                        enemyEffect.effect.setEndCallBack(function () {
                            enemyEffect.effectLoop.setVisible(true);
                        }, this_2);
                    }
                    else {
                        enemyEffect.effectLoop.setVisible(true);
                    }
                }
                else {
                    enemyEffect.effectLoop.setVisible(false);
                }
            }
            else {
                var lastcfg = Config.AllianceweekendCfg.lastFoeItemCfg();
                if (enemyEffect.itemCfg.id == lastcfg.id) {
                    if (isEffect) {
                        enemyEffect.effect.playWithTime(1);
                        enemyEffect.effect.setEndCallBack(function () {
                            enemyEffect.effectLoop.setVisible(true);
                        }, this_2);
                    }
                    else {
                        enemyEffect.effectLoop.setVisible(true);
                    }
                }
                else {
                    enemyEffect.effectLoop.setVisible(false);
                }
            }
        };
        var this_2 = this;
        for (var i = 0; i < this._enemyEffectList.length; i++) {
            _loop_2(i);
        }
    };
    /**刷新门客 */
    AllianceWeekEndView.prototype.refreashHero = function (servantId) {
        var servantInfoVo = null;
        if (servantId) {
            servantInfoVo = Api.servantVoApi.getServantObj(servantId);
        }
        else {
            servantInfoVo = Api.myAllianceWeekVoApi.getGoFightServant();
        }
        if (servantInfoVo) {
            this._heroInfoFightTF.setVisible(true);
            this._heroInfoTipTF.setVisible(true);
            this._heroInfoBg.setVisible(true);
            this._servantId = servantInfoVo.servantId;
            var fightValue = Math.floor(Api.servantVoApi.getServantCombatWithId(servantInfoVo.servantId) * (Api.allianceWeekVoApi.getAdditionBuff() + 100) / 100);
            var fullImg = Api.servantVoApi.getFullImgPathWithId(servantInfoVo.servantId);
            this._heroBM.setload(fullImg);
            if (servantInfoVo.equip && servantInfoVo.equip != "") {
                var config = Config.ServantskinCfg.getServantSkinItemById(servantInfoVo.equip);
                this._skinnameTxt.text = config.name;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._skinnameTxt, this._skinnamebg);
                this._clip.alpha = this._skinnamebg.alpha = this._skinnameTxt.alpha = 1;
            }
            else {
                this._clip.alpha = this._skinnamebg.alpha = this._skinnameTxt.alpha = 0;
            }
            this._heroInfoFightTF.text = LanguageManager.getlocal("allianceWeekEndViewHeroFight", [String(fightValue)]);
            this._heroInfoFightTF.setPosition(this._heroInfoBg.x + this._heroInfoBg.width / 2 - this._heroInfoFightTF.width / 2, this._heroInfoBg.y + 15);
            if (this._isAuto) {
                this._autoBattleView.setVisible(true);
                this._startGameBtn.setVisible(false);
                this._autoBattleBtn.setVisible(false);
            }
            else {
                this._autoBattleView.setVisible(false);
                this._startGameBtn.setVisible(true);
                this._autoBattleBtn.setVisible(true);
            }
        }
        else {
            this._servantId = null;
            this._heroInfoFightTF.setVisible(false);
            this._heroInfoTipTF.setVisible(false);
            this._heroInfoBg.setVisible(false);
            this._heroBM.setload("servant_empty");
            this._autoBattleView.setVisible(false);
            this._startGameBtn.setVisible(false);
            this._autoBattleBtn.setVisible(false);
            this._isAuto = false;
            this._isPlayAni = false;
            this._clip.alpha = this._skinnamebg.alpha = this._skinnameTxt.alpha = 0;
        }
    };
    /**刷新Npc */
    AllianceWeekEndView.prototype.refreashNpc = function () {
        var nowBossinfo = Api.allianceWeekVoApi.getNowBoss();
        if (nowBossinfo) {
            var bossCfg = Config.AllianceweekendCfg.getFoeItemCfgForBossId(nowBossinfo.id);
            var hp = Math.round((nowBossinfo.hp / bossCfg.bossHP) * 10000) / 100;
            var hpStr = String(nowBossinfo.hp) + "(" + String(hp) + "%" + ")";
            this._npcHpProgressBar.setPercentage(nowBossinfo.hp / bossCfg.bossHP, hpStr, TextFieldConst.COLOR_WHITE);
            this._npcName.text = LanguageManager.getlocal("allianceWeekEndViewNpcName" + String(bossCfg.id));
            this._npcName.setPosition(this._npcNameBg.x + this._npcNameBg.width / 2 - this._npcName.width / 2, this._npcNameBg.y + this._npcNameBg.height / 2 - this._npcName.height / 2);
            this._npcBM.setload(bossCfg.npc);
        }
        else {
            var bossCfg = Config.AllianceweekendCfg.lastFoeItemCfg();
            this._npcName.text = LanguageManager.getlocal("allianceWeekEndViewNpcName" + String(bossCfg.id));
            this._npcBM.setload(bossCfg.npc);
            this._npcHpProgressBar.setPercentage(1, LanguageManager.getlocal("allianceWeekEndViewNpcBlood"), TextFieldConst.COLOR_WHITE);
        }
    };
    AllianceWeekEndView.prototype.refreashBattle = function () {
        // this._npcHpProgressBar
    };
    /**选择门客 */
    AllianceWeekEndView.prototype.clickChangeHero = function () {
        if (this._isPlayAni) {
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEWEEKENDSELECTSERVANTPOPUPVIEW);
    };
    /**贡献排行 */
    AllianceWeekEndView.prototype.contributionbtnClick = function () {
        var boss = Api.allianceWeekVoApi.getNowBoss();
        var bossId = 0;
        if (boss) {
            bossId = boss.id;
        }
        else {
            bossId = Config.AllianceweekendCfg.lastFoeItemCfg().id;
        }
        this.request(NetRequestConst.REQUEST_ALLIANCEWEEK_GETBOSSRANK, { bossId: bossId });
        // ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEWEEKENDRANKPOPUPVIEW);
    };
    /**个人分数 */
    AllianceWeekEndView.prototype.scoreBtnClick = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEWEEKENDSCOREPOPUPVIEW);
    };
    /** */
    AllianceWeekEndView.prototype.battleBegin = function (param) {
        var _this = this;
        var data = new Date(GameData.serverTime * 1000);
        var date = String(data.getMonth()) + String(data.getDate());
        var local = LocalStorageManager.get(Api.playerVoApi.getPlayerID() + "allianceweekend");
        if ((local && local == date) || (Api.allianceWeekVoApi.getbuffValue() > 0)) {
            this.goBattle(param);
        }
        else {
            ViewController.getInstance().openView(ViewConst.BASE.ALLIANCEWEEKENDBATTLETIPBASEVIEW, {
                cancelCalback: function () {
                    // this.goBattle(param);
                },
                battleCalback: function () {
                    _this.goBattle(param);
                },
                upCalback: function () {
                    _this.additionbtnClick();
                }, handle: this
            });
        }
    };
    /** */
    AllianceWeekEndView.prototype.goBattle = function (isAuto) {
        if (isAuto) {
            this.autoBattleClick();
        }
        else {
            this.startGameBtnClick();
        }
    };
    AllianceWeekEndView.prototype.additionbtnClick = function () {
        var myAllVo = Api.allianceVoApi.getMyAllianceVo();
        if (myAllVo.po <= 2) {
            ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEWEEKENDADDITIONPOPUPVIEW);
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceWeekEndAdditionLockTip"));
        }
    };
    AllianceWeekEndView.prototype.startGameBtnClick = function () {
        if (!Api.allianceWeekVoApi.checkBattleTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceWeekEndViewNoBattleTip"));
            return;
        }
        if (this._isPlayAni) {
            return;
        }
        if (!Api.allianceWeekVoApi.checkActiveStart()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceWeekEndViewAcEndTip"));
            return;
        }
        if (this._servantId) {
            var nowBossinfo = Api.allianceWeekVoApi.getNowBoss();
            this._oldBoss = nowBossinfo;
            var bossId = 0;
            if (nowBossinfo) {
                bossId = nowBossinfo.id;
            }
            else {
                bossId = Config.AllianceweekendCfg.lastFoeItemCfg().id;
            }
            this.request(NetRequestConst.REQYEST_ALLIANCEWEEK_ATTACK, { bossId: bossId, servantId: this._servantId });
        }
        this._isPlayAni = true;
        this._startGameBtn.setVisible(false);
    };
    /**自动战斗 */
    AllianceWeekEndView.prototype.autoBattleClick = function () {
        if (!Api.allianceWeekVoApi.checkBattleTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceWeekEndViewNoBattleTip"));
            return;
        }
        if (this._isPlayAni) {
            return;
        }
        if (!Api.allianceWeekVoApi.checkActiveStart()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceWeekEndViewAcEndTip"));
            return;
        }
        if (this._isAuto) {
            this._isAuto = false;
            egret.Tween.removeTweens(this);
            if (this._servantId) {
                this._startGameBtn.setVisible(true);
                this._autoBattleBtn.setVisible(true);
            }
            else {
                this._startGameBtn.setVisible(false);
                this._autoBattleBtn.setVisible(false);
                this._isPlayAni = false;
            }
            this._autoBattleView.setVisible(false);
            this.removeTouchTap();
            // this.touchEnabled = false;
        }
        else {
            this._isAuto = true;
            this._startGameBtn.setVisible(false);
            this._autoBattleBtn.setVisible(false);
            this._autoBattleView.setVisible(true);
            this.startGameBtnClick();
            // this.touchEnabled = false;
        }
        // ViewController.getInstance().openView(ViewConst.BASE.ALLIANCEWEEKENDBATTLEREPORTVIEW, { damage: LanguageManager.getlocal("allianceWeekEndBattleReportViewBattleResult1"), score: LanguageManager.getlocal("allianceWeekEndBattleReportViewContribution") });
    };
    /**选择门客事件 */
    AllianceWeekEndView.prototype.selectHandle = function (event) {
        var servantId = event.data.servantId;
        if (servantId) {
            this.refreashHero(servantId);
        }
    };
    AllianceWeekEndView.prototype.attackHandle = function (event) {
        if (event.data.ret) {
            // 			bossInfo:
            // damage: 140280
            // score: 1
            // if(event.data.data.data)
            // {
            // 	App.CommonUtil.showTip("allianceWeekEndRankChangeTip");
            // 	this.hide();
            // 	return;
            // }
            if (event.data.data.data.bossInfo) {
                this._bossInfo = event.data.data.data.bossInfo;
                this.playAttackAni();
            }
            else if (event.data.data.data.hasKill) {
                this.initEnemy();
                this.refreashNpc();
                this.refreashView();
                this._isPlayAni = false;
                this._isAuto = false;
                this._autoBattleView.setVisible(false);
                this._startGameBtn.setVisible(true);
                this._autoBattleBtn.setVisible(true);
                App.CommonUtil.showTip(LanguageManager.getlocal("allianceWeekEndRankChangeTip"));
            }
        }
    };
    /**boss Rank回调 */
    AllianceWeekEndView.prototype.bossRankHandle = function (event) {
        if (event.data.ret) {
            ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEWEEKENDRANKPOPUPVIEW, event.data.data.data);
        }
    };
    AllianceWeekEndView.prototype.scoreHandle = function (event) {
        if (event.data.ret) {
            // this.refreashBox();
        }
    };
    AllianceWeekEndView.prototype.modelHandle = function () {
        if (Api.myAllianceWeekVoApi.checkBoxDot()) {
            App.CommonUtil.addIconToBDOC(this._scoreBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._scoreBtn);
        }
    };
    AllianceWeekEndView.prototype.tick = function () {
        if (Api.allianceWeekVoApi.checkActiveStart()) {
            this._topNowStage.text = LanguageManager.getlocal("allianceWeekEndViewCuontDown", [Api.allianceWeekVoApi.acCountDown()]);
        }
        else {
            this._topNowStage.text = LanguageManager.getlocal("acPunishEnd");
        }
        var killAndSum = Api.allianceWeekVoApi.getKillValueAndSumValue();
        if (killAndSum) {
            this._killNumTF.text = LanguageManager.getlocal("allianceWeekEndViewKillNum", [String(killAndSum.kill), String(killAndSum.sum)]);
        }
        else {
            this._killNumTF.text = LanguageManager.getlocal("examinationTimeEndStr");
        }
        if (Api.allianceWeekVoApi.checkActiveStart()) {
            if (Api.allianceWeekVoApi.checkBattleTime()) {
                this._npcContainer.setVisible(true);
                this._heroContainer.setVisible(true);
                if (Api.myAllianceWeekVoApi.checkUserJoinAllianceTime()) {
                    this._btnContainer.setVisible(true);
                    this._battleTimeContainer.setVisible(false);
                }
                else {
                    this._battleTimeTF.text = LanguageManager.getlocal("allianceWeekEndViewJoinTimeTip", [Api.myAllianceWeekVoApi.getJoinBattleTime()]);
                    this._battleTimeBg.width = this._battleTimeTF.width + 40;
                    this._battleTimeBg.height = this._battleTimeTF.height + 15;
                    this._battleTimeBg.setPosition(this._startGameBtn.x - this._battleTimeBg.width / 2, this._startGameBtn.y - this._battleTimeBg.height / 2 - 30);
                    this._battleTimeTF.setPosition(this._battleTimeBg.x + this._battleTimeBg.width / 2 - this._battleTimeTF.width / 2, this._battleTimeBg.y + this._battleTimeBg.height / 2 - this._battleTimeTF.height / 2);
                    this._btnContainer.setVisible(false);
                    this._battleTimeContainer.setVisible(true);
                }
                this._noBattle.setVisible(false);
            }
            else if (Api.allianceWeekVoApi.checkRestTime()) {
                this._npcContainer.setVisible(false);
                this._heroContainer.setVisible(false);
                this._btnContainer.setVisible(false);
                this._battleTimeContainer.setVisible(false);
                this._noBattle.setVisible(true);
                this._noBattle.setload("allianceweekendview_truce");
            }
            else if (Api.allianceWeekVoApi.checkIsHasExtraTime()) {
                this._npcContainer.setVisible(false);
                this._heroContainer.setVisible(false);
                this._btnContainer.setVisible(false);
                this._battleTimeContainer.setVisible(false);
                this._noBattle.setVisible(true);
                this._noBattle.setload("allianceweekendview_end");
            }
        }
        else {
            this._npcContainer.setVisible(false);
            this._heroContainer.setVisible(false);
            this._btnContainer.setVisible(false);
            this._battleTimeContainer.setVisible(false);
            this._noBattle.setVisible(true);
            this._noBattle.setload("allianceweekendview_end");
        }
    };
    AllianceWeekEndView.prototype.recoverHandle = function (event) {
        if (event.data.ret) {
            this.refreashHero(this._servantId);
        }
    };
    AllianceWeekEndView.prototype.killHandle = function (event) {
        if (event.data.ret) {
            this.refreashEnemy();
        }
    };
    AllianceWeekEndView.prototype.buyBuffHandle = function (event) {
        if (event.data.ret) {
            this.refreashView();
            this.refreashHero(this._servantId);
        }
    };
    AllianceWeekEndView.prototype.playAttackAni = function () {
        var _this = this;
        // this.touchEnabled = true;
        if (this._isAuto) {
            this.addTouchTap(function () {
                _this.autoBattleClick();
                _this._isAuto = false;
                egret.Tween.removeTweens(_this);
                if (_this._servantId) {
                    _this._startGameBtn.setVisible(true);
                    _this._autoBattleBtn.setVisible(true);
                }
                else {
                    _this._startGameBtn.setVisible(false);
                    _this._autoBattleBtn.setVisible(false);
                    _this._isPlayAni = false;
                }
                _this._autoBattleView.setVisible(false);
                _this.removeTouchTap();
            }, this);
        }
        var heroStartX = this._heroContainer.x;
        var heroStartY = this._heroContainer.y;
        var npcStartX = this._npcContainer.x;
        var npcStartY = this._npcContainer.y;
        var offestX = this._heroBM.x - this._npcBM.x - this._npcBM.width / 2 * 0.35;
        var offestY = this._heroBM.y - this._npcBM.y - this._npcBM.height / 2 * 0.35;
        egret.Tween.get(this._heroContainer).to({
            x: this._heroContainer.x + 10,
            y: this._heroContainer.y + 10
        }, 300).to({
            x: this._heroContainer.x - offestX,
            y: this._heroContainer.y - offestY
        }, 60).call(function () {
            SoundManager.playEffect(SoundConst.EFFECT_BATTLE_HIT);
            if (_this._oldBoss) {
                var bossCfg = Config.AllianceweekendCfg.getFoeItemCfgForBossId(_this._oldBoss.id);
                var hp = _this._oldBoss.hp - _this._bossInfo.damage <= 0 ? 0 : Math.round(((_this._oldBoss.hp - _this._bossInfo.damage) / bossCfg.bossHP) * 10000) / 100;
                var hpValue = _this._oldBoss.hp - _this._bossInfo.damage <= 0 ? 0 : Math.round(_this._oldBoss.hp - _this._bossInfo.damage);
                var hpStr = String(hpValue) + "(" + String(hp) + "%" + ")";
                _this._npcHpProgressBar.setPercentage(hpValue / bossCfg.bossHP, hpStr, TextFieldConst.COLOR_WHITE);
            }
            var attackClip = ComponentManager.getCustomMovieClip("atk_anim_", 7, 70);
            // 420 379
            attackClip.setPosition(_this._npcBM.x - 210, _this._npcBM.y - 140);
            _this.addChildToContainer(attackClip);
            attackClip.playWithTime(1);
            attackClip.setEndCallBack(function () {
                _this.container.removeChild(attackClip);
            }, _this);
            var damageText = ComponentManager.getBitmapText("-" + Math.floor(_this._bossInfo.damage).toString(), "damage_fnt", undefined, undefined, true);
            damageText.setPosition(_this._npcBM.x - damageText.width / 2, _this._npcBM.y - damageText.height / 2);
            _this.addChildToContainer(damageText);
            var damageX = damageText.x;
            var damageY = damageText.y;
            egret.Tween.get(damageText).to({ y: damageY - 90 }, 300).to({ y: damageY - 180, alpha: 0.1 }, 600).call(function () {
                var nowBoss = Api.allianceWeekVoApi.getNowBoss();
                var damage = null;
                var score = LanguageManager.getlocal("allianceWeekEndBattleReportViewContribution", [String(_this._bossInfo.score)]);
                var servantInfovo = Api.servantVoApi.getServantObj(_this._servantId);
                if (_this._oldBoss && nowBoss && _this._oldBoss.id == nowBoss.id) {
                    var bossCfg = Config.AllianceweekendCfg.getFoeItemCfgForBossId(nowBoss.id);
                    var hp = Math.round((_this._bossInfo.damage / bossCfg.bossHP) * 10000);
                    if (hp >= 1) {
                        damage = LanguageManager.getlocal("allianceWeekEndBattleReportViewBattleResult1", [servantInfovo.servantName, LanguageManager.getlocal("allianceWeekEndViewNpcName" + nowBoss.id), String(_this._bossInfo.damage), LanguageManager.getlocal("allianceWeekEndViewNpcName" + nowBoss.id), String(hp / 100)]);
                    }
                    else {
                        damage = LanguageManager.getlocal("allianceWeekEndBattleReportViewBattleResult2", [servantInfovo.servantName, LanguageManager.getlocal("allianceWeekEndViewNpcName" + nowBoss.id), String(_this._bossInfo.damage), LanguageManager.getlocal("allianceWeekEndViewNpcName" + nowBoss.id)]);
                    }
                }
                else if (_this._oldBoss && nowBoss && _this._oldBoss.id != nowBoss.id) {
                    var bossCfg = Config.AllianceweekendCfg.getFoeItemCfgForBossId(_this._oldBoss.id);
                    var hp = Math.round((_this._bossInfo.damage / bossCfg.bossHP) * 10000);
                    if (hp >= 1) {
                        damage = LanguageManager.getlocal("allianceWeekEndBattleReportViewBattleResult4", [servantInfovo.servantName, LanguageManager.getlocal("allianceWeekEndViewNpcName" + _this._oldBoss.id), String(_this._bossInfo.damage), LanguageManager.getlocal("allianceWeekEndViewNpcName" + _this._oldBoss.id), String(hp / 100)]);
                    }
                    else {
                        damage = LanguageManager.getlocal("allianceWeekEndBattleReportViewBattleResult5", [servantInfovo.servantName, LanguageManager.getlocal("allianceWeekEndViewNpcName" + _this._oldBoss.id), String(_this._bossInfo.damage), LanguageManager.getlocal("allianceWeekEndViewNpcName" + _this._oldBoss.id)]);
                    }
                }
                else if (!nowBoss) {
                    damage = LanguageManager.getlocal("allianceWeekEndBattleReportViewBattleResult3", [servantInfovo.servantName, LanguageManager.getlocal("allianceWeekEndViewNpcName" + Config.AllianceweekendCfg.lastFoeItemCfg().id), String(_this._bossInfo.damage)]);
                }
                ViewController.getInstance().openView(ViewConst.BASE.ALLIANCEWEEKENDBATTLEREPORTVIEW, { damage: damage, score: score, isAuto: _this._isAuto });
                _this.refreashHero();
                _this.refreashNpc();
                // this.refreashBox();
                _this.refreashView();
                _this.refreashEnemy();
                _this._isPlayAni = false;
                if (_this._isAuto) {
                    egret.Tween.get(_this).wait(2000).call(function () {
                        _this.startGameBtnClick();
                    }, _this);
                }
                else {
                    if (_this._servantId) {
                        _this._startGameBtn.setVisible(true);
                    }
                }
                egret.Tween.removeTweens(damageText);
                _this.container.removeChild(damageText);
            }, _this);
            egret.Tween.get(_this._npcContainer).call(function () {
            }, _this).to({
                x: _this._npcContainer.x - 30,
                y: _this._npcContainer.y - 30
            }, 100).to({
                x: npcStartX,
                y: npcStartY
            }, 120).call(function () {
                egret.Tween.removeTweens(_this._npcContainer);
            }, _this);
        }, this).to({
            x: heroStartX,
            y: heroStartY
        }, 260).call(function () {
            egret.Tween.removeTweens(_this._heroContainer);
        }, this);
    };
    AllianceWeekEndView.prototype.playEnemyProAni = function () {
        var _this = this;
        var killAndSum = Api.allianceWeekVoApi.getKillValueAndSumValue();
        var startPercent = this._enemyProgressBar.getPercent();
        var endPercent = killAndSum.kill / killAndSum.sum;
        this._enemyProgressBar.setPercentage(startPercent);
        egret.Tween.removeTweens(this._enemyProgressBar);
        var posWidthValue = startPercent >= 1 ? 1 : startPercent;
        this._ponitEffect.setPosition(this._enemyProgressBar.x, this._enemyProgressBar.y - this._enemyProgressBar.width / 2 + this._enemyProgressBar.width * startPercent);
        var startTemp = startPercent;
        var endTemp = endPercent;
        var maxTemp = 1;
        var everyTimeValue = 0.01;
        egret.Tween.get(this._enemyProgressBar, { loop: true }).wait(100).call(function () {
            _this._ponitEffect.setVisible(true);
            //增量动画
            startTemp += everyTimeValue;
            if (startTemp > endTemp) {
                egret.Tween.removeTweens(_this._enemyProgressBar);
                _this.refreashEnemyEffect(true);
                _this._ponitEffect.setVisible(false);
                if (startTemp > maxTemp) {
                    egret.Tween.removeTweens(_this._enemyProgressBar);
                    _this._ponitEffect.setVisible(false);
                    return;
                }
                return;
            }
            _this._ponitEffect.setPosition(_this._enemyProgressBar.x, _this._enemyProgressBar.y + _this._enemyProgressBar.width / 2 - _this._enemyProgressBar.width * startTemp);
            _this._enemyProgressBar.setPercentage(startTemp);
        }, this);
    };
    AllianceWeekEndView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "countrywarservantbg", "countrywarservantbg", "progress8", "progress7_bg", "progress7", "progress13_bg", "progress13", "acdailygift_package_bg",
            "common_box_1", "common_box_2", "common_box_3", "common_boxbg", "boss_start_war", "boss_start_war_down", "aobaibottom", "battle_attack_anim",
            "damage_fnt", "acturantable_taskbox_light", "rankbg_1", "rankbg_2", "rankbg_3", "rankbg_4", "rankinglist_rankn1", "rankinglist_rankn2", "rankinglist_rankn3",
            "acrechargeboxview_box1_1", "studyatk_uparrow", "studyatk_upbg", "studyatk_upfnt", "allianceweekendvieweffect", "allianceweekendviewloopeffect",
            "allianceweekendview_point", "acchristmasview_smalldescbg", "allianceweekendview_goldline", "skinshowkuang3", "acwealthcarpeffect"
        ]);
    };
    AllianceWeekEndView.prototype.getSoundBgName = function () {
        return "music_alliancebossbattle";
    };
    AllianceWeekEndView.prototype.getRuleInfo = function () {
        return "allianceWeekEndViewRuleInfo";
    };
    AllianceWeekEndView.prototype.getRuleInfoParam = function () {
        var time = Api.allianceWeekVoApi.formatOpenHour();
        var resetTime = App.DateUtil.formatSvrHourByLocalTimeZone(0);
        return [
            String(Config.AllianceweekendCfg.allianceLv),
            LanguageManager.getlocal("allianceWeekEndViewNpcName" + Config.AllianceweekendCfg.lastFoeItemCfg().id),
            time[0],
            time[1],
            time[1],
            time[0],
            String(resetTime.hour),
        ];
    };
    AllianceWeekEndView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ALLIANCEWEEKEND_SELECTSERVANT, this.selectHandle, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQYEST_ALLIANCEWEEK_ATTACK, this.attackHandle, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ALLIANCEWEEK_GETBOSSRANK, this.bossRankHandle, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQYEST_ALLIANCEWEEK_RECOVER, this.recoverHandle, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQYEST_ALLIANCEWEEK_GETKILLREWARD, this.killHandle, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQYEST_ALLIANCEWEEK_BUYBUFF, this.buyBuffHandle, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQYEST_ALLIANCEWEEK_GETSCOREREWARD, this.scoreHandle, this);
        App.MessageHelper.removeNetMessage("myallianceweek", this.modelHandle, this);
        egret.Tween.removeTweens(this);
        this._topNowStage = null;
        this._contributionValue = null;
        this._enemyProgressBar = null;
        this._boxProgressBar = null;
        this._boxInfoList = [];
        this._enemyInfoList = [];
        this._enemyScollView = null;
        this._enemysvContainer = null;
        // this._topbg2 = null;
        this._topbg = null;
        this._additionbtn = null;
        this._startGameBtn = null;
        this._bg = null;
        this._npcContainer = null;
        this._npcBM = null;
        this._npcHpProgressBar = null;
        this._npcNameBg = null;
        this._npcName = null;
        this._heroContainer = null;
        this._heroBM = null;
        this._heroInfoBg = null;
        this._heroInfoFightTF = null;
        this._heroInfoTipTF = null;
        this._autoBattleBtn = null;
        this._servantId = null;
        this._isPlayAni = false;
        this._isAuto = false;
        this._bossInfo = null;
        this._oldBoss = null;
        this._autoBattleView = null;
        this._studyatk_upbg = null;
        this._studyatk_uparrow = null;
        this._upBF = null;
        this._ponitEffect = null;
        // this._enemybg = null;
        this._enemyEffectList = [];
        this._battleTimeTF = null;
        this._battleTimeBg = null;
        this._battleTimeContainer = null;
        this._btnContainer = null;
        this._noBattle = null;
        this._clip.dispose();
        this._clip = null;
        this._skinnamebg = null;
        this._skinnameTxt = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceWeekEndView;
}(CommonView));
__reflect(AllianceWeekEndView.prototype, "AllianceWeekEndView");
//# sourceMappingURL=AllianceWeekEndView.js.map