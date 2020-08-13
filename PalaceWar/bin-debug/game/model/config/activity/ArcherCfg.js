var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var ArcherCfg = (function () {
            function ArcherCfg() {
                /** 单抽一次的价格 */
                this._cost = 0;
                /** 连续购买十次的折扣 */
                this._discount = 0;
                /** 获取的奖励 */
                this._getReward = '';
                /** 宝箱进度所给的奖励 */
                this._lotteryNum = [];
                /** 奖励池  */
                this._lotteryPool = [];
                /** 排行榜入榜最低次数 */
                this._rankNeedNum = 0;
                /** 排行榜单奖励 */
                this._rankReward = [];
                /** 累积充值奖励进度 */
                this._recharge = [];
            }
            /**
             * 初始化数据
             */
            ArcherCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this["_" + key] = data[key];
                }
            };
            Object.defineProperty(ArcherCfg.prototype, "cost", {
                /**
                 * 获得单次购买的价格
                 */
                get: function () {
                    return this._cost;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ArcherCfg.prototype, "discount", {
                /**
                * 获得连续购买十次的折扣
                */
                get: function () {
                    return this._discount;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ArcherCfg.prototype, "reward", {
                /**
                 * 获得获取的奖励
                 */
                get: function () {
                    return this._getReward;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ArcherCfg.prototype, "lotteryNum", {
                /**
                 * 获得宝箱进度所给的奖励
                 */
                get: function () {
                    return this._lotteryNum;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ArcherCfg.prototype, "rankNeedNum", {
                /**
                 * 获得排行榜入榜最低次数
                 */
                get: function () {
                    return this._rankNeedNum;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ArcherCfg.prototype, "rankReward", {
                /**
                 * 获得排行榜单奖励
                 */
                get: function () {
                    return this._rankReward;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ArcherCfg.prototype, "recharge", {
                /**
                 * 获得累积充值奖励进度
                 */
                get: function () {
                    return this._recharge;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ArcherCfg.prototype, "lotteryPool", {
                /**
                 * 获得奖励池
                 */
                get: function () {
                    return this._lotteryPool;
                },
                enumerable: true,
                configurable: true
            });
            /**
            * 获得宝箱进度所给的奖励
            */
            ArcherCfg.prototype.getBoxRewardById = function (id) {
                if (this._lotteryNum[id]) {
                    return this._lotteryNum[id];
                }
                else {
                    return null;
                }
            };
            /**
             * 获得奖励
             */
            ArcherCfg.prototype.getChargeRewardById = function (id) {
                if (this._recharge[id]) {
                    return this._recharge[id];
                }
                else {
                    return null;
                }
            };
            return ArcherCfg;
        }());
        AcCfg.ArcherCfg = ArcherCfg;
        __reflect(ArcherCfg.prototype, "Config.AcCfg.ArcherCfg");
        var ArcherItemCfg = (function (_super) {
            __extends(ArcherItemCfg, _super);
            function ArcherItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return ArcherItemCfg;
        }(BaseItemCfg));
        AcCfg.ArcherItemCfg = ArcherItemCfg;
        __reflect(ArcherItemCfg.prototype, "Config.AcCfg.ArcherItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=ArcherCfg.js.map