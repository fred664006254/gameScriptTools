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
 * desc:活动弹窗
*/
var AcLanternPopupView = (function (_super) {
    __extends(AcLanternPopupView, _super);
    function AcLanternPopupView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcLanternPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLanternPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLanternPopupView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLanternPopupView.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLanternPopupView.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcLanternPopupView.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 1:
            case 2:
            case 3:
                code = "1";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcLanternPopupView.prototype.getResourceList = function () {
        var view = this;
        var arr = [];
        return _super.prototype.getResourceList.call(this).concat([
            "progress5", "progress3", "progress3_bg", "accarnivalview_tab_red", "accarnivalview_tab_green", "collectflag", "wife_btnbg", "luckdrawshowbg-1", "skin_detail_namebg",
            "activity_charge_red", "shopview_corner", "shopview_line", "skin_detail_namebg", "countrywarrewardview_itembg", "dechuanchangearrow-1", "acchristmasview_rewardtopbg",
        ]).concat(arr);
    };
    AcLanternPopupView.prototype.getTabbarTextArr = function () {
        var code = this.getUiCode();
        return [
            App.CommonUtil.getCnByCode("acLanternTab1", this.getUiCode()),
            App.CommonUtil.getCnByCode("acLanternTab2", this.getUiCode()),
            App.CommonUtil.getCnByCode("acLanternTab3", this.getUiCode()),
        ];
    };
    AcLanternPopupView.prototype.initTabbarGroup = function () {
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
    AcLanternPopupView.prototype.setTabBarPosition = function () {
        _super.prototype.setTabBarPosition.call(this);
        this.tabbarGroup.x = 0;
    };
    AcLanternPopupView.prototype.getOffsetY = function () {
        return 16;
    };
    AcLanternPopupView.prototype.getTitleStr = function () {
        return "atkracecrossDetailTitle";
    };
    AcLanternPopupView.prototype.clickTabbarHandler = function (data) {
        var view = this;
        _super.prototype.clickTabbarHandler.call(this, data);
    };
    // protected getRequestData():{requestType:string,requestData:any}
    // {	
    // 	// let view = this;
    // 	// return {requestType:NetRequestConst.REQUEST_ACTIVITY_ARENARANK,requestData:{
    // 	// 	activeId : view.vo.aidAndCode,
    // 	// }};
    // }
    // protected receiveData(data:{ret:boolean,data:any}):void
    // {
    // 	let view = this;
    // 	//view.vo.setRankInfo(data.data.data);
    // }
    AcLanternPopupView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        var tab = this.param.tab ? parseInt(this.param.tab) : 0;
        if (tab) {
            view.clickTabbarHandler({ index: tab - 1 });
            view.selectedTabIndex = tab - 1;
            view.tabbarGroup.selectedIndex = tab - 1;
        }
    };
    AcLanternPopupView.prototype.getShowWidth = function () {
        return 600;
    };
    AcLanternPopupView.prototype.getShowHeight = function () {
        return 830 + 10;
    };
    AcLanternPopupView.prototype.freshView = function () {
        var view = this;
        if (view.vo.getpublicRedhot2()) {
            view.tabbarGroup.addRedPoint(0);
        }
        else {
            view.tabbarGroup.removeRedPoint(0);
        }
        if (view.vo.getpublicRedhot3()) {
            view.tabbarGroup.addRedPoint(1);
        }
        else {
            view.tabbarGroup.removeRedPoint(1);
        }
    };
    AcLanternPopupView.prototype.changeTab = function () {
        _super.prototype.changeTab.call(this);
        this.tabViewData[this.selectedTabIndex].x = 21;
    };
    AcLanternPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.freshView();
        this.tabViewData[this.selectedTabIndex].x = 21;
    };
    AcLanternPopupView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        _super.prototype.dispose.call(this);
    };
    return AcLanternPopupView;
}(PopupView));
__reflect(AcLanternPopupView.prototype, "AcLanternPopupView");
//# sourceMappingURL=AcLanternPopupView.js.map