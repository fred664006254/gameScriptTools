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
var Obstacle403 = (function (_super) {
    __extends(Obstacle403, _super);
    function Obstacle403() {
        return _super.call(this) || this;
    }
    Obstacle403.prototype.init = function (diceData, pos, monsterdisline) {
        this.diceData = diceData;
        this.initData(diceData);
        var res = "obstacle_" + this._diceId;
        // this.initLoadRes(res);
        this.texture = ResMgr.getRes(res);
        this.width = 100;
        this.height = 100;
        this.anchorOffsetX = this.width * 0.5;
        this.anchorOffsetY = this.height * 0.5;
        this.setPosition(pos.x, pos.y);
        var posAllCfg = BattleStatus.getLimitPos();
        var posCfg = diceData.isMe ? posAllCfg.me : posAllCfg.target;
        var keys = Object.keys(posCfg);
        var l = keys.length - 1;
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
        this.status = 1;
        this._mvEt = BattleStatus.battleLogicHasTickTime + 30 * 10;
        this.setScale(40 / this.width);
        //this.rotation = App.MathUtil.seededRandom(0,360,BattleStatus.battleLogicHasTickTime/diceData.index);
    };
    Obstacle403.prototype.initData = function (diceData) {
        this._diceId = diceData.id;
        this._keep = diceData.property1 * 1000;
        this._radius = 50; //diceData.property3[0];
    };
    Obstacle403.prototype.playPlaceEffect = function () {
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
                egret.Tween.get(_this, { loop: true }).to({ rotation: 360 }, 2000);
                egret.Tween.get(_this, { loop: true }).to({ scaleX: 0.8, scaleY: 0.8 }, 1000).to({ scaleX: 1, scaleY: 1 }, 1000);
                _this.playAtkSound();
            }, this);
        }
    };
    Obstacle403.prototype.checkDamage = function () {
        var monstersList = this.diceData.isMe ? BattleStatus.meMonsterList : BattleStatus.targetMonsterList;
        var findmonsterDataList = DiceHelper.findRangMonster(this._lineDis, this._radius, this.diceData.isMe);
        var l = findmonsterDataList.length;
        var namearr = [];
        for (var i = 0; i < l; i++) {
            var mData = findmonsterDataList[i];
            if (!mData.lost(this.diceData.isMe)) {
                var monster = monstersList[mData.getName()];
                namearr.push(mData.getName());
                var buffData = { diceId: this.diceData.id, keep: 0, speed: this.diceData.property3[1], cd: 0, isMe: this.diceData.isMe }; //
                MonsterBuff.addBuff(buffData, mData);
            }
        }
        for (var i in monstersList) {
            var monster = monstersList[i];
            if (monster.checkHasBuff(this.diceData.id) && namearr.indexOf(i) == -1) {
                monster.removeBuff(this.diceData.id);
            }
        }
    };
    Obstacle403.prototype.dispose = function () {
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
    return Obstacle403;
}(Obstacle));
__reflect(Obstacle403.prototype, "Obstacle403");
//# sourceMappingURL=Obstacle403.js.map