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
        var DragonBoatDayCfg = (function () {
            function DragonBoatDayCfg() {
                /**
                 * --龙舟前行米数奖励（全服所有玩家均可获得）
                    --needMeter：前行距离（单位：米）
                    --getReward：奖励
                 */
                this.teamReward = {};
                /**
                 * --活动期间，粽子持有数量排名奖励
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
                 * --活动期间活跃任务   注：每日不重置
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
                this.exchange = '';
                this.show = null;
            }
            DragonBoatDayCfg.prototype.formatData = function (data) {
                this.ratio1 = data.ratio1;
                this.ratio2 = data.ratio2;
                this.ratio3 = data.ratio3;
                this.rankNeed = data.rankNeed;
                this.show = data.show;
                // if(data.exchange){
                //     this.exchange = data.exchange;
                // }
                for (var key in data.teamReward) {
                    var itemCfg = void 0;
                    if (!this.teamReward.hasOwnProperty(String(key))) {
                        this.teamReward[String(key)] = new DBTeamRewardItemCfg();
                    }
                    itemCfg = this.teamReward[String(key)];
                    itemCfg.initData(data.teamReward[key]);
                    itemCfg.id = String(key);
                }
                for (var key in data.rankReward) {
                    var itemCfg = void 0;
                    if (!this.rankReward.hasOwnProperty(String(key))) {
                        this.rankReward[String(key)] = new DBRankRewardItemCfg();
                    }
                    itemCfg = this.rankReward[String(key)];
                    itemCfg.initData(data.rankReward[key]);
                    itemCfg.id = String(key);
                }
                for (var key in data.recharge) {
                    var itemCfg = void 0;
                    if (!this.recharge.hasOwnProperty(String(key))) {
                        this.recharge[String(key)] = new DBRechargeItemCfg();
                    }
                    itemCfg = this.recharge[String(key)];
                    itemCfg.initData(data.recharge[key]);
                    itemCfg.id = String(key);
                }
                for (var key in data.task) {
                    var itemCfg = void 0;
                    if (!this.task.hasOwnProperty(String(key))) {
                        this.task[String(key)] = new DBTaskItemCfg();
                    }
                    itemCfg = this.task[String(key)];
                    itemCfg.initData(data.task[key]);
                    itemCfg.taskId = String(key);
                }
                for (var key in data.festivalMarket) {
                    var itemCfg = void 0;
                    if (!this.festivalMarket.hasOwnProperty(String(key))) {
                        this.festivalMarket[String(key)] = new DBFestivalMarketItemCfg();
                    }
                    itemCfg = this.festivalMarket[String(key)];
                    itemCfg.initData(data.festivalMarket[key]);
                    itemCfg.sortId = Number(key);
                }
            };
            return DragonBoatDayCfg;
        }());
        AcCfg.DragonBoatDayCfg = DragonBoatDayCfg;
        __reflect(DragonBoatDayCfg.prototype, "Config.AcCfg.DragonBoatDayCfg");
        var DBTeamRewardItemCfg = (function (_super) {
            __extends(DBTeamRewardItemCfg, _super);
            function DBTeamRewardItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(DBTeamRewardItemCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.getReward, true, false);
                },
                enumerable: true,
                configurable: true
            });
            return DBTeamRewardItemCfg;
        }(BaseItemCfg));
        __reflect(DBTeamRewardItemCfg.prototype, "DBTeamRewardItemCfg");
        var DBRankRewardItemCfg = (function (_super) {
            __extends(DBRankRewardItemCfg, _super);
            function DBRankRewardItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(DBRankRewardItemCfg.prototype, "minRank", {
                get: function () {
                    return this.rank[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DBRankRewardItemCfg.prototype, "maxRank", {
                get: function () {
                    return this.rank[1];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DBRankRewardItemCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.getReward, true, true);
                },
                enumerable: true,
                configurable: true
            });
            return DBRankRewardItemCfg;
        }(BaseItemCfg));
        __reflect(DBRankRewardItemCfg.prototype, "DBRankRewardItemCfg");
        var DBRechargeItemCfg = (function (_super) {
            __extends(DBRechargeItemCfg, _super);
            function DBRechargeItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(DBRechargeItemCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.getReward, true, false);
                },
                enumerable: true,
                configurable: true
            });
            return DBRechargeItemCfg;
        }(BaseItemCfg));
        __reflect(DBRechargeItemCfg.prototype, "DBRechargeItemCfg");
        var DBTaskItemCfg = (function (_super) {
            __extends(DBTaskItemCfg, _super);
            function DBTaskItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(DBTaskItemCfg.prototype, "rewardIcons", {
                get: function () {
                    // this.getReward += (`18_0001_${this.zongziGet}`);
                    return GameData.getRewardItemIcons(this.getReward, true, false);
                },
                enumerable: true,
                configurable: true
            });
            return DBTaskItemCfg;
        }(BaseItemCfg));
        __reflect(DBTaskItemCfg.prototype, "DBTaskItemCfg");
        var DBFestivalMarketItemCfg = (function (_super) {
            __extends(DBFestivalMarketItemCfg, _super);
            function DBFestivalMarketItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(DBFestivalMarketItemCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.goods, true, false);
                },
                enumerable: true,
                configurable: true
            });
            return DBFestivalMarketItemCfg;
        }(BaseItemCfg));
        __reflect(DBFestivalMarketItemCfg.prototype, "DBFestivalMarketItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=DragonBoatDayCfg.js.map