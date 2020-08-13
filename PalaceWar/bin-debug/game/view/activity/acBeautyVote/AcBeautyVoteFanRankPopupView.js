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
  * 花魁活动--粉丝排行
  * @author 张朝阳
  * date 2019/4/23
  * @class AcBeautyVotePlayerInfoPopupView
  */
var AcBeautyVoteFanRankPopupView = (function (_super) {
    __extends(AcBeautyVoteFanRankPopupView, _super);
    function AcBeautyVoteFanRankPopupView() {
        return _super.call(this) || this;
    }
    AcBeautyVoteFanRankPopupView.prototype.initView = function () {
        // this.tabbarGroup.x = this.viewBg.x + 45;
    };
    AcBeautyVoteFanRankPopupView.prototype.getTabbarTextArr = function () {
        return [
            "acBeautyVoteFanRankPopupViewTab1Title-" + this.param.data.code,
            "acBeautyVoteFanRankPopupViewTab2Title-" + this.param.data.code,
        ];
    };
    AcBeautyVoteFanRankPopupView.prototype.getTitleStr = function () {
        return "acBeautyVoteFanRankPopupViewTitle-" + this.param.data.code;
    };
    AcBeautyVoteFanRankPopupView.prototype.getShowHeight = function () {
        return 800;
    };
    AcBeautyVoteFanRankPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcBeautyVoteFanRankPopupView;
}(PopupView));
__reflect(AcBeautyVoteFanRankPopupView.prototype, "AcBeautyVoteFanRankPopupView");
//# sourceMappingURL=AcBeautyVoteFanRankPopupView.js.map