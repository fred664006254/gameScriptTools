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
var AcLanternVo = (function (_super) {
    __extends(AcLanternVo, _super);
    function AcLanternVo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //许愿天灯 可用次数
        _this.v = 0;
        //许愿天灯 已用次数
        _this.usenum = 0;
        //许愿天灯 留言标识
        _this.noteflag = 0;
        //许愿天灯 进度奖励领取标识
        _this.rateflag = null;
        //许愿天灯 第几天 任务信息{task = {}, flags = {}} task各个任务类型的进度 flags各个任务奖励的领取标识
        _this.tinfo = null;
        _this.opened = 0;
        return _this;
    }
    AcLanternVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_LANTERN_REFRESHVO);
    };
    Object.defineProperty(AcLanternVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcLanternVo.prototype.getOpened = function () {
        return this.opened && this.opened == 1;
    };
    AcLanternVo.prototype.getCurDay = function () {
        // local now = os.time()
        //         local st = getWeeTs(self.info[k].st)
        //         local diffday = math.ceil((now-st)/24/3600)
        var curDay = 1;
        var acSt = App.DateUtil.getWeeTs(this.st);
        var todaySt = App.DateUtil.getWeeTs(GameData.serverTime);
        curDay = (todaySt - acSt) / 86400 + 1;
        if (curDay > 4) {
            return 1;
        }
        return curDay;
    };
    Object.defineProperty(AcLanternVo.prototype, "isShowRedDot", {
        get: function () {
            // 任务红点
            if (this.isHaveTaskRedDot()) {
                return true;
            }
            if (this.v > 0) {
                return true;
            }
            // 宝箱
            for (var i = 0; i < this.cfg.lanternNum.length; i++) {
                var tmprcfg = this.cfg.lanternNum[i];
                if ((!this.rateflag || !this.rateflag[i + 1]) && this.v >= tmprcfg.needNum) {
                    // if (this.rateflag && !this.rateflag[i+1] && this.v >= tmprcfg.needNum) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLanternVo.prototype, "isShowTaskTabRed1", {
        get: function () {
            var cfg = this.cfg;
            var dataList = this.getSortTask(1);
            for (var index = 0; index < dataList.length; index++) {
                var element = dataList[index];
                var openType = element.openType;
                var taskNum = this.gettTaskNum(element.questType, 1);
                var newTaskNum = element.value;
                if (taskNum >= newTaskNum && !this.getTaskStatus(element.id, 1)) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLanternVo.prototype, "isShowTaskTabRed2", {
        get: function () {
            var cfg = this.cfg;
            var dataList = this.getSortTask(2);
            for (var index = 0; index < dataList.length; index++) {
                var element = dataList[index];
                var openType = element.openType;
                var taskNum = this.gettTaskNum(element.questType, 2);
                var newTaskNum = element.value;
                if (taskNum >= newTaskNum && !this.getTaskStatus(element.id, 2)) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLanternVo.prototype, "isShowTaskTabRed3", {
        get: function () {
            var cfg = this.cfg;
            var dataList = this.getSortTask(3);
            for (var index = 0; index < dataList.length; index++) {
                var element = dataList[index];
                var openType = element.openType;
                var taskNum = this.gettTaskNum(element.questType, 3);
                var newTaskNum = element.value;
                if (taskNum >= newTaskNum && !this.getTaskStatus(element.id, 3)) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLanternVo.prototype, "isShowTaskTabRed4", {
        get: function () {
            var cfg = this.cfg;
            var dataList = this.getSortTask(4);
            for (var index = 0; index < dataList.length; index++) {
                var element = dataList[index];
                var openType = element.openType;
                var taskNum = this.gettTaskNum(element.questType, 4);
                var newTaskNum = element.value;
                if (taskNum >= newTaskNum && !this.getTaskStatus(element.id, 4)) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AcLanternVo.prototype.getBoxStatusById = function (index) {
        // return 1;
        var fireNeed = this.cfg.lanternNum[index]["needNum"];
        if (this.usenum >= fireNeed) {
            if (this.rateflag[String(index + 1)]) {
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
    AcLanternVo.prototype.isHaveTaskRedDot = function () {
        return this.isShowTaskTabRed1 || this.isShowTaskTabRed2 || this.isShowTaskTabRed3 || this.isShowTaskTabRed4;
    };
    Object.defineProperty(AcLanternVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcLanternVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et;
    };
    /**
     * 任务类型的进度
     */
    AcLanternVo.prototype.gettTaskNum = function (type, day) {
        // return 0;
        return this.tinfo[day] && this.tinfo[day].task[type] ? this.tinfo[day].task[type] : 0;
    };
    /**
     * 任务的状态   true lingqu   false weilingqu
     */
    AcLanternVo.prototype.getTaskStatus = function (id, day) {
        // return true;
        return this.tinfo[day] && this.tinfo[day].flags[id] && this.tinfo[day].flags[id] == 1 ? true : false;
    };
    /**
     * 获得Task列表
     */
    AcLanternVo.prototype.getSortTask = function (day) {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var taskData = cfg.getTaskList();
        // let baseTaskData = cfg.getTaskList();
        for (var i = 0; i < taskData.length; i++) {
            taskData[i].day = day;
            if (this.getTaskStatus(taskData[i].id, day)) {
                taskData[i].sortId = taskData.length + Number(taskData[i].id);
                continue;
            }
            else if (this.gettTaskNum(taskData[i].questType, day) >= taskData[i].value) {
                taskData[i].sortId = (Number(taskData[i].id)) - taskData.length - 1;
                continue;
            }
            else {
                taskData[i].sortId = Number(taskData[i].id);
                continue;
            }
        }
        return taskData;
    };
    AcLanternVo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcLanternVo;
}(AcBaseVo));
__reflect(AcLanternVo.prototype, "AcLanternVo");
