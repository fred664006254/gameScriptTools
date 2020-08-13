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
var AcSpringOutingVo = (function (_super) {
    __extends(AcSpringOutingVo, _super);
    function AcSpringOutingVo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.curBgId = 0;
        return _this;
    }
    AcSpringOutingVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SPRINGOUTING_REFRESHVO);
    };
    Object.defineProperty(AcSpringOutingVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSpringOutingVo.prototype, "isShowRedDot", {
        get: function () {
            // 任务红点
            if (this.isHaveTaskRedDot()) {
                return true;
            }
            // 宝箱
            for (var i = 0; i < this.cfg.lotteryNum.length; i++) {
                var tmprcfg = this.cfg.lotteryNum[i];
                if ((!this.ainfo.stageinfo || !this.ainfo.stageinfo[i + 1]) && this.ainfo.lotterynum >= tmprcfg.needNum) {
                    return true;
                }
            }
            if (this.canGetItem()) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    //可以出游
    AcSpringOutingVo.prototype.canGetItem = function () {
        var needGem = this.cfg.cost;
        if (needGem <= this.getScoreNum()) {
            return true;
        }
        return false;
    };
    AcSpringOutingVo.prototype.getCurBgId = function () {
        var curId = null;
        var randNum = 8;
        if (this.cfg.sceneNum && this.cfg.sceneNum > 0) {
            randNum = this.cfg.sceneNum;
        }
        if (this.curBgId == 0) {
            this.curBgId = Math.floor(Math.random() * randNum);
        }
        curId = this.curBgId;
        this.curBgId++;
        if (this.curBgId == randNum + 1) {
            this.curBgId = 1;
        }
        return curId;
    };
    AcSpringOutingVo.prototype.getFirstOpen = function () {
        return Boolean(this.ainfo.firstOpen);
    };
    AcSpringOutingVo.prototype.getScoreNum = function () {
        return this.ainfo.scorenum;
    };
    AcSpringOutingVo.prototype.getLotteryNum = function () {
        return this.ainfo.lotterynum;
    };
    AcSpringOutingVo.prototype.getCurrKey = function () {
        var lotteryNum = this.cfg.lotteryNum;
        var lotteryData = null;
        for (var i = this.cfg.lotteryNum.length - 1; i >= 0; i--) {
            lotteryData = lotteryNum[i];
            if (this.ainfo.lotterynum >= lotteryData["needNum"]) {
                return i + 1;
            }
        }
        return 0;
    };
    AcSpringOutingVo.prototype.getNextNeedNum = function (cur) {
        if (cur >= this.cfg.lotteryNum.length) {
            return this.cfg.lotteryNum.length;
        }
        else {
            return this.cfg.lotteryNum[cur]["needNum"];
        }
    };
    //获得进度条百分之
    AcSpringOutingVo.prototype.getCurrVal = function () {
        // this.ainfo.lotterynum
        var cur = this.getCurrKey();
        var curNeedNum = cur == 0 ? 0 : this.cfg.lotteryNum[cur - 1]["needNum"];
        var nextNeedNum = this.getNextNeedNum(cur);
        var baseV = cur / this.cfg.lotteryNum.length;
        var pathV = this.ainfo.lotterynum > nextNeedNum ? 1 : (this.ainfo.lotterynum - curNeedNum) / (nextNeedNum - curNeedNum);
        return baseV + pathV * (1 / this.cfg.lotteryNum.length);
    };
    /**
     * 任务奖励红点
     */
    AcSpringOutingVo.prototype.isHaveTaskRedDot = function () {
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
    Object.defineProperty(AcSpringOutingVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcSpringOutingVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et;
    };
    /**
     * 任务类型的进度
     */
    AcSpringOutingVo.prototype.gettTaskNum = function (type) {
        return this.ainfo.taskinfo[type] ? this.ainfo.taskinfo[type] : 0;
    };
    /**
     * 任务的状态
     */
    AcSpringOutingVo.prototype.getTaskStatus = function (id) {
        return this.ainfo.flags[id] && this.ainfo.flags[id] == 1 ? true : false;
    };
    AcSpringOutingVo.prototype.getAvgConfig = function (id, code) {
        return this.cfg.getDialogById(id, code);
    };
    /**
     * 获得Task列表
     */
    AcSpringOutingVo.prototype.getSortTask = function () {
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
                arr[i].sortId = Number(arr[i].id);
                continue;
            }
        }
        return arr;
    };
    AcSpringOutingVo.prototype.dispose = function () {
        this.curBgId = 0;
        _super.prototype.dispose.call(this);
    };
    return AcSpringOutingVo;
}(AcBaseVo));
__reflect(AcSpringOutingVo.prototype, "AcSpringOutingVo");
