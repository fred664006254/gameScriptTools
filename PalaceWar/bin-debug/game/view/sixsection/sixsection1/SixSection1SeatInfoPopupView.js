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
* 席位信息
* date 2020.5.12
* author ycg
* @name SixSection1SeatInfoPopupView
*/
var SixSection1SeatInfoPopupView = (function (_super) {
    __extends(SixSection1SeatInfoPopupView, _super);
    function SixSection1SeatInfoPopupView() {
        return _super.call(this) || this;
    }
    SixSection1SeatInfoPopupView.prototype.getTitleStr = function () {
        return "sixSection1SeatInfoPopupTitle";
    };
    SixSection1SeatInfoPopupView.prototype.getResourceList = function () {
        var list = [];
        return _super.prototype.getResourceList.call(this).concat("public_popupscrollitembg", "public_titlebg", "common_select_frame2", "settingview_line").concat(list);
    };
    SixSection1SeatInfoPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_SIXSECTION1_CLOSE_REFRESH, this.hide, this);
        var tab = this.param.tab ? parseInt(this.param.tab) : 0;
        if (tab) {
            this.clickTabbarHandler({ index: tab - 1 });
            this.selectedTabIndex = tab - 1;
            this.tabbarGroup.selectedIndex = tab - 1;
        }
        // let tipBg = BaseBitmap.create("sixsection1_popbottombg");
        // tipBg.setPosition(this.viewBg.x + this.viewBg.width/2 - tipBg.width/2, this.viewBg.y + this.getShowHeight() - 200);
        // this.addChildToContainer(tipBg);
        // tipBg.visible = false;
        // let tip = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1HoldTitleTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        // tip.setPosition(tipBg.x + tipBg.width/2 - tip.width/2, tipBg.y + tipBg.height - 40);
        // this.addChildToContainer(tip);
        this.checkTabRed();
    };
    SixSection1SeatInfoPopupView.prototype.checkTabRed = function () {
        if (Api.sixsection1VoApi.checkMySeatRed()) {
            this.tabbarGroup.addRedPoint(0);
        }
        else {
            this.tabbarGroup.removeRedPoint(0);
        }
        if (Api.sixsection1VoApi.checkSeatDefenRed()) {
            this.tabbarGroup.addRedPoint(1);
        }
        else {
            this.tabbarGroup.removeRedPoint(1);
        }
        if (Api.sixsection1VoApi.checkSeatEnemyRed()) {
            this.tabbarGroup.addRedPoint(2);
        }
        else {
            this.tabbarGroup.removeRedPoint(2);
        }
    };
    SixSection1SeatInfoPopupView.prototype.tick = function () {
        this.checkTabRed();
    };
    SixSection1SeatInfoPopupView.prototype.setTabBarPosition = function () {
        this.tabbarGroup.x = GameConfig.stageWidth / 2 - this.tabbarGroup.width / 2;
        this.tabbarGroup.y = this.viewBg.y + 70 - 16;
    };
    SixSection1SeatInfoPopupView.prototype.getTabbarName = function () {
        return ButtonConst.BTN2_SMALL_TAB;
    };
    SixSection1SeatInfoPopupView.prototype.getTabbarTextArr = function () {
        return [
            "sixSection1SeatInfoTabName1",
            "sixSection1SeatInfoTabName2",
            "sixSection1SeatInfoTabName3",
            "sixSection1SeatInfoTabName4",
        ];
    };
    SixSection1SeatInfoPopupView.prototype.getShowHeight = function () {
        return 810;
    };
    SixSection1SeatInfoPopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SIXSECTION1_CLOSE_REFRESH, this.hide, this);
        _super.prototype.dispose.call(this);
    };
    return SixSection1SeatInfoPopupView;
}(PopupView));
__reflect(SixSection1SeatInfoPopupView.prototype, "SixSection1SeatInfoPopupView");
//# sourceMappingURL=SixSection1SeatInfoPopupView.js.map