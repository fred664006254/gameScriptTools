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
var BaseLoadDragonBones = (function (_super) {
    __extends(BaseLoadDragonBones, _super);
    function BaseLoadDragonBones(dragonBonesName, playTimes, idle, loadCompleteCallBack, loadCompleteCallBackThisObj) {
        if (idle === void 0) { idle = "idle"; }
        var _this = _super.call(this) || this;
        _this._isLoaded = false;
        _this._isInit = false;
        _this._isStop = false;
        _this._playTimes = 0;
        _this._eventDeal = {};
        _this.addEvent = '';
        _this._loadCompleteCallData = null;
        _this._isRemoveStageStop = false;
        _this.idle = 'idle';
        _this.anchor = false;
        _this.anchorInfo = null;
        _this._dragonBonesName = dragonBonesName;
        if (playTimes) {
            _this._playTimes = playTimes;
        }
        else {
            _this._playTimes = 0;
        }
        _this.idle = idle;
        _this.addEvent = '';
        if (loadCompleteCallBack) {
            _this._loadCompleteCallData = { call: loadCompleteCallBack, callObj: loadCompleteCallBackThisObj };
        }
        _this.init();
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addToStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.removeToStage, _this);
        return _this;
    }
    BaseLoadDragonBones.prototype.addToStage = function () {
        if (this._isRemoveStageStop) {
            this._isRemoveStageStop = false;
            this.resume();
        }
    };
    BaseLoadDragonBones.prototype.removeToStage = function () {
        if (this._playTimes == 0 && this._isStop == false && this._isInit) {
            this._isRemoveStageStop = true;
            this.stop();
        }
    };
    BaseLoadDragonBones.prototype.init = function () {
        this._isInit = true;
        this.loadRes();
    };
    BaseLoadDragonBones.prototype.getBonesResArr = function () {
        return [this._dragonBonesName + "_ske", this._dragonBonesName + "_tex_json", this._dragonBonesName + "_tex_png"];
    };
    BaseLoadDragonBones.prototype.loadRes = function () {
        this._groupName = ResMgr.loadResources(this.getBonesResArr(), null, this.dailyLoadComplete, null, this);
    };
    BaseLoadDragonBones.prototype.setIdle = function (str) {
        this.idle = str;
    };
    BaseLoadDragonBones.prototype.dailyLoadComplete = function () {
        egret.callLater(this.loadComplete, this);
    };
    BaseLoadDragonBones.prototype.loadComplete = function () {
        if (this._isInit) {
            this._isLoaded = true;
            this._dragonBones = App.DragonBonesUtil.getDragonBones(this._dragonBonesName);
            if (this._dragonBones == null) {
                this._isLoaded = false;
                return;
            }
            if (!BaseLoadDragonBones.cacheDic[this._dragonBonesName]) {
                BaseLoadDragonBones.cacheDic[this._dragonBonesName] = 1;
            }
            else {
                BaseLoadDragonBones.cacheDic[this._dragonBonesName]++;
            }
            this.addChild(this._dragonBones);
            if (this.addEvent && this.addEvent != '') {
                for (var i in this._eventDeal) {
                    var unit = this._eventDeal[i];
                    if (unit && this._dragonBones) {
                        this._dragonBones.addEventListener(i, unit.func, unit.obj);
                    }
                }
                // let evtObj = this._eventDeal[this.addEvent]
                // this._dragonBones.addEventListener(this.addEvent, evtObj.func, evtObj.obj);
                // this.addEvent = '';
            }
            if (this.anchor) {
                this._dragonBones.anchorOffsetX = this.anchorInfo.x;
                this._dragonBones.anchorOffsetY = this.anchorInfo.y;
            }
            if (this._isStop == false) {
                this._dragonBones.animation.play(this.idle, this._playTimes);
            }
            if (this._loadCompleteCallData) {
                this._loadCompleteCallData.call.call(this._loadCompleteCallData.callObj);
            }
        }
        else {
            if (this._groupName) {
                ResMgr.destroyRes(this._groupName);
                this._groupName = null;
            }
        }
    };
    /**
     * 停止播放骨骼动画
     */
    BaseLoadDragonBones.prototype.stop = function () {
        if (this._isInit) {
            this._isStop = true;
            if (this._dragonBones && this._dragonBones.animation.isPlaying) {
                this._dragonBones.animation.stop(this.idle);
            }
        }
    };
    /**
     * 恢复播放骨骼动画
     */
    BaseLoadDragonBones.prototype.resume = function () {
        if (this._isInit) {
            this._isStop = false;
            if (this._dragonBones && !this._dragonBones.animation.isPlaying) {
                this._dragonBones.animation.play(this.idle, 0);
            }
        }
    };
    BaseLoadDragonBones.prototype.isLoaded = function () {
        return this._isLoaded;
    };
    BaseLoadDragonBones.prototype.playDragonMovie = function (frame, times) {
        if (this._dragonBones) {
            this._dragonBones.armature.animation.play(frame, times);
        }
    };
    BaseLoadDragonBones.prototype.getLastFrameName = function () {
        if (this._dragonBones) {
            return this._dragonBones.animation.lastAnimationName;
        }
        else {
            return null;
        }
    };
    BaseLoadDragonBones.prototype.setFrameAndNum = function (idle, times) {
        this.idle = idle;
        this._playTimes = times;
    };
    BaseLoadDragonBones.prototype.setAnchorOffset = function (x, y) {
        if (this._dragonBones) {
            this._dragonBones.anchorOffsetX = x;
            this._dragonBones.anchorOffsetY = y;
        }
        else {
            this.anchor = true;
            this.anchorInfo = {
                x: x,
                y: y
            };
        }
    };
    /**
     * 龙骨监听事件，已考虑异步加载情况
     * evt : 龙骨动画事件 包含但不限于 播放一次完成、播放一次循环完成等	dragonBones.AnimationEvent.COMPLETE,LOOP_COMPLETE
     * func : 自定义函数
     * obj : 自定义对象
     * */
    BaseLoadDragonBones.prototype.setDragonBoneEventListener = function (evt, func, obj) {
        if (!this._eventDeal[evt]) {
            this._eventDeal[evt] = {};
            this._eventDeal[evt].func = func;
            this._eventDeal[evt].obj = obj;
            if (this._dragonBones) {
                this.addEvent = '';
                this._dragonBones.addEventListener(evt, func, obj);
            }
            else {
                this.addEvent = evt;
            }
        }
    };
    BaseLoadDragonBones.prototype.getBoneName = function () {
        return this._dragonBonesName;
    };
    /**
     * getDBobj
     */
    BaseLoadDragonBones.prototype.getDBobj = function () {
        return this._dragonBones;
    };
    BaseLoadDragonBones.prototype.dispose = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeToStage, this);
        this.stop();
        this._isInit = false;
        this._isStop = false;
        if (this._isLoaded && BaseLoadDragonBones.cacheDic[this._dragonBonesName]) {
            BaseLoadDragonBones.cacheDic[this._dragonBonesName]--;
        }
        if (this._dragonBonesName) {
            if (this._isLoaded && !BaseLoadDragonBones.cacheDic[this._dragonBonesName]) {
                App.DragonBonesUtil.removeDragonBones(this._dragonBonesName);
            }
        }
        this._dragonBonesName = null;
        if (this._groupName) {
            if (this._isLoaded) {
                ResMgr.destroyRes(this._groupName);
                this._groupName = null;
            }
        }
        for (var i in this._eventDeal) {
            var unit = this._eventDeal[i];
            if (unit && this._dragonBones) {
                this._dragonBones.removeEventListener(i, unit.func, unit.obj);
            }
        }
        this._eventDeal = {};
        this._dragonBones = null;
        this._isLoaded = false;
        this._playTimes = 0;
        this.addEvent = '';
        this.anchor = false;
        this.anchorInfo = null;
        this._loadCompleteCallData = null;
        this._isRemoveStageStop = false;
        _super.prototype.dispose.call(this);
    };
    BaseLoadDragonBones.cacheDic = {};
    return BaseLoadDragonBones;
}(BaseDisplayObjectContainer));
__reflect(BaseLoadDragonBones.prototype, "BaseLoadDragonBones");
//# sourceMappingURL=BaseLoadDragonBones.js.map