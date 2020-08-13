var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var WifeComeCfg = (function () {
            function WifeComeCfg() {
            }
            WifeComeCfg.prototype.formatData = function (data) {
                this.wifeId = data.wifeId;
                this.exchange = data.exchange;
                this.need = data.need;
            };
            return WifeComeCfg;
        }());
        AcCfg.WifeComeCfg = WifeComeCfg;
        __reflect(WifeComeCfg.prototype, "Config.AcCfg.WifeComeCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
