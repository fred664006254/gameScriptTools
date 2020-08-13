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
var AcCrossServerPowerRewardView = (function (_super) {
    __extends(AcCrossServerPowerRewardView, _super);
    function AcCrossServerPowerRewardView() {
        return _super.call(this) || this;
    }
    AcCrossServerPowerRewardView.prototype.getTabbarTextArr = function () {
        return [
            "atkracecrossActivityRewardTab1",
            "atkracecrossActivityRewardTab2",
        ];
    };
    AcCrossServerPowerRewardView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "atkracecross_rewatdbg1",
            "atkracecross_rewatdbg2",
            "atkracecross_rewatdbg3",
            "wifeview_bottombg",
            "itemeffect",
            "rechargevie_db_01"
        ]);
    };
    AcCrossServerPowerRewardView.prototype.initView = function () {
    };
    AcCrossServerPowerRewardView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerPowerRewardView;
}(CommonView));
__reflect(AcCrossServerPowerRewardView.prototype, "AcCrossServerPowerRewardView");
