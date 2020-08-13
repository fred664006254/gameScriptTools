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
var DailybossBattleResultPopupView = (function (_super) {
    __extends(DailybossBattleResultPopupView, _super);
    function DailybossBattleResultPopupView() {
        return _super.call(this) || this;
    }
    DailybossBattleResultPopupView.prototype.initView = function () {
    };
    DailybossBattleResultPopupView.prototype.getBattleData = function () {
        return this.param.data;
    };
    DailybossBattleResultPopupView.prototype.getBgName = function () {
        return "promotion_scroll";
    };
    return DailybossBattleResultPopupView;
}(PopupView));
__reflect(DailybossBattleResultPopupView.prototype, "DailybossBattleResultPopupView");
