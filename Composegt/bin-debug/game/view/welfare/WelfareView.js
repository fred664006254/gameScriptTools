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
 * 福利
 * author dmj
 * date 2017/11/02
 * @class WelfareView
 */
var WelfareView = (function (_super) {
    __extends(WelfareView, _super);
    function WelfareView() {
        var _this = _super.call(this) || this;
        /**
         * 福利中心显示功能配置
         * 配置规则：WelfareView后面的文件名，例如：WelfareViewFirstRecharge.ts   就配置FristRecharge
         */ //	"OfficialWeChat"
        _this._functionConfig = [
            // "SpCard",
            "RechargeBox",
            "Signin",
            "FirstRecharge",
            "MonthCard",
            "YearCard",
            "GodBless",
            "Binding",
            "OfficialWeChat",
            "Realname",
            "FunctionPreview",
            "Qgroup",
            "Rebate",
        ];
        // tab按钮的资源数组
        _this._tabbarList = [];
        //左侧背景
        _this._leftBg = null;
        _this._tabbarTextList = [];
        _this._lastFirstRechargeflag = null;
        _this._lastSigninShowRedDot = null;
        return _this;
    }
    WelfareView.prototype.getTitleBgName = function () {
        return "commonview_db_04";
    };
    WelfareView.prototype.show = function (data) {
        this._functionConfig = Api.arrivalVoApi.getFunctionCfgList();
        if (Api.switchVoApi.checkTWShenhe()) {
            for (var i = 0; i < this._functionConfig.length; i++) {
                if (this._functionConfig[i] == "YearCard") {
                    this._functionConfig.splice(i, 1);
                }
            }
        }
        //审核服下益玩大平台特殊处理
        if (PlatformManager.checkIsShenHeYiWan()) {
            var delete_arr = ['YearCard', 'MonthCard'];
            for (var _i = 0, delete_arr_1 = delete_arr; _i < delete_arr_1.length; _i++) {
                var str = delete_arr_1[_i];
                var idx = this._functionConfig.indexOf(str);
                if (idx > -1) {
                    this._functionConfig.splice(idx, 1);
                }
            }
        }
        if (data && data.tab) {
            this.selectedTabIndex = this._functionConfig.indexOf(data.tab);
        }
        for (var i = 0; i < this._functionConfig.length; i++) {
            var preName = this._functionConfig[i].toLowerCase();
            if (Api.switchVoApi.checkOpenNewMonthCardAndYearCard() && preName == "monthcard") {
                preName = "newmonthcard";
            }
            if (Api.switchVoApi.checkOpenNewMonthCardAndYearCard() && preName == "yearcard") {
                preName = "newyearcard";
            }
            this._tabbarList.push(preName + "_btn");
            this._tabbarTextList.push("");
        }
        this.tabViewData = {};
        _super.prototype.show.call(this, data);
    };
    WelfareView.prototype.initView = function () {
        if (Api.otherInfoVoApi.getOtherInfoVo().kvmap && Api.otherInfoVoApi.getOtherInfoVo().kvmap["check_recharge_benefit"]) {
        }
        else {
            PlatformManager.analytics37JPPoint("custom_recharge_check", "check_recharge_benefit", 1);
            if (PlatformManager.checkIsJPSp()) {
                this.request(NetRequestConst.REQUEST_OTHERINFO_SETKV, { k: "check_recharge_benefit", v: "1" });
            }
        }
        Api.mainTaskVoApi.checkShowGuide();
        if (Api.switchVoApi.checkTWShenhe()) {
            for (var i = 0; i < this._functionConfig.length; i++) {
                if (this._functionConfig[i] == "YearCard") {
                    this._functionConfig.splice(i, 1);
                }
            }
        }
        //审核服下益玩大平台特殊处理
        if (PlatformManager.checkIsShenHeYiWan()) {
            var delete_arr = ['YearCard', 'MonthCard'];
            if (Api.switchVoApi.checkOpenNewMonthCardAndYearCard()) {
                delete_arr = ['NewYearCard', 'NewMonthCard'];
            }
            for (var _i = 0, delete_arr_2 = delete_arr; _i < delete_arr_2.length; _i++) {
                var str = delete_arr_2[_i];
                var idx = this._functionConfig.indexOf(str);
                if (idx > -1) {
                    this._functionConfig.splice(idx, 1);
                }
            }
        }
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_SHOP, this.checkTabbarGroupState, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ARRIVAL, this.checkTabbarGroupState, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETAUTHOR3KREWARD, this.checkTabbarGroupState, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RECHARFGE_BOX_TIMEOUT, this.hide, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_YEARCARD_VIEW, this.hideAndShowYearCard, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETUNLOCKLISTREWARD, this.refreshFunctionRed, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT, this.tick, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_USER_GETANTIDECEPTION, this.checkTabbarGroupState, this);
        var leftBg = BaseBitmap.create("common_left_bg");
        leftBg.x = 0;
        leftBg.y = 0;
        leftBg.height = GameConfig.stageHeigth - this.container.y;
        this.addChildToContainer(leftBg);
        var leftBg2 = BaseBitmap.create("common_left_bg");
        leftBg2.x = leftBg.x + leftBg.width;
        leftBg2.y = -15;
        leftBg2.scaleX = (GameConfig.stageWidth - leftBg.width) / leftBg2.width;
        leftBg2.scaleY = leftBg2.scaleX;
        // leftBg2.height = GameConfig.stageHeigth - this.container.y;
        this.addChildToContainer(leftBg2);
        this._leftBg = leftBg;
        //进来就刷新
        this.tick();
    };
    WelfareView.prototype.hideAndShowYearCard = function () {
        this.hide();
        ViewController.getInstance().openView(ViewConst.COMMON.WELFAREVIEWYEARCARD);
    };
    WelfareView.prototype.changeTab = function () {
        console.log(this.getClassName() + this._functionConfig[this.selectedTabIndex]);
        var tabveiwClass = egret.getDefinitionByName(this.getClassName() + this._functionConfig[this.selectedTabIndex]);
        if (tabveiwClass) {
            if (this.tabViewData[this.selectedTabIndex]) {
                this.addChildToContainer(this.tabViewData[this.selectedTabIndex]);
            }
            else {
                // let bg:BaseBitmap = BaseBitmap.create("welfare_9_bg");
                // bg.setPosition(149,0);
                // this.addChildToContainer(bg);
                var tabView = new tabveiwClass();
                tabView.show();
                tabView.setPosition(149, -20);
                this.tabViewData[this.selectedTabIndex] = tabView;
                this.addChildToContainer(tabView);
            }
            if (this.lastSelectedTabIndex != null && this.tabViewData[this.lastSelectedTabIndex]) {
                this.removeChildFromContainer(this.tabViewData[this.lastSelectedTabIndex]);
            }
        }
    };
    WelfareView.prototype.initTabbarGroup = function () {
        // super.initTabbarGroup();
        var tabContainer = new BaseDisplayObjectContainer();
        var scrollH = GameConfig.stageHeigth - this.container.y + 10 - 80;
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, scrollH);
        var scrollView = ComponentManager.getScrollView(tabContainer, rect);
        scrollView.y = 70;
        scrollView.bounces = false;
        this.addChild(scrollView);
        var tabBarTextArr = this.getTabbarTextArr();
        if (tabBarTextArr && tabBarTextArr.length > 0) {
            this.tabbarGroup = ComponentManager.getTabBarGroup(this.getTabbarName(), tabBarTextArr, this.clickTabbarHandler, this);
            var tabBarX = (this instanceof PopupView) ? 30 : 15;
            tabContainer.addChild(this.tabbarGroup);
            // this.setTabBarPosition();
            this.container.y = this.getTitleButtomY();
            this.tabbarGroup.selectedIndex = this._selectedTabIndex;
            // this.changeTab();
        }
        this.tabbarGroup.setAligh(TabBarGroup.ALIGN_VERTICAL);
        this.tabbarGroup.x = 0;
        this.tabbarGroup.y = 0;
        this.container.y = 89;
        this.tabbarGroup.setSpace(2);
        this.tabbarGroup.addLine("welfare_line");
        this.tabbarGroup.selectedIndex = this.selectedTabIndex;
        this.checkTabbarGroupState();
        this.refreshFunctionRed();
    };
    WelfareView.prototype.checkTabbarGroupState = function () {
        var firstRechargeflag = Api.shopVoApi.getPayFlag();
        var firstIndex = this._functionConfig.indexOf("FirstRecharge");
        if (this._lastFirstRechargeflag == null || this._lastFirstRechargeflag != firstRechargeflag) {
            this._lastFirstRechargeflag = firstRechargeflag;
            if (firstRechargeflag == 1 && Api.servantVoApi.getServantObj("1033") == null) {
                this.tabbarGroup.showStatusIcon(firstIndex, "public_dot2");
            }
            else {
                this.tabbarGroup.removeStatusIcon(firstIndex);
            }
        }
        var signinShowRedDot = Api.arrivalVoApi.isShowRedDot;
        var signinIndex = this._functionConfig.indexOf("Signin");
        if (this._lastSigninShowRedDot == null || this._lastSigninShowRedDot != signinShowRedDot) {
            this._lastSigninShowRedDot = signinShowRedDot;
            if (signinShowRedDot == true) {
                this.tabbarGroup.showStatusIcon(signinIndex, "public_dot2");
            }
            else {
                this.tabbarGroup.removeStatusIcon(signinIndex);
            }
        }
        //实名认证红点 
        var realnameIndex = this._functionConfig.indexOf("Realname");
        if (Api.otherInfoVoApi.checkrealnamerewards() && PlatformManager.client.checkPerson()) {
            this.tabbarGroup.showStatusIcon(realnameIndex, "public_dot2");
        }
        else {
            this.tabbarGroup.removeStatusIcon(realnameIndex);
        }
        //防诈骗红点 
        var antideceptionIndex = this._functionConfig.indexOf("antideception");
        if (Api.switchVoApi.checkopenAntiDeception() && Api.otherInfoVoApi.getAntiDeception() == 0) {
            this.tabbarGroup.showStatusIcon(antideceptionIndex, "public_dot2");
        }
        else {
            this.tabbarGroup.removeStatusIcon(realnameIndex);
        }
    };
    WelfareView.prototype.refreshFunctionRed = function () {
        //功能预览红点
        var functionIndex = this._functionConfig.indexOf("FunctionPreview");
        if (Api.otherInfoVoApi.getFunctionRedhot() == true) {
            this.tabbarGroup.showStatusIcon(functionIndex, "public_dot2");
        }
        else {
            this.tabbarGroup.removeStatusIcon(functionIndex);
        }
    };
    WelfareView.prototype.getTabbarTextArr = function () {
        return this._tabbarTextList;
    };
    WelfareView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(this._tabbarList).concat([
            "common_9_bg", "common_left_bg", "welfare_line", "recharge_diban_01", "rechargevie_db_01",
            "preferential",
            "monthcard_desc_1_wx"
        ]);
    };
    WelfareView.prototype.getTabbarName = function () {
        return this._tabbarList;
    };
    WelfareView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    WelfareView.prototype.tick = function () {
        if (this.getSelectedTab() && this.getSelectedTab()["tick"]) {
            this.getSelectedTab()["tick"].call(this.getSelectedTab());
        }
        var functionYearCardIndex = this._functionConfig.indexOf("YearCard");
        if (!Api.shopVoApi.ifBuyYearCard()) {
            var vo = Api.acVoApi.checkIsYearCardDiscount();
            if ((Api.switchVoApi.checkOpenNewMonthCardAndYearCard()) && (vo)) {
                if (this.tabbarGroup) {
                    this.tabbarGroup.showStatusIcon(functionYearCardIndex, "preferential", true);
                }
            }
            else {
                this.tabbarGroup.removeStatusIcon(functionYearCardIndex);
            }
        }
        else {
            this.tabbarGroup.removeStatusIcon(functionYearCardIndex);
        }
        var functionMonthCardIndex = this._functionConfig.indexOf("MonthCard");
        if (!Api.shopVoApi.ifBuyMonthCard()) {
            var vo = Api.acVoApi.checkIsMonthCardDiscount();
            if (vo) {
                if (this.tabbarGroup) {
                    this.tabbarGroup.showStatusIcon(functionMonthCardIndex, "preferential", true);
                }
            }
            else {
                this.tabbarGroup.removeStatusIcon(functionMonthCardIndex);
            }
        }
        else {
            this.tabbarGroup.removeStatusIcon(functionMonthCardIndex);
        }
    };
    WelfareView.prototype.dispose = function () {
        Api.mainTaskVoApi.hideGuide();
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_SHOP, this.checkTabbarGroupState, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ARRIVAL, this.checkTabbarGroupState, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETAUTHOR3KREWARD, this.checkTabbarGroupState, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETUNLOCKLISTREWARD, this.refreshFunctionRed, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_USER_GETANTIDECEPTION, this.checkTabbarGroupState, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RECHARFGE_BOX_TIMEOUT, this.hide, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_YEARCARD_VIEW, this.hideAndShowYearCard, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT, this.tick, this);
        if (this.tabViewData) {
            for (var key in this.tabViewData) {
                var view = this.tabViewData[key];
                if (view) {
                    if (this.container.contains(view)) {
                        this.removeChildFromContainer(view);
                    }
                    view.dispose();
                    view = null;
                }
            }
            this.tabViewData = null;
        }
        this._tabbarList = [];
        this._leftBg = null;
        this._tabbarTextList = [];
        this._lastFirstRechargeflag = null;
        this._lastSigninShowRedDot = null;
        if (this.tabbarGroup) {
            this.tabbarGroup = null;
        }
        _super.prototype.dispose.call(this);
    };
    return WelfareView;
}(CommonView));
__reflect(WelfareView.prototype, "WelfareView");
