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
var AcOneYearRankVo = (function (_super) {
    __extends(AcOneYearRankVo, _super);
    function AcOneYearRankVo() {
        var _this = _super.call(this) || this;
        _this.acinfo = undefined;
        _this.firstinfo = undefined;
        return _this;
    }
    AcOneYearRankVo.prototype.initData = function (data) {
        var olduid = this.firstinfo && this.firstinfo.pic;
        for (var key in data) {
            this[key] = data[key];
        }
        var newuid = this.firstinfo && this.firstinfo.pic;
        //可以理解为冲榜结束，产生赢家
        if (this.acinfo.et < GameData.serverTime && newuid != olduid) {
            App.MessageHelper.dispatchEvent(MessageConst.MESAAGE_ONERANK_VO_CHANGE);
        }
    };
    Object.defineProperty(AcOneYearRankVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcOneYearRankVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.acinfo.et - 86400;
            return App.DateUtil.getOpenLocalTime(this.acinfo.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcOneYearRankVo.prototype, "acCountDown", {
        get: function () {
            return App.DateUtil.getFormatBySecond(Math.max(0, (this.acinfo.et - GameData.serverTime - 86400)), 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcOneYearRankVo.prototype, "isShowRedDot", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AcOneYearRankVo.prototype.dispose = function () {
        this.firstinfo = null;
        this.acinfo = null;
    };
    return AcOneYearRankVo;
}(AcBaseVo));
__reflect(AcOneYearRankVo.prototype, "AcOneYearRankVo");
