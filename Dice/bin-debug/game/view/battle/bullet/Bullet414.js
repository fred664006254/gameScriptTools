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
 * --原名称：枪械 现在：乱舞
 * 1-6正常 7星直接变狙击 秒百分比血量
*/
var Bullet414 = (function (_super) {
    __extends(Bullet414, _super);
    function Bullet414() {
        return _super.call(this) || this;
    }
    Bullet414.prototype.init = function (diceData, stPos) {
        this.diceData = diceData;
        // diceData.property1
        this.setBulletRes();
        this.x = stPos.x;
        this.y = stPos.y;
        this.startPoint = new egret.Point(stPos.x, stPos.y - 70);
    };
    Bullet414.prototype.atk = function (mVoList) {
        // this.startTick();
        _super.prototype.atk.call(this, mVoList);
        var diffX = this.target.x - this.startPoint.x;
        var diffY = this.target.y - this.startPoint.y;
        var angle = Math.atan2(diffY, diffX) * 180 / Math.PI;
        this.rotation = angle + 90;
        // if(this.diceData.checkMaxStar()){
        //     let line = ComponentMgr.getCustomMovieClip(`atkeffect303`, null, 40,BattleBaseEffect); 
        //     line.anchorOffsetY = 90 / 2;
        //     line.scaleY = 0.4;
        //     if(this.parent){
        //         this.parent.addChild(line);
        //     }
        //     line.rotation = angle;
        //     line.width = App.MathUtil.getDistance(this.startPoint, new egret.Point(this.target.x, this.target.y));
        //     line.x = this.startPoint.x;
        //     line.y = this.startPoint.y;
        //     line.setEndCallBack(()=>{
        //         line.dispose();
        //         line = null;
        //         this.dispose();
        //     }, this);
        //     line.playWithTime(1);
        // }
    };
    Bullet414.prototype.setBulletRes = function () {
        var icon = Config.DiceCfg.getStarByLv(String(this.diceData.id), this.diceData.star);
        var scale = DiceScaleEnum.scale_41;
        if (this.diceData.checkMaxStar()) {
            icon = "atkeffect414_3";
            scale = 1;
        }
        this.texture = ResMgr.getRes(icon);
        // this.initLoadRes(icon);
        this.width = this.width * scale;
        this.height = this.height * scale;
        this.anchorOffsetX = this.width * 0.5;
        this.anchorOffsetY = this.height * 0.5;
    };
    /**
    * 命中效果或者怪物死了子弹爆炸
    * @param hit 是否攻击到了
    */
    Bullet414.prototype.playHitEffect = function (hit) {
        if (this.status != 2) {
            hit && this.damage();
            this.status = 2;
            var useDid = this.diceData.id;
            var effectKey = this.diceData.checkMaxStar() ? "bthiteffect414_3" : ("bthiteffect" + useDid);
            if ((!hit) || (!ResMgr.hasRes(effectKey + "1"))) {
                effectKey = "bthiteffect";
            }
            if (this.target) {
                var diffX = this.target.x - this.startPoint.x;
                var diffY = this.target.y - this.startPoint.y;
                var angle = Math.atan2(diffY, diffX) * 180 / Math.PI;
                this.rotation = angle + 90;
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
            }
            else {
                this.dispose();
            }
        }
    };
    //7星直接变狙击 小怪就秒，boss百分比血
    Bullet414.prototype.calDamageNum = function (monster) {
        var nmDmgData = this.nmDmgData;
        var num = nmDmgData.dmg;
        if (this.diceData.checkMaxStar() && monster) {
            var hp = monster.getMaxHp();
            num = monster.getMonsterType() >= 3 ? (hp * this.diceData.property1) : (hp);
        }
        var initInfo = Api.BattleVoApi.getInitInfo(this.diceData.isMe);
        if (this.diceData.checkIsKill(initInfo.uid) && monster && monster.getMonsterType() != 3 && !monster.isBoss()) {
            this.isKillByOne = true;
            num = monster.getCurHp();
        }
        return num;
    };
    Bullet414.prototype.playAtkSound = function () {
        if (this.diceData.isMe) {
            var id = 2;
            if (this.diceData.checkMaxStar()) {
                id = 3;
            }
            else if (this.diceData.star == 1) {
                id = 1;
            }
            var name_1 = "effect_dice_414_" + id;
            if (RES.hasRes(name_1)) {
                SoundMgr.playEffect(name_1);
            }
        }
    };
    Bullet414.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return Bullet414;
}(Bullet));
__reflect(Bullet414.prototype, "Bullet414");
//# sourceMappingURL=Bullet414.js.map