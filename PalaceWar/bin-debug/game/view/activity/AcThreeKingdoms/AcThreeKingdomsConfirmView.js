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
 * 三国加入确认面板
 * author qianjun
 * date 2017/11/24
 * @class ConfirmPopupView
 * 参数 ：title,msg,callback,handler  needCancel
 *
 */
var AcThreeKingdomsConfirmView = (function (_super) {
    __extends(AcThreeKingdomsConfirmView, _super);
    function AcThreeKingdomsConfirmView() {
        var _this = _super.call(this) || this;
        // private _useCallback:Function;
        // private _handler:any;
        _this._bgHeight = 0;
        _this._checkBox = null;
        _this._callback = null;
        return _this;
    }
    AcThreeKingdomsConfirmView.prototype.getBgName = function () {
        return "popupview_bg3";
    };
    AcThreeKingdomsConfirmView.prototype.getCloseBtnName = function () {
        return "popupview_closebtn2";
    };
    // 打开该面板时，需要传参数msg
    AcThreeKingdomsConfirmView.prototype.initView = function () {
        var bg = BaseBitmap.create("public_9_bg94");
        bg.width = 515;
        bg.height = 210;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 9;
        this.addChildToContainer(bg);
        this._bgHeight = bg.height;
        var messageStr = this.param.data.msg;
        var msgTF = ComponentManager.getTextField(messageStr, 18);
        msgTF.width = 490;
        msgTF.setColor(this.param.data.txtcolor ? this.param.data.txtcolor : TextFieldConst.COLOR_BROWN);
        msgTF.textAlign = TextFieldConst.ALIGH_CENTER;
        msgTF.x = this.viewBg.x + this.viewBg.width / 2 - msgTF.width / 2;
        msgTF.lineSpacing = 10;
        msgTF.y = bg.y + 20;
        this.addChildToContainer(msgTF);
        if (this.param.data.recommand) {
            var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsTip19", '1')), 18, TextFieldConst.COLOR_WARN_GREEN2);
            tipTxt.x = this.viewBg.x + this.viewBg.width / 2 - tipTxt.width / 2;
            tipTxt.y = msgTF.y + msgTF.height + 45;
            this.addChildToContainer(tipTxt);
            bg.height = tipTxt.y + tipTxt.textHeight + 20 - 5;
        }
        else {
            bg.height = 160;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, msgTF, bg);
        }
        var conBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, this.param.data.confirmTxt ? this.param.data.confirmTxt : "confirmBtn", this.clickConHandler, this);
        conBtn.setColor(TextFieldConst.COLOR_BROWN);
        conBtn.x = bg.x + bg.width - conBtn.width - 60;
        conBtn.y = bg.y + bg.height + 20;
        this.addChildToContainer(conBtn);
        if (this.param.data.needCancel) {
            var canelStr = "cancelBtn";
            if (this.param.data.canelTxt) {
                canelStr = this.param.data.canelTxt;
            }
            var cancelBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_RED, canelStr, this.clickCancelHandler, this);
            cancelBtn.setColor(TextFieldConst.COLOR_BROWN);
            cancelBtn.x = bg.x + 60;
            cancelBtn.y = bg.y + bg.height + 20;
            this.addChildToContainer(cancelBtn);
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
    AcThreeKingdomsConfirmView.prototype.resetBgSize = function () {
        // this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width/2- 86 -27,this._bgHeight + 30);
        _super.prototype.resetBgSize.call(this);
        if (this.param.data.bgRes) {
            var viewbg = this.viewBg;
            viewbg.setRes(this.param.data.bgRes);
        }
    };
    AcThreeKingdomsConfirmView.prototype.isTouchMaskClose = function () {
        return (this.param && this.param.data && this.param.data.touchMaskClose) ? true : false;
    };
    AcThreeKingdomsConfirmView.prototype.clickConHandler = function (data) {
        var param = this.param;
        if (!param.data.clickNotAutoHide) {
            this.hide();
        }
        if (param.data.callback) {
            param.data.callback.apply(param.data.handler, [this]);
        }
        this.hide();
    };
    AcThreeKingdomsConfirmView.prototype.clickCancelHandler = function (data) {
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
    AcThreeKingdomsConfirmView.prototype.getTitleStr = function () {
        return this.param.data.title;
    };
    AcThreeKingdomsConfirmView.prototype.closeHandler = function () {
        var param = this.param;
        if (param.data.closecallback) {
            param.data.closecallback.apply(param.data.handler, [this]);
        }
        _super.prototype.closeHandler.call(this);
    };
    AcThreeKingdomsConfirmView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    AcThreeKingdomsConfirmView.prototype.getParent = function () {
        if (this.param.data.inLayer) {
            return this.param.data.inLayer;
        }
        else {
            return _super.prototype.getParent.call(this);
        }
    };
    AcThreeKingdomsConfirmView.prototype.dispose = function () {
        var param = this.param;
        if (this._checkBox && this._checkBox.checkSelected()) {
            param.data.checkcallback.apply(param.data.handler);
        }
        this._callback = null;
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsConfirmView;
}(PopupView));
__reflect(AcThreeKingdomsConfirmView.prototype, "AcThreeKingdomsConfirmView");
//# sourceMappingURL=AcThreeKingdomsConfirmView.js.map