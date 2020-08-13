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
	/**
	 * 初始化itemview
	 */
	public initItem(index: number, data: any, itemParam: any): void {

		this._itemData = data;
		this._aidAndCode = itemParam;
		let cfg = <Config.AcCfg.ArcadeCfg>Config.AcCfg.getCfgByActivityIdAndCode(this._aidAndCode.aid, this._aidAndCode.code);

		this.width = 520;
		this.height = 165;

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

		let bg: BaseBitmap = BaseBitmap.create("public_9_bg14");
		bg.width = this.width;
		bg.height = this.height;
		this.addChild(bg);

		let titleBg: BaseBitmap = BaseBitmap.create("accarnivalview_tab_red");
		titleBg.y = 7;
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

		let titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeGameLogViewLotteryTitle-" + this._aidAndCode.code, [String(lotteryTime), String(score)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		titleTF.setPosition(titleBg.x + 25, titleBg.y + titleBg.height / 2 - titleTF.height / 2)
		this.addChild(titleTF);
		titleBg.width = titleTF.width + 50;

		let timeTF = ComponentManager.getTextField(time, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN2);
		timeTF.setPosition(bg.x + bg.width - timeTF.width - 30, titleBg.y + titleBg.height - timeTF.height);
		this.addChild(timeTF);

		let line = BaseBitmap.create("public_line1");
		line.setPosition(bg.x + bg.width / 2 - line.width / 2, titleBg.y + titleBg.height + 2);
		this.addChild(line);

		let down = BaseBitmap.create("acarcadeview_logdown-1")
		down.setPosition(bg.x + 20, line.y + line.height + 3);
		this.addChild(down);
		for (let i = 0; i < lotteryRewards.length; i++) {
			let scale = 0.45;
			let container = GameData.getItemIcon(GameData.formatRewardItem(this._itemData[2][i])[0]);
			container.setScale(scale);
			container.setPosition(down.x + (container.width * scale + 8) * i + 6, down.y + down.height / 2 - container.height * scale / 2);
			this.addChild(container);
			let numLb = container.getChildByName("numLb");
			let magnifierIcon = container.getChildByName("magnifierIcon");
			if (numLb) {
				numLb.visible = false;
			}
			if (container.getChildByName("numbg"))
            {
                container.getChildByName("numbg").visible = false;
            }
			if (magnifierIcon) {
				magnifierIcon.visible = false;
			}
		}

		let up = BaseBitmap.create("acarcadeview_logup-1")
		up.setPosition(down.x, down.y);
		this.addChild(up);

		let rewardsTF = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeGameLogViewRewardsDesc-" + this._aidAndCode.code, [rewards.name, String(rewards.num), String(score)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
		rewardsTF.width = 290;
		rewardsTF.setPosition(up.x + up.width + 25, up.y + up.height / 2 - rewardsTF.height / 2);
		this.addChild(rewardsTF);


	}
	public getSpaceY(): number {
		return 5;
	}

	public dispose(): void {
		this._itemData = null;
		super.dispose();
	}
}