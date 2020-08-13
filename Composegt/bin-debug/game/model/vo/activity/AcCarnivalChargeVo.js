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
var AcCarnivalChargeVo = (function (_super) {
    __extends(AcCarnivalChargeVo, _super);
    function AcCarnivalChargeVo() {
        var _this = _super.call(this) || this;
        _this.flags = {};
        return _this;
    }
    AcCarnivalChargeVo.prototype.initData = function (data) {
        var oldV = 0;
        var newV = 0;
        if (this.v) {
            oldV = this.v;
        }
        if (data["v"]) {
            newV = Number(data["v"]);
        }
        for (var key in data) {
            this[key] = data[key];
        }
        if (oldV != newV) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ACCARNIVAL_CHANGE_CHARGE);
        }
    };
    Object.defineProperty(AcCarnivalChargeVo.prototype, "isShowRedDot", {
        get: function () {
            var acVo = Api.acVoApi.getActivityVoByAidAndCode("carnivalCharge");
            var cfgObj = Config.AcCfg.getCfgByActivityIdAndCode("carnivalCharge", acVo.code);
            if (!cfgObj) {
                return false;
            }
            var list = cfgObj.getList();
            for (var key in list) {
                if (!this.flags[key] && list[key]["needGem"] <= this.v && (!Api.switchVoApi.checkSpecialChargeReward() ? !(list[key].isSpecial == 1) : true)) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AcCarnivalChargeVo.prototype.dispose = function () {
        this.v = 0;
        this.flags = {};
    };
    return AcCarnivalChargeVo;
}(AcBaseVo));
__reflect(AcCarnivalChargeVo.prototype, "AcCarnivalChargeVo");
