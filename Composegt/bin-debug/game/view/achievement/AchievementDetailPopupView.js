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
 * 成就详情列表
 * author dky
 * date 2017/11/6
 * @class AchievementDetailPopupView
 */
var AchievementDetailPopupView = (function (_super) {
    __extends(AchievementDetailPopupView, _super);
    function AchievementDetailPopupView() {
        return _super.call(this) || this;
    }
    AchievementDetailPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ACH_GETDETAILREWARD, this.doGetReward, this);
        // this._achId = this.param.data.achId;
        AchievementDetailPopupView.itemId = this.param.data.achId;
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 516, 642);
        var detailList = Api.achievementVoApi.getAchDetailList(AchievementDetailPopupView.itemId);
        this._oldList = detailList;
        var scrollListBg = BaseBitmap.create("public_tc_bg01");
        scrollListBg.width = 534;
        scrollListBg.height = 667;
        scrollListBg.x = GameConfig.stageWidth / 2 - scrollListBg.width / 2 - 4;
        scrollListBg.y = 40;
        this.addChildToContainer(scrollListBg);
        this._scrollList = ComponentManager.getScrollList(AchievementDetailScrollItem, detailList, rect);
        this.addChildToContainer(this._scrollList);
        this._scrollList.x = scrollListBg.x + scrollListBg.width / 2 - 516 / 2;
        this._scrollList.y = 40 + scrollListBg.height / 2 - 640 / 2 - 1;
    };
    AchievementDetailPopupView.prototype.doGetReward = function (event) {
        this._achIndex = event.data.achIndex;
        this.request(NetRequestConst.REQUEST_ACHIEVEMENT_GETREWARDS, { aid: AchievementDetailPopupView.itemId });
    };
    //请求回调
    AchievementDetailPopupView.prototype.receiveData = function (data) {
        // let achList = Api.achievementVoApi.getAchievementInfoVoList();
        // this._scrollList.refreshData(achList);
        var index = Api.achievementVoApi.getAchDetailIndexVoById2(AchievementDetailPopupView.itemId, this._achIndex, this._oldList);
        var achScrollItem = this._scrollList.getItemByIndex(index);
        achScrollItem.refreshData(index);
        var achScrollItem2 = this._scrollList.getItemByIndex(index + 1);
        if (achScrollItem2) {
            achScrollItem2.refreshData(index + 1);
        }
        var rewardList = GameData.formatRewardItem(data.data.data.rewards);
        App.CommonUtil.playRewardFlyAction(rewardList);
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ACH_REFRESHLIST, { "achId": AchievementDetailPopupView.itemId });
    };
    AchievementDetailPopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_ACH_GETDETAILREWARD, this.doGetReward, this);
        // 未婚滑动列表
        this._scrollList = null;
        this._achIndex = null;
        this._oldList = null;
        _super.prototype.dispose.call(this);
    };
    return AchievementDetailPopupView;
}(PopupView));
__reflect(AchievementDetailPopupView.prototype, "AchievementDetailPopupView");
