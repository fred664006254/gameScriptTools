var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var JarukaiCfg = (function () {
            function JarukaiCfg() {
            }
            //解析数据
            JarukaiCfg.prototype.formatData = function (data) {
            };
            return JarukaiCfg;
        }());
        AcCfg.JarukaiCfg = JarukaiCfg;
        __reflect(JarukaiCfg.prototype, "Config.AcCfg.JarukaiCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
