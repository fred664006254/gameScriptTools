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
 * 商店vo
 * author dmj
 * date 2017/10/28
 * @class ShopVo
 */
var ShopVo = (function (_super) {
    __extends(ShopVo, _super);
    function ShopVo() {
        var _this = _super.call(this) || this;
        // 数据上次更新时间
        _this.updated_at = 0;
        // 道具列表
        _this.shopInfoVoObj = null;
        /**vip奖励领取信息
         * 格式为{viplevel:1} 1是已领取，否则是未领取
         */
        _this.vipInfo = null;
        /**充值购买信息{gemType充值档位:1} */
        _this.pay = null;
        /**是否首冲过 0未首冲 1已首冲 2已领取*/
        _this.payflag = 0;
        /**月卡购买{et=月卡结束时间，gett=月卡上次领取时间} */
        _this.monthcard = null;
        /**年卡购买{et=年卡结束时间，gett=年卡上次领取时间 */
        _this.yearcard = null;
        /**管家购买{et=管家结束时间，gett=管家上次领取时间 */
        _this.butler = null;
        /**成长基金购买*/
        _this.growGold = null;
        /**上次更新数据时间戳，前端维护 */
        _this.lastUpdateTime = 0;
        _this.sinfo = null; //记录版本信息
        _this.version = 0;
        _this.st = 0;
        _this.et = 0;
        _this.hinfo = null;
        _this.fourRateCharge = null;
        _this.fourRateCharge_th = null;
        return _this;
    }
    ShopVo.prototype.initData = function (data) {
        if (data) {
            this.lastUpdateTime = GameData.serverTime;
            if (data.updated_at != null) {
                this.updated_at = Number(data.updated_at);
            }
            if (data.vipinfo != null) {
                this.vipInfo = data.vipinfo;
            }
            if (data.pay != null) {
                this.pay = data.pay;
                //调用限时礼包自动强弹
                Api.limitedGiftVoApi.autoOpenLimitedGiftWin();
            }
            if (data.payflag != null) {
                this.payflag = Number(data.payflag);
            }
            if (data.monthcard != null) {
                this.monthcard = data.monthcard;
            }
            if (data.butler != null) {
                this.butler = data.butler;
            }
            if (data.yearcard != null) {
                this.yearcard = data.yearcard;
            }
            if (data.growGold != null) {
                this.growGold = data.growGold;
            }
            if (data.info) {
                if (data.info.version != null) {
                    this.version = data.info.version;
                }
                if (data.info.st) {
                    this.st = data.info.st;
                }
                if (data.info.et) {
                    this.et = data.info.et;
                }
                if (this.shopInfoVoObj == null) {
                    this.shopInfoVoObj = {};
                }
                if (data.info.hinfo) {
                    this.hinfo = data.info.hinfo;
                }
                if (data.info.fourRateCharge) {
                    this.fourRateCharge = data.info.fourRateCharge;
                }
                if (data.info.fourRateCharge_th) {
                    this.fourRateCharge_th = data.info.fourRateCharge_th;
                }
                if (this.hinfo == null || (Object.keys(this.hinfo).length == 0)) {
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SHOP_NEXTDAY);
                }
                if (Object.keys(data.info.sinfo).length == 0) {
                    this.shopInfoVoObj = {};
                }
                for (var key in data.info.sinfo) {
                    if (this.shopInfoVoObj[key]) {
                        this.shopInfoVoObj[key].initData({ id: Number(key), num: data.info.sinfo[key] });
                    }
                    else {
                        var shopInfoVo = new ShopInfoVo();
                        shopInfoVo.initData({ id: Number(key), num: data.info.sinfo[key] });
                        this.shopInfoVoObj[key] = shopInfoVo;
                    }
                }
            }
        }
    };
    ShopVo.prototype.dispose = function () {
        this.updated_at = 0;
        if (this.shopInfoVoObj) {
            for (var key in this.shopInfoVoObj) {
                if (this.shopInfoVoObj[key]) {
                    this.shopInfoVoObj[key].dispose();
                    this.shopInfoVoObj[key] = null;
                }
            }
        }
        this.shopInfoVoObj = null;
        this.vipInfo = null;
        this.pay = null;
        this.payflag = 0;
        this.monthcard = null;
        this.butler = null;
        this.growGold = null;
        this.lastUpdateTime = 0;
        this.version = 0;
        this.st = 0;
        this.et = 0;
    };
    return ShopVo;
}(BaseVo));
__reflect(ShopVo.prototype, "ShopVo");
//# sourceMappingURL=ShopVo.js.map