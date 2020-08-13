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
 * 万物复苏活动详情
 * date 2020.2.26
 * author ycg
 * @name AcRecoveryDetailPopupView
 */
var AcRecoveryDetailPopupView = (function (_super) {
    __extends(AcRecoveryDetailPopupView, _super);
    function AcRecoveryDetailPopupView() {
        return _super.call(this) || this;
    }
    AcRecoveryDetailPopupView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.refreshView, view);
        var tab = this.param.tab ? parseInt(this.param.tab) : 0;
        if (tab) {
            view.clickTabbarHandler({ index: tab - 1 });
            view.selectedTabIndex = tab - 1;
            view.tabbarGroup.selectedIndex = tab - 1;
        }
    };
    AcRecoveryDetailPopupView.prototype.initTabbarGroup = function () {
        var tabBarTextArr = this.getTabbarTextArr();
        if (tabBarTextArr && tabBarTextArr.length > 0) {
            this.tabbarGroup = ComponentManager.getTabBarScrollGroup(tabBarTextArr, this.clickTabbarHandler, this);
            this.addChild(this.tabbarGroup);
            this.setTabBarPosition();
            this.container.y = this.getTitleButtomY();
            this.tabbarGroup.selectedIndex = this._selectedTabIndex;
            this.tabbarGroup.x = 0;
        }
        this.refreshView();
    };
    AcRecoveryDetailPopupView.prototype.setTabBarPosition = function () {
        _super.prototype.setTabBarPosition.call(this);
        this.tabbarGroup.x = 0;
    };
    AcRecoveryDetailPopupView.prototype.getOffsetY = function () {
        return 10;
    };
    AcRecoveryDetailPopupView.prototype.clickTabbarHandler = function (data) {
        var view = this;
        _super.prototype.clickTabbarHandler.call(this, data);
    };
    AcRecoveryDetailPopupView.prototype.refreshView = function () {
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
    Object.defineProperty(AcRecoveryDetailPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRecoveryDetailPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRecoveryDetailPopupView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRecoveryDetailPopupView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcRecoveryDetailPopupView.prototype.getTabbarTextArr = function () {
        return ["acRecoveryRechargeTitle-" + this.getTypeCode(),
            "acRecoveryProcessTitle-" + this.getTypeCode(),
            "acRecoveryPoolTitle-" + this.getTypeCode(),
            "acRecoverySkinTitle-" + this.getTypeCode()
        ];
    };
    AcRecoveryDetailPopupView.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    /**标题 */
    AcRecoveryDetailPopupView.prototype.getTitleStr = function () {
        return "acRecoveryDetailPopupTitle-" + this.getTypeCode();
    };
    AcRecoveryDetailPopupView.prototype.getShowHeight = function () {
        return 830;
    };
    AcRecoveryDetailPopupView.prototype.getShowWidth = function () {
        return 580;
    };
    AcRecoveryDetailPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "ac_skinoflibai_chargeitem_red", "ac_skinoflibai_chargeitem_green",
            "progress5", "progress3_bg", "progress3", "servant_star", "acthreekingdomrecharge_skinbg",
            "collectflag", "acthrowstone_preview_line", "acthrowstone_preview_msg_bg", "skin_detail_namebg", "countrywarrewardview_itembg",
        ]);
    };
    AcRecoveryDetailPopupView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.refreshView, view);
        _super.prototype.dispose.call(this);
    };
    return AcRecoveryDetailPopupView;
}(PopupView));
__reflect(AcRecoveryDetailPopupView.prototype, "AcRecoveryDetailPopupView");
//# sourceMappingURL=AcRecoveryDetailPopupView.js.map