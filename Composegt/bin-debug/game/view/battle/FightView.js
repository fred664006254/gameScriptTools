/**
 * 关卡战斗view
 * author shaoliang
 * date 2018/1/3
 * @class FightView
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
var FightView = (function (_super) {
    __extends(FightView, _super);
    function FightView() {
        var _this = _super.call(this) || this;
        /**
         * 当前第几关的小点点
         */
        _this._dotBar = undefined;
        _this._rattle = undefined;
        _this._countDown = undefined;
        _this._countDownLb = undefined;
        _this._challengeConfig = undefined;
        /**
         * 倒计时 0时候出发事件，默认-1
         */
        _this._countDownTime = -1;
        _this._lossTipContainer = undefined;
        _this._tiptxt = undefined;
        //秒杀
        _this._miaoshaBtn = null;
        _this._miaoshaTipBg = null;
        _this._miaoshaNewTip = null;
        _this._battleBiginCid = 0;
        _this._isMiaoshaStart = false;
        _this._miaoshaStartPlayerSoldier = 0;
        return _this;
    }
    FightView.prototype.getResourceList = function () {
        if (Api.challengeVoApi.getCurBigChannelId() == FightView.curChannelId) {
            if (!FightView.curBgName) {
                FightView.curBgName = "battlebg" + (Math.floor(Math.random() * 8) + 1);
            }
        }
        else {
            // FightView.curChannelId = Api.challengeVoApi.getCurBigChannelId();
            FightView.curBgName = "battlebg" + (Math.floor(Math.random() * 8) + 1);
        }
        return _super.prototype.getResourceList.call(this).concat([
            // "battlebg",
            "battle_dot_full",
            "battle_dot_none",
            ButtonConst.BATTLE_START_BTN_1,
            FightView.curBgName,
            "battle_info_bg",
            "progress_type1_red",
            "progress_type1_yellow",
            "progress_type1_bg2",
            "progress_type3_red",
            "progress_type1_yellow2",
            "progress_type3_bg",
            "challenge_officebg",
            "battle_luanz",
            // "prisonview_1",
            "atkrace_skip",
            "fightview_miaohsabutton", "fightview_miaoshatxt", 'fightview_miaoshabg'
        ]);
    };
    FightView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_LEVY_CALC, requestData: {} };
    };
    /**
     * 胜利之后刷新 战斗view
     */
    FightView.prototype.resetGameAfterWin = function () {
        this.resetConfig();
        this._dotBar.curNum = Api.challengeVoApi.getCurSmallChannelId();
        for (var k1 in this._leftSoldiers) {
            var v1 = this._leftSoldiers[k1];
            v1.dispose();
        }
        for (var k2 in this._rightSoldiers) {
            var v2 = this._rightSoldiers[k2];
            v2.dispose();
        }
        this._curLost.length = 0;
        this._curLost = [0, 0];
        this._lostSoldier.length = 0;
        this._lostSoldier = [0, 0];
        this._leftSoldiers.length = 0;
        this._rightSoldiers.length = 0;
        this._meetPointTab.length = 0;
        this._lostOrder.length = 0;
        this.calculateSoldierNumber();
        this.initRightSoldiers();
        this.initLeftSoldiers();
        this.calculateMeetPoint();
        this.removeChild(this._battleInfoTab[0]);
        this.addChild(this._battleInfoTab[0]);
        this._gameBtn.touchEnabled = true;
        this._gameBtn.visible = true;
        for (var k8 in this._battleInfoTab) {
            var v8 = this._battleInfoTab[k8];
            v8.resetInfo(this._totalOldNum[k8]);
            this._battleInfoTab[k8].curNumber = this._totalNum[k8];
        }
        this._rattle = new BattleRattle();
        this._rattle.init(this, 350, 2);
        this._rattle.setPosition(280, this._battleInfoTab[1].y + 110);
        this._rattle.resetString();
        this.resetFightTiptxt();
        this.setMiaoshaVisible(true);
        if (Api.playerVoApi.getSoldier() > 0 && Api.rookieVoApi.isInGuiding != true) {
            this.resetCountDown();
        }
    };
    FightView.prototype.battleBgName = function () {
        if (Api.challengeVoApi.getCurBigChannelId() == FightView.curChannelId) {
            // if(!FightView.curBgName){
            // 	FightView.curBgName = "battlebg"+(Math.floor(Math.random() * 8) + 1);
            // }
        }
        else {
            FightView.curChannelId = Api.challengeVoApi.getCurBigChannelId();
            // FightView.curBgName = "battlebg"+(Math.floor(Math.random() * 8) + 1);
        }
        return FightView.curBgName;
    };
    FightView.prototype.resetFightTiptxt = function () {
        // let rate = (this._totalOldNum[1] + 1000)/(this._totalOldNum[0] + 1000);
        var rate = (this._challengeConfig.atk + 1) / (Api.playerVoApi.getAtk() + 1);
        // this._challengeConfig
        var pcfg = Config.GameprojectCfg;
        var txtStr = "";
        if (rate <= pcfg.challengeRatio1) {
            txtStr = "fight_tiptxt1";
        }
        else if (rate <= pcfg.challengeRatio2 && rate > pcfg.challengeRatio1) {
            txtStr = "fight_tiptxt2";
        }
        else if (rate <= pcfg.challengeRatio3 && rate > pcfg.challengeRatio2) {
            txtStr = "fight_tiptxt3";
        }
        else if (rate <= pcfg.challengeRatio4 && rate > pcfg.challengeRatio3) {
            txtStr = "fight_tiptxt4";
        }
        else if (rate > pcfg.challengeRatio4) {
            txtStr = "fight_tiptxt5";
        }
        this._tiptxt.text = LanguageManager.getlocal(txtStr);
    };
    FightView.prototype.init = function () {
        _super.prototype.init.call(this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_CHALLENGE_AUTOSMALLATTACK, this.miaoshaHandler, this);
        Api.mainTaskVoApi.checkShowGuide("FightView");
        //初始化 双方信息
        for (var i = 0; i <= 1; i++) {
            this._battleInfoTab[i] = new BattleInfo();
            this._battleInfoTab[i].init(this._totalOldNum[i], i == 0);
            if (i == 0) {
                this._battleInfoTab[i].x = 15;
                this._battleInfoTab[i].y = GameConfig.stageHeigth - 50 - this._battleInfoTab[i].height;
            }
            else {
                this._battleInfoTab[i].x = GameConfig.stageWidth - 13 - this._battleInfoTab[i].width - 52;
                this._battleInfoTab[i].y = 195;
            }
            this.addChild(this._battleInfoTab[i]);
            this._battleInfoTab[i].curNumber = this._totalNum[i];
        }
        this.titleTF.text = Api.challengeVoApi.getCurBigChannelId().toString() + ". " + LanguageManager.getlocal("challengeTitle" + Api.challengeVoApi.getCurBigChannelId());
        this.titleTF.x = GameConfig.stageWidth / 2 - this.titleTF.width / 2;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CHALLENGE_ATTACK), this.intoBattle, this);
        this._lossTipContainer = new BaseDisplayObjectContainer();
        this.addChild(this._lossTipContainer);
        var losstipbg = BaseBitmap.create("public_lockbg");
        losstipbg.width = 450;
        // losstipbg.height = 30;
        losstipbg.x = GameConfig.stageWidth / 2 - losstipbg.width / 2; //this._battleInfoTab[0].x + this._battleInfoTab[0].width/2 - losstipbg.width/2;
        losstipbg.y = this._battleInfoTab[0].y + this._battleInfoTab[0].height - 5;
        losstipbg.name = "losstipbg";
        this._lossTipContainer.addChild(losstipbg);
        this._tiptxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_WARN_YELLOW_NEW);
        this.resetFightTiptxt();
        this._tiptxt.setPosition(losstipbg.x + losstipbg.width / 2 - this._tiptxt.width / 2, losstipbg.y + losstipbg.height / 2 - this._tiptxt.height / 2);
        this._lossTipContainer.addChild(this._tiptxt);
        this._dotBar = new BattleDotBar();
        var curChannel = Api.challengeVoApi.getCurChannelId();
        var smallNum = ChallengeCfg.getChallengeCfgById(curChannel).smallNum;
        if (!smallNum) {
            smallNum = 8;
        }
        this._dotBar.init(smallNum);
        this.addChildToContainer(this._dotBar);
        this.container.y = this.getTitleButtomY() - 3;
        this._dotBar.curNum = Api.challengeVoApi.getCurSmallChannelId();
        this._rattle = new BattleRattle();
        this._rattle.init(this, 350, 2);
        this._rattle.setPosition(280, this._battleInfoTab[1].y + 110);
        this._rattle.resetString();
        if (Api.playerVoApi.getSoldier() > 0 && Api.rookieVoApi.isInGuiding != true && Api.challengeVoApi.getCurSmallChannelId() != 0) {
            this.resetCountDown();
        }
        Api.rookieVoApi.checkNextStep();
        // this._skipBtn = ComponentManager.getButton("atkrace_skip",null,this.skipBattle,this);
        // this._skipBtn.setPosition(GameConfig.stageWidth-this._skipBtn.width-12,GameConfig.stageHeigth - 115);
        // this.addChild(this._skipBtn);	
        // this._skipBtn.visible = false;
        if (Api.challengeVoApi.getCurBigChannelId() >= 3) {
            this._miaoshaBtn = ComponentManager.getButton('fightview_miaohsabutton', "", this.miaoshaClick, this);
            this._miaoshaBtn.setPosition(GameConfig.stageWidth - this._miaoshaBtn.width - 30, GameConfig.stageHeigth - this._miaoshaBtn.height - 80);
            this.addChild(this._miaoshaBtn);
            if (Api.otherInfoVoApi.checkCanUseMiaosha()) {
                App.DisplayUtil.changeToNormal(this._miaoshaBtn);
            }
            else {
                App.DisplayUtil.changeToGray(this._miaoshaBtn);
            }
            if (Api.otherInfoVoApi.getMiaoshaLeftTime()) {
                this._miaoshaTipBg = BaseBitmap.create("fightview_miaoshabg");
                this._miaoshaTipBg.setPosition(this._miaoshaBtn.x + this._miaoshaBtn.width / 2 - this._miaoshaTipBg.width / 2, this._miaoshaBtn.y + this._miaoshaBtn.height + 3);
                this.addChild(this._miaoshaTipBg);
                this._miaoshaNewTip = ComponentManager.getTextField(Api.otherInfoVoApi.getMiaoshaLeftTime(), 16, TextFieldConst.COLOR_LIGHT_YELLOW);
                this._miaoshaNewTip.width = this._miaoshaTipBg.width;
                this._miaoshaNewTip.textAlign = egret.HorizontalAlign.CENTER;
                this._miaoshaNewTip.x = this._miaoshaTipBg.x;
                this._miaoshaNewTip.y = this._miaoshaTipBg.y + 5;
                this.addChild(this._miaoshaNewTip);
            }
        }
    };
    FightView.prototype.miaoshaClick = function () {
        if (this._isMiaoshaStart) {
            return;
        }
        if (this._totalNum[0] <= 0) {
            ViewController.getInstance().openView(ViewConst.BASE.PROMPTVIEW, { type: 3, f: this.hide, o: this });
            App.CommonUtil.showTip(LanguageManager.getlocal("noSoldiersTip"));
            return;
        }
        if (Api.otherInfoVoApi.checkCanUseMiaosha()) {
            this.resetMiaosha();
            this.closeBtn.setEnable(false);
            if (this._countDown) {
                this.removeChild(this._countDown);
                this._countDown = null;
            }
            this._gameBtn.touchEnabled = false;
            this._gameBtn.visible = false;
            this.setMiaoshaVisible(false);
            this._isMiaoshaStart = true;
            Api.rookieVoApi.checkNextStep();
            this.showCritAnim();
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("miaoshaNeedBuy"));
        }
    };
    FightView.prototype.showCritAnim = function () {
        if (App.CommonUtil.check_dragon()) {
            var miaoshaDro_1 = App.DragonBonesUtil.getLoadDragonBones("miaosha", 1);
            this.addChild(miaoshaDro_1);
            miaoshaDro_1.setScale(1.5);
            miaoshaDro_1.setPosition(320, GameConfig.stageHeigth / 2);
            miaoshaDro_1.setDragonBoneEventListener(dragonBones.EventObject.LOOP_COMPLETE, function (param1) {
                NetManager.request(NetRequestConst.REQUEST_CHALLENGE_AUTOSMALLATTACK, {});
                miaoshaDro_1.dispose();
                miaoshaDro_1 = null;
            }, this);
        }
        else {
            NetManager.request(NetRequestConst.REQUEST_CHALLENGE_AUTOSMALLATTACK, {});
        }
    };
    FightView.prototype.miaoshaHandler = function (p) {
        if (p.data.ret == true) {
            SoundManager.playEffect(SoundConst.EFFECT_BATTLE);
            SoundManager.playEffect(SoundConst.EFFECT_BATTLE_START);
            this._isAttackWin = p.data.data.data.success;
            this._rewards = p.data.data.data.rewards;
            var addCid = p.data.data.data.nowcid - this._battleBiginCid;
            //let loseSoldier = p.data.data.data.losesoldier||0;
            var loseSoldier = this._totalNum[0] - Api.playerVoApi.getSoldier();
            if (!this._isAttackWin) {
                loseSoldier = this._totalNum[0];
            }
            var myLostSoldier = Math.max(0, loseSoldier);
            var npcOldLost = Math.max(0, this._totalNum[1]);
            if (this._isAttackWin) {
                this._lostNum = [myLostSoldier, npcOldLost];
            }
            else {
                var leftSmallList = ChallengeCfg.getCurMiddleLeftCfgList();
                var miaoshaSoldier = 0;
                for (var i = 0; i < leftSmallList.length; i++) {
                    miaoshaSoldier += leftSmallList[i].soldier;
                }
                this._lostNum = [myLostSoldier, npcOldLost - (miaoshaSoldier - Api.challengeVoApi.getCurKilledNum())];
            }
            this.calculateLostSoldierNumber();
            this.calculateLostTab();
            this.gameBegin();
            this._gameBtn.touchEnabled = false;
            this._gameBtn.visible = false;
            this.setMiaoshaVisible(false);
            //制作死亡频率，防止动画过快
            var totolCount = this._lostSoldier[0] + this._lostSoldier[1];
            this._deathRate = Math.ceil(3000 / (totolCount + 1));
            if (this._deathRate > 600) {
                this._deathRate = 600;
            }
            this._lastDeathTime = egret.getTimer() + this._deathRate * 3;
            this._dotBar.miaoshaSetNum(Api.challengeVoApi.getCurSmallChannelId(), addCid);
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("requestLoadErrorTip"));
            this.hide();
        }
    };
    FightView.prototype.resetCountDown = function () {
        if (!this._countDown) {
            this._countDown = new BaseDisplayObjectContainer();
            var countDownBg = BaseBitmap.create("prisonview_1");
            this._countDown.addChild(countDownBg);
            this._countDown.setPosition(GameConfig.stageWidth / 2 - countDownBg.width / 2 + 20, this._gameBtn.y + 98);
            var timeDesc = ComponentManager.getTextField(LanguageManager.getlocal("countDown"), TextFieldConst.FONTSIZE_CONTENT_SMALL);
            timeDesc.setPosition(countDownBg.x + countDownBg.width / 2 - timeDesc.width / 2 + 10, countDownBg.y + countDownBg.height / 2 - timeDesc.height / 2);
            this._countDown.addChild(timeDesc);
            if (PlatformManager.checkIsViSp()) {
                this._countDownLb = ComponentManager.getTextField("0", TextFieldConst.FONTSIZE_CONTENT_SMALL);
            }
            else {
                this._countDownLb = ComponentManager.getTextField("0", TextFieldConst.FONTSIZE_TITLE_COMMON);
            }
            this._countDownLb.setPosition(timeDesc.x - 5 - this._countDownLb.width, timeDesc.y + timeDesc.height / 2 - this._countDownLb.height / 2);
            this._countDownLb.setColor(TextFieldConst.COLOR_LIGHT_RED);
            this._countDown.addChild(this._countDownLb);
        }
        this._countDownLb.text = "1";
        this._countDownTime = 1;
        this.addChild(this._countDown);
    };
    FightView.prototype.resetConfig = function () {
        this._challengeConfig = ChallengeCfg.getChallengeCfgById(Api.challengeVoApi.getCurChannelId());
        this._totalOldNum = [Api.playerVoApi.getSoldier(), this._challengeConfig.soldier];
        this._totalNum = [Api.playerVoApi.getSoldier(), this._challengeConfig.soldier - Api.challengeVoApi.getCurKilledNum()];
    };
    FightView.prototype.resetMiaosha = function () {
        this._battleBiginCid = Api.challengeVoApi.getCurChannelId() - 1;
        this._dotBar.isMiaosha = true;
        var leftSmallList = ChallengeCfg.getCurMiddleLeftCfgList();
        this._challengeConfig = ChallengeCfg.getChallengeCfgById(Api.challengeVoApi.getCurChannelId());
        var miaoshaSoldier = 0;
        for (var i = 0; i < leftSmallList.length; i++) {
            miaoshaSoldier += leftSmallList[i].soldier;
        }
        this._miaoshaStartPlayerSoldier = Api.playerVoApi.getSoldier();
        this._totalOldNum = [Api.playerVoApi.getSoldier(), miaoshaSoldier];
        this._totalNum = [Api.playerVoApi.getSoldier(), miaoshaSoldier - Api.challengeVoApi.getCurKilledNum()];
        this._battleInfoTab[0].resetInfo(Api.playerVoApi.getSoldier());
        this._battleInfoTab[0].curNumber = Api.playerVoApi.getSoldier();
        this._battleInfoTab[1].resetInfo(miaoshaSoldier);
        this._battleInfoTab[1].curNumber = miaoshaSoldier - Api.challengeVoApi.getCurKilledNum();
        this.calculateSoldierNumber();
        this.clearRightSoldiers();
        this.clearLeftSoldiers();
        this.initRightSoldiers();
        this.initLeftSoldiers();
        this.calculateMeetPoint();
    };
    FightView.prototype.btnClick = function () {
        this.setMiaoshaVisible(false);
        if (this._totalNum[0] <= 0) {
            ViewController.getInstance().openView(ViewConst.BASE.PROMPTVIEW, { type: 3, f: this.hide, o: this });
            App.CommonUtil.showTip(LanguageManager.getlocal("noSoldiersTip"));
            return;
        }
        this.closeBtn.setEnable(false);
        this._countDownTime = -1;
        if (this._countDown) {
            this.removeChild(this._countDown);
            this._countDown = null;
        }
        Api.rookieVoApi.checkNextStep();
        NetManager.request(NetRequestConst.REQUEST_CHALLENGE_ATTACK, null);
    };
    FightView.prototype.intoBattle = function (p) {
        if (p.data.ret == true) {
            SoundManager.playEffect(SoundConst.EFFECT_BATTLE);
            SoundManager.playEffect(SoundConst.EFFECT_BATTLE_START);
            this._isAttackWin = p.data.data.data.battleReport.success;
            this._rewards = p.data.data.data.rewards;
            var myLostSoldier = Math.max(0, this._totalNum[0] - Api.playerVoApi.getSoldier());
            var npcOldLost = Math.max(0, this._totalNum[1]);
            if (this._isAttackWin) {
                this._lostNum = [myLostSoldier, npcOldLost];
            }
            else {
                this._lostNum = [myLostSoldier, Api.challengeVoApi.getCurKilledNum() - (this._challengeConfig.soldier - npcOldLost)];
            }
            this.calculateLostSoldierNumber();
            this.calculateLostTab();
            this.gameBegin();
            this._gameBtn.touchEnabled = false;
            this._gameBtn.visible = false;
            this.setMiaoshaVisible(false);
            if (!(PlatformManager.checkIsWxCfg())) {
                // if (Api.switchVoApi.checkJumpBattle()) {
                var unlockCfg = MainUIUnLockCfg.getMainUIUnLockCfg();
                var unlockIndex = MainUI.getInstance().getUnlockIndex();
                // this._skipBtn.visible = unlockIndex >= unlockCfg["mainuiCity"];
                var isBuyMonthCard = Api.shopVoApi.ifBuyMonthCard();
                var isBuyYearCard = Api.shopVoApi.ifBuyYearCard();
                if (isBuyMonthCard || isBuyYearCard) {
                    // this._skipBtn.setEnable(true);
                }
                else {
                    // App.DisplayUtil.changeToGray(this._skipBtn);
                }
                // }
            }
            //制作死亡频率，防止动画过快
            var totolCount = this._lostSoldier[0] + this._lostSoldier[1];
            this._deathRate = Math.ceil(3000 / (totolCount + 1));
            if (this._deathRate > 600) {
                this._deathRate = 600;
            }
            this._lastDeathTime = egret.getTimer() + this._deathRate * 3;
        }
    };
    FightView.prototype.skipBattle = function () {
        var isBuyMonthCard = Api.shopVoApi.ifBuyMonthCard();
        var isBuyYearCard = Api.shopVoApi.ifBuyYearCard();
        if (isBuyMonthCard || isBuyYearCard) {
            this.gameEnd(true);
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("challengeSkipInfo"));
        }
    };
    FightView.prototype.endCallBack = function () {
        this._isMiaoshaStart = false;
        var lastChannelId = Api.challengeVoApi.getCurChannelId() - 1;
        if (Api.rookieVoApi.isInGuiding || (lastChannelId && ChallengeCfg.getChallengeCfgById(lastChannelId).unlockMapGroup)) {
            this.hide(true);
            return;
        }
        if (this._isAttackWin) {
            var smallChannel = Api.challengeVoApi.getCurSmallChannelId();
            if (smallChannel == 0) {
                this.hide();
            }
            else {
                this.resetGameAfterWin();
            }
        }
        else {
            this.hide();
        }
    };
    FightView.prototype.showResultView = function () {
        if (this._isAttackWin) {
            ViewController.getInstance().openView(ViewConst.BASE.BATTLEWIN, { award: this._rewards, f: this.endCallBack, o: this, type: 1 });
        }
        else {
            ViewController.getInstance().openView(ViewConst.BASE.PROMPTVIEW, { type: 1, f: this.endCallBack, o: this });
        }
    };
    FightView.prototype.tick = function () {
        if (this._countDownTime > 0) {
            this._countDownTime--;
            this._countDownLb.text = this._countDownTime.toPrecision();
        }
        else if (this._countDownTime == 0 && Api.challengeVoApi.getCurSmallChannelId() != 0 && !this._isMiaoshaStart) {
            this.btnClick();
        }
        if (this._miaoshaNewTip) {
            this._miaoshaNewTip.text = Api.otherInfoVoApi.getMiaoshaLeftTime();
            if (!Api.otherInfoVoApi.getMiaoshaLeftTime()) {
                this.setMiaoshaVisible(false);
                this._miaoshaNewTip.dispose();
                this._miaoshaTipBg.dispose();
                this._miaoshaNewTip = null;
                this._miaoshaTipBg = null;
            }
        }
    };
    FightView.prototype.setMiaoshaVisible = function (visible) {
        if (this._miaoshaBtn) {
            this._miaoshaBtn.visible = this._gameBtn.visible;
            if (Api.otherInfoVoApi.checkCanUseMiaosha()) {
                App.DisplayUtil.changeToNormal(this._miaoshaBtn);
            }
            else {
                App.DisplayUtil.changeToGray(this._miaoshaBtn);
            }
        }
        if (this._miaoshaNewTip) {
            this._miaoshaNewTip.visible = visible && Boolean(Api.otherInfoVoApi.getMiaoshaLeftTime());
        }
        if (this._miaoshaTipBg) {
            this._miaoshaTipBg.visible = visible && Boolean(Api.otherInfoVoApi.getMiaoshaLeftTime());
        }
    };
    FightView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_CHALLENGE_AUTOSMALLATTACK, this.miaoshaHandler, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CHALLENGE_ATTACK), this.intoBattle, this);
        Api.mainTaskVoApi.hideGuide();
        this._dotBar = null;
        if (this._rattle) {
            this._rattle.dispose();
            this._rattle = undefined;
        }
        if (this._countDown) {
            this._countDown.dispose();
        }
        this._countDown = undefined;
        this._countDownLb = undefined;
        this._countDownTime = -1;
        this._challengeConfig = undefined;
        this._lossTipContainer = null;
        this._tiptxt = null;
        this._miaoshaBtn = null;
        this._miaoshaNewTip = null;
        this._miaoshaTipBg = null;
        this._battleBiginCid = 0;
        this._isMiaoshaStart = false;
        this._miaoshaStartPlayerSoldier = 0;
        _super.prototype.dispose.call(this);
    };
    FightView.curChannelId = null;
    FightView.curBgName = null;
    return FightView;
}(BattleView));
__reflect(FightView.prototype, "FightView");
