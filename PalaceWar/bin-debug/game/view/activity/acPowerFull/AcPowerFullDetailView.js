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
 * 活动详情
 *
 */
var AcPowerFullDetailView = /** @class */ (function (_super) {
    __extends(AcPowerFullDetailView, _super);
    function AcPowerFullDetailView() {
        return _super.call(this) || this;
    }
    AcPowerFullDetailView.prototype.setTabBarPosition = function () {
        this.tabbarGroup.x = GameConfig.stageWidth / 2 - this.tabbarGroup.width / 2;
        this.tabbarGroup.y = this.viewBg.y + 70 - 4 - 16;
    };
    AcPowerFullDetailView.prototype.initView = function () {
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
    AcPowerFullDetailView.prototype.refreshView = function () {
        if (!this.vo) {
            return;
        }
        if (this.vo.checkAchieveRed()) {
            this.tabbarGroup.addRedPoint(1);
        }
        else {
            this.tabbarGroup.removeRedPoint(1);
        }
        if (this.vo.checkExchangeRed()) {
            this.tabbarGroup.addRedPoint(3);
        }
        else {
            this.tabbarGroup.removeRedPoint(3);
        }
    };
    Object.defineProperty(AcPowerFullDetailView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcPowerFullDetailView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcPowerFullDetailView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcPowerFullDetailView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcPowerFullDetailView.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    AcPowerFullDetailView.prototype.getTabbarTextArr = function () {
        return [
            App.CommonUtil.getCnByCode("acPowerFullDetailTabName1", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acPowerFullDetailTabName2", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acPowerFullDetailTabName3", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acPowerFullDetailTabName4", this.getTypeCode()),
        ];
    };
    AcPowerFullDetailView.prototype.getTabbarName = function () {
        return ButtonConst.BTN2_SMALL_TAB;
    };
    Object.defineProperty(AcPowerFullDetailView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    /**标题 */
    AcPowerFullDetailView.prototype.getTitleStr = function () {
        return App.CommonUtil.getCnByCode("acPowerFullDetailPopupTitle", this.getTypeCode());
    };
    AcPowerFullDetailView.prototype.getShowHeight = function () {
        return 830;
    };
    AcPowerFullDetailView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "skin_detail_namebg", "progress5", "progress3_bg", "progress3", "collectflag", "servant_star", "ackite_skinbg", "ackite_skintopbg", "ackite_skintopline",
            "settingview_line", "public_popupscrollitembg", "public_scrolllistbg", "ackite_processtitlebg-1",
            "shopview_corner", "previewbg_servantskin", "acpowerfull_skinexchangebg", "specialview_commoni_namebg"
        ]);
    };
    AcPowerFullDetailView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        _super.prototype.dispose.call(this);
    };
    return AcPowerFullDetailView;
}(PopupView));
//# sourceMappingURL=AcPowerFullDetailView.js.map