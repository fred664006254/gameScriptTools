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
 * --原名称：狂风骰子  --新名称：狂风
*/
var Dice304 = (function (_super) {
    __extends(Dice304, _super);
    function Dice304(data, appearEff) {
        var _this = _super.call(this, data, appearEff) || this;
        _this.isFirst = false;
        return _this;
    }
    Dice304.prototype.init = function (data, appearEff) {
        _super.prototype.init.call(this, data, appearEff);
        var dicedata = this.getDiceData();
        dicedata.special2cd = (dicedata.property2) * 1000;
        dicedata.setspecial2CdTimeArr();
    };
    Dice304.prototype.refresh = function (data, appeareff) {
        _super.prototype.refresh.call(this, data, appeareff);
        var dicedata = this.getDiceData();
        dicedata.special2cd = dicedata.property2 * 1000;
        dicedata.setspecial2CdTimeArr(BattleStatus.battleLogicHasTickTime);
    };
    Dice304.prototype.powerup = function (pwlv) {
        _super.prototype.powerup.call(this, pwlv);
        var dicedata = this.getDiceData();
        dicedata.special2cd = (dicedata.property2) * 1000;
        dicedata.setspecial2CdTimeArr();
    };
    Dice304.prototype.checkDoAction = function () {
        //攻击
        _super.prototype.checkDoAction.call(this);
        //特殊技能
        var dicedata = this.getDiceData();
        var arr3 = dicedata.special2cdTimeArr;
        var l3 = arr3.length;
        for (var i = 0; i < l3; i++) {
            var t = arr3[i];
            if (!!BattleStatus.checkCdDoTime(dicedata.special2cd, t)) {
                dicedata.special2cd = (dicedata.property2 + dicedata.property1) * 1000;
                dicedata.setspecial2CdTimeArr(BattleStatus.battleLogicHasTickTime);
                // this.isFirst = true;
                this.checkSpecial2Atk(i);
            }
        }
    };
    Dice304.prototype.addBuffStatus = function (addStatus) {
        var _this = this;
        if (addStatus == "304") {
            var key = "" + addStatus;
            var cfg_1 = Config.DiceCfg.getAddDiceEffById(key);
            var name_1 = "adddice" + key;
            if (cfg_1) {
                if (RES.hasRes(name_1 + "1")) {
                    var changeeff_1 = ComponentMgr.getCustomMovieClip("dice304eff", null, 70, BattleCustomEffect);
                    changeeff_1.anchorOffsetX = 140 / 2;
                    changeeff_1.anchorOffsetY = 140 / 2;
                    changeeff_1.playWithTime(1);
                    changeeff_1.y = -50;
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
                    }, this);
                    this._extraGroup.addChild(changeeff_1);
                    // mv.setPosition(this._bg.x+this._bg.width/2,this._bg.y+this._bg.height/2);
                }
            }
        }
        else {
            _super.prototype.addBuffStatus.call(this, addStatus);
        }
    };
    Dice304.prototype.removeBuffAddStatus = function (stringid) {
        if (stringid == "304") {
            var clipname = stringid + "_dicebuff";
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
    Dice304.prototype.checkSpecial2Atk = function (starIdx) {
        var dicedata = this.getDiceData();
        var buffData = { diceId: dicedata.id, keep: dicedata.property1 * 1000, atkspeed: dicedata.property3[0], cd: 0, isMe: dicedata.isMe, from: dicedata.x + "_" + dicedata.y }; //this._keep
        this.playAtkSound();
        DiceBuff.addBuff(buffData, this);
    };
    Dice304.prototype.dispose = function () {
        this.isFirst = false;
        _super.prototype.dispose.call(this);
    };
    return Dice304;
}(BaseDice));
__reflect(Dice304.prototype, "Dice304");
//# sourceMappingURL=Dice304.js.map