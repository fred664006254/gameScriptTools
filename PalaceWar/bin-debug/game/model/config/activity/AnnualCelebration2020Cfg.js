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
        var AnnualCelebration2020Cfg = (function () {
            function AnnualCelebration2020Cfg() {
                /**
                 * 展示时间
                 */
                this.extraTime = 0;
                /**
                 * 核心奖励:红颜ID，前端展示
                 */
                this.show = 0;
                /**
               
    
                /**
                 * 游览奖励（圈数进度奖励），达到最大圈数后，以后每圈都会获得最大圈数的奖励
                 */
                this.achievement = {};
                /**
                 * -页签二-庆典任务   注：活动任务-特殊的限时方式，同类型的要扩展式的，不是分天的！
                 */
                this.task = [];
                /**
                 * 地图奖励
                 */
                this.map = {};
                this.normalPoint = [];
            }
            AnnualCelebration2020Cfg.prototype.formatData = function (data) {
                this.extraTime = data.extraTime;
                this.show = data.show;
                this.normalPoint = data.normalPoint;
                for (var key in data.achievement) {
                    var itemCfg = void 0;
                    var index = Number(key) + 1;
                    if (!this.achievement.hasOwnProperty(index.toString())) {
                        this.achievement[index] = new AC2020AchievementItemCfg();
                    }
                    itemCfg = this.achievement[index];
                    itemCfg.initData(data.achievement[key]);
                    itemCfg.id = index;
                }
                this.task.length = 0;
                for (var key in data.task) {
                    var v = data.task[key];
                    var oneList = {};
                    this.task.push(oneList);
                    for (var k in v) {
                        var index = Number(k) + 1;
                        var itemCfg = new AC2020TaskItemCfg();
                        oneList[k] = itemCfg;
                        itemCfg.initData(v[k]);
                        itemCfg.id = index;
                        itemCfg.type = Number(key) + 1;
                    }
                }
                for (var key in data.map) {
                    var itemCfg = void 0;
                    var index = Number(key) + 1;
                    if (!this.map.hasOwnProperty(index.toString())) {
                        this.map[index] = new AC2020MapItemCfg();
                    }
                    itemCfg = this.map[index];
                    itemCfg.initData(data.map[key]);
                    itemCfg.id = index;
                }
            };
            AnnualCelebration2020Cfg.prototype.getMaxCircle = function () {
                return Object.keys(this.achievement).length;
            };
            AnnualCelebration2020Cfg.prototype.getSkinNeedCircle = function () {
                for (var k in this.achievement) {
                    var cfg = this.achievement[k];
                    var rewardsvo = GameData.formatRewardItem(cfg.getReward);
                    for (var i = 0; i < rewardsvo.length; i++) {
                        var onevo = rewardsvo[i];
                        if (onevo.type == 10 && onevo.id == this.show) {
                            return cfg.needNum;
                        }
                    }
                }
                return 12;
            };
            AnnualCelebration2020Cfg.prototype.getNormalPointAwards = function () {
                var awards = "";
                for (var i = 0; i < this.normalPoint.length; i++) {
                    if (awards.length) {
                        awards += "|";
                    }
                    awards += this.normalPoint[i][0];
                }
                return awards;
            };
            return AnnualCelebration2020Cfg;
        }());
        AcCfg.AnnualCelebration2020Cfg = AnnualCelebration2020Cfg;
        __reflect(AnnualCelebration2020Cfg.prototype, "Config.AcCfg.AnnualCelebration2020Cfg");
        var AC2020AchievementItemCfg = (function (_super) {
            __extends(AC2020AchievementItemCfg, _super);
            function AC2020AchievementItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return AC2020AchievementItemCfg;
        }(BaseItemCfg));
        AcCfg.AC2020AchievementItemCfg = AC2020AchievementItemCfg;
        __reflect(AC2020AchievementItemCfg.prototype, "Config.AcCfg.AC2020AchievementItemCfg");
        var AC2020TaskItemCfg = (function (_super) {
            __extends(AC2020TaskItemCfg, _super);
            function AC2020TaskItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return AC2020TaskItemCfg;
        }(BaseItemCfg));
        AcCfg.AC2020TaskItemCfg = AC2020TaskItemCfg;
        __reflect(AC2020TaskItemCfg.prototype, "Config.AcCfg.AC2020TaskItemCfg");
        var AC2020MapItemCfg = (function (_super) {
            __extends(AC2020MapItemCfg, _super);
            function AC2020MapItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            AC2020MapItemCfg.prototype.getRewards = function () {
                var awards = "";
                for (var i = 0; i < this.specificPool.length; i++) {
                    if (awards.length) {
                        awards += "|";
                    }
                    awards += this.specificPool[i][0];
                }
                return awards;
            };
            return AC2020MapItemCfg;
        }(BaseItemCfg));
        AcCfg.AC2020MapItemCfg = AC2020MapItemCfg;
        __reflect(AC2020MapItemCfg.prototype, "Config.AcCfg.AC2020MapItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=AnnualCelebration2020Cfg.js.map