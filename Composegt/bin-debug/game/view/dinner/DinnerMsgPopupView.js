/**
 * 提亲请求列表
 * author dky
 * date 2017/11/8
 * @class DinnerMsgPopupView
 */
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
var DinnerMsgPopupView = (function (_super) {
    __extends(DinnerMsgPopupView, _super);
    function DinnerMsgPopupView() {
        var _this = _super.call(this) || this;
        _this._infoList = null;
        _this._merank = 0;
        return _this;
    }
    DinnerMsgPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "rank_line",
            "dinner_rankbg"
        ]);
    };
    DinnerMsgPopupView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_DINNER_HISTORY, requestData: {} };
    };
    DinnerMsgPopupView.prototype.receiveData = function (data) {
        this._infoList = data.data.data.historydinfo;
        // App.LogUtil.show("receiveData")
        // this._infoList = 
        // [
        // 	{
        // 		dtype:1,
        // 		num:2,
        // 		enemy_num:3,
        // 		point:4,
        // 		score:5,
        // 		start_time:1510109973
        // 	},
        // 	{
        // 		dtype:2,
        // 		num:2222,
        // 		enemy_num:33,
        // 		point:43333,
        // 		score:533333,
        // 		start_time:1510109973
        // 	},
        // 	{
        // 		dtype:1,
        // 		num:2,
        // 		enemy_num:3,
        // 		point:4123,
        // 		score:12135,
        // 		start_time:1510109973
        // 	},
        // ]
    };
    DinnerMsgPopupView.prototype.initView = function () {
        App.LogUtil.show("initView");
        var tabName = ["dinnerMsgPopupViewTitle"];
        var tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_WINTAB, tabName, null, null);
        tabbarGroup.x = 50;
        tabbarGroup.y = 10;
        this.addChildToContainer(tabbarGroup);
        var rankBg = BaseBitmap.create("public_tc_bg01");
        rankBg.width = 535;
        rankBg.height = 608;
        rankBg.x = this.viewBg.width / 2 - rankBg.width / 2;
        rankBg.y = 55;
        // rankBg.setPosition(this.viewBg.width/2  - rankBg.width/2, tabbarGroup.y + tabbarGroup.height);
        this.addChildToContainer(rankBg);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, rankBg.width - 20, rankBg.height - 20);
        this._scrollList = ComponentManager.getScrollList(DinnerMsgPopupScollItem, this._infoList, rect);
        this.addChildToContainer(this._scrollList);
        // this._scrollList.setPosition(rankBg.x  ,rankBg.y + 10);
        this._scrollList.x = this.viewBg.width / 2 - this._scrollList.width / 2;
        this._scrollList.y = rankBg.y + 10;
        this._scrollList.setEmptyTip(LanguageManager.getlocal("dinnerMsgPopupEmptyTip"));
    };
    DinnerMsgPopupView.prototype.dispose = function () {
        this._scrollList = null;
        this._scroRect = null;
        this._infoList = null;
        this._merank = 0;
        _super.prototype.dispose.call(this);
    };
    return DinnerMsgPopupView;
}(PopupView));
__reflect(DinnerMsgPopupView.prototype, "DinnerMsgPopupView");
