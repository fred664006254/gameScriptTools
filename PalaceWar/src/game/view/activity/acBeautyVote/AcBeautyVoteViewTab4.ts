/**
  * 花魁活动view--贡献排行
  * @author 张朝阳
  * date 2019/4/23
  * @class AcBeautyVoteViewTab4
  */
class AcBeautyVoteViewTab4 extends AcCommonViewTab {

	private _scrollList: ScrollList = null;
	private _scoreTF: BaseTextField = null;

	private _myName: BaseTextField = null;

	private _myRank: BaseTextField = null;

	private _myScore: BaseTextField = null;

	private _rankArr: any = null;

	private _myrankArr: any = null;

	private _totalIdx: number = 0;

	public constructor() {
		super();
		egret.callLater(this.initView, this);
	}
	public initView() {
		// App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY, this.refreshView, this);


		let cfg = <Config.AcCfg.BeautyVoteCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let vo = <AcBeautyVoteVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);

		let titleBg = BaseBitmap.create("public_9_bg33");
		titleBg.width = 610;
		titleBg.height = 35;
		titleBg.setPosition(GameConfig.stageWidth / 2 - titleBg.width / 2, -213 + 15);
		this.addChild(titleBg);

		let rankTitle = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteViewTab4RankTile-" + this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		rankTitle.setPosition(titleBg.x + 58 - rankTitle.width / 2, titleBg.y + titleBg.height / 2 - rankTitle.height / 2);
		this.addChild(rankTitle);

		let nameTitle = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteViewTab4NameTitle-" + this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		nameTitle.setPosition(titleBg.x + 186 - nameTitle.width / 2, titleBg.y + titleBg.height / 2 - nameTitle.height / 2);
		this.addChild(nameTitle);

		let zidTitle = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteViewTab4ZidTile-" + this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		zidTitle.setPosition(titleBg.x + 368 - zidTitle.width / 2, titleBg.y + titleBg.height / 2 - zidTitle.height / 2);
		this.addChild(zidTitle);

		let scoreTitle = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteViewTab4ScoreTile-" + this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		scoreTitle.setPosition(titleBg.x + 525 - scoreTitle.width / 2, titleBg.y + titleBg.height / 2 - scoreTitle.height / 2);
		this.addChild(scoreTitle);

		let rect = new egret.Rectangle(0, 0, 610, GameConfig.stageHeigth - this.getViewTitleButtomY() - 34 - titleBg.height - 74);
		this._scrollList = ComponentManager.getScrollList(AcBeautyVoteViewTab4ScrollItem, null, rect, { aid: this.aid, code: this.code, idx: this._totalIdx });
		this._scrollList.setPosition(titleBg.x, titleBg.y + titleBg.height);
		// this._scrollList.bounces = false;
		this.addChild(this._scrollList);
		this._scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));

		this._scrollList.bindMoveCompleteCallback(() => {

			let index = this._totalIdx;
			if (!this._scrollList.checkShowArrow()) {
				index += 100;
			}
			else if (this._scrollList.scrollTop == 0) {
				index = Math.max(0, index - 100)
			}
			if (this._totalIdx != index) {
				this._totalIdx = index;
				if (this._totalIdx >= 1000) {
					this._totalIdx = 1000;
					App.CommonUtil.showTip(LanguageManager.getlocal("acBeautyVoteViewTab4RankLimitTip-" + this.code));
					return;
				}
				App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_BEAUTYVOTE_GETRANK, this.rankHandle, this);
				this.request(NetRequestConst.REQUEST_BEAUTYVOTE_GETRANK, { activeId: vo.aidAndCode, totalrank: 1, totalIdx: this._totalIdx });
			}

		}, this);

		let bottomBg = BaseBitmap.create("public_9_bg34");
		bottomBg.width = 603;
		bottomBg.height = 74;
		bottomBg.setPosition(this._scrollList.x + this._scrollList.width / 2 - bottomBg.width / 2, this._scrollList.y + this._scrollList.height);
		this.addChild(bottomBg);

		this._myName = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteViewTab4MyName-" + this.code, [Api.playerVoApi.getPlayerName()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._myName.setPosition(bottomBg.x + 25, bottomBg.y + 13);
		this.addChild(this._myName);

		this._myRank = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteViewTab4MyRank-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._myRank.setPosition(this._myName.x, this._myName.y + this._myName.height + 8);
		this.addChild(this._myRank);
		this._myRank.setVisible(false);

		this._myScore = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteViewTab4MyScore-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._myScore.setPosition(GameConfig.stageWidth - this._myScore.width - 50, this._myRank.y);
		this.addChild(this._myScore);
		this._myScore.setVisible(false);
		// let scoreDesc = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteViewTab3TipDesc-" + this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		// scoreDesc.setPosition(this._scrollList.x + 30, this._scrollList.y + this._scrollList.height + 7);
		// this.addChild(scoreDesc)
		this.refreshWhenSwitchBack();
	}

	public refreshWhenSwitchBack() {
		// super.refreshWhenSwitchBack();
		this._totalIdx = 0;
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_BEAUTYVOTE_GETRANK, this.rankHandle, this);
		let vo = <AcBeautyVoteVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		this.request(NetRequestConst.REQUEST_BEAUTYVOTE_GETRANK, { activeId: vo.aidAndCode, totalrank: 1, totalIdx: this._totalIdx });
	}



	private rankHandle(event: egret.Event) {
		// 		myrank: 1
		// title: ""
		// uid: 9000216
		// value: "83"

		// name: "马玉成"
		// title: ""
		// uid: 9000216
		// value: 83
		// zid: 9
		if (event.data.ret) {
			this._myrankArr = event.data.data.data.totalrank.myrankArr
			this._rankArr = event.data.data.data.totalrank.rankArr;
			App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_BEAUTYVOTE_GETRANK, this.rankHandle, this);
			this.refreshView();
		}
	}
	private refreshView() {
		this._myRank.setVisible(true);
		this._myScore.setVisible(true);
		if (this._myrankArr.myrank) {
			this._myRank.text = LanguageManager.getlocal("acBeautyVoteViewTab4MyRank-" + this.code, [String(this._myrankArr.myrank)]);
			this._myScore.text = LanguageManager.getlocal("acBeautyVoteViewTab4MyScore-" + this.code, [String(this._myrankArr.value)]);
		}
		else {
			this._myRank.text = LanguageManager.getlocal("acBeautyVoteViewTab4MyRank-" + this.code, [LanguageManager.getlocal("acBeautyVoteViewTab4NoRank-" + this.code)]);
			this._myScore.text = LanguageManager.getlocal("acBeautyVoteViewTab4MyScore-" + this.code, ["0"]);
		}
		this._myScore.setPosition(GameConfig.stageWidth - this._myScore.width - 50, this._myRank.y);
		this._scrollList.scrollTop = 0;
		this._scrollList.refreshData(this._rankArr, { aid: this.aid, code: this.code, idx: this._totalIdx });

	}



	public dispose() {
		// App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY, this.refreshView, this);

		this._scrollList = null;
		this._scoreTF = null;
		this._myName = null;
		this._myRank = null;
		this._myScore = null;
		this._rankArr = null;
		this._myrankArr = null;
		this._totalIdx = 0;
		super.dispose();
	}

}