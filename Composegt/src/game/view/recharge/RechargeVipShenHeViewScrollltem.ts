
class RechargeVipShenHeViewScrollltem extends ScrollListItem {

	private collectBtn: BaseButton =null; 
	private _data:any =null;
	private _recharge2:BaseBitmap =null;
	private _recharge4:BaseBitmap =null;
	private _iconBg:BaseBitmap =null;
	private _functionBg:BaseBitmap =null;
	private _multiple:number = 0;
	public static MULTIPLE:number=0;
	public static ISBUY:boolean=false;
	private _fourStr:BaseTextField =null;
	private _msgTF:BaseBitmapText =null;
	private _fourContainer:BaseDisplayObjectContainer = null;
	private _twoContainer:BaseDisplayObjectContainer = null;
	private _two2Container:BaseDisplayObjectContainer = null;
	private _gtContainer:BaseDisplayObjectContainer = null;

	private _acerTxt:BaseTextField =null;
	private _acerImg:BaseBitmapText|BaseTextField =null;
	private _currId:number=0;
	private isnewThanksgiving:boolean =false; //感恩界面
 
	private _jpacerTxt:BaseTextField =null;
	// private _a :boolean=true;
	public constructor() 
	{
		super();
		// App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY,this.receivePushData,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetPushConst.PUSH_PAY),this.receivePushData,this);
	}

	protected initItem(index: number, data: any,isbuy?:boolean) 
    {	
		this._data = data;
		var functionBg:BaseBitmap =null;  
		// console.log(data.id)
	 
	 	functionBg = BaseBitmap.create("public_listbg");
        functionBg.width = 297;
        functionBg.height = 165; 
		functionBg.x = 10;
        this.addChild(functionBg); 
        
        
		let  elementStr2 =LanguageManager.getlocal("rechargeAcerdes"); 
		let msgTF:BaseBitmapText|BaseTextField = ComponentManager.getBitmapText((data.gemCost?data.gemCost:data.firstGet)+elementStr2,"recharge2_fnt");
		msgTF.y = functionBg.y+15;
		msgTF.x = functionBg.x+170;
		this.addChild(msgTF); 
		this._acerImg = msgTF;  

		
		let isHasFirstRecharge:boolean = Api.rechargeVoApi.checkFirstRecharge();
		let isNewRecharge:Boolean = Api.switchVoApi.checknewRecharge();
		//送  前面文本
		var acertxt = LanguageManager.getlocal("rechargeAcerdes");//元宝
		if(LanguageManager.checkHasKey("rechargeShenHe_"+data.id))
		{
			acertxt = acertxt + "+"+LanguageManager.getlocal("rechargeShenHe_"+data.id)
		}
		let acerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		acerTxt.text = String(data.gemCost+acertxt); 
		acerTxt.textAlign=egret.HorizontalAlign.CENTER;
		acerTxt.width = 230;
		acerTxt.x = this.width/2-acerTxt.width/2;
		acerTxt.y = 30;
		this.addChild(acerTxt);
		this._acerTxt = acerTxt;

	 
		if(this.checkIsBigMonthYearCard()){
			//添加月卡 年卡充值档次说明  暂时不用描述
			let desctxt = LanguageManager.getlocal(this._data.sortId == 9 ? 'monthcarddesc' : 'yearcarddesc');//元宝
			this._acerTxt.text = String(`${acerTxt.text}${desctxt}`);
			this._acerTxt.textAlign = egret.HorizontalAlign.LEFT;
		}
		else{
			//4倍图感恩回馈
			var str:string  =null;
			let boo = Config.FirstchargeCfg.getneedRecharge(data.id);
			if(isNewRecharge&&isHasFirstRecharge==false&&Api.shopVoApi.getfourRateCharge()==true&&boo)
			{
				let recharge4= BaseBitmap.create("recharge4");
				recharge4.x = functionBg.x;
				recharge4.y = functionBg.y; 
				this.addChild(recharge4);
				this._recharge4 = recharge4; 
				this._multiple = 4; 
				this.isnewThanksgiving = true;
			}
			//	原来逻辑 4倍正常
			else  
			if(isNewRecharge&&isHasFirstRecharge&&boo) 
			{	 
				this.isnewThanksgiving = false;
				let recharge4= BaseBitmap.create("recharge4");
				recharge4.x = functionBg.x;
				recharge4.y = functionBg.y; 
				this.addChild(recharge4);
				this._recharge4 = recharge4; 
				this._multiple = 4;  
			}
			else if(!Api.shopVoApi.getPayInfoById(data.id)&&data.firstGet)
			{
				let recharge2= BaseBitmap.create("recharge2big");
				recharge2.x = functionBg.x;
				recharge2.y = functionBg.y; 
				this.addChild(recharge2); 
				this._recharge2 = recharge2; 
				this._multiple = 2; 

			 	if(Api.switchVoApi.checkOpenAuditFile()&&data.id=="g11")
				{
					recharge2.visible =false;
				}
			}
			else 
			{ 
				if(data.secondGet)
				{
					this._multiple = data.secondGet; 
				}
				else
				{
					this._multiple = 0;
				} 
			}
			
			// //4倍附送元宝
			// if(isNewRecharge&&isHasFirstRecharge==false&&Api.shopVoApi.getfourRateCharge()==true&&boo)
			// {
			// 	this.showFourTxt();
			// }
			// else if(isNewRecharge&&isHasFirstRecharge&&boo) 
			// {
			// 	this.showFourTxt();
			// }
			// else if(!Api.shopVoApi.getPayInfoById(data.id))
			// {
			// 	this._twoContainer = new BaseDisplayObjectContainer();
			// 	this.addChild(this._twoContainer); 
				
			// 	let giveImg2:BaseBitmap =BaseBitmap.create("rechargevie_give");
			// 	giveImg2.x = acerTxt.x+acerTxt.width+5;
			// 	giveImg2.y = acerTxt.y-10;
			// 	this._twoContainer.addChild(giveImg2);

			// 	var acertxt = LanguageManager.getlocal("rechargeAcerdes");//元宝
			// 	let giveTxt2 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
			// 	giveTxt2.text = String(data.firstGet+acertxt);
			// 	giveTxt2.x = giveImg2.x+giveImg2.width+10;
			// 	giveTxt2.y =  functionBg.y+75;
			// 	this._twoContainer.addChild(giveTxt2);

			// 	if(PlatformManager.checkIsJPSp())
			// 	{
			// 		giveImg2.visible =false;
			// 		giveTxt2.visible =false; 
			// 	}
			// 	if(Api.switchVoApi.checkOpenAuditFile()&&data.id=="g11")
			// 	{
			// 		giveImg2.visible =false;
			// 		giveTxt2.visible =false;
			// 	}
			// }
			// else if(data.secondGet)
			// {
			// 	this.showGT();
			// }
		}
		let collectBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,""+"",this.eventCollectHandler ,this);        
		collectBtn.x =this.width/2-collectBtn.width/2;
		collectBtn.y = functionBg.y+collectBtn.height*0.5+50;
	 
		
		let elementStr =LanguageManager.getlocal("elementStr");
	 
		if(PlatformManager.checkIsTWBSp())
		{
			let twStr = PlatformManager.getMoneySign();
			collectBtn.setText(twStr+data.cost,false); 
		}
		else if(PlatformManager.checkIsKRSp())
		{
			let twStr = PlatformManager.getMoneySign();
			if(App.DeviceUtil.isAndroid()){
				
				collectBtn.setText(data.cost+elementStr,false); 
			}else{
				collectBtn.setText(twStr+data.cost,false); 
			}	
		}
		else
		{
			collectBtn.setText(data.cost+elementStr,false); 
		}
		this.addChild(collectBtn); 
		this.collectBtn = collectBtn;
		if(this.checkIsBigMonthYearCard()){
			let isBuyMonthCard = Api.shopVoApi.ifBuyMonthCard();
			let isBuyYearCard = Api.shopVoApi.ifBuyYearCard();
			if((isBuyMonthCard && this._data.sortId == 9) || (isBuyYearCard && this._data.sortId == 10)){
				this.hideBuyBtn();
			}
		}
		if(Api.switchVoApi.checkOpenAuditFile()&&this._data.id =="g11"&&RechargeVipShenHeViewScrollltem.ISBUY==true)
		{
			this.hideBuyBtn();
		}
	}

	private hideBuyBtn() : void{
		if(this)
		{
			return;
		}
		if(this.collectBtn.visible){
			this.collectBtn.visible = false;
			let hasGetSp = BaseBitmap.create("public_buy");
			hasGetSp.x = this.collectBtn.x + this.collectBtn.width/2 - hasGetSp.width/2;
			hasGetSp.y = this.collectBtn.y + this.collectBtn.height/2 - hasGetSp.height/2;
			this.addChild(hasGetSp);
		}
	}
	 
	private receivePushData(event:egret.Event):void
	{
		let data:{ret:boolean,data:any}=event.data;
		if(data.data.cmd==NetPushConst.PUSH_PAY)
		{
			if(this._data.id!= this._currId&&!this._recharge4)
			{
				return; 
			}
			if(this.checkIsBigMonthYearCard()){
				let isBuyMonthCard = Api.shopVoApi.ifBuyMonthCard();
				let isBuyYearCard = Api.shopVoApi.ifBuyYearCard();
				if((isBuyMonthCard && this._data.sortId == 9) || (isBuyYearCard && this._data.sortId == 10)){
					this.hideBuyBtn();
				}
			}
	 
			let isHasFirstRecharge:boolean=Api.rechargeVoApi.checkFirstRecharge(); 
			let isNewRecharge:Boolean = Api.switchVoApi.checknewRecharge(); 

			if(this.isnewThanksgiving==true)
			{	
				//感恩已经充值过
				if(isNewRecharge&&Api.shopVoApi.getfourRateCharge()==false)
				{
					this.updata4();
					this.updata2();
					this.updata1();
				} 
				else
				{
					this.updata1();
					return; 
				} 
				return; 
			}
			
		 	if(isHasFirstRecharge==false)
			{ 	
				this.updata4();
				this.updata2();
			}

			if(data.data.data.payment)
			{ 
				this.updata1(); 
			}
		}
	}
	private updata4():void
	{
		  
		if(this._recharge4)
		{
			this._recharge4.visible =false; 
			if(this._fourContainer)
			{
				this._fourContainer.visible =false;
				this._multiple=0;
			}
			else if(this._data.secondGet)
			{
				this.showGT();
				this._multiple =this._data.secondGet;
			} 
		} 
	}
	private updata1():void
	{
		if((Api.shopVoApi.getPayInfoById(this._data.id)))
		{	
			if(this._recharge2)
			{
				this._recharge2.visible =false;

				if(this._data.secondGet)
				{
					this.showGT();
					this._multiple = this._data.secondGet; 
				}
				else
				{
					this._multiple=0;
				} 
				
				if(this._twoContainer)
				{
					this._twoContainer.visible =false;
				} 
				if(this._two2Container)
				{
					this._two2Container.visible =false;
				}
				
			} 
		}
	}
	private updata2():void
	{
		if(!(Api.shopVoApi.getPayInfoById(this._data.id)))
		{
			if(!this._recharge2&&this._data.firstGet)
			{
				let _functionBg = this._functionBg;
				let recharge2= BaseBitmap.create("recharge2big");
				// recharge2.x = _functionBg.x;
				// recharge2.y = _functionBg.y; 
				recharge2.x = 10;
				// recharge2.y = _functionBg.y; 
				this.addChild(recharge2); 
				this._recharge2 = recharge2;

				
				this._two2Container = new BaseDisplayObjectContainer();	
				this.addChild(this._two2Container);
				let acerTxt =this._acerTxt;
				
				//送 
				// let giveImg:BaseBitmap =BaseBitmap.create("rechargevie_give");
				// giveImg.x = acerTxt.x+acerTxt.width+5;
				// giveImg.y = acerTxt.y-10;
				// this._two2Container.addChild(giveImg);
				
				// var acertxt = LanguageManager.getlocal("rechargeAcerdes");//元宝
				// let giveTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
				// giveTxt.text =String(this._data.firstGet+acertxt);
				// giveTxt.x = giveImg.x+giveImg.width+10;
				// giveTxt.y = this._acerTxt.y;
				// this._two2Container.addChild(giveTxt);

				// if(PlatformManager.checkIsJPSp())
				// {
				// 	giveImg.visible =false;
				// 	giveTxt.visible =false; 
				// }
				this._multiple = 2;

				//日文特殊版本下98 审核下
				// if(Api.switchVoApi.checkOpenAuditFile()&&this._data.id=="98")
				// {
				// 	recharge2.visible =false;
				// 	giveImg.visible =false; 
				// 	giveTxt.visible =false;
				// }
				
			}
			else 
			{ 
				this._multiple = 2;
			} 
		}
	}
	private showGT():void
	{	
		if(this)
		{
			return;
		}
		if(!this._data.secondGet)
		{
			return; 
		}
		if(this._gtContainer)
		{
			this.removeChild(this._gtContainer);
		}
		this._gtContainer = null;
		if(this._gtContainer==null)
		{
			this._gtContainer = new BaseDisplayObjectContainer();
			this.addChild(this._gtContainer);
		}
		
		// let giveImg2:BaseBitmap =BaseBitmap.create("rechargevie_give"); 
		// giveImg2.x = this._acerTxt.x+this._acerTxt.width+5;
		// giveImg2.y = this._acerTxt.y-10;
		// this._gtContainer.addChild(giveImg2);

		// var acertxt = LanguageManager.getlocal("rechargeAcerdes");//元宝
		// let giveTxt2 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		// giveTxt2.text = String(this._data.secondGet+acertxt);
		// giveTxt2.x = giveImg2.x+giveImg2.width+10;
		// giveTxt2.y = this._acerImg.y+60;
		// this._gtContainer.addChild(giveTxt2);
	}
	private showFourTxt ():void 
	{
		 
		this._fourContainer = null;
		if(this._fourContainer==null)
		{
			this._fourContainer = new BaseDisplayObjectContainer();
			this.addChild(this._fourContainer);
		} 

		var acertxt = LanguageManager.getlocal("rechargeAcerdes");//元宝  
		this._fourStr = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_RED);
		this._fourStr.text =LanguageManager.getlocal("rechargef"); 
		this._fourContainer.addChild(this._fourStr);  

		//日文特殊版本下（1980 元宝）
		var extraClient:number = 3;
		// if(PlatformManager.checkIsJPSp())
		// {
		// 	this._fourStr.x = this._jpacerTxt.x+this._jpacerTxt.width+20; 
		// 	this._fourStr.y = this._functionBg.y+15; 

		// 	let giveTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		// 	giveTxt.y =85;
		// 	giveTxt.x =180;
		
		// 	giveTxt.text  = LanguageManager.getlocal("rechvipjp1Des3",[this._data.gemCost*extraClient+acertxt]);
		// 	this._fourContainer.addChild(giveTxt);
		// }
		// else
		// {
			this._fourStr.x = this._acerImg.x+this._acerImg.width+10; 
			this._fourStr.y = 0+20; 

			// let giveImg = BaseBitmap.create("rechargevie_give")
			// giveImg.x = this._acerTxt.x+this._acerTxt.width+5;
			// giveImg.y = this._acerTxt.y-10;
			// this._fourContainer.addChild(giveImg); 


			// let giveTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
			// giveTxt.text = String(this._data.gemCost*extraClient+acertxt);
			// giveTxt.x = giveImg.x+giveImg.width+10;
			// giveTxt.y = 75;
			// this._fourContainer.addChild(giveTxt);

			// if(PlatformManager.checkIsJPSp())//||this._a)
			// {
			// 	giveImg.visible =false;
			// 	giveTxt.visible =false;

			// } 
		// }
	}

	private eventCollectHandler(event:egret.TouchEvent):void
	{   
		this._currId = this._data.id;
		RechargeVipShenHeViewScrollltem.MULTIPLE =this._multiple;
		PlatformManager.pay(this._data.id); 
	}

	private checkIsBigMonthYearCard():boolean{
		let data = this._data;
		return PlatformManager.checkIs37WdShenheSp() && (data.sortId == 9 || data.sortId == 10);
	}

	public dispose(): void 
	{ 
		// App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY,this.receivePushData,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetPushConst.PUSH_PAY),this.receivePushData,this);
		this._fourContainer =null;
		this._twoContainer =null;
		this._two2Container =null; 
		this._data=null;
		this._recharge2 =null
		this._recharge4=null;
		this._iconBg =null;
		this._functionBg =null;
		this._multiple =0;
		RechargeVipShenHeViewScrollltem.MULTIPLE =0;
		this._fourStr =null;
		this._msgTF =null;
		this._acerTxt =null;
		this._acerImg =null; 
		this._currId =0;
		this._gtContainer=null;
		this.isnewThanksgiving =false;
		this.collectBtn = null;
		super.dispose();
	}
}