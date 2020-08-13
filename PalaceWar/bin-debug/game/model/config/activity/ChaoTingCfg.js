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
        /**
         * 朝廷诏令
         * author ycg
         * date 2020.3.23
         * @namespace ChaoTingCfg
         */
        var ChaoTingCfg = (function () {
            function ChaoTingCfg() {
                this.rankRewardList = [];
                this.rechargeList = [];
                this.taskList = [];
            }
            ChaoTingCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "rankReward") {
                        for (var k in data[key]) {
                            var item = new ChaotingRankRewardItem();
                            item.initData(data[key][k]);
                            item.id = Number(k) + 1;
                            this.rankRewardList.push(item);
                        }
                    }
                    else if (key == "recharge2") {
                        for (var k in data[key]) {
                            var item = new ChaotingRechargeItem();
                            item.initData(data[key][k]);
                            item.id = Number(k) + 1;
                            item.display = data[key][k].display - 1;
                            this.rechargeList.push(item);
                        }
                    }
                    else if (key == "task") {
                        for (var k in data[key]) {
                            var item = new ChaotingTaskItem();
                            item.initData(data[key][k]);
                            item.id = Number(k) + 1;
                            this.taskList.push(item);
                        }
                    }
                }
            };
            ChaoTingCfg.prototype.getRankRewardCfg = function () {
                return this.rankRewardList;
            };
            ChaoTingCfg.prototype.getRechargeCfg = function () {
                return this.rechargeList;
            };
            ChaoTingCfg.prototype.getTaskCfg = function () {
                return this.taskList;
            };
            return ChaoTingCfg;
        }());
        AcCfg.ChaoTingCfg = ChaoTingCfg;
        __reflect(ChaoTingCfg.prototype, "Config.AcCfg.ChaoTingCfg");
        /**排行奖励item */
        var ChaotingRankRewardItem = (function (_super) {
            __extends(ChaotingRankRewardItem, _super);
            function ChaotingRankRewardItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**id */
                _this.id = null;
                /**排名 */
                _this.rank = [];
                /**奖励 */
                _this.getReward = null;
                return _this;
            }
            return ChaotingRankRewardItem;
        }(BaseItemCfg));
        __reflect(ChaotingRankRewardItem.prototype, "ChaotingRankRewardItem");
        /**充值奖励item */
        var ChaotingRechargeItem = (function (_super) {
            __extends(ChaotingRechargeItem, _super);
            function ChaotingRechargeItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**id */
                _this.id = null;
                /**所需额度 */
                _this.needGem = 0;
                /**解锁条件 */
                _this.display = 0;
                /**奖励 */
                _this.getReward = null;
                _this.sortId = 0;
                return _this;
            }
            return ChaotingRechargeItem;
        }(BaseItemCfg));
        __reflect(ChaotingRechargeItem.prototype, "ChaotingRechargeItem");
        /**任务奖励item */
        var ChaotingTaskItem = (function (_super) {
            __extends(ChaotingTaskItem, _super);
            function ChaotingTaskItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**id */
                _this.id = null;
                _this.openType = null;
                _this.questType = 0;
                _this.value = 0;
                /**奖励 */
                _this.getReward = null;
                _this.sortId = 0;
                return _this;
            }
            return ChaotingTaskItem;
        }(BaseItemCfg));
        __reflect(ChaotingTaskItem.prototype, "ChaotingTaskItem");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=ChaoTingCfg.js.map