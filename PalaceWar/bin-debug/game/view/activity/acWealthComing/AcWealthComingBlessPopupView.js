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
/**
 * 财神祝福
 * @author 张朝阳
 * date 2018/12/25
 * @class AcWealthComingBlessPopupView
 */
var AcWealthComingBlessPopupView = (function (_super) {
    __extends(AcWealthComingBlessPopupView, _super);
    function AcWealthComingBlessPopupView() {
        return _super.call(this) || this;
    }
    AcWealthComingBlessPopupView.prototype.initView = function () {
        var aid = this.param.data.aid;
        var code = this.param.data.code;
        var noBuff = this.param.data.noBuff;
        var rect = new egret.Rectangle(0, 0, 545, 500);
        var scrollList = ComponentManager.getScrollList(AcWealthComingBlessScrollItem, ["1", "2", "3"], rect, { code: code, aid: aid, noBuff: noBuff });
        scrollList.setPosition(this.viewBg.x + this.viewBg.width / 2 - scrollList.width / 2, 15);
        this.addChildToContainer(scrollList);
    };
    AcWealthComingBlessPopupView.prototype.getTitleStr = function () {
        return "acWealthComingBlessPopupViewTitle";
    };
    AcWealthComingBlessPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcWealthComingBlessPopupView;
}(PopupView));
__reflect(AcWealthComingBlessPopupView.prototype, "AcWealthComingBlessPopupView");
//# sourceMappingURL=AcWealthComingBlessPopupView.js.map