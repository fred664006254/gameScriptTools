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
 * date 2017/9/11
 * @class BaseView
 */
var BaseView = (function (_super) {
    __extends(BaseView, _super);
    function BaseView() {
        var _this = _super.call(this) || this;
        // 保存tabview数据
        _this.tabViewData = {};
        // 当前选中的页签
        _this._selectedTabIndex = 0;
        // 上次选中的页签
        _this._lastSelectedTabIndex = null;
        _this._needStopEffectList = [];
        return _this;
    }
    BaseView.prototype.init = function () {
        this.initMask();
        this.initBg();
        this.initTitle();
        this.initContainer();
        this.initViewBg();
        this.initTabbarGroup();
        this.initCloseBtn();
        this.initView();
        this.initBorder();
        var tabArr = this.getTabbarTextArr();
        if (tabArr && tabArr.length > 0) {
            var l = tabArr.length;
            for (var i = 0; i < l; i++) {
                if (this.selectedTabIndex > 0) {
                    // this.selectedTabIndex = i;
                    // this.tabbarGroup.selectedIndex=this.selectedTabIndex;
                    this.changeTab();
                    break;
                }
                else if (this.checkTabCondition(i)) {
                    // // 重新checkTabCondition方法处理	
                    // if(this.selectedTabIndex>1)
                    // {
                    // 	this.selectedTabIndex = i;
                    // 	this.tabbarGroup.selectedIndex=this.selectedTabIndex;
                    // 	this.changeTab();
                    // 	break;
                    // }
                    this.selectedTabIndex = i;
                    this.tabbarGroup.selectedIndex = this.selectedTabIndex;
                    this.changeTab();
                    break;
                }
            }
        }
        if (this["checkGuide"] && (this["checkGuide"] instanceof Function)) {
            this["checkGuide"]();
        }
        this.playBg();
        /*******以下为居中处理，因为所有view包含mask后都是全屏，使用绝对锚点处理，如有问题不要在子类处理，需要在此处处理 */
        // this.anchorOffsetX=GameConfig.stageWidth*0.5;
        // this.anchorOffsetY=GameConfig.stageHeigth*0.5;
        // this.x=this.anchorOffsetX;
        // this.y=this.anchorOffsetY;
        //**********以上为居中处理 */
        Api.rookieVoApi.showRookieView();
        if (this.isShowOpenAni() && !Api.rookieVoApi.isInGuiding && Api.switchVoApi.checkOpenViewOpenAni()) {
            if (egret.is(this, "PopupView")) {
                //打开特效
                this.alpha = 0;
                this.scaleX = 0.5;
                this.scaleY = 0.5;
                this.anchorOffsetX = GameConfig.stageWidth / 2;
                this.anchorOffsetY = GameConfig.stageHeigth / 2;
                this.x = GameConfig.stageWidth / 2;
                this.y = GameConfig.stageHeigth / 2;
                if (this._maskBmp) {
                    this._maskBmp.setScale(2);
                    this._maskBmp.x = -GameConfig.stageWidth / 2;
                    this._maskBmp.y = -GameConfig.stageHeigth / 2;
                }
                egret.Tween.get(this, { loop: false }).to({ scaleX: 1.1, scaleY: 1.1, alpha: 1 }, 200).to({ scaleX: 1, scaleY: 1 }, 100)
                    .call(function () {
                    this.alpha = 1;
                    this.anchorOffsetX = 0;
                    this.anchorOffsetY = 0;
                    this.x = 0;
                    this.y = 0;
                    this.scaleX = 1;
                    this.scaleY = 1;
                    egret.Tween.removeTweens(this);
                    if (this._maskBmp) {
                        this._maskBmp.setScale(1);
                        this._maskBmp.x = 0;
                        this._maskBmp.y = 0;
                    }
                }, this);
            }
            else {
                this.alpha = 0;
                this.scaleX = 1.1;
                this.scaleY = 1.1;
                this.anchorOffsetX = GameConfig.stageWidth / 2;
                this.anchorOffsetY = GameConfig.stageHeigth / 2;
                this.x = GameConfig.stageWidth / 2;
                this.y = GameConfig.stageHeigth / 2;
                egret.Tween.get(this, { loop: false }).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 200)
                    .call(function () {
                    this.alpha = 1;
                    this.anchorOffsetX = 0;
                    this.anchorOffsetY = 0;
                    this.x = 0;
                    this.y = 0;
                    this.scaleX = 1;
                    this.scaleY = 1;
                    egret.Tween.removeTweens(this);
                    // this._maskBmp.setScale(1);
                    // this._maskBmp.x = 0;
                    // this._maskBmp.y = 0;
                }, this);
            }
        }
        if (App.DeviceUtil.isWXgame() && Api.switchVoApi.checkOpenFeedBack()) {
            PlatformManager.feedbackButtonToggle("hide");
        }
    };
    BaseView.prototype.playBg = function () {
        if (this.isShow()) {
            var soundBgName = this.getSoundBgName();
            if (RES.hasRes(soundBgName)) {
                SoundManager.playBg(soundBgName);
                var className = this.getClassName();
                var idx = BaseView._recodeSoundBgList.indexOf(className);
                if (idx < 0) {
                    BaseView._recodeSoundBgList.push(className);
                }
                else {
                    BaseView._recodeSoundBgList = BaseView._recodeSoundBgList.concat(BaseView._recodeSoundBgList.splice(idx, 1));
                }
            }
        }
    };
    BaseView.prototype.stopBg = function () {
        if (this.isShow()) {
            var soundBgName = this.getSoundBgName();
            if (RES.hasRes(soundBgName)) {
                var checkStopSoundBg = this.checkStopSoundBg();
                if (checkStopSoundBg) {
                    SoundManager.stopBgByName(soundBgName);
                }
                var className = this.getClassName();
                var idx = BaseView._recodeSoundBgList.indexOf(className);
                if (idx > -1) {
                    BaseView._recodeSoundBgList.splice(idx, 1);
                }
                if (checkStopSoundBg) {
                    if (BaseView._recodeSoundBgList.length > 0) {
                        var view = ViewController.getInstance().getView(BaseView._recodeSoundBgList[BaseView._recodeSoundBgList.length - 1]);
                        view.playBg();
                    }
                    else {
                        SceneController.getInstance().playBg();
                    }
                }
            }
        }
    };
    BaseView.prototype.checkStopSoundBg = function () {
        var showedViewList = ViewController.getInstance().getShowedView();
        var soundBgNum = 0;
        var i = 0;
        var l = showedViewList.length;
        var soundBgName = this.getSoundBgName();
        for (i = 0; i < l; i++) {
            if (soundBgName == showedViewList[i]["getSoundBgName"]()) {
                soundBgNum++;
                if (soundBgNum > 1) {
                    return false;
                }
            }
        }
        return true;
    };
    BaseView.prototype.getSoundBgName = function () {
        var className = this.getClassName().toLowerCase();
        className = className.substring(0, className.indexOf("view"));
        return "music_" + className;
    };
    BaseView.prototype.getResourceList = function () {
        // let soundBgName:string=this.getSoundBgName();
        var resArr = [];
        var textArr = this.getTabbarTextArr();
        // if(textArr&&textArr.length>0)
        // {
        // resArr.push("commonview_biaoqianbg01");
        // resArr.push("commonview_biaoqianbg02");
        resArr.push("commonview_biaoqianbg03");
        resArr.push("commonview_biaoqianbg04");
        if (textArr.length > 0) {
            resArr.push("popupview_bg3");
            resArr.push("popupview_bg5");
        }
        if (this.getBorderName()) {
            resArr.push("commonview_border1");
            resArr.push("commonview_bottom");
        }
        // }
        // if(RES.hasRes(soundBgName))
        // {
        // 	resArr.push(soundBgName);
        // }
        return resArr;
    };
    ;
    BaseView.prototype.initViewBg = function () {
    };
    BaseView.prototype.getTitleButtomY = function () {
        var buttomY = 0;
        if (this.tabbarGroup) {
            buttomY = this.tabbarGroup.y + this.tabbarGroup.height;
        }
        else {
            if (this.titleBg) {
                buttomY = this.titleBg.y + this.titleBg.height;
            }
            else {
                if (this.titleTF) {
                    buttomY = this.titleTF.y + this.titleTF.height;
                }
            }
        }
        return buttomY;
    };
    BaseView.prototype.getTabbarTextArr = function () {
        return [];
    };
    // 页签图名称
    BaseView.prototype.getTabbarName = function () {
        return ButtonConst.BTN_TAB;
    };
    // 初始化tabbarGroup
    BaseView.prototype.initTabbarGroup = function () {
        var tabBarTextArr = this.getTabbarTextArr();
        if (tabBarTextArr && tabBarTextArr.length > 0) {
            // if(GameData.isUseNewUI)
            // {
            // let tabbarBg1:BaseBitmap=BaseBitmap.create("commonview_biaoqianbg01");
            // // tabbarBg1.setPosition(0,this.getTitleButtomY());
            // tabbarBg1.x = -15;
            // // this.addChild(tabbarBg1);
            // let tabbarBg:BaseBitmap=BaseBitmap.create("commonview_biaoqianbg02");
            // tabbarBg.x = -15;
            // // tabbarBg.setPosition(0,this.getTitleButtomY());
            // this.addChild(tabbarBg);
            // }
            // if(egret.is(this,"PopupView"))
            // {
            // 	let tabBg = BaseBitmap.create("popupview_bg3");
            // 	let tabLine = BaseBitmap.create("popupview_bg5");
            // 	tabLine.width = tabBg.width;
            // 	tabLine.x = tabBg.x ;
            // 	tabLine.y = tabBg.y + tabBg.height;
            // 	// this.addChild(tabBg);
            // 	// this.addChild(tabLine);
            // }
            if (this.getTabbarName() == ButtonConst.BTN_WINTAB) {
                this.tabbarBg = BaseBitmap.create("popupview_bg3");
                this.tabbarBg.x = GameConfig.stageWidth / 2 - this.tabbarBg.width / 2;
                this.tabbarBg.y = this.viewBg.y + 170;
                this.tabbarBgLine = BaseBitmap.create("popupview_bg5");
                this.tabbarBgLine.width = this.tabbarBg.width;
                this.tabbarBgLine.x = this.tabbarBg.x;
                this.tabbarBgLine.y = this.tabbarBg.y + 69 - this.tabbarBgLine.height;
                this.addChild(this.tabbarBg);
                this.addChild(this.tabbarBgLine);
            }
            this.tabbarGroup = ComponentManager.getTabBarGroup(this.getTabbarName(), tabBarTextArr, this.clickTabbarHandler, this);
            var tabBarX = (this instanceof PopupView) ? 30 : 15;
            if (this.getTabbarName() == ButtonConst.BTN_TAB) {
                this.tabbarGroup.setSpace(-12.5);
                // this.tabbarGroup.x = 
            }
            this.addChild(this.tabbarGroup);
            this.setTabBarPosition();
            this.container.y = this.getTitleButtomY();
            this.tabbarGroup.selectedIndex = this._selectedTabIndex;
            // this.tabbarGroup.addChildAt(tabbarBg,0);
            // this.tabbarGroup.addChildAt(tabbarBg1,0);
            // this.changeTab();
        }
    };
    BaseView.prototype.setTabBarPosition = function () {
        if (this.tabbarGroup) {
            var tabX = 0;
            var tabY = 0;
            if (egret.is(this, "PopupView")) {
                if (this.tabbarBg) {
                    tabX = this.tabbarBg.x + 10;
                    tabY = this.tabbarBgLine.y - this.tabbarGroup.height;
                }
                else {
                    tabX = this.viewBg.x + 30;
                    // tabY=this.viewBg.y+60;
                    tabY = this.viewBg.y + 75;
                }
            }
            else {
                // tabX=15;
                tabX = 22;
                // if(GameData.isUseNewUI)
                // {
                tabY = this.titleBg ? this.titleBg.y + this.titleBg.height : 92;
                if (this.tabbarBg) {
                    // tabX = this.tabbarBg.x + 10;
                    tabX = this.tabbarBg.x + 10;
                    tabY = this.tabbarBgLine.y - this.tabbarGroup.height;
                }
                // }
                // else
                // {
                // 	tabY=this.titleBg?this.titleBg.y+this.titleBg.height+8:100;
                // }
            }
            tabX += this.getTabbarGroupX();
            tabY += this.getTabbarGroupY();
            this.tabbarGroup.setPosition(tabX, tabY);
        }
    };
    BaseView.prototype.getTabbarGroupX = function () {
        return 0;
    };
    BaseView.prototype.getTabbarGroupY = function () {
        return 0;
    };
    BaseView.prototype.clickTabbarHandler = function (data) {
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
    BaseView.prototype.checkTabCondition = function (index) {
        return true;
    };
    BaseView.prototype.changeTab = function () {
        var tabveiwClass = egret.getDefinitionByName(this.getClassName() + "Tab" + (this.selectedTabIndex + 1));
        if (tabveiwClass) {
            var commViewTab = this.tabViewData[this.selectedTabIndex];
            if (commViewTab) {
                this.addChild(commViewTab);
                commViewTab.refreshWhenSwitchBack();
            }
            else {
                var tabView = new tabveiwClass(this.param);
                tabView.setPosition(this.container.x, this.container.y + this.getTabbarGroupY());
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
    BaseView.prototype.getSelectedTab = function () {
        if (this.tabViewData && this.tabViewData[this.selectedTabIndex]) {
            return this.tabViewData[this.selectedTabIndex];
        }
        return null;
    };
    /**检查是否为当前选中的页签 */
    BaseView.prototype.checkSelectedTab = function (index) {
        if (index == this.selectedTabIndex) {
            return true;
        }
        return false;
    };
    BaseView.prototype.addRedPoint = function (index) {
        if (this.tabbarGroup) {
            this.tabbarGroup.addRedPoint(index);
        }
    };
    BaseView.prototype.removeRedPoint = function (index) {
        if (this.tabbarGroup) {
            this.tabbarGroup.removeRedPoint(index);
        }
    };
    BaseView.prototype.getBgName = function () {
        return this.getClassName().toLowerCase() + "bg";
    };
    // 标题背景名称
    BaseView.prototype.getTitleBgName = function () {
        return this.getClassName().toLowerCase() + "titlebg";
    };
    // 关闭按钮图标名称
    BaseView.prototype.getCloseBtnName = function () {
        return this.getClassName().toLowerCase() + "closebtn";
    };
    BaseView.prototype.getBorderName = function () {
        return null;
    };
    // 初始化背景
    BaseView.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            if (bgName == "public_rule_bg") {
                this.viewBg = App.CommonUtil.getContainerByLeftHalfRes(bgName);
            }
            else {
                this.viewBg = BaseBitmap.create(bgName);
            }
            if (bgName == "commonview_bg1" && (this.viewBg instanceof BaseBitmap)) {
                this.viewBg.fillMode = egret.BitmapFillMode.REPEAT;
            }
            if (this.isTouchMaskClose()) {
                this.viewBg.touchEnabled = true;
            }
            this.addChild(this.viewBg);
            if (bgName == "popupview_bg2") {
                this.viewBg.width = this.getShowWidth();
            }
            else if (bgName == "public_rule_bg") { }
            else {
                this.viewBg.width = GameConfig.stageWidth;
                this.viewBg.height = GameConfig.stageHeigth;
            }
        }
    };
    BaseView.prototype.isTouchMaskClose = function () {
        return false;
    };
    BaseView.prototype.initMask = function () {
        if (!this.isShowMask()) {
            return;
        }
        this._maskBmp = BaseBitmap.create("public_9_viewmask");
        this._maskBmp.width = GameConfig.stageWidth;
        this._maskBmp.height = GameConfig.stageHeigth;
        this._maskBmp.touchEnabled = true;
        this.addChild(this._maskBmp);
        if (this.isTouchMaskClose()) {
            this._maskBmp.addTouchTap(this.hide, this);
        }
    };
    // 子类中添加显示对象到container中
    BaseView.prototype.addChildToContainer = function (obj) {
        if (obj) {
            this.container.addChild(obj);
        }
    };
    // 子类中从container中移除显示对象
    BaseView.prototype.removeChildFromContainer = function (obj) {
        if (obj) {
            this.container.removeChild(obj);
        }
    };
    BaseView.prototype.show = function (data) {
        if (this.isShow()) {
            return;
        }
        Api.rookieVoApi.hiddenRookieView();
        if (BaseView._showLogList.length > 20) {
            BaseView._showLogList.shift();
        }
        // if(DEBUG)
        // {
        // 	App.LogUtil.show("showLog:"+this.getClassName());
        // }
        App.LogUtil.log("showLog:" + this.getClassName());
        BaseView._showLogList.push(this.getClassName());
        this.param = data;
        if (data && data.tab) {
            this.selectedTabIndex = Number(data.tab.indexOf("-") ? data.tab.split("-")[0] : data.tab);
        }
        _super.prototype.show.call(this);
    };
    BaseView.prototype.closeHandler = function () {
        this.hide();
    };
    BaseView.prototype.hide = function () {
        var _this = this;
        if (this.isShow()) {
            var checkStopSoundBg = this.checkStopSoundBg();
            if (this.isShowOpenAni() && !Api.rookieVoApi.isInGuiding && Api.switchVoApi.checkOpenViewOpenAni()) {
                if (egret.is(this, "PopupView")) {
                    //关闭特效
                    if (this._maskBmp) {
                        this._maskBmp.setScale(2);
                        this._maskBmp.x = -GameConfig.stageWidth / 2;
                        this._maskBmp.y = -GameConfig.stageHeigth / 2;
                    }
                    this.anchorOffsetX = GameConfig.stageWidth / 2;
                    this.anchorOffsetY = GameConfig.stageHeigth / 2;
                    this.x = GameConfig.stageWidth / 2;
                    this.y = GameConfig.stageHeigth / 2;
                    egret.Tween.get(this, { loop: false }).to({ scaleX: 0.5, scaleY: 0.5, alpha: 0 }, 200)
                        .call(function () {
                        egret.Tween.removeTweens(_this);
                        _this.alpha = 1;
                        _this.anchorOffsetX = 0;
                        _this.anchorOffsetY = 0;
                        _this.x = 0;
                        _this.y = 0;
                        _this.scaleX = 1;
                        _this.scaleY = 1;
                        _super.prototype.hide.call(_this);
                    }, this);
                }
                else {
                    this.anchorOffsetX = GameConfig.stageWidth / 2;
                    this.anchorOffsetY = GameConfig.stageHeigth / 2;
                    this.x = GameConfig.stageWidth / 2;
                    this.y = GameConfig.stageHeigth / 2;
                    egret.Tween.get(this, { loop: false }).to({ scaleX: 1.1, scaleY: 1.1, alpha: 0 }, 200)
                        .call(function () {
                        egret.Tween.removeTweens(_this);
                        _this.alpha = 1;
                        _this.anchorOffsetX = 0;
                        _this.anchorOffsetY = 0;
                        _this.x = 0;
                        _this.y = 0;
                        _this.scaleX = 1;
                        _this.scaleY = 1;
                        _super.prototype.hide.call(_this);
                    }, this);
                }
            }
            else {
                _super.prototype.hide.call(this);
            }
            // super.hide();
            if (checkStopSoundBg) {
                SoundManager.resumeBg();
            }
        }
    };
    // 初始化标题
    BaseView.prototype.initTitle = function () {
        var titleBgName = this.getTitleBgName();
        if (titleBgName) {
            var bgName = this.getBgName();
            this.titleBg = BaseBitmap.create(titleBgName);
            this.titleBg.name = "titleBg";
            this.titleBg.x = GameConfig.stageWidth / 2 - this.titleBg.width / 2;
            this.addChild(this.titleBg);
            if (bgName == "popupview_bg2") {
                this.titleBg.y = this.viewBg.y - this.titleBg.height / 2;
            }
            else if (bgName == "public_rule_bg") {
                this.titleBg.y = this.viewBg.y - this.titleBg.height;
            }
            else {
                this.titleBg.y = 0;
            }
        }
        if (this.getTitleStr()) {
            this.titleTF = new BaseTextField();
            this.titleTF.text = LanguageManager.getlocal(this.getTitleStr(), this.getTitleParams());
            this.titleTF.size = 28;
            this.titleTF.x = this.width / 2 - this.titleTF.width / 2;
            // if(GameData.isUseNewUI)
            // {
            // this.titleTF.setColor(TextFieldConst.COLOR_WARN_YELLOW);
            this.titleTF.setColor(TextFieldConst.COLOR_TITLE_NAME);
            // }
            // else
            // {
            // 	this.titleTF.setColor(TextFieldConst.COLOR_BLACK);
            // }
            // if(PlatformManager.checkIsKRSp())
            // {
            // }
            this.addChild(this.titleTF);
            if (this.titleBg) {
                // if(GameData.isUseNewUI)
                // {
                this.titleTF.y = 18;
                // }
                // else
                // {
                // 	this.titleTF.y = this.titleBg.y + this.titleBg.height/2 - this.titleTF.height/2 + 21;
                // }
            }
            else {
                this.titleTF.y = 10;
            }
        }
    };
    // 初始化自定义容器
    BaseView.prototype.initContainer = function () {
        this.container = new BaseDisplayObjectContainer();
        var tmpIdx = this.getChildIndex(this.getChildByName("titleBg"));
        this.addChildAt(this.container, tmpIdx);
        if (this.getTitleBgName() == "commonview_titlebg" && this.titleBg) {
            this.container.x = 0;
            this.container.y = this.titleBg.height + 15 + this.getContainerY();
        }
        else {
            this.container.y = this.getContainerY();
        }
    };
    // 初始化关闭按钮
    BaseView.prototype.initCloseBtn = function () {
        if (this.getCloseBtnName()) {
            this.closeBtn = ComponentManager.getButton(this.getCloseBtnName(), "", this.closeHandler, this);
            this.addChild(this.closeBtn);
            if (this.getBgName() == "popupview_bg2" || this.getBgName() == "public_rule_bg") {
                this.closeBtn.x = PlatformManager.hasSpcialCloseBtn() ? 0 : (this.viewBg.width - this.closeBtn.width + 20);
                this.closeBtn.y = this.viewBg.y - 20;
            }
            else {
                this.closeBtn.x = PlatformManager.hasSpcialCloseBtn() ? 0 : (GameConfig.stageWidth - this.closeBtn.width);
                this.closeBtn.y = 0;
            }
        }
    };
    BaseView.prototype.initBorder = function () {
        if (this.getBorderName()) {
            if (this.getBorderName() == "commonview_border1") {
                var border = BaseBitmap.create("commonview_border1");
                var bottom = BaseBitmap.create("commonview_bottom");
                border.width = GameConfig.stageWidth;
                border.height = GameConfig.stageHeigth - 69;
                border.x = 0;
                border.y = GameConfig.stageHeigth - border.height;
                this.addChild(border);
                bottom.x = 0;
                bottom.y = GameConfig.stageHeigth - bottom.height;
                this.addChild(bottom);
            }
        }
    };
    BaseView.prototype.preInit = function () {
        _super.prototype.preInit.call(this);
    };
    Object.defineProperty(BaseView.prototype, "selectedTabIndex", {
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
    Object.defineProperty(BaseView.prototype, "lastSelectedTabIndex", {
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
    // 标题内容,规则：面板类名+Title
    // 比如：PlayerView是用户信息面板，该面板的标题格式为：playerViewTitle,注意首字母要小写
    BaseView.prototype.getTitleStr = function () {
        return App.StringUtil.firstCharToLower(this.getClassName()) + "Title";
    };
    BaseView.prototype.getTitleParams = function () {
        return null;
    };
    BaseView.prototype.getParent = function () {
        return LayerManager.panelLayer;
    };
    // 弹框面板宽度，高度动态计算
    BaseView.prototype.getShowWidth = function () {
        // return 618;
        return 630;
    };
    // 弹框面板高度，重新该方法后，不会动态计算高度
    BaseView.prototype.getShowHeight = function () {
        return 0;
    };
    // 获取container初始y坐标 		
    BaseView.prototype.getContainerY = function () {
        if (this.getBgName() == "popupview_bg2") {
            return 65;
        }
        return 0;
    };
    BaseView.prototype.isShowMask = function () {
        return true;
    };
    BaseView.prototype.playEffect = function (effectName, isStopWhenClose) {
        if (isStopWhenClose) {
            if (this._needStopEffectList.indexOf(effectName) < 0) {
                this._needStopEffectList.push(effectName);
            }
        }
        SoundManager.playEffect(effectName);
    };
    BaseView.prototype.checkAndPushRes = function (resKey, arr) {
        if (resKey && RES.hasRes(resKey) && ResourceManager.checkResInGroupByKey(resKey, this.needCheckResGroup()) == false) {
            arr.push(resKey);
        }
    };
    BaseView.prototype.needCheckResGroup = function () {
        return "loginRes";
    };
    BaseView.prototype.dispose = function () {
        this.stopBg();
        if (this._needStopEffectList && this._needStopEffectList.length > 0) {
            var l = this._needStopEffectList.length;
            for (var i = l - 1; i >= 0; i--) {
                SoundManager.stopEffect(this._needStopEffectList.pop());
            }
        }
        if (this.tabbarGroup) {
            this.removeChild(this.tabbarGroup);
            this.tabbarGroup.dispose();
            this.tabbarGroup = null;
        }
        if (this.tabViewData) {
            for (var key in this.tabViewData) {
                var view = this.tabViewData[key];
                if (view) {
                    if (this.contains(view)) {
                        this.removeChild(view);
                    }
                    else if (this.container.contains(view)) {
                        this.removeChildFromContainer(view);
                    }
                    view.dispose();
                    view = null;
                }
            }
            this.tabViewData = {};
        }
        this._maskBmp = null;
        this.viewBg = null;
        this.titleBg = null;
        this.titleTF = null;
        this.closeBtn = null;
        this.container = null;
        this.alpha = 1;
        this.anchorOffsetX = 0;
        this.anchorOffsetY = 0;
        this.x = 0;
        this.y = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.tabbarBg = null;
        this.tabbarBgLine = null;
        ;
        this._selectedTabIndex = 0;
        this._lastSelectedTabIndex = null;
        _super.prototype.dispose.call(this);
    };
    BaseView._recodeSoundBgList = [];
    BaseView._showLogList = [];
    return BaseView;
}(BaseLoadDisplayObjectContiner));
__reflect(BaseView.prototype, "BaseView");
