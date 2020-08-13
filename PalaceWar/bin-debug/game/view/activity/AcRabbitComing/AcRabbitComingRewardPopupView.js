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
var AcRabbitComingRewardPopupView = (function (_super) {
    __extends(AcRabbitComingRewardPopupView, _super);
    function AcRabbitComingRewardPopupView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcRabbitComingRewardPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRabbitComingRewardPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRabbitComingRewardPopupView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRabbitComingRewardPopupView.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRabbitComingRewardPopupView.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcRabbitComingRewardPopupView.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 1:
            case 2:
                code = "1";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcRabbitComingRewardPopupView.prototype.getTabbarTextArr = function () {
        var code = this.code;
        return [
            "acPunishRankRewardTab1",
            "acPunishRankRewardTab2",
            "acLuckyDrawLuckyReward-2",
            "acThrowArrowTab3-3"
        ];
    };
    AcRabbitComingRewardPopupView.prototype.getOffsetY = function () {
        return 16;
    };
    AcRabbitComingRewardPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "countrywarrewardview_itembg", "progress3", "progress3_bg"
        ]);
    };
    AcRabbitComingRewardPopupView.prototype.initTabbarGroup = function () {
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
    AcRabbitComingRewardPopupView.prototype.getRequestData = function () {
        var view = this;
        return { requestType: NetRequestConst.REQUEST_RABBIT_RANK, requestData: {
                activeId: view.vo.aidAndCode,
            } };
    };
    AcRabbitComingRewardPopupView.prototype.receiveData = function (data) {
        var view = this;
        view.vo.setRankInfo(data.data.data);
    };
    AcRabbitComingRewardPopupView.prototype.setTabBarPosition = function () {
        _super.prototype.setTabBarPosition.call(this);
        this.tabbarGroup.x = 0;
    };
    AcRabbitComingRewardPopupView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        var tab = this.param.tab ? parseInt(this.param.tab) : 0;
        if (tab) {
            view.clickTabbarHandler({ index: tab - 1 });
            view.selectedTabIndex = tab - 1;
            view.tabbarGroup.selectedIndex = tab - 1;
        }
        view.freshView();
    };
    AcRabbitComingRewardPopupView.prototype.freshView = function () {
        var view = this;
        if (view.vo.getpublicRedhot3()) {
            view.tabbarGroup.addRedPoint(2);
            // this._boxRewardImg.setRes("acwealthcomingview_box_2")
        }
        else {
            view.tabbarGroup.removeRedPoint(2);
            // this._boxRewardImg.setRes("acwealthcomingview_box_1")
        }
        // if(view.vo.getpublicRedhot3()){
        //     view.tabbarGroup.addRedPoint(0);
        // }
        // else{
        //     view.tabbarGroup.removeRedPoint(0);
        // }
        // if(view.vo.getpublicRedhot2()){
        //     view.tabbarGroup.addRedPoint(1);
        // }
        // else{
        //     view.tabbarGroup.removeRedPoint(1);
        // }
    };
    AcRabbitComingRewardPopupView.prototype.getShowWidth = function () {
        return 580;
    };
    AcRabbitComingRewardPopupView.prototype.getShowHeight = function () {
        return 815;
    };
    AcRabbitComingRewardPopupView.prototype.getTitleStr = function () {
        return "atkracecrossActivityRewardViewTitle";
    };
    AcRabbitComingRewardPopupView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        _super.prototype.dispose.call(this);
    };
    return AcRabbitComingRewardPopupView;
}(PopupView));
__reflect(AcRabbitComingRewardPopupView.prototype, "AcRabbitComingRewardPopupView");
//# sourceMappingURL=AcRabbitComingRewardPopupView.js.map