/**
 * 消息通知类
 * author dmj
 * date 2017/9/4
 * @class MessageHelper
 */
namespace App
{
	export class MessageHelper 
	{
		private static eventDisptcher:egret.EventDispatcher = new egret.EventDispatcher();
		public constructor() 
		{
		}

		/**
		 * 添加事件
		 * eventType 通知类型
		 * callback  回调方法 回调参数为event.data
		 * thisObject  发起监听的对象
		 */
		public static addEventListener(eventType:string,callback:(event:egret.Event)=>void,thisObject:any):void
		{
			this.eventDisptcher.addEventListener(eventType,callback,thisObject);
		}

		/**
		 * 添加事件(仅执行一次)
		 * eventType 通知类型
		 * callback  回调方法
		 * thisObject  发起监听的对象
		 */
		public static once(eventType:string,callback:Function,thisObject:any):void
		{
			this.eventDisptcher.once(eventType,callback,thisObject);
		}

		/**
		 * 移除事件
		 * eventType 通知类型
		 * callback  回调方法
		 * thisObject  发起监听的对象
		 */
		public static removeEventListener(eventType:string,callback:Function,thisObject:any):void
		{
			this.eventDisptcher.removeEventListener(eventType,callback,thisObject);
		}

		/**
		 * 添加事件
		 * netMessageType 通知类型
		 * callback  回调方法 回调参数为event.data
		 * thisObject  发起监听的对象
		 */
		public static addNetMessage(netMessageType:string,callback:(event:egret.Event)=>void,thisObject:any):void
		{
			this.eventDisptcher.addEventListener(NetManager.getMessageName(netMessageType),callback,thisObject);
		}

		/**
		 * 移除事件
		 * netMessageType 通知类型
		 * callback  回调方法
		 * thisObject  发起监听的对象
		 */
		public static removeNetMessage(netMessageType:string,callback:Function,thisObject:any):void
		{
			this.eventDisptcher.removeEventListener(NetManager.getMessageName(netMessageType),callback,thisObject);
		}

		/**
		 * 发送net事件
		 * eventType 通知类型
		 * param     参数
		 */
		public static dispatchNetMessage(eventType:string,param?:any):void
		{
			MessageHelper.dispatchEvent(NetManager.getMessageName(eventType),param);
		}

		/**
		 * 发送事件
		 * eventType 通知类型
		 * param     参数
		 */
		public static dispatchEvent(eventType:string,param?:any):void
		{
			this.eventDisptcher.dispatchEvent(new egret.Event(eventType,false,false,param));
		}
		

		/**
		 * 判断是否该事件是否已存在，true：已存在
		 * eventType 通知类型
		 */
		public static hasEventListener(eventType:string):boolean
		{
			return this.eventDisptcher.hasEventListener(eventType);
		}
	}
}