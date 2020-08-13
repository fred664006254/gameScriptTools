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
 * 	圣诞活动二级弹框
 * author 张朝阳
 * date 2018/12/10
 * @class AcChristmasConfirmPopupView
 */
var AcChristmasConfirmPopupView = (function (_super) {
    __extends(AcChristmasConfirmPopupView, _super);
    function AcChristmasConfirmPopupView() {
        return _super.call(this) || this;
    }
    AcChristmasConfirmPopupView.prototype.initView = function () {
        var _this = this;
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 530;
        bg.height = 150;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 20);
        this.addChildToContainer(bg);
        var desc1 = ComponentManager.getTextField(LanguageManager.getlocal("acChristmasConfirmPopupViewDesc1"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        desc1.lineSpacing = 3;
        desc1.setPosition(bg.x + bg.width / 2 - desc1.width / 2 - 10, bg.y + 30);
        this.addChildToContainer(desc1);
        var starScale = 0.48;
        if (this.isValentines() || this.getUiCode()) {
            starScale = 0.6;
        }
        else if (this.getTypeCode() == "8") {
            starScale = 0.3;
        }
        var descstar = BaseBitmap.create(this.getItemName());
        descstar.setScale(starScale);
        descstar.setPosition(desc1.x + desc1.width, desc1.y + desc1.height / 2 - descstar.height * starScale / 2);
        this.addChildToContainer(descstar);
        if (this.getTypeCode() == "8") {
            descstar.y = desc1.y + desc1.height / 2 - descstar.height * starScale / 2 - 5;
        }
        var desc2Str = LanguageManager.getlocal("acChristmasConfirmPopupViewDesc2");
        if (this.isValentines() || this.getUiCode() || this.isMagpieBridge() || this.getTypeCode() == "8") {
            desc2Str = LanguageManager.getlocal("acChristmasConfirmPopupViewDesc2_" + this.param.data.code);
        }
        var desc2 = ComponentManager.getTextField(desc2Str, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        desc2.lineSpacing = 3;
        desc2.width = 500;
        desc2.textAlign = egret.HorizontalAlign.CENTER;
        desc2.setPosition(bg.x + bg.width / 2 - desc2.width / 2, desc1.y + desc1.height + 5);
        this.addChildToContainer(desc2);
        var cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "cancelBtn", this.hide, this);
        cancelBtn.setPosition(this.viewBg.x + 90, bg.y + bg.height + 17);
        this.addChildToContainer(cancelBtn);
        var confirmBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acChristmasConfirmPopupViewBtn", function () {
            ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
            _this.hide();
        }, this);
        confirmBtn.setPosition(this.viewBg.x + this.viewBg.width - confirmBtn.width - 90, bg.y + bg.height + 17);
        this.addChildToContainer(confirmBtn);
    };
    AcChristmasConfirmPopupView.prototype.getShowHeight = function () {
        return 310;
    };
    /**道具item名字 */
    AcChristmasConfirmPopupView.prototype.getItemName = function () {
        var itemName = "acchristmasview_star";
        if (this.isValentines()) {
            itemName = "acchristmasview_star_" + this.isValentines();
        }
        else if (this.getUiCode()) {
            itemName = "acchristmasview_star_" + this.getUiCode();
        }
        else if (this.isMagpieBridge()) {
            itemName = "acchristmasview_star_" + this.isMagpieBridge();
        }
        else if (this.getTypeCode() == "8") {
            itemName = "acchristmasview_itemiconstar_" + this.getTypeCode();
        }
        return itemName;
    };
    /**是否情人节 */
    AcChristmasConfirmPopupView.prototype.isValentines = function () {
        if (this.param.data.code == "3" || this.param.data.code == "4") {
            return "3";
        }
        return null;
    };
    AcChristmasConfirmPopupView.prototype.getUiCode = function () {
        if (this.param.data.code == "5") {
            return "5";
        }
        return null;
    };
    /**是否为鹊桥相会 7泰国*/
    AcChristmasConfirmPopupView.prototype.isMagpieBridge = function () {
        if (this.param.data.code == "6" || this.param.data.code == "7") {
            return "6";
        }
        return null;
    };
    AcChristmasConfirmPopupView.prototype.getTypeCode = function () {
        if (this.param.data.code == "9" || this.param.data.code == "10") {
            return "8";
        }
        return this.param.data.code;
    };
    AcChristmasConfirmPopupView.prototype.getResourceList = function () {
        var list = [];
        if (this.getTypeCode() == "8") {
            list = [
                "acchristmasview_itemiconstar_8",
            ];
        }
        return _super.prototype.getResourceList.call(this).concat([]).concat(list);
    };
    AcChristmasConfirmPopupView.prototype.getTitleStr = function () {
        return "acChristmasConfirmPopupViewTitle";
    };
    AcChristmasConfirmPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcChristmasConfirmPopupView;
}(PopupView));
__reflect(AcChristmasConfirmPopupView.prototype, "AcChristmasConfirmPopupView");
//# sourceMappingURL=AcChristmasConfirmPopupView.js.map