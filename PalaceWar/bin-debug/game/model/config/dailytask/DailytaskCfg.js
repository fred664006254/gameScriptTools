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
    var DailytaskCfg;
    (function (DailytaskCfg) {
        var dailyTaskList = {};
        var dailyRewardsList = {};
        function formatData(data) {
            for (var key in data.task) {
                var itemCfg = void 0;
                if (!dailyTaskList.hasOwnProperty(String(key))) {
                    dailyTaskList[String(key)] = new DailytaskItemCfg();
                }
                itemCfg = dailyTaskList[String(key)];
                itemCfg.initData(data.task[key]);
                itemCfg.taskId = String(key);
            }
            for (var key in data.rewards) {
                var itemCfg = void 0;
                if (!dailyRewardsList.hasOwnProperty(String(key))) {
                    dailyRewardsList[String(key)] = new DailyRewardsItemCfg();
                }
                itemCfg = dailyRewardsList[String(key)];
                itemCfg.initData(data.rewards[key]);
                itemCfg.id = String(key);
            }
        }
        DailytaskCfg.formatData = formatData;
        function getDailytaskCfgByTaskId(taskId) {
            return dailyTaskList[taskId];
        }
        DailytaskCfg.getDailytaskCfgByTaskId = getDailytaskCfgByTaskId;
        function getTasksIdList() {
            var resultTab = [];
            for (var key in dailyTaskList) {
                var openType = dailyTaskList[key].openType;
                if (Api.switchVoApi.checkOpenShenhe() && (openType == "rank" || openType == "alliance")) {
                    continue;
                }
                if (openType == "trade" && !Api.switchVoApi.checkOpenTrade()) {
                    continue;
                }
                if (openType == "conquest" && !Api.switchVoApi.checkOpenConquest()) {
                    continue;
                }
                resultTab.push(key);
            }
            return resultTab;
        }
        DailytaskCfg.getTasksIdList = getTasksIdList;
        function getDailyRewardsList() {
            return dailyRewardsList;
        }
        DailytaskCfg.getDailyRewardsList = getDailyRewardsList;
        function getDailyRewardsCfgByRewardId(rewardId) {
            return dailyRewardsList[rewardId];
        }
        DailytaskCfg.getDailyRewardsCfgByRewardId = getDailyRewardsCfgByRewardId;
    })(DailytaskCfg = Config.DailytaskCfg || (Config.DailytaskCfg = {}));
    var DailytaskItemCfg = (function (_super) {
        __extends(DailytaskItemCfg, _super);
        function DailytaskItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return DailytaskItemCfg;
    }(BaseItemCfg));
    __reflect(DailytaskItemCfg.prototype, "DailytaskItemCfg");
    var DailyRewardsItemCfg = (function (_super) {
        __extends(DailyRewardsItemCfg, _super);
        function DailyRewardsItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return DailyRewardsItemCfg;
    }(BaseItemCfg));
    __reflect(DailyRewardsItemCfg.prototype, "DailyRewardsItemCfg");
})(Config || (Config = {}));
//# sourceMappingURL=DailytaskCfg.js.map