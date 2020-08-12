var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DiceBuff = (function () {
    function DiceBuff() {
        this.birthTime = 0;
        /**0永久存在 */
        this.keep = 0;
        this.cd = 0;
        this.damage = 0;
        this.diceId = null;
        this.isMe = false;
        this.maxOverlap = 1;
        this.overlap = 0;
        this.atkspeed = 0;
        this.crit = 0;
        this.kill = 0;
        this.from = "";
        this.timespeed = 0;
    }
    DiceBuff.prototype.init = function (data) {
        this.birthTime = BattleStatus.battleLogicHasTickTime;
        this.keep = data.keep || 0;
        this.cd = data.cd;
        this.damage = data.damage;
        this.diceId = data.diceId;
        this.isMe = data.isMe;
        this.maxOverlap = data.maxOverlap || 1;
        this.overlap = data.overlap || 1;
        this.atkspeed = data.atkspeed;
        this.crit = data.crit;
        this.kill = data.kill;
        this.from = data.from;
        this.timespeed = data.timespeed;
    };
    DiceBuff.prototype.update = function (data) {
        if (data.crit) {
            this.crit += data.crit;
        }
        if (data.kill) {
            this.kill += data.kill;
        }
        this.overlap++;
        if (data.from) {
            this.from += "|" + data.from;
        }
    };
    DiceBuff.prototype.checkEnd = function () {
        if (this.keep > 0) {
            return BattleStatus.battleLogicHasTickTime > this.birthTime + this.keep;
        }
        return false;
    };
    DiceBuff.prototype.checkDoTime = function () {
        if (!this.cd) {
            return false;
        }
        return !!BattleStatus.checkCdDoTime(this.cd, this.birthTime);
    };
    DiceBuff.prototype.reset = function () {
        this.birthTime = this.keep = this.cd = this.damage = 0;
        this.maxOverlap = 1;
        this.overlap = 1;
        this.diceId = null;
        this.crit = 0;
    };
    DiceBuff.prototype.judgeFromPos = function (pos) {
        var bool = false;
        if (this.from) {
            var arr = this.from.split("|");
            bool = arr.indexOf(pos) > -1;
        }
        return bool;
    };
    DiceBuff.prototype.getFromPos = function () {
        return this.from;
    };
    DiceBuff.prototype.removeFromPos = function (pos) {
        if (this.from) {
            var arr = this.from.split("|");
            arr.splice(arr.indexOf(pos), 1);
            var str = "";
            for (var i = 0; i < arr.length; ++i) {
                str += arr[i] + "|";
            }
            str = str.substring(0, str.length - 1);
            this.from = str;
        }
    };
    DiceBuff.addBuff = function (data, dice) {
        var dicedata = dice.getDiceData();
        var buff = dice.checkHasBuff(data.diceId);
        if (!buff) {
            buff = new DiceBuff();
            buff.init(data);
            dice.addBuff(buff);
        }
        else {
            if (buff.maxOverlap > buff.overlap) {
                buff.update(data);
                dice.updateBuff(buff);
            }
        }
    };
    return DiceBuff;
}());
__reflect(DiceBuff.prototype, "DiceBuff");
//# sourceMappingURL=DiceBuff.js.map