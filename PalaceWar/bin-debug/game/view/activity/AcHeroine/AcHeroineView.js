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
 * 巾帼英雄
 * date 2019.11.11
 * author ycg
 * @class AcHeroineView
 */
var AcHeroineView = (function (_super) {
    __extends(AcHeroineView, _super);
    function AcHeroineView() {
        var _this = _super.call(this) || this;
        _this._timeBg = null;
        _this._acTimeTf = null;
        _this._progress = null;
        _this._killNum = null;
        _this._rechargeBtn = null;
        _this._poolBtn = null;
        _this._tokenNum = null;
        _this._freeDesc = null;
        _this._attackNumTxt = null;
        _this._topContainer = null;
        _this._roleContainer = null;
        _this._bottomContainer = null;
        _this._rightContainer = null;
        _this._nameContainer = null;
        _this._startAniStep = 0;
        _this._startBone = null;
        _this._bubbleTip = null;
        _this._attackTipBtn = null;
        _this._attackBtnContainer = null;
        _this._isSelectPlayBtn = false;
        _this._bgContainer = null;
        _this._rewardData = null;
        _this._isShowAtkAni = false;
        _this._isWife = true;
        _this._wifeIcon = null;
        _this._servantSkin = null;
        _this._leader = null;
        _this._enemyList = [];
        _this._wall = null;
        _this._fireEffect = null;
        _this._bg = null;
        _this._leaderFrames = [];
        _this._leaderEndFrames = [];
        _this._oldScore = 0;
        //爆炸位置 左上角
        _this._bombPos = [
            { x: -42, y: 74 },
            { x: 38, y: 125 },
            { x: -58, y: 324 },
            { x: -128, y: 210 },
            { x: 74, y: 154 },
            { x: 9, y: 257 }
        ];
        //弹道位置 中心点
        _this._throwArr = [
            { x: 426, y: 308, ration: 90 },
            { x: 500, y: 449, ration: 120 },
            { x: 418, y: 564, ration: 100 },
            { x: 245, y: 301, ration: 45 },
            { x: 539, y: 509, ration: 135 },
            { x: 456, y: 448, ration: 75 },
        ];
        //敌方小兵位置
        _this._enemyPos = {
            1: { x: 371, y: 386 },
            2: { x: 331, y: 437 },
            3: { x: 246, y: 492 },
            4: { x: 160, y: 527 },
            5: { x: 195, y: 422 },
        };
        return _this;
    }
    AcHeroineView.prototype.initView = function () {
        var _this = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_HEROINE_PLAY, this.playRewardCallback, this);
        //开场动画
        this.showStartAni();
        var bgContainer = new BaseDisplayObjectContainer();
        bgContainer.width = GameConfig.stageWidth;
        bgContainer.height = GameConfig.stageHeigth;
        bgContainer.anchorOffsetX = bgContainer.width / 2;
        bgContainer.anchorOffsetY = bgContainer.height / 2;
        bgContainer.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2);
        this.addChildToContainer(bgContainer);
        this._bgContainer = bgContainer;
        var bgStr = ResourceManager.hasRes("acheroine_bg-" + this.getTypeCode()) ? "acheroine_bg-" + this.getTypeCode() : "acheroine_bg-1";
        var bg = BaseBitmap.create(bgStr);
        bg.setPosition(0, 0);
        bgContainer.addChild(bg);
        this._bg = bg;
        var wallStr = ResourceManager.hasRes("acheroine_wall-" + this.getTypeCode() + "_1") ? "acheroine_wall-" + this.getTypeCode() + "_1" : "acheroine_wall-1_1";
        var wall = BaseBitmap.create(wallStr);
        wall.setPosition(0, 12);
        bgContainer.addChild(wall);
        this._wall = wall;
        var fireStr = ResourceManager.hasRes("acheroine_fire-" + this.getTypeCode() + "_") ? "acheroine_fire-" + this.getTypeCode() + "_" : "acheroine_fire-1_";
        var fireEffect = ComponentManager.getCustomMovieClip(fireStr, 12, 90);
        fireEffect.setPosition(28, 116);
        bgContainer.addChild(fireEffect);
        fireEffect.playWithTime(0);
        this._fireEffect = fireEffect;
        this._fireEffect.visible = false;
        //首领
        var leaderStr = ResourceManager.hasRes("acheroine_leader_effect-" + this.getTypeCode() + "_") ? "acheroine_leader_effect-" + this.getTypeCode() + "_" : "acheroine_leader_effect-1_";
        for (var i = 1; i <= 5; i++) {
            this._leaderFrames.push(leaderStr + i);
        }
        this._leaderEndFrames = [leaderStr + 6];
        var leader = ComponentManager.getCustomMovieClip(leaderStr, 5, 90);
        leader.setPosition(498, 594);
        bgContainer.addChild(leader);
        leader.playWithTime(0);
        this._leader = leader;
        var topContainer = new BaseDisplayObjectContainer();
        topContainer.setPosition(0, this.titleBg.y + this.titleBg.height - 7);
        this.addChildToContainer(topContainer);
        this._topContainer = topContainer;
        //infoBg
        var infoBg = BaseBitmap.create("punish_infobg-12");
        infoBg.width = GameConfig.stageWidth;
        infoBg.setPosition(this.titleBg.x + this.titleBg.width / 2 - infoBg.width / 2, 0);
        topContainer.addChild(infoBg);
        //活动时间
        var acDate = ComponentManager.getTextField(LanguageManager.getlocal("acHeroineTime", [this.vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        acDate.setPosition(infoBg.x + 20, infoBg.y + 10);
        topContainer.addChild(acDate);
        //活动说明
        var acDesc = ComponentManager.getTextField(LanguageManager.getlocal("acHeroineInfo-" + this.getTypeCode()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        acDesc.setPosition(acDate.x, acDate.y + acDate.height + 6);
        acDesc.width = 600;
        acDesc.lineSpacing = 6;
        topContainer.addChild(acDesc);
        infoBg.height = acDate.height + acDesc.height + 50;
        //倒计时
        this._timeBg = BaseBitmap.create("public_9_bg61");
        this._timeBg.y = infoBg.y + infoBg.height - this._timeBg.height / 2 - 2;
        topContainer.addChild(this._timeBg);
        this._acTimeTf = ComponentManager.getTextField(LanguageManager.getlocal("acHeroineTimeCountDown", [this.vo.getCountDown()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._timeBg.width = 60 + this._acTimeTf.width;
        this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 5;
        this._acTimeTf.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._acTimeTf.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._acTimeTf.height / 2);
        topContainer.addChild(this._acTimeTf);
        //战斗名字
        var fightNameBg = BaseBitmap.create("acheroine_fightname_bg");
        fightNameBg.setPosition(infoBg.x + infoBg.width / 2 - fightNameBg.width / 2, infoBg.y + infoBg.height + 15);
        topContainer.addChild(fightNameBg);
        var fightName = ComponentManager.getTextField(LanguageManager.getlocal("acHeroineFightName-" + this.getTypeCode()), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        fightName.setPosition(fightNameBg.x + fightNameBg.width / 2 - fightName.width / 2, fightNameBg.y + fightNameBg.height / 2 - fightName.height / 2);
        topContainer.addChild(fightName);
        //bottom
        var bottomBg = BaseBitmap.create("acthrowstone_wall-1");
        var bottomContainer = new BaseDisplayObjectContainer();
        bottomContainer.setPosition(GameConfig.stageWidth / 2 - bottomBg.width / 2, GameConfig.stageHeigth - bottomBg.height + bottomBg.height / 2 + 15);
        bottomBg.setPosition(0, 0);
        bottomContainer.addChild(bottomBg);
        this._bottomContainer = bottomContainer;
        var nameContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(nameContainer);
        this._nameContainer = nameContainer;
        var nameBg = BaseBitmap.create("acheroine_rolename_bg");
        nameContainer.addChild(nameBg);
        var wifeId = this.cfg.show1;
        var wifeCfg = Config.WifeCfg.getWifeCfgById(wifeId);
        var servantCfg = Config.ServantCfg.getServantItemById(wifeCfg.servantId);
        var roleName = ComponentManager.getTextField(servantCfg.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        nameBg.width = roleName.width + 30;
        nameContainer.width = nameBg.width;
        nameContainer.setPosition(GameConfig.stageWidth - nameBg.width - 30, 555);
        roleName.setPosition(nameBg.x + nameBg.width / 2 - roleName.width / 2, nameBg.y + nameBg.height / 2 - roleName.height / 2 + 2);
        nameContainer.addChild(roleName);
        //佳人
        var roleContainer = new BaseDisplayObjectContainer();
        roleContainer.setPosition(0, bottomContainer.y);
        this.addChildToContainer(roleContainer);
        this._roleContainer = roleContainer;
        var skinId = this.cfg.show1;
        App.LogUtil.log("skinId: " + skinId);
        var skinCfg = Config.WifeCfg.getWifeCfgById(skinId);
        var boneName = skinCfg.bone + "_ske";
        var wife = null;
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            wife = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
            wife.setScale(0.75); //0.53
            wife.anchorOffsetY = wife.height;
            wife.anchorOffsetX = wife.width / 2;
            wife.x = roleContainer.x + bottomBg.width / 4 + 15;
            wife.y = 40;
        }
        else {
            wife = BaseLoadBitmap.create(skinCfg.body);
            wife.width = 640;
            wife.height = 840;
            wife.setScale(0.5);
            wife.anchorOffsetY = wife.height;
            wife.anchorOffsetX = wife.width / 2;
            wife.x = roleContainer.x + bottomBg.width / 4;
            wife.y = 15;
        }
        wife.name = "wife";
        roleContainer.addChild(wife);
        wife.visible = true;
        this._wifeIcon = wife;
        var servantSkinId = this.cfg.show2;
        App.LogUtil.log("servantSkinId: " + servantSkinId);
        var serSkinCfg = Config.ServantskinCfg.getServantSkinItemById(servantSkinId);
        var serSkinBoneName = serSkinCfg.bone + "_ske";
        var servantSkin = null;
        if ((!Api.switchVoApi.checkCloseBone()) && serSkinBoneName && RES.hasRes(serSkinBoneName) && App.CommonUtil.check_dragon()) {
            servantSkin = App.DragonBonesUtil.getLoadDragonBones(serSkinCfg.bone);
            servantSkin.setScale(0.9); //0.53
            servantSkin.anchorOffsetY = servantSkin.height;
            servantSkin.anchorOffsetX = servantSkin.width / 2;
            servantSkin.x = roleContainer.x + bottomBg.width / 4 + 15;
            servantSkin.y = 13;
        }
        else {
            servantSkin = BaseLoadBitmap.create(serSkinCfg.body);
            servantSkin.width = 406;
            servantSkin.height = 467;
            servantSkin.setScale(0.9);
            servantSkin.anchorOffsetY = servantSkin.height;
            servantSkin.anchorOffsetX = servantSkin.width / 2;
            servantSkin.x = roleContainer.x + bottomBg.width / 4;
            servantSkin.y = 15;
        }
        servantSkin.name = "servantSkin";
        servantSkin.visible = false;
        this._servantSkin = servantSkin;
        roleContainer.addChild(servantSkin);
        this.addChildToContainer(bottomContainer);
        //衣装预览
        var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
        skinTxtEffect.width = 208;
        skinTxtEffect.height = 154;
        skinTxtEffect.setPosition(bottomBg.width / 4 - skinTxtEffect.width / 2 + 20, -90);
        skinTxtEffect.blendMode = egret.BlendMode.ADD;
        roleContainer.addChild(skinTxtEffect);
        skinTxtEffect.playWithTime(-1);
        var skinTxt = BaseBitmap.create("acgiftreturnview_common_skintxt");
        skinTxt.anchorOffsetX = skinTxt.width / 2;
        skinTxt.anchorOffsetY = skinTxt.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect);
        roleContainer.addChild(skinTxt);
        egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
        var skinTxteffect = BaseBitmap.create("acgiftreturnview_common_skintxt");
        skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
        skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxteffect, skinTxtEffect);
        roleContainer.addChild(skinTxteffect);
        skinTxteffect.blendMode = egret.BlendMode.ADD;
        skinTxteffect.alpha = 0;
        egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        skinTxteffect.addTouchTap(function () {
            if (_this._isWife) {
                ViewController.getInstance().openView(ViewConst.POPUP.ACHEROINEREWARDPOPUPVIEWTAB3, { aid: _this.aid, code: _this.code });
            }
            else {
                ViewController.getInstance().openView(ViewConst.POPUP.ACHEROINEREWARDPOPUPVIEWTAB2, { aid: _this.aid, code: _this.code });
            }
        }, this);
        //军令数量
        var rightContainer = new BaseDisplayObjectContainer();
        rightContainer.setPosition(0, bottomContainer.y);
        this.addChildToContainer(rightContainer);
        this._rightContainer = rightContainer;
        var tokenNumBg = BaseBitmap.create("public_9_resbg");
        tokenNumBg.setPosition(bottomBg.width - tokenNumBg.width - 25, -tokenNumBg.height - 10);
        rightContainer.addChild(tokenNumBg);
        var tokenIconStr = ResourceManager.hasRes("acheroine_smallitemicon-" + this.getTypeCode()) ? "acheroine_smallitemicon-" + this.getTypeCode() : "acheroine_smallitemicon-1";
        var tokenIcon = BaseBitmap.create(tokenIconStr);
        tokenIcon.setPosition(tokenNumBg.x + 1, tokenNumBg.y + tokenNumBg.height / 2 - tokenIcon.height / 2);
        rightContainer.addChild(tokenIcon);
        var currTokenNum = this.vo.getToolNum();
        var tokenNum = ComponentManager.getTextField("" + currTokenNum, TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_WHITE);
        tokenNum.anchorOffsetX = tokenNum.width / 2;
        tokenNum.setPosition(tokenNumBg.x + 55 + 25, tokenNumBg.y + tokenNumBg.height / 2 - tokenNum.height / 2 + 2);
        rightContainer.addChild(tokenNum);
        this._tokenNum = tokenNum;
        //不可攻击按钮
        var attackTipBtn = BaseBitmap.create("acheroine_fightbtn");
        attackTipBtn.setPosition(GameConfig.stageWidth - attackTipBtn.width - 10, tokenNumBg.y - attackTipBtn.height - 10);
        rightContainer.addChild(attackTipBtn);
        this._attackTipBtn = attackTipBtn;
        //攻击按钮
        var attackBtnContainer = new BaseDisplayObjectContainer();
        attackBtnContainer.width = 200;
        attackBtnContainer.height = 230;
        attackBtnContainer.setPosition(attackTipBtn.x, tokenNumBg.y - attackBtnContainer.height - 10);
        rightContainer.addChild(attackBtnContainer);
        this._attackBtnContainer = attackBtnContainer;
        var attackEffect = ComponentManager.getCustomMovieClip("acheroine_atkbtn_effect", 8, 70);
        attackEffect.setPosition(0, 0);
        attackBtnContainer.addChild(attackEffect);
        attackEffect.playWithTime(0);
        var attackBtn = BaseBitmap.create("public_alphabg");
        attackBtn.width = attackBtnContainer.width;
        attackBtn.height = attackBtnContainer.height;
        attackBtn.setPosition(attackTipBtn.x, tokenNumBg.y - attackBtnContainer.height - 20);
        rightContainer.addChild(attackBtn);
        attackBtn.addTouchTap(this.attackBtnClick, this);
        var attackNumTxt = BaseBitmap.create("acheroine_fight_numtxt1");
        attackNumTxt.setPosition(attackTipBtn.x + attackTipBtn.width / 2 - attackNumTxt.width / 2 + 2, attackTipBtn.y + attackTipBtn.height - attackNumTxt.height);
        rightContainer.addChild(attackNumTxt);
        this._attackNumTxt = attackNumTxt;
        var freeDesc = BaseBitmap.create("acheroine_free");
        freeDesc.setPosition(attackTipBtn.x + attackTipBtn.width / 2 - freeDesc.width / 2 + 3, attackTipBtn.y + attackTipBtn.height / 2 - freeDesc.height / 2 + 5);
        rightContainer.addChild(freeDesc);
        this._freeDesc = freeDesc;
        if (this.vo.isFree()) {
            freeDesc.visible = true;
        }
        else {
            freeDesc.visible = false;
        }
        if (currTokenNum > 0 || this.vo.isFree()) {
            attackTipBtn.visible = false;
            attackBtnContainer.visible = true;
            attackNumTxt.setRes("acheroine_fight_numtxt1");
            if (!this.vo.isFree() && currTokenNum >= 10) {
                attackNumTxt.setRes("acheroine_fight_numtxt2");
            }
        }
        else {
            attackTipBtn.visible = true;
            attackBtnContainer.visible = false;
            attackNumTxt.setRes("acheroine_fight_numtxt1");
        }
        //进度条
        var progress = ComponentManager.getProgressBar("progress3", "progress3_bg", 430);
        progress.setPosition(GameConfig.stageWidth / 2 - progress.width / 2, fightNameBg.y + fightNameBg.height + 20);
        topContainer.addChild(progress);
        this._progress = progress;
        var currPer = this.vo.getScore() / this.cfg.totalHP;
        if (currPer > 1) {
            currPer = 1;
        }
        progress.setPercentage(currPer);
        //杀敌数
        var killNumBg = BaseBitmap.create("acarcherview_numBg");
        killNumBg.setPosition(progress.x - killNumBg.width, progress.y - 35);
        topContainer.addChild(killNumBg);
        var killNumTitle = ComponentManager.getTextField(LanguageManager.getlocal("acHeroineFightNumTitle-" + this.getTypeCode()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        killNumTitle.setPosition(killNumBg.x + killNumBg.width / 2 - killNumTitle.width / 2, killNumBg.y + killNumBg.height - 20);
        topContainer.addChild(killNumTitle);
        var killNum = ComponentManager.getTextField(LanguageManager.getlocal("acHeroineFightNum-" + this.getTypeCode(), ["" + (currPer * 100).toFixed(0)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        killNum.anchorOffsetX = killNum.width / 2;
        killNum.setPosition(killNumBg.x + killNumBg.width / 2, killNumBg.y + 10);
        topContainer.addChild(killNum);
        this._killNum = killNum;
        //充值任务
        var rechargeBtn = ComponentManager.getButton("acheroine_rechargebtn", "", function () {
            //充值
            ViewController.getInstance().openView(ViewConst.POPUP.ACHEROINEREWARDPOPUPVIEW, { aid: _this.aid, code: _this.code });
            _this.changeRole();
        }, this);
        rechargeBtn.setPosition(15, topContainer.y + progress.y + progress.height + 15);
        this.addChildToContainer(rechargeBtn);
        this._rechargeBtn = rechargeBtn;
        if (this.vo.isShowRechargeRedDot()) {
            App.CommonUtil.addIconToBDOC(this._rechargeBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._rechargeBtn);
        }
        //奖池展示
        var poolBtn = ComponentManager.getButton("acheroine_rewardpoolbtn", "", function () {
            //奖池
            var topMsg = LanguageManager.getlocal("acHeroineRewardPoolTopMsg-" + _this.getTypeCode());
            var titleTxt = "acHeroineRewardPoolTitle";
            var rewards = _this.cfg.getPoolRewards();
            ViewController.getInstance().openView(ViewConst.POPUP.ACTRAVELWITHBEAUTYPOOLREWARDPOPUPVIEW, { rewards: rewards, topMsg: topMsg, title: titleTxt });
        }, this);
        poolBtn.setPosition(rechargeBtn.x, rechargeBtn.y + rechargeBtn.height + 10);
        this.addChildToContainer(poolBtn);
        this._poolBtn = poolBtn;
        //宝箱
        this.initBox();
        this.freshBox();
        //对话
        this.showBubbleTip();
        //敌方
        this.initEnemy();
        this.freshEnemy();
        this.freshWall();
    };
    //攻击按钮
    AcHeroineView.prototype.attackBtnClick = function () {
        if (!this.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (this._isSelectPlayBtn) {
            return;
        }
        var freeFlag = 0;
        if (this.vo.isFree()) {
            freeFlag = 1;
        }
        if (freeFlag == 0) {
            //在此判断道具是否足够
            if (this.vo.getToolNum() <= 0) {
                this.showRechargeTipView();
                return;
            }
        }
        this._isSelectPlayBtn = true;
        var playTenFlag = 0;
        if (this.vo.getToolNum() >= 10) {
            playTenFlag = 1;
        }
        if (freeFlag == 1) {
            playTenFlag = 0;
        }
        this._oldScore = this.vo.getScore();
        //调接口
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_HEROINE_PLAY, { activeId: this.vo.aidAndCode, isBatch: playTenFlag });
    };
    AcHeroineView.prototype.playRewardCallback = function (evt) {
        App.LogUtil.log("playRewardCallback: " + evt.data.ret + " status: " + evt.data.data.ret);
        if (evt && evt.data && evt.data.ret) {
            var rData = evt.data.data.data;
            this._rewardData = rData;
            //血量为0直接弹奖励
            App.LogUtil.log("this.vo.getScore(): " + this.vo.getScore());
            App.LogUtil.log("totalHp: " + this.cfg.totalHP);
            if (this._oldScore >= this.cfg.totalHP) {
                this._isShowAtkAni = false;
                this.showPlayReward();
            }
            else {
                this._isShowAtkAni = true;
                this.playUIAni(true);
                this.playAtkMaskAni();
            }
        }
        else {
            this._isSelectPlayBtn = false;
        }
    };
    //攻击前特效
    AcHeroineView.prototype.playAtkMaskAni = function () {
        var _this = this;
        App.LogUtil.log("playAtkmaskANi");
        var atkMaskContainer = new BaseDisplayObjectContainer();
        atkMaskContainer.width = GameConfig.stageWidth;
        atkMaskContainer.height = GameConfig.stageHeigth;
        this.addChildToContainer(atkMaskContainer);
        var mask = BaseBitmap.create("public_9_viewmask");
        mask.width = GameConfig.stageWidth;
        mask.height = GameConfig.stageHeigth;
        atkMaskContainer.addChild(mask);
        mask.touchEnabled = true;
        //role
        var skinId = this.cfg.show2;
        // let skinCfg = Config.WifeCfg.getWifeCfgById(skinId);
        // let roleBone = skinCfg.bone + "_ske";
        // let wife = null;
        // if ((!Api.switchVoApi.checkCloseBone()) && roleBone && RES.hasRes(roleBone) && App.CommonUtil.check_dragon()) {
        //     wife = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
        //     wife.setScale(0.7);  //0.53
        //     wife.anchorOffsetY = wife.height;
        //     wife.anchorOffsetX = wife.width / 2;
        //     wife.x = -200;
        //     wife.y = atkMaskContainer.height - 360;
        // }
        // else {
        //     wife = BaseLoadBitmap.create(skinCfg.body);
        //     wife.width = 640;
        //     wife.height = 840;
        //     wife.setScale(0.6);
        //     wife.anchorOffsetY = wife.height;
        //     wife.anchorOffsetX = wife.width / 2;
        //     wife.x = -200;
        //     wife.y = atkMaskContainer.height - 330;
        // }
        // atkMaskContainer.addChild(wife);
        var serSkinCfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
        var serSkinBoneName = serSkinCfg.bone + "_ske";
        var servantSkin = null;
        if ((!Api.switchVoApi.checkCloseBone()) && serSkinBoneName && RES.hasRes(serSkinBoneName) && App.CommonUtil.check_dragon()) {
            servantSkin = App.DragonBonesUtil.getLoadDragonBones(serSkinCfg.bone);
            servantSkin.setScale(0.9); //0.53
            servantSkin.anchorOffsetY = servantSkin.height;
            servantSkin.anchorOffsetX = servantSkin.width / 2;
            servantSkin.x = -200;
            servantSkin.y = atkMaskContainer.height - 360;
        }
        else {
            servantSkin = BaseLoadBitmap.create(serSkinCfg.body);
            servantSkin.width = 406;
            servantSkin.height = 467;
            servantSkin.setScale(0.9);
            servantSkin.anchorOffsetY = servantSkin.height;
            servantSkin.anchorOffsetX = servantSkin.width / 2;
            servantSkin.x = -200;
            servantSkin.y = atkMaskContainer.height - 330;
        }
        atkMaskContainer.addChild(servantSkin);
        var atkTxtContainer = new BaseDisplayObjectContainer();
        atkTxtContainer.setPosition(GameConfig.stageWidth, atkMaskContainer.height - 260); // 150
        var skillBone = "acheroineview_skill";
        var boneName = skillBone + "_ske";
        var skillDragone = null;
        var skillBg = null;
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            skillDragone = App.DragonBonesUtil.getLoadDragonBones(skillBone, 1, null, function () {
                // 1800
                egret.Tween.get(servantSkin).wait(100).to({ x: 150 }, 250).wait(800).to({ x: GameConfig.stageWidth + 200, y: atkMaskContainer.height - 450 }, 200);
                //1750
                egret.Tween.get(atkTxtContainer).wait(100).to({ x: 150 }, 350).wait(750).to({ x: -GameConfig.stageWidth }, 200).call(function () {
                    atkMaskContainer.dispose();
                    _this.playAtkAni();
                });
            }, this);
            skillDragone.setPosition(0, atkMaskContainer.height - 1060);
            atkMaskContainer.addChild(skillDragone);
        }
        else {
            skillBg = BaseBitmap.create("acheroine_light");
            skillBg.setPosition(GameConfig.stageWidth / 2 - skillBg.width / 2, GameConfig.stageHeigth - 540);
            atkMaskContainer.addChild(skillBg);
        }
        atkMaskContainer.addChild(atkTxtContainer);
        var txtEffect = ComponentManager.getCustomMovieClip("acheroine_atktext_effect", 10, 70);
        txtEffect.setPosition(0, -120);
        txtEffect.playWithTime(0);
        atkTxtContainer.addChild(txtEffect);
        var atkTxtStr = ResourceManager.hasRes("acheroine_start_attack_txt-" + this.getTypeCode()) ? "acheroine_start_attack_txt-" + this.getTypeCode() : "acheroine_start_attack_txt-1";
        var atkTxt = BaseBitmap.create(atkTxtStr);
        atkTxt.setPosition(80, 20);
        atkTxtContainer.addChild(atkTxt);
        atkTxt.blendMode = egret.BlendMode.ADD;
        //播放完成 隐藏 播击打特效
        if (skillBg) {
            egret.Tween.get(servantSkin).wait(250).to({ x: 150 }, 250).wait(600).to({ x: GameConfig.stageWidth + 200, y: atkMaskContainer.height - 450 }, 220);
            egret.Tween.get(atkTxtContainer).wait(200).to({ x: 150 }, 300).wait(600).to({ x: -GameConfig.stageWidth }, 220).call(function () {
                atkMaskContainer.dispose();
                _this.playAtkAni();
            });
        }
    };
    //击打特效
    AcHeroineView.prototype.playAtkAni = function () {
        var view = this;
        view._leader.frameImages = view._leaderEndFrames;
        egret.Tween.get(view._bgContainer).to({ scaleX: 1.3, scaleY: 1.3 }, 800, egret.Ease.sineIn).wait(300).
            call(function () {
            //打击特效 498 594
            view.playBgAni();
            var _loop_1 = function (i) {
                egret.Tween.get(view._bg).wait(200 * i).call(function () {
                    view.playFireAni(i);
                });
            };
            for (var i = 0; i < 6; i++) {
                _loop_1(i);
            }
        });
    };
    //攻击结束特效
    AcHeroineView.prototype.playAtkEndAni = function () {
        this._leader.frameImages = this._leaderFrames;
        egret.Tween.get(this._bgContainer).to({ scaleX: 1, scaleY: 1 }, 500);
        this.playUIAni(false);
    };
    AcHeroineView.prototype.playFireAni = function (index) {
        var view = this;
        var throwEffectStr = ResourceManager.hasRes("acheroine_fire_throw-" + this.getTypeCode() + "_") ? "acheroine_fire_throw-" + this.getTypeCode() + "_" : "acheroine_fire_throw-1_";
        var throwEffect = ComponentManager.getCustomMovieClip(throwEffectStr, 12, 70);
        throwEffect.anchorOffsetX = 159 / 2;
        throwEffect.anchorOffsetY = 527 / 2;
        throwEffect.rotation = view._throwArr[index].ration;
        throwEffect.setPosition(view._throwArr[index].x, view._throwArr[index].y);
        view._bgContainer.addChild(throwEffect);
        throwEffect.playWithTime(1);
        throwEffect.setEndCallBack(function () {
            //     let bombEffect = ComponentManager.getCustomMovieClip("acheroine_fire_bomb-1_", 9, 70);
            //     bombEffect.setPosition(view._bombPos[index].x, view._bombPos[index].y);
            //     bombEffect.playWithTime(1);
            //     view._bgContainer.addChild(bombEffect);
            //     if (index == 0){
            //         view.playEnemyAni();
            //     }
            //     bombEffect.setEndCallBack(()=>{
            //         if(index == 5){
            //             view.showPlayReward();
            //             egret.Tween.removeTweens(view._bgContainer);
            //             view._bgContainer.setPosition(GameConfig.stageWidth/2, GameConfig.stageHeigth/2);
            //         }
            //         bombEffect.dispose();
            //     }, view);
            throwEffect.dispose();
        }, view);
        var bombEffectStr = ResourceManager.hasRes("acheroine_fire_bomb-" + this.getTypeCode() + "_") ? "acheroine_fire_bomb-" + this.getTypeCode() + "_" : "acheroine_fire_bomb-1_";
        egret.Tween.get(view).wait(500).call(function () {
            var bombEffect = ComponentManager.getCustomMovieClip(bombEffectStr, 9, 70);
            bombEffect.setPosition(view._bombPos[index].x, view._bombPos[index].y);
            bombEffect.playWithTime(1);
            view._bgContainer.addChild(bombEffect);
            view.playEnemyAni();
            bombEffect.setEndCallBack(function () {
                if (index == 5) {
                    view.showPlayReward();
                    egret.Tween.removeTweens(view._bgContainer);
                    view._bgContainer.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2);
                }
                bombEffect.dispose();
            }, view);
        });
    };
    AcHeroineView.prototype.playBgAni = function () {
        var _this = this;
        var value = 6;
        var offset = 0;
        var posX = this._bgContainer.x;
        var posY = this._bgContainer.y;
        egret.Tween.get(this._bgContainer, { loop: true }).call(function () {
            var random = value * Math.random();
            var op = Math.random() > 0.5 ? -1 : 1;
            offset = random * op;
            _this._bgContainer.setPosition(posX + offset, posY + offset);
        }, this).wait(5);
    };
    AcHeroineView.prototype.showPlayReward = function () {
        var rData = this._rewardData;
        if (rData) {
            var view_1 = this;
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rData.rewards, "isPlayAni": true, "callback": function () {
                    if (view_1._isShowAtkAni) {
                        view_1.playAtkEndAni();
                    }
                    view_1.freshEnemy();
                    view_1.freshWall();
                    view_1._isSelectPlayBtn = false;
                } });
            if (rData.replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": rData.replacerewards });
            }
        }
    };
    //宝箱
    AcHeroineView.prototype.initBox = function () {
        var data = this.cfg.getAchievementList();
        var maxRate = this.vo.getMaxAchieveNeedNum();
        var dataLength = data.length;
        for (var i = 0; i < data.length; i++) {
            var boxBg = BaseBitmap.create("acheroine_boxbg1");
            var scale = 1.2;
            boxBg.setScale(scale);
            boxBg.setPosition(this._progress.x + this._progress.width * data[i].ratetime / maxRate - boxBg.width * boxBg.scaleX / 2, this._progress.y + this._progress.height / 2 - boxBg.height * boxBg.scaleY / 2);
            this._topContainer.addChild(boxBg);
            boxBg.name = "boxBg" + i;
            var boxEffect = ComponentManager.getCustomMovieClip("motherdayboxloop1-", 10, 70);
            boxEffect.width = 86;
            boxEffect.height = 85;
            // boxEffect.playWithTime(0);
            boxEffect.name = "boxEffect" + i;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, boxEffect, boxBg, [0, 0]);
            boxEffect.visible = false;
            this._topContainer.addChild(boxEffect);
            var box = BaseBitmap.create("acturantable_task_box2_1");
            box.setScale(0.8);
            box.anchorOffsetX = box.width / 2;
            box.anchorOffsetY = box.height / 2;
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, box, boxBg, [0, 0]);
            box.setPosition(boxBg.x + boxBg.width * boxBg.scaleX / 2, boxBg.y + boxBg.height * boxBg.scaleY / 2);
            this._topContainer.addChild(box);
            box.name = "box" + i;
            if (i == dataLength - 1) {
                boxBg.setScale(1);
                boxBg.setRes("acheroine_boxbg");
                boxBg.setPosition(this._progress.x + this._progress.width * data[i].ratetime / maxRate - 7, this._progress.y + this._progress.height / 2 - boxBg.height * boxBg.scaleY / 2);
                boxEffect.setScale(1.5);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, boxEffect, boxBg, [0, 0]);
                box.setRes("motherdayfinalbox1-1");
                box.setScale(1);
                box.anchorOffsetX = box.width / 2;
                box.anchorOffsetY = box.height / 2;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, box, boxBg, [0, -5]);
                var boxTxt = BaseBitmap.create("acheroine_bigbox_txt");
                boxTxt.setPosition(boxBg.x + boxBg.width * boxBg.scaleX / 2 - boxTxt.width / 2, boxBg.y + boxBg.height * boxBg.scaleY - boxTxt.height / 2 - 15);
                this._topContainer.addChild(boxTxt);
            }
            boxBg.addTouchTap(this.boxClick, this, [i]);
        }
    };
    AcHeroineView.prototype.freshBox = function () {
        var data = this.cfg.getAchievementList();
        var currRate = this.vo.getScore() * 100 / this.cfg.totalHP;
        for (var i = 0; i < data.length; i++) {
            var box = this._topContainer.getChildByName("box" + i);
            var boxEffect = this._topContainer.getChildByName("boxEffect" + i);
            if (this.vo.isGetAchievementById(data[i].id)) {
                //已领取
                egret.Tween.removeTweens(box);
                boxEffect.visible = false;
                if (i == data.length - 1) {
                    box.setRes("motherdayfinalbox2-1");
                }
                else {
                    box.setRes("acturantable_task_box2_3");
                }
            }
            else {
                if (data[i].ratetime <= currRate) {
                    //可领取
                    boxEffect.visible = true;
                    boxEffect.playWithTime(0);
                    if (i == data.length - 1) {
                        box.setRes("motherdayfinalbox2-1");
                    }
                    else {
                        box.setRes("acturantable_task_box2_2");
                    }
                    egret.Tween.get(box, { loop: true }).to({ rotation: 10 }, 50).to({ rotation: -10 }, 100).to({ rotation: 10 }, 100).to({ rotation: 0 }, 50).wait(500);
                }
                else {
                    //不可领取
                    egret.Tween.removeTweens(box);
                    boxEffect.visible = false;
                    if (i == data.length - 1) {
                        box.setRes("motherdayfinalbox1-1");
                    }
                    else {
                        box.setRes("acturantable_task_box2_1");
                    }
                }
            }
        }
    };
    AcHeroineView.prototype.boxClick = function (target, index) {
        App.LogUtil.log("boxClick: " + index);
        ViewController.getInstance().openView(ViewConst.POPUP.ACHEROINEACHIEVEMENTPOPUPVIEW, { aid: this.aid, code: this.code, id: index + 1 });
        this.changeRole();
    };
    //敌方
    AcHeroineView.prototype.initEnemy = function () {
        this._enemyList = [];
        var count = 5;
        for (var i = 1; i <= count; i++) {
            var enemyBgStr = ResourceManager.hasRes("acheroine_enemy-" + this.getTypeCode() + "_" + i) ? "acheroine_enemy-" + this.getTypeCode() + "_" + i : "acheroine_enemy-1_" + i;
            var enemy = BaseBitmap.create(enemyBgStr);
            enemy.setPosition(this._enemyPos[i].x, this._enemyPos[i].y);
            this._bgContainer.addChild(enemy);
            this._enemyList.push(enemy);
        }
    };
    AcHeroineView.prototype.freshEnemy = function () {
        var currRate = this.vo.getScore() * 100 / this.cfg.totalHP;
        var data = this.cfg.getAchievementList();
        for (var i = 0; i < data.length; i++) {
            this._enemyList[i].visible = true;
            if (currRate >= data[i].ratetime) {
                this._enemyList[i].visible = false;
            }
        }
    };
    AcHeroineView.prototype.playEnemyAni = function () {
        var dataLength = this._enemyList.length;
        for (var i = 0; i < dataLength; i++) {
            if (this._enemyList[i].visible == true && i < dataLength - 1) {
                egret.Tween.get(this._enemyList[i]).to({ x: this._enemyPos[i + 1].x - 15, y: this._enemyPos[i + 1].y - 15 }, 50, egret.Ease.sineIn).to({ x: this._enemyPos[i + 1].x, y: this._enemyPos[i + 1].y }, 300, egret.Ease.sineOut);
            }
        }
    };
    //刷新城墙
    AcHeroineView.prototype.freshWall = function () {
        var currRate = this.vo.getScore() / this.cfg.totalHP;
        var wallNum = 1;
        var isNeedFire = false;
        if (currRate < 0.2) {
            wallNum = 1;
        }
        else if (currRate < 0.5) {
            wallNum = 2;
        }
        else if (currRate < 0.8) {
            wallNum = 3;
            isNeedFire = true;
        }
        else {
            wallNum = 4;
            isNeedFire = true;
        }
        var wallStr = ResourceManager.hasRes("acheroine_wall-" + this.getTypeCode() + "_" + wallNum) ? "acheroine_wall-" + this.getTypeCode() + "_" + wallNum : "acheroine_wall-1_" + wallNum;
        this._wall.setRes(wallStr);
        if (isNeedFire) {
            this._fireEffect.visible = true;
        }
        else {
            this._fireEffect.visible = false;
        }
    };
    //刷新面板
    AcHeroineView.prototype.refreshView = function () {
        var currRate = this.vo.getScore() / this.cfg.totalHP;
        if (currRate > 1) {
            currRate = 1;
        }
        this._killNum.text = LanguageManager.getlocal("acHeroineFightNum-" + this.getTypeCode(), ["" + (currRate * 100).toFixed(0)]);
        this._killNum.anchorOffsetX = this._killNum.width / 2;
        this._progress.setPercentage(currRate);
        var currTokenNum = this.vo.getToolNum();
        this._tokenNum.text = "" + currTokenNum;
        this._tokenNum.anchorOffsetX = this._tokenNum.width / 2;
        //攻击按钮
        if (this.vo.isFree()) {
            this._freeDesc.visible = true;
        }
        else {
            this._freeDesc.visible = false;
        }
        if (currTokenNum > 0 || this.vo.isFree()) {
            this._attackTipBtn.visible = false;
            this._attackBtnContainer.visible = true;
            this._attackNumTxt.setRes("acheroine_fight_numtxt1");
            if (!this.vo.isFree() && currTokenNum >= 10) {
                this._attackNumTxt.setRes("acheroine_fight_numtxt2");
            }
        }
        else {
            this._attackTipBtn.visible = true;
            this._attackBtnContainer.visible = false;
            this._attackNumTxt.setRes("acheroine_fight_numtxt1");
        }
        //红点
        if (this.vo.isShowRechargeRedDot()) {
            App.CommonUtil.addIconToBDOC(this._rechargeBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._rechargeBtn);
        }
        this.freshBox();
        // this.freshEnemy();
        // this.freshWall();
    };
    AcHeroineView.prototype.showRechargeTipView = function () {
        var _this = this;
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
            title: "acHeroineRechargeTipTitle-" + this.getTypeCode(),
            msg: LanguageManager.getlocal("acHeroineRechargeTipMsg-" + this.getTypeCode()),
            callback: function () {
                ViewController.getInstance().openView(ViewConst.POPUP.ACHEROINEREWARDPOPUPVIEW, { aid: _this.aid, code: _this.code });
            },
            handler: this,
            needCancel: true,
        });
    };
    //ui出入动效
    AcHeroineView.prototype.playUIAni = function (isOut) {
        var _this = this;
        if (isOut) {
            this._bubbleTip.visible = false;
            egret.Tween.get(this._topContainer).to({ y: -400, alpha: 0 }, 200).call(function () { _this._topContainer.visible = false; });
            egret.Tween.get(this._rechargeBtn).to({ x: -100, alpha: 0 }, 50).call(function () { _this._rechargeBtn.visible = false; });
            egret.Tween.get(this._poolBtn).to({ x: -100, alpha: 0 }, 50).call(function () { _this._poolBtn.visible = false; });
            egret.Tween.get(this._roleContainer).to({ x: -400, alpha: 0 }, 200).call(function () { _this._roleContainer.visible = false; });
            egret.Tween.get(this._bottomContainer).to({ y: GameConfig.stageHeigth, alpha: 0 }, 42).call(function () { _this._bottomContainer.visible = false; }); //84
            egret.Tween.get(this._rightContainer).to({ x: 175, alpha: 0 }, 88).call(function () { _this._rightContainer.visible = false; }); //175
            egret.Tween.get(this._ruleBtn).to({ y: -100, alpha: 0 }, 50).call(function () { _this._ruleBtn.visible = false; });
            egret.Tween.get(this.closeBtn).to({ y: -100, alpha: 0 }, 50).call(function () { _this.closeBtn.visible = false; });
            egret.Tween.get(this.titleBg).to({ y: -100, alpha: 0 }, 50);
            egret.Tween.get(this._nameContainer).to({ x: GameConfig.stageWidth, alpha: 0 }, 120).call(function () { _this._nameContainer.visible = false; });
        }
        else {
            egret.Tween.get(this.titleBg).to({ y: 0, alpha: 1 }, 40);
            this._ruleBtn.visible = true;
            egret.Tween.get(this._ruleBtn).to({ y: 22, alpha: 1 }, 50);
            this.closeBtn.visible = true;
            egret.Tween.get(this.closeBtn).to({ y: 0, alpha: 1 }, 50);
            this._topContainer.visible = true;
            egret.Tween.get(this._topContainer).to({ y: 85, alpha: 1 }, 200);
            this._rechargeBtn.visible = true;
            egret.Tween.get(this._rechargeBtn).wait(150).to({ x: 15, alpha: 1 }, 50);
            this._poolBtn.visible = true;
            egret.Tween.get(this._poolBtn).wait(150).to({ x: 15, alpha: 1 }, 50);
            this._roleContainer.visible = true;
            egret.Tween.get(this._roleContainer).to({ x: 0, alpha: 1 }, 200);
            this._bottomContainer.visible = true;
            egret.Tween.get(this._bottomContainer).wait(158).to({ y: GameConfig.stageHeigth - 84, alpha: 1 }, 42); //84
            this._rightContainer.visible = true;
            egret.Tween.get(this._rightContainer).wait(212).to({ x: 0, alpha: 1 }, 88); //175
            this._bubbleTip.visible = true;
            this._nameContainer.visible = true;
            egret.Tween.get(this._nameContainer).wait(80).to({ x: GameConfig.stageWidth - this._nameContainer.width - 30, alpha: 1 }, 120);
        }
    };
    //mask
    AcHeroineView.prototype.showViewMask = function () {
        var touchPos = BaseBitmap.create("public_alphabg");
        touchPos.width = GameConfig.stageWidth;
        touchPos.height = GameConfig.stageHeigth;
        this.addChild(touchPos);
        touchPos.name = "yiyibusheTouchPos";
        touchPos.touchEnabled = true;
    };
    AcHeroineView.prototype.hideViewMask = function () {
        var touchPos = this.getChildByName("yiyibusheTouchPos");
        if (touchPos) {
            touchPos.touchEnabled = false;
            touchPos.dispose();
        }
    };
    //开场动画
    AcHeroineView.prototype.showStartAni = function () {
        var _this = this;
        var localkey = this.vo.aidAndCode + Api.playerVoApi.getPlayerID() + this.vo.et;
        var lastTime = 0;
        var timeStr = LocalStorageManager.get(localkey);
        if (timeStr && timeStr != "") {
            lastTime = Number(timeStr);
        }
        if (App.DateUtil.checkIsToday(lastTime)) {
            return;
        }
        LocalStorageManager.set(localkey, String(GameData.serverTime));
        var startAniContainer = new BaseDisplayObjectContainer();
        startAniContainer.width = GameConfig.stageWidth;
        startAniContainer.height = GameConfig.stageHeigth;
        this.addChild(startAniContainer);
        // let mask = BaseBitmap.create("public_9_viewmask");
        var mask = BaseBitmap.create("public_9_black");
        mask.width = GameConfig.stageWidth;
        mask.height = GameConfig.stageHeigth;
        mask.touchEnabled = true;
        startAniContainer.addChild(mask);
        mask.addTouchTap(function () {
            if (_this._startAniStep == 2) {
                if (_this._startBone) {
                    _this._startAniStep = 3;
                    _this._startBone.playDragonMovie("xiaoshi_3", 1);
                    var title = startAniContainer.getChildByName("title");
                    var info = startAniContainer.getChildByName("info");
                    if (title) {
                        egret.Tween.get(title).to({ alpha: 0 }, 100);
                    }
                    if (info) {
                        egret.Tween.get(info).to({ alpha: 0 }, 100);
                    }
                    egret.Tween.get(mask).to({ alpha: 0 }, 1500);
                }
            }
            else if (_this._startAniStep == 0) {
                _this.removeChild(startAniContainer);
                startAniContainer.dispose();
            }
        }, this);
        var bone = "acheroineview_Appearance";
        var boneName = "acheroineview_Appearance_ske";
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            this._startAniStep = 1;
            var title_1 = ComponentManager.getTextField(LanguageManager.getlocal("acHeroineStartInfoTitle-" + this.getTypeCode()), TextFieldConst.FONTSIZE_TITLE_BIG, TextFieldConst.COLOR_BLACK);
            title_1.setPosition(GameConfig.stageWidth / 2 - title_1.width / 2, GameConfig.stageHeigth - 947 + 65);
            title_1.bold = true;
            title_1.name = "title";
            title_1.alpha = 0;
            var info_1 = ComponentManager.getTextField(LanguageManager.getlocal("acHeroineStartInfoMsg-" + this.getTypeCode()), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
            info_1.width = 386;
            info_1.lineSpacing = 8;
            info_1.x = title_1.x + title_1.width / 2 - info_1.width / 2;
            info_1.y = title_1.y + 70;
            info_1.alpha = 0;
            info_1.name = "info";
            var boneAni_1 = App.DragonBonesUtil.getLoadDragonBones(bone, 1, "chuxian_1");
            boneAni_1.setPosition(0, GameConfig.stageHeigth - 947);
            startAniContainer.addChild(boneAni_1);
            this._startBone = boneAni_1;
            boneAni_1.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, function () {
                if (_this._startAniStep == 1) {
                    egret.Tween.get(title_1).to({ alpha: 1 }, 50);
                    egret.Tween.get(info_1).to({ alpha: 1 }, 50);
                    _this._startAniStep = 2;
                    boneAni_1.playDragonMovie("xunhuan_2", 0);
                }
                else if (_this._startAniStep == 3) {
                    _this._startAniStep = 0;
                    boneAni_1.dispose();
                    _this._startBone = null;
                    egret.Tween.removeTweens(mask);
                    _this.removeChild(startAniContainer);
                    startAniContainer.dispose();
                }
            }, this);
            startAniContainer.addChild(info_1);
            startAniContainer.addChild(title_1);
        }
        else {
            //火
            var fireBmpStr = ResourceManager.hasRes("acheroine_firebg-" + this.getTypeCode()) ? "acheroine_firebg-" + this.getTypeCode() : "acheroine_firebg-1";
            var fireBmp = BaseBitmap.create(fireBmpStr);
            fireBmp.setPosition(0, startAniContainer.height - fireBmp.height);
            startAniContainer.addChild(fireBmp);
            //bg
            var bgStr = ResourceManager.hasRes("acheroine_startInfobg-" + this.getTypeCode()) ? "acheroine_startInfobg-" + this.getTypeCode() : "acheroine_startInfobg-1";
            var bg = BaseBitmap.create(bgStr);
            bg.setPosition(startAniContainer.width / 2 - bg.width / 2, 70);
            startAniContainer.addChild(bg);
            var title = ComponentManager.getTextField(LanguageManager.getlocal("acHeroineStartInfoTitle-" + this.getTypeCode()), TextFieldConst.FONTSIZE_TITLE_BIG, TextFieldConst.COLOR_BLACK);
            title.setPosition(bg.x + bg.width / 2 - title.width / 2, bg.y + 50);
            title.bold = true;
            startAniContainer.addChild(title);
            var info = ComponentManager.getTextField(LanguageManager.getlocal("acHeroineStartInfoMsg-" + this.getTypeCode()), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
            info.width = bg.width - 180;
            info.lineSpacing = 8;
            // info.setPosition(0, 5);
            info.x = bg.x + 94;
            info.y = bg.y + 131;
            // scrolNode.addChild(info);
            startAniContainer.addChild(info);
            this._startAniStep = 0;
        }
        //info
        // let scrolNode = new BaseDisplayObjectContainer();
        // let rect = new egret.Rectangle(0, 0, bg.width - 186, 530);
        // let scrollview:ScrollView = ComponentManager.getScrollView(scrolNode, rect);
        // scrollview.bounces = false;
        // scrollview.x = bg.x + 98;
        // scrollview.y = bg.y + 151;
        // scrollview.horizontalScrollPolicy = 'off';
        // startAniContainer.addChild(scrollview); 
    };
    AcHeroineView.prototype.tick = function () {
        this._acTimeTf.text = LanguageManager.getlocal("acHeroineTimeCountDown", [this.vo.getCountDown()]);
        this._timeBg.width = 60 + this._acTimeTf.width;
        this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 5;
        this._acTimeTf.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._acTimeTf.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._acTimeTf.height / 2);
    };
    AcHeroineView.prototype.showBubbleTip = function () {
        var _this = this;
        var random = App.MathUtil.getRandom(1, 4);
        var str = "acHeroineFightBubbleTip_" + random + "-" + this.getTypeCode();
        var bubbleTip = this.createBubbleTip(str, false);
        bubbleTip.setPosition(GameConfig.stageWidth / 2 - 100, this._bottomContainer.y - 460);
        this.addChildToContainer(bubbleTip);
        this._bubbleTip = bubbleTip;
        egret.Tween.get(bubbleTip, { loop: true }).wait(5000).to({ alpha: 0 }, 500).wait(10000).call(function () {
            var random = App.MathUtil.getRandom(1, 4);
            var str = "acHeroineFightBubbleTip_" + random + "-" + _this.getTypeCode();
            _this.freshBubbleTip(bubbleTip, str);
        }).to({ alpha: 1 }, 100);
    };
    //创建气泡提示
    AcHeroineView.prototype.createBubbleTip = function (str, isSpecialTip) {
        var tipContainer = new BaseDisplayObjectContainer();
        var tipBg = BaseBitmap.create("public_9_bg42");
        tipContainer.addChild(tipBg);
        tipBg.name = "tipBg";
        var tipTail = BaseBitmap.create("public_9_bg42_tail");
        tipContainer.addChild(tipTail);
        tipTail.name = "tipTail";
        var tipDesc = ComponentManager.getTextField(LanguageManager.getlocal(str), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        tipBg.height = tipDesc.height + 20;
        tipBg.width = tipDesc.width + 30;
        if (isSpecialTip) {
            tipTail.scaleX = -1;
            tipTail.setPosition(tipBg.x + tipBg.width - tipTail.width + 15, tipBg.y + tipBg.height);
        }
        else {
            tipTail.setPosition(tipBg.x + 30, tipBg.y + tipBg.height);
        }
        tipDesc.setPosition(tipBg.x + 15, tipBg.y + tipBg.height / 2 - tipDesc.height / 2 + 2);
        tipContainer.addChild(tipDesc);
        tipDesc.name = "tipDesc";
        tipContainer.height = tipBg.height + tipTail.height + 20;
        tipContainer.width = tipBg.width;
        return tipContainer;
    };
    AcHeroineView.prototype.freshBubbleTip = function (obj, strKey) {
        var tipBg = obj.getChildByName("tipBg");
        var tipDesc = obj.getChildByName("tipDesc");
        tipDesc.text = LanguageManager.getlocal(strKey);
        tipBg.width = tipDesc.width + 30;
        obj.width = tipBg.width;
    };
    //切换role
    AcHeroineView.prototype.changeRole = function () {
        this._isWife = !this._isWife;
        if (this._isWife) {
            this._wifeIcon.visible = true;
            this._servantSkin.visible = false;
        }
        else {
            this._wifeIcon.visible = false;
            this._servantSkin.visible = true;
        }
    };
    Object.defineProperty(AcHeroineView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcHeroineView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcHeroineView.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        else if (this.code == "4") {
            return "3";
        }
        else if (this.code == "6") {
            return "5";
        }
        else if (this.code == "8") {
            return "7";
        }
        else if (this.code == "10") {
            return "9";
        }
        return this.code;
    };
    AcHeroineView.prototype.getTitleBgName = function () {
        return ResourceManager.hasRes("acheroine_titlebg-" + this.getTypeCode()) ? "acheroine_titlebg-" + this.getTypeCode() : "acheroine_titlebg-1";
    };
    AcHeroineView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    AcHeroineView.prototype.getTitleStr = function () {
        return "";
    };
    AcHeroineView.prototype.getRuleInfo = function () {
        return "acHeroineRuleInfo-" + this.getTypeCode();
    };
    // protected getProbablyInfo():string
    // {
    //     return "acTravelWithBeautyProbablyInfo-"+this.getTypeCode();
    // }
    AcHeroineView.prototype.getResourceList = function () {
        var list = [];
        if (this.getTypeCode() != "1") {
            list = [
                "acheroine_titlebg-1", "acheroine_startInfobg-1", "acheroine_firebg-1", "acheroine_itemicon-1", "acheroine_smallitemicon-1", "acheroine_bg-1", "acheroine_enemy-1_1", "acheroine_enemy-1_2", "acheroine_enemy-1_3", "acheroine_enemy-1_4", "acheroine_enemy-1_5", "acheroine_wall-1_1",
                "acheroine_wall-1_2", "acheroine_wall-1_3", "acheroine_wall-1_4", "acheroine_start_attack_txt-1",
            ];
        }
        return _super.prototype.getResourceList.call(this).concat([
            "acturantable_task_box2_1", "acturantable_task_box2_2", "acturantable_task_box2_3", "motherdayfinalbox1-1", "motherdayfinalbox2-1", "punish_infobg-12", "acheroine_bigbox_txt", "acheroine_boxbg", "acheroine_fight_numtxt1", "acheroine_fight_numtxt2", "acheroine_fightbtn", "acheroine_fightname_bg", "acheroine_rolename_bg", "acheroine_rechargebtn_down", "acheroine_rechargebtn", "acheroine_rewardpoolbtn", "acheroine_rewardpoolbtn_down", "progress3_bg", "progress3", "acarcherview_numBg", "acthrowstone_wall-1", "acheroine_boxbg1", "acheroine_free", "acheroine_light", "acwealthcarpview_servantskintxt", "acgiftreturnview_common_skintxt",
            "acheroine_titlebg-" + this.getTypeCode(),
            "acheroine_startInfobg-" + this.getTypeCode(),
            "acheroine_firebg-" + this.getTypeCode(),
            "acheroine_itemicon-" + this.getTypeCode(),
            "acheroine_smallitemicon-" + this.getTypeCode(),
            "acheroine_bg-" + this.getTypeCode(),
            "acheroine_enemy-" + this.getTypeCode() + "_1", "acheroine_enemy-" + this.getTypeCode() + "_2", "acheroine_enemy-" + this.getTypeCode() + "_3", "acheroine_enemy-" + this.getTypeCode() + "_4", "acheroine_enemy-" + this.getTypeCode() + "_5", "acheroine_wall-" + this.getTypeCode() + "_1",
            "acheroine_wall-" + this.getTypeCode() + "_2", "acheroine_wall-" + this.getTypeCode() + "_3", "acheroine_wall-" + this.getTypeCode() + "_4", "acheroine_start_attack_txt-" + this.getTypeCode(),
        ]).concat(list);
    };
    AcHeroineView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_HEROINE_PLAY, this.playRewardCallback, this);
        this._timeBg = null;
        this._acTimeTf = null;
        this._progress = null;
        this._killNum = null;
        this._rechargeBtn = null;
        this._poolBtn = null;
        this._tokenNum = null;
        this._freeDesc = null;
        this._attackNumTxt = null;
        this._topContainer = null;
        this._roleContainer = null;
        this._bottomContainer = null;
        this._rightContainer = null;
        this._startAniStep = 0;
        this._startBone = null;
        this._bubbleTip = null;
        this._attackTipBtn = null;
        this._attackBtnContainer = null;
        this._isSelectPlayBtn = false;
        this._bgContainer = null;
        this._rewardData = null;
        this._isShowAtkAni = false;
        this._isWife = true;
        this._wifeIcon = null;
        this._servantSkin = null;
        this._leader = null;
        this._enemyList = [];
        this._wall = null;
        this._fireEffect = null;
        this._bg = null;
        this._leaderFrames = [];
        this._leaderEndFrames = [];
        this._oldScore = 0;
        _super.prototype.dispose.call(this);
    };
    return AcHeroineView;
}(AcCommonView));
__reflect(AcHeroineView.prototype, "AcHeroineView");
//# sourceMappingURL=AcHeroineView.js.map