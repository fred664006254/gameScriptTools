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
var AcMerryXmasTaskPopupViewTab3 = (function (_super) {
    __extends(AcMerryXmasTaskPopupViewTab3, _super);
    function AcMerryXmasTaskPopupViewTab3() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._tab = 3;
        return _this;
    }
    AcMerryXmasTaskPopupViewTab3.prototype.getTabIndex = function () {
        return 3;
    };
    AcMerryXmasTaskPopupViewTab3.prototype.dispose = function () {
        this._tab = 3;
        _super.prototype.dispose.call(this);
    };
    return AcMerryXmasTaskPopupViewTab3;
}(AcMerryXmasTaskPopupViewTab));
__reflect(AcMerryXmasTaskPopupViewTab3.prototype, "AcMerryXmasTaskPopupViewTab3");
