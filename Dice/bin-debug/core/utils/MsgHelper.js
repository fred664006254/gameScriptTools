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
    var MsgHelper = (function () {
        function MsgHelper() {
        }
        /**
         * 添加事件
         * eventType 通知类型
         * callback  回调方法 回调参数为event.data
         * thisObject  发起监听的对象
         */
        MsgHelper.addEvt = function (eventType, callback, thisObject) {
            this.evtD.addEventListener(eventType, callback, thisObject);
        };
        /**
         * 添加事件(仅执行一次)
         * eventType 通知类型
         * callback  回调方法
         * thisObject  发起监听的对象
         */
        MsgHelper.once = function (eventType, callback, thisObject) {
            this.evtD.once(eventType, callback, thisObject);
        };
        /**
         * 移除事件
         * eventType 通知类型
         * callback  回调方法
         * thisObject  发起监听的对象
         */
        MsgHelper.removeEvt = function (eventType, callback, thisObject) {
            this.evtD.removeEventListener(eventType, callback, thisObject);
        };
        /**
         * 发送事件
         * eventType 通知类型
         * param     参数
         */
        MsgHelper.dispEvt = function (eventType, param) {
            this.evtD.dispatchEvent(new egret.Event(eventType, false, false, param));
        };
        /**
         * 判断是否该事件是否已存在，true：已存在
         * eventType 通知类型
         */
        MsgHelper.hasEvt = function (eventType) {
            return this.evtD.hasEventListener(eventType);
        };
        MsgHelper.evtD = new egret.EventDispatcher();
        return MsgHelper;
    }());
    App.MsgHelper = MsgHelper;
    __reflect(MsgHelper.prototype, "App.MsgHelper");
})(App || (App = {}));
//# sourceMappingURL=MsgHelper.js.map