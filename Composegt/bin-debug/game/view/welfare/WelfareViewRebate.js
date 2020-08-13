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
var WelfareViewRebate = (function (_super) {
    __extends(WelfareViewRebate, _super);
    function WelfareViewRebate() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        return _this;
    }
    WelfareViewRebate.prototype.init = function () {
        _super.prototype.init.call(this);
        var arr = [0, 1, 2, 3];
        var info = arr;
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 492, GameConfig.stageHeigth - 304 - 35);
        this._scrollList = ComponentManager.getScrollList(WelfareViewRebateScrollItem, info, rect);
        this.addChild(this._scrollList);
        this._scrollList.setPosition(0, 195 + 35);
    };
    WelfareViewRebate.prototype.dispose = function () {
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return WelfareViewRebate;
}(WelfareViewTab));
__reflect(WelfareViewRebate.prototype, "WelfareViewRebate");
