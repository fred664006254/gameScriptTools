var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 付费礼包
 * date 2019.12.23
 * author ycg
 */
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var RechargeGiftCfg = (function () {
            function RechargeGiftCfg() {
            }
            RechargeGiftCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                }
            };
            return RechargeGiftCfg;
        }());
        AcCfg.RechargeGiftCfg = RechargeGiftCfg;
        __reflect(RechargeGiftCfg.prototype, "Config.AcCfg.RechargeGiftCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=RechargeGiftCfg.js.map