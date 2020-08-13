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
var AcMazeVo = (function (_super) {
    __extends(AcMazeVo, _super);
    function AcMazeVo() {
        var _this = _super.call(this) || this;
        _this.ainfo = null;
        _this.binfo = null;
        _this.cinfo = null;
        _this.isfree = 0;
        return _this;
    }
    AcMazeVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ACMAZE_TASK);
    };
    /**
     * 获取抽奖的次数
     */
    AcMazeVo.prototype.getMazeNum = function () {
        return this.ainfo.v;
    };
    /**
     * 返回奖池
     */
    AcMazeVo.prototype.getMazePool = function () {
        return this.ainfo.pool;
    };
    /**
     * 任务类型的进度
     */
    AcMazeVo.prototype.getTask = function (type) {
        var scheduleNum = this.binfo.task[type];
        if (scheduleNum == null)
            scheduleNum = 0;
        return scheduleNum;
    };
    /**
     * 返回任务奖励的领取状态
     */
    AcMazeVo.prototype.getTaskState = function (index) {
        var state = this.binfo.flags[index];
        if (state == 1) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * 获取累积充值数目
     */
    AcMazeVo.prototype.getChargeNum = function () {
        return this.cinfo.v;
    };
    Object.defineProperty(AcMazeVo.prototype, "acTimeAndHour", {
        /**
         * 活动时间
         */
        get: function () {
            var et = this.et - 86400;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMazeVo.prototype, "isFree", {
        /**
         * 是否免费
         */
        get: function () {
            var deltaT = this.et - GameData.serverTime - 86400 * 1;
            if (deltaT < 0) {
                return false;
            }
            if (this.isfree == 0) {
                return false;
            }
            else {
                return true;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 充值档位是否已经领取
    */
    AcMazeVo.prototype.isReceive = function (id) {
        if (this.cinfo.flags[id] == 1) {
            return true;
        }
        else {
            return false;
        }
    };
    Object.defineProperty(AcMazeVo.prototype, "isShowRedDot", {
        /**
         * 红点显示
         */
        get: function () {
            return this.isFree || this.isHaveTaskRedDot() || this.isHaveRechargeRedDot();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 任务奖励红点
     */
    AcMazeVo.prototype.isHaveTaskRedDot = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (!cfg) {
            return false;
        }
        for (var i = 0; i < cfg.task.length; i++) {
            if (this.getTask(cfg.task[i].questType) >= cfg.task[i].value) {
                if (!this.getTaskState(cfg.task[i].id)) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * 充值奖励红点
     */
    AcMazeVo.prototype.isHaveRechargeRedDot = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (!cfg) {
            return false;
        }
        for (var i = 0; i < cfg.recharge.length; i++) {
            if (this.getChargeNum() >= cfg.recharge[i].needGem) {
                if (!this.isReceive(cfg.recharge[i].id)) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * 获得Task列表
     */
    AcMazeVo.prototype.getSortTask = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var taskData = cfg.task;
        for (var i = 0; i < taskData.length; i++) {
            if (this.getTaskState(Number(taskData[i].id))) {
                taskData[i].sortId = taskData.length + Number(taskData[i].id);
                continue;
            }
            else if (this.getTask(Number(taskData[i].questType)) >= taskData[i].value) {
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
    AcMazeVo.prototype.getSortRecharge = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var rechargeData = cfg.recharge;
        for (var i = 0; i < rechargeData.length; i++) {
            if (this.isReceive(Number(rechargeData[i].id))) {
                rechargeData[i].sortId = rechargeData.length + Number(rechargeData[i].id);
                continue;
            }
            else if (this.getChargeNum() >= rechargeData[i].needGem) {
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
    Object.defineProperty(AcMazeVo.prototype, "acCountDown", {
        /**
         * 活动结束倒计时，格式：00：00：00
         */
        get: function () {
            var et = this.et - 86400;
            if (et < GameData.serverTime) {
                return LanguageManager.getlocal("acPunishEnd");
            }
            return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
        },
        enumerable: true,
        configurable: true
    });
    AcMazeVo.prototype.dispose = function () {
        this.ainfo = null;
        this.binfo = null;
        this.cinfo = null;
        this.isfree = 0;
        _super.prototype.dispose.call(this);
    };
    return AcMazeVo;
}(AcBaseVo));
__reflect(AcMazeVo.prototype, "AcMazeVo");
//# sourceMappingURL=AcMazeVo.js.map