var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var HuLaoCfg = (function () {
            function HuLaoCfg() {
            }
            //解析数据
            HuLaoCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        this[key] = data[key];
                    }
                }
            };
            return HuLaoCfg;
        }());
        AcCfg.HuLaoCfg = HuLaoCfg;
        __reflect(HuLaoCfg.prototype, "Config.AcCfg.HuLaoCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
