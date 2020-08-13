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
         * 三国活动2
         * author yangchengguo
         * date 2020.2.10
         * @namespace ThreekingdomsOfWifeCfg
         */
        var ThreekingdomsOfWifeCfg = (function () {
            function ThreekingdomsOfWifeCfg() {
                this.achieveList = [];
                this.rechargeList = [];
            }
            ThreekingdomsOfWifeCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "achievement") {
                        this.achieveList = [];
                        for (var k in data[key]) {
                            var itemCfg = new ThreekingdomsOfWifeAchieveItem();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = Number(k) + 1;
                            this.achieveList.push(itemCfg);
                        }
                    }
                    else if (key == "recharge") {
                        this.rechargeList = [];
                        for (var k in data[key]) {
                            var itemCfg = new ThreekingdomsOfWifeRechargeItem();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = Number(k) + 1;
                            this.rechargeList.push(itemCfg);
                        }
                    }
                    else if (key == "poolList") {
                        var str = "";
                        for (var k in data[key]) {
                            str += data[key][k][0] + "|";
                        }
                        this.poolRewards = str.substring(0, str.length - 1);
                    }
                }
            };
            ThreekingdomsOfWifeCfg.prototype.getAchieveCfg = function () {
                return this.achieveList;
            };
            ThreekingdomsOfWifeCfg.prototype.getRechargeCfg = function () {
                return this.rechargeList;
            };
            ThreekingdomsOfWifeCfg.prototype.getPoolRewards = function () {
                return this.poolRewards;
            };
            return ThreekingdomsOfWifeCfg;
        }());
        AcCfg.ThreekingdomsOfWifeCfg = ThreekingdomsOfWifeCfg;
        __reflect(ThreekingdomsOfWifeCfg.prototype, "Config.AcCfg.ThreekingdomsOfWifeCfg");
        /**进度奖励item */
        var ThreekingdomsOfWifeAchieveItem = (function (_super) {
            __extends(ThreekingdomsOfWifeAchieveItem, _super);
            function ThreekingdomsOfWifeAchieveItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**id */
                _this.id = null;
                /**所需分数 */
                _this.specialnum = 0;
                /**奖励 */
                _this.getReward = null;
                _this.sortId = 0;
                return _this;
            }
            return ThreekingdomsOfWifeAchieveItem;
        }(BaseItemCfg));
        AcCfg.ThreekingdomsOfWifeAchieveItem = ThreekingdomsOfWifeAchieveItem;
        __reflect(ThreekingdomsOfWifeAchieveItem.prototype, "Config.AcCfg.ThreekingdomsOfWifeAchieveItem");
        /**充值奖励item */
        var ThreekingdomsOfWifeRechargeItem = (function (_super) {
            __extends(ThreekingdomsOfWifeRechargeItem, _super);
            function ThreekingdomsOfWifeRechargeItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**id */
                _this.id = null;
                /**所需额度 */
                _this.needGem = 0;
                /**物品数量 */
                _this.specialGift = 0;
                /**奖励 */
                _this.getReward = null;
                _this.sortId = 0;
                return _this;
            }
            return ThreekingdomsOfWifeRechargeItem;
        }(BaseItemCfg));
        AcCfg.ThreekingdomsOfWifeRechargeItem = ThreekingdomsOfWifeRechargeItem;
        __reflect(ThreekingdomsOfWifeRechargeItem.prototype, "Config.AcCfg.ThreekingdomsOfWifeRechargeItem");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=ThreekingdomsOfWifeCfg.js.map