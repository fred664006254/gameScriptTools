var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var OneYearOverviewCfg = (function () {
            function OneYearOverviewCfg() {
                this.Overview = [];
            }
            OneYearOverviewCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                }
            };
            return OneYearOverviewCfg;
        }());
        AcCfg.OneYearOverviewCfg = OneYearOverviewCfg;
        __reflect(OneYearOverviewCfg.prototype, "Config.AcCfg.OneYearOverviewCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));