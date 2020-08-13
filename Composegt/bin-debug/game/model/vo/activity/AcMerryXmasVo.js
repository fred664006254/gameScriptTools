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
var AcMerryXmasVo = (function (_super) {
    __extends(AcMerryXmasVo, _super);
    function AcMerryXmasVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AcMerryXmasVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_MERRYXMAS_REFRESHVO);
    };
    Object.defineProperty(AcMerryXmasVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMerryXmasVo.prototype, "starNum", {
        /**拥有数量 */
        get: function () {
            return this.scorenum || 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMerryXmasVo.prototype, "useNum", {
        /**抽取次数 */
        get: function () {
            return this.lotterynum || 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMerryXmasVo.prototype, "curStep", {
        get: function () {
            var progress = this.cfg.progress;
            for (var i = 0; i < progress.length; i++) {
                var element = progress[i];
                if (this.lotterynum >= element.needNum) {
                    continue;
                }
                else {
                    return i;
                }
            }
            return progress.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMerryXmasVo.prototype, "isShowRedDot", {
        get: function () {
            // 任务红点
            if (this.isHaveTaskRedDot()) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AcMerryXmasVo.prototype.isShowTaskTabRed = function (tabId) {
        if (tabId) {
            var dataList = this.getSortTask(tabId);
            for (var index = 0; index < dataList.length; index++) {
                var element = dataList[index];
                var taskNum = this.getTaskNum(element.questType);
                var newTaskNum = element.value;
                if (taskNum >= newTaskNum && !this.getTaskStatus(element)) {
                    return true;
                }
            }
            return false;
        }
        return false;
    };
    Object.defineProperty(AcMerryXmasVo.prototype, "isShowTaskTab1Red", {
        get: function () {
            var cfg = this.cfg;
            var dataList = this.getSortTask(1);
            for (var index = 0; index < dataList.length; index++) {
                var element = dataList[index];
                var openType = element.openType;
                var taskNum = this.getTaskNum(element.questType);
                var newTaskNum = element.value;
                if (taskNum >= newTaskNum && !this.getTaskStatus(element)) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMerryXmasVo.prototype, "isShowTaskTab2Red", {
        get: function () {
            var cfg = this.cfg;
            var dataList = this.getSortTask(2);
            for (var index = 0; index < dataList.length; index++) {
                var element = dataList[index];
                var openType = element.openType;
                var taskNum = this.getTaskNum(element.questType);
                var newTaskNum = element.value;
                if (taskNum >= newTaskNum && !this.getTaskStatus(element)) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMerryXmasVo.prototype, "isShowTaskTab3Red", {
        get: function () {
            var cfg = this.cfg;
            var dataList = this.getSortTask(3);
            for (var index = 0; index < dataList.length; index++) {
                var element = dataList[index];
                var openType = element.openType;
                var taskNum = this.getTaskNum(element.questType);
                var newTaskNum = element.value;
                if (taskNum >= newTaskNum && !this.getTaskStatus(element)) {
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
    AcMerryXmasVo.prototype.isHaveTaskRedDot = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (!cfg) {
            return false;
        }
        var tasklist = cfg.getTaskList();
        for (var i = 0; i < tasklist.length; i++) {
            if (!this.getTaskStatus(tasklist[i]) && this.getTaskNum(tasklist[i].questType) >= tasklist[i].value) {
                return true;
            }
        }
        return false;
    };
    Object.defineProperty(AcMerryXmasVo.prototype, "acCountDown", {
        get: function () {
            var et = this.et - (this.config.extraTime || 0) * 86400;
            if (et < GameData.serverTime) {
                return LanguageManager.getlocal("acPunishEnd");
            }
            return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 8);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 任务类型的进度
     */
    AcMerryXmasVo.prototype.getTaskNum = function (type) {
        if (type == 'progress') {
            return this.lotterynum || 0;
        }
        else {
            return this.taskinfo[type] ? this.taskinfo[type] : 0;
        }
    };
    /**
     * 任务的状态
     */
    AcMerryXmasVo.prototype.getTaskStatus = function (taskData) {
        var id = taskData.id;
        if (taskData.progress == 'progress') {
            return this.stageinfo[id] && this.stageinfo[id] == 1 ? true : false;
        }
        else {
            return this.flags[id] && this.flags[id] == 1 ? true : false;
        }
    };
    /**
     * 获得Task列表
     */
    AcMerryXmasVo.prototype.getSortTask = function (id) {
        var min = 1;
        var max = 1;
        if (id == 2) {
            min = 2;
            max = 3;
        }
        else if (id == 3) {
            //页签3是进度奖励 task配置里没有,但是进过处理加入了tasklist里
            min = 4;
            max = 4;
        }
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var taskData = cfg.getTaskListById(min, max);
        var baseTaskData = cfg.getTaskList();
        var taskLength = baseTaskData.length - this.cfg.progress.length;
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
            if (this.getTaskStatus(taskData[i])) {
                arr[i].sortId = taskLength + Number(arr[i].id);
                continue;
            }
            else if (this.getTaskNum(arr[i].questType) >= arr[i].value) {
                arr[i].sortId = (Number(arr[i].id)) - taskLength - 1;
                continue;
            }
            else {
                arr[i].sortId = Number(arr[i].id);
                continue;
            }
        }
        return arr;
    };
    AcMerryXmasVo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcMerryXmasVo;
}(AcBaseVo));
__reflect(AcMerryXmasVo.prototype, "AcMerryXmasVo");
