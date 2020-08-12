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
 * --原名称：暴风雪骰子  --新名称：极寒
*/
var Dice408 = (function (_super) {
    __extends(Dice408, _super);
    function Dice408(data, appearEff) {
        var _this = _super.call(this, data, appearEff) || this;
        _this.isFirst = false;
        return _this;
    }
    Dice408.prototype.init = function (data, appeareff) {
        _super.prototype.init.call(this, data, appeareff);
        var dicedata = this.getDiceData();
        this.isFirst = false;
        dicedata.special2cd = dicedata.property2 * 1000;
        dicedata.setspecial2CdTimeArr();
    };
    Dice408.prototype.refresh = function (data, appeareff) {
        _super.prototype.refresh.call(this, data, appeareff);
        var dicedata = this.getDiceData();
        dicedata.special2cd = dicedata.property2 * 1000;
        dicedata.setspecial2CdTimeArr(BattleStatus.battleLogicHasTickTime);
    };
    Dice408.prototype.checkDoAction = function () {
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
    Dice408.prototype.checkSpecial2Atk = function (starIdx) {
        var dicedata = this.getDiceData();
        this.playAtkSound();
        // this.createObstacle(starIdx);
        var monstersdataList = dicedata.isMe ? BattleStatus.meMonsterDataList : BattleStatus.targetMonsterDataList;
        var monstersList = dicedata.isMe ? BattleStatus.meMonsterList : BattleStatus.targetMonsterList;
        var keys = Object.keys(monstersdataList);
        var l = keys.length;
        for (var i = 0; i < l; i++) {
            var monstervo = monstersdataList[i];
            var monster = monstersList[monstervo.getName()];
            if (!monstervo.lost(dicedata.isMe)) {
                //dicedata
                var buffData = { diceId: dicedata.id, keep: 0, speed: dicedata.property1, cd: 0, isMe: dicedata.isMe }; //this._keep
                MonsterBuff.addBuff(buffData, monstervo);
            }
        }
        BattleStatus.scene.stormIceEff(dicedata.isMe);
    };
    Dice408.prototype.dispose = function () {
        this.isFirst = false;
        _super.prototype.dispose.call(this);
    };
    return Dice408;
}(BaseDice));
__reflect(Dice408.prototype, "Dice408");
//# sourceMappingURL=Dice408.js.map