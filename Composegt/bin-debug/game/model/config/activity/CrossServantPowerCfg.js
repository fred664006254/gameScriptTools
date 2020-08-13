var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var CrossServantPowerCfg = (function () {
            function CrossServantPowerCfg() {
                this.rankList1 = [];
                this.task = [];
            }
            CrossServantPowerCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                }
            };
            return CrossServantPowerCfg;
        }());
        AcCfg.CrossServantPowerCfg = CrossServantPowerCfg;
        __reflect(CrossServantPowerCfg.prototype, "Config.AcCfg.CrossServantPowerCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
