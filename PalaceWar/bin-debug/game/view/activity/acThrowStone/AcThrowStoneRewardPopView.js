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
 * 投石破敌活动奖励
 * author yangchengguo
 * date 2019.8.28
 * @class AcThrowStoneRewardPopView
 */
var AcThrowStoneRewardPopView = (function (_super) {
    __extends(AcThrowStoneRewardPopView, _super);
    function AcThrowStoneRewardPopView() {
        var _this = _super.call(this) || this;
        _this.tabbarGroup = null;
        return _this;
    }
    AcThrowStoneRewardPopView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
    };
    AcThrowStoneRewardPopView.prototype.initTabbarGroup = function () {
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
    AcThrowStoneRewardPopView.prototype.changeTab = function () {
        _super.prototype.changeTab.call(this);
        this.tabViewData[this.selectedTabIndex].x = 29.5;
    };
    AcThrowStoneRewardPopView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.tabViewData[this.selectedTabIndex].x = 29.5;
    };
    AcThrowStoneRewardPopView.prototype.setTabBarPosition = function () {
        _super.prototype.setTabBarPosition.call(this);
        this.tabbarGroup.x = 0;
        this.tabbarGroup.y += 4;
    };
    AcThrowStoneRewardPopView.prototype.refreshView = function () {
        if (!this.vo) {
            return;
        }
        if (this.vo.isShowChargeRewardRedDot()) {
            this.tabbarGroup.addRedPoint(0);
        }
        else {
            this.tabbarGroup.removeRedPoint(0);
        }
    };
    Object.defineProperty(AcThrowStoneRewardPopView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThrowStoneRewardPopView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThrowStoneRewardPopView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThrowStoneRewardPopView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcThrowStoneRewardPopView.prototype.getTabbarTextArr = function () {
        return ["acthrowstoneChargeTitle-" + this.getTypeCode(),
            "acthrowstoneThrowReward-" + this.getTypeCode(),
            "acthrowstoneServantTitle-" + this.getTypeCode(),
            "acthrowstoneWifeTitle-" + this.getTypeCode()
        ];
    };
    AcThrowStoneRewardPopView.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    /**标题 */
    AcThrowStoneRewardPopView.prototype.getTitleStr = function () {
        return "acthrowstoneRewardTitle-" + this.getTypeCode();
    };
    AcThrowStoneRewardPopView.prototype.getShowHeight = function () {
        return 830;
    };
    AcThrowStoneRewardPopView.prototype.getShowWidth = function () {
        return 580;
    };
    AcThrowStoneRewardPopView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "accarnivalview_tab_green", "accarnivalview_tab_red",
            "progress5", "progress3_bg", "activity_charge_red",
            "collectflag", "progress8", "shopview_corner",
            "common_titlebg", "specialview_commoni_namebg",
            "acthrowstone_wife_preview_bg", "acthrowstone_servant_preview_bg", "acthrowstone_preview_line", "acthrowstone_preview_msg_bg", "skin_detail_namebg", "countrywarrewardview_itembg"
        ]);
    };
    AcThrowStoneRewardPopView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_THROWSTONE_CHANGEVIEW);
        this.tabbarGroup = null;
        _super.prototype.dispose.call(this);
    };
    return AcThrowStoneRewardPopView;
}(PopupView));
__reflect(AcThrowStoneRewardPopView.prototype, "AcThrowStoneRewardPopView");
//# sourceMappingURL=AcThrowStoneRewardPopView.js.map