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
var AcLuckyDrawPopupView = (function (_super) {
    __extends(AcLuckyDrawPopupView, _super);
    function AcLuckyDrawPopupView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcLuckyDrawPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLuckyDrawPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLuckyDrawPopupView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLuckyDrawPopupView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLuckyDrawPopupView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcLuckyDrawPopupView.prototype.getTabbarTextArr = function () {
        var code = this.code;
        return [
            "acLuckyDrawTab1",
            "acLuckyDrawTab2",
        ];
    };
    AcLuckyDrawPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["progress3_bg", "progress3", "acmidautumnview_titlebg"
        ]);
    };
    AcLuckyDrawPopupView.prototype.initTabbarGroup = function () {
        var tabBarTextArr = this.getTabbarTextArr();
        if (tabBarTextArr && tabBarTextArr.length > 0) {
            this.tabbarGroup = ComponentManager.getTabBarScrollGroup(tabBarTextArr, this.clickTabbarHandler, this);
            this.addChild(this.tabbarGroup);
            this.setTabBarPosition();
            this.container.y = this.getTitleButtomY();
            this.tabbarGroup.selectedIndex = this._selectedTabIndex;
            this.tabbarGroup.x = 0 + GameData.popupviewOffsetX;
        }
    };
    AcLuckyDrawPopupView.prototype.getOffsetY = function () {
        return 16;
    };
    AcLuckyDrawPopupView.prototype.setTabBarPosition = function () {
        _super.prototype.setTabBarPosition.call(this);
        this.tabbarGroup.x = 0;
    };
    AcLuckyDrawPopupView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        var bg = BaseBitmap.create("public_9_probiginnerbg");
        bg.width = 540;
        bg.height = 723;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 56);
        this.addChildToContainer(bg);
        var tab = this.param.tab ? parseInt(this.param.tab) : 0;
        if (tab) {
            view.clickTabbarHandler({ index: tab - 1 });
            view.selectedTabIndex = tab - 1;
            view.tabbarGroup.selectedIndex = tab - 1;
        }
        view.freshView();
    };
    AcLuckyDrawPopupView.prototype.freshView = function () {
        var view = this;
        if (view.vo.getpublicRedhot3()) {
            view.tabbarGroup.addRedPoint(0);
        }
        else {
            view.tabbarGroup.removeRedPoint(0);
        }
        if (view.vo.getpublicRedhot2()) {
            view.tabbarGroup.addRedPoint(1);
        }
        else {
            view.tabbarGroup.removeRedPoint(1);
        }
    };
    AcLuckyDrawPopupView.prototype.getShowWidth = function () {
        return 580;
    };
    AcLuckyDrawPopupView.prototype.getShowHeight = function () {
        return 855;
    };
    AcLuckyDrawPopupView.prototype.getTitleStr = function () {
        return "atkracecrossActivityRewardViewTitle";
    };
    AcLuckyDrawPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.tabViewData[this.selectedTabIndex].x = 29.5;
    };
    AcLuckyDrawPopupView.prototype.changeTab = function () {
        _super.prototype.changeTab.call(this);
        this.tabViewData[this.selectedTabIndex].x = 29.5;
    };
    AcLuckyDrawPopupView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        _super.prototype.dispose.call(this);
    };
    return AcLuckyDrawPopupView;
}(PopupView));
__reflect(AcLuckyDrawPopupView.prototype, "AcLuckyDrawPopupView");
//# sourceMappingURL=AcLuckyDrawPopupView.js.map