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
var NewAtkracecrossBattleView = /** @class */ (function (_super) {
    __extends(NewAtkracecrossBattleView, _super);
    function NewAtkracecrossBattleView() {
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
        _this._servantId = null;
        _this._servantId2 = null;
        _this._winScore = 0;
        return _this;
    }
    NewAtkracecrossBattleView.prototype.getTitleBgName = function () {
        return null;
    };
    NewAtkracecrossBattleView.prototype.getTitleStr = function () {
        return null;
    };
    NewAtkracecrossBattleView.prototype.getRequestData = function () {
        var servantId = this.param.data.servantid;
        var myAtkInfo = Api.atkracecrossVoApi.getMyFightInfo();
        var myInfo = myAtkInfo.mesid;
        this._oldInfo[0] = { max: myInfo.fullattr, cur: myInfo.attr, level: myInfo.lv, sid: myInfo.sid, ability: myInfo.ability };
        var enemyInfo = myAtkInfo.fids[servantId];
        this._oldInfo[1] = { max: enemyInfo.fullattr, cur: enemyInfo.attr, level: enemyInfo.lv, sid: servantId, ability: enemyInfo.ability,
            name: myAtkInfo.getFName(), equip: enemyInfo.equip, weaponDps: enemyInfo.weaponDps };
        this._winNumber = myAtkInfo.fightnum;
        this._totalNumber = myAtkInfo.total;
        this._servantId = myInfo.sid;
        this._servantId2 = servantId;
        var crossVo = Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace");
        return { requestType: NetRequestConst.REQUEST_NEWATKRACECROSS_FIGHT, requestData: { servantid: servantId, activeId: crossVo.aidAndCode } };
    };
    NewAtkracecrossBattleView.prototype.requestLoadError = function () {
        _super.prototype.requestLoadError.call(this);
        Api.atkracecrossVoApi.dateErrorHandle(2);
    };
    NewAtkracecrossBattleView.prototype.receiveData = function (data) {
        if (data.ret == true) {
            if (data.data.data.fightExpired == 1) {
                // this.hide();
                this.requestLoadError();
                return;
            }
            this._battleInfo = data.data.data.atkreports;
            this._isAttackWin = (data.data.data.win == 1);
            this._winScore = data.data.data.winScore;
        }
        else {
            this.hide();
        }
    };
    NewAtkracecrossBattleView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "atkrace_battle_info", "atkrace_skip", "specialview_commoni_namebg"
        ]);
    };
    NewAtkracecrossBattleView.prototype.getBgName = function () {
        return "arena_bg";
    };
    NewAtkracecrossBattleView.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            var rect = egret.Rectangle.create();
            rect.setTo(0, 0, 640 * 1.3, 1136 * 1.3);
            this.viewBg = BaseLoadBitmap.create(bgName, rect);
            this.viewBg.setPosition(0 - 640 * 0.15, (GameConfig.stageHeigth - this.viewBg.height) * 0.2);
            this.addChild(this.viewBg);
        }
    };
    NewAtkracecrossBattleView.prototype.getCloseBtnName = function () {
        return null;
    };
    NewAtkracecrossBattleView.prototype.initView = function () {
        if (this.param.data && this.param.data.f && this.param.data.o) {
            this._obj = this.param.data.o;
            this._callbackF = this.param.data.f;
            this._callbackF2 = this.param.data.f2;
        }
        this._isEnd = false;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ATKRACECROSS_FIGHTEND, this.hide, this);
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
        if (this._oldInfo[1].equip) {
            upHeroPic = Config.ServantskinCfg.getServantSkinItemById(this._oldInfo[1].equip).body;
        }
        var downPic = Api.servantVoApi.getFullImgPathWithId(this._oldInfo[0].sid); //Config.ServantCfg.getServantItemById(this._oldInfo[0].sid).fullIcon;
        var showeff1 = false;
        var showeff2 = false;
        if (this._oldInfo[1].equip && this._oldInfo[1].equip != "") {
            showeff1 = true;
        }
        var servant = Api.servantVoApi.getServantObj(this._oldInfo[0].sid);
        if (servant && servant.equip && servant.equip != "") {
            showeff2 = true;
        }
        this.setUpHero(upHeroPic, { level: this._oldInfo[1].level, name: LanguageManager.getlocal("servant_name" + this._oldInfo[1].sid), ability: this._oldInfo[1].ability, skin: this._oldInfo[1].equip }, 0, showeff1);
        this.setDownHero(downPic, { level: this._oldInfo[0].level, name: LanguageManager.getlocal("servant_name" + this._oldInfo[0].sid), ability: this._oldInfo[0].ability, skin: this._oldInfo[0].equip }, 0, showeff2);
        this._upHero.x = 17;
        this._downHero.x = 280;
        this._upPositon = egret.Point.create(this._upHero.x, this._upHero.y);
        this._downPositon = egret.Point.create(this._downHero.x, this._downHero.y);
        var skipBtn = ComponentManager.getButton("atkrace_skip", null, this.skipBattle, this);
        skipBtn.setPosition(GameConfig.stageWidth - skipBtn.width - 12, 45);
        this.addChild(skipBtn);
        this.showSkin();
        if (PlatformManager.hasSpcialCloseBtn()) {
            skipBtn.x = 12;
        }
    };
    NewAtkracecrossBattleView.prototype.showSkin = function () {
        var _this = this;
        var view = this;
        var equip = [];
        var servant = Api.servantVoApi.getServantObj(this._oldInfo[0].sid);
        if (servant && servant.equip && servant.equip != "") {
            equip.push(servant.equip);
        }
        if (this._oldInfo[1].equip && this._oldInfo[1].equip != "") {
            equip.push(this._oldInfo[1].equip);
        }
        equip = [];
        if (equip.length) {
            ViewController.getInstance().openView(ViewConst.POPUP.ATKRACESHOWSKINVIEW, {
                callback: function () {
                    if (equip[1]) {
                        ViewController.getInstance().openView(ViewConst.POPUP.ATKRACESHOWSKINVIEW, {
                            callback: function () {
                                _this.checkWeapon();
                            },
                            callbackThisObj: _this,
                            skinId: equip[1]
                        });
                    }
                    else {
                        _this.checkWeapon();
                    }
                },
                callbackThisObj: this,
                skinId: equip[0]
            });
        }
        else {
            this.checkWeapon();
        }
    };
    NewAtkracecrossBattleView.prototype.checkWeapon = function () {
        var serId = this._servantId;
        var serId2 = this._servantId2;
        var weaponVo = Api.weaponVoApi.getWeaponInfoVoByServantId(serId);
        var value2 = 0;
        if (this._oldInfo[1].weaponDps) {
            value2 = this._oldInfo[1].weaponDps;
        }
        if (weaponVo) {
            this.setDownWeaponInfo(serId, 0, 6);
        }
        if (value2) {
            this.setUpWeaponInfo(serId2, value2, 6);
        }
        this.checkWeaponBack();
        // if ( !value2)//!weaponVo &&
        // {	
        // 	this.checkWeaponBack();
        // 	return;
        // }		
        // ViewController.getInstance().openView(ViewConst.BASE.WEAPONCOMEONVIEW,{
        // 	sid:serId,
        // 	type:1,
        // 	atype:6,
        // 	sid2:serId2,
        // 	type2:4,
        // 	atype2:6,
        // 	value2:value2,
        // 	f:this.checkWeaponBack,
        // 	o:this,
        // 	auto: false,
        // });
    };
    NewAtkracecrossBattleView.prototype.checkWeaponBack = function (skip) {
        if (skip === void 0) { skip = 0; }
        if (this && this.isShow()) {
            if (skip == 0) {
                this.showRound();
            }
            else if (skip == 1) {
                this._downHero.showLight(this.showRound, this);
            }
            else if (skip == 2) {
                this._upHero.showLight(this.showRound, this);
            }
            else if (skip == 3) {
                this._upHero.showLight();
                this._downHero.showLight(this.showRound, this);
            }
            else {
                this.showRound();
            }
        }
    };
    /**
     * 开始一回合战斗
     */
    NewAtkracecrossBattleView.prototype.showRound = function () {
        var _this = this;
        if (this._battleInfo.length > this._curRound) {
            var round = 5 * 2;
            if (this._curRound > 0 && this._curRound % round == 0) {
                this.showWinBattle(LanguageManager.getlocal("acThreeKingdomsbattletip7", [String(Math.floor(this._curRound / 2))]), false, true);
                egret.Tween.get(this).wait(1300).call(function () {
                    var curInfo = _this._battleInfo[_this._curRound];
                    _this.attackHandle(curInfo[0], curInfo[2], curInfo[1]);
                    _this._curRound++;
                });
            }
            else {
                var curInfo = this._battleInfo[this._curRound];
                this.attackHandle(curInfo[0], curInfo[2], curInfo[1]);
                this._curRound++;
            }
        }
        else {
            this.showEndGameBefore();
        }
    };
    NewAtkracecrossBattleView.prototype.showWinBattle = function (str, isup, ismiddle) {
        if (ismiddle === void 0) { ismiddle = false; }
        var view = this;
        // let group = ismy ? this._myCurWifeContainer : this._enemyCurWifeContainer;
        // let skinnamebg = ismy ? this._myNameBg : this._enemyNameBg;
        var descbg = BaseBitmap.create("specialview_commoni_namebg");
        var tipTxt = ComponentManager.getTextField(str, 22);
        tipTxt.lineSpacing = 6;
        descbg.height = 92;
        descbg.width = 392;
        if (ismiddle) {
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descbg, view.container, [-40, 0]);
        }
        else {
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, descbg, isup ? this._upHero : this._downHero, [0, 150]);
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, descbg);
        this.addChildToContainer(descbg);
        this.addChildToContainer(tipTxt);
        descbg.alpha = 0;
        tipTxt.alpha = 0;
        egret.Tween.get(descbg).to({ alpha: 1 }, 200).wait(800).to({ alpha: 0 }, 200).call(function () {
            descbg.dispose();
            descbg = null;
        }, this);
        egret.Tween.get(tipTxt).to({ alpha: 1 }, 200).wait(800).to({ alpha: 0 }, 200).call(function () {
            tipTxt.dispose();
            tipTxt = null;
        }, this);
    };
    NewAtkracecrossBattleView.prototype.showEndGameBefore = function () {
        var failMan;
        if (this._isAttackWin) {
            failMan = this._upHero;
        }
        else {
            failMan = this._downHero;
        }
        egret.Tween.get(failMan).to({ alpha: 0 }, 800).call(this.showEndGame, this);
    };
    NewAtkracecrossBattleView.prototype.skipBattle = function () {
        if (this._isEnd != true) {
            this.showEndGame();
        }
    };
    NewAtkracecrossBattleView.prototype.showEndGame = function () {
        if (this._isEnd == true) {
            return;
        }
        this._isEnd = true;
        if (this._isAttackWin) {
            ViewController.getInstance().openView(ViewConst.BASE.BATTLEWIN, { winScore: this._winScore, f: this.endCallBack, o: this, num: this._winNumber, type: 2, fameAdd: 4 });
        }
        else {
            ViewController.getInstance().openView(ViewConst.BASE.PROMPTVIEW, { winScore: this._winScore, type: 4, f: this.endCallBack, o: this });
        }
    };
    //战斗结束
    NewAtkracecrossBattleView.prototype.endCallBack = function () {
        if (this._isAttackWin) {
            //是否抽奖
            if (this._winNumber % 3 == 2) {
                //抽奖
                ViewController.getInstance().openView(ViewConst.POPUP.NEWATKRACECROSSREWARDPOPUPVIEW, { f: this.winHandle, o: this });
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
                ViewController.getInstance().openView(ViewConst.POPUP.ATKRACEAGREEPOPUPVIEW, { type: 3, name: nameStr, sid: sidStr });
            }
            else {
                ViewController.getInstance().openView(ViewConst.POPUP.ATKRACEAGREEPOPUPVIEW, { type: 2, name: nameStr, sid: sidStr });
            }
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESET_ATKRACECROSS);
            this._callbackF2.apply(this._obj);
            this.hide();
        }
    };
    //胜利
    NewAtkracecrossBattleView.prototype.winHandle = function () {
        if (this._winNumber + 1 == this._totalNumber) {
            var nameStr = this._oldInfo[1].name;
            var sidStr = this._oldInfo[0].sid;
            ViewController.getInstance().openView(ViewConst.POPUP.ATKRACEAGREEPOPUPVIEW, { type: 4, name: nameStr, sid: sidStr });
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESET_ATKRACECROSS);
            this._callbackF2.apply(this._obj);
        }
        else {
            this._callbackF.apply(this._obj);
        }
        this.hide();
    };
    NewAtkracecrossBattleView.prototype.atkEndCallback = function () {
        if (this._isEnd != true) {
            this.showRound();
        }
    };
    NewAtkracecrossBattleView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ATKRACECROSS_FIGHTEND, this.hide, this);
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
        this._servantId = null;
        this._servantId2 = null;
        this._winScore = 0;
        _super.prototype.dispose.call(this);
    };
    return NewAtkracecrossBattleView;
}(BaseBattleView));
//# sourceMappingURL=NewAtkracecrossBattleView.js.map