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
        var LotusCfg = (function () {
            function LotusCfg() {
                this.extraTime = 0;
                this.show = 0;
                this.freeTime = 0;
                this.needGem = 0;
                this.consume = 0;
                this.addProcess = 0;
                this.loopNum = 0;
                this.critical = {};
                this.exchange = {};
                this.needTimes = 0;
                this.rankItemList = [];
                this.achieveList = [];
                this.poolRewards = null;
            }
            /**
             * 初始化数据
             */
            LotusCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "achievement") {
                        this.achieveList = [];
                        for (var k in data[key]) {
                            var itemCfg = new LotusAchieveItemCfg();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = Number(k);
                            this.achieveList.push(itemCfg);
                        }
                    }
                    else if (key == "rankReward") {
                        this.rankItemList = [];
                        for (var k in data[key]) {
                            var element = data[key][k];
                            var itemCfg = new LotusRankItemCfg();
                            itemCfg.initData(element);
                            itemCfg.id = Number(k);
                            this.rankItemList.push(itemCfg);
                        }
                    }
                    else if (key == "pool") {
                        var str = "";
                        for (var k in data[key]) {
                            str += data[key][k][0] + "|";
                        }
                        this.poolRewards = str.substring(0, str.length - 1);
                    }
                }
            };
            /**
             * 进度列表
             */
            LotusCfg.prototype.getAchieveList = function () {
                return this.achieveList;
            };
            /**
             * 奖池
             */
            LotusCfg.prototype.getPoolRewards = function () {
                return this.poolRewards;
            };
            /**
             * 排名奖励
             */
            LotusCfg.prototype.getRankItemList = function () {
                return this.rankItemList;
            };
            return LotusCfg;
        }());
        AcCfg.LotusCfg = LotusCfg;
        __reflect(LotusCfg.prototype, "Config.AcCfg.LotusCfg");
        /**
         * 进度
         */
        var LotusAchieveItemCfg = (function (_super) {
            __extends(LotusAchieveItemCfg, _super);
            function LotusAchieveItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.id = 0;
                _this.sortId = 0;
                _this.specialnum = 0;
                _this.getReward = null;
                return _this;
            }
            return LotusAchieveItemCfg;
        }(BaseItemCfg));
        AcCfg.LotusAchieveItemCfg = LotusAchieveItemCfg;
        __reflect(LotusAchieveItemCfg.prototype, "Config.AcCfg.LotusAchieveItemCfg");
        /**
         * 排名奖励
         */
        var LotusRankItemCfg = (function (_super) {
            __extends(LotusRankItemCfg, _super);
            function LotusRankItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.rank = [];
                _this.getReward = '';
                return _this;
            }
            Object.defineProperty(LotusRankItemCfg.prototype, "minRank", {
                /**
                 * 奖励
                 */
                // public initData(data:any):void
                // {
                //     if(data)
                //     {
                //         for(var key in data)
                //         {
                // 			this[key]=data[key];
                // 		}
                //     }
                // }
                get: function () {
                    return this.rank[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LotusRankItemCfg.prototype, "maxRank", {
                get: function () {
                    return this.rank[1];
                },
                enumerable: true,
                configurable: true
            });
            return LotusRankItemCfg;
        }(BaseItemCfg));
        AcCfg.LotusRankItemCfg = LotusRankItemCfg;
        __reflect(LotusRankItemCfg.prototype, "Config.AcCfg.LotusRankItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=LotusCfg.js.map