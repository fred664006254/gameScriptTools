/**
 * author 陈可
 * date 2017/9/4
 * @class BaseClass
 */
declare module base
{
    export interface Ibase
    {
        dispose():void;
    }
    export interface Iinteractive
    {
        // addTouch(touchHandler:Function,touchHandlerParams:any[],touchHandlerThisObj:any):void;
        addTouchTap(taHandler:Function,tapHandlerParams:any[],tapHandlerThisObj:any);
        // removeTouch():void;
        removeTouchTap():void;
        setPosition(x:number,y:number):void;
        stopAllActions():void;
        setVisible(visible:boolean):void;
        setScale(scale:number):void;
    }
    export interface IbasePool
    {
        create():IbasePool;
        release():void;
    }
}