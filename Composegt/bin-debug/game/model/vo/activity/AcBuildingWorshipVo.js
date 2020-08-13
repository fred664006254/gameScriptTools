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
var AcBuildingWorshipVo = (function (_super) {
    __extends(AcBuildingWorshipVo, _super);
    function AcBuildingWorshipVo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.firstOpen = 0;
        return _this;
    }
    AcBuildingWorshipVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_BUILDINGWORSHIP_REFRESHVO);
    };
    Object.defineProperty(AcBuildingWorshipVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcBuildingWorshipVo.prototype.getFirstOpen = function () {
        return Boolean(this.firstOpen);
    };
    Object.defineProperty(AcBuildingWorshipVo.prototype, "isShowRedDot", {
        get: function () {
            // 任务红点
            if (this.isHaveTaskRedDot()) {
                return true;
            }
            if (!this.cfg) {
                return false;
            }
            // 宝箱
            for (var i = 0; i < this.cfg.lotteryNum.length; i++) {
                var tmprcfg = this.cfg.lotteryNum[i];
                if ((!this.ainfo.flags || !this.ainfo.flags[i + 1]) && this.ainfo.lotterynum >= tmprcfg.needNum) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AcBuildingWorshipVo.prototype.getAvgConfig = function (id, code) {
        return this.cfg.getDialogById(id, code);
    };
    /**
     * 任务奖励红点
     */
    AcBuildingWorshipVo.prototype.isHaveTaskRedDot = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (!cfg) {
            return false;
        }
        var tasklist = cfg.getTaskList();
        for (var i = 0; i < tasklist.length; i++) {
            if (!this.getTaskStatus(tasklist[i].id) && this.gettTaskNum(tasklist[i].questType) >= tasklist[i].value) {
                return true;
            }
        }
        return false;
    };
    Object.defineProperty(AcBuildingWorshipVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcBuildingWorshipVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et;
    };
    /**
     * 任务类型的进度
     */
    AcBuildingWorshipVo.prototype.gettTaskNum = function (type) {
        return this.ainfo.taskinfo[type] ? this.ainfo.taskinfo[type] : 0;
    };
    /**
     * 任务的状态
     */
    AcBuildingWorshipVo.prototype.getTaskStatus = function (id) {
        return this.ainfo.flags[id] && this.ainfo.flags[id] == 1 ? true : false;
    };
    /**
     * 获得Task列表
     */
    AcBuildingWorshipVo.prototype.getSortTask = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var taskData = cfg.getTaskList();
        var arr = [];
        for (var i = 0; i < taskData.length; i++) {
            if (taskData[i].questType == "1") {
                var openDay = App.DateUtil.getActivityDay(this.et, this.st);
                if (openDay < taskData[i].value) {
                    continue;
                }
            }
            arr.push(taskData[i]);
        }
        //改
        var leng1 = arr.length;
        for (var i = 0; i < leng1; i++) {
            if (this.getTaskStatus(arr[i].id)) {
                arr[i].sortId = arr.length + Number(arr[i].id);
                continue;
            }
            else if (this.gettTaskNum(arr[i].questType) >= arr[i].value) {
                arr[i].sortId = (Number(arr[i].id)) - arr.length - 1;
                continue;
            }
            else {
                arr[i].sortId = Number(arr[i].id);
                continue;
            }
        }
        return arr;
    };
    AcBuildingWorshipVo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcBuildingWorshipVo;
}(AcBaseVo));
__reflect(AcBuildingWorshipVo.prototype, "AcBuildingWorshipVo");
