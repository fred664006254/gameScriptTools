var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 皮肤开启光环icon详情面板
 * author wxz
 * date 2020/7/6
 * @class SkinAuraInfoPopupView
 */
var SkinAuraInfoPopupView = /** @class */ (function (_super) {
    __extends(SkinAuraInfoPopupView, _super);
    function SkinAuraInfoPopupView() {
        return _super.call(this) || this;
    }
    SkinAuraInfoPopupView.prototype.getTitleStr = function () {
        return "itemBtn";
    };
    SkinAuraInfoPopupView.prototype.initView = function () {
        var bg = BaseBitmap.create("popupview_itemsbg");
        bg.x = this.viewBg.x + (this.viewBg.width - bg.width) / 2;
        bg.y = 0;
        this.addChildToContainer(bg);
        var servantSkinCfg = Config.ServantskinCfg.getServantSkinItemById(this.param.data);
        if (!servantSkinCfg) {
            return;
        }
        var effectDesc = LanguageManager.getlocal("skinAuraInfoEffect" + servantSkinCfg.specialAuraCfg.auraIcon, [String(Math.floor(servantSkinCfg.specialAuraCfg.specialAuraValue * 100))]);
        var dropDesc = LanguageManager.getlocal("skinAuraInfoDrop" + servantSkinCfg.specialAuraCfg.auraIcon);
        var effectTitle = LanguageManager.getlocal("effectTitle");
        var dropTitle = LanguageManager.getlocal("dropTitle");
        this.titleTF.text = LanguageManager.getlocal("skinAuraInfoTitle" + servantSkinCfg.specialAuraCfg.auraIcon);
        var icon = BaseBitmap.create("servant_aura_Icon" + servantSkinCfg.specialAuraCfg.auraIcon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, icon, bg, [0, 23]);
        this.addChildToContainer(icon);
        var effectTitleTF = ComponentManager.getTextField(effectTitle, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        ;
        effectTitleTF.setColor(TextFieldConst.COLOR_LIGHT_BLACK);
        effectTitleTF.x = bg.x + 23;
        effectTitleTF.y = bg.y + bg.height + 20;
        this.addChildToContainer(effectTitleTF);
        var effectDescTF = ComponentManager.getTextField(effectDesc, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_BLACK);
        effectDescTF.x = effectTitleTF.x + effectTitleTF.width;
        effectDescTF.y = effectTitleTF.y;
        effectDescTF.width = 490 - effectTitleTF.width;
        effectDescTF.lineSpacing = 5;
        this.addChildToContainer(effectDescTF);
        var dropTitleTF = ComponentManager.getTextField(dropTitle, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        ;
        dropTitleTF.setColor(TextFieldConst.COLOR_LIGHT_BLACK);
        dropTitleTF.x = effectTitleTF.x;
        dropTitleTF.y = effectDescTF.y + effectDescTF.textHeight + 17;
        this.addChildToContainer(dropTitleTF);
        var dropDescTF = ComponentManager.getTextField(dropDesc, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_BLACK);
        dropDescTF.x = dropTitleTF.x + dropTitleTF.width;
        dropDescTF.y = dropTitleTF.y;
        dropDescTF.width = 495 - dropTitleTF.width;
        dropDescTF.lineSpacing = 5;
        this.addChildToContainer(dropDescTF);
    };
    SkinAuraInfoPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        var kuang = BaseBitmap.create("popup_frame1");
        kuang.width = 530;
        kuang.x = 46;
        kuang.height = this.viewBg.height - 100;
        this.container.addChildAt(kuang, 0);
    };
    // 计算背景高度时使用，在container高度的基础上添加该高度
    SkinAuraInfoPopupView.prototype.getBgExtraHeight = function () {
        return 90;
    };
    SkinAuraInfoPopupView.prototype.getBgName = function () {
        return "popupview_bg3";
    };
    SkinAuraInfoPopupView.prototype.getCloseBtnName = function () {
        return "popupview_closebtn2";
    };
    SkinAuraInfoPopupView.prototype.isTouchMaskClose = function () {
        return true;
    };
    SkinAuraInfoPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["popupview_itemsbg", "popup_frame1"]);
    };
    SkinAuraInfoPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return SkinAuraInfoPopupView;
}(PopupView));
//# sourceMappingURL=SkinAuraInfoPopupView.js.map