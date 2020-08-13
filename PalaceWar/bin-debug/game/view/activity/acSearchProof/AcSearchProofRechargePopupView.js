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
 * 搜查魏府	充值
 * author 张朝阳
 * date 2019/6/24
 * @class AcSearchProofRechargePopupView
 */
var AcSearchProofRechargePopupView = (function (_super) {
    __extends(AcSearchProofRechargePopupView, _super);
    function AcSearchProofRechargePopupView() {
        var _this = _super.call(this) || this;
        _this.code = null;
        _this.aid = null;
        _this._scrollList = null;
        return _this;
    }
    AcSearchProofRechargePopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreashView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETPROOFCHARGE, this.chargeRewardHandel, this);
        this.aid = this.param.data.aid;
        this.code = this.param.data.code;
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 540;
        bg.height = 700;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 15);
        this.addChildToContainer(bg);
        // let vo = <AcArcadeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        // let taskData = vo.getSortRecharge();
        // taskData.sort((a, b) => { return a.sortId - b.sortId });
        var rect = new egret.Rectangle(0, 0, 520, bg.height - 10);
        this._scrollList = ComponentManager.getScrollList(AcSearchProofRechargeScrollItem, null, rect, { aid: this.aid, code: this.code });
        this._scrollList.setPosition(bg.x + bg.width / 2 - this._scrollList.width / 2, bg.y + 5);
        this.addChildToContainer(this._scrollList);
        this.refreashView();
    };
    /**
     * 领奖回调
     */
    AcSearchProofRechargePopupView.prototype.chargeRewardHandel = function (event) {
        if (event.data.ret) {
            var rewards = event.data.data.data.rewards;
            if (event.data.data.data.special) {
                rewards = "1021_0_" + event.data.data.data.special + "_" + this.param.data.code + "|" + event.data.data.data.rewards;
            }
            var replacerewards = event.data.data.data.replacerewards;
            var rewardsVo = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardsVo);
            if (replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: replacerewards });
            }
            this.refreashView();
        }
    };
    AcSearchProofRechargePopupView.prototype.refreashView = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var taskData = vo.getSortRecharge();
        taskData.sort(function (a, b) { return a.sortId - b.sortId; });
        this._scrollList.refreshData(taskData, { aid: this.aid, code: this.code });
    };
    AcSearchProofRechargePopupView.prototype.getTitleStr = function () {
        return "acArcadeRechargeViewTitle-" + this.param.data.code;
    };
    AcSearchProofRechargePopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "accarnivalview_tab_red", "progress5", "progress3_bg", "accarnivalview_tab_green"
        ]);
    };
    AcSearchProofRechargePopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreashView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETPROOFCHARGE, this.chargeRewardHandel, this);
        this.aid = null;
        this.code = null;
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcSearchProofRechargePopupView;
}(PopupView));
__reflect(AcSearchProofRechargePopupView.prototype, "AcSearchProofRechargePopupView");
//# sourceMappingURL=AcSearchProofRechargePopupView.js.map