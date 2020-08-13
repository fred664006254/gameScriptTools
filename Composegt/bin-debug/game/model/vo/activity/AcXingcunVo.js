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
var AcXingcunVo = (function (_super) {
    __extends(AcXingcunVo, _super);
    function AcXingcunVo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.diffday = 0; //真田幸村活动 活动第几天",
        _this.sumnum = 0; //真田幸村活动 完成任务的天数",
        _this.finalflag = 0; //真田幸村活动 总奖励领取标识",
        _this.tinfo = []; //真田幸村活动 第几天 任务信息{task = {}, flags = {}} task各个任务",
        return _this;
    }
    AcXingcunVo.prototype.initData = function (data) {
        _super.prototype.initData.call(this, data);
        this.diffday = data.diffday;
        this.sumnum = data.sumnum;
        this.finalflag = data.finalflag;
        this.tinfo = data.tinfo;
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_XINGCUN_TASK_REFRESH);
    };
    AcXingcunVo.prototype.getCollectFlag = function (day, tid) {
        if (this.tinfo["" + day]) {
            return this.tinfo["" + day].flags["" + tid];
        }
        return null;
    };
    AcXingcunVo.prototype.getTaskStatus = function (day, tid) {
        if (this.tinfo["" + day]) {
            return this.tinfo["" + day].task["" + tid] || 0;
        }
        return 0;
    };
    AcXingcunVo.prototype.isIconGet = function (day) {
        return this.getCollectFlag(day, "1");
    };
    //是否已领取某天的奖励
    AcXingcunVo.prototype.isAllCollect = function (day) {
        var cfg = this.config;
        var daycfg = cfg.dailyTask[day + ""];
        for (var key in daycfg) {
            if (daycfg.hasOwnProperty(key)) {
                if (!this.getCollectFlag(day, Number(key) + 1)) {
                    return false;
                }
            }
        }
        return true;
    };
    //某任务可领取
    AcXingcunVo.prototype.isTaskCollectEnable = function (day, taskid) {
        // if(this.getTaskStatus(day,tid));
        var cfg = this.config;
        var daycfg2 = cfg.dailyTask[day + ""];
        var daycfg = undefined;
        for (var index = 0; index < daycfg2.length; index++) {
            var element = daycfg2[index];
            if (element.id == "" + taskid) {
                daycfg = element;
                break;
            }
        }
        if (this.getCollectFlag("" + day, daycfg.id)) {
            return false;
        }
        var getv = this.getTaskStatus("" + day, daycfg.questType);
        if (getv > 0 && daycfg.value <= getv) {
            return true;
        }
        return false;
    };
    //某天可领取
    AcXingcunVo.prototype.isCollectEnable = function (day) {
        var cfg = this.config;
        var daycfg = cfg.dailyTask[day + ""];
        for (var key in daycfg) {
            if (daycfg.hasOwnProperty(key)) {
                var element = daycfg[key];
                if (element.value <= this.getTaskStatus(day, element.questType) && !this.getCollectFlag(day, element.id)) {
                    return true;
                }
            }
        }
        return false;
    };
    AcXingcunVo.prototype.isBigIconCollectEnable = function (day) {
        //大金币已领取
        if (this.getCollectFlag(day, 1)) {
            return false;
        }
        var cfg = this.config;
        var daycfg = cfg.dailyTask[day + ""];
        for (var key in daycfg) {
            if (Number(key) > 0 && daycfg.hasOwnProperty(key)) {
                if (!this.getCollectFlag(day, Number(key) + 1)) {
                    return false;
                }
            }
        }
        return true;
    };
    Object.defineProperty(AcXingcunVo.prototype, "isShowRedDot", {
        get: function () {
            var cfg = this.config;
            for (var key in cfg.dailyTask) {
                if (cfg.dailyTask.hasOwnProperty(key)) {
                    if (this.isCollectEnable(key)) {
                        return true;
                    }
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AcXingcunVo.prototype.dispose = function () {
        this.diffday = 0; //真田幸村活动 活动第几天",
        this.sumnum = 0; //真田幸村活动 完成任务的天数",
        this.finalflag = 0; //真田幸村活动 总奖励领取标识",
        this.tinfo = []; //真田幸村活动 第几天 任务信息{task = {}, flags = {}} task各个任务",
        _super.prototype.dispose.call(this);
    };
    return AcXingcunVo;
}(AcBaseVo));
__reflect(AcXingcunVo.prototype, "AcXingcunVo");
