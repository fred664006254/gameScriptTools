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
var AcCrossServerAtkRaceVo = (function (_super) {
    __extends(AcCrossServerAtkRaceVo, _super);
    function AcCrossServerAtkRaceVo() {
        var _this = _super.call(this) || this;
        _this.info = null;
        return _this;
    }
    AcCrossServerAtkRaceVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    Object.defineProperty(AcCrossServerAtkRaceVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et - 86400;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerAtkRaceVo.prototype.getPreward = function () {
        return this["info"]["preward"];
    };
    AcCrossServerAtkRaceVo.prototype.getZonereward = function () {
        return this["info"]["zonereward"];
    };
    AcCrossServerAtkRaceVo.prototype.dispose = function () {
        this.info = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerAtkRaceVo;
}(AcBaseVo));
__reflect(AcCrossServerAtkRaceVo.prototype, "AcCrossServerAtkRaceVo");
