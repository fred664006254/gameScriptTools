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
var Bullet203 = (function (_super) {
    __extends(Bullet203, _super);
    function Bullet203() {
        return _super.call(this) || this;
    }
    Bullet203.prototype.extraDamage = function () {
        var monstersList = this.diceData.isMe ? BattleStatus.meMonsterList : BattleStatus.targetMonsterList;
        var findmonsterDataList = DiceHelper.findRangMonster(this.mVoList[0].getCenterDis(), this.diceData.property3[0], this.diceData.isMe);
        var l = findmonsterDataList.length;
        for (var i = 0; i < l; i++) {
            var mData = findmonsterDataList[i];
            if (!mData.lost(this.diceData.isMe)) {
                var monster = monstersList[mData.getName()];
                monster.beAtk({ hp: this.diceData.property1, isMe: this.diceData.isMe, crit: false });
            }
        }
    };
    return Bullet203;
}(Bullet));
__reflect(Bullet203.prototype, "Bullet203");
//# sourceMappingURL=Bullet203.js.map