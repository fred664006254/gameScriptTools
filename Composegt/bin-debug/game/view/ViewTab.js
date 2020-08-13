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
var ViewTab = (function (_super) {
    __extends(ViewTab, _super);
    function ViewTab(param) {
        var _this = _super.call(this) || this;
        // 保存tabview数据
        _this.tabViewData = {};
        // 当前选中的页签
        _this._selectedTabIndex = 0;
        // 上次选中的页签
        _this._lastSelectedTabIndex = null;
        _this.param = param;
        return _this;
    }
    ViewTab.prototype.init = function () {
    };
    ViewTab.prototype.getTabbarTextArr = function () {
        return [];
    };
    // 页签图名称
    ViewTab.prototype.getTabbarName = function () {
        return ButtonConst.BTN_TAB;
    };
    ViewTab.prototype.initTabbarGroup = function () {
        var tabBarTextArr = this.getTabbarTextArr();
        if (tabBarTextArr && tabBarTextArr.length > 0) {
            this.tabbarGroup = ComponentManager.getTabBarGroup(this.getTabbarName(), tabBarTextArr, this.clickTabbarHandler, this);
            var tabBarX = (this instanceof PopupView) ? 30 : 15;
            this.addChild(this.tabbarGroup);
            this.setTabBarPosition();
            this.tabbarGroup.selectedIndex = this._selectedTabIndex;
            // this.changeTab();
        }
    };
    ViewTab.prototype.setTabBarPosition = function () {
    };
    ViewTab.prototype.getTabbarGroupY = function () {
        return 0;
    };
    ViewTab.prototype.clickTabbarHandler = function (data) {
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
    ViewTab.prototype.checkTabCondition = function (index) {
        return true;
    };
    Object.defineProperty(ViewTab.prototype, "selectedTabIndex", {
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
    Object.defineProperty(ViewTab.prototype, "lastSelectedTabIndex", {
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
    ViewTab.prototype.changeTab = function () {
        var tabveiwClass = egret.getDefinitionByName(this.getClassName() + "Tab" + (this.selectedTabIndex + 1));
        if (tabveiwClass) {
            var commViewTab = this.tabViewData[this.selectedTabIndex];
            if (commViewTab) {
                this.addChild(commViewTab);
                commViewTab.refreshWhenSwitchBack();
            }
            else {
                var tabView = new tabveiwClass(this.param);
                tabView.setPosition(this.x, this.y + this.getTabbarGroupY());
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
    ViewTab.prototype.getSelectedTab = function () {
        if (this.tabViewData && this.tabViewData[this.selectedTabIndex]) {
            return this.tabViewData[this.selectedTabIndex];
        }
        return null;
    };
    /**检查是否为当前选中的页签 */
    ViewTab.prototype.checkSelectedTab = function (index) {
        if (index == this.selectedTabIndex) {
            return true;
        }
        return false;
    };
    /**
     * 切换页签
     */
    ViewTab.prototype.refreshWhenSwitchBack = function () {
    };
    ViewTab.prototype.addRedPoint = function (index) {
        if (this.tabbarGroup) {
            this.tabbarGroup.addRedPoint(index);
        }
    };
    ViewTab.prototype.removeRedPoint = function (index) {
        if (this.tabbarGroup) {
            this.tabbarGroup.removeRedPoint(index);
        }
    };
    ViewTab.prototype.getViewTitleButtomY = function () {
        var className = this.getClassName();
        className = this.getClassName().substring(0, className.indexOf("Tab"));
        var view = ViewController.getInstance().getView(className);
        return view["getTitleButtomY"]();
    };
    ViewTab.prototype.getParent = function () {
        return null;
    };
    ViewTab.prototype.getResourceList = function () {
        return [];
    };
    ViewTab.prototype.dispose = function () {
        this.param = null;
        _super.prototype.dispose.call(this);
    };
    return ViewTab;
}(BaseLoadDisplayObjectContiner));
__reflect(ViewTab.prototype, "ViewTab");
