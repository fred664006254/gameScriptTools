class ShopViewTab1 extends CommonViewTab
{
	//滑动列表
	private _scrollList:ScrollList;
	private _shopInfoVoList:Array<any>;
	private _index:number = 0;
	private _shopid:number = 0;
	private _currVipNum:number =0;
	private _mainTask:number = 0;

	public constructor(data?:any) 
	{
		super();
		this.param = data;
		this.initView();
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetPushConst.PUSH_PAY),this.receivePushData,this);

	}
	protected initView():void
	{	
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_SHOP_NEXTDAY,this.refreshUI2,this); 
		if (this.param && this.param.data && this.param.data.isMainTask){
			this._mainTask = this.param.data.isMainTask;
		}
	
		let arr = Config.ShopnewCfg.getNewShopArr();
		if(!Api.switchVoApi.openCrossChat()){
			for(let i in arr){
				if(arr[i].id == 1651 || arr[i].content.indexOf('1651') > -1){
					arr.splice(Number(i),1);
					break;
				}
			}
		}
		this._shopInfoVoList =arr; //Api.shopVoApi.getShopInfoListByType(this.getSheepType());
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,600,GameConfig.stageHeigth - 390);
		this._scrollList = ComponentManager.getScrollList(ShopScrollItem,this._shopInfoVoList,rect, {isMainTask: this._mainTask});
		this.addChild(this._scrollList);
		this._scrollList.setPosition(20,70); 
		this._currVipNum =Api.playerVoApi.getPlayerVipLevel();
	}
	private receivePushData(event:egret.Event):void
	{	
		if (event && event.data && event.data.ret){
			let data:{ret:boolean,data:any}=event.data;
			if(data.data.cmd==NetPushConst.PUSH_PAY)
			{
		
				if(this._currVipNum != Api.playerVoApi.getPlayerVipLevel())
				{
					this._currVipNum = Api.playerVoApi.getPlayerVipLevel(); 
					this._scrollList.refreshData(this._shopInfoVoList, {isMainTask: this._mainTask});
				}
			}
		}
	}
	public refreshUI2():void
	{	
		if(this._scrollList)
		{
			this._scrollList.refreshData(this._shopInfoVoList, {isMainTask: this._mainTask}); 
		}
	}

	
	// 页签类型
	protected getSheepType():number
	{
		return 1;
	}

	public dispose():void
	{
		this._mainTask = 0;
		this._scrollList = null;
		this._shopInfoVoList = null;
		this._index = 0;
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SHOP_NEXTDAY,this.refreshUI2,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetPushConst.PUSH_PAY),this.receivePushData,this);
		super.dispose();
	}
}