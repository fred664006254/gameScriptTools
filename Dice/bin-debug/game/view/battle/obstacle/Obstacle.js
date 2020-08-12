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
var Obstacle = (function (_super) {
    __extends(Obstacle, _super);
    function Obstacle() {
        var _this = _super.call(this) || this;
        _this.birthTime = 0;
        _this._keep = 0;
        _this._dmg = 0;
        _this._diceId = '';
        _this._radius = 0;
        _this._cd = 0;
        _this._endPos = { x: 0, y: 0 };
        /**陷阱状态 0待机状态攻击完后放到对象池，1飞行中还未攻击到，2飞行到指定位置放置 */
        _this.status = 0;
        _this._lineDis = 0;
        _this._mvEt = 0;
        return _this;
    }
    Obstacle.prototype.getIsMe = function () {
        return this.diceData.isMe;
    };
    Obstacle.prototype.init = function (diceData, pos, monsterdisline) {
        this.diceData = diceData;
        this.initData(diceData);
        var res = this.getRes();
        // this.initLoadRes(res);
        this.texture = ResMgr.getRes(res);
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
    Obstacle.prototype.getRes = function () {
        return "obstacle_" + this._diceId;
    };
    Obstacle.prototype.initData = function (diceData) {
        this._diceId = diceData.id;
        this._keep = diceData.property2 * 1000;
        this._dmg = diceData.property1;
    };
    Obstacle.prototype.playAtkSound = function () {
        if (this.diceData.isMe) {
            var name_1 = "effect_dice_" + this._diceId;
            if (RES.hasRes(name_1)) {
                SoundMgr.playEffect(name_1);
            }
        }
    };
    Obstacle.prototype.fastTick = function (addT) {
        var battleview = BattleStatus.scene;
        switch (this.status) {
            case 1:
                this.move(addT);
                break;
            case 2:
                if (this.checkEnd()) {
                    this.dispose();
                }
                else {
                    if (battleview && battleview.isInRound()) {
                    }
                    else {
                        this.checkDamage();
                    }
                }
                break;
            default:
                break;
        }
    };
    Obstacle.prototype.move = function (addT) {
        if (this.checkEnd()) {
        }
        else {
            var diffX = this._endPos.x - this.x;
            var diffY = this._endPos.y - this.y;
            var diffT = (this._mvEt - BattleStatus.battleLogicHasTickTime) / BattleStatus.minLogicFrame;
            if (diffT > 0) {
                this.x += diffX / diffT;
                this.y += diffY / diffT;
                if (diffT == 1) {
                    this.playPlaceEffect();
                }
            }
        }
        return true;
    };
    /**
     * 命中效果或者怪物死了子弹爆炸
     * @param hit 是否攻击到了
     */
    Obstacle.prototype.playPlaceEffect = function () {
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
            }, this);
        }
    };
    Obstacle.prototype.checkDamage = function () {
    };
    Obstacle.prototype.checkEnd = function () {
        if (this.birthTime > 0 && this._keep > 0) {
            return BattleStatus.battleLogicHasTickTime > this.birthTime + this._keep;
        }
        return false;
    };
    Obstacle.prototype.updateFrame = function (timeStamp) {
        var result = _super.prototype.updateFrame.call(this, timeStamp);
        if (this.texture) {
            this.anchorOffsetX = this.width * 0.5;
            this.anchorOffsetY = this.height * 0.5;
        }
        return result;
    };
    Obstacle.prototype.dispose = function () {
        Obstacle.removeObstacle(this, this._diceId);
        this.status = 0;
        this._endPos = { x: 0, y: 0 };
        this.diceData = null;
        this._diceId = '';
        this._mvEt = 0;
        _super.prototype.dispose.call(this);
    };
    Obstacle.removeObstacle = function (obstacle, diceId) {
        var obstaclename = Obstacle.getBltCName(diceId);
        var arr = Obstacle.obstaclePool[obstaclename];
        if (arr) {
            var idx = arr.indexOf(obstacle);
            if (idx > -1) {
                arr.splice(idx, 1);
            }
        }
    };
    Obstacle.createObstacle = function (diceData, stPos, obstaclename, monsterdisline, noAdd) {
        var obstacle = null;
        if (!obstaclename) {
            obstaclename = Obstacle.getBltCName(diceData.id);
        }
        var cClass = egret.getDefinitionByName(obstaclename);
        obstacle = new cClass();
        var arr = Obstacle.obstaclePool[obstaclename];
        if (!arr) {
            arr = [];
            Obstacle.obstaclePool[obstaclename] = arr;
        }
        arr.push(obstacle);
        obstacle.init(diceData, stPos, monsterdisline);
        if (!noAdd) {
            if (!obstacle.parent) {
                BattleStatus.scene.addChild(obstacle);
            }
            else {
                BattleStatus.scene.setChildIndex(obstacle, BattleStatus.scene.numChildren);
            }
        }
        return obstacle;
    };
    Obstacle.getBltCName = function (id) {
        var cName = "Obstacle" + id;
        if (!egret.hasDefinition(cName)) {
            cName = "Obstacle";
        }
        return cName;
    };
    Obstacle.releaseAllObstacle = function () {
        var obstacletPoll = Obstacle.obstaclePool;
        for (var key in obstacletPoll) {
            if (obstacletPoll.hasOwnProperty(key)) {
                var bulletArr = obstacletPoll[key];
                bulletArr.length = 0;
                delete obstacletPoll[key];
            }
        }
    };
    Obstacle.releaseObstacleInRange = function (center, radis, isMe) {
        var limitData = BattleStatus.getLimitPos();
        var posData = isMe ? limitData.me : limitData.target;
        var obstacletPoll = Obstacle.obstaclePool;
        for (var key in obstacletPoll) {
            if (obstacletPoll.hasOwnProperty(key)) {
                var bulletArr = obstacletPoll[key];
                for (var i = bulletArr.length - 1; i >= 0; --i) {
                    var unit = bulletArr[i];
                    if (unit) {
                        if (!(unit instanceof Obstacle413) && DiceHelper.checkSelfIsInPointRange(new egret.Point(unit.x, unit.y), center, radis)) {
                            //协助模式下 清掉公用路线上的障碍，不能请对面场上的障碍物
                            if (BattleStatus.battleType == 2) {
                                var flag = unit.y == posData.pos1.y || (isMe ? (unit.y <= posData.pos0.y && unit.y > posData.pos1.y) : (unit.y >= posData.pos0.y && unit.y < posData.pos1.y));
                                if (flag) {
                                    unit.dispose();
                                    unit = null;
                                }
                            }
                            else {
                                if (isMe == unit.getIsMe()) {
                                    unit.dispose();
                                    unit = null;
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    Obstacle.fastTick = function (addT) {
        var obstaclePool = Obstacle.obstaclePool;
        var keys = Object.keys(obstaclePool);
        var battleview = BattleStatus.scene;
        keys.sort(function (a, b) {
            var ta = Number(a.replace("Obstacle", "")) || 0;
            var tb = Number(b.replace("Obstacle", "")) || 0;
            return ta - tb;
        });
        var kl = keys.length;
        for (var k = 0; k < kl; k++) {
            var key = keys[k];
            if (obstaclePool.hasOwnProperty(key)) {
                var obstacles = obstaclePool[key];
                var l = obstacles.length;
                for (var i = l - 1; i >= 0; i--) {
                    var bullet = obstacles[i];
                    if (bullet) {
                        bullet.fastTick(addT);
                    }
                    else {
                        App.LogUtil.log(i);
                    }
                }
            }
        }
    };
    Obstacle.obstaclePool = {};
    return Obstacle;
}(BattleBaseEffect));
__reflect(Obstacle.prototype, "Obstacle");
//# sourceMappingURL=Obstacle.js.map