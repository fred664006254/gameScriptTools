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
         * 鼠来如意
         * author ycg
         * date 2020.6.1
         * @class MouseComeCfg
         */
        var MouseComeCfg = (function () {
            function MouseComeCfg() {
                this.bigReward = [];
                this.achieveList = [];
                this.rankItemList = [];
            }
            MouseComeCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "mouseNum") {
                        this.achieveList = [];
                        for (var k in data[key]) {
                            var itemCfg = new MouseComeAchieveItem();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = Number(k) + 1;
                            this.achieveList.push(itemCfg);
                        }
                    }
                    else if (key == "rankReward") {
                        this.rankItemList = [];
                        for (var k in data[key]) {
                            var element = data[key][k];
                            var itemCfg = new MouseComeRankItemCfg();
                            itemCfg.initData(element);
                            itemCfg.id = Number(k) + 1;
                            this.rankItemList.push(itemCfg);
                        }
                    }
                }
                //pool
                var str = "";
                for (var k in this.mousePool) {
                    str += this.mousePool[k][0] + "|";
                }
                this.poolRewards = str.substring(0, str.length - 1);
            };
            MouseComeCfg.prototype.getAchieveCfg = function () {
                return this.achieveList;
            };
            MouseComeCfg.prototype.getRankItemCfg = function () {
                return this.rankItemList;
            };
            MouseComeCfg.prototype.getPoolRewards = function () {
                return this.poolRewards;
            };
            return MouseComeCfg;
        }());
        AcCfg.MouseComeCfg = MouseComeCfg;
        __reflect(MouseComeCfg.prototype, "Config.AcCfg.MouseComeCfg");
        /**进度奖励item */
        var MouseComeAchieveItem = (function (_super) {
            __extends(MouseComeAchieveItem, _super);
            function MouseComeAchieveItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**id */
                _this.id = null;
                /**所需分数 */
                _this.needNum = 0;
                /**奖励 */
                _this.getReward = null;
                _this.sortId = 0;
                return _this;
            }
            return MouseComeAchieveItem;
        }(BaseItemCfg));
        AcCfg.MouseComeAchieveItem = MouseComeAchieveItem;
        __reflect(MouseComeAchieveItem.prototype, "Config.AcCfg.MouseComeAchieveItem");
        /**
         * 排名奖励
         */
        var MouseComeRankItemCfg = (function (_super) {
            __extends(MouseComeRankItemCfg, _super);
            function MouseComeRankItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.rank = [];
                _this.getReward = '';
                return _this;
            }
            Object.defineProperty(MouseComeRankItemCfg.prototype, "minRank", {
                get: function () {
                    return this.rank[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MouseComeRankItemCfg.prototype, "maxRank", {
                get: function () {
                    return this.rank[1];
                },
                enumerable: true,
                configurable: true
            });
            return MouseComeRankItemCfg;
        }(BaseItemCfg));
        AcCfg.MouseComeRankItemCfg = MouseComeRankItemCfg;
        __reflect(MouseComeRankItemCfg.prototype, "Config.AcCfg.MouseComeRankItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=MouseComeCfg.js.map