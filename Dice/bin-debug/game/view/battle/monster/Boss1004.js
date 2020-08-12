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
 * 每次間隔10秒將所有骰子任意轉換為其他骰子（场上各个骰子的点数不会变，但会被随机变换类型以及摆放位置）    参数：{ X 秒}
*/
var Boss1004 = (function (_super) {
    __extends(Boss1004, _super);
    function Boss1004(data, isMe, isAdd) {
        return _super.call(this, data, isMe, isAdd) || this;
    }
    Boss1004.prototype.getMonsterType = function () {
        return 4;
    };
    Boss1004.prototype.getMonsterImg = function () {
        return Config.BattleCfg.getMonsterIcon(3);
    };
    Boss1004.prototype.checkAtk = function () {
        var _this = this;
        if (BattleStatus.scene) {
            var isMe = this._data.isMe;
            var data = this._data;
            var tmpY = this.y;
            var img_1 = BaseLoadBitmap.create("boss1004hurt");
            img_1.width = 118;
            img_1.height = 62;
            img_1.anchorOffsetX = 118 / 2;
            img_1.anchorOffsetY = 62 / 2;
            this.addChildAt(img_1, 0);
            img_1.alpha = 0;
            egret.Tween.get(this).wait(3 * BattleStatus.timeparam).to({ y: tmpY - 15 }, 3 * BattleStatus.timeparam).to({ y: tmpY }, 3 * BattleStatus.timeparam).call(function () {
                img_1.alpha = 1;
            }, this).wait(200).call(function () {
                img_1.alpha = 0;
                img_1.dispose();
                img_1 = null;
                egret.Tween.removeTweens(_this);
            }, this);
            var clip_1 = ComponentMgr.getCustomMovieClip("bosseff1004", null, 70);
            clip_1.anchorOffsetX = 228 / 2;
            clip_1.anchorOffsetY = 202 / 2;
            this.addChild(clip_1);
            clip_1.playWithTime(1);
            this.playAtkSound("effect_boss_1004");
            clip_1.setEndCallBack(function () {
                clip_1.dispose();
                clip_1 = null;
                _this._isSkill = false;
            }, this);
            BattleStatus.scene.setBossSkill("1004", BattleStatus.battleLogicHasTickTime + (Math.ceil(9 * BattleStatus.timeparam / BattleStatus.minLogicFrame) * BattleStatus.minLogicFrame), { isMe: this._data.isMe, boss: this });
        }
    };
    Boss1004.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return Boss1004;
}(BossMonster));
__reflect(Boss1004.prototype, "Boss1004");
//# sourceMappingURL=Boss1004.js.map