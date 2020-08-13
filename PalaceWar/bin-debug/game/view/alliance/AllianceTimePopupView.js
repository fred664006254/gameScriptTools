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
 * 帮会倒计时 1转移帮主 2解散帮派
 * author dky
 * date 2017/12/2
 * @class AllianceTimePopupView
 * 参数 ：title,msg,callback,handler
 *
 */
var AllianceTimePopupView = (function (_super) {
    __extends(AllianceTimePopupView, _super);
    function AllianceTimePopupView() {
        var _this = _super.call(this) || this;
        // private _useCallback:Function;
        // private _handler:any;
        _this._bgHeight = 0;
        _this._startTime = 0;
        _this._uid = null;
        _this._type = 1;
        _this._callback = null;
        return _this;
    }
    // 打开该面板时，需要传参数msg
    AllianceTimePopupView.prototype.initView = function () {
        this._uid = this.param.data.auid;
        this._type = this.param.data.type;
        this._pswd = this.param.data.pswd;
        this._startTime = GameData.serverTime + 30;
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 150;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 9;
        this.addChildToContainer(bg);
        this._bgHeight = bg.height;
        var messageStr = LanguageManager.getlocal("alliance_turnTime", ["30"]);
        if (this.param.data.type == 2) {
            messageStr = LanguageManager.getlocal("alliance_disTime", ["30"]);
        }
        this._msgTF = ComponentManager.getTextField(messageStr, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        this._msgTF.width = 480;
        this._msgTF.setColor(TextFieldConst.COLOR_BLACK);
        this._msgTF.textAlign = TextFieldConst.ALIGH_CENTER;
        this._msgTF.x = this.viewBg.x + this.viewBg.width / 2 - this._msgTF.width / 2;
        this._msgTF.y = bg.y + bg.height / 2 - this._msgTF.height / 2;
        this._msgTF.lineSpacing = 10;
        this.addChildToContainer(this._msgTF);
        var conBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "cancelBtn", this.clickConHandler, this);
        conBtn.setColor(TextFieldConst.COLOR_BLACK);
        conBtn.x = this.getShowWidth() / 2 - conBtn.width / 2;
        conBtn.y = bg.y + bg.height + 20;
        this.addChildToContainer(conBtn);
    };
    AllianceTimePopupView.prototype.tick = function () {
        var messageStr = LanguageManager.getlocal("alliance_turnTime", [this._startTime - GameData.serverTime + ""]);
        if (this.param.data.type == 2) {
            messageStr = LanguageManager.getlocal("alliance_disTime", [this._startTime - GameData.serverTime + ""]);
        }
        this._msgTF.text = messageStr;
        if (this._startTime - GameData.serverTime <= 0) {
            // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ALLIANCE_TRANSFER,{"auid":this.param.data.auid});
            if (this._type == 1) {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ALLIANCE_TRANSFER, { "auid": this._uid });
                this.hide();
            }
            if (this._type == 2) {
                this.request(NetRequestConst.REQUEST_ALLIANCE_DISBAND, { pswd: this._pswd });
                App.CommonUtil.showTip(LanguageManager.getlocal("allianceManageDisTip"));
            }
        }
    };
    //请求回调
    AllianceTimePopupView.prototype.receiveData = function (data) {
        if (!data.ret) {
            return;
        }
        if (data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_DISBAND) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceManageDisTip"));
            this.hide();
        }
    };
    // protected getConfirmBtnStr():string
    // {
    // 	return "confirmBtn";
    // }
    AllianceTimePopupView.prototype.resetBgSize = function () {
        // this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width/2- 86 -27,this._bgHeight + 30);
        _super.prototype.resetBgSize.call(this);
    };
    AllianceTimePopupView.prototype.clickConHandler = function (data) {
        if (this._type == 1) {
            App.CommonUtil.showTip(LanguageManager.getlocal("alliance_turnFail"));
        }
        if (this._type == 2) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceManageDisTip2"));
        }
        if (this.param.data.callback) {
            this.param.data.callback.apply(this.param.data.handler, null);
        }
        this.hide();
    };
    AllianceTimePopupView.prototype.clickCancelHandler = function (data) {
        // if(this.param.data.callback){
        // 	this.param.data.callback.apply(this.param.data.handler,null);
        // }
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
    AllianceTimePopupView.prototype.getTitleStr = function () {
        return this.param.data.title;
    };
    AllianceTimePopupView.prototype.getCloseBtnName = function () {
        return null;
    };
    AllianceTimePopupView.prototype.hide = function () {
        if (this._type == 1) {
            // App.CommonUtil.showTip(LanguageManager.getlocal("alliance_turnFail"));
        }
        _super.prototype.hide.call(this);
    };
    AllianceTimePopupView.prototype.dispose = function () {
        this._bgHeight = 0;
        this._msgTF = null;
        this._startTime = 0;
        this._uid = null;
        this._type = 1;
        _super.prototype.dispose.call(this);
    };
    return AllianceTimePopupView;
}(PopupView));
__reflect(AllianceTimePopupView.prototype, "AllianceTimePopupView");
//# sourceMappingURL=AllianceTimePopupView.js.map