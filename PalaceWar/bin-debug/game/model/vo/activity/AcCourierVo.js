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
var AcCourierVo = (function (_super) {
    __extends(AcCourierVo, _super);
    function AcCourierVo() {
        var _this = _super.call(this) || this;
        _this.taskinfo = null;
        _this.scoreinfo = null;
        _this.diffday = 0;
        _this.score = 0;
        return _this;
    }
    AcCourierVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        if (data.taskinfo) {
            this.taskinfo = data.taskinfo;
            if (data.taskinfo.dayFlag && data.taskinfo.dayFlag == 1) {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESFESH_COURIER_LIST);
            }
        }
        if (data.scoreinfo) {
            this.scoreinfo = data.scoreinfo;
        }
        if (data.diffday) {
            this.diffday = data.diffday;
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESFESH_COURIER_ITEM);
    };
    Object.defineProperty(AcCourierVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et - 86400;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCourierVo.prototype, "isShowRedDot", {
        get: function () {
            if (this.isStart == false) {
                return false;
            }
            if (this.secondRed() || this.firstRed()) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AcCourierVo.prototype.secondRed = function () {
        if (GameData.serverTime >= this.et) {
            return false;
        }
        var day = this.diffday - 1;
        if (this.diffday == 8) {
            day = 6;
        }
        var arr = this.getCurrDayData(day);
        if (this.taskinfo && this.taskinfo.dayFlag && this.taskinfo.dayFlag == 1) {
            return true;
        }
        else {
            for (var i = 0; i < arr.length; i++) {
                if (this.getIdflag(arr[i].questType, this.diffday) == 1) {
                    return true;
                }
            }
        }
        return false;
    };
    AcCourierVo.prototype.firstRed = function () {
        var arr = [];
        var _cfgObj = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (!_cfgObj) {
            return false;
        }
        if (GameData.serverTime >= this.et) {
            return false;
        }
        var curr_arr = _cfgObj.itemListCfg.stagePoint;
        for (var key in curr_arr) {
            if (Number(key) >= 0) {
                if (this.getScore() >= (curr_arr[key]).needScore && this.getBtnType(Number(key) + 1) == false) {
                    return true;
                }
            }
        }
        return false;
    };
    //获取当前分数
    AcCourierVo.prototype.getScore = function () {
        var num = 0;
        if (this.scoreinfo && this.scoreinfo.score) {
            num = this.scoreinfo.score;
        }
        return num;
    };
    // 第一页面礼包是否领取
    AcCourierVo.prototype.getBtnType = function (num) {
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
    AcCourierVo.prototype.getIdflag = function (questType, curday) {
        if (questType === void 0) { questType = 0; }
        var flag = 0;
        if (this.diffday > 7) {
            return flag;
        }
        if (this.taskinfo.info && this.taskinfo.info[questType] && curday == this.diffday) {
            flag = this.taskinfo.info[questType].flag;
        }
        return flag;
    };
    //当前任务进度
    AcCourierVo.prototype.getTaskLength = function () {
        var arr = [];
        if (this.taskinfo.info) {
            for (var key in this.taskinfo.info) {
                if (this.taskinfo.info[key].flag == 2) {
                    arr.push(this.taskinfo.info[key]);
                }
            }
        }
        return arr.length;
    };
    AcCourierVo.prototype.getCurrDayData = function (num) {
        if (num === void 0) { num = 0; }
        var newArr = [];
        var _cfgObj = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (_cfgObj && _cfgObj.itemListCfg && _cfgObj.itemListCfg.stageDailyTask) {
            var dailyTask_arr = _cfgObj.itemListCfg.stageDailyTask;
            var _dailyTask_arr = [];
            for (var key in dailyTask_arr) {
                if (Number(key)) {
                    _dailyTask_arr.push(dailyTask_arr[key]);
                }
            }
            var arr = [];
            arr = _dailyTask_arr[num];
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
        }
        return newArr;
    };
    AcCourierVo.prototype.dispose = function () {
        this.taskinfo = null;
        this.scoreinfo = null;
        this.diffday = 0;
        this.score = 0;
    };
    return AcCourierVo;
}(AcBaseVo));
__reflect(AcCourierVo.prototype, "AcCourierVo");
//# sourceMappingURL=AcCourierVo.js.map