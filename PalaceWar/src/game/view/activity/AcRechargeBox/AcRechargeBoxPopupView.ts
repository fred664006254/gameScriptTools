/**
  * 百服活动-储值宝箱物品展示
  * author 张朝阳
  * date 2018/8/15
  * @class AcRechargeBoxPopupView
  */
class AcRechargeBoxPopupView extends PopupView {
	private _rechargeBtn: BaseButton = null;
	private _receiveBtn: BaseButton = null;
	private _allReceiveBM: BaseBitmap = null;
	private _aid: string = null;
	private _code: string = null;
	private _boxNeedGem: string = null;
	private _desc2: BaseTextField = null;
	public constructor() {
		super();
	}

	private get newCode(): string {
		let code = ``;
		switch (Number(this._code)) {
			case 6:
				code = `3`;
				break;
			case 5:
				code = `1`;
				break;
			case 7:
				code = `4`;
				break;
			case 8:
			case 9:
			case 10:
			case 11:
				code = `5`;
				break;
			case 12:
			case 13:
				code = `12`;
				break;
			case 14:
			case 15:
				code = `14`;
				break;
			case 17:
				code = `16`;
				break;
			case 21:
				code = `20`;
				break;
			case 23:
				code = `22`;
				break;
			default:
				code = this._code;
				break;
		}
		return code;
	}

	public initView() {
		App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY, this.refreshView, this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_GETRECHARGEBOXREWARD, this.getRewardHandler, this);
		this._aid = this.param.data.aid;
		this._code = this.param.data.code;
		this._boxNeedGem = this.param.data.boxId;
		let cfg = <Config.AcCfg.RechargeBoxCfg>Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
		let boxCfg = cfg.getBoxData(String(this._boxNeedGem));
		//public_9_bg4 。 public_9_bg1	

