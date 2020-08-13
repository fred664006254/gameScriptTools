class BossRecSelectedScrollItem extends BossSelectedScrollItem
{
	public constructor() 
	{
		super();
	}

	// protected checkUseBtn(bg:BaseBitmap):void
	// {
	// 	if (this._servantInfo[1] ==1){
	// 		let useBtn:BaseButton = ComponentManager.getButton(this.getBtnResName(),this.getBtnLocalName(),this.confirmRecoveryHandler,this);
	// 		useBtn.setColor(TextFieldConst.COLOR_BLACK);
	// 		useBtn.x = bg.width - useBtn.width - 10;
	// 		useBtn.y = bg.height/2 - useBtn.height/2;
	// 		this.addChild(useBtn);
	// 		this._useBtn=useBtn;
	// 	}
	// 	else if(this._servantInfo[1]==2)
	// 	{
	// 		let goneIcon:BaseBitmap = BaseBitmap.create("boss_gotowar");
	// 		goneIcon.setPosition(382,8);
	// 		this.addChild(goneIcon);
	// 	}
	// 	else {
	// 		let useBtn:BaseButton = ComponentManager.getButton(this.getBtnResName(),this.getBtnLocalName(),this.clickBtnHandler,this);
	// 		useBtn.setColor(TextFieldConst.COLOR_BLACK);
	// 		useBtn.x = bg.width - useBtn.width - 10;
	// 		useBtn.y = bg.height/2 - useBtn.height/2;
	// 		this.addChild(useBtn);
	// 		this._useBtn=useBtn;
	// 	}
	// }

	// private confirmRecoveryHandler():void
	// {
	// 	let itemId:string=Config.DailybossCfg.needItem;
	// 	let hasNum:number=Api.itemVoApi.getItemNumInfoVoById(Number(itemId));
	// 	let itemUseCount = 1;
	// 	let itemCount = hasNum;
	// 	let itemCfg = Config.ItemCfg.getItemCfgById(Number(itemId));
	// 	let message: string = LanguageManager.getlocal("useItemMsg", [itemCfg.name + "x" +itemUseCount, LanguageManager.getlocal("dailybossRecoveryBattleNumDesc")]);
	// 	ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, { confirmCallback: this.recoveryHandler, handler: this, icon: itemCfg.icon,iconBg: itemCfg.iconBg, num: itemCount, useNum:itemUseCount,msg: message });
	// }

	protected recoveryHandler():void
	{
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_DAILYBOSS_RECOVER,this.refresh,this);
		NetManager.request(NetRequestConst.REQUEST_DAILYBOSS_RECOVER,{servantId:this._servantInfo[0]});
	}

	protected refresh(e:egret.Event):void
	{
		let data:{ret:boolean,data:any}=e.data;
		if(data.ret)
		{
			App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_DAILYBOSS_RECOVER,this.refresh,this);
			if(this._useBtn)
			{
				let {x,y}=this._useBtn;
				this._useBtn.dispose();
				let useBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"gotowar",this.clickBtnHandler,this);
				useBtn.setPosition(x,y);
				this.addChild(useBtn);
				this._useBtn=useBtn;
			}
			App.CommonUtil.showTip(LanguageManager.getlocal("dailybossRecoveryBattleSuccessDesc"));
		}
	}

	// protected getBtnLocalName():string
	// {
	// 	if (this._servantInfo[1] == 1){
	// 		return "manageRecoveryBtn";
	// 	}
	// 	else {
	// 		return "gotowar";
	// 	}
	// }

	public dispose():void
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_DAILYBOSS_RECOVER,this.refresh,this);
		// this._useBtn=null;
		super.dispose();
	}
}