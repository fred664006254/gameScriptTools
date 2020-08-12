/**
 * 统计类，具体方法先留空
 * author dmj
 * date 2017/9/15
 * @namespace StatisticsHelper
 */
var StatisticsHelper;
(function (StatisticsHelper) {
    var reportResDic = {};
    function init() {
        if (App.DeviceUtil.isWXgame()) {
            window["wx"].onError(function (res) {
                window.onerror(res.stack, res.message, 0, 0);
            });
        }
    }
    StatisticsHelper.init = init;
    /**
     * 玩家创角统计
     */
    function report_register_tw() {
        if (App.DeviceUtil.IsHtml5()) {
            window["google_conversion_id"] = 819873248;
            window["google_conversion_label"] = "slGECLnNt34Q4Iv5hgM";
            window["google_remarketing_only"] = false;
            App.ResourceUtil.loadSingleScript("//www.googleadservices.com/pagead/conversion.js");
            var a = function (f, b, e, v, n, t, s) {
                if (f.fbq)
                    return;
                n = f.fbq = function () {
                    n.callMethod ?
                        n.callMethod.apply(n, arguments) : n.queue.push(arguments);
                };
                if (!f._fbq)
                    f._fbq = n;
                n.push = n;
                n.loaded = !0;
                n.version = '2.0';
                n.queue = [];
                t = b.createElement(e);
                t.async = !0;
                t.src = v;
                s = b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t, s);
            };
            a(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
            window["fbq"]('init', '234770090424672');
            window["fbq"]('track', 'CompleteRegistration');
        }
    }
    StatisticsHelper.report_register_tw = report_register_tw;
    /**
     * 玩家完成"购买"行为完成后
     */
    function report_pay_tw(cost) {
        if (App.DeviceUtil.IsHtml5()) {
            window["google_conversion_id"] = 819873248;
            window["google_conversion_label"] = "DvFdCNGFu34Q4Iv5hgM";
            window["google_conversion_value"] = cost ? cost : 3.00;
            window["google_conversion_currency"] = "USD";
            window["google_remarketing_only"] = false;
            App.ResourceUtil.loadSingleScript("//www.googleadservices.com/pagead/conversion.js");
            var a = function (f, b, e, v, n, t, s) {
                if (f.fbq)
                    return;
                n = f.fbq = function () {
                    n.callMethod ?
                        n.callMethod.apply(n, arguments) : n.queue.push(arguments);
                };
                if (!f._fbq)
                    f._fbq = n;
                n.push = n;
                n.loaded = !0;
                n.version = '2.0';
                n.queue = [];
                t = b.createElement(e);
                t.async = !0;
                t.src = v;
                s = b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t, s);
            };
            a(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
            window["fbq"]('init', '179480206020479');
            window["fbq"]('track', 'Purchase', { value: String(cost), currency: 'USD' });
        }
    }
    StatisticsHelper.report_pay_tw = report_pay_tw;
    /**
     * 等级达到正八品
     */
    function report_uplevel4_tw() {
        if (App.DeviceUtil.IsHtml5()) {
            window["google_conversion_id"] = 819873248;
            window["google_conversion_label"] = "Nx93CKDPt34Q4Iv5hgM";
            window["google_remarketing_only"] = false;
            App.ResourceUtil.loadSingleScript("//www.googleadservices.com/pagead/conversion.js");
        }
    }
    StatisticsHelper.report_uplevel4_tw = report_uplevel4_tw;
    /**
     * 统计加载步骤
     */
    function reportLoadData(step) {
        if (App.DeviceUtil.IsHtml5()) {
            if (window["requestGetStep"]) {
                try {
                    window["requestGetStep"](step);
                }
                catch (e) {
                    console.log("requestGetStep error");
                }
            }
        }
    }
    StatisticsHelper.reportLoadData = reportLoadData;
    /**
     * 登录流程步骤详细统计
     */
    function loginProcessSetStep(step) {
        if (App.DeviceUtil.IsHtml5()) {
            if (window["loginProcessStep"]) {
                try {
                    window["loginProcessStep"](step);
                }
                catch (e) {
                    console.log("loginProcessStep error");
                }
            }
        }
    }
    StatisticsHelper.loginProcessSetStep = loginProcessSetStep;
    function clearReportData() {
        if (App.DeviceUtil.IsHtml5()) {
            if (window["requestGetStepData"]) {
                window["requestGetStepData"] = {};
            }
        }
    }
    StatisticsHelper.clearReportData = clearReportData;
    /**
     *
     * 游戏内上报自定义文件名的log，可以是字符串，也可以是json对象
     * @param info json对象 或者字符串都可以
     */
    function reportOwnNameLog(log, filename) {
        log = App.StringUtil.toString(log);
        var data = {
            platform: PlatMgr.getBigAppid(),
            uid: Api.UserinfoVoApi.getUid(),
            zid: ServerCfg.selectServer.zid,
            logstr: log,
            filename: filename
        };
        NetManager.http.postOutQueue("//gt-clientlog.raygame3.com/create_errorlog.php", data);
    }
    StatisticsHelper.reportOwnNameLog = reportOwnNameLog;
    /**
     *
     * 游戏内上报自定义log
     * @param info json对象 或者字符串都可以
     */
    function reportGameLog(log) {
        var data = {
            platform: PlatMgr.getBigAppid(),
            uid: Api.UserinfoVoApi.getUid(),
            logstr: log
        };
        NetManager.http.postOutQueue("//gt-clientlog.raygame3.com/create_userdefined.php ", data);
    }
    StatisticsHelper.reportGameLog = reportGameLog;
    /**
     *
     * 游戏内异常上报
     * @param info json对象 或者字符串都可以
     */
    function reportGameResLoadFail(url) {
        if (reportResDic[url] && reportResDic[url] > 1) {
            return;
        }
        var data = {
            platform: PlatMgr.getBigAppid(),
            uid: Api.UserinfoVoApi.getUid(),
            logstr: url + "::" + GameData.curDefaultName + "::"
        };
        if (!reportResDic[url]) {
            reportResDic[url] = 0;
        }
        reportResDic[url]++;
        NetManager.http.postOutQueue("//gt-clientlog.raygame3.com/create_resourcefail_log.php", data);
    }
    StatisticsHelper.reportGameResLoadFail = reportGameResLoadFail;
    /**
     *
     * 游戏内异常上报
     * @param info json对象 或者字符串都可以
     */
    function reportGameError(info) {
        var data = {
            platform: PlatMgr.getBigAppid(),
            uid: Api.UserinfoVoApi.getUid(),
            zid: ServerCfg.selectServer.zid,
            logstr: ""
        };
        data.logstr = App.StringUtil.toString(info);
        NetManager.http.postOutQueue("//gt-clientlog.raygame3.com/create_clientlog.php", data);
    }
    StatisticsHelper.reportGameError = reportGameError;
    function reportAcLog(aid, code, action) {
        if (GameData.statUrl) {
            if (!code) {
                code = 0;
            }
            var serverDate = App.DateUtil.getServerDate();
            var year = String(serverDate.getFullYear());
            var month = serverDate.getMonth() + 1 > 9 ? String(serverDate.getMonth() + 1) : "0" + String(serverDate.getMonth() + 1);
            var day = serverDate.getDate() > 9 ? String(serverDate.getDate()) : "0" + String(serverDate.getDate());
            var hour = serverDate.getHours();
            var minute = serverDate.getMinutes();
            var second = serverDate.getSeconds();
            var fileName = aid + "-" + code + "-" + action + "-" + year + "-" + month + "-" + day;
            var data = {
                plat: PlatMgr.getSpid(),
                data_log: {
                    lkey: ["服", "uid", "角色名", "等级", "vip", "总充值元宝", '元宝', '时间'],
                },
                file_name: fileName
            };
            NetManager.http.postOutQueue(GameData.statUrl, data);
        }
    }
    StatisticsHelper.reportAcLog = reportAcLog;
    function reportShieldChat(chatStr, shieldStr) {
        var sendData = {
            t: "sendchatmsg",
            uid: Api.UserinfoVoApi.getUid(),
            // name:Api.playerVoApi.getPlayerName(),
            // vip:Api.playerVoApi.getPlayerVipLevel(),
            zid: ServerCfg.selectServer.zid,
            msg: chatStr,
            word: shieldStr,
        };
        NetManager.http.getOutQueue(ServerCfg.svrCfgUrl, sendData);
    }
    StatisticsHelper.reportShieldChat = reportShieldChat;
})(StatisticsHelper || (StatisticsHelper = {}));
window["tmpGameError"] = window.onerror;
window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
    if (window["tmpGameError"]) {
        window["tmpGameError"](errorMsg, url, lineNumber, column, errorObj);
    }
    if (!errorObj) {
        errorObj = {};
        errorObj.error = errorMsg + "::pid:" + PlatMgr.userId;
        errorObj.script = url;
        errorObj.line = lineNumber;
        errorObj.column = column;
        try {
            if (errorMsg == "Script error" && !url) {
                console.log("game error: " + JSON.stringify(errorObj));
                return;
            }
        }
        catch (e) {
        }
    }
    else {
        var tmpData = {};
        for (var _i = 0, _a = Object.getOwnPropertyNames(errorObj); _i < _a.length; _i++) {
            var key = _a[_i];
            tmpData[key] = errorObj[key];
            if (key == "error") {
                tmpData[key] = tmpData[key] + "::pid:" + PlatMgr.userId;
            }
        }
        errorObj = tmpData;
    }
    StatisticsHelper.reportGameError(errorObj);
};
//# sourceMappingURL=StatisticsHelper.js.map