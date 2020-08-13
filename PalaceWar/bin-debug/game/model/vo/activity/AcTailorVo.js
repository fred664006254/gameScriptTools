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
var AcTailorVo = (function (_super) {
    __extends(AcTailorVo, _super);
    function AcTailorVo() {
        var _this = _super.call(this) || this;
        _this.showTime = 0;
        return _this;
    }
    ;
    AcTailorVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    Object.defineProperty(AcTailorVo.prototype, "isShowRedDot", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AcTailorVo.prototype.getFreeNum = function () {
        return this["freeNum"];
    };
    AcTailorVo.prototype.getShowTimeList = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var showTimeList = {};
        for (var key in cfg.showTime) {
            if (cfg.showTime[key] <= this.showTime) {
                if (Config.WifeskinCfg.isSkinOPend(key)) {
                    showTimeList[key] = cfg.showTime[key];
                }
            }
        }
        return showTimeList;
    };
    AcTailorVo.prototype.dispose = function () {
        this.v = 0;
        this.showTime = 0;
        _super.prototype.dispose.call(this);
    };
    return AcTailorVo;
}(AcBaseVo));
__reflect(AcTailorVo.prototype, "AcTailorVo");
//# sourceMappingURL=AcTailorVo.js.map