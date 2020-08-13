var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * author dmj
 * date 2017/9/7
 * @class Dictionary
 */
var Dictionary = (function () {
    function Dictionary() {
        this._keys = [];
        this._values = [];
    }
    /**
     * 添加、更新key、value
     * @param key 可以是任何类型
     * @param value 可以是任何类型
     */
    Dictionary.prototype.set = function (key, value) {
        var index = this._keys.indexOf(key, 0);
        if (index != -1) {
            this._keys[index] = key;
            this._values[index] = value;
        }
        else {
            this._keys.push(key);
            this._values.push(value);
        }
    };
    /**
     * 删除
     * @param key
     */
    Dictionary.prototype.remove = function (key) {
        var index = this._keys.indexOf(key, 0);
        this._keys.splice(index, 1);
        this._values.splice(index, 1);
    };
    /**
     * 测试代码
     */
    Dictionary.prototype.testLog = function () {
        App.LogUtil.log("key length =======" + this._keys.length);
        App.LogUtil.log("_values length ======" + this._values.length);
        for (var i = 0; i < this._keys.length; i++) {
            App.LogUtil.log("key =" + this._keys[i]);
        }
        for (var i = 0; i < this._values.length; i++) {
            App.LogUtil.log("value =" + this._values[i]);
        }
        App.LogUtil.log("=================end=====================");
    };
    // 长度
    Dictionary.prototype.length = function () {
        return this._keys.length;
    };
    /**
     * 判断是否包含该key,true包含
     * @param key
     */
    Dictionary.prototype.has = function (key) {
        var ks = this._keys;
        for (var i = 0; i < ks.length; ++i) {
            if (ks[i] == key) {
                return true;
                ;
            }
        }
        return false;
    };
    Dictionary.prototype.dispose = function () {
        this._keys.length = 0;
        this._values.length = 0;
    };
    /**
     * 通过key查找value
     * @param key
     */
    Dictionary.prototype.get = function (key) {
        var ks = this._keys;
        for (var i = 0; i < ks.length; ++i) {
            if (ks[i] == key) {
                return true;
                ;
            }
        }
        return false;
    };
    Dictionary.prototype.getKeys = function () {
        return this._keys;
    };
    Dictionary.prototype.getValues = function () {
        return this._values;
    };
    return Dictionary;
}());
__reflect(Dictionary.prototype, "Dictionary");
