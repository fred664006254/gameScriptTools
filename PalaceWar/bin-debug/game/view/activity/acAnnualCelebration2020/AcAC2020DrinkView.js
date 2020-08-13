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
var AcAC2020DrinkView = (function (_super) {
    __extends(AcAC2020DrinkView, _super);
    function AcAC2020DrinkView() {
        return _super.call(this) || this;
    }
    AcAC2020DrinkView.prototype.getResourceList = function () {
        var guidePic = [];
        return guidePic.concat([
            "acac2020_drink_bg",
        ]);
    };
    AcAC2020DrinkView.prototype.getCloseBtnName = function () {
        return null;
    };
    AcAC2020DrinkView.prototype.getTitleStr = function () {
        return null;
    };
    AcAC2020DrinkView.prototype.getTitleBgName = function () {
        return null;
    };
    AcAC2020DrinkView.prototype.getBgName = function () {
        return "acac2020_drink_bg";
    };
    AcAC2020DrinkView.prototype.initView = function () {
        egret.Tween.get(this.container).wait(1000).call(this.hide, this);
    };
    AcAC2020DrinkView.prototype.hide = function (isDispose) {
        var view = this;
        if (this.param.data.callBack) {
            this.param.data.callBack.apply(this.param.data.obj);
        }
        _super.prototype.hide.call(this);
    };
    return AcAC2020DrinkView;
}(PopupView));
__reflect(AcAC2020DrinkView.prototype, "AcAC2020DrinkView");
//# sourceMappingURL=AcAC2020DrinkView.js.map