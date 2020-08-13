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
var AcHotelVo = (function (_super) {
    __extends(AcHotelVo, _super);
    function AcHotelVo() {
        return _super.call(this) || this;
    }
    AcHotelVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ANNIVERS_REFRESH);
    };
    Object.defineProperty(AcHotelVo.prototype, "isFree", {
        /**
         * 是否免费
         */
        get: function () {
            var deltaT = this.et - GameData.serverTime - 86400 * 1;
            if (deltaT < 0) {
                return false;
            }
            return this.isfree == 1 ? true : false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 抽奖的次数
     */
    AcHotelVo.prototype.lotteryNum = function () {
        return this.ainfo.v;
    };
    /**
     * 返回领没领
     */
    AcHotelVo.prototype.boxStatus = function (id) {
        return (this.ainfo.flags[id] && this.ainfo.flags[id] == 1) ? true : false;
    };
    /**
     * 任务类型的进度
     */
    AcHotelVo.prototype.gettTaskNum = function (type) {
        return this.binfo.task[type] ? this.binfo.task[type] : 0;
    };
    /**
     * 任务的状态
     */
    AcHotelVo.prototype.getTaskStatus = function (id) {
        return this.binfo.flags[id] && this.binfo.flags[id] == 1 ? true : false;
    };
    /**
     * 获得Task列表
     */
    AcHotelVo.prototype.getSortTask = function () {
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
    /**
     *  充值奖励 充值档位 领没领
     */
    AcHotelVo.prototype.isReceiveRecharge = function (id) {
        return this.cinfo && this.cinfo.flags[id] == 1 ? true : false;
    };
    /**
     * 充值的进度
     */
    AcHotelVo.prototype.getRechargeValue = function () {
        return this.cinfo && this.cinfo.v ? this.cinfo.v : 0;
    };
    /**
     * 获得充值奖励的配置
     */
    AcHotelVo.prototype.getSortRecharge = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var rechargeData = cfg.rechargeList();
        for (var i = 0; i < rechargeData.length; i++) {
            if (this.isReceiveRecharge(rechargeData[i].id)) {
                rechargeData[i].sortId = rechargeData.length + Number(rechargeData[i].id);
                continue;
            }
            else if (this.getRechargeValue() >= rechargeData[i].needGem) {
                rechargeData[i].sortId = (Number(rechargeData[i].id)) - rechargeData.length - 1;
                continue;
            }
            else {
                rechargeData[i].sortId = Number(rechargeData[i].id);
                continue;
            }
        }
        return rechargeData;
    };
    Object.defineProperty(AcHotelVo.prototype, "isShowRedDot", {
        /**
         * 红点显示
         */
        get: function () {
            if (this.isStart == false) {
                return false;
            }
            return this.isFree || this.isHaveTaskRedDot() || this.isHaveRechargeRedDot() || this.isHaveBoxDot();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 任务奖励红点
     */
    AcHotelVo.prototype.isHaveTaskRedDot = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (!cfg) {
            return false;
        }
        for (var i = 0; i < cfg.getTaskList().length; i++) {
            if (this.gettTaskNum(cfg.getTaskList()[i].questType) >= cfg.getTaskList()[i].value) {
                if (!this.getTaskStatus(cfg.getTaskList()[i].id)) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * 获得Task列表
     */
    AcHotelVo.prototype.isHaveRechargeRedDot = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (!cfg) {
            return false;
        }
        for (var i = 0; i < cfg.rechargeList().length; i++) {
            if (this.getRechargeValue() >= cfg.rechargeList()[i].needGem) {
                if (!this.isReceiveRecharge(cfg.rechargeList()[i].id)) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * 宝箱的红点
     */
    AcHotelVo.prototype.isHaveBoxDot = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (!cfg) {
            return false;
        }
        for (var i = 0; i < cfg.getBoxList().length; i++) {
            if (this.lotteryNum() >= cfg.getBoxList()[i].needNum) {
                if (!this.boxStatus(cfg.getBoxList()[i].id)) {
                    return true;
                }
            }
        }
        return false;
    };
    Object.defineProperty(AcHotelVo.prototype, "acTime", {
        get: function () {
            var et = this.et - 86400;
            return App.DateUtil.getOpenLocalTime(this.st, et, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcHotelVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et - 86400;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcHotelVo.prototype.dispose = function () {
        this.isfree = 0;
        this.ainfo = null;
        this.binfo = null;
        this.cinfo = null;
        _super.prototype.dispose.call(this);
    };
    return AcHotelVo;
}(AcBaseVo));
__reflect(AcHotelVo.prototype, "AcHotelVo");
//# sourceMappingURL=AcHotelVo.js.map