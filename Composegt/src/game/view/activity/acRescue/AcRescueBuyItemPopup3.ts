class AcRescueBuyItemPopup3 extends BaseDisplayObjectContainer
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
		
	}
	protected initView():void
	{	
		// App.MessageHelper.addEventListener(MessageConst.MESSAGE_SHOP_NEXTDAY,this.refreshUI2,this); 

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

		// let dataList =new Array<any>();
		// let cfg = Config.AcCfg.getCfgByActivityIdAndCode("rescue", AcRescueBuyItemPopupView.code);
		// for (var index = 1; index < 4; index++) {
		// 	dataList.push(cfg.powerItemList[index.toString()]);
			
	// }
		let dataList =new Array<any>();
		let cfg = Config.AcCfg.getCfgByActivityIdAndCode("rescue", AcRescueBuyItemPopupView.code);
		for (var index = 1; index < 20; index++) {
			if(cfg.shop[index.toString()]){
				dataList.push(cfg.shop[index.toString()]);
			}
			else{
				break;
			}
		}


		// // let list = Config.WifebaseCfg.wifeGift;
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,520,bottomBg.height-35);
		this._scrollList = ComponentManager.getScrollList(AcRescueExScrollItem,dataList,rect);
		this.addChild(this._scrollList);
		this._scrollList.setPosition(bottomBg.x + 10 ,bottomBg.y + 20);

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
		// App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SHOP_NEXTDAY,this.refreshUI2,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetPushConst.PUSH_PAY),this.receivePushData,this);
		
		super.dispose();
	}
}