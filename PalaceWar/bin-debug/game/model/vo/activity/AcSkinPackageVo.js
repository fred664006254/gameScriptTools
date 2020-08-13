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
var AcSkinPackageVo = (function (_super) {
    __extends(AcSkinPackageVo, _super);
    function AcSkinPackageVo() {
        var _this = _super.call(this) || this;
        _this.chargeNum = 0;
        _this.getFlag = null;
        return _this;
    }
    Object.defineProperty(AcSkinPackageVo.prototype, "isShowIcon", {
        get: function () {
            return this["show"] == 1;
            // return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSkinPackageVo.prototype, "isShowRedDot", {
        get: function () {
            var curFlag = this.getCurFlag();
            var cfg = Config.AcCfg.getCfgByActivityIdAndCode("skinPackage", this.code);
            if (curFlag < cfg.getRewardMax()) {
                var needGem = cfg.getGemNeed(curFlag);
                if (this.chargeNum >= needGem) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AcSkinPackageVo.prototype.getCurFlag = function () {
        var f = 0;
        while (this.getFlag[f + 1] == 1) {
            f++;
        }
        return f;
    };
    AcSkinPackageVo.prototype.dispose = function () {
        this.chargeNum = 0;
        this.getFlag = 0;
        _super.prototype.dispose.call(this);
    };
    return AcSkinPackageVo;
}(AcBaseVo));
__reflect(AcSkinPackageVo.prototype, "AcSkinPackageVo");
//# sourceMappingURL=AcSkinPackageVo.js.map