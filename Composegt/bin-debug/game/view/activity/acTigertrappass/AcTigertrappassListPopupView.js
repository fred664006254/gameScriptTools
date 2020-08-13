/**
 * 虎牢关兑换
 * author 赵占涛
 * @class AcTigertrappassListPopupView
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
var AcTigertrappassListPopupView = (function (_super) {
    __extends(AcTigertrappassListPopupView, _super);
    function AcTigertrappassListPopupView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._aid = "";
        _this._code = "";
        return _this;
    }
    AcTigertrappassListPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_REDEEMSKIN), this.exchangeCallback, this);
        var bg1 = BaseBitmap.create("public_tc_bg01");
        bg1.width = 540;
        bg1.height = 620;
        bg1.x = 42;
        bg1.y = 10;
        this.addChildToContainer(bg1);
        var scroRect = new egret.Rectangle(0, 0, 518, 680);
        var scrollList = ComponentManager.getScrollList(AcTigertrappassListScrollItem, [1], scroRect);
        this.addChildToContainer(scrollList);
        scrollList.x = 53;
        scrollList.y = 20;
        this._list = scrollList;
    };
    AcTigertrappassListPopupView.prototype.exchangeCallback = function (data) {
        if (data.data.ret) {
            App.CommonUtil.showTip(LanguageManager.getlocal("candyGetTip"));
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("candyGetTip2"));
        }
        this._list.refreshData([1]);
    };
    AcTigertrappassListPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AcTigertrappassListPopupView.prototype.dispose = function () {
        this._aid = "";
        this._code = "";
        this._list = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_REDEEMSKIN), this.exchangeCallback, this);
        _super.prototype.dispose.call(this);
    };
    return AcTigertrappassListPopupView;
}(PopupView));
__reflect(AcTigertrappassListPopupView.prototype, "AcTigertrappassListPopupView");
