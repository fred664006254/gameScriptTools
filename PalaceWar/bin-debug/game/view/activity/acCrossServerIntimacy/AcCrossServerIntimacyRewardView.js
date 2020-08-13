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
    Object.defineProperty(AcCrossServerIntimacyRewardView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
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
        var view = this;
        view.update();
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
    };
    AcCrossServerIntimacyRewardView.prototype.update = function () {
        if (this.vo.checkZoneRewardDeddot()) {
            this.tabbarGroup.addRedPoint(0);
        }
        else {
            this.tabbarGroup.removeRedPoint(0);
        }
    };
    AcCrossServerIntimacyRewardView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerIntimacyRewardView;
}(CommonView));
__reflect(AcCrossServerIntimacyRewardView.prototype, "AcCrossServerIntimacyRewardView");
//# sourceMappingURL=AcCrossServerIntimacyRewardView.js.map