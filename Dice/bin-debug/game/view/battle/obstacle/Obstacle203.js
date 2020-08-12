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
var Obstacle203 = (function (_super) {
    __extends(Obstacle203, _super);
    function Obstacle203() {
        return _super.call(this) || this;
    }
    Obstacle203.prototype.initData = function (diceData) {
        this._diceId = diceData.id;
        this._keep = diceData.property2 * 1000;
        this._dmg = diceData.property1;
        this._radius = diceData.property3[0];
        this._cd = diceData.property3[1] * 1000;
    };
    Obstacle203.prototype.init = function (diceData, pos, monsterdisline) {
        this.diceData = diceData;
        this.initData(diceData);
        var res = "obstacle_" + this._diceId + "1";
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
    };
    Obstacle203.prototype.playPlaceEffect = function () {
        var _this = this;
        if (this.status != 2) {
            if (this.parent) {
                this.parent.setChildIndex(this, BattleStatus.obstacleZidx);
            }
            else {
                BattleStatus.scene.addChildAt(this, BattleStatus.obstacleZidx);
            }
            this.status = 2;
            this.birthTime = BattleStatus.battleLogicHasTickTime;
            egret.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, 100).call(function () {
                egret.Tween.removeTweens(_this);
                _this.playAtkSound();
                var useDid = _this.diceData.id;
                var effectKey = "obstacle_" + useDid;
                var frameCount = _this.frameCount(effectKey);
                var resArr = [];
                for (var i = 1; i <= frameCount; i++) {
                    resArr.push(effectKey + i);
                }
                _this.frameImages = resArr;
                _this.playFrameRate = 140;
                _this.texture = null;
                _this.width = _this.height = NaN;
                _this.playWithTime(-1);
            }, this);
        }
    };
    Obstacle203.prototype.frameCount = function (effectKey) {
        var frameCount = 0;
        while (ResMgr.hasRes(effectKey + (frameCount + 1))) {
            frameCount++;
        }
        return frameCount;
    };
    Obstacle203.prototype.dispose = function () {
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
    Obstacle203.prototype.checkDamage = function () {
        if (BattleStatus.checkCdDoTime(this._cd, this.birthTime)) {
            var monstersList = this.diceData.isMe ? BattleStatus.meMonsterList : BattleStatus.targetMonsterList;
            var findmonsterDataList = DiceHelper.findRangMonster(this._lineDis, this._radius, this.diceData.isMe);
            var l = findmonsterDataList.length;
            for (var i = 0; i < l; i++) {
                var mData = findmonsterDataList[i];
                if (!mData.lost(this.diceData.isMe)) {
                    var monster = monstersList[mData.getName()];
                    var damage = this._dmg;
                    var initInfo = Api.BattleVoApi.getInitInfo(this.diceData.isMe);
                    var isCrit = false;
                    if (this.diceData.checkCrit(initInfo.uid)) {
                        isCrit = true;
                        var addCritScale = Math.max(0, (initInfo.crivalue - 100) / 100);
                        damage = this._dmg * (1 + addCritScale);
                        // App.LogUtil.log(initInfo.uid,"暴击",addCritScale,BattleStatus.battleLogicHasTickTime);
                    }
                    monster.beAtk({ hp: damage, isMe: this.diceData.isMe, crit: isCrit });
                }
            }
        }
    };
    return Obstacle203;
}(Obstacle));
__reflect(Obstacle203.prototype, "Obstacle203");
//# sourceMappingURL=Obstacle203.js.map