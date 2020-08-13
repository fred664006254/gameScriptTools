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
         * 天下至尊
         */
        var LadderTournamentCfg = (function () {
            function LadderTournamentCfg() {
                /**
                 * 展示时间
                 */
                this.extraTime = 0;
                /**
                 * 所需官职等级
                 */
                this.needLv = 0;
                /**
                 * 所需门客数量
                 */
                this.needServant = 0;
                /**
                 * 每轮持续时间  单位：天
                 */
                this.turnLast = 0;
                /**
                 * 总共轮数
                 */
                this.allTurnNum = 0;
                /**
                 * 天梯战斗攻击系数
                 */
                this.score1 = 0;
                this.score2 = 0;
                /**
                 * 天梯战斗攻击系数
                 */
                this.ladderAtk = 0;
                /**
                 * 天梯战斗血量系数
                 */
                this.ladderHp = 0;
                /**
                 * 每日免费出战次数
                 */
                this.freeNum = 0;
                /**
                 * 超过免费次数后，出战消耗道具
                 */
                this.needItem = null;
                /**
                 * 作战记录最大上限
                 */
                this.maxRecord = 0;
                /**
                 * BUFF列表
                 */
                this.buffList = {};
                /**
                 * 每次出战获得奖励
                 */
                this.battleGet = {};
                /**
                 * 物资列表，每日任务
                 */
                this.taskList = [];
                /**
                 * 排行榜奖励
                 */
                this.rankReward = {};
                /**
                 * 商店
                 */
                this.shop = {};
                /**
                 * 修身战获胜后，全队获得的攻击buff
                */
                this.atkBuff = 0;
            }
            /**
             * 初始化数据
             */
            LadderTournamentCfg.prototype.formatData = function (data) {
                this.extraTime = data.extraTime;
                this.needLv = data.needLv;
                this.needServant = data.needServant;
                this.turnLast = data.turnLast;
                this.allTurnNum = data.allTurnNum;
                this.score1 = data.score1;
                this.score2 = data.score2;
                this.ladderAtk = data.ladderAtk;
                this.ladderHp = data.ladderHp;
                this.freeNum = data.freeNum;
                this.needItem = data.needItem;
                this.maxRecord = data.maxRecord;
                this.atkBuff = data.atkBuff;
                for (var key in data.buffList) {
                    var itemCfg = void 0;
                    if (!this.buffList.hasOwnProperty(key)) {
                        this.buffList[key] = new LTBuffCfg();
                    }
                    itemCfg = this.buffList[key];
                    itemCfg.initData(data.buffList[key]);
                    itemCfg.id = key;
                }
                for (var key in data.battleGet) {
                    var itemCfg = void 0;
                    if (!this.battleGet.hasOwnProperty(key)) {
                        this.battleGet[key] = new LTBattleGetCfg();
                    }
                    itemCfg = this.battleGet[key];
                    itemCfg.initData(data.battleGet[key]);
                    itemCfg.id = key;
                }
                this.taskList.length = 0;
                for (var key in data.taskList) {
                    var v = data.taskList[key];
                    var oneList = {};
                    this.taskList.push(oneList);
                    for (var k in v) {
                        var itemCfg = new LTTaskCfg();
                        oneList[k] = itemCfg;
                        itemCfg.initData(v[k]);
                        itemCfg.id = k;
                    }
                }
                for (var key in data.rankReward) {
                    var itemCfg = void 0;
                    if (!this.rankReward.hasOwnProperty(key)) {
                        this.rankReward[key] = new LTRankRewardCfg();
                    }
                    itemCfg = this.rankReward[key];
                    itemCfg.initData(data.rankReward[key]);
                    itemCfg.id = key;
                }
                for (var key in data.shop) {
                    var itemCfg = void 0;
                    if (!this.shop.hasOwnProperty(key)) {
                        this.shop[key] = new LTShopCfg();
                    }
                    itemCfg = this.shop[key];
                    itemCfg.initData(data.shop[key]);
                    itemCfg.id = key;
                }
            };
            LadderTournamentCfg.prototype.getBuffCfg = function () {
                return this.buffList["1"];
            };
            LadderTournamentCfg.prototype.getTaskCfg = function (idx) {
                var taskobj = this.taskList[idx - 1];
                var keys = Object.keys(taskobj);
                var array = [];
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    array.push(taskobj[key]);
                }
                return array;
            };
            return LadderTournamentCfg;
        }());
        AcCfg.LadderTournamentCfg = LadderTournamentCfg;
        __reflect(LadderTournamentCfg.prototype, "Config.AcCfg.LadderTournamentCfg");
        var LTBuffCfg = (function (_super) {
            __extends(LTBuffCfg, _super);
            function LTBuffCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return LTBuffCfg;
        }(BaseItemCfg));
        AcCfg.LTBuffCfg = LTBuffCfg;
        __reflect(LTBuffCfg.prototype, "Config.AcCfg.LTBuffCfg");
        var LTBattleGetCfg = (function (_super) {
            __extends(LTBattleGetCfg, _super);
            function LTBattleGetCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return LTBattleGetCfg;
        }(BaseItemCfg));
        AcCfg.LTBattleGetCfg = LTBattleGetCfg;
        __reflect(LTBattleGetCfg.prototype, "Config.AcCfg.LTBattleGetCfg");
        var LTTaskCfg = (function (_super) {
            __extends(LTTaskCfg, _super);
            function LTTaskCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(LTTaskCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.getReward, true, false);
                },
                enumerable: true,
                configurable: true
            });
            return LTTaskCfg;
        }(BaseItemCfg));
        AcCfg.LTTaskCfg = LTTaskCfg;
        __reflect(LTTaskCfg.prototype, "Config.AcCfg.LTTaskCfg");
        var LTRankRewardCfg = (function (_super) {
            __extends(LTRankRewardCfg, _super);
            function LTRankRewardCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(LTRankRewardCfg.prototype, "rewardIcons", {
                get: function () {
                    var rewardstr = "1030_0_" + this.getMerit + "|" + this.getReward;
                    return GameData.getRewardItemIcons(rewardstr, true, false);
                },
                enumerable: true,
                configurable: true
            });
            return LTRankRewardCfg;
        }(BaseItemCfg));
        AcCfg.LTRankRewardCfg = LTRankRewardCfg;
        __reflect(LTRankRewardCfg.prototype, "Config.AcCfg.LTRankRewardCfg");
        var LTShopCfg = (function (_super) {
            __extends(LTShopCfg, _super);
            function LTShopCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return LTShopCfg;
        }(BaseItemCfg));
        AcCfg.LTShopCfg = LTShopCfg;
        __reflect(LTShopCfg.prototype, "Config.AcCfg.LTShopCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=LadderTournamentCfg.js.map