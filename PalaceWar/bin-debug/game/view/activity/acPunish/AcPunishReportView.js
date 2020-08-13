/**
 * 官报
 * author dukunayng
 * date 2017/11/20
 * @class AcPunishReportView
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
var AcPunishReportView = (function (_super) {
    __extends(AcPunishReportView, _super);
    function AcPunishReportView() {
        return _super.call(this) || this;
    }
    AcPunishReportView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["adult_updtitle",
        ]);
    };
    AcPunishReportView.prototype.getTitleBgName = function () {
        return null;
    };
    AcPunishReportView.prototype.getTitleStr = function () {
        return null;
    };
    AcPunishReportView.prototype.getBgName = function () {
        return "public_9_bg8";
    };
    AcPunishReportView.prototype.initView = function () {
        this.addTouchTap(this.touchTap, this, null);
        this.viewBg.touchEnabled = true;
        var lookBg = BaseBitmap.create("public_9_wordbg");
        // lookBg.scaleX = 2;
        lookBg.height = 300;
        lookBg.setPosition(GameConfig.stageWidth / 2 - lookBg.width / 2, GameConfig.stageHeigth / 2 - lookBg.height / 2);
        this.addChild(lookBg);
        //名字
        var nameTf = ComponentManager.getTextField(LanguageManager.getlocal("acPunishReportView-" + this.param.data.code), TextFieldConst.FONTSIZE_TITLE_SMALL);
        nameTf.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        nameTf.setPosition(lookBg.width / 2 - nameTf.width / 2, lookBg.y + 40);
        this.addChild(nameTf);
        var descTf = ComponentManager.getTextField(LanguageManager.getlocal("acPunishReportDesc-" + this.param.data.code), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        descTf.textColor = TextFieldConst.COLOR_WHITE;
        descTf.lineSpacing = 20;
        descTf.width = lookBg.width - 60;
        descTf.setPosition(lookBg.width / 2 - descTf.width / 2, lookBg.y + 80);
        this.addChild(descTf);
        var nextTf = ComponentManager.getTextField(LanguageManager.getlocal("clickContinue"), TextFieldConst.FONTSIZE_TITLE_SMALL);
        nextTf.textColor = TextFieldConst.COLOR_WARN_GREEN;
        nextTf.width = lookBg.width - 60;
        nextTf.setPosition(470, lookBg.y + 260);
        this.addChild(nextTf);
    };
    AcPunishReportView.prototype.touchTap = function () {
        this.hide();
    };
    AcPunishReportView.prototype.dispose = function () {
        // this._childId = null;
        _super.prototype.dispose.call(this);
    };
    return AcPunishReportView;
}(BaseView));
__reflect(AcPunishReportView.prototype, "AcPunishReportView");
//# sourceMappingURL=AcPunishReportView.js.map