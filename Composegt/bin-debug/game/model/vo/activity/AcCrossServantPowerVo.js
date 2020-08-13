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
var AcCrossServantPowerVo = (function (_super) {
    __extends(AcCrossServantPowerVo, _super);
    function AcCrossServantPowerVo() {
        var _this = _super.call(this) || this;
        _this.info = null;
        _this.taskinfo = null; //"] = "跨服门客权势活动 任务情况",
        _this.ranks = [];
        _this.zidgroup = [];
        return _this;
    }
    AcCrossServantPowerVo.prototype.initData = function (data) {
        var oldV = this.v ? this.v : 0;
        for (var key in data) {
            this[key] = data[key];
        }
        if (oldV != this.v) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CROSS_SERVANT_REFRESH);
        }
    };
    Object.defineProperty(AcCrossServantPowerVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et - 86400;
            return App.DateUtil.getOpenLocalTime(this.st + 7200, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServantPowerVo.prototype.isShowRedForTask = function () {
        var cfg = this.config;
        for (var key in cfg.task) {
            if (cfg.task.hasOwnProperty(key)) {
                var value = cfg.task[key].value;
                var questType = cfg.task[key].questType;
                if (this.v >= value && !this.taskinfo.flags[Number(key) + 1]) {
                    return true;
                }
            }
        }
        return false;
    };
    //时间转格式
    AcCrossServantPowerVo.prototype.getCountTimeStr = function (num) {
        var time = num;
        if (time < 0) {
            time = 0;
        }
        return App.DateUtil.getFormatBySecond(time);
    };
    Object.defineProperty(AcCrossServantPowerVo.prototype, "isShowRedDot", {
        get: function () {
            return this.isShowRedForTask();
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServantPowerVo.prototype.dispose = function () {
        this.info = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServantPowerVo;
}(AcBaseVo));
__reflect(AcCrossServantPowerVo.prototype, "AcCrossServantPowerVo");
