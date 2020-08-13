var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var AllianceRechargeTotalCfg = (function () {
            function AllianceRechargeTotalCfg() {
                this.extraTime = 0;
                this._countReward = [];
                this._count = [];
            }
            Object.defineProperty(AllianceRechargeTotalCfg.prototype, "countReward", {
                get: function () {
                    return this._countReward;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AllianceRechargeTotalCfg.prototype, "count", {
                get: function () {
                    return this._count;
                },
                enumerable: true,
                configurable: true
            });
            //解析数据
            AllianceRechargeTotalCfg.prototype.formatData = function (data) {
                if (data.extraTime) {
                    this.extraTime = data.extraTime;
                }
                if (data["totalReward"]) {
                    this._countReward = data["totalReward"];
                }
                if (data["total"]) {
                    this._count = data["total"];
                }
            };
            return AllianceRechargeTotalCfg;
        }());
        AcCfg.AllianceRechargeTotalCfg = AllianceRechargeTotalCfg;
        __reflect(AllianceRechargeTotalCfg.prototype, "Config.AcCfg.AllianceRechargeTotalCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=AllianceRechargeTotalCfg.js.map