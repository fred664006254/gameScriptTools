var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var DailyGiftCfg = (function () {
            function DailyGiftCfg() {
                //每日赠送
                this._getReward = null;
                //每日的付费礼包
                //cost：调用的充值档位
                //limit：每日限制次数
                this._dailyCost = [];
            }
            Object.defineProperty(DailyGiftCfg.prototype, "getReward", {
                get: function () {
                    return this._getReward;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DailyGiftCfg.prototype, "dailyCost", {
                get: function () {
                    return this._dailyCost;
                },
                enumerable: true,
                configurable: true
            });
            //解析数据
            DailyGiftCfg.prototype.formatData = function (data) {
                if (data["getReward"]) {
                    this._getReward = data["getReward"];
                }
                if (data["dailyCost"]) {
                    this._dailyCost = data["dailyCost"];
                }
            };
            return DailyGiftCfg;
        }());
        AcCfg.DailyGiftCfg = DailyGiftCfg;
        __reflect(DailyGiftCfg.prototype, "Config.AcCfg.DailyGiftCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=DailyGiftCfg.js.map