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
 * 三国类活动
 * author ycg
 * date 2020.1.14
 * @class AcThreekingdomsRechargeView
 */
var AcThreekingdomsRechargeView = /** @class */ (function (_super) {
    __extends(AcThreekingdomsRechargeView, _super);
    function AcThreekingdomsRechargeView() {
        var _this = _super.call(this) || this;
        _this._startAniStep = 0;
        _this._startBone = null;
        _this._timeBg = null;
        _this._acTimeTf = null;
        _this._freeDesc = null;
        _this._oneNeedContainer = null;
        _this._toolNumIcon = null;
        _this._toolNum = null;
        _this._guanqiaItemList = [];
        _this._progress = null;
        _this._proLight = null;
        _this._scrollNode = null;
        _this._currProContainer = null;
        _this._topContainer = null;
        _this._bottomContainer = null;
        _this._guanqiaContainer = null;
        _this._processContainer = null;
        _this._isSelPlayBtn = false;
        _this._isPlayTen = false;
        _this._isPlayStartInfo = false;
        _this._lastProcessNum = 0;
        _this._scrollView = null;
        _this._rewardData = null;
        _this._bgContainer = null;
        _this._bg = null;
        _this._bg_ = null;
        _this._mountBg = null;
        _this._mountBg_ = null;
        _this._soldierContainer = null;
        _this._leader = null;
        _this._enemy = null;
        _this._qingyuanBtn = null;
        _this._leaderContainer = null;
        _this._enemyContainer = null;
        _this._isDie = false;
        _this._isSkipAni = false;
        _this._isPlayBatch = false;
        _this._goMoreContainer = null;
        _this._skipContainer = null;
        _this._playMultiBtn = null;
        _this._playmultiNeedNum = null;
        return _this;
    }
    Object.defineProperty(AcThreekingdomsRechargeView.prototype, "leaderStateFrame", {
        get: function () {
            return {
                atk: { num: 9, name: "acthkingdomrecharge_mysideatk-1_" },
                idle: { num: 7, name: "acthkingdomrecharge_mysideidle-1_" },
                run: { num: 5, name: "acthkingdomrecharge_mysiderun-1_" }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreekingdomsRechargeView.prototype, "enemyStateFrame", {
        get: function () {
            return {
                atk: { num: 9, name: "acthkingdomrecharge_enemyatk-1_" },
                idle: { num: 7, name: "acthkingdomrecharge_enemyidle-1_" },
                run: { num: 5, name: "acthkingdomrecharge_enemyrun-1_" },
                die: { num: 10, name: "acthkingdomrecharge_enemydie-1_" }
            };
        },
        enumerable: true,
        configurable: true
    });
    AcThreekingdomsRechargeView.prototype.initView = function () {
        var _this = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_THREEKINGDOMSRECHARGE_LOTTERY, this.playBtnCallback, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_THREEKINGDOMSRECHARGE_REWARDS, this.getAchievementCallback, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ENCOUNTER_MODEL, this.checkQingyuanRed, this);
        this.initBeginView();
        this.showStartAni();
        var bgContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(bgContainer);
        this._bgContainer = bgContainer;
        //sky  
        var skyBgStr = ResourceManager.hasRes("acthreekingdomsrecharge_skybg-" + this.getTypeCode()) ? "acthreekingdomsrecharge_skybg-" + this.getTypeCode() : "acthreekingdomsrecharge_skybg-1";
        var skyBg = BaseBitmap.create(skyBgStr);
        bgContainer.addChild(skyBg);
        var skyBg_ = BaseBitmap.create(skyBgStr);
        skyBg_.setPosition(skyBg.x + skyBg.width, 0);
        bgContainer.addChild(skyBg_);
        var skyBgSpeed = 0.01;
        egret.Tween.get(skyBg, { loop: true }).to({ x: -skyBg.width }, skyBg.width / skyBgSpeed).to({ x: skyBg.width }, 0).to({ x: 0 }, skyBg.width / skyBgSpeed);
        egret.Tween.get(skyBg_, { loop: true }).to({ x: -skyBg.width }, 2 * skyBg.width / skyBgSpeed).to({ x: skyBg.width }, 0);
        //bg
        var bgStr = ResourceManager.hasRes("acthreekingdomsrecharge_bg-" + this.getTypeCode()) ? "acthreekingdomsrecharge_bg-" + this.getTypeCode() : "acthreekingdomsrecharge_bg-1";
        var bg = BaseBitmap.create(bgStr);
        //山
        var mountBgStr = ResourceManager.hasRes("acthreekingdomsrecharge_montbg-" + this.getTypeCode()) ? "acthreekingdomsrecharge_montbg-" + this.getTypeCode() : "acthreekingdomsrecharge_montbg-1";
        var mountBg = BaseBitmap.create(mountBgStr);
        bgContainer.addChild(mountBg);
        // mountBg.setPosition(0, skyBg.y + 380);
        mountBg.x = 0;
        mountBg.y = GameConfig.stageHeigth - bg.height + 380;
        this._mountBg = mountBg;
        var mountBg_ = BaseBitmap.create(mountBgStr);
        bgContainer.addChild(mountBg_);
        // mountBg_.setPosition(mountBg.width, skyBg.y + 380);
        mountBg_.x = mountBg.width;
        mountBg_.y = mountBg.y;
        this._mountBg_ = mountBg_;
        var mountBgSpeed = 0.08;
        egret.Tween.get(mountBg, { loop: true }).to({ x: -mountBg.width }, mountBg.width / mountBgSpeed).to({ x: mountBg.width }, 0).to({ x: 0 }, mountBg.width / mountBgSpeed);
        egret.Tween.get(mountBg_, { loop: true }).to({ x: -mountBg.width }, 2 * mountBg.width / mountBgSpeed).to({ x: mountBg.width }, 0);
        // //bg
        // let bgStr = ResourceManager.hasRes("acthreekingdomsrecharge_bg-"+this.getTypeCode()) ? "acthreekingdomsrecharge_bg-"+this.getTypeCode() : "acthreekingdomsrecharge_bg-1";
        // let bg = BaseBitmap.create(bgStr);
        bgContainer.addChild(bg);
        bg.y = GameConfig.stageHeigth - bg.height;
        this._bg = bg;
        // mountBg.setPosition(0, bg.y + 380);
        // mountBg_.setPosition(mountBg.width, bg.y + 380);
        var bg_ = BaseBitmap.create(bgStr);
        bg_.setPosition(bg.x + bg.width, 0);
        bgContainer.addChild(bg_);
        bg_.y = GameConfig.stageHeigth - bg_.height;
        this._bg_ = bg_;
        var bgSpeed = 0.13;
        egret.Tween.get(bg, { loop: true }).to({ x: -bg.width }, bg.width / bgSpeed).to({ x: bg.width }, 0).to({ x: 0 }, bg.width / bgSpeed);
        egret.Tween.get(bg_, { loop: true }).to({ x: -bg.width }, 2 * bg.width / bgSpeed).to({ x: bg.width }, 0);
        this.playBgAni(false);
        var soldierContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(soldierContainer);
        this._soldierContainer = soldierContainer;
        var soldierImg = ResourceManager.hasRes("acthreekingdomsrecharge_soldier-" + this.getTypeCode()) ? "acthreekingdomsrecharge_soldier-" + this.getTypeCode() : "acthreekingdomsrecharge_soldier-1";
        var soldier = BaseBitmap.create(soldierImg);
        soldierContainer.addChild(soldier);
        soldierContainer.setPosition(0, GameConfig.stageHeigth - 280 - soldier.height); //260
        // soldierContainer.setPosition(0, bg.y + 574); //574
        //将军
        var leaderContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(leaderContainer);
        leaderContainer.setPosition(GameConfig.stageWidth / 2 - 240, soldierContainer.y - 50);
        //将军影子
        var shadowStr = ResourceManager.hasRes("acthreekingdomrecharge_shadowbg-" + this.getTypeCode()) ? "acthreekingdomrecharge_shadowbg-" + this.getTypeCode() : "acthreekingdomrecharge_shadowbg-1";
        var leaderShadow = BaseBitmap.create(shadowStr);
        leaderShadow.setPosition(145, 170);
        leaderContainer.addChild(leaderShadow);
        this._leaderContainer = leaderContainer;
        var leaderStr = ResourceManager.hasRes("acthkingdomrecharge_mysideidle-" + this.getTypeCode() + "_") ? "acthkingdomrecharge_mysideidle-" + this.getTypeCode() + "_" : "acthkingdomrecharge_mysideidle-1_";
        var leader = ComponentManager.getCustomMovieClip(leaderStr, 7, 125);
        // leader.setPosition(GameConfig.stageWidth/2 - 240, soldierContainer.y - 50);
        leader.playWithTime(0);
        leaderContainer.addChild(leader);
        this._leader = leader;
        var topContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(topContainer);
        this._topContainer = topContainer;
        var infoBgStr = ResourceManager.hasRes("acthreekingdomsrecharge_infobg-" + this.getTypeCode()) ? "acthreekingdomsrecharge_infobg-" + this.getTypeCode() : "acthreekingdomsrecharge_infobg-1";
        var infoBg = BaseBitmap.create(infoBgStr);
        topContainer.width = infoBg.width;
        topContainer.height = infoBg.height;
        topContainer.setPosition(this.titleBg.x + this.titleBg.width / 2 - infoBg.width / 2, this.titleBg.y + this.titleBg.height - 7);
        // infoBg.setPosition(this.titleBg.x +this.titleBg.width/2 - infoBg.width/2, this.titleBg.y + this.titleBg.height -7);
        topContainer.addChild(infoBg);
        //活动时间
        var acDate = ComponentManager.getTextField(LanguageManager.getlocal("acThreekingdomsRechargeTime", [this.vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        acDate.setPosition(infoBg.x + 198, infoBg.y + 10);
        topContainer.addChild(acDate);
        //活动说明
        var acDescStr = LanguageManager.getlocal("acThreekingdomsRechargeInfo-" + this.getTypeCode());
        if (this.code == "2" || this.code == "4" || this.code == "6" || this.code == "8" || this.code == "10") {
            acDescStr = LanguageManager.getlocal("acThreekingdomsRechargeInfo-" + this.code);
        }
        var acDesc = ComponentManager.getTextField(acDescStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        acDesc.setPosition(acDate.x, acDate.y + acDate.height + 6);
        acDesc.width = 430;
        acDesc.lineSpacing = 6;
        topContainer.addChild(acDesc);
        //充值提示
        var rechargeTip = ComponentManager.getTextField(LanguageManager.getlocal("acThreekingdomsRechargeGetToolNum-" + this.getTypeCode(), ["" + this.vo.getRechargeNeed()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        rechargeTip.setPosition(infoBg.x + infoBg.width - rechargeTip.width - 10, infoBg.y + infoBg.height - 40);
        topContainer.addChild(rechargeTip);
        rechargeTip.name = "rechargeTip";
        //衣装预览
        var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
        skinTxtEffect.width = 208;
        skinTxtEffect.height = 154;
        skinTxtEffect.setPosition(infoBg.x + infoBg.width / 4 - skinTxtEffect.width / 2 - 60, infoBg.y + 60);
        skinTxtEffect.blendMode = egret.BlendMode.ADD;
        topContainer.addChild(skinTxtEffect);
        skinTxtEffect.playWithTime(-1);
        var skinTxt = BaseBitmap.create("acwealthcarpview_servantskintxt");
        skinTxt.anchorOffsetX = skinTxt.width / 2;
        skinTxt.anchorOffsetY = skinTxt.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect);
        topContainer.addChild(skinTxt);
        egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
        var skinTxteffect = BaseBitmap.create("acwealthcarpview_servantskintxt");
        skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
        skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxteffect, skinTxtEffect);
        topContainer.addChild(skinTxteffect);
        skinTxteffect.blendMode = egret.BlendMode.ADD;
        skinTxteffect.alpha = 0;
        egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        skinTxteffect.addTouchTap(function () {
            var servantSkinId = Config.ServantskinCfg.formatRewardItemVoStr(_this.cfg.show);
            var topMsg = LanguageManager.getlocal("acThreekingdomsRechargeSkinTopMsg-" + _this.getTypeCode());
            if (_this.code == "2" || _this.code == "4" || _this.code == "6" || _this.code == "8" || _this.code == "10") {
                topMsg = LanguageManager.getlocal("acThreekingdomsRechargeSkinTopMsg-" + _this.code);
            }
            var data = { data: [
                    { idType: servantSkinId, topMsg: topMsg, bgName: "acthreekingdomrecharge_skinbg", scale: 0.76, offY: 2 },
                ] };
            ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, data);
        }, this);
        //倒计时
        this._timeBg = BaseBitmap.create("public_9_bg61");
        this._timeBg.y = infoBg.y + infoBg.height - this._timeBg.height / 2 - 2;
        topContainer.addChild(this._timeBg);
        this._acTimeTf = ComponentManager.getTextField(LanguageManager.getlocal("acThreekingdomsRechargeTimeCountDown", [this.vo.getCountDown()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._timeBg.width = 60 + this._acTimeTf.width;
        this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 5;
        this._acTimeTf.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._acTimeTf.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._acTimeTf.height / 2);
        topContainer.addChild(this._acTimeTf);
        //关卡名字
        var nameBgStr = ResourceManager.hasRes("acthreekingdomsrecharge_guanqianamebg-" + this.getTypeCode()) ? "acthreekingdomsrecharge_guanqianamebg-" + this.getTypeCode() : "acthreekingdomsrecharge_guanqianamebg-1";
        var nameBg = BaseBitmap.create(nameBgStr);
        nameBg.setPosition(infoBg.x + infoBg.width / 2 - nameBg.width / 2, infoBg.y + infoBg.height + 25);
        topContainer.addChild(nameBg);
        var guanqiaId = this.vo.getCurrGuanqiaId();
        var guanqiaData = this.cfg.getAchieveData();
        var nameIndex = guanqiaId + 1;
        if (guanqiaId == -1) {
            nameIndex = guanqiaData.length;
        }
        var name = ComponentManager.getTextField(LanguageManager.getlocal("acThreekingdomsRechargeGuanqia-" + this.getTypeCode() + "_" + nameIndex), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        name.anchorOffsetX = name.width / 2;
        name.setPosition(nameBg.x + nameBg.width / 2, nameBg.y + nameBg.height / 2 - name.height / 2);
        topContainer.addChild(name);
        name.name = "guanqiaName";
        //奖池展示
        var poolTopMsg = LanguageManager.getlocal("acThreekingdomsRechargePoolInfo-" + this.getTypeCode());
        var poolTipMsg = LanguageManager.getlocal("acThreekingdomsRechargePoolRewardInfo");
        var poolRewards = this.cfg.getPoolRewards();
        var poolBtnImg = ResourceManager.hasRes("acthreekingdomsrecharge_poolbtn-" + this.getTypeCode()) ? "acthreekingdomsrecharge_poolbtn-" + this.getTypeCode() : "acthreekingdomsrecharge_poolbtn-1";
        var poolBtn = ComponentManager.getButton(poolBtnImg, "", function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSRECHARGEPOOLVIEW, { topMsg: poolTopMsg, tipMsg: poolTipMsg, rewards: poolRewards });
        }, this);
        poolBtn.setPosition(15, infoBg.y + infoBg.height + 20);
        topContainer.addChild(poolBtn);
        if (Api.switchVoApi.checkOpenOfficialCareer() && Api.switchVoApi.checkOpenQingYuanHuiJuan() && Api.switchVoApi.checkOpenQingYuan("fiveTigeHeroes")) {
            var openOtherBtnImg = ResourceManager.hasRes("acthreekingdomsrecharge_qingyuanbtn-" + this.getTypeCode()) ? "acthreekingdomsrecharge_qingyuanbtn-" + this.getTypeCode() : "acthreekingdomsrecharge_qingyuanbtn-1";
            var openOtherBtn = ComponentManager.getButton(openOtherBtnImg, "", function () {
                if (Api.playerVoApi.getPlayerLevel() >= Config.CareerCfg.getStoryNeedLv()) {
                    ViewController.getInstance().openViewByFunName("qingyuan");
                }
                else {
                    App.CommonUtil.showTip(LanguageManager.getlocal("mianUIFriendBtnTip", [LanguageManager.getlocal("officialTitle" + Config.CareerCfg.getStoryNeedLv())]));
                }
            }, this);
            topContainer.addChild(openOtherBtn);
            this._qingyuanBtn = openOtherBtn;
            this.checkQingyuanRed();
            openOtherBtn.setPosition(15, poolBtn.y + 20 + poolBtn.height);
        }
        //bottom
        var bottomContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(bottomContainer);
        this._bottomContainer = bottomContainer;
        var bottomBgStr = ResourceManager.hasRes("acthreekingdomsrecharge_bottom-" + this.getTypeCode()) ? "acthreekingdomsrecharge_bottom-" + this.getTypeCode() : "acthreekingdomsrecharge_bottom-1";
        var bottomBg = BaseBitmap.create(bottomBgStr);
        bottomContainer.width = bottomBg.width;
        bottomContainer.height = bottomBg.height;
        bottomContainer.setPosition(GameConfig.stageWidth / 2 - bottomBg.width / 2, GameConfig.stageHeigth - bottomBg.height);
        bottomContainer.addChild(bottomBg);
        //一步
        var playOneBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, "acThreekingdomsRechargeOnceBtnName-" + this.getTypeCode(), this.playBtnClick, this, [0]);
        playOneBtn.setPosition(bottomBg.x + 70, bottomBg.y + 80);
        bottomContainer.addChild(playOneBtn);
        //免费
        var freeDesc = ComponentManager.getTextField(LanguageManager.getlocal("acYiyibusheFree"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
        freeDesc.setPosition(playOneBtn.x + playOneBtn.width / 2 - freeDesc.width / 2, playOneBtn.y - 25);
        bottomContainer.addChild(freeDesc);
        this._freeDesc = freeDesc;
        //一次消耗
        var oneNeedContainer = new BaseDisplayObjectContainer();
        bottomContainer.addChild(oneNeedContainer);
        this._oneNeedContainer = oneNeedContainer;
        var needIconImg = ResourceManager.hasRes("acthreekingdomsrecharge_itemsmallicon-" + this.getTypeCode()) ? "acthreekingdomsrecharge_itemsmallicon-" + this.getTypeCode() : "acthreekingdomsrecharge_itemsmallicon-1";
        var oneNeedIcon = BaseBitmap.create(needIconImg);
        oneNeedIcon.setScale(1);
        oneNeedContainer.addChild(oneNeedIcon);
        var oneNeedNum = ComponentManager.getTextField(LanguageManager.getlocal("acThreekingdomsRechargeNeedNum-" + this.getTypeCode(), ["" + this.cfg.consume1]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        oneNeedNum.setPosition(oneNeedIcon.x + oneNeedIcon.width * oneNeedIcon.scaleX, oneNeedIcon.y + oneNeedIcon.height * oneNeedIcon.scaleY / 2 - oneNeedNum.height / 2);
        oneNeedContainer.addChild(oneNeedNum);
        oneNeedContainer.width = oneNeedIcon.width * oneNeedIcon.scaleX + oneNeedNum.width;
        oneNeedContainer.height = oneNeedIcon.height * oneNeedIcon.scaleY;
        oneNeedContainer.setPosition(playOneBtn.x + playOneBtn.width / 2 - oneNeedContainer.width / 2, playOneBtn.y - oneNeedContainer.height + 6);
        if (this.vo.isFree()) {
            freeDesc.visible = true;
            oneNeedContainer.visible = false;
        }
        else {
            freeDesc.visible = false;
            oneNeedContainer.visible = true;
        }
        //十次消耗
        var playMultiBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, "acThreekingdomsRechargeMultiBtnName-" + this.getTypeCode(), this.playBtnClick, this, [1]);
        playMultiBtn.setPosition(bottomBg.x + bottomBg.width - playMultiBtn.width - 70, bottomBg.y + 80);
        bottomContainer.addChild(playMultiBtn);
        this._playMultiBtn = playMultiBtn;
        var multiNeedContainer = new BaseDisplayObjectContainer();
        bottomContainer.addChild(multiNeedContainer);
        var multiNeedIcon = BaseBitmap.create(needIconImg);
        multiNeedIcon.setScale(1);
        multiNeedContainer.addChild(multiNeedIcon);
        var multiNeedNum = ComponentManager.getTextField(LanguageManager.getlocal("acThreekingdomsRechargeNeedNum-" + this.getTypeCode(), ["" + this.cfg.consume1 * 10]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        multiNeedNum.setPosition(multiNeedIcon.x + multiNeedIcon.width * multiNeedIcon.scaleX, multiNeedIcon.y + multiNeedIcon.height * multiNeedIcon.scaleY / 2 - multiNeedNum.height / 2);
        multiNeedContainer.addChild(multiNeedNum);
        this._playmultiNeedNum = multiNeedNum;
        multiNeedContainer.width = multiNeedIcon.width * multiNeedIcon.scaleX + multiNeedNum.width;
        multiNeedContainer.height = multiNeedIcon.height * multiNeedIcon.scaleY;
        multiNeedContainer.setPosition(playMultiBtn.x + playMultiBtn.width / 2 - multiNeedContainer.width / 2, playMultiBtn.y - multiNeedContainer.height + 6);
        //道具数量
        var toolNumIcon = BaseBitmap.create(needIconImg);
        toolNumIcon.setScale(1);
        bottomContainer.addChild(toolNumIcon);
        this._toolNumIcon = toolNumIcon;
        var toolNum = ComponentManager.getTextField(LanguageManager.getlocal("acThreekingdomsRechargeNeedNum-" + this.getTypeCode(), ["" + this.vo.getCurrNum()]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        toolNumIcon.setPosition(bottomBg.x + bottomBg.width / 2 - (toolNumIcon.width * toolNumIcon.scaleX + toolNum.width) / 2, bottomBg.y + 3);
        toolNum.setPosition(toolNumIcon.x + toolNumIcon.width * toolNumIcon.scaleX, toolNumIcon.y + toolNumIcon.height * multiNeedIcon.scaleY / 2 - toolNum.height / 2);
        bottomContainer.addChild(toolNum);
        this._toolNum = toolNum;
        //关卡
        // let scrollList = ComponentManager.getScrollList()
        var guanqiaContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(guanqiaContainer);
        this._guanqiaContainer = guanqiaContainer;
        var gqBgImg = ResourceManager.hasRes("acthreekingdomsrecharge_gqbg-" + this.getTypeCode()) ? "acthreekingdomsrecharge_gqbg-" + this.getTypeCode() : "acthreekingdomsrecharge_gqbg-1";
        var guanqiaBg = BaseBitmap.create(gqBgImg);
        guanqiaContainer.addChild(guanqiaBg);
        guanqiaContainer.width = guanqiaBg.width;
        guanqiaContainer.height = guanqiaBg.height;
        guanqiaContainer.setPosition(bottomContainer.x + bottomContainer.width / 2 - guanqiaContainer.width / 2, bottomContainer.y - guanqiaContainer.height);
        //关卡列表
        var proBgImg = ResourceManager.hasRes("acthreekingdomsrecharge_progressban-" + this.getTypeCode()) ? "acthreekingdomsrecharge_progressban-" + this.getTypeCode() : "acthreekingdomsrecharge_progressban-1";
        var proBg = BaseBitmap.create(proBgImg);
        proBg.setPosition(0, -21);
        guanqiaContainer.addChild(proBg);
        var scrolNode = new BaseDisplayObjectContainer();
        scrolNode.height = 160; //153
        this._scrollNode = scrolNode;
        var scrollView = ComponentManager.getScrollView(scrolNode, new egret.Rectangle(0, 0, GameConfig.stageWidth, scrolNode.height));
        scrollView.setPosition(0, guanqiaContainer.height - scrolNode.height);
        scrollView.horizontalScrollPolicy = "on";
        scrollView.verticalScrollPolicy = "off";
        scrollView.bounces = false;
        guanqiaContainer.addChild(scrollView);
        this._scrollView = scrollView;
        var data = this.cfg.getAchieveData();
        for (var i = 0; i < data.length; i++) {
            var guanqiaItem = new AcThreekingdomsRechargeGqScrollItem();
            guanqiaItem.initItem(i, data[i], { aid: this.aid, code: this.code });
            guanqiaItem.setPosition(20 + (guanqiaItem.width + 3) * i, scrolNode.height - guanqiaItem.height);
            scrolNode.addChild(guanqiaItem);
            this._guanqiaItemList.push(guanqiaItem);
        }
        //左边mask
        var proLeftMask = BaseBitmap.create("acthreekingdomsrecharge_proleftmask");
        proLeftMask.setPosition(guanqiaBg.x, guanqiaBg.y + guanqiaBg.height - proLeftMask.height);
        guanqiaContainer.addChild(proLeftMask);
        //右边mask
        var proRightMask = BaseBitmap.create("acthreekingdomsrecharge_prorightmask");
        proRightMask.setPosition(guanqiaBg.x + guanqiaBg.width - proRightMask.width, guanqiaBg.y + guanqiaBg.height - proRightMask.height);
        guanqiaContainer.addChild(proRightMask);
        //progress
        var proW = 150 * (data.length) - 3;
        scrolNode.width = proW + 40;
        App.LogUtil.log("prow: " + proW);
        var progress = ComponentManager.getProgressBar("acthreekingdomsrecharge_progress-1", "acthreekingdomsrecharge_probg-1", proW);
        progress.setPosition(20, 54); //0 47
        scrolNode.addChild(progress);
        var percent = this.vo.getProgressPer();
        progress.setPercentage(percent);
        this._progress = progress;
        //pro light
        var proLight = BaseBitmap.create("acthreekingdomsrecharge_prolight-1");
        proLight.anchorOffsetX = proLight.width;
        proLight.setPosition(progress.x + progress.width * progress.getPercent() + 3, progress.y + progress.height / 2 - proLight.height / 2);
        scrolNode.addChild(proLight);
        this._proLight = proLight;
        //当前进度
        var currProContainer = new BaseDisplayObjectContainer();
        scrolNode.addChild(currProContainer);
        var currProNumBg = BaseBitmap.create("acthreekingdomsrecharge_prodistance");
        currProContainer.width = currProNumBg.width;
        currProContainer.height = currProNumBg.height;
        currProContainer.setPosition(progress.x + progress.width * progress.getPercent() - currProNumBg.width / 2, 0);
        // if (progress.width * progress.getPercent() < currProNumBg.width/2){
        //     currProContainer.x = progress.x;
        // }
        // else if (progress.width * (1 - progress.getPercent()) < currProNumBg.width/2){
        //     currProContainer.x = progress.x + progress.width - currProContainer.width;
        // }
        currProContainer.addChild(currProNumBg);
        var currProNum = ComponentManager.getTextField(LanguageManager.getlocal("acThreekingdomsRechargeProgressDistance-" + this.getTypeCode(), ["" + this.vo.getProcessNum()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        currProNum.setPosition(currProContainer.width / 2 - currProNum.width / 2, currProNumBg.y + 6);
        currProContainer.addChild(currProNum);
        currProNum.name = "currProNum";
        this._currProContainer = currProContainer;
        //进度
        var processContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(processContainer);
        this._processContainer = processContainer;
        processContainer.setPosition(GameConfig.stageWidth - 72, guanqiaContainer.y - 190);
        var processFlag = BaseBitmap.create("acthreekingdomsrecharge_enemydis_flag");
        processContainer.addChild(processFlag);
        var processDistanceBg = BaseBitmap.create("acthreekingdomsrecharge_distancebg");
        processDistanceBg.setPosition(processFlag.x + processFlag.width - processDistanceBg.width, processFlag.y + processFlag.height);
        processContainer.addChild(processDistanceBg);
        var processStr = "";
        if (guanqiaId == -1) {
            processStr = LanguageManager.getlocal("acThreekingdomsRechargeEnemyEnd-" + this.getTypeCode());
        }
        else {
            processStr = LanguageManager.getlocal("acThreekingdomsRechargeEnemyDistance-" + this.getTypeCode(), ["" + this.vo.getNextGuanqiaNeedNum()]);
        }
        var processNum = ComponentManager.getTextField(processStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        processNum.anchorOffsetX = processNum.width / 2;
        processNum.setPosition(processDistanceBg.x + processDistanceBg.width / 2, processDistanceBg.y + processDistanceBg.height / 2 - processNum.height / 2 + 1);
        processContainer.addChild(processNum);
        processNum.name = "processNum";
        //跳过动画
        var skipContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(skipContainer);
        this._skipContainer = skipContainer;
        var skipBg = BaseBitmap.create("public_select");
        skipBg.setPosition(10, guanqiaContainer.y - skipBg.height - 100);
        skipContainer.addChild(skipBg);
        skipBg.addTouchTap(function () {
            _this._isSkipAni = !_this._isSkipAni;
            if (_this._isSkipAni) {
                skipBg.setRes("public_select_down");
            }
            else {
                skipBg.setRes("public_select");
            }
        }, this);
        var skipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acThreekingdomsRechargeSkipAni"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        skipTxt.setPosition(skipBg.x + skipBg.width + 5, skipBg.y + skipBg.height / 2 - skipTxt.height / 2);
        skipContainer.addChild(skipTxt);
        //前进五十步
        var goMoreContainer = new BaseDisplayObjectContainer();
        skipContainer.addChild(goMoreContainer);
        this._goMoreContainer = goMoreContainer;
        var goMoreBg = BaseBitmap.create("public_select");
        goMoreBg.setPosition(skipBg.x, skipBg.y - goMoreBg.height - 20);
        goMoreContainer.addChild(goMoreBg);
        goMoreBg.addTouchTap(function () {
            _this._isPlayBatch = !_this._isPlayBatch;
            if (_this._isPlayBatch) {
                goMoreBg.setRes("public_select_down");
                _this._playMultiBtn.setText("acThreekingdomsRechargeMoreBtnName");
                _this._playmultiNeedNum.text = LanguageManager.getlocal("acThreekingdomsRechargeNeedNum-" + _this.getTypeCode(), ["" + _this.cfg.consume1 * 50]);
            }
            else {
                goMoreBg.setRes("public_select");
                _this._playMultiBtn.setText("acThreekingdomsRechargeMultiBtnName-" + _this.getTypeCode());
                _this._playmultiNeedNum.text = LanguageManager.getlocal("acThreekingdomsRechargeNeedNum-" + _this.getTypeCode(), ["" + _this.cfg.consume1 * 10]);
            }
        }, this);
        var goMoreTxt = ComponentManager.getTextField(LanguageManager.getlocal("acThreekingdomsRechargeGoMore"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        goMoreTxt.setPosition(goMoreBg.x + goMoreBg.width + 5, goMoreBg.y + goMoreBg.height / 2 - goMoreTxt.height / 2);
        goMoreContainer.addChild(goMoreTxt);
        if (this.vo.getProcessNum() >= 50) {
            this._goMoreContainer.visible = true;
        }
        else {
            this._goMoreContainer.visible = false;
        }
        App.LogUtil.log("scrollleft: " + scrollView.scrollLeft);
        // let currId = this.vo.getCurrGuanqiaId();
        // let maxGuanqia = this.cfg.getAchieveData().length;
        // let scrollPosX = 0;
        // if (currId >= maxGuanqia - 3){
        //     scrollPosX = scrolNode.width - scrollView.width;
        // }
        // else{
        //     if (currId > 3){
        //         scrollPosX = scrolNode.width - (150 * (currId - 1));
        //     }
        // }
        // if (scrollPosX > 0){
        //     egret.Tween.get(scrollView).wait(500).to({scrollLeft : scrollPosX}, scrollPosX).call(()=>{
        //         egret.Tween.removeTweens(scrollView);
        //     }, this);
        // }
        this.moveScrollView();
        //宝箱
        this.initBox();
        this.freshBox();
        // test
        // egret.Tween.get(this).wait(1000).call(()=>{
        //     this.playUIAni(false);
        // }).wait(1000).call(()=>{
        //     this.playUIAni(true);
        // })
        // egret.Tween.get(this).wait(1500).call(this.playGuanqiaItemAni, this);
    };
    AcThreekingdomsRechargeView.prototype.checkQingyuanRed = function () {
        if (this._qingyuanBtn) {
            if (this.vo.isShowQingyuanRedDot()) {
                App.CommonUtil.addIconToBDOC(this._qingyuanBtn);
            }
            else {
                App.CommonUtil.removeIconFromBDOC(this._qingyuanBtn);
            }
        }
    };
    AcThreekingdomsRechargeView.prototype.moveScrollView = function () {
        var _this = this;
        var currId = this.vo.getCurrGuanqiaId();
        var maxGuanqia = this.cfg.getAchieveData().length;
        var scrollPosX = 0;
        if (currId >= maxGuanqia - 3 || currId == -1) {
            scrollPosX = this._scrollNode.width - this._scrollView.width;
        }
        else {
            if (currId > 2) {
                scrollPosX = 150 * (currId - 2);
            }
        }
        var time = Math.abs(this._scrollView.scrollLeft - scrollPosX);
        if (scrollPosX > 0 && time > 0) {
            this.showViewMask();
            egret.Tween.get(this._scrollView).wait(200).to({ scrollLeft: scrollPosX }, time).call(function () {
                egret.Tween.removeTweens(_this._scrollView);
                _this.hideViewMask();
            }, this);
        }
    };
    AcThreekingdomsRechargeView.prototype.playBgAni = function (isPlay) {
        var _this = this;
        if (isPlay) {
            egret.Tween.resumeTweens(this._bg);
            egret.Tween.resumeTweens(this._bg_);
            egret.Tween.resumeTweens(this._mountBg);
            egret.Tween.resumeTweens(this._mountBg_);
            if (this._soldierContainer.visible == true) {
                egret.Tween.get(this._soldierContainer).to({ x: -254 }, 254 / 0.16).call(function () {
                    _this._soldierContainer.visible = false;
                });
            }
        }
        else {
            egret.Tween.pauseTweens(this._bg);
            egret.Tween.pauseTweens(this._bg_);
            egret.Tween.pauseTweens(this._mountBg);
            egret.Tween.pauseTweens(this._mountBg_);
        }
    };
    AcThreekingdomsRechargeView.prototype.initBox = function () {
        var data = this.cfg.getAchieveData();
        var dataLength = data.length;
        var maxRate = data[dataLength - 1].specialnum;
        for (var i = 0; i < dataLength; i++) {
            var boxBg = BaseBitmap.create("acheroine_boxbg1");
            var scale = 1.2;
            boxBg.setScale(scale);
            if (i == dataLength - 1) {
                boxBg.setPosition(this._progress.x + this._progress.width * data[i].specialnum / maxRate - boxBg.width * boxBg.scaleX / 2 - 5, this._progress.y - boxBg.height * boxBg.scaleY + 20);
            }
            else {
                // boxBg.setPosition(this._progress.x + this._progress.width * data[i].specialnum / maxRate - boxBg.width * boxBg.scaleX /2, this._progress.y - boxBg.height * boxBg.scaleY + 20);
                boxBg.setPosition(this._progress.x + this._progress.width * (i + 1) / dataLength - boxBg.width * boxBg.scaleX / 2, this._progress.y - boxBg.height * boxBg.scaleY + 20);
            }
            this._scrollNode.addChild(boxBg);
            boxBg.name = "boxBg" + i;
            var boxEffect = ComponentManager.getCustomMovieClip("motherdayboxloop1-", 10, 70);
            boxEffect.width = 86;
            boxEffect.height = 85;
            boxEffect.playWithTime(0);
            boxEffect.name = "boxEffect" + i;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, boxEffect, boxBg, [0, 0]);
            boxEffect.visible = false;
            this._scrollNode.addChild(boxEffect);
            var box = BaseBitmap.create("acturantable_task_box2_1");
            box.setScale(0.8);
            box.anchorOffsetX = box.width / 2;
            box.anchorOffsetY = box.height / 2;
            box.setPosition(boxBg.x + boxBg.width * boxBg.scaleX / 2, boxBg.y + boxBg.height * boxBg.scaleY / 2);
            this._scrollNode.addChild(box);
            box.name = "box" + i;
            boxBg.addTouchTap(this.boxClick, this, [i]);
        }
    };
    AcThreekingdomsRechargeView.prototype.freshBox = function () {
        var data = this.cfg.getAchieveData();
        var currRate = this.vo.getProcessNum();
        for (var i = 0; i < data.length; i++) {
            var box = this._scrollNode.getChildByName("box" + i);
            var boxEffect = this._scrollNode.getChildByName("boxEffect" + i);
            if (this.vo.isGetAchieveRewardById(data[i].id)) {
                //已领取
                egret.Tween.removeTweens(box);
                box.rotation = 0;
                boxEffect.visible = false;
                box.setRes("acturantable_task_box2_3");
            }
            else {
                if (data[i].specialnum <= currRate) {
                    //可领取
                    boxEffect.visible = true;
                    boxEffect.playWithTime(0);
                    box.setRes("acturantable_task_box2_2");
                    egret.Tween.get(box, { loop: true }).to({ rotation: 10 }, 50).to({ rotation: -10 }, 100).to({ rotation: 10 }, 100).to({ rotation: 0 }, 50).wait(500);
                }
                else {
                    //不可领取
                    egret.Tween.removeTweens(box);
                    box.rotation = 0;
                    boxEffect.visible = false;
                    box.setRes("acturantable_task_box2_1");
                }
            }
        }
    };
    AcThreekingdomsRechargeView.prototype.boxClick = function (target, index) {
        App.LogUtil.log("boxClick: " + index);
        var data = this.cfg.getAchieveData();
        ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSRECHARGEACHIEVEPOPUPVIEW, { aid: this.aid, code: this.code, id: data[index].id });
    };
    AcThreekingdomsRechargeView.prototype.playBtnClick = function (index) {
        App.LogUtil.log("playBtnClick: " + index);
        if (!this.vo.isInActivity()) {
            this.vo.showAcEndTip();
            return;
        }
        if (this._isSelPlayBtn) {
            return;
        }
        this._lastProcessNum = this.vo.getProcessNum();
        var currNum = this.vo.getCurrNum();
        if (index == 0) {
            var isFree = 0;
            if (this.vo.isFree()) {
                isFree = 1;
            }
            if (isFree == 0 && currNum < this.cfg.consume1) {
                this.showRechargeTipView();
                return;
            }
            this._isPlayTen = false;
            this._isSelPlayBtn = true;
            NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMSRECHARGE_LOTTERY, { activeId: this.vo.aidAndCode, isFree: isFree, isTenPlay: 0, isFifty: 0 });
        }
        else {
            var isFifty = 0;
            var isTenPlay = 0;
            if (this._isPlayBatch) {
                if (currNum < this.cfg.consume1 * 50) {
                    this.showRechargeTipView();
                    return;
                }
                isFifty = 1;
            }
            else {
                if (currNum < this.cfg.consume1 * 10) {
                    this.showRechargeTipView();
                    return;
                }
                isTenPlay = 1;
            }
            this._isPlayTen = true;
            this._isSelPlayBtn = true;
            NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMSRECHARGE_LOTTERY, { activeId: this.vo.aidAndCode, isFree: 0, isTenPlay: isTenPlay, isFifty: isFifty });
        }
    };
    AcThreekingdomsRechargeView.prototype.playBtnCallback = function (event) {
        var _this = this;
        if (event.data.ret) {
            var rData = event.data.data.data;
            this._rewardData = rData;
            if (this._isSkipAni) {
                this.showPlayReward();
                this._isSelPlayBtn = false;
                return;
            }
            this.showViewMask();
            var openIds_1 = this.vo.openBossBattleIndex(this._lastProcessNum);
            App.LogUtil.log("playBtncallback " + openIds_1.length);
            var time = 1500;
            if (this._isPlayTen) {
                time *= 2;
            }
            egret.Tween.get(this).call(function () {
                _this.setLeaderState("run");
                _this.playBgAni(true);
            })
                .wait(time)
                .call(function () {
                _this.playBgAni(false);
                if (openIds_1.length > 0) {
                    _this.showBlackView();
                }
                else {
                    _this._isSelPlayBtn = false;
                    _this.setLeaderState("idle");
                    _this.showPlayReward();
                }
            });
        }
        else {
            this._isSelPlayBtn = false;
        }
    };
    AcThreekingdomsRechargeView.prototype.showBlackView = function () {
        var _this = this;
        var blackBg = BaseBitmap.create("public_9_black");
        blackBg.width = GameConfig.stageWidth;
        blackBg.height = GameConfig.stageHeigth;
        this.addChild(blackBg);
        blackBg.name = "blackBg";
        blackBg.touchEnabled = true;
        blackBg.alpha = 0;
        egret.Tween.get(blackBg).to({ alpha: 1 }, 900).call(function () {
            _this._leaderContainer.setScale(0.5);
            _this._leaderContainer.x = 20;
            _this.addEnemy();
            _this.playUIAni(false);
        }).wait(100).to({ alpha: 0 }, 500).call(function () {
            egret.Tween.get(_this._leaderContainer).to({ x: GameConfig.stageWidth / 2 - 360, scaleX: 1, scaleY: 1 }, 1200).call(function () {
                _this.setLeaderState("atk");
            });
            if (_this._enemy) {
                egret.Tween.get(_this._enemyContainer).to({ x: GameConfig.stageWidth / 2 - 150, scaleX: 1, scaleY: 1 }, 1200).call(function () {
                    ;
                    _this.setEnemyState("atk");
                });
            }
        });
    };
    AcThreekingdomsRechargeView.prototype.addEnemy = function () {
        if (!this._enemy) {
            var enemyContainer = new BaseDisplayObjectContainer();
            this.addChildToContainer(enemyContainer);
            this._enemyContainer = enemyContainer;
            //将军影子
            var shadowStr = ResourceManager.hasRes("acthreekingdomrecharge_shadowbg-" + this.getTypeCode()) ? "acthreekingdomrecharge_shadowbg-" + this.getTypeCode() : "acthreekingdomrecharge_shadowbg-1";
            var leaderShadow = BaseBitmap.create(shadowStr);
            leaderShadow.setPosition(156, 180);
            enemyContainer.addChild(leaderShadow);
            var enemyStr = ResourceManager.hasRes("acthkingdomrecharge_enemyrun-" + this.getTypeCode() + "_") ? "acthkingdomrecharge_enemyrun-" + this.getTypeCode() + "_" : "acthkingdomrecharge_enemyrun-1_";
            var enemy = ComponentManager.getCustomMovieClip(enemyStr, 5, 125);
            enemy.playWithTime(0);
            enemyContainer.addChild(enemy);
            this._enemy = enemy;
            enemyContainer.setScale(0.5);
            // enemy.setPosition(GameConfig.stageWidth - enemy.scaleX * 500 - 150, this._leader.y);
            enemyContainer.setPosition(GameConfig.stageWidth - enemyContainer.scaleX * 500 - 20, this._leaderContainer.y);
        }
    };
    //设置将军的状态
    AcThreekingdomsRechargeView.prototype.setLeaderState = function (type) {
        var _this = this;
        var frames = [];
        var frameData = this.leaderStateFrame[type];
        for (var i = 0; i < frameData.num; i++) {
            frames[i] = frameData.name + (i + 1);
        }
        if (type == "atk") {
            App.LogUtil.log("leader atk 0");
            this._leader.stop();
            if (this._isDie) {
                this._leader.playWithTime(1);
                this._leader.setEndCallBack(function () {
                    App.LogUtil.log("leader atk 2");
                    _this._isDie = false;
                    _this.setEnemyState("die");
                    _this.setLeaderState("idle");
                    _this._leader.stop();
                    _this._leader.playWithTime(0);
                }, this);
            }
            else {
                this._leader.playWithTime(2);
                this._leader.setEndCallBack(function () {
                    App.LogUtil.log("leader atk 1");
                    _this.setLeaderState("idle");
                    _this._leader.stop();
                    _this._leader.playWithTime(0);
                }, this);
            }
        }
        this._leader.frameImages = frames;
    };
    //设置敌军的状态
    AcThreekingdomsRechargeView.prototype.setEnemyState = function (type) {
        var _this = this;
        if (!this._enemy) {
            return;
        }
        var frames = [];
        var frameData = this.enemyStateFrame[type];
        for (var i = 0; i < frameData.num; i++) {
            frames[i] = frameData.name + (i + 1);
        }
        this._enemy.frameImages = frames;
        if (type == "atk") {
            this._enemy.stop();
            this._enemy.playWithTime(2);
            this.playBgSharkAni();
            App.LogUtil.log("enemy atk callback 0");
            this._enemy.setEndCallBack(function () {
                App.LogUtil.log("enemy atk callback 1");
                if (type == "atk") {
                    App.LogUtil.log("enemy atk callback");
                    egret.Tween.removeTweens(_this._bgContainer);
                    _this._bgContainer.setPosition(0, 0);
                    _this.playBigAttack();
                    _this._enemy.stop();
                    _this.setEnemyState("idle");
                    _this._enemy.playWithTime(0);
                }
            }, this);
        }
        else if (type == "die") {
            this._enemy.stop();
            this._enemy.playWithTime(1);
            this._enemy.setEndCallBack(function () {
                App.LogUtil.log("enemy die callback");
                _this.playEnemyDieCallback();
            }, this);
        }
    };
    //boss攻击特效
    AcThreekingdomsRechargeView.prototype.playBigAttack = function () {
        var _this = this;
        egret.Tween.removeTweens(this._bgContainer);
        this._bgContainer.setPosition(0, 0);
        App.LogUtil.log("playBigAttack");
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
        var skinId = this.cfg.show;
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
                    atkMaskContainer.visible = false;
                    // atkMaskContainer.dispose();
                    // this.setEnemyState("die");
                }).wait(500).call(function () {
                    atkMaskContainer.dispose();
                    // this.setEnemyState("die");
                    _this._isDie = true;
                    _this.setLeaderState("atk");
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
        var atkTxtStr = ResourceManager.hasRes("acthreekingdomsrecharge_killflag_1-" + this.getTypeCode()) ? "acthreekingdomsrecharge_killflag_1-" + this.getTypeCode() : "acthreekingdomsrecharge_killflag_1-1";
        var atkTxt = BaseBitmap.create(atkTxtStr);
        atkTxt.setPosition(80, 20);
        atkTxtContainer.addChild(atkTxt);
        atkTxt.blendMode = egret.BlendMode.ADD;
        //播放完成 隐藏 播击打特效
        if (skillBg) {
            egret.Tween.get(servantSkin).wait(250).to({ x: 150 }, 250).wait(600).to({ x: GameConfig.stageWidth + 200, y: atkMaskContainer.height - 450 }, 220);
            egret.Tween.get(atkTxtContainer).wait(200).to({ x: 150 }, 300).wait(600).to({ x: -GameConfig.stageWidth }, 220).call(function () {
                atkMaskContainer.visible = false;
                // atkMaskContainer.dispose();
                // this.setEnemyState("die");
            }).wait(500).call(function () {
                atkMaskContainer.dispose();
                // this.setEnemyState("die");
                _this._isDie = true;
                _this.setLeaderState("atk");
            });
        }
    };
    //敌军死亡
    AcThreekingdomsRechargeView.prototype.playEnemyDieCallback = function () {
        this.showPlayReward();
        this._isSelPlayBtn = false;
        var blackBg = this.getChildByName("blackBg");
        if (blackBg) {
            blackBg.dispose();
        }
    };
    //地震效果
    AcThreekingdomsRechargeView.prototype.playBgSharkAni = function () {
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
    //播放奖励
    AcThreekingdomsRechargeView.prototype.showPlayReward = function () {
        var _this = this;
        var rData = this._rewardData;
        if (rData) {
            App.LogUtil.log("showPlayReward " + rData.rewards);
            var view = this;
            var isSameAdd = false;
            if (view._isPlayTen && view._isPlayBatch) {
                isSameAdd = true;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rData.rewards, "isPlayAni": true, "isSameAdd": isSameAdd, "callback": function () {
                    _this.hideViewMask();
                    _this.refreshUi();
                    if (_this._enemy) {
                        _this.playUIAni(true);
                        _this._enemy.dispose();
                        _this._enemyContainer.dispose();
                        _this._enemy = null;
                        _this._enemyContainer = null;
                    }
                    _this._leaderContainer.setPosition(GameConfig.stageWidth / 2 - 240, _this._soldierContainer.y - 50);
                } });
            if (rData.replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": rData.replacerewards });
            }
        }
    };
    //斩动画
    AcThreekingdomsRechargeView.prototype.playGuanqiaItemAni = function () {
        var _this = this;
        App.LogUtil.log("playGuanqiaItemAni");
        var openIds = this.vo.openBossBattleIndex(this._lastProcessNum);
        if (openIds.length > 0) {
            App.LogUtil.log("playGuanqiaItemAni 1");
            var _loop_1 = function (i) {
                egret.Tween.get(this_1._guanqiaItemList[openIds[i]]).wait(300 * (i + 1)).call(function () {
                    _this._guanqiaItemList[openIds[i]].playFlagAni();
                    if (i == openIds.length - 1) {
                        egret.Tween.get(_this).wait(100 * (i + 1) + 200).call(function () {
                            var guanqiaId = _this.vo.getCurrGuanqiaId();
                            if (guanqiaId > -1) {
                                _this.moveScrollView();
                            }
                        });
                    }
                });
            };
            var this_1 = this;
            for (var i = 0; i < openIds.length; i++) {
                _loop_1(i);
            }
            // let guanqiaId = this.vo.getCurrGuanqiaId();
            // if (guanqiaId > -1 ){
            //     this.moveScrollView();
            // }
        }
    };
    AcThreekingdomsRechargeView.prototype.refreshUi = function () {
        //距敌步数
        var processNum = this._processContainer.getChildByName("processNum");
        var guanqiaId = this.vo.getCurrGuanqiaId();
        var processStr = "";
        if (guanqiaId == -1) {
            processStr = LanguageManager.getlocal("acThreekingdomsRechargeEnemyEnd-" + this.getTypeCode());
        }
        else {
            processStr = LanguageManager.getlocal("acThreekingdomsRechargeEnemyDistance-" + this.getTypeCode(), ["" + this.vo.getNextGuanqiaNeedNum()]);
        }
        processNum.text = processStr;
        processNum.anchorOffsetX = processNum.width / 2;
        //关卡名字
        var guanqiaName = this._topContainer.getChildByName("guanqiaName");
        var guanqiaData = this.cfg.getAchieveData();
        var nameIndex = guanqiaId + 1;
        if (guanqiaId == -1) {
            nameIndex = guanqiaData.length;
        }
        guanqiaName.text = LanguageManager.getlocal("acThreekingdomsRechargeGuanqia-" + this.getTypeCode() + "_" + nameIndex);
        //免费
        if (this.vo.isFree()) {
            this._freeDesc.visible = true;
            this._oneNeedContainer.visible = false;
        }
        else {
            this._freeDesc.visible = false;
            this._oneNeedContainer.visible = true;
        }
        if (this.vo.getProcessNum() >= 50) {
            this._goMoreContainer.visible = true;
        }
        else {
            this._goMoreContainer.visible = false;
        }
        //关卡滑动
        // if (guanqiaId > -1 ){
        //     // if (guanqiaId > 3){
        //     //     this._scrollView.scrollLeft = this._scrollNode.width - this._scrollView.width;
        //     // }
        //     // else{
        //     //     this._scrollView.scrollLeft = 0;
        //     // }
        //     this.moveScrollView();
        // } 
        //progress
        var percent = this.vo.getProgressPer();
        this._progress.setPercentage(percent);
        this._proLight.x = this._progress.x + this._progress.width * this._progress.getPercent() + 3;
        // pro num
        var currProNum = this._currProContainer.getChildByName("currProNum");
        currProNum.text = LanguageManager.getlocal("acThreekingdomsRechargeProgressDistance-" + this.getTypeCode(), ["" + this.vo.getProcessNum()]);
        currProNum.x = this._currProContainer.width / 2 - currProNum.width / 2;
        this._currProContainer.x = this._progress.x + this._progress.width * this._progress.getPercent() - this._currProContainer.width / 2;
        // if (this._progress.width * this._progress.getPercent() < this._currProContainer.width/2){
        //     this._currProContainer.x = this._progress.x;
        // }
        // else if (this._progress.width * (1 - this._progress.getPercent()) < this._currProContainer.width/2){
        //     this._currProContainer.x = this._progress.x + this._progress.width - this._currProContainer.width;
        // }
        //box
        this.freshBox();
        this.playGuanqiaItemAni();
    };
    //mask
    AcThreekingdomsRechargeView.prototype.showViewMask = function () {
        var touchPos = BaseBitmap.create("public_alphabg");
        touchPos.width = GameConfig.stageWidth;
        touchPos.height = GameConfig.stageHeigth;
        this.addChild(touchPos);
        touchPos.name = "yiyibusheTouchPos";
        touchPos.touchEnabled = true;
    };
    AcThreekingdomsRechargeView.prototype.hideViewMask = function () {
        var touchPos = this.getChildByName("yiyibusheTouchPos");
        if (touchPos) {
            touchPos.touchEnabled = false;
            touchPos.dispose();
        }
    };
    AcThreekingdomsRechargeView.prototype.refreshView = function () {
        var currToolNum = this.vo.getCurrNum();
        this._toolNum.text = "" + currToolNum;
        this._toolNumIcon.x = GameConfig.stageWidth / 2 - (this._toolNumIcon.width * this._toolNumIcon.scaleX + this._toolNum.width) / 2;
        this._toolNum.x = this._toolNumIcon.x + this._toolNumIcon.width * this._toolNumIcon.scaleX;
        this.checkQingyuanRed();
        var rechargeTip = this._topContainer.getChildByName("rechargeTip");
        rechargeTip.text = LanguageManager.getlocal("acThreekingdomsRechargeGetToolNum-" + this.getTypeCode(), ["" + this.vo.getRechargeNeed()]);
        rechargeTip.x = GameConfig.stageWidth - rechargeTip.width - 10;
    };
    AcThreekingdomsRechargeView.prototype.getAchievementCallback = function () {
        this.freshBox();
    };
    //ui ani
    AcThreekingdomsRechargeView.prototype.playUIAni = function (isShow) {
        var _this = this;
        if (isShow) {
            egret.Tween.get(this.titleBg).to({ y: 0, alpha: 1 }, 40);
            this._ruleBtn.visible = true;
            egret.Tween.get(this._ruleBtn).to({ y: 22, alpha: 1 }, 50);
            this.closeBtn.visible = true;
            egret.Tween.get(this.closeBtn).to({ y: 0, alpha: 1 }, 50);
            this._topContainer.visible = true;
            egret.Tween.get(this._topContainer).to({ y: 85, alpha: 1 }, 200);
            this._guanqiaContainer.visible = true;
            egret.Tween.get(this._guanqiaContainer).wait(50).to({ y: GameConfig.stageHeigth - 250, alpha: 1 }, 250); //250
            this._bottomContainer.visible = true;
            egret.Tween.get(this._bottomContainer).wait(150).to({ y: GameConfig.stageHeigth - 158, alpha: 1 }, 150); //158
            this._processContainer.visible = true;
            egret.Tween.get(this._processContainer).wait(230).to({ x: GameConfig.stageWidth - 72, alpha: 1 }, 70); //72
            this._skipContainer.visible = true;
            egret.Tween.get(this._skipContainer).wait(150).to({ x: 0, alpha: 1 }, 150); //150
        }
        else {
            // egret.Tween.get(this._ruleBtn).to({y: -100, alpha:0}, 50).call(()=>{this._ruleBtn.visible = false});
            // egret.Tween.get(this.closeBtn).to({y: -100, alpha:0}, 50).call(()=>{this.closeBtn.visible = false});
            // egret.Tween.get(this.titleBg).to({y: -100, alpha:0}, 50);
            // egret.Tween.get(this._topContainer).to({y: -400, alpha: 0}, 200).call(()=>{this._topContainer.visible = false});
            // egret.Tween.get(this._guanqiaContainer).to({y: GameConfig.stageHeigth, alpha: 0}, 155).call(()=>{this._guanqiaContainer.visible = false}); //250
            // egret.Tween.get(this._bottomContainer).to({y: GameConfig.stageHeigth, alpha: 0}, 79).call(()=>{this._bottomContainer.visible = false}); //158
            // egret.Tween.get(this._processContainer).to({x: GameConfig.stageWidth, alpha: 0}, 60).call(()=>{this._processContainer.visible = false}); //72
            egret.Tween.get(this._ruleBtn).to({ y: -100, alpha: 0 }, 0).call(function () { _this._ruleBtn.visible = false; });
            egret.Tween.get(this.closeBtn).to({ y: -100, alpha: 0 }, 0).call(function () { _this.closeBtn.visible = false; });
            egret.Tween.get(this.titleBg).to({ y: -100, alpha: 0 }, 0);
            egret.Tween.get(this._topContainer).to({ y: -400, alpha: 0 }, 0).call(function () { _this._topContainer.visible = false; });
            egret.Tween.get(this._guanqiaContainer).to({ y: GameConfig.stageHeigth, alpha: 0 }, 0).call(function () { _this._guanqiaContainer.visible = false; }); //250
            egret.Tween.get(this._bottomContainer).to({ y: GameConfig.stageHeigth, alpha: 0 }, 0).call(function () { _this._bottomContainer.visible = false; }); //158
            egret.Tween.get(this._processContainer).to({ x: GameConfig.stageWidth, alpha: 0 }, 0).call(function () { _this._processContainer.visible = false; }); //72
            egret.Tween.get(this._skipContainer).to({ x: -150, alpha: 0 }, 0).call(function () { _this._skipContainer.visible = false; }); //150
        }
    };
    AcThreekingdomsRechargeView.prototype.tick = function () {
        this._acTimeTf.text = LanguageManager.getlocal("acThreekingdomsRechargeTimeCountDown", [this.vo.getCountDown()]);
        this._timeBg.width = 60 + this._acTimeTf.width;
        this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 5;
        this._acTimeTf.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._acTimeTf.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._acTimeTf.height / 2);
    };
    AcThreekingdomsRechargeView.prototype.showRechargeTipView = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
            title: "acThreekingdomsRechargeTipTitle-" + this.getTypeCode(),
            msg: LanguageManager.getlocal("acThreekingdomsRechargeTipMsg-" + this.getTypeCode()),
            callback: function () {
                ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
            },
            handler: this,
            needCancel: true
        });
    };
    //开场动画
    AcThreekingdomsRechargeView.prototype.showStartAni = function () {
        var _this = this;
        var localkey = this.vo.aidAndCode + Api.playerVoApi.getPlayerID();
        var lastTime = 0;
        var timeStr = LocalStorageManager.get(localkey);
        if (timeStr && timeStr != "") {
            lastTime = Number(timeStr);
        }
        if (lastTime == this.vo.et) {
            return;
        }
        LocalStorageManager.set(localkey, String(this.vo.et));
        var startAniContainer = new BaseDisplayObjectContainer();
        startAniContainer.width = GameConfig.stageWidth;
        startAniContainer.height = GameConfig.stageHeigth;
        this.addChild(startAniContainer);
        // let mask = BaseBitmap.create("public_9_viewmask");
        var mask = BaseBitmap.create("public_alphabg");
        mask.width = GameConfig.stageWidth;
        mask.height = GameConfig.stageHeigth;
        // mask.touchEnabled = true;
        // startAniContainer.addChild(mask);
        // mask.alpha = 0;
        mask.addTouchTap(function () {
            App.LogUtil.log("this._isPlayStartInfo " + _this._isPlayStartInfo);
            if (!_this._isPlayStartInfo) {
                App.LogUtil.log("this._isPlayStartInfo 0");
                egret.Tween.removeTweens(info);
                egret.Tween.get(startAniContainer).call(function () {
                    _this.showStartDialog();
                }).wait(80).call(function () {
                    egret.Tween.removeTweens(startAniContainer);
                    startAniContainer.dispose();
                });
            }
            if (info) {
                App.LogUtil.log("this._isPlayStartInfo 1");
                if (_this._isPlayStartInfo) {
                    egret.Tween.removeTweens(info);
                    info.y = 10;
                    _this._isPlayStartInfo = false;
                }
            }
        }, this);
        var bgImg = ResourceManager.hasRes("acthreekingdomsrecharge_storybg-" + this.getTypeCode()) ? "acthreekingdomsrecharge_storybg-" + this.getTypeCode() : "acthreekingdomsrecharge_storybg-1";
        var bg = BaseBitmap.create(bgImg);
        bg.setPosition(startAniContainer.width / 2 - bg.width / 2, startAniContainer.height / 2 - bg.height / 2);
        startAniContainer.addChild(bg);
        var infobg = BaseBitmap.create("acthreekingdomsrecharge_storyinfobg");
        infobg.setPosition(startAniContainer.width / 2 - infobg.width / 2, startAniContainer.height / 2 - infobg.height / 2);
        startAniContainer.addChild(infobg);
        var scrolNode = new BaseDisplayObjectContainer();
        scrolNode.width = infobg.width - 69;
        scrolNode.height = infobg.height - 20;
        var rect = new egret.Rectangle(0, 0, infobg.width - 69, infobg.height - 20);
        var scrollview = ComponentManager.getScrollView(scrolNode, rect);
        scrollview.bounces = false;
        scrollview.x = infobg.x + 10;
        scrollview.y = infobg.y + 5;
        scrollview.horizontalScrollPolicy = 'off';
        scrollview.verticalScrollPolicy = 'off';
        scrollview.setPosition(infobg.x + 38, infobg.y + 15);
        startAniContainer.addChild(scrollview);
        var info = ComponentManager.getTextField(LanguageManager.getlocal("acThreekingdomsRechargeStartInfo-" + this.getTypeCode()), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        info.width = 360;
        info.lineSpacing = 7;
        info.setPosition(0, scrolNode.y + scrolNode.height);
        scrolNode.addChild(info);
        var continueMsg = ComponentManager.getTextField(LanguageManager.getlocal("acThreekingdomsRechargeStartContinue"), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_WHITE);
        continueMsg.setPosition(infobg.x + infobg.width / 2 - continueMsg.width / 2, infobg.y + infobg.height + 20);
        startAniContainer.addChild(continueMsg);
        startAniContainer.addChild(mask);
        if (info.height > scrolNode.height) {
            App.LogUtil.log("this._isPlayStartInfo 4");
            var offY = Math.ceil((info.height - scrolNode.height) / 150);
            var time = 8000 + offY * 1000;
            this._isPlayStartInfo = true;
            egret.Tween.get(info).to({ y: -offY }, time).call(function () {
                App.LogUtil.log("this._isPlayStartInfo 2");
                _this._isPlayStartInfo = false;
            });
        }
        else {
            this._isPlayStartInfo = true;
            egret.Tween.get(info).to({ y: 10 }, 8000).call(function () {
                App.LogUtil.log("this._isPlayStartInfo 3");
                _this._isPlayStartInfo = false;
            });
            ;
        }
    };
    AcThreekingdomsRechargeView.prototype.showStartDialog = function () {
        var localkey = this.vo.aidAndCode + Api.playerVoApi.getPlayerID() + "dialog";
        var lastTime = 0;
        var timeStr = LocalStorageManager.get(localkey);
        if (timeStr && timeStr != "") {
            lastTime = Number(timeStr);
        }
        if (lastTime == this.vo.et) {
            return;
        }
        LocalStorageManager.set(localkey, String(this.vo.et));
        var view = this;
        var keyStr = "startDialog_" + this.getTypeCode();
        var startCfg = view.cfg[keyStr];
        var bgName = ResourceManager.hasRes("acthreekingdomsrecharge_startbg-" + view.getTypeCode()) ? "acthreekingdomsrecharge_startbg-" + view.getTypeCode() : "acthreekingdomsrecharge_startbg-1";
        ViewController.getInstance().openView(ViewConst.POPUP.ACYIYIBUSHEAVGVIEW, {
            aid: view.aid,
            code: "" + view.getTypeCode(),
            AVGDialog: startCfg,
            visitId: "1",
            talkKey: "acThreekingdomsRechargeStartTalk_",
            bgName: bgName
        });
    };
    //开启战斗
    AcThreekingdomsRechargeView.prototype.initBeginView = function () {
        var _this = this;
        var servantSkin = Config.ServantskinCfg.getServantSkinItemById(this.cfg.show);
        var beginContainer = new BaseDisplayObjectContainer();
        this.addChild(beginContainer);
        //mask
        var beginMask = BaseBitmap.create("public_9_viewmask");
        beginMask.width = GameConfig.stageWidth;
        beginMask.height = GameConfig.stageHeigth;
        beginContainer.addChild(beginMask);
        //servant
        var skinImg = BaseLoadBitmap.create(servantSkin.body);
        skinImg.width = 405;
        skinImg.height = 467;
        skinImg.setPosition(beginMask.x + beginMask.width / 2 - skinImg.width / 2, beginMask.y + beginMask.height / 2 - skinImg.height / 2);
        beginContainer.addChild(skinImg);
        var enterTxtBg = BaseBitmap.create("acthreekingdomrecharge_enter_txt");
        enterTxtBg.setPosition(skinImg.x + skinImg.width / 2 - enterTxtBg.width / 2, skinImg.y + skinImg.height - 130);
        beginContainer.addChild(enterTxtBg);
        //云
        var leftYun = BaseLoadBitmap.create("acliangbiographyview_leftyun", null, {
            callback: function () {
                leftYun.setPosition(beginMask.x, skinImg.y + skinImg.height - 140);
            }, callbackThisObj: this, callbackParams: null
        });
        // leftYun.width = 399;
        // leftYun.height = 219;
        beginContainer.addChild(leftYun);
        var rightYun = BaseLoadBitmap.create("acliangbiographyview_rightyun");
        // , null, {
        // 	callback: () => {
        // 		rightYun.setPosition(beginMask.x + beginMask.width - rightYun.width, skinImg.y + skinImg.height - 140);
        // 	}, callbackThisObj: this, callbackParams: null
        // });
        rightYun.width = 235;
        rightYun.height = 153;
        rightYun.setPosition(beginMask.x + beginMask.width - rightYun.width, skinImg.y + skinImg.height - 100);
        beginContainer.addChild(rightYun);
        var isBeginPlay = false;
        beginMask.addTouchTap(function () {
            if (isBeginPlay) {
                return;
            }
            isBeginPlay = true;
            egret.Tween.get(leftYun).to({ x: beginMask.x - 235 }, 700).call(function () {
                egret.Tween.removeTweens(leftYun);
                egret.Tween.get(beginContainer).to({ alpha: 0 }, 400).call(function () {
                    egret.Tween.removeTweens(beginContainer);
                    beginContainer.setVisible(false);
                    beginContainer.dispose();
                });
            }, _this);
            egret.Tween.get(rightYun).to({ x: beginMask.x + beginMask.width + 153 }, 700).call(function () {
                egret.Tween.removeTweens(rightYun);
            }, _this);
        }, this);
    };
    Object.defineProperty(AcThreekingdomsRechargeView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreekingdomsRechargeView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcThreekingdomsRechargeView.prototype.getTypeCode = function () {
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
    AcThreekingdomsRechargeView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    AcThreekingdomsRechargeView.prototype.getTitleBgName = function () {
        return "acthreekingdomsrecharge_titlebg-" + this.getTypeCode();
    };
    // protected getBgName():string{
    //     return "acthreekingdomsrecharge_bg-"+this.getTypeCode();
    // }
    AcThreekingdomsRechargeView.prototype.getTitleStr = function () {
        return null;
    };
    //规则
    AcThreekingdomsRechargeView.prototype.getRuleInfo = function () {
        return "acThreekingdomsRechargeRuleInfo-" + this.getTypeCode();
    };
    AcThreekingdomsRechargeView.prototype.getResourceList = function () {
        var list = [];
        if (this.getTypeCode() != "1") {
            list = [
                "acthreekingdomscode1",
                "acthreekingdomsrecharge_bg-1", "acthreekingdomsrecharge_infobg-1", "acthreekingdomsrecharge_startbg-1", "acthreekingdomsrecharge_storybg-1", "acthreekingdomsrecharge_titlebg-1", "acthreekingdomsrecharge_skybg-1", "acthreekingdomsrecharge_montbg-1",
            ];
        }
        else {
            list = [
                "acthreekingdomsrecharge_bg-" + this.getTypeCode(), "acthreekingdomsrecharge_startbg-" + this.getTypeCode(), "acthreekingdomsrecharge_storybg-" + this.getTypeCode(), "acthreekingdomsrecharge_skybg-" + this.getTypeCode(), "acthreekingdomsrecharge_montbg-" + this.getTypeCode(),
            ];
        }
        return _super.prototype.getResourceList.call(this).concat([
            "acheroine_startInfobg-1", "acheroine_firebg-1", "acwealthcarpview_servantskintxt", "acturantable_task_box2_1", "acturantable_task_box2_2", "acturantable_task_box2_3", "acheroine_boxbg1", "progress3_bg", "progress3", "acthreekingdomsrecharge_distancebg", "acthreekingdomsrecharge_enemydis_flag", "acthreekingdomsrecharge_guanqiaitem_nambg", "acthreekingdomsrecharge_prodistance", "acthreekingdomsrecharge_storyinfobg", "acthreekingdomsrecharge_proleftmask", "acthreekingdomsrecharge_prorightmask", "acthreekingdomsrecharge_distancenumbg", "acheroine_light", "acthreekingdomrecharge_enter_txt",
            "acthreekingdomscode" + this.getTypeCode(),
            "acthreekingdomsrecharge_titlebg-" + this.getTypeCode(),
            "acthreekingdomsrecharge_infobg-" + this.getTypeCode(),
            // "acthreekingdomsrecharge_bg-"+this.getTypeCode(),"acthreekingdomsrecharge_startbg-"+this.getTypeCode(),"acthreekingdomsrecharge_storybg-"+this.getTypeCode(), "acthreekingdomsrecharge_skybg-"+this.getTypeCode(), "acthreekingdomsrecharge_montbg-"+this.getTypeCode(),
            // "acthkingdomrecharge_mysideatk-"+this.getTypeCode()+"_",
            // "acthkingdomrecharge_mysideidle-"+this.getTypeCode()+"_",
            // "acthkingdomrecharge_mysiderun-"+this.getTypeCode()+"_",
            // "acthkingdomrecharge_enemyatk-"+this.getTypeCode()+"_",
            // "acthkingdomrecharge_enemydie-"+this.getTypeCode()+"_",
            // "acthkingdomrecharge_enemyidle-"+this.getTypeCode()+"_",
            // "acthkingdomrecharge_enemyrun-"+this.getTypeCode()+"_",
            "acthkingdomrecharge_mysideatk-1_",
            "acthkingdomrecharge_mysideidle-1_",
            "acthkingdomrecharge_mysiderun-1_",
            "acthkingdomrecharge_enemyatk-1_",
            "acthkingdomrecharge_enemydie-1_",
            "acthkingdomrecharge_enemyidle-1_",
            "acthkingdomrecharge_enemyrun-1_",
        ]).concat(list);
    };
    AcThreekingdomsRechargeView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_THREEKINGDOMSRECHARGE_LOTTERY, this.playBtnCallback, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_THREEKINGDOMSRECHARGE_REWARDS, this.getAchievementCallback, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ENCOUNTER_MODEL, this.checkQingyuanRed, this);
        this._startAniStep = 0;
        this._startBone = null;
        this._timeBg = null;
        this._acTimeTf = null;
        this._freeDesc = null;
        this._oneNeedContainer = null;
        this._toolNumIcon = null;
        this._toolNum = null;
        this._guanqiaItemList = [];
        this._progress = null;
        this._scrollNode = null;
        this._currProContainer = null;
        this._topContainer = null;
        this._bottomContainer = null;
        this._guanqiaContainer = null;
        this._processContainer = null;
        this._isSelPlayBtn = false;
        this._isPlayTen = false;
        this._isPlayStartInfo = false;
        this._lastProcessNum = 0;
        this._scrollView = null;
        this._rewardData = null;
        this._bgContainer = null;
        this._bg = null;
        this._bg_ = null;
        this._mountBg = null;
        this._mountBg_ = null;
        this._soldierContainer = null;
        this._leader = null;
        this._enemy = null;
        this._qingyuanBtn = null;
        this._leaderContainer = null;
        this._enemyContainer = null;
        this._isDie = false;
        this._isSkipAni = false;
        this._isPlayBatch = false;
        this._goMoreContainer = null;
        this._skipContainer = null;
        this._playMultiBtn = null;
        this._playmultiNeedNum = null;
        _super.prototype.dispose.call(this);
    };
    return AcThreekingdomsRechargeView;
}(AcCommonView));
//# sourceMappingURL=AcThreekingdomsRechargeView.js.map