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
        var KiteCfg = (function () {
            function KiteCfg() {
                this.extraTime = 0;
                this.corePrize = null;
                this.cost = 0;
                this.transformation = 0;
                this.unitLength = 0;
                this.length = 0;
                this.loopNum = 0;
                this.followingWindNum = 0;
                this.againstWind = 0;
                this.followingWindEffect = 0;
                this.againstWindEffect = 0;
                this.needGemCost = 0;
                this.height = 0;
                this.progressList = [];
                this.qualifyingReward1 = [];
                this.rankReward = [];
                this.rankItemList = [];
                /**
                 活动期间的活跃任务   注：每日不重置
                openType：跳转
                questType：任务类型  特殊类型：1--登录X天   2--累计消耗 X元宝
                value：进度
                getReward：奖励
                */
                this.task = null;
                this.taskList = [];
                this.poolRewards = null;
            }
            /**
             * 初始化数据
             */
            KiteCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "task") {
                        this.taskList = [];
                        for (var k in data[key]) {
                            var itemCfg = new KiteTaskItemCfg();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = String(Number(k) + 1);
                            this.taskList.push(itemCfg);
                        }
                    }
                    else if (key == "progress") {
                        this.progressList = [];
                        for (var k in data[key]) {
                            var itemCfg = new KiteProgressItemCfg();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = Number(k) + 1;
                            this.progressList.push(itemCfg);
                        }
                    }
                    else if (key == "rankReward") {
                        for (var k in data[key]) {
                            var element = data[key][k];
                            var itemCfg = new KiteRankItemCfg();
                            itemCfg.initData(element);
                            itemCfg.id = String(Number(k) + 1);
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
            KiteCfg.prototype.getTaskListById = function (min, max) {
                var length = this.taskList.length;
                var taskList = [];
                for (var i = 0; i < length; i++) {
                    if (min < 4) {
                        if (this.taskList[i].group >= min && this.taskList[i].group <= max) {
                            taskList.push(this.taskList[i]);
                        }
                    }
                }
                return taskList;
            };
            KiteCfg.prototype.getMaxBoxNeedNum = function () {
                return this.progressList[this.progressList.length - 1].need;
            };
            /**
             * 获得任务列表
             */
            KiteCfg.prototype.getTaskList = function () {
                return this.taskList;
            };
            /**
             * 进度列表
             */
            KiteCfg.prototype.getProgressList = function () {
                return this.progressList;
            };
            /**
             * 奖池
             */
            KiteCfg.prototype.getPoolRewards = function () {
                return this.poolRewards;
            };
            return KiteCfg;
        }());
        AcCfg.KiteCfg = KiteCfg;
        __reflect(KiteCfg.prototype, "Config.AcCfg.KiteCfg");
        /**
         * 进度
         */
        var KiteProgressItemCfg = (function (_super) {
            __extends(KiteProgressItemCfg, _super);
            function KiteProgressItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.id = 0;
                _this.sortId = 0;
                _this.need = 0;
                _this.getReward = null;
                return _this;
            }
            return KiteProgressItemCfg;
        }(BaseItemCfg));
        AcCfg.KiteProgressItemCfg = KiteProgressItemCfg;
        __reflect(KiteProgressItemCfg.prototype, "Config.AcCfg.KiteProgressItemCfg");
        /**
         * 任务的
         */
        var KiteTaskItemCfg = (function (_super) {
            __extends(KiteTaskItemCfg, _super);
            function KiteTaskItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.openType = null;
                return _this;
            }
            return KiteTaskItemCfg;
        }(BaseItemCfg));
        AcCfg.KiteTaskItemCfg = KiteTaskItemCfg;
        __reflect(KiteTaskItemCfg.prototype, "Config.AcCfg.KiteTaskItemCfg");
        var KiteRankItemCfg = (function (_super) {
            __extends(KiteRankItemCfg, _super);
            function KiteRankItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**
                 * 排名上下限
                 */
                _this.rank = [];
                _this.getReward = '';
                return _this;
            }
            /**
             * 奖励
             */
            KiteRankItemCfg.prototype.initData = function (data) {
                if (data) {
                    for (var key in data) {
                        this[key] = data[key];
                    }
                }
            };
            Object.defineProperty(KiteRankItemCfg.prototype, "minRank", {
                get: function () {
                    return this.rank[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(KiteRankItemCfg.prototype, "maxRank", {
                get: function () {
                    return this.rank[1];
                },
                enumerable: true,
                configurable: true
            });
            return KiteRankItemCfg;
        }(BaseItemCfg));
        AcCfg.KiteRankItemCfg = KiteRankItemCfg;
        __reflect(KiteRankItemCfg.prototype, "Config.AcCfg.KiteRankItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=KiteCfg.js.map