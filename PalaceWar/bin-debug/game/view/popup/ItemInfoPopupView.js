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
 * 道具详情弹板
 * author dmj
 * date 2017/9/19
 * @class ItemInfoPopupView
 */
var ItemInfoPopupView = (function (_super) {
    __extends(ItemInfoPopupView, _super);
    function ItemInfoPopupView() {
        return _super.call(this) || this;
    }
    ItemInfoPopupView.prototype.getTitleStr = function () {
        return "itemBtn";
    };
    ItemInfoPopupView.prototype.initView = function () {
        var bg = BaseBitmap.create("popupview_itemsbg");
        bg.x = this.viewBg.x + (this.viewBg.width - bg.width) / 2;
        bg.y = 0;
        this.addChildToContainer(bg);
        var itemCfg = null;
        if (typeof (this.param.data) == "string" || typeof (this.param.data) == "number") {
            itemCfg = Config.ItemCfg.getItemCfgById(Number(this.param.data));
            if (!itemCfg) {
                App.LogUtil.show("调用道具详情界面清传入道具id或者传入RewardItemVo");
                return;
            }
        }
        else if (this.param.data instanceof RewardItemVo) {
            itemCfg = this.param.data;
        }
        else if (this.param.data.dType && this.param.data.dType == "json") {
            itemCfg = this.param.data;
        }
        else {
            App.LogUtil.show("调用道具详情界面清传入道具id或者传入RewardItemVo");
            return;
        }
        var itemName = itemCfg.name;
        var iconPic = itemCfg.icon;
        var effectDesc = itemCfg.desc;
        var dropDesc = itemCfg.dropDesc;
        var effectTitle = LanguageManager.getlocal("effectTitle");
        var dropTitle = LanguageManager.getlocal("dropTitle");
        if (PlatformManager.checkIsRuSp() || PlatformManager.checkIsEnSp()) {
            effectTitle = itemName + ": ";
        }
        else {
            this.titleTF.text = itemName;
        }
        var icon = GameData.getItemIcon(itemCfg, false);
        var numLb = icon.getChildByName("numLb");
        if (numLb) {
            numLb.visible = false;
        }
        if (icon.getChildByName("numbg")) {
            icon.getChildByName("numbg").visible = false;
        }
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
        // if ((effectDescTF.y+effectDescTF.height)>100)
        // {
        // 	dropTitleTF.y = effectDescTF.y+effectDescTF.height+12;
        // }
        var dropDescTF = ComponentManager.getTextField(dropDesc, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_BLACK);
        dropDescTF.x = dropTitleTF.x + dropTitleTF.width;
        dropDescTF.y = dropTitleTF.y;
        dropDescTF.width = 495 - dropTitleTF.width;
        dropDescTF.lineSpacing = 5;
        this.addChildToContainer(dropDescTF);
    };
    ItemInfoPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        var kuang = BaseBitmap.create("popup_frame1");
        kuang.width = 530;
        kuang.x = 46;
        kuang.height = this.viewBg.height - 100;
        this.container.addChildAt(kuang, 0);
    };
    // 计算背景高度时使用，在container高度的基础上添加该高度
    ItemInfoPopupView.prototype.getBgExtraHeight = function () {
        return 90;
    };
    ItemInfoPopupView.prototype.getBgName = function () {
        return "popupview_bg3";
    };
    ItemInfoPopupView.prototype.getCloseBtnName = function () {
        return "popupview_closebtn2";
    };
    ItemInfoPopupView.prototype.isTouchMaskClose = function () {
        return true;
    };
    ItemInfoPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["popupview_itemsbg", "popup_frame1"]);
    };
    ItemInfoPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return ItemInfoPopupView;
}(PopupView));
__reflect(ItemInfoPopupView.prototype, "ItemInfoPopupView");
//# sourceMappingURL=ItemInfoPopupView.js.map