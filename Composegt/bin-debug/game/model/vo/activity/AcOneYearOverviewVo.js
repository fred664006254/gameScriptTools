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
var AcOneYearOverviewVo = (function (_super) {
    __extends(AcOneYearOverviewVo, _super);
    function AcOneYearOverviewVo() {
        var _this = _super.call(this) || this;
        _this.activeinfo = [];
        return _this;
    }
    AcOneYearOverviewVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    Object.defineProperty(AcOneYearOverviewVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcOneYearOverviewVo.prototype, "isShowRedDot", {
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
    AcOneYearOverviewVo.prototype.isAidShieldByIp = function (aid) {
        if (PlatformManager.checkHideIconByIP() && (aid == "rechargeBoxSP" || aid == "lantern" || aid == "ransackTraitorSP" || aid == "stargazer")) {
            return true;
        }
        return false;
    };
    AcOneYearOverviewVo.prototype.dispose = function () {
    };
    return AcOneYearOverviewVo;
}(AcBaseVo));
__reflect(AcOneYearOverviewVo.prototype, "AcOneYearOverviewVo");
