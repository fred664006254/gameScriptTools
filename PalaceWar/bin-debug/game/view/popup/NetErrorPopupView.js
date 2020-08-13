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
        bg.y = 19;
        this.addChildToContainer(bg);
        var messageTF = new BaseTextField();
        messageTF.text = this.getMessage();
        messageTF.size = TextFieldConst.FONTSIZE_CONTENT_COMMON;
        messageTF.x = this.getShowWidth() / 2 - messageTF.width / 2;
        messageTF.y = bg.y + bg.height / 2 - messageTF.height / 2;
        this.height = 200;
        this.addChildToContainer(messageTF);
    };
    NetErrorPopupView.prototype.getMessage = function () {
        return LanguageManager.getlocal("netErrorDesc");
    };
    NetErrorPopupView.prototype.getParent = function () {
        return LayerManager.msgLayer;
    };
    NetErrorPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width / 2 - 84, 170);
    };
    NetErrorPopupView.prototype.getConfirmBtnStr = function () {
        return "sysConfirm";
    };
    NetErrorPopupView.prototype.getConfirmBtnName = function () {
        return ButtonConst.BTN_NORMAL_YELLOW;
    };
    NetErrorPopupView.prototype.getTitleStr = function () {
        return "itemUseConstPopupViewTitle";
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
        NetManager.chat.checkAndReConnect();
    };
    return NetErrorPopupView;
}(PopupView));
__reflect(NetErrorPopupView.prototype, "NetErrorPopupView");
//# sourceMappingURL=NetErrorPopupView.js.map