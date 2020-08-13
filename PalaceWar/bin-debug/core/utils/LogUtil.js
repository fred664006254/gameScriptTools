var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * author 陈可
 * date 2017/9/5
 * @class LogUtil
 */
var App;
(function (App) {
    var LogUtil = (function () {
        function LogUtil() {
        }
        /**
         * 输出log，debug模式会输出
         * @param logParams  需要传的参数，不要在外面解析，可以直接传json对象过来
         */
        LogUtil.log = function () {
            var logParams = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                logParams[_i] = arguments[_i];
            }
            if (PlatformManager.checkIsLocal() || GameData.isTest() || LogUtil.isTestShowLog) {
                var _a = LogUtil.formatLogParams(logParams), firstParam = _a.firstParam, otherParams = _a.otherParams;
                console.log(firstParam, otherParams);
            }
        };
        /**
         * 输出log到屏幕和log，debug模式会输出
         * @param logParams  需要传的参数，不要在外面解析，可以直接传json对象过来
         */
        LogUtil.show = function () {
            var logParams = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                logParams[_i] = arguments[_i];
            }
            if (true) {
                var _a = LogUtil.formatLogParams(logParams), firstParam = _a.firstParam, otherParams = _a.otherParams;
                egret.log(firstParam, otherParams);
            }
        };
        /**
         * 输出警告log，debug模式会输出
         * @param logParams  需要传的参数，不要在外面解析，可以直接传json对象过来
         */
        LogUtil.warn = function () {
            var logParams = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                logParams[_i] = arguments[_i];
            }
            if (PlatformManager.checkIsLocal() || LogUtil.isTestShowLog) {
                var _a = LogUtil.formatLogParams(logParams), firstParam = _a.firstParam, otherParams = _a.otherParams;
                egret.warn.call(egret, firstParam, otherParams);
            }
        };
        /**
         * 输出错误log，debug模式会输出
         * @param logParams  需要传的参数，不要在外面解析，可以直接传json对象过来
         */
        LogUtil.error = function () {
            var logParams = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                logParams[_i] = arguments[_i];
            }
            if (true) {
                var _a = LogUtil.formatLogParams(logParams), firstParam = _a.firstParam, otherParams = _a.otherParams;
                egret.error.call(egret, firstParam, otherParams);
            }
        };
        LogUtil.alert = function () {
            var logParams = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                logParams[_i] = arguments[_i];
            }
            if (App.CommonUtil.getOption("testck") == "alert") {
                var _a = LogUtil.formatLogParams(logParams), firstParam = _a.firstParam, otherParams = _a.otherParams;
                alert(firstParam + " " + otherParams);
            }
        };
        LogUtil.showTxt = function () {
            var logParams = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                logParams[_i] = arguments[_i];
            }
            var _a = LogUtil.formatLogParams(logParams), firstParam = _a.firstParam, otherParams = _a.otherParams;
            if (!LogUtil._txt) {
                LogUtil._txt = ComponentManager.getTextField(firstParam + " " + otherParams, 15);
                GameConfig.stage.addChild(LogUtil._txt);
            }
            else {
                LogUtil._txt.appendText(firstParam + " " + otherParams);
            }
        };
        /**
         * 解析参数为字符串
         * @param logParams
         */
        LogUtil.formatLogParams = function (logParams) {
            var params = { firstParam: undefined, otherParams: "" };
            if (logParams && logParams.length > 0) {
                var firstParam = undefined;
                var otherParams = "";
                for (var i = 0; i < logParams.length; i++) {
                    var paramStr = undefined;
                    var param = logParams[i];
                    paramStr = App.StringUtil.toString(param);
                    if (i == 0) {
                        params.firstParam = paramStr;
                    }
                    else {
                        if (!otherParams) {
                            otherParams += paramStr;
                        }
                        else {
                            otherParams += " " + paramStr;
                        }
                        params.otherParams = otherParams;
                    }
                }
            }
            return params;
        };
        /**
         * 命令打开log输出
         */
        LogUtil.isTestShowLog = false;
        return LogUtil;
    }());
    App.LogUtil = LogUtil;
    __reflect(LogUtil.prototype, "App.LogUtil");
})(App || (App = {}));
//# sourceMappingURL=LogUtil.js.map