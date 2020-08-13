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
         * 万物复苏
         * author ycg
         * date 2020.2.26
         * @class RecoveryCfg
         */
        var RecoveryCfg = (function () {
            function RecoveryCfg() {
                this.poolCfgList = [];
                this.achieveList = [];
                this.rechargeList = [];
            }
            RecoveryCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "achievement") {
                        this.achieveList = [];
                        for (var k in data[key]) {
                            var itemCfg = new RecoveryAchieveItem();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = Number(k) + 1;
                            this.achieveList.push(itemCfg);
                        }
                    }
                    else if (key == "recharge") {
                        this.rechargeList = [];
                        for (var k in data[key]) {
                            var itemCfg = new RecoveryRechargeItem();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = Number(k) + 1;
                            this.rechargeList.push(itemCfg);
                        }
                    }
                    else if (key == "poolList") {
                        this.poolCfgList = [];
                        for (var k in data[key]) {
                            var itemCfg = new RecoveryPoolItem();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = Number(k) + 1;
                            var str = "";
                            var prize = data[key][k].prizePool;
                            for (var j in prize) {
                                str += prize[j][0] + "|";
                            }
                            itemCfg.rewards = str.substring(0, str.length - 1);
                            this.poolCfgList.push(itemCfg);
                        }
                    }
                }
            };
            RecoveryCfg.prototype.getAchieveCfg = function () {
                return this.achieveList;
            };
            RecoveryCfg.prototype.getRechargeCfg = function () {
                return this.rechargeList;
            };
            RecoveryCfg.prototype.getPoolListCfg = function () {
                return this.poolCfgList;
            };
            return RecoveryCfg;
        }());
        AcCfg.RecoveryCfg = RecoveryCfg;
        __reflect(RecoveryCfg.prototype, "Config.AcCfg.RecoveryCfg");
        /**奖池 */
        var RecoveryPoolItem = (function (_super) {
            __extends(RecoveryPoolItem, _super);
            function RecoveryPoolItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.id = null;
                return _this;
            }
            return RecoveryPoolItem;
        }(BaseItemCfg));
        __reflect(RecoveryPoolItem.prototype, "RecoveryPoolItem");
        /**进度奖励item */
        var RecoveryAchieveItem = (function (_super) {
            __extends(RecoveryAchieveItem, _super);
            function RecoveryAchieveItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**id */
                _this.id = null;
                /**所需分数 */
                _this.needNum = 0;
                /**奖励 */
                _this.getReward = null;
                _this.sortId = 0;
                return _this;
            }
            return RecoveryAchieveItem;
        }(BaseItemCfg));
        AcCfg.RecoveryAchieveItem = RecoveryAchieveItem;
        __reflect(RecoveryAchieveItem.prototype, "Config.AcCfg.RecoveryAchieveItem");
        /**充值奖励item */
        var RecoveryRechargeItem = (function (_super) {
            __extends(RecoveryRechargeItem, _super);
            function RecoveryRechargeItem() {
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
            return RecoveryRechargeItem;
        }(BaseItemCfg));
        AcCfg.RecoveryRechargeItem = RecoveryRechargeItem;
        __reflect(RecoveryRechargeItem.prototype, "Config.AcCfg.RecoveryRechargeItem");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=RecoveryCfg.js.map