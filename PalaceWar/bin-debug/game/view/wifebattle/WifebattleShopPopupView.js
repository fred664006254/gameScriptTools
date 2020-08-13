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
var WifebattleShopPopupView = (function (_super) {
    __extends(WifebattleShopPopupView, _super);
    function WifebattleShopPopupView() {
        return _super.call(this) || this;
    }
    WifebattleShopPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            'countrywarrewardview_itembg'
        ]);
    };
    WifebattleShopPopupView.prototype.getScoreDataList = function () {
        return Config.WifebattleCfg.shopList;
    };
    WifebattleShopPopupView.prototype.initMessage = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIFEBATTLE_EXCHANGESHOP, this.refresh, this);
    };
    WifebattleShopPopupView.prototype.getOwnScoreNum = function () {
        // return Api.wifebattleVoApi.wifebattleVo.rewardnum;
        return Api.wifebattleVoApi.getScore();
    };
    WifebattleShopPopupView.prototype.getListItemClass = function () {
        return WifebattleShopPopupListItem;
    };
    WifebattleShopPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIFEBATTLE_EXCHANGESHOP, this.refresh, this);
        _super.prototype.dispose.call(this);
    };
    return WifebattleShopPopupView;
}(ScorePopupView));
__reflect(WifebattleShopPopupView.prototype, "WifebattleShopPopupView");
//# sourceMappingURL=WifebattleShopPopupView.js.map