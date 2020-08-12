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
 * --原名称：光剑骰子  --新名称：圣剑
 * 掉半血
*/
var Bullet405 = (function (_super) {
    __extends(Bullet405, _super);
    function Bullet405() {
        var _this = _super.call(this) || this;
        _this._isHalf = false;
        return _this;
    }
    Bullet405.prototype.reset = function () {
        this._isHalf = false;
        _super.prototype.reset.call(this);
    };
    //光剑 附加当前生命值一半伤害 对boss无效
    Bullet405.prototype.extraDamage = function () {
        var self = this;
        var diceData = self.diceData;
        var mvo = self.mVoList[0];
        var monstersList = mvo.isMe ? BattleStatus.meMonsterList : BattleStatus.targetMonsterList;
        var target = monstersList[mvo.getName()];
        var ratio = App.MathUtil.seededRandom(0, 1, BattleStatus.battleLogicHasTickTime / (this.diceData.index));
        var nmDmgData = this.nmDmgData;
        var num = nmDmgData.dmg;
        if (ratio <= diceData.property1 && !mvo.getIsBoss() && target && mvo.type != 3) {
            num = Math.ceil(target.getCurHp() * 0.5);
            if (num != 0) {
                self._isHalf = true;
                target.beAtk({ hp: num, isMe: this.diceData.isMe, crit: false, addStatus: String(this.diceData.id), isPercent: true });
                this.playAtkSound();
            }
        }
    };
    Bullet405.prototype.playAtkSound = function () {
        if (this.diceData.isMe) {
            if (this._isHalf) {
                this._isHalf = false;
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
    Bullet405.prototype.dispose = function () {
        this._isHalf = false;
        _super.prototype.dispose.call(this);
    };
    return Bullet405;
}(Bullet));
__reflect(Bullet405.prototype, "Bullet405");
//# sourceMappingURL=Bullet405.js.map