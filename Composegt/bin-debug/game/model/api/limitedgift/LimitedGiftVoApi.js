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
 * 限时礼包api
 * author jiangliuyang
 * date 2018/9/5
 * @class LimitedGiftVoApi
 */
var LimitedGiftVoApi = (function (_super) {
    __extends(LimitedGiftVoApi, _super);
    function LimitedGiftVoApi() {
        var _this = _super.call(this) || this;
        //color-->1浅色字    2深色字
        _this.rechargeCfgMap = {
            g29: { title: "limitedGiftSoldierEmpty", img: "1", color: 1 },
            g30: { title: "limitedGiftGoldEmpty", img: "2", color: 2 },
            g31: { title: "limitedGiftPowerEmpty", img: "3", color: 2 },
            g32: { title: "limitedGiftEnergyEmpty", img: "4", color: 1 },
            g33: { title: "limitedGiftVigourEmpty", img: "5", color: 1 },
            g34: { title: "limitedGiftDinnerEmpty", img: "6", color: 2 },
            g60: { title: "limitedGiftSoldierEmpty2", img: "1_2", color: 1 },
            g61: { title: "limitedGiftGoldEmpty2", img: "2_2", color: 1 },
            g62: { title: "limitedGiftPowerEmpty2", img: "3_2", color: 1 },
            g63: { title: "limitedGiftEnergyEmpty2", img: "4_2", color: 1 },
            g64: { title: "limitedGiftVigourEmpty2", img: "5_2", color: 1 },
            g65: { title: "limitedGiftDinnerEmpty2", img: "6_2", color: 1 } //酒楼举办宴会   限时宴会
        };
        _this.typeMap = {
            SOLDIER_EMPTY: "g29",
            GOLD_EMPTY: "g30",
            POWER_EMPTY: "g31",
            ENERGY_EMPTY: "g32",
            VIGOUR_EMPTY: "g33",
            DINNER_EMPTY: "g34",
            SOLDIER_EMPTY2: "g60",
            GOLD_EMPTY2: "g61",
            POWER_EMPTY2: "g62",
            ENERGY_EMPTY2: "g63",
            VIGOUR_EMPTY2: "g64",
            DINNER_EMPTY2: "g65"
        };
        _this.lockTypeMap = {
            g60: true,
            g61: true,
            g62: true,
            g63: true,
            g64: true,
            g65: true
        };
        //直接强弹
        _this.openList = [
            _this.typeMap.GOLD_EMPTY, _this.typeMap.VIGOUR_EMPTY, _this.typeMap.DINNER_EMPTY,
            _this.typeMap.GOLD_EMPTY2, _this.typeMap.VIGOUR_EMPTY2, _this.typeMap.DINNER_EMPTY2
        ];
        return _this;
    }
    /**
     * 微信小程序 限时礼包强弹
     */
    //检查是否有限时礼包  如果有返回最少剩余时间  如果没有返回0
    LimitedGiftVoApi.prototype.checkHaveLimitedGift = function () {
        var vo = null;
        var cfg = null;
        var lastTime = 0;
        for (var key in this.rechargeCfgMap) {
            if (this.lockTypeMap[key]) {
                if (!Api.switchVoApi.checkLimitedGift2()) {
                    continue;
                }
            }
            vo = Api.shopVoApi.getPayInfoById2(key);
            cfg = Config.RechargeCfg.getRechargeItemCfgByKey(key);
            if (vo && cfg && vo.isbuy == 0) {
                var timeTmp = vo.st + cfg.lastTime - GameData.serverTime;
                if (timeTmp > 0 && (timeTmp < lastTime || lastTime == 0)) {
                    lastTime = timeTmp;
                }
            }
        }
        return lastTime;
    };
    //自动检测是否开启限时礼包强弹
    LimitedGiftVoApi.prototype.autoOpenLimitedGiftWin = function () {
        if (Api.switchVoApi.checkLimitedGift()) {
            var openKey = Api.shopVoApi.getPayShow();
            if (openKey != null) {
                var isOpen = false;
                for (var i = 0; i < this.openList.length; i++) {
                    if (this.openList[i] == openKey) {
                        isOpen = true;
                        break;
                    }
                }
                if (isOpen) {
                    if (this.lockTypeMap[openKey]) {
                        if (Api.switchVoApi.checkLimitedGift2()) {
                            ViewController.getInstance().openView(ViewConst.POPUP.LIMITEDGIFTVIEW);
                        }
                    }
                    else {
                        ViewController.getInstance().openView(ViewConst.POPUP.LIMITEDGIFTVIEW);
                    }
                }
            }
        }
    };
    //手动检测是否开启了限时礼包强弹
    LimitedGiftVoApi.prototype.manualOpenLimitedGiftWin = function (code) {
        if (Api.switchVoApi.checkLimitedGift()) {
            var openKey = Api.shopVoApi.getPayShow();
            if (openKey != null && openKey == code) {
                if (this.lockTypeMap[code]) {
                    if (Api.switchVoApi.checkLimitedGift2()) {
                        ViewController.getInstance().openView(ViewConst.POPUP.LIMITEDGIFTVIEW);
                    }
                }
                else {
                    ViewController.getInstance().openView(ViewConst.POPUP.LIMITEDGIFTVIEW);
                }
            }
        }
    };
    LimitedGiftVoApi.prototype.checkRedPoint = function () {
        var redKey = Api.shopVoApi.getPayRedpoint();
        if (redKey) {
            return true;
        }
        else {
            return false;
        }
    };
    LimitedGiftVoApi.prototype.manualOpenDinnerWin = function () {
        if (Api.switchVoApi.checkLimitedGift()) {
            var vo = Api.shopVoApi.getPayInfoById2(this.typeMap.DINNER_EMPTY);
            var cfg = Config.RechargeCfg.getRechargeItemCfgByKey(this.typeMap.DINNER_EMPTY);
            if ((!vo) && cfg) {
                //首次点击宴会
                NetManager.request(NetRequestConst.REQUEST_DINNER_SHOWNEEDITEM, {});
            }
            else {
                if (Api.switchVoApi.checkLimitedGift2()) {
                    var vo2 = Api.shopVoApi.getPayInfoById2(this.typeMap.DINNER_EMPTY2);
                    var cfg2 = Config.RechargeCfg.getRechargeItemCfgByKey(this.typeMap.DINNER_EMPTY2);
                    if ((!vo2) && cfg2) {
                        //首次点击宴会
                        NetManager.request(NetRequestConst.REQUEST_DINNER_SHOWNEEDITEM, {});
                    }
                }
            }
        }
    };
    LimitedGiftVoApi.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return LimitedGiftVoApi;
}(BaseVoApi));
__reflect(LimitedGiftVoApi.prototype, "LimitedGiftVoApi");
