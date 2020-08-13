/**
 * @class AcAnswerRankRewardScrollItem
 */
class AcAnswerRankRewardScrollItem extends ScrollListItem {
	private _itemIndex: number;
	private _cfgData: any;
	private rewardContainer: BaseDisplayObjectContainer;
	public constructor() {
		super();
	}

	public initItem(index: number, data: any, itemParam?: any): void {

		this._cfgData = data;
		this._itemIndex = index;
		let rankInfo = itemParam.rankInfo;
		let config = <Config.AcCfg.AnswerCfg>itemParam.cfg;
		this.width = GameConfig.stageWidth - 30;

		let rank = data.rank;
		let view = this;
		let scroStartY = 8;

		let winBottomBg = BaseBitmap.create("rechargevie_db_01");
		winBottomBg.width = GameConfig.stageWidth - 30;
		winBottomBg.x = 6;
		this.addChild(winBottomBg);

		this.rewardContainer = new BaseDisplayObjectContainer();
		this.addChild(this.rewardContainer);
		this.rewardContainer.width = winBottomBg.width;

		let winbg: BaseBitmap = null;
		if (index == 0) {
			let titleBg = BaseBitmap.create("public_up3");
			titleBg.width = winBottomBg.width;
			titleBg.height = 160;
			titleBg.x = winBottomBg.x +  winBottomBg.width / 2 - titleBg.width / 2 ;
			titleBg.y = 12;
			this.rewardContainer.addChild(titleBg);

			winbg = BaseBitmap.create("accrossserverwipeboss_first");
			winbg.width = winBottomBg.width + 10;
			winbg.y = -6;
			winbg.x = winBottomBg.x +  winBottomBg.width / 2 - winbg.width / 2 ;
			this.rewardContainer.addChild(winbg);

			let firstData = rankInfo[0];

			if (firstData) {
				let playerContainer = new BaseDisplayObjectContainer;
				this.rewardContainer.addChild(playerContainer);

				let playerHead: BaseDisplayObjectContainer = Api.playerVoApi.getPlayerCircleHead(firstData.pic, config.titleId);
				playerContainer.addChild(playerHead);

				let playerName = ComponentManager.getTextField(firstData.name, 24, TextFieldConst.COLOR_BROWN);
				playerName.x = playerHead.x + playerHead.width + 50;
				playerName.y = playerHead.y + 25;
				playerContainer.addChild(playerName);

				let playerScore = ComponentManager.getTextField(LanguageManager.getlocal("acAnswerScore", [String(firstData.value)]), 24, TextFieldConst.COLOR_BROWN);
				playerScore.x = playerName.x;
				playerScore.y = playerName.y + playerName.height + 25;
				playerContainer.addChild(playerScore);

				let vipImg = BaseLoadBitmap.create("vip_icon_" + firstData.vip);
				vipImg.width = 65;
				vipImg.height = 27;
				vipImg.x = playerName.x + playerName.width + 10;
				vipImg.y = playerName.y + playerName.height / 2 - vipImg.height / 2;
				playerContainer.addChild(vipImg);
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, playerContainer, titleBg, [0, 20]);


			} else {
				let noData = ComponentManager.getTextField(LanguageManager.getlocal("acPunishNoData"), 30, TextFieldConst.COLOR_BROWN);
				noData.x = GameConfig.stageWidth / 2 - noData.width / 2;
				noData.y = winbg.y + 100;
				this.rewardContainer.addChild(noData);
			}



		} else {
			winBottomBg.height = 250;
			this.rewardContainer.height = winBottomBg.height;

			winbg = BaseBitmap.create("public_ts_bg01");
			winbg.width = 250;
			winbg.y = scroStartY + 13;
			winbg.x = GameConfig.stageWidth / 2 - winbg.width / 2;
			this.rewardContainer.addChild(winbg);

			let txt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_BROWN);
			if (rank[0] < rank[1]) {
				txt.text = txt.text = LanguageManager.getlocal("acRank_rank4", [String(rank[0]), String(rank[1])]);
			}
			else {
				txt.text = LanguageManager.getlocal("acRank_rank6", [rank[0].toString()]);
			}

			txt.x = GameConfig.stageWidth / 2 - txt.width / 2;
			txt.y = winbg.y + winbg.height / 2 - txt.height / 2;
			this.rewardContainer.addChild(txt);

		}

		let rewardList = GameData.formatRewardItem(data.getReward);
		// let rewardList = GameData.formatRewardItem("6_1004_6|6_1302_5|6_1301_5|6_1303_5|6_1004_6|6_1302_5");

		let finalY = 0;
		let startY = index == 0 ? 200 : 80;

		if (rewardList) {
			let temX = 0;
			let temScale = 1;
			for (let i = 0; i < rewardList.length; i++) {
				let icon = GameData.getItemIcon(rewardList[i], true, true);
				// icon.x = 110 + 7*(i + 1) + icon.width*temScale*i;
				var num = i % 5;
				icon.x = 17 + 10 * (num + 1) + icon.width * temScale * num;
				// icon.y = this.height/2 - icon.height/2;
				icon.y = (icon.height + 5) * (Math.floor((i) / 5)) + startY;
				if (rewardList.length <= 5) {
					icon.y = (icon.height + 5) * (Math.floor((i) / 5)) + startY + 10;
				}
				icon.scaleX = icon.scaleY = temScale;
				this.rewardContainer.addChild(icon);
				if (i == rewardList.length - 1) {
					finalY = icon.y + icon.height;
				}
			}
		}

		winBottomBg.height = finalY + 50;
		this.rewardContainer.height = winBottomBg.height;

	}



	public getSpaceY(): number {
		return 5;
	}

	public dispose(): void {

		// this._numTF = null;
		this._itemIndex = null;
		super.dispose();
	}
}