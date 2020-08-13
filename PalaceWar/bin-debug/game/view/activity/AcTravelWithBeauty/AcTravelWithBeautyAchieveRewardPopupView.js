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
 * 携美同游进度奖励
 * author yangchengguo
 * date 2019.9.5
 * @class  AcTravelWithBeautyAchieveRewardPopupView
 */
var AcTravelWithBeautyAchieveRewardPopupView = (function (_super) {
    __extends(AcTravelWithBeautyAchieveRewardPopupView, _super);
    function AcTravelWithBeautyAchieveRewardPopupView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._storyId = null;
        return _this;
    }
    AcTravelWithBeautyAchieveRewardPopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_TRAVELWITHBEAUTY_REWARD, this.getAchievementCallback, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACTRAVELWITHBEAUTY_PLAYSTORY, this.getPlayStoryId, this);
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
        // processCfg.sort((a, b) => { return a.sortId - b.sortId });
        var rect = new egret.Rectangle(0, 0, 520, 710);
        this._scrollList = ComponentManager.getScrollList(AcTravelWithBeautyAchieveRewardScrollItem, processCfg, rect, { id: id, code: code, aid: aid });
        this._scrollList.setPosition(bg.x + 3, bg.y + 5);
        // this._scrollList.bounces = false;
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
    AcTravelWithBeautyAchieveRewardPopupView.prototype.getAchievementCallback = function (event) {
        if (event.data.ret) {
            var rData_1 = event.data.data.data;
            if (this.getTypeCode() == "3" && this._storyId && Number(this._storyId) > 5) {
                this.showReward(rData_1);
            }
            else {
                var view_1 = this;
                var dKey = "rewardDialog_" + view_1.getTypeCode();
                ViewController.getInstance().openView(ViewConst.POPUP.ACYIYIBUSHEAVGVIEW, {
                    aid: view_1.param.data.aid,
                    code: view_1.getTypeCode(),
                    AVGDialog: view_1.cfg[dKey],
                    visitId: view_1._storyId,
                    talkKey: "acTravelWithBeautyRewardTalk_",
                    bgName: "actravelwithbeauty_bg-" + view_1.getTypeCode(),
                    callBack: function () {
                        view_1.showReward(rData_1);
                    },
                    obj: view_1
                });
            }
        }
    };
    AcTravelWithBeautyAchieveRewardPopupView.prototype.getPlayStoryId = function (data) {
        if (data.data && data.data.id) {
            this._storyId = data.data.id;
        }
    };
    AcTravelWithBeautyAchieveRewardPopupView.prototype.showReward = function (rData) {
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
    AcTravelWithBeautyAchieveRewardPopupView.prototype.refreshView = function () {
        if (!this._scrollList) {
            return;
        }
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        var data = vo.getSortAchievementCfg();
        this._scrollList.refreshData(data, { code: this.param.data.code, aid: this.param.data.aid });
    };
    AcTravelWithBeautyAchieveRewardPopupView.prototype.getTypeCode = function () {
        if (this.param.data.code == "2") {
            return "1";
        }
        else if (this.param.data.code == "4") {
            return "3";
        }
        return this.param.data.code;
    };
    Object.defineProperty(AcTravelWithBeautyAchieveRewardPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcTravelWithBeautyAchieveRewardPopupView.prototype.getTitleStr = function () {
        var code = this.param.data.code;
        if (this.param.data.code == "2") {
            code = "1";
        }
        else if (this.param.data.code == "4") {
            code = "3";
        }
        return "acTravelWithBeautyAchieveTitle-" + code;
    };
    AcTravelWithBeautyAchieveRewardPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["progress3_bg", "progress3"
        ]);
    };
    AcTravelWithBeautyAchieveRewardPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_TRAVELWITHBEAUTY_REWARD, this.getAchievementCallback, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACTRAVELWITHBEAUTY_PLAYSTORY, this.getPlayStoryId, this);
        this._scrollList = null;
        this._storyId = null;
        _super.prototype.dispose.call(this);
    };
    return AcTravelWithBeautyAchieveRewardPopupView;
}(PopupView));
__reflect(AcTravelWithBeautyAchieveRewardPopupView.prototype, "AcTravelWithBeautyAchieveRewardPopupView");
//# sourceMappingURL=AcTravelWithBeautyAchieveRewardPopupView.js.map