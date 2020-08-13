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
        return _super.call(this) || this;
    }
    PopupView.prototype.init = function () {
        _super.prototype.init.call(this);
        this.initButton();
        this.resetBgSize();
    };
    /**生成新标头 */
    PopupView.prototype.isHaveTitle = function () {
        return false;
    };
    /**是否需要木板背景 只有在有tab页签的时候才能用*/
    PopupView.prototype.isHaveTabBg = function () {
        return false;
    };
    PopupView.prototype.initViewBg = function () {
        _super.prototype.initViewBg.call(this);
        this.initTitleBg();
    };
    PopupView.prototype.show = function (data) {
        if (this.isShow()) {
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
        var titleArr = [];
        if (this.isHaveTitle()) {
            titleArr.push("popupview_bg3");
            titleArr.push("popupview_bg4");
            titleArr.push("popupview_bg5");
        }
        var lowClassName = this.getClassName().toLowerCase();
        if (RES.hasRes(lowClassName)) {
            resArr[resArr.length] = lowClassName;
        }
        return _super.prototype.getResourceList.call(this).concat(resArr).concat(titleArr);
    };
    PopupView.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            if (bgName == "public_rule_bg") 
            // if(bgName == "promotion_scroll")
            {
                this.viewBg = App.CommonUtil.getContainerByLeftHalfRes(bgName);
                // this.viewBg = new BaseDisplayObjectContainer();
                // let panel = BaseBitmap.create("promotion_scroll_1");
                // let scrollLeft = BaseBitmap.create("promotion_scroll");
                // let scrollRight = BaseBitmap.create("promotion_scroll");
                // this.viewBg.width = panel.width + scrollLeft.width * 2;
                // this.viewBg.height = scrollLeft.height;
                // panel.x = this.viewBg.width / 2 - panel.width/2;
                // panel.y = this.viewBg.height /2 - panel.height/2;
                // scrollLeft.scaleX = -1;
                // scrollLeft.x = scrollLeft.width;
                // scrollLeft.y = this.viewBg.height /2 - scrollLeft.height/2;
                // scrollRight.x = panel.width + panel.x;
                // scrollRight.y = this.viewBg.height /2 - scrollRight.height/2;
                // this.viewBg.addChild(panel);
                // this.viewBg.addChild(scrollLeft);
                // this.viewBg.addChild(scrollRight);
            }
            else {
                this.viewBg = BaseBitmap.create(bgName);
            }
            if (this.isTouchMaskClose()) {
                this.viewBg.touchEnabled = true;
            }
            this.addChild(this.viewBg);
            if (bgName == "popupview_bg2") {
                this.viewBg.width = this.getShowWidth();
            }
        }
    };
    PopupView.prototype.initTitleBg = function () {
        if (this.isHaveTitle()) {
            var newTitleBg = BaseBitmap.create("popupview_bg3");
            newTitleBg.x = this.viewBg.width / 2 - newTitleBg.width / 2;
            newTitleBg.y = this.viewBg.y - 5;
            newTitleBg.name = "newTitleBg";
            this.addChildToContainer(newTitleBg);
            var newLine = BaseBitmap.create("popupview_bg5");
            var newRedBg = BaseBitmap.create("popupview_bg4");
            newLine.name = "newLine";
            newRedBg.name = "newRedBg";
            newLine.width = newRedBg.width;
            newLine.x = this.viewBg.width / 2 - newLine.width / 2;
            newLine.y = newTitleBg.y + 10;
            newRedBg.x = this.viewBg.width / 2 - newRedBg.width / 2;
            newRedBg.y = newLine.y;
            this.addChildToContainer(newLine);
            this.addChildToContainer(newRedBg);
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
                this.titleTF.size = TextFieldConst.FONTSIZE_TITLE_SMALL;
                this.titleTF.x = this.viewBg.x + this.viewBg.width / 2 - this.titleTF.width / 2;
                this.titleTF.y = this.viewBg.y + 14 + 5;
            }
            if (this.closeBtn) {
                if (this.getBgName() != "public_rule_bg") {
                    this.closeBtn.y = this.viewBg.y + 30 + 23;
                    this.closeBtn.x = this.viewBg.x + this.viewBg.width - this.closeBtn.width + 6;
                }
                else {
                    this.closeBtn.y = this.viewBg.y - 18;
                    this.closeBtn.x = this.viewBg.x + this.viewBg.width - this.closeBtn.width + 37;
                }
            }
            if (this.tabViewData) {
                for (var tabidx in this.tabViewData) {
                    var tabView = this.tabViewData[tabidx];
                    tabView.setPosition(this.container.x, this.container.y);
                }
            }
            if (this.tabbarBg) {
                this.tabbarBg.y = this.viewBg.y + 62;
                this.tabbarBgLine.y = this.tabbarBg.y + 69 - this.tabbarBgLine.height + 7;
            }
            this.setTabBarPosition();
        }
    };
    PopupView.prototype.setTabBarPosition = function () {
        if (this.tabbarGroup) {
            var tabX = 0;
            var tabY = 0;
            // if(egret.is(this,"PopupView"))
            // {
            // 	if(this.tabbarBg){
            // 		tabX = this.tabbarBg.x + 10;
            // 		tabY = this.tabbarBgLine.y - this.tabbarGroup.height;
            // 	} else{
            // 		tabX=this.viewBg.x+30;
            // 		// tabY=this.viewBg.y+60;
            // 		tabY=this.viewBg.y+75;
            // 	}
            // }
            if (this.tabbarBg) {
                tabX = this.tabbarBg.x + 10;
                tabY = this.tabbarBgLine.y - this.tabbarGroup.height;
            }
            else {
                tabX = this.viewBg.x + 30;
                // tabY=this.viewBg.y+60;
                tabY = this.viewBg.y + 75;
            }
            tabX += this.getTabbarGroupX();
            tabY += this.getTabbarGroupY();
            this.tabbarGroup.setPosition(tabX, tabY);
            if (this.isHaveTabBg() && this.tabbarBg) {
                this.tabbarBg.height = this.viewBg.height - 94;
            }
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
        return "popupview_bg2";
    };
    // 标题背景名称
    PopupView.prototype.getTitleBgName = function () {
        return null;
    };
    // 关闭按钮图标名称
    PopupView.prototype.getCloseBtnName = function () {
        return ButtonConst.POPUP_CLOSE_BTN_1;
    };
    // 确认按钮名称
    PopupView.prototype.getConfirmBtnName = function () {
        return ButtonConst.BTN_TAB;
    };
    PopupView.prototype.getConfirmBtnStr = function () {
        return "";
    };
    PopupView.prototype.dispose = function () {
        if (this._confirmBtn) {
            this.removeChildFromContainer(this._confirmBtn);
            this._confirmBtn.dispose();
            this._confirmBtn = null;
        }
        this.param = null;
        _super.prototype.dispose.call(this);
    };
    return PopupView;
}(BaseView));
__reflect(PopupView.prototype, "PopupView");
