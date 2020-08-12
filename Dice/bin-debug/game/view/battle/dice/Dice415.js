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
 * --原名称：台风骰子  --新名称：飓风
*/
var Dice415 = (function (_super) {
    __extends(Dice415, _super);
    function Dice415(data, appearEff) {
        var _this = _super.call(this, data, appearEff) || this;
        _this.isFirst1 = false;
        _this.isFirst2 = false;
        return _this;
    }
    Dice415.prototype.init = function (data, appeareff) {
        _super.prototype.init.call(this, data, appeareff);
        var dicedata = this.getDiceData();
        dicedata.special1cd = (dicedata.property1) * 1000;
        dicedata.setspecial1CdTimeArr();
        dicedata.special2cd = (dicedata.property1 + dicedata.property2) * 1000;
        dicedata.setspecial2CdTimeArr();
    };
    Dice415.prototype.refresh = function (data, appeareff) {
        _super.prototype.refresh.call(this, data, appeareff);
        var dicedata = this.getDiceData();
        dicedata.special1cd = (dicedata.property1) * 1000;
        dicedata.setspecial1CdTimeArr(BattleStatus.battleLogicHasTickTime);
        dicedata.special2cd = (dicedata.property1 + dicedata.property2) * 1000;
        dicedata.setspecial2CdTimeArr(BattleStatus.battleLogicHasTickTime);
    };
    Dice415.prototype.checkDoAction = function () {
        _super.prototype.checkDoAction.call(this);
        var dicedata = this.getDiceData();
        var arr = dicedata.special1cdTimeArr;
        var l = arr.length;
        for (var i = 0; i < l; i++) {
            var t = arr[i];
            if (!!BattleStatus.checkCdDoTime(dicedata.special1cd, t)) {
                if (!this.isFirst1) {
                    this.isFirst1 = true;
                    dicedata.special1cd = (dicedata.property1 + dicedata.property2) * 1000;
                    dicedata.setspecial1CdTimeArr(BattleStatus.battleLogicHasTickTime);
                }
                this.checkSpecial1Atk(i);
            }
        }
        var arr2 = dicedata.special2cdTimeArr;
        var l2 = arr2.length;
        for (var i = 0; i < l2; i++) {
            var t = arr2[i];
            if (!!BattleStatus.checkCdDoTime(dicedata.special2cd, t)) {
                if (!this.isFirst2) {
                    this.isFirst2 = true;
                    dicedata.special2cd = (dicedata.property1 + dicedata.property2) * 1000;
                    dicedata.setspecial2CdTimeArr(BattleStatus.battleLogicHasTickTime);
                }
                this.checkSpecial2Atk(i);
            }
        }
    };
    Dice415.prototype.checkSpecial1Atk = function (starIdx) {
        var dicedata = this.getDiceData();
        this.playAtkSound();
        var buffData = { diceId: dicedata.id + "_1", keep: (dicedata.property2) * 1000, atkspeed: dicedata.property3[1], cd: 0, isMe: dicedata.isMe, from: dicedata.x + "_" + dicedata.y }; //this._keep
        DiceBuff.addBuff(buffData, this);
    };
    Dice415.prototype.checkSpecial2Atk = function (starIdx) {
        var dicedata = this.getDiceData();
        this.playAtkSound();
        // let changeeff = ComponentMgr.getCustomMovieClip(`dice415eff`,null,50,BattleCustomEffect);
        // changeeff.anchorOffsetX = 53 / 2;
        // changeeff.anchorOffsetY = 53 / 2;
        // changeeff.y = -50;
        // let scale = 4;
        // changeeff.setScale(scale);
        // changeeff.playWithTime(1);
        // changeeff.setEndCallBack(()=>{
        //     changeeff.dispose();
        //     changeeff = null;
        // },this);
        // this._extraGroup.addChild(changeeff);
        var buffData = { diceId: dicedata.id + "_2", keep: (dicedata.property3[0]) * 1000, atkspeed: dicedata.property3[2], cd: 0, isMe: dicedata.isMe, crit: 1, from: dicedata.x + "_" + dicedata.y }; //this._keep
        DiceBuff.addBuff(buffData, this);
    };
    Dice415.prototype.addBuffStatus = function (addStatus) {
        var _this = this;
        if (BattleStatus.stopActEffect) {
            return;
        }
        var clipname = addStatus + "_dicebuff";
        var clip = this._extraGroup.getChildByName(clipname);
        if (!clip) {
            if (addStatus == "415_1") {
                var key = "" + 304;
                var cfg_1 = Config.DiceCfg.getAddDiceEffById(key);
                var name_1 = "adddice" + key;
                if (cfg_1) {
                    if (RES.hasRes(name_1 + "1")) {
                        var changeeff_1 = ComponentMgr.getCustomMovieClip("dice415eff", null, 50, BattleCustomEffect);
                        changeeff_1.anchorOffsetX = 53 / 2;
                        changeeff_1.anchorOffsetY = 53 / 2;
                        changeeff_1.y = -50;
                        var scale = 4;
                        changeeff_1.setScale(scale);
                        changeeff_1.playWithTime(1);
                        changeeff_1.setEndCallBack(function () {
                            changeeff_1.dispose();
                            changeeff_1 = null;
                            var mv = ComponentMgr.getCustomMovieClip(name_1, null, cfg_1.timeparam, BattleCustomEffect);
                            mv.anchorOffsetX = cfg_1.width / 2;
                            mv.anchorOffsetY = cfg_1.height / 2;
                            mv.y = -65;
                            if (cfg_1.playnum > 0) {
                                mv.setEndCallBack(function () {
                                    mv.dispose();
                                    mv = null;
                                }, _this);
                            }
                            if (cfg_1.add) {
                                mv.blendMode = egret.BlendMode.ADD;
                            }
                            mv.name = addStatus + "_dicebuff";
                            mv.playWithTime(cfg_1.playnum);
                            _this._extraGroup.addChild(mv);
                            // BattleStatus.scene.battlePause();
                        }, this);
                        this._extraGroup.addChild(changeeff_1);
                        // mv.setPosition(this._bg.x+this._bg.width/2,this._bg.y+this._bg.height/2);
                    }
                }
            }
            else if (addStatus == "415_2") {
                var key = "" + 415;
                var cfg = Config.DiceCfg.getAddDiceEffById(key);
                var name_2 = "adddice" + key;
                if (cfg) {
                    if (RES.hasRes(name_2 + "1")) {
                        var mv_1 = ComponentMgr.getCustomMovieClip(name_2, null, cfg.timeparam, BattleCustomEffect);
                        mv_1.anchorOffsetX = cfg.width / 2;
                        mv_1.anchorOffsetY = cfg.height / 2;
                        mv_1.y = -65;
                        if (cfg.playnum > 0) {
                            mv_1.setEndCallBack(function () {
                                mv_1.dispose();
                                mv_1 = null;
                            }, this);
                        }
                        if (cfg.add) {
                            mv_1.blendMode = egret.BlendMode.ADD;
                        }
                        mv_1.name = addStatus + "_dicebuff";
                        mv_1.playWithTime(cfg.playnum);
                        this._extraGroup.addChild(mv_1);
                        // let changeeff = ComponentMgr.getCustomMovieClip(`dice304eff`,null,70,BattleCustomEffect);
                        // changeeff.anchorOffsetX = 140 / 2;
                        // changeeff.anchorOffsetY = 140 / 2;
                        // changeeff.playWithTime(1);
                        // changeeff.y = -50;
                        // changeeff.setEndCallBack(()=>{
                        //     changeeff.dispose();
                        //     changeeff = null;
                        // },this);
                        // this._extraGroup.addChild(changeeff);
                        // mv.setPosition(this._bg.x+this._bg.width/2,this._bg.y+this._bg.height/2);
                    }
                }
            }
            else {
                _super.prototype.addBuffStatus.call(this, addStatus);
            }
        }
    };
    Dice415.prototype.removeBuffAddStatus = function (stringid) {
        if (stringid == "415_1" || stringid == "415_2") {
            var clipname = stringid + "_dicebuff";
            // clipname = `415_1_dicebuff`;
            var clip = this._extraGroup.getChildByName(clipname);
            if (clip) {
                clip.dispose();
                clip = null;
            }
        }
        else {
            _super.prototype.removeBuffAddStatus.call(this, stringid);
        }
    };
    Dice415.prototype.dispose = function () {
        this.isFirst1 = false;
        this.isFirst2 = false;
        _super.prototype.dispose.call(this);
    };
    return Dice415;
}(BaseDice));
__reflect(Dice415.prototype, "Dice415");
//# sourceMappingURL=Dice415.js.map