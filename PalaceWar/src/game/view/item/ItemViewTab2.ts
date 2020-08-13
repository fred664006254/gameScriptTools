class ItemViewTab2 extends CommonViewTab
{
	private _scrollList:ScrollList;
	public constructor() 
	{
		super();
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ITEM_GETCOMPOSE,this.initView,this);
		NetManager.request(NetRequestConst.REQUEST_ITEM_GETCOMPOSE,{});
	}
	public initView():void
	{
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_ITEMVIEWTAB2,this.refreshList,this);
		let bg1:BaseBitmap = BaseBitmap.create("public_9_bg23");
		// bg1.y = 5;
		bg1.width = GameConfig.stageWidth-20;
		bg1.height = GameConfig.stageHeigth - this.getViewTitleButtomY();
		bg1.x = 10;
		// this.addChild(bg1);

		let rect:egret.Rectangle=egret.Rectangle.create();
		rect.setTo(0,0,563,bg1.height-20);
		this._scrollList=ComponentManager.getScrollList(ComposeListItem,Api.itemVoApi.getComposeItemList(),rect);
		this.addChild(this._scrollList);
		this._scrollList.setPosition(bg1.x+(bg1.width-rect.width)/2,bg1.y+10);
	}

	private refreshList():void
	{
		if(this._scrollList)
		{
			this._scrollList.refreshData(Api.itemVoApi.getComposeItemList());
		}
	}

	public dispose():void
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ITEM_GETCOMPOSE,this.initView,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_ITEMVIEWTAB2,this.refreshList,this);
		super.dispose();
	}
}

class ComposeListItem extends ScrollListItem
{
	private _itemCfg:Config.ComposeItemCfg;
	private _composeBtn:BaseButton;
	public constructor() 
	{
		super();
	}

	protected initItem(index:number,data:any):void
	{
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ITEM_DOCOMPOSE,this.checkRedPoint,this);
		let itemCfg=<Config.ComposeItemCfg>data;
		this._itemCfg=itemCfg;
		let bg:BaseBitmap=BaseBitmap.create("public_9_probiginnerbg");
		bg.width=156;
		bg.height=222;
		bg.setPosition(3,3);
		this.addChild(bg);

		let nametTxt:BaseTextField=itemCfg.nameTxt;
		nametTxt.setPosition(bg.x+(bg.width-nametTxt.width)/2,bg.y+10);
		this.addChild(nametTxt);

		let icon:BaseDisplayObjectContainer=itemCfg.getIconContainer(true);
		icon.setPosition(bg.x+(bg.width-icon.width)/2,bg.y+nametTxt.y+nametTxt.height+5);
		this.addChild(icon);
		this.width=bg.width+this.getSpaceX();

		if(itemCfg.timeLimit)
		{
			let mark:BaseBitmap=BaseBitmap.create("common_shopmark");
			// mark.setPosition(0,0);
			this.addChild(mark);
			let markTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("composeTimeLimitDesc"),12);
			markTxt.anchorOffsetX=markTxt.width/2;
			markTxt.anchorOffsetY=markTxt.height/2;
			markTxt.rotation=-45;
			markTxt.setPosition(mark.width/3+1,mark.height/3+1);
			this.addChild(markTxt);
		}

		let composeBtn:BaseButton=ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"composeBtn",this.composeHandler,this);
		composeBtn.setPosition(bg.x+(bg.width-composeBtn.width)/2,bg.y+bg.height-composeBtn.height-10);
		this.addChild(composeBtn);
		this._composeBtn=composeBtn;
		this.checkRedPoint();
	}

	private checkRedPoint():void
	{
		if(this._composeBtn)
		{
			if(Api.itemVoApi.checkCanComposeById(this._itemCfg.id))
			{
				App.CommonUtil.addIconToBDOC(this._composeBtn);
				let red = this._composeBtn.getChildByName(`reddot`);
				// if(red ){
				// 	red.x = 110;
				// 	red.y = 0;
				// }
			}
			else
			{
				App.CommonUtil.removeIconFromBDOC(this._composeBtn);
			}
		}

	}

	private composeHandler():void
	{
		if(Number(this._itemCfg.itemId) >= 1704 &&  Number(this._itemCfg.itemId) <= 1718){
			ViewController.getInstance().openView(ViewConst.POPUP.COMPOSEMULTIPOPUPVIEW,this._itemCfg.id);
		}
		else{
			ViewController.getInstance().openView(ViewConst.POPUP.COMPOSEPOPUPVIEW,this._itemCfg.id);
		}
		
	}


	/**
	 * 不同格子X间距
	 */
	public getSpaceX():number
	{
		return 46;
	}
	/**
	 * 不同格子Y间距
	 */
	public getSpaceY():number
	{
		return 20;
	}

	public dispose():void
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ITEM_DOCOMPOSE,this.checkRedPoint,this);
		this._itemCfg=null;
		this._composeBtn=null;
		super.dispose();
	}
}