/**
  * 巾帼英雄充值奖励item
  * author ycg
  * date 2019.11.11
  * @class AcHeroineRewardPopupTab1ScrollItem
  */
 class AcHeroineRewardPopupTab1ScrollItem extends ScrollListItem {
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
		let vo = <AcHeroineVo>Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);

		let itembg = BaseBitmap.create("public_9_bg14");
		itembg.width = 544;
		this.addChild(itembg);

		let titleBg:BaseBitmap = BaseBitmap.create("accarnivalview_tab_red");
		titleBg.y = 7;
		titleBg.x = 5;
		this.addChild(titleBg);

		let titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acHeroineRechargeInfo-"+this.getTypeCode(), [String(this._itemData.needGem)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		titleTF.setPosition(titleBg.x + 25, titleBg.y + titleBg.height / 2 - titleTF.height / 2)
		this.addChild(titleTF);

		let rewards = this._itemData.getReward;
		if (this._itemData.specialGift) {
			rewards = "1034_0_" + this._itemData.specialGift + "_" + this.getTypeCode() + "|" + rewards;
		}
		let rewardVoList: RewardItemVo[] = GameData.formatRewardItem(rewards);
		let rewardScale = 0.84;
		let itemHeight:number = 0;
		for (let i = 0; i < rewardVoList.length; i++) {
			let rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
			rewardDB.setScale(rewardScale);
			rewardDB.setPosition(itembg.x + (i % 5) * (rewardDB.width * rewardScale + 13) + 12, titleBg.y + titleBg.height + Math.floor(i / 5) * (rewardDB.height * rewardScale + 15) + 10);
			this.addChild(rewardDB);
			itemHeight = rewardDB.height * rewardScale + 15;
		}
		let offsetH = (rewardVoList.length % 5 == 0 ? rewardVoList.length / 5 : Math.floor(rewardVoList.length / 5) + 1) * itemHeight;
		itembg.height += offsetH - 20;
		
		//进度条
		let progress = ComponentManager.getProgressBar("progress5", "progress3_bg", 320);
		itembg.height += progress.height + 25;
		progress.setPosition(itembg.x + 10, itembg.y + itembg.height - progress.height - 25);
		this.addChild(progress);
		let currChargeGem = vo.getChargeNum();
		let progressStr = LanguageManager.getlocal("acHeroineRechargeNum-"+this.getTypeCode(), [String(currChargeGem), String(data.needGem)]);
		progress.setPercentage(currChargeGem / data.needGem, progressStr, TextFieldConst.COLOR_WHITE);

		this.height = itembg.height;

		if (vo.isGetRechargeById(data.id)) {
			let reviceBM = BaseBitmap.create("collectflag");
			reviceBM.anchorOffsetX = reviceBM.width / 2;
			reviceBM.anchorOffsetY = reviceBM.height / 2;
			reviceBM.setScale(0.7);
			reviceBM.setPosition(itembg.x + itembg.width - reviceBM.width * 0.7 / 2 - 20, this.y + this.height - reviceBM.height * 0.7 / 2);
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
					NetManager.request(NetRequestConst.REQUEST_ACTIVITY_HEROINE_RECHARGE, { activeId: vo.aidAndCode, rkey: Number(data.id) });
				}, this);
				reviceBtn.setPosition(itembg.x + itembg.width - reviceBtn.width - 25, itembg.y + itembg.height - reviceBtn.height - 15);
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
				chargeBtn.setPosition(itembg.x + itembg.width - chargeBtn.width - 25, itembg.y + itembg.height - chargeBtn.height - 15);
				this.addChild(chargeBtn);
				if ((!vo.isStart) || (vo.checkIsInEndShowTime())) {
					chargeBtn.setGray(true);
				}
				else{
					chargeBtn.setGray(false);
				}
			}
		}
	}

	private getTypeCode():string{
		if (this._aidAndCode.code == "2"){
			return "1";
		}
		else if (this._aidAndCode.code == "4"){
            return "3";
        }
        else if (this._aidAndCode.code == "6"){
            return "5";
        }
        else if (this._aidAndCode.code == "8"){
            return "7";
        }
        else if (this._aidAndCode.code == "10"){
            return "9";
        }
		return this._aidAndCode.code;
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