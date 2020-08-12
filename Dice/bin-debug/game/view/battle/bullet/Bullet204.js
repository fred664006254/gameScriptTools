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
 * --原名称：龟裂骰子  --新名称：虚弱
*/
var Bullet204 = (function (_super) {
    __extends(Bullet204, _super);
    function Bullet204() {
        return _super.call(this) || this;
    }
    Bullet204.prototype.extraDamage = function () {
        var monstersList = this.diceData.isMe ? BattleStatus.meMonsterList : BattleStatus.targetMonsterList;
        var vo = this.mVoList[0];
        if (!vo.lost(this.diceData.isMe)) {
            var diceData = this.diceData;
            var buffData = { diceId: diceData.id, keep: 0, adddmg: diceData.property1, cd: 0, isMe: diceData.isMe };
            MonsterBuff.addBuff(buffData, vo);
        }
    };
    Bullet204.prototype.reset = function () {
        _super.prototype.reset.call(this);
    };
    return Bullet204;
}(Bullet));
__reflect(Bullet204.prototype, "Bullet204");
//# sourceMappingURL=Bullet204.js.map