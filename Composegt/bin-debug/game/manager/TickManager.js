var TickManager;
(function (TickManager) {
    var isTicking = false;
    var tickList = [];
    var fastTickList = [];
    /**
     * 开始tick 一秒一次
     */
    function startTick() {
        if (isTicking) {
            return;
        }
        isTicking = true;
        egret.startTick(fastTick, TickManager);
    }
    TickManager.startTick = startTick;
    /**
     * 停止tick 一秒一次
     */
    function stopTick() {
        isTicking = false;
        TimerManager.remove(fastTick, this);
    }
    TickManager.stopTick = stopTick;
    /**
     * 添加tick监听
     * @param callback
     * @param callbackThisObj
     * @param callbackParams
     */
    function addTick(callback, callbackThisObj, callbackParams) {
        if (callback) {
            tickList.push({ callback: callback, callbackThisObj: callbackThisObj, callbackParams: callbackParams });
        }
    }
    TickManager.addTick = addTick;
    /**
     * 移除tick监听
     * @param callback
     * @param callbackThisObj
     */
    function removeTick(callback, callbackThisObj) {
        var l = tickList.length;
        for (var i = l - 1; i >= 0; i--) {
            var callData = tickList[i];
            if (callData.callback == callback && callData.callbackThisObj == callbackThisObj) {
                tickList.splice(i, 1);
                break;
            }
        }
    }
    TickManager.removeTick = removeTick;
    /**
     * 添加tick监听
     * @param callback
     * @param callbackThisObj
     * @param callbackParams
     */
    function addFastTick(callback, callbackThisObj, callbackParams) {
        if (callback) {
            fastTickList.push({ callback: callback, callbackThisObj: callbackThisObj, callbackParams: callbackParams });
        }
    }
    TickManager.addFastTick = addFastTick;
    /**
     * 移除tick监听
     * @param callback
     * @param callbackThisObj
     */
    function removeFastTick(callback, callbackThisObj) {
        var l = fastTickList.length;
        for (var i = l - 1; i >= 0; i--) {
            var callData = fastTickList[i];
            if (callData.callback == callback && callData.callbackThisObj == callbackThisObj) {
                fastTickList.splice(i, 1);
                break;
            }
        }
    }
    TickManager.removeFastTick = removeFastTick;
    function fastTick(t) {
        var istick = false;
        if (GameData.serverTimeMs) {
            var lastt = GameData.serverTimeMs;
            var curT = Date.now() + GameData.serverClientTimeDt;
            if (Math.floor(lastt / 1000) != Math.floor(curT / 1000)) {
                GameData.setServerTime(curT);
                istick = true;
            }
            else {
                GameData.serverTimeMs = curT;
            }
        }
        if (LoginManager.isLoginSuccess) {
            if (fastTickList) {
                var l = fastTickList.length;
                for (var i = l - 1; i >= 0; i--) {
                    var callData = fastTickList[i];
                    if (callData && callData.callback) {
                        var params = callData.callbackParams || [];
                        params.unshift(t);
                        callData.callback.apply(callData.callbackThisObj, params);
                    }
                    else {
                        App.LogUtil.log('lost callbackData');
                    }
                }
            }
        }
        istick && tick();
        return false;
    }
    function tick() {
        if (GameData.serverTime) {
            if (GameData.lastAutoSyncTime == 0) {
                GameData.lastAutoSyncTime = GameData.serverTime;
            }
            if (GameData.pauseSync == false) {
                //检查心跳
                if ((GameData.serverTime - GameData.lastAutoSyncTime) >= 60) {
                    GameData.lastAutoSyncTime = GameData.serverTime;
                    if (Api.rookieVoApi.isInGuiding == false) {
                        NetManager.request(NetRequestConst.REQUEST_USER_SYNC, null);
                    }
                }
                else {
                    //是否跨天，跨天后需要同步数据
                    if (App.DateUtil.checkIsToday(GameData.lastAutoSyncTime) == false && Api.rookieVoApi.isInGuiding == false) {
                        GameData.lastAutoSyncTime = GameData.serverTime;
                        var tout_1 = egret.setTimeout(function () {
                            egret.clearTimeout(tout_1);
                            NetManager.request(NetRequestConst.REQUEST_USER_SYNC, null);
                        }, null, 2000);
                    }
                }
            }
            if (LoginManager.isCreateScene == true && GameData.serverTime % 5 == 0) {
                Api.levyVoApi.levyUpdate();
            }
            // GameData.serverTime = Math.floor((Date.now() + GameData.serverClientTimeDt)/1000);
        }
        if (tickList) {
            var l = tickList.length;
            for (var i = l - 1; i >= 0; i--) {
                var callData = tickList[i];
                if (callData.callback) {
                    callData.callback.apply(callData.callbackThisObj, callData.callbackParams);
                }
            }
        }
    }
})(TickManager || (TickManager = {}));
