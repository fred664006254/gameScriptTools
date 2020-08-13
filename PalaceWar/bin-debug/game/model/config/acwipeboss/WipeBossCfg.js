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
         * 围剿鳌拜
         */
        var WipeBossCfg = (function () {
            function WipeBossCfg() {
                /**
                 * --参与条件：官职达到从七品或以上
                 */
                this.needLv = 0;
                /**
                 * --每日初始探索次数  0点更新
                 */
                this.initialExplore = 0;
                /**
                 * 次数恢复时间 （单位：秒，官职越高，恢复所需时间越短） 第一个值是从七品
                 */
                this.renewTime = [];
                /**
                * 购买探索次数消耗 单位：元宝。超过十次价格按十次计算
                */
                this.buyNumCost = [];
                /**
                 * --帮会敌情上限
                 */
                this.maxShare = 0;
                /**
                 * --活动时间  早上9点至晚上10点是可攻打时间
                 */
                this.actTime = [];
                /**
                 * --帮会击杀Boss数量与打开宝箱数量达到X时,才能探索到鳌拜
                 */
                this.needKillNum = 0;
                /**--个人排名奖励
                --rank：排行榜上下限  例：{5,10} 第五名至第十名
                --getReward：奖励*/
                this.personRankReward = {};
                /**--帮会排名奖励  （个人分数达到50分的成员才有资格领取）
                --rank：排行榜上下限  例：{5,10} 第五名至第十名
                --getReward1：盟主奖励
                --getReward2：成员奖励*/
                this.allRankReward = {};
                /*
                *--积分商城
                --limit：购买次数限制
                --costScore：所需积分
                --goods：商品内容
                * */
                this.scoreMarket = {};
                /*
                * --活动商铺
                --needGem：所需元宝  每日消耗会刷新
                --limit：购买次数限制
                --effect：购买效果 提升活动中门客战力5%，当天有效
                --goods：商品内容
                * */
                this.actMarket = {};
                /**
                 * --铲除Boss活动配置
                --type：类型：1，BOSS  2，宝箱
                --bossNum：数量： 此活动总产出数量
                --bossScore：单个boss总积分。单次积分=A/BOSS血量*BOSS总积分  （A为门客对BOSS造成的伤害，其最大值等于BOSS血量）
                --bossHP：Boss血量
                --ranWeight：探索时的随机权重
                --needKey：开启方式
                --killPool：击杀奖池。给予BOSS最后一击才可获得击杀奖励道具（从奖池中随机）
                */
                this.foe = {};
            }
            WipeBossCfg.prototype.formatData = function (data) {
                this.needLv = data.needLv;
                this.initialExplore = data.initialExplore;
                this.renewTime = data.renewTime;
                this.maxShare = data.maxShare;
                this.actTime = data.actTime;
                this.needKillNum = data.needKillNum;
                this.buyNumCost = data.buyNumCost;
                for (var key in data.personRankReward) {
                    var itemCfg = void 0;
                    if (!this.personRankReward.hasOwnProperty((Number(key) + 1).toString())) {
                        this.personRankReward[Number(key) + 1] = new WipeBossPersonRankRewardItemCfg();
                    }
                    itemCfg = this.personRankReward[Number(key) + 1];
                    itemCfg.initData(data.personRankReward[key]);
                    itemCfg.id = Number(key) + 1;
                }
                for (var key in data.allRankReward) {
                    var itemCfg = void 0;
                    if (!this.allRankReward.hasOwnProperty((Number(key) + 1).toString())) {
                        this.allRankReward[Number(key) + 1] = new WipeBossAllRankRewardItemCfg();
                    }
                    itemCfg = this.allRankReward[Number(key) + 1];
                    itemCfg.initData(data.allRankReward[key]);
                    itemCfg.id = Number(key) + 1;
                }
                for (var key in data.scoreMarket) {
                    var itemCfg = void 0;
                    if (!this.scoreMarket.hasOwnProperty(String(key))) {
                        this.scoreMarket[String(key)] = new WipeBossScoreItemCfg();
                    }
                    itemCfg = this.scoreMarket[String(key)];
                    itemCfg.initData(data.scoreMarket[key]);
                    itemCfg.id = Number(key) + 1;
                }
                for (var key in data.actMarket) {
                    var itemCfg = void 0;
                    if (!this.actMarket.hasOwnProperty(String(key))) {
                        this.actMarket[String(key)] = new WipeBossShopItemCfg();
                    }
                    itemCfg = this.actMarket[String(key)];
                    itemCfg.initData(data.actMarket[key]);
                    itemCfg.id = Number(key) + 1;
                }
                for (var key in data.foe) {
                    var itemCfg = void 0;
                    if (!this.foe.hasOwnProperty(String(key))) {
                        this.foe[String(key)] = new WipeBossFoeItemCfg();
                    }
                    itemCfg = this.foe[String(key)];
                    itemCfg.initData(data.foe[key]);
                    itemCfg.id = Number(key) + 1;
                }
            };
            WipeBossCfg.prototype.getBossNpcItemCfgById = function (foeid) {
                return this.foe[foeid - 1];
            };
            return WipeBossCfg;
        }());
        AcCfg.WipeBossCfg = WipeBossCfg;
        __reflect(WipeBossCfg.prototype, "Config.AcCfg.WipeBossCfg");
        var WipeBossPersonRankRewardItemCfg = (function (_super) {
            __extends(WipeBossPersonRankRewardItemCfg, _super);
            function WipeBossPersonRankRewardItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(WipeBossPersonRankRewardItemCfg.prototype, "minRank", {
                get: function () {
                    return this.rank[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(WipeBossPersonRankRewardItemCfg.prototype, "maxRank", {
                get: function () {
                    return this.rank[1];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(WipeBossPersonRankRewardItemCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.getReward, true, true);
                },
                enumerable: true,
                configurable: true
            });
            return WipeBossPersonRankRewardItemCfg;
        }(BaseItemCfg));
        __reflect(WipeBossPersonRankRewardItemCfg.prototype, "WipeBossPersonRankRewardItemCfg");
        var WipeBossAllRankRewardItemCfg = (function (_super) {
            __extends(WipeBossAllRankRewardItemCfg, _super);
            function WipeBossAllRankRewardItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(WipeBossAllRankRewardItemCfg.prototype, "minRank", {
                get: function () {
                    return this.rank[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(WipeBossAllRankRewardItemCfg.prototype, "maxRank", {
                get: function () {
                    return this.rank[1];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(WipeBossAllRankRewardItemCfg.prototype, "reward1Icons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.getReward1, true, true);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(WipeBossAllRankRewardItemCfg.prototype, "reward2Icons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.getReward2, true, true);
                },
                enumerable: true,
                configurable: true
            });
            return WipeBossAllRankRewardItemCfg;
        }(BaseItemCfg));
        __reflect(WipeBossAllRankRewardItemCfg.prototype, "WipeBossAllRankRewardItemCfg");
        var WipeBossScoreItemCfg = (function (_super) {
            __extends(WipeBossScoreItemCfg, _super);
            function WipeBossScoreItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(WipeBossScoreItemCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.goods, true, false);
                },
                enumerable: true,
                configurable: true
            });
            return WipeBossScoreItemCfg;
        }(BaseItemCfg));
        __reflect(WipeBossScoreItemCfg.prototype, "WipeBossScoreItemCfg");
        var WipeBossShopItemCfg = (function (_super) {
            __extends(WipeBossShopItemCfg, _super);
            function WipeBossShopItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(WipeBossShopItemCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.goods, true, false);
                },
                enumerable: true,
                configurable: true
            });
            return WipeBossShopItemCfg;
        }(BaseItemCfg));
        __reflect(WipeBossShopItemCfg.prototype, "WipeBossShopItemCfg");
        var WipeBossFoeItemCfg = (function (_super) {
            __extends(WipeBossFoeItemCfg, _super);
            function WipeBossFoeItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(WipeBossFoeItemCfg.prototype, "reward1Icons", {
                /*
                *固定奖励
                * */
                get: function () {
                    var str = '';
                    for (var i in this.killPool) {
                        str += ("" + this.killPool[i][0] + (Number(i) == this.killPool.length - 1 ? '' : '|'));
                    }
                    return GameData.getRewardItemIcons(str, true, true);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(WipeBossFoeItemCfg.prototype, "reward2Icons", {
                /*
                *几率奖励
                * */
                get: function () {
                    var str = '';
                    for (var i in this.killPool) {
                        str += ("" + this.killPool[i][0] + (Number(i) == this.killPool.length - 1 ? '' : '|'));
                    }
                    return GameData.getRewardItemIcons(str, true, true);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(WipeBossFoeItemCfg.prototype, "npcName", {
                /**
                    * 怪物名
                    */
                get: function () {
                    return this.type == 1 ? LanguageManager.getlocal("wipebossname" + this.id) : LanguageManager.getlocal("acwipeBossKillBox" + (this.id - 7));
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(WipeBossFoeItemCfg.prototype, "npcPic", {
                /**
                 * 怪物立绘
                 */
                get: function () {
                    return this.type == 1 ? "wipeboss" + this.id : "aobaibox" + (this.id - 7);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(WipeBossFoeItemCfg.prototype, "npcIcon", {
                /**
               * 怪物头像
               */
                get: function () {
                    return this.type == 1 ? "wipeboss" + this.id + "_icon" : "aobaibox" + (this.id - 7) + "_icon";
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(WipeBossFoeItemCfg.prototype, "itemBg", {
                /**
               * 怪物品质
               */
                get: function () {
                    var itembg = '';
                    var arr = [1, 2, 3, 4, 7, 6, 5];
                    if (this.type == 1) {
                        itembg = "itembg_" + arr[this.id - 1];
                    }
                    else {
                        itembg = "itembg_" + (this.id < 10 ? (this.id - 5) : 7);
                    }
                    return itembg;
                },
                enumerable: true,
                configurable: true
            });
            return WipeBossFoeItemCfg;
        }(BaseItemCfg));
        AcCfg.WipeBossFoeItemCfg = WipeBossFoeItemCfg;
        __reflect(WipeBossFoeItemCfg.prototype, "Config.AcCfg.WipeBossFoeItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=WipeBossCfg.js.map