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
/*
    author : shaoliang
    date : 2020.2.20
    desc : 投壶活动 奖励
*/
var AcThrowArrowRewardPopupView = (function (_super) {
    __extends(AcThrowArrowRewardPopupView, _super);
    function AcThrowArrowRewardPopupView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcThrowArrowRewardPopupView.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThrowArrowRewardPopupView.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThrowArrowRewardPopupView.prototype, "uicode", {
        get: function () {
            return "" + this.param.data.uicode;
        },
        enumerable: true,
        configurable: true
    });
    AcThrowArrowRewardPopupView.prototype.getTitleStr = function () {
        return "acthrowstoneRewardTitle-1";
    };
    AcThrowArrowRewardPopupView.prototype.getUiCode = function () {
        return this.uicode;
    };
    AcThrowArrowRewardPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["progress3_bg", "progress3",
            "skin_detail_namebg",
        ]);
    };
    AcThrowArrowRewardPopupView.prototype.getTabbarTextArr = function () {
        var code = this.uicode;
        return [
            "acThrowArrowTab1-" + code,
            "acThrowArrowTab2-" + code,
            "acThrowArrowTab3-" + code,
            "acThrowArrowTab4-" + code,
        ];
    };
    Object.defineProperty(AcThrowArrowRewardPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcThrowArrowRewardPopupView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        view.freshView();
        var tab = this.param.tab ? parseInt(this.param.tab) : 0;
        if (tab) {
            view.clickTabbarHandler({ index: tab - 1 });
            view.selectedTabIndex = tab - 1;
            view.tabbarGroup.selectedIndex = tab - 1;
        }
    };
    AcThrowArrowRewardPopupView.prototype.initTabbarGroup = function () {
        var tabBarTextArr = this.getTabbarTextArr();
        if (tabBarTextArr && tabBarTextArr.length > 0) {
            this.tabbarGroup = ComponentManager.getTabBarScrollGroup(tabBarTextArr, this.clickTabbarHandler, this);
            this.addChild(this.tabbarGroup);
            this.setTabBarPosition();
            this.container.y = this.getTitleButtomY();
            this.tabbarGroup.selectedIndex = this._selectedTabIndex;
            this.tabbarGroup.x = 0;
        }
    };
    AcThrowArrowRewardPopupView.prototype.getOffsetY = function () {
        return 16;
    };
    AcThrowArrowRewardPopupView.prototype.setTabBarPosition = function () {
        _super.prototype.setTabBarPosition.call(this);
        this.tabbarGroup.x = 0;
    };
    AcThrowArrowRewardPopupView.prototype.getShowWidth = function () {
        return 580;
    };
    AcThrowArrowRewardPopupView.prototype.getShowHeight = function () {
        return 800;
    };
    AcThrowArrowRewardPopupView.prototype.freshView = function () {
        var view = this;
        if (view.vo.checkRechargeRedDot()) {
            view.tabbarGroup.addRedPoint(0);
        }
        else {
            view.tabbarGroup.removeRedPoint(0);
        }
        if (view.vo.checkLotteryRedDot()) {
            view.tabbarGroup.addRedPoint(1);
        }
        else {
            view.tabbarGroup.removeRedPoint(1);
        }
        // if(view.vo.getpublicRedhot3()){
        //     view.tabbarGroup.addRedPoint(2);
        // }
        // else{
        //     view.tabbarGroup.removeRedPoint(2);
        // }
        // if(view.vo.getpublicRedhot4()){
        //     view.tabbarGroup.addRedPoint(3);
        // }
        // else{
        //     view.tabbarGroup.removeRedPoint(3);
        // }
    };
    AcThrowArrowRewardPopupView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        _super.prototype.dispose.call(this);
    };
    return AcThrowArrowRewardPopupView;
}(PopupView));
__reflect(AcThrowArrowRewardPopupView.prototype, "AcThrowArrowRewardPopupView");
//# sourceMappingURL=AcThrowArrowRewardPopupView.js.map