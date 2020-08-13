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
 * socket封装
 * author 陈可
 * date 2017/9/8
 * @class Socket
 */
var Socket = (function (_super) {
    __extends(Socket, _super);
    function Socket() {
        var _this = _super.call(this) || this;
        _this._socket = undefined;
        _this._connectState = SocketStateEnum.STATE_INIT;
        _this._host = undefined;
        _this._port = undefined;
        _this._reconnectCount = 0;
        _this._maxReconnectCount = 10;
        _this._operaClose = false;
        _this._isCloseAndTryConnect = false;
        /** 尝试连接超时时间 */
        _this._connectTimeout = 20000;
        _this._connectTimeoutCount = -1;
        _this.init();
        return _this;
    }
    Socket.prototype.init = function () {
        this.initSocket();
        this._dataMsg = new JsonMsg();
        this._connectState = SocketStateEnum.STATE_INIT;
    };
    Socket.prototype.initSocket = function () {
        this._socket = new egret.WebSocket();
        this._socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveData, this);
        this._socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        this._socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        this._socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
    };
    /**
     * 开始Socket连接
     */
    Socket.prototype.connect = function (host, port) {
        if (App.DeviceUtil.IsHtml5()) {
            if (!window["WebSocket"]) {
                App.LogUtil.log("不支持WebSocket");
                return;
            }
        }
        this._operaClose = false;
        this._host = host;
        this._port = port;
        if (this._dataMsg instanceof egret.ByteArray) {
            this._socket.type = egret.WebSocket.TYPE_BINARY;
        }
        App.LogUtil.log("socket开始连接: " + this._host + ":" + this._port);
        if (this._connectState == SocketStateEnum.STATE_RECONNECTING) { }
        else {
            this._connectState = SocketStateEnum.STATE_CONNECTING;
        }
        if (NetManager.checkHttps() || ((PlatformManager.checkIsWxSp() || PlatformManager.checkIsWxmgSp() || PlatformManager.checkIsWxAppSp() || PlatformManager.checkIsQQXYXSp()) && this._host.indexOf("192.168.") < 0) || App.TestUtil.getTestPlat() == "wx") {
            var addValue = 1000;
            if (Number(this._port) == 10000 || Number(this._port) == 10001) {
                addValue = 1100;
            }
            else if (Number(this._port) == 2002 || Number(this._port) == 1002) {
                addValue = 100;
            }
            this._socket.connectByUrl("wss://" + this._host + ":" + String(Number(this._port) + addValue));
        }
        else {
            this._socket.connect(this._host, this._port);
        }
        this.clearConnectTime();
        this._connectTimeoutCount = egret.setTimeout(this.connectTimeoutHandler, this, this._connectTimeout);
    };
    Socket.prototype.connectTimeoutHandler = function () {
        this.clearConnectTime();
        this.onSocketClose(null);
    };
    Socket.prototype.clearConnectTime = function () {
        if (this._connectTimeoutCount > -1) {
            egret.clearTimeout(this._connectTimeoutCount);
            this._connectTimeoutCount = -1;
        }
    };
    Socket.prototype.close = function (isCloseAndTryConnect) {
        App.LogUtil.log("close");
        if (this._socket) {
            this._isCloseAndTryConnect = Boolean(isCloseAndTryConnect);
            this._operaClose = true;
            this.removeEvt();
            this._socket.close();
            if (this._isCloseAndTryConnect) {
                this.resetAndReconnect();
            }
            else {
                this.resetSocket();
            }
        }
    };
    /**
     * 重新连接
     */
    Socket.prototype.reconnect = function () {
        this._reconnectCount++;
        if (this._reconnectCount < this._maxReconnectCount) {
            App.LogUtil.log("socket开始重连" + this._reconnectCount);
            this._connectState = SocketStateEnum.STATE_RECONNECTING;
            this.connect(this._host, this._port);
        }
        else {
            App.LogUtil.log("socket次数" + this._reconnectCount, "不再重连");
            this._connectState = SocketStateEnum.STATE_NOCONNECT;
            this.dispatchEvent(egret.Event.create(egret.Event, SocketStateConst.SOCKET_NOCONNECT));
            this._isCloseAndTryConnect = false;
        }
    };
    /**
     * 服务器连接成功
     */
    Socket.prototype.onSocketOpen = function (e) {
        this.clearConnectTime();
        App.LogUtil.log("socket连接成功");
        this._isCloseAndTryConnect = false;
        this._reconnectCount = 0;
        if (this._connectState == SocketStateEnum.STATE_RECONNECTING) {
            this._connectState = SocketStateEnum.STATE_RECONNECTED;
            this.dispatchEvent(egret.Event.create(egret.Event, SocketStateConst.SOCKET_RECONNECTED));
        }
        else {
            this._connectState = SocketStateEnum.STATE_CONNECTED;
            this.dispatchEvent(egret.Event.create(egret.Event, SocketStateConst.SOCKET_CONNECTED));
        }
    };
    Socket.prototype.onReceiveData = function (e) {
        App.LogUtil.log("socket接收");
        var receiveData = this._dataMsg.receive(this._socket);
        var dataEvent = egret.Event.create(egret.Event, SocketStateConst.SOCKET_DATA);
        dataEvent.data = receiveData;
        this.dispatchEvent(dataEvent);
    };
    Socket.prototype.onSocketClose = function (e) {
        if (e) {
            this.clearConnectTime();
        }
        if (this._operaClose) {
            App.LogUtil.log("主动操作关闭socket");
            this._connectState = SocketStateEnum.STATE_INIT;
            if (this._isCloseAndTryConnect) {
                this._reconnectCount = 0;
            }
            else {
                return;
            }
        }
        App.LogUtil.log("socket关闭，开始检测重连");
        this.resetAndReconnect();
    };
    Socket.prototype.onSocketError = function (e) {
        this.clearConnectTime();
        if (LoginManager.isLoginSuccess) {
            App.LogUtil.log("socket错误，开始检测重连");
            this.resetAndReconnect();
        }
        else {
            this._reconnectCount = 0;
            this.resetSocket();
        }
    };
    Socket.prototype.resetAndReconnect = function (resetCount) {
        if (resetCount === void 0) { resetCount = false; }
        if (resetCount) {
            this._reconnectCount = 0;
        }
        this.resetSocket();
        this.reconnect();
        if (this._reconnectCount < this._maxReconnectCount) {
            this.dispatchEvent(egret.Event.create(egret.Event, SocketStateConst.SOCKET_START_RECONNECT));
        }
    };
    /**
     * 发送数据
     * @param data 数据对象json格式
     */
    Socket.prototype.send = function (data) {
        if (!data) {
            data = {};
        }
        this._dataMsg.send(this._socket, data);
    };
    Socket.prototype.isConnected = function () {
        return this._socket.connected;
    };
    /**
     * 是否正在重连
     */
    Socket.prototype.isReConnecting = function () {
        return this._connectState == SocketStateEnum.STATE_RECONNECTING;
    };
    Socket.prototype.isNoConnect = function () {
        return this._connectState == SocketStateEnum.STATE_NOCONNECT;
    };
    Socket.prototype.resetSocket = function () {
        this.removeEvt();
        this.clearConnectTime();
        this.initSocket();
    };
    Socket.prototype.removeEvt = function () {
        if (this._socket) {
            this._socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveData, this);
            this._socket.removeEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
            this._socket.removeEventListener(egret.Event.CLOSE, this.onSocketClose, this);
            this._socket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
        }
    };
    /**
     * 调用这个方法说明这个对象不再使用了
     */
    Socket.prototype.dispose = function () {
        this.removeEvt();
        this.clearConnectTime();
        this._dataMsg = null;
        this._connectState = null;
        this._host = null;
        this._port = null;
        this._socket = null;
        this._operaClose = false;
        this._isCloseAndTryConnect = false;
    };
    return Socket;
}(egret.EventDispatcher));
__reflect(Socket.prototype, "Socket");
