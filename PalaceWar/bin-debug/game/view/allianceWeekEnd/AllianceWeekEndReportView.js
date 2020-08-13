/**
  * 勤王除恶官报
  * @author 张朝阳
  * date 2019/4/15
  * @class AllianceWeekEndReportView
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
var AllianceWeekEndReportView = (function (_super) {
    __extends(AllianceWeekEndReportView, _super);
    function AllianceWeekEndReportView() {
        return _super.call(this) || this;
    }
    AllianceWeekEndReportView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "alliancepurpose",
        ]);
    };
    AllianceWeekEndReportView.prototype.getTitleBgName = function () {
        return null;
    };
    AllianceWeekEndReportView.prototype.getTitleStr = function () {
        return null;
    };
    AllianceWeekEndReportView.prototype.getBgName = function () {
        return "public_9_bg8";
    };
    AllianceWeekEndReportView.prototype.initView = function () {
        this.addTouchTap(this.touchTap, this, null);
        this.viewBg.touchEnabled = true;
        var lookBg = BaseBitmap.create("public_9_wordbg");
        // lookBg.scaleX = 2;
        // lookBg.height = 300;
        this.addChild(lookBg);
        var titlebg = BaseBitmap.create("alliancepurpose");
        this.addChild(titlebg);
        var param = this.param.data;
        //名字
        var nameTf = ComponentManager.getTextField("" + param.title, TextFieldConst.FONTSIZE_TITLE_SMALL);
        nameTf.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        this.addChild(nameTf);
        var nameLine = BaseBitmap.create("public_line3");
        this.addChild(nameLine);
        var descTf = ComponentManager.getTextField("" + param.msg, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        descTf.textColor = TextFieldConst.COLOR_WHITE;
        descTf.lineSpacing = 18;
        descTf.width = lookBg.width - 60;
        this.addChild(descTf);
        var nextTf = ComponentManager.getTextField(LanguageManager.getlocal("clickContinue"), TextFieldConst.FONTSIZE_TITLE_SMALL);
        nextTf.textColor = TextFieldConst.COLOR_WARN_GREEN;
        nextTf.width = lookBg.width - 60;
        this.addChild(nextTf);
        lookBg.height = nameTf.textHeight + descTf.textHeight + 140;
        lookBg.setPosition(GameConfig.stageWidth / 2 - lookBg.width / 2, GameConfig.stageHeigth / 2 - lookBg.height / 2);
        titlebg.setPosition(lookBg.x + lookBg.width / 2 - titlebg.width / 2, lookBg.y - titlebg.height / 2);
        nameTf.setPosition(lookBg.width / 2 - nameTf.width / 2, lookBg.y + 50);
        nameLine.width += nameTf.width + 40;
        nameLine.setPosition(nameTf.x + nameTf.width / 2 - nameLine.width / 2, nameTf.y + nameTf.height / 2 - nameLine.height / 2);
        descTf.setPosition(lookBg.width / 2 - descTf.width / 2, nameTf.y + nameTf.textHeight + 30);
        nextTf.setPosition(470, lookBg.y + lookBg.height - nextTf.textHeight - 10);
    };
    AllianceWeekEndReportView.prototype.touchTap = function () {
        this.hide();
    };
    AllianceWeekEndReportView.prototype.dispose = function () {
        // this._childId = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceWeekEndReportView;
}(BaseView));
__reflect(AllianceWeekEndReportView.prototype, "AllianceWeekEndReportView");
//# sourceMappingURL=AllianceWeekEndReportView.js.map