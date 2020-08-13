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
 * 女优活动4 依生依世
 * author ycg
 * date 2019.10.28
 * @class AcCourtDutyVo
 */
var AcCourtDutyVo = (function (_super) {
    __extends(AcCourtDutyVo, _super);
    function AcCourtDutyVo() {
        return _super.call(this) || this;
    }
    AcCourtDutyVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    AcCourtDutyVo.prototype.getRechargeNum = function () {
        if (this.v) {
            return this.v;
        }
        return 0;
    };
    //当前任务完成情况
    AcCourtDutyVo.prototype.getYaMenTaskCurrNum = function (id, type) {
        if (this.task && this.task[type]) {
            return this.task[type];
        }
        return 0;
    };
    //是否领取当前任务
    AcCourtDutyVo.prototype.isGetYaMenTaskById = function (day, id) {
        var key = "yaMenTask";
        if (this.flags && this.flags[key] && this.flags[key][day] && this.flags[key][day][id]) {
            return true;
        }
        return false;
    };
    //当前皇榜任务完成情况
    AcCourtDutyVo.prototype.getHuangBangTaskCurrNum = function (id, type) {
        if (this.task && this.task[type]) {
            return this.task[type];
        }
        return 0;
    };
    //是否领取皇榜当前任务
    AcCourtDutyVo.prototype.isGetHuangBangTaskById = function (day, id) {
        var key = "huangBangTask";
        if (this.flags && this.flags[key] && this.flags[key][day] && this.flags[key][day][id]) {
            return true;
        }
        return false;
    };
    AcCourtDutyVo.prototype.getCurrDay = function () {
        return this.diffday;
    };
    // public getYaMenTaskCfgById(id:string|number):any{
    //     let data = this.cfg.getYaMenTaskList();
    //     for (let i = 0; i < data.length; i++){
    //         if (data[i].id == Number(id)){
    //             return data[i];
    //         }
    //     }
    // }
    //衙门cfg
    AcCourtDutyVo.prototype.getSortYaMenTaskCfg = function () {
        var data = this.cfg.getYaMenTaskList();
        var currDay = this.getCurrDay();
        for (var i = 0; i < data.length; i++) {
            if (currDay >= Number(data[i].taskId) && this.isGetYaMenTaskById(data[i].taskId, data[i].rKey)) {
                data[i].sortId = data.length + Number(data[i].id);
            }
            else {
                var currNum = this.getYaMenTaskCurrNum(data[i].taskId, data[i].questType);
                if (currDay >= Number(data[i].taskId)) {
                    if (currNum < data[i].value) {
                        data[i].sortId = data[i].id;
                    }
                    else {
                        data[i].sortId = data[i].id - data.length;
                    }
                }
                else {
                    data[i].sortId = 2 * data.length + data[i].id;
                }
            }
        }
        return data.sort(function (a, b) {
            return a.sortId - b.sortId;
        });
    };
    //皇榜cfg
    AcCourtDutyVo.prototype.getSortHuangBangTaskCfg = function () {
        var data = this.cfg.getHuangBangTaskList();
        var currDay = this.getCurrDay();
        for (var i = 0; i < data.length; i++) {
            if (currDay >= Number(data[i].taskId) && this.isGetHuangBangTaskById(data[i].taskId, data[i].rKey)) {
                data[i].sortId = data.length + Number(data[i].id);
            }
            else {
                var currNum = this.getHuangBangTaskCurrNum(data[i].taskId, data[i].questType);
                if (currDay >= Number(data[i].taskId)) {
                    if (currNum < data[i].value) {
                        data[i].sortId = data[i].id;
                    }
                    else {
                        data[i].sortId = data[i].id - data.length;
                    }
                }
                else {
                    data[i].sortId = 2 * data.length + data[i].id;
                }
            }
        }
        return data.sort(function (a, b) {
            return a.sortId - b.sortId;
        });
    };
    //倒计时
    AcCourtDutyVo.prototype.getCountDown = function () {
        var et = this.et - this.cfg.extraTime * 86400;
        if (et < GameData.serverTime) {
            return LanguageManager.getlocal("acPunishEnd");
        }
        return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
    };
    AcCourtDutyVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
    };
    Object.defineProperty(AcCourtDutyVo.prototype, "acTimeAndHour", {
        //活动日期时间显示
        get: function () {
            var et = this.et - 86400 * this.cfg.extraTime;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcCourtDutyVo.prototype.isShowYaMenTaskRedDot = function () {
        var currDay = this.getCurrDay();
        var yaMenTask = this.cfg.getYaMenTaskList();
        for (var i = 0; i < yaMenTask.length; i++) {
            var taskId = yaMenTask[i].taskId;
            if (currDay >= taskId && !this.isGetYaMenTaskById(taskId, yaMenTask[i].rKey) && this.getYaMenTaskCurrNum(taskId, yaMenTask[i].questType) >= yaMenTask[i].value) {
                return true;
            }
        }
        return false;
    };
    AcCourtDutyVo.prototype.isShowHuangBangTaskRedDot = function () {
        var currDay = this.getCurrDay();
        var taskList = this.cfg.getHuangBangTaskList();
        for (var i = 0; i < taskList.length; i++) {
            var taskId = taskList[i].taskId;
            if (currDay >= taskId && !this.isGetHuangBangTaskById(taskId, taskList[i].rKey) && this.getHuangBangTaskCurrNum(taskId, taskList[i].questType) >= taskList[i].value) {
                return true;
            }
        }
        return false;
    };
    //是否已解锁
    AcCourtDutyVo.prototype.isShowUnlockYaMenRedDot = function () {
        var isUnlock = (this.unlock && this.unlock["yaMenTask"] && (this.unlock["yaMenTask"] == 1));
        if (this.cfg.needRecharge1 > 0 && this.cfg.needRecharge1 <= this.getRechargeNum() && (!isUnlock)) {
            return true;
        }
        return false;
    };
    //是否已解锁
    AcCourtDutyVo.prototype.isShowUnlockHuangBangRedDot = function () {
        var isUnlock = (this.unlock && this.unlock["huangBangTask"] && (this.unlock["huangBangTask"] == 1));
        if (this.cfg.needRecharge2 > 0 && this.cfg.needRecharge2 <= this.getRechargeNum() && (!isUnlock)) {
            return true;
        }
        return false;
    };
    Object.defineProperty(AcCourtDutyVo.prototype, "isShowRedDot", {
        get: function () {
            return this.isShowYaMenTaskRedDot() || this.isShowHuangBangTaskRedDot() || this.isShowUnlockYaMenRedDot() || this.isShowUnlockHuangBangRedDot();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCourtDutyVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCourtDutyVo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcCourtDutyVo;
}(AcBaseVo));
__reflect(AcCourtDutyVo.prototype, "AcCourtDutyVo");
//# sourceMappingURL=AcCourtDutyVo.js.map