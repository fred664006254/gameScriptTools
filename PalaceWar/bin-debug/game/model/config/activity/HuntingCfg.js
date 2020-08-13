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
         * 东郊狩猎
         * author yangchengguo
         * date 2019.8.5
         * @namespace HuntingCfg
         */
        var HuntingCfg = (function () {
            function HuntingCfg() {
                /**展示时间 */
                this.extraTime = 0;
                /**每日免费次数 */
                this.freeTime = 0;
                /**核心奖励 */
                this.show = 0;
                /**箭的基础伤害 */
                this.attack = 0;
                /**不同位置对应的伤害 */
                this.multiple = [];
                /**奖池奖励 */
                this.poolList = [];
                /** 击杀奖励*/
                this.achievementList = [];
                /**累计充值奖励 */
                this.rechargeList = [];
            }
            HuntingCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "achievement") {
                        this.achievementList = [];
                        for (var i = 0; i < data[key].length; i++) {
                            var itemCfg = new HuntingAchievementItem();
                            itemCfg.initData(data[key][i]);
                            itemCfg.id = String(i + 1);
                            this.achievementList.push(itemCfg);
                        }
                    }
                    else if (key == "recharge") {
                        this.rechargeList = [];
                        for (var i = 0; i < data[key].length; i++) {
                            var itemCfg = new HuntingRecharageItem();
                            itemCfg.initData(data[key][i]);
                            itemCfg.id = String(i + 1);
                            this.rechargeList.push(itemCfg);
                        }
                    }
                }
            };
            HuntingCfg.prototype.getHuntingPoolReward = function () {
                var rewards = "";
                for (var key in this.poolList) {
                    rewards += this.poolList[key][0] + "|";
                }
                return rewards.substring(0, rewards.length - 1);
            };
            /**击杀奖励 */
            HuntingCfg.prototype.getAchievementList = function () {
                return this.achievementList;
            };
            /**累计充值奖励 */
            HuntingCfg.prototype.getRechargeList = function () {
                return this.rechargeList;
            };
            return HuntingCfg;
        }());
        AcCfg.HuntingCfg = HuntingCfg;
        __reflect(HuntingCfg.prototype, "Config.AcCfg.HuntingCfg");
        /**击杀item */
        var HuntingAchievementItem = (function (_super) {
            __extends(HuntingAchievementItem, _super);
            function HuntingAchievementItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**动物id */
                _this.id = null;
                /**动物的血量 */
                _this.npcHp = 0;
                /**奖励 */
                _this.getReward = null;
                _this.sortId = 0;
                return _this;
            }
            return HuntingAchievementItem;
        }(BaseItemCfg));
        AcCfg.HuntingAchievementItem = HuntingAchievementItem;
        __reflect(HuntingAchievementItem.prototype, "Config.AcCfg.HuntingAchievementItem");
        /**累充item */
        var HuntingRecharageItem = (function (_super) {
            __extends(HuntingRecharageItem, _super);
            function HuntingRecharageItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**充值id */
                _this.id = null;
                /**充值金额 */
                _this.needGem = 0;
                /**特殊奖励 */
                _this.specialGift = 0;
                /**充值奖励 */
                _this.getReward = null;
                _this.sortId = 0;
                return _this;
            }
            return HuntingRecharageItem;
        }(BaseItemCfg));
        AcCfg.HuntingRecharageItem = HuntingRecharageItem;
        __reflect(HuntingRecharageItem.prototype, "Config.AcCfg.HuntingRecharageItem");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=HuntingCfg.js.map