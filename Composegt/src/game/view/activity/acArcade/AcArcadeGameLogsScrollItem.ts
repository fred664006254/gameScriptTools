/**
  * 拉霸机奖池item
  * author 张朝阳
  * date 2019/6/12
  * @class AcArcadeGameLogsScrollItem
  */
class AcArcadeGameLogsScrollItem extends ScrollListItem {
	private _itemData: Config.AcCfg.ArcadePoolItemCfg = null;
	private _aidAndCode: { "aid": string; "code": string } = null;
	public constructor() {
		super();
	}
	protected getCnCode(): string {
		let code = this._aidAndCode.code;
        if (code == "2" || code == "3") {
            code = "1";
        }
        return code;
    }
	/**
	 * 初始化itemview
	 */
	public initItem(index: number, data: any, itemParam: any): void {

		this._itemData = data;
		this._aidAndCode = itemParam;
		let cfg = <Config.AcCfg.ArcadeCfg>Config.AcCfg.getCfgByActivityIdAndCode(this._aidAndCode.aid, this._aidAndCode.code);

		this.width = 520;
		this.height = 185;

		let lotteryTime = this._itemData[0];
		let rewards = GameData.formatRewardItem(this._itemData[1])[0];
		let lotteryRewards = this._itemData[2];
		let lotteryRewards1 = this._itemData[2][0];
		let lotteryRewards2 = this._itemData[2][1];
		let lotteryRewards3 = this._itemData[2][2];
		let score: number = 0;

		if (lotteryRewards1 == lotteryRewards2 && lotteryRewards1 == lotteryRewards3 && lotteryRewards2 == lotteryRewards3) {
			score = cfg.getScoreForType("0");
		}
		else if (lotteryRewards1 == lotteryRewards2 || lotteryRewards1 == lotteryRewards3 || lotteryRewards2 == lotteryRewards3) {
			score = cfg.getScoreForType("1");
		}
		else if (lotteryRewards1 != lotteryRewards2 && lotteryRewards1 != lotteryRewards3 && lotteryRewards2 != lotteryRewards3) {
			score = cfg.getScoreForType("2");
		}

		let time = App.DateUtil.getFormatBySecond(this._itemData[3], 2);

		let bg: BaseBitmap = BaseBitmap.create("activity_db_01");
		bg.width = this.width;
		bg.height = this.height;
		this.addChild(bg);

		let public_up3 = BaseBitmap.create("public_up3"); //arcadegame_topbg_2
		public_up3.width = 510;
		public_up3.height = 33;
		public_up3.setPosition(bg.x + bg.width / 2 - public_up3.width / 2, bg.y + 6);
		this.addChild(public_up3);

		let titleBg: BaseBitmap = BaseBitmap.create("activity_charge_red");
		titleBg.width = 384
        titleBg.y = public_up3.y-3;
        titleBg.x = bg.x;
		this.addChild(titleBg);

		// 0: 2
		// 1: "6_1021_1"
		// 2: Array(3)
		// 0: "6_1552_1"
		// 1: "6_1362_1"
		// 2: "6_1751_1"
		// length: 3
		// __proto__: Array(0)
		// 3: 1560848800
		// length: 4

		let titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeGameLogViewLotteryTitle-" + this.getCnCode(), [String(lotteryTime), String(score)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		titleTF.setPosition(titleBg.x + 25, titleBg.y + titleBg.height / 2 - titleTF.height / 2+1)
		this.addChild(titleTF);
		titleBg.width = titleTF.width + 50;

		let timeTF = ComponentManager.getTextField(time, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN);
		timeTF.setPosition(bg.x + bg.width - timeTF.width - 25, public_up3.y + public_up3.height/2 - timeTF.height/2);
		this.addChild(timeTF);

		// let line = BaseBitmap.create("public_line1");
		// line.setPosition(bg.x + bg.width / 2 - line.width / 2, titleBg.y + titleBg.height + 2);
		// this.addChild(line);

		let down = BaseBitmap.create("acarcadeview_logdown-1");
		down.setScale(0.6);
		down.setPosition(bg.x + 15, titleBg.y + titleBg.height + 8);
		this.addChild(down);
		for (let i = 0; i < lotteryRewards.length; i++) {
			let scale = 0.55;
			let container = GameData.getItemIcon(GameData.formatRewardItem(this._itemData[2][i])[0]);
			container.setScale(scale);
			container.setPosition(down.x + (container.width * scale + 24) * i + 17, down.y + down.height / 2*down.scaleX - container.height * scale / 2);
			// container.setPosition(down.x + (container.width * scale + 8) * i + 6, down.y + down.height / 2 - container.height * scale / 2);
			this.addChild(container);
			let numLb = container.getChildByName("numLb");
			let magnifierIcon = container.getChildByName("magnifierIcon");
			if (numLb) {
				numLb.visible = false;
			}
			if (magnifierIcon) {
				magnifierIcon.visible = false;
			}
		}
		let rewardsTF = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeGameLogViewRewardsDesc-" + this.getCnCode(), [rewards.name, String(rewards.num), String(score)]), 20, TextFieldConst.COLOR_BROWN);
		rewardsTF.width = 290;
		rewardsTF.setPosition(down.x + down.width * down.scaleX + 20, down.y + down.height / 2* down.scaleX - rewardsTF.height / 2);
		this.addChild(rewardsTF);
	}
	public getSpaceY(): number {
		return 5;
	}

	public dispose(): void {
		this._itemData = null;
		this._aidAndCode = null;
		super.dispose();
	}
}