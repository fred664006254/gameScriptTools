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
        _this._conBtn = null;
        _this._cancelBtn = null;
        _this._callback = null;
        return _this;
    }
    // 打开该面板时，需要传参数msg
    ConfirmPopupView.prototype.initView = function () {
        var view = this;
        var bg = BaseBitmap.create("popupview_content1");
        bg.width = 520;
        bg.x = view.viewBg.x + view.viewBg.width / 2 - bg.width / 2;
        bg.y = 10;
        var messageStr = this.param.data.msg;
        var msgTF = ComponentMgr.getTextField(messageStr, TextFieldConst.SIZE_CONTENT_COMMON);
        msgTF.width = 480;
        msgTF.setColor(this.param.data.txtcolor ? this.param.data.txtcolor : ColorEnums.black);
        msgTF.textAlign = TextFieldConst.ALIGH_CENTER;
        if (this.param.data.msgAlign) {
            msgTF.textAlign = this.param.data.msgAlign;
        }
        msgTF.x = bg.x + bg.width / 2 - msgTF.width / 2;
        msgTF.lineSpacing = 10;
        this.addChildToContainer(msgTF);
        bg.height = msgTF.textHeight + 70;
        msgTF.y = bg.y + bg.height / 2 - msgTF.textHeight / 2;
        var conBtn;
        if (this.param.data.iconURL) {
            conBtn = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM, "", this.clickConHandler, this);
            conBtn.setColor(ColorEnums.white);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, conBtn, bg, [0, bg.height + 20]);
            this.addChild(conBtn);
            var btnIcon = BaseBitmap.create(this.param.data.iconURL);
            conBtn.addChild(btnIcon);
            btnIcon.y = (conBtn.height - btnIcon.height) / 2 - 5;
            var txt = ComponentMgr.getTextField('11', TextFieldConst.SIZE_30, ColorEnums.white);
            conBtn.addChild(txt);
            txt.text = this.param.data.confirmTxt;
            txt.y = btnIcon.y + (btnIcon.height - txt.height) / 2 + 3;
            txt.strokeColor = ColorEnums.btnStrokeOrange;
            txt.stroke = 2;
            txt.bold = true;
            txt.setColor(ColorEnums.white);
            btnIcon.x = (conBtn.width - btnIcon.width - txt.width) / 2;
            txt.x = btnIcon.x + btnIcon.width + 5;
        }
        else {
            conBtn = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM, this.param.data.confirmTxt ? this.param.data.confirmTxt : LangMger.getlocal("confirmBtn"), this.clickConHandler, this);
            conBtn.setColor(ColorEnums.white);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, conBtn, bg, [0, bg.height + 20]);
            this.addChild(conBtn);
        }
        conBtn.x = 245;
        this._conBtn = conBtn;
        if (this.param.data.needCancel) {
            var canelStr = "canelStr";
            if (this.param.data.canelTxt) {
                canelStr = this.param.data.canelTxt;
            }
            var cancelBtn = ComponentMgr.getButton(ButtonConst.BTN_CANCEL, LangMger.getlocal(canelStr), this.clickCancelHandler, this);
            cancelBtn.setColor(ColorEnums.white);
            cancelBtn.x = 130;
            cancelBtn.y = conBtn.y;
            // cancelBtn.y = 330;
            this.addChild(cancelBtn);
            conBtn.x = 350;
            this._cancelBtn = cancelBtn;
        }
        if (this.param.data.needCheck) {
            var checkBox = ComponentMgr.getCheckBox(LangMger.getlocal("activityPopTip"));
            msgTF.y = bg.y + bg.height / 2 - msgTF.textHeight / 2 - checkBox.height / 2 - 10;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, checkBox, msgTF, [0, msgTF.textHeight + 10]);
            checkBox.name = "onekeyCheckBox";
            this.addChildToContainer(checkBox);
            checkBox.setSelected(false);
            this._checkBox = checkBox;
        }
        // conBtn.y = 330;
    };
    ConfirmPopupView.prototype.resetBgSize = function () {
        // this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width/2- 86 -27,this._bgHeight + 30);
        _super.prototype.resetBgSize.call(this);
        if (this.param.data.bgRes) {
            var viewbg = this.viewBg;
            viewbg.setRes(this.param.data.bgRes);
        }
        var th = this.container.height + 165 + this._titleBg.height;
        this.viewBg.height = (th > this.viewBg.height) ? th : this.viewBg.height;
        if (this._conBtn) {
            App.DisplayUtil.setLayoutPosition(LayoutConst.bottom, this._conBtn, this.viewBg, [0, 17]);
        }
        if (this._cancelBtn) {
            App.DisplayUtil.setLayoutPosition(LayoutConst.bottom, this._cancelBtn, this.viewBg, [0, 17]);
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
    ConfirmPopupView.prototype.isShowOpenAni = function () {
        var param = this.param;
        var openAni = ((param && param.data) ? (!param.data.notShowOpenAni) : true);
        return openAni;
    };
    // protected getShowHeight(){
    // 
    // 	return 500;
    // }
    // protected getConfirmBtnStr():string
    // {
    // 	return "sysConfirm";
    // }
    // protected getConfirmBtnName():string
    // {
    // 	return ButtonConst.BTN_LONG_YELLOW;
    // }
    ConfirmPopupView.prototype.getTitleStr = function () {
        return this.param.data.title;
    };
    ConfirmPopupView.prototype.getCloseBtnName = function () {
        return this.param.data.needClose === 0 ? null : _super.prototype.getCloseBtnName.call(this);
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
    ConfirmPopupView.prototype.dispose = function () {
        var param = this.param;
        if (this._checkBox && this._checkBox.checkSelected()) {
            param.data.checkcallback.apply(param.data.handler);
        }
        this._callback = null;
        this._conBtn = null;
        this._cancelBtn = null;
        _super.prototype.dispose.call(this);
    };
    return ConfirmPopupView;
}(PopupView));
__reflect(ConfirmPopupView.prototype, "ConfirmPopupView");
//# sourceMappingURL=ConfirmPopupView.js.map