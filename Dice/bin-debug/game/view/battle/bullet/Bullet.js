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
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet() {
        var _this = _super.call(this) || this;
        /**子弹状态 0待机状态攻击完后放到对象池，1子弹飞行中还未攻击到，2命中播放特效中 */
        _this.status = 0;
        _this.nmDmgData = null;
        _this.isKillByOne = false;
        _this._mvEt = 0;
        return _this;
    }
    Bullet.prototype.updateFrame = function (timeStamp) {
        var result = _super.prototype.updateFrame.call(this, timeStamp);
        if (this.texture) {
            this.anchorOffsetX = this.width * 0.5;
            this.anchorOffsetY = this.height * 0.5;
        }
        return result;
    };
    Bullet.prototype.init = function (diceData, stPos) {
        this.diceData = diceData;
        // diceData.property1
        this.setBulletRes();
        this.x = stPos.x;
        this.y = stPos.y;
        this.startPoint = new egret.Point(stPos.x, stPos.y);
    };
    Bullet.prototype.setBulletRes = function () {
        var icon = Config.DiceCfg.getStarByLv(String(this.diceData.id), this.diceData.star);
        this.texture = ResMgr.getRes(icon);
        // this.initLoadRes(icon);
        var scale = DiceScaleEnum.scale_41;
        this.width = this.width * scale;
        this.height = this.height * scale;
        this.anchorOffsetX = this.width * 0.5;
        this.anchorOffsetY = this.height * 0.5;
    };
    Bullet.prototype.playAtkSound = function () {
        if (this.diceData.isMe) {
            var name_1 = "effect_dice_" + this.diceData.id;
            if (RES.hasRes(name_1) && !Config.DiceCfg.hasSpecialSoundAtk(this.diceData.id)) {
                SoundMgr.playEffect(name_1);
            }
            else {
                name_1 = "effect_attack_" + App.MathUtil.getRandom(1, 4);
                SoundMgr.playEffect(name_1);
            }
            if (this.isKillByOne) {
                SoundMgr.playEffect("effect_dice_406");
            }
        }
    };
    Bullet.prototype.atk = function (mVoList) {
        // this.startTick();
        this.mVoList = mVoList;
        if (mVoList.length > 0) {
            var mVo = this.mVoList[0];
            var monstersList = mVo.isMe ? BattleStatus.meMonsterList : BattleStatus.targetMonsterList;
            this.target = monstersList[mVo.getName()];
            if (!this.target) {
                console.log("0001212");
            }
            this.nmDmgData = this.diceData.getDmgData();
        }
        this.status = 1;
        this._mvEt = BattleStatus.battleLogicHasTickTime + 300; //30*BattleStatus.minLogicFrame;
    };
    Bullet.prototype.damage = function () {
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
        if (((this.target && !lost) || (!this.target)) && this.diceData.checkExtDamage()) {
            this.extraDamage();
        }
    };
    //可能有加血 +/-都有可能
    Bullet.prototype.calDamageNum = function (monster) {
        var initInfo = Api.BattleVoApi.getInitInfo(this.diceData.isMe);
        var damage = this.nmDmgData.dmg;
        if (this.diceData.checkIsKill(initInfo.uid) && monster && monster.getMonsterType() != 3 && !monster.isBoss()) {
            this.isKillByOne = true;
            damage = monster.getCurHp();
        }
        return damage;
    };
    Bullet.prototype.extraDamage = function () {
    };
    Bullet.prototype.move = function (addT) {
        if ((this.target && this.target.lost(this.diceData.isMe)) || !this.target) {
            this.playHitEffect(false);
            return false;
        }
        var diffX = this.target.x - this.x;
        var diffY = this.target.y - this.y;
        var diffT = (this._mvEt - BattleStatus.battleLogicHasTickTime) / BattleStatus.minLogicFrame;
        if (diffT > 0) {
            this.x += diffX / diffT;
            this.y += diffY / diffT;
            if (diffT == 1) {
                this.playHitEffect(true);
            }
        }
        return true;
    };
    Bullet.prototype.checkTick = function () {
        return !!this.status;
    };
    /**
     * 命中效果或者怪物死了子弹爆炸
     * @param hit 是否攻击到了
     */
    Bullet.prototype.playHitEffect = function (hit) {
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
    Bullet.prototype.frameCount = function (effectKey) {
        var frameCount = 0;
        while (ResMgr.hasRes(effectKey + (frameCount + 1))) {
            frameCount++;
        }
        return frameCount;
    };
    Bullet.prototype.fastTick = function (addT) {
        switch (this.status) {
            case 1:
                this.move(addT);
                break;
            default:
                break;
        }
    };
    Bullet.prototype.reset = function () {
        if (this.diceData) {
            Bullet.removeBullet(this, this.diceData.id);
        }
        // TickMgr.removeFastTick(this.move,this);
        this.stop();
        // this.setEndCallBack(null,null);
        this.texture = null;
        this.width = this.height = NaN;
        this.status = 0;
        this.nmDmgData = null;
        this.diceData = null;
        this.target = null;
        this.mVoList.length = 0;
        this.startPoint = null;
        this.isKillByOne = false;
        this._mvEt = 0;
    };
    Bullet.prototype.dispose = function () {
        this.reset();
        _super.prototype.dispose.call(this);
    };
    Bullet.removeBullet = function (bullet, diceId) {
        var bulletname = Bullet.getBltCName(diceId);
        var arr = Bullet.bulletPool[bulletname];
        if (arr) {
            var idx = arr.indexOf(bullet);
            if (idx > -1) {
                arr.splice(idx, 1);
            }
        }
    };
    Bullet.createBullet = function (diceData, stPos, bulletname) {
        var l = Bullet.bulletPool.length;
        var bullet = null;
        if (!bulletname) {
            bulletname = Bullet.getBltCName(diceData.id);
        }
        // if (l<Bullet.maxNum)
        // {
        var cClass = egret.getDefinitionByName(bulletname);
        bullet = new cClass();
        // }
        // else
        // {
        //     bullet=Bullet.bulletPool.shift();
        //     bullet.reset();
        // }
        var arr = Bullet.bulletPool[bulletname];
        if (!arr) {
            arr = [];
            Bullet.bulletPool[bulletname] = arr;
        }
        arr.push(bullet);
        bullet.init(diceData, stPos);
        BattleStatus.scene.addToEffectLayer(bullet);
        return bullet;
    };
    Bullet.getBltCName = function (id) {
        var cName = "Bullet" + id;
        if (!egret.hasDefinition(cName)) {
            cName = "Bullet";
        }
        return cName;
    };
    Bullet.releaseAllBullet = function () {
        var bulletPoll = Bullet.bulletPool;
        for (var key in bulletPoll) {
            if (bulletPoll.hasOwnProperty(key)) {
                var bulletArr = bulletPoll[key];
                bulletArr.length = 0;
                delete bulletPoll[key];
            }
        }
    };
    Bullet.fastTick = function (addT) {
        var bulletPoll = Bullet.bulletPool;
        var battleview = BattleStatus.scene;
        var keys = Object.keys(bulletPoll);
        keys.sort(function (a, b) {
            var ta = Number(a.replace("Bullet", "")) || 0;
            var tb = Number(b.replace("Bullet", "")) || 0;
            return ta - tb;
        });
        var kl = keys.length;
        for (var k = 0; k < kl; k++) {
            var key = keys[k];
            if (bulletPoll.hasOwnProperty(key)) {
                var bullets = bulletPoll[key];
                var l = bullets.length;
                for (var i = 0; i < l; i++) {
                    var bullet = bullets[i];
                    if (battleview && battleview.isInRound()) {
                        if (bullet) {
                            bullet.dispose();
                            bullet = null;
                        }
                    }
                    else {
                        if (bullet && bullet.checkTick()) {
                            bullet.fastTick(addT);
                        }
                    }
                }
            }
        }
    };
    Bullet.bulletPool = {};
    Bullet.maxNum = 50;
    return Bullet;
}(BattleBaseEffect));
__reflect(Bullet.prototype, "Bullet");
//# sourceMappingURL=Bullet.js.map