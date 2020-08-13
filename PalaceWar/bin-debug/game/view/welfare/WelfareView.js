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
            "RechargeBox",
            "Signin",
            "FirstRecharge",
            "MonthCard",
            "YearCard",
            "GodBless",
            "Binding",
            "OfficialWeChat",
            "Realname",
            "PlayerComeBack",
            "FunctionPreview",
            "Qgroup",
            "Rebate",
            "Rebate2",
            "NewInvite",
            "Housekeeper",
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
    WelfareView.prototype.show = function (data) {
        this._functionConfig = Api.arrivalVoApi.getFunctionCfgList();
        // if (Api.switchVoApi.checkTWShenhe()) {
        // 	for(var i=0;i<this._functionConfig.length;i++)
        // 	{
        // 		if (this._functionConfig[i]=="YearCard")
        // 		{
        // 			this._functionConfig.splice(i,1);
        // 		}
        // 	}	
        // }
        //审核服下益玩大平台特殊处理
        if ((PlatformManager.checkIsShenHeYiWan() || Api.switchVoApi.checkTWShenhe()) && PlatformManager.checkIsShenHeShowCard() == false) {
            var delete_arr = ['YearCard', 'MonthCard'];
            if (Api.switchVoApi.checkOpenNewMonthCardAndYearCard()) {
                delete_arr = ['NewYearCard', 'NewMonthCard'];
            }
            for (var _i = 0, delete_arr_1 = delete_arr; _i < delete_arr_1.length; _i++) {
                var str = delete_arr_1[_i];
                var idx = this._functionConfig.indexOf(str);
                if (idx > -1) {
                    this._functionConfig.splice(idx, 1);
                }
            }
        }
        //新好友邀请功能
        if (!Api.switchVoApi.checkOpenNewInvite()) {
            var delete_arr = ['NewInvite'];
            for (var _a = 0, delete_arr_2 = delete_arr; _a < delete_arr_2.length; _a++) {
                var str = delete_arr_2[_a];
                var idx = this._functionConfig.indexOf(str);
                if (idx > -1) {
                    this._functionConfig.splice(idx, 1);
                }
            }
        }
        if (!Api.switchVoApi.checkOpenPlayerComeBack()) {
            var delete_arr = ['PlayerComeBack'];
            for (var _b = 0, delete_arr_3 = delete_arr; _b < delete_arr_3.length; _b++) {
                var str = delete_arr_3[_b];
                var idx = this._functionConfig.indexOf(str);
                if (idx > -1) {
                    this._functionConfig.splice(idx, 1);
                }
            }
        }
        if (!Api.switchVoApi.checkOpenHousekeeper()) {
            var delete_arr = ['Housekeeper'];
            for (var _c = 0, delete_arr_4 = delete_arr; _c < delete_arr_4.length; _c++) {
                var str = delete_arr_4[_c];
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
            if (preName == "signin" && Api.arrivalVoApi.getIsAugustsignin()) {
                preName = "augustsignin";
            }
            if (Api.switchVoApi.checkOpenNewMonthCardAndYearCard() && preName == "monthcard") {
                preName = "newmonthcard";
            }
            if (Api.switchVoApi.checkOpenNewMonthCardAndYearCard() && preName == "yearcard") {
                preName = "yearcard_new";
            }
            this._tabbarList.push(preName + "_btn");
            this._tabbarTextList.push("");
        }
        this.tabViewData = {};
        _super.prototype.show.call(this, data);
    };
    WelfareView.prototype.initView = function () {
        // if (Api.switchVoApi.checkTWShenhe()) {
        // 	for(var i=0;i<this._functionConfig.length;i++)
        // 	{
        // 		if (this._functionConfig[i]=="YearCard")
        // 		{
        // 			this._functionConfig.splice(i,1);
        // 		}
        // 	}	
        // }
        Api.mainTaskVoApi.checkShowGuide();
        //审核服下益玩大平台特殊处理
        if ((PlatformManager.checkIsShenHeYiWan() || Api.switchVoApi.checkTWShenhe()) && PlatformManager.checkIsShenHeShowCard() == false) {
            var delete_arr = ['YearCard', 'MonthCard'];
            for (var _i = 0, delete_arr_5 = delete_arr; _i < delete_arr_5.length; _i++) {
                var str = delete_arr_5[_i];
                var idx = this._functionConfig.indexOf(str);
                if (idx > -1) {
                    this._functionConfig.splice(idx, 1);
                }
            }
        }
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_SHOP, this.checkTabbarGroupState, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ARRIVAL, this.checkTabbarGroupState, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETAUTHOR3KREWARD, this.checkTabbarGroupState, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_NEWINVITE, this.checkTabbarGroupState, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_NEWREBACK, this.checkTabbarGroupState, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RECHARFGE_BOX_TIMEOUT, this.hide, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_YEARCARD_VIEW, this.hideAndShowYearCard, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETUNLOCKLISTREWARD, this.refreshFunctionRed, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_SHOP, this.refreshGrowGoldRed, this);
        var leftBg = BaseBitmap.create("common_left_bg");
        leftBg.x = 0;
        leftBg.y = 0;
        leftBg.height = GameConfig.stageHeigth - this.container.y;
        this.addChildToContainer(leftBg);
        this._leftBg = leftBg;
        this.tick();
        this.refreshGrowGoldRed();
    };
    WelfareView.prototype.hideAndShowYearCard = function () {
        this.hide();
        ViewController.getInstance().openView(ViewConst.COMMON.WELFAREVIEWYEARCARD);
    };
    WelfareView.prototype.changeTab = function () {
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
                tabView.setPosition(149, 0);
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
        var scrollH = GameConfig.stageHeigth - this.container.y + 10;
        var rect = new egret.Rectangle(0, 0, 148, scrollH);
        var scrollView = ComponentManager.getScrollView(tabContainer, rect);
        scrollView.y = 90;
        scrollView.bounces = false;
        scrollView.horizontalScrollPolicy = "off";
        this.addChild(scrollView);
        var tabBarTextArr = this.getTabbarTextArr();
        if (tabBarTextArr && tabBarTextArr.length > 0) {
            this.tabbarGroup = ComponentManager.getTabBarGroup(this.getTabbarName(), tabBarTextArr, this.clickTabbarHandler, this, null, TabBarGroup.ALIGN_VERTICAL);
            var tabBarX = (this instanceof PopupView) ? 30 : 15;
            tabContainer.addChild(this.tabbarGroup);
            // this.setTabBarPosition();
            this.container.y = this.getTitleButtomY();
            this.tabbarGroup.selectedIndex = this._selectedTabIndex;
            // this.changeTab();
        }
        // this.tabbarGroup.setAligh();
        this.tabbarGroup.x = 0;
        this.tabbarGroup.y = 0;
        this.container.y = 89;
        this.tabbarGroup.setSpace(6);
        this.tabbarGroup.addLine("welfare_line");
        this.tabbarGroup.selectedIndex = this.selectedTabIndex;
        this.checkTabbarGroupState();
        this.refreshFunctionRed();
        if (this._functionConfig[this.selectedTabIndex] == "Housekeeper" || this._functionConfig[this.selectedTabIndex] == "GrowGold") {
            scrollView.setScrollTop(scrollH - this.container.height);
        }
    };
    WelfareView.prototype.checkTabbarGroupState = function () {
        var firstRechargeflag = Api.shopVoApi.getPayFlag();
        var firstIndex = this._functionConfig.indexOf("FirstRecharge");
        if (this._lastFirstRechargeflag == null || this._lastFirstRechargeflag != firstRechargeflag) {
            this._lastFirstRechargeflag = firstRechargeflag;
            if (firstRechargeflag == 1) {
                this.tabbarGroup.showStatusIcon(firstIndex, "public_dot2");
                this.tabbarGroup.setRedPos(firstIndex, 120, 5);
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
                this.tabbarGroup.setRedPos(signinIndex, 120, 5);
            }
            else {
                this.tabbarGroup.removeStatusIcon(signinIndex);
            }
        }
        //实名认证红点 
        var realnameIndex = this._functionConfig.indexOf("Realname");
        if (Api.otherInfoVoApi.checkrealnamerewards() && PlatformManager.client.checkPerson()) {
            this.tabbarGroup.showStatusIcon(realnameIndex, "public_dot2");
            this.tabbarGroup.setRedPos(realnameIndex, 120, 5);
        }
        else {
            this.tabbarGroup.removeStatusIcon(realnameIndex);
        }
        //邀请好友红点 
        var newinviteIndex = this._functionConfig.indexOf("NewInvite");
        if (Api.switchVoApi.checkOpenNewInvite() && Api.newinviteVoApi.getShowRed()) {
            this.tabbarGroup.showStatusIcon(newinviteIndex, "public_dot2");
            this.tabbarGroup.setRedPos(newinviteIndex, 120, 5);
        }
        else {
            this.tabbarGroup.removeStatusIcon(newinviteIndex);
        }
        //召回好友红点 
        var comebackIndex = this._functionConfig.indexOf("PlayerComeBack");
        if (Api.switchVoApi.checkOpenPlayerComeBack() && Api.newrebackVoApi.getShowRed()) {
            this.tabbarGroup.showStatusIcon(comebackIndex, "public_dot2");
            this.tabbarGroup.setRedPos(comebackIndex, 120, 5);
        }
        else {
            this.tabbarGroup.removeStatusIcon(comebackIndex);
        }
    };
    WelfareView.prototype.refreshFunctionRed = function () {
        //功能预览红点
        var functionIndex = this._functionConfig.indexOf("FunctionPreview");
        if (functionIndex >= 0) {
            if (Api.otherInfoVoApi.getFunctionRedhot() == true) {
                this.tabbarGroup.showStatusIcon(functionIndex, "public_dot2");
                this.tabbarGroup.setRedPos(functionIndex, 120, 5);
            }
            else {
                this.tabbarGroup.removeStatusIcon(functionIndex);
            }
        }
    };
    //
    WelfareView.prototype.refreshGrowGoldRed = function () {
        //功能预览红点
        var functionIndex = this._functionConfig.indexOf("GrowGold");
        if (functionIndex >= 0) {
            if (Api.shopVoApi.checkGrowGoldRed() == true) {
                this.tabbarGroup.showStatusIcon(functionIndex, "public_dot2");
                this.tabbarGroup.setRedPos(functionIndex, 120, 5);
            }
            else {
                this.tabbarGroup.removeStatusIcon(functionIndex);
            }
        }
    };
    WelfareView.prototype.getTabbarTextArr = function () {
        return this._tabbarTextList;
    };
    WelfareView.prototype.getResourceList = function () {
        var resArray = this._tabbarList;
        if (Api.switchVoApi.checkOpenHousekeeper()) {
            resArray.push("housekeeper_open");
        }
        return _super.prototype.getResourceList.call(this).concat(resArray).concat([
            "common_9_bg", "common_left_bg", "welfare_line",
            "signin_had_get", "welfare_hasbuy",
            "dinner_gems_1", "recharge_discount_left",
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
        if (this.tabbarGroup) {
            if (!Api.shopVoApi.ifBuyYearCard()) {
                var vo = Api.acVoApi.checkIsYearCardDiscount();
                if ((Api.switchVoApi.checkOpenNewMonthCardAndYearCard() && App.DeviceUtil.isWXgame()) || (vo)) {
                    this.tabbarGroup.showStatusIcon(functionYearCardIndex, "recharge_discount_left", true);
                    this.tabbarGroup.setRedPos(functionYearCardIndex, 120, -5);
                }
                else {
                    this.tabbarGroup.removeStatusIcon(functionYearCardIndex);
                }
            }
            else {
                this.tabbarGroup.removeStatusIcon(functionYearCardIndex);
            }
        }
        var functionMouthCardIndex = this._functionConfig.indexOf("MonthCard");
        if (this.tabbarGroup) {
            var mouthVo = Api.acVoApi.checkIsMonthDiscount();
            if (mouthVo && mouthVo.checkBuyMouth()) {
                this.tabbarGroup.showStatusIcon(functionMouthCardIndex, "recharge_discount_left", true);
                this.tabbarGroup.setRedPos(functionMouthCardIndex, 120, -5);
            }
            else {
                this.tabbarGroup.removeStatusIcon(functionMouthCardIndex);
            }
        }
    };
    WelfareView.prototype.dispose = function () {
        Api.mainTaskVoApi.hideGuide();
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_SHOP, this.checkTabbarGroupState, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ARRIVAL, this.checkTabbarGroupState, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETAUTHOR3KREWARD, this.checkTabbarGroupState, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETUNLOCKLISTREWARD, this.refreshFunctionRed, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_NEWINVITE, this.checkTabbarGroupState, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RECHARFGE_BOX_TIMEOUT, this.hide, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_YEARCARD_VIEW, this.hideAndShowYearCard, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_NEWREBACK, this.checkTabbarGroupState, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_SHOP, this.refreshGrowGoldRed, this);
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
//# sourceMappingURL=WelfareView.js.map