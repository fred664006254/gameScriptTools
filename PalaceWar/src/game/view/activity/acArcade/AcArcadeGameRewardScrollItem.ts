/**
  * 拉霸机奖池item
  * author 张朝阳
  * date 2019/6/12
  * @class AcArcadeGameRewardScrollItem
  */
class AcArcadeGameRewardScrollItem extends ScrollListItem {
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

		let bg = BaseBitmap.create("public_9_bg14");
		bg.width = 520;
		this.addChild(bg);


		let titleBg: BaseLoadBitmap = BaseLoadBitmap.create("acmidautumnview_titlebg");
		titleBg.width = 520;
		titleBg.height = 33;
		titleBg.setPosition(bg.x + bg.width / 2 - titleBg.width / 2, bg.y + 6);
		this.addChild(titleBg);

		let tilteTF = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeGameRewardScrollItemTitle" + this._itemData.id + "-" + this._aidAndCode.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		tilteTF.setPosition(titleBg.x + titleBg.width / 2 - tilteTF.width / 2, titleBg.y + titleBg.height / 2 - tilteTF.height / 2);
		this.addChild(tilteTF);

		let rewards = this._itemData.rewardPoolList();
		let rewardVoList: RewardItemVo[] = GameData.formatRewardItem(rewards);
		let rewardScale = 1;
		let itemHeight: number = 0;
		let num = 4;
		for (let i = 0; i < rewardVoList.length; i++) {
			let rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
			rewardDB.setScale(rewardScale);
			rewardDB.setPosition(titleBg.x + (i % num) * (rewardDB.width * rewardScale + 20) + 15, titleBg.y + titleBg.height + Math.floor(i / num) * (rewardDB.height * rewardScale + 20) + 10);
			this.addChild(rewardDB);
			itemHeight = rewardDB.height * rewardScale + 15;
		}
		let offsetH = (rewardVoList.length % num == 0 ? rewardVoList.length / num : Math.floor(rewardVoList.length / num) + 1) * itemHeight;
		this.height = titleBg.height + offsetH + 15 + 5;
		bg.height = this.height;

	}
	public getSpaceY(): number {
		return 5;
	}

	public dispose(): void {
		this._itemData = null;
		super.dispose();
	}
}