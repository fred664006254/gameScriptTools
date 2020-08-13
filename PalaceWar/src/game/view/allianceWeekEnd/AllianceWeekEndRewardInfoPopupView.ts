/**
  * 勤王除恶宝箱奖励
  * @author 张朝阳
  * date 2019/4/15
  * @class AllianceWeekEndReportView
  */

class AllianceWeekEndRewardInfoPopupView extends PopupView {

	private _receiveBtn: BaseButton = null;

	private _receiveBM: BaseBitmap = null;

	public constructor() {
		super();
	}

	public initView() {
		App.MessageHelper.addNetMessage(NetRequestConst.REQYEST_ALLIANCEWEEK_GETSCOREREWARD, this.scoreHandle, this);
		let cfg = this.param.data.itemCfg;
		//public_9_probiginnerbg
		// let lockTF = ComponentManager.getTextField(LanguageManager.getlocal("ac" + aid + "lockTitle",[cfg.needNum]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN)
		// lockTF.setPosition(this.viewBg.x + this.viewBg.width / 2 - lockTF.width / 2 ,15)
		// this.addChildToContainer(lockTF);

		let rewardBg = BaseBitmap.create("public_9_probiginnerbg")
		rewardBg.width = 526;
		rewardBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - rewardBg.width / 2, this.viewBg.y + 15);
		this.addChildToContainer(rewardBg);

		let rewardsVoList = GameData.formatRewardItem(cfg.getReward);
		let rewardScale = 0.85;
		let itemHeight: number = 0;
		for (let i = 0; i < rewardsVoList.length; i++) {
			let rewardDB = GameData.getItemIcon(rewardsVoList[i], true, true);
			rewardDB.setScale(rewardScale);
			rewardDB.setPosition(rewardBg.x + (i % 5) * (rewardDB.width * rewardScale + 11) + 10, rewardBg.y + Math.floor(i / 5) * (rewardDB.height * rewardScale + 10) + 17);
			this.addChildToContainer(rewardDB);
			itemHeight = rewardDB.height * rewardScale;
		}
		let offsetHeight = rewardsVoList.length % 5 == 0 ? rewardsVoList.length / 5 * itemHeight : (Math.floor(rewardsVoList.length / 5) + 1) * itemHeight;
		rewardBg.height += offsetHeight;

		this._receiveBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "taskCollect", () => {
			if (!Api.allianceWeekVoApi.checkActivityStart()) {
				App.CommonUtil.showTip(LanguageManager.getlocal("allianceWeekEndViewAcTimeEndTip"));
				return;
			}
			this.request(NetRequestConst.REQYEST_ALLIANCEWEEK_GETSCOREREWARD, { rkey: cfg.id });
		}, this);
		this._receiveBtn.setPosition(rewardBg.x + rewardBg.width / 2 - this._receiveBtn.width / 2, rewardBg.y + rewardBg.height + 10);
		this.addChildToContainer(this._receiveBtn);

		let receiveBMScale = 0.75;
		this._receiveBM = BaseBitmap.create("collectflag");
		this._receiveBM.setScale(receiveBMScale);
		this._receiveBM.setPosition(this._receiveBtn.x + this._receiveBtn.width / 2 - this._receiveBM.width * receiveBMScale / 2, rewardBg.y + rewardBg.height + 3);
		this.addChildToContainer(this._receiveBM);

		this.refreshView();

	}

	private refreshView() {
		let cfg = this.param.data.itemCfg;
		if (Api.myAllianceWeekVoApi.getScore() >= cfg.score) {
			if (Api.myAllianceWeekVoApi.checkBoxReceive(cfg.id)) {
				this._receiveBtn.setVisible(false);
				this._receiveBM.setVisible(true);
			}
			else {
				this._receiveBtn.setVisible(true);
				this._receiveBtn.setEnable(true);
				this._receiveBM.setVisible(false);

			}
		}
		else {
			this._receiveBtn.setVisible(true);
			this._receiveBtn.setEnable(false);
			this._receiveBM.setVisible(false);
		}
	}

	private scoreHandle(event: egret.Event) {
		if (event.data.ret) {
			let reward = GameData.formatRewardItem(event.data.data.data.rewards);
			App.CommonUtil.playRewardFlyAction(reward);
			this.refreshView();

			let replacerewards = event.data.data.data.replacerewards;
			if (replacerewards) {
				ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
			}

		}
	}
	protected getShowHeight() {
		return 315;
	}
	protected getTitleStr(): string {
		return "allianceWeekEndRewardInfoPopupViewTitle";
	}
	public dispose() {
		App.MessageHelper.removeNetMessage(NetRequestConst.REQYEST_ALLIANCEWEEK_GETSCOREREWARD, this.scoreHandle, this);
		this._receiveBtn = null;
		this._receiveBM = null;
		super.dispose();
	}

}