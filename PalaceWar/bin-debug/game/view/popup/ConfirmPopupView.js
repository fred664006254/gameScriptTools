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
        _this._checkBox = null;
        _this._bg = null;
        _this._msgTf = null;
        _this._conBtn = null;
        _this._cancelBtn = null;
        // protected get uiType():string
        // {
        // 	return "";
        // }
        _this._callback = null;
        return _this;
    }
    // 打开该面板时，需要传参数msg
    ConfirmPopupView.prototype.initView = function () {
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = this.param.data.height || 150;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 9;
        this.addChildToContainer(bg);
        this._bg = bg;
        this._bgHeight = bg.height;
        var messageStr = this.param.data.msg;
        var msgTF = ComponentManager.getTextField(messageStr, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        msgTF.width = 480;
        msgTF.setColor(this.param.data.txtcolor ? this.param.data.txtcolor : TextFieldConst.COLOR_BLACK);
        msgTF.textAlign = TextFieldConst.ALIGH_CENTER;
        msgTF.x = this.viewBg.x + this.viewBg.width / 2 - msgTF.width / 2;
        msgTF.lineSpacing = 10;
        msgTF.y = bg.y + bg.height / 2 - msgTF.textHeight / 2;
        this.addChildToContainer(msgTF);
        this._msgTf = msgTF;
        var conBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, this.param.data.confirmTxt ? this.param.data.confirmTxt : "confirmBtn", this.clickConHandler, this);
        conBtn.setColor(TextFieldConst.COLOR_BLACK);
        conBtn.x = this.getShowWidth() / 2 - conBtn.width / 2;
        conBtn.y = bg.y + bg.height + 20;
        this.addChildToContainer(conBtn);
        this._conBtn = conBtn;
        if (this.param.data.needCancel) {
            var canelStr = "cancelBtn";
            if (this.param.data.canelTxt) {
                canelStr = this.param.data.canelTxt;
            }
            var cancelBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_RED, canelStr, this.clickCancelHandler, this);
            cancelBtn.setColor(TextFieldConst.COLOR_BLACK);
            cancelBtn.x = this.viewBg.width / 2 - 50 - cancelBtn.width;
            cancelBtn.y = bg.y + bg.height + 20;
            this.addChildToContainer(cancelBtn);
            conBtn.x = this.viewBg.width / 2 + 50;
            this._cancelBtn = cancelBtn;
        }
        if (this.param.data.needCheck) {
            var checkBox = ComponentManager.getCheckBox(LanguageManager.getlocal("activityPopTip"));
            msgTF.y = bg.y + bg.height / 2 - msgTF.textHeight / 2 - checkBox.height / 2 - 10;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, checkBox, msgTF, [0, msgTF.textHeight + 10]);
            checkBox.name = "onekeyCheckBox";
            this.addChildToContainer(checkBox);
            checkBox.setSelected(false);
            this._checkBox = checkBox;
        }
    };
    // protected getConfirmBtnStr():string
    // {
    // 	return "confirmBtn";
    // }
    ConfirmPopupView.prototype.resetBgSize = function () {
        // this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width/2- 86 -27,this._bgHeight + 30);
        if (this.param.data.bgRes) {
            var viewbg = this.viewBg;
            viewbg.setRes(this.param.data.bgRes);
            _super.prototype.resetBgSize.call(this);
            if (this.param.data.titleTfColor) {
                this.titleTF.setColor(this.param.data.titleTfColor);
            }
            if (this.param.data.titleTfOffY) {
                this.titleTF.y = this.viewBg.y + this.param.data.titleTfOffY;
            }
            this.closeBtn.y = this.viewBg.y - 28;
            this._bg.x = this.viewBg.width / 2 - this._bg.width / 2;
            this._bg.y = 9;
            this._msgTf.x = this.viewBg.x + this.viewBg.width / 2 - this._msgTf.width / 2;
            this._msgTf.y = this._bg.y + this._bg.height / 2 - this._msgTf.textHeight / 2;
            this._conBtn.x = this.getShowWidth() / 2 - this._conBtn.width / 2;
            this._conBtn.y = this._bg.y + this._bg.height + 20;
            if (this.param.data.needCancel) {
                this._cancelBtn.x = this.viewBg.width / 2 - 50 - this._cancelBtn.width;
                this._cancelBtn.y = this._bg.y + this._bg.height + 20;
                this._conBtn.x = this.viewBg.width / 2 + 50;
            }
            if (this.param.data.needCheck) {
                this._msgTf.y = this._bg.y + this._bg.height / 2 - this._msgTf.textHeight / 2 - this._checkBox.height / 2 - 10;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, this._checkBox, this._msgTf, [0, this._msgTf.textHeight + 10]);
            }
        }
        else {
            _super.prototype.resetBgSize.call(this);
        }
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
        // if(this.param.data.callback){
        // 	this.param.data.callback.apply(this.param.data.handler,null);
        // }
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
        return this.param.data.needClose === 1 ? _super.prototype.getCloseBtnName.call(this) : null;
    };
    ConfirmPopupView.prototype.closeHandler = function () {
        var param = this.param;
        if (param.data.closecallback) {
            param.data.closecallback.apply(param.data.handler, [this]);
        }
        _super.prototype.closeHandler.call(this);
    };
    ConfirmPopupView.prototype.hide = function () {
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
    ConfirmPopupView.prototype.getBgExtraHeight = function () {
        return 20;
    };
    ConfirmPopupView.prototype.dispose = function () {
        var param = this.param;
        if (this._checkBox && this._checkBox.checkSelected()) {
            param.data.checkcallback.apply(param.data.handler);
        }
        this._callback = null;
        this._bg = null;
        this._msgTf = null;
        this._conBtn = null;
        this._cancelBtn = null;
        this._checkBox = null;
        _super.prototype.dispose.call(this);
    };
    return ConfirmPopupView;
}(PopupView));
__reflect(ConfirmPopupView.prototype, "ConfirmPopupView");
//# sourceMappingURL=ConfirmPopupView.js.map