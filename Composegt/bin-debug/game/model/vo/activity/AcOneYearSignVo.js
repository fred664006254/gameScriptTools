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
var AcOneYearSignVo = (function (_super) {
    __extends(AcOneYearSignVo, _super);
    function AcOneYearSignVo() {
        var _this = _super.call(this) || this;
        _this.flags = [];
        _this.taskinfo = undefined;
        return _this;
    }
    AcOneYearSignVo.prototype.initData = function (data) {
        var oldDnum = this.dayNum;
        for (var key in data) {
            this[key] = data[key];
        }
        var newDnum = this.dayNum;
        if (newDnum > oldDnum) {
            App.MessageHelper.dispatchEvent(MessageConst.MESAAGE_ONESIGN_VO_CHANGE);
        }
    };
    Object.defineProperty(AcOneYearSignVo.prototype, "dayNum", {
        //登录了几天
        get: function () {
            return this.taskinfo ? this.taskinfo["1"] : 0;
        },
        enumerable: true,
        configurable: true
    });
    //某天是否领取奖励
    AcOneYearSignVo.prototype.dayFlags = function (day) {
        return this.flags["" + day] || 0;
    };
    Object.defineProperty(AcOneYearSignVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcOneYearSignVo.prototype, "isShowRedDot", {
        get: function () {
            var dayNum = this.dayNum;
            if (!dayNum || dayNum == 0) {
                return false;
            }
            for (var day = 1; day <= dayNum; day++) {
                if (!this.dayFlags(day)) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AcOneYearSignVo.prototype.dispose = function () {
        this.flags = null;
        this.taskinfo = null;
    };
    return AcOneYearSignVo;
}(AcBaseVo));
__reflect(AcOneYearSignVo.prototype, "AcOneYearSignVo");
