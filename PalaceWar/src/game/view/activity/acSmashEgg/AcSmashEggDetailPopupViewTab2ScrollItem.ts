/**
 * 金蛋赠礼活动详情tab2Item
 * author hyd
 * date 2019/9/4
 * @class AcSmashEggDetailPopupViewTab2ScrollItem
 */
class AcSmashEggDetailPopupViewTab2ScrollItem extends ScrollListItem {
	private _aidAndCode: { "aid": string; "code": string } = null;
	public constructor() {
		super();
	}
	/**
	 * 初始化itemview
	 */
	public initItem(index: number, data: any, itemParam: any): void {
		this._aidAndCode = itemParam;
		let rewards: string = data;
		let itembg = BaseBitmap.create("public_9_bg14");
		itembg.width = 520;
		this.addChild(itembg);

		let titleBg: BaseBitmap = BaseBitmap.create("countrywarrewardview_itembg");
		titleBg.width = itembg.width;
		titleBg.height = 38;
		titleBg.y = 8;
		titleBg.x = 0;
		this.addChild(titleBg);

		let titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acSmashEggRewardTitle" + (index + 1) + '-' + this._aidAndCode.code), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		titleTF.setPosition(titleBg.x + titleBg.width / 2 - titleTF.width / 2, titleBg.y + titleBg.height / 2 - titleTF.height / 2)
		this.addChild(titleTF);


		let titleTipTF = ComponentManager.getTextField(LanguageManager.getlocal("acSmashEggRewardTitleTip" + (index + 1) + '-' + this._aidAndCode.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
		titleTipTF.setPosition(titleBg.x + titleBg.width / 2 - titleTipTF.width / 2, titleBg.y + titleBg.height + titleTipTF.height / 2)
		this.addChild(titleTipTF);

		App.LogUtil.log("AcSweetGiftRewardTab4ScrollItem rewards: " + rewards);
		let rewardVoList: RewardItemVo[] = GameData.formatRewardItem(rewards);
		let rewardScale = 0.83;
		let itemHeight: number = 0;
		for (let i = 0; i < rewardVoList.length; i++) {
			let rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
			rewardDB.setScale(rewardScale);
			rewardDB.setPosition(itembg.x + (i % 5) * (rewardDB.width * rewardScale + 10) + 15, titleTipTF.y + titleTipTF.height + 5 + Math.floor(i / 5) * (rewardDB.height * rewardScale + 15) + 10);
			this.addChild(rewardDB);
			itemHeight = rewardDB.height * rewardScale + 15;
		}
		let offsetH = (rewardVoList.length % 5 == 0 ? rewardVoList.length / 5 : Math.floor(rewardVoList.length / 5) + 1) * itemHeight;
		itembg.height += offsetH;

		this.height = itembg.height;
	}

	public getSpaceY(): number {
		return 30;
	}

	public dispose(): void {
		super.dispose();
	}
}