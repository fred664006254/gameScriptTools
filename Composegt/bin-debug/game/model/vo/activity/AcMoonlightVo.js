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
var AcMoonlightVo = (function (_super) {
    __extends(AcMoonlightVo, _super);
    function AcMoonlightVo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.moonlight = null;
        return _this;
    }
    AcMoonlightVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_MOONLIGHT_REFRESHVO);
    };
    Object.defineProperty(AcMoonlightVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcMoonlightVo.prototype.isFirst = function () {
        return this.moonlight != 1;
    };
    Object.defineProperty(AcMoonlightVo.prototype, "isShowRedDot", {
        get: function () {
            // 任务红点
            if (this.isHaveTaskRedDot()) {
                return true;
            }
            // 宝箱
            for (var i = 0; i < this.cfg.drawNum.length; i++) {
                var tmprcfg = this.cfg.drawNum[i];
                if ((!this.ainfo.stageinfo || !this.ainfo.stageinfo[i + 1]) && this.ainfo.score >= tmprcfg.needNum) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMoonlightVo.prototype, "isShowTaskTab1Red", {
        get: function () {
            var cfg = this.cfg;
            var dataList = this.getSortTask(1);
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
    Object.defineProperty(AcMoonlightVo.prototype, "isShowTaskTab2Red", {
        get: function () {
            var cfg = this.cfg;
            var dataList = this.getSortTask(2);
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
    Object.defineProperty(AcMoonlightVo.prototype, "isShowTaskTab3Red", {
        get: function () {
            var cfg = this.cfg;
            var dataList = this.getSortTask(3);
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
    AcMoonlightVo.prototype.getBoxStatusById = function (index) {
        var fireNeed = this.cfg.drawNum[index]["needNum"];
        if (this.ainfo.score >= fireNeed) {
            if (this.ainfo.stageinfo[String(index + 1)]) {
                //已经打开宝箱
                return 3;
            }
            else {
                //可以领取宝箱
                return 2;
            }
        }
        else {
            //宝箱关闭
            return 1;
        }
    };
    /**
     * 任务奖励红点
     */
    AcMoonlightVo.prototype.isHaveTaskRedDot = function () {
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
    Object.defineProperty(AcMoonlightVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcMoonlightVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et;
    };
    /**
     * 任务类型的进度
     */
    AcMoonlightVo.prototype.gettTaskNum = function (type) {
        return this.ainfo.taskinfo[type] ? this.ainfo.taskinfo[type] : 0;
    };
    /**
     * 任务的状态
     */
    AcMoonlightVo.prototype.getTaskStatus = function (id) {
        return this.ainfo.flags[id] && this.ainfo.flags[id] == 1 ? true : false;
    };
    /**
     * 获得Task列表
     */
    AcMoonlightVo.prototype.getSortTask = function (id) {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var taskData = cfg.getTaskListById(id);
        var baseTaskData = cfg.getTaskList();
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
            if (this.getTaskStatus(taskData[i].id)) {
                arr[i].sortId = baseTaskData.length + Number(arr[i].id);
                continue;
            }
            else if (this.gettTaskNum(arr[i].questType) >= arr[i].value) {
                arr[i].sortId = (Number(arr[i].id)) - baseTaskData.length - 1;
                continue;
            }
            else {
                arr[i].sortId = Number(arr[i].id);
                continue;
            }
        }
        return arr;
    };
    AcMoonlightVo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcMoonlightVo;
}(AcBaseVo));
__reflect(AcMoonlightVo.prototype, "AcMoonlightVo");
