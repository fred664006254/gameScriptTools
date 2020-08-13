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
 * FQ详细攻略item
 * author 张朝阳
 * date 2018/7/23
 * @class FqStrategyViewScollItem2
 */
var FqStrategyViewScollItem2 = (function (_super) {
    __extends(FqStrategyViewScollItem2, _super);
    function FqStrategyViewScollItem2() {
        return _super.call(this) || this;
    }
    FqStrategyViewScollItem2.prototype.initItem = function (index, data) {
        if (data.open == null) {
            data['open'] = 0;
        }
        var titleBg = BaseBitmap.create("public_9_bg46");
        titleBg.width = 604;
        titleBg.height = 46;
        this.addChild(titleBg);
        titleBg.addTouchTap(function () {
            // console.log("放大or缩小222")
            if (data.open == 1) {
                data.open = 0;
            }
            else {
                data.open = 1;
                GameData.fqGameStrategyData.index = index;
            }
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_FQSTRATEGYVIEW_REFREASHITEM2);
        }, this);
        var title = data.title;
        var titleTF = ComponentManager.getTextField(title, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        titleTF.width = 580;
        titleTF.lineSpacing = 3;
        titleTF.setPosition(titleBg.x + titleBg.width / 2 - titleTF.width / 2, titleBg.y + 13);
        this.addChild(titleTF);
        //自适应
        if (titleTF.height + 26 > titleBg.height) {
            titleBg.height = titleTF.height + 26;
        }
        if (data.open == 0) {
            return;
        }
        var textBg = BaseBitmap.create("public_9_managebg");
        textBg.width = 604;
        textBg.height = 142;
        textBg.setPosition(titleBg.x, titleBg.y + titleBg.height);
        this.addChild(textBg);
        if (data.open == 0) {
            return;
        }
        var context = data.context;
        var textTF = ComponentManager.getTextField(context, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        textTF.width = 580;
        textTF.lineSpacing = 3;
        textTF.setPosition(textBg.x + 15, textBg.y + 15);
        this.addChild(textTF);
        if (textTF.height + 30 > textBg.height) {
            textBg.height = textTF.height + 30;
        }
    };
    return FqStrategyViewScollItem2;
}(ScrollListItem));
__reflect(FqStrategyViewScollItem2.prototype, "FqStrategyViewScollItem2");
//# sourceMappingURL=FqStrategyViewScollItem2.js.map