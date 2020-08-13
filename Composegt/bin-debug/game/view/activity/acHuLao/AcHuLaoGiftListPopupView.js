/**
 * 暴击虎牢关礼包
 * author 赵占涛
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
var AcHuLaoGiftListPopupView = (function (_super) {
    __extends(AcHuLaoGiftListPopupView, _super);
    function AcHuLaoGiftListPopupView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._aid = "";
        _this._code = "";
        return _this;
    }
    Object.defineProperty(AcHuLaoGiftListPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcHuLaoView.AID, AcHuLaoView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    AcHuLaoGiftListPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_HULAOSHOPGIFT), this.buyCallback, this);
        var bg1 = BaseBitmap.create("public_tc_bg01");
        bg1.width = 540;
        bg1.height = 620;
        bg1.x = 42;
        bg1.y = 10;
        this.addChildToContainer(bg1);
        var scroRect = new egret.Rectangle(0, 0, 518, 680);
        this.cfg.vipshopNum;
        var scrollList = ComponentManager.getScrollList(AcHuLaoGiftListScrollItem, this.cfg.vipshopNum, scroRect);
        this.addChildToContainer(scrollList);
        scrollList.x = 53;
        scrollList.y = 20;
        this._list = scrollList;
    };
    AcHuLaoGiftListPopupView.prototype.buyCallback = function (data) {
        if (data.data.ret) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": data.data.data.data.rewards, "otherRewards": data.data.data.data.otherrewards, "isPlayAni": true });
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("candyGetTip2"));
        }
        this._list.refreshData(this.cfg.vipshopNum);
    };
    AcHuLaoGiftListPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "activity_charge_red"
        ]);
    };
    AcHuLaoGiftListPopupView.prototype.dispose = function () {
        this._aid = "";
        this._code = "";
        this._list = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_HULAOSHOPGIFT), this.buyCallback, this);
        _super.prototype.dispose.call(this);
    };
    return AcHuLaoGiftListPopupView;
}(PopupView));
__reflect(AcHuLaoGiftListPopupView.prototype, "AcHuLaoGiftListPopupView");
