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
 * 港台周年庆折扣商店
 * date 2019.11.28
 * author ycg
 * @class AcAnniversaryShop2020View
 */
var AcAnniversaryShop2020View = (function (_super) {
    __extends(AcAnniversaryShop2020View, _super);
    function AcAnniversaryShop2020View() {
        var _this = _super.call(this) || this;
        _this._showHeight = 0;
        _this._timeBg = null;
        _this._acTimeTf = null;
        return _this;
    }
    AcAnniversaryShop2020View.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_ANNIVERSARYSHOP2020_BUY, this.shopBuyCallback, this);
        this.setEnterViewFlag();
        var infoBgStr = ResourceManager.hasRes("anniversaryshop_infobg-" + this.getTypeCode()) ? "anniversaryshop_infobg-" + this.getTypeCode() : "anniversaryshop_infobg-1";
        var infoBg = BaseBitmap.create(infoBgStr);
        infoBg.setPosition(this.titleBg.x + this.titleBg.width / 2 - infoBg.width / 2, this.titleBg.y + this.titleBg.height - 7);
        this.addChildToContainer(infoBg);
        this.setBigFameCorner();
        this._showHeight = GameConfig.stageHeigth - this.tabbarGroup.y - this.tabbarGroup.height - 10;
        //倒计时
        this._timeBg = BaseBitmap.create("public_9_bg61");
        this._timeBg.y = infoBg.y + infoBg.height - this._timeBg.height - 2;
        this.addChildToContainer(this._timeBg);
        this._acTimeTf = ComponentManager.getTextField(LanguageManager.getlocal("acAnniversaryShop2020TimeCountDown", [this.vo.getCountDown()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._timeBg.width = 40 + this._acTimeTf.width;
        this._timeBg.x = GameConfig.stageWidth / 2 - this._timeBg.width / 2;
        this._acTimeTf.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._acTimeTf.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._acTimeTf.height / 2);
        this.addChildToContainer(this._acTimeTf);
    };
    AcAnniversaryShop2020View.prototype.changeTab = function () {
        var tabveiwClass = egret.getDefinitionByName(this.getClassName() + "Tab" + (this.selectedTabIndex + 1));
        if (tabveiwClass) {
            var commViewTab = this.tabViewData[this.selectedTabIndex];
            if (commViewTab) {
                this.addChild(commViewTab);
                commViewTab.refreshWhenSwitchBack();
            }
            else {
                var tabView = new tabveiwClass(this.param);
                tabView.setPosition(this.container.x, this.tabbarGroup.y + this.tabbarGroup.height + 10);
                this.tabViewData[this.selectedTabIndex] = tabView;
                tabView["param"] = this.param;
                this.addChild(tabView);
            }
            if (this.lastSelectedTabIndex != null && this.tabViewData[this.lastSelectedTabIndex]) {
                this.removeChild(this.tabViewData[this.lastSelectedTabIndex]);
            }
        }
    };
    AcAnniversaryShop2020View.prototype.shopBuyCallback = function (event) {
        if (event && event.data && event.data.ret) {
            var rData = event.data.data.data;
            var rewObj = GameData.formatRewardItem(rData.rewards);
            App.CommonUtil.playRewardFlyAction(rewObj);
            if (rData.replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
            }
        }
    };
    AcAnniversaryShop2020View.prototype.refreshView = function () {
    };
    AcAnniversaryShop2020View.prototype.tick = function () {
        this._acTimeTf.text = LanguageManager.getlocal("acAnniversaryShop2020TimeCountDown", [this.vo.getCountDown()]);
        this._timeBg.width = 40 + this._acTimeTf.width;
        this._timeBg.x = GameConfig.stageWidth / 2 - this._timeBg.width / 2;
        this._acTimeTf.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._acTimeTf.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._acTimeTf.height / 2);
    };
    AcAnniversaryShop2020View.prototype.setEnterViewFlag = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var key = vo.aidAndCode + vo.et + Api.playerVoApi.getPlayerID();
        LocalStorageManager.set(key, "1");
    };
    AcAnniversaryShop2020View.prototype.getTabViewHeight = function () {
        return this._showHeight;
    };
    AcAnniversaryShop2020View.prototype.getTypeCode = function () {
        return this.code;
    };
    Object.defineProperty(AcAnniversaryShop2020View.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    // 关闭按钮图标名称
    AcAnniversaryShop2020View.prototype.getCloseBtnName = function () {
        if (Api.switchVoApi.checkOpenShenheGame() && PlatformCfg.shenheFunctionName == this.getClassName().toLowerCase().replace("view", "")) {
            return "";
        }
        return ButtonConst.COMMON_CLOSE_1;
    };
    Object.defineProperty(AcAnniversaryShop2020View.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    AcAnniversaryShop2020View.prototype.getTabbarName = function () {
        return ButtonConst.BTN_BIG_TAB2;
    };
    AcAnniversaryShop2020View.prototype.getTabbarTextArr = function () {
        return ["acAnniversaryShop2020_tabName1-" + this.getTypeCode(),
            "acAnniversaryShop2020_tabName2-" + this.getTypeCode()
        ];
    };
    AcAnniversaryShop2020View.prototype.addTabbarGroupBg = function () {
        return true;
    };
    AcAnniversaryShop2020View.prototype.getTabbarGroupY = function () {
        return 215;
    };
    AcAnniversaryShop2020View.prototype.getBigFrame = function () {
        return "commonview_bigframe";
    };
    AcAnniversaryShop2020View.prototype.getTitleButtomY = function () {
        return 0;
    };
    AcAnniversaryShop2020View.prototype.getOffsetY = function () {
        return 16;
    };
    AcAnniversaryShop2020View.prototype.setTabBarPosition = function () {
        if (this.tabbarGroup) {
            var tabX = 0;
            var tabY = 0;
            if (egret.is(this, "PopupView")) {
                tabX = this.viewBg.x + 30;
                tabY = this.viewBg.y + 60;
            }
            else {
                tabX = 15;
                tabY = (this.titleBg ? this.titleBg.y + this.titleBg.height + 8 : 100) - 14;
            }
            tabY += this.getTabbarGroupY();
            this.tabbarGroup.setPosition((this.width - this.tabbarGroup.width) / 2, tabY);
            if (this.tabbarGroupBg) {
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, this.tabbarGroupBg, this.tabbarGroup, [0, 8]);
            }
        }
    };
    AcAnniversaryShop2020View.prototype.getTitleBgName = function () {
        return ResourceManager.hasRes("anniversaryshop_titlebg-" + this.getTypeCode()) ? "anniversaryshop_titlebg-" + this.getTypeCode() : "anniversaryshop_titlebg-1";
    };
    AcAnniversaryShop2020View.prototype.getTitleStr = function () {
        return null;
    };
    AcAnniversaryShop2020View.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    AcAnniversaryShop2020View.prototype.getRuleInfo = function () {
        return "acAnniversaryShop2020_ruleInfo-" + this.getTypeCode();
    };
    AcAnniversaryShop2020View.prototype.getResourceList = function () {
        var list = [];
        if (this.getTypeCode() != "1") {
            list = [
                "anniversaryshop_infobg-1", "anniversaryshop_titlebg-1", "anniversaryshopcode1",
            ];
        }
        return _super.prototype.getResourceList.call(this).concat([
            "acsingledayitembg", "common_shopmark", "shopview_corner", "shopview_line",
            "anniversaryshopcode" + this.getTypeCode(), "anniversaryshop_infobg-" + this.getTypeCode(), "anniversaryshop_titlebg-" + this.getTypeCode(),
        ]).concat(list);
    };
    AcAnniversaryShop2020View.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_ANNIVERSARYSHOP2020_BUY, this.shopBuyCallback, this);
        this._showHeight = 0;
        this._timeBg = null;
        this._acTimeTf = null;
        _super.prototype.dispose.call(this);
    };
    return AcAnniversaryShop2020View;
}(AcCommonView));
__reflect(AcAnniversaryShop2020View.prototype, "AcAnniversaryShop2020View");
//# sourceMappingURL=AcAnniversaryShop2020View.js.map