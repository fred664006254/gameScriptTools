/**
  * 花魁活动--粉丝排行tab2
  * @author 张朝阳
  * date 2019/4/23
  * @class AcBeautyVoteFanRankPopupViewTab2
  */
class AcBeautyVoteFanRankPopupViewTab2 extends AcCommonViewTab {

	private _scrollList: ScrollList = null;

	private _rankMyTF: BaseTextField = null;

	private _rankMyName: BaseTextField = null;

	private _rankMyScore: BaseTextField = null;

	private _rankArr: any = null;

	private _myrankArr: any = null;
	public constructor() {
		super();
		egret.callLater(this.initView, this);
	}
	public initView() {

		let code = this.param.data.code;
		let aid = this.param.data.aid;

		let cfg = <Config.AcCfg.BeautyVoteCfg>Config.AcCfg.getCfgByActivityIdAndCode(aid, code);
		let vo = <AcBeautyVoteVo>Api.acVoApi.getActivityVoByAidAndCode(aid, code);

		let rankBg = BaseBitmap.create("acbeautyvoteview_fanrankbg");
		rankBg.width = 520;
		rankBg.height = 570;
		rankBg.setPosition(30, 55);
		this.addChild(rankBg);

		let rankTopBg = BaseBitmap.create("public_9_bg33");
		rankTopBg.width = rankBg.width;
		rankTopBg.height = 35;
		rankTopBg.setPosition(rankBg.x, rankBg.y);
		this.addChild(rankTopBg);
		// 排名 
		let rankTF = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteFanRankPopupViewTab1RankTitle-" + code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		rankTF.setPosition(rankTopBg.x + 60 - rankTF.width / 2, rankTopBg.y + rankTopBg.height / 2 - rankTF.height / 2);
		this.addChild(rankTF);

		let nameTF = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteFanRankPopupViewTab2NameTitle-" + code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		nameTF.setPosition(rankTopBg.x + 185 - nameTF.width / 2, rankTopBg.y + rankTopBg.height / 2 - nameTF.height / 2);
		this.addChild(nameTF);
		// 区服 
		let zidTF = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteFanRankPopupViewTab1ZidTitle-" + code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		zidTF.setPosition(rankTopBg.x + 333 - zidTF.width / 2, rankTF.y);
		this.addChild(zidTF);
		// 票数
		let scoreTF = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteFanRankPopupViewTab1ScoreTitle-" + code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		scoreTF.setPosition(rankTopBg.x + 455 - zidTF.width / 2, rankTF.y);
		this.addChild(scoreTF);

		//排行榜的ScrollList
		let rect = new egret.Rectangle(0, 0, rankBg.width, rankBg.height - rankTopBg.height - 10)
		this._scrollList = ComponentManager.getScrollList(AcBeautyVoteFanRankTab2ScrollItem, null, rect);
		this._scrollList.setPosition(rankTopBg.x, rankTopBg.y + rankTopBg.height);
		this.addChild(this._scrollList);
		// this._scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));

		// 底部的bg 
		let buttomBg = BaseBitmap.create("public_9_bg1");
		buttomBg.width = 520;
		buttomBg.height = 90;
		buttomBg.setPosition(rankBg.x, rankBg.y + rankBg.height + 5);
		this.addChild(buttomBg);


		this._rankMyName = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteViewTab4MyName-" + code, [Api.playerVoApi.getPlayerName()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._rankMyName.setPosition(buttomBg.x + 40, buttomBg.y + 20);
		this.addChild(this._rankMyName);

		// 我的排名
		this._rankMyTF = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteFanRankPopupViewTab1MyRankTitle-" + code, ["0"]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._rankMyTF.setPosition(this._rankMyName.x, buttomBg.y + buttomBg.height - this._rankMyTF.height - 20);
		this.addChild(this._rankMyTF);
		this._rankMyTF.setVisible(false);


		this._rankMyScore = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteFanRankPopupViewTab1MyScoreTitle-" + code, ["0"]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._rankMyScore.setPosition(buttomBg.x + 255, this._rankMyTF.y);
		this.addChild(this._rankMyScore);
		this._rankMyScore.setVisible(false);
		this.refreshWhenSwitchBack()
	}

	public refreshWhenSwitchBack() {
		let code = this.param.data.code;
		let aid = this.param.data.aid;
		let round = this.param.data.round;
		let voteId = this.param.data.voteId
		let cfg = <Config.AcCfg.BeautyVoteCfg>Config.AcCfg.getCfgByActivityIdAndCode(aid, code);
		let vo = <AcBeautyVoteVo>Api.acVoApi.getActivityVoByAidAndCode(aid, code);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_BEAUTYVOTE_GETRANK, this.rankHandler, this);

		this.request(NetRequestConst.REQUEST_BEAUTYVOTE_GETRANK, { activeId: vo.aidAndCode, round: round, voteId: voteId, roundrank: 1 });
	}

	private rankHandler(event: egret.Event) {
		if (event.data.ret) {
			this._myrankArr = event.data.data.data.roundrank.myrankArr
			this._rankArr = event.data.data.data.roundrank.rankArr;
			this.refreshView();
			App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_BEAUTYVOTE_GETRANK, this.rankHandler, this);

		}
	}

	private refreshView() {
		this._rankMyTF.setVisible(true);
		this._rankMyScore.setVisible(true);
		if (this._myrankArr.myrank) {
			this._rankMyTF.text = LanguageManager.getlocal("acBeautyVoteFanRankPopupViewTab1MyRankTitle-" + this.param.data.code, [String(this._myrankArr.myrank)]);
			this._rankMyScore.text = LanguageManager.getlocal("acBeautyVoteFanRankPopupViewTab1MyScoreTitle-" + this.param.data.code, [String(this._myrankArr.value)]);
		}
		else {
			this._rankMyTF.text = LanguageManager.getlocal("acBeautyVoteFanRankPopupViewTab1MyRankTitle-" + this.param.data.code, [LanguageManager.getlocal("acBeautyVoteViewTab4NoRank-" + this.param.data.code)]);
			this._rankMyScore.text = LanguageManager.getlocal("acBeautyVoteFanRankPopupViewTab1MyScoreTitle-" + this.param.data.code, ["0"]);
		}

		this._scrollList.refreshData(this._rankArr, { aid: this.param.data.aid, code: this.param.data.code });
	}

	public dispose() {
		this._scrollList = null;
		this._rankMyTF = null;
		this._rankMyName = null;
		this._rankMyScore = null;
		super.dispose();
	}

}