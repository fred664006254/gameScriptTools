class AcRescueBuyItemPopupViewTab2 extends CommonViewTab
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
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_SHOP_NEXTDAY,this.refreshUI2,this); 
	
		let arr = Config.ShopnewCfg.getNewShopArr();
		this._shopInfoVoList =arr; //Api.shopVoApi.getShopInfoListByType(this.getSheepType());
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,620,GameConfig.stageHeigth - 370 - 83 -20);
		this._scrollList = ComponentManager.getScrollList(ShopScrollItem,this._shopInfoVoList,rect);
		this.addChild(this._scrollList);
		this._scrollList.setPosition(15,87); 
		this._currVipNum =Api.playerVoApi.getPlayerVipLevel();
	}
	private receivePushData(event:egret.Event):void
	{
		let data:{ret:boolean,data:any}=event.data;
		if(data.data.cmd==NetPushConst.PUSH_PAY)
		{
	 
			if(this._currVipNum != Api.playerVoApi.getPlayerVipLevel())
			{
				this._currVipNum = Api.playerVoApi.getPlayerVipLevel(); 
				this._scrollList.refreshData(this._shopInfoVoList);
			}
		}
	}
	public refreshUI2():void
	{	
		if(this._scrollList)
		{
			this._scrollList.refreshData(this._shopInfoVoList); 
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

		super.dispose();
	}
}