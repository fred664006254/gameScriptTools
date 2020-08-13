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
 * 女优活动3 活动预览
 * author ycg
 * date 2019.10.14
 * @class AcYiyibusheAchievementPopupView
 */
var AcYiyibusheAchievementPopupView = (function (_super) {
    __extends(AcYiyibusheAchievementPopupView, _super);
    function AcYiyibusheAchievementPopupView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._storyId = null;
        return _this;
    }
    AcYiyibusheAchievementPopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_YIYIBUSHE_GETREWARD, this.getAchievementCallback, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACYIYIBUSHE_PLAYSTORY, this.playStory, this);
        var aid = this.param.data.aid;
        var code = this.param.data.code;
        var id = this.param.data.id;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(aid, code);
        var bg = BaseBitmap.create("public_9_probiginnerbg");
        bg.width = 550;
        bg.height = 750;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 15);
        this.addChildToContainer(bg);
        var processCfg = vo.getSortAchievementCfg();
        processCfg.sort(function (a, b) { return a.sortId - b.sortId; });
        var rect = new egret.Rectangle(0, 0, 540, 740);
        this._scrollList = ComponentManager.getScrollList(AcYiyibusheAchievementScrollItem, processCfg, rect, { id: id, code: code, aid: aid });
        this._scrollList.setPosition(bg.x + 5, bg.y + 5);
        this._scrollList.bounces = true;
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
    AcYiyibusheAchievementPopupView.prototype.playStory = function (data) {
        if (data.data && data.data.id) {
            this._storyId = data.data.id;
        }
    };
    /**刷新item */
    AcYiyibusheAchievementPopupView.prototype.getAchievementCallback = function (event) {
        if (event && event.data && event.data.ret) {
            var rData_1 = event.data.data.data;
            if (rData_1) {
                var view_1 = this;
                ViewController.getInstance().openView(ViewConst.POPUP.ACYIYIBUSHEAVGVIEW, {
                    aid: view_1.param.data.aid,
                    code: view_1.param.data.code,
                    AVGDialog: view_1.cfg.AVGDialog,
                    visitId: view_1._storyId,
                    talkKey: "acYiyibusheTalk_",
                    bgName: "acyiyibushe_bg-" + view_1.param.data.code,
                    callBack: function () {
                        view_1.showReward(rData_1);
                    },
                    obj: view_1
                });
            }
            // let rewards = rData.rewards;
            // let replacerewards = rData.replacerewards;
            // let rewardVo = GameData.formatRewardItem(rewards);
            // App.CommonUtil.playRewardFlyAction(rewardVo);
            // let vo = <AcYiyibusheVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
            // let data = vo.getSortAchievementCfg();
            // data.sort((a, b) => { return a.sortId - b.sortId });
            // this._scrollList.refreshData(data, { id: null, code: this.param.data.code, aid: this.param.data.aid })
            // if (replacerewards) {
            // 	ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
            // }
        }
    };
    AcYiyibusheAchievementPopupView.prototype.showReward = function (rData) {
        var rewards = rData.rewards;
        var replacerewards = rData.replacerewards;
        var view = this;
        ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rewards, "isPlayAni": true, "callback": function () {
                var vo = Api.acVoApi.getActivityVoByAidAndCode(view.param.data.aid, view.param.data.code);
                var data = vo.getSortAchievementCfg();
                data.sort(function (a, b) { return a.sortId - b.sortId; });
                view._scrollList.refreshData(data, { id: null, code: view.param.data.code, aid: view.param.data.aid });
            }, "handler": view });
        if (replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
        }
    };
    Object.defineProperty(AcYiyibusheAchievementPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcYiyibusheAchievementPopupView.prototype.getTitleStr = function () {
        return "acYiyibusheAchieveRewardTitle";
    };
    AcYiyibusheAchievementPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["progress3_bg", "progress3"
        ]);
    };
    AcYiyibusheAchievementPopupView.prototype.getShowWidth = function () {
        return 600;
    };
    AcYiyibusheAchievementPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_YIYIBUSHE_GETREWARD, this.getAchievementCallback, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACYIYIBUSHE_PLAYSTORY, this.playStory, this);
        this._scrollList = null;
        this._storyId = null;
        _super.prototype.dispose.call(this);
    };
    return AcYiyibusheAchievementPopupView;
}(PopupView));
__reflect(AcYiyibusheAchievementPopupView.prototype, "AcYiyibusheAchievementPopupView");
//# sourceMappingURL=AcYiyibusheAchievementPopupView.js.map