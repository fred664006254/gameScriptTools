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
var NetErrorPopupView = (function (_super) {
    __extends(NetErrorPopupView, _super);
    function NetErrorPopupView() {
        return _super.call(this) || this;
    }
    NetErrorPopupView.prototype.initView = function () {
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 124;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 9;
        this.addChildToContainer(bg);
        var messageTF = ComponentMgr.getTextField(this.getMessage(), TextFieldConst.SIZE_CONTENT_COMMON, ColorEnums.black);
        messageTF.x = this.getShowWidth() / 2 - messageTF.width / 2;
        messageTF.y = 30;
        this.height = 200;
        this.addChildToContainer(messageTF);
    };
    NetErrorPopupView.prototype.getMessage = function () {
        return LangMger.getlocal("netErrorDesc");
    };
    NetErrorPopupView.prototype.getResourceList = function () {
        return [];
    };
    NetErrorPopupView.prototype.getParent = function () {
        return LayerMgr.msgLayer;
    };
    NetErrorPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, this._confirmBtn, this.viewBg, [0, 17]);
    };
    NetErrorPopupView.prototype.getConfirmBtnStr = function () {
        return LangMger.getlocal("confirmBtn");
    };
    NetErrorPopupView.prototype.getConfirmBtnName = function () {
        return ButtonConst.BTN_CONFIRM;
    };
    NetErrorPopupView.prototype.getTitleStr = function () {
        return LangMger.getlocal("sysTip");
    };
    NetErrorPopupView.prototype.getCloseBtnName = function () {
        return null;
    };
    NetErrorPopupView.prototype.isShowOpenAni = function () {
        return false;
    };
    NetErrorPopupView.prototype.clickConfirmHandler = function (data) {
        this.hide();
        // ViewController.getInstance().hideAllView();
        NetManager.socket.checkAndReConnect();
    };
    return NetErrorPopupView;
}(PopupView));
__reflect(NetErrorPopupView.prototype, "NetErrorPopupView");
//# sourceMappingURL=NetErrorPopupView.js.map