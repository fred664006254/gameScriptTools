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
  * 诸葛亮传活动充值奖励
  * @author 张朝阳
  * date 2019/5/16
  * @class AcLiangBiographyChargePopupView
  */
var AcLiangBiographyChargePopupView = (function (_super) {
    __extends(AcLiangBiographyChargePopupView, _super);
    function AcLiangBiographyChargePopupView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        return _this;
    }
    AcLiangBiographyChargePopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETLIANGCHARGE, this.liangchargeHandle, this);
        this.aid = this.param.data.aid;
        this.code = this.param.data.code;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var bg = BaseLoadBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 685;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 15);
        this.addChildToContainer(bg);
        var rect = new egret.Rectangle(0, 0, 510, 675);
        this._scrollList = ComponentManager.getScrollList(AcLiangBiographyChargeScrollItem, null, rect, { aid: this.aid, code: this.code });
        this._scrollList.setPosition(bg.x + 5, bg.y + 5);
        this.addChildToContainer(this._scrollList);
        this.refreshView();
    };
    /**刷新界面 */
    AcLiangBiographyChargePopupView.prototype.refreshView = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var sortRechargeCfg = vo.getSortRechargeCfg();
        sortRechargeCfg.sort(function (a, b) {
            return a.sortId - b.sortId;
        });
        this._scrollList.refreshData(sortRechargeCfg, { aid: this.aid, code: this.code });
    };
    /**领取奖励 */
    AcLiangBiographyChargePopupView.prototype.liangchargeHandle = function (event) {
        if (event.data.ret) {
            var rewards = "1012_0_" + event.data.data.data.specialGift + "_" + this.param.data.code + "|" + event.data.data.data.rewards;
            var rewardsVo = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardsVo);
            this.refreshView();
        }
    };
    AcLiangBiographyChargePopupView.prototype.getTitleStr = function () {
        return "acLiangBiographyChargePopupViewTitle-" + this.param.data.code;
    };
    AcLiangBiographyChargePopupView.prototype.dispose = function () {
        this.aid = null;
        this.code = null;
        this._scrollList = null;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETLIANGCHARGE, this.liangchargeHandle, this);
        _super.prototype.dispose.call(this);
    };
    return AcLiangBiographyChargePopupView;
}(PopupView));
__reflect(AcLiangBiographyChargePopupView.prototype, "AcLiangBiographyChargePopupView");
//# sourceMappingURL=AcLiangBiographyChargePopupView.js.map