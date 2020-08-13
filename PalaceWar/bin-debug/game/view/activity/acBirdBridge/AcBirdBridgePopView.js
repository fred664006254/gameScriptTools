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
 * 奖励
 * author sl
 * date 2020.7.17
 * @class AcBirdBridgePopView
 */
var AcBirdBridgePopView = /** @class */ (function (_super) {
    __extends(AcBirdBridgePopView, _super);
    function AcBirdBridgePopView() {
        return _super.call(this) || this;
    }
    AcBirdBridgePopView.prototype.getTabbarName = function () {
        return ButtonConst.BTN2_SMALL_TAB;
    };
    AcBirdBridgePopView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.refreshView, view);
        var tab = this.param.tab ? parseInt(this.param.tab) : 0;
        if (tab) {
            view.clickTabbarHandler({ index: tab - 1 });
            view.selectedTabIndex = tab - 1;
            view.tabbarGroup.selectedIndex = tab - 1;
        }
        this.refreshView();
    };
    AcBirdBridgePopView.prototype.setTabBarPosition = function () {
        this.tabbarGroup.x = this.viewBg.x + GameData.popupviewOffsetX + 26;
        this.tabbarGroup.y = this.viewBg.y + 70 - 4 - 16;
    };
    AcBirdBridgePopView.prototype.getResourceList = function () {
        var list = [];
        return _super.prototype.getResourceList.call(this).concat("public_popupscrollitembg", "ackite_processtitlebg-1", "public_scrolllistbg", "progress3", "progress3_bg", "collectflag", "birdbridge_rewardtitlebg1-1", "ac_skinoflibai_chargeitem_red", "birdbridge_rewardbg-" + this.getTypeCode(), "progress5", "ac_skinoflibai_chargeitem_green").concat(list);
    };
    AcBirdBridgePopView.prototype.getTitleStr = function () {
        return App.CommonUtil.getCnByCode("acBirdBridgePopupTitle", this.getTypeCode());
    };
    AcBirdBridgePopView.prototype.getTabbarTextArr = function () {
        var list = [
            App.CommonUtil.getCnByCode("acBirdBridgeTabName1", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acBirdBridgeTabName2", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acBirdBridgeTabName3", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acBirdBridgeTabName4", this.getTypeCode()),
        ];
        return list;
    };
    AcBirdBridgePopView.prototype.refreshView = function () {
        if (!this.vo) {
            return;
        }
        if (this.vo.isCangetRechargeReward()) {
            this.tabbarGroup.addRedPoint(0);
        }
        else {
            this.tabbarGroup.removeRedPoint(0);
        }
        if (this.vo.isCangetAchievementOneReward()) {
            this.tabbarGroup.addRedPoint(1);
        }
        else {
            this.tabbarGroup.removeRedPoint(1);
        }
        if (this.vo.isCangetAchievementAllReward()) {
            this.tabbarGroup.addRedPoint(2);
        }
        else {
            this.tabbarGroup.removeRedPoint(2);
        }
    };
    AcBirdBridgePopView.prototype.getShowHeight = function () {
        return 830;
    };
    AcBirdBridgePopView.prototype.getTypeCode = function () {
        return this.param.data.uicode;
    };
    Object.defineProperty(AcBirdBridgePopView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBirdBridgePopView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBirdBridgePopView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBirdBridgePopView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcBirdBridgePopView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        _super.prototype.dispose.call(this);
    };
    return AcBirdBridgePopView;
}(PopupView));
//# sourceMappingURL=AcBirdBridgePopView.js.map