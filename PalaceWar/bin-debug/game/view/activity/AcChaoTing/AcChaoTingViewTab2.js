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
 * 充值奖励
 * author ycg
 * date 2020.3.24
 */
var AcChaoTingViewTab2 = (function (_super) {
    __extends(AcChaoTingViewTab2, _super);
    function AcChaoTingViewTab2() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this.initView();
        return _this;
    }
    AcChaoTingViewTab2.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACCHAOTING_GETRECHARGE, this.getRewardCallback, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        var baseView = ViewController.getInstance().getView("AcChaoTingView");
        var showHeight = baseView.getListShowHeight();
        var data = this.vo.getSortRechargeCfg();
        App.LogUtil.log("tab1 " + showHeight + " dataleng " + data.length);
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, showHeight - 10);
        var scrollList = ComponentManager.getScrollList(AcChaoTingViewTabScrollItem2, data, rect, { aid: this.aid, code: this.code });
        scrollList.setPosition(GameConfig.stageWidth / 2 - scrollList.width / 2, 5);
        this.addChild(scrollList);
        this._scrollList = scrollList;
    };
    AcChaoTingViewTab2.prototype.getRewardCallback = function (evt) {
        if (!evt.data.ret) {
            return;
        }
        var rData = evt.data.data.data;
        // ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":rData.rewards, "otherRewards":rData.otherrewards, "isPlayAni":true});
        var rewardVoList = GameData.formatRewardItem(rData.rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": rData.replacerewards });
        }
    };
    AcChaoTingViewTab2.prototype.refreshView = function (evt) {
        var data = this.vo.getSortRechargeCfg();
        this._scrollList.refreshData(data, { aid: this.aid, code: this.code });
    };
    AcChaoTingViewTab2.prototype.getTypeCode = function () {
        return this.code;
    };
    Object.defineProperty(AcChaoTingViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcChaoTingViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcChaoTingViewTab2.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACCHAOTING_GETRECHARGE, this.getRewardCallback, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        _super.prototype.dispose.call(this);
    };
    return AcChaoTingViewTab2;
}(AcCommonViewTab));
__reflect(AcChaoTingViewTab2.prototype, "AcChaoTingViewTab2");
//# sourceMappingURL=AcChaoTingViewTab2.js.map