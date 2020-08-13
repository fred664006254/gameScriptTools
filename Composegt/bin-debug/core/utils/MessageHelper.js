var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 消息通知类
 * author dmj
 * date 2017/9/4
 * @class MessageHelper
 */
var App;
(function (App) {
    var MessageHelper = (function () {
        function MessageHelper() {
        }
        /**
         * 添加事件
         * eventType 通知类型
         * callback  回调方法 回调参数为event.data
         * thisObject  发起监听的对象
         */
        MessageHelper.addEventListener = function (eventType, callback, thisObject) {
            this.eventDisptcher.addEventListener(eventType, callback, thisObject);
        };
        /**
         * 添加事件(仅执行一次)
         * eventType 通知类型
         * callback  回调方法
         * thisObject  发起监听的对象
         */
        MessageHelper.once = function (eventType, callback, thisObject) {
            this.eventDisptcher.once(eventType, callback, thisObject);
        };
        /**
         * 移除事件
         * eventType 通知类型
         * callback  回调方法
         * thisObject  发起监听的对象
         */
        MessageHelper.removeEventListener = function (eventType, callback, thisObject) {
            this.eventDisptcher.removeEventListener(eventType, callback, thisObject);
        };
        /**
         * 添加事件
         * netMessageType 通知类型
         * callback  回调方法 回调参数为event.data
         * thisObject  发起监听的对象
         */
        MessageHelper.addNetMessage = function (netMessageType, callback, thisObject) {
            this.eventDisptcher.addEventListener(NetManager.getMessageName(netMessageType), callback, thisObject);
        };
        /**
         * 移除事件
         * netMessageType 通知类型
         * callback  回调方法
         * thisObject  发起监听的对象
         */
        MessageHelper.removeNetMessage = function (netMessageType, callback, thisObject) {
            this.eventDisptcher.removeEventListener(NetManager.getMessageName(netMessageType), callback, thisObject);
        };
        /**
         * 发送net事件
         * eventType 通知类型
         * param     参数
         */
        MessageHelper.dispatchNetMessage = function (eventType, param) {
            MessageHelper.dispatchEvent(NetManager.getMessageName(eventType), param);
        };
        /**
         * 发送事件
         * eventType 通知类型
         * param     参数
         */
        MessageHelper.dispatchEvent = function (eventType, param) {
            this.eventDisptcher.dispatchEvent(new egret.Event(eventType, false, false, param));
        };
        /**
         * 判断是否该事件是否已存在，true：已存在
         * eventType 通知类型
         */
        MessageHelper.hasEventListener = function (eventType) {
            return this.eventDisptcher.hasEventListener(eventType);
        };
        MessageHelper.eventDisptcher = new egret.EventDispatcher();
        return MessageHelper;
    }());
    App.MessageHelper = MessageHelper;
    __reflect(MessageHelper.prototype, "App.MessageHelper");
})(App || (App = {}));
