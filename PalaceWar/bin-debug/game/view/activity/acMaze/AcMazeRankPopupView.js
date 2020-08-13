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
  * 赵云排行榜
  * author 张朝阳
  * date 2018/7/10
  * @class AcMazeRankPopupView
  */
var AcMazeRankPopupView = (function (_super) {
    __extends(AcMazeRankPopupView, _super);
    function AcMazeRankPopupView() {
        return _super.call(this) || this;
    }
    AcMazeRankPopupView.prototype.initView = function () {
    };
    /**
     * tabbar 的监听事件
     */
    AcMazeRankPopupView.prototype.clickTabbarHandler = function (data) {
        _super.prototype.clickTabbarHandler.call(this, data);
    };
    AcMazeRankPopupView.prototype.getTabbarTextArr = function () {
        return [
            "acPunishRankTab1",
            "acPunishRankRewardPopupViewTitle",
        ];
    };
    AcMazeRankPopupView.prototype.getTitleStr = function () {
        return "acArcherRankTitle";
    };
    AcMazeRankPopupView.prototype.getShowHeight = function () {
        return 790;
    };
    AcMazeRankPopupView.prototype.getOffsetY = function () {
        return 0;
    };
    AcMazeRankPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcMazeRankPopupView;
}(PopupView));
__reflect(AcMazeRankPopupView.prototype, "AcMazeRankPopupView");
//# sourceMappingURL=AcMazeRankPopupView.js.map