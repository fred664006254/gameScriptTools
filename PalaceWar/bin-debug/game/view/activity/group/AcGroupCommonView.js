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
 * 活动组主界面父类
 * author 陈可
 * date 2018/12/3
 * @class AcGroupCommonView
 */
var AcGroupCommonView = (function (_super) {
    __extends(AcGroupCommonView, _super);
    function AcGroupCommonView() {
        var _this = _super.call(this) || this;
        _this.aid = App.StringUtil.firstCharToLower(_this.getClassName().replace("AcGroup", "").replace("View", ""));
        return _this;
    }
    Object.defineProperty(AcGroupCommonView.prototype, "acVo", {
        get: function () {
            return Api.acVoApi.getGroupAcVo(this.aid);
        },
        enumerable: true,
        configurable: true
    });
    AcGroupCommonView.prototype.getTitleStr = function () {
        return "acGroup" + App.StringUtil.firstCharToUper(this.aid) + "_Title";
    };
    return AcGroupCommonView;
}(AcCommonView));
__reflect(AcGroupCommonView.prototype, "AcGroupCommonView");
//# sourceMappingURL=AcGroupCommonView.js.map