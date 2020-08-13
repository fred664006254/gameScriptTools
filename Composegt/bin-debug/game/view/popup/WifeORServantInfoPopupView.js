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
 * 门客，红颜详情弹板
 * author yanyuling
 * date 2018/04/16
 * @class WifeORServantInfoPopupView
 */
var WifeORServantInfoPopupView = (function (_super) {
    __extends(WifeORServantInfoPopupView, _super);
    function WifeORServantInfoPopupView() {
        return _super.call(this) || this;
    }
    WifeORServantInfoPopupView.prototype.initView = function () {
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 390;
        bg.height = 200;
        bg.x = 158;
        bg.y = 70 - this.getContainerY();
        this.addChildToContainer(bg);
        var wifeId = this.param.data.wifeId;
        var servantId = this.param.data.servantId;
        var itemName = "";
        var iconPic = "";
        var effectDesc = "";
        var dropDesc = "";
        var effectTitle = LanguageManager.getlocal("practice_descTxt");
        var dropTitle = LanguageManager.getlocal("dropTitle");
        if (wifeId) {
            var wifecfg = Config.WifeCfg.getWifeCfgById(wifeId);
            itemName = wifecfg.name;
            iconPic = wifecfg.icon;
            effectDesc = wifecfg.desc;
            dropDesc = LanguageManager.getlocal("wifeDropDesc_" + wifeId);
        }
        else if (servantId) {
            var servantcfg = Config.ServantCfg.getServantItemById(servantId);
            itemName = servantcfg.name;
            iconPic = servantcfg.halfIcon;
            effectDesc = servantcfg.story;
            dropDesc = LanguageManager.getlocal("servantDropDesc_" + servantId);
        }
        var iconBg = BaseBitmap.create("itembg_3");
        var detalS = 1.2;
        iconBg.x = 30;
        iconBg.y = 25;
        this.addChildToContainer(iconBg);
        var iconImg = BaseLoadBitmap.create(iconPic);
        iconImg.width = 100;
        iconImg.height = 100;
        iconImg.x = iconBg.x + iconBg.width / 2 - iconImg.width / 2;
        iconImg.y = iconBg.y + iconBg.height / 2 - iconImg.height / 2 - 2;
        this.addChildToContainer(iconImg);
        this.titleTF.text = itemName;
        var effectTitleTF = ComponentManager.getTextField(effectTitle, TextFieldConst.FONTSIZE_CONTENT_SMALL, 0xfcf3b4);
        // effectTitleTF.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
        effectTitleTF.x = 171;
        effectTitleTF.y = 29 + 8;
        this.addChildToContainer(effectTitleTF);
        var effectDescTF = ComponentManager.getTextField(effectDesc, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        effectDescTF.x = effectTitleTF.x + effectTitleTF.width;
        effectDescTF.y = effectTitleTF.y;
        effectDescTF.width = 310;
        this.addChildToContainer(effectDescTF);
        bg.height = effectDescTF.y + effectDescTF.height + 80 - bg.y;
        if (bg.height < 200) {
            bg.height = 200;
        }
        var dropTitleTF = ComponentManager.getTextField(dropTitle, TextFieldConst.FONTSIZE_CONTENT_SMALL, 0xfcf3b4);
        // dropTitleTF.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
        dropTitleTF.x = effectTitleTF.x;
        dropTitleTF.y = bg.y + bg.height - 50;
        this.addChildToContainer(dropTitleTF);
        var dropDescTF = ComponentManager.getTextField(dropDesc, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        dropDescTF.x = dropTitleTF.x + dropTitleTF.width;
        dropDescTF.y = dropTitleTF.y;
        dropDescTF.width = 310;
        this.addChildToContainer(dropDescTF);
    };
    WifeORServantInfoPopupView.prototype.isTouchMaskClose = function () {
        return true;
    };
    WifeORServantInfoPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    WifeORServantInfoPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return WifeORServantInfoPopupView;
}(PopupView));
__reflect(WifeORServantInfoPopupView.prototype, "WifeORServantInfoPopupView");
