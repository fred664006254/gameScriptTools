/**
  * 充值item
  * author 张朝阳
  * date 2019/7/16
  * @class AcRyeHarvestActivityRewardChargeScrollItem
  */
class AcRyeHarvestActivityRewardChargeScrollItem extends ScrollListItem {
	private _itemData: Config.AcCfg.RyeHarvestRechargeItemCfg = null;
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
		let vo = <AcRyeHarvestVo>Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);

		let itembg = BaseBitmap.create("public_9_bg14");
		itembg.width = 520;
		itembg.height = 130;
		this.addChild(itembg);


		let titleBg: BaseBitmap = BaseBitmap.create(vo.getChargeNum(data.questType) >= data.needGem ? "accarnivalview_tab_green" : "accarnivalview_tab_red");
		titleBg.y = 7;
		titleBg.x = 3;
		// bottom2.width =170;
		this.addChild(titleBg);


		let titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acRyeHarvestActivityRewardChargeScrollItemTitle-" + this._aidAndCode.code, [String(data.needGem)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		titleTF.setPosition(titleBg.x + 25, titleBg.y + titleBg.height / 2 - titleTF.height / 2)
		this.addChild(titleTF);

		// titleBg.width = titleTF.width + 50;

		let rewards = this._itemData.getReward;
		if (this._itemData.specialGift) {
			let uicode = itemParam.code == "4" ? "3" : itemParam.code;
			rewards = "1007_0_" + this._itemData.specialGift + "_" + uicode + "|" + this._itemData.getReward;
		}
		let rewardVoList: RewardItemVo[] = GameData.formatRewardItem(rewards);
		let rewardScale = 0.83;
		let itemHeight: number = 0;
		for (let i = 0; i < rewardVoList.length; i++) {
			let rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
			rewardDB.setScale(rewardScale);
			rewardDB.setPosition(itembg.x + (i % 5) * (rewardDB.width * rewardScale + 10) + 15, titleBg.y + titleBg.height + Math.floor(i / 5) * (rewardDB.height * rewardScale + 15) + 10);
			this.addChild(rewardDB);
			itemHeight = rewardDB.height * rewardScale + 15;
		}
		let offsetH = (rewardVoList.length % 5 == 0 ? rewardVoList.length / 5 : Math.floor(rewardVoList.length / 5) + 1) * itemHeight;
		itembg.height += offsetH;
		this.height = itembg.height;

		//进度条
		let progress = ComponentManager.getProgressBar("progress5", "progress3_bg", 320);
		progress.setPosition(itembg.x + 15, itembg.y + itembg.height - progress.height - 25);
		this.addChild(progress);
		progress.setPercentage(vo.getChargeNum(data.questType) / data.needGem, LanguageManager.getlocal("acRyeHarvestActivityRewardChargeScrollItempg-" + this._aidAndCode.code, [String(vo.getChargeNum(data.questType)), String(data.needGem)]), TextFieldConst.COLOR_WHITE);


		if (vo.isGetRecharge(data.id)) {
			let reviceBM = BaseBitmap.create("collectflag");
			reviceBM.anchorOffsetX = reviceBM.width / 2;
			reviceBM.anchorOffsetY = reviceBM.height / 2;
			reviceBM.setScale(0.7);
			reviceBM.setPosition(itembg.x + itembg.width - reviceBM.width * 0.7 / 2 - 10, this.y + this.height - reviceBM.height * 0.7 / 2);
			this.addChild(reviceBM);
		}
		else {
			if (vo.getChargeNum(data.questType) >= data.needGem) {
				let reviceBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", () => {
					let v = <AcArcadeVo>Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
					if ((!v.isStart)) {
						App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
						return;
					}
					NetManager.request(NetRequestConst.REQUEST_RYEHARVEST_GETCHARGE, { activeId: vo.aidAndCode, rkey: Number(data.id) });
				}, this);
				reviceBtn.setPosition(itembg.x + itembg.width - reviceBtn.width - 15, itembg.y + itembg.height - reviceBtn.height - 15);
				this.addChild(reviceBtn);

			}
			else {
				let chargeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskGoBtn", () => {
					let v = <AcArcadeVo>Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
					if (vo.checkIsInEndShowTime() || (!v.isStart)) {
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