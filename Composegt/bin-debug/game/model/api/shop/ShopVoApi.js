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
/**
 * 商店api
 * author dmj
 * date 2017/10/28
 * @class ShopVoApi
 */
var ShopVoApi = (function (_super) {
    __extends(ShopVoApi, _super);
    function ShopVoApi() {
        return _super.call(this) || this;
    }
    ShopVoApi.prototype.getVersion = function () {
        return String(this.shopVo.version);
    };
    ShopVoApi.prototype.getst = function () {
        return this.shopVo.st;
    };
    ShopVoApi.prototype.getet = function () {
        return this.shopVo.et;
    };
    /**
     * 根据类型获取商店info数组
     * @param type
     */
    ShopVoApi.prototype.getShopInfoListByType = function (type) {
        var arr = new Array();
        var vrson = this.getVersion();
        if (this.getet() < GameData.serverTime) {
            vrson = "0";
        }
        arr = Config.ShopCfg.getShopItemCfgListByType(type, vrson);
        //如果type == 3的时候  判断是否开启特殊礼包
        if (type == 3 && Api.switchVoApi.checkOpenSpecialGift()) {
            // let specialArr = Config.ShopCfg.
            var specialArr = Config.SpecialgiftCfg.getShopItemCfgList();
            arr = arr.concat(specialArr);
        }
        return arr;
    };
    /**
     * 根据商品id获取商品vo
     * @param id
     */
    ShopVoApi.prototype.getShopInfoVoById = function (id) {
        if (this.shopVo) {
            var shopInfoVoObj = this.shopVo.shopInfoVoObj;
            if (shopInfoVoObj && shopInfoVoObj[id.toString()]) {
                return shopInfoVoObj[id.toString()];
            }
        }
        return null;
    };
    /**
     * 通过商品id获取商品配置
     * @param id
     */
    ShopVoApi.prototype.getShopItemCfgById = function (id) {
        var v = this.getVersion();
        if (Number(v) > 0 && this.getet() < GameData.serverTime) {
            v = "0";
        }
        return Config.ShopCfg.getShopItemCfgById(id, v);
    };
    /**
     * 从特殊配置中获取商品配置
     */
    ShopVoApi.prototype.getSpecialShopItemCfgById = function (id) {
        return Config.SpecialgiftCfg.getShopItemCfgById(id);
    };
    /**
     * 根据商品id获取该商品能够购买的次数
     * @param id 商品id
     */
    ShopVoApi.prototype.getCanBuyNumById = function (id) {
        var shopItemCfg = this.getShopItemCfgById(id);
        if (shopItemCfg.limitNum > 0) {
            var shopInfoVoObj = this.shopVo.shopInfoVoObj;
            if (shopInfoVoObj && shopInfoVoObj[id.toString()]) {
                var num = shopItemCfg.limitNum - shopInfoVoObj[id.toString()].buyNum;
                return num < 0 ? 0 : num;
            }
        }
        return shopItemCfg.limitNum;
    };
    ShopVoApi.prototype.getSpecialCanBuyNumById = function (id) {
        var shopItemCfg = this.getSpecialShopItemCfgById(id);
        if (shopItemCfg.limitNum > 0) {
            var shopInfoVoObj = this.shopVo.specialShopInfoVoObj;
            if (shopInfoVoObj && shopInfoVoObj[id.toString()]) {
                var num = shopItemCfg.limitNum - shopInfoVoObj[id.toString()].buyNum;
                return num < 0 ? 0 : num;
            }
        }
        return shopItemCfg.limitNum;
    };
    //获取已经购买过的次数
    ShopVoApi.prototype.getNewShopBuyNumById = function (id) {
        var buyNum = 0;
        if (this.shopVo && this.shopVo.hinfo && this.shopVo.hinfo[id]) {
            buyNum = this.shopVo.hinfo[id];
        }
        return buyNum;
    };
    ShopVoApi.prototype.checkIfNeedRequest = function () {
        if (this.shopVo.lastUpdateTime > 0) {
            return true;
        }
        return false;
    };
    /**
     * 充值type 0未充值过,1已首充,2已领取
     */
    ShopVoApi.prototype.getPayFlag = function () {
        return this.shopVo ? this.shopVo.payflag : 0;
    };
    /**
     * 判断玩家是否可以弹出首冲
     * （根据充值状态以及是否拥有首冲奖励的门客）
     */
    ShopVoApi.prototype.isCanShowFirstCharge = function () {
        return this.getPayFlag() != 2 && Api.servantVoApi.getServantObj(this.firstChargeServantId.toString()) == null;
    };
    Object.defineProperty(ShopVoApi.prototype, "firstChargeServantId", {
        /**
         * 获取首冲奖励的门客ID
         */
        get: function () {
            if (Api.switchVoApi.checkOpenFirstCharge6Times()) {
                return Config.FirstchargeCfg.getRewServantD6();
            }
            else {
                return Config.FirstchargeCfg.getRewServantD4();
            }
        },
        enumerable: true,
        configurable: true
    });
    //次充
    // 	0或空    未次充，不能领次充奖励
    // 1            已次充，能领奖
    // 2            已领奖
    ShopVoApi.prototype.getSecondRateCharge = function () {
        return (this.shopVo && this.shopVo.secondRateCharge) ? this.shopVo.secondRateCharge : 0;
    };
    ShopVoApi.prototype.getPayInfoById = function (id) {
        return Boolean(this.shopVo && this.shopVo.pay ? this.shopVo.pay[id] : 0);
    };
    ShopVoApi.prototype.getPayInfoById2 = function (id) {
        return this.shopVo.pay[id];
    };
    /**
     * 限时礼包 查看当前弹出打开的key
     */
    ShopVoApi.prototype.getPayShow = function () {
        return this.shopVo.pay["show"];
    };
    /**
     * 	限时礼包 查看当前红点key
     *
     */
    ShopVoApi.prototype.getPayRedpoint = function () {
        return this.shopVo.pay["redpoint"];
    };
    //12元礼包1
    ShopVoApi.prototype.getPayInfo1 = function () {
        return Boolean(this.shopVo && this.shopVo.pay && this.shopVo.pay["g9"] && this.shopVo.pay["g9"].isbuy ? this.shopVo.pay["g9"].isbuy : 0);
    };
    //12元礼包2
    ShopVoApi.prototype.getPayInfo2 = function () {
        return Boolean(this.shopVo && this.shopVo.pay && this.shopVo.pay["g10"] && this.shopVo.pay["g10"].isbuy ? this.shopVo.pay["g10"].isbuy : 0);
    };
    //12元礼包1时间
    ShopVoApi.prototype.getPayInfo1Time = function () {
        var itemVo1 = Api.shopVoApi.getPayInfoById2("g9");
        var rechargeItemCfg = Config.RechargeCfg.getRechargeItemCfgByKey("g9");
        var lt = itemVo1.st + rechargeItemCfg.lastTime - GameData.serverTime;
        return lt;
    };
    /**
     * 是否已经订阅了豪门
     */
    ShopVoApi.prototype.ifBuySpCard = function () {
        if (!Api.switchVoApi.checkOpenSpCard()) {
            return false;
        }
        var spCardCfg = this.shopVo.pay["g70"];
        if (spCardCfg && spCardCfg.et > GameData.serverTime) {
            return true;
        }
        return false;
    };
    /**
     * 是否已购买终身卡
     */
    ShopVoApi.prototype.ifBuyYearCard = function () {
        if (this.shopVo.yearcard && this.shopVo.yearcard.et > GameData.serverTime) {
            return true;
        }
        return false;
    };
    /**
     * 是否已购买月卡
     */
    ShopVoApi.prototype.ifBuyMonthCard = function () {
        if (this.shopVo.monthcard && this.shopVo.monthcard.et > GameData.serverTime) {
            return true;
        }
        return false;
    };
    ShopVoApi.prototype.getVipRewardInfo = function (vipLevel) {
        return this.shopVo ? this.shopVo.vipInfo[vipLevel] : false;
    };
    ShopVoApi.prototype.getSpcardet = function () {
        var spCardCfg = this.shopVo.pay["g70"];
        if (spCardCfg && spCardCfg.et) {
            return spCardCfg.et;
        }
        return 0;
    };
    ShopVoApi.prototype.getMonthcardet = function () {
        return this.shopVo.monthcard.et;
    };
    ShopVoApi.prototype.getInterday = function () {
        if (this.shopVo && this.shopVo.hinfo) {
            if (Object.keys(this.shopVo.hinfo).length == 0) {
                return true;
            }
            else {
                return false;
            }
        }
    };
    ShopVoApi.prototype.getfourRateCharge = function () {
        if (this.shopVo.fourRateCharge == null) {
            return true;
        }
        return false;
    };
    //有第三方支付
    ShopVoApi.prototype.isWebPay = function () {
        var isWebPay = false;
        for (var key in this.shopVo.pay) {
            var checkstr = key.substr(0, 8);
            if (checkstr == "klwebpay") {
                isWebPay = true;
                break;
            }
        }
        return isWebPay;
        // return false;
    };
    ShopVoApi.prototype.getOpenTimes = function () {
        return this.shopVo.opentime || 0;
    };
    ShopVoApi.prototype.getMergeTimes = function () {
        return this.shopVo.mergezonetime || 0;
    };
    //3充
    // 	0或空    未次充，不能领次充奖励
    // 1            已次充，能领奖
    // 2            已领奖
    ShopVoApi.prototype.getThreeRateCharge = function () {
        var itemVo1 = Api.shopVoApi.getPayInfoById2("g71");
        return (itemVo1 && itemVo1.isget) ? itemVo1.isget : 0;
    };
    //4充
    // 	0或空    未次充，不能领次充奖励
    // 1            已次充，能领奖
    // 2            已领奖
    ShopVoApi.prototype.getFourRateCharge = function () {
        var itemVo1 = Api.shopVoApi.getPayInfoById2("g72");
        return (itemVo1 && itemVo1.isget) ? itemVo1.isget : 0;
    };
    ShopVoApi.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return ShopVoApi;
}(BaseVoApi));
__reflect(ShopVoApi.prototype, "ShopVoApi");
