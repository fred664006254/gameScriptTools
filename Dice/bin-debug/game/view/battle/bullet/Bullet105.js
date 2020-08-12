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
var Bullet105 = (function (_super) {
    __extends(Bullet105, _super);
    function Bullet105() {
        return _super.call(this) || this;
    }
    Bullet105.prototype.extraDamage = function () {
        var monstersList = this.diceData.isMe ? BattleStatus.meMonsterList : BattleStatus.targetMonsterList;
        var vo = this.mVoList[0];
        if (!vo.lost(this.diceData.isMe)) {
            var diceData = this.diceData;
            var buffData = { diceId: diceData.id, keep: 0, speed: diceData.property1, cd: 0, isMe: diceData.isMe, maxOverlap: diceData.property3[0] };
            MonsterBuff.addBuff(buffData, vo);
        }
    };
    Bullet105.prototype.reset = function () {
        _super.prototype.reset.call(this);
    };
    return Bullet105;
}(Bullet));
__reflect(Bullet105.prototype, "Bullet105");
//# sourceMappingURL=Bullet105.js.map