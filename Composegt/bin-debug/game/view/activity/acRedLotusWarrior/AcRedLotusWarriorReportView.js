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
var AcRedLotusWarriorReportView = (function (_super) {
    __extends(AcRedLotusWarriorReportView, _super);
    function AcRedLotusWarriorReportView() {
        return _super.call(this) || this;
    }
    AcRedLotusWarriorReportView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AcRedLotusWarriorReportView.prototype.getTitleBgName = function () {
        return null;
    };
    AcRedLotusWarriorReportView.prototype.getTitleStr = function () {
        return null;
    };
    AcRedLotusWarriorReportView.prototype.getBgName = function () {
        return "public_9_bg8";
    };
    AcRedLotusWarriorReportView.prototype.initView = function () {
        this.addTouchTap(this.touchTap, this, null);
        this.viewBg.touchEnabled = true;
        var lookBg = BaseBitmap.create("public_9_wordbg");
        // lookBg.scaleX = 2;
        lookBg.height = 300;
        lookBg.setPosition(GameConfig.stageWidth / 2 - lookBg.width / 2, GameConfig.stageHeigth / 2 - lookBg.height / 2);
        this.addChild(lookBg);
        //名字
        var nameTf = ComponentManager.getTextField(LanguageManager.getlocal("acRedLotusWarriorReportView-" + this.param.data.code), TextFieldConst.FONTSIZE_TITLE_SMALL);
        nameTf.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        nameTf.setPosition(lookBg.width / 2 - nameTf.width / 2, lookBg.y + 40);
        this.addChild(nameTf);
        var descTf = ComponentManager.getTextField(LanguageManager.getlocal("acRedLotusWarriorReportDesc-" + this.param.data.code), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        descTf.textColor = TextFieldConst.COLOR_WHITE;
        descTf.lineSpacing = 10;
        descTf.width = lookBg.width - 60;
        descTf.setPosition(lookBg.width / 2 - descTf.width / 2, lookBg.y + 80);
        this.addChild(descTf);
        var nextTf = ComponentManager.getTextField(LanguageManager.getlocal("clickContinue"), TextFieldConst.FONTSIZE_TITLE_SMALL);
        nextTf.textColor = TextFieldConst.COLOR_WARN_YELLOW2;
        // nextTf.width = lookBg.width - 70
        nextTf.setPosition(470, lookBg.y + 255);
        this.addChild(nextTf);
    };
    AcRedLotusWarriorReportView.prototype.touchTap = function () {
        this.hide();
    };
    AcRedLotusWarriorReportView.prototype.dispose = function () {
        // this._childId = null;
        _super.prototype.dispose.call(this);
    };
    return AcRedLotusWarriorReportView;
}(BaseView));
__reflect(AcRedLotusWarriorReportView.prototype, "AcRedLotusWarriorReportView");
