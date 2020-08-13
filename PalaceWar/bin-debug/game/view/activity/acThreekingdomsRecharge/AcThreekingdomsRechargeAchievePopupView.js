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
 * 三国进度奖励
 * author ycg
 * date 2020.1.14
 * @class  AcThreekingdomsRechargeAchievePopupView
 */
var AcThreekingdomsRechargeAchievePopupView = (function (_super) {
    __extends(AcThreekingdomsRechargeAchievePopupView, _super);
    function AcThreekingdomsRechargeAchievePopupView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._storyId = null;
        return _this;
    }
    AcThreekingdomsRechargeAchievePopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_THREEKINGDOMSRECHARGE_REWARDS, this.getAchievementCallback, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        // App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACTRAVELWITHBEAUTY_PLAYSTORY, this.getPlayStoryId, this);
        var aid = this.param.data.aid;
        var code = this.param.data.code;
        var id = this.param.data.id;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(aid, code);
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 530;
        bg.height = 720;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 15);
        this.addChildToContainer(bg);
        var processCfg = vo.getSortAchievementCfg();
        var rect = new egret.Rectangle(0, 0, 520, 710);
        this._scrollList = ComponentManager.getScrollList(AcThreekingdomsRechargeAchieveScrollItem, processCfg, rect, { id: id, code: code, aid: aid });
        this._scrollList.setPosition(bg.x + 3, bg.y + 5);
        this.addChildToContainer(this._scrollList);
        if (id) {
            for (var i = 0; i < processCfg.length; i++) {
                if (processCfg[i].id == id) {
                    this._scrollList.setScrollTopByIndex(i, 1000);
                    break;
                }
            }
        }
    };
    /**刷新item */
    AcThreekingdomsRechargeAchievePopupView.prototype.getAchievementCallback = function (event) {
        if (event.data.ret) {
            var rData = event.data.data.data;
            this.showReward(rData);
        }
    };
    AcThreekingdomsRechargeAchievePopupView.prototype.getPlayStoryId = function (data) {
        if (data.data && data.data.id) {
            this._storyId = data.data.id;
        }
    };
    AcThreekingdomsRechargeAchievePopupView.prototype.showReward = function (rData) {
        var rewards = rData.rewards;
        var replacerewards = rData.replacerewards;
        var rewardVo = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rewardVo);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        var data = vo.getSortAchievementCfg();
        this._scrollList.refreshData(data, { id: null, code: this.param.data.code, aid: this.param.data.aid });
        if (replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
        }
    };
    AcThreekingdomsRechargeAchievePopupView.prototype.refreshView = function () {
        if (!this._scrollList) {
            return;
        }
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        var data = vo.getSortAchievementCfg();
        this._scrollList.refreshData(data, { code: this.param.data.code, aid: this.param.data.aid });
    };
    AcThreekingdomsRechargeAchievePopupView.prototype.getTypeCode = function () {
        var code = this.param.data.code;
        if (code == "2") {
            return "1";
        }
        else if (code == "4") {
            return "3";
        }
        else if (code == "6") {
            return "5";
        }
        else if (code == "8") {
            return "7";
        }
        else if (code == "10") {
            return "9";
        }
        return code;
    };
    Object.defineProperty(AcThreekingdomsRechargeAchievePopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcThreekingdomsRechargeAchievePopupView.prototype.getTitleStr = function () {
        return "acThreekingdomsRechargeKillRewardTitle-" + this.getTypeCode();
    };
    AcThreekingdomsRechargeAchievePopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "progress3_bg", "progress3"
        ]);
    };
    AcThreekingdomsRechargeAchievePopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_TRAVELWITHBEAUTY_REWARD, this.getAchievementCallback, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACTRAVELWITHBEAUTY_PLAYSTORY, this.getPlayStoryId, this);
        this._scrollList = null;
        this._storyId = null;
        _super.prototype.dispose.call(this);
    };
    return AcThreekingdomsRechargeAchievePopupView;
}(PopupView));
__reflect(AcThreekingdomsRechargeAchievePopupView.prototype, "AcThreekingdomsRechargeAchievePopupView");
//# sourceMappingURL=AcThreekingdomsRechargeAchievePopupView.js.map