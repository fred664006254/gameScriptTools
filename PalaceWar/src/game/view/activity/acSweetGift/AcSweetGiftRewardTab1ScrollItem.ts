/**
  * 月夜仙缘充值奖励item
  * author yangchengguo
  * date 2019.8.20
  * @class AcSweetGiftRewardTab1ScrollItem
  */
 class AcSweetGiftRewardTab1ScrollItem extends ScrollListItem {
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

		let titleBg:BaseBitmap = BaseBitmap.create("accarnivalview_tab_red");
		titleBg.y = 7;
		titleBg.x = 5;
		this.addChild(titleBg);

		let titleTF = ComponentManager.getTextField(LanguageManager.getlocal("sweetgiftRechargeItemTitle", [String(this._itemData.needGem)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		titleTF.setPosition(titleBg.x + 25, titleBg.y + titleBg.height / 2 - titleTF.height / 2)
		this.addChild(titleTF);

		// titleBg.width = titleTF.width + 50;

		let rewards = this._itemData.getReward;
		// if (this._itemData.specialGift) {
		// 	rewards = "1023_0_" + this._itemData.specialGift + "_" + this._aidAndCode.code + "|" + this._itemData.getReward;
		// }
		let rewardVoList: RewardItemVo[] = GameData.formatRewardItem(rewards);
		let rewardScale = 0.83;
		let itemHeight:number = 0;
		for (let i = 0; i < rewardVoList.length; i++) {
			let rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
			rewardDB.setScale(rewardScale);
			rewardDB.setPosition(itembg.x + (i % 5) * (rewardDB.width * rewardScale + 10) + 15, titleBg.y + titleBg.height + Math.floor(i / 5) * (rewardDB.height * rewardScale + 15) + 10);
			this.addChild(rewardDB);
			itemHeight = rewardDB.height * rewardScale + 15;
		}
		let offsetH = (rewardVoList.length % 5 == 0 ? rewardVoList.length / 5 : Math.floor(rewardVoList.length / 5) + 1) * itemHeight;
		itembg.height += offsetH - 20;
		
		//进度条
		let progress = ComponentManager.getProgressBar("progress5", "progress3_bg", 320);
		itembg.height += progress.height + 25;
		progress.setPosition(itembg.x + 15, itembg.y + itembg.height - progress.height - 25);
		this.addChild(progress);
		let currChargeGem = vo.getChargeNum();
		let progressStr = LanguageManager.getlocal("sweetgiftProgressText", [String(currChargeGem), String(data.needGem)]);
		progress.setPercentage(currChargeGem / data.needGem, progressStr, TextFieldConst.COLOR_WHITE);

		this.height = itembg.height;

		if (vo.isGetRechargeById(data.id)) {
			let reviceBM = BaseBitmap.create("collectflag");
			reviceBM.anchorOffsetX = reviceBM.width / 2;
			reviceBM.anchorOffsetY = reviceBM.height / 2;
			reviceBM.setScale(0.7);
			reviceBM.setPosition(itembg.x + itembg.width - reviceBM.width * 0.7 / 2 - 10, this.y + this.height - reviceBM.height * 0.7 / 2);
			this.addChild(reviceBM);
			titleBg.setRes("accarnivalview_tab_green");
		}
		else {
			if (vo.getChargeNum() >= data.needGem) {
				titleBg.setRes("accarnivalview_tab_green");
				let reviceBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", () => {
					if ((!vo.isStart)) {
						App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
						return;
					}
					NetManager.request(NetRequestConst.REQUEST_ACTIVITY_SWEETGIFT_GETCHARGE, { activeId: vo.aidAndCode, rkey: Number(data.id) });
				}, this);
				reviceBtn.setPosition(itembg.x + itembg.width - reviceBtn.width - 15, itembg.y + itembg.height - reviceBtn.height - 15);
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
				chargeBtn.setPosition(itembg.x + itembg.width - chargeBtn.width - 15, itembg.y + itembg.height - chargeBtn.height - 15);
				this.addChild(chargeBtn);
				if ((!vo.isStart) || (vo.checkIsInEndShowTime())) {
					chargeBtn.setGray(true);
				}
			}
		}
	}
	
	public getSpaceY(): number {
		return 5;
	}

	public dispose(): void {
		this._itemData = null;
		super.dispose();
	}
}