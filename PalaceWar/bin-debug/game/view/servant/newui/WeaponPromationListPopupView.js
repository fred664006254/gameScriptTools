/**
 * 加工详情列表
 * author shaoliang
 * date 2019/8/6
 * @class WeaponPromationListPopupView
 */
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
var WeaponPromationListPopupView = (function (_super) {
    __extends(WeaponPromationListPopupView, _super);
    function WeaponPromationListPopupView() {
        return _super.call(this) || this;
    }
    WeaponPromationListPopupView.prototype.getTitleStr = function () {
        return "weapon_promotion_title";
    };
    WeaponPromationListPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "weapon_attr_color_bg",
        ]);
    };
    WeaponPromationListPopupView.prototype.initView = function () {
        var desc = ComponentManager.getTextField(LanguageManager.getlocal("weapon_promotion_desc"), 20, TextFieldConst.COLOR_BROWN);
        desc.width = 500;
        desc.lineSpacing = 5;
        desc.setPosition(this.viewBg.width / 2 - 250, 10);
        this.addChildToContainer(desc);
        var desc2 = ComponentManager.getTextField(LanguageManager.getlocal("weapon_promotion_follow"), 20, TextFieldConst.COLOR_BROWN);
        desc2.width = 500;
        desc2.lineSpacing = 5;
        desc2.setPosition(desc.x, desc.y + desc.height + 6);
        this.addChildToContainer(desc2);
        var listbg = BaseBitmap.create("public_9_bg36");
        listbg.width = 524;
        listbg.setPosition(this.viewBg.width / 2 - listbg.width / 2, desc2.y + desc2.height + 10);
        listbg.height = this.getShowHeight() - listbg.y - 80;
        this.addChildToContainer(listbg);
        var mask = BaseBitmap.create("public_9_bg37");
        mask.width = listbg.width + 3;
        mask.height = 40;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, mask, listbg);
        this.addChildToContainer(mask);
        var posy = mask.y + mask.height / 2;
        var view = this;
        var title1Text = ComponentManager.getTextField(LanguageManager.getlocal("weapon_promotion_name1"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        title1Text.width = 108;
        title1Text.setPosition(23 + GameData.popupviewOffsetX, posy - title1Text.height / 2 + 5);
        title1Text.textAlign = egret.HorizontalAlign.CENTER;
        view.addChildToContainer(title1Text);
        var title2Text = ComponentManager.getTextField(LanguageManager.getlocal("weapon_speciality_name1"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        title2Text.width = 76;
        title2Text.setPosition(140 + GameData.popupviewOffsetX, posy - title2Text.height / 2 + 5);
        title2Text.textAlign = egret.HorizontalAlign.CENTER;
        view.addChildToContainer(title2Text);
        var title3Text = ComponentManager.getTextField(LanguageManager.getlocal("weapon_speciality_name2"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        title3Text.width = 76;
        title3Text.setPosition(140 + 76 + GameData.popupviewOffsetX, posy - title3Text.height / 2 + 5);
        title3Text.textAlign = egret.HorizontalAlign.CENTER;
        view.addChildToContainer(title3Text);
        var title4Text = ComponentManager.getTextField(LanguageManager.getlocal("weapon_speciality_name3"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        title4Text.width = 76;
        title4Text.setPosition(140 + 76 * 2 + GameData.popupviewOffsetX, posy - title4Text.height / 2 + 5);
        title4Text.textAlign = egret.HorizontalAlign.CENTER;
        view.addChildToContainer(title4Text);
        var title5Text = ComponentManager.getTextField(LanguageManager.getlocal("weapon_speciality_name4"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        title5Text.width = 76;
        title5Text.setPosition(140 + 76 * 3 + GameData.popupviewOffsetX, posy - title5Text.height / 2 + 5);
        title5Text.textAlign = egret.HorizontalAlign.CENTER;
        view.addChildToContainer(title5Text);
        var title6Text = ComponentManager.getTextField(LanguageManager.getlocal("weapon_promotion_name6"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        title6Text.width = 96;
        title6Text.setPosition(140 + 76 * 4 + GameData.popupviewOffsetX, posy - title6Text.height / 2 + 5);
        title6Text.textAlign = egret.HorizontalAlign.CENTER;
        view.addChildToContainer(title6Text);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 530, listbg.height - 50);
        var weaponId = this.param.data;
        var weaponCfg = Config.ServantweaponCfg.getWeaponItemById(weaponId);
        var scrollList = ComponentManager.getScrollList(WeaponPromationListItem, weaponCfg.getPromationList(), rect);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, mask, [1, mask.height]);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        view.addChildToContainer(scrollList);
    };
    WeaponPromationListPopupView.prototype.getShowHeight = function () {
        return 800;
    };
    return WeaponPromationListPopupView;
}(PopupView));
__reflect(WeaponPromationListPopupView.prototype, "WeaponPromationListPopupView");
//# sourceMappingURL=WeaponPromationListPopupView.js.map