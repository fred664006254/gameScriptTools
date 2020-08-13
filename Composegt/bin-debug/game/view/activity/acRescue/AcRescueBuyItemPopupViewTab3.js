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
var AcRescueBuyItemPopupViewTab3 = (function (_super) {
    __extends(AcRescueBuyItemPopupViewTab3, _super);
    function AcRescueBuyItemPopupViewTab3() {
        var _this = _super.call(this) || this;
        _this._index = 0;
        _this._shopid = 0;
        _this._currVipNum = 0;
        _this.initView();
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetPushConst.PUSH_PAY), _this.receivePushData, _this);
        return _this;
    }
    AcRescueBuyItemPopupViewTab3.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_SHOP_NEXTDAY, this.refreshUI2, this);
        var arr = Config.ShopnewCfg.getNewShopArr();
        this._shopInfoVoList = arr; //Api.shopVoApi.getShopInfoListByType(this.getSheepType());
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 620, GameConfig.stageHeigth - 370 - 83 - 20);
        this._scrollList = ComponentManager.getScrollList(ShopScrollItem, this._shopInfoVoList, rect);
        this.addChild(this._scrollList);
        this._scrollList.setPosition(15, 87);
        this._currVipNum = Api.playerVoApi.getPlayerVipLevel();
    };
    AcRescueBuyItemPopupViewTab3.prototype.receivePushData = function (event) {
        var data = event.data;
        if (data.data.cmd == NetPushConst.PUSH_PAY) {
            if (this._currVipNum != Api.playerVoApi.getPlayerVipLevel()) {
                this._currVipNum = Api.playerVoApi.getPlayerVipLevel();
                this._scrollList.refreshData(this._shopInfoVoList);
            }
        }
    };
    AcRescueBuyItemPopupViewTab3.prototype.refreshUI2 = function () {
        if (this._scrollList) {
            this._scrollList.refreshData(this._shopInfoVoList);
        }
    };
    // 页签类型
    AcRescueBuyItemPopupViewTab3.prototype.getSheepType = function () {
        return 1;
    };
    AcRescueBuyItemPopupViewTab3.prototype.dispose = function () {
        this._scrollList = null;
        this._shopInfoVoList = null;
        this._index = 0;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SHOP_NEXTDAY, this.refreshUI2, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetPushConst.PUSH_PAY), this.receivePushData, this);
        _super.prototype.dispose.call(this);
    };
    return AcRescueBuyItemPopupViewTab3;
}(CommonViewTab));
__reflect(AcRescueBuyItemPopupViewTab3.prototype, "AcRescueBuyItemPopupViewTab3");
