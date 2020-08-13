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
         * 国庆活动
         *  author yangchengguo
         *  date 2019.9.9
         *  @namespce NationalDayCfg
         */
        var NationalDayCfg = (function () {
            function NationalDayCfg() {
                this.extraTime = 0;
                /**
                 * 充值元宝与特殊道具转化比例，10元宝=1道具
                 */
                this.ratio = 0;
                /**
                 * 连续七天完成t1任务奖励
                 */
                this.show1 = [];
                this.show2 = [];
                this.bigPrize = null;
                this.rechargeList = [];
                this.dailyTaskList = [];
            }
            NationalDayCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "recharge") {
                        this.rechargeList = [];
                        for (var i = 0; i < data[key].length; i++) {
                            var itemArr = [];
                            for (var k in data[key][i]) {
                                var item = new NationalDayRechargeItem();
                                item.initData(data[key][i][k]);
                                item.id = String(k);
                                itemArr.push(item);
                            }
                            var rechargeData = { id: (i + 1), sortId: (i + 1), data: itemArr };
                            this.rechargeList.push(rechargeData);
                        }
                    }
                    else if (key == "dailyTask") {
                        this.dailyTaskList = [];
                        for (var i = 0; i < data[key].length; i++) {
                            var taskArr = [];
                            var count = 0;
                            var taskData = data[key][i];
                            for (var k in taskData) {
                                var item = new NationalDayDailyTaskItem();
                                item.initData(taskData[k]);
                                item.id = String(count + 1);
                                item.sourceId = k;
                                taskArr.push(item);
                                count += 1;
                            }
                            taskArr.sort(function (a, b) { return a.sortId - b.sortId; });
                            for (var kk = 0; kk < taskArr.length; kk++) {
                                taskArr[kk].id = String(Number(kk) + 1);
                            }
                            var dailyTaskData = { id: (i + 1), sortId: (i + 1), data: taskArr };
                            this.dailyTaskList.push(dailyTaskData);
                        }
                    }
                }
            };
            /**充值奖励 */
            NationalDayCfg.prototype.getRechargeList = function () {
                return this.rechargeList;
            };
            /**日常任务 */
            NationalDayCfg.prototype.getDailyTaskList = function () {
                return this.dailyTaskList;
            };
            return NationalDayCfg;
        }());
        AcCfg.NationalDayCfg = NationalDayCfg;
        __reflect(NationalDayCfg.prototype, "Config.AcCfg.NationalDayCfg");
        /**国庆充值奖励 */
        var NationalDayRechargeItem = (function (_super) {
            __extends(NationalDayRechargeItem, _super);
            function NationalDayRechargeItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**排序id */
                _this.sortId = 0;
                return _this;
            }
            return NationalDayRechargeItem;
        }(BaseItemCfg));
        AcCfg.NationalDayRechargeItem = NationalDayRechargeItem;
        __reflect(NationalDayRechargeItem.prototype, "Config.AcCfg.NationalDayRechargeItem");
        /**国庆日常任务 */
        var NationalDayDailyTaskItem = (function (_super) {
            __extends(NationalDayDailyTaskItem, _super);
            function NationalDayDailyTaskItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**排序id */
                _this.sortId = 0;
                return _this;
            }
            return NationalDayDailyTaskItem;
        }(BaseItemCfg));
        AcCfg.NationalDayDailyTaskItem = NationalDayDailyTaskItem;
        __reflect(NationalDayDailyTaskItem.prototype, "Config.AcCfg.NationalDayDailyTaskItem");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=NationalDayCfg.js.map