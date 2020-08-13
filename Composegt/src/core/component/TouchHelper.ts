/**
 * author 陈可
 * date 2017/8/9
 * @class TouchHelper
 */
namespace TouchHelper
{
    export class Tap extends BaseClass
    {
        public constructor()
        {
            super();
        }

        private _target: egret.DisplayObject=null;
        private _touchTapHandler:(event:egret.TouchEvent,...args)=>void=null;
        private _touchTapHandlerParams:any[]=null;
        private _touchTapHandlerThisObj:any=null;
        
        /**
         * 添加触摸点击
         * @param target 
         * @param touchTapHandler 
         * @param touchTapHandlerParams 
         * @param touchTapHandlerThisObj 
         */
        public addTouchTap(target:egret.DisplayObject,touchTapHandler:(event:egret.TouchEvent,...args)=>void,touchTapHandlerThisObj:any,touchTapHandlerParams:any[]):void
        {
            if (target && touchTapHandler)
            {
                target.touchEnabled=true;
                this._target = target;
                this._touchTapHandler = touchTapHandler;
                this._touchTapHandlerParams=touchTapHandlerParams;
                this._touchTapHandlerThisObj=touchTapHandlerThisObj;
                target.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchTapHandler,this);
            }
        }
        
        private touchTapHandler(event:egret.TouchEvent):void
        {
            if (this._touchTapHandler)
            {
                let params:any[]=[event];
                if(this._touchTapHandlerParams)
                {
                    params=params.concat(this._touchTapHandlerParams);
                }
                App.MainTaskHandUtil.lastTouchTargetCheck(this._target);
                this._touchTapHandler.apply(this._touchTapHandlerThisObj,params);
            }
        }
        
        public removeTouchTap()
        { 
            this.dispose();
        }

