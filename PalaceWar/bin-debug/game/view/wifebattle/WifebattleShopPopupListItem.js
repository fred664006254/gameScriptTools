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
var WifebattleShopPopupListItem = (function (_super) {
    __extends(WifebattleShopPopupListItem, _super);
    function WifebattleShopPopupListItem() {
        return _super.call(this) || this;
    }
    WifebattleShopPopupListItem.prototype.initItem = function (index, data) {
        _super.prototype.initItem.call(this, index, data);
        this._canNumTxt.text = LanguageManager.getlocal("wifebattleShopLimitNum" + this.limitType(), [this.canExchangeNum().toString()]);
    };
    WifebattleShopPopupListItem.prototype.needScore = function () {
        return Api.wifebattleVoApi.getShopItemNeedScore(this._data.id);
    };
    WifebattleShopPopupListItem.prototype.getOwnScoreNum = function () {
        return Api.wifebattleVoApi.wifebattleVo.rewardnum ? Api.wifebattleVoApi.wifebattleVo.rewardnum : 0;
    };
    WifebattleShopPopupListItem.prototype.canExchangeNum = function () {
        if (this._data.limitNum) {
            return this._data.limitNum - Api.wifebattleVoApi.getShopItemByNum(String(this._idx + 1));
        }
        return 1;
    };
    WifebattleShopPopupListItem.prototype.limitType = function () {
        return this._data.limitType;
    };
    WifebattleShopPopupListItem.prototype.getRequestType = function () {
        return NetRequestConst.REQUEST_WIFEBATTLE_EXCHANGESHOP;
    };
    WifebattleShopPopupListItem.prototype.getMultRequestType = function () {
        return NetRequestConst.REQUEST_WIFEBATTLE_EXCHANGESHOP;
    };
    WifebattleShopPopupListItem.prototype.exchangeHandler = function () {
        if (this.canExchangeNum() <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishShopTip1"));
            return;
        }
        if (this.getOwnScoreNum() < this.needScore()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishShopTip2"));
            return;
        }
        var exchangeNum = Math.min(this.canExchangeNum(), Math.floor(this.getOwnScoreNum() / this.needScore()));
        if (exchangeNum >= 5) {
            ViewController.getInstance().openView(ViewConst.POPUP.ITEMEXCHANGEPOPUPVIEW, {
                itemId: this._data.item.split("_")[1],
                idx: Number(this._data.id),
                maxNum: exchangeNum,
                callback: this.exchangeMultHandler,
                handler: this
            });
            return;
        }
        NetManager.request(this.getRequestType(), { itemKey: Number(this._data.id) + 1 });
    };
    WifebattleShopPopupListItem.prototype.exchangeMultHandler = function (itemNum, itemId) {
        NetManager.request(this.getRequestType(), { itemKey: itemId + 1, enum: itemNum });
    };
    WifebattleShopPopupListItem.prototype.refresh = function () {
        _super.prototype.refresh.call(this);
        this._canNumTxt.text = LanguageManager.getlocal("wifebattleShopLimitNum" + this.limitType(), [this.canExchangeNum().toString()]);
    };
    return WifebattleShopPopupListItem;
}(ScorePopupListItem));
__reflect(WifebattleShopPopupListItem.prototype, "WifebattleShopPopupListItem");
//# sourceMappingURL=WifebattleShopPopupListItem.js.map