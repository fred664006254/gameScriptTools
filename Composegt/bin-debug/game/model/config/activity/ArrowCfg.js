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
        var ArrowCfg = (function () {
            function ArrowCfg() {
                this.type = 11100;
                this.extraTime = 0;
            }
            //解析数据
            ArrowCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        this[key] = data[key];
                    }
                    if (key == "levelup") {
                        this.levelList = [];
                        var i = 0;
                        for (var k in data[key]) {
                            var itemcfg = new ArrowLevelItemCfg();
                            itemcfg.initData(data[key][k]);
                            itemcfg.id = String(i + 1);
                            this.levelList.push(itemcfg);
                            i++;
                        }
                    }
                    if (key == "rankreward") {
                        this.rankList = [];
                        var i = 0;
                        for (var k in data[key]) {
                            var itemcfg = new ArrowRankItemCfg();
                            itemcfg.initData(data[key][k]);
                            itemcfg.id = String(i + 1);
                            this.rankList.push(itemcfg);
                            i++;
                        }
                    }
                }
            };
            ArrowCfg.prototype.getMaxBoxNeedNum = function () {
                return this.phaseReward[this.phaseReward.length - 1].needRings;
            };
            ArrowCfg.prototype.getLevelUpList = function () {
                return this.levelList;
            };
            ArrowCfg.prototype.getRankList = function () {
                return this.rankList;
            };
            return ArrowCfg;
        }());
        AcCfg.ArrowCfg = ArrowCfg;
        __reflect(ArrowCfg.prototype, "Config.AcCfg.ArrowCfg");
        var ArrowLevelItemCfg = (function (_super) {
            __extends(ArrowLevelItemCfg, _super);
            function ArrowLevelItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return ArrowLevelItemCfg;
        }(BaseItemCfg));
        AcCfg.ArrowLevelItemCfg = ArrowLevelItemCfg;
        __reflect(ArrowLevelItemCfg.prototype, "Config.AcCfg.ArrowLevelItemCfg");
        var ArrowRankItemCfg = (function (_super) {
            __extends(ArrowRankItemCfg, _super);
            function ArrowRankItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**
                 * 奖励
                 */
                _this.getReward = "";
                return _this;
            }
            Object.defineProperty(ArrowRankItemCfg.prototype, "minRank", {
                get: function () {
                    return this.upper;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ArrowRankItemCfg.prototype, "maxRank", {
                get: function () {
                    return this.lower;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ArrowRankItemCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.getReward, true, false);
                },
                enumerable: true,
                configurable: true
            });
            return ArrowRankItemCfg;
        }(BaseItemCfg));
        AcCfg.ArrowRankItemCfg = ArrowRankItemCfg;
        __reflect(ArrowRankItemCfg.prototype, "Config.AcCfg.ArrowRankItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
