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
var AtkracecrossActivityRewardView = (function (_super) {
    __extends(AtkracecrossActivityRewardView, _super);
    function AtkracecrossActivityRewardView() {
        return _super.call(this) || this;
    }
    AtkracecrossActivityRewardView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_ATKRACECROSS_RANK, requestData: {} };
    };
    AtkracecrossActivityRewardView.prototype.receiveData = function (data) {
        if (data.ret == true && data.data && data.data.data.atkrank) {
            AtkracecrossActivityRewardView._merank = data.data.data.merank;
            AtkracecrossActivityRewardView._mepoint = data.data.data.mepoint;
            AtkracecrossActivityRewardView._iszonewin = data.data.data.iszonewin;
        }
    };
    AtkracecrossActivityRewardView.prototype.getTabbarTextArr = function () {
        return [
            "atkracecrossActivityRewardTab1",
            "atkracecrossActivityRewardTab2",
        ];
    };
    AtkracecrossActivityRewardView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "atkracecross_rewatdbg1",
            "atkracecross_rewatdbg2",
            "atkracecross_rewatdbg3",
            "wifeview_bottombg",
        ]);
    };
    AtkracecrossActivityRewardView.prototype.initView = function () {
    };
    AtkracecrossActivityRewardView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    AtkracecrossActivityRewardView._merank = 0;
    AtkracecrossActivityRewardView._mepoint = 0;
    AtkracecrossActivityRewardView._iszonewin = 0;
    return AtkracecrossActivityRewardView;
}(CommonView));
__reflect(AtkracecrossActivityRewardView.prototype, "AtkracecrossActivityRewardView");
