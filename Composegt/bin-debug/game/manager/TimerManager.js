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
 * Created by yangsong on 2014/11/23.
 * Timer管理器
 */
var TimerManager = (function (_super) {
    __extends(TimerManager, _super);
    function TimerManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 构造函数
     */
    TimerManager.init = function () {
        egret.startTick(TimerManager.onEnterFrame, this);
        TimerManager._isInit = true;
    };
    /**
     * 设置时间参数
     * @param timeScale
     */
    TimerManager.setTimeScale = function (timeScale) {
        TimerManager._timeScale = timeScale;
    };
    /**
     * 每帧执行函数
     * @param frameTime
     */
    TimerManager.onEnterFrame = function (timer) {
        TimerManager._currFrame++;
        TimerManager._currTime = timer;
        // App.DebugUtils.start("TimerManager:");
        for (var i = 0; i < TimerManager._count; i++) {
            var handler = TimerManager._handlers[i];
            var t = handler.userFrame ? TimerManager._currFrame : TimerManager._currTime;
            if (t >= handler.exeTime) {
                // App.DebugUtils.start(handler.method.toString());
                handler.method.call(handler.methodObj, (TimerManager._currTime - handler.dealTime) * TimerManager._timeScale);
                // App.DebugUtils.stop(handler.method.toString());
                handler.dealTime = TimerManager._currTime;
                handler.exeTime = Math.max(handler.exeTime + handler.delay, TimerManager._currTime + handler.delay);
                if (!handler.repeat) {
                    if (handler.repeatCount > 1) {
                        handler.repeatCount--;
                    }
                    else {
                        if (handler.complateMethod) {
                            handler.complateMethod.apply(handler.complateMethodObj);
                        }
                        TimerManager._delHandlers.push(handler);
                    }
                }
            }
        }
        while (TimerManager._delHandlers.length) {
            var handler = TimerManager._delHandlers.pop();
            TimerManager.remove(handler.method, handler.methodObj);
        }
        // App.DebugUtils.stop("TimerManager:");
        return false;
    };
    TimerManager.create = function (useFrame, delay, repeatCount, method, methodObj, complateMethod, complateMethodObj) {
        if (TimerManager._isInit == false) {
            TimerManager.init();
        }
        //参数监测
        if (delay < 0 || repeatCount < 0 || method == null) {
            return;
        }
        //先删除相同函数的计时
        TimerManager.remove(method, methodObj);
        //创建
        var handler = TimerHandler.create();
        handler.userFrame = useFrame;
        handler.repeat = repeatCount == 0;
        handler.repeatCount = repeatCount;
        handler.delay = delay;
        handler.method = method;
        handler.methodObj = methodObj;
        handler.complateMethod = complateMethod;
        handler.complateMethodObj = complateMethodObj;
        handler.exeTime = delay + (useFrame ? TimerManager._currFrame : TimerManager._currTime);
        handler.dealTime = TimerManager._currTime;
        TimerManager._handlers.push(handler);
        TimerManager._count++;
    };
    /**
     *
     * 定时执行
     * @param delay 执行间隔:毫秒
     * @param repeatCount 执行次数, 0为无限次
     * @param method 执行函数
     * @param methodObj 执行函数所属对象
     * @param complateMethod 完成执行函数
     * @param complateMethodObj 完成执行函数所属对象
     *
     */
    TimerManager.doTimer = function (delay, repeatCount, method, methodObj, complateMethod, complateMethodObj) {
        if (complateMethod === void 0) { complateMethod = null; }
        if (complateMethodObj === void 0) { complateMethodObj = null; }
        TimerManager.create(false, delay, repeatCount, method, methodObj, complateMethod, complateMethodObj);
    };
    /**
     *
     * 定时执行
     * @param delay 执行间隔:帧频
     * @param repeatCount 执行次数, 0为无限次
     * @param method 执行函数
     * @param methodObj 执行函数所属对象
     * @param complateMethod 完成执行函数
     * @param complateMethodObj 完成执行函数所属对象
     *
     */
    TimerManager.doFrame = function (delay, repeatCount, method, methodObj, complateMethod, complateMethodObj) {
        if (complateMethod === void 0) { complateMethod = null; }
        if (complateMethodObj === void 0) { complateMethodObj = null; }
        TimerManager.create(true, delay, repeatCount, method, methodObj, complateMethod, complateMethodObj);
    };
    Object.defineProperty(TimerManager, "count", {
        /**
         * 定时器执行数量
         * @return
         *
         */
        get: function () {
            return TimerManager._count;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 清理
     * @param method 要移除的函数
     * @param methodObj 要移除的函数对应的对象
     */
    TimerManager.remove = function (method, methodObj) {
        for (var i = 0; i < TimerManager._count; i++) {
            var handler = TimerManager._handlers[i];
            if (handler.method == method && handler.methodObj == methodObj) {
                TimerManager._handlers.splice(i, 1);
                TimerHandler.release(handler);
                TimerManager._count--;
                break;
            }
        }
    };
    /**
     * 清理
     * @param methodObj 要移除的函数对应的对象
     */
    TimerManager.removeAll = function (methodObj) {
        for (var i = 0; i < TimerManager._count; i++) {
            var handler = TimerManager._handlers[i];
            if (handler.methodObj == methodObj) {
                TimerManager._handlers.splice(i, 1);
                TimerHandler.release(handler);
                TimerManager._count--;
                i--;
            }
        }
    };
    /**
     * 检测是否已经存在
     * @param method
     * @param methodObj
     *
     */
    TimerManager.isExists = function (method, methodObj) {
        for (var i = 0; i < TimerManager._count; i++) {
            var handler = TimerManager._handlers[i];
            if (handler.method == method && handler.methodObj == methodObj) {
                return true;
            }
        }
        return false;
    };
    TimerManager.prototype.dispose = function () {
    };
    TimerManager._handlers = new Array();
    TimerManager._delHandlers = new Array();
    TimerManager._currTime = 0;
    TimerManager._currFrame = 0;
    TimerManager._count = 0;
    TimerManager._timeScale = 1;
    TimerManager._isInit = false;
    return TimerManager;
}(BaseClass));
__reflect(TimerManager.prototype, "TimerManager");
var TimerHandler = (function () {
    function TimerHandler() {
        /**执行间隔*/
        this.delay = 0;
        /**重复执行次数*/
        this.repeatCount = 0;
        /**执行时间*/
        this.exeTime = 0;
        /**上次的执行时间*/
        this.dealTime = 0;
    }
    TimerHandler.create = function () {
        var handler = TimerHandler.timerHandlerPool.pop();
        if (!handler) {
            handler = new TimerHandler();
        }
        return handler;
    };
    TimerHandler.release = function (handler) {
        handler.clear();
        if (TimerHandler.timerHandlerPool.indexOf(handler) < 0) {
            TimerHandler.timerHandlerPool.push(handler);
        }
    };
    /**清理*/
    TimerHandler.prototype.clear = function () {
        this.method = null;
        this.methodObj = null;
        this.complateMethod = null;
        this.complateMethodObj = null;
        this.delay = 0;
        this.repeat = false;
        this.repeatCount = 0;
        this.userFrame = false;
        this.exeTime = 0;
        this.dealTime = 0;
    };
    TimerHandler.timerHandlerPool = [];
    return TimerHandler;
}());
__reflect(TimerHandler.prototype, "TimerHandler");
