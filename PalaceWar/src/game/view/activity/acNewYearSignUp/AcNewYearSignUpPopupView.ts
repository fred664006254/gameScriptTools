/**
  * 除夕签到PopupView
  * author 张朝阳
  * date 2018/12/19
  * @class AcNewYearSignUpPopupView
  */
class AcNewYearSignUpPopupView extends PopupView {

	private _receiveBtn: BaseButton = null;

	private _receiveBM: BaseBitmap = null;
	public constructor() {
		super();
	}

	public initView() {
		App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_GETNEWYEARSIGNUPALLREWARD, this.receiveHandle, this);

		let cfg = <Config.AcCfg.NewYearSignUpCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
		let bg = BaseBitmap.create("public_9_bg4");
		bg.width = 516;
		bg.height = 220;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 15);
		this.addChildToContainer(bg);

		let rewardVoList = GameData.formatRewardItem(cfg.bigPrize);
		let rewardScale = 1;
		for (let i = 0; i < rewardVoList.length; i++) {
			let rewardDB = GameData.getItemIcon(rewardVoList[i], true);
			rewardDB.setScale(rewardScale);
			rewardDB.setPosition(bg.x + 20 + ((rewardDB.width + 15) * i), bg.y + 35);
			this.addChildToContainer(rewardDB);

		}
		let descStr = "acNewYearSignUpPopupViewDesc";
		if (this.param.data.code == "2"){
			descStr = "acNewYearSignUpPopupViewDesc-"+this.param.data.code;
		}
		let descTF = ComponentManager.getTextField(LanguageManager.getlocal(descStr), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
		descTF.setPosition(bg.x + bg.width / 2 - descTF.width / 2, bg.y + bg.height - descTF.height - 20);
		this.addChildToContainer(descTF);

		this._receiveBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "acNewYearSignUpViewRecrive", this.receiveBtnClick, this);
		this._receiveBtn.setPosition(bg.x + bg.width / 2 - this._receiveBtn.width / 2, bg.y + bg.height + 20);
		this.addChildToContainer(this._receiveBtn);

		let bmScale = 0.8;
		this._receiveBM = BaseBitmap.create("collectflag");
		this._receiveBM.setScale(bmScale);
		this._receiveBM.setPosition(this._receiveBtn.x + this._receiveBtn.width / 2 - this._receiveBM.width * bmScale / 2, this._receiveBtn.y + this._receiveBtn.height / 2 - this._receiveBM.height * bmScale / 2, )
		this.addChildToContainer(this._receiveBM);

		this.refreashView();

	}

	private refreashView() {
		let vo = <AcNewYearSignUpVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
		if (vo.isReceiveSevenReward()) {
			this._receiveBtn.setVisible(false);
			this._receiveBM.setVisible(true);
		}
		else {
			this._receiveBtn.setVisible(true);
			this._receiveBM.setVisible(false);
			if (vo.isHaveReceiveSevenReward()) {
				this._receiveBtn.setEnable(true);
			}
			else {
				this._receiveBtn.setEnable(false);
			}
		}
	}
	private receiveBtnClick() {
		let vo = <AcNewYearSignUpVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
		let cfg = <Config.AcCfg.NewYearSignUpCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
		let deltaT = vo.et - GameData.serverTime - 86400 * cfg.extraTime;
        if(deltaT < 0){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
		this.request(NetRequestConst.REQUST_ACTIVITY_GETNEWYEARSIGNUPALLREWARD,{activeId:vo.aidAndCode});
	}
	private receiveHandle(event:egret.Event)
	{
		if(event && event.data && event.data.ret)
		{
			let rewards = event.data.data.data.rewards;
			let rewardVo = GameData.formatRewardItem(rewards);
			App.CommonUtil.playRewardFlyAction(rewardVo);
			this.refreashView();
		}
	}
	protected getTitleStr(): string {
		if (this.param.data.code == "2"){
			return "acNewYearSignUpPopupViewTitle-"+this.param.data.code;
		}
		return "acNewYearSignUpPopupViewTitle";
	}
	protected getShowHeight(): number {
		return 400;
	}
	protected getResourceList(): string[] {
		return super.getResourceList().concat([

		]);
	}
	public dispose() {
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_GETNEWYEARSIGNUPALLREWARD, this.receiveHandle, this);
		this._receiveBtn = null;
		this._receiveBM = null;
		super.dispose();
	}

}