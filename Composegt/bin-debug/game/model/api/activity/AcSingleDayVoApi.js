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
var AcSingleDayVoApi = (function (_super) {
    __extends(AcSingleDayVoApi, _super);
    function AcSingleDayVoApi() {
        return _super.call(this) || this;
    }
    AcSingleDayVoApi.prototype.initData = function (data) {
    };
    AcSingleDayVoApi.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcSingleDayVoApi;
}(BaseVoApi));
__reflect(AcSingleDayVoApi.prototype, "AcSingleDayVoApi");
