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
        var AnnualPray2020Cfg = (function () {
            function AnnualPray2020Cfg() {
                /**展示时间 */
                this.extraTime = 0;
                this.switch = [];
                //--单抽消耗特殊道具数
                this.cost = 0;
                //每次抽取获得祈愿值
                this.getNum = 0;
                //--活动结束后道具转化
                this.exchange = "";
                //--二道具结束自动转化
                this.erZiExchange = "";
                //--周道具结束自动转化
                this.zhouZiExchange = "";
                //--时年道具结束自动转化
                this.nianZiExchange = "";
                //--庆道具结束自动转化
                this.qingZiExchange = "";
                //--抽奖奖池
                this.pool1 = [];
                //--有字奖池
                this.pool2 = [];
                /**
                 * --祈愿进度奖励
                    --ratetime:祈愿值进度
                    --getReward:奖励
                 */
                this.processingReward = {};
                /**
                 *  --活动期间的累计充值奖励
                    --needGem:所需额度：单位（元宝）
                    --specialGift:消除次数
                    --getReward:奖励
                 */
                this.recharge = {};
                /**
                 *  --每日任务:这里的1002任务，做一个特殊跳转，跳到活动的抽奖界面上
                    --questType:任务类型
                    --sortId:排序
                    --value:任务参数
                    --openType:任务跳转
                    --specialReward:特殊奖励:奖励活动道具个数
                    --getReward:奖励
                */
                this.claim = {};
            }
            //解析数据
            AnnualPray2020Cfg.prototype.formatData = function (data) {
                this.extraTime = data.extraTime;
                this.cost = data.cost;
                this.pool1 = data.pool1;
                this.pool2 = data.pool2;
                this.switch = data.switch;
                this.getNum = data.getNum;
                this.exchange = data.exchange;
                for (var key in data.recharge) {
                    var itemCfg = void 0;
                    var id = Number(key);
                    if (!this.recharge[id]) {
                        this.recharge[id] = new AnnualPrayRechargeItemCfg();
                    }
                    itemCfg = this.recharge[id];
                    itemCfg.initData(data.recharge[key]);
                    itemCfg.id = id;
                }
                for (var key in data.claim) {
                    var itemCfg = void 0;
                    var id = Number(key);
                    if (!this.claim[id]) {
                        this.claim[id] = new AnnualPrayExchangeItemCfg();
                    }
                    itemCfg = this.claim[id];
                    itemCfg.initData(data.claim[key]);
                    itemCfg.id = id;
                }
                for (var key in data.processingReward) {
                    var itemCfg = void 0;
                    var id = Number(key);
                    if (!this.processingReward[id]) {
                        this.processingReward[id] = new AnnualPrayProcessItemCfg();
                    }
                    itemCfg = this.processingReward[id];
                    itemCfg.initData(data.processingReward[key]);
                    itemCfg.id = id;
                }
            };
            AnnualPray2020Cfg.prototype.getWealthGod = function (id) {
                var rewards = "";
                for (var i in this["pool" + id]) {
                    var unit = this["pool" + id];
                    rewards += unit[i][0] + "|";
                }
                return rewards.substring(0, rewards.length - 1);
            };
            AnnualPray2020Cfg.prototype.getSkin = function (code) {
                var skinId = this.switch[1].split("wifeSkin_name")[1];
                return skinId;
            };
            AnnualPray2020Cfg.prototype.getServant = function (code) {
                var skinId = this.switch[0].split("servantSkin_name")[1];
                return skinId;
            };
            AnnualPray2020Cfg.prototype.getTotalProgress = function () {
                var num = 0;
                var cfg = this.processingReward[Object.keys(this.processingReward).length];
                if (cfg && cfg.ratetime) {
                    num = cfg.ratetime;
                }
                return num;
            };
            return AnnualPray2020Cfg;
        }());
        AcCfg.AnnualPray2020Cfg = AnnualPray2020Cfg;
        __reflect(AnnualPray2020Cfg.prototype, "Config.AcCfg.AnnualPray2020Cfg");
        var AnnualPrayExchangeItemCfg = (function (_super) {
            __extends(AnnualPrayExchangeItemCfg, _super);
            function AnnualPrayExchangeItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return AnnualPrayExchangeItemCfg;
        }(BaseItemCfg));
        AcCfg.AnnualPrayExchangeItemCfg = AnnualPrayExchangeItemCfg;
        __reflect(AnnualPrayExchangeItemCfg.prototype, "Config.AcCfg.AnnualPrayExchangeItemCfg");
        var AnnualPrayRechargeItemCfg = (function (_super) {
            __extends(AnnualPrayRechargeItemCfg, _super);
            function AnnualPrayRechargeItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(AnnualPrayRechargeItemCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.getReward, true, false);
                },
                enumerable: true,
                configurable: true
            });
            return AnnualPrayRechargeItemCfg;
        }(BaseItemCfg));
        AcCfg.AnnualPrayRechargeItemCfg = AnnualPrayRechargeItemCfg;
        __reflect(AnnualPrayRechargeItemCfg.prototype, "Config.AcCfg.AnnualPrayRechargeItemCfg");
        var AnnualPrayProcessItemCfg = (function (_super) {
            __extends(AnnualPrayProcessItemCfg, _super);
            function AnnualPrayProcessItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return AnnualPrayProcessItemCfg;
        }(BaseItemCfg));
        AcCfg.AnnualPrayProcessItemCfg = AnnualPrayProcessItemCfg;
        __reflect(AnnualPrayProcessItemCfg.prototype, "Config.AcCfg.AnnualPrayProcessItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=AnnualPray2020Cfg.js.map