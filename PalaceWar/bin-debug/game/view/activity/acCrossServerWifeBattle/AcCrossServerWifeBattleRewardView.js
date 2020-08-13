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
var AcCrossServerWifeBattleRewardView = (function (_super) {
    __extends(AcCrossServerWifeBattleRewardView, _super);
    function AcCrossServerWifeBattleRewardView() {
        return _super.call(this) || this;
    }
    AcCrossServerWifeBattleRewardView.prototype.getTabbarTextArr = function () {
        return [
            "acCrossServerWifeBattle_rewardTabTitle1",
            "acCrossServerWifeBattle_rewardTabTitle2",
            "acCrossServerWifeBattleRankTabTitle1",
            "acCrossServerWifeBattleRankTabTitle2",
        ];
    };
    AcCrossServerWifeBattleRewardView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "atkracecross_rewatdbg1",
            "atkracecross_rewatdbg2",
            "atkracecross_rewatdbg3",
            "wifeview_bottombg",
            "tombrewardrankbg-1",
            "accrossserverwipeboss_rankbg",
            "accrossserverwipeboss_rank1",
            "emparena_bottom", "ladder_itemtitlebg",
            "rankinglist_rankn1", "rankinglist_rankn2", "rankinglist_rankn3"
        ]);
    };
    AcCrossServerWifeBattleRewardView.prototype.isShowOpenAni = function () {
        return false;
    };
    Object.defineProperty(AcCrossServerWifeBattleRewardView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerWifeBattleRewardView.prototype.getRequestData = function () {
        var view = this;
        return this.vo.test ? null : { requestType: NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_RANK, requestData: {
                activeId: view.vo.aidAndCode,
            } };
    };
    AcCrossServerWifeBattleRewardView.prototype.receiveData = function (data) {
        // let view = this;
        // view.api.setRankInfo(data.data.data);
        console.log("receiveData--->", data, data.data.data);
        this.vo.setRankData(data.data.data);
    };
    AcCrossServerWifeBattleRewardView.prototype.getTitleStr = function () {
        return null;
    };
    AcCrossServerWifeBattleRewardView.prototype.getTitleBgName = function () {
        return "accrossserverwifebattle_rewardtitle";
    };
    AcCrossServerWifeBattleRewardView.prototype.initView = function () {
        this.checkRed();
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.checkRed, this);
    };
    AcCrossServerWifeBattleRewardView.prototype.checkRed = function () {
        if (this.vo.canLqAaward()) {
            this.tabbarGroup.addRedPoint(0);
        }
        else {
            this.tabbarGroup.removeRedPoint(0);
        }
    };
    AcCrossServerWifeBattleRewardView.prototype.hide = function () {
        AcCrossServerWifeBattleView.isOpenWin = false;
        _super.prototype.hide.call(this);
    };
    AcCrossServerWifeBattleRewardView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.checkRed, this);
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerWifeBattleRewardView;
}(CommonView));
__reflect(AcCrossServerWifeBattleRewardView.prototype, "AcCrossServerWifeBattleRewardView");
//# sourceMappingURL=AcCrossServerWifeBattleRewardView.js.map