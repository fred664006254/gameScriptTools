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
 * 功能预告
 * date 2019.9.29
 * author ycg
 * @class AcWelcomeVo
 */
var AcWelcomeVo = (function (_super) {
    __extends(AcWelcomeVo, _super);
    function AcWelcomeVo() {
        return _super.call(this) || this;
    }
    AcWelcomeVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    //倒计时
    AcWelcomeVo.prototype.getCountDown = function () {
        var et = this.et;
        if (et < GameData.serverTime) {
            return LanguageManager.getlocal("acPunishEnd");
        }
        return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 18);
    };
    Object.defineProperty(AcWelcomeVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    return AcWelcomeVo;
}(AcBaseVo));
__reflect(AcWelcomeVo.prototype, "AcWelcomeVo");
//# sourceMappingURL=AcWelcomeVo.js.map