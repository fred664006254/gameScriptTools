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
var BaseItemCfg = (function (_super) {
    __extends(BaseItemCfg, _super);
    function BaseItemCfg() {
        return _super.call(this) || this;
    }
    BaseItemCfg.prototype.initData = function (data) {
        if (data) {
            for (var key in data) {
                this[key] = data[key];
            }
        }
    };
    BaseItemCfg.prototype.dispose = function () {
    };
    return BaseItemCfg;
}(BaseClass));
__reflect(BaseItemCfg.prototype, "BaseItemCfg");
