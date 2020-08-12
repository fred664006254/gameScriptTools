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
var Obstacle308 = (function (_super) {
    __extends(Obstacle308, _super);
    function Obstacle308() {
        return _super.call(this) || this;
    }
    Obstacle308.prototype.initData = function (diceData) {
        this._diceId = diceData.id;
        this._keep = diceData.property2 * 1000;
        this._dmg = diceData.property1;
        this._radius = diceData.property3[0];
        this._cd = diceData.property3[1] * 1000;
    };
    Obstacle308.prototype.init = function (diceData, pos, monsterdisline) {
        this.diceData = diceData;
        this.initData(diceData);
        var res = "obstacle_" + this._diceId + "1";
        // this.initLoadRes(res);
        this.texture = ResMgr.getRes(res);
        this.width = 70;
        this.height = 70;
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
        this.status = 1;
        this._mvEt = BattleStatus.battleLogicHasTickTime + 30 * 10;
        this._endPos.x = pos.x;
        this._endPos.y = pos.y;
        this.setScale(0);
        this.playPlaceEffect();
    };
    Obstacle308.prototype.playPlaceEffect = function () {
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
            egret.Tween.get(this).to({ scaleX: 2, scaleY: 2 }, 100).call(function () {
                egret.Tween.removeTweens(_this);
                _this.playAtkSound();
                var useDid = _this.diceData.id;
                var effectKey = "obstacle_" + useDid;
                // if((!hit)||(!ResMgr.hasRes(effectKey+"1")))
                // {
                //     effectKey="bthiteffect";
                // }
                // else
                // {
                //     // this.setScale(4);
                // }
                var frameCount = _this.frameCount(effectKey);
                var resArr = [];
                for (var i = 1; i <= frameCount; i++) {
                    resArr.push(effectKey + i);
                }
                _this.frameImages = resArr;
                _this.playFrameRate = 70;
                // this.playFrameRate
                // this.setEndCallBack(this.dispose,this);
                _this.texture = null;
                _this.width = _this.height = NaN;
                _this.playWithTime(-1);
            }, this);
        }
    };
    Obstacle308.prototype.frameCount = function (effectKey) {
        var frameCount = 0;
        while (ResMgr.hasRes(effectKey + (frameCount + 1))) {
            frameCount++;
        }
        return frameCount;
    };
    Obstacle308.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    Obstacle308.prototype.checkDamage = function () {
        if (BattleStatus.checkCdDoTime(this._cd, this.birthTime)) {
            var monstersList = this.diceData.isMe ? BattleStatus.meMonsterList : BattleStatus.targetMonsterList;
            var point = new egret.Point(this.x, this.y);
            // let findmonsterDataList = [];
            // let keys = Object.keys(monstersList);
            // for(let i = 0; i < keys.length; ++ i){
            //     const monster = monstersList[keys[i]];
            //     let monspoint = new egret.Point(monster.x, monster.y);
            //     if(DiceHelper.checkSelfIsInPointRange(point, monspoint, this._radius) && !monster.isDie() && !monster.lost()){
            //         monster.beAtk({hp:this._dmg,isMe:this.diceData.isMe,crit:false});
            //     }
            // }
            var findmonsterDataList = DiceHelper.findRangMonster(this._lineDis, this._radius, this.diceData.isMe);
            var l = findmonsterDataList.length;
            for (var i = 0; i < l; i++) {
                var mData = findmonsterDataList[i];
                if (!mData.lost(this.diceData.isMe)) {
                    var monster = monstersList[mData.getName()];
                    monster.beAtk({ hp: this._dmg, isMe: this.diceData.isMe, crit: false });
                }
            }
        }
    };
    return Obstacle308;
}(Obstacle));
__reflect(Obstacle308.prototype, "Obstacle308");
//# sourceMappingURL=Obstacle308.js.map