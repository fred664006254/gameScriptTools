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
 * 三国活动2 活动详情
 * date 2020.2.10
 * author ycg
 * @name AcThreekingdomsOfWifeDetailPopupView
 */
var AcThreekingdomsOfWifeDetailPopupView = (function (_super) {
    __extends(AcThreekingdomsOfWifeDetailPopupView, _super);
    function AcThreekingdomsOfWifeDetailPopupView() {
        return _super.call(this) || this;
    }
    AcThreekingdomsOfWifeDetailPopupView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.refreshView, view);
        var tab = this.param.tab ? parseInt(this.param.tab) : 0;
        if (tab) {
            view.clickTabbarHandler({ index: tab - 1 });
            view.selectedTabIndex = tab - 1;
            view.tabbarGroup.selectedIndex = tab - 1;
        }
    };
    AcThreekingdomsOfWifeDetailPopupView.prototype.initTabbarGroup = function () {
        var tabBarTextArr = this.getTabbarTextArr();
        if (tabBarTextArr && tabBarTextArr.length > 0) {
            this.tabbarGroup = ComponentManager.getTabBarScrollGroup(tabBarTextArr, this.clickTabbarHandler, this);
            this.addChild(this.tabbarGroup);
            this.setTabBarPosition();
            this.container.y = this.getTitleButtomY();
            this.tabbarGroup.selectedIndex = this._selectedTabIndex;
            this.tabbarGroup.x = 0 + GameData.popupviewOffsetX;
        }
        this.refreshView();
    };
    AcThreekingdomsOfWifeDetailPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        if (this.selectedTabIndex == 3) {
            this.tabViewData[this.selectedTabIndex].x = 29.5 + 5;
        }
        else {
            this.tabViewData[this.selectedTabIndex].x = 29.5;
        }
    };
    AcThreekingdomsOfWifeDetailPopupView.prototype.changeTab = function () {
        _super.prototype.changeTab.call(this);
        if (this.selectedTabIndex == 3) {
            this.tabViewData[this.selectedTabIndex].x = 29.5 + 5;
        }
        else {
            this.tabViewData[this.selectedTabIndex].x = 29.5;
        }
    };
    AcThreekingdomsOfWifeDetailPopupView.prototype.setTabBarPosition = function () {
        _super.prototype.setTabBarPosition.call(this);
        this.tabbarGroup.x = 0;
    };
    AcThreekingdomsOfWifeDetailPopupView.prototype.getOffsetY = function () {
        return 21;
    };
    AcThreekingdomsOfWifeDetailPopupView.prototype.clickTabbarHandler = function (data) {
        var view = this;
        _super.prototype.clickTabbarHandler.call(this, data);
    };
    AcThreekingdomsOfWifeDetailPopupView.prototype.refreshView = function () {
        if (!this.vo) {
            return;
        }
        if (this.vo.isCangetChargeReward()) {
            this.tabbarGroup.addRedPoint(0);
        }
        else {
            this.tabbarGroup.removeRedPoint(0);
        }
        if (this.vo.isCangetAchieveReward()) {
            this.tabbarGroup.addRedPoint(1);
        }
        else {
            this.tabbarGroup.removeRedPoint(1);
        }
    };
    Object.defineProperty(AcThreekingdomsOfWifeDetailPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreekingdomsOfWifeDetailPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreekingdomsOfWifeDetailPopupView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreekingdomsOfWifeDetailPopupView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcThreekingdomsOfWifeDetailPopupView.prototype.getTabbarTextArr = function () {
        return ["acThreekingdomsOfWifeRechargeTitle-" + this.getTypeCode(),
            "acThreekingdomsOfWifeProcessTitle-" + this.getTypeCode(),
            "acThreekingdomsOfWifePoolTitle-" + this.getTypeCode(),
            "acThreekingdomsOfWifeSkinTitle-" + this.getTypeCode()
        ];
    };
    AcThreekingdomsOfWifeDetailPopupView.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        if (this.code == "4") {
            return "3";
        }
        return this.code;
    };
    /**标题 */
    AcThreekingdomsOfWifeDetailPopupView.prototype.getTitleStr = function () {
        return "acThreekingdomsOfWifeDetailPopupTitle-" + this.getTypeCode();
    };
    AcThreekingdomsOfWifeDetailPopupView.prototype.getShowHeight = function () {
        return 830;
    };
    AcThreekingdomsOfWifeDetailPopupView.prototype.getShowWidth = function () {
        return 580;
    };
    AcThreekingdomsOfWifeDetailPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "accarnivalview_tab_green", "accarnivalview_tab_red",
            "progress5", "progress3_bg", "progress3", "activity_charge_red",
            "collectflag", "shopview_corner",
            "common_titlebg", "specialview_commoni_namebg",
            "acthrowarrowview_wifeskinbg", "acthrowstone_preview_line", "acthrowstone_preview_msg_bg", "skin_detail_namebg", "countrywarrewardview_itembg",
            "acthreekingofwife_poolbg-" + this.getTypeCode(),
        ]);
    };
    AcThreekingdomsOfWifeDetailPopupView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.refreshView, view);
        _super.prototype.dispose.call(this);
    };
    return AcThreekingdomsOfWifeDetailPopupView;
}(PopupView));
__reflect(AcThreekingdomsOfWifeDetailPopupView.prototype, "AcThreekingdomsOfWifeDetailPopupView");
//# sourceMappingURL=AcThreekingdomsOfWifeDetailPopupView.js.map