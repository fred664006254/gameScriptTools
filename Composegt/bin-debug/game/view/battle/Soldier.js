/**
 * author shaoliang
 * date 2017/9/15
 * @class Soldier
 */
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
var SoldierArea;
(function (SoldierArea) {
    SoldierArea[SoldierArea["LEFT"] = 0] = "LEFT";
    SoldierArea[SoldierArea["RIGHT"] = 1] = "RIGHT";
})(SoldierArea || (SoldierArea = {}));
var SoldierStatus;
(function (SoldierStatus) {
    SoldierStatus[SoldierStatus["STANDBY"] = 1] = "STANDBY";
    SoldierStatus[SoldierStatus["RUNING"] = 2] = "RUNING";
    SoldierStatus[SoldierStatus["ATTACKING"] = 3] = "ATTACKING";
    SoldierStatus[SoldierStatus["GODIE"] = 4] = "GODIE";
})(SoldierStatus || (SoldierStatus = {}));
var Soldier = (function (_super) {
    __extends(Soldier, _super);
    function Soldier() {
        var _this = _super.call(this) || this;
        _this._runFrames = [];
        _this._deathFrames = [];
        _this._standByFrames = [];
        _this._attackFrames = [];
        /**
         * 帧频 毫秒
         */
        _this._frameRate = 70;
        _this._endFunc = null;
        /**
         * 我的攻击目标
         */
        _this.targetIndex = null;
        /**
         * 攻我的人们
         */
        _this.attackerTab = [];
        _this._slowDownValue = 0;
        return _this;
    }
    /**
     * 初始化
     * @param namePer 名称前缀
     */
    Soldier.prototype.init = function (namePer) {
        this._namePre = namePer;
        this._standByFrames = [this._namePre + "_standby"];
        this._deathFrames = [this._namePre + "_death"];
        this._myClip = ComponentManager.getCustomMovieClip();
        this._myClip.frameRate = this._frameRate;
        this._myClip.frameImages = this._standByFrames;
        this.addChild(this._myClip);
        this._myClip.playWithTime(1);
        var randFrame = App.MathUtil.getRandom(1, 6);
        for (var i = randFrame; i <= 6; i++) {
            this._runFrames.push(this._namePre + "_move_" + i);
        }
        for (var i = 1; i < randFrame; i++) {
            this._runFrames.push(this._namePre + "_move_" + i);
        }
        for (var i = 1; i <= 3; i++) {
            this._attackFrames.push(this._namePre + "_attack_" + i);
        }
    };
    Soldier.prototype.reset = function () {
        if (this._myClip.isPlaying == true) {
            this._myClip.stop();
        }
        this._myClip.setEndCallBack(null, null);
        egret.Tween.removeTweens(this);
    };
    /**
     * 跑向哪里
     * @param p:坐标
     */
    Soldier.prototype.run = function (p, f, o) {
        this.reset();
        this._myClip.frameImages = this._runFrames;
        this._myClip.playFrameRate = this._frameRate;
        this._myClip.playWithTime(0);
        this._myClip.name = "soldier_" + this.area + "_" + this.myIndex;
        this.myStatus = SoldierStatus.RUNING;
        var moveDis = App.MathUtil.getDistance(p, egret.Point.create(this.x, this.y));
        var moveTime = moveDis / this.speed * 1000 + 200;
        egret.Tween.get(this).to({ x: p.x, y: p.y }, moveTime).call(this.attack, this, [f, o]);
    };
    Soldier.prototype.playAttackEnd = function () {
        if (this._endFunc && this._endObj) {
            this._endFunc.apply(this._endObj, [this]);
        }
    };
    Soldier.prototype.attack = function (f, o) {
        this.reset();
        this._myClip.frameImages = this._attackFrames;
        this._myClip.playFrameRate = this._frameRate;
        this._myClip.goToAndPlay(0);
        this.curMeetIndex = this.lineNumber;
        this._endFunc = f;
        this._endObj = o;
        this._myClip.playWithTime(1);
        this._myClip.setEndCallBack(this.playAttackEnd, this);
        this.myStatus = SoldierStatus.ATTACKING;
    };
    Soldier.prototype.standBy = function () {
        this.reset();
        this._myClip.frameImages = [this._namePre + "_standby"];
        this._myClip.playFrameRate = this._frameRate;
        this._myClip.goToAndPlay(0);
        this._myClip.playWithTime(1);
        this.myStatus = SoldierStatus.STANDBY;
    };
    Soldier.prototype.goDie = function () {
        this.reset();
        this._myClip.frameImages = this._deathFrames;
        this._myClip.playFrameRate = this._frameRate;
        if (this.area == SoldierArea.LEFT) {
            this.x -= 20;
        }
        else {
            this.x += 20;
        }
        this._myClip.goToAndPlay(0);
        this._myClip.setEndCallBack(this.disappear, this);
        this._myClip.playWithTime(1);
        this.myStatus = SoldierStatus.GODIE;
    };
    //
    Soldier.prototype.disappear = function () {
        this._slowDownValue = 1.5;
        TimerManager.doTimer(30, 15, this.slowDownMove, this);
        egret.Tween.get(this._myClip).wait(500).to({ alpha: 0 }, 1000);
    };
    Soldier.prototype.slowDownMove = function () {
        if (this._slowDownValue > 0) {
            if (this.area == SoldierArea.LEFT) {
                this._myClip.x -= this._slowDownValue;
            }
            else {
                this._myClip.x += this._slowDownValue;
            }
        }
        this._slowDownValue -= 0.1;
    };
    Soldier.prototype.dispose = function () {
        this.reset();
        egret.Tween.removeTweens(this._myClip);
        this._myClip.dispose();
        this._myClip = null;
        this._namePre = null;
        this._runFrames.length = 0;
        this._deathFrames.length = 0;
        this._standByFrames.length = 0;
        this._attackFrames.length = 0;
        this._frameRate = null;
        this.myStatus = null;
        this.area = null;
        this.targetIndex = null;
        this.attackerTab.length = 0;
        this.myIndex = null;
        this._endFunc = null;
        this._endObj = null;
        this.curMeetIndex = null;
        this._slowDownValue = 0;
        _super.prototype.dispose.call(this);
    };
    return Soldier;
}(BaseDisplayObjectContainer));
__reflect(Soldier.prototype, "Soldier");
