var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        /**
         * 功能预告
         */
        var WelcomeCfg = (function () {
            function WelcomeCfg() {
            }
            WelcomeCfg.prototype.formatData = function (data) {
                if (data) {
                    for (var key in data) {
                        this[key] = data[key];
                    }
                }
            };
            return WelcomeCfg;
        }());
        AcCfg.WelcomeCfg = WelcomeCfg;
        __reflect(WelcomeCfg.prototype, "Config.AcCfg.WelcomeCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=WelcomeCfg.js.map