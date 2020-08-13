/**
  * 中秋活动奖励查看的弹板
  * @author 张朝阳
  * date 2019/3/13
  * @class AcWealthCarpRankPopupView
  */
class AcWealthCarpRankPopupView extends PopupView {

	private _scollList: ScrollList = null;

	private aid: string = null;

	private code: string = null;

	private rankList: any = null;
	public constructor() {
		super();
	}

	public initView() {
		let rewards = this.param.data.rewards;
		this.aid = this.param.data.aid;
		this.code = this.param.data.code;
		this.rankList = this.param.data.luckyinfo;

		if (Number(this.code) >= 5) {

			let rankBg = BaseBitmap.create("public_9_probiginnerbg")
			rankBg.width = 530;
			rankBg.height = 420 + 205 + 25;
			rankBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - rankBg.width / 2, 15);
			this.addChildToContainer(rankBg);

			let rankTopbg = BaseBitmap.create("public_9_bg37");
			rankTopbg.width = rankBg.width;
			rankTopbg.height = 40;
			rankTopbg.setPosition(rankBg.x, rankBg.y);
			this.addChildToContainer(rankTopbg);

			let rankTitle = ComponentManager.getTextField(LanguageManager.getlocal("acWealthCarpViewRankPopupViewRankTitle-" + this.code), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
			rankTitle.setPosition(rankTopbg.x + rankTopbg.width / 2 - rankTitle.width / 2, rankTopbg.y + rankTopbg.height / 2 - rankTitle.height / 2);
			this.addChildToContainer(rankTitle);

			let rect = new egret.Rectangle(0, 0, 530, rankBg.height - rankTopbg.height - 10 - 25);
			if (this.rankList && Object.keys(this.rankList).length > 1) {
				this.rankList.sort((a, b) => {
					return a.ts - b.ts;
				});
			}

			this._scollList = ComponentManager.getScrollList(AcWealthCarpRankScrollItem, this.rankList, rect);
			this._scollList.setPosition(rankTopbg.x, rankTopbg.y + rankTopbg.height + 3);
			this.addChildToContainer(this._scollList);
			this._scollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));

