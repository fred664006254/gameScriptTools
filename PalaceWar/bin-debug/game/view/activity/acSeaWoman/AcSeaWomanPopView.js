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
 * date 2020.7.9
 * @class AcSeaWomanRewardPopView
 */
var AcSeaWomanPopView = /** @class */ (function (_super) {
    __extends(AcSeaWomanPopView, _super);
    function AcSeaWomanPopView() {
        var _this = _super.call(this) || this;
        _this._rankData = null;
        return _this;
    }
    AcSeaWomanPopView.prototype.getTitleStr = function () {
        return App.CommonUtil.getCnByCode("acSeaWomanPopupTitle", this.getTypeCode());
    };
    AcSeaWomanPopView.prototype.getResourceList = function () {
        var list = [];
        return _super.prototype.getResourceList.call(this).concat("public_popupscrollitembg", "ackite_processtitlebg-1", "public_scrolllistbg", "progress3", "progress3_bg", "servant_star", "collectflag", "skin_detail_namebg", "ackite_skintopbg", "ackite_skintopline", "public_textbrownbg", "ackite_ranktitlebg1-1", "acthrowarrowview_wifeskinbg", "public_scrolllistbg", "acmousecome_skinprocessbg-1").concat(list);
    };
    AcSeaWomanPopView.prototype.initView = function () {
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
    AcSeaWomanPopView.prototype.refreshView = function () {
        if (!this.vo) {
            return;
        }
        if (this.vo.isCangetAchieveReward()) {
            this.tabbarGroup.addRedPoint(0);
        }
        else {
            this.tabbarGroup.removeRedPoint(0);
        }
        if (this.vo.isCanExchange()) {
            this.tabbarGroup.addRedPoint(2);
        }
        else {
            this.tabbarGroup.removeRedPoint(2);
        }
    };
    AcSeaWomanPopView.prototype.setTabBarPosition = function () {
        this.tabbarGroup.x = this.viewBg.x + GameData.popupviewOffsetX + 26;
        this.tabbarGroup.y = this.viewBg.y + 70 - 4 - 16;
    };
    AcSeaWomanPopView.prototype.getTabbarTextArr = function () {
        var list = [
            App.CommonUtil.getCnByCode("acSeaWomanTabName1", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acSeaWomanTabName2", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acSeaWomanTabName3", this.getTypeCode()),
        ];
        return list;
    };
    AcSeaWomanPopView.prototype.getTabbarName = function () {
        return ButtonConst.BTN2_SMALL_TAB;
    };
    AcSeaWomanPopView.prototype.getShowHeight = function () {
        return 830;
    };
    AcSeaWomanPopView.prototype.getTypeCode = function () {
        return this.param.data.uicode;
    };
    Object.defineProperty(AcSeaWomanPopView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSeaWomanPopView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSeaWomanPopView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSeaWomanPopView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcSeaWomanPopView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        _super.prototype.dispose.call(this);
    };
    return AcSeaWomanPopView;
}(PopupView));
//# sourceMappingURL=AcSeaWomanPopView.js.map