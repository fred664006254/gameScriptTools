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
var QinafuPopupView = (function (_super) {
    __extends(QinafuPopupView, _super);
    function QinafuPopupView() {
        var _this = _super.call(this) || this;
        _this._inputTextField = null;
        return _this;
    }
    QinafuPopupView.prototype.getTitleStr = function () {
        return "qianfuViewTitle";
    };
    QinafuPopupView.prototype.getCloseBtnName = function () {
        return null;
    };
    QinafuPopupView.prototype.initView = function () {
        var _this = this;
        var desc = ComponentManager.getTextField(LanguageManager.getlocal("qianfuPopupViewDesc"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        desc.width = 470;
        desc.lineSpacing = 5;
        desc.textAlign = egret.HorizontalAlign.CENTER;
        desc.setPosition(this.viewBg.width / 2 - desc.width / 2, 30);
        this.addChildToContainer(desc);
        var inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL, 340, 44, "public_9_bg5");
        inputTF.x = this.viewBg.width / 2 - 250;
        inputTF.y = desc.y + desc.height + 50;
        this.addChildToContainer(inputTF);
        var limiisshow = this.param.data.limiisshow;
        this._inputTextField = inputTF.getChildByName("textField");
        this._inputTextField.text = limiisshow;
        this._inputTextField.type = egret.TextFieldType.INPUT;
        this._inputTextField.addEventListener(egret.TextEvent.CHANGE, function () {
            _this._inputTextField.text = limiisshow;
        }, this, false, 2);
        //查找按钮
        var confirmBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "bureaucratGuide_copy", this.confirmClick, this);
        confirmBtn.setPosition(this.viewBg.width / 2 + 102, inputTF.y + inputTF.height / 2 - confirmBtn.height / 2);
        this.addChildToContainer(confirmBtn);
    };
    QinafuPopupView.prototype.confirmClick = function () {
        // if(window["clipboardData"]){
        //     window["clipboardData"].setData("text", this._inputTextField.text);
        //     App.CommonUtil.showTip(LanguageManager.getlocal("qianfuCopySuccess"));
        // }
        // else
        // {
        //      App.CommonUtil.showTip(LanguageManager.getlocal("qianfuCopyFail"));
        // }
        var input = document.createElement("input");
        input.value = this._inputTextField.text;
        document.body.appendChild(input);
        input.select();
        input.setSelectionRange(0, input.value.length),
            document.execCommand('Copy');
        document.body.removeChild(input);
        App.CommonUtil.showTip(LanguageManager.getlocal("welfareViewQQGroup5"));
        if (PlatformManager.checkIsWanbaSp()) {
            RSDKHelper.openUrl("https://1106558780.urlshare.cn/home?_proxy=1&_wv=2147628839&_offline=1", null, null);
        }
    };
    QinafuPopupView.prototype.dispose = function () {
        this._inputTextField = null;
        _super.prototype.dispose.call(this);
    };
    return QinafuPopupView;
}(PopupView));
__reflect(QinafuPopupView.prototype, "QinafuPopupView");
//# sourceMappingURL=QinafuPopupView.js.map