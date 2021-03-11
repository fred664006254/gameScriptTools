class WelfareViewRechargeBox extends WelfareViewTab
{
	private _goToRechargeBtn:BaseButton;
	private _goToRechargeBtn2:BaseButton;
	private _timeTF:BaseTextField;
	public constructor() 
	{
		super();
	}

	protected init():void
	{
		super.init();


		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.useCallback,this);

		let itemVo1 = Api.shopVoApi.getPayInfoById2("g9");
		let rechargeItemCfg = Config.RechargeCfg.getRechargeItemCfgByKey("g9");
		let lt = itemVo1.st + rechargeItemCfg.lastTime - GameData.serverTime
		let timeStr = LanguageManager.getlocal("limitTime",[App.DateUtil.getFormatBySecond(lt,1)])
		this._timeTF = ComponentManager.getTextField(timeStr,TextFieldConst.FONTSIZE_TITLE_COMMON,TextFieldConst.COLOR_WARN_YELLOW);
		this._timeTF.x = 300;
		this._timeTF.y = 130;
		this.addChild(this._timeTF)



		let temScale = 0.83
		let iconSp1 = BaseBitmap.create("rechargebox_bg1");
		iconSp1.x = this.bottomBg.width/2 - iconSp1.width/2;
		iconSp1.y = this.bottomBg.y+ 20;
		this.addChild(iconSp1);
		


		let rewardList1 = Config.RechargeCfg.rewardList1();
		let totalNum1 = rewardList1.length;
		for(let i = 0;i<rewardList1.length;i++)
		{
			let icon = GameData.getItemIcon(rewardList1[i],true,true);
			icon.scaleX = icon.scaleY = temScale;
			// icon.x = 20 + 7*(i + 1) + icon.width*temScale*i;
			icon.x = 45 + (icon.width*temScale + 15)*i;
			icon.y =iconSp1.y + 150;
			
			this.addChild(icon);

		}

		let isBuy1 = Api.shopVoApi.getPayInfo1();
		if(isBuy1 == true)
		{
			let hasGetSp = BaseBitmap.create("public_buy");
			hasGetSp.x = this.bottomBg.width/2 - hasGetSp.width/2;
			hasGetSp.y = iconSp1.y + iconSp1.height - 42 - hasGetSp.height/2;
			this.addChild(hasGetSp);
		
			//  this.showText();
		}
		else
		{

			let rechargeItemCfg = Config.RechargeCfg.getRechargeItemCfgByKey("g9");
			if(rechargeItemCfg)
			{
				// App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.useCallback,this);
				let goToRechargeBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"anyMoney",this.goToRechargeHandler,this);
				goToRechargeBtn.x = this.bottomBg.width/2 - goToRechargeBtn.width/2;
				goToRechargeBtn.y = iconSp1.y + iconSp1.height - 42 - goToRechargeBtn.height/2;
				goToRechargeBtn.setText(LanguageManager.getlocal("anyMoney",[rechargeItemCfg.cost.toString()]),false);
				this.addChild(goToRechargeBtn);
				this._goToRechargeBtn = goToRechargeBtn;
			}
		}



		let iconSp2 = BaseBitmap.create("rechargebox_bg2");
		iconSp2.x = this.bottomBg.width/2 - iconSp2.width/2;
		iconSp2.y = iconSp1.y + iconSp1.height + 10;
		this.addChild(iconSp2);



		let rewardList2 = Config.RechargeCfg.rewardList2();
		let totalNum2 = rewardList2.length;
		for(let i = 0;i<rewardList2.length;i++)
		{
			let icon = GameData.getItemIcon(rewardList2[i],true,true);
			icon.scaleX = icon.scaleY = temScale;
			// icon.x = 20 + 7*(i + 1) + icon.width*temScale*i;
			icon.x = 45 + (icon.width*temScale + 15)*i;
			icon.y =iconSp2.y + 150;
			
			this.addChild(icon);

		}

		let isBuy2 = Api.shopVoApi.getPayInfo2();
		if(isBuy2 == true)
		{
			let hasGetSp = BaseBitmap.create("public_buy");
			hasGetSp.x = this.bottomBg.width/2 - hasGetSp.width/2;
			hasGetSp.y = iconSp2.y + iconSp2.height - 45 - hasGetSp.height/2;
			this.addChild(hasGetSp);
		
			//  this.showText();
		}
		else
		{

			let rechargeItemCfg = Config.RechargeCfg.getRechargeItemCfgByKey("g10");
			if(rechargeItemCfg)
			{
				// App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.useCallback,this);
				let goToRechargeBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"anyMoney",this.goToRechargeHandler2,this);
				goToRechargeBtn.x = this.bottomBg.width/2 - goToRechargeBtn.width/2;
				goToRechargeBtn.y = iconSp2.y + iconSp2.height - 45 - goToRechargeBtn.height/2;
				goToRechargeBtn.setText(LanguageManager.getlocal("anyMoney",[rechargeItemCfg.cost.toString()]),false);
				this.addChild(goToRechargeBtn);
				this._goToRechargeBtn2 = goToRechargeBtn;
			}
		}

		// TickManager.addTick(this.tick,this);
	}
	// public showText():void
	// {
	// 	//月卡有效期
	// 	let str =App.DateUtil.getFormatBySecond(Api.shopVoApi.getMonthcardet(),6);
	// 	let cardTimedeTxt:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("cardTimedes",[str]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
	// 	cardTimedeTxt.x = 240;
	// 	cardTimedeTxt.y = GameConfig.stageHeigth-130;
	// 	this.addChild(cardTimedeTxt);
	// }

	private useCallback(event:egret.Event=null):void
	{
		
		let isBuy = Api.shopVoApi.getPayInfo1();
		if(isBuy)
		{
			//  this.showText();
			this._goToRechargeBtn.visible = false;
			let hasGetSp = BaseBitmap.create("public_buy");
			hasGetSp.x = this._goToRechargeBtn.x + this._goToRechargeBtn.width/2 - hasGetSp.width/2;
			hasGetSp.y = this._goToRechargeBtn.y + this._goToRechargeBtn.height/2 - hasGetSp.height/2;
			this.addChild(hasGetSp);

			// App.CommonUtil.showTip(LanguageManager.getlocal("sysBuySuccessDesc",[LanguageManager.getlocal("monthCard")]));
			// App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.useCallback,this);

			let cfg11 = Config.RechargeCfg.getRechargeItemCfgByKey("g9");
			let rewards =  "1_0_"  +cfg11.gemCost + "|" + cfg11.getReward;
			let pos = this._goToRechargeBtn.localToGlobal(this._goToRechargeBtn.width/2,-50);
			App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(rewards),pos);
		}

		let isBuy2 = Api.shopVoApi.getPayInfo2();
		if(isBuy2 == true)
		{
			this._goToRechargeBtn2.visible = false;
			let hasGetSp = BaseBitmap.create("public_buy");
			hasGetSp.x = this._goToRechargeBtn2.x + this._goToRechargeBtn2.width/2 - hasGetSp.width/2;
			hasGetSp.y = this._goToRechargeBtn2.y + this._goToRechargeBtn2.height/2 - hasGetSp.height/2;
			this.addChild(hasGetSp);

			// App.CommonUtil.showTip(LanguageManager.getlocal("sysBuySuccessDesc",[LanguageManager.getlocal("monthCard")]));
			// App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.useCallback,this);
			
			let cfg11 = Config.RechargeCfg.getRechargeItemCfgByKey("g10");
			let rewards =  "1_0_"  +cfg11.gemCost + "|" + cfg11.getReward;
			let pos = this._goToRechargeBtn2.localToGlobal(this._goToRechargeBtn2.width/2,-50);
			App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(rewards),pos);
			//  this.showText();
		}
	}


	private tick()
	{
		if(this._timeTF)
		{
			let itemVo1 = Api.shopVoApi.getPayInfoById2("g9");
			let rechargeItemCfg = Config.RechargeCfg.getRechargeItemCfgByKey("g9");
			let lt = itemVo1.st + rechargeItemCfg.lastTime - GameData.serverTime
			let timeStr = LanguageManager.getlocal("limitTime",[App.DateUtil.getFormatBySecond(lt,1)])
			this._timeTF.text = timeStr;
			if(lt <=0 ){
				App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RECHARFGE_BOX_TIMEOUT);	
			}
		}
	}

	private goToRechargeHandler():void
	{
		// let cfg11 = Config.RechargeCfg.getRechargeItemCfgByKey("g9");
		// let rewards =  "1_0_"  +cfg11.gemCost + "|" + cfg11.getReward;
		// let pos = this._goToRechargeBtn.localToGlobal(this._goToRechargeBtn.width/2,-50);
		// App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(rewards),pos);
		PlatformManager.pay("g9");
		// ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIEW);
	}
	private goToRechargeHandler2():void
	{
		PlatformManager.pay("g10");
		// ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIEW);
	}

	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"rechargebox_bg1","rechargebox_bg2","rechargebox_bg",
		]);
	}

	public dispose():void
	{
		// TickManager.removeTick(this.tick,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.useCallback,this);
		this._goToRechargeBtn = null;
		this._goToRechargeBtn2 = null;
		super.dispose();
	}
}