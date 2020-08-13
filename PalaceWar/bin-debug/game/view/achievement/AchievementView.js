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
 * 成就
 * author dku
 * date 2017/10/9
 * @class WifeView
 */
var AchievementView = (function (_super) {
    __extends(AchievementView, _super);
    function AchievementView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AchievementView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    AchievementView.prototype.getBigFrame = function () {
        return "commonview_bigframe";
    };
    AchievementView.prototype.getBeamName = function () {
        return "commonview_beam";
    };
    AchievementView.prototype.initView = function () {
        // Api.rookieVoApi.curGuideKey = "dinner";
        // Api.rookieVoApi.insertWaitingGuide({"idx":"dinner_1"});
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ACH_GETREWARD, this.doGetReward, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ACH_REFRESHLIST, this.refreshItem, this);
        // let bottomBg = BaseBitmap.create("public_9_bg23");
        // bottomBg.width = GameConfig.stageWidth-10;
        // bottomBg.height = GameConfig.stageHeigth - 105;
        // bottomBg.x = 5;
        // bottomBg.y = -7;
        // this.addChildToContainer(bottomBg);
        var achList = Api.achievementVoApi.getAchievementInfoVoList();
        this._oldList = achList;
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 600, GameConfig.stageHeigth - 150);
        this._scrollList = ComponentManager.getScrollList(AchievementScrollItem, achList, rect);
        this.addChildToContainer(this._scrollList);
        this._scrollList.x = 20;
        this._scrollList.y = 100 - this.container.y + 40;
        // this._scrollList.y = bottomBg.y + bottomBg.height / 2 - this._scrollList.height / 2;
    };
    AchievementView.prototype.doGetReward = function (event) {
        this._achId = event.data.achId;
        this.request(NetRequestConst.REQUEST_ACHIEVEMENT_GETREWARDS, { aid: event.data.achId });
    };
    //请求回调
    AchievementView.prototype.receiveData = function (data) {
        // let achList = Api.achievementVoApi.getAchievementInfoVoList();
        // this._scrollList.refreshData(achList);
        if (data && data.ret) {
            this.refreshItem();
            var rewardList = GameData.formatRewardItem(data.data.data.rewards);
            App.CommonUtil.playRewardFlyAction(rewardList);
        }
    };
    // private refreshItem2()
    // {	
    // 	let index = Api.achievementVoApi.getAchIndexVoById2(this._achId,this._oldList);
    // 	let achScrollItem = <AchievementScrollItem>this._scrollList.getItemByIndex(index);
    // 	achScrollItem.refreshData(index);
    // }
    AchievementView.prototype.refreshItem = function () {
        var list = Api.achievementVoApi.getAchievementInfoVoList();
        // let achScrollItem = <AchievementScrollItem>this._scrollList.getItemByIndex(index);
        // achScrollItem.refreshData(index);
        this._scrollList.refreshData(list);
    };
    AchievementView.prototype.clickItemHandler = function (event) {
        var index = Number(event.data);
        var achList = Api.achievementVoApi.getAchievementInfoVoList();
        var achVo = achList[index];
        ViewController.getInstance().openView(ViewConst.POPUP.ACHIEVEMENTDETAILPOPUPVIEW, { achId: achVo.id });
    };
    AchievementView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "progress17_bg", "progress17", "progress19", "progress19_bg", "progress19_cloud",
            "achievement_state1", "achievement_state2", "achievement_state3",
            "public_scrollitembg", "public_titlebg",
        ]);
    };
    AchievementView.prototype.dispose = function () {
        // Api.rookieVoApi.checkWaitingGuide();
        this._scrollList = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_ACH_GETREWARD, this.doGetReward, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_ACH_REFRESHLIST, this.refreshItem, this);
        // this._achievementInfoVoList = null;
        this._achId = null;
        this._oldList = null;
        _super.prototype.dispose.call(this);
    };
    return AchievementView;
}(CommonView));
__reflect(AchievementView.prototype, "AchievementView");
//# sourceMappingURL=AchievementView.js.map