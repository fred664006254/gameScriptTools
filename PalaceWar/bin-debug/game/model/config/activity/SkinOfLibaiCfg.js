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
         * 酒神诗仙
         * author yangchengguo
         * date 2020.2.18
         * @namespace SkinOfLibaiCfg
         */
        var SkinOfLibaiCfg = (function () {
            function SkinOfLibaiCfg() {
                this.achieveList = [];
                this.rechargeList = [];
            }
            SkinOfLibaiCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "achievement") {
                        this.achieveList = [];
                        for (var k in data[key]) {
                            var itemCfg = new SkinOfLibaiAchieveItem();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = Number(k);
                            this.achieveList.push(itemCfg);
                        }
                    }
                    else if (key == "recharge") {
                        this.rechargeList = [];
                        for (var k in data[key]) {
                            var itemCfg = new SkinOfLibaiRechargeItem();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = Number(k);
                            this.rechargeList.push(itemCfg);
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
            SkinOfLibaiCfg.prototype.getAchieveCfg = function () {
                return this.achieveList;
            };
            SkinOfLibaiCfg.prototype.getRechargeCfg = function () {
                return this.rechargeList;
            };
            SkinOfLibaiCfg.prototype.getPoolRewards = function () {
                return this.poolRewards;
            };
            return SkinOfLibaiCfg;
        }());
        AcCfg.SkinOfLibaiCfg = SkinOfLibaiCfg;
        __reflect(SkinOfLibaiCfg.prototype, "Config.AcCfg.SkinOfLibaiCfg");
        /**进度奖励item */
        var SkinOfLibaiAchieveItem = (function (_super) {
            __extends(SkinOfLibaiAchieveItem, _super);
            function SkinOfLibaiAchieveItem() {
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
            return SkinOfLibaiAchieveItem;
        }(BaseItemCfg));
        AcCfg.SkinOfLibaiAchieveItem = SkinOfLibaiAchieveItem;
        __reflect(SkinOfLibaiAchieveItem.prototype, "Config.AcCfg.SkinOfLibaiAchieveItem");
        /**充值奖励item */
        var SkinOfLibaiRechargeItem = (function (_super) {
            __extends(SkinOfLibaiRechargeItem, _super);
            function SkinOfLibaiRechargeItem() {
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
            return SkinOfLibaiRechargeItem;
        }(BaseItemCfg));
        AcCfg.SkinOfLibaiRechargeItem = SkinOfLibaiRechargeItem;
        __reflect(SkinOfLibaiRechargeItem.prototype, "Config.AcCfg.SkinOfLibaiRechargeItem");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=SkinOfLibaiCfg.js.map