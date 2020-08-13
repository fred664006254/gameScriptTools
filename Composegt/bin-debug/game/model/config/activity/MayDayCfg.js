var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var MayDayCfg = (function () {
            function MayDayCfg() {
                //单抽一次的价格
                this._cost = 0;
                //连续购买十次的折扣
                this._discount = 0;
                //获取的奖励
                this._getReward = '';
                //宝箱进度
                this._lotteryNum = [];
                //奖励池
                this._lotteryPool = [];
                //排行榜入榜最低次数
                this._rankNeedNum = 0;
                //排行榜单奖励
                this._rankReward = [];
                //累积充值奖励进度
                this._recharge = [];
                //任务奖励进度
                this._task = [];
            }
            MayDayCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this["_" + key] = data[key];
                }
            };
            Object.defineProperty(MayDayCfg.prototype, "cost", {
                get: function () {
                    return this._cost;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MayDayCfg.prototype, "discount", {
                get: function () {
                    return this._discount;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MayDayCfg.prototype, "getReward", {
                get: function () {
                    return this._getReward;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MayDayCfg.prototype, "lotteryNum", {
                get: function () {
                    return this._lotteryNum;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MayDayCfg.prototype, "lotteryPool", {
                get: function () {
                    return this._lotteryPool;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MayDayCfg.prototype, "rankNeedNum", {
                get: function () {
                    return this._rankNeedNum;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MayDayCfg.prototype, "rankReward", {
                get: function () {
                    return this._rankReward;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MayDayCfg.prototype, "recharge", {
                get: function () {
                    return this._recharge;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MayDayCfg.prototype, "task", {
                get: function () {
                    return this._task;
                },
                enumerable: true,
                configurable: true
            });
            MayDayCfg.prototype.getBoxRewardById = function (id) {
                if (this._lotteryNum[id]) {
                    return this._lotteryNum[id];
                }
                else {
                    return null;
                }
            };
            MayDayCfg.prototype.getChargeRewardById = function (id) {
                if (this._recharge[id]) {
                    return this._recharge[id];
                }
                else {
                    return null;
                }
            };
            MayDayCfg.prototype.getSelectItemIdx = function (reward) {
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
            return MayDayCfg;
        }());
        AcCfg.MayDayCfg = MayDayCfg;
        __reflect(MayDayCfg.prototype, "Config.AcCfg.MayDayCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
