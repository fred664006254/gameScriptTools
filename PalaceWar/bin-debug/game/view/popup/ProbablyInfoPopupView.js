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
var ProbablyInfoPopupView = (function (_super) {
    __extends(ProbablyInfoPopupView, _super);
    function ProbablyInfoPopupView() {
        return _super.call(this) || this;
    }
    ProbablyInfoPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["popupview_probablytitle"]);
    };
    ProbablyInfoPopupView.prototype.getTitleBgName = function () {
        return "popupview_probablytitle";
    };
    return ProbablyInfoPopupView;
}(RuleInfoPopupView));
__reflect(ProbablyInfoPopupView.prototype, "ProbablyInfoPopupView");
//# sourceMappingURL=ProbablyInfoPopupView.js.map