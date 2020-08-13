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
 * 电玩大本营VO
 */
var AcArcadeVo = (function (_super) {
    __extends(AcArcadeVo, _super);
    function AcArcadeVo() {
        var _this = _super.call(this) || this;
        _this.charge = null;
        _this.coin = 0;
        _this.isfree = 0;
        _this.lottery = null;
        _this.score = 0;
        _this.shop = null;
        _this.task = null;
        return _this;
    }
    // aid: "arcade"
    // charge: {v: 0, flags: {}}
    // code: 1
    // coin: 0
    // et: 1561720200
    // gap: 0
    // isfree: 1
    // lottery: {v: 0, flags: {}}
    // score: 0
    // shop: {}
    // st: 1559491200
    // task: {v: {}, flags: {}}
    AcArcadeVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    /**check free time */
    AcArcadeVo.prototype.isFree = function () {
        if (this.isfree == 1) {
            return true;
        }
        return false;
    };
    /**get shop number */
    AcArcadeVo.prototype.getShopBuyNumById = function (id) {
        return this.shop[id] ? this.shop[id] : 0;
    };
    /** get game coin time */
    AcArcadeVo.prototype.getCoin = function () {
        return this.coin;
    };
    /** score */
    AcArcadeVo.prototype.getScore = function () {
        return this.score;
    };
    AcArcadeVo.prototype.lotteryValue = function () {
        return this.lottery.v ? this.lottery.v : 0;
    };
    /**charge value */
    AcArcadeVo.prototype.getChargeValue = function () {
        return this.charge && this.charge.v ? this.charge.v : 0;
    };
    /**charge flag for id */
    AcArcadeVo.prototype.getChargeFlag = function (chargeid) {
        return this.charge && this.charge.flags[chargeid] ? true : false;
    };
    /**task value for task type */
    AcArcadeVo.prototype.getTaskValue = function (taskType) {
        return this.task && this.task.v[taskType] ? this.task.v[taskType] : 0;
    };
    /**task flag for task id */
    AcArcadeVo.prototype.getTaskFlag = function (taskId) {
        return this.task && this.task.flags[taskId] ? true : false;
    };
    /**
     * 获得Task列表
     */
    AcArcadeVo.prototype.getSortTask = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var taskData = cfg.taskItemListCfg;
        for (var i = 0; i < taskData.length; i++) {
            if (this.getTaskFlag(taskData[i].id)) {
                taskData[i].sortId = taskData.length + Number(taskData[i].id);
                continue;
            }
            else if (this.getTaskValue(taskData[i].questType) >= taskData[i].value) {
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
     * 获得Task列表
     */
    AcArcadeVo.prototype.getSortRecharge = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var chargeData = cfg.rechargeItemListCfg;
        for (var i = 0; i < chargeData.length; i++) {
            if (this.getChargeFlag(chargeData[i].id)) {
                chargeData[i].sortId = chargeData.length + Number(chargeData[i].id);
                continue;
            }
            else if (this.getChargeValue() >= chargeData[i].needGem) {
                chargeData[i].sortId = (Number(chargeData[i].id)) - chargeData.length - 1;
                continue;
            }
            else {
                chargeData[i].sortId = Number(chargeData[i].id);
                continue;
            }
        }
        return chargeData;
    };
    Object.defineProperty(AcArcadeVo.prototype, "isShowRedDot", {
        /**
         * 红点显示
         */
        get: function () {
            if (this.isStart == false) {
                return false;
            }
            return this.checkGameRedDot() || this.checkRechargeRedDot() || this.checTaskRedDot() || this.checkScoreRedDot();
        },
        enumerable: true,
        configurable: true
    });
    AcArcadeVo.prototype.checkGameRedDot = function () {
        if (this.checkIsInEndShowTime()) {
            return false;
        }
        return this.isFree() || this.getCoin() > 0;
    };
    /**
    * 充值的小红点
    */
    AcArcadeVo.prototype.checkRechargeRedDot = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var rechargeData = cfg.rechargeItemListCfg;
        for (var i = 0; i < rechargeData.length; i++) {
            if ((!this.getChargeFlag(rechargeData[i].id)) && this.getChargeValue() >= rechargeData[i].needGem) {
                return true;
            }
        }
        return false;
    };
    /**
    * 任务的小红点
    */
    AcArcadeVo.prototype.checTaskRedDot = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var rechargeData = cfg.taskItemListCfg;
        for (var i = 0; i < rechargeData.length; i++) {
            if ((!this.getTaskFlag(rechargeData[i].id)) && this.getTaskValue(rechargeData[i].questType) >= rechargeData[i].value) {
                return true;
            }
        }
        return false;
    };
    /**
    * 任务的小红点
    */
    AcArcadeVo.prototype.checkScoreRedDot = function () {
        if (this.getScore() > 0) {
            return true;
        }
        return false;
    };
    Object.defineProperty(AcArcadeVo.prototype, "acCountDown", {
        get: function () {
            var et = this.et - this.config.extraTime * 86400;
            if (et < GameData.serverTime) {
                return LanguageManager.getlocal("acPunishEnd");
            }
            return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
        },
        enumerable: true,
        configurable: true
    });
    AcArcadeVo.prototype.dispose = function () {
        this.charge = null;
        this.coin = 0;
        this.isfree = 0;
        this.lottery = null;
        this.score = 0;
        this.shop = null;
        this.task = null;
        _super.prototype.dispose.call(this);
    };
    return AcArcadeVo;
}(AcBaseVo));
__reflect(AcArcadeVo.prototype, "AcArcadeVo");
//# sourceMappingURL=AcArcadeVo.js.map