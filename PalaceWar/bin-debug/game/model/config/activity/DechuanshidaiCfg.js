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
        var DechuanshidaiCfg = (function () {
            function DechuanshidaiCfg() {
                /**展示时间 */
                this.extraTime = 0;
                this.switch = [];
                //--单抽消耗 单位：元宝
                this.cost = 0;
                //十连抽折扣
                this.discount = 0;
                //--德道具结束自动转化
                this.deZiExchange = "";
                //--川道具结束自动转化
                this.chuanZiExchange = "";
                //--时道具结束自动转化
                this.shiZiExchange = "";
                //--代道具结束自动转化
                this.daiZiExchange = "";
                //--抽奖奖池
                this.pool1 = [];
                //--有字奖池
                this.pool2 = [];
                //--进入有字奖池的次数标识，抽奖次数达到 pool2Times 的时候，会进行一次几率判定，判定成功，走pool2,不成功，走pool1
                this.pool2Times = [];
                //--进入有字奖池的概率  百分制  每次几率判定的几率  超过最大值取最大值
                this.pool2Ratio = [];
                //--超出pool2Times后，每 X 次，进行一次几率判定
                this.exTimes = 0;
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
                this.dailyTask = [];
                /**
                 *   --兑换
                    --costdeZi:需要德字
                    --costchuanZi:需要川字
                    --costshiZi:需要时字
                    --costdaiZi:需要代字
                    --limit:活动限购
                    --item:道具
                */
                this.claim = {};
                this.dailyReward = '';
            }
            //解析数据
            DechuanshidaiCfg.prototype.formatData = function (data) {
                this.extraTime = data.extraTime;
                this.cost = data.cost;
                this.discount = data.discount;
                this.deZiExchange = data.deZiExchange;
                this.chuanZiExchange = data.chuanZiExchange;
                this.shiZiExchange = data.shiZiExchange;
                this.daiZiExchange = data.daiZiExchange;
                this.pool1 = data.pool1;
                this.pool2 = data.pool2;
                this.pool2Times = data.pool2Times;
                this.pool2Ratio = data.pool2Ratio;
                this.exTimes = data.exTimes;
                this.switch = data.switch;
                this.dailyReward = data.dailyReward;
                for (var key in data.recharge) {
                    var itemCfg = void 0;
                    var id = Number(key);
                    if (!this.recharge[id]) {
                        this.recharge[id] = new DeChuanRechargeItemCfg();
                    }
                    itemCfg = this.recharge[id];
                    itemCfg.initData(data.recharge[key]);
                    itemCfg.id = id;
                }
                for (var key in data.claim) {
                    var itemCfg = void 0;
                    var id = Number(key);
                    if (!this.claim[id]) {
                        this.claim[id] = new DeChuanExchangeItemCfg();
                    }
                    itemCfg = this.claim[id];
                    itemCfg.initData(data.claim[key]);
                    itemCfg.id = id;
                }
                this.dailyTask = data.dailyTask;
            };
            DechuanshidaiCfg.prototype.getWealthGod = function () {
                var rewards = "";
                for (var i in this.pool1) {
                    var unit = this.pool1[i];
                    rewards += unit[0] + "|";
                }
                return rewards.substring(0, rewards.length - 1);
            };
            DechuanshidaiCfg.prototype.getDailyReward = function (day) {
                return this.dailyReward.split("|")[day - 1];
            };
            DechuanshidaiCfg.prototype.getSkin = function (code) {
                var skinId = this.switch[1].split("_")[1];
                return skinId;
            };
            DechuanshidaiCfg.prototype.getServant = function (code) {
                var skinId = this.switch[0].split("servant_name")[1];
                return skinId;
            };
            return DechuanshidaiCfg;
        }());
        AcCfg.DechuanshidaiCfg = DechuanshidaiCfg;
        __reflect(DechuanshidaiCfg.prototype, "Config.AcCfg.DechuanshidaiCfg");
        var DeChuanExchangeItemCfg = (function (_super) {
            __extends(DeChuanExchangeItemCfg, _super);
            function DeChuanExchangeItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return DeChuanExchangeItemCfg;
        }(BaseItemCfg));
        AcCfg.DeChuanExchangeItemCfg = DeChuanExchangeItemCfg;
        __reflect(DeChuanExchangeItemCfg.prototype, "Config.AcCfg.DeChuanExchangeItemCfg");
        var DeChuanRechargeItemCfg = (function (_super) {
            __extends(DeChuanRechargeItemCfg, _super);
            function DeChuanRechargeItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(DeChuanRechargeItemCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.getReward, true, false);
                },
                enumerable: true,
                configurable: true
            });
            return DeChuanRechargeItemCfg;
        }(BaseItemCfg));
        AcCfg.DeChuanRechargeItemCfg = DeChuanRechargeItemCfg;
        __reflect(DeChuanRechargeItemCfg.prototype, "Config.AcCfg.DeChuanRechargeItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=DechuanshidaiCfg.js.map