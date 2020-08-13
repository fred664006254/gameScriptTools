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
        * 中秋活动 的 cfg
        * @author 张朝阳
        * date 2018/8/28
        * @class MidAutumnCfg
        */
        var MidAutumnCfg = (function () {
            function MidAutumnCfg() {
                /** 单抽一次的价格 */
                this.cost = 0;
                /** 连续购买十次的折扣 */
                this.discount = 0;
                /**任务列表 */
                this.taskItemListCfg = [];
                /**充值列表 */
                this.rechargeItemCfg = [];
                this.lotteryItemCfg = [];
                this.lotteryPool = [];
            }
            /**
             * 初始化数据
             */
            MidAutumnCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this["" + key] = data[key];
                    if (key == "task") {
                        this.taskItemListCfg = [];
                        for (var i = 0; i < data[key].length; i++) {
                            var itemcfg = new MidAutumnTaskItemCfg();
                            itemcfg.initData(data[key][i]);
                            itemcfg.id = String(i + 1);
                            this.taskItemListCfg.push(itemcfg);
                        }
                    }
                    if (key == "recharge") {
                        this.rechargeItemCfg = [];
                        for (var i = 0; i < data[key].length; i++) {
                            var itemcfg = new MidAutumnRechargeItemCfg();
                            itemcfg.initData(data[key][i]);
                            itemcfg.id = String(i + 1);
                            this.rechargeItemCfg.push(itemcfg);
                        }
                    }
                    if (key == "lotteryNum") {
                        this.lotteryItemCfg = [];
                        for (var i = 0; i < data[key].length; i++) {
                            var itemcfg = new MidAutumnLotteryItemCfg();
                            itemcfg.initData(data[key][i]);
                            itemcfg.id = String(i + 1);
                            this.lotteryItemCfg.push(itemcfg);
                        }
                    }
                    console.log("11");
                }
            };
            /**
             * 获得充值列表
             */
            MidAutumnCfg.prototype.rechargeList = function () {
                return this.rechargeItemCfg;
            };
            /**
             * 获得任务列表
             */
            MidAutumnCfg.prototype.getTaskList = function () {
                return this.taskItemListCfg;
            };
            MidAutumnCfg.prototype.getTaskValue = function (id) {
                for (var i = 0; i < this.taskItemListCfg.length; i++) {
                    if (id = this.taskItemListCfg[i].id) {
                        return this.taskItemListCfg[i].value;
                    }
                }
                return null;
            };
            /**
             * 获得宝箱列表
             */
            MidAutumnCfg.prototype.getBoxList = function () {
                return this.lotteryItemCfg;
            };
            /**奖池 */
            MidAutumnCfg.prototype.rewardPoolList = function () {
                var rewards = "";
                for (var key in this.lotteryPool) {
                    rewards += this.lotteryPool[key][0] + "|";
                }
                return rewards.substring(0, rewards.length - 1);
            };
            MidAutumnCfg.prototype.getRewardWife = function () {
                return '223';
            };
            MidAutumnCfg.prototype.getRewardServant = function () {
                return '1056';
            };
            return MidAutumnCfg;
        }());
        AcCfg.MidAutumnCfg = MidAutumnCfg;
        __reflect(MidAutumnCfg.prototype, "Config.AcCfg.MidAutumnCfg");
        /**
         * 任务的
         */
        var MidAutumnTaskItemCfg = (function (_super) {
            __extends(MidAutumnTaskItemCfg, _super);
            function MidAutumnTaskItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.openType = null;
                return _this;
            }
            return MidAutumnTaskItemCfg;
        }(BaseItemCfg));
        AcCfg.MidAutumnTaskItemCfg = MidAutumnTaskItemCfg;
        __reflect(MidAutumnTaskItemCfg.prototype, "Config.AcCfg.MidAutumnTaskItemCfg");
        /**
         * 充值的
         */
        var MidAutumnRechargeItemCfg = (function (_super) {
            __extends(MidAutumnRechargeItemCfg, _super);
            function MidAutumnRechargeItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return MidAutumnRechargeItemCfg;
        }(BaseItemCfg));
        AcCfg.MidAutumnRechargeItemCfg = MidAutumnRechargeItemCfg;
        __reflect(MidAutumnRechargeItemCfg.prototype, "Config.AcCfg.MidAutumnRechargeItemCfg");
        /**
         * 宝箱的
         */
        var MidAutumnLotteryItemCfg = (function (_super) {
            __extends(MidAutumnLotteryItemCfg, _super);
            function MidAutumnLotteryItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return MidAutumnLotteryItemCfg;
        }(BaseItemCfg));
        AcCfg.MidAutumnLotteryItemCfg = MidAutumnLotteryItemCfg;
        __reflect(MidAutumnLotteryItemCfg.prototype, "Config.AcCfg.MidAutumnLotteryItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=MidAutumnCfg.js.map