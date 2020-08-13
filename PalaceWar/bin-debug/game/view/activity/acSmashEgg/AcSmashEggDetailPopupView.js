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
 * 金蛋赠礼活动详情
 * author hyd
 * date 2019/9/4
 * @class AcSmashEggDetailPopupView
 */
var AcSmashEggDetailPopupView = (function (_super) {
    __extends(AcSmashEggDetailPopupView, _super);
    function AcSmashEggDetailPopupView() {
        var _this = _super.call(this) || this;
        _this._itemNumTextTab = [];
        return _this;
    }
    Object.defineProperty(AcSmashEggDetailPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSmashEggDetailPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSmashEggDetailPopupView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSmashEggDetailPopupView.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSmashEggDetailPopupView.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSmashEggDetailPopupView.prototype, "uicode", {
        get: function () {
            return "" + this.param.data.uicode;
        },
        enumerable: true,
        configurable: true
    });
    AcSmashEggDetailPopupView.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            case 1:
            case 2:
                code = "1";
                break;
            case 3:
            case 4:
                code = "3";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcSmashEggDetailPopupView.prototype.getTabbarTextArr = function () {
        return [
            "acSmashEggTab1-" + this.code,
            "acSmashEggTab2-" + this.code,
            "acSmashEggTab3-" + this.code,
        ];
    };
    AcSmashEggDetailPopupView.prototype.initTabbarGroup = function () {
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
    AcSmashEggDetailPopupView.prototype.setTabBarPosition = function () {
        _super.prototype.setTabBarPosition.call(this);
        this.tabbarGroup.x = 0;
    };
    AcSmashEggDetailPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.tabViewData[this.selectedTabIndex].x = 29.5;
    };
    AcSmashEggDetailPopupView.prototype.changeTab = function () {
        _super.prototype.changeTab.call(this);
        this.tabViewData[this.selectedTabIndex].x = 29.5;
    };
    AcSmashEggDetailPopupView.prototype.getTitleStr = function () {
        return "acSmashEggDetailPopupViewTitle-" + this.code;
    };
    AcSmashEggDetailPopupView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        var bottombg = BaseBitmap.create("alliance_taskwotdbg1");
        bottombg.scaleX = (this.getShowWidth() - 50) / bottombg.width;
        bottombg.scaleY = 50 / bottombg.height;
        bottombg.setPosition(25 + GameData.popupviewOffsetX, this.getShowHeight() - 113);
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
    AcSmashEggDetailPopupView.prototype.getShowWidth = function () {
        return 580;
    };
    AcSmashEggDetailPopupView.prototype.getShowHeight = function () {
        return 830 + 10;
    };
    AcSmashEggDetailPopupView.prototype.freshView = function () {
        var view = this;
        // if(view.vo.getpublicRedhot1()){
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
        // for (let i:number = 1; i<=3; i++)
        // {
        //     this._itemNumTextTab[i-1].text = String(this.vo.getActivityItem(i));
        // }
    };
    AcSmashEggDetailPopupView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        this._itemNumTextTab.length = 0;
        _super.prototype.dispose.call(this);
    };
    return AcSmashEggDetailPopupView;
}(PopupView));
__reflect(AcSmashEggDetailPopupView.prototype, "AcSmashEggDetailPopupView");
//# sourceMappingURL=AcSmashEggDetailPopupView.js.map