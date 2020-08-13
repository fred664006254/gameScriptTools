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
         * 东海皇陵
         */
        var TombCfg = (function () {
            function TombCfg() {
                /**
                 * --展示时间
                 */
                this.extraTime = 0;
                /**
                 * --参与条件：官职达到从七品或以上
                 */
                this.needLv = 0;
                /**
                 *--总行数，一行6个，数值请注意总格子数与怪物奖励格子数的关系
                 */
                this.totRows = 0;
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
                this.indivdualRank = {};
                /**--区服排名奖励
                --rank：排行榜上下限  例：{5,10} 第五名至第十名
                --getReward：奖励*/
                this.allianceRank = {};
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
                /**
                 *
                --门客出战恢复道具  消耗出战令1个  每个门客每天只可恢复1次
                */
                this.needItem = "";
                /**
                 * 玩家整个活动获得积分上限，服务器数量 X scoreLimit 。玩家可获取总积分的一半
                */
                this.scoreLimit = 0;
                /**
                 * --挖每个格子增加积分和分数
                */
                this.dig = 0;
                /**
                 * --挖每个格子增加积分和分数
                */
                this.prize = [];
                /**
                 * 单次活动，个人获得的最大积分限制（只限制用于商店兑换的积分，）
                */
                this.maxScore = 0;
            }
            TombCfg.prototype.formatData = function (data) {
                this.needLv = 5;
                this.initialExplore = data.initialExplore;
                this.renewTime = data.renewTime;
                this.maxShare = data.maxShare;
                this.actTime = data.actTime;
                this.needKillNum = data.needKillNum;
                this.buyNumCost = data.buyNumCost;
                this.totRows = data.totRows;
                this.extraTime = data.extraTime;
                this.maxScore = data.maxScore;
                for (var key in data.indivdualRank) {
                    var itemCfg = void 0;
                    if (!this.indivdualRank.hasOwnProperty((Number(key) + 1).toString())) {
                        this.indivdualRank[Number(key) + 1] = new TombPersonRankRewardItemCfg();
                    }
                    itemCfg = this.indivdualRank[Number(key) + 1];
                    itemCfg.initData(data.indivdualRank[key]);
                    itemCfg.id = Number(key) + 1;
                }
                for (var key in data.allianceRank) {
                    var itemCfg = void 0;
                    if (!this.allianceRank.hasOwnProperty((Number(key) + 1).toString())) {
                        this.allianceRank[Number(key) + 1] = new TombServerRankRewardItemCfg();
                    }
                    itemCfg = this.allianceRank[Number(key) + 1];
                    itemCfg.initData(data.allianceRank[key]);
                    itemCfg.id = Number(key) + 1;
                }
                for (var key in data.scoreMarket) {
                    var itemCfg = void 0;
                    if (!this.scoreMarket.hasOwnProperty(String(key))) {
                        this.scoreMarket[String(key)] = new TombScoreItemCfg();
                    }
                    itemCfg = this.scoreMarket[String(key)];
                    itemCfg.initData(data.scoreMarket[key]);
                    itemCfg.id = Number(key) + 1;
                }
                for (var key in data.actMarket) {
                    var itemCfg = void 0;
                    if (!this.actMarket.hasOwnProperty(String(key))) {
                        this.actMarket[String(key)] = new TombShopItemCfg();
                    }
                    itemCfg = this.actMarket[String(key)];
                    itemCfg.initData(data.actMarket[key]);
                    itemCfg.id = Number(key) + 1;
                }
                for (var key in data.foe) {
                    var itemCfg = void 0;
                    if (!this.foe.hasOwnProperty(String(key))) {
                        this.foe[String(key)] = new TombFoeItemCfg();
                    }
                    itemCfg = this.foe[String(key)];
                    itemCfg.initData(data.foe[key]);
                    itemCfg.id = Number(key) + 1;
                }
            };
            TombCfg.prototype.getBossNpcItemCfgById = function (foeid) {
                return this.foe[foeid - 1];
            };
            TombCfg.prototype.getActTime = function () {
                return [
                    App.DateUtil.formatSvrHourByLocalTimeZone(this.actTime[0]).hour,
                    App.DateUtil.formatSvrHourByLocalTimeZone(this.actTime[1]).hour,
                ];
            };
            return TombCfg;
        }());
        AcCfg.TombCfg = TombCfg;
        __reflect(TombCfg.prototype, "Config.AcCfg.TombCfg");
        var TombPersonRankRewardItemCfg = (function (_super) {
            __extends(TombPersonRankRewardItemCfg, _super);
            function TombPersonRankRewardItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(TombPersonRankRewardItemCfg.prototype, "minRank", {
                get: function () {
                    return this.idvRank[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TombPersonRankRewardItemCfg.prototype, "maxRank", {
                get: function () {
                    return this.idvRank[1];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TombPersonRankRewardItemCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.getReward, true, true);
                },
                enumerable: true,
                configurable: true
            });
            return TombPersonRankRewardItemCfg;
        }(BaseItemCfg));
        __reflect(TombPersonRankRewardItemCfg.prototype, "TombPersonRankRewardItemCfg");
        var TombServerRankRewardItemCfg = (function (_super) {
            __extends(TombServerRankRewardItemCfg, _super);
            function TombServerRankRewardItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(TombServerRankRewardItemCfg.prototype, "minRank", {
                get: function () {
                    return this.alnRank[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TombServerRankRewardItemCfg.prototype, "maxRank", {
                get: function () {
                    return this.alnRank[1];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TombServerRankRewardItemCfg.prototype, "reward1Icons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.lordReward, true, true);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TombServerRankRewardItemCfg.prototype, "reward2Icons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.memberReward, true, true);
                },
                enumerable: true,
                configurable: true
            });
            return TombServerRankRewardItemCfg;
        }(BaseItemCfg));
        __reflect(TombServerRankRewardItemCfg.prototype, "TombServerRankRewardItemCfg");
        var TombScoreItemCfg = (function (_super) {
            __extends(TombScoreItemCfg, _super);
            function TombScoreItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(TombScoreItemCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.goods, true, false);
                },
                enumerable: true,
                configurable: true
            });
            return TombScoreItemCfg;
        }(BaseItemCfg));
        __reflect(TombScoreItemCfg.prototype, "TombScoreItemCfg");
        var TombShopItemCfg = (function (_super) {
            __extends(TombShopItemCfg, _super);
            function TombShopItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(TombShopItemCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.goods, true, false);
                },
                enumerable: true,
                configurable: true
            });
            return TombShopItemCfg;
        }(BaseItemCfg));
        __reflect(TombShopItemCfg.prototype, "TombShopItemCfg");
        var TombFoeItemCfg = (function (_super) {
            __extends(TombFoeItemCfg, _super);
            function TombFoeItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(TombFoeItemCfg.prototype, "reward1Icons", {
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
            Object.defineProperty(TombFoeItemCfg.prototype, "reward2Icons", {
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
            /**
                * 怪物名
                */
            TombFoeItemCfg.prototype.getnpcName = function (code) {
                return LanguageManager.getlocal("tombbossname" + this.id + "-" + code);
            };
            /**
            * 怪物立绘
            */
            TombFoeItemCfg.prototype.getnpcPic = function (code) {
                return "tombboss" + this.id + "-" + code;
            };
            /**
            * 怪物头像
            */
            TombFoeItemCfg.prototype.getnpcIcon = function (code) {
                return "tombboss" + this.id + "_icon-" + code;
            };
            Object.defineProperty(TombFoeItemCfg.prototype, "itemBg", {
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
            return TombFoeItemCfg;
        }(BaseItemCfg));
        AcCfg.TombFoeItemCfg = TombFoeItemCfg;
        __reflect(TombFoeItemCfg.prototype, "Config.AcCfg.TombFoeItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=TombCfg.js.map