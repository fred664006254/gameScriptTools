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
 * 标签1 游戏指引
 * author 张朝阳
 * date 2018/7/23
 * @class FqStrategyViewTab1
 */
var FqStrategyViewTab1 = (function (_super) {
    __extends(FqStrategyViewTab1, _super);
    function FqStrategyViewTab1() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    FqStrategyViewTab1.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_FQSTRATEGYVIEW_REFREASHITEM1, this.refreshData, this);
        var bg = BaseBitmap.create("fqstrategyview_bg");
        bg.setPosition(GameConfig.stageWidth / 2 - bg.width / 2, 10);
        this.addChild(bg);
        //165 50
        var arrowBM = BaseBitmap.create("public_arrow");
        arrowBM.setPosition(bg.x + 165, bg.y + 50);
        var textBg = BaseBitmap.create("public_9_bg25");
        textBg.width = 410;
        textBg.height = 120;
        textBg.setPosition(arrowBM.x + arrowBM.width - 3.5, bg.y + 10);
        this.addChild(textBg);
        this.addChild(arrowBM);
        this._textTF = ComponentManager.getTextField(GameData.fqGameStrategyData.intro, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        this._textTF.width = 390;
        this._textTF.lineSpacing = 3;
        this._textTF.setPosition(textBg.x + 15, textBg.y + 15);
        this.addChild(this._textTF);
        //多语言版本
        if (this._textTF.height + 30 > textBg.height) {
            textBg.height = this._textTF.height + 30;
        }
        var rect = new egret.Rectangle(0, 0, 635, GameConfig.stageHeigth - this.getViewTitleButtomY() - bg.height - 35);
        this._scrollList = ComponentManager.getScrollList(FqStrategyViewScollItem1, GameData.fqGameStrategyData.rcontent, rect);
        this._scrollList.setPosition(3, bg.y + bg.height + 10);
        this.addChild(this._scrollList);
    };
    FqStrategyViewTab1.prototype.refreshData = function () {
        this._scrollList.refreshData(GameData.fqGameStrategyData.rcontent);
    };
    FqStrategyViewTab1.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_FQSTRATEGYVIEW_REFREASHITEM1, this.refreshData, this);
        this._scrollList = null;
        this._textTF = null;
        _super.prototype.dispose.call(this);
    };
    return FqStrategyViewTab1;
}(ViewTab));
__reflect(FqStrategyViewTab1.prototype, "FqStrategyViewTab1");
//# sourceMappingURL=FqStrategyViewTab1.js.map