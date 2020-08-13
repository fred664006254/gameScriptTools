class WelfareViewGodBless extends WelfareViewTab
{

	private _scrollList:ScrollList = null;
	private _vipLevel:number = 0;

	public constructor() {
		super();
	}

	protected init():void
	{
		super.init();

		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_USERINFO,this.refresh,this);
		
		this._vipLevel = Api.playerVoApi.getPlayerVipLevel();
		let info = Config.DailyluckCfg.getLuckIdList();
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,492,GameConfig.stageHeigth - 304);
		this._scrollList = ComponentManager.getScrollList(WelfareViewGoldblessScrollItem,info,rect);
		this.addChild(this._scrollList);
		this._scrollList.setPosition(0,195);
		
		if ((!Api.switchVoApi.checkClosePay())&&Api.switchVoApi.checkIsOlyShenheFile()==false) {
			let lookVipBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"lookVIP",this.lookVip,this);
			lookVipBtn.setPosition(375,136);
			lookVipBtn.setScale(0.8);
			this.addChild(lookVipBtn);
		}
		if(Api.switchVoApi.checkIsOlyShenheFile())
		{
			let bg1=new BaseShape();
			bg1.graphics.beginFill(0);
			bg1.graphics.drawRect(0,0,370,40);
			bg1.graphics.endFill();
			bg1.setPosition(0,135);
			this.addChild(bg1);
		}


	}

	private refresh():void
	{	
		if (this._vipLevel != Api.playerVoApi.getPlayerVipLevel())
		{	
			this._vipLevel = Api.playerVoApi.getPlayerVipLevel();
			let info = Config.DailyluckCfg.getLuckIdList();
			this._scrollList.refreshData(info);
		}
	}

	private lookVip():void
	{	
		ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEWTAB2);
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"godbless_bookRoom","godbless_child","godbless_manage","godbless_rank","godbless_servantLv","godbless_wife",
			"godbless_wife_blueType",
			]);
	}
	public dispose():void
	{
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_USERINFO,this.refresh,this);
		this._scrollList = null;
		this._vipLevel = 0;
		super.dispose();
	}
}