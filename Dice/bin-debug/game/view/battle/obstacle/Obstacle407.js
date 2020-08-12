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
var Obstacle407 = (function (_super) {
    __extends(Obstacle407, _super);
    function Obstacle407() {
        return _super.call(this) || this;
    }
    Obstacle407.prototype.init = function (diceData, pos, monsterdisline) {
        this.diceData = diceData;
        this.initData(diceData);
        var res = this.getRes();
        this.initLoadRes(res);
        this.width = 70;
        this.height = 70;
        this.anchorOffsetX = this.width * 0.5;
        this.anchorOffsetY = this.height * 0.5;
        this.setPosition(pos.x, pos.y);
        var posAllCfg = BattleStatus.getLimitPos();
        var posCfg = diceData.isMe ? posAllCfg.me : posAllCfg.target;
        var keys = Object.keys(posCfg);
        var l = (keys.length - 1);
        var idxNum = App.MathUtil.seededRandom(0, l, BattleStatus.battleLogicHasTickTime / (diceData.index));
        var idx = Math.floor(idxNum);
        var stPos = posCfg["pos" + idx];
        var edPos = posCfg["pos" + (idx + 1)];
        var disScale = idxNum % 1;
        var tPos = { x: stPos.x, y: stPos.y };
        var diffX = edPos.x - stPos.x;
        var diffY = edPos.y - stPos.y;
        if (diffX == 0) {
            tPos.y += diffY * disScale;
        }
        else {
            tPos.x += diffX * disScale;
        }
        this._lineDis = 0;
        for (var i = 1; i <= idx; i++) {
            var pos_1 = posCfg["pos" + i];
            var lstPos = posCfg["pos" + (i - 1)];
            this._lineDis += Math.abs(pos_1.x - lstPos.x) + Math.abs(pos_1.y - lstPos.y);
        }
        if (monsterdisline) {
            this._lineDis = monsterdisline;
        }
        else {
            this._lineDis += Math.abs(diffX * disScale) + Math.abs(diffY * disScale);
        }
        this._endPos.x = tPos.x;
        this._endPos.y = tPos.y;
        this.setScale(40 / this.width);
        this.status = 1;
        this._mvEt = BattleStatus.battleLogicHasTickTime + 30 * 10;
    };
    Obstacle407.prototype.initData = function (diceData) {
        this._diceId = diceData.id;
        this._keep = diceData.property1 * 1000;
        this._dmg = 0;
        this._radius = diceData.property3[0];
        this._cd = 0;
    };
    Obstacle407.prototype.playPlaceEffect = function () {
        var _this = this;
        if (this.status != 2) {
            this.status = 2;
            this.birthTime = BattleStatus.battleLogicHasTickTime;
            if (this.parent) {
                this.parent.setChildIndex(this, BattleStatus.obstacleZidx);
            }
            else {
                BattleStatus.scene.addChildAt(this, BattleStatus.obstacleZidx);
            }
            egret.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, 100).call(function () {
                egret.Tween.removeTweens(_this);
                _this.playAtkSound();
            }, this);
        }
    };
    Obstacle407.prototype.checkDamage = function () {
        var monstersList = this.diceData.isMe ? BattleStatus.meMonsterList : BattleStatus.targetMonsterList;
        var findmonsterDataList = DiceHelper.findRangMonster(this._lineDis, this._radius, this.diceData.isMe);
        var l = findmonsterDataList.length;
        for (var i = 0; i < l; i++) {
            var mData = findmonsterDataList[i];
            if (!mData.lost(this.diceData.isMe)) {
                var monster = monstersList[mData.getName()];
                var buffData = { diceId: "407", keep: 0, speed: 1, cd: 0, isMe: this.diceData.isMe }; //this._keep
                MonsterBuff.addBuff(buffData, mData);
            }
        }
        // for(){
        // }
    };
    Obstacle407.prototype.dispose = function () {
        var monstersList = this.diceData.isMe ? BattleStatus.meMonsterList : BattleStatus.targetMonsterList;
        var keys = Object.keys(monstersList);
        var l = keys.length;
        for (var i = 0; i < l; i++) {
            var mvo = monstersList[keys[i]];
            if (mvo.checkHasBuff(this.diceData.id)) {
                mvo.removeBuff(this.diceData.id);
            }
        }
        _super.prototype.dispose.call(this);
    };
    return Obstacle407;
}(Obstacle));
__reflect(Obstacle407.prototype, "Obstacle407");
//# sourceMappingURL=Obstacle407.js.map