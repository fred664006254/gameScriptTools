var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 设备信息工具
 * author 陈可
 * date 2017/9/8
 * @class DeviceUtil
 */
var App;
(function (App) {
    var DeviceUtil = (function () {
        function DeviceUtil() {
        }
        /**
         * 当前是否Html5版本
         * @returns {boolean}
         * @constructor
         */
        DeviceUtil.IsHtml5 = function () {
            return !this.isWXgame() && egret.Capabilities.runtimeType == egret.RuntimeType.WEB;
        };
        /**
         * 当前是否是Native版本
         * @returns {boolean}
         * @constructor
         */
        DeviceUtil.IsNative = function () {
            return egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE;
        };
        /**
         * 当前是否是微信小游戏版本
         */
        DeviceUtil.isWXgame = function () {
            return egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME;
        };
        /**
         * 当前是否是百度小游戏版本
         */
        DeviceUtil.isBaidugame = function () {
            return egret.Capabilities.runtimeType == egret.RuntimeType["BAIDUGAME"];
        };
        /**
         * 当前是否是qq玩一玩
         */
        DeviceUtil.isWyw = function () {
            return false;
        };
        /**
         * 是否是runtime2微端环境
         */
        DeviceUtil.isRuntime2 = function () {
            return egret.Capabilities.runtimeType == egret.RuntimeType.RUNTIME2;
        };
        /**
         * 是否是在手机上
         * @returns {boolean}
         * @constructor
         */
        DeviceUtil.IsMobile = function () {
            return egret.Capabilities.isMobile;
        };
        DeviceUtil.isAndroid = function () {
            if (this.isWXgame()) {
                return window["__WXGAME_OS__"] == "android"; //android终端
            }
            else {
                return egret.Capabilities.os == "Android";
            }
        };
        DeviceUtil.isIOS = function () {
            if (this.isWXgame()) {
                return window["__WXGAME_OS__"] == "ios"; //ios终端
            }
            else {
                return egret.Capabilities.os == "iOS";
            }
        };
        DeviceUtil.CheckWebglRenderMode = function () {
            return egret.Capabilities.renderMode == "webgl";
        };
        /**获取设备当前语言 */
        DeviceUtil.getOSCurrentLanguage = function () {
            return "cn";
        };
        /**
         * 检测是否是全面屏手机
         */
        DeviceUtil.checkIsFullscreen = function () {
            return DeviceUtil.getScreenRatio() > 16 / 9 || GameConfig.stage.stageHeight > 1136;
        };
        DeviceUtil.checkIsSeascreen = function () {
            return DeviceUtil.getScreenRatio() > 2;
        };
        /**
         * 获取屏幕高度除以宽度的值
         */
        DeviceUtil.getScreenRatio = function () {
            var value = 0;
            var window_width;
            var window_height;
            if (App.DeviceUtil.IsHtml5()) {
                window_width = document.documentElement.clientWidth;
                window_height = document.documentElement.clientHeight;
            }
            else if (this.isWXgame()) {
                window_width = window.screen.availWidth;
                window_height = window.screen.availHeight;
            }
            value = window_height / window_width;
            return value;
        };
        /**
         * 检测是否是iPhone X
         */
        DeviceUtil.checkIsIphoneX = function () {
            var width = 0;
            var height = 0;
            if (this.isWXgame()) {
                width = window.screen.availWidth;
                height = window.screen.availHeight;
            }
            else {
                width = window.screen.width;
                height = window.screen.height;
            }
            var ratio = window.devicePixelRatio;
            var isIphoneX = width * ratio === 1125 && height * ratio === 2436;
            return isIphoneX;
        };
        // 玩吧是否已下载微端
        DeviceUtil.wanbaIsDownloadApp = false;
        return DeviceUtil;
    }());
    App.DeviceUtil = DeviceUtil;
    __reflect(DeviceUtil.prototype, "App.DeviceUtil");
})(App || (App = {}));
