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
 * 原名称：-原名称：激光骰子  --新名称：激光
*/
var Bullet303 = (function (_super) {
    __extends(Bullet303, _super);
    function Bullet303() {
        return _super.call(this) || this;
    }
    Bullet303.prototype.setBulletRes = function () {
        _super.prototype.setBulletRes.call(this);
        this.alpha = 0;
    };
    // 42 902  172 828
    Bullet303.prototype.playHitEffect = function (hit) {
        var _this = this;
        if (this.status != 2) {
            hit && this.damage();
            this.status = 2;
            if (this.target) {
                var boomeff_1 = ComponentMgr.getCustomMovieClip("bthiteffect303", null, 40, BattleBaseEffect);
                boomeff_1.anchorOffsetX = 150 / 2;
                boomeff_1.anchorOffsetY = 150 / 2;
                boomeff_1.setPosition(this.target.x, this.target.y);
                boomeff_1.setScale(this.target.getMonsterType() > 2 ? 0.6 : 0.4);
                boomeff_1.setEndCallBack(function () {
                    boomeff_1.dispose();
                    boomeff_1 = null;
                    _this.dispose();
                }, this);
                if (this.parent) {
                    this.parent.addChild(boomeff_1);
                }
                boomeff_1.playWithTime(1);
            }
        }
    };
    Bullet303.prototype.atk = function (mVoList) {
        var _this = this;
        _super.prototype.atk.call(this, mVoList);
        var line = ComponentMgr.getCustomMovieClip("atkeffect303", null, 40, BattleBaseEffect);
        line.anchorOffsetY = 90 / 2;
        line.scaleY = 0.4;
        if (this.parent) {
            this.parent.addChild(line);
        }
        var diffX = this.target.x - this.startPoint.x;
        var diffY = this.target.y - this.startPoint.y;
        var angle = Math.atan2(diffY, diffX) * 180 / Math.PI;
        line.rotation = angle;
        line.width = App.MathUtil.getDistance(this.startPoint, new egret.Point(this.target.x, this.target.y));
        line.x = this.startPoint.x;
        line.y = this.startPoint.y;
        line.setEndCallBack(function () {
            line.dispose();
            line = null;
            _this.dispose();
        }, this);
        line.playWithTime(1);
    };
    Bullet303.prototype.extraDamage = function () {
        var monstersList = this.diceData.isMe ? BattleStatus.meMonsterList : BattleStatus.targetMonsterList;
        var vo = this.mVoList[0];
        if (!vo.lost(this.diceData.isMe)) {
            var diceData = this.diceData;
            var buffData = { diceId: diceData.id + "_" + this.diceData.posStr + "_" + (this.diceData.isMe ? 1 : 2), keep: 0, cd: 0, isMe: diceData.isMe, atknum: 1, maxOverlap: BattleStatus.maxAtkNum };
            MonsterBuff.addBuff(buffData, vo);
        }
    };
    //可能有加血 +/-都有可能
    Bullet303.prototype.calDamageNum = function (monster) {
        var nmDmgData = this.nmDmgData;
        var damage = nmDmgData.dmg;
        var buffname = this.diceData.id + "_" + this.diceData.posStr + "_" + (this.diceData.isMe ? 1 : 2);
        var buff = monster.checkHasBuff(buffname);
        if (buff && buff.atknum) {
            var cfg = Config.DiceCfg.getCfgById(this.diceData.id);
            var pwadd = cfg.getPowerAtkByLv(this.diceData.pwlv);
            var maxnum = this.diceData.property3[1] * (this.diceData.initdamage + pwadd);
            damage = Math.min(buff.atknum * this.diceData.property3[0], maxnum);
        }
        var initInfo = Api.BattleVoApi.getInitInfo(this.diceData.isMe);
        if (this.diceData.checkIsKill(initInfo.uid) && monster && monster.getMonsterType() != 3 && !monster.isBoss()) {
            this.isKillByOne = true;
            damage = monster.getCurHp();
        }
        return damage;
    };
    Bullet303.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return Bullet303;
}(Bullet));
__reflect(Bullet303.prototype, "Bullet303");
//# sourceMappingURL=Bullet303.js.map