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
var AcMerryXmasTaskPopupViewTab2 = (function (_super) {
    __extends(AcMerryXmasTaskPopupViewTab2, _super);
    function AcMerryXmasTaskPopupViewTab2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._tab = 2;
        return _this;
    }
    AcMerryXmasTaskPopupViewTab2.prototype.getTabIndex = function () {
        return 2;
    };
    AcMerryXmasTaskPopupViewTab2.prototype.dispose = function () {
        this._tab = 2;
        _super.prototype.dispose.call(this);
    };
    return AcMerryXmasTaskPopupViewTab2;
}(AcMerryXmasTaskPopupViewTab));
__reflect(AcMerryXmasTaskPopupViewTab2.prototype, "AcMerryXmasTaskPopupViewTab2");
