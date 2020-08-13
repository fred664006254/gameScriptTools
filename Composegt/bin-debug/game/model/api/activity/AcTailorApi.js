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
 * 裁缝
 * author dmj
 * date 2018/03/01
 * @class AcTailorApi
 */
var AcTailorApi = (function (_super) {
    __extends(AcTailorApi, _super);
    function AcTailorApi() {
        return _super.call(this) || this;
    }
    AcTailorApi.prototype.getFreeTimes = function () {
        return this.acTailorVo["free"];
    };
    AcTailorApi.prototype.dispose = function () {
        this.acTailorVo = null;
        _super.prototype.dispose.call(this);
    };
    return AcTailorApi;
}(BaseVoApi));
__reflect(AcTailorApi.prototype, "AcTailorApi");
