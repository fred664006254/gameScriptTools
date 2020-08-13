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
var AcMoonNightVo = (function (_super) {
    __extends(AcMoonNightVo, _super);
    function AcMoonNightVo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.firstOpen = 0;
        return _this;
    }
    // public moonnight:any = null;
    AcMoonNightVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_MOONNIGHT_FRESH);
    };
    Object.defineProperty(AcMoonNightVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    // public isFirst():boolean
    // {
    // 	return this.moonnight != 1;
    // }
    AcMoonNightVo.prototype.getFirstOpen = function () {
        return Boolean(this.firstOpen);
    };
    Object.defineProperty(AcMoonNightVo.prototype, "isShowRedDot", {
        get: function () {
            // 任务红点
            if (this.isHaveTaskRedDot()) {
                return true;
            }
            if (this.ainfo.stagenum > this.cfg.lotteryNum.length - 1) {
                return false;
            }
            if (this.ainfo.scorenum >= this.cfg.lotteryNum[this.ainfo.stagenum].needNum) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AcMoonNightVo.prototype.getAcCDStr = function () {
        var t = this.et - GameData.serverTime;
        if (t < 0) {
            t = 0;
        }
        var timeTxt = App.DateUtil.getFormatBySecond(t, 1);
        return timeTxt;
    };
    Object.defineProperty(AcMoonNightVo.prototype, "isShowTaskTabRed", {
        get: function () {
            var cfg = this.cfg;
            var dataList = this.getSortTask();
            for (var index = 0; index < dataList.length; index++) {
                var element = dataList[index];
                var openType = element.openType;
                var taskNum = this.gettTaskNum(element.questType);
                var newTaskNum = element.value;
                if (taskNum >= newTaskNum && !this.getTaskStatus(element.id)) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 任务奖励红点
     */
    AcMoonNightVo.prototype.isHaveTaskRedDot = function () {
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
    Object.defineProperty(AcMoonNightVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcMoonNightVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et;
    };
    AcMoonNightVo.prototype.getBoxStatusById = function (boxIndex) {
        if (this.ainfo.stagenum > boxIndex) {
            return 3;
        }
        //1未完成 2可领取 3已领取
        if (this.ainfo.scorenum < this.cfg.lotteryNum[this.ainfo.stagenum].needNum) {
            return 1;
        }
        else {
            if (this.ainfo.stagenum == boxIndex) {
                return 2;
            }
            else {
                return 1;
            }
        }
    };
    /**
     * 任务类型的进度
     */
    AcMoonNightVo.prototype.gettTaskNum = function (type) {
        return this.ainfo.taskinfo[type] ? this.ainfo.taskinfo[type] : 0;
    };
    /**
     * 任务的状态
     */
    AcMoonNightVo.prototype.getTaskStatus = function (id) {
        return this.ainfo.flags[id] && this.ainfo.flags[id] == 1 ? true : false;
    };
    /**
     * 获得Task列表
     */
    AcMoonNightVo.prototype.getSortTask = function () {
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
        for (var i = 0; i < arr.length; i++) {
            if (this.getTaskStatus(arr[i].id)) {
                arr[i].sortId = arr.length + Number(arr[i].id);
                continue;
            }
            else if (this.gettTaskNum(arr[i].questType) >= arr[i].value) {
                arr[i].sortId = (Number(arr[i].id)) - arr.length - 1;
                continue;
            }
            else {
                arr[i].sortId = Number(taskData[i].id);
                continue;
            }
        }
        return arr;
    };
    AcMoonNightVo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcMoonNightVo;
}(AcBaseVo));
__reflect(AcMoonNightVo.prototype, "AcMoonNightVo");
