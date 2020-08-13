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
var AcDechuanshidaiTaskView = (function (_super) {
    __extends(AcDechuanshidaiTaskView, _super);
    function AcDechuanshidaiTaskView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcDechuanshidaiTaskView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDechuanshidaiTaskView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDechuanshidaiTaskView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDechuanshidaiTaskView.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDechuanshidaiTaskView.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcDechuanshidaiTaskView.prototype.getUiCode = function () {
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
    AcDechuanshidaiTaskView.prototype.getResourceList = function () {
        var view = this;
        var arr = [];
        return _super.prototype.getResourceList.call(this).concat([
            "progress5", "progress3_bg", "accarnivalview_tab_red", "accarnivalview_tab_green", "collectflag", "wife_btnbg",
            "activity_charge_red", "shopview_corner", "shopview_line", "skin_detail_namebg", "countrywarrewardview_itembg"
        ]).concat(arr);
    };
    AcDechuanshidaiTaskView.prototype.getTabbarTextArr = function () {
        var code = this.getUiCode();
        return [
            "dechuanshidaiTaskTab1-" + code,
            "dechuanshidaiTaskTab2-" + code,
            "dechuanshidaiTaskTab3-" + code,
            "dechuanshidaiTaskTab4-" + code,
        ];
    };
    AcDechuanshidaiTaskView.prototype.initTabbarGroup = function () {
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
    AcDechuanshidaiTaskView.prototype.setTabBarPosition = function () {
        _super.prototype.setTabBarPosition.call(this);
        this.tabbarGroup.x = 0;
    };
    AcDechuanshidaiTaskView.prototype.getTitleStr = function () {
        return "achuntingRewardTitle";
    };
    AcDechuanshidaiTaskView.prototype.clickTabbarHandler = function (data) {
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
    AcDechuanshidaiTaskView.prototype.initView = function () {
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
    AcDechuanshidaiTaskView.prototype.getShowWidth = function () {
        return 600;
    };
    AcDechuanshidaiTaskView.prototype.getShowHeight = function () {
        return 840;
    };
    AcDechuanshidaiTaskView.prototype.freshView = function () {
        var view = this;
        for (var i = 1; i <= 4; ++i) {
            if (view.vo.getDayTaskReward(i)) {
                view.tabbarGroup.addRedPoint(i - 1);
            }
            else {
                view.tabbarGroup.removeRedPoint(i - 1);
            }
        }
    };
    AcDechuanshidaiTaskView.prototype.changeTab = function () {
        _super.prototype.changeTab.call(this);
        this.tabViewData[this.selectedTabIndex].x = 23;
    };
    AcDechuanshidaiTaskView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.tabViewData[this.selectedTabIndex].x = 23;
    };
    AcDechuanshidaiTaskView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        _super.prototype.dispose.call(this);
    };
    return AcDechuanshidaiTaskView;
}(PopupView));
__reflect(AcDechuanshidaiTaskView.prototype, "AcDechuanshidaiTaskView");
//# sourceMappingURL=AcDechuanshidaiTaskView.js.map