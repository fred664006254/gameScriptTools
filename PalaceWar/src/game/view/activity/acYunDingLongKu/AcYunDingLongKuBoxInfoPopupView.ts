/**
  * 比武招亲宝箱详情
  * @author 张朝阳
  * date 2018/8/30
  * @class AcMarryBoxInfoPopupView
  */
class AcYunDingLongKuBoxInfoPopupView extends PopupView {

	private _receiveBtn: BaseButton = null;

	private _receiveBM: BaseBitmap = null;

	public constructor() {
		super();
	}
	public initView() {
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_YUNDINGLONGKUGETREWARDS, this.receiveBoxRewardHandle, this);
		let aid = this.param.data.aid;
		let code = this.param.data.code;
		let vo = <AcYunDingLongKuVo>Api.acVoApi.getActivityVoByAidAndCode(aid, code);
		let cfg = <Config.AcCfg.YunDingLongKuBattleItemCfg>this.param.data.boxCfg;

		let topBg = BaseBitmap.create("public_9_bg3");
		this.addChildToContainer(topBg);

		let tipTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acYunDingLongKuViewRewardDesc-" + code, [String(cfg.killPoint)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		topBg.width = tipTxt1.textWidth + 40;
		topBg.x = this.viewBg.x + this.viewBg.width / 2 - topBg.width / 2;
		topBg.y = 15;

		tipTxt1.x = topBg.x + topBg.width / 2 - tipTxt1.width / 2;
		tipTxt1.y = topBg.y + topBg.height / 2 - tipTxt1.height / 2;
		this.addChildToContainer(tipTxt1);

		let midbg = BaseBitmap.create("public_9_bg4");
		midbg.width = 520;
		midbg.height = 70;
		midbg.x = this.viewBg.x + this.viewBg.width / 2 - midbg.width / 2;
		midbg.y = topBg.y + topBg.height + 15;
		this.addChildToContainer(midbg);

		let tipTxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
		tipTxt2.text = LanguageManager.getlocal(`acYunDingLongKuViewRewardtip-${code}`);
		tipTxt2.x = midbg.x + 10;
		tipTxt2.y = midbg.y + 20;
		this.addChildToContainer(tipTxt2);

		let buttomBg = BaseBitmap.create("public_9_bg1");
		buttomBg.width = 500;
		// buttomBg.height = 120;
		buttomBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - buttomBg.width / 2, tipTxt2.y + tipTxt2.height + 10);
		this.addChildToContainer(buttomBg);


		let rewardVoList = GameData.formatRewardItem(cfg.getReward);

		let scaleValue = 1;
		let offestHeight = 0;
		let startWidth = 10;
		for (let i = 0; i < rewardVoList.length; i++) {

			let rewardDB = GameData.getItemIcon(rewardVoList[i], true);
			rewardDB.setScale(scaleValue);
			let rewardDBWidth = rewardDB.width * scaleValue;
			let posX = buttomBg.x + startWidth + (((i) % 4) * (rewardDBWidth + startWidth));
			let posY = buttomBg.y + 10 + (Math.floor((i) / 4) * (rewardDB.height * scaleValue + 5));
			rewardDB.setPosition(posX, posY);
			this.addChildToContainer(rewardDB);
			offestHeight = rewardDB.height * scaleValue;

		}
		let h = (rewardVoList.length % 4 == 0 ? rewardVoList.length / 4 : Math.floor(rewardVoList.length / 4) + 1) * (offestHeight + 10);
		buttomBg.height = 10 + h;
		midbg.height += buttomBg.height;


		this._receiveBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "taskCollect", this.receiveClick, this);
		this._receiveBtn.setPosition(midbg.x + midbg.width / 2 - this._receiveBtn.width / 2, midbg.y + midbg.height + 20);
		this.addChildToContainer(this._receiveBtn);

		let receiveBMScale = 0.75;
		this._receiveBM = BaseBitmap.create("collectflag");
		this._receiveBM.setScale(receiveBMScale);
		this._receiveBM.setPosition(this._receiveBtn.x + this._receiveBtn.width / 2 - this._receiveBM.width * receiveBMScale / 2, this._receiveBtn.y + this._receiveBtn.height / 2 - this._receiveBM.height * receiveBMScale / 2);
		this.addChildToContainer(this._receiveBM);

		this.refreshView()
	}
	/**刷新ui */
	private refreshView() {
		let vo = <AcYunDingLongKuVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
		let boxcfg = <Config.AcCfg.YunDingLongKuBattleItemCfg>this.param.data.boxCfg;
		if (vo.getScore() >= boxcfg.killPoint) {
			if (vo.getBoxFlag(boxcfg.id)) {
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
	private receiveBoxRewardHandle(event: egret.Event) {
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
	private receiveClick() {
		let boxcfg = <Config.AcCfg.YunDingLongKuBattleItemCfg>this.param.data.boxCfg;
		this.request(NetRequestConst.REQUST_ACTIVITY_YUNDINGLONGKUGETREWARDS, { activeId: this.param.data.aid + "-" + this.param.data.code, rkey: Number(boxcfg.id) })
	}


	// protected getShowHeight(): number {
	// 	return 555;
	// }
	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"wifeview_namebg",
		]);
	}
	protected getTitleStr(): string {
		return "acYunDingLongKuBoxInfoPopupView-" + this.param.data.code;
	}
	public dispose() {
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_YUNDINGLONGKUGETREWARDS, this.receiveBoxRewardHandle, this);
		this._receiveBtn = null;
		this._receiveBM = null;
		super.dispose();
	}

}