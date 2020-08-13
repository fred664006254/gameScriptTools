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
var AcNewYearSevenDaysVo = (function (_super) {
    __extends(AcNewYearSevenDaysVo, _super);
    function AcNewYearSevenDaysVo() {
        var _this = _super.call(this) || this;
        _this.taskinfo = null;
        _this.scoreinfo = null;
        _this.diffday = 0;
        _this.score = 0;
        _this.taskHistory = null;
        return _this;
    }
    AcNewYearSevenDaysVo.prototype.initData = function (data) {
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
        if (data.taskHistory) {
            this.taskHistory = data.taskHistory;
        }
        if (data.taskinfo.dayFlag && data.taskinfo.dayFlag == 1) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESFESH_NEWYEAR_LIST);
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_RESFESH_NEWYEAR_ITEM);
    };
    Object.defineProperty(AcNewYearSevenDaysVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et - 86400;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewYearSevenDaysVo.prototype, "isShowRedDot", {
        get: function () {
            if (this.secondRed() || this.firstRed()) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AcNewYearSevenDaysVo.prototype.secondRed = function () {
        if ((GameData.serverTime < (this.et - 1 * 86400)) && GameData.serverTime >= this.st) {
            for (var i = 1; i < 8; ++i) {
                if (this.getDayRed(i) && i == this.diffday) {
                    return true;
                }
            }
        }
        return false;
    };
    AcNewYearSevenDaysVo.prototype.getDayRed = function (day) {
        if ((GameData.serverTime < (this.et - 1 * 86400)) && GameData.serverTime >= this.st) {
            var arr = this.getCurrDayData(day - 1);
            if (this.diffday == day) {
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
            }
            else {
                if (this.taskHistory) {
                    for (var i_1 in this.taskHistory) {
                        var day_1 = Number(i_1);
                        var info = this.taskHistory[i_1];
                        if (info && info.dayFlag && info.dayFlag == 1) {
                            return true;
                        }
                        else {
                            for (var j = 0; j < arr.length; j++) {
                                if (this.getIdflagByDay(arr[j].questType, day_1) == 1) {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }
        return false;
    };
    AcNewYearSevenDaysVo.prototype.getDayTaskRed = function (day) {
        if ((GameData.serverTime < (this.et - 1 * 86400)) && GameData.serverTime >= this.st) {
            var arr = this.getCurrDayData(day - 1);
            if (this.diffday == day) {
                for (var i = 0; i < arr.length; i++) {
                    if (this.getIdflag(arr[i].questType) == 1) {
                        return true;
                    }
                }
            }
            else {
                if (this.taskHistory) {
                    for (var i_2 in this.taskHistory) {
                        var day_2 = Number(i_2);
                        var info = this.taskHistory[i_2];
                        for (var j = 0; j < arr.length; j++) {
                            if (this.getIdflagByDay(arr[j].questType, day_2) == 1) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    };
    AcNewYearSevenDaysVo.prototype.firstRed = function () {
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
    AcNewYearSevenDaysVo.prototype.getScore = function () {
        var num = 0;
        if (this.scoreinfo && this.scoreinfo.score) {
            num = this.scoreinfo.score;
        }
        return num;
    };
    // 第一页面礼包是否领取
    AcNewYearSevenDaysVo.prototype.getBtnType = function (num) {
        if (num === void 0) { num = 0; }
        if (this.scoreinfo && this.scoreinfo.info) {
            if (this.scoreinfo.info[num] && this.scoreinfo.info[num] == 1) {
                return true;
            }
            else {
                return false;
            }
        }
    };
    //  0不可领 1未领取 2已领取
    AcNewYearSevenDaysVo.prototype.getIdflag = function (questType) {
        if (questType === void 0) { questType = 0; }
        if (this.taskinfo && this.taskinfo.info && this.taskinfo.info[questType]) {
            return this.taskinfo.info[questType].flag;
        }
    };
    //  0不可领 1未领取 2已领取
    AcNewYearSevenDaysVo.prototype.getIdflagByDay = function (questType, day) {
        if (questType === void 0) { questType = 0; }
        if (this.taskHistory && this.taskHistory[day] && this.taskHistory[day].info && this.taskHistory[day].info[questType]) {
            return this.taskHistory[day].info[questType].flag;
        }
    };
    //当前任务进度
    AcNewYearSevenDaysVo.prototype.getTaskLength = function () {
        var arr = [];
        if (this.taskinfo && this.taskinfo.info) {
            for (var key in this.taskinfo.info) {
                if (this.taskinfo.info[key].flag == 2) {
                    arr.push(this.taskinfo.info[key]);
                }
            }
        }
        return arr.length;
    };
    AcNewYearSevenDaysVo.prototype.getCurrDayData = function (num) {
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
    AcNewYearSevenDaysVo.prototype.dispose = function () {
        this.taskinfo = null;
        this.scoreinfo = null;
        this.diffday = 0;
        this.score = 0;
        this.taskHistory = null;
    };
    return AcNewYearSevenDaysVo;
}(AcBaseVo));
__reflect(AcNewYearSevenDaysVo.prototype, "AcNewYearSevenDaysVo");
//# sourceMappingURL=AcNewYearSevenDaysVo.js.map