var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var OneYearHeraldCfg = (function () {
            function OneYearHeraldCfg() {
                this.wifeId = 100;
                this.servantId = 100;
            }
            OneYearHeraldCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                }
            };
            return OneYearHeraldCfg;
        }());
        AcCfg.OneYearHeraldCfg = OneYearHeraldCfg;
        __reflect(OneYearHeraldCfg.prototype, "Config.AcCfg.OneYearHeraldCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
