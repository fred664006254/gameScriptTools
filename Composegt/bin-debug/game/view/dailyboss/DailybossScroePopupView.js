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
var DailybossScroePopupView = (function (_super) {
    __extends(DailybossScroePopupView, _super);
    function DailybossScroePopupView() {
        return _super.call(this) || this;
    }
    DailybossScroePopupView.prototype.getScoreDataList = function () {
        return Config.DailybossCfg.getShopByOpenTime();
        // return Config.DailybossCfg.shopList;
    };
    DailybossScroePopupView.prototype.initMessage = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_DAILYBOSS_BUY, this.refresh, this);
    };
    DailybossScroePopupView.prototype.getOwnScoreNum = function () {
        return Api.dailybossVoApi.getScore();
    };
    DailybossScroePopupView.prototype.getListItemClass = function () {
        return DailybossScroePopupListItem;
    };
    DailybossScroePopupView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_OTHERINFO_GETSERVERINFO, requestData: {} };
    };
    DailybossScroePopupView.prototype.receiveData = function (data) {
        if (data.ret) {
            GameData.serverOpenTime = data.data.data.opentime;
            // this.dataList = data.data.data.chargeList;
        }
    };
    DailybossScroePopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_DAILYBOSS_BUY, this.refresh, this);
        _super.prototype.dispose.call(this);
    };
    return DailybossScroePopupView;
}(ScorePopupView));
__reflect(DailybossScroePopupView.prototype, "DailybossScroePopupView");
var DailybossScroePopupListItem = (function (_super) {
    __extends(DailybossScroePopupListItem, _super);
    function DailybossScroePopupListItem() {
        return _super.call(this) || this;
    }
    DailybossScroePopupListItem.prototype.needScore = function () {
        return Api.dailybossVoApi.getShopItemNeedScore(this._data.id);
    };
    DailybossScroePopupListItem.prototype.getOwnScoreNum = function () {
        return Api.dailybossVoApi.getScore();
    };
    DailybossScroePopupListItem.prototype.canExchangeNum = function () {
        if (this._data.limit) {
            return this._data.limit - Api.dailybossVoApi.getShopItemByNum(this._data.id);
        }
        return 1;
    };
    DailybossScroePopupListItem.prototype.getRequestType = function () {
        return NetRequestConst.REQUEST_DAILYBOSS_BUY;
    };
    return DailybossScroePopupListItem;
}(ScorePopupListItem));
__reflect(DailybossScroePopupListItem.prototype, "DailybossScroePopupListItem");
