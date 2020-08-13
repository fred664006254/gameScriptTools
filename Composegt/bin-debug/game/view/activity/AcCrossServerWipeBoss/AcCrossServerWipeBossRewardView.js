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
 * author:qianjun
 * desc:奖励弹窗
*/
var AcCrossServerWipeBossRewardView = (function (_super) {
    __extends(AcCrossServerWipeBossRewardView, _super);
    function AcCrossServerWipeBossRewardView() {
        return _super.call(this) || this;
    }
    AcCrossServerWipeBossRewardView.prototype.getTabbarTextArr = function () {
        return [
            "acCrossServerWipeBoss_rewardTabTitle1",
            "acCrossServerWipeBoss_rewardTabTitle2",
            "acwipeBossReward"
        ];
    };
    AcCrossServerWipeBossRewardView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "atkracecross_rewatdbg1",
            "atkracecross_rewatdbg2",
            "atkracecross_rewatdbg3",
            "wifeview_bottombg",
            "accrossserverwipeboss_scoreicon1",
            "accrossserverwipeboss_scoreicon2",
            "adult_lowbg",
            "rechargevie_db_01",
            "accrossserverwipeboss_namebg",
            "accrossserverwipeboss_first",
            "accrossserverwipeboss_rankbg",
            "accrossserverwipeboss_rank1"
        ]);
    };
    AcCrossServerWipeBossRewardView.prototype.getTitleStr = function () {
        return 'itemDropDesc_1011';
    };
    AcCrossServerWipeBossRewardView.prototype.initView = function () {
    };
    AcCrossServerWipeBossRewardView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerWipeBossRewardView;
}(CommonView));
__reflect(AcCrossServerWipeBossRewardView.prototype, "AcCrossServerWipeBossRewardView");
