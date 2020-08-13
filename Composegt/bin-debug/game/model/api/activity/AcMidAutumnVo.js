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
/**
  * 中秋活动 的 vo
  * @author 张朝阳
  * date 2018/8/28
  * @class AcMidAutumnVo
  */
var AcMidAutumnVo = (function (_super) {
    __extends(AcMidAutumnVo, _super);
    function AcMidAutumnVo() {
        return _super.call(this) || this;
    }
    AcMidAutumnVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ACMIDAUTUMN_TASKANDRECHARGE);
    };
    Object.defineProperty(AcMidAutumnVo.prototype, "isFree", {
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
    AcMidAutumnVo.prototype.lotteryNum = function () {
        return this.ainfo.v;
    };
    /**
     * 返回领没领
     */
    AcMidAutumnVo.prototype.boxStatus = function (id) {
        return (this.ainfo.flags[id] && this.ainfo.flags[id] == 1) ? true : false;
    };
    /**
     * 任务类型的进度
     */
    AcMidAutumnVo.prototype.gettTaskNum = function (type) {
        return this.binfo.task[type] ? this.binfo.task[type] : 0;
    };
    /**
     * 任务的状态
     */
    AcMidAutumnVo.prototype.getTaskStatus = function (id) {
        return this.binfo.flags[id] && this.binfo.flags[id] == 1 ? true : false;
    };
    /**
     * 获得Task列表
     */
    AcMidAutumnVo.prototype.getSortTask = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var taskData = cfg.getTaskList();
        var arr = [];
        for (var i = 0; i < taskData.length; i++) {
            if (taskData[i].questType == "1") {
                var openDay = App.DateUtil.getActivityDay(this.et, this.st) - 1;
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
    /**
     *  充值奖励 充值档位 领没领
     */
    AcMidAutumnVo.prototype.isReceiveRecharge = function (id) {
        return this.cinfo && this.cinfo.flags[id] == 1 ? true : false;
    };
    /**
     * 充值的进度
     */
    AcMidAutumnVo.prototype.getRechargeValue = function () {
        return this.cinfo && this.cinfo.v ? this.cinfo.v : 0;
    };
    /**
     * 获得充值奖励的配置
     */
    AcMidAutumnVo.prototype.getSortRecharge = function () {
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
    Object.defineProperty(AcMidAutumnVo.prototype, "isShowRedDot", {
        /**
         * 红点显示
         */
        get: function () {
            return this.isFree || this.isHaveTaskRedDot() || this.isHaveRechargeRedDot() || this.isHaveBoxDot();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 任务奖励红点
     */
    AcMidAutumnVo.prototype.isHaveTaskRedDot = function () {
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
    AcMidAutumnVo.prototype.isHaveRechargeRedDot = function () {
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
    AcMidAutumnVo.prototype.isHaveBoxDot = function () {
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
    Object.defineProperty(AcMidAutumnVo.prototype, "acTime", {
        get: function () {
            var et = this.et - 86400;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcMidAutumnVo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcMidAutumnVo;
}(AcBaseVo));
__reflect(AcMidAutumnVo.prototype, "AcMidAutumnVo");
