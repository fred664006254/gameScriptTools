/**
 * 官报
 * author zhaozhantao
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
var AcFiveTigersReportView = (function (_super) {
    __extends(AcFiveTigersReportView, _super);
    function AcFiveTigersReportView() {
        return _super.call(this) || this;
    }
    AcFiveTigersReportView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "fivetigers_reportbg-" + this.param.data.code
        ]);
    };
    AcFiveTigersReportView.prototype.getTitleBgName = function () {
        return null;
    };
    AcFiveTigersReportView.prototype.getTitleStr = function () {
        return null;
    };
    AcFiveTigersReportView.prototype.getBgName = function () {
        return "public_9_bg8";
    };
    AcFiveTigersReportView.prototype.initView = function () {
        this.addTouchTap(this.touchTap, this, null);
        this.viewBg.touchEnabled = true;
        var lookBg = BaseBitmap.create("fivetigers_reportbg-" + this.param.data.code);
        lookBg.setPosition(GameConfig.stageWidth / 2 - lookBg.width / 2, GameConfig.stageHeigth / 2 - lookBg.height / 2);
        this.addChild(lookBg);
        //名字
        var nameTf = ComponentManager.getTextField(LanguageManager.getlocal("acFiveTigersReportView-" + this.param.data.code), TextFieldConst.FONTSIZE_TITLE_SMALL);
        nameTf.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        nameTf.setPosition(lookBg.width / 2 - nameTf.width / 2, lookBg.y + 163);
        this.addChild(nameTf);
        var descTf = ComponentManager.getTextField(LanguageManager.getlocal("acFiveTigersReportDesc-" + this.param.data.code), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        //descTf.textColor = TextFieldConst.COLOR_BROWN_NEW;
        descTf.lineSpacing = 10;
        descTf.width = lookBg.width - 80;
        descTf.setPosition(lookBg.width / 2 - descTf.width / 2, lookBg.y + 210);
        this.addChild(descTf);
    };
    AcFiveTigersReportView.prototype.touchTap = function () {
        this.hide();
    };
    AcFiveTigersReportView.prototype.dispose = function () {
        // this._childId = null;
        _super.prototype.dispose.call(this);
    };
    return AcFiveTigersReportView;
}(BaseView));
__reflect(AcFiveTigersReportView.prototype, "AcFiveTigersReportView");
