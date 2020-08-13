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
    function createSocket(onStartReconnect, onReconnected, onNoconnect, onReceiveData, thisObj) {
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
    var socket;
    (function (socket) {
        /**
         * websocket请求消息队列
         * @param data 请求参数
         * @param callback  请求回调
         * @param callbackTarget 请求回调对象
         * @param st 真实发送请求时间戳
         * @param et 真实接受请求时间戳
         * @param cst 真实发送请求客户端时间ms
         * @param cet 真实接收请求客户端时间ms
         */
        var websocketRequestList = [];
        var isRequesting = false;
        var gameSocket;
        var loadingWait;
        var maxWaitTime = 20000;
        var waitTimeOut = -1;
        var timeoutReport = GameData.waitLdRpt;
        function init() {
            if (!gameSocket) {
                gameSocket = createSocket(onStartReconnect, onReconnected, onNoconnect, onReceiveData, socket);
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
        function connect(host, port, connectSuccess, thisObj) {
            init();
            gameSocket.once(SocketStateConst.SOCKET_CONNECTED, function () {
                if (connectSuccess) {
                    App.LogUtil.log("gamesocket首次连接成功");
                    connectSuccess.apply(thisObj);
                }
            }, socket);
            gameSocket.connect(host, port);
            if (GameData.useNewWS) {
                socket2.connect(host, port); //同时开始链接第二个socket链接，并且不关心结果
            }
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
            App.LogUtil.log("gamescoket连不上，不连了");
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
            if (gameSocket && gameSocket.isNoConnect()) {
                gameSocket.resetAndReconnect(true);
            }
            if (GameData.useNewWS) {
                socket2.checkAndReConnect();
            }
        }
        socket.checkAndReConnect = checkAndReConnect;
        function send(data, callback, callbackTarget, addQueue) {
            if (GameData.useNewWS && !addQueue) {
                socket2.send(data, callback, callbackTarget);
                return;
            }
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
                        try {
                            var reportData = { cmd: data.cmd, cost: maxWaitTime + "timeout" };
                            StatisticsHelper.reportOwnNameLog(JSON.stringify(reportData), "netwait3");
                        }
                        catch (e) { }
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
                if (websocketRequestList[0].data && GameData.serverTime) {
                    websocketRequestList[0].data.clientts = GameData.serverTime;
                }
                websocketRequestList[0].cst = egret.getTimer();
                App.LogUtil.log("socket发送", websocketRequestList[0].data);
                gameSocket.send(websocketRequestList[0].data);
            }
        }
        socket.send = send;
        function closeAndReconnect() {
            gameSocket && gameSocket.close(true);
            if (GameData.useNewWS) {
                socket2.closeAndReconnect();
            }
        }
        socket.closeAndReconnect = closeAndReconnect;
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
                    curRequestData.cet = egret.getTimer();
                    var costT = curRequestData.cet - curRequestData.cst;
                    if (costT >= timeoutReport) {
                        try {
                            var reportData = { cmd: data.cmd, cost: costT };
                            if (PlatformManager.checkIsTWBSp() || PlatformManager.checkIsThSp() || PlatformManager.checkIsEnSp()) {
                                StatisticsHelper.reportOwnNameLog(JSON.stringify(reportData), "netwait3");
                            }
                        }
                        catch (e) { }
                    }
                    if (websocketRequestList.length > 0) {
                        if (websocketRequestList[0].data && GameData.serverTime) {
                            websocketRequestList[0].data.clientts = GameData.serverTime;
                        }
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
                        if (websocketRequestList[0].data && GameData.serverTime) {
                            websocketRequestList[0].data.clientts = GameData.serverTime;
                        }
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
            if (GameData.useNewWS) {
                socket2.dispose();
            }
        }
        socket.dispose = dispose;
    })(socket = NetManager.socket || (NetManager.socket = {}));
    var socket2;
    (function (socket2) {
        /**
         * websocket请求消息队列
         * @param data 请求参数
         * @param callback  请求回调
         * @param callbackTarget 请求回调对象
         * @param st 真实发送请求时间戳
         * @param et 真实接受请求时间戳
         * @param cst 真实发送请求客户端时间ms
         * @param cet 真实接收请求客户端时间ms
         */
        var websocketRequestList = [];
        var isRequesting = false;
        var gameSocket;
        var maxWaitTime = 20000;
        var waitTimeOut = -1;
        // let timeoutReport:number=GameData.waitLdRpt;
        function init() {
            if (!gameSocket) {
                gameSocket = createSocket(onStartReconnect, onReconnected, onNoconnect, onReceiveData, socket2);
            }
        }
        function isConnected() {
            var result = false;
            if (gameSocket) {
                result = gameSocket.isConnected();
            }
            return result;
        }
        socket2.isConnected = isConnected;
        function connect(host, port) {
            init();
            gameSocket.once(SocketStateConst.SOCKET_CONNECTED, function () {
                App.LogUtil.log("gamescoket2 first connect sucess");
            }, socket);
            gameSocket.connect(host, port);
        }
        socket2.connect = connect;
        /**
         * 调用到这个方法说明socket断了，开始自动重连
         * @param e
         */
        function onStartReconnect(e) {
            clearRequestList();
            if (!isReconnecting) {
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
        }
        /**
         * socket重试多次后仍然连不上不再连
         * @param e
         */
        function onNoconnect(e) {
            App.LogUtil.log("gamescoket2连不上，不连了");
            //提示断网
            clearRequestList();
            if (isReconnecting) {
                isReconnecting = false;
            }
            waitToReconnect();
        }
        var waitToRecT = 30000;
        var waitToRecOut = -1;
        function waitToReconnect() {
            if (waitToRecOut == -1) {
                waitToRecOut = egret.setTimeout(function () {
                    checkAndReConnect();
                }, socket2, waitToRecT);
            }
        }
        function clearWaitToReconnect() {
            if (waitToRecOut != -1) {
                egret.clearTimeout(waitToRecOut);
                waitToRecOut = -1;
            }
        }
        function checkAndReConnect() {
            if (gameSocket && gameSocket.isNoConnect()) {
                gameSocket.resetAndReconnect(true);
            }
            clearWaitToReconnect();
        }
        socket2.checkAndReConnect = checkAndReConnect;
        function send(data, callback, callbackTarget) {
            if (!gameSocket.isConnected()) {
                return;
            }
            websocketRequestList.push({ data: data, callback: callback, callbackTarget: callbackTarget });
            if (isRequesting == false) {
                if (waitTimeOut < 0) {
                    waitTimeOut = egret.setTimeout(function () {
                        gameSocket.close(true);
                    }, socket, maxWaitTime);
                }
                isRequesting = true;
                if (websocketRequestList[0].data && GameData.serverTime) {
                    websocketRequestList[0].data.clientts = GameData.serverTime;
                }
                websocketRequestList[0].cst = egret.getTimer();
                App.LogUtil.log("socket2发送", websocketRequestList[0].data);
                gameSocket.send(websocketRequestList[0].data);
            }
        }
        socket2.send = send;
        function onReceiveData(e) {
            var data = e.data;
            App.LogUtil.warn("socket2接收", data);
            if (websocketRequestList.length > 0) {
                var curRequestData = websocketRequestList.shift();
                // curRequestData.cet=egret.getTimer();
                // let costT:number=curRequestData.cet-curRequestData.cst;
                // if(costT>=timeoutReport)
                // {
                // 	try
                // 	{
                // 		let reportData={cmd:data.cmd,cost:costT};
                // 		if(PlatformManager.checkIsTWBSp()||PlatformManager.checkIsThSp()||PlatformManager.checkIsEnSp())
                // 		{
                // 			StatisticsHelper.reportOwnNameLog(JSON.stringify(reportData),"netwait3")
                // 		}
                // 	}
                // 	catch(e){}
                // }
                if (websocketRequestList.length > 0) {
                    if (websocketRequestList[0].data && GameData.serverTime) {
                        websocketRequestList[0].data.clientts = GameData.serverTime;
                    }
                    App.LogUtil.log("socket发送2", websocketRequestList[0].data);
                    gameSocket.send(websocketRequestList[0].data);
                }
                else {
                    isRequesting = false;
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
                    if (websocketRequestList[0].data && GameData.serverTime) {
                        websocketRequestList[0].data.clientts = GameData.serverTime;
                    }
                    App.LogUtil.log("socket发送2", websocketRequestList[0].data);
                    gameSocket.send(websocketRequestList[0].data);
                }
                else {
                    isRequesting = false;
                    if (waitTimeOut > -1) {
                        egret.clearTimeout(waitTimeOut);
                        waitTimeOut = -1;
                    }
                }
            }
        }
        function closeAndReconnect() {
            gameSocket && gameSocket.close(true);
        }
        socket2.closeAndReconnect = closeAndReconnect;
        function clearRequestList() {
            isRequesting = false;
            if (websocketRequestList.length > 0) {
                websocketRequestList.length = 0;
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
            clearWaitToReconnect();
        }
        socket2.dispose = dispose;
    })(socket2 || (socket2 = {}));
    var chat;
    (function (chat) {
        /**
         * websocket请求消息队列
         */
        var websocketRequestList = [];
        var isRequesting = false;
        var chatSocket;
        /** 聊天最大超时时间 */
        var maxWaitTime = 20000;
        /** timeout计时 */
        var waitTimeOut = -1;
        /** 超时统计timout计时 */
        var timeoutReport = GameData.waitLdRpt;
        /** 状态回调列表 */
        var statusCallbackList = [];
        function init() {
            if (!chatSocket) {
                chatSocket = createSocket(onStartReconnect, onReconnected, onNoconnect, onReceiveData, chat);
            }
        }
        /**
         * 添加状态监听
         * @param callback
         * @param calllbackThisObj
         */
        function addStatusCallback(callback, calllbackThisObj) {
            var isFind = false;
            for (var i = statusCallbackList.length - 1; i >= 0; i--) {
                if (statusCallbackList[i].callback == callback && statusCallbackList[i].calllbackThisObj == calllbackThisObj) {
                    isFind = true;
                }
            }
            if (!isFind) {
                statusCallbackList.push({ callback: callback, calllbackThisObj: calllbackThisObj });
            }
        }
        chat.addStatusCallback = addStatusCallback;
        function removeStatusCallback(callback, calllbackThisObj) {
            if (statusCallbackList && statusCallbackList.length > 0) {
                for (var i = statusCallbackList.length - 1; i >= 0; i--) {
                    if (statusCallbackList[i].callback == callback && statusCallbackList[i].calllbackThisObj == calllbackThisObj) {
                        statusCallbackList.splice(i, 1);
                    }
                }
            }
        }
        chat.removeStatusCallback = removeStatusCallback;
        function callbackStatus(status) {
            if (statusCallbackList.length) {
                for (var key in statusCallbackList) {
                    if (statusCallbackList.hasOwnProperty(key)) {
                        var element = statusCallbackList[key];
                        if (element.callback) {
                            element.callback.call(element.calllbackThisObj, status);
                        }
                    }
                }
            }
        }
        function isConnected() {
            var result = false;
            if (chatSocket) {
                result = chatSocket.isConnected() && chatSocket.isNoConnect() == false;
                if (result && chatSocket["isReConnecting"]) {
                    result = !chatSocket["isReConnecting"]();
                }
            }
            return result;
        }
        chat.isConnected = isConnected;
        function getSocketStatus() {
            var status = SocketStateEnum.STATE_CONNECTED;
            if (chatSocket["isReConnecting"] && chatSocket["isReConnecting"]()) {
                status = SocketStateEnum.STATE_RECONNECTING;
            }
            else if (chatSocket.isNoConnect()) {
                status = SocketStateEnum.STATE_NOCONNECT;
            }
            else {
                status = SocketStateEnum.STATE_CONNECTED;
            }
            return status;
        }
        chat.getSocketStatus = getSocketStatus;
        function connect(host, port, connectSuccess, thisObj) {
            init();
            chatSocket.once(SocketStateConst.SOCKET_CONNECTED, function () {
                if (connectSuccess) {
                    App.LogUtil.log("chatsocket首次连接成功");
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
            callbackStatus(SocketStateEnum.STATE_RECONNECTING);
            if (websocketRequestList.length > 0) {
                var callback = websocketRequestList[0].callback;
                if (callback) {
                    callback.call(websocketRequestList[0].callbackTarget, { status: "fail" });
                }
            }
            clearRequestList();
            if (!isReconnecting) {
                // NetLoading.show();
                isReconnecting = true;
            }
        }
        var isReconnecting = false;
        /**
         * socket 重连成功
         * @param e
         */
        function onReconnected(e) {
            callbackStatus(SocketStateEnum.STATE_RECONNECTED);
            isReconnecting = false;
            LoginManager.reLoginChat();
        }
        /**
         * socket重试多次后仍然连不上不再连
         * @param e
         */
        function onNoconnect(e) {
            callbackStatus(SocketStateEnum.STATE_NOCONNECT);
            App.LogUtil.log("chatscoket连不上，不连了");
            clearRequestList();
            if (isReconnecting) {
                // NetLoading.hide();
                isReconnecting = false;
            }
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
            if (callbackTarget) {
                console.log("this.push" + callbackTarget.hashCode);
            }
            websocketRequestList.push({ data: data, callback: callback, callbackTarget: callbackTarget });
            realSend();
        }
        chat.send = send;
        /**
         * 真正调用js发送chat请求接口
         */
        function realSend() {
            if (isRequesting == false) {
                if (waitTimeOut < 0) {
                    waitTimeOut = egret.setTimeout(function () {
                        try {
                            var reportData = { cmd: websocketRequestList[0].data.cmd, cost: maxWaitTime + "timeout" };
                            StatisticsHelper.reportOwnNameLog(JSON.stringify(reportData), "chatwait3");
                        }
                        catch (e) { }
                        var callback = websocketRequestList[0].callback;
                        if (callback) {
                            callback.call(websocketRequestList[0].callbackTarget, { status: "timeout" });
                        }
                        chatSocket.close(true);
                        if (waitTimeOut > -1) {
                            egret.clearTimeout(waitTimeOut);
                            waitTimeOut = -1;
                        }
                    }, socket, maxWaitTime);
                }
                isRequesting = true;
                if (websocketRequestList[0].data && GameData.serverTime) {
                    websocketRequestList[0].data.clientts = GameData.serverTime;
                }
                websocketRequestList[0].cst = egret.getTimer();
                App.LogUtil.log("chatsocket发送", websocketRequestList[0].data);
                chatSocket.send(websocketRequestList[0].data);
            }
        }
        function resend() {
        }
        function closeAndReconnect() {
            chatSocket && chatSocket.close(true);
        }
        chat.closeAndReconnect = closeAndReconnect;
        function onReceiveData(e) {
            var data = e.data;
            App.LogUtil.warn("chatSocket接收", data);
            if (websocketRequestList.length > 0) {
                var curRequestData = websocketRequestList[0];
                if (data.type != "chat" || (curRequestData.data.clientts && data.sender == Api.playerVoApi.getPlayerID() && data.clientts == curRequestData.data.clientts)) {
                    if (waitTimeOut > -1) {
                        egret.clearTimeout(waitTimeOut);
                        waitTimeOut = -1;
                    }
                    curRequestData = websocketRequestList.shift();
                }
                else {
                    NetManager.formatReceiveChat(data);
                    return;
                }
                curRequestData.cet = egret.getTimer();
                var costT = curRequestData.cet - curRequestData.cst;
                if (costT >= timeoutReport) {
                    try {
                        var reportData = { cmd: data.cmd, cost: costT };
                        if (PlatformManager.checkIsTWBSp() || PlatformManager.checkIsThSp() || PlatformManager.checkIsEnSp()) {
                            StatisticsHelper.reportOwnNameLog(JSON.stringify(reportData), "netwait3");
                        }
                    }
                    catch (e) { }
                }
                isRequesting = false;
                if (websocketRequestList.length > 0) {
                    realSend();
                }
                else {
                    if (waitTimeOut > -1) {
                        egret.clearTimeout(waitTimeOut);
                        waitTimeOut = -1;
                    }
                }
                NetManager.formatReceiveChat(data);
                var callback = curRequestData.callback;
                if (callback) {
                    if (data.type == "blocked") {
                        App.CommonUtil.showTip(LanguageManager.getlocal("chatMsgBlocked"));
                    }
                    callback.call(curRequestData.callbackTarget, { status: "success" });
                }
                //todo 接收消息后处理
            }
            else {
                isRequesting = false;
                NetManager.formatReceiveChat(data);
                if (waitTimeOut > -1) {
                    egret.clearTimeout(waitTimeOut);
                    waitTimeOut = -1;
                }
            }
        }
        function clearRequestList() {
            isRequesting = false;
            if (websocketRequestList.length > 0) {
                websocketRequestList.length = 0;
            }
            isRequesting = false;
            if (waitTimeOut > -1) {
                egret.clearTimeout(waitTimeOut);
                waitTimeOut = -1;
            }
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
//# sourceMappingURL=NetManager.js.map