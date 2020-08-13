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
var AcBattleGroundFightView = (function (_super) {
    __extends(AcBattleGroundFightView, _super);
    function AcBattleGroundFightView() {
        var _this = _super.call(this) || this;
        _this._isAttackWin = null;
        _this._isEnd = false;
        //胜利刷新
        _this._callbackF = null;
        //完成或失败关闭
        _this._callbackF2 = null;
        _this._obj = null;
        _this._rewards = null;
        _this._battleInfo = null;
        //本场战斗第几回合
        _this._curRound = 0;
        //战斗之前胜利了几场
        _this._winNumber = 0;
        _this._totalNumber = 0;
        _this._oldInfo = [];
        return _this;
    }
    Object.defineProperty(AcBattleGroundFightView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundFightView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundFightView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundFightView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundFightView.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcBattleGroundFightView.prototype.getTitleBgName = function () {
        return null;
    };
    AcBattleGroundFightView.prototype.getTitleStr = function () {
        return null;
    };
    AcBattleGroundFightView.prototype.getRequestData = function () {
        var servantId = this.param.data.servantid;
        var myAtkInfo = this.vo.getMyFightInfo();
        var myInfo = myAtkInfo.mesid;
        this._oldInfo[0] = { max: myInfo.fullattr, cur: myInfo.attr, level: myInfo.lv, sid: myInfo.sid, ability: myInfo.ability, skin: myInfo.skin };
        var enemyInfo = myAtkInfo.fids[servantId];
        this._oldInfo[1] = { max: enemyInfo.fullattr, cur: enemyInfo.attr, level: enemyInfo.lv, sid: servantId, ability: enemyInfo.ability, name: myAtkInfo.getFName(), skin: enemyInfo.skin };
        this._winNumber = myAtkInfo.fightnum;
        this._totalNumber = myAtkInfo.total;
        return { requestType: NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_FIGHT, requestData: { servantid: servantId, activeId: this.acTivityId } };
    };
    AcBattleGroundFightView.prototype.receiveData = function (data) {
        if (data.data.data.newRound) {
            this.param.data.f3.apply(this._obj);
            this.hideLoadingMask();
            this.hide();
        }
        else {
            if (data.ret == true) {
                this._battleInfo = data.data.data.atkreports;
                this._isAttackWin = (data.data.data.win == 1);
                this.vo.setRaceInfo(data.data.data.battleground);
            }
            else {
                this.hide();
            }
        }
    };
    AcBattleGroundFightView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "atkrace_battle_info", "atkrace_skip"
        ]);
    };
    AcBattleGroundFightView.prototype.getBgName = function () {
        return "arena_bg";
    };
    AcBattleGroundFightView.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            var rect = egret.Rectangle.create();
            rect.setTo(0, 0, 640 * 1.3, 1136 * 1.3);
            this.viewBg = BaseLoadBitmap.create(bgName, rect);
            this.viewBg.setPosition(0 - 640 * 0.15, (GameConfig.stageHeigth - this.viewBg.height) * 0.2);
            this.addChild(this.viewBg);
        }
    };
    AcBattleGroundFightView.prototype.getCloseBtnName = function () {
        return null;
    };
    AcBattleGroundFightView.prototype.initView = function () {
        if (this.param.data && this.param.data.f && this.param.data.o) {
            this._obj = this.param.data.o;
            this._callbackF = this.param.data.f;
            this._callbackF2 = this.param.data.f2;
        }
        this._isEnd = false;
        var maskDown = BaseBitmap.create("servant_mask");
        maskDown.width = GameConfig.stageWidth;
        maskDown.y = GameConfig.stageHeigth - maskDown.height;
        this.addChildToContainer(maskDown);
        var maskUp = BaseBitmap.create("servant_mask");
        maskUp.width = GameConfig.stageWidth;
        maskUp.scaleY = -1;
        maskUp.y = maskUp.height;
        this.addChildToContainer(maskUp);
        this.setTopProgress(this._oldInfo[1].cur, this._oldInfo[1].max);
        this.setBottomProgress(this._oldInfo[0].cur, this._oldInfo[0].max);
        var upHeroPic = Config.ServantCfg.getServantItemById(this._oldInfo[1].sid).fullIcon;
        var skin = this._oldInfo[1].skin;
        if (skin && skin != "") {
            upHeroPic = Config.ServantskinCfg.getServantSkinItemById(skin).body;
        }
        var downPic = Api.servantVoApi.getFullImgPathWithId(this._oldInfo[0].sid); //Config.ServantCfg.getServantItemById(this._oldInfo[0].sid).fullIcon;
        this.setUpHero(upHeroPic, { level: this._oldInfo[1].level, name: LanguageManager.getlocal("servant_name" + this._oldInfo[1].sid), ability: this._oldInfo[1].ability });
        this.setDownHero(downPic, { level: this._oldInfo[0].level, name: LanguageManager.getlocal("servant_name" + this._oldInfo[0].sid), ability: this._oldInfo[0].ability });
        this._upHero.x = 17;
        this._downHero.x = 280;
        this._upPositon = egret.Point.create(this._upHero.x, this._upHero.y);
        this._downPositon = egret.Point.create(this._downHero.x, this._downHero.y);
        var skipBtn = ComponentManager.getButton("atkrace_skip", null, this.skipBattle, this);
        skipBtn.setPosition(PlatformManager.hasSpcialCloseBtn() ? 12 : (GameConfig.stageWidth - skipBtn.width - 12), 45);
        this.addChild(skipBtn);
        this.showRound();
        if (PlatformManager.hasSpcialCloseBtn()) {
            skipBtn.x = 12;
        }
    };
    /**
     * 开始一回合战斗
     */
    AcBattleGroundFightView.prototype.showRound = function () {
        if (this._battleInfo.length > this._curRound) {
            var curInfo = this._battleInfo[this._curRound];
            this.attackHandle(curInfo[0], curInfo[2], curInfo[1]);
            this._curRound++;
        }
        else {
            this.showEndGameBefore();
        }
    };
    AcBattleGroundFightView.prototype.showEndGameBefore = function () {
        var failMan;
        if (this._isAttackWin) {
            failMan = this._upHero;
        }
        else {
            failMan = this._downHero;
        }
        egret.Tween.get(failMan).to({ alpha: 0 }, 800).call(this.showEndGame, this);
    };
    AcBattleGroundFightView.prototype.skipBattle = function () {
        if (this._isEnd != true) {
            this.showEndGame();
        }
    };
    AcBattleGroundFightView.prototype.showEndGame = function () {
        if (this._isEnd == true) {
            return;
        }
        this._isEnd = true;
        if (this._isAttackWin) {
            ViewController.getInstance().openView(ViewConst.BASE.BATTLEWIN, {
                f: this.endCallBack,
                o: this,
                num: this._winNumber,
                type: 2,
                victory: this.cfg.victory,
                battleground: true
            });
        }
        else {
            ViewController.getInstance().openView(ViewConst.BASE.PROMPTVIEW, { type: 4, f: this.endCallBack, o: this });
        }
    };
    //战斗结束
    AcBattleGroundFightView.prototype.endCallBack = function () {
        if (this._oldInfo.length == 0) {
            return;
        }
        if (this._isAttackWin) {
            //是否抽奖
            if (this._winNumber % 3 == 2) {
                //抽奖
                ViewController.getInstance().openView(ViewConst.POPUP.ATKRACEREWARDPOPUPVIEW, {
                    f: this.winHandle,
                    o: this,
                    battleground: true,
                    code: this.code
                });
            }
            else {
                this.winHandle();
            }
        }
        else {
            //失败 
            if (this._oldInfo.length == 0) {
                return;
            }
            var nameStr = this._oldInfo[1].name;
            var sidStr = this._oldInfo[0].sid;
            if (this._winNumber > 0) {
                ViewController.getInstance().openView(ViewConst.POPUP.ACBATTLEGROUNDAGREEPOPUPDIALOG, {
                    type: 3,
                    name: nameStr,
                    sid: sidStr,
                    aid: this.aid,
                    code: this.code
                });
            }
            else {
                ViewController.getInstance().openView(ViewConst.POPUP.ACBATTLEGROUNDAGREEPOPUPDIALOG, { type: 2, name: nameStr, sid: sidStr, aid: this.aid,
                    code: this.code });
            }
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESET_ATKRACE);
            this._callbackF2.apply(this._obj);
            this.hide();
        }
    };
    //胜利
    AcBattleGroundFightView.prototype.winHandle = function () {
        if (this._winNumber + 1 == this._totalNumber) {
            var nameStr = this._oldInfo[1].name;
            var sidStr = this._oldInfo[0].sid;
            ViewController.getInstance().openView(ViewConst.POPUP.ACBATTLEGROUNDAGREEPOPUPDIALOG, { type: 4, name: nameStr, sid: sidStr, aid: this.aid,
                code: this.code });
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESET_ATKRACE);
            this._callbackF2.apply(this._obj);
        }
        else {
            this._callbackF.apply(this._obj);
        }
        this.hide();
    };
    AcBattleGroundFightView.prototype.atkEndCallback = function () {
        if (this._isEnd != true) {
            this.showRound();
        }
    };
    AcBattleGroundFightView.prototype.dispose = function () {
        this._battleInfo = null;
        this._isEnd = false;
        this._isAttackWin = null;
        this._rewards = null;
        this._oldInfo.length = 0;
        this._winNumber = 0;
        this._callbackF2 = null;
        this._callbackF = null;
        this._obj = null;
        this._totalNumber = 0;
        this._curRound = 0;
        _super.prototype.dispose.call(this);
    };
    return AcBattleGroundFightView;
}(BaseBattleView));
__reflect(AcBattleGroundFightView.prototype, "AcBattleGroundFightView");
