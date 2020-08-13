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
        /**诸葛亮传活动cfg */
        var LiangBiographyCfg = (function () {
            function LiangBiographyCfg() {
                /** 展示时间 */
                this.extraTime = 0;
                /**每日免费回忆次数 */
                this.freeTimes = 0;
                /**每次七星灯增加进度值 */
                this.addValue = 0;
                /**每次七星灯增加进度值 */
                this.exchange = null;
                /**大奖展示 */
                this.show = 0;
                /**奖励补发转换。一个七星灯转换一个孔明灯 */
                this.pool = null;
                /**活动期间的累计充值奖励 */
                this.liangBiographyRechargeItemCfgList = [];
                /**阶段奖励 */
                this.liangBiographyProcessingRewardItemCfgList = [];
            }
            /**
             * 初始化数据
             */
            LiangBiographyCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "processingReward") {
                        this.liangBiographyProcessingRewardItemCfgList.length = 0;
                        for (var i = 0; i < data[key].length; i++) {
                            var itemcfg = new LiangBiographyProcessingRewardItemCfg();
                            itemcfg.initData(data[key][i]);
                            itemcfg.id = Number(i) + 1;
                            this.liangBiographyProcessingRewardItemCfgList.push(itemcfg);
                        }
                    }
                    if (key == "recharge") {
                        this.liangBiographyRechargeItemCfgList.length = 0;
                        for (var i = 0; i < data[key].length; i++) {
                            var itemcfg = new LiangBiographyRechargeItemCfg();
                            itemcfg.initData(data[key][i]);
                            itemcfg.id = Number(i) + 1;
                            this.liangBiographyRechargeItemCfgList.push(itemcfg);
                        }
                    }
                }
            };
            /**奖池 */
            LiangBiographyCfg.prototype.rewardPoolList = function () {
                var rewards = "";
                for (var key in this.pool) {
                    rewards += this.pool[key][0] + "|";
                }
                return rewards.substring(0, rewards.length - 1);
            };
            /**最大奖池数量 */
            LiangBiographyCfg.prototype.maxProcessValue = function () {
                return this.liangBiographyProcessingRewardItemCfgList[this.liangBiographyProcessingRewardItemCfgList.length - 1].reviewTime;
            };
            LiangBiographyCfg.prototype.getProcessingRewardItemCfgById = function (id) {
                for (var i = 0; i < this.liangBiographyProcessingRewardItemCfgList.length; i++) {
                    var itemCfg = this.liangBiographyProcessingRewardItemCfgList[i];
                    if (itemCfg.id == id) {
                        return itemCfg;
                    }
                }
            };
            return LiangBiographyCfg;
        }());
        AcCfg.LiangBiographyCfg = LiangBiographyCfg;
        __reflect(LiangBiographyCfg.prototype, "Config.AcCfg.LiangBiographyCfg");
        /**活动期间的累计充值奖励 */
        var LiangBiographyRechargeItemCfg = (function (_super) {
            __extends(LiangBiographyRechargeItemCfg, _super);
            function LiangBiographyRechargeItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return LiangBiographyRechargeItemCfg;
        }(BaseItemCfg));
        AcCfg.LiangBiographyRechargeItemCfg = LiangBiographyRechargeItemCfg;
        __reflect(LiangBiographyRechargeItemCfg.prototype, "Config.AcCfg.LiangBiographyRechargeItemCfg");
        /**阶段奖励 */
        var LiangBiographyProcessingRewardItemCfg = (function (_super) {
            __extends(LiangBiographyProcessingRewardItemCfg, _super);
            function LiangBiographyProcessingRewardItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return LiangBiographyProcessingRewardItemCfg;
        }(BaseItemCfg));
        AcCfg.LiangBiographyProcessingRewardItemCfg = LiangBiographyProcessingRewardItemCfg;
        __reflect(LiangBiographyProcessingRewardItemCfg.prototype, "Config.AcCfg.LiangBiographyProcessingRewardItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=LiangBiographyCfg.js.map