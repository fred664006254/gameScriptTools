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
var DailybossnewScroePopupView = (function (_super) {
    __extends(DailybossnewScroePopupView, _super);
    function DailybossnewScroePopupView() {
        return _super.call(this) || this;
    }
    DailybossnewScroePopupView.prototype.getScoreDataList = function () {
        return Config.DailybossnewCfg.getShopList();
    };
    DailybossnewScroePopupView.prototype.initMessage = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_NEWBOSS_BUY, this.refresh, this);
    };
    DailybossnewScroePopupView.prototype.getOwnScoreNum = function () {
        return Api.dailybossnewVoApi.getScore();
    };
    DailybossnewScroePopupView.prototype.getListItemClass = function () {
        return DailybossnewScroePopupListItem;
    };
    DailybossnewScroePopupView.prototype.initList = function () {
        var view = this;
        var bg = BaseBitmap.create("public_9_bg4");
        bg.name = "listbg";
        bg.width = 540;
        bg.height = 680;
        bg.setPosition(15 + GameData.popupviewOffsetX, view._leftScoreTxt.y + view._leftScoreTxt.height + 10);
        view.addChildToContainer(bg);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 530, 660);
        view._scrollList = ComponentManager.getScrollList(view.getListItemClass(), view.getScoreDataList(), rect);
        // view._scrollList.setPosition(bg.x+5,bg.y+5+3);
        view._scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        view.addChildToContainer(view._scrollList);
        view._scrollList.x = bg.x + 5;
        view._scrollList.y = bg.y + 5 + 3;
        // let scrollList = view._scrollList;
        // scrollList.bindMoveCompleteCallback(this.refreshChatByScroll,this);
        // let arrow = BaseBitmap.create("popupview_rulearrow");
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, arrow, scrollList, [0,scrollList.height + 5]);
        // this.addChildToContainer(arrow);
        // let startY = arrow.y;
        // egret.Tween.get(arrow,{loop : true}).to({y : startY - 10}, 800).to({y : startY}, 800);
        // arrow.visible = scrollList.checkShowArrow();
        // this._arrow = arrow;
        this._leftScoreTxt.text = LanguageManager.getlocal("dailybossnewCurScore", [this.getOwnScoreNum().toString()]);
    };
    DailybossnewScroePopupView.prototype.refresh = function (e) {
        var data = e ? e.data : null;
        if (data.data.data && data.data.data.rewards) {
            App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(data.data.data.rewards));
        }
        if (this._leftScoreTxt) {
            this._leftScoreTxt.text = LanguageManager.getlocal("dailybossnewCurScore", [this.getOwnScoreNum().toString()]);
        }
    };
    DailybossnewScroePopupView.prototype.getShowHeight = function () {
        return 800;
    };
    DailybossnewScroePopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_NEWBOSS_BUY, this.refresh, this);
        _super.prototype.dispose.call(this);
    };
    return DailybossnewScroePopupView;
}(ScorePopupView));
__reflect(DailybossnewScroePopupView.prototype, "DailybossnewScroePopupView");
var DailybossnewScroePopupListItem = (function (_super) {
    __extends(DailybossnewScroePopupListItem, _super);
    function DailybossnewScroePopupListItem() {
        return _super.call(this) || this;
    }
    DailybossnewScroePopupListItem.prototype.needScore = function () {
        return Api.dailybossnewVoApi.getShopItemNeedScore(this._data.id);
    };
    DailybossnewScroePopupListItem.prototype.getOwnScoreNum = function () {
        return Api.dailybossnewVoApi.getScore();
    };
    DailybossnewScroePopupListItem.prototype.canExchangeNum = function () {
        if (this._data.limit) {
            return this._data.limit - Api.dailybossnewVoApi.getShopItemByNum(String(this._idx + 1));
        }
        return 1;
    };
    DailybossnewScroePopupListItem.prototype.getRequestType = function () {
        return NetRequestConst.REQUEST_NEWBOSS_BUY;
    };
    return DailybossnewScroePopupListItem;
}(ScorePopupListItem));
__reflect(DailybossnewScroePopupListItem.prototype, "DailybossnewScroePopupListItem");
//# sourceMappingURL=DailybossnewScroePopupView.js.map