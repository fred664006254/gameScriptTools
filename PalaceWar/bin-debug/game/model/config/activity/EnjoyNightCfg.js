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
        var EnjoyNightCfg = (function () {
            function EnjoyNightCfg() {
                /**
                 * 展示时间
                 * */
                this.extraTime = 0;
                /**
                * 每日免费巡游次数
                * */
                this.freeTime = 0;
                /**
                 * 每次巡游获得巡游值
                 * */
                this.addValue = 0;
                /**
                 * 巡游值进度奖励
                 */
                this.achievement = {};
                /**
                * 地图奖励
                */
                this.map = {};
                /**
                * 活动期间的累计充值奖励
                */
                this.recharge = {};
                /**
                * 喝酒小游戏配置
                   --npcHealth:NPC酒力初始值
                   --playerHealth:玩家酒力初始值
                   --win:必赢局
                */
                this.drink = {};
                /**
                * 兑换商店
                */
                this.shop = {};
                this.normalPoint = [];
                this.exchangeScene = {};
                this.task = {};
            }
            EnjoyNightCfg.prototype.formatData = function (data) {
                this.extraTime = data.extraTime;
                this.freeTime = data.freeTime;
                this.addValue = data.addValue;
                this.normalPoint = data.normalPoint;
                this.exchangeScene = data.exchangeScene;
                for (var key_1 in data.achievement) {
                    var itemCfg = void 0;
                    var index = Number(key_1) + 1;
                    if (!this.achievement.hasOwnProperty(index.toString())) {
                        this.achievement[index] = new EnjoyNightAchievementCfg();
                    }
                    itemCfg = this.achievement[index];
                    itemCfg.initData(data.achievement[key_1]);
                    itemCfg.id = index;
                }
                for (var key_2 in data.map) {
                    var itemCfg = void 0;
                    var index = Number(key_2) + 1;
                    if (!this.map.hasOwnProperty(index.toString())) {
                        this.map[index] = new EnjoyNightMapCfg();
                    }
                    itemCfg = this.map[index];
                    itemCfg.initData(data.map[key_2]);
                    itemCfg.id = index;
                }
                for (var key in data.recharge) {
                    var itemCfg = void 0;
                    var id = Number(key) + 1;
                    if (!this.recharge[id]) {
                        this.recharge[id] = new EnjoyNightRechargeCfg();
                    }
                    itemCfg = this.recharge[id];
                    itemCfg.initData(data.recharge[key]);
                    itemCfg.id = id;
                }
                this.drink = data.drink;
                for (var key in data.shop) {
                    var itemCfg = void 0;
                    var id = Number(key) + 1;
                    if (!this.shop[id]) {
                        this.shop[id] = new EnjoyNightShopCfg();
                    }
                    itemCfg = this.shop[id];
                    itemCfg.initData(data.shop[key]);
                    itemCfg.id = id;
                }
                for (var key in data.task) {
                    var itemCfg = void 0;
                    var id = Number(key) + 1;
                    if (!this.task[id]) {
                        this.task[id] = new EnjoyNightTaskItemCfg();
                    }
                    itemCfg = this.task[id];
                    itemCfg.initData(data.task[key]);
                    itemCfg.taskId = id;
                }
            };
            EnjoyNightCfg.prototype.getExchangeSceneId = function () {
                var scenestr = this.exchangeScene.getReward;
                return scenestr.split("_")[1];
            };
            EnjoyNightCfg.prototype.getNormalPointAwards = function () {
                var awards = "";
                for (var i = 0; i < this.normalPoint.length; i++) {
                    if (awards.length) {
                        awards += "|";
                    }
                    awards += this.normalPoint[i][0];
                }
                return awards;
            };
            /**最大的进度 */
            EnjoyNightCfg.prototype.getMaxAchievementValue = function () {
                var keys = Object.keys(this.achievement);
                var lastAchievement = this.achievement[keys[keys.length - 1]];
                return lastAchievement.needNum;
            };
            //商店兑换
            EnjoyNightCfg.prototype.getShopArr = function () {
                var arr = [];
                for (var i in this.shop) {
                    var unit = this.shop[i];
                    if (unit.getReward == "6_1740_1") {
                        if (Api.switchVoApi.checkOpenServantLevel450()) {
                            arr.push(unit);
                        }
                    }
                    else {
                        arr.push(unit);
                    }
                }
                return arr;
            };
            return EnjoyNightCfg;
        }());
        AcCfg.EnjoyNightCfg = EnjoyNightCfg;
        __reflect(EnjoyNightCfg.prototype, "Config.AcCfg.EnjoyNightCfg");
        var EnjoyNightAchievementCfg = (function (_super) {
            __extends(EnjoyNightAchievementCfg, _super);
            function EnjoyNightAchievementCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return EnjoyNightAchievementCfg;
        }(BaseItemCfg));
        AcCfg.EnjoyNightAchievementCfg = EnjoyNightAchievementCfg;
        __reflect(EnjoyNightAchievementCfg.prototype, "Config.AcCfg.EnjoyNightAchievementCfg");
        var EnjoyNightMapCfg = (function (_super) {
            __extends(EnjoyNightMapCfg, _super);
            function EnjoyNightMapCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            EnjoyNightMapCfg.prototype.getRewards = function () {
                var awards = "";
                for (var i = 0; i < this.specificPool.length; i++) {
                    if (awards.length) {
                        awards += "|";
                    }
                    awards += this.specificPool[i][0];
                }
                return awards;
            };
            return EnjoyNightMapCfg;
        }(BaseItemCfg));
        AcCfg.EnjoyNightMapCfg = EnjoyNightMapCfg;
        __reflect(EnjoyNightMapCfg.prototype, "Config.AcCfg.EnjoyNightMapCfg");
        var EnjoyNightRechargeCfg = (function (_super) {
            __extends(EnjoyNightRechargeCfg, _super);
            function EnjoyNightRechargeCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(EnjoyNightRechargeCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.getReward, true, false);
                },
                enumerable: true,
                configurable: true
            });
            return EnjoyNightRechargeCfg;
        }(BaseItemCfg));
        AcCfg.EnjoyNightRechargeCfg = EnjoyNightRechargeCfg;
        __reflect(EnjoyNightRechargeCfg.prototype, "Config.AcCfg.EnjoyNightRechargeCfg");
        var EnjoyNightShopCfg = (function (_super) {
            __extends(EnjoyNightShopCfg, _super);
            function EnjoyNightShopCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(EnjoyNightShopCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.getReward, true, false)[0];
                },
                enumerable: true,
                configurable: true
            });
            return EnjoyNightShopCfg;
        }(BaseItemCfg));
        AcCfg.EnjoyNightShopCfg = EnjoyNightShopCfg;
        __reflect(EnjoyNightShopCfg.prototype, "Config.AcCfg.EnjoyNightShopCfg");
        var EnjoyNightTaskItemCfg = (function (_super) {
            __extends(EnjoyNightTaskItemCfg, _super);
            function EnjoyNightTaskItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**
                  获得雄黄酒
                 */
                _this.specialGift = 0;
                return _this;
            }
            Object.defineProperty(EnjoyNightTaskItemCfg.prototype, "rewardIcons", {
                get: function () {
                    // this.getReward += (`18_0001_${this.zongziGet}`);
                    return GameData.getRewardItemIcons(this.getReward, true, false);
                },
                enumerable: true,
                configurable: true
            });
            return EnjoyNightTaskItemCfg;
        }(BaseItemCfg));
        AcCfg.EnjoyNightTaskItemCfg = EnjoyNightTaskItemCfg;
        __reflect(EnjoyNightTaskItemCfg.prototype, "Config.AcCfg.EnjoyNightTaskItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=EnjoyNightCfg.js.map