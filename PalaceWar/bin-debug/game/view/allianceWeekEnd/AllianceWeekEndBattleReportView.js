/**
  * 勤王除恶战斗结果战报
  * @author 张朝阳
  * date 2019/4/17
  * @class AllianceWeekEndBattleReportView
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
var AllianceWeekEndBattleReportView = (function (_super) {
    __extends(AllianceWeekEndBattleReportView, _super);
    function AllianceWeekEndBattleReportView() {
        return _super.call(this) || this;
    }
    AllianceWeekEndBattleReportView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "allianceweekendview_result",
        ]);
    };
    AllianceWeekEndBattleReportView.prototype.getTitleBgName = function () {
        return null;
    };
    AllianceWeekEndBattleReportView.prototype.getTitleStr = function () {
        return null;
    };
    AllianceWeekEndBattleReportView.prototype.getBgName = function () {
        return "public_9_bg8";
    };
    AllianceWeekEndBattleReportView.prototype.initView = function () {
        this.addTouchTap(this.touchTap, this, null);
        this.viewBg.touchEnabled = true;
        var param = this.param.data;
        var damage = this.param.data.damage;
        var score = this.param.data.score;
        var isAuto = this.param.data.isAuto;
        var lookBg = BaseBitmap.create("public_9_wordbg");
        this.addChild(lookBg);
        var titlebg = BaseBitmap.create("allianceweekendview_result");
        this.addChild(titlebg);
        //名字
        var damageTF = ComponentManager.getTextField(damage, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        damageTF.lineSpacing = 18;
        damageTF.textAlign = egret.HorizontalAlign.CENTER;
        damageTF.width = 500;
        this.addChild(damageTF);
        var scoreTF = ComponentManager.getTextField(score, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        scoreTF.lineSpacing = 18;
        scoreTF.textAlign = egret.HorizontalAlign.CENTER;
        scoreTF.width = 500;
        this.addChild(scoreTF);
        lookBg.height = damageTF.height + scoreTF.height + 120;
        lookBg.setPosition(GameConfig.stageWidth / 2 - lookBg.width / 2, GameConfig.stageHeigth / 2 - lookBg.height / 2);
        titlebg.setPosition(lookBg.x + lookBg.width / 2 - titlebg.width / 2, lookBg.y - titlebg.height / 2);
        damageTF.setPosition(lookBg.width / 2 - damageTF.width / 2, lookBg.y + 60);
        scoreTF.setPosition(lookBg.width / 2 - scoreTF.width / 2, damageTF.y + damageTF.textHeight + 20);
        if (isAuto) {
            egret.Tween.get(this).wait(1000).call(this.touchTap, this);
        }
    };
    AllianceWeekEndBattleReportView.prototype.touchTap = function () {
        this.hide();
    };
    AllianceWeekEndBattleReportView.prototype.dispose = function () {
        egret.Tween.removeTweens(this);
        _super.prototype.dispose.call(this);
    };
    return AllianceWeekEndBattleReportView;
}(BaseView));
__reflect(AllianceWeekEndBattleReportView.prototype, "AllianceWeekEndBattleReportView");
//# sourceMappingURL=AllianceWeekEndBattleReportView.js.map