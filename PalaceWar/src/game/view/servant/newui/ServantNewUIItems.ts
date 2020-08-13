/**
 * 门客详情new 丹药部分
 * author shaoliang
 * date 2019/7/25
 * @class ServantNewUIItems
 */
class ServantNewUIItems extends BaseDisplayObjectContainer
{
    private _servantId:string = null;
	private _scrollView:ScrollList;
	private _itemTip:BaseTextField;
	private _emptyTip:BaseTextField;
	private _totalNum:number=0;
    public constructor()
	{
		super();
	}
	public init(servantId:string,bottomH:number):void
	{
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_SERVANT_ITEMLIST,this.refreshListView,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRSH_SERVANT_ITEM_USE,this.refreshItemTipFromDispatch,this);

		
		this._servantId = servantId;
		let servantcfg = Config.ServantCfg.getServantItemById(this._servantId);

		let line1 = BaseBitmap.create("servant_title_bg");
		line1.width = 440;
		line1.x = GameConfig.stageWidth/2 - line1.width/2;
		line1.y = 20
		this.addChild( line1);

		let itemTip = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		// itemTip.textColor = TextFieldConst.COLOR_BROWN;
		itemTip.y = line1.y+8;
		this.addChild(itemTip);
		this._itemTip = itemTip;
		
		
		let itemList = [];
		let attItem = GameConfig.config.servantbaseCfg.attItem;
		for (var index = 0; index < attItem.length; index++) {
			let id = attItem[index];
			let itemVO = Api.itemVoApi.getItemInfoVoById(id);
			if(itemVO && itemVO.num > 0)
			{
				itemList.push(itemVO);
			}
		}
		
		this._emptyTip = ComponentManager.getTextField(LanguageManager.getlocal("servantInfoItemsEmpty"),TextFieldConst.FONTSIZE_CONTENT_SMALL);
		// itemTip.textColor = TextFieldConst.COLOR_BROWN;
		this._emptyTip.x = GameConfig.stageWidth/2 - this._emptyTip.width/2;
		this._emptyTip.y = bottomH/2;
		this._emptyTip.visible = false;
		this.addChild(this._emptyTip);
		if (itemList.length == 0){
			this._emptyTip.visible = true;
		}
		for (var key in itemList) {
			this._totalNum += itemList[key].num;
		}
		let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,bottomH-70);
		ServantInfoItemsScrollItem.servantId = this._servantId;
		let scrollView = ComponentManager.getScrollList(ServantInfoItemsScrollItem,itemList,rect);
		scrollView.y = 60;
		scrollView.x = 24;
		this._scrollView = scrollView;
		this.addChild(scrollView);
		this.refreshItemTip();
	}
	private refreshItemTipFromDispatch(event:egret.Event)
	{
		let num = event.data;
		this.refreshItemTip(num);
	}
	private refreshItemTip(changeNum?:number)
	{
		if (changeNum)
		{
			this._totalNum -= changeNum;
		}
		this._itemTip.text = LanguageManager.getlocal("servant_itemip",[String(this._totalNum)]);
		this._itemTip.x = GameConfig.stageWidth/2 - this._itemTip.width/2;
	}
    private refreshListView()
    {
		let itemList = [];
		let attItem = GameConfig.config.servantbaseCfg.attItem;
		this._totalNum  = 0;
		for (var index = 0; index < attItem.length; index++) {
			let id = attItem[index];
			let itemVO = Api.itemVoApi.getItemInfoVoById(id);
			if(itemVO && itemVO.num > 0)
			{
				this._totalNum += itemVO.num;
				itemList.push(itemVO);
			}
		}
		if (itemList.length == 0){
			this._emptyTip.visible = true;
		}
		this.refreshItemTip();
		this._scrollView.refreshData(itemList);
    }

    public dispose():void
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_SERVANT_ITEMLIST,this.refreshListView,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRSH_SERVANT_ITEM_USE,this.refreshItemTipFromDispatch,this);

		this._servantId =  null;
		this._scrollView = null;
		this._itemTip = null;
		this._totalNum = 0;
		super.dispose();
	}

}