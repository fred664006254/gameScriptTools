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
/**
 * 每日任务api
 * author yanyuling
 * date 2017/10/27
 * @class DailyTaskVoApi
 */
var DailytaskVoApi = (function (_super) {
    __extends(DailytaskVoApi, _super);
    function DailytaskVoApi() {
        return _super.call(this) || this;
    }
    /**
     *
     * 根据任务id，读取任务的当前进度信息
     */
    DailytaskVoApi.prototype.getTaskFandVByTaskId = function (taskId) {
        return this.dailytaskVo.dailyTaskList[taskId];
    };
    /**
     *
     * @param taskId 读取指定任务id的状态 0未完成 1已完成 2已领取
     */
    DailytaskVoApi.prototype.getTaskStatusByTaskId = function (taskId) {
        if (this.dailytaskVo.dailyTaskList[taskId]) {
            return this.dailytaskVo.dailyTaskList[taskId].task_f;
        }
        return 0;
    };
    /**
     *
     * @param rewardId 读取指定奖励id的状态 1未完成 2可领取 3已领取
     */
    DailytaskVoApi.prototype.getTaskRewardStatusByRewardId = function (rewardId) {
        return this.dailytaskVo.rewards[rewardId];
    };
    /**
     * 获取当前活跃度
     */
    DailytaskVoApi.prototype.getCurLivenessValue = function () {
        return this.dailytaskVo.liveness;
    };
    /**
     * 获取当前奖励
     */
    DailytaskVoApi.prototype.getCurRewards = function () {
        return this.dailytaskVo.rewards;
    };
    DailytaskVoApi.prototype.getTaskIdListAfterSort = function () {
        var keys = Config.DailytaskCfg.getTasksIdList();
        if (Api.switchVoApi.checkTWShenhe()) {
            var idx = 0;
            for (var i in keys) {
                if (keys[i] == "14") {
                    keys.splice(Number(i) + idx, 1);
                }
            }
        }
        //审核服下益玩大平台特殊处理
        if (PlatformManager.checkIsShenHeYiWan() || Api.switchVoApi.checkTWShenhe() || Api.switchVoApi.checkClosePay()) {
            var delete_arr = ['13', '14'];
            for (var _i = 0, delete_arr_1 = delete_arr; _i < delete_arr_1.length; _i++) {
                var id = delete_arr_1[_i];
                var idx = keys.indexOf(id);
                if (idx > -1) {
                    keys.splice(idx, 1);
                }
            }
        }
        if (PlatformManager.checkHideIconByIP()) {
            var isBuyMonthCard = Api.shopVoApi.ifBuyMonthCard();
            if (!isBuyMonthCard) {
                var idx = keys.indexOf("13");
                if (idx > -1) {
                    keys.splice(idx, 1);
                }
            }
            var isBuyYearCard = Api.shopVoApi.ifBuyYearCard();
            if (!isBuyYearCard) {
                var idx = keys.indexOf("14");
                if (idx > -1) {
                    keys.splice(idx, 1);
                }
            }
        }
        //群芳会屏蔽
        if (Api.switchVoApi.checkOpenWifeBattle() && Api.wifebattleVoApi.checkCanJoin()) {
        }
        else {
            var idx = 0;
            for (var i in keys) {
                if (keys[i] == "22") {
                    keys.splice(Number(i) + idx, 1);
                }
            }
        }
        var list1 = [];
        var list2 = [];
        var list3 = [];
        for (var index = 0; index < keys.length; index++) {
            var status_1 = this.getTaskStatusByTaskId(keys[index]);
            if (status_1 == 1) {
                list1.push(keys[index]);
            }
            else if (status_1 == 2) {
                list3.push(keys[index]);
            }
            else {
                list2.push(keys[index]);
            }
        }
        return list1.concat(list2).concat(list3);
    };
    DailytaskVoApi.prototype.getTaskIdForMainTaskUI = function () {
        var idList = this.getTaskIdListAfterSort();
        var statdIdx = 0;
        while ((idList[statdIdx] == "13" || idList[statdIdx] == "14") || this.getTaskRewardStatusByRewardId(idList[statdIdx]) == 3) {
            statdIdx++;
        }
        var stat = this.getTaskStatusByTaskId(idList[statdIdx]) || 0;
        // let reward = this.getTaskRewardStatusByRewardId(idList[statdIdx]) ;
        if (stat == 2) {
            return null;
        }
        return idList[statdIdx];
        // return LanguageManager.getlocal("dailyTaskName"+ id);
    };
    DailytaskVoApi.prototype.checkRedPoint = function () {
        for (var key in this.dailytaskVo.dailyTaskList) {
            if (this.dailytaskVo.dailyTaskList[key].task_f == 1) {
                return true;
            }
        }
        var rewardList = Config.DailytaskCfg.getDailyRewardsList();
        for (var key_1 in rewardList) {
            if (Object.prototype.hasOwnProperty.call(rewardList, key_1)) {
                if (this.getBoxStatusById(key_1) == 2) {
                    return true;
                }
            }
        }
        return false;
    };
    DailytaskVoApi.prototype.getBoxStatusById = function (boxId) {
        var tmpRew = Config.DailytaskCfg.getDailyRewardsCfgByRewardId(boxId);
        var rStatus = 1;
        if (Api.dailytaskVoApi.getTaskRewardStatusByRewardId(boxId)) {
            rStatus = 3;
        }
        else {
            if (tmpRew.needLiveness <= Api.dailytaskVoApi.getCurLivenessValue())
                rStatus = 2;
        }
        return rStatus;
    };
    DailytaskVoApi.prototype.go = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.DAILYTASKVIEW);
    };
    DailytaskVoApi.prototype.dispose = function () {
        this.dailytaskVo = null;
        _super.prototype.dispose.call(this);
    };
    return DailytaskVoApi;
}(BaseVoApi));
__reflect(DailytaskVoApi.prototype, "DailytaskVoApi");
