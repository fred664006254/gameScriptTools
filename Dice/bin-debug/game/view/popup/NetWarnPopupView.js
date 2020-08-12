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
 * 网络异常警告
 * author 陈可
 * date 2019/11/07
 * @class NetWarnPopupView
 *
 */
var NetWarnPopupView = (function (_super) {
    __extends(NetWarnPopupView, _super);
    function NetWarnPopupView() {
        return _super.call(this) || this;
    }
    NetWarnPopupView.prototype.getMessage = function () {
        return LangMger.getlocal("netWarnDesc");
    };
    NetWarnPopupView.prototype.hide = function () {
        _super.prototype.hide.call(this);
        ViewController.getInstance().hideAllView();
        if (App.DeviceUtil.IsHtml5()) {
            window.location.reload();
        }
        else {
            ViewController.getInstance().dispose();
        }
    };
    return NetWarnPopupView;
}(NetErrorPopupView));
__reflect(NetWarnPopupView.prototype, "NetWarnPopupView");
//# sourceMappingURL=NetWarnPopupView.js.map