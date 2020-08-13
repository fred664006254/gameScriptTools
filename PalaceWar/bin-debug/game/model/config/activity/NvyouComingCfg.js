var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var NvyouComingCfg = (function () {
            function NvyouComingCfg() {
            }
            NvyouComingCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                }
            };
            return NvyouComingCfg;
        }());
        AcCfg.NvyouComingCfg = NvyouComingCfg;
        __reflect(NvyouComingCfg.prototype, "Config.AcCfg.NvyouComingCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=NvyouComingCfg.js.map