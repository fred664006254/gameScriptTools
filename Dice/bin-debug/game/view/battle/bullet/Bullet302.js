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
 * --原名称：瞬移骰子  --新名称：回溯
 * 有一定概率把敌人送回初始位置
*/
var Bullet302 = (function (_super) {
    __extends(Bullet302, _super);
    function Bullet302() {
        var _this = _super.call(this) || this;
        _this._isback = false;
        return _this;
    }
    Bullet302.prototype.reset = function () {
        this._isback = false;
        _super.prototype.reset.call(this);
    };
    Bullet302.prototype.damage = function () {
        var self = this;
        var diceData = self.diceData;
        var mvo = self.mVoList[0];
        var nmDmgData = this.nmDmgData;
        var lost = false;
        if (!!nmDmgData) {
            if (!this.target.lost(this.diceData.isMe)) {
                var damage = this.calDamageNum(this.target);
                var ratio = App.MathUtil.seededRandom(0, 1, BattleStatus.battleLogicHasTickTime / (this.diceData.index));
                var back = false;
                if (ratio > 0 && ratio <= diceData.property1 && !mvo.isHasBack) {
                    //传回位置
                    mvo.isHasBack = true;
                    back = true;
                    this._isback = true;
                }
                this.target.beAtk({ hp: damage, isMe: this.diceData.isMe, crit: nmDmgData.isCrit, addStatus: back ? this.diceData.id : null });
                if (back) {
                    //回溯
                    this.target.resetToStart();
                }
                //普通怪物受到伤害后
                this.playAtkSound();
            }
            else {
                lost = true;
            }
        }
        if (((this.target && !lost) || (!this.target)) && this.diceData.checkExtDamage()) {
            this.extraDamage();
        }
    };
    Bullet302.prototype.playAtkSound = function () {
        if (this.diceData.isMe) {
            var name_1 = "effect_dice_" + this.diceData.id;
            if (RES.hasRes(name_1) && this._isback) {
                SoundMgr.playEffect(name_1);
            }
            else {
                name_1 = "effect_attack_" + App.MathUtil.getRandom(1, 4);
                SoundMgr.playEffect(name_1);
            }
        }
    };
    Bullet302.prototype.dispose = function () {
        this._isback = false;
        _super.prototype.dispose.call(this);
    };
    return Bullet302;
}(Bullet));
__reflect(Bullet302.prototype, "Bullet302");
//# sourceMappingURL=Bullet302.js.map