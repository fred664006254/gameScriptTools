/**
 * 宴会记录详情
 * author sl
 * date 2019/3/28
 * @class DinnerdetailPopupView
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
var DinnerdetailPopupView = (function (_super) {
    __extends(DinnerdetailPopupView, _super);
    function DinnerdetailPopupView() {
        return _super.call(this) || this;
    }
    DinnerdetailPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "dinner_seat_special1",
            "dinner_seat_special2",
        ]);
    };
    DinnerdetailPopupView.prototype.initView = function () {
        var rankBg = BaseBitmap.create("public_9_probiginnerbg");
        rankBg.width = 520;
        rankBg.height = 618;
        rankBg.setPosition(this.viewBg.width / 2 - rankBg.width / 2, 20);
        this.addChildToContainer(rankBg);
        var dtype = this.param.data.dtype;
        var info = this.param.data.info;
        var infoTab = [];
        for (var key in info) {
            infoTab.push(info[key]);
        }
        var totalSeat = Config.DinnerCfg.getFeastItemCfg(dtype).contain;
        for (var k = infoTab.length; k < totalSeat; k++) {
            infoTab.push({});
        }
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 508, rankBg.height - 20);
        this._scrollList = ComponentManager.getScrollList(DinnerdetailPopupScollItem, infoTab, rect);
        this.addChildToContainer(this._scrollList);
        this._scrollList.setPosition(rankBg.x + 5, rankBg.y + 10);
    };
    DinnerdetailPopupView.prototype.getBgExtraHeight = function () {
        return 10;
    };
    DinnerdetailPopupView.prototype.dispose = function () {
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return DinnerdetailPopupView;
}(PopupView));
__reflect(DinnerdetailPopupView.prototype, "DinnerdetailPopupView");
//# sourceMappingURL=DinnerdetailPopupView.js.map