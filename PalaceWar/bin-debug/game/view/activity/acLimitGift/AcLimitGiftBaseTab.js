var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcLimitGiftBaseTab = /** @class */ (function (_super) {
    __extends(AcLimitGiftBaseTab, _super);
    function AcLimitGiftBaseTab(data) {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    AcLimitGiftBaseTab.prototype.initView = function () {
        var list_w = GameConfig.stageWidth - 20;
        var list_h = GameConfig.stageHeigth - 368 - 24;
        this._listview = ComponentManager.getScrollList(AcLimitGiftItem, [], new egret.Rectangle(0, 0, list_w, list_h));
        this.addChild(this._listview);
        this._listview.setPosition(10, 4);
        var _bottom = BaseLoadBitmap.create("ac_limitgift_bg2");
        this.addChild(_bottom);
        _bottom.height = 32;
        _bottom.setPosition(0, GameConfig.stageHeigth - 362 - 32);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACLIMITGIFT_FREE), this.onRewardGet, this);
        App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY, this.receiveBuy, this);
    };
    AcLimitGiftBaseTab.prototype.updateData = function () {
        var _this = this;
        this._list_db = [];
        this._list_db = this.Vo.config.GiftList.map(function (v) {
            return {
                aid: _this.Vo.aid,
                code: _this.Vo.code,
                cost: v.cost,
                getReward: v.getReward,
                limit: v.limit,
                show: v.show,
                has: _this.Vo.getBuyNumByCost(v.cost)
            };
        });
    };
    AcLimitGiftBaseTab.prototype.refreshView = function () {
        if (!this.Vo)
            return;
        this.updateData();
        this._listview.refreshData(this._list_db);
    };
    AcLimitGiftBaseTab.prototype.onRewardGet = function (e) {
        if (e.data.ret) {
            var __rews = e.data.data.data.rewards;
            var rewardList = GameData.formatRewardItem(__rews);
            App.CommonUtil.playRewardFlyAction(rewardList);
        }
        this.refreshView();
    };
    AcLimitGiftBaseTab.prototype.receiveBuy = function (e) {
        if (e.data.ret) {
            var __cost = e.data.data.data.payment.itemId;
            var __rews = Config.RechargeCfg.getRechargeItemCfgByKey(__cost).getReward;
            var rewardList = GameData.formatRewardItem(__rews);
            App.CommonUtil.playRewardFlyAction(rewardList);
        }
        this.refreshView();
    };
    AcLimitGiftBaseTab.prototype.dispose = function () {
        this._list_db = null;
        this._listview = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACLIMITGIFT_FREE), this.onRewardGet, this);
        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY, this.receiveBuy, this);
        _super.prototype.dispose.call(this);
    };
    return AcLimitGiftBaseTab;
}(CommonViewTab));
//# sourceMappingURL=AcLimitGiftBaseTab.js.map