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
 * date 2019.8.28
 * @class AcThrowStoneRewardPopViewTab1
 */
var AcThrowStoneRewardPopViewTab1 = (function (_super) {
    __extends(AcThrowStoneRewardPopViewTab1, _super);
    function AcThrowStoneRewardPopViewTab1() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this.initView();
        return _this;
    }
    AcThrowStoneRewardPopViewTab1.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_THROWSTONE_GETCHARGE, this.requestCallback, this);
        var rewardBg = BaseBitmap.create("public_9_bg4");
        rewardBg.width = 530;
        rewardBg.height = 680;
        rewardBg.setPosition(25, 60);
        this.addChild(rewardBg);
        var dataList = this.vo.getSortRechargeCfg();
        var rect = new egret.Rectangle(0, 0, 530, 670);
        var scrollList = ComponentManager.getScrollList(AcThrowStoneRewardTab1ScrollItem, dataList, rect, { aid: this.aid, code: this.code });
        scrollList.setPosition(25, 65);
        this.addChild(scrollList);
        this._scrollList = scrollList;
    };
    AcThrowStoneRewardPopViewTab1.prototype.requestCallback = function (event) {
        var rData = event.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        var rewards = rData.rewards;
        if (rData.specialGift) {
            rewards = "1027_0_" + rData.specialGift + "_" + this.getTypeCode() + "|" + rewards;
        }
        var rewardVoList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
        }
    };
    AcThrowStoneRewardPopViewTab1.prototype.refreshView = function () {
        if (!this.vo) {
            return;
        }
        var dataList = this.vo.getSortRechargeCfg();
        this._scrollList.refreshData(dataList, { aid: this.aid, code: this.code });
    };
    Object.defineProperty(AcThrowStoneRewardPopViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcThrowStoneRewardPopViewTab1.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    Object.defineProperty(AcThrowStoneRewardPopViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcThrowStoneRewardPopViewTab1.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_THROWSTONE_GETCHARGE, this.requestCallback, this);
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcThrowStoneRewardPopViewTab1;
}(AcCommonViewTab));
__reflect(AcThrowStoneRewardPopViewTab1.prototype, "AcThrowStoneRewardPopViewTab1");
//# sourceMappingURL=AcThrowStoneRewardPopViewTab1.js.map