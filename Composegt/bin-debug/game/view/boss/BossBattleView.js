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
var BossBattleView = (function (_super) {
    __extends(BossBattleView, _super);
    function BossBattleView() {
        var _this = _super.call(this) || this;
        _this._callbackF = null;
        _this._obj = null;
        _this._rewards = null;
        _this._curKey = null;
        _this._challengeConfig = null;
        //门客战斗力
        _this._allServantInfo = null;
        _this._dps = 0;
        //总血量
        _this._bossValue = 0;
        _this._heroValue = 0;
        _this._isBattling = false;
        _this._cid = 0;
        return _this;
    }
    BossBattleView.prototype.getResourceList = function () {
        var tempArray = _super.prototype.getResourceList.call(this);
        return tempArray.concat([
            "bossbg",
            ButtonConst.BATTLE_START_BTN_1,
            "progress_type1_bg2", "progress_type1_red",
        ]);
    };
    BossBattleView.prototype.getBgName = function () {
        return "bossbg";
    };
    // 标题背景名称
    BossBattleView.prototype.getTitleStr = function () {
        return "bossViewTitle1";
    };
    //重置默认选中的门客 和 当前属性
    BossBattleView.prototype.resetTopKey = function () {
        var _this = this;
        //初始化门客信息 key: 门客ID，value: 门客战斗力
        if (this._allServantInfo == null) {
            this._allServantInfo = {};
            var allKey = Api.servantVoApi.getServantInfoIdListWithSort(1);
            for (var k in allKey) {
                var key = allKey[k];
                this._allServantInfo[key] = Api.servantVoApi.getServantCombatWithId(key);
            }
        }
        this._curKey = null;
        this._heroValue = 0;
        var allKeys = Object.keys(this._allServantInfo);
        allKeys.sort(function (a, b) {
            var valueA = Api.challengeVoApi.getServantInfoValue(a);
            var valueB = Api.challengeVoApi.getServantInfoValue(b);
            if (valueA == valueB) {
                return Number(_this._allServantInfo[b] - _this._allServantInfo[a]);
            }
            else {
                return Number(valueA - valueB);
            }
        });
        if (Api.challengeVoApi.getServantInfoValue(allKeys[0]) == 0) {
            this._curKey = allKeys[0];
            this._heroValue = this._allServantInfo[this._curKey];
        }
    };
    BossBattleView.prototype.initView = function () {
        Api.mainTaskVoApi.checkShowGuide("BossBattleView");
        this.titleTF.text = Api.challengeVoApi.getCurBigChannelId().toString() + ". " + LanguageManager.getlocal("challengeTitle" + Api.challengeVoApi.getCurBigChannelId());
        this.titleTF.x = this.width / 2 - this.titleTF.width / 2;
        this._challengeConfig = ChallengeCfg.getChallengeCfgById(Api.challengeVoApi.getCurChannelId());
        this._cid = Api.challengeVoApi.getCurChannelId();
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CHALLENGE_ATTACK), this.intoBossBattle, this);
        if (this.param.data && this.param.data.f && this.param.data.o) {
            this._obj = this.param.data.o;
            this._callbackF = this.param.data.f;
        }
        this._bossValue = this._challengeConfig.value;
        this.resetTopKey();
        this.setTopProgress(this._bossValue - Api.challengeVoApi.getCurKilledNum(), this._bossValue, GameConfig.stageWidth - 100);
        this._topProgress.y = 10;
        var upHeroPic = "story_npc_" + this._challengeConfig.showBoss;
        this.setUpHero(upHeroPic, [[LanguageManager.getlocal("BossName" + this._challengeConfig.showBoss), TextFieldConst.COLOR_WARN_YELLOW_NEW]], 2); //COLOR_WARN_RED2
        this._upHero.x = 17;
        var downHeroPic = null;
        var downInfo = null;
        if (this._curKey) {
            // downHeroPic = "servant_full_"+this._curKey;
            var equip = Api.servantVoApi.getServantObj(this._curKey).equip;
            downHeroPic = Api.servantVoApi.getFullImgPathWithId(this._curKey); //"servant_full_"+this._curKey;
            var power = this._allServantInfo[this._curKey];
            var nn = App.StringUtil.changeIntToText(power);
            downInfo = [[LanguageManager.getlocal("fightForce") + ":" + nn, TextFieldConst.COLOR_WARN_YELLOW_NEW], [LanguageManager.getlocal("clickChooseServant"), TextFieldConst.COLOR_INPUT]];
        }
        else {
            downHeroPic = "servant_empty";
            downInfo = [["empty", TextFieldConst.COLOR_WARN_YELLOW_NEW], [LanguageManager.getlocal("clickChooseServant"), TextFieldConst.COLOR_INPUT]];
        }
        this.setDownHero(downHeroPic, downInfo, 2);
        this._downHero.x = 280;
        this._downHero.y = GameConfig.stageHeigth - this._downHero.serImgHeight - 20 - 10; //- this.getTitleButtomY()
        this._upPositon = egret.Point.create(this._upHero.x, this._upHero.y);
        this._downPositon = egret.Point.create(this._downHero.x, this._downHero.y);
        this._downHero.addTouchTap(this.clickChangeHero, this);
        // 开始游戏
        //之后再改
        // this._gameBtn = ComponentManager.getButton(ButtonConst.BATTLE_START_BTN_1,null,this.btnClick,this);
        // this._gameBtn.setPosition(GameConfig.stageWidth/2,GameConfig.stageHeigth/2 + 20);
        this._gameBtn = BaseBitmap.create(ButtonConst.BATTLE_START_BTN_1);
        this._gameBtn.addTouchTap(this.btnClick, this);
        this._gameBtn.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2 + 20);
        this._gameBtn.anchorOffsetX = this._gameBtn.width / 2;
        this._gameBtn.anchorOffsetY = this._gameBtn.height / 2;
        this.addChild(this._gameBtn);
        this.btnAnim();
        if (this._curKey == null) {
            this._gameBtn.visible = false;
        }
    };
    BossBattleView.prototype.clickChangeHero = function () {
        // if(1==1){
        // 	ViewController.getInstance().openView(ViewConst.POPUP.CATCHPRISONPUPUPVIEW,{unlockPrison:"1",showBoss:21});
        // 	return;
        // }
        if (this._isBattling == true) {
            return;
        }
        var allKeys = Object.keys(this._allServantInfo);
        var showTab = [];
        var canNotNum = 0;
        for (var k in allKeys) {
            var key = allKeys[k];
            if (Api.challengeVoApi.getServantInfoValue(key) == 1 || Api.challengeVoApi.getServantInfoValue(key) == 2) {
                canNotNum++;
            }
            showTab.push([key, Api.challengeVoApi.getServantInfoValue(key), this._allServantInfo[key]]);
        }
        showTab.sort(function (a, b) {
            var valueA = a[1];
            var valueB = b[1];
            if (valueA == valueB) {
                return Number(b[2] - a[2]);
            }
            else {
                return Number(valueA - valueB);
            }
        });
        if (Api.switchVoApi.checkOpenShareFinanceAndRecover()) {
            var extrashare = Api.otherInfoVoApi.getOtherInfo().info.extrashare;
            if (extrashare && extrashare.challenge != 1 && showTab.length == canNotNum) {
                ViewController.getInstance().openView(ViewConst.POPUP.SHARERECOVERPOPUPVIEW, { type: "b", info: showTab, callback: this.sendRequest, target: this });
                return;
            }
        }
        ViewController.getInstance().openView(ViewConst.POPUP.SERVANTSELECTEDPOPUPVIEW, { type: ServantSelectedPopupView.TYPE_BATTLE, "info": showTab, callback: this.sendRequest, handler: this });
    };
    BossBattleView.prototype.sendRequest = function (params) {
        var clickKey = params.key;
        if (clickKey != this._curKey) {
            this._curKey = clickKey;
            var servant = Api.servantVoApi.getServantObj(clickKey);
            // this._downHero.resetHero("servant_full_"+servant.servantId,this._allServantInfo[clickKey]);
            if (!this._downHero) {
                return;
            }
            this._downHero.resetHero(servant.fullImgPath, this._allServantInfo[clickKey]);
            this.checkDownHeroSkin();
            this._gameBtn.visible = true;
        }
    };
    BossBattleView.prototype.btnClick = function () {
        NetManager.request(NetRequestConst.REQUEST_CHALLENGE_ATTACK, { "servantId": this._curKey });
    };
    BossBattleView.prototype.btnAnim = function () {
        //优化解决
        if (this._gameBtn) {
            egret.Tween.get(this._gameBtn).to({ scaleX: 0.9, scaleY: 0.9 }, 600).to({ scaleX: 1, scaleY: 1 }, 600).call(this.btnAnim, this);
        }
    };
    BossBattleView.prototype.intoBossBattle = function (p) {
        App.LogUtil.log(p.data);
        if (p.data.ret == true) {
            Api.rookieVoApi.checkNextStep();
            this._rewards = p.data.data.data.rewards;
            SoundManager.playEffect(SoundConst.EFFECT_BATTLE_START);
            this._isAttackWin = p.data.data.data.battleReport.success;
            this._dps = p.data.data.data.battleReport.dps;
            this._isBattling = true;
            this._gameBtn.visible = false;
            this.gameBegin();
        }
    };
    BossBattleView.prototype.gameBegin = function () {
        this.attackHandle(1, this._dps);
    };
    BossBattleView.prototype.showEndGame = function () {
        ViewController.getInstance().openView(ViewConst.BASE.BATTLEWIN, { award: this._rewards, f: this.hide, o: this, type: 3, cid: this._cid });
    };
    BossBattleView.prototype.atkEndCallback = function () {
        if (this._isAttackWin) {
            egret.Tween.get(this._upHero).to({ alpha: 0 }, 800).call(this.showEndGame, this);
        }
        else {
            this._isBattling = false;
            this.closeBtn.setEnable(true);
            this.resetTopKey();
            if (this._curKey) {
                var servant = Api.servantVoApi.getServantObj(this._curKey);
                // this._downHero.resetHero("servant_full_"+servant.servantId,this._allServantInfo[this._curKey]);
                this._downHero.resetHero(servant.fullImgPath, this._allServantInfo[this._curKey]);
                this.checkDownHeroSkin();
                TimerManager.doTimer(100, 1, this.showGameBtn, this);
            }
            else {
                this._downHero.resetHero();
                this.checkDownHeroSkin();
            }
        }
    };
    BossBattleView.prototype.showGameBtn = function () {
        if (this._gameBtn) {
            this._gameBtn.visible = (this._curKey != null);
        }
    };
    BossBattleView.prototype.hide = function () {
        var lastChannelId = Api.challengeVoApi.getHasPassId();
        var config = ChallengeCfg.getChallengeCfgById(lastChannelId);
        if (this._obj && this._callbackF && !config.unlockPrison) {
            this._callbackF.apply(this._obj);
        }
        _super.prototype.hide.call(this);
        // Api.rookieVoApi.checkNextStep();
    };
    BossBattleView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CHALLENGE_ATTACK), this.intoBossBattle, this);
        Api.mainTaskVoApi.hideGuide();
        this._challengeConfig = null;
        this._callbackF = null;
        this._obj = null;
        this._rewards = null;
        this._curKey = null;
        this._isBattling = false;
        this._gameBtn = null;
        this._isAttackWin = null;
        this._allServantInfo = null;
        this._dps = 0;
        this._cid = 0;
        _super.prototype.dispose.call(this);
    };
    return BossBattleView;
}(BaseBattleView));
__reflect(BossBattleView.prototype, "BossBattleView");
