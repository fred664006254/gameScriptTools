var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var GemLotteryCfg = (function () {
            function GemLotteryCfg() {
                this.cost = 100;
                this.backPayNum = 0;
                //抽奖转盘 --weight：权重  -luckValue：奖励幸运值 --reward：奖励
                this.lotteryBasePool = [];
            }
            GemLotteryCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "backpay") {
                        this.backPayNum = GameData.formatRewardItem(data[key])[0].num;
                    }
                }
            };
            Object.defineProperty(GemLotteryCfg.prototype, "lotteryPoolLength", {
                get: function () {
                    var total = 0;
                    for (var key in this.lotteryBasePool) {
                        total++;
                    }
                    return total;
                },
                enumerable: true,
                configurable: true
            });
            return GemLotteryCfg;
        }());
        AcCfg.GemLotteryCfg = GemLotteryCfg;
        __reflect(GemLotteryCfg.prototype, "Config.AcCfg.GemLotteryCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
