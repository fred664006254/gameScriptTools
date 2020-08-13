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
var AcTotalDayRechargeVo = (function (_super) {
    __extends(AcTotalDayRechargeVo, _super);
    function AcTotalDayRechargeVo() {
        var _this = _super.call(this) || this;
        _this.v = 0;
        _this.flags = {};
        return _this;
    }
    AcTotalDayRechargeVo.prototype.initData = function (data) {
        var oldV = this.v;
        for (var key in data) {
            this[key] = data[key];
        }
        if (oldV != null && oldV != this.v) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_DAILYCHARGE_REFRESH_V);
        }
    };
    Object.defineProperty(AcTotalDayRechargeVo.prototype, "isShowRedDot", {
        get: function () {
            var totalDVo = Api.acVoApi.getActivityVoByAidAndCode("totalDayRecharge");
            var cfgObj = Config.AcCfg.getCfgByActivityIdAndCode("totalDayRecharge", totalDVo.code);
            if (!cfgObj) {
                return false;
            }
            var list = cfgObj.getList();
            // for (var key in list) {
            // 	if (!this.flags[key] && list[key]["needDay"] <= this.v)
            // 	{
            // 		return true;
            // 	}
            // }
            var _seprateNum = 0;
            for (var key in list) {
                var tmpCfg = list[key];
                if (tmpCfg.isSpecial && tmpCfg.isSpecial == 1) {
                    if (Api.switchVoApi.checkSpecialChargeReward() && !this.flags[key] && this.v >= list[key]["needGem"]) {
                        return true;
                    }
                }
                else {
                    _seprateNum = tmpCfg.needDay;
                    if (!this.flags[key] && list[key]["needDay"] <= this.v) {
                        return true;
                    }
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AcTotalDayRechargeVo.prototype.dispose = function () {
        this.v = 0;
        this.flags = {};
        this.level = null;
        _super.prototype.dispose.call(this);
    };
    return AcTotalDayRechargeVo;
}(AcBaseVo));
__reflect(AcTotalDayRechargeVo.prototype, "AcTotalDayRechargeVo");
