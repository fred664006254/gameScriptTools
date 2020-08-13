var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var OneYearPackCfg = (function () {
            function OneYearPackCfg() {
                this.cost = 100;
                //第一次幸运值达到x时可以兑换红颜皮肤礼包
                this.luckExchangePoint1 = 50;
                ///1次满值之后幸运值达到x时可以兑换红颜皮肤礼包
                this.luckExchangePoint2 = 100;
                //幸运值的上限
                this.luckMax = 999999;
                //红颜皮肤礼包ID
                this.packItemID = 6031;
                //抽奖道具ID
                this.drawItemID = 6032;
                //皮肤预览
                //wifeSkinID：皮肤预览的皮肤ID
                this.wifeSkinShow = [];
                //抽奖转盘 --weight：权重  -luckValue：奖励幸运值 --reward：奖励
                this.lotteryPool = [];
            }
            OneYearPackCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                }
            };
            OneYearPackCfg.prototype.getSelectItemIdx = function (reward) {
                var index = 0;
                for (var i in this.lotteryPool) {
                    var unit = this.lotteryPool[i];
                    if (unit.reward == reward) {
                        index = Number(i);
                        break;
                    }
                }
                return index;
            };
            Object.defineProperty(OneYearPackCfg.prototype, "lotteryPoolLength", {
                get: function () {
                    var total = 0;
                    for (var key in this.lotteryPool) {
                        total++;
                    }
                    return total;
                },
                enumerable: true,
                configurable: true
            });
            return OneYearPackCfg;
        }());
        AcCfg.OneYearPackCfg = OneYearPackCfg;
        __reflect(OneYearPackCfg.prototype, "Config.AcCfg.OneYearPackCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
