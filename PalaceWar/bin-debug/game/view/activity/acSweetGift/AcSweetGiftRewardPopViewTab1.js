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
 * 活动奖励
 * author yangchengguo
 * date 2019.8.20
 * @class AcSweetGiftRewardPopViewTab1
 */
var AcSweetGiftRewardPopViewTab1 = (function (_super) {
    __extends(AcSweetGiftRewardPopViewTab1, _super);
    function AcSweetGiftRewardPopViewTab1() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this.initView();
        return _this;
    }
    AcSweetGiftRewardPopViewTab1.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_SWEETGIFT_GETCHARGE, this.requestCallback, this);
        this.height = 670;
        this.width = 520;
        var dataList = this.vo.getSortRechargeCfg();
        var rect = new egret.Rectangle(0, 0, 520, 670);
        var scrollList = ComponentManager.getScrollList(AcSweetGiftRewardTab1ScrollItem, dataList, rect, { aid: this.aid, code: this.code });
        scrollList.setPosition(30 + 1, 60);
        this.addChild(scrollList);
        this._scrollList = scrollList;
    };
    AcSweetGiftRewardPopViewTab1.prototype.requestCallback = function (event) {
        var rData = event.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        var rewards = rData.rewards;
        var rewardVoList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
        }
    };
    AcSweetGiftRewardPopViewTab1.prototype.refreshView = function () {
        if (!this.vo) {
            return;
        }
        var dataList = this.vo.getSortRechargeCfg();
        this._scrollList.refreshData(dataList, { aid: this.aid, code: this.code });
    };
    Object.defineProperty(AcSweetGiftRewardPopViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSweetGiftRewardPopViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcSweetGiftRewardPopViewTab1.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_SWEETGIFT_GETCHARGE, this.requestCallback, this);
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcSweetGiftRewardPopViewTab1;
}(AcCommonViewTab));
__reflect(AcSweetGiftRewardPopViewTab1.prototype, "AcSweetGiftRewardPopViewTab1");
//# sourceMappingURL=AcSweetGiftRewardPopViewTab1.js.map