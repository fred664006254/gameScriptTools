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
     *
     * 检测是否还有次充
     */
    RechargeVoApi.prototype.checkSecondRecharge = function () {
        return Api.shopVoApi.getSecondRateCharge() == 0;
    };
    /**
     * 检测是否有首冲  并且 没有吕布
     */
    RechargeVoApi.prototype.checkFirstRechargeNoLvbu = function () {
        //1 充值过  2 已经领取
        return Api.shopVoApi.getPayFlag() == 0 && Api.servantVoApi.getServantObj("1033") == null;
    };
    /**
     * 检测是否有次充  并且 没有红颜
     */
    RechargeVoApi.prototype.checkSecondRechargeNoWife = function () {
        //1 充值过  2 已经领取
        return Api.shopVoApi.getSecondRateCharge() == 0 && Api.wifeVoApi.getWifeInfoVoById(Config.SecondchargeCfg.getWifeId()) == null;
    };
    return RechargeVoApi;
}(BaseVoApi));
__reflect(RechargeVoApi.prototype, "RechargeVoApi");
