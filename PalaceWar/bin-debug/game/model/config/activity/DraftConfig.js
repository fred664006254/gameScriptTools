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
         * 美女冲榜配置
         */
        var DraftConfig = (function () {
            function DraftConfig() {
                /**
                 * -玩家消耗鲜花数量奖励（活动期间不重置）
                 --needNum：消耗鲜花数量
                --getReward：奖励
                */
                this.flowerReward = {};
                /**
                 * --消耗鲜花数量全区排名奖励
                 --rank：排行榜上下限  例：{5,10} 第五名至第十名
                --getReward：奖励
                */
                this.crossServerRankList = {};
            }
            DraftConfig.prototype.formatData = function (data) {
                this.ratio1 = data.ratio1;
                this.ratio2 = data.ratio2;
                this.rankNeed = data.rankNeed;
                for (var key in data.flowerReward) {
                    var itemCfg = void 0;
                    if (!this.flowerReward.hasOwnProperty(String(key))) {
                        this.flowerReward[String(key)] = new FlowerRewardItemCfg();
                    }
                    itemCfg = this.flowerReward[String(key)];
                    itemCfg.initData(data.flowerReward[key]);
                    itemCfg.id = String(key);
                }
                for (var key in data.crossServerRankList) {
                    var itemCfg = void 0;
                    if (!this.crossServerRankList.hasOwnProperty(String(key))) {
                        this.crossServerRankList[String(key)] = new crossServerRewardItemCfg();
                    }
                    itemCfg = this.crossServerRankList[String(key)];
                    itemCfg.initData(data.crossServerRankList[key]);
                    itemCfg.id = String(key);
                }
            };
            return DraftConfig;
        }());
        AcCfg.DraftConfig = DraftConfig;
        __reflect(DraftConfig.prototype, "Config.AcCfg.DraftConfig");
        var FlowerRewardItemCfg = (function (_super) {
            __extends(FlowerRewardItemCfg, _super);
            function FlowerRewardItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(FlowerRewardItemCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.getReward, true, false);
                },
                enumerable: true,
                configurable: true
            });
            return FlowerRewardItemCfg;
        }(BaseItemCfg));
        __reflect(FlowerRewardItemCfg.prototype, "FlowerRewardItemCfg");
        var crossServerRewardItemCfg = (function (_super) {
            __extends(crossServerRewardItemCfg, _super);
            function crossServerRewardItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(crossServerRewardItemCfg.prototype, "minRank", {
                get: function () {
                    return this.rank[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(crossServerRewardItemCfg.prototype, "maxRank", {
                get: function () {
                    return this.rank[1];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(crossServerRewardItemCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.getReward, true, true);
                },
                enumerable: true,
                configurable: true
            });
            return crossServerRewardItemCfg;
        }(BaseItemCfg));
        __reflect(crossServerRewardItemCfg.prototype, "crossServerRewardItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=DraftConfig.js.map