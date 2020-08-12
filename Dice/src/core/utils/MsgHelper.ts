/**
 * 消息通知类
 * author dmj
 * date 2017/9/4
 * @class MessageHelper
 */
namespace App
{
	export class MsgHelper 
	{
		private static evtD:egret.EventDispatcher = new egret.EventDispatcher();
		public constructor() 
		{
		}

		/**
		 * 添加事件
		 * eventType 通知类型
		 * callback  回调方法 回调参数为event.data
		 * thisObject  发起监听的对象
		 */
		public static addEvt(eventType:string,callback:(event:egret.Event | egret.TouchEvent)=>void,thisObject:any):void
		{
			this.evtD.addEventListener(eventType,callback,thisObject);
		}

		/**
		 * 添加事件(仅执行一次)
		 * eventType 通知类型
		 * callback  回调方法
		 * thisObject  发起监听的对象
		 */
		public static once(eventType:string,callback:Function,thisObject:any):void
		{
			this.evtD.once(eventType,callback,thisObject);
		}

		/**
		 * 移除事件
		 * eventType 通知类型
		 * callback  回调方法
		 * thisObject  发起监听的对象
		 */
		public static removeEvt(eventType:string,callback:Function,thisObject:any):void
		{
			this.evtD.removeEventListener(eventType,callback,thisObject);
		}

		/**
		 * 发送事件
		 * eventType 通知类型
		 * param     参数
		 */
		public static dispEvt(eventType:string,param?:any):void
		{
			this.evtD.dispatchEvent(new egret.Event(eventType,false,false,param));
		}
		

		/**
		 * 判断是否该事件是否已存在，true：已存在
		 * eventType 通知类型
		 */
		public static hasEvt(eventType:string):boolean
		{
			return this.evtD.hasEventListener(eventType);
		}
	}

}