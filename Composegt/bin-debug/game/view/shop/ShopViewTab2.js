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
var ShopViewTab2 = (function (_super) {
    __extends(ShopViewTab2, _super);
    function ShopViewTab2() {
        var _this = _super.call(this) || this;
        _this._index = 0;
        _this._shopid = 0;
        _this.initView();
        return _this;
    }
    ShopViewTab2.prototype.initView = function () {
        if (Api.otherInfoVoApi.getOtherInfoVo().kvmap && Api.otherInfoVoApi.getOtherInfoVo().kvmap["check_super_pack"]) {
        }
        else {
            PlatformManager.analytics37JPPoint("custom_recharge_check", "check_super_pack", 1);
            if (PlatformManager.checkIsJPSp()) {
                this.request(NetRequestConst.REQUEST_OTHERINFO_SETKV, { k: "check_super_pack", v: "1" });
            }
        }
        this._shopInfoVoList = Api.shopVoApi.getShopInfoListByType(3);
        var tarInfoVoList = [];
        if (Api.switchVoApi.checkOpenShopVipTab()) {
            for (var index = 0; index < this._shopInfoVoList.length; index++) {
                var element = this._shopInfoVoList[index];
                var shopItemCfg = null;
                if (element.isSpecial) {
                    shopItemCfg = Api.shopVoApi.getSpecialShopItemCfgById(element.id);
                }
                else {
                    shopItemCfg = Api.shopVoApi.getShopItemCfgById(element.id);
                }
                if (this.getSheepType() == 2) {
                    if (shopItemCfg.needVip && shopItemCfg.needVip > 0) {
                        if (Api.switchVoApi.checkOpenShopVipTab2()) {
                            if (Api.playerVoApi.getPlayerVipLevel() >= shopItemCfg.needVip) {
                                tarInfoVoList.push(element);
                            }
                        }
                        else {
                            tarInfoVoList.push(element);
                        }
                    }
                }
                else if (this.getSheepType() == 3) {
                    if (!shopItemCfg.needVip || shopItemCfg.needVip <= 0) {
                        tarInfoVoList.push(element);
                    }
                }
            }
            if (this.getSheepType() == 2) {
                tarInfoVoList.sort(function (dataA, dataB) {
                    return dataA.needVip - dataB.needVip;
                });
            }
        }
        else {
            tarInfoVoList = this._shopInfoVoList;
        }
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 598, GameConfig.stageHeigth - 370 - 83 + 25);
        this._scrollList = ComponentManager.getScrollList(Shop3ScrollItem, tarInfoVoList, rect);
        this.addChild(this._scrollList);
        this._scrollList.setPosition(GameConfig.stageWidth / 2 - this._scrollList.width / 2, 87);
    };
    ShopViewTab2.prototype.getSheepType = function () {
        return 3;
    };
    ShopViewTab2.prototype.dispose = function () {
        this._scrollList = null;
        this._shopInfoVoList = null;
        this._index = 0;
        this._shopid = 0;
        _super.prototype.dispose.call(this);
    };
    return ShopViewTab2;
}(CommonViewTab));
__reflect(ShopViewTab2.prototype, "ShopViewTab2");
