var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var RescueCfg = (function () {
            function RescueCfg() {
                this.itemNum = 0;
            }
            RescueCfg.prototype.formatData = function (data) {
                if (data) {
                    for (var key in data) {
                        this[key] = data[key];
                    }
                }
            };
            return RescueCfg;
        }());
        AcCfg.RescueCfg = RescueCfg;
        __reflect(RescueCfg.prototype, "Config.AcCfg.RescueCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
