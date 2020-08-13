class TimeLimitWifeView extends PopupView {

	private _rechargeBtn:BaseButton = null;
	private _timeTF:BaseTextField = null;
	public constructor() {
		super();
	}
	private get vo(): any {
		return Api.otherInfoVoApi.getGeneralShareInfo();
	}
	protected initView(): void {

		App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY,this.rewardHandler,this);
		let cfg  = Config.RechargeCfg.getRechargeItemCfgByKey("g16");
		let vo = Api.shopVoApi.getPayInfoById2("g16");
		if((!cfg)||(!vo))
		{
			return;
		}
		let rewardVo = GameData.formatRewardItem(cfg.getReward);
		//元宝icon
		let gemRewardVo = GameData.formatRewardItem("1_1_" + cfg.gemCost);
		let gemDB = GameData.getItemIcon(gemRewardVo[0],true,true);
		gemDB.setScale(0.7);
		gemDB.setPosition(this.viewBg.x + 230,this.viewBg.y + this.viewBg.height - 212 - gemDB.height*gemDB.$getScaleY()/2 );
		this.addChild(gemDB);
		for(let i = 1 ; i < rewardVo.length;i++)
		{
			let  itemDB = GameData.getItemIcon(rewardVo[i],true,true);
			itemDB.setScale(0.7);
			itemDB.setPosition(this.viewBg.x + 230 + (i) * (itemDB.width + 10) * itemDB.$getScaleX(),this.viewBg.y + this.viewBg.height - 212 - itemDB.height* itemDB.$getScaleY()/2);
			this.addChild(itemDB);
		}

		let rechargeBtn = ComponentManager.getButton("firstchargebutton02","",this.rechargeClick,this);
		rechargeBtn.setText(LanguageManager.getlocal("firstRecharge1",[String(cfg.cost)]),false);
		rechargeBtn.setColor(0xfff9cd);
		rechargeBtn.setPosition(this.viewBg.x + this.viewBg.width / 2 - rechargeBtn.width / 2,this.viewBg.y + this.viewBg.height - rechargeBtn.height - 90);
		this.addChild(rechargeBtn);

		let timeStr = "";
		// if(PlatformManager.checkIsWxSp()){
		// 	let curDay0 = App.DateUtil.getWeeTs(GameData.serverTime);
		// 	let curDay5 = curDay0 + 3600 * 5;
		// 	let endTime = 0;
		// 	if(GameData.serverTime > curDay5){
		// 		//第二天的5点
		// 		endTime = curDay5 + 86400;
		// 	} else {
		// 		endTime = curDay5;
		// 	}
		// 	timeStr = App.DateUtil.getFormatBySecond(endTime  - GameData.serverTime,1);
		// } else {
		// 	let et = vo.st + cfg.lastTime;

		// 	timeStr = App.DateUtil.getFormatBySecond(et - GameData.serverTime,1);

		// }	
		let et = vo.st + cfg.lastTime;

		timeStr = App.DateUtil.getFormatBySecond(et - GameData.serverTime,1);	
		this._timeTF = ComponentManager.getTextField(LanguageManager.getlocal("timelimitwifeview_time",[timeStr]),TextFieldConst.FONTSIZE_CONTENT_COMMON,0x885d34);
		this._timeTF.setPosition(this.viewBg.x + this.viewBg.width / 2 - this._timeTF.width / 2,this.viewBg.y + this.viewBg.height - this._timeTF.height - 40)
		this.addChild(this._timeTF);

		TickManager.addTick(this.tick,this);
		this.tick();
	}
	/**
	 * 时间倒计时
	 */
	protected tick()
	{
		let cfg  = Config.RechargeCfg.getRechargeItemCfgByKey("g16");
		let vo = Api.shopVoApi.getPayInfoById2("g16");
		let timeStr = "";
		// if(PlatformManager.checkIsWxSp()){
		// 	let curDay0 = App.DateUtil.getWeeTs(GameData.serverTime);
		// 	let curDay5 = curDay0 + 3600 * 5;
		// 	let endTime = 0;
		// 	if(GameData.serverTime > curDay5){
		// 		//第二天的5点
		// 		endTime = curDay5 + 86400;
		// 	} else {
		// 		endTime = curDay5;
		// 	}
		// 	timeStr = App.DateUtil.getFormatBySecond(endTime  - GameData.serverTime,1);

		// } else {
		// 	let et = vo.st + cfg.lastTime;
		// 	if(et < GameData.serverTime)
		// 	{
		// 		this.hide();
		// 		return;
		// 	}
		// 	timeStr = App.DateUtil.getFormatBySecond(et - GameData.serverTime,1);
		// }
		let et = vo.st + cfg.lastTime;
		if(et < GameData.serverTime)
		{
			this.hide();
			return;
		}
		timeStr = App.DateUtil.getFormatBySecond(et - GameData.serverTime,1);

		this._timeTF.text = LanguageManager.getlocal("timelimitwifeview_time",[timeStr]);
		this._timeTF.setPosition(this.viewBg.x + this.viewBg.width / 2 - this._timeTF.width / 2,this.viewBg.y + this.viewBg.height - this._timeTF.height - 40)

	}
	/**
	 * 重新一下关闭按钮 
	 */
	protected getCloseBtnName(): string {
		return "btn_lantern";
	}
	/**
	 * 重新一下title按钮 
	 */
	protected getTitleBgName(): string {
		return "";
	}
	/**
	 * 重写 初始化viewbg
	 */
	protected initBg(): void {
		if(PlatformManager.checkIsWanbaSp() || PlatformManager.checkIsQQXYXSp()){
			this.viewBg = BaseBitmap.create("timelimitwifeview_bg_wanba");
		} else {
			this.viewBg = BaseBitmap.create("timelimitwifeview_bg");
		}
		
		this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2, GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
		this.addChild(this.viewBg);

	}
	private rewardHandler(event:egret.Event)
	{
		let rewards = event.data.data.data.rewards;
		console.log("qingqiu");
		if(rewards)
		{
			let cfg  = Config.RechargeCfg.getRechargeItemCfgByKey("g16");
			rewards = "1_1_" + cfg.gemCost + "|" + rewards;
			ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,rewards);
			this.hide();
		}

	}
	/**
	 * 重置背景的高度 主要设置 btn的位置
	 */
	protected resetBgSize(): void {
		this.closeBtn.setPosition(this.viewBg.x + 470, this.viewBg.y + 22);
	}

	protected getResourceList(): string[] {

		if(PlatformManager.checkIsWanbaSp() || PlatformManager.checkIsQQXYXSp()){
			// this.viewBg = BaseBitmap.create("timelimitwifeview_bg_wanba");
			return super.getResourceList().concat([
				"collectflag","timelimitwifeview_bg_wanba","firstchargebutton02","itemeffect"
			]);
		} else {
			return super.getResourceList().concat([
				"collectflag","timelimitwifeview_bg","firstchargebutton02","itemeffect"
			]);
		}

	}
	protected getTitleStr(): string {
		return null;
	}
	/**
	 * 新的面板请求
	 */
	private rechargeClick(parm:any) {
		console.log("qingqiu");
		let cfg  = Config.RechargeCfg.getRechargeItemCfgByKey("g16");
		if(!cfg)
		{
			return;
		}
		PlatformManager.pay(cfg.id); 
	}
	protected receiveData(data: { ret: boolean, data: any }): void {

	}
	/**
	 * 重写关闭方法
	 */
	protected closeHandler(): void {
		this.hide();
	}

	public dispose(): void {
		App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY,this.rewardHandler,this);
		TickManager.removeTick(this.tick,this);
		super.dispose();
	}
}
