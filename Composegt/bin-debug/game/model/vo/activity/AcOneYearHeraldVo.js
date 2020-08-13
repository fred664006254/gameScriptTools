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
var AcOneYearHeraldVo = (function (_super) {
    __extends(AcOneYearHeraldVo, _super);
    function AcOneYearHeraldVo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.firstOpen = 0;
        return _this;
    }
    AcOneYearHeraldVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    AcOneYearHeraldVo.prototype.isFirstOpen = function () {
        return this.firstOpen == 0;
    };
    Object.defineProperty(AcOneYearHeraldVo.prototype, "isShowRedDot", {
        get: function () {
            return (this.firstOpen == 0);
        },
        enumerable: true,
        configurable: true
    });
    AcOneYearHeraldVo.prototype.dispose = function () {
        this.firstOpen = 0;
        _super.prototype.dispose.call(this);
    };
    return AcOneYearHeraldVo;
}(AcBaseVo));
__reflect(AcOneYearHeraldVo.prototype, "AcOneYearHeraldVo");
