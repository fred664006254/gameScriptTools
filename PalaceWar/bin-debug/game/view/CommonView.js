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
 * 通用大面板的父类
 * author dmj
 * date 2017/9/16
 * @class CommonView
 */
var CommonView = (function (_super) {
    __extends(CommonView, _super);
    // private static _waitHideList:Object={};
    /**
     * 正在加载的界面数量
     */
    // private static _showloadingCount:number=0;
    function CommonView() {
        var _this = _super.call(this) || this;
        _this._guideBtn = null;
        return _this;
    }
    Object.defineProperty(CommonView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    CommonView.prototype.getContainerY = function () {
        if (this.getTitleBgName() == "commonview_titlebg2") {
            return 14;
        }
        return 0;
    };
    CommonView.prototype.getBigFrame = function () {
        // if (this.uiType=="2")
        // {
        // 	return "commonview_bigframe";
        // }
        return null;
    };
    CommonView.prototype.initStageEvent = function () {
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStageHandler, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeToStageHander, this);
    };
    CommonView.prototype.removeStageEvent = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addToStageHandler, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeToStageHander, this);
    };
    CommonView.prototype.addToStageHandler = function (e) {
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_DPOBJCTR_ADDSTAGE, this.getClassName());
    };
    CommonView.prototype.removeToStageHander = function (e) {
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_DPOBJCTR_REMOVESTAGE, this.getClassName());
    };
    /**
     *
     * @param data data tab:有tabbar时，需要传该参数，tab代表默认打开的页签，从0开始,如果有2级页签时，可以传"0-1"
     */
    CommonView.prototype.show = function (data) {
        if (this.isShow()) {
            this.switchToTop(data);
            return;
        }
        _super.prototype.show.call(this, data);
    };
    CommonView.prototype.hide = function () {
        if (!this.isShow()) {
            return;
        }
        _super.prototype.hide.call(this);
        var idx = CommonView.showedViewNameList.indexOf(this.getClassName());
        if (idx > -1) {
            CommonView.showedViewNameList.splice(idx, 1);
        }
        if (CommonView.showedViewNameList.length < 1) {
            SceneController.getInstance().showScene();
        }
    };
    CommonView.prototype.preInit = function () {
        var thisName = this.getClassName();
        var idx = CommonView.showedViewNameList.indexOf(thisName);
        if (idx < 0 && thisName != "RookieView") {
            CommonView.showedViewNameList.push(thisName);
        }
        _super.prototype.preInit.call(this);
        if (CommonView.showedViewNameList.length < 2 && thisName != "RookieView") {
            SceneController.getInstance().hideScene();
        }
    };
    CommonView.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            this.viewBg = BaseBitmap.create(bgName);
            if (bgName == "commonview_bg1" && (this.viewBg instanceof BaseBitmap)) {
                this.viewBg.fillMode = egret.BitmapFillMode.REPEAT;
            }
            if (this.isTouchMaskClose()) {
                this.viewBg.touchEnabled = true;
            }
            this.addChild(this.viewBg);
            this.viewBg.width = GameConfig.stageWidth;
            this.viewBg.height = GameConfig.stageHeigth;
        }
    };
    CommonView.prototype.init = function () {
        _super.prototype.init.call(this);
        this.initStageEvent();
        this.initGuideAgain();
    };
    CommonView.prototype.initTitle = function () {
        _super.prototype.initTitle.call(this);
        if (this.titleBg) {
            var titleBgShadow = BaseBitmap.create("commonview_titlebgshadow");
            titleBgShadow.width = this.titleBg.width;
            titleBgShadow.setPosition(0, this.titleBg.y + this.titleBg.height);
            this.addChild(titleBgShadow);
            this.titleBgShadow = titleBgShadow;
        }
    };
    CommonView.prototype.initViewBg = function () {
        _super.prototype.initViewBg.call(this);
    };
    // 需要加载的资源
    CommonView.prototype.getResourceList = function () {
        var titleBgName = this.getTitleBgName();
        var bgName = this.getBgName();
        var closeBtnName = this.getCloseBtnName();
        var titlePicName = this.getTitlePic();
        var resArr2 = [];
        var bigframePic = this.getBigFrame();
        var beamPic = this.getBeamName();
        var ruleBtnName = this.getRuleBtnName();
        this.checkAndPushRes(titlePicName, resArr2);
        this.checkAndPushRes(bgName, resArr2);
        this.checkAndPushRes(titleBgName, resArr2);
        this.checkAndPushRes(closeBtnName, resArr2);
        this.checkAndPushRes(titleBgName + "shadow", resArr2);
        this.checkAndPushRes(bigframePic, resArr2);
        this.checkAndPushRes(beamPic, resArr2);
        this.checkAndPushRes(ruleBtnName, resArr2);
        var lowClassName = this.getClassName().toLowerCase();
        if (RES.hasRes(lowClassName)) {
            resArr2.push(lowClassName);
        }
        return _super.prototype.getResourceList.call(this).concat(resArr2);
    };
    // 背景图名称
    CommonView.prototype.getBgName = function () {
        if (this.uiType == "2") {
            return "public_9_bg92";
        }
        return "commonview_bg1";
    };
    // 标题背景名称
    CommonView.prototype.getTitleBgName = function () {
        return "commonview_titlebg" + this.uiType;
    };
    // 关闭按钮图标名称
    CommonView.prototype.getCloseBtnName = function () {
        if (Api.switchVoApi.checkOpenShenheGame() && PlatformCfg.shenheFunctionName == this.getClassName().toLowerCase().replace("view", "")) {
            return "";
        }
        if (this.uiType == "2") {
            if (this.getTitleBgName() == "commonview_titlebg2") {
                return ButtonConst.COMMON_CLOSE_2;
            }
            return "acchaoting_closebtn";
        }
        return ButtonConst.COMMON_CLOSE_1;
    };
    CommonView.prototype.getRuleBtnName = function () {
        return ButtonConst.BTN_RULE;
    };
    /**
     * 被新打开的全屏界面遮挡触发，重写需处理动画暂停
     */
    CommonView.prototype.onBeCoverHandler = function () {
        App.LogUtil.log(this.getClassName() + "被遮挡");
    };
    /**
     * 被遮挡的界面上层view关闭，恢复到最上层时候触发，重写需处理动画恢复
     */
    CommonView.prototype.onTopHandler = function () {
        App.LogUtil.log(this.getClassName() + "切到top");
    };
    CommonView.prototype.isHideTitleBgShadow = function () {
        return false;
    };
    CommonView.prototype.showGuideAgain = function () {
        return null;
    };
    CommonView.prototype.initGuideAgain = function () {
        if (Api.switchVoApi.checkOpenGuideAgain() && this.showGuideAgain()) {
            this._guideBtn = ComponentManager.getButton("guide_btn", "", this.clickGuideAgain, this);
            this._guideBtn.x = 12 + (this._ruleBtn ? 70 : 0);
            this._guideBtn.y = 30;
            this.addChild(this._guideBtn);
        }
    };
    CommonView.prototype.clickGuideAgain = function () {
        ViewController.getInstance().openView(ViewConst.BASE.ROOKIEVIEW, { idx: this.showGuideAgain(), f: null, o: this });
    };
    CommonView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.removeStageEvent();
    };
    CommonView.showedViewNameList = [];
    return CommonView;
}(BaseView));
__reflect(CommonView.prototype, "CommonView");
//# sourceMappingURL=CommonView.js.map