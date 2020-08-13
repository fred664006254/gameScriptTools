class RechargeVipViewTab1 extends CommonViewTab
{
	private _scrollList:ScrollList;  
	private _rechargetitlle:BaseBitmap =null;
    protected getListType():number
	{
		return 1;
	}

	public constructor(param?) 
	{
		super();
		this.param = param;
		this.initView();
	}
	protected initView():void
	{

		if(PlatformManager.checkIsRuSp() && PlatformManager.checkisLocalPrice())
		{
			Config.RechargeCfg.formatLocalPriceCfg();
		}

		App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY,this.receivePushData,this);
		let upBg:BaseBitmap=BaseBitmap.create("rechargetitlenewbg");
		this.addChild(upBg);
	
		upBg.y=-30;
		let isHasFirstRecharge:boolean=Api.rechargeVoApi.checkFirstRecharge();
		let isNewRecharge:Boolean = Api.switchVoApi.checknewRecharge();

		if(isNewRecharge&&isHasFirstRecharge==false&&Api.shopVoApi.getfourRateCharge()==true)
		{
			let rechargetitlle = BaseBitmap.create("rechargetitlle"); 
			rechargetitlle.x = 640-rechargetitlle.width;
			rechargetitlle.y = upBg.height-rechargetitlle.height*2;
			this.addChild(rechargetitlle);
			this._rechargetitlle = rechargetitlle;
		} 
		else if(isNewRecharge&&isHasFirstRecharge)
		{
			let rechargetitlle = BaseBitmap.create("rechargetitlle"); 
			rechargetitlle.x = 640-rechargetitlle.width;
			rechargetitlle.y = upBg.height-rechargetitlle.height*2;
			this.addChild(rechargetitlle);
			this._rechargetitlle = rechargetitlle;
		}
		

	
		let rechargelistCfg=Api.chatVoApi.arr_clone(Config.RechargeCfg.getNormalRechargeCfg());
		let l:number=rechargelistCfg.length;
		let lineNum:number=3;
		let startXY:number=0;
		
		
		rechargelistCfg = this.sortArr(rechargelistCfg);
		
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,640,GameConfig.stageHeigth-380);
		this._scrollList = ComponentManager.getScrollList(RechargeVipViewScrollltem,rechargelistCfg,rect);
		this.addChild(this._scrollList);
		this._scrollList.setPosition(10,150);
		let rechargeId = ``;
		if(this.param && this.param.data && this.param.data.rechargeId){
			rechargeId = this.param.data.rechargeId;
		}
		if(rechargeId != '') {
			for (let i = 0; i < rechargelistCfg.length; i++) {
				if (rechargelistCfg[i].id == rechargeId) {
					this._scrollList.setScrollTopByIndex(i, 1000);
					break;
				}
			}
		}
    }
  
	//如果没有首充过
	private sortArr(arr:any =null):Array<any>
	{
		let isHasFirstRecharge:boolean=Api.rechargeVoApi.checkFirstRecharge();
		let isNewRecharge:Boolean = Api.switchVoApi.checknewRecharge();
		let rechargelistCfg = arr;
		let arr1=[];	//4倍
		let arr2=[];   //2倍
		let arr3=[];  //普通
		 
		 for(var i:number =0;i<rechargelistCfg.length;i++)
		 {
			let boo = Config.FirstchargeCfg.getneedRecharge(rechargelistCfg[i].id);
			if(this.param && this.param.data && this.param.data.rechargeId){
				rechargelistCfg[i].showEffId = this.param.data.rechargeId;
			}
			
			if(isNewRecharge&&isHasFirstRecharge==false&&Api.shopVoApi.getfourRateCharge()==true&&boo)
			{
				arr1.push(rechargelistCfg[i]);
			} 
			else if(isNewRecharge&&isHasFirstRecharge&&boo)
			{
				arr1.push(rechargelistCfg[i]);
			}
			else
			{ 
				arr2.push(rechargelistCfg[i]);	
			} 
		 }
		rechargelistCfg=[];
		rechargelistCfg = arr1.concat(arr2);
		return  rechargelistCfg;
	}

	protected receivePushData(event:egret.Event):void
	{
		let data:{ret:boolean,data:any}=event.data;
		if(data.data.cmd==NetPushConst.PUSH_PAY)
		{
			if(data.data.data.payment)
			{	
				let isHasFirstRecharge:boolean=Api.rechargeVoApi.checkFirstRecharge();
				if(!isHasFirstRecharge&&this._rechargetitlle)
				{
					this._rechargetitlle.visible =false;
				}

				let itemid=data.data.data.payment.itemId;
				let scaleStr:string="";
				if(RechargeVipViewScrollltem.MULTIPLE!=0)
				{
					if(RechargeVipViewScrollltem.MULTIPLE>4)
					{
						var num = Number(data.data.data.payment.num+RechargeVipViewScrollltem.MULTIPLE)
						App.CommonUtil.showTip(num+LanguageManager.getlocal("itemName_1")+scaleStr);

					}
					else
					{
						scaleStr="x"+RechargeVipViewScrollltem.MULTIPLE; 
						App.CommonUtil.showTip(data.data.data.payment.num+LanguageManager.getlocal("itemName_1")+scaleStr);

					} 
				}
				else
				{
					App.CommonUtil.showTip(data.data.data.payment.num+LanguageManager.getlocal("itemName_1")+scaleStr);
				} 
				PlatformManager.analyticsPay(itemid,data.data.data.payment.orderId);
			}
		}
	}

	public dispose():void
	{ 
		this._scrollList =null;
		this._rechargetitlle =null; 
		App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY,this.receivePushData,this);
	} 
}