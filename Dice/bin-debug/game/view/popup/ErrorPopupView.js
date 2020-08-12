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
    ErrorPopupView.prototype.getParent = function () {
        return LayerMgr.maskLayer;
    };
    // 打开该面板时，需要传参数msg
    ErrorPopupView.prototype.initView = function () {
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 124;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 9;
        this.addChildToContainer(bg);
        var messageStr = this.param.data.msg;
        var messageTF = ComponentMgr.getTextField(messageStr, TextFieldConst.SIZE_CONTENT_COMMON, ColorEnums.black);
        messageTF.wordWrap = true;
        messageTF.width = 400;
        this.height = 200;
        messageTF.x = this.getShowWidth() / 2 - messageTF.width / 2;
        messageTF.y = 30;
        this.addChildToContainer(messageTF);
        if (this.param.data.title) {
            this.titleTF.text = this.param.data.title;
        }
    };
    // protected getConfirmBtnStr():string
    // {
    // 	return "confirmBtn";
    // }
    ErrorPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        // this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width/2- 86 -27,this.container.height-70);
    };
    ErrorPopupView.prototype.getConfirmBtnStr = function () {
        return LangMger.getlocal("confirmBtn");
    };
    ErrorPopupView.prototype.getConfirmBtnName = function () {
        return ButtonConst.BTN_CONFIRM;
    };
    ErrorPopupView.prototype.getTitleStr = function () {
        return LangMger.getlocal("loginFail");
    };
    ErrorPopupView.prototype.getCloseBtnName = function () {
        if (this.param && this.param.data && this.param.data.showCloseBtn) {
            return _super.prototype.getCloseBtnName.call(this);
        }
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
//# sourceMappingURL=ErrorPopupView.js.map