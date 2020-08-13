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
var GivejdpeasPopupView = (function (_super) {
    __extends(GivejdpeasPopupView, _super);
    function GivejdpeasPopupView() {
        return _super.call(this) || this;
    }
    GivejdpeasPopupView.prototype.getResourceList = function () {
        var resArray = ["givejdpeas_bg"];
        return _super.prototype.getResourceList.call(this).concat(resArray);
    };
    GivejdpeasPopupView.prototype.initView = function () {
        var bg = BaseBitmap.create("givejdpeas_bg");
        bg.x = 12;
        this.addChildToContainer(bg);
    };
    GivejdpeasPopupView.prototype.getBgExtraHeight = function () {
        return 0;
    };
    return GivejdpeasPopupView;
}(PopupView));
__reflect(GivejdpeasPopupView.prototype, "GivejdpeasPopupView");
//# sourceMappingURL=GivejdpeasPopupView.js.map