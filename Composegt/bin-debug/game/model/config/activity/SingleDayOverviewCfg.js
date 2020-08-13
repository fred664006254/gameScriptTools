var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var SingleDayOverviewCfg = (function () {
            function SingleDayOverviewCfg() {
                this.Overview = [];
            }
            SingleDayOverviewCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                }
            };
            return SingleDayOverviewCfg;
        }());
        AcCfg.SingleDayOverviewCfg = SingleDayOverviewCfg;
        __reflect(SingleDayOverviewCfg.prototype, "Config.AcCfg.SingleDayOverviewCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
