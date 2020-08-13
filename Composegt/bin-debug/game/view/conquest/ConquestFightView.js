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
var ConquestFightView = (function (_super) {
    __extends(ConquestFightView, _super);
    function ConquestFightView() {
        var _this = _super.call(this) || this;
        _this._conquestConfig = undefined;
        return _this;
    }
    ConquestFightView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["hero_anim_1",
            "npc_anim_1",
            "conquest_fightbg",
            ButtonConst.BATTLE_START_BTN_1,
            "battle_info_bg",
            "battle_luanz",
            "progress_type3_red",
            "progress_type1_yellow2",
            "progress_type3_bg",
            "challenge_officebg",
        ]);
    };
    ConquestFightView.prototype.battleBgName = function () {
        return "conquest_fightbg";
    };
    ConquestFightView.prototype.getTitleStr = function () {
        return "conquestTitle";
    };
    ConquestFightView.prototype.resetConfig = function () {
        var data = this.param.data;
        this._isAttackWin = data.fightflag == 1;
        this._rewards = data.rewards;
        this._conquestConfig = Config.ConquestCfg.getConquestCfgById(data.info.cid);
        this._totalOldNum = [data.info.oldSilder, data.info.enemySoldier];
        this._totalNum = this._totalOldNum;
    };
    ConquestFightView.prototype.init = function () {
        _super.prototype.init.call(this);
        //初始化 双方信息
        for (var i = 0; i <= 1; i++) {
            this._battleInfoTab[i] = new BattleInfo();
            if (i == 0) {
                this._battleInfoTab[i].init(this._totalOldNum[i], true, null, true);
                this._battleInfoTab[i].x = 15;
                this._battleInfoTab[i].y = GameConfig.stageHeigth - 35 - this._battleInfoTab[i].height;
            }
            else {
                var cidd = this.param.data.info.cid;
                var index = this.param.data.info.idx;
                var persionId = Config.ConquestCfg.getConquestCfgById(cidd + "")["person" + index];
                var info = { show: persionId, cid: cidd, idx: index };
                this._battleInfoTab[i].init(this._totalOldNum[i], false, info, true);
                this._battleInfoTab[i].x = GameConfig.stageWidth - 60 - this._battleInfoTab[i].width;
                this._battleInfoTab[i].y = 130;
            }
            this.addChild(this._battleInfoTab[i]);
            this._battleInfoTab[i].curNumber = this._totalNum[i];
        }
        this.intoBattle();
    };
    ConquestFightView.prototype.intoBattle = function () {
        SoundManager.playEffect(SoundConst.EFFECT_BATTLE);
        SoundManager.playEffect(SoundConst.EFFECT_BATTLE_START);
        var myLostSoldier = Math.max(0, this._totalNum[0] - Api.playerVoApi.getSoldier());
        var npcOldLost = Math.max(0, this._totalNum[1]);
        if (this._isAttackWin) {
            this._lostNum = [myLostSoldier, npcOldLost];
        }
        else {
            var info = this.param.data.info;
            var soldier1 = this._totalNum[0];
            var soldier2 = this._totalNum[1];
            var atk1 = Api.playerVoApi.getAtk();
            var atk2 = soldier2 / 10;
            var lostSold2 = Math.ceil(soldier1 * (atk1 + 1000) / (atk2 + 1000));
            if (lostSold2 > soldier2) {
                lostSold2 = soldier2;
            }
            this._lostNum = [myLostSoldier, lostSold2];
        }
        this.calculateLostSoldierNumber();
        this.calculateLostTab();
        this.gameBegin();
        this._gameBtn.touchEnabled = false;
        this._gameBtn.visible = false;
        //制作死亡频率，防止动画过快
        var totolCount = this._lostSoldier[0] + this._lostSoldier[1];
        this._deathRate = Math.ceil(3000 / (totolCount + 1));
        if (this._deathRate > 1000) {
            this._deathRate = 1000;
        }
        this._lastDeathTime = egret.getTimer() + this._deathRate * 3;
    };
    ConquestFightView.prototype.endCallBack = function () {
        this.hide();
    };
    ConquestFightView.prototype.showResultView = function () {
        if (this._isAttackWin) {
            var cidd = this.param.data.info.cid;
            var index = this.param.data.info.idx;
            var persionId = Config.ConquestCfg.getConquestCfgById(cidd + "")["person" + index];
            var infoTab = { show: persionId, cid: cidd };
            ViewController.getInstance().openView(ViewConst.POPUP.CONQUESTWINPOPUPVIEW, { award: this._rewards, f: this.endCallBack, o: this, info: infoTab });
        }
        else {
            ViewController.getInstance().openView(ViewConst.BASE.PROMPTVIEW, { type: 1, f: this.endCallBack, o: this });
        }
    };
    ConquestFightView.prototype.getCloseBtnName = function () {
        return null;
    };
    ConquestFightView.prototype.dispose = function () {
        this._conquestConfig = null;
        _super.prototype.dispose.call(this);
    };
    return ConquestFightView;
}(BattleView));
__reflect(ConquestFightView.prototype, "ConquestFightView");
