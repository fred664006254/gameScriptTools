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
 * desc:劳动活动弹窗
*/
var AcLaborDayPopupView = (function (_super) {
    __extends(AcLaborDayPopupView, _super);
    function AcLaborDayPopupView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcLaborDayPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLaborDayPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLaborDayPopupView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLaborDayPopupView.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLaborDayPopupView.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcLaborDayPopupView.prototype.getResourceList = function () {
        var view = this;
        var arr = [];
        return _super.prototype.getResourceList.call(this).concat([
            "progress5", "progress3_bg", "accarnivalview_tab_red", "accarnivalview_tab_green", "collectflag",
            "activity_charge_red", "shopview_corner", "shopview_line"
        ]).concat(arr);
    };
    AcLaborDayPopupView.prototype.getTabbarTextArr = function () {
        var code = this.code;
        return [
            "acLaborDayTab1-" + code,
            "acLaborDayTab2-" + code,
            "acLaborDayTab3-" + code,
            "acLaborDayTab4-" + code,
        ];
    };
    AcLaborDayPopupView.prototype.initTabbarGroup = function () {
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
    AcLaborDayPopupView.prototype.setTabBarPosition = function () {
        _super.prototype.setTabBarPosition.call(this);
        this.tabbarGroup.x = 0;
    };
    AcLaborDayPopupView.prototype.getTitleStr = function () {
        return "acLaborDayPopupViewTitle-" + this.code;
    };
    AcLaborDayPopupView.prototype.clickTabbarHandler = function (data) {
        var view = this;
        _super.prototype.clickTabbarHandler.call(this, data);
    };
    AcLaborDayPopupView.prototype.getRequestData = function () {
        var view = this;
        return { requestType: NetRequestConst.REQUEST_ACTIVITY_LABORRANK, requestData: {
                activeId: view.vo.aidAndCode,
            } };
    };
    AcLaborDayPopupView.prototype.receiveData = function (data) {
        var view = this;
        view.vo.setRankInfo(data.data.data);
    };
    AcLaborDayPopupView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LABOR_FRESH, view.freshView, view);
        view.freshView();
        if (view.param.data.index == 3) {
            view.selectedTabIndex = view.param.data.index;
            view.tabbarGroup.selectedIndex = view.selectedTabIndex;
        }
    };
    AcLaborDayPopupView.prototype.getShowWidth = function () {
        return 580;
    };
    AcLaborDayPopupView.prototype.getShowHeight = function () {
        return 820;
    };
    AcLaborDayPopupView.prototype.freshView = function () {
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
    AcLaborDayPopupView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LABOR_FRESH, view.freshView, view);
        _super.prototype.dispose.call(this);
    };
    return AcLaborDayPopupView;
}(PopupView));
__reflect(AcLaborDayPopupView.prototype, "AcLaborDayPopupView");
//# sourceMappingURL=AcLaborDayPopupView.js.map