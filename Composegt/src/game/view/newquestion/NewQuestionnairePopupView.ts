class NewQuestionnairePopupView extends PopupView {

	private _getButton: BaseButton;
	private _scrollList: ScrollList;
	private _radioNums = 0;

	public constructor() {
		super();
	}

	protected initView(): void {
		this._radioNums = 0;
		// itemInfo.ic
		let bg: BaseBitmap = BaseBitmap.create("public_tc_bg01");
		bg.width = 520;
		bg.height = 770;
		bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
		bg.y = 25;
		this.addChildToContainer(bg);

		let bg1 = BaseBitmap.create("public_tc_bg03");
		bg1.width = bg.width - 20;
		bg1.height = bg.height - 20;
		bg1.x = this.viewBg.width / 2 - bg1.width / 2;
		bg1.y = bg.y + 10;
		this.addChildToContainer(bg1);

		let nameText = ComponentManager.getTextField(LanguageManager.getlocal("newquestion_37wd_tip_3", [Config.QuestionnaireCfg.getReward()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
		nameText.x = GameConfig.stageWidth / 2 - nameText.width / 2;
		nameText.y = bg1.y + 20;
		this.addChildToContainer(nameText);

		NewQuestionnaireCtrl.getIns().clearAnswers();
		let list = Config.QuestionnaireCfg.getList();
		let _scroRect = new egret.Rectangle(70, 161 + 15, 500, 620);
		this._scrollList = ComponentManager.getScrollList(NewQuestionnaireItem, list, _scroRect);
		this._scrollList.x = 70;
		this._scrollList.y = 100//161+15;
		this.addChildToContainer(this._scrollList);
		//统计单选数量
		list.forEach(item => {
			if (item.answerNum == 0 && item.multipleChoice == 0) {
			} else {
				this._radioNums++;
			}
		});

		let changeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "DragonBoatDayLq", this.getHandler, this);
		changeBtn.x = this.viewBg.width / 2 - changeBtn.width / 2;
		changeBtn.y = 726//798+9;
		// changeBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(changeBtn);
		this._getButton = changeBtn;
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_OTHERINFO_UNIQUE_QUESTIONNAIRE, this.receiveData, this);
	}
	private getHandler(param: any): void {
		let view_data = NewQuestionnaireCtrl.getIns(), answers = view_data.getAnswers();
		let data = {}, sendData = {};
		let radioNum = 0;//统计已答单选题数量
		for (let key in answers) {
			data[key] = answers[key];
			if (answers[key].length > 0) {
				radioNum++;
			}
		}
		if (radioNum < this._radioNums) {
			App.CommonUtil.showTip(LanguageManager.getlocal("newquestion_37wd_tip_2"))
			return;
		}
		if(view_data.getInputStr()=="")
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("newquestion_37wd_tip_2"))
			return;
		}

		let device = App.DeviceUtil.isIOS() ? "IOS" : "Android";
		let q4 = view_data.getInputStr();
		data[view_data.getInputId()] = q4;
		sendData["answer"] = data;
		sendData["sysphone"] = device;

		this.request(NetRequestConst.REQUEST_OTHERINFO_UNIQUE_QUESTIONNAIRE, sendData);
		this._getButton.setEnable(false);
	}
	//请求回调
	protected receiveData(event): void {
		let data: { ret: boolean, data: any } = event.data;
		if (!data.ret) {
			// App.CommonUtil.showTip(LanguageManager.getlocal(data.data.msg));
			return;
		}
		if (data.data.data && data.data.data.rewards) {
			let rewards = GameData.formatRewardItem(data.data.data.rewards);
			if (rewards && rewards.length > 0) {
				App.CommonUtil.playRewardFlyAction(rewards);
			}
		}
		this.hide()
	}
	public dispose(): void {
		super.dispose();
		this._scrollList = null;
	}
}