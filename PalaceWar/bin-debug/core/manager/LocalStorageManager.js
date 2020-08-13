/**
 * 本地存储数据管理
 * author 陈可
 * date 2017/9/8
 * @class LocalStorageManager
 */
var LocalStorageManager;
(function (LocalStorageManager) {
    /**
     * 保存数据
     * @param key
     * @param value
     * @returns {boolean}
     */
    function set(key, value) {
        try {
            return egret.localStorage.setItem(key, value);
        }
        catch (e) {
            console.log("unsupport localStorage try cookie");
            setCookie(key, value);
            return false;
        }
    }
    LocalStorageManager.set = set;
    /**
     * 读取数据
     * @param key 要读取的键名称
     * @returns {string}
     */
    function get(key) {
        try {
            var str = egret.localStorage.getItem(key);
            if (str == null) {
                str = "";
            }
            return str;
        }
        catch (e) {
            console.log("unsupport localStorage try cookie");
            return getCookie(key);
        }
    }
    LocalStorageManager.get = get;
    /**
     *
     * @param key 要删除的键名称
     */
    function remove(key) {
        try {
            egret.localStorage.removeItem(key);
        }
        catch (e) {
            console.log("unsupport localStorage try cookie");
            removeCookie(key);
        }
    }
    LocalStorageManager.remove = remove;
    /**
     * 将所有数据清空
     */
    function clear() {
        try {
            egret.localStorage.clear();
        }
        catch (e) {
            console.log("unsupport localStorage");
        }
    }
    LocalStorageManager.clear = clear;
    //写cookies
    function setCookie(name, value) {
        if (App.DeviceUtil.IsHtml5()) {
            var Days = 300;
            var exp = new Date();
            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
            document.cookie = name + "=" + window["escape"](value) + ";expires=" + exp["toGMTString"]();
        }
    }
    //读cookies
    function getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
            return window["unescape"](arr[2]);
        }
        else {
            return "";
        }
    }
    //删cookies
    function removeCookie(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp["toGMTString"]();
    }
})(LocalStorageManager || (LocalStorageManager = {}));
//# sourceMappingURL=LocalStorageManager.js.map