        public dispose():void
        {
            this._touchTapHandler = null;
            this._touchTapHandlerParams=null;
            this._touchTapHandlerThisObj=null;
            this._target.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchTapHandler,this);
            this._target = null;
        }
    }

    export class Touch extends BaseClass
    {
        public constructor()
        {
            super();
        }

        private _target: egret.DisplayObject=null;
        private _touchHandler:(event:egret.TouchEvent,...args)=>void=null;
        private _touchHandlerParams:any[]=null;
        private _touchHandlerThisObj:any=null;
        private _isTouching: boolean = false;
        private _isMoveCancel:boolean=false;
        private _startPoint:egret.Point;
        private _curPoint:egret.Point;
        private _eventList:egret.Event[]=[];
        
        /**
         * 添加触摸点击
         * @param target 
         * @param touchHandler 
         * @param touchHandlerParams 
         * @param touchHandlerThisObj 
         * @param isMoveCancel 是否移动时候取消
         */
        public addTouch(target:egret.DisplayObject,touchHandler:(event:egret.TouchEvent,...args)=>void,touchHandlerThisObj:any,touchHandlerParams:any[],isMoveCancel?:boolean)
        {
            if (target && touchHandler)
            {
                target.touchEnabled=true;
                this._target = target;
                this._touchHandler = touchHandler;
                this._touchHandlerParams=touchHandlerParams;
                this._touchHandlerThisObj=touchHandlerThisObj;
                this._isMoveCancel=Boolean(isMoveCancel);
                target.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchHandler,this);
                egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchHandler,this);
                target.addEventListener(egret.TouchEvent.TOUCH_END,this.touchHandler,this);
                target.addEventListener(egret.TouchEvent.TOUCH_CANCEL,this.touchHandler,this);
                target.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.touchHandler,this);
                egret.MainContext.instance.stage.addEventListener(egret.Event.LEAVE_STAGE, this.touchHandler, this);
            }
        }

        public checkHasTouch(touchHandler:(event:egret.TouchEvent,...args)=>void,touchHandlerThisObj:any,touchHandlerParams:any[],isMoveCancel?:boolean):boolean
        {
            if(this._touchHandler==touchHandler&&this._touchHandlerThisObj==touchHandlerThisObj&&this._touchHandlerParams==touchHandlerParams&&isMoveCancel==this._isMoveCancel)
            {
                return true;
            }
            return false;
        }

        private touchHandler(event:egret.Event):void
        {
            let useEvent:egret.TouchEvent=null;
            let e:egret.TouchEvent=<egret.TouchEvent>event;
            let isCancel:boolean=false;
            switch(event.type)
            {
                case egret.TouchEvent.TOUCH_BEGIN:
                    if(!this._startPoint)
                    {
                        this._startPoint=egret.Point.create(e.stageX,e.stageY);
                    }
                    else
                    {
                        this._startPoint.setTo(e.stageX,e.stageY);
                    }
                    this._isTouching=true;
                    break;
                case egret.TouchEvent.TOUCH_MOVE:
                    if(!this._isTouching)
                    {
                        return;
                    }
                    if(!this._curPoint)
                    {
                        this._curPoint=egret.Point.create(e.stageX,e.stageY);
                    }
                    else
                    {
                        this._curPoint.setTo(e.stageX,e.stageY);
                    }
                    if(this._isMoveCancel)
                    {
                        if(egret.Point.distance(this._curPoint,this._startPoint)>10)
                        {
                            this._isTouching=false;
                            isCancel=true;
                        }
                    }
                    break;
                case egret.TouchEvent.TOUCH_END:
                    if(!this._isTouching)
                    {
                        return;
                    }
                    this._isTouching=false;
                    break;
                case egret.TouchEvent.TOUCH_RELEASE_OUTSIDE:
                case egret.TouchEvent.TOUCH_CANCEL:
                case egret.Event.LEAVE_STAGE:
                    if(!this._isTouching)
                    {
                        return;
                    }
                    this._isTouching=false;
                    isCancel=true;
                    break;
                default:
                    break;
            }
            if(isCancel)
            {
                useEvent=egret.Event.create(egret.TouchEvent,egret.TouchEvent.TOUCH_CANCEL);
                useEvent.$setTarget(this._target);
                useEvent.$currentTarget=this._target;
                this._eventList.push(useEvent);
            }
            else
            {
                useEvent=<egret.TouchEvent>event;
            }
            if (this._touchHandler)
            {
                let params:any[]=[useEvent];
                if(this._touchHandlerParams)
                {
                    params=params.concat(this._touchHandlerParams);
                }
                App.MainTaskHandUtil.lastTouchTargetCheck(this._target);
                this._touchHandler.apply(this._touchHandlerThisObj,params);
            }
        }
        
        public removeTouch()
        { 
            this.dispose();
        }

        public dispose():void
        {
            while(this._eventList.length>0)
            {
                egret.Event.release(this._eventList.pop());
            }
            this._touchHandler = null;
            this._touchHandlerParams=null;
            this._touchHandlerThisObj=null;
            if(this._target)
            {
                this._target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchHandler,this);
                egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchHandler,this);
                this._target.removeEventListener(egret.TouchEvent.TOUCH_END,this.touchHandler,this);
                this._target.removeEventListener(egret.TouchEvent.TOUCH_CANCEL,this.touchHandler,this);
                this._target.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.touchHandler,this);
                egret.MainContext.instance.stage.removeEventListener(egret.Event.LEAVE_STAGE, this.touchHandler, this);
            }
            this._target = null;
        }
    }

    /**
     * 添加触摸点击
     * @param targetDisplayObject 需要添加点击的对象
     * @param tapHandler 触摸点击回调
     * @param tapHandlerThisObj 触摸点击回调拥有对象
     * @param tapHandlerParams 触摸点击回调参数
     */
    export function addTouchTap(targetDisplayObject: egret.DisplayObject, tapHandler: (event: egret.TouchEvent, ...args: any[]) => void,tapHandlerThisObj:any,tapHandlerParams:any[]):Tap
    {
        let tap: Tap = new Tap();
        tap.addTouchTap(targetDisplayObject,tapHandler,tapHandlerThisObj,tapHandlerParams);
        return tap;
    }
    
    /**
    * 删除Tap，传入touchHelper对象
    * 另外一种用法，是touchTap对象直接调用removeTouchTap方法
    * @param targetTap 需要移除点击的对象
    */
    export function removeTouchTap(targetTap:Tap):void
    {
        if (targetTap)
        { 
            targetTap.removeTouchTap();
        }
    }

    /**
     *  添加触摸监听，包括开始触摸，触摸移动，触摸结束，触摸取消，触摸中断一系列触摸监听
     * @param targetDisplayObject 需要添加触摸监听的对象
     * @param touchHandler 触摸监听回调方法
     * @param touchHandlerThisObj 触摸监听回调方法拥有对象
     * @param touchHandlerParams 触摸监听回调方法参数
     * @param isMoveCancel 是否移动时候取消
     */
    export function addTouch(targetDisplayObject: egret.DisplayObject, touchHandler:(event:egret.TouchEvent,...args)=>void,touchHandlerThisObj:any,touchHandlerParams:any[],isMoveCancel?:boolean):Touch
    {
        let touch: Touch = new Touch();
        touch.addTouch(targetDisplayObject,touchHandler,touchHandlerThisObj,touchHandlerParams,isMoveCancel);
        return touch;
    }

    /**
     * 删除目标对象触摸监听
     * @param targetTouch 目标对象
     */
    export function removeTouch(targetTouch:Touch):void
    {
        if (targetTouch)
        { 
            targetTouch.removeTouch();
        }
    }

}