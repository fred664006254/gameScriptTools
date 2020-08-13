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
        var ChristmasCfg = (function () {
            function ChristmasCfg() {
                this.taskItemListCfg = [];
            }
            /**
             * 初始化数据
             */
            ChristmasCfg.prototype.formatData = function (data) {
                this.taskItemListCfg.length = 0;
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "allTask") {
                        for (var index in data[key]) {
                            var itemCfg = new ChristmasTaskItemCfg();
                            itemCfg.initData(data[key][index]);
                            itemCfg.id = String(Number(index) + 1);
                            this.taskItemListCfg.push(itemCfg);
                        }
                    }
                }
            };
            /**消耗星星的数量 */
            ChristmasCfg.prototype.getFloorStarNum = function (type) {
                switch (type) {
                    case "1":
                        return Object.keys(this.firstFloor).length;
                    case "2":
                        return Object.keys(this.secondFloor).length;
                    case "3":
                        return Object.keys(this.thirdFloor).length;
                }
                return 0;
            };
            /** 层数的cost */
            ChristmasCfg.prototype.getFloorCost = function (type) {
                switch (type) {
                    case "1":
                        return this.cost[0];
                    case "2":
                        return this.cost[1];
                    case "3":
                        return this.cost[2];
                    case "4":
                        return this.cost2;
                }
                return 0;
            };
            /**
             * 每层发光的奖励
             */
            ChristmasCfg.prototype.getLightFloorRewardList = function (type) {
                var floorRewardList = this.getFloorRewardList(type);
                var lightFloorRewardList = [];
                for (var key in floorRewardList) {
                    if (floorRewardList[key].isLight) {
                        lightFloorRewardList.push(floorRewardList[key]);
                    }
                }
                return lightFloorRewardList;
            };
            /**
             * 每层的奖励
             */
            ChristmasCfg.prototype.getFloorRewardList = function (type) {
                switch (type) {
                    case "1":
                        return this.initFloorReward(this.firstFloor);
                    case "2":
                        return this.initFloorReward(this.secondFloor);
                    case "3":
                        return this.initFloorReward(this.thirdFloor);
                    case "4":
                        return this.initFloorReward(this.finalFloor);
                }
                return null;
            };
            /**
             * 每层的奖励
             */
            ChristmasCfg.prototype.getFloorRewardPoolList = function (type) {
                switch (type) {
                    case "1":
                        return this.initFloorReward(this.firstFloor);
                    case "2":
                        return this.initFloorReward(this.secondFloor);
                    case "3":
                        return this.initFloorReward(this.thirdFloor);
                    case "4":
                        return this.initFloorReward(this.infinityFloor);
                }
                return null;
            };
            /**
             * 第一层奖励
             */
            ChristmasCfg.prototype.initFloorReward = function (flool) {
                var floorRewardList = [];
                for (var key in flool) {
                    var isLight = flool[key][2] == 1 ? true : false;
                    var floorReward = { id: String(Number(key) + 1), reward: flool[key][0], weight: flool[key][1], isLight: isLight };
                    floorRewardList.push(floorReward);
                }
                return floorRewardList;
            };
            /**
             * 任务的cfg
             */
            ChristmasCfg.prototype.getTaskCfg = function () {
                return this.taskItemListCfg;
            };
            /**
             * 任务的Id cfg
             */
            ChristmasCfg.prototype.getTaksCfgId = function (taskId) {
                for (var key in this.taskItemListCfg) {
                    if (this.taskItemListCfg[key].id == taskId) {
                        return this.taskItemListCfg[key];
                    }
                }
                return null;
            };
            return ChristmasCfg;
        }());
        AcCfg.ChristmasCfg = ChristmasCfg;
        __reflect(ChristmasCfg.prototype, "Config.AcCfg.ChristmasCfg");
        var ChristmasTaskItemCfg = (function (_super) {
            __extends(ChristmasTaskItemCfg, _super);
            function ChristmasTaskItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /** id */
                _this.id = null;
                /** 跳转 */
                _this.openType = null;
                /** 任务类型 */
                _this.questType = null;
                /** 进度 */
                _this.value = 0;
                /** 奖励装饰物 X 个 */
                _this.specialReward = 0;
                /** 奖励 */
                _this.getReward5 = null;
                /**排序id */
                _this.sortId = null;
                return _this;
            }
            return ChristmasTaskItemCfg;
        }(BaseItemCfg));
        AcCfg.ChristmasTaskItemCfg = ChristmasTaskItemCfg;
        __reflect(ChristmasTaskItemCfg.prototype, "Config.AcCfg.ChristmasTaskItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=ChristmasCfg.js.map