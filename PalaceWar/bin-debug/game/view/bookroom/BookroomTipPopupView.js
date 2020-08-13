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
 * 确认取消弹板
 * author dmj
 * date 2017/10/10
 * @class ItemUseConstPopupView
 */
var BookroomTipPopupView = (function (_super) {
    __extends(BookroomTipPopupView, _super);
    function BookroomTipPopupView() {
        return _super.call(this) || this;
    }
    BookroomTipPopupView.prototype.getBgExtraHeight = function () {
        return 30;
    };
    BookroomTipPopupView.prototype.initView = function () {
        var data = this.param.data;
        if (data.cancelCallback) {
            this._cancelCallback = data.cancelCallback;
        }
        this._confirmCallback = data.confirmCallback;
        this._handler = data.handler;
        var msg = "";
        if (data.type == 1) {
            if (data.month == 2) {
                msg = LanguageManager.getlocal("bookroomnobuydes1");
            }
            if (data.year == 2) {
                msg = LanguageManager.getlocal("bookroomnobuydes2");
            }
        }
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = data.height || 224;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 9;
        this.addChildToContainer(bg);
        var temY = 29;
        var temW = 100;
        var temH = 100;
        var msgTF = ComponentManager.getTextField(msg, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        msgTF.width = 480;
        // msgTF.height = bg.height;
        msgTF.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
        // msgTF.textAlign =TextFieldConst.ALIGH_CENTER;
        msgTF.textAlign = TextFieldConst.ALIGH_MIDDLE; //TextFieldConst.ALIGH_MIDDLE;
        msgTF.x = this.viewBg.x + this.viewBg.width / 2 - msgTF.width / 2;
        msgTF.y = bg.y + bg.height / 2 - msgTF.height / 2; //temY + temH + 25;
        msgTF.lineSpacing = 3;
        this.addChildToContainer(msgTF);
        // this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,msgTF,bg);
        this._cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "cancelBtn", this.clickCancelHandler, this);
        this._cancelBtn.x = this.viewBg.x + this.viewBg.width / 2 - this._cancelBtn.width - 50;
        this._cancelBtn.y = bg.y + bg.height + 25;
        this._cancelBtn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChildToContainer(this._cancelBtn);
    };
    BookroomTipPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width / 2 + 50, this._cancelBtn.y);
    };
    BookroomTipPopupView.prototype.clickConfirmHandler = function (data) {
        if (this._confirmCallback) {
            this._confirmCallback.apply(this._handler, []);
        }
        this.hide();
    };
    BookroomTipPopupView.prototype.getConfirmBtnStr = function () {
        return "sysConfirm";
    };
    BookroomTipPopupView.prototype.getTitleStr = function () {
        return "itemUseConstPopupViewTitle";
    };
    BookroomTipPopupView.prototype.clickCancelHandler = function (param) {
        if (this._cancelCallback) {
            this._cancelCallback.apply(this._handler, []);
        }
        this.hide();
    };
    BookroomTipPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    BookroomTipPopupView.prototype.getConfirmBtnName = function () {
        return ButtonConst.BTN_NORMAL_YELLOW;
    };
    BookroomTipPopupView.prototype.dispose = function () {
        this._cancelCallback = null;
        this._confirmCallback = null;
        this._handler = null;
        this._cancelBtn = null;
        _super.prototype.dispose.call(this);
    };
    return BookroomTipPopupView;
}(PopupView));
__reflect(BookroomTipPopupView.prototype, "BookroomTipPopupView");
//# sourceMappingURL=BookroomTipPopupView.js.map