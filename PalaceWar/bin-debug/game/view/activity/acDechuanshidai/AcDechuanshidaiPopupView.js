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
var AcDechuanshidaiPopupView = (function (_super) {
    __extends(AcDechuanshidaiPopupView, _super);
    function AcDechuanshidaiPopupView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcDechuanshidaiPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDechuanshidaiPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDechuanshidaiPopupView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDechuanshidaiPopupView.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDechuanshidaiPopupView.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcDechuanshidaiPopupView.prototype.getUiCode = function () {
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
    AcDechuanshidaiPopupView.prototype.getResourceList = function () {
        var view = this;
        var arr = [];
        return _super.prototype.getResourceList.call(this).concat([
            "progress5", "progress3_bg", "accarnivalview_tab_red", "accarnivalview_tab_green", "collectflag", "wife_btnbg",
            "activity_charge_red", "shopview_corner", "shopview_line", "skin_detail_namebg", "countrywarrewardview_itembg"
        ]).concat(arr);
    };
    AcDechuanshidaiPopupView.prototype.getTabbarTextArr = function () {
        var code = this.getUiCode();
        return [
            "dechuanshidaiTab1-" + code,
            "dechuanshidaiTab2-" + code,
            "dechuanshidaiTab3-" + code,
            "dechuanshidaiTab4-" + code,
        ];
    };
    AcDechuanshidaiPopupView.prototype.initTabbarGroup = function () {
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
    AcDechuanshidaiPopupView.prototype.setTabBarPosition = function () {
        _super.prototype.setTabBarPosition.call(this);
        this.tabbarGroup.x = 0;
    };
    AcDechuanshidaiPopupView.prototype.getTitleStr = function () {
        return "atkracecrossDetailTitle";
    };
    AcDechuanshidaiPopupView.prototype.clickTabbarHandler = function (data) {
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
    AcDechuanshidaiPopupView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        var tab = this.param.tab ? parseInt(this.param.tab) : 0;
        if (tab) {
            view.clickTabbarHandler({ index: tab - 1 });
            view.selectedTabIndex = tab - 1;
            view.tabbarGroup.selectedIndex = tab - 1;
        }
    };
    AcDechuanshidaiPopupView.prototype.getShowWidth = function () {
        return 600;
    };
    AcDechuanshidaiPopupView.prototype.getShowHeight = function () {
        return 840;
    };
    AcDechuanshidaiPopupView.prototype.freshView = function () {
        var view = this;
        if (view.vo.getpublicRedhot1()) {
            view.tabbarGroup.addRedPoint(0);
        }
        else {
            view.tabbarGroup.removeRedPoint(0);
        }
        if (view.vo.getpublicRedhot4()) {
            view.tabbarGroup.addRedPoint(1);
        }
        else {
            view.tabbarGroup.removeRedPoint(1);
        }
        var code = this.getUiCode();
        for (var i = 1; i <= 4; ++i) {
            var haveTxt = this.getChildByName("haveTxt" + i);
            haveTxt.text = "X" + this.vo.dayNumById(i);
        }
    };
    AcDechuanshidaiPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.tabViewData[this.selectedTabIndex].x = 22;
        var descbg = BaseBitmap.create("public_9_bg1");
        descbg.width = 540;
        descbg.height = 50;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, descbg, this.viewBg, [0, 25]);
        this.addChild(descbg);
        var code = this.getUiCode();
        for (var i = 1; i <= 4; ++i) {
            var img = BaseLoadBitmap.create("dechuantype" + i + "-" + code);
            img.width = 100;
            img.height = 100;
            img.setScale(0.4);
            this.addChild(img);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, img, descbg, [20 + (i - 1) * 135, 0]);
            var haveTxt = ComponentManager.getTextField("X" + this.vo.dayNumById(i), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            this.addChild(haveTxt);
            haveTxt.name = "haveTxt" + i;
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, haveTxt, img, [img.width * img.scaleX + 3, 0]);
        }
        this.freshView();
    };
    AcDechuanshidaiPopupView.prototype.changeTab = function () {
        _super.prototype.changeTab.call(this);
        this.tabViewData[this.selectedTabIndex].x = 22;
    };
    AcDechuanshidaiPopupView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        _super.prototype.dispose.call(this);
    };
    return AcDechuanshidaiPopupView;
}(PopupView));
__reflect(AcDechuanshidaiPopupView.prototype, "AcDechuanshidaiPopupView");
//# sourceMappingURL=AcDechuanshidaiPopupView.js.map