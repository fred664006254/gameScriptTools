/**
  * 月夜仙缘充值奖励item
  * author yangchengguo
  * date 2019.8.20
  * @class AcSweetGiftRewardTab4ScrollItem
  */
 class AcSweetGiftRewardTab4ScrollItem extends ScrollListItem {
	private _itemData:any= null;
	private _aidAndCode: { "aid": string; "code": string} = null;
	public constructor() {
		super();
	}
	/**
	 * 初始化itemview
	 */
	public initItem(index: number, data: any, itemParam: any): void {
		this._itemData = data;
		this._aidAndCode = itemParam;
		let vo = <AcSweetGiftVo>Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);

		let itembg = BaseBitmap.create("public_9_bg14");
		itembg.width = 520;
		this.addChild(itembg);

        let titleBg:BaseBitmap = BaseBitmap.create("countrywarrewardview_itembg");
        titleBg.width = itembg.width;
		titleBg.y = 6;
		titleBg.x = 0;
        this.addChild(titleBg);
        
        let itemName = LanguageManager.getlocal("itemName_" + data.itemID);
		let titleTF = ComponentManager.getTextField(LanguageManager.getlocal("sweetgiftCakeRewardTitle-"+this._aidAndCode.code+"_"+(index+1), [itemName]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		titleTF.setPosition(titleBg.x + titleBg.width/2 - titleTF.width/2, titleBg.y + titleBg.height / 2 - titleTF.height / 2)
		this.addChild(titleTF);

        let rewards = vo.getMoonCakeRewardsByItemId(data.itemID);
        App.LogUtil.log("AcSweetGiftRewardTab4ScrollItem rewards: "+rewards);
		let rewardVoList: RewardItemVo[] = GameData.formatRewardItem(rewards);
		let rewardScale = 0.83;
		let itemHeight:number = 0;
		for (let i = 0; i < rewardVoList.length; i++) {
			let rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
			rewardDB.setScale(rewardScale);
			rewardDB.setPosition(itembg.x + (i % 5) * (rewardDB.width * rewardScale + 10) + 15, titleBg.y + titleBg.height + Math.floor(i / 5) * (rewardDB.height * rewardScale + 15) + 10);
			this.addChild(rewardDB);
			itemHeight = rewardDB.height * rewardScale + 5;
		}
		let offsetH = (rewardVoList.length % 5 == 0 ? rewardVoList.length / 5 : Math.floor(rewardVoList.length / 5) + 1) * itemHeight;
		itembg.height += offsetH - 20;
	
		this.height = itembg.height;	
	}
	
	public getSpaceY(): number {
		return 5;
	}

	public dispose(): void {
		this._itemData = null;
		super.dispose();
	}
}