/**
 * 网络通信管理
 * author 陈可
 * date 2017/9/8
 * @class NetManager
 */
var NetManager;
(function (NetManager) {
    var http;
    (function (http) {
        var gameHttp;
        var isRequesting = false;
        /**
         * http请求消息队列
         */
        var httpRequestList = [];
        /**
         * 初始化http数据
         */
        function initHttp() {
            if (!gameHttp) {
                gameHttp = new Http();
            }
        }
        /**
         * 发送post请求
         * @param host 请求地址
         * @param data 请求数据
         */
        function post(host, data, callback, errorCallback, callbackTarget) {
            request(host, data, egret.HttpMethod.POST, callback, errorCallback, callbackTarget);
        }
        http.post = post;
        /**
         * 发送get请求
         * @param host 请求地址
         * @param data 请求数据
         */
        function get(host, data, callback, errorCallback, callbackTarget) {
            request(host, data, egret.HttpMethod.GET, callback, errorCallback, callbackTarget);
        }
        http.get = get;
        function request(host, data, method, callback, errorCallback, callbackTarget) {
            initHttp();
            httpRequestList.push({ host: host, data: data, method: method, callback: callback, errorCallback: errorCallback, callbackTarget: callbackTarget });
            if (isRequesting == false) {
                isRequesting = true;
                gameHttp.request(host, data, method, onReceiveData, onError, http);
            }
        }
        function onError() {
            var curRequestData = httpRequestList.shift();
            var errorCallback = curRequestData.errorCallback;
            if (httpRequestList.length < 1) {
                if (isRequesting) {
                    isRequesting = false;
                }
            }
            if (errorCallback) {
                errorCallback.call(curRequestData.callbackTarget);
            }
        }
        /**
         * 发送post请求，在请求队列外，不关心结果和是否成功
         * @param host 请求地址
         * @param data 请求数据
         */
        function getOutQueue(host, data) {
            requestOutQueue(host, data, egret.HttpMethod.GET);
        }
        http.getOutQueue = getOutQueue;
        /**
         * 发送post请求，在请求队列外，不关心结果和是否成功
         * @param host 请求地址
         * @param data 请求数据
         */
        function postOutQueue(host, data) {
            requestOutQueue(host, data, egret.HttpMethod.POST);
        }
        http.postOutQueue = postOutQueue;
        /**
         * 队列之外请求
         */
        function requestOutQueue(host, data, method) {
            var getxhr = new XMLHttpRequest();
            if (host && host.indexOf("http") < 0) {
                host = Http.getProtocol() + host;
            }
            if (method == egret.HttpMethod.POST) {
                getxhr.open(method, host, true);
                getxhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                getxhr.send(App.StringUtil.toString(data));
            }
            else {
                var requestParams = "";
                for (var key in data) {
                    if (requestParams == "") {
                        requestParams += "?" + key + "=" + App.StringUtil.toString(data[key]);
                    }
                    else {
                        requestParams += "&" + key + "=" + App.StringUtil.toString(data[key]);
                    }
                }
                host += requestParams;
                getxhr.open(method, host, true);
                getxhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                getxhr.send();
            }
        }
        function onReceiveData(resposeData) {
            var data = undefined;
            if (typeof (resposeData) == "string") {
                data = JSON.parse(resposeData);
            }
            else {
                data = resposeData;
            }
            App.LogUtil.warn("http接收", data);
            if (httpRequestList.length > 0) {
                var curRequestData = httpRequestList.shift();
                if (httpRequestList.length > 0) {
                    var host = httpRequestList[0].host;
                    var data_1 = httpRequestList[0].data;
                    var method = httpRequestList[0].method;
                    gameHttp.request(host, data_1, method, onReceiveData, onError, http);
                }
                else {
                    isRequesting = false;
                }
                var callback = curRequestData.callback;
                if (callback) {
                    callback.call(curRequestData.callbackTarget, data);
                }
                //todo 接收消息后处理
            }
            else {
                if (httpRequestList.length > 0) {
                    var host = httpRequestList[0].host;
                    var data_2 = httpRequestList[0].data;
                    var method = httpRequestList[0].method;
                    gameHttp.request(host, data_2, method, onReceiveData, onError, http);
                }
                else {
                    isRequesting = false;
                }
            }
        }
        function dispose() {
            if (gameHttp) {
                gameHttp.abort();
            }
            if (httpRequestList.length > 0) {
                httpRequestList.length = 0;
            }
            isRequesting = false;
        }
        http.dispose = dispose;
    })(http = NetManager.http || (NetManager.http = {}));
    var socket;
    (function (socket) {
        /**
         * websocket请求消息队列
         */
        var websocketRequestList = [];
        var isRequesting = false;
        var gameSocket;
        var loadingWait;
        var maxWaitTime = 20000;
        var waitTimeOut = -1;
        function init() {
            if (!gameSocket) {
                gameSocket = createSocket();
            }
        }
        function isConnected() {
            var result = false;
            if (gameSocket) {
                result = gameSocket.isConnected();
            }
            return result;
        }
        socket.isConnected = isConnected;
        function createSocket() {
            App.LogUtil.log("checkWeiduan" + PlatformManager.checkIsWeiduan());
            var tmpSocket;
            if (PlatformManager.checkUseRSDKSocket()) {
                tmpSocket = new ClientSocket();
            }
            else {
                tmpSocket = new Socket();
            }
            tmpSocket.addEventListener(SocketStateConst.SOCKET_START_RECONNECT, onStartReconnect, socket);
            tmpSocket.addEventListener(SocketStateConst.SOCKET_RECONNECTED, onReconnected, socket);
            tmpSocket.addEventListener(SocketStateConst.SOCKET_NOCONNECT, onNoconnect, socket);
            tmpSocket.addEventListener(SocketStateConst.SOCKET_DATA, onReceiveData, socket);
            return tmpSocket;
        }
        function connect(host, port, connectSuccess, thisObj) {
            init();
            gameSocket.once(SocketStateConst.SOCKET_CONNECTED, function () {
                if (connectSuccess) {
                    App.LogUtil.log("gamesocket首次连接成功");
                    connectSuccess.apply(thisObj);
                }
            }, socket);
            gameSocket.connect(host, port);
        }
        socket.connect = connect;
        /**
         * 调用到这个方法说明socket断了，开始自动重连
         * @param e
         */
        function onStartReconnect(e) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_GAMESOCKET_RECOUNT);
            if (websocketRequestList.length > 0) {
                var callback = websocketRequestList[0].callback;
                if (callback) {
                    callback.call(websocketRequestList[0].callbackTarget, { status: "fail", data: { ret: ResponseEnums.socketError, cmd: websocketRequestList[0].data.cmd, data: {} } });
                }
            }
            clearRequestList();
            if (!isReconnecting) {
                NetLoading.show();
                isReconnecting = true;
            }
        }
        var isReconnecting = false;
        /**
         * socket 重连成功
         * @param e
         */
        function onReconnected(e) {
            isReconnecting = false;
            LoginManager.reLoginGame();
        }
        /**
         * socket重试多次后仍然连不上不再连
         * @param e
         */
        function onNoconnect(e) {
            App.LogUtil.log("断网了");
            //提示断网
            clearRequestList();
            if (isReconnecting) {
                NetLoading.hide();
                isReconnecting = false;
            }
            LoginManager.hideLoginLoading();
            ViewController.getInstance().openView(ViewConst.POPUP.NETERRORPOPUPVIEW);
        }
        function checkAndReConnect() {
            if (gameSocket.isNoConnect()) {
                gameSocket.resetAndReconnect(true);
            }
        }
        socket.checkAndReConnect = checkAndReConnect;
        function send(data, callback, callbackTarget) {
            if (!gameSocket.isConnected()) {
                return;
            }
            websocketRequestList.push({ data: data, callback: callback, callbackTarget: callbackTarget });
            if (isRequesting == false) {
                if (!loadingWait) {
                    loadingWait = NetLoadingWait.showMask(500);
                }
                else {
                    loadingWait.showMask();
                }
                if (waitTimeOut < 0) {
                    waitTimeOut = egret.setTimeout(function () {
                        loadingWait.hideMask();
                        var callback = websocketRequestList[0].callback;
                        if (callback) {
                            callback.call(websocketRequestList[0].callbackTarget, { status: "timeout", data: { ret: ResponseEnums.socketError, cmd: websocketRequestList[0].data.cmd, data: {} } });
                        }
                        gameSocket.close(true);
                    }, socket, maxWaitTime);
                }
                // App.LogUtil.show("netshow");
                isRequesting = true;
                App.LogUtil.log("socket发送", websocketRequestList[0].data);
                gameSocket.send(websocketRequestList[0].data);
            }
        }
        socket.send = send;
        function resend() {
        }
        function onReceiveData(e) {
            var data = e.data;
            App.LogUtil.warn("socket接收", data);
            if (String(data.cmd).indexOf("push.") == 0) {
                NetManager.formatPushData({ status: "success", data: data });
            }
            else {
                if (websocketRequestList.length > 0) {
                    var curRequestData = websocketRequestList.shift();
                    if (websocketRequestList.length > 0) {
                        App.LogUtil.log("socket发送", websocketRequestList[0].data);
                        gameSocket.send(websocketRequestList[0].data);
                    }
                    else {
                        isRequesting = false;
                        if (loadingWait) {
                            loadingWait.hideMask();
                            // App.LogUtil.show("nethide");
                        }
                        if (waitTimeOut > -1) {
                            egret.clearTimeout(waitTimeOut);
                            waitTimeOut = -1;
                        }
                    }
                    var callback = curRequestData.callback;
                    if (callback) {
                        callback.call(curRequestData.callbackTarget, { status: "success", data: data });
                    }
                    //todo 接收消息后处理
                }
                else {
                    if (websocketRequestList.length > 0) {
                        App.LogUtil.log("socket发送", websocketRequestList[0].data);
                        gameSocket.send(websocketRequestList[0].data);
                    }
                    else {
                        isRequesting = false;
                        if (loadingWait) {
                            loadingWait.hideMask();
                            // App.LogUtil.show("nethide");
                        }
                        if (waitTimeOut > -1) {
                            egret.clearTimeout(waitTimeOut);
                            waitTimeOut = -1;
                        }
                    }
                }
                // NetLoading.hide();
            }
        }
        function clearRequestList() {
            isRequesting = false;
            if (websocketRequestList.length > 0) {
                websocketRequestList.length = 0;
            }
            if (loadingWait) {
                loadingWait.hideMask();
            }
            if (waitTimeOut > -1) {
                egret.clearTimeout(waitTimeOut);
                waitTimeOut = -1;
            }
        }
        function dispose() {
            if (gameSocket) {
                gameSocket.close();
            }
            clearRequestList();
        }
        socket.dispose = dispose;
    })(socket = NetManager.socket || (NetManager.socket = {}));
    var chat;
    (function (chat) {
        /**
         * websocket请求消息队列
         */
        var websocketRequestList = [];
        var isRequesting = false;
        var chatSocket;
        function init() {
            if (!chatSocket) {
                chatSocket = createSocket();
            }
        }
        function isConnected() {
            var result = false;
            if (chatSocket) {
                result = chatSocket.isConnected();
            }
            return result;
        }
        chat.isConnected = isConnected;
        function createSocket() {
            App.LogUtil.log("checkWeiduan" + PlatformManager.checkIsWeiduan());
            var tmpSocket;
            if (PlatformManager.checkUseRSDKSocket()) {
                tmpSocket = new ClientSocket();
            }
            else {
                tmpSocket = new Socket();
            }
            tmpSocket.addEventListener(SocketStateConst.SOCKET_START_RECONNECT, onStartReconnect, socket);
            tmpSocket.addEventListener(SocketStateConst.SOCKET_RECONNECTED, onReconnected, socket);
            tmpSocket.addEventListener(SocketStateConst.SOCKET_NOCONNECT, onNoconnect, socket);
            tmpSocket.addEventListener(SocketStateConst.SOCKET_DATA, onReceiveData, socket);
            return tmpSocket;
        }
        function connect(host, port, connectSuccess, thisObj) {
            init();
            chatSocket.once(SocketStateConst.SOCKET_CONNECTED, function () {
                if (connectSuccess) {
                    connectSuccess.apply(thisObj);
                }
            }, socket);
            chatSocket.connect(host, port);
        }
        chat.connect = connect;
        /**
         * 调用到这个方法说明socket断了，开始自动重连
         * @param e
         */
        function onStartReconnect(e) {
            isRequesting = false;
            websocketRequestList.length = 0;
        }
        /**
         * socket 重连成功
         * @param e
         */
        function onReconnected(e) {
            LoginManager.reLoginChat();
        }
        /**
         * socket重试多次后仍然连不上不再连
         * @param e
         */
        function onNoconnect(e) {
            // ViewController.getInstance().openView(ViewConst.POPUP.NETERRORPOPUPVIEW);
        }
        function checkAndReConnect() {
            if (chatSocket && chatSocket.isNoConnect()) {
                chatSocket.resetAndReconnect(true);
            }
        }
        chat.checkAndReConnect = checkAndReConnect;
        /**
         * 发送聊天数据
         * @param data 数据
         * @param callback 回调，可选，不传走formatReceiveChat
         * @param callbackTarget 回调方法拥有对象
         */
        function send(data, callback, callbackTarget) {
            if (!chatSocket.isConnected()) {
                return;
            }
            websocketRequestList.push({ data: data, callback: callback, callbackTarget: callbackTarget });
            if (isRequesting == false) {
                isRequesting = true;
                chatSocket.send(websocketRequestList[0].data);
            }
        }
        chat.send = send;
        function resend() {
        }
        function onReceiveData(e) {
            var data = e.data;
            App.LogUtil.warn("chatSocket接收", data);
            if (websocketRequestList.length > 0) {
                var curRequestData = websocketRequestList.shift();
                if (websocketRequestList.length > 0) {
                    chatSocket.send(websocketRequestList[0].data);
                }
                else {
                    isRequesting = false;
                }
                var callback = curRequestData.callback;
                if (callback) {
                    callback.call(curRequestData.callbackTarget, data);
                }
                else {
                    NetManager.formatReceiveChat(data);
                }
                //todo 接收消息后处理
            }
            else {
                isRequesting = false;
                NetManager.formatReceiveChat(data);
            }
        }
        function clearRequestList() {
            if (websocketRequestList.length > 0) {
                websocketRequestList.length = 0;
            }
            isRequesting = false;
        }
        function dispose() {
            if (chatSocket) {
                chatSocket.close();
            }
            clearRequestList();
        }
        chat.dispose = dispose;
    })(chat = NetManager.chat || (NetManager.chat = {}));
    /**
     * 检测是否在线
     */
    function checkIsOnline(callback) {
        if (isGameOnline) {
            if (window["RSDKPlatform"] && window["RSDKPlatform"].getNetworkStatus && window["RSDKPlatform"].getNetworkStatus() == "0") {
                isGameOnline = false;
                callback(isGameOnline);
            }
            else {
                NetManager.http.get(ServerCfg.baseUrl + "/testonline.php", null, function () {
                    isGameOnline = true;
                    callback(isGameOnline);
                }, function () {
                    isGameOnline = false;
                    callback(isGameOnline);
                }, NetManager);
            }
        }
        else {
            callback(isGameOnline);
        }
    }
    NetManager.checkIsOnline = checkIsOnline;
})(NetManager || (NetManager = {}));
var isGameOnline = true;
window.addEventListener("online", function () {
    console.log("game online");
    isGameOnline = true;
});
window.addEventListener("offline", function () {
    console.log("game offline");
    isGameOnline = false;
});
