/**
  * 勤王除恶--贡献排行
  * @author 张朝阳
  * date 2019/4/17
  * @class AllianceWeekEndRankPopupView
  */
class AllianceWeekEndRankPopupView extends PopupView {

	private _scollList: ScrollList = null;

	private rankList: any = null;
	public constructor() {
		super();
	}

	public initView() {
		let data = this.param.data;

		let topStr = Object.keys(data.allianceWeekkill).length > 0 ? LanguageManager.getlocal("allianceWeekEndRankPopupViewToptip1", [String(data.allianceWeekkill[1]), LanguageManager.getlocal("allianceWeekEndViewNpcName" + data.allianceWeekkill[2])]) : LanguageManager.getlocal("allianceWeekEndRankPopupViewToptip2");
		let toptip = ComponentManager.getTextField(topStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
		toptip.setPosition(this.viewBg.x + this.viewBg.width / 2 - toptip.width / 2, 15)
		this.addChildToContainer(toptip);


		let rankBg = BaseBitmap.create("public_9_probiginnerbg")
		rankBg.width = 530;
		rankBg.height = 590;
		rankBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - rankBg.width / 2, toptip.y + toptip.height + 10);
		this.addChildToContainer(rankBg);

		let rankTopbg = BaseBitmap.create("public_9_bg37");
		rankTopbg.width = rankBg.width;
		rankTopbg.height = 40;
		rankTopbg.setPosition(rankBg.x, rankBg.y);
		this.addChildToContainer(rankTopbg);

		let rankTitle = ComponentManager.getTextField(LanguageManager.getlocal("allianceWeekEndRankPopupViewRankTitle"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		rankTitle.setPosition(rankTopbg.x + 70 - rankTitle.width / 2, rankTopbg.y + rankTopbg.height / 2 - rankTitle.height / 2);
		this.addChildToContainer(rankTitle);

		let nameTitle = ComponentManager.getTextField(LanguageManager.getlocal("allianceWeekEndRankPopupViewNameTitle"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		nameTitle.setPosition(rankTopbg.x + 225 - nameTitle.width / 2, rankTopbg.y + rankTopbg.height / 2 - nameTitle.height / 2);
		this.addChildToContainer(nameTitle);

		let contributionTitle = ComponentManager.getTextField(LanguageManager.getlocal("allianceWeekEndRankPopupViewContributionTitle"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		contributionTitle.setPosition(rankTopbg.x + 415 - contributionTitle.width / 2, rankTopbg.y + rankTopbg.height / 2 - contributionTitle.height / 2);
		this.addChildToContainer(contributionTitle);



		let rect = new egret.Rectangle(0, 0, 530, rankBg.height - rankTopbg.height - 10);
		this._scollList = ComponentManager.getScrollList(AllianceWeekEndRankScrollItem, data.allianceWeekRank, rect);
		this._scollList.setPosition(rankTopbg.x, rankTopbg.y + rankTopbg.height + 3);
		this.addChildToContainer(this._scollList);
		this._scollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));


		// 底部的bg 
		let buttomBg = BaseBitmap.create("public_9_probiginnerbg");
		buttomBg.width = 530;
		buttomBg.height = 112;
		buttomBg.setPosition(rankBg.x, rankBg.y + rankBg.height + 10);
		this.addChildToContainer(buttomBg);
		// 我的昵称 
		let niceName = Api.playerVoApi.getPlayerName();
		let rankNiceNameTF = ComponentManager.getTextField(LanguageManager.getlocal("allianceWeekEndRankPopupViewName", [Api.playerVoApi.getPlayerName()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		rankNiceNameTF.setPosition(buttomBg.x + 40, buttomBg.y + 20);
		this.addChildToContainer(rankNiceNameTF);

		let rank = data.myweekRank ? LanguageManager.getlocal("allianceWeekEndRankPopupViewRank", [String(data.myweekRank.rank)]) : LanguageManager.getlocal("allianceWeekEndRankPopupViewRank", [LanguageManager.getlocal("allianceWeekEndRankPopupViewUnRank")]);
		let rankTF = ComponentManager.getTextField(rank, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		rankTF.setPosition(buttomBg.x + buttomBg.width - 240, rankNiceNameTF.y);
		this.addChildToContainer(rankTF);

		// // 我的排名 rankorder2
		let damage = data.myweekRank ? LanguageManager.getlocal("allianceWeekEndRankPopupViewDamage", [String(data.myweekRank.damage)]) : LanguageManager.getlocal("allianceWeekEndRankPopupViewDamage", ["0"]);
		let damageTF = ComponentManager.getTextField(damage, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		damageTF.setPosition(rankNiceNameTF.x, buttomBg.y + buttomBg.height - damageTF.height - 20);
		this.addChildToContainer(damageTF);

		// // 转的次数
		let score = data.myweekRank ? LanguageManager.getlocal("allianceWeekEndRankPopupViewScore", [String(data.myweekRank.score)]) : LanguageManager.getlocal("allianceWeekEndRankPopupViewScore", ["0"]);
		let scoreTF = ComponentManager.getTextField(score, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		scoreTF.setPosition(rankTF.x, damageTF.y);
		this.addChildToContainer(scoreTF);

	}
	public dispose() {
		this._scollList = null;
		this.rankList = null;
		super.dispose();
	}

}