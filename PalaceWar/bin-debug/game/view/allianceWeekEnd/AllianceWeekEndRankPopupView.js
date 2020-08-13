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
/**
  * 勤王除恶--贡献排行
  * @author 张朝阳
  * date 2019/4/17
  * @class AllianceWeekEndRankPopupView
  */
var AllianceWeekEndRankPopupView = (function (_super) {
    __extends(AllianceWeekEndRankPopupView, _super);
    function AllianceWeekEndRankPopupView() {
        var _this = _super.call(this) || this;
        _this._scollList = null;
        _this.rankList = null;
        return _this;
    }
    AllianceWeekEndRankPopupView.prototype.initView = function () {
        var data = this.param.data;
        var topStr = Object.keys(data.allianceWeekkill).length > 0 ? LanguageManager.getlocal("allianceWeekEndRankPopupViewToptip1", [String(data.allianceWeekkill[1]), LanguageManager.getlocal("allianceWeekEndViewNpcName" + data.allianceWeekkill[2])]) : LanguageManager.getlocal("allianceWeekEndRankPopupViewToptip2");
        var toptip = ComponentManager.getTextField(topStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        toptip.setPosition(this.viewBg.x + this.viewBg.width / 2 - toptip.width / 2, 15);
        this.addChildToContainer(toptip);
        var rankBg = BaseBitmap.create("public_9_probiginnerbg");
        rankBg.width = 530;
        rankBg.height = 590;
        rankBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - rankBg.width / 2, toptip.y + toptip.height + 10);
        this.addChildToContainer(rankBg);
        var rankTopbg = BaseBitmap.create("public_9_bg37");
        rankTopbg.width = rankBg.width;
        rankTopbg.height = 40;
        rankTopbg.setPosition(rankBg.x, rankBg.y);
        this.addChildToContainer(rankTopbg);
        var rankTitle = ComponentManager.getTextField(LanguageManager.getlocal("allianceWeekEndRankPopupViewRankTitle"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankTitle.setPosition(rankTopbg.x + 70 - rankTitle.width / 2, rankTopbg.y + rankTopbg.height / 2 - rankTitle.height / 2);
        this.addChildToContainer(rankTitle);
        var nameTitle = ComponentManager.getTextField(LanguageManager.getlocal("allianceWeekEndRankPopupViewNameTitle"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        nameTitle.setPosition(rankTopbg.x + 225 - nameTitle.width / 2, rankTopbg.y + rankTopbg.height / 2 - nameTitle.height / 2);
        this.addChildToContainer(nameTitle);
        var contributionTitle = ComponentManager.getTextField(LanguageManager.getlocal("allianceWeekEndRankPopupViewContributionTitle"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        contributionTitle.setPosition(rankTopbg.x + 415 - contributionTitle.width / 2, rankTopbg.y + rankTopbg.height / 2 - contributionTitle.height / 2);
        this.addChildToContainer(contributionTitle);
        var rect = new egret.Rectangle(0, 0, 530, rankBg.height - rankTopbg.height - 10);
        this._scollList = ComponentManager.getScrollList(AllianceWeekEndRankScrollItem, data.allianceWeekRank, rect);
        this._scollList.setPosition(rankTopbg.x, rankTopbg.y + rankTopbg.height + 3);
        this.addChildToContainer(this._scollList);
        this._scollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        // 底部的bg 
        var buttomBg = BaseBitmap.create("public_9_probiginnerbg");
        buttomBg.width = 530;
        buttomBg.height = 112;
        buttomBg.setPosition(rankBg.x, rankBg.y + rankBg.height + 10);
        this.addChildToContainer(buttomBg);
        // 我的昵称 
        var niceName = Api.playerVoApi.getPlayerName();
        var rankNiceNameTF = ComponentManager.getTextField(LanguageManager.getlocal("allianceWeekEndRankPopupViewName", [Api.playerVoApi.getPlayerName()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankNiceNameTF.setPosition(buttomBg.x + 40, buttomBg.y + 20);
        this.addChildToContainer(rankNiceNameTF);
        var rank = data.myweekRank ? LanguageManager.getlocal("allianceWeekEndRankPopupViewRank", [String(data.myweekRank.rank)]) : LanguageManager.getlocal("allianceWeekEndRankPopupViewRank", [LanguageManager.getlocal("allianceWeekEndRankPopupViewUnRank")]);
        var rankTF = ComponentManager.getTextField(rank, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankTF.setPosition(buttomBg.x + buttomBg.width - 240, rankNiceNameTF.y);
        this.addChildToContainer(rankTF);
        // // 我的排名 rankorder2
        var damage = data.myweekRank ? LanguageManager.getlocal("allianceWeekEndRankPopupViewDamage", [String(data.myweekRank.damage)]) : LanguageManager.getlocal("allianceWeekEndRankPopupViewDamage", ["0"]);
        var damageTF = ComponentManager.getTextField(damage, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        damageTF.setPosition(rankNiceNameTF.x, buttomBg.y + buttomBg.height - damageTF.height - 20);
        this.addChildToContainer(damageTF);
        // // 转的次数
        var score = data.myweekRank ? LanguageManager.getlocal("allianceWeekEndRankPopupViewScore", [String(data.myweekRank.score)]) : LanguageManager.getlocal("allianceWeekEndRankPopupViewScore", ["0"]);
        var scoreTF = ComponentManager.getTextField(score, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        scoreTF.setPosition(rankTF.x, damageTF.y);
        this.addChildToContainer(scoreTF);
    };
    AllianceWeekEndRankPopupView.prototype.dispose = function () {
        this._scollList = null;
        this.rankList = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceWeekEndRankPopupView;
}(PopupView));
__reflect(AllianceWeekEndRankPopupView.prototype, "AllianceWeekEndRankPopupView");
//# sourceMappingURL=AllianceWeekEndRankPopupView.js.map