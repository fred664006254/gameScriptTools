/**
  * 马超任务item
  * author 张朝阳
  * date 2019/1/14
  * @class AcMaChaoTaskScrollItem
  */
class AcMaChaoTaskScrollItem extends ScrollListItem {
	private _itemData: any = null;
	private _itemParm: any = null;
	public constructor() {
		super();
	}
	/**
	 * 初始化itemview
	 */
	public initItem(index: number, data: any, itemParm: any): void {
		// App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMAZEITEMB,this.reviceRewardClickHandler,this);
		// App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMAZELOTTERY,this.refreshView,this);
		let cfg = <Config.AcCfg.MaChaoCfg>Config.AcCfg.getCfgByActivityIdAndCode(itemParm.aid, itemParm.code);
		let vo = <AcMaChaoVo>Api.acVoApi.getActivityVoByAidAndCode(itemParm.aid, itemParm.code);
		this._itemData = data;
		this._itemParm = itemParm;
		this.width = 610;
		this.height = 170;
		let itembg = BaseBitmap.create("public_9_bg14");
		itembg.width = this.width;
		itembg.height = this.height;
		this.addChild(itembg);

		let topbg = BaseBitmap.create("activity_charge_red");
		topbg.setPosition(itembg.x, itembg.y + 5);
		this.addChild(topbg);


		let strTop: string = this.getStr(Number(this._itemData.questType));
		let topTF = ComponentManager.getTextField(strTop, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		topTF.setPosition(topbg.x + 10, topbg.y + topbg.height / 2 - topTF.height / 2);
		this.addChild(topTF);

		let rewardArr = GameData.formatRewardItem(this._itemData.getReward);
		for (let i = 0; i < rewardArr.length; i++) {

			let rewardItem = GameData.getItemIcon(rewardArr[i], true, true);
			rewardItem.setScale(0.95);
			rewardItem.setPosition(20 + (rewardItem.width + 8) * i, topbg.y + topbg.height);
			this.addChild(rewardItem);
		}

		let reviceBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "taskCollect", () => {
			NetManager.request(NetRequestConst.REQUST_ACTIVITY_MACHAOGETITEMB, { "activeId": vo.aidAndCode, "taskId": this._itemData.id })
			// AcMazeView.RECHARGEID = this._itemData.id;
		}, this);
		reviceBtn.setPosition(this.width - reviceBtn.width - 20, this.height / 2);
		this.addChild(reviceBtn);
		let goBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "taskGoBtn", this.goBtnClick, this);
		goBtn.setPosition(this.width - reviceBtn.width - 20, this.height / 2);
		this.addChild(goBtn);
		goBtn.setVisible(false);

		let scheduleNum = vo.getTask(this._itemData.questType);
		let reviceBMScale = 0.6;
		let reviceBM = BaseBitmap.create("collectflag");
		// reviceBM.width *= 0.5;
		// reviceBM.height *= 0.5;
		reviceBM.setScale(reviceBMScale);
		reviceBM.setPosition(reviceBtn.x + reviceBtn.width / 2 - reviceBM.width * reviceBMScale / 2, reviceBtn.y + reviceBtn.height / 2 - reviceBM.height * reviceBMScale / 2 + 10);
		this.addChild(reviceBM);
		let scheduleStr = LanguageManager.getlocal("acMaChaoViewTaskPlan-" + itemParm.code, [scheduleNum < this._itemData.value ? "<font color=0xce1515>" + scheduleNum + "</font>" : "<font color=0x3e9b00>" + scheduleNum + "</font>", this._itemData.value])

		let scheduleTF = ComponentManager.getTextField(scheduleStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
		scheduleTF.setPosition(reviceBtn.x + reviceBtn.width / 2 - scheduleTF.width / 2, this.height / 2 - scheduleTF.height);
		this.addChild(scheduleTF);
		if (vo.getTaskState(this._itemData.id)) {
			reviceBM.setVisible(true);
			reviceBtn.setVisible(false);
		}
		else {
			reviceBM.setVisible(false);
			// reviceBtn.setVisible(true);
			if (scheduleNum < this._itemData.value) {
				let openType = cfg.getTaskType(this._itemData.id);
				if (openType == null) {
					reviceBtn.setVisible(true);
					reviceBtn.setEnable(false);
					goBtn.setVisible(false);
				}
				else {
					reviceBtn.setVisible(false);
					goBtn.setVisible(true);
				}

			}
			else {
				reviceBtn.setVisible(true);
				reviceBtn.setEnable(true);
				goBtn.setVisible(false);
			}
		}

	}
	private goBtnClick() {
		let cfg = <Config.AcCfg.MaChaoCfg>Config.AcCfg.getCfgByActivityIdAndCode(this._itemParm.aid, this._itemParm.code);
		let vo = <AcMaChaoVo>Api.acVoApi.getActivityVoByAidAndCode(this._itemParm.aid, this._itemParm.code);
		if (vo.checkIsInEndShowTime()) {
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return;
		}
		let openType = cfg.getTaskType(this._itemData.id);
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
	}
	/**获得字符串 */
	private getStr(questType: number): string {
		let strTop: string = null;
		switch (Number(this._itemData.questType)) {
			case 1:
				{
					strTop = LanguageManager.getlocal("acMaChaoViewTaskLogin-" + this._itemParm.code, [this._itemData.value]);
					break;
				}
			case 3:
				{
					strTop = LanguageManager.getlocal("acMaChaoViewTaskTakeReward-" + this._itemParm.code, [this._itemData.value]);
					break;
				}
			case 301:
				{
					strTop = LanguageManager.getlocal("acMaChaoViewTaskRandom-" + this._itemParm.code, [this._itemData.value]);
					break;
				}
			case 402:
				{
					strTop = LanguageManager.getlocal("acMaChaoViewTaskTakeCultivate-" + this._itemParm.code, [this._itemData.value]);
					break;
				}
			case 303:
				{
					strTop = LanguageManager.getlocal("acMaChaoViewTaskTakeFind-" + this._itemParm.code, [this._itemData.value]);
					break;
				}
			case 601:
				{
					strTop = LanguageManager.getlocal("acMaChaoViewTaskTakeFight-" + this._itemParm.code, [this._itemData.value]);
					break;
				}
		}
		return strTop;
	}
	public getSpaceY(): number {
		return 5;
	}

	public dispose(): void {
		// App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMAZEITEMB,this.reviceRewardClickHandler,this);
		// App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMAZELOTTERY,this.refreshView,this);
		this._itemData = null;
		this._itemParm = null;
		super.dispose();
	}
}