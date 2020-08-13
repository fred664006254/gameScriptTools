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
var ComposeNeedGoldPopupView = (function (_super) {
    __extends(ComposeNeedGoldPopupView, _super);
    function ComposeNeedGoldPopupView() {
        return _super.call(this) || this;
    }
    ComposeNeedGoldPopupView.prototype.initView = function () {
        var _this = this;
        var txt1 = ComponentManager.getTextField(LanguageManager.getlocal("composeneedGold1"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        txt1.width = 140;
        txt1.textAlign = TextFieldConst.ALIGH_CENTER;
        txt1.setPosition(75, 440);
        this.addChildToContainer(txt1);
        var btnKey1 = "composegoShop";
        var btn1 = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, btnKey1, function () {
            ViewController.getInstance().openView(ViewConst.COMMON.SHOPVIEW_TAB1);
            _this.hide();
        }, this);
        btn1.setPosition(82, 510);
        this.addChildToContainer(btn1);
        var txt2 = ComponentManager.getTextField(LanguageManager.getlocal("composeneedGold2"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        txt2.width = 140;
        txt2.textAlign = TextFieldConst.ALIGH_CENTER;
        txt2.setPosition(253, 440);
        this.addChildToContainer(txt2);
        var btnKey2 = "composegoChallenge";
        var btn2 = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, btnKey2, function () {
            ViewController.getInstance().openView(ViewConst.COMMON.CHALLENGEVIEW);
            _this.hide();
        }, this);
        btn2.setPosition(260, 510);
        this.addChildToContainer(btn2);
        var txt3 = ComponentManager.getTextField(LanguageManager.getlocal("composeneedGold3"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        txt3.width = 140;
        txt3.textAlign = TextFieldConst.ALIGH_CENTER;
        txt3.setPosition(429, 440);
        this.addChildToContainer(txt3);
        var btnKey3 = "composegoLevy";
        var btn3 = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, btnKey3, function () {
            ViewController.getInstance().openView(ViewConst.COMMON.LEVYVIEW);
            _this.hide();
        }, this);
        btn3.setPosition(432, 510);
        this.addChildToContainer(btn3);
    };
    ComposeNeedGoldPopupView.prototype.getTitleStr = function () {
        return null;
    };
    ComposeNeedGoldPopupView.prototype.getCloseBtnName = function () {
        return "btn_win_closebtn";
    };
    ComposeNeedGoldPopupView.prototype.getBgName = function () {
        return "composeneedgoldviewbg";
    };
    ComposeNeedGoldPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.closeBtn.y = this.viewBg.y + 5;
    };
    ComposeNeedGoldPopupView.prototype.getResourceList = function () {
        var resArr = [
            "composeneedlvupviewbg_new_tipbg"
        ];
        return _super.prototype.getResourceList.call(this).concat(resArr);
    };
    ComposeNeedGoldPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return ComposeNeedGoldPopupView;
}(PopupView));
__reflect(ComposeNeedGoldPopupView.prototype, "ComposeNeedGoldPopupView");
