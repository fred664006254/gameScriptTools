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
var AcMergeActiveVo = (function (_super) {
    __extends(AcMergeActiveVo, _super);
    function AcMergeActiveVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AcMergeActiveVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_MERGEACTIVE_REFRESHVO);
    };
    Object.defineProperty(AcMergeActiveVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMergeActiveVo.prototype, "isShowRedDot", {
        get: function () {
            // 签到红点
            if (this.isHaveSignRedDot()) {
                return true;
            }
            // 任务红点
            if (this.isHaveTaskRedDot()) {
                return true;
            }
            // 充值赠送红点
            if (this.isHaveRechargeRedDot()) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 充值赠送红点
     */
    AcMergeActiveVo.prototype.isHaveRechargeRedDot = function () {
        for (var i = 0; i < this.diffday; i++) {
            var total = this.cfg["totalList" + (i + 1)];
            if (total) {
                for (var j = 0; j < total.length; j++) {
                    var item = total[j];
                    if (this.cinfo && this.cinfo[i + 1] && (!this.cinfo[i + 1].flags[j + 1]) && this.cinfo[i + 1].v >= item.needGem) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    /**
     * 签到红点
     */
    AcMergeActiveVo.prototype.isHaveSignRedDot = function () {
        for (var i = 0; i < Math.min(6, this.linfo.days); i++) {
            if ((!this.linfo) || (!this.linfo.flags) || (!this.linfo.flags[i + 1])) {
                return true;
            }
        }
        return false;
    };
    /**
     * 任务奖励红点
     */
    AcMergeActiveVo.prototype.isHaveTaskRedDot = function () {
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
    Object.defineProperty(AcMergeActiveVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcMergeActiveVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et;
    };
    /**
     * 任务类型的进度
     */
    AcMergeActiveVo.prototype.gettTaskNum = function (type) {
        return this.tinfo.task[type] ? this.tinfo.task[type] : 0;
    };
    /**
     * 任务的状态
     */
    AcMergeActiveVo.prototype.getTaskStatus = function (id) {
        return this.tinfo.flags[id] && this.tinfo.flags[id] == 1 ? true : false;
    };
    /**
     * 获得Task列表
     */
    AcMergeActiveVo.prototype.getSortTask = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var taskData = cfg.getTaskList();
        for (var i = 0; i < taskData.length; i++) {
            if (this.getTaskStatus(taskData[i].id)) {
                taskData[i].sortId = taskData.length + Number(taskData[i].id);
                continue;
            }
            else if (this.gettTaskNum(taskData[i].questType) >= taskData[i].value) {
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
    AcMergeActiveVo.prototype.getSortShop = function () {
        var retData = [];
        for (var i = this.diffday - 1; i >= 0; i--) {
            var items = this.cfg["itemsList" + (i + 1)];
            if (items) {
                for (var j = 0; j < items.length; j++) {
                    var item = items[j];
                    retData.push({
                        itemID: item.itemID,
                        limit: item.limit,
                        price: item.price,
                        rebate_price: item.rebate_price,
                        day: i + 1,
                        shopId: j + 1
                    });
                }
            }
        }
        return retData;
    };
    AcMergeActiveVo.prototype.getSortRecharge = function () {
        var retData = [];
        // 不是今天，但还未领取的
        for (var i = 0; i < this.diffday - 1; i++) {
            var total_1 = this.cfg["totalList" + (i + 1)];
            if (total_1) {
                for (var j = 0; j < total_1.length; j++) {
                    var item = total_1[j];
                    if (this.cinfo && this.cinfo[i + 1] && (!this.cinfo[i + 1].flags[j + 1]) && this.cinfo[i + 1].v >= item.needGem) {
                        // 之前的，达到但未领取的
                        retData.push({
                            needGem: item.needGem,
                            getReward: item.getReward,
                            day: i + 1,
                            rechargeId: j + 1
                        });
                    }
                }
            }
        }
        // 今天的
        var total = this.cfg["totalList" + this.diffday];
        if (total) {
            for (var j = 0; j < total.length; j++) {
                var item = total[j];
                if (this.cinfo && this.cinfo[this.diffday] && (!this.cinfo[this.diffday].flags[j + 1])) {
                    retData.push({
                        needGem: item.needGem,
                        getReward: item.getReward,
                        day: this.diffday,
                        rechargeId: j + 1
                    });
                }
            }
        }
        return retData;
    };
    AcMergeActiveVo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcMergeActiveVo;
}(AcBaseVo));
__reflect(AcMergeActiveVo.prototype, "AcMergeActiveVo");