		let bg = BaseBitmap.create("public_9_bg4");
		bg.width = 520;
		bg.height = 250;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, this.viewBg.y + 15);
		this.addChildToContainer(bg);

		let rewardbg = BaseBitmap.create("public_9_bg44");
		rewardbg.width = 502;
		rewardbg.height = 110;
		rewardbg.setPosition(bg.x + bg.width / 2 - rewardbg.width / 2, bg.y + 10);
		this.addChildToContainer(rewardbg);

		let rewardVoList = GameData.formatRewardItem(boxCfg.getReward);

		for (let i = 0; i < rewardVoList.length; i++) {

			let rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
			rewardDB.setScale(0.8);
			let rewardDBWidth = rewardDB.width - 7;
			let startWidth = (rewardbg.width - rewardDBWidth * rewardVoList.length) / (rewardVoList.length + 1);
			rewardDB.setPosition(rewardbg.x + startWidth + 6 + (i * (rewardDBWidth + startWidth)), rewardbg.y + rewardbg.height / 2 - rewardDB.height / 2 + 10);
			this.addChildToContainer(rewardDB);

		}

		let desc1 = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxPopupViewDesc1"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN);
		desc1.setPosition(rewardbg.x + rewardbg.width / 2 - desc1.width / 2, rewardbg.y + rewardbg.height + 10);
		this.addChildToContainer(desc1);

		let desc2 = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxPopupViewDesc2", ["0"]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
		desc2.setPosition(desc1.x + desc1.width / 2 - desc2.width / 2, desc1.y + desc1.height + 5);
		this.addChildToContainer(desc2);
		this._desc2 = desc2;

		this._rechargeBtn = ComponentManager.getButton(ButtonConst.BTN_RECHARGE, "acRechargeBoxPopupViewGoRecharge", this.rechargeClick, this);
		this._rechargeBtn.setPosition(desc2.x + desc2.width / 2 - this._rechargeBtn.width / 2, desc2.y + desc2.height + 5);
		this.addChildToContainer(this._rechargeBtn);

		this._receiveBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acRechargeBoxPopupViewReceive", this.receiveClick, this);
		this._receiveBtn.setPosition(this._rechargeBtn.x + this._rechargeBtn.width / 2 - this._receiveBtn.width / 2, this._rechargeBtn.y + this._rechargeBtn.height / 2 - this._receiveBtn.height / 2);
		this.addChildToContainer(this._receiveBtn);

		this._allReceiveBM = BaseBitmap.create("acrechargeboxview_receive");
		this._allReceiveBM.setPosition(this._rechargeBtn.x + this._rechargeBtn.width / 2 - this._allReceiveBM.width / 2, this._rechargeBtn.y + this._rechargeBtn.height / 2 - this._allReceiveBM.height / 2);
		this.addChildToContainer(this._allReceiveBM);

		this.refreshView();
	}
	/**
	 * 刷新界面
	 */
	private refreshView() {
		let vo = <AcRechargeBoxVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
		let cfg = <Config.AcCfg.RechargeBoxCfg>Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
		let boxCfg = cfg.getBoxData(this._boxNeedGem);
		let rechargeNum = vo.getBoxReChargeNum(this._boxNeedGem);
		let receiveNum = vo.getBoxReceiveNum(this._boxNeedGem);
		let numStr = Number(boxCfg.limit) - receiveNum;
		this._desc2.text = LanguageManager.getlocal("acRechargeBoxPopupViewDesc2", [String(numStr)]);
		if (Number(boxCfg.limit) <= receiveNum) {
			this._rechargeBtn.setVisible(false);
			this._receiveBtn.setVisible(false);
			this._allReceiveBM.setVisible(true);
		}
		else {
			if (rechargeNum > receiveNum) {
				this._rechargeBtn.setVisible(false);
				this._receiveBtn.setVisible(true);
				this._allReceiveBM.setVisible(false);
			}
			else {
				this._rechargeBtn.setVisible(true);
				this._receiveBtn.setVisible(false);
				this._allReceiveBM.setVisible(false);
			}
		}

	}
	private getRewardHandler(event: egret.Event) {
		// let vo = <AcRechargeBoxVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code)
		// let deltaT = vo.et - GameData.serverTime;
		// if(deltaT < 0){
		//     App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
		//     return;
		// }
		if (!event.data.ret){
			return;
		}
		let data = event.data.data.data;
		let replacerewards = event.data.data.data.replacerewards;
		if (replacerewards) {
			if (this.newCode == "1" || this.newCode == "3" || this.newCode == "4" || this.newCode == "5" || this.newCode == "12") {
				let oldReward = "";
				let newReward = "";
				for (let key in replacerewards[0]) {
					if (key && replacerewards[0][key]) {
						oldReward = String(key);
						newReward = replacerewards[0][key];
					}

				}
				let rewardName = Config.WifeskinCfg.getWifeCfgById(GameData.formatRewardItem(oldReward)[0].id).name;
				ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, {
					"name": rewardName, "touch": newReward, "message": "changeOtherRewardTip", callback: () => {
						ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": data.rewards, "otherRewards": data.otherrewards, "isPlayAni": true });
					}, handler: this
				});
			}
		}
		else {
			ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": data.rewards, "otherRewards": data.otherrewards, "isPlayAni": true });
		}
		this.refreshView();
	}
	/**
	 * 前往充值按钮
	 */
	private rechargeClick() {
		let vo = <AcRechargeBoxVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code)
		let deltaT = vo.et - GameData.serverTime;
		if (deltaT < 0) {
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return;
		}
		ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW, { rechargeId: this.param.data.boxId });
	}
	/**
	 * 领取按钮
	 */
	private receiveClick() {
		let vo = <AcRechargeBoxVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
		let deltaT = vo.et - GameData.serverTime;
		if (deltaT < 0) {
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return;
		}
		let cfg = <Config.AcCfg.RechargeBoxCfg>Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
		let boxCfg = cfg.getBoxData(String(this._boxNeedGem));
		let activeId = this._aid + "-" + this._code;
		NetManager.request(NetRequestConst.REQUST_ACTIVITY_GETRECHARGEBOXREWARD, { "activeId": activeId, "rechargeId": boxCfg.id });
	}
	protected getTitleStr(): string {
		return "acRechargeBoxPopupViewTitle";
	}
	protected getShowHeight(): number {
		return 340;
	}
	public dispose() {
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_GETRECHARGEBOXREWARD, this.getRewardHandler, this);
		App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY, this.refreshView, this);
		this._rechargeBtn = null;
		this._receiveBtn = null;
		this._allReceiveBM = null;
		this._aid = null;
		this._code = null;
		this._boxNeedGem = null;
		super.dispose();
	}

}