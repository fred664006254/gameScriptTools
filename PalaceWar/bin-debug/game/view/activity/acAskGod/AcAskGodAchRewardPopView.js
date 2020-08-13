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
/**
 * 求签问卜--进度奖励
 * author wxz
 * date 2020.7.20
 * @class AcAskGodAchRewardPopView
 */
var AcAskGodAchRewardPopView = /** @class */ (function (_super) {
    __extends(AcAskGodAchRewardPopView, _super);
    function AcAskGodAchRewardPopView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        return _this;
    }
    Object.defineProperty(AcAskGodAchRewardPopView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAskGodAchRewardPopView.prototype, "typeCode", {
        get: function () {
            if (this.code == "2") {
                return "1";
            }
            return this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAskGodAchRewardPopView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcAskGodAchRewardPopView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACASKGOD_GETNIGHTNUM, this.requestCallback, this);
        var rewardBg = BaseBitmap.create("public_9_bg4");
        rewardBg.width = 530;
        rewardBg.height = 690;
        rewardBg.setPosition(55, 10);
        this.addChildToContainer(rewardBg);
        var id = "";
        var index = -1;
        var dataList = this.vo.getSortAchievementCfg();
        if (this.param.data.id) {
            for (var i = 0; i < dataList.length; i++) {
                if (dataList[i].id == this.param.data.id) {
                    id = String(dataList[i].id);
                    index = i;
                    break;
                }
            }
        }
        var rect = new egret.Rectangle(0, 0, 530, 680);
        var scrollList = ComponentManager.getScrollList(AcAskGodAchRewardScrollItem, dataList, rect, { id: id, aid: this.aid, code: this.code });
        scrollList.setPosition(55, 15);
        this.addChildToContainer(scrollList);
        this._scrollList = scrollList;
        if (index >= 0) {
            this._scrollList.setScrollTopByIndex(index, 1000);
        }
    };
    AcAskGodAchRewardPopView.prototype.requestCallback = function (event) {
        var rData = event.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        var replacerewards = rData.replacerewards;
        if (replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
        }
        var rewards = rData.rewards;
        var rewardVoList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
    };
    AcAskGodAchRewardPopView.prototype.refreshView = function () {
        if (!this.vo) {
            return;
        }
        var dataList = this.vo.getSortAchievementCfg();
        this._scrollList.refreshData(dataList, { aid: this.aid, code: this.code });
    };
    Object.defineProperty(AcAskGodAchRewardPopView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAskGodAchRewardPopView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcAskGodAchRewardPopView.prototype.getShowHeight = function () {
        return 800;
    };
    AcAskGodAchRewardPopView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.container.x = 0;
    };
    AcAskGodAchRewardPopView.prototype.getTitleStr = function () {
        return "acAskGodAchievementTitle-" + this.typeCode;
    };
    AcAskGodAchRewardPopView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACASKGOD_GETNIGHTNUM, this.requestCallback, this);
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcAskGodAchRewardPopView;
}(PopupView));
//# sourceMappingURL=AcAskGodAchRewardPopView.js.map