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
var AcMerryXmasTaskPopupViewTab1 = (function (_super) {
    __extends(AcMerryXmasTaskPopupViewTab1, _super);
    function AcMerryXmasTaskPopupViewTab1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._tab = 1;
        return _this;
    }
    AcMerryXmasTaskPopupViewTab1.prototype.getTabIndex = function () {
        return 1;
    };
    AcMerryXmasTaskPopupViewTab1.prototype.dispose = function () {
        this._tab = 1;
        _super.prototype.dispose.call(this);
    };
    return AcMerryXmasTaskPopupViewTab1;
}(AcMerryXmasTaskPopupViewTab));
__reflect(AcMerryXmasTaskPopupViewTab1.prototype, "AcMerryXmasTaskPopupViewTab1");
