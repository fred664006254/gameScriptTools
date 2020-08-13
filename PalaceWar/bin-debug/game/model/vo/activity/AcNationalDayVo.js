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
 * 国庆活动
 * date 2019.9.9
 * author yangchengguo
 * @class AcNationalDayVo
 */
var AcNationalDayVo = (function (_super) {
    __extends(AcNationalDayVo, _super);
    function AcNationalDayVo() {
        return _super.call(this) || this;
    }
    AcNationalDayVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    //当前第几天
    AcNationalDayVo.prototype.getDay = function () {
        return this.diffday;
    };
    /**充值奖励处理 */
    //充值元宝数
    AcNationalDayVo.prototype.getChargeNum = function () {
        if (this.crackerNum) {
            return this.crackerNum;
        }
        return 0;
    };
    //是否已领取充值奖励
    AcNationalDayVo.prototype.isGetRechargeById = function (id) {
        if (this.rinfo && this.rinfo[id]) {
            return true;
        }
        return false;
    };
    AcNationalDayVo.prototype.getCanRewardItemData = function () {
        var data = this.getSortRechargeCfg();
        for (var i = 0; i < data.length; i++) {
            var chargeData = data[i].data;
            for (var k = 0; k < chargeData.length; k++) {
                if (!this.isGetRechargeById(chargeData[k].id) && this.crackerNum >= chargeData[k].needItem) {
                    return { index: i, chargeIndex: k };
                }
            }
            for (var k = 0; k < chargeData.length; k++) {
                if (!this.isGetRechargeById(chargeData[k].id)) {
                    return { index: i, chargeIndex: k };
                }
            }
        }
        return { index: 0, chargeIndex: 0 };
    };
    //充值的组奖励是否领取
    AcNationalDayVo.prototype.isGetRechargeGroupById = function (id) {
        var data = this.cfg.getRechargeList();
        var rechargeData = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i].id == Number(id)) {
                rechargeData = data[i].data;
                break;
            }
        }
        for (var i = 0; i < rechargeData.length; i++) {
            if (!this.isGetRechargeById(rechargeData[i].id)) {
                return false;
            }
        }
        return true;
    };
    //获得充值奖励的配置
    AcNationalDayVo.prototype.getSortRechargeCfg = function () {
        var rechargeData = this.cfg.getRechargeList();
        for (var i = 0; i < rechargeData.length; i++) {
            if (this.isGetRechargeGroupById(rechargeData[i].id)) {
                rechargeData[i].sortId = rechargeData.length + Number(rechargeData[i].id);
            }
            else {
                rechargeData[i].sortId = Number(rechargeData[i].id);
            }
        }
        rechargeData.sort(function (a, b) { return a.sortId - b.sortId; });
        return rechargeData;
    };
    //是否显示充值奖励红点
    AcNationalDayVo.prototype.isShowChargeRewardRedDot = function () {
        var rechargeData = this.cfg.getRechargeList();
        for (var i = 0; i < rechargeData.length; i++) {
            var data = rechargeData[i].data;
            for (var k = 0; k < data.length; k++) {
                if (this.isGetRechargeById(data[k].id) == false && this.getChargeNum() >= data[k].needItem) {
                    return true;
                }
            }
        }
        return false;
    };
    /**任务进度处理 */
    //任务完成数量 需增加当前天数判断
    AcNationalDayVo.prototype.getDayTaskData = function (day) {
        if (this.taskinfo && this.taskinfo[day]) {
            return this.taskinfo[day];
        }
        return null;
    };
    //任务完成数量
    AcNationalDayVo.prototype.getTaskNumByType = function (day, type) {
        var data = this.getDayTaskData(day);
        if (data && data[type]) {
            return data[type].v;
        }
        return 0;
    };
    //任务是否已领奖
    AcNationalDayVo.prototype.isGetTaskById = function (day, type) {
        var data = this.getDayTaskData(day);
        if (data) {
            if (data[type] && data[type].flag && data[type].flag == 2) {
                return true;
            }
        }
        return false;
    };
    //任务完成状态 0 未完成  1完成 2已领取
    AcNationalDayVo.prototype.getTaskCompleteStatus = function (day, type) {
        var data = this.getDayTaskData(day);
        if (data) {
            if (data[type] && data[type].flag) {
                return data[type].flag;
            }
        }
        return 0;
    };
    //获取某一天是否有奖励可领取
    AcNationalDayVo.prototype.isCanGetTaskRewardByDay = function (day) {
        var taskData = this.getTaskCfgById(day);
        if (!taskData) {
            return false;
        }
        for (var i = 0; i < taskData.length; i++) {
            if (this.getTaskCompleteStatus(day, taskData[i].questType) == 1) {
                return true;
            }
        }
        return false;
    };
    //任务
    AcNationalDayVo.prototype.getTaskCfgById = function (id) {
        var data = this.cfg.getDailyTaskList();
        for (var i = 0; i < data.length; i++) {
            if (data[i].id == Number(id)) {
                return data[i].data;
            }
        }
        return null;
    };
    //是否显示任务奖励红点 
    AcNationalDayVo.prototype.isShowTaskRewardRedDot = function () {
        var dataList = this.cfg.getDailyTaskList();
        for (var i = 0; i < dataList.length; i++) {
            var taskData = dataList[i].data;
            for (var k = 0; k < taskData.length; k++) {
                var status_1 = this.getTaskCompleteStatus(i + 1, taskData[k].questType);
                if (status_1 == 1) {
                    return true;
                }
            }
        }
        return false;
    };
    //七日奖励进度
    AcNationalDayVo.prototype.isCompleteDailyTask = function (id) {
        var data = this.cfg.getDailyTaskList();
        var taskData = data[Number(id) - 1].data[0];
        var status = this.getTaskCompleteStatus(id, taskData.questType);
        if (status > 0) {
            return true;
        }
        return false;
    };
    AcNationalDayVo.prototype.isGetSevenReward = function () {
        if (this.rinfo && this.rinfo.bigPrize && this.rinfo.bigPrize == 1) {
            return true;
        }
        return false;
    };
    //是否可领取七日奖励
    AcNationalDayVo.prototype.isCanGetSevenReward = function () {
        for (var i = 0; i < 7; i++) {
            if (!this.isCompleteDailyTask(i + 1)) {
                return false;
            }
        }
        return true;
    };
    //是否显示任务红点
    AcNationalDayVo.prototype.isShowTaskRedDot = function () {
        return this.isShowDailyChargeRedDot() || this.isShowTaskRewardRedDot() || (this.isCanGetSevenReward() && !this.isGetSevenReward());
    };
    Object.defineProperty(AcNationalDayVo.prototype, "isShowRedDot", {
        //小红点
        get: function () {
            return this.isShowTaskRedDot() || this.isShowChargeRewardRedDot();
        },
        enumerable: true,
        configurable: true
    });
    //是否为第一次进入活动
    AcNationalDayVo.prototype.isFirstInView = function () {
        var key = "" + this.aid + this.code + Api.playerVoApi.getPlayerID();
        var value = LocalStorageManager.get(key);
        if (value) {
            if (Number(value) == this.et) {
                return false;
            }
            else {
                LocalStorageManager.set(key, String(this.et));
                return true;
            }
        }
        else {
            LocalStorageManager.set(key, String(this.et));
            return true;
        }
    };
    //是否点击过每天的充值任务
    AcNationalDayVo.prototype.isClickedDailyCharge = function () {
        var day = this.getDay();
        if (day > 7) {
            return true;
        }
        var key = this.aid + this.code + Api.playerVoApi.getPlayerID() + "day" + this.et + day;
        var value = LocalStorageManager.get(key);
        if (value) {
            return true;
        }
        return false;
    };
    //设置每日点击充值任务
    AcNationalDayVo.prototype.setClickedDailyCharge = function () {
        var day = this.getDay();
        var key = this.aid + this.code + Api.playerVoApi.getPlayerID() + "day" + this.et + day;
        LocalStorageManager.set(key, String(this.et));
    };
    //是否显示每日充值任务点击红点
    AcNationalDayVo.prototype.isShowDailyChargeRedDot = function () {
        var day = this.getDay();
        var data = this.getTaskCfgById(day);
        if (!data) {
            return false;
        }
        if (!this.isInActivity()) {
            return false;
        }
        var status = this.getTaskCompleteStatus(day, data[0].questType);
        if (!this.isClickedDailyCharge() && status == 0) {
            return true;
        }
        return false;
    };
    //倒计时
    AcNationalDayVo.prototype.getCountDown = function () {
        var et = this.et - this.cfg.extraTime * 86400;
        if (et < GameData.serverTime) {
            return LanguageManager.getlocal("acPunishEnd");
        }
        return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
    };
    //是否在活动期间 不包括展示期
    AcNationalDayVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
    };
    Object.defineProperty(AcNationalDayVo.prototype, "acTimeAndHour", {
        //活动日期时间显示
        get: function () {
            var et = this.et - 86400 * this.cfg.extraTime;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNationalDayVo.prototype, "cfg", {
        //活动配置
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    return AcNationalDayVo;
}(AcBaseVo));
__reflect(AcNationalDayVo.prototype, "AcNationalDayVo");
//# sourceMappingURL=AcNationalDayVo.js.map