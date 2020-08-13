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
         * 投石破敌
         * author yangchengguo
         * date 2019.8.27
         * @namespace ThrowStoneCfg
         */
        var ThrowStoneCfg = (function () {
            function ThrowStoneCfg() {
                this.scoreGet = [];
                this.poolRewards = null;
                this.rechargeList = [];
                this.achievementList = [];
            }
            ThrowStoneCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "recharge") {
                        this.rechargeList = [];
                        for (var k in data[key]) {
                            var itemCfg = new ThrowStoneRecharageItem();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = String(k);
                            this.rechargeList.push(itemCfg);
                        }
                    }
                    else if (key == "achievement") {
                        this.achievementList = [];
                        for (var k in data[key]) {
                            var itemCfg = new ThrowStoneAchievementItem();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = String(k);
                            this.achievementList.push(itemCfg);
                        }
                    }
                    else if (key == "pool") {
                        var str = "";
                        for (var k in data[key]) {
                            str += data[key][k][0] + "|";
                        }
                        this.poolRewards = str.substring(0, str.length - 1);
                    }
                }
            };
            ThrowStoneCfg.prototype.getRechargeList = function () {
                return this.rechargeList;
            };
            ThrowStoneCfg.prototype.getAchievementList = function () {
                return this.achievementList;
            };
            ThrowStoneCfg.prototype.getPoolRewards = function () {
                return this.poolRewards;
            };
            return ThrowStoneCfg;
        }());
        AcCfg.ThrowStoneCfg = ThrowStoneCfg;
        __reflect(ThrowStoneCfg.prototype, "Config.AcCfg.ThrowStoneCfg");
        /**累充item */
        var ThrowStoneRecharageItem = (function (_super) {
            __extends(ThrowStoneRecharageItem, _super);
            function ThrowStoneRecharageItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**充值id */
                _this.id = null;
                /**充值金额 */
                _this.needGem = 0;
                /**充值奖励 */
                _this.getReward = null;
                /**特殊物品 */
                _this.specialGift = 0;
                _this.sortId = 0;
                return _this;
            }
            return ThrowStoneRecharageItem;
        }(BaseItemCfg));
        AcCfg.ThrowStoneRecharageItem = ThrowStoneRecharageItem;
        __reflect(ThrowStoneRecharageItem.prototype, "Config.AcCfg.ThrowStoneRecharageItem");
        /**进度奖励item */
        var ThrowStoneAchievementItem = (function (_super) {
            __extends(ThrowStoneAchievementItem, _super);
            function ThrowStoneAchievementItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**充值id */
                _this.id = null;
                /**所需分数 */
                _this.needNum = 0;
                /**奖励 */
                _this.getReward = null;
                _this.sortId = 0;
                return _this;
            }
            return ThrowStoneAchievementItem;
        }(BaseItemCfg));
        AcCfg.ThrowStoneAchievementItem = ThrowStoneAchievementItem;
        __reflect(ThrowStoneAchievementItem.prototype, "Config.AcCfg.ThrowStoneAchievementItem");
        /**活动任务item */
        var ThrowStoneTaskItem = (function (_super) {
            __extends(ThrowStoneTaskItem, _super);
            function ThrowStoneTaskItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**id */
                _this.id = null;
                /**任务类型*/
                _this.questType = 0;
                /**跳转类型 */
                _this.openType = null;
                /**进度 */
                _this.value = 0;
                /**奖励 */
                _this.getReward = null;
                _this.sortId = 0;
                return _this;
            }
            return ThrowStoneTaskItem;
        }(BaseItemCfg));
        AcCfg.ThrowStoneTaskItem = ThrowStoneTaskItem;
        __reflect(ThrowStoneTaskItem.prototype, "Config.AcCfg.ThrowStoneTaskItem");
        /**商店item */
        var ThrowStoneShopItem = (function (_super) {
            __extends(ThrowStoneShopItem, _super);
            function ThrowStoneShopItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**id */
                _this.id = null;
                /**折扣 */
                _this.discount = 0;
                /**限购*/
                _this.limit = 0;
                /**需要道具 */
                _this.needGem = null;
                /**奖励 */
                _this.getReward = null;
                _this.sortId = 0;
                return _this;
            }
            return ThrowStoneShopItem;
        }(BaseItemCfg));
        AcCfg.ThrowStoneShopItem = ThrowStoneShopItem;
        __reflect(ThrowStoneShopItem.prototype, "Config.AcCfg.ThrowStoneShopItem");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=ThrowStoneCfg.js.map