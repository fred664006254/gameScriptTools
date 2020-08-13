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
        var RankActiveCfg = (function () {
            function RankActiveCfg() {
                this.rankList = {};
                //是否跨服  1：跨服，活动结束后产出跨服资格  0：不跨服 
                this.isCross = 0;
                this.crossServerType = "";
                this.rankLength = 0;
            }
            RankActiveCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    if (key == "rankList") {
                        for (var rankKey in data[key]) {
                            var itemCfg = void 0;
                            if (!this.rankList.hasOwnProperty(String(rankKey))) {
                                this.rankList[String(rankKey)] = new RankActiveItemCfg();
                            }
                            itemCfg = this.rankList[String(rankKey)];
                            itemCfg.initData(data[key][rankKey]);
                            itemCfg.id = String(rankKey);
                        }
                    }
                    else {
                        this[key] = data[key];
                    }
                }
            };
            RankActiveCfg.prototype.getRankList = function () {
                return this.rankList;
            };
            RankActiveCfg.prototype.getRankLength = function () {
                if (this.rankLength > 0) {
                    // console.log("return rankLength...");
                    return this.rankLength;
                }
                // console.log("sum ranklength...");
                var l = 0;
                for (var key in this.rankList) {
                    l++;
                }
                this.rankLength = l;
                return this.rankLength;
            };
            RankActiveCfg.prototype.getMaxRangValue = function () {
                var lastKList = Object.keys(this.rankList);
                return this.rankList[lastKList[lastKList.length - 1]].rank[1];
            };
            Object.defineProperty(RankActiveCfg.prototype, "helpInfo", {
                get: function () {
                    var helpStr = undefined;
                    if (this.type == 11) {
                        helpStr = "acRankActive-" + this.type + "_Desc";
                    }
                    if (Api.switchVoApi.checkOpenAllianceRankNewRule()) {
                        if (LanguageManager.checkHasKey("acrankactive-" + this.type + "-RuleInfo_newRule")) {
                            helpStr = "acrankactive-" + this.type + "-RuleInfo_newRule";
                        }
                    }
                    else {
                        if (LanguageManager.checkHasKey("acrankactive-" + this.type + "-RuleInfo")) {
                            helpStr = "acrankactive-" + this.type + "-RuleInfo";
                        }
                    }
                    return helpStr;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RankActiveCfg.prototype, "titleType", {
                get: function () {
                    return this.title ? Config.TitleCfg.getTitleCfgById(this.title).titleType : 0;
                },
                enumerable: true,
                configurable: true
            });
            return RankActiveCfg;
        }());
        AcCfg.RankActiveCfg = RankActiveCfg;
        __reflect(RankActiveCfg.prototype, "Config.AcCfg.RankActiveCfg");
        var RankActiveItemCfg = (function (_super) {
            __extends(RankActiveItemCfg, _super);
            function RankActiveItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**
                 * 奖励
                 */
                _this.reward = "";
                _this.reward1 = "";
                return _this;
            }
            Object.defineProperty(RankActiveItemCfg.prototype, "minRank", {
                get: function () {
                    return this.rank[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RankActiveItemCfg.prototype, "maxRank", {
                get: function () {
                    return this.rank[1];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RankActiveItemCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.reward, true, false);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RankActiveItemCfg.prototype, "reward1Icons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.reward1, true, false);
                },
                enumerable: true,
                configurable: true
            });
            RankActiveItemCfg.prototype.getRewardTitle = function () {
                var title = null;
                var rewardsArr = GameData.formatRewardItem(this.reward);
                for (var i = 0; i < rewardsArr.length; i++) {
                    if (rewardsArr[i].type == 11) {
                        title = String(rewardsArr[i].id);
                        break;
                    }
                }
                return title;
            };
            RankActiveItemCfg.prototype.getReward1Title = function () {
                var title = null;
                var rewardsArr = GameData.formatRewardItem(this.reward1);
                for (var i = 0; i < rewardsArr.length; i++) {
                    if (rewardsArr[i].type == 11) {
                        title = String(rewardsArr[i].id);
                        break;
                    }
                }
                return title;
            };
            return RankActiveItemCfg;
        }(BaseItemCfg));
        AcCfg.RankActiveItemCfg = RankActiveItemCfg;
        __reflect(RankActiveItemCfg.prototype, "Config.AcCfg.RankActiveItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
