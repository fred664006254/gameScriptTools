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
    ItemInfoPopupView.prototype.getBgExtraHeight = function () {
        return 30;
    };
    ItemInfoPopupView.prototype.initView = function () {
        var bg = BaseBitmap.create("public_9v_bg12");
        bg.width = 520;
        bg.height = 350;
        // bg.x = GameConfig.stageWidth/2 - bg.width/2 - 11; //GameConfig.stageWidth/2 - bg.width/2;
        bg.x = this.viewBg.width / 2 - bg.width / 2;
        bg.y = 15; //65-this.getContainerY();
        this.addChildToContainer(bg);
        // this.addChild(bg);
        // let innerBg = BaseBitmap.create("public_tc_bg03");
        // innerBg.width = 480;
        // innerBg.height = 150;
        // innerBg.x = this.viewBg.width/2 - innerBg.width/2;
        // innerBg.y = 20;
        // this.addChildToContainer(innerBg);
        // let leftF = BaseBitmap.create("public_tcdw_bg01");
        // leftF.x = innerBg.x + 5 ;
        // leftF.y = 20;
        // this.addChildToContainer(leftF);
        // let rightF = BaseBitmap.create("public_tcdw_bg02");
        // rightF.x = innerBg.x + innerBg.width - rightF.width - 5 ;
        // rightF.y = 20;
        // this.addChildToContainer(rightF);
        var itemB = BaseBitmap.create("itemview_daoju_bg02");
        itemB.x = this.viewBg.width / 2 - itemB.width / 2;
        itemB.y = bg.y + 5;
        this.addChildToContainer(itemB);
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
        this.titleTF.text = itemName;
        var icon = GameData.getItemIcon(itemCfg, false);
        var numLb = icon.getChildByName("numLb");
        if (numLb) {
            numLb.visible = false;
        }
        var temX = itemB.x + itemB.width / 2 - 50 - 2;
        var temY = itemB.y + itemB.height / 2 - 50;
        var temW = 100;
        var temH = 100;
        // icon.x =  this.viewBg.width/2 - icon.width/2;
        // icon.y = 40;
        icon.x = temX;
        icon.y = temY;
        this.addChildToContainer(icon);
        // let bg1:BaseBitmap = BaseBitmap.create("public_9_bg1");
        // bg1.width = 370;
        // bg1.height = icon.height + 30;
        // bg1.x = icon.x + icon.width + 5;
        // bg1.y = icon.y - 15;
        // this.addChildToContainer(bg1);
        // let nameTF:BaseTextField = new BaseTextField();
        // nameTF.text = itemName;
        // nameTF.setColor(TextFieldConst.COLOR_LIGHT_RED);
        // nameTF.x = bg1.x + bg1.width/2 - nameTF.width/2;
        // nameTF.y = bg1.y + bg1.height/2 - nameTF.height/2;
        // this.addChildToContainer(nameTF);
        var effectTitleTF = ComponentManager.getTextField(effectTitle, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
        ;
        this.addChildToContainer(effectTitleTF);
        var effectDescTF = ComponentManager.getTextField(effectDesc, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
        if (effectTitleTF.width + effectDescTF.width > 480) {
            effectDescTF.width = 480 - effectTitleTF.width;
        }
        effectDescTF.lineSpacing = 5;
        this.addChildToContainer(effectDescTF);
        var dropTitleTF = ComponentManager.getTextField(dropTitle, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
        ;
        this.addChildToContainer(dropTitleTF);
        var dropDescTF = ComponentManager.getTextField(dropDesc, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
        if (dropTitleTF.width + dropDescTF.width > 480) {
            dropDescTF.width = 480 - dropTitleTF.width;
        }
        dropDescTF.lineSpacing = 5;
        this.addChildToContainer(dropDescTF);
        var baseWidth = 0;
        if (effectTitleTF.width + effectDescTF.width >= dropTitleTF.width + dropDescTF.width) {
            baseWidth = effectTitleTF.width + effectDescTF.width;
        }
        else {
            baseWidth = dropTitleTF.width + dropDescTF.width;
        }
        effectTitleTF.x = this.viewBg.width / 2 - baseWidth / 2;
        effectDescTF.x = effectTitleTF.x + effectTitleTF.width;
        effectTitleTF.y = temY + temH + 45; //itemB.y + itemB.height + 15;
        effectDescTF.y = effectTitleTF.y;
        dropTitleTF.x = this.viewBg.width / 2 - baseWidth / 2;
        dropDescTF.x = dropTitleTF.x + dropTitleTF.width;
        dropTitleTF.y = effectDescTF.y + effectDescTF.height + 5;
        dropDescTF.y = dropTitleTF.y;
    };
    ItemInfoPopupView.prototype.isTouchMaskClose = function () {
        return true;
    };
    ItemInfoPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["itemview_daoju_bg02"]);
    };
    ItemInfoPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return ItemInfoPopupView;
}(PopupView));
__reflect(ItemInfoPopupView.prototype, "ItemInfoPopupView");
