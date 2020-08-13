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
 * FQ游戏指引item
 * author 张朝阳
 * date 2018/7/23
 * @class FqStrategyViewScollItem1
 */
var FqStrategyViewScollItem1 = (function (_super) {
    __extends(FqStrategyViewScollItem1, _super);
    function FqStrategyViewScollItem1() {
        var _this = _super.call(this) || this;
        _this._data = null;
        return _this;
    }
    FqStrategyViewScollItem1.prototype.initItem = function (index, data) {
        var titleBg = App.CommonUtil.getContainerByLeftHalfRes("fqstrategyview_titlebg");
        if (data.open == null) {
            data['open'] = 1;
        }
        this.addChild(titleBg);
        titleBg.addTouchTap(function () {
            if (data.open == 1) {
                data.open = 0;
            }
            else {
                data.open = 1;
            }
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_FQSTRATEGYVIEW_REFREASHITEM1);
        }, this);
        // public_line3
        var lineBM = BaseBitmap.create("public_line3");
        lineBM.anchorOffsetX = lineBM.width / 2;
        lineBM.anchorOffsetY = lineBM.height / 2;
        // lineBM.setPosition(titleBg.x + titleBg.width / 2,titleBg.y + titleBg.height / 2);
        this.addChild(lineBM);
        var title = data.title;
        var titleTF = ComponentManager.getTextField(title, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTF.setPosition(titleBg.x + titleBg.width / 2 - titleTF.width / 2, titleBg.y + titleBg.height / 2 - titleTF.height / 2);
        this.addChild(titleTF);
        lineBM.width += titleTF.width;
        lineBM.setPosition(titleBg.x + titleBg.width / 2 - titleTF.width / 2, titleBg.y + titleBg.height / 2);
        if (data.open == 0) {
            return;
        }
        var textBg = BaseBitmap.create("public_9_managebg");
        textBg.width = 600;
        textBg.height = 142;
        textBg.setPosition(GameConfig.stageWidth / 2 - textBg.width / 2 - 4, titleBg.y + titleBg.height);
        this.addChild(textBg);
        var context = data.context;
        var textTF = ComponentManager.getTextField(context, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        textTF.width = 570;
        textTF.lineSpacing = 3;
        textTF.setPosition(textBg.x + 15, textBg.y + 15);
        this.addChild(textTF);
        if (textTF.height + 30 > textBg.height) {
            textBg.height = textTF.height + 30;
        }
    };
    FqStrategyViewScollItem1.prototype.dispose = function () {
        this._data = null;
        _super.prototype.dispose.call(this);
    };
    return FqStrategyViewScollItem1;
}(ScrollListItem));
__reflect(FqStrategyViewScollItem1.prototype, "FqStrategyViewScollItem1");
//# sourceMappingURL=FqStrategyViewScollItem1.js.map