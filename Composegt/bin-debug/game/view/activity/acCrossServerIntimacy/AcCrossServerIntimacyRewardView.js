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
var AcCrossServerIntimacyRewardView = (function (_super) {
    __extends(AcCrossServerIntimacyRewardView, _super);
    function AcCrossServerIntimacyRewardView() {
        return _super.call(this) || this;
    }
    AcCrossServerIntimacyRewardView.prototype.getTabbarTextArr = function () {
        return [
            "atkracecrossActivityRewardTab1",
            "atkracecrossActivityRewardTab2",
        ];
    };
    AcCrossServerIntimacyRewardView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "atkracecross_rewatdbg1",
            "atkracecross_rewatdbg2",
            "atkracecross_rewatdbg3",
            "wifeview_bottombg",
        ]);
    };
    AcCrossServerIntimacyRewardView.prototype.initView = function () {
    };
    AcCrossServerIntimacyRewardView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerIntimacyRewardView;
}(CommonView));
__reflect(AcCrossServerIntimacyRewardView.prototype, "AcCrossServerIntimacyRewardView");
