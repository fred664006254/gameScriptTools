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
        var MaChaoCfg = (function () {
            function MaChaoCfg() {
                /** 排行榜入榜最低次数 */
                this.rankNeedNum = 0;
                /**任务list */
                this.taskItemListCfg = [];
                /**充值list */
                this.rechargeItemListCfg = [];
                /**排行榜list */
                this.rankItemListCfg = [];
            }
            /**
             * 初始化数据
             */
            MaChaoCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "task") {
                        this.taskItemListCfg = [];
                        for (var i = 0; i < data[key].length; i++) {
                            var itemcfg = new MaChaoTaskItemCfg();
                            itemcfg.initData(data[key][i]);
                            itemcfg.id = String(i + 1);
                            this.taskItemListCfg.push(itemcfg);
                        }
                    }
                    if (key == "recharge") {
                        this.rechargeItemListCfg = [];
                        for (var i = 0; i < data[key].length; i++) {
                            var itemcfg = new MaChaoRechargeItemCfg();
                            itemcfg.initData(data[key][i]);
                            itemcfg.id = String(i + 1);
                            this.rechargeItemListCfg.push(itemcfg);
                        }
                    }
                    if (key == "rankReward") {
                        this.rankItemListCfg = [];
                        for (var i = 0; i < data[key].length; i++) {
                            var itemcfg = new MaChaoRankItemCfg();
                            itemcfg.initData(data[key][i]);
                            itemcfg.id = String(i + 1);
                            this.rankItemListCfg.push(itemcfg);
                        }
                    }
                }
                console.log('1');
            };
            /**
             * 获得奖励
             */
            MaChaoCfg.prototype.getChargeRewardById = function (id) {
                // if (this._recharge[id]) {
                //     return this._recharge[id];
                // }
                // else {
                //     return null;
                // }
            };
            /**
             * 获得任务的openType
             */
            MaChaoCfg.prototype.getTaskType = function (id) {
                for (var i = 0; i < this.taskItemListCfg.length; i++) {
                    if (id == this.taskItemListCfg[i].id) {
                        return this.taskItemListCfg[i].openType;
                    }
                }
                return null;
            };
            MaChaoCfg.prototype.getRewardIcon = function () {
                return this.getReward;
            };
            /**奖池 */
            MaChaoCfg.prototype.getRewardPool = function () {
                var rewards = "";
                for (var key in this.typePool1) {
                    rewards += this.typePool1[key][0] + "|";
                }
                return rewards.substring(0, rewards.length - 1);
            };
            return MaChaoCfg;
        }());
        AcCfg.MaChaoCfg = MaChaoCfg;
        __reflect(MaChaoCfg.prototype, "Config.AcCfg.MaChaoCfg");
        /**任务item */
        var MaChaoTaskItemCfg = (function (_super) {
            __extends(MaChaoTaskItemCfg, _super);
            function MaChaoTaskItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.openType = null;
                return _this;
            }
            return MaChaoTaskItemCfg;
        }(BaseItemCfg));
        AcCfg.MaChaoTaskItemCfg = MaChaoTaskItemCfg;
        __reflect(MaChaoTaskItemCfg.prototype, "Config.AcCfg.MaChaoTaskItemCfg");
        /**充值item */
        var MaChaoRechargeItemCfg = (function (_super) {
            __extends(MaChaoRechargeItemCfg, _super);
            function MaChaoRechargeItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return MaChaoRechargeItemCfg;
        }(BaseItemCfg));
        AcCfg.MaChaoRechargeItemCfg = MaChaoRechargeItemCfg;
        __reflect(MaChaoRechargeItemCfg.prototype, "Config.AcCfg.MaChaoRechargeItemCfg");
        /**充值item */
        var MaChaoRankItemCfg = (function (_super) {
            __extends(MaChaoRankItemCfg, _super);
            function MaChaoRankItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(MaChaoRankItemCfg.prototype, "maxRank", {
                /**最大 */
                get: function () {
                    return this.rank[1];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MaChaoRankItemCfg.prototype, "minRank", {
                /**最小 */
                get: function () {
                    return this.rank[0];
                },
                enumerable: true,
                configurable: true
            });
            return MaChaoRankItemCfg;
        }(BaseItemCfg));
        AcCfg.MaChaoRankItemCfg = MaChaoRankItemCfg;
        __reflect(MaChaoRankItemCfg.prototype, "Config.AcCfg.MaChaoRankItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=MaChaoCfg.js.map