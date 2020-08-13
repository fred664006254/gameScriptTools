var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        /**
        *  首冲重置 的 cfg
        * @author 张朝阳
        * date 2019/7/1
        * @class RechargeResetCfg
        */
        var RechargeResetCfg = (function () {
            function RechargeResetCfg() {
            }
            RechargeResetCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this["" + key] = data[key];
                }
            };
            return RechargeResetCfg;
        }());
        AcCfg.RechargeResetCfg = RechargeResetCfg;
        __reflect(RechargeResetCfg.prototype, "Config.AcCfg.RechargeResetCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=RechargeResetCfg.js.map