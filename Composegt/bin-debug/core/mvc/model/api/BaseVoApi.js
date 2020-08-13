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
 * 基类Api
 * author 陈可
 * date 2017/9/8
 * @namespace BaseVoApi
 */
var BaseVoApi = (function (_super) {
    __extends(BaseVoApi, _super);
    function BaseVoApi() {
        var _this = _super.call(this) || this;
        _this._dataVoList = [];
        return _this;
    }
    BaseVoApi.prototype.formatData = function (data) {
        if (this._vo == null) {
            var className = this.getClassName();
            var voClassName = className.substring(0, className.length - 3);
            var voClass = egret.getDefinitionByName(voClassName);
            this._vo = new voClass();
            // this._vo.initData(data);
            this[App.StringUtil.firstCharToLower(voClassName)] = this._vo;
        }
        this._vo.initData(data);
    };
    BaseVoApi.prototype.getModeName = function () {
        return this.getClassName().replace("VoApi", "").toLowerCase();
    };
    BaseVoApi.prototype.getClassName = function () {
        return egret.getQualifiedClassName(this);
    };
    BaseVoApi.prototype.checkNpcMessage = function () {
        return false;
    };
    BaseVoApi.prototype.dispose = function () {
        if (this._vo) {
            this._vo.dispose();
            this._vo = null;
        }
    };
    return BaseVoApi;
}(BaseClass));
__reflect(BaseVoApi.prototype, "BaseVoApi");
