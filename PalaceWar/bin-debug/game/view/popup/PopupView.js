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
 * 通用弹板的父类
 * author dmj
 * date 2017/9/19
 * @class PopupView
 */
var PopupView = (function (_super) {
    __extends(PopupView, _super);
    function PopupView() {
        var _this = _super.call(this) || this;
        _this._hudieClip = null;
        _this._frame = null;
        return _this;
    }
    Object.defineProperty(PopupView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    PopupView.prototype.init = function () {
        _super.prototype.init.call(this);
        this.initFrame();
        this.initButton();
        this.resetBgSize();
    };
    PopupView.prototype.getFrameName = function () {
        return null;
    };
    PopupView.prototype.getFrameWidth = function () {
        return 530;
    };
    PopupView.prototype.initFrame = function () {
        if (this.getFrameName()) {
            this._frame = BaseBitmap.create(this.getFrameName());
            this._frame.width = this.getFrameWidth();
            this._frame.x = this.viewBg.width / 2 - this._frame.width / 2;
            this.container.addChildAt(this._frame, 0);
        }
    };
    PopupView.prototype.show = function (data) {
        if (this.isShow()) {
            this.switchToTop(data);
            return;
        }
        if (data) {
            this.param = data;
        }
        _super.prototype.show.call(this, data);
    };
    // 需要加载的资源
    PopupView.prototype.getResourceList = function () {
        var resArr = [];
        this.checkAndPushRes(this.getBgName(), resArr);
        this.checkAndPushRes(this.getTitleBgName(), resArr);
        this.checkAndPushRes(this.getCloseBtnName(), resArr);
        this.checkAndPushRes(this.getFrameName(), resArr);
        this.checkAndPushRes(this.getRuleBtnName(), resArr);
        var lowClassName = this.getClassName().toLowerCase();
        if (RES.hasRes(lowClassName)) {
            resArr[resArr.length] = lowClassName;
        }
        return _super.prototype.getResourceList.call(this).concat(resArr);
    };
    PopupView.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            if (bgName == "public_rule_bg") {
                this.viewBg = App.CommonUtil.getContainerByLeftHalfRes(bgName);
            }
            else {
                this.viewBg = BaseBitmap.create(bgName);
            }
            if (this.isTouchMaskClose()) {
                this.viewBg.touchEnabled = true;
            }
            this.addChild(this.viewBg);
            if (bgName == "popupview_bg1") {
                this.viewBg.width = this.getShowWidth();
            }
        }
    };
    PopupView.prototype.initButton = function () {
        if (this.getConfirmBtnStr()) {
            this._confirmBtn = ComponentManager.getButton(this.getConfirmBtnName(), this.getConfirmBtnStr(), this.clickConfirmHandler, this);
            this._confirmBtn.x = this.getShowWidth() / 2 - this._confirmBtn.width / 2;
            this._confirmBtn.y = this.container.height - this._confirmBtn.height - 10;
            this.addChildToContainer(this._confirmBtn);
        }
    };
    // 重置背景的高度,popupview才用
    PopupView.prototype.resetBgSize = function () {
        if (this.viewBg) {
            if (this.getShowHeight() == 0) {
                if (this.getBgName() != "public_rule_bg") {
                    var containerPosData = this.getContainerRealHeight();
                    var containerRealHeight = containerPosData.maxH;
                    var minY = Math.max(containerPosData.startY, 0);
                    if (this.container.height + minY > containerRealHeight) {
                        this.container.height = containerRealHeight - minY;
                    }
                    if ((this.container.y + this.container.height + minY + this.getBgExtraHeight() + 13) <= 900) {
                        if (this.viewBg.height <= this.container.y + this.container.height + minY + this.getBgExtraHeight() + 13) {
                            this.viewBg.height = this.container.y + this.container.height + minY + this.getBgExtraHeight() + 13;
                        }
                    }
                    else {
                        this.viewBg.height = 900;
                    }
                }
            }
            else {
                this.viewBg.height = this.getShowHeight();
            }
            this.viewBg.x = GameConfig.stageWidth / 2 - this.viewBg.width / 2;
            this.viewBg.y = GameConfig.stageHeigth / 2 - this.viewBg.height / 2;
            this.container.x = this.viewBg.x;
            this.container.y = this.viewBg.y + this.getContainerY();
            if (this._confirmBtn) {
                if (this.getShowHeight() == 0) {
                    this._confirmBtn.y = this.container.height + 10;
                }
                else {
                    this._confirmBtn.y = this.viewBg.height - this.getContainerY() - this._confirmBtn.height - 25;
                }
            }
            if (this.titleBg) {
                this.titleBg.x = this.viewBg.x + this.viewBg.width / 2 - this.titleBg.width / 2;
                if (this.getBgName() == "public_rule_bg") {
                    this.titleBg.y = this.viewBg.y + 5;
                }
                else {
                    this.titleBg.y = this.viewBg.y + 20;
                }
            }
            if (this.titleTF) {
                this.titleTF.size = TextFieldConst.FONTSIZE_TITLE_COMMON;
                if (PlatformManager.checkIsRuSp()) {
                    this.titleTF.size = 16;
                }
                else if (PlatformManager.checkIsThSp()) {
                    this.titleTF.size = 20;
                }
                this.titleTF.x = this.viewBg.x + this.viewBg.width / 2 - this.titleTF.width / 2;
                this.titleTF.y = this.viewBg.y + 15;
                if (this.uiType == "2") {
                    this.titleTF.size = TextFieldConst.FONTSIZE_TITLE_SMALL;
                    this.titleTF.x = this.viewBg.x + this.viewBg.width / 2 - this.titleTF.width / 2;
                    this.titleTF.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
                    this.titleTF.y = this.viewBg.y + 32;
                }
            }
            if (this.closeBtn) {
                if (this.getBgName() != "public_rule_bg") {
                    this.closeBtn.y = this.viewBg.y - 15;
                    this.closeBtn.x = PlatformManager.hasSpcialCloseBtn() ? 0 : (this.viewBg.x + this.viewBg.width - this.closeBtn.width + 15);
                    if (this.uiType == "2") {
                        this.closeBtn.y = this.viewBg.y - 1;
                        this.closeBtn.x = (this.viewBg.x + this.viewBg.width - this.closeBtn.width + 12);
                        if (!this._hudieClip) {
                            this._hudieClip = ComponentManager.getCustomMovieClip("popupviewhudie", 10);
                            this._hudieClip.x = this.closeBtn.x - 45;
                            this._hudieClip.y = this.closeBtn.y - 45;
                            this._hudieClip.blendMode = egret.BlendMode.ADD;
                            this.addChild(this._hudieClip);
                            this._hudieClip.playWithTime();
                        }
                    }
                }
                else {
                    this.closeBtn.y = this.viewBg.y - 18;
                    this.closeBtn.x = PlatformManager.hasSpcialCloseBtn() ? 0 : (this.viewBg.x + this.viewBg.width - this.closeBtn.width + 37);
                }
            }
            if (this.tabViewData) {
                for (var tabidx in this.tabViewData) {
                    var tabView = this.tabViewData[tabidx];
                    tabView.setPosition(this.container.x, this.container.y);
                }
            }
            if (this._frame) {
                this._frame.height = this.viewBg.y + this.viewBg.height - this.container.y - 25;
            }
            this.setTabBarPosition();
            this.resetRuleBtn();
            if (this.getBgName() == "popupview_bg3" && this.titleTF) {
                if (this.closeBtn) {
                    this.closeBtn.y += 10;
                }
                this.titleTF.x = GameConfig.stageWidth / 2 - this.titleTF.width / 2;
                this.titleTF.y = this.viewBg.y + 29;
                this.titleTF.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
                // let butterfly = ComponentManager.getCustomMovieClip(`tabhudie`, 8)//BaseBitmap.create("btn2_tab_fly");
                // butterfly.width = 33;
                // butterfly.height = 31;
                // butterfly.scaleX = -1;
                // butterfly.playWithTime(-1);
                // this.addChild(butterfly);
                // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, butterfly,this.closeBtn, [20,-10]);
                if (!this._hudieClip && this.closeBtn) {
                    this._hudieClip = ComponentManager.getCustomMovieClip("popupviewhudie", 10);
                    this._hudieClip.x = this.closeBtn.x - 45;
                    this._hudieClip.y = this.closeBtn.y - 45;
                    this._hudieClip.blendMode = egret.BlendMode.ADD;
                    this.addChild(this._hudieClip);
                    this._hudieClip.playWithTime();
                }
            }
        }
        //new ui
        if (this.getBgName() == "popupview_bg3") {
            if (this.tabViewData[this.selectedTabIndex]) {
                this.tabViewData[this.selectedTabIndex].x = this.getOffsetX();
            }
        }
    };
    PopupView.prototype.changeTab = function () {
        _super.prototype.changeTab.call(this);
        //new ui
        if (this.getBgName() == "popupview_bg3") {
            if (this.tabViewData[this.selectedTabIndex]) {
                this.tabViewData[this.selectedTabIndex].x = this.getOffsetX();
            }
        }
    };
    PopupView.prototype.getOffsetX = function () {
        return 29;
    };
    PopupView.prototype.getOffsetY = function () {
        if (this.tabbarGroup instanceof TabBarScrollGroup) {
            return 16;
        }
        if (this.getTabbarName() == ButtonConst.BTN2_TAB) {
            return 0;
        }
        return 16;
    };
    PopupView.prototype.setTabBarPosition = function () {
        _super.prototype.setTabBarPosition.call(this);
        //new ui
        if (this.getBgName() == "popupview_bg3" && this.tabbarGroup) {
            this.tabbarGroup.y += this.getOffsetY();
        }
    };
    PopupView.prototype.resetRuleBtn = function () {
        if (this._ruleBtn) {
            this._ruleBtn.x = 32 + (PlatformManager.hasSpcialCloseBtn() ? 100 : 0);
            this._ruleBtn.y = this.closeBtn.y + 10;
        }
    };
    /**
     * 计算container实际高度
     */
    PopupView.prototype.getContainerRealHeight = function () {
        var maxH = 0;
        var startY = Number.MAX_VALUE;
        for (var i = 0; i < this.container.numChildren; i++) {
            var obj = this.container.getChildAt(i);
            if (!obj.measuredHeight) {
                continue;
            }
            if (obj && (obj.y + obj.height * obj.scaleY) > maxH) {
                maxH = obj.y + obj.height * obj.scaleY;
            }
            if (obj.y < startY) {
                startY = obj.y;
            }
        }
        return { maxH: maxH, startY: startY };
    };
    /**
     * 设置确认按钮坐标
     * @param x
     * @param y
     */
    PopupView.prototype.setConfirmBtnPosition = function (x, y) {
        if (this._confirmBtn) {
            if (x) {
                this._confirmBtn.x = x;
            }
            if (y) {
                this._confirmBtn.y = y;
            }
        }
    };
    /**
     * 设置按钮显示状态
     * @param isshow true：显示
     */
    PopupView.prototype.setConfirmBtnVisible = function (isshow) {
        if (this._confirmBtn) {
            this._confirmBtn.visible = isshow;
        }
    };
    // 计算背景高度时使用，在container高度的基础上添加该高度
    PopupView.prototype.getBgExtraHeight = function () {
        return 40;
    };
    PopupView.prototype.clickConfirmHandler = function (data) {
        App.LogUtil.log("clickConfirmHandler");
        this.hide();
    };
    // 背景图名称
    PopupView.prototype.getBgName = function () {
        if (this.uiType == "2") {
            return "popupview_bg3";
        }
        return "popupview_bg1";
    };
    // 标题背景名称
    PopupView.prototype.getTitleBgName = function () {
        return null;
    };
    // 关闭按钮图标名称
    PopupView.prototype.getCloseBtnName = function () {
        if (this.uiType == "2") {
            return ButtonConst.POPUP_CLOSE_BTN_2;
        }
        return ButtonConst.POPUP_CLOSE_BTN_1;
    };
    //rule btn
    PopupView.prototype.getRuleBtnName = function () {
        return ButtonConst.BTN_RULE;
    };
    // 确认按钮名称
    PopupView.prototype.getConfirmBtnName = function () {
        if (this.uiType == "2") {
            return ButtonConst.BTN2_TAB;
        }
        return ButtonConst.BTN_TAB;
    };
    PopupView.prototype.getConfirmBtnStr = function () {
        return "";
    };
    PopupView.prototype.hide = function () {
        this.playHideViewEffect();
    };
    //显示弹窗动效
    PopupView.prototype.playOpenViewEffect = function () {
        if (!Api.rookieVoApi.isInGuiding && Api.switchVoApi.checkShowOpenViewAni() && this.isShowOpenAni()) {
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
                egret.Tween.removeTweens(this);
                if (this._maskBmp) {
                    this._maskBmp.setScale(1);
                    this._maskBmp.x = 0;
                    this._maskBmp.y = 0;
                }
            }, this);
        }
    };
    //关闭弹窗动效
    PopupView.prototype.playHideViewEffect = function () {
        var _this = this;
        if (this.isInit() == true && !Api.rookieVoApi.isInGuiding && Api.switchVoApi.checkShowOpenViewAni() && this.isShowOpenAni() && (!this["__notShowHideEffect"])) {
            //关闭特效
            if (this._maskBmp) {
                this._maskBmp.setScale(2);
                this._maskBmp.x = -GameConfig.stageWidth / 2;
                this._maskBmp.y = -GameConfig.stageHeigth / 2;
            }
            egret.Tween.get(this, { loop: false }).to({ scaleX: 0.5, scaleY: 0.5, alpha: 0 }, 200)
                .call(function () {
                egret.Tween.removeTweens(_this);
                if (_this._maskBmp) {
                    _this._maskBmp.setScale(1);
                    _this._maskBmp.x = 0;
                    _this._maskBmp.y = 0;
                }
                _this.anchorOffsetX = 0;
                _this.anchorOffsetY = 0;
                _this.x = 0;
                _this.y = 0;
                _this.setScale(1);
                _super.prototype.hide.call(_this);
            }, this);
        }
        else {
            _super.prototype.hide.call(this);
        }
    };
    PopupView.prototype.dispose = function () {
        if (this._confirmBtn) {
            this.removeChildFromContainer(this._confirmBtn);
            this._confirmBtn.dispose();
            this._confirmBtn = null;
        }
        this.param = null;
        this._hudieClip = null;
        this._frame = null;
        _super.prototype.dispose.call(this);
    };
    return PopupView;
}(BaseView));
__reflect(PopupView.prototype, "PopupView");
//# sourceMappingURL=PopupView.js.map