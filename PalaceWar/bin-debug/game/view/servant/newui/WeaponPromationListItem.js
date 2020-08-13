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
 * 加工详情列表item
 * author shaoliang
 * date 2019/8/6
 * @class WeaponPromationListItem
 */
var WeaponPromationListItem = (function (_super) {
    __extends(WeaponPromationListItem, _super);
    function WeaponPromationListItem() {
        return _super.call(this) || this;
    }
    WeaponPromationListItem.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        this.width = 524;
        this.height = 42;
        var mask = BaseBitmap.create("weapon_attr_color_bg");
        mask.width = this.width - 4;
        mask.height = 40;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, mask, this, [2, 0]);
        this.addChild(mask);
        var posy = 21;
        var value1 = ComponentManager.getTextField(String(data[0]), 22, TextFieldConst.COLOR_BROWN);
        value1.width = 108;
        value1.setPosition(3, posy - value1.height / 2);
        value1.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(value1);
        var value2 = ComponentManager.getTextField(String(data[1]), 22, TextFieldConst.COLOR_BROWN);
        value2.width = 76;
        value2.setPosition(116, posy - value2.height / 2);
        value2.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(value2);
        var value3 = ComponentManager.getTextField(String(data[2]), 22, TextFieldConst.COLOR_BROWN);
        value3.width = 76;
        value3.setPosition(116 + 76, posy - value3.height / 2);
        value3.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(value3);
        var value4 = ComponentManager.getTextField(String(data[3]), 22, TextFieldConst.COLOR_BROWN);
        value4.width = 76;
        value4.setPosition(116 + 76 * 2, posy - value4.height / 2);
        value4.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(value4);
        var value5 = ComponentManager.getTextField(String(data[4]), 22, TextFieldConst.COLOR_BROWN);
        value5.width = 76;
        value5.setPosition(116 + 76 * 3, posy - value5.height / 2);
        value5.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(value5);
        var value6 = ComponentManager.getTextField(String(data[5]), 22, TextFieldConst.COLOR_BROWN);
        value6.width = 96;
        value6.setPosition(116 + 76 * 4, posy - value6.height / 2);
        value6.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(value6);
        var lineImg = BaseBitmap.create("public_line1");
        lineImg.width = view.width;
        this.setLayoutPosition(LayoutConst.horizontalCenterbottom, lineImg, view);
        this.addChild(lineImg);
    };
    return WeaponPromationListItem;
}(ScrollListItem));
__reflect(WeaponPromationListItem.prototype, "WeaponPromationListItem");
//# sourceMappingURL=WeaponPromationListItem.js.map