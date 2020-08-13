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
 * 港台周年庆 折扣商店
 * date 2019.11.28
 * author ycg
 * @class AcAnniversaryShop2020Vo
 */
var AcAnniversaryShop2020Vo = (function (_super) {
    __extends(AcAnniversaryShop2020Vo, _super);
    function AcAnniversaryShop2020Vo() {
        return _super.call(this) || this;
    }
    AcAnniversaryShop2020Vo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    //获取限时返场道具购买信息
    AcAnniversaryShop2020Vo.prototype.getBuyShopList1 = function (id) {
        var buyNum = 0;
        if (this.shop1 && this.shop1[id]) {
            buyNum = this.shop1[id];
        }
        return buyNum;
    };
    //获取折扣礼包道具购买信息
    AcAnniversaryShop2020Vo.prototype.getBuyShopList2 = function (id) {
        var buyNum = 0;
        if (this.shop2 && this.shop2[id]) {
            buyNum = this.shop2[id];
        }
        return buyNum;
    };
    AcAnniversaryShop2020Vo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et;
    };
    Object.defineProperty(AcAnniversaryShop2020Vo.prototype, "acTimeAndHour", {
        ///活动日期时间显示
        get: function () {
            var et = this.et;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    //倒计时
    AcAnniversaryShop2020Vo.prototype.getCountDown = function () {
        var et = this.et;
        if (et < GameData.serverTime) {
            return LanguageManager.getlocal("acPunishEnd");
        }
        return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
    };
    AcAnniversaryShop2020Vo.prototype.isFirstInView = function () {
        var key = this.aidAndCode + this.et + Api.playerVoApi.getPlayerID();
        var str = LocalStorageManager.get(key);
        if (str && str == "1") {
            return false;
        }
        return true;
    };
    Object.defineProperty(AcAnniversaryShop2020Vo.prototype, "isShowRedDot", {
        get: function () {
            return this.isFirstInView();
        },
        enumerable: true,
        configurable: true
    });
    AcAnniversaryShop2020Vo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcAnniversaryShop2020Vo;
}(AcBaseVo));
__reflect(AcAnniversaryShop2020Vo.prototype, "AcAnniversaryShop2020Vo");
//# sourceMappingURL=AcAnniversaryShop2020Vo.js.map