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
var Bullet101 = (function (_super) {
    __extends(Bullet101, _super);
    function Bullet101() {
        return _super.call(this) || this;
    }
    Bullet101.prototype.extraDamage = function () {
        var monstersList = this.diceData.isMe ? BattleStatus.meMonsterList : BattleStatus.targetMonsterList;
        var findmonsterDataList = DiceHelper.findRangMonster(this.mVoList[0].getCenterDis(), this.diceData.property3[0], this.diceData.isMe);
        var l = findmonsterDataList.length;
        for (var i = 0; i < l; i++) {
            var mData = findmonsterDataList[i];
            if (!mData.lost(this.diceData.isMe) && mData.getName() != this.mVoList[0].getName()) {
                var monster = monstersList[mData.getName()];
                monster.beAtk({ hp: this.diceData.property1, isMe: this.diceData.isMe, crit: false });
            }
        }
    };
    return Bullet101;
}(Bullet));
__reflect(Bullet101.prototype, "Bullet101");
//# sourceMappingURL=Bullet101.js.map