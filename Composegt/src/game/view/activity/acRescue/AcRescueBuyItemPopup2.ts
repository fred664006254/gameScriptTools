class AcRescueBuyItemPopup2 extends BaseDisplayObjectContainer
{
	//滑动列表
	private _scrollList:ScrollList;
	private _shopInfoVoList:Array<any>;
	private _index:number = 0;
	private _shopid:number = 0;
	private _currVipNum:number =0;
	public constructor() 
	{
		super();
		this.initView();
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetPushConst.PUSH_PAY),this.receivePushData,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_USERESCUEITEM),this.refreshUI3,this);
	}
	protected initView():void
	{	
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_SHOP_NEXTDAY,this.refreshUI2,this); 

		let bottomBg = BaseBitmap.create("public_tc_bg01");
		bottomBg.width = 540;
		bottomBg.height = 605;
		bottomBg.x = 0

		bottomBg.y = 0;
		this.addChild(bottomBg);

		// let list1: Array<number> = new Array();

		// for (var index = 0; index < 4; index++) {
		// 	list1.push(index)
			
		// }

		let dataList =new Array<any>();
		let cfg = Config.AcCfg.getCfgByActivityIdAndCode("rescue", AcRescueBuyItemPopupView.code);
		for (var index = 1; index < 4; index++) {
			dataList.push(cfg.powerItemList[index.toString()]);
			
		}


		// // let list = Config.WifebaseCfg.wifeGift;
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,520,bottomBg.height-170);
		this._scrollList = ComponentManager.getScrollList(AcRescueBuyItemCangkuScrollItem,dataList,rect);
		this.addChild(this._scrollList);
		this._scrollList.setPosition(bottomBg.x + 10 ,bottomBg.y + 20);

		let btmBg = BaseBitmap.create("public_tc_bg03");
		btmBg.width = 520;
		btmBg.height = 126;
		btmBg.y = this._scrollList.y + this._scrollList.height + 10;
		btmBg.x = this._scrollList.x ;
		this.addChild(btmBg);

		let itemCfg = Config.ItemCfg.getItemCfgById(dataList[0].powerItem);

		let tip1:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acRescueUseItemTip1",[itemCfg.name]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		tip1.width = 500;
		tip1.setPosition(btmBg.x + btmBg.width/2-tip1.width/2,btmBg.y + btmBg.height/2 - tip1.height/2);
		tip1.width = 500; 
		this.addChild(tip1);

	}
	private receivePushData(event:egret.Event):void
	{
		let data:{ret:boolean,data:any}=event.data;
		if(data.data.cmd==NetPushConst.PUSH_PAY)
		{
	 
			if(this._currVipNum != Api.playerVoApi.getPlayerVipLevel())
			{
				this._currVipNum = Api.playerVoApi.getPlayerVipLevel(); 
				// this._scrollList.refreshData(this._shopInfoVoList);
			}
		}
	}
	public refreshUI2():void
	{	
		if(this._scrollList)
		{
			let dataList =new Array<any>();
			let cfg = Config.AcCfg.getCfgByActivityIdAndCode("rescue", AcRescueBuyItemPopupView.code);
			for (var index = 1; index < 4; index++) {
				dataList.push(cfg.powerItemList[index.toString()]);
				
			}
			this._scrollList.refreshData(dataList);
		}
	}

	public refreshUI3(event):void
	{	

		let data:{ret:boolean,data:any}=event.data;
		if(data.data.ret == 0){
				if(data.data.data.addPower)
				{
					let str = LanguageManager.getlocal("sysStrengDesc") + "+" + data.data.data.addPower
					// App.CommonUtil.showTip(str);
					/**
					 * 飘起经验
					 */
					let strList = [];
					
					strList.push({tipMessage:str});
					App.CommonUtil.playRewardFlyAction(strList);
					// egret.setTimeout( ()=>{
						
					// },this,800)
				}
            //领取成功
            if(data.data.data && data.data.data.rewards)
			{
				let rewards= GameData.formatRewardItem(data.data.data.rewards);
				if(rewards&&rewards.length>0)
				{
					App.CommonUtil.playRewardFlyAction(rewards);
				}
			}
        } else {
            // App.CommonUtil.showTip(LanguageManager.getlocal("dailyGiftFailure"));
            

        }
		if(this._scrollList)
		{
			let dataList =new Array<any>();
			let cfg = Config.AcCfg.getCfgByActivityIdAndCode("rescue", AcRescueBuyItemPopupView.code);
			for (var index = 1; index < 4; index++) {
				dataList.push(cfg.powerItemList[index.toString()]);
				
			}
			this._scrollList.refreshData(dataList); 
		}
	}
	
	// 页签类型
	protected getSheepType():number
	{
		return 1;
	}

	public dispose():void
	{
		this._scrollList = null;
		this._shopInfoVoList = null;
		this._index = 0;
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SHOP_NEXTDAY,this.refreshUI2,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetPushConst.PUSH_PAY),this.receivePushData,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_USERESCUEITEM),this.refreshUI3,this);
		super.dispose();
	}
}