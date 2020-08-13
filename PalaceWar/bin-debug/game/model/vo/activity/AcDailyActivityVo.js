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
var AcDailyActivityVo = (function (_super) {
    __extends(AcDailyActivityVo, _super);
    function AcDailyActivityVo() {
        var _this = _super.call(this) || this;
        _this.ainfo = {};
        _this.rp = 1;
        return _this;
    }
    AcDailyActivityVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        if (data.rp && data.rp == 1) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_DAILYACTIVITY_REFRESH);
        }
    };
    Object.defineProperty(AcDailyActivityVo.prototype, "isShowRedDot", {
        get: function () {
            return this.rp == 1;
        },
        enumerable: true,
        configurable: true
    });
    AcDailyActivityVo.prototype.getBuyTimes = function (gid) {
        if (this.ainfo && this.ainfo[gid]) {
            return this.ainfo[gid];
        }
        return 0;
    };
    AcDailyActivityVo.prototype.dispose = function () {
        this.ainfo = null;
        this.rp = 1;
    };
    return AcDailyActivityVo;
}(AcBaseVo));
__reflect(AcDailyActivityVo.prototype, "AcDailyActivityVo");
//# sourceMappingURL=AcDailyActivityVo.js.map