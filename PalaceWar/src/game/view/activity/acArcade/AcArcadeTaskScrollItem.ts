/**
  * 电玩的任务item
  * author 张朝阳
  * date 2019/6/12
  * @class AcArcadeTaskScrollItem
  */
class AcArcadeTaskScrollItem extends ScrollListItem {
	private _itemData: Config.AcCfg.ArcadeTaskItemCfg = null;
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
		let vo = <AcArcadeVo>Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
		this.width = 608;
		this.height = 165;
		let itembg = BaseBitmap.create("public_9_bg14");
		itembg.width = this.width;
		itembg.height = this.height;
		this.addChild(itembg);

		let titleBg: BaseBitmap = BaseBitmap.create("activity_charge_red");
		titleBg.y = 7;
		// bottom2.width =170;
		this.addChild(titleBg);

		let titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeTaksTitleType" + this._itemData.questType + "-" + this._aidAndCode.code, [String(this._itemData.value)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		titleTF.setPosition(titleBg.x + 25, titleBg.y + titleBg.height / 2 - titleTF.height / 2)
		this.addChild(titleTF);

		titleBg.width = titleTF.width + 50;

		let rewards = this._itemData.getReward;
		if (this._itemData.specialGift) {
			rewards = "1018_0_" + this._itemData.specialGift + "_" + itemParam.code + "|" + this._itemData.getReward;
		}
		let rewardArr = GameData.formatRewardItem(rewards);
		for (let i = 0; i < rewardArr.length; i++) {
			let scale = 0.85
			let rewardItem = GameData.getItemIcon(rewardArr[i], true);
			rewardItem.setScale(scale);
			rewardItem.setPosition(20 + (rewardItem.width * scale + 8) * i, titleBg.y + titleBg.height + 5);
			this.addChild(rewardItem);
		}

		if (vo.getTaskFlag(this._itemData.id)) {
			let reviceBM = BaseBitmap.create("collectflag");
			reviceBM.anchorOffsetX = reviceBM.width / 2;
			reviceBM.anchorOffsetY = reviceBM.height / 2;
			reviceBM.setScale(0.7);
			reviceBM.setPosition(itembg.x + itembg.width - reviceBM.width * 0.7 / 2 - 20, itembg.y + itembg.height - reviceBM.height / 2 * 0.7);
			this.addChild(reviceBM);
		}
		else {
			if (vo.getTaskValue(this._itemData.questType) >= this._itemData.value || this._itemData.questType == "1") {
				let reviceBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "taskCollect", () => {
					if (!vo.isStart) {
						App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
						return;
					}
					NetManager.request(NetRequestConst.REQUST_ACTIVITY_ARCADEGETTASKRWD, { activeId: vo.aidAndCode, rkey: data.id });
				}, this);
				reviceBtn.setPosition(itembg.x + itembg.width - reviceBtn.width - 15, itembg.y + itembg.height - reviceBtn.height - 20);
				this.addChild(reviceBtn);
				if (this._itemData.questType == "1" && vo.getTaskValue(this._itemData.questType) < this._itemData.value) {
					reviceBtn.setEnable(false);
				}
			}
			else {
				let goBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "taskGoBtn", this.goBtnClick, this);
				goBtn.setPosition(itembg.x + itembg.width - goBtn.width - 15, itembg.y + itembg.height - goBtn.height - 20);
				this.addChild(goBtn);
				if ((!vo.isStart) || (vo.checkIsInEndShowTime())) {
					goBtn.setGray(true);
				}
			}
		}

		let scheduleNum = vo.getTaskValue(this._itemData.questType);
		let scheduleStr = scheduleNum >= data.value ? LanguageManager.getlocal("springcelebrationNeedStr", [String(scheduleNum), String(this._itemData.value)]) : LanguageManager.getlocal("springcelebrationNeedStr2", [String(scheduleNum), String(this._itemData.value)]);

		let scheduleTF = ComponentManager.getTextField(scheduleStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
		scheduleTF.setPosition(this.x + this.width - 90 - scheduleTF.width / 2, this.height / 2 - scheduleTF.height);
		this.addChild(scheduleTF);
	}

	/**
	 * 前往的Click
	 */
	private goBtnClick() {
		let vo = <AcArcadeVo>Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
		let deltaT = vo.et - GameData.serverTime - 86400 * 1;
		if (deltaT < 0) {
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return;
		}
		let openType = this._itemData.openType;
		if (Api[openType + "VoApi"] && Api[openType + "VoApi"].isShowNpc) {
			let isShowNpc: boolean = Api[openType + "VoApi"].isShowNpc();
			if (!isShowNpc) {
				let lockedStr: string = Api[openType + "VoApi"].getLockedString ? Api[openType + "VoApi"].getLockedString() : LanguageManager.getlocal("dailyTask_" + openType + "Tip");
				App.CommonUtil.showTip(lockedStr ? lockedStr : LanguageManager.getlocal("sysWaitOpen"));
				return;
			}
		}
		if (openType == "wife") {
			ViewController.getInstance().openView(ViewConst.COMMON.WIFEVIEW_TAB1);
		}
		else if (openType == "child") {
			ViewController.getInstance().openView(ViewConst.COMMON.CHILDVIEW);
		}
		else if (openType == "search") {
			ViewController.getInstance().openView(ViewConst.COMMON.SEARCHVIEW);
		}
		else if (openType == "atkrace") {
			ViewController.getInstance().openView(ViewConst.COMMON.ATKRACEVIEW);
		}
		else if (openType == "affair") {
			ViewController.getInstance().openView(ViewConst.COMMON.AFFAIRVIEW);
		}
		else if (openType == "shop") {
			ViewController.getInstance().openView(ViewConst.COMMON.SHOPVIEW_TAB1);
		}
	}

	/**
	 * 获得
	 */
	private getTitleStr(type: number): string {
		let strTop: string = null;
		let valueStr = String(this._itemData.value);
		switch (Number(this._itemData.questType)) {
			case 1:
				{
					strTop = LanguageManager.getlocal("acChristmasTaksTitleType1", [valueStr]);
					break;
				}
			case 1002:
				{
					strTop = LanguageManager.getlocal("acChristmasTaksTitleType2", [valueStr]);
					break;
				}
			case 301:
				{
					strTop = LanguageManager.getlocal("acChristmasTaksTitleType3", [valueStr]);
					break;
				}
			case 402:
				{
					strTop = LanguageManager.getlocal("acChristmasTaksTitleType4", [valueStr]);
					break;
				}
			case 303:
				{
					strTop = LanguageManager.getlocal("acChristmasTaksTitleType5", [valueStr]);
					break;
				}
			case 601:
				{
					strTop = LanguageManager.getlocal("acChristmasTaksTitleType6", [valueStr]);
					break;
				}
		}
		return strTop;
	}
	public getSpaceY(): number {
		return 5;
	}

	public dispose(): void {
		this._itemData = null;
		super.dispose();
	}
}