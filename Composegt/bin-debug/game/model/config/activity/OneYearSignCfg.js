var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var OneYearSignCfg = (function () {
            function OneYearSignCfg() {
                this.SignReward = [];
            }
            OneYearSignCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                }
            };
            return OneYearSignCfg;
        }());
        AcCfg.OneYearSignCfg = OneYearSignCfg;
        __reflect(OneYearSignCfg.prototype, "Config.AcCfg.OneYearSignCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
