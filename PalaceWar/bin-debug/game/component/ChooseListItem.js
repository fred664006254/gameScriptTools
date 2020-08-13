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
 * 选择列表item
 * author shaoliang
 */
var ChooseListItem = (function (_super) {
    __extends(ChooseListItem, _super);
    function ChooseListItem() {
        var _this = _super.call(this) || this;
        _this._str = null;
        _this._function = null;
        _this._obj = null;
        return _this;
    }
    ChooseListItem.prototype.initItem = function (index, data, itemParam) {
        this._str = data;
        this._function = itemParam.f;
        this._obj = itemParam.o;
        var bg = BaseBitmap.create("common_select_frame2");
        bg.height = 28;
        bg.width = itemParam.w;
        this.addChild(bg);
        var text = ComponentManager.getTextField(data, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        text.setPosition(bg.width / 2 - text.width / 2, 14 - text.height / 2 + 2);
        this.addChild(text);
        this.addTouchTap(this.clickItem, this);
    };
    ChooseListItem.prototype.clickItem = function () {
        this._function.apply(this._obj, [this._str]);
    };
    ChooseListItem.prototype.dispose = function () {
        this._str = null;
        this._function = null;
        this._obj = null;
        _super.prototype.dispose.call(this);
    };
    return ChooseListItem;
}(ScrollListItem));
__reflect(ChooseListItem.prototype, "ChooseListItem");
//# sourceMappingURL=ChooseListItem.js.map