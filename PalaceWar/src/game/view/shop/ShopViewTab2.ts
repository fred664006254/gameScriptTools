class ShopViewTab2 extends CommonViewTab
{
	//滑动列表
	private _scrollList:ScrollList;
	private _shopInfoVoList:Array<any>;
	private _index:number = 0;
	private _shopid:number = 0;
	public constructor() 
	{
		super();
		this.initView();
	}
	protected initView():void
	{
		this._shopInfoVoList = Api.shopVoApi.getShopInfoListByType(3);
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,600,GameConfig.stageHeigth - 390);
		this._scrollList = ComponentManager.getScrollList(Shop3ScrollItem,this._shopInfoVoList,rect);
		this.addChild(this._scrollList);
		this._scrollList.setPosition(20,70);

		if (Api.rookieVoApi.curGuideKey == "shop")
		{
			this._scrollList.setScrollTopByIndex(this._shopInfoVoList.length-1);
		}
	}
	protected getSheepType():number
	{
		return 3;
	}

	public dispose():void
	{
		this._scrollList = null;
		this._shopInfoVoList = null;
		this._index = 0;
		this._shopid = 0;
		super.dispose();
	}

}