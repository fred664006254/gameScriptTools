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
 * 原名称：太阳骰子
 * * 打同一名敵人時，傷害會逐漸增加，是唯二能無限疊加攻擊力的骰子  而且場上有1或4顆太陽骰時，太陽骰能變身，打出的攻擊會產生爆炸，爆炸的傷害也會疊
 * 打BOSS時能順便打後方小怪，但被小怪超前時一樣會傷害重置
*/
var Bullet411 = (function (_super) {
    __extends(Bullet411, _super);
    function Bullet411() {
        return _super.call(this) || this;
    }
    Bullet411.prototype.damage = function () {
        var lost = false;
        if (!!this.nmDmgData) {
            if (!this.target.lost(this.diceData.isMe)) {
                var damage = this.calDamageNum(this.target);
                if (this.diceData.isMe) {
                    App.LogUtil.log((this.nmDmgData.isCrit ? "暴击:" : "普攻:") + damage);
                }
                this.target.beAtk({ hp: damage, isMe: this.diceData.isMe, crit: this.nmDmgData.isCrit, addStatus: this.isKillByOne ? "301" : null });
                //普通怪物受到伤害后
                this.playAtkSound();
            }
            else {
                lost = true;
            }
        }
        this.extraDamage();
    };
    Bullet411.prototype.playHitEffect = function (hit) {
        if (this.status != 2) {
            hit && this.damage();
            this.status = 2;
            var useDid = this.diceData.id;
            var effectKey = "bthiteffect" + useDid;
            if ((!hit) || (!ResMgr.hasRes(effectKey + "1"))) {
                effectKey = "bthiteffect";
            }
            else {
                this.setScale(2);
            }
            // if(BattleStatus.stopActEffect)
            // {
            //     this.dispose();
            // }
            // else
            // {
            var frameCount = this.frameCount(effectKey);
            var resArr = [];
            for (var i = 1; i <= frameCount; i++) {
                resArr.push(effectKey + i);
            }
            this.frameImages = resArr;
            this.playFrameRate = 50;
            // this.playFrameRate
            this.setEndCallBack(this.dispose, this);
            this.texture = null;
            this.width = this.height = NaN;
            this.playWithTime(1);
            // }
        }
    };
    Bullet411.prototype.extraDamage = function () {
        var diceData = this.diceData;
        var monstersList = this.diceData.isMe ? BattleStatus.meMonsterList : BattleStatus.targetMonsterList;
        var vo = this.mVoList[0];
        if (vo && !vo.lost(this.diceData.isMe)) {
            var diceData_1 = this.diceData;
            if (diceData_1.getDiceIsChangeSun()) {
                var buffData = { diceId: diceData_1.id + "_" + this.diceData.posStr + "_" + (this.diceData.isMe ? 1 : 2), keep: 0, cd: 0, isMe: diceData_1.isMe, atknum: 1, maxOverlap: BattleStatus.maxAtkNum };
                MonsterBuff.addBuff(buffData, vo);
            }
        }
        if (diceData.getDiceIsChangeSun()) {
            //有爆炸范围伤害
            var findmonsterDataList = DiceHelper.findRangMonster(this.mVoList[0].getCenterDis(), this.diceData.property3[0], this.diceData.isMe);
            var l = findmonsterDataList.length;
            for (var i = 0; i < l; i++) {
                var mData = findmonsterDataList[i];
                if (!mData.lost(this.diceData.isMe)) {
                    var monster = monstersList[mData.getName()];
                    var buffname = this.diceData.id + "_" + this.diceData.posStr + "_" + (this.diceData.isMe ? 1 : 2) + "_boom";
                    var boombuffData = { diceId: buffname, keep: 0, cd: 0, isMe: diceData.isMe, boomnum: 1, maxOverlap: BattleStatus.maxAtkNum };
                    var buff = monster.checkHasBuff(buffname);
                    var damage = this.diceData.property1;
                    if (buff && buff.boomnum) {
                        damage += (buff.boomnum * this.diceData.property1);
                    }
                    monster.beAtk({ hp: damage, isMe: this.diceData.isMe, crit: false, addStatus: "411" });
                    MonsterBuff.addBuff(boombuffData, mData);
                }
            }
        }
    };
    //疊加攻擊力
    Bullet411.prototype.calDamageNum = function (monster) {
        var nmDmgData = this.nmDmgData;
        var damage = nmDmgData.dmg;
        if (this.diceData.getDiceIsChangeSun()) {
            var buffname = this.diceData.id + "_" + this.diceData.posStr + "_" + (this.diceData.isMe ? 1 : 2);
            var buff = monster.checkHasBuff(buffname);
            if (buff && buff.atknum) {
                damage += buff.atknum * this.diceData.property3[1];
            }
        }
        var initInfo = Api.BattleVoApi.getInitInfo(this.diceData.isMe);
        if (this.diceData.checkIsKill(initInfo.uid) && monster && monster.getMonsterType() != 3 && !monster.isBoss()) {
            this.isKillByOne = true;
            damage = monster.getCurHp();
        }
        return damage;
    };
    Bullet411.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return Bullet411;
}(Bullet));
__reflect(Bullet411.prototype, "Bullet411");
//# sourceMappingURL=Bullet411.js.map