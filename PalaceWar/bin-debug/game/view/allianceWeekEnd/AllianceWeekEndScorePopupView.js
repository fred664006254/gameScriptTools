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
  * @author 张朝阳
  * date 2019/5/23
  * @class AllianceWeekEndScorePopupView
  */
var AllianceWeekEndScorePopupView = (function (_super) {
    __extends(AllianceWeekEndScorePopupView, _super);
    function AllianceWeekEndScorePopupView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        return _this;
    }
    AllianceWeekEndScorePopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQYEST_ALLIANCEWEEK_GETSCOREREWARD, this.scoreRewardHandle, this);
        var bg = BaseLoadBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 685;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 15);
        this.addChildToContainer(bg);
        // let list = Config.AllianceweekendCfg.peScoreItemCfgList;
        var rect = new egret.Rectangle(0, 0, 510, 675);
        this._scrollList = ComponentManager.getScrollList(AllianceWeekEndScoreScrollItem, null, rect, { aid: this.aid, code: this.code });
        this._scrollList.setPosition(bg.x + 5, bg.y + 5);
        this.addChildToContainer(this._scrollList);
        this.refreshView();
    };
    /**刷新界面 */
    AllianceWeekEndScorePopupView.prototype.refreshView = function () {
        var sortRechargeCfg = Api.myAllianceWeekVoApi.getSortScoreCfg();
        sortRechargeCfg.sort(function (a, b) {
            return a.sortId - b.sortId;
        });
        this._scrollList.refreshData(sortRechargeCfg, { aid: this.aid, code: this.code });
    };
    /**领取奖励 */
    AllianceWeekEndScorePopupView.prototype.scoreRewardHandle = function (event) {
        if (event.data.ret) {
            var rewards = event.data.data.data.rewards;
            var rewardsVo = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardsVo);
            this.refreshView();
        }
    };
    AllianceWeekEndScorePopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["progress3", "progress3_bg",]);
    };
    AllianceWeekEndScorePopupView.prototype.getTitleStr = function () {
        return "allianceWeekEndScorePopupViewTitle";
    };
    AllianceWeekEndScorePopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQYEST_ALLIANCEWEEK_GETSCOREREWARD, this.scoreRewardHandle, this);
        this.aid = null;
        this.code = null;
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceWeekEndScorePopupView;
}(PopupView));
__reflect(AllianceWeekEndScorePopupView.prototype, "AllianceWeekEndScorePopupView");
//# sourceMappingURL=AllianceWeekEndScorePopupView.js.map