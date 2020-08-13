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
var AcNewPackVo = (function (_super) {
    __extends(AcNewPackVo, _super);
    function AcNewPackVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AcNewPackVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    Object.defineProperty(AcNewPackVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewPackVo.prototype, "isShowRedDot", {
        get: function () {
            var num = this.isGetReward();
            return num == 1;
        },
        enumerable: true,
        configurable: true
    });
    AcNewPackVo.prototype.isGetReward = function () {
        if (this["flag"] == 0) {
            var version = GameConfig.version;
            if (!version) {
                return 0;
            }
            var needVerion = this.cfg.version;
            var varr = version.split(".");
            var needvarr = needVerion.split(".");
            for (var i = 0; i < varr.length; i++) {
                if (parseInt(varr[i]) < parseInt(needvarr[i])) {
                    return 0;
                }
            }
            return 1;
        }
        if (this["flag"] == 1) {
            return 2;
        }
        return -1;
    };
    AcNewPackVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et;
    };
    AcNewPackVo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcNewPackVo;
}(AcBaseVo));
__reflect(AcNewPackVo.prototype, "AcNewPackVo");
//# sourceMappingURL=AcNewPackVo.js.map