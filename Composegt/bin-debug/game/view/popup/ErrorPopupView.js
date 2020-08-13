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
 * 登录错误弹板
 * author dmj
 * date 2017/9/20
 * @class ErrorPopupView
 */
var ErrorPopupView = (function (_super) {
    __extends(ErrorPopupView, _super);
    function ErrorPopupView() {
        var _this = _super.call(this) || this;
        _this._callback = null;
        _this._isApply = false;
        return _this;
    }
    // 打开该面板时，需要传参数msg
    ErrorPopupView.prototype.initView = function () {
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 124;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 9;
        this.addChildToContainer(bg);
        var messageStr = this.param.data.msg;
        var messageTF = new BaseTextField();
        messageTF.text = messageStr;
        messageTF.size = TextFieldConst.FONTSIZE_CONTENT_COMMON;
        messageTF.x = this.getShowWidth() / 2 - messageTF.width / 2;
        messageTF.y = 30;
        this.height = 200;
        this.addChildToContainer(messageTF);
        var titleStr = this.param.data.title;
        if (this.titleTF && titleStr) {
            this.titleTF.text = titleStr;
        }
    };
    // protected getConfirmBtnStr():string
    // {
    // 	return "confirmBtn";
    // }
    ErrorPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width / 2 - 86 - 27, 70);
    };
    ErrorPopupView.prototype.getConfirmBtnStr = function () {
        return "sysConfirm";
    };
    ErrorPopupView.prototype.getConfirmBtnName = function () {
        return ButtonConst.BTN_NORMAL_YELLOW;
    };
    ErrorPopupView.prototype.getTitleStr = function () {
        return "loginFail";
    };
    ErrorPopupView.prototype.getCloseBtnName = function () {
        return null;
    };
    ErrorPopupView.prototype.hide = function () {
        if (!this._isApply) {
            this._isApply = true;
            if (this.param.data.callback) {
                this.param.data.callback.apply();
            }
            _super.prototype.hide.call(this);
        }
        else {
            this._isApply = false;
        }
    };
    ErrorPopupView.prototype.dispose = function () {
        this._callback = null;
        this._isApply = false;
        _super.prototype.dispose.call(this);
    };
    return ErrorPopupView;
}(PopupView));
__reflect(ErrorPopupView.prototype, "ErrorPopupView");
