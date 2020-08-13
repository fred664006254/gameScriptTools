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
  * 马超排行榜
  * author 张朝阳
  * date 2019/1/14
  * @class AcMaChaoRankPopupView
  */
var AcMaChaoRankPopupView = (function (_super) {
    __extends(AcMaChaoRankPopupView, _super);
    function AcMaChaoRankPopupView() {
        return _super.call(this) || this;
    }
    AcMaChaoRankPopupView.prototype.initView = function () {
        this.aid = this.param.data.aid;
        this.code = this.param.data.code;
    };
    /**
     * tabbar 的监听事件
     */
    AcMaChaoRankPopupView.prototype.clickTabbarHandler = function (data) {
        _super.prototype.clickTabbarHandler.call(this, data);
    };
    AcMaChaoRankPopupView.prototype.setTabBarPosition = function () {
        _super.prototype.setTabBarPosition.call(this);
        this.tabbarGroup.x += 15;
    };
    AcMaChaoRankPopupView.prototype.getOffsetY = function () {
        return -3;
    };
    AcMaChaoRankPopupView.prototype.getTabbarTextArr = function () {
        return [
            "acPunishRankTab1",
            "acPunishRankRewardPopupViewTitle",
        ];
    };
    AcMaChaoRankPopupView.prototype.getTitleStr = function () {
        return "acArcherRankTitle";
    };
    AcMaChaoRankPopupView.prototype.getShowHeight = function () {
        return 790;
    };
    AcMaChaoRankPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcMaChaoRankPopupView;
}(PopupView));
__reflect(AcMaChaoRankPopupView.prototype, "AcMaChaoRankPopupView");
//# sourceMappingURL=AcMaChaoRankPopupView.js.map