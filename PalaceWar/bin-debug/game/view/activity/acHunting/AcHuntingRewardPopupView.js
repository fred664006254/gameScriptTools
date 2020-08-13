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
  * 东郊狩猎奖励
  * author 杨成国
  * date 2019.7.24
  * @class AcHuntingRewardPopupView
  */
var AcHuntingRewardPopupView = (function (_super) {
    __extends(AcHuntingRewardPopupView, _super);
    function AcHuntingRewardPopupView() {
        var _this = _super.call(this) || this;
        _this._chargeScrollList = null;
        _this._killScorllList = null;
        _this._tabbarGroup = null;
        return _this;
    }
    AcHuntingRewardPopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreashView, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_HUNTING_GETCHARGE), this.refreshChargeReward, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_KILLREWARD), this.refreshKillReward, this);
        // 奖励tabbar
        var tabName = ["achuntingRechargeReward", "achuntingKillReward-" + this.code];
        var tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB, tabName, this.tabBtnClickHandler, this);
        tabbarGroup.setPosition(35 + GameData.popupviewOffsetX, 15);
        this.addChildToContainer(tabbarGroup);
        this._tabbarGroup = tabbarGroup;
        //奖励bg 
        var rewardBg = BaseBitmap.create("public_9_bg4");
        rewardBg.width = 530;
        rewardBg.height = 680;
        rewardBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - rewardBg.width / 2, tabbarGroup.y + tabbarGroup.height);
        this.addChildToContainer(rewardBg);
        //充值奖励
        var chargeData = this.vo.getSortRechargeCfg();
        var rect = new egret.Rectangle(5, 0, rewardBg.width - 10, rewardBg.height - 15);
        this._chargeScrollList = ComponentManager.getScrollList(AcHuntingChargeRewardScrollItem, chargeData, rect, { aid: this.aid, code: this.code });
        this._chargeScrollList.setPosition(rewardBg.x + 5, rewardBg.y + 5);
        this.addChildToContainer(this._chargeScrollList);
        //击杀奖励
        var killRewardList = this.vo.getSortAchievementCfg();
        var rewardRect = new egret.Rectangle(5, 0, rewardBg.width - 10, rewardBg.height - 15);
        this._killScorllList = ComponentManager.getScrollList(AcHuntingKillRewardScrollItem, killRewardList, rewardRect, { aid: this.aid, code: this.code });
        this._killScorllList.setPosition(rewardBg.x + 5, rewardBg.y + 5);
        this.addChildToContainer(this._killScorllList);
        this._killScorllList.visible = false;
        if (this.vo.isShowChargeRewardRedDot()) {
            this._tabbarGroup.addRedPoint(0);
        }
        else {
            this._tabbarGroup.removeRedPoint(0);
        }
        if (this.vo.isShowKillRewardRedDot()) {
            this._tabbarGroup.addRedPoint(1);
        }
        else {
            this._tabbarGroup.removeRedPoint(1);
        }
    };
    AcHuntingRewardPopupView.prototype.tabBtnClickHandler = function (params) {
        if (params.index == 1) {
            this.showKillRewardUI();
        }
        else {
            this.showChargeRewardUI();
        }
    };
    AcHuntingRewardPopupView.prototype.showChargeRewardUI = function () {
        this._killScorllList.visible = false;
        this._chargeScrollList.visible = true;
    };
    AcHuntingRewardPopupView.prototype.showKillRewardUI = function () {
        this._killScorllList.visible = true;
        this._chargeScrollList.visible = false;
    };
    AcHuntingRewardPopupView.prototype.refreshChargeReward = function (event) {
        if (event.data.ret) {
            var data = event.data.data.data;
            var specialGift = data.specialGift;
            App.LogUtil.log("refreshChargeReward: " + specialGift + " rewards:" + data.rewards);
            var rewards = "1023_0_" + specialGift + "_" + this.code + "|" + data.rewards;
            // ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":rewards,"isPlayAni":true});
            var rewardVoList = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardVoList);
            if (data.replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": data.replacerewards });
            }
            if (this.vo.isShowChargeRewardRedDot()) {
                this._tabbarGroup.addRedPoint(0);
            }
            else {
                this._tabbarGroup.removeRedPoint(0);
            }
            var dataList = this.vo.getSortRechargeCfg();
            this._chargeScrollList.refreshData(dataList, { aid: this.aid, code: this.code });
        }
    };
    AcHuntingRewardPopupView.prototype.refreshKillReward = function (event) {
        if (event.data.ret) {
            var data = event.data.data.data;
            // ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":data.rewards,"isPlayAni":true});
            var rewardVoList = GameData.formatRewardItem(data.rewards);
            App.CommonUtil.playRewardFlyAction(rewardVoList);
            if (data.replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": data.replacerewards });
            }
            if (this.vo.isShowKillRewardRedDot()) {
                this._tabbarGroup.addRedPoint(1);
            }
            else {
                this._tabbarGroup.removeRedPoint(1);
            }
            var dataList = this.vo.getSortAchievementCfg();
            this._killScorllList.refreshData(dataList, { aid: this.aid, code: this.code });
        }
    };
    AcHuntingRewardPopupView.prototype.refreashView = function () {
        if (this.vo.isShowChargeRewardRedDot()) {
            this._tabbarGroup.addRedPoint(0);
        }
        else {
            this._tabbarGroup.removeRedPoint(0);
        }
        var dataList = this.vo.getSortRechargeCfg();
        this._chargeScrollList.refreshData(dataList, { aid: this.aid, code: this.code });
    };
    Object.defineProperty(AcHuntingRewardPopupView.prototype, "cfg", {
        /**
         * 配置文件数据
         */
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcHuntingRewardPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcHuntingRewardPopupView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcHuntingRewardPopupView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    /**标题 */
    AcHuntingRewardPopupView.prototype.getTitleStr = function () {
        return "achuntingRewardTitle";
    };
    AcHuntingRewardPopupView.prototype.getShowHeight = function () {
        return 830;
    };
    AcHuntingRewardPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "accarnivalview_tab_green", "accarnivalview_tab_red",
            "progress5", "progress3_bg",
            "collectflag", "progress8",
            "common_titlebg",
        ]);
    };
    AcHuntingRewardPopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_HUNTING_GETCHARGE), this.refreshChargeReward, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_KILLREWARD), this.refreshChargeReward, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreashView, this);
        _super.prototype.dispose.call(this);
    };
    return AcHuntingRewardPopupView;
}(PopupView));
__reflect(AcHuntingRewardPopupView.prototype, "AcHuntingRewardPopupView");
//# sourceMappingURL=AcHuntingRewardPopupView.js.map