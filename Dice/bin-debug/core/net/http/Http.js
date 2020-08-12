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
 * http封装
 * author 陈可
 * date 2017/9/8
 * @class Http
 */
var Http = (function (_super) {
    __extends(Http, _super);
    function Http() {
        var _this = _super.call(this) || this;
        _this._httpRequest = undefined;
        _this._isRequesting = false;
        _this.init();
        return _this;
    }
    Http.prototype.init = function () {
        this._httpRequest = new egret.HttpRequest();
        this._httpRequest.addEventListener(egret.Event.COMPLETE, this.onRequestComplete, this);
        this._httpRequest.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onRequestIOError, this);
        this._httpRequest.addEventListener(egret.ProgressEvent.PROGRESS, this.onRequestProgress, this);
    };
    /**
     * http请求
     * @param host 请求地址
     * @param data 请求数据
     * @param mathed 请求方式get/post
     * @param resonseType 请求数据传输格式
     */
    Http.prototype.request = function (host, data, method, successCallback, errorCallback, callbackTarget, resonseType) {
        if (resonseType === void 0) { resonseType = egret.HttpResponseType.TEXT; }
        this._callbackData = { successCallback: successCallback, errorCallback: errorCallback, callbackTarget: callbackTarget };
        this._isRequesting = true;
        this._httpRequest.responseType = resonseType;
        if (host && host.indexOf("http") < 0) {
            host = Http.getProtocol() + host;
        }
        if (method == egret.HttpMethod.POST) {
            console.log("http send post");
            this._httpRequest.timeout = 100000;
            this._httpRequest.open(host, method);
            this._httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            this._httpRequest.send(App.StringUtil.toString(data));
        }
        else {
            console.log("http send get");
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
            this._httpRequest.open(host, method);
            this._httpRequest.send();
        }
    };
    Http.prototype.onRequestComplete = function (event) {
        console.log("http complete");
        this._isRequesting = false;
        if (this._callbackData.successCallback) {
            var callbackData = this._callbackData;
            this._callbackData = null;
            callbackData.successCallback.call(callbackData.callbackTarget, this._httpRequest.response);
        }
    };
    Http.prototype.onRequestProgress = function (event) {
    };
    Http.prototype.onRequestIOError = function (event) {
        console.log("http error");
        this._isRequesting = false;
        if (this._callbackData.errorCallback) {
            var callbackData = this._callbackData;
            this._callbackData = null;
            callbackData.errorCallback.call(callbackData.callbackTarget);
        }
    };
    Http.prototype.isRequesting = function () {
        return this._isRequesting;
    };
    Http.prototype.encode = function (data) {
        var paramURL = "";
        for (var key in data) {
            paramURL += key + "=" + data[key] + "&";
        }
        if (paramURL.length > 1) {
            return "" + paramURL.substring(0, paramURL.length - 1);
        }
        return paramURL;
    };
    /**
     * 其他运行环境请在此处理，如果有写死的话需要是http:或者https:，需要加上冒号
     */
    Http.getProtocol = function () {
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            return window.location.protocol;
        }
        else if (App.DeviceUtil.isWXgame()) {
            return "https:";
        }
        return "";
    };
    /**
     * 如果请求已经被发出，则立即终止请求
     */
    Http.prototype.abort = function () {
        if (this._httpRequest) {
            this._httpRequest.abort();
        }
    };
    /**
     * 销毁掉不要了，如果只是取消请求请调用abort方法
     */
    Http.prototype.dispose = function () {
        if (this._httpRequest) {
            this._httpRequest.abort();
            this._httpRequest.removeEventListener(egret.Event.COMPLETE, this.onRequestComplete, this);
            this._httpRequest.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onRequestIOError, this);
            this._httpRequest.removeEventListener(egret.ProgressEvent.PROGRESS, this.onRequestProgress, this);
            this._httpRequest = null;
        }
    };
    return Http;
}(BaseClass));
__reflect(Http.prototype, "Http");
//# sourceMappingURL=Http.js.map