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
 * 标签2 详细攻略
 * author 张朝阳
 * date 2018/7/23
 * @class FqStrategyViewTab2
 */
var FqStrategyViewTab2 = (function (_super) {
    __extends(FqStrategyViewTab2, _super);
    function FqStrategyViewTab2() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    FqStrategyViewTab2.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_FQSTRATEGYVIEW_REFREASHITEM2, this.refreshData, this);
        var rect = new egret.Rectangle(0, 0, 605, GameConfig.stageHeigth - this.getViewTitleButtomY() - 30 - 15);
        this._scrollList = ComponentManager.getScrollList(FqStrategyViewScollItem2, GameData.fqGameStrategyData.faqcontent, rect);
        this._scrollList.setPosition((GameConfig.stageWidth - 605) / 2, 15);
        this.addChild(this._scrollList);
    };
    FqStrategyViewTab2.prototype.refreshData = function () {
        this._scrollList.refreshData(GameData.fqGameStrategyData.faqcontent);
        // this._scrollList.setScrollTopByIndex(GameData.fqGameStrategyData.faqcontent);
    };
    FqStrategyViewTab2.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_FQSTRATEGYVIEW_REFREASHITEM2, this.refreshData, this);
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return FqStrategyViewTab2;
}(ViewTab));
__reflect(FqStrategyViewTab2.prototype, "FqStrategyViewTab2");
//# sourceMappingURL=FqStrategyViewTab2.js.map