/**
  * 任务item
  * author 张朝阳
  * date 2019/7/16
  * @class AcRyeHarvestActivityRewardTaskScrollItem
  */
class AcRyeHarvestActivityRewardTaskScrollItem extends ScrollListItem {
	private _itemData: Config.AcCfg.RyeHarvestDailyTaskItemCfg = null;
	private _aidAndCode: { "aid": string; "code": string, "dayId": number } = null;
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
		// itembg.height = 80;
		this.addChild(itembg);


		let titleBg: BaseBitmap = BaseBitmap.create("activity_charge_red");
		titleBg.y = 7;
		titleBg.x = 3;
		this.addChild(titleBg);


		let titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acRyeHarvestActivityRewardTaskScrollItemTaskType" + this._itemData.questType + "-" + this._aidAndCode.code, [String(this._itemData.value)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		titleTF.setPosition(titleBg.x + 25, titleBg.y + titleBg.height / 2 - titleTF.height / 2)
		this.addChild(titleTF);

		// titleBg.width = titleTF.width + 50;

		let rewards = this._itemData.getReward;
		if (this._itemData.specialReward) {
			let uicode = itemParam.code == "4" ? "3" : itemParam.code;
			rewards = "1007_0_" + this._itemData.specialReward + "_" + uicode + "|" + this._itemData.getReward;
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
		itembg.height += offsetH - 20;
		this.height = itembg.height;
		if (vo.getTaskFlag(String(this._aidAndCode.dayId), this._itemData.questType)) {
			let reviceBM = BaseBitmap.create("collectflag");
			reviceBM.anchorOffsetX = reviceBM.width / 2;
			reviceBM.anchorOffsetY = reviceBM.height / 2;
			reviceBM.setScale(0.7);
			reviceBM.setPosition(itembg.x + 425, this.y + this.height / 2);
			this.addChild(reviceBM);
		}
		else {
			let needTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_BROWN);
			needTxt.text = LanguageManager.getlocal("springcelebrationNeedStr", [1 + "", data.value + ""]);

			if (vo.getTaskValue(String(this._aidAndCode.dayId), this._itemData.questType) >= this._itemData.value) {
				needTxt.text = LanguageManager.getlocal("springcelebrationNeedStr", [vo.getTaskValue(String(this._aidAndCode.dayId), this._itemData.questType), this._itemData.value]);

				let reviceBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", () => {
					let v = <AcRyeHarvestVo>Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
					if ((!v.isStart)) {
						App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
						return;
					}
					NetManager.request(NetRequestConst.REQUEST_RYEHARVEST_GETRYEHARVESTTASK, { activeId: vo.aidAndCode, taskId: Number(data.id), diffday: this._aidAndCode.dayId });
				}, this);
				reviceBtn.setPosition(itembg.x + 425 - reviceBtn.width / 2, itembg.y + itembg.height - reviceBtn.height - 30);
				this.addChild(reviceBtn);
			}
			else {
				needTxt.text = LanguageManager.getlocal("springcelebrationNeedStr2", [vo.getTaskValue(String(this._aidAndCode.dayId), this._itemData.questType), this._itemData.value]);

				if (this._itemData.questType == "1004") {
					let reviceBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", () => { }, this);
					reviceBtn.setPosition(itembg.x + 425 - reviceBtn.width / 2, itembg.y + itembg.height - reviceBtn.height - 30);
					this.addChild(reviceBtn);
					reviceBtn.setEnable(false);

				}
				else {
					let goBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskGoBtn", this.goBtnClick, this);
					goBtn.setPosition(itembg.x + 425 - goBtn.width / 2, itembg.y + itembg.height - goBtn.height - 30);
					this.addChild(goBtn);
					if (this._aidAndCode.dayId != Number(vo.getNowDayTask())) {
						goBtn.setEnable(false);
					}
					if ((!vo.isStart) || (vo.checkIsInEndShowTime())) {
						goBtn.setEnable(false);
					}
				}
			}

			needTxt.setPosition(itembg.x + 425 - needTxt.width / 2, itembg.y + 70)
			this.addChild(needTxt);
		}



	}
	private goBtnClick() {
		let vo = <AcRyeHarvestVo>Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
		if (vo.checkIsInEndShowTime() || vo.isStart == false) {
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return;
		}
		let openType = this._itemData.openType;
		let viewName = App.StringUtil.firstCharToUper(openType);
		if (Api[openType + "VoApi"] && Api[openType + "VoApi"].isShowNpc) {
			let isShowNpc: boolean = Api[openType + "VoApi"].isShowNpc();
			if (!isShowNpc) {
				let lockedStr: string = Api[openType + "VoApi"].getLockedString ? Api[openType + "VoApi"].getLockedString() : LanguageManager.getlocal("dailyTask_" + openType + "Tip");
				App.CommonUtil.showTip(lockedStr ? lockedStr : LanguageManager.getlocal("sysWaitOpen"));
				return;
			}
		}
		if (openType == "alliance") {
			Api.allianceVoApi.openMainView();
			return;
		}

		if (openType == "studyatk") {
			Api.studyatkVoApi.openMainView();
			return;
		}
		if (Number(this._itemData.questType) == 951 || Number(this._itemData.questType) == 952 || Number(this._itemData.questType) == 961 || Number(this._itemData.questType) == 953) {
			viewName = "Dailyboss";
		}
		if (egret.getDefinitionByName(viewName + "View")) {
			if (Number(this._itemData.questType) == 801) {
				ViewController.getInstance().openView(viewName + "View|1");
			} else if (Number(this._itemData.questType) == 802) {
				ViewController.getInstance().openView(viewName + "View|2");
			} else if (Number(this._itemData.questType) == 302) {
				ViewController.getInstance().openView(ViewConst.COMMON.WIFEOPTVIEW);
			}
			else {
				ViewController.getInstance().openView(viewName + "View");
			}

		}

		else if (egret.getDefinitionByName(viewName + "PopupView")) //可以跳转
		{
			ViewController.getInstance().openView(viewName + "PopupView");
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