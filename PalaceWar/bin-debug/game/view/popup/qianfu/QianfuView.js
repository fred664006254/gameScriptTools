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
var QianfuView = (function (_super) {
    __extends(QianfuView, _super);
    function QianfuView() {
        var _this = _super.call(this) || this;
        _this._inputTextField = null;
        return _this;
    }
    Object.defineProperty(QianfuView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    QianfuView.prototype.initView = function () {
        var desc = ComponentManager.getTextField(LanguageManager.getlocal("qianfuViewDesc"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        desc.width = 470;
        desc.lineSpacing = 5;
        desc.textAlign = egret.HorizontalAlign.CENTER;
        desc.setPosition(this.viewBg.width / 2 - desc.width / 2, 30);
        this.addChildToContainer(desc);
        var inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL, 350, 44, "public_9_bg5", LanguageManager.getlocal("qianfuInput"), 0xa4917f);
        inputTF.x = this.viewBg.width / 2 - inputTF.width / 2;
        inputTF.y = desc.y + desc.height + 35;
        this.addChildToContainer(inputTF);
        this._inputTextField = inputTF.getChildByName("textField");
        this._inputTextField.restrict = "A-Z a-z 0-9";
        this._inputTextField.maxChars = 20;
        //查找按钮
        var confirmBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, "confirmBtn", this.confirmClick, this);
        confirmBtn.setPosition(this.viewBg.width / 2 - confirmBtn.width / 2, inputTF.y + inputTF.height + 15);
        this.addChildToContainer(confirmBtn);
    };
    QianfuView.prototype.confirmClick = function () {
        if (this._inputTextField.text.length < 1) {
            App.CommonUtil.showTip(LanguageManager.getlocal("qianfuInput"));
            return;
        }
        this.request(NetRequestConst.REQUEST_USER_SETBIND, { limiisshow: this._inputTextField.text });
    };
    QianfuView.prototype.receiveData = function (data) {
        if (data.ret == true) {
            var flag = data.data.data.flag;
            if (flag == 2) {
                App.CommonUtil.showTip(LanguageManager.getlocal("qianfuSuccess"));
                this.hide();
                LoginManager.changeServer();
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("qianfuFail"));
            }
        }
    };
    QianfuView.prototype.getBgExtraHeight = function () {
        return 20;
    };
    QianfuView.prototype.dispose = function () {
        this._inputTextField = null;
        _super.prototype.dispose.call(this);
    };
    return QianfuView;
}(PopupView));
__reflect(QianfuView.prototype, "QianfuView");
//# sourceMappingURL=QianfuView.js.map