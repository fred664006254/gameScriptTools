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
 * --原名称：成长骰子  --新名称：生长
*/
var Dice409 = (function (_super) {
    __extends(Dice409, _super);
    function Dice409(data, appearEff) {
        return _super.call(this, data, appearEff) || this;
    }
    Dice409.prototype.init = function (data, appeareff) {
        _super.prototype.init.call(this, data, appeareff);
        var dicedata = this.getDiceData();
        dicedata.special2cd = dicedata.property2 * 1000;
        dicedata.setspecial2CdTimeArr();
    };
    Dice409.prototype.refresh = function (data, appeareff) {
        _super.prototype.refresh.call(this, data, appeareff);
        var dicedata = this.getDiceData();
        dicedata.special2cd = dicedata.property2 * 1000;
        dicedata.setspecial2CdTimeArr(BattleStatus.battleLogicHasTickTime);
    };
    Dice409.prototype.checkDoAction = function () {
        _super.prototype.checkDoAction.call(this);
        var dicedata = this.getDiceData();
        if (!dicedata.checkMaxStar()) {
            var arr3 = dicedata.special2cdTimeArr;
            var l3 = arr3.length;
            for (var i = 0; i < l3; i++) {
                var t = arr3[i];
                if (!!BattleStatus.checkCdDoTime(dicedata.special2cd, t)) {
                    this.checkSpecial2Atk(i);
                }
            }
        }
    };
    Dice409.prototype.checkSpecial2Atk = function (starIdx) {
        //成长一次
        this.playAtkSound();
        if (BattleStatus.scene) {
            App.MsgHelper.dispEvt(MsgConst.BATTLECREATE_DICE, {
                type: "grow",
                pos: this.getPos().x + "_" + this.getPos().y,
                isMe: this.getDiceData().isMe,
                seed: BattleStatus.battleLogicHasTickTime / (this.getDiceData().index)
            });
            //    this.alpha = 0;
        }
    };
    Dice409.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return Dice409;
}(BaseDice));
__reflect(Dice409.prototype, "Dice409");
//# sourceMappingURL=Dice409.js.map