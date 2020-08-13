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
 * 通用tab页面
 * author ck
 * date 2018/8/14
 * @class AcCommonViewTab
 */
var AcCommonViewTab = (function (_super) {
    __extends(AcCommonViewTab, _super);
    function AcCommonViewTab() {
        var _this = _super.call(this) || this;
        /**
         * 引用的view实例，框架内用，不允许在其他地方使用
         */
        _this._view = null;
        return _this;
    }
    /**
     * 这个不允许改作用域，也不允许子级调用
     */
    AcCommonViewTab.prototype.checkGetAcView = function () {
        if (!this._view) {
            this._view = ViewController.getInstance().getView(this.getClassName().split("Tab")[0]);
        }
        return this._view ? true : false;
    };
    Object.defineProperty(AcCommonViewTab.prototype, "aid", {
        /**
         * 获取aid，和view保持一致
         */
        get: function () {
            if (this.checkGetAcView()) {
                return this._view["aid"];
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCommonViewTab.prototype, "code", {
        /**
         * 获取code，和view保持一致
         */
        get: function () {
            if (this.checkGetAcView()) {
                return this._view["code"];
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 资源code
     * 重写view getUiCode 方法就行
     */
    AcCommonViewTab.prototype.getUiCode = function () {
        if (this.checkGetAcView()) {
            return this._view["getUiCode"]();
        }
    };
    AcCommonViewTab.prototype.dispose = function () {
        this._view = null;
        _super.prototype.dispose.call(this);
    };
    return AcCommonViewTab;
}(CommonViewTab));
__reflect(AcCommonViewTab.prototype, "AcCommonViewTab");
//# sourceMappingURL=AcCommonViewTab.js.map