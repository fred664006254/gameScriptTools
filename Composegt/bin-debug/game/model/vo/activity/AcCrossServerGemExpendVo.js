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
var AcCrossServerGemExpendVo = (function (_super) {
    __extends(AcCrossServerGemExpendVo, _super);
    function AcCrossServerGemExpendVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AcCrossServerGemExpendVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    Object.defineProperty(AcCrossServerGemExpendVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerGemExpendVo.prototype, "acTimeAndHour", {
        get: function () {
            var extraTime = this.config.extraTime;
            var et = this.et - (86400 * extraTime);
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerGemExpendVo.prototype, "isShowRedDot", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerGemExpendVo.prototype.isInActivity = function () {
        var extraTime = this.config.extraTime;
        return GameData.serverTime >= this.st && GameData.serverTime < this.et;
    };
    AcCrossServerGemExpendVo.prototype.isInExtra = function () {
        if (this.isInActivity() && this.config) {
            var extraTime = this.config.extraTime;
            if (extraTime) {
                return GameData.serverTime > this.et - 86400 * extraTime;
            }
        }
        return false;
    };
    Object.defineProperty(AcCrossServerGemExpendVo.prototype, "acCountDown", {
        get: function () {
            var et = this.et - this.config.extraTime * 86400;
            if (et < GameData.serverTime) {
                return LanguageManager.getlocal("acPunishEnd");
            }
            return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 8);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerGemExpendVo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerGemExpendVo;
}(AcBaseVo));
__reflect(AcCrossServerGemExpendVo.prototype, "AcCrossServerGemExpendVo");
