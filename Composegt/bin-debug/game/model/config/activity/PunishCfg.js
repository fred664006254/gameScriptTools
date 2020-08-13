var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var PunishCfg = (function () {
            function PunishCfg() {
                this.itemNum = 0;
            }
            PunishCfg.prototype.formatData = function (data) {
                if (data) {
                    for (var key in data) {
                        this[key] = data[key];
                    }
                }
            };
            return PunishCfg;
        }());
        AcCfg.PunishCfg = PunishCfg;
        __reflect(PunishCfg.prototype, "Config.AcCfg.PunishCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
