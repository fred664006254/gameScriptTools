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
 * 原名称：死亡骰子  --新名称：瞬杀
 * 一击必杀概率
*/
var Bullet301 = (function (_super) {
    __extends(Bullet301, _super);
    function Bullet301() {
        var _this = _super.call(this) || this;
        _this._isKill = false;
        return _this;
    }
    Bullet301.prototype.damage = function () {
        var self = this;
        var diceData = self.diceData;
        var mvo = self.mVoList[0];
        var nmDmgData = this.nmDmgData;
        var monstersList = mvo.isMe ? BattleStatus.meMonsterList : BattleStatus.targetMonsterList;
        var target = monstersList[mvo.getName()];
        if (!!nmDmgData) {
            if (!target.lost(this.diceData.isMe)) {
                var damage = this.calDamageNum(target);
                target.beAtk({ hp: damage, isMe: diceData.isMe, crit: self._isKill ? false : nmDmgData.isCrit, addStatus: self._isKill ? String(this.diceData.id) : null });
                //普通怪物受到伤害后
                this.playAtkSound();
            }
        }
    };
    Bullet301.prototype.playAtkSound = function () {
        if (this.diceData.isMe) {
            var name_1 = "effect_dice_" + this.diceData.id;
            if (RES.hasRes(name_1) && this._isKill) {
                SoundMgr.playEffect(name_1);
            }
            else {
                name_1 = "effect_attack_" + App.MathUtil.getRandom(1, 4);
                SoundMgr.playEffect(name_1);
            }
        }
    };
    Bullet301.prototype.reset = function () {
        this._isKill = false;
        _super.prototype.reset.call(this);
    };
    //一击必杀概率 对boss无效
    Bullet301.prototype.calDamageNum = function (monster) {
        var self = this;
        var diceData = self.diceData;
        var ratio = App.MathUtil.seededRandom(0, 1, BattleStatus.battleLogicHasTickTime / (this.diceData.index));
        var nmDmgData = this.nmDmgData;
        var num = nmDmgData.dmg;
        var mvo = self.mVoList[0];
        if (ratio <= (diceData.property1 + diceData.kill) && monster && monster.getMonsterType() != 3 && !monster.isBoss()) {
            self._isKill = true;
            this.isKillByOne = true;
            num = monster.getCurHp();
        }
        return num;
    };
    Bullet301.prototype.dispose = function () {
        this._isKill = false;
        _super.prototype.dispose.call(this);
    };
    return Bullet301;
}(Bullet));
__reflect(Bullet301.prototype, "Bullet301");
//# sourceMappingURL=Bullet301.js.map