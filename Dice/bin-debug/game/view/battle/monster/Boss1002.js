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
 * 沉默王----每間隔7秒隨機封鎖任一骰子，該骰子喪失能力    参数：{ X 秒，沉默Y个骰子 }
*/
var Boss1002 = (function (_super) {
    __extends(Boss1002, _super);
    function Boss1002(data, isMe, isAdd) {
        var _this = _super.call(this, data, isMe, isAdd) || this;
        _this._arr = [];
        return _this;
    }
    Boss1002.prototype.getMonsterType = function () {
        return 4;
    };
    Boss1002.prototype.getMonsterImg = function () {
        return Config.BattleCfg.getMonsterIcon(3);
    };
    Boss1002.prototype.checkAtk = function () {
        var _this = this;
        if (BattleStatus.scene) {
            var isMe = this._data.isMe;
            var data = this._data;
            var tmpY = this.y;
            egret.Tween.get(this).wait(3 * BattleStatus.timeparam).to({ y: tmpY - 15 }, 3 * BattleStatus.timeparam).to({ y: tmpY }, 3 * BattleStatus.timeparam).call(function () {
                egret.Tween.removeTweens(_this);
            }, this);
            var clip_1 = ComponentMgr.getCustomMovieClip("bosseff1002", null, 70);
            clip_1.anchorOffsetX = 240 / 2;
            clip_1.anchorOffsetY = 240 / 2;
            this.addChild(clip_1);
            clip_1.playWithTime(1);
            this.playAtkSound("effect_boss_1002");
            clip_1.setEndCallBack(function () {
                clip_1.dispose();
                clip_1 = null;
                _this._isSkill = false;
            }, this);
            //每間隔7秒隨機封鎖任一骰子，該骰子喪失能力    参数：{ X 秒，沉默Y个骰子 }
            var effectnum = data.effectNum;
            var dicelist = BattleStatus.scene.getDiceList(isMe);
            var keys = Object.keys(dicelist);
            for (var i = 0; i < this._arr.length; ++i) {
                keys.splice(keys.indexOf(this._arr[i]), 1);
            }
            var selectarr = [];
            var loopnum = Math.min(effectnum, keys.length);
            while (loopnum > 0 && selectarr.length < loopnum) {
                var randomvalue = Math.floor(App.MathUtil.seededRandom(0, keys.length, BattleStatus.battleLogicHasTickTime + (selectarr.length * 100)));
                selectarr.push(keys[randomvalue]);
                keys.splice(keys.indexOf(keys[randomvalue]), 1);
            }
            this._arr = this._arr.concat(selectarr);
            BattleStatus.scene.setBossSkill("1002", BattleStatus.battleLogicHasTickTime + (Math.ceil(10 * 70 / BattleStatus.minLogicFrame) * BattleStatus.minLogicFrame), { isMe: this._data.isMe, arr: selectarr, boss: this });
        }
    };
    Boss1002.prototype.dispose = function () {
        if (BattleStatus.scene) {
            var isMe = this._data.isMe;
            BattleStatus.scene.removeSilence(isMe);
        }
        _super.prototype.dispose.call(this);
    };
    return Boss1002;
}(BossMonster));
__reflect(Boss1002.prototype, "Boss1002");
//# sourceMappingURL=Boss1002.js.map