/**
 * 官报
 * @class AcCarnivalNightReportView
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
var AcCarnivalNightReportView = (function (_super) {
    __extends(AcCarnivalNightReportView, _super);
    function AcCarnivalNightReportView() {
        return _super.call(this) || this;
    }
    AcCarnivalNightReportView.prototype.getTitleBgName = function () {
        return null;
    };
    AcCarnivalNightReportView.prototype.getTitleStr = function () {
        return null;
    };
    AcCarnivalNightReportView.prototype.getBgName = function () {
        return "public_9_bg8";
    };
    AcCarnivalNightReportView.prototype.initView = function () {
        this.addTouchTap(this.touchTap, this, null);
        this.viewBg.touchEnabled = true;
        var code = this.param.data.code;
        var lookBg = BaseBitmap.create("carnivalnight_guanbaobg-" + code);
        // lookBg.scaleX = 2;
        //lookBg.height = 300;
        lookBg.setPosition(GameConfig.stageWidth / 2 - lookBg.width / 2, GameConfig.stageHeigth / 2 - lookBg.height / 2);
        this.addChild(lookBg);
        //名字
        var nameBM = BaseBitmap.create('carnivalnight_title-' + code);
        nameBM.anchorOffsetX = nameBM.width / 2;
        nameBM.anchorOffsetY = nameBM.height / 2;
        nameBM.setPosition(lookBg.x + lookBg.width / 2, lookBg.y + 60);
        nameBM.setScale(0.6);
        this.addChild(nameBM);
        // let nameTf:BaseTextField = ComponentManager.getTextField( LanguageManager.getlocal("AcCarnivalNightReportViewTitle-"+ code),TextFieldConst.FONTSIZE_TITLE_SMALL);
        // nameTf.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        // nameTf.setPosition(lookBg.width/2 - nameTf.width/2, lookBg.y + 40);
        // this.addChild(nameTf);
        var descTf = ComponentManager.getTextField(LanguageManager.getlocal("AcCarnivalNightReportDesc-" + code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_INPUT);
        descTf.lineSpacing = 10;
        descTf.width = lookBg.width - 80;
        descTf.setPosition(lookBg.width / 2 - descTf.width / 2, lookBg.y + 120);
        this.addChild(descTf);
        // let nextTf:BaseTextField = ComponentManager.getTextField( LanguageManager.getlocal("clickContinue"),TextFieldConst.FONTSIZE_TITLE_SMALL);
        // nextTf.textColor = TextFieldConst.COLOR_WARN_YELLOW2;
        // // nextTf.width = lookBg.width - 70
        // nextTf.setPosition(470, lookBg.y + 255);
        // this.addChild(nextTf);
    };
    AcCarnivalNightReportView.prototype.touchTap = function () {
        this.hide();
    };
    AcCarnivalNightReportView.prototype.dispose = function () {
        // this._childId = null;
        _super.prototype.dispose.call(this);
    };
    AcCarnivalNightReportView.prototype.getResourceList = function () {
        var code = this.param.data.code;
        return _super.prototype.getResourceList.call(this).concat([
            "carnivalnight_guanbaobg-" + code
        ]);
    };
    return AcCarnivalNightReportView;
}(BaseView));
__reflect(AcCarnivalNightReportView.prototype, "AcCarnivalNightReportView");
