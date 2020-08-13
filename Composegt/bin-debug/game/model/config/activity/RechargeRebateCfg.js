var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var RechargeRebateCfg = (function () {
            function RechargeRebateCfg() {
            }
            //解析数据
            RechargeRebateCfg.prototype.formatData = function (data) {
                this.list = {};
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        this.list[key] = data[key];
                    }
                }
            };
            RechargeRebateCfg.prototype.getList = function () {
                return this.list;
            };
            return RechargeRebateCfg;
        }());
        AcCfg.RechargeRebateCfg = RechargeRebateCfg;
        __reflect(RechargeRebateCfg.prototype, "Config.AcCfg.RechargeRebateCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
