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
 * 巾帼英雄进度奖励
 * author ycg
 * date 2019.9.5
 * @class  AcHeroineAchievementPopupView
 */
var AcHeroineAchievementPopupView = (function (_super) {
    __extends(AcHeroineAchievementPopupView, _super);
    function AcHeroineAchievementPopupView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._storyId = null;
        return _this;
    }
    AcHeroineAchievementPopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_HEROINE_GETREWARD, this.getAchievementCallback, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACHEROINE_PLAYSTORY, this.getPlayStoryId, this);
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
        this._scrollList = ComponentManager.getScrollList(AcHeroineAchievementScrollItem, processCfg, rect, { id: id, code: code, aid: aid });
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
    AcHeroineAchievementPopupView.prototype.getAchievementCallback = function (event) {
        if (event && event.data && event.data.ret) {
            var rData_1 = event.data.data.data;
            var view_1 = this;
            var dia = "rewardDialog_" + this.getTypeCode();
            var dialog = view_1.cfg[dia];
            // if (this.getTypeCode() == "1"){
            // 	dialog = view.cfg.rewardDialog_1;
            // }
            var bgName = ResourceManager.hasRes("acheroine_bg-" + view_1.getTypeCode()) ? "acheroine_bg-" + view_1.getTypeCode() : "acheroine_bg-1";
            ViewController.getInstance().openView(ViewConst.POPUP.ACYIYIBUSHEAVGVIEW, {
                aid: view_1.param.data.aid,
                code: view_1.getTypeCode(),
                AVGDialog: dialog,
                visitId: view_1._storyId,
                talkKey: "acHeroineRewardTalk_",
                bgName: bgName,
                callBack: function () {
                    view_1.showReward(rData_1);
                },
                obj: view_1
            });
        }
    };
    AcHeroineAchievementPopupView.prototype.getPlayStoryId = function (data) {
        if (data.data && data.data.id) {
            this._storyId = data.data.id;
        }
    };
    AcHeroineAchievementPopupView.prototype.showReward = function (rData) {
        var rewards = rData.rewards;
        var replacerewards = rData.replacerewards;
        var rewardVo = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rewardVo);
        if (replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
        }
    };
    AcHeroineAchievementPopupView.prototype.refreshView = function () {
        if (!this._scrollList) {
            return;
        }
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        var data = vo.getSortAchievementCfg();
        this._scrollList.refreshData(data, { code: this.param.data.code, aid: this.param.data.aid });
    };
    AcHeroineAchievementPopupView.prototype.getTypeCode = function () {
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
    Object.defineProperty(AcHeroineAchievementPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcHeroineAchievementPopupView.prototype.getTitleStr = function () {
        var code = this.param.data.code;
        if (this.param.data.code == "2") {
            code = "1";
        }
        else if (this.param.data.code == "4") {
            code = "3";
        }
        if (this.param.data.code == "6") {
            code = "5";
        }
        if (this.param.data.code == "8") {
            code = "7";
        }
        if (this.param.data.code == "10") {
            code = "9";
        }
        return "acHeroineFightRewardTitle-" + code;
    };
    AcHeroineAchievementPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["progress3_bg", "progress3"
        ]);
    };
    AcHeroineAchievementPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_HEROINE_GETREWARD, this.getAchievementCallback, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACHEROINE_PLAYSTORY, this.getPlayStoryId, this);
        this._scrollList = null;
        this._storyId = null;
        _super.prototype.dispose.call(this);
    };
    return AcHeroineAchievementPopupView;
}(PopupView));
__reflect(AcHeroineAchievementPopupView.prototype, "AcHeroineAchievementPopupView");
//# sourceMappingURL=AcHeroineAchievementPopupView.js.map