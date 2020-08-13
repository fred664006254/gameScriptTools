/**
 * 实名认证领取奖励
 * author shaoliang
 * date 2019/2/26
 * @class NewversionPopupView
 */
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
var NewversionPopupView = (function (_super) {
    __extends(NewversionPopupView, _super);
    function NewversionPopupView() {
        var _this = _super.call(this) || this;
        _this._inputContainer = null;
        _this._rechargeBtn = null;
        _this._nameInput = null;
        _this._idInput = null;
        return _this;
    }
    NewversionPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "newversionviewbg",
            "newversionviewbtn",
        ]);
    };
    NewversionPopupView.prototype.initBg = function () {
        this.viewBg = BaseBitmap.create("newversionviewbg");
        // this.viewBg.width = 640;
        // this.viewBg.height = 861;
        this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2, GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
        this.addChild(this.viewBg);
    };
    NewversionPopupView.prototype.initView = function () {
        // let bg:BaseBitmap = BaseBitmap.create("realnamerewards_bg");
        // bg.setPosition(this.viewBg.width/2-bg.width/2,0);
        // this.addChildToContainer(bg);
        var desc = ComponentManager.getTextField(LanguageManager.getlocal("newversion_desc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        desc.width = 240;
        desc.lineSpacing = 10;
        desc.setPosition(270, 190);
        this.addChildToContainer(desc);
        var submitBtn = ComponentManager.getButton("newversionviewbtn", "", this.okBtnClick, this);
        submitBtn.setText("", false);
        submitBtn.setPosition(this.width / 2 - submitBtn.width / 2, 600);
        this.addChildToContainer(submitBtn);
    };
    NewversionPopupView.prototype.okBtnClick = function () {
        if (App.DeviceUtil.IsHtml5()) {
            window.open("https://play.google.com/store/apps/details?id=com.jsmr.ggplay.htcthd");
        }
    };
    //不显示标题名字
    NewversionPopupView.prototype.getTitleStr = function () {
        return null;
    };
    NewversionPopupView.prototype.getTitleBgName = function () {
        return null;
    };
    // 不使用组件的关闭按钮
    // protected getCloseBtnName():string
    // {
    // 	return null;
    // }
    /**
     * 重新一下关闭按钮
     *
     */
    NewversionPopupView.prototype.getCloseBtnName = function () {
        return "btn_win_closebtn";
    };
    NewversionPopupView.prototype.rechargeHandle = function () {
    };
    // protected getTitleStr():string
    // {
    // 	return "realname2PopupViewTitle";
    // }
    NewversionPopupView.prototype.getBgExtraHeight = function () {
        return 0;
    };
    NewversionPopupView.prototype.dispose = function () {
        this._inputContainer = null;
        this._nameInput = null;
        this._idInput = null;
        _super.prototype.dispose.call(this);
    };
    return NewversionPopupView;
}(PopupView));
__reflect(NewversionPopupView.prototype, "NewversionPopupView");
