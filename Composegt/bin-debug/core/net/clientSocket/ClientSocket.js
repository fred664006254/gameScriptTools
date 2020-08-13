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
var ClientSocket = (function (_super) {
    __extends(ClientSocket, _super);
    function ClientSocket() {
        var _this = _super.call(this) || this;
        _this.connected = false;
        _this._connectState = SocketStateEnum.STATE_INIT;
        _this._operaClose = false;
        _this._isCloseAndTryConnect = false;
        ClientSocket._newIndex++;
        _this._name = "ClientSocket" + ClientSocket._newIndex;
        App.LogUtil.log(_this._name);
        _this._clientSocket = new RSDKWebSocket(_this._name);
        window[_this._name] = _this;
        _this.setWebSocketCallback();
        return _this;
    }
    ClientSocket.prototype.connect = function (host, port) {
        App.LogUtil.log("clientsocket连接" + host + port + "name=" + this._name);
        this._operaClose = false;
        this._host = host;
        this._port = port;
        this._clientSocket.connectWebSocket(this._name, "ws://" + host + ":" + port);
    };
    ClientSocket.prototype.isConnected = function () {
        return this.connected;
    };
    ClientSocket.prototype.isNoConnect = function () {
        return this._connectState == SocketStateEnum.STATE_NOCONNECT;
    };
    ClientSocket.prototype.send = function (data) {
        App.LogUtil.log("send::name=" + this._name);
        this._clientSocket.sendWebSocketMessage(this._name, App.StringUtil.toString(data));
    };
    ClientSocket.prototype.disconnectWebSocket = function () {
        this._clientSocket.disconnectWebSocket(this._name);
    };
    ClientSocket.prototype.setWebSocketCallback = function () {
        this._clientSocket.setWebSocketCallback(this._name, this.callback.bind(this));
        // window[this._name].webSocketCallback=this.callback.bind(this);
    };
    ClientSocket.prototype.callback = function (code, msg) {
        App.LogUtil.log("clientsocket回调" + code + "::" + msg);
        if (code) {
            switch (code) {
                case RSDKCode.RET_WEBSOCKET_CONNECT_SUCCEED:
                    this._isCloseAndTryConnect = false;
                    this.connected = true;
                    this._connectState = SocketStateEnum.STATE_CONNECTED;
                    this.dispatchEvent(egret.Event.create(egret.Event, SocketStateConst.SOCKET_CONNECTED));
                    break;
                case RSDKCode.RET_WEBSOCKET_CONNECT_FAIL:
                    this.connected = false;
                    this._connectState = SocketStateEnum.STATE_INIT;
                    break;
                case RSDKCode.RET_WEBSOCKET_CONNECT_DIS://只有手动关闭socket才会走的这里
                    this.connected = false;
                    this._connectState = SocketStateEnum.STATE_INIT;
                    // this.dispatchEvent(egret.Event.create(egret.Event,SocketStateConst.SOCKET_NOCONNECT));
                    if (this._operaClose) {
                        if (this._isCloseAndTryConnect) {
                            this.resetAndReconnect();
                        }
                    }
                    break;
                case RSDKCode.RET_WEBSOCKET_RECEIVE_MSG_SUCCEED:
                    var receiveData = void 0;
                    try {
                        receiveData = JSON.parse(msg);
                    }
                    catch (e) {
                        receiveData = JSON.parse(msg);
                    }
                    var dataEvent = egret.Event.create(egret.Event, SocketStateConst.SOCKET_DATA);
                    dataEvent.data = receiveData;
                    this.dispatchEvent(dataEvent);
                    break;
                case RSDKCode.RET_WEBSOCKET_CONNECT_TIMEOUT:
                case RSDKCode.RET_WEBSOCKET_ERROR:
                    this._isCloseAndTryConnect = false;
                    this.connected = false;
                    this._connectState = SocketStateEnum.STATE_NOCONNECT;
                    this.dispatchEvent(egret.Event.create(egret.Event, SocketStateConst.SOCKET_NOCONNECT));
                    break;
            }
        }
    };
    ClientSocket.prototype.resetAndReconnect = function (resetCount) {
        if (resetCount === void 0) { resetCount = false; }
        this.connect(this._host, this._port);
    };
    ClientSocket.prototype.close = function (isCloseAndTryConnect) {
        this._isCloseAndTryConnect = Boolean(isCloseAndTryConnect);
        this._operaClose = true;
        this.disconnectWebSocket();
    };
    ClientSocket.prototype.dispose = function () {
        this._operaClose = false;
        this._isCloseAndTryConnect = false;
    };
    ClientSocket._newIndex = 0;
    return ClientSocket;
}(egret.EventDispatcher));
__reflect(ClientSocket.prototype, "ClientSocket");
