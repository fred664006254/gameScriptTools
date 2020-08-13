/**
 * 来访消息主界面
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
var AtkraceCrossVisitView = (function (_super) {
    __extends(AtkraceCrossVisitView, _super);
    function AtkraceCrossVisitView() {
        return _super.call(this) || this;
    }
    AtkraceCrossVisitView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "rankinglist_rankbg",
            "atkraceVisitbg",
            "atkracevipbg",
            "office_fnt",
        ]);
    };
    AtkraceCrossVisitView.prototype.getOffsetX = function () {
        return 36;
    };
    AtkraceCrossVisitView.prototype.getShowHeight = function () {
        return 750;
    };
    AtkraceCrossVisitView.prototype.initView = function () {
    };
    // protected getTabbarGroupY():number
    // {
    // 	return 50;
    // }
    AtkraceCrossVisitView.prototype.getTabbarTextArr = function () {
        return [
            "atkraceVisitTab1",
            "atkraceVisitTab2",
            "atkraceVisitTab3",
        ];
    };
    AtkraceCrossVisitView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AtkraceCrossVisitView;
}(PopupView));
__reflect(AtkraceCrossVisitView.prototype, "AtkraceCrossVisitView");
//# sourceMappingURL=AtkraceCrossVisitView.js.map