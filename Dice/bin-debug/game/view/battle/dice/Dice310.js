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
 * - --原名称：吸收骰子  --新名称：汲取
 * 从敌人身上吸收SP
*/
var Dice310 = (function (_super) {
    __extends(Dice310, _super);
    function Dice310(data, appearEff) {
        return _super.call(this, data, appearEff) || this;
    }
    Dice310.prototype.init = function (data, appeareff) {
        _super.prototype.init.call(this, data, appeareff);
        var dicedata = this.getDiceData();
        dicedata.special2cd = (dicedata.property2) * 1000;
        dicedata.setspecial2CdTimeArr();
    };
    Dice310.prototype.refresh = function (data, appeareff) {
        _super.prototype.refresh.call(this, data, appeareff);
        var dicedata = this.getDiceData();
        dicedata.special2cd = dicedata.property2 * 1000;
        dicedata.setspecial2CdTimeArr(BattleStatus.battleLogicHasTickTime);
    };
    Dice310.prototype.checkDoAction = function () {
        var dicedata = this.getDiceData();
        var arr3 = dicedata.special2cdTimeArr;
        var l3 = arr3.length;
        for (var i = 0; i < l3; i++) {
            var t = arr3[i];
            if (!!BattleStatus.checkCdDoTime(dicedata.special2cd, t)) {
                this.checkSpecial2Atk(i);
            }
        }
        _super.prototype.checkDoAction.call(this);
    };
    Dice310.prototype.createBullet = function (starIdx, findmonsterDataList) {
        var dicedata = this.getDiceData();
        // let starX=BattleStatus.starCfg[dicedata.star-1][starIdx].x*DiceScaleEnum.scale_41;
        // let starY=BattleStatus.starCfg[dicedata.star-1][starIdx].y*DiceScaleEnum.scale_41;
        var fpos = { x: this.x, y: this.y };
        var bullet = Bullet.createBullet(dicedata, fpos);
        if (this.checkHasBuff(dicedata.id)) {
            bullet.setAddSp();
            this.removeBuff(dicedata.id);
        }
        bullet.atk(findmonsterDataList);
    };
    Dice310.prototype.checkSpecial2Atk = function (starIdx) {
        var dicedata = this.getDiceData();
        var buffData = { diceId: dicedata.id, keep: 0, cd: 0, isMe: dicedata.isMe }; //this._keep
        DiceBuff.addBuff(buffData, this);
    };
    Dice310.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return Dice310;
}(BaseDice));
__reflect(Dice310.prototype, "Dice310");
//# sourceMappingURL=Dice310.js.map