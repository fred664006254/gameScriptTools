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
 * 活动奖励
 * author yangchengguo
 * date 2019.8.20
 * @class AcSweetGiftRewardPopView
 */
var AcSweetGiftRewardPopView = (function (_super) {
    __extends(AcSweetGiftRewardPopView, _super);
    function AcSweetGiftRewardPopView() {
        var _this = _super.call(this) || this;
        _this.tabbarGroup = null;
        return _this;
    }
    AcSweetGiftRewardPopView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        var rewardBg = BaseBitmap.create("public_9_bg4");
        rewardBg.width = 538;
        rewardBg.height = 680;
        rewardBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - rewardBg.width / 2, this.tabbarGroup.y - 5 + 40);
        this.addChildToContainer(rewardBg);
    };
    AcSweetGiftRewardPopView.prototype.initTabbarGroup = function () {
        var tabBarTextArr = this.getTabbarTextArr();
        if (tabBarTextArr && tabBarTextArr.length > 0) {
            this.tabbarGroup = ComponentManager.getTabBarScrollGroup(tabBarTextArr, this.clickTabbarHandler, this);
            this.addChild(this.tabbarGroup);
            this.setTabBarPosition();
            this.container.y = this.getTitleButtomY();
            this.tabbarGroup.selectedIndex = this._selectedTabIndex;
            this.tabbarGroup.x = 0 + GameData.popupviewOffsetX;
            this.tabbarGroup.y = 20;
        }
        this.refreshView();
    };
    AcSweetGiftRewardPopView.prototype.setTabBarPosition = function () {
        _super.prototype.setTabBarPosition.call(this);
        this.tabbarGroup.x = 0;
    };
    AcSweetGiftRewardPopView.prototype.refreshView = function () {
        if (!this.vo) {
            return;
        }
        if (this.vo.isShowChargeRewardRedDot()) {
            this.tabbarGroup.addRedPoint(0);
        }
        else {
            this.tabbarGroup.removeRedPoint(0);
        }
        if (this.vo.isShowTaskRewardRedDot()) {
            this.tabbarGroup.addRedPoint(1);
        }
        else {
            this.tabbarGroup.removeRedPoint(1);
        }
        // if (this.vo.isShowExchangeRedDot()){
        //     this.tabbarGroup.addRedPoint(2);
        // }
        // else{
        //     this.tabbarGroup.removeRedPoint(2);
        // }
    };
    Object.defineProperty(AcSweetGiftRewardPopView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSweetGiftRewardPopView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSweetGiftRewardPopView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSweetGiftRewardPopView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcSweetGiftRewardPopView.prototype.getTabbarTextArr = function () {
        return ["sweetgiftRechargeRewardTitle-" + this.code,
            "sweetgiftTaskRewardTitle-" + this.code,
            "sweetgiftShopTitle-" + this.code,
            "sweetgiftCakeRewardTitle-" + this.code
        ];
    };
    /**标题 */
    AcSweetGiftRewardPopView.prototype.getTitleStr = function () {
        return "sweetgiftRewardTitle-" + this.code;
    };
    AcSweetGiftRewardPopView.prototype.getShowHeight = function () {
        return 830;
    };
    AcSweetGiftRewardPopView.prototype.getShowWidth = function () {
        return 580;
    };
    AcSweetGiftRewardPopView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "accarnivalview_tab_green", "accarnivalview_tab_red",
            "progress5", "progress3_bg", "activity_charge_red",
            "collectflag", "progress8", "shopview_corner",
            "common_titlebg", "specialview_commoni_namebg", "countrywarrewardview_itembg"
        ]);
    };
    AcSweetGiftRewardPopView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        this.tabbarGroup = null;
        _super.prototype.dispose.call(this);
    };
    return AcSweetGiftRewardPopView;
}(PopupView));
__reflect(AcSweetGiftRewardPopView.prototype, "AcSweetGiftRewardPopView");
//# sourceMappingURL=AcSweetGiftRewardPopView.js.map