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
        /**筑阁祭天活动cfg */
        var WorshipCfg = (function () {
            function WorshipCfg() {
                /** 展示时间 */
                this.extraTime = 0;
                /** 每次抽取额外赠送 */
                this.freeGet = null;
                /** 每日免费次数 */
                this.freeTime = 0;
                /** 每抽增加进度 */
                this.addProcess = 0;
                /** 单抽消耗元宝 */
                this.gemCost = 0;
                /** 十连抽折扣 */
                this.discount = 0;
                /** 奖励展示 */
                this.show = null;
                /** 抽奖暴击,奖励与进度都暴击 */
                this.critical = null;
                /** 抽奖奖池 */
                this.pool = null;
                /**活动期间的累计充值奖励 */
                this.worshipRechargeItemCfgList = [];
                /**阶段奖励 */
                this.worshipAchievementItemCfgList = [];
            }
            /**
             * 初始化数据
             */
            WorshipCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "achievement") {
                        this.worshipAchievementItemCfgList.length = 0;
                        for (var i = 0; i < data[key].length; i++) {
                            var itemcfg = new WorshipAchievementItemCfg();
                            itemcfg.initData(data[key][i]);
                            itemcfg.id = Number(i) + 1;
                            this.worshipAchievementItemCfgList.push(itemcfg);
                        }
                    }
                    if (key == "recharge") {
                        this.worshipRechargeItemCfgList.length = 0;
                        for (var i = 0; i < data[key].length; i++) {
                            var itemcfg = new WorshipRechargeItemCfg();
                            itemcfg.initData(data[key][i]);
                            itemcfg.id = Number(i) + 1;
                            this.worshipRechargeItemCfgList.push(itemcfg);
                        }
                    }
                }
            };
            /**奖池 */
            WorshipCfg.prototype.rewardPoolList = function () {
                var rewards = "";
                for (var key in this.pool) {
                    rewards += this.pool[key][0] + "|";
                }
                return rewards.substring(0, rewards.length - 1);
            };
            /**最大的进度 */
            WorshipCfg.prototype.getMaxAchievementValue = function () {
                for (var key in this.worshipAchievementItemCfgList) {
                    if (this.worshipAchievementItemCfgList[key].id == this.worshipAchievementItemCfgList.length) {
                        return this.worshipAchievementItemCfgList[key].needNum;
                    }
                }
            };
            return WorshipCfg;
        }());
        AcCfg.WorshipCfg = WorshipCfg;
        __reflect(WorshipCfg.prototype, "Config.AcCfg.WorshipCfg");
        /**活动期间的累计充值奖励 */
        var WorshipRechargeItemCfg = (function (_super) {
            __extends(WorshipRechargeItemCfg, _super);
            function WorshipRechargeItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return WorshipRechargeItemCfg;
        }(BaseItemCfg));
        AcCfg.WorshipRechargeItemCfg = WorshipRechargeItemCfg;
        __reflect(WorshipRechargeItemCfg.prototype, "Config.AcCfg.WorshipRechargeItemCfg");
        /**活动期间，进度奖励 */
        var WorshipAchievementItemCfg = (function (_super) {
            __extends(WorshipAchievementItemCfg, _super);
            function WorshipAchievementItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return WorshipAchievementItemCfg;
        }(BaseItemCfg));
        AcCfg.WorshipAchievementItemCfg = WorshipAchievementItemCfg;
        __reflect(WorshipAchievementItemCfg.prototype, "Config.AcCfg.WorshipAchievementItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=WorshipCfg.js.map