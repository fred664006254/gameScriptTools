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
         * 棋社对弈
         * author ycg
         * date 2020.5.6
         * @namespace CheerCfg
         */
        var CheerCfg = (function () {
            function CheerCfg() {
                this.change = null;
                this.show1 = 0;
                this.show2 = 0;
                this.getReward = null;
                this.poolRewards = null;
                this.achieveList = [];
                this.rechargeList = [];
                this.taskList = [];
                this.long = 0;
                this.weight = 0;
                this.checkerBoard = [];
            }
            CheerCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "chessNum") {
                        for (var k in data[key]) {
                            var item = new CheerAchieveItem();
                            item.initData(data[key][k]);
                            item.id = Number(k) + 1;
                            this.achieveList.push(item);
                        }
                    }
                    else if (key == "chessRecharge") {
                        for (var k in data[key]) {
                            var item = new CheerRechargeItem();
                            item.initData(data[key][k]);
                            item.id = Number(k) + 1;
                            this.rechargeList.push(item);
                        }
                    }
                    else if (key == "chessTask") {
                        for (var k in data[key]) {
                            var taskData = [];
                            for (var i in data[key][k]) {
                                var item = new CheerTaskItem();
                                item.initData(data[key][k][i]);
                                item.id = Number(i);
                                taskData.push(item);
                            }
                            this.taskList.push({ id: Number(k) + 1, data: taskData });
                        }
                    }
                    else if (key == "chessPool") {
                        var str = "";
                        for (var k in data[key]) {
                            str += data[key][k][0] + "|";
                        }
                        this.poolRewards = str.substring(0, str.length - 1);
                    }
                }
            };
            CheerCfg.prototype.getAchieveCfg = function () {
                return this.achieveList;
            };
            CheerCfg.prototype.getRechargeCfg = function () {
                return this.rechargeList;
            };
            CheerCfg.prototype.getTaskCfg = function () {
                return this.taskList;
            };
            CheerCfg.prototype.getPoolRewards = function () {
                return this.poolRewards;
            };
            return CheerCfg;
        }());
        AcCfg.CheerCfg = CheerCfg;
        __reflect(CheerCfg.prototype, "Config.AcCfg.CheerCfg");
        //**进度奖励item */
        var CheerAchieveItem = (function (_super) {
            __extends(CheerAchieveItem, _super);
            function CheerAchieveItem() {
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
            return CheerAchieveItem;
        }(BaseItemCfg));
        AcCfg.CheerAchieveItem = CheerAchieveItem;
        __reflect(CheerAchieveItem.prototype, "Config.AcCfg.CheerAchieveItem");
        /**充值奖励item */
        var CheerRechargeItem = (function (_super) {
            __extends(CheerRechargeItem, _super);
            function CheerRechargeItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**id */
                _this.id = null;
                /**所需额度 */
                _this.needGem = 0;
                /**奖励 */
                _this.getReward = null;
                _this.sortId = 0;
                return _this;
            }
            return CheerRechargeItem;
        }(BaseItemCfg));
        AcCfg.CheerRechargeItem = CheerRechargeItem;
        __reflect(CheerRechargeItem.prototype, "Config.AcCfg.CheerRechargeItem");
        /**任务奖励item */
        var CheerTaskItem = (function (_super) {
            __extends(CheerTaskItem, _super);
            function CheerTaskItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**id */
                _this.id = null;
                _this.openType = null;
                _this.questType = 0;
                _this.value = 0;
                /**奖励 */
                _this.getReward = null;
                _this.sortId = 0;
                return _this;
            }
            return CheerTaskItem;
        }(BaseItemCfg));
        __reflect(CheerTaskItem.prototype, "CheerTaskItem");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=CheerCfg.js.map