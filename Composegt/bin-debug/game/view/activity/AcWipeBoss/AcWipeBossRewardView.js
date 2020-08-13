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
var AcWipeBossRewardView = (function (_super) {
    __extends(AcWipeBossRewardView, _super);
    function AcWipeBossRewardView() {
        return _super.call(this) || this;
    }
    AcWipeBossRewardView.prototype.getTabbarTextArr = function () {
        return [
            "acPunishRankRewardTab1",
            "acPunishRankRewardTab2",
            "acwipeBossReward"
        ];
    };
    AcWipeBossRewardView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "atkracecross_rewatdbg1",
            "atkracecross_rewatdbg2",
            "atkracecross_rewatdbg3",
            "wifeview_bottombg",
            "acwipeboss_scoreicon1",
            "acwipeboss_scoreicon2",
            "adult_lowbg",
            "rechargevie_db_01",
            "acwipeboss_namebg"
        ]);
    };
    AcWipeBossRewardView.prototype.getTitleStr = function () {
        return 'itemDropDesc_1011';
    };
    AcWipeBossRewardView.prototype.initView = function () {
    };
    AcWipeBossRewardView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcWipeBossRewardView;
}(CommonView));
__reflect(AcWipeBossRewardView.prototype, "AcWipeBossRewardView");
