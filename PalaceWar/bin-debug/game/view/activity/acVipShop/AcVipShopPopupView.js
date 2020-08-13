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
var AcVipShopPopupView = (function (_super) {
    __extends(AcVipShopPopupView, _super);
    function AcVipShopPopupView() {
        var _this = _super.call(this) || this;
        _this.rewardArrList = [];
        return _this;
    }
    AcVipShopPopupView.prototype.getBgName = function () {
        return "public_9_wordbg";
    };
    AcVipShopPopupView.prototype.getTitleBgName = function () {
        return null;
    };
    AcVipShopPopupView.prototype.getTitle = function () {
        return null;
    };
    AcVipShopPopupView.prototype.isTouchMaskClose = function () {
        return true;
    };
    AcVipShopPopupView.prototype.initView = function () {
        var simg = BaseLoadBitmap.create("acvipbg_" + this.param.data.code);
        simg.x = 10;
        simg.scaleX = 0.4;
        simg.scaleY = 0.4;
        simg.y = -240;
        this.addChildToContainer(simg);
        //文字描述1
        var speadkDes = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        var str = LanguageManager.getlocal("vipshopbuydes1_" + this.param.data.code);
        speadkDes.width = 310;
        speadkDes.height = 54;
        speadkDes.text = str;
        speadkDes.x = 270;
        speadkDes.y = this.viewBg.y - 70;
        this.addChildToContainer(speadkDes);
        var speadkDes2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN);
        var str2 = LanguageManager.getlocal("vipshopbuydes2");
        speadkDes2.width = 320;
        speadkDes2.height = 54;
        speadkDes2.text = str2;
        speadkDes2.x = 300;
        speadkDes2.y = speadkDes.y + 60;
        this.addChildToContainer(speadkDes2);
        var goToRechargeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "vipshopbtn", this.clickBtnHandler, this);
        goToRechargeBtn.x = this.viewBg.width / 2 - goToRechargeBtn.width / 2 + 100;
        goToRechargeBtn.y = this.viewBg.y + 35;
        this.addChildToContainer(goToRechargeBtn);
    };
    AcVipShopPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.viewBg.height = 200;
        this.viewBg.y = this.viewBg.y - 100;
        this.closeBtn.y = this.viewBg.y - 30;
        this.closeBtn.x = this.closeBtn.x - 20;
        this.titleTF.visible = false;
    };
    AcVipShopPopupView.prototype.clickBtnHandler = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
        ViewController.getInstance().hideView(ViewConst.POPUP.ACVIPSHOPPOPUPVIEW);
        //  ViewController.getInstance().hideView(ViewConst.COMMON.ACVIPSHOPVIEW);
    };
    AcVipShopPopupView.prototype.touchHandler = function () {
        ViewController.getInstance().hideView(ViewConst.POPUP.ACVIPSHOPPOPUPVIEW);
    };
    AcVipShopPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AcVipShopPopupView.prototype.dispose = function () {
        this._scrollList = null;
        this.rewardArrList = [];
        _super.prototype.dispose.call(this);
    };
    return AcVipShopPopupView;
}(PopupView));
__reflect(AcVipShopPopupView.prototype, "AcVipShopPopupView");
//# sourceMappingURL=AcVipShopPopupView.js.map