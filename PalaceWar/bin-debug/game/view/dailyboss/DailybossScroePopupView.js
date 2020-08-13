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
        return Config.DailybossCfg.getShopList();
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
    DailybossScroePopupView.prototype.initList = function () {
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
    };
    DailybossScroePopupView.prototype.getShowHeight = function () {
        return 800;
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
            return this._data.limit - Api.dailybossVoApi.getShopItemByNum(String(this._idx + 1));
        }
        return 1;
    };
    DailybossScroePopupListItem.prototype.getRequestType = function () {
        return NetRequestConst.REQUEST_DAILYBOSS_BUY;
    };
    return DailybossScroePopupListItem;
}(ScorePopupListItem));
__reflect(DailybossScroePopupListItem.prototype, "DailybossScroePopupListItem");
//# sourceMappingURL=DailybossScroePopupView.js.map