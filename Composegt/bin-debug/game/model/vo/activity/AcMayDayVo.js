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
var AcMayDayVo = (function (_super) {
    __extends(AcMayDayVo, _super);
    function AcMayDayVo() {
        var _this = _super.call(this) || this;
        _this.ainfo = null;
        _this.binfo = null;
        _this.cinfo = null;
        _this.cinfoTask = 0;
        _this.cinfoFlag = null;
        _this.isfree = false;
        return _this;
    }
    AcMayDayVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        this.isfree = data.isfree;
        if (data.ainfo) {
            this.ainfo = data.ainfo;
        }
        if (data.binfo) {
            this.binfo = data.binfo;
        }
        if (data.cinfo) {
            this.cinfo = data.cinfo;
            if (data.cinfo.task) {
                this.cinfoTask = data.cinfo.task;
            }
            if (data.cinfo.flags) {
                this.cinfoFlag = data.cinfo.flags;
            }
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM);
    };
    //获取抽奖的次数
    AcMayDayVo.prototype.getTurnTotal = function () {
        return this.ainfo.v;
    };
    //获取累积充值数目
    AcMayDayVo.prototype.getChargeNum = function () {
        return Number(this.binfo.v);
    };
    //获取任务完成次数
    AcMayDayVo.prototype.getTask = function (type) {
        if (this.cinfoTask[type]) {
            return this.cinfoTask[type];
        }
        return 0;
    };
    /*任务奖励是否领取*/
    AcMayDayVo.prototype.isGetTaskReward = function (key) {
        if (this.cinfoFlag[key] && this.cinfoFlag[key] == 1) {
            return true;
        }
        return false;
    };
    /*转盘进度宝箱领取判断*/
    AcMayDayVo.prototype.isGetTurnProgress = function (id) {
        if (this.ainfo && this.ainfo.flags) {
            for (var key in this.ainfo.flags) {
                if (this.ainfo.flags[id] == 1) {
                    return true;
                }
            }
            return false;
        }
    };
    /*累积充值领取判断*/
    AcMayDayVo.prototype.isGetRecharge = function (id) {
        if (this.binfo && this.binfo.flags) {
            for (var key in this.binfo.flags) {
                if (this.binfo.flags[id] == 1) {
                    return true;
                }
            }
            return false;
        }
    };
    Object.defineProperty(AcMayDayVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcMayDayVo.prototype.getpublicRedhot1 = function () {
        //奖励进度宝箱
        var cfg = this.cfg;
        if (!cfg) {
            return false;
        }
        var curTurn = this.getTurnTotal();
        for (var i in cfg.lotteryNum) {
            var unit = cfg.lotteryNum[i];
            if (curTurn >= unit.needNum && this.isGetTurnProgress(Number(i) + 1) == false) {
                return true;
            }
        }
        //免费抽奖
        if (this.isFree()) {
            return true;
        }
        return false;
    };
    AcMayDayVo.prototype.getpublicRedhot2 = function () {
        //充值
        var cfg = this.cfg;
        if (!cfg) {
            return false;
        }
        var curCharge = this.getChargeNum();
        for (var i in cfg.recharge) {
            var unit = cfg.recharge[i];
            if (curCharge >= unit.needGem && this.isGetRecharge(Number(i) + 1) == false) {
                return true;
            }
        }
        return false;
    };
    AcMayDayVo.prototype.getpublicRedhot3 = function () {
        //任务
        var cfg = this.cfg;
        if (!cfg) {
            return false;
        }
        for (var i = 0; i < cfg.task.length; i++) {
            var unit = cfg.task[i];
            var taskNum = this.getTask(unit.questType);
            var taskBoo = this.isGetTaskReward(i + 1);
            if (taskNum >= unit.value && taskBoo == false) {
                return true;
            }
        }
        return false;
    };
    Object.defineProperty(AcMayDayVo.prototype, "isShowRedDot", {
        get: function () {
            if (this.getpublicRedhot1()) {
                return true;
            }
            if (this.getpublicRedhot2()) {
                return true;
            }
            if (this.getpublicRedhot3()) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AcMayDayVo.prototype.isFree = function () {
        var in_acty = GameData.serverTime < (this.et - 86400);
        return this.isfree && in_acty;
    };
    Object.defineProperty(AcMayDayVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et - 86400;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcMayDayVo.prototype.getArr = function (key) {
        var arr = [];
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (!cfg) {
            return [];
        }
        var celeBrateList = cfg;
        for (var i in celeBrateList) {
            if (i == key) {
                for (var key2 in celeBrateList[i]) {
                    if (celeBrateList[i][key2]) {
                        var currObj = celeBrateList[i][key2];
                        if (currObj.needGem || currObj.questType || currObj.discount || currObj.limit) {
                            if (currObj.questType == 1) {
                                var openDay = App.DateUtil.getActivityDay(this.et, this.st) - 1;
                                if (openDay < currObj.value) {
                                    continue;
                                }
                            }
                            celeBrateList[i][key2].key = Number(key2) + 1;
                            if (celeBrateList[i][key2].key) {
                                arr.push(celeBrateList[i][key2]);
                            }
                        }
                    }
                }
            }
        }
        return arr;
    };
    AcMayDayVo.prototype.dispose = function () {
        this.ainfo = null;
        this.binfo = null;
        this.cinfo = null;
        this.cinfoFlag = null;
    };
    return AcMayDayVo;
}(AcBaseVo));
__reflect(AcMayDayVo.prototype, "AcMayDayVo");
