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
 * 	电玩大本营充值
 * author 张朝阳
 * date 2019/6/12
 * @class AcArcadeRechargeView
 */
var AcArcadeRechargeView = (function (_super) {
    __extends(AcArcadeRechargeView, _super);
    function AcArcadeRechargeView() {
        var _this = _super.call(this) || this;
        _this.code = null;
        _this.aid = null;
        _this._scrollList = null;
        return _this;
    }
    AcArcadeRechargeView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreashView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_ARCADEGETCHARGE, this.chargeRewardHandel, this);
        this.aid = this.param.data.aid;
        this.code = this.param.data.code;
        var bg = BaseBitmap.create("public_9_bg22");
        bg.width = 640;
        bg.height = GameConfig.stageHeigth - 89;
        bg.setPosition(0, -15);
        this.addChildToContainer(bg);
        var bg2 = BaseBitmap.create("public_9_bg43");
        bg2.width = 612;
        bg2.height = bg.height - 30 - 40;
        bg2.setPosition(bg.x + bg.width / 2 - bg2.width / 2, bg.y + 15);
        this.addChildToContainer(bg2);
        // let vo = <AcArcadeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        // let taskData = vo.getSortRecharge();
        // taskData.sort((a, b) => { return a.sortId - b.sortId });
        var rect = new egret.Rectangle(0, 0, 608, bg2.height - 10);
        this._scrollList = ComponentManager.getScrollList(AcArcadeRechageScrollItem, null, rect, { aid: this.aid, code: this.code });
        this._scrollList.setPosition(bg2.x + bg2.width / 2 - this._scrollList.width / 2, bg2.y + 5);
        this.addChildToContainer(this._scrollList);
        var tipTF = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeRechargeViewTip-" + this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        tipTF.setPosition(bg2.x + bg2.width / 2 - tipTF.width / 2, bg2.y + bg2.height + 10);
        this.addChildToContainer(tipTF);
        this.refreashView();
    };
    /**
     * 领奖回调
     */
    AcArcadeRechargeView.prototype.chargeRewardHandel = function (event) {
        if (event.data.ret) {
            var rewards = event.data.data.data.rewards;
            if (event.data.data.data.specialGift) {
                rewards = "1018_0_" + event.data.data.data.specialGift + "_" + this.param.data.code + "|" + event.data.data.data.rewards;
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
    AcArcadeRechargeView.prototype.refreashView = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var taskData = vo.getSortRecharge();
        taskData.sort(function (a, b) { return a.sortId - b.sortId; });
        this._scrollList.refreshData(taskData, { aid: this.aid, code: this.code });
    };
    AcArcadeRechargeView.prototype.getTitleStr = function () {
        return "acArcadeRechargeViewTitle-" + this.param.data.code;
    };
    AcArcadeRechargeView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "accarnivalview_tab_red", "progress5", "progress3_bg", "accarnivalview_tab_green"
        ]);
    };
    AcArcadeRechargeView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreashView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_ARCADEGETCHARGE, this.chargeRewardHandel, this);
        this.aid = null;
        this.code = null;
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcArcadeRechargeView;
}(CommonView));
__reflect(AcArcadeRechargeView.prototype, "AcArcadeRechargeView");
//# sourceMappingURL=AcArcadeRechargeView.js.map