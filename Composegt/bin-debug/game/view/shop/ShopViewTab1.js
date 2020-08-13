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
var ShopViewTab1 = (function (_super) {
    __extends(ShopViewTab1, _super);
    function ShopViewTab1() {
        var _this = _super.call(this) || this;
        _this._index = 0;
        _this._shopid = 0;
        _this._currVipNum = 0;
        _this.initView();
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetPushConst.PUSH_PAY), _this.receivePushData, _this);
        return _this;
    }
    ShopViewTab1.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_SHOP_NEXTDAY, this.refreshUI2, this);
        var arr = Config.ShopnewCfg.getNewShopArr();
        this._shopInfoVoList = arr; //Api.shopVoApi.getShopInfoListByType(this.getSheepType());
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 600, GameConfig.stageHeigth - 370 - 83 + 25);
        this._scrollList = ComponentManager.getScrollList(ShopScrollItem, this._shopInfoVoList, rect);
        this.addChild(this._scrollList);
        this._scrollList.setPosition(GameConfig.stageWidth / 2 - this._scrollList.width / 2, 87);
        this._currVipNum = Api.playerVoApi.getPlayerVipLevel();
    };
    ShopViewTab1.prototype.receivePushData = function (event) {
        var data = event.data;
        if (data.data.cmd == NetPushConst.PUSH_PAY) {
            if (this._currVipNum != Api.playerVoApi.getPlayerVipLevel()) {
                this._currVipNum = Api.playerVoApi.getPlayerVipLevel();
                this._scrollList.refreshData(this._shopInfoVoList);
            }
        }
    };
    ShopViewTab1.prototype.refreshUI2 = function () {
        if (this._scrollList) {
            this._scrollList.refreshData(this._shopInfoVoList);
        }
    };
    // 页签类型
    ShopViewTab1.prototype.getSheepType = function () {
        return 1;
    };
    ShopViewTab1.prototype.dispose = function () {
        this._scrollList = null;
        this._shopInfoVoList = null;
        this._index = 0;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SHOP_NEXTDAY, this.refreshUI2, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetPushConst.PUSH_PAY), this.receivePushData, this);
        _super.prototype.dispose.call(this);
    };
    return ShopViewTab1;
}(CommonViewTab));
__reflect(ShopViewTab1.prototype, "ShopViewTab1");
