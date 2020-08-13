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
var NewAtkracecrossDetailScrollItem = /** @class */ (function (_super) {
    __extends(NewAtkracecrossDetailScrollItem, _super);
    function NewAtkracecrossDetailScrollItem() {
        return _super.call(this) || this;
    }
    NewAtkracecrossDetailScrollItem.prototype.initItem = function (index, cfg, info) {
        //"threekingdomstaskflag","public_popupscrollitembg",
        var bgBg = BaseBitmap.create("public_popupscrollitembg");
        this.addChild(bgBg);
        var str1 = LanguageManager.getlocal("newatkracecross_buffdetail_desc", [String(index + 1), String(cfg.needAbility), String(cfg.servantNum)]);
        if (info.sc >= cfg.servantNum) {
            str1 += " " + LanguageManager.getlocal("qingyuantaskprocess3", [String(info.sc), String(cfg.servantNum)]);
        }
        else {
            str1 += " " + LanguageManager.getlocal("qingyuantaskprocess1", [String(info.sc), String(cfg.servantNum)]);
        }
        var str2 = "";
        if (cfg.addAtk > 0) {
            var v = Math.floor(cfg.addAtk * 1000 + 0.5) / 10;
            str2 = LanguageManager.getlocal("newatkracecross_itembuff1", [String(v)]);
        }
        else {
            var v = Math.floor(cfg.addCrit * 1000 + 0.5) / 10;
            str2 = LanguageManager.getlocal("newatkracecross_itembuff2", [String(v)]);
        }
        var text1 = ComponentManager.getTextField(str1, 22, TextFieldConst.COLOR_BROWN);
        text1.setPosition(40, 35);
        this.addChild(text1);
        var text2 = ComponentManager.getTextField(str2, 22, TextFieldConst.COLOR_WARN_GREEN2);
        text2.setPosition(text1.x, text1.y + text1.height + 20);
        this.addChild(text2);
        if (index + 1 == info.lv) {
            var iconCloud = BaseBitmap.create("threekingdomstaskflag");
            iconCloud.x = bgBg.width - iconCloud.width;
            this.addChild(iconCloud);
        }
    };
    return NewAtkracecrossDetailScrollItem;
}(ScrollListItem));
//# sourceMappingURL=NewAtkracecrossDetailScrollItem.js.map