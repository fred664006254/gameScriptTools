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
 * author 陈可
 * date 2017/9/15
 * @class BaseScene
 */
var BaseScene = (function (_super) {
    __extends(BaseScene, _super);
    function BaseScene() {
        var _this = _super.call(this) || this;
        _this._sceneLayer = null;
        _this._sceneBg = null;
        // 保存tabview数据
        _this.tabViewData = {};
        // 当前选中的页签
        _this._selectedTabIndex = 0;
        // 上次选中的页签
        _this._lastSelectedTabIndex = null;
        return _this;
    }
    BaseScene.prototype.init = function () {
        var bgName = this.getBgName();
        if (!this._sceneLayer) {
            this._sceneLayer = new BaseDisplayObjectContainer();
        }
        if (!this._sceneBg) {
            var useBaseBg = false;
            if (!ResMgr.hasRes(bgName)) {
                bgName = "public_ab_scenebg";
                useBaseBg = true;
            }
            this._sceneBg = BaseBitmap.create(bgName);
            if (useBaseBg) {
                this._sceneBg.width = GameConfig.stageWidth;
                this._sceneBg.height = GameConfig.stageHeigth;
            }
            this._sceneLayer.addChild(this._sceneBg);
        }
        this.addChild(this._sceneLayer);
        this.refreshAfterShow(true);
        this.initTabbarGroup();
        var tabArr = this.getTabbarTextArr();
        if (tabArr && tabArr.length > 0) {
            this.changeTab();
        }
        this.tick();
    };
    // 初始化tabbarGroup
    BaseScene.prototype.initTabbarGroup = function () {
        var tabBarTextArr = this.getTabbarTextArr();
        if (tabBarTextArr && tabBarTextArr.length > 0) {
            this.tabbarGroup = ComponentMgr.getTabBarGroup(this.getTabbarName(), tabBarTextArr, this.clickTabbarHandler, this);
            var tabBarX = (this instanceof PopupView) ? 30 : 15;
            this.addChild(this.tabbarGroup);
            this.setTabBarPosition();
            this.tabbarGroup.selectedIndex = this._selectedTabIndex;
        }
    };
    BaseScene.prototype.setTabBarPosition = function () {
    };
    BaseScene.prototype.clickTabbarHandler = function (data) {
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
    BaseScene.prototype.checkTabCondition = function (index) {
        //暂时将皮肤页面置灰
        if (index == 1)
            return false;
        else
            return true;
    };
    BaseScene.prototype.getTabbarTextArr = function () {
        return [];
    };
    // 页签图名称
    BaseScene.prototype.getTabbarName = function () {
        return ButtonConst.BTN_TAB;
    };
    BaseScene.prototype.getBgName = function () {
        var thisClassName = this.getClassName();
        return thisClassName.toLowerCase() + "bg";
    };
    BaseScene.prototype.playBg = function () {
        var bgName = this.getSoundBgName();
        if (RES.hasRes(bgName)) {
            SoundMgr.playBg(bgName);
        }
    };
    BaseScene.prototype.getSoundBgName = function () {
        var className = this.getClassName().toLowerCase();
        className = className.substring(0, className.indexOf("scene"));
        return "music_" + className;
    };
    BaseScene.prototype.refreshMode = function (event) {
        var npcName = event.data;
    };
    BaseScene.prototype.tick = function () {
    };
    BaseScene.prototype.getResourceList = function () {
        var resArr = [];
        var thisClassName = egret.getQualifiedClassName(this);
        thisClassName = thisClassName.toLowerCase();
        if (ResMgr.hasRes(thisClassName)) {
            resArr.push(thisClassName);
        }
        return resArr;
    };
    BaseScene.prototype.getParent = function () {
        return LayerMgr.bgLayer;
    };
    BaseScene.prototype.show = function (params) {
        this.param = params;
        if (this.isShow()) {
            if (!this.parent) {
                this.getParent().addChild(this);
            }
            this.refreshAfterShow();
        }
        else {
            _super.prototype.show.call(this, params);
        }
    };
    BaseScene.prototype.hide = function (isDispose) {
        if (isDispose) {
            _super.prototype.hide.call(this);
        }
        else {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }
    };
    BaseScene.prototype.refreshAfterShow = function (bool) {
        if (bool === void 0) { bool = false; }
        App.MsgHelper.dispEvt(MsgConst.HIDE_LAST_SCENE, { sceneId: this.getClassName() });
        this.playBg();
        if (ViewController.getInstance().checkHasShowedView()) {
            return;
        }
    };
    Object.defineProperty(BaseScene.prototype, "selectedTabIndex", {
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
    Object.defineProperty(BaseScene.prototype, "lastSelectedTabIndex", {
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
    BaseScene.prototype.changeTab = function (name) {
        if (!name) {
            name = this.getClassName();
        }
        var tabveiwClass = egret.getDefinitionByName(name + "Tab" + (this.selectedTabIndex + 1));
        if (tabveiwClass) {
            var commViewTab = this.tabViewData[this.selectedTabIndex];
            if (commViewTab) {
                this.addChild(commViewTab);
                commViewTab.refreshWhenSwitchBack();
            }
            else {
                var tabView = new tabveiwClass();
                this.tabViewData[this.selectedTabIndex] = tabView;
                // tabView["param"]=this.param;
                var pos = this.getTabPos();
                tabView.setPosition(pos.x, pos.y);
                this.addChild(tabView);
            }
            if (this.lastSelectedTabIndex != null && this.tabViewData[this.lastSelectedTabIndex]) {
                this.removeChild(this.tabViewData[this.lastSelectedTabIndex]);
            }
        }
    };
    BaseScene.prototype.getMsgConstEventArr = function () {
        return [
            MsgConst.REFRESH_MODEl
        ];
    };
    BaseScene.prototype.msgEventCallBack = function (evt) {
        var view = this;
        switch (evt.type) {
            case MsgConst.REFRESH_MODEl:
                view.refreshMode(evt);
                break;
        }
    };
    BaseScene.prototype.getTabPos = function () {
        return {
            x: 0,
            y: 0
        };
    };
    BaseScene.prototype.dispose = function () {
        var view = this;
        view._sceneLayer = null;
        view._sceneBg = null;
        var thisClassName = egret.getQualifiedClassName(view);
        thisClassName = thisClassName.toLowerCase();
        this.param = null;
        view.tabbarGroup && view.tabbarGroup.dispose();
        view.tabbarGroup = null;
        view.tabViewData = {};
        view._selectedTabIndex = -1;
        view._lastSelectedTabIndex = -1;
        _super.prototype.dispose.call(this);
    };
    return BaseScene;
}(BaseLoadDisplayObjectContiner));
__reflect(BaseScene.prototype, "BaseScene");
//# sourceMappingURL=BaseScene.js.map