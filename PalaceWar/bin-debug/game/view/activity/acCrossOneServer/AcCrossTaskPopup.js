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
var AcCrossTaskPopupView = /** @class */ (function (_super) {
    __extends(AcCrossTaskPopupView, _super);
    function AcCrossTaskPopupView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcCrossTaskPopupView.prototype, "Vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossTaskPopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshList, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACCROSSONESERVER_GETREW), this.onRewardGet, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_CROSSONESERVER_END, this.refreshList, this);
        var listBg = BaseLoadBitmap.create("public_scrolllistbg");
        listBg.width = 526;
        listBg.height = 720;
        this.addChildToContainer(listBg);
        listBg.setPosition((this.getShowWidth() - listBg.width) / 2, 0);
        this.refreshList();
    };
    AcCrossTaskPopupView.prototype.formatData = function () {
        var _this = this;
        this._list_db = [];
        this._list_db = this.Vo.config.taskList.map(function (v, i) {
            return {
                aid: _this.param.data.aid,
                code: _this.param.data.code,
                rkey: i + 1,
                powerAdd: v.powerAdd,
                rewards: v.getReward,
                powerNow: _this.Vo.risePower,
                status: _this.Vo.getTaskStatus(i + 1)
            };
        });
        this._list_db.sort(function (a, b) {
            return b.status - a.status;
        });
    };
    AcCrossTaskPopupView.prototype.refreshList = function () {
        this.formatData();
        if (!this._listview) {
            var list_w = 510;
            var list_h = 704;
            this._listview = ComponentManager.getScrollList(AcCrossTaskItem, [], new egret.Rectangle(0, 0, list_w, list_h));
            this.addChildToContainer(this._listview);
            this._listview.setPosition((this.getShowWidth() - list_w) / 2, 8);
        }
        this._listview.refreshData(this._list_db);
    };
    AcCrossTaskPopupView.prototype.onRewardGet = function (e) {
        if (e.data.ret) {
            var __rews = e.data.data.data.rewards;
            var rewardList = GameData.formatRewardItem(__rews);
            App.CommonUtil.playRewardFlyAction(rewardList);
        }
    };
    AcCrossTaskPopupView.prototype.getTitleStr = function () {
        return "acCrossOneServerText2";
    };
    AcCrossTaskPopupView.prototype.getShowHeight = function () {
        return 820;
    };
    AcCrossTaskPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.container.y = this.viewBg.y + 72;
    };
    AcCrossTaskPopupView.prototype.dispose = function () {
        this._listview = null;
        this._list_db = null;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshList, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACCROSSONESERVER_GETREW), this.onRewardGet, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CROSSONESERVER_END, this.refreshList, this);
        _super.prototype.dispose.call(this);
    };
    return AcCrossTaskPopupView;
}(PopupView));
//# sourceMappingURL=AcCrossTaskPopup.js.map