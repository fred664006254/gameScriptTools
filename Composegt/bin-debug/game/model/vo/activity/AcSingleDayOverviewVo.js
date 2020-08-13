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
var AcSingleDayOverviewVo = (function (_super) {
    __extends(AcSingleDayOverviewVo, _super);
    function AcSingleDayOverviewVo() {
        var _this = _super.call(this) || this;
        _this.activeinfo = [];
        return _this;
    }
    AcSingleDayOverviewVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    Object.defineProperty(AcSingleDayOverviewVo.prototype, "acTimeAndHour", {
        /**
         * 活动开始结束时间，格式：x月x日-x月x日
         */
        get: function () {
            var et = this.et - 86400;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDayOverviewVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDayOverviewVo.prototype, "isShowRedDot", {
        get: function () {
            for (var key in this.activeinfo) {
                if (this.activeinfo.hasOwnProperty(key)) {
                    var element = this.activeinfo[key];
                    var tmp_vo = Api.acVoApi.getActivityVoByAidAndCode(element["aid"], "" + element["code"]);
                    if (tmp_vo && tmp_vo.isStart && tmp_vo.isShowRedDot && !this.isAidShieldByIp(element["aid"])) {
                        return true;
                    }
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AcSingleDayOverviewVo.prototype.isAidShieldByIp = function (aid) {
        if (PlatformManager.checkHideIconByIP() && (aid == "gemLottery")) {
            return true;
        }
        return false;
    };
    AcSingleDayOverviewVo.prototype.dispose = function () {
    };
    return AcSingleDayOverviewVo;
}(AcBaseVo));
__reflect(AcSingleDayOverviewVo.prototype, "AcSingleDayOverviewVo");
