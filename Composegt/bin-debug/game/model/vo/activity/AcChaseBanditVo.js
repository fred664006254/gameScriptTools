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
var AcChaseBanditVo = (function (_super) {
    __extends(AcChaseBanditVo, _super);
    function AcChaseBanditVo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selIdx = 0;
        _this.ainfo = {};
        _this.flags = {}; //{v = 0,flags={}} --充值信息
        _this.taskinfo = {}; //{v = 0,flags={}} --充值信息
        return _this;
    }
    AcChaseBanditVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
            if (key == 'ainfo') {
                var ele = data[key];
                this.flags = ele.flags;
                this.attacknum = ele.lotterynum;
                this.taskinfo = ele.taskinfo;
                this.canatknum = ele.v || 0;
            }
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CHASEBANDIT_FRESH_ITEM);
    };
    Object.defineProperty(AcChaseBanditVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    /**
 * 累积充值领取判断
 * */
    AcChaseBanditVo.prototype.isGetRecharge = function (id) {
        var flag = false;
        if (this.flags && this.flags[id]) {
            flag = true;
        }
        return flag;
    };
    //获取累积充值数目
    AcChaseBanditVo.prototype.getChargeNum = function (questType) {
        var num = 0;
        if (this.taskinfo && this.taskinfo[questType]) {
            num = this.taskinfo[questType];
        }
        return num;
    };
    Object.defineProperty(AcChaseBanditVo.prototype, "isShowRedDot", {
        get: function () {
            if (!this.cfg) {
                return false;
            }
            if (this.canatknum > 0 && this.attacknum < this.cfg.num) {
                return true;
            }
            if (this.isHaveTaskRedDot()) {
                return true;
            }
            // 宝箱
            for (var i = 0; i < this.cfg.lotteryNum.length; i++) {
                var tmprcfg = this.cfg.lotteryNum[i];
                if ((!this.ainfo.flags || !this.ainfo.flags[i + 1]) && this.ainfo.lotterynum >= tmprcfg.needNum) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 任务奖励红点
     */
    AcChaseBanditVo.prototype.isHaveTaskRedDot = function () {
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
    /**
     * 任务类型的进度
     */
    AcChaseBanditVo.prototype.gettTaskNum = function (type) {
        return this.ainfo.taskinfo[type] ? this.ainfo.taskinfo[type] : 0;
    };
    /**
     * 任务的状态
     */
    AcChaseBanditVo.prototype.getTaskStatus = function (id) {
        return this.ainfo.flags[id] && this.ainfo.flags[id] == 1 ? true : false;
    };
    Object.defineProperty(AcChaseBanditVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcChaseBanditVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et;
    };
    AcChaseBanditVo.prototype.dispose = function () {
        this.selIdx = 0;
        this.taskinfo = {}; //{v = 0,flags={}} --充值信息
        this.flags = {}; //{v = 0,flags={}} --充值信息
        _super.prototype.dispose.call(this);
    };
    return AcChaseBanditVo;
}(AcBaseVo));
__reflect(AcChaseBanditVo.prototype, "AcChaseBanditVo");
