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
    // protected _titleBg2:BaseBitmap;
    function PopupView() {
        return _super.call(this) || this;
    }
    PopupView.prototype.init = function () {
        _super.prototype.init.call(this);
        this.initButton();
        // if(this._titleBg){
        // 	this.initTitleBg2();
        // }
        this.resetBgSize();
    };
    // 初始化标题
    PopupView.prototype.initTitle = function () {
        var titleBgName = this.getTitleBgName();
        if (titleBgName) {
            var bgName = this.getBgName();
            this._titleBg = BaseBitmap.create(titleBgName);
            this._titleBg.name = "titleBg";
            this._titleBg.x = GameConfig.stageWidth / 2 - this._titleBg.width / 2;
            this.addChild(this._titleBg);
            if (bgName == "popupview_bg1") {
                this._titleBg.y = this.viewBg.y - this._titleBg.height / 2;
            }
            else {
                this._titleBg.y = 0;
            }
        }
        var titlepic = this.getTitlePic();
        if (ResMgr.hasRes(titlepic)) {
            this.titleBmp = BaseBitmap.create(titlepic);
            this.titleBmp.setPosition(this.width / 2 - this.titleBmp.width / 2, this._titleBg.y + this._titleBg.height - this.titleBmp.height);
            this.addChild(this.titleBmp);
        }
        else if (this.getTitleStr()) {
            this.titleTF = ComponentMgr.getTextField(this.getTitleStr(), TextFieldConst.SIZE_30, ColorEnums.white);
            this.titleTF.stroke = 2;
            if (PlatMgr.checkIsRuSp()) {
                this.titleTF.size = 16;
            }
            this.titleTF.x = this.width / 2 - this.titleTF.width / 2;
            // let strokeColor = ColorEnums.strokeBlack;
            // if(titleBgName == `public_poptittle`){
            // 	strokeColor = ColorEnums.btnStrokeBlue;;
            // }
            // else if(titleBgName == `public_poptittlered`){
            // 	strokeColor = ColorEnums.btnStrokeRed;
            // }
            // else if(titleBgName == `public_poptittlepurple`){
            // 	strokeColor = ColorEnums.btnStrokePurple;
            // }
            this.titleTF.strokeColor = ColorEnums.strokeBlue;
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
        var lowClassName = this.getClassName().toLowerCase();
        if (RES.hasRes(lowClassName)) {
            resArr[resArr.length] = lowClassName;
        }
        return _super.prototype.getResourceList.call(this).concat(resArr);
    };
    PopupView.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            this.viewBg = BaseBitmap.create(bgName);
            if (bgName == "popupview_bg1") {
                this.viewBg.width = this.getShowWidth();
            }
            if (this.isTouchMaskClose()) {
                this.viewBg.touchEnabled = true;
            }
            this.addChild(this.viewBg);
            // if(this.showLineFrame())
            // {
            // 	this._line=BaseBitmap.create("popupview_line1");
            // 	let line =this._line;
            // 	line.height=this.viewBg.height-20;
            // 	line.setPosition(this.viewBg.x+(this.viewBg.width-line.width)*0.5,this.viewBg.y+this.viewBg.height-line.height-7);
            // 	this.addChild(line);
            // }
            // if(this.checkShowContentBg())
            // {
            // 	this._contentBg=BaseBitmap.create("popupview_content1");
            // 	this.addChild(this._contentBg);
            // 	this._contentBg.width=this.viewBg.width-60;
            // }
        }
    };
    PopupView.prototype.showLineFrame = function () {
        return true;
    };
    PopupView.prototype.initTitleBg2 = function () {
        var temInx = this.getChildIndex(this._titleBg);
        var title2 = BaseBitmap.create("ab_public_popupview_title_bg2");
        this.addChildAt(title2, temInx);
        // this._titleBg2 = title2;
        title2.addTouchTap(this.closeHandler, this);
    };
    PopupView.prototype.initButton = function () {
        if (this.getConfirmBtnStr()) {
            this._confirmBtn = ComponentMgr.getButton(this.getConfirmBtnName(), this.getConfirmBtnStr(), this.clickConfirmHandler, this);
            this._confirmBtn.x = this.getShowWidth() / 2 - this._confirmBtn.width / 2;
            this._confirmBtn.y = this.container.height - this._confirmBtn.height - 10;
            this.addChild(this._confirmBtn);
        }
    };
    // 弹框面板宽度，高度动态计算
    PopupView.prototype.getShowWidth = function () {
        return 526;
    };
    // 弹框面板高度，重新该方法后，不会动态计算高度
    PopupView.prototype.getShowHeight = function () {
        return 0;
    };
    // 重置背景的高度,popupview才用
    PopupView.prototype.resetBgSize = function () {
        if (this.viewBg) {
            if (this.getShowHeight() == 0) {
                var containerPosData = this.getContainerRealHeight();
                var containerRealHeight = containerPosData.maxH;
                var minY = Math.max(containerPosData.startY, 0);
                if (this.container.height + minY > containerRealHeight) {
                    this.container.height = containerRealHeight - minY;
                }
                var cH = this.container.y + this.container.height + minY + this.getBgExtraHeight() + 97;
                cH = Math.max(200, cH);
                if ((cH) <= 900) {
                    if (this.viewBg.height <= cH) {
                        this.viewBg.height = cH;
                    }
                }
                else {
                    this.viewBg.height = 900;
                }
            }
            else {
                this.viewBg.height = this.getShowHeight();
            }
            this.viewBg.x = GameConfig.stageWidth / 2 - this.viewBg.width / 2;
            this.viewBg.y = GameConfig.stageHeigth / 2 - this.viewBg.height / 2;
            if (this._titleBg) {
                // this._titleBg.x = this.viewBg.x + this.viewBg.width/2 - this._titleBg.width/2; 龙珠项目的标题位置
                // this._titleBg.y = this.viewBg.y;
                // 小鸟项目的标题位置
                this._titleBg.x = this.viewBg.x + this.viewBg.width / 2 - 286.5;
                this._titleBg.y = this.viewBg.y - 20;
                // App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, this._titleBg2, this._titleBg, [-28,0]);
            }
            this.container.x = this.viewBg.x;
            if (this._titleBg) {
                this.container.y = this._titleBg.y + this._titleBg.height + this.getContainerY() + 7;
            }
            else {
                this.container.y = this.viewBg.y + this.getContainerY();
            }
            if (this._confirmBtn) {
                // if(this.getShowHeight() == 0)
                // {
                // 	this._confirmBtn.y = this.container.height + 10;
                // }
                // else
                // {
                // 	this._confirmBtn.y = this.viewBg.height - this.getContainerY() - this._confirmBtn.height - 25;
                // }
                this._confirmBtn.x = this.viewBg.x + this.getShowWidth() / 2 - this._confirmBtn.width / 2;
                this._confirmBtn.y = this.viewBg.y + this.viewBg.height - this._confirmBtn.height - 10;
            }
            if (this.titleTF) {
                // this.titleTF.size = TextFieldConst.FONTSIZE_TITLE_COMMON;
                // if (PlatMgr.checkIsRuSp())
                // {
                // 	this.titleTF.size = 16;
                // }
                // this.titleTF.x = this.viewBg.x + this.viewBg.width/2 - this.titleTF.width/2;
                // this.titleTF.y = this.viewBg.y + 20;
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, this.titleTF, this._titleBg, [50, 0]);
            }
            if (this.closeBtn) {
                if (this._titleBg) {
                    this.closeBtn.x = PlatMgr.hasSpcialCloseBtn() ? 0 : (this._titleBg.x + this._titleBg.width - this.closeBtn.width - 10);
                    this.closeBtn.y = this._titleBg.y + (this._titleBg.height - this.closeBtn.height) / 2 + 5;
                    // this.setChildIndex(this.closeBtn, this.getChildIndex(this._titleBg));
                }
                else {
                    this.closeBtn.x = PlatMgr.hasSpcialCloseBtn() ? 0 : (this.viewBg.x + this.viewBg.width - this.closeBtn.width - 17);
                }
            }
            if (this.tabViewData) {
                for (var tabidx in this.tabViewData) {
                    var tabView = this.tabViewData[tabidx];
                    tabView.setPosition(this.container.x, this.container.y);
                }
            }
            this.setTabBarPosition();
            this.resetRuleBtn();
        }
    };
    PopupView.prototype.resetRuleBtn = function () {
        if (this._ruleBtn) {
            this._ruleBtn.x = 32 + (PlatMgr.hasSpcialCloseBtn() ? 100 : 0);
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
    PopupView.prototype.isTouchMaskClose = function () {
        return true;
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
        return 0;
    };
    PopupView.prototype.clickConfirmHandler = function (data) {
        App.LogUtil.log("clickConfirmHandler");
        this.hide();
    };
    // 背景图名称
    PopupView.prototype.getBgName = function () {
        return "public_ab_popbg";
    };
    // 标题背景名称
    PopupView.prototype.getTitleBgName = function () {
        return "ab_public_popupview_title_bg";
    };
    // 关闭按钮图标名称
    PopupView.prototype.getCloseBtnName = function () {
        return ButtonConst.POPUP_CLOSE_BTN2;
    };
    // 确认按钮名称
    PopupView.prototype.getConfirmBtnName = function () {
        return ButtonConst.BTN_CONFIRM;
    };
    PopupView.prototype.getConfirmBtnStr = function () {
        return "";
    };
    //显示弹窗动效
    PopupView.prototype.playOpenViewEffect = function () {
        if (this.isShowOpenAni()) {
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
            egret.Tween.get(this, { loop: false }).to({ scaleX: 1.1, scaleY: 1.1, alpha: 1 }, 200).to({ scaleX: 1, scaleY: 1 }, 100).call(function () {
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
    PopupView.prototype.playHideViewEffect = function (func, handle) {
        var _this = this;
        if (this.isInit() == true && this.isShowOpenAni() && (!this["__notShowHideEffect"])) {
            //关闭特效
            if (this._maskBmp) {
                this._maskBmp.setScale(2);
                this._maskBmp.x = -GameConfig.stageWidth / 2;
                this._maskBmp.y = -GameConfig.stageHeigth / 2;
            }
            egret.Tween.get(this, { loop: false }).to({ scaleX: 0.5, scaleY: 0.5, alpha: 0 }, 200).call(function () {
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
                if (!func) {
                    _super.prototype.hide.call(_this);
                }
                else {
                    func.apply(handle);
                }
            }, this);
        }
        else {
            _super.prototype.hide.call(this);
        }
    };
    PopupView.prototype.hide = function () {
        this.playHideViewEffect();
    };
    PopupView.prototype.dispose = function () {
        if (this._confirmBtn) {
            this.removeChild(this._confirmBtn);
            this._confirmBtn.dispose();
            this._confirmBtn = null;
        }
        this.param = null;
        this._titleBg = null;
        _super.prototype.dispose.call(this);
    };
    return PopupView;
}(BaseView));
__reflect(PopupView.prototype, "PopupView");
//# sourceMappingURL=PopupView.js.map