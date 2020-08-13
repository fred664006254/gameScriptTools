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
        var LaborDayCfg = (function () {
            function LaborDayCfg() {
                /**展示时间 */
                this.extraTime = 0;
                /**
                 * --水瓢浇水奖励（全服所有玩家均可获得）
                    --needMeter：前行距离（单位：米）
                    --getReward：奖励
                 */
                this.teamReward = {};
                /**
                 * ----活动期间，水瓢持有数量排名奖励
                    --rank：排行榜上下限  例：{5,10} 第五名至第十名
                    --getReward：奖励
                 */
                this.rankReward = {};
                /**
                 * --活动期间累计充值奖励
                 *  --needGem：所需额度：单位（元宝）
                    --getReward：奖励
                 */
                this.recharge = {};
                /**
                 * --活动期间活跃任务
                    --openType：跳转
                    --questType：任务类型  特殊类型：1--登录X天
                    --value：进度
                    --zongziGet：获得粽子
                    --getReward：奖励
                 */
                this.task = {};
                /**
                 * 节日商店
                 *  --limit：购买次数限制
                    --originalCost：原价
                    --needGem：所需元宝
                    --discount：折扣
                    --goods：商品内容
                 */
                this.festivalMarket = {};
            }
            LaborDayCfg.prototype.formatData = function (data) {
                this.ratio1 = data.ratio1;
                this.ratio2 = data.ratio2;
                this.ratio3 = data.ratio3;
                this.rankNeed = data.rankNeed;
                this.extraTime = data.extraTime;
                // if(data.exchange){
                //     this.exchange = data.exchange;
                // }
                for (var key in data.teamReward) {
                    var itemCfg = void 0;
                    if (!this.teamReward.hasOwnProperty(String(key))) {
                        this.teamReward[String(key)] = new LBTeamRewardItemCfg();
                    }
                    itemCfg = this.teamReward[String(key)];
                    itemCfg.initData(data.teamReward[key]);
                    itemCfg.id = String(key);
                }
                for (var key in data.rankReward) {
                    var itemCfg = void 0;
                    if (!this.rankReward.hasOwnProperty(String(key))) {
                        this.rankReward[String(key)] = new LBRankRewardItemCfg();
                    }
                    itemCfg = this.rankReward[String(key)];
                    itemCfg.initData(data.rankReward[key]);
                    itemCfg.id = String(key);
                }
                for (var key in data.recharge) {
                    var itemCfg = void 0;
                    if (!this.recharge.hasOwnProperty(String(key))) {
                        this.recharge[String(key)] = new LBRechargeItemCfg();
                    }
                    itemCfg = this.recharge[String(key)];
                    itemCfg.initData(data.recharge[key]);
                    itemCfg.id = String(key);
                }
                for (var key in data.task) {
                    var itemCfg = void 0;
                    if (!this.task.hasOwnProperty(String(key))) {
                        this.task[String(key)] = new LBTaskItemCfg();
                    }
                    itemCfg = this.task[String(key)];
                    itemCfg.initData(data.task[key]);
                    itemCfg.taskId = String(key);
                }
                for (var key in data.festivalMarket) {
                    var itemCfg = void 0;
                    if (!this.festivalMarket.hasOwnProperty(String(key))) {
                        this.festivalMarket[String(key)] = new LBFestivalMarketItemCfg();
                    }
                    itemCfg = this.festivalMarket[String(key)];
                    itemCfg.initData(data.festivalMarket[key]);
                    itemCfg.sortId = Number(key);
                }
            };
            return LaborDayCfg;
        }());
        AcCfg.LaborDayCfg = LaborDayCfg;
        __reflect(LaborDayCfg.prototype, "Config.AcCfg.LaborDayCfg");
        var LBTeamRewardItemCfg = (function (_super) {
            __extends(LBTeamRewardItemCfg, _super);
            function LBTeamRewardItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(LBTeamRewardItemCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.getReward, true, false);
                },
                enumerable: true,
                configurable: true
            });
            return LBTeamRewardItemCfg;
        }(BaseItemCfg));
        __reflect(LBTeamRewardItemCfg.prototype, "LBTeamRewardItemCfg");
        var LBRankRewardItemCfg = (function (_super) {
            __extends(LBRankRewardItemCfg, _super);
            function LBRankRewardItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(LBRankRewardItemCfg.prototype, "minRank", {
                get: function () {
                    return this.rank[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LBRankRewardItemCfg.prototype, "maxRank", {
                get: function () {
                    return this.rank[1];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LBRankRewardItemCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.getReward, true, true);
                },
                enumerable: true,
                configurable: true
            });
            return LBRankRewardItemCfg;
        }(BaseItemCfg));
        __reflect(LBRankRewardItemCfg.prototype, "LBRankRewardItemCfg");
        var LBRechargeItemCfg = (function (_super) {
            __extends(LBRechargeItemCfg, _super);
            function LBRechargeItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(LBRechargeItemCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.getReward, true, false);
                },
                enumerable: true,
                configurable: true
            });
            return LBRechargeItemCfg;
        }(BaseItemCfg));
        __reflect(LBRechargeItemCfg.prototype, "LBRechargeItemCfg");
        var LBTaskItemCfg = (function (_super) {
            __extends(LBTaskItemCfg, _super);
            function LBTaskItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(LBTaskItemCfg.prototype, "rewardIcons", {
                get: function () {
                    // this.getReward += (`18_0001_${this.zongziGet}`);
                    return GameData.getRewardItemIcons(this.getReward, true, false);
                },
                enumerable: true,
                configurable: true
            });
            return LBTaskItemCfg;
        }(BaseItemCfg));
        __reflect(LBTaskItemCfg.prototype, "LBTaskItemCfg");
        var LBFestivalMarketItemCfg = (function (_super) {
            __extends(LBFestivalMarketItemCfg, _super);
            function LBFestivalMarketItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(LBFestivalMarketItemCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.goods, true, false);
                },
                enumerable: true,
                configurable: true
            });
            return LBFestivalMarketItemCfg;
        }(BaseItemCfg));
        __reflect(LBFestivalMarketItemCfg.prototype, "LBFestivalMarketItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=LaborDayCfg.js.map