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
var Obstacle402 = (function (_super) {
    __extends(Obstacle402, _super);
    function Obstacle402() {
        var _this = _super.call(this) || this;
        _this._isspecial = false;
        return _this;
    }
    Obstacle402.prototype.init = function (diceData, pos, monsterdisline) {
        this.diceData = diceData;
        this.initData(diceData);
        var res = this.getRes();
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
        this.setScale(0.1);
    };
    Obstacle402.prototype.playPlaceEffect = function () {
        var _this = this;
        if (this.status != 2) {
            if (this.parent) {
                this.parent.setChildIndex(this, BattleStatus.obstacleZidx);
            }
            else {
                BattleStatus.scene.addChildAt(this, BattleStatus.obstacleZidx);
            }
            egret.Tween.get(this).to({ scaleX: 0.5, scaleY: 0.5 }, 500).call(function () {
                _this.status = 2;
                _this.birthTime = BattleStatus.battleLogicHasTickTime;
                egret.Tween.removeTweens(_this);
            }, this);
        }
    };
    Obstacle402.prototype.getRes = function () {
        this._isspecial = App.MathUtil.seededRandom(0, 1, BattleStatus.battleLogicHasTickTime / this.diceData.index) < this.diceData.property2;
        return "obstacle_" + this._diceId + "_" + (this._isspecial ? 2 : 1);
    };
    Obstacle402.prototype.initData = function (diceData) {
        this._diceId = diceData.id;
        this._keep = 0;
        this._dmg = this._isspecial ? 0 : diceData.damage;
        this._radius = this._isspecial ? this.diceData.property3[1] : this.diceData.property3[0];
        this._cd = 0;
    };
    Obstacle402.prototype.checkEnd = function () {
        return false;
    };
    Obstacle402.prototype.checkDamage = function () {
        var monstersList = this.diceData.isMe ? BattleStatus.meMonsterList : BattleStatus.targetMonsterList;
        var point = new egret.Point(this.x, this.y);
        var findmonsterDataList = DiceHelper.findRangMonster(this._lineDis, this._radius, this.diceData.isMe);
        var l = findmonsterDataList.length;
        for (var i = 0; i < l; i++) {
            var mData = findmonsterDataList[i];
            if (mData && !mData.lost(this.diceData.isMe)) {
                var monster = monstersList[mData.getName()];
                if (monster) {
                    var damage = this._isspecial ? (monster.getMaxHp() * this.diceData.property1) : this._dmg;
                    monster.beAtk({ hp: damage, isMe: this.diceData.isMe, crit: false, addStatus: "402_" + (this._isspecial ? 2 : 1) });
                    this.playAtkSound();
                }
            }
            if (i == l - 1) {
                this.dispose();
            }
        }
    };
    Obstacle402.prototype.dispose = function () {
        this._isspecial = false;
        _super.prototype.dispose.call(this);
    };
    return Obstacle402;
}(Obstacle));
__reflect(Obstacle402.prototype, "Obstacle402");
//# sourceMappingURL=Obstacle402.js.map