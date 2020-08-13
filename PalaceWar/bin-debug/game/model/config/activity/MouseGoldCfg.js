var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        /**
         * 鼠来招财
         * author wxz
         * date 2020.6.30
         * @class MouseGoldCfg
         */
        var MouseGoldCfg = /** @class */ (function () {
            function MouseGoldCfg() {
                this.bigReward = [];
                this.special = [];
                this.achieveList = [];
                this.rankItemList = [];
            }
            MouseGoldCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "achievement") {
                        this.achieveList = [];
                        for (var k in data[key]) {
                            var itemCfg = new MouseGoldAchieveItem();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = Number(k);
                            this.achieveList.push(itemCfg);
                        }
                    }
                    else if (key == "rankReward") {
                        this.rankItemList = [];
                        for (var k in data[key]) {
                            var element = data[key][k];
                            var itemCfg = new MouseGoldRankItemCfg();
                            itemCfg.initData(element);
                            itemCfg.id = Number(k) + 1;
                            this.rankItemList.push(itemCfg);
                        }
                    }
                }
                //pool
                var str = "";
                for (var k in this.pool) {
                    str += this.pool[k][0] + "|";
                }
                this.poolRewards = str.substring(0, str.length - 1);
            };
            MouseGoldCfg.prototype.getAchieveCfg = function () {
                return this.achieveList;
            };
            MouseGoldCfg.prototype.getRankItemCfg = function () {
                return this.rankItemList;
            };
            MouseGoldCfg.prototype.getPoolRewards = function () {
                return this.poolRewards;
            };
            return MouseGoldCfg;
        }());
        AcCfg.MouseGoldCfg = MouseGoldCfg;
        /**进度奖励item */
        var MouseGoldAchieveItem = /** @class */ (function (_super) {
            __extends(MouseGoldAchieveItem, _super);
            function MouseGoldAchieveItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**id */
                _this.id = null;
                /**所需分数 */
                _this.specialnum = 0;
                /**奖励 */
                _this.getReward = null;
                _this.sortId = 0;
                return _this;
            }
            return MouseGoldAchieveItem;
        }(BaseItemCfg));
        AcCfg.MouseGoldAchieveItem = MouseGoldAchieveItem;
        /**
         * 排名奖励
         */
        var MouseGoldRankItemCfg = /** @class */ (function (_super) {
            __extends(MouseGoldRankItemCfg, _super);
            function MouseGoldRankItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.rank = [];
                _this.getReward = '';
                return _this;
            }
            Object.defineProperty(MouseGoldRankItemCfg.prototype, "minRank", {
                get: function () {
                    return this.rank[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MouseGoldRankItemCfg.prototype, "maxRank", {
                get: function () {
                    return this.rank[1];
                },
                enumerable: true,
                configurable: true
            });
            return MouseGoldRankItemCfg;
        }(BaseItemCfg));
        AcCfg.MouseGoldRankItemCfg = MouseGoldRankItemCfg;
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=MouseGoldCfg.js.map