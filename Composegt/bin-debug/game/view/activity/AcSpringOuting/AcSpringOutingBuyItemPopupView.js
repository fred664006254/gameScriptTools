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
var AcSpringOutingBuyItemPopupView = (function (_super) {
    __extends(AcSpringOutingBuyItemPopupView, _super);
    function AcSpringOutingBuyItemPopupView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcSpringOutingBuyItemPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcSpringOutingView.AID, AcSpringOutingView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    AcSpringOutingBuyItemPopupView.prototype.isShowOpenAni = function () {
        return false;
    };
    //初始化view
    AcSpringOutingBuyItemPopupView.prototype.initView = function () {
        //背景
        var bg = BaseBitmap.create("public_tc_bg01"); //public_tc_bg03
        bg.width = 520;
        bg.height = 224;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 9;
        this.addChildToContainer(bg);
        var innerBg = BaseBitmap.create("public_tc_bg03");
        innerBg.width = 500;
        innerBg.height = 204;
        innerBg.x = this.viewBg.width / 2 - innerBg.width / 2;
        innerBg.y = bg.y + bg.height / 2 - innerBg.height / 2;
        this.addChildToContainer(innerBg);
        var iconScale = 0.6;
        var text1 = ComponentManager.getTextField(LanguageManager.getlocal("acSpringOutingWarnText1"), 20, TextFieldConst.COLOR_BROWN);
        var icon1 = null;
        var icon2 = null;
        if (PlatformManager.checkIsKRSp() || PlatformManager.checkIsKRNewSp()) {
            icon1 = BaseBitmap.create("");
            icon2 = BaseBitmap.create("");
        }
        else {
            icon1 = BaseBitmap.create(this.getDefaultRes("acspringouting_icon"));
            icon2 = BaseBitmap.create(this.getDefaultRes("acspringouting_icon"));
        }
        icon1.setScale(iconScale);
        text1.x = this.viewBg.width / 2 - (text1.width + icon1.width * iconScale) / 2;
        text1.y = this.viewBg.y + 70;
        icon1.x = text1.x + text1.width;
        icon1.y = text1.y + text1.height / 2 - icon1.height * iconScale / 2;
        this.addChildToContainer(text1);
        this.addChildToContainer(icon1);
        var text2 = ComponentManager.getTextField(LanguageManager.getlocal("acSpringOutingWarnText2", [this.cfg.getRechargeCost() + "", "1"]), 20, TextFieldConst.COLOR_BROWN);
        icon2.setScale(iconScale);
        text2.x = this.viewBg.width / 2 - (text2.width + icon2.width * iconScale) / 2;
        text2.y = text1.y + 50;
        icon2.x = text2.x + text2.width;
        icon2.y = text2.y + text2.height / 2 - icon2.height * iconScale / 2;
        this.addChildToContainer(text2);
        this.addChildToContainer(icon2);
        var text3 = ComponentManager.getTextField(LanguageManager.getlocal("acSpringOutingWarnText3"), 20, TextFieldConst.COLOR_BROWN);
        text3.x = this.viewBg.width / 2 - text3.width / 2;
        text3.y = text2.y + 50;
        this.addChildToContainer(text3);
        //取消按钮
        this._cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_BLUE, "cancelBtn", this.clickCancelHandler, this);
        this._cancelBtn.x = innerBg.x + 40;
        this._cancelBtn.y = bg.y + bg.height + 15;
        this.addChildToContainer(this._cancelBtn);
        this._conBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm", this.clickConfirmHandler, this);
        this._conBtn.x = innerBg.x + innerBg.width - 40 - this._conBtn.width;
        this._conBtn.y = bg.y + bg.height + 15;
        this.addChildToContainer(this._conBtn);
    };
    //根据资源名字得到完整资源名字
    AcSpringOutingBuyItemPopupView.prototype.getDefaultRes = function (resName, defaultCode) {
        defaultCode = defaultCode || "1";
        if (ResourceManager.hasRes(resName + "-" + AcSpringOutingView.CODE)) {
            return resName + "-" + AcSpringOutingView.CODE;
        }
        else {
            return resName + "-" + defaultCode;
        }
    };
    AcSpringOutingBuyItemPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width / 4 * 3 - this._cancelBtn.width / 2 - 35, this._cancelBtn.y);
    };
    AcSpringOutingBuyItemPopupView.prototype.clickConfirmHandler = function (data) {
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
        this.hide();
    };
    // protected getConfirmBtnStr():string
    // {
    // 	return "sysConfirm";
    // }
    // protected getContainerY():number
    // {
    // 	return 0;
    // }
    AcSpringOutingBuyItemPopupView.prototype.clickCancelHandler = function (param) {
        this.hide();
    };
    AcSpringOutingBuyItemPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    //显示的title
    AcSpringOutingBuyItemPopupView.prototype.getTitleStr = function () {
        return "rechargeVipViewTitle";
    };
    AcSpringOutingBuyItemPopupView.prototype.dispose = function () {
        this._cancelBtn = null;
        this._conBtn = null;
        _super.prototype.dispose.call(this);
    };
    return AcSpringOutingBuyItemPopupView;
}(PopupView));
__reflect(AcSpringOutingBuyItemPopupView.prototype, "AcSpringOutingBuyItemPopupView");
