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
 * author 陈可
 * date 2017/8/9
 * @class TouchHelper
 */
var TouchHelper;
(function (TouchHelper) {
    var Tap = (function (_super) {
        __extends(Tap, _super);
        function Tap() {
            var _this = _super.call(this) || this;
            _this._target = null;
            _this._touchTapHandler = null;
            _this._touchTapHandlerParams = null;
            _this._touchTapHandlerThisObj = null;
            return _this;
        }
        /**
         * 添加触摸点击
         * @param target
         * @param touchTapHandler
         * @param touchTapHandlerParams
         * @param touchTapHandlerThisObj
         */
        Tap.prototype.addTouchTap = function (target, touchTapHandler, touchTapHandlerThisObj, touchTapHandlerParams) {
            if (target && touchTapHandler) {
                target.touchEnabled = true;
                this._target = target;
                this._touchTapHandler = touchTapHandler;
                this._touchTapHandlerParams = touchTapHandlerParams;
                this._touchTapHandlerThisObj = touchTapHandlerThisObj;
                target.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTapHandler, this);
            }
        };
        Tap.prototype.touchTapHandler = function (event) {
            if (this._touchTapHandler) {
                var params = [event];
                if (this._touchTapHandlerParams) {
                    params = params.concat(this._touchTapHandlerParams);
                }
                // App.MainTaskHandUtil.lastTouchTargetCheck(this._target);
                this._touchTapHandler.apply(this._touchTapHandlerThisObj, params);
            }
        };
        Tap.prototype.removeTouchTap = function () {
            this.dispose();
        };
        Tap.prototype.dispose = function () {
            this._touchTapHandler = null;
            this._touchTapHandlerParams = null;
            this._touchTapHandlerThisObj = null;
            this._target.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTapHandler, this);
            this._target = null;
        };
        return Tap;
    }(BaseClass));
    TouchHelper.Tap = Tap;
    __reflect(Tap.prototype, "TouchHelper.Tap");
    var Touch = (function (_super) {
        __extends(Touch, _super);
        function Touch() {
            var _this = _super.call(this) || this;
            _this._target = null;
            _this._touchHandler = null;
            _this._touchHandlerParams = null;
            _this._touchHandlerThisObj = null;
            _this._isTouching = false;
            _this._isMoveCancel = false;
            _this._eventList = [];
            return _this;
        }
        /**
         * 添加触摸点击
         * @param target
         * @param touchHandler
         * @param touchHandlerParams
         * @param touchHandlerThisObj
         * @param isMoveCancel 是否移动时候取消
         */
        Touch.prototype.addTouch = function (target, touchHandler, touchHandlerThisObj, touchHandlerParams, isMoveCancel) {
            if (target && touchHandler) {
                target.touchEnabled = true;
                this._target = target;
                this._touchHandler = touchHandler;
                this._touchHandlerParams = touchHandlerParams;
                this._touchHandlerThisObj = touchHandlerThisObj;
                this._isMoveCancel = Boolean(isMoveCancel);
                target.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
                egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
                target.addEventListener(egret.TouchEvent.TOUCH_END, this.touchHandler, this);
                target.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.touchHandler, this);
                target.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchHandler, this);
                egret.MainContext.instance.stage.addEventListener(egret.Event.LEAVE_STAGE, this.touchHandler, this);
            }
        };
        Touch.prototype.touchHandler = function (event) {
            var useEvent = null;
            var e = event;
            var isCancel = false;
            switch (event.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    if (!this._startPoint) {
                        this._startPoint = egret.Point.create(e.stageX, e.stageY);
                    }
                    else {
                        this._startPoint.setTo(e.stageX, e.stageY);
                    }
                    this._isTouching = true;
                    break;
                case egret.TouchEvent.TOUCH_MOVE:
                    if (!this._isTouching) {
                        return;
                    }
                    if (!this._curPoint) {
                        this._curPoint = egret.Point.create(e.stageX, e.stageY);
                    }
                    else {
                        this._curPoint.setTo(e.stageX, e.stageY);
                    }
                    if (this._isMoveCancel) {
                        if (egret.Point.distance(this._curPoint, this._startPoint) > 10) {
                            this._isTouching = false;
                            isCancel = true;
                        }
                    }
                    break;
                case egret.TouchEvent.TOUCH_END:
                    if (!this._isTouching) {
                        return;
                    }
                    this._isTouching = false;
                    break;
                case egret.TouchEvent.TOUCH_RELEASE_OUTSIDE:
                case egret.TouchEvent.TOUCH_CANCEL:
                case egret.Event.LEAVE_STAGE:
                    if (!this._isTouching) {
                        return;
                    }
                    this._isTouching = false;
                    isCancel = true;
                    break;
                default:
                    break;
            }
            if (isCancel) {
                useEvent = egret.Event.create(egret.TouchEvent, egret.TouchEvent.TOUCH_CANCEL);
                useEvent.$setTarget(this._target);
                useEvent.$currentTarget = this._target;
                this._eventList.push(useEvent);
            }
            else {
                useEvent = event;
            }
            if (this._touchHandler) {
                var params = [useEvent];
                if (this._touchHandlerParams) {
                    params = params.concat(this._touchHandlerParams);
                }
                // App.MainTaskHandUtil.lastTouchTargetCheck(this._target);
                this._touchHandler.apply(this._touchHandlerThisObj, params);
            }
        };
        Touch.prototype.removeTouch = function () {
            this.dispose();
        };
        Touch.prototype.dispose = function () {
            while (this._eventList.length > 0) {
                egret.Event.release(this._eventList.pop());
            }
            this._touchHandler = null;
            this._touchHandlerParams = null;
            this._touchHandlerThisObj = null;
            if (this._target) {
                this._target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
                egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
                this._target.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchHandler, this);
                this._target.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.touchHandler, this);
                this._target.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchHandler, this);
                egret.MainContext.instance.stage.removeEventListener(egret.Event.LEAVE_STAGE, this.touchHandler, this);
            }
            this._target = null;
        };
        return Touch;
    }(BaseClass));
    TouchHelper.Touch = Touch;
    __reflect(Touch.prototype, "TouchHelper.Touch");
    /**
     * 添加触摸点击
     * @param targetDisplayObject 需要添加点击的对象
     * @param tapHandler 触摸点击回调
     * @param tapHandlerThisObj 触摸点击回调拥有对象
     * @param tapHandlerParams 触摸点击回调参数
     */
    function addTouchTap(targetDisplayObject, tapHandler, tapHandlerThisObj, tapHandlerParams) {
        var tap = new Tap();
        tap.addTouchTap(targetDisplayObject, tapHandler, tapHandlerThisObj, tapHandlerParams);
        return tap;
    }
    TouchHelper.addTouchTap = addTouchTap;
    /**
    * 删除Tap，传入touchHelper对象
    * 另外一种用法，是touchTap对象直接调用removeTouchTap方法
    * @param targetTap 需要移除点击的对象
    */
    function removeTouchTap(targetTap) {
        if (targetTap) {
            targetTap.removeTouchTap();
        }
    }
    TouchHelper.removeTouchTap = removeTouchTap;
    /**
     *  添加触摸监听，包括开始触摸，触摸移动，触摸结束，触摸取消，触摸中断一系列触摸监听
     * @param targetDisplayObject 需要添加触摸监听的对象
     * @param touchHandler 触摸监听回调方法
     * @param touchHandlerThisObj 触摸监听回调方法拥有对象
     * @param touchHandlerParams 触摸监听回调方法参数
     * @param isMoveCancel 是否移动时候取消
     */
    function addTouch(targetDisplayObject, touchHandler, touchHandlerThisObj, touchHandlerParams, isMoveCancel) {
        var touch = new Touch();
        touch.addTouch(targetDisplayObject, touchHandler, touchHandlerThisObj, touchHandlerParams, isMoveCancel);
        return touch;
    }
    TouchHelper.addTouch = addTouch;
    /**
     * 删除目标对象触摸监听
     * @param targetTouch 目标对象
     */
    function removeTouch(targetTouch) {
        if (targetTouch) {
            targetTouch.removeTouch();
        }
    }
    TouchHelper.removeTouch = removeTouch;
})(TouchHelper || (TouchHelper = {}));
//# sourceMappingURL=TouchHelper.js.map