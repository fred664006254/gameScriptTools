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
 * -原名称：锁骰子  --新名称：眩晕
*/
var Bullet109 = (function (_super) {
    __extends(Bullet109, _super);
    function Bullet109() {
        var _this = _super.call(this) || this;
        _this._isKill = false;
        return _this;
    }
    Bullet109.prototype.extraDamage = function () {
        var monstersList = this.diceData.isMe ? BattleStatus.meMonsterList : BattleStatus.targetMonsterList;
        var vo = this.mVoList[0];
        if (!vo.lost(this.diceData.isMe)) {
            var diceData = this.diceData;
            var randomvalue = App.MathUtil.seededRandom(0, 1, BattleStatus.battleLogicHasTickTime / (this.diceData.index));
            if (randomvalue > 0 && randomvalue <= diceData.property1 && !vo.getIsStun()) {
                vo.isStun = true;
                this._isKill = true;
                var buffData = { diceId: diceData.id, keep: diceData.property2 * 1000, damage: 0, cd: 0, isMe: diceData.isMe, speed: 1 };
                MonsterBuff.addBuff(buffData, vo);
                this.playAtkSound();
            }
        }
    };
    Bullet109.prototype.playAtkSound = function () {
        if (this.diceData.isMe) {
            if (this._isKill) {
                this._isKill = false;
                var name_1 = "effect_dice_" + this.diceData.id;
                if (RES.hasRes(name_1)) {
                    SoundMgr.playEffect(name_1);
                }
            }
            else {
                _super.prototype.playAtkSound.call(this);
            }
        }
    };
    Bullet109.prototype.reset = function () {
        this._isKill = false;
        _super.prototype.reset.call(this);
    };
    return Bullet109;
}(Bullet));
__reflect(Bullet109.prototype, "Bullet109");
//# sourceMappingURL=Bullet109.js.map