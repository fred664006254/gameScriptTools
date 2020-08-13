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
var AcNewYearCrackerVo = (function (_super) {
    __extends(AcNewYearCrackerVo, _super);
    function AcNewYearCrackerVo() {
        var _this = _super.call(this) || this;
        _this.taskinfo = null;
        _this.diffday = 0;
        _this.crackerNum = 0;
        _this.rinfo = null;
        return _this;
    }
    AcNewYearCrackerVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        if (data.taskinfo) {
            this.taskinfo = data.taskinfo;
        }
        if (data.diffday) {
            this.diffday = data.diffday;
            if (data.diffday > 7) {
                this.diffday = 7;
            }
        }
        this.crackerNum = data.crackerNum;
        this.rinfo = data.rinfo;
        // if(data.taskinfo.dayFlag&&data.taskinfo.dayFlag==1)
        // {
        // 	App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESFESH_NEWYEAR_LIST);
        // }
        // this.v = data.v;//剩余筛子数
        // this._pos = data.pos;//当前地图id
        // this._circle = data.circle;//circlereward 圈数 + 领取状况{v = 0,flags = {}}
        // this._wealthGodTimes = data.wealthGodTimes;//财神剩余次数
        // this._task = data.task;//任务相关{day = 1,v = {},flags = {}}/
        // if(data&&data.task)
        // {
        // 	this._v = data.task.v;
        // }
        // if(data.task&&data.task.day)
        // {
        // 	this._day =data.task.day;
        // }
        // if(data.task)
        // {
        // 	this._flags = data.task.flags;
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_NEWYEARCRACKER);
        // }  
    };
    Object.defineProperty(AcNewYearCrackerVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et - 86400;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcNewYearCrackerVo.prototype.getCountCd = function () {
        var et = this.et - 86400;
        var count = et - GameData.serverTime;
        var str = '';
        str = App.DateUtil.getFormatBySecond(count, 1);
        // if(count > 86400){
        // 	let tmp = Math.floor(count / 86400);
        // 	str = tmp.toString() + LanguageManager.getlocal(`date_day2`);
        // }
        return str;
    };
    Object.defineProperty(AcNewYearCrackerVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewYearCrackerVo.prototype, "isShowRedDot", {
        get: function () {
            if (this.canGetJinduReward()) {
                return true;
            }
            for (var i = 1; i <= this.diffday; ++i) {
                if (this.dayRed(i)) {
                    return true;
                }
            }
            if (this.bigBoxType) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AcNewYearCrackerVo.prototype.canGetJinduReward = function () {
        var flag = false;
        //爆竹奖励可点燃
        for (var i in this.cfg.recharge) {
            var unit = this.cfg.recharge[i];
            if (unit.needItem <= this.getCrackerNum() && !this.getJinduReward(Number(i) + 1)) {
                flag = true;
                break;
            }
        }
        return flag;
    };
    AcNewYearCrackerVo.prototype.isInActy = function () {
        var flag = false;
        if (GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400) {
            flag = true;
        }
        return flag;
    };
    AcNewYearCrackerVo.prototype.isActyEnd = function () {
        var flag = false;
        if (GameData.serverTime >= this.et) {
            flag = true;
        }
        return flag;
    };
    /**
     * 获取当前鞭炮数
     */
    AcNewYearCrackerVo.prototype.getCrackerNum = function () {
        var num = this.crackerNum;
        return num;
    };
    /**
     * 获取当前所处的建筑id
     */
    AcNewYearCrackerVo.prototype.getCurBuildId = function () {
        var num = 0;
        var curJindu = this.getCurJindu();
        if (curJindu <= 7 && curJindu >= 1) {
            num = 1;
        }
        else if (curJindu <= 14 && curJindu >= 8) {
            num = 2;
        }
        else if (curJindu <= 21 && curJindu >= 15) {
            num = 3;
        }
        return num;
    };
    /**
     * 获取当前天数
     */
    AcNewYearCrackerVo.prototype.getCurDay = function () {
        var num = Math.min(this.diffday, 7);
        return num;
    };
    /**
     * 获取当前进度
     */
    AcNewYearCrackerVo.prototype.getCurJindu = function () {
        var num = 1;
        for (var i in this.cfg.recharge) {
            var unit = this.cfg.recharge[i];
            num = Number(i) + 1;
            if (!this.getJinduReward(num)) {
                break;
            }
        }
        return num;
    };
    /**
     * 获取当前进度下所需的爆竹数
     */
    AcNewYearCrackerVo.prototype.getJinduNeedNum = function (jindu) {
        var num = 0;
        var info = this.cfg.recharge[jindu - 1];
        if (info && info.needItem) {
            num = info.needItem;
        }
        return num;
    };
    /**
     * 当前进度奖励是否被领取
     */
    AcNewYearCrackerVo.prototype.getJinduReward = function (id) {
        var flag = false;
        if (this.rinfo && this.rinfo[id] && this.rinfo[id] == 1) {
            flag = true;
        }
        return flag;
    };
    //获取当前分数
    AcNewYearCrackerVo.prototype.getScore = function () {
        return 0; //	this.scoreinfo.score;
    };
    //  0不可领 1未领取 2已领取
    AcNewYearCrackerVo.prototype.getIdflag = function (questType, currDay) {
        if (questType === void 0) { questType = 0; }
        if (this.taskinfo[currDay] && this.taskinfo[currDay][questType]) {
            return this.taskinfo[currDay][questType].flag;
        }
        return 0;
    };
    AcNewYearCrackerVo.prototype.getTaskV = function (questType, currDay) {
        if (questType === void 0) { questType = 0; }
        if (this.taskinfo[currDay] && this.taskinfo[currDay][questType]) {
            return this.taskinfo[currDay][questType].v;
        }
        return 0;
    };
    Object.defineProperty(AcNewYearCrackerVo.prototype, "bigPrize", {
        //大箱子
        get: function () {
            if (this.rinfo && this.rinfo.bigPrize && this.rinfo.bigPrize == 1) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    //根据第几天返回是否有可以领取的奖励
    AcNewYearCrackerVo.prototype.dayRed = function (day) {
        var _cfgObj = Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_NEWYEARCRACKER, this.code);
        var dailyTask_arr = _cfgObj.dailyTask;
        for (var i = 0; i < dailyTask_arr.length; i++) {
            var currTaskcfg = dailyTask_arr[day - 1];
            for (var key in currTaskcfg) {
                var taskI = currTaskcfg[key];
                var v = this.getTaskV(taskI.questType, day);
                if (v >= taskI.value && this.getIdflag(taskI.questType, day) != 2) {
                    return true;
                }
            }
        }
        return false;
    };
    //七天内任务是否有可以领奖的小红点
    AcNewYearCrackerVo.prototype.isredDot = function () {
        for (var i = 1; i <= 7; i++) {
            var boo = this.dayRed(i);
            if (boo == true) {
                return true;
            }
        }
        return false;
    };
    Object.defineProperty(AcNewYearCrackerVo.prototype, "bigBoxType", {
        //大箱子是否可以领奖
        get: function () {
            var boo = false;
            var _cfgObj = Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_NEWYEARCRACKER, this.code);
            var dailyTask_arr = _cfgObj.dailyTask;
            for (var day = 1; day < 8; day++) {
                for (var i = 0; i < dailyTask_arr.length; i++) {
                    var currTaskcfg = dailyTask_arr[day - 1];
                    for (var key in currTaskcfg) {
                        var taskI = currTaskcfg[key];
                        if (key == "t1") {
                            var v = this.getTaskV(taskI.questType, day);
                            if (v >= taskI.value && this.bigPrize != true) {
                                boo = true;
                            }
                            else {
                                boo = false;
                                return boo;
                            }
                        }
                    }
                }
            }
            return boo;
        },
        enumerable: true,
        configurable: true
    });
    AcNewYearCrackerVo.prototype.dispose = function () {
        this.diffday = null;
        this.taskinfo = null;
        this.rinfo = null;
        this.crackerNum = 0;
        _super.prototype.dispose.call(this);
    };
    return AcNewYearCrackerVo;
}(AcBaseVo));
__reflect(AcNewYearCrackerVo.prototype, "AcNewYearCrackerVo");
//# sourceMappingURL=AcNewYearCrackerVo.js.map