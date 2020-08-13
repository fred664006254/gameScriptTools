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
        var ArenaCfg = (function () {
            function ArenaCfg() {
                /**
                 * --砖块建造奖励（全服所有玩家均可获得）
                    --needMeter:前行距离（单位：米）
                    --state:斗场状态
                    --getReward:奖励
                 */
                this.teamReward = {};
                /**
                 * --活动期间，砖块持有数量排名奖励
                    --rank:排行榜上下限  例：{5,10} 第五名至第十名
                    --getReward:奖励
                 */
                this.rankReward = {};
                /**
                 * --活动期间累计充值奖励
                    --needGem:所需额度：单位（元宝）
                    --specialItem:特殊道具：水瓢
                    --getReward:奖励
                 */
                this.recharge = {};
                /**
                 * --活动期间活跃任务   注：每日不重置
                    --openType:跳转
                    --questType:任务类型  特殊类型：1--登录X天
                    --value:进度
                    --shuipiaoGet:获得水瓢
                    --getReward:奖励
                 */
                this.task = {};
                /**
                 * 节日商店
                 * --节日商店
                --limit:购买次数限制
                --originalCost:原价
                --needGem:所需元宝
                --discount:折扣
                --goods:商品内容
                 */
                this.festivalMarket = {};
                /**
                --场景变化标识
                */
                this.animation = [];
            }
            ArenaCfg.prototype.formatData = function (data) {
                this.ratio1 = data.ratio1;
                this.ratio3 = data.ratio3;
                this.rankNeed = data.rankNeed;
                this.extraTime = data.extraTime;
                this.animation = data.animation;
                // if(data.exchange){
                //     this.exchange = data.exchange;
                // }
                for (var key in data.teamReward) {
                    var itemCfg = void 0;
                    var id = Number(key) + 1;
                    if (!this.teamReward[id]) {
                        this.teamReward[id] = new ArenaTeamRewardItemCfg();
                    }
                    itemCfg = this.teamReward[id];
                    itemCfg.initData(data.teamReward[key]);
                    itemCfg.id = id;
                }
                for (var key in data.rankReward) {
                    var itemCfg = void 0;
                    var id = Number(key) + 1;
                    if (!this.rankReward[id]) {
                        this.rankReward[id] = new ArenaRankRewardItemCfg();
                    }
                    itemCfg = this.rankReward[id];
                    itemCfg.initData(data.rankReward[key]);
                    itemCfg.id = id;
                }
                for (var key in data.recharge) {
                    var itemCfg = void 0;
                    var id = Number(key) + 1;
                    if (!this.recharge[id]) {
                        this.recharge[id] = new ArenaRechargeItemCfg();
                    }
                    itemCfg = this.recharge[id];
                    itemCfg.initData(data.recharge[key]);
                    itemCfg.id = id;
                }
                for (var key in data.task) {
                    var itemCfg = void 0;
                    var id = Number(key) + 1;
                    if (!this.task[id]) {
                        this.task[id] = new ArenaTaskItemCfg();
                    }
                    itemCfg = this.task[id];
                    itemCfg.initData(data.task[key]);
                    itemCfg.taskId = id;
                }
                for (var key in data.festivalMarket) {
                    var itemCfg = void 0;
                    var id = Number(key) + 1;
                    if (!this.festivalMarket[id]) {
                        this.festivalMarket[id] = new ArenaFestivalMarketItemCfg();
                    }
                    itemCfg = this.festivalMarket[id];
                    itemCfg.initData(data.festivalMarket[key]);
                    itemCfg.sortId = id;
                }
            };
            ArenaCfg.prototype.getSkin = function (code) {
                var skinId = '';
                switch (Number(code)) {
                    case 1:
                        skinId = '10342';
                        break;
                }
                return skinId;
            };
            return ArenaCfg;
        }());
        AcCfg.ArenaCfg = ArenaCfg;
        __reflect(ArenaCfg.prototype, "Config.AcCfg.ArenaCfg");
        /**
         * --needMeter:前行距离（单位：米）
        --state:斗场状态
        --getReward:奖励
        */
        var ArenaTeamRewardItemCfg = (function (_super) {
            __extends(ArenaTeamRewardItemCfg, _super);
            function ArenaTeamRewardItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(ArenaTeamRewardItemCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.getReward, true, false);
                },
                enumerable: true,
                configurable: true
            });
            return ArenaTeamRewardItemCfg;
        }(BaseItemCfg));
        AcCfg.ArenaTeamRewardItemCfg = ArenaTeamRewardItemCfg;
        __reflect(ArenaTeamRewardItemCfg.prototype, "Config.AcCfg.ArenaTeamRewardItemCfg");
        /**
         *  --活动期间，砖块持有数量排名奖励
        --rank:排行榜上下限  例：{5,10} 第五名至第十名
        --getReward:奖励
        */
        var ArenaRankRewardItemCfg = (function (_super) {
            __extends(ArenaRankRewardItemCfg, _super);
            function ArenaRankRewardItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(ArenaRankRewardItemCfg.prototype, "minRank", {
                get: function () {
                    return this.rank[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ArenaRankRewardItemCfg.prototype, "maxRank", {
                get: function () {
                    return this.rank[1];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ArenaRankRewardItemCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.getReward, true, true);
                },
                enumerable: true,
                configurable: true
            });
            return ArenaRankRewardItemCfg;
        }(BaseItemCfg));
        AcCfg.ArenaRankRewardItemCfg = ArenaRankRewardItemCfg;
        __reflect(ArenaRankRewardItemCfg.prototype, "Config.AcCfg.ArenaRankRewardItemCfg");
        /**
         *  --活动期间累计充值奖励
        --needGem:所需额度：单位（元宝）
        --specialItem:特殊道具：水瓢
        --getReward:奖励
        */
        var ArenaRechargeItemCfg = (function (_super) {
            __extends(ArenaRechargeItemCfg, _super);
            function ArenaRechargeItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(ArenaRechargeItemCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.getReward, true, false);
                },
                enumerable: true,
                configurable: true
            });
            return ArenaRechargeItemCfg;
        }(BaseItemCfg));
        AcCfg.ArenaRechargeItemCfg = ArenaRechargeItemCfg;
        __reflect(ArenaRechargeItemCfg.prototype, "Config.AcCfg.ArenaRechargeItemCfg");
        /**
         *  --活动期间活跃任务   注：每日不重置
        --openType:跳转
        --questType:任务类型  特殊类型：1--登录X天
        --value:进度
        --shuipiaoGet:获得水瓢
        --getReward:奖励
        */
        var ArenaTaskItemCfg = (function (_super) {
            __extends(ArenaTaskItemCfg, _super);
            function ArenaTaskItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(ArenaTaskItemCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.getReward, true, false);
                },
                enumerable: true,
                configurable: true
            });
            return ArenaTaskItemCfg;
        }(BaseItemCfg));
        AcCfg.ArenaTaskItemCfg = ArenaTaskItemCfg;
        __reflect(ArenaTaskItemCfg.prototype, "Config.AcCfg.ArenaTaskItemCfg");
        /**
         *  --节日商店
        --limit:购买次数限制
        --originalCost:原价
        --needGem:所需元宝
        --discount:折扣
        --goods:商品内容
         * */
        var ArenaFestivalMarketItemCfg = (function (_super) {
            __extends(ArenaFestivalMarketItemCfg, _super);
            function ArenaFestivalMarketItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(ArenaFestivalMarketItemCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.goods, true, false);
                },
                enumerable: true,
                configurable: true
            });
            return ArenaFestivalMarketItemCfg;
        }(BaseItemCfg));
        AcCfg.ArenaFestivalMarketItemCfg = ArenaFestivalMarketItemCfg;
        __reflect(ArenaFestivalMarketItemCfg.prototype, "Config.AcCfg.ArenaFestivalMarketItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=ArenaCfg.js.map