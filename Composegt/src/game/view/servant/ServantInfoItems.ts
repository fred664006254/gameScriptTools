/**
 * 门客详情 丹药信息部分
 * author yanyuling
 * date 2017/11/20
 * @class ServantInfoItems
 */
class ServantInfoItems extends BaseDisplayObjectContainer
{
    private _servantId:string = null;
	private _scrollView:ScrollList;
	private _itemTip:BaseTextField;
	private _totalNum:number=0;
    public constructor()
	{
		super();
	}
	public init(servantId:string,bottomH:number):void
	{
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_SERVANT,this.refreshListView,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRSH_SERVANT_ITEM_USE,this.refreshItemTipFromDispatch,this);

		this._servantId = servantId;
		let servantcfg = Config.ServantCfg.getServantItemById(this._servantId); 
		let baseY = 87;

		let danyao = ComponentManager.getTextField(LanguageManager.getlocal(`servantAttr_add2`), 26, TextFieldConst.COLOR_LIGHT_YELLOW);//BaseBitmap.create("servant_danyaoshuliang");  
		this.addChild(danyao);
		danyao.x = 230; 
		danyao.y = baseY - danyao.height/2;

		let itemTip = ComponentManager.getTextField("0",26);  
		this.addChild(itemTip);
		this._itemTip = itemTip; 
		itemTip.x=danyao.x+danyao.width+10;
		itemTip.y = baseY - itemTip.height/2;
		
		let itemList = Config.ServantequiplCfg.getEquipItemsIdList();
		// let attItem = GameConfig.config.servantbaseCfg.attItem;
		for(let i = 0; i < itemList.length; ++ i){
			let equip = Number(itemList[i]);
			let equipQuality = Api.servantVoApi.getEquipQuality(servantId, equip);
			let equipLv = Api.servantVoApi.getEquipAddLv(servantId, equip);
			this._totalNum += Api.servantVoApi.getEquipAddAttr(equip, equipQuality, equipLv);
		}
		let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,bottomH-145-25);
		ServantInfoItemsScrollItem.servantId = this._servantId;
		let scrollView = ComponentManager.getScrollList(ServantInfoItemsScrollItem,itemList,rect);
		scrollView.x = 12;
		scrollView.y = 120;
		// scrollView.x = 24;
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
		this._itemTip.text = this._totalNum+"";
	}

	public scrollTopForGuide() {
		if (Api.rookieVoApi.curGuideKey == "upequip") {
			this._scrollView.setScrollTop(30);
		}
	}

    private refreshListView()
    {
		let itemList = [1,2,3,4];
		// let attItem = GameConfig.config.servantbaseCfg.attItem;
		this._totalNum = 0;
		for(let i = 0; i < itemList.length; ++ i){
			let equip = itemList[i];
			let equipQuality = Api.servantVoApi.getEquipQuality(this._servantId, equip);
			let equipLv = Api.servantVoApi.getEquipAddLv(this._servantId, equip);
			this._totalNum += Api.servantVoApi.getEquipAddAttr(equip, equipQuality, equipLv);
		}
		this._scrollView.refreshData(itemList);
		this._itemTip.text = this._totalNum+"";
		// let itemList = [];
		// let attItem = GameConfig.config.servantbaseCfg.attItem;
		// this._totalNum  = 0;
		// for (var index = 0; index < attItem.length; index++) {
		// 	let id = attItem[index];
		// 	let itemVO = Api.itemVoApi.getItemInfoVoById(id);
		// 	if(itemVO && itemVO.num > 0)
		// 	{
		// 		this._totalNum += itemVO.num;
		// 		itemList.push(itemVO);
		// 	}
		// }
		// this.refreshItemTip();
		// this._scrollView.refreshData(itemList);
	}

    public dispose():void
	{
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_SERVANT,this.refreshListView,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRSH_SERVANT_ITEM_USE,this.refreshItemTipFromDispatch,this);

		this._servantId =  null;
		this._scrollView = null;
		this._itemTip = null;
		this._totalNum = 0;
		super.dispose();
	}

}