var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var ChargeReturnGemCfg = (function () {
            function ChargeReturnGemCfg() {
                this.rebateLimit = 0;
                this.rebateRate = 0;
            }
            ChargeReturnGemCfg.prototype.formatData = function (data) {
                this.rebateRate = data.rebateRate;
                this.rebateLimit = data.rebateLimit;
            };
            return ChargeReturnGemCfg;
        }());
        AcCfg.ChargeReturnGemCfg = ChargeReturnGemCfg;
        __reflect(ChargeReturnGemCfg.prototype, "Config.AcCfg.ChargeReturnGemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
