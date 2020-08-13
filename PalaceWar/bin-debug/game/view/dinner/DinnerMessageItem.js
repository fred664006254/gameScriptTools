/**
 * 离线消息Item
 * author shaoliang
 * date 2017/11/2
 * @class DinnerMessageItem
 */
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
var DinnerMessageItem = (function (_super) {
    __extends(DinnerMessageItem, _super);
    function DinnerMessageItem() {
        return _super.call(this) || this;
    }
    DinnerMessageItem.prototype.initItem = function (index, data) {
        this.width = 498;
        this.height = 54;
        var dinnerCfg = Config.DinnerCfg.getGoToFeastItemCfg(data.dtype);
        var nameTxt = ComponentManager.getTextField(data.name, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        nameTxt.x = 125 - nameTxt.width / 2;
        nameTxt.y = this.height / 2 - nameTxt.height / 2;
        ;
        this.addChild(nameTxt);
        var scoreStr;
        if (dinnerCfg.getPoint > 0) {
            scoreStr = "+" + dinnerCfg.getPoint;
        }
        else {
            scoreStr = dinnerCfg.getPoint.toString();
        }
        var scoreTxt = ComponentManager.getTextField(scoreStr, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        scoreTxt.x = 372 - scoreTxt.width / 2;
        scoreTxt.y = this.height / 2 - nameTxt.height / 2;
        ;
        this.addChild(scoreTxt);
        if (dinnerCfg.getPoint > 0) {
            nameTxt.textColor = TextFieldConst.COLOR_WARN_GREEN;
            scoreTxt.textColor = TextFieldConst.COLOR_WARN_GREEN;
        }
        else {
            nameTxt.textColor = TextFieldConst.COLOR_WARN_RED2;
            scoreTxt.textColor = TextFieldConst.COLOR_WARN_RED2;
        }
        var lineImg = BaseBitmap.create("dinner_line");
        lineImg.x = this.width / 2 - lineImg.width / 2;
        lineImg.y = this.height;
        this.addChild(lineImg);
    };
    DinnerMessageItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return DinnerMessageItem;
}(ScrollListItem));
__reflect(DinnerMessageItem.prototype, "DinnerMessageItem");
//# sourceMappingURL=DinnerMessageItem.js.map