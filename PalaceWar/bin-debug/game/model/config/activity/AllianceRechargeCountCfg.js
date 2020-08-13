var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var AllianceRechargeCountCfg = (function () {
            function AllianceRechargeCountCfg() {
                this.extraTime = 0;
                this._countReward = [];
                this._count = [];
            }
            Object.defineProperty(AllianceRechargeCountCfg.prototype, "countReward", {
                get: function () {
                    return this._countReward;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AllianceRechargeCountCfg.prototype, "count", {
                get: function () {
                    return this._count;
                },
                enumerable: true,
                configurable: true
            });
            //解析数据
            AllianceRechargeCountCfg.prototype.formatData = function (data) {
                if (data.extraTime) {
                    this.extraTime = data.extraTime;
                }
                if (data["countReward"]) {
                    this._countReward = data["countReward"];
                }
                if (data["count"]) {
                    this._count = data["count"];
                }
            };
            return AllianceRechargeCountCfg;
        }());
        AcCfg.AllianceRechargeCountCfg = AllianceRechargeCountCfg;
        __reflect(AllianceRechargeCountCfg.prototype, "Config.AcCfg.AllianceRechargeCountCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=AllianceRechargeCountCfg.js.map