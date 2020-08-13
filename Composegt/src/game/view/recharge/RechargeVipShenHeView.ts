/**
 * author 杜坤洋
 * date 2019/7/31
 * 37wd审核专用充值页面
 * @class RechargeShenHeVipView
 */
class RechargeShenHeVipView  extends CommonView
{
    //充值与VIP

	private _gemTxt:BaseTextField;
	private _scrollList:ScrollList;  
	private _rechargetitlle:BaseBitmap =null;
	private _rechargelistCfg = null;
	private _rechargeRebateButton:BaseButton = null;

	public constructor() 
	{
		super();
	}
	protected getTitleStr():string
	{
		return "rechargeVipViewTitle";
	}

	protected getResourceList():string[]
	{

		let ret = super.getResourceList().concat(
			[ 
			"recharge_fnt",
			"common_left_bg",
			"common_9_bg",
			"achievement_state3",
			"servant_topresbg", 
			"rechargevipview"


			]);
        let rechargeRebateVo = <AcRechargeRebateVo>Api.acVoApi.getActivityVoByAidAndCode("rechargeRebate");
		if (rechargeRebateVo && rechargeRebateVo.isInActivity()) {
			ret = ret.concat(["rechargeRebatetitlebg"]);
		}
		return ret;
	}


	public initView():void
	{
		
		if (PlatformManager.checkIsUseSDK()&& PlatformManager.checkIsWeiduan()==true && App.DeviceUtil.isAndroid() &&(PlatformManager.checkIsTWBSp()==true || PlatformManager.checkIsTWShenheSp()==true)) 
		{
			//漏单处理
			PlatformManager.client.checkPurchase(ServerCfg.selectServer.zid);
			console.log("QAZ checkPurchase");
		}
	
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetPushConst.PUSH_PAY),this.receivePushData,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_RECHARFGE_RE,this.rechargeHandler,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RECHARGE_CLOSE,this.hide,this);
		
		let resBar:ResBar = ComponentManager.getResBar(1,true,175);
		resBar.setPosition(10,32);
		this.addChild(resBar);

		let rechargelistCfg=Config.RechargeCfg.get37wdShenHeRechargeCfg();
		let l:number=rechargelistCfg.length;
		let lineNum:number=3;
		let startXY:number=0;
		
		
		rechargelistCfg = this.sortArr(rechargelistCfg);
		
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,640,GameConfig.stageHeigth-100);
		this._scrollList = ComponentManager.getScrollList(RechargeVipShenHeViewScrollltem,rechargelistCfg,rect);
		this.addChildToContainer(this._scrollList);
		this._rechargelistCfg  =rechargelistCfg;
		this._scrollList.setPosition(7,10);
		
		this.refresh();
	
		

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
	private rechargeHandler():void
	{
		var data:any =[];
		data.index =0;
		this.clickTabbarHandler(data);
		this.tabbarGroup.selectedIndex = data.index;
	}

	 private refresh():void
	{	

		if(this._gemTxt)
		{
			this._gemTxt.text=Api.playerVoApi.getPlayerGem().toString();
		}

	}
	 protected receivePushData(event:egret.Event):void
	{
		let data:{ret:boolean,data:any}=event.data;
		if(data.data.cmd==NetPushConst.PUSH_PAY)
		{ 
			if(event.data.data.data.rewards)
			{
				App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(event.data.data.data.rewards));
			}
			
			this.refresh();

			if(data.data.data.payment)
			{	
				let isHasFirstRecharge:boolean=Api.rechargeVoApi.checkFirstRecharge();
				if(!isHasFirstRecharge&&this._rechargetitlle)
				{
					this._rechargetitlle.visible =false;
				}

				let itemid=data.data.data.payment.itemId;
				let scaleStr:string="";
				if(RechargeVipShenHeViewScrollltem.MULTIPLE!=0)
				{
					if(RechargeVipShenHeViewScrollltem.MULTIPLE>4)
					{
						var num = Number(data.data.data.payment.num+RechargeVipShenHeViewScrollltem.MULTIPLE)
						App.CommonUtil.showTip(num+LanguageManager.getlocal("itemName_1")+scaleStr);

					}
					else
					{	
						if(Api.switchVoApi.checkOpenAuditFile()&&itemid =="g11")
						{
							App.CommonUtil.showTip(data.data.data.payment.num+LanguageManager.getlocal("itemName_1")+scaleStr);
							RechargeVipShenHeViewScrollltem.ISBUY =true;
							this._scrollList.refreshData(this._rechargelistCfg,true); 
							return;
						}
						scaleStr="x"+RechargeVipShenHeViewScrollltem.MULTIPLE; 
						App.CommonUtil.showTip(data.data.data.payment.num+LanguageManager.getlocal("itemName_1")+scaleStr);

					} 
				}
				else
				{
					App.CommonUtil.showTip(data.data.data.payment.num+LanguageManager.getlocal("itemName_1")+scaleStr);
				} 
				// PlatformManager.analyticsPay(itemid,data.data.data.payment.orderId);
			}
		}
	}

    public dispose():void
	{

		
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetPushConst.PUSH_PAY),this.receivePushData,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RECHARFGE_RE,this.rechargeHandler,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RECHARGE_CLOSE,this.hide,this);
		this. _gemTxt =null;

		
		super.dispose();
	}
}
