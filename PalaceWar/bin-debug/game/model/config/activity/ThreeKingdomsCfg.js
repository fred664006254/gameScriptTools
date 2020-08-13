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
        var ThreeKingdomsCfg = (function () {
            function ThreeKingdomsCfg() {
                /*--参与三国争霸官品限制*/
                this.lvNeed = 10;
                /**参与三国争霸权势要求*/
                this.powerNeed = 0;
                /** --三国争霸持续时间 单位：天*/
                this.lastTime = 0;
                /**展示期时间 单位：天*/
                this.extraTime = 0;
                /**
                 * --每周可参与活动时间
                */
                this.activeTime = [];
                /**
                 *  --任务期会用到的配置内容
                */
                this.taskList = [];
                /**
                 *  --阵营神将Buff
                */
                this.heroList = [];
                //----------------------------------------------【普通攻城期】---------------------------------------------------/
                /*--每个门客攻击力 = 总资质 * X*/
                this.atkBase = 0;
                /*--每个门客血量 = 总属性 * X*/
                this.hpBase = 0;
                /*--每 X 回合，攻击力增加*/
                this.round = 0;
                /*--每 round 回合，攻击力 = 攻击力 * X*/
                this.atkAdd = 0;
                /*--普通城内的据点数量*/
                this.campNum1 = 0;
                /*--普通城内，每个据点产出分数 X 每秒*/
                this.campScore1 = 0;
                /*--大都督发布军令的城池，我方阵营门客攻击力增加 X%   注：攻击力的加成方式都是加法 【攻击力 * （1+ 加成1 + 加成2 +加成3）】 * 回合翻倍*/
                this.order = 0;
                /* --普通攻城期，每次额外出战，需要消耗 X 粮草（注：普通攻城期和核心攻城期的粮草不是同一个东西）*/
                this.costFood1 = 0;
                /**
                 * --城池目标奖励
                */
                this.cityReward = [];
                /**
                 * --普通攻城期每轮排名奖励   每轮根据贡献的兵力，不考虑胜负方
                */
                this.cityRankReward = [];
                /**
                 * 普通城援军加成 每个阵营援军数量达到 X ，则获得对应加成
                */
                this.troop1 = [];
                /**
                 * 普通城援军排名加成，根据阵营的总援军达到 X ，阵营援军排名，分别获得对应加成
                */
                this.troopRank1 = [];
                /* 普通攻城期，每轮免费次数*/
                this.freeNum1 = 0;
                /* 普通攻城期，每轮进攻冷却时间  单位：秒*/
                this.coldTime1 = 0;
                /*--限时军需，充值奖励，每日充值*/
                this.recharge = [];
                //----------------------------------------------【中心攻城期】---------------------------------------------------
                /**--中心城内的据点数量*/
                this.campNum2 = 0;
                /*--中心城内，每个据点产出分数 X 每秒*/
                this.campScore2 = 0;
                /*---每次出征，消耗 X 粮草*/
                this.costFood2 = 0;
                /* 普通攻城期，每轮免费次数*/
                this.freeNum2 = 0;
                /* 普通攻城期，每轮进攻冷却时间  单位：秒*/
                this.coldTime2 = 0;
                /**
                 * --中心城援军加成 每个阵营援军数量达到 X ，则获得对应加成
                */
                this.troop2 = [];
                /**
                 * 中心城援军排名加成，根据阵营的总援军达到 X ，阵营援军排名，分别获得对应加成
                */
                this.troopRank2 = [];
                //----------------------------------------------【排名奖励】---------------------------------------------------
                /**
                 * 每周的阵营排名奖励
                */
                this.kingdom1 = [];
                /**
                *每周的个人排名奖励
                */
                this.person1 = [];
                /**
                 *赛季的阵营排名奖励
                 */
                this.kingdom2 = [];
                /**
                 * 赛季的个人排名奖励
                */
                this.person2 = [];
                /*----------------------------------------------【神将突袭】---------------------------------------------------*/
                /*--神将突袭的boss血量*/
                this.heroHp = 0;
                /*--击杀神将获得神将经验*/
                this.addHeroExp = 0;
                /*--神将突袭参与奖励*/
                this.officer1 = "";
                /*--神将突袭击退奖励*/
                this.officer2 = "";
                //--加入推荐阵营奖励
                this.recommendReward = "1_1_100";
                // --换阵营消耗道具
                this.change = "6_1451_1";
                /**
                 * 冲榜排名获得粮草
                 * --rank:排名
             --food2:跨服冲榜的排名获得军资 【跨服权势、亲密、擂台、绝地擂台、跨服皇陵、跨服群芳、定军中原】
                */
                this.getFood = [];
            }
            ThreeKingdomsCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    if (typeof data[key] != 'object') {
                        this[key] = data[key];
                    }
                }
                for (var key in data.activeTime) {
                    var itemCfg = void 0;
                    var id = Number(key) + 1;
                    if (!this.activeTime.hasOwnProperty(String(key))) {
                        this.activeTime[String(key)] = new ThreeKingdomsActiveCfg();
                    }
                    itemCfg = this.activeTime[String(key)];
                    itemCfg.initData(data.activeTime[key]);
                    itemCfg.id = id;
                }
                for (var key in data.taskList) {
                    var itemCfg = void 0;
                    var id = Number(key) + 1;
                    if (!this.taskList.hasOwnProperty(String(key))) {
                        this.taskList[String(key)] = new ThreeKingdomsTaskListCfg();
                    }
                    itemCfg = this.taskList[String(key)];
                    itemCfg.initData(data.taskList[key]);
                    itemCfg.id = id;
                }
                for (var key in data.heroList) {
                    var itemCfg = void 0;
                    var id = Number(key) + 1;
                    if (!this.heroList.hasOwnProperty(String(key))) {
                        this.heroList[String(key)] = new ThreeKingdomsHeroListCfg();
                    }
                    itemCfg = this.heroList[String(key)];
                    itemCfg.initData(data.heroList[key]);
                    itemCfg.id = id;
                }
                for (var key in data.cityReward) {
                    var itemCfg = void 0;
                    var id = Number(key) + 1;
                    if (!this.cityReward.hasOwnProperty(String(key))) {
                        this.cityReward[String(key)] = new ThreeKingdomsCityRewardCfg();
                    }
                    itemCfg = this.cityReward[String(key)];
                    itemCfg.initData(data.cityReward[key]);
                    itemCfg.id = id;
                }
                for (var key in data.troop1) {
                    var itemCfg = void 0;
                    var id = Number(key) + 1;
                    if (!this.troop1.hasOwnProperty(String(key))) {
                        this.troop1[String(key)] = new ThreeKingdomsTroop1Cfg();
                    }
                    itemCfg = this.troop1[String(key)];
                    itemCfg.initData(data.troop1[key]);
                    itemCfg.id = id;
                }
                for (var key in data.troopRank1) {
                    var itemCfg = void 0;
                    var id = Number(key) + 1;
                    if (!this.troopRank1.hasOwnProperty(String(key))) {
                        this.troopRank1[String(key)] = new ThreeKingdomsTroop1RankCfg();
                    }
                    itemCfg = this.troopRank1[String(key)];
                    itemCfg.initData(data.troopRank1[key]);
                    itemCfg.id = id;
                }
                for (var key in data.troop2) {
                    var itemCfg = void 0;
                    var id = Number(key) + 1;
                    if (!this.troop2.hasOwnProperty(String(key))) {
                        this.troop2[String(key)] = new ThreeKingdomsTroop2Cfg();
                    }
                    itemCfg = this.troop2[String(key)];
                    itemCfg.initData(data.troop2[key]);
                    itemCfg.id = id;
                }
                for (var key in data.troopRank2) {
                    var itemCfg = void 0;
                    var id = Number(key) + 1;
                    if (!this.troopRank2.hasOwnProperty(String(key))) {
                        this.troopRank2[String(key)] = new ThreeKingdomsTroop2RankCfg();
                    }
                    itemCfg = this.troopRank2[String(key)];
                    itemCfg.initData(data.troopRank2[key]);
                    itemCfg.id = id;
                }
                for (var key in data.kingdom1) {
                    var itemCfg = void 0;
                    var id = Number(key) + 1;
                    if (!this.kingdom1.hasOwnProperty(String(key))) {
                        this.kingdom1[String(key)] = new ThreeKingdomsZrankRewardCfg();
                    }
                    itemCfg = this.kingdom1[String(key)];
                    itemCfg.initData(data.kingdom1[key]);
                    itemCfg.id = id;
                }
                for (var key in data.kingdom2) {
                    var itemCfg = void 0;
                    var id = Number(key) + 1;
                    if (!this.kingdom2.hasOwnProperty(String(key))) {
                        this.kingdom2[String(key)] = new ThreeKingdomsZrankRewardCfg();
                    }
                    itemCfg = this.kingdom2[String(key)];
                    itemCfg.initData(data.kingdom2[key]);
                    itemCfg.id = id;
                }
                for (var key in data.person1) {
                    var itemCfg = void 0;
                    var id = Number(key) + 1;
                    if (!this.person1.hasOwnProperty(String(key))) {
                        this.person1[String(key)] = new ThreeKingdomsPrankRewardCfg();
                    }
                    itemCfg = this.person1[String(key)];
                    itemCfg.initData(data.person1[key]);
                    itemCfg.id = id;
                }
                for (var key in data.person2) {
                    var itemCfg = void 0;
                    var id = Number(key) + 1;
                    if (!this.person2.hasOwnProperty(String(key))) {
                        this.person2[String(key)] = new ThreeKingdomsPrankRewardCfg();
                    }
                    itemCfg = this.person2[String(key)];
                    itemCfg.initData(data.person2[key]);
                    itemCfg.id = id;
                }
                for (var key in data.recharge) {
                    var itemCfg = void 0;
                    var id = Number(key) + 1;
                    if (!this.recharge.hasOwnProperty(String(key))) {
                        this.recharge[String(key)] = new ThreeKingdomsLimitRechargeCfg();
                    }
                    itemCfg = this.recharge[String(key)];
                    itemCfg.initData(data.recharge[key]);
                    itemCfg.id = id;
                }
                for (var key in data.getFood) {
                    var itemCfg = void 0;
                    var id = Number(key) + 1;
                    if (!this.getFood.hasOwnProperty(String(key))) {
                        this.getFood[String(key)] = new ThreeKingdomsGetFoodRewardCfg();
                    }
                    itemCfg = this.getFood[String(key)];
                    itemCfg.initData(data.getFood[key]);
                    itemCfg.id = id;
                }
                for (var key in data.cityRankReward) {
                    var itemCfg = void 0;
                    var id = Number(key) + 1;
                    if (!this.cityRankReward.hasOwnProperty(String(key))) {
                        this.cityRankReward[String(key)] = new ThreeKingdomsCityRankRewardCfg();
                    }
                    itemCfg = this.cityRankReward[String(key)];
                    itemCfg.initData(data.cityRankReward[key]);
                    itemCfg.id = id;
                }
            };
            ThreeKingdomsCfg.prototype.getFightNum = function (type) {
                return type == 1 ? this.freeNum1 : this.freeNum2;
            };
            return ThreeKingdomsCfg;
        }());
        AcCfg.ThreeKingdomsCfg = ThreeKingdomsCfg;
        __reflect(ThreeKingdomsCfg.prototype, "Config.AcCfg.ThreeKingdomsCfg");
        var ThreeKingdomsActiveCfg = (function (_super) {
            __extends(ThreeKingdomsActiveCfg, _super);
            function ThreeKingdomsActiveCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**
                 * --type:事件类型
                 * 1：任务期（周一--周五）
                 * 2：神将突袭时间（周一--周五）
                 * 3：攻城期第一场
                 *  4：攻城期第二场
                 * 5：激战期
                 * --popularityRange:事件时间
                 */
                _this.id = 0;
                _this.type = 0;
                _this.popularityRange = [];
                return _this;
            }
            return ThreeKingdomsActiveCfg;
        }(BaseItemCfg));
        AcCfg.ThreeKingdomsActiveCfg = ThreeKingdomsActiveCfg;
        __reflect(ThreeKingdomsActiveCfg.prototype, "Config.AcCfg.ThreeKingdomsActiveCfg");
        var ThreeKingdomsTaskListCfg = (function (_super) {
            __extends(ThreeKingdomsTaskListCfg, _super);
            function ThreeKingdomsTaskListCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.id = 0;
                //needGem:升级到下一级所需元宝
                _this.needGem = 0;
                //所需门客数
                _this.servantNeed = 0;
                //--needValue1:普通城所需对应资质达到 X  四个城分别对应：武智政魅  主城对应总资质
                _this.needValue1 = 0;
                // --needValue2:主城所需对应资质达到 X  主城对应总资质
                _this.needValue2 = 0;
                //--needTime:完成任务所需时间 单位：秒
                _this.needTime = 0;
                // --addHeroExp:完成任务增加 X 神将经验
                _this.addHeroExp = 0;
                //--getReward:任务奖励
                _this.getReward = '';
                return _this;
            }
            return ThreeKingdomsTaskListCfg;
        }(BaseItemCfg));
        AcCfg.ThreeKingdomsTaskListCfg = ThreeKingdomsTaskListCfg;
        __reflect(ThreeKingdomsTaskListCfg.prototype, "Config.AcCfg.ThreeKingdomsTaskListCfg");
        var ThreeKingdomsHeroListCfg = (function (_super) {
            __extends(ThreeKingdomsHeroListCfg, _super);
            function ThreeKingdomsHeroListCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**
                 * --needExp:升级到本级所需 X 经验，初始为0级
                    --addAtk:增加本阵营所有队伍的攻击力： X%
                    --addHeroExp:增加本阵营所有队伍血量： X%
    
                 */
                _this.id = 0;
                _this.needExp = 0;
                _this.addAtk = 0;
                _this.addHeroExp = 0;
                return _this;
            }
            return ThreeKingdomsHeroListCfg;
        }(BaseItemCfg));
        AcCfg.ThreeKingdomsHeroListCfg = ThreeKingdomsHeroListCfg;
        __reflect(ThreeKingdomsHeroListCfg.prototype, "Config.AcCfg.ThreeKingdomsHeroListCfg");
        var ThreeKingdomsCityRewardCfg = (function (_super) {
            __extends(ThreeKingdomsCityRewardCfg, _super);
            function ThreeKingdomsCityRewardCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**
                 *
                 *  --cityType:城池类型：1：守城 2：攻城 3：荆州 4：赤壁
                --addKingdomScore:增加阵营分数
                --specialReward2:个人获得军资
                --getReward:个人获得奖励
                 */
                _this.id = 0;
                _this.cityType = 0;
                _this.addKingdomScore = 0;
                _this.specialReward2 = 0;
                _this.getReward = '';
                return _this;
            }
            return ThreeKingdomsCityRewardCfg;
        }(BaseItemCfg));
        AcCfg.ThreeKingdomsCityRewardCfg = ThreeKingdomsCityRewardCfg;
        __reflect(ThreeKingdomsCityRewardCfg.prototype, "Config.AcCfg.ThreeKingdomsCityRewardCfg");
        var ThreeKingdomsTroop1Cfg = (function (_super) {
            __extends(ThreeKingdomsTroop1Cfg, _super);
            function ThreeKingdomsTroop1Cfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**
                 *--普通城援军加成 每个阵营援军数量达到 X ，则获得对应加成
                --needNum:阵营所需援军数量  单位：亿
                --addAtk:增强门客攻击力 固定值
                 */
                _this.id = 0;
                _this.needNum = 0;
                _this.addAtk = 0;
                return _this;
            }
            return ThreeKingdomsTroop1Cfg;
        }(BaseItemCfg));
        AcCfg.ThreeKingdomsTroop1Cfg = ThreeKingdomsTroop1Cfg;
        __reflect(ThreeKingdomsTroop1Cfg.prototype, "Config.AcCfg.ThreeKingdomsTroop1Cfg");
        var ThreeKingdomsTroop1RankCfg = (function (_super) {
            __extends(ThreeKingdomsTroop1RankCfg, _super);
            function ThreeKingdomsTroop1RankCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**
                 *--needNum:总援军所需数量 单位：亿
                --rank1:排名第一的阵营，门客增加攻击力 固定值
                --rank2:排名第二的阵营，门客增加攻击力 固定值
                --rank3:排名第三的阵营，门客增加攻击力 固定值
                 */
                _this.id = 0;
                _this.needNum = 0;
                _this.rank1 = 0;
                _this.rank2 = 0;
                _this.rank3 = 0;
                return _this;
            }
            return ThreeKingdomsTroop1RankCfg;
        }(BaseItemCfg));
        AcCfg.ThreeKingdomsTroop1RankCfg = ThreeKingdomsTroop1RankCfg;
        __reflect(ThreeKingdomsTroop1RankCfg.prototype, "Config.AcCfg.ThreeKingdomsTroop1RankCfg");
        var ThreeKingdomsTroop2Cfg = (function (_super) {
            __extends(ThreeKingdomsTroop2Cfg, _super);
            function ThreeKingdomsTroop2Cfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**
                 *--普通城援军加成 每个阵营援军数量达到 X ，则获得对应加成
                --needNum:阵营所需援军数量  单位：亿
                --addAtk:增强门客攻击力 固定值
                 */
                _this.id = 0;
                _this.needNum = 0;
                _this.addAtk = 0;
                return _this;
            }
            return ThreeKingdomsTroop2Cfg;
        }(BaseItemCfg));
        AcCfg.ThreeKingdomsTroop2Cfg = ThreeKingdomsTroop2Cfg;
        __reflect(ThreeKingdomsTroop2Cfg.prototype, "Config.AcCfg.ThreeKingdomsTroop2Cfg");
        var ThreeKingdomsTroop2RankCfg = (function (_super) {
            __extends(ThreeKingdomsTroop2RankCfg, _super);
            function ThreeKingdomsTroop2RankCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**
                 *--needNum:总援军所需数量 单位：亿
                --rank1:排名第一的阵营，门客增加攻击力 固定值
                --rank2:排名第二的阵营，门客增加攻击力 固定值
                --rank3:排名第三的阵营，门客增加攻击力 固定值
                 */
                _this.id = 0;
                _this.needNum = 0;
                _this.rank1 = 0;
                _this.rank2 = 0;
                _this.rank3 = 0;
                return _this;
            }
            return ThreeKingdomsTroop2RankCfg;
        }(BaseItemCfg));
        AcCfg.ThreeKingdomsTroop2RankCfg = ThreeKingdomsTroop2RankCfg;
        __reflect(ThreeKingdomsTroop2RankCfg.prototype, "Config.AcCfg.ThreeKingdomsTroop2RankCfg");
        var ThreeKingdomsZrankRewardCfg = (function (_super) {
            __extends(ThreeKingdomsZrankRewardCfg, _super);
            function ThreeKingdomsZrankRewardCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**
                 * --每周的阵营排名奖励
                getReward:阵营排名奖励，分别对应 第一名、第二名、第三名
                 */
                _this.id = 0;
                _this.getReward = '';
                return _this;
            }
            return ThreeKingdomsZrankRewardCfg;
        }(BaseItemCfg));
        AcCfg.ThreeKingdomsZrankRewardCfg = ThreeKingdomsZrankRewardCfg;
        __reflect(ThreeKingdomsZrankRewardCfg.prototype, "Config.AcCfg.ThreeKingdomsZrankRewardCfg");
        var ThreeKingdomsPrankRewardCfg = (function (_super) {
            __extends(ThreeKingdomsPrankRewardCfg, _super);
            function ThreeKingdomsPrankRewardCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**
                 * --每周的阵营排名奖励
                --rank:排名
                --getReward:个人排名奖励
                 */
                _this.id = 0;
                _this.rank = [];
                _this.getReward = '';
                return _this;
            }
            return ThreeKingdomsPrankRewardCfg;
        }(BaseItemCfg));
        AcCfg.ThreeKingdomsPrankRewardCfg = ThreeKingdomsPrankRewardCfg;
        __reflect(ThreeKingdomsPrankRewardCfg.prototype, "Config.AcCfg.ThreeKingdomsPrankRewardCfg");
        var ThreeKingdomsLimitRechargeCfg = (function (_super) {
            __extends(ThreeKingdomsLimitRechargeCfg, _super);
            function ThreeKingdomsLimitRechargeCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.id = 0;
                return _this;
            }
            return ThreeKingdomsLimitRechargeCfg;
        }(BaseItemCfg));
        AcCfg.ThreeKingdomsLimitRechargeCfg = ThreeKingdomsLimitRechargeCfg;
        __reflect(ThreeKingdomsLimitRechargeCfg.prototype, "Config.AcCfg.ThreeKingdomsLimitRechargeCfg");
        var ThreeKingdomsGetFoodRewardCfg = (function (_super) {
            __extends(ThreeKingdomsGetFoodRewardCfg, _super);
            function ThreeKingdomsGetFoodRewardCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**
                 * --rank:排名
                --food2:跨服冲榜的排名获得军资 【跨服权势、亲密、擂台、绝地擂台、跨服皇陵、跨服群芳、定军中原】
                 */
                _this.id = 0;
                _this.rank = [];
                _this.food2 = 0;
                return _this;
            }
            return ThreeKingdomsGetFoodRewardCfg;
        }(BaseItemCfg));
        AcCfg.ThreeKingdomsGetFoodRewardCfg = ThreeKingdomsGetFoodRewardCfg;
        __reflect(ThreeKingdomsGetFoodRewardCfg.prototype, "Config.AcCfg.ThreeKingdomsGetFoodRewardCfg");
        var ThreeKingdomsCityRankRewardCfg = (function (_super) {
            __extends(ThreeKingdomsCityRankRewardCfg, _super);
            function ThreeKingdomsCityRankRewardCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**
                 * --普通攻城期每轮排名奖励   每轮根据贡献的兵力，不考虑胜负方
                --rank:贡献排名
                --specialReward2:获得特殊奖励 军资
                --getReward:个人获得奖励
                 */
                _this.id = 0;
                _this.rank = [];
                _this.specialReward2 = 0;
                _this.getReward = '';
                return _this;
            }
            return ThreeKingdomsCityRankRewardCfg;
        }(BaseItemCfg));
        AcCfg.ThreeKingdomsCityRankRewardCfg = ThreeKingdomsCityRankRewardCfg;
        __reflect(ThreeKingdomsCityRankRewardCfg.prototype, "Config.AcCfg.ThreeKingdomsCityRankRewardCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=ThreeKingdomsCfg.js.map