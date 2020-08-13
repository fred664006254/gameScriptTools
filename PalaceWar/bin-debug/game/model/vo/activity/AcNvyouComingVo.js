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
var AcNvyouComingVo = (function (_super) {
    __extends(AcNvyouComingVo, _super);
    function AcNvyouComingVo() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcNvyouComingVo.prototype, "isShowIcon", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNvyouComingVo.prototype, "isShowBanner", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    return AcNvyouComingVo;
}(AcBaseVo));
__reflect(AcNvyouComingVo.prototype, "AcNvyouComingVo");
//# sourceMappingURL=AcNvyouComingVo.js.map