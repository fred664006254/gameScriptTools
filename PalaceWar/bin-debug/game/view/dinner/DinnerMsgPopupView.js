/**
 * 宴会记录列表
 * author sl
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
            "rank_line", "dinner_detail", "dinner_seat_empty",
            "dinner_rankbg"
        ]);
    };
    DinnerMsgPopupView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_DINNER_HISTORY, requestData: {} };
    };
    DinnerMsgPopupView.prototype.receiveData = function (data) {
        this._infoList = data.data.data.historydinfo;
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
        var tabName = ["dinnerMsgPopupViewTitle"];
        var rankBg = BaseBitmap.create("public_9_probiginnerbg");
        rankBg.width = 520;
        rankBg.height = 618;
        rankBg.setPosition(this.viewBg.width / 2 - rankBg.width / 2, 20);
        this.addChildToContainer(rankBg);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 508, rankBg.height - 20);
        this._scrollList = ComponentManager.getScrollList(DinnerMsgPopupScollItem, this._infoList, rect);
        this.addChildToContainer(this._scrollList);
        this._scrollList.setPosition(rankBg.x + 5, rankBg.y + 10);
        this._scrollList.setEmptyTip(LanguageManager.getlocal("dinnerMsgPopupEmptyTip"));
    };
    DinnerMsgPopupView.prototype.getBgExtraHeight = function () {
        return 20;
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
//# sourceMappingURL=DinnerMsgPopupView.js.map