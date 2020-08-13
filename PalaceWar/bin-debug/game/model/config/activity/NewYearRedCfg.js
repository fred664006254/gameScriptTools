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
        var NewYearRedCfg = (function () {
            function NewYearRedCfg() {
                /**展示时间 */
                this.extraTime = 1;
                /**开关 */
                this.switch = [];
                /**核心奖励 */
                this.coreReward = '';
                /**活动期间的累计充值奖励 */
                this.recharge = {};
            }
            /**
             * 初始化数据
             */
            NewYearRedCfg.prototype.formatData = function (data) {
                this.extraTime = data.extraTime;
                this.switch = data.switch;
                this.coreReward = data.coreReward;
                for (var key in data.recharge) {
                    var itemCfg = void 0;
                    var id = Number(key) + 1;
                    if (!this.recharge.hasOwnProperty(String(id))) {
                        this.recharge[String(id)] = new NewYearRedRechargeItemCfg();
                    }
                    itemCfg = this.recharge[String(id)];
                    itemCfg.initData(data.recharge[key]);
                    itemCfg.id = id;
                }
            };
            NewYearRedCfg.prototype.getCoreRewardGemIdx = function () {
                var num = 0;
                for (var i in this.recharge) {
                    var unit = this.recharge[i];
                    if (unit.getReward.indexOf("10_" + this.coreReward + "_1") > -1) {
                        num = Number(i);
                        break;
                    }
                }
                return num;
            };
            NewYearRedCfg.prototype.getCoreRewardGemNum = function () {
                var num = 0;
                for (var i in this.recharge) {
                    var unit = this.recharge[i];
                    if (unit.getReward.indexOf("10_" + this.coreReward + "_1") > -1) {
                        num = unit.needGem;
                        break;
                    }
                }
                return num;
            };
            return NewYearRedCfg;
        }());
        AcCfg.NewYearRedCfg = NewYearRedCfg;
        __reflect(NewYearRedCfg.prototype, "Config.AcCfg.NewYearRedCfg");
        /**累计充值奖励 */
        var NewYearRedRechargeItemCfg = (function (_super) {
            __extends(NewYearRedRechargeItemCfg, _super);
            function NewYearRedRechargeItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return NewYearRedRechargeItemCfg;
        }(BaseItemCfg));
        AcCfg.NewYearRedRechargeItemCfg = NewYearRedRechargeItemCfg;
        __reflect(NewYearRedRechargeItemCfg.prototype, "Config.AcCfg.NewYearRedRechargeItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=NewYearRedCfg.js.map