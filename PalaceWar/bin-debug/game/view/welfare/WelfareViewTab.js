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
 * 福利界面tab父类
 * author dmj
 * date 2017/11/03
 * @class WelfareViewTab
 */
var WelfareViewTab = (function (_super) {
    __extends(WelfareViewTab, _super);
    function WelfareViewTab() {
        var _this = _super.call(this) || this;
        _this.isWanbaBoo = false;
        // 保存tabview数据
        _this.tabViewData = {};
        // 当前选中的页签
        _this._selectedTabIndex = 0;
        // 上次选中的页签
        _this._lastSelectedTabIndex = null;
        //大框
        _this.bigframe = null;
        return _this;
    }
    WelfareViewTab.prototype.init = function () {
        this.isWanbaBoo = Api.switchVoApi.checknewRecharge();
        var logdStr = BaseBitmap.create(this.getResPreName() + "_bg");
        var totalSignDay = Api.arrivalVoApi.getTotalSignDay();
        var weizheng = false;
        if (this.getResPreName() == "signin") {
            if (totalSignDay <= Config.GameprojectCfg.sign2Day) {
                if (!Api.sevenDaysSignupLoginVoApi.checkUserIsNewer()) {
                    logdStr.setRes(this.getResPreName() + "3_bg");
                    weizheng = true;
                }
            }
            else if (totalSignDay > Config.GameprojectCfg.sign2Day && totalSignDay <= Config.GameprojectCfg.sign7Day) {
                if (!Api.sevenDaysSignupLoginVoApi.checkUserIsNewer()) {
                    logdStr.setRes(this.getResPreName() + "2_bg");
                }
            }
            else if (totalSignDay > Config.GameprojectCfg.sign7Day && totalSignDay <= Config.GameprojectCfg.sign30Day) {
                if (Api.switchVoApi.checkOpenNewSignIn()) {
                    logdStr.setRes(this.getResPreName() + "5_bg");
                }
            }
            else if (totalSignDay > Config.GameprojectCfg.sign30Day && totalSignDay <= Config.GameprojectCfg.sign100Day) {
                if (Api.switchVoApi.checkOpenNewSignIn()) {
                    logdStr.setRes(this.getResPreName() + "6_bg");
                }
            }
            else if (totalSignDay > Config.GameprojectCfg.sign100Day && totalSignDay <= Config.GameprojectCfg.sign365Day) {
                if (Api.switchVoApi.checkOpenNewSignIn()) {
                    logdStr.setRes(this.getResPreName() + "4_bg");
                }
            }
            else if (totalSignDay > Config.GameprojectCfg.sign365Day && totalSignDay <= Config.Signup500dayCfg.showDay) {
                if (Api.switchVoApi.checkOpenNewSignIn()) {
                    logdStr.setRes(Api.switchVoApi.checkOpenBlueWife() ? "sign_bg_500_blueType" : "sign_bg_500");
                }
            }
            else if (totalSignDay > Config.Signup500dayCfg.showDay && totalSignDay <= Config.Signup500dayCfg.showLastDay()) {
                if (Api.switchVoApi.checkOpenNewSignIn()) {
                    logdStr.setRes("sign_bg_560");
                }
            }
            else if (totalSignDay > Config.Signup500dayCfg.showLastDay() && totalSignDay <= Config.GameprojectCfg.sign600Day) {
                if (Api.switchVoApi.checkOpenNewSignIn()) {
                    logdStr.setRes("sign_bg_600");
                }
            }
            else if (totalSignDay > Config.GameprojectCfg.sign600Day && totalSignDay <= Config.GameprojectCfg.sign700Day) {
                if (Api.switchVoApi.checkOpenNewSignIn()) {
                    logdStr.setRes("sign_bg_700");
                }
            }
            else if (totalSignDay > Config.GameprojectCfg.sign700Day && totalSignDay <= Config.GameprojectCfg.sign800Day) {
                if (Api.switchVoApi.checkOpenNewSignIn()) {
                    logdStr.setRes("sign_bg_800");
                }
            }
            else if (totalSignDay > Config.GameprojectCfg.sign800Day && totalSignDay <= Config.GameprojectCfg.sign900Day) {
                if (Api.switchVoApi.checkOpenNewSignIn()) {
                    logdStr.setRes("sign_bg_900");
                }
            }
        }
        else if (this.getResPreName() == "yearcard" && Api.acVoApi.getActivityVoByAidAndCode("discount", "2") && Api.acVoApi.getActivityVoByAidAndCode("discount", "2").isStart) {
            // vip折扣
            var picname = this.getResPreName() + (PlatformManager.checkIsXlSp() ? "_discount_xianlaiType_bg" : "_discount_bg");
            logdStr = BaseBitmap.create(picname);
        }
        else if (this.isWanbaBoo && this.getResPreName() == "firstrecharge") {
            var picname = "firstrecharge2_bg";
            logdStr = BaseBitmap.create(picname);
        }
        var bg = logdStr;
        if (Api.switchVoApi.checkOpenNewMonthCardAndYearCard() && (this.getResPreName().indexOf("monthcard") > -1 || this.getResPreName().indexOf("yearcard") > -1)) {
            this.bottomBg = BaseBitmap.create("welfareview_bg");
            this.bottomBg.y = bg.y + bg.height - 78;
        }
        else {
            this.bottomBg = BaseBitmap.create("common_9_bg");
            this.bottomBg.y = bg.height;
            this.bottomBg.height = GameConfig.stageHeigth - 89 - bg.height;
        }
        this.addChild(this.bottomBg);
        this.addChild(bg);
        if (weizheng) {
            var servantCfg = Config.ServantCfg.getServantItemById("1050");
            if (servantCfg.quality2) {
                var cornerImg = Api.servantVoApi.getCornerMarkerContainer(servantCfg.quality2);
                cornerImg.x = 395;
                cornerImg.y = 150;
                cornerImg.setScale(1.3);
                this.addChild(cornerImg);
            }
        }
    };
    WelfareViewTab.prototype.getParent = function () {
        return null;
    };
    WelfareViewTab.prototype.getResourceList = function () {
        var preName = this.getResPreName();
        var arr = [];
        arr.push(preName + "_btn");
        if (preName == "yearcard" && Api.acVoApi.getActivityVoByAidAndCode("discount", "2") && Api.acVoApi.getActivityVoByAidAndCode("discount", "2").isStart) {
            arr.push(preName + (PlatformManager.checkIsXlSp() ? "_discount_xianlaiType_bg" : "_discount_bg"));
        }
        else {
            arr.push(preName + "_bg");
        }
        var descImage = preName + "_desc";
        var iconImage = preName + "_icon";
        if (RES.hasRes(descImage)) {
            arr.push(descImage);
        }
        if (RES.hasRes(iconImage)) {
            arr.push(iconImage);
        }
        if (Api.switchVoApi.checkOpenNewMonthCardAndYearCard()) {
            arr.push("welfareview_bg");
        }
        return arr;
    };
    WelfareViewTab.prototype.getResPreName = function () {
        var className = egret.getQualifiedClassName(this);
        var preName = className.substring(11, className.length);
        return preName.toLowerCase();
    };
    WelfareViewTab.prototype.getTabbarTextArr = function () {
        return [];
    };
    // 页签图名称
    WelfareViewTab.prototype.getTabbarName = function () {
        return ButtonConst.BTN_TAB;
    };
    WelfareViewTab.prototype.addTabbarGroupBg = function () {
        return false;
    };
    Object.defineProperty(WelfareViewTab.prototype, "uiType", {
        get: function () {
            return "";
        },
        enumerable: true,
        configurable: true
    });
    WelfareViewTab.prototype.initTabbarGroup = function () {
        var tabBarTextArr = this.getTabbarTextArr();
        if (tabBarTextArr && tabBarTextArr.length > 0) {
            if (this.addTabbarGroupBg()) {
                var bg = BaseBitmap.create("commonview_tabbar_bg");
                this.addChild(bg);
                this.tabbarGroupBg = bg;
            }
            this.tabbarGroup = ComponentManager.getTabBarGroup(this.getTabbarName(), tabBarTextArr, this.clickTabbarHandler, this);
            var tabBarX = (this instanceof PopupView) ? 30 : 15;
            this.addChild(this.tabbarGroup);
            this.setTabBarPosition();
            this.tabbarGroup.selectedIndex = this._selectedTabIndex;
            if (this.uiType == "2") {
                this.tabbarGroup.setSpace(0);
                this.tabbarGroup.x += 5;
                this.tabbarGroup.setColor(0xe1ba86, 0x472c26);
                this.setBigFameY(0);
            }
            this.tabbarGroup.selectedIndex = this._selectedTabIndex;
        }
        // this.changeTab();
    };
    WelfareViewTab.prototype.setBigFameY = function (y) {
        if (this.bigframe) {
            this.bigframe.y = y;
            this.bigframe.height = GameConfig.stageHeigth - this.y - y;
        }
    };
    WelfareViewTab.prototype.setTabBarPosition = function () {
    };
    WelfareViewTab.prototype.getTabbarGroupY = function () {
        return 0;
    };
    WelfareViewTab.prototype.clickTabbarHandler = function (data) {
        App.LogUtil.log("index: " + data.index);
        var index = Number(data.index);
        if (this.checkTabCondition(index) == false) {
            // 重新checkTabCondition方法处理
            this.tabbarGroup.selectedIndex = this.selectedTabIndex;
            return;
        }
        this.lastSelectedTabIndex = this.selectedTabIndex;
        this.selectedTabIndex = index;
        this.changeTab();
    };
    // (有页签加锁时，需要重新该方法)检查该页签条件是否满足切换条件
    WelfareViewTab.prototype.checkTabCondition = function (index) {
        return true;
    };
    Object.defineProperty(WelfareViewTab.prototype, "selectedTabIndex", {
        get: function () {
            return this._selectedTabIndex;
        },
        set: function (index) {
            if (!isNaN(index)) {
                this._selectedTabIndex = index;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WelfareViewTab.prototype, "lastSelectedTabIndex", {
        get: function () {
            return this._lastSelectedTabIndex;
        },
        set: function (index) {
            if (!isNaN(index)) {
                this._lastSelectedTabIndex = index;
            }
        },
        enumerable: true,
        configurable: true
    });
    WelfareViewTab.prototype.changeTab = function () {
        var tabveiwClass = egret.getDefinitionByName(this.getClassName() + "Tab" + (this.selectedTabIndex + 1));
        if (tabveiwClass) {
            var commViewTab = this.tabViewData[this.selectedTabIndex];
            if (commViewTab) {
                this.addChild(commViewTab);
                commViewTab.refreshWhenSwitchBack();
            }
            else {
                var tabView = new tabveiwClass(this.param);
                tabView.setPosition(0, this.y + this.getTabbarGroupY());
                this.tabViewData[this.selectedTabIndex] = tabView;
                tabView["param"] = this.param;
                this.addChild(tabView);
                // this.addChild(tabView);
            }
            if (this.lastSelectedTabIndex != null && this.tabViewData[this.lastSelectedTabIndex]) {
                this.removeChild(this.tabViewData[this.lastSelectedTabIndex]);
            }
        }
    };
    /**获取当前选中的tab实例 */
    WelfareViewTab.prototype.getSelectedTab = function () {
        if (this.tabViewData && this.tabViewData[this.selectedTabIndex]) {
            return this.tabViewData[this.selectedTabIndex];
        }
        return null;
    };
    /**检查是否为当前选中的页签 */
    WelfareViewTab.prototype.checkSelectedTab = function (index) {
        if (index == this.selectedTabIndex) {
            return true;
        }
        return false;
    };
    WelfareViewTab.prototype.addRedPoint = function (index) {
        if (this.tabbarGroup) {
            this.tabbarGroup.addRedPoint(index);
        }
    };
    WelfareViewTab.prototype.removeRedPoint = function (index) {
        if (this.tabbarGroup) {
            this.tabbarGroup.removeRedPoint(index);
        }
    };
    /**
     * 切换页签
     */
    WelfareViewTab.prototype.refreshWhenSwitchBack = function () {
    };
    WelfareViewTab.prototype.dispose = function () {
        if (this.bottomBg) {
            this.removeChild(this.bottomBg);
            this.bottomBg.dispose();
            this.bottomBg = null;
        }
        _super.prototype.dispose.call(this);
    };
    return WelfareViewTab;
}(BaseLoadDisplayObjectContiner));
__reflect(WelfareViewTab.prototype, "WelfareViewTab");
//# sourceMappingURL=WelfareViewTab.js.map