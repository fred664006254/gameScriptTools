/**
  * 国庆活动充值奖励item
  * author yangchengguo
  * date 2019.9.12
  * @class AcNationalDayRechargeScrollItem
  */
 class AcNationalDayRechargeScrollItem extends ScrollListItem {
	private _itemData:any= null;
	private _aid:string = null;
	private _code:string = null;
	public constructor() {
		super();
	}
	/**
	 * 初始化itemview
	 */
	public initItem(index: number, data: any, itemParam: any): void {
		this._itemData = data;
		this._aid = itemParam.aid;
		this._code = itemParam.code;
		let vo = <AcNationalDayVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);

		let itemBgStr = ResourceManager.hasRes("acnationalday_charge_item_bg-"+this.getTypeCode()) ? "acnationalday_charge_item_bg-"+this.getTypeCode() : "acnationalday_charge_item_bg-1";
		let itembg = BaseBitmap.create(itemBgStr);
		itembg.width = 621;
		this.addChild(itembg);

		let titleBg:BaseBitmap = BaseBitmap.create("alliance_taskAttrbg1");
		titleBg.y = 7;
		titleBg.x = 0;
		this.addChild(titleBg);

		let titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acNationalDayChargeItemInfo-"+this.getTypeCode(), [String(data.needItem)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		titleTF.setPosition(titleBg.x + 15, titleBg.y + titleBg.height / 2 - titleTF.height / 2);
		this.addChild(titleTF);
		titleBg.width = titleTF.width + 80;

		let rewards = this._itemData.getReward;
		if (data.specialReward) {
			rewards = "1028_0_" + data.specialReward + "_" + this._code + "|" + rewards;
		}
		let rewardVoList: RewardItemVo[] = GameData.formatRewardItem(rewards);
		let rewardScale = 1;
		let itemHeight:number = 0;
		for (let i = 0; i < rewardVoList.length; i++) {
			let rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
			rewardDB.setScale(rewardScale);
			rewardDB.setPosition(itembg.x + (i % 5) * (rewardDB.width * rewardScale + 11) + 19, titleBg.y + titleBg.height + Math.floor(i / 5) * (rewardDB.height * rewardScale + 15) + 10);
			this.addChild(rewardDB);
			itemHeight = rewardDB.height * rewardScale + 15;
		}
		let offsetH = ((rewardVoList.length % 5 == 0 ? rewardVoList.length / 5 : Math.floor(rewardVoList.length / 5) + 1) - 1) * itemHeight;
		itembg.height += offsetH + 5;
		
		//进度条
		let progress = ComponentManager.getProgressBar("progress5", "progress3_bg", 420);
		// itembg.height += progress.height + 25;
		progress.setPosition(itembg.x + 15, itembg.y + itembg.height - progress.height - 20);
		this.addChild(progress);
		let currChargeGem = vo.getChargeNum();
		let progressStr = String(currChargeGem+ "/" + data.needItem);
		progress.setPercentage(currChargeGem / data.needItem, progressStr, TextFieldConst.COLOR_WHITE);

		this.height = itembg.height;

		if (vo.isGetRechargeById(data.id)) {
			let reviceBM = BaseBitmap.create("collectflag");
			reviceBM.anchorOffsetX = reviceBM.width / 2;
			reviceBM.anchorOffsetY = reviceBM.height / 2;
			reviceBM.setScale(0.55);
			reviceBM.setPosition(itembg.x + itembg.width - reviceBM.width * 0.55 / 2 - 10, this.y + this.height - reviceBM.height * 0.55 / 2);
			this.addChild(reviceBM);
		}
		else {
			if (vo.getChargeNum() >= data.needItem) {
				let reviceBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", () => {
					if ((!vo.isStart)) {
						App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
						return;
					}
					NetManager.request(NetRequestConst.REQUEST_ACTIVITY_NATIONDAY_GETCHARGE, { activeId: vo.aidAndCode, rkey: Number(data.id) });
				}, this);
				reviceBtn.setPosition(itembg.x + itembg.width - reviceBtn.width - 15, itembg.y + itembg.height - reviceBtn.height - 10);
				this.addChild(reviceBtn);
			}
			else {
				let chargeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, "taskGoBtn", () => {
					if (vo.checkIsInEndShowTime() || (!vo.isStart)) {
						App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
						return;
					}
					ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
				}, this);
				chargeBtn.setPosition(itembg.x + itembg.width - chargeBtn.width - 15, itembg.y + itembg.height - chargeBtn.height - 10);
				this.addChild(chargeBtn);
				if ((!vo.isStart) || (vo.checkIsInEndShowTime())) {
					chargeBtn.setGray(true);
				}
			}
		}
	}

	private getTypeCode():string{
		if (this._code == "2"){
			return "1";
		}
		return this._code;
	}
	
	public getSpaceY(): number {
		return 5;
	}

	public dispose(): void {
		this._itemData = null;
		super.dispose();
	}
}