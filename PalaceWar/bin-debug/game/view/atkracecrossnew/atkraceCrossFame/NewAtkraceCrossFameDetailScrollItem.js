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
 * 江湖名望详情item
 */
var NewAtkraceCrossFameDetailScrollItem = /** @class */ (function (_super) {
    __extends(NewAtkraceCrossFameDetailScrollItem, _super);
    function NewAtkraceCrossFameDetailScrollItem() {
        return _super.call(this) || this;
    }
    NewAtkraceCrossFameDetailScrollItem.prototype.initItem = function (index, data, param) {
        var bg = BaseBitmap.create("public_popupscrollitembg");
        this.addChild(bg);
        bg.height = 140;
        var title = ComponentManager.getTextField(LanguageManager.getlocal("newatkrackcross_fameTitleName" + (data.index + 1)), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        title.setPosition(bg.x + bg.width / 2 - title.width / 2, bg.y + 25);
        this.addChild(title);
        var titleLine = BaseBitmap.create("public_line3");
        titleLine.width += title.width + 30;
        titleLine.setPosition(bg.x + bg.width / 2 - titleLine.width / 2, title.y + title.height / 2 - titleLine.height / 2);
        this.addChild(titleLine);
        var atkInfo = ComponentManager.getTextField(LanguageManager.getlocal("newatkrackcross_fameEffectAtk", ["" + Math.floor(data.baseBuff * 100)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN3);
        atkInfo.setPosition(bg.x + bg.width / 2 - atkInfo.width / 2, title.y + title.height + 15);
        this.addChild(atkInfo);
        var extraAtk = ComponentManager.getTextField(LanguageManager.getlocal("newatkrackcross_fameEffectExtraAtk", ["" + Math.floor(data.addBuff * 100)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN3);
        extraAtk.setPosition(bg.x + bg.width / 2 - extraAtk.width / 2, atkInfo.y + atkInfo.height + 15);
        this.addChild(extraAtk);
    };
    NewAtkraceCrossFameDetailScrollItem.prototype.dipose = function () {
        _super.prototype.dispose.call(this);
    };
    return NewAtkraceCrossFameDetailScrollItem;
}(ScrollListItem));
//# sourceMappingURL=NewAtkraceCrossFameDetailScrollItem.js.map