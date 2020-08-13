var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var LotteryCfg = (function () {
            function LotteryCfg() {
                this._initialPrize = 0;
                this._addPrize = 0;
                this._prizeLimit = 0;
                this._cost = 0;
                this._getReward = null;
                this._discount = 0;
                this._recharge = [];
                this._weightList = [];
                this._lotteryPool = [];
                this._lotteryNum = [];
            }
            Object.defineProperty(LotteryCfg.prototype, "initialPrize", {
                get: function () {
                    return this._initialPrize;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LotteryCfg.prototype, "addPrize", {
                get: function () {
                    return this._addPrize;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LotteryCfg.prototype, "prizeLimit", {
                get: function () {
                    return this._prizeLimit;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LotteryCfg.prototype, "cost", {
                get: function () {
                    return this._cost;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LotteryCfg.prototype, "getReward", {
                get: function () {
                    return this._getReward;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LotteryCfg.prototype, "discount", {
                get: function () {
                    return this._discount;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LotteryCfg.prototype, "weightList", {
                get: function () {
                    return this._weightList;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LotteryCfg.prototype, "lotteryPool", {
                get: function () {
                    return this._lotteryPool;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LotteryCfg.prototype, "lotteryNum", {
                get: function () {
                    return this._lotteryNum;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LotteryCfg.prototype, "recharge", {
                get: function () {
                    return this._recharge;
                },
                enumerable: true,
                configurable: true
            });
            //解析数据
            LotteryCfg.prototype.formatData = function (data) {
                if (data["initialPrize"]) {
                    this._initialPrize = data["initialPrize"];
                }
                if (data["addPrize"]) {
                    this._addPrize = data["addPrize"];
                }
                if (data["prizeLimit"]) {
                    this._prizeLimit = data["prizeLimit"];
                }
                if (data["cost"]) {
                    this._cost = data["cost"];
                }
                if (data["getReward"]) {
                    this._getReward = data["getReward"];
                }
                if (data["discount"]) {
                    this._discount = data["discount"];
                }
                if (data["weightList"]) {
                    this._weightList = data["weightList"];
                }
                if (data["lotteryPool"]) {
                    this._lotteryPool = data["lotteryPool"];
                }
                if (data["lotteryNum"]) {
                    this._lotteryNum = data["lotteryNum"];
                }
                if (data["recharge"]) {
                    this._recharge = data["recharge"];
                }
            };
            //根据宝箱id 显示奖励物品
            LotteryCfg.prototype.getBoxRewardById = function (id) {
                if (this._lotteryNum[id]) {
                    return this._lotteryNum[id];
                }
                else {
                    return null;
                }
            };
            return LotteryCfg;
        }());
        AcCfg.LotteryCfg = LotteryCfg;
        __reflect(LotteryCfg.prototype, "Config.AcCfg.LotteryCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=LotteryCfg.js.map