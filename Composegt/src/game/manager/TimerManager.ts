/**
 * Created by yangsong on 2014/11/23.
 * Timer管理器
 */
class TimerManager extends BaseClass 
{
    private static _handlers:Array<TimerHandler> = new Array<TimerHandler>();
    private static _delHandlers:Array<TimerHandler> = new Array<TimerHandler>();
    private static _currTime:number = 0;
    private static _currFrame:number = 0;
    private static _count:number = 0;
    private static _timeScale:number = 1;
    private static _isInit:boolean = false;
   
    /**
     * 构造函数
     */
    public static init() 
    {
        egret.startTick(TimerManager.onEnterFrame, this);
        TimerManager._isInit = true;
    }

    /**
     * 设置时间参数
     * @param timeScale
     */
    public static setTimeScale(timeScale:number):void 
    {
        TimerManager._timeScale = timeScale;
    }

    /**
     * 每帧执行函数
     * @param frameTime
     */
    private static onEnterFrame(timer:number):boolean 
    {
        TimerManager._currFrame++;
        TimerManager._currTime = timer;
		// App.DebugUtils.start("TimerManager:");
        for (var i:number = 0; i < TimerManager._count; i++) 
        {
            var handler:TimerHandler = TimerManager._handlers[i];
            var t:number = handler.userFrame ? TimerManager._currFrame : TimerManager._currTime;
            if (t >= handler.exeTime) 
            {
                // App.DebugUtils.start(handler.method.toString());
                handler.method.call(handler.methodObj, (TimerManager._currTime - handler.dealTime) * TimerManager._timeScale);
                // App.DebugUtils.stop(handler.method.toString());
                handler.dealTime = TimerManager._currTime;
                handler.exeTime = Math.max(handler.exeTime + handler.delay, TimerManager._currTime + handler.delay);
                if (!handler.repeat) 
                {
                    if (handler.repeatCount > 1) 
                    {
                        handler.repeatCount--;
                    } 
                    else 
                    {
                        if (handler.complateMethod) 
                        {
                            handler.complateMethod.apply(handler.complateMethodObj);
                        }
                        TimerManager._delHandlers.push(handler);
                    }
                }
            }
        }
        while (TimerManager._delHandlers.length) 
        {
            var handler:TimerHandler = TimerManager._delHandlers.pop();
            TimerManager.remove(handler.method, handler.methodObj);
        }
		// App.DebugUtils.stop("TimerManager:");
        return false;
    }

    private static create(useFrame:boolean, delay:number, repeatCount:number, method:Function, methodObj:any, complateMethod:Function, complateMethodObj:any):void {
        if(TimerManager._isInit == false)
        {
            TimerManager.init();
        }
        //参数监测
        if (delay < 0 || repeatCount < 0 || method == null) 
        {
            return;
        }

        //先删除相同函数的计时
        TimerManager.remove(method, methodObj);

        //创建
        var handler:TimerHandler = TimerHandler.create();
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
    }

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
    public static doTimer(delay:number, repeatCount:number, method:Function, methodObj:any, complateMethod:Function = null, complateMethodObj:any = null):void 
    {
        TimerManager.create(false, delay, repeatCount, method, methodObj, complateMethod, complateMethodObj);
    }

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
    public static doFrame(delay:number, repeatCount:number, method:Function, methodObj:any, complateMethod:Function = null, complateMethodObj:any = null):void 
    {
        TimerManager.create(true, delay, repeatCount, method, methodObj, complateMethod, complateMethodObj);
    }

    /**
     * 定时器执行数量
     * @return
     *
     */
    public static get count():number 
    {
        return TimerManager._count;
    }

    /**
     * 清理
     * @param method 要移除的函数
     * @param methodObj 要移除的函数对应的对象
     */
    public static remove(method:Function, methodObj:any):void 
    {
        for (var i:number = 0; i < TimerManager._count; i++) 
        {
            var handler:TimerHandler = TimerManager._handlers[i];
            if (handler.method == method && handler.methodObj == methodObj) 
            {
                TimerManager._handlers.splice(i, 1);
                TimerHandler.release(handler);
                TimerManager._count--;
                break;
            }
        }
    }

    /**
     * 清理
     * @param methodObj 要移除的函数对应的对象
     */
    public static removeAll(methodObj:any):void 
    {
        for (var i:number = 0; i < TimerManager._count; i++) 
        {
            var handler:TimerHandler = TimerManager._handlers[i];
            if (handler.methodObj == methodObj) 
            {
                TimerManager._handlers.splice(i, 1);
                TimerHandler.release(handler);
                TimerManager._count--;
                i--;
            }
        }
    }

    /**
     * 检测是否已经存在
     * @param method
     * @param methodObj
     *
     */
    public static isExists(method:Function, methodObj:any):boolean 
    {
        for (var i:number = 0; i < TimerManager._count; i++) 
        {
            var handler:TimerHandler = TimerManager._handlers[i];
            if (handler.method == method && handler.methodObj == methodObj) 
            {
                return true;
            }
        }
        return false;
    }


	public dispose():void
	{
		
	}
}


class TimerHandler 
{
    /**执行间隔*/
    public delay:number = 0;
    /**是否重复执行*/
    public repeat:boolean;
    /**重复执行次数*/
    public repeatCount:number = 0;
    /**是否用帧率*/
    public userFrame:boolean;
    /**执行时间*/
    public exeTime:number = 0;
    /**处理函数*/
    public method:Function;
    /**处理函数所属对象*/
    public methodObj:any;
    /**完成处理函数*/
    public complateMethod:Function;
    /**完成处理函数所属对象*/
    public complateMethodObj:any;
    /**上次的执行时间*/
    public dealTime:number = 0;
    private static timerHandlerPool:Array<TimerHandler> = [];

    public static create():TimerHandler
    {
        let handler = TimerHandler.timerHandlerPool.pop();
        if(!handler)
        {
            handler = new TimerHandler();
        }
        return handler;
    }

    public static release(handler:TimerHandler):void
    {
        handler.clear();
        if(TimerHandler.timerHandlerPool.indexOf(handler) < 0)
        {
            TimerHandler.timerHandlerPool.push(handler);
        }
    }
    /**清理*/
    public clear():void 
    {
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
    }
}