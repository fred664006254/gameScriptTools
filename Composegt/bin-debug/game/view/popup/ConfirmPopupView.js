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
 * 通用确认面板
 * author dky
 * date 2017/11/24
 * @class ConfirmPopupView
 * 参数 ：title,msg,callback,handler  needCancel
 *
 */
var ConfirmPopupView = (function (_super) {
    __extends(ConfirmPopupView, _super);
    function ConfirmPopupView() {
        var _this = _super.call(this) || this;
        // private _useCallback:Function;
        // private _handler:any;
        _this._bgHeight = 0;
        _this._callback = null;
        return _this;
    }
    // 打开该面板时，需要传参数msg
    ConfirmPopupView.prototype.initView = function () {
        var bg = BaseBitmap.create("public_tc_bg01");
        bg.width = 528;
        bg.height = 320;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 9;
        this.addChildToContainer(bg);
        var topBg = BaseBitmap.create("public_tc_bg03");
        topBg.width = 512;
        topBg.height = 294;
        topBg.x = this.viewBg.x + this.viewBg.width / 2 - topBg.width / 2;
        topBg.y = bg.y + 13;
        this.addChildToContainer(topBg);
        var cor1 = BaseBitmap.create("public_tcdw_bg01");
        // cor1.skewX = 180;
        cor1.x = topBg.x;
        cor1.y = topBg.y;
        this.addChildToContainer(cor1);
        var cor2 = BaseBitmap.create("public_tcdw_bg02");
        cor2.x = topBg.x + topBg.width - cor2.width;
        cor2.y = topBg.y;
        this.addChildToContainer(cor2);
        this._bgHeight = bg.height;
        var messageStr = this.param.data.msg;
        var msgTF = ComponentManager.getTextField(messageStr, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        msgTF.width = 480;
        msgTF.lineSpacing = 10;
        msgTF.setColor(TextFieldConst.COLOR_BROWN);
        msgTF.textAlign = TextFieldConst.ALIGH_CENTER;
        msgTF.x = this.viewBg.x + this.viewBg.width / 2 - msgTF.width / 2;
        msgTF.y = topBg.y + topBg.height / 2 - msgTF.height / 2;
        this.addChildToContainer(msgTF);
        var yesKey = this.param.data.yesKey ? this.param.data.yesKey : "confirmBtn";
        var conBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, yesKey, this.clickConHandler, this);
        // conBtn.setColor(TextFieldConst.COLOR_BLACK);
        conBtn.x = bg.x + bg.width / 2 - conBtn.width / 2;
        conBtn.y = bg.y + bg.height + 20;
        this.addChildToContainer(conBtn);
        if (this.param.data.needCancel) {
            var cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_BLUE, "cancelBtn", this.clickCancelHandler, this);
            // cancelBtn.setColor(TextFieldConst.COLOR_BLACK);
            cancelBtn.x = 80;
            cancelBtn.y = bg.y + bg.height + 20;
            this.addChildToContainer(cancelBtn);
            conBtn.x = 330;
        }
    };
    // protected getConfirmBtnStr():string
    // {
    // 	return "confirmBtn";
    // }
    ConfirmPopupView.prototype.resetBgSize = function () {
        // this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width/2- 86 -27,this._bgHeight + 30);
        _super.prototype.resetBgSize.call(this);
    };
    ConfirmPopupView.prototype.isTouchMaskClose = function () {
        return (this.param && this.param.data && this.param.data.touchMaskClose) ? true : false;
    };
    ConfirmPopupView.prototype.clickConHandler = function (data) {
        var param = this.param;
        if (!param.data.clickNotAutoHide) {
            this.hide();
        }
        if (param.data.callback) {
            param.data.callback.apply(param.data.handler, [this]);
        }
    };
    ConfirmPopupView.prototype.clickCancelHandler = function (data) {
        var param = this.param;
        if (param.data.cancelcallback) {
            param.data.cancelcallback.apply(param.data.handler, [this]);
        }
        this.hide();
    };
    // protected getConfirmBtnStr():string
    // {
    // 	return "sysConfirm";
    // }
    // protected getConfirmBtnName():string
    // {
    // 	return ButtonConst.BTN_NORMAL_YELLOW;
    // }
    ConfirmPopupView.prototype.getTitleStr = function () {
        return this.param.data.title;
    };
    ConfirmPopupView.prototype.getCloseBtnName = function () {
        if (this.param.data.showCloseBtn) {
            return _super.prototype.getCloseBtnName.call(this);
        }
        return null;
    };
    ConfirmPopupView.prototype.hide = function () {
        // if(this.param.data.callback){
        // 	this.param.data.callback.apply();
        // }
        _super.prototype.hide.call(this);
    };
    ConfirmPopupView.prototype.getParent = function () {
        if (this.param.data.inLayer) {
            return this.param.data.inLayer;
        }
        else {
            return _super.prototype.getParent.call(this);
        }
    };
    ConfirmPopupView.prototype.dispose = function () {
        this._callback = null;
        _super.prototype.dispose.call(this);
    };
    return ConfirmPopupView;
}(PopupView));
__reflect(ConfirmPopupView.prototype, "ConfirmPopupView");
