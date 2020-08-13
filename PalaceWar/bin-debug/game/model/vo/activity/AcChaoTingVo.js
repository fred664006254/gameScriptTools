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
 * 朝廷诏令
 * date 2020.3.23
 * author ycg
 */
var AcChaoTingVo = (function (_super) {
    __extends(AcChaoTingVo, _super);
    function AcChaoTingVo() {
        return _super.call(this) || this;
    }
    AcChaoTingVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    //当前道具数量
    AcChaoTingVo.prototype.getToolNum = function () {
        if (this.v) {
            return this.v;
        }
        return 0;
    };
    //充值元宝数
    AcChaoTingVo.prototype.getRechargeNum = function () {
        if (this.rinfo && this.rinfo.v) {
            return this.rinfo.v;
        }
        return 0;
    };
    //是否领取充值奖励
    AcChaoTingVo.prototype.isGetRechargeById = function (id) {
        if (this.rinfo && this.rinfo.flags && this.rinfo.flags[id]) {
            return true;
        }
        return false;
    };
    //充值奖励红点
    AcChaoTingVo.prototype.checkRechargeRedDot = function () {
        var data = this.cfg.getRechargeCfg();
        var currNum = this.getRechargeNum();
        for (var i = 0; i < data.length; i++) {
            if (!this.isGetRechargeById(data[i].id) && currNum >= data[i].needGem) {
                return true;
            }
        }
        return false;
    };
    //充值奖励 排序
    AcChaoTingVo.prototype.getSortRechargeCfg = function () {
        var rechargeCfg = this.cfg.getRechargeCfg();
        var currNum = this.getRechargeNum();
        var listCfg = [];
        for (var i = 0; i < rechargeCfg.length; i++) {
            if (this.isGetRechargeById(rechargeCfg[i].id)) {
                rechargeCfg[i].sortId = rechargeCfg[i].id + rechargeCfg.length;
            }
            else if (currNum >= rechargeCfg[i].needGem) {
                rechargeCfg[i].sortId = rechargeCfg[i].id - rechargeCfg.length;
            }
            else {
                rechargeCfg[i].sortId = rechargeCfg[i].id;
            }
            if (rechargeCfg[i].display < 0 || rechargeCfg[i].display + 1 > rechargeCfg.length) {
                listCfg.push(rechargeCfg[i]);
            }
            else {
                var index = rechargeCfg[i].display;
                if (currNum >= rechargeCfg[index].needGem) {
                    listCfg.push(rechargeCfg[i]);
                }
            }
        }
        listCfg.sort(function (a, b) {
            return a.sortId - b.sortId;
        });
        return listCfg;
    };
    //是否已解锁任务
    AcChaoTingVo.prototype.isUnlockTask = function () {
        return this.unlock && this.unlock.unlock;
    };
    //是否已领取任务奖励
    AcChaoTingVo.prototype.isGetTaskRewardById = function (id) {
        return this.task && this.task.flags && this.task.flags[id];
    };
    //任务完成数量
    AcChaoTingVo.prototype.getTaskNum = function (questType) {
        return (this.task && this.task.v && this.task.v[questType]) ? this.task.v[questType] : 0;
    };
    //任务列表
    AcChaoTingVo.prototype.getSortTaskCfg = function () {
        var taskCfg = this.cfg.getTaskCfg();
        for (var i = 0; i < taskCfg.length; i++) {
            if (this.isGetTaskRewardById(taskCfg[i].id)) {
                taskCfg[i].sortId = taskCfg[i].id + taskCfg.length;
            }
            else {
                if (taskCfg[i].value <= this.getTaskNum(taskCfg[i].questType)) {
                    taskCfg[i].sortId = taskCfg[i].id - taskCfg.length;
                }
                else {
                    taskCfg[i].sortId = taskCfg[i].id;
                }
            }
        }
        return taskCfg.sort(function (a, b) {
            return a.sortId - b.sortId;
        });
    };
    //任务红点
    AcChaoTingVo.prototype.checkTaskRedDot = function () {
        var taskCfg = this.cfg.getTaskCfg();
        for (var i = 0; i < taskCfg.length; i++) {
            if (!this.isGetTaskRewardById(taskCfg[i].id) && taskCfg[i].value <= this.getTaskNum(taskCfg[i].questType)) {
                return true;
            }
        }
        return false;
    };
    //解锁红点
    AcChaoTingVo.prototype.checkUnlockRed = function () {
        if (this.getRechargeNum() >= this.cfg.recharge1 && (!this.isUnlockTask())) {
            return true;
        }
        return false;
    };
    Object.defineProperty(AcChaoTingVo.prototype, "isShowRedDot", {
        get: function () {
            return this.checkRechargeRedDot() || this.checkTaskRedDot() || this.checkUnlockRed();
        },
        enumerable: true,
        configurable: true
    });
    //倒计时
    AcChaoTingVo.prototype.getCountDown = function () {
        var et = this.et - this.cfg.extraTime * 86400;
        if (et < GameData.serverTime) {
            return LanguageManager.getlocal("acPunishEnd");
        }
        return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
    };
    AcChaoTingVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
    };
    Object.defineProperty(AcChaoTingVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcChaoTingVo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcChaoTingVo;
}(AcBaseVo));
__reflect(AcChaoTingVo.prototype, "AcChaoTingVo");
//# sourceMappingURL=AcChaoTingVo.js.map