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
var AcNewYearVo = (function (_super) {
    __extends(AcNewYearVo, _super);
    function AcNewYearVo() {
        var _this = _super.call(this) || this;
        _this.taskinfo = null;
        _this.scoreinfo = null;
        _this.diffday = 0;
        _this.score = 0;
        return _this;
    }
    AcNewYearVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        if (data.taskinfo) {
            this.taskinfo = data.taskinfo;
        }
        if (data.scoreinfo) {
            this.scoreinfo = data.scoreinfo;
        }
        if (data.diffday) {
            this.diffday = data.diffday;
        }
        if (data.taskinfo.dayFlag && data.taskinfo.dayFlag == 1) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESFESH_NEWYEAR_LIST);
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_RESFESH_NEWYEAR_ITEM);
    };
    Object.defineProperty(AcNewYearVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et - 86400;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewYearVo.prototype, "isShowRedDot", {
        get: function () {
            if (this.secondRed() || this.firstRed()) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AcNewYearVo.prototype.secondRed = function () {
        var arr = this.getCurrDayData(this.diffday - 1);
        if (this.taskinfo && this.taskinfo.dayFlag && this.taskinfo.dayFlag == 1) {
            return true;
        }
        else {
            for (var i = 0; i < arr.length; i++) {
                if (this.getIdflag(arr[i].questType) == 1) {
                    return true;
                }
            }
        }
        return false;
    };
    AcNewYearVo.prototype.firstRed = function () {
        var arr = [];
        var _cfgObj = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (!_cfgObj) {
            return false;
        }
        var curr_arr = _cfgObj.itemListCfg.totalScoreReward;
        for (var key in curr_arr) {
            if (Number(key)) {
                if (this.getScore() >= (curr_arr[key]).needScore && this.getBtnType(Number(key)) == false) {
                    return true;
                }
            }
        }
        return false;
    };
    //获取当前分数
    AcNewYearVo.prototype.getScore = function () {
        return this.scoreinfo.score;
    };
    // 第一页面礼包是否领取
    AcNewYearVo.prototype.getBtnType = function (num) {
        if (num === void 0) { num = 0; }
        if (this.scoreinfo.info) {
            if (this.scoreinfo.info[num] && this.scoreinfo.info[num] == 1) {
                return true;
            }
            else {
                return false;
            }
        }
    };
    //  0不可领 1未领取 2已领取
    AcNewYearVo.prototype.getIdflag = function (questType) {
        if (questType === void 0) { questType = 0; }
        if (this.taskinfo.info[questType]) {
            return this.taskinfo.info[questType].flag;
        }
    };
    //当前任务进度
    AcNewYearVo.prototype.getTaskLength = function () {
        var arr = [];
        for (var key in this.taskinfo.info) {
            if (this.taskinfo.info[key].flag == 2) {
                arr.push(this.taskinfo.info[key]);
            }
        }
        return arr.length;
    };
    AcNewYearVo.prototype.getCurrDayData = function (num) {
        if (num === void 0) { num = 0; }
        var _cfgObj = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var dailyTask_arr = _cfgObj.itemListCfg.dailyTask;
        var _dailyTask_arr = [];
        for (var key in dailyTask_arr) {
            if (Number(key)) {
                _dailyTask_arr.push(dailyTask_arr[key]);
            }
        }
        var arr = [];
        arr = _dailyTask_arr[num];
        var newArr = [];
        for (var key in arr) {
            if (arr[key].sortId) {
                newArr.push(arr[key]);
            }
        }
        newArr.sort(function (a, b) {
            if (a.sortId > b.sortId)
                return 1;
            else if (a.sortId == b.sortId)
                return 0;
            return -1;
        });
        return newArr;
    };
    AcNewYearVo.prototype.dispose = function () {
        this.taskinfo = null;
        this.scoreinfo = null;
        this.diffday = 0;
        this.score = 0;
    };
    return AcNewYearVo;
}(AcBaseVo));
__reflect(AcNewYearVo.prototype, "AcNewYearVo");
//# sourceMappingURL=AcNewYearVo.js.map