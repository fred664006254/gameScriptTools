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
var RechargeVoApi = (function (_super) {
    __extends(RechargeVoApi, _super);
    function RechargeVoApi() {
        return _super.call(this) || this;
    }
    /**
     * 检测是否还有首充
     */
    RechargeVoApi.prototype.checkFirstRecharge = function () {
        return Api.shopVoApi.getPayFlag() == 0;
    };
    /**
     * 处理泰文华为国际化货币
     */
    RechargeVoApi.prototype.formatThHwMoneyInfo = function (param, rechargeId) {
        if (PlatformManager.checkisLocalPrice()) {
            if (!param) {
                param = [];
            }
            if (rechargeId) {
                param.push(Config.RechargeCfg.getPlatFullPriceById(rechargeId));
            }
            else {
                param.push(Config.RechargeCfg.getMoneyName());
            }
        }
        return param;
    };
    return RechargeVoApi;
}(BaseVoApi));
__reflect(RechargeVoApi.prototype, "RechargeVoApi");
//# sourceMappingURL=RechargeVoApi.js.map