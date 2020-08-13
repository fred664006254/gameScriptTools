

class AcSeaWomanScrollItem2 extends ScrollListItem {
	private _aidAndCode: { "aid": string; "code": string ; "uicode": string} = null;
	public constructor() {
		super();
	}
	/**
	 * 初始化itemview
	 */
	public initItem(index: number, data: any, itemParam: any): void {
		this._aidAndCode = itemParam;
		let rewards: any[] = data;
		let itembg = BaseBitmap.create("public_popupscrollitembg");
		itembg.y = 13;
		this.addChild(itembg);

		let titleBg: BaseBitmap = BaseBitmap.create("ackite_processtitlebg-1");
		this.addChild(titleBg);

		let titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acSeaWomanRewardTitle" + (index + 1) + '-' + this._aidAndCode.uicode), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_BROWN);
		titleTF.setPosition(titleBg.x + titleBg.width / 2 - titleTF.width / 2, titleBg.y + titleBg.height / 2 - titleTF.height / 2)
		this.addChild(titleTF);


		let titleTipTF = ComponentManager.getTextField(LanguageManager.getlocal("acSeaWomanRewardTitleTip" + (index + 1) + '-' + this._aidAndCode.uicode), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
		titleTipTF.setPosition(titleBg.x + titleBg.width / 2 - titleTipTF.width / 2, titleBg.y + titleBg.height + titleTipTF.height / 2)
		this.addChild(titleTipTF);


		let rewardScale = 0.8;
		let itemHeight: number = 0;
		for (let i = 0; i < rewards.length; i++) {
            let oneinfo = rewards[i];
            let rewardvo = GameData.formatRewardItem(oneinfo[0])[0];
            // rewardvo.num = oneinfo[1];
			let rewardDB = GameData.getItemIcon(rewardvo, true, true);
			rewardDB.setScale(rewardScale);
			rewardDB.setPosition(itembg.x + (i % 5) * (rewardDB.width * rewardScale + 10) + 15, titleTipTF.y + titleTipTF.height + 5 + Math.floor(i / 5) * (rewardDB.height * rewardScale + 15) + 10);
			this.addChild(rewardDB);
			itemHeight = rewardDB.height * rewardScale + 15;
		}
		let offsetH = Math.ceil(rewards.length/5) * itemHeight-40;
		itembg.height += offsetH;

		this.height = itembg.height+itembg.y+10;
	}

	public getSpaceY(): number {
        return 20;
    }

	public dispose(): void {
		super.dispose();
	}
}
