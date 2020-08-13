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
 * JSON消息处理
 * author 陈可
 * date 2017/9/8
 * @class JsonMsg
 */
var JsonMsg = (function (_super) {
    __extends(JsonMsg, _super);
    function JsonMsg() {
        return _super.call(this) || this;
    }
    /**
     * 发送消息处理
     * @param socket 消息socket
     * @param data 消息数据
     */
    JsonMsg.prototype.send = function (socket, data) {
        var sendData = this.encode(data);
        if (sendData) {
            socket.type = egret.WebSocket.TYPE_STRING;
            socket.writeUTF(sendData);
        }
    };
    /**
     * 接收消息处理
     * @param socket 消息socket
     */
    JsonMsg.prototype.receive = function (socket) {
        var dataStr = socket.readUTF();
        return this.decode(dataStr);
    };
    /**
     * 消息封装
     * @param data
     */
    JsonMsg.prototype.encode = function (data) {
        var dataStr = App.StringUtil.toString(data);
        return dataStr;
    };
    /**
     * 解析数据
     * @param dataStr
     */
    JsonMsg.prototype.decode = function (dataStr) {
        var receiveData = JSON.parse(dataStr);
        return receiveData;
    };
    JsonMsg.prototype.dispose = function () {
    };
    return JsonMsg;
}(BaseClass));
__reflect(JsonMsg.prototype, "JsonMsg");
