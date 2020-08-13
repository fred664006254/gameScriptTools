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
    date : 2019.5.22
    desc : 粽叶飘香-端午节活动
*/
var AcDuanWuPopupView = (function (_super) {
    __extends(AcDuanWuPopupView, _super);
    function AcDuanWuPopupView() {
        var _this = _super.call(this) || this;
        _this._itemNumTextTab = [];
        return _this;
    }
    Object.defineProperty(AcDuanWuPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDuanWuPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDuanWuPopupView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDuanWuPopupView.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDuanWuPopupView.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDuanWuPopupView.prototype, "uicode", {
        get: function () {
            return "" + this.param.data.uicode;
        },
        enumerable: true,
        configurable: true
    });
    AcDuanWuPopupView.prototype.getUiCode = function () {
        return this.uicode;
    };
    AcDuanWuPopupView.prototype.getResourceList = function () {
        var view = this;
        var arr = [];
        return _super.prototype.getResourceList.call(this).concat([
            "alliance_taskwotdbg1",
            "progress5", "progress3_bg", "accarnivalview_tab_red", "accarnivalview_tab_green", "collectflag", "acduanwu_topbg1_" + this.uicode, "acduanwu_topbg2_" + this.uicode,
            "activity_charge_red", "fourpeople_bottom", "shopview_corner",
            "acduanwu_plus", "acduanwu_arrow",
        ]).concat(arr);
    };
    AcDuanWuPopupView.prototype.getTabbarTextArr = function () {
        var code = this.uicode;
        return [
            "acDuanWuTab1-" + code,
            "acDuanWuTab2-" + code,
            "acDuanWuTab3-" + code,
            "acDuanWuTab4-" + code,
        ];
    };
    AcDuanWuPopupView.prototype.initTabbarGroup = function () {
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
    AcDuanWuPopupView.prototype.setTabBarPosition = function () {
        _super.prototype.setTabBarPosition.call(this);
        this.tabbarGroup.x = 0;
    };
    AcDuanWuPopupView.prototype.getTitleStr = function () {
        return "acDuanWu-1_Title";
    };
    AcDuanWuPopupView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        var bottombg = BaseBitmap.create("alliance_taskwotdbg1");
        bottombg.scaleX = (this.getShowWidth() - 50) / bottombg.width;
        bottombg.scaleY = 50 / bottombg.height;
        bottombg.setPosition(25 + GameData.popupviewOffsetX, this.getShowHeight() - 123);
        bottombg.alpha = 0.7;
        this.addChildToContainer(bottombg);
        for (var i = 1; i <= 3; i++) {
            var icon = BaseBitmap.create("duanwuiconsmall" + i + "-" + this.uicode);
            icon.setPosition(68 + (i - 1) * 170 + GameData.popupviewOffsetX, bottombg.y);
            this.addChildToContainer(icon);
            var numText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            numText.setPosition(icon.x + icon.width + 10, icon.y + 10);
            this.addChildToContainer(numText);
            this._itemNumTextTab.push(numText);
        }
        view.freshView();
        var tab = this.param.tab ? parseInt(this.param.tab) : 0;
        if (tab) {
            view.clickTabbarHandler({ index: tab - 1 });
            view.selectedTabIndex = tab - 1;
            view.tabbarGroup.selectedIndex = tab - 1;
        }
    };
    AcDuanWuPopupView.prototype.getShowWidth = function () {
        return 580;
    };
    AcDuanWuPopupView.prototype.getShowHeight = function () {
        return 840;
    };
    AcDuanWuPopupView.prototype.freshView = function () {
        var view = this;
        if (view.vo.getpublicRedhot1()) {
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
        if (view.vo.getpublicRedhot3()) {
            view.tabbarGroup.addRedPoint(2);
        }
        else {
            view.tabbarGroup.removeRedPoint(2);
        }
        if (view.vo.getpublicRedhot4()) {
            view.tabbarGroup.addRedPoint(3);
        }
        else {
            view.tabbarGroup.removeRedPoint(3);
        }
        for (var i = 1; i <= 3; i++) {
            this._itemNumTextTab[i - 1].text = String(this.vo.getActivityItem(i));
        }
    };
    AcDuanWuPopupView.prototype.changeTab = function () {
        _super.prototype.changeTab.call(this);
        this.tabViewData[this.selectedTabIndex].x = 28;
    };
    AcDuanWuPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.tabViewData[this.selectedTabIndex].x = 28;
    };
    AcDuanWuPopupView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        this._itemNumTextTab.length = 0;
        _super.prototype.dispose.call(this);
    };
    return AcDuanWuPopupView;
}(PopupView));
__reflect(AcDuanWuPopupView.prototype, "AcDuanWuPopupView");
//# sourceMappingURL=AcDuanWuPopupView.js.map