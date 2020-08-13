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
        var CostGemRankCfg = (function () {
            function CostGemRankCfg() {
                this.needGemCost = 0;
                this.extraTime = 1;
                this.switch = [];
                this.gemRank = {};
            }
            CostGemRankCfg.prototype.formatData = function (data) {
                this.needGemCost = data.needGemCost;
                this.extraTime = data.extraTime;
                this.switch = data.switch;
                for (var key in data.gemRank) {
                    var itemCfg = void 0;
                    if (!this.gemRank.hasOwnProperty(String(key))) {
                        this.gemRank[String(key)] = new AcCostGemRankItemCfg();
                    }
                    itemCfg = this.gemRank[String(key)];
                    itemCfg.initData(data.gemRank[key]);
                    itemCfg.id = Number(key);
                }
            };
            CostGemRankCfg.prototype.getMaxRank = function () {
                var max = 0;
                var unit = this.gemRank[Object.keys(this.gemRank).length];
                if (unit && unit.rank && unit.rank[1]) {
                    max = unit.rank[1];
                }
                return max;
            };
            CostGemRankCfg.prototype.getTitle = function () {
                var str = "3812";
                // let arr = this.switch[0].split(`title_name`);
                // if(arr[1]){
                //     str = arr[1];
                // }
                return str;
            };
            return CostGemRankCfg;
        }());
        AcCfg.CostGemRankCfg = CostGemRankCfg;
        __reflect(CostGemRankCfg.prototype, "Config.AcCfg.CostGemRankCfg");
        // --rank:排名
        //--getReward:奖励
        var AcCostGemRankItemCfg = (function (_super) {
            __extends(AcCostGemRankItemCfg, _super);
            function AcCostGemRankItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(AcCostGemRankItemCfg.prototype, "minRank", {
                get: function () {
                    return this.rank[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AcCostGemRankItemCfg.prototype, "maxRank", {
                get: function () {
                    return this.rank[1];
                },
                enumerable: true,
                configurable: true
            });
            return AcCostGemRankItemCfg;
        }(BaseItemCfg));
        AcCfg.AcCostGemRankItemCfg = AcCostGemRankItemCfg;
        __reflect(AcCostGemRankItemCfg.prototype, "Config.AcCfg.AcCostGemRankItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=CostGemRankCfg.js.map