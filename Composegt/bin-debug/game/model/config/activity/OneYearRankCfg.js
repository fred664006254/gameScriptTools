var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var OneYearRankCfg = (function () {
            function OneYearRankCfg() {
                this.oneYearRankRaward = "3805"; //--图标id
            }
            OneYearRankCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                }
            };
            return OneYearRankCfg;
        }());
        AcCfg.OneYearRankCfg = OneYearRankCfg;
        __reflect(OneYearRankCfg.prototype, "Config.AcCfg.OneYearRankCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
