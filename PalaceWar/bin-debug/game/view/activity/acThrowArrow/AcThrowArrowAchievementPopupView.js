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
 * 宝箱奖励
 * author 张朝阳
 * date 2019/4/8
 * @class AcThrowArrowAchievementPopupView
 */
var AcThrowArrowAchievementPopupView = (function (_super) {
    __extends(AcThrowArrowAchievementPopupView, _super);
    function AcThrowArrowAchievementPopupView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        return _this;
    }
    AcThrowArrowAchievementPopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_THROWARROWGETACHIEVEMENTRWD, this.weathRewardHandle, this);
        var aid = this.param.data.aid;
        var code = this.param.data.code;
        var id = this.param.data.id;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(aid, code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(aid, code);
        var bg = BaseBitmap.create("public_9_probiginnerbg");
        bg.width = 530;
        bg.height = 720;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 15);
        this.addChildToContainer(bg);
        // let processCfg = vo.getSortProcessCfg();
        var processCfg = vo.getSortAchievementCfg();
        processCfg.sort(function (a, b) { return a.sortId - b.sortId; });
        var rect = new egret.Rectangle(0, 0, 520, 710);
        this._scrollList = ComponentManager.getScrollList(AcThrowArrowAchievementScrollItem, processCfg, rect, { id: id, code: code, aid: aid });
        this._scrollList.setPosition(bg.x + 3, bg.y + 5);
        this._scrollList.bounces = false;
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
    AcThrowArrowAchievementPopupView.prototype.weathRewardHandle = function (event) {
        if (event.data.ret) {
            var rewards = event.data.data.data.rewards;
            var replacerewards = event.data.data.data.replacerewards;
            var rewardVo = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardVo);
            var vo = Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
            var processCfg = vo.getSortAchievementCfg();
            processCfg.sort(function (a, b) { return a.sortId - b.sortId; });
            this._scrollList.refreshData(processCfg, { id: null, code: this.param.data.code, aid: this.param.data.aid });
            if (replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
            }
        }
    };
    AcThrowArrowAchievementPopupView.prototype.getTitleStr = function () {
        return "acThrowArrowAchievementPopupViewTitle-" + this.param.data.code;
    };
    AcThrowArrowAchievementPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["progress3_bg", "progress3"
        ]);
    };
    AcThrowArrowAchievementPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_THROWARROWGETACHIEVEMENTRWD, this.weathRewardHandle, this);
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcThrowArrowAchievementPopupView;
}(PopupView));
__reflect(AcThrowArrowAchievementPopupView.prototype, "AcThrowArrowAchievementPopupView");
//# sourceMappingURL=AcThrowArrowAchievementPopupView.js.map