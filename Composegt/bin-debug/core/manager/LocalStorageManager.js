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
        return egret.localStorage.setItem(key, value);
    }
    LocalStorageManager.set = set;
    /**
     * 读取数据
     * @param key 要读取的键名称
     * @returns {string}
     */
    function get(key) {
        var str = egret.localStorage.getItem(key);
        if (str == null) {
            str = "";
        }
        return str;
    }
    LocalStorageManager.get = get;
    /**
     *
     * @param key 要删除的键名称
     */
    function remove(key) {
        egret.localStorage.removeItem(key);
    }
    LocalStorageManager.remove = remove;
    /**
     * 将所有数据清空
     */
    function clear() {
        egret.localStorage.clear();
    }
    LocalStorageManager.clear = clear;
})(LocalStorageManager || (LocalStorageManager = {}));
