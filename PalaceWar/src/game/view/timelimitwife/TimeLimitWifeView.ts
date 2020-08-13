/**
  * 一元限时红颜
  * @author 张朝阳
  * date 2018/9/3
  * @class TimeLimitWifeView
  */
class TimeLimitWifeView extends PopupView {

	private _rechargeBtn:BaseButton = null;
	private _timeTF:BaseTextField = null;
	public constructor() {
		super();
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
		gemDB.setScale(0.85);
		gemDB.setPosition(this.viewBg.x + 170+GameData.popupviewOffsetX,this.viewBg.y + this.viewBg.height - 115 - gemDB.height);
		this.addChild(gemDB);
		for(let i = 1 ; i < rewardVo.length;i++)
		{
			let itemDB = GameData.getItemIcon(rewardVo[i],true,true);
			itemDB.setScale(0.85);
			itemDB.setPosition(this.viewBg.x + 170 + (i) * (itemDB.width - 8)+GameData.popupviewOffsetX,this.viewBg.y + this.viewBg.height - 115 - itemDB.height);
			this.addChild(itemDB);
		}

		let rechargeBtn = ComponentManager.getButton(ButtonConst.BTN_RECHARGE,"",this.rechargeClick,this);
		rechargeBtn.setBtnCdSecond(30);
		let params:string[]=[];
		if(PlatformManager.checkisLocalPrice()&&cfg.platFullPrice)
		{
			params.push(cfg.platFullPrice);
		}
		else
		{
			params.push(String(cfg.cost));
		}
		rechargeBtn.setText(LanguageManager.getlocal("firstRecharge1",params),false);
		rechargeBtn.setColor(TextFieldConst.COLOR_BLACK);
		rechargeBtn.setPosition(this.viewBg.x + this.viewBg.width / 2 - rechargeBtn.width / 2,this.viewBg.y + this.viewBg.height - rechargeBtn.height - 30);
		this.addChild(rechargeBtn);

		
		let et = vo.st + cfg.lastTime;
		let timeStr = App.DateUtil.getFormatBySecond(et - GameData.serverTime,1);
		this._timeTF = ComponentManager.getTextField(LanguageManager.getlocal("timelimitwifeview_time",[timeStr]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_RED2);
		this._timeTF.setPosition(this.viewBg.x + this.viewBg.width / 2 - this._timeTF.width / 2,this.viewBg.y + this.viewBg.height - this._timeTF.height - 90);
		this.addChild(this._timeTF);
		this.tick();
		//vip 经验提示文字
		let tipBg = BaseBitmap.create("public_searchdescbg");
		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("addVipExpTip"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		tipBg.width = tipTxt.width + 60;
		tipBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - tipBg.width / 2,this.viewBg.y + this.viewBg.height);
		tipTxt.setPosition(tipBg.x + tipBg.width / 2 - tipTxt.width / 2,tipBg.y + tipBg.height / 2 - tipTxt.height / 2);
		this.addChild(tipBg);
		this.addChild(tipTxt);
	}
	/**
	 * 时间倒计时
	 */
	protected tick()
	{
		let cfg  = Config.RechargeCfg.getRechargeItemCfgByKey("g16");
		let vo = Api.shopVoApi.getPayInfoById2("g16");
		let et = vo.st + cfg.lastTime;
		if(et < GameData.serverTime)
		{
			this.hide();
			return;
		}
		let timeStr = App.DateUtil.getFormatBySecond(et - GameData.serverTime,1);
		this._timeTF.text = LanguageManager.getlocal("timelimitwifeview_time",[timeStr]);
		this._timeTF.setPosition(this.viewBg.x + this.viewBg.width / 2 - this._timeTF.width / 2,this.viewBg.y + this.viewBg.height - this._timeTF.height  - 90);

	}
	/**
	 * 重新一下关闭按钮 
	 */
	protected getCloseBtnName(): string {
		return "sharepopupview_closebtn";
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
		let viewBgStr = "timelimitwifeview_bg";
		if(PlatformManager.checkisLocalPrice())
		{
			let bgStr="timelimitwifeview_bg_"+PlatformManager.getSpid()+"hwtype";
			if(ResourceManager.hasRes(bgStr))
			{
				viewBgStr = bgStr;
			}
		}
		this.viewBg = BaseBitmap.create(viewBgStr);
		this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2, GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
		this.addChild(this.viewBg);

	}
	private rewardHandler(event:egret.Event)
	{
		let rewards = event.data.data.data.rewards;
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
		this.closeBtn.setPosition(this.viewBg.x + (PlatformManager.hasSpcialCloseBtn()?0:535), this.viewBg.y + 102);
	}

	protected getResourceList(): string[] {
		let resArr:string[]=[PlatformManager.checkIsThHw()?"timelimitwifeview_bg_thhwtype":"timelimitwifeview_bg","sharepopupview_closebtn","sharepopupview_closebtn_down"];
		let bgStr:string="timelimitwifeview_bg";
		if(PlatformManager.checkisLocalPrice())
		{
			let tmpbgStr="timelimitwifeview_bg"+"_"+PlatformManager.getSpid()+"hwtype";
			if(ResourceManager.hasRes(tmpbgStr))
			{
				bgStr=tmpbgStr;
			}
		}
		if(bgStr)
		{
			resArr.push(bgStr);
		}
		return super.getResourceList().concat(resArr);
	}
	protected getTitleStr(): string {
		return null;
	}
	/**
	 * 新的面板请求
	 */
	private rechargeClick(parm:any) {
		console.log("qingqiu");
		if (GameData.idcardSwitch==true && GameData.idcardNormal==1 && Api.gameinfoVoApi.getRealnameRewards()==null)
		{	
			ViewController.getInstance().openView(ViewConst.POPUP.REALNAMEREWARDSPOPUPVIEW);
            return;
		}
		let cfg  = Config.RechargeCfg.getRechargeItemCfgByKey("g16");
		if(!cfg)
		{
			return;
		}
		PlatformManager.checkPay(cfg.id); 
	}
	/**
	 * 重写关闭方法
	 */
	protected closeHandler(): void {
		this.hide();
	}

	public dispose(): void {
		App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY,this.rewardHandler,this);
		super.dispose();
	}
}
