/**
 * DinnerDetailView 下面每条宴会消息
 * date 2017/11/6
 * @class DinnerInfoItem
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
var DinnerInfoItem = (function (_super) {
    __extends(DinnerInfoItem, _super);
    function DinnerInfoItem() {
        return _super.call(this) || this;
    }
    DinnerInfoItem.prototype.initItem = function (index, data) {
        this.width = 610;
        this.height = 30;
        var nameTxt = ComponentManager.getTextField((index + 1) + ". " + data.name, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        nameTxt.x = 17;
        nameTxt.y = this.height / 2 - nameTxt.height / 2;
        ;
        this.addChild(nameTxt);
        var descTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        descTxt.x = 170;
        descTxt.y = this.height / 2 - nameTxt.height / 2;
        ;
        this.addChild(descTxt);
        var score = Config.DinnerCfg.getGoToFeastItemCfg(data.dtype).getPoint;
        var costStr;
        if (Config.DinnerCfg.getGoToFeastItemCfg(data.dtype).needGem) {
            costStr = Config.DinnerCfg.getGoToFeastItemCfg(data.dtype).needGem + LanguageManager.getlocal("gemName");
        }
        else {
            costStr = LanguageManager.getlocal("itemName_" + Config.DinnerCfg.getGoToFeastItemCfg(data.dtype).needItem);
        }
        if (data.dtype != 4) {
            nameTxt.textColor = TextFieldConst.COLOR_WHITE;
            var scoreStr = "+" + score;
            descTxt.text = LanguageManager.getlocal("dinnerJoinDesc1", [costStr, scoreStr]);
        }
        else {
            nameTxt.textColor = TextFieldConst.COLOR_QUALITY_YELLOW;
            descTxt.text = LanguageManager.getlocal("dinnerJoinDesc2", [costStr, score.toString()]);
        }
        descTxt.textColor = nameTxt.textColor;
    };
    DinnerInfoItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return DinnerInfoItem;
}(ScrollListItem));
__reflect(DinnerInfoItem.prototype, "DinnerInfoItem");
