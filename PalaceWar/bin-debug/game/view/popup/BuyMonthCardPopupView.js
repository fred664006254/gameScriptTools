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
var BuyMonthCardPopupView = (function (_super) {
    __extends(BuyMonthCardPopupView, _super);
    function BuyMonthCardPopupView() {
        return _super.call(this) || this;
    }
    BuyMonthCardPopupView.prototype.getBgName = function () {
        return "popupview_bg2";
    };
    BuyMonthCardPopupView.prototype.getTitleStr = function () {
        return "itemUseConstPopupViewTitle";
    };
    BuyMonthCardPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "popupview_bg2",
        ]);
    };
    BuyMonthCardPopupView.prototype.initView = function () {
        var _this = this;
        NetManager.request(NetRequestConst.REQUEST_SHOP_SHOWMONTHCARDNOTICE, {});
        var descbg = BaseBitmap.create("public_9_bg8");
        descbg.width = 520;
        descbg.height = 120;
        descbg.setPosition(this.viewBg.width / 2 - descbg.width / 2, 55);
        this.addChildToContainer(descbg);
        var desc = ComponentManager.getTextField(LanguageManager.getlocal("buymonthcarddesc"), 20, TextFieldConst.COLOR_BLACK);
        desc.width = descbg.width - 60;
        desc.lineSpacing = 4;
        desc.textAlign = egret.HorizontalAlign.CENTER;
        desc.setPosition(descbg.x + 30, descbg.y + 20);
        this.addChildToContainer(desc);
        var cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "cancelBtn", this.hide, this);
        cancelBtn.setPosition(this.viewBg.x + 80, descbg.y + descbg.height + 12);
        this.addChildToContainer(cancelBtn);
        var confirmBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acChristmasConfirmPopupViewBtn", function () {
            ViewController.getInstance().openView(ViewConst.COMMON.WELFAREVIEWMONTHCARD);
            _this.hide();
        }, this);
        confirmBtn.setPosition(this.viewBg.x + this.viewBg.width - confirmBtn.width - 80, descbg.y + descbg.height + 12);
        this.addChildToContainer(confirmBtn);
    };
    BuyMonthCardPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.titleTF.y = this.viewBg.y + 12;
        this.titleTF.setColor(0x3e1f0f);
    };
    BuyMonthCardPopupView.prototype.getBgExtraHeight = function () {
        return 20;
    };
    BuyMonthCardPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return BuyMonthCardPopupView;
}(PopupView));
__reflect(BuyMonthCardPopupView.prototype, "BuyMonthCardPopupView");
//# sourceMappingURL=BuyMonthCardPopupView.js.map