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
 * 未迎娶wifeitem
 * author dmj
 * date 2017/10/9
 * @class WifeScrollItem2
 */
var WifeScrollItem2 = (function (_super) {
    __extends(WifeScrollItem2, _super);
    function WifeScrollItem2() {
        return _super.call(this) || this;
    }
    WifeScrollItem2.prototype.initItem = function (index, wifeItemCfg, param) {
        this.width = 640;
        this.height = 321 + this.getSpaceY();
        var nameBg = BaseBitmap.create("wifeview_itembg");
        var isblue = param;
        // if(isblue){
        // 	nameBg.setRes(`wifeview_itembg_${isblue == 0 ? "female" : "male"}`);
        // }
        nameBg.width = this.width;
        this.addChild(nameBg);
        // let wifeBg = "wifeview_bg" + (index%5 + 1);
        // let bg:BaseBitmap = BaseLoadBitmap.create(wifeBg);
        // this.addChild(bg);
        // bg.x = 66;
        // bg.y = nameBg.height/2 - 211/2
        var iconstr = "";
        var namestr = "";
        var descstr = "";
        if (isblue && wifeItemCfg.canBlueWife) {
            iconstr = "wife_full_" + wifeItemCfg.id + "_male";
            namestr = "wifeName_" + wifeItemCfg.id + "_male";
            descstr = "wifeDesc_" + wifeItemCfg.id + "_male";
        }
        else {
            iconstr = "wife_full_" + wifeItemCfg.id;
            namestr = "wifeName_" + wifeItemCfg.id;
            descstr = "wifeDesc_" + wifeItemCfg.id;
        }
        var icon = BaseLoadBitmap.create(iconstr);
        icon.x = 60;
        //todo icon的宽高尺寸需要固定
        icon.y = 0;
        this.addChild(icon);
        icon.setScale(0.35);
        // let mask = new egret.Shape(0, 0, 500, 740);
        // let mask = new egret.Circle
        // icon.mask = mask;
        var nameBg2 = BaseBitmap.create("wifeview_itembg2");
        nameBg2.width = this.width;
        this.addChild(nameBg2);
        var name = LanguageManager.getlocal(namestr);
        var nameTF = ComponentManager.getTextField(name, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        //横版名字变竖版名字
        if (PlatformManager.checkIsTextHorizontal()) {
            var nameBackground = BaseBitmap.create("wifeview_namebg");
            nameBackground.width = nameTF.width + 40;
            nameBackground.height = 51;
            nameBackground.x = 171; //nameBg.x + nameBg.width/2 ;
            nameBackground.y = 275; //nameBg.y + nameBg.height-50;
            nameBackground.anchorOffsetX = nameBackground.width / 2;
            nameBackground.anchorOffsetY = nameBackground.height / 2;
            nameTF.x = nameBackground.x - nameTF.width / 2;
            nameTF.y = nameBackground.y - nameTF.height / 2;
            this.addChild(nameBackground);
        }
        else {
            nameTF.width = 27;
            nameTF.x = 29;
            nameTF.y = nameBg.y + 282 / 2 - nameTF.height / 2;
        }
        this.addChild(nameTF);
        // let mask:BaseBitmap = BaseBitmap.create("wifeview_unlockmask");
        // mask.x = 0;
        // mask.y = 0;
        // this.addChild(mask);
        var unlockTFTitle = ComponentManager.getTextField(LanguageManager.getlocal("wifeUnlock_title"), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        // unlockTFTitle.width = 150;
        unlockTFTitle.x = 350;
        unlockTFTitle.y = 50;
        this.addChild(unlockTFTitle);
        var lockBg = BaseBitmap.create("wifeview_lockbg");
        this.addChild(lockBg);
        lockBg.x = unlockTFTitle.x - 30;
        lockBg.y = unlockTFTitle.y + unlockTFTitle.height + 5;
        var unlockTF = ComponentManager.getTextField(wifeItemCfg.wifeunlock, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_WARN_RED3);
        // unlockTF.width = 150;
        unlockTF.x = unlockTFTitle.x;
        unlockTF.y = lockBg.y + lockBg.height / 2 - unlockTF.height / 2;
        this.addChild(unlockTF);
        var desc = LanguageManager.getlocal(descstr);
        var descTF = ComponentManager.getTextField(desc, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTF.width = 255;
        descTF.x = unlockTFTitle.x;
        descTF.y = lockBg.y + lockBg.height + 10;
        this.addChild(descTF);
    };
    WifeScrollItem2.prototype.getSpaceY = function () {
        return 10;
    };
    WifeScrollItem2.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return WifeScrollItem2;
}(ScrollListItem));
__reflect(WifeScrollItem2.prototype, "WifeScrollItem2");
//# sourceMappingURL=WifeScrollItem2.js.map