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
         * 甜美馈赠/月夜仙缘
         * author yangchengguo
         * date 2019.8.19
         * @namespace SweetGiftCfg
         */
        var SweetGiftCfg = (function () {
            function SweetGiftCfg() {
                this.moonCakeList = [];
                this.rechargeList = [];
                this.achievementList = [];
                this.taskList = [];
                this.exchangeList = [];
            }
            SweetGiftCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "recharge") {
                        this.rechargeList = [];
                        for (var i = 0; i < data[key].length; i++) {
                            var itemCfg = new SweerGiftRecharageItem();
                            itemCfg.initData(data[key][i]);
                            itemCfg.id = String(i + 1);
                            this.rechargeList.push(itemCfg);
                        }
                    }
                    else if (key == "achievement") {
                        this.achievementList = [];
                        for (var i = 0; i < data[key].length; i++) {
                            var itemCfg = new SweerGiftAchievementItem();
                            itemCfg.initData(data[key][i]);
                            itemCfg.id = String(i + 1);
                            this.achievementList.push(itemCfg);
                        }
                    }
                    else if (key == "task") {
                        this.taskList = [];
                        for (var i = 0; i < data[key].length; i++) {
                            var itemCfg = new SweerGiftTaskItem();
                            itemCfg.initData(data[key][i]);
                            itemCfg.id = String(i + 1);
                            this.taskList.push(itemCfg);
                        }
                    }
                    else if (key == "shop") {
                        this.exchangeList = [];
                        for (var i = 0; i < data[key].length; i++) {
                            var itemCfg = new SweerGiftExchangeItem();
                            itemCfg.initData(data[key][i]);
                            itemCfg.id = String(i + 1);
                            this.exchangeList.push(itemCfg);
                        }
                    }
                }
                this.moonCakeList = [];
                if (data.moonCake1) {
                    this.moonCakeList.push(data.moonCake1);
                }
                if (data.moonCake2) {
                    this.moonCakeList.push(data.moonCake2);
                }
                if (data.moonCake3) {
                    this.moonCakeList.push(data.moonCake3);
                }
            };
            SweetGiftCfg.prototype.getRechargeList = function () {
                return this.rechargeList;
            };
            SweetGiftCfg.prototype.getAchievementList = function () {
                return this.achievementList;
            };
            SweetGiftCfg.prototype.getTaskList = function () {
                return this.taskList;
            };
            SweetGiftCfg.prototype.getExchangeList = function () {
                return this.exchangeList;
            };
            SweetGiftCfg.prototype.getMoonCakeList = function () {
                return this.moonCakeList;
            };
            return SweetGiftCfg;
        }());
        AcCfg.SweetGiftCfg = SweetGiftCfg;
        __reflect(SweetGiftCfg.prototype, "Config.AcCfg.SweetGiftCfg");
        /**累充item */
        var SweerGiftRecharageItem = (function (_super) {
            __extends(SweerGiftRecharageItem, _super);
            function SweerGiftRecharageItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**充值id */
                _this.id = null;
                /**充值金额 */
                _this.needGem = 0;
                /**充值奖励 */
                _this.getReward = null;
                _this.sortId = 0;
                return _this;
            }
            return SweerGiftRecharageItem;
        }(BaseItemCfg));
        AcCfg.SweerGiftRecharageItem = SweerGiftRecharageItem;
        __reflect(SweerGiftRecharageItem.prototype, "Config.AcCfg.SweerGiftRecharageItem");
        /**进度奖励item */
        var SweerGiftAchievementItem = (function (_super) {
            __extends(SweerGiftAchievementItem, _super);
            function SweerGiftAchievementItem() {
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
            return SweerGiftAchievementItem;
        }(BaseItemCfg));
        AcCfg.SweerGiftAchievementItem = SweerGiftAchievementItem;
        __reflect(SweerGiftAchievementItem.prototype, "Config.AcCfg.SweerGiftAchievementItem");
        /**活动任务item */
        var SweerGiftTaskItem = (function (_super) {
            __extends(SweerGiftTaskItem, _super);
            function SweerGiftTaskItem() {
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
            return SweerGiftTaskItem;
        }(BaseItemCfg));
        AcCfg.SweerGiftTaskItem = SweerGiftTaskItem;
        __reflect(SweerGiftTaskItem.prototype, "Config.AcCfg.SweerGiftTaskItem");
        /**兑换商店item */
        var SweerGiftExchangeItem = (function (_super) {
            __extends(SweerGiftExchangeItem, _super);
            function SweerGiftExchangeItem() {
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
            return SweerGiftExchangeItem;
        }(BaseItemCfg));
        AcCfg.SweerGiftExchangeItem = SweerGiftExchangeItem;
        __reflect(SweerGiftExchangeItem.prototype, "Config.AcCfg.SweerGiftExchangeItem");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=SweetGiftCfg.js.map