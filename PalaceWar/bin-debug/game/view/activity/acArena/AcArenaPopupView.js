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
 * author:qianjun
 * desc:斗场活动弹窗
*/
var AcArenaPopupView = (function (_super) {
    __extends(AcArenaPopupView, _super);
    function AcArenaPopupView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcArenaPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcArenaPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcArenaPopupView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcArenaPopupView.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcArenaPopupView.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcArenaPopupView.prototype.getOffsetY = function () {
        return 17;
    };
    AcArenaPopupView.prototype.getResourceList = function () {
        var view = this;
        var arr = [];
        return _super.prototype.getResourceList.call(this).concat([
            "progress5", "progress3_bg", "accarnivalview_tab_red", "accarnivalview_tab_green", "collectflag",
            "activity_charge_red", "shopview_corner", "shopview_line",
        ]).concat(arr);
    };
    AcArenaPopupView.prototype.getTabbarTextArr = function () {
        var code = this.code;
        return [
            "acArenaTab1-" + code,
            "acArenaTab2-" + code,
            "acArenaTab3-" + code,
            "acArenaTab4-" + code,
        ];
    };
    AcArenaPopupView.prototype.initTabbarGroup = function () {
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
    AcArenaPopupView.prototype.setTabBarPosition = function () {
        _super.prototype.setTabBarPosition.call(this);
        this.tabbarGroup.x = 0;
    };
    AcArenaPopupView.prototype.getTitleStr = function () {
        return "acArena-1_Title";
    };
    AcArenaPopupView.prototype.clickTabbarHandler = function (data) {
        var view = this;
        _super.prototype.clickTabbarHandler.call(this, data);
    };
    AcArenaPopupView.prototype.getRequestData = function () {
        var view = this;
        return { requestType: NetRequestConst.REQUEST_ACTIVITY_ARENARANK, requestData: {
                activeId: view.vo.aidAndCode,
            } };
    };
    AcArenaPopupView.prototype.receiveData = function (data) {
        var view = this;
        view.vo.setRankInfo(data.data.data);
    };
    AcArenaPopupView.prototype.initView = function () {
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
    AcArenaPopupView.prototype.getShowWidth = function () {
        return 580;
    };
    AcArenaPopupView.prototype.getShowHeight = function () {
        return 820;
    };
    AcArenaPopupView.prototype.freshView = function () {
        var view = this;
        if (view.vo.getpublicRedhot2()) {
            view.tabbarGroup.addRedPoint(0);
        }
        else {
            view.tabbarGroup.removeRedPoint(0);
        }
        if (view.vo.getpublicRedhot3()) {
            view.tabbarGroup.addRedPoint(2);
        }
        else {
            view.tabbarGroup.removeRedPoint(2);
        }
    };
    AcArenaPopupView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        _super.prototype.dispose.call(this);
    };
    return AcArenaPopupView;
}(PopupView));
__reflect(AcArenaPopupView.prototype, "AcArenaPopupView");
//# sourceMappingURL=AcArenaPopupView.js.map