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
    function CommonView() {
        return _super.call(this) || this;
    }
    /**
     *
     * @param data data tab:有tabbar时，需要传该参数，tab代表默认打开的页签，从0开始,如果有2级页签时，可以传"0-1"
     */
    CommonView.prototype.show = function (data) {
        if (this.isShow()) {
            return;
        }
        CommonView._showloadingCount++;
        App.LogUtil.log("commonview.showCount:", CommonView._showloadingCount);
        _super.prototype.show.call(this, data);
    };
    CommonView.prototype.hide = function () {
        if (!this.isShow()) {
            return;
        }
        if (!this.isInit()) {
            this.removeLoadingCount();
        }
        if (CommonView._showloadingCount > 0) {
            var thisName = this.getClassName();
            var hideData = CommonView._waitHideList[thisName];
            if (hideData == null) {
                hideData = { hide: this.hide, hideThisObj: this };
                CommonView._waitHideList[thisName] = hideData;
                App.LogUtil.log(thisName, "等待关闭");
                return;
            }
        }
        _super.prototype.hide.call(this);
        if (this.hideScene()) {
            var idx = CommonView.showedViewNameList.indexOf(this.getClassName());
            if (idx > -1) {
                CommonView.showedViewNameList.splice(idx, 1);
            }
            if (CommonView.showedViewNameList.length < 1) {
                SceneController.getInstance().showScene();
            }
        }
    };
    CommonView.prototype.preInit = function () {
        var thisName = this.getClassName();
        var hideScene = this.hideScene();
        if (hideScene) {
            var idx = CommonView.showedViewNameList.indexOf(thisName);
            if (idx < 0) {
                CommonView.showedViewNameList.push(thisName);
            }
        }
        _super.prototype.preInit.call(this);
        if (hideScene && CommonView.showedViewNameList.length < 2) {
            //日本特殊引导会导致主场景隐藏
            // if(Api.rookieVoApi.curStep == "127" && PlatformManager.checkIsJPSp()){
            // }else{
            SceneController.getInstance().hideScene();
            // }
        }
    };
    CommonView.prototype.hideScene = function () {
        return true;
    };
    CommonView.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            this.viewBg = ResourceManager.getRes(bgName) ? BaseBitmap.create(bgName) : BaseLoadBitmap.create(bgName);
            ;
            if (bgName == "public_9v_bg01" && (this.viewBg instanceof BaseBitmap)) {
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
    CommonView.prototype.removeLoadingCount = function () {
        CommonView._showloadingCount--;
        App.LogUtil.log("commonview.hideCount:", CommonView._showloadingCount);
        if (CommonView._showloadingCount == 0) {
            for (var key in CommonView._waitHideList) {
                var hideData = CommonView._waitHideList[key];
                if (hideData) {
                    hideData.hide.call(hideData.hideThisObj);
                    hideData.hide = null;
                    hideData.hideThisObj = null;
                    delete CommonView._waitHideList[key];
                    App.LogUtil.log(this.getClassName() + "初始化完成,关闭界面" + key);
                }
            }
        }
    };
    CommonView.prototype.init = function () {
        this.removeLoadingCount();
        _super.prototype.init.call(this);
        this.initRuleBtn();
    };
    CommonView.prototype.initTitle = function () {
        _super.prototype.initTitle.call(this);
        if (this.titleBg && this.isShowTitleBgShadow()) {
            var titleBgShadow = BaseBitmap.create("commonview_titlebgshadow");
            titleBgShadow.width = this.titleBg.width;
            titleBgShadow.setPosition(0, this.titleBg.y + this.titleBg.height);
            this.addChild(titleBgShadow);
        }
        // if(GameData.isUseNewUI)
        // {
        // let titleHuawen:BaseBitmap=BaseBitmap.create("commonview_titlebg02");
        // this.addChild(titleHuawen);
        // }
    };
    CommonView.prototype.isShowTitleBgShadow = function () {
        return true;
    };
    CommonView.prototype.initViewBg = function () {
        _super.prototype.initViewBg.call(this);
    };
    CommonView.prototype.initRuleBtn = function () {
        //规则说明和概率说明 如果有一个就显示背景
        if (this.getRuleInfo() || this.getProbInfo()) {
            this._ruleBg = BaseBitmap.create("commonview_titlebg02");
            // this._ruleBg.width = 150;
            this._ruleBg.x = 0;
            this._ruleBg.y = 0;
            this.addChild(this._ruleBg);
            if (PlatformManager.hasSpcialCloseBtn()) {
                this._ruleBg.visible = false;
            }
        }
        if (this.getRuleInfo()) {
            this._ruleBtn = ComponentManager.getButton("btn_rule", "", this.clickRuleBtnHandler, this);
            this._ruleBtn.x = 3 + (PlatformManager.hasSpcialCloseBtn() ? 90 : 0);
            this._ruleBtn.y = 0;
            this.addChild(this._ruleBtn);
        }
        if (this.getProbInfo()) {
            this._probBtn = ComponentManager.getButton("btn_prob", "", this.clickProbBtnHandler, this);
            var startX = 0;
            if (this._ruleBtn) {
                startX = this._ruleBtn.x + this._ruleBtn.width + (PlatformManager.hasSpcialCloseBtn() ? 10 : 30);
            }
            else {
                startX = 3 + (PlatformManager.hasSpcialCloseBtn() ? 90 : 0);
            }
            this._probBtn.setScale(0.9);
            this._probBtn.x = 3 + startX;
            this._probBtn.y = 0;
            this.addChild(this._probBtn);
        }
    };
    CommonView.prototype.clickRuleBtnHandler = function (param) {
        ViewController.getInstance().openView(ViewConst.POPUP.RULEINFOPOPUPVIEW, LanguageManager.getlocal(this.getRuleInfo(), this.getRuleParam()));
    };
    CommonView.prototype.getRuleParam = function () {
        return [];
    };
    CommonView.prototype.clickProbBtnHandler = function (param) {
        ViewController.getInstance().openView(ViewConst.POPUP.PROBINFOPOPUPVIEW, LanguageManager.getlocal(this.getProbInfo()));
    };
    // 需要加载的资源
    CommonView.prototype.getResourceList = function () {
        var titleBgName = this.getTitleBgName();
        var bgName = this.getBgName();
        var closeBtnName = this.getCloseBtnName();
        var resArr2 = [];
        this.checkAndPushRes(bgName, resArr2);
        this.checkAndPushRes(titleBgName, resArr2);
        this.checkAndPushRes(closeBtnName, resArr2);
        this.checkAndPushRes(titleBgName + "shadow", resArr2);
        var lowClassName = this.getClassName().toLowerCase();
        if (RES.hasRes(lowClassName)) {
            resArr2.push(lowClassName);
        }
        return _super.prototype.getResourceList.call(this).concat(resArr2);
    };
    // 背景图名称
    CommonView.prototype.getBgName = function () {
        return "public_9v_bg01";
    };
    // 标题背景名称
    CommonView.prototype.getTitleBgName = function () {
        return "commonview_titlebg";
    };
    // 关闭按钮图标名称
    CommonView.prototype.getCloseBtnName = function () {
        return ButtonConst.COMMON_CLOSE_1;
    };
    // 规则说明内容
    CommonView.prototype.getRuleInfo = function () {
        var ruleStr = this.getClassName().toLowerCase().replace("view", "") + "RuleInfo";
        if (LanguageManager.checkHasKey(ruleStr)) {
            return ruleStr;
        }
        else {
        }
        return "";
    };
    //概率展示
    CommonView.prototype.getProbInfo = function () {
        if (!Api.switchVoApi.checkOpenProbInfo()) {
            return "";
        }
        var probStr = this.getClassName().toLowerCase().replace("view", "") + "ProbInfo";
        if (LanguageManager.checkHasKey(probStr)) {
            return probStr;
        }
        else {
        }
        return "";
    };
    CommonView.prototype.getRuleBtnName = function () {
        return "btn_rule";
    };
    CommonView.prototype.dispose = function () {
        if (this._ruleBtn) {
            this.removeChild(this._ruleBtn);
            this._ruleBtn.dispose();
            this._ruleBtn = null;
        }
        if (this._probBtn) {
            this.removeChild(this._probBtn);
            this._probBtn.dispose();
            this._probBtn = null;
        }
        if (this._ruleBg) {
            this.removeChild(this._ruleBg);
            this._ruleBg.dispose();
            this._ruleBg = null;
        }
        _super.prototype.dispose.call(this);
    };
    CommonView.showedViewNameList = [];
    CommonView._waitHideList = {};
    /**
     * 正在加载的界面数量
     */
    CommonView._showloadingCount = 0;
    return CommonView;
}(BaseView));
__reflect(CommonView.prototype, "CommonView");
