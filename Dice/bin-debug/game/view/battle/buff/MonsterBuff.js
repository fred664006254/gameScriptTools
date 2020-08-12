var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MonsterBuff = (function () {
    function MonsterBuff() {
        this.birthTime = 0;
        /**0永久存在 */
        this.keep = 0;
        this.cd = 0;
        this.damage = 0;
        this.diceId = null;
        this.isMe = false;
        this.maxOverlap = 1;
        this.overlap = 0;
        this.speed = 0;
        this.adddmg = 0;
        this.atknum = 0;
        this.posion = false;
        this.dicedata = null;
        this.boomnum = 0;
    }
    MonsterBuff.prototype.init = function (data) {
        this.birthTime = BattleStatus.battleLogicHasTickTime;
        this.keep = data.keep || 0;
        this.cd = data.cd;
        this.damage = data.damage;
        this.diceId = data.diceId;
        this.isMe = data.isMe;
        this.maxOverlap = data.maxOverlap || 1;
        this.overlap = 1;
        this.speed = data.speed;
        this.adddmg = data.adddmg;
        this.atknum = data.atknum;
        this.posion = data.posion;
        this.dicedata = data.dicedata;
        this.boomnum = data.boomnum;
    };
    MonsterBuff.prototype.update = function (data) {
        if (data.atknum) {
            this.atknum += data.atknum;
        }
        if (data.boomnum) {
            this.boomnum += data.boomnum;
        }
        else {
            this.overlap++;
        }
    };
    MonsterBuff.prototype.checkDoTime = function () {
        if (!this.cd) {
            return false;
        }
        return !!BattleStatus.checkCdDoTime(this.cd, this.birthTime);
    };
    MonsterBuff.prototype.checkEnd = function () {
        if (this.keep > 0) {
            return BattleStatus.battleLogicHasTickTime > this.birthTime + this.keep;
        }
        return false;
    };
    MonsterBuff.prototype.reset = function () {
        this.birthTime = this.keep = this.cd = this.damage = 0;
        this.maxOverlap = 1;
        this.overlap = 1;
        this.diceId = null;
        this.posion = false;
    };
    MonsterBuff.addBuff = function (data, mstVo) {
        var monstList = mstVo.isMe ? BattleStatus.meMonsterList : BattleStatus.targetMonsterList;
        var mst = monstList[mstVo.getName()];
        if (mst) {
            var buff = mst.checkHasBuff(data.diceId);
            if (!buff) {
                buff = new MonsterBuff();
                buff.init(data);
                mst.addBuff(buff);
            }
            else {
                if (Config.DiceCfg.getCanAddEffById(data.diceId)) {
                    buff.update(data);
                    //最多叠加3张图
                    if (buff.overlap < 4) {
                        mst.addBeAtkStatus(buff.diceId, true);
                    }
                }
                else {
                    if (buff.maxOverlap > buff.overlap) {
                        buff.update(data);
                        mst.updateBuff(buff);
                    }
                }
            }
        }
    };
    return MonsterBuff;
}());
__reflect(MonsterBuff.prototype, "MonsterBuff");
//# sourceMappingURL=MonsterBuff.js.map