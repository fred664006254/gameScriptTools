/**
  * 东郊狩猎击杀奖励
  * author yangchengguo
  * date 2019.8.6
  * @class AcHuntingKillRewardScrollItem
  */
 class AcHuntingKillRewardScrollItem extends ScrollListItem {
	private _itemData: Config.AcCfg.HuntingAchievementItem = null;
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
        let vo = <AcHuntingVo>Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        let cfg = Config.AcCfg.getCfgByActivityIdAndCode(this._aidAndCode.aid, this._aidAndCode.code);

		let itembg = BaseBitmap.create("public_9_bg14");
		itembg.width = 520;
		this.addChild(itembg);

		let titleBg:BaseBitmap = BaseBitmap.create("common_titlebg");
		titleBg.y = 7;
		titleBg.x = 5;
		this.addChild(titleBg);

        let titleTF = ComponentManager.getTextField(LanguageManager.getlocal("achuntingKillTitle_" + data.id + "-" + this._aidAndCode.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleBg.width = titleTF.width + 60;
        titleBg.height = 30;
		titleTF.setPosition(titleBg.x + 25, titleBg.y + titleBg.height / 2 - titleTF.height / 2)
		this.addChild(titleTF);

		let rewardDesc = ComponentManager.getTextField(LanguageManager.getlocal("achuntingKillInfo_" + data.id + "-" + this._aidAndCode.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
		rewardDesc.setPosition(titleBg.x + itembg.width/2 - rewardDesc.width/2, titleBg.y + titleBg.height + 3)
		this.addChild(rewardDesc);
		itembg.height += rewardDesc.height + 5;

		let rewards = this._itemData.getReward;
		let rewardVoList: RewardItemVo[] = GameData.formatRewardItem(rewards);
		let rewardScale = 0.83;
		let itemHeight:number = 0;
		for (let i = 0; i < rewardVoList.length; i++) {
			let rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
			rewardDB.setScale(rewardScale);
			rewardDB.setPosition(itembg.x + (i % 5) * (rewardDB.width * rewardScale + 10) + 15, rewardDesc.y + rewardDesc.height + 5 + Math.floor(i / 5) * (rewardDB.height * rewardScale + 15) + 10);
			this.addChild(rewardDB);
			itemHeight = rewardDB.height * rewardScale + 15;
		}
		let offsetH = (rewardVoList.length % 5 == 0 ? rewardVoList.length / 5 : Math.floor(rewardVoList.length / 5) + 1) * itemHeight;
		itembg.height += offsetH - 20;
		
		//进度条
		let progress = ComponentManager.getProgressBar("progress8", "progress3_bg", 320);
		itembg.height += progress.height + 25;
		progress.setPosition(itembg.x + 15, itembg.y + itembg.height - progress.height - 25);
		this.addChild(progress);
				
		let	currBlood = vo.getBossRemainBloodById(data.id);
		if (this._aidAndCode.code == "4"){
			if (currBlood == 0){
				currBlood = data.npcHp;
			}
			else if (currBlood == data.npcHp){
				currBlood = 0;
			}
			else{
				currBlood = data.npcHp - currBlood;
			}
		}

		if (currBlood < 0){
			currBlood = 0;
		}
		progress.setPercentage(currBlood / data.npcHp, LanguageManager.getlocal("achuntingKillBlood-" + this._aidAndCode.code, [String(currBlood), String(data.npcHp)]), TextFieldConst.COLOR_WHITE);
		
        this.height = itembg.height;

        if (vo.isGetKillRewardById(data.id)) {
			let reviceBM = BaseBitmap.create("collectflag");
			reviceBM.anchorOffsetX = reviceBM.width / 2;
			reviceBM.anchorOffsetY = reviceBM.height / 2;
			reviceBM.setScale(0.7);
			reviceBM.setPosition(itembg.x + itembg.width - reviceBM.width * 0.7 / 2 - 10, this.y + this.height - reviceBM.height * 0.7 / 2);
			this.addChild(reviceBM);
		}
		else {
			if (vo.getBossId() > data.id) {
				let reviceBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", () => {
					if ((!vo.isStart)) {
						App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
						return;
					}
					NetManager.request(NetRequestConst.REQUEST_ACTIVITY_KILLREWARD, { activeId: vo.aidAndCode, rkey: Number(data.id) });
				}, this);
				reviceBtn.setPosition(itembg.x + itembg.width - reviceBtn.width - 15, itembg.y + itembg.height - reviceBtn.height - 15);
				this.addChild(reviceBtn);
			}
			else {
				let chargeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", () => {
					if (vo.checkIsInEndShowTime() || (!vo.isStart)) {
						App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
						return;
					}
				}, this);
				chargeBtn.setPosition(itembg.x + itembg.width - chargeBtn.width - 15, itembg.y + itembg.height - chargeBtn.height - 15);
				this.addChild(chargeBtn);
				chargeBtn.setGray(true);
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