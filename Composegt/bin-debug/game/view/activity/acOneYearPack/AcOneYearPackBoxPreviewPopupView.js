/*
author : yanyuling
desc : 周年庆特惠转盘活动
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
var AcOneYearPackBoxPreviewPopupView = (function (_super) {
    __extends(AcOneYearPackBoxPreviewPopupView, _super);
    function AcOneYearPackBoxPreviewPopupView() {
        return _super.call(this) || this;
    }
    AcOneYearPackBoxPreviewPopupView.prototype.initView = function () {
        var bg = BaseBitmap.create("oneyearpack_previewbg");
        bg.x = GameConfig.stageWidth / 2 - bg.width / 2;
        bg.y = GameConfig.stageHeigth / 2 - bg.height / 2;
        this.addChild(bg);
        var clostBtn1 = ComponentManager.getButton("btn_closebtn4", null, this.hide, this);
        clostBtn1.x = bg.x + bg.width - clostBtn1.width + 15;
        clostBtn1.y = bg.y + 40;
        this.addChild(clostBtn1);
        var data = this.param.data.data;
        var txt1 = ComponentManager.getTextField(LanguageManager.getlocal("acOneYearPack_boxpreviewtxt1"), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        txt1.x = bg.x + bg.width / 2 - txt1.width / 2;
        txt1.y = bg.y + 68;
        this.addChild(txt1);
        var txt2 = ComponentManager.getTextField(LanguageManager.getlocal("acOneYearPack_boxpreviewtxt2", ["" + data[0]]), 20, TextFieldConst.COLOR_BROWN);
        txt2.x = bg.x + bg.width / 2 - txt2.width / 2;
        txt2.y = txt1.y + 40;
        this.addChild(txt2);
        var txt3 = ComponentManager.getTextField(LanguageManager.getlocal("acOneYearPack_boxpreviewtxt3", ["" + data[1]]), 20, TextFieldConst.COLOR_BROWN);
        txt3.x = bg.x + bg.width / 2 - txt3.width / 2;
        txt3.y = txt2.y + 30;
        this.addChild(txt3);
        var txt4 = ComponentManager.getTextField(LanguageManager.getlocal("acOneYearPack_boxpreviewtxt4"), 20, TextFieldConst.COLOR_BROWN);
        txt4.x = bg.x + bg.width / 2 - txt4.width / 2;
        txt4.y = txt3.y + 35;
        this.addChild(txt4);
        var boxImg = BaseBitmap.create("oneyearpack_box");
        boxImg.x = bg.x + bg.width / 2 - boxImg.width / 2;
        boxImg.y = txt4.y + 20;
        this.addChild(boxImg);
        var restr = "6_" + data[2] + "_1";
        var tmpItemvo = GameData.formatRewardItem(restr)[0];
        boxImg.addTouchTap(function (event, item) {
            ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW, item);
        }, this, [tmpItemvo]);
        var txt5 = ComponentManager.getTextField("", 16, TextFieldConst.COLOR_BROWN);
        txt5.width = bg.width - 90;
        txt5.multiline = true;
        txt5.lineSpacing = 3;
        txt5.text = LanguageManager.getlocal("acOneYearPack_boxtxt"); // tmpItemvo.desc;
        // LanguageManager.getlocal("acOneYearPack_boxpreviewtxt4")
        txt5.x = bg.x + bg.width / 2 - txt5.width / 2;
        txt5.y = boxImg.y + boxImg.height + 35;
        this.addChild(txt5);
    };
    AcOneYearPackBoxPreviewPopupView.prototype.getCloseBtnName = function () {
        return null;
    };
    AcOneYearPackBoxPreviewPopupView.prototype.getBgName = function () {
        return null;
    };
    AcOneYearPackBoxPreviewPopupView.prototype.getTitleStr = function () {
        return null;
    };
    AcOneYearPackBoxPreviewPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "oneyearpack_previewbg",
        ]);
    };
    AcOneYearPackBoxPreviewPopupView.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return AcOneYearPackBoxPreviewPopupView;
}(PopupView));
__reflect(AcOneYearPackBoxPreviewPopupView.prototype, "AcOneYearPackBoxPreviewPopupView");
