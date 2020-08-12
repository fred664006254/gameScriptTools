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
var Bullet104 = (function (_super) {
    __extends(Bullet104, _super);
    function Bullet104() {
        return _super.call(this) || this;
    }
    Bullet104.prototype.extraDamage = function () {
        var monstersList = this.diceData.isMe ? BattleStatus.meMonsterList : BattleStatus.targetMonsterList;
        var vo = this.mVoList[0];
        if (!vo.lost(this.diceData.isMe)) {
            var diceData = this.diceData;
            var buffData = { diceId: diceData.id, keep: 0, damage: diceData.property1, cd: 1000, isMe: diceData.isMe };
            MonsterBuff.addBuff(buffData, vo);
        }
    };
    Bullet104.prototype.reset = function () {
        _super.prototype.reset.call(this);
    };
    return Bullet104;
}(Bullet));
__reflect(Bullet104.prototype, "Bullet104");
//# sourceMappingURL=Bullet104.js.map