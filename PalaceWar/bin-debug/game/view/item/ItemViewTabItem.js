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
var ItemViewTabItem = (function (_super) {
    __extends(ItemViewTabItem, _super);
    function ItemViewTabItem() {
        return _super.call(this) || this;
    }
    ItemViewTabItem.prototype.initItem = function (key, upDown) {
        if (upDown === void 0) { upDown = 1; }
        var wordsBg = BaseBitmap.create("itemtab_bg");
        this.addChild(wordsBg);
        var nameText = ComponentManager.getTextField(LanguageManager.getlocal(key), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        nameText.setPosition(wordsBg.width / 2 - nameText.width / 2, wordsBg.height / 2 - nameText.height / 2);
        this.addChild(nameText);
        var arrow = BaseBitmap.create("itemtab_arrow" + upDown);
        arrow.setPosition(526, wordsBg.height / 2 - arrow.height / 2);
        this.addChild(arrow);
    };
    ItemViewTabItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return ItemViewTabItem;
}(BaseDisplayObjectContainer));
__reflect(ItemViewTabItem.prototype, "ItemViewTabItem");
//# sourceMappingURL=ItemViewTabItem.js.map