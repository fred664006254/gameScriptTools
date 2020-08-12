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
        //大梁
        _this.peamBmp = null;
        //大框
        _this.bigframe = null;
        //使用队列
        _this._useQueue = false;
        return _this;
    }
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
        //隐藏标题背景阴影
        this.hideTitleBgShadow();
        //弹窗动画
        this.playOpenViewEffect();
    };
    BaseView.prototype.initRuleBtn = function () {
        if (this.getRuleInfo()) {
            this._ruleBtn = ComponentMgr.getButton("btn_rule", "", this.clickRuleBtnHandler, this);
            this._ruleBtn.x = 12 + (PlatMgr.hasSpcialCloseBtn() ? 80 : 0);
            this._ruleBtn.y = 22;
            this.addChild(this._ruleBtn);
        }
    };
    BaseView.prototype.initProbablyBtn = function () {
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
            msg = LangMger.getlocal(this.getRuleInfo(), keyParam);
        }
    };
    BaseView.prototype.clickProbablyBtnHandler = function (param) {
        var keyParam = this.getProbablyInfoParam();
        var msg = LangMger.getlocal(this.getProbablyInfo(), keyParam);
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
        if (LangMger.checkHasKey(ruleStr)) {
            return ruleStr;
        }
        else {
        }
        return "";
    };
    // 概率内容
    BaseView.prototype.getProbablyInfo = function () {
        var ruleStr = this.getClassName().toLowerCase().replace("view", "") + "ProbablyInfo";
        if (LangMger.checkHasKey(ruleStr)) {
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
                SoundMgr.playBg(soundBgName);
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
                    SoundMgr.stopBgByName(soundBgName);
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
        if (resKey && RES.hasRes(resKey) && ResMgr.checkResInGroupByKey(resKey, this.needCheckResGroup()) == false) {
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
            // if(this.titleBg)
            // {
            // 	buttomY=this.titleBg.y+this.titleBg.height;
            // }
            // else
            // {
            if (this.titleTF) {
                buttomY = this.titleTF.y + this.titleTF.height;
            }
            // }
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
            this.tabbarGroup = ComponentMgr.getTabBarGroup(this.getTabbarName(), tabBarTextArr, this.clickTabbarHandler, this);
            var tabBarX = (this instanceof PopupView) ? 30 : 15;
            this.addChild(this.tabbarGroup);
            this.setTabBarPosition();
            this.container.y = this.getTitleButtomY();
            this.tabbarGroup.selectedIndex = this._selectedTabIndex;
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
            }
            else {
                tabX = 15;
                // tabY=this.titleBg?this.titleBg.y+this.titleBg.height+8:100;
            }
            tabY += this.getTabbarGroupY();
            this.tabbarGroup.setPosition(tabX, tabY);
            if (this.tabbarGroupBg) {
                var tmpy = 0;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this.tabbarGroupBg, this.tabbarGroup, [0, tmpy]);
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
                this.setChildIndex(this.tabbarGroup, this.getChildIndex(commViewTab));
                commViewTab.refreshWhenSwitchBack();
            }
            else {
                var tabView = new tabveiwClass(this.param);
                tabView.setPosition(this.container.x, this.container.y + this.getTabbarGroupY());
                this.tabViewData[this.selectedTabIndex] = tabView;
                tabView["param"] = this.param;
                // this.addChildAt(tabView, this.getChildIndex(this.tabbarGroup));
                this.addChild(tabView);
                this.setChildIndex(this.tabbarGroup, this.getChildIndex(tabView));
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
        return this.getClassName().toLowerCase() + "titlebg";
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
    // 初始化背景
    BaseView.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            // 	if(bgName == "public_rule_bg")
            // 	{
            // 		this.viewBg = App.CommonUtil.getContainerByLeftHalfRes(bgName);
            // 	}
            // 	else
            // 	{
            this.viewBg = BaseBitmap.create(bgName);
            // }
            if (bgName == "commonview_bg1" && (this.viewBg instanceof BaseBitmap)) {
                this.viewBg.fillMode = egret.BitmapFillMode.REPEAT;
            }
            if (this.isTouchMaskClose()) {
                this.viewBg.touchEnabled = true;
            }
            this.addChild(this.viewBg);
            this.viewBg.width = GameConfig.stageWidth;
            this.viewBg.height = this.getStageHeight();
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
        if (!ResMgr.getRes("public_9_viewmask")) {
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
                SoundMgr.resumeBg();
            }
        }
    };
    // 初始化标题
    BaseView.prototype.initTitle = function () {
        // let titleBgName:string=this.getTitleBgName();
        // if(titleBgName)
        // {
        // 	let bgName:string=this.getBgName();
        // 	this.titleBg = BaseBitmap.create(titleBgName);
        // 	this.titleBg.name = "titleBg";
        // 	this.titleBg.x = GameConfig.stageWidth/2 - this.titleBg.width/2;
        // 	this.addChild(this.titleBg);
        // 	if(bgName == "popupview_bg1")
        // 	{
        // 		this.titleBg.y = this.viewBg.y - this.titleBg.height/2;
        // 	}
        // 	else if(bgName == "public_rule_bg")
        // 	{
        // 		this.titleBg.y = this.viewBg.y - this.titleBg.height;
        // 	}
        // 	else
        // 	{
        // 		this.titleBg.y = 0;
        // 	}
        // }
        var titlepic = this.getTitlePic();
        if (this.getTitleStr()) {
            this.titleTF = ComponentMgr.getTextField(this.getTitleStr(), TextFieldConst.SIZE_TITLE_COMMON, ColorEnums.white);
            this.titleTF.stroke = 2;
            this.titleTF.strokeColor = 0;
            if (PlatMgr.checkIsRuSp()) {
                this.titleTF.size = 16;
            }
            this.titleTF.x = this.width / 2 - this.titleTF.width / 2;
            this.addChild(this.titleTF);
            // if(this.titleBg)
            // {
            // 	this.titleTF.y = this.titleBg.y + this.titleBg.height/2 - this.titleTF.height/2 + 21;
            // }
            // else
            // {
            this.titleTF.y = 10;
            // }
        }
    };
    BaseView.prototype.initBigFrame = function () {
        if (this.getBigFrame()) {
            var posY = 0;
            // if (this.titleBg)
            // {
            // 	posY = this.titleBg.y + this.titleBg.height;
            // }
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
    };
    BaseView.prototype.initBeam = function () {
        if (this.getBeamName()) {
            var posY = 0;
            // if (this.titleBg)
            // {
            // 	posY = this.titleBg.y + this.titleBg.height;
            // }
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
        // if((this.getTitleBgName() == "commonview_titlebg"||this.getTitleBgName() == "commonview_snowtitlebg") && this.titleBg)
        // {
        // 	this.container.x = 0;
        // 	this.container.y = this.titleBg.height + 15 + this.getContainerY();
        // }
        // else
        // {
        this.container.y = this.getContainerY();
        // }
    };
    // 初始化关闭按钮
    BaseView.prototype.initCloseBtn = function () {
        if (this.getCloseBtnName()) {
            this.closeBtn = ComponentMgr.getButton(this.getCloseBtnName(), "", this.closeHandler, this);
            this.addChild(this.closeBtn);
            if (this.getBgName() == "popupview_bg1") {
                this.closeBtn.x = PlatMgr.hasSpcialCloseBtn() ? 20 : (this.viewBg.width - this.closeBtn.width + 20);
                this.closeBtn.y = this.viewBg.y - 20;
            }
            else {
                this.closeBtn.x = PlatMgr.hasSpcialCloseBtn() ? 20 : (GameConfig.stageWidth - this.closeBtn.width - 31);
                this.closeBtn.y = 14;
            }
        }
    };
    BaseView.prototype.preInit = function () {
        _super.prototype.preInit.call(this);
        var getReportData = this.getReportTipData();
        // if(getReportData&&getReportData.title&&getReportData.title.key&&LanguageManager.checkHasKey(getReportData.title.key)&&
        // getReportData.msg&&getReportData.msg.key&&LanguageManager.checkHasKey(getReportData.msg.key))
        // {	
        // 	let localkey:string = getReportData.title.key+getReportData.msg.key+Api.playerVoApi.getPlayerID();
        // 	let lastTime:number = 0;
        // 	let timeStr:string = LocalStorageManager.get(localkey);
        // 	if (timeStr && timeStr!="")
        // 	{
        // 		lastTime = Number(timeStr);
        // 	}
        // 	if (!App.DateUtil.checkIsToday(lastTime))
        // 	{	
        // 		LocalStorageManager.set(localkey,String(GameData.serverTime));
        // 		ViewController.getInstance().openView(ViewConst.BASE.ACCOMMONREPORTVIEW,{
        // 			title : LanguageManager.getlocal(getReportData.title.key,getReportData.title.param),
        // 			msg : LanguageManager.getlocal(getReportData.msg.key,getReportData.msg.param),
        // 		});
        // 	}
        // }
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
        var titleKey = App.StringUtil.firstCharToLower(this.getClassName()) + "Title";
        return LangMger.checkHasKey(titleKey) ? LangMger.getlocal(titleKey) : titleKey;
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
    BaseView.prototype.getParent = function () {
        return LayerMgr.panelLayer;
    };
    // 获取container初始y坐标 		
    BaseView.prototype.getContainerY = function () {
        return 0;
    };
    BaseView.prototype.supportFullScreen = function () {
        return false;
    };
    BaseView.prototype.isShowMask = function () {
        return true;
    };
    BaseView.prototype.hideTitleBgShadow = function () {
        // if (this.titleBg && this.titleBgShadow && this.isHideTitleBgShadow()){
        // 	this.titleBgShadow.visible = false;
        // }
    };
    BaseView.prototype.playEffect = function (effectName, isStopWhenClose) {
        if (isStopWhenClose) {
            if (this._needStopEffectList.indexOf(effectName) < 0) {
                this._needStopEffectList.push(effectName);
            }
        }
        SoundMgr.playEffect(effectName);
    };
    BaseView.prototype.setUseQueue = function (v) {
        this._useQueue = v;
    };
    BaseView.prototype.dispose = function () {
        this.stopBg();
        if (this._needStopEffectList && this._needStopEffectList.length > 0) {
            var l = this._needStopEffectList.length;
            for (var i = l - 1; i >= 0; i--) {
                SoundMgr.stopEffect(this._needStopEffectList.pop());
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
        // this.titleBg = null;
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
__reflect(BaseView.prototype, "BaseView");
//# sourceMappingURL=BaseView.js.map