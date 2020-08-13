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
        var MonopolyCfg = (function () {
            function MonopolyCfg() {
                this.diceCycle = 0;
                //骰子周期总格子数范围
                this.diceRange = [];
                //总格子数
                this.diceMaxNum = 20;
                //格子奖励
                this.diceGrid = [];
                //每轮结束的奖励
                this.taskList = [];
                this.turnrewardList = [];
            }
            Object.defineProperty(MonopolyCfg.prototype, "task", {
                get: function () {
                    return this.taskList;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MonopolyCfg.prototype, "turnReward", {
                get: function () {
                    return this.turnrewardList;
                },
                enumerable: true,
                configurable: true
            });
            MonopolyCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        if (key == "task") {
                            this.taskList = [];
                            var i = 0;
                            for (var k in data[key]) {
                                var itemcfg = new MonopolyTaskItemCfg();
                                itemcfg.initData(data[key][k]);
                                itemcfg.id = String(i + 1);
                                this.taskList.push(itemcfg);
                                i++;
                            }
                        }
                        else if (key == "turnReward") {
                            this.turnrewardList = [];
                            var ii = 0;
                            for (var k in data[key]) {
                                var itemcfg = new MonopolyTurnRewardItemCfg();
                                itemcfg.initData(data[key][k]);
                                itemcfg.id = String(ii + 1);
                                this.turnrewardList.push(itemcfg);
                                ii++;
                            }
                        }
                        else {
                            this[key] = data[key];
                        }
                    }
                }
            };
            return MonopolyCfg;
        }());
        AcCfg.MonopolyCfg = MonopolyCfg;
        __reflect(MonopolyCfg.prototype, "Config.AcCfg.MonopolyCfg");
        /**
         * 任务的
         */
        var MonopolyTaskItemCfg = (function (_super) {
            __extends(MonopolyTaskItemCfg, _super);
            function MonopolyTaskItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.openType = null;
                return _this;
            }
            return MonopolyTaskItemCfg;
        }(BaseItemCfg));
        AcCfg.MonopolyTaskItemCfg = MonopolyTaskItemCfg;
        __reflect(MonopolyTaskItemCfg.prototype, "Config.AcCfg.MonopolyTaskItemCfg");
        var MonopolyTurnRewardItemCfg = (function (_super) {
            __extends(MonopolyTurnRewardItemCfg, _super);
            function MonopolyTurnRewardItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return MonopolyTurnRewardItemCfg;
        }(BaseItemCfg));
        AcCfg.MonopolyTurnRewardItemCfg = MonopolyTurnRewardItemCfg;
        __reflect(MonopolyTurnRewardItemCfg.prototype, "Config.AcCfg.MonopolyTurnRewardItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
