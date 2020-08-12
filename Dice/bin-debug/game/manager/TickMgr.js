var TickMgr;
(function (TickMgr) {
    var isTicking = false;
    var tickList = [];
    var fastTickList = [];
    var nowdayzero = 0;
    /**
     * 开始tick 一帧一次，一秒一次
     */
    function startTick() {
        if (isTicking) {
            return;
        }
        isTicking = true;
        // TimerMgr.doTimer(1000,0,tick,TickMgr);
        egret.startTick(fastTick, TickMgr);
    }
    TickMgr.startTick = startTick;
    /**
     * 停止tick 一帧一次，一秒一次
     */
    function stopTick() {
        isTicking = false;
        // TimerMgr.remove(tick,this);
        egret.stopTick(fastTick, TickMgr);
    }
    TickMgr.stopTick = stopTick;
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
    TickMgr.addTick = addTick;
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
    TickMgr.removeTick = removeTick;
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
    TickMgr.addFastTick = addFastTick;
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
    TickMgr.removeFastTick = removeFastTick;
    function fastTick(t) {
        var istick = false;
        if (GameData.serverTimeMs) {
            var lastt = GameData.serverTimeMs;
            GameData.serverTimeMs = new Date().getTime() + GameData.serverClientTimeDt;
            if (Math.floor(lastt / 1000) != Math.floor(GameData.serverTimeMs / 1000)) {
                istick = true;
            }
        }
        if (LoginMgr.isLoginGameSuccess) {
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
        if (LoginMgr.isLoginGameSuccess) {
            if (!App.DateUtil.checkIsToday(GameData.lastFreshDayInfoTime)) {
                GameData.lastFreshDayInfoTime = GameData.getServerTime();
                console.log(GameData.serverTimeMs);
                var tout_1 = egret.setTimeout(function () {
                    egret.clearTimeout(tout_1);
                    NetManager.request(NetConst.USER_FRESHDAYINFO, {});
                }, null, 2000);
            }
            else {
                if (GameData.serverTimeMs - GameData.lastReceiveTimeMs > 4 * 60 * 1000) {
                    GameData.lastReceiveTimeMs = GameData.serverTimeMs;
                    NetManager.request(NetConst.USER_SYNC, {}, false);
                }
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
    }
})(TickMgr || (TickMgr = {}));
//# sourceMappingURL=TickMgr.js.map