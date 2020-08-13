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
var AcCarnivalNightVo = (function (_super) {
    __extends(AcCarnivalNightVo, _super);
    function AcCarnivalNightVo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selIdx = 0;
        _this.ainfo = {};
        _this.uinfo = {};
        _this.tinfo = {};
        _this.taskflags = {}; //{v = 0,flags={}} --充值信息
        _this.taskinfo = {}; //{v = 0,flags={}} --充值信息
        //消耗南瓜奖励领取情况
        _this.boxflags = {};
        _this.attacknum = 0;
        //轮次奖励领取情况
        _this.turnflags = {};
        _this.canatknum = 0;
        return _this;
    }
    AcCarnivalNightVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
            if (key == 'ainfo') {
                var ele = data[key];
                this.turnflags = ele.flags;
            }
            if (key == 'tinfo') {
                var ele = data[key];
                this.taskflags = ele.flags;
                //this.attacknum = ele.lotterynum;
                this.taskinfo = ele.task;
            }
            if (key == 'uinfo') {
                var ele = data[key];
                this.attacknum = ele.v;
                this.boxflags = ele.flags;
            }
            if (key == "v") {
                this.canatknum = data[key] || 0;
            }
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CARNIVALNIGHT_FRESH_ITEM);
    };
    Object.defineProperty(AcCarnivalNightVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCarnivalNightVo.prototype, "bossHp", {
        get: function () {
            return this.cfg.getCurBossMaxHp(this.theturn);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 累积充值领取判断
     */
    AcCarnivalNightVo.prototype.isGetRecharge = function (id) {
        var flag = false;
        if (this.taskflags && this.taskflags[id]) {
            flag = true;
        }
        return flag;
    };
    //获取累积充值数目
    AcCarnivalNightVo.prototype.getChargeNum = function (questType) {
        var num = 0;
        if (this.taskinfo && this.taskinfo[questType]) {
            num = this.taskinfo[questType];
        }
        return num;
    };
    Object.defineProperty(AcCarnivalNightVo.prototype, "isShowRedDot", {
        get: function () {
            if (!this.cfg || !this.isInActivity()) {
                return false;
            }
            if (this.canatknum > 0) {
                return true;
            }
            if (this.isHaveTaskRedDot()) {
                return true;
            }
            // 宝箱
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 任务奖励红点
     */
    AcCarnivalNightVo.prototype.isHaveTaskRedDot = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (!cfg) {
            return false;
        }
        if (this.isShowTaskTab1Red() || this.isShowTaskTab2Red() || this.isShowTaskTab3Red()) {
            return true;
        }
        return false;
    };
    /**
     * 任务类型的进度
     */
    AcCarnivalNightVo.prototype.getTaskNum = function (type) {
        return this.tinfo.task[type] ? this.tinfo.task[type] : 0;
    };
    /**
     * 任务类型的进度
     */
    AcCarnivalNightVo.prototype.getAcTaskNum = function (typeId) {
        if (typeId.indexOf("batHP") > -1) {
            var id = typeId.replace('batHP', '');
            return Number(this.ainfo.v);
            // >= Number(id) ? 1 : 0;
        }
        else {
            var id = typeId.replace('bigPrize', '');
            return Number(this.uinfo.v);
        }
    };
    /**
     * 任务的状态
     */
    AcCarnivalNightVo.prototype.getTaskStatus = function (id) {
        return this.tinfo.flags[id] && this.tinfo.flags[id] == 1 ? true : false;
    };
    AcCarnivalNightVo.prototype.getAcTaskStatus = function (typeId) {
        if (typeId.indexOf("batHP") > -1) {
            var id = typeId.replace('batHP', '');
            return this.ainfo.flags[id] && this.ainfo.flags[id] == 1 ? true : false;
        }
        else {
            var id = typeId.replace('bigPrize', '');
            return this.uinfo.flags[id] && this.uinfo.flags[id] == 1 ? true : false;
        }
    };
    /**
 * 获得Task列表
 */
    AcCarnivalNightVo.prototype.getSortTask = function (id) {
        //1,2是任务列表,3是消耗南瓜和轮次奖励
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (id < 3) {
            var taskData = cfg.getTaskListById(id);
            //let baseTaskData = cfg.getTaskList();
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
                    arr[i].sortId = Number(arr[i].id) + 200;
                    continue;
                }
                else if (this.getTaskNum(arr[i].questType) >= arr[i].value) {
                    arr[i].sortId = (Number(arr[i].id)) - 200;
                    continue;
                }
                else {
                    arr[i].sortId = Number(arr[i].id);
                    continue;
                }
            }
            return arr;
        }
    };
    AcCarnivalNightVo.prototype.getAcSortTask = function (id) {
        //1,2是任务列表,3是消耗南瓜和轮次奖励
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var arr = [];
        var acTaskList = this.cfg.acTask;
        for (var i = 0; i < acTaskList.length; i++) {
            arr.push(acTaskList[i]);
            //轮次奖励在前,消耗奖励在后
            var offset = 0;
            if (arr[i].typeId.indexOf('batHP')) {
                offset = 200;
            }
            else {
                offset = 100;
            }
            if (this.getAcTaskStatus(arr[i].typeId)) {
                arr[i].sortId = acTaskList.length + offset + Number(arr[i].id);
                continue;
            }
            else if (this.getAcTaskNum(arr[i].typeId) >= arr[i].value) {
                arr[i].sortId = (Number(arr[i].id)) - acTaskList.length - 1 - 500 + offset;
                continue;
            }
            else {
                arr[i].sortId = Number(arr[i].id) + offset;
                continue;
            }
        }
        return arr;
    };
    AcCarnivalNightVo.prototype.isShowTaskTab1Red = function () {
        var cfg = this.cfg;
        var dataList = this.getSortTask(1);
        for (var index = 0; index < dataList.length; index++) {
            var element = dataList[index];
            var openType = element.openType;
            var taskNum = this.getTaskNum(element.questType);
            var newTaskNum = element.value;
            if (taskNum >= newTaskNum && !this.getTaskStatus(element.id)) {
                return true;
            }
        }
        return false;
    };
    AcCarnivalNightVo.prototype.isShowTaskTab2Red = function () {
        var cfg = this.cfg;
        var dataList = this.getSortTask(2);
        for (var index = 0; index < dataList.length; index++) {
            var element = dataList[index];
            var openType = element.openType;
            var taskNum = this.getTaskNum(element.questType);
            var newTaskNum = element.value;
            if (taskNum >= newTaskNum && !this.getTaskStatus(element.id)) {
                return true;
            }
        }
        return false;
    };
    AcCarnivalNightVo.prototype.isShowTaskTab3Red = function () {
        var dataList = this.getAcSortTask(3);
        for (var index = 0; index < dataList.length; index++) {
            var element = dataList[index];
            var taskNum = this.getAcTaskNum(element.typeId);
            var newTaskNum = element.value;
            if (taskNum >= newTaskNum && !this.getAcTaskStatus(element.typeId)) {
                return true;
            }
        }
        return false;
    };
    Object.defineProperty(AcCarnivalNightVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcCarnivalNightVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et;
    };
    AcCarnivalNightVo.prototype.dispose = function () {
        this.selIdx = 0;
        this.taskinfo = {};
        this.taskflags = {};
        this.attacknum = 0;
        this.canatknum = 0;
        this.theturn = 0;
        _super.prototype.dispose.call(this);
    };
    return AcCarnivalNightVo;
}(AcBaseVo));
__reflect(AcCarnivalNightVo.prototype, "AcCarnivalNightVo");
