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
        var DailyRechargeCfg = (function () {
            function DailyRechargeCfg() {
                /**展示时间 */
                this.extraTime = 0;
                /** 核心奖励*/
                this.show = '';
                this.switch = [];
                /**
                 *  --活动期间的累计充值奖励
                    --needGem:所需额度：单位（元宝）
                    --specialGift:消除次数
                    --getReward:奖励
                 */
                this.recharge = {};
            }
            //解析数据
            DailyRechargeCfg.prototype.formatData = function (data) {
                if (data.extraTime) {
                    this.extraTime = data.extraTime;
                }
                this.show = data.show;
                this.switch = data.switch;
                for (var key in data.recharge) {
                    var itemCfg = void 0;
                    var id = Number(key);
                    if (!this.recharge[id]) {
                        this.recharge[id] = new DailyRechargeItemCfg();
                    }
                    itemCfg = this.recharge[id];
                    itemCfg.initData(data.recharge[key]);
                    itemCfg.id = id;
                }
            };
            DailyRechargeCfg.prototype.getReardType = function () {
                var type = "";
                var rewardvo = GameData.formatRewardItem(this.show)[0];
                if (rewardvo.type == 8 || rewardvo.type == 19) {
                    type = "servant";
                }
                else if (rewardvo.type == 10 || rewardvo.type == 16) {
                    type = "wife";
                }
                return type;
            };
            return DailyRechargeCfg;
        }());
        AcCfg.DailyRechargeCfg = DailyRechargeCfg;
        __reflect(DailyRechargeCfg.prototype, "Config.AcCfg.DailyRechargeCfg");
        var DailyRechargeItemCfg = (function (_super) {
            __extends(DailyRechargeItemCfg, _super);
            function DailyRechargeItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return DailyRechargeItemCfg;
        }(BaseItemCfg));
        AcCfg.DailyRechargeItemCfg = DailyRechargeItemCfg;
        __reflect(DailyRechargeItemCfg.prototype, "Config.AcCfg.DailyRechargeItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=DailyRechargeCfg.js.map