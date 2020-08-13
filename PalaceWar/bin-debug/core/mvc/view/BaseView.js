var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * author 陈可
 * date 2017/9/11
 * @class BaseView
 */
var BaseView = /** @class */ (function (_super) {
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
        //大梁
        _this.peamBmp = null;
        //大框
        _this.bigframe = null;
        //使用队列
        _this._useQueue = false;
        return _this;
    }
    Object.defineProperty(BaseView.prototype, "uiType", {
        get: function () {
            return "";
        },
        enumerable: true,
        configurable: true
    });
    BaseView.prototype.init = function () {
        this.removeLoadingCount();
        this.initMask();
        this.initBg();
        this.initTitle();
        this.initContainer();
        this.initBigFrame();
        this.initBeam();
        this.initViewBg();
        this.initTabbarGroup();
        this.initCloseBtn();
        this.initRuleBtn();
        this.initView();
        this.initProbablyBtn();
        var tabArr = this.getTabbarTextArr();
        if (tabArr && tabArr.length > 0) {
            this.changeTab();
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
        //隐藏标题背景阴影
        this.hideTitleBgShadow();
        //弹窗动画
        this.playOpenViewEffect();
    };
    BaseView.prototype.initRuleBtn = function () {
        if (this.getRuleInfo()) {
            var ruleBtnName = this.getRuleBtnName();
            this._ruleBtn = ComponentManager.getButton(ruleBtnName, "", this.clickRuleBtnHandler, this);
            this._ruleBtn.x = 12 + (PlatformManager.hasSpcialCloseBtn() ? 80 : 0);
            this._ruleBtn.y = 22;
            if (ruleBtnName == ButtonConst.BTN2_RULE) {
                this._ruleBtn.y = 0;
            }
            this.addChild(this._ruleBtn);
        }
    };
    BaseView.prototype.initProbablyBtn = function () {
        if (Api.switchVoApi.checkOpenProbably() == true && this.getProbablyInfo()) {
            var probablyBtn = ComponentManager.getButton("btn_probably", "", this.clickProbablyBtnHandler, this);
            var posX = 12;
            if (PlatformManager.hasSpcialCloseBtn()) {
                posX += 80;
            }
            if (this._ruleBtn) {
                posX = this._ruleBtn.x + this._ruleBtn.width - 10;
            }
            probablyBtn.x = posX;
            probablyBtn.y = 22;
            this.addChild(probablyBtn);
        }
    };
    BaseView.prototype.getExtraRuleInfo = function () {
        return '';
    };
    BaseView.prototype.clickRuleBtnHandler = function (param) {
        var msg = '';
        var extra = this.getExtraRuleInfo();
        if (extra && extra !== '') {
            msg = extra;
        }
        else {
            var keyParam = this.getRuleInfoParam();
            msg = LanguageManager.getlocal(this.getRuleInfo(), keyParam);
        }
        ViewController.getInstance().openView(ViewConst.POPUP.RULEINFOPOPUPVIEW, msg);
    };
    BaseView.prototype.clickProbablyBtnHandler = function (param) {
        var keyParam = this.getProbablyInfoParam();
        var msg = LanguageManager.getlocal(this.getProbablyInfo(), keyParam);
        ViewController.getInstance().openView(ViewConst.POPUP.PROBABLYINFOPOPUPVIEW, msg);
    };
    BaseView.prototype.getRuleInfoParam = function () {
        return [];
    };
    BaseView.prototype.getProbablyInfoParam = function () {
        return [];
    };
    // 规则说明内容
    BaseView.prototype.getRuleInfo = function () {
        var ruleStr = this.getClassName().toLowerCase().replace("view", "") + "RuleInfo";
        if (LanguageManager.checkHasKey(ruleStr)) {
            return ruleStr;
        }
        else {
        }
        return "";
    };
    // 概率内容
    BaseView.prototype.getProbablyInfo = function () {
        var ruleStr = this.getClassName().toLowerCase().replace("view", "") + "ProbablyInfo";
        if (LanguageManager.checkHasKey(ruleStr)) {
            return ruleStr;
        }
        else {
        }
        return "";
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
        // if(RES.hasRes(soundBgName))
        // {
        // 	resArr.push(soundBgName);
        // }
        return resArr;
    };
    ;
    BaseView.prototype.checkAndPushRes = function (resKey, arr) {
        if (resKey && RES.hasRes(resKey) && ResourceManager.checkResInGroupByKey(resKey, this.needCheckResGroup()) == false) {
            arr.push(resKey);
        }
    };
    BaseView.prototype.needCheckResGroup = function () {
        return "loginRes";
    };
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
        if (this.peamBmp) {
            buttomY += 40;
        }
        return buttomY;
    };
    BaseView.prototype.getTabbarTextArr = function () {
        return [];
    };
    // 页签图名称
    BaseView.prototype.getTabbarName = function () {
        if (this.uiType == "2") {
            return ButtonConst.BTN2_TAB;
        }
        return ButtonConst.BTN_TAB;
    };
    // 初始化tabbarGroup
    BaseView.prototype.initTabbarGroup = function () {
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
            this.container.y = this.getTitleButtomY();
            if (this.uiType == "2") {
                this.tabbarGroup.setSpace(0);
                this.tabbarGroup.x += 5;
                this.tabbarGroup.setColor(0xe1ba86, 0x472c26);
                this.setBigFameY(0);
            }
            this.tabbarGroup.selectedIndex = this._selectedTabIndex;
            if (this.getTabbarName() == ButtonConst.BTN2_TAB || this.getTabbarName() == ButtonConst.BTN_BIG_TAB2) {
                this.tabbarGroup.addZshi();
            }
        }
    };
    BaseView.prototype.addTabbarGroupBg = function () {
        return false;
    };
    BaseView.prototype.setTabBarPosition = function () {
        if (this.tabbarGroup) {
            var tabX = 0;
            var tabY = 0;
            if (egret.is(this, "PopupView")) {
                tabX = this.viewBg.x + 30;
                tabY = this.viewBg.y + 60;
                if (this.getBgName() == "popupview_bg3") {
                    tabX = this.viewBg.x + 30 + 26.5;
                    tabY = this.viewBg.y + 70;
                }
            }
            else {
                tabX = 15;
                tabY = this.titleBg ? this.titleBg.y + this.titleBg.height + 8 : 100;
            }
            tabY += this.getTabbarGroupY();
            if (this.getTabbarName() == ButtonConst.BTN2_TAB || this.getTabbarName() == ButtonConst.BTN_BIG_TAB2) {
                tabY -= 16;
            }
            this.tabbarGroup.setPosition(tabX, tabY);
            if (this.tabbarGroupBg) {
                var tmpy = 0;
                if (this.getTabbarName() == ButtonConst.BTN2_TAB || this.getTabbarName() == ButtonConst.BTN_BIG_TAB2) {
                    tmpy = 8;
                }
                this.tabbarGroupBg.setPosition(this.viewBg.x + 10, this.tabbarGroup.y + tmpy);
            }
        }
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
        if (index == 1) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_ITEMVIEWTAB2);
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
                // this.param = null;
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
        return this.getClassName().toLowerCase() + "titlebg" + this.uiType;
    };
    // 是否隐藏标题背景阴影
    BaseView.prototype.isHideTitleBgShadow = function () {
        return false;
    };
    //是否展示弹窗动效
    BaseView.prototype.isShowOpenAni = function () {
        return true;
    };
    //显示弹窗动效
    BaseView.prototype.playOpenViewEffect = function () {
    };
    // 关闭按钮图标名称
    BaseView.prototype.getCloseBtnName = function () {
        return this.getClassName().toLowerCase() + "closebtn";
    };
    //规则按钮
    BaseView.prototype.getRuleBtnName = function () {
        return ButtonConst.BTN_RULE;
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
            if (bgName == "popupview_bg1") {
                this.viewBg.width = this.getShowWidth();
            }
            else if (bgName == "public_rule_bg") { }
            else {
                this.viewBg.width = GameConfig.stageWidth;
                this.viewBg.height = this.getStageHeight();
            }
        }
    };
    BaseView.prototype.getStageHeight = function () {
        return this.supportFullScreen() ? GameConfig.stageFullHeigth : GameConfig.stageHeigth;
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
        this._maskBmp.height = this.getStageHeight();
        this._maskBmp.touchEnabled = true;
        this.addChild(this._maskBmp);
        var tmpmask = null;
        if (!ResourceManager.getRes("public_9_viewmask")) {
            tmpmask = new BaseShape();
            tmpmask.graphics.beginFill(0, 0.6);
            tmpmask.graphics.drawRect(0, 0, GameConfig.stageWidth, this.getStageHeight());
            tmpmask.graphics.endFill;
            this.addChild(tmpmask);
        }
        if (this.isTouchMaskClose()) {
            this._maskBmp.addTouchTap(this.hide, this);
            if (tmpmask) {
                tmpmask.addTouchTap(this.hide, this);
            }
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
            this.switchToTop(data);
            return;
        }
        BaseView._showloadingCount++;
        App.LogUtil.log("view.showCount:", BaseView._showloadingCount);
        Api.rookieVoApi.hiddenRookieView();
        if (BaseView._showLogList.length > 50) {
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
    BaseView.prototype.removeLoadingCount = function () {
        BaseView._showloadingCount--;
        App.LogUtil.log("view.hideCount:", BaseView._showloadingCount);
        if (BaseView._showloadingCount == 0) {
            for (var key in BaseView._waitHideList) {
                var hideData = BaseView._waitHideList[key];
                if (hideData) {
                    hideData.hide.call(hideData.hideThisObj);
                    hideData.hide = null;
                    hideData.hideThisObj = null;
                    delete BaseView._waitHideList[key];
                    App.LogUtil.log(this.getClassName() + "初始化完成,关闭界面" + key);
                }
            }
        }
    };
    BaseView.prototype.closeHandler = function () {
        this.hide();
    };
    BaseView.prototype.hide = function () {
        if (this.isShow()) {
            if (!this.isInit()) {
                this.removeLoadingCount();
            }
            if (BaseView._showloadingCount > 0) {
                var thisName = this.getClassName();
                var hideData = BaseView._waitHideList[thisName];
                if (hideData == null) {
                    hideData = { hide: this.hide, hideThisObj: this };
                    BaseView._waitHideList[thisName] = hideData;
                    App.LogUtil.log(thisName, "等待关闭");
                    return;
                }
            }
            var checkStopSoundBg = this.checkStopSoundBg();
            var useQueue = this._useQueue;
            _super.prototype.hide.call(this);
            if (checkStopSoundBg) {
                SoundManager.resumeBg();
            }
            if (useQueue) {
                Api.viewqueueVoApi.checkWaitingView();
            }
            App.LogUtil.log("baseview checkWaitingShowInHome");
            Api.unlocklist2VoApi.checkWaitingShowInHome();
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
            if (bgName == "popupview_bg1") {
                this.titleBg.y = this.viewBg.y - this.titleBg.height / 2;
            }
            else if (bgName == "public_rule_bg") {
                this.titleBg.y = this.viewBg.y - this.titleBg.height;
            }
            else {
                this.titleBg.y = 0;
            }
        }
        var titlepic = this.getTitlePic();
        if (this.uiType == "2" && ResourceManager.hasRes(titlepic)) {
            this.titleBmp = BaseBitmap.create(titlepic);
            this.titleBmp.setPosition(this.width / 2 - this.titleBmp.width / 2, this.titleBg.y + this.titleBg.height - this.titleBmp.height);
            this.addChild(this.titleBmp);
        }
        else if (this.getTitleStr()) {
            this.titleTF = new BaseTextField();
            this.titleTF.text = LanguageManager.getlocal(this.getTitleStr(), this.getTitleParams());
            this.titleTF.name = "titleTF";
            if (PlatformManager.checkIsRuSp()) {
                this.titleTF.size = 16;
            }
            else if (PlatformManager.checkIsThSp()) {
                this.titleTF.fontFamily = TTFManager.TH_FONTNAME;
                this.titleTF.size = 20;
            }
            this.titleTF.x = this.width / 2 - this.titleTF.width / 2;
            if (this.uiType == "2") {
                this.titleTF.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
            }
            else {
                this.titleTF.setColor(TextFieldConst.COLOR_BLACK);
            }
            this.addChild(this.titleTF);
            if (this.titleBg) {
                this.titleTF.y = this.titleBg.y + this.titleBg.height / 2 - this.titleTF.height / 2 + 23.5;
            }
            else {
                this.titleTF.y = 10;
            }
        }
    };
    BaseView.prototype.initBigFrame = function () {
        if (this.getBigFrame()) {
            var posY = 0;
            if (this.titleBg) {
                posY = this.titleBg.y + this.titleBg.height;
            }
            var framebg = BaseBitmap.create(this.getBigFrame());
            // framebg.y = posY;
            framebg.height = GameConfig.stageHeigth - this.container.y;
            this.addChildToContainer(framebg);
            this.bigframe = framebg;
        }
    };
    BaseView.prototype.setBigFameHeight = function (h) {
        if (this.bigframe) {
            this.bigframe.height = h;
        }
    };
    BaseView.prototype.setBigFameY = function (y) {
        if (this.bigframe) {
            this.bigframe.y = y;
            this.bigframe.height = GameConfig.stageHeigth - this.container.y - y;
        }
    };
    // 1, 下面两个角， 2四个角
    BaseView.prototype.setBigFameCorner = function (type) {
        if (type === void 0) { type = 1; }
        if (this.bigframe) {
            var corner1 = BaseLoadBitmap.create("commonview_corner");
            corner1.y = this.bigframe.y + this.bigframe.height - 23;
            this.addChildToContainer(corner1);
            var corner2 = BaseLoadBitmap.create("commonview_corner");
            corner2.scaleX = -1;
            corner2.setPosition(this.bigframe.width, corner1.y);
            this.addChildToContainer(corner2);
            if (type == 2) {
                var corner3 = BaseLoadBitmap.create("commonview_corner");
                corner3.scaleY = -1;
                corner3.y = this.bigframe.y + 23;
                this.addChildToContainer(corner3);
                var corner4 = BaseLoadBitmap.create("commonview_corner");
                corner4.setScale(-1);
                corner4.setPosition(this.bigframe.width, corner3.y);
                this.addChildToContainer(corner4);
            }
        }
    };
    BaseView.prototype.initBeam = function () {
        if (this.getBeamName()) {
            var posY = 0;
            if (this.titleBg) {
                posY = this.titleBg.y + this.titleBg.height;
            }
            this.peamBmp = BaseBitmap.create(this.getBeamName());
            this.peamBmp.y = posY;
            this.addChild(this.peamBmp);
        }
    };
    // 初始化自定义容器
    BaseView.prototype.initContainer = function () {
        this.container = new BaseDisplayObjectContainer();
        var tmpIdx = this.getChildIndex(this.getChildByName("titleBg"));
        this.addChildAt(this.container, tmpIdx);
        if ((this.getTitleBgName() == "commonview_titlebg" || this.getTitleBgName() == "commonview_snowtitlebg") && this.titleBg) {
            this.container.x = 0;
            this.container.y = this.titleBg.height + 15 + this.getContainerY();
        }
        else if ((this.getTitleBgName() == "commonview_titlebg2") && this.titleBg) {
            this.container.y = this.titleBg.height + this.getContainerY();
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
            if (this.getBgName() == "popupview_bg1" || this.getBgName() == "public_rule_bg") {
                this.closeBtn.x = PlatformManager.hasSpcialCloseBtn() ? 20 : (this.viewBg.width - this.closeBtn.width + 20);
                this.closeBtn.y = this.viewBg.y - 20;
            }
            else {
                this.closeBtn.x = PlatformManager.hasSpcialCloseBtn() ? 20 : (GameConfig.stageWidth - this.closeBtn.width);
                this.closeBtn.y = 0;
            }
        }
    };
    BaseView.prototype.preInit = function () {
        _super.prototype.preInit.call(this);
        var getReportData = this.getReportTipData();
        if (getReportData && getReportData.title && getReportData.title.key && LanguageManager.checkHasKey(getReportData.title.key) &&
            getReportData.msg && getReportData.msg.key && LanguageManager.checkHasKey(getReportData.msg.key)) {
            var localkey = getReportData.title.key + getReportData.msg.key + Api.playerVoApi.getPlayerID();
            var lastTime = 0;
            var timeStr = LocalStorageManager.get(localkey);
            if (timeStr && timeStr != "") {
                lastTime = Number(timeStr);
            }
            if (!App.DateUtil.checkIsToday(lastTime)) {
                LocalStorageManager.set(localkey, String(GameData.serverTime));
                ViewController.getInstance().openView(ViewConst.BASE.ACCOMMONREPORTVIEW, {
                    title: LanguageManager.getlocal(getReportData.title.key, getReportData.title.param),
                    msg: LanguageManager.getlocal(getReportData.msg.key, getReportData.msg.param)
                });
            }
        }
    };
    /**
     * 如果要显示tip弹板重写此方法，可以加上条件检测，多次打开都会检测
     */
    BaseView.prototype.getReportTipData = function () {
        var preKey = this.getClassName().toLowerCase().replace("view", "");
        var titleKey = preKey + "ReportTipTitle";
        var msgKey = preKey + "ReportTipMsg";
        return { title: { key: titleKey }, msg: { key: msgKey } };
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
    BaseView.prototype.getTitlePic = function () {
        var cname = this.getClassName();
        return cname.toLowerCase() + "title";
    };
    /**
     * 大框
     */
    BaseView.prototype.getBigFrame = function () {
        return null;
    };
    /**
     * 房梁
     */
    BaseView.prototype.getBeamName = function () {
        return null;
    };
    BaseView.prototype.getTitleParams = function () {
        return null;
    };
    BaseView.prototype.getParent = function () {
        return LayerManager.panelLayer;
    };
    // 弹框面板宽度，高度动态计算
    BaseView.prototype.getShowWidth = function () {
        if (this.getBgName() == "popupview_bg3") {
            return 623;
        }
        return 570;
    };
    // 弹框面板高度，重新该方法后，不会动态计算高度
    BaseView.prototype.getShowHeight = function () {
        return 0;
    };
    // 获取container初始y坐标 		
    BaseView.prototype.getContainerY = function () {
        if (this.getBgName() == "popupview_bg1") {
            return 51;
        }
        else if (this.getBgName() == "popupview_bg3") {
            return 59.5;
        }
        return 0;
    };
    BaseView.prototype.supportFullScreen = function () {
        return false;
    };
    BaseView.prototype.isShowMask = function () {
        return true;
    };
    BaseView.prototype.hideTitleBgShadow = function () {
        if (this.titleBg && this.titleBgShadow && this.isHideTitleBgShadow()) {
            this.titleBgShadow.visible = false;
        }
    };
    BaseView.prototype.playEffect = function (effectName, isStopWhenClose) {
        if (isStopWhenClose) {
            if (this._needStopEffectList.indexOf(effectName) < 0) {
                this._needStopEffectList.push(effectName);
            }
        }
        SoundManager.playEffect(effectName);
    };
    BaseView.prototype.setUseQueue = function (v) {
        this._useQueue = v;
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
        if (this._ruleBtn) {
            this.removeChild(this._ruleBtn);
            this._ruleBtn.dispose();
            this._ruleBtn = null;
        }
        this._maskBmp = null;
        this.viewBg = null;
        this.titleBg = null;
        this.titleTF = null;
        this.closeBtn = null;
        this.container = null;
        this.titleBgShadow = null;
        this.titleBmp = null;
        this.tabbarGroupBg = null;
        this.peamBmp = null;
        this.bigframe = null;
        this._selectedTabIndex = 0;
        this._lastSelectedTabIndex = null;
        this._useQueue = false;
        _super.prototype.dispose.call(this);
    };
    BaseView._recodeSoundBgList = [];
    BaseView._showLogList = [];
    BaseView._waitHideList = {};
    /**
     * 正在加载的界面数量
     */
    BaseView._showloadingCount = 0;
    return BaseView;
}(BaseLoadDisplayObjectContiner));
//# sourceMappingURL=BaseView.js.map