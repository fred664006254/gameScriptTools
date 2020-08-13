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
var AtkraceSelectCardItem = (function (_super) {
    __extends(AtkraceSelectCardItem, _super);
    function AtkraceSelectCardItem() {
        return _super.call(this) || this;
    }
    AtkraceSelectCardItem.prototype.initItem = function (index, data) {
        this.data = data;
        this.width = 204;
        this.height = 297;
        var bg = BaseLoadBitmap.create(this.data.servantInfo.qualityBg);
        this.addChild(bg);
        bg.setPosition(5, 5);
        bg.addTouchTap(this.onTap, this);
        var servantImg = BaseLoadBitmap.create(this.data.servantInfo.fullImgPath);
        servantImg.scaleX = servantImg.scaleY = 0.64;
        servantImg.setPosition(-95, 27);
        this.addChild(servantImg);
        var widthN = 282 - 8;
        var heightN = 335 + 6;
        var mask = new egret.Rectangle(172, 0, widthN, heightN);
        servantImg.mask = mask;
        var lvText = ComponentManager.getTextField("" + this.data.servantInfo.level, 18, 0xfff3b9);
        this.addChild(lvText);
        lvText.width = 40;
        lvText.textAlign = TextFieldConst.ALIGH_CENTER;
        lvText.setPosition(11, 22);
        var nameText = ComponentManager.getTextField(this.data.servantInfo.servantName, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        nameText.textColor = ServantScrollItem.getQualityColor(this.data.servantInfo.clv);
        nameText.width = this.width;
        nameText.textAlign = TextFieldConst.ALIGH_CENTER;
        this.addChild(nameText);
        nameText.y = 258;
        var attrBg = BaseLoadBitmap.create("public_9_bg11");
        attrBg.width = 180;
        attrBg.height = 52;
        this.addChild(attrBg);
        attrBg.setPosition(12, 189 + 5);
        var atkLabel = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_addtext2", ["" + this.data.battle]), 20, 0xfffcdb);
        atkLabel.width = this.width;
        atkLabel.textAlign = TextFieldConst.ALIGH_CENTER;
        this.addChild(atkLabel);
        atkLabel.setPosition(0, attrBg.y + 3);
        var hpLabel = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_addtext3", ["" + this.data.HP]), 20, 0xfffcdb);
        hpLabel.width = this.width;
        hpLabel.textAlign = TextFieldConst.ALIGH_CENTER;
        this.addChild(hpLabel);
        hpLabel.setPosition(0, attrBg.y + 27);
        if (this.data.isSelect) {
            var light_mask = BaseLoadBitmap.create("atkrace_select1");
            this.addChild(light_mask);
            light_mask.setPosition(-5, -5);
            var select_icon = BaseLoadBitmap.create("atkrace_select2");
            this.addChild(select_icon);
            select_icon.setPosition(155, 47);
        }
    };
    AtkraceSelectCardItem.prototype.onTap = function () {
        this.data.callback && this.data.callback.call(this.data.callbackObj, this.data.servantInfo);
    };
    AtkraceSelectCardItem.prototype.dispose = function () {
        this.data = null;
        _super.prototype.dispose.call(this);
    };
    return AtkraceSelectCardItem;
}(ScrollListItem));
__reflect(AtkraceSelectCardItem.prototype, "AtkraceSelectCardItem");