			let index: number = 0;
			let info: any = null;
			for (let i = 0; i < this.rankList.length; i++) {
				let item = this.rankList[i];
				if (Api.playerVoApi.getPlayerID() == item.uid) {
					index = i + 1;
					info = item;
					break;
				}
			}
			if (info) {
				let rankTF = ComponentManager.getTextField(String(index), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
				rankTF.setPosition(this._scollList.x + 40 - rankTF.width / 2, this._scollList.y + this._scollList.height + 8);
				this.addChildToContainer(rankTF);
				//名字
				let nameTxt = ComponentManager.getTextField(Api.playerVoApi.getPlayerName(), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
				nameTxt.setPosition(this._scollList.x + 160 - nameTxt.width / 2, rankTF.y);
				this.addChildToContainer(nameTxt);

				//时间
				let timeStr = App.DateUtil.getFormatBySecond(info.ts, 2);
				let timeTxt = ComponentManager.getTextField(timeStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
				timeTxt.setPosition(this._scollList.x + 410 - timeTxt.width / 2, nameTxt.y + nameTxt.height / 2 - timeTxt.height / 2);
				this.addChildToContainer(timeTxt);
			}
			else {
				let noQualificationTF = ComponentManager.getTextField(LanguageManager.getlocal("acWealthCarpRankPopupViewUnQualification-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
				noQualificationTF.setPosition(rankBg.x + rankBg.width / 2 - noQualificationTF.width / 2, this._scollList.y + this._scollList.height + 8);
				this.addChildToContainer(noQualificationTF);
			}

			return;

		}

		let toptip = ComponentManager.getTextField(LanguageManager.getlocal("acWealthCarpViewRankPopupViewTopTip-" + this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
		toptip.setPosition(this.viewBg.x + this.viewBg.width / 2 - toptip.width / 2, 15)
		this.addChildToContainer(toptip);

		let rewardbg = BaseBitmap.create("public_9_bg4");
		rewardbg.width = 530;
		rewardbg.height = 205;
		rewardbg.setPosition(this.viewBg.x + this.viewBg.width / 2 - rewardbg.width / 2, toptip.y + toptip.height + 5);
		this.addChildToContainer(rewardbg);

		let emptybg = BaseLoadBitmap.create("acwealthcarpview_10emptybg");
		emptybg.width = 503;
		emptybg.height = 186;
		emptybg.setPosition(rewardbg.x + rewardbg.width / 2 - emptybg.width / 2, rewardbg.y + rewardbg.height / 2 - emptybg.height / 2);
		this.addChildToContainer(emptybg);

		let rewardVoList: RewardItemVo[] = GameData.formatRewardItem(rewards);
		let rewardScale = 0.85;
		for (let i = 0; i < rewardVoList.length; i++) {
			let rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
			rewardDB.setScale(rewardScale);
			rewardDB.setPosition(emptybg.x + (i % 5) * (rewardDB.width * rewardScale + 10) + 3, emptybg.y + Math.floor(i / 5) * (rewardDB.height * rewardScale + 4));
			this.addChildToContainer(rewardDB);
		}

		let rankBg = BaseBitmap.create("public_9_probiginnerbg")
		rankBg.width = 530;
		rankBg.height = 420;
		rankBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - rankBg.width / 2, rewardbg.y + rewardbg.height + 10);
		this.addChildToContainer(rankBg);

		let rankTopbg = BaseBitmap.create("public_9_bg37");
		rankTopbg.width = rankBg.width;
		rankTopbg.height = 40;
		rankTopbg.setPosition(rankBg.x, rankBg.y);
		this.addChildToContainer(rankTopbg);

		// let numberTitle = ComponentManager.getTextField(LanguageManager.getlocal("acWealthCarpViewRankPopupViewNumberTitle-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		// numberTitle.setPosition(rankBg.x + 40 - numberTitle.width / 2, rankTopbg.y + rankTopbg.height / 2 - numberTitle.height / 2);
		// this.addChildToContainer(numberTitle);

		// let nameTitle = ComponentManager.getTextField(LanguageManager.getlocal("acWealthCarpViewRankPopupViewNameTitle-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		// nameTitle.setPosition(rankBg.x + 160 - nameTitle.width / 2, rankTopbg.y + rankTopbg.height / 2 - nameTitle.height / 2);
		// this.addChildToContainer(nameTitle);

		// let timeTitle = ComponentManager.getTextField(LanguageManager.getlocal("acWealthCarpViewRankPopupViewTimeTitle-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		// timeTitle.setPosition(rankBg.x + 410 - timeTitle.width / 2, rankTopbg.y + rankTopbg.height / 2 - timeTitle.height / 2);
		// this.addChildToContainer(timeTitle);

		let rankTitle = ComponentManager.getTextField(LanguageManager.getlocal("acWealthCarpViewRankPopupViewRankTitle-" + this.code), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		rankTitle.setPosition(rankTopbg.x + rankTopbg.width / 2 - rankTitle.width / 2, rankTopbg.y + rankTopbg.height / 2 - rankTitle.height / 2+4);
		this.addChildToContainer(rankTitle);

		let rect = new egret.Rectangle(0, 0, 530, rankBg.height - rankTopbg.height - 10);
		if (this.rankList && Object.keys(this.rankList).length > 1) {
			this.rankList.sort((a, b) => {
				return a.ts - b.ts;
			});
		}

		this._scollList = ComponentManager.getScrollList(AcWealthCarpRankScrollItem, this.rankList, rect);
		this._scollList.setPosition(rankTopbg.x, rankTopbg.y + rankTopbg.height + 3);
		this.addChildToContainer(this._scollList);
		this._scollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));

	}


	protected getTitleStr(): string {
		return "AcWealthCarpRankPopupViewTitle-" + this.param.data.code;
	}
	public dispose() {
		this._scollList = null;
		this.aid = null;
		this.code = null;
		this.rankList = null;
		super.dispose();
	}

}