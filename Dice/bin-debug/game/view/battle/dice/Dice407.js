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
 * --原名称：盾牌骰子  --新名称：圣盾
*/
var Dice407 = (function (_super) {
    __extends(Dice407, _super);
    function Dice407(data, appearEff) {
        return _super.call(this, data, appearEff) || this;
    }
    Dice407.prototype.init = function (data, appeareff) {
        _super.prototype.init.call(this, data, appeareff);
        var dicedata = this.getDiceData();
        dicedata.special2cd = dicedata.property2 * 1000;
        dicedata.setspecial2CdTimeArr();
    };
    Dice407.prototype.refresh = function (data, appeareff) {
        _super.prototype.refresh.call(this, data, appeareff);
        var dicedata = this.getDiceData();
        dicedata.special2cd = dicedata.property2 * 1000;
        dicedata.setspecial2CdTimeArr(BattleStatus.battleLogicHasTickTime);
    };
    Dice407.prototype.checkDoAction = function () {
        _super.prototype.checkDoAction.call(this);
        var dicedata = this.getDiceData();
        var arr3 = dicedata.special2cdTimeArr;
        var l3 = arr3.length;
        for (var i = 0; i < l3; i++) {
            var t = arr3[i];
            if (!!BattleStatus.checkCdDoTime(dicedata.special2cd, t)) {
                this.checkSpecial2Atk(i);
            }
        }
    };
    Dice407.prototype.checkSpecial2Atk = function (starIdx) {
        this.createObstacle(starIdx);
    };
    return Dice407;
}(BaseDice));
__reflect(Dice407.prototype, "Dice407");
//# sourceMappingURL=Dice407.js.map