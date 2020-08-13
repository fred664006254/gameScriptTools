var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var MayDayRechargeCfg = (function () {
            function MayDayRechargeCfg() {
                //单抽一次的价格
                this._cost = 0;
                //获取的奖励
                this._getReward = '';
                //宝箱进度
                this._lotteryNum = [];
                //奖励池
                this._lotteryPool = [];
            }
            MayDayRechargeCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this["_" + key] = data[key];
                }
            };
            Object.defineProperty(MayDayRechargeCfg.prototype, "cost", {
                get: function () {
                    return this._cost;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MayDayRechargeCfg.prototype, "getReward", {
                get: function () {
                    return this._getReward;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MayDayRechargeCfg.prototype, "lotteryNum", {
                get: function () {
                    return this._lotteryNum;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MayDayRechargeCfg.prototype, "lotteryPool", {
                get: function () {
                    return this._lotteryPool;
                },
                enumerable: true,
                configurable: true
            });
            MayDayRechargeCfg.prototype.getBoxRewardById = function (id) {
                if (this._lotteryNum[id]) {
                    return this._lotteryNum[id];
                }
                else {
                    return null;
                }
            };
            MayDayRechargeCfg.prototype.getSelectItemIdx = function (reward) {
                var index = 0;
                for (var i in this._lotteryPool) {
                    var unit = this._lotteryPool[i];
                    if (unit[0] == reward) {
                        index = Number(i);
                        break;
                    }
                }
                return index;
            };
            return MayDayRechargeCfg;
        }());
        AcCfg.MayDayRechargeCfg = MayDayRechargeCfg;
        __reflect(MayDayRechargeCfg.prototype, "Config.AcCfg.MayDayRechargeCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